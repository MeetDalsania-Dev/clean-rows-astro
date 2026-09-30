// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';

// The Keystatic admin (and the React it needs) only loads for `astro dev`, so the
// public site stays fully static with no admin routes. Posts are saved as files.
const isDev = process.argv.includes('dev');
const adminIntegrations = isDev
  ? [(await import('@astrojs/react')).default(), (await import('@keystatic/astro')).default()]
  : [];

export default defineConfig({
  // Production origin for canonical URLs, structured data and the sitemap.
  site: 'https://www.cleanrowsdata.com',
  integrations: [markdoc(), ...adminIntegrations],
  adapter: vercel(),
});
