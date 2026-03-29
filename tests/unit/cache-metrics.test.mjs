import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  getCacheMetrics,
  updateCacheMetrics,
  resetCacheMetrics,
} from "../../src/lib/db/settings.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";

describe("Cache Metrics Database", () => {
  let db;

  before(() => {
    db = getDbInstance();
  });

  after(async () => {
    // Clean up test data
    await resetCacheMetrics();
  });

  describe("getCacheMetrics", () => {
    test("returns default metrics when none exist", async () => {
      // First reset to ensure clean state
      await resetCacheMetrics();

      const metrics = await getCacheMetrics();

      assert.equal(metrics.totalRequests, 0);
      assert.equal(metrics.requestsWithCacheControl, 0);
      assert.equal(metrics.totalInputTokens, 0);
      assert.equal(metrics.totalCachedTokens, 0);
      assert.equal(metrics.totalCacheCreationTokens, 0);
      assert.equal(metrics.tokensSaved, 0);
      assert.equal(metrics.estimatedCostSaved, 0);
      assert.deepStrictEqual(metrics.byProvider, {});
      assert.deepStrictEqual(metrics.byStrategy, {});
      assert.ok(metrics.lastUpdated);
    });

    test("returns persisted metrics", async () => {
      const testMetrics = {
        totalRequests: 100,
        requestsWithCacheControl: 50,
        totalInputTokens: 50000,
        totalCachedTokens: 20000,
        totalCacheCreationTokens: 10000,
        tokensSaved: 20000,
        estimatedCostSaved: 1.25,
        byProvider: {
          claude: {
            requests: 30,
            inputTokens: 30000,
            cachedTokens: 12000,
            cacheCreationTokens: 6000,
          },
          zai: {
            requests: 20,
            inputTokens: 20000,
            cachedTokens: 8000,
            cacheCreationTokens: 4000,
          },
        },
        byStrategy: {
          priority: {
            requests: 40,
            inputTokens: 40000,
            cachedTokens: 16000,
            cacheCreationTokens: 8000,
          },
          "cost-optimized": {
            requests: 10,
            inputTokens: 10000,
            cachedTokens: 4000,
            cacheCreationTokens: 2000,
          },
        },
        lastUpdated: new Date().toISOString(),
      };

      await updateCacheMetrics(testMetrics);
      const retrieved = await getCacheMetrics();

      assert.equal(retrieved.totalRequests, 100);
      assert.equal(retrieved.requestsWithCacheControl, 50);
      assert.equal(retrieved.totalInputTokens, 50000);
      assert.equal(retrieved.totalCachedTokens, 20000);
      assert.equal(retrieved.totalCacheCreationTokens, 10000);
      assert.deepStrictEqual(retrieved.byProvider, testMetrics.byProvider);
      assert.deepStrictEqual(retrieved.byStrategy, testMetrics.byStrategy);
    });
  });

  describe("updateCacheMetrics", () => {
    test("persists metrics to database", async () => {
      const testMetrics = {
        totalRequests: 42,
        requestsWithCacheControl: 20,
        totalInputTokens: 21000,
        totalCachedTokens: 8400,
        totalCacheCreationTokens: 4200,
        tokensSaved: 8400,
        estimatedCostSaved: 0.5,
        byProvider: {
          claude: {
            requests: 15,
            inputTokens: 15000,
            cachedTokens: 6000,
            cacheCreationTokens: 3000,
          },
        },
        byStrategy: {
          priority: {
            requests: 18,
            inputTokens: 18000,
            cachedTokens: 7200,
            cacheCreationTokens: 3600,
          },
        },
        lastUpdated: new Date().toISOString(),
      };

      const result = await updateCacheMetrics(testMetrics);

      assert.equal(result.totalRequests, 42);
      assert.equal(result.requestsWithCacheControl, 20);

      // Verify persistence by retrieving
      const retrieved = await getCacheMetrics();
      assert.equal(retrieved.totalRequests, 42);
    });

    test("updates existing metrics", async () => {
      // Set initial metrics
      await updateCacheMetrics({
        totalRequests: 10,
        requestsWithCacheControl: 5,
        totalInputTokens: 5000,
        totalCachedTokens: 2000,
        totalCacheCreationTokens: 1000,
        tokensSaved: 2000,
        estimatedCostSaved: 0.1,
        byProvider: {},
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      });

      // Update with new values
      await updateCacheMetrics({
        totalRequests: 20,
        requestsWithCacheControl: 10,
        totalInputTokens: 10000,
        totalCachedTokens: 4000,
        totalCacheCreationTokens: 2000,
        tokensSaved: 4000,
        estimatedCostSaved: 0.5,
        byProvider: {
          claude: {
            requests: 8,
            inputTokens: 8000,
            cachedTokens: 3200,
            cacheCreationTokens: 1600,
          },
        },
        byStrategy: {
          priority: {
            requests: 9,
            inputTokens: 9000,
            cachedTokens: 3600,
            cacheCreationTokens: 1800,
          },
        },
        lastUpdated: new Date().toISOString(),
      });

      const retrieved = await getCacheMetrics();

      assert.equal(retrieved.totalRequests, 20);
      assert.equal(retrieved.requestsWithCacheControl, 10);
      assert.equal(retrieved.totalInputTokens, 10000);
      assert.equal(retrieved.totalCachedTokens, 4000);
      assert.deepStrictEqual(retrieved.byProvider, {
        claude: {
          requests: 8,
          inputTokens: 8000,
          cachedTokens: 3200,
          cacheCreationTokens: 1600,
        },
      });
    });
  });

  describe("resetCacheMetrics", () => {
    test("clears all metrics", async () => {
      // Set some metrics first
      await updateCacheMetrics({
        totalRequests: 100,
        requestsWithCacheControl: 50,
        totalInputTokens: 50000,
        totalCachedTokens: 20000,
        totalCacheCreationTokens: 10000,
        tokensSaved: 20000,
        estimatedCostSaved: 2.5,
        byProvider: {
          claude: {
            requests: 40,
            inputTokens: 40000,
            cachedTokens: 16000,
            cacheCreationTokens: 8000,
          },
        },
        byStrategy: {
          priority: {
            requests: 45,
            inputTokens: 45000,
            cachedTokens: 18000,
            cacheCreationTokens: 9000,
          },
        },
        lastUpdated: new Date().toISOString(),
      });

      // Reset
      const result = await resetCacheMetrics();

      assert.equal(result.totalRequests, 0);
      assert.equal(result.requestsWithCacheControl, 0);
      assert.equal(result.totalInputTokens, 0);
      assert.equal(result.totalCachedTokens, 0);
      assert.equal(result.totalCacheCreationTokens, 0);
      assert.equal(result.tokensSaved, 0);
      assert.equal(result.estimatedCostSaved, 0);
      assert.deepStrictEqual(result.byProvider, {});
      assert.deepStrictEqual(result.byStrategy, {});

      // Verify database is cleared
      const retrieved = await getCacheMetrics();
      assert.equal(retrieved.totalRequests, 0);
    });
  });
});
