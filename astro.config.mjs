import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` drives canonical URLs, the sitemap, and RSS links.
export default defineConfig({
  site: 'https://ninosamac.com',
  integrations: [sitemap()],
});
