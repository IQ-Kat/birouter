/**
 * GET  /api/logs/detail         — List detailed request logs
 * GET  /api/logs/detail/:id     — Get specific detailed log
 * POST /api/logs/detail/toggle  — Enable/disable detailed logging
 */
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getRequestDetailLogs,
  getRequestDetailLogCount,
  isDetailedLoggingEnabled,
} from "@/lib/db/detailedLogs";
import { updateSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const logs = getRequestDetailLogs(limit, offset);
  const total = getRequestDetailLogCount();
  const enabled = await isDetailedLoggingEnabled();

  return NextResponse.json({ enabled, total, logs });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const enabled = body.enabled === true || body.enabled === "1";

  await updateSettings({ detailed_logs_enabled: enabled });

  return NextResponse.json({
    success: true,
    enabled,
    message: enabled
      ? "Detailed logging enabled. Pipeline bodies will be captured for new requests."
      : "Detailed logging disabled.",
  });
}
