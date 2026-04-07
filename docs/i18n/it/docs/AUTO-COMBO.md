# OmniRoute Auto-Combo Engine (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Catene di modelli autogestiti con scoring adattivo## How It Works

Il motore Auto-Combo seleziona dinamicamente il miglior fornitore/modello per ciascuna richiesta utilizzando una**funzione di punteggio a 6 fattori**:

| Fattore    | Peso | Descrizione                                                |
| :--------- | :--- | :--------------------------------------------------------- | ------------- |
| Quota      | 0,20 | Capacità rimanente [0..1]                                  |
| Salute     | 0,25 | Interruttore automatico: CHIUSO=1.0, META'=0.5, APERTO=0.0 |
| InvCosto   | 0,20 | Costo inverso (più economico = punteggio più alto)         |
| LatenzaInv | 0,15 | Latenza p95 inversa (più veloce = più alta)                |
| TaskFit    | 0,10 | Modello × punteggio di fitness del tipo di attività        |
| Stabilità  | 0,10 | Bassa varianza di latenza/errori                           | ## Mode Packs |

| Confezione                      | Messa a fuoco   | Peso chiave      |
| :------------------------------ | :-------------- | :--------------- | --------------- |
| 🚀**Spedisci velocemente**      | Velocità        | latenzaInv: 0,35 |
| 💰**Risparmio sui costi**       | Economia        | costoInv: 0,40   |
| 🎯**La qualità prima di tutto** | Miglior modello | taskFit: 0,40    |
| 📡**Amichevole offline**        | Disponibilità   | quota: 0,40      | ## Self-Healing |

-**Esclusione temporanea**: Punteggio < 0,2 → escluso per 5 min (backoff progressivo, max 30 min) -**Consapevolezza interruttore**: APERTO → autoescluso; HALF_OPEN → richieste sonda -**Modalità incidente**: >50% APERTO → disabilita l'esplorazione, massimizza la stabilità -**Recupero cooldown**: dopo l'esclusione, la prima richiesta è una "sonda" con timeout ridotto## Bandit Exploration

Il 5% delle richieste (configurabili) viene instradato a provider casuali per l'esplorazione. Disabilitato in modalità incidente.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ models scored across 6 task types (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supports wildcard patterns (e.g., `*-coder` → high coding score).

## Files

| File                                         | Scopo                                            |
| :------------------------------------------- | :----------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Funzione di punteggio e normalizzazione del pool |
| `open-sse/services/autoCombo/taskFitness.ts` | Ricerca modello × attività fitness               |
| `open-sse/services/autoCombo/engine.ts`      | Logica di selezione, bandito, limite di budget   |
| `open-sse/services/autoCombo/selfHealing.ts` | Esclusione, sonde, modalità incidente            |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profili di peso                                |
| `src/app/api/combos/auto/route.ts`           | API REST                                         |
