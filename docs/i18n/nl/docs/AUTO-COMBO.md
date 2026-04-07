# OmniRoute Auto-Combo Engine (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Zelfsturende modelketens met adaptieve scoring## How It Works

De Auto-Combo Engine selecteert dynamisch de beste provider/model voor elk verzoek met behulp van een**6-factor scoringsfunctie**:

| Factor      | Gewicht | Beschrijving                                        |
| :---------- | :------ | :-------------------------------------------------- | ------------- |
| Quotum      | 0,20    | Resterende capaciteit [0..1]                        |
| Gezondheid  | 0,25    | Stroomonderbreker: GESLOTEN=1,0, HALF=0,5, OPEN=0,0 |
| KostenInv   | 0,20    | Inverse kosten (goedkoper = hogere score)           |
| LatencyInv  | 0,15    | Omgekeerde p95-latentie (sneller = hoger)           |
| TaskFit     | 0,10    | Model × taaktype fitnessscore                       |
| Stabiliteit | 0,10    | Lage variantie in latentie/fouten                   | ## Mode Packs |

| Pak                      | Focus           | Sleutelgewicht   |
| :----------------------- | :-------------- | :--------------- | --------------- |
| 🚀**Snel verzenden**     | Snelheid        | latencyInv: 0,35 |
| 💰**Kostenbesparing**    | Economie        | kostenInv: 0,40  |
| 🎯**Kwaliteit eerst**    | Beste model     | taakFit: 0.40    |
| 📡**Offlinevriendelijk** | Beschikbaarheid | quotum: 0,40     | ## Self-Healing |

-**Tijdelijke uitsluiting**: Score < 0,2 → uitgesloten voor 5 min (progressieve uitstel, max. 30 min) -**Bewustmaking stroomonderbreker**: OPEN → automatisch uitgesloten; HALF_OPEN → sondeverzoeken -**Incidentmodus**: >50% OPEN → verkenning uitschakelen, stabiliteit maximaliseren -**Cooldown-herstel**: na uitsluiting is het eerste verzoek een 'probe' met kortere time-out## Bandit Exploration

5% van de verzoeken (configureerbaar) wordt ter verkenning naar willekeurige providers doorgestuurd. Uitgeschakeld in incidentmodus.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Meer dan 30 modellen scoorden voor 6 taaktypen (`coderen`, `review`, `planning`, `analyse`, `debugging`, `documentatie`). Ondersteunt jokertekenpatronen (bijvoorbeeld `*-coder` → hoge coderingsscore).## Files

| Bestand                                      | Doel                                      |
| :------------------------------------------- | :---------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Scorefunctie en normalisatie van de poule |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × taakfitness opzoeken              |
| `open-sse/services/autoCombo/engine.ts`      | Selectielogica, bandiet, budgetlimiet     |
| `open-sse/services/autoCombo/selfHealing.ts` | Uitsluiting, sondes, incidentmodus        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 gewichtsprofielen                       |
| `src/app/api/combos/auto/route.ts`           | REST-API                                  |
