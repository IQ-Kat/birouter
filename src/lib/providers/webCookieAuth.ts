export function stripCookieInputPrefix(rawValue: string): string {
  const trimmed = (rawValue || "").trim();
  if (!trimmed) return "";

  const withoutBearer = trimmed.replace(/^bearer\s+/i, "");
  return withoutBearer.replace(/^cookie:/i, "").trim();
}

export function normalizeSessionCookieHeader(rawValue: string, defaultCookieName: string): string {
  const normalized = stripCookieInputPrefix(rawValue);
  if (!normalized) return "";

  if (normalized.includes("=")) {
    return normalized;
  }

  return `${defaultCookieName}=${normalized}`;
}
