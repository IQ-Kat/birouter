# Test Coverage Plan (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Laatst bijgewerkt: 28-03-2026## Baseline

Er zijn meerdere dekkingsnummers, afhankelijk van hoe het rapport wordt berekend. Voor de planning is slechts één ervan nuttig.

| Metrisch             | Reikwijdte                                               | Verklaringen / regels | Vestigingen | Functies | Opmerkingen                                        |
| -------------------- | -------------------------------------------------------- | --------------------: | ----------: | -------: | -------------------------------------------------- | ----------- |
| Nalatenschap         | Oude `npm run test:coverage`                             |                79,42% |      75,15% |   67,94% | Opgeblazen: telt testbestanden en sluit `open-sse` |
| Diagnostisch         | Alleen broncode, exclusief tests en exclusief `open-sse` |                68,16% |      63,55% |   64,06% | Alleen nuttig om `src/**`                          | te isoleren |
| Aanbevolen basislijn | Alleen broncode, exclusief tests en inclusief `open-sse` |                56,95% |      66,05% |   57,80% | Dit is de projectbrede basislijn voor verbetering  |

De aanbevolen basislijn is het getal waartegen moet worden geoptimaliseerd.## Rules

- Dekkingsdoelen zijn van toepassing op bronbestanden, niet op `tests/**`.
- `open-sse/**` is onderdeel van het product en moet binnen de reikwijdte blijven.
- Nieuwe code mag de dekking in aangeraakte gebieden niet verminderen.
- Geef de voorkeur aan testgedrag en vertakkingsresultaten boven implementatiedetails.
- Geef de voorkeur aan tijdelijke SQLite-databases en kleine programma's boven brede mocks voor `src/lib/db/**`.## Current command set

- `npm runtest:dekking`
  - Hoofdbrondekkingspoort voor de unittestsuite
  - Genereert `text-summary`, `html`, `json-summary` en `lcov`
- `npm run dekking:rapport`
  - Gedetailleerd rapport per bestand van de laatste run
- `npm run test:coverage:legacy`
  - Alleen historische vergelijking## Milestones

| Fase   |                  Doel | Focus                                                           |
| ------ | --------------------: | --------------------------------------------------------------- |
| Fase 1 | 60% uitspraken/regels | Quick wins en dekking van nutsvoorzieningen met een laag risico |
| Fase 2 | 65% uitspraken/regels | DB- en routefunderingen                                         |
| Fase 3 | 70% uitspraken/regels | Providervalidatie en gebruiksanalyse                            |
| Fase 4 | 75% uitspraken/regels | `open-sse` vertalers en helpers                                 |
| Fase 5 | 80% uitspraken/regels | `open-sse` handlers en executeurtakken                          |
| Fase 6 | 85% uitspraken/regels | Moeilijkere gevallen, brancheschulden, regressiesuites          |
| Fase 7 | 90% uitspraken/regels | Laatste veeg, sluiting van opening, strikte ratel               |

Takken en functies zouden bij elke fase omhoog moeten gaan, maar het primaire harde doel zijn uitspraken/lijnen.## Priority hotspots

Deze bestanden of gebieden bieden het beste rendement voor de volgende fases:

1. `open-sse/handlers`
   - `chatCore.ts` op 7,57%
   - Algemene directory op 29,07%
2. `open-sse/vertaler/verzoek`
   - Algemene directory op 36,39%
   - Veel vertalers hebben nog steeds bijna een dekking van één cijfer
3. `open-sse/vertaler/antwoord`
   - Algemene directory op 8,07%
4. `open-sse/executors`
   - Algemene directory op 36,62%
5. `src/lib/db`
   - `modellen.ts` op 20,66%
   - `geregistreerdeKeys.ts` op 34,46%
   - `modelComboMappings.ts` op 36,25%
   - `settings.ts` op 46,40%
   - `webhooks.ts` op 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` op 21,12%
   - `usageStats.ts` op 9,56%
   - `costCalculator.ts` op 30,00%
7. `src/lib/providers`
   - `validation.ts` op 41,16%
8. Hulpprogramma's en API-bestanden met laag risico voor vroege winst
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Repareer de dekkingsstatistiek zodat deze de broncode weerspiegelt in plaats van testbestanden
- [x] Bewaar een oud dekkingsscript ter vergelijking
- [x] Registreer de basislijn en hotspots in de repo
- [ ] Voeg gerichte tests toe voor nutsvoorzieningen met een laag risico:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Routetests toevoegen voor:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] DB-ondersteunde tests toevoegen voor:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Cover branch-gedrag in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Gebruiksanalysetests toevoegen voor:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Breid de routedekking uit voor proxybeheer en instellingentakken### Phase 4: 70% -> 75%

- [ ] Behandel vertalershelpers en centrale vertaalpaden:
  - `open-sse/translator/index.ts`
  - `open-sse/vertaler/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/vertaler/response/*`### Phase 5: 75% -> 80%

- [ ] Tests op handlerniveau toevoegen voor:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Voeg dekking van de uitvoerdervertakking toe voor providerspecifieke verificatie, nieuwe pogingen en eindpuntoverschrijvingen### Phase 6: 80% -> 85%

- [ ] Voeg meer edge-case-suites samen in het hoofddekkingspad
- [ ] Vergroot de functiedekking voor DB-modules met een zwakke constructor-/helperdekking
- [ ] Sluit gaten in de vertakkingen in `settings.ts`, `registeredKeys.ts`, `validation.ts` en vertalerhelpers### Phase 7: 85% -> 90%

- [ ] Behandel de resterende bestanden met een lage dekking als blokkers
- [ ] Voeg regressietests toe voor elke ongedekte productiebug die is opgelost tijdens de push naar 90%
- [ ] Verhoog de dekkingspoort in CI alleen nadat de lokale basislijn gedurende ten minste twee opeenvolgende runs stabiel is## Ratchet policy

Update de drempelwaarden voor 'npm run test:coverage' pas nadat het project daadwerkelijk de volgende mijlpaal overschrijdt met een comfortabele buffer.

Aanbevolen ratelvolgorde:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

De volgorde is 'statements-lijnen / vertakkingen / functies'.## Known gap

Het huidige dekkingscommando meet de hoofdnode-eenheidsuite en omvat de bron die daaruit wordt bereikt, inclusief `open-sse`. Het voegt de Vitest-dekking nog niet samen in één enkel uniform rapport. Die samenvoeging is de moeite waard om later te doen, maar vormt geen belemmering voor het starten van de klim van 60% -> 80%.
