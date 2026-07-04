/**
 * rebrandColorToBlue.mjs
 * Replaces all OmniRoute/legacy red brand colors with Birouter sky-blue palette
 * across all .tsx, .ts, .css files in src/.
 *
 * Red → Blue mapping:
 *   #E54D5E  → #0ea5e9   (sky-500, Birouter primary)
 *   #e54d5e  → #0ea5e9
 *   #C93D4E  → #0284c7   (sky-600, Birouter primary hover)
 *   #c93d4e  → #0284c7
 *   rgba(229, 77, 94, → rgba(14, 165, 233,   (sky-500 in rgba)
 *   rgba(229,77,94,   → rgba(14, 165, 233,
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..", "..");
const SRC = path.join(ROOT, "src");

const EXTENSIONS = [".tsx", ".ts", ".css", ".mjs", ".js"];

/** Walk directory recursively, yield file paths */
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".build")
        continue;
      yield* walk(full);
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      yield full;
    }
  }
}

const replacements = [
  // Hex colors — uppercase and lowercase
  [/#E54D5E/g, "#0ea5e9"],
  [/#e54d5e/g, "#0ea5e9"],
  [/#C93D4E/g, "#0284c7"],
  [/#c93d4e/g, "#0284c7"],

  // rgba with spaces: rgba(229, 77, 94,
  [/rgba\(\s*229\s*,\s*77\s*,\s*94\s*,/g, "rgba(14, 165, 233,"],
];

let totalFiles = 0;
let changedFiles = 0;

for (const filePath of walk(SRC)) {
  totalFiles++;
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [pattern, replacement] of replacements) {
    const next = content.replace(pattern, replacement);
    if (next !== content) {
      content = next;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    const rel = path.relative(ROOT, filePath);
    console.log(`  ✅ Updated: ${rel}`);
    changedFiles++;
  }
}

console.log(`\nDone! Scanned ${totalFiles} files, updated ${changedFiles} files.`);
