import test from "node:test";
import assert from "node:assert/strict";

import {
  attachBirouterMetaHeaders,
  buildBirouterResponseMetaHeaders,
  buildBirouterSseMetadataComment,
  formatBirouterCost,
  getBirouterTokenCounts,
} from "../../src/domain/birouterResponseMeta.ts";
import { APP_CONFIG } from "../../src/shared/constants/appConfig.ts";
import { BIROUTER_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";

test("getBirouterTokenCounts normalizes common usage shapes", () => {
  assert.deepEqual(
    getBirouterTokenCounts({
      prompt_tokens: 12,
      completion_tokens: 5,
    }),
    { input: 12, output: 5 }
  );
  assert.deepEqual(
    getBirouterTokenCounts({
      input_tokens: "9",
      output_tokens: "4",
    }),
    { input: 9, output: 4 }
  );
});

test("buildBirouterResponseMetaHeaders formats provider alias, tokens, latency, and cost", () => {
  const headers = buildBirouterResponseMetaHeaders({
    provider: "claude",
    model: "claude-sonnet-4-6",
    cacheHit: true,
    latencyMs: 1234.6,
    usage: {
      prompt_tokens: 11,
      completion_tokens: 7,
    },
    costUsd: 0.00123456789,
  });

  assert.equal(headers["X-Birouter-Provider"], "cc");
  assert.equal(headers["X-Birouter-Model"], "claude-sonnet-4-6");
  assert.equal(headers["X-Birouter-Cache-Hit"], "true");
  assert.equal(headers["X-Birouter-Latency-Ms"], "1235");
  assert.equal(headers["X-Birouter-Tokens-In"], "11");
  assert.equal(headers["X-Birouter-Tokens-Out"], "7");
  assert.equal(headers["X-Birouter-Response-Cost"], "0.0012345679");
});

test("buildBirouterResponseMetaHeaders keeps ASCII model header values unchanged", () => {
  const headers = buildBirouterResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
  });

  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.model], "gpt-4o-mini");
});

test("buildBirouterResponseMetaHeaders percent-encodes non-ASCII model header values", () => {
  const model = "free-mix/[假流式]gemini-3.5-flash";
  const headers = buildBirouterResponseMetaHeaders({
    provider: "openai",
    model,
  });

  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.model], encodeURIComponent(model));
  assert.doesNotThrow(() => new Headers(headers));
});

test("buildBirouterResponseMetaHeaders strips control characters from string header values", () => {
  const headers = buildBirouterResponseMetaHeaders({
    provider: "openai",
    model: "free\r\nX-Injected: yes\u0000-model",
    requestId: "req-1\nreq-2\rreq-3\u0007",
  });

  assert.doesNotMatch(headers[BIROUTER_RESPONSE_HEADERS.model], /[\r\n\u0000-\u001f\u007f]/);
  assert.doesNotMatch(headers[BIROUTER_RESPONSE_HEADERS.requestId], /[\r\n\u0000-\u001f\u007f]/);
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.model], "freeX-Injected: yes-model");
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.requestId], "req-1req-2req-3");
  assert.doesNotThrow(() => new Headers(headers));
});

test("buildBirouterResponseMetaHeaders always emits X-Birouter-Version", () => {
  const headers = buildBirouterResponseMetaHeaders({ provider: "openai", model: "gpt" });
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.version], APP_CONFIG.version);

  // Even with no provider/model at all, the version is still attached.
  const bare = buildBirouterResponseMetaHeaders({});
  assert.equal(bare[BIROUTER_RESPONSE_HEADERS.version], APP_CONFIG.version);
});

test("buildBirouterResponseMetaHeaders emits X-Birouter-Request-Id only when provided", () => {
  const withId = buildBirouterResponseMetaHeaders({ model: "gpt", requestId: "req-123" });
  assert.equal(withId[BIROUTER_RESPONSE_HEADERS.requestId], "req-123");

  const noId = buildBirouterResponseMetaHeaders({ model: "gpt" });
  assert.equal(noId[BIROUTER_RESPONSE_HEADERS.requestId], undefined);

  const nullId = buildBirouterResponseMetaHeaders({ model: "gpt", requestId: null });
  assert.equal(nullId[BIROUTER_RESPONSE_HEADERS.requestId], undefined);

  const blankId = buildBirouterResponseMetaHeaders({ model: "gpt", requestId: "   " });
  assert.equal(blankId[BIROUTER_RESPONSE_HEADERS.requestId], undefined);
});

test("attachBirouterMetaHeaders mutates a Headers instance in place, preserving existing entries", () => {
  const headers = new Headers({ "Content-Type": "application/json" });
  attachBirouterMetaHeaders(headers, {
    provider: "openai",
    model: "gpt",
    requestId: "req-abc",
  });

  assert.equal(headers.get("Content-Type"), "application/json");
  assert.equal(headers.get(BIROUTER_RESPONSE_HEADERS.version), APP_CONFIG.version);
  assert.equal(headers.get(BIROUTER_RESPONSE_HEADERS.requestId), "req-abc");
  assert.equal(headers.get(BIROUTER_RESPONSE_HEADERS.model), "gpt");
});

test("attachBirouterMetaHeaders mutates a plain record in place, preserving existing entries", () => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  attachBirouterMetaHeaders(headers, {
    provider: "openai",
    model: "gpt",
  });

  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.version], APP_CONFIG.version);
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.model], "gpt");
  // No requestId provided → header omitted.
  assert.equal(headers[BIROUTER_RESPONSE_HEADERS.requestId], undefined);
});

test("buildBirouterSseMetadataComment emits comment lines compatible with SSE", () => {
  const comment = buildBirouterSseMetadataComment({
    provider: "openai",
    model: "gpt-4o-mini",
    usage: {
      prompt_tokens: 4,
      completion_tokens: 2,
    },
    latencyMs: 50,
    costUsd: formatBirouterCost(0),
  });

  assert.match(comment, /^: x-birouter-cache-hit=false/m);
  assert.match(comment, /^: x-birouter-provider=openai/m);
  assert.match(comment, /^: x-birouter-model=gpt-4o-mini/m);
  assert.match(comment, /^: x-birouter-tokens-in=4/m);
  assert.match(comment, /^: x-birouter-tokens-out=2/m);
  assert.match(comment, /^: x-birouter-response-cost=0\.0000000000/m);
});

test("buildBirouterResponseMetaHeaders emits X-Birouter-Cost-Saved only when costSavedUsd is provided", () => {
  // Cache HIT: the incremental cost of serving the hit is 0, but the cache saved the
  // original (would-have-been) cost — surfaced via the Cost-Saved header for analytics.
  const hit = buildBirouterResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o",
    cacheHit: true,
    costUsd: 0,
    costSavedUsd: 0.0125,
  });
  assert.equal(hit[BIROUTER_RESPONSE_HEADERS.responseCost], "0.0000000000");
  assert.equal(hit[BIROUTER_RESPONSE_HEADERS.costSaved], "0.0125000000");

  // A normal response (no costSavedUsd) omits the Cost-Saved header entirely.
  const miss = buildBirouterResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o",
    costUsd: 0.0125,
  });
  assert.equal(miss[BIROUTER_RESPONSE_HEADERS.costSaved], undefined);

  // A free-model HIT still emits Cost-Saved (= 0) — it explicitly passed costSavedUsd.
  const freeHit = buildBirouterResponseMetaHeaders({
    cacheHit: true,
    costUsd: 0,
    costSavedUsd: 0,
  });
  assert.equal(freeHit[BIROUTER_RESPONSE_HEADERS.costSaved], "0.0000000000");
});

test("attachBirouterMetaHeaders forwards costSavedUsd onto a Headers bag", () => {
  const headers = new Headers({ "Content-Type": "application/json" });
  attachBirouterMetaHeaders(headers, {
    provider: "openai",
    model: "gpt-4o",
    cacheHit: true,
    costUsd: 0,
    costSavedUsd: 0.0125,
  });
  assert.equal(headers.get(BIROUTER_RESPONSE_HEADERS.responseCost), "0.0000000000");
  assert.equal(headers.get(BIROUTER_RESPONSE_HEADERS.costSaved), "0.0125000000");
});
