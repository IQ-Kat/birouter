# Feature: LKGP (Last Known Good Providers) Routing (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/980-lkgp-routing.md) · 🇪🇸 [es](../../../es/_ideia/defer/980-lkgp-routing.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/980-lkgp-routing.md) · 🇩🇪 [de](../../../de/_ideia/defer/980-lkgp-routing.md) · 🇮🇹 [it](../../../it/_ideia/defer/980-lkgp-routing.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/980-lkgp-routing.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/980-lkgp-routing.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/980-lkgp-routing.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/980-lkgp-routing.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/980-lkgp-routing.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/980-lkgp-routing.md) · 🇮🇳 [in](../../../in/_ideia/defer/980-lkgp-routing.md) · 🇹🇭 [th](../../../th/_ideia/defer/980-lkgp-routing.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/980-lkgp-routing.md) · 🇮🇩 [id](../../../id/_ideia/defer/980-lkgp-routing.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/980-lkgp-routing.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/980-lkgp-routing.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/980-lkgp-routing.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/980-lkgp-routing.md) · 🇳🇴 [no](../../../no/_ideia/defer/980-lkgp-routing.md) · 🇩🇰 [da](../../../da/_ideia/defer/980-lkgp-routing.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/980-lkgp-routing.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/980-lkgp-routing.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/980-lkgp-routing.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/980-lkgp-routing.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/980-lkgp-routing.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/980-lkgp-routing.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/980-lkgp-routing.md) · 🇮🇱 [he](../../../he/_ideia/defer/980-lkgp-routing.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/980-lkgp-routing.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/980-lkgp-routing.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/980-lkgp-routing.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/980-lkgp-routing.md)

---

> GitHub Issue: #980 — opened by @diegosouzapw on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium
> Source: Discussion 919 by @oyi77

## 📝 Original Request

Implement a dynamic weighting algorithm in the combo routing engine that uses latency and recent success rate (LKGP) alongside healthchecks.

## 💬 Community Discussion

### Participants

- @diegosouzapw — Issue creator
- @oyi77 — Original discussion author

## 🎯 Refined Feature Description

LKGP routing tracks which provider connections have been performing well recently (low latency, high success rate) and dynamically adjusts routing weights to prefer them. Unlike static priority, this adapts in real-time.

### What it solves

- Static priority can't adapt to transient provider degradation
- Healthchecks are periodic — LKGP uses real request metrics

### How it should work

1. Track last N request outcomes per connection (success/fail, latency)
2. Compute a LKGP score = f(success_rate, avg_latency, recency)
3. Use LKGP scores as dynamic weights in combo routing
4. Decay old metrics over time

### Affected areas

- `open-sse/services/combo.ts` — routing weight calculation
- `src/lib/db/domainState.ts` — LKGP metric storage
- Dashboard — LKGP score visualization

## 🔗 Related Ideas

- Related to [1041-smart-auto-combos](./1041-smart-auto-combos.md)
- Related to [785-task-class-routing](./785-task-class-routing.md)
