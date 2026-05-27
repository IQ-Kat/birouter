import { getAdapter } from "../driver.js";
import { parseJson, stringifyJson } from "../helpers/jsonCol.js";

const SCOPE = "fetchedModels";

/**
 * Get all fetched models for all providers
 * @returns {Object} { [providerId]: { models: [...], fetchedAt: string } }
 */
export async function getAllFetchedModels() {
  const db = await getAdapter();
  const rows = db.all(`SELECT key, value FROM kv WHERE scope = ?`, [SCOPE]);
  const out = {};
  for (const r of rows) out[r.key] = parseJson(r.value, { models: [], fetchedAt: null });
  return out;
}

/**
 * Get fetched models for a specific provider
 * @param {string} providerId
 * @returns {{ models: Array<{ id: string, name?: string }>, fetchedAt: string | null }}
 */
export async function getFetchedModels(providerId) {
  if (!providerId) return { models: [], fetchedAt: null };
  const db = await getAdapter();
  const row = db.get(`SELECT value FROM kv WHERE scope = ? AND key = ?`, [SCOPE, providerId]);
  return row ? parseJson(row.value, { models: [], fetchedAt: null }) : { models: [], fetchedAt: null };
}

/**
 * Save fetched models for a provider (replaces existing)
 * @param {string} providerId
 * @param {Array<{ id: string, name?: string }>} models
 */
export async function saveFetchedModels(providerId, models) {
  if (!providerId || !Array.isArray(models)) return;
  const db = await getAdapter();
  const value = { models, fetchedAt: new Date().toISOString() };
  db.run(
    `INSERT INTO kv(scope, key, value) VALUES(?, ?, ?) ON CONFLICT(scope, key) DO UPDATE SET value = excluded.value`,
    [SCOPE, providerId, stringifyJson(value)]
  );
}

/**
 * Delete fetched models for a provider
 * @param {string} providerId
 */
export async function deleteFetchedModels(providerId) {
  if (!providerId) return;
  const db = await getAdapter();
  db.run(`DELETE FROM kv WHERE scope = ? AND key = ?`, [SCOPE, providerId]);
}
