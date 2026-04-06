# OmniRoute Auto-Combo Engine (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Självförvaltande modellkedjor med adaptiv poängsättning## How It Works

Auto-Combo Engine väljer dynamiskt den bästa leverantören/modellen för varje begäran med hjälp av en**6-faktors poängfunktion**:

| Faktor     | Vikt | Beskrivning                                     |
| :--------- | :--- | :---------------------------------------------- | ------------- |
| Kvot       | 0,20 | Återstående kapacitet [0..1]                    |
| Hälsa      | 0,25 | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0,20 | Omvänd kostnad (billigare = högre poäng)        |
| LatencyInv | 0,15 | Omvänd p95-latens (snabbare = högre)            |
| TaskFit    | 0,10 | Modell × uppgiftstyp fitnesspoäng               |
| Stabilitet | 0,10 | Låg varians i latens/fel                        | ## Mode Packs |

| Packa                   | Fokus          | Nyckelvikt       |
| :---------------------- | :------------- | :--------------- | --------------- |
| 🚀**Skicka snabbt**     | Hastighet      | latencyInv: 0,35 |
| 💰**Kostnadsbesparing** | Ekonomi        | kostnadInv: 0,40 |
| 🎯**Kvalitet först**    | Bästa modellen | taskFit: 0,40    |
| 📡**Offlinevänlig**     | Tillgänglighet | kvot: 0,40       | ## Self-Healing |

-**Tillfällig uteslutning**: Poäng < 0,2 → utesluten i 5 min (progressiv backoff, max 30 min) -**Medvetenhet om strömbrytare**: ÖPPEN → automatiskt utesluten; HALF_OPEN → sökbegäranden -**Incidentläge**: >50 % ÖPPEN → inaktivera utforskning, maximera stabiliteten -**Cooldown-återställning**: Efter uteslutning är första begäran en "sond" med reducerad timeout## Bandit Exploration

5 % av förfrågningarna (konfigurerbara) dirigeras till slumpmässiga leverantörer för utforskning. Inaktiverad i incidentläge.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Över 30 modeller fick poäng för 6 uppgiftstyper ('kodning', 'granskning', 'planering', 'analys', 'felsökning', 'dokumentation'). Stöder jokerteckenmönster (t.ex. `*-coder` → hög kodningspoäng).## Files

| Arkiv                                        | Syfte                             |
| :------------------------------------------- | :-------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Poängfunktion & poolnormalisering |
| `open-sse/services/autoCombo/taskFitness.ts` | Modell × uppgift fitness lookup   |
| `open-sse/services/autoCombo/engine.ts`      | Urvalslogik, bandit, budgettak    |
| `open-sse/services/autoCombo/selfHealing.ts` | Uteslutning, sonder, incidentläge |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 viktprofiler                    |
| `src/app/api/combos/auto/route.ts`           | REST API                          |
