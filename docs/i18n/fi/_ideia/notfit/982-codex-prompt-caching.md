# Feature: Prompt Caching support for Codex Models (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/982-codex-prompt-caching.md) · 🇪🇸 [es](../../../es/_ideia/notfit/982-codex-prompt-caching.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/982-codex-prompt-caching.md) · 🇩🇪 [de](../../../de/_ideia/notfit/982-codex-prompt-caching.md) · 🇮🇹 [it](../../../it/_ideia/notfit/982-codex-prompt-caching.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/982-codex-prompt-caching.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/982-codex-prompt-caching.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/982-codex-prompt-caching.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/982-codex-prompt-caching.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/982-codex-prompt-caching.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/982-codex-prompt-caching.md) · 🇮🇳 [in](../../../in/_ideia/notfit/982-codex-prompt-caching.md) · 🇹🇭 [th](../../../th/_ideia/notfit/982-codex-prompt-caching.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/982-codex-prompt-caching.md) · 🇮🇩 [id](../../../id/_ideia/notfit/982-codex-prompt-caching.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/982-codex-prompt-caching.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/982-codex-prompt-caching.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/982-codex-prompt-caching.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/982-codex-prompt-caching.md) · 🇳🇴 [no](../../../no/_ideia/notfit/982-codex-prompt-caching.md) · 🇩🇰 [da](../../../da/_ideia/notfit/982-codex-prompt-caching.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/982-codex-prompt-caching.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/982-codex-prompt-caching.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/982-codex-prompt-caching.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/982-codex-prompt-caching.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/982-codex-prompt-caching.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/982-codex-prompt-caching.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/982-codex-prompt-caching.md) · 🇮🇱 [he](../../../he/_ideia/notfit/982-codex-prompt-caching.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/982-codex-prompt-caching.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/982-codex-prompt-caching.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/982-codex-prompt-caching.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/982-codex-prompt-caching.md)

---

> GitHub Issue: #982 — opened by @diegosouzapw on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium
> Source: Discussion 584 by @alfonsofeliz

## 📝 Original Request

Add native prompt caching passthrough for Codex models via standard upstream cache-control headers. Update the translator layer to transparently pass those along.

## 💬 Community Discussion

### Participants

- @diegosouzapw — Issue creator
- @alfonsofeliz — Original discussion author

### Key Points

- Codex (OpenAI) supports prompt caching but OmniRoute may strip the relevant headers
- Need to ensure cache-control headers flow through the translation layer

## 🎯 Refined Feature Description

Ensure the Codex executor and translator preserve upstream prompt caching headers and parameters. The OpenAI API supports `cached_tokens` in usage responses — ensure these are not stripped during translation.

### What it solves

- Codex users losing prompt cache benefits when routing through OmniRoute
- Reduced API costs through proper cache utilization

### Affected areas

- `open-sse/executors/codex.ts` — header passthrough
- `open-sse/translator/` — cache header preservation
- Token accounting — recognize cached tokens in usage stats

## 🔗 Related Ideas

- Partially addressed already in v3.5.4 (Anthropic cache token accounting)
