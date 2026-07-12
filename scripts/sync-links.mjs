import fs from "fs";
import vm from "vm";
import { linkLabels, mirrorNote } from "./link-labels.mjs";

function loadHub(filePath, exportName) {
  let src = fs.readFileSync(filePath, "utf8");
  src = src.replace(/^import .+;\s*/gm, "");
  src = src.replace(/^export /gm, "");
  src = src.replace(/:\s*HubContent\b/g, "");
  src = src.replace(/:\s*Category\[\]/g, "");
  src = src.replace(/:\s*Subsection\[\]/g, "");
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(`${src}\nmodule.exports = ${exportName};`, sandbox);
  return sandbox.module.exports;
}

function collectLinks(content) {
  const map = new Map();
  const walk = (obj) => {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach(walk);
      return;
    }
    if (obj.id && Array.isArray(obj.links)) map.set(obj.id, obj.links);
    Object.values(obj).forEach(walk);
  };
  walk(content);
  return map;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatLink(link, locale) {
  const label = linkLabels[link.url]?.[locale] ?? link.label;
  const lines = ["          {", `            label: "${label}",`, `            url: "${link.url}",`];
  if (link.fileType) lines.push(`            fileType: "${link.fileType}",`);
  const isMirror =
    link.url.includes("lolinet") ||
    link.url.includes("sammobile") ||
    link.url.includes("needrom");
  const note = isMirror
    ? mirrorNote[locale]
    : locale === "sk"
      ? link.note
      : undefined;
  if (note) lines.push(`            note: "${note}",`);
  if (lines.at(-1).endsWith(",")) lines[lines.length - 1] = lines.at(-1).slice(0, -1);
  lines.push("          }");
  return lines.join("\n");
}

function replaceLinksInFile(filePath, linkMap, locale) {
  let text = fs.readFileSync(filePath, "utf8");

  for (const [id, skLinks] of linkMap) {
    const idRe = new RegExp(`id:\\s*"${escapeRe(id)}"[\\s\\S]*?links:\\s*\\[`, "m");
    const m = text.match(idRe);
    if (!m) continue;

    const start = text.indexOf(m[0]) + m[0].length;
    let depth = 1;
    let i = start;
    while (i < text.length && depth > 0) {
      if (text[i] === "[") depth++;
      if (text[i] === "]") depth--;
      i++;
    }

    const rebuilt = skLinks.map((link) => formatLink(link, locale)).join(",\n");
    text = `${text.slice(0, start)}\n${rebuilt}\n        ${text.slice(i - 1)}`;
  }

  fs.writeFileSync(filePath, text);
}

const sk = loadHub("app/data/content/sk.ts", "skHubContent");
const map = collectLinks(sk);

const targets = [
  ["app/data/content/en.ts", "en", "enHubContent"],
  ["app/data/content/cs.ts", "cs", "csHubContent"],
  ["app/data/content/pl.ts", "pl", "plHubContent"],
  ["app/data/content/de.ts", "de", "deHubContent"],
  ["app/data/content/hu/flashovanie.ts", "hu", "flashovanieCategories"],
  ["app/data/content/hu/diagnostika.ts", "hu", "diagnostikaCategories"],
  ["app/data/content/hu/nastroje.ts", "hu", "nastrojeCategories"],
  ["app/data/content/hu/zdielanie.ts", "hu", "zdielanieSubsections"],
];

for (const [file, locale, exportName] of targets) {
  if (file.includes("/hu/")) {
    const content = loadHub(file, exportName);
    const partial = collectLinks(content);
    replaceLinksInFile(file, partial, locale);
    // also apply sk links for ids in this file
    const filtered = new Map([...map].filter(([id]) => partial.has(id)));
    replaceLinksInFile(file, filtered, locale);
  } else {
    replaceLinksInFile(file, map, locale);
  }
}

console.log(`Synced ${targets.length} files from sk.ts (${map.size} subsections)`);