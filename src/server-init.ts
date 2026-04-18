// Server startup script
import initializeCloudSync from "./shared/services/initializeCloudSync";
import { enforceWebRuntimeEnv } from "./lib/env/runtimeEnv";
import { enforceSecrets } from "./shared/utils/secretsValidator";
import { initAuditLog, cleanupExpiredLogs, logAuditEvent } from "./lib/compliance/index";
import { initConsoleInterceptor } from "./lib/consoleInterceptor";
import { startBudgetResetJob } from "./lib/jobs/budgetResetJob";
import { getSettings } from "./lib/db/settings";
import { applyRuntimeSettings } from "./lib/config/runtimeSettings";
import { startRuntimeConfigHotReload } from "./lib/config/hotReload";
import { startSpendBatchWriter } from "./lib/spend/batchWriter";
import { registerDefaultGuardrails } from "./lib/guardrails";
import { ensurePersistentManagementPasswordHash } from "./lib/auth/managementPassword";
import { skillExecutor } from "./lib/skills/executor";
import { registerBuiltinSkills } from "./lib/skills/builtins";

async function startServer() {
  // Trigger request-log layout migration during startup, before serving requests.
  await import("./lib/usage/migrations");

  // Console interceptor: capture all console output to log file (must be first)
  initConsoleInterceptor();

  // FASE-01: Validate required secrets before anything else (fail-fast)
  enforceSecrets();
  enforceWebRuntimeEnv();

  // Compliance: Initialize audit_log table
  try {
    initAuditLog();
    console.log("[COMPLIANCE] Audit log table initialized");
  } catch (err) {
    console.warn("[COMPLIANCE] Could not initialize audit log:", err.message);
  }

  // Compliance: One-time cleanup of expired logs
  try {
    const cleanup = cleanupExpiredLogs();
    if (
      cleanup.deletedUsage ||
      cleanup.deletedCallLogs ||
      cleanup.deletedProxyLogs ||
      cleanup.deletedRequestDetailLogs ||
      cleanup.deletedAuditLogs ||
      cleanup.deletedMcpAuditLogs
    ) {
      console.log("[COMPLIANCE] Expired log cleanup:", cleanup);
    }
  } catch (err) {
    console.warn("[COMPLIANCE] Log cleanup failed:", err.message);
  }

  console.log("Starting server with cloud sync...");

  try {
    let settings = await getSettings();
    const passwordState = await ensurePersistentManagementPasswordHash({
      logger: console,
      settings,
      source: "startup",
    });
    settings = passwordState.settings;
    const runtimeChanges = await applyRuntimeSettings(settings, { force: true, source: "startup" });
    if (runtimeChanges.length > 0) {
      console.log(
        `[STARTUP] Runtime settings hydrated: ${runtimeChanges
          .map((entry) => entry.section)
          .join(", ")}`
      );
    }

    // Initialize cloud sync
    startSpendBatchWriter();
    registerDefaultGuardrails();
    registerBuiltinSkills(skillExecutor);
    console.log("[STARTUP] Spend batch writer started");
    console.log("[STARTUP] Guardrail registry initialized");
    console.log("[STARTUP] Builtin skill handlers registered");
    await initializeCloudSync();
    startBudgetResetJob();
    startRuntimeConfigHotReload();
    console.log("Server started with cloud sync initialized");

    // Log server start event to audit log
    logAuditEvent({
      action: "server.start",
      actor: "system",
      target: "server-runtime",
      resourceType: "maintenance",
      status: "success",
      details: { timestamp: new Date().toISOString() },
    });
  } catch (error) {
    console.error("[FATAL] Error initializing cloud sync:", error);
    process.exit(1);
  }

  // Pricing sync: opt-in external pricing data (non-blocking, never fatal)
  if (process.env.PRICING_SYNC_ENABLED === "true") {
    try {
      const { initPricingSync } = await import("./lib/pricingSync");
      await initPricingSync();
    } catch (err) {
      console.warn(
        "[PRICING_SYNC] Could not initialize:",
        err instanceof Error ? err.message : err
      );
    }
  }
}

// Start the server initialization
startServer().catch((err) => {
  console.error("[FATAL] Server initialization failed:", err);
  process.exit(1);
});

// Export for use as module if needed
export default startServer;
