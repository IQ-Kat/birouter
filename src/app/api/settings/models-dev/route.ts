import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  syncModelsDev,
  getModelsDevPricing,
  getSyncedCapabilities,
  getSyncStatus,
  startPeriodicSync,
  stopPeriodicSync,
} from "@/lib/modelsDevSync";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "status") {
    const status = getSyncStatus();
    const pricing = getModelsDevPricing();
    const caps = getSyncedCapabilities();

    const providerCount = Object.keys(pricing).length;
    const modelCount = Object.values(pricing).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const capabilityCount = Object.values(caps).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );

    return NextResponse.json({
      ...status,
      providerCount,
      modelCount,
      capabilityCount,
    });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const action = body.action as string | undefined;

  if (action === "sync") {
    const dryRun = body.dryRun === true;
    const syncCapabilities = body.syncCapabilities !== false;
    const result = await syncModelsDev({ dryRun, syncCapabilities });
    return NextResponse.json(result);
  }

  if (action === "start") {
    startPeriodicSync();
    return NextResponse.json({ success: true, message: "Periodic sync started" });
  }

  if (action === "stop") {
    stopPeriodicSync();
    return NextResponse.json({ success: true, message: "Periodic sync stopped" });
  }

  return NextResponse.json({ error: "Unknown action. Use: sync, start, stop" }, { status: 400 });
}
