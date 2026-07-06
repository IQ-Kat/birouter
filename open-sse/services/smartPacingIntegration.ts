/**
 * Smart Pacing — Integration helper for chatCore.ts
 *
 * Wraps the existing accountSemaphore with smart pacing logic:
 * 1. Detects client type (interactive vs agent) for priority queuing
 * 2. Enforces minimum gaps between requests per connection
 * 3. Adds jitter to avoid bot-like regular patterns
 * 4. Human-simulation mode for sensitive OAuth providers
 * 5. Adapts pressure based on upstream response headers
 */

import {
  acquire as acquireAccountSemaphore,
  buildAccountSemaphoreKey,
} from "./accountSemaphore.ts";
import {
  acquirePacingSlotAsync,
  adaptFromResponseHeaders as adaptPacingFromHeaders,
  type SmartPacingSettings,
  type UpstreamResponseHeaders,
  type PacingSlot,
} from "./smartPacing.ts";

export interface SmartPacingAcquireOptions {
  provider: string;
  model: string;
  connectionId: string | null | undefined;
  maxConcurrency: number | null | undefined;
  semaphoreKey: string | null | undefined;
  settings: Record<string, unknown> | null | undefined;
  signal?: AbortSignal | null;
  headers?: Record<string, string | string[] | undefined> | Headers | null;
}

export interface SmartPacingRelease {
  release: () => void;
  pacingSlot: PacingSlot;
}

function extractPacingSettings(
  settings: Record<string, unknown> | null | undefined
): SmartPacingSettings | null {
  if (!settings) return null;

  const enabled = settings.smartPacingEnabled;
  const mode = settings.smartPacingMode;

  return {
    smartPacingEnabled: enabled === true || enabled === false ? enabled : undefined,
    smartPacingMode: mode === "off" || mode === "auto" || mode === "human-sim" ? mode : undefined,
    smartPacingProviderProfiles:
      settings.smartPacingProviderProfiles as SmartPacingSettings["smartPacingProviderProfiles"],
  };
}

export async function acquireSmartPacedSemaphore(
  options: SmartPacingAcquireOptions
): Promise<SmartPacingRelease> {
  const { provider, connectionId, maxConcurrency, semaphoreKey, signal } = options;
  const pacingSettings = extractPacingSettings(options.settings);
  const hasPacing =
    pacingSettings?.smartPacingEnabled !== false && pacingSettings?.smartPacingMode !== "off";

  // Step 1: Acquire pacing slot first (may queue/delay)
  const pacingSlot =
    hasPacing && connectionId
      ? await acquirePacingSlotAsync({
          connectionId,
          provider,
          settings: pacingSettings,
          headers: options.headers,
        })
      : { release: () => {}, delayed: false, delayMs: 0 };

  try {
    // Step 2: Acquire account semaphore (concurrency control)
    const semaphoreRelease =
      semaphoreKey && maxConcurrency != null && maxConcurrency > 0
        ? await acquireAccountSemaphore(semaphoreKey, {
            maxConcurrency,
            signal,
          })
        : () => {};

    const combinedRelease = () => {
      semaphoreRelease();
      pacingSlot.release();
    };

    return {
      release: combinedRelease,
      pacingSlot,
    };
  } catch (err) {
    // If semaphore acquisition fails, release pacing slot too
    pacingSlot.release();
    throw err;
  }
}

export function adaptPacingFromResponse(
  connectionId: string | null | undefined,
  responseHeaders:
    UpstreamResponseHeaders | Record<string, string | string[] | undefined> | null | undefined
): void {
  adaptPacingFromHeaders(connectionId, responseHeaders);
}

export type { SmartPacingSettings, PacingSlot };
