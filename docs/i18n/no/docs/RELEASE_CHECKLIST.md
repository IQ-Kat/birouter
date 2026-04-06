# Release Checklist (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Bruk denne sjekklisten før du merker eller publiserer en ny OmniRoute-utgivelse.## Version and Changelog

1. Bump `package.json`-versjonen (`x.y.z`) i utgivelsesgrenen.
2. Flytt versjonsnotater fra `## [Uutgitt]` i `CHANGELOG.md` til en datert del:
   - `## [x.y.z] — ÅÅÅÅ-MM-DD`
3. Behold `## [Uutgitt]` som den første endringsloggdelen for kommende arbeid.
4. Sørg for at den siste semver-delen i `CHANGELOG.md` er lik `package.json`-versjonen.## API Docs

5. Oppdater `docs/openapi.yaml`:
   - `info.version` må være lik `package.json`-versjonen.
6. Valider endepunkteksempler hvis API-kontrakter endres.## Runtime Docs

7. Se gjennom `docs/ARCHITECTURE.md` for lagrings-/kjøretidsdrift.
8. Se gjennom `docs/FEILSØKING.md` for env var og driftsavvik.
9. Oppdater lokaliserte dokumenter hvis kildedokumentene endret seg betydelig.## Automated Check

Kjør synkroniseringsvakten lokalt før du åpner PR:```bash
npm run check:docs-sync

```

CI kjører også denne sjekken i `.github/workflows/ci.yml` (lojobb).
```
