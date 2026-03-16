import { NextResponse } from "next/server";
import { providerNodeValidateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// POST /api/provider-nodes/validate - Validate API key against base URL
export async function POST(request) {
  let rawBody;
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
    const validation = validateBody(providerNodeValidateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey, type, modelsPath } = validation.data;

    // Anthropic Compatible Validation
    if (type === "anthropic-compatible") {
      // Robustly construct URL: remove trailing slash, and remove trailing /messages if user added it
      let normalizedBase = baseUrl.trim().replace(/\/$/, "");
      if (normalizedBase.endsWith("/messages")) {
        normalizedBase = normalizedBase.slice(0, -9); // remove /messages
      }

      // Use /models endpoint for validation as many compatible providers support it (like OpenAI)
      const modelsUrl = `${normalizedBase}${modelsPath || "/models"}`;

      const res = await fetch(modelsUrl, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${apiKey}`, // Add Bearer token for hybrid proxies
        },
      });

      return NextResponse.json({ valid: res.ok, error: res.ok ? null : "Invalid API key" });
    }

    // OpenAI Compatible Validation (Default)
    const modelsUrl = `${baseUrl.replace(/\/$/, "")}${modelsPath || "/models"}`;
    const res = await fetch(modelsUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    return NextResponse.json({ valid: res.ok, error: res.ok ? null : "Invalid API key" });
  } catch (error) {
    console.log("Error validating provider node:", error);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
