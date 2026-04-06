# Troubleshooting (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Almindelige problemer og løsninger til OmniRoute.---

## Quick Fixes

| Problem                                | Løsning                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------- | --- |
| Første login virker ikke               | Indstil `INITIAL_PASSWORD` i `.env` (ingen hardcoded standard)              |
| Dashboard åbner ved forkert port       | Indstil `PORT=20128` og `NEXT_PUBLIC_BASE_URL=http://localhost:20128`       |
| Ingen anmodningslogfiler under `logs/` | Indstil `ENABLE_REQUEST_LOGS=true`                                          |
| EACCES: tilladelse nægtet              | Indstil `DATA_DIR=/path/to/writable/dir` for at tilsidesætte `~/.omniroute` |
| Routingstrategi gemmer ikke            | Opdatering til v1.4.11+ (Zod-skemafix for indstillinger persistens)         | --- |

## Provider Issues

### "Language model did not provide messages"

**Årsag:**Udbyderkvoten er opbrugt.

**Ret:**

1. Tjek dashboard-kvotesporing
2. Brug en kombination med reserveniveauer
3. Skift til billigere/gratis niveau### Rate Limiting

**Årsag:**Abonnementskvoten er opbrugt.

**Ret:**

- Tilføj reserve: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Brug GLM/MiniMax som billig backup### OAuth Token Expired

OmniRoute opdaterer automatisk tokens. Hvis problemerne fortsætter:

1. Dashboard → Udbyder → Genopret forbindelse
2. Slet og tilføj udbyderforbindelsen igen---

## Cloud Issues

### Cloud Sync Errors

1. Bekræft, at `BASE_URL` peger på din kørende forekomst (f.eks. `http://localhost:20128`)
2. Bekræft "CLOUD_URL" peger på dit cloud-slutpunkt (f.eks. "https://omniroute.dev")
3. Hold `NEXT_PUBLIC_*`-værdier på linje med værdier på serversiden### Cloud `stream=false` Returns 500

**Symptom:**`Uventet token 'd'...` på cloud-slutpunktet for ikke-streaming-opkald.

**Årsag:**Upstream returnerer SSE-nyttelast, mens klienten forventer JSON.

**Løsning:**Brug 'stream=true' til direkte skyopkald. Lokal kørselstid inkluderer SSE→JSON fallback.### Cloud Says Connected but "Invalid API key"

1. Opret en ny nøgle fra det lokale dashboard (`/api/keys`)
2. Kør skysynkronisering: Aktiver sky → Synkroniser nu
3. Gamle/ikke-synkroniserede nøgler kan stadig returnere '401' på skyen---

## Docker Issues

### CLI Tool Shows Not Installed

1. Tjek runtime-felter: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. For bærbar tilstand: brug billedmål "runner-cli" (bundtet CLI'er)
3. For værtsmonteringstilstand: indstil `CLI_EXTRA_PATHS` og monter host bin-mappe som skrivebeskyttet
4. Hvis `installed=true` og `runnable=false`: binær blev fundet, men sundhedstjekket mislykkedes### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Tjek brugsstatistik i Dashboard → Brug
2. Skift primær model til GLM/MiniMax
3. Brug gratis niveau (Gemini CLI, Qoder) til ikke-kritiske opgaver
4. Indstil omkostningsbudgetter pr. API-nøgle: Dashboard → API-nøgler → Budget---

## Debugging

### Enable Request Logs

Indstil `ENABLE_REQUEST_LOGS=true` i din `.env`-fil. Logs vises under mappen `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hovedtilstand: `${DATA_DIR}/storage.sqlite` (udbydere, kombinationer, aliaser, nøgler, indstillinger)
- Anvendelse: SQLite-tabeller i `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + valgfri `${DATA_DIR}/log.txt` og `${DATA_DIR}/call_logs/`
- Anmodningslogfiler: `<repo>/logs/...` (når `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Når en udbyders afbryder er ÅBEN, blokeres anmodninger, indtil nedkølingen udløber.

**Ret:**

1. Gå til**Dashboard → Indstillinger → Resiliens**
2. Tjek afbryderkortet for den berørte udbyder
3. Klik på**Nulstil alle**for at rydde alle afbrydere, eller vent på, at nedkølingen udløber
4. Bekræft, at udbyderen faktisk er tilgængelig, før du nulstiller### Provider keeps tripping the circuit breaker

Hvis en udbyder gentagne gange går i ÅBEN tilstand:

1. Tjek**Dashboard → Health → Provider Health**for fejlmønsteret
2. Gå til**Indstillinger → Resiliens → Udbyderprofiler**og øg fejltærsklen
3. Tjek, om udbyderen har ændret API-grænser eller kræver gengodkendelse
4. Gennemgå latency-telemetri — høj latenstid kan forårsage timeout-baserede fejl---

## Audio Transcription Issues

### "Unsupported model" error

- Sørg for, at du bruger det korrekte præfiks: `deepgram/nova-3` eller `assemblyai/best`
- Bekræft, at udbyderen er tilsluttet i**Dashboard → Udbydere**### Transcription returns empty or fails

- Tjek understøttede lydformater: "mp3", "wav", "m4a", "flac", "ogg", "webm"
- Bekræft filstørrelsen er inden for udbyderens grænser (typisk < 25 MB)
- Tjek gyldigheden af udbyderens API-nøgle på udbyderkortet---

## Translator Debugging

Brug**Dashboard → Oversætter**til at fejlfinde problemer med formatoversættelse:

| Tilstand         | Hvornår skal man bruge                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Legeplads**    | Sammenlign input/output-formater side om side — indsæt en mislykket anmodning for at se, hvordan den oversættes |
| **Chattester**   | Send livebeskeder og inspicer den fulde anmodnings-/svarnyttelast inklusive overskrifter                        |
| **Testbænk**     | Kør batchtest på tværs af formatkombinationer for at finde ud af, hvilke oversættelser der er brudte            |
| **Live Monitor** | Se anmodningsflow i realtid for at fange periodiske oversættelsesproblemer                                      | ### Common format issues |

-**Tænke-tags vises ikke**— Tjek, om måludbyderen understøtter tænkning og indstilling af tænkebudget -**Værktøjsopkald falder**— Nogle formatoversættelser kan fjerne ikke-understøttede felter; verificere i Playground-tilstand -**Systemprompt mangler**— Claude og Gemini håndterer systemprompts forskelligt; kontrollere oversættelsesoutput -**SDK returnerer rå streng i stedet for objekt**— Rettet i v1.1.0: svar sanitizer fjerner nu ikke-standard felter (`x_groq`, `usage_breakdown` osv.), der forårsager OpenAI SDK Pydantic valideringsfejl -**GLM/ERNIE afviser 'system'-rolle**— Rettet i v1.1.0: Rollenormalisering flettes automatisk systemmeddelelser ind i brugermeddelelser for inkompatible modeller -**"udvikler"-rolle ikke genkendt**- Rettet i v1.1.0: automatisk konverteret til "system" for ikke-OpenAI-udbydere -**`json_schema` virker ikke med Gemini**- Rettet i v1.1.0: `response_format` er nu konverteret til Gemini's `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- Automatisk hastighedsgrænse gælder kun for API-nøgleudbydere (ikke OAuth/abonnement)
- Bekræft, at**Indstillinger → Modstandsdygtighed → Udbyderprofiler**har aktiveret automatisk satsgrænse
- Tjek, om udbyderen returnerer '429'-statuskoder eller 'Retry-After'-overskrifter### Tuning exponential backoff

Udbyderprofiler understøtter disse indstillinger:

-**Base delay**— Indledende ventetid efter første fejl (standard: 1s) -**Maksimal forsinkelse**— Maksimal ventetid (standard: 30s) -**Multiplikator**— Hvor meget skal forsinkelsen øges pr. på hinanden følgende fejl (standard: 2x)### Anti-thundering herd

Når mange samtidige anmodninger rammer en hastighedsbegrænset udbyder, bruger OmniRoute mutex + automatisk hastighedsbegrænsning til at serialisere anmodninger og forhindre kaskadefejl. Dette er automatisk for API-nøgleudbydere.---

## Optional RAG / LLM failure taxonomy (16 problems)

Nogle OmniRoute-brugere placerer gatewayen foran RAG- eller agentstakke. I disse opsætninger er det almindeligt at se et mærkeligt mønster: OmniRoute ser sund ud (udbydere op, routing profiler ok, ingen hastighedsgrænse advarsler), men det endelige svar er stadig forkert.

I praksis kommer disse hændelser normalt fra RAG-rørledningen nedstrøms, ikke fra selve gatewayen.

Hvis du ønsker et fælles ordforråd til at beskrive disse fejl, kan du bruge WFGY ProblemMap, en ekstern MIT-licenstekstressource, der definerer seksten tilbagevendende RAG/LLM-fejlmønstre. På et højt niveau dækker det over:

- genfindingsdrift og brudte kontekstgrænser
- tomme eller uaktuelle indekser og vektorlagre
- indlejring versus semantisk mismatch
- problemer med hurtig montering og kontekstvindue
- logisk sammenbrud og oversikre svar
- lang kæde og agentkoordinationsfejl
- multiagent hukommelse og rolledrift
- problemer med implementering og bootstrap-bestilling

Ideen er enkel:

1. Når du undersøger et dårligt svar, skal du fange:
   - brugeropgave og anmodning
   - rute eller udbyderkombination i OmniRoute
   - enhver RAG-kontekst, der bruges downstream (hentede dokumenter, værktøjsopkald osv.)
2. Kortlæg hændelsen til et eller to WFGY ProblemMap-numre (`No.1` … `No.16`).
3. Gem nummeret i dit eget dashboard, runbook eller hændelsessporing ved siden af ​​OmniRoute-logfilerne.
4. Brug den tilsvarende WFGY-side til at beslutte, om du skal ændre din RAG-stack, retriever eller routingstrategi.

Fuld tekst og konkrete opskrifter live her (MIT-licens, kun tekst):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Du kan ignorere dette afsnit, hvis du ikke kører RAG eller agentpipelines bag OmniRoute.---

## Still Stuck?

-**GitHub-problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architecture**: Se [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for interne detaljer -**API-reference**: Se [`docs/API_REFERENCE.md`](API_REFERENCE.md) for alle endepunkter -**Health Dashboard**: Tjek**Dashboard → Health**for systemstatus i realtid -**Oversætter**: Brug**Dashboard → Oversætter**til at fejlsøge formatproblemer
