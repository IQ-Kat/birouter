import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCompressionSettings, updateCompressionSettings } from "@/lib/db/compression";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const compressionModeSchema = z.enum(["off", "lite", "standard", "aggressive", "ultra"]);

const cavemanConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    compressRoles: z.array(z.enum(["user", "assistant", "system"])).optional(),
    skipRules: z.array(z.string()).optional(),
    minMessageLength: z.number().int().min(0).optional(),
    preservePatterns: z.array(z.string()).optional(),
  })
  .strict();

const compressionSettingsUpdateSchema = z
  .object({
    enabled: z.boolean().optional(),
    defaultMode: compressionModeSchema.optional(),
    autoTriggerTokens: z.number().int().min(0).optional(),
    cacheMinutes: z.number().int().min(1).max(60).optional(),
    preserveSystemPrompt: z.boolean().optional(),
    comboOverrides: z.record(z.string(), compressionModeSchema).optional(),
    cavemanConfig: cavemanConfigSchema.optional(),
  })
  .strict();

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getCompressionSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(compressionSettingsUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const settings = await updateCompressionSettings(
      validation.data as Parameters<typeof updateCompressionSettings>[0]
    );
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
