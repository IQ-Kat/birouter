import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { getCallLogRetentionDays } from "@/lib/logEnv";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getDbInstance();
    const retentionMs = getCallLogRetentionDays() * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - retentionMs).toISOString();
    const result = db.prepare("DELETE FROM call_logs WHERE timestamp < ?").run(cutoff);
    return NextResponse.json({ deleted: result.changes });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
