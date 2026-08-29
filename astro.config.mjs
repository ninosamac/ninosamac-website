import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` drives canonical URLs, the sitemap, and RSS links.
// Update to https://ninosamac.com once the custom domain is live.
export default defineConfig({
  site: 'https://ninosamac-website.pages.dev',
  integrations: [sitemap()],
});
