// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production origin for canonical URLs, structured data and the sitemap.
  site: 'https://www.cleanrowsdata.com',

  integrations: [sitemap()],
});