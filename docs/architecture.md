# Architecture decision record

Status: accepted — 2026-08-28

## Context

`github.com/ninosamac/ninosamac` is GitHub's special profile-README repository:
its `README.md` renders on the GitHub profile page. It cannot host a built
website and mixing the two concerns is undesirable. A dedicated personal
website is wanted, covering four content types:

- **CV** — a single page plus a downloadable PDF.
- **Blog** — long-form posts.
- **Travel photography** — image-heavy galleries.
- **Cooking recipes** — structured posts (ingredients, steps, timings).

## Decision

### Dedicated repository

The site lives in a new repo, `ninosamac/ninosamac-website`, kept separate from
the profile-README repo.

### Site generator: Astro

Chosen over Hugo and Eleventy because the four content types each want a
different layout (CV page, article list, photo grid, recipe card with
structured data). Astro's component model handles that mix without fighting a
theme, while still letting content be plain Markdown/MDX. Built-in image
optimization matters for the travel galleries. Content Collections give typed
front-matter and per-type schemas.

### Hosting: Cloudflare Pages

Chosen over GitHub Pages and Netlify:

- Generous bandwidth — relevant for a photo-heavy site.
- Git-push deploys with automatic PR preview URLs.
- Same vendor as the DNS (domain will be on Cloudflare), so no cross-provider
  DNS juggling.

GitHub Pages was rejected because it has no build plugins and weaker handling of
large media. Netlify is a fine fallback if Cloudflare Pages proves limiting.

### Domain: ninosamac.com

A custom domain (`ninosamac.com` or a close variant) will be registered and its
DNS managed in Cloudflare. Until then the site is reachable at the
`*.pages.dev` URL. Registrar TBD (Cloudflare Registrar is at-cost and keeps
everything in one place).

### Content authoring

Markdown/MDX committed to the repo, edited in an editor or Obsidian. No CMS
initially. If editing friction appears, add **Sveltia CMS** or **Decap CMS**
(Git-backed admin UI, no extra hosting) rather than a headless CMS service.

### Images

Start with optimized originals committed to the repo and processed by Astro's
`<Image>` / `astro:assets` pipeline. If the repo size becomes a problem, move
gallery originals to an image host (Cloudflare Images or Cloudinary free tier)
and reference by URL. Full-resolution RAW/JPEG originals are never committed.

**Update 2026-08-30 (Phase 5):** briefly wired travel galleries to Cloudinary,
then reverted — it was too much moving infrastructure (account, API keys,
upload step) for a handful of trips a year. Travel photos are committed to
`src/content/travel/<trip>/`, downscaled to ≤2560 px, and processed by
`astro:assets` like every other image. A hosted image service with an upload
UI / dashboard is tracked as a separate follow-up; adopt it only if the repo
size becomes a real problem.

## Consequences

- Two repos to maintain: profile README and website. Acceptable — they change
  at different rates and for different reasons.
- Node/Astro toolchain and an `npm install` are required to build locally.
- Recipe posts should emit [schema.org/Recipe](https://schema.org/Recipe)
  structured data (JSON-LD) so search engines surface cook time and ingredients.
- A later migration off Cloudflare Pages is low-cost: the build output is static
  and portable.
