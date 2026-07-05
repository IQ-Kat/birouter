import test from "node:test";
import assert from "node:assert/strict";
import { BIROUTER_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";
import { buildBirouterResponseMetaHeaders } from "../../src/domain/birouterResponseMeta.ts";

test("headers constant exposes the fallback-attempts key", () => {
  assert.equal(BIROUTER_RESPONSE_HEADERS.fallbackAttempts, "X-Birouter-Fallback-Attempts");
});

test("buildBirouterResponseMetaHeaders emits the fallback-attempts count when > 0", () => {
  const h = buildBirouterResponseMetaHeaders({
    model: "gpt",
    provider: "openai",
    fallbackAttempts: 2,
  });
  assert.equal(h["X-Birouter-Fallback-Attempts"], "2");
});

test("buildBirouterResponseMetaHeaders omits the header when 0 / absent", () => {
  const none = buildBirouterResponseMetaHeaders({ model: "gpt" });
  assert.equal(none["X-Birouter-Fallback-Attempts"], undefined);
  const zero = buildBirouterResponseMetaHeaders({ model: "gpt", fallbackAttempts: 0 });
  assert.equal(zero["X-Birouter-Fallback-Attempts"], undefined);
});
