# Build & deploy notes

Operational gotchas for building and deploying this site. Project decisions live
in [`architecture.md`](architecture.md); phased work in [`roadmap.md`](roadmap.md).

## Cloudflare Pages runs `npm ci` — keep the lockfile complete

Cloudflare's build runs `npm clean-install` (`npm ci`), which **aborts** (no
fallback to `npm install`) whenever `package-lock.json` doesn't exactly match
the dependency tree `package.json` implies.

This repo's toolchain (the Astro compiler binding, `sharp`, `rolldown` via
Vite) pulls in packages that ship a per-platform native binary plus a WASM
fallback with `@emnapi/*` shared deps. Running `npm install <pkg>` on one
machine can write a lockfile that omits some of those optional/nested entries;
Cloudflare's `npm ci` then fails with `Missing: @emnapi/... from lock file` and
no site is deployed (old HTML keeps serving, new routes 404).

It has bitten more than once (commits `f965c03`, `c8eedd9`).

**Rule:** never commit a lockfile produced by an incremental
`npm install <pkg>`. Regenerate it fully and verify before pushing:

```sh
rm -rf node_modules package-lock.json
npm install
npm ci          # the exact command Cloudflare runs — must pass locally
npm test && npm run build
```

Prefer zero-dependency tooling where practical — e.g. tests use Node's built-in
`node --test` (Node 24, native type stripping) rather than a test framework, so
the lockfile never churns from test deps. Node version is pinned in `.nvmrc`.

## Cloudinary credentials

The Astro build only needs the Cloudinary **cloud name** (`CLOUDINARY_CLOUD` in
`src/consts.ts`) — it's public and safe to commit. `scripts/cloudinary.mjs`
(travel-image upload/migrate) additionally needs the full
`CLOUDINARY_URL=cloudinary://<key>:<secret>@kantyokv`, kept in an **untracked
`.env`** (already gitignored). Get it from the Cloudinary console → API Keys.
Run the script as `npm run images -- <mode>` (wired to `node --env-file=.env`).
Cloudflare's build never touches `.env` and does not need it.

## History rewrite — 2026-08-31

After the travel galleries moved to Cloudinary, the ~65 MB of now-unused JPG
blobs still sat in git history (`.git` was 67 MB, ~97 % of it images). They were
stripped with `git-filter-repo`:

```sh
git bundle create ../ninosamac-website-pre-purge.bundle --all   # safety net
python3 git-filter-repo --path-glob 'src/content/travel/*/*.jpg' --invert-paths --force
git remote add origin https://github.com/ninosamac/ninosamac-website.git  # filter-repo drops it
git reflog expire --expire=now --all && git gc --prune=now
git push --force origin main
```

Result: `.git` 67 MB → ~0.5 MB. **Every commit hash from the first gallery
onward changed** — `main` went `1170a1b` → `3d82066` on the force-push. The
tree contents are identical; only blobs were removed.

Any clone made before this must be re-cloned, or realigned with
`git fetch origin && git reset --hard origin/main` (local-only commits would be
lost). Cloudflare Pages just re-clones and redeploys — no action needed there.
Don't re-add large binaries to `src/content/travel/<slug>/`; those dirs are
gitignored staging for `scripts/cloudinary.mjs` (see Cloudinary credentials
above).

## Editor swap files

`*.swp` / `*.swo` / `*~` are gitignored. One vim swap file was committed by
accident (`c8eedd9`) via `git add -A` while a file was open in an editor —
check `git status` before a broad add.
