import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getRegisteredKey, revokeRegisteredKey } from "@/lib/db/registeredKeys";

// ─── GET /api/v1/registered-keys/[id] ────────────────────────────────────────

export async function GET(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const key = getRegisteredKey(params.id);
  if (!key) {
    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  }

  return NextResponse.json({ key });
}

// ─── DELETE /api/v1/registered-keys/[id] ─────────────────────────────────────

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const revoked = revokeRegisteredKey(params.id);
  if (!revoked) {
    return NextResponse.json({ error: "Key not found or already revoked" }, { status: 404 });
  }

  return NextResponse.json({ success: true, id: params.id, revokedAt: new Date().toISOString() });
}
