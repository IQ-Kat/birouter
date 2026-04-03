import { NextResponse } from "next/server";
import { skillExecutor } from "@/lib/skills/executor";

export async function GET() {
  try {
    const executions = skillExecutor.listExecutions();
    return NextResponse.json({ executions });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { skillName, input, apiKeyId, sessionId } = body;

    if (!skillName || !apiKeyId) {
      return NextResponse.json({ error: "skillName and apiKeyId are required" }, { status: 400 });
    }

    const execution = await skillExecutor.execute(skillName, input || {}, {
      apiKeyId,
      sessionId,
    });
    return NextResponse.json({ execution });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    if (error.includes("disabled")) {
      return NextResponse.json({ error }, { status: 503 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
