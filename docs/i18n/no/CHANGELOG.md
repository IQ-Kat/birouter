# Changelog (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middelvare:**Løst uendelig omdirigeringssløyfe på dashbordet for nye tilfeller når requireLogin er deaktivert.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Native Integration:**Refaktorerte Qoder Executor fullstendig for å omgå den eldre COSY AES/RSA-krypteringsalgoritmen, og rutet direkte inn i den opprinnelige DashScope OpenAi-kompatible URL-en. Eliminerer komplekse avhengigheter på node-'crypto'-moduler samtidig som den forbedrer strømmentrohet. -**Resilience Engine Overhaul:**Integrert kontekstoverflyt, grasiøse fallbacks, proaktiv OAuth-tokendeteksjon og forebygging av utslipp av tomt innhold (#990). -**Kontekstoptimalisert rutingstrategi:**Lagt til ny intelligent rutingfunksjon for å maksimere kontekstvinduer i automatiserte kombinasjonsdistribusjoner (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Rettet dypkloningskorrupsjon der antropiske/OpenAI-oversettelsesgrenser fjernet «respons.»-spesifikke SSE-prefikser fra strømmegrenser (#992). -**Claude Cache Passthrough Alignment:**Justert CC-kompatible cache-markører konsekvent med oppstrøms klientpass-through-modus som bevarer hurtigbufring. -**Turbopack-minnelekkasje:**Festet Next.js til strenge `16.0.10` for å forhindre minnelekkasjer og bygge staleness fra nylige oppstrøms Turbopack hashed-modulregresjoner (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-integrasjon:**Integrated models.dev som den autoritative kjøretidskilden for modellpriser, muligheter og spesifikasjoner, som overstyrer hardkodede priser. Inkluderer et brukergrensesnitt for innstillinger for å administrere synkroniseringsintervaller, oversettelsesstrenger for alle 30 språk og robust testdekning. -**Native evner til leverandøren:**Lagt til støtte for å deklarere og sjekke native API-funksjoner (f.eks. "systemInstructions_supported") som forhindrer feil ved å rense ugyldige roller. Foreløpig konfigurert for Gemini Base og Antigravity OAuth-leverandører. -**Avanserte innstillinger for API-leverandør:**Lagt til tilpassede "User-Agent"-overstyringer per tilkobling for API-nøkkelleverandørtilkoblinger. Overstyringen er lagret i `providerSpecificData.customUserAgent` og gjelder nå for valideringsprober og oppstrømsforespørsler om utførelse.### 🐛 Bug Fixes

-**Qwen OAuth-pålitelighet:**Løste en rekke OAuth-integrasjonsproblemer, inkludert en 400 Bad Request-blokkering på utløpte tokens, reservegenerering for parsing av OIDC `access_token`-egenskaper når `id_token` er utelatt, modellkatalogoppdagingsfeil og streng filtrering av `X-0AI header-compati-\*ble Open'. endepunkter.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Fullført innebygd CRUD-livssyklusintegrasjon for den avanserte Auto-Combo-motoren (#955). -**Kjerneoperasjoner:**Rettet manglende oversettelser for nye automatiske kombinasjonsalternativer (#955). -**Sikkerhetsvalidering:**Deaktiverte automatisk sikkerhetskopieringsoppgaver i SQLite under kjøring av enhetstest CI for å eksplisitt løse Node 22 Event Loop hengende minnelekkasjer (#956). -**Økosystemproxyer:**Fullførte planleggere for synkronisering av modell for eksplisitt integreringskartlegging, OAuth-sykluser og Token Check oppdateres trygt gjennom OmniRoutes opprinnelige system oppstrøms proxyer (#953). -**MCP-utvidbarhet:**La til og registrerte det nye 'omniroute_web_search' MCP-rammeverkverktøyet utenfor beta til produksjonsskjemaer (#951). -**Tokens Buffer Logic:**Lagt til kjøretidskonfigurasjonsgrenser som utvider konfigurerbare input/output token-buffere for nøyaktige brukssporingsmålinger (#959).### 🐛 Bug Fixes

-**CodeQL Remediation:**Fullt løste og sikrede kritiske strengindekseringsoperasjoner som forhindrer Server-Side Request Forgery (SSRF)-arrays som indekserer heuristikk sammen med polynomial algoritmisk tilbakesporing (ReDoS) inne i dype proxy-dispatcher-moduler. -**Krypto-hasher:**Erstattet svake ubekreftede eldre OAuth 1.0-hasher med robuste HMAC-SHA-256-standardvalideringsprimitiver som sikrer stramme tilgangskontroller. -**API-grensebeskyttelse:**Korrekt verifisert og kartlagt strukturell rutebeskyttelse som håndhever streng 'isAuthenticated()'-mellomvarelogikk som dekker nyere dynamiske endepunkter målrettet mot manipulering av innstillinger og innlasting av innfødte ferdigheter. -**CLI Ecosystem Compat:**Løste ødelagte native runtime-parserbindinger som krasjer "hvor" miljødetektorer strengt tatt over ".cmd/.exe"-kanthus for eksterne plugins (#969). -**Cache-arkitektur:**Refaktorert eksakte analyse- og systeminnstillinger dashbordparametere layoutstrukturbufring for å opprettholde stabile rehydrerings-vedvarende sykluser som løser visuelle ujusterte tilstandsblink (#952). -**Claude Caching Standards:**Normaliserte og nøyaktig strengt bevarte kritiske flyktige blokkmarkører 'efemere' caching TTL-ordrer for nedstrømsnoder som håndhever standard kompatible CC-forespørsler kartlegging rent uten droppede metrikker (#948). -**Autentisering av interne aliaser:**Forenklet interne kjøretidstilordninger som normaliserer Codex-påloggingsnyttelastoppslag i globale oversettelsesparametere som løser 401 uautentiserte fall (#958).### 🛠️ Maintenance

-**Oppdagbarhet for brukergrensesnitt:**Korrekt justerte layoutkategoriseringer som eksplisitt skiller gratisnivåleverandører logikk som forbedrer UX-sorteringsflyter på de generelle API-registersidene (#950). -**Deployment Topology:**Unified Docker-distribusjonsartefakter som sikrer at roten `fly.toml` samsvarer med forventede skyforekomstparametere som er klar og håndterer automatisk skalering av distribusjoner på riktig måte. -**Utviklingsverktøy:**Koblet fra "LKGP" kjøretidsparametere til eksplisitte DB-lagabstraksjonsbufringsverktøy som sikrer streng testisolasjonsdekning for kjernebufringlag på en sikker måte.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Refaktorerte `/dashboard/auto-combo`-grensesnittet fullstendig for sømløst integrering med native Dashboard-kort og standardisert visuell polstring/overskrifter. Lagt til dynamiske visuelle fremdriftslinjer som kartlegger vektmekanismer for modellvalg. -**Settings Routing Sync:**Fullt eksponerte avanserte ruting 'prioritet' og 'veide' skjemamål internt i globale innstillinger reservelister.### Bug Fixes

-**Minne- og ferdighetslokalitetsnoder:**Løste tomme gjengivelseskoder for minne- og ferdighetsalternativer direkte i globale innstillinger ved å koble alle `settings.*`-tilordningsverdier internt til `en.json` (også implisitt kartlagt for kryssoversettelsesverktøy).### Internal Integrations

- Integrert PR #946 — fiks: bevar Claude Code-kompatibilitet i svarkonvertering
- Integrert PR #944 — fix (tvillinger): bevar tankesignaturer på tvers av anrop av antigravitasjonsverktøy
- Integrert PR #943 — fiks: gjenopprett GitHub Copilot-kroppen
- Integrert PR #942 — Fiks cc-kompatible cache-markører
- Integrert PR #941 — refactor(auth): forbedre NVIDIA-aliasoppslag + legg til LKGP-feillogging
- Integrert PR #939 — Gjenopprett Claude OAuth lokalverts tilbakeringingshåndtering
- _(Merk: PR #934 ble utelatt fra syklus 3.4.9 for å forhindre regresjon av kjernekonflikt)_---

## [3.4.8] — 2026-04-03

### Sikkerhet

- Fullstendig utbedret alle utestående Github Advanced Security (CodeQL) funn og Dependabot-varsler.
- Rettet usikre tilfeldighetssårbarheter ved å migrere fra `Math.random` til `crypto.randomUUID()`.
- Sikrede skallkommandoer i automatiserte skript fra strenginjeksjon.
- Migrerte sårbare katastrofale tilbakesporende RegEx-parsingmønstre i chat-/oversettelsespipelines.
- Forbedrede utrensingskontroller inne i React UI-komponenter og Server Sent Events (SSE) tag-injeksjon.---

## [3.4.7] — 2026-04-03

### Funksjoner

- Lagt til "Kryptografi"-node til overvåking og MCP-helsesjekker (#798)
- Herdet modellkatalog-rutetillatelse (`/modeller`) (#781)### Bug Fixes

- Fikset oppdatering av Claude OAuth-token som ikke klarer å bevare hurtigbufferkontekster (#937)
- Rettet CC-kompatible leverandørfeil som gjør bufrede modeller utilgjengelige (#937)
- Rettet GitHub Executor-feil relatert til ugyldige kontekstmatriser (#937)
- Rettet NPM-installerte CLI-verktøy helsesjekk feil på Windows (#935)
- Fikset nyttelastoversettelse som dropper gyldig innhold på grunn av ugyldige API-felt (#927)
- Fast kjørekrasj i Node 25 angående API-nøkkelkjøring (#867)
- Fast MCP frittstående moduloppløsning (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Fikset NVIDIA NIM-ruting påloggingsoppløsning alias mismatch (#931)### Sikkerhet

- Lagt til sikker streng inngangsgrensebeskyttelse mot rå "shell: true" ekstern kjøring av kodeinjeksjoner.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Leverandører:**Registrerte nye leverandører av bilde-, video- og lydgenerering fra listen med forespørsler fra fellesskapet (#926). -**Dashboard UI:**Lagt til frittstående sidefeltnavigering for de nye minne- og ferdighetsmodulene (#926). -**i18n:**Lagt til oversettelsesstrenger og layouttilordninger på tvers av 30 språk for navnerommene Memory og Skills.### 🐛 Bug Fixes

-**Resiliens:**Hindret proxy-kretsbryteren fra å bli sittende fast i en ÅPEN-tilstand på ubestemt tid ved å håndtere direkte overganger til LUKKET-tilstand i reservekombinasjonsbaner (#930). -**Protokolloversettelse:**Patchet strømmetransformatoren for å rense responsblokker basert på den forventede _source_-protokollen i stedet for leverandørens _target_-protokoll, og fikset Anthropics-modeller pakket inn i OpenAI-nyttelaster som krasjer Claude Code (#929). -**API-spesifikasjoner og Gemini:**Fikset «thought_signature»-parsing i «openai-to-gemini» og «claude-to-gemini»-oversettere, og forhindret HTTP 400-feil på tvers av alle Gemini 3 API-verktøykall. -**Leverandører:**Ryddet opp i ikke-OpenAI-kompatible endepunkter som forhindrer gyldige oppstrømsforbindelser (#926). -**Cache-trender:**Rettet en ugyldig egenskapskartleggingsdata som fikk Cache Trends UI-diagrammer til å krasje, og hentet ut overflødige cache-metriske widgets (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI-økosystemintegrering:**Lagt til "cliproxyapi"-eksekutoren med innebygd modul-nivå caching og proxy-ruting. Introduserte en omfattende versjonsbehandlingstjeneste for automatisk å teste helse, laste ned binærfiler fra GitHub, skape isolerte bakgrunnsprosesser og administrere livssyklusen til eksterne CLI-verktøy direkte gjennom brukergrensesnittet. Inkluderer DB-tabeller for proxy-konfigurasjon for å aktivere automatisk SSRF-gated kryssruting av eksterne OpenAI-forespørsler via det lokale CLI-verktøylaget (#914, #915, #916). -**Qoder PAT-støtte:**Støtte for integrerte personlige tilgangstokens (PAT) direkte via den lokale `qodercli`-transporten i stedet for eldre eksterne `.cn` nettleserkonfigurasjoner (#913). -**Gemini 3.1 Pro Preview (GitHub):**Lagt til "gemini-3.1-pro-preview" kanonisk eksplisitt modellstøtte innebygd i GitHub Copilot-leverandøren samtidig som eldre rutingaliaser (#924) ble bevart.### 🐛 Bug Fixes

-**GitHub Copilot Token Stability:**Reparerte Copilot-token-oppdateringsløkken der gamle tokens ikke ble dypt slått sammen i DB, og fjernet `reasoning_text`-felt som brøt nedstrøms antropiske blokkkonverteringer for multi-turn chats (#923). -**Global Timeout Matrix:**Sentraliserte og parameteriserte tidsavbrudd for forespørsel eksplisitt fra `REQUEST_TIMEOUT_MS` for å forhindre skjulte (~300s) standard hentebuffere som for tidlig avskjærer langvarige SSE-streamingsvar fra tunge resonneringsmodeller (#918). -**Cloudflare Quick Tunnels State:**Rettet en alvorlig tilstandsinkonsekvens der omstartede OmniRoute-forekomster feilaktig viste ødelagte tunneler som aktive, og standard cloudflared-tunnelering til `HTTP/2` for å eliminere spam fra UDP-mottaksbufferlogg (#925). -**i18n Translation Overhaul (Czech & Hindi):**Fast Hindi-kode fra DEPRECATED `in.json` til kanonisk `hi.json`, overhalt tsjekkiske teksttilordninger, ekstraherte `untranslatable-keys.json` for å fikse CI/CD falske positive valideringer, og genererte `Imdl-komprehenser` (#912). -**Token Provider Recovery:**Fikset Qwen som mister spesifikke 'resourceUrl'-endepunkter etter automatisk oppdatering av helsesjekktoken på grunn av manglende dype DB-sammenslåinger (#917). -**CC-kompatibel UX og streaming:**Samlet de Add CC/OpenAI/Anthropic-kompatible handlingene rundt Anthropic UI-behandlingen, tvang CC-kompatible oppstrømsforespørsler om å bruke SSE mens de fortsatt returnerer streaming eller ikke-streaming-svar basert på klientforespørselen, fjernet CC-modelllistekonfigurasjon/importstøtte til fordel for en CC-modell-tilgjengelig støtte, compati-tilgjengelig Modeller gjenspeiler OAuth Claude Code-registerlisten (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Send ut `response.completed` med riktige `input_tokens`/`output_tokens`-felt for Codex CLI-klienter, fikser tokenbruksvisning (#909 – takk @christopher-s). -**SQLite WAL-sjekkpunkt ved avslutning:**Skyll WAL-endringer inn i den primære databasefilen under elegant avslutning/omstart, og forhindrer tap av data på Docker-beholderstopp (#905 — takk @rdself). -**Graceful Shutdown Signal:**Endret `/api/restart` og `/api/shutdown`-ruter fra `process.exit(0)` til `process.kill(SIGTERM)`, noe som sikrer at avstengningsbehandleren kjører før utgang. -**Docker Stop Grace Period:**Lagt til `stop_grace_period: 40s` til Docker Compose-filer og `--stop-timeout 40` til Docker-kjøringseksempler.### 🛠️ Maintenance

- Lukket 5 løste/ikke-en-feil-problemer (#872, #814, #816, #890, #877).
- Triagerte 6 problemer med behovsinformasjonsforespørsler (#892, #887, #886, #865, #895, #870).
- Reagerte på sporingsproblem med CLI-deteksjon (#863) med veiledning for bidragsytere.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Fullført eksternt minne og ferdighetsinjeksjon for Antigravity-leverandøren på proxy-nettverksnivå. -**Claude Code-kompatibilitet:**Bygget en naturlig skjult kompatibilitetsbro for Claude Code, som sender verktøy og formatering gjennom rent. -**Nettsøk MCP:**La til `omniroute_web_search`-verktøyet med `execute:search`-omfanget. -**Cache-komponenter:**Implementerte dynamiske cache-komponenter ved bruk av TDD. -**UI og tilpasning:**Lagt til tilpasset favicon-støtte, utseendefaner, kablet hvitmerking til sidefeltet, og lagt til Windsurf-guidetrinn på tvers av alle 33 språk. -**Loggoppbevaring:**Samlet oppbevaring av forespørselslogger og gjenstander. -**Modelforbedringer:**Lagt til eksplisitt "contextLength" for alle opencode-zen-modeller. -**i18n og oversettelser:**Integrerte 33-språklige oversettelser, inkludert plassholder CI-valideringer og kinesisk dokumentasjonsoppdateringer (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Tilbakestilte `id_token`-avhengighet til `access_token` og aktivert dynamisk `resource_url` API-endepunktinjeksjon for riktig regional ruting (#900). -**Model Sync Engine:**Lagret den strenge interne leverandør-ID-en i `getCustomModels()`-synkroniseringsrutiner i stedet for UI Channel Alias-formatet, og forhindret feil ved innsetting av SQLite-kataloger (#903). -**Claude Code & Codex:**Standardiserte ikke-streamende blanke svar på Antropisk-formatert `(tom respons)` for å forhindre CLI proxy-krasj (#866). -**CC-kompatibel ruting:**Løste duplikat `/v1`-endepunktkollisjon under banesammenkobling for generiske Claude Code-gatewayer (#904). -**Antigravity Dashboards:**Blokkerte ubegrensede kvotemodeller fra å feilaktig registrere seg som uttømte "100% Usage"-grensetilstander i Provider Usage UI (#857). -**Claude Image Passthrough:**Fikset Claude-modeller som mangler bildeblokkgjennomganger (#898). -**Gemini CLI-ruting:**Løste 403 autorisasjonssperringer og innholdsakkumuleringsproblemer ved å oppdatere prosjekt-ID-en via `loadCodeAssist` (#868). -**Antigravity Stabilitet:**Korrigerte modelltilgangslister, påtvunget 404-sperringer, faste 429-kaskader som låser standardtilkoblinger og avkortet `gemini-3.1-pro`-utgangstokener (#885). -**Provider Sync Cadence:**Reparerte leverandøren begrenser synkroniseringskadensen via den interne planleggeren (#888). -**Dashboard Optimalization:**Løst "/dashboard/limits" UI-frysing ved behandling av 70+ kontoer via chunk-parallellisering (#784). -**SSRF-herding:**Tvinget streng SSRF IP-rekkeviddefiltrering og blokkerte `::1` loopback-grensesnittet. -**MIME-typer:**Standardisert 'mime_type' til snake_case for å matche Gemini API-spesifikasjoner. -**CI-stabilisering:**Rettet feilende analyser/innstillinger Playwright-velgere og forespørselspåstander slik at GitHub Actions E2E-kjøringer passerer pålitelig på tvers av lokaliserte brukergrensesnitt og svitsjbaserte kontroller. -**Deterministiske tester:**Fjernet datosensitive kvotearmaturer fra Copilot-brukstester og justerte idempotens-/modellkatalogtester med den sammenslåtte kjøretidsatferden. -**MCP Type Hardening:**Fjernet eksplisitte "nogle"-regresjoner med nullbudsjett fra registreringsbanen for MCP-serververktøyet. -**Model Sync Engine:**Omgået destruktiv "erstatt" overstyrer når leverandørens automatiske synkronisering gir en tom modellliste, og opprettholder stabiliteten for dynamiske kataloger (#899).### 🛠️ Maintenance

-**Rørledningslogging:**Raffinerte rørledningsloggingsartefakter og fremtvinge retensjonshetter (#880). -**AGENTS.md Overhaling:**Kondensert fra 297→153 linjer. Lagt til retningslinjer for bygg/test/stil, kodearbeidsflyter (Prettier, TypeScript, ESLint) og trimmede detaljerte tabeller (#882). -**Release Branch Integration:**Konsoliderte de aktive funksjonene til `release/v3.4.2` på toppen av gjeldende `main` og validerte grenen med lo, enhet, dekning, build og CI-modus E2E-kjøringer. -**Testing:**Lagt til testkonfigurasjon for komponenttesting og Playwright-spesifikasjoner for innstillinger. -**Dokumentoppdateringer:**Utvidet root readmes, oversatte kinesiske dokumenter innfødt og ryddet opp i foreldede filer.## [3.4.1] - 2026-03-31

> [!ADVARSEL]
> **BRYTENDE ENDRING: variabler for forespørselslogging, oppbevaring og logging har blitt redesignet.**
> Ved første oppstart etter oppgradering arkiverer OmniRoute eldre forespørselslogger fra `DATA_DIR/logs/`, eldre `DATA_DIR/call_logs/` og `DATA_DIR/log.txt` til `DATA_DIR/log_archives/*.zip`, og fjerner deretter de foreldede svitsjene under det nye oppsettet og endrede formatet. `DATA_DIR/anropslogger/`.### ✨ New Features

-**.ENV Migration Utility:**Inkludert `scripts/migrate-env.mjs` for sømløst å migrere `<v3.3`-konfigurasjoner til `v3.4.x` strenge sikkerhetsvalideringsbegrensninger (FASE-01), som reparerer oppstartskrasj forårsaket av korte `JWT_SECRET`-forekomster. -**Kiro AI Cache-optimalisering:**Implementerte deterministisk `conversationId`-generering (uuidv5) for å aktivere AWS Builder ID-promptbufring på tvers av påkallinger (#814). -**Gjenoppretting og konsolidering av dashbordgrensesnitt:**Løste sidefeltlogikk som utelater feilsøkingsdelen, og fjernet Nextjs-rutingadvarsler ved å flytte frittstående `/dashboard/mcp`- og `/dashboard/a2a`-sider eksplisitt inn i innebygde Endpoint Proxy UI-komponenter. -**Unified Request Log Artifacts:**Forespørselslogging lagrer nå én SQLite-indeksrad pluss én JSON-artefakt per forespørsel under `DATA_DIR/call_logs/`, med valgfri pipeline-fangst innebygd i samme fil. -**Språk:**Forbedret den kinesiske oversettelsen (#855) -**Opencode-Zen-modeller:**Lagt til 4 gratismodeller til opencode-zen-registeret (#854) -**Tester:**Lagt til enhets- og E2E-tester for innstillinger og feilrettinger (#850)### 🐛 Bug Fixes

-**429 Quota Parsing:**Parsed lange kvote-tilbakestillingstider fra feilinstanser for å respektere korrekte backoffs og forhindre ratebegrensede kontosperringer (#859) -**Promptbufring:**Bevarte klient-'cache_control'-overskrifter for alle Claude-protokollleverandører (som Minimax, GLM og Bailian), som gjenkjenner hurtigbufferstøtte (#856) -**Modelsynkroniseringslogger:**Redusert loggsøppelpost ved å ta opp "synkroniseringsmodeller" bare når kanalen faktisk endrer listen (#853) -**Provider Quota & Token Parsing:**Byttet antigravity-grenser for å bruke «retrieveUserQuota» naturlig og korrekt kartlagt nyttelaster for Claude-tokenoppdatering til URL-kodede skjemaer (#862) -**Rate-Limiting Stability:**Universaliserte 429 Retry-After-parsing-arkitekturen for å begrense leverandørindusert nedkjøling ved maks 24 timer (#862) -**Dashboard Limit Rendering:**Re-arkitektert `/dashboard/limits`-kvotetilordning for å gjengi umiddelbart inne i biter, og fikse en stor UI-frysingsforsinkelse på kontoer som overstiger 70 aktive tilkoblinger (#784) -**QWEN OAuth-autorisasjon:**Tilordnet OIDC `id_token` som det primære API-bærertokenet for Dashscope-forespørsler, og rettet umiddelbare 401 uautoriserte feil etter tilkobling av kontoer eller oppdatering av tokens (#864) -**ZAI API Stabilitet:**Hardened Server-Sent Events-kompilator for elegant fallback til tomme strenger når DeepSeek-leverandører streamer matematisk null-innhold under resonneringsfaser (#871) -**Claude Code/Codex Translations:**Beskyttet ikke-streamende nyttelastkonverteringer mot tomme svar fra oppstrøms Codex-verktøy, og unngår katastrofale TypeErrors (#866) -**NVIDIA NIM-gjengivelse:**Betinget fjernet identiske leverandørprefikser dynamisk presset av lydmodeller, og eliminerer dupliserte 'nim/nim'-tagstrukturer som kaster 404 på Media Playground (#872)### ⚠️ Breaking Changes

-**Request Log Layout:**Fjernet den gamle multi-filen `DATA_DIR/logs/` forespørselsloggøkter og `DATA_DIR/log.txt` sammendragsfilen. Nye forespørsler skrives som enkelt JSON-artefakter i `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Loggingmiljøvariabler:**Erstattet `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` og `PROXY_LOG_MAX_ENTRIES` med den nye `APP_LOG_*` og `CALL_LOG_RETENTION_DAYS.
-**Pipeline Toggle Setting:**Erstattet den eldre innstillingen for `detailed_logs_enabled`med`call_log_pipeline_enabled`. Nye rørledningsdetaljer er innebygd i forespørselsartefakten i stedet for å bli lagret som separate `request_detail_logs`-poster.### 🛠️ Maintenance

-**Legacy Request Log Upgrade Backup:**Oppgraderinger arkiverer nå gamle `data/logs/`, eldre `data/call_logs/`, og `data/log.txt`-oppsett i `DATA_DIR/log_archives/*.zip` før den avviklede strukturen fjernes. -**Streaming Usage Persistence:**Streamingforespørsler skriver nå en enkelt 'usage_history'-rad ved fullføring i stedet for å sende ut en duplikat pågående bruksrad med tomme statusmetadata. -**Logging oppfølgingsopprydding:**Pipeline-logger fanger ikke lenger opp "SOURCE REQUEST", be om artefaktoppføringer respekterer nå "CALL_LOG_MAX_ENTRIES", og applikasjonsloggarkiver respekterer nå "APP_LOG_MAX_FILES".---

## [3.4.0] - 2026-03-31

### Funksjoner

-**Abonnementsutnyttelsesanalyse:**Lagt til sporing av kvoteøyeblikksbilder av tidsserier, faner for leverandørbruk og kombohelse med visualiseringer for omdiagrammer og tilsvarende API-endepunkter (#847) -**SQLite Backup Control:**Nytt env-flagg for `OMNIROUTE_DISABLE_AUTO_BACKUP` for å deaktivere automatiske SQLite-sikkerhetskopier (#846) -**Oppdatering av modellregister:**Injiserte "gpt-5.4-mini" i Codex-leverandørens utvalg av modeller (#756) -**Sporing av leverandørgrense:**Spor og vis når leverandørens takstgrenser sist ble oppdatert per konto (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Omdirigert Qwen OAuth-fullføringer fra DashScope API til Web Inference API (`chat.qwen.ai`), og løste autorisasjonsfeil (#844, #807, #832) -**Qwen Auto-Retry Loop:**Lagt til målrettet 429-kvote Overskredet backoff-håndtering i `chatCore` som beskytter burst-forespørsler -**Codex OAuth Fallback:**Moderne popup-blokkering av nettleser fanger ikke lenger brukeren; den faller automatisk tilbake til manuell URL-oppføring (#808) -**Claude Token Refresh:**Anthropics strenge `application/json`-grenser blir nå respektert under tokengenerering i stedet for kodede URL-er (#836) -**Codex Messages Schema:**Strippet puristiske "meldinger" injiserer fra native passthrough-forespørsler for å unngå strukturelle avvisninger fra ChatGPT oppstrøms (#806) -**Størrelsesgrense for CLI-deteksjon:**Bumpet den øvre grensen for binær skanning for noden fra 100 MB til 350 MB, slik at tunge frittstående verktøy som Claude Code (229 MB) og OpenCode (153 MB) kan detekteres riktig av VPS-kjøringen (#809) -**CLI Runtime Environment:**Gjenopprettet muligheten for CLI-konfigurasjoner til å respektere brukeroverstyringsbaner (`CLI_{PROVIDER}_BIN`) som omgår strenge stibundne oppdagelsesregler -**Nvidia Header Conflicts:**Fjernet "prompt_cache_key"-egenskaper fra oppstrømsoverskrifter når du ringer til ikke-antropiske leverandører (#848) -**Codex Rask Tier Toggle:**Gjenopprettet Codex Service Tier Toggle kontrast i lysmodus (#842) -**Testinfrastruktur:**Oppdatert "t28-model-catalog-updates"-test som feilaktig forventet det utdaterte DashScope-endepunktet for Qwen-registret---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Tilpasset leverandørrotasjon:**Integrert 'getRotatingApiKey' internt i DefaultExecutor, som sikrer at 'extraApiKeys'-rotasjon utløses riktig for tilpassede og kompatible oppstrømsleverandører (#815)---

## [3.3.8] - 2026-03-30

### Funksjoner

-**Models API-filtrering:**Endpoint `/v1/models` filtrerer nå listen dynamisk basert på tillatelsene knyttet til `Autorisasjon: Bærer <token>` når begrenset tilgang er på (#781) -**Qoder-integrasjon:**Innebygd integrasjon for Qoder AI som erstatter de eldre iFlow-plattformtilordningene (#660) -**Sporing av hurtigbuffer:**Lagt til sporingsfunksjoner og frontend-visualisering (statistikkkort) for semantisk og hurtigbufring i Dashboard-grensesnittet### 🐛 Bug Fixes

-**Størrelse på cache-dashbord:**Forbedret UI-layoutstørrelsene og kontekstoverskriftene for de avanserte cache-sidene (#835) -**Feilsøking av sidefeltsynlighet:**Rettet et problem der feilsøkingsbryteren ikke ville vise/skjule feilsøkingsdetaljer i sidefeltet på riktig måte (#834) -**Tvillingmodellprefiks:**Endret reservenavnet for navneområdet til riktig rute via "gemini-cli/" i stedet for "gc/" for å respektere oppstrømsspesifikasjonene (#831) -**OpenRouter Sync:**Forbedret kompatibilitetssynkronisering for å automatisk innta den tilgjengelige modellkatalogen riktig fra OpenRouter (#830) -**Kartlegging av strømming av nyttelast:**Reserialisering av resonneringsfelt løser naturlig konfliktaliasbaner når utdata strømmes til kantenheter---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Restrukturert generert `opencode.json` for å bruke det `@ai-sdk/openai-compatible` postbaserte skjemaet med `options` og `modeller` som objektkart i stedet for flate arrays, og fikser konfigurasjonsvalideringsfeil (#816) -**i18n Manglende nøkler:**Lagt til manglende `cloudflaredUrlNotice`-oversettelsesnøkkel på tvers av alle 30 språkfiler for å forhindre `MISSING_MESSAGE`-konsollfeil på Endpoint-siden (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Inkludert prompt-cache-tokens trygt i beregninger av historiske bruksinndata for korrekte kvotefradrag (PR #822) -**Kombo-testprober:**Rettet falske negativer for kombinasjonstesting av logikk ved å løse parsing for kun resonnementsvar og muliggjorde massiv parallellisering via Promise.all (PR #828) -**Docker Quick Tunnels:**Innebygde nødvendige ca-sertifikater inne i base-runtime-beholderen for å løse Cloudflared TLS-oppstartsfeil, og dukket opp standardnettverksfeil som erstatter generiske utgangskoder (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Lagt til sanntids Gemini CLI-kvotesporing via `retrieveUserQuota` API (PR #825) -**Cache Dashboard:**Forbedret Cache Dashboard for å vise hurtigbufferberegninger, 24-timers trender og estimerte kostnadsbesparelser (PR #824)### 🐛 Bug Fixes

-**Brukeropplevelse:**Fjernet invasive auto-åpnende OAuth-modale løkker på ufruktbare leverandørdetaljerte sider (PR #820) -**Avhengighetsoppdateringer:**Støpte og låste avhengigheter for utviklings- og produksjonstrær, inkludert Next.js 16.2.1, Recharts og TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A-arbeidsflyter:**Lagt til deterministisk FSM-orkestrator for flertrinns agentarbeidsflyter. -**Graceful Degradation:**Lagt til et nytt flerlags reserverammeverk for å bevare kjernefunksjonalitet under delvise systembrudd. -**Konfigurasjonsrevisjon:**Lagt til et revisjonsspor med diff-deteksjon for å spore endringer og aktivere tilbakeføring av konfigurasjon. -**Leverandørhelse:**Lagt til sporing av leverandørutløp med proaktive UI-varsler for utløpende API-nøkler. -**Adaptiv ruting:**Lagt til en adaptiv volum- og kompleksitetsdetektor for å overstyre rutingstrategier dynamisk basert på belastning. -**Provider Diversity:**Implementert leverandørdiversitetsscoring via Shannon-entropi for å forbedre lastfordelingen. -**Auto-deaktiver grenser:**Lagt til en auto-deaktiver utestengte konto-innstillingsbryter til Resilience-dashbordet.### 🐛 Bug Fixes

-**Codex & Claude-kompatibilitet:**Fikset UI-fallbacks, korrigerte Codex-ikke-streaming-integrasjonsproblemer og løst CLI-runtime-deteksjon på Windows. -**Utgivelsesautomatisering:**Utvidede tillatelser kreves for Electron-appen i GitHub Actions. -**Cloudflare Runtime:**Adresserte riktige kjøretidsisolasjonsutgangskoder for Cloudflared-tunnelkomponenter.### 🧪 Tests

-**Test Suite-oppdateringer:**Utvidet testdekning for volumdetektorer, leverandørmangfold, konfigurasjonsrevisjon og FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-pålitelighet:**Lagret GitHub-handlinger til stabile avhengighetsversjoner (`actions/checkout@v4`, `actions/upload-artifact@v4`) for å redusere uanmeldte avviklinger av byggermiljø. -**Image Fallbacks:**Erstattet vilkårlige reservekjeder i `ProviderIcon.tsx` med eksplisitt aktivavalidering for å forhindre at brukergrensesnittet laster `<Image>`-komponenter for filer som ikke eksisterer, og eliminerer `404`-feil i dashbordkonsolllogger (#745). -**Admin Updater:**Dynamisk kildeinstallasjonsdeteksjon for dashbordoppdateringen. Deaktiverer trygt `Oppdater nå`-knappen når OmniRoute bygges lokalt i stedet for gjennom npm, og ber om `git pull` (#743). -**Oppdater ERESOLVE-feil:**Injiserte `package.json` overstyrer for `react`/`react-dom` og aktiverte `--legacy-peer-deps` i de interne automatiske oppdateringsskriptene for å løse brytende avhengighetstrekonflikter med `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Cloudflare Quick Tunnel-integrasjon med dashbordkontroller (PR #772). -**Diagnostikk:**Semantisk cache-bypass for combo live-tester (PR #773).### 🐛 Bug Fixes

-**Strømmestabilitet:**Bruk `FETCH_TIMEOUT_MS` på strømmeforespørslers første "fetch()"-kall for å forhindre 300s Node.js TCP-tidsavbrudd som forårsaker stille oppgavefeil (#769). -**i18n:**Legg til manglende `windsurf`- og `copilot`-oppføringer til `toolDescriptions` på tvers av alle 33 lokalitetsfiler (#748). -**GLM-kodingsrevisjon:**Komplett leverandørrevisjon som fikser ReDoS-sårbarheter, kontekstvindusstørrelse (128k/16k) og modellregistersynkronisering (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Reservebehandlingsretting for `type: "tekst"`-elementer som har null eller tomme datasett som forårsaket 400-avvisning (#742). -**Opencode:**Oppdater skjemajustering til entall `leverandør` for å matche offisielle spesifikasjoner (#774). -**Gemini CLI:**Injiser manglende sluttbrukerkvoteoverskrifter som forhindrer 403-autorisasjonssperringer (#775). -**DB-gjenoppretting:**Refaktorer flerdelt nyttelast importerer til rå binære bufrede arrays for å omgå reverse proxy max body-grenser (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilization**— Fullført versjon 3.2.9 (kombinasjonsdiagnostikk, kvalitetsporter, Gemini-verktøyfiks) og opprettet manglende git-tag. Konsoliderte alle trinnvise endringer i en enkelt atomutgivelsesforpliktelse.### 🐛 Bug Fixes

-**Auto-oppdateringstest**— Rettet `buildDockerComposeUpdateScript`-testpåstand for å matche uutvidede skallvariabelreferanser (`$TARGET_TAG`, `${TARGET_TAG#v}`) i det genererte distribusjonsskriptet, tilpasset den refaktorerte malen fra v3.2.8. -**Circuit Breaker Test**— Herdet `combo-circuit-breaker.test.mjs` ved å injisere `maxRetries: 0` for å forhindre at oppblåsing på nytt forsøker skjev påstander om feilteller under overganger til brytertilstand.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introduserte et live test-bypass-flagg (`forceLiveComboTest`) som lar administratorer utføre ekte oppstrøms helsesjekker som omgår alle lokale kretsbryter- og nedkjølingstilstandsmekanismer, noe som muliggjør presis diagnostikk under rullende utfall (PR #759) -**Quality Gates**— Lagt til automatisert responskvalitetsvalidering for kombinasjoner og offisielt integrert «claude-4.6»-modellstøtte i kjernerutingsskjemaene (PR #762)### 🐛 Bug Fixes

-**Verktøydefinisjonsvalidering**— Reparert Gemini API-integrasjon ved å normalisere enum-typer i verktøydefinisjoner, og forhindre oppstrøms HTTP 400-parameterfeil (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Integrert en løsrevet bakgrunnsoppdateringsprosess for Docker Compose-implementeringer. Dashboard-grensesnittet sporer nå sømløst oppdateringslivssyklushendelser ved å kombinere JSON REST-svar med SSE-strømmefremdriftsoverlegg for robust pålitelighet på tvers av miljøer. -**Cache Analytics**— Reparert null-metrics visualiseringskartlegging ved å migrere Semantic Cache-telemetrilogger direkte inn i den sentraliserte sporings-SQLite-modulen.### 🐛 Bug Fixes

-**Autentiseringslogikk**— Rettet en feil der lagring av dashbordinnstillinger eller å legge til modeller mislyktes med en 401 Uautorisert feil når 'requireLogin' ble deaktivert. API-endepunkter evaluerer nå den globale autentiseringsveksleren på riktig måte. Løste global omdirigering ved å reaktivere `src/middleware.ts`. -**CLI Tool Detection (Windows)**- Forhindret fatale initialiseringsunntak under CLI-miljødeteksjon ved å fange opp "cross-spawn" ENOENT-feil på riktig måte. Legger til eksplisitte deteksjonsbaner for `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Normaliserte modelloversettelsesparametere som forhindrer kontekstforgiftning i proxy-pass-through-modus, og håndhever generiske "store: false"-begrensninger eksplisitt for alle Codex-opprinnelige forespørsler. -**SSE-tokenrapportering**— Normalisert «finish_reason»-deteksjon for leverandørverktøy-anrop, fikser 0 % bruksanalyse for svar som kun er strømme som mangler strenge «<FERDIG>»-indikatorer. -**DeepSeek <tenke>-tagger**- Implementerte en eksplisitt "<tenke>"-ekstraksjonskartlegging inne i "responsesHandler.ts", som sikrer at DeepSeek-resonnementstrømmer kartlegges på samme måte som innfødte antropiske "<tenkning>"-strukturer.---

## [3.2.7] - 2026-03-29

### Fixed

-**Sømløse UI-oppdateringer**: "Oppdater nå"-funksjonen på dashbordet gir nå live, gjennomsiktig tilbakemelding ved hjelp av Server-Sent Events (SSE). Den utfører pakkeinstallasjon, gjenoppbygging av native moduler (better-sqlite3), og PM2 starter pålitelig på nytt mens den viser sanntidslastere i stedet for å henge stille.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Lagt til en scoped API-nøkkelkopiflyt i Api Manager, beskyttet av miljøvariabelen `ALLOW_API_KEY_REVEAL`. -**Sylighetskontroller for sidefelt (#739)**— Administratorer kan nå skjule hvilken som helst navigasjonskobling i sidefeltet via Utseende-innstillingene for å redusere visuelt rot. -**Streng kombinasjonstesting (#735)**— Har herdet endepunktet for kombinasjonshelsesjekken til å kreve direkte tekstsvar fra modeller i stedet for bare myke tilgjengelighetssignaler. -**Strømmede detaljerte logger (#734)**— Byttet detaljert forespørselslogging for SSE-strømmer for å rekonstruere den endelige nyttelasten, sparer enorme mengder SQLite-databasestørrelse og rydder opp i brukergrensesnittet betydelig.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Korrigerte autentiseringstopplogikken for `minimax`-modeller på OpenCode Go for å bruke `x-api-key` i stedet for standard bærer-tokens på tvers av `/messages`-protokollen.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integrert `xbps-src`-pakkemal og instruksjoner for å kompilere og installere OmniRoute med `better-sqlite3`-bindinger via krysskompileringsmål.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI-migrering (#660)**— Fullstendig migrert den eldre «iFlow»-kjerneleverandøren til «Qoder AI» og opprettholdt stabile API-rutingsmuligheter.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 nyttelast ugyldig argument (#731)**— Forhindret `thoughtSignature`-arrayinjeksjoner inne i standard Gemini-`functionCall`-sekvenser som blokkerer agentiske rutingflyter.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Normalisert kvotegrenselogikk og datamerking inne i Limits-grensesnittet.### 🐛 Bug Fixes

-**Kjernerutingskjemaer og lekkasjer**— Utvidet `comboStrategySchema` for å støtte "fill-first" og "p2c"-strategier for å oppheve blokkering av kompleks combo-redigering. -**Thinking Tags Extraction (CLI)**— Restrukturert CLI-tokenrespons-renser RegEx fanger opp modellresonneringsstrukturer inne i strømmer og unngår ødelagte `<tenking>`-ekstraksjoner som bryter svartekstutdataformat. -**Strenge formathåndhevelser**— Herdet utførelse av rørledningssanering som gjør det universelt gjeldende for mål i oversettelsesmodus.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Fire-trinns forespørselsloggpipeline (#705)**— Refaktorert logg-vedholdenhet for å lagre omfattende nyttelaster på fire distinkte pipelinestadier: klientforespørsel, oversatt leverandørforespørsel, leverandørrespons og oversatt klientrespons. Introdusert 'streamPayloadCollector' for robust SSE-strømavkorting og nyttelastserialisering.### 🐛 Bug Fixes

-**Mobile UI-fikser (#659)**— Hindret tabellkomponenter på dashbordet fra å bryte oppsettet på smale visningsporter ved å legge til riktig horisontal rulling og overflyt-begrensning til 'DashboardLayout'. -**Claude Prompt Cache-fikser (#708)**— Sørget for at 'cache_control'-blokker i Claude-to-Claude fallback-løkker er trofast bevart og sendt trygt tilbake til antropiske modeller. -**Gemini Tool Definitions (#725)**— Rettet skjemaoversettelsesfeil ved deklarering av enkle 'objekt'-parametertyper for Gemini-funksjonskall.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global reserveleverandør (#689)**— Når alle kombinasjonsmodeller er oppbrukt (502/503), prøver OmniRoute nå en konfigurerbar global reservemodell før feilen returneres. Sett `globalFallbackModel` i innstillingene for å aktivere.### 🐛 Bug Fixes

-**Fix #721**— Fast omgåelse av kontekstfesting under svar på verktøyanrop. Ikke-streaming-tagging brukte feil JSON-bane (`json.messages` → `json.choices[0].message`). Streaming-injeksjon utløses nå på «finish_reason»-biter for verktøy-anropsstrømmer. `injectModelTag()` legger nå til syntetiske pinmeldinger for ikke-strenginnhold. -**Fix #709**— Bekreftet allerede fikset (v3.1.9) — `system-info.mjs` lager kataloger rekursivt. Lukket. -**Fix #707**— Bekreftet allerede fikset (v3.1.9) — tom verktøynavn sanitisering i `chatCore.ts`. Lukket.### 🧪 Tests

- Lagt til 6 enhetstester for kontekstfesting med verktøyanropssvar (nullinnhold, matriseinnhold, rundtur, re-injeksjon)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**— La til et dedikert semantisk caching-dashbord på \`/dashboard/cache\` med målrettet API-uvalidering og 31-språklig i18n-støtte (PR #701 av @oyi77) -**GLM-kvotesporing**— Lagt til sporing av bruk i sanntid og øktkvote for GLM Coding (Z.AI)-leverandøren (PR #698 av @christopher-s) -**Detaljerte loggnyttelaster**— Kablet full fire-trinns pipeline-nyttelastfangst (original, oversatt, leverandør-respons, streamet-deltaer) direkte inn i brukergrensesnittet (PR #705 av @rdself)### 🐛 Bug Fixes

-**Fix #708**— Forhindret token-blødning for Claude Code-brukere som ruter gjennom OmniRoute ved å riktig bevare innfødte \`cache_control\`-hoder under Claude-to-Claude-passthrough (PR #708 av @tombii) -**Fix #719**— Sett opp interne autentiseringsgrenser for \`ModelSyncScheduler\` for å forhindre uautentiserte demonfeil ved oppstart (PR #719 av @rdself) -**Fix #718**— Ombygd merkegjengivelse i Provider Limits UI som forhindrer overlapping av dårlige kvotegrenser (PR #718 av @rdself) -**Fix #704**— Fikset Combo Fallbacks som bryter på HTTP 400-innholdspolicy-feil som hindrer modellrotasjon død-ruting (PR #704 av @rdself)### 🔒 Security & Dependencies

- Bumped \`path-to-regexp\` til \`8.4.0\` for å løse dependabot-sårbarheter (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Fix #706**— Fikset ikonfallback-gjengivelse forårsaket av Tailwind V4 `font-sans`-overstyring ved å bruke `!important` på `.material-symbols-outlined`. -**Fix #703**— Fikset GitHub Copilot ødelagte strømmer ved å aktivere `responses` til `openai`-formatoversettelse for alle tilpassede modeller som utnytter `apiFormat: "responses"`. -**Fix #702**— Erstattet brukssporing med fast pris med nøyaktige DB-prisberegninger for både streaming- og ikke-streamingsvar. -**Fix #716**— Ryddet opp i Claude tool-call oversettelsestilstand, korrekt parsing av strømningsargumenter og forhindret OpenAI `tool_calls`-biter fra å gjenta `id`-feltet.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Skjema-tvang**- Autotving strengkodede numeriske JSON-skjemabegrensninger (f.eks. "minimum": "1") til riktige typer, og forhindrer 400 feil fra Cursor, Cline og andre klienter som sender feilaktige verktøyskjemaer. -**Tool Description Sanitization**— Sørg for at verktøybeskrivelser alltid er strenger; konverterer «null», «udefinerte» eller numeriske beskrivelser til tomme strenger før de sendes til leverandører. -**Slett alle modeller-knapp**— Lagt til i18n-oversettelser for leverandørhandlingen "Slett alle modeller" på tvers av alle 30 språk. -**Codex Auth Export**- Lagt til Codex `auth.json` eksport og bruk-lokale knapper for sømløs CLI-integrasjon. -**Windsurf BYOK Notes**— Lagt til offisielle begrensningsadvarsler til Windsurf CLI-verktøykortet som dokumenterer BYOK-begrensninger.### 🐛 Bug Fixes

-**Fix #709**— `system-info.mjs` krasjer ikke lenger når utdatakatalogen ikke eksisterer (lagt til `mkdirSync` med rekursivt flagg). -**Fix #710**— A2A `TaskManager` singleton bruker nå `globalThis` for å forhindre tilstandslekkasje over Next.js API-rute-rekompilering i dev-modus. E2E testsuite oppdatert for å håndtere 401 elegant. -**Fix #711**— Lagt til leverandørspesifikk "max*tokens"-takhåndhevelse for oppstrømsforespørsler. -**Fix #605 / #592**— Strip `proxy*`-prefiks fra verktøynavn i ikke-streamende Claude-svar; fast LongCat-validerings-URL.
-**Call Logs Max Cap**— Oppgradert `getMaxCallLogs()` med bufringslag, env var-støtte (`CALL_LOGS_MAX`) og integrering av DB-innstillinger.### 🧪 Tests

- Testpakken utvidet fra 964 → 1027 tester (63 nye tester)
- Lagt til "schema-coercion.test.mjs" - 9 tester for numerisk felttvang og rensing av verktøybeskrivelse
- Lagt til `t40-opencode-cli-tools-integration.test.mjs` – OpenCode/Windsurf CLI-integrasjonstester
- Forbedret funksjonstester-gren med omfattende dekningsverktøy### 📁 New Files

| Fil                                                      | Formål                                                 |
| -------------------------------------------------------- | ------------------------------------------------------ | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Skjematvang og verktøybeskrivelse sanitiseringsverktøy |
| `tests/unit/schema-coercion.test.mjs`                    | Enhetstester for skjematvang                           |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI-verktøyintegrasjonstester                          |
| `COVERAGE_PLAN.md`                                       | Planleggingsdokument for testdekning                   | ### 🐛 Bug Fixes |

-**Claude Spør Caching Passthrough**— Fikset cache_control-markører som ble strippet i Claude-passthrough-modus (Claude → OmniRoute → Claude), noe som førte til at Claude Code-brukere tømte sin Antropiske API-kvote 5-10 ganger raskere enn direkte tilkoblinger. OmniRoute bevarer nå klientens cache_control-markører når sourceFormat og targetFormat begge er Claude, og sikrer at hurtigbufring fungerer riktig og dramatisk reduserer tokenforbruk.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Plattformkjerne:**Implementert global tilstandshåndtering for skjulte modeller og kombinasjoner som hindrer dem i å rote katalogen eller lekke inn i tilkoblede MCP-agenter (#681). -**Stabilitet:**Oppdaterte streamingkrasj relatert til den opprinnelige antigravity-leverandørintegrasjonen mislykkes på grunn av uhåndterte udefinerte tilstandsmatriser (#684). -**Lokaliseringssynkronisering:**Implementerte en fullstendig overhalet `i18n`-synkronisering som oppdager manglende nestede JSON-egenskaper og ettertilpasser 30 lokaliteter sekvensielt (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Strømmestabilitet:**Fikset "hasValuableContent" som returnerer "udefinert" for tomme deler i SSE-strømmer (#676). -**Tool Calling:**Rettet et problem i `sseParser.ts` der ikke-streamende Claude-svar med flere verktøykall droppet `id`en` for påfølgende verktøykall på grunn av feil indeksbasert deduplisering (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Verktøynavn som 'TodoWrite' er ikke lenger prefikset med 'proxy\_' i Claude passthrough-svar (både streaming og ikke-streaming). Inkluderer enhetstestdekning (PR #663 av @coobabm) -**Slett alle modellers aliasopprydding**— "Slett alle modeller"-knappen fjerner nå også tilknyttede modellaliaser, og forhindrer spøkelsesmodeller i brukergrensesnittet (PR #664 av @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Satsbegrensede kontoer gjenopprettes nå automatisk når nedkjølingsvinduet deres utløper, og fikser en fastlåsning der høye "backoffLevel" permanent deprioriterte kontoer (PR #657 av @brendandebeasi)### 🌍 i18n

-**Kinesisk oversettelsesoverhaling**— Omfattende omskriving av `zh-CN.json` med forbedret nøyaktighet (PR #658 av @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**— Eksplisitt 'stream: true' i forespørselsteksten har nå prioritet over 'Accept: application/json'-header. Klienter som sender begge vil motta SSE-streamingsvar på riktig måte (#656)### 🌍 i18n

-**Tsjekkiske strengforbedringer**— Avgrenset terminologi på tvers av `cs.json` (PR #655 av @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 manglende oversettelsesnøkler**lagt til 'en.json' og 12 språk (PR #652 av @zen0bit) -**Tsjekkisk dokumentasjon oppdatert**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guider (PR #652) -**Oversettelsesvalideringsskript**— `check_translations.py` og `validate_translation.py` for CI/QA (PR #651 av @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritisk: Regresjon for verktøykalling**— Rettet «proxy*Bash»-feil ved å deaktivere «proxy*»-verktøynavnprefikset i Claude-gjennomgangsbanen. Verktøy som `Bash`, `Read`, `Write` ble omdøpt til `proxy_Bash`, `proxy_Read` osv., noe som fikk Claude til å avvise dem (#618) -**Kiro Account Ban Documentation**— Dokumentert som oppstrøms AWS anti-svindel falsk positiv, ikke et OmniRoute-problem (#649)### 🧪 Tests

-**936 tester, 0 feil**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Vision Capability Metadata**: Lagt til "capabilities.vision", "input_modalities" og "output_modalities" til "/v1/models"-oppføringer for visjonskompatible modeller (PR #646) -**Gemini 3.1-modeller**: Lagt til "gemini-3.1-pro-preview" og "gemini-3.1-flash-lite-preview" til Antigravity-leverandøren (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-feil**: Rettet feil API-base-URL – endret fra `api.ollama.com` til offisiell `ollama.com/v1/chat/completions` (#643) -**Utløpt tokenforsøk**: Lagt til et begrenset forsøk på nytt med eksponentiell backoff (5→10→20 min) for utløpte OAuth-tilkoblinger i stedet for å hoppe over dem permanent (PR #647)### 🧪 Tests

-**936 tester, 0 feil**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub-problemmaler**: Lagt til standardisert feilrapport, funksjonsforespørsel og konfigurasjons-/proxyproblemmaler (#641) -**Slett alle modeller**: Lagt til en "Slett alle modeller"-knapp på leverandørens detaljside med i18n-støtte på 29 språk (#634)### 🐛 Bug Fixes

-**Local Conflict (`in.json`)**: Omdøpte Hindi locale-filen fra `in.json` (indonesisk ISO-kode) til `hi.json` for å fikse oversettelseskonflikter i Weblate (#642) -**Navn på kodex tomme verktøy**: Flyttet verktøynavnsanering før den opprinnelige Codex-gjennomgangen, og fikset 400 feil fra oppstrømsleverandører når verktøy hadde tomme navn (#637) -**Streaming Newline Artifacts**: Lagt til "collapseExcessiveNewlines" til responsdesinfeksjonsmiddelet, og kollapset serier av 3+ påfølgende nylinjer fra tenkemodeller til en standard dobbel nylinje (#638) -**Claude Reasoning Effort**: Konverterte OpenAI `reasoning_effort`-param til Claudes opprinnelige `tenke`-budsjettblokk på tvers av alle forespørselsbaner, inkludert automatisk `max_tokens`-justering (#627) -**Qwen Token Refresh**: Implementert proaktive OAuth-token-oppdateringer før utløp (5-minutters buffer) for å forhindre at forespørsler mislykkes ved bruk av kortvarige tokens (#631)### 🧪 Tests

-**936 tester, 0 feil**(+10 tester siden 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-tokens i Claude Code / klientsvar (#617):**

- `sanitizeUsage()` krysser nå `input_tokens`→`prompt_tokens` og `output_tokens`→`completion_tokens` før hvitelistefilteret, og fikser svar som viser NaN/0-tokentellinger når leverandører returnerer Claude-stil bruksfeltnavn### Sikkerhet

- Oppdatert "yaml"-pakke for å fikse sårbarhet for stabeloverflyt (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Lukket #613 (Codestral — løst med tilpasset leverandør-løsning)
- Kommenterte #615 (OpenCode dual-endpoint — løsning gitt, sporet som funksjonsforespørsel)
- Kommenterte #618 (verktøysamtalesynlighet — ber om v3.0.9-test)
- Kommenterte #627 (innsatsnivå — støttes allerede)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Oversettelsesfeil for OpenAI-formatleverandører i Claude CLI (#632):**

- Håndter "reasoning_details[]" matriseformat fra StepFun/OpenRouter - konverterer til "reasoning_content"
- Håndter "reasoning"-feltalias fra noen leverandører → normalisert til "reasoning_content"
- Navn på felt for krysskart: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` i `filterUsageForFormat`
- Fiks `extractUsage` for å godta både `input_tokens`/`output_tokens` og `prompt_tokens`/`completion_tokens` som gyldige bruksfelt
- Brukes på både streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` oversetter) og ikke-streaming (`sanitizeMessage`) baner---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Rettet «client_secret is missing»-feil for npm-installerte brukere — «clientSecretDefault» var tom i providerRegistry, noe som førte til at Google avviste forespørsler om tokenoppdatering (#588) -**OpenCode Zen-modeller:**La til `modelsUrl` til OpenCode Zen-registeroppføringen slik at "Importer fra /modeller" fungerer korrekt (#612) -**Streaming-artefakter:**Rettet overflødige nye linjer igjen i svar etter stripping av thinking-tag-signatur (#626) -**Proxy Fallback:**Lagt til automatisk nytt forsøk uten proxy når SOCKS5-relé mislykkes -**Proxy-test:**Testendepunkt løser nå ekte legitimasjon fra DB via proxy-ID### ✨ New Features

-**Lekeplasskonto/nøkkelvelger:**Vedvarende, alltid synlig rullegardin for å velge spesifikke leverandørkontoer/nøkler for testing - henter alle tilkoblinger ved oppstart og filtrerer etter valgt leverandør -**CLI Tools Dynamic Models:**Modellvalg henter nå dynamisk fra `/v1/models` API – leverandører som Kiro viser nå hele modellkatalogen sin -**Antigravity Model List:**Oppdatert med Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; aktivert "passthroughModels" for dynamisk modelltilgang (#628)### 🔧 Maintenance

- Sammenslått PR #625 — Provider begrenser lysmodus bakgrunnsfiks---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Begrensninger/proxy:**Fast kodex-grensehenting for kontoer bak SOCKS5-proxyer – token-oppdatering kjører nå i proxy-kontekst -**CI:**Fikset integrasjonstest `v1/modeller` påstandsfeil i CI-miljøer uten leverandørforbindelser -**Innstillinger:**Proxy-testknapp viser nå suksess-/mislykkesresultater umiddelbart (tidligere skjult bak helsedata)### ✨ New Features

-**Lekeplass:**Lagt til rullegardinmenyen for kontovelger - test spesifikke tilkoblinger individuelt når en leverandør har flere kontoer### 🔧 Maintenance

- Sammenslått PR #623 — Korreksjon av LongCat API-base URL-bane---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Lagt til tag-grupperingsfunksjon til tilkoblingsdashbordet for å forbedre visuell organisering for kontoer med egendefinerte tagger.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Fikset "TextDecoder"-tilstandskorrupsjon inne i kombinasjonen "sanitize" TransformStream som forårsaket SSE forvansket utgang som samsvarer med multibyte-tegn (PR #614) -**Providers UI:**Gjengi HTML-tagger på en sikker måte i verktøytips for leverandørtilkoblingsfeil ved å bruke `dangerouslySetInnerHTML` -**Proxyinnstillinger:**Lagt til manglende "brukernavn" og "passord" egenskaper for nyttelast, slik at autentiserte proxyer kan verifiseres fra dashbordet. -**Provider API:**Bundet mykt unntak returnerer til "getCodexUsage" og forhindrer API HTTP 500-feil når tokenhenting mislykkes---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Auto-Sync-modeller:**Lagt til en brukergrensesnittbryter og 'sync-models'-endepunkt for å automatisk synkronisere modelllister per leverandør ved hjelp av en planlagt intervallplanlegger (PR #597)### 🐛 Bug Fixes

-**Tidsavbrudd:**Forhøyede standardproxyer `FETCH_TIMEOUT_MS` og `STREAM_IDLE_TIMEOUT_MS` til 10 minutter for å støtte dype resonnementmodeller (som o1) uten å avbryte forespørsler (fikser #609) -**CLI Tool Detection:**Forbedret deteksjon på tvers av plattformer som håndterer NVM-baner, Windows `PATHEXT` (forhindrer problem med `.cmd`-innpakninger) og tilpassede NPM-prefikser (PR #598) -**Streaming logger:**Implementert `tool_calls` delta-akkumulering i streaming responslogger slik at funksjonsanrop spores og vedvares nøyaktig i DB (PR #603) -**Modellkatalog:**Fjernet autentiseringsunntak, skjuler "comfyui" og "sdwebui"-modeller på riktig måte når ingen leverandør er eksplisitt konfigurert (PR #599)### 🌐 Translations

-**cs:**Forbedrede tsjekkiske oversettelsesstrenger i appen (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Lagt til et Tag/Group-felt i `EditConnectionModal` (lagret i `providerSpecificData.tag`) uten å kreve DB-skjemamigrering.
- Tilkoblinger i leverandørvisningen grupperes nå dynamisk etter tag med visuelle skillelinjer.
- Umerkede forbindelser vises først uten overskrift, etterfulgt av merkede grupper i alfabetisk rekkefølge.
- Tag-grupperingen gjelder automatisk for Codex/Copilot/Antigravity Limits-seksjonen siden vekslere finnes i tilkoblingsrader.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Manglende merker på tilkoblingskort:**Rettet ved å bruke `resolveProxyForConnection()` i stedet for statisk kartlegging. -**Testtilkobling deaktivert i lagret modus:**Aktiverte Test-knappen ved å løse proxy-konfigurasjon fra den lagrede listen. -**Config Modal freezing:**Lagt til `onClose()`-kall etter lagring/slett for å forhindre at brukergrensesnittet fryser. -**Dobbeltbrukstelling:**`ProxyRegistryManager` laster nå bruk ivrig ved montering med deduplisering med `scope` + `scopeId`. Brukstall ble erstattet med en testknapp som viser IP/latency inline.#### fix(translator): `function_call` prefix stripping

- Reparerte en ufullstendig rettelse fra PR #607 der bare `tool_use`-blokker fjernet Claudes `proxy_`-verktøyprefiks. Nå vil klienter som bruker OpenAI Responses API-formatet også motta verktøyverktøy på riktig måte uten "proxy\_"-prefikset.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tre kritiske regresjoner rapportert av brukere etter v3.0.0-lanseringen er løst.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

`Proxy_`-prefikset lagt til av Claude OAuth ble bare fjernet fra**streaming**-svar. I**ikke-streaming**-modus hadde ikke `translateNonStreamingResponse` tilgang til `toolNameMap`, noe som førte til at klienter fikk ødelagte verktøynavn som `proxy_read_file` i stedet for `read_file`.

**Fix:**Lagt til valgfri `toolNameMap`-parameter til `translateNonStreamingResponse` og brukt prefiksstripping i Claude `tool_use`-blokkbehandleren. `chatCore.ts` passerer nå kartet.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI avslører ikke `GET /v1/modeller`. Den generiske `validateOpenAICompatibleProvider`-validatoren falt gjennom til en tilbakemelding for chat-fullføringer bare hvis `validationModelId` ble satt, som LongCat ikke konfigurerer. Dette førte til at leverandørvalideringen mislyktes med en villedende feil ved legg til/lagre.

**Fix:**La til "longcat" på kartet for spesialitetsvalidering, undersøkte "/chat/fullføringer" direkte og behandlet ethvert ikke-godkjenningssvar som et pass.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-verktøy (f.eks. `pencil`, `computer_use`) videresender verktøydefinisjoner med `{type:"objekt"}` men uten et `egenskaper`-felt. Anthropics API avviser disse med: `objektskjema mangler egenskaper`.

**Fix:**I `openai-to-claude.ts`, injiser `egenskaper: {}` som en sikker standard når `type` er `"objekt"` og `egenskaper` er fraværende.---

### 🔀 Community PRs Merged (2)

| PR       | Forfatter | Sammendrag                                                                   |
| -------- | --------- | ---------------------------------------------------------------------------- | --- |
| **#589** | @flobo3   | docs(i18n): fikse russisk oversettelse for Playground og Testbed             |
| **#591** | @rdself   | fix(ui): forbedre leverandøren begrenser lysmoduskontrast og plannivåvisning | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 tester, 0 feil**(uendret fra v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Den største utgivelsen noensinne.**Fra 36 leverandører i v2.9.5 til**67+ leverandører**i v3.0.0 — med MCP-server, A2A-protokoll, automatisk kombinasjonsmotor, leverandørikoner, Registered Keys API, 926 tester og bidrag fra**12 fellesskapsmedlemmer**på tvers av\*\*10 sammenslåtte PR-er.
>
> Konsolidert fra v3.0.0-rc.1 til og med rc.17 (17 utgivelseskandidater over 3 dager med intens utvikling).---

### 🆕 New Providers (+31 since v2.9.5)

| Leverandør                    | Alias ​​        | Nivå          | Merknader                                                                            |
| ----------------------------- | --------------- | ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **OpenCode Zen**              | `opencode-zen`  | Gratis        | 3 modeller via `opencode.ai/zen/v1` (PR #530 av @kang-heewon)                        |
| **OpenCode Go**               | `opencode-go`   | Betalt        | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 av @kang-heewon)                     |
| **LongCat AI**                | `lc`            | Gratis        | 50M tokens/dag (Flash-Lite) + 500K/dag (Chat/Thinking) under offentlig beta          |
| **Pollinasjoner AI**          | `pol`           | Gratis        | Ingen API-nøkkel nødvendig — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**     | `cf`            | Gratis        | 10K nevroner/dag — ~150 LLM-svar eller 500s Whisper-lyd, kantslutning                |
| **Scaleway AI**               | `scw`           | Gratis        | 1M gratis tokens for nye kontoer – EU/GDPR-kompatibel (Paris)                        |
| **AI/ML API**                 | `mål`           | Gratis        | $0,025/dag gratis kreditter — 200+ modeller via enkelt endepunkt                     |
| **Puter AI**                  | `pu`            | Gratis        | 500+ modeller (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)              |
| **Alibaba Cloud (DashScope)** | `ali`           | Betalt        | Internasjonale + Kina-endepunkter via `alicode`/`alicode-intl`                       |
| **Alibaba-kodeplan**          | `bcp`           | Betalt        | Alibaba Model Studio med Anthropic-kompatibel API                                    |
| **Kimi-koding (API-nøkkel)**  | `kmca`          | Betalt        | Dedikert API-nøkkelbasert Kimi-tilgang (atskilt fra OAuth)                           |
| **MiniMax-koding**            | `minimax`       | Betalt        | Internasjonalt endepunkt                                                             |
| **MiniMax (Kina)**            | `minimax-cn`    | Betalt        | Kina-spesifikt endepunkt                                                             |
| **Z.AI (GLM-5)**              | `zai`           | Betalt        | Zhipu AI neste generasjons GLM-modeller                                              |
| **Vertex AI**                 | `vertex`        | Betalt        | Google Cloud — Tjenestekonto JSON eller OAuth access_token                           |
| **Ollama Cloud**              | `ollamacloud`   | Betalt        | Ollamas vertsbaserte API-tjeneste                                                    |
| **Syntetisk**                 | `syntetisk`     | Betalt        | Passthrough-modeller gateway                                                         |
| **Kilo Gateway**              | `kg`            | Betalt        | Passthrough-modeller gateway                                                         |
| **Forvirringssøk**            | `pplx-søk`      | Betalt        | Dedikert søkebasert endepunkt                                                        |
| **Serpersøk**                 | `serper-search` | Betalt        | Nettsøk API-integrasjon                                                              |
| **Modig søk**                 | `brave-search`  | Betalt        | Brave Search API-integrasjon                                                         |
| **Exa Search**                | `exa-søk`       | Betalt        | Neural Search API-integrasjon                                                        |
| **Tavily-søk**                | `tavily-search` | Betalt        | AI-søk API-integrasjon                                                               |
| **NanoBanana**                | `nb`            | Betalt        | Bildegenererings-API                                                                 |
| **ElevenLabs**                | `el`            | Betalt        | Tekst-til-tale stemmesyntese                                                         |
| **Cartesia**                  | `cartesia`      | Betalt        | Ultrarask TTS-stemmesyntese                                                          |
| **PlayHT**                    | `playht`        | Betalt        | Stemmekloning og TTS                                                                 |
| **Inworld**                   | `inworld`       | Betalt        | AI karakter stemmechat                                                               |
| **SD WebUI**                  | `sdwebui`       | Egen vertskap | Stabil diffusjon lokal bildegenerering                                               |
| **ComfyUI**                   | `comfyui`       | Egen vertskap | ComfyUI lokal arbeidsflyt nodebasert generasjon                                      |
| **GLM-koding**                | `glm`           | Betalt        | BigModel/Zhipu-kodingsspesifikt endepunkt                                            | **Totalt: 67+ leverandører**(4 gratis, 8 OAuth, 55 API-nøkler) + ubegrensede OpenAI/Anthropic-kompatible tilpassede leverandører.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerer og utsted OmniRoute API-nøkler programmatisk med kvotehåndhevelse per leverandør og per konto.

| Endepunkt                       | Metode       | Beskrivelse                                             |
| ------------------------------- | ------------ | ------------------------------------------------------- |
| `/api/v1/registered-keys`       | `POST`       | Utsted en ny nøkkel – rånøkkel returnert**kun én gang** |
| `/api/v1/registered-keys`       | `GET`        | Liste registrerte nøkler (maskert)                      |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Hent metadata / Tilbakekall                             |
| `/api/v1/quotas/check`          | `GET`        | Forhåndsvalider kvoten før utstedelse                   |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Konfigurer utstedelsesgrenser per leverandør            |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Konfigurer utstedelsesgrenser per konto                 |
| `/api/v1/issues/rapport`        | `POST`       | Rapporter kvotehendelser til GitHub-problemer           |

**Sikkerhet:**Nøkler lagret som SHA-256-hash. Rå nøkkel vist én gang ved opprettelse, kan aldri hentes igjen.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ leverandørlogoer som bruker `@lobehub/icons` React-komponenter (SVG). Reservekjede:**Lobehub SVG → eksisterende PNG → generisk ikon**. Brukes på dashbord-, leverandører og agentsider med standardisert `ProviderIcon`-komponent.#### 🔄 Model Auto-Sync Scheduler (#488)

Oppdaterer modelllister automatisk for tilkoblede leverandører hver**24 timer**. Kjører ved oppstart av server. Konfigurerbar via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Kartlegg modellnavnmønstre (glob) til spesifikke kombinasjoner for automatisk ruting:

- `claude-sonnett*` → kodekombinasjon, `gpt-4o*` → openai-kombo, `gemini-*` → google-kombo
- Ny "model_combo_mappings"-tabell med glob-to-regex-matching
- Dashboard UI-seksjon: "Model Routing Rules" med innebygd legg til/rediger/veksle/slett#### 🧭 API Endpoints Dashboard

Interaktiv katalog, webhooks-administrasjon, OpenAPI-visningsprogram – alt i én faneside på `/dashboard/endepunkt`.#### 🔍 Web Search Providers

5 nye søkeleverandørintegrasjoner:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— muliggjør jordede AI-svar med sanntids nettdata.#### 📊 Search Analytics

Ny fane i `/dashboard/analytics` — leverandøroppdeling, hurtigbuffertrefffrekvens, kostnadssporing. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Kolonnene `max_requests_per_day` og `max_requests_per_minute` med skyvevindu i minnet som returnerer HTTP 429.#### 🎵 Media Playground

Full mediegenerasjonslekeplass på `/dashboard/media`: Bildegenerering, video, musikk, lydtranskripsjon (2 GB opplastingsgrense) og tekst-til-tale.---

### 🔒 Security & CI/CD

-**CodeQL remediation**— Fast 10+ varsler: 6 polynom-redos, 1 usikker tilfeldighet (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection -**Rutevalidering**- Zod-skjemaer + `validateBody()` på**176/176 API-ruter**- CI håndhevet -**CVE-fix**— dompurify XSS-sårbarhet (GHSA-v2wj-7wpq-c8vv) løst via npm-overstyringer -**Flatt**— Bumped 3.3.3 → 3.4.2 (CWE-1321 prototype forurensning) -**Docker**— Oppgradert `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: fjern handlingsfeil når «GEMINI_OAUTH_CLIENT_SECRET» mangler i Docker -**#549**— CLI-innstillingsruter løser nå ekte API-nøkkel fra `keyId` (ikke maskerte strenger) -**#574**— Pålogging fryser ikke lenger etter å ha hoppet over oppsett av veiviserpassord -**#506**— «machineId» på tvers av plattformer skrevet om (Windows REG.exe → macOS ioreg → Linux → reservevertsnavn)#### Providers & Routing

-**#536**— LongCat AI: fast «baseUrl» og «authHeader» -**#535**— Overstyring av festet modell: «body.model» er riktig satt til «pinnedModel» -**#570**— Uprefikserte Claude-modeller går nå over til Antropisk leverandør -**#585**— «<omniModel>» interne tagger lekker ikke lenger til klienter i SSE-strømming -**#493**— Egendefinert leverandørmodellnavn blir ikke lenger ødelagt av prefiksstripping -**#490**— Streaming + kontekstbufferbeskyttelse via 'TransformStream'-injeksjon -**#511**— «<omniModel>»-tag injisert i første innholdsdel (ikke etter «[DONE]»)#### CLI & Tools

-**#527**— Claude Code + Codex loop: «tool_result»-blokker nå konvertert til tekst -**#524**— OpenCode-konfigurasjon lagret riktig (XDG_CONFIG_HOME, TOML-format) -**#522**— API Manager: fjernet den villedende knappen "Kopier maskert nøkkel". -**#546**— `--versjon` returnerer `ukjent` på Windows (PR av @k0valik) -**#544**— Sikker CLI-verktøydeteksjon via kjente installasjonsveier (PR av @k0valik) -**#510**— Windows MSYS2/Git-Bash-baner normalisert automatisk -**#492**— CLI oppdager `mise`/`nvm`-administrert node når `app/server.js` mangler#### Streaming & SSE

-**PR #587**— Tilbakestill `resolveDataDir`-import i responsesTransformer for Cloudflare Workers-kompat (@k0valik) -**PR #495**— Flaskehals 429 uendelig ventetid: slipp ventende jobber på satsgrense (@xandr0s) -**#483**— Stopp etterfølgende `data: null` etter `[DONE]`-signal -**#473**— Zombie SSE-strømmer: tidsavbrudd redusert 300s → 120s for raskere fallback#### Media & Transcription

-**Transkripsjon**— Deepgram `video/mp4` → `audio/mp4` MIME-kartlegging, automatisk språkdeteksjon, tegnsetting -**TTS**— «[object Object]» feilvisning fikset for nestede feil i ElevenLabs-stil -**Opplastingsgrenser**— Medietranskripsjon økt til 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— «requested_model»-kolonnen i anropslogger (migrering 009) -**T02**— Fjern tomme tekstblokker fra nestede `tool_result.content` -**T03**— Parse «x-codex-5h-_» / «x-codex-7d-_» kvoteoverskrifter -**T04**— 'X-Session-Id'-header for ekstern klebrig ruting -**T05**— Rate-limit DB persistens med dedikert API -**T06**— Konto deaktivert → permanent blokkering (1 års nedkjøling) -**T07**— X-Forwarded-For IP-validering (`extractClientIp()`) -**T08**— Sesjonsgrenser per API-nøkkel med håndheving av skyvevinduer -**T09**— Codex vs Spark rate-grenseomfang (separate bassenger) -**T10**— Kreditter oppbrukt → tydelig 1t nedkjøling fallback -**T11**— `maks` resonnementinnsats → 131072 budsjettsymboler -**T12**— MiniMax M2.7-prisoppføringer -**T13**— Foreldet kvotevisning (tilbakestill vindusbevissthet) -**T14**— TCP-kontroll med rask sviktende proxy (≤2s, bufret 30s) -**T15**— Normalisering av matriseinnhold for Anthropic -**T23**— Intelligent tilbakestilling av kvotetilbakestilling (overskriftsutvinning) -**T24**— '503' nedkjøling + '406' kartlegging -**T25**— Tilbakestilling for leverandørvalidering -**T29**— Vertex AI Service Account JWT auth -**T33**— Tenkenivå til budsjettkonvertering -**T36**— '403' vs '429' feilklassifisering -**T38**— Sentraliserte modellspesifikasjoner (`modelSpecs.ts`) -**T39**— Endpoint-backup for «fetchAvailableModels». -**T41**— Automatisk omdirigering av bakgrunnsoppgave til flash-modeller -**T42**— Kartlegging av sideforhold for bildegenerering#### Other Improvements

-**Per-modell oppstrøms tilpassede overskrifter**— via konfigurasjonsgrensesnittet (PR #575 av @zhangqiang8vip) -**Modelkontekstlengde**— konfigurerbar i modellmetadata (PR #578 av @hijak) -**Striping av modellprefiks**— mulighet for å fjerne leverandørprefiks fra modellnavn (PR #582 av @jay77721) -**Gemini CLI-avvikling**— merket som avviklet med Google OAuth-begrensningsadvarsel -**YAML-parser**- erstattet tilpasset parser med 'js-yaml' for korrekt OpenAPI-spesifikasjonsanalyse -**ZWS v5**— HMR-lekkasjeretting (485 DB-tilkoblinger → 1, minne 2,4 GB → 195 MB) -**Loggeksport**— Ny JSON-eksportknapp på dashbordet med rullegardinmeny for tidsrom -**Oppdater varslingsbanner**- dashbordhjemmesiden viser når nye versjoner er tilgjengelige---

### 🌐 i18n & Documentation

-**30 språk**med 100 % paritet — 2788 manglende nøkler synkronisert -**Tsjekkisk**— Full oversettelse: 22 dokumenter, 2606 UI-strenger (PR av @zen0bit) -**Kinesisk (zh-CN)**- Fullstendig ny oversettelse (PR av @only4copilot) -**VM Deployment Guide**— Oversatt til engelsk som kildedokument -**API-referanse**— Lagt til "/v1/embeddings" og "/v1/audio/speech" endepunkter -**Tall leverandør**— Oppdatert fra 36+/40+/44+ til**67+**på tvers av README og alle 30 i18n README-er---

### 🔀 Community PRs Merged (10)

| PR       | Forfatter       | Sammendrag                                                                 |
| -------- | --------------- | -------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): tilbakestill resolveDataDir-import for Cloudflare Workers-kompat |
| **#582** | @jay77721       | feat(proxy): modellnavn prefiks stripping option                           |
| **#581** | @jay77721       | fix(npm): koble elektron-frigjøring til npm-publisering arbeidsflyt        |
| **#578** | @hijak          | feat: konfigurerbar kontekstlengde i modellens metadata                    |
| **#575** | @zhangqiang8vip | prestasjon: per-modell oppstrøms headers, compat PATCH, chat justering     |
| **#562** | @coobabm        | fix: MCP-sesjonsadministrasjon, Claude passthrough, detectFormat           |
| **#561** | @zen0bit        | fix(i18n): Tsjekkiske oversettelseskorreksjoner                            |
| **#555** | @k0valik        | fix(sse): sentralisert `resolveDataDir()` for baneoppløsning               |
| **#546** | @k0valik        | fix(cli): `--version` returnerer `ukjent` på Windows                       |
| **#544** | @k0valik        | fix(cli): sikker CLI-verktøydeteksjon via installasjonsveier               |
| **#542** | @rdself         | fix(ui): lysmodus kontrast CSS-temavariabler                               |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go-leverandører med `OpencodeExecutor`                |
| **#512** | @zhangqiang8vip | feat: modellkompatibilitet per protokoll (`compatByProtocol`)              |
| **#497** | @zhangqiang8vip | fikse: dev-modus HMR ressurslekkasjer (ZWS v5)                             |
| **#495** | @xandr0s        | fikse: Flaskehals 429 uendelig venting (slipp venter jobber)               |
| **#494** | @zhangqiang8vip | feat: MiniMax-utvikler→systemrollefiks                                     |
| **#480** | @prakersh       | fikse: utvinning av strømspyling                                           |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 og antropiske prisoppføringer                          |
| **#475** | @only4copilot   | feat(i18n): forbedret kinesisk oversettelse                                |

**Takk til alle bidragsytere!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` ``#492`# 5063` `#5063` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` ``#537`# 5461` `#537`# 5461` `#570` `#574` `#585`---

### 🧪 Tests

-**926 tester, 0 feil**(opp fra 821 i v2.9.5)

- +105 nye tester som dekker: modell-kombinasjonskartlegginger, registrerte nøkler, OpencodeExecutor, Bailian-leverandør, rutevalidering, feilklassifisering, sideforholdskartlegging og mer---

### 📦 Database Migrations

| Migrasjon | Beskrivelse                                                             |
| --------- | ----------------------------------------------------------------------- | --- |
| **008**   | `registered_keys`, `provider_key_limits`, `account_key_limits` tabeller |
| **009**   | `requested_model`-kolonnen i `call_logs`                                |
| **010**   | `model_combo_mappings`-tabell for kombinasjonsruting per modell         | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Avbrytende endringer:**Ingen. Alle eksisterende konfigurasjoner, kombinasjoner og API-nøkler er bevart.
> Databasemigreringer 008-010 kjøres automatisk ved oppstart.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL remediering**— Fikset 10+ varsler:

- 6 polynom-redos i `provider.ts` / `chatCore.ts` (erstattet `(?:^|/)` alterneringsmønstre med segmentbasert matching)
- 1 usikker tilfeldighet i `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection i `prepublish.mjs` (`JSON.stringify()`-bane unnslipper) -**Rutevalidering**— Lagt til Zod-skjemaer + `validateBody()` til 5 ruter som mangler validering:
- `modell-kombo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` passerer nå:**176/176 ruter validert**### 🐛 Bug Fixes

-**#585**— «<omniModel>» interne tagger lekker ikke lenger til klienter i SSE-svar. Lagt til "TransformStream" for utgående sanitisering i "combo.ts".### ⚙️ Infrastructure

-**Docker**— Oppgradert «docker/setup-buildx-action» fra v3 → v4 (Node.js 20-avviklingsfiks) -**CI-opprydding**— Slettet 150+ mislykkede/kansellerte arbeidsflytkjøringer### 🧪 Tests

- Testpakke:**926 tester, 0 feil**(+3 nye)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Økte grenser for medietranskripsjon
- Lagt til modellkontekstlengde til registermetadata
- Lagt til oppstrøms tilpassede overskrifter per modell via konfigurasjonsgrensesnittet
- Fikset flere feil, Zod-validering for patcher og løst ulike fellesskapsproblemer.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Kombinasjonsruting per modell: kartlegg modellnavnmønstre (glob) til spesifikke kombinasjoner for automatisk ruting

- Ny "model_combo_mappings"-tabell (migrering 010) med mønster, combo_id, priority, aktivert
- `resolveComboForModel()` DB-funksjon med glob-to-regex-matching (uavhengig av store og små bokstaver, `*` og `?` jokertegn)
- `getComboForModel()` i `model.ts`: utvider `getCombo()` med modellmønster-reserveback
- `chat.ts`: rutingbeslutning sjekker nå modellkombinasjonstilordninger før enkeltmodellhåndtering
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: "Model Ruting Rules"-delen lagt til på Combos-siden med innebygd legg til/rediger/veksle/slett
- Eksempler: `claude-sonnett*` → kodekombinasjon, `gpt-4o*` → openai-kombo, `gemini-*` → google-kombinasjon### 🌐 i18n

-**Full i18n Sync**: 2788 manglende nøkler lagt til på tvers av 30 språkfiler - alle språk nå med 100 % paritet med 'en.json' -**Agentside i18n**: OpenCode-integrasjonsseksjonen er fullstendig internasjonalisert (tittel, beskrivelse, skanning, nedlastingsetiketter) -**6 nye nøkler**lagt til i `agents` navneområde for OpenCode-delen### 🎨 UI/UX

-**Leverandørikoner**: 16 manglende leverandørikoner lagt til (3 kopiert, 2 lastet ned, 11 SVG opprettet) -**SVG-reserve**: `ProviderIcon`-komponent oppdatert med 4-lags strategi: Lobehub → PNG → SVG → Generisk ikon -**Fingeravtrykk av agenter**: Synkronisert med CLI-verktøy - lagt til droid, openclaw, copilot, opencode til fingeravtrykksliste (totalt 14)### Sikkerhet

-**CVE-fix**: Løst dompurify XSS-sårbarhet (GHSA-v2wj-7wpq-c8vv) via npm-overstyringer som tvinger `dompurify@^3.3.2`

- `npm audit` rapporterer nå**0 sårbarheter**### 🧪 Tests

- Testpakke:**923 tester, 0 feil**(+15 nye modellkombinasjonskartleggingstester)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Forfatter | Sammendrag                                                                                       |
| -------- | --------- | ------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm  | fix(ux): MCP-sesjonsadministrasjon, Claude passthrough-normalisering, OAuth-modal, detectFormat  |
| **#561** | @zen0bit  | fix(i18n): Tsjekkiske oversettelseskorreksjoner — HTTP-metodenavn og dokumentasjonsoppdateringer | ### 🧪 Tests |

- Testpakke:**908 tester, 0 feil**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**løs ekte API-nøkkel fra `keyId` i CLI-innstillingsruter (`codex-settings`, `droid-settings`, `kilo-settings`) for å forhindre skriving av maskerte strenger (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Forfatter | Sammendrag                                                                                                                                                            |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik  | fix(cli): `--versjon` returnerer `ukjent` på Windows — bruk `JSON.parse(readFileSync)` i stedet for ESM-import                                                        |
| **#555** | @k0valik  | fix(sse): sentralisert `resolveDataDir()` for baneoppløsning i legitimasjon, autoCombo, svarlogger og forespørselslogger                                              |
| **#544** | @k0valik  | fix(cli): sikker CLI-verktøydeteksjon via kjente installasjonsbaner (8 verktøy) med symlinkvalidering, filtypekontroller, størrelsesgrenser, minimal env i helsesjekk |
| **#542** | @rdself   | fix(ui): forbedre lysmoduskontrasten — legg til manglende CSS-temavariabler (`bg-primary`, `bg-subtle`, `text-primary`) og fikser kun mørke farger i loggdetaljer     | ### 🔧 Bug Fixes |

-**TDZ-fiks i `cliRuntime.ts`**— `validateEnvPath` ble brukt før initialisering ved moduloppstart av `getExpectedParentPaths()`. Omorganiserte erklæringer for å fikse "ReferenceError". -**Byggrettinger**— La til `pino` og `pino-pretty` til `serverExternalPackages` for å forhindre at Turbopack bryter Pinos interne arbeiderinnlasting.### 🧪 Tests

- Testpakke:**905 tester, 0 feil**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Elektronbyggregresjon: nedgradert Next.js fra `16.1.x` til `16.0.10` for å eliminere Turbopack-modulhashing-ustabilitet som forårsaket tomme skjermer i Electron-skrivebordspakken. -**Enhetstestrettelser**— Korrigerte to foreldede testpåstander (`nanobanana-image-handler` sideforhold/oppløsning, `tenkebudsjett` Gemini `thinkingConfig` feltkartlegging) som hadde drevet etter nylige implementeringsendringer. -**#541**— Reagerte på tilbakemeldinger fra brukere om installasjonens kompleksitet; ingen kodeendringer kreves.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementert ved å bruke "jose"-biblioteket for å håndtere JWT/Service Account auth, sammen med konfigurerbare regioner i brukergrensesnittet og automatisk partnermodell URL-bygging. -**T42**— Kartlegging av bildegenerering av sideforhold: opprettet `sizeMapper`-logikk for generiske OpenAI-formater (`størrelse`), lagt til native `imagen3`-håndtering og oppdaterte NanoBanana-endepunkter for å bruke kartlagte sideforhold automatisk. -**T38**— Sentraliserte modellspesifikasjoner: `modelSpecs.ts` opprettet for grenser og parametere per modell.### 🔧 Improvements

-**T40**— OpenCode CLI-verktøyintegrasjon: innfødt `opencode-zen` og `opencode-go` integrasjon fullført i tidligere PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` nedkjøling avventer rettelse + `406` kartlegging: kartlagt `406 ikke akseptabelt` til `503 Service Utilgjengelig` med riktige nedkjølingsintervaller. -**T25**— Provider validation fallback: grasiøs fallback til standard valideringsmodeller når en spesifikk "validationModelId" ikke er til stede. -**T36**— `403` vs `429` leverandørhåndteringsavgrensning: trukket ut i `errorClassifier.ts` for å skille harde tillatelsesfeil (`403`) fra hastighetsgrenser (`429`). -**T39**— Endpoint Fallback for `fetchAvailableModels`: implementerte en tri-tier-mekanisme (`/models` -> `/v1/models` -> lokal generisk katalog) + `list_models_catalog` MCP-verktøyoppdateringer for å gjenspeile `kilde` og `advarsel`. -**T33**— Tenkenivå til budsjettkonvertering: oversetter kvalitative tenkenivåer til presise budsjettallokeringer. -**T41**— Automatisk omdirigering av bakgrunnsoppgaver: ruter tunge bakgrunnsevalueringsoppgaver til flash/effektive modeller automatisk. -**T23**— Intelligent tilbakestilling av kvotetilbakestilling: trekker nøyaktig ut «x-ratelimit-reset» / «retry-after»-overskriftsverdier eller kartlegger statiske nedkjølinger.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Oppgradering fra v2.9.5:**16 problemer løst · 2 fellesskaps-PR-er slått sammen · 2 nye leverandører · 7 nye API-endepunkter · 3 nye funksjoner · DB-migrering 008+009 · 832 tester bestått · 15 sub2api gap-forbedringer (T01–T15 fullført).### 🆕 New Providers

| Leverandør       | Alias ​​       | Nivå   | Merknader                                                        |
| ---------------- | -------------- | ------ | ---------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratis | 3 modeller via `opencode.ai/zen/v1` (PR #530 av @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Betalt | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 av @kang-heewon) |

Begge leverandørene bruker den nye `OpencodeExecutor` med multi-format ruting (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerer og utsted OmniRoute API-nøkler programmatisk med kvotehåndhevelse per leverandør og per konto.

| Endepunkt                             | Metode    | Beskrivelse                                             |
| ------------------------------------- | --------- | ------------------------------------------------------- |
| `/api/v1/registered-keys`             | `POST`    | Utsted en ny nøkkel – rånøkkel returnert**kun én gang** |
| `/api/v1/registered-keys`             | `GET`     | Liste registrerte nøkler (maskert)                      |
| `/api/v1/registered-keys/{id}`        | `GET`     | Få nøkkelmetadata                                       |
| `/api/v1/registered-keys/{id}`        | `SLETT`   | Tilbakekalle en nøkkel                                  |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Tilbakekall (for klienter uten DELETE-støtte)           |
| `/api/v1/quotas/check`                | `GET`     | Forhåndsvalider kvoten før utstedelse                   |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Konfigurer utstedelsesgrenser per leverandør            |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Konfigurer utstedelsesgrenser per konto                 |
| `/api/v1/issues/rapport`              | `POST`    | Rapporter kvotehendelser til GitHub-problemer           |

**DB — Migration 008:**Tre nye tabeller: `registrerte_nøkler`, `provider_key_limits`, `account_key_limits`.
**Sikkerhet:**Nøkler lagret som SHA-256-hash. Rå nøkkel vist én gang ved opprettelse, kan aldri hentes igjen.
**Kvotetyper:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per leverandør og per konto.
**Idempotens:**`idempotency_key`-feltet forhindrer duplikatutstedelse. Returnerer «409 IDEMPOTENCY_CONFLICT» hvis nøkkelen allerede er brukt.
**Budsjett per nøkkel:**`dailyBudget` / `hourlyBudget` – begrenser hvor mange forespørsler en nøkkel kan rute per vindu.
**GitHub-rapportering:**Valgfritt. Sett `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` for å automatisk opprette GitHub-problemer ved overskredet kvote eller utstedelsesfeil.#### 🎨 Provider Icons — @lobehub/icons (#529)

Alle leverandørikoner i dashbordet bruker nå `@lobehub/icons` React-komponenter (130+ leverandører med SVG).
Reservekjede:**Lobehub SVG → eksisterende `/providers/{id}.png` → generisk ikon**. Bruker et riktig React `ErrorBoundary`-mønster.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute oppdaterer nå automatisk modelllister for tilkoblede leverandører hver**24 timer**.

- Kjører ved serveroppstart via den eksisterende `/api/sync/initialize`-kroken
- Konfigurerbar via miljøvariabelen `MODEL_SYNC_INTERVAL_HOURS`
- Dekker 16 store leverandører
- Registrerer siste synkroniseringstid i innstillingsdatabasen---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Fjern handlingsfeil når `GEMINI_OAUTH_CLIENT_SECRET` mangler i Docker/selvvertsbaserte distribusjoner. Tidligere vist kryptisk `client_secret is missing` fra Google. Gir nå spesifikke `docker-compose.yml` og `~/.omniroute/.env` instruksjoner.#### Providers & Routing

-**#536 — LongCat AI:**Fikset `baseUrl` (`api.longcat.chat/openai`) og `authHeader` (`Authorization: Bearer`). -**#535 — Overstyring av festet modell:**'body.model' er nå riktig satt til 'pinnedModel' når kontekstbufferbeskyttelsen er aktiv. -**#532 — OpenCode Go-nøkkelvalidering:**Bruker nå `zen/v1`-testendepunktet (`testKeyBaseUrl`) – samme nøkkel fungerer for begge nivåene.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**`tool_result`-blokker blir nå konvertert til tekst i stedet for droppet, og stopper uendelige verktøy-resultatløkker. -**#524 — OpenCode config save:**Lagt til `saveOpenCodeConfig()`-handler (XDG_CONFIG_HOME klar, skriver TOML). -**#521 — Pålogging fast:**Pålogging fryser ikke lenger etter å ha hoppet over passordoppsett — omdirigerer riktig til onboarding. -**#522 — API Manager:**Fjernet villedende "Kopier maskert nøkkel"-knapp (erstattet med et låsikonverktøytips). -**#532 — OpenCode Go config:**Guide-innstillingsbehandler håndterer nå `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Manglende «googleProjectId» returnerer en strukturert 422-feil med veiledning for gjenoppretting i stedet for en kryptisk krasj. -**#510 — Windows-baner:**MSYS2/Git-Bash-baner (`/c/Program Files/...`) normaliseres nå automatisk til `C:\Program Files\...`. -**#492 — CLI-oppstart:**`omniroute` CLI oppdager nå `mise`/`nvm`-administrert node når `app/server.js` mangler og viser målrettede reparasjonsinstruksjoner.---

### 📖 Documentation Updates

-**#513**— Tilbakestilling av Docker-passord: `INITIAL_PASSWORD` env var-løsning dokumentert -**#520**— pnpm: «pnpm approve-builds better-sqlite3» trinn dokumentert---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Forfatter    | Sammendrag                                                                 |
| -------- | ------------ | -------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go-leverandører med `OpencodeExecutor` og forbedrede tester | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` i `providers.ts`. Den eksisterende «rate_limited_until»-kolonnen er nå eksponert som en dedikert API – OAuth-tokenoppdatering må IKKE berøre dette feltet for å forhindre løkker med hastighetsgrense. -**T08**— Per-API-nøkkel øktgrense: `max_sessions INTEGER DEFAULT 0` lagt til `api_keys` via automatisk migrering. `sessionManager.ts` får `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` og `getActiveSessionCountForKey()`. Innringere i `chatCore.js` kan håndheve grensen og dekrementeringen på `req.close`. -**T09**— Codex vs Spark rate-limit scopes: `getCodexModelScope()` og `getCodexRateLimitKey()` i `codex.ts`. Standardmodeller (`gpt-5.x-codex`, `codex-mini`) får scope `"codex"`; gnistmodeller (`codex-spark*`) får scope `"gnist"`. Rate-limit-nøkler bør være `${accountId}:${scope}`, så utmatting av en pool blokkerer ikke den andre. -**T13**— Foreldet kvotevisning: `getEffectiveQuotaUsage(used, resetAt)` returnerer `0` når tilbakestillingsvinduet har passert; `formatResetCountdown(resetAt)` returnerer en menneskelig lesbar nedtellingsstreng (f.eks. `"2t 35m"`). Begge eksportert fra `providers.ts` + `localDb.ts` for dashbordforbruk. -**T14**— Proxy fast-fail: ny `src/lib/proxyHealth.ts` med `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP-sjekk, ≤2s i stedet for 30s timeout), `getCachedProxyHealth()`, `alth(a)Proxy `getAllProxyHealthStatuses()`. Resultater bufret 30s som standard; kan konfigureres via `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testpakke:**832 tester, 0 feil**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**- kolonnen "requested_model" i "call_logs" (migrering 009): spor hvilken modell klienten opprinnelig ba om kontra den faktiske rutede modellen. Aktiverer fallback rate-analyse. -**T02**— Fjern tomme tekstblokker fra nestede `tool_result.content`: forhindrer Anthropic 400-feil (`tekstinnholdsblokker må ikke være tomme`) når Claude Code kjeder verktøyet resultater. -**T03**— Parse `x-codex-5h-*` / `x-codex-7d-*` headers: `parseCodexQuotaHeaders()` + `getCodexResetTime()` trekker ut Codex-kvotevinduer for presis nedkjølingsplanlegging i stedet for generisk 5-minutters fallback. -**T04**— `X-Session-Id`-header for ekstern klebrig ruting: `extractExternalSessionId()` i `sessionManager.ts` leser `x-session-id` / `x-omniroute-session`-hoder med `ext:`-prefiks for å unngå kollisjon med interne SHA-256-sesjons-IDer. Nginx-kompatibel (bindestreksoverskrift). -**T06**— Konto deaktivert → permanent blokkering: `isAccountDeactivated()` i `accountFallback.ts` oppdager 401 deaktiveringssignaler og bruker en 1-års nedkjøling for å forhindre gjentakelse av permanent døde kontoer. -**T07**— X-Forwarded-For IP-validering: ny `src/lib/ipUtils.ts` med `extractClientIp()` og `getClientIpFromRequest()` - hopper over `unknown`/ikke-IP-oppføringer i `X-Forwarded-For`-kjeder (Nginx/proxy-forwarded). -**T10**— Credits exhausted → distinkt fallback: `isCreditsExhausted()` i `accountFallback.ts` returnerer 1 time nedkjøling med `creditsExhausted`-flagget, forskjellig fra generisk 429 ratebegrensning. -**T11**— `max` reasoning effort → 131072 budget tokens: `EFFORT_BUDGETS` and `THINKING_LEVEL_MAP` updated; omvendt kartlegging returnerer nå `"max"` for fullbudsjettsvar. Enhetstest oppdatert. -**T12**— MiniMax M2.7-prisoppføringer lagt til: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` lagt til i pristabellen (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi-priser eksisterte allerede. -**T15**— Array content normalization: `normalizeContentToString()` helper in `openai-to-claude.ts` correctly collapses array-formatted system/tool messages to string before sending to Anthropic.### 🧪 Tests

- Testpakke:**832 tester, 0 feil**(uendret fra rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: automatisk utstedelse av API-nøkler med kvotehåndhevelse per leverandør og per konto

- `POST /api/v1/registered-keys` — utstedelsesnøkler med støtte for idempotens
- `GET /api/v1/registered-keys` — lister opp (maskerte) registrerte nøkler
- `GET /api/v1/registered-keys/{id}` – hent nøkkelmetadata
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — tilbakekall nøkler
- `GET /api/v1/quotas/check` – forhåndsvalider før utstedelse
- `PUT /api/v1/providers/{id}/limits` – angi grenser for leverandørutstedelse
- `PUT /api/v1/accounts/{id}/limits` – angi grenser for kontoutstedelse
- `POST /api/v1/issues/report` — valgfri GitHub-problemrapportering
- DB-migrering 008: «registrerte_nøkler», «provider_key_limits», «account_key_limits»-tabeller---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen- og OpenCode Go-leverandører lagt til (av @kang-heewon)

- Ny `OpencodeExecutor` med flerformatsruting (`/chat/completions`, `/messages`, `/responses`)
- 7 modeller på tvers av begge nivåer---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Leverandørikoner bruker nå [@lobehub/icons](https://github.com/lobehub/lobe-icons) med grasiøs PNG-reserve og en "ProviderIcon"-komponent (130+ leverandører støttes) -**#488**— Automatisk oppdatering av modelllister hver 24. time via 'modelSyncScheduler' (konfigurerbar via 'MODEL_SYNC_INTERVAL_HOURS')### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: viser nå klar handlingsfeil når "GEMINI_OAUTH_CLIENT_SECRET" mangler i Docker/selvvertsbaserte distribusjoner---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI-nøkkelvalidering: fast baseUrl (`api.longcat.chat/openai`) og authHeader (`Authorization: Bearer`) -**#535**— Overstyring av festet modell: «body.model» er nå satt til «pinnedModel» når kontekstbufferbeskyttelse oppdager en festet modell -**#524**— OpenCode-konfigurasjon er nå lagret på riktig måte: lagt til `saveOpenCodeConfig()`-handler (XDG_CONFIG_HOME klar, skriver TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Pålogging blir ikke lenger sittende fast etter å ha hoppet over passordoppsett (omdirigerer til onboarding) -**#522**— API Manager: Fjernet villedende "Kopier maskert nøkkel"-knapp (erstattet med låsikonverktøytips) -**#527**— Claude Code + Codex superpowers loop: «tool_result»-blokker er nå konvertert til tekst i stedet for droppet -**#532**— OpenCode GO API-nøkkelvalidering bruker nå riktig `zen/v1`-endepunkt (`testKeyBaseUrl`) -**#489**— Antigravity: manglende «googleProjectId» returnerer strukturert 422-feil med veiledning for gjenoppretting -**#510**— Windows: MSYS2/Git-Bash-baner (`/c/Program Files/...`) er nå normalisert til `C:\Program Files\...` -**#492**— `omniroute` CLI oppdager nå `mise`/`nvm` når `app/server.js` mangler og viser målrettet rettelse### Dokumentasjon

-**#513**— Tilbakestilling av Docker-passord: `INITIAL_PASSWORD` env var-løsning dokumentert -**#520**— pnpm: "pnpm approve-builds better-sqlite3" dokumentert### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Nye OpenCode-leverandører, retting av innbyggingslegitimasjon, CLI-maskert nøkkelfeil, CACHE_TAG_PATTERN-fiks.### 🐛 Bug Fixes

-**CLI-verktøy lagrer maskert API-nøkkel til konfigurasjonsfiler**- POST-ruter for `clude-settings`, `cline-settings` og `openclaw-settings` godtar nå en `keyId`-param og løser den virkelige API-nøkkelen fra DB før du skriver til disk. `ClaudeToolCard` oppdatert for å sende `keyId` i stedet for den maskerte visningsstrengen. Rettinger #523, #526. -**Tilpassede innebyggingsleverandører: "Ingen legitimasjon"-feil**- `/v1/embeddings` sporer nå `credentialsProviderId` separat fra rutingprefikset, slik at legitimasjonen hentes fra den samsvarende leverandørnode-IDen i stedet for den offentlige prefiksstrengen. Retter en regresjon der `google/gemini-embedding-001` og lignende tilpassede leverandørmodeller alltid vil mislykkes med en legitimasjonsfeil. Retter #532-relatert. (PR #528 av @jacob2826) -**Regex for kontekstbufferbeskyttelse mangler `
` prefiks**— `CACHE_TAG_PATTERN` i `comboAgentMiddleware.ts` oppdatert for å matche både bokstavelig ``
` (omvendt skråstrek-n) og faktisk nylinje U+000A som `combo.ts`-strømming injiserer rundt `<omniModel>`-taggen etter rettelse #515. Retter #531.### ✨ New Providers

-**OpenCode Zen**— Gratis tier-gateway på `opencode.ai/zen/v1` med 3 modeller: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Abonnementstjeneste på `opencode.ai/zen/go/v1` med 4 modeller: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude-format), `minimax-m2.5` (Claude-format)

- Begge leverandørene bruker den nye `OpencodeExecutor` som ruter dynamisk til `/chat/completions`, `/messages`, `/responses` eller `/models/{model}:generateContent` basert på den forespurte modellen. (PR #530 av @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Feilrettinger — bevar Codex-promptbuffernøkkelen, reparer tagContent JSON-escape, synkroniser utløpt token-status til DB.### 🐛 Bug Fixes

-**fix(oversetter)**: Behold `prompt_cache_key` i Responses API → Chat Fullførte oversettelse (#517)
— Feltet er et cache-affinitetssignal som brukes av Codex; å strippe den forhindret hurtigbuffertreff.
Rettet i `openai-responses.ts` og `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` i `tagContent` så injisert JSON-streng er gyldig (#515)
— Mal literal newlines (U+000A) er ikke tillatt uten escape i JSON-strengverdier.
Erstattet med `\n` bokstavelige sekvenser i `open-sse/services/combo.ts`.

-**fix(bruk)**: Synkroniser utløpt token-status tilbake til DB ved feil i sanntidsautentisering (#491)
— Når Limits & Quotas live-sjekken returnerer 401/403, er tilkoblingen 'testStatus' nå oppdatert
til `"utløpt"` i databasen slik at leverandørsiden gjenspeiler den samme degraderte tilstanden.
Rettet i `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Legg til 5 nye gratis AI-leverandører – LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(leverandører/longcat)**: Legg til LongCat AI (`lc/`) — 50 millioner tokens/dag gratis (Flash-Lite) + 500K/dag (Chat/Thinking) under offentlig beta. OpenAI-kompatibel, standard Bearer-aut. -**feat(providers/pollinations)**: Add Pollinations AI (`pol/`) — ingen API-nøkkel kreves. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s gratis). Custom executor håndterer valgfri autentisering. -**feat(providers/cloudflare-ai)**: Legg til Cloudflare Workers AI (`cf/`) – 10K nevroner/dag gratis (~150 LLM-svar eller 500s Whisper-lyd). 50+ modeller på global kant. Custom executor bygger dynamisk URL med 'accountId' fra legitimasjon. -**feat(providers/scaleway)**: Legg til Scaleway Generative APIer (`scw/`) – 1M gratis tokens for nye kontoer. EU/GDPR-kompatibel (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Legg til AI/ML API (`aiml/`) – $0,025/dag gratis kreditt, 200+ modeller (GPT-4o, Claude, Gemini, Llama) via enkelt aggregatorendepunkt.### 🔄 Provider Updates

-**feat(leverandører/sammen)**: Legg til "hasFree: true" + 3 permanent gratis modell-ID-er: "Llama-3.3-70B-Instruct-Turbo-Free", "Llama-Vision-Free", "DeepSeek-R1-Distill-Llama-70B-Free" -**feat(providers/gemini)**: Legg til `hasFree: true` + `freeNote` (1500 rekv/dag, ingen kredittkort nødvendig, aistudio.google.com) -**chore(providers/gemini)**: Gi nytt navn til visningsnavnet til "Gemini (Google AI Studio)" for klarhet### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Ny "PollinationsExecutor" — utelater "Authorization"-overskriften når ingen API-nøkkel er oppgitt -**feat(executors/cloudflare-ai)**: Ny "CloudflareAIExecutor" - dynamisk URL-konstruksjon krever "accountId" i leverandørlegitimasjonen -**feat(executors)**: Registrer `pollinations`, `pol`, `cloudflare-ai`, `cf` executor mappings### Dokumentasjon

-**docs(readme)**: Utvidet gratis kombinasjonsstabel til 11 leverandører ($0 for alltid) -**docs(readme)**: Lagt til 4 nye gratis leverandørseksjoner (LongCat, Pollinations, Cloudflare AI, Scaleway) med modelltabeller -**docs(readme)**: Oppdatert pristabell med 4 nye gratis tier-rader -**docs(i18n/pt-BR)**: Oppdatert pristabell + lagt til LongCat/Pollinations/Cloudflare AI/Scaleway-seksjoner på portugisisk -**docs(new-features/ai)**: 10 oppgavespesifikasjonsfiler + hovedimplementeringsplan i `docs/new-features/ai/`### 🧪 Tests

- Testpakke:**821 tester, 0 feil**(uendret)---

## [2.9.2] — 2026-03-21

> Sprint: Fiks medietranskripsjon (Deepgram/HuggingFace Content-Type, språkdeteksjon) og TTS-feilvisning.### 🐛 Bug Fixes

-**fix(transkripsjon)**: Deepgram og HuggingFace-lydtranskripsjon kartlegger nå `video/mp4` → `audio/mp4` og andre MIME-medietyper via den nye `resolveAudioContentType()`-hjelperen. Tidligere ga opplasting av `.mp4`-filer konsekvent "Ingen tale oppdaget" fordi Deepgram mottok `Content-Type: video/mp4`. -**fix(transkripsjon)**: Lagt til `detect_language=true` til Deepgram-forespørsler - oppdager automatisk lydspråk (portugisisk, spansk, etc.) i stedet for å bruke engelsk som standard. Retter ikke-engelske transkripsjoner som gir tomme resultater eller søppelresultater. -**fix(transkripsjon)**: Lagt til `punctuate=true` til Deepgram-forespørsler for transkripsjonsutdata av høyere kvalitet med korrekt tegnsetting. -**fix(tts)**: "[object Object]" feilvisning i tekst-til-tale-svar løst i både "audioSpeech.ts" og "audioTranscription.ts". `upstreamErrorResponse()`-funksjonen trekker nå ut nestede strengmeldinger fra leverandører som ElevenLabs som returnerer `{ error: { message: "...", status_code: 401 } }` i stedet for en flat feilstreng.### 🧪 Tests

- Testpakke:**821 tester, 0 feil**(uendret)### Triaged Issues

-**#508**— Regresjon av verktøyanropsformat: forespurte proxy-logger og leverandørkjedeinformasjon ('behovsinfo') -**#510**— Windows CLI helsesjekk-bane: forespurt informasjon om shell/Node-versjon (`behov-info`) -**#485**— Kiro MCP-verktøyanrop: lukket som eksternt Kiro-problem (ikke OmniRoute) -**#442**— Baseten /modellers endepunkt: lukket (dokumentert manuell løsning) -**#464**— Key provisioning API: anerkjent som veikartelement---

## [2.9.1] — 2026-03-21

> Sprint: Reparer SSE omniModel-datatap, slå sammen modellkompatibilitet per protokoll.### Bug Fixes

-**#511**— Kritisk: `<omniModel>`-taggen ble sendt etter `finish_reason:stop` i SSE-strømmer, noe som førte til tap av data. Taggen er nå injisert i den første ikke-tomme innholdsdelen, og garanterer levering før SDK-er lukker forbindelsen.### Merged PRs

-**PR #512**(@zhangqiang8vip): Modellkompatibilitet per protokoll — `normalizeToolCallId` og `preserveOpenAIDeveloperRole` kan nå konfigureres per klientprotokoll (OpenAI, Claude, Responses API). Nytt `compatByProtocol`-felt i modellkonfigurasjon med Zod-validering.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: ba om PATH/versjonsinformasjon -**#509**— Turbopack Electron regresjon: oppstrøms Next.js-feil, dokumenterte løsninger -**#508**— macOS svart skjerm: foreslått «--disable-gpu»-løsning---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.### ✨ New Features

-**feat(search)**: Søkeanalyse-fanen i `/dashboard/analytics` — leverandøroversikt, hurtigbuffertrefffrekvens, kostnadssporing. Ny API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(leverandør)**: Alibaba Cloud DashScope lagt til med tilpasset endepunktsbanevalidering - konfigurerbar `chatPath` og `modelsPath` per node (#feat/custom-endpoint-paths) -**feat(api)**: Grenser for antall forespørsler per API-nøkkel — «max_requests_per_day» og «max_requests_per_minute» kolonner med skyvevindu i minnet som returnerer HTTP 429 (#452) -**feat(dev)**: ZWS v5 — HMR-lekkasjeretting (485 DB-tilkoblinger → 1), minne 2,4 GB → 195 MB, 'globalThis'-singletoner, Edge Runtime-advarselsreparasjon (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: `machineId` på tvers av plattformer — `getMachineIdRaw()` skrevet om med try/catch waterfall (Windows REG.exe → macOS ioreg → Linux-fil lest → vertsnavn → `os.hostname()`). Eliminerer `process.platform`-grening som Next.js bundler død-kode-eliminerte, og fikser ``hodet' ikke gjenkjennes` på Windows. Retter også #466. -**fix(#493)**: Navn på egendefinert leverandørmodell — fjernet feil prefiksstripping i `DefaultExecutor.transformRequest()` som manipulerte modell-ID-er med organisasjonsomfang som `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + kontekstbufferbeskyttelse — `TransformStream` avskjærer SSE for å injisere `<omniModel>`-taggen før `[DONE]`-markøren, og aktiverer kontekstbufferbeskyttelse for streamingsvar. -**fix(#458)**: Kombinasjonsskjemavalidering — feltene `system_message`, `tool_filter_regex`, `context_cache_protection` passerer nå Zod-validering ved lagring. -**fix(#487)**: KIRO MITM-kortopprydding — fjernet ZWS_README, generert `AntigravityToolCard` for å bruke dynamiske verktøymetadata.### 🧪 Tests

- Lagt til filterenhetstester i antropisk format (PR #397) — 8 regresjonstester for 'verktøy.navn' uten '.funksjon'-omslag
- Testpakke:**821 tester, 0 feil**(opp fra 813)### 📋 Issues Closed (8)

-**#506**— Windows maskin-ID-hode ble ikke gjenkjent (fikset) -**#493**— Egendefinert leverandørmodellnavn (fast) -**#490**— Streaming kontekstbuffer (fast) -**#452**— Forespørselsgrenser per API-nøkkel (implementert) -**#466**— Windows-påloggingsfeil (samme grunnårsak som #506) -**#504**— MITM inaktiv (forventet oppførsel) -**#462**— Gemini CLI PSA (løst) -**#434**— Elektronappkrasj (duplikat av #402)## [2.8.9] — 2026-03-20

> Sprint: Slå sammen PR-er for fellesskap, fiks KIRO MITM-kort, avhengighetsoppdateringer.### Merged PRs

-**PR #498**(@Sajid11194): Reparer Windows-maskin-ID-krasj (`undefined\REG.exe`). Replaces `node-machine-id` with native OS registry queries.**Lukker #486.** -**PR #497**(@zhangqiang8vip): Reparer HMR-ressurslekkasjer i utviklingsmodus — 485 lekke DB-tilkoblinger → 1, minne 2,4 GB → 195 MB. `globalThis` singletons, Edge Runtime-advarselsreparasjon, Windows-teststabilitet. (+1168/-338 over 22 filer) -**PRs #499-503**(Dependabot): GitHub Actions-oppdateringer — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `@4`.-action### Bug Fixes

-**#505**— KIRO MITM-kortet viser nå verktøyspesifikke instruksjoner (`api.anthropic.com`) i stedet for antigravity-spesifikk tekst. -**#504**— Svarte med UX-avklaring (MITM "Inaktiv" er forventet oppførsel når proxy ikke kjører).---

## [2.8.8] — 2026-03-20

> Sprint: Reparer OAuth batch-testkrasj, legg til "Test alle"-knappen på individuelle leverandørsider.### Bug Fixes

-**OAuth batch-testkrasj**(ERR_CONNECTION_REFUSED): Erstattet sekvensiell for-loop med 5-tilkoblings samtidighetsgrense + 30 s per tilkobling timeout via `Promise.race()` + `Promise.allSettled()`. Forhindrer serverkrasj ved testing av store OAuth-leverandørgrupper (~30+ tilkoblinger).### Funksjoner

-**"Test alle"-knapp på leverandørsider**: Individuelle leverandørsider (f.eks. `/providers/codex`) viser nå en "Test alle"-knapp i Connections-overskriften når det er 2+ tilkoblinger. Bruker `POST /api/providers/test-batch` med `{mode: "provider", providerId}`. Resultatene vises i en modal med bestått/ikke bestått sammendrag og diagnose per tilkobling.---

## [2.8.7] — 2026-03-20

> Sprint: Slå sammen PR #495 (flaskehals 429 drop), fiks #496 (tilpassede innebyggingsleverandører), triage-funksjoner.### Bug Fixes

-**Flaskehals 429 uendelig ventetid**(PR #495 av @xandr0s): På 429 mislykkes «limiter.stop({ dropWaitingJobs: true })» umiddelbart alle forespørsler i kø, slik at oppstrømsoppringere kan utløse fallback. Limiter slettes fra kartet, så neste forespørsel oppretter en ny forekomst. -**Egendefinerte innbyggingsmodeller kan ikke løses**(#496): `POST /v1/embeddings` løser nå tilpassede innbyggingsmodeller fra ALLE provider_nodes (ikke bare localhost). Aktiverer modeller som `google/gemini-embedding-001` lagt til via dashbord.### Issues Responded

-**#452**- Grenser for antall forespørsel per API-nøkkel (godkjent, på veikart) -**#464**— Automatisk utstedelse av API-nøkler med leverandør-/kontogrenser (trenger mer detaljer) -**#488**— Automatisk oppdatering av modelllister (godkjent, på veikart) -**#496**— Tilpasset oppløsning for leverandør av innebygging (fast)---

## [2.8.6] — 2026-03-20

> Sprint: Slå sammen PR #494 (MiniMax rollefiks), fiks KIRO MITM dashbord, triage 8 problemer.### Funksjoner

-**MiniMax-utvikler→systemrollefiks**(PR #494 av @zhangqiang8vip): Per-modell `preserveDeveloperRole`-veksling. Legger til «Kompatibilitet»-grensesnittet på leverandørsiden. Retter 422 "rolleparameterfeil" for MiniMax og lignende gatewayer. -**roleNormalizer**: `normalizeDeveloperRole()` godtar nå `preserveDeveloperRole`-parameteren med tri-state atferd (undefined=keep, true=keep, false=convert). -**DB**: Ny `getModelPreserveOpenAIDeveloperRole()` og `mergeModelCompatOverride()` i `models.ts`.### Bug Fixes

-**KIRO MITM dashbord**(#481/#487): `CLIToolsPageClient` ruter nå ethvert `configType: "mitm"`-verktøy til `AntigravityToolCard` (MITM Start/Stop-kontroller). Tidligere var bare Antigravity hardkodet. -**AntigravityToolCard generisk**: Bruker `tool.image`, `tool.description`, `tool.id` i stedet for hardkodede Antigravity-verdier. Beskytter mot manglende `defaultModels`.### Cleanup

- Fjernet `ZWS_README_V2.md` (dokumenter kun for utvikling fra PR #494).### Issues Triaged (8)

-**#487**— Lukket (KIRO MITM løst i denne utgivelsen) -**#486**— behovsinformasjon (Windows REG.exe PATH-problem) -**#489**- behovsinformasjon (Antigravity projectId mangler, OAuth-tilkobling kreves) -**#492**— behovsinformasjon (mangler app/server.js på mise-managed Node) -**#490**— Bekreftet (streaming + blokkering av kontekstbuffer, korrigering planlagt)
–**#491**– Godkjent (inkonsekvens av kodex-autentiseringstilstand) -**#493**— Godkjent (prefikset for modellleverandørens modellnavn, midlertidig løsning) -**#488**— Etterslep av funksjonsforespørsel (automatisk oppdatering av modelllister)---

## [2.8.5] — 2026-03-19

> Sprint: Fiks zombie SSE-strømmer, kontekstbuffer første sving, KIRO MITM og triage 5 eksterne problemer.### Bug Fixes

-**Zombie SSE-strømmer**(#473): Reduser `STREAM_IDLE_TIMEOUT_MS` fra 300s → 120s for raskere combo-backup når leverandørene henger midt i strømmen. Konfigurerbar via env var. -**Context Cache Tag**(#474): Fiks `injectModelTag()` for å håndtere førstegangsforespørsler (ingen assistentmeldinger) – kontekstbufferbeskyttelse fungerer nå fra første gang. -**KIRO MITM**(#481): Endre KIRO `configType` fra `guide` → `mitm` slik at dashbordet gjengir MITM Start/Stop-kontroller. -**E2E Test**(CI): Fiks `providers-bailian-coding-plan.spec.ts` — avvis eksisterende modalt overlegg før du klikker på knappen Legg til API-nøkkel.### Closed Issues

- #473 — Zombie SSE-strømmer bypass combo fallback
- #474 — Kontekstbuffer «<omniModel>»-tag mangler ved første sving
- #481 — MITM for KIRO kan ikke aktiveres fra dashbordet
- #468 — Gemini CLI ekstern server (avløst av #462 avvikling)
- #438 — Claude kan ikke skrive filer (eksternt CLI-problem)
- #439 — AppImage fungerer ikke (dokumentert libfuse2-løsning)
- #402 — ARM64 DMG "skadet" (dokumentert xattr -cr-løsning)
- #460 — CLI kan ikke kjøres på Windows (dokumentert PATH-fix)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI-avvikling, VM-guide i18n-fix, dependabot-sikkerhetsfix, utvidelse av leverandørskjema.### Funksjoner

-**Gemini CLI-avvikling**(#462): Merk `gemini-cli`-leverandøren som avviklet med advarsel – Google begrenser tredjeparts OAuth-bruk fra mars 2026 -**Provider Schema**(#462): Utvid Zod-validering med valgfrie felter `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Legg til `VM_DEPLOYMENT_GUIDE.md` til i18n oversettelsespipeline, regenerer alle 30 lokale oversettelser fra engelsk kilde (sitter fast på portugisisk)### Sikkerhet

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — fikser CWE-1321 prototypeforurensning (#484, @dependabot)### Closed Issues

- #472 — Regresjon av modellaliaser (fiksert i v2.8.2)
- #471 — VM guide oversettelser ødelagt
- #483 — Etterfølgende `data: null` etter `[FERDIG]` (fiksert i v2.8.3)### Merged PRs

- #484 — deps: bump flated fra 3.3.3 til 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Tsjekkisk i18n, SSE-protokollfiks, VM-guideoversettelse.### Funksjoner

-**Czech Language**(#482): Full Czech (cs) i18n — 22 dokumenter, 2606 UI-strenger, språkbytteroppdateringer (@zen0bit) -**VM Deployment Guide**: Oversatt fra portugisisk til engelsk som kildedokument (@zen0bit)### Bug Fixes

-**SSE Protocol**(#483): Slutt å sende etterfølgende `data: null` etter `[DONE]`-signal – fikser `AI_TypeValidationError` i strenge AI SDK-klienter (Zod-baserte validatorer)### Merged PRs

- #482 — Legg til tsjekkisk språk + fiks VM_DEPLOYMENT_GUIDE.md Engelsk kilde (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 sammenslåtte PR-er, ruteretting av modellaliaser, loggeksport og problemutredning.### Funksjoner

-**Loggeksport**: Ny eksportknapp på `/dashboard/logger` med rullegardinmeny for tidsområde (1t, 6t, 12t, 24t). Laster ned JSON for forespørsel/proxy/anropslogger via `/api/logs/export` API (#user-request)### Bug Fixes

-**Modelaliaseruting**(#472): Innstillinger → Modellaliaser påvirker nå leverandørruting, ikke bare formatgjenkjenning. Tidligere "resolveModelAlias()"-utdata ble bare brukt for "getModelTargetFormat()", men den opprinnelige modell-IDen ble sendt til leverandøren -**Stream Flush Usage**(#480): Bruksdata fra den siste SSE-hendelsen i bufferen er nå korrekt hentet ut under stream flush (sammenslått fra @prakersh)### Merged PRs

- #480 — Trekk ut bruk fra gjenværende buffer i flush handler (@prakersh)
- #479 — Legg til manglende Codex 5.3/5.4 og antropiske modell-ID-prisoppføringer (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Fem fellesskaps-PR-er – rettelser for streaming av anropslogger, Kiro-kompatibilitet, cache-tokenanalyse, kinesisk oversettelse og konfigurerbare verktøyanrops-IDer.### Funksjoner

-**feat(logger)**: Anropsloggresponsinnhold nå riktig akkumulert fra rå leverandørbiter (OpenAI/Claude/Gemini) før oversettelse, fikser tomme svarnyttelaster i strømmemodus (#470, @zhangqiang8vip) -**prestasjon(leverandører)**: Konfigurerbar 9-tegns verktøy-ID-normalisering per modell (Mistral-stil) — bare modeller med alternativet aktivert får avkortede ID-er (#470) -**feat(api)**: Key PATCH API utvidet til å støtte feltene `allowedConnections`, `name`, `autoResolve`, `isActive` og `accessSchedule` (#470) -**feat(dashboard)**: Respons-første layout i forespørselsloggdetaljer-UI (#470) -**feat(i18n)**: Forbedret kinesisk (zh-CN) oversettelse — fullstendig ny oversettelse (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Fjern injisert "modell"-felt fra forespørselsteksten - Kiro API avviser ukjente toppnivåfelt (#478, @prakersh) -**fix(bruk)**: Inkluder cache-lesing + cache-opprettingstokener i inndatatotaler for brukshistorikk for nøyaktig analyse (#477, @prakersh) -**fix(callLogs)**: Støtt bruksfelt for Claude-format (`input_tokens`/`output_tokens`) sammen med OpenAI-formatet, inkluderer alle cache token-varianter (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan-leverandør med redigerbare basis-URL-er, pluss samfunnsbidrag for Alibaba Cloud og Kimi Coding.### Funksjoner

-**feat(leverandører)**: Lagt til Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio med Anthropic-kompatibel API. Statisk katalog med 8 modeller inkludert Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 og Kimi K2.5. Inkluderer tilpasset autentiseringsvalidering (400=gyldig, 401/403=ugyldig) (#467, @Mind-Dragon) -**feat(admin)**: Redigerbar standard URL i Provider Admin opprette/redigere flyter - brukere kan konfigurere egendefinerte base URLer per tilkobling. Vedvarte i `providerSpecificData.baseUrl` med Zod-skjemavalidering som avviste ikke-http(er)-skjemaer (#467)### 🧪 Tests

- Lagt til 30+ enhetstester og 2 e2e-scenarier for Bailian Coding Plan-leverandør som dekker autentiseringsvalidering, skjemaherding, oppførsel på rutenivå og integrasjon på tvers av lag---

## [2.7.10] — 2026-03-19

> Sprint: To nye leverandører som har bidratt med fellesskapet (Alibaba Cloud Coding, Kimi Coding API-nøkkel) og Docker pino-fix.### Funksjoner

-**feat(leverandører)**: Lagt til støtte for Alibaba Cloud Coding Plan med to OpenAI-kompatible endepunkter - `alicode` (Kina) og `alicode-intl` (internasjonalt), hver med 8 modeller (#465, @dtk1985) -**feat(leverandører)**: Lagt til dedikert `kimi-coding-apikey`-leverandørbane - API-nøkkelbasert Kimi Coding-tilgang tvinges ikke lenger gjennom OAuth-bare `kimi-coding`-rute. Inkluderer register, konstanter, modellers API, konfigurasjon og valideringstest (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Lagt til manglende `split2`-avhengighet til Docker-bilde - `pino-abstract-transport` krever det under kjøring, men det ble ikke kopiert inn i den frittstående beholderen, noe som forårsaket at `Kan ikke finne modulen 'split2'` krasjer (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Codex-svars underbane-gjennomgang støttes naturlig, Windows MITM-krasj fikset og Combos-agentskjemaer justert.### Funksjoner

-**feat(codex)**: Native responses subpath through for Codex – ruter naturlig «POST /v1/responses/compact» til Codex oppstrøms, og opprettholder Claude Code-kompatibilitet uten å fjerne «/compact»-suffikset (#457)### 🐛 Bug Fixes

-**fix(combos)**: Zod-skjemaer (`updateComboSchema` og `createComboSchema`) inkluderer nå `system_message`, `tool_filter_regex` og `context_cache_protection`. Retter feil der agentspesifikke innstillinger opprettet via dashbordet stille ble forkastet av backend-valideringslaget (#458) -**fix(mitm)**: Kiro MITM-profilkrasj på Windows fikset - 'node-machine-id' mislyktes på grunn av manglende 'REG.exe'-env, og tilbakefallet ga en fatal 'crypto is not defined'-feil. Fallback importerer nå sikkert og riktig krypto (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budsjettsparefeil + kombinasjonsagentfunksjoner UI + omniModel-tag-sikkerhetsfiks.### 🐛 Bug Fixes

-**fix(budsjett)**: "Lagre grenser" returnerer ikke lenger 422 — `warningThreshold` er nå korrekt sendt som brøk (0–1) i stedet for prosent (0–100) (#451) -**fix(combos)**: `<omniModel>` intern cache-tag fjernes nå før forespørsler videresendes til leverandører, og forhindrer pauser i cache-økten (#454)### Funksjoner

-**feat(combos)**: Agentfunksjoner-seksjonen lagt til i kombinasjonen opprette/redigere modal – avslør «system_message»-overstyring, «tool_filter_regex» og «context_cache_protection» direkte fra dashbordet (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino krasj, Codex CLI responses worker fix, pakkelås synkronisering.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` og `pino-pretty` er nå eksplisitt kopiert i Docker runner-stadiet — Next.js frittstående spor går glipp av disse peer-depsene, noe som forårsaker at `Kan ikke finne modulen pino-abstract-transport` krasjer ved oppstart (#449) -**fix(responses)**: Fjern `initTranslators()` fra `/v1/responses`-ruten — krasjer Next.js-arbeider med `arbeideren har avsluttet` uncaughtException på Codex CLI-forespørsler (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` er nå forpliktet på hver versjonsbump for å sikre at Docker `npm ci` bruker eksakte avhengighetsversjoner---

## [2.7.5] — 2026-03-18

> Sprint: UX-forbedringer og Windows CLI-helsesjekk-fix.### 🐛 Bug Fixes

-**fix(ux)**: Vis standard passordtips på påloggingssiden - nye brukere ser nå `"Standardpassord: 123456"` under passordinngangen (#437) -**fix(cli)**: Claude CLI og andre npm-installerte verktøy er nå korrekt oppdaget som kjørbare på Windows - spawn bruker `shell:true` for å løse `.cmd`-innpakninger via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Søkeverktøy-dashbord, i18n-fikser, Copilot-grenser, Serper-validering.### Funksjoner

-**prestasjon(søk)**: Legg til søkelekeplass (10. endepunkt), søkeverktøyside med Sammenlign leverandører/Rerank pipeline/søkehistorikk, lokal omrangeringsruting, autentiseringsvakter på søke-API (#443 av @Regis-RCR)

- Ny rute: `/dashboard/søkeverktøy`
- Sidefeltoppføring under feilsøkingsdelen
- `GET /api/search/providers` og `GET /api/search/stats` med auth guards
- Lokal provider_nodes ruting for `/v1/rerank`
- 30+ i18n-nøkler i søkenavneområdet### 🐛 Bug Fixes

-**fix(søk)**: fikser Brave news normalizer (ga 0 resultater), håndhev max_results trunkering etter normalisering, fiks endepunktsside hente URL (#443 av @Regis-RCR) -**fix(analytics)**: Lokaliser analytiske dag-/datoetiketter — erstatt hardkodede portugisiske strenger med `Intl.DateTimeFormat(locale)` (#444 av @hijak) -**fix(copilot)**: Riktig GitHub Copilot-kontotypevisning, filtrer misvisende ubegrensede kvoterader fra grenseoversikten (#445 av @hijak) -**fix(leverandører)**: Slutt å avvise gyldige Serper API-nøkler - behandle ikke-4xx-svar som gyldig autentisering (#446 av @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Reservereparasjon for Codex direkte API-kvote.### 🐛 Bug Fixes

-**fix(codex)**: Blokker ukentlig oppbrukte kontoer i direkte API-reserve (#440)

- `resolveQuotaWindow()`-prefiksmatching: `"weekly"` matcher nå `"weekly (7d)"` cache-nøkler
- `applyCodexWindowPolicy()` tvinger `useWeekly`/`use5h` til å veksle på riktig måte
- 4 nye regresjonstester (766 totalt)---

## [2.7.2] — 2026-03-18

> Sprint: Lysmodus UI-kontrastfikser.### 🐛 Bug Fixes

-**fix(logger)**: Fiks lysmoduskontrasten i filterknappene for forespørselslogger og kombinasjonsmerket (#378)

- Feil/suksess/kombinasjonsfilterknapper kan nå leses i lysmodus
- Combo row badge bruker sterkere fiolett i lysmodus---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search ruting (POST /v1/search) med 5 leverandører + Next.js 16.1.7 sikkerhetsrettinger (6 CVEer).### ✨ New Features

-**feat(search)**: Unified web search routing — `POST /v1/search` med 5 leverandører (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover på tvers av leverandører, 6500+ gratis søk/måned
- Cache i minnet med forespørselssammenslåing (konfigurerbar TTL)
- Dashboard: Søk Analytics-fanen i `/dashboard/analytics` med leverandøroversikt, hurtigbuffertrefffrekvens, kostnadssporing
- Ny API: `GET /api/v1/search/analytics` for søkeforespørselsstatistikk
- DB-migrering: «request_type»-kolonnen på «call_logs» for sporing av ikke-chatforespørsler
- Zod-validering (`v1SearchSchema`), auth-gated, kostnad registrert via `recordCost()`### Sikkerhet

-**deps**: Next.js 16.1.6 → 16.1.7 — fikser 6 CVEer: -**Kritisk**: CVE-2026-29057 (smugling av HTTP-forespørsel via http-proxy) -**Høy**: CVE-2026-27977, CVE-2026-27978 (WebSocket + serverhandlinger) -**Middels**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fil                                                              | Formål                                       |
| ---------------------------------------------------------------- | -------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Søkebehandler med 5-leverandørruting         |
| `open-sse/config/searchRegistry.ts`                              | Leverandørregister (auth, cost, quota, TTL)  |
| `open-sse/services/searchCache.ts`                               | In-memory cache med forespørselssammenslåing |
| `src/app/api/v1/search/route.ts`                                 | Next.js-rute (POST + GET)                    |
| `src/app/api/v1/search/analytics/route.ts`                       | Søkestatistikk API                           |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analytics-dashbord-fanen                     |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB-migrering                                 |
| `tests/unit/search-registry.test.mjs`                            | 277 linjer med enhetstester                  | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspirerte funksjoner — toolCalling-flagg, flerspråklig hensiktsdeteksjon, benchmark-drevet fallback, forespørselsdeduplisering, pluggbar RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5-priser.### ✨ New Models & Pricing

-**feat(prising)**: xAI Grok-4 Fast — `$0,20/$0,50 per 1M tokens`, 1143ms p50-forsinkelse, verktøyanrop støttes -**feat(pricing)**: xAI Grok-4 (standard) — `$0,20/$1,50 per 1M tokens`, resonnerende flaggskip -**feat(prising)**: GLM-5 via Z.AI — `$0,5/1M`, 128K utdatakontekst -**feat(prising)**: MiniMax M2.5 — `$0,30/1M input`, resonnement + agentoppgaver -**feat(pricing)**: DeepSeek V3.2 — oppdatert pris «$0,27/$1,10 per 1M» -**feat(prising)**: Kimi K2.5 via Moonshot API — direkte Moonshot API-tilgang -**feat(leverandører)**: Z.AI-leverandør lagt til ('zai'-alias) — GLM-5-familie med 128K utgang### 🧠 Routing Intelligence

-**feat(registry)**: "toolCalling"-flagg per modell i leverandørregisteret - kombinasjoner kan nå foretrekke/kreve modeller som kan kalle verktøy -**prestasjon(scoring)**: Flerspråklig hensiktsdeteksjon for AutoCombo-scoring — PT/ZH/ES/AR-skript/språkmønstre påvirker modellvalg per forespørselskontekst -**feat(fallback)**: Benchmark-drevne fallback-kjeder – reell latensdata (p50 fra `comboMetrics`) brukes til å omorganisere fallback-prioritet dynamisk -**feat(dedup)**: Be om deduplisering via content-hash - 5-sekunders idempotensvindu forhindrer dupliserte leverandøranrop fra å prøve klienter på nytt -**feat(router)**: Pluggbart `RouterStrategy`-grensesnitt i `autoCombo/routerStrategy.ts` — tilpasset rutinglogikk kan injiseres uten å endre kjernen### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nye avanserte verktøyskjemaer: `omniroute_get_provider_metrics` (p50/p95/p99 per leverandør) og `omniroute_explain_route` (forklaring av rutingbeslutning) -**feat(mcp)**: MCP-verktøyets autentiseringsomfang oppdatert - `metrics:read`-omfang lagt til for leverandørberegningsverktøy -**feat(mcp)**: `omniroute_best_combo_for_task` godtar nå `languageHint`-parameter for flerspråklig ruting### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` utvidet med sanntids latency persentilsporing per leverandør/konto -**feat(health)**: Health API (`/api/monitoring/health`) returnerer nå feltene "p50Latency" og "errorRate" per leverandør -**feat(bruk)**: Migrering av brukshistorikk for sporing av ventetid per modell### 🗄️ DB Migrations

-**feat(migrations)**: Ny kolonne `latency_p50` i `combo_metrics`-tabellen – nullbrytende, trygt for eksisterende brukere### 🐛 Bug Fixes / Closures

-**lukke(#411)**: bedre-sqlite3 hashed moduloppløsning på Windows — fikset i v2.6.10 (f02c5b5) -**lukk(#409)**: GitHub Copilot-chatfullføringer mislykkes med Claude-modeller når filer er vedlagt — fikset i v2.6.9 (838f1d6) -**lukke(#405)**: Duplikat av #411 — løst## [2.6.10] — 2026-03-17

> Windows-fix: better-sqlite3 forhåndsbygd nedlasting uten node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: På Windows pleide `npm install -g omniroute` å mislykkes med `better_sqlite3.node er ikke et gyldig Win32-program` fordi den medfølgende native binærfilen ble kompilert for Linux. Legger til**Strategy 1.5**til `scripts/postinstall.mjs`: bruker `@mapbox/node-pre-gyp install --fallback-to-build=false` (buntet med `better-sqlite3`) for å laste ned den korrekte forhåndsbygde binærfilen for gjeldende OS/arch uten å kreve byggeverktøy (ingen pythongyp, ingen MS-node-VC). Faller tilbake til 'npm rebuild' bare hvis nedlastingen mislykkes. Legger til plattformspesifikke feilmeldinger med klare manuelle reparasjonsinstruksjoner.---

## [2.6.9] — 2026-03-17

> CI-fikser (t11 any-budget), feilretting #409 (filvedlegg via Copilot+Claude), utgivelsesarbeidsflytkorrigering.### 🐛 Bug Fixes

-**fix(ci)**: Fjern ordet "any" fra kommentarer i `openai-responses.ts` og `chatCore.ts` som ikke klarte t11`enhver` budsjettsjekk (falsk positiv fra kommentarer som teller regex) -**fix(chatCore)**: Normaliser ikke-støttede innholdsdeltyper før videresending til leverandører (#409 — Markøren sender `{type:"fil"}` når `.md`-filer er vedlagt; Copilot og andre OpenAI-kompat-leverandører avviser med "type må være enten 'image_url' eller 'text'"; fikser/` konverterer ukjente dokumenttyper til "file" og "slipp"-filer)### 🔧 Workflow

-**chore(generate-release)**: Legg til ATOMIC COMMIT RULE — versjonsbump (`npm version patch`) MÅ skje før funksjonsfiler forpliktes for å sikre at taggen alltid peker til en commit som inneholder alle versjonsendringer sammen---

## [2.6.8] — 2026-03-17

> Sprint: Combo som agent (systemmelding + verktøyfilter), Context Caching Protection, Auto-Update, Detailed Logger, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Ny "request_detail_logs"-tabell med 500-poster ring-buffer-utløser, opt-in via innstillingsveksling### Funksjoner

-**feat(combo)**: Systemmeldingsoverstyring per kombinasjon (#399 — `system_message`-feltet erstatter eller injiserer systemmelding før videresending til leverandøren) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` holder bare verktøy som matcher mønsteret; støtter OpenAI + Antropiske formater) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` merker svar med `<omniModel>leverandør/modell</omniModel>` og fester modell for øktkontinuitet) -**feat(innstillinger)**: Automatisk oppdatering via innstillinger (#320 — `GET /api/system/versjon` + `POST /api/system/update` – sjekker npm-registeret og oppdateringer i bakgrunnen med pm2 omstart) -**feat(logger)**: Detaljerte forespørselslogger (#378 — fanger opp hele rørledningen i 4 trinn: klientforespørsel, oversatt forespørsel, leverandørsvar, klientsvar — opt-in veksler, 64KB trim, 500-innganger ring-buffer) -**feat(mitm)**: MITM Kiro IDE-profil (#336 — `src/mitm/targets/kiro.ts` retter seg mot api.anthropic.com, gjenbruker eksisterende MITM-infrastruktur)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-forbedringer, lokale provider_nodes-utvidelser, proxy-register, Claude passthrough-rettinger.### Funksjoner

-**feat(health)**: Bakgrunnshelsesjekk for lokale `provider_nodes` med eksponentiell backoff (30s→300s) og `Promise.allSettled` for å unngå blokkering (#423, @Regis-RCR) -**feat(embeddings)**: Rute `/v1/embeddings` til lokale `provider_nodes` — `buildDynamicEmbeddingProvider()` med vertsnavnvalidering (#422, @Regis-RCR) -**feat(audio)**: Rut TTS/STT til lokale `provider_nodes` — `buildDynamicAudioProvider()` med SSRF-beskyttelse (#416, @Regis-RCR) -**feat(proxy)**: Proxy-register, administrasjons-APIer og generalisering av kvotegrenser (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Strip Claude-spesifikke felt (`metadata`, `anthropic_version`) når målet er OpenAI-compat (#421, @prakersh) -**fix(sse)**: Pakk ut Claude SSE-bruk (`input_tokens`, `output_tokens`, cache-tokens) i passthrough-strømmodus (#420, @prakersh) -**fix(sse)**: Generer reserve-'call_id' for verktøyanrop med manglende/tomme ID-er (#419, @prakersh) -**fix(sse)**: Claude-to-Claude passthrough — fremover kroppen helt urørt, ingen ny oversettelse (#418, @prakersh) -**fix(sse)**: Filtrer foreldreløse `tool_result`-elementer etter Claude Code-kontekstkomprimering for å unngå 400-feil (#417, @prakersh) -**fix(sse)**: Hopp over anrop av verktøy for tomme navn i Responses API-oversetter for å forhindre uendelige løkker for «plassholder_verktøy» (#415, @prakersh) -**fix(sse)**: Fjern tomme tekstinnholdsblokker før oversettelse (#427, @prakersh) -**fix(api)**: Legg til "refreshable: true" til Claude OAuth testkonfigurasjon (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` og relaterte devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hurtigreparasjon: Turbopack/Docker-kompatibilitet — fjern `node:`-protokollen fra all `src/`-import.### 🐛 Bug Fixes

-**fix(build)**: Fjernet `node:`-protokollprefiks fra `import`-setninger i 17 filer under `src/`. Importen av `node:fs`, `node:path`, `node:url`, `node:os` osv. forårsaket `Ecmascript-filen hadde en feil` på Turbopack-bygg (Next.js 15 Docker) og på oppgraderinger fra eldre globale npm-installasjoner. Berørte filer: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` og 12 andre i `src/app/api/` og `src/lib/`. -**chore(workflow)**: Oppdatert `generate-release.md` for å få Docker Hub til å synkronisere og dual-VPS distribuere**obligatoriske**trinn i hver utgivelse.---

## [2.6.5] — 2026-03-17

> Sprint: resonneringsmodellparamfiltrering, lokal leverandør 404-fix, Kilo Gateway-leverandør, avhengighetshumper.### ✨ New Features

-**feat(api)**: Lagt til**Kilo Gateway**(`api.kilo.ai`) som en ny API-nøkkelleverandør (alias `kg`) — 335+ modeller, 6 gratismodeller, 3 autorutingsmodeller (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free'). Passthrough-modeller støttes via `/api/gateway/models`-endepunkt. (PR #408 av @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Fjern ikke-støttede parametere for resonneringsmodeller (o1, o1-mini, o1-pro, o3, o3-mini). Modeller i `o1`/`o3`-familien avviser `temperatur`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` og `n` med HTTP 400. Parametere fjernes nå ved `chatCore`-laget før videresending. Bruker et deklarativt `unsupportedParams`-felt per modell og et forhåndsberegnet O(1)-kart for oppslag. (PR #412 av @Regis-RCR) -**fix(sse)**: Lokal leverandør 404 resulterer nå i en**bare modellsperre (5 sekunder)**i stedet for en tilkoblingsnivåsperre (2 minutter). Når en lokal inferens-backend (Ollama, LM Studio, oMLX) returnerer 404 for en ukjent modell, forblir tilkoblingen aktiv og andre modeller fortsetter å fungere umiddelbart. Retter også en allerede eksisterende feil der `modell` ikke ble sendt til `markAccountUnavailable()`. Lokale leverandører oppdaget via vertsnavn (`localhost`, `127.0.0.1`, `::1`, kan utvides via `LOCAL_HOSTNAMES` env var). (PR #410 av @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(leverandører)**: Fjernet ikke-eksisterende modellnavn på tvers av 5 leverandører: -**gemini / gemini-cli**: fjernet `gemini-3.1-pro/flash` og `gemini-3-*-preview` (finnes ikke i Google API v1beta); erstattet med "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro/flash". -**antigravity**: fjernet `gemini-3.1-pro-high/low` og `gemini-3-flash` (ugyldige interne aliaser); erstattet med ekte 2.x-modeller -**github (Copilot)**: fjernet `gemini-3-flash-preview` og `gemini-3-pro-preview`; erstattet med `gemini-2.5-flash` -**nvidia**: korrigert `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM bruker `meta/` navneområde for Meta-modeller); la til «nvidia/llama-3.1-70b-instruct» og «nvidia/llama-3.1-405b-instruct» -**fix(db/combo)**: Oppdatert `free-stack`-kombinasjon på ekstern DB: fjernet `qw/qwen3-coder-plus` (utløpt oppdateringstoken), korrigert `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-/70b-instruct `ge-3-instruct. → `gemini/gemini-2.5-flash`, lagt til `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip bakt inn i byggerørledning, syntetisk leverandør lagt til, VPS PM2-bane korrigert.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip kjører nå på**kompileringstidspunkt**for ALLE pakker - ikke bare `better-sqlite3`. Trinn 5.6 i `prepublish.mjs` går hver `.js` i `app/.next/server/` og fjerner hex-suffikset på 16 tegn fra et hashkryptert `require()`. Retter `zod-dcb22c...`, `pino-...` osv. MODULE_NOT_FOUND på globale npm-installasjoner. Stenger #398 -**fix(deploy)**: PM2 på begge VPS pekte på foreldede git-clone-kataloger. Rekonfigurert til `app/server.js` i den globale npm-pakken. Oppdatert `/deploy-vps` arbeidsflyt for å bruke `npm pack + scp` (npm-registeret avviser 299MB-pakker).### Funksjoner

-**feat(leverandør)**: Syntetisk ([synthetic.new](https://synthetic.new)) — personvernfokusert OpenAI-kompatibel slutning. "passthroughModels: true" for dynamisk HuggingFace-modellkatalog. Opprinnelige modeller: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 av @Regis-RCR)### 📋 Issues Closed

-**lukk #398**: npm hash-regresjon — fikset av kompileringstids-hash-strip i forhåndspublisering -**triage #324**: Skjermbilde av feil uten trinn — forespurt reproduksjonsdetaljer---

## [2.6.2] — 2026-03-16

> Sprint: modulhashing fullstendig fikset, 2 PR-er slått sammen (Antropisk verktøyfilter + tilpassede endepunktsbaner), Alibaba Cloud DashScope-leverandør lagt til, 3 uaktuelle problemer lukket.### 🐛 Bug Fixes

-**fix(build)**: Utvidet webpack `externals` hash-strip for å dekke ALLE `serverExternalPackages`, ikke bare `better-sqlite3`. Next.js 16 Turbopack hasheser `zod`, `pino` og alle andre servereksterne pakker til navn som `zod-dcb22c6336e0bc69` som ikke eksisterer i `node_modules` ved kjøring. En HASH_PATTERN regex catch-all fjerner nå 16-tegnssuffikset og faller tilbake til grunnpakkenavnet. La også til `NEXT_PRIVATE_BUILD_WORKER=0` i `prepublish.mjs` for å forsterke webpack-modus, pluss en post-build-skanning som rapporterer gjenværende hash-refs. (#396, #398, PR #403) -**fix(chat)**: Verktøynavn i antropisk format (`tool.name` uten `.function`-omslag) ble i det stille droppet av filteret med tomme navn introdusert i #346. LiteLLM proxy-forespørsler med `anthropic/`-prefiks i Anthropic Messages API-format, noe som fører til at alle verktøy filtreres og Anthropic returnerer `400: tool_choice.any kan bare spesifiseres mens du leverer verktøy`. Rettet ved å falle tilbake til `tool.name` når `tool.function.name` er fraværende. Lagt til 8 regresjonsenhetstester. (PR #397)### Funksjoner

-**feat(api)**: Egendefinerte endepunktstier for OpenAI-kompatible leverandørnoder – konfigurer 'chatPath' og 'modelsPath' per node (f.eks. '/v4/chat/completions') i leverandørens tilkoblingsgrensesnitt. Inkluderer en DB-migrering (`003_provider_node_custom_paths.sql`) og rensing av URL-bane (ingen `..`-gjennomgang, må starte med `/`). (PR #400) -**feat(leverandør)**: Alibaba Cloud DashScope lagt til som OpenAI-kompatibel leverandør. Internasjonalt endepunkt: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modeller: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API-nøkkel.### 📋 Issues Closed

-**lukk #323**: Cline-tilkoblingsfeil `[object Object]` — fikset i v2.3.7; instruerte brukeren til å oppgradere fra v2.2.9 -**lukk #337**: Kiro-kredittsporing – implementert i v2.5.5 (#381); pekte brukeren til Dashboard → Bruk -**triage #402**: ARM64 macOS DMG skadet — forespurte macOS-versjon, nøyaktig feil og anbefalt 'xattr -d com.apple.quarantine'-løsning---

## [2.6.1] — 2026-03-15

> Kritisk oppstartsretting: v2.6.0 globale npm-installasjoner krasjet med en 500-feil på grunn av en hashing-feil for Turbopack/webpack-modulnavn i Next.js 16-instrumenteringskroken.### 🐛 Bug Fixes

-**fix(build)**: Tving `better-sqlite3` til å alltid kreves av dets eksakte pakkenavn i webpack-serverpakken. Next.js 16 kompilerte instrumenteringskroken til en egen del og sendte ut `require('better-sqlite3-<hash>')` – et hashed modulnavn som ikke eksisterer i `node_modules` – selv om pakken var oppført i `serverExternalPackages`. Lagt til en eksplisitt 'ekstern'-funksjon til serverens webpack-konfigurasjon slik at bunteren alltid sender ut 'require('better-sqlite3')', og løste oppstarten '500 Internal Server Error' på rene globale installasjoner. (#394, PR #395)### 🔧 CI

-**ci**: La til `workflow_dispatch` til `npm-publish.yml` med versjonssynkroniseringssikring for manuelle utløsere (#392) -**ci**: La til `workflow_dispatch` til `docker-publish.yml`, oppdaterte GitHub Actions til siste versjoner (#392)---

## [2.6.0] - 2026-03-15

> Problemløsning sprint: 4 feil fikset, logger UX forbedret, Kiro kredittsporing lagt til.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI og SD WebUI vises ikke lenger i mediesideleverandørlisten når de ikke er konfigurert - henter `/api/providers` på mount og skjuler lokale leverandører uten tilkoblinger (#390) -**fix(auth)**: Round-robin velger ikke lenger ratebegrensede kontoer på nytt umiddelbart etter nedkjøling — «backoffLevel» brukes nå som primær sorteringsnøkkel i LRU-rotasjonen (#340) -**fix(oauth)**: Qoder (og andre leverandører som omdirigerer til sitt eget brukergrensesnitt) lar ikke lenger OAuth-modalen stå fast ved "Waiting for Authorization" - popup-lukket detektor går automatisk over til manuell URL-inndatamodus (#344) -**fix(logger)**: Forespørselsloggtabellen er nå lesbar i lysmodus - statusmerker, tokentellinger og kombinasjonskoder bruker adaptive "mørke:"-fargeklasser (#378)### Funksjoner

-**feat(kiro)**: Kiro-kredittsporing lagt til brukshenter — spørringer `getUserCredits` fra AWS CodeWhisperer-endepunkt (#337)### 🛠 Chores

-**chore(tester)**: Justert `test:plan3`, `test:fixes`, `test:security` for å bruke samme `tsx/esm`-laster som `npm-test` – eliminerer moduloppløsning falske negativer i målrettede kjøringer (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + herding av rutekroppsvalidering.### 🐛 Bug Fixes

-**fix(codex)**: Bevar native Responses API-gjennomgang for Codex-klienter – unngår unødvendige oversettelsesmutasjoner (PR #387) -**fix(api)**: Valider forespørselsorganer på prissetting/synkronisering og ruter for oppgaver – forhindrer krasjer fra feilaktige innganger (PR #388) -**fix(auth)**: JWT-hemmeligheter vedvarer ved omstart via `src/lib/db/secrets.ts` – eliminerer 401-feil etter pm2-omstart (PR #388)---

## [2.5.8] - 2026-03-15

> Byggefiks: gjenopprett VPS-tilkobling brutt av v2.5.7 ufullstendig publisering.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` brukte fortsatt utdatert `--webpack`-flagg som forårsaker at Next.js frittstående build mislykkes stille – npm-publisering fullført uten `app/server.js`, bryter med VPS-distribusjon---

## [2.5.7] - 2026-03-15

> Løsninger på feilhåndtering av medialekeplass.### 🐛 Bug Fixes

-**fix(media)**: Transkripsjon "API Key Required" falsk positiv når lyden ikke inneholder tale (musikk, stillhet) - viser nå "Ingen tale oppdaget" i stedet -**fix(media)**: `upstreamErrorResponse` i `audioTranscription.ts` og `audioSpeech.ts` returnerer nå riktig JSON (`{error:{message}}`), som aktiverer korrekt 401/403-legitimasjonsfeildeteksjon i MediaPageClient -**fix(media)**: `parseApiError` håndterer nå Deepgrams `err_msg`-felt og oppdager `"api key"` i feilmeldinger for nøyaktig legitimasjonsfeilklassifisering---

## [2.5.6] - 2026-03-15

> Kritiske sikkerhets-/auth-rettinger: Antigravity OAuth ødelagt + JWT-økter tapt etter omstart.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth sender nå riktig "client_secret" til token-endepunktet. Tilbakeslaget for `ANTIGRAVITY_OAUTH_CLIENT_SECRET` var en tom streng, som er falsk – så `client_secret` ble aldri inkludert i forespørselen, noe som forårsaket "client_secret is missing"-feil for alle brukere uten en tilpasset env-var. Stenger #383. -**fix(auth) #385**: `JWT_SECRET` er nå bevart til SQLite (`namespace='secrets'`) på første generasjon og lastet inn på nytt ved påfølgende oppstart. Tidligere ble en ny tilfeldig hemmelighet generert hver prosessoppstart, og ugyldiggjorde alle eksisterende informasjonskapsler/økter etter omstart eller oppgradering. Påvirker både «JWT_SECRET» og «API_KEY_SECRET». Stenger #382.---

## [2.5.5] - 2026-03-15

> Dedup-fix for modellliste, Electron frittstående byggeherding og Kiro-kredittsporing.### 🐛 Bug Fixes

-**fix(modeller) #380**: `GET /api/models` inkluderer nå leverandøraliaser når du bygger aktivleverandørfilteret — modeller for `claude` (alias `cc`) og `github` (alias `gh`) ble alltid vist uavhengig av om en tilkobling var konfigurert, fordi `PROVIDER_MODELS`-nøkler under DB-tilkoblingsaliaser er lagrings-ID-er. Rettet ved å utvide hver aktive leverandør-ID til også å inkludere dens alias via `PROVIDER_ID_TO_ALIAS`. Stenger #353. -**fix(electron) #379**: Nye `scripts/prepare-electron-standalone.mjs` iscenesetter en dedikert `/.next/electron-standalone`-bunt før Electron-pakking. Avbryter med en klar feil hvis 'node_modules' er en symbolkobling (elektronbygger vil sende en kjøretidsavhengighet på byggemaskinen). Sanering på tvers av plattformer via "path.basename". Av @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro-kredittsaldosporing — bruksendepunkt returnerer nå kredittdata for Kiro-kontoer ved å kalle `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (samme endepunkt som Kiro IDE bruker internt). Returnerer gjenværende kreditter, total kvote, fornyelsesdato og abonnementsnivå. Stenger #337.## [2.5.4] - 2026-03-15

> Oppstartsretting for logger, sikkerhetsretting for pålogging av bootstrap og forbedring av dev HMR-pålitelighet. CI-infrastruktur herdet.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Gjenopprett pino transportloggerbane — `formatters.level` kombinert med `transport.targets` blir avvist av pino. Transportstøttede konfigurasjoner fjerner nå nivåformatereren via `getTransportCompatibleConfig()`. Korrigerer også numerisk nivåtilordning i `/api/logs/console`: `30→info, 40→advarsel, 50→feil` (ble forskjøvet med én). -**fix(login) #375**: Påloggingssiden starter nå opp fra det offentlige `/api/settings/require-login`-endepunktet i stedet for det beskyttede `/api/settings`. I passordbeskyttede oppsett mottok forhåndsgodkjenningssiden en 401 og falt tilbake til sikre standardverdier unødvendig. Den offentlige ruten returnerer nå alle bootstrap-metadata (`requireLogin`, `hasPassword`, `setupComplete`) med en konservativ 200 fallback on error. -**fix(dev) #374**: Legg til `localhost` og `127.0.0.1` til `allowedDevOrigins` i `next.config.mjs` — HMR-websocket ble blokkert ved tilgang til appen via loopback-adresse, noe som ga gjentatte advarsler om kryssopprinnelse.### 🔧 CI & Infrastructure

-**ESLint OOM-fiks**: `eslint.config.mjs` ignorerer nå `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` og `clipr/**` – ESLint krasjet med en JS-heap OOM ved å skanne VS-kompilerte blobchunks-koder. -**Unit test fix**: Fjernet gammeldags `ALTER TABLE provider_connections ADD COLUMN "group"` fra 2 testfiler – kolonnen er nå en del av basisskjemaet (lagt til i #373), noe som forårsaker `SQLITE_ERROR: duplicate column name` ved hver CI-kjøring. -**Pre-commit hook**: La til `npm run test:unit` til `.husky/pre-commit` — enhetstester blokkerer nå brutte commits før de når CI.## [2.5.3] - 2026-03-14

> Kritiske feilrettinger: DB-skjemamigrering, oppstarts-env-lasting, fjerning av leverandørfeiltilstand og i18n-verktøytipsfiks. Kode kvalitetsforbedringer på toppen av hver PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Legg til «provider*connections.group»-kolonnen i basisskjemaet + utfyllingsmigrering for eksisterende databaser — kolonnen ble brukt i alle søk, men mangler i skjemadefinisjonen -**fix(i18n) #371**: Erstatt ikke-eksisterende `t("deleteConnection")`-nøkkel med eksisterende `providers.delete`-nøkkel - fikser `MISSING_MESSAGE: providers.deleteConnection` kjøretidsfeil på leverandørens detaljside -**fix(auth) #372**: Slett foreldede feilmetadata (`errorCode`, `lastErrorType`, `lastErrorSource`) fra leverandørkontoer etter ekte gjenoppretting – tidligere har gjenopprettede kontoer fortsatt vises som mislykkede -**fix(oppstart) #369**: Samle env-lasting på tvers av `npm run start`, `run-standalone.mjs` og Electron for å respektere `DATA_DIR/.env → ~/.omniroute/.env → ./.env`-prioriteten – hindrer generering av en ny `STORAGE_ENCRYPTION*-kryptert database-over-KRYPTION\_### 🔧 Code Quality

– Dokumenterte «result.success» vs «response?.ok»-mønstre i «auth.ts» (begge tilsiktet, nå forklart)

- Normalisert `overridePath?.trim()` i `electron/main.js` for å matche `bootstrap-env.mjs`
- Lagt til "preferredEnv"-sammenslåingsordrekommentar i Electron-oppstart

> Codex-kontokvotepolicy med automatisk rotasjon, rask veksling, gpt-5.4-modell og analyseetikettløsning.### ✨ New Features (PRs #366, #367, #368)

-**Codex Quota Policy (PR #366)**: Per-konto 5t/ukentlig kvotevindu veksler i leverandørdashbordet. Kontoer hoppes automatisk over når aktiverte vinduer når en terskel på 90 % og tas opp igjen etter `resetAt`. Inkluderer `quotaCache.ts` med gratis status-getter for bivirkninger. -**Kodeks Fast Tier Toggle (PR #367)**: Dashboard → Innstillinger → Codex Service Tier. Standard-av-veksling injiserer `service_tier: "flex"` kun for Codex-forespørsler, noe som reduserer kostnadene ~80 %. Full stabel: UI-fane + API-endepunkt + eksekvering + oversetter + oppstartsgjenoppretting. -**gpt-5.4-modell (PR #368)**: Legger til `cx/gpt-5.4` og `codex/gpt-5.4` til Codex-modellregisteret. Regresjonstest inkludert.### 🐛 Bug Fixes

-**fix #356**: Analytics-diagrammer (toppleverandør, etter konto, leverandøroppdeling) viser nå menneskelesbare leverandørnavn/etiketter i stedet for rå interne ID-er for OpenAI-kompatible leverandører.

> Hovedutgivelse: strengt tilfeldig rutingstrategi, API-nøkkeltilgangskontroller, tilkoblingsgrupper, ekstern prissynkronisering og kritiske feilrettinger for tenkemodeller, kombinasjonstesting og validering av verktøynavn.### ✨ New Features (PRs #363 & #365)

-**Strent-Random Ruting Strategy**: Fisher-Yates shuffle-dekk med anti-repetisjonsgaranti og mutex-serialisering for samtidige forespørsler. Uavhengige kortstokker per kombinasjon og per leverandør. -**API Key Access Controls**: `allowedConnections` (begrens hvilke tilkoblinger en nøkkel kan bruke), `is_active` (aktiver/deaktiver nøkkel med 403), `accessSchedule` (tidsbasert tilgangskontroll), `autoResolve` veksler, endre navn på nøkler via PATCH. -**Tilkoblingsgrupper**: Grupper leverandørforbindelser etter miljø. Trekkspillvisning på Limits-siden med lokal lagringsutholdenhet og smart auto-switch. -**Ekstern prissynkronisering (LiteLLM)**: 3-lags prisoppløsning (brukeroverstyrer → synkronisert → standarder). Meld deg på via `PRICING_SYNC_ENABLED=true`. MCP-verktøyet «omniroute_sync_pricing». 23 nye tester. -**i18n**: 30 språk oppdatert med strengt tilfeldig strategi, API-nøkkeladministrasjonsstrenger. pt-BR fullstendig oversatt.### 🐛 Bug Fixes

-**fix #355**: Tidsavbrudd for tomgang for strømme økt fra 60s til 300s — forhindrer å avbryte utvidede tenkemodeller (claude-opus-4-6, o3, etc.) under lange resonneringsfaser. Konfigurerbar via `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Kombitest omgår nå `REQUIRE_API_KEY=true` ved hjelp av intern header, og bruker OpenAI-kompatibelt format universelt. Timeout utvidet fra 15s til 20s. -**fix #346**: Verktøy med tomt `function.name` (videresendt av Claude Code) blir nå filtrert før oppstrømsleverandører mottar dem, og forhindrer "Ugyldig input[N].name: empty string" feil.### 🗑️ Closed Issues

-**#341**: Feilsøkingsdelen fjernet - erstatningen er `/dashboard/logs` og `/dashboard/health`.

> API Key Round-Robin-støtte for multi-key leverandør oppsett, og bekreftelse av jokertegn ruting og kvotevindu rullende allerede på plass.### ✨ New Features

-**API Key Round-Robin (T07)**: Leverandørtilkoblinger kan nå inneholde flere API-nøkler (Rediger tilkobling → Ekstra API-nøkler). Forespørsler om å rotere round-robin mellom primærnøkler og ekstranøkler via `providerSpecificData.extraApiKeys[]`. Nøkler holdes i minnet indeksert per tilkobling – ingen DB-skjemaendringer kreves.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` med glob-stil jokertegn-matching (`gpt*`, `claude-?-sonnet`, etc.) er allerede integrert i `model.ts` med spesifisitetsrangering. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` fremmer allerede vinduet automatisk - hvis `Date.now() > entry.until`, slettes låsen umiddelbart (ingen foreldet blokkering).

> UI polering, ruting strategitilføyelser og grasiøs feilhåndtering for bruksgrenser.### ✨ New Features

-**Fill-First & P2C-rutestrategier**: Lagt til "fill-first" (tømmekvote før du går videre) og "p2c" (Power-of-Two-Choices lav latensvalg) til kombinasjonsstrategivelgeren, med fulle veiledningspaneler og fargekodede merker. -**Free Stack Preset Models**: Å lage en kombinasjon med Free Stack-malen fyller nå automatisk ut 7 best-in-class gratis leverandørmodeller (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Brukere aktiverer bare leverandørene og får en kombinasjon av $0/måned rett ut av esken. -**Bredere kombinasjonsmodal**: Opprett/rediger kombinasjonsmodal bruker nå `max-w-4xl` for komfortabel redigering av store kombinasjoner.### 🐛 Bug Fixes

-**Limits page HTTP 500 for Codex & GitHub**: `getCodexUsage()` og `getGitHubUsage()` returnerer nå en brukervennlig melding når leverandøren returnerer 401/403 (utløpt token), i stedet for å kaste og forårsake en 500-feil på Limits-siden. -**Vedlikeholdsbanner falskt-positivt**: Banner viser ikke lenger «Serveren er utilgjengelig» ved sideinnlasting. Rettet ved å ringe `checkHealth()` umiddelbart på mount og fjerne gammel `show`-state closure. -**Verktøytips for leverandørikon**: Rediger (blyant) og slett ikonknapper i leverandørens tilkoblingsrad har nå innebygde HTML-verktøytips - alle 6 handlingsikonene er nå selvdokumenterte.

> Flere forbedringer fra analyse av fellesskapsproblemer, ny leverandørstøtte, feilrettinger for tokensporing, modellruting og strømmepålitelighet.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatisk modellvalg basert på forespørselsinnholdstype — koding → deepseek-chat, analyse → gemini-2.5-pro, visjon → gpt-4o, oppsummering → gemini-2.5-flash. Konfigurerbar via Innstillinger. Ny `GET/PUT/POST /api/settings/task-routing` API. -**HuggingFace Provider**: Lagt til HuggingFace Router som en OpenAI-kompatibel leverandør med Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI-leverandør**: Lagt til Vertex AI (Google Cloud)-leverandør med Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Lekeplassfilopplasting**: Lydopplasting for transkripsjon, bildeopplasting for synsmodeller (automatisk gjenkjenning etter modellnavn), innebygd bildegjengivelse for bildegenereringsresultater. -**Visuell tilbakemelding for modellvalg**: Modeller som allerede er lagt til i kombinasjonsvelgeren viser nå ✓ grønt merke — forhindrer duplikatforvirring. -**Qwen-kompatibilitet (PR #352)**: Oppdaterte User-Agent og CLI-fingeravtrykkinnstillinger for Qwen-leverandørkompatibilitet. -**Round-Robin State Management (PR #349)**: Forbedret round-robin-logikk for å håndtere ekskluderte kontoer og opprettholde rotasjonstilstanden på riktig måte. -**Utklippstavle UX (PR #360)**: Herdede utklippstavleoperasjoner med reserve for ikke-sikre sammenhenger; Claude verktøy normalisering forbedringer.### 🐛 Bug Fixes

-**Fix #302 — OpenAI SDK stream=False dropper tool_calls**: T01 Godta header negotiation tvinger ikke lenger strømming når 'body.stream' er eksplisitt 'false'. Førte til at tool_calls stille ble droppet når du brukte OpenAI Python SDK i ikke-strømmemodus. -**Reparasjon #73 — Claude Haiku rutes til OpenAI uten leverandørprefiks**: `claude-*`-modeller sendt uten leverandørprefiks rutes nå riktig til `antigravity` (antropisk) leverandør. La til `gemini-*`/`gemma-*` → `gemini`-heuristikk også. -**Fix #74 — Token teller alltid 0 for Antigravity/Claude-streaming**: `message_start` SSE-hendelsen som bærer `input_tokens` ble ikke analysert av `extractUsage()`, noe som førte til at alle inndatatokenteller falt. Input/output token-sporing fungerer nå riktig for strømmesvar. -**Fix #180 — Modellimporter duplikater uten tilbakemelding**: `ModelSelectModal` viser nå ✓ grønt høydepunkt for modeller som allerede er i kombinasjonen, noe som gjør det tydelig at de allerede er lagt til.
–**Feil ved generering av mediesider**: Bilderesultater gjengis nå som «<img>»-tagger i stedet for rå JSON. Transkripsjonsresultater vist som lesbar tekst. Legitimasjonsfeil viser et gult banner i stedet for stille feil. -**Tokenoppdateringsknapp på leverandørsiden**: Manuell tokenoppdateringsgrensesnitt lagt til for OAuth-leverandører.### 🔧 Improvements

-**Provider Registry**: HuggingFace og Vertex AI lagt til `providerRegistry.ts` og `providers.ts` (frontend). -**Lesebuffer**: Ny `src/lib/db/readCache.ts` for effektiv DB-lesebufring. -**Quota Cache**: Forbedret kvotecache med TTL-basert utkastelse.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fil                                           | Formål                                       |
| --------------------------------------------- | -------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Oppgavebevisst rutinglogikk (7 oppgavetyper) |
| `src/app/api/settings/task-routing/route.ts`  | Oppgaveruting konfig API                     |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuell oppdatering av OAuth-token           |
| `src/lib/db/readCache.ts`                     | Effektiv DB-lesebuffer                       |
| `src/shared/utils/clipboard.ts`               | Herdet utklippstavle med reserve             | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modal kombinasjon: Gratis stabel synlig og fremtredende**- Gratis stabelmal ble skjult (fjerde plass i rutenettet med tre kolonner). Rettet: flyttet til posisjon 1, byttet til 2x2 rutenett slik at alle 4 malene er synlige, grønn kant + GRATIS merkeutheving.## [2.4.0] - 2026-03-13

> **Stor utgivelse**— Gratis stack-økosystem, overhaling av transkripsjonslekeplass, 44+ leverandører, omfattende gratis dokumentasjon og UI-forbedringer over hele linja.### Funksjoner

-**Komboer: Free Stack mal**— Ny fjerde mal "Free Stack ($0)" ved hjelp av round-robin på tvers av Kiro + Qoder + Qwen + Gemini CLI. Foreslår den forhåndsbygde nullkostnadskombinasjonen ved første gangs bruk. -**Media/transkripsjon: Deepgram som standard**— Deepgram (Nova 3, $200 gratis) er nå standardleverandøren av transkripsjon. AssemblyAI ($50 gratis) og Groq Whisper (gratis for alltid) vist med gratis kredittmerker. -**README: "Start Free"-delen**— Ny tidlig README 5-trinns tabell som viser hvordan du setter opp gratis AI på få minutter. -**LESMIG: Gratis transkripsjonskombinasjon**— Ny seksjon med Deepgram/AssemblyAI/Groq-kombinasjonsforslag og gratis kredittdetaljer per leverandør. -**providers.ts: hasFree-flagg**— NVIDIA NIM, Cerebras og Groq merket med hasFree-merke og freeNote for leverandørens brukergrensesnitt. -**i18n: malFreeStack-nøkler**— Gratis stakkkombinasjonsmal oversatt og synkronisert til alle 30 språk.## [2.3.16] - 2026-03-13

### Dokumentasjon

-**LESMIG: 44+ leverandører**— Oppdaterte alle 3 forekomstene av "36+ leverandører" til "44+" som gjenspeiler det faktiske antallet kodebase (44 leverandører i providers.ts) -**LESMIG: Ny seksjon "🆓 Gratis modeller — hva du faktisk får"**— Lagt til tabell med 7 leverandører med satsgrenser per modell for: Kiro (Claude unlimited via AWS Builder ID), Qoder (5 modeller ubegrenset), Qwen (4 modeller ubegrenset), Gemini CLI (180K/mnd), NVIDIA RIM debra (~40 PM debra (~40 forever NIM) tok/dag / 60K TPM), Groq (30 RPM / 14,4K RPD). Inkluderer \/usr/bin/bash Ultimate Free Stack combo anbefaling. -**LES MIG: Pristabell oppdatert**- Lagt til Cerebras til API KEY-nivå, fikset NVIDIA fra "1000 kreditter" til "dev-forever free", oppdaterte Qoder/Qwen-modelltellinger og navn -**LESMIG: Qoder 8→5-modeller**(kalt: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**LESMIG: Qwen 3→4-modeller**(kalt: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funksjoner

-**Auto-Combo Dashboard (Tier Priority)**: Lagt til `🏷️ Tier` som den 7. scoringsfaktoretiketten i `/dashboard/auto-combo`-faktorsammenbruddsskjermen – alle de 7 Auto-Combo-poengfaktorene er nå synlige. -**i18n — autoCombo-seksjon**: Lagt til 20 nye oversettelsesnøkler for Auto-Combo-dashbordet (`tittel`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) til alle 30 språkfiler.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Gjenopprettet den gyldige standard `clientSecret` — var tidligere en tom streng, som forårsaket "Dårlig klientlegitimasjon" ved hvert tilkoblingsforsøk. Den offentlige legitimasjonen er nå standard reserve (overstyres via `QODER_OAUTH_CLIENT_SECRET` env var). -**MITM-server ikke funnet (#335)**: `prepublish.mjs` kompilerer nå `src/mitm/*.ts` til JavaScript ved å bruke `tsc` før den kopieres til npm-pakken. Tidligere ble bare rå `.ts`-filer kopiert – noe som betyr at `server.js` aldri eksisterte i globale npm/Volta-installasjoner. -**GeminiCLI mangler projectId (#338)**: I stedet for å gi en hard 500-feil når 'projectId' mangler fra lagret legitimasjon (f.eks. etter omstart av Docker), logger OmniRoute nå en advarsel og prøver forespørselen – og returnerer en meningsfull leverandørsidefeil i stedet for en OmniRoute-krasj. -**Electron-versjonen samsvarer ikke (#323)**: Synkroniserte `electron/package.json`-versjonen til `2.3.13` (var `2.0.13`), slik at den binære versjonen på skrivebordet samsvarer med npm-pakken.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Kodeks**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Lagt til `tierPriority` (vekt `0.05`) til `ScoringWeights` Zod-skjemaet og `combos/auto` API-ruten – den 7. poengfaktoren er nå fullstendig akseptert av REST API og validert ved inndata. «stabilitet»-vekt justert fra «0,10» til «0,05» for å beholde totalsum = «1,0».### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: Lagt til "tierPriority" som en 7. poengfaktor – kontoer med Ultra/Pro-nivåer foretrekkes nå fremfor gratis-nivåer når andre faktorer er like. Nye valgfrie felt `accountTier` og `quotaResetIntervalSecs` på `ProviderCandidate`. Alle 4 moduspakkene er oppdatert («frakt-rask», «kostnadsbesparende», «kvalitet først», «frakoblet-vennlig»). -**Intra-Family Model Fallback (T5)**: Når en modell er utilgjengelig (404/400/403), faller OmniRoute nå automatisk tilbake til søskenmodeller fra samme familie før den returnerer en feil (`modelFamilyFallback.ts`). -**Konfigurerbar API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var lar operatører justere proxy timeout (standard 30s). Retter 504-feil på trege oppstrømssvar. (#332) -**Star History**: Erstattet star-history.com-widgeten med starchart.cc (`?variant=adaptive`) i alle 30 README-er – tilpasser seg lys/mørkt tema, sanntidsoppdateringer.### 🐛 Bug Fixes

-**Auth — Førstegangspassord**: `INITIAL_PASSWORD` env var er nå akseptert når du angir det første dashboardpassordet. Bruker 'timingSafeEqual' for konstant-tidssammenligning, og forhindrer timingangrep. (#333) -**README Truncation**: Rettet en manglende `</details>` lukketag i feilsøkingsdelen som førte til at GitHub sluttet å gjengi alt under den (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: Fjernet redundant `@swc/helpers`-overstyring fra `package.json` som kom i konflikt med den direkte avhengigheten, og forårsaket `EOVERRIDE`-feil på pnpm. Lagt til "pnpm.onlyBuiltDependencies" konfig. -**CLI Path Injection (T12)**: Lagt til `isSafePath()`-validator i `cliRuntime.ts` for å blokkere banetraversering og shell-metategn i `CLI_*_BIN` env vars. -**CI**: Regenerert `package-lock.json` etter overstyringsfjerning for å fikse `npm ci`-feil på GitHub Actions.### 🔧 Improvements

-**Response Format (T1)**: `response_format` (json_schema/json_object) nå injisert som en systemforespørsel for Claude, som muliggjør strukturert utdatakompatibilitet. -**429 Prøv på nytt (T2)**: Intra-URL-forsøk på nytt for 429 svar (2x forsøk med 2s forsinkelse) før du faller tilbake til neste URL. -**Gemini CLI Headers (T3)**: Lagt til "User-Agent" og "X-Goog-Api-Client" fingeravtrykkshoder for Gemini CLI-kompatibilitet. -**Priskatalog (T9)**: Lagt til prisoppføringer for `deepseek-3.1`, `deepseek-3.2` og `qwen3-coder-next`.### 📁 New Files

| Fil                                        | Formål                                                     |
| ------------------------------------------ | ---------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definisjoner av modellfamilier og reservelogikk i familien | ### Fixed |

-**KiloCode**: timeout for helsesjekk av kilokode allerede løst i v2.3.11 -**OpenCode**: Legg til opencode til cliRuntime-registeret med 15s helsesjekk-tidsavbrudd -**OpenClaw / Cursor**: Øk timeout for helsesjekk til 15 sekunder for varianter med sakte start -**VPS**: Installer droid- og openclaw npm-pakker; aktiver CLI_EXTRA_PATHS for kiro-cli -**cliRuntime**: Legg til registrering av opencode-verktøy og øk timeout for å fortsette## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Øk "healthcheckTimeoutMs" fra 4000ms til 15000ms - kilokode gjengir et ASCII-logobanner ved oppstart og forårsaker falske "healthcheck_failed" i miljøer med sakte/kaldstart## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Fix `check:any-budget:t11`-feil – erstatt `som enhver` med `som Record<string, unknown>` i OAuthModal.tsx (3 forekomster)### Docs

-**CLI-TOOLS.md**: Komplett veiledning for alle de 11 CLI-verktøyene (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md synkronisert til 30 språk med oversatt tittel + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/fullføringer**: Nytt eldre endepunkt for OpenAI-fullføringer – aksepterer både «prompt»-streng og «meldinger»-matrise, normaliserer automatisk til chat-format -**EndpointPage**: Viser nå alle 3 OpenAI-kompatible endepunkttyper: Chat-fullføringer, Responses API og eldre fullføringer -**i18n**: La til `completionsLegacy/completionsLegacyDesc` til 30 språkfiler### Fixed

-**OAuthModal**: Rett opp "[object Object]" vist på alle OAuth-tilkoblingsfeil - trekk ut ".message" på riktig måte fra feilresponsobjekter i alle 3 "throw new Error(data.error)"-kall (utveksling, enhetskode, autoriser)

- Påvirker Cline, Codex, GitHub, Qwen, Kiro og alle andre OAuth-leverandører## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Legg til `decodeURIComponent` før base64-dekoding slik at URL-kodede autentiseringskoder fra tilbakeringings-URLen blir analysert riktig, og fikser "ugyldig eller utløpt autorisasjonskode"-feil på eksterne (LAN IP) oppsett -**Cline OAuth**: `mapTokens` fyller nå ut `navn = fornavn + etternavn || e-post` slik at Cline-kontoer viser ekte brukernavn i stedet for "Konto #ID" -**OAuth-kontonavn**: Alle OAuth-utvekslingsflyter (utveksling, meningsmåling, tilbakeringing av meningsmåling) normaliserer nå `navn = e-post` når navn mangler, så hver OAuth-konto viser sin e-post som visningsetiketten i leverandørens dashbord -**OAuth-kontonavn**: Fjernet sekvensiell "Konto N" fallback i `db/providers.ts` — kontoer uten e-post/navn bruker nå en stabil ID-basert etikett via `getAccountDisplayName()` i stedet for et sekvensielt nummer som endres når kontoer slettes## [2.3.6] - 2026-03-12

### Fixed

-**Testbatch for leverandør**: Fast Zod-skjema for å akseptere `providerId: null` (grensesnitt sender null for ikke-leverandørmoduser); returnerte feilaktig "Ugyldig forespørsel" for alle batch-tester -**Testmodal for leverandør**: Rettet "[object Object]"-visning ved å normalisere API-feilobjekter til strenger før gjengivelse i "setTestResults" og "ProviderTestResultsView" -**i18n**: La til manglende nøkler `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` til `en.json` -**i18n**: Synkroniserte 1111 manglende nøkler på tvers av alle 29 ikke-engelskspråklige filer med engelske verdier som reserver## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Lagt til permanent 'postinstall'-fiks for å kopiere '@swc/helpers' inn i den frittstående appens 'node_modules' — forhindrer MODULE_NOT_FOUND-krasj på globale npm-installasjoner## [2.3.4] - 2026-03-10

### Added

- Flere leverandørintegrasjoner og dashbordforbedringer
