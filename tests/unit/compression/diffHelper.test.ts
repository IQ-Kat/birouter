import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCompressionPreviewDiff } from "../../../open-sse/services/compression/diffHelper.ts";

describe("compression preview diff", () => {
  it("reports diff segments, preserved blocks, rules, validation warnings, and fallback status", () => {
    const original = "Please use `exact_token` and the API.";
    const compressed = "Use `exact_token` and API.";
    const preview = buildCompressionPreviewDiff(original, compressed, {
      originalTokens: 10,
      compressedTokens: 6,
      savingsPercent: 40,
      techniquesUsed: ["caveman-rules"],
      mode: "standard",
      timestamp: Date.now(),
      rulesApplied: ["polite_framing", "articles"],
      validationWarnings: ["sample warning"],
    });

    assert.ok(preview.segments.some((segment) => segment.type === "removed"));
    assert.ok(preview.preservedBlocks.some((block) => block.kind === "inline_code"));
    assert.deepEqual(preview.ruleRemovals, ["polite_framing", "articles"]);
    assert.match(preview.validationWarnings.join("\n"), /sample warning/);
    assert.equal(preview.fallbackApplied, false);
  });

  it("reports validation errors for protected content loss", () => {
    const preview = buildCompressionPreviewDiff(
      "Use `exact_token` and https://example.com.",
      "Use token.",
      null
    );
    assert.equal(preview.fallbackApplied, true);
    assert.ok(preview.validationErrors.length >= 2);
  });
});
