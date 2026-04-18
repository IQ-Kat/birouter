# Feature: Per-Key Token Rate Limiting (TPM/TPD) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇪🇸 [es](../../../es/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇩🇪 [de](../../../de/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇮🇹 [it](../../../it/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇮🇳 [in](../../../in/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇹🇭 [th](../../../th/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇮🇩 [id](../../../id/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇳🇴 [no](../../../no/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇩🇰 [da](../../../da/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇮🇱 [he](../../../he/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1305-per-key-token-rate-limiting.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1305-per-key-token-rate-limiting.md)

---

> GitHub Issue: #1305 — opened by @kaccang on 2026-04-16
> Status: ⏭️ DEFER | Priority: Medium

## 📝 Original Request

OmniRoute already supports per-key request-based limits, but subscription-based API operators also need token-based limits to control upstream cost exposure. A single request to a large-context model can consume far more compute and cost than a normal request while still counting as only one request.

**Use case examples (from author):**

- Lite plan: 32K tokens/minute, 5M tokens/day
- Pro plan: 64K tokens/minute, 15M tokens/day

**Proposed fields:**

- `max_tokens_per_minute` (TPM)
- `max_tokens_per_day` (TPD)

Returns HTTP 429 with `token_limit_exceeded` reason when exceeded.

## 💬 Community Discussion

### Participants

- @kaccang — Original requester, detailed operator-focused use case

### Key Points

- Addresses operators selling subscription-based AI API products through OmniRoute
- Request-only limits are insufficient for long-context or high-output models
- Token accounting should use actual usage from upstream response `usage` fields
- Must handle both streaming and non-streaming accounting paths
- Backward compatible — keys without token limits keep existing behavior

## 🎯 Refined Feature Description

Add optional per-API-key token-based rate limiting alongside existing request-based limits, enabling operators to enforce fair-use policies based on actual token consumption.

### What it solves

- Disproportionate cost exposure from large-context requests that count as single requests
- Inability to sell token-based subscription plans through OmniRoute
- Lack of per-customer cost protection for mixed model catalogs with varying context windows

### How it should work (high level)

1. Add `max_tokens_per_minute` and `max_tokens_per_day` optional fields to API key configuration
2. After each response, extract `usage.total_tokens` from the upstream response
3. Account consumed tokens to the authenticated key using sliding window counters
4. Before each request, check if the key has remaining token budget for the current window
5. If budget exceeded, return 429 with `token_limit_exceeded` error code and `Retry-After` header
6. For streaming responses, account tokens from the final usage chunk (`stream_options.include_usage`)
7. Dashboard UI: display TPM/TPD fields in the API key creation/edit modal

### Affected areas

- `src/lib/db/apiKeys.ts` — new columns for TPM/TPD limits
- `open-sse/services/rateLimitManager.ts` — token-based window tracking
- `open-sse/handlers/chatCore.ts` — post-response token accounting
- `src/app/api/v1/` routes — pre-request token budget check
- `src/app/(dashboard)/dashboard/settings/` — API key modal UI extension
- DB migrations — new columns on `api_keys` table

## 📎 Attachments & References

- Author's detailed acceptance criteria and test plan in issue body

## 🔗 Related Ideas

- Directly related to [1320-rate-limit-headers](./1320-rate-limit-headers.md) — expose token limits via standard headers
