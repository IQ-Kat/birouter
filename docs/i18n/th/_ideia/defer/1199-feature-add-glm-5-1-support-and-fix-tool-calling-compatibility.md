# Feature: [Feature] Add GLM 5.1 support and fix tool-calling compatibility (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇪🇸 [es](../../../es/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇩🇪 [de](../../../de/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇮🇹 [it](../../../it/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇮🇳 [in](../../../in/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇹🇭 [th](../../../th/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇮🇩 [id](../../../id/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇳🇴 [no](../../../no/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇩🇰 [da](../../../da/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇮🇱 [he](../../../he/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1199-feature-add-glm-5-1-support-and-fix-tool-calling-compatibility.md)

---

> GitHub Issue: #1199 — opened by @CmetankaJDD on 2026-04-13T07:57:20Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Summary

Please add support for GLM 5.1 in OmniRoute.

At the moment, GLM 5.1 appears to have problems with tool usage / tool calling, which makes it hard to use in agent-style workflows.

## Current behavior

- GLM 5.1 is not available or not fully supported as a first-class model option.
- When trying to use tools with GLM 5.1, requests fail / tool usage does not work correctly.

## Expected behavior

- GLM 5.1 should be supported as a selectable model/provider option.
- Tool calling should work correctly with the model, following the same OpenAI-compatible tool schema behavior expected by OmniRoute clients.

## Why this matters

GLM 5.1 is useful for users who want broader model coverage in OmniRoute, and tool-calling support is required for many coding assistants, agents, and structured workflows.

## Suggested scope

- Add GLM 5.1 model support
- Validate request/response compatibility for tools
- Ensure tool call messages are translated correctly if provider-specific mapping is needed
- Add a basic regression test for tool usage with GLM 5.1

## 💬 Community Discussion

No community comments yet.

## 🎯 Refined Feature Description

(Requires manual/AI refinement)

### What it solves

- TBD

### How it should work (high level)

1. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- TBD

## 🔗 Related Ideas

- TBD
