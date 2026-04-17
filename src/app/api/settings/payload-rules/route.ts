import { NextResponse } from "next/server";
import { updateSettings } from "@/lib/localDb";
import {
  getPayloadRulesConfig,
  setPayloadRulesConfig,
} from "@omniroute/open-sse/services/payloadRules.ts";
import { updatePayloadRulesSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export async function GET() {
  try {
    return NextResponse.json(await getPayloadRulesConfig());
  } catch (error) {
    console.error("Error reading payload rules config:", error);
    return NextResponse.json({ error: "Failed to read payload rules config" }, { status: 500 });
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
    const validation = validateBody(updatePayloadRulesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    setPayloadRulesConfig(validation.data);
    const currentConfig = await getPayloadRulesConfig();
    await updateSettings({ payloadRules: currentConfig });

    return NextResponse.json(currentConfig);
  } catch (error) {
    console.error("Error updating payload rules config:", error);
    return NextResponse.json({ error: "Failed to update payload rules config" }, { status: 500 });
  }
}
