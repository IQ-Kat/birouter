/**
 * quota/quotaKey.ts — Resolve which connections and providers an API key may
 * use, based on its `allowedQuotas` pool-ID list.
 *
 * This is a pure read-side helper; it does NOT mutate any state.  Later tasks
 * (A3/A4) use the returned scope to enforce request-time restrictions.
 */

import { getPool } from "@/lib/db/quotaPools";
import { getProviderConnectionById } from "@/lib/db/providers";

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

export interface QuotaKeyScope {
  /** Provider-connection IDs the key is allowed to use (the pools' connections). */
  connectionIds: string[];
  /** Provider slugs of those connections (deduplicated). */
  providers: string[];
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
    return { connectionIds: [], providers: [] };
  }

  const connectionIdSet = new Set<string>();
  const providerSet = new Set<string>();

  for (const poolId of allowedQuotas) {
    const pool = getPool(poolId);
    if (!pool) continue;

    const connection = await getProviderConnectionById(pool.connectionId);
    if (!connection) continue;

    const provider = (connection as Record<string, unknown>).provider;
    if (typeof provider !== "string" || provider.length === 0) continue;

    connectionIdSet.add(pool.connectionId);
    providerSet.add(provider);
  }

  return {
    connectionIds: Array.from(connectionIdSet),
    providers: Array.from(providerSet),
  };
}
