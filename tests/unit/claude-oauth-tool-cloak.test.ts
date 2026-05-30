/**
 * Native Claude OAuth tool cloak + schema sanitizer.
 *
 * Anthropic's first-party Messages API rejects native-Claude-OAuth requests
 * that carry (a) invalid tool input_schemas (truncation placeholders / non-array
 * keywords) or (b) tool names it fingerprints as a third-party agent harness —
 * both surfaced as a misleading `400 out of extra usage` placeholder. These
 * tests cover the request-side sanitizer + name cloak; the response side is
 * reversed via the existing per-request _toolNameMap.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cloakThirdPartyToolNames,
  needsThirdPartyCloak,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";
import {
  sanitizeClaudeToolSchema,
  sanitizeClaudeToolSchemas,
} from "../../open-sse/translator/helpers/schemaCoercion.ts";

type AnyRecord = Record<string, unknown>;
const schemaOf = (tools: unknown, i = 0): AnyRecord =>
  ((tools as AnyRecord[])[i].input_schema as AnyRecord);

describe("sanitizeClaudeToolSchemas", () => {
  it("drops a non-array enum placeholder", () => {
    const tools = [
      { name: "x", input_schema: { type: "object", properties: { m: { type: "string", enum: "[MaxDepth]" } } } },
    ];
    const props = (schemaOf(sanitizeClaudeToolSchemas(tools)).properties as AnyRecord).m as AnyRecord;
    assert.equal("enum" in props, false);
  });

  it("coerces an index-keyed object enum into an array", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      properties: { a: { type: "string", enum: { "0": "x", "1": "y" } } },
    }) as AnyRecord;
    assert.deepEqual(((s.properties as AnyRecord).a as AnyRecord).enum, ["x", "y"]);
  });

  it("replaces a placeholder property value with a permissive schema", () => {
    const s = sanitizeClaudeToolSchema({ type: "object", properties: { a: "[MaxDepth]" } }) as AnyRecord;
    assert.deepEqual((s.properties as AnyRecord).a, {});
  });

  it("leaves a valid schema intact", () => {
    const input = { type: "object", properties: { a: { type: "string" } }, required: ["a"] };
    assert.deepEqual(sanitizeClaudeToolSchema(input), input);
  });
});

describe("cloakThirdPartyToolNames", () => {
  it("aliases a blacklisted name and tracks the reverse map", () => {
    const body: AnyRecord = { tools: [{ name: "mixture_of_agents" }] };
    cloakThirdPartyToolNames(body);
    assert.equal((body.tools as AnyRecord[])[0].name, "MixtureOfAgents");
    assert.equal((body._toolNameMap as Map<string, string>).get("MixtureOfAgents"), "mixture_of_agents");
  });

  it("maps known harness names to Claude Code canonical names", () => {
    const body: AnyRecord = { tools: [{ name: "read_file" }, { name: "write_file" }, { name: "terminal" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Read", "Write", "Bash"]);
  });

  it("PascalCases unmapped snake_case names", () => {
    const body: AnyRecord = { tools: [{ name: "honcho_profile" }, { name: "lcm_expand_query" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["HonchoProfile", "LcmExpandQuery"]);
  });

  it("leaves genuine Claude Code tool names untouched", () => {
    const body: AnyRecord = { tools: [{ name: "Bash" }, { name: "Read" }, { name: "TodoWrite" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Bash", "Read", "TodoWrite"]);
    assert.equal((body._toolNameMap as Map<string, string> | undefined)?.size ?? 0, 0);
  });

  it("dedupes canonical-name collisions", () => {
    const body: AnyRecord = { tools: [{ name: "search_files" }, { name: "grep_search" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Grep", "Grep2"]);
  });

  it("remaps tool_use blocks in message history consistently", () => {
    const body: AnyRecord = {
      tools: [{ name: "mixture_of_agents" }],
      messages: [{ role: "assistant", content: [{ type: "tool_use", name: "mixture_of_agents" }] }],
    };
    cloakThirdPartyToolNames(body);
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "MixtureOfAgents");
  });

  it("does not leak _toolNameMap into the serialized request body", () => {
    const body: AnyRecord = { tools: [{ name: "mixture_of_agents" }] };
    cloakThirdPartyToolNames(body);
    assert.equal(JSON.stringify(body).includes("_toolNameMap"), false);
  });

  it("needsThirdPartyCloak only flags non-Claude-Code names", () => {
    assert.equal(needsThirdPartyCloak("Bash"), false);
    assert.equal(needsThirdPartyCloak("TodoWrite"), false);
    assert.equal(needsThirdPartyCloak("read_file"), true);
    assert.equal(needsThirdPartyCloak("mixture_of_agents"), true);
  });
});
