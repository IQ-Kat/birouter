# OmniRoute Auto-Combo Engine (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Selvstyrende modelkæder med adaptiv scoring## How It Works

Auto-Combo Engine udvælger dynamisk den bedste udbyder/model for hver anmodning ved hjælp af en**6-faktor scorefunktion**:

| Faktor     | Vægt | Beskrivelse                                    |
| :--------- | :--- | :--------------------------------------------- | ------------- |
| Kvote      | 0,20 | Resterende kapacitet [0..1]                    |
| Sundhed    | 0,25 | Strømafbryder: LUKKET=1,0, HALVT=0,5, ÅBEN=0,0 |
| CostInv    | 0,20 | Omvendt pris (billigere = højere score)        |
| LatencyInv | 0,15 | Invers p95 latens (hurtigere = højere)         |
| TaskFit    | 0,10 | Model × opgavetype fitnessscore                |
| Stabilitet | 0,10 | Lav varians i latenstid/fejl                   | ## Mode Packs |

| Pakke                | Fokus          | Nøglevægt        |
| :------------------- | :------------- | :--------------- | --------------- |
| 🚀**Send hurtigt**   | Hastighed      | latencyInv: 0,35 |
| 💰**Cost Saver**     | Økonomi        | prisInv: 0,40    |
| 🎯**Kvalitet først** | Bedste model   | opgaveFit: 0,40  |
| 📡**Offlinevenlig**  | Tilgængelighed | kvote: 0,40      | ## Self-Healing |

-**Midlertidig udelukkelse**: Score < 0,2 → ekskluderet i 5 min (progressiv backoff, max 30 min) -**Circuit breaker awareness**: ÅBEN → automatisk ekskluderet; HALF_OPEN → sondeanmodninger -**Hændelsestilstand**: >50 % ÅBEN → deaktiver udforskning, maksimer stabiliteten -**Cooldown recovery**: Efter ekskludering er første anmodning en "probe" med reduceret timeout## Bandit Exploration

5 % af anmodningerne (konfigurerbare) sendes til tilfældige udbydere til udforskning. Deaktiveret i hændelsestilstand.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ modeller scoret på tværs af 6 opgavetyper ('kodning', 'gennemgang', 'planlægning', 'analyse', 'fejlretning', 'dokumentation'). Understøtter jokertegnsmønstre (f.eks. `*-coder` → høj kodningsscore).## Files

| Fil                                          | Formål                                |
| :------------------------------------------- | :------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Scoringsfunktion & puljenormalisering |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × opgave fitnessopslag          |
| `open-sse/services/autoCombo/engine.ts`      | Udvælgelseslogik, bandit, budgetloft  |
| `open-sse/services/autoCombo/selfHealing.ts` | Eksklusion, sonder, hændelsestilstand |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 vægtprofiler                        |
| `src/app/api/combos/auto/route.ts`           | REST API                              |
