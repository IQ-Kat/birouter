import { createHmac } from "node:crypto";
import nodeMachineId from "node-machine-id";

const { machineIdSync } = nodeMachineId;

const BUILTIN_DEFAULT_SALT = "omniroute-cli-auth-v1";

function getActiveSalt(): string {
  return process.env.OMNIROUTE_CLI_SALT || BUILTIN_DEFAULT_SALT;
}

function deriveToken(rawId: string, salt: string): string {
  return createHmac("sha256", rawId).update(salt).digest("hex");
}

let cached: string | null = null;
let cachedSalt: string | null = null;

export function getMachineTokenSync(salt?: string): string {
  const activeSalt = salt ?? getActiveSalt();
  try {
    // machineIdSync(true) returns the original unhashed hardware ID.
    const rawId = machineIdSync(true);
    if (activeSalt === cachedSalt && cached !== null) return cached;
    const token = deriveToken(rawId, activeSalt);
    if (!salt) {
      cached = token;
      cachedSalt = activeSalt;
    }
    return token;
  } catch {
    return "";
  }
}
