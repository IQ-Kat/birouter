/**
 * Delivery detection: PR merged + CHANGELOG + git log, with confidence grading.
 */

const VERSION_HEADER_RE = /^##\s+\[?(\d+\.\d+\.\d+)\]?/;

export function parseChangelog(text, issueNumber) {
  if (typeof text !== "string") return null;
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
    if (line.includes(needle) && currentSection) {
      const match = line.match(/\(#\d+\)/);
      if (match && match[0] === `(${needle})`) {
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
