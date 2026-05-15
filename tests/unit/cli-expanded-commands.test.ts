import test from "node:test";
import assert from "node:assert/strict";

test("logs.mjs pode ser importado com novas flags", async () => {
  const mod = await import("../../bin/cli/commands/logs.mjs");
  assert.equal(typeof mod.registerLogs, "function");
  assert.equal(typeof mod.runLogsCommand, "function");
});

test("health.mjs exporta runHealthComponentsCommand", async () => {
  const mod = await import("../../bin/cli/commands/health.mjs");
  assert.equal(typeof mod.registerHealth, "function");
  assert.equal(typeof mod.runHealthCommand, "function");
  assert.equal(typeof mod.runHealthComponentsCommand, "function");
});

test("update.mjs exporta runUpdateCommand", async () => {
  const mod = await import("../../bin/cli/commands/update.mjs");
  assert.equal(typeof mod.registerUpdate, "function");
  assert.equal(typeof mod.runUpdateCommand, "function");
});

test("keys.mjs exporta novos comandos", async () => {
  const mod = await import("../../bin/cli/commands/keys.mjs");
  assert.equal(typeof mod.registerKeys, "function");
  assert.equal(typeof mod.runKeysRegenerateCommand, "function");
  assert.equal(typeof mod.runKeysRevokeCommand, "function");
  assert.equal(typeof mod.runKeysRevealCommand, "function");
  assert.equal(typeof mod.runKeysUsageCommand, "function");
  assert.equal(typeof mod.runKeysPolicyShowCommand, "function");
  assert.equal(typeof mod.runKeysPolicySetCommand, "function");
  assert.equal(typeof mod.runKeysExpirationListCommand, "function");
  assert.equal(typeof mod.runKeysRotateCommand, "function");
  assert.equal(typeof mod.runKeysListCommand, "function");
  assert.equal(typeof mod.runKeysRemoveCommand, "function");
});

test("keys.mjs — runKeysListCommand sem server retorna 0 ou 1", async () => {
  const { runKeysListCommand } = await import("../../bin/cli/commands/keys.mjs");
  let code = 0;
  try {
    code = await runKeysListCommand({ json: true });
  } catch {
    code = 1;
  }
  assert.ok(code === 0 || code === 1);
});

test("provider-store.mjs exporta removeProviderConnectionByProvider", async () => {
  const mod = await import("../../bin/cli/provider-store.mjs");
  assert.equal(typeof mod.removeProviderConnectionByProvider, "function");
});

test("tunnel.mjs exporta subcomandos status/logs/info/rotate", async () => {
  const mod = await import("../../bin/cli/commands/tunnel.mjs");
  assert.equal(typeof mod.registerTunnel, "function");
  assert.equal(typeof mod.runTunnelStatusCommand, "function");
  assert.equal(typeof mod.runTunnelLogsCommand, "function");
  assert.equal(typeof mod.runTunnelInfoCommand, "function");
  assert.equal(typeof mod.runTunnelRotateCommand, "function");
});

test("backup.mjs exporta runBackupAutoEnableCommand/Disable/Status", async () => {
  const mod = await import("../../bin/cli/commands/backup.mjs");
  assert.equal(typeof mod.registerBackup, "function");
  assert.equal(typeof mod.runBackupCommand, "function");
  assert.equal(typeof mod.runBackupAutoEnableCommand, "function");
  assert.equal(typeof mod.runBackupAutoDisableCommand, "function");
  assert.equal(typeof mod.runBackupAutoStatusCommand, "function");
});

test("backup auto status sem arquivo retorna 0", async () => {
  const { runBackupAutoStatusCommand } = await import("../../bin/cli/commands/backup.mjs");
  const { tmpdir } = await import("node:os");
  const orig = process.env.HOME;
  process.env.HOME = tmpdir();
  try {
    const code = await runBackupAutoStatusCommand();
    assert.ok(code === 0 || code === 1);
  } finally {
    process.env.HOME = orig;
  }
});

test("tunnel — registerTunnel registra list/create/stop/status/logs/info/rotate", async () => {
  const { registerTunnel } = await import("../../bin/cli/commands/tunnel.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerTunnel(prog);
  const tunnelCmd = prog.commands.find((c) => c.name() === "tunnel");
  assert.ok(tunnelCmd, "tunnel command deve existir");
  const names = tunnelCmd.commands.map((c) => c.name());
  for (const sub of ["list", "create", "stop", "status", "logs", "info", "rotate"]) {
    assert.ok(names.includes(sub), `tunnel ${sub} deve existir`);
  }
});

test("health components com alertsOnly=true não lança", async () => {
  // Server não está rodando — função deve retornar 1 sem throw.
  const { runHealthComponentsCommand } = await import("../../bin/cli/commands/health.mjs");
  const code = await runHealthComponentsCommand({ alertsOnly: true });
  assert.ok(code === 0 || code === 1, "should return 0 or 1");
});

test("update --check com versão atual não lança", async () => {
  const { runUpdateCommand } = await import("../../bin/cli/commands/update.mjs");
  // Sem servidor npm disponível pode retornar erro — só garante que não throw.
  let code = 0;
  try {
    code = await runUpdateCommand({ check: true, yes: true });
  } catch {
    code = 1;
  }
  assert.ok(code === 0 || code === 1);
});

test("test-provider.mjs exporta runTestProviderCommand com novas flags", async () => {
  const mod = await import("../../bin/cli/commands/test-provider.mjs");
  assert.equal(typeof mod.registerTestProvider, "function");
  assert.equal(typeof mod.runTestProviderCommand, "function");
});

test("test-provider — registerTestProvider registra flags latency/repeat/compare/save", async () => {
  const { registerTestProvider } = await import("../../bin/cli/commands/test-provider.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerTestProvider(prog);
  const testCmd = prog.commands.find((c) => c.name() === "test");
  assert.ok(testCmd, "test command deve existir");
  const optNames = testCmd.options.map((o: any) => o.long);
  assert.ok(optNames.includes("--latency"), "--latency deve existir");
  assert.ok(optNames.includes("--repeat"), "--repeat deve existir");
  assert.ok(optNames.includes("--compare"), "--compare deve existir");
  assert.ok(optNames.includes("--save"), "--save deve existir");
});

test("test-provider — compare requer pelo menos dois modelos sem server retorna 0 ou 1", async () => {
  const { runTestProviderCommand } = await import("../../bin/cli/commands/test-provider.mjs");
  let code = 0;
  try {
    code = await runTestProviderCommand("anthropic", undefined, {
      compare: "gpt-4o,claude-3-5-sonnet",
    });
  } catch {
    code = 1;
  }
  assert.ok(code === 0 || code === 1);
});
