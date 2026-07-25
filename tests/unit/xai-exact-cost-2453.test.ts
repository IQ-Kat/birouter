import test from "node:test";
import assert from "node:assert/strict";
import { calculateCost, computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import { extractUsage, normalizeUsage } from "../../open-sse/utils/usageTracking.ts";

const PRICING = { input: 1, output: 2 };
const TOKENS_1M_EACH = { input: 1_000_000, output: 1_000_000 };

const DOC_EXAMPLE_TICKS = 37_756_000;
const DOC_EXAMPLE_USD = 0.0037756;

test("computeCostFromPricing: xAI exact cost_in_usd_ticks overrides the token-based estimate", () => {
  const cost = computeCostFromPricing(PRICING, {
    ...TOKENS_1M_EACH,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });
  assert.ok(Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9, `expected ${DOC_EXAMPLE_USD}, got ${cost}`);
  assert.notEqual(cost, 3, "must not fall back to the $3 token-based estimate");
});

test("computeCostFromPricing: xAI exact cost works even with no pricing record at all", () => {
  const cost = computeCostFromPricing(null, {
    ...TOKENS_1M_EACH,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });
  assert.ok(Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9);
});

test("computeCostFromPricing CONTROL: no cost_in_usd_ticks still falls back to the token-based estimate", () => {
  assert.equal(computeCostFromPricing(PRICING, TOKENS_1M_EACH), 3);
});

test("calculateCost: xAI exact cost_in_usd_ticks overrides whatever the token-based estimate would be", async () => {
  const baseline = await calculateCost("xai", "grok-4.3", { input: 500, output: 500 });

  const cost = await calculateCost("xai", "grok-4.3", {
    input: 500,
    output: 500,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });

  assert.ok(Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9, `expected ${DOC_EXAMPLE_USD}, got ${cost}`);
  assert.notEqual(cost, baseline, "exact cost must override the token-based estimate");
});

test("normalizeUsage: passes through a finite cost_in_usd_ticks", () => {
  const normalized = normalizeUsage({ prompt_tokens: 10, cost_in_usd_ticks: DOC_EXAMPLE_TICKS });
  assert.equal(normalized.cost_in_usd_ticks, DOC_EXAMPLE_TICKS);
});

test("extractUsageFromResponse: xAI OpenAI-shaped usage carries cost_in_usd_ticks through", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
      },
    },
    "xai"
  );
  assert.equal(usage.cost_in_usd_ticks, DOC_EXAMPLE_TICKS);
});
