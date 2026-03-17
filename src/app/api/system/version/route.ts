/**
 * GET  /api/system/version  — Returns current version and latest available on npm
 * POST /api/system/update   — Triggers npm install -g omniroute@latest + pm2 restart
 *
 * Security: Requires admin authentication (same as other management routes).
 * Safety: Update only runs if a newer version is available on npm.
 */
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { isAuthenticated } from "@/shared/utils/apiAuth";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

/** Fetch latest version from npm registry (no install, just metadata) */
async function getLatestNpmVersion(): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("npm", ["info", "omniroute", "version", "--json"], {
      timeout: 10000,
    });
    const parsed = JSON.parse(stdout.trim());
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Current installed version from package.json */
function getCurrentVersion(): string {
  try {
     
    return require("../../../../../package.json").version as string;
  } catch {
    return "unknown";
  }
}

/** Compare semver strings — returns true if a > b */
function isNewer(a: string | null, b: string): boolean {
  if (!a) return false;
  const parse = (v: string) => v.split(".").map(Number);
  const [aMaj, aMin, aPat] = parse(a);
  const [bMaj, bMin, bPat] = parse(b);
  if (aMaj !== bMaj) return aMaj > bMaj;
  if (aMin !== bMin) return aMin > bMin;
  return aPat > bPat;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = getCurrentVersion();
  const latest = await getLatestNpmVersion();
  const updateAvailable = isNewer(latest, current);

  return NextResponse.json({
    current,
    latest: latest ?? "unavailable",
    updateAvailable,
    channel: "npm",
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = getCurrentVersion();
  const latest = await getLatestNpmVersion();

  if (!latest) {
    return NextResponse.json(
      { success: false, error: "Could not reach npm registry" },
      { status: 503 }
    );
  }

  if (!isNewer(latest, current)) {
    return NextResponse.json({
      success: false,
      error: `Already on latest version (${current})`,
      current,
      latest,
    });
  }

  // Run update in background — client gets immediate acknowledgment
  const install = async () => {
    try {
      await execFileAsync("npm", ["install", "-g", `omniroute@${latest}`, "--ignore-scripts"], {
        timeout: 300000, // 5 minutes
      });
      // Restart PM2 — non-fatal if pm2 not available (Docker/manual setups)
      await execFileAsync("pm2", ["restart", "omniroute"]).catch(() => null);
      console.log(`[AutoUpdate] Successfully updated to v${latest}`);
    } catch (err) {
      console.error(`[AutoUpdate] Update failed:`, err);
    }
  };

  // Fire-and-forget
  install();

  return NextResponse.json({
    success: true,
    message: `Update to v${latest} started. Restarting in ~30 seconds.`,
    from: current,
    to: latest,
  });
}
