import test from "node:test";
import assert from "node:assert/strict";
import { ROUTING_STRATEGIES } from "@/shared/constants/routingStrategies";
import { updateSettingsSchema as settingsRouteSchema } from "@/shared/validation/settingsSchemas";
import { updateSettingsSchema as sharedSettingsSchema } from "@/shared/validation/schemas";

for (const strategy of ROUTING_STRATEGIES) {
  test(`settings route schema accepts fallbackStrategy=${strategy.value}`, () => {
    const parsed = settingsRouteSchema.parse({ fallbackStrategy: strategy.value });
    assert.equal(parsed.fallbackStrategy, strategy.value);
  });

  test(`shared settings schema accepts fallbackStrategy=${strategy.value}`, () => {
    const parsed = sharedSettingsSchema.parse({ fallbackStrategy: strategy.value });
    assert.equal(parsed.fallbackStrategy, strategy.value);
  });
}
