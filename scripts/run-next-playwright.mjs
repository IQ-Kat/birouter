#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import { join } from "node:path";
import {
  resolveRuntimePorts,
  sanitizeColorEnv,
  spawnWithForwardedSignals,
  withRuntimePortEnv,
} from "./runtime-env.mjs";
import { bootstrapEnv } from "./bootstrap-env.mjs";

const mode = process.argv[2] === "start" ? "start" : "dev";
const cwd = process.cwd();
const appDir = join(cwd, "app");
const srcAppDir = join(cwd, "src", "app");
const appPage = join(appDir, "page.tsx");
const backupDir = join(cwd, "app.__qa_backup");
const buildScript = join(cwd, "scripts", "build-next-isolated.mjs");
const standaloneServer = join(cwd, testDistDir(), "standalone", "server.js");
const buildIdFile = join(cwd, testDistDir(), "BUILD_ID");

let appDirMoved = false;

function testDistDir() {
  return process.env.NEXT_DIST_DIR || ".next";
}

function shouldMoveAppDir() {
  return existsSync(appDir) && !existsSync(appPage) && existsSync(srcAppDir);
}

function prepareAppDir() {
  if (!shouldMoveAppDir()) return;

  if (existsSync(backupDir)) {
    console.warn(
      "[Playwright WebServer] app.__qa_backup already exists; leaving app/ in place. " +
        "If tests hit 404 on every route, clear app/ artifacts before running e2e."
    );
    return;
  }

  renameSync(appDir, backupDir);
  appDirMoved = true;
  console.log("[Playwright WebServer] Temporarily moved app/ to app.__qa_backup");
}

function restoreAppDir() {
  if (!appDirMoved) return;
  if (!existsSync(backupDir) || existsSync(appDir)) return;

  renameSync(backupDir, appDir);
  console.log("[Playwright WebServer] Restored app/ directory");
}

process.on("exit", restoreAppDir);
process.on("uncaughtException", (error) => {
  restoreAppDir();
  throw error;
});

prepareAppDir();

const bootstrapEnvVars = bootstrapEnv({ quiet: true });
const runtimePorts = resolveRuntimePorts(bootstrapEnvVars);
const testServerEnv = {
  ...sanitizeColorEnv(bootstrapEnvVars),
  ...sanitizeColorEnv(process.env),
  NEXT_PUBLIC_OMNIROUTE_E2E_MODE: process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE || "1",
  OMNIROUTE_DISABLE_BACKGROUND_SERVICES: process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES || "1",
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: process.env.OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK || "1",
  OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: process.env.OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK || "1",
  OMNIROUTE_HIDE_HEALTHCHECK_LOGS: process.env.OMNIROUTE_HIDE_HEALTHCHECK_LOGS || "1",
};

function runChild(command, args, env) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env,
    });

    const forward = (signal) => {
      if (!child.killed) child.kill(signal);
    };

    process.on("SIGINT", forward);
    process.on("SIGTERM", forward);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", forward);
      process.off("SIGTERM", forward);
      resolve({ code: code ?? 1, signal: signal ?? null });
    });
  });
}

async function runBuildForStart() {
  if (mode !== "start") return;
  if (process.env.OMNIROUTE_PLAYWRIGHT_SKIP_BUILD === "1") return;
  if (existsSync(buildIdFile)) return;

  const buildEnv = withRuntimePortEnv(testServerEnv, runtimePorts);
  const result = await runChild(process.execPath, [buildScript], buildEnv);

  if (result.signal) {
    process.kill(process.pid, result.signal);
    return;
  }

  if (result.code !== 0) {
    process.exit(result.code);
  }
}

await runBuildForStart();
if (mode === "start") {
  if (existsSync(standaloneServer)) {
    spawnWithForwardedSignals(process.execPath, [standaloneServer], {
      stdio: "inherit",
      env: {
        ...withRuntimePortEnv(testServerEnv, runtimePorts),
        PORT: String(runtimePorts.dashboardPort),
        HOSTNAME: process.env.HOSTNAME || "127.0.0.1",
      },
    });
  } else {
    const args = [
      "./node_modules/next/dist/bin/next",
      "start",
      "--port",
      String(runtimePorts.dashboardPort),
    ];

    spawnWithForwardedSignals(process.execPath, args, {
      stdio: "inherit",
      env: withRuntimePortEnv(testServerEnv, runtimePorts),
    });
  }
} else {
  const args = [
    "./node_modules/next/dist/bin/next",
    mode,
    "--webpack",
    "--port",
    String(runtimePorts.dashboardPort),
  ];

  spawnWithForwardedSignals(process.execPath, args, {
    stdio: "inherit",
    env: withRuntimePortEnv(testServerEnv, runtimePorts),
  });
}
