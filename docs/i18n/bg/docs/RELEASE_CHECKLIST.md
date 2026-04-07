# Release Checklist (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Използвайте този контролиран списък, преди да маркирате или публикувате нова версия на OmniRoute.## Version and Changelog

1. Премахнете версията на `package.json` (`x.y.z`) в клона за освобождаване.
2. Преместете бележките по изданието от `## [Unreleased]` в `CHANGELOG.md` в раздел с данни:
   - `## [x.y.z] — ГГГГ-ММ-ДД`
3. Запазете `## [Unreleased]` като първа секция на регистъра, за да промените за предстояща работа.
4. Уверете се, че последният раздел на semver в `CHANGELOG.md` е равен на версията `package.json`.## API Docs

5. Актуализирайте `docs/openapi.yaml`:
   - `info.version` трябва да е равно на `package.json` версия.
6. Валидирайте примери за крайната точка, ако договорите за API са променени.## Runtime Docs

7. Прегледайте `docs/ARCHITECTURE.md` за дрейф за съхранение/изпълнение.
8. Прегледайте `docs/TROUBLESHOOTING.md` за env var и оперативен drift.
9. Актуализирайте локализираните документи, ако изходните документи са се променили значително.## Automated Check

Стартирайте защитата на синхронизирането локално, преди да отворите PR:`bash
npm стартирайте проверка:docs-sync`

CI също изпълнява тази проверка в `.github/workflows/ci.yml` (задание за мъх).
