// Post build: write a markdown copy of every built HTML page for agents that
// send "Accept: text/markdown". Reads dist/client (the static output of the
// Vercel adapter) and writes md/<path>.md into dist/client and, when present,
// .vercel/output/static, which is what Vercel deploys. Build time only.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { parse } from "node-html-parser";
import TurndownService from "turndown";

const ORIGIN = "https://www.cleanrowsdata.com";
const SRC = "dist/client";
const OUTS = [SRC, ".vercel/output/static"].filter((d) => existsSync(d));

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
td.remove(["script", "style", "noscript", "form", "svg", "button", "template", "iframe"]);

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "md" || name === "_astro" ? [] : htmlFiles(p);
    return name === "index.html" ? [p] : [];
  });

let count = 0;
for (const file of htmlFiles(SRC)) {
  const route = "/" + relative(SRC, dirname(file)).replace(/\\/g, "/");
  const root = parse(readFileSync(file, "utf8"));
  const main = root.querySelector("main");
  if (!main) continue;
  const h1 = main.querySelector("h1");
  if (!h1) continue;
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") || ORIGIN + (route === "/" ? "/" : route);

  // Drop navigation, forms, cookie banners and anything hidden from readers.
  main
    .querySelectorAll('nav, header, footer, form, script, style, noscript, [aria-hidden="true"], [hidden], #cookie-banner, [aria-label="Cookie preferences"], .ed-breadcrumb, .ed-scroll-hint')
    .forEach((el) => el.remove());
  // Absolute links and image sources.
  main.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (href.startsWith("/") && !href.startsWith("//")) a.setAttribute("href", ORIGIN + href);
    else if (href.startsWith("#")) a.setAttribute("href", canonical + href);
  });
  main.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (src.startsWith("/")) img.setAttribute("src", ORIGIN + src);
  });

  const title = h1.text.replace(/\s+/g, " ").trim();
  h1.remove();
  const body = td
    .turndown(main.toString())
    .replace(/\)\[/g, ") [")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const md = `# ${title}\n\nSource: ${canonical}\n\n${body}\n`;
  const rel = route === "/" ? "index" : route.slice(1);
  for (const out of OUTS) {
    const target = join(out, "md", rel + ".md");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, md);
  }
  count++;
}
console.log(`[markdown] wrote ${count} pages to ${OUTS.map((o) => o + "/md").join(" and ")}`);
