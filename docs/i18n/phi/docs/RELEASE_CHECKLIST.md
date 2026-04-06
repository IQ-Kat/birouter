# Release Checklist (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Gamitin ang checklist na ito bago mag-tag o mag-publish ng bagong release ng OmniRoute.## Version and Changelog

1. Bump `package.json` na bersyon (`x.y.z`) sa release branch.
2. Ilipat ang mga tala sa paglabas mula sa `## [Hindi Inilabas]` sa `CHANGELOG.md` sa isang may petsang seksyon:
   - `## [x.y.z] — YYYY-MM-DD`
3. Panatilihin ang `## [Hindi Inilabas]` bilang unang seksyon ng changelog para sa paparating na gawain.
4. Tiyaking ang pinakabagong semver na seksyon sa `CHANGELOG.md` ay katumbas ng `package.json` na bersyon.## API Docs

5. I-update ang `docs/openapi.yaml`:
   - Ang `info.version` ay dapat katumbas ng `package.json` na bersyon.
6. I-validate ang mga halimbawa ng endpoint kung nagbago ang mga kontrata ng API.## Runtime Docs

7. Suriin ang `docs/ARCHITECTURE.md` para sa storage/runtime drift.
8. Suriin ang `docs/TROUBLESHOOTING.md` para sa env var at operational drift.
9. I-update ang mga naka-localize na doc kung malaki ang pagbabago sa source docs.## Automated Check

Patakbuhin ang sync guard nang lokal bago buksan ang PR:```bash
npm run check:docs-sync

```

Pinapatakbo din ng CI ang pagsusuring ito sa `.github/workflows/ci.yml` (lint job).
```
