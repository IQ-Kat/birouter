import { test } from "node:test";
import assert from "node:assert/strict";
import { parseModel } from "../../open-sse/services/model.ts";

// [1m] extended context suffix — PR #311 (DavyMassoneto)
test("[1m] suffix: strips suffix and sets extendedContext=true", () => {
  const result = parseModel("claude-sonnet-4-6[1m]");
  assert.strictEqual(result.model, "claude-sonnet-4-6");
  assert.strictEqual(result.extendedContext, true);
});

test("[1m] suffix: normal model has extendedContext=false", () => {
  const result = parseModel("claude-sonnet-4-6");
  assert.strictEqual(result.model, "claude-sonnet-4-6");
  assert.strictEqual(result.extendedContext, false);
});

test("[1m] suffix: works with provider prefix", () => {
  const result = parseModel("claude/claude-sonnet-4-6[1m]");
  assert.strictEqual(result.model, "claude-sonnet-4-6");
  assert.strictEqual(result.extendedContext, true);
});

test("parseModel trims provider prefix and model id", () => {
  const result = parseModel("  cx / gpt-5.4  ");
  assert.strictEqual(result.providerAlias, "cx");
  assert.strictEqual(result.provider, "codex");
  assert.strictEqual(result.model, "gpt-5.4");
});
