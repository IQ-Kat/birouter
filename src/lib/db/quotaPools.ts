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
  connectionId: string;
  name: string;
  createdAt: string;
  allocations: PoolAllocation[];
}

export interface PoolCreate {
  connectionId: string;
  name: string;
  allocations?: PoolAllocation[];
}

export interface PoolUpdate {
  name?: string;
  allocations?: PoolAllocation[];
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

function rowToPool(row: PoolRow, allocations: PoolAllocation[]): QuotaPool {
  return {
    id: row.id,
    connectionId: row.connection_id,
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
 * Create a new quota pool, optionally with initial allocations.
 */
export function createPool(input: PoolCreate): QuotaPool {
  const id = makeId();
  const now = new Date().toISOString();

  getDb()
    .prepare("INSERT INTO quota_pools (id, connection_id, name, created_at) VALUES (?, ?, ?, ?)")
    .run(id, input.connectionId, input.name, now);

  if (input.allocations && input.allocations.length > 0) {
    upsertAllocations(id, input.allocations);
  }

  return rowToPool(
    { id, connection_id: input.connectionId, name: input.name, created_at: now },
    getAllocations(id)
  );
}

/**
 * Update an existing pool's name and/or allocations.
 * Returns updated pool, or null if pool not found.
 */
export function updatePool(id: string, input: PoolUpdate): QuotaPool | null {
  const existing = getDb()
    .prepare<PoolRow>("SELECT id, connection_id, name, created_at FROM quota_pools WHERE id = ?")
    .get(id);
  if (!existing) return null;

  if (input.name !== undefined) {
    getDb().prepare("UPDATE quota_pools SET name = ? WHERE id = ?").run(input.name, id);
    existing.name = input.name;
  }

  if (input.allocations !== undefined) {
    upsertAllocations(id, input.allocations);
  }

  return rowToPool(existing, getAllocations(id));
}

/**
 * Delete a pool by id. CASCADE removes associated allocations.
 * Returns true if a row was deleted, false if not found.
 */
export function deletePool(id: string): boolean {
  const result = getDb().prepare("DELETE FROM quota_pools WHERE id = ?").run(id);
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
