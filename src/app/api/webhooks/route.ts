/**
 * API: Webhooks
 * GET  — List all webhooks
 * POST — Create a new webhook
 */

import { NextResponse } from "next/server";
import { getWebhooks, createWebhook } from "@/lib/localDb";

export async function GET() {
  try {
    const webhooks = getWebhooks();
    // Mask secrets in listing
    const masked = webhooks.map((w) => ({
      ...w,
      secret: w.secret ? `${w.secret.slice(0, 10)}...` : null,
    }));
    return NextResponse.json({ webhooks: masked });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to list webhooks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'url' field" }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const webhook = createWebhook({
      url: body.url,
      events: body.events || ["*"],
      secret: body.secret,
      description: body.description || "",
    });

    return NextResponse.json({ webhook }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create webhook" },
      { status: 500 }
    );
  }
}
