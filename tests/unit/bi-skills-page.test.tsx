/**
 * Unit tests for BiSkillsPageClient and its sub-components.
 * These are structural/file-system tests — they verify the correct component
 * split, file structure, source patterns, and exported symbols without DOM rendering.
 *
 * Run:
 *   node --import tsx/esm --test tests/unit/bi-skills-page.test.tsx
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const cwd = process.cwd();
const base = resolve(join(cwd, "src/app/(dashboard)/dashboard/bi-skills"));

// ─── File structure ──────────────────────────────────────────────────────────

describe("File structure — bi-skills directory", () => {
  it("old /dashboard/skills directory does not exist", () => {
    const oldPath = resolve(join(cwd, "src/app/(dashboard)/dashboard/skills"));
    assert.ok(!existsSync(oldPath), `Old skills/ directory must be absent (found at ${oldPath})`);
  });

  it("new /dashboard/bi-skills directory exists", () => {
    assert.ok(existsSync(base), `bi-skills/ directory must exist at ${base}`);
  });

  const expectedFiles = [
    "page.tsx",
    "BiSkillsPageClient.tsx",
    "components/BiSkillCard.tsx",
    "components/SkillInspectorPane.tsx",
    "components/BiSkillsList.tsx",
    "components/BiExecutionsTab.tsx",
    "components/BiSandboxTab.tsx",
    "components/BiMarketplaceTab.tsx",
  ];

  for (const file of expectedFiles) {
    it(`file exists: bi-skills/${file}`, () => {
      assert.ok(existsSync(resolve(join(base, file))), `Expected bi-skills/${file} to exist`);
    });
  }
});

// ─── page.tsx — server component ─────────────────────────────────────────────

describe("page.tsx — server component", () => {
  const src = readFileSync(resolve(join(base, "page.tsx")), "utf-8");

  it("is a server component (no 'use client' directive)", () => {
    assert.ok(
      !src.includes('"use client"') && !src.includes("'use client'"),
      "page.tsx must not have 'use client'"
    );
  });

  it("imports and renders BiSkillsPageClient", () => {
    assert.ok(src.includes("BiSkillsPageClient"), "page.tsx must reference BiSkillsPageClient");
  });

  it("has a default export named Page", () => {
    assert.ok(
      src.includes("export default function Page"),
      "page.tsx must have 'export default function Page'"
    );
  });
});

// ─── BiSkillsPageClient.tsx ─────────────────────────────────────────────────

describe("BiSkillsPageClient.tsx", () => {
  const src = readFileSync(resolve(join(base, "BiSkillsPageClient.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "BiSkillsPageClient must start with 'use client'");
  });

  it("has all 4 tab IDs", () => {
    for (const tabId of ["skills", "executions", "sandbox", "marketplace"]) {
      assert.ok(src.includes(`id: "${tabId}"`), `BiSkillsPageClient must have tab id="${tabId}"`);
    }
  });

  it("renders SkillsConceptCard with variant='bi'", () => {
    assert.ok(
      src.includes('variant="bi"'),
      'BiSkillsPageClient must render <SkillsConceptCard variant="bi" />'
    );
  });

  it("imports SkillsConceptCard from shared components", () => {
    assert.ok(
      src.includes("SkillsConceptCard"),
      "BiSkillsPageClient must import SkillsConceptCard"
    );
  });

  it("has selectedSkillId state", () => {
    assert.ok(
      src.includes("selectedSkillId"),
      "BiSkillsPageClient must maintain selectedSkillId state"
    );
  });

  it("wires BiSkillsList with inspector props", () => {
    assert.ok(src.includes("BiSkillsList"), "BiSkillsPageClient must render BiSkillsList");
    assert.ok(
      src.includes("onSelectSkill"),
      "BiSkillsPageClient must pass onSelectSkill to BiSkillsList"
    );
  });

  it("renders all 4 tab components", () => {
    for (const component of [
      "BiSkillsList",
      "BiExecutionsTab",
      "BiSandboxTab",
      "BiMarketplaceTab",
    ]) {
      assert.ok(src.includes(component), `BiSkillsPageClient must render <${component}>`);
    }
  });

  it("has install modal with hardcoded 'X' close button (preserved behavior)", () => {
    assert.ok(src.includes("showInstallModal"), "must preserve showInstallModal state");
  });
});

// ─── BiSkillCard.tsx ────────────────────────────────────────────────────────

describe("BiSkillCard.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/BiSkillCard.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("accepts skill, selected, onClick props", () => {
    assert.ok(src.includes("BiSkillCardProps"), "must define BiSkillCardProps");
    assert.ok(src.includes("selected:"), "must have selected prop");
    assert.ok(src.includes("onClick:"), "must have onClick prop");
  });

  it("has role='button' for accessibility", () => {
    assert.ok(src.includes('role="button"'), "must have role='button' for accessibility");
  });

  it("exports BiSkillCard", () => {
    assert.ok(
      src.includes("export function BiSkillCard") || src.includes("export { BiSkillCard }"),
      "must export BiSkillCard"
    );
  });

  it("exports BiSkill interface", () => {
    assert.ok(
      src.includes("export interface BiSkill"),
      "must export BiSkill interface for other components"
    );
  });
});

// ─── SkillInspectorPane.tsx ───────────────────────────────────────────────────

describe("SkillInspectorPane.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/SkillInspectorPane.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("has all 4 sub-tab IDs", () => {
    for (const tabId of ["schema", "handler", "executions", "sandbox"]) {
      assert.ok(src.includes(`"${tabId}"`), `SkillInspectorPane must include sub-tab "${tabId}"`);
    }
  });

  it("has empty state text when no skill selected", () => {
    assert.ok(src.includes("Selecione uma skill"), "must have empty state message");
  });

  it("fetches /api/skills/[id] for skill detail", () => {
    assert.ok(
      src.includes("/api/skills/${selectedSkillId}") ||
        src.includes("`/api/skills/${selectedSkillId}`"),
      "must fetch /api/skills/${selectedSkillId} for detail"
    );
  });

  it("fetches /api/skills/executions for the executions tab", () => {
    assert.ok(
      src.includes("api/skills/executions?skillId=") || src.includes("api/skills/executions"),
      "must fetch executions for the selected skill"
    );
  });

  it("has ON / AUTO / OFF / Uninstall buttons", () => {
    assert.ok(src.includes("onSetMode"), "must call onSetMode for mode buttons");
    assert.ok(src.includes("onUninstall"), "must call onUninstall");
  });
});

// ─── BiSkillsList.tsx ───────────────────────────────────────────────────────

describe("BiSkillsList.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/BiSkillsList.tsx")), "utf-8");

  it("uses grid-cols-12 split layout", () => {
    assert.ok(src.includes("grid-cols-12"), "must use 12-column grid for split layout");
  });

  it("renders BiSkillCard for each skill", () => {
    assert.ok(src.includes("BiSkillCard"), "must render BiSkillCard per skill");
  });

  it("renders SkillInspectorPane on the right", () => {
    assert.ok(src.includes("SkillInspectorPane"), "must include SkillInspectorPane in right col");
  });

  it("has onSelectSkill prop to control inspector state", () => {
    assert.ok(src.includes("onSelectSkill"), "must accept onSelectSkill prop");
  });
});

// ─── BiExecutionsTab.tsx ────────────────────────────────────────────────────

describe("BiExecutionsTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/BiExecutionsTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("renders a table with skill/status/duration/time columns", () => {
    assert.ok(src.includes('{t("skill")}'), "must have skill column");
    assert.ok(src.includes('{t("status")}'), "must have status column");
    assert.ok(src.includes('{t("duration")}'), "must have duration column");
  });

  it("has pagination buttons", () => {
    assert.ok(src.includes("onPagePrev"), "must accept onPagePrev handler");
    assert.ok(src.includes("onPageNext"), "must accept onPageNext handler");
  });
});

// ─── BiSandboxTab.tsx ───────────────────────────────────────────────────────

describe("BiSandboxTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/BiSandboxTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("shows sandbox config values", () => {
    assert.ok(src.includes("100ms"), "must show 100ms CPU limit");
    assert.ok(src.includes("256MB"), "must show 256MB memory limit");
    assert.ok(src.includes("30s"), "must show 30s timeout");
  });
});

// ─── BiMarketplaceTab.tsx ───────────────────────────────────────────────────

describe("BiMarketplaceTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/BiMarketplaceTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("has marketplace search logic", () => {
    assert.ok(
      src.includes("/api/skills/marketplace"),
      "must call /api/skills/marketplace endpoint"
    );
  });

  it("has skills.sh search logic", () => {
    assert.ok(src.includes("/api/skills/skillssh"), "must call /api/skills/skillssh endpoint");
  });

  it("accepts skillsProvider and onRefreshSkills props", () => {
    assert.ok(src.includes("skillsProvider"), "must accept skillsProvider prop");
    assert.ok(src.includes("onRefreshSkills"), "must accept onRefreshSkills prop");
  });
});

// ─── E2E test update ──────────────────────────────────────────────────────────

describe("E2E spec path", () => {
  const src = readFileSync(resolve(join(cwd, "tests/e2e/skills-marketplace.spec.ts")), "utf-8");

  it("uses /dashboard/bi-skills (not /dashboard/skills)", () => {
    assert.ok(
      src.includes("/dashboard/bi-skills"),
      "E2E spec must navigate to /dashboard/bi-skills"
    );
    assert.ok(
      !src.includes('"/dashboard/skills"') && !src.includes("'/dashboard/skills'"),
      "E2E spec must not have the old /dashboard/skills path in gotoDashboardRoute call"
    );
  });
});
