import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("agentrouter key validation uses CC wire-image headers and preserves x-api-key auth", async () => {
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
      return new Response(JSON.stringify({ error: "not supported on models" }), { status: 404 });
    }
    // Upstream validation success representation
    return new Response(JSON.stringify({ id: "msg_123", content: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "agentrouter",
    apiKey: "sk-agentrouter-test-key",
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);

  // Verify the calls that were made
  assert.equal(calls.length, 2, "Expected 2 calls: one to /models and one to /messages");

  const [modelsCall, messagesCall] = calls;

  // Verify models call parameters
  assert.ok(
    modelsCall.url.includes("agentrouter.org"),
    "Expected agentrouter base URL for models check"
  );
  assert.ok(modelsCall.url.includes("/models"), "Expected models endpoint path");
  assert.equal(modelsCall.headers["x-api-key"], "sk-agentrouter-test-key");
  assert.equal(
    modelsCall.headers["authorization"],
    undefined,
    "Should not send Bearer Authorization for agentrouter"
  );
  assert.equal(modelsCall.headers["x-app"], "cli", "Should carry CC wire-image header x-app: cli");

  // Verify messages call parameters
  assert.ok(
    messagesCall.url.includes("agentrouter.org"),
    "Expected agentrouter base URL for messages check"
  );
  assert.ok(messagesCall.url.includes("/v1/messages"), "Expected messages endpoint path");
  assert.equal(messagesCall.headers["x-api-key"], "sk-agentrouter-test-key");
  assert.equal(
    messagesCall.headers["authorization"],
    undefined,
    "Should not send Bearer Authorization for agentrouter"
  );
  assert.equal(
    messagesCall.headers["x-app"],
    "cli",
    "Should carry CC wire-image header x-app: cli"
  );
});

test("agentrouter key validation correctly fails when messages returns 401", async () => {
  globalThis.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
    const u = String(url);
    if (u.endsWith("/models")) {
      return new Response(JSON.stringify({ error: "not supported on models" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  };

  const result = await validateProviderApiKey({
    provider: "agentrouter",
    apiKey: "sk-agentrouter-invalid-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});
