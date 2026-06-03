#!/usr/bin/env node

/**
 * Shared build-path constants for OmniRoute build scripts.
 *
 * All build scripts that need to locate the Next.js distDir or the assembled
 * standalone output dir should import from here so that the single source of
 * truth (NEXT_DIST_DIR env + the ".build/next" default) is never scattered
 * across multiple files.
 *
 * Layer 1 change: default distDir moved from ".next" to ".build/next".
 * Consumers may still override via NEXT_DIST_DIR env var.
 */

import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Absolute path to the repository root.
 * Derived from this file's location: scripts/build/paths.mjs → ../../
 */
export const ROOT = path.resolve(__dirname, "..", "..");

/**
 * Next.js distDir (where `next build` writes its output).
 * Defaults to ".build/next"; overridable via NEXT_DIST_DIR env var.
 *
 * @type {string} - absolute path
 */
export const DIST_DIR = path.resolve(ROOT, process.env.NEXT_DIST_DIR || ".build/next");

/**
 * Absolute path to the Next.js standalone output directory inside distDir.
 * This is the raw output of `next build --output=standalone` before assembly.
 *
 * @type {string} - absolute path
 */
export const STANDALONE_DIR = path.join(DIST_DIR, "standalone");
