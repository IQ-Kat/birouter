# OmniRoute Auto-Combo Engine (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Samoriadiace modelové reťazce s adaptívnym bodovaním## How It Works

Auto-Combo Engine dynamicky vyberá najlepšieho poskytovateľa/model pre každú požiadavku pomocou**6-faktorovej funkcie hodnotenia**:

| Faktor     | Hmotnosť | Popis                                            |
| :--------- | :------- | :----------------------------------------------- | ------------- |
| Kvóta      | 0,20     | Zostávajúca kapacita [0..1]                      |
| Zdravie    | 0,25     | Istič: ZATVORENÉ=1,0, POLOVICE=0,5, OTVORENÉ=0,0 |
| CostInv    | 0,20     | Inverzné náklady (lacnejšie = vyššie skóre)      |
| LatencyInv | 0,15     | Inverzná latencia p95 (rýchlejšia = vyššia)      |
| TaskFit    | 0,10     | Model × skóre kondície typu úlohy                |
| Stabilita  | 0,10     | Nízky rozptyl v latencii/chybách                 | ## Mode Packs |

| Balenie                       | Zameranie      | Hmotnosť kľúča   |
| :---------------------------- | :------------- | :--------------- | --------------- |
| 🚀**Rýchle dodanie**          | Rýchlosť       | latencyInv: 0,35 |
| 💰**Úspora nákladov**         | Ekonomika      | costInv: 0,40    |
| 🎯**Kvalita na prvom mieste** | Najlepší model | taskFit: 0,40    |
| 📡**Priateľský offline**      | Dostupnosť     | kvóta: 0,40      | ## Self-Healing |

-**Dočasné vylúčenie**: Skóre < 0,2 → vylúčenie na 5 minút (progresívne vylúčenie, max. 30 minút) -**Upozornenie na istič**: OTVORENÉ → automatické vylúčenie; HALF_OPEN → požiadavky na sondu -**Režim incidentu**: >50 % OTVORENÉ → zakázať prieskum, maximalizovať stabilitu -**Cooldown recovery**: Po vylúčení je prvou požiadavkou „sonda“ so skráteným časovým limitom## Bandit Exploration

5 % žiadostí (konfigurovateľných) je smerovaných k náhodným poskytovateľom na preskúmanie. Vypnuté v režime incidentov.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Viac ako 30 modelov zaznamenalo skóre v 6 typoch úloh (kódovanie, revízia, plánovanie, analýza, ladenie, dokumentácia). Podporuje vzory zástupných znakov (napr. `*-coder` → vysoké skóre kódovania).## Files

| Súbor                                        | Účel                                     |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Funkcia skórovania a normalizácia fondu  |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × hľadanie kondície úlohy          |
| `open-sse/services/autoCombo/engine.ts`      | Logika výberu, bandita, rozpočtový strop |
| `open-sse/services/autoCombo/selfHealing.ts` | Vylúčenie, sondy, režim incidentu        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 hmotnostné profily                     |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
