import { execSync, execFileSync } from "child_process";

function getMachineIdRaw(): string {
  if (process.platform === "win32") {
    const sysRoot = process.env.SystemRoot || process.env.windir || "C:\\Windows";
    const output = execFileSync(
      `${sysRoot}\\System32\\REG.exe`,
      ["QUERY", "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"],
      { encoding: "utf8" }
    );
    return (
      output
        .toString()
        .split("REG_SZ")[1]
        ?.replace(/\r+|\n+|\s+/gi, "")
        ?.toLowerCase() ?? ""
    );
  }
  if (process.platform === "darwin") {
    const output = execSync("ioreg -rd1 -c IOPlatformExpertDevice", { encoding: "utf8" });
    return (
      output
        .split("IOPlatformUUID")[1]
        ?.split("\n")[0]
        ?.replace(/\=|\s+|\"/gi, "")
        ?.toLowerCase() ?? ""
    );
  }
  const output = execSync(
    "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :",
    { encoding: "utf8" }
  );
  return output
    .toString()
    .replace(/\r+|\n+|\s+/gi, "")
    .toLowerCase();
}

/**
 * Get consistent machine ID using native registry/OS query with salt
 * This ensures the same physical machine gets the same ID across runs
 *
 * @param {string} salt - Optional salt to use (defaults to environment variable)
 * @returns {Promise<string>} Machine ID (16-character base32)
 */
export async function getConsistentMachineId(salt = null) {
  const saltValue = salt || process.env.MACHINE_ID_SALT || "endpoint-proxy-salt";
  try {
    const rawMachineId = getMachineIdRaw();
    // Create consistent ID using salt
    const crypto = await import("crypto");
    const hashedMachineId = crypto
      .createHash("sha256")
      .update(rawMachineId + saltValue)
      .digest("hex");
    // Return only first 16 characters for brevity
    return hashedMachineId.substring(0, 16);
  } catch (error) {
    console.log("Error getting machine ID:", error);
    // Fallback to random ID if node-machine-id fails
    try {
      const cryptoFallback = await import("crypto");
      return cryptoFallback.randomUUID();
    } catch {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
}

/**
 * Get raw machine ID without hashing (for debugging purposes)
 * @returns {Promise<string>} Raw machine ID
 */
export async function getRawMachineId() {
  try {
    return getMachineIdRaw();
  } catch (error) {
    console.log("Error getting raw machine ID:", error);
    // Fallback to random ID if node-machine-id fails
    try {
      const cryptoFallback = await import("crypto");
      return cryptoFallback.randomUUID();
    } catch {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
}

/**
 * Check if we're running in browser or server environment
 * @returns {boolean} True if in browser, false if in server
 */
export function isBrowser() {
  return typeof window !== "undefined";
}
