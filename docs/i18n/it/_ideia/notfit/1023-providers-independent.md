# Feature: Providers-independent approach (Universal Model IDs) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1023-providers-independent.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1023-providers-independent.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1023-providers-independent.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1023-providers-independent.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1023-providers-independent.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1023-providers-independent.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1023-providers-independent.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1023-providers-independent.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1023-providers-independent.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1023-providers-independent.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1023-providers-independent.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1023-providers-independent.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1023-providers-independent.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1023-providers-independent.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1023-providers-independent.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1023-providers-independent.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1023-providers-independent.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1023-providers-independent.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1023-providers-independent.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1023-providers-independent.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1023-providers-independent.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1023-providers-independent.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1023-providers-independent.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1023-providers-independent.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1023-providers-independent.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1023-providers-independent.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1023-providers-independent.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1023-providers-independent.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1023-providers-independent.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1023-providers-independent.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1023-providers-independent.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1023-providers-independent.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1023-providers-independent.md)

---

> GitHub Issue: #1023 — opened by @ralphilius on 2026-04-06
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

When connecting to multiple providers that serve the same models, users need to switch prefixes in coding tool configs. Proposes universal constant model IDs that work regardless of provider, making OmniRoute appear as a single provider.

## 💬 Community Discussion

### Participants

- @ralphilius — Original requester

### Key Points

- Pain point: switching provider prefixes in client configs when rotating providers
- Wants "set and forget" configuration

## 🎯 Refined Feature Description

This is essentially the model alias system that already exists. Users can create aliases like `claude-sonnet` → `anthropic/claude-sonnet-4` so their clients always use the same model name regardless of which provider serves it.

### What it solves

- Already solved by existing Model Aliases feature (`/dashboard/settings` → Model Aliases)

### Affected areas

- May need better documentation/discoverability of existing aliases feature

## 📎 Attachments & References

- Existing feature: Model Aliases in dashboard settings

## 🔗 Related Ideas

- This overlaps with existing Model Aliases functionality — may just need documentation/UI improvements
