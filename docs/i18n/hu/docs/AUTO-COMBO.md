# OmniRoute Auto-Combo Engine (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Önmenedzselő modellláncok adaptív pontozással## How It Works

Az Auto-Combo Engine dinamikusan választja ki a legjobb szolgáltatót/modellt minden egyes kéréshez egy**6-faktoros pontozási funkcióval**:

| Tényező    | Súly | Leírás                                       |
| :--------- | :--- | :------------------------------------------- | ------------- |
| Kvóta      | 0,20 | Fennmaradó kapacitás [0..1]                  |
| Egészség   | 0,25 | Megszakító: ZÁRVA=1,0, FÉL=0,5, NYITVA=0,0   |
| CostInv    | 0,20 | Inverz költség (olcsóbb = magasabb pontszám) |
| LatencyInv | 0,15 | Inverz p95 késleltetés (gyorsabb = magasabb) |
| TaskFit    | 0,10 | Modell × feladattípus alkalmassági pontszám  |
| Stabilitás | 0,10 | Alacsony eltérés a késleltetésben/hibákban   | ## Mode Packs |

| Csomag                | Fókusz         | Kulcs súlya      |
| :-------------------- | :------------- | :--------------- | --------------- |
| 🚀**Gyors szállítás** | Sebesség       | latencyInv: 0,35 |
| 💰**Költségkímélő**   | Gazdaság       | költségInv: 0,40 |
| 🎯**Első a minőség**  | Legjobb modell | taskFit: 0,40    |
| 📡**Offline barát**   | Elérhetőség    | kvóta: 0,40      | ## Self-Healing |

-**Ideiglenes kizárás**: Pontszám < 0,2 → kizárva 5 percig (progresszív visszalépés, max. 30 perc) -**Megszakító tudatosság**: NYITÁS → automatikus kizárás; HALF_OPEN → vizsgálati kérések -**Incidens mód**: >50% NYITVA → tiltsa le a felfedezést, maximalizálja a stabilitást -**Cooldown helyreállítás**: A kizárást követően az első kérés egy „próba”, csökkentett időtúllépéssel## Bandit Exploration

A kérelmek (konfigurálható) 5%-a véletlenszerű szolgáltatókhoz kerül felfedezésre. Incidens módban letiltva.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Több mint 30 modell értékelt 6 feladattípusban ("kódolás", "áttekintés", "tervezés", "elemzés", "hibakeresés", "dokumentáció"). Támogatja a helyettesítő karaktermintákat (pl. "\*-coder" → magas kódolási pontszám).## Files

| Fájl                                         | Cél                                               |
| :------------------------------------------- | :------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Pontozási függvény és a készlet normalizálása     |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × task fitness lookup                       |
| `open-sse/services/autoCombo/engine.ts`      | Kiválasztási logika, bandita, költségvetési sapka |
| `open-sse/services/autoCombo/selfHealing.ts` | Kizárás, szondák, incidens mód                    |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 súlyprofil                                      |
| `src/app/api/combos/auto/route.ts`           | REST API                                          |
