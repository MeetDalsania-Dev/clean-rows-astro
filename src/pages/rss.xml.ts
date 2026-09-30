import type { APIRoute } from "astro";
import { getPosts } from "../lib/blog";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://www.cleanrowsdata.com");
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.id}`, origin).href;
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Clean Rows blog</title>
    <link>${new URL("/blog", origin).href}</link>
    <description>Guides on building B2B prospect lists, buying B2B data and keeping lead data fresh.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
