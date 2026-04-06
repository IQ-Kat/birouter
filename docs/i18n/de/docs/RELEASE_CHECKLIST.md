# Release Checklist (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Verwenden Sie diese Checkliste, bevor Sie eine neue OmniRoute-Version markieren oder veröffentlichen.## Version and Changelog

1. Erhöhen Sie die „package.json“-Version („x.y.z“) im Release-Zweig.
2. Verschieben Sie Versionshinweise von „## [Unreleased]“ in „CHANGELOG.md“ in einen datierten Abschnitt:
   - „## [x.y.z] – JJJJ-MM-TT“.
3. Behalten Sie „## [Unreleased]“ als ersten Änderungsprotokollabschnitt für bevorstehende Arbeiten bei.
4. Stellen Sie sicher, dass der neueste Semver-Abschnitt in „CHANGELOG.md“ der Version „package.json“ entspricht.## API Docs

5. Aktualisieren Sie „docs/openapi.yaml“:
   - „info.version“ muss mit der Version „package.json“ übereinstimmen.
6. Validieren Sie Endpunktbeispiele, wenn sich API-Verträge geändert haben.## Runtime Docs

7. Überprüfen Sie „docs/ARCHITECTURE.md“ auf Speicher-/Laufzeitdrift.
8. Überprüfen Sie „docs/TROUBLESHOOTING.md“ auf Umgebungsvariable und Betriebsabweichung.
9. Aktualisieren Sie lokalisierte Dokumente, wenn sich die Quelldokumente erheblich geändert haben.## Automated Check

Führen Sie den Synchronisierungsschutz lokal aus, bevor Sie PR öffnen:```bash
npm run check:docs-sync

```

CI führt diese Prüfung auch in „.github/workflows/ci.yml“ durch (Lint-Job).
```
