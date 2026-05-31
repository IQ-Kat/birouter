/**
 * db/quotaPools.ts — CRUD for quota_pools and quota_allocations tables.
 *
 * Quota pools group provider connections with per-API-key weight + cap +
 * policy allocations. Used by the Quota Sharing Engine (plan 22, Group B).
 *
 * All SQL goes through prepared statements — never raw string interpolation.
 * Import getDbInstance from ./core (Hard Rule #5).
 */

import { getDbInstance } from "./core";
// Phase B2: auto-mint/prune quotaShared-* combos when pool allocations change.
// Imported lazily (dynamic import in the hook) to avoid circular-dependency
// risk between db/ and quota/ modules. The import is fire-and-forget; combo
// failures never break pool CRUD.
async function syncQuotaCombosGuarded(poolId: string): Promise<void> {
  try {
    const { syncQuotaCombos } = await import("@/lib/quota/quotaCombos");
    await syncQuotaCombos(poolId);
  } catch (err) {
    // Guard: combo-sync failure must never break pool CRUD callers.
    console.warn("[quota-pools] syncQuotaCombos failed (non-fatal):", (err as Error)?.message);
  }
}

async function removeQuotaCombosGuarded(poolId: string): Promise<void> {
  try {
    const { removeQuotaCombosForPool } = await import("@/lib/quota/quotaCombos");
    await removeQuotaCombosForPool(poolId);
  } catch (err) {
    console.warn("[quota-pools] removeQuotaCombosForPool failed (non-fatal):", (err as Error)?.message);
  }
}

// ---------------------------------------------------------------------------
// Local type shapes (aligned with src/lib/quota/dimensions.ts — merged by F7)
// ---------------------------------------------------------------------------

type QuotaUnit = "percent" | "requests" | "tokens" | "usd";
type Policy = "hard" | "soft" | "burst";

export interface PoolAllocation {
  apiKeyId: string;
  weight: number;
  capValue?: number;
  capUnit?: QuotaUnit;
  policy: Policy;
}

export interface QuotaPool {
  id: string;
  /** Primary / legacy single connection. Kept for back-compat. */
  connectionId: string;
  /** All member connections (≥1 after backfill). Primary is always connectionIds[0]. */
  connectionIds: string[];
  name: string;
  createdAt: string;
  allocations: PoolAllocation[];
}

export interface PoolCreate {
  connectionId: string;
  name: string;
  allocations?: PoolAllocation[];
  /**
   * Full member list. When provided, connectionId is ignored for the join table
   * and connectionIds[0] is used as the primary. When omitted, defaults to
   * [connectionId].
   */
  connectionIds?: string[];
}

export interface PoolUpdate {
  name?: string;
  allocations?: PoolAllocation[];
  /**
   * When provided, replaces the entire join-table membership for this pool.
   * connection_id column is synced to connectionIds[0].
   */
  connectionIds?: string[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

/**
 * Asserts that all connections in the list belong to the same provider.
 * Throws if mixed providers are detected. No-op when list has 0 or 1 entry.
 * Uses a single DISTINCT query against provider_connections (sync — better-sqlite3).
 */
function assertSingleProvider(connectionIds: string[]): void {
  if (!connectionIds || connectionIds.length <= 1) return;
  const db = getDb();
  const placeholders = connectionIds.map(() => "?").join(",");
  const rows = db
    .prepare<{ provider: string }>(
      `SELECT DISTINCT provider FROM provider_connections WHERE id IN (${placeholders})`
    )
    .all(...connectionIds);
  const providers = rows.map((r) => r.provider).filter(Boolean);
  if (new Set(providers).size > 1) {
    throw new Error(
      `A quota pool must use a single provider (got: ${[...new Set(providers)].join(", ")})`
    );
  }
}

interface PoolRow {
  id: string;
  connection_id: string;
  name: string;
  created_at: string;
}

interface AllocationRow {
  pool_id: string;
  api_key_id: string;
  weight: number;
  cap_value: number | null;
  cap_unit: string | null;
  policy: string;
}

function rowToAllocation(row: AllocationRow): PoolAllocation {
  const alloc: PoolAllocation = {
    apiKeyId: row.api_key_id,
    weight: row.weight,
    policy: row.policy as Policy,
  };
  if (row.cap_value != null) alloc.capValue = row.cap_value;
  if (row.cap_unit != null) alloc.capUnit = row.cap_unit as QuotaUnit;
  return alloc;
}

interface PoolConnectionRow {
  connection_id: string;
}

function getConnectionIds(poolId: string, fallbackConnectionId: string): string[] {
  const rows = getDb()
    .prepare<PoolConnectionRow>(
      "SELECT connection_id FROM quota_pool_connections WHERE pool_id = ? ORDER BY created_at ASC"
    )
    .all(poolId);
  if (rows.length > 0) {
    return rows.map((r) => r.connection_id);
  }
  // Defensive fallback: join table empty (shouldn't happen post-backfill).
  return fallbackConnectionId ? [fallbackConnectionId] : [];
}

function rowToPool(row: PoolRow, allocations: PoolAllocation[]): QuotaPool {
  return {
    id: row.id,
    connectionId: row.connection_id,
    connectionIds: getConnectionIds(row.id, row.connection_id),
    name: row.name,
    createdAt: row.created_at,
    allocations,
  };
}

function getAllocations(poolId: string): PoolAllocation[] {
  const rows = getDb()
    .prepare<AllocationRow>(
      "SELECT pool_id, api_key_id, weight, cap_value, cap_unit, policy FROM quota_allocations WHERE pool_id = ?"
    )
    .all(poolId);
  return rows.map(rowToAllocation);
}

function makeId(): string {
  // Use Web Crypto UUID (available in Node ≥19 globally; also available in browsers)
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random (extremely unlikely to collide in tests)
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * List all quota pools with their allocations.
 */
export function listPools(): QuotaPool[] {
  const rows = getDb()
    .prepare<PoolRow>(
      "SELECT id, connection_id, name, created_at FROM quota_pools ORDER BY created_at ASC"
    )
    .all();
  return rows.map((row) => rowToPool(row, getAllocations(row.id)));
}

/**
 * Get a single pool by id, or null if not found.
 */
export function getPool(id: string): QuotaPool | null {
  const row = getDb()
    .prepare<PoolRow>("SELECT id, connection_id, name, created_at FROM quota_pools WHERE id = ?")
    .get(id);
  if (!row) return null;
  return rowToPool(row, getAllocations(row.id));
}

/**
 * Create a new quota pool, optionally with initial allocations and member connections.
 * When `connectionIds` is provided, its first element becomes the primary connection_id.
 * When omitted, defaults to [connectionId].
 */
export function createPool(input: PoolCreate): QuotaPool {
  const id = makeId();
  const now = new Date().toISOString();

  // Resolve effective member list and primary connection.
  const members: string[] =
    input.connectionIds && input.connectionIds.length > 0
      ? input.connectionIds
      : [input.connectionId];
  const primaryConnectionId = members[0];

  // Guard: a pool must use a single provider.
  if (input.connectionIds && input.connectionIds.length > 1) {
    assertSingleProvider(input.connectionIds);
  }

  const database = getDb();
  const doCreate = database.transaction(() => {
    database
      .prepare("INSERT INTO quota_pools (id, connection_id, name, created_at) VALUES (?, ?, ?, ?)")
      .run(id, primaryConnectionId, input.name, now);

    const insertConn = database.prepare(
      "INSERT OR IGNORE INTO quota_pool_connections (pool_id, connection_id) VALUES (?, ?)"
    );
    for (const connId of members) {
      insertConn.run(id, connId);
    }

    if (input.allocations && input.allocations.length > 0) {
      const insertAlloc = database.prepare(
        `INSERT INTO quota_allocations (pool_id, api_key_id, weight, cap_value, cap_unit, policy)
         VALUES (?, ?, ?, ?, ?, ?)`
      );
      for (const alloc of input.allocations) {
        insertAlloc.run(
          id,
          alloc.apiKeyId,
          alloc.weight,
          alloc.capValue ?? null,
          alloc.capUnit ?? null,
          alloc.policy
        );
      }
    }
  });
  doCreate();

  const result = rowToPool(
    { id, connection_id: primaryConnectionId, name: input.name, created_at: now },
    getAllocations(id)
  );

  // Phase B2: fire-and-forget combo sync; failures are logged but never thrown.
  void syncQuotaCombosGuarded(id);

  return result;
}

/**
 * Update an existing pool's name, allocations, and/or member connections.
 * Returns updated pool, or null if pool not found.
 * When `connectionIds` is provided, the join table is replaced atomically and
 * connection_id (primary) is synced to connectionIds[0].
 */
export function updatePool(id: string, input: PoolUpdate): QuotaPool | null {
  const database = getDb();
  const existing = database
    .prepare<PoolRow>("SELECT id, connection_id, name, created_at FROM quota_pools WHERE id = ?")
    .get(id);
  if (!existing) return null;

  // Guard: a pool must use a single provider.
  if (input.connectionIds && input.connectionIds.length > 1) {
    assertSingleProvider(input.connectionIds);
  }

  const doUpdate = database.transaction(() => {
    if (input.name !== undefined) {
      database.prepare("UPDATE quota_pools SET name = ? WHERE id = ?").run(input.name, id);
      existing.name = input.name;
    }

    if (input.connectionIds !== undefined && input.connectionIds.length > 0) {
      const newPrimary = input.connectionIds[0];
      // Replace join rows.
      database
        .prepare("DELETE FROM quota_pool_connections WHERE pool_id = ?")
        .run(id);
      const insertConn = database.prepare(
        "INSERT OR IGNORE INTO quota_pool_connections (pool_id, connection_id) VALUES (?, ?)"
      );
      for (const connId of input.connectionIds) {
        insertConn.run(id, connId);
      }
      // Sync primary column.
      database
        .prepare("UPDATE quota_pools SET connection_id = ? WHERE id = ?")
        .run(newPrimary, id);
      existing.connection_id = newPrimary;
    }

    if (input.allocations !== undefined) {
      // Inline the allocation upsert inside the transaction (avoids nested transaction).
      database.prepare("DELETE FROM quota_allocations WHERE pool_id = ?").run(id);
      const insertAlloc = database.prepare(
        `INSERT INTO quota_allocations (pool_id, api_key_id, weight, cap_value, cap_unit, policy)
         VALUES (?, ?, ?, ?, ?, ?)`
      );
      for (const alloc of input.allocations) {
        insertAlloc.run(
          id,
          alloc.apiKeyId,
          alloc.weight,
          alloc.capValue ?? null,
          alloc.capUnit ?? null,
          alloc.policy
        );
      }
    }
  });
  doUpdate();

  const result = rowToPool(existing, getAllocations(id));

  // Phase B2: fire-and-forget combo sync; failures are logged but never thrown.
  void syncQuotaCombosGuarded(id);

  return result;
}

/**
 * Delete a pool by id. CASCADE removes associated allocations.
 * Also removes join rows in quota_pool_connections.
 * Returns true if a row was deleted, false if not found.
 */
export function deletePool(id: string): boolean {
  // Phase B2: remove quota combos BEFORE deleting the pool row so that
  // removeQuotaCombosForPool can still resolve the pool name → slug.
  void removeQuotaCombosGuarded(id);

  const database = getDb();
  const doDelete = database.transaction(() => {
    database.prepare("DELETE FROM quota_pool_connections WHERE pool_id = ?").run(id);
    // Prune this pool id from every key's allowed_quotas JSON array.
    database.prepare(
      `UPDATE api_keys SET allowed_quotas = COALESCE(
         (SELECT json_group_array(value) FROM json_each(api_keys.allowed_quotas) WHERE value != ?),
         '[]')
       WHERE allowed_quotas IS NOT NULL AND allowed_quotas != '[]'
         AND EXISTS (SELECT 1 FROM json_each(api_keys.allowed_quotas) WHERE value = ?)`
    ).run(id, id);
    return database.prepare("DELETE FROM quota_pools WHERE id = ?").run(id);
  });
  const result = doDelete();
  return result.changes > 0;
}

/**
 * Replace all allocations for a pool with the provided list (delete + insert).
 * Runs atomically inside a SQLite transaction.
 */
export function upsertAllocations(poolId: string, allocations: PoolAllocation[]): void {
  const database = getDb();
  const doUpsert = database.transaction(() => {
    database.prepare("DELETE FROM quota_allocations WHERE pool_id = ?").run(poolId);
    const insert = database.prepare(
      `INSERT INTO quota_allocations (pool_id, api_key_id, weight, cap_value, cap_unit, policy)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const alloc of allocations) {
      insert.run(
        poolId,
        alloc.apiKeyId,
        alloc.weight,
        alloc.capValue ?? null,
        alloc.capUnit ?? null,
        alloc.policy
      );
    }
  });
  doUpsert();

  // Phase B2: fire-and-forget combo sync; failures are logged but never thrown.
  void syncQuotaCombosGuarded(poolId);
}

/**
 * List all allocations across all pools where apiKeyId is assigned.
 * Returns pairs of { poolId, allocation }.
 */
export function listAllocationsForApiKey(
  apiKeyId: string
): Array<{ poolId: string; allocation: PoolAllocation }> {
  const rows = getDb()
    .prepare<AllocationRow>(
      `SELECT pool_id, api_key_id, weight, cap_value, cap_unit, policy
       FROM quota_allocations
       WHERE api_key_id = ?`
    )
    .all(apiKeyId);
  return rows.map((row) => ({ poolId: row.pool_id, allocation: rowToAllocation(row) }));
}
