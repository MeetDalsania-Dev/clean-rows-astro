import type { APIRoute } from "astro";

// Every .astro page becomes a sitemap entry, so new pages are listed automatically.
const pages = Object.keys(import.meta.glob("./**/*.astro"));

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://www.cleanrowsdata.com");
  const urls = pages
    .filter((file) => !file.endsWith("/404.astro"))
    .map((file) =>
      file
        .replace(/^\.\//, "/")
        .replace(/\.astro$/, "")
        .replace(/\/index$/, "/"),
    )
    .map((route) => (route === "/index" ? "/" : route))
    .sort()
    .map((route) => `  <url><loc>${new URL(route, origin).href}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
