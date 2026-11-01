// Submits URLs to IndexNow (api.indexnow.org, bing.com, yandex.com) using the
// site's key file. Usage: node indexnow.mjs <url...> or npm run indexnow -- /a /b
//
// Spec-compliant request: POST to the /indexnow endpoint (not /indexnow/<key>),
// body carries host + key + keyLocation + urlList, and the Content-Type header
// includes charset=utf-8.
const KEY = "0500ad06c6144191bb7ded6bc9cc6d34";
const HOST = "www.cleanrowsdata.com";
const keyLocation = "https://" + HOST + "/" + KEY + ".txt";

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("Usage: node indexnow.mjs <url...>");
  process.exit(1);
}
// Accept absolute URLs or site-relative paths, all on the same host.
const urlList = urls.map((u) => (u.startsWith("http") ? u : "https://" + HOST + u));

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList });
const endpoints = [
  ["api.indexnow.org", "https://api.indexnow.org/indexnow"],
  ["bing.com", "https://www.bing.com/indexnow"],
  ["yandex.com", "https://yandex.com/indexnow"],
];

let exitCode = 0;
for (const [name, url] of endpoints) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  const text = await res.text();
  // 200 (accepted), 202 (accepted / duplicate host) are success.
  const ok = res.status === 200 || res.status === 202;
  if (!ok) exitCode = 1;
  console.log(name + ": HTTP " + res.status + " " + res.statusText);
  console.log(text ? "  " + text : "  (empty body)");
}
process.exit(exitCode);
