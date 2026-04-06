import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.mjs";

const harness = await createChatPipelineHarness("memory-pipeline");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  memoryStore,
  memoryTools,
  resetStorage,
  seedApiKey,
  seedConnection,
  settingsDb,
  waitFor,
} = harness;

const { createMemory, listMemories } = memoryStore;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function enableMemory(maxTokens = 400) {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: maxTokens,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
}

test("first request proceeds without injected context when the store is empty", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-memory-empty" });
  const apiKey = await seedApiKey();
  await enableMemory();

  const fetchCalls = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchCalls.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("No memory yet");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "First turn" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].messages[0].role, "user");
  assert.equal(fetchCalls[0].messages[0].content, "First turn");
});

test("successful responses extract facts and persist them as memories", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-extract" });
  const apiKey = await seedApiKey();
  await enableMemory();

  globalThis.fetch = async () =>
    buildOpenAIResponse("I prefer concise answers. I usually answer in bullet points.");

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      headers: { "x-omniroute-session-id": "session-extract" },
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Remember my preferences" }],
      },
    })
  );

  const memories = await waitFor(async () => {
    const rows = await listMemories({ apiKeyId: apiKey.id });
    return rows.length >= 2 ? rows : null;
  });

  assert.equal(response.status, 200);
  assert.ok(memories, "expected extracted memories to be stored");
  assert.ok(memories.some((memory) => /concise answers/i.test(memory.content)));
  assert.ok(memories.some((memory) => /bullet points/i.test(memory.content)));
  assert.ok(memories.every((memory) => memory.sessionId === "session-extract"));
});

test("later requests inject retrieved memories into upstream messages", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-inject" });
  const apiKey = await seedApiKey();
  await enableMemory();

  await createMemory({
    apiKeyId: apiKey.id,
    sessionId: "session-inject",
    type: "factual",
    key: "preference:concise",
    content: "User prefers concise answers.",
    metadata: {},
    expiresAt: null,
  });

  const fetchCalls = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchCalls.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Memory injected");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      headers: { "x-omniroute-session-id": "session-inject" },
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "What do you remember?" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].messages[0].role, "system");
  assert.match(fetchCalls[0].messages[0].content, /User prefers concise answers/);
});

test("memory search ranks query-relevant memories first", async () => {
  const apiKey = await seedApiKey();

  await memoryTools.omniroute_memory_add.handler({
    apiKeyId: apiKey.id,
    sessionId: "search",
    type: "factual",
    key: "pref:language",
    content: "The user writes TypeScript services every day.",
    metadata: {},
  });
  await memoryTools.omniroute_memory_add.handler({
    apiKeyId: apiKey.id,
    sessionId: "search",
    type: "factual",
    key: "pref:hobby",
    content: "The user enjoys gardening on weekends.",
    metadata: {},
  });
  await memoryTools.omniroute_memory_add.handler({
    apiKeyId: apiKey.id,
    sessionId: "search",
    type: "factual",
    key: "pref:stack",
    content: "TypeScript and Node.js are the preferred backend stack.",
    metadata: {},
  });

  const result = await memoryTools.omniroute_memory_search.handler({
    apiKeyId: apiKey.id,
    query: "typescript backend",
    limit: 2,
  });

  assert.equal(result.success, true);
  assert.equal(result.data.count, 2);
  assert.match(result.data.memories[0].content, /TypeScript/i);
  assert.ok(result.data.memories.every((memory) => /TypeScript|backend/i.test(memory.content)));
});

test("memory injection respects the configured token budget", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-budget" });
  const apiKey = await seedApiKey();
  await enableMemory(20);

  await createMemory({
    apiKeyId: apiKey.id,
    sessionId: "budget",
    type: "factual",
    key: "older",
    content: "Older preference that should be trimmed when the context budget is tight.",
    metadata: {},
    expiresAt: null,
  });
  await new Promise((resolve) => setTimeout(resolve, 10));
  await createMemory({
    apiKeyId: apiKey.id,
    sessionId: "budget",
    type: "factual",
    key: "newer",
    content: "Newest preference should fit first.",
    metadata: {},
    expiresAt: null,
  });

  const fetchCalls = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchCalls.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Budget respected");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Use only the relevant memory." }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].messages[0].content, /Newest preference should fit first/);
  assert.doesNotMatch(fetchCalls[0].messages[0].content, /Older preference that should be trimmed/);
});

test("disabled memory skips both extraction and injection", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-memory-off" });
  const apiKey = await seedApiKey();
  await settingsDb.updateSettings({
    memoryEnabled: false,
    memoryMaxTokens: 400,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });

  const fetchCalls = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchCalls.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("I prefer dark mode.");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "This should not be remembered." }],
      },
    })
  );

  const memories = await waitFor(async () => {
    const rows = await listMemories({ apiKeyId: apiKey.id });
    return rows.length > 0 ? rows : [];
  });

  assert.equal(response.status, 200);
  assert.equal(fetchCalls[0].messages[0].role, "user");
  assert.deepEqual(memories, []);
});

test("memory clear removes all stored memories for an API key", async () => {
  const apiKey = await seedApiKey();

  await memoryTools.omniroute_memory_add.handler({
    apiKeyId: apiKey.id,
    sessionId: "clear",
    type: "factual",
    key: "pref:one",
    content: "First memory",
    metadata: {},
  });
  await memoryTools.omniroute_memory_add.handler({
    apiKeyId: apiKey.id,
    sessionId: "clear",
    type: "episodic",
    key: "event:two",
    content: "Second memory",
    metadata: {},
  });

  const cleared = await memoryTools.omniroute_memory_clear.handler({
    apiKeyId: apiKey.id,
  });
  const remaining = await listMemories({ apiKeyId: apiKey.id });

  assert.equal(cleared.success, true);
  assert.equal(cleared.data.deletedCount, 2);
  assert.equal(remaining.length, 0);
});

test("extracted memories remain isolated by session id", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-session-memory" });
  const apiKey = await seedApiKey();
  await enableMemory();

  globalThis.fetch = async () => buildOpenAIResponse("I prefer tea.");
  await handleChat(
    buildRequest({
      authKey: apiKey.key,
      headers: { "x-omniroute-session-id": "session-a" },
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Remember drink A" }],
      },
    })
  );

  globalThis.fetch = async () => buildOpenAIResponse("I prefer coffee.");
  await handleChat(
    buildRequest({
      authKey: apiKey.key,
      headers: { "x-omniroute-session-id": "session-b" },
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Remember drink B" }],
      },
    })
  );

  const sessionAMemories = await waitFor(async () => {
    const rows = await listMemories({ apiKeyId: apiKey.id, sessionId: "session-a" });
    return rows.length > 0 ? rows : null;
  });
  const sessionBMemories = await waitFor(async () => {
    const rows = await listMemories({ apiKeyId: apiKey.id, sessionId: "session-b" });
    return rows.length > 0 ? rows : null;
  });

  assert.ok(sessionAMemories, "expected session A memories");
  assert.ok(sessionBMemories, "expected session B memories");
  assert.ok(sessionAMemories.every((memory) => /tea/i.test(memory.content)));
  assert.ok(sessionBMemories.every((memory) => /coffee/i.test(memory.content)));
});
