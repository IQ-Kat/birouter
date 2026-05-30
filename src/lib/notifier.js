import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "./dataDir.js";

/**
 * Send a notification to the system tray UI
 * @param {string} title - Notification title
 * @param {string} text - Notification body message
 * @param {string} icon - 'info' | 'warning' | 'error'
 */
export function sendNotification(title, text, icon = "info") {
  try {
    const file = path.join(DATA_DIR, "notifications.json");
    fs.writeFileSync(
      file,
      JSON.stringify({
        title,
        text,
        icon,
        timestamp: Date.now()
      }, null, 2)
    );
  } catch (e) {
    console.error("[Notifier] Failed to write notification:", e.message);
  }
}
