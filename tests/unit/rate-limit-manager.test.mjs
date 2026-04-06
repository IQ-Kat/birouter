import test from "node:test";
import assert from "node:assert/strict";

const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const originalSetTimeout = globalThis.setTimeout;
const trackedConnections = new Set();

function wait(ms) {
  return new Promise((resolve) => originalSetTimeout(resolve, ms));
}

function enableConnection(connectionId) {
  trackedConnections.add(connectionId);
  rateLimitManager.enableRateLimitProtection(connectionId);
}

async function withFastPersistTimer(fn) {
  globalThis.setTimeout = (callback, _delay, ...args) => {
    const timer = originalSetTimeout(callback, 0, ...args);
    timer.unref?.();
    return timer;
  };

  try {
    return await fn();
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
}

test.afterEach(async () => {
  globalThis.setTimeout = originalSetTimeout;
  for (const connectionId of trackedConnections) {
    rateLimitManager.disableRateLimitProtection(connectionId);
  }
  trackedConnections.clear();
  await wait(5);
});

test("rate limit manager bypasses disabled connections and exposes inactive status", async () => {
  const result = await rateLimitManager.withRateLimit("openai", "disabled-conn", null, async () => {
    return "bypassed";
  });

  assert.equal(result, "bypassed");
  assert.deepEqual(rateLimitManager.getRateLimitStatus("openai", "disabled-conn"), {
    enabled: false,
    active: false,
    queued: 0,
    running: 0,
  });
  assert.deepEqual(rateLimitManager.getAllRateLimitStatus(), {});
});

test("rate limit manager handles soft over-limit warnings and normal header learning", async () => {
  enableConnection("conn-over-limit");
  rateLimitManager.updateFromHeaders(
    "openai",
    "conn-over-limit",
    { "x-ratelimit-over-limit": "yes" },
    200
  );

  const softStatus = rateLimitManager.getRateLimitStatus("openai", "conn-over-limit");
  assert.equal(softStatus.enabled, true);
  assert.equal(softStatus.active, true);

  enableConnection("conn-low-remaining");
  await withFastPersistTimer(async () => {
    rateLimitManager.updateFromHeaders(
      "openai",
      "conn-low-remaining",
      {
        "x-ratelimit-limit-requests": "100",
        "x-ratelimit-remaining-requests": "5",
        "x-ratelimit-reset-requests": "30s",
      },
      200
    );
    await wait(10);
  });

  const learnedLimits = rateLimitManager.getLearnedLimits();
  const learnedEntry = learnedLimits["openai:conn-low-remaining"];
  assert.equal(learnedEntry.provider, "openai");
  assert.equal(learnedEntry.connectionId, "conn-low-remaining");
  assert.equal(learnedEntry.limit, 100);
  assert.equal(learnedEntry.remaining, 5);
  assert.ok(learnedEntry.minTime > 0);

  enableConnection("conn-high-remaining");
  await withFastPersistTimer(async () => {
    rateLimitManager.updateFromHeaders(
      "claude",
      "conn-high-remaining",
      {
        get(name) {
          const map = {
            "anthropic-ratelimit-requests-limit": "100",
            "anthropic-ratelimit-requests-remaining": "70",
            "anthropic-ratelimit-requests-reset": new Date(Date.now() + 30_000).toISOString(),
          };
          return map[name] ?? null;
        },
      },
      200
    );
    await wait(10);
  });

  const allStatuses = rateLimitManager.getAllRateLimitStatus();
  assert.ok(allStatuses["openai:conn-over-limit"]);
  assert.ok(allStatuses["openai:conn-low-remaining"]);
  assert.ok(allStatuses["claude:conn-high-remaining"]);
});

test("rate limit manager handles 429 limiter teardown and disable cleanup", async () => {
  enableConnection("conn-429");
  rateLimitManager.updateFromHeaders("openai", "conn-429", { "retry-after": "1s" }, 429, "gpt-4o");
  await wait(25);

  assert.equal(rateLimitManager.getRateLimitStatus("openai", "conn-429").active, false);

  enableConnection("conn-disable");
  await withFastPersistTimer(async () => {
    rateLimitManager.updateFromHeaders(
      "gemini",
      "conn-disable",
      {
        "x-ratelimit-limit-requests": "60",
        "x-ratelimit-remaining-requests": "4",
        "x-ratelimit-reset-requests": "10s",
      },
      200,
      "gemini-2.5-flash"
    );
    await wait(10);
  });
  assert.ok(rateLimitManager.getAllRateLimitStatus()["gemini:conn-disable:gemini-2.5-flash"]);

  rateLimitManager.disableRateLimitProtection("conn-disable");
  trackedConnections.delete("conn-disable");
  assert.equal(rateLimitManager.isRateLimitEnabled("conn-disable"), false);
  assert.equal(rateLimitManager.getRateLimitStatus("gemini", "conn-disable").active, false);
});

test("rate limit manager parses retry hints from response bodies and locks models", async () => {
  enableConnection("conn-body");
  rateLimitManager.updateFromResponseBody(
    "openai",
    "conn-body",
    {
      error: {
        details: [{ retryDelay: "2s" }],
        message: "Please retry later",
      },
    },
    429,
    "gpt-4o"
  );

  const lockout = accountFallback.getModelLockoutInfo("openai", "conn-body", "gpt-4o");
  assert.equal(lockout.reason, "rate_limit_exceeded");
  assert.ok(lockout.remainingMs > 0);

  rateLimitManager.updateFromResponseBody(
    "openai",
    "conn-body",
    JSON.stringify({ error: { type: "rate_limit_error" } }),
    429,
    null
  );
  assert.equal(rateLimitManager.getRateLimitStatus("openai", "conn-body").active, true);
});
