import { printInfo, printError } from "../io.mjs";
import { t } from "../i18n.mjs";

export function registerLogs(program) {
  program
    .command("logs")
    .description("Stream request logs")
    .option("--follow", "Stream logs in real-time")
    .option("--filter <level>", "Filter by level (error,warn,info) — comma-separated")
    .option("--lines <n>", "Number of lines to fetch", "100")
    .option("--timeout <ms>", "Connection timeout in ms", "30000")
    .option("--base-url <url>", "OmniRoute API base URL", "http://localhost:20128")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runLogsCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runLogsCommand(opts = {}) {
  const baseUrl = opts.baseUrl || opts["base-url"] || "http://localhost:20128";
  const follow = opts.follow ?? false;
  const filter = opts.filter ?? "";
  const lines = opts.lines || "100";
  const timeout = parseInt(String(opts.timeout || "30000"), 10);
  const isJson = opts.output === "json";

  const filters = filter ? filter.split(",").map((f) => f.trim()) : [];

  const { createLogStream } = await import("../../../src/lib/cli-helper/log-streamer.js");
  const { stream, stop } = createLogStream({ baseUrl, filters, follow, timeout });

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const processLine = (line) => {
    if (!line.trim()) return;
    if (isJson) {
      console.log(line);
      return;
    }
    try {
      const parsed = JSON.parse(line);
      const level = parsed.level || "info";
      const ts = parsed.timestamp || new Date().toISOString();
      const msg = parsed.message || JSON.stringify(parsed);
      const prefix =
        { error: "\x1b[31m[ERR]", warn: "\x1b[33m[WRN]", info: "\x1b[36m[INF]" }[level] || "[INF]";
      console.log(`${prefix}\x1b[0m ${ts} ${msg}`);
    } catch {
      console.log(line);
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() || "";
      for (const line of parts) processLine(line);
    }
    if (buffer) processLine(buffer);
  } catch (err) {
    if (err.name === "AbortError") {
      printInfo("Log stream stopped.");
    } else {
      printError(`Log stream error: ${err.message}`);
    }
  } finally {
    stop();
  }

  return 0;
}
