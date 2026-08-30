# ninosamac-website

Personal website for Nino Samac — CV, blog, travel photography, and cooking recipes.

## Stack

| Concern        | Choice                                    |
| -------------- | ----------------------------------------- |
| Site generator | [Astro](https://astro.build)              |
| Hosting        | [Cloudflare Pages](https://pages.cloudflare.com) (deploy on `git push`) |
| Domain         | `ninosamac.com` (to be registered), DNS on Cloudflare |
| Content format | Markdown / MDX in the repo                |
| Images         | CV/blog images in-repo via Astro's pipeline; travel galleries on [Cloudinary](https://cloudinary.com) (`CLOUDINARY_CLOUD` in `src/consts.ts`), referenced by public ID |

See [`docs/architecture.md`](docs/architecture.md) for the decision record and
[`docs/roadmap.md`](docs/roadmap.md) for the phased build plan.

## Local development

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
```

## Deployment

Every push to `main` triggers a Cloudflare Pages build and deploy. Pull request
branches get preview URLs automatically.
