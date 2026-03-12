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
  // No standalone app directory — nothing to do (dev install, not npm global)
  process.exit(0);
}

// The published binary is compiled for linux-x64. On any other platform/arch,
// always replace it — dlopen alone is unreliable because macOS can load an
// incompatible binary without throwing (the exact bug fixed in #312).
const BUILD_PLATFORM = "linux";
const BUILD_ARCH = "x64";
const platformMatch = process.platform === BUILD_PLATFORM && process.arch === BUILD_ARCH;

if (platformMatch) {
  try {
    process.dlopen({ exports: {} }, appBinary);
    process.exit(0);
  } catch {
    // Same platform but binary still incompatible (e.g. Node.js ABI mismatch)
  }
}

console.log(`\n  🔧 Fixing better-sqlite3 binary for ${process.platform}-${process.arch}...`);

// Strategy 1: Copy the correctly-built binary from root node_modules
if (existsSync(rootBinary)) {
  try {
    mkdirSync(dirname(appBinary), { recursive: true });
    copyFileSync(rootBinary, appBinary);

    // Verify the copied binary loads
    process.dlopen({ exports: {} }, appBinary);
    console.log("  ✅ Native module fixed successfully!\n");
    process.exit(0);
  } catch {
    // Copy succeeded but binary still doesn't load — fall through
  }
}

// Strategy 2: Fall back to npm rebuild (may work if build tools are available)
console.log("  ⚠️  Root binary not available, attempting npm rebuild...");

try {
  const { execSync } = await import("node:child_process");
  execSync("npm rebuild better-sqlite3", {
    cwd: join(ROOT, "app"),
    stdio: "inherit",
    timeout: 120_000,
  });

  // Verify rebuild worked
  process.dlopen({ exports: {} }, appBinary);
  console.log("  ✅ Native module rebuilt successfully!\n");
  process.exit(0);
} catch {
  // Rebuild failed or binary still incompatible
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
