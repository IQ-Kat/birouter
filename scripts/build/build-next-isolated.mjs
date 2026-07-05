#!/usr/bin/env node

import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import {
  assembleStandalone,
  syncStandaloneNativeAssets as _syncNativeAssets,
  syncStandaloneExtraModules as _syncExtraModules,
} from "./assembleStandalone.mjs";

// --- Load .env early ---
// next.config.mjs is evaluated inside the spawned `next build` child process
// BEFORE Next.js's own dotenv loader runs, so build-control flags like
// BIROUTER_BUILD_STANDALONE must be available in process.env before spawn().
// We do a minimal .env parse here (no overriding existing vars, no interpolation)
// to mirror Next.js's own dotenv precedence rules.
{
  const envPath = path.resolve(process.cwd(), ".env");
  try {
    const raw = fsSync.readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // .env is optional — ignore if missing
  }
}
// --- end Load .env early ---

// --- Windows EPERM guard ---
// On Windows, @vercel/nft (used by Next.js file tracing) traverses the project
// root and follows NTFS junction symlinks (e.g. "Application Data", "Cookies")
// into system-protected directories. These generate EPERM errors that surface as
// unhandledRejections and crash the webpack compilation with a misleading
// "Cannot read properties of undefined (reading 'server')" error.
// We suppress EPERM / EACCES unhandled rejections that originate from scandir /
// lstat / readdir syscalls so that Next.js file tracing continues gracefully.
if (process.platform === "win32") {
  process.on("unhandledRejection", (reason) => {
    const code = /** @type {any} */ (reason)?.code;
    const syscall = /** @type {any} */ (reason)?.syscall;
    if (
      (code === "EPERM" || code === "EACCES") &&
      (syscall === "scandir" || syscall === "lstat" || syscall === "readdir" || syscall === "open")
    ) {
      // Benign: Windows system junction folder traversal — not a real build error.
      return;
    }
    // Re-throw anything else so real errors are still surfaced.
    console.error("[build-next-isolated] Unhandled rejection:", reason);
    process.exitCode = 1;
  });
}
// --- end Windows EPERM guard ---

/**
 * Layer 1: `app/` has been renamed to `dist/` and the App-Router collision is gone.
 * The only transient paths remaining are `.tmp/wine32` (Wine prefix used by some
 * older build tools) and `_tasks` (planning workspace).
 */

const projectRoot = process.cwd();
const distDir = path.resolve(process.env.NEXT_DIST_DIR || ".build/next");
const backupRoot = path.join(os.tmpdir(), `birouter-build-isolated-${process.pid}-${Date.now()}`);

export function getTransientBuildPaths(rootDir = projectRoot, env = process.env) {
  const paths = [
    {
      label: "local Wine prefix",
      sourcePath: path.join(rootDir, ".tmp", "wine32"),
      backupPath: path.join(backupRoot, "wine32"),
    },
  ];

  if (env.BIROUTER_BUILD_MOVE_TASKS === "1") {
    paths.push({
      label: "task planning workspace",
      sourcePath: path.join(rootDir, "_tasks"),
      backupPath: path.join(backupRoot, "_tasks"),
    });
  }

  return paths;
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function movePath(sourcePath, destinationPath, fsImpl = fs) {
  const mkdir = typeof fsImpl.mkdir === "function" ? fsImpl.mkdir.bind(fsImpl) : fs.mkdir.bind(fs);
  await mkdir(path.dirname(destinationPath), { recursive: true });

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
    const nextOmnin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
    const child = spawn(process.execPath, [nextOmnin, "build", resolveNextBuildBundlerFlag()], {
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

export function resolveNextBuildBundlerFlag(baseEnv = process.env) {
  return baseEnv.BIROUTER_USE_TURBOPACK === "1" ? "--turbopack" : "--webpack";
}

export function resolveNextBuildEnv(baseEnv = process.env) {
  const env = {
    ...baseEnv,
    NODE_ENV: "production",
    NEXT_PRIVATE_BUILD_WORKER: baseEnv.NEXT_PRIVATE_BUILD_WORKER || "1",
  };

  // Raise the Node heap for the spawned `next build`. The webpack production pass
  // ("Compiling instrumentation" bundles the whole server graph) is the heaviest
  // phase and overflows V8's default ~2 GB ceiling on memory-constrained machines,
  // stalling/OOMing local `npm run build` (npm-global installs). #4076/#4104 fixed
  // this only in the Docker builder stage (ENV NODE_OPTIONS); the local/native path
  // was left unprotected. Respect an existing --max-old-space-size (Docker already
  // sets one — don't clobber/duplicate) and let BIROUTER_BUILD_MEMORY_MB override.
  if (!/--max-old-space-size/.test(env.NODE_OPTIONS || "")) {
    // Default 8 GB (was 4 GB): the clean module graph peaks ~3.9 GB during the webpack
    // production pass, which brushed the old 4 GB ceiling on a borderline OOM. 8 GB gives
    // headroom without risk. NOTE: heap size does NOT fix a poisoned scope — if the build
    // OOMs/livelocks far above this, check for worktrees/cruft leaking into the tsconfig
    // scope (run `npm run check:build-scope`), not for "more heap". See incident 2026-06-25.
    const heapMb = Number(baseEnv.BIROUTER_BUILD_MEMORY_MB) || 14336;
    env.NODE_OPTIONS = `${env.NODE_OPTIONS || ""} --max-old-space-size=${heapMb}`.trim();
  }

  // On Windows, @vercel/nft (Next.js file tracer) traverses NTFS junction symlinks
  // (e.g. C:\Users\<user>\Application Data, Cookies) into system-protected directories.
  // These generate EPERM unhandledRejections that crash the FlightClientEntryPlugin
  // mid-compilation. Suppress unhandled rejections in the child next build process
  // on Windows only; Linux/macOS CI still gets the strict default.
  if (process.platform === "win32" && !/--unhandled-rejections=/.test(env.NODE_OPTIONS || "")) {
    env.NODE_OPTIONS = `${env.NODE_OPTIONS || ""} --unhandled-rejections=none`.trim();
  }

  // On Windows, inject a --require hook that patches Node.js's built-in fs.readdir
  // to return empty arrays for NTFS junction EPERM errors (Application Data, Cookies, etc.)
  // instead of throwing. This intercepts the EPERM at the lowest level — before it can
  // propagate through any webpack plugin, NFT, glob, or FileSystemInfo code path.
  if (process.platform === "win32") {
    // Use forward slashes: Node.js accepts them on Windows and they don't get
    // mangled when embedded in NODE_OPTIONS string.
    const interceptorPath = path
      .resolve(projectRoot, "scripts", "build", "win32-fs-eperm-interceptor.cjs")
      .replace(/\\/g, "/");
    if (!/win32-fs-eperm-interceptor/.test(env.NODE_OPTIONS || "")) {
      env.NODE_OPTIONS = `${env.NODE_OPTIONS || ""} --require "${interceptorPath}"`.trim();
    }
  }

  return env;
}

async function resetStandaloneOutput(rootDir = projectRoot, fsImpl = fs) {
  // Use the module-level distDir so NEXT_DIST_DIR is respected
  const resolvedDistDir =
    rootDir === projectRoot
      ? distDir
      : path.join(rootDir, process.env.NEXT_DIST_DIR || ".build/next");
  const standaloneRoot = path.join(resolvedDistDir, "standalone");
  if (!(await exists(standaloneRoot))) return;

  const staleStandaloneBackup = path.join(backupRoot, "standalone-stale");

  await movePath(standaloneRoot, staleStandaloneBackup, fsImpl);
  console.log("[build-next-isolated] Moved stale standalone output out of the build path");
}

export async function pruneStandaloneArtifacts(rootDir = projectRoot, fsImpl = fs) {
  const resolvedDistDirForPrune =
    rootDir === projectRoot
      ? distDir
      : path.join(rootDir, process.env.NEXT_DIST_DIR || ".build/next");
  const standaloneRoot = path.join(resolvedDistDirForPrune, "standalone");
  const pruneTargets = [path.join(standaloneRoot, "_tasks")];

  for (const targetPath of pruneTargets) {
    if (!(await exists(targetPath))) continue;
    await fsImpl.rm(targetPath, { recursive: true, force: true });
    console.log(
      `[build-next-isolated] Pruned standalone artifact: ${path.relative(rootDir, targetPath)}`
    );
  }
}

export async function syncStandaloneNativeAssets(
  rootDir = projectRoot,
  fsImpl = fs,
  log = console
) {
  return _syncNativeAssets(rootDir, fsImpl, log);
}

export async function syncStandaloneExtraModules(
  rootDir = projectRoot,
  fsImpl = fs,
  log = console
) {
  return _syncExtraModules(rootDir, fsImpl, log);
}

export async function main() {
  const movedPaths = [];
  const transientBuildPaths = getTransientBuildPaths();

  try {
    for (const entry of transientBuildPaths) {
      if (!(await exists(entry.sourcePath))) continue;
      await movePath(entry.sourcePath, entry.backupPath);
      movedPaths.push(entry);
    }

    await resetStandaloneOutput(projectRoot);

    const result = await runNextBuild();
    const standaloneDir = path.join(distDir, "standalone");
    if (result.code === 0 && (await exists(standaloneDir))) {
      try {
        await fs.cp(path.join(projectRoot, "docs"), path.join(standaloneDir, "docs"), {
          recursive: true,
        });
        console.log("[build-next-isolated] Copied docs/ to standalone output");
      } catch (docsCopyErr) {
        console.warn("[build-next-isolated] Non-fatal error copying docs/:", docsCopyErr?.message);
      }

      try {
        await pruneStandaloneArtifacts(projectRoot);
      } catch (pruneErr) {
        console.warn(
          "[build-next-isolated] Non-fatal error pruning standalone artifacts:",
          pruneErr
        );
      }

      // Best-effort: build the TPROXY native addon (Linux-only, opt-in) BEFORE
      // assembling, so its transparent.node is present for assembleStandalone's
      // NATIVE_ASSET_ENTRIES copy. Non-Linux / no-toolchain is non-fatal — the
      // capture mode degrades gracefully when the addon is absent.
      try {
        const { buildTproxyNative } = await import("./build-tproxy-native.mjs");
        const res = buildTproxyNative(projectRoot);
        console.log(
          res.built
            ? "[build-next-isolated] Built TPROXY native addon (transparent.node)"
            : `[build-next-isolated] TPROXY native addon skipped: ${res.reason}`
        );
      } catch (nativeErr) {
        console.warn(
          "[build-next-isolated] Non-fatal error building TPROXY native addon:",
          nativeErr?.message
        );
      }

      try {
        console.log(
          "[build-next-isolated] Assembling standalone bundle (static + public + natives + extras)..."
        );
        assembleStandalone({
          distDir,
          outDir: standaloneDir,
          projectRoot,
          copyNatives: true,
        });
      } catch (assembleErr) {
        console.warn("[build-next-isolated] Non-fatal error assembling standalone:", assembleErr);
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
