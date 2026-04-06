import test from "node:test";
import assert from "node:assert/strict";

const quotaMonitor = await import("../../open-sse/services/quotaMonitor.ts");
const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");

const {
  registerMonitorFetcher,
  isQuotaMonitorEnabled,
  startQuotaMonitor,
  stopQuotaMonitor,
  getActiveMonitorCount,
} = quotaMonitor;

const { preflightQuota } = quotaPreflight;

function createConnection(providerSpecificData = {}) {
  return { providerSpecificData };
}

async function withPatchedConsole(patches, fn) {
  const originals = {};
  for (const [key, replacement] of Object.entries(patches)) {
    originals[key] = console[key];
    console[key] = replacement;
  }
  try {
    return await fn();
  } finally {
    for (const [key, original] of Object.entries(originals)) {
      console[key] = original;
    }
  }
}

async function withMockedNow(now, fn) {
  const originalNow = Date.now;
  Date.now = () => now;
  try {
    return await fn();
  } finally {
    Date.now = originalNow;
  }
}

function withFakeTimers(fn) {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const scheduled = [];
  let nextId = 0;

  globalThis.setTimeout = (callback, delay = 0, ...args) => {
    const timer = {
      id: ++nextId,
      delay,
      callback,
      args,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
      },
    };
    scheduled.push(timer);
    return timer;
  };

  globalThis.clearTimeout = (timer) => {
    if (timer && typeof timer === "object") {
      timer.cleared = true;
    }
  };

  async function runNextTimer() {
    const timer = scheduled.shift();
    if (!timer) return null;
    await timer.callback(...timer.args);
    return timer;
  }

  async function runAllTimers(limit = 10) {
    for (let i = 0; i < limit; i += 1) {
      const timer = scheduled[0];
      if (!timer) break;
      await runNextTimer();
    }
  }

  return Promise.resolve()
    .then(() => fn({ scheduled, runNextTimer, runAllTimers }))
    .finally(() => {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.clearTimeout = originalClearTimeout;
    });
}

test("isQuotaMonitorEnabled reads the provider flag strictly", () => {
  assert.equal(isQuotaMonitorEnabled(createConnection({ quotaMonitorEnabled: true })), true);
  assert.equal(isQuotaMonitorEnabled(createConnection({ quotaMonitorEnabled: 1 })), false);
  assert.equal(isQuotaMonitorEnabled(createConnection()), false);
});

test("startQuotaMonitor is a no-op when the monitor is disabled", async () => {
  await withFakeTimers(async ({ scheduled }) => {
    startQuotaMonitor("quota-disabled-session", "provider-disabled", "conn-1", createConnection());
    assert.equal(getActiveMonitorCount(), 0);
    assert.equal(scheduled.length, 0);
  });
});

test("startQuotaMonitor schedules the initial normal poll once per session", async () => {
  const sessionId = `quota-normal-${Date.now()}`;

  await withFakeTimers(async ({ scheduled }) => {
    startQuotaMonitor(
      sessionId,
      "provider-normal",
      "conn-2",
      createConnection({ quotaMonitorEnabled: true })
    );
    startQuotaMonitor(
      sessionId,
      "provider-normal",
      "conn-2",
      createConnection({ quotaMonitorEnabled: true })
    );

    assert.equal(getActiveMonitorCount(), 1);
    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0].delay, 60_000);
    assert.equal(scheduled[0].unrefCalled, true);

    stopQuotaMonitor(sessionId);
    assert.equal(getActiveMonitorCount(), 0);
  });
});

test("registerMonitorFetcher shares the same fetcher with quota preflight", async () => {
  const provider = `quota-shared-${Date.now()}`;

  registerMonitorFetcher(provider, async () => ({
    used: 90,
    total: 100,
    percentUsed: 0.9,
  }));

  const result = await preflightQuota(
    provider,
    "conn-shared",
    createConnection({ quotaPreflightEnabled: true })
  );

  assert.deepEqual(result, {
    proceed: true,
    quotaPercent: 0.9,
  });
});

test("quota monitor keeps normal polling when no fetcher is registered", async () => {
  const sessionId = `quota-missing-fetcher-${Date.now()}`;

  await withFakeTimers(async ({ scheduled, runNextTimer }) => {
    startQuotaMonitor(
      sessionId,
      "provider-missing-fetcher",
      "conn-3",
      createConnection({ quotaMonitorEnabled: true })
    );

    assert.equal(scheduled[0].delay, 60_000);
    await runNextTimer();

    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0].delay, 60_000);

    stopQuotaMonitor(sessionId);
  });
});

test("quota monitor switches to critical polling and suppresses duplicate warnings", async () => {
  const provider = `quota-warn-${Date.now()}`;
  const sessionId = `quota-warn-session-${Date.now()}`;
  const warnings = [];

  registerMonitorFetcher(provider, async () => ({
    used: 85,
    total: 100,
    percentUsed: 0.85,
  }));

  await withFakeTimers(async ({ scheduled, runNextTimer }) => {
    await withPatchedConsole({ warn: (message) => warnings.push(message) }, async () => {
      await withMockedNow(1_700_000_000_000, async () => {
        startQuotaMonitor(
          sessionId,
          provider,
          "conn-4",
          createConnection({ quotaMonitorEnabled: true })
        );

        assert.equal(scheduled[0].delay, 60_000);
        await runNextTimer();
        assert.equal(scheduled[0].delay, 15_000);

        await runNextTimer();
        assert.equal(scheduled[0].delay, 15_000);
      });
    });

    assert.equal(warnings.length, 1);
    stopQuotaMonitor(sessionId);
  });
});

test("quota monitor logs exhaustion and clears suppression state on stop", async () => {
  const provider = `quota-exhausted-${Date.now()}`;
  const sessionId = `quota-exhausted-session-${Date.now()}`;
  const warnings = [];
  const infos = [];

  registerMonitorFetcher(provider, async () => ({
    used: 98,
    total: 100,
    percentUsed: 0.98,
  }));

  await withFakeTimers(async ({ scheduled, runNextTimer }) => {
    await withPatchedConsole(
      {
        warn: (message) => warnings.push(message),
        info: (message) => infos.push(message),
      },
      async () => {
        await withMockedNow(1_700_000_000_000, async () => {
          startQuotaMonitor(
            sessionId,
            provider,
            "conn-5",
            createConnection({ quotaMonitorEnabled: true })
          );
          await runNextTimer();
        });
      }
    );

    assert.equal(warnings.length, 1);
    assert.equal(infos.length, 1);
    assert.match(infos[0], /marking .* for next-session cooldown/i);
    assert.equal(scheduled[0].delay, 15_000);

    stopQuotaMonitor(sessionId);
    assert.equal(getActiveMonitorCount(), 0);
  });

  await withFakeTimers(async ({ runNextTimer }) => {
    await withPatchedConsole(
      {
        warn: (message) => warnings.push(message),
        info: () => {},
      },
      async () => {
        await withMockedNow(1_700_000_000_000, async () => {
          startQuotaMonitor(
            sessionId,
            provider,
            "conn-5",
            createConnection({ quotaMonitorEnabled: true })
          );
          await runNextTimer();
        });
      }
    );

    assert.equal(warnings.length, 2);
    stopQuotaMonitor(sessionId);
  });
});

test("quota monitor falls back to normal polling when the fetcher throws", async () => {
  const provider = `quota-throws-${Date.now()}`;
  const sessionId = `quota-throws-session-${Date.now()}`;

  registerMonitorFetcher(provider, async () => {
    throw new Error("network");
  });

  await withFakeTimers(async ({ scheduled, runNextTimer }) => {
    startQuotaMonitor(
      sessionId,
      provider,
      "conn-6",
      createConnection({ quotaMonitorEnabled: true })
    );

    await runNextTimer();
    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0].delay, 60_000);

    stopQuotaMonitor(sessionId);
  });
});
