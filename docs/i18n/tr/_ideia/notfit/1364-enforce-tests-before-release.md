# Feature: Enforce Passing All Tests / Workflows Before Release (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1364-enforce-tests-before-release.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1364-enforce-tests-before-release.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1364-enforce-tests-before-release.md)

---

> GitHub Issue: #1364 — opened by @uwuclxdy on 2026-04-17
> Status: 🔁 ALREADY EXISTS

## 📝 Original Request

The user is trying to use the latest version but reports the last two releases (v3.6.6, v3.6.7) were broken. Proposes creating a release workflow or gate that prevents creating a new release until all tests and workflows pass.

## 💬 Community Discussion

### Participants

- @uwuclxdy — Original requester
- @chalitbkb — Linked to #1355 (same CLI issue)

### Key Points

- The specific breakage was the CLI entry point shipping as raw TypeScript (`.ts` instead of compiled `.mjs`)
- The test suite itself was passing — the issue was a missing build step in the publishing pipeline
- Community identified this as related to #1355

## 🎯 Resolution

This functionality **already exists** in OmniRoute:

1. **`/generate-release` workflow** — runs full test suite (`npm run test:all`) before creating any release
2. **Pre-push git hooks** — block pushes if tests fail
3. **lint-staged** — runs prettier + eslint on every commit

The v3.6.6/v3.6.7 breakage was specifically caused by a missing CLI build step (not a test failure), which has been fixed in v3.6.8 with `bin/omniroute.mjs`. The release pipeline gap has been closed.
