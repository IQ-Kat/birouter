#!/usr/bin/env node

/**
 * OmniRoute — Postinstall Native Module Rebuild
 *
 * The npm package ships with a Next.js standalone build that includes
 * better-sqlite3 compiled for the build platform (Linux x64).
 * This script detects platform mismatches and rebuilds the native
 * module for the user's actual OS/architecture.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/129
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// The standalone build bundles better-sqlite3 inside app/node_modules
const appNodeModules = join(ROOT, "app", "node_modules", "better-sqlite3");

if (!existsSync(appNodeModules)) {
  // No bundled better-sqlite3 — nothing to do (dev install, not npm global)
  process.exit(0);
}

const buildInfoPath = join(appNodeModules, "build", "Release", "better_sqlite3.node");

// The published binary is compiled for linux-x64.
// On any other platform/arch, we must rebuild — dlopen alone is unreliable
// because macOS may load an incompatible binary without throwing.
const BUILD_PLATFORM = "linux";
const BUILD_ARCH = "x64";
const needsRebuild = process.platform !== BUILD_PLATFORM || process.arch !== BUILD_ARCH;

if (!needsRebuild) {
  try {
    process.dlopen({ exports: {} }, buildInfoPath);
    process.exit(0);
  } catch {
    // Same platform but binary still incompatible (e.g. Node.js ABI mismatch) — rebuild
  }
}

console.log(`\n  🔧 Rebuilding better-sqlite3 for ${process.platform}-${process.arch}...`);

try {
  execSync("npm rebuild better-sqlite3", {
    cwd: join(ROOT, "app"),
    stdio: "inherit",
    timeout: 120_000,
  });
} catch (error) {
  console.error("  ❌ Failed to rebuild better-sqlite3 automatically.");
  console.error("     You can fix this manually by running:");
  console.error(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3`);
  if (process.platform === "darwin") {
    console.error("     If build tools are missing: xcode-select --install");
  }
  console.error("");
  process.exit(1);
}

// Verify the rebuilt binary actually loads
try {
  process.dlopen({ exports: {} }, buildInfoPath);
  console.log("  ✅ Native module rebuilt successfully!\n");
} catch {
  console.error("  ❌ Rebuild completed but binary is still incompatible.");
  console.error("     Try manually:");
  console.error(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3`);
  if (process.platform === "darwin") {
    console.error("     If build tools are missing: xcode-select --install");
  }
  console.error("");
  process.exit(1);
}
