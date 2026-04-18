# Feature: Image Generation for Custom OpenAI-Compatible Providers (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/973-custom-provider-image-gen.md) · 🇪🇸 [es](../../../es/_ideia/notfit/973-custom-provider-image-gen.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/973-custom-provider-image-gen.md) · 🇩🇪 [de](../../../de/_ideia/notfit/973-custom-provider-image-gen.md) · 🇮🇹 [it](../../../it/_ideia/notfit/973-custom-provider-image-gen.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/973-custom-provider-image-gen.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/973-custom-provider-image-gen.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/973-custom-provider-image-gen.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/973-custom-provider-image-gen.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/973-custom-provider-image-gen.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/973-custom-provider-image-gen.md) · 🇮🇳 [in](../../../in/_ideia/notfit/973-custom-provider-image-gen.md) · 🇹🇭 [th](../../../th/_ideia/notfit/973-custom-provider-image-gen.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/973-custom-provider-image-gen.md) · 🇮🇩 [id](../../../id/_ideia/notfit/973-custom-provider-image-gen.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/973-custom-provider-image-gen.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/973-custom-provider-image-gen.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/973-custom-provider-image-gen.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/973-custom-provider-image-gen.md) · 🇳🇴 [no](../../../no/_ideia/notfit/973-custom-provider-image-gen.md) · 🇩🇰 [da](../../../da/_ideia/notfit/973-custom-provider-image-gen.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/973-custom-provider-image-gen.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/973-custom-provider-image-gen.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/973-custom-provider-image-gen.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/973-custom-provider-image-gen.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/973-custom-provider-image-gen.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/973-custom-provider-image-gen.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/973-custom-provider-image-gen.md) · 🇮🇱 [he](../../../he/_ideia/notfit/973-custom-provider-image-gen.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/973-custom-provider-image-gen.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/973-custom-provider-image-gen.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/973-custom-provider-image-gen.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/973-custom-provider-image-gen.md)

---

> GitHub Issue: #973 — opened by @hralamin6 on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Custom OpenAI-compatible providers support text completions but image generation doesn't work. Returns "Unknown embedding provider" errors. Requests full compatibility for image generation with custom providers.

## 💬 Community Discussion

### Participants

- @hralamin6 — Original requester (followed up asking for update)

### Key Points

- Text completions work correctly with custom providers
- Image generation fails with unknown provider errors
- User expects `/v1/images/generations` to route through custom providers

## 🎯 Refined Feature Description

Extend the image generation handler to support routing requests to custom OpenAI-compatible providers, not just hardcoded providers.

### What it solves

- Custom providers with image generation capabilities can't be used for image tasks
- Users running local image generation servers (e.g., ComfyUI, SD WebUI) behind an OpenAI-compatible wrapper

### How it should work

1. When `/v1/images/generations` receives a request with a custom provider model
2. Look up the custom provider's base URL
3. Forward the request to `{baseUrl}/v1/images/generations`
4. Return the response unchanged

### Affected areas

- `open-sse/handlers/imageGeneration.ts` — add custom provider routing
- `open-sse/config/providerRegistry.ts` — image capability flag
- Custom provider node configuration — add image generation toggle

## 🔗 Related Ideas

- Related to [960-openrouter-embedding-image](./960-openrouter-embedding-image.md) — same pattern for embeddings
