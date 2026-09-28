#!/usr/bin/env node
/**
 * Rewrites Next static export paths so the folder works when opened via file://
 * (double-click index.html). Absolute "/_next/..." breaks on file://.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";

const TEXT_EXT = new Set([
  ".html",
  ".css",
  ".js",
  ".json",
  ".txt",
  ".svg",
  ".xml",
]);

function toRelative(fromFile, outDir, absolutePath) {
  if (!absolutePath.startsWith("/")) return absolutePath;
  const target = join(outDir, absolutePath.slice(1));
  const fromDir = dirname(fromFile);
  let rel = relative(fromDir, target);
  if (!rel || rel === ".") rel = ".";
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.replace(/\\/g, "/");
}

function rewriteContent(text, filePath, outDir) {
  let out = text;

  const replaceAbs = (input, quote) => {
    const pattern = new RegExp(`${quote}(\\/(?:_next|assets)\\/[^${quote}]*)${quote}`, "g");
    return input.replace(pattern, (_m, absPath) => {
      return `${quote}${toRelative(filePath, outDir, absPath)}${quote}`;
    });
  };

  out = replaceAbs(out, '"');
  out = replaceAbs(out, "'");

  out = out.replace(/url\((\/(?:_next|assets)\/[^)]+)\)/g, (_m, absPath) => {
    return `url(${toRelative(filePath, outDir, absPath)})`;
  });

  out = out.replace(/href="(\/favicon[^"]*)"/g, (_m, absPath) => {
    return `href="${toRelative(filePath, outDir, absPath.split("?")[0])}${absPath.includes("?") ? absPath.slice(absPath.indexOf("?")) : ""}"`;
  });

  // Remaining root-only links in HTML (e.g. /robots.txt not used in page)
  if (filePath.endsWith(".html")) {
    out = out.replace(/href="\/(?!\/)(?!\.\/)([^"]*)"/g, (_m, rest) => {
      return `href="${toRelative(filePath, outDir, `/${rest.split("?")[0]}`)}${rest.includes("?") ? rest.slice(rest.indexOf("?")) : ""}"`;
    });
    out = out.replace(/src="\/(?!\/)(?!\.\/)([^"]*)"/g, (_m, rest) => {
      return `src="${toRelative(filePath, outDir, `/${rest.split("?")[0]}`)}${rest.includes("?") ? rest.slice(rest.indexOf("?")) : ""}"`;
    });
  }

  return out;
}

function walk(dir, outDir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, outDir);
      continue;
    }
    const ext = extname(name).toLowerCase();
    if (!TEXT_EXT.has(ext) && name !== "icon") {
      continue;
    }
    if (st.size > 8 * 1024 * 1024) continue;
    const raw = readFileSync(full, "utf8");
    const next = rewriteContent(raw, full, outDir);
    if (next !== raw) {
      writeFileSync(full, next, "utf8");
    }
  }
}

const outDir = process.argv[2];
if (!outDir) {
  console.error("Usage: node rewrite-static-for-file.mjs <out-dir>");
  process.exit(1);
}

walk(outDir, outDir);
console.log("Rewrote static paths for file:// and folder hosting:", outDir);
