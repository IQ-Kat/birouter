/**
 * API: Model-Combo Mapping by ID (#563)
 * PUT    — Update a mapping
 * DELETE — Delete a mapping
 */

import { NextResponse } from "next/server";
import {
  updateModelComboMapping,
  deleteModelComboMapping,
  getModelComboMappingById,
} from "@/lib/localDb";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const mapping = await getModelComboMappingById(id);
    if (!mapping) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }
    return NextResponse.json({ mapping });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to get mapping" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const mapping = await updateModelComboMapping(id, {
      pattern: body.pattern,
      comboId: body.comboId,
      priority: body.priority,
      enabled: body.enabled,
      description: body.description,
    });

    if (!mapping) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }

    return NextResponse.json({ mapping });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update mapping" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await deleteModelComboMapping(id);

    if (!deleted) {
      return NextResponse.json({ error: "Mapping not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete mapping" },
      { status: 500 }
    );
  }
}
