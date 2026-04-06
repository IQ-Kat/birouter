# Release Checklist (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Pred označením alebo zverejnením nového vydania OmniRoute použite tento kontrolný zoznam.## Version and Changelog

1. Presuňte verziu súboru `package.json` (`x.y.z`) vo vetve vydania.
2. Presuňte poznámky k vydaniu z `## [Unreleased]` v `CHANGELOG.md` do sekcie s dátumom:
   - `## [x.y.z] — RRRR-MM-DD`
3. Ponechajte `## [Unreleased]` ako prvú sekciu protokolu zmien pre nadchádzajúcu prácu.
4. Uistite sa, že najnovšia sekcia semver v `CHANGELOG.md` sa rovná verzii `package.json`.## API Docs

5. Aktualizujte `docs/openapi.yaml`:
   - „info.version“ sa musí rovnať verzii „package.json“.
6. Overte príklady koncových bodov, ak sa zmenili zmluvy API.## Runtime Docs

7. Prezrite si `docs/ARCHITECTURE.md`, kde nájdete posun v úložisku/behu.
8. Skontrolujte `docs/TROUBLESHOOTING.md` pre env var a operačný posun.
9. Aktualizujte lokalizované dokumenty, ak sa zdrojové dokumenty výrazne zmenili.## Automated Check

Pred otvorením PR spustite ochranu synchronizácie lokálne:```bash
npm run check:docs-sync

```

CI tiež spúšťa túto kontrolu v `.github/workflows/ci.yml` (úloha lint).
```
