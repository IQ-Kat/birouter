import { Option } from "commander";
import { printHeading } from "../io.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

const VALID_STRATEGIES = [
  "priority",
  "weighted",
  "round-robin",
  "p2c",
  "random",
  "auto",
  "lkgp",
  "context-optimized",
  "context-relay",
  "fill-first",
  "cost-optimized",
  "least-used",
  "strict-random",
  "reset-aware",
];

export function registerCombo(program) {
  const combo = program.command("combo").description(t("combo.title"));

  combo
    .command("list")
    .description("List configured routing combos")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("switch <name>")
    .description("Activate a routing combo")
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboSwitchCommand(name, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("create <name>")
    .description("Create a new routing combo")
    .addOption(
      new Option("--strategy <strategy>", "Routing strategy")
        .choices(VALID_STRATEGIES)
        .default("priority")
    )
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboCreateCommand(name, opts.strategy, {
        ...opts,
        output: globalOpts.output,
      });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("delete <name>")
    .description("Delete a routing combo")
    .option("--yes", "Skip confirmation")
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboDeleteCommand(name, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runComboListCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    // TODO(1.5): replace raw SQL with src/lib/db/combos.ts
    const combos = db
      .prepare("SELECT id, name, strategy, enabled, target_count FROM combos ORDER BY name")
      .all();

    let activeCombo = null;
    try {
      const serverUp = await isServerUp();
      if (serverUp) {
        const res = await apiFetch("/api/combos/active", {
          retry: false,
          timeout: 3000,
          acceptNotOk: true,
        });
        if (res.ok) {
          const data = await res.json();
          activeCombo = data.active || data.name || data.combo || null;
        }
      }
    } catch {}

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify({ combos, active: activeCombo }, null, 2));
      return 0;
    }

    printHeading(t("combo.title"));
    if (combos.length === 0) {
      console.log(t("combo.noCombos"));
      return 0;
    }

    for (const combo of combos) {
      const isActive = activeCombo && (combo.name === activeCombo || combo.id === activeCombo);
      const icon = isActive ? "\x1b[32m●\x1b[0m" : "\x1b[2m○\x1b[0m";
      const status = combo.enabled ? "\x1b[32menabled\x1b[0m" : "\x1b[31mdisabled\x1b[0m";
      const strategy = (combo.strategy || "priority").padEnd(12);
      console.log(`  ${icon} ${combo.name.padEnd(25)} [${strategy}] ${status}`);
    }

    return 0;
  } finally {
    db.close();
  }
}

export async function runComboSwitchCommand(name, opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  const serverUp = await isServerUp();
  if (serverUp) {
    try {
      const res = await apiFetch("/api/combos/switch", {
        method: "POST",
        body: { name },
        retry: false,
        acceptNotOk: true,
      });
      if (res.ok) {
        console.log(t("combo.switched", { name }));
        return 0;
      }
    } catch {}
  }

  // DB fallback
  const { db } = await openOmniRouteDb();
  try {
    // TODO(1.5): replace raw SQL with src/lib/db/combos.ts
    const combo = db.prepare("SELECT id FROM combos WHERE name = ?").get(name);
    if (!combo) {
      console.error(`Combo '${name}' not found.`);
      return 1;
    }

    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'activeCombo', ?)"
    ).run(JSON.stringify(name));

    console.log(t("combo.switched", { name }));
    return 0;
  } finally {
    db.close();
  }
}

export async function runComboCreateCommand(name, strategy = "priority", opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  if (!VALID_STRATEGIES.includes(strategy)) {
    console.error(`Invalid strategy '${strategy}'. Valid: ${VALID_STRATEGIES.join(", ")}`);
    return 1;
  }

  const { db } = await openOmniRouteDb();
  try {
    // TODO(1.5): replace raw SQL with src/lib/db/combos.ts
    const existing = db.prepare("SELECT id FROM combos WHERE name = ?").get(name);
    if (existing) {
      console.error(`Combo '${name}' already exists. Delete it first.`);
      return 1;
    }

    db.prepare(
      "INSERT INTO combos (name, strategy, enabled, target_count) VALUES (?, ?, 1, 0)"
    ).run(name, strategy);

    console.log(t("combo.created", { name }));
    return 0;
  } finally {
    db.close();
  }
}

export async function runComboDeleteCommand(name, opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("combo.confirmDelete", { name }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  const { db } = await openOmniRouteDb();
  try {
    // TODO(1.5): replace raw SQL with src/lib/db/combos.ts
    const result = db.prepare("DELETE FROM combos WHERE name = ?").run(name);
    if (result.changes > 0) {
      console.log(t("combo.deleted", { name }));
      return 0;
    }
    console.error(`Combo '${name}' not found.`);
    return 1;
  } finally {
    db.close();
  }
}
