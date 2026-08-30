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

## Editor swap files

`*.swp` / `*.swo` / `*~` are gitignored. One vim swap file was committed by
accident (`c8eedd9`) via `git add -A` while a file was open in an editor —
check `git status` before a broad add.
