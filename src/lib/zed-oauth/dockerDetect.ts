import fs from "fs";

/**
 * Returns true when OmniRoute appears to be running inside a Docker container.
 * Uses two complementary heuristics that work on Linux-based Docker images:
 *   1. Presence of /.dockerenv (written by Docker at container startup).
 *   2. The string "docker" appearing in /proc/1/cgroup (Linux only).
 *
 * This is intentionally a best-effort check; false negatives on exotic runtimes
 * (e.g. podman without Docker compatibility) are acceptable — the caller degrades
 * gracefully and still surfaces the manual-import option.
 */
export function isRunningInDocker(): boolean {
  try {
    if (fs.existsSync("/.dockerenv")) return true;
  } catch {
    // ignore — not Linux or permission denied
  }
  try {
    const cgroup = fs.readFileSync("/proc/1/cgroup", "utf8");
    if (cgroup.includes("docker")) return true;
  } catch {
    // ignore — not Linux or /proc not mounted
  }
  return false;
}
