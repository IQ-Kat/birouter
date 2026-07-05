import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { sanitizeErrorMessage } from "@birouter/open-sse/utils/error.ts";
import {
  getAllPacingStats,
  getProviderProfiles,
  type SmartPacingSettings,
} from "@birouter/open-sse/services/smartPacing.ts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = (await getSettings()) as Record<string, unknown>;

    const response: Record<string, unknown> = {
      enabled: settings.smartPacingEnabled !== false,
      mode: settings.smartPacingMode || "auto",
      providerProfiles: getProviderProfiles(),
      userOverrides: settings.smartPacingProviderProfiles || {},
      liveStats: getAllPacingStats(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  const errors: string[] = [];

  if (body.mode !== undefined) {
    const validModes = ["off", "auto", "human-sim"];
    if (!validModes.includes(String(body.mode))) {
      errors.push(`mode must be one of: ${validModes.join(", ")}`);
    }
  }

  if (body.enabled !== undefined && typeof body.enabled !== "boolean") {
    errors.push("enabled must be a boolean");
  }

  if (body.providerProfiles !== undefined && typeof body.providerProfiles !== "object") {
    errors.push("providerProfiles must be an object");
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: { message: "Validation failed", details: errors } },
      { status: 400 }
    );
  }

  try {
    const updates: Record<string, unknown> = {};

    if (body.enabled !== undefined) {
      updates.smartPacingEnabled = body.enabled;
    }
    if (body.mode !== undefined) {
      updates.smartPacingMode = body.mode;
    }
    if (body.providerProfiles !== undefined) {
      const existing = (await getSettings()).smartPacingProviderProfiles || {};
      updates.smartPacingProviderProfiles = {
        ...existing,
        ...(body.providerProfiles as Record<string, unknown>),
      };
    }

    await updateSettings(updates);

    const ctx = getAuditRequestContext();
    logAuditEvent({
      action: "settings.smartPacing.update",
      actor: ctx?.actor || "unknown",
      target: "settings",
      details: { updates: Object.keys(updates) },
    });

    const settings = (await getSettings()) as Record<string, unknown>;
    return NextResponse.json(
      {
        enabled: settings.smartPacingEnabled !== false,
        mode: settings.smartPacingMode || "auto",
        providerProfiles: getProviderProfiles(),
        userOverrides: settings.smartPacingProviderProfiles || {},
        liveStats: getAllPacingStats(),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
