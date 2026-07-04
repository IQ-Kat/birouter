/**
 * Windows NTFS Junction EPERM Interceptor
 *
 * Patches Node.js's built-in `fs.readdir` so that EPERM/EACCES errors from
 * NTFS junction traversal return empty arrays instead of throwing. This
 * prevents webpack, @vercel/nft, glob, tinyglobby, and fumadocs-mdx from
 * crashing the production build when they accidentally follow Windows legacy
 * junction symlinks outside the project root.
 *
 * Windows user profiles contain dozens of NTFS junctions (Application Data,
 * Cookies, History, My Music, My Documents, Recent, etc.) that are circular
 * or point to system-protected directories. When file tracers follow these,
 * they get EPERM which propagates as fatal webpack compilation errors.
 *
 * Strategy: any EPERM/EACCES scandir on a path OUTSIDE the project root is
 * treated as an empty directory. Paths inside the project root still throw
 * (so real permission problems are not silently swallowed).
 */

"use strict";

if (process.platform !== "win32") return;

const path = require("node:path");
const fs = require("node:fs");

// Normalize project root to lowercase for case-insensitive comparison on Windows
const PROJECT_ROOT = path.resolve(__dirname, "..", "..").toLowerCase();

function isOutsideProject(filePath) {
  if (!filePath) return true;
  return !filePath.toLowerCase().startsWith(PROJECT_ROOT);
}

function shouldSwallow(err, filePath) {
  return (
    err &&
    (err.code === "EPERM" || err.code === "EACCES") &&
    err.syscall === "scandir" &&
    isOutsideProject(filePath || err.path)
  );
}

// ─── Patch fs.readdir (callback) ────────────────────────────────────────────
const origReaddir = fs.readdir;
fs.readdir = function patchedReaddir(targetPath, optionsOrCallback, maybeCallback) {
  const callback =
    typeof maybeCallback === "function" ? maybeCallback : optionsOrCallback;
  const options =
    typeof optionsOrCallback !== "function" ? optionsOrCallback : undefined;
  return origReaddir(targetPath, options, function (err, files) {
    if (shouldSwallow(err, targetPath)) return callback(null, []);
    callback(err, files);
  });
};

// ─── Patch fs.readdirSync ────────────────────────────────────────────────────
const origReaddirSync = fs.readdirSync;
fs.readdirSync = function patchedReaddirSync(targetPath, options) {
  try {
    return origReaddirSync(targetPath, options);
  } catch (err) {
    if (shouldSwallow(err, targetPath)) return [];
    throw err;
  }
};

// ─── Patch fs.promises.readdir (async/await / NFT / tinyglobby) ─────────────
const origReaddirPromise = fs.promises.readdir.bind(fs.promises);
fs.promises.readdir = async function patchedReaddirPromise(targetPath, options) {
  try {
    return await origReaddirPromise(targetPath, options);
  } catch (err) {
    if (shouldSwallow(err, targetPath)) return [];
    throw err;
  }
};
