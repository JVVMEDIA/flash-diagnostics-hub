import fs from "fs";
import https from "https";
import http from "http";

const src = fs.readFileSync("app/data/content/sk.ts", "utf8");
const re = /url:\s*"(https?:\/\/[^"]+)"/g;
const urls = [...new Set([...src.matchAll(re)].map((m) => m[1]))];

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(
      url,
      { method: "HEAD", timeout: 12000, headers: { "User-Agent": "FlashDiagnosticsHub-LinkCheck/1.0" } },
      (res) => {
        const loc = res.headers.location;
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && loc && redirects < 5) {
          const next = loc.startsWith("http") ? loc : new URL(loc, url).href;
          fetchUrl(next, redirects + 1).then(resolve);
          return;
        }
        resolve({ url, status: res.statusCode, final: url });
      },
    );
    req.on("error", (e) => resolve({ url, status: "ERR", error: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ url, status: "TIMEOUT" });
    });
    req.end();
  });
}

const results = [];
for (const url of urls.sort()) {
  const r = await fetchUrl(url);
  results.push(r);
  const icon = r.status === 200 || r.status === 405 ? "OK" : "BAD";
  console.log(`${icon}\t${r.status}\t${url}`);
}

const bad = results.filter((r) => !["OK"].includes(String(r.status)) && r.status !== 200 && r.status !== 405);
console.log("\n--- Summary ---");
console.log(`Total: ${urls.length}, Issues: ${bad.length}`);
bad.forEach((r) => console.log(`${r.status}\t${r.url}${r.error ? ` (${r.error})` : ""}`));