import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

function sectionItems(sectionId: string) {
  const section = sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === sectionId);
  assert.ok(section, `expected section "${sectionId}" to exist`);
  return sidebarVisibility.getSectionItems(section);
}

test("HIDEABLE_SIDEBAR_ITEM_IDS contains costs-quota-plans", () => {
  assert.ok(
    (sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("costs-quota-plans"),
    "costs-quota-plans must be in HIDEABLE_SIDEBAR_ITEM_IDS"
  );
});

test("HIDEABLE_SIDEBAR_ITEM_IDS: costs-quota-plans appears after costs-quota-share", () => {
  const ids = sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[];
  const qsIdx = ids.indexOf("costs-quota-share");
  const qpIdx = ids.indexOf("costs-quota-plans");
  assert.ok(qsIdx !== -1, "costs-quota-share must exist");
  assert.ok(qpIdx !== -1, "costs-quota-plans must exist");
  assert.ok(qpIdx > qsIdx, "costs-quota-plans must come after costs-quota-share");
});

test("costs section has 5 items including costs-quota-plans at end", () => {
  const items = sectionItems("costs");
  const ids = items.map((i) => i.id);
  assert.ok(ids.includes("costs-quota-plans"), "costs section must include costs-quota-plans");
  assert.strictEqual(ids[ids.length - 1], "costs-quota-plans", "costs-quota-plans must be last");
  assert.strictEqual(ids.length, 5, "costs section must have exactly 5 items");
});

test("costs-quota-plans has correct href and icon", () => {
  const items = sectionItems("costs");
  const item = items.find((i) => i.id === "costs-quota-plans");
  assert.ok(item, "costs-quota-plans item must exist");
  assert.strictEqual(item.href, "/dashboard/costs/quota-share/plans");
  assert.strictEqual(item.icon, "fact_check");
  assert.strictEqual(item.i18nKey, "costsQuotaPlans");
  assert.strictEqual(item.subtitleKey, "costsQuotaPlansSubtitle");
});
