/**
 * Deterministic naming helpers for quota virtual models (Phase B1).
 *
 * FORMAT: `quotaShared-<poolSlug>-<provider>/<model>`
 *
 * The poolSlug is pure alphanumeric (no "-", no "/"), which makes the first
 * "-" after the prefix and the first "/" unambiguous delimiters that allow
 * round-trip parsing even when provider contains "-" or model contains "/".
 */

export const QUOTA_MODEL_PREFIX = "quotaShared-";

/**
 * Convert an arbitrary pool name into a safe, alphanumeric slug.
 * Lowercases the name then strips every character that is not [a-z0-9].
 * Falls back to "pool" when the result would be empty.
 */
export function quotaPoolSlug(poolName: string): string {
  const slug = poolName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return slug.length > 0 ? slug : "pool";
}

/**
 * Build the canonical virtual model name for a quota-shared target.
 * Provider and model are kept verbatim (not slugged).
 */
export function quotaModelName(poolName: string, provider: string, model: string): string {
  return `${QUOTA_MODEL_PREFIX}${quotaPoolSlug(poolName)}-${provider}/${model}`;
}

/**
 * Parse a quota virtual model name back into its components.
 * Returns null when the name is not a valid quota model name.
 */
export function parseQuotaModelName(
  name: string,
): { poolSlug: string; provider: string; model: string } | null {
  if (!name.startsWith(QUOTA_MODEL_PREFIX)) {
    return null;
  }

  // rest = "<poolSlug>-<provider>/<model>"
  const rest = name.slice(QUOTA_MODEL_PREFIX.length);

  // poolSlug has no "-" by construction → first "-" is the delimiter
  const dashIdx = rest.indexOf("-");
  if (dashIdx === -1) {
    return null;
  }

  const poolSlug = rest.slice(0, dashIdx);
  const tail = rest.slice(dashIdx + 1); // "<provider>/<model>"

  // first "/" separates provider from model; model may contain additional "/"
  const slashIdx = tail.indexOf("/");
  if (slashIdx === -1) {
    return null;
  }

  const provider = tail.slice(0, slashIdx);
  const model = tail.slice(slashIdx + 1);

  if (provider.length === 0 || model.length === 0) {
    return null;
  }

  return { poolSlug, provider, model };
}

/**
 * Fast prefix check — does not validate the full structure.
 */
export function isQuotaModelName(name: string): boolean {
  return name.startsWith(QUOTA_MODEL_PREFIX);
}
