/**
 * Delivery detection: PR merged + CHANGELOG + git log, with confidence grading.
 */

const VERSION_HEADER_RE = /^##\s+\[?(\d+\.\d+\.\d+)\]?/;

export function parseChangelog(text, issueNumber) {
  if (typeof text !== "string") return null;
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) return null;
  const needle = `#${issueNumber}`;
  const lines = text.split("\n");

  let currentSection = null;
  let currentVersion = null;
  for (const line of lines) {
    const headerMatch = line.match(VERSION_HEADER_RE);
    if (headerMatch) {
      currentSection = line.trim();
      currentVersion = headerMatch[1];
      continue;
    }
    if (!currentSection) continue;
    // Match #N with word boundary: look for needle followed by non-word char or end
    const idx = line.indexOf(needle);
    if (idx !== -1) {
      const nextIdx = idx + needle.length;
      const nextChar = line[nextIdx];
      const isWordBoundary = nextIdx >= line.length || /\W/.test(nextChar);
      if (isWordBoundary) {
        return {
          section: currentSection,
          version: currentVersion,
          line: line.trim(),
        };
      }
    }
  }
  return null;
}
