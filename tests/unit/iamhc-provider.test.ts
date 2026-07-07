import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getProviderById } from "../../src/shared/constants/providers.ts";
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("iamhc is registered in the open-sse config registry", () => {
  const entry = REGISTRY.iamhc;
  assert.ok(entry);
  assert.equal(entry.id, "iamhc");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://api.iamhc.cn/v1/chat/completions");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.modelsUrl, "https://api.iamhc.cn/v1/models");
  assert.equal(entry.passthroughModels, true);
});

test("iamhc is defined in the frontend gateways catalog", () => {
  const provider = getProviderById("iamhc");
  assert.ok(provider);
  assert.equal(provider.id, "iamhc");
  assert.equal(provider.name, "Iamhc");
  assert.equal(provider.website, "https://api.iamhc.cn");
  assert.equal(provider.passthroughModels, true);
  assert.equal(provider.hasFree, true);
  assert.equal(provider.freeNote, "Free tier/credits available on signup");
});

test("iamhc key validation targets the correct endpoint with Bearer auth", async () => {
  const calls: { url: string; method: string; headers: Record<string, string> }[] = [];
  globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
    const u = String(url);
    const method = String(init?.method || "GET").toUpperCase();
    const headers: Record<string, string> = {};
    if (init?.headers) {
      for (const [key, val] of Object.entries(init.headers)) {
        headers[key.toLowerCase()] = String(val);
      }
    }
    calls.push({ url: u, method, headers });

    if (u.endsWith("/models")) {
      return new Response(JSON.stringify({ data: [{ id: "model-a" }] }), { status: 200 });
    }
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  };

  const result = await validateProviderApiKey({
    provider: "iamhc",
    apiKey: "sk-iamhc-test-key",
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);

  assert.equal(calls.length, 1, "Expected 1 call to the models endpoint");
  const [modelsCall] = calls;

  assert.ok(modelsCall.url.includes("api.iamhc.cn"), "Expected base URL for models check");
  assert.ok(modelsCall.url.endsWith("/v1/models"), "Expected models endpoint path");
  assert.equal(
    modelsCall.headers["authorization"],
    "Bearer sk-iamhc-test-key",
    "Expected Bearer token authorization"
  );
});
