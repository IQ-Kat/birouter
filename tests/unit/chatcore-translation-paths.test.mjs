import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-translation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { invalidateCacheControlSettingsCache } =
  await import("../../src/lib/cacheControlSettings.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { register, getRequestTranslator } = await import("../../open-sse/translator/registry.ts");

const originalFetch = globalThis.fetch;
const originalResponsesToOpenAI = getRequestTranslator(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildOpenAIResponse(stream, text = "ok") {
  if (stream) {
    return new Response(
      `data: ${JSON.stringify({
        id: "chatcmpl-stream",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant", content: text } }],
      })}\n\ndata: [DONE]\n\n`,
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      id: "chatcmpl-json",
      object: "chat.completion",
      model: "gpt-4o-mini",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 4,
        completion_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildClaudeResponse(stream, text = "ok") {
  if (stream) {
    return new Response(
      [
        "event: message_start",
        `data: ${JSON.stringify({
          type: "message_start",
          message: {
            id: "msg_stream",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-6",
            usage: { input_tokens: 12, output_tokens: 0 },
          },
        })}`,
        "",
        "event: content_block_start",
        `data: ${JSON.stringify({
          type: "content_block_start",
          index: 0,
          content_block: { type: "text", text: "" },
        })}`,
        "",
        "event: content_block_delta",
        `data: ${JSON.stringify({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text },
        })}`,
        "",
        "event: message_delta",
        `data: ${JSON.stringify({
          type: "message_delta",
          delta: { stop_reason: "end_turn" },
          usage: { output_tokens: 3 },
        })}`,
        "",
        "event: message_stop",
        `data: ${JSON.stringify({ type: "message_stop" })}`,
        "",
      ].join("\n"),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      id: "msg_json",
      type: "message",
      role: "assistant",
      model: "claude-sonnet-4-6",
      content: [{ type: "text", text }],
      stop_reason: "end_turn",
      usage: {
        input_tokens: 12,
        output_tokens: 3,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildResponsesResponse(text = "ok") {
  return new Response(
    JSON.stringify({
      id: "resp_123",
      object: "response",
      status: "completed",
      model: "gpt-5.1-codex",
      output: [
        {
          id: "msg_123",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: {
        input_tokens: 4,
        output_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function hasCacheControl(value) {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) {
    return value.some((item) => hasCacheControl(item));
  }
  if (Object.hasOwn(value, "cache_control")) return true;
  return Object.values(value).some((item) => hasCacheControl(item));
}

function collectTextBlocks(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.flatMap((message) =>
    Array.isArray(message.content) ? message.content.filter((block) => block?.type === "text") : []
  );
}

async function resetStorage() {
  register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, originalResponsesToOpenAI, null);
  invalidateCacheControlSettingsCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function invokeChatCore({
  body,
  provider = "openai",
  model = "gpt-4o-mini",
  endpoint = "/v1/chat/completions",
  accept = "application/json",
  userAgent = "unit-test",
  credentials,
  apiKeyInfo = null,
  responseFormat = "openai",
  responseFactory,
  isCombo = false,
  comboStrategy = null,
} = {}) {
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(captured);

    if (responseFactory) {
      return responseFactory(captured, calls);
    }

    const upstreamStream = String(headers.accept || "")
      .toLowerCase()
      .includes("text/event-stream");
    if (responseFormat === "claude") return buildClaudeResponse(upstreamStream);
    if (responseFormat === "openai-responses") return buildResponsesResponse();
    return buildOpenAIResponse(upstreamStream);
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: credentials || {
        apiKey: "sk-test",
        providerSpecificData: {},
      },
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept }),
      },
      apiKeyInfo,
      userAgent,
      isCombo,
      comboStrategy,
    });

    return { result, calls, call: calls.at(-1) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore keeps Responses-native Codex payloads in native passthrough mode", async () => {
  const { call, result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.1-codex",
    endpoint: "/v1/responses",
    credentials: { accessToken: "codex-token", providerSpecificData: {} },
    body: {
      model: "gpt-5.1-codex",
      input: "ship it",
      instructions: "custom system prompt",
      store: true,
      metadata: { source: "codex-client" },
      stream: false,
    },
    responseFormat: "openai-responses",
  });

  assert.equal(result.success, true);
  assert.match(call.url, /\/responses$/);
  assert.equal(call.body.input, "ship it");
  assert.equal(call.body.instructions, "custom system prompt");
  assert.equal(call.body.store, false);
  assert.deepEqual(call.body.metadata, { source: "codex-client" });
  assert.equal("messages" in call.body, false);
});

test("chatCore builds Claude Code-compatible upstream requests for CC providers", async () => {
  const { call, result } = await invokeChatCore({
    provider: "anthropic-compatible-cc-test",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/chat/completions",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1/messages?beta=true",
        chatPath: "/v1/messages?beta=true",
      },
    },
    body: {
      model: "claude-sonnet-4-6",
      stream: false,
      messages: [{ role: "user", content: "Ping" }],
    },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.equal(call.headers.Accept ?? call.headers.accept, "text/event-stream");
  assert.equal(call.body.stream, true);
  assert.equal(call.body.context_management.edits[0].type, "clear_thinking_20251015");
  assert.equal(typeof call.body.metadata.user_id, "string");
  assert.equal(call.body.messages[0].role, "user");
  assert.equal(call.body.messages[0].content[0].text, "Ping");
});

test("chatCore preserves cache_control automatically for Claude Code single-model requests", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "auto" });
  invalidateCacheControlSettingsCache();

  const claudeBody = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
      },
      {
        role: "assistant",
        content: [{ type: "text", text: "a1", cache_control: { type: "ephemeral", ttl: "10m" } }],
      },
      { role: "user", content: [{ type: "text", text: "u2" }] },
    ],
    tools: [
      {
        name: "lookup_weather",
        description: "Fetch weather",
        input_schema: { type: "object" },
        cache_control: { type: "ephemeral", ttl: "30m" },
      },
    ],
  };

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: claudeBody,
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
  });

  assert.equal(hasCacheControl(call.body), true);
  assert.deepEqual(call.body.system[0].cache_control, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(call.body.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(call.body.tools[0].cache_control, { type: "ephemeral", ttl: "30m" });
});

test("chatCore auto cache policy becomes false for nondeterministic combos", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "auto" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [{ role: "user", content: [{ type: "text", text: "u1" }] }],
    },
    userAgent: "Claude-Code/1.0.0",
    isCombo: true,
    comboStrategy: "latency-optimized",
    responseFormat: "claude",
  });

  assert.equal(call.body.system[0].text.includes("You are Claude Code"), true);
  assert.equal(
    call.body.system.some((block) => block.cache_control?.ttl === "5m"),
    false
  );
  assert.equal(call.body.system.at(-1).cache_control?.ttl, "1h");
});

test("chatCore always-preserve mode keeps cache_control even without Claude Code user-agent", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "always" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [{ role: "user", content: [{ type: "text", text: "u1" }] }],
    },
    responseFormat: "claude",
  });

  assert.equal(hasCacheControl(call.body), true);
  assert.deepEqual(call.body.system[0].cache_control, { type: "ephemeral", ttl: "5m" });
});

test("chatCore disables raw Claude passthrough when cache preservation is off and normalizes through OpenAI", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "never" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
        },
      ],
    },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
  });

  assert.equal(call.body.system[0].text.includes("You are Claude Code"), true);
  assert.equal(call.body.system.at(-1).cache_control?.ttl, "1h");
  assert.equal(call.body.messages[0].content[0].cache_control, undefined);
  assert.equal("_disableToolPrefix" in call.body, false);
});

test("chatCore default translation converts Claude requests to OpenAI and strips cache markers for non-Claude providers", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/messages",
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
        },
      ],
    },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "openai",
  });

  assert.equal(call.body.model, "gpt-4o-mini");
  assert.equal(Array.isArray(call.body.messages), true);
  assert.equal(call.body.messages[0].role, "system");
  assert.equal(JSON.stringify(call.body).includes("cache_control"), false);
});

test("chatCore sets Claude tool prefix disabling, strips empty Anthropic text blocks, and cleans helper flags", async () => {
  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/chat/completions",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "ignored-client-model",
      _toolNameMap: new Map([["proxy_Bash", "Bash"]]),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "" },
            { type: "text", text: "hello" },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "Bash",
            description: "Execute bash",
            parameters: { type: "object" },
          },
        },
      ],
    },
    responseFormat: "claude",
  });

  assert.equal(call.body.model, "claude-sonnet-4-6");
  assert.equal(call.body.tools[0].name, "Bash");
  assert.equal(call.body.tools[0].name.startsWith("proxy_"), false);
  assert.equal(call.body._toolNameMap, undefined);
  assert.equal(call.body._disableToolPrefix, undefined);
  assert.deepEqual(
    collectTextBlocks(call.body.messages).map((block) => block.text),
    ["hello"]
  );
});

test("chatCore strips unsupported reasoning params and caps provider token fields", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "o3",
    endpoint: "/v1/chat/completions",
    body: {
      model: "o3",
      messages: [{ role: "user", content: "hello" }],
      temperature: 0.7,
      presence_penalty: 1,
      max_tokens: 99999,
      max_completion_tokens: 77777,
    },
    responseFormat: "openai",
  });

  assert.equal(call.body.temperature, undefined);
  assert.equal(call.body.presence_penalty, undefined);
  assert.equal(call.body.max_tokens, 16384);
  assert.equal(call.body.max_completion_tokens, 16384);
});

test("chatCore surfaces translation errors with explicit status codes", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      const error = new Error("responses translator rejected the payload");
      error.statusCode = 409;
      throw error;
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 409);
  assert.equal(result.error, "responses translator rejected the payload");
});

test("chatCore surfaces typed translation errors with the declared error type", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      const error = new Error("typed translator failure");
      error.statusCode = 422;
      error.errorType = "unsupported_feature";
      throw error;
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 422);

  const payload = await result.response.json();
  assert.equal(payload.error.type, "unsupported_feature");
  assert.equal(payload.error.code, "unsupported_feature");
});

test("chatCore returns 500 when translation throws a generic error", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      throw new Error("unexpected translator crash");
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 500);
  assert.equal(result.error, "unexpected translator crash");
});

test("chatCore uses the native executor when no upstream proxy mode is enabled", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
  });

  assert.match(call.url, /^https:\/\/api\.openai\.com\/v1\/chat\/completions$/);
});

test("chatCore routes providers through CLIProxyAPI in passthrough mode", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "qoder",
    mode: "cliproxyapi",
    enabled: true,
  });

  const { call } = await invokeChatCore({
    provider: "qoder",
    model: "qoder-rome-30ba3b",
    credentials: { apiKey: "qoder-token", providerSpecificData: {} },
    body: {
      model: "qoder-rome-30ba3b",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
  });

  assert.match(call.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
  assert.equal(call.headers.Authorization ?? call.headers.authorization, "Bearer qoder-token");
});

test("chatCore fallback proxy mode retries through CLIProxyAPI after retryable native failures", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "github",
    mode: "fallback",
    enabled: true,
  });

  const { calls, result } = await invokeChatCore({
    provider: "github",
    model: "gpt-4o",
    credentials: { accessToken: "gh-token", providerSpecificData: {} },
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
    responseFactory(captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(JSON.stringify({ error: { message: "native failed" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      assert.match(captured.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
      return buildOpenAIResponse(false, "retried");
    },
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /^https:\/\/api\.githubcopilot\.com\/chat\/completions$/);
  assert.match(calls[1].url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
});
