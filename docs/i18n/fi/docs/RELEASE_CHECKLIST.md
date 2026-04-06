# Release Checklist (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Käytä tätä tarkistuslistaa ennen uuden OmniRoute-julkaisun merkitsemistä tai julkaisemista.## Version and Changelog

1. Lisää paketti.json-versio (x.y.z) julkaisuhaaraan.
2. Siirrä julkaisutiedot CHANGELOG.md-tiedoston kohdasta ## [Unreleased] päivättyyn osioon:
   - "## [x.y.z] - VVVV-KK-PP".
3. Pidä `## [Unreleased]` ensimmäisenä muutoslokin osiona tulevaa työtä varten.
4. Varmista, että CHANGELOG.md:n uusin semver-osio on sama kuin paketti.json-versio.## API Docs

5. Päivitä `docs/openapi.yaml`:
   - "info.version" on oltava sama kuin "package.json"-versio.
6. Vahvista päätepisteesimerkit, jos API-sopimukset ovat muuttuneet.## Runtime Docs

7. Tarkista tiedostosta docs/ARCHITECTURE.md tallennus-/ajoajan siirtymä.
8. Tarkista tiedostosta `docs/TROUBLESHOOTING.md' env var ja operational drift.
9. Päivitä lokalisoidut asiakirjat, jos lähdedokumentit ovat muuttuneet merkittävästi.## Automated Check

Suorita synkronointivartio paikallisesti ennen PR:n avaamista:```bash
npm run check:docs-sync

```

CI suorittaa tämän tarkistuksen myös tiedostossa `.github/workflows/ci.yml` (lint-työ).
```
