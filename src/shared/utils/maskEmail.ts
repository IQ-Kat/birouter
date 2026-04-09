/**
 * maskEmail — Privacy display utility for email addresses.
 *
 * Masks the username and domain name portions of an email address
 * to prevent identity exposure in dashboards and logs.
 *
 * @example
 *   maskEmail("diego.souza@gmail.com")  // "di*********@g****.com"
 *   maskEmail("a@b.com")                // "a@b.com"  (too short to mask)
 */
export function maskEmail(email: string | null | undefined, visibleChars = 2): string {
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

  const maskedUser =
    username.slice(0, visibleChars) + "*".repeat(username.length - visibleChars);

  // Mask domain name: keep first char, mask the rest
  const maskedDomain =
    domainName.length > 1
      ? domainName.slice(0, 1) + "*".repeat(domainName.length - 1)
      : domainName;

  return `${maskedUser}@${maskedDomain}${tld}`;
}
