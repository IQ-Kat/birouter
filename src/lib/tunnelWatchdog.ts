import fs from "fs";
import path from "path";
import { getSettings } from "@/lib/db/settings";
import { getTailscaleTunnelStatus, enableTailscaleTunnel } from "@/lib/tailscaleTunnel";
import { getCloudflaredTunnelStatus, startCloudflaredTunnel } from "@/lib/cloudflaredTunnel";
import { getMitmStatus, startMitm } from "@/mitm/manager";
import { resolveDataDir } from "@/lib/dataPaths";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("tunnel-watchdog");

let watchdogInterval: NodeJS.Timeout | null = null;

async function checkAndResumeTunnels() {
  try {
    const settings = await getSettings();

    // 1. Tailscale Auto-Resume / Watchdog
    if (settings.tailscaleEnabled) {
      try {
        const tsStatus = await getTailscaleTunnelStatus();
        if (!tsStatus.running && tsStatus.supported && tsStatus.installed) {
          log.info("Tailscale tunnel is enabled but not running. Auto-resuming...");
          await enableTailscaleTunnel({ sudoPassword: "" });
        }
      } catch (err: any) {
        log.warn({ err: err.message }, "Tailscale auto-resume failed");
      }
    }

    // 2. Cloudflare Tunnel Auto-Resume / Watchdog
    try {
      const cfStatus = await getCloudflaredTunnelStatus();
      if (!cfStatus.running && cfStatus.supported && cfStatus.installed) {
        const statePath = path.join(resolveDataDir(), "cloudflared", "quick-tunnel-state.json");
        if (fs.existsSync(statePath)) {
          const state = JSON.parse(fs.readFileSync(statePath, "utf-8"));
          if (state.status === "running") {
            log.info("Cloudflare tunnel was previously running. Auto-resuming...");
            await startCloudflaredTunnel();
          }
        }
      }
    } catch (err: any) {
      log.warn({ err: err.message }, "Cloudflared auto-resume failed");
    }

    // 3. MITM Proxy Auto-Resume / Watchdog (Windows only, since it doesn't require password elevation prompt)
    if (process.platform === "win32") {
      try {
        const mitmStatus = await getMitmStatus();
        const pidFile = path.join(resolveDataDir(), "mitm", ".mitm.pid");
        // If the PID file exists but it's not running, it means it was previously running and shut down uncleanly.
        if (!mitmStatus.running && fs.existsSync(pidFile)) {
          log.info("MITM proxy was previously running (unclean shutdown). Auto-resuming...");
          const apiKey = process.env.ROUTER_API_KEY || "";
          await startMitm(apiKey, "");
        }
      } catch (err: any) {
        log.warn({ err: err.message }, "MITM auto-resume failed");
      }
    }
  } catch (err: any) {
    log.error({ err: err.message }, "Error in tunnel watchdog tick");
  }
}

export function startTunnelWatchdog() {
  if (watchdogInterval) return;

  // Run initial check on startup
  void checkAndResumeTunnels();

  // Set interval to run every 60 seconds
  watchdogInterval = setInterval(() => {
    void checkAndResumeTunnels();
  }, 60000);

  if (watchdogInterval.unref) {
    watchdogInterval.unref();
  }
  log.info("Tunnels watchdog started");
}

export function stopTunnelWatchdog() {
  if (watchdogInterval) {
    clearInterval(watchdogInterval);
    watchdogInterval = null;
    log.info("Tunnels watchdog stopped");
  }
}
