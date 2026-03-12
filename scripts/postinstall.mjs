#!/usr/bin/env node

/**
 * OmniRoute — Postinstall Native Module Fix
 *
 * The npm package ships with a Next.js standalone build that includes
 * better-sqlite3 compiled for the build platform (Linux x64) inside
 * app/node_modules/. However, npm also installs better-sqlite3 as a
 * top-level dependency (in the root node_modules/), correctly compiled
 * for the user's platform.
 *
 * This script copies the correctly-built native binary from the root
 * into the standalone app directory — no rebuild or build tools needed.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/129
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/321
 */

import { existsSync, copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { PUBLISHED_BUILD_PLATFORM, PUBLISHED_BUILD_ARCH } from "./native-binary-compat.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const appBinary = join(
  ROOT,
  "app",
  "node_modules",
  "better-sqlite3",
  "build",
  "Release",
  "better_sqlite3.node"
);
const rootBinary = join(
  ROOT,
  "node_modules",
  "better-sqlite3",
  "build",
  "Release",
  "better_sqlite3.node"
);

if (!existsSync(join(ROOT, "app", "node_modules", "better-sqlite3"))) {
  process.exit(0);
}

const platformMatch =
  process.platform === PUBLISHED_BUILD_PLATFORM && process.arch === PUBLISHED_BUILD_ARCH;

if (platformMatch) {
  try {
    process.dlopen({ exports: {} }, appBinary);
    process.exit(0);
  } catch (err) {
    console.warn(`  ⚠️  Bundled binary incompatible despite platform match: ${err.message}`);
  }
}

console.log(`\n  🔧 Fixing better-sqlite3 binary for ${process.platform}-${process.arch}...`);

// Strategy 1: Copy the correctly-built binary from root node_modules
if (existsSync(rootBinary)) {
  try {
    mkdirSync(dirname(appBinary), { recursive: true });
    copyFileSync(rootBinary, appBinary);
  } catch (err) {
    console.warn(`  ⚠️  Failed to copy binary: ${err.message}`);
  }

  try {
    process.dlopen({ exports: {} }, appBinary);
    console.log("  ✅ Native module fixed successfully!\n");
    process.exit(0);
  } catch (err) {
    console.warn(`  ⚠️  Copied binary failed to load: ${err.message}`);
  }
}

// Strategy 2: Fall back to npm rebuild (may work if build tools are available)
console.log("  ⚠️  Root binary not available or incompatible, attempting npm rebuild...");

try {
  const { execSync } = await import("node:child_process");
  execSync("npm rebuild better-sqlite3", {
    cwd: join(ROOT, "app"),
    stdio: "inherit",
    timeout: 120_000,
  });

  process.dlopen({ exports: {} }, appBinary);
  console.log("  ✅ Native module rebuilt successfully!\n");
  process.exit(0);
} catch (err) {
  const isTimeout = err.killed || err.signal === "SIGTERM";
  if (isTimeout) {
    console.warn("  ⚠️  npm rebuild timed out after 120s.");
  } else {
    console.warn(`  ⚠️  npm rebuild failed: ${err.message}`);
  }
}

// If nothing worked, warn but don't fail the install — let the package stay
// installed so users can fix manually or use the pre-flight check in the CLI
console.warn("  ⚠️  Could not fix better-sqlite3 native module automatically.");
console.warn("     The server may not start correctly.");
console.warn("     Try manually:");
console.warn(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3`);
if (process.platform === "darwin") {
  console.warn("     If build tools are missing: xcode-select --install");
}
console.warn("");
