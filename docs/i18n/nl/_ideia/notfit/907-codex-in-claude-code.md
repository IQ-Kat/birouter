# Feature: Use Codex GPT models in Claude Code CLI (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/907-codex-in-claude-code.md) · 🇪🇸 [es](../../../es/_ideia/notfit/907-codex-in-claude-code.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/907-codex-in-claude-code.md) · 🇩🇪 [de](../../../de/_ideia/notfit/907-codex-in-claude-code.md) · 🇮🇹 [it](../../../it/_ideia/notfit/907-codex-in-claude-code.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/907-codex-in-claude-code.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/907-codex-in-claude-code.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/907-codex-in-claude-code.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/907-codex-in-claude-code.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/907-codex-in-claude-code.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/907-codex-in-claude-code.md) · 🇮🇳 [in](../../../in/_ideia/notfit/907-codex-in-claude-code.md) · 🇹🇭 [th](../../../th/_ideia/notfit/907-codex-in-claude-code.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/907-codex-in-claude-code.md) · 🇮🇩 [id](../../../id/_ideia/notfit/907-codex-in-claude-code.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/907-codex-in-claude-code.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/907-codex-in-claude-code.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/907-codex-in-claude-code.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/907-codex-in-claude-code.md) · 🇳🇴 [no](../../../no/_ideia/notfit/907-codex-in-claude-code.md) · 🇩🇰 [da](../../../da/_ideia/notfit/907-codex-in-claude-code.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/907-codex-in-claude-code.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/907-codex-in-claude-code.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/907-codex-in-claude-code.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/907-codex-in-claude-code.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/907-codex-in-claude-code.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/907-codex-in-claude-code.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/907-codex-in-claude-code.md) · 🇮🇱 [he](../../../he/_ideia/notfit/907-codex-in-claude-code.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/907-codex-in-claude-code.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/907-codex-in-claude-code.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/907-codex-in-claude-code.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/907-codex-in-claude-code.md)

---

> GitHub Issue: #907 — opened by @tranduykhanh030 on 2026-04-02
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

User asks how to use GPT models in Claude Code CLI through OmniRoute, noting that OmniRoute "doesn't provide an output for Claude Code."

## 💬 Community Discussion

- No community comments

## 🎯 Refined Feature Description

This is **already a core feature** of OmniRoute. OmniRoute acts as an OpenAI-compatible proxy that Claude Code can connect to, routing requests to any configured provider including Codex/GPT models.

### What it solves

- Already solved — this is a documentation/discoverability issue

### How it works (already)

1. Configure OmniRoute with Codex/OpenAI credentials
2. Set Claude Code's `ANTHROPIC_BASE_URL` to OmniRoute's endpoint
3. Claude Code sends requests → OmniRoute routes to GPT models

### Affected areas

- Documentation improvement needed — better quickstart guide for Claude Code users

## 🔗 Related Ideas

- None — existing functionality
