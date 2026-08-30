# ninosamac-website

Personal website for Nino Samac — CV, blog, travel photography, and cooking recipes.

## Stack

| Concern        | Choice                                    |
| -------------- | ----------------------------------------- |
| Site generator | [Astro](https://astro.build)              |
| Hosting        | [Cloudflare Pages](https://pages.cloudflare.com) (deploy on `git push`) |
| Domain         | `ninosamac.com` (to be registered), DNS on Cloudflare |
| Content format | Markdown / MDX in the repo                |
| Images         | In-repo, processed by Astro's `astro:assets` pipeline. Travel photos live in `src/content/travel/<trip>/`, downscaled to ≤2560 px before commit |

See [`docs/architecture.md`](docs/architecture.md) for the decision record,
[`docs/roadmap.md`](docs/roadmap.md) for the phased build plan, and
[`docs/build-notes.md`](docs/build-notes.md) for build/deploy gotchas.

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
