/**
 * One-shot regen of ~/.config/opencode/opencode.json from the live
 * Birouter /v1/models catalog. Run after a catalog change to refresh
 * the opencode client.
 *
 * Usage:  bun run scripts/regen-opencode-config.ts
 *      or npx tsx scripts/regen-opencode-config.ts
 */
import { generateOpencodeConfig } from "../src/lib/cli-helper/config-generator/opencode.ts";

const baseURL = process.env.BIROUTER_URL ?? "http://localhost:2004";
const apiKey = process.env.BIROUTER_KEY ?? process.env.OPENCODE_API_KEY ?? "";

if (!apiKey) {
  console.error(
    "BIROUTER_KEY (or OPENCODE_API_KEY) env var is required. " +
      "Find it in Birouter dashboard → Settings → API Keys."
  );
  process.exit(1);
}

const out = await generateOpencodeConfig({ baseUrl: baseURL, apiKey });
console.log(out);
