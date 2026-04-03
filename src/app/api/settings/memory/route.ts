import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db/settings";

const MEMORY_KEYS = ["enabled", "maxTokens", "retentionDays", "strategy", "skillsEnabled"] as const;

const DEFAULTS: Record<string, unknown> = {
  enabled: true,
  maxTokens: 2000,
  retentionDays: 30,
  strategy: "hybrid",
  skillsEnabled: false,
};

export async function GET() {
  try {
    const settings = await getSettings();
    const memorySettings: Record<string, unknown> = {};
    for (const key of MEMORY_KEYS) {
      memorySettings[key] = settings[key] ?? DEFAULTS[key];
    }
    return NextResponse.json(memorySettings);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};
    for (const key of MEMORY_KEYS) {
      if (key in body) {
        updates[key] = body[key];
      }
    }
    await updateSettings(updates);
    const settings = await getSettings();
    const memorySettings: Record<string, unknown> = {};
    for (const key of MEMORY_KEYS) {
      memorySettings[key] = settings[key] ?? DEFAULTS[key];
    }
    return NextResponse.json(memorySettings);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
