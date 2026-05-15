import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerA2a(program) {
  const a2a = program.command("a2a").description("Agent-to-Agent (A2A) server");

  a2a
    .command("status")
    .description("Show A2A server status")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runA2aStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  a2a
    .command("card")
    .description("Print the Agent Card JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runA2aCardCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runA2aStatusCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/a2a/status", {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.log("A2A status not available.");
      return 0;
    }

    const status = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(status, null, 2));
      return 0;
    }

    const running = status.running ? "\x1b[32mrunning\x1b[0m" : "\x1b[31mstopped\x1b[0m";
    console.log(`  Status:    ${running}`);
    console.log(`  Protocol:  ${status.protocol || "JSON-RPC 2.0"}`);
    console.log(`  Tasks:     ${status.activeTasks || 0} active`);

    if (status.skills?.length) {
      console.log("\n  Skills:");
      for (const skill of status.skills) {
        console.log(`\x1b[2m    - ${skill.name}: ${skill.description || "N/A"}\x1b[0m`);
      }
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runA2aCardCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/.well-known/agent.json", {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (res.ok) {
      const card = await res.json();
      console.log(JSON.stringify(card, null, 2));
      return 0;
    }
    console.log("Agent card not available.");
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
