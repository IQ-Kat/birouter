/**
 * API: Model-Combo Mappings (#563)
 * GET  — List all mappings
 * POST — Create a new mapping
 */

import { NextResponse } from "next/server";
import { getModelComboMappings, createModelComboMapping } from "@/lib/localDb";

export async function GET() {
  try {
    const mappings = await getModelComboMappings();
    return NextResponse.json({ mappings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to list model-combo mappings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.pattern || typeof body.pattern !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'pattern' field" }, { status: 400 });
    }
    if (!body.comboId || typeof body.comboId !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'comboId' field" }, { status: 400 });
    }

    const mapping = await createModelComboMapping({
      pattern: body.pattern.trim(),
      comboId: body.comboId,
      priority: typeof body.priority === "number" ? body.priority : 0,
      enabled: body.enabled !== false,
      description: body.description || "",
    });

    return NextResponse.json({ mapping }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create model-combo mapping" },
      { status: 500 }
    );
  }
}
