# Release Checklist (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Użyj tej listy kontrolnej przed oznaczeniem lub opublikowaniem nowej wersji OmniRoute.## Version and Changelog

1. Podbij wersję `package.json` (`x.y.z`) w gałęzi wydania.
2. Przenieś informacje o wydaniu z `## [Unreleased]` w `CHANGELOG.md` do datowanej sekcji:
   - `## [x.y.z] — RRRR-MM-DD`
3. Zachowaj `## [Unreleased]` jako pierwszą sekcję dziennika zmian dla nadchodzących prac.
4. Upewnij się, że najnowsza sekcja semver w `CHANGELOG.md` jest równa wersji `package.json`.## API Docs

5. Zaktualizuj `docs/openapi.yaml`:
   - `info.version` musi być równe wersji `package.json`.
6. Zweryfikuj przykłady punktów końcowych, jeśli zmieniły się umowy API.## Runtime Docs

7. Przejrzyj plik `docs/ARCHITECTURE.md` pod kątem dryftu w zakresie przechowywania/środowiska wykonawczego.
8. Przejrzyj plik `docs/TROUBLESHOOTING.md` pod kątem zmiennych środowiskowych i dryfów operacyjnych.
9. Zaktualizuj zlokalizowane dokumenty, jeśli dokumenty źródłowe uległy znaczącym zmianom.## Automated Check

Uruchom ochronę synchronizacji lokalnie przed otwarciem PR:```bash
npm run check:docs-sync

```

CI uruchamia również tę kontrolę w `.github/workflows/ci.yml` (zadanie lint).
```
