# Release Checklist (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Utilisez cette liste de contrôle avant de baliser ou de publier une nouvelle version d'OmniRoute.## Version and Changelog

1. Bump la version `package.json` (`x.y.z`) dans la branche release.
2. Déplacez les notes de version de `## [Unreleased]` dans `CHANGELOG.md` vers une section datée :
   - `## [x.y.z] — AAAA-MM-JJ`
3. Conservez `## [Unreleased]` comme première section du journal des modifications pour les travaux à venir.
4. Assurez-vous que la dernière section Semver dans `CHANGELOG.md` est égale à la version `package.json`.## API Docs

5. Mettez à jour `docs/openapi.yaml` :
   - `info.version` doit être égal à la version `package.json`.
6. Validez les exemples de points de terminaison si les contrats d'API ont changé.## Runtime Docs

7. Consultez `docs/ARCHITECTURE.md` pour connaître la dérive de stockage/d'exécution.
8. Consultez `docs/TROUBLESHOOTING.md` pour la variable d'environnement et la dérive opérationnelle.
9. Mettez à jour les documents localisés si les documents sources ont changé de manière significative.## Automated Check

Exécutez le sync guard localement avant d'ouvrir PR :```bash
npm run check:docs-sync

```

CI exécute également cette vérification dans `.github/workflows/ci.yml` (tâche lint).
```
