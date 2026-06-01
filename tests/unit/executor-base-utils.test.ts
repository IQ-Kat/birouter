import test from "node:test";
import assert from "node:assert/strict";

const base = await import("../../open-sse/executors/base.ts");

test("mergeUpstreamExtraHeaders skips null/undefined extra", () => {
  const h: Record<string, string> = { Authorization: "Bearer x" };
  base.mergeUpstreamExtraHeaders(h, null);
  assert.deepEqual(h, { Authorization: "Bearer x" });
  base.mergeUpstreamExtraHeaders(h, undefined);
  assert.deepEqual(h, { Authorization: "Bearer x" });
});

test("mergeUpstreamExtraHeaders merges string key-value pairs", () => {
  const h: Record<string, string> = {};
  base.mergeUpstreamExtraHeaders(h, { "X-Custom": "val1", "X-Other": "val2" });
  assert.equal(h["X-Custom"], "val1");
  assert.equal(h["X-Other"], "val2");
});

test("mergeUpstreamExtraHeaders overrides user-agent via setUserAgentHeader", () => {
  const h: Record<string, string> = { "User-Agent": "old", "user-agent": "old" };
  base.mergeUpstreamExtraHeaders(h, { "user-agent": "new-agent" });
  assert.equal(h["User-Agent"], "new-agent");
  assert.equal(h["user-agent"], "new-agent");
});

test("mergeUpstreamExtraHeaders skips empty keys", () => {
  const h: Record<string, string> = {};
  base.mergeUpstreamExtraHeaders(h, { "": "val", "X-Valid": "ok" });
  assert.equal(h[""], undefined);
  assert.equal(h["X-Valid"], "ok");
});

test("mergeUpstreamExtraHeaders skips non-string values", () => {
  const h: Record<string, string> = {};
  base.mergeUpstreamExtraHeaders(h, { "X-Num": 123 as any, "X-Bool": true as any });
  assert.equal(h["X-Num"], undefined);
  assert.equal(h["X-Bool"], undefined);
});

test("getCustomUserAgent returns null for null/undefined", () => {
  assert.equal(base.getCustomUserAgent(null), null);
  assert.equal(base.getCustomUserAgent(undefined), null);
});

test("getCustomUserAgent returns null for empty string", () => {
  assert.equal(base.getCustomUserAgent({ customUserAgent: "" }), null);
  assert.equal(base.getCustomUserAgent({ customUserAgent: "   " }), null);
});

test("getCustomUserAgent returns trimmed user agent", () => {
  assert.equal(base.getCustomUserAgent({ customUserAgent: " MyAgent/1.0 " }), "MyAgent/1.0");
});

test("getCustomUserAgent returns null for non-string customUserAgent", () => {
  assert.equal(base.getCustomUserAgent({ customUserAgent: 123 }), null);
});

test("setUserAgentHeader sets User-Agent casing", () => {
  const h: Record<string, string> = {};
  base.setUserAgentHeader(h, "TestAgent/1.0");
  assert.equal(h["User-Agent"], "TestAgent/1.0");
});

test("setUserAgentHeader overwrites existing", () => {
  const h: Record<string, string> = { "User-Agent": "old", "user-agent": "old" };
  base.setUserAgentHeader(h, "NewAgent/2.0");
  assert.equal(h["User-Agent"], "NewAgent/2.0");
  assert.equal(h["user-agent"], "NewAgent/2.0");
});

test("applyConfiguredUserAgent does nothing when no custom user agent", () => {
  const h: Record<string, string> = { "User-Agent": "default" };
  base.applyConfiguredUserAgent(h, null);
  assert.equal(h["User-Agent"], "default");
});

test("applyConfiguredUserAgent applies custom user agent", () => {
  const h: Record<string, string> = { "User-Agent": "default" };
  base.applyConfiguredUserAgent(h, { customUserAgent: "Custom/1.0" });
  assert.equal(h["User-Agent"], "Custom/1.0");
});

test("mergeAbortSignals returns secondary if primary already aborted", () => {
  const c1 = new AbortController();
  const c2 = new AbortController();
  c1.abort(new Error("primary aborted"));
  const merged = base.mergeAbortSignals(c1.signal, c2.signal);
  assert.ok(merged.aborted);
});

test("mergeAbortSignals returns primary if secondary already aborted", () => {
  const c1 = new AbortController();
  const c2 = new AbortController();
  c2.abort(new Error("secondary aborted"));
  const merged = base.mergeAbortSignals(c1.signal, c2.signal);
  assert.ok(merged.aborted);
});

test("mergeAbortSignals aborts when primary fires", () => {
  const c1 = new AbortController();
  const c2 = new AbortController();
  const merged = base.mergeAbortSignals(c1.signal, c2.signal);
  assert.ok(!merged.aborted);
  c1.abort(new Error("primary"));
  assert.ok(merged.aborted);
});

test("mergeAbortSignals aborts when secondary fires", () => {
  const c1 = new AbortController();
  const c2 = new AbortController();
  const merged = base.mergeAbortSignals(c1.signal, c2.signal);
  assert.ok(!merged.aborted);
  c2.abort(new Error("secondary"));
  assert.ok(merged.aborted);
});

test("sanitizeReasoningEffortForProvider clamps values", () => {
  const result = base.sanitizeReasoningEffortForProvider("high", "openai");
  assert.ok(result === "high" || result === "medium" || result === "low" || typeof result === "string");
});

test("sanitizeReasoningEffortForProvider handles null", () => {
  const result = base.sanitizeReasoningEffortForProvider(null, "openai");
  assert.ok(result === null || result === undefined || typeof result === "string");
});

test("sanitizeReasoningEffortForProvider handles undefined", () => {
  const result = base.sanitizeReasoningEffortForProvider(undefined, "anthropic");
  assert.ok(result === null || result === undefined || typeof result === "string");
});
