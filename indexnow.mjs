// Submits URLs to IndexNow (api.indexnow.org) using the site's key file.
// Usage: node indexnow.mjs <url...> or: npm run indexnow -- /a /b
const KEY = "0500ad06c6144191bb7ded6bc9cc6d34";
const HOST = "https://www.cleanrowsdata.com";

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("Usage: node indexnow.mjs <url...>");
  process.exit(1);
}
// Accept absolute URLs or site-relative paths.
const absolute = urls.map((u) => (u.startsWith("http") ? u : new URL(u, HOST).href));

const res = await fetch("https://api.indexnow.org/indexnow/" + KEY, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: "www.cleanrowsdata.com", key: KEY, urlList: absolute }),
});
const body = await res.text();
console.log("HTTP " + res.status + " " + res.statusText);
console.log(body);
// 200 (accepted) and 202 (duplicate host) are success.
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
