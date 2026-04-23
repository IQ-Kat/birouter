import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  acquire,
  buildAccountSemaphoreKey,
  getStats,
  markBlocked,
  reset,
  resetAll,
} from "../accountSemaphore";

afterEach(() => {
  resetAll();
});

describe("accountSemaphore", async () => {
  it("queues requests beyond the account cap and drains on release", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-1",
    });

    const releaseA = await acquire(key, { maxConcurrency: 2, timeoutMs: 200 });
    const releaseB = await acquire(key, { maxConcurrency: 2, timeoutMs: 200 });
    const queued = acquire(key, { maxConcurrency: 2, timeoutMs: 200 });

    await new Promise((resolve) => setTimeout(resolve, 10));

    assert.deepEqual(getStats()[key], {
      running: 2,
      queued: 1,
      maxConcurrency: 2,
      blockedUntil: null,
    });

    releaseA();
    const releaseC = await queued;

    assert.deepEqual(getStats()[key], {
      running: 2,
      queued: 0,
      maxConcurrency: 2,
      blockedUntil: null,
    });

    releaseA();
    releaseB();
    releaseC();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("returns a no-op release when concurrency is bypassed", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-bypass",
    });

    const release = await acquire(key, { maxConcurrency: 0, timeoutMs: 50 });

    assert.deepEqual(getStats(), {});
    release();
    release();
    assert.deepEqual(getStats(), {});
  });

  it("uses SEMAPHORE_TIMEOUT for timed out queued requests", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-timeout",
    });

    const release = await acquire(key, { maxConcurrency: 1, timeoutMs: 100 });

    await assert.rejects(
      acquire(key, { maxConcurrency: 1, timeoutMs: 20 }),
      (error: Error & { code?: string }) => error.code === "SEMAPHORE_TIMEOUT"
    );

    release();
  });

  it("keeps release idempotent for finally blocks", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-finally",
    });

    const release = await acquire(key, { maxConcurrency: 1, timeoutMs: 100 });

    try {
      throw new Error("boom");
    } catch {
      release();
      release();
    }

    const secondRelease = await acquire(key, { maxConcurrency: 1, timeoutMs: 100 });
    secondRelease();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("supports temporary blocking and explicit reset hooks", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-blocked",
    });

    markBlocked(key, 30);
    const queued = acquire(key, { maxConcurrency: 1, timeoutMs: 100 });

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key]?.queued, 1);

    reset(key);

    await assert.rejects(queued, /Semaphore reset/);
    assert.equal(getStats()[key], undefined);
  });

  it("preserves existing maxConcurrency when markBlocked is applied", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      model: "qwen-max",
      accountKey: "acct-preserve-max",
    });

    const releaseA = await acquire(key, { maxConcurrency: 3, timeoutMs: 100 });
    const releaseB = await acquire(key, { maxConcurrency: 3, timeoutMs: 100 });

    markBlocked(key, 30);

    assert.equal(getStats()[key]?.maxConcurrency, 3);

    releaseA();
    releaseB();

    await new Promise((resolve) => setTimeout(resolve, 40));

    const releaseC = await acquire(key, { maxConcurrency: 3, timeoutMs: 100 });
    const releaseD = await acquire(key, { maxConcurrency: 3, timeoutMs: 100 });
    const releaseE = await acquire(key, { maxConcurrency: 3, timeoutMs: 100 });

    assert.deepEqual(getStats()[key], {
      running: 3,
      queued: 0,
      maxConcurrency: 3,
      blockedUntil: null,
    });

    releaseC();
    releaseD();
    releaseE();
  });
});
