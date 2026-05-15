import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { resolveDataDir } from "../data-dir.mjs";

export function getPidFilePath() {
  return join(resolveDataDir(), "server.pid");
}

export function writePidFile(pid) {
  try {
    const pidPath = getPidFilePath();
    const dir = dirname(pidPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(pidPath, String(pid), "utf8");
    return true;
  } catch {
    return false;
  }
}

export function readPidFile() {
  try {
    const pidPath = getPidFilePath();
    if (!existsSync(pidPath)) return null;
    const content = readFileSync(pidPath, "utf8").trim();
    return content ? parseInt(content, 10) : null;
  } catch {
    return null;
  }
}

export function isPidRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function cleanupPidFile() {
  try {
    const pidPath = getPidFilePath();
    if (existsSync(pidPath)) unlinkSync(pidPath);
  } catch {}
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForServer(port, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`http://localhost:${port}/api/health`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return true;
    } catch {}
    await sleep(500);
  }
  return false;
}
