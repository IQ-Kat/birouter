import { printHeading } from "../io.mjs";
import {
  ensureProviderSchema,
  getProviderApiKey,
  listProviderConnections,
  upsertApiKeyProviderConnection,
} from "../provider-store.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { loadAvailableProviders } from "../provider-catalog.mjs";
import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

function getValidProviderIds() {
  try {
    return new Set(loadAvailableProviders().map((p) => p.id));
  } catch {
    return null;
  }
}

function maskKey(raw) {
  if (!raw || raw.length <= 8) return "***";
  return raw.slice(0, 6) + "***" + raw.slice(-4);
}

export function registerKeys(program) {
  const keys = program.command("keys").description(t("keys.title"));

  keys
    .command("add <provider> [apiKey]")
    .description("Add or update an API key for a provider")
    .option("--stdin", "Read API key from stdin instead of argument")
    .action(async (provider, apiKey, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysAddCommand(provider, apiKey, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("list")
    .description("List all configured API keys")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysListCommand({ ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("remove <provider>")
    .description("Remove an API key for a provider")
    .option("--yes", "Skip confirmation prompt")
    .action(async (provider, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysRemoveCommand(provider, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("regenerate <id>")
    .description("Regenerate an OmniRoute API key (management keys)")
    .option("--yes", "Skip confirmation prompt")
    .action(async (id, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysRegenerateCommand(id, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("revoke <id>")
    .description("Revoke an OmniRoute API key")
    .option("--yes", "Skip confirmation prompt")
    .action(async (id, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysRevokeCommand(id, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("reveal <id>")
    .description("Reveal the unmasked API key value")
    .action(async (id, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysRevealCommand(id, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });

  keys
    .command("usage <id>")
    .description("Show recent usage for an API key")
    .option("--limit <n>", "Number of recent requests", "20")
    .action(async (id, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runKeysUsageCommand(id, { ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runKeysAddCommand(provider, apiKey, opts = {}) {
  if (!provider) {
    console.error("Provider is required. Usage: omniroute keys add <provider> [apiKey]");
    return 1;
  }

  let key = apiKey;
  if (opts.stdin) {
    key = await readStdin();
    if (!key) {
      console.error("No API key provided via stdin.");
      return 1;
    }
  }

  if (!key) {
    console.error("API key is required. Usage: omniroute keys add <provider> <apiKey>");
    return 1;
  }

  const providerLower = provider.toLowerCase();
  const validIds = getValidProviderIds();
  if (validIds && !validIds.has(providerLower)) {
    console.error(`Unknown provider: ${providerLower}`);
    return 1;
  }

  // Server-first
  const serverUp = await isServerUp();
  if (serverUp) {
    try {
      const res = await apiFetch("/api/v1/providers/keys", {
        method: "POST",
        body: { provider: providerLower, apiKey: key },
        retry: false,
      });
      if (res.ok) {
        console.log(t("keys.added", { provider: providerLower }));
        return 0;
      }
    } catch {}
  }

  // DB fallback
  const { db } = await openOmniRouteDb();
  try {
    const existing = listProviderConnections(db).find(
      (c) => c.provider === providerLower && c.authType === "apikey"
    );
    upsertApiKeyProviderConnection(db, {
      provider: providerLower,
      name: existing?.name || providerLower,
      apiKey: key,
    });
    console.log(t("keys.added", { provider: providerLower }));
    return 0;
  } finally {
    db.close();
  }
}

export async function runKeysListCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    ensureProviderSchema(db);
    const connections = listProviderConnections(db).filter(
      (c) => c.authType === "apikey" && c.apiKey
    );

    if (opts.json) {
      const rows = connections.map((c) => ({
        id: c.id,
        provider: c.provider,
        name: c.name,
        isActive: c.isActive,
        maskedKey: maskKey(c.apiKey),
      }));
      console.log(JSON.stringify({ keys: rows }, null, 2));
      return 0;
    }

    printHeading(t("keys.title"));
    if (connections.length === 0) {
      console.log(t("keys.noKeys"));
      return 0;
    }

    for (const c of connections) {
      let raw = "";
      try {
        raw = getProviderApiKey(c);
      } catch {
        raw = c.apiKey || "";
      }
      const masked = maskKey(raw);
      const status = c.isActive ? "\x1b[32m● enabled\x1b[0m" : "\x1b[33m○ disabled\x1b[0m";
      console.log(`  ${c.provider.padEnd(20)} ${masked.padEnd(22)} ${status}`);
    }

    console.log(`\n${t("keys.listed", { count: connections.length })}`);
    return 0;
  } finally {
    db.close();
  }
}

export async function runKeysRemoveCommand(provider, opts = {}) {
  if (!provider) {
    console.error("Provider is required. Usage: omniroute keys remove <provider>");
    return 1;
  }

  const providerLower = provider.toLowerCase();

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("keys.confirmRemove", { id: providerLower }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  const { db } = await openOmniRouteDb();
  try {
    ensureProviderSchema(db);
    const result = db
      .prepare(
        "DELETE FROM provider_connections WHERE provider = ? AND (auth_type = 'apikey' OR (api_key IS NOT NULL AND api_key != ''))"
      )
      .run(providerLower);

    if (result.changes > 0) {
      console.log(t("keys.removed"));
      return 0;
    }
    console.log(t("keys.noKeys"));
    return 0;
  } finally {
    db.close();
  }
}

async function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.trim()));
  });
}

export async function runKeysRegenerateCommand(id, opts = {}) {
  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((r) => rl.question(`Regenerate key ${id}? [y/N] `, r));
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log("Aborted.");
      return 0;
    }
  }
  const res = await apiFetch(`/api/v1/registered-keys/${encodeURIComponent(id)}/regenerate`, {
    method: "POST",
    ...opts,
  });
  if (!res.ok) {
    console.error(`Error: HTTP ${res.status}`);
    return 1;
  }
  const data = await res.json();
  console.log(`Regenerated. New key: ${data.key || data.apiKey || "(see dashboard)"}`);
  return 0;
}

export async function runKeysRevokeCommand(id, opts = {}) {
  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((r) => rl.question(`Revoke key ${id}? [y/N] `, r));
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log("Aborted.");
      return 0;
    }
  }
  const res = await apiFetch(`/api/v1/registered-keys/${encodeURIComponent(id)}/revoke`, {
    method: "POST",
    ...opts,
  });
  if (!res.ok) {
    console.error(`Error: HTTP ${res.status}`);
    return 1;
  }
  console.log(`Key ${id} revoked.`);
  return 0;
}

export async function runKeysRevealCommand(id, opts = {}) {
  process.stderr.write(
    "⚠  This will display the full unmasked key. Ensure your screen is private.\n"
  );
  const res = await apiFetch(`/api/v1/registered-keys/${encodeURIComponent(id)}/reveal`, {
    ...opts,
  });
  if (!res.ok) {
    console.error(`Error: HTTP ${res.status}`);
    return 1;
  }
  const data = await res.json();
  console.log(data.key || data.apiKey || "(not available)");
  return 0;
}

export async function runKeysUsageCommand(id, opts = {}) {
  const limit = opts.limit || "20";
  const res = await apiFetch(
    `/api/v1/registered-keys/${encodeURIComponent(id)}/usage?limit=${limit}`,
    { ...opts }
  );
  if (!res.ok) {
    console.error(`Error: HTTP ${res.status}`);
    return 1;
  }
  const data = await res.json();
  const rows = data.usage || data.requests || data.items || [];
  if (rows.length === 0) {
    console.log("No usage data found.");
    return 0;
  }
  for (const r of rows) {
    const ts = r.timestamp || r.createdAt || "";
    const path = r.path || r.endpoint || "";
    const status = r.status || r.statusCode || "";
    console.log(`  ${ts}  ${String(status).padEnd(4)}  ${path}`);
  }
  return 0;
}
