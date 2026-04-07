# Test Coverage Plan (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Utolsó frissítés: 2026-03-28## Baseline

A jelentés számítási módjától függően többféle lefedettségi szám létezik. A tervezéshez ezek közül csak az egyik hasznos.

| Metrikus           | Hatály                                                           | Nyilatkozatok / sorok |   Ágak | Funkciók | Megjegyzések                                                |
| ------------------ | ---------------------------------------------------------------- | --------------------: | -----: | -------: | ----------------------------------------------------------- | -------------------------- |
| Örökség            | Régi `npm futtatási teszt:lefedettség`                           |                79,42% | 75,15% |   67,94% | Felfújt: számolja a tesztfájlokat, és kizárja az "open-sse" |
| Diagnosztikai      | Csak forrás, a tesztek és az "open-sse" kivételével              |                68,16% | 63,55% |   64,06% | Csak az `src/**`                                            | elkülönítésére használható |
| Ajánlott alapérték | Csak forrás, a tesztek kivételével és az "open-sse" kifejezéssel |                56,95% | 66,05% |   57,80% | Ez a projekt egészére kiterjedő kiindulópont a              |

Az ajánlott alapérték az a szám, amelyre optimalizálni kell.## Rules

- A lefedettségi célok a forrásfájlokra vonatkoznak, nem a `tesztekre/**`.
- Az "open-sse/\*\*" a termék része, és a hatályon belül kell maradnia.
- Az új kód nem csökkentheti a lefedettséget az érintett területeken.
- Előnyben részesítse a tesztelési viselkedést és az ágak eredményeit a megvalósítás részleteivel szemben.
- Előnyben részesítse az ideiglenes SQLite adatbázisokat és a kis fixture-eket, mint az `src/lib/db/**` általános mockjeit.## Current command set

- `npm futtatási teszt:lefedettség`
  - Az egységteszt-készlet fő forráslefedési kapuja
  - "text-summary", "html", "json-summary" és "lcov" generál
- `npm futási fedezet:jelentés`
  - Részletes fájlonkénti jelentés a legutóbbi futtatásból
- "npm futtatási teszt:lefedettség:örökölt".
  - Csak történelmi összehasonlítás## Milestones

| fázis    |                   Cél | Fókusz                                                |
| -------- | --------------------: | ----------------------------------------------------- |
| 1. fázis | 60% állítások / sorok | Gyors győzelem és alacsony kockázatú közüzemi fedezet |
| 2. fázis | 65% állítások / sorok | DB és útvonalalapok                                   |
| 3. fázis | 70% állítások / sorok | Szolgáltatói érvényesítési és használati elemzések    |
| 4. fázis | 75% állítások / sorok | `open-sse` fordítók és segítők                        |
| 5. fázis | 80% állítások / sorok | `open-sse` kezelők és végrehajtó ágak                 |
| 6. fázis | 85% állítások / sorok | Nehezebb esetek, fióktartozás, regressziós csomagok   |
| 7. fázis | 90% állítások / sorok | Végsöprés, részárás, szigorú racsnis                  |

Az ágaknak és a függvényeknek minden fázissal felfelé kell emelkedniük, de az elsődleges kemény célpont az utasítások/sorok.## Priority hotspots

These files or areas offer the best return for the next phases:

1. `nyitott-sse/handlers`
   - "chatCore.ts" 7,57%
   - A teljes címtár 29,07%
2. `open-sse/translator/request`
   - A teljes címtár 36,39%
   - Sok fordító még mindig az egyszámjegyű lefedettség közelében van
3. `open-sse/translator/response`
   - A teljes címtár 8,07%
4. `nyitott-sse/végrehajtók`
   - A teljes címtár 36,62%
5. `src/lib/db`
   - "models.ts" 20,66%
   - "registeredKeys.ts" 34,46%
   - "modelComboMappings.ts" 36,25%-on
   - "settings.ts" 46,40%
   - "webhooks.ts" 33,33%-on
6. `src/lib/usage`
   - "usageHistory.ts" 21,12%-on
   - "usageStats.ts" 9,56%
   - "costCalculator.ts" 30,00%
7. `src/lib/providers`
   - "validation.ts" 41,16%
8. Alacsony kockázatú segédprogram- és API-fájlok a korai nyereség érdekében
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - "src/app/api/settings/require-login/route.ts"
   - "src/app/api/providers/[id]/models/route.ts"## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Javítsa ki a lefedettségi mutatót, hogy az a forráskódot tükrözze tesztfájlok helyett
- [x] Összehasonlítás céljából őrizzen meg egy régebbi lefedettségi szkriptet
- [x] Rögzítse az alapvonalat és a hotspotokat a repóban
- [ ] Adjon hozzá fókuszált teszteket az alacsony kockázatú segédprogramokhoz:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Útvonaltesztek hozzáadása a következőhöz:
  - "src/app/api/settings/require-login/route.ts"
  - "src/app/api/providers/[id]/models/route.ts"### Phase 2: 60% -> 65%

- [ ] DB-alapú tesztek hozzáadása a következőkhöz:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] A fedőág viselkedése itt:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Használatelemzési tesztek hozzáadása a következőkhöz:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] A proxykezelési és beállítási ágak útvonallefedettségének bővítése### Phase 4: 70% -> 75%

- [ ] Borító fordítói segítők és központi fordítási útvonalak:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Kezelői szintű tesztek hozzáadása a következőkhöz:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Végrehajtó ág lefedettségének hozzáadása a szolgáltató-specifikus hitelesítéshez, újrapróbálkozásokhoz és végpont-felülírásokhoz### Phase 6: 80% -> 85%

- [ ] Egyesítsen több éles esetet a fő lefedettségi útvonalba
- [ ] A funkciólefedettség növelése gyenge konstruktor/segítő lefedettséggel rendelkező DB moduloknál
- [ ] Zárja be a `settings.ts`, `registeredKeys.ts`, `validation.ts- és fordítósegítők ágait### Phase 7: 85% -> 90%

- [ ] Treat the remaining low-coverage files as blockers
- [ ] Adjon hozzá regressziós teszteket minden, a leküldés során kijavított, feltárt gyártási hibához 90%-ra
- [ ] Csak akkor emelje meg a lefedettségi kaput a CI-ben, ha a helyi alapvonal legalább két egymást követő futtatásig stabil## Ratchet policy

Csak azután frissítse az „npm run test:coverage” küszöbértékeket, miután a projekt ténylegesen túllépi a következő mérföldkövet egy kényelmes pufferrel.

Javasolt racsnis sorrend:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

A sorrend: "utasítások-sorok / ágak / függvények".## Known gap

Az aktuális lefedettség parancs a fő csomóponti egységcsomagot méri, és tartalmazza az onnan elért forrást, beleértve az "open-sse"-t is. Egyelőre nem egyesíti a Vitest lefedettségét egyetlen egységes jelentésben. Ezt az egyesítést érdemes később megtenni, de nem blokkolja a 60% -> 80% emelkedés megkezdését.
