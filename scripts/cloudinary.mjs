#!/usr/bin/env node
// Travel-image workflow for Cloudinary (cloud: see CLOUDINARY_CLOUD in src/consts.ts).
//
//   node --env-file=.env scripts/cloudinary.mjs migrate [--apply]
//       One-time: upload every local image referenced by src/content/travel/*.md
//       and rewrite the frontmatter to Cloudinary public IDs (+ width/height).
//       Idempotent. Dry-run unless --apply.
//
//   node --env-file=.env scripts/cloudinary.mjs sync <slug> <image>... [--write]
//       Ongoing: resize (<=2560px) each image into src/content/travel/<slug>/,
//       upload it, and print gallery YAML entries (alt: TODO) for <slug>.md.
//       --write splices them into the file's gallery list (assumes gallery is
//       the last frontmatter key); otherwise they go to stdout to paste by hand.
//
// Only the cloud NAME is needed by the Astro build. This script needs the full
// CLOUDINARY_URL (key:secret) from the untracked .env — never commit it.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, join } from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

const TRAVEL_DIR = 'src/content/travel';
const MAX_EDGE = 2560;
const uploadCache = new Map();

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

if (!process.env.CLOUDINARY_URL) {
  die('CLOUDINARY_URL not set — run via `node --env-file=.env scripts/cloudinary.mjs ...`');
}

/** Local image dimensions via ImageMagick (matches what Cloudinary reports). */
function dimensions(file) {
  const out = execFileSync('identify', ['-format', '%w %h', file], { encoding: 'utf8' });
  const [w, h] = out.trim().split(/\s+/).map(Number);
  if (!w || !h) die(`could not read dimensions of ${file}`);
  return { width: w, height: h };
}

/** Downscale `src` into `dest` (skips if dest already exists). */
function resizeInto(src, dest) {
  if (existsSync(dest)) return;
  mkdirSync(join(dest, '..'), { recursive: true });
  execFileSync('convert', [
    src, '-auto-orient', '-resize', `${MAX_EDGE}x${MAX_EDGE}>`,
    '-quality', '82', '-strip', dest,
  ]);
}

async function upload(file, publicId, { apply }) {
  if (uploadCache.has(publicId)) return uploadCache.get(publicId);
  const local = dimensions(file);
  if (!apply) {
    const info = { public_id: publicId, ...local, dryRun: true };
    uploadCache.set(publicId, info);
    return info;
  }
  const res = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
  });
  if (res.width !== local.width || res.height !== local.height) {
    console.warn(
      `  ! ${publicId}: Cloudinary reports ${res.width}x${res.height}, local is ${local.width}x${local.height} — using Cloudinary's`,
    );
  }
  const info = { public_id: res.public_id, width: res.width, height: res.height };
  uploadCache.set(publicId, info);
  return info;
}

const isLocalRef = (v) => v.startsWith('./') && v.endsWith('.jpg');
const idFrom = (slug, ref) => `travel/${slug}/${basename(ref.replace(/^\.\//, ''), '.jpg')}`;
const localPath = (slug, ref) => join(TRAVEL_DIR, ref.replace(/^\.\//, ''));

// --- migrate -------------------------------------------------------------------

async function migrate(apply) {
  const files = readdirSync(TRAVEL_DIR).filter((f) => f.endsWith('.md'));
  let changed = 0;

  for (const md of files) {
    const slug = basename(md, '.md');
    const path = join(TRAVEL_DIR, md);
    const text = readFileSync(path, 'utf8');
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) die(`${md}: no frontmatter`);
    const [, fm, body] = m;

    const src = fm.split('\n');
    const out = [];
    let touched = false;

    for (let i = 0; i < src.length; i++) {
      const line = src[i];

      const cover = line.match(/^cover:\s*(\S+)\s*$/);
      if (cover && isLocalRef(cover[1])) {
        const ref = cover[1];
        if (!ref.startsWith(`./${slug}/`)) die(`${md}: cover path ${ref} not under ./${slug}/`);
        const info = await upload(localPath(slug, ref), idFrom(slug, ref), { apply });
        console.log(`  ${info.dryRun ? 'would upload' : 'uploaded'} ${info.public_id}`);
        out.push(`cover: ${idFrom(slug, ref)}`);
        touched = true;
        continue;
      }

      const item = line.match(/^(\s*)-\s+src:\s*(\S+)\s*$/);
      if (item && isLocalRef(item[2])) {
        const [, indent, ref] = item;
        if (!ref.startsWith(`./${slug}/`)) die(`${md}: gallery path ${ref} not under ./${slug}/`);
        const altLine = src[i + 1] ?? '';
        const alt = altLine.match(/^\s+alt:\s/);
        if (!alt) die(`${md}: '- src:' at line ${i + 1} not followed by 'alt:'`);
        const info = await upload(localPath(slug, ref), idFrom(slug, ref), { apply });
        console.log(`  ${info.dryRun ? 'would upload' : 'uploaded'} ${info.public_id}`);
        out.push(`${indent}- id: ${idFrom(slug, ref)}`);
        out.push(altLine);
        out.push(`${indent}  width: ${info.width}`);
        out.push(`${indent}  height: ${info.height}`);
        i++; // consumed alt line
        touched = true;
        continue;
      }

      out.push(line);
    }

    if (!touched) {
      console.log(`${md}: already migrated`);
      continue;
    }
    changed++;
    const next = `---\n${out.join('\n')}\n---\n${body}`;
    if (apply) {
      writeFileSync(path, next);
      console.log(`${md}: rewritten`);
    } else {
      console.log(`${md}: would rewrite (dry run)`);
    }
  }

  console.log(
    apply
      ? `\ndone — ${changed} file(s) rewritten`
      : `\ndry run — ${changed} file(s) would change; re-run with --apply`,
  );
}

// --- sync --------------------------------------------------------------------

async function sync(slug, images, write) {
  if (!slug || images.length === 0) die('usage: sync <slug> <image>... [--write]');
  const entries = [];

  for (const input of images) {
    const name = basename(input).replace(/\.[^.]+$/, '');
    const dest = join(TRAVEL_DIR, slug, `${name}.jpg`);
    resizeInto(input, dest);
    const info = await upload(dest, `travel/${slug}/${name}`, { apply: true });
    console.log(`uploaded ${info.public_id} (${info.width}x${info.height})`);
    entries.push(
      `  - id: ${info.public_id}\n    alt: TODO\n    width: ${info.width}\n    height: ${info.height}`,
    );
  }

  const block = entries.join('\n');
  const mdPath = join(TRAVEL_DIR, `${slug}.md`);

  if (write && existsSync(mdPath)) {
    const text = readFileSync(mdPath, 'utf8');
    const parts = text.match(/^(---\n[\s\S]*?\n)(---\n[\s\S]*)$/);
    if (!parts) die(`${slug}.md: no frontmatter`);
    writeFileSync(mdPath, `${parts[1]}${block}\n${parts[2]}`);
    console.log(`\n${slug}.md: appended ${entries.length} gallery entries — now fill in the alt text`);
  } else {
    console.log(`\n# ${slug} — paste into gallery: and fill in the alt text\n${block}`);
  }
}

// --- dispatch --------------------------------------------------------------------

const [mode, ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((a) => a.startsWith('--')));
const args = rest.filter((a) => !a.startsWith('--'));

if (mode === 'migrate') {
  await migrate(flags.has('--apply'));
} else if (mode === 'sync') {
  await sync(args[0], args.slice(1), flags.has('--write'));
} else {
  die('usage: cloudinary.mjs <migrate [--apply] | sync <slug> <image>... [--write]>');
}
