import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  stripModelTags,
  injectModelTag,
  extractPinnedModel,
} from "../../open-sse/services/comboAgentMiddleware.ts";

// Regression for the non-global CACHE_TAG_PATTERN bug: `.replace()` with a
// non-global regex only removes the FIRST match, so messages carrying more than
// one <biModel> tag (e.g. an Open WebUI follow-up/title request that inlines the
// whole chat history) leaked the remaining tags straight to the provider — exactly
// what stripModelTags is documented to prevent (#454).
describe("comboAgentMiddleware — <biModel> tag stripping (non-global regex bug)", () => {
  test("stripModelTags removes ALL <biModel> tags from a single message", () => {
    const messages = [
      {
        role: "user",
        content:
          "first <biModel>claude/claude-opus-4-8</biModel> " +
          "middle <biModel>claude/claude-opus-4-8</biModel> " +
          "end <biModel>claude/claude-opus-4-8</biModel>",
      },
    ];

    const stripped = stripModelTags(messages);
    const remaining = (String(stripped[0].content).match(/<biModel>/g) || []).length;

    assert.equal(remaining, 0, "Provider must never see any <biModel> tag (#454)");
    assert.ok(
      !String(stripped[0].content).includes("<biModel>"),
      "Stripped content should contain no tag fragments"
    );
  });

  test("injectModelTag does not leave duplicate tags when the message already has several", () => {
    const messages = [
      { role: "user", content: "Continue" },
      {
        role: "assistant",
        content: "answer <biModel>old/model-a</biModel> more <biModel>old/model-b</biModel>",
      },
    ];

    const result = injectModelTag(messages, "new/model");
    const tagCount = (String(result[1].content).match(/<biModel>/g) || []).length;

    assert.equal(tagCount, 1, "Exactly one (the freshly pinned) tag should remain");
    assert.ok(
      String(result[1].content).includes("<biModel>new/model</biModel>"),
      "The remaining tag must be the new pin"
    );
    assert.ok(
      !String(result[1].content).includes("old/model"),
      "All previous pins must be cleaned"
    );
  });
});

// Regression for CodeQL js/polynomial-redos (#3870): the unbounded `(?:\\n|\n|\r)*`
// prefix/suffix on the unanchored CACHE_TAG_PATTERN made `.test()` / `.replace()`
// run in O(n²) on inputs with many newlines. The fix drops the surrounding runs from
// the detection pattern and bounds them ({0,16}) in the global strip pattern.
describe("comboAgentMiddleware — ReDoS safety + newline-wrapped tags (#3870)", () => {
  test("stripModelTags stays linear on a long run of newlines (no tag present)", () => {
    const evil = "\n".repeat(50_000);
    const start = process.hrtime.bigint();
    const stripped = stripModelTags([{ role: "user", content: evil }]);
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    assert.equal(stripped[0].content, evil, "no tag → content returned unchanged");
    assert.ok(elapsedMs < 1000, `regex must stay linear; took ${elapsedMs.toFixed(1)}ms`);
  });

  test("stripModelTags stays linear on many newlines before a never-closing tag", () => {
    const evil = "\n".repeat(50_000) + "<biModel" + "x".repeat(2000);
    const start = process.hrtime.bigint();
    stripModelTags([{ role: "user", content: evil }]);
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    assert.ok(elapsedMs < 1000, `regex must stay linear; took ${elapsedMs.toFixed(1)}ms`);
  });

  test("extractPinnedModel still finds a tag wrapped in newlines", () => {
    const messages = [
      {
        role: "assistant",
        content: "answer\n\n<biModel>claude/claude-opus-4-8</biModel>\n\n",
      },
    ];
    assert.equal(extractPinnedModel(messages), "claude/claude-opus-4-8");
  });

  test("stripModelTags removes the newline run wrapping a tag (no blank line left)", () => {
    const out = String(
      stripModelTags([{ role: "user", content: "before\n\n<biModel>a/b</biModel>\n\nafter" }])[0]
        .content
    );
    assert.ok(!out.includes("<biModel>"), "tag removed");
    assert.ok(!out.includes("\n\n\n"), "no triple newline left from stripping");
  });
});
