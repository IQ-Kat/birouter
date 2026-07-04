#!/usr/bin/env node
// Patches Next.js 16's FlightClientEntryPlugin to guard against undefined
// serverActionModules[name] which occurs when the server webpack compilation
// fails early due to EPERM from NTFS junction symlinks on Windows.
// Without the guard: "Cannot read properties of undefined (reading 'server')"
// This is a defensive patch — the root EPERM issue is separate.

import { readFileSync, writeFileSync } from "node:fs";

const file = "node_modules/next/dist/build/webpack/plugins/flight-client-entry-plugin.js";
let src = readFileSync(file, "utf8");
const before = src;

// Guard line 704: serverActionModules[name] can be undefined if server compilation failed
src = src.replace(
  "                const modId = pluginState.serverActionModules[name][layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server'];",
  [
    "                const _samEntry = pluginState.serverActionModules[name];",
    "                // [birouter-patch] guard against undefined when server compilation aborted",
    "                const modId = _samEntry",
    "                  ? _samEntry[layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server']",
    "                  : undefined;",
  ].join("\n")
);

// Guard line 712: edgeServerActionModules[name] same issue
src = src.replace(
  "                const modId = pluginState.edgeServerActionModules[name][layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server'];",
  [
    "                const _esamEntry = pluginState.edgeServerActionModules[name];",
    "                // [birouter-patch] guard against undefined when server compilation aborted",
    "                const modId = _esamEntry",
    "                  ? _esamEntry[layer[name] === _constants.WEBPACK_LAYERS.actionBrowser ? 'client' : 'server']",
    "                  : undefined;",
  ].join("\n")
);

if (src !== before) {
  writeFileSync(file, src);
  console.log(
    "[birouter-patch] Patched flight-client-entry-plugin.js — guarded serverActionModules and edgeServerActionModules against undefined"
  );
} else {
  console.log(
    "[birouter-patch] Pattern not found — plugin may already be patched or has a different version"
  );
}
