import pkg from "../../../../package.json" with { type: "json" };
import { UPDATER_CONFIG } from "@/shared/constants/config";

// Compare semver versions: returns 1 if a > b, -1 if a < b, 0 if equal
function compareVersions(a, b) {
  const partsA = (a || "0.0.0").split(".").map(v => parseInt(v, 10) || 0);
  const partsB = (b || "0.0.0").split(".").map(v => parseInt(v, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if (partsA[i] > partsB[i]) return 1;
    if (partsA[i] < partsB[i]) return -1;
  }
  return 0;
}

export async function GET() {
  const currentVersion = pkg.version;
  const packageName = UPDATER_CONFIG.npmPackageName || "birouter";

  try {
    // Fetch latest version from NPM registry with timeout
    const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      const latestVersion = data.version;
      const hasUpdate = compareVersions(latestVersion, currentVersion) > 0;

      return Response.json({
        currentVersion,
        latestVersion,
        hasUpdate
      });
    }
  } catch (error) {
    console.error("Update check failed:", error);
  }

  // Fallback if NPM check fails
  return Response.json({ currentVersion, latestVersion: null, hasUpdate: false });
}
