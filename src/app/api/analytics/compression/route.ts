/**
 * GET /api/analytics/compression
 *
 * Returns aggregated compression analytics from the compression_analytics table.
 * Supports ?since=24h|7d|30d|all (default: 24h).
 */

import { NextResponse } from "next/server";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { getCompressionAnalyticsSummary } from "@/lib/db/compressionAnalytics";

export async function GET(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "analytics");
  if (policy.rejection) return policy.rejection;

  try {
    const url = new URL(req.url);
    const sinceParam = url.searchParams.get("since") ?? "24h";
    const validSince = ["24h", "7d", "30d", "all"].includes(sinceParam) ? sinceParam : "24h";

    const summary = getCompressionAnalyticsSummary(validSince === "all" ? undefined : validSince);

    return NextResponse.json(summary);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/analytics/compression]", msg);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
