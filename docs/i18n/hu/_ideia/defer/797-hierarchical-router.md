# Feature: Hierarchical Router — Direct vs Multi-Agent orchestration (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/797-hierarchical-router.md) · 🇪🇸 [es](../../../es/_ideia/defer/797-hierarchical-router.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/797-hierarchical-router.md) · 🇩🇪 [de](../../../de/_ideia/defer/797-hierarchical-router.md) · 🇮🇹 [it](../../../it/_ideia/defer/797-hierarchical-router.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/797-hierarchical-router.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/797-hierarchical-router.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/797-hierarchical-router.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/797-hierarchical-router.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/797-hierarchical-router.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/797-hierarchical-router.md) · 🇮🇳 [in](../../../in/_ideia/defer/797-hierarchical-router.md) · 🇹🇭 [th](../../../th/_ideia/defer/797-hierarchical-router.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/797-hierarchical-router.md) · 🇮🇩 [id](../../../id/_ideia/defer/797-hierarchical-router.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/797-hierarchical-router.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/797-hierarchical-router.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/797-hierarchical-router.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/797-hierarchical-router.md) · 🇳🇴 [no](../../../no/_ideia/defer/797-hierarchical-router.md) · 🇩🇰 [da](../../../da/_ideia/defer/797-hierarchical-router.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/797-hierarchical-router.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/797-hierarchical-router.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/797-hierarchical-router.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/797-hierarchical-router.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/797-hierarchical-router.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/797-hierarchical-router.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/797-hierarchical-router.md) · 🇮🇱 [he](../../../he/_ideia/defer/797-hierarchical-router.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/797-hierarchical-router.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/797-hierarchical-router.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/797-hierarchical-router.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/797-hierarchical-router.md)

---

> GitHub Issue: #797 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

Two-tier routing layer classifying requests into fast direct path (single model) or multi-agent orchestration (planner → critic → executor).

## 🎯 Refined Feature Description

This is an advanced orchestration concept that goes well beyond OmniRoute's scope as a proxy/router. OmniRoute already has `taskAwareRouter.ts` and `intentClassifier.ts` which provide basic task-aware routing, but full multi-agent orchestration is an application-layer concern.

## 🔗 Related Ideas

- Part of @igormorais123's series: [792](./792-team-of-rivals.md), [801](./801-cross-provider-diversity.md), [785](./785-task-class-routing.md), [787](./787-auto-research.md)
