const MAX_SIGNATURES = 1000;
const TTL_MS = 1000 * 60 * 60;

type Entry = {
  signature: string;
  expiresAt: number;
};

const signatures = new Map<string, Entry>();

function pruneExpired() {
  const now = Date.now();
  for (const [key, value] of signatures.entries()) {
    if (value.expiresAt <= now) {
      signatures.delete(key);
    }
  }

  while (signatures.size > MAX_SIGNATURES) {
    const oldestKey = signatures.keys().next().value;
    if (!oldestKey) break;
    signatures.delete(oldestKey);
  }
}

export function storeGeminiThoughtSignature(toolCallId: unknown, signature: unknown) {
  if (typeof toolCallId !== "string" || !toolCallId) return;
  if (typeof signature !== "string" || !signature) return;

  pruneExpired();
  signatures.set(toolCallId, {
    signature,
    expiresAt: Date.now() + TTL_MS,
  });
}

export function getGeminiThoughtSignature(toolCallId: unknown) {
  if (typeof toolCallId !== "string" || !toolCallId) return null;

  pruneExpired();
  const entry = signatures.get(toolCallId);
  if (!entry) return null;
  return entry.signature;
}
