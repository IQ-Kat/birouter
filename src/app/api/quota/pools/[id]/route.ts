/**
 * GET    /api/quota/pools/[id]  — get a single quota pool
 * PATCH  /api/quota/pools/[id]  — update pool name/allocations
 * DELETE /api/quota/pools/[id]  — delete pool
 *
 * Auth: requireManagementAuth
 * Zod:  PoolUpdateSchema from @/shared/schemas/quota (PATCH only)
 * Audit: quota.pool.updated / quota.pool.deleted (B26)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { PoolUpdateSchema } from "@/shared/schemas/quota";
import { getPool, updatePool, deletePool } from "@/lib/localDb";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";
import { reconcilePoolExclusivity } from "@/lib/quota/quotaKey";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const pool = getPool(id);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }
    return NextResponse.json({ pool });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const parsed = PoolUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    // Capture prev allocations BEFORE the update so we know which keys are leaving.
    // Only needed when `exclusive` is explicitly present in the request body.
    const exclusivePresent = body !== null && typeof body === "object" && "exclusive" in body;
    const prevApiKeyIds: string[] = [];
    if (exclusivePresent) {
      const existingPool = getPool(id);
      if (existingPool) {
        for (const alloc of existingPool.allocations) {
          prevApiKeyIds.push(alloc.apiKeyId);
        }
      }
    }

    const pool = updatePool(id, parsed.data);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    // Reconcile allowedQuotas on API keys when exclusive flag is explicitly set.
    if (exclusivePresent) {
      const nextApiKeyIds = (parsed.data.allocations ?? []).map((a) => a.apiKeyId);
      await reconcilePoolExclusivity(
        id,
        prevApiKeyIds,
        nextApiKeyIds,
        parsed.data.exclusive ?? false,
      );
    }

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.pool.updated",
      target: id,
      metadata: parsed.data,
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json({ pool });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const existed = deletePool(id);
    if (!existed) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.pool.deleted",
      target: id,
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
