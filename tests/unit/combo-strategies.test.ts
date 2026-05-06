import test, { after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-strategies-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { invalidateCodexQuotaCache, registerCodexConnection } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { recordComboRequest } = await import("../../open-sse/services/comboMetrics.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  globalThis.fetch = ORIGINAL_FETCH;
});

const reqBodyNullContext = {
  model: "comboTest",
  messages: [{ role: "user", content: null }], // hit toTextContent (!string, !array)
  stream: false,
};

const reqBodyTextArray = {
  model: "comboTest",
  messages: [{ role: "user", content: [{ text: "hi array" }, { image: "url" }, null] }],
  stream: false,
};

function capability(limitContext: number) {
  return {
    tool_call: true,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: limitContext,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
  };
}

function okResponse(model: string) {
  return Response.json({ choices: [{ message: { role: "assistant", content: model } }] });
}

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

async function selectedModelFor(combo: Record<string, unknown>, body: Record<string, unknown>) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length > 0, true);
  return calls[0];
}

function codexQuota({
  used5h,
  reset5hSeconds,
  used7d,
  reset7dSeconds,
}: {
  used5h: number;
  reset5hSeconds: number;
  used7d: number;
  reset7dSeconds: number;
}) {
  return {
    rate_limit: {
      primary_window: {
        used_percent: used5h,
        reset_after_seconds: reset5hSeconds,
      },
      secondary_window: {
        used_percent: used7d,
        reset_after_seconds: reset7dSeconds,
      },
    },
  };
}

function installCodexQuotaMock(quotasByToken: Record<string, unknown>) {
  globalThis.fetch = async (_input: RequestInfo | URL, init?: RequestInit) => {
    const headers = init?.headers as Record<string, string> | undefined;
    const authorization = headers?.Authorization || headers?.authorization || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    const quota = quotasByToken[token];
    if (!quota) return Response.json({ error: "missing quota" }, { status: 404 });
    return Response.json(quota);
  };
}

function resetAwareCombo(
  name: string,
  connections: Array<{ id: string; token: string }>,
  config: Record<string, unknown> = {}
) {
  for (const connection of connections) {
    invalidateCodexQuotaCache(connection.id);
    registerCodexConnection(connection.id, { accessToken: connection.token });
  }

  return {
    name,
    strategy: "reset-aware",
    config,
    models: connections.map((connection, index) => ({
      kind: "model",
      provider: "codex",
      providerId: "codex",
      model: "gpt-5",
      connectionId: connection.id,
      id: `${name}-${index}`,
    })),
  };
}

async function selectedConnectionFor(combo: Record<string, unknown>) {
  const calls: Array<string | null> = [];
  const response = await handleComboChat({
    body: reqBodyTextArray,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      calls.push(target?.connectionId ?? null);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length > 0, true);
  return calls[0];
}

test("least-used strategy prefers the model with fewer recorded combo requests", async () => {
  const name = `least-used-${randomUUID()}`;
  const busyModel = "openai/gpt-4";
  const idleModel = "openai/gpt-3.5-turbo";
  const combo = await combosDb.createCombo({
    name,
    strategy: "least-used",
    models: [busyModel, idleModel],
  });

  recordComboRequest(name, busyModel, {
    success: true,
    latencyMs: 10,
    strategy: "least-used",
  });

  assert.equal(await selectedModelFor(combo, reqBodyTextArray), idleModel);
});

test("context-optimized strategy prefers the largest context window", async () => {
  saveModelsDevCapabilities({
    "test-context": {
      small: capability(8_000),
      large: capability(64_000),
    },
  });

  const combo = await combosDb.createCombo({
    name: `context-optimized-${randomUUID()}`,
    strategy: "context-optimized",
    models: ["test-context/small", "test-context/large", "unknown/unknown"],
  });

  assert.equal(await selectedModelFor(combo, reqBodyNullContext), "test-context/large");
});

test("auto strategy handles null and empty prompt edge cases without throwing", async () => {
  const combo = await combosDb.createCombo({
    name: `auto-${randomUUID()}`,
    strategy: "auto",
    config: { auto: { explorationRate: 0 } },
    models: ["openai/gpt-4"],
  });

  assert.equal(
    await selectedModelFor(combo, {
      model: combo.name,
      messages: [{ role: "user", content: null }],
    }),
    "openai/gpt-4"
  );
  assert.equal(await selectedModelFor(combo, { model: combo.name, messages: [] }), "openai/gpt-4");
});

test("reset-aware strategy prefers lower weekly remaining quota when reset is much sooner", async () => {
  const soon = { id: `soon-${randomUUID()}`, token: `token-soon-${randomUUID()}` };
  const later = { id: `later-${randomUUID()}`, token: `token-later-${randomUUID()}` };
  installCodexQuotaMock({
    [soon.token]: codexQuota({
      used5h: 10,
      reset5hSeconds: 3600,
      used7d: 40,
      reset7dSeconds: 24 * 3600,
    }),
    [later.token]: codexQuota({
      used5h: 10,
      reset5hSeconds: 3600,
      used7d: 20,
      reset7dSeconds: 5 * 24 * 3600,
    }),
  });

  const combo = resetAwareCombo(`reset-aware-soon-${randomUUID()}`, [soon, later]);

  assert.equal(await selectedConnectionFor(combo), soon.id);
});

test("reset-aware strategy avoids accounts near 5h exhaustion", async () => {
  const exhausted5h = {
    id: `exhausted-${randomUUID()}`,
    token: `token-exhausted-${randomUUID()}`,
  };
  const healthy5h = {
    id: `healthy-${randomUUID()}`,
    token: `token-healthy-${randomUUID()}`,
  };
  installCodexQuotaMock({
    [exhausted5h.token]: codexQuota({
      used5h: 98,
      reset5hSeconds: 20 * 60,
      used7d: 5,
      reset7dSeconds: 24 * 3600,
    }),
    [healthy5h.token]: codexQuota({
      used5h: 20,
      reset5hSeconds: 4 * 3600,
      used7d: 50,
      reset7dSeconds: 4 * 24 * 3600,
    }),
  });

  const combo = resetAwareCombo(`reset-aware-guard-${randomUUID()}`, [exhausted5h, healthy5h]);

  assert.equal(await selectedConnectionFor(combo), healthy5h.id);
});

test("reset-aware strategy rotates similar scores with round-robin tie breaking", async () => {
  const first = { id: `first-${randomUUID()}`, token: `token-first-${randomUUID()}` };
  const second = {
    id: `second-${randomUUID()}`,
    token: `token-second-${randomUUID()}`,
  };
  installCodexQuotaMock({
    [first.token]: codexQuota({
      used5h: 50,
      reset5hSeconds: 2 * 3600,
      used7d: 50,
      reset7dSeconds: 3 * 24 * 3600,
    }),
    [second.token]: codexQuota({
      used5h: 50,
      reset5hSeconds: 2 * 3600,
      used7d: 50,
      reset7dSeconds: 3 * 24 * 3600,
    }),
  });

  const combo = resetAwareCombo(`reset-aware-rr-${randomUUID()}`, [first, second]);

  assert.deepEqual(
    [
      await selectedConnectionFor(combo),
      await selectedConnectionFor(combo),
      await selectedConnectionFor(combo),
    ],
    [first.id, second.id, first.id]
  );
});
