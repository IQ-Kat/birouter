import { execFile } from "node:child_process";
import { t } from "../i18n.mjs";

export function registerDashboard(program) {
  program
    .command("dashboard")
    .alias("open")
    .description(t("dashboard.description"))
    .option("--url", t("dashboard.urlOnly"))
    .option("--port <port>", "Port the server is running on", "20128")
    .action(async (opts) => {
      const exitCode = await runDashboardCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runDashboardCommand(opts = {}) {
  const port = opts.port ? parseInt(String(opts.port), 10) : 20128;
  const dashboardUrl = `http://localhost:${port}`;

  if (opts.url) {
    console.log(dashboardUrl);
    return 0;
  }

  console.log(t("dashboard.opening", { url: dashboardUrl }));

  try {
    const open = await import("open");
    await open.default(dashboardUrl);
  } catch {
    await openFallback(dashboardUrl);
  }

  return 0;
}

function openFallback(url) {
  return new Promise((resolve) => {
    const { platform } = process;
    let cmd, args;

    if (platform === "darwin") {
      cmd = "open";
      args = [url];
    } else if (platform === "win32") {
      cmd = "cmd";
      args = ["/c", "start", "", url];
    } else {
      cmd = "xdg-open";
      args = [url];
    }

    execFile(cmd, args, { stdio: "ignore" }, () => resolve());
  });
}
