# Test Coverage Plan (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Sidst opdateret: 2026-03-28## Baseline

Der er flere dækningsnumre afhængigt af, hvordan rapporten er beregnet. Til planlægning er kun én af dem nyttig.

| Metrisk            | Omfang                                                 | Udsagn / linjer | Filialer | Funktioner | Noter                                                 |
| ------------------ | ------------------------------------------------------ | --------------: | -------: | ---------: | ----------------------------------------------------- |
| Arv                | Gammel `npm run test:coverage`                         |         79,42 % |  75,15 % |    67,94 % | Oppustet: tæller testfiler og udelukker `open-sse`    |
| Diagnostisk        | Kun kilde, eksklusiv tests og ekskluderende `open-sse` |         68,16 % |  63,55 % |    64,06 % | Kun nyttig til at isolere `src/**`                    |
| Anbefalet baseline | Kun kilde, undtagen test og inklusive "open-sse"       |         56,95 % |  66,05 % |    57,80 % | Dette er den projektdækkende baseline for at forbedre |

Den anbefalede baseline er det tal, der skal optimeres i forhold til.## Rules

- Dækningsmål gælder for kildefiler, ikke for `tests/**`.
- `open-sse/**` er en del af produktet og skal forblive i omfanget.
- Ny kode bør ikke reducere dækningen i berørte områder.
- Foretrækker testadfærd og brancheresultater frem for implementeringsdetaljer.
- Foretrækker midlertidige SQLite-databaser og små fixtures frem for brede mocks til `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Hovedkildedækningsport for enhedstestsuiten
  - Genererer `text-summary`, `html`, `json-summary` og `lcov`
- `npm run coverage:rapport`
  - Detaljeret fil-for-fil rapport fra den seneste kørsel
- `npm run test:coverage:legacy`
  - Kun historisk sammenligning## Milestones

| Fase   |                 Mål | Fokus                                             |
| ------ | ------------------: | ------------------------------------------------- |
| Fase 1 | 60% udsagn / linjer | Hurtige gevinster og lavrisiko forsyningsdækning  |
| Fase 2 | 65% udsagn / linjer | DB og rutefundamenter                             |
| Fase 3 | 70% udsagn / linjer | Udbydervalidering og brugsanalyse                 |
| Fase 4 | 75% udsagn / linjer | `open-sse` oversættere og hjælpere                |
| Fase 5 | 80% udsagn / linjer | `open-sse` handlere og eksekutorgrene             |
| Fase 6 | 85% udsagn / linjer | Harder edge sager, filial gæld, regression suiter |
| Fase 7 | 90% udsagn / linjer | Endelig sweep, spaltelukning, streng skralde      |

Grene og funktioner bør skralde opad med hver fase, men det primære hårde mål er udsagn/linjer.## Priority hotspots

Disse filer eller områder giver det bedste afkast for de næste faser:

1. `open-sse/handlers`
   - "chatCore.ts" på 7,57 %
   - Samlet bibliotek på 29,07 %
2. `åben-sse/oversætter/anmodning`
   - Samlet bibliotek på 36,39 %
   - Mange oversættere er stadig tæt på encifret dækning
3. `åben-sse/oversætter/svar`
   - Samlet bibliotek på 8,07 %
4. `open-sse/executors`
   - Samlet bibliotek på 36,62 %
5. `src/lib/db`
   - `models.ts` på 20,66 %
   - `registeredKeys.ts` på 34,46 %
   - `modelComboMappings.ts` ved 36,25 %
   - `indstillinger.ts` ved 46,40 %
   - `webhooks.ts` på 33,33 %
6. `src/lib/brug`
   - `usageHistory.ts` på 21,12 %
   - `usageStats.ts` på 9,56 %
   - `costCalculator.ts` ved 30,00 %
7. `src/lib/providers`
   - `validation.ts` på 41,16 %
8. Lavrisiko-værktøj og API-filer for tidlige gevinster
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Ret dækningsmetrik, så den afspejler kildekoden i stedet for testfiler
- [x] Behold et ældre dækningsscript til sammenligning
- [x] Optag baseline og hotspots i repoen
- [ ] Tilføj fokuserede test for lavrisikoværktøjer:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Tilføj rutetest for:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Tilføj DB-understøttede test for:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Dækgrenadfærd i:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Tilføj brugsanalysetest for:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Udvid rutedækningen for proxy-administration og indstillingsafdelinger### Phase 4: 70% -> 75%

- [ ] Dæk oversætterhjælpere og centrale oversættelsesstier:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Tilføj tests på handlerniveau for:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Tilføj eksekverende filialdækning for udbyderspecifik godkendelse, genforsøg og slutpunktstilsidesættelser### Phase 6: 80% -> 85%

- [ ] Flet flere edge-case suiter ind i hoveddækningsstien
- [ ] Øg funktionsdækningen for DB-moduler med svag konstruktør-/hjælperdækning
- [ ] Luk grenhuller i `settings.ts`, `registeredKeys.ts`, `validation.ts` og oversætterhjælpere### Phase 7: 85% -> 90%

- [ ] Behandl de resterende lavdækkende filer som blokere
- [ ] Tilføj regressionstest for hver afdækket produktionsfejl, der er rettet under push til 90 %
- [ ] Hæv først dækningsporten i CI, efter at den lokale baseline er stabil i mindst to på hinanden følgende kørsler## Ratchet policy

Opdater 'npm run test:coverage'-tærskler først, når projektet faktisk overskrider den næste milepæl med en behagelig buffer.

Anbefalet skraldesekvens:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ordren er `udsagn-linjer / grene / funktioner`.## Known gap

Den aktuelle dækningskommando måler hovedknudeenhedens suite og inkluderer kilde nået fra den, inklusive `open-sse`. Den fusionerer endnu ikke Vitest-dækning til en enkelt samlet rapport. Den sammensmeltning er værd at gøre senere, men den er ikke en blokering for at starte 60% -> 80% stigningen.
