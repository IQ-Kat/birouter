import test from "node:test";
import assert from "node:assert/strict";

import {
  CodexExecutor,
  getCodexModelScope,
  getCodexRateLimitKey,
  getCodexResetTime,
  parseCodexQuotaHeaders,
  setDefaultFastServiceTierEnabled,
} from "../../open-sse/executors/codex.ts";

test("Codex helper functions isolate rate-limit scopes and parse quota headers", () => {
  const quota = parseCodexQuotaHeaders(
    new Headers({
      "x-codex-5h-usage": "100",
      "x-codex-5h-limit": "500",
      "x-codex-5h-reset-at": new Date(Date.now() + 60_000).toISOString(),
      "x-codex-7d-usage": "1000",
      "x-codex-7d-limit": "5000",
      "x-codex-7d-reset-at": new Date(Date.now() + 120_000).toISOString(),
    })
  );

  assert.equal(getCodexModelScope("codex-spark-mini"), "spark");
  assert.equal(getCodexModelScope("gpt-5.3-codex"), "codex");
  assert.equal(getCodexRateLimitKey("acct-1", "codex-spark-mini"), "acct-1:spark");
  assert.equal(quota.usage5h, 100);
  assert.equal(quota.limit7d, 5000);
  assert.ok(getCodexResetTime(quota) >= new Date(quota.resetAt7d).getTime());
});

test("CodexExecutor.buildUrl honors /responses subpaths and compact mode", () => {
  const executor = new CodexExecutor();

  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, {}),
    "https://chatgpt.com/backend-api/codex/responses"
  );
  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, { requestEndpointPath: "/responses" }),
    "https://chatgpt.com/backend-api/codex/responses"
  );
  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, { requestEndpointPath: "/responses/compact" }),
    "https://chatgpt.com/backend-api/codex/responses/compact"
  );
});

test("CodexExecutor.buildHeaders binds workspace ids and disables SSE accept for compact responses", () => {
  const executor = new CodexExecutor();
  const standardHeaders = executor.buildHeaders(
    {
      accessToken: "codex-token",
      providerSpecificData: { workspaceId: "workspace-1" },
    },
    true
  );
  const compactHeaders = executor.buildHeaders(
    {
      accessToken: "codex-token",
      requestEndpointPath: "/responses/compact",
    },
    true
  );

  assert.equal(standardHeaders.Authorization, "Bearer codex-token");
  assert.equal(standardHeaders.Accept, "text/event-stream");
  assert.equal(standardHeaders["chatgpt-account-id"], "workspace-1");
  assert.equal(compactHeaders.Accept, "application/json");
});

test("CodexExecutor.transformRequest injects default instructions, clamps reasoning and strips unsupported fields", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5-mini",
    messages: [{ role: "user", content: "hello" }],
    prompt: "legacy",
    stream_options: { include_usage: true },
    instructions: "",
    reasoning_effort: "xhigh",
    service_tier: "fast",
    temperature: 0.4,
    user: "cursor",
  };

  const result = executor.transformRequest("gpt-5-mini-xhigh", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(result.stream, true);
  assert.equal(result.store, false);
  assert.equal(result.instructions.length > 0, true);
  assert.equal(result.reasoning.effort, "high");
  assert.equal(result.service_tier, "priority");
  assert.equal(result.messages, undefined);
  assert.equal(result.prompt, undefined);
  assert.equal(result.temperature, undefined);
  assert.equal(result.user, undefined);
  assert.equal(result.stream_options, undefined);
});

test("CodexExecutor.transformRequest preserves compact requests and native passthrough semantics", () => {
  const executor = new CodexExecutor();
  setDefaultFastServiceTierEnabled(true);

  try {
    const body = {
      _nativeCodexPassthrough: true,
      instructions: "keep this",
      stream: false,
    };
    const result = executor.transformRequest("gpt-5.3-codex", body, false, {
      requestEndpointPath: "/responses/compact",
    });

    assert.equal(result._nativeCodexPassthrough, undefined);
    assert.equal(result.stream, undefined);
    assert.equal(result.service_tier, "priority");
    assert.equal(result.store, false);
    assert.equal(result.instructions, "keep this");
  } finally {
    setDefaultFastServiceTierEnabled(false);
  }
});

test("CodexExecutor.refreshCredentials refreshes OAuth tokens and returns null without a refresh token", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /auth\.openai\.com\/oauth\/token$/);
    return new Response(
      JSON.stringify({
        access_token: "new-token",
        refresh_token: "new-refresh",
        expires_in: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    assert.equal(await executor.refreshCredentials({}, null), null);
    const refreshed = await executor.refreshCredentials({ refreshToken: "refresh-me" }, null);
    assert.deepEqual(refreshed, {
      accessToken: "new-token",
      refreshToken: "new-refresh",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
