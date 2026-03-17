import { getProxyHealthStats } from "@/lib/localDb";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = Number(searchParams.get("hours") || 24);
    const items = await getProxyHealthStats({ hours });
    return Response.json({ items, total: items.length, windowHours: hours });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy health stats");
  }
}
