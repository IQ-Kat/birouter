import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { maskEmail } from "../../src/shared/utils/maskEmail.ts";

describe("maskEmail", () => {
  it("masks standard email correctly", () => {
    assert.equal(maskEmail("diego.souza@gmail.com"), "di*********@g****.com");
  });

  it("masks email with short username (exactly visibleChars)", () => {
    // username "ab" has length 2 = visibleChars, so returns as-is
    assert.equal(maskEmail("ab@gmail.com"), "ab@gmail.com");
  });

  it("masks email with longer username", () => {
    const result = maskEmail("hello@example.com");
    assert.equal(result, "he***@e******.com");
  });

  it("returns empty string for null", () => {
    assert.equal(maskEmail(null), "");
  });

  it("returns empty string for undefined", () => {
    assert.equal(maskEmail(undefined), "");
  });

  it("returns empty string for empty string", () => {
    assert.equal(maskEmail(""), "");
  });

  it("returns original if no @ symbol", () => {
    assert.equal(maskEmail("notanemail"), "notanemail");
  });

  it("handles multi-part TLDs correctly", () => {
    const result = maskEmail("user@company.co.uk");
    assert.ok(result.endsWith(".co.uk"), `Expected .co.uk suffix, got: ${result}`);
    assert.ok(result.includes("@"), "Should contain @");
  });

  it("handles single-char domain name", () => {
    const result = maskEmail("user@x.com");
    assert.ok(result.includes("@x.com"), `Expected @x.com in: ${result}`);
  });

  it("allows customizing visibleChars", () => {
    const result = maskEmail("hello@example.com", 3);
    assert.ok(result.startsWith("hel"), `Expected to start with 'hel', got: ${result}`);
  });
});
