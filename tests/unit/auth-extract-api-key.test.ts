import test from "node:test";
import assert from "node:assert/strict";

const { extractApiKey } = await import("../../src/sse/services/auth.ts");

function makeRequest(headers: Record<string, string>): Request {
  return new Request("https://omniroute.test/v1/messages", { headers });
}

test("extractApiKey returns Bearer key when Authorization header is set", () => {
  const req = makeRequest({ Authorization: "Bearer sk-test-bearer" });
  assert.equal(extractApiKey(req), "sk-test-bearer");
});

test("extractApiKey trims surrounding whitespace from Bearer token", () => {
  const req = makeRequest({ Authorization: "Bearer   sk-padded-token   " });
  assert.equal(extractApiKey(req), "sk-padded-token");
});

test("extractApiKey is case-insensitive on the Authorization header name", () => {
  const req = makeRequest({ authorization: "Bearer sk-lowercase-header" });
  assert.equal(extractApiKey(req), "sk-lowercase-header");
});

test("extractApiKey is case-insensitive on the 'bearer' prefix", () => {
  const req = makeRequest({ Authorization: "bearer sk-lowercase-prefix" });
  assert.equal(extractApiKey(req), "sk-lowercase-prefix");
});

test("extractApiKey falls back to x-api-key when Authorization is absent (#2225)", () => {
  const req = makeRequest({ "x-api-key": "sk-anthropic-native" });
  assert.equal(extractApiKey(req), "sk-anthropic-native");
});

test("extractApiKey accepts uppercase X-Api-Key header (#2225)", () => {
  const req = makeRequest({ "X-Api-Key": "sk-uppercase-xapikey" });
  assert.equal(extractApiKey(req), "sk-uppercase-xapikey");
});

test("extractApiKey trims surrounding whitespace from x-api-key value", () => {
  const req = makeRequest({ "x-api-key": "   sk-padded-xapikey   " });
  assert.equal(extractApiKey(req), "sk-padded-xapikey");
});

test("extractApiKey prefers Bearer over x-api-key when both are present (back-compat)", () => {
  const req = makeRequest({
    Authorization: "Bearer sk-bearer-wins",
    "x-api-key": "sk-loser",
  });
  assert.equal(extractApiKey(req), "sk-bearer-wins");
});

test("extractApiKey returns null when neither header is present", () => {
  const req = makeRequest({});
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey returns null when x-api-key contains only whitespace", () => {
  const req = makeRequest({ "x-api-key": "   " });
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey returns null when Authorization is not a Bearer scheme and x-api-key is absent", () => {
  const req = makeRequest({ Authorization: "Basic <stub-base64>" });
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey falls back to x-api-key when Authorization is a non-Bearer scheme", () => {
  const req = makeRequest({
    Authorization: "Basic <stub-base64>",
    "x-api-key": "stub-fallback-after-basic",
  });
  assert.equal(extractApiKey(req), "stub-fallback-after-basic");
});
