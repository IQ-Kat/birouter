# Feature: [Feature] Headroom support (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1100-headroom-support.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1100-headroom-support.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1100-headroom-support.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1100-headroom-support.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1100-headroom-support.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1100-headroom-support.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1100-headroom-support.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1100-headroom-support.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1100-headroom-support.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1100-headroom-support.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1100-headroom-support.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1100-headroom-support.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1100-headroom-support.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1100-headroom-support.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1100-headroom-support.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1100-headroom-support.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1100-headroom-support.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1100-headroom-support.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1100-headroom-support.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1100-headroom-support.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1100-headroom-support.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1100-headroom-support.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1100-headroom-support.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1100-headroom-support.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1100-headroom-support.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1100-headroom-support.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1100-headroom-support.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1100-headroom-support.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1100-headroom-support.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1100-headroom-support.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1100-headroom-support.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1100-headroom-support.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1100-headroom-support.md)

---

> GitHub Issue: #1100 — opened by @mkizilov on 2026-04-10T00:15:46Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

Right now there is problematic to running Headroom because it needs to be routed via omniroute. Maybe implement some easier way to do it?

https://github.com/chopratejas/headroom

### Proposed Solution

https://github.com/chopratejas/headroom

### Acceptance Criteria

some turn on\off switch to use headroom right in the UI

### Area

Proxy / Routing

## 💬 Community Discussion

(No comments yet)

## 🎯 Refined Feature Description

Headroom is an open-source UI for interacting with LLMs. The user wants to integrate/run Headroom directly through OmniRoute's UI with a simple switch, rather than having to separately deploy and configure Headroom to route traffic through OmniRoute.

### What it solves

- Removes the deployment friction for using a chat UI (Headroom) with our local API endpoints.
- Unifies the experience within our dashboard.

### How it should work (high level)

1. Add an internal proxy or embedding layer for Headroom's static UI.
2. In the OmniRoute dashboard, provide a switch or dedicated "Chat UI" route to launch headroom.
3. Auto-configure the Headroom UI to use `http://localhost:20128/v1` and the user's OmniRoute APIs automatically.

### Affected areas

- `src/app/(dashboard)/`
- `open-sse/services/`
- Next.js rewrite/proxy configs or Docker compose templates.

## 📎 Attachments & References

- https://github.com/chopratejas/headroom

## 🔗 Related Ideas

- 1046-native-playground (already implemented a native playground, which might solve their primary need)
