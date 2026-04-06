# Release Checklist (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Скористайтеся цим контрольним списком, перш ніж додавати теги або публікувати новий випуск OmniRoute.## Version and Changelog

1. Перегляньте версію `package.json` (`x.y.z`) у гілці випуску.
2. Перемістіть примітки до випуску з `## [Unreleased]` в `CHANGELOG.md` до датованого розділу:
   - `## [x.y.z] — РРРР-ММ-ДД`
3. Збережіть `## [Unreleased]` як перший розділ журналу змін для майбутньої роботи.
4. Переконайтеся, що останній розділ semver у `CHANGELOG.md` дорівнює версії `package.json`.## API Docs

5. Оновіть `docs/openapi.yaml`:
   - `info.version` має відповідати версії `package.json`.
6. Перевірте приклади кінцевих точок, якщо контракти API змінилися.## Runtime Docs

7. Перегляньте `docs/ARCHITECTURE.md` для дрейфу зберігання/виконання.
8. Перегляньте `docs/TROUBLESHOOTING.md` для env var та оперативного дрейфу.
9. Оновіть локалізовані документи, якщо вихідні документи значно змінилися.## Automated Check

Запустіть синхронізацію локально перед відкриттям PR:```bash
npm run check:docs-sync

```

CI також запускає цю перевірку в `.github/workflows/ci.yml` (завдання lint).
```
