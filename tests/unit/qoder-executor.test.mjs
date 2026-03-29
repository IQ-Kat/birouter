import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

// ═══════════════════════════════════════════════════════════════
//  QoderExecutor Unit Tests
//  Tests for HMAC-SHA256 signature, headers, URL building
//  Fixes: https://github.com/diegosouzapw/OmniRoute/issues/114
// ═══════════════════════════════════════════════════════════════

const { QoderExecutor } = await import("../../open-sse/executors/qoder.ts");

// ─── Constructor ──────────────────────────────────────────────

test("QoderExecutor: constructor sets provider to 'qoder'", () => {
  const executor = new QoderExecutor();
  assert.equal(executor.getProvider(), "qoder");
});

// ─── createQoderSignature ─────────────────────────────────────

test("QoderExecutor: createQoderSignature returns valid HMAC-SHA256 hex", () => {
  const executor = new QoderExecutor();
  const userAgent = "Qoder-Cli";
  const sessionID = "session-test-123";
  const timestamp = 1700000000000;
  const apiKey = "test-api-key-secret";

  const signature = executor.createQoderSignature(userAgent, sessionID, timestamp, apiKey);

  // Verify it's a valid hex string (64 chars for SHA256)
  assert.match(signature, /^[0-9a-f]{64}$/);

  // Verify reproducibility — same inputs produce same signature
  const signature2 = executor.createQoderSignature(userAgent, sessionID, timestamp, apiKey);
  assert.equal(signature, signature2);

  // Verify against manual HMAC computation
  const payload = `${userAgent}:${sessionID}:${timestamp}`;
  const expected = crypto.createHmac("sha256", apiKey).update(payload).digest("hex");
  assert.equal(signature, expected);
});

test("QoderExecutor: createQoderSignature returns empty string when apiKey is empty", () => {
  const executor = new QoderExecutor();
  const result = executor.createQoderSignature("agent", "session", 123, "");
  assert.equal(result, "");
});

test("QoderExecutor: createQoderSignature returns empty string when apiKey is null", () => {
  const executor = new QoderExecutor();
  const result = executor.createQoderSignature("agent", "session", 123, null);
  assert.equal(result, "");
});

// ─── buildHeaders ─────────────────────────────────────────────

test("QoderExecutor: buildHeaders includes qoder-specific headers", () => {
  const executor = new QoderExecutor();
  const credentials = { apiKey: "test-key-123" };

  const headers = executor.buildHeaders(credentials, true);

  // Must include required qoder headers
  assert.ok(headers["session-id"], "Missing session-id header");
  assert.ok(headers["x-qoder-timestamp"], "Missing x-qoder-timestamp header");
  assert.ok(headers["x-qoder-signature"], "Missing x-qoder-signature header");

  // session-id format
  assert.ok(
    headers["session-id"].startsWith("session-"),
    "session-id should start with 'session-'"
  );

  // timestamp is a number string
  assert.match(headers["x-qoder-timestamp"], /^\d+$/);

  // signature is hex
  assert.match(headers["x-qoder-signature"], /^[0-9a-f]{64}$/);

  // Authorization
  assert.equal(headers["Authorization"], "Bearer test-key-123");

  // Content-Type
  assert.equal(headers["Content-Type"], "application/json");

  // Streaming Accept
  assert.equal(headers["Accept"], "text/event-stream");
});

test("QoderExecutor: buildHeaders omits Accept header when stream is false", () => {
  const executor = new QoderExecutor();
  const credentials = { apiKey: "test-key" };

  const headers = executor.buildHeaders(credentials, false);

  assert.equal(headers["Accept"], undefined);
});

test("QoderExecutor: buildHeaders uses accessToken when apiKey is missing", () => {
  const executor = new QoderExecutor();
  const credentials = { accessToken: "oauth-token-123" };

  const headers = executor.buildHeaders(credentials);

  assert.equal(headers["Authorization"], "Bearer oauth-token-123");
  // Signature should still be generated using the accessToken
  assert.ok(headers["x-qoder-signature"].length > 0);
});

test("QoderExecutor: buildHeaders generates unique session IDs per call", () => {
  const executor = new QoderExecutor();
  const credentials = { apiKey: "key" };

  const headers1 = executor.buildHeaders(credentials);
  const headers2 = executor.buildHeaders(credentials);

  assert.notEqual(headers1["session-id"], headers2["session-id"]);
});

// ─── buildUrl ─────────────────────────────────────────────────

test("QoderExecutor: buildUrl returns config baseUrl", () => {
  const executor = new QoderExecutor();
  const url = executor.buildUrl("qwen3-coder-plus", true);

  assert.equal(url, "https://apis.qoder.cn/v1/chat/completions");
});

// ─── transformRequest ─────────────────────────────────────────

test("QoderExecutor: transformRequest passes body through unchanged", () => {
  const executor = new QoderExecutor();
  const body = {
    model: "deepseek-r1",
    messages: [{ role: "user", content: "Hello" }],
    stream: true,
  };

  const result = executor.transformRequest("deepseek-r1", body, true, {});
  assert.deepEqual(result, body);
});

// ─── Integration: executor registry ───────────────────────────

test("QoderExecutor: getExecutor('qoder') returns QoderExecutor instance", async () => {
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const executor = getExecutor("qoder");
  assert.ok(executor instanceof QoderExecutor, "Should return QoderExecutor instance");
});
