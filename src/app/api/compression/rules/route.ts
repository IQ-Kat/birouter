import { NextResponse } from "next/server";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { getCavemanRuleMetadata } from "@omniroute/open-sse/services/compression/cavemanRules";

export async function GET(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "settings");
  if (policy.rejection) return policy.rejection;

  return NextResponse.json({
    rules: getCavemanRuleMetadata(),
  });
}
