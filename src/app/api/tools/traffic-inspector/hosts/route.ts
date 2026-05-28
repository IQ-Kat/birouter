/**
 * GET  /api/tools/traffic-inspector/hosts — list custom host capture entries
 * POST /api/tools/traffic-inspector/hosts — add a host (DB record)
 *
 * The DB record enables the MITM proxy to SNI-certify the host on demand.
 * DNS /etc/hosts edits are out of scope for this route — clients that need
 * OS-level redirect must use the Custom Hosts setup guide (requires sudo).
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorCustomHostSchema } from "@/shared/schemas/inspector";
import { listCustomHosts, addCustomHost } from "@/lib/db/inspectorCustomHosts";

export async function GET(): Promise<Response> {
  try {
    const hosts = listCustomHosts();
    return Response.json({ hosts });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to list hosts")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = InspectorCustomHostSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const { host, kind, label } = parsed.data;

  try {
    addCustomHost(host, kind, label ?? undefined);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to add host")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  return Response.json({ ok: true, host }, { status: 201 });
}
