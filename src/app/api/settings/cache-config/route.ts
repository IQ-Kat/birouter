import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";

const CACHE_CONFIG_KEYS = [
  "semanticCacheEnabled",
  "semanticCacheMaxSize",
  "semanticCacheTTL",
  "promptCacheEnabled",
  "promptCacheStrategy",
  "alwaysPreserveClientCache",
] as const;

const DEFAULTS = {
  semanticCacheEnabled: true,
  semanticCacheMaxSize: 100,
  semanticCacheTTL: 1800000,
  promptCacheEnabled: true,
  promptCacheStrategy: "auto",
  alwaysPreserveClientCache: "auto",
};

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    const config: Record<string, unknown> = {};
    for (const key of CACHE_CONFIG_KEYS) {
      config[key] = settings[key] ?? DEFAULTS[key];
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.semanticCacheEnabled === "boolean") {
      updates.semanticCacheEnabled = body.semanticCacheEnabled;
    }
    if (typeof body.semanticCacheMaxSize === "number" && body.semanticCacheMaxSize > 0) {
      updates.semanticCacheMaxSize = body.semanticCacheMaxSize;
    }
    if (typeof body.semanticCacheTTL === "number" && body.semanticCacheTTL > 0) {
      updates.semanticCacheTTL = body.semanticCacheTTL;
    }
    if (typeof body.promptCacheEnabled === "boolean") {
      updates.promptCacheEnabled = body.promptCacheEnabled;
    }
    if (["auto", "system-only", "manual"].includes(body.promptCacheStrategy)) {
      updates.promptCacheStrategy = body.promptCacheStrategy;
    }
    if (["auto", "always", "never"].includes(body.alwaysPreserveClientCache)) {
      updates.alwaysPreserveClientCache = body.alwaysPreserveClientCache;
    }

    await updateSettings(updates);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
