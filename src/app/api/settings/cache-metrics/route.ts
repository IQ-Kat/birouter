import { NextResponse } from "next/server";
import { getCacheMetrics, resetCacheMetrics } from "@/lib/db/settings";

export async function GET() {
  try {
    const metrics = await getCacheMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error getting cache metrics:", error);
    return NextResponse.json({ error: "Failed to load cache metrics" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const metrics = await resetCacheMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error resetting cache metrics:", error);
    return NextResponse.json({ error: "Failed to reset cache metrics" }, { status: 500 });
  }
}
