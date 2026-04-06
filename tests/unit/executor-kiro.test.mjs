import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

test("KiroExecutor.buildHeaders includes Kiro-specific auth and metadata", () => {
  const executor = new KiroExecutor();
  const headers = executor.buildHeaders({ accessToken: "kiro-token" }, true);

  assert.equal(headers.Authorization, "Bearer kiro-token");
  assert.equal(headers["anthropic-beta"], "prompt-caching-2024-07-31");
  assert.equal(headers["x-amzn-bedrock-cache-control"], "enable");
  assert.ok(headers["Amz-Sdk-Invocation-Id"]);
});

test("KiroExecutor.transformRequest removes the top-level model field", () => {
  const executor = new KiroExecutor();
  const body = {
    model: "kiro-model",
    conversationState: {
      currentMessage: {
        userInputMessage: {
          modelId: "kiro-model",
        },
      },
    },
  };

  const result = executor.transformRequest("kiro-model", body, true, {});
  assert.equal("model" in result, false);
  assert.equal(result.conversationState.currentMessage.userInputMessage.modelId, "kiro-model");
});

test("KiroExecutor.execute returns upstream errors directly and transforms successful streams", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const rawResponse = new Response("ok", { status: 200 });
  let transformed = null;
  executor.transformEventStreamToSSE = (response, model) => {
    transformed = { response, model };
    return new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  globalThis.fetch = async () => new Response("upstream error", { status: 429 });
  try {
    const errorResult = await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token" },
    });
    assert.equal(errorResult.response.status, 429);
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => rawResponse;
  try {
    const successResult = await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token" },
    });

    assert.equal(successResult.response.status, 200);
    assert.equal(transformed.response, rawResponse);
    assert.equal(transformed.model, "kiro-model");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.refreshCredentials handles missing and AWS-style refresh tokens", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /oidc\.us-east-1\.amazonaws\.com\/token$/);
    return new Response(
      JSON.stringify({
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
        expiresIn: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    assert.equal(await executor.refreshCredentials({}, null), null);
    const result = await executor.refreshCredentials(
      {
        refreshToken: "refresh",
        providerSpecificData: { clientId: "client", clientSecret: "secret" },
      },
      null
    );
    assert.deepEqual(result, {
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
