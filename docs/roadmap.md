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

- [ ] Astro Content Collection `blog` with a front-matter schema
      (title, date, description, tags, draft).
- [ ] Post list page with pagination.
- [ ] Post detail layout; RSS feed; sitemap.
- [ ] Tag pages.

## Phase 4 — Recipes

- [ ] Content Collection `recipes` (title, date, servings, prep/cook time,
      ingredients[], steps[], tags, hero image).
- [ ] Recipe card layout.
- [ ] Emit `schema.org/Recipe` JSON-LD per recipe.
- [ ] Recipe index with filter by tag.

## Phase 5 — Travel photography

- [ ] Content Collection `travel` (title, location, date, cover, gallery[]).
- [ ] Responsive photo grid + lightbox.
- [ ] Astro image optimization: responsive `srcset`, lazy loading, blur-up.
- [ ] Decide in-repo vs. image-host based on repo size at this point.

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
