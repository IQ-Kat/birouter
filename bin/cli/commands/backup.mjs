import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";
import { dirname, join, extname, basename } from "node:path";
import { homedir } from "node:os";
import { resolveDataDir } from "../data-dir.mjs";
import { apiFetch, isServerUp } from "../api.mjs";
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
  const backup = program.command("backup").description(t("backup.description"));

  backup
    .command("create")
    .description(t("backup.createDescription"))
    .option("--name <name>", t("backup.nameOpt"))
    .option("--cloud", t("backup.cloudOpt"))
    .option("--encrypt", t("backup.encryptOpt"))
    .option("--key-file <path>", t("backup.keyFileOpt"))
    .option("--exclude <pattern>", t("backup.excludeOpt"), (v, prev = []) => [...prev, v], [])
    .option("--retention <n>", t("backup.retentionOpt"), parseInt)
    .action(async (opts) => {
      const exitCode = await runBackupCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });

  const auto = backup.command("auto").description(t("backup.auto.title"));

  auto
    .command("enable")
    .description(t("backup.auto.enableDescription"))
    .option("--cron <expr>", t("backup.auto.cronOpt"), "0 3 * * *")
    .option("--cloud", t("backup.cloudOpt"))
    .option("--encrypt", t("backup.encryptOpt"))
    .option("--retention <n>", t("backup.retentionOpt"), parseInt)
    .action(async (opts) => {
      const exitCode = await runBackupAutoEnableCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });

  auto
    .command("disable")
    .description(t("backup.auto.disableDescription"))
    .action(async () => {
      const exitCode = await runBackupAutoDisableCommand();
      if (exitCode !== 0) process.exit(exitCode);
    });

  auto
    .command("status")
    .description(t("backup.auto.statusDescription"))
    .action(async () => {
      const exitCode = await runBackupAutoStatusCommand();
      if (exitCode !== 0) process.exit(exitCode);
    });

  // Legacy: `omniroute backup` without subcommand still creates a backup
  backup.action(async (opts) => {
    const exitCode = await runBackupCommand(opts);
    if (exitCode !== 0) process.exit(exitCode);
  });
  backup
    .option("--name <name>", t("backup.nameOpt"))
    .option("--cloud", t("backup.cloudOpt"))
    .option("--encrypt", t("backup.encryptOpt"))
    .option("--key-file <path>", t("backup.keyFileOpt"))
    .option("--exclude <pattern>", t("backup.excludeOpt"), (v, prev = []) => [...prev, v], [])
    .option("--retention <n>", t("backup.retentionOpt"), parseInt);
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

function matchesGlob(fileName, pattern) {
  if (!pattern.includes("*")) return fileName === pattern || fileName.startsWith(pattern);
  const parts = pattern.split("*");
  if (parts.length !== 2) return false;
  const [prefix, suffix] = parts;
  return (
    fileName.startsWith(prefix) &&
    fileName.endsWith(suffix) &&
    fileName.length >= prefix.length + suffix.length
  );
}

function shouldExclude(fileName, patterns) {
  if (!patterns || patterns.length === 0) return false;
  return patterns.some((p) => matchesGlob(fileName, p));
}

function encryptFile(srcPath, destPath, passphrase) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = scryptSync(passphrase, salt, 32);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = readFileSync(srcPath);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Format: salt(16) + iv(12) + authTag(16) + ciphertext
  writeFileSync(destPath, Buffer.concat([salt, iv, authTag, encrypted]));
}

async function promptPassphrase() {
  const readline = await import("node:readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(t("backup.passphrasePrompt"), (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function pruneBackups(backupDir, retention) {
  if (!retention || retention <= 0 || !existsSync(backupDir)) return;
  try {
    const dirs = readdirSync(backupDir)
      .filter((f) => f.startsWith("omniroute-backup-"))
      .sort()
      .reverse();
    for (const old of dirs.slice(retention)) {
      const { rmSync } = await import("node:fs");
      rmSync(join(backupDir, old), { recursive: true, force: true });
    }
  } catch {}
}

export async function runBackupCommand(opts = {}) {
  const dataDir = resolveDataDir();
  const backupDir = getBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const backupName = opts.name ? `omniroute-backup-${opts.name}` : `omniroute-backup-${timestamp}`;
  const backupPath = join(backupDir, backupName);
  const excludePatterns = opts.exclude || [];

  console.log(t("backup.creating"));

  let passphrase = null;
  if (opts.encrypt) {
    if (opts.keyFile) {
      passphrase = readFileSync(opts.keyFile, "utf8").trim();
    } else {
      passphrase = await promptPassphrase();
      if (!passphrase) {
        console.error(t("backup.noPassphrase"));
        return 1;
      }
    }
  }

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
      if (shouldExclude(file.name, excludePatterns)) {
        skipped++;
        continue;
      }
      const sourcePath = join(dataDir, file.name);
      if (existsSync(sourcePath)) {
        const destName = opts.encrypt ? `${file.name}.enc` : file.name;
        const destPath = join(backupPath, destName);
        mkdirSync(dirname(destPath), { recursive: true });
        if (file.name.endsWith(".sqlite") && Database) {
          const db = new Database(sourcePath, { readonly: true });
          const tmpPath = destPath.replace(/\.enc$/, "");
          await db.backup(tmpPath);
          db.close();
          if (opts.encrypt) {
            encryptFile(tmpPath, destPath, passphrase);
            const { unlinkSync } = await import("node:fs");
            unlinkSync(tmpPath);
          }
        } else if (opts.encrypt) {
          encryptFile(sourcePath, destPath, passphrase);
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
        encrypted: !!opts.encrypt,
        files: FILES_TO_BACKUP.filter(
          (f) => existsSync(join(dataDir, f.name)) && !shouldExclude(f.name, excludePatterns)
        ).map((f) => (opts.encrypt ? `${f.name}.enc` : f.name)),
      };
      writeFileSync(join(backupPath, "backup-info.json"), JSON.stringify(info, null, 2), "utf8");

      if (opts.cloud) {
        const cloudCode = await _uploadBackupToCloud(backupPath, info);
        if (cloudCode !== 0) {
          console.warn(t("backup.cloudFailed"));
        }
      }

      if (opts.retention) {
        await pruneBackups(backupDir, opts.retention);
      }

      console.log(t("backup.done", { path: backupPath }));
      console.log(
        `\x1b[2m  ${backedUp} backed up, ${skipped} skipped${opts.encrypt ? " (encrypted)" : ""}\x1b[0m`
      );
      return 0;
    }

    console.log(t("backup.noFiles"));
    return 0;
  } catch (err) {
    console.error(t("backup.failed", { error: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

async function _uploadBackupToCloud(backupPath, info) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.warn(t("common.serverOffline"));
    return 1;
  }
  try {
    const res = await apiFetch("/api/db-backups/cloud", {
      method: "POST",
      body: { backupPath, info },
      retry: false,
      timeout: 30000,
      acceptNotOk: true,
    });
    if (res.ok) {
      const data = await res.json();
      console.log(t("backup.cloudUploaded", { url: data.url || "(stored)" }));
      return 0;
    }
    return 1;
  } catch {
    return 1;
  }
}

const BACKUP_SCHEDULE_PATH = join(homedir(), ".omniroute", "backup-schedule.json");

export async function runBackupAutoEnableCommand(opts = {}) {
  const schedule = {
    enabled: true,
    cron: opts.cron || "0 3 * * *",
    cloud: !!opts.cloud,
    encrypt: !!opts.encrypt,
    retention: opts.retention || null,
    updatedAt: new Date().toISOString(),
  };
  mkdirSync(dirname(BACKUP_SCHEDULE_PATH), { recursive: true });
  writeFileSync(BACKUP_SCHEDULE_PATH, JSON.stringify(schedule, null, 2), "utf8");
  console.log(t("backup.auto.enabled", { cron: schedule.cron }));
  console.log(t("backup.auto.hint"));
  return 0;
}

export async function runBackupAutoDisableCommand() {
  if (existsSync(BACKUP_SCHEDULE_PATH)) {
    const schedule = JSON.parse(readFileSync(BACKUP_SCHEDULE_PATH, "utf8"));
    schedule.enabled = false;
    schedule.updatedAt = new Date().toISOString();
    writeFileSync(BACKUP_SCHEDULE_PATH, JSON.stringify(schedule, null, 2), "utf8");
  }
  console.log(t("backup.auto.disabled"));
  return 0;
}

export async function runBackupAutoStatusCommand() {
  if (!existsSync(BACKUP_SCHEDULE_PATH)) {
    console.log(t("backup.auto.notConfigured"));
    return 0;
  }
  const schedule = JSON.parse(readFileSync(BACKUP_SCHEDULE_PATH, "utf8"));
  const statusLabel = schedule.enabled ? "\x1b[32m● enabled\x1b[0m" : "\x1b[31m○ disabled\x1b[0m";
  console.log(`${t("backup.auto.title")}: ${statusLabel}`);
  console.log(`  cron:      ${schedule.cron}`);
  console.log(`  cloud:     ${schedule.cloud ? "yes" : "no"}`);
  console.log(`  encrypt:   ${schedule.encrypt ? "yes" : "no"}`);
  console.log(`  retention: ${schedule.retention ?? "unlimited"}`);
  return 0;
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
