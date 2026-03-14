import { NextResponse } from "next/server";
import {
  getTaskRoutingConfig,
  setTaskRoutingConfig,
  resetTaskRoutingStats,
  getDefaultTaskModelMap,
} from "@omniroute/open-sse/services/taskAwareRouter.ts";
import { updateSettings } from "@/lib/db/settings";

/**
 * GET /api/settings/task-routing
 * Returns the current task-aware routing configuration.
 */
export async function GET() {
  try {
    return NextResponse.json({
      ...getTaskRoutingConfig(),
      defaultTaskModelMap: getDefaultTaskModelMap(),
    });
  } catch (error) {
    console.error("[API ERROR] /api/settings/task-routing GET:", error);
    return NextResponse.json({ error: "Failed to get config" }, { status: 500 });
  }
}

/**
 * PUT /api/settings/task-routing
 * Update the task-aware routing configuration.
 * Body: { enabled?: boolean, taskModelMap?: { coding?: "...", ... }, detectionEnabled?: boolean }
 */
export async function PUT(request: Request) {
  let rawBody: Record<string, unknown>;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    setTaskRoutingConfig(rawBody as any);

    // Persist to database (excluding stats)
    const { stats, ...persistable } = getTaskRoutingConfig();
    await updateSettings({ taskRouting: JSON.stringify(persistable) });

    return NextResponse.json({ success: true, ...getTaskRoutingConfig() });
  } catch (error) {
    console.error("[API ERROR] /api/settings/task-routing PUT:", error);
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}

/**
 * POST /api/settings/task-routing
 * Actions: { action: "reset-stats" | "detect" }
 * For "detect": pass { action: "detect", body: <request-body> } to test detection
 */
export async function POST(request: Request) {
  let rawBody: any;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    if (rawBody.action === "reset-stats") {
      resetTaskRoutingStats();
      return NextResponse.json({
        success: true,
        stats: getTaskRoutingConfig().stats,
      });
    }

    if (rawBody.action === "detect") {
      const { detectTaskType } = await import("@omniroute/open-sse/services/taskAwareRouter.ts");
      const taskType = detectTaskType(rawBody.body || {});
      const config = getTaskRoutingConfig();
      return NextResponse.json({
        taskType,
        preferredModel: config.taskModelMap[taskType] || "(no override)",
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("[API ERROR] /api/settings/task-routing POST:", error);
    return NextResponse.json({ error: "Failed to execute action" }, { status: 500 });
  }
}
