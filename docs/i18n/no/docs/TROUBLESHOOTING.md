# Troubleshooting (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Vanlige problemer og løsninger for OmniRoute.---

## Quick Fixes

| Problem                                  | Løsning                                                              |
| ---------------------------------------- | -------------------------------------------------------------------- | --- |
| Første pålogging fungerer ikke           | Sett `INITIAL_PASSWORD` i `.env` (ingen hardkodet standard)          |
| Dashboard åpnes på feil port             | Sett `PORT=20128` og `NEXT_PUBLIC_BASE_URL=http://localhost:20128`   |
| Ingen forespørselslogger under `logger/` | Sett `ENABLE_REQUEST_LOGS=true`                                      |
| EACCES: tillatelse nektet                | Sett `DATA_DIR=/path/to/writable/dir` for å overstyre `~/.omniroute` |
| Rutingstrategi lagrer ikke               | Oppdater til v1.4.11+ (Zod-skjemafiks for varighet av innstillinger) | --- |

## Provider Issues

### "Language model did not provide messages"

**Årsak:**Leverandørkvoten er oppbrukt.

**Fiks:**

1. Sjekk dashbordkvotesporing
2. Bruk en kombinasjon med reservelag
3. Bytt til billigere/gratis lag### Rate Limiting

**Årsak:**Abonnementskvoten er oppbrukt.

**Fiks:**

- Legg til reserve: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Bruk GLM/MiniMax som billig backup### OAuth Token Expired

OmniRoute oppdaterer tokens automatisk. Hvis problemene vedvarer:

1. Dashboard → Leverandør → Koble til på nytt
2. Slett og legg til leverandørtilkoblingen på nytt---

## Cloud Issues

### Cloud Sync Errors

1. Bekreft at «BASE_URL» peker til den kjørende forekomsten din (f.eks. «http://localhost:20128»)
2. Bekreft "CLOUD_URL" peker til skyendepunktet ditt (f.eks. "https://omniroute.dev")
3. Hold `NEXT_PUBLIC_*`-verdier på linje med verdiene på tjenersiden### Cloud `stream=false` Returns 500

**Symptom:**`Uventet token 'd'...` på skyendepunkt for samtaler som ikke strømmer.

**Årsak:**Oppstrøms returnerer SSE-nyttelast mens klienten forventer JSON.

**Løsning:**Bruk 'stream=true' for direkteanrop i skyen. Lokal kjøretid inkluderer SSE→JSON reserve.### Cloud Says Connected but "Invalid API key"

1. Lag en ny nøkkel fra lokalt dashbord (`/api/keys`)
2. Kjør skysynkronisering: Aktiver Cloud → Synkroniser nå
3. Gamle/ikke-synkroniserte nøkler kan fortsatt returnere '401' på skyen---

## Docker Issues

### CLI Tool Shows Not Installed

1. Sjekk kjøretidsfeltene: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. For bærbar modus: bruk bildemål "runner-cli" (medfølgende CLI-er)
3. For vertsmonteringsmodus: sett `CLI_EXTRA_PATHS` og monter vertsbin-katalogen som skrivebeskyttet
4. Hvis `installed=true` og `runnable=false`: binær ble funnet, men mislyktes i helsesjekken### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Sjekk bruksstatistikk i Dashboard → Bruk
2. Bytt primærmodell til GLM/MiniMax
3. Bruk gratis nivå (Gemini CLI, Qoder) for ikke-kritiske oppgaver
4. Angi kostnadsbudsjetter per API-nøkkel: Dashboard → API-nøkler → Budsjett---

## Debugging

### Enable Request Logs

Sett `ENABLE_REQUEST_LOGS=true` i `.env`-filen. Logger vises under katalogen `logger/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hovedtilstand: `${DATA_DIR}/storage.sqlite` (leverandører, kombinasjoner, aliaser, nøkler, innstillinger)
- Bruk: SQLite-tabeller i `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + valgfrie `${DATA_DIR}/log.txt` og `${DATA_DIR}/call_logs/`
- Forespørselslogger: `<repo>/logs/...` (når `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Når en leverandørs strømbryter er ÅPEN, blokkeres forespørsler til nedkjølingen utløper.

**Fiks:**

1. Gå til**Dashboard → Innstillinger → Resiliens**
2. Sjekk kretsbryterkortet for den berørte leverandøren
3. Klikk på**Tilbakestill alle**for å fjerne alle brytere, eller vent til nedkjølingen utløper
4. Bekreft at leverandøren faktisk er tilgjengelig før du tilbakestiller### Provider keeps tripping the circuit breaker

Hvis en leverandør gjentatte ganger går inn i ÅPEN tilstand:

1. Sjekk**Dashboard → Helse → Leverandørhelse**for feilmønsteret
2. Gå til**Innstillinger → Resiliens → Leverandørprofiler**og øk feilterskelen
3. Sjekk om leverandøren har endret API-grenser eller krever re-autentisering
4. Se gjennom latenstidstelemetri – høy latenstid kan forårsake timeout-baserte feil---

## Audio Transcription Issues

### "Unsupported model" error

- Sørg for at du bruker riktig prefiks: `deepgram/nova-3` eller `assemblyai/best`
- Bekreft at leverandøren er tilkoblet i**Dashboard → Leverandører**### Transcription returns empty or fails

- Sjekk støttede lydformater: "mp3", "wav", "m4a", "flac", "ogg", "webm"
- Bekreft at filstørrelsen er innenfor leverandørens grenser (vanligvis < 25 MB)
- Sjekk gyldigheten av leverandørens API-nøkkel i leverandørkortet---

## Translator Debugging

Bruk**Dashboard → Oversetter**for å feilsøke problemer med formatoversettelse:

| Modus            | Når skal du bruke                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Lekeplass**    | Sammenlign input/output formater side ved side — lim inn en mislykket forespørsel for å se hvordan den oversettes |
| **Chattetester** | Send direktemeldinger og inspiser hele nyttelasten for forespørsel/svar inkludert overskrifter                    |
| **Testbenk**     | Kjør batch-tester på tvers av formatkombinasjoner for å finne hvilke oversettelser som er ødelagte                |
| **Live Monitor** | Se forespørselsflyt i sanntid for å fange opp periodiske oversettelsesproblemer                                   | ### Common format issues |

-**Tenkekoder vises ikke**— Sjekk om målleverandøren støtter tenkning og innstillingen av tenkebudsjettet -**Verktøyanrop dropper**— Noen formatoversettelser kan fjerne felt som ikke støttes; verifisere i Playground-modus -**Systemmelding mangler**— Claude og Gemini håndterer systemmeldinger annerledes; sjekk oversettelsen -**SDK returnerer rå streng i stedet for objekt**— Rettet i v1.1.0: svarrenser fjerner nå ikke-standard felt (`x_groq`, `usage_breakdown` osv.) som forårsaker OpenAI SDK Pydantic valideringsfeil -**GLM/ERNIE avviser 'system'-rollen**— Rettet i v1.1.0: rollenormalisering slår automatisk sammen systemmeldinger til brukermeldinger for inkompatible modeller -**`utviklerrollen gjenkjennes ikke**– Rettet i v1.1.0: automatisk konvertert til `system` for ikke-OpenAI-leverandører -**`json_schema` fungerer ikke med Gemini**- Rettet i v1.1.0: `response_format` er nå konvertert til Geminis `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- Automatisk takstgrense gjelder bare API-nøkkelleverandører (ikke OAuth/abonnement)
- Bekreft at**Innstillinger → Resiliens → Leverandørprofiler**har aktivert automatisk satsgrense
- Sjekk om leverandøren returnerer '429'-statuskoder eller 'Retry-After'-overskrifter### Tuning exponential backoff

Leverandørprofiler støtter disse innstillingene:

-**Basisforsinkelse**— Innledende ventetid etter første feil (standard: 1 s) -**Maksimal forsinkelse**— Maksimal ventetid (standard: 30s) -**Multiplikator**— Hvor mye skal forsinkelsen økes per påfølgende feil (standard: 2x)### Anti-thundering herd

Når mange samtidige forespørsler treffer en hastighetsbegrenset leverandør, bruker OmniRoute mutex + automatisk hastighetsbegrensning for å serialisere forespørsler og forhindre kaskadefeil. Dette er automatisk for API-nøkkelleverandører.---

## Optional RAG / LLM failure taxonomy (16 problems)

Noen OmniRoute-brukere plasserer gatewayen foran RAG- eller agentstabler. I disse oppsettene er det vanlig å se et merkelig mønster: OmniRoute ser sunt ut (leverandører oppe, ruteprofiler ok, ingen varsler om takstgrense), men det endelige svaret er fortsatt feil.

I praksis kommer disse hendelsene vanligvis fra nedstrøms RAG-rørledningen, ikke fra selve gatewayen.

Hvis du vil ha et delt vokabular for å beskrive disse feilene, kan du bruke WFGY ProblemMap, en ekstern MIT-lisenstekstressurs som definerer seksten tilbakevendende RAG / LLM-feilmønstre. På et høyt nivå dekker det:

- gjenfinningsdrift og brutte kontekstgrenser
- tomme eller foreldede indekser og vektorlagre
- embedding versus semantisk mismatch
- Spørsmål om montering og kontekstvindu
- logisk kollaps og oversikre svar
- svikt i lang kjede og agentkoordinering
- multiagent minne og rolledrift
- problemer med distribusjon og bootstrap-bestilling

Ideen er enkel:

1. Når du undersøker et dårlig svar, fange opp:
   - brukeroppgave og forespørsel
   - rute eller leverandørkombinasjon i OmniRoute
   - enhver RAG-kontekst brukt nedstrøms (hentede dokumenter, verktøyanrop, etc)
2. Kartlegg hendelsen til ett eller to WFGY ProblemMap-nummer (`No.1` … `No.16`).
3. Lagre nummeret i ditt eget dashbord, runbook eller hendelsessporing ved siden av OmniRoute-loggene.
4. Bruk den tilsvarende WFGY-siden til å bestemme om du må endre RAG-stack, retriever eller rutingstrategi.

Fulltekst og konkrete oppskrifter live her (MIT-lisens, kun tekst):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Du kan ignorere denne delen hvis du ikke kjører RAG eller agentpipelines bak OmniRoute.---

## Still Stuck?

-**GitHub-problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architecture**: Se [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for interne detaljer -**API-referanse**: Se [`docs/API_REFERENCE.md`](API_REFERENCE.md) for alle endepunkter -**Helse Dashboard**: Sjekk**Dashboard → Health**for sanntids systemstatus -**Oversetter**: Bruk**Dashboard → Oversetter**for å feilsøke formatproblemer
