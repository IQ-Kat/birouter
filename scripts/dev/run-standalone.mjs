#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  resolveMaxOldSpaceMb,
  spawnWithForwardedSignals,
} from "../build/runtime-env.mjs";
import { bootstrapEnv } from "../build/bootstrap-env.mjs";

const env = bootstrapEnv();
const runtimePorts = resolveRuntimePorts(env);
const childEnv = withRuntimePortEnv(env, runtimePorts);

// #2939: the Docker image bakes NODE_OPTIONS=--max-old-space-size=256, which OOMs
// under load / large SQLite DBs. Honor OMNIROUTE_MEMORY_MB (default 512), the same
// knob `omniroute serve` uses. A trailing --max-old-space-size wins, so this
// overrides the baked 256 without clobbering any other NODE_OPTIONS flags.
const maxOldSpaceMb = resolveMaxOldSpaceMb(childEnv.OMNIROUTE_MEMORY_MB);
childEnv.NODE_OPTIONS =
  `${childEnv.NODE_OPTIONS || ""} --max-old-space-size=${maxOldSpaceMb}`.trim();

spawnWithForwardedSignals("node", ["server.js"], {
  stdio: "inherit",
  env: childEnv,
});
