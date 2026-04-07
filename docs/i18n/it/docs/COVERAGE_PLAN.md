# Test Coverage Plan (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Ultimo aggiornamento: 28-03-2026## Baseline

There are multiple coverage numbers depending on how the report is computed. Per la pianificazione, solo uno di essi è utile.

| Metric                          | Scope                                              | Statements / Lines | Branches | Functions | Note                                                       |
| ------------------------------- | -------------------------------------------------- | -----------------: | -------: | --------: | ---------------------------------------------------------- |
| Eredità                         | Vecchio `npm run test:coverage`                    |             79,42% |   75.15% |    67.94% | Inflazionato: conta i file di test ed esclude `open-sse`   |
| Diagnostica                     | Solo sorgente, esclusi test ed escluso `open-sse`  |             68,16% |   63.55% |    64,06% | Utile solo per isolare `src/**`                            |
| Base di riferimento consigliata | Solo sorgente, esclusi i test e incluso `open-sse` |             56.95% |   66,05% |    57,80% | Questa è la linea di base per migliorare l'intero progetto |

La linea di base consigliata è il numero rispetto al quale eseguire l'ottimizzazione.## Rules

- Gli obiettivi di copertura si applicano ai file sorgente, non a "test/\*\*".
- "open-sse/\*\*" fa parte del prodotto e deve rimanere nell'ambito.
- Il nuovo codice non dovrebbe ridurre la copertura nelle aree toccate.
- Preferire il comportamento dei test e i risultati delle filiali rispetto ai dettagli di implementazione.
- Preferisci i database temporanei SQLite e i piccoli dispositivi rispetto ai mock generici per `src/lib/db/**`.## Current command set

- "npm esegui test: copertura".
  - Gate di copertura della sorgente principale per la suite di test unitari
  - Genera `text-summary`, `html`, `json-summary` e `lcov`
- "npm run cover:report".
  - Report dettagliato file per file dell'ultima esecuzione
- `npm esegui test:coverage:legacy`
  - Solo confronto storico## Milestones

| Fase   |              Obiettivo | Messa a fuoco                                                         |
| ------ | ---------------------: | --------------------------------------------------------------------- |
| Fase 1 | 60% affermazioni/righe | Vittorie rapide e copertura delle utenze a basso rischio              |
| Fase 2 | 65% affermazioni/righe | DB e fondazioni del percorso                                          |
| Fase 3 | 70% affermazioni/righe | Convalida del provider e analisi dell'utilizzo                        |
| Fase 4 | 75% affermazioni/righe | Traduttori e aiutanti `open-sse`                                      |
| Fase 5 | 80% affermazioni/righe | Gestori `open-sse` e ​​rami esecutori                                 |
| Fase 6 | 85% affermazioni/righe | Casi limite più difficili, debito delle filiali, suite di regressione |
| Fase 7 | 90% affermazioni/righe | Spazzata finale, chiusura dello spazio, cricchetto rigoroso           |

I rami e le funzioni dovrebbero aumentare in ogni fase, ma l'obiettivo primario principale sono le istruzioni/linee.## Priority hotspots

Questi file o aree offrono il miglior ritorno per le fasi successive:

1. "open-sse/handlers".
   - "chatCore.ts" al 7,57%
   - Directory complessiva al 29,07%
2. "open-sse/traduttore/richiesta".
   - Directory complessiva al 36,39%
   - Molti traduttori sono ancora vicini alla copertura a una cifra
3. "open-sse/translator/response".
   - Directory complessiva all'8,07%
4. "open-sse/esecutori".
   - Directory complessiva al 36,62%
5. `src/lib/db`
   - "models.ts" al 20,66%
   - "registeredKeys.ts" al 34,46%
   - `modelComboMappings.ts` al 36,25%
   - "settings.ts" al 46,40%
   - "webhooks.ts" al 33,33%
6. `src/lib/utilizzo`
   - "usageHistory.ts" al 21,12%
   - "usageStats.ts" al 9,56%
   - `costCalculator.ts` al 30,00%
7. `src/lib/provider`
   - "validation.ts" al 41,16%
8. Utilità a basso rischio e file API per guadagni iniziali
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Corretta la metrica di copertura in modo che rifletta il codice sorgente anziché i file di test
- [x] Conserva uno script di copertura legacy per il confronto
- [x] Registra la linea di base e gli hotspot nel repository
- [ ] Aggiungere test mirati per le utenze a basso rischio:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Aggiungi test di percorso per:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [] Aggiungi test supportati da DB per:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [] Copri il comportamento del ramo in:
  - `src/lib/provviders/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [] Aggiungi test di analisi dell'utilizzo per:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Espande la copertura del percorso per la gestione dei proxy e i rami delle impostazioni### Phase 4: 70% -> 75%

- [ ] Coprire gli assistenti dei traduttori e i percorsi di traduzione centrali:
  - "open-sse/translator/index.ts".
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [] Aggiungi test a livello di gestore per:
  - "open-sse/handlers/chatCore.ts".
  - "open-sse/handlers/responsesHandler.js".
  - "open-sse/handlers/imageGeneration.js".
  - "open-sse/handlers/embeddings.js".
- [ ] Aggiungere la copertura del ramo dell'esecutore per l'autenticazione, i nuovi tentativi e le sostituzioni degli endpoint specifici del provider### Phase 6: 80% -> 85%

- [ ] Merge more edge-case suites into the main coverage path
- [ ] Increase function coverage for DB modules with weak constructor/helper coverage
- [ ] Close branch gaps in `settings.ts`, `registeredKeys.ts`, `validation.ts`, and translator helpers

### Phase 7: 85% -> 90%

- [ ] Tratta i restanti file a bassa copertura come bloccanti
- [] Aggiunti test di regressione per ogni bug di produzione scoperto corretto durante il passaggio al 90%
- [ ] Alzare il cancello di copertura in CI solo dopo che la linea di base locale è stabile per almeno due esecuzioni consecutive## Ratchet policy

Aggiorna le soglie di `npm run test:coverage` solo dopo che il progetto ha effettivamente superato il prossimo traguardo con un buffer confortevole.

Sequenza di cricchetti consigliata:

1.55/60/55
2.60/62/58
3.65/64/62
4.70/66/66
5.75/70/72
6.80/75/78
7.85/80/84
8.90/85/88

L'ordine è "istruzioni-righe/rami/funzioni".## Known gap

L'attuale comando di copertura misura la suite di unità del nodo principale e include la sorgente raggiunta da essa, incluso "open-sse". Non unisce ancora la copertura Vitest in un unico report unificato. Vale la pena fare questa fusione in seguito, ma non è un ostacolo per iniziare la salita del 60% -> 80%.
