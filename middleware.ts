// Vercel Routing Middleware (not Astro middleware). Serves the markdown copy of
// a page when the request asks for it with "Accept: text/markdown". Static
// files are served before vercel.json rewrites, so this has to run here.
import { next, rewrite } from "@vercel/functions";
import mdRoutes from "./md-routes.json";

const routes = new Set<string>(mdRoutes as string[]);

export const config = {
  // Skip assets: anything whose last segment has a dot, plus these folders.
  matcher: ["/((?!_astro/|fonts/|assets/|samples/|md/)(?:[^.]*/)?[^/.]*)"],
};

export default function middleware(request: Request) {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/markdown")) return next();
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const target = path === "/" ? "/md/index.md" : `/md${path}.md`;
  if (!routes.has(target)) return next();
  return rewrite(new URL(target, url));
}
