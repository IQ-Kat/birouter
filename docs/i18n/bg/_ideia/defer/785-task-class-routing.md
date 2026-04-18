# Feature: Task-Class Routing with Escalation/De-escalation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/785-task-class-routing.md) · 🇪🇸 [es](../../../es/_ideia/defer/785-task-class-routing.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/785-task-class-routing.md) · 🇩🇪 [de](../../../de/_ideia/defer/785-task-class-routing.md) · 🇮🇹 [it](../../../it/_ideia/defer/785-task-class-routing.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/785-task-class-routing.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/785-task-class-routing.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/785-task-class-routing.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/785-task-class-routing.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/785-task-class-routing.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/785-task-class-routing.md) · 🇮🇳 [in](../../../in/_ideia/defer/785-task-class-routing.md) · 🇹🇭 [th](../../../th/_ideia/defer/785-task-class-routing.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/785-task-class-routing.md) · 🇮🇩 [id](../../../id/_ideia/defer/785-task-class-routing.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/785-task-class-routing.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/785-task-class-routing.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/785-task-class-routing.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/785-task-class-routing.md) · 🇳🇴 [no](../../../no/_ideia/defer/785-task-class-routing.md) · 🇩🇰 [da](../../../da/_ideia/defer/785-task-class-routing.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/785-task-class-routing.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/785-task-class-routing.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/785-task-class-routing.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/785-task-class-routing.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/785-task-class-routing.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/785-task-class-routing.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/785-task-class-routing.md) · 🇮🇱 [he](../../../he/_ideia/defer/785-task-class-routing.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/785-task-class-routing.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/785-task-class-routing.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/785-task-class-routing.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/785-task-class-routing.md)

---

> GitHub Issue: #785 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Map incoming requests to specialized combos based on 7 task classes (bulk_low_risk, code_generation, security_critical, etc.) with automatic escalation to premium models for complex tasks and de-escalation to economy for simple ones.

## 🎯 Refined Feature Description

OmniRoute already has `taskAwareRouter.ts` and `intentClassifier.ts` that provide basic task-aware routing. This request expands that with a formal escalation/de-escalation engine based on task classification.

### What it solves

- Same combo used for trivial and critical tasks
- No automatic quality scaling based on difficulty

### How it should work

1. Classify incoming request into a task class (using existing `intentClassifier`)
2. Map task class → combo selection rules (which combo, which strategy)
3. Apply escalation rules (complex request → premium model)
4. Apply de-escalation (trivial → cheap model)

### Affected areas

- `open-sse/services/taskAwareRouter.ts` — extend classification
- `open-sse/services/intentClassifier.ts` — more task classes
- `open-sse/services/combo.ts` — task-class routing integration
- Settings UI — task-class configuration

## 🔗 Related Ideas

- Related to [980-lkgp-routing](./980-lkgp-routing.md) — LKGP scoring
- Related to [1041-smart-auto-combos](./1041-smart-auto-combos.md) — dynamic combos
- Part of @igormorais123's series
