# Feature: Add MiniMax OAuth Provider (Device-Code + PKCE) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1251-minimax-oauth-provider.md) · 🇪🇸 [es](../../../es/_ideia/defer/1251-minimax-oauth-provider.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1251-minimax-oauth-provider.md) · 🇩🇪 [de](../../../de/_ideia/defer/1251-minimax-oauth-provider.md) · 🇮🇹 [it](../../../it/_ideia/defer/1251-minimax-oauth-provider.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1251-minimax-oauth-provider.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1251-minimax-oauth-provider.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1251-minimax-oauth-provider.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1251-minimax-oauth-provider.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1251-minimax-oauth-provider.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1251-minimax-oauth-provider.md) · 🇮🇳 [in](../../../in/_ideia/defer/1251-minimax-oauth-provider.md) · 🇹🇭 [th](../../../th/_ideia/defer/1251-minimax-oauth-provider.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1251-minimax-oauth-provider.md) · 🇮🇩 [id](../../../id/_ideia/defer/1251-minimax-oauth-provider.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1251-minimax-oauth-provider.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1251-minimax-oauth-provider.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1251-minimax-oauth-provider.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1251-minimax-oauth-provider.md) · 🇳🇴 [no](../../../no/_ideia/defer/1251-minimax-oauth-provider.md) · 🇩🇰 [da](../../../da/_ideia/defer/1251-minimax-oauth-provider.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1251-minimax-oauth-provider.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1251-minimax-oauth-provider.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1251-minimax-oauth-provider.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1251-minimax-oauth-provider.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1251-minimax-oauth-provider.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1251-minimax-oauth-provider.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1251-minimax-oauth-provider.md) · 🇮🇱 [he](../../../he/_ideia/defer/1251-minimax-oauth-provider.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1251-minimax-oauth-provider.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1251-minimax-oauth-provider.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1251-minimax-oauth-provider.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1251-minimax-oauth-provider.md)

---

> GitHub Issue: #1251 — opened by @Tasogarre on 2026-04-14
> Status: ⏭️ DEFER | Priority: Low

## 📝 Original Request

Add MiniMax as an OAuth-based provider using the device-code + PKCE flow. MiniMax is an AI model provider that offers models accessible through their API, and the author proposes using a device-code OAuth flow (similar to GitHub CLI's auth flow) combined with PKCE for security.

## 💬 Community Discussion

### Participants

- @Tasogarre — Original requester, provided detailed OAuth flow specification

### Key Points

- Device-code + PKCE is a different OAuth pattern from OmniRoute's existing OAuth flows (browser redirect-based)
- Existing OAuth providers (Claude Code, Antigravity, Codex, GitHub Copilot, Cursor, etc.) use standard redirect flows
- Implementing device-code flow would require new OAuth infrastructure in `src/lib/oauth/`
- No community discussion beyond the initial proposal

## 🎯 Refined Feature Description

Add MiniMax as an OAuth provider using the device-code grant type with PKCE, enabling users to authenticate via a displayed code + URL (like `gh auth login`) rather than browser redirects.

### What it solves

- Adds MiniMax model provider access to OmniRoute
- Introduces device-code OAuth flow type for headless/terminal environments
- Could benefit other future providers that use device-code authentication

### How it should work (high level)

1. User clicks "Connect MiniMax" in the dashboard
2. Dashboard displays a device code and URL (e.g., "Go to minimax.chat/device and enter code: ABCD-1234")
3. User visits URL, enters code, authorizes the application
4. OmniRoute polls the token endpoint until authorization is complete
5. Stores OAuth tokens and refreshes automatically

### Affected areas

- `src/lib/oauth/constants/oauth.ts` — new OAuth config for MiniMax
- `src/lib/oauth/` — new device-code flow handler (distinct from existing redirect flows)
- `open-sse/executors/` — new or default executor for MiniMax API
- `src/shared/constants/providers.ts` — register in `OAUTH_PROVIDERS`
- `open-sse/config/providerRegistry.ts` — model registration
- Dashboard OAuth modal — new device-code UI variant

## 📎 Attachments & References

- Author provided detailed OAuth flow specification in the issue body (2795 chars)

## 🔗 Related Ideas

- Related to existing OAuth providers architecture in `src/lib/oauth/`
