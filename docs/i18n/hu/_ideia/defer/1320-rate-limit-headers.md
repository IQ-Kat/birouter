# Feature: Standard Rate Limit Headers for Requests, Tokens, Resets, and Retry-After (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1320-rate-limit-headers.md) · 🇪🇸 [es](../../../es/_ideia/defer/1320-rate-limit-headers.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1320-rate-limit-headers.md) · 🇩🇪 [de](../../../de/_ideia/defer/1320-rate-limit-headers.md) · 🇮🇹 [it](../../../it/_ideia/defer/1320-rate-limit-headers.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1320-rate-limit-headers.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1320-rate-limit-headers.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1320-rate-limit-headers.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1320-rate-limit-headers.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1320-rate-limit-headers.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1320-rate-limit-headers.md) · 🇮🇳 [in](../../../in/_ideia/defer/1320-rate-limit-headers.md) · 🇹🇭 [th](../../../th/_ideia/defer/1320-rate-limit-headers.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1320-rate-limit-headers.md) · 🇮🇩 [id](../../../id/_ideia/defer/1320-rate-limit-headers.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1320-rate-limit-headers.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1320-rate-limit-headers.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1320-rate-limit-headers.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1320-rate-limit-headers.md) · 🇳🇴 [no](../../../no/_ideia/defer/1320-rate-limit-headers.md) · 🇩🇰 [da](../../../da/_ideia/defer/1320-rate-limit-headers.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1320-rate-limit-headers.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1320-rate-limit-headers.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1320-rate-limit-headers.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1320-rate-limit-headers.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1320-rate-limit-headers.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1320-rate-limit-headers.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1320-rate-limit-headers.md) · 🇮🇱 [he](../../../he/_ideia/defer/1320-rate-limit-headers.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1320-rate-limit-headers.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1320-rate-limit-headers.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1320-rate-limit-headers.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1320-rate-limit-headers.md)

---

> GitHub Issue: #1320 — opened by @kaccang on 2026-04-16
> Status: ⏭️ DEFER | Priority: Medium

## 📝 Original Request

When a client is throttled, it should receive machine-readable rate-limit information via standard HTTP headers so it can back off correctly. Without explicit response headers, clients guess retry timing, producing unnecessary retry loops that increase pressure on the gateway.

**Proposed headers (from author):**

Request-based:

- `X-RateLimit-Limit-Requests-Minute` / `X-RateLimit-Remaining-Requests-Minute` / `X-RateLimit-Reset-Requests-Minute`
- `X-RateLimit-Limit-Requests-Day` / `X-RateLimit-Remaining-Requests-Day` / `X-RateLimit-Reset-Requests-Day`

Token-based (if configured):

- `X-RateLimit-Limit-Tokens-Minute` / `X-RateLimit-Remaining-Tokens-Minute` / `X-RateLimit-Reset-Tokens-Minute`
- `X-RateLimit-Limit-Tokens-Day` / `X-RateLimit-Remaining-Tokens-Day` / `X-RateLimit-Reset-Tokens-Day`

On 429: `Retry-After` header.

## 💬 Community Discussion

### Participants

- @kaccang — Original requester, also opened #1305 (per-key token rate limiting)

### Key Points

- Aligns with OpenAI's rate-limit header convention
- Useful for SDKs, automation tools, and customer dashboards
- Backward compatible — clients that don't consume headers are unaffected
- Author provided detailed acceptance criteria and test plan

## 🎯 Refined Feature Description

Expose current rate-limit state via standard HTTP response headers on all API responses, and include `Retry-After` on 429 responses.

### What it solves

- Clients cannot determine remaining quota without trial-and-error
- SDKs and automation tools lack machine-readable throttling signals
- Unnecessary retry loops when clients guess retry timing

### How it should work (high level)

1. On every successful response, inject rate-limit headers reflecting the authenticated key's current state
2. On 429 responses, include `Retry-After` with the number of seconds until the next window
3. Request-based and token-based headers are independent — only include what is configured
4. Headers are derived from the existing `rateLimitManager` state, no new persistence needed

### Affected areas

- `open-sse/services/rateLimitManager.ts` — expose current window state
- `open-sse/handlers/chatCore.ts` — inject headers into response
- `src/app/api/v1/` routes — inject headers at route level
- `src/middleware/` — potential centralized header injection

## 📎 Attachments & References

- Author's test plan included in the issue body

## 🔗 Related Ideas

- Directly related to [1305-per-key-token-rate-limiting](./1305-per-key-token-rate-limiting.md) — both address rate-limit observability
