// Works out which URLs to send to IndexNow after a Production deploy and writes
// them to $GITHUB_OUTPUT as `urls` (space separated paths).
//
// - Manual run: the "urls" input is used as is.
// - Deploy run: every file changed since the previous successful Production
//   deployment (GitHub deployments API; HEAD~1 when none is found). Page files map
//   to their URLs; a change to shared code (layouts, components, data, styles,
//   public JS or CSS) sends every URL in the live sitemap.
import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";

const SITE = "https://www.cleanrowsdata.com";
const { GITHUB_REPOSITORY, GITHUB_TOKEN, GITHUB_OUTPUT, INPUT_URLS = "", DEPLOY_SHA = "", DEPLOY_ID = "" } = process.env;

function output(paths) {
  const unique = [...new Set(paths)].sort();
  console.log(unique.length ? `URLs (${unique.length}):\n  ${unique.join("\n  ")}` : "No URLs to submit.");
  if (GITHUB_OUTPUT) appendFileSync(GITHUB_OUTPUT, `urls=${unique.join(" ")}\n`);
}

if (INPUT_URLS.trim()) {
  output(INPUT_URLS.trim().split(/\s+/));
  process.exit(0);
}

async function api(path) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}${path}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${path}: HTTP ${res.status}`);
  return res.json();
}

/** The commit of the last successful Production deployment before this one. */
async function previousProductionSha() {
  // Newest first: only deployments older than this one count.
  const deployments = await api("/deployments?environment=Production&per_page=100");
  const current = deployments.findIndex((d) => String(d.id) === DEPLOY_ID || d.sha === DEPLOY_SHA);
  for (const d of deployments.slice(current + 1)) {
    if (d.sha === DEPLOY_SHA) continue;
    const statuses = await api(`/deployments/${d.id}/statuses?per_page=20`);
    if (statuses.some((s) => s.state === "success")) return d.sha;
  }
  return null;
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const head = DEPLOY_SHA || git("rev-parse", "HEAD");
let base = null;
try {
  base = await previousProductionSha();
} catch (error) {
  console.log(`Could not read deployments (${error.message}); using ${head}~1.`);
}
try {
  if (base) git("cat-file", "-e", `${base}^{commit}`);
} catch {
  console.log(`Previous deploy ${base} is not in this checkout; using ${head}~1.`);
  base = null;
}
base ??= `${head}~1`;
console.log(`Changes ${base}..${head}`);

const files = git("diff", "--name-only", "--diff-filter=d", base, head).split("\n").filter(Boolean);
console.log(`Changed files:\n  ${files.join("\n  ") || "(none)"}`);

const SHARED = /^(src\/(layouts|components|data|styles|lib|content\/authors)\/|public\/[^/]+\.(js|css)$|astro\.config\.)/;
const paths = [];
let everything = false;
for (const file of files) {
  if (file === "src/data/llms.md") paths.push("/llms.txt");
  if (SHARED.test(file)) everything = true;
  const post = file.match(/^src\/content\/posts\/(.+)\.(mdoc|md)$/);
  if (post) paths.push(`/blog/${post[1]}`, "/blog");
  const page = file.match(/^src\/pages\/(.+)\.(astro|ts)$/);
  if (!page) continue;
  if (page[1].includes("[")) { everything = true; continue; }
  // llms.txt.ts -> /llms.txt, foo/index.astro -> /foo, index.astro -> /
  const path = "/" + page[1].replace(/(^|\/)index$/, "");
  paths.push(path === "/" ? "/" : path.replace(/\/$/, ""));
}

if (everything) {
  console.log("Shared code changed: submitting every sitemap URL.");
  try {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.push(new URL(loc).pathname.replace(/(.)\/$/, "$1"));
  } catch (error) {
    // Live sitemap unreachable: fall back to the static pages in the repository.
    console.log(`Sitemap fetch failed (${error.message}); using src/pages instead.`);
    for (const file of git("ls-files", "src/pages", "src/content/posts").split("\n")) {
      const page = file.match(/^src\/pages\/(.+)\.astro$/);
      if (page && !page[1].includes("[")) paths.push("/" + page[1].replace(/(^|\/)index$/, ""));
      const post = file.match(/^src\/content\/posts\/(.+)\.(mdoc|md)$/);
      if (post) paths.push(`/blog/${post[1]}`);
    }
  }
}
output(paths.filter((p) => !p.startsWith("/404")));
