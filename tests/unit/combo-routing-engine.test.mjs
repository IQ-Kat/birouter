import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  getComboFromData,
  getComboModelsFromData,
  validateComboDAG,
  resolveNestedComboModels,
  handleComboChat,
} = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { getComboMetrics, recordComboRequest, resetAllComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { acquire: acquireSemaphore, resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");

function createLog() {
  const entries = [];
  return {
    info: (tag, msg) => entries.push({ level: "info", tag, msg }),
    warn: (tag, msg) => entries.push({ level: "warn", tag, msg }),
    error: (tag, msg) => entries.push({ level: "error", tag, msg }),
    entries,
  };
}

function okResponse(body = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function errorResponse(status, message = `Error ${status}`) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function streamResponse(chunks) {
  return new Response(chunks.join(""), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function capabilityEntry(limitContext) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
  };
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.resetAllPricing();
  clearModelsDevCapabilities();
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  await resetStorage();
});

test.after(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getComboFromData and getComboModelsFromData resolve combos from array and object containers", () => {
  const combos = [
    { name: "alpha", models: ["openai/gpt-4o-mini", { model: "claude/sonnet", weight: 2 }] },
  ];

  const fromArray = getComboFromData("alpha", combos);
  const fromObject = getComboFromData("alpha", { combos });
  const models = getComboModelsFromData("alpha", { combos });

  assert.equal(fromArray.name, "alpha");
  assert.equal(fromObject.name, "alpha");
  assert.deepEqual(models, ["openai/gpt-4o-mini", "claude/sonnet"]);
});

test("validateComboDAG rejects circular references and resolveNestedComboModels expands nested combos", () => {
  const combos = [
    { name: "root", models: ["child-a", "openai/gpt-4o-mini"] },
    { name: "child-a", models: ["child-b", "claude/sonnet"] },
    { name: "child-b", models: ["groq/llama-3.3-70b"] },
  ];

  validateComboDAG("root", combos);
  assert.deepEqual(resolveNestedComboModels(combos[0], combos), [
    "groq/llama-3.3-70b",
    "claude/sonnet",
    "openai/gpt-4o-mini",
  ]);

  assert.throws(
    () =>
      validateComboDAG("loop-a", [
        { name: "loop-a", models: ["loop-b"] },
        { name: "loop-b", models: ["loop-a"] },
      ]),
    /Circular combo reference detected/
  );
});

test("validateComboDAG enforces maximum nesting depth", () => {
  const combos = [
    { name: "c1", models: ["c2"] },
    { name: "c2", models: ["c3"] },
    { name: "c3", models: ["c4"] },
    { name: "c4", models: ["c5"] },
    { name: "c5", models: ["openai/gpt-4o-mini"] },
  ];

  assert.throws(() => validateComboDAG("c1", combos), /Max combo nesting depth/);
});

test("handleComboChat priority strategy defaults to first model and records success metrics", async () => {
  const calls = [];
  const combo = {
    name: "priority-default",
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const metrics = getComboMetrics("priority-default");

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  assert.equal(metrics.totalRequests, 1);
  assert.equal(metrics.totalSuccesses, 1);
  assert.equal(metrics.byModel["openai/gpt-4o-mini"].requests, 1);
  assert.equal(metrics.strategy, "priority");
});

test("handleComboChat weighted strategy selects by weight and falls back in descending weight order", async () => {
  const originalRandom = Math.random;
  const calls = [];

  Math.random = () => 0.95;

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "weighted-selection",
        strategy: "weighted",
        models: [
          { model: "openai/gpt-4o-mini", weight: 1 },
          { model: "claude/sonnet", weight: 9 },
        ],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        if (modelStr === "claude/sonnet") return errorResponse(500, "temporary");
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["claude/sonnet", "openai/gpt-4o-mini"]);
  } finally {
    Math.random = originalRandom;
  }
});

test("handleComboChat weighted strategy falls back to uniform random when all weights are zero", async () => {
  const originalRandom = Math.random;
  const calls = [];
  Math.random = () => 0.75;

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "weighted-zero-fallback",
        strategy: "weighted",
        models: [
          { model: "model-a", weight: 0 },
          { model: "model-b", weight: 0 },
        ],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["model-b"]);
  } finally {
    Math.random = originalRandom;
  }
});

test("handleComboChat random strategy uses shuffled model order", async () => {
  const originalRandom = Math.random;
  const calls = [];
  const sequence = [0.99, 0.0];
  let idx = 0;
  Math.random = () => sequence[idx++] ?? 0;

  try {
    await handleComboChat({
      body: {},
      combo: {
        name: "random-order",
        strategy: "random",
        models: ["model-a", "model-b", "model-c"],
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(calls.length, 1);
    assert.notEqual(calls[0], "model-a");
  } finally {
    Math.random = originalRandom;
  }
});

test("handleComboChat least-used strategy prefers the model with fewer recorded requests", async () => {
  recordComboRequest("least-used-combo", "model-a", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });
  recordComboRequest("least-used-combo", "model-a", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });
  recordComboRequest("least-used-combo", "model-b", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });

  const calls = [];

  await handleComboChat({
    body: {},
    combo: {
      name: "least-used-combo",
      strategy: "least-used",
      models: ["model-a", "model-b", "model-c"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(calls[0], "model-c");
});

test("handleComboChat skips unavailable models and falls through to the next active target", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "availability-skip",
      strategy: "priority",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async (modelStr) => modelStr !== "model-a",
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-b"]);
});

test("handleComboChat falls through empty successful responses and records failure metrics before succeeding", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-fallback",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return okResponse({ choices: [{ message: { content: "" } }] });
      }
      return okResponse({ choices: [{ message: { content: "fallback ok" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const metrics = getComboMetrics("quality-fallback");

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b"]);
  assert.equal(metrics.totalRequests, 2);
  assert.equal(metrics.totalFailures, 1);
  assert.equal(metrics.totalSuccesses, 1);
  assert.equal(metrics.byModel["model-a"].lastStatus, "error");
  assert.equal(metrics.byModel["model-b"].lastStatus, "ok");
});

test("handleComboChat preserves the first failure status but surfaces the last error message", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "all-fail",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      return errorResponse(modelStr === "model-a" ? 500 : 429, `fail:${modelStr}`);
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const payload = await result.json();

  assert.equal(result.status, 500);
  assert.equal(payload.error.message, "fail:model-b");
});

test("handleComboChat round-robin rotates sequentially across requests", async () => {
  const calls = [];
  const combo = {
    name: "rr-sequence",
    strategy: "round-robin",
    models: ["model-a", "model-b"],
    config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
  };

  for (let i = 0; i < 3; i++) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);
  }

  assert.deepEqual(calls, ["model-a", "model-b", "model-a"]);
});

test("combo helpers short-circuit safely for missing combos, cycles, and excessive depth", () => {
  assert.equal(getComboFromData("missing", null), null);
  assert.equal(getComboModelsFromData("missing", { combos: [] }), null);

  assert.doesNotThrow(() =>
    validateComboDAG("ghost", {
      combos: [{ name: "alpha", models: ["openai/gpt-4o-mini"] }],
    })
  );
  assert.doesNotThrow(() => validateComboDAG("empty", [{ name: "empty" }]));

  assert.deepEqual(
    resolveNestedComboModels(
      { name: "loop", models: ["model-a", "model-b"] },
      [],
      new Set(["loop"])
    ),
    []
  );

  assert.deepEqual(
    resolveNestedComboModels(
      { name: "deep", models: ["model-a", { model: "model-b", weight: 2 }] },
      [],
      new Set(),
      99
    ),
    ["model-a", "model-b"]
  );
});

test("handleComboChat accepts binary and Responses-style 200 bodies but falls through malformed success payloads", async () => {
  const binaryResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-binary",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      new Response("binary-payload", {
        status: 200,
        headers: { "content-type": "application/octet-stream" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(binaryResult.ok, true);
  assert.equal(await binaryResult.text(), "binary-payload");

  const responsesResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-responses",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      okResponse({
        output: [{ type: "output_text", text: "done" }],
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(responsesResult.ok, true);

  const calls = [];
  const malformedResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-malformed",
      strategy: "priority",
      models: ["model-a", "model-b", "model-c"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response("", {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      if (modelStr === "model-b") {
        return okResponse({ choices: [{}] });
      }
      return okResponse({ choices: [{ message: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(malformedResult.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b", "model-c"]);
});

test("handleComboChat accepts text-mode SSE payloads as valid non-streaming passthrough responses", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-sse-data",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      new Response('data: {"choices":[{"delta":{"content":"hello"}}]}\n\n', {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.match(await result.text(), /^data:/);
});

test("handleComboChat falls through invalid JSON and embedded 200 error bodies before succeeding", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-invalid-json-and-error",
      strategy: "priority",
      models: ["model-a", "model-b", "model-c"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response("{bad-json", {
          status: 200,
          headers: { "content-type": "text/plain" },
        });
      }
      if (modelStr === "model-b") {
        return new Response(JSON.stringify({ error: { message: "embedded upstream failure" } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse({ choices: [{ delta: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b", "model-c"]);
});

test("handleComboChat returns the earliest retry-after when all priority targets are rate-limited", async () => {
  const soon = new Date(Date.now() + 1_000).toISOString();
  const later = new Date(Date.now() + 5_000).toISOString();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-retry-after",
      strategy: "priority",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body, modelStr) =>
      new Response(
        JSON.stringify({
          error: { message: `limited:${modelStr}` },
          retryAfter: modelStr === "model-a" ? later : soon,
        }),
        {
          status: 429,
          headers: { "content-type": "application/json" },
        }
      ),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: { maxRetries: 0, retryDelayMs: 1 },
    },
    allCombos: null,
  });

  const payload = await result.json();

  assert.equal(result.status, 429);
  assert.match(payload.error.message, /limited:model-b/);
  assert.ok(Number(result.headers.get("Retry-After")) >= 1);
});

test("handleComboChat round-robin returns 503 when no models are configured", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-empty",
      strategy: "round-robin",
      models: [],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run for empty round-robin combos");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    allCombos: null,
  });

  assert.equal(result.status, 503);
  assert.match((await result.json()).error.message, /Round-robin combo has no models/);
});

test("handleComboChat round-robin falls through semaphore timeouts and malformed success payloads", async () => {
  const release = await acquireSemaphore("model-a", { maxConcurrency: 1, timeoutMs: 100 });
  const calls = [];

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "rr-timeout-fallback",
        strategy: "round-robin",
        models: ["model-a", "model-b", "model-c"],
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        if (modelStr === "model-b") {
          return okResponse({ choices: [{}] });
        }
        return okResponse({ choices: [{ message: { content: "rr ok" } }] });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: {
        comboDefaults: {
          concurrencyPerModel: 1,
          queueTimeoutMs: 5,
          maxRetries: 0,
          retryDelayMs: 1,
        },
      },
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["model-b", "model-c"]);
  } finally {
    release();
  }
});

test("handleComboChat round-robin surfaces retry-after metadata after exhausting all models", async () => {
  const sooner = new Date(Date.now() + 1_500).toISOString();
  const later = new Date(Date.now() + 7_000).toISOString();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-retry-after",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body, modelStr) =>
      new Response(
        JSON.stringify({
          error: { message: `rr-limited:${modelStr}` },
          retryAfter: modelStr === "model-a" ? later : sooner,
        }),
        {
          status: 429,
          headers: { "content-type": "application/json" },
        }
      ),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    allCombos: null,
  });

  const payload = await result.json();

  assert.equal(result.status, 429);
  assert.match(payload.error.message, /rr-limited:model-b/);
  assert.ok(Number(result.headers.get("Retry-After")) >= 1);
});

test("handleComboChat round-robin keeps generic 400 errors terminal", async () => {
  const calls = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-terminal-400",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response(JSON.stringify({ error: { message: "generic bad request" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    allCombos: null,
  });

  assert.equal(result.status, 400);
  assert.deepEqual(calls, ["model-a"]);
  assert.match((await result.json()).error.message, /generic bad request/);
});

test("handleComboChat round-robin falls through provider-scoped 400s and returns the final error payload when no target recovers", async () => {
  const calls = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-provider-scoped-400-fallback",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response(
          JSON.stringify({ error: { message: "unsupported message role for this provider" } }),
          {
            status: 400,
            headers: { "content-type": "application/json" },
          }
        );
      }
      return errorResponse(500, "rr-final-fail");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    allCombos: null,
  });

  const payload = await result.json();
  assert.equal(result.status, 400);
  assert.equal(payload.error.message, "rr-final-fail");
  assert.deepEqual(calls, ["model-a", "model-b"]);
});

test("handleComboChat strict-random uses the shared deck without repeating within a cycle", async () => {
  const calls = [];
  const combo = {
    name: "strict-random-deck",
    strategy: "strict-random",
    models: ["model-a", "model-b", "model-c"],
  };

  for (let i = 0; i < 3; i++) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);
  }

  assert.equal(new Set(calls).size, 3);
});

test("handleComboChat cost-optimized orders models by the cheapest configured input price", async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 5, output: 10 },
      "gpt-4o": { input: 1, output: 2 },
      "gpt-4o-nano": { input: 0.1, output: 0.2 },
    },
  });

  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "cost-optimized-combo",
      strategy: "cost-optimized",
      models: ["openai/gpt-4o-mini", "openai/gpt-4o", "openai/gpt-4o-nano"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "openai/gpt-4o-nano");
});

test("handleComboChat context-optimized orders models by the largest synced context window", async () => {
  saveModelsDevCapabilities({
    openai: {
      "gpt-4o-mini": capabilityEntry(128000),
      "gpt-4o": capabilityEntry(64000),
      "gpt-4o-max": capabilityEntry(256000),
    },
  });

  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "context-optimized-combo",
      strategy: "context-optimized",
      models: ["openai/gpt-4o-mini", "openai/gpt-4o", "openai/gpt-4o-max"],
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "openai/gpt-4o-max");
});

test("handleComboChat returns a 503 when every model is unavailable before execution", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "inactive-accounts",
      strategy: "priority",
      models: ["openai/model-a", "openai/model-b"],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run when all models are inactive");
    },
    isModelAvailable: async () => false,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const payload = await result.json();
  assert.equal(result.status, 503);
  assert.equal(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat returns the circuit-breaker unavailable response when all breakers are open", async () => {
  for (const modelStr of ["openai/model-a", "openai/model-b"]) {
    const breaker = getCircuitBreaker(`combo:${modelStr}`, {
      failureThreshold: 1,
      resetTimeout: 60000,
    });
    breaker._onFailure();
  }

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "all-breakers-open",
      strategy: "priority",
      models: ["openai/model-a", "openai/model-b"],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run when all breakers are open");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 503);
  assert.match((await result.json()).error.message, /circuit breakers open/);
});

test("handleComboChat auto strategy honors LKGP after filtering to tool-capable models", async () => {
  await settingsDb.setLKGP("auto-lkgp", "auto-lkgp", "claude");

  const calls = [];
  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Write code using a tool" }],
      tools: [{ type: "function", function: { name: "lookup_weather" } }],
    },
    combo: {
      id: "auto-lkgp",
      name: "auto-lkgp",
      strategy: "auto",
      models: ["openai/gpt-oss-120b", "openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
      autoConfig: { routingStrategy: "lkgp" },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "claude/claude-sonnet-4-6");
});

test("handleComboChat auto strategy falls back to the full pool when tool filtering empties candidates", async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-oss-120b": { input: 5, output: 10 },
    },
    deepseek: {
      reasoner: { input: 0.1, output: 0.2 },
    },
  });

  const calls = [];
  const result = await handleComboChat({
    body: {
      input: [{ role: "user", text: "Summarize this request" }],
      tools: [{ type: "function", function: { name: "unsupported_tool" } }],
    },
    combo: {
      name: "auto-cost-fallback",
      strategy: "auto",
      models: ["openai/gpt-oss-120b", "deepseek/reasoner"],
      autoConfig: { routingStrategy: "cost" },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      intentSimpleMaxWords: 5,
      intentExtraSimpleKeywords: "summarize, brief",
    },
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "deepseek/reasoner");
});

test("handleComboChat context cache protection pins the model and tags tool-call responses", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "assistant",
          content: "cached\n<omniModel>claude/claude-sonnet-4-6</omniModel>",
        },
      ],
    },
    combo: {
      name: "context-cache-pinned",
      strategy: "priority",
      models: ["openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
      context_cache_protection: true,
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse({
        choices: [
          {
            message: {
              role: "assistant",
              tool_calls: [
                {
                  id: "call_1",
                  type: "function",
                  function: { name: "lookup_weather", arguments: "{}" },
                },
              ],
            },
          },
        ],
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const payload = await result.json();
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["claude/claude-sonnet-4-6"]);
  assert.match(
    payload.choices[0].message.content,
    /<omniModel>claude\/claude-sonnet-4-6<\/omniModel>/
  );
});

test("handleComboChat context cache protection sanitizes streamed text tags from client output", async () => {
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "stream it" }] },
    combo: {
      name: "context-cache-stream",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_cache_protection: true,
    },
    handleSingleModel: async () =>
      streamResponse([
        'data: {"choices":[{"index":0,"delta":{"content":"hello world"},"finish_reason":null}]}\n\n',
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
        "data: [DONE]\n\n",
      ]),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const text = await result.text();
  assert.equal(result.ok, true);
  assert.equal(result.headers.get("X-OmniRoute-Model"), "openai/gpt-4o-mini");
  assert.match(text, /hello world/);
  assert.doesNotMatch(text, /<omniModel>/);
});

test("handleComboChat context cache protection injects a hidden tag for tool-call-only streams", async () => {
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "tool only" }] },
    combo: {
      name: "context-cache-tool-stream",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_cache_protection: true,
    },
    handleSingleModel: async () =>
      streamResponse([
        'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_1","type":"function","function":{"name":"lookup","arguments":"{}"}}]},"finish_reason":null}]}\n\n',
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n',
        "data: [DONE]\n\n",
      ]),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const text = await result.text();
  assert.equal(result.ok, true);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.doesNotMatch(text, /<omniModel>/);
});

test("handleComboChat round-robin resolves nested combos and returns inactive when every target is skipped", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-nested-inactive",
      strategy: "round-robin",
      models: ["nested-combo"],
    },
    handleSingleModel: async () => {
      throw new Error("round-robin should not execute when all nested targets are inactive");
    },
    isModelAvailable: async () => false,
    log: createLog(),
    settings: null,
    allCombos: [
      { name: "rr-nested-inactive", models: ["nested-combo"] },
      { name: "nested-combo", models: ["openai/model-a"] },
    ],
  });

  const payload = await result.json();
  assert.equal(result.status, 503);
  assert.equal(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat round-robin returns circuit-breaker unavailable when every model is open", async () => {
  for (const modelStr of ["openai/model-a", "openai/model-b"]) {
    const breaker = getCircuitBreaker(`combo:${modelStr}`, {
      failureThreshold: 1,
      resetTimeout: 60000,
    });
    breaker._onFailure();
  }

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-breakers-open",
      strategy: "round-robin",
      models: ["openai/model-a", "openai/model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () => {
      throw new Error("round-robin should not execute when all breakers are open");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 503);
  assert.match((await result.json()).error.message, /circuit breakers open/);
});
