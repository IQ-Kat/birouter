/**
 * quota/quotaCombos.ts — Auto-mint / prune `quotaShared-*` virtual combo models
 * when a quota pool gains or loses allocations (Phase B2).
 *
 * Each combo routes to a single {provider, model} target and is pinned to the
 * pool's connectionId via ComboModelStep.connectionId (supported by the combo
 * target schema). Phase B4 wires resolution — this module only keeps the combo
 * rows in sync with the pool's provider model list.
 *
 * Guard: combo-sync failures never propagate to pool CRUD callers.
 */

import { getPool } from "@/lib/db/quotaPools";
import { getProviderConnectionById } from "@/lib/db/providers";
import {
  getCombos,
  createCombo,
  deleteComboByName,
  getComboByName,
  updateCombo,
} from "@/lib/db/combos";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { quotaModelName, parseQuotaModelName, isQuotaModelName, quotaPoolSlug } from "./quotaModelNaming";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("quota/quotaCombos");

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the pool record for combo-sync purposes.
 * Returns null when the pool cannot be found.
 * Individual connection lookups are deferred to syncQuotaCombos so that a
 * single missing connection does not abort the whole sync.
 */
async function resolvePoolForSync(poolId: string): Promise<{
  pool: { id: string; connectionId: string; connectionIds: string[]; name: string };
} | null> {
  const pool = getPool(poolId);
  if (!pool) return null;

  // Defensive: ensure connectionIds is always a non-empty array.
  const connectionIds: string[] =
    Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
      ? pool.connectionIds
      : [pool.connectionId];

  return { pool: { id: pool.id, connectionId: pool.connectionId, connectionIds, name: pool.name } };
}

/**
 * Return the list of model IDs for a provider from the provider REGISTRY — the
 * SAME source `/v1/models` uses. PROVIDER_MODELS only covers plain API providers
 * and is empty for CLI/OAuth providers (codex, kimi, claude, …), which silently
 * produced ZERO quotaShared-* combos. REGISTRY has all of them.
 * Empty array when the provider is unknown or has no registered models.
 */
function getProviderModelIds(provider: string): string[] {
  const entry = REGISTRY[provider as keyof typeof REGISTRY] as { models?: unknown } | undefined;
  const models = entry && Array.isArray(entry.models) ? entry.models : [];
  if (models.length === 0) return [];
  return models
    .map((m) => (typeof m === "object" && m !== null && typeof (m as { id?: unknown }).id === "string" ? (m as { id: string }).id : null))
    .filter((id): id is string => id !== null && id.length > 0);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Synchronise `quotaShared-*` combos for a pool:
 *
 * 1. Resolve pool → connection → provider.
 * 2. For each model in PROVIDER_MODELS[provider], upsert a combo named
 *    `quotaModelName(pool.name, provider, model)` with a single model-step
 *    pinned to the pool's connectionId.
 * 3. Prune stale quota combos for this pool slug that are no longer in the
 *    desired set.
 *
 * Idempotent: running twice produces no changes on the second call.
 * Defensive: missing pool, missing connection, or empty model list → prune to
 * empty without throwing.
 */
export async function syncQuotaCombos(poolId: string): Promise<void> {
  const resolved = await resolvePoolForSync(poolId);

  if (!resolved) {
    // Pool gone — prune any leftover combos (best effort).
    await removeQuotaCombosForPool(poolId);
    return;
  }

  const { pool } = resolved;
  const poolSlug = quotaPoolSlug(pool.name);

  // D2: build desired names as the UNION across ALL member connections.
  // A missing connection (no DB row / no provider field) is silently skipped —
  // it contributes nothing to the desired set but does NOT abort the whole sync.
  const desiredNames = new Set<string>();

  // Track (connId, provider, modelIds) tuples for upsert, in order.
  const upsertWork: Array<{ connId: string; provider: string; modelIds: string[] }> = [];

  for (const connId of pool.connectionIds) {
    let connection: Record<string, unknown> | null = null;
    try {
      connection = (await getProviderConnectionById(connId)) as Record<string, unknown> | null;
    } catch {
      // Connection lookup failure — skip this connection.
      continue;
    }
    if (!connection) continue;

    const provider = connection.provider;
    if (typeof provider !== "string" || provider.length === 0) continue;

    const modelIds = getProviderModelIds(provider);
    if (modelIds.length === 0) continue;

    for (const modelId of modelIds) {
      desiredNames.add(quotaModelName(pool.name, provider, modelId));
    }
    upsertWork.push({ connId, provider, modelIds });
  }

  // Group steps by model across all connections (Task 3 guarantees a single provider).
  // This produces one combo per model with ALL connections' steps + strategy "fill-first",
  // fixing the collision where two same-provider connections would overwrite each other.
  const byModel = new Map<string, Array<{ connId: string; provider: string }>>();
  for (const { connId, provider, modelIds } of upsertWork) {
    for (const modelId of modelIds) {
      const arr = byModel.get(modelId) ?? [];
      arr.push({ connId, provider });
      byModel.set(modelId, arr);
    }
  }
  for (const [modelId, conns] of byModel) {
    const provider = conns[0].provider;
    const comboName = quotaModelName(pool.name, provider, modelId);
    const steps = conns.map((c) => ({
      kind: "model" as const,
      model: `${provider}/${modelId}`,
      providerId: provider,
      connectionId: c.connId,
      weight: 100,
    }));
    try {
      const existing = await getComboByName(comboName);
      const payload = { name: comboName, models: steps, strategy: "fill-first" as const, isHidden: true };
      if (existing && typeof existing.id === "string") await updateCombo(existing.id, payload);
      else await createCombo(payload);
    } catch (err) {
      log.warn({ err: (err as Error)?.message, comboName, poolId }, "quota-combo upsert failed");
    }
  }

  // Prune stale combos that belong to this pool slug but are no longer in the
  // desired set (union across all current connections).
  let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
  try {
    allCombos = await getCombos();
  } catch (err) {
    log.warn({ err: (err as Error)?.message, poolId }, "quota-combo prune: getCombos failed");
    return;
  }

  for (const combo of allCombos) {
    const name = typeof combo.name === "string" ? combo.name : null;
    if (!name) continue;
    if (!isQuotaModelName(name)) continue;

    const parsed = parseQuotaModelName(name);
    if (!parsed) continue;
    if (parsed.groupSlug !== poolSlug) continue;

    // Belongs to this pool slug but not produced by any current connection → prune.
    if (!desiredNames.has(name)) {
      try {
        await deleteComboByName(name);
      } catch (err) {
        log.warn({ err: (err as Error)?.message, comboName: name, poolId }, "quota-combo prune failed");
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Catalog filter helper (Phase B3)
// ---------------------------------------------------------------------------

/**
 * Given a flat model list and a set of pool slugs, return only the entries
 * whose `id` is a `quotaShared-*` virtual model name AND whose parsed
 * `poolSlug` is in `poolSlugs`.
 *
 * Fail-closed: an empty `poolSlugs` array returns an empty list — a
 * quota-exclusive API key with no resolvable pools sees NO models.
 *
 * Pure function — no I/O, easily unit-tested.
 */
export function filterModelsToQuotaPools<T extends { id: string }>(
  models: T[],
  poolSlugs: string[]
): T[] {
  if (poolSlugs.length === 0) return [];
  const slugSet = new Set(poolSlugs);
  return models.filter((m) => {
    if (!isQuotaModelName(m.id)) return false;
    const parsed = parseQuotaModelName(m.id);
    return parsed !== null && slugSet.has(parsed.groupSlug);
  });
}

/**
 * Delete ALL `quotaShared-*` combos that belong to the given pool.
 *
 * Used on pool deletion. Because the pool may already be gone from the DB when
 * this is called, we look up the pool name first; if missing, we fall back to
 * scanning all quota combos and deleting those whose parsed slug matches the
 * pool's last-known slug (best-effort via poolId as slug).
 */
export async function removeQuotaCombosForPool(poolId: string): Promise<void> {
  // Try to get the pool's name to compute the canonical slug
  const pool = getPool(poolId);
  const slug = pool ? quotaPoolSlug(pool.name) : null;

  let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
  try {
    allCombos = await getCombos();
  } catch (err) {
    log.warn({ err: (err as Error)?.message, poolId }, "removeQuotaCombosForPool: getCombos failed");
    return;
  }

  for (const combo of allCombos) {
    const name = typeof combo.name === "string" ? combo.name : null;
    if (!name) continue;
    if (!isQuotaModelName(name)) continue;

    const parsed = parseQuotaModelName(name);
    if (!parsed) continue;

    // Match by slug when we have a pool name; otherwise no match possible
    if (slug !== null && parsed.groupSlug !== slug) continue;

    try {
      await deleteComboByName(name);
    } catch (err) {
      log.warn({ err: (err as Error)?.message, comboName: name, poolId }, "quota-combo remove failed");
    }
  }
}
