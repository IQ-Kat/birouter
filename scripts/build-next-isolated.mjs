#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

/**
 * This repository contains a legacy `app/` snapshot (packaging/runtime artifacts)
 * alongside the active Next.js source in `src/app/`. Next.js route discovery scans
 * both and fails the build on legacy files. We temporarily move the legacy folder
 * out of the project root during `next build`, then restore it in all outcomes.
 */

const projectRoot = process.cwd();
const backupRoot = path.join(os.tmpdir(), `omniroute-build-isolated-${process.pid}-${Date.now()}`);
const transientBuildPaths = [
  {
    label: "legacy app snapshot",
    sourcePath: path.join(projectRoot, "app"),
    backupPath: path.join(backupRoot, "app"),
  },
  {
    label: "task planning workspace",
    sourcePath: path.join(projectRoot, "_tasks"),
    backupPath: path.join(backupRoot, "_tasks"),
  },
];

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function movePath(sourcePath, destinationPath, fsImpl = fs) {
  await fsImpl.mkdir(path.dirname(destinationPath), { recursive: true });

  try {
    await fsImpl.rename(sourcePath, destinationPath);
  } catch (error) {
    if (error?.code !== "EXDEV") {
      throw error;
    }

    console.warn(
      `[build-next-isolated] EXDEV while moving ${sourcePath} -> ${destinationPath}; falling back to copy/remove`
    );
    await fsImpl.cp(sourcePath, destinationPath, {
      recursive: true,
      preserveTimestamps: true,
      force: false,
      errorOnExist: true,
    });
    await fsImpl.rm(sourcePath, { recursive: true, force: true });
  }
}

function runNextBuild() {
  return new Promise((resolve) => {
    const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
    const child = spawn(process.execPath, [nextBin, "build"], {
      cwd: projectRoot,
      stdio: "inherit",
      env: resolveNextBuildEnv(process.env),
    });

    const forward = (signal) => {
      if (!child.killed) child.kill(signal);
    };

    process.on("SIGINT", forward);
    process.on("SIGTERM", forward);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", forward);
      process.off("SIGTERM", forward);
      if (signal) {
        resolve({ code: 1, signal });
        return;
      }
      resolve({ code: code ?? 1, signal: null });
    });
  });
}

export function resolveNextBuildEnv(baseEnv = process.env) {
  return {
    ...baseEnv,
    NEXT_PRIVATE_BUILD_WORKER: baseEnv.NEXT_PRIVATE_BUILD_WORKER || "0",
  };
}

export async function main() {
  const movedPaths = [];

  try {
    for (const entry of transientBuildPaths) {
      if (!(await exists(entry.sourcePath))) continue;
      await movePath(entry.sourcePath, entry.backupPath);
      movedPaths.push(entry);
    }

    const result = await runNextBuild();
    if (result.code === 0 && (await exists(path.join(projectRoot, ".next", "standalone")))) {
      console.log("[build-next-isolated] Copying static assets for standalone server...");
      try {
        await fs.cp(
          path.join(projectRoot, "public"),
          path.join(projectRoot, ".next", "standalone", "public"),
          { recursive: true }
        );
        await fs.cp(
          path.join(projectRoot, ".next", "static"),
          path.join(projectRoot, ".next", "standalone", ".next", "static"),
          { recursive: true }
        );
      } catch (copyErr) {
        console.warn("[build-next-isolated] Non-fatal error copying static assets:", copyErr);
      }
    }
    process.exitCode = result.code;
  } catch (error) {
    console.error("[build-next-isolated] Build failed:", error);
    process.exitCode = 1;
  } finally {
    while (movedPaths.length > 0) {
      const entry = movedPaths.pop();
      if (!entry) continue;
      try {
        await movePath(entry.backupPath, entry.sourcePath);
      } catch (restoreError) {
        console.error(
          `[build-next-isolated] Failed to restore ${entry.label} from ${entry.backupPath}:`,
          restoreError
        );
        process.exitCode = 1;
      }
    }

    try {
      await fs.rm(backupRoot, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn("[build-next-isolated] Failed to clean temporary backup root:", cleanupError);
    }
  }
}

const entryScript = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;

if (entryScript === import.meta.url) {
  await main();
}
