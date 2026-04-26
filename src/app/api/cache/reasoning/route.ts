import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * GET /api/cache/reasoning
 *
 * Returns reasoning replay cache stats + paginated entries.
 * Query params: ?provider=deepseek&model=deepseek-reasoner&limit=50&offset=0
 */
export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { getReasoningCacheServiceStats, getReasoningCacheServiceEntries } =
      await import("@omniroute/open-sse/services/reasoningCache");

    const { searchParams } = new URL(req.url);
    const provider = searchParams.get("provider") || undefined;
    const model = searchParams.get("model") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const stats = getReasoningCacheServiceStats();
    const entries = getReasoningCacheServiceEntries({
      limit: Math.min(Math.max(limit, 1), 200),
      offset: Math.max(offset, 0),
      provider,
      model,
    });

    return NextResponse.json({ stats, entries });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/cache/reasoning
 *
 * Clears reasoning cache entries.
 * Query params: ?provider=deepseek (filter by provider) or no params (clear all).
 */
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { clearReasoningCacheAll } = await import("@omniroute/open-sse/services/reasoningCache");

    const { searchParams } = new URL(req.url);
    const provider = searchParams.get("provider") || undefined;

    const cleared = clearReasoningCacheAll(provider);

    return NextResponse.json({
      ok: true,
      cleared,
      scope: provider ? "provider" : "all",
      ...(provider ? { provider } : {}),
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
