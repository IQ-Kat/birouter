# Release Checklist (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Utilice esta lista de verificación antes de etiquetar o publicar una nueva versión de OmniRoute.## Version and Changelog

1. Actualice la versión `package.json` (`x.y.z`) en la rama de lanzamiento.
2. Mueva las notas de la versión de `## [Inédito]` en `CHANGELOG.md` a una sección con fecha:
   - `## [x.y.z] — AAAA-MM-DD`
3. Mantenga `## [Inédito]` como la primera sección del registro de cambios para el próximo trabajo.
4. Asegúrese de que la última sección semver en `CHANGELOG.md` sea igual a la versión `package.json`.## API Docs

5. Actualice `docs/openapi.yaml`:
   - `info.version` debe ser igual a la versión `package.json`.
6. Validar ejemplos de puntos finales si los contratos de API cambiaron.## Runtime Docs

7. Revise `docs/ARCHITECTURE.md` para detectar cambios en el almacenamiento/tiempo de ejecución.
8. Revise `docs/TROUBLESHOOTING.md` para conocer la var env y la desviación operativa.
9. Actualice los documentos localizados si los documentos de origen cambiaron significativamente.## Automated Check

Ejecute sync guard localmente antes de abrir PR:```bash
npm run check:docs-sync

```

CI también ejecuta esta verificación en `.github/workflows/ci.yml` (trabajo de pelusa).
```
