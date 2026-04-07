# Release Checklist (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Használja ezt az ellenőrzőlistát egy új OmniRoute kiadás címkézése vagy közzététele előtt.## Version and Changelog

1. A "package.json" verzió ("x.y.z") összeállítása a kiadási ágban.
2. Helyezze át a kibocsátási megjegyzéseket a `CHANGELOG.md' "## [Unreleased]" részéből egy dátummal rendelkező szakaszba:
   - "## [x.y.z] - ÉÉÉÉ-HH-NN".
3. Tartsa meg a `## [Unreleased]`-t az első változásnapló-szakaszként a következő munkákhoz.
4. Győződjön meg arról, hogy a `CHANGELOG.md' legfrissebb semver szakasza megegyezik a `package.json' verzióval.## API Docs

5. Frissítse a `docs/openapi.yaml' fájlt:
   - Az "info.version" meg kell egyeznie a "package.json" verzióval.
6. Érvényesítse a végpont példákat, ha az API-szerződések megváltoztak.## Runtime Docs

7. Tekintse át a `docs/ARCHITECTURE.md' fájlt a tárolási/futási időbeli eltolódásokért.
8. Tekintse át a `docs/TROUBLESHOOTING.md' fájlt az env var és a működési eltolódások tekintetében.
9. Frissítse a lokalizált dokumentumokat, ha a forrásdokumentumok jelentősen megváltoztak.## Automated Check

Futtassa a szinkronizálási őrt helyileg a PR megnyitása előtt:```bash
npm run check:docs-sync

```

A CI ezt az ellenőrzést a `.github/workflows/ci.yml` (lint job) fájlban is futtatja.
```
