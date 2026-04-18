# Feature: Native Playground LLM Dashboard - Built-in testing page (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1046-native-playground.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1046-native-playground.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1046-native-playground.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1046-native-playground.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1046-native-playground.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1046-native-playground.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1046-native-playground.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1046-native-playground.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1046-native-playground.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1046-native-playground.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1046-native-playground.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1046-native-playground.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1046-native-playground.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1046-native-playground.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1046-native-playground.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1046-native-playground.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1046-native-playground.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1046-native-playground.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1046-native-playground.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1046-native-playground.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1046-native-playground.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1046-native-playground.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1046-native-playground.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1046-native-playground.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1046-native-playground.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1046-native-playground.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1046-native-playground.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1046-native-playground.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1046-native-playground.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1046-native-playground.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1046-native-playground.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1046-native-playground.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1046-native-playground.md)

---

> GitHub Issue: #1046 — opened by @diegosouzapw on 2026-04-07
> Status: 📋 Cataloged | Priority: High
> Duplicate of: #234 (92% similarity per Kilo)

## 📝 Original Request

**Source:** Discussion #1035 by @rilham97

Add a built-in playground or test page in the OmniRoute dashboard where users can easily test their configured LLMs, verify model names, and check the response body formatting directly.

### Implementation Ideas

- A lightweight React component in the `/dashboard` route.
- A simple chat or raw completion interface to send test requests to the OmniRoute proxy endpoint.

### Current Workarounds

Users can use lightweight local clients like OpenClaw, or standard terminal/browser curl requests to test the API.

## 💬 Community Discussion

### Participants

- @diegosouzapw — Issue creator (from discussion)
- @rilham97 — Original requester, provided design references
- @kilo-code-bot — Auto-triage (duplicate of #234, 92%)

### Key Points

- This is a highly requested feature with a prior duplicate (#234)
- @rilham97 provided concrete UI references:
  - https://app.fireworks.ai/playground
  - https://ai.nahcrof.com/

## 🎯 Refined Feature Description

A built-in playground page at `/dashboard/playground` that allows users to:

1. Select any configured combo or provider+model
2. Send chat completion requests with customizable parameters (temperature, max_tokens, system prompt)
3. View full response including metadata (tokens used, latency, cost)
4. Toggle between streaming and non-streaming modes
5. View raw request/response JSON for debugging

### What it solves

- Eliminates need for external tools to test model configuration
- Provides instant feedback on whether a combo/provider is working
- Helps debug response format issues without leaving the dashboard

### How it should work (high level)

1. User navigates to `/dashboard/playground`
2. Selects a combo or specific provider/model from dropdown
3. Types a message in a chat interface
4. Clicks Send → sees streaming response
5. Can inspect raw JSON, token usage, and latency metrics

### Affected areas

- `src/app/(dashboard)/dashboard/playground/` — new page
- `src/app/api/` — may use existing `/v1/chat/completions` internally
- i18n — new translation keys across 30 languages
- Sidebar navigation — add new menu item

## 📎 Attachments & References

- Fireworks AI Playground: https://app.fireworks.ai/playground
- AI Nahcrof playground: https://ai.nahcrof.com/
- Original discussion: #1035

## 🔗 Related Ideas

- Related to #234 (original playground request, 92% similarity)
