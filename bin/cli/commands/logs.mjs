import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { printHeading, printInfo, printError } from "../io.mjs";

function printLogsHelp() {
  console.log(`
Usage:
  omniroute logs [options]

Options:
  --follow              Stream logs in real-time
  --filter <level>      Filter by level (error, warn, info) — comma-separated
  --lines <n>           Number of lines to fetch (default: 100)
  --timeout <ms>        Connection timeout in ms (default: 30000)
  --base-url <url>      OmniRoute API base URL (default: http://localhost:20128)
  --json                Output as JSON
  --help                Show this help
`);
}

export async function runLogsCommand(argv) {
  const { flags } = parseArgs(argv);

  if (hasFlag(flags, "help") || hasFlag(flags, "h")) {
    printLogsHelp();
    return 0;
  }

  const baseUrl = getStringFlag(flags, "base-url") || "http://localhost:20128";
  const follow = hasFlag(flags, "follow");
  const filter = getStringFlag(flags, "filter");
  const lines = getStringFlag(flags, "lines") || "100";
  const timeout = parseInt(getStringFlag(flags, "timeout") || "30000", 10);

  const filters = filter ? filter.split(",").map((f) => f.trim()) : [];

  const { createLogStream } = await import("../../../src/lib/cli-helper/log-streamer.js");
  const { stream, stop } = createLogStream({ baseUrl, filters, follow, timeout });

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const processLine = (line) => {
    if (!line.trim()) return;
    if (hasFlag(flags, "json")) {
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
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) processLine(line);
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
