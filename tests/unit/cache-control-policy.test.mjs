import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  isClaudeCodeClient,
  providerSupportsCaching,
  isDeterministicStrategy,
  shouldPreserveCacheControl,
} from "../../open-sse/utils/cacheControlPolicy.ts";

describe("Cache Control Policy", () => {
  describe("isClaudeCodeClient", () => {
    test("detects claude-code user agent", () => {
      assert.equal(isClaudeCodeClient("claude-code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("claude_code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("Anthropic CLI/1.0"), true);
    });

    test("rejects non-Claude clients", () => {
      assert.equal(isClaudeCodeClient("curl/7.68.0"), false);
      assert.equal(isClaudeCodeClient("OpenAI/1.0"), false);
      assert.equal(isClaudeCodeClient(null), false);
      assert.equal(isClaudeCodeClient(undefined), false);
      assert.equal(isClaudeCodeClient(""), false);
    });

    test("is case-insensitive", () => {
      assert.equal(isClaudeCodeClient("Claude-Code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("CLAUDE-CODE/0.1.0"), true);
    });
  });

  describe("providerSupportsCaching", () => {
    test("detects caching providers", () => {
      assert.equal(providerSupportsCaching("claude"), true);
      assert.equal(providerSupportsCaching("anthropic"), true);
      assert.equal(providerSupportsCaching("zai"), true);
      assert.equal(providerSupportsCaching("qwen"), true);
    });

    test("rejects non-caching providers", () => {
      assert.equal(providerSupportsCaching("openai"), false);
      assert.equal(providerSupportsCaching("gemini"), false);
      assert.equal(providerSupportsCaching("unknown"), false);
      assert.equal(providerSupportsCaching(null), false);
      assert.equal(providerSupportsCaching(undefined), false);
    });

    test("is case-insensitive", () => {
      assert.equal(providerSupportsCaching("Claude"), true);
      assert.equal(providerSupportsCaching("ANTHROPIC"), true);
    });
  });

  describe("isDeterministicStrategy", () => {
    test("identifies deterministic strategies", () => {
      assert.equal(isDeterministicStrategy("priority"), true);
      assert.equal(isDeterministicStrategy("cost-optimized"), true);
    });

    test("identifies non-deterministic strategies", () => {
      assert.equal(isDeterministicStrategy("weighted"), false);
      assert.equal(isDeterministicStrategy("round-robin"), false);
      assert.equal(isDeterministicStrategy("random"), false);
      assert.equal(isDeterministicStrategy("fill-first"), false);
      assert.equal(isDeterministicStrategy("p2c"), false);
      assert.equal(isDeterministicStrategy("least-used"), false);
      assert.equal(isDeterministicStrategy("strict-random"), false);
    });

    test("handles null/undefined", () => {
      assert.equal(isDeterministicStrategy(null), false);
      assert.equal(isDeterministicStrategy(undefined), false);
    });
  });

  describe("shouldPreserveCacheControl", () => {
    test("preserves for single model + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: "claude",
        }),
        true
      );
    });

    test("preserves for combo with priority strategy + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "priority",
          targetProvider: "claude",
        }),
        true
      );
    });

    test("preserves for combo with cost-optimized strategy + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "cost-optimized",
          targetProvider: "anthropic",
        }),
        true
      );
    });

    test("rejects non-Claude clients", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "curl/7.68.0",
          isCombo: false,
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects non-caching providers", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: "openai",
        }),
        false
      );
    });

    test("rejects combo with non-deterministic strategy (weighted)", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "weighted",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with non-deterministic strategy (round-robin)", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "round-robin",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with non-deterministic strategy (random)", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "random",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with fill-first strategy", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "fill-first",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with p2c strategy", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "p2c",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with least-used strategy", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "least-used",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with strict-random strategy", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "strict-random",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects combo with null strategy", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: null,
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects when userAgent is null", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: null,
          isCombo: false,
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects when targetProvider is null", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: null,
        }),
        false
      );
    });
  });
});
