import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-sanitization-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createMemory } = await import("../../src/lib/memory/store.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const core = await import("../../src/lib/db/core.ts");

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

function buildUpstreamResponse(stream) {
  if (stream) {
    return new Response(
      'data: {"id":"chatcmpl-stream","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":"ok"}}]}\n\ndata: [DONE]\n\n',
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
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function ensureLegacyMemoryTable() {
  const db = core.getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS memory (
      id TEXT PRIMARY KEY,
      apiKeyId TEXT NOT NULL,
      sessionId TEXT,
      type TEXT NOT NULL,
      key TEXT,
      content TEXT NOT NULL,
      metadata TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      expiresAt TEXT
    )
  `);
}

async function invokeChatCore({
  body,
  accept = "application/json",
  provider = "openai",
  model = "gpt-4o-mini",
  endpoint = "/v1/chat/completions",
  credentials = { apiKey: "sk-test", providerSpecificData: {} },
  apiKeyInfo = null,
  userAgent = "unit-test",
  responseFactory,
} = {}) {
  const originalFetch = globalThis.fetch;
  const calls = [];
  const resolvedStream =
    body?.stream === true ||
    (body?.stream === undefined && String(accept).toLowerCase().includes("text/event-stream"));

  globalThis.fetch = async (url, init = {}) => {
    const parsedBody = init.body ? JSON.parse(String(init.body)) : null;
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: parsedBody,
    };
    calls.push(captured);
    return responseFactory ? responseFactory(captured) : buildUpstreamResponse(resolvedStream);
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: structuredClone(credentials),
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept }),
      },
      apiKeyInfo,
      userAgent,
    });

    return { result, call: calls.at(-1), calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(() => {
  try {
    const db = core.getDbInstance();
    db.close();
  } catch {}

  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore sanitization normalizes max_output_tokens into max_tokens", async () => {
  const copied = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      max_output_tokens: 0,
      messages: [{ role: "user", content: "hello" }],
    },
  });
  const preserved = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      max_output_tokens: 64,
      max_tokens: 7,
      messages: [{ role: "user", content: "hello" }],
    },
  });
  const untouched = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hello" }],
    },
  });

  assert.equal(copied.call.body.max_tokens, 0);
  assert.equal("max_output_tokens" in copied.call.body, false);
  assert.equal(preserved.call.body.max_tokens, 7);
  assert.equal("max_output_tokens" in preserved.call.body, false);
  assert.equal("max_tokens" in untouched.call.body, false);
});

test("chatCore sanitization strips empty message and input names and filters empty tool names", async () => {
  const { call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "hello", name: "" },
        { role: "assistant", content: "world", name: "valid-name" },
      ],
      input: [
        { role: "user", content: "input-1", name: "" },
        { role: "user", content: "input-2", name: "still-valid" },
      ],
      tools: [
        { type: "function", function: { name: "lookup_weather", parameters: { type: "object" } } },
        { type: "function", function: { name: "", parameters: { type: "object" } } },
        { type: "function", function: { name: "   ", parameters: { type: "object" } } },
        { name: "anthropic_lookup", input_schema: { type: "object" } },
        { name: "", input_schema: { type: "object" } },
      ],
    },
  });

  assert.equal(call.body.messages[0].name, undefined);
  assert.equal(call.body.messages[1].name, "valid-name");
  assert.equal(call.body.input[0].name, undefined);
  assert.equal(call.body.input[1].name, "still-valid");
  assert.equal(call.body.tools.length, 2);
  assert.equal(call.body.tools[0].function.name, "lookup_weather");
  assert.equal(call.body.tools[1].function.name, "anthropic_lookup");
});

test("chatCore sanitization normalizes mixed content blocks and removes unsupported or empty ones", async () => {
  const { call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "keep me" },
            { type: "text", text: "" },
            { type: "image_url", image_url: { url: "https://example.com/image.png" } },
            { type: "image", source: { type: "base64", media_type: "image/png", data: "abc" } },
            { type: "file_url", file_url: { url: "data:text/plain;base64,SGk=" } },
            { type: "file", file: { name: "README.md", content: "Read me please." } },
            { type: "file", file: { name: "blob.bin", data: "AAEC" } },
            { type: "document", name: "notes.txt", text: "Meeting notes" },
            { type: "document", document: { url: "data:text/plain;base64,SGVsbG8=" } },
            { type: "tool_result", tool_use_id: "tool-1", content: "done" },
            {
              type: "tool_result",
              tool_use_id: "tool-2",
              content: [{ type: "text", text: "structured result" }],
            },
            { type: "unknown_block", value: "drop me" },
          ],
        },
      ],
    },
  });

  const content = call.body.messages[0].content;
  const textBlocks = content.filter((block) => block.type === "text");

  assert.equal(
    content.some((block) => block.type === "text" && block.text === ""),
    false
  );
  assert.equal(
    content.some((block) => block.type === "unknown_block"),
    false
  );
  assert.equal(
    content.some((block) => block.type === "image_url"),
    true
  );
  assert.equal(
    content.some((block) => block.type === "image"),
    true
  );
  assert.equal(
    content.some(
      (block) => block.type === "file_url" && block.file_url.url.startsWith("data:text/plain")
    ),
    true
  );
  assert.equal(
    content.some((block) => block.type === "file" && block.file?.data === "AAEC"),
    true
  );
  assert.equal(
    content.some((block) => block.type === "document" && block.document?.url.startsWith("data:")),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[README.md]\nRead me please."),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[notes.txt]\nMeeting notes"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[Tool Result: tool-1]\ndone"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[Tool Result: tool-2]\nstructured result"),
    true
  );
});

test("chatCore resolves stream mode from body.stream and Accept header", async () => {
  const explicitTrue = await invokeChatCore({
    accept: "application/json",
    body: { model: "gpt-4o-mini", stream: true, messages: [{ role: "user", content: "hello" }] },
  });
  const explicitFalse = await invokeChatCore({
    accept: "text/event-stream",
    body: { model: "gpt-4o-mini", stream: false, messages: [{ role: "user", content: "hello" }] },
  });
  const acceptDriven = await invokeChatCore({
    accept: "text/event-stream",
    body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hello" }] },
  });
  const jsonDefault = await invokeChatCore({
    accept: "application/json",
    body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hello" }] },
  });

  assert.equal(explicitTrue.call.headers.Accept, "text/event-stream");
  assert.equal(explicitFalse.call.headers.Accept, undefined);
  assert.equal(acceptDriven.call.headers.Accept, "text/event-stream");
  assert.equal(jsonDefault.call.headers.Accept, undefined);
});

test("chatCore injects memories when enabled and memories are found", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();
  ensureLegacyMemoryTable();

  const apiKeyId = `key-memory-${Date.now()}`;
  await createMemory({
    apiKeyId,
    sessionId: "session-1",
    type: "factual",
    key: "preference",
    content: "User prefers concise Rust examples.",
    metadata: {},
    expiresAt: null,
  });

  const { call } = await invokeChatCore({
    apiKeyInfo: { id: apiKeyId, name: "Memory Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Give me a snippet." }],
    },
  });

  assert.equal(call.body.messages[0].role, "system");
  assert.match(
    call.body.messages[0].content,
    /Memory context: User prefers concise Rust examples\./
  );
  assert.equal(call.body.messages[1].role, "user");
});

test("chatCore skips memory injection when memory is disabled or apiKeyInfo is missing", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: false,
    memoryMaxTokens: 0,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const disabled = await invokeChatCore({
    apiKeyInfo: { id: `key-disabled-${Date.now()}`, name: "Disabled Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
    },
  });
  const noApiKey = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
    },
  });

  assert.equal(disabled.call.body.messages[0].role, "user");
  assert.equal(disabled.call.body.messages[0].content, "Hello");
  assert.equal(noApiKey.call.body.messages[0].role, "user");
  assert.equal(noApiKey.call.body.messages[0].content, "Hello");
});

test("chatCore skips memory injection when shouldInjectMemory returns false for empty message lists", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const { call } = await invokeChatCore({
    apiKeyInfo: { id: `key-empty-${Date.now()}`, name: "Empty Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [],
    },
  });

  assert.deepEqual(call.body.messages, []);
});
