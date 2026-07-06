import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveGooseTarget,
  buildGooseConfig,
  buildGooseEnvRecipe,
} from "../../../bin/cli/commands/setup-goose.mjs";

test("resolveGooseTarget strips /v1 (Goose appends it)", () => {
  assert.equal(resolveGooseTarget({ remote: "http://vps:2004/v1/" }).host, "http://vps:2004");
  assert.equal(resolveGooseTarget({ remote: "http://vps:2004" }).host, "http://vps:2004");
});
test("resolveGooseTarget: explicit --api-key wins", () => {
  assert.equal(resolveGooseTarget({ remote: "http://x:2004", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildGooseConfig sets GOOSE_PROVIDER/MODEL + OPENAI_HOST (root), preserves rest", () => {
  const c = buildGooseConfig(
    { GOOSE_MODE: "auto" },
    { host: "http://vps:2004", model: "glm/glm-5.2" }
  );
  assert.equal(c.GOOSE_PROVIDER, "openai");
  assert.equal(c.GOOSE_MODEL, "glm/glm-5.2");
  assert.equal(c.OPENAI_HOST, "http://vps:2004");
  assert.equal(c.GOOSE_MODE, "auto");
});
test("buildGooseEnvRecipe references the env key (secret off disk)", () => {
  const r = buildGooseEnvRecipe({ host: "http://vps:2004", model: "m" });
  assert.ok(r.includes("OPENAI_HOST=http://vps:2004"));
  assert.ok(r.includes("OPENAI_API_KEY=$BIROUTER_API_KEY"));
  assert.ok(r.includes("GOOSE_PROVIDER=openai"));
});
