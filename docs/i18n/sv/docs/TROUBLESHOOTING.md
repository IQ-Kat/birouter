# Troubleshooting (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Vanliga problem och lösningar för OmniRoute.---

## Quick Fixes

| Problem                                 | Lösning                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------- | --- |
| Första inloggningen fungerar inte       | Ställ in `INITIAL_PASSWORD` i `.env` (ingen hårdkodad standard)             |
| Instrumentpanelen öppnas vid fel port   | Ställ in `PORT=20128` och `NEXT_PUBLIC_BASE_URL=http://localhost:20128`     |
| Inga förfrågningsloggar under `loggar/` | Ställ in `ENABLE_REQUEST_LOGS=true`                                         |
| EACCES: tillstånd nekad                 | Ställ in `DATA_DIR=/path/to/writable/dir` för att åsidosätta `~/.omniroute` |
| Routingstrategi sparas inte             | Uppdatering till v1.4.11+ (Zod-schemafix för inställningsbeständighet)      | --- |

## Provider Issues

### "Language model did not provide messages"

**Orsak:**Leverantörskvoten är slut.

**Åtgärda:**

1. Kontrollera instrumentpanelens kvotspårare
2. Använd en kombo med reservnivåer
3. Byt till billigare/gratis nivå### Rate Limiting

**Orsak:**Prenumerationskvoten är slut.

**Åtgärda:**

- Lägg till reserv: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Använd GLM/MiniMax som billig backup### OAuth Token Expired

OmniRoute uppdaterar automatiskt tokens. Om problemen kvarstår:

1. Instrumentpanel → Leverantör → Återanslut
2. Ta bort och lägg till leverantörsanslutningen igen---

## Cloud Issues

### Cloud Sync Errors

1. Kontrollera att `BASE_URL` pekar på din körinstans (t.ex. `http://localhost:20128`)
2. Verifiera "CLOUD_URL" pekar på din molnslutpunkt (t.ex. "https://omniroute.dev")
3. Håll `NEXT_PUBLIC_*`-värdena i linje med värden på serversidan### Cloud `stream=false` Returns 500

**Symptom:**`Oväntad token 'd'...` på molnets slutpunkt för icke-strömmande samtal.

**Orsak:**Uppströms returnerar SSE-nyttolast medan klienten förväntar sig JSON.

**Lösning:**Använd "stream=true" för direkta molnsamtal. Lokal körtid inkluderar SSE→JSON reserv.### Cloud Says Connected but "Invalid API key"

1. Skapa en ny nyckel från den lokala instrumentpanelen (`/api/keys`)
2. Kör molnsynkronisering: Aktivera moln → Synkronisera nu
3. Gamla/icke-synkroniserade nycklar kan fortfarande returnera "401" på molnet---

## Docker Issues

### CLI Tool Shows Not Installed

1. Kontrollera körtidsfält: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. För portabelt läge: använd bildmål "runner-cli" (buntade CLI)
3. För värdmonteringsläge: ställ in `CLI_EXTRA_PATHS` och montera host bin-katalogen som skrivskyddad
4. Om "installed=true" och "runnable=false": binärt hittades men misslyckades med hälsokontrollen### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Kontrollera användningsstatistik i Dashboard → Användning
2. Byt primärmodell till GLM/MiniMax
3. Använd gratis nivå (Gemini CLI, Qoder) för icke-kritiska uppgifter
4. Ställ in kostnadsbudgetar per API-nyckel: Dashboard → API-nycklar → Budget---

## Debugging

### Enable Request Logs

Ställ in `ENABLE_REQUEST_LOGS=true` i din `.env`-fil. Loggar visas under katalogen `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Huvudtillstånd: `${DATA_DIR}/storage.sqlite` (leverantörer, kombinationer, alias, nycklar, inställningar)
- Användning: SQLite-tabeller i `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + valfria `${DATA_DIR}/log.txt` och `${DATA_DIR}/call_logs/`
- Begäran loggar: `<repo>/logs/...` (när `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

När en leverantörs strömbrytare är ÖPPEN, blockeras förfrågningar tills nedkylningen går ut.

**Åtgärda:**

1. Gå till**Dashboard → Inställningar → Resilience**
2. Kontrollera strömbrytarkortet för den berörda leverantören
3. Klicka på**Återställ alla**för att rensa alla brytare, eller vänta tills nedkylningen löper ut
4. Kontrollera att leverantören faktiskt är tillgänglig innan du återställer### Provider keeps tripping the circuit breaker

Om en leverantör upprepade gånger går in i ÖPPET läge:

1. Kontrollera**Dashboard → Health → Provider Health**för felmönstret
2. Gå till**Inställningar → Resiliens → Leverantörsprofiler**och höj feltröskeln
3. Kontrollera om leverantören har ändrat API-gränser eller kräver omautentisering
4. Granska latenstelemetri — hög latens kan orsaka timeoutbaserade fel---

## Audio Transcription Issues

### "Unsupported model" error

- Se till att du använder rätt prefix: `deepgram/nova-3` eller `assemblyai/bästa`
- Kontrollera att leverantören är ansluten i**Dashboard → Leverantörer**### Transcription returns empty or fails

- Kontrollera ljudformat som stöds: "mp3", "wav", "m4a", "flac", "ogg", "webm"
- Kontrollera att filstorleken ligger inom leverantörens gränser (vanligtvis < 25 MB)
- Kontrollera giltigheten av leverantörens API-nyckel i leverantörskortet---

## Translator Debugging

Använd**Dashboard → Översättare**för att felsöka formatöversättningsproblem:

| Läge             | När ska man använda                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------ |
| **Lekplats**     | Jämför in-/utdataformat sida vid sida — klistra in en misslyckad begäran för att se hur den översätts |
| **Chatttestare** | Skicka livemeddelanden och inspektera hela nyttolasten för begäran/svar inklusive rubriker            |
| **Testbänk**     | Kör batchtester över formatkombinationer för att hitta vilka översättningar som är trasiga            |
| **Live Monitor** | Se förfrågningsflödet i realtid för att fånga intermittenta översättningsproblem                      | ### Common format issues |

-**Tänketaggar visas inte**— Kontrollera om målleverantören stöder tänkande och inställningen av tänkande budget -**Verktygsanrop avbryts**— Vissa formatöversättningar kan ta bort fält som inte stöds; verifiera i Playground-läge -**Systemprompt saknas**— Claude och Gemini hanterar systemprompter på olika sätt; kontrollera översättningsutdata -**SDK returnerar rå sträng istället för objekt**— Fixat i v1.1.0: svarssanering tar nu bort icke-standardiserade fält (`x_groq`, `usage_breakdown`, etc.) som orsakar OpenAI SDK Pydantic valideringsfel -**GLM/ERNIE avvisar 'system'-roll**— Fixat i v1.1.0: rollnormaliserare slår automatiskt samman systemmeddelanden till användarmeddelanden för inkompatibla modeller -**`utvecklarrollen inte igenkänd**– Fixad i v1.1.0: konverteras automatiskt till `system` för icke-OpenAI-leverantörer -**`json_schema` fungerar inte med Gemini**— Fixat i v1.1.0: `response_format` konverteras nu till Geminis `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- Automatisk hastighetsgräns gäller endast API-nyckelleverantörer (inte OAuth/prenumeration)
- Verifiera att**Inställningar → Motståndskraft → Leverantörsprofiler**har aktiverat automatisk hastighetsgräns
- Kontrollera om leverantören returnerar "429"-statuskoder eller "Retry-After"-rubriker### Tuning exponential backoff

Leverantörsprofiler stöder dessa inställningar:

-**Basfördröjning**— Initial väntetid efter första fel (standard: 1 s) -**Max fördröjning**— Maximalt väntetidstak (standard: 30s) -**Multiplikator**— Hur mycket ska fördröjningen öka per på varandra följande fel (standard: 2x)### Anti-thundering herd

När många samtidiga förfrågningar träffar en hastighetsbegränsad leverantör, använder OmniRoute mutex + automatisk hastighetsbegränsning för att serialisera förfrågningar och förhindra kaskadfel. Detta är automatiskt för API-nyckelleverantörer.---

## Optional RAG / LLM failure taxonomy (16 problems)

Vissa OmniRoute-användare placerar gatewayen framför RAG- eller agentstackar. I de inställningarna är det vanligt att se ett konstigt mönster: OmniRoute ser frisk ut (leverantörer upp, routingprofiler ok, inga varningar om hastighetsgränser) men det slutliga svaret är fortfarande fel.

I praktiken kommer dessa incidenter vanligtvis från RAG-rörledningen nedströms, inte från själva gatewayen.

Om du vill ha ett delat ordförråd för att beskriva dessa misslyckanden kan du använda WFGY ProblemMap, en extern MIT-licenstextresurs som definierar sexton återkommande RAG/LLM-felmönster. På hög nivå omfattar det:

- hämtningsdrift och brutna sammanhangsgränser
- tomma eller inaktuella index och vektorlager
- inbäddning kontra semantisk oöverensstämmelse
- problem med snabb montering och sammanhangsfönster
- logisk kollaps och översäkra svar
- misslyckanden i samordning av lång kedja och agenter
- multiagentminne och rolldrift
- problem med driftsättning och bootstrap-beställning

Tanken är enkel:

1. När du undersöker ett dåligt svar, fånga upp:
   - användaruppgift och begäran
   - rutt eller leverantörskombination i OmniRoute
   - alla RAG-kontexter som används nedströms (hämtade dokument, verktygsanrop, etc)
2. Kartlägg incidenten till ett eller två WFGY ProblemMap-nummer (`No.1` … `No.16`).
3. Lagra numret i din egen instrumentpanel, runbook eller incidentspårare bredvid OmniRoute-loggarna.
4. Använd motsvarande WFGY-sida för att bestämma om du behöver ändra din RAG-stack, retriever eller routingstrategi.

Fulltext och konkreta recept finns här (MIT-licens, endast text):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Du kan ignorera det här avsnittet om du inte kör RAG eller agentpipelines bakom OmniRoute.---

## Still Stuck?

-**GitHub-problem**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architecture**: Se [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) för interna detaljer -**API-referens**: Se [`docs/API_REFERENCE.md`](API_REFERENCE.md) för alla slutpunkter -**Hälsa Dashboard**: Kontrollera**Dashboard → Health**för systemstatus i realtid -**Översättare**: Använd**Dashboard → Översättare**för att felsöka formatproblem
