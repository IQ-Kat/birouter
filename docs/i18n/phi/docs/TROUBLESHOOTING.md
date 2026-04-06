# Troubleshooting (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Mga karaniwang problema at solusyon para sa OmniRoute.---

## Quick Fixes

| Problema                                         | Solusyon                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | --- |
| Unang login ay hindi gumagana                    | Itakda ang `INITIAL_PASSWORD` sa `.env` (walang hardcoded default)             |
| Nagbubukas ang dashboard sa maling port          | Itakda ang `PORT=20128` at `NEXT_PUBLIC_BASE_URL=http://localhost:20128`       |
| Walang mga log ng kahilingan sa ilalim ng `log/` | Itakda ang `ENABLE_REQUEST_LOGS=true`                                          |
| EACCES: tinanggihan ang pahintulot               | Itakda ang `DATA_DIR=/path/to/writable/dir` para i-override ang `~/.omniroute` |
| Hindi nagse-save ang diskarte sa pagruruta       | Update sa v1.4.11+ (Zod schema fix para sa pagtitiyaga ng mga setting)         | --- |

## Provider Issues

### "Language model did not provide messages"

**Sanhi:**Naubos na ang quota ng provider.

**Ayusin:**

1. Suriin ang dashboard quota tracker
2. Gumamit ng combo na may fallback tier
3. Lumipat sa mas mura/libreng tier### Rate Limiting

**Dahil:**Naubos na ang quota ng subscription.

**Ayusin:**

- Magdagdag ng fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gamitin ang GLM/MiniMax bilang murang backup### OAuth Token Expired

Ang OmniRoute ay awtomatikong nagre-refresh ng mga token. Kung magpapatuloy ang mga isyu:

1. Dashboard → Provider → Kumonekta muli
2. Tanggalin at muling idagdag ang koneksyon ng provider---

## Cloud Issues

### Cloud Sync Errors

1. I-verify ang mga `BASE_URL` na puntos sa iyong running instance (hal., `http://localhost:20128`)
2. I-verify ang mga `CLOUD_URL` na puntos sa iyong cloud endpoint (hal., `https://omniroute.dev`)
3. Panatilihing nakahanay ang mga value ng `NEXT_PUBLIC_*` sa mga value sa gilid ng server### Cloud `stream=false` Returns 500

**Symptom:**`Hindi inaasahang token 'd'...` sa cloud endpoint para sa mga non-streaming na tawag.

**Sanhi:**Ibinabalik ng Upstream ang SSE payload habang inaasahan ng kliyente ang JSON.

**Workaround:**Gamitin ang `stream=true` para sa mga direktang tawag sa cloud. Kasama sa lokal na runtime ang SSE→JSON fallback.### Cloud Says Connected but "Invalid API key"

1. Gumawa ng bagong key mula sa lokal na dashboard (`/api/keys`)
2. Patakbuhin ang cloud sync: Paganahin ang Cloud → Sync Now
3. Ang mga luma/hindi naka-sync na key ay maaari pa ring ibalik ang `401` sa cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Suriin ang mga field ng runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para sa portable mode: gumamit ng target ng imahe na `runner-cli` (mga naka-bundle na CLI)
3. Para sa host mount mode: itakda ang `CLI_EXTRA_PATHS` at i-mount ang host bin directory bilang read-only
4. Kung `naka-install=true` at `runnable=false`: nakita ang binary ngunit nabigo ang healthcheck### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Suriin ang mga istatistika ng paggamit sa Dashboard → Paggamit
2. Ilipat ang pangunahing modelo sa GLM/MiniMax
3. Gumamit ng libreng tier (Gemini CLI, Qoder) para sa mga hindi kritikal na gawain
4. Magtakda ng mga badyet sa gastos sa bawat API key: Dashboard → API Keys → Badyet---

## Debugging

### Enable Request Logs

Itakda ang `ENABLE_REQUEST_LOGS=true` sa iyong `.env` file. Lumilitaw ang mga log sa ilalim ng direktoryo ng `log/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Pangunahing estado: `${DATA_DIR}/storage.sqlite` (mga provider, combo, alias, key, setting)
- Paggamit: Mga talahanayan ng SQLite sa `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opsyonal na `${DATA_DIR}/log.txt` at `${DATA_DIR}/call_logs/`
- Mga log ng kahilingan: `<repo>/logs/...` (kapag `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Kapag ang circuit breaker ng provider ay BUKAS, ang mga kahilingan ay hinaharangan hanggang sa mag-expire ang cooldown.

**Ayusin:**

1. Pumunta sa**Dashboard → Settings → Resilience**
2. Suriin ang circuit breaker card para sa apektadong provider
3. I-click ang**I-reset Lahat**upang i-clear ang lahat ng mga breaker, o hintaying mag-expire ang cooldown
4. I-verify na available talaga ang provider bago i-reset### Provider keeps tripping the circuit breaker

Kung ang isang provider ay paulit-ulit na pumasok sa OPEN state:

1. Suriin ang**Dashboard → Health → Provider Health**para sa pattern ng pagkabigo
2. Pumunta sa**Settings → Resilience → Provider Profiles**at taasan ang failure threshold
3. Suriin kung binago ng provider ang mga limitasyon ng API o nangangailangan ng muling pagpapatotoo
4. Suriin ang latency telemetry — ang mataas na latency ay maaaring magdulot ng mga pagkabigo batay sa timeout---

## Audio Transcription Issues

### "Unsupported model" error

- Tiyaking ginagamit mo ang tamang prefix: `deepgram/nova-3` o `assemblyai/best`
- I-verify na konektado ang provider sa**Dashboard → Mga Provider**### Transcription returns empty or fails

- Suriin ang mga sinusuportahang format ng audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- I-verify na ang laki ng file ay nasa loob ng mga limitasyon ng provider (karaniwang <25MB)
- Suriin ang validity ng provider ng API key sa provider card---

## Translator Debugging

Gamitin ang**Dashboard → Translator**upang i-debug ang mga isyu sa pagsasalin ng format:

| Mode             | Kailan Gagamitin                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Laruan**       | Paghambingin ang mga format ng input/output nang magkatabi — i-paste ang isang nabigong kahilingan upang makita kung paano ito isinasalin |
| **Chat Tester**  | Magpadala ng mga live na mensahe at siyasatin ang buong kahilingan/tugon payload kasama ang mga header                                    |
| **Test Bench**   | Magpatakbo ng mga batch test sa mga kumbinasyon ng format upang malaman kung aling mga pagsasalin ang sira                                |
| **Live Monitor** | Panoorin ang daloy ng kahilingan sa real-time upang mahuli ang mga pasulput-sulpot na isyu sa pagsasalin                                  | ### Common format issues |

-**Hindi lumalabas ang mga tag ng pag-iisip**— Tingnan kung sinusuportahan ng target na provider ang pag-iisip at ang setting ng badyet sa pag-iisip -**Pagbaba ng mga tawag sa tool**— Maaaring alisin ng ilang pagsasalin ng format ang mga hindi sinusuportahang field; i-verify sa Playground mode -**System prompt nawawala**— Claude at Gemini handle system prompts magkaiba; suriin ang output ng pagsasalin -**Nagbabalik ang SDK ng raw string sa halip na object**— Naayos sa v1.1.0: tinatanggal na ngayon ng response sanitizer ang mga hindi karaniwang field (`x_groq`, `usage_breakdown`, atbp.) na nagdudulot ng mga pagkabigo sa pagpapatunay ng OpenAI SDK Pydantic -**Tinatanggihan ng GLM/ERNIE ang tungkulin ng `system`**— Naayos sa v1.1.0: awtomatikong pinagsasama ng role normalizer ang mga mensahe ng system sa mga mensahe ng user para sa mga hindi tugmang modelo -**Hindi nakilala ang tungkulin ng `developer`**— Naayos sa v1.1.0: awtomatikong na-convert sa `system` para sa mga provider na hindi OpenAI -**`json_schema` hindi gumagana sa Gemini**— Naayos sa v1.1.0: `response_format` ay na-convert na ngayon sa `responseMimeType` + `responseSchema` ng Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Nalalapat lang ang limitasyon ng awtomatikong rate sa mga provider ng API key (hindi OAuth/subscription)
- I-verify**Mga Setting → Resilience → Provider Profile**ay pinagana ang auto-rate-limit
- Suriin kung ang provider ay nagbabalik ng `429` status code o `Retry-After` header### Tuning exponential backoff

Sinusuportahan ng mga profile ng provider ang mga setting na ito:

-**Base delay**— Paunang oras ng paghihintay pagkatapos ng unang pagkabigo (default: 1s) -**Max na pagkaantala**— Maximum na limitasyon sa oras ng paghihintay (default: 30s) -**Multiplier**— Magkano ang itataas na pagkaantala sa bawat magkakasunod na pagkabigo (default: 2x)### Anti-thundering herd

Kapag maraming sabay-sabay na kahilingan ang tumama sa isang provider na limitado sa rate, gumagamit ang OmniRoute ng mutex + auto rate-limiting para i-serialize ang mga kahilingan at maiwasan ang mga pagkabigo ng cascading. Ito ay awtomatiko para sa mga API key provider.---

## Optional RAG / LLM failure taxonomy (16 problems)

Inilalagay ng ilang user ng OmniRoute ang gateway sa harap ng RAG o mga stack ng ahente. Sa mga setup na iyon, karaniwan nang makakita ng kakaibang pattern: Mukhang malusog ang OmniRoute (mga provider up, ok ang mga profile sa pagruruta, walang mga alerto sa limitasyon sa rate) ngunit mali pa rin ang huling sagot.

Sa pagsasagawa, ang mga insidenteng ito ay karaniwang nagmumula sa downstream na RAG pipeline, hindi mula sa gateway mismo.

Kung gusto mo ng nakabahaging bokabularyo upang ilarawan ang mga pagkabigo na iyon, maaari mong gamitin ang WFGY ProblemMap, isang panlabas na mapagkukunan ng teksto ng lisensya ng MIT na tumutukoy sa labing-anim na umuulit na pattern ng pagkabigo ng RAG / LLM. Sa isang mataas na antas ito ay sumasaklaw sa:

- retrieval drift at sirang mga hangganan ng konteksto
- walang laman o lipas na mga index at mga tindahan ng vector
- pag-embed laban sa semantic mismatch
- agarang pagpupulong at mga isyu sa window ng konteksto
- pagbagsak ng lohika at sobrang kumpiyansa na mga sagot
- mahabang kadena at mga pagkabigo sa koordinasyon ng ahente
- multi agent memory at role drift
- mga problema sa pag-deploy at pag-order ng bootstrap

Ang ideya ay simple:

1. Kapag nag-imbestiga ka ng masamang tugon, kunin ang:
   - gawain at kahilingan ng user
   - ruta o provider combo sa OmniRoute
   - anumang konteksto ng RAG na ginamit sa ibaba ng agos (mga nakuhang dokumento, mga tawag sa tool, atbp)
2. I-mapa ang insidente sa isa o dalawang numero ng WFGY ProblemMap (`No.1` … `No.16`).
3. Itago ang numero sa sarili mong dashboard, runbook, o incident tracker sa tabi ng mga log ng OmniRoute.
4. Gamitin ang kaukulang pahina ng WFGY upang magpasya kung kailangan mong baguhin ang iyong RAG stack, retriever, o diskarte sa pagruruta.

Dito nakatira ang buong teksto at mga konkretong recipe (lisensya ng MIT, text lang):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Maaari mong balewalain ang seksyong ito kung hindi ka nagpapatakbo ng RAG o mga pipeline ng ahente sa likod ng OmniRoute.---

## Still Stuck?

-**Mga Isyu sa GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arkitektura**: Tingnan ang [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) para sa mga panloob na detalye -**API Reference**: Tingnan ang [`docs/API_REFERENCE.md`](API_REFERENCE.md) para sa lahat ng endpoint -**Dashboard ng Kalusugan**: Suriin ang**Dashboard → Kalusugan**para sa real-time na status ng system -**Translator**: Gamitin ang**Dashboard → Translator**para i-debug ang mga isyu sa format
