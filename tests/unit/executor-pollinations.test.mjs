import test from "node:test";
import assert from "node:assert/strict";

import { PollinationsExecutor } from "../../open-sse/executors/pollinations.ts";

test("PollinationsExecutor.buildUrl uses the free Pollinations endpoint", () => {
  const executor = new PollinationsExecutor();
  assert.equal(
    executor.buildUrl("openai", true),
    "https://text.pollinations.ai/openai/chat/completions"
  );
});

test("PollinationsExecutor.buildHeaders omits auth when no key is present", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({}, true), {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  });
});

test("PollinationsExecutor.buildHeaders supports optional API auth", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({ apiKey: "poll-key" }, false), {
    "Content-Type": "application/json",
    Authorization: "Bearer poll-key",
  });
});

test("PollinationsExecutor.transformRequest is a passthrough for alias models", () => {
  const executor = new PollinationsExecutor();
  const body = { model: "claude", messages: [{ role: "user", content: "hello" }] };
  assert.equal(executor.transformRequest("claude", body, true, {}), body);
});
