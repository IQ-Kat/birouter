import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseChangelog } from "../../../scripts/features/lib/delivered.mjs";

describe("parseChangelog", () => {
  it("returns section header when #N found", () => {
    const text = `
# Changelog

## [3.7.2] - 2026-03-15

- Fix something (#980)
- Other item

## [3.7.1] - 2026-03-01

- Earlier change (#900)
`;
    const r = parseChangelog(text, 980);
    assert.deepEqual(r, {
      section: "## [3.7.2] - 2026-03-15",
      version: "3.7.2",
      line: "- Fix something (#980)",
    });
  });

  it("returns null when #N not found", () => {
    const text = `## [3.7.2]\n- Item #100\n`;
    assert.equal(parseChangelog(text, 999), null);
  });

  it("ignores #N appearing without # prefix", () => {
    const text = `## [3.7.2]\n- Issue 980 (no hash)\n`;
    assert.equal(parseChangelog(text, 980), null);
  });

  it("handles plain version headers without brackets/date", () => {
    const text = `## 3.7.2\n- Fix (#980)\n`;
    const r = parseChangelog(text, 980);
    assert.equal(r.version, "3.7.2");
  });
});
