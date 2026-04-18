# Feature: Add Meta Muse Spark (meta.ai) Web Subscription Provider (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../../../_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇪🇸 [es](../../../../es/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇫🇷 [fr](../../../../fr/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇩🇪 [de](../../../../de/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇮🇹 [it](../../../../it/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇷🇺 [ru](../../../../ru/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇨🇳 [zh-CN](../../../../zh-CN/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇯🇵 [ja](../../../../ja/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇰🇷 [ko](../../../../ko/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇸🇦 [ar](../../../../ar/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇮🇳 [hi](../../../../hi/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇮🇳 [in](../../../../in/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇹🇭 [th](../../../../th/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇻🇳 [vi](../../../../vi/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇮🇩 [id](../../../../id/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇲🇾 [ms](../../../../ms/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇳🇱 [nl](../../../../nl/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇵🇱 [pl](../../../../pl/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇸🇪 [sv](../../../../sv/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇳🇴 [no](../../../../no/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇩🇰 [da](../../../../da/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇫🇮 [fi](../../../../fi/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇵🇹 [pt](../../../../pt/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇷🇴 [ro](../../../../ro/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇭🇺 [hu](../../../../hu/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇧🇬 [bg](../../../../bg/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇸🇰 [sk](../../../../sk/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇺🇦 [uk-UA](../../../../uk-UA/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇮🇱 [he](../../../../he/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇵🇭 [phi](../../../../phi/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇧🇷 [pt-BR](../../../../pt-BR/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇨🇿 [cs](../../../../cs/_ideia/viable/need_details/1308-meta-muse-spark-provider.md) · 🇹🇷 [tr](../../../../tr/_ideia/viable/need_details/1308-meta-muse-spark-provider.md)

---

> GitHub Issue: #1308 — opened by @dhaern on 2026-04-16
> Status: ❓ NEEDS DETAIL | Priority: Medium

## 📝 Original Request

Add Meta Muse Spark (meta.ai) as a web subscription provider, supporting cookie-based access to the chat interface for text generation. The proposal covers three model variants:

- `muse-spark` — instant mode
- `muse-spark-thinking` — thinking mode
- `muse-spark-contemplating` — deep reasoning mode

The proposed auth flow involves a 3-step cookie acquisition process:

1. GET meta.ai → extract `lsd` + `dtsg` tokens from HTML
2. POST `useAbraAcceptTOSForTempUserMutation` → get access token
3. POST `graph.meta.ai/graphql` with `abra_sess` cookie

## 💬 Community Discussion

### Participants

- @dhaern — Original requester, detailed proposal with auth flow, model variants, and file structure
- @RaviTharuma — Contributor (built Grok Web + Perplexity Web executors), provided feasibility analysis

### Key Points

- **@RaviTharuma's analysis is critical:**
  - Auth pattern similar to Grok/Perplexity Web executors — feasible
  - Primary reference `Strvm/meta-ai-api` (398 stars) is 2 years stale (Llama 3 era)
  - Meta's multi-step auth is harder than Grok/Perplexity (3 steps vs 1 cookie)
  - Facebook's anti-bot infrastructure is more aggressive (DTSG tokens, Captcha challenges)
  - Found `dyagz/LLM-Proxy-API` (Apr 2026) — uses Playwright browser automation, suggesting API may be locked down
- **Two possible approaches:**
  1. **Cookie + GraphQL** (preferred) — stateless, clean, follows existing executor pattern
  2. **Playwright browser automation** — works but heavy, single-session, requires browser process
- **Blocker:** Needs fresh API traffic capture from meta.ai to verify current GraphQL mutations

## 🎯 Refined Feature Description

Add a cookie-based executor for Meta Muse Spark following the same pattern as Grok Web and Perplexity Web executors, supporting text generation through meta.ai's GraphQL API.

### What it solves

- Enables Meta AI subscribers to route requests through OmniRoute
- Adds a major free-tier AI model provider to the catalog
- Extends web-subscription provider coverage

### How it should work (high level)

1. User provides their `abra_sess` cookie from meta.ai in the dashboard
2. OmniRoute sends GraphQL mutations to `graph.meta.ai/graphql`
3. Supports streaming responses via NDJSON or SSE (to be confirmed from traffic capture)
4. Maps to three model variants: instant, thinking, contemplating

### Affected areas

- `open-sse/executors/` — new `meta-ai.ts` executor
- `src/shared/constants/providers.ts` — register in `WEB_COOKIE_PROVIDERS`
- `open-sse/config/providerRegistry.ts` — model registration (3 variants)
- Dashboard provider UI — new provider card with cookie auth

### What is needed to proceed

1. Fresh network traffic capture from meta.ai (HAR export or request/response bodies)
2. Confirmation of current GraphQL mutation names for Muse Spark
3. Verification of whether pure HTTP/GraphQL approach is still viable (vs. Playwright-only)

## 📎 Attachments & References

- `Strvm/meta-ai-api` (398 stars): https://github.com/Strvm/meta-ai-api — primary reference (stale)
- `dyagz/LLM-Proxy-API` (Apr 2026): browser-backed proxy for meta.ai — alternative approach

## 🔗 Related Ideas

- Same pattern as Grok Web (`open-sse/executors/grok-web.ts`) and Perplexity Web executors
