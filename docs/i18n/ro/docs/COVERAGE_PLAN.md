# Test Coverage Plan (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Ultima actualizare: 28-03-2026## Baseline

Există mai multe numere de acoperire, în funcție de modul în care este calculat raportul. Pentru planificare, doar unul dintre ele este util.

| Metric                         | Domeniul de aplicare                                   | Declarații / Rânduri | Ramuri | Funcții | Note                                                                         |
| ------------------------------ | ------------------------------------------------------ | -------------------: | -----: | ------: | ---------------------------------------------------------------------------- |
| Moștenire                      | Vechiul `npm run test:coverage`                        |               79,42% | 75,15% |  67,94% | Umflat: numără fișierele de testare și exclude `open-sse`                    |
| Diagnostic                     | Numai sursă, excluzând testele și excluzând „open-sse” |               68,16% | 63,55% |  64,06% | Util doar pentru a izola `src/**`                                            |
| Linia de referință recomandată | Numai sursă, excluzând testele și inclusiv „open-sse”  |               56,95% | 66,05% |  57,80% | Aceasta este linia de referință la nivelul întregului proiect de îmbunătățit |

Linia de referință recomandată este numărul față de care trebuie optimizat.## Rules

- Țintele de acoperire se aplică fișierelor sursă, nu „testelor/\*\*”.
- `open-sse/**` face parte din produs și trebuie să rămână în domeniu.
- Noul cod nu ar trebui să reducă acoperirea în zonele atinse.
- Preferați comportamentul de testare și rezultatele ramurilor față de detaliile de implementare.
- Preferați bazele de date SQLite temporare și dispozitivele mici în detrimentul macurilor ample pentru `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Poarta de acoperire a sursei principale pentru suita de teste unitare
  - generează `text-summary`, `html`, `json-summary` și `lcov`
- `npm run coverage:report`
  - Raport detaliat fișier cu fișier de la ultima rulare
- `npm run test:coverage:legacy`
  - Doar comparație istorică## Milestones

| Faza   |                    Țintă | Focus                                                                |
| ------ | -----------------------: | -------------------------------------------------------------------- |
| Faza 1 | 60% declarații / rânduri | Câștigări rapide și acoperire cu utilități cu risc scăzut            |
| Faza 2 | 65% declarații / rânduri | DB și fundații de traseu                                             |
| Faza 3 | 70% declarații / rânduri | Validarea furnizorului și analiza utilizării                         |
| Faza 4 | 75% declarații / rânduri | traducători și ajutoare `open-sse`                                   |
| Faza 5 | 80% declarații / rânduri | manipulatorii `open-sse` si filialele executorii                     |
| Faza 6 | 85% declarații / rânduri | Cazuri de margine mai dificile, datorie sucursală, suite de regresie |
| Faza 7 | 90% declarații / rânduri | Mătura finală, închiderea golului, clichet strict                    |

Ramurile și funcțiile ar trebui să crească în sus cu fiecare fază, dar obiectivul principal principal este declarațiile / liniile.## Priority hotspots

Aceste fișiere sau zone oferă cea mai bună rentabilitate pentru următoarele faze:

1. `open-sse/handlers`
   - `chatCore.ts` la 7,57%
   - Director general la 29,07%
2. `open-sse/translator/request`
   - Director general la 36,39%
   - Mulți traducători sunt încă aproape de acoperire cu o singură cifră
3. `open-sse/translator/response`
   - Director general la 8,07%
4. `open-sse/executors`
   - Director general la 36,62%
5. `src/lib/db`
   - `models.ts` la 20,66%
   - `registeredKeys.ts` la 34,46%
   - `modelComboMappings.ts` la 36,25%
   - `settings.ts` la 46,40%
   - `webhooks.ts` la 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` la 21,12%
   - `usageStats.ts` la 9,56%
   - `costCalculator.ts` la 30.00%
7. `src/lib/providers`
   - `validation.ts` la 41,16%
8. Utilitare cu risc scăzut și fișiere API pentru câștiguri timpurii
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Remediați valoarea de acoperire, astfel încât să reflecte codul sursă în loc de fișierele de testare
- [x] Păstrați un script de acoperire vechi pentru comparație
- [x] Înregistrați linia de bază și punctele fierbinți în repo
- [ ] Adăugați teste concentrate pentru utilități cu risc scăzut:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Adăugați teste de traseu pentru:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Adăugați teste susținute de DB pentru:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Acoperiți comportamentul ramurilor în:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Adăugați teste de analiză de utilizare pentru:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Extindeți acoperirea rutei pentru ramurile de management și setări proxy### Phase 4: 70% -> 75%

- [ ] Acoperiți ajutoarele pentru traducător și căile centrale de traducere:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Adăugați teste la nivel de handler pentru:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Adăugați acoperirea ramurilor executorului pentru autentificarea, reîncercări și suprascrieri ale punctelor finale specifice furnizorului### Phase 6: 80% -> 85%

- [ ] Îmbinați mai multe suite de tip edge-case în calea principală de acoperire
- [ ] Creșteți acoperirea funcției pentru modulele DB cu acoperire slabă pentru constructor/helper
- [ ] Închideți golurile din ramuri în `settings.ts`, `registeredKeys.ts`, `validation.ts` și ajutoarele pentru traducător### Phase 7: 85% -> 90%

- [ ] Tratați fișierele rămase cu acoperire redusă ca blocante
- [ ] Adăugați teste de regresie pentru fiecare eroare de producție descoperită remediată în timpul push-ului la 90%
- [ ] Ridicați poarta de acoperire în CI numai după ce linia de bază locală este stabilă pentru cel puțin două runde consecutive## Ratchet policy

Actualizați pragurile `npm run test:coverage` numai după ce proiectul depășește de fapt următoarea etapă cu un tampon confortabil.

Secvența de clichet recomandată:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ordinea este „instrucțiuni-linii/ramuri/funcții”.## Known gap

Comanda de acoperire curentă măsoară suita principală de unități Node și include sursa accesată din aceasta, inclusiv `open-sse`. Încă nu îmbină acoperirea Vitest într-un singur raport unificat. Merită făcută acea fuziune mai târziu, dar nu este un blocant pentru începerea urcării de 60% -> 80%.
