# Release Checklist (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Utilizați această listă de verificare înainte de a eticheta sau de a publica o nouă versiune OmniRoute.## Version and Changelog

1. Bump versiunea `package.json` (`x.y.z`) în ramura de lansare.
2. Mutați notele de lansare din `## [Unreleased]` din `CHANGELOG.md` într-o secțiune datată:
   - `## [x.y.z] — AAAA-LL-ZZ`
3. Păstrați `## [Unreleased]` ca prima secțiune de jurnal de modificări pentru lucrările viitoare.
4. Asigurați-vă că cea mai recentă secțiune semver din `CHANGELOG.md` este egală cu versiunea `package.json`.## API Docs

5. Actualizați `docs/openapi.yaml`:
   - `info.version` trebuie să fie egal cu versiunea `package.json`.
6. Validați exemplele de puncte finale dacă contractele API s-au modificat.## Runtime Docs

7. Examinați `docs/ARCHITECTURE.md` pentru stocare/runtime drift.
8. Examinați `docs/TROUBLESHOOTING.md` pentru env var și drift operațional.
9. Actualizați documentele localizate dacă documentele sursă s-au modificat semnificativ.## Automated Check

Rulați dispozitivul de sincronizare local înainte de a deschide PR:```bash
npm run check:docs-sync

```

CI rulează și această verificare în `.github/workflows/ci.yml` (lucrare lint).
```
