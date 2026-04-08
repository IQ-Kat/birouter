import test from "node:test";
import assert from "node:assert/strict";

const { resolveComboConfig, getDefaultComboConfig } =
  await import("../../open-sse/services/comboConfig.ts");
const { createComboSchema } = await import("../../src/shared/validation/schemas.ts");

test("getDefaultComboConfig returns a fresh copy of the defaults", () => {
  const first = getDefaultComboConfig();
  const second = getDefaultComboConfig();

  assert.notEqual(first, second);
  assert.equal(first.strategy, "priority");
  assert.equal(first.maxRetries, 1);
  assert.equal(first.timeoutMs, 600000);
  assert.equal(first.handoffThreshold, 0.85);
  assert.equal(first.maxMessagesForSummary, 30);
  assert.deepEqual(first.handoffProviders, ["codex"]);

  first.strategy = "weighted";
  assert.equal(second.strategy, "priority");
});

test("resolveComboConfig applies the full cascade from defaults to combo overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        maxRetries: 4,
        timeoutMs: 45000,
      },
    },
    {
      comboDefaults: {
        strategy: "round-robin",
        timeoutMs: 120000,
      },
      providerOverrides: {
        openai: {
          timeoutMs: 60000,
          retryDelayMs: 500,
        },
      },
    },
    "openai"
  );

  assert.equal(result.strategy, "round-robin");
  assert.equal(result.retryDelayMs, 500);
  assert.equal(result.timeoutMs, 45000);
  assert.equal(result.maxRetries, 4);
  assert.equal(result.healthCheckEnabled, true);
});

test("resolveComboConfig ignores null and undefined overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        timeoutMs: null,
        trackMetrics: false,
      },
    },
    {
      comboDefaults: {
        timeoutMs: undefined,
        queueTimeoutMs: 15000,
      },
      providerOverrides: {
        openai: {
          strategy: null,
          concurrencyPerModel: 9,
        },
      },
    },
    "openai"
  );

  assert.equal(result.timeoutMs, 600000);
  assert.equal(result.queueTimeoutMs, 15000);
  assert.equal(result.concurrencyPerModel, 9);
  assert.equal(result.trackMetrics, false);
  assert.equal(result.strategy, "priority");
});

test("resolveComboConfig preserves explicit empty handoffProviders overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        handoffProviders: [],
      },
    },
    {
      comboDefaults: {
        handoffProviders: ["codex"],
      },
    }
  );

  assert.deepEqual(result.handoffProviders, []);
});

test("resolveComboConfig skips provider overrides when provider is absent", () => {
  const result = resolveComboConfig(
    { config: {} },
    {
      comboDefaults: { strategy: "random" },
      providerOverrides: {
        openai: { strategy: "weighted" },
      },
    }
  );

  assert.equal(result.strategy, "random");
});

test("resolveComboConfig tolerates invalid or missing inputs and falls back to defaults", () => {
  assert.deepEqual(resolveComboConfig(null, null, "openai"), getDefaultComboConfig());
  assert.deepEqual(resolveComboConfig({}, { comboDefaults: null }, null), getDefaultComboConfig());
});

test("createComboSchema accepts context-relay strategy with handoff config", () => {
  const parsed = createComboSchema.parse({
    name: "codex-relay",
    models: ["codex/gpt-5.4"],
    strategy: "context-relay",
    config: {
      handoffThreshold: 0.85,
      maxMessagesForSummary: 24,
      handoffModel: "",
    },
  });

  assert.equal(parsed.strategy, "context-relay");
  assert.equal(parsed.config.handoffThreshold, 0.85);
  assert.equal(parsed.config.maxMessagesForSummary, 24);
});
