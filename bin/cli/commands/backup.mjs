import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { resolveDataDir } from "../data-dir.mjs";
import { t } from "../i18n.mjs";

function getBackupDir() {
  return join(resolveDataDir(), "backups");
}

const FILES_TO_BACKUP = [
  { name: "storage.sqlite" },
  { name: "settings.json" },
  { name: "combos.json" },
  { name: "providers.json" },
];

export function registerBackup(program) {
  program
    .command("backup")
    .description(t("backup.description"))
    .option("--name <name>", "Custom backup name")
    .action(async (opts) => {
      const exitCode = await runBackupCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export function registerRestore(program) {
  program
    .command("restore [backupId]")
    .description(t("backup.restoreDescription"))
    .option("--list", "List available backups")
    .option("--yes", "Skip confirmation")
    .action(async (backupId, opts) => {
      const exitCode = await runRestoreCommand(backupId, opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runBackupCommand(opts = {}) {
  const dataDir = resolveDataDir();
  const backupDir = getBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const backupName = opts.name ? `omniroute-backup-${opts.name}` : `omniroute-backup-${timestamp}`;
  const backupPath = join(backupDir, backupName);

  console.log(t("backup.creating"));

  try {
    if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });

    let Database;
    try {
      Database = (await import("better-sqlite3")).default;
    } catch {
      Database = null;
    }

    let backedUp = 0;
    let skipped = 0;

    for (const file of FILES_TO_BACKUP) {
      const sourcePath = join(dataDir, file.name);
      if (existsSync(sourcePath)) {
        const destPath = join(backupPath, file.name);
        mkdirSync(dirname(destPath), { recursive: true });
        if (file.name.endsWith(".sqlite") && Database) {
          const db = new Database(sourcePath, { readonly: true });
          await db.backup(destPath);
          db.close();
        } else {
          copyFileSync(sourcePath, destPath);
        }
        backedUp++;
      } else {
        skipped++;
      }
    }

    if (backedUp > 0) {
      const info = {
        timestamp: new Date().toISOString(),
        version: "omniroute-cli-v1",
        files: FILES_TO_BACKUP.filter((f) => existsSync(join(dataDir, f.name))).map((f) => f.name),
      };
      writeFileSync(join(backupPath, "backup-info.json"), JSON.stringify(info, null, 2), "utf8");
      console.log(t("backup.done", { path: backupPath }));
      console.log(`\x1b[2m  ${backedUp} backed up, ${skipped} skipped\x1b[0m`);
      return 0;
    }

    console.log(t("backup.noFiles"));
    return 0;
  } catch (err) {
    console.error(t("backup.failed", { error: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runRestoreCommand(backupId, opts = {}) {
  const backupDir = getBackupDir();

  if (opts.list || !backupId) {
    console.log(`\n\x1b[1m\x1b[36m${t("backup.listTitle")}\x1b[0m\n`);
    if (!existsSync(backupDir)) {
      console.log(t("backup.noBackups"));
      return 0;
    }

    try {
      const dirs = readdirSync(backupDir)
        .filter((f) => f.startsWith("omniroute-backup-"))
        .sort()
        .reverse();

      if (dirs.length === 0) {
        console.log(t("backup.noBackups"));
        return 0;
      }

      for (const dir of dirs) {
        const infoPath = join(backupDir, dir, "backup-info.json");
        if (existsSync(infoPath)) {
          const info = JSON.parse(readFileSync(infoPath, "utf8"));
          const id = dir.replace("omniroute-backup-", "");
          const dateStr = new Date(info.timestamp).toLocaleString();
          console.log(`  ${id}`);
          console.log(`\x1b[2m    ${dateStr} — ${info.files?.length || 0} files\x1b[0m`);
        } else {
          console.log(`\x1b[2m  ${dir.replace("omniroute-backup-", "")}\x1b[0m`);
        }
      }
    } catch (err) {
      console.error(
        t("common.error", { message: err instanceof Error ? err.message : String(err) })
      );
      return 1;
    }

    if (!backupId) console.log("\nUsage: omniroute restore <backup-id>");
    return 0;
  }

  const backupPath = join(backupDir, `omniroute-backup-${backupId}`);
  if (!existsSync(backupPath)) {
    console.error(t("backup.notFound", { name: backupId }));
    return 1;
  }

  const infoPath = join(backupPath, "backup-info.json");
  const ts = existsSync(infoPath) ? JSON.parse(readFileSync(infoPath, "utf8")).timestamp : backupId;

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("backup.confirmRestore", { ts }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  console.log(t("backup.restoring", { path: backupPath }));

  const dataDir = resolveDataDir();
  try {
    for (const file of FILES_TO_BACKUP) {
      const sourcePath = join(backupPath, file.name);
      if (existsSync(sourcePath)) {
        copyFileSync(sourcePath, join(dataDir, file.name));
        console.log(`\x1b[2m  Restored: ${file.name}\x1b[0m`);
      }
    }
    console.log(t("backup.restored"));
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
