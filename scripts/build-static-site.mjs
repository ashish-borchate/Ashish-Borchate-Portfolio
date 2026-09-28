#!/usr/bin/env node
/**
 * Builds a static folder (out/) you can drag to Netlify Drop or open locally.
 * Optional: copy to ~/Documents/cursor/Ashish-Borchate-Portfolio
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "out");

const copyTarget =
  process.env.EXPORT_DESKTOP_DIR ||
  join(homedir(), "Documents", "cursor", "Ashish-Borchate-Portfolio");

console.log("Building static site (BUILD_STATIC=1)…");
const build = spawnSync("npm", ["run", "build"], {
  cwd: root,
  env: { ...process.env, BUILD_STATIC: "1" },
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (!existsSync(join(outDir, "index.html"))) {
  console.error("Expected out/index.html after static export.");
  process.exit(1);
}

const rewrite = spawnSync(
  "node",
  [join(root, "scripts", "rewrite-static-for-file.mjs"), outDir],
  { cwd: root, stdio: "inherit" },
);
if (rewrite.status !== 0) {
  process.exit(rewrite.status ?? 1);
}

if (process.argv.includes("--copy-desktop")) {
  mkdirSync(copyTarget, { recursive: true });
  rmSync(copyTarget, { recursive: true, force: true });
  mkdirSync(copyTarget, { recursive: true });
  cpSync(outDir, copyTarget, { recursive: true });
  const launcherSrc = join(root, "scripts", "Open-Portfolio.command");
  const launcherDest = join(copyTarget, "Open Portfolio.command");
  if (existsSync(launcherSrc)) {
    cpSync(launcherSrc, launcherDest);
    spawnSync("chmod", ["+x", launcherDest]);
  }
  const readmeSrc = join(root, "scripts", "DESKTOP-FOLDER-README.txt");
  if (existsSync(readmeSrc)) {
    cpSync(readmeSrc, join(copyTarget, "HOW-TO-UPDATE.txt"));
  }
  console.log("");
  console.log("Copied static site to:");
  console.log(`  ${copyTarget}`);
  console.log("");
  console.log("Open in browser:");
  console.log(`  Double-click index.html in Finder, or`);
  console.log(`  cd "${copyTarget}" && npx serve -p 8765  →  http://localhost:8765`);
  console.log("");
  console.log("Entry file (folder, not single HTML like Altura):");
  console.log(`  file://${join(copyTarget, "index.html")}`);
  console.log("");
  console.log("Easiest open (double-click in Finder):");
  console.log(`  ${join(copyTarget, "Open Portfolio.command")}`);
}

console.log("");
console.log("Static build ready:");
console.log(`  ${outDir}`);
console.log("Netlify Drop: drag the whole `out` folder to https://app.netlify.com/drop");
