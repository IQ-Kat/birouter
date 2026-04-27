import { NextResponse } from "next/server";
import { getCompressionSettings, updateCompressionSettings } from "@/lib/db/compression";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { z } from "zod";

const compressionModeValues = ["off", "lite", "standard", "aggressive", "ultra"] as const;

const cavemanConfigSchema = z.object({
  enabled: z.boolean().optional(),
  compressRoles: z.array(z.enum(["user", "assistant", "system"])).optional(),
  skipRules: z.array(z.string()).optional(),
  minMessageLength: z.number().min(0).optional(),
  preservePatterns: z.array(z.string()).optional(),
});

const updateCompressionSchema = z.object({
  enabled: z.boolean().optional(),
  defaultMode: z.enum(compressionModeValues).optional(),
  autoTriggerTokens: z.number().min(0).optional(),
  cacheMinutes: z.number().min(0).optional(),
  preserveSystemPrompt: z.boolean().optional(),
  comboOverrides: z.record(z.string(), z.enum(compressionModeValues)).optional(),
  cavemanConfig: cavemanConfigSchema.optional(),
});

export async function GET() {
  try {
    const config = getCompressionSettings();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error reading compression config:", error);
    return NextResponse.json({ error: "Failed to read compression config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateCompressionSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    updateCompressionSettings(body as unknown as Record<string, unknown>);
    const config = getCompressionSettings();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating compression config:", error);
    return NextResponse.json({ error: "Failed to update compression config" }, { status: 500 });
  }
}
