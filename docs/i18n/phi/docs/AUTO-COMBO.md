# OmniRoute Auto-Combo Engine (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Self-manage model chain na may adaptive scoring## How It Works

Ang Auto-Combo Engine ay dynamic na pinipili ang pinakamahusay na provider/modelo para sa bawat kahilingan gamit ang**6-factor scoring function**:

| Salik      | Timbang | Paglalarawan                                        |
| :--------- | :------ | :-------------------------------------------------- | ------------- |
| Quota      | 0.20    | Natitirang kapasidad [0..1]                         |
| Kalusugan  | 0.25    | Circuit breaker: SARADO=1.0, HALF=0.5, OPEN=0.0     |
| CostInv    | 0.20    | Baliktad na gastos (mas mura = mas mataas na marka) |
| LatencyInv | 0.15    | Inverse p95 latency (mas mabilis = mas mataas)      |
| TaskFit    | 0.10    | Model × uri ng gawain na marka ng fitness           |
| Katatagan  | 0.10    | Mababang variance sa latency/error                  | ## Mode Packs |

| Pack                     | Tumutok                 | Susing Timbang   |
| :----------------------- | :---------------------- | :--------------- | --------------- |
| 🚀**Mabilis na Ipadala** | Bilis                   | latencyInv: 0.35 |
| 💰**Cost Saver**         | Ekonomiya               | costInv: 0.40    |
| 🎯**Una ang Kalidad**    | Pinakamahusay na modelo | TaskFit: 0.40    |
| 📡**Offline Friendly**   | Availability            | quota: 0.40      | ## Self-Healing |

-**Pansamantalang pagbubukod**: Marka < 0.2 → hindi kasama sa loob ng 5 min (progressive backoff, max 30 min) -**Circuit breaker awareness**: OPEN → auto-excluded; HALF_OPEN → mga kahilingan sa pagsisiyasat -**Insidente mode**: >50% OPEN → huwag paganahin ang paggalugad, i-maximize ang katatagan -**Cooldown recovery**: Pagkatapos ng pagbubukod, ang unang kahilingan ay isang "probe" na may pinababang timeout## Bandit Exploration

5% ng mga kahilingan (nako-configure) ay iruruta sa mga random na provider para sa paggalugad. Naka-disable sa incident mode.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ modelo ang nakakuha ng marka sa 6 na uri ng gawain (`coding`, `review`, `pagpaplano`, `analysis`, `debugging`, `documentation`). Sinusuportahan ang mga pattern ng wildcard (hal., `*-coder` → mataas na marka ng coding).## Files

| File                                         | Layunin                                          |
| :------------------------------------------- | :----------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Pag-andar ng pagmamarka at normalisasyon ng pool |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × task fitness lookup                      |
| `open-sse/services/autoCombo/engine.ts`      | Lohika ng pagpili, bandido, limitasyon ng badyet |
| `open-sse/services/autoCombo/selfHealing.ts` | Pagbubukod, pagsisiyasat, mode ng insidente      |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 na profile ng timbang                          |
| `src/app/api/combos/auto/route.ts`           | REST API                                         |
