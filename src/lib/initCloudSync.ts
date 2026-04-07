import initializeCloudSync from "@/shared/services/initializeCloudSync";
import { startModelSyncScheduler } from "@/shared/services/modelSyncScheduler";
import "@/lib/tokenHealthCheck"; // Proactive token health-check scheduler

// Initialize background sync services when this module is imported
let initialized = false;

function isBackgroundServicesDisabled(): boolean {
  const raw = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (!raw) return false;
  return new Set(["1", "true", "yes", "on"]).has(raw.trim().toLowerCase());
}

export async function ensureCloudSyncInitialized() {
  if (isBackgroundServicesDisabled()) {
    return false;
  }
  if (!initialized) {
    try {
      await initializeCloudSync();
      startModelSyncScheduler();
      initialized = true;
    } catch (error) {
      console.error("[ServerInit] Error initializing background sync services:", error);
    }
  }
  return initialized;
}

// Auto-initialize when module loads
ensureCloudSyncInitialized().catch((err) => console.error("[CloudSync] ensure failed:", err));

export default ensureCloudSyncInitialized;
