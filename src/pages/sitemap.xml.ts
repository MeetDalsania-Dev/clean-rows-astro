import type { APIRoute } from "astro";
import { getPosts, isoDate } from "../lib/blog";

// Every static .astro page becomes a sitemap entry, so new pages are listed
// automatically. Blog posts come from the content collection (drafts excluded).
const pages = Object.keys(import.meta.glob("./**/*.astro"));

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://www.cleanrowsdata.com");
  const posts = await getPosts();
  const routes = pages
    .filter((file) => !file.endsWith("/404.astro") && !file.includes("["))
    .map((file) => file.replace(/^\.\//, "/").replace(/\.astro$/, "").replace(/\/?index$/, "") || "/")
    .filter((route) => route !== "/blog" || posts.length > 0)
    .sort()
    .map((route) => ({ loc: new URL(route, origin).href, lastmod: undefined as string | undefined }));
  const entries = [
    ...routes,
    ...posts.map((post) => ({
      loc: new URL(`/blog/${post.id}`, origin).href,
      lastmod: isoDate(post.data.updatedDate ?? post.data.publishedDate),
    })),
  ]
    .map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
