# Feature: Add Freepik Pikaso Image Generation Provider (Cookie/Subscription-Based) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1276-freepik-pikaso-provider.md) · 🇪🇸 [es](../../../es/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇩🇪 [de](../../../de/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇮🇹 [it](../../../it/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇮🇳 [in](../../../in/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇹🇭 [th](../../../th/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇮🇩 [id](../../../id/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇳🇴 [no](../../../no/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇩🇰 [da](../../../da/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇮🇱 [he](../../../he/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1276-freepik-pikaso-provider.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1276-freepik-pikaso-provider.md)

---

> GitHub Issue: #1276 — opened by @RaviTharuma on 2026-04-15
> Status: ⏭️ DEFER | Priority: Low

## 📝 Original Request

Add Freepik Pikaso as a cookie/subscription-based image generation provider. Pikaso is Freepik's AI image generation tool that uses a session cookie for authentication and can be accessed through their web API.

The author (@RaviTharuma) is a known contributor who built the Perplexity Web and Grok Web executors.

## 💬 Community Discussion

### Participants

- @RaviTharuma — Original requester, contributor (built Perplexity Web + Grok Web executors)

### Key Points

- Would follow the same cookie-based executor pattern as Grok Web and Perplexity Web
- Freepik Pikaso uses subscription-based access (cookie auth)
- Needs reverse-engineering of the Pikaso API endpoints and response format
- No community discussion beyond the initial proposal

## 🎯 Refined Feature Description

Add a new cookie-based image generation executor for Freepik Pikaso, following the established pattern of web-subscription providers (Grok Web, Perplexity Web).

### What it solves

- Enables Freepik Pikaso subscribers to route image generation through OmniRoute
- Extends image generation provider coverage alongside existing DALL-E, SD WebUI, ComfyUI

### How it should work (high level)

1. User provides their Freepik session cookie in the dashboard
2. OmniRoute sends image generation requests to Pikaso's internal API
3. Responses are translated to the standard OmniRoute image generation format
4. Supports text-to-image generation with style/model parameters

### Affected areas

- `open-sse/executors/` — new `freepik-pikaso.ts` executor
- `src/shared/constants/providers.ts` — register in `WEB_COOKIE_PROVIDERS` or image-specific catalog
- `open-sse/handlers/imageGeneration.ts` — add Pikaso routing support
- `open-sse/config/providerRegistry.ts` — model registration

## 📎 Attachments & References

- No external references provided yet; needs API traffic capture

## 🔗 Related Ideas

- Same pattern as Grok Web and Perplexity Web cookie-based executors
