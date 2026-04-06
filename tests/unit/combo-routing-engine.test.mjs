import test from "node:test";
import assert from "node:assert/strict";

const {
  getComboFromData,
  getComboModelsFromData,
  validateComboDAG,
  resolveNestedComboModels,
  handleComboChat,
} = await import("../../open-sse/services/combo.ts");
const { getComboMetrics, recordComboRequest, resetAllComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { acquire: acquireSemaphore, resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

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

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
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
