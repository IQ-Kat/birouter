# GLM Coding Settings Audit Worksheet

Date: 2026-03-28
Scope: OmniRoute GLM Coding provider only (`glm`)
Status: Repo inventory plus doc-backed family audit expansions
Inventory mode: Repo-derived baseline with doc-backed family expansions

## Audit intent

This worksheet captures the current GLM Coding inventory directly from repository sources and extends it with doc-backed family audit sections so later audit tasks can compare repo behavior against external provider documentation when links are available.

## Provenance policy

- `repo-derived`: observed directly in local source files.
- `doc-derived`: backed by supplied external documentation used in later family audit sections.
- `repo-only`: reserved for cases where implementation exists without matching docs.
- This worksheet starts from a `repo-derived` baseline and expands where doc-backed family audits were completed.

## Local sources consulted

- `repo-derived`: `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts`
- `repo-derived`: `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerModels.ts`
- `repo-derived`: `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/services/modelCapabilities.ts`
- `repo-derived`: `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/src/shared/constants/pricing.ts`

## Provider snapshot

| Field | Value | Provenance | Notes |
| --- | --- | --- | --- |
| Provider ID | `glm` | repo-derived | Registry entry ID |
| Provider alias | `glm` | repo-derived | Alias maps to same value |
| Executor | `default` | repo-derived | Uses default executor path |
| Format | `claude` | repo-derived | Anthropic-style request/response compatibility |
| Auth type | `apikey` | repo-derived | |
| Auth header | `x-api-key` | repo-derived | |
| Default context length | `200000` | repo-derived | Per-model overrides exist |
| URL suffix | `?beta=true` | repo-derived | Applies to request URL assembly |
| Required headers | `Anthropic-Version: 2023-06-01` | repo-derived | Required compatibility header |
| Beta headers | `Anthropic-Beta: claude-code-20250219,interleaved-thinking-2025-05-14` | repo-derived | Sent for GLM Coding requests |

## Endpoint inventory

| Endpoint field | Value | Provenance | Notes |
| --- | --- | --- | --- |
| Base URL | `https://api.z.ai` | repo-derived | Derived from registry `baseUrl` host |
| Endpoint path or pattern | `/api/anthropic/v1/messages?beta=true` | repo-derived | Derived from registry `baseUrl` + `urlSuffix`; current implementation points to Anthropic messages path |
| Compatibility mode / request schema | `claude` / Anthropic Messages-compatible | repo-derived | Inferred from registry `format: "claude"` and required Anthropic headers |

## Repo-derived model inventory

| Model ID | Display name | Context length | Tool calling status | Pricing present | Provenance | Notes |
| --- | --- | ---: | --- | --- | --- | --- |
| `glm-5.1` | GLM 5.1 | 204800 | supported by current capability fallback | yes | repo-derived | Explicit per-model context override |
| `glm-5` | GLM 5 | 200000 | supported by current capability fallback | yes | repo-derived | Inherits provider default context length |
| `glm-5-turbo` | GLM 5 Turbo | 200000 | supported by current capability fallback | yes | repo-derived | Inherits provider default context length |
| `glm-4.7-flashx` | GLM 4.7 FlashX | 200000 | supported by current capability fallback | yes | repo-derived | Inherits provider default context length |
| `glm-4.7-flash` | GLM 4.7 Flash | 200000 | supported by current capability fallback | yes | repo-derived | Pricing is currently zeroed in repo table |
| `glm-4.7` | GLM 4.7 | 200000 | supported by current capability fallback | yes | repo-derived | Inherits provider default context length |
| `glm-4.6v` | GLM 4.6V (Vision) | 200000 | supported by current capability fallback | yes | repo-derived | Vision-labeled SKU |
| `glm-4.6` | GLM 4.6 | 200000 | supported by current capability fallback | yes | repo-derived | Inherits provider default context length |
| `glm-4.5v` | GLM 4.5V (Vision) | 200000 | supported by current capability fallback | yes | repo-derived | Vision-labeled SKU |
| `glm-4.5` | GLM 4.5 | 128000 | supported by current capability fallback | yes | repo-derived | Explicit per-model context override |
| `glm-4.5-air` | GLM 4.5 Air | 128000 | supported by current capability fallback | yes | repo-derived | Explicit per-model context override |

## Repo-derived pricing snapshot

| Model ID | Input | Output | Cached | Reasoning | Cache creation | Provenance |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `glm-5.1` | 1.2 | 5.0 | 0.3 | 5.0 | 1.2 | repo-derived |
| `glm-5` | 1.0 | 3.2 | 0.2 | 4.8 | 1.0 | repo-derived |
| `glm-5-turbo` | 1.2 | 4.0 | 0.24 | 4.0 | 1.2 | repo-derived |
| `glm-4.7-flashx` | 0.3 | 1.1 | 0.06 | 1.1 | 0.3 | repo-derived |
| `glm-4.7-flash` | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | repo-derived |
| `glm-4.7` | 0.6 | 2.2 | 0.11 | 2.2 | 0.6 | repo-derived |
| `glm-4.6v` | 0.3 | 0.9 | 0.05 | 0.9 | 0.3 | repo-derived |
| `glm-4.6` | 0.6 | 2.2 | 0.11 | 2.2 | 0.6 | repo-derived |
| `glm-4.5v` | 0.6 | 1.8 | 0.11 | 1.8 | 0.6 | repo-derived |
| `glm-4.5` | 0.6 | 2.2 | 0.11 | 2.2 | 0.6 | repo-derived |
| `glm-4.5-air` | 0.2 | 1.1 | 0.03 | 1.1 | 0.2 | repo-derived |

## Current repo observations to verify later

- `repo-derived`: the GLM Coding provider is implemented as an Anthropic Messages-compatible surface rather than an OpenAI-compatible one.
- `repo-derived`: no GLM-specific `toolCalling` flags are set in the registry; current capability handling treats GLM models as tool-call capable because they are not on the denylist.
- `repo-derived`: `glm-4.7-flash` is present in the registry and pricing table, but its pricing row is fully zeroed and should be explicitly confirmed in later audit steps.
- `repo-derived`: `glm-4.5` and `glm-4.5-air` override the provider default context length to `128000`.

## Deferred for later doc-backed expansion

- `doc-derived`: official endpoint documentation and any alternate endpoint variants
- `doc-derived`: model lifecycle status, deprecations, and release notes
- `doc-derived`: official tool-calling / function-calling support statements
- `doc-derived`: official context limits, max output limits, and multimodal constraints
- `doc-derived`: official pricing confirmation, especially for `glm-4.7-flash`

## GLM-5 family audit (doc-backed)

### Short audit summary

- `glm-5.1`: one validated repo mismatch was found and encoded. The supplied `using5.1` guide shows a `contextWindow` of `204800`, while the repo previously let `glm-5.1` inherit the provider default `200000`.
- `glm-5`: repo transport remains intentionally unchanged in this task. The supplied docs show OpenAI-compatible `/chat/completions` usage on Z.AI endpoints, while OmniRoute's GLM Coding provider is wired as an Anthropic Messages-compatible surface. A later live probe verified that the current Anthropic-compatible GLM Coding path does work with the configured key, so the remaining question is whether the documented OpenAI-compatible surface is an additional supported path worth migrating to, not whether the current repo transport is outright broken.
- No doc-backed basis was found in the supplied links to change pricing, tool-calling enablement, or structured-output flags in repo code.

### Exact repo lines affected

- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts:629` — GLM `glm-5.1` model entry context window override
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts:43-50` — regression test for the `glm-5.1` context window override
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/docs/superpowers/audits/2026-03-28-glm-coding-settings-audit.md:96-153` — GLM-5 audit record

### Mismatch list

1. Validated and fixed
   - Field: `glm-5.1` context length
   - Docs: `204800` in the supplied `using5.1` page example
   - Repo before fix: inherited provider default `200000`
   - Repo after fix: explicit `204800`
2. Validated but intentionally not changed in this task
   - Field: endpoint and compatibility mode for GLM-5 family
   - Docs: OpenAI-compatible usage is shown with `https://api.z.ai/api/paas/v4/` plus `/chat/completions`, and the supplied `using5.1` page shows OpenAI Compatible setup with `https://api.z.ai/api/coding/paas/v4`
   - Repo: `format: "claude"`, base URL `https://api.z.ai/api/anthropic/v1/messages`, Anthropic headers, `?beta=true`
   - Reason not changed: later live verification confirmed the current Anthropic-compatible path works for `glm-5`, so switching transport is now a product/compatibility choice rather than a fix for a broken repo path
3. Observed gap with insufficient doc basis to change repo
   - Field: pricing rows for `glm-5` and `glm-5.1`
   - Docs used here: no authoritative pricing data in the four supplied links
   - Action: leave repo pricing unchanged

### Safe next action list

- Validate, in a separate approved task, whether the OmniRoute GLM Coding provider should remain Anthropic-compatible or migrate to a Z.AI OpenAI-compatible coding endpoint.
- If transport migration is approved, audit request/response translation, auth header compatibility, and streaming/tool-call behavior before changing `format`, `baseUrl`, or headers.
- Continue later family audits (`glm-4.7`, `glm-4.6`, `glm-4.5`) using the same evidence split: doc fact, repo state, comparison status, evidence level.

### GLM-5 field-by-field comparison

| Family | Field | Doc-backed finding | Repo state | Comparison status | Evidence level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GLM-5.1 | Model ID | `glm-5.1` is explicitly shown in the supplied `using5.1` page | `glm-5.1` present | match | high | Direct string match |
| GLM-5 | Model ID | `glm-5` is explicitly shown in the supplied GLM-5 guide and migration page | `glm-5` present | match | high | Direct string match |
| GLM-5.1 | Context length | `contextWindow: 204800` is shown in the supplied `using5.1` page | previously inherited `200000`; now explicit `204800` | mismatch fixed | medium | Evidence is from a coding-agent configuration example rather than a standalone limits table |
| GLM-5 | Context length | supplied GLM-5 docs state maximum context `200K` | `200000` default | match | high | Repo default aligns with the documented 200K statement |
| GLM-5 | Max output tokens | supplied GLM-5 docs state maximum output `128K`; parameter page lists `max_tokens` max `131072` for `glm-5` | no explicit model capability row here | doc-only fact recorded | high | No safe repo field to update in audited files |
| GLM-5 family | Endpoint base URL | supplied docs show OpenAI-compatible bases `https://api.z.ai/api/paas/v4/` and `https://api.z.ai/api/coding/paas/v4` | `https://api.z.ai/api/anthropic/v1/messages` | mismatch | verified-live | Live probe confirmed the Anthropic-compatible repo path is functional; docs still show alternate OpenAI-compatible bases |
| GLM-5 family | Endpoint path | supplied docs show `/chat/completions` usage | `/api/anthropic/v1/messages?beta=true` | mismatch | verified-live | Keep explicit because request schema differs by path |
| GLM-5 family | Compatibility mode | supplied docs show OpenAI-compatible chat completions usage | `format: claude` with Anthropic headers | mismatch | verified-live | Live probe reduced this from an unvalidated mismatch to a confirmed alternate-surface question |
| GLM-5 family | Auth header | supplied docs show `Authorization: Bearer <api-key>` in OpenAI-compatible examples | `x-api-key` | mismatch | verified-live | `x-api-key` was verified live on the Anthropic-compatible repo path |
| GLM-5 family | Temperature | supported; migration guide says default `1.0` for GLM-5 | no GLM-specific unsupported flag blocks it | match | high | Repo effectively allows it |
| GLM-5 family | Top-p | supported; migration guide says default `0.95`, and parameter guide recommends tuning either `top_p` or `temperature` | no GLM-specific unsupported flag blocks it | match | high | Repo effectively allows it |
| GLM-5 family | Max tokens parameter | docs use and define `max_tokens`; no supplied doc confirms `max_completion_tokens` | repo audited files do not encode a conflicting alias rule | no mismatch found | medium | Leave unchanged |
| GLM-5 family | Thinking control | docs show `thinking: {"type":"enabled"}` support for GLM-5 family | repo request normalization already recognizes `thinking.type === "enabled"` elsewhere; no audited-file mismatch encoded | no mismatch found | medium | Doc default wording is internally inconsistent in migration docs, so only support is treated as high-confidence |
| GLM-5 family | Streaming | docs show `stream: true` and SSE streaming support | current provider supports streaming transport | no mismatch found | medium | No audited-file change required |
| GLM-5 family | Tool calling | supplied docs say GLM-5 supports function call and tool-call streaming | repo currently treats GLM models as tool-call capable | match | medium | The docs mention extra streaming details but not a repo-level flag change |
| GLM-5 family | Structured output | supplied GLM-5 guide says structured output formats like JSON are supported | no audited-file flag exists to contradict this | doc-only fact recorded | medium | No safe repo change identified |

## GLM-5 Turbo audit (doc-backed)

### Short audit summary

- The supplied GLM-5-Turbo page explicitly documents `glm-5-turbo` on Z.AI's OpenAI-compatible `/chat/completions` surface with base URL `https://api.z.ai/api/paas/v4/`.
- Repo model inventory and default context length already align on the model existing and using a `200000` token context window, and the repo already treats the model as tool-call capable with pricing present.
- The only validated mismatch is transport/compatibility: the OmniRoute GLM Coding provider is still configured as Anthropic Messages-compatible (`format: "claude"`, `https://api.z.ai/api/anthropic/v1/messages`, `x-api-key`, `?beta=true`). That mismatch is explicit but not safe to change from this page alone, so no provider code was changed.

### Exact repo lines affected

- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/docs/superpowers/audits/2026-03-28-glm-coding-settings-audit.md:154-215` — dedicated GLM-5 Turbo audit record

### Mismatch list

1. Validated but intentionally not changed in this task
   - Field: endpoint base URL
   - Docs: `https://api.z.ai/api/paas/v4/`
   - Repo: `https://api.z.ai/api/anthropic/v1/messages`
   - Reason not changed: changing transport would change the provider protocol, not just a model setting, and the provided page does not validate OmniRoute's GLM Coding Anthropic-compatible path.
2. Validated but intentionally not changed in this task
   - Field: endpoint path and compatibility mode
   - Docs: OpenAI-compatible `/chat/completions` requests
   - Repo: Anthropic Messages-compatible `format: "claude"` plus `?beta=true`
   - Reason not changed: requires separate transport validation across request schema, streaming, and tool-call behavior.
3. Validated but intentionally not changed in this task
   - Field: auth header pattern
   - Docs: `Authorization: Bearer your-api-key`
   - Repo: `x-api-key`
   - Reason not changed: auth semantics are coupled to the transport surface, so a model-family doc page is not enough basis to swap the provider auth contract.
4. Observed gap with insufficient doc basis to change repo
   - Field: pricing row for `glm-5-turbo`
   - Docs used here: no pricing is stated on the supplied page
   - Action: leave repo pricing unchanged.

### Safe next action list

- If transport migration is ever approved, validate the GLM Coding provider end-to-end against Z.AI's OpenAI-compatible `/chat/completions` contract before changing `format`, `baseUrl`, auth header behavior, or `urlSuffix`.
- In that follow-up, explicitly verify tool-call payload mapping, SSE streaming behavior, thinking parameter serialization, and any Anthropic-to-OpenAI request translation assumptions.
- Keep `glm-5-turbo` pricing unchanged until a source page that explicitly states pricing is supplied for audit.

### GLM-5 Turbo field-by-field comparison

| Family | Field | Doc-backed finding | Repo state | Comparison status | Evidence level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GLM-5 Turbo | Documented name | Page heading shows `GLM-5-Turbo` | model display name is `GLM 5 Turbo` | match | high | Cosmetic punctuation difference only; same model family |
| GLM-5 Turbo | Model ID | request examples use `glm-5-turbo` | `glm-5-turbo` present in provider model inventory | match | high | Direct string match |
| GLM-5 Turbo | Endpoint base URL | `https://api.z.ai/api/paas/v4/` | `https://api.z.ai/api/anthropic/v1/messages` | mismatch not changed | high | Endpoint family differs explicitly |
| GLM-5 Turbo | Endpoint path | `/chat/completions` | `/api/anthropic/v1/messages?beta=true` | mismatch not changed | high | Keep explicit because request schema changes with path |
| GLM-5 Turbo | Compatibility mode | OpenAI Python SDK compatibility is explicitly shown | `format: claude` with Anthropic headers | mismatch not changed | high | Provider transport change is out of scope for this audit |
| GLM-5 Turbo | Auth header pattern | `Authorization: Bearer your-api-key` | `x-api-key` | mismatch not changed | high | Transport-coupled difference |
| GLM-5 Turbo | Context length | `200K` | inherits provider default `200000` | match | high | Equivalent value |
| GLM-5 Turbo | Maximum output tokens | `128K` | no explicit audited-file capability row | doc-only fact recorded | high | No safe repo field to encode in scoped files |
| GLM-5 Turbo | Input modalities | `Text` | no contradictory repo field in audited files | doc-only fact recorded | high | Repo does not encode this field here |
| GLM-5 Turbo | Output modalities | `Text` | no contradictory repo field in audited files | doc-only fact recorded | high | Repo does not encode this field here |
| GLM-5 Turbo | Streaming support | page lists streaming output and examples use `stream: true` | current provider supports streaming transport | no mismatch found | medium | No model-specific flag required |
| GLM-5 Turbo | Function calling support | page lists function calling support | repo currently treats GLM models as tool-call capable | match | medium | Capability comes from registry absence of a denylist block |
| GLM-5 Turbo | Structured output support | page lists structured output with JSON | no contradictory audited-file flag exists | doc-only fact recorded | medium | No safe repo change identified |
| GLM-5 Turbo | Context caching support | page lists context caching | no contradictory audited-file flag exists | doc-only fact recorded | medium | No safe repo change identified |
| GLM-5 Turbo | MCP support | page lists MCP | no contradictory audited-file flag exists | doc-only fact recorded | medium | No safe repo change identified |
| GLM-5 Turbo | Thinking control support | page shows `thinking: {"type":"enabled"}` and says `enabled`/`disabled` are supported | no conflicting audited-file restriction found | no mismatch found | medium | Support is clear; default wording is accepted as page-stated but not encoded here |
| GLM-5 Turbo | Thinking default | page says default is `enabled` | no audited-file default knob for this model | doc-only fact recorded | medium | No safe repo field to encode |
| GLM-5 Turbo | Pricing | not stated on page | repo pricing row exists in `pricing.ts` | no mismatch found | high | Lack of doc evidence blocks any pricing change |

## GLM-4.7 family audit (doc-backed)

### Short audit summary

- The supplied GLM-4.7 guide explicitly covers `GLM-4.7`, `GLM-4.7-FlashX`, and `GLM-4.7-Flash`, and states `200K` context length, `128K` maximum output, streaming support, function calling, structured output, and thinking-mode support across that family.
- Repo inventory, default context length, tool-calling behavior, and the zero-priced `glm-4.7-flash` row are all consistent with the doc-backed facts that can be validated from the allowed sources.
- The only clear mismatch remains transport and compatibility mode: the supplied docs show a Z.AI OpenAI-compatible `/chat/completions` surface with Bearer auth, while OmniRoute's GLM Coding provider is still wired as Anthropic Messages-compatible with `x-api-key`. That mismatch is explicit but not safe to change in this task.
- The supplied Hugging Face page corroborates GLM-4.7 reasoning and tool-use support and confirms a separate open-weights offering, but it does not provide exact hosted API model IDs for `FlashX` or `Flash`.
- The supplied `z.ai/blog/glm-4.7` link yielded no extractable source content through the allowed fetch path, so no validated facts were taken from that page.

### Exact repo lines affected

- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts:614-640` — compared GLM Coding transport metadata, default context length, and GLM-4.7 family inventory
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/services/modelCapabilities.ts:4-45` — compared current tool-calling behavior used for GLM models
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/src/shared/constants/pricing.ts:731-808` — compared GLM-4.7 family pricing rows, including zero pricing for `glm-4.7-flash`
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts:8-86` — shared regression file used for focused verification evidence in this worktree
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/docs/superpowers/audits/2026-03-28-glm-coding-settings-audit.md:216-281` — added GLM-4.7 family audit record and focused test evidence

### Focused regression verification

- Command run from `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit`: `npm exec vitest run open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts`
- Result: passed successfully in the GLM audit worktree (`1` test file passed, `5` tests passed, duration `164ms`)

### Mismatch list

1. Validated but intentionally not changed in this task
   - Field: endpoint base URL
   - Docs: `https://api.z.ai/api/paas/v4/`
   - Repo: `https://api.z.ai/api/anthropic/v1/messages`
   - Reason not changed: switching transport would change the provider contract, not just a model setting, and the supplied sources do not validate OmniRoute's Anthropic-compatible GLM Coding path.
2. Validated but intentionally not changed in this task
   - Field: endpoint path and compatibility mode
   - Docs: OpenAI-compatible `/chat/completions` usage
   - Repo: Anthropic Messages-compatible `format: "claude"` plus `?beta=true`
   - Reason not changed: requires separate transport validation across request schema, streaming, thinking serialization, and tool-call behavior.
3. Validated but intentionally not changed in this task
   - Field: auth header pattern
   - Docs: `Authorization: Bearer <api-key>` in the Z.AI OpenAI-compatible examples
   - Repo: `x-api-key`
   - Reason not changed: auth semantics are coupled to the endpoint family, so a model-family page is not enough basis to swap the provider auth contract.
4. Observed gap with insufficient doc basis to change repo
   - Field: exact hosted API model IDs for `GLM-4.7-FlashX` and `GLM-4.7-Flash`
   - Docs: family names are shown, but the fetched guide excerpt only shows an exact request `model` string for `glm-4.7`
   - Repo: `glm-4.7-flashx` and `glm-4.7-flash`
   - Action: leave repo model IDs unchanged until a supplied source explicitly shows those hosted API IDs.
5. Observed gap with insufficient doc basis to change repo
   - Field: per-token pricing for `glm-4.7` and `glm-4.7-flashx`
   - Docs used here: no authoritative token pricing table in the allowed sources; only `glm-4.7-flash` is described as free
   - Action: leave repo pricing unchanged.

### Safe next action list

- If a later approved task wants to revisit GLM transport, validate whether OmniRoute's GLM Coding provider should remain Anthropic-compatible or migrate to Z.AI's OpenAI-compatible `/chat/completions` contract.
- If that transport follow-up is approved, verify auth headers, request schema mapping, streaming deltas, and tool/thinking payload translation before changing `format`, `baseUrl`, headers, or `urlSuffix`.
- Obtain a supplied source that explicitly shows the hosted API request model IDs for `GLM-4.7-FlashX` and `GLM-4.7-Flash` before changing those registry IDs.
- Obtain a supplied source with authoritative API token pricing before changing the `glm-4.7` or `glm-4.7-flashx` pricing rows.

### GLM-4.7 field-by-field comparison

| Family | Field | Doc-backed finding | Repo state | Comparison status | Evidence level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GLM-4.7 | Documented family variants | supplied guide covers `GLM-4.7`, `GLM-4.7-FlashX`, and `GLM-4.7-Flash` | all three families are represented in inventory | match | high | Variant family names align |
| GLM-4.7 | Exact model ID | request example explicitly uses `glm-4.7` | `glm-4.7` present | match | high | Direct string match |
| GLM-4.7 FlashX | Display name | page shows `GLM-4.7-FlashX` | repo display name is `GLM 4.7 FlashX` | match | high | Same model family, punctuation/casing normalized |
| GLM-4.7 FlashX | Exact hosted API model ID | family name is shown but no exact request `model` string was extracted | repo uses `glm-4.7-flashx` | insufficient doc detail | low | Not safe to rename from supplied evidence |
| GLM-4.7 Flash | Display name | page shows `GLM-4.7-Flash` | repo display name is `GLM 4.7 Flash` | match | high | Same model family, punctuation/casing normalized |
| GLM-4.7 Flash | Exact hosted API model ID | family name is shown but no exact request `model` string was extracted | repo uses `glm-4.7-flash` | insufficient doc detail | low | Not safe to rename from supplied evidence |
| GLM-4.7 family | Endpoint base URL | `https://api.z.ai/api/paas/v4/` | `https://api.z.ai/api/anthropic/v1/messages` | mismatch not changed | high | Explicit endpoint-family mismatch |
| GLM-4.7 family | Endpoint path | `/chat/completions` | `/api/anthropic/v1/messages?beta=true` | mismatch not changed | high | Request schema would change with this path |
| GLM-4.7 family | Compatibility mode | OpenAI Python SDK compatibility is explicitly shown | `format: claude` with Anthropic headers | mismatch not changed | high | Keep explicit because transport behavior differs |
| GLM-4.7 family | Auth header pattern | `Authorization: Bearer <api-key>` in OpenAI-compatible examples | `x-api-key` | mismatch not changed | high | Transport-coupled difference |
| GLM-4.7 family | Context length | `200K` for `GLM-4.7`, `GLM-4.7-FlashX`, and `GLM-4.7-Flash` | provider default `200000` covers all three | match | high | Equivalent numeric value |
| GLM-4.7 family | Maximum output tokens | `128K` on supplied guide; Hugging Face card gives `max new tokens: 131072` in default settings | no explicit audited-file capability row | doc-only fact recorded | high | Cross-source corroboration, but no safe scoped field to encode |
| GLM-4.7 family | Input modality | `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.7 family | Output modality | `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.7 family | Thinking support | supplied guide lists thinking mode and examples show `thinking: {"type":"enabled"}`; Hugging Face card describes interleaved/preserved/turn-level thinking | no conflicting audited-file restriction found | no mismatch found | high | Support is explicit across both allowed sources |
| GLM-4.7 family | Streaming support | supplied guide lists streaming output and examples use `stream: true` | current provider supports streaming transport | no mismatch found | medium | No model-specific flag required in scoped files |
| GLM-4.7 family | Function/tool calling support | supplied guide lists function call; Hugging Face card says tool calling is supported with OpenAI-style tool descriptions | repo currently treats GLM models as tool-call capable | match | high | Repo support comes from registry fallback behavior |
| GLM-4.7 family | Structured output support | supplied guide lists structured output | no contradictory audited-file flag exists | doc-only fact recorded | medium | No safe repo field to change |
| GLM-4.7 family | `glm-4.7-flash` pricing status | supplied guide describes Flash as completely free | repo pricing row is all zeroes | match | medium | Free-plan wording is not a token-pricing table, but it supports leaving row zeroed |
| GLM-4.7 family | `glm-4.7` pricing | no authoritative token pricing stated in allowed sources | repo row exists in `pricing.ts` | no mismatch found | high | Lack of supplied pricing evidence blocks a change |
| GLM-4.7 family | `glm-4.7-flashx` pricing | no authoritative token pricing stated in allowed sources | repo row exists in `pricing.ts` | no mismatch found | high | Lack of supplied pricing evidence blocks a change |
| GLM-4.7 | Open weights vs hosted API distinction | Hugging Face page confirms open weights plus a separate Z.AI API offering | repo models are for hosted provider config | no mismatch found | high | Important caveat: HF repo name is not enough to redefine hosted API IDs |

## GLM-4.6 family audit (doc-backed)

### Short audit summary

- The supplied GLM-4.6 guide explicitly documents `glm-4.6` on Z.AI's OpenAI-compatible `/chat/completions` surface with Bearer auth, `200K` context length, `128K` maximum output, text-only input/output, streaming support, and `thinking: {"type":"enabled"}` support.
- The supplied Hugging Face page corroborates `GLM-4.6` as a text-generation model with a `200K` context window, explicit reasoning improvement, and explicit tool-use support during inference. It also gives recommended generation settings such as `temperature=1.0`, and `top_p=0.95` plus `top_k=40` for code evaluation.
- The supplied `zai-org/GLM-V` repository explicitly documents the separate `GLM-4.6V` vision family, including an open-source served model name `glm-4.6v`, native multimodal function calling, and a `128K` context window in that open-weights/self-hosted context.
- Repo inventory and tool-calling behavior align with the validated family facts that can be safely mapped here. The only clear provider mismatch remains transport and compatibility mode: the supplied GLM-4.6 API docs show a Z.AI OpenAI-compatible `/chat/completions` surface with Bearer auth, while OmniRoute's GLM Coding provider is still wired as Anthropic Messages-compatible with `x-api-key`. That mismatch is explicit but not safe to change in this task.
- No minimal code or test changes were justified for GLM-4.6, because the remaining mismatches are transport-level or depend on open-weights VLM details that do not clearly override the hosted GLM Coding provider contract.

### Exact repo lines affected

- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts:613-639` — compared GLM Coding transport metadata, default context length, and GLM-4.6 family inventory
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/services/modelCapabilities.ts:4-45` — compared current tool-calling behavior used for GLM models
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/src/shared/constants/pricing.ts:730-786` — compared GLM-4.6 family pricing rows
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts:8-86` — shared regression file used for focused verification evidence in this worktree
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/docs/superpowers/audits/2026-03-28-glm-coding-settings-audit.md:300-372` — added GLM-4.6 family audit record and focused verification evidence

### Focused regression verification

- Command run from `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit`: `node_modules/.bin/vitest --root /home/overmind/Projects/omniroute/.worktrees/glm-coding-audit run /home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts`
- Result: passed successfully in the GLM audit worktree (`1` test file passed, `5` tests passed, duration `165ms`)

### Mismatch list

1. Validated but intentionally not changed in this task
   - Field: endpoint base URL
   - Docs: `https://api.z.ai/api/paas/v4/`
   - Repo: `https://api.z.ai/api/anthropic/v1/messages`
   - Reason not changed: switching transport would change the provider contract, not just a model setting, and the supplied sources do not validate OmniRoute's Anthropic-compatible GLM Coding path.
2. Validated but intentionally not changed in this task
   - Field: endpoint path and compatibility mode
   - Docs: OpenAI-compatible `/chat/completions` usage
   - Repo: Anthropic Messages-compatible `format: "claude"` plus `?beta=true`
   - Reason not changed: requires separate transport validation across request schema, streaming, thinking serialization, and tool-call behavior.
3. Validated but intentionally not changed in this task
   - Field: auth header pattern
   - Docs: `Authorization: Bearer <api-key>` in the supplied GLM-4.6 API examples
   - Repo: `x-api-key`
   - Reason not changed: auth semantics are coupled to the endpoint family, so a model-family page is not enough basis to swap the provider auth contract.
4. Observed gap with insufficiently scoped doc basis to change repo
   - Field: `glm-4.6v` context length
   - Docs: the supplied `zai-org/GLM-V` repository describes the open-source `GLM-4.6V` family as scaling its context window to `128K` tokens
   - Repo: `glm-4.6v` currently inherits the GLM provider default `200000`
   - Action: leave repo unchanged because the supplied evidence is from an open-weights/self-hosted VLM repository, not an explicit hosted GLM Coding API contract for OmniRoute's provider entry.
5. Observed gap with insufficient doc basis to change repo
   - Field: pricing rows for `glm-4.6` and `glm-4.6v`
   - Docs used here: no authoritative token pricing table appears in the supplied sources
   - Action: leave repo pricing unchanged.

### Safe next action list

- If a later approved task wants to revisit GLM transport, validate whether OmniRoute's GLM Coding provider should remain Anthropic-compatible or migrate to Z.AI's OpenAI-compatible `/chat/completions` contract.
- If that transport follow-up is approved, verify auth headers, request schema mapping, streaming deltas, tool payload translation, and thinking serialization before changing `format`, `baseUrl`, headers, or `urlSuffix`.
- Obtain a supplied source that explicitly states the hosted API contract for `glm-4.6v` before changing its registry context length or any multimodal capability assumptions.
- Obtain a supplied source with authoritative API token pricing before changing the `glm-4.6` or `glm-4.6v` pricing rows.

### GLM-4.6 field-by-field comparison

| Family | Field | Doc-backed finding | Repo state | Comparison status | Evidence level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GLM-4.6 | Exact model ID | supplied API guide explicitly uses `glm-4.6` | `glm-4.6` present | match | high | Direct string match |
| GLM-4.6 | Documented family name | supplied Hugging Face page heading shows `GLM-4.6` | repo display name is `GLM 4.6` | match | high | Same family, punctuation normalized |
| GLM-4.6V | Family existence | supplied `zai-org/GLM-V` repository explicitly includes `GLM-4.6V` | `glm-4.6v` present in inventory | match | high | Family presence is explicit |
| GLM-4.6V | Hosted/self-served model string | supplied `vllm` and `sglang` examples use `--served-model-name glm-4.6v` | repo uses `glm-4.6v` | match | medium | Evidence comes from self-hosted open-model serving examples, not hosted API docs |
| GLM-4.6 family | Endpoint base URL | supplied GLM-4.6 API guide uses `https://api.z.ai/api/paas/v4/` | `https://api.z.ai/api/anthropic/v1/messages` | mismatch not changed | high | Explicit endpoint-family mismatch |
| GLM-4.6 family | Endpoint path | supplied guide uses `/chat/completions` | `/api/anthropic/v1/messages?beta=true` | mismatch not changed | high | Request schema would change with this path |
| GLM-4.6 family | Compatibility mode | supplied guide shows OpenAI SDK compatibility | `format: claude` with Anthropic headers | mismatch not changed | high | Keep explicit because transport behavior differs |
| GLM-4.6 family | Auth header pattern | supplied guide uses `Authorization: Bearer <api-key>` | `x-api-key` | mismatch not changed | high | Transport-coupled difference |
| GLM-4.6 | Context length | supplied GLM-4.6 API guide says `200K`; Hugging Face page says expanded from `128K` to `200K tokens` | provider default `200000` covers `glm-4.6` | match | high | Cross-source corroboration with equivalent numeric value |
| GLM-4.6V | Context length | supplied `zai-org/GLM-V` repo says `GLM-4.6V` scales its context window to `128K` tokens | `glm-4.6v` inherits provider default `200000` | insufficiently scoped mismatch not changed | medium | Open-weights VLM evidence is not enough to rewrite hosted GLM Coding provider limits |
| GLM-4.6 | Maximum output tokens | supplied GLM-4.6 API guide says `128K` | no explicit audited-file capability row | doc-only fact recorded | high | No safe scoped field to encode |
| GLM-4.6 | Input modality | supplied GLM-4.6 API guide says `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.6 | Output modality | supplied GLM-4.6 API guide says `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.6 | Vision support | supplied GLM-4.6 API guide lists text-only I/O; supplied `GLM-V` repo separately documents `GLM-4.6V` as the vision family | repo splits `glm-4.6` and `glm-4.6v` into separate entries | match | high | Family split aligns with supplied sources |
| GLM-4.6 | Thinking support | supplied GLM-4.6 API guide shows `thinking: {"type":"enabled"}` and streaming `delta.reasoning_content`; Hugging Face page explicitly claims reasoning improvement | no conflicting audited-file restriction found | no mismatch found | high | Support is explicit across two allowed sources |
| GLM-4.6V | Thinking default in self-hosted stack | supplied `GLM-V` repo says thinking mode is enabled by default in `vLLM` and `SGLang` | no conflicting audited-file restriction found | doc-only fact recorded | medium | Open-model serving detail, not a hosted provider knob here |
| GLM-4.6 | Streaming support | supplied GLM-4.6 API guide lists streaming output and uses `stream: true` examples | current provider supports streaming transport | no mismatch found | medium | No model-specific flag required in scoped files |
| GLM-4.6 | Tool use support | supplied GLM-4.6 API guide says it supports tool use during inference; Hugging Face page says the same | repo currently treats GLM models as tool-call capable | match | high | Repo support comes from registry fallback behavior |
| GLM-4.6V | Function calling support | supplied `GLM-V` repo says `GLM-4.6V` integrates native Function Calling capabilities | repo currently treats `glm-4.6v` as tool-call capable | match | medium | Open-model multimodal evidence supports leaving tool capability enabled |
| GLM-4.6 | Structured output | not stated in the supplied GLM-4.6 sources used here | no contradictory audited-file flag exists | insufficient doc detail | low | No safe repo change identified |
| GLM-4.6 | Recommended temperature | supplied Hugging Face page recommends `temperature=1.0` for general evaluations | no audited-file model-specific override exists | doc-only fact recorded | medium | Recommendation is not a provider contract knob here |
| GLM-4.6 | Code-eval sampling settings | supplied Hugging Face page recommends `top_p=0.95` and `top_k=40` for code evaluation | no audited-file model-specific override exists | doc-only fact recorded | medium | Recommendation is not a provider contract knob here |
| GLM-4.6 family | Pricing | not stated in the supplied sources | repo pricing rows exist in `pricing.ts` | no mismatch found | high | Lack of supplied pricing evidence blocks any change |
| GLM-4.6 blog page | Additional audit facts | supplied `https://z.ai/blog/glm-4.6` page yielded no extractable content through the allowed fetch path | not applicable | unavailable source content | low | No validated facts taken from that page |

## GLM-4.5 family audit (doc-backed)

### Short audit summary

- The supplied GLM-4.5 guide (`https://docs.z.ai/guides/llm/glm-4.5`) explicitly documents the GLM-4.5 family on Z.AI's OpenAI-compatible `/chat/completions` surface with Bearer auth, text-only input/output, `128K` context length, `96K` maximum output, streaming support, function calling, structured output, and `thinking.type` controls with dynamic thinking enabled by default.
- The supplied Hugging Face `zai-org/GLM-4.5` page (`https://huggingface.co/zai-org/GLM-4.5`) and GitHub `zai-org/GLM-4.5` repository (`https://github.com/zai-org/GLM-4.5`) corroborate `GLM-4.5` and `GLM-4.5-Air` as open-weight hybrid reasoning models with `128K` context length and tool-calling support, while also making clear those sources are primarily open-weights/self-hosting documentation rather than a hosted GLM Coding API contract.
- Repo inventory already aligns on `glm-4.5` and `glm-4.5-air` using `128000` context windows and current tool-calling support. The only clear repo mismatch remains transport and compatibility mode: the supplied hosted docs show Z.AI's OpenAI-compatible `/chat/completions` path with Bearer auth, while OmniRoute's GLM Coding provider is still wired as Anthropic Messages-compatible with `x-api-key`.
- The repo also exposes `glm-4.5v`, but none of the four allowed GLM-4.5 sources supplied a hosted API contract for a `V` variant. That makes `glm-4.5v` a repo-only inventory entry in this audit scope, not a safe deletion or rename candidate.
- No minimal code or test changes were justified for GLM-4.5, because the validated differences are transport-level or lack sufficiently specific doc evidence for a safe model or pricing change.

### Source links used

- GLM-4.5 guide: `https://docs.z.ai/guides/llm/glm-4.5`
- GLM-4.5 blog: `https://z.ai/blog/glm-4.5`
- GitHub `zai-org/GLM-4.5`: `https://github.com/zai-org/GLM-4.5`
- Hugging Face `zai-org/GLM-4.5`: `https://huggingface.co/zai-org/GLM-4.5`

### Exact repo lines inspected

- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts:614-640` — compared GLM Coding transport metadata and GLM-4.5 family model inventory
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/services/modelCapabilities.ts:4-45` — compared current GLM tool-calling behavior
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/src/shared/constants/pricing.ts:730-808` — compared GLM-4.5 family pricing rows
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts:8-86` — shared regression file used for focused verification evidence in this worktree
- `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/docs/superpowers/audits/2026-03-28-glm-coding-settings-audit.md:387-478` — changed audit worksheet lines for the GLM-4.5 family record and focused verification evidence

### Focused regression verification

- Command run from `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit`: `node_modules/.bin/vitest --root /home/overmind/Projects/omniroute/.worktrees/glm-coding-audit run /home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts`
- Result: passed successfully in the GLM audit worktree (`1` test file passed, `5` tests passed, duration `168ms`)

### Mismatch list

1. Validated but intentionally not changed in this task
   - Field: endpoint base URL
   - Docs: `https://api.z.ai/api/paas/v4/`
   - Repo: `https://api.z.ai/api/anthropic/v1/messages`
   - Reason not changed: switching transport would change the provider contract, not just a model setting, and the supplied sources do not validate OmniRoute's Anthropic-compatible GLM Coding path.
2. Validated but intentionally not changed in this task
   - Field: endpoint path and compatibility mode
   - Docs: OpenAI-compatible `/chat/completions` usage via OpenAI SDK examples
   - Repo: Anthropic Messages-compatible `format: "claude"` plus `?beta=true`
   - Reason not changed: requires separate transport validation across request schema, streaming, structured output behavior, thinking serialization, and tool-call behavior.
3. Validated but intentionally not changed in this task
   - Field: auth header pattern
   - Docs: `Authorization: Bearer <api-key>` in the supplied GLM-4.5 guide examples
   - Repo: `x-api-key`
   - Reason not changed: auth semantics are coupled to the endpoint family, so a model-family page is not enough basis to swap the provider auth contract.
4. Observed gap with insufficient doc basis to change repo
   - Field: exact hosted API model IDs for `GLM-4.5-Air`, `GLM-4.5-X`, `GLM-4.5-AirX`, and `GLM-4.5-Flash`
   - Docs: the supplied GLM-4.5 guide shows those family names, but the only exact request `model` string shown is `glm-4.5`
   - Repo: `glm-4.5-air` exists, while `X`, `AirX`, and `Flash` are absent from provider inventory
   - Action: leave model inventory unchanged until a supplied source explicitly shows exact hosted API request IDs for those variants.
5. Observed gap with insufficiently scoped doc basis to change repo
   - Field: `glm-4.5v` inventory entry
   - Docs: the supplied GLM-4.5 guide shows text-only input/output and the allowed Hugging Face/GitHub sources describe open-weight `GLM-4.5` and `GLM-4.5-Air`, but no supplied source documents a hosted `GLM-4.5V` contract
   - Repo: `glm-4.5v` is present in the GLM Coding provider inventory
   - Action: leave repo unchanged because absence from these supplied family pages is not enough evidence to remove a shipped provider model entry.
6. Observed gap with insufficient doc basis to change repo
   - Field: pricing rows for `glm-4.5`, `glm-4.5-air`, and `glm-4.5v`
   - Docs: the supplied GLM-4.5 guide only states family-level pricing "as low as `$0.2` input / `$1.1` output per million tokens", without assigning exact prices to individual hosted variants
   - Repo: per-model pricing rows exist in `pricing.ts`
   - Action: leave repo pricing unchanged until a supplied source explicitly ties prices to specific hosted model IDs.

### Safe next action list

- If a later approved task wants to revisit GLM transport, validate whether OmniRoute's GLM Coding provider should remain Anthropic-compatible or migrate to Z.AI's OpenAI-compatible `/chat/completions` contract.
- If that transport follow-up is approved, verify auth headers, request schema mapping, streaming deltas, structured output behavior, tool payload translation, and thinking serialization before changing `format`, `baseUrl`, headers, or `urlSuffix`.
- Obtain a supplied source that explicitly shows hosted API request model IDs for `GLM-4.5-Air`, `GLM-4.5-X`, `GLM-4.5-AirX`, and `GLM-4.5-Flash` before expanding or renaming the registry inventory.
- Obtain a supplied source that explicitly states the hosted API contract for any `GLM-4.5V` variant before changing or removing `glm-4.5v`.
- Obtain a supplied source with authoritative per-model API token pricing before changing the `glm-4.5`, `glm-4.5-air`, or `glm-4.5v` pricing rows.

### GLM-4.5 field-by-field comparison

| Family | Field | Doc-backed finding | Repo state | Comparison status | Evidence level | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GLM-4.5 | Exact model ID | supplied GLM-4.5 guide explicitly uses `glm-4.5` in request examples | `glm-4.5` present | match | high | Direct string match |
| GLM-4.5 | Documented family name | supplied guide and supplied Hugging Face/GitHub pages explicitly show `GLM-4.5` | repo display name is `GLM 4.5` | match | high | Same family, punctuation normalized |
| GLM-4.5 Air | Documented family name | supplied guide and supplied Hugging Face/GitHub pages explicitly show `GLM-4.5-Air` | repo display name is `GLM 4.5 Air` and model ID is `glm-4.5-air` | match | high | Family name matches; hosted request ID is not explicitly shown in supplied docs |
| GLM-4.5 X | Family existence | supplied guide lists `GLM-4.5-X` | not present in repo inventory | insufficient doc detail | medium | Family name alone is not enough to add a hosted provider ID |
| GLM-4.5 AirX | Family existence | supplied guide lists `GLM-4.5-AirX` | not present in repo inventory | insufficient doc detail | medium | Family name alone is not enough to add a hosted provider ID |
| GLM-4.5 Flash | Family existence | supplied guide lists `GLM-4.5-Flash` | not present in repo inventory | insufficient doc detail | medium | Family name alone is not enough to add a hosted provider ID |
| GLM-4.5 Air | Exact hosted API model ID | family name is shown, but no exact request `model` string was extracted | repo uses `glm-4.5-air` | insufficient doc detail | low | Not safe to rename from supplied evidence |
| GLM-4.5 family | Endpoint base URL | supplied guide shows `https://api.z.ai/api/paas/v4/` | `https://api.z.ai/api/anthropic/v1/messages` | mismatch not changed | high | Explicit endpoint-family mismatch |
| GLM-4.5 family | Endpoint path | supplied guide shows `/chat/completions` | `/api/anthropic/v1/messages?beta=true` | mismatch not changed | high | Request schema would change with this path |
| GLM-4.5 family | Compatibility mode | supplied guide explicitly shows OpenAI Python SDK compatibility | `format: claude` with Anthropic headers | mismatch not changed | high | Keep explicit because transport behavior differs |
| GLM-4.5 family | Auth header pattern | supplied guide uses `Authorization: Bearer <api-key>` | `x-api-key` | mismatch not changed | high | Transport-coupled difference |
| GLM-4.5 family | Context length | supplied guide says `128K`; supplied Hugging Face/GitHub pages also state full `128K` context length for GLM-4.5 and GLM-4.5-Air | `glm-4.5` and `glm-4.5-air` both use `128000`; `glm-4.5v` inherits provider default `200000` | partial match | high | Hosted API evidence clearly supports the text family; open-weight sources corroborate the same limit for GLM-4.5 and GLM-4.5-Air only |
| GLM-4.5 family | Maximum output tokens | supplied guide says `96K` | no explicit audited-file capability row | doc-only fact recorded | high | No safe scoped field to encode |
| GLM-4.5 family | Input modality | supplied guide says `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.5 family | Output modality | supplied guide says `Text` | no contradictory audited-file field | doc-only fact recorded | high | Repo does not encode modality here |
| GLM-4.5 family | Vision support | supplied guide only documents text I/O; no supplied source documents a hosted GLM-4.5 vision contract | repo includes separate `glm-4.5v` entry | insufficiently scoped mismatch not changed | medium | Not enough evidence to remove or redefine `glm-4.5v` |
| GLM-4.5 family | Thinking support | supplied guide documents `thinking.type` with `enabled` and `disabled`; supplied Hugging Face page describes thinking and non-thinking modes | no conflicting audited-file restriction found | no mismatch found | high | Support is explicit across hosted and open-weight sources |
| GLM-4.5 family | Thinking default | supplied guide says dynamic thinking is enabled by default; supplied Hugging Face page says vLLM/SGLang enable thinking by default | no audited-file default knob for this model | doc-only fact recorded | medium | Hosted and self-hosted defaults should not be conflated into a provider config change |
| GLM-4.5 family | Streaming support | supplied guide lists streaming output and uses `stream: true` examples | current provider supports streaming transport | no mismatch found | medium | No model-specific flag required in scoped files |
| GLM-4.5 family | Function/tool calling support | supplied guide lists function call support; supplied Hugging Face/GitHub pages say tool calling is supported | repo currently treats GLM models as tool-call capable | match | high | Repo support comes from registry fallback behavior |
| GLM-4.5 family | Structured output | supplied guide lists structured output and JSON support | no contradictory audited-file flag exists | doc-only fact recorded | high | No safe repo field to change |
| GLM-4.5 family | Pricing | supplied guide says the series is priced "as low as `$0.2` input / `$1.1` output per million tokens" | repo has per-model pricing rows for `glm-4.5`, `glm-4.5-air`, and `glm-4.5v` | insufficient doc detail | medium | Family-level minimum pricing is not enough to rewrite per-model rows |
| GLM-4.5 blog page | Additional audit facts | supplied `https://z.ai/blog/glm-4.5` page yielded no extractable content through the allowed fetch path | not applicable | unavailable source content | low | No validated facts taken from that page |

## Exit criteria for this scaffold task

- [x] Repo-only GLM Coding inventory captured
- [x] Endpoint subfields explicitly recorded
- [x] Provenance marked as repo-derived
- [x] Later doc-expansion placeholders added
- [x] Regression harness added separately under MCP server tests
- [x] GLM-5 doc-backed audit recorded
- [x] GLM-5 Turbo doc-backed audit recorded
- [x] GLM-4.7 doc-backed audit recorded
- [x] GLM-4.6 doc-backed audit recorded
- [x] GLM-4.5 doc-backed audit recorded
- [x] Validated minimal mismatch encoded where safely supported

## Final cross-family verification

- Focused GLM regression: `"/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/node_modules/.bin/vitest" --root "/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit" run "/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts"` → PASS (`1` file, `5` tests)
- Broader Vitest suite: `rtk npm --prefix "/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit" run test:vitest` → PASS (`7` files, `63` tests)
- Worksheet review result: no additional unresolved worksheet rows were found beyond the items summarized below; one explicit `repo-only` item remains (`glm-4.5v`, pending a supplied hosted API source)
- Live transport verification: Anthropic-compatible repo path (`https://api.z.ai/api/anthropic/v1/messages?beta=true` with `x-api-key` + Anthropic headers) returned `200` and a valid `glm-5` response; documented OpenAI-compatible path (`https://api.z.ai/api/paas/v4/chat/completions` with Bearer auth) returned `429` / `Insufficient balance or no resource package`, so it remains an available documented alternative but not a superior replacement proven by this session

## Final summary

### Fixed in this audit

| Change | Repo files | Supporting source link | Verification |
| --- | --- | --- | --- |
| Added an explicit `glm-5.1` context-length override from `200000` to `204800` | `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/config/providerRegistry.ts:629`, `/home/overmind/Projects/omniroute/.worktrees/glm-coding-audit/open-sse/mcp-server/__tests__/glmCodingProviderConfig.test.ts:43-50` | `https://docs.z.ai/devpack/using5.1` (`contextWindow: 204800`) | focused GLM regression PASS; broader Vitest suite PASS |

### Pending more docs or separate transport validation

| Pending item | Why it remains pending | Supporting source link(s) |
| --- | --- | --- |
| Whether OmniRoute should keep the current Anthropic-compatible GLM Coding transport or add/migrate to the documented OpenAI-compatible surface | Live verification showed the current repo transport works for `glm-5`, so this is no longer a broken-path concern; it remains pending as a product/compatibility decision because docs also advertise OpenAI-compatible `/chat/completions` usage with Bearer auth | live probe against `https://api.z.ai/api/anthropic/v1/messages?beta=true`; supplied GLM-5 guide and migration page; `https://docs.z.ai/devpack/using5.1`; supplied GLM-5-Turbo page; supplied GLM-4.7 guide; supplied GLM-4.6 guide; supplied GLM-4.5 guide (`https://docs.z.ai/guides/llm/glm-4.5`) |
| `glm-4.7-flashx` and `glm-4.7-flash` hosted API request IDs | Allowed GLM-4.7 sources name the families but do not provide extracted hosted request `model` strings for those variants | supplied GLM-4.7 guide; supplied Hugging Face GLM-4.7 page |
| `glm-4.6v` hosted API contract, including whether the hosted context limit matches the open-weights `128K` documentation | The supplied `GLM-V` material is open-weights/self-hosted evidence, not a hosted GLM Coding API contract | supplied GLM-4.6 guide; supplied `zai-org/GLM-V` repository |
| `glm-4.5v` repo-only inventory entry | None of the supplied GLM-4.5 hosted/open-weights sources documented a hosted `GLM-4.5V` contract, so the repo entry cannot be safely removed or renamed | supplied GLM-4.5 guide (`https://docs.z.ai/guides/llm/glm-4.5`); `https://huggingface.co/zai-org/GLM-4.5`; `https://github.com/zai-org/GLM-4.5` |
| Per-model pricing for `glm-5.1`, GLM-5, GLM-5 Turbo, GLM-4.7, GLM-4.6, and GLM-4.5 families | The supplied sources did not provide authoritative per-model hosted API pricing tables that were specific enough to rewrite repo pricing rows safely | supplied family docs used in the sections above; GLM-4.5 guide only states family-level pricing minimums |
