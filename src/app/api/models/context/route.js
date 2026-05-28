import { NextResponse } from "next/server";
import { getAllFetchedModels } from "@/lib/db/index.js";
import { getProviderAlias } from "@/shared/constants/providers";

export const dynamic = "force-dynamic";

/**
 * GET /api/models/context
 * Returns a map of model value (alias/modelId) → contextLength
 * Aggregated from all fetched models across providers.
 */
export async function GET() {
  try {
    const allFetched = await getAllFetchedModels();
    const contextMap = {}; // { "provider-alias/model-id": contextLength }

    for (const [providerId, data] of Object.entries(allFetched)) {
      const models = data.models || [];
      const alias = getProviderAlias(providerId) || providerId;

      for (const m of models) {
        if (m.contextLength && m.id) {
          // Store by both alias/id and raw id for flexible lookup
          contextMap[`${alias}/${m.id}`] = m.contextLength;
          contextMap[m.id] = m.contextLength;
        }
      }
    }

    return NextResponse.json({ context: contextMap });
  } catch (error) {
    console.log("Error fetching model context data:", error);
    return NextResponse.json({ context: {} });
  }
}
