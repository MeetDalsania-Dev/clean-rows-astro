import type { APIRoute } from "astro";
import base from "../data/llms.md?raw";
import { getPosts } from "../lib/blog";

// llms.txt: the hand-written site summary, plus every published blog post.
export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://www.cleanrowsdata.com");
  const posts = await getPosts();
  const blog = posts.length
    ? `\n## Blog\n\n${posts
        .map((post) => `- [${post.data.title}](${new URL(`/blog/${post.id}`, origin).href}): ${post.data.description}`)
        .join("\n")}\n`
    : "";
  return new Response(base.trimEnd() + "\n" + blog, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
