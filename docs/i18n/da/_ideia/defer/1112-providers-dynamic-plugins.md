# Feature: Providers as dynamic plugins/addons (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1112-providers-dynamic-plugins.md) · 🇪🇸 [es](../../../es/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇩🇪 [de](../../../de/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇮🇹 [it](../../../it/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇮🇳 [in](../../../in/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇹🇭 [th](../../../th/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇮🇩 [id](../../../id/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇳🇴 [no](../../../no/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇩🇰 [da](../../../da/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇮🇱 [he](../../../he/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1112-providers-dynamic-plugins.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1112-providers-dynamic-plugins.md)

---

> GitHub Issue: #1112 — opened by @diegosouzapw on 2026-04-10T09:36:17Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem

Currently, adding new providers requires deep integration across the codebase (`open-sse/executors`, `open-sse/config/providerRegistry.ts`, etc.). It's somewhat modularized but not a true drop-in system, making it harder for the community to contribute new providers as simple add-ons.

### Proposed Solution

Implement a dynamic drop-in plugin system that loads providers at runtime from a dedicated `plugins/` or `addons/` directory, allowing users to just drop a `.js` / `.ts` file or folder into the directory to register a new provider without modifying core code.

### Implementation Ideas

- Expose a stable Plugin API or SDK (`ProviderDefinition` interface).
- Dynamic imports to load files from `addons/providers/` at startup.
- Update the UI to show dynamically loaded providers alongside built-in ones.

### Current Workarounds

Currently, any new provider must be hardcoded into the TypeScript source code and the project needs to be recompiled.

### Additional Context

Source: Discussion #1084

## 💬 Community Discussion

(No comments yet, originated from discussion)

## 🎯 Refined Feature Description

Create a robust standard plugin interface where a self-contained JS/TS bundle can define:

- Metadata (ID, name, auth format)
- `executor` logic (how to request)
- Config schemas
  And drop it into a `/addons/` folder. The app loads these dynamically on boot via `import()` or `require()`.

### What it solves

Decouples new provider implementations from the core codebase.
Enables closed-source or specialized community providers.
Simplifies PRs (less modification of core registries).

### Affected areas

- `open-sse/config/providerRegistry.ts` (needs dynamic loading phase)
- Next.js build config (allowing external requires)

## 📎 Attachments & References

N/A

## 🔗 Related Ideas

N/A
