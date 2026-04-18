# Feature: Telegram Integration (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/945-telegram-integration.md) · 🇪🇸 [es](../../../es/_ideia/notfit/945-telegram-integration.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/945-telegram-integration.md) · 🇩🇪 [de](../../../de/_ideia/notfit/945-telegram-integration.md) · 🇮🇹 [it](../../../it/_ideia/notfit/945-telegram-integration.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/945-telegram-integration.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/945-telegram-integration.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/945-telegram-integration.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/945-telegram-integration.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/945-telegram-integration.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/945-telegram-integration.md) · 🇮🇳 [in](../../../in/_ideia/notfit/945-telegram-integration.md) · 🇹🇭 [th](../../../th/_ideia/notfit/945-telegram-integration.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/945-telegram-integration.md) · 🇮🇩 [id](../../../id/_ideia/notfit/945-telegram-integration.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/945-telegram-integration.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/945-telegram-integration.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/945-telegram-integration.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/945-telegram-integration.md) · 🇳🇴 [no](../../../no/_ideia/notfit/945-telegram-integration.md) · 🇩🇰 [da](../../../da/_ideia/notfit/945-telegram-integration.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/945-telegram-integration.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/945-telegram-integration.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/945-telegram-integration.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/945-telegram-integration.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/945-telegram-integration.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/945-telegram-integration.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/945-telegram-integration.md) · 🇮🇱 [he](../../../he/_ideia/notfit/945-telegram-integration.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/945-telegram-integration.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/945-telegram-integration.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/945-telegram-integration.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/945-telegram-integration.md)

---

> GitHub Issue: #945 — opened by @inteligenciamilgrau on 2026-04-03
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

OpenClaw integrates with Telegram but only talks to OpenClaw. Request to add Telegram integration so users can chat with all CLIs (Claude Code, Codex, Gemini CLI) through Telegram.

## 💬 Community Discussion

### Participants

- @inteligenciamilgrau — Original requester
- @oyi77 — Objected: "this shouldn't be in the router, imagine OpenRouter with Telegram integration — feels weird"
- @daniil-pogorelov — Suggested "just make a bot"

### Key Points

- Community split: some think it belongs in an orchestrator/agent layer, not a router
- Could be implemented as external bot using OmniRoute's API
- Scope creep concern for a routing proxy

## 🎯 Refined Feature Description

This is out of scope for OmniRoute's core mission as a proxy/router. Telegram integration belongs in an application/orchestrator layer that consumes OmniRoute's API, not inside OmniRoute itself.

### What it solves

- N/A — better served by external bot

### Affected areas

- N/A — recommend external implementation

## 🔗 Related Ideas

- None — this is a distinct concern from routing
