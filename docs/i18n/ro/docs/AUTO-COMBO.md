# OmniRoute Auto-Combo Engine (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Lanțuri de modele cu autogestionare cu punctaj adaptiv## How It Works

Motorul Auto-Combo selectează în mod dinamic cel mai bun furnizor/model pentru fiecare solicitare folosind o**funcție de punctare cu 6 factori**:

| Factorul    | Greutate | Descriere                                           |
| :---------- | :------- | :-------------------------------------------------- | ------------- |
| Cota        | 0,20     | Capacitate rămasă [0..1]                            |
| Sănătate    | 0,25     | Întrerupător: ÎNCHIS=1,0, JUMĂTATE=0,5, DESCHIS=0,0 |
| CostInv     | 0,20     | Cost invers (mai ieftin = scor mai mare)            |
| LatencyInv  | 0,15     | Latența p95 inversă (mai rapid = mai mare)          |
| TaskFit     | 0,10     | Model × tip de sarcină scor de fitness              |
| Stabilitate | 0,10     | Variație scăzută a latenței/erorilor                | ## Mode Packs |

| Pachet                        | Focus             | Greutatea cheii  |
| :---------------------------- | :---------------- | :--------------- | --------------- |
| 🚀**Expediere rapid**         | Viteza            | latencyInv: 0,35 |
| 💰**Cost Saver**              | Economie          | costInv: 0,40    |
| 🎯**Calitatea pe primul loc** | Cel mai bun model | taskFit: 0,40    |
| 📡**Offline Friendly**        | Disponibilitate   | cota: 0,40       | ## Self-Healing |

-**Excludere temporară**: scor < 0,2 → exclus timp de 5 minute (retragere progresivă, max 30 de minute) -**Conștientizarea întreruptorului de circuit**: DESCHIS → exclus automat; HALF_OPEN → solicitări de sondă -**Mod incident**: >50% DESCHIS → dezactivează explorarea, maximizează stabilitatea -**Recuperare în perioada de răcire**: după excludere, prima solicitare este o „sondă” cu timeout redus## Bandit Exploration

5% dintre cereri (configurabile) sunt direcționate către furnizori aleatori pentru explorare. Dezactivat în modul incident.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Peste 30 de modele obținute în 6 tipuri de sarcini (`codare`, `revizuire`, `planificare`, `analiza`, `depanare`, `documentație`). Acceptă modele de metacaractere (de exemplu, `*-coder` → scor de codare ridicat).## Files

| Fișier                                       | Scop                                       |
| :------------------------------------------- | :----------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Funcția de scor și normalizarea pool-ului  |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × sarcină căutare fitness            |
| `open-sse/services/autoCombo/engine.ts`      | Logica de selecție, bandit, plafon bugetar |
| `open-sse/services/autoCombo/selfHealing.ts` | Excluderea, sondele, modul incident        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profile de greutate                      |
| `src/app/api/combos/auto/route.ts`           | REST API                                   |
