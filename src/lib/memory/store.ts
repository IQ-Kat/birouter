/**
 * Memory store - CRUD operations with prepared statements and caching
 */

import { getDbInstance } from "../db/core";
import { Memory, MemoryType } from "./types";

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

interface MemoryRow {
  id: string;
  api_key_id: string;
  session_id: string | null;
  type: MemoryType;
  key: string | null;
  content: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

// Memory cache configuration
const MEMORY_CACHE_TTL = 300_000; // 5 minutes
const MEMORY_MAX_CACHE_SIZE = 10_000;

// Cache for recently accessed memories
const _memoryCache = new Map<string, CacheEntry<Memory | null>>();

// Helper function to safely parse JSON strings
function parseJSON(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return {};
  }
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function invalidateMemoryCache(key: string) {
  _memoryCache.delete(key);
}

function evictIfNeeded<TKey, TValue>(cache: Map<TKey, TValue>) {
  if (cache.size > MEMORY_MAX_CACHE_SIZE) {
    // Remove oldest entries first
    const keysArray = Array.from(cache.keys());
    const entriesToRemove = Math.floor(cache.size * 0.2);
    for (let i = 0; i < entriesToRemove; i++) {
      cache.delete(keysArray[i]);
    }
  }
}

function rowToMemory(row: MemoryRow): Memory {
  return {
    id: String(row.id),
    apiKeyId: String(row.api_key_id),
    sessionId: typeof row.session_id === "string" ? row.session_id : "",
    type: row.type as MemoryType,
    key: typeof row.key === "string" ? row.key : "",
    content: String(row.content),
    metadata: parseJSON(row.metadata),
    createdAt: new Date(String(row.created_at)),
    updatedAt: new Date(String(row.updated_at)),
    expiresAt: row.expires_at ? new Date(String(row.expires_at)) : null,
  };
}

/**
 * Create a new memory entry
 */
export async function createMemory(
  memory: Omit<Memory, "id" | "createdAt" | "updatedAt">
): Promise<Memory> {
  const db = getDbInstance();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    id,
    memory.apiKeyId,
    memory.sessionId,
    memory.type,
    memory.key,
    memory.content,
    JSON.stringify(memory.metadata ?? {}),
    now,
    now,
    memory.expiresAt?.toISOString() ?? null
  );

  const createdMemory: Memory = {
    id,
    apiKeyId: memory.apiKeyId,
    sessionId: memory.sessionId,
    type: memory.type,
    key: memory.key,
    content: memory.content,
    metadata: memory.metadata,
    createdAt: new Date(now),
    updatedAt: new Date(now),
    expiresAt: memory.expiresAt ?? null,
  };

  // Cache the newly created memory
  invalidateMemoryCache(id);
  evictIfNeeded(_memoryCache);
  _memoryCache.set(id, { value: createdMemory, timestamp: Date.now() });

  return createdMemory;
}

/**
 * Get a memory by ID
 */
export async function getMemory(id: string): Promise<Memory | null> {
  if (!id || typeof id !== "string") return null;

  // Check cache first
  const cached = _memoryCache.get(id);
  if (cached && Date.now() - cached.timestamp < MEMORY_CACHE_TTL) {
    return cached.value;
  }

  const db = getDbInstance();
  const stmt = db.prepare("SELECT * FROM memories WHERE id = ?");
  const row = stmt.get(id) as MemoryRow | undefined;

  if (!row) {
    // Cache negative result briefly to prevent repeated DB hits
    evictIfNeeded(_memoryCache);
    _memoryCache.set(id, { value: null, timestamp: Date.now() });
    return null;
  }

  const memory = rowToMemory(row);

  // Cache the result
  evictIfNeeded(_memoryCache);
  _memoryCache.set(id, { value: memory, timestamp: Date.now() });

  return memory;
}

/**
 * Update a memory entry
 */
export async function updateMemory(
  id: string,
  updates: Partial<Omit<Memory, "id" | "createdAt">>
): Promise<boolean> {
  if (!id || typeof id !== "string") return false;

  const db = getDbInstance();
  const now = new Date().toISOString();

  // Build dynamic update query
  const fields: string[] = [];
  const values: unknown[] = [];

  if (updates.type !== undefined) {
    fields.push("type = ?");
    values.push(updates.type);
  }
  if (updates.key !== undefined) {
    fields.push("key = ?");
    values.push(updates.key);
  }
  if (updates.content !== undefined) {
    fields.push("content = ?");
    values.push(updates.content);
  }
  if (updates.metadata !== undefined) {
    fields.push("metadata = ?");
    values.push(JSON.stringify(updates.metadata));
  }
  if (updates.expiresAt !== undefined) {
    fields.push("expires_at = ?");
    values.push(updates.expiresAt?.toISOString() ?? null);
  }

  // Always update the updatedAt timestamp
  fields.push("updated_at = ?");
  values.push(now);

  values.push(id); // For WHERE clause

  const stmt = db.prepare(`UPDATE memories SET ${fields.join(", ")} WHERE id = ?`);

  const result = stmt.run(...values);

  if (result.changes === 0) {
    return false;
  }

  // Invalidate cache for this memory
  invalidateMemoryCache(id);

  return true;
}

/**
 * Delete a memory by ID
 */
export async function deleteMemory(id: string): Promise<boolean> {
  if (!id || typeof id !== "string") return false;

  const db = getDbInstance();
  const stmt = db.prepare("DELETE FROM memories WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return false;
  }

  // Invalidate cache for this memory
  invalidateMemoryCache(id);

  return true;
}

/**
 * List memories with optional filtering
 */
export async function listMemories(filters: {
  apiKeyId?: string;
  type?: MemoryType;
  sessionId?: string;
  limit?: number;
  offset?: number;
}): Promise<Memory[]> {
  const db = getDbInstance();

  // Build dynamic query
  let query = "SELECT * FROM memories";
  const params: unknown[] = [];
  const whereClauses: string[] = [];

  if (filters.apiKeyId) {
    whereClauses.push("api_key_id = ?");
    params.push(filters.apiKeyId);
  }

  if (filters.type) {
    whereClauses.push("type = ?");
    params.push(filters.type);
  }

  if (filters.sessionId) {
    whereClauses.push("session_id = ?");
    params.push(filters.sessionId);
  }

  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  // Add ordering and pagination
  query += " ORDER BY created_at DESC";

  if (filters.limit !== undefined) {
    query += " LIMIT ?";
    params.push(filters.limit);
  }

  if (filters.offset !== undefined) {
    if (filters.limit === undefined) {
      query += " LIMIT -1";
    }
    query += " OFFSET ?";
    params.push(filters.offset);
  }

  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  return (rows as MemoryRow[]).map(rowToMemory);
}
