import { Argument } from "commander";
import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

const VALID_TUNNEL_TYPES = ["cloudflare", "tailscale", "ngrok"];

export function registerTunnel(program) {
  const tunnel = program.command("tunnel").description(t("tunnel.title"));

  tunnel
    .command("list")
    .description("List active tunnels")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("create [type]")
    .description("Create a tunnel")
    .addArgument(
      new Argument("[type]", "Tunnel type").choices(VALID_TUNNEL_TYPES).default("cloudflare")
    )
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelCreateCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("stop <type>")
    .description("Stop a tunnel")
    .option("--yes", "Skip confirmation")
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelStopCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runTunnelListCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/tunnels", { retry: false, timeout: 5000, acceptNotOk: true });
    if (!res.ok) {
      console.log("Tunnel info not available.");
      return 0;
    }

    const tunnels = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(tunnels, null, 2));
      return 0;
    }

    console.log(`\n\x1b[1m\x1b[36m${t("tunnel.title")}\x1b[0m\n`);
    if (!Array.isArray(tunnels) || tunnels.length === 0) {
      console.log("  No active tunnels.");
      return 0;
    }

    for (const tunnel of tunnels) {
      const status = tunnel.active ? "\x1b[32m● active\x1b[0m" : "\x1b[2m○ inactive\x1b[0m";
      console.log(`  ${(tunnel.type || "unknown").padEnd(12)} ${tunnel.url || "N/A"} ${status}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelCreateCommand(type = "cloudflare", opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/tunnels", {
      method: "POST",
      body: { type },
      retry: false,
      timeout: 15000,
      acceptNotOk: true,
    });
    if (res.ok) {
      const result = await res.json();
      console.log(t("tunnel.created", { url: result.url }));
      return 0;
    }
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelStopCommand(type, opts = {}) {
  if (!type) {
    console.error("Tunnel type required. Valid: " + VALID_TUNNEL_TYPES.join(", "));
    return 1;
  }

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("tunnel.confirmStop", { id: type }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}`, {
      method: "DELETE",
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (res.ok) {
      console.log(t("tunnel.stopped"));
      return 0;
    }
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
