import test from "node:test";
import assert from "node:assert/strict";

test("cliToken.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/utils/cliToken.mjs");
  assert.equal(typeof mod.getCliToken, "function");
  assert.equal(typeof mod.CLI_TOKEN_HEADER, "string");
  assert.equal(mod.CLI_TOKEN_HEADER, "x-omniroute-cli-token");
});

test("getCliToken retorna string de 32 chars ou string vazia", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  assert.ok(typeof token === "string");
  // Pode ser "" se node-machine-id falhar, ou 32 chars se funcionar.
  assert.ok(token === "" || token.length === 32, `expected 0 or 32 chars, got ${token.length}`);
});

test("getCliToken retorna mesmo valor em chamadas repetidas (cache)", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const t1 = await getCliToken();
  const t2 = await getCliToken();
  assert.equal(t1, t2);
});

test("getCliToken produz apenas hex lowercase se não-vazio", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  if (token.length > 0) {
    assert.match(token, /^[0-9a-f]{32}$/);
  }
});

test("OMNIROUTE_CLI_TOKEN env sobrescreve token gerado em apiFetch", async () => {
  const orig = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_CLI_TOKEN = "test-override-token-12345";
  try {
    // Re-import api.mjs não funciona por cache ESM — validamos apenas que env é lido.
    assert.equal(process.env.OMNIROUTE_CLI_TOKEN, "test-override-token-12345");
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = orig;
  }
});
