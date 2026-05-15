import { createHmac } from "node:crypto";
import nodeMachineId from "node-machine-id";

const { machineIdSync } = nodeMachineId;

const DEFAULT_SALT = "omniroute-cli-auth";

function deriveToken(rawId: string, salt: string): string {
  return createHmac("sha256", rawId).update(salt).digest("hex").slice(0, 32);
}

let cached: string | null = null;

export function getMachineTokenSync(salt = DEFAULT_SALT): string {
  try {
    // machineIdSync(true) returns the original unhashed hardware ID.
    const rawId = machineIdSync(true);
    if (salt === DEFAULT_SALT) {
      cached ??= deriveToken(rawId, salt);
      return cached;
    }
    return deriveToken(rawId, salt);
  } catch {
    return "";
  }
}
