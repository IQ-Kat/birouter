#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  spawnWithForwardedSignals,
} from "./runtime-env.mjs";
import { bootstrapEnv } from "./bootstrap-env.mjs";

const runtimePorts = resolveRuntimePorts();

// Auto-generate secrets on first run, merge .env + process.env
const env = bootstrapEnv();

spawnWithForwardedSignals("node", ["server.js"], {
  stdio: "inherit",
  env: withRuntimePortEnv(env, runtimePorts),
});
