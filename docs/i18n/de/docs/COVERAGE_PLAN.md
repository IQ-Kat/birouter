# Test Coverage Plan (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Letzte Aktualisierung: 28.03.2026## Baseline

Abhängig davon, wie der Bericht berechnet wird, gibt es mehrere Abdeckungszahlen. Für die Planung ist nur einer davon sinnvoll.

| Metrisch              | Geltungsbereich                                      | Anweisungen / Zeilen |  Zweige | Funktionen | Notizen                                                    |
| --------------------- | ---------------------------------------------------- | -------------------: | ------: | ---------: | ---------------------------------------------------------- | ------------ |
| Vermächtnis           | Altes „npm run test:coverage“                        |              79,42 % | 75,15 % |    67,94 % | Aufgeblasen: zählt Testdateien und schließt „open-sse“ aus |
| Diagnose              | Nur Quelle, ohne Tests und ohne „open-sse“           |              68,16 % | 63,55 % |    64,06 % | Nur nützlich, um „src/\*\*“                                | zu isolieren |
| Empfohlene Basislinie | Nur Quelle, ohne Tests und einschließlich „open-sse“ |              56,95 % | 66,05 % |    57,80 % | Dies ist die projektweite Basis für Verbesserungen         |

Die empfohlene Basislinie ist die Zahl, anhand derer optimiert werden soll.## Rules

- Abdeckungsziele gelten für Quelldateien, nicht für „tests/\*\*“.
- „open-sse/\*\*“ ist Teil des Produkts und muss im Geltungsbereich bleiben.
  – Der neue Code sollte die Abdeckung in berührten Gebieten nicht beeinträchtigen.
- Bevorzugen Sie Testverhalten und Verzweigungsergebnisse gegenüber Implementierungsdetails.
- Bevorzugen Sie temporäre SQLite-Datenbanken und kleine Fixtures gegenüber breiten Mocks für „src/lib/db/\*\*“.## Current command set

- „npm run test:coverage“.
  - Hauptquellen-Coverage-Gate für die Unit-Test-Suite
    – Erzeugt „text-summary“, „html“, „json-summary“ und „lcov“.
- „npm run cover:report“.
  - Detaillierter Datei-für-Datei-Bericht vom letzten Lauf
- „npm run test:coverage:legacy“.
  - Nur historischer Vergleich## Milestones

| Phase   |                 Ziel | Fokus                                              |
| ------- | -------------------: | -------------------------------------------------- |
| Phase 1 | 60 % Aussagen/Zeilen | Schnelle Erfolge und risikoarme Versorgungsdeckung |
| Phase 2 | 65 % Aussagen/Zeilen | DB- und Streckenfundamente                         |
| Phase 3 | 70 % Aussagen/Zeilen | Anbietervalidierung und Nutzungsanalyse            |
| Phase 4 | 75 % Aussagen/Zeilen | „open-sse“-Übersetzer und -Helfer                  |
| Phase 5 | 80 % Aussagen/Zeilen | „open-sse“-Handler und Executor-Zweige             |
| Phase 6 | 85 % Aussagen/Zeilen | Härtere Fälle, Filialschulden, Regressionssuiten   |
| Phase 7 | 90 % Aussagen/Zeilen | Endfegen, Lückenschluss, strenge Ratsche           |

Zweige und Funktionen sollten mit jeder Phase höher ausfallen, das primäre harte Ziel sind jedoch Anweisungen/Zeilen.## Priority hotspots

Diese Dateien oder Bereiche bieten die beste Rendite für die nächsten Phasen:

1. „open-sse/handlers“.
   - „chatCore.ts“ bei 7,57 %
   - Gesamtverzeichnis bei 29,07 %
2. „open-sse/translator/request“.
   - Gesamtverzeichnis bei 36,39 %
   - Viele Übersetzer erreichen immer noch eine Deckung im nahezu einstelligen Bereich
3. „open-sse/translator/response“.
   - Gesamtverzeichnis bei 8,07 %
4. „open-sse/executors“.
   - Gesamtverzeichnis bei 36,62 %
5. `src/lib/db`
   - „models.ts“ bei 20,66 %
   - „registeredKeys.ts“ bei 34,46 %
   - „modelComboMappings.ts“ bei 36,25 %
   - „settings.ts“ bei 46,40 %
   - „webhooks.ts“ bei 33,33 %
6. `src/lib/usage`
   - „usageHistory.ts“ bei 21,12 %
   - „usageStats.ts“ bei 9,56 %
   - „costCalculator.ts“ bei 30,00 %
7. `src/lib/providers`
   - „validation.ts“ bei 41,16 %
8. Risikoarme Dienstprogramme und API-Dateien für frühzeitige Gewinne
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Abdeckungsmetrik korrigiert, sodass sie den Quellcode anstelle von Testdateien widerspiegelt
- [x] Behalten Sie zum Vergleich ein altes Abdeckungsskript bei
- [x] Zeichnen Sie die Baseline und Hotspots im Repo auf
- [ ] Fügen Sie gezielte Tests für Versorgungsunternehmen mit geringem Risiko hinzu:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Routentests hinzufügen für:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] DB-gestützte Tests hinzufügen für:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Verzweigungsverhalten abdecken in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Nutzungsanalysetests hinzufügen für:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Erweitern Sie die Routenabdeckung für Proxy-Verwaltung und Einstellungszweige### Phase 4: 70% -> 75%

- [ ] Übersetzerhelfer und zentrale Übersetzungspfade abdecken:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Tests auf Handlerebene hinzufügen für:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
    – [] Executor-Branch-Abdeckung für anbieterspezifische Authentifizierung, Wiederholungsversuche und Endpunktüberschreibungen hinzufügen### Phase 6: 80% -> 85%

- [ ] Weitere Edge-Case-Suites in den Hauptabdeckungspfad einbinden
- [ ] Erhöhen Sie die Funktionsabdeckung für DB-Module mit schwacher Konstruktor-/Helferabdeckung
- [ ] Verzweigungslücken in „settings.ts“, „registeredKeys.ts“, „validation.ts“ und Übersetzer-Helfern schließen### Phase 7: 85% -> 90%

- [ ] Behandeln Sie die verbleibenden Dateien mit geringer Abdeckung als Blocker
- [ ] Fügen Sie Regressionstests für jeden aufgedeckten Produktionsfehler hinzu, der während des Pushs auf 90 % behoben wurde.
- [ ] Erhöhen Sie das Coverage-Gate in CI erst, nachdem die lokale Basislinie für mindestens zwei aufeinanderfolgende Läufe stabil ist## Ratchet policy

Aktualisieren Sie die Schwellenwerte für „npm run test:coverage“ erst, wenn das Projekt tatsächlich den nächsten Meilenstein mit einem komfortablen Puffer überschreitet.

Empfohlene Ratschenfolge:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Die Reihenfolge ist „Anweisungen-Zeilen/Zweige/Funktionen“.## Known gap

Der aktuelle Coverage-Befehl misst die Hauptknoten-Einheitensuite und schließt die von dort erreichte Quelle ein, einschließlich „open-sse“. Die Vitest-Abdeckung wird noch nicht in einem einzigen einheitlichen Bericht zusammengefasst. Diese Zusammenführung lohnt sich später, ist aber kein Hindernis für den Beginn des 60 % -> 80 %-Anstiegs.
