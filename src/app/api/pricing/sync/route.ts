/**
 * API Route: /api/pricing/sync
 *
 * POST — Trigger a manual pricing sync from external sources.
 * GET  — Get current sync status.
 * DELETE — Clear all synced pricing data.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sources = Array.isArray(body.sources)
      ? body.sources.filter((s: unknown): s is string => typeof s === "string")
      : undefined;
    const dryRun = body.dryRun === true;

    const { syncPricingFromSources } = await import("@/lib/pricingSync");
    const result = await syncPricingFromSources({ sources, dryRun });

    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { getSyncStatus } = await import("@/lib/pricingSync");
    return NextResponse.json(getSyncStatus());
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { clearSyncedPricing } = await import("@/lib/pricingSync");
    clearSyncedPricing();
    return NextResponse.json({ success: true, message: "Synced pricing data cleared" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
