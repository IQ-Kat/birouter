import { NextResponse } from "next/server";
import { buildTelemetryPayload } from "@/lib/monitoring/observability";
import { getTelemetrySummary } from "@/shared/utils/requestTelemetry";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const windowMs = parseInt(searchParams.get("windowMs") || "300000", 10);
    const summary = getTelemetrySummary(windowMs);
    const { getQuotaMonitorSummary } = await import("@omniroute/open-sse/services/quotaMonitor.ts");
    const { getActiveSessions } = await import("@omniroute/open-sse/services/sessionManager.ts");
    const payload = buildTelemetryPayload({
      summary,
      quotaMonitorSummary: getQuotaMonitorSummary(),
      activeSessions: getActiveSessions(),
    });
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
