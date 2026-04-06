import test from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("AntigravityExecutor.buildUrl always targets the streaming endpoint", () => {
  const executor = new AntigravityExecutor();
  assert.match(
    executor.buildUrl("gemini-2.5-flash", true),
    /\/v1internal:streamGenerateContent\?alt=sse$/
  );
  assert.equal(
    executor.buildUrl("gemini-2.5-flash", false),
    executor.buildUrl("gemini-2.5-flash", true)
  );
});

test("AntigravityExecutor.buildHeaders includes auth and SSE accept", () => {
  const executor = new AntigravityExecutor();
  const headers = executor.buildHeaders({ accessToken: "ag-token" }, false);

  assert.equal(headers.Authorization, "Bearer ag-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["X-OmniRoute-Source"], "omniroute");
});

test("AntigravityExecutor.transformRequest normalizes model, project and contents", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [
        {
          role: "model",
          parts: [
            { thought: true, text: "skip me" },
            { thoughtSignature: "sig-only" },
            { text: "keep me" },
          ],
        },
        {
          role: "model",
          parts: [{ functionResponse: { name: "read_file", response: {} } }],
        },
      ],
      tools: [{ functionDeclarations: [{ name: "read_file" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  assert.equal(result.project, "project-1");
  assert.equal(result.model, "gemini-3.1-pro-low");
  assert.equal(result.userAgent, "antigravity");
  assert.ok(result.request.sessionId);
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
  assert.deepEqual(result.request.contents[0].parts, [{ text: "keep me" }]);
  assert.equal(result.request.contents[1].role, "user");
});

test("AntigravityExecutor.transformRequest returns a structured error response when projectId is missing", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "gemini-2.5-flash",
    { request: { contents: [] } },
    true,
    {}
  );
  const payload = await result.json();

  assert.equal(result.status, 422);
  assert.equal(payload.error.code, "missing_project_id");
  assert.match(payload.error.message, /Missing Google projectId/);
});

test("AntigravityExecutor parses retry timing from headers and error strings", () => {
  const executor = new AntigravityExecutor();
  const headers = new Headers({
    "retry-after": "120",
    "x-ratelimit-reset-after": "30",
  });

  assert.equal(executor.parseRetryHeaders(headers), 120_000);
  assert.equal(
    executor.parseRetryFromErrorMessage("Your quota will reset after 2h7m23s"),
    7_643_000
  );
});

test("AntigravityExecutor.collectStreamToResponse turns SSE Gemini chunks into a chat completion", async () => {
  const executor = new AntigravityExecutor();
  const response = new Response(
    [
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"Hello "}]},"finishReason":"STOP"}]}}\n\n',
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"world"}]},"finishReason":"STOP"}],"usageMetadata":{"promptTokenCount":5,"candidatesTokenCount":3,"totalTokenCount":8}}}\n\n',
    ].join(""),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );

  const result = await executor.collectStreamToResponse(
    response,
    "gemini-2.5-flash",
    "https://example.com",
    { Authorization: "Bearer ag-token" },
    { request: {} }
  );
  const payload = await result.response.json();

  assert.equal(result.response.status, 200);
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.choices[0].message.content, "Hello world");
  assert.equal(payload.choices[0].finish_reason, "stop");
  assert.deepEqual(payload.usage, {
    prompt_tokens: 5,
    completion_tokens: 3,
    total_tokens: 8,
  });
});

test("AntigravityExecutor.refreshCredentials refreshes Google OAuth tokens", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /oauth2\.googleapis\.com\/token$/);
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
    const result = await executor.refreshCredentials(
      { refreshToken: "refresh", projectId: "project-1" },
      null
    );
    assert.deepEqual(result, {
      accessToken: "new-token",
      refreshToken: "new-refresh",
      expiresIn: 3600,
      projectId: "project-1",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
