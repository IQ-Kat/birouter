# Feature: [Feature] Add configurable stagger delay between token health check sweep iterations (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1220-feature-add-configurable-stagger-delay-between-token-health-check-sweep-iterations.md)

---

> GitHub Issue: #1220 — opened by @edwardsconnects90 on 2026-04-13T16:43:19Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

The proactive token health check sweep iterates all OAuth connections sequentially but with **no delay** between iterations. When running with multiple SOCKS5 proxies (one per account), all proxy connections are initiated in rapid succession — effectively simultaneously from the proxy perspective. This causes proxy overload, connection timeouts, and failed token refreshes across all accounts in the same sweep cycle.

With multiple dedicated SOCKS5 proxies, the sweep fires all connections within milliseconds. Logs show all "Refreshing ..." entries appearing in a burst (<100ms total for all accounts).

### Proposed Solution

Add a configurable stagger delay after each iteration of the sweep loop in `tokenHealthCheck.ts`, controlled by a `HEALTHCHECK_STAGGER_MS` environment variable (default: `3000` ms). When set to `0`, staggering is disabled.

The implementation is a single `await new Promise(resolve => setTimeout(resolve, STAGGER_MS))` at the end of each loop iteration inside the sweep function.

| Variable                 | Default | Description                                                                                     |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `HEALTHCHECK_STAGGER_MS` | `3000`  | Delay in milliseconds between consecutive token health check iterations. Set to `0` to disable. |

With the stagger in place, inter-iteration gaps become ~3-7s (configured stagger + proxy round-trip time), confirming that connections no longer pile up simultaneously.

### Alternatives Considered

- **Client-side rate limiting per proxy:** More complex, requires tracking per-proxy concurrency. The stagger approach is simpler and sufficient for the sequential sweep loop.
- **Parallel sweep with concurrency limit:** Would require rewriting the sweep loop to use a worker pool. Overkill for the current use case where sequential + stagger is adequate.

### Acceptance Criteria

- Health check sweep has a configurable delay between iterations via `HEALTHCHECK_STAGGER_MS` env variable
- Default delay is 3000ms
- Setting to 0 disables the stagger
- Consecutive "Refreshing ..." log entries are spaced by at least `HEALTHCHECK_STAGGER_MS` milliseconds
- All existing health check functionality remains unchanged

### Area

Proxy / Routing

### Related Provider(s)

Codex (OpenAI) — affects all OAuth providers when multiple connections use dedicated SOCKS5 proxies

### Additional Context

- **Impact without fix:** All proxy connections open simultaneously → proxy overload → universal token refresh failure each sweep cycle
- **Impact with fix:** Connections spread over `N x STAGGER_MS` total sweep duration → each proxy gets exclusive window → reliable token refreshes
- Total sweep duration increases proportionally (e.g. 10 connections x 3s = ~30s minimum), which is acceptable given sweeps run on intervals of minutes to hours
- **Optional UI enhancement:** Settings panel could expose `HEALTHCHECK_STAGGER_MS` as a numeric input under Provider Health Check settings
- Current workaround: build-time patch (`patch-stagger-healthcheck.cjs`) injects `setTimeout` delay into compiled webpack chunks

### Expected Test Plan

- Add unit test for sweep loop verifying inter-iteration delay when `HEALTHCHECK_STAGGER_MS > 0`
- Add unit test verifying no delay when `HEALTHCHECK_STAGGER_MS=0`
- Integration test: run sweep with multiple connections, verify log timestamps show expected stagger spacing

## 💬 Community Discussion

- @diegosouzapw: Thanks for the well-thought-out proposal, @edwardsconnects90. The stagger logic is sound.

We're accepting this as an enhancement. The implementation is straightforward — a configurable `HEALTHCHECK_S...

## 🎯 Refined Feature Description

(Requires manual/AI refinement)

### What it solves

- TBD

### How it should work (high level)

1. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- TBD

## 🔗 Related Ideas

- TBD
