#!/usr/bin/env node
/**
 * Exports the operating knowledge base (lib/knowledge) as JSON.
 *
 * The site never ships this data, but a future FAQ page, a chat assistant or a
 * training document needs it as plain JSON — so it is generated on demand
 * rather than hand-copied and left to drift.
 *
 * Run with:
 *   npm run knowledge:json                 # prints the JSON to stdout
 *   npm run knowledge:json -- out.json     # writes it to a file
 *
 * The module is TypeScript, so it is compiled to a temporary folder first and
 * that folder is removed afterwards. Nothing is left behind.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const ENTRY = path.join("lib", "knowledge", "index.ts");
const OUT_DIR = path.join(ROOT, ".knowledge-build");

const tscBin = path.join(
  ROOT,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tsc.cmd" : "tsc",
);

if (!fs.existsSync(tscBin)) {
  console.error("[knowledge] TypeScript is not installed — run `npm install` first.");
  process.exit(1);
}

const target = process.argv[2];

try {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  execSync(
    [
      `"${tscBin}"`,
      ENTRY,
      `--outDir "${OUT_DIR}"`,
      "--module commonjs",
      "--moduleResolution node",
      "--target es2022",
      "--esModuleInterop",
      "--skipLibCheck",
    ].join(" "),
    { cwd: ROOT, stdio: "inherit" },
  );

  const require = createRequire(import.meta.url);
  const { toTrainingJson, knowledge } = require(path.join(OUT_DIR, "index.js"));
  const json = toTrainingJson();

  if (target) {
    const file = path.resolve(ROOT, target);
    fs.writeFileSync(file, `${json}\n`, "utf8");
    console.log(
      `[knowledge] wrote ${path.relative(ROOT, file)} - ${knowledge.faq.length} FAQ, ` +
        `${knowledge.rules.length} rules, ${knowledge.sites.length} sites, ` +
        `${knowledge.openQuestions.length} open questions`,
    );
  } else {
    console.log(json);
  }
} catch (error) {
  console.error("[knowledge] export failed:", error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
