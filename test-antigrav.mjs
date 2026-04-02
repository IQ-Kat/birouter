import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("./open-sse/services/usage.ts");

test("antigravity fraction logic", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          currentTier: { id: "pro", name: "Pro" },
        }),
        { status: 200 }
      );
    }
    if (url.includes("fetchAvailableModels")) {
      return new Response(
        JSON.stringify({
          models: {
            "gemini-1.5-pro": {
              quotaInfo: {
                remainingFraction: 0,
                resetTime: "2025-05-01T00:00:00Z",
              },
            },
          },
        }),
        { status: 200 }
      );
    }
  };

  try {
    const res = await usageService.getUsageForProvider({
      provider: "antigravity",
      accessToken: "test",
    });
    console.log(JSON.stringify(res, null, 2));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
