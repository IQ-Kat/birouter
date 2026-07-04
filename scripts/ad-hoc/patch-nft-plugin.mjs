#!/usr/bin/env node
// Patch Next.js 16's next-trace-entrypoints-plugin.js to handle EPERM/EACCES
// errors from NTFS junction symlinks on Windows. Without this, the EPERM
// propagates as a fatal webpack compilation error.

import { readFileSync, writeFileSync } from "node:fs";

const file = "node_modules/next/dist/build/webpack/plugins/next-trace-entrypoints-plugin.js";
let src = readFileSync(file, "utf8");
const before = src;

// The plugin catches EINVAL/ENOENT/UNKNOWN but not EPERM/EACCES.
// On Windows, NTFS junction traversal generates EPERM which must also be ignored.
src = src.replace(
  "if ((0, _iserror.default)(e) && (e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN')) {",
  "if ((0, _iserror.default)(e) && (e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN' || e.code === 'EPERM' || e.code === 'EACCES')) {"
);

if (src !== before) {
  writeFileSync(file, src);
  console.log(
    "[birouter-patch] Patched next-trace-entrypoints-plugin.js — EPERM/EACCES now handled gracefully (Windows NTFS junction fix)"
  );
} else {
  console.log(
    "[birouter-patch] Pattern not found — plugin may already be patched or has a different structure"
  );
}
