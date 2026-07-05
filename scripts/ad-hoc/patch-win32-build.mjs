#!/usr/bin/env node
// Combined patch script for Windows NTFS EPERM build fix.
// Patches two Next.js 16 files to handle EPERM/EACCES from NTFS junction
// symlinks (Application Data, Cookies) in Windows user profiles gracefully.

import { readFileSync, writeFileSync } from "node:fs";

// ─── Patch 1: next-trace-entrypoints-plugin.js ────────────────────────────
// Two fixes:
// a) The catch block inside 'createTraceAssets' ignores EINVAL/ENOENT/UNKNOWN
//    but not EPERM/EACCES. Add them.
// b) The processAssets.tapAsync catch calls callback(err) for ANY error,
//    which makes EPERM a fatal compilation error. Filter it out.

{
  const file = "node_modules/next/dist/build/webpack/plugins/next-trace-entrypoints-plugin.js";
  let src = readFileSync(file, "utf8");
  const before = src;

  // Fix (a): extend the inner catch to include EPERM/EACCES
  src = src.replace(
    "if ((0, _iserror.default)(e) && (e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN')) {",
    "if ((0, _iserror.default)(e) && (e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN' || e.code === 'EPERM' || e.code === 'EACCES')) {"
  );

  // Fix (b): in processAssets.tapAsync, filter EPERM/EACCES before calling callback(err)
  // Original: .catch((err)=>callback(err))
  // Patched:  skip EPERM/EACCES (Windows NTFS junctions), propagate real errors
  src = src.replace(
    ".catch((err)=>callback(err));",
    ".catch((err)=>{ if (err && (err.code === 'EPERM' || err.code === 'EACCES')) { return callback(); } callback(err); });"
  );

  if (src !== before) {
    writeFileSync(file, src);
    console.log(
      "[birouter-patch] next-trace-entrypoints-plugin.js — EPERM/EACCES handled in both inner catch and processAssets callback"
    );
  } else {
    console.log(
      "[birouter-patch] next-trace-entrypoints-plugin.js — no change (already patched or pattern differs)"
    );
  }
}

// ─── Patch 2: flight-client-entry-plugin.js ───────────────────────────────
// Guard serverActionModules[name] and edgeServerActionModules[name] against
// undefined when the server compilation aborts early due to errors.

{
  const file = "node_modules/next/dist/build/webpack/plugins/flight-client-entry-plugin.js";
  let src = readFileSync(file, "utf8");
  const before = src;

  src = src.replace(
    "                const modId = pluginState.serverActionModules[name][layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server'];",
    [
      "                const _samEntry = pluginState.serverActionModules[name];",
      "                // [birouter-patch] guard undefined when server compilation aborted",
      "                const modId = _samEntry",
      "                  ? _samEntry[layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server']",
      "                  : undefined;",
    ].join("\n")
  );

  src = src.replace(
    "                const modId = pluginState.edgeServerActionModules[name][layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server'];",
    [
      "                const _esamEntry = pluginState.edgeServerActionModules[name];",
      "                // [birouter-patch] guard undefined when server compilation aborted",
      "                const modId = _esamEntry",
      "                  ? _esamEntry[layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server']",
      "                  : undefined;",
    ].join("\n")
  );

  if (src !== before) {
    writeFileSync(file, src);
    console.log(
      "[birouter-patch] flight-client-entry-plugin.js — serverActionModules/edgeServerActionModules guarded against undefined"
    );
  } else {
    console.log(
      "[birouter-patch] flight-client-entry-plugin.js — no change (already patched or pattern differs)"
    );
  }
}

console.log("[birouter-patch] All patches applied.");
