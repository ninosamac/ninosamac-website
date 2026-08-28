# Roadmap

Phased build plan. Each phase is a shippable increment. Track work as GitHub
issues in `ninosamac/ninosamac-website`.

## Phase 0 — Repo and docs

- [x] Decide stack (see [`architecture.md`](architecture.md)).
- [ ] Create `ninosamac/ninosamac-website` on GitHub and push this scaffold.
- [ ] Open tracking issues for the phases below.

## Phase 1 — Skeleton site live

- [ ] `npm create astro@latest` — minimal template, TypeScript strict.
- [ ] Base layout: header, nav, footer, light/dark, responsive.
- [ ] Home page with a short intro and links to the sections.
- [ ] Connect the repo to Cloudflare Pages; confirm push-to-deploy and PR
      previews work.
- [ ] Site reachable at the `*.pages.dev` URL.

## Phase 2 — CV

- [ ] CV content as structured data (YAML or a typed content entry).
- [ ] `/cv` page rendered from that data.
- [ ] Downloadable PDF — generated from the same source (Typst or a
      print-stylesheet + headless-Chrome export) or maintained separately.

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
