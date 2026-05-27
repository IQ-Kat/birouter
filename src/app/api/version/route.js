import pkg from "../../../../package.json" with { type: "json" };

// Update check disabled for local fork — no npm registry package
export async function GET() {
  const currentVersion = pkg.version;
  return Response.json({ currentVersion, latestVersion: null, hasUpdate: false });
}
