import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  getEffectiveMode,
  applyCompression,
} from "../../open-sse/services/compression/strategySelector.ts";
import { applyLiteCompression } from "../../open-sse/services/compression/lite.ts";
import {
  createCompressionStats,
  estimateCompressionTokens,
} from "../../open-sse/services/compression/stats.ts";
import type { CompressionConfig } from "../../open-sse/services/compression/types.ts";

const baseConfig: CompressionConfig = {
  enabled: true,
  defaultMode: "lite",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
};

describe("Full Compression Pipeline", () => {
  it("end-to-end: lite mode compresses whitespace and tracks stats", () => {
    const body = {
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "system", content: "You are helpful." },
        { role: "user", content: "hello\n\n\n\nworld" },
      ],
    };

    // Step 1: Select strategy
    const mode = selectCompressionStrategy(baseConfig, null, 100);
    assert.equal(mode, "lite");

    // Step 2: Apply compression
    const result = applyCompression(body, mode);
    assert.equal(result.compressed, true);
    assert.ok(result.stats);

    // Step 3: Verify stats
    assert.ok(result.stats!.originalTokens > 0);
    assert.ok(result.stats!.compressedTokens > 0);
    assert.ok(result.stats!.compressedTokens <= result.stats!.originalTokens);
    assert.ok(result.stats!.savingsPercent >= 0);
    assert.equal(result.stats!.mode, "lite");
  });

  it("end-to-end: off mode returns unchanged body", () => {
    const body = { messages: [{ role: "user", content: "test" }] };
    const offConfig = { ...baseConfig, enabled: false };
    const mode = selectCompressionStrategy(offConfig, null, 100);
    assert.equal(mode, "off");

    const result = applyCompression(body, mode);
    assert.equal(result.compressed, false);
    assert.equal(result.stats, null);
  });

  it("end-to-end: combo override selects lite for specific combo", () => {
    const config: CompressionConfig = {
      ...baseConfig,
      defaultMode: "off" as const,
      comboOverrides: { "my-combo": "lite" as const },
    };
    const body = { messages: [{ role: "user", content: "test\n\n\n\nmessage" }] };

    const mode = selectCompressionStrategy(config, "my-combo", 100);
    assert.equal(mode, "lite");

    const result = applyCompression(body, mode);
    assert.equal(result.compressed, true);
  });

  it("end-to-end: auto-trigger activates compression", () => {
    const config: CompressionConfig = {
      ...baseConfig,
      defaultMode: "off" as const,
      autoTriggerTokens: 50,
    };
    const body = { messages: [{ role: "user", content: "x".repeat(1000) }] };

    // Below threshold → off
    const mode1 = getEffectiveMode(config, null, 10);
    assert.equal(mode1, "off");

    // Above threshold → lite
    const mode2 = getEffectiveMode(config, null, 100);
    assert.equal(mode2, "lite");
  });

  it("lite compression + stats pipeline works together", () => {
    const body = {
      messages: [
        { role: "system", content: "Be helpful." },
        { role: "system", content: "Be helpful." },
        { role: "user", content: "hello\n\n\n\nworld" },
        { role: "user", content: "hello\n\n\n\nworld" },
      ],
    };

    const result = applyLiteCompression(body);
    assert.equal(result.compressed, true);
    assert.ok(result.stats);
    assert.ok(result.stats.savingsPercent > 0);
    assert.ok(result.stats.techniquesUsed.length >= 1);
  });

  it("token estimation is consistent", () => {
    const text = "hello world this is a test";
    const tokens = estimateCompressionTokens(text);
    assert.equal(tokens, Math.ceil(text.length / 4));

    const obj = { messages: [{ role: "user", content: text }] };
    const objTokens = estimateCompressionTokens(obj);
    assert.equal(objTokens, Math.ceil(JSON.stringify(obj).length / 4));
  });
});
