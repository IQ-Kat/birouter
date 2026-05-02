import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";
import {
  compressDescriptionsInPlace,
  getMcpDescriptionCompressionStats,
  resetMcpDescriptionCompressionStats,
} from "../../open-sse/mcp-server/descriptionCompressor.ts";

const require = createRequire(import.meta.url);
const upstream = require(
  path.resolve("_references/_outros/caveman/mcp-servers/caveman-shrink/compress.js")
) as {
  compress(text: string): { compressed: string; before: number; after: number };
};

function omnirouteCompress(text: string): string {
  const result = cavemanCompress(
    { messages: [{ role: "user", content: text }] },
    {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 0,
      preservePatterns: [],
      intensity: "full",
    }
  );
  return result.body.messages[0].content as string;
}

const parityCases = [
  "The user is the owner of an account and should make sure to configure the database.",
  "Sure, this just basically returns the value from config.api.endpoint().",
  "I will perhaps connect to the database using API_KEY_VALUE and version 3.7.9.",
  "Read just the file at /tmp/the/just/file.txt and see https://example.com/the/api.",
];

describe("upstream Caveman parity benchmark", () => {
  it("matches core upstream shrink protections and savings direction", () => {
    for (const input of parityCases) {
      const ours = omnirouteCompress(input);
      const theirs = upstream.compress(input).compressed;
      assert.ok(ours.length <= input.length, `OmniRoute did not reduce: ${input}`);
      assert.ok(theirs.length <= input.length, `Upstream did not reduce: ${input}`);
      for (const protectedToken of [
        "config.api.endpoint()",
        "API_KEY_VALUE",
        "3.7.9",
        "/tmp/the/just/file.txt",
        "https://example.com/the/api",
      ]) {
        if (input.includes(protectedToken)) {
          assert.match(ours, new RegExp(protectedToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
        }
      }
    }
  });

  it("stays within upstream token budget on representative prose", () => {
    const input =
      "Sure, I will make sure to return the current weather for a given location and the temperature in Fahrenheit.";
    const ours = omnirouteCompress(input);
    const theirs = upstream.compress(input).compressed;
    assert.ok(
      ours.length <= Math.ceil(theirs.length * 1.2),
      `Expected OmniRoute within 20% of upstream shrink length. ours=${ours.length}, upstream=${theirs.length}`
    );
  });

  it("tracks MCP description shrink parity separately from prompt compression", () => {
    resetMcpDescriptionCompressionStats();
    const originalDescription =
      "The tool returns the current weather for a given location and the temperature in Fahrenheit.";
    const payload = {
      tools: [
        {
          name: "get_weather",
          description: originalDescription,
        },
      ],
    };

    compressDescriptionsInPlace(payload);
    const stats = getMcpDescriptionCompressionStats();
    assert.ok(payload.tools[0].description.length < originalDescription.length);
    assert.equal(stats.descriptionsCompressed, 1);
    assert.ok(stats.estimatedTokensSaved > 0);
  });
});
