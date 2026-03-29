/**
 * GET  /api/system/version  — Returns current version and latest available on npm
 * POST /api/system/version  — Triggers a deployment-aware background update
 *
 * Security: Requires admin authentication (same as other management routes).
 * Safety: Update only runs if a newer version is available on npm.
 */
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getAutoUpdateConfig,
  launchAutoUpdate,
  validateAutoUpdateRuntime,
} from "@/lib/system/autoUpdate";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

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

function getCurrentVersion(): string {
  try {
    return require("../../../../../package.json").version as string;
  } catch {
    return "unknown";
  }
}

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
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = getCurrentVersion();
  const latest = await getLatestNpmVersion();
  const updateAvailable = isNewer(latest, current);
  const config = getAutoUpdateConfig();
  const validation = await validateAutoUpdateRuntime(config);

  return NextResponse.json({
    current,
    latest: latest ?? "unavailable",
    updateAvailable,
    channel: config.mode,
    autoUpdateSupported: validation.supported,
    autoUpdateError: validation.reason,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
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

  const launched = await launchAutoUpdate({ latest });
  if (!launched.started) {
    return NextResponse.json(
      {
        success: false,
        error: launched.error || "Failed to start auto-update.",
        channel: launched.channel,
        logPath: launched.logPath,
      },
      { status: 503 }
    );
  }

  const message =
    launched.channel === "docker-compose"
      ? `Update to v${latest} started. Docker rebuild is running in the background.`
      : `Update to v${latest} started. Restarting in ~30 seconds.`;

  return NextResponse.json({
    success: true,
    message,
    from: current,
    to: latest,
    channel: launched.channel,
    logPath: launched.logPath,
  });
}
