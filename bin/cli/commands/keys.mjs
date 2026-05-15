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
