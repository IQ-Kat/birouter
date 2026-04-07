# Test Coverage Plan (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Huling na-update: 2026-03-28## Baseline

Mayroong maramihang mga numero ng saklaw depende sa kung paano nakalkula ang ulat. Para sa pagpaplano, isa lamang sa kanila ang kapaki-pakinabang.

| Sukatan                   | Saklaw                                                                    | Mga Pahayag / Mga Linya | Mga sangay | Mga Pag-andar | Mga Tala                                                              |
| ------------------------- | ------------------------------------------------------------------------- | ----------------------: | ---------: | ------------: | --------------------------------------------------------------------- |
| Legacy                    | Lumang `npm run test:coverage`                                            |                  79.42% |     75.15% |        67.94% | Napalaki: binibilang ang mga test file at hindi kasama ang `open-sse` |
| Diagnostic                | Source-only, hindi kasama ang mga pagsubok at hindi kasama ang `open-sse` |                  68.16% |     63.55% |        64.06% | Kapaki-pakinabang lamang upang ihiwalay ang `src/**`                  |
| Inirerekomendang baseline | Source-only, hindi kasama ang mga pagsubok at kabilang ang `open-sse`     |                  56.95% |     66.05% |        57.80% | Ito ang baseline sa buong proyekto upang mapabuti ang                 |

Ang inirerekomendang baseline ay ang numerong i-optimize.## Rules

- Nalalapat ang mga target sa saklaw sa mga source file, hindi sa `mga pagsubok/**`.
- Ang `open-sse/**` ay bahagi ng produkto at dapat manatili sa saklaw.
- Hindi dapat bawasan ng bagong code ang saklaw sa mga nahawakang lugar.
- Mas gusto ang gawi sa pagsubok at mga resulta ng sangay kaysa sa mga detalye ng pagpapatupad.
- Mas gusto ang mga temp SQLite database at maliliit na fixture kaysa sa malawak na pangungutya para sa `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Main source coverage gate para sa unit test suite
  - Bumubuo ng `text-summary`, `html`, `json-summary`, at `lcov`
- `npm run coverage:report`
  - Detalyadong file-by-file na ulat mula sa pinakabagong run
- `npm run test:coverage:legacy`
  - Makasaysayang paghahambing lamang## Milestones

| Yugto   |                     Target | Tumutok                                                           |
| ------- | -------------------------: | ----------------------------------------------------------------- |
| Phase 1 |     60% na pahayag / linya | Mabilis na panalo at mababang panganib na saklaw ng utility       |
| Phase 2 |     65% na pahayag / linya | DB at mga pundasyon ng ruta                                       |
| Phase 3 |     70% na pahayag / linya | Pagpapatunay ng provider at analytics ng paggamit                 |
| Phase 4 |     75% na pahayag / linya | Mga tagasalin at katulong ng `open-sse`                           |
| Phase 5 |     80% na pahayag / linya | `open-sse` handlers at executor branch                            |
| Phase 6 |     85% na pahayag / linya | Mas mahirap na mga kaso, utang ng sangay, mga suite ng regression |
| Phase 7 | 90% na mga pahayag / linya | Final sweep, pagsasara ng puwang, mahigpit na ratchet             |

Ang mga sanga at function ay dapat na pataas sa bawat yugto, ngunit ang pangunahing mahirap na target ay mga pahayag / linya.## Priority hotspots

Ang mga file o lugar na ito ay nag-aalok ng pinakamahusay na pagbabalik para sa mga susunod na yugto:

1. `open-sse/handlers`
   - `chatCore.ts` sa 7.57%
   - Pangkalahatang direktoryo sa 29.07%
2. `open-sse/translator/request`
   - Pangkalahatang direktoryo sa 36.39%
   - Maraming tagasalin ang malapit pa rin sa single-digit na saklaw
3. `open-sse/translator/response`
   - Pangkalahatang direktoryo sa 8.07%
4. `open-sse/executors`
   - Pangkalahatang direktoryo sa 36.62%
5. `src/lib/db`
   - `models.ts` sa 20.66%
   - `registeredKeys.ts` sa 34.46%
   - `modelComboMappings.ts` sa 36.25%
   - `settings.ts` sa 46.40%
   - `webhooks.ts` sa 33.33%
6. `src/lib/usage`
   - `usageHistory.ts` sa 21.12%
   - `usageStats.ts` sa 9.56%
   - `costCalculator.ts` sa 30.00%
7. `src/lib/providers`
   - `validation.ts` sa 41.16%
8. Low-risk utility at mga API file para sa maagang mga pakinabang
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Ayusin ang sukatan ng saklaw upang maipakita nito ang source code sa halip na mga pansubok na file
- [x] Panatilihin ang isang legacy coverage script para sa paghahambing
- [x] Itala ang baseline at mga hotspot na in-repo
- [ ] Magdagdag ng mga nakatutok na pagsubok para sa mga utility na mababa ang panganib:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Magdagdag ng mga pagsubok sa ruta para sa:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Magdagdag ng mga DB-backed na pagsubok para sa:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Takpan ang pag-uugali ng sangay sa:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Magdagdag ng mga pagsusuri sa analytics ng paggamit para sa:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Palawakin ang saklaw ng ruta para sa pamamahala ng proxy at mga sangay ng mga setting### Phase 4: 70% -> 75%

- [ ] Cover translator helpers at central translation path:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Magdagdag ng mga pagsubok sa antas ng handler para sa:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Magdagdag ng saklaw ng sangay ng tagapagpatupad para sa pagpapatunay na partikular sa provider, muling pagsubok, at pag-override ng endpoint### Phase 6: 80% -> 85%

- [ ] Pagsamahin ang higit pang mga edge-case suite sa pangunahing landas ng saklaw
- [ ] Palakihin ang saklaw ng function para sa mga DB module na may mahinang saklaw ng constructor/helper
- [ ] Isara ang mga puwang ng sangay sa `settings.ts`, `registeredKeys.ts`, `validation.ts`, at translator helper### Phase 7: 85% -> 90%

- [ ] Tratuhin ang natitirang mga file na mababa ang saklaw bilang mga blocker
- [ ] Magdagdag ng mga pagsubok sa regression para sa bawat natuklasang bug ng produksyon na naayos sa panahon ng push hanggang 90%
- [ ] Itaas ang gate ng coverage sa CI pagkatapos lang maging stable ang lokal na baseline para sa hindi bababa sa dalawang magkasunod na pagtakbo## Ratchet policy

I-update ang mga threshold ng `npm run test:coverage` pagkatapos aktwal na lumampas ang proyekto sa susunod na milestone na may komportableng buffer.

Inirerekomendang ratchet sequence:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ang order ay `statements-lines / branches / functions`.## Known gap

Ang kasalukuyang coverage command ay sumusukat sa pangunahing Node unit suite at kasama ang source na naabot mula dito, kasama ang `open-sse`. Hindi pa nito pinagsasama ang saklaw ng Vitest sa isang pinag-isang ulat. Ang pagsasanib na iyon ay sulit na gawin sa ibang pagkakataon, ngunit hindi ito isang blocker para sa pagsisimula ng 60% -> 80% na pag-akyat.
