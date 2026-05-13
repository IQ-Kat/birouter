import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/cloudAgent/registry";
import {
  createCloudAgentTaskTable,
  getCloudAgentTaskById,
  updateCloudAgentTask,
  deleteCloudAgentTask,
} from "@/lib/cloudAgent/db";
import {
  getCloudAgentCorsHeaders,
  getCloudAgentCredentials,
  requireCloudAgentManagementAuth,
  serializeCloudAgentTask,
} from "@/lib/cloudAgent/api";
import { z } from "zod";
import pino from "pino";

const logger = pino({ name: "cloud-agents-api" });

export async function OPTIONS() {
  return new NextResponse(null, { headers: getCloudAgentCorsHeaders() });
}

const ApproveSchema = z.object({
  action: z.literal("approve"),
});

const MessageSchema = z.object({
  action: z.literal("message"),
  message: z.string().min(1),
});

const CancelSchema = z.object({
  action: z.literal("cancel"),
});

const TaskActionSchema = z.discriminatedUnion("action", [
  ApproveSchema,
  MessageSchema,
  CancelSchema,
]);

function cloudAgentCredentialsRequiredResponse(providerId: string) {
  return NextResponse.json(
    { error: `No active credentials configured for cloud agent provider: ${providerId}` },
    { status: 400, headers: getCloudAgentCorsHeaders() }
  );
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireCloudAgentManagementAuth(request);
    if (authError) return authError;

    createCloudAgentTaskTable();

    const { id } = await params;
    const task = getCloudAgentTaskById(id);

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404, headers: getCloudAgentCorsHeaders() }
      );
    }

    const agent = getAgent(task.provider_id);
    if (agent && task.external_id) {
      try {
        const credentials = await getCloudAgentCredentials(task.provider_id);
        if (credentials) {
          const statusResult = await agent.getStatus(task.external_id, credentials);

          updateCloudAgentTask(id, {
            status: statusResult.status,
            result: statusResult.result ? JSON.stringify(statusResult.result) : null,
            activities: JSON.stringify(statusResult.activities),
            error: statusResult.error || null,
            completed_at:
              statusResult.status === "completed" || statusResult.status === "failed"
                ? new Date().toISOString()
                : null,
          });
        }
      } catch (err) {
        console.error("Failed to sync task status:", err);
      }
    }

    const updatedTask = getCloudAgentTaskById(id);

    return NextResponse.json(
      {
        data: serializeCloudAgentTask(updatedTask!),
      },
      { headers: getCloudAgentCorsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCloudAgentCorsHeaders() }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireCloudAgentManagementAuth(request);
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const validation = TaskActionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400, headers: getCloudAgentCorsHeaders() }
      );
    }

    createCloudAgentTaskTable();

    const task = getCloudAgentTaskById(id);
    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404, headers: getCloudAgentCorsHeaders() }
      );
    }

    const validated = validation.data;

    const agent = getAgent(task.provider_id);
    if (!agent) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 500, headers: getCloudAgentCorsHeaders() }
      );
    }

    if (validated.action === "approve") {
      if (!task.external_id) {
        return NextResponse.json(
          { error: "No external task to approve" },
          { status: 400, headers: getCloudAgentCorsHeaders() }
        );
      }
      const credentials = await getCloudAgentCredentials(task.provider_id);
      if (!credentials) return cloudAgentCredentialsRequiredResponse(task.provider_id);
      await agent.approvePlan(task.external_id, credentials);
      updateCloudAgentTask(id, { status: "running" });
    } else if (validated.action === "message") {
      if (!task.external_id) {
        return NextResponse.json(
          { error: "No external task to message" },
          { status: 400, headers: getCloudAgentCorsHeaders() }
        );
      }
      const credentials = await getCloudAgentCredentials(task.provider_id);
      if (!credentials) return cloudAgentCredentialsRequiredResponse(task.provider_id);
      const activity = await agent.sendMessage(task.external_id, validated.message, credentials);
      const activities: unknown[] = serializeCloudAgentTask(task).activities;
      activities.push(activity);
      updateCloudAgentTask(id, { activities: JSON.stringify(activities) });
    } else if (validated.action === "cancel") {
      updateCloudAgentTask(id, { status: "cancelled" });
    }

    const updatedTask = getCloudAgentTaskById(id);
    return NextResponse.json(
      { success: true, data: updatedTask ? serializeCloudAgentTask(updatedTask) : null },
      { headers: getCloudAgentCorsHeaders() }
    );
  } catch (error) {
    logger.error({ err: error }, "Failed to process task action");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCloudAgentCorsHeaders() }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireCloudAgentManagementAuth(request);
    if (authError) return authError;

    createCloudAgentTaskTable();

    const { id } = await params;
    const task = getCloudAgentTaskById(id);
    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404, headers: getCloudAgentCorsHeaders() }
      );
    }

    deleteCloudAgentTask(id);
    return NextResponse.json({ success: true }, { headers: getCloudAgentCorsHeaders() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCloudAgentCorsHeaders() }
    );
  }
}
