import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // Production origin for canonical URLs, structured data and the sitemap.
  site: 'https://www.cleanrowsdata.com',
  integrations: [markdoc(), react(), keystatic()],
  adapter: vercel(),
});
