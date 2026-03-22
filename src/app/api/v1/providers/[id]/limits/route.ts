import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { setProviderKeyLimit, getProviderKeyLimit } from "@/lib/db/registeredKeys";

const limitsSchema = z.object({
  maxActiveKeys: z.number().int().positive().nullable().optional(),
  dailyIssueLimit: z.number().int().positive().nullable().optional(),
  hourlyIssueLimit: z.number().int().positive().nullable().optional(),
});

/**
 * GET /api/v1/providers/[id]/limits
 * Get the current issuance limits for a provider.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const limits = getProviderKeyLimit(params.id);
  return NextResponse.json({ provider: params.id, limits: limits ?? null });
}

/**
 * PUT /api/v1/providers/[id]/limits
 * Configure issuance limits for a provider.
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = limitsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  setProviderKeyLimit(params.id, parsed.data);
  const updated = getProviderKeyLimit(params.id);
  return NextResponse.json({ provider: params.id, limits: updated });
}
