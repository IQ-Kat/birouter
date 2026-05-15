const MASK_RE = /sk-[A-Za-z0-9]{4,}/g;

export const EXIT_CODES = Object.freeze({
  SUCCESS: 0,
  ERROR: 1,
  INVALID_ARG: 2,
  SERVER_OFFLINE: 3,
  AUTH: 4,
  RATE_LIMIT: 5,
  TIMEOUT: 124,
});

export function maskSecret(value) {
  if (typeof value !== "string") return value;
  return value.replace(MASK_RE, (m) => `${m.slice(0, 5)}***${m.slice(-4)}`);
}

function toRows(data) {
  if (Array.isArray(data)) return data;
  if (data !== null && typeof data === "object") return [data];
  return [{ value: data }];
}

function renderTable(rows) {
  if (rows.length === 0) {
    process.stdout.write("(empty)\n");
    return;
  }
  const keys = Array.from(
    rows.reduce((acc, row) => {
      for (const k of Object.keys(row)) acc.add(k);
      return acc;
    }, new Set())
  );

  const widths = keys.map((k) => Math.max(k.length, ...rows.map((r) => String(r[k] ?? "").length)));

  const sep = widths.map((w) => "-".repeat(w)).join("-+-");
  const header = keys.map((k, i) => k.padEnd(widths[i])).join(" | ");

  process.stdout.write(`${header}\n${sep}\n`);
  for (const row of rows) {
    const line = keys.map((k, i) => String(row[k] ?? "").padEnd(widths[i])).join(" | ");
    process.stdout.write(`${line}\n`);
  }
}

function renderCsv(rows) {
  if (rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  process.stdout.write(keys.map(csvEscape).join(",") + "\n");
  for (const row of rows) {
    process.stdout.write(keys.map((k) => csvEscape(String(row[k] ?? ""))).join(",") + "\n");
  }
}

function csvEscape(value) {
  if (/[",\r\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function emit(data, opts = {}) {
  const format = opts.output || "table";
  const rows = toRows(data);

  switch (format) {
    case "json":
      process.stdout.write(JSON.stringify(data, null, 2) + "\n");
      break;
    case "jsonl":
      for (const row of rows) process.stdout.write(JSON.stringify(row) + "\n");
      break;
    case "csv":
      renderCsv(rows);
      break;
    default:
      renderTable(rows);
  }
}

export function printHeading(title, quiet = false) {
  if (quiet) return;
  process.stderr.write(`\n\x1b[1m\x1b[36m${title}\x1b[0m\n\n`);
}

export function printSuccess(message, quiet = false) {
  if (quiet) return;
  process.stderr.write(`\x1b[32m✔ ${message}\x1b[0m\n`);
}

export function printInfo(message, quiet = false) {
  if (quiet) return;
  process.stderr.write(`\x1b[2m${message}\x1b[0m\n`);
}

export function printWarning(message) {
  process.stderr.write(`\x1b[33m⚠ ${message}\x1b[0m\n`);
}

export function printError(message) {
  process.stderr.write(`\x1b[31m✖ ${message}\x1b[0m\n`);
}

export function exitWith(code, message) {
  if (message) printError(message);
  process.exit(code);
}
