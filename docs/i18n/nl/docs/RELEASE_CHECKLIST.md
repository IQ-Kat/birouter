# Release Checklist (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Gebruik deze checklist voordat u een nieuwe OmniRoute-release tagt of publiceert.## Version and Changelog

1. Bump de `package.json`-versie (`x.y.z`) in de releasebranch.
2. Verplaats release-opmerkingen van `## [Unreleased]` in `CHANGELOG.md` naar een gedateerde sectie:
   - `## [x.y.z] — JJJJ-MM-DD`
3. Bewaar `## [Unreleased]` als de eerste changelog-sectie voor aankomend werk.
4. Zorg ervoor dat de nieuwste semver-sectie in `CHANGELOG.md` gelijk is aan de `package.json`-versie.## API Docs

5. Update `docs/openapi.yaml`:
   - `info.version` moet gelijk zijn aan `package.json` versie.
6. Valideer eindpuntvoorbeelden als API-contracten zijn gewijzigd.## Runtime Docs

7. Bekijk `docs/ARCHITECTURE.md` voor opslag-/runtime-afwijkingen.
8. Bekijk `docs/TROUBLESHOOTING.md` voor env var en operationele drift.
9. Werk gelokaliseerde documenten bij als de brondocumenten aanzienlijk zijn gewijzigd.## Automated Check

Voer de synchronisatiebeveiliging lokaal uit voordat u PR opent:```bash
npm run check:docs-sync

```

CI voert deze controle ook uit in `.github/workflows/ci.yml` (lint job).
```
