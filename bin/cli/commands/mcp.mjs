import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerMcp(program) {
  const mcp = program.command("mcp").description(t("mcp.title"));

  mcp
    .command("status")
    .description("Show MCP server status")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  mcp
    .command("restart")
    .description("Restart the MCP server")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpRestartCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runMcpStatusCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/mcp/status", {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.log(t("mcp.stopped"));
      return 0;
    }

    const status = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(status, null, 2));
      return 0;
    }

    const transport = status.transport || "stdio";
    console.log(status.running ? t("mcp.running", { transport }) : t("mcp.stopped"));
    if (status.toolsCount !== undefined) console.log(`  Tools: ${status.toolsCount}`);
    if (status.scopes?.length) {
      console.log("  Scopes:");
      for (const scope of status.scopes) console.log(`    - ${scope}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runMcpRestartCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/mcp/restart", {
      method: "POST",
      retry: false,
      timeout: 10000,
      acceptNotOk: true,
    });
    if (res.ok) {
      console.log(t("mcp.restarted"));
      return 0;
    }
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
