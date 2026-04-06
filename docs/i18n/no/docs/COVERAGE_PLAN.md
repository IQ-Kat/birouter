# Test Coverage Plan (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Sist oppdatert: 2026-03-28## Baseline

Det er flere dekningstall avhengig av hvordan rapporten beregnes. For planlegging er bare en av dem nyttig.

| Metrisk             | Omfang                                            | Uttalelser / linjer |  Grener | Funksjoner | Merknader                                                  |
| ------------------- | ------------------------------------------------- | ------------------: | ------: | ---------: | ---------------------------------------------------------- |
| Arv                 | Gammel `npm run test:coverage`                    |             79,42 % | 75,15 % |    67,94 % | Oppblåst: teller testfiler og ekskluderer `open-sse`       |
| Diagnostisk         | Kun kilde, unntatt tester og unntatt `open-sse`   |             68,16 % | 63,55 % |    64,06 % | Nyttig bare for å isolere `src/**`                         |
| Anbefalt grunnlinje | Kun kilde, unntatt tester og inkludert `open-sse` |             56,95 % | 66,05 % |    57,80 % | Dette er den prosjektomfattende grunnlinjen for å forbedre |

Den anbefalte grunnlinjen er tallet som skal optimaliseres mot.## Rules

- Dekningsmål gjelder for kildefiler, ikke for `tester/**`.
- `open-sse/**` er en del av produktet og må forbli i omfanget.
  – Ny kode skal ikke redusere dekningen i berørte områder.
- Foretrekk testatferd og grenresultater fremfor implementeringsdetaljer.
- Foretrekk midlertidige SQLite-databaser og små inventar fremfor brede modeller for `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Hovedkildedekningsport for enhetens testsuite
  - Genererer `text-summary`, `html`, `json-summary` og `lcov`
- `npm run coverage:rapport`
  - Detaljert fil-for-fil-rapport fra siste kjøring
- `npm run test:coverage:legacy`
  - Kun historisk sammenligning## Milestones

| Fase   |                  Mål | Fokus                                            |
| ------ | -------------------: | ------------------------------------------------ |
| Fase 1 | 60 % utsagn / linjer | Raske gevinster og lavrisiko verktøydekning      |
| Fase 2 | 65 % utsagn / linjer | DB og traséfundamenter                           |
| Fase 3 | 70 % utsagn / linjer | Leverandørvalidering og bruksanalyse             |
| Fase 4 | 75 % utsagn / linjer | `open-sse` oversettere og hjelpere               |
| Fase 5 | 80 % utsagn / linjer | `open-sse` behandlere og eksekutørgrener         |
| Fase 6 | 85 % utsagn / linjer | Harder edge saker, filialgjeld, regresjonssuiter |
| Fase 7 | 90 % utsagn / linjer | Siste sveip, lukking av gap, streng skralle      |

Grener og funksjoner bør skralde oppover med hver fase, men det primære harde målet er uttalelser / linjer.## Priority hotspots

Disse filene eller områdene gir best avkastning for de neste fasene:

1. `open-sse/handlers`
   - "chatCore.ts" på 7,57 %
   - Samlet katalog på 29,07 %
2. `open-sse/translator/request`
   - Samlet katalog på 36,39 %
     – Mange oversettere er fortsatt i nærheten av ensifret dekning
3. `åpen-sse/oversetter/svar`
   - Samlet katalog på 8,07 %
4. `open-sse/executors`
   - Samlet katalog på 36,62 %
5. `src/lib/db`
   - 'models.ts' på 20,66 %
   - `registeredKeys.ts` på 34,46 %
   - `modelComboMappings.ts` på 36,25 %
   - 'settings.ts' på 46,40 %
   - `webhooks.ts` på 33,33 %
6. `src/lib/usage`
   - 'usageHistory.ts' på 21,12 %
   - `usageStats.ts` på 9,56 %
   - `costCalculator.ts` ved 30,00 %
7. `src/lib/providers`
   - `validation.ts` på 41,16 %
8. Lavrisiko-verktøy og API-filer for tidlige gevinster
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Fiks dekningsberegning slik at den gjenspeiler kildekoden i stedet for testfiler
- [x] Behold et eldre dekningsskript for sammenligning
- [x] Registrer grunnlinjen og hotspots i repoen
- [ ] Legg til fokuserte tester for lavrisikoverktøy:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Legg til rutetester for:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Legg til DB-støttede tester for:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Dekkgrenadferd i:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Legg til bruksanalysetester for:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Utvid rutedekning for proxy-administrasjon og innstillingsgrener### Phase 4: 70% -> 75%

- [ ] Dekk oversetterhjelpere og sentrale oversettelsesveier:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Legg til tester på behandlernivå for:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Legg til eksekverende grendekning for leverandørspesifikk godkjenning, gjenforsøk og endepunktoverstyringer### Phase 6: 80% -> 85%

- [ ] Slå sammen flere edge-case-suiter til hoveddekningsbanen
- [ ] Øk funksjonsdekning for DB-moduler med svak konstruktør-/hjelperdekning
- [ ] Lukk grenhull i `settings.ts`, `registeredKeys.ts`, `validation.ts` og oversetterhjelpere### Phase 7: 85% -> 90%

- [ ] Behandle de resterende filene med lav dekning som blokkere
- [ ] Legg til regresjonstester for hver avdekket produksjonsfeil rettet under push til 90 %
- [ ] Hev dekningsporten i CI først etter at den lokale grunnlinjen er stabil i minst to påfølgende kjøringer## Ratchet policy

Oppdater `npm run test:coverage`-terskler bare etter at prosjektet faktisk overskrider neste milepæl med en komfortabel buffer.

Anbefalt skrallesekvens:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ordren er `utsagn-linjer / grener / funksjoner`.## Known gap

Den nåværende dekningskommandoen måler hovednodeenhetens suite og inkluderer kilden som er nådd fra den, inkludert 'open-sse'. Den slår ennå ikke sammen Vitest-dekning til en enkelt enhetlig rapport. Den sammenslåingen er verdt å gjøre senere, men den er ikke en blokkering for å starte 60% -> 80% stigningen.
