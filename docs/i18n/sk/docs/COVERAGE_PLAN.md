# Test Coverage Plan (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Posledná aktualizácia: 28.03.2026## Baseline

Existuje viacero čísel pokrytia v závislosti od spôsobu výpočtu správy. Na plánovanie je užitočný iba jeden z nich.

| Metrické          | Rozsah                                            | Výpisy / Riadky | Pobočky | Funkcie | Poznámky                                                  |
| ----------------- | ------------------------------------------------- | --------------: | ------: | ------: | --------------------------------------------------------- |
| Legacy            | Starý `npm run test:coverage`                     |         79,42 % | 75,15 % | 67,94 % | Nafúknuté: počíta testovacie súbory a vylučuje `open-sse` |
| Diagnostické      | Iba zdroj, okrem testov a okrem "open-sse"        |         68,16 % | 63,55 % | 64,06 % | Užitočné len na izoláciu `src/**`                         |
| Odporúčaný základ | Iba zdroj, s výnimkou testov a vrátane "open-sse" |         56,95 % | 66,05 % | 57,80 % | Toto je základ celého projektu, ktorý treba zlepšiť       |

Odporúčaný základ je počet, podľa ktorého sa má optimalizovať.## Rules

- Ciele pokrytia sa vzťahujú na zdrojové súbory, nie na `tests/**`.
- „open-sse/\*\*“ je súčasťou produktu a musí zostať v rozsahu.
- Nový kód by nemal znižovať pokrytie v dotknutých oblastiach.
- Uprednostňujte testovacie správanie a výsledky vetvy pred detailmi implementácie.
- Pre `src/lib/db/**` uprednostňujte dočasné databázy SQLite a malé príslušenstvo pred širokými modelmi.## Current command set

- `npm run test:coverage`
  - Brána pokrytia hlavného zdroja pre jednotku testovania
    – Generuje „text-summary“, „html“, „json-summary“ a „lcov“
- `Pokrytie chodu npm:správa`
  - Podrobná správa po jednotlivých súboroch z posledného spustenia
- `npm run test:coverage:legacy`
  - Len historické porovnanie## Milestones

| Fáza   |                   Cieľ | Zameranie                                                |
| ------ | ---------------------: | -------------------------------------------------------- |
| Fáza 1 | 60 % výpisov / riadkov | Rýchle výhry a pokrytie nástrojmi s nízkym rizikom       |
| Fáza 2 | 65 % výpisov / riadkov | DB a základy trasy                                       |
| Fáza 3 | 70 % výpisov / riadkov | Analýza overenia a používania poskytovateľa              |
| Fáza 4 | 75 % výpisov / riadkov | `open-sse` prekladatelia a pomocníci                     |
| Fáza 5 | 80 % výpisov / riadkov | `open-sse` správcovia a pobočky vykonávateľov            |
| Fáza 6 | 85 % výpisov / riadkov | Prípady tvrdšieho okraja, pobočkový dlh, regresné balíky |
| Fáza 7 | 90 % výpisov / riadkov | Konečné zametanie, uzavretie medzery, prísna račňa       |

Vetvy a funkcie by sa mali s každou fázou pohybovať smerom nahor, ale primárnym pevným cieľom sú príkazy / riadky.## Priority hotspots

Tieto súbory alebo oblasti ponúkajú najlepšiu návratnosť pre ďalšie fázy:

1. „open-sse/handlers“.
   - `chatCore.ts` na 7,57 %
   - Celkový adresár na 29,07 %
2. „open-sse/translator/request“.
   - Celkový adresár na 36,39 %
   - Mnoho prekladateľov je stále blízko jednociferného pokrytia
3. „open-sse/translator/response“.
   - Celkový adresár na 8,07 %
4. "open-sse/exekútori".
   - Celkový adresár na 36,62 %
5. `src/lib/db`
   - `models.ts` na 20,66 %
   - `registeredKeys.ts` na 34,46 %
   - `modelComboMappings.ts` na 36,25 %
   - `settings.ts` na 46,40 %
   - `webhooks.ts` na 33,33 %
6. „src/lib/usage“.
   - `usageHistory.ts` na 21,12 %
   - `usageStats.ts` na úrovni 9,56 %
   - `costCalculator.ts` pri 30,00 %
7. `src/lib/providers`
   - `validation.ts` na 41,16 %
8. Nízkorizikový nástroj a súbory API pre skoré zisky
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Opravte metriku pokrytia, aby odrážala zdrojový kód namiesto testovacích súborov
- [x] Ponechajte si starý skript pokrytia na porovnanie
- [x] Zaznamenajte základnú líniu a aktívne body in-repo
- [ ] Pridajte cielené testy pre pomocné programy s nízkym rizikom:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Pridať testy trasy pre:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Pridať testy podporované DB pre:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Správanie pobočky v:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Pridajte testy analýzy používania pre:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Rozšírte pokrytie trasy pre vetvy správy proxy a nastavení### Phase 4: 70% -> 75%

- [ ] Pokryť pomocníkov prekladateľa a centrálne cesty prekladu:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Pridať testy na úrovni obsluhy pre:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Pridajte pokrytie pobočky vykonávateľa pre overenie, opakované pokusy a prepísania koncového bodu špecifické pre poskytovateľa### Phase 6: 80% -> 85%

- [ ] Zlúčiť viac sád okrajových prípadov do hlavnej cesty pokrytia
- [ ] Zvýšte pokrytie funkcií pre moduly DB so slabým pokrytím konštruktora/pomocníka
- [ ] Zatvorte medzery medzi vetvami v súboroch `settings.ts`, `registeredKeys.ts`, `validation.ts` a pomocníkoch prekladača### Phase 7: 85% -> 90%

- [ ] Zostávajúce súbory s nízkym pokrytím považovať za blokátory
- [ ] Pridajte regresné testy pre každú odhalenú produkčnú chybu opravenú počas tlače na 90 %
- [ ] Zvýšte bránu pokrytia v CI až po tom, čo bude lokálna základná línia stabilná aspoň počas dvoch po sebe nasledujúcich cyklov## Ratchet policy

Aktualizujte prahové hodnoty `npm run test:coverage` až potom, čo projekt skutočne prekročí ďalší míľnik s pohodlnou vyrovnávacou pamäťou.

Odporúčané poradie račne:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Poradie je „riadky príkazov / pobočky / funkcie“.## Known gap

Príkaz aktuálneho pokrytia meria hlavnú súpravu jednotiek uzla a zahŕňa zdroj dosiahnutý z nej, vrátane „open-sse“. Zatiaľ nezlučuje pokrytie Vitestu do jednej jednotnej správy. Toto zlúčenie sa oplatí urobiť neskôr, ale nie je to prekážka na začatie stúpania 60% -> 80%.
