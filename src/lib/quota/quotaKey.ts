/**
 * quota/quotaKey.ts — Resolve which connections and providers an API key may
 * use, based on its `allowedQuotas` pool-ID list.
 *
 * Also exports `reconcilePoolExclusivity` (Phase C3) which keeps each API
 * key's `allowedQuotas` in sync when a pool's allocations are saved with the
 * `exclusive` flag.
 */

import { getPool } from "@/lib/db/quotaPools";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getApiKeyById, updateApiKeyPermissions } from "@/lib/db/apiKeys";
import { quotaPoolSlug } from "./quotaModelNaming";

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

export interface QuotaKeyScope {
  /** Provider-connection IDs the key is allowed to use (the pools' connections). */
  connectionIds: string[];
  /** Provider slugs of those connections (deduplicated). */
  providers: string[];
  /** Alphanumeric pool slugs the key is scoped to (from quotaPoolSlug(pool.name)), deduplicated. */
  poolSlugs: string[];
}

/**
 * Constrain an existing connection allow-list to the connections belonging to a
 * quota key's pool scope.
 *
 * Semantics mirror `intersectAllowedConnectionIds` in chat.ts:
 *  - Empty `quotaConnectionIds` (non-quota key)  → return `existing` unchanged.
 *  - Empty / null `existing` (no prior constraint) → return `quotaConnectionIds`.
 *  - Both non-empty                               → intersection.
 *  - Disjoint sets                               → empty array (no eligible connection).
 *
 * This is a pure, synchronous function — easy to unit-test without DB setup.
 */
export function constrainConnectionsToQuota(
  existing: string[],
  quotaConnectionIds: string[]
): string[] {
  if (quotaConnectionIds.length === 0) return existing;
  if (existing.length === 0) return quotaConnectionIds;
  return existing.filter((id) => quotaConnectionIds.includes(id));
}

/**
 * Given the `allowedQuotas` field of an API key (array of quota-pool IDs),
 * returns the set of connection IDs and provider slugs that the key is
 * permitted to use.
 *
 * Behaviour:
 * - Empty / falsy input → `{ connectionIds: [], providers: [] }`.
 * - Pool IDs that do not resolve (missing pool, missing connection) are
 *   silently skipped — never throws.
 * - Both arrays are deduplicated; order is not guaranteed.
 */
export async function resolveQuotaKeyScope(
  allowedQuotas: string[] | null | undefined
): Promise<QuotaKeyScope> {
  if (!allowedQuotas || allowedQuotas.length === 0) {
    return { connectionIds: [], providers: [], poolSlugs: [] };
  }

  const connectionIdSet = new Set<string>();
  const providerSet = new Set<string>();
  const poolSlugSet = new Set<string>();

  for (const poolId of allowedQuotas) {
    const pool = getPool(poolId);
    if (!pool) continue;

    // D2: iterate ALL member connections (fall back to [connectionId] for any
    // un-backfilled row where connectionIds is empty/undefined — defensive).
    const connIds: string[] =
      Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
        ? pool.connectionIds
        : [pool.connectionId];

    for (const connId of connIds) {
      const connection = await getProviderConnectionById(connId);
      if (!connection) continue; // missing connection contributes nothing; don't abort

      const provider = (connection as Record<string, unknown>).provider;
      if (typeof provider !== "string" || provider.length === 0) continue;

      connectionIdSet.add(connId);
      providerSet.add(provider);
    }

    poolSlugSet.add(quotaPoolSlug(pool.name));
  }

  return {
    connectionIds: Array.from(connectionIdSet),
    providers: Array.from(providerSet),
    poolSlugs: Array.from(poolSlugSet),
  };
}

// ---------------------------------------------------------------------------
// Phase C3 — Exclusivity reconciliation
// ---------------------------------------------------------------------------

/**
 * Reconcile each affected API key's `allowedQuotas` when a pool's allocations
 * are saved with an `exclusive` flag.
 *
 * Rules:
 * - `exclusive === true` → keys in `nextApiKeyIds` get `poolId` ADDED to their
 *   `allowedQuotas`; keys that were in `prevApiKeyIds` but are no longer in
 *   `nextApiKeyIds` get `poolId` REMOVED.
 * - `exclusive === false` → `poolId` is REMOVED from ALL keys in the union of
 *   `prevApiKeyIds` and `nextApiKeyIds`.
 *
 * Only writes when the set actually changed (avoids needless DB round-trips).
 * Missing keys are silently skipped — this function never throws.
 */
export async function reconcilePoolExclusivity(
  poolId: string,
  prevApiKeyIds: string[],
  nextApiKeyIds: string[],
  exclusive: boolean,
): Promise<void> {
  const affectedIds = new Set([...prevApiKeyIds, ...nextApiKeyIds]);

  for (const keyId of affectedIds) {
    try {
      const keyRow = await getApiKeyById(keyId);
      if (!keyRow) continue;

      const currentQuotas: string[] = Array.isArray(
        (keyRow as Record<string, unknown>).allowedQuotas,
      )
        ? ((keyRow as Record<string, unknown>).allowedQuotas as string[])
        : [];

      let nextQuotas: string[];

      if (exclusive && nextApiKeyIds.includes(keyId)) {
        // Key is in the new allocation AND pool is exclusive → ensure poolId present.
        if (currentQuotas.includes(poolId)) {
          continue; // no change needed
        }
        nextQuotas = [...currentQuotas, poolId];
      } else {
        // Pool is non-exclusive OR key was removed → ensure poolId absent.
        if (!currentQuotas.includes(poolId)) {
          continue; // no change needed
        }
        nextQuotas = currentQuotas.filter((q) => q !== poolId);
      }

      await updateApiKeyPermissions(keyId, { allowedQuotas: nextQuotas });
    } catch {
      // Defensive: a single key failure must never abort reconciliation for others.
    }
  }
}
