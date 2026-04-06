# OmniRoute Auto-Combo Engine (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Itseohjautuvat malliketjut mukautuvalla pisteytyksellä## How It Works

Auto-Combo Engine valitsee dynaamisesti parhaan palveluntarjoajan/mallin kullekin pyynnölle käyttämällä**6-faktorista pisteytystoimintoa**:

| tekijä     | Paino | Kuvaus                                                    |
| :--------- | :---- | :-------------------------------------------------------- | ------------- |
| Kiintiö    | 0,20  | Jäljellä oleva kapasiteetti [0..1]                        |
| Terveys    | 0,25  | Katkaisija: KIINNI=1,0, PUOLI=0,5, AUKI=0,0               |
| CostInv    | 0,20  | Käänteiset kustannukset (halvempi = korkeampi pistemäärä) |
| LatencyInv | 0,15  | Käänteinen p95-latenssi (nopeampi = suurempi)             |
| TaskFit    | 0,10  | Malli × tehtävätyypin kuntopisteet                        |
| Vakaus     | 0,10  | Alhainen latenssin/virheiden varianssi                    | ## Mode Packs |

| Pakkaus                    | Keskity     | Avaimen paino      |
| :------------------------- | :---------- | :----------------- | --------------- |
| 🚀**Toimita nopeasti**     | Nopeus      | latencyInv: 0,35   |
| 💰**Säästö**               | Talous      | kustannusInv: 0,40 |
| 🎯**Laatu ensin**          | Paras malli | taskFit: 0.40      |
| 📡**Offline-ystävällinen** | Saatavuus   | kiintiö: 0,40      | ## Self-Healing |

-**Tilapäinen poissulkeminen**: pisteet < 0,2 → poissuljettu 5 minuutin ajan (progressiivinen peruutus, enintään 30 min) -**Katkaisijatietoisuus**: AUKI → automaattinen poissulkeminen; HALF_OPEN → tutkia pyyntöjä -**Tapahtumatila**: >50 % AUKI → poista tutkimus käytöstä, maksimoi vakaus -**Jäähdytyspalautus**: Poissulkemisen jälkeen ensimmäinen pyyntö on "koetus", jolla on lyhennetty aikakatkaisu## Bandit Exploration

5 % pyynnöistä (konfiguroitavissa) reititetään satunnaisille palveluntarjoajille tutkittavaksi. Pois käytöstä tapahtumatilassa.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Yli 30 mallia pisteytettiin kuudessa tehtävätyypissä ("koodaus", "tarkistus", "suunnittelu", "analyysi", "virheenkorjaus", "dokumentaatio"). Tukee jokerimerkkikuvioita (esim. "\*-kooderi" → korkea koodauspistemäärä).## Files

| Tiedosto                                     | Tarkoitus                                 |
| :------------------------------------------- | :---------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Pisteytystoiminto ja poolin normalisointi |
| `open-sse/services/autoCombo/taskFitness.ts` | Malli × tehtävä kuntohaku                 |
| `open-sse/services/autoCombo/engine.ts`      | Valintalogiikka, rosvo, budjettikatto     |
| `open-sse/services/autoCombo/selfHealing.ts` | Poissulkeminen, anturit, tapahtumatila    |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 painoprofiilia                          |
| `src/app/api/combos/auto/route.ts`           | REST API                                  |
