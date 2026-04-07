# OmniRoute Auto-Combo Engine (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Samořídící modelové řetězce s adaptivním bodováním## How It Works

Auto-Combo Engine dynamicky vybírá nejlepšího poskytovatele/model pro každý požadavek pomocí**6faktorové skórovací funkce**:

| Faktor     | Hmotnost | Popis                                           |
| :--------- | :------- | :---------------------------------------------- | ------------- |
| Kvóta      | 0,20     | Zbývající kapacita [0..1]                       |
| Zdraví     | 0,25     | Jistič: ZAVŘENO=1,0, POLOVINA=0,5, OTEVŘENO=0,0 |
| CostInv    | 0,20     | Inverzní náklady (levnější = vyšší skóre)       |
| LatencyInv | 0,15     | Inverzní latence p95 (rychlejší = vyšší)        |
| TaskFit    | 0,10     | Model × úkol typ skóre fitness                  |
| Stabilita  | 0,10     | Nízký rozptyl v latenci/chybách                 | ## Mode Packs |

| Balíček                       | Zaměření       | Hmotnost klíče   |
| :---------------------------- | :------------- | :--------------- | --------------- |
| 🚀**Rychlá dodávka**          | Rychlost       | latenceInv: 0,35 |
| 💰**Úspora nákladů**          | Ekonomika      | costInv: 0,40    |
| 🎯**Kvalita na prvním místě** | Nejlepší model | taskFit: 0,40    |
| 📡**Offline Friendly**        | Dostupnost     | kvóta: 0,40      | ## Self-Healing |

-**Dočasné vyloučení**: Skóre < 0,2 → vyloučeno na 5 minut (postupné stažení, max. 30 minut) -**Informace o jističi**: OPEN → auto-excluded; HALF_OPEN → požadavky na sondu -**Režim incidentu**: >50 % OTEVŘENO → zakázat průzkum, maximalizovat stabilitu -**Cooldown recovery**: Po vyloučení je prvním požadavkem "sonda" se zkráceným časovým limitem## Bandit Exploration

5 % požadavků (konfigurovatelných) je směrováno k náhodným poskytovatelům k prozkoumání. Deaktivováno v režimu incidentu.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Více než 30 modelů skórovalo v 6 typech úloh (`kódování`, `recenze`, `plánování`, `analýza`, `ladění`, `dokumentace`). Podporuje vzory zástupných znaků (např. `*-coder` → vysoké skóre kódování).## Files

| Soubor                                       | Účel                                     |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Funkce skórování a normalizace fondu     |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × hledání kondice úkolu            |
| `open-sse/services/autoCombo/engine.ts`      | Logika výběru, bandita, rozpočtový strop |
| `open-sse/services/autoCombo/selfHealing.ts` | Vyloučení, sondy, režim incidentu        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 hmotnostní profily                     |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
