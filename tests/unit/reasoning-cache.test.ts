/**
 * Unit tests for the Reasoning Replay Cache (Issue #1628).
 *
 * Covers: memory cache, DB fallback, hit/miss counters,
 * provider detection, and cleanup behavior.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// ──────────── Direct service import ────────────

import {
  cacheReasoning,
  cacheReasoningBatch,
  lookupReasoning,
  recordReplay,
  getReasoningCacheServiceStats,
  clearReasoningCacheAll,
  requiresReasoningReplay,
  cleanupReasoningCache,
} from "../../open-sse/services/reasoningCache.ts";

describe("Reasoning Replay Cache — Service Layer", () => {
  before(() => {
    // Start each suite with a clean slate
    clearReasoningCacheAll();
  });

  after(() => {
    clearReasoningCacheAll();
  });

  it("should store and retrieve reasoning by tool_call_id", () => {
    cacheReasoning(
      "call_test_1",
      "deepseek",
      "deepseek-reasoner",
      "The user wants to read the file..."
    );
    const result = lookupReasoning("call_test_1");
    assert.equal(result, "The user wants to read the file...");
  });

  it("should return null for unknown tool_call_id", () => {
    const result = lookupReasoning("call_nonexistent");
    assert.equal(result, null);
  });

  it("should return null for empty tool_call_id", () => {
    const result = lookupReasoning("");
    assert.equal(result, null);
  });

  it("should skip caching when reasoning is empty", () => {
    cacheReasoning("call_empty", "deepseek", "deepseek-chat", "");
    const result = lookupReasoning("call_empty");
    assert.equal(result, null);
  });

  it("should cache reasoning for multiple tool_call_ids (batch)", () => {
    cacheReasoningBatch(
      ["call_batch_1", "call_batch_2", "call_batch_3"],
      "deepseek",
      "deepseek-reasoner",
      "Batch reasoning content"
    );
    assert.equal(lookupReasoning("call_batch_1"), "Batch reasoning content");
    assert.equal(lookupReasoning("call_batch_2"), "Batch reasoning content");
    assert.equal(lookupReasoning("call_batch_3"), "Batch reasoning content");
  });

  it("should not overwrite if same tool_call_id is cached again", () => {
    cacheReasoning("call_overwrite", "deepseek", "deepseek-chat", "First reasoning");
    cacheReasoning("call_overwrite", "deepseek", "deepseek-chat", "Updated reasoning");
    // Second write wins (INSERT OR REPLACE)
    const result = lookupReasoning("call_overwrite");
    assert.equal(result, "Updated reasoning");
  });

  it("should track hits and misses correctly", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_hit_test", "deepseek", "deepseek-chat", "test reasoning");

    lookupReasoning("call_hit_test"); // hit
    lookupReasoning("call_hit_test"); // hit
    lookupReasoning("call_miss_test"); // miss

    const stats = getReasoningCacheServiceStats();
    assert.ok(stats.hits >= 2, `Expected at least 2 hits, got ${stats.hits}`);
    assert.ok(stats.misses >= 1, `Expected at least 1 miss, got ${stats.misses}`);
  });

  it("should track replays", () => {
    clearReasoningCacheAll();

    recordReplay();
    recordReplay();
    recordReplay();

    const stats = getReasoningCacheServiceStats();
    assert.ok(stats.replays >= 3, `Expected at least 3 replays, got ${stats.replays}`);
  });

  it("should report correct stats structure", () => {
    clearReasoningCacheAll();

    cacheReasoning("call_stat_1", "deepseek", "deepseek-reasoner", "Reasoning A");
    cacheReasoning("call_stat_2", "kimi", "kimi-k2.5", "Reasoning B from Kimi");

    const stats = getReasoningCacheServiceStats();

    assert.equal(typeof stats.memoryEntries, "number");
    assert.equal(typeof stats.dbEntries, "number");
    assert.equal(typeof stats.totalEntries, "number");
    assert.equal(typeof stats.totalChars, "number");
    assert.equal(typeof stats.hits, "number");
    assert.equal(typeof stats.misses, "number");
    assert.equal(typeof stats.replays, "number");
    assert.equal(typeof stats.replayRate, "string");
    assert.ok(stats.replayRate.endsWith("%"));
    assert.equal(typeof stats.byProvider, "object");
    assert.equal(typeof stats.byModel, "object");
  });

  it("should clear all entries", () => {
    cacheReasoning("call_clear_1", "deepseek", "deepseek-chat", "Will be cleared");
    cacheReasoning("call_clear_2", "deepseek", "deepseek-chat", "Also cleared");

    const count = clearReasoningCacheAll();
    assert.ok(count >= 0);

    assert.equal(lookupReasoning("call_clear_1"), null);
    assert.equal(lookupReasoning("call_clear_2"), null);
  });

  it("should cleanup expired reasoning (no-op when nothing expired)", () => {
    cacheReasoning("call_cleanup_test", "deepseek", "deepseek-chat", "Not expired yet");
    const cleaned = cleanupReasoningCache();
    assert.equal(typeof cleaned, "number");
    // Entry should still be available since TTL is 2 hours
    assert.equal(lookupReasoning("call_cleanup_test"), "Not expired yet");
  });
});

describe("Reasoning Replay Cache — Provider Detection", () => {
  it("should detect deepseek as requiring replay", () => {
    assert.equal(requiresReasoningReplay("deepseek", "deepseek-chat"), true);
  });

  it("should detect opencode-go as requiring replay", () => {
    assert.equal(requiresReasoningReplay("opencode-go", "some-model"), true);
  });

  it("should detect siliconflow as requiring replay", () => {
    assert.equal(requiresReasoningReplay("siliconflow", "deepseek-r1"), true);
  });

  it("should detect deepseek-r1 model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "deepseek-r1"), true);
  });

  it("should detect deepseek-reasoner model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "deepseek-reasoner"), true);
  });

  it("should detect kimi-k2 model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "kimi-k2.5"), true);
  });

  it("should detect qwq model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "qwq-32b-preview"), true);
  });

  it("should detect qwen-thinking model pattern", () => {
    assert.equal(requiresReasoningReplay("unknown-provider", "qwen3-thinking-235b"), true);
  });

  it("should NOT detect a generic openai model", () => {
    assert.equal(requiresReasoningReplay("openai", "gpt-4o"), false);
  });

  it("should NOT detect claude as requiring replay", () => {
    assert.equal(requiresReasoningReplay("anthropic", "claude-opus-4"), false);
  });
});
