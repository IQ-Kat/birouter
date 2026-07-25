import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("routing selection files must use crypto.randomInt instead of Math.random", () => {
  const targetFiles = [
    path.join(process.cwd(), "src/lib/db/proxies.ts"),
    path.join(process.cwd(), "open-sse/services/combo/runtimeUnits.ts"),
  ];

  for (const filePath of targetFiles) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf-8");
    const hasMathRandom = /\bMath\.random\s*\(\s*\)/.test(content);
    assert.equal(
      hasMathRandom,
      false,
      `File ${path.basename(filePath)} should not use Math.random() in routing selection context`
    );
  }
});
