import { migrateLegacyProxyConfigToRegistry } from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

export async function POST(request: Request) {
  let force = false;

  try {
    const body = await request.json().catch(() => ({}));
    force = body?.force === true;
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  try {
    const result = await migrateLegacyProxyConfigToRegistry({ force });
    return Response.json(result);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to migrate legacy proxy config");
  }
}
