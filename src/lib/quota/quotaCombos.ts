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
import { PROVIDER_MODELS } from "@omniroute/open-sse/config/providerModels";
import { quotaModelName, parseQuotaModelName, isQuotaModelName, quotaPoolSlug } from "./quotaModelNaming";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("quota/quotaCombos");

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the provider slug for a pool's connection.
 * Returns null when the pool or connection cannot be found, or when the
 * provider field is missing/empty.
 */
async function resolvePoolProvider(poolId: string): Promise<{
  pool: { id: string; connectionId: string; name: string };
  provider: string;
} | null> {
  const pool = getPool(poolId);
  if (!pool) return null;

  let connection: Record<string, unknown> | null = null;
  try {
    connection = (await getProviderConnectionById(pool.connectionId)) as Record<
      string,
      unknown
    > | null;
  } catch {
    return null;
  }
  if (!connection) return null;

  const provider = connection.provider;
  if (typeof provider !== "string" || provider.length === 0) return null;

  return { pool, provider };
}

/**
 * Return the list of model IDs for a provider from the static registry.
 * Empty array when the provider is unknown or has no registered models.
 */
function getProviderModelIds(provider: string): string[] {
  const models = PROVIDER_MODELS[provider];
  if (!Array.isArray(models) || models.length === 0) return [];
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
  const resolved = await resolvePoolProvider(poolId);

  if (!resolved) {
    // Pool or connection gone — prune any leftover combos if we can find the
    // pool slug from poolId (best effort: we won't have the name, so skip).
    await removeQuotaCombosForPool(poolId);
    return;
  }

  const { pool, provider } = resolved;
  const poolSlug = quotaPoolSlug(pool.name);
  const modelIds = getProviderModelIds(provider);

  // Build the set of desired combo names
  const desiredNames = new Set(
    modelIds.map((modelId) => quotaModelName(pool.name, provider, modelId))
  );

  // Upsert each desired combo
  for (const modelId of modelIds) {
    const comboName = quotaModelName(pool.name, provider, modelId);
    try {
      const existing = await getComboByName(comboName);
      const modelString = `${provider}/${modelId}`;
      const step = {
        kind: "model" as const,
        model: modelString,
        providerId: provider,
        connectionId: pool.connectionId,
        weight: 100,
      };

      if (existing && typeof existing.id === "string") {
        // Update to ensure connectionId / step is current
        await updateCombo(existing.id, {
          name: comboName,
          models: [step],
          strategy: "priority",
          isHidden: true,
        });
      } else {
        await createCombo({
          name: comboName,
          models: [step],
          strategy: "priority",
          isHidden: true,
        });
      }
    } catch (err) {
      log.warn({ err: (err as Error)?.message, comboName, poolId }, "quota-combo upsert failed");
    }
  }

  // Prune stale combos that belong to this pool slug but are no longer desired
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
    if (parsed.poolSlug !== poolSlug) continue;

    // Belongs to this pool slug but not in the desired set → prune
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
    return parsed !== null && slugSet.has(parsed.poolSlug);
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
    if (slug !== null && parsed.poolSlug !== slug) continue;

    try {
      await deleteComboByName(name);
    } catch (err) {
      log.warn({ err: (err as Error)?.message, comboName: name, poolId }, "quota-combo remove failed");
    }
  }
}
