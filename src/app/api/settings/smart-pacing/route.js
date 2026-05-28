import { NextResponse } from "next/server";
import { getAllPacingStats, PROVIDER_PROFILES } from "@/sse/services/smartPacing";
import { getSharedIPWarnings } from "@/sse/services/stickyProxy";
import { getSettings } from "@/lib/localDb";

/**
 * GET /api/settings/smart-pacing
 * Returns current smart pacing configuration, live stats, and security warnings.
 */
export async function GET() {
  try {
    const settings = await getSettings();
    const stats = getAllPacingStats();
    const ipWarnings = getSharedIPWarnings();

    return NextResponse.json({
      enabled: settings.smartPacingEnabled !== false,
      mode: settings.smartPacingMode || "auto",
      providerProfiles: PROVIDER_PROFILES,
      userOverrides: settings.smartPacingProviderProfiles || {},
      liveStats: stats,
      securityWarnings: ipWarnings,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
