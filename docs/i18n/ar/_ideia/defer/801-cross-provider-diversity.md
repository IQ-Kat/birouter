# Feature: Cross-Provider Cognitive Diversity (Role-to-Provider Mapping) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/801-cross-provider-diversity.md) · 🇪🇸 [es](../../../es/_ideia/defer/801-cross-provider-diversity.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/801-cross-provider-diversity.md) · 🇩🇪 [de](../../../de/_ideia/defer/801-cross-provider-diversity.md) · 🇮🇹 [it](../../../it/_ideia/defer/801-cross-provider-diversity.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/801-cross-provider-diversity.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/801-cross-provider-diversity.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/801-cross-provider-diversity.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/801-cross-provider-diversity.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/801-cross-provider-diversity.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/801-cross-provider-diversity.md) · 🇮🇳 [in](../../../in/_ideia/defer/801-cross-provider-diversity.md) · 🇹🇭 [th](../../../th/_ideia/defer/801-cross-provider-diversity.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/801-cross-provider-diversity.md) · 🇮🇩 [id](../../../id/_ideia/defer/801-cross-provider-diversity.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/801-cross-provider-diversity.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/801-cross-provider-diversity.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/801-cross-provider-diversity.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/801-cross-provider-diversity.md) · 🇳🇴 [no](../../../no/_ideia/defer/801-cross-provider-diversity.md) · 🇩🇰 [da](../../../da/_ideia/defer/801-cross-provider-diversity.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/801-cross-provider-diversity.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/801-cross-provider-diversity.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/801-cross-provider-diversity.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/801-cross-provider-diversity.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/801-cross-provider-diversity.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/801-cross-provider-diversity.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/801-cross-provider-diversity.md) · 🇮🇱 [he](../../../he/_ideia/defer/801-cross-provider-diversity.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/801-cross-provider-diversity.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/801-cross-provider-diversity.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/801-cross-provider-diversity.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/801-cross-provider-diversity.md)

---

> GitHub Issue: #801 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

Enforce that different roles in multi-model review pipelines use different providers to maximize failure diversity. A planner and its critic should never be the same provider.

## 🎯 Refined Feature Description

This is an advanced orchestration pattern. OmniRoute already supports multi-provider combos but doesn't enforce cognitive diversity between roles. This would require significant architectural changes to add role-based routing.

### Affected areas

- Would require a new orchestration layer above combo routing
- Significant scope for a routing proxy

## 🔗 Related Ideas

- Related to [792-team-of-rivals](./792-team-of-rivals.md)
- Related to [797-hierarchical-router](./797-hierarchical-router.md)
- Part of @igormorais123's 5-issue series (#785, #787, #792, #797, #801)
