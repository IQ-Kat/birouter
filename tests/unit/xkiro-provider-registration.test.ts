import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";

test("xKiro provider is correctly registered in open-sse REGISTRY", () => {
  const entry = REGISTRY.xkiro;
  assert.ok(entry, "xkiro entry must exist in REGISTRY");
  assert.equal(entry.id, "xkiro");
  assert.equal(entry.alias, "xkiro");
  assert.equal(entry.baseUrl, "https://api.xkiro.com/v1/chat/completions");
  assert.equal(entry.format, "openai");
  assert.equal(entry.passthroughModels, true);
  assert.ok(Array.isArray(entry.models));
  assert.ok(entry.models.length > 0);
  assert.equal(entry.models[0].id, "anthropic/claude-sonnet-4-5");
});

test("xKiro provider is registered in UI APIKEY_PROVIDERS catalog", () => {
  const uiEntry = (APIKEY_PROVIDERS as Record<string, unknown>).xkiro;
  assert.ok(uiEntry, "xkiro entry must exist in APIKEY_PROVIDERS");
  assert.equal((uiEntry as { id: string }).id, "xkiro");
  assert.equal((uiEntry as { website: string }).website, "https://xkiro.com");
});
