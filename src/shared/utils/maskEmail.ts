/**
 * maskEmail — Privacy display utility for email addresses.
 *
 * Masks the username and domain name portions of an email address
 * to prevent identity exposure in dashboards and logs.
 *
 * @example
 *   maskEmail("diego.souza@gmail.com")  // "die********@gmail.com"
 *   maskEmail("a@b.com")                // "a@b.com"  (too short to mask)
 */
export function maskEmail(email: string | null | undefined, visibleChars = 3): string {
  if (!email) return "";
  if (!email.includes("@")) return email;

  const atIndex = email.lastIndexOf("@");
  const username = email.slice(0, atIndex);
  const rest = email.slice(atIndex + 1); // "gmail.com", "co.uk", etc.

  const dotIndex = rest.indexOf(".");
  const domainName = dotIndex !== -1 ? rest.slice(0, dotIndex) : rest;
  const tld = dotIndex !== -1 ? rest.slice(dotIndex) : ""; // ".com", ".co.uk"

  // If username is too short to mask meaningfully, return as-is
  if (username.length <= visibleChars) return email;

  const maskedUser = username.slice(0, visibleChars) + "*".repeat(username.length - visibleChars);

  // Preserve the full domain name to maintain clear provider account differentiation
  const maskedDomain = domainName;

  return `${maskedUser}@${maskedDomain}${tld}`;
}

/**
 * Masks the value only when it looks like an email address.
 * Useful for fields like `name` that may be normalized to the raw email.
 */
export function maskEmailLikeValue(value: string | null | undefined, visibleChars = 3): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.includes("@") ? maskEmail(trimmed, visibleChars) : trimmed;
}

/**
 * Returns the first non-empty display value, masking it if it contains an email.
 */
export function pickMaskedDisplayValue(
  values: Array<string | null | undefined>,
  fallback = ""
): string {
  for (const value of values) {
    const masked = maskEmailLikeValue(value);
    if (masked) return masked;
  }
  return fallback;
}

/**
 * Visibility-aware variant of pickMaskedDisplayValue.
 * When `showFull` is true, returns the raw (unmasked) value.
 * When `showFull` is false, returns the masked value (default behavior).
 */
export function pickDisplayValue(
  values: Array<string | null | undefined>,
  showFull: boolean,
  fallback = ""
): string {
  if (showFull) {
    for (const value of values) {
      if (value?.trim()) return value.trim();
    }
    return fallback;
  }
  return pickMaskedDisplayValue(values, fallback);
}
