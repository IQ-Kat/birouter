# Test Coverage Plan (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Senast uppdaterad: 2026-03-28## Baseline

Det finns flera täckningsnummer beroende på hur rapporten beräknas. För planering är bara en av dem användbar.

| Metrisk                | Omfattning                                                | Uttalanden / rader | Filialer | Funktioner | Anteckningar                                                 |
| ---------------------- | --------------------------------------------------------- | -----------------: | -------: | ---------: | ------------------------------------------------------------ |
| Arvet                  | Gammal `npm run test:coverage`                            |            79,42 % |  75,15 % |    67,94 % | Uppblåst: räknar testfiler och exkluderar `open-sse`         |
| Diagnostisk            | Endast källkod, exklusive tester och exklusive `open-sse` |            68,16 % |  63,55 % |    64,06 % | Användbar endast för att isolera `src/**`                    |
| Rekommenderad baslinje | Endast källkod, exklusive tester och inklusive `open-sse` |            56,95 % |  66,05 % |    57,80 % | Detta är den projektövergripande baslinjen för att förbättra |

Den rekommenderade baslinjen är antalet att optimera mot.## Rules

- Täckningsmål gäller för källfiler, inte för `test/**`.
- `open-sse/**` är en del av produkten och måste förbli inom omfattningen.
  – Ny kod ska inte minska täckningen i berörda områden.
- Föredrar testbeteende och grenresultat framför implementeringsdetaljer.
- Föredrar tillfälliga SQLite-databaser och små fixturer framför breda hånar för `src/lib/db/**`.## Current command set

- `npm kör test:täckning`
  - Huvudkällans täckningsport för enhetens testsvit
  - Genererar "text-sammanfattning", "html", "json-sammanfattning" och "lcov"
- `npm kör täckning:rapport`
  - Detaljerad fil-för-fil-rapport från den senaste körningen
- `npm run test:coverage:legacy`
  - Endast historisk jämförelse## Milestones

| Fas   |                    Mål | Fokus                                             |
| ----- | ---------------------: | ------------------------------------------------- |
| Fas 1 | 60% uttalanden / rader | Snabbvinster och lågrisktäckning för verktyg      |
| Fas 2 | 65% uttalanden / rader | DB och väggrunder                                 |
| Fas 3 | 70% uttalanden / rader | Providervalidering och användningsanalys          |
| Fas 4 | 75% uttalanden / rader | `open-sse` översättare och medhjälpare            |
| Fas 5 | 80% uttalanden / rader | `open-sse` hanterare och exekutörsgrenar          |
| Fas 6 | 85% uttalanden / rader | Harder edge fall, filial skuld, regression sviter |
| Fas 7 | 90% uttalanden / rader | Slutsvep, spaltstängning, strikt spärr            |

Grenar och funktioner bör spärra uppåt med varje fas, men det primära hårda målet är uttalanden/linjer.## Priority hotspots

Dessa filer eller områden ger den bästa avkastningen för nästa faser:

1. `öppen-sse/hanterare`
   - "chatCore.ts" på 7,57 %
   - Total katalog på 29,07 %
2. `open-sse/translator/request`
   - Total katalog på 36,39 %
     – Många översättare är fortfarande nära ensiffrig täckning
3. `öppen-sse/översättare/svar`
   - Total katalog på 8,07 %
4. `open-sse/executors`
   - Total katalog på 36,62 %
5. `src/lib/db`
   - "models.ts" på 20,66 %
   - "registeredKeys.ts" på 34,46 %
   - "modelComboMappings.ts" på 36,25 %
   - "inställningar.ts" på 46,40 %
   - "webhooks.ts" på 33,33 %
6. `src/lib/användning`
   - 'usageHistory.ts' på 21,12 %
   - `usageStats.ts` på 9,56 %
   - "costCalculator.ts" vid 30,00 %
7. `src/lib/providers`
   - "validation.ts" på 41,16 %
8. Lågriskverktyg och API-filer för tidiga vinster
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Fixa täckningsmått så att det återspeglar källkoden istället för testfiler
- [x] Behåll ett äldre täckningsskript för jämförelse
- [x] Spela in baslinjen och hotspots i repo
- [ ] Lägg till fokuserade tester för lågriskverktyg:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Lägg till rutttest för:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Lägg till DB-stödda tester för:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Täckgrenbeteende i:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Lägg till användningsanalystester för:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Utöka ruttäckningen för proxyhantering och inställningsgrenar### Phase 4: 70% -> 75%

- [ ] Täck översättarhjälpare och centrala översättningsvägar:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Lägg till tester på hanterarnivå för:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Lägg till täckning för exekutorgren för leverantörsspecifik autentisering, återförsök och åsidosättande av slutpunkter### Phase 6: 80% -> 85%

- [ ] Slå ihop fler edge-case-sviter i huvudtäckningsvägen
- [ ] Öka funktionstäckningen för DB-moduler med svag konstruktor-/hjälpartäckning
- [ ] Stäng grenluckor i `settings.ts`, `registeredKeys.ts`, `validation.ts` och översättare### Phase 7: 85% -> 90%

- [ ] Behandla de återstående lågtäckningsfilerna som blockerare
- [ ] Lägg till regressionstester för varje upptäckt produktionsbugg fixad under push till 90 %
- [ ] Höj täckningsgrinden i CI först efter att den lokala baslinjen är stabil under minst två på varandra följande körningar## Ratchet policy

Uppdatera trösklar för `npm run test:coverage` först efter att projektet faktiskt överskrider nästa milstolpe med en bekväm buffert.

Rekommenderad spärrsekvens:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ordningen är `statement-rader / grenar / funktioner`.## Known gap

Det aktuella täckningskommandot mäter huvudnodenhetssviten och inkluderar källa som nås från den, inklusive `open-sse`. Den slår ännu inte ihop Vitest-täckning till en enda enhetlig rapport. Den sammanslagningen är värd att göra senare, men det är inte en blockerare för att starta 60% -> 80% klättringen.
