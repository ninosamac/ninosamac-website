# Roadmap

Phased build plan. Each phase is a shippable increment. Track work as GitHub
issues in `ninosamac/ninosamac-website`.

## Phase 0 — Repo and docs

- [x] Decide stack (see [`architecture.md`](architecture.md)).
- [ ] Create `ninosamac/ninosamac-website` on GitHub and push this scaffold.
- [ ] Open tracking issues for the phases below.

## Phase 1 — Skeleton site live

- [x] Astro project scaffolded manually, TypeScript strict (`astro/tsconfigs/strict`).
- [x] Base layout: sticky header + nav, footer, light/dark with a no-flash
      toggle, responsive; design tokens in `src/styles/global.css`.
- [x] Home page with a short intro and a card grid linking to the sections.
- [x] Placeholder pages for `/cv`, `/blog`, `/recipes`, `/travel`, plus a 404.
- [x] `npm run build` green — 6 static pages.
- [x] Connected the repo to Cloudflare Pages (Git integration → push-to-deploy;
      PR previews are automatic).
- [x] Live at https://ninosamac-website.pages.dev/.

## Phase 2 — CV

- [x] CV source at `src/data/cv.md` — typed frontmatter (name, title, contact,
      photo, links, targeting) + ATS-friendly Markdown body.
- [x] `/cv` page: header rendered from frontmatter, body via `<Content />`,
      styled sections and skills table, circular photo.
- [x] "Print / Save as PDF" button + `@media print` styles (site chrome and
      action button hidden, black-on-white, break-inside guards).
- [ ] *Optional later:* build-time PDF file (Typst or headless-Chrome) if a
      static `cv.pdf` download is wanted instead of browser print-to-PDF.

## Phase 3 — Blog

- [x] `blog` content collection (`src/content.config.ts`) — Zod schema for
      title, date, description, tags, draft; glob loader over `src/content/blog`.
- [x] `/blog` list with pagination (`[...page].astro`, 10/page); drafts hidden.
- [x] `/blog/[slug]` post layout with date + tag links; shared prose styles.
- [x] `/blog/tags/[tag]` pages.
- [x] RSS at `/rss.xml`; sitemap via `@astrojs/sitemap`; `<link>` tags in head.
- [x] Seed post: "Building this site with Claude Code".

## Phase 4 — Recipes

- [x] Content Collection `recipes` (`src/content.config.ts`) — Zod schema for
      title, date, description, servings, prep/cook minutes, ingredients[],
      steps[], tags, optional `hero` via the image pipeline, draft.
- [x] Recipe card layout (`src/components/RecipeCard.astro`) — hero thumb,
      title, description, time + servings meta, tag links.
- [x] `/recipes/[slug]` page: facts list, ingredients/method columns, optional
      Markdown notes, tag links.
- [x] `schema.org/Recipe` JSON-LD per recipe; pure helpers in
      `src/lib/recipes.ts` (`formatMinutes`, `isoDuration`, `recipeJsonLd`)
      covered by `node --test` (`npm test`, no test-framework dependency).
- [x] `/recipes` index and `/recipes/tags/[tag]` pages (mirrors the blog).
- [x] Seed recipes: Crni rižot, Fritule.

## Phase 5 — Travel photography

- [x] Content Collection `travel` (`src/content.config.ts`) — title, location,
      date, description, `cover` + `gallery[]` (`{ src, alt }`) via the
      `astro:assets` `image()` pipeline.
- [x] Responsive photo grid (CSS `columns`) + native `<dialog>` lightbox with
      prev/next, arrow keys, and Esc — no JS dependency
      (`src/components/PhotoGrid.astro`).
- [x] Image optimization via `astro:assets` — `<Image>` with `widths`/`sizes`
      srcset, `loading="lazy"`; lightbox variants pre-generated with
      `getImage()`. Originals downscaled to ≤2560 px before commit.
- [x] Decision: gallery images live **in-repo** (`src/content/travel/<trip>/`),
      processed by Astro at build. Tried Cloudinary first; dropped it as
      overkill for a handful of trips a year. Revisit if the repo bloats —
      see follow-up issue on a hosted upload workflow + dashboard.
- [x] First trip: "Trip to the Dolomites" (15 photos).

## Phase 6 — Custom domain and polish

- [ ] Register `ninosamac.com` (or variant); DNS to Cloudflare.
- [ ] Attach custom domain to the Pages project; verify HTTPS.
- [ ] Update the profile-README repo to link to the new site.
- [ ] SEO: per-page meta, Open Graph images, `robots.txt`.
- [ ] Analytics — Cloudflare Web Analytics (no cookies).
- [ ] Lighthouse pass (performance, a11y, best practices).

## Later / optional

- [ ] Git-backed CMS (Sveltia or Decap) if Markdown editing gets tedious.
- [ ] Newsletter (if the blog warrants it).
- [ ] Comments (giscus) on blog posts.
