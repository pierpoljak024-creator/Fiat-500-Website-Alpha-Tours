#!/usr/bin/env node
/**
 * Media audit for the Fiat 500 Rome site.
 *
 * The site only ever references local files:
 *   /images/hero.jpg
 *   /images/gallery-1.jpg … /images/gallery-8.jpg
 *   /videos/hero.mp4
 *   /videos/secondary.mp4
 *
 * Allowed file types in /public: .webp .png .jpg .jpeg .gif .mp4
 * Anything else is skipped (the UI keeps its CSS placeholder) and logged here
 * by file name. Remote image URLs and inline data URIs are treated as errors,
 * because every image must be a local /public path.
 *
 * Run with: npm run media:check
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const SOURCE_DIRS = ["app", "components", "lib"];

const ALLOWED = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".mp4"]);
const SLOTS = [
  "images/hero.jpg",
  ...Array.from({ length: 8 }, (_, index) => `images/gallery-${index + 1}.jpg`),
  "videos/hero.mp4",
  "videos/secondary.mp4",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const toPublicPath = (file) =>
  path.relative(PUBLIC_DIR, file).split(path.sep).join("/");

const files = walk(PUBLIC_DIR);
const supported = new Map();
const skipped = [];

for (const file of files) {
  const name = path.basename(file);
  // Dotfiles such as .gitkeep only hold the folder in git — nothing is served.
  if (name.startsWith(".")) continue;
  const ext = path.extname(file).toLowerCase();
  if (ALLOWED.has(ext)) {
    supported.set(toPublicPath(file), ext);
  } else {
    skipped.push(toPublicPath(file));
    console.warn(`[media] skipped unsupported file: ${toPublicPath(file)}`);
  }
}

const pending = SLOTS.filter((slot) => !supported.has(slot));
const live = SLOTS.filter((slot) => supported.has(slot));

console.log(`[media] ${supported.size} supported file(s) inside /public`);
if (live.length > 0) {
  console.log(`[media] live slots: ${live.join(", ")}`);
}
if (pending.length > 0) {
  console.log(
    "[media] placeholder slots still empty — the page renders its paper placeholder until a file lands:",
  );
  pending.forEach((slot) => console.log(`  - /${slot}`));
}
if (skipped.length > 0) {
  console.log(`[media] skipped ${skipped.length} unsupported file(s)`);
}

// --- Guard rail: no remote images, no data URIs, no unsupported extensions ---
const REMOTE_OR_INLINE =
  /["'`]((?:https?:)?\/\/[^"'`\s]+\.(?:png|jpe?g|webp|gif|mp4)|data:image\/[^"'`\s]*)/g;
const LOCAL_MEDIA =
  /["'`](\/(?:images|videos)\/[^"'`\s]+\.([a-z0-9]+))["'`]/g;

const violations = [];

for (const dir of SOURCE_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    if (!/\.(?:tsx?|jsx?|mjs|cjs)$/.test(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    const name = path.relative(ROOT, file);

    for (const match of source.matchAll(REMOTE_OR_INLINE)) {
      violations.push(`${name}: remote/inline media reference ${match[1].slice(0, 60)}`);
    }

    for (const match of source.matchAll(LOCAL_MEDIA)) {
      const ext = `.${match[2].toLowerCase()}`;
      if (!ALLOWED.has(ext)) {
        violations.push(`${name}: unsupported media extension ${ext} (${match[1]})`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error("[media] image policy violations:");
  violations.forEach((violation) => console.error(`  - ${violation}`));
  process.exit(1);
}

console.log(
  "[media] OK — references are local /images and /videos paths only (allowed: .webp .png .jpg .jpeg .gif .mp4)",
);
