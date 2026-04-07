# Release Checklist (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Utilizza questo elenco di controllo prima di contrassegnare o pubblicare una nuova versione di OmniRoute.## Version and Changelog

1. Eseguire il bump della versione di `package.json` (`x.y.z`) nel ramo di rilascio.
2. Sposta le note di rilascio da "## [Unreleased]" in "CHANGELOG.md" in una sezione con data:
   - `## [x.y.z] — AAAA-MM-GG`
3. Mantieni "## [Unreleased]" come prima sezione del registro delle modifiche per i prossimi lavori.
4. Assicurati che l'ultima sezione del semestre in "CHANGELOG.md" corrisponda alla versione di "package.json".## API Docs

5. Aggiorna `docs/openapi.yaml`:
   - "info.version" deve essere uguale alla versione di "package.json".
6. Convalidare gli esempi di endpoint se i contratti API sono cambiati.## Runtime Docs

7. Esaminare `docs/ARCHITECTURE.md` per informazioni sulla deriva di archiviazione/runtime.
8. Consultare `docs/TROUBLESHOOTING.md` per env var e deriva operativa.
9. Aggiorna i documenti localizzati se i documenti di origine sono cambiati in modo significativo.## Automated Check

Esegui la protezione della sincronizzazione localmente prima di aprire PR:```bash
npm run check:docs-sync

```

CI esegue questo controllo anche in `.github/workflows/ci.yml` (lavoro lint).
```
