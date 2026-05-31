/**
 * quota/quotaKey.ts — Resolve which connections and providers an API key may
 * use, based on its `allowedQuotas` pool-ID list.
 *
 * This is a pure read-side helper; it does NOT mutate any state.  Later tasks
 * (A3/A4) use the returned scope to enforce request-time restrictions.
 */

import { getPool } from "@/lib/db/quotaPools";
import { getProviderConnectionById } from "@/lib/db/providers";
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

    const connection = await getProviderConnectionById(pool.connectionId);
    if (!connection) continue;

    const provider = (connection as Record<string, unknown>).provider;
    if (typeof provider !== "string" || provider.length === 0) continue;

    connectionIdSet.add(pool.connectionId);
    providerSet.add(provider);
    poolSlugSet.add(quotaPoolSlug(pool.name));
  }

  return {
    connectionIds: Array.from(connectionIdSet),
    providers: Array.from(providerSet),
    poolSlugs: Array.from(poolSlugSet),
  };
}
