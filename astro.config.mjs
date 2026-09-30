import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.cleanrowsdata.com',

  integrations: [
    sitemap(),
    react(),
    markdoc(),
    keystatic()
  ],

  adapter: vercel(),
});