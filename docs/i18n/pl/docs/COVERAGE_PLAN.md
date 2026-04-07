# Test Coverage Plan (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Ostatnia aktualizacja: 28.03.2026## Baseline

Istnieje wiele numerów ubezpieczenia w zależności od sposobu obliczania raportu. Do planowania przydatny jest tylko jeden z nich.

| Metryczne               | Zakres                                                        | Wyciągi / Linie | Oddziały | Funkcje | Notatki                                                              |
| ----------------------- | ------------------------------------------------------------- | --------------: | -------: | ------: | -------------------------------------------------------------------- |
| Dziedzictwo             | Stary `test uruchomienia npm: pokrycie`                       |          79,42% |   75,15% |  67,94% | Zawyżone: zlicza pliki testowe i wyklucza `open-sse`                 |
| Diagnostyczny           | Tylko źródło, z wyłączeniem testów i z wyłączeniem `open-sse` |          68,16% |   63,55% |  64,06% | Przydatne tylko do izolowania `src/**`                               |
| Zalecana wartość bazowa | Tylko źródło, z wyłączeniem testów i łącznie z `open-sse`     |          56,95% |   66,05% |  57,80% | Jest to punkt odniesienia dla całego projektu, który należy ulepszyć |

Zalecana wartość bazowa to liczba, względem której należy przeprowadzić optymalizację.## Rules

- Docelowy zasięg dotyczy plików źródłowych, a nie `testów/**`.
- `open-sse/**` jest częścią produktu i musi pozostać objętym zakresem.
- Nowy kod nie powinien zmniejszać zasięgu w dotkniętych obszarach.
- Preferuj testowanie zachowań i wyników gałęzi nad szczegółami implementacji.
- Preferuj tymczasowe bazy danych SQLite i małe urządzenia zamiast ogólnych prób dla `src/lib/db/**`.## Current command set

- `npm run test: zasięg`
  - Główna bramka pokrycia źródła dla zestawu testów jednostkowych
  - Generuje `podsumowanie tekstu`, `html`, `podsumowanie json` i `lcov`
- `npm run report:raport`
  - Szczegółowy raport plik po pliku z ostatniego uruchomienia
- `npm run test:coverage:legacy`
  - Tylko porównanie historyczne## Milestones

| Faza   |                    Cel | Skup się                                                       |
| ------ | ---------------------: | -------------------------------------------------------------- |
| Faza 1 | 60% wypowiedzi / linii | Szybkie zwycięstwa i ubezpieczenie mediów o niskim ryzyku      |
| Faza 2 | 65% wypowiedzi / linii | Fundamenty DB i trasy                                          |
| Faza 3 | 70% wypowiedzi / linii | Weryfikacja dostawcy i analiza użytkowania                     |
| Faza 4 | 75% stwierdzeń / linii | Tłumacze i pomocnicy `open-sse`                                |
| Faza 5 | 80% stwierdzeń / linii | procedury obsługi i gałęzie wykonawców `open-sse`              |
| Faza 6 | 85% stwierdzeń / linii | Trudniejsze przypadki, zadłużenie oddziału, pakiety regresyjne |
| Faza 7 | 90% stwierdzeń / linii | Końcowe przeciągnięcie, zamknięcie szczeliny, ścisła zapadka   |

Gałęzie i funkcje powinny rosnąć w górę w każdej fazie, ale głównym twardym celem są instrukcje/linie.## Priority hotspots

Te pliki lub obszary zapewniają najlepszy zwrot w kolejnych fazach:

1. `open-sse/handler'
   - `chatCore.ts` na 7,57%
   - Ogólny katalog na poziomie 29,07%
2. `open-sse/tłumacz/żądanie`
   - Ogólny katalog na poziomie 36,39%
   - Wielu tłumaczy nadal osiąga niemal jednocyfrowy zasięg
3. „open-sse/tłumacz/odpowiedź”.
   - Ogólny katalog na poziomie 8,07%
4. `open-sse/executory`
   - Ogólny katalog na poziomie 36,62%
5. `src/lib/db`
   - `models.ts` na poziomie 20,66%
   - `registeredKeys.ts` na poziomie 34,46%
   - `modelComboMappings.ts` na 36,25%
   - `ustawienia.ts` na 46,40%
   - `webhooks.ts` na poziomie 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` na 21,12%
   - `usageStats.ts` na 9,56%
   - `costCalculator.ts` na 30,00%
7. `src/lib/providers`
   - `validation.ts` na poziomie 41,16%
8. Narzędzia niskiego ryzyka i pliki API umożliwiające szybkie zyski
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Napraw metrykę pokrycia, aby odzwierciedlała kod źródłowy zamiast plików testowych
- [x] Zachowaj starszy skrypt zasięgu dla porównania
- [x] Zapisz linię bazową i punkty aktywne w repozytorium
- [ ] Dodaj ukierunkowane testy dla mediów niskiego ryzyka:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Dodaj testy tras dla:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Dodaj testy wspierane przez DB dla:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Cover branch behavior in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/modations/route.ts`### Phase 3: 65% -> 70%

- [ ] Dodaj testy analizy użytkowania dla:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Rozszerz zasięg tras dla gałęzi zarządzania proxy i ustawień### Phase 4: 70% -> 75%

- [ ] Pomocnicy tłumaczy i centralne ścieżki tłumaczeń:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/tłumacz/odpowiedź/*`### Phase 5: 75% -> 80%

- [ ] Dodaj testy na poziomie obsługi dla:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Dodaj pokrycie gałęzi wykonawcy dla uwierzytelniania specyficznego dla dostawcy, ponownych prób i przesłonięć punktów końcowych### Phase 6: 80% -> 85%

- [ ] Połącz więcej zestawów przypadków brzegowych w główną ścieżkę zasięgu
- [ ] Zwiększa zasięg funkcji dla modułów DB ze słabym pokryciem konstruktora/pomocnika
- [ ] Zamknij luki w gałęziach w `settings.ts`, `registeredKeys.ts`, `validation.ts` i pomocnikach tłumacza### Phase 7: 85% -> 90%

- [ ] Traktuj pozostałe pliki o niskim pokryciu jako blokery
- [ ] Dodaj testy regresyjne dla każdego wykrytego błędu produkcyjnego, naprawionego podczas push do 90%
- [ ] Podnieś bramkę pokrycia w CI tylko wtedy, gdy lokalna linia bazowa będzie stabilna przez co najmniej dwa kolejne przebiegi## Ratchet policy

Aktualizuj progi `npm run test:coverage` dopiero wtedy, gdy projekt faktycznie przekroczy kolejny kamień milowy z wygodnym buforem.

Zalecana kolejność grzechotek:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Kolejność to „linie instrukcji / gałęzie / funkcje”.## Known gap

Bieżące polecenie pokrycia mierzy główny zestaw jednostek Węzła i obejmuje osiągnięte z niego źródła, w tym `open-sse`. Nie łączy jeszcze zasięgu Vitest w jeden ujednolicony raport. To połączenie warto zrobić później, ale nie blokuje to rozpoczęcia wspinaczki 60% -> 80%.
