# Feature: Automated installation for Hermes (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1129-automated-hermes.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1129-automated-hermes.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1129-automated-hermes.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1129-automated-hermes.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1129-automated-hermes.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1129-automated-hermes.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1129-automated-hermes.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1129-automated-hermes.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1129-automated-hermes.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1129-automated-hermes.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1129-automated-hermes.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1129-automated-hermes.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1129-automated-hermes.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1129-automated-hermes.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1129-automated-hermes.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1129-automated-hermes.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1129-automated-hermes.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1129-automated-hermes.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1129-automated-hermes.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1129-automated-hermes.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1129-automated-hermes.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1129-automated-hermes.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1129-automated-hermes.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1129-automated-hermes.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1129-automated-hermes.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1129-automated-hermes.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1129-automated-hermes.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1129-automated-hermes.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1129-automated-hermes.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1129-automated-hermes.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1129-automated-hermes.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1129-automated-hermes.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1129-automated-hermes.md)

---

> GitHub Issue: #1129 — opened by @Snodgrass-Wilkerschnoz on 2026-04-10
> Status: ❌ NOT FIT | Priority: TBD

## 📝 Original Request

### Problem / Use Case

I’d like to simply configure Hermes to work with OmniRoute with an Hermes-led step-through configuration to simplify onboarding and avoid manual config.

### Proposed Solution

Step-though initial config for Hermes.

### Acceptance Criteria

-Direct Hermes to install OmniRoute
-After installation, Hermes walks through config
-Configuration is written to OmniRoute and can be controlled successfully by Hermes

## 💬 Community Discussion

### Participants

- @Snodgrass-Wilkerschnoz — Original requester

## 🎯 Refined Feature Description

Create an automated deployment script inside the Hermes Agent configuration wizard to download, install, and interface with OmniRoute.

### Why it does not fit

Hermes Agent is a completely separate application that utilizes APIs. Any installer logic dictating "Hermes walks through config" would technically reside exclusively inside the Hermes Agent repository's source code, not inside the OmniRoute proxy itself. Expanding the OmniRoute proxy engine to package installation routines for external autonomous agents violates OmniRoute's architectural boundaries as a headless unified proxy wrapper.

## 🔗 Related Ideas

- N/A
