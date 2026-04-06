# Changelog (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Løst uendelig omdirigeringsløkke på dashboard for nye tilfælde, hvor requireLogin er deaktiveret.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Native Integration:**Fuldstændig refaktoreret Qoder Executor for at omgå den ældre COSY AES/RSA-krypteringsalgoritme, der dirigerer direkte ind i den oprindelige DashScope OpenAi-kompatible URL. Eliminerer komplekse afhængigheder af Node-'crypto'-moduler, mens stream-troskaben forbedres. -**Resilience Engine Overhaul:**Integreret kontekstoverløb, yndefulde fallbacks, proaktiv OAuth-tokendetektion og emissionsforebyggelse med tomt indhold (#990). -**Kontekstoptimeret routingstrategi:**Tilføjet ny intelligent routing-funktion til naturligt at maksimere kontekstvinduer i automatiserede combo-implementeringer (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Rettede dyb-kloning korruption, hvor Anthropic/OpenAI oversættelsesgrænser fjernede `respons.` specifikke SSE præfikser fra streaming grænser (#992). -**Claude Cache Passthrough Alignment:**Justerede CC-kompatible cachemarkører konsekvent med upstream Client Pass-Through-tilstand, der bevarer prompt-caching. -**Turbopack-hukommelseslækage:**Fastgjort Next.js til strenge `16.0.10` for at forhindre hukommelseslækager og opbygge forældethed fra nylige opstrøms Turbopack-hashed-modulregressioner (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-integration:**Integrated models.dev som den autoritative runtime-kilde for modelpriser, muligheder og specifikationer, der tilsidesætter hårdkodede priser. Indeholder en brugergrænseflade til indstillinger til styring af synkroniseringsintervaller, oversættelsesstrenge for alle 30 sprog og robust testdækning. -**Provider Native Capabilities:**Tilføjet understøttelse til at deklarere og kontrollere native API-funktioner (f.eks. "systemInstructions_supported"), der forhindrer fejl ved at rense ugyldige roller. I øjeblikket konfigureret til Gemini Base og Antigravity OAuth-udbydere. -**Avancerede indstillinger for API-udbyder:**Tilføjet tilpassede "User-Agent"-tilsidesættelser pr. forbindelse for API-nøgleudbyderforbindelser. Tilsidesættelsen er gemt i `providerSpecificData.customUserAgent` og gælder nu for valideringsprober og upstream-udførelsesanmodninger.### 🐛 Bug Fixes

-**Qwen OAuth-pålidelighed:**Løste en række OAuth-integrationsproblemer, herunder en 400 Bad Request-blokering på udløbne tokens, reservegenerering til parsing af OIDC `access_token`-egenskaber, når `id_token` er udeladt, modelkatalogopdagelsesfejl og streng filtrering af `X-0AI-headerscope-_ble Open-headerscope-_ endepunkter.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Fuldført indbygget CRUD-livscyklusintegration til den avancerede Auto-Combo-motor (#955). -**Kernefunktioner:**Rettede manglende oversættelser til nye indbyggede autokombinationer (#955). -**Sikkerhedsvalidering:**Deaktiverede automatiske SQLite-sikkerhedskopieringsopgaver under CI-udførelse af enhedstest for eksplicit at løse Node 22 Event Loop hængende hukommelseslækager (#956). -**Økosystemproxies:**Fuldførte eksplicitte integrationskortlægningsmodelsynkroniseringsplanlæggere, OAuth-cyklusser og Token Check opdateres sikkert gennem OmniRoutes oprindelige system opstrøms proxyer (#953). -**MCP-udvidelsesmuligheder:**Tilføjede og registrerede det nye `omniroute_web_search` MCP-rammeværktøj ud af beta til produktionsskemaer (#951). -**Tokens Buffer Logic:**Tilføjede runtime-konfigurationsgrænser, der udvider konfigurerbare input/output-token-buffere til præcise brugssporingsmetrikker (#959).### 🐛 Bug Fixes

-**CodeQL Remediation:**Fuldt løste og sikrede kritiske strengindekseringsoperationer forhindrer Server-Side Request Forgery (SSRF) arrays, der indekserer heuristik sammen med polynomial algoritmisk backtracking (ReDoS) inde i dybe proxy-dispatcher-moduler. -**Krypto-hashes:**Erstattet svage ubekræftede ældre OAuth 1.0-hashes med robuste HMAC-SHA-256-standardvalideringsprimitiver, der sikrer stram adgangskontrol. -**API-grænsebeskyttelse:**Korrekt verificerede og kortlagte strukturelle rutebeskyttelser, der håndhæver streng `isAuthenticated()`-middlewarelogik, der dækker nyere dynamiske slutpunkter, der målretter mod indstillingsmanipulation og indlæsning af indbyggede færdigheder. -**CLI Ecosystem Compat:**Løste brudte native runtime-parserbindinger, der bryder ned "hvor" miljødetektorer strengt over ".cmd/.exe"-kanttilfælde til eksterne plugins (#969). -**Cachearkitektur:**Refaktorerede nøjagtige analyse- og systemindstillinger dashboardparametre layoutstruktur caching for at opretholde stabile genhydreringsvedholdenhedscyklusser, der løser visuelle ujusterede tilstandsblink (#952). -**Claude Caching-standarder:**Normaliserede og nøjagtigt, strengt bevarede kritiske, flygtige blokmarkører "ephemeral" caching TTL-ordrer for downstream noder, der håndhæver standardkompatible CC-anmodninger kortlægning rent uden tabte metrics (#948). -**Interne aliaser Auth:**Forenklede interne runtime-mappings, der normaliserer Codex-legitimationsnyttelastopslag inde i globale oversættelsesparametre, der løser 401 uautentificerede drops (#958).### 🛠️ Maintenance

-**UI-opdagbarhed:**Korrekt justerede layoutkategoriseringer, der eksplicit adskiller gratis tier-udbydere logik, der forbedrer UX-sorteringsflows inde i de generelle API-registreringssider (#950). -**Deployment Topology:**Unified Docker-implementeringsartefakter, der sikrer, at roden 'fly.toml' matcher forventede cloud-instansparametre, der er klar til at håndtere automatiske implementeringer skalering korrekt. -**Udviklingsværktøj:**Afkoblet "LKGP"-runtime-parametre til eksplicitte DB-lagabstraktions-caching-værktøjer, der sikrer streng testisoleringsdækning for kerne-cachinglag sikkert.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Fuldstændig ombygget `/dashboard/auto-combo` UI til problemfrit at integrere med indbyggede Dashboard Cards og standardiseret visuel polstring/headers. Tilføjet dynamiske visuelle fremskridtsbjælker, der kortlægger modeludvælgelsesvægtmekanismer. -**Indstillinger Routing Sync:**Fuldt eksponeret avanceret routing "prioritet" og "vægtede" skemamål internt i globale indstillinger fallback lister.### Bug Fixes

-**Hukommelses- og færdighedslokalitetsknuder:**Løste tomme gengivelsestags for hukommelses- og færdighedsindstillinger direkte inde i globale indstillingsvisninger ved at forbinde alle 'indstillinger.\*'-kortlægningsværdier internt i 'en.json' (også afbildet implicit til krydsoversættelsesværktøjer).### Internal Integrations

- Integreret PR #946 — rettelse: bevar Claude Code-kompatibilitet i svarkonvertering
- Integreret PR #944 — fix (tvilling): bevar tankesignaturer på tværs af kald af antityngdekraftsværktøjer
- Integreret PR #943 — rettelse: gendan GitHub Copilot-kroppen
- Integreret PR #942 — Ret cc-kompatible cache-markører
- Integreret PR #941 — refactor(auth): forbedre NVIDIA alias lookup + tilføj LKGP fejllogning
- Integreret PR #939 — Gendan Claude OAuth localhost callback-håndtering
- _(Bemærk: PR #934 blev udeladt fra cyklus 3.4.9 for at forhindre kernekonfliktregression)_---

## [3.4.8] — 2026-04-03

### Sikkerhed

- Fuldstændig udbedret alle udestående Github Advanced Security (CodeQL) fund og Dependabot-advarsler.
- Rettede usikre tilfældighedssårbarheder ved at migrere fra `Math.random` til `crypto.randomUUID()`.
- Sikrede shell-kommandoer i automatiserede scripts fra strenginjektion.
- Migrerede sårbare katastrofale tilbagesporende RegEx-parsingmønstre i chat-/oversættelsespipelines.
- Forbedrede output-saneringskontroller inde i React UI-komponenter og Server Sent Events (SSE) tag-injektion.---

## [3.4.7] — 2026-04-03

### Funktioner

- Tilføjet "Kryptografi" node til overvågning og MCP-sundhedstjek (#798)
- Tilknytning af hærdet modelkatalog-rutetilladelser (`/modeller`) (#781)### Bug Fixes

- Rettede Claude OAuth-token-opdateringer, der ikke bevarede cache-kontekster (#937)
- Rettet CC-kompatible udbyderfejl, der gør cachelagrede modeller utilgængelige (#937)
- Rettede GitHub Executor-fejl relateret til ugyldige kontekst-arrays (#937)
- Rettede NPM-installerede CLI-værktøjer sundhedstjek fejl på Windows (#935)
- Rettet oversættelse af nyttelast, der droppede gyldigt indhold på grund af ugyldige API-felter (#927)
- Fixed runtime crash i Node 25 vedrørende API-nøglekørsel (#867)
- Fixed MCP standalone modul-opløsning (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Fixed NVIDIA NIM routing credential resolution alias mismatch (#931)### Sikkerhed

- Tilføjet sikker streng inputgrænsebeskyttelse mod rå `shell: true` fjernudførelsesindsprøjtninger.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Udbydere:**Registrerede nye udbydere af billed-, video- og lydgenerering fra den fællesskabsanmodede liste (#926). -**Dashboard UI:**Tilføjet selvstændig sidebjælke-navigation til de nye Memory and Skills-moduler (#926). -**i18n:**Tilføjet oversættelsesstrenge og layouttilknytninger på tværs af 30 sprog for navneområderne Memory og Skills.### 🐛 Bug Fixes

-**Resiliens:**Forhindrede proxy-kredsløbsafbryderen i at sidde fast i en ÅBEN tilstand på ubestemt tid ved at håndtere direkte overgange til LUKKET tilstand inde i fallback kombinationsstier (#930). -**Protokoloversættelse:**Rettede streamingtransformatoren for at rense svarblokke baseret på den forventede _source_-protokol i stedet for udbyderens _target_-protokol, og fikse Anthropics-modeller pakket ind i OpenAI-nyttelaster, der styrtede Claude Code (#929). -**API-specifikationer og Gemini:**Rettede "thought_signature"-parsing i "openai-to-gemini" og "claude-to-gemini"-oversættere, hvilket forhindrede HTTP 400-fejl på tværs af alle Gemini 3 API-værktøjskald. -**Udbydere:**Ryddede op i ikke-OpenAI-kompatible slutpunkter, der forhindrer gyldige opstrømsforbindelser (#926). -**Cache-tendenser:**Rettede ugyldige egenskabstilknytningsdata, der fik Cache Trends UI-diagrammer til at gå ned, og udtrak redundante cache-metriske widgets (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI-økosystemintegration:**Tilføjet "cliproxyapi"-eksekutoren med indbygget modul-niveau caching og proxy-routing. Introducerede en omfattende Version Manager-tjeneste til automatisk at teste sundhed, downloade binære filer fra GitHub, afføde isolerede baggrundsprocesser og rent at administrere livscyklussen for eksterne CLI-værktøjer direkte gennem brugergrænsefladen. Inkluderer DB-tabeller til proxy-konfiguration for at aktivere automatisk SSRF-gated cross-routing af eksterne OpenAI-anmodninger via det lokale CLI-værktøjslag (#914, #915, #916). -**Qoder PAT-understøttelse:**Integrated Personal Access Tokens (PAT) understøtter direkte via den lokale `qodercli`-transport i stedet for ældre eksterne `.cn`-browserkonfigurationer (#913). -**Gemini 3.1 Pro Preview (GitHub):**Tilføjet "gemini-3.1-pro-preview" kanonisk eksplicit modelunderstøttelse indbygget i GitHub Copilot-udbyderen, mens ældre routingaliasser bevares (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stabilitet:**Reparerede Copilot token opdateringsløkken, hvor forældede tokens ikke var dybt flettet ind i DB, og fjernede `reasoning_text` felter, der var fatalt at bryde nedstrøms antropiske blokkonverteringer til multi-turn chats (#923). -**Global timeout-matrix:**Centraliserede og parametriserede anmodningstimeouts eksplicit fra `REQUEST_TIMEOUT_MS` for at forhindre skjulte (~300s) standardhentningsbuffere, der for tidligt afskærer langlivede SSE-streamingsvar fra tunge ræsonnementmodeller (#918). -**Cloudflare Quick Tunnels State:**Rettede en alvorlig tilstandsinkonsistens, hvor genstartede OmniRoute-forekomster fejlagtigt viste ødelagte tunneler som aktive, og standard cloudflared-tunneling til `HTTP/2` for at eliminere UDP-modtagelsesbufferlogspam (#925). -**i18n Translation Overhaul (tjekkisk og hindi):**Fixed hindi-kode fra DEPRATED `in.json` til kanonisk `hi.json`, overhalede tjekkiske tekstmappings, udtrukne `untranslatable-keys.json` for at rette CI/CD falsk-positive valideringer og genererede `Imdl-guider til comprehens. (#912).
-**Tokens Provider Recovery:**Rettede Qwen, der mistede specifikke `resourceUrl`-endepunkter efter automatiske sundhedstjek-token-opdateringer på grund af manglende DB-dybe fletninger (#917). -**CC-kompatibel UX og streaming:**Forenede de Tilføj CC/OpenAI/Antropiske kompatible handlinger omkring Antropisk brugergrænsefladebehandling, tvang CC-kompatible opstrømsanmodninger til at bruge SSE, mens de stadig returnerede streaming- eller ikke-streamingsvar baseret på klientanmodningen, fjernede CC-modellistekonfiguration/importunderstøttelse til fordel for en eksplicit-tilgængelig CC-model-understøttelse, compati-tilgængelig Modeller afspejler OAuth Claude Code-registreringslisten (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Udsender `response.completed` med korrekte `input_tokens`/`output_tokens`-felter for Codex CLI-klienter, og fikser tokenbrugsvisning (#909 — tak @christopher-s). -**SQLite WAL-tjekpunkt ved nedlukning:**Skyl WAL-ændringer ind i den primære databasefil under yndefuld nedlukning/genstart, hvilket forhindrer datatab på Docker-containerstop (#905 — tak @rdself). -**Graceful Shutdown Signal:**Ændrede `/api/restart` og `/api/shutdown` ruter fra `process.exit(0)` til `process.kill(SIGTERM)`, hvilket sikrer, at nedlukningshåndteringen kører før exit. -**Docker Stop henstandsperiode:**Tilføjet `stop_grace_period: 40s` til Docker Compose-filer og `--stop-timeout 40` til Docker run eksempler.### 🛠️ Maintenance

- Lukket 5 løste/ikke-en-fejl problemer (#872, #814, #816, #890, #877).
- Triagede 6 problemer med anmodninger om behovsoplysninger (#892, #887, #886, #865, #895, #870).
- Reagerede på CLI-detektionssporingsproblem (#863) med bidragydervejledning.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Fuldført fjernhukommelse og færdighedsindsprøjtning til Antigravity-udbyderen på proxy-netværksniveau. -**Claude Code-kompatibilitet:**Byggede en indbygget skjult kompatibilitetsbro til Claude Code, der sendte værktøjer og formatering rent igennem. -**Websøgning MCP:**Tilføjede `omniroute_web_search` værktøjet med `execute:search` omfanget. -**Cachekomponenter:**Implementerede dynamiske cachekomponenter ved hjælp af TDD. -**UI og tilpasning:**Tilføjet brugerdefineret favicon-understøttelse, udseendefaner, kablet hvidmærkning til sidebjælken og tilføjede Windsurf-guidetrin på tværs af alle 33 sprog. -**Logopbevaring:**Samlet opbevaring af anmodningslog og artefakter indbygget. -**Modelforbedringer:**Tilføjet eksplicit "contextLength" for alle opencode-zen-modeller. -**i18n & oversættelser:**Integrerede 33 sproglige oversættelser, inklusive pladsholder CI-valideringer og kinesisk dokumentationsopdateringer (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Tilbagestillede `id_token`-afhængighed til `access_token` og aktiverede dynamisk `resource_url` API-endepunktsinjektion til korrekt regional routing (#900). -**Model Sync Engine:**Lagrede det strenge interne udbyder-id i `getCustomModels()`-synkroniseringsrutiner i stedet for UI Channel Alias-formatet, hvilket forhindrede SQLite-katalogindsættelsesfejl (#903). -**Claude Code & Codex:**Standardiserede ikke-streamende tomme svar på antropisk-formateret `(tomt svar)` for at forhindre CLI-proxy-nedbrud (#866). -**CC-kompatibel routing:**Løste dublet "/v1"-endepunktskollision under stisammenkædning for generiske Claude Code-gateways (#904). -**Antigravity Dashboards:**Blokerede ubegrænsede kvotemodeller fra fejlagtigt at registrere som opbrugte "100 % Usage"-grænsetilstande i Provider Usage UI (#857). -**Claude Image Passthrough:**Rettede Claude-modeller, der mangler billedblokgennemgange (#898). -**Gemini CLI Routing:**Løste 403 autorisations lockouts og indhold akkumulering problemer ved at opdatere projekt ID via `loadCodeAssist` (#868). -**Antityngdekraftsstabilitet:**Korrigerede modeladgangslister, håndhævede 404-låse, faste 429 kaskader, der låser standardforbindelser ude, og "gemini-3.1-pro"-output-tokens (#885). -**Provider Sync Cadence:**Reparerede udbyderen begrænser synkroniseringskadence via den interne planlægger (#888). -**Dashboard Optimering:**Løst "/dashboard/limits" UI-frysning ved behandling af 70+ konti via chunk-parallelisering (#784). -**SSRF-hærdning:**Tvingede streng SSRF IP-områdefiltrering og blokerede `::1` loopback-grænsefladen. -**MIME-typer:**Standardiseret 'mime_type' til snake_case for at matche Gemini API-specifikationer. -**CI-stabilisering:**Rettede fejlagtige analyser/indstillinger Playwright-vælgere og anmodningspåstande, så GitHub Actions E2E-kørsler passerer pålideligt på tværs af lokaliserede brugergrænseflader og switch-baserede kontroller. -**Deterministiske tests:**Fjernede datofølsomme kvotearmaturer fra Copilot-brugstests og tilpassede idempotens-/modelkatalogtests med den flettede runtime-adfærd. -**MCP-typehærdning:**Fjernede eksplicitte 'enhver'-regression med nulbudget fra registreringsstien til MCP-serverværktøjet. -**Model Sync Engine:**Omgået destruktiv "erstat" tilsidesætter, når udbyderens automatiske synkronisering giver en tom modelliste, der bibeholder stabiliteten for dynamiske kataloger (#899).### 🛠️ Maintenance

-**Pipeline-logning:**Raffineret pipeline-logning af artefakter og håndhæv fastholdelseshætter (#880). -**AGENTS.md Overhaling:**Kondenseret fra 297→153 linjer. Tilføjet retningslinjer for build/test/stil, kodearbejdsgange (Prettier, TypeScript, ESLint) og trimmede udførlige tabeller (#882). -**Release Branch Integration:**Konsoliderede de aktive funktioner til `release/v3.4.2` oven på nuværende `main` og validerede grenen med lint, unit, coverage, build og CI-mode E2E-kørsler. -**Test:**Tilføjet testkonfiguration til komponenttestning og Playwright-specifikationer for indstillingsskift. -**Dokumentopdateringer:**Udvidede root readmes, oversatte kinesiske dokumenter indbygget og ryddede op i forældede filer.## [3.4.1] - 2026-03-31

> [!ADVARSEL]
> **BRYDER ÆNDRING: Forespørgselslogning, opbevaring og logningsmiljøvariabler er blevet omdesignet.**
> Ved den første opstart efter opgraderingen arkiverer OmniRoute ældre anmodningslogfiler fra `DATA_DIR/logs/`, ældre `DATA_DIR/call_logs/` og `DATA_DIR/log.txt` i `DATA_DIR/log_archives/*.zip`, og fjerner derefter de forældede skift til det nye layout og det forældede format. `DATA_DIR/opkaldslogs/`.### ✨ New Features

-**.ENV Migration Utility:**Inkluderet `scripts/migrate-env.mjs` for problemfrit at migrere `<v3.3`-konfigurationer til `v3.4.x` strenge sikkerhedsvalideringsbegrænsninger (FASE-01), der reparerer opstartsnedbrud forårsaget af korte `JWT_SECRET`-forekomster. -**Kiro AI Cache-optimering:**Implementeret deterministisk `conversationId`-generering (uuidv5) for at aktivere AWS Builder ID-prompt-caching korrekt på tværs af påkaldelser (#814). -**Gendannelse og konsolidering af dashboard-brugergrænsefladen:**Løste logik i sidebjælken ved at udelade fejlretningssektionen og ryddede Nextjs-routingadvarsler ved at flytte selvstændige `/dashboard/mcp`- og `/dashboard/a2a`-sider eksplicit ind i indlejrede Endpoint Proxy-UI-komponenter. -**Unified Request Log Artifacts:**Anmodningslogning gemmer nu én SQLite-indeksrække plus én JSON-artefakt pr. anmodning under `DATA_DIR/call_logs/`, med valgfri pipeline-fangst indlejret i den samme fil. -**Sprog:**Forbedret den kinesiske oversættelse (#855) -**Opencode-Zen-modeller:**Tilføjet 4 gratis modeller til opencode-zen-registret (#854) -**Test:**Tilføjet enheds- og E2E-test til indstillingsskift og fejlrettelser (#850)### 🐛 Bug Fixes

-**429 Kvoteparsing:**Parsede lange kvote nulstillingstider fra fejlinstanser for at respektere korrekte tilbagebetalinger og forhindre hastighedsbegrænsede kontoforbud (#859) -**Prompt Caching:**Bevarede klient-'cache_control'-headere for alle Claude-protokoludbydere (som Minimax, GLM og Bailian), der korrekt genkender caching-understøttelse (#856) -**Model Sync Logs:**Reduceret log spam ved kun at optage "sync-modeller", når kanalen faktisk ændrer listen (#853) -**Providerkvote og tokenparsing:**Skiftede antigravitetsgrænser for at bruge "retrieveUserQuota" indbygget og korrekt kortlagt Claude-tokenopdateringsnyttelast til URL-kodede formularer (#862) -**Hastighedsbegrænsende stabilitet:**Universaliserede 429 Retry-After-parsing-arkitekturen for at begrænse udbyderinducerede nedkølinger ved maks. 24 timer (#862) -**Dashboard Limit Rendering:**Ombygget `/dashboard/limits` kvotetilknytning til at gengive umiddelbart inden for bidder, hvilket retter en større UI-frysningsforsinkelse på konti, der overstiger 70 aktive forbindelser (#784) -**QWEN OAuth-autorisation:**Tilknyttede OIDC `id_token` som det primære API-bærer-token for Dashscope-anmodninger, og fiksede øjeblikkelige 401 uautoriserede fejl efter tilslutning af konti eller opdatering af tokens (#864) -**ZAI API Stabilitet:**Hardened Server-Sent Events-compiler til elegant fallback til tomme strenge, når DeepSeek-udbydere streamer matematisk null-indhold under ræsonneringsfaser (#871) -**Claude Code/Codex-oversættelser:**Beskyttede ikke-streamende nyttelastkonverteringer mod tomme svar fra opstrøms Codex-værktøjer, der undgår katastrofale Typefejl (#866) -**NVIDIA NIM-gengivelse:**Betinget fjernede identiske udbyderpræfikser dynamisk presset af lydmodeller, hvilket eliminerer duplikerede "nim/nim"-tagstrukturer, der kaster 404 på Media Playground (#872)### ⚠️ Breaking Changes

-**Anmodningsloglayout:**Fjernede den gamle "DATA*DIR/logs/"-anmodningslogsessioner med flere filer og oversigtsfilen "DATA_DIR/log.txt". Nye anmodninger skrives som enkelte JSON-artefakter i `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Logningsmiljøvariabler:**Erstattet `LOG*_`, `ENABLE*REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`og`PROXY_LOG_MAX_ENTRIES`med den nye`APP_LOG*_`og`CALL_LOG_RETENTION_DAYS. -**Pipeline Toggle-indstilling:**Erstattede den ældre indstilling for `detailed_logs_enabled` med `call_log_pipeline_enabled`. Nye pipelinedetaljer er indlejret i anmodningsartefakten i stedet for at blive gemt som separate `request_detail_logs`-poster.### 🛠️ Maintenance

-**Legacy Request Log Upgrade Backup:**Opgraderinger arkiverer nu gamle `data/logs/`, ældre `data/call_logs/` og `data/log.txt`-layouts i `DATA_DIR/log_archives/*.zip` før den forældede struktur fjernes. -**Streaming Usage Persistence:**Streaminganmodninger skriver nu en enkelt `usage_history`-række ved afslutning i stedet for at udsende en dublet igangværende brugsrække med tomme statusmetadata. -**Oprydning af logføring:**Pipeline-logfiler fanger ikke længere "KILDEANMODNING", anmodning om artefaktindgange respekterer nu "CALL_LOG_MAX_ENTRIES", og applikationslogarkiver respekterer nu "APP_LOG_MAX_FILES".---

## [3.4.0] - 2026-03-31

### Funktioner

-**Abonnementsudnyttelsesanalyse:**Tilføjet sporing af kvote-snapshot-tidsserier, faner for udbyderanvendelse og kombinationssundhed med visualiseringer af recharts og tilsvarende API-slutpunkter (#847) -**SQLite Backup Control:**Nyt `OMNIROUTE_DISABLE_AUTO_BACKUP` env flag for at deaktivere automatiske SQLite backups (#846) -**Opdatering af modelregistret:**Injicerede "gpt-5.4-mini" i Codex-udbyderens udvalg af modeller (#756) -**Sporing af udbydergrænser:**Spor og vis, hvornår udbyderens takstgrænser sidst blev opdateret pr. konto (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Omdirigeret Qwen OAuth-fuldførelser fra DashScope API til Web Inference API (`chat.qwen.ai`), der løser autorisationsfejl (#844, #807, #832) -**Qwen Auto-Retry Loop:**Tilføjet målrettet 429-kvote Overskredet backoff-håndtering inde i 'chatCore', der beskytter burst-anmodninger -**Codex OAuth Fallback:**Moderne browser popup-blokering fanger ikke længere brugeren; det falder automatisk tilbage til manuel URL-indtastning (#808) -**Claude Token Refresh:**Anthropics strenge "applikation/json"-grænser bliver nu respekteret under tokengenerering i stedet for kodede URL'er (#836) -**Codex Messages Schema:**Strippede puristiske "meddelelser" injicerer fra native passthrough-anmodninger for at undgå strukturelle afvisninger fra ChatGPT upstream (#806) -**CLI Detection Size Limit:**Sikkert stødte node binære scannings øvre grænse fra 100MB til 350MB, hvilket gjorde det muligt for tunge selvstændige værktøjer som Claude Code (229MB) og OpenCode (153MB) at blive detekteret korrekt af VPS runtime (#809) -**CLI Runtime Environment:**Gendannet mulighed for CLI-konfigurationer til at respektere brugertilsidesættelsesstier (`CLI_{PROVIDER}_BIN`) ved at omgå strenge stibundne opdagelsesregler -**Nvidia Header Conflicts:**Fjernede egenskaber for "prompt_cache_key" fra upstream-headere ved opkald til ikke-antropiske udbydere (#848) -**Codex Fast Tier Toggle:**Gendannet Codex Service Tier skifte kontrast i lystilstand (#842) -**Test Infrastructure:**Opdateret `t28-model-catalog-updates`-test, der forkert forventede det forældede DashScope-slutpunkt for Qwens oprindelige registreringsdatabase---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Custom Provider Rotation:**Integreret 'getRotatingApiKey' internt i DefaultExecutor, der sikrer, at 'extraApiKeys' rotation udløses korrekt for tilpassede og kompatible upstream-udbydere (#815)---

## [3.3.8] - 2026-03-30

### Funktioner

-**Modeller API-filtrering:**Endpoint `/v1/models` filtrerer nu dynamisk sin liste baseret på de tilladelser, der er knyttet til `Autorisation: Bearer <token>`, når begrænset adgang er aktiveret (#781) -**Qoder-integration:**Indbygget integration til Qoder AI, der naturligt erstatter de gamle iFlow-platformkortlægninger (#660) -**Sporing af cache:**Tilføjede sporingsfunktioner og frontend-visualisering (Stats-kort) til semantisk og hurtig cachelagring i Dashboard-brugergrænsefladen### 🐛 Bug Fixes

-**Cache Dashboard Størrelse:**Forbedrede UI-layoutstørrelser og kontekstoverskrifter for de avancerede cache-sider (#835) -**Fejlfinding af sidebjælkesynlighed:**Rettede et problem, hvor fejlretningsknappen ikke ville vise/skjule sidebjælkefejlfindingsdetaljer korrekt (#834) -**Gemini Model Præfiks:**Ændrede navneområdets fallback til korrekt rute via `gemini-cli/` i stedet for `gc/` for at respektere upstream-specifikationer (#831) -**OpenRouter Sync:**Forbedret kompatibilitetssynkronisering for automatisk at indlæse det tilgængelige modelkatalog korrekt fra OpenRouter (#830) -**Streaming Payloads Mapping:**Reserialisering af ræsonnementfelter løser indbygget konfliktaliasstier, når output streames til edge-enheder---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Omstruktureret genereret `opencode.json` for at bruge det `@ai-sdk/openai-compatible` record-baserede skema med `options` og `modeller` som objektkort i stedet for flade arrays, der fikser konfigurationsvalideringsfejl (#816) -**i18n Missing Keys:**Tilføjet manglende `cloudflaredUrlNotice`-oversættelsesnøgle på tværs af alle 30 sprogfiler for at forhindre `MISSING_MESSAGE`-konsolfejl på Endpoint-siden (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Inkluderede prompt cache-tokens sikkert i beregninger af historiske brugsinput for korrekte kvotefradrag (PR #822) -**Kombo-testprober:**Rettede combo-testlogiske falske negativer ved at løse parsing for kun ræsonnementsvar og aktiverede massiv parallelisering via Promise.all (PR #828) -**Docker Quick Tunnels:**Indlejret påkrævede ca-certifikater i basisruntime-containeren for at løse Cloudflared TLS-startfejl og dukkede stdout-netværksfejl, der erstatter generiske exit-koder (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Tilføjet Gemini CLI-kvotesporing i realtid via 'retrieveUserQuota' API'et (PR #825) -**Cache Dashboard:**Forbedrede Cache Dashboard til at vise prompt cache-metrics, 24-timers trends og estimerede omkostningsbesparelser (PR #824)### 🐛 Bug Fixes

-**Brugeroplevelse:**Fjernede invasive auto-åbnende OAuth-modale loops på golde udbyderdetaljerede sider (PR #820) -**Afhængighedsopdateringer:**Bumpede og låste afhængigheder for udviklings- og produktionstræer, herunder Next.js 16.2.1, Recharts og TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A Workflows:**Tilføjet deterministisk FSM orkestrator til multi-trin agent workflows. -**Graceful Degradation:**Tilføjet en ny flerlags reserveramme for at bevare kernefunktionalitet under delvise systemafbrydelser. -**Config Audit:**Tilføjet et revisionsspor med diff-detektion for at spore ændringer og aktivere tilbagerulning af konfigurationer. -**Udbydersundhed:**Tilføjet sporing af udbyderudløb med proaktive UI-advarsler for udløbende API-nøgler. -**Adaptiv routing:**Tilføjet en adaptiv volumen- og kompleksitetsdetektor for at tilsidesætte routingstrategier dynamisk baseret på belastning. -**Udbyderdiversitet:**Implementeret udbyderdiversitetsscoring via Shannon-entropi for at forbedre belastningsfordelingen. -**Auto-deaktiver grænser:**Tilføjet en auto-deaktiver forbudte konti-indstilling til betjeningspanelet for modstandsdygtighed.### 🐛 Bug Fixes

-**Codex & Claude-kompatibilitet:**Rettede UI-faldbacks, rettet Codex-ikke-streaming-integrationsproblemer og løst CLI-runtime-detektion på Windows. -**Udgivelsesautomatisering:**Udvidede tilladelser kræves til Electron App build i GitHub Actions. -**Cloudflare Runtime:**Adresserede korrekte runtime-isolationsudgangskoder for Cloudflared-tunnelkomponenter.### 🧪 Tests

-**Test Suite-opdateringer:**Udvidet testdækning for volumendetektorer, udbyderdiversitet, konfigurationsrevision og FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-pålidelighed:**Patchede GitHub-handlinger til stabile afhængighedsversioner (`actions/checkout@v4`, `actions/upload-artifact@v4`) for at afbøde uanmeldte udskrivninger af buildermiljøer. -**Image Fallbacks:**Erstattet vilkårlige reservekæder i `ProviderIcon.tsx` med eksplicit aktivvalidering for at forhindre UI-indlæsning af `<Image>`-komponenter for filer, der ikke eksisterer, hvilket eliminerer `404`-fejl i dashboard-konsollogfiler (#745). -**Admin Updater:**Dynamisk kildeinstallationsdetektion for dashboard Updater. Deaktiverer sikkert knappen `Opdater nu`, når OmniRoute er bygget lokalt i stedet for gennem npm, hvilket beder om `git pull` (#743). -**Opdater ERESOLVE-fejl:**Injicerede `package.json` tilsidesætter for `react`/`react-dom` og aktiverede `--legacy-peer-deps` i de interne automatiske opdateringsscripts for at løse brydende afhængighedstræ-konflikter med `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Cloudflare Quick Tunnel-integration med kontrol på dashboardet (PR #772). -**Diagnostik:**Semantisk cache-bypass for combo live-tests (PR #773).### 🐛 Bug Fixes

-**Streaming Stabilitet:**Anvend `FETCH_TIMEOUT_MS` til streaminganmodningers indledende `fetch()`-kald for at forhindre 300s Node.js TCP-timeout, der forårsager tavse opgavefejl (#769). -**i18n:**Tilføj manglende 'windsurf' og 'copilot' indgange til 'toolDescriptions' på tværs af alle 33 lokalitetsfiler (#748). -**GLM Coding Audit:**Komplet udbyderaudit, der fikser ReDoS-sårbarheder, kontekstvinduestørrelse (128k/16k) og synkronisering af modelregistrering (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Fallback-behandlingsrettelse for `type: "tekst"`-elementer med null eller tomme datasæt, der forårsagede 400-afvisning (#742). -**Opencode:**Opdater skemajustering til ental `udbyder` for at matche den officielle spec (#774). -**Gemini CLI:**Injicer manglende slutbrugerkvoteoverskrifter, der forhindrer 403-autorisationslockouts (#775). -**DB Recovery:**Refactor multipart nyttelast importerer til rå binære buffere arrays for at omgå reverse proxy max body grænser (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilization**— Færdiggjort v3.2.9-udgivelse (kombidiagnostik, kvalitetsgates, Gemini-værktøjsfix) og oprettet manglende git-tag. Konsolideret alle iscenesatte ændringer i en enkelt atomisk frigivelsesforpligtelse.### 🐛 Bug Fixes

-**Automatisk opdateringstest**— Rettet `buildDockerComposeUpdateScript`-testpåstand til at matche uudvidede shell-variablereferencer (`$TARGET_TAG`, `${TARGET_TAG#v}`) i det genererede implementeringsscript, tilpasset den refaktorerede skabelon fra v3.2.8. -**Circuit Breaker Test**— Hærdet `combo-circuit-breaker.test.mjs` ved at injicere `maxRetries: 0` for at forhindre genforsøgs-inflation i at skævvridning af fejlantal påstande under breaker-tilstandsovergange.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introducerede et live-test-bypass-flag ("forceLiveComboTest"), der giver administratorer mulighed for at udføre ægte upstream-sundhedstjek, der omgår alle lokale kredsløbsafbryder- og nedkølingstilstandsmekanismer, hvilket muliggør præcis diagnostik under udrulningsafbrydelser (PR #759) -**Quality Gates**— Tilføjet automatiseret svarkvalitetsvalidering for kombinationer og officielt integreret "claude-4.6" modelunderstøttelse i de centrale routingskemaer (PR #762)### 🐛 Bug Fixes

-**Værktøjsdefinitionsvalidering**— Repareret Gemini API-integration ved at normalisere enum-typer i værktøjsdefinitioner, hvilket forhindrer upstream HTTP 400-parameterfejl (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Integreret en løsrevet baggrundsopdateringsproces til Docker Compose-implementeringer. Dashboard-brugergrænsefladen sporer nu problemfrit opdateringslivscyklushændelser ved at kombinere JSON REST-svar med SSE-streaming-fremskridtsoverlays for robust pålidelighed på tværs af miljøer. -**Cache Analytics**— Reparerede nul-metrics visualiseringskortlægning ved at migrere Semantic Cache-telemetrilogfiler direkte til det centraliserede sporings-SQLite-modul.### 🐛 Bug Fixes

-**Authentication Logic**— Rettede en fejl, hvor lagring af dashboard-indstillinger eller tilføjelse af modeller mislykkedes med en 401 Uautoriseret fejl, da 'requireLogin' blev deaktiveret. API-endepunkter evaluerer nu den globale godkendelsesskift korrekt. Løst global omdirigering ved at genaktivere `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Forebyggede fatale initialiseringsundtagelser under CLI-miljødetektion ved at fange "cross-spawn" ENOENT-fejl korrekt. Tilføjer eksplicitte registreringsstier til `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Normaliserede modeloversættelsesparametre, der forhindrer kontekstforgiftning i proxy-pass-through-tilstand, og håndhæver eksplicit generiske 'store: false'-begrænsninger for alle Codex-originerede anmodninger. -**SSE Token-rapportering**— Normaliseret udbyderværktøj-opkald-chunk 'finish_reason'-detektion, der fikser 0 % brugsanalyse for svar, der kun er streamet, og mangler strenge '<DONE>'-indikatorer. -**DeepSeek <think>-tags**— Implementerede en eksplicit `<think>`-ekstraktionsmapping inde i `responsesHandler.ts`, der sikrede, at DeepSeek-ræsonnementstrømme kortlægges på samme måde som native antropiske `<thinking>`-strukturer.---

## [3.2.7] - 2026-03-29

### Fixed

-**Sømløse UI-opdateringer**: Funktionen "Opdater nu" på Dashboardet giver nu live, gennemsigtig feedback ved hjælp af Server-Sent Events (SSE). Den udfører pakkeinstallation, native modul-genopbygninger (better-sqlite3), og PM2 genstarter pålideligt, mens den viser realtidsindlæsere i stedet for at hænge stille.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Tilføjet et API-nøglekopiflow med omfang i Api Manager, beskyttet af miljøvariablen `ALLOW_API_KEY_REVEAL`. -**Sidebar synlighedskontrol (#739)**— Administratorer kan nu skjule ethvert sidebar navigationslink via indstillingerne for udseende for at reducere visuel rod. -**Strict Combo Testing (#735)**— Hærdede combo-sundhedstjekket til at kræve direkte tekstsvar fra modeller i stedet for blot bløde tilgængelighedssignaler. -**Streamede detaljerede logfiler (#734)**— Skiftede detaljeret anmodningslogning for SSE-streams for at rekonstruere den endelige nyttelast, hvilket sparer enorme mængder af SQLite-databasestørrelse og rydder op i brugergrænsefladen.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Rettede godkendelsesheaderlogikken for `minimax`-modeller på OpenCode Go for at bruge `x-api-key` i stedet for standardbærer-tokens på tværs af `/messages`-protokollen.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integreret `xbps-src`-pakkeskabelon og instruktioner til indbygget kompilering og installation af OmniRoute med `better-sqlite3`-bindinger via krydskompileringsmål.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI-migrering (#660)**— Fuldstændig migreret den ældre `iFlow`-kerneudbyder til `Qoder AI` med stabile API-routing-kapaciteter.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 nyttelast ugyldigt argument (#731)**— Forebyggede 'thoughtSignature'-array-injektioner inde i standard Gemini-'functionCall'-sekvenser, der blokerer agentiske routing-flows.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Normaliseret kvotegrænselogik og datamærkning inde i Limits-grænsefladen.### 🐛 Bug Fixes

-**Core Routing Schemas & Leaks**— Udvidet `comboStrategySchema` til indbygget understøttelse af `fill-first` og `p2c`-strategier for at fjerne blokeringen af ​​kompleks combo-redigering indbygget. -**Thinking Tags Extraction (CLI)**— Omstruktureret CLI-token-svar sanitizer RegEx, der fanger modelresonnementstrukturer inde i strømme, der undgår ødelagte `<tænkning>`-udtrækninger, der bryder responstekstoutputformat. -**Strenge formathåndhævelser**— Udførelse af hærdet pipeline-saneringsudførelse, hvilket gør den universel gældende for oversættelsestilstandsmål.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Fire-trins anmodningslogpipeline (#705)**— Refaktoreret log-vedholdenhed for at spare omfattende nyttelaster på fire forskellige pipelinestadier: klientanmodning, oversat udbyderanmodning, udbydersvar og oversat klientsvar. Introduceret 'streamPayloadCollector' til robust SSE-streamtrunkering og nyttelastserialisering.### 🐛 Bug Fixes

-**Mobile UI-rettelser (#659)**— Forhindrede tabelkomponenter på dashboardet i at bryde layoutet på smalle visningsporte ved at tilføje korrekt vandret rulning og overløbsindeslutning til `DashboardLayout`. -**Claude Prompt Cache-rettelser (#708)**— Sikret 'cache_control'-blokke i Claude-to-Claude fallback-løkker er trofast bevaret og sendt sikkert tilbage til antropiske modeller. -**Gemini Tool Definitions (#725)**— Rettede skemaoversættelsesfejl ved erklæring af simple 'objekt' parametertyper for Gemini funktionskald.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Når alle kombinationsmodeller er opbrugt (502/503), forsøger OmniRoute nu en konfigurerbar global reservemodel, før fejlen returneres. Indstil 'globalFallbackModel' i indstillingerne for at aktivere.### 🐛 Bug Fixes

-**Fix #721**— Fixed kontekst-pinning-omgåelse under værktøjsopkaldssvar. Ikke-streaming-tagging brugte forkert JSON-sti (`json.messages` → `json.choices[0].message`). Streaming-indsprøjtning udløses nu på "finish_reason"-bidder til streams, der kun er opkald med værktøj. `injectModelTag()` tilføjer nu syntetiske pin-meddelelser til ikke-strengindhold. -**Ret #709**— Bekræftet allerede rettet (v3.1.9) — `system-info.mjs` opretter mapper rekursivt. Lukket. -**Ret #707**— Bekræftet allerede rettet (v3.1.9) — tom værktøjsnavnsanering i `chatCore.ts`. Lukket.### 🧪 Tests

- Tilføjet 6 enhedstests til kontekstpinning med værktøjsopkaldssvar (nullindhold, matrixindhold, rundtur, genindsprøjtning)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**— Tilføjet et dedikeret semantisk caching-dashboard på \`/dashboard/cache\` med målrettet API-invalidering og 31-sprog i18n-understøttelse (PR #701 af @oyi77) -**GLM-kvotesporing**— Tilføjet brugs- og sessionskvotesporing i realtid for GLM Coding (Z.AI)-udbyderen (PR #698 af @christopher-s) -**Detaljeret log-nyttelast**— Kablet fuld fire-trins pipeline-nyttelastregistrering (original, oversat, udbyder-svar, streamede-deltaer) direkte ind i brugergrænsefladen (PR #705 af @rdself)### 🐛 Bug Fixes

-**Ret #708**— Forebygget token-blødning for Claude Code-brugere, der dirigerer gennem OmniRoute ved korrekt at bevare native \`cache_control\`-headere under Claude-to-Claude passthrough (PR #708 af @tombii) -**Ret #719**— Indstil interne godkendelsesgrænser for \`ModelSyncScheduler\` for at forhindre uautentificerede dæmonfejl ved opstart (PR #719 af @rdself) -**Ret #718**— Ombygget badgegengivelse i Provider Limits UI, der forhindrer dårlige kvotegrænser overlap (PR #718 af @rdself) -**Fix #704**— Fixed Combo Fallbacks breaking on HTTP 400 content-policy-fejl, der forhindrer model-rotation dead-routing (PR #704 af @rdself)### 🔒 Security & Dependencies

- Bumpede \`path-to-regexp\` til \`8.4.0\` for at løse dependabot-sårbarheder (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Ret #706**— Fixed icon fallback gengivelse forårsaget af Tailwind V4 `font-sans` tilsidesættelse ved at anvende `!important` til `.material-symbols-outlined`. -**Ret #703**— Rettede GitHub Copilot brudte streams ved at aktivere `responses` til `openai`-formatoversættelse for alle brugerdefinerede modeller, der udnytter `apiFormat: "responses"`. -**Fix #702**— Erstattet standardforbrugssporing med nøjagtige DB-prisberegninger for både streaming- og ikke-streamingsvar. -**Ret #716**— Ryddede op i Claude tool-call oversættelsestilstand, korrekt parsing af streaming-argumenter og forhindrede OpenAI `tool_calls`-bidder i at gentage `id`-feltet.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Autotving strengkodede numeriske JSON-skemabegrænsninger (f.eks. `"minimum": "1"`) til korrekte typer, hvilket forhindrer 400 fejl fra Cursor, Cline og andre klienter, der sender forkerte værktøjsskemaer. -**Tool Description Sanitization**— Sørg for, at værktøjsbeskrivelser altid er strenge; konverterer 'null', 'undefined' eller numeriske beskrivelser til tomme strenge, før de sendes til udbydere. -**Slet alle modeller-knap**— Tilføjet i18n-oversættelser til "Ryd alle modeller"-udbyderhandlingen på tværs af alle 30 sprog. -**Codex Auth Export**— Tilføjet Codex `auth.json` eksport og anvende-lokale knapper til problemfri CLI-integration. -**Windsurf BYOK Notes**— Tilføjet officielle begrænsningsadvarsler til Windsurf CLI-værktøjskortet, der dokumenterer BYOK-begrænsninger.### 🐛 Bug Fixes

-**Ret #709**— `system-info.mjs` går ikke længere ned, når output-mappen ikke eksisterer (tilsat `mkdirSync` med rekursivt flag). -**Fix #710**— A2A `TaskManager` singleton bruger nu `globalThis` til at forhindre tilstandslækage på tværs af Next.js API-rute-omkompileringer i dev-tilstand. E2E testsuite opdateret til at håndtere 401 elegant. -**Fix #711**— Tilføjet udbyderspecifik "max*tokens"-loft for upstream-anmodninger. -**Ret #605 / #592**— Fjern 'proxy*'-præfikset fra værktøjsnavne i ikke-streamende Claude-svar; fast LongCat-validerings-URL. -**Call Logs Max Cap**— Opgraderet `getMaxCallLogs()` med cachelag, env var-understøttelse (`CALL_LOGS_MAX`) og integration af DB-indstillinger.### 🧪 Tests

- Testsuite udvidet fra 964 → 1027 tests (63 nye tests)
- Tilføjet `schema-coercion.test.mjs` — 9 tests for numerisk felttvang og rensning af værktøjsbeskrivelse
- Tilføjet `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI-integrationstests
- Forbedret funktionstestgren med omfattende dækningsværktøj### 📁 New Files

| Fil                                                      | Formål                                                    |
| -------------------------------------------------------- | --------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Skema tvang og værktøjsbeskrivelse sanitiseringsværktøjer |
| `tests/unit/schema-coercion.test.mjs`                    | Enhedstest for skematvang                                 |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI-værktøjsintegrationstest                              |
| `COVERAGE_PLAN.md`                                       | Testdækningsplanlægningsdokument                          | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Rettede cache_control-markører, der blev strippet i Claude passthrough-tilstand (Claude → OmniRoute → Claude), hvilket fik Claude Code-brugere til at opbruge deres Antropiske API-kvote 5-10 gange hurtigere end direkte forbindelser. OmniRoute bevarer nu klientens cache_control-markører, når sourceFormat og targetFormat begge er Claude, hvilket sikrer, at hurtig cachelagring fungerer korrekt og reducerer tokenforbruget dramatisk.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platformkerne:**Implementeret global tilstandshåndtering for skjulte modeller og kombinationer, der forhindrer dem i at rode i kataloget eller lække ind i tilsluttede MCP-agenter (#681). -**Stabilitet:**Patched streaming-nedbrud relateret til den native Antigravity-udbyderintegration mislykkedes på grund af uhåndterede udefinerede tilstandsarrays (#684). -**Lokaliseringssynkronisering:**Implementerede en fuldstændig overhalet `i18n`-synkronisering, der detekterede manglende indlejrede JSON-egenskaber og eftertilpassede 30 lokaliteter sekventielt (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Streaming Stabilitet:**Fixed `hasValuableContent` returnerer `undefined` for tomme bidder i SSE-streams (#676). -**Værktøjsopkald:**Rettede et problem i `sseParser.ts`, hvor ikke-streamende Claude-svar med flere værktøjskald droppede `id'et' for efterfølgende værktøjskald på grund af forkert indeksbaseret deduplikering (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Værktøjsnavne som 'TodoWrite' er ikke længere forankret med 'proxy\_' i Claude passthrough-svar (både streaming og ikke-streaming). Inkluderer enhedstestdækning (PR #663 af @coobabm) -**Ryd alle modellers aliasoprydning**— knappen "Ryd alle modeller" fjerner nu også tilknyttede modelaliasser, hvilket forhindrer spøgelsesmodeller i brugergrænsefladen (PR #664 af @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Satsbegrænsede konti gendannes nu automatisk, når deres nedkølingsvindue udløber, hvilket løser en dødvande, hvor højt "backoffLevel" permanent deprioriterede konti (PR #657 af @brendandebeasi)### 🌍 i18n

-**Kinesisk oversættelseseftersyn**— Omfattende omskrivning af `zh-CN.json` med forbedret nøjagtighed (PR #658 af @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Tilsidesættelse Fix**— Eksplicit `stream: true` i anmodningstekst har nu prioritet over `Accepter: application/json` header. Klienter, der sender begge, vil modtage SSE-streamingsvar korrekt (#656)### 🌍 i18n

-**Tjekkiske strengforbedringer**— Forfinet terminologi på tværs af `cs.json` (PR #655 af @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 manglende oversættelsesnøgler**tilføjet til `en.json` og 12 sprog (PR #652 af @zen0bit) -**Tjekkisk dokumentation opdateret**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guider (PR #652) -**Oversættelsesvalideringsscripts**— `check_translations.py` og `validate_translation.py` for CI/QA (PR #651 af @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritisk: Tool Calling Regression**— Rettede `proxy_Bash`-fejl ved at deaktivere `proxy_`-værktøjets navn-præfiks i Claude passthrough-stien. Værktøjer som 'Bash', 'Read', 'Write' blev omdøbt til 'proxy_Bash', 'proxy_Read' osv., hvilket fik Claude til at afvise dem (#618) -**Kiro Account Ban Documentation**— Dokumenteret som upstream AWS anti-fraud falsk positiv, ikke et OmniRoute-problem (#649)### 🧪 Tests

-**936 test, 0 fejl**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Vision Capability Metadata**: Tilføjet `capabilities.vision`, `input_modalities` og `output_modalities` til `/v1/models` indgange for vision-kompatible modeller (PR #646) -**Gemini 3.1-modeller**: Tilføjet "gemini-3.1-pro-preview" og "gemini-3.1-flash-lite-preview" til Antigravity-udbyderen (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-fejl**: Rettet forkert API-base-URL — ændret fra `api.ollama.com` til officiel `ollama.com/v1/chat/completions` (#643) -**Udløbet tokenforsøg**: Tilføjet afgrænset genforsøg med eksponentiel backoff (5→10→20 min) for udløbne OAuth-forbindelser i stedet for permanent at springe dem over (PR #647)### 🧪 Tests

-**936 test, 0 fejl**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub-problemskabeloner**: Tilføjet standardiseret fejlrapport, funktionsanmodning og konfigurations-/proxyproblemskabeloner (#641) -**Slet alle modeller**: Føjede en "Slet alle modeller"-knap til udbyderens detaljeside med i18n-understøttelse på 29 sprog (#634)### 🐛 Bug Fixes

-**Local Conflict ('in.json')**: Omdøbte hindi-lokalitetsfilen fra 'in.json' (indonesisk ISO-kode) til 'hi.json' for at løse oversættelseskonflikter i Weblate (#642) -**Codex Empty Tool Names**: Flyttede rensning af værktøjsnavne før den oprindelige Codex-passthrough, og fiksede 400 fejl fra upstream-udbydere, når værktøjer havde tomme navne (#637) -**Streaming Newline Artifacts**: Tilføjet "collapseExcessiveNewlines" til respons-desinfektionsmidlet, kollapsede serier af 3+ på hinanden følgende newlines fra tænkende modeller til en standard dobbelt newline (#638) -**Claude Reasoning Effort**: Konverterede OpenAI `reasoning_effort`-param til Claudes oprindelige `tænke`-budgetblok på tværs af alle anmodningsstier, inklusive automatisk `max_tokens`-justering (#627) -**Qwen Token Refresh**: Implementeret proaktive OAuth-token-opdateringer før udløb (5-minutters buffer) for at forhindre anmodninger i at mislykkes ved brug af kortvarige tokens (#631)### 🧪 Tests

-**936 tests, 0 fejl**(+10 tests siden 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-tokens i Claude Code / klientsvar (#617):**

- `sanitizeUsage()` krydskorter nu `input_tokens`→`prompt_tokens` og `output_tokens`→`completion_tokens` før hvidlistefilteret, og retter svar, der viser NaN/0-tokentællinger, når udbydere returnerer Claude-stil brugsfeltnavne### Sikkerhed

- Opdateret `yaml`-pakke for at rette stack overflow-sårbarhed (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Lukket #613 (Codestral — løst med tilpasset udbyder-løsning)
- Kommenterede #615 (OpenCode dual-endpoint — workaround forudsat, sporet som funktionsanmodning)
- Kommenterede #618 (værktøjsopkaldssynlighed — anmoder om v3.0.9-test)
- Kommenterede #627 (indsatsniveau — allerede understøttet)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Oversættelsesfejl for OpenAI-formatudbydere i Claude CLI (#632):**

- Håndter "reasoning_details[]" array-format fra StepFun/OpenRouter - konverterer til "reasoning_content"
- Håndter "reasoning" feltalias fra nogle udbydere → normaliseret til "reasoning_content"
- Brugsfeltnavne på tværs af kort: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` i `filterUsageForFormat`
- Ret `extractUsage` for at acceptere både `input_tokens`/`output_tokens` og `prompt_tokens`/`completion_tokens` som gyldige brugsfelter
- Anvendt på både streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` oversætter) og ikke-streaming (`sanitizeMessage`) stier---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Rettet `client_secret is missing`-fejl for npm-installerede brugere - `clientSecretDefault` var tom i providerRegistry, hvilket fik Google til at afvise anmodninger om token-opdatering (#588) -**OpenCode Zen-modeller:**Tilføjede `modelsUrl` til OpenCode Zen-registreringsposten, så "Importer fra /models" fungerer korrekt (#612) -**Streaming-artefakter:**Rettede for mange nye linjer tilbage i svar efter stripning af thinking-tag-signatur (#626) -**Proxy Fallback:**Tilføjet automatisk genforsøg uden proxy, når SOCKS5-relæet fejler -**Proxytest:**Testendepunkt løser nu rigtige legitimationsoplysninger fra DB via proxy-id### ✨ New Features

-**Legepladskonto/nøglevælger:**Vedvarende, altid synlig rullemenu for at vælge specifikke udbyderkonti/nøgler til test - henter alle forbindelser ved opstart og filtrerer efter valgt udbyder -**CLI Tools Dynamic Models:**Modelvalg henter nu dynamisk fra `/v1/models` API – udbydere som Kiro viser nu deres fulde modelkatalog -**Antigravity Model List:**Opdateret med Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; aktiveret "passthroughModels" for dynamisk modeladgang (#628)### 🔧 Maintenance

- Merged PR #625 — Udbyder begrænser baggrundsfix i lystilstand---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Grænser/Proxy:**Fast Codex-grænsehentning for konti bag SOCKS5-proxyer - token-opdatering kører nu i proxy-kontekst -**CI:**Rettet integrationstest `v1/modeller` påstandsfejl i CI-miljøer uden udbyderforbindelser -**Indstillinger:**Proxy-testknap viser nu succes/fejl resultater med det samme (tidligere skjult bag sundhedsdata)### ✨ New Features

-**Legeplads:**Tilføjet kontovælger-rullemenu — test specifikke forbindelser individuelt, når en udbyder har flere konti### 🔧 Maintenance

- Merged PR #623 — LongCat API base URL-stikorrektion---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Tilføjet tag-grupperingsfunktion til forbindelsesdashboardet for at forbedre den visuelle organisation for konti med tilpassede tags.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Fixed 'TextDecoder'-tilstandskorruption inde i kombinationen 'sanitize' TransformStream, som forårsagede SSE forvansket output, der matchede multibyte-tegn (PR #614) -**Providers UI:**Gengiv HTML-tags sikkert i værktøjstip til udbyderforbindelsesfejl ved hjælp af `dangerouslySetInnerHTML` -**Proxyindstillinger:**Tilføjede manglende "brugernavn" og "adgangskode" egenskaber for nyttelast, der gør det muligt at verificere autentificerede proxyer fra Dashboardet. -**Provider API:**Bundet blød undtagelse vender tilbage til "getCodexUsage", hvilket forhindrer API HTTP 500-fejl, når tokenhentning mislykkes---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Auto-Sync-modeller:**Tilføjet en UI-skifte- og 'sync-models'-slutpunkt for automatisk at synkronisere modellister pr. udbyder ved hjælp af en planlagt intervalplanlægger (PR #597)### 🐛 Bug Fixes

-**Timeouts:**Forhøjede standardproxyer `FETCH_TIMEOUT_MS` og `STREAM_IDLE_TIMEOUT_MS` til 10 minutter for korrekt at understøtte modeller med dybdegående ræsonnement (som o1) uden at afbryde anmodninger (rettelser #609) -**CLI Tool Detection:**Forbedret registrering på tværs af platforme, der håndterer NVM-stier, Windows 'PATHEXT' (forhindrer problemer med '.cmd'-indpakninger) og tilpassede NPM-præfikser (PR #598) -**Streaming logs:**Implementeret `tool_calls` delta-akkumulering i streaming-svar-logs, så funktionsopkald spores og fortsætter nøjagtigt i DB (PR #603) -**Modelkatalog:**Fjernet godkendelsesfritagelse, skjuler "comfyui"- og "sdwebui"-modeller korrekt, når ingen udbyder er eksplicit konfigureret (PR #599)### 🌐 Translations

-**cs:**Forbedrede tjekkiske oversættelsesstrenge på tværs af appen (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Tilføjet et tag/gruppefelt til `EditConnectionModal` (gemt i `providerSpecificData.tag`) uden at kræve DB-skemamigrering.
- Forbindelser i udbydervisningen grupperes nu dynamisk efter tag med visuelle skillelinjer.
- Umærkede forbindelser vises først uden en overskrift, efterfulgt af mærkede grupper i alfabetisk rækkefølge.
- Tag-grupperingen gælder automatisk for Codex/Copilot/Antigravity Limits sektionen, da der findes skifter i forbindelsesrækkerne.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Manglende badges på forbindelseskort:**Rettet ved at bruge `resolveProxyForConnection()` frem for statisk kortlægning. -**Testforbindelse deaktiveret i gemt tilstand:**Aktiverede knappen Test ved at løse proxy-konfiguration fra den gemte liste. -**Config Modal freezing:**Tilføjet `onClose()`-kald efter gem/clear for at forhindre brugergrænsefladen i at fryse. -**Optælling af dobbeltbrug:**`ProxyRegistryManager` indlæser nu forbrug ivrigt ved mount med deduplikering med `scope` + `scopeId`. Brugstal blev erstattet med en testknap, der viser IP/latency inline.#### fix(translator): `function_call` prefix stripping

- Reparerede en ufuldstændig rettelse fra PR #607, hvor kun `tool_use`-blokke fjernede Claudes `proxy_`-værktøjspræfiks. Nu vil klienter, der bruger OpenAI Responses API-formatet, også modtage værktøjsværktøjer korrekt uden "proxy\_"-præfikset.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tre kritiske regressioner rapporteret af brugere efter v3.0.0-lanceringen er blevet løst.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

"Proxy\_"-præfikset tilføjet af Claude OAuth blev kun fjernet fra**streaming**-svar. I tilstanden**ikke-streaming**havde `translateNonStreamingResponse` ingen adgang til `toolNameMap`, hvilket forårsagede, at klienter modtog ødelagte værktøjsnavne som `proxy_read_file` i stedet for `read_file`.

**Ret:**Tilføjede valgfri `toolNameMap`-parameter til `translateNonStreamingResponse` og anvendte præfiks-stripning i Claude `tool_use`-blokhandleren. `chatCore.ts` passerer nu kortet igennem.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI afslører ikke `GET /v1/models`. Den generiske `validateOpenAICompatibleProvider`-validator faldt kun igennem til et chat-afslutningsudfald, hvis `validationModelId` blev indstillet, som LongCat ikke konfigurerer. Dette fik udbydervalideringen til at mislykkes med en vildledende fejl ved tilføjelse/gem.

**Ret:**Føjede 'longcat' til kortet for specialevalidering, undersøgte '/chat/afslutninger' direkte og behandlede ethvert ikke-godkendt svar som et pass.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-værktøjer (f.eks. `pencil`, `computer_use`) videresender værktøjsdefinitioner med `{type:"objekt"}` men uden et `egenskaber`-felt. Anthropics API afviser disse med: "objektskema mangler egenskaber".

**Ret:**I `openai-to-claude.ts`, indsæt `egenskaber: {}` som en sikker standard, når `type` er `"objekt"` og `egenskaber` er fraværende.---

### 🔀 Community PRs Merged (2)

| PR       | Forfatter | Resumé                                                                        |
| -------- | --------- | ----------------------------------------------------------------------------- | --- |
| **#589** | @flobo3   | docs(i18n): fix russisk oversættelse til Playground og Testbed                |
| **#591** | @rdself   | fix(ui): forbedre udbyder begrænser lystilstandskontrast og plan tier display | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 test, 0 fejl**(uændret fra v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Den største udgivelse nogensinde.**Fra 36 udbydere i v2.9.5 til**67+ udbydere**i v3.0.0 — med MCP-server, A2A-protokol, automatisk kombinationsmotor, udbyderikoner, registrerede nøgler API, 926 tests og bidrag fra**12 fællesskabsmedlemmer**på tværs af\*\*10 fusionerede PR'er.
>
> Konsolideret fra v3.0.0-rc.1 til og med rc.17 (17 udgivelseskandidater over 3 dage med intens udvikling).---

### 🆕 New Providers (+31 since v2.9.5)

| Udbyder                       | Alias ​​        | Tier     | Noter                                                                               |
| ----------------------------- | --------------- | -------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | Gratis   | 3 modeller via `opencode.ai/zen/v1` (PR #530 af @kang-heewon)                       |
| **OpenCode Go**               | `opencode-go`   | Betalt   | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 af @kang-heewon)                    |
| **LongCat AI**                | `lc`            | Gratis   | 50M tokens/dag (Flash-Lite) + 500K/dag (Chat/Thinking) under offentlig beta         |
| **Bestøvninger AI**           | `pol`           | Gratis   | Ingen API-nøgle nødvendig — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**     | `cf`            | Gratis   | 10K neuroner/dag — ~150 LLM-svar eller 500s Whisper-lyd, kantinferens               |
| **Scaleway AI**               | `scw`           | Gratis   | 1M gratis tokens til nye konti — EU/GDPR-kompatibel (Paris)                         |
| **AI/ML API**                 | `mål`           | Gratis   | $0,025/dag gratis kreditter — 200+ modeller via enkelt slutpunkt                    |
| **Puter AI**                  | `pu`            | Gratis   | 500+ modeller (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)             |
| **Alibaba Cloud (DashScope)** | `ali`           | Betalt   | Internationale + Kina-endepunkter via `alicode`/`alicode-intl`                      |
| **Alibaba-kodningsplan**      | `bcp`           | Betalt   | Alibaba Model Studio med Anthropic-kompatibel API                                   |
| **Kimi-kodning (API-nøgle)**  | `kmca`          | Betalt   | Dedikeret API-nøgle-baseret Kimi-adgang (adskilt fra OAuth)                         |
| **MiniMax-kodning**           | `minimax`       | Betalt   | Internationalt slutpunkt                                                            |
| **MiniMax (Kina)**            | `minimax-cn`    | Betalt   | Kina-specifikt slutpunkt                                                            |
| **Z.AI (GLM-5)**              | `zai`           | Betalt   | Zhipu AI næste generations GLM-modeller                                             |
| **Vertex AI**                 | `vertex`        | Betalt   | Google Cloud — Tjenestekonto JSON eller OAuth access_token                          |
| **Ollama Cloud**              | `ollamacloud`   | Betalt   | Ollamas hostede API-tjeneste                                                        |
| **Syntetisk**                 | `syntetisk`     | Betalt   | Passthrough models gateway                                                          |
| **Kilo Gateway**              | `kg`            | Betalt   | Passthrough models gateway                                                          |
| **Forvirringssøgning**        | `pplx-søgning`  | Betalt   | Dedikeret søgebaseret slutpunkt                                                     |
| **Serpersøgning**             | `serper-search` | Betalt   | Websøgning API integration                                                          |
| **Modig Søgning**             | `brave-search`  | Betalt   | Brave Search API integration                                                        |
| **Exa-søgning**               | `exa-søgning`   | Betalt   | Neural søgning API integration                                                      |
| **Tavily-søgning**            | `tavily-search` | Betalt   | AI-søgning API-integration                                                          |
| **NanoBanana**                | `nb`            | Betalt   | Billedgenererings-API                                                               |
| **ElevenLabs**                | `el`            | Betalt   | Tekst-til-tale stemmesyntese                                                        |
| **Cartesia**                  | `cartesia`      | Betalt   | Ultrahurtig TTS-stemmesyntese                                                       |
| **PlayHT**                    | `playht`        | Betalt   | Stemmekloning og TTS                                                                |
| **Inworld**                   | 'inworld'       | Betalt   | AI karakter stemmechat                                                              |
| **SD WebUI**                  | `sdwebui`       | Selvvært | Stabil spredning lokal billedgenerering                                             |
| **ComfyUI**                   | `comfyui`       | Selvvært | ComfyUI lokal workflow node-baseret generation                                      |
| **GLM-kodning**               | `glm`           | Betalt   | BigModel/Zhipu kodningsspecifikke slutpunkt                                         | **I alt: 67+ udbydere**(4 gratis, 8 OAuth, 55 API-nøgler) + ubegrænset OpenAI/Anthropic-kompatible brugerdefinerede udbydere.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerer og udsted OmniRoute API-nøgler programmatisk med kvotehåndhævelse pr. udbyder og pr. konto.

| Slutpunkt                       | Metode     | Beskrivelse                                             |
| ------------------------------- | ---------- | ------------------------------------------------------- |
| `/api/v1/registrerede nøgler`   | `POST`     | Udsted en ny nøgle — rå nøgle returneres**kun én gang** |
| `/api/v1/registrerede nøgler`   | `GET`      | Liste registrerede nøgler (maskerede)                   |
| `/api/v1/registered-keys/{id}`  | `GET/SLET` | Hent metadata / Tilbagekald                             |
| `/api/v1/quotas/check`          | `GET`      | Forhåndsvalider kvoten før udstedelse                   |
| `/api/v1/providers/{id}/limits` | `GET/PUT`  | Konfigurer udstedelsesgrænser pr. udbyder               |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`  | Konfigurer grænser for udstedelse pr. konto             |
| `/api/v1/issues/rapport`        | `POST`     | Rapportér kvotebegivenheder til GitHub Issues           |

**Sikkerhed:**Nøgler gemt som SHA-256-hash. Rå nøgle vist én gang ved oprettelsen, kan aldrig genfindes igen.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ udbyderlogoer ved hjælp af `@lobehub/ikoner` React-komponenter (SVG). Fallback-kæde:**Lobehub SVG → eksisterende PNG → generisk ikon**. Anvendt på tværs af Dashboard-, Udbyder- og Agentsider med standardiseret `ProviderIcon`-komponent.#### 🔄 Model Auto-Sync Scheduler (#488)

Opdaterer automatisk modellister for tilsluttede udbydere hver**24 timer**. Kører ved serverstart. Kan konfigureres via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Kortlæg modelnavnemønstre (glob) til specifikke kombinationer til automatisk routing:

- `claude-sonnet*` → kodekombination, `gpt-4o*` → openai-kombination, `gemini-*` → google-kombination
- Ny "model_combo_mappings" tabel med glob-to-regex matching
- Dashboard UI sektion: "Model Routing Rules" med indbygget tilføjelse/rediger/skift/slet#### 🧭 API Endpoints Dashboard

Interaktivt katalog, webhooks-administration, OpenAPI-fremviser - alt på én faneside på `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nye søgeudbyderintegrationer:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— muliggør jordede AI-svar med webdata i realtid.#### 📊 Search Analytics

Ny fane i `/dashboard/analytics` — udbyderopdeling, cachehitrate, omkostningssporing. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Kolonnen `max_requests_per_day` og `max_requests_per_minute` med in-memory sliding-window håndhævelse, der returnerer HTTP 429.#### 🎵 Media Playground

Fuld mediegenereringslegeplads på `/dashboard/media`: Billedgenerering, video, musik, lydtransskription (2 GB uploadgrænse) og tekst-til-tale.---

### 🔒 Security & CI/CD

-**CodeQL-remediering**— Fixed 10+ advarsler: 6 polynomial-redos, 1 insecure-randomness (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection -**Rutevalidering**— Zod-skemaer + 'validateBody()' på**176/176 API-ruter**— CI håndhævet -**CVE-fix**— dompurify XSS-sårbarhed (GHSA-v2wj-7wpq-c8vv) løst via npm-tilsidesættelser -**Fladt**— stødt 3.3.3 → 3.4.2 (CWE-1321 prototype forurening) -**Docker**— Opgraderet `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: Ryd handlingsbar fejl, når "GEMINI_OAUTH_CLIENT_SECRET" mangler i Docker -**#549**— CLI-indstillingsruter løser nu ægte API-nøgle fra `keyId` (ikke maskerede strenge) -**#574**— Login fryser ikke længere efter at have sprunget over opsætning af guidens adgangskode -**#506**— Cross-platform `machineId` omskrevet (Windows REG.exe → macOS ioreg → Linux → hostname fallback)#### Providers & Routing

-**#536**— LongCat AI: fast "baseUrl" og "authHeader" -**#535**— Tilsidesættelse af fastgjort model: `body.model` er korrekt indstillet til `pinnedModel` -**#570**— Upræfikserede Claude-modeller går nu over til antropisk udbyder -**#585**— `<omniModel>` interne tags lækker ikke længere til klienter i SSE-streaming -**#493**— Navngivning af tilpasset udbyders model er ikke længere ødelagt af præfiks-stripning -**#490**— Streaming + kontekstcachebeskyttelse via 'TransformStream'-injektion -**#511**— `<omniModel>`-tag injiceret i første indholdsdel (ikke efter `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + Codex loop: 'værktøjsresultat'-blokke er nu konverteret til tekst -**#524**— OpenCode-konfiguration gemt korrekt (XDG_CONFIG_HOME, TOML-format) -**#522**— API Manager: fjernede den vildledende "Kopiér maskeret nøgle"-knap -**#546**— `--version` returnerer "ukendt" på Windows (PR af @k0valik) -**#544**— Sikker CLI-værktøjsdetektion via kendte installationsstier (PR af @k0valik) -**#510**— Windows MSYS2/Git-Bash-stier normaliseres automatisk -**#492**— CLI registrerer `mise`/`nvm`-administreret node, når `app/server.js` mangler#### Streaming & SSE

-**PR #587**— Gendan `resolveDataDir`-import i responsesTransformer for Cloudflare Workers-kompat (@k0valik) -**PR #495**— Flaskehals 429 uendelig ventetid: slip ventende job på satsgrænsen (@xandr0s) -**#483**— Stop efterfølgende `data: null` efter `[DONE]`-signal -**#473**— Zombie SSE-streams: timeout reduceret 300s → 120s for hurtigere fallback#### Media & Transcription

-**Transskription**— Deepgram `video/mp4` → `audio/mp4` MIME-kortlægning, automatisk sprogregistrering, tegnsætning -**TTS**— "[object Object]" fejlvisning rettet til ElevenLabs-stil indlejrede fejl -**Uploadgrænser**— Medietransskription øget til 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— kolonnen "anmodet_model" i opkaldslogfiler (migrering 009) -**T02**— Fjern tomme tekstblokke fra indlejrede `tool_result.content` -**T03**— Parse `x-codex-5h-*` / `x-codex-7d-*` kvoteoverskrifter -**T04**— "X-Session-Id" header til ekstern sticky routing -**T05**— Rate-limit DB persistens med dedikeret API -**T06**— Konto deaktiveret → permanent blokering (1-års nedkøling) -**T07**— X-Forwarded-For IP-validering (`extractClientIp()`) -**T08**— Sessionsgrænser pr. API-nøgle med håndhævelse af glidende vinduer -**T09**— Codex vs Spark rate-grænseomfang (separate puljer) -**T10**— Credits opbrugt → tydelig 1 times nedkøling -**T11**— 'maks' ræsonnementindsats → 131072 budgettokens -**T12**— MiniMax M2.7 prisangivelser -**T13**— Forældet kvotevisning (nulstil vinduesbevidsthed) -**T14**— Proxy fast-fail TCP-tjek (≤2s, cachelagret 30s) -**T15**— Normalisering af matrixindhold for Antropisk -**T23**— Intelligent kvote nulstilling fallback (header udtræk) -**T24**— '503' nedkøling + '406' kortlægning -**T25**— Udbyder validering fallback -**T29**— Vertex AI Service Account JWT auth -**T33**— Tænkeniveau til budgetkonvertering -**T36**— '403' vs '429' fejlklassificering -**T38**— Centraliserede modelspecifikationer (`modelSpecs.ts`) -**T39**— Endpoint fallback for "fetchAvailableModels". -**T41**— Automatisk omdirigering af baggrundsopgave til flash-modeller -**T42**— Billedgenerering af billedformat#### Other Improvements

-**Per-model upstream tilpassede headers**— via konfigurations-UI (PR #575 af @zhangqiang8vip) -**Modelkontekstlængde**— kan konfigureres i modelmetadata (PR #578 af @hijak) -**Stripning af modelpræfiks**— mulighed for at fjerne udbyderpræfiks fra modelnavne (PR #582 af @jay77721) -**Gemini CLI-udfasning**— markeret som forældet med advarsel om Google OAuth-begrænsning -**YAML-parser**- erstattet brugerdefineret parser med 'js-yaml' for korrekt OpenAPI spec-parsing -**ZWS v5**— HMR-lækagerettelse (485 DB-forbindelser → 1, hukommelse 2,4 GB → 195 MB) -**Log eksport**— Ny JSON-eksportknap på dashboard med rullemenu for tidsinterval -**Opdater meddelelsesbanner**— dashboard-hjemmesiden viser, når nye versioner er tilgængelige---

### 🌐 i18n & Documentation

-**30 sprog**ved 100 % paritet — 2.788 manglende nøgler synkroniseret -**Tjekkisk**— Fuld oversættelse: 22 dokumenter, 2.606 UI-strenge (PR af @zen0bit) -**kinesisk (zh-CN)**— Komplet genoversættelse (PR af @only4copilot) -**VM Deployment Guide**— Oversat til engelsk som kildedokument -**API-reference**— Tilføjede "/v1/embeddings" og "/v1/audio/speech"-slutpunkter -**Udbyderantal**— Opdateret fra 36+/40+/44+ til**67+**på tværs af README og alle 30 i18n README'er---

### 🔀 Community PRs Merged (10)

| PR       | Forfatter       | Resumé                                                               |
| -------- | --------------- | -------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): gendan resolveDataDir-import til Cloudflare Workers-kompat |
| **#582** | @jay77721       | feat(proxy): modelnavn præfiks stripping mulighed                    |
| **#581** | @jay77721       | fix(npm): link elektron-release til npm-publish workflow             |
| **#578** | @hijak          | feat: konfigurerbar kontekstlængde i modelmetadata                   |
| **#575** | @zhangqiang8vip | feat: per-model upstream headers, compat PATCH, chat justering       |
| **#562** | @coobabm        | rettelse: MCP session management, Claude passthrough, detectFormat   |
| **#561** | @zen0bit        | fix(i18n): Tjekkiske oversættelseskorrektioner                       |
| **#555** | @k0valik        | fix(sse): centraliseret `resolveDataDir()` til sti-opløsning         |
| **#546** | @k0valik        | fix(cli): `--version` returnerer `ukendt` på Windows                 |
| **#544** | @k0valik        | fix(cli): sikker CLI-værktøjsdetektion via installationsstier        |
| **#542** | @rdself         | fix(ui): lystilstand kontrast CSS-temavariabler                      |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go-udbydere med `OpencodeExecutor`              |
| **#512** | @zhangqiang8vip | feat: pr-protokol model kompatibilitet (`compatByProtocol`)          |
| **#497** | @zhangqiang8vip | rettelse: dev-mode HMR-ressourcelækker (ZWS v5)                      |
| **#495** | @xandr0s        | fix: Flaskehals 429 uendelig ventetid (drop venter job)              |
| **#494** | @zhangqiang8vip | feat: MiniMax-udvikler→systemrollefix                                |
| **#480** | @prakersh       | rettelse: udvinding af stream flush brug                             |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 og antropiske prissætninger                      |
| **#475** | @only4copilot   | feat(i18n): forbedret kinesisk oversættelse                          |

**Tak til alle bidragydere!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` ``#492`# 5063` `#5063` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537`# 546` `#537`# 5461` `#570` `#574` `#585`---

### 🧪 Tests

-**926 test, 0 fejl**(op fra 821 i v2.9.5)

- +105 nye test, der dækker: model-combo mappings, registrerede nøgler, OpencodeExecutor, Bailian-udbyder, rutevalidering, fejlklassificering, billedformatkortlægning og mere---

### 📦 Database Migrations

| Migration | Beskrivelse                                                                 |
| --------- | --------------------------------------------------------------------------- | --- |
| **008**   | `registrerede_nøgler`, `provider_key_limits`, `account_key_limits` tabeller |
| **009**   | Kolonnen `requested_model` i `opkaldslogs`                                  |
| **010**   | `model_combo_mappings` tabel for kombinationsruting pr. model               | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Brydende ændringer:**Ingen. Alle eksisterende konfigurationer, kombinationer og API-nøgler bevares.
> Databasemigrationer 008-010 kører automatisk ved opstart.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL remediering**— rettet 10+ advarsler:

- 6 polynomial-redos i `provider.ts` / `chatCore.ts` (erstattet `(?:^|/)` alterneringsmønstre med segmentbaseret matchning)
- 1 usikker-tilfældighed i `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-kommando-injektion i `prepublish.mjs` (`JSON.stringify()`-sti escapes) -**Rutevalidering**— Tilføjet Zod-skemaer + `validateBody()` til 5 ruter, der mangler validering:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` passerer nu:**176/176 ruter valideret**### 🐛 Bug Fixes

-**#585**— `<omniModel>` interne tags lækker ikke længere til klienter i SSE-svar. Tilføjet udgående desinficering "TransformStream" i "combo.ts".### ⚙️ Infrastructure

-**Docker**— Opgraderet `docker/setup-buildx-action` fra v3 → v4 (Node.js 20 udfasningsrettelse) -**CI-oprydning**— Slettede 150+ mislykkede/annullerede arbejdsgangskørsler### 🧪 Tests

- Testpakke:**926 test, 0 fejl**(+3 nye)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Øgede grænser for medietransskription
- Tilføjet modelkontekstlængde til registreringsdatabasens metadata
- Tilføjet opstrøms tilpassede headere pr. model via konfigurations-UI
- Rettede flere fejl, Zod-validering for patches og løste forskellige fællesskabsproblemer.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Kombinationsruting pr. model: kortlæg modelnavnemønstre (glob) til specifikke kombinationer til automatisk routing

- Ny "model_combo_mappings" tabel (migrering 010) med mønster, combo_id, priority, aktiveret
- `resolveComboForModel()` DB-funktion med glob-til-regex-matching (uafhængig af store og små bogstaver, `*` og `?` jokertegn)
- `getComboForModel()` i `model.ts`: forstærker `getCombo()` med model-pattern fallback
- `chat.ts`: routingbeslutning tjekker nu model-combo mappings før håndtering af en enkelt model
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: "Model Routing Rules" sektion tilføjet til Combos-siden med indbygget tilføjelse/rediger/skift/slet
- Eksempler: `claude-sonnet*` → kodekombination, `gpt-4o*` → openai-kombination, `gemini-*` → google-kombination### 🌐 i18n

-**Fuld i18n Sync**: 2.788 manglende nøgler tilføjet på tværs af 30 sprogfiler - alle sprog nu med 100 % paritet med 'en.json' -**Agenter side i18n**: OpenCode Integration sektion fuldt internationaliseret (titel, beskrivelse, scanning, download etiketter) -**6 nye nøgler**tilføjet til `agents` navneområde for OpenCode-sektionen### 🎨 UI/UX

-**Providerikoner**: 16 manglende udbyderikoner tilføjet (3 kopierede, 2 downloadede, 11 SVG oprettet) -**SVG fallback**: `ProviderIcon`-komponent opdateret med 4-lags strategi: Lobehub → PNG → SVG → Generisk ikon -**Fingeraftryk af agenter**: Synkroniseret med CLI-værktøjer - tilføjet droid, openclaw, copilot, opencode til fingeraftryksliste (14 i alt)### Sikkerhed

-**CVE-fix**: Løst dompurify XSS-sårbarhed (GHSA-v2wj-7wpq-c8vv) via npm-tilsidesættelser, der tvinger `dompurify@^3.3.2`

- `npm audit` rapporterer nu**0 sårbarheder**### 🧪 Tests

- Testpakke:**923 tests, 0 fejl**(+15 nye modelkombinationskortlægningstest)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Forfatter | Resumé                                                                                          |
| -------- | --------- | ----------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm  | fix(ux): MCP session management, Claude passthrough normalisering, OAuth modal, detectFormat    |
| **#561** | @zen0bit  | fix(i18n): Tjekkiske oversættelseskorrektioner — HTTP-metodenavne og dokumentationsopdateringer | ### 🧪 Tests |

- Testpakke:**908 test, 0 fejl**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**løs ægte API-nøgle fra `keyId` i CLI-indstillingsruter (`codex-indstillinger`, `droid-indstillinger`, `kilo-indstillinger`) for at forhindre skrivning af maskerede strenge (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Forfatter | Resumé                                                                                                                                                                |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik  | fix(cli): `--version` returnerer `ukendt` på Windows — brug `JSON.parse(readFileSync)` i stedet for ESM-import                                                        |
| **#555** | @k0valik  | fix(sse): centraliseret `resolveDataDir()` til sti-opløsning i legitimationsoplysninger, autoCombo, svarlogger og anmodningslogger                                    |
| **#544** | @k0valik  | fix(cli): sikker CLI-værktøjsdetektion via kendte installationsstier (8 værktøjer) med symlink-validering, filtypetjek, størrelsesgrænser, minimal env i sundhedstjek |
| **#542** | @rdself   | fix(ui): forbedre lystilstandens kontrast — tilføj manglende CSS-temavariabler (`bg-primary`, `bg-subtle`, `text-primary`) og ret kun mørke farver i logdetaljer      | ### 🔧 Bug Fixes |

-**TDZ rettelse i `cliRuntime.ts`**— `validateEnvPath` blev brugt før initialisering ved modulopstart af `getExpectedParentPaths()`. Omarrangerede erklæringer for at rette 'ReferenceError'. -**Bygrettelser**— Tilføjet `pino` og `pino-pretty` til `serverExternalPackages` for at forhindre Turbopack i at bryde Pinos interne arbejdsindlæsning.### 🧪 Tests

- Testpakke:**905 test, 0 fejl**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron build-regression: nedgraderet Next.js fra `16.1.x` til `16.0.10` for at eliminere Turbopack-modul-hashing-ustabilitet, der forårsagede tomme skærme i Electron desktop-pakken. -**Enhedstestrettelser**— Rettede to forældede testpåstande (`nanobanana-image-handler` aspektforhold/opløsning, `thinking-budget` Gemini `thinkingConfig` feltmapping), der var drevet efter nylige implementeringsændringer. -**#541**— Svarede på brugerfeedback om installationens kompleksitet; ingen kodeændringer påkrævet.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementeret ved hjælp af `jose`-biblioteket til at håndtere JWT/Service Account-godkendelse sammen med konfigurerbare regioner i brugergrænsefladen og automatisk partnermodel-URL-bygning. -**T42**— Kortlægning af billedgenerering af aspektforhold: oprettet `sizeMapper`-logik til generiske OpenAI-formater (`størrelse`), tilføjet native `imagen3`-håndtering og opdaterede NanoBanana-slutpunkter for at bruge kortlagte billedformater automatisk. -**T38**— Centraliserede modelspecifikationer: `modelSpecs.ts` oprettet for grænser og parametre pr. model.### 🔧 Improvements

-**T40**— Integration af OpenCode CLI-værktøjer: indbygget "opencode-zen" og "opencode-go" integration gennemført i tidligere PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` nedkøling afventer rettelse + `406` mapping: kortlagt `406 ikke acceptabelt` til `503 Service Utilgængelig` med korrekte nedkølingsintervaller. -**T25**— Provider validering fallback: yndefuld fallback til standard valideringsmodeller, når et specifikt `validationModelId` ikke er til stede. -**T36**— `403` vs `429` leverandørhåndteringsforfining: ekstraheret i `errorClassifier.ts` for korrekt at adskille hårde tilladelsesfejl (`403`) fra hastighedsgrænser (`429`). -**T39**— Endpoint Fallback for `fetchAvailableModels`: implementeret en tri-tier-mekanisme (`/models` -> `/v1/models` -> lokalt generisk katalog) + `list_models_catalog` MCP-værktøjsopdateringer for at afspejle `kilde` og `advarsel`. -**T33**— Tænkeniveau til budgetkonvertering: omsætter kvalitative tænkningsniveauer til præcise budgetallokeringer. -**T41**— Automatisk omdirigering af baggrundsopgave: dirigerer automatisk tunge baggrundsevalueringsopgaver til flash/effektive modeller. -**T23**— Intelligent kvote-nulstilling: udtrækker nøjagtigt "x-ratelimit-reset" / "gentag-efter" header-værdier eller kortlægger statiske nedkøling.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Opgradering fra v2.9.5:**16 problemer løst · 2 community PR'er fusioneret · 2 nye udbydere · 7 nye API-slutpunkter · 3 nye funktioner · DB-migrering 008+009 · 832 tests bestået · 15 sub2api gap-forbedringer (T01–T15 komplet).### 🆕 New Providers

| Udbyder          | Alias ​​       | Tier   | Noter                                                            |
| ---------------- | -------------- | ------ | ---------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratis | 3 modeller via `opencode.ai/zen/v1` (PR #530 af @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Betalt | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 af @kang-heewon) |

Begge udbydere bruger den nye `OpencodeExecutor` med multi-format routing (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerer og udsted OmniRoute API-nøgler programmatisk med kvotehåndhævelse pr. udbyder og pr. konto.

| Slutpunkt                             | Metode    | Beskrivelse                                             |
| ------------------------------------- | --------- | ------------------------------------------------------- |
| `/api/v1/registrerede nøgler`         | `POST`    | Udsted en ny nøgle — rå nøgle returneres**kun én gang** |
| `/api/v1/registrerede nøgler`         | `GET`     | Liste registrerede nøgler (maskerede)                   |
| `/api/v1/registered-keys/{id}`        | `GET`     | Hent nøglemetadata                                      |
| `/api/v1/registered-keys/{id}`        | `SLET`    | Tilbagekald en nøgle                                    |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Tilbagekald (for klienter uden DELETE-support)          |
| `/api/v1/quotas/check`                | `GET`     | Forhåndsvalider kvoten før udstedelse                   |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Konfigurer udstedelsesgrænser pr. udbyder               |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Konfigurer grænser for udstedelse pr. konto             |
| `/api/v1/issues/rapport`              | `POST`    | Rapportér kvotebegivenheder til GitHub Issues           |

**DB — Migration 008:**Tre nye tabeller: `registrerede_nøgler`, `provider_key_limits`, `account_key_limits`.
**Sikkerhed:**Nøgler gemt som SHA-256-hash. Rå nøgle vist én gang ved oprettelsen, kan aldrig genfindes igen.
**Kvotetyper:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` pr. udbyder og pr. konto.
**Idempotens:**Feltet `idempotency_key` forhindrer duplikatudstedelse. Returnerer "409 IDEMPOTENCY_CONFLICT", hvis nøglen allerede var brugt.
**Budget pr. nøgle:**`dailyBudget` / `hourlyBudget` — begrænser, hvor mange anmodninger en nøgle kan dirigere pr. vindue.
**GitHub-rapportering:**Valgfrit. Indstil `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` for automatisk at oprette GitHub-problemer ved overskredet kvote eller udstedelsesfejl.#### 🎨 Provider Icons — @lobehub/icons (#529)

Alle udbyderikoner i dashboardet bruger nu `@lobehub/icons` React-komponenter (130+ udbydere med SVG).
Fallback-kæde:**Lobehub SVG → eksisterende `/providers/{id}.png` → generisk ikon**. Bruger et korrekt React `ErrorBoundary`-mønster.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute opdaterer nu automatisk modellister for tilsluttede udbydere hver**24 timer**.

- Kører ved serverstart via den eksisterende `/api/sync/initialize` hook
- Kan konfigureres via miljøvariabelen `MODEL_SYNC_INTERVAL_HOURS`
- Dækker 16 store udbydere
- Registrerer sidste synkroniseringstid i indstillingsdatabasen---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Ryd handlingsbar fejl, når `GEMINI_OAUTH_CLIENT_SECRET` mangler i Docker/selv-hostede implementeringer. Tidligere vist kryptisk 'client_secret is missing' fra Google. Giver nu specifikke `docker-compose.yml` og `~/.omniroute/.env` instruktioner.#### Providers & Routing

-**#536 — LongCat AI:**Fixed `baseUrl` (`api.longcat.chat/openai`) og `authHeader` (`Autorisation: Bearer`). -**#535 — Tilsidesættelse af fastgjort model:**`body.model` er nu korrekt indstillet til "pinnedModel", når kontekst-cache-beskyttelse er aktiv. -**#532 — OpenCode Go-nøglevalidering:**Bruger nu `zen/v1`-testendepunktet (`testKeyBaseUrl`) - samme nøgle virker for begge niveauer.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**`tool_result` blokke konverteres nu til tekst i stedet for at blive droppet, hvilket stopper uendelige værktøjs-resultat loops. -**#524 — OpenCode config save:**Tilføjet `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME bevidst, skriver TOML). -**#521 — Login fast:**Login fryser ikke længere efter at have springet adgangskodeopsætningen over — omdirigerer korrekt til onboarding. -**#522 — API Manager:**Fjernede vildledende "Kopiér maskeret nøgle"-knap (erstattet med et låseikon værktøjstip). -**#532 — OpenCode Go config:**Guideindstillingsbehandler håndterer nu `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Manglende `googleProjectId` returnerer en struktureret 422-fejl med gentilslutningsvejledning i stedet for et kryptisk nedbrud. -**#510 — Windows-stier:**MSYS2/Git-Bash-stier (`/c/Program Files/...`) normaliseres nu automatisk til `C:\Program Files\...`. -**#492 — CLI-start:**`omniroute` CLI registrerer nu `mise`/`nvm`-administreret node, når `app/server.js` mangler og viser målrettede rettelsesinstruktioner.---

### 📖 Documentation Updates

-**#513**— Nulstilling af Docker-adgangskode: `INITIAL_PASSWORD` env var workaround dokumenteret -**#520**— pnpm: "pnpm approve-builds better-sqlite3" trin dokumenteret---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Forfatter    | Resumé                                                                |
| -------- | ------------ | --------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go-udbydere med `OpencodeExecutor` og forbedrede tests | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` i `providers.ts`. Den eksisterende kolonne "rate_limited_until" er nu eksponeret som en dedikeret API - OAuth-tokenopdatering må IKKE røre dette felt for at forhindre hastighedsbegrænsningsløkker. -**T08**— Per-API-nøgle sessionsgrænse: `max_sessions INTEGER DEFAULT 0` tilføjet til `api_keys` via automatisk migrering. `sessionManager.ts` får `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` og `getActiveSessionCountForKey()`. Opkaldere i `chatCore.js` kan håndhæve grænsen og dekrementerne på `req.close`. -**T09**— Codex vs Spark rate-limit scopes: `getCodexModelScope()` og `getCodexRateLimitKey()` i `codex.ts`. Standardmodeller (`gpt-5.x-codex`, `codex-mini`) får scope `"codex"`; gnistmodeller (`codex-spark*`) får scope `"gnist"`. Rate-limit nøgler skal være `${accountId}:${scope}`, så udtømning af en pulje blokerer ikke den anden. -**T13**— Forældet kvotevisning rettelse: `getEffectiveQuotaUsage(used, resetAt)` returnerer `0` når nulstillingsvinduet er passeret; `formatResetCountdown(resetAt)` returnerer en menneskelig læsbar nedtællingsstreng (f.eks. `"2t 35m"`). Begge eksporteret fra `providers.ts` + `localDb.ts` til dashboard-forbrug. -**T14**— Proxy fast-fail: ny `src/lib/proxyHealth.ts` med `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP check, ≤2s i stedet for 30s timeout), `getCachedProxyHealth()`, `alth(invalidate)Proxy `getAllProxyHealthStatuses()`. Resultater cachelagret 30s som standard; kan konfigureres via `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testpakke:**832 test, 0 fejl**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— kolonnen 'requested_model' i 'call_logs' (migrering 009): spor, hvilken model klienten oprindeligt anmodede om i forhold til den faktiske routede model. Aktiverer fallback rate-analyse. -**T02**— Fjern tomme tekstblokke fra indlejrede `tool_result.content`: forhindrer Anthropic 400-fejl (`tekstindholdsblokke skal være ikke-tomme`), når Claude Code chains-værktøjet resulterer. -**T03**— Parse `x-codex-5h-*` / `x-codex-7d-*` headers: `parseCodexQuotaHeaders()` + `getCodexResetTime()` udtræk Codex-kvotevinduer for præcis nedkølingsplanlægning i stedet for generisk 5-minutters fallback. -**T04**— `X-Session-Id`-header til ekstern sticky routing: `extractExternalSessionId()` i `sessionManager.ts` læser `x-session-id` / `x-omniroute-session`-headere med `ext:`-præfikset for at undgå kollision med interne SHA-256-sessions-ID'er. Nginx-kompatibel (bindestreger overskrift). -**T06**— Konto deaktiveret → permanent blokering: `isAccountDeactivated()` i `accountFallback.ts` registrerer 401 deaktiveringssignaler og anvender en 1-årig nedkøling for at forhindre gentagelse af permanent døde konti. -**T07**— X-Forwarded-For IP-validering: ny `src/lib/ipUtils.ts` med `extractClientIp()` og `getClientIpFromRequest()` - springer `unknown`/ikke-IP-poster over i `X-Forwarded-For`-kæder (Nginx/proxy-forwarded requests). -**T10**— Credits opbrugt → distinct fallback: `isCreditsExhausted()` i `accountFallback.ts` returnerer 1 times nedkøling med flaget "creditsExhausted", adskilt fra generisk 429-satsbegrænsning. -**T11**— `max` ræsonnement indsats → 131072 budgettokens: `EFFORT_BUDGETS` og `THINKING_LEVEL_MAP` opdateret; Omvendt kortlægning returnerer nu `"max"` for fuldbudgetsvar. Enhedstest opdateret. -**T12**— MiniMax M2.7 prissætninger tilføjet: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` tilføjet til pristabellen (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi-priser eksisterede allerede. -**T15**— Normalisering af matrixindhold: `normalizeContentToString()`-hjælperen i `openai-to-claude.ts` kollapser array-formaterede system-/værktøjsmeddelelser korrekt til en streng, før de sendes til Anthropic.### 🧪 Tests

- Testpakke:**832 test, 0 fejl**(uændret fra rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: automatisk udstedelse af API-nøgler med kvotehåndhævelse pr. udbyder og pr. konto

- `POST /api/v1/registered-keys` — udstede nøgler med idempotensunderstøttelse
- `GET /api/v1/registered-keys` — liste (maskerede) registrerede nøgler
- `GET /api/v1/registered-keys/{id}` — hent nøglemetadata
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — tilbagekald nøgler
- `GET /api/v1/quotas/check` — forhåndsvalider før udstedelse
- `PUT /api/v1/providers/{id}/limits` — sæt grænser for udbyderudstedelse
- `PUT /api/v1/accounts/{id}/limits` — sæt grænser for kontoudstedelse
- `POST /api/v1/issues/report` — valgfri GitHub-problemrapportering
- DB-migrering 008: "registrerede_nøgler", "udbydernøglegrænser", "kontonøglegrænser"-tabeller---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen- og OpenCode Go-udbydere tilføjet (af @kang-heewon)

- Ny `OpencodeExecutor` med multi-format routing (`/chat/completions`, `/messages`, `/responses`)
- 7 modeller på tværs af begge niveauer---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Udbyderikoner bruger nu [@lobehub/icons](https://github.com/lobehub/lobe-icons) med yndefuld PNG-tilbagegang og en `ProviderIcon`-komponent (130+ udbydere understøttes) -**#488**— Auto-opdater modellister hver 24. time via `modelSyncScheduler` (kan konfigureres via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: viser nu en klar handlingsfejl, når "GEMINI_OAUTH_CLIENT_SECRET" mangler i Docker/selv-hostede implementeringer---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI nøglevalidering: fast baseUrl (`api.longcat.chat/openai`) og authHeader (`Autorisation: Bearer`) -**#535**— Tilsidesættelse af fastgjort model: "body.model" er nu indstillet til "pinnedModel", når kontekstcache-beskyttelse registrerer en fastgjort model -**#524**— OpenCode-konfiguration er nu gemt korrekt: tilføjet `saveOpenCodeConfig()`-handler (XDG_CONFIG_HOME opmærksom, skriver TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Login hænger ikke længere fast efter at have sprunget adgangskodeopsætningen over (omdirigerer til onboarding) -**#522**— API Manager: Fjernet vildledende "Kopiér maskeret nøgle"-knap (erstattet med låseikon værktøjstip) -**#527**— Claude Code + Codex superpowers loop: "værktøjsresultat"-blokke er nu konverteret til tekst i stedet for at blive droppet -**#532**— OpenCode GO API-nøglevalidering bruger nu det korrekte `zen/v1`-slutpunkt (`testKeyBaseUrl`) -**#489**— Antigravity: manglende "googleProjectId" returnerer struktureret 422-fejl med gentilslutningsvejledning -**#510**— Windows: MSYS2/Git-Bash stier (`/c/Program Files/...`) er nu normaliseret til `C:\Program Files\...` -**#492**— `omniroute` CLI registrerer nu `mise`/`nvm` når `app/server.js` mangler og viser målrettet rettelse### Dokumentation

-**#513**— Nulstilling af Docker-adgangskode: `INITIAL_PASSWORD` env var workaround dokumenteret -**#520**— pnpm: "pnpm approve-builds better-sqlite3" dokumenteret### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Nye OpenCode-udbydere, rettelse af indlejring af legitimationsoplysninger, CLI-maskeret nøglefejl, CACHE_TAG_PATTERN rettelse.### 🐛 Bug Fixes

-**CLI-værktøjer gemmer maskeret API-nøgle til konfigurationsfiler**— POST-ruter 'claude-indstillinger', 'cline-indstillinger' og 'openclaw-indstillinger' accepterer nu en 'keyId'-param og løser den rigtige API-nøgle fra DB før skrivning til disk. `ClaudeToolCard` opdateret til at sende `keyId` i stedet for den maskerede displaystreng. Rettelser #523, #526. -**Tilpassede indlejringsudbydere: `Ingen legitimationsoplysninger` fejl**— `/v1/embeddings` sporer nu `credentialsProviderId` separat fra routingpræfikset, så legitimationsoplysninger hentes fra det matchende udbydernode-id i stedet for den offentlige præfiksstreng. Retter en regression, hvor `google/gemini-embedding-001` og lignende tilpassede udbydermodeller altid ville fejle med en legitimationsfejl. Rettelser #532-relateret. (PR #528 af @jacob2826) -**Regex-beskyttelse af kontekstcache mangler `
` præfiks**— `CACHE_TAG_PATTERN` i `comboAgentMiddleware.ts` opdateret til at matche både bogstavelige `
` (backslash-n) og faktisk nylinje U+000A, som `combo.ts`-streaming injicerer omkring `<omniModel>`-tagget efter rettelse #515. Rettelser #531.### ✨ New Providers

-**OpenCode Zen**— Gratis tier-gateway på `opencode.ai/zen/v1` med 3 modeller: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Abonnementstjeneste på `opencode.ai/zen/go/v1` med 4 modeller: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude-format), `minimax-m2.5` (Claude-format)

- Begge udbydere bruger den nye `OpencodeExecutor` som ruter dynamisk til `/chat/completions`, `/messages`, `/responses` eller `/models/{model}:generateContent` baseret på den ønskede model. (PR #530 af @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Fejlrettelser — bevar Codex-prompt-cache-nøgle, ret tagContent JSON-escape, synkroniser udløbet token-status til DB.### 🐛 Bug Fixes

-**fix(oversætter)**: Bevar `prompt_cache_key` i Responses API → Chat-afslutninger oversættelse (#517)
— Feltet er et cache-affinitetssignal, der bruges af Codex; at strippe den forhindrede hurtige cache-hits.
Rettet i `openai-responses.ts` og `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` i `tagContent`, så den injicerede JSON-streng er gyldig (#515)
— Skabelon literal newlines (U+000A) er ikke tilladt unescaped inde i JSON-strengværdier.
Erstattet med `\n` bogstavelige sekvenser i `open-sse/services/combo.ts`.

-**fix(brug)**: Synkroniser udløbet tokenstatus tilbage til DB ved live godkendelsesfejl (#491)
— Når Limits & Quotas live check returnerer 401/403, er forbindelsen 'testStatus' nu opdateret
til `"udløbet"` i databasen, så udbydersiden afspejler den samme forringede tilstand.
Rettet i `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Tilføj 5 nye gratis AI-udbydere — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(udbydere/longcat)**: Tilføj LongCat AI (`lc/`) — 50M tokens/dag gratis (Flash-Lite) + 500K/dag (Chat/Thinking) under offentlig beta. OpenAI-kompatibel, standard Bearer-aut. -**feat(udbydere/bestøvninger)**: Tilføj Pollinations AI (`pol/`) — ingen API-nøgle påkrævet. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s gratis). Custom executor håndterer valgfri godkendelse. -**feat(providers/cloudflare-ai)**: Tilføj Cloudflare Workers AI (`cf/`) — 10K neuroner/dag gratis (~150 LLM-svar eller 500s Whisper-lyd). 50+ modeller på global kant. Tilpasset eksekvering bygger dynamisk URL med "accountId" fra legitimationsoplysninger. -**feat(providers/scaleway)**: Tilføj Scaleway Generative API'er (`scw/`) — 1M gratis tokens til nye konti. EU/GDPR-kompatibel (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Tilføj AI/ML API (`aiml/`) - $0,025/dag gratis kredit, 200+ modeller (GPT-4o, Claude, Gemini, Llama) via enkelt aggregator-endepunkt.### 🔄 Provider Updates

-**feat(udbydere/sammen)**: Tilføj `hasFree: true` + 3 permanent gratis model-id'er: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free -**feat(providers/gemini)**: Tilføj 'hasFree: true' + 'freeNote' (1.500 req/dag, intet kreditkort nødvendigt, aistudio.google.com) -**chore(providers/gemini)**: Omdøb visningsnavn til "Gemini (Google AI Studio)" for klarhed### ⚙️ Infrastructure

-**feat(executors/bestøvninger)**: Ny "PollinationsExecutor" — udelader "Autorisation"-headeren, når der ikke er angivet nogen API-nøgle -**feat(executors/cloudflare-ai)**: Ny "CloudflareAIExecutor" — dynamisk URL-konstruktion kræver "accountId" i udbyderens legitimationsoplysninger -**feat(executors)**: Registrér `bestøvninger`, `pol`, `cloudflare-ai`, `cf` eksekutørmappings### Dokumentation

-**docs(readme)**: Udvidet gratis kombinationsstak til 11 udbydere ($0 for evigt) -**docs(readme)**: Tilføjet 4 nye gratis udbydersektioner (LongCat, Pollinations, Cloudflare AI, Scaleway) med modeltabeller -**docs(readme)**: Opdateret pristabel med 4 nye gratis rækker -**docs(i18n/pt-BR)**: Opdateret pristabel + tilføjet LongCat/Pollinations/Cloudflare AI/Scaleway-sektioner på portugisisk -**docs(new-features/ai)**: 10 opgavespecifikke filer + masterimplementeringsplan i `docs/new-features/ai/`### 🧪 Tests

- Testpakke:**821 test, 0 fejl**(uændret)---

## [2.9.2] — 2026-03-21

> Sprint: Ret medietransskription (Deepgram/HuggingFace Content-Type, sprogdetektion) og TTS-fejlvisning.### 🐛 Bug Fixes

-**fix(transskription)**: Deepgram og HuggingFace lydtransskription kortlægger nu `video/mp4` → `audio/mp4` og andre MIME-medietyper via den nye `resolveAudioContentType()`-hjælper. Tidligere gav upload af `.mp4`-filer konsekvent "Ingen tale fundet", fordi Deepgram modtog "Content-Type: video/mp4". -**fix(transcription)**: Tilføjet `detect_language=true` til Deepgram-anmodninger - detekterer automatisk lydsprog (portugisisk, spansk, osv.) i stedet for som standard til engelsk. Retter ikke-engelske transskriptioner, der returnerer tomme eller skraldede resultater. -**fix(transcription)**: Tilføjet `punctuate=true` til Deepgram-anmodninger om transskriptionsoutput af højere kvalitet med korrekt tegnsætning. -**fix(tts)**: "[object Object]" fejlvisning i tekst-til-tale-svar rettet i både "audioSpeech.ts" og "audioTranscription.ts". `upstreamErrorResponse()`-funktionen udtrækker nu indlejrede strengmeddelelser korrekt fra udbydere som ElevenLabs, der returnerer `{ error: { message: "...", status_code: 401 } }` i stedet for en flad fejlstreng.### 🧪 Tests

- Testpakke:**821 test, 0 fejl**(uændret)### Triaged Issues

-**#508**— Regression af værktøjsopkaldsformat: anmodede proxylogfiler og udbyderkædeoplysninger ('behovsinfo') -**#510**— Windows CLI-sundhedstjeksti: anmodet shell-/nodeversionsoplysninger ('behovsinfo') -**#485**— Kiro MCP-værktøjskald: lukket som eksternt Kiro-problem (ikke OmniRoute) -**#442**— Baseten /modellers slutpunkt: lukket (dokumenteret manuel løsning) -**#464**— Key provisioning API: anerkendt som roadmap-element---

## [2.9.1] — 2026-03-21

> Sprint: Ret SSE omniModel datatab, flet modelkompatibilitet pr. protokol.### Bug Fixes

-**#511**— Kritisk: `<omniModel>`-tag blev sendt efter `finish_reason:stop` i SSE-streams, hvilket forårsagede datatab. Tag er nu injiceret i den første ikke-tomme indholdsdel, hvilket garanterer levering, før SDK'er lukker forbindelsen.### Merged PRs

-**PR #512**(@zhangqiang8vip): Modelkompatibilitet pr. protokol — `normalizeToolCallId` og `preserveOpenAIDeveloperRole` kan nu konfigureres pr. klientprotokol (OpenAI, Claude, Responses API). Nyt `compatByProtocol`-felt i modelkonfiguration med Zod-validering.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: anmodede PATH/versionsoplysninger -**#509**— Turbopack Electron regression: upstream Next.js-fejl, dokumenterede løsninger -**#508**— macOS sort skærm: foreslået "--disable-gpu"-løsning---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.### ✨ New Features

-**feat(search)**: Search Analytics-fanen i `/dashboard/analytics` — udbyderopdeling, cachehitrate, omkostningssporing. Ny API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope tilføjet med tilpasset slutpunktstivalidering - konfigurerbar "chatPath" og "modelsPath" pr. node (#feat/custom-endpoint-paths) -**feat(api)**: Grænser for antal anmodninger pr. API-nøgle — kolonnerne `max_requests_per_day` og `max_requests_per_minute` med in-memory sliding-window håndhævelse, der returnerer HTTP 429 (#452) -**feat(dev)**: ZWS v5 — HMR-lækagerettelse (485 DB-forbindelser → 1), hukommelse 2,4 GB → 195 MB, 'globalThis'-singletoner, Edge Runtime-advarselsrettelse (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` omskrevet med try/catch waterfall (Windows REG.exe → macOS ioreg → Linux-fil læst → værtsnavn → `os.hostname()`). Eliminerer `process.platform`-grening, som Next.js bundler død-kode-elimineret, og fikser `'hoved' ikke genkendes` på Windows. Retter også #466. -**fix(#493)**: Navngivning af brugerdefineret udbydermodel — fjernede forkert præfiksstripping i `DefaultExecutor.transformRequest()`, der manipulerede model-id'er med organisationsomfang som `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + kontekstcachebeskyttelse — `TransformStream` opsnapper SSE for at injicere `<omniModel>`-tag før `[DONE]`-markøren, hvilket aktiverer kontekstcachebeskyttelse for streamingsvar. -**fix(#458)**: Kombinationsskemavalidering — `system_message`, `tool_filter_regex`, `context_cache_protection` felter passerer nu Zod-validering ved lagring. -**fix(#487)**: KIRO MITM-kortoprydning — fjernet ZWS_README, genereret `AntigravityToolCard` for at bruge dynamiske værktøjsmetadata.### 🧪 Tests

- Tilføjede værktøjer i antropisk format filterenhedstests (PR #397) — 8 regressionstest for `værktøj.navn` uden `.funktion`-indpakning
- Testpakke:**821 test, 0 fejl**(op fra 813)### 📋 Issues Closed (8)

-**#506**— Windows-maskine-id-'hoved' genkendes ikke (fast) -**#493**— Navngivning af tilpasset udbydermodel (fast) -**#490**— Streamingkontekstcache (fast) -**#452**— Anmodningsgrænser pr. API-nøgle (implementeret) -**#466**— Windows-loginfejl (samme årsag som #506) -**#504**— MITM inaktiv (forventet adfærd) -**#462**— Gemini CLI PSA (løst) -**#434**— Elektronappnedbrud (duplikat af #402)## [2.8.9] — 2026-03-20

> Sprint: Flet fællesskabs-PR'er, ret KIRO MITM-kort, afhængighedsopdateringer.### Merged PRs

-**PR #498**(@Sajid11194): Ret Windows-maskine-id-nedbrud (`undefined\REG.exe`). Erstatter 'node-machine-id' med native OS-registreringsforespørgsler.**Lukker #486.** -**PR #497**(@zhangqiang8vip): Ret dev-mode HMR-ressourcelækager — 485 lækkede DB-forbindelser → 1, hukommelse 2,4 GB → 195 MB. "globalThis" singletons, Edge Runtime advarselsrettelse, Windows test stabilitet. (+1168/-338 på tværs af 22 filer) -**PRs #499-503**(Dependabot): GitHub Actions-opdateringer — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `@4`.-action### Bug Fixes

-**#505**— KIRO MITM-kortet viser nu værktøjsspecifikke instruktioner (`api.anthropic.com`) i stedet for antigravity-specifik tekst. -**#504**— Svarede med UX-afklaring (MITM "Inaktiv" er forventet adfærd, når proxy ikke kører).---

## [2.8.8] — 2026-03-20

> Sprint: Ret OAuth batch-testnedbrud, tilføj knappen "Test alle" til individuelle udbydersider.### Bug Fixes

-**OAuth batch-testnedbrud**(ERR_CONNECTION_REFUSED): Erstattet sekventiel for-loop med 5-forbindelses samtidighedsgrænse + 30s pr. forbindelse timeout via `Promise.race()` + `Promise.allSettled()`. Forhindrer servernedbrud ved test af store OAuth-udbydergrupper (~30+ forbindelser).### Funktioner

-**"Test alle"-knap på udbydersider**: Individuelle udbydersider (f.eks. `/providers/codex`) viser nu en "Test alle"-knap i Connections-headeren, når der er 2+ forbindelser. Bruger `POST /api/providers/test-batch` med `{mode: "provider", providerId}`. Resultaterne vises i en modal med bestået/ikke bestået resumé og diagnose pr. forbindelse.---

## [2.8.7] — 2026-03-20

> Sprint: Merge PR #495 (flaskehals 429 drop), fix #496 (tilpassede indlejringsudbydere), triage-funktioner.### Bug Fixes

-**Flaskehals 429 uendelig ventetid**(PR #495 af @xandr0s): På 429 fejler `limiter.stop({ dropWaitingJobs: true })` straks alle forespørgsler i kø, så opstrømskaldere kan udløse fallback. Limiter slettes fra kort, så næste anmodning opretter en ny forekomst. -**Tilpassede indlejringsmodeller kan ikke løses**(#496): `POST /v1/embeddings` løser nu brugerdefinerede indlejringsmodeller fra ALLE provider_nodes (ikke kun localhost). Aktiverer modeller som "google/gemini-embedding-001" tilføjet via dashboard.### Issues Responded

-**#452**— Grænser for antal anmodninger pr. API-nøgle (anerkendt på køreplan) -**#464**— Automatisk udstedelse af API-nøgler med udbyder-/kontogrænser (kræver flere detaljer) -**#488**— Automatisk opdatering af modellister (godkendt, på køreplan) -**#496**— Tilpasset opløsning af indlejringsudbyder (fast)---

## [2.8.6] — 2026-03-20

> Sprint: Flet PR #494 (MiniMax-rollefix), ret KIRO MITM-dashboard, triage 8 problemer.### Funktioner

-**MiniMax-udvikler→systemrollefix**(PR #494 af @zhangqiang8vip): Per-model `preserveDeveloperRole` skifte. Tilføjer "Kompatibilitet" UI på udbydersiden. Retter 422 "rolleparameterfejl" for MiniMax og lignende gateways. -**roleNormalizer**: `normalizeDeveloperRole()` accepterer nu `preserveDeveloperRole`-parameteren med tri-state adfærd (undefined=keep, true=keep, false=convert). -**DB**: Ny `getModelPreserveOpenAIDeveloperRole()` og `mergeModelCompatOverride()` i `models.ts`.### Bug Fixes

-**KIRO MITM dashboard**(#481/#487): `CLIToolsPageClient` dirigerer nu ethvert `configType: "mitm"`-værktøj til `AntigravityToolCard` (MITM Start/Stop-kontroller). Tidligere var kun Antigravity hårdkodet. -**AntigravityToolCard generisk**: Bruger `tool.image`, `tool.description`, `tool.id` i stedet for hårdkodede Antigravity-værdier. Beskytter mod manglende `defaultModels`.### Cleanup

- Fjernede `ZWS_README_V2.md` (dokumenter, der kun er udviklet fra PR #494).### Issues Triaged (8)

-**#487**— Lukket (KIRO MITM rettet i denne udgivelse) -**#486**— behovsoplysninger (Windows REG.exe PATH-problem) -**#489**— behovsoplysninger (Antigravity projectId mangler, OAuth-genopkobling nødvendig) -**#492**— behovsoplysninger (mangler app/server.js på mise-managed Node) -**#490**— Anerkendt (streaming + blokering af kontekstcache, rettelse planlagt) -**#491**— Anerkendt (Codex-godkendelsestilstand inkonsistens) -**#493**— Anerkendt (præfiks for modeludbyderens modelnavn, løsningen er angivet) -**#488**— Funktionsanmodningsefterslæb (automatisk opdatering af modellister)---

## [2.8.5] — 2026-03-19

> Sprint: Ret zombie SSE-streams, kontekstcache first-turn, KIRO MITM og triage 5 eksterne problemer.### Bug Fixes

-**Zombie SSE-streams**(#473): Reducer `STREAM_IDLE_TIMEOUT_MS` fra 300s → 120s for hurtigere combo fallback, når udbydere hænger midt i strømmen. Konfigurerbar via env var. -**Context Cache Tag**(#474): Reparer `injectModelTag()` for at håndtere første-sving-anmodninger (ingen assistent-meddelelser) - kontekstcache-beskyttelse fungerer nu fra det allerførste svar. -**KIRO MITM**(#481): Skift KIRO `configType` fra `guide` → `mitm`, så dashboardet gengiver MITM Start/Stop-kontroller. -**E2E Test**(CI): Ret `providers-bailian-coding-plan.spec.ts` — afvis allerede eksisterende modal overlay, før du klikker på knappen Tilføj API-nøgle.### Closed Issues

- #473 — Zombie SSE-streams omgår combo fallback
- #474 — Kontekstcache `<omniModel>` tag mangler ved første sving
- #481 — MITM til KIRO kan ikke aktiveres fra dashboard
- #468 — Gemini CLI fjernserver (afløst af #462 udfasning)
- #438 — Claude kan ikke skrive filer (eksternt CLI-problem)
- #439 — AppImage virker ikke (dokumenteret libfuse2-løsning)
- #402 — ARM64 DMG "beskadiget" (dokumenteret xattr -cr-løsning)
- #460 — CLI kan ikke køres på Windows (dokumenteret PATH-fix)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI udfasning, VM guide i18n rettelse, dependabot sikkerhedsrettelse, udbyder skemaudvidelse.### Funktioner

-**Gemini CLI-udfasning**(#462): Markér "gemini-cli"-udbyder som forældet med advarsel - Google begrænser tredjeparts OAuth-brug fra marts 2026 -**Provider Schema**(#462): Udvid Zod-validering med valgfrie felter "forældet", "deprecationReason", "hasFree", "freeNote", "authHint", "apiHint".### Bug Fixes

-**VM Guide i18n**(#471): Føj `VM_DEPLOYMENT_GUIDE.md` til i18n oversættelsespipeline, genskab alle 30 lokale oversættelser fra engelsk kilde (blev fast på portugisisk)### Sikkerhed

-**deps**: Bump 'flatted' 3.3.3 → 3.4.2 — fikser CWE-1321 prototypeforurening (#484, @dependabot)### Closed Issues

- #472 — Modelalias-regression (rettet i v2.8.2)
- #471 — VM guide oversættelser ødelagt
- #483 — Efterfølgende `data: null` efter `[DONE]` (rettet i v2.8.3)### Merged PRs

- #484 — deps: bump flatted fra 3.3.3 til 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Tjekkisk i18n, SSE protokol fix, VM guide oversættelse.### Funktioner

-**Tjekkisk sprog**(#482): Fuld tjekkisk (cs) i18n — 22 dokumenter, 2606 UI-strenge, sprogskifteropdateringer (@zen0bit) -**VM Deployment Guide**: Oversat fra portugisisk til engelsk som kildedokument (@zen0bit)### Bug Fixes

-**SSE-protokol**(#483): Stop med at sende efterfølgende `data: null` efter `[DONE]`-signal — retter `AI_TypeValidationError` i strenge AI SDK-klienter (Zod-baserede validatorer)### Merged PRs

- #482 — Tilføj tjekkisk sprog + Ret VM_DEPLOYMENT_GUIDE.md Engelsk kilde (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 fusionerede PR'er, routingfix for modelaliaser, logeksport og problemtriage.### Funktioner

-**Log eksport**: Ny eksportknap på `/dashboard/logs` med rullemenu for tidsinterval (1t, 6t, 12t, 24t). Downloader JSON af anmodnings-/proxy-/opkaldslogfiler via `/api/logs/export` API (#user-request)### Bug Fixes

-**Modelalias-routing**(#472): Indstillinger → Modelaliaser påvirker nu udbyder-routing korrekt, ikke kun formatregistrering. Tidligere 'resolveModelAlias()'-output blev kun brugt til 'getModelTargetFormat()', men det originale model-id blev sendt til udbyderen -**Stream Flush Usage**(#480): Brugsdata fra den sidste SSE-hændelse i bufferen udtrækkes nu korrekt under stream flush (fusioneret fra @prakersh)### Merged PRs

- #480 — Udpak brug fra resterende buffer i skyllehåndtering (@prakersh)
- #479 — Tilføj manglende Codex 5.3/5.4 og antropiske model-id-priser (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Fem fællesskabs-PR'er - rettelser til streaming af opkaldslog, Kiro-kompatibilitet, cachetokenanalyse, kinesisk oversættelse og konfigurerbare værktøjsopkalds-id'er.### Funktioner

-**feat(logs)**: Indhold af opkaldslogsvar er nu korrekt akkumuleret fra rå udbyderstykker (OpenAI/Claude/Gemini) før oversættelse, og fikser tomme svarnyttelaster i streamingtilstand (#470, @zhangqiang8vip) -**feat(udbydere)**: Per-model konfigurerbar 9-char værktøj opkalds-id normalisering (Mistral-stil) — kun modeller med muligheden aktiveret får trunkerede ID'er (#470) -**feat(api)**: Key PATCH API udvidet til at understøtte felterne `allowedConnections`, `name`, `autoResolve`, `isActive` og `accessSchedule` (#470) -**feat(dashboard)**: Respons-første layout i forespørgselslogdetaljer UI (#470) -**feat(i18n)**: Forbedret kinesisk (zh-CN) oversættelse — komplet genoversættelse (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Fjern injiceret "model"-felt fra anmodningstekst — Kiro API afviser ukendte felter på øverste niveau (#478, @prakersh) -**fix(brug)**: Inkluder cachelæsning + cacheoprettelsestokens i inputtotaler for brugshistorik for nøjagtige analyser (#477, @prakersh) -**fix(callLogs)**: Understøtter brugsfelter i Claude-format (`input_tokens`/`output_tokens`) sammen med OpenAI-formatet, inkluderer alle cache-token-varianter (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan-udbyder med redigerbare basis-URL'er plus fællesskabsbidrag til Alibaba Cloud og Kimi Coding.### Funktioner

-**feat(udbydere)**: Tilføjet Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio med Anthropic-kompatibel API. Statisk katalog med 8 modeller inklusive Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 og Kimi K2.5. Inkluderer tilpasset godkendelsesvalidering (400=gyldig, 401/403=ugyldig) (#467, @Mind-Dragon) -**feat(admin)**: Redigerbar standard-URL i Provider Admin oprette/redigere flows - brugere kan konfigurere brugerdefinerede basis-URL'er pr. forbindelse. Vedvarende i `providerSpecificData.baseUrl` med Zod-skemavalidering, der afviser ikke-http(er)-skemaer (#467)### 🧪 Tests

- Tilføjet 30+ enhedstests og 2 e2e-scenarier for Bailian Coding Plan-udbyder, der dækker godkendelsesvalidering, skemahærdning, adfærd på ruteniveau og integration på tværs af lag---

## [2.7.10] — 2026-03-19

> Sprint: To nye udbydere, der har bidraget fra fællesskabet (Alibaba Cloud Coding, Kimi Coding API-nøgle) og Docker pino-fix.### Funktioner

-**feat(udbydere)**: Tilføjet Alibaba Cloud Coding Plan-understøttelse med to OpenAI-kompatible slutpunkter — `alicode` (Kina) og `alicode-intl` (International), hver med 8 modeller (#465, @dtk1985) -**feat(udbydere)**: Tilføjet dedikeret `kimi-coding-apikey`-udbydersti — API-nøgle-baseret Kimi Coding-adgang tvinges ikke længere gennem OAuth-kun "kimi-coding"-rute. Inkluderer registreringsdatabasen, konstanter, modellers API, konfiguration og valideringstest (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Tilføjet manglende `split2`-afhængighed til Docker-billedet - `pino-abstract-transport` kræver det under kørsel, men det blev ikke kopieret ind i den selvstændige container, hvilket forårsager `Kan ikke finde modulet 'split2'` nedbrud (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Codex-svars understi-passthrough understøttet indbygget, Windows MITM-nedbrud rettet, og Combos-agentskemaer justeret.### Funktioner

-**feat(codex)**: Native responses subpath through for Codex — dirigerer naturligt `POST /v1/responses/compact` til Codex opstrøms, vedligeholder Claude Code-kompatibilitet uden at fjerne `/compact`-suffikset (#457)### 🐛 Bug Fixes

-**fix(combos)**: Zod-skemaer (`updateComboSchema` og `createComboSchema`) inkluderer nu `system_message`, `tool_filter_regex` og `context_cache_protection`. Retter fejl, hvor agentspecifikke indstillinger oprettet via dashboardet stille og roligt blev kasseret af backend-valideringslaget (#458) -**fix(mitm)**: Kiro MITM-profilnedbrud på Windows rettet — `node-machine-id` mislykkedes på grund af manglende `REG.exe`-env, og tilbagefaldet gav en fatal `crypto is not defined`-fejl. Fallback importerer nu sikkert og korrekt krypto (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budgetsparefejl + kombinationsagentfunktioner UI + omniModel tag-sikkerhedsfix.### 🐛 Bug Fixes

-**fix(budget)**: "Save Limits" returnerer ikke længere 422 — `warningThreshold` sendes nu korrekt som brøk (0–1) i stedet for procent (0–100) (#451) -**fix(combos)**: `<omniModel>` intern cache-tag er nu fjernet, før anmodninger videresendes til udbydere, hvilket forhindrer cache-sessionsafbrydelser (#454)### Funktioner

-**feat(combos)**: Agentfunktioner sektion tilføjet til combo create/edit modal - afslør "system_message", "tool_filter_regex" og "context_cache_protection" direkte fra dashboardet (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, Codex CLI responses worker fix, pakke-lås synkronisering.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` og `pino-pretty` nu eksplicit kopieret i Docker runner-stadiet — Next.js selvstændige spor går glip af disse peer-deps, hvilket forårsager, at `Kan ikke finde modul pino-abstract-transport` crash ved opstart (#449) -**fix(responses)**: Fjern `initTranslators()` fra `/v1/responses`-ruten — bryder ned Next.js-arbejder med `arbejderen har afsluttet` uncaughtException på Codex CLI-anmodninger (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` er nu forpligtet på alle versionsbump for at sikre, at Docker `npm ci` bruger nøjagtige afhængighedsversioner---

## [2.7.5] — 2026-03-18

> Sprint: UX-forbedringer og Windows CLI-sundhedstjek rettelse.### 🐛 Bug Fixes

-**fix(ux)**: Vis standardadgangskodetip på login-siden - nye brugere ser nu `"Standardadgangskode: 123456"` under adgangskodeinputtet (#437) -**fix(cli)**: Claude CLI og andre npm-installerede værktøjer er nu korrekt registreret som kørebare på Windows — spawn bruger `shell:true` til at løse `.cmd`-indpakninger via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Search Tools dashboard, i18n rettelser, Copilot grænser, Serper validering rettelse.### Funktioner

-**feat(search)**: Tilføj Search Playground (10. slutpunkt), søgeværktøjsside med Sammenlign udbydere/Rerank Pipeline/Søgehistorik, lokal rerank routing, auth guards on search API (#443 by @Regis-RCR)

- Ny rute: `/dashboard/search-tools`
- Sidebar-indgang under Debug-sektionen
- `GET /api/search/providers` og `GET /api/search/stats` med godkendelsesvagter
- Lokal provider_nodes routing for `/v1/rerank`
- 30+ i18n-nøgler i søgenavneområdet### 🐛 Bug Fixes

-**fix(søg)**: Ret Brave news normalizer (leverede 0 resultater), håndhæv max_results trunkering efter normalisering, ret Endpoints-sidehentnings-URL (#443 af @Regis-RCR) -**fix(analytics)**: Lokaliser analytics dag/dato-etiketter — erstat hårdkodede portugisiske strenge med `Intl.DateTimeFormat(locale)` (#444 af @hijak) -**fix(copilot)**: Korrekt GitHub Copilot-kontotypevisning, filtrer vildledende ubegrænsede kvoterækker fra grænsekontrolpanelet (#445 af @hijak) -**fix(udbydere)**: Stop med at afvise gyldige Serper API-nøgler - behandle ikke-4xx-svar som gyldig godkendelse (#446 af @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex direkte API kvote fallback fix.### 🐛 Bug Fixes

-**fix(codex)**: Bloker ugentlige opbrugte konti i direkte API-tilbagegang (#440)

- `resolveQuotaWindow()`-præfikset matcher: `"ugentlig"` matcher nu `"weekly (7d)"` cache-nøgler
- `applyCodexWindowPolicy()` gennemtvinger `useWeekly`/`use5h` skifter korrekt
- 4 nye regressionstest (766 i alt)---

## [2.7.2] — 2026-03-18

> Sprint: Light mode UI kontrast rettelser.### 🐛 Bug Fixes

-**fix(logs)**: Ret lystilstandens kontrast i anmodningslogs filterknapper og kombinationsmærke (#378)

- Fejl/Succes/Kombo-filterknapper kan nu læses i lystilstand
- Combo row badge bruger stærkere violet i lys tilstand---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search routing (POST /v1/search) med 5 udbydere + Next.js 16.1.7 sikkerhedsrettelser (6 CVE'er).### ✨ New Features

-**feat(search)**: Unified web search routing — `POST /v1/search` med 5 udbydere (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover på tværs af udbydere, 6.500+ gratis søgninger/måned
- In-memory cache med request coalescing (konfigurerbar TTL)
- Dashboard: fanen Søg Analytics i `/dashboard/analytics` med udbyderopdeling, cachehitrate, omkostningssporing
- Ny API: `GET /api/v1/search/analytics` til statistik for søgeanmodninger
- DB-migrering: kolonnen "request_type" på "opkaldslogs" til sporing af anmodninger uden for chat
- Zod-validering (`v1SearchSchema`), godkendt, omkostning registreret via 'recordCost()'### Sikkerhed

-**deps**: Next.js 16.1.6 → 16.1.7 — retter 6 CVE'er: -**Kritisk**: CVE-2026-29057 (HTTP-anmodningssmugling via http-proxy) -**Høj**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Serverhandlinger) -**Medium**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fil                                                              | Formål                                              |
| ---------------------------------------------------------------- | --------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Søgehandler med 5-udbyder routing                   |
| `open-sse/config/searchRegistry.ts`                              | Udbyderregistrering (godkendelse, pris, kvote, TTL) |
| `open-sse/services/searchCache.ts`                               | In-memory cache med anmodningssammenlægning         |
| `src/app/api/v1/search/route.ts`                                 | Next.js rute (POST + GET)                           |
| `src/app/api/v1/search/analytics/route.ts`                       | Søg statistik API                                   |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Fanen Analytics-dashboard                           |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB migration                                        |
| `tests/unit/search-registry.test.mjs`                            | 277 linjer med enhedstests                          | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspirerede funktioner — toolCalling-flag, flersproget hensigtsdetektion, benchmark-drevet fallback, anmodningsdeduplikering, pluggbar RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5-priser.### ✨ New Models & Pricing

-**feat(prissætning)**: xAI Grok-4 Fast — `$0,20/$0,50 pr. 1M tokens`, 1143ms p50 latency, værktøjsopkald understøttet -**feat(prissætning)**: xAI Grok-4 (standard) — `$0,20/$1,50 pr. 1M tokens`, ræsonnement flagskib -**feat(prissætning)**: GLM-5 via Z.AI — `$0,5/1M`, 128K outputkontekst -**feat(pricing)**: MiniMax M2.5 — `$0,30/1M input`, ræsonnement + agentopgaver -**feat(pricing)**: DeepSeek V3.2 — opdateret pris `$0,27/$1,10 per 1M` -**feat(prissætning)**: Kimi K2.5 via Moonshot API — direkte Moonshot API-adgang -**feat(udbydere)**: Z.AI-udbyder tilføjet ('zai'-alias) — GLM-5-familie med 128K output### 🧠 Routing Intelligence

-**feat(registry)**: "toolCalling"-flag pr. model i udbyderregistret - kombinationer kan nu foretrække/kræve modeller, der kan kalde værktøj -**feat(scoring)**: Flersproget hensigtsdetektion for AutoCombo-scoring — PT/ZH/ES/AR script/sprogmønstre påvirker modelvalg pr. anmodningskontekst -**feat(fallback)**: Benchmark-drevne fallback-kæder - reelle latensdata (p50 fra `comboMetrics`) bruges til at omorganisere fallback-prioriteten dynamisk -**feat(dedup)**: Anmod om deduplikering via content-hash - 5-sekunders idempotensvindue forhindrer duplikerede udbyderopkald i at prøve klienter igen -**feat(router)**: Pluggbar `RouterStrategy`-grænseflade i `autoCombo/routerStrategy.ts` — tilpasset routinglogik kan injiceres uden at ændre kerne### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nye avancerede værktøjsskemaer: `omniroute_get_provider_metrics` (p50/p95/p99 pr. udbyder) og `omniroute_explain_route` (forklaring af rutebeslutning) -**feat(mcp)**: MCP-værktøjets godkendelsesomfang opdateret - `metrics:read`-omfang tilføjet til udbyder-metrics-værktøjer -**feat(mcp)**: `omniroute_best_combo_for_task` accepterer nu `languageHint` parameter for flersproget routing### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` udvidet med real-time latency percentilsporing pr. udbyder/konto -**feat(health)**: Health API (`/api/monitoring/health`) returnerer nu felterne "p50Latency" og "errorRate" pr. udbyder -**feat(usage)**: Brugshistorikmigrering til sporing af ventetid pr. model### 🗄️ DB Migrations

-**feat(migrations)**: Ny kolonne `latency_p50` i `combo_metrics`-tabellen — nul-breaking, sikker for eksisterende brugere### 🐛 Bug Fixes / Closures

-**close(#411)**: better-sqlite3 hashed modulopløsning på Windows — rettet i v2.6.10 (f02c5b5) -**close(#409)**: GitHub Copilot-chatafslutninger mislykkes med Claude-modeller, når filer vedhæftet — rettet i v2.6.9 (838f1d6) -**close(#405)**: Duplikat af #411 — løst## [2.6.10] — 2026-03-17

> Windows rettelse: better-sqlite3 forudbygget download uden node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: På Windows plejede `npm install -g omniroute` at mislykkes med `better_sqlite3.node er ikke et gyldigt Win32-program`, fordi det medfølgende native binære program blev kompileret til Linux. Tilføjer**Strategy 1.5**til `scripts/postinstall.mjs`: bruger `@mapbox/node-pre-gyp install --fallback-to-build=false` (bundtet i `better-sqlite3`) til at downloade det korrekte forudbyggede binære program til det aktuelle OS/arch uden at kræve nogen byggeværktøjer (ingen MS-node-vc, ingen pythongyp, ingen MS-node-vc). Falder kun tilbage til 'npm rebuild', hvis download mislykkes. Tilføjer platformsspecifikke fejlmeddelelser med klare manuelle rettelsesinstruktioner.---

## [2.6.9] — 2026-03-17

> CI rettelser (t11 any-budget), fejlrettelse #409 (filvedhæftede filer via Copilot+Claude), frigivelse af workflow-korrektion.### 🐛 Bug Fixes

-**fix(ci)**: Fjern ordet "enhver" fra kommentarer i `openai-responses.ts` og `chatCore.ts`, der ikke klarede t11`enhver` budgetkontrol (falsk positiv fra kommentarer til regex-tælling) -**fix(chatCore)**: Normaliser ikke-understøttede indholdsdeletyper før videresendelse til udbydere (#409 — Markøren sender `{type:"fil"}` når `.md`-filer er vedhæftet; Copilot og andre OpenAI-kompat-udbydere afviser med "type skal enten være 'image_url' eller 'text'"; rettelse konverterer "ukendte" dokumenttyper til "ukendte"-typer og blokerer"### 🔧 Workflow

-**chore(generate-release)**: Tilføj ATOMIC COMMIT RULE — version bump ('npm version patch') SKAL ske før committing af funktionsfiler for at sikre, at tag altid peger på en commit, der indeholder alle versionsændringer sammen---

## [2.6.8] — 2026-03-17

> Sprint: Combo as Agent (system prompt + tool filter), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.

### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Ny "request_detail_logs" tabel med 500-indgange ring-buffer trigger, opt-in via indstillingsskift### Funktioner

-**feat(combo)**: Systemmeddelelse Tilsidesættelse pr. kombination (#399 — `system_message`-feltet erstatter eller injicerer systemprompt før videresendelse til udbyderen) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` holder kun værktøjer matchende mønster; understøtter OpenAI + Antropiske formater) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` tagger svar med `<omniModel>udbyder/model</omniModel>` og fastgør model for sessionskontinuitet) -**feat(indstillinger)**: Automatisk opdatering via indstillinger (#320 — `GET /api/system/version` + `POST /api/system/update` – kontrollerer npm registreringsdatabasen og opdateringer i baggrunden med pm2 genstart) -**feat(logs)**: Detaljerede anmodningslogfiler (#378 — indfanger hele pipeline-kroppe på 4 trin: klientanmodning, oversat anmodning, udbydersvar, klientsvar — opt-in skifte, 64KB trim, 500-indgange ring-buffer) -**feat(mitm)**: MITM Kiro IDE-profil (#336 — `src/mitm/targets/kiro.ts` målretter mod api.anthropic.com, genbruger eksisterende MITM-infrastruktur)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-forbedringer, lokale provider_nodes-udvidelser, proxy-registrering, Claude passthrough rettelser.### Funktioner

-**feat(health)**: Baggrundssundhedstjek for lokale `provider_nodes` med eksponentiel backoff (30s→300s) og `Promise.allSettled` for at undgå blokering (#423, @Regis-RCR) -**feat(embeddings)**: Rut `/v1/embeddings` til lokale `provider_nodes` — `buildDynamicEmbeddingProvider()` med værtsnavnvalidering (#422, @Regis-RCR) -**feat(audio)**: Rut TTS/STT til lokale `provider_nodes` — `buildDynamicAudioProvider()` med SSRF-beskyttelse (#416, @Regis-RCR) -**feat(proxy)**: Proxyregistrering, administrations-API'er og generalisering af kvotegrænser (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Fjern Claude-specifikke felter (`metadata`, `antropisk_version`), når målet er OpenAI-compat (#421, @prakersh) -**fix(sse)**: Udpak Claude SSE-brug (`input_tokens`, `output_tokens`, cache-tokens) i passthrough-stream-tilstand (#420, @prakersh) -**fix(sse)**: Generer fallback 'call_id' for værktøjsopkald med manglende/tomme id'er (#419, @prakersh) -**fix(sse)**: Claude-to-Claude passthrough — fremadrettet krop fuldstændig uberørt, ingen genoversættelse (#418, @prakersh) -**fix(sse)**: Filtrer forældreløse `tool_result` elementer efter Claude Code kontekstkomprimering for at undgå 400 fejl (#417, @prakersh) -**fix(sse)**: Spring over kald til værktøjet med tomme navne i Responses API-oversætteren for at forhindre 'placeholder_tool' uendelige loops (#415, @prakersh) -**fix(sse)**: Fjern tomme tekstindholdsblokke før oversættelse (#427, @prakersh) -**fix(api)**: Tilføj "refreshable: true" til Claude OAuth-testkonfigurationen (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` og relaterede devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker-kompatibilitet — fjern `node:`-protokol fra alle `src/`-importer.### 🐛 Bug Fixes

-**fix(build)**: Fjernede `node:` protokolpræfiks fra `import`-sætninger i 17 filer under `src/`. Importerne af `node:fs`, `node:sti`, `node:url`, `node:os` osv. forårsagede `Ecmascript-filen havde en fejl` på Turbopack-builds (Next.js 15 Docker) og på opgraderinger fra ældre npm globale installationer. Berørte filer: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` og 12 andre i `src/app/api/` og `src/lib/`. -**chore(workflow)**: Opdateret `generate-release.md` for at få Docker Hub til at synkronisere og dual-VPS implementere**obligatoriske**trin i hver udgivelse.---

## [2.6.5] — 2026-03-17

> Sprint: ræsonnement model param filtrering, lokal udbyder 404 fix, Kilo Gateway udbyder, afhængigheds bump.### ✨ New Features

-**feat(api)**: Tilføjet**Kilo Gateway**(`api.kilo.ai`) som en ny API-nøgleudbyder (alias `kg`) - 335+ modeller, 6 gratis modeller, 3 auto-routing-modeller (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free'). Passthrough-modeller understøttet via `/api/gateway/models` slutpunkt. (PR #408 af @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Fjern ikke-understøttede parametre for begrundelsesmodeller (o1, o1-mini, o1-pro, o3, o3-mini). Modeller i `o1`/`o3`-familien afviser `temperatur`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` og `n` med HTTP 400. Parametre fjernes nu ved `chatCore`-laget før videresendelse. Bruger et deklarativt `unsupportedParams`-felt pr. model og et forudberegnet O(1)-kort til opslag. (PR #412 af @Regis-RCR) -**fix(sse)**: Lokal udbyder 404 resulterer nu i en**låsning kun for model (5 sekunder)**i stedet for en lockout på forbindelsesniveau (2 minutter). Når en lokal inferens-backend (Ollama, LM Studio, oMLX) returnerer 404 for en ukendt model, forbliver forbindelsen aktiv, og andre modeller fortsætter med at arbejde med det samme. Retter også en allerede eksisterende fejl, hvor `model` ikke blev sendt til `markAccountUnavailable()`. Lokale udbydere fundet via værtsnavn (`localhost`, `127.0.0.1`, `::1`, kan udvides via `LOCAL_HOSTNAMES` env var). (PR #410 af @Regis-RCR)### 📦 Dependencies

- `bedre-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(udbydere)**: Fjernede ikke-eksisterende modelnavne på tværs af 5 udbydere: -**gemini / gemini-cli**: fjernede `gemini-3.1-pro/flash` og `gemini-3-*-preview` (findes ikke i Google API v1beta); erstattet med `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravity**: fjernede `gemini-3.1-pro-high/low` og `gemini-3-flash` (ugyldige interne aliaser); erstattet med rigtige 2.x modeller -**github (Copilot)**: fjernede `gemini-3-flash-preview` og `gemini-3-pro-preview`; erstattet med `gemini-2.5-flash` -**nvidia**: rettet `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM bruger `meta/`-navneområde til Meta-modeller); tilføjet "nvidia/llama-3.1-70b-instruct" og "nvidia/llama-3.1-405b-instruct" -**fix(db/combo)**: Opdateret `free-stack`-kombination på ekstern DB: fjernet `qw/qwen3-coder-plus` (udløbet opdateringstoken), rettet `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct.ge-3-instruct. → `gemini/gemini-2.5-flash`, tilføjet `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip indbygget i build-pipeline, syntetisk udbyder tilføjet, VPS PM2-sti rettet.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip kører nu på**kompileringstidspunkt**for ALLE pakker - ikke kun `better-sqlite3`. Trin 5.6 i `prepublish.mjs` gennemgår hver `.js` i `app/.next/server/` og fjerner hex-suffikset på 16 tegn fra enhver hashed `require()`. Retter `zod-dcb22c...`, `pino-...` osv. MODULE_NOT_FOUND på globale npm-installationer. Lukker #398 -**fix(deploy)**: PM2 på begge VPS pegede på forældede git-clone-mapper. Genkonfigureret til `app/server.js` i den globale npm-pakke. Opdateret `/deploy-vps` arbejdsgang til at bruge `npm pack + scp` (npm registreringsdatabasen afviser 299MB pakker).### Funktioner

-**feat(udbyder)**: Syntetisk ([synthetic.new](https://synthetic.new)) — privatlivsfokuseret OpenAI-kompatibel inferens. 'passthroughModels: true' til dynamisk HuggingFace-modelkatalog. Oprindelige modeller: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 af @Regis-RCR)### 📋 Issues Closed

-**luk #398**: npm hash regression — rettet af kompileringstids hash-strip i prepublish -**triage #324**: Bug-skærmbillede uden trin — anmodede reproduktionsdetaljer---

## [2.6.2] — 2026-03-16

> Sprint: modul-hashing fuldstændig rettet, 2 PR'er slået sammen (Antropiske værktøjer-filter + brugerdefinerede slutpunktstier), Alibaba Cloud DashScope-udbyder tilføjet, 3 uaktuelle problemer lukket.### 🐛 Bug Fixes

-**fix(build)**: Udvidet webpack `externals` hash-strip til at dække ALLE `serverExternalPackages`, ikke kun `better-sqlite3`. Next.js 16 Turbopack hasheser `zod`, `pino` og hver anden server-ekstern pakke til navne som `zod-dcb22c6336e0bc69`, der ikke findes i `node_modules` under kørsel. En HASH_PATTERN regex catch-all fjerner nu suffikset på 16 tegn og falder tilbage til basispakkenavnet. Tilføjede også `NEXT_PRIVATE_BUILD_WORKER=0` i `prepublish.mjs` for at forstærke webpack-tilstand, plus en post-build-scanning, der rapporterer eventuelle resterende hash-refs. (#396, #398, PR #403) -**fix(chat)**: Værktøjsnavne i antropisk format (`værktøj.navn` uden '.funktion'-indpakning) blev stille slettet af filteret med tomme navne introduceret i #346. LiteLLM proxy-anmodninger med 'anthropic/'-præfiks i Anthropic Messages API-format, hvilket får alle værktøjer til at blive filtreret og Anthropic til at returnere '400: tool_choice.any må kun angives, mens værktøjerne leveres'. Rettet ved at falde tilbage til `værktøj.navn`, når `værktøj.funktion.navn` er fraværende. Tilføjet 8 regressionsenhedstests. (PR #397)### Funktioner

-**feat(api)**: Brugerdefinerede slutpunktstier til OpenAI-kompatible udbyderknudepunkter - konfigurer 'chatPath' og 'modelsPath' pr. node (f.eks. '/v4/chat/completions') i udbyderforbindelsens brugergrænseflade. Inkluderer en DB-migrering (`003_provider_node_custom_paths.sql`) og URL-stisanering (ingen ".."-gennemgang, skal starte med `/`). (PR #400) -**feat(udbyder)**: Alibaba Cloud DashScope tilføjet som OpenAI-kompatibel udbyder. Internationalt slutpunkt: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modeller: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API-nøgle.### 📋 Issues Closed

-**close #323**: Cline-forbindelsesfejl `[object Object]` — rettet i v2.3.7; instrueret brugeren om at opgradere fra v2.2.9 -**luk #337**: Kiro-kreditsporing — implementeret i v2.5.5 (#381); pegede brugeren til Dashboard → Brug -**triage #402**: ARM64 macOS DMG beskadiget — anmodet om macOS-version, nøjagtig fejl og anbefalet 'xattr -d com.apple.quarantine'-løsning---

## [2.6.1] — 2026-03-15

> Kritisk opstartsrettelse: v2.6.0 globale npm-installationer styrtede ned med en 500-fejl på grund af en Turbopack/webpack-modulnavn-hash-fejl i Next.js 16-instrumenteringskrogen.### 🐛 Bug Fixes

-**fix(build)**: Tving `better-sqlite3` til altid at være påkrævet af dets nøjagtige pakkenavn i webpack-serverpakken. Next.js 16 kompilerede instrumenteringskrogen i en separat chunk og udsendte `require('better-sqlite3-<hash>')` – et hashed modulnavn, der ikke findes i `node_modules` – selvom pakken var opført i `serverExternalPackages`. Tilføjede en eksplicit `eksterne` funktion til serverens webpack-konfiguration, så bundleren altid udsender `require('better-sqlite3')`, hvilket løser opstarten `500 Internal Server Error` på rene globale installationer. (#394, PR #395)### 🔧 CI

-**ci**: Tilføjet `workflow_dispatch` til `npm-publish.yml` med versionssynkroniseringsbeskyttelse for manuelle triggere (#392) -**ci**: Tilføjet `workflow_dispatch` til `docker-publish.yml`, opdateret GitHub Actions til seneste versioner (#392)---

## [2.6.0] - 2026-03-15

> Problemløsning sprint: 4 fejl rettet, log UX forbedret, Kiro kreditsporing tilføjet.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI og SD WebUI vises ikke længere på mediesideudbyderlisten, når de ikke er konfigureret — henter `/api/providers` på mount og skjuler lokale udbydere uden forbindelser (#390) -**fix(auth)**: Round-robin genvælger ikke længere satsbegrænsede konti umiddelbart efter nedkøling — 'backoffLevel' bruges nu som primær sorteringsnøgle i LRU-rotationen (#340) -**fix(oauth)**: Qoder (og andre udbydere, der omdirigerer til deres egen brugergrænseflade) lader ikke længere OAuth-modalen stå fast ved "Venter på autorisation" - popup-lukket detektor skifter automatisk til manuel URL-indtastningstilstand (#344) -**fix(logs)**: Forespørgselslogtabellen kan nu læses i lys tilstand - statusmærker, tokenantal og combo-tags bruger adaptive 'mørke:'-farveklasser (#378)### Funktioner

-**feat(kiro)**: Kiro-kreditsporing føjet til brugshenter — forespørgsler 'getUserCredits' fra AWS CodeWhisperer-slutpunkt (#337)### 🛠 Chores

-**chore(tests)**: Justeret `test:plan3`, `test:fixes`, `test:security` for at bruge samme `tsx/esm`-indlæser som `npm-test` - eliminerer modulopløsning falske negativer i målrettede kørsler (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + rute krop validering hærdning.### 🐛 Bug Fixes

-**fix(codex)**: Bevar native Responses API passthrough for Codex-klienter — undgår unødvendige oversættelsesmutationer (PR #387) -**fix(api)**: Valider forespørgselsorganer på pris-/synkroniserings- og opgavedirigeringsruter - forhindrer nedbrud fra forkert udformede input (PR #388) -**fix(auth)**: JWT-hemmeligheder fortsætter på tværs af genstarter via `src/lib/db/secrets.ts` — eliminerer 401-fejl efter pm2-genstart (PR #388)---

## [2.5.8] - 2026-03-15

> Byg rettelse: Gendan VPS-forbindelse brudt af v2.5.7 ufuldstændig publicering.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` brugte stadig forældet `--webpack` flag, hvilket forårsager, at Next.js standalone build mislykkes lydløst - npm publicering fuldført uden `app/server.js`, hvilket bryder VPS-implementeringen---

## [2.5.7] - 2026-03-15

> Rettelser til håndtering af medielegepladsfejl.### 🐛 Bug Fixes

-**fix(medie)**: Transskription "API Key Required" falsk positiv, når lyden ikke indeholder nogen tale (musik, stilhed) - viser nu "Ingen tale registreret" i stedet -**fix(media)**: `upstreamErrorResponse` i `audioTranscription.ts` og `audioSpeech.ts` returnerer nu korrekt JSON (`{error:{message}}`), hvilket muliggør korrekt registrering af 401/403 legitimationsoplysninger i MediaPageClient -**fix(media)**: `parseApiError` håndterer nu Deepgrams `err_msg` felt og registrerer `"api key"` i fejlmeddelelser for nøjagtig klassificering af legitimationsfejl---

## [2.5.6] - 2026-03-15

> Kritiske sikkerheds-/godkendelsesrettelser: Antigravity OAuth brudt + JWT-sessioner tabt efter genstart.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth sender nu korrekt `client_secret` til token-slutpunktet. Alternativet for `ANTIGRAVITY_OAUTH_CLIENT_SECRET` var en tom streng, som er falsk - så `client_secret` blev aldrig inkluderet i anmodningen, hvilket forårsagede "client_secret is missing"-fejl for alle brugere uden en tilpasset env-var. Lukker #383. -**fix(auth) #385**: `JWT_SECRET` bevares nu til SQLite (`namespace='secrets'`) på første generation og genindlæses ved efterfølgende opstart. Tidligere blev der genereret en ny tilfældig hemmelighed ved hver processtart, hvilket gjorde alle eksisterende cookies/sessioner ugyldige efter enhver genstart eller opgradering. Påvirker både "JWT_SECRET" og "API_KEY_SECRET". Lukker #382.---

## [2.5.5] - 2026-03-15

> Modelliste dedup fix, Electron standalone build hærdning og Kiro kredit sporing.### 🐛 Bug Fixes

-**fix(modeller) #380**: `GET /api/models` inkluderer nu udbyderaliasser ved opbygning af active-provider-filteret - modeller for `claude` (alias `cc`) og `github` (alias `gh`) blev altid vist, uanset om en forbindelse var konfigureret, fordi `PROVIDER_MODELS` nøgler under DB-forbindelsesaliasser er, men giver DB-forbindelsesaliaser. Rettet ved at udvide hvert aktivt udbyder-id til også at inkludere dets alias via `PROVIDER_ID_TO_ALIAS`. Lukker #353. -**fix(electron) #379**: Nye `scripts/prepare-electron-standalone.mjs` iscenesætter en dedikeret `/.next/electron-standalone` bundle før Electron-pakning. Afbryder med en klar fejl, hvis 'node_modules' er et symbollink (elektronbygger vil sende en runtime-afhængighed af byggemaskinen). Stisanering på tværs af platforme via `path.basename`. Af @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro-kreditsaldosporing — brugsslutpunkt returnerer nu kreditdata for Kiro-konti ved at kalde `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (samme slutpunkt som Kiro IDE bruger internt). Returnerer resterende kreditter, samlet godtgørelse, fornyelsesdato og abonnementsniveau. Lukker #337.## [2.5.4] - 2026-03-15

> Logger startup fix, login bootstrap security fix og dev HMR pålidelighed forbedring. CI-infrastruktur hærdet.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Gendan pino transportloggersti — `formatters.level` kombineret med `transport.targets` afvises af pino. Transportstøttede konfigurationer fjerner nu niveauformateringsprogrammet via `getTransportCompatibleConfig()`. Korrigerer også numerisk niveaukortlægning i `/api/logs/console`: `30→info, 40→advarsel, 50→fejl` (blev flyttet med én). -**fix(login) #375**: Loginsiden starter nu op fra det offentlige `/api/settings/require-login` slutpunkt i stedet for det beskyttede `/api/settings`. I adgangskodebeskyttede opsætninger modtog præ-godkendelsessiden et 401 og faldt unødigt tilbage til sikre standardindstillinger. Den offentlige rute returnerer nu alle bootstrap-metadata (`requireLogin`, `hasPassword`, `setupComplete`) med en konservativ 200 fallback på fejl. -**fix(dev) #374**: Tilføj `localhost` og `127.0.0.1` til `allowedDevOrigins` i `next.config.mjs` — HMR-websocket blev blokeret, da man fik adgang til appen via loopback-adresse, hvilket producerede gentagne advarsler om krydsoprindelse.### 🔧 CI & Infrastructure

-**ESLint OOM-rettelse**: `eslint.config.mjs` ignorerer nu `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` og `clipr/**` – ESLint crashede med en JS-heap OOM ved at scanne VS-kode kompilerede blobchsunks. -**Enhedstestrettelse**: Fjernede forældede `ALTER TABLE provider_connections ADD COLUMN "group"` fra 2 testfiler — kolonne er nu en del af basisskemaet (tilføjet i #373), hvilket forårsager `SQLITE_ERROR: duplicate column name` ved hver CI-kørsel. -**Pre-commit hook**: Tilføjet `npm run test:unit` til `.husky/pre-commit` — enhedstester blokerer nu brudte commits, før de når CI.## [2.5.3] - 2026-03-14

> Kritiske fejlrettelser: DB-skemamigrering, start-env-indlæsning, rydning af udbyderfejltilstand og rettelse af i18n-værktøjstip. Kode kvalitetsforbedringer oven i hver PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Tilføj kolonnen `provider_connections.group` til basisskemaet + udfyldningsmigrering for eksisterende databaser - kolonnen blev brugt i alle forespørgsler, men mangler i skemadefinitionen -**fix(i18n) #371**: Erstat ikke-eksisterende `t("deleteConnection")`-nøgle med eksisterende `providers.delete`-nøgle — retter `MISSING_MESSAGE: providers.deleteConnection` runtime-fejl på udbyderens detaljeside -**fix(auth) #372**: Ryd forældede fejlmetadata (`errorCode`, `lastErrorType`, `lastErrorSource`) fra udbyderkonti efter ægte gendannelse - tidligere blev gendannede konti ved med at fremstå som mislykkede -**fix(start) #369**: Ens env-indlæsning på tværs af `npm run start`, `run-standalone.mjs` og Electron for at respektere `DATA_DIR/.env → ~/.omniroute/.env → ./.env`-prioriteten - forhindrer generering af en ny `STORAGE_ENCRYPTION`-krypteret database over en eksisterende KEYPTION*KRYPTION*### 🔧 Code Quality

- Dokumenterede `result.success` vs `response?.ok`-mønstre i `auth.ts` (begge tilsigtet, nu forklaret)
- Normaliseret `overridePath?.trim()` i `electron/main.js` for at matche `bootstrap-env.mjs`
- Tilføjet "preferredEnv" fletteordrekommentar i Electron-opstart

> Codex-kontokvotepolitik med automatisk rotation, hurtig tier-skift, gpt-5.4-model og analyseetiketterettelse.### ✨ New Features (PRs #366, #367, #368)

-**Codex-kvotepolitik (PR #366)**: Per-konto 5 timer/ugentlig kvotevindue skifter i udbyderens dashboard. Konti springes automatisk over, når aktiverede vinduer når en tærskel på 90 % og optages igen efter "resetAt". Inkluderer `quotaCache.ts` med gratis status getter for bivirkninger. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Indstillinger → Codex Service Tier. Default-off toggle injicerer kun `service_tier: "flex"` for Codex-anmodninger, hvilket reducerer omkostningerne ~80 %. Fuld stack: UI-fane + API-slutpunkt + eksekvering + oversætter + startgendannelse. -**gpt-5.4-model (PR #368)**: Tilføjer `cx/gpt-5.4` og `codex/gpt-5.4` til Codex-modelregistret. Regressionstest inkluderet.### 🐛 Bug Fixes

-**fix #356**: Analytics-diagrammer (topudbyder, efter konto, udbyderopdeling) viser nu menneskelæselige udbydernavne/-etiketter i stedet for rå interne id'er for OpenAI-kompatible udbydere.

> Vigtig udgivelse: strengt tilfældig routingstrategi, API-nøgleadgangskontroller, forbindelsesgrupper, ekstern prissynkronisering og kritiske fejlrettelser til tænkende modeller, combo-test og validering af værktøjsnavne.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle-dæk med anti-gentagelsesgaranti og mutex-serialisering for samtidige anmodninger. Uafhængige dæk pr. kombination og pr. udbyder. -**API Key Access Controls**: `allowedConnections` (begrænser hvilke forbindelser en nøgle kan bruge), `is_active` (aktiver/deaktiver nøgle med 403), `accessSchedule` (tidsbaseret adgangskontrol), `autoResolve` skifte, omdøb nøgler via PATCH. -**Forbindelsesgrupper**: Grupper udbyderforbindelser efter miljø. Harmonikavisning i Limits-siden med lokal lagrings-vedholdenhed og smart auto-switch. -**Ekstern prissynkronisering (LiteLLM)**: 3-lags prisopløsning (brugertilsidesættelser → synkroniseret → standarder). Tilmeld dig via `PRICING_SYNC_ENABLED=true`. MCP-værktøj `omniroute_sync_pricing`. 23 nye tests. -**i18n**: 30 sprog opdateret med strengt tilfældig strategi, API-nøglestyringsstrenge. pt-BR fuldt oversat.### 🐛 Bug Fixes

-**fix #355**: Stream tomgangstimeout øget fra 60s til 300s — forhindrer afbrydelse af udvidede tænkende modeller (claude-opus-4-6, o3, osv.) under lange ræsonnementfaser. Kan konfigureres via `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Kombitest omgår nu `REQUIRE_API_KEY=true` ved hjælp af intern header og bruger OpenAI-kompatibelt format universelt. Timeout forlænget fra 15s til 20s. -**fix #346**: Værktøjer med tomt `funktion.navn` (videresendt af Claude Code) filtreres nu, før opstrømsudbydere modtager dem, hvilket forhindrer "Ugyldig input[N].navn: tom streng"-fejl.### 🗑️ Closed Issues

-**#341**: Fejlretningssektionen blev fjernet — erstatningen er `/dashboard/logs` og `/dashboard/health`.

> API Key Round-Robin-understøttelse for multi-key udbyder opsætninger og bekræftelse af wildcard routing og kvotevindue rullende allerede på plads.### ✨ New Features

-**API Key Round-Robin (T07)**: Leverandørforbindelser kan nu indeholde flere API-nøgler (Rediger forbindelse → Ekstra API-nøgler). Anmoder om at rotere round-robin mellem primære + ekstra nøgler via `providerSpecificData.extraApiKeys[]`. Nøgler holdes i hukommelsen indekseret pr. forbindelse - ingen DB-skemaændringer påkrævet.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` med glob-stil wildcard-matching (`gpt*`, `claude-?-sonnet` osv.) er allerede integreret i `model.ts` med specificitetsrangering. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` fremrykker allerede vinduet automatisk - hvis `Date.now() > entry.until`, slettes låsen med det samme (ingen forældet blokering).

> UI-polering, tilføjelser til routingstrategi og yndefuld fejlhåndtering for brugsgrænser.### ✨ New Features

-**Fill-First & P2C Routing Strategies**: Tilføjet "fill-first" (dræn kvote, før du går videre) og "p2c" (Power-of-Two-Choices valg med lav latens) til kombinationsstrategivælger med komplette vejledningspaneler og farvekodede badges. -**Free Stack Preset Models**: Oprettelse af en kombination med Free Stack-skabelonen udfylder nu 7 klassens bedste gratis udbydermodeller (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Brugere aktiverer bare udbyderne og får en kombination af $0/måned direkte fra kassen. -**Bredere Combo Modal**: Opret/Rediger combo modal bruger nu `max-w-4xl` til komfortabel redigering af store kombinationer.### 🐛 Bug Fixes

-**Grænseside HTTP 500 for Codex & GitHub**: `getCodexUsage()` og `getGitHubUsage()` returnerer nu en brugervenlig besked, når udbyderen returnerer 401/403 (udløbet token), i stedet for at smide og forårsage en 500-fejl på Limits-siden. -**Vedligeholdelsesbanner falsk-positiv**: Banner viser ikke længere "Serveren kan ikke nås" falsk ved sideindlæsning. Rettet ved at kalde `checkHealth()` umiddelbart på mount og fjerne forældet `show`-tilstand lukning. -**Tip til udbyderikoner**: Rediger (blyant) og slet ikonknapper i udbyderforbindelsesrækken har nu indbyggede HTML-værktøjstip - alle 6 handlingsikoner er nu selvdokumenterede.

> Flere forbedringer fra fællesskabsproblemanalyse, ny udbydersupport, fejlrettelser til tokensporing, modelrouting og streamingpålidelighed.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatisk modelvalg baseret på anmodning om indholdstype — kodning → deepseek-chat, analyse → gemini-2.5-pro, vision → gpt-4o, opsummering → gemini-2.5-flash. Kan konfigureres via Indstillinger. Ny `GET/PUT/POST /api/settings/task-routing` API. -**HuggingFace Provider**: Tilføjet HuggingFace Router som en OpenAI-kompatibel udbyder med Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI-udbyder**: Tilføjet Vertex AI (Google Cloud)-udbyder med Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Playground File Uploads**: Lydupload til transskription, billedupload til vision-modeller (automatisk registrering ved modelnavn), indlejret billedgengivelse til billedgenereringsresultater. -**Visuel feedback fra modelvalg**: Allerede tilføjede modeller i kombinationsvælgeren viser nu ✓ grønt badge — forhindrer dobbeltforvirring. -**Qwen-kompatibilitet (PR #352)**: Opdaterede User-Agent og CLI-fingeraftryksindstillinger for Qwen-udbyderkompatibilitet. -**Round-Robin State Management (PR #349)**: Forbedret round-robin logik til at håndtere ekskluderede konti og opretholde rotationstilstand korrekt. -**Udklipsholder UX (PR #360)**: Hærdede udklipsholderoperationer med fallback til ikke-sikre sammenhænge; Claude værktøj normalisering forbedringer.### 🐛 Bug Fixes

-**Ret #302 — OpenAI SDK-stream=Falsk dropper tool_calls**: T01 Accepter header-forhandling tvinger ikke længere streaming, når 'body.stream' eksplicit er 'false'. Var årsag til, at tool_calls blev droppet stille, når du brugte OpenAI Python SDK i ikke-streaming-tilstand. -**Løsning #73 — Claude Haiku dirigeret til OpenAI uden udbyderpræfiks**: `claude-*`-modeller sendt uden et udbyderpræfiks dirigeres nu korrekt til `antigravity` (antropisk) udbyder. Tilføjet `gemini-*`/`gemma-*` → `gemini` heuristik også. -**Ret #74 — Token tæller altid 0 for Antigravity/Claude-streaming**: `message_start` SSE-hændelsen, som bærer `input_tokens`, blev ikke parset af `extractUsage()`, hvilket fik alle inputtoken-tællinger til at falde. Input/output-tokensporing fungerer nu korrekt til streamingsvar. -**Ret #180 — Dubletter af modelimport uden feedback**: `ModelSelectModal` viser nu ✓ grøn fremhævning for modeller, der allerede er i kombinationen, hvilket gør det tydeligt, at de allerede er tilføjet. -**Mediesidegenereringsfejl**: Billedresultater gengives nu som "<img>"-tags i stedet for rå JSON. Transskriptionsresultater vist som læsbar tekst. Legitimationsfejl viser et gult banner i stedet for lydløs fejl. -**Tokenopdateringsknap på udbydersiden**: Manuel tokenopdaterings-UI tilføjet til OAuth-udbydere.### 🔧 Improvements

-**Provider Registry**: HuggingFace og Vertex AI tilføjet til `providerRegistry.ts` og `providers.ts` (frontend). -**Læsecache**: Ny `src/lib/db/readCache.ts` til effektiv DB-læsecache. -**Quota Cache**: Forbedret kvotecache med TTL-baseret udsættelse.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fil                                           | Formål                                     |
| --------------------------------------------- | ------------------------------------------ | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Opgavebevidst routinglogik (7 opgavetyper) |
| `src/app/api/settings/task-routing/route.ts`  | Task routing config API                    |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuel opdatering af OAuth-token           |
| `src/lib/db/readCache.ts`                     | Effektiv DB-læsecache                      |
| `src/shared/utils/clipboard.ts`               | Hærdet udklipsholder med fallback          | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modal kombination: Gratis stak synlig og fremtrædende**— Gratis stak-skabelon blev skjult (4. i 3-søjlet gitter). Rettet: flyttet til position 1, skiftet til 2x2 gitter, så alle 4 skabeloner er synlige, grøn kant + GRATIS badge-fremhævning.## [2.4.0] - 2026-03-13

> **Større udgivelse**— Gratis stak-økosystem, eftersyn af transkriptionslegepladser, 44+ udbydere, omfattende gratis tierdokumentation og UI-forbedringer over hele linjen.### Funktioner

-**Komboer: Gratis stak skabelon**— Ny 4. skabelon "Gratis stak ($0)" ved hjælp af round-robin på tværs af Kiro + Qoder + Qwen + Gemini CLI. Foreslår den forudbyggede nul-omkostningskombination ved første brug. -**Medie/transskription: Deepgram som standard**— Deepgram (Nova 3, $200 gratis) er nu standardtransskriptionsudbyderen. AssemblyAI ($50 gratis) og Groq Whisper (gratis for evigt) vist med gratis kreditmærker. -**README: "Start gratis" sektion**— Ny tidlig README 5-trins tabel, der viser, hvordan du konfigurerer gratis AI på få minutter. -**README: Gratis transskriptionskombination**— Nyt afsnit med Deepgram/AssemblyAI/Groq-kombinationsforslag og gratis kreditoplysninger pr. udbyder. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras og Groq markeret med hasFree badge og freeNote til udbyderens brugergrænseflade. -**i18n: templateFreeStack-nøgler**— Gratis stak-kombiskabelon oversat og synkroniseret til alle 30 sprog.## [2.3.16] - 2026-03-13

### Dokumentation

-**README: 44+ udbydere**— Opdaterede alle 3 forekomster af "36+ udbydere" til "44+", der afspejler det faktiske kodebaseantal (44 udbydere i providers.ts) -**LÆS MIG: Nyt afsnit "🆓 Gratis modeller — Hvad du faktisk får"**— Tilføjet tabel med 7 udbydere med satsgrænser pr. model for: Kiro (Claude ubegrænset via AWS Builder ID), Qoder (5 modeller ubegrænset), Qwen (4 modeller ubegrænset), Gemini CLI (180K/mo), NVIDIA RIM debra (~40 for evigt NIM debra (~400 RPM) tok/dag / 60K TPM), Groq (30 RPM / 14,4K RPD). Inkluderer \/usr/bin/bash Ultimate Free Stack combo-anbefaling. -**README: Pristabel opdateret**— Tilføjet Cerebras til API KEY tier, fikset NVIDIA fra "1000 credits" til "dev-forever free", opdaterede Qoder/Qwen-modeller og navne -**README: Qoder 8→5-modeller**(navngivet: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4-modeller**(navngivet: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funktioner

-**Auto-Combo Dashboard (Tier Priority)**: Tilføjet `🏷️ Tier` som den 7. scoringsfaktor-etiket i `/dashboard/auto-combo`-faktornedbrydningsdisplayet - alle 7 Auto-Combo-scoringsfaktorer er nu synlige. -**i18n — autoCombo-sektion**: Tilføjet 20 nye oversættelsesnøgler til Auto-Combo-dashboardet (`titel`, `status`, `modePack`, `providerScores`, `factorTierPriority` osv.) til alle 30 sprogfiler.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Gendannet den gyldige standard `clientSecret` — var tidligere en tom streng, hvilket forårsagede "Dårlige klientoplysninger" ved hvert forbindelsesforsøg. Det offentlige legitimationsoplysninger er nu standard reserve (kan tilsidesættes via `QODER_OAUTH_CLIENT_SECRET` env var). -**MITM-server blev ikke fundet (#335)**: `prepublish.mjs` kompilerer nu `src/mitm/*.ts` til JavaScript ved hjælp af `tsc` før kopiering til npm-pakken. Tidligere blev kun rå '.ts'-filer kopieret - hvilket betyder, at 'server.js' aldrig eksisterede i globale npm/Volta-installationer. -**GeminiCLI mangler projekt-id (#338)**: I stedet for at afgive en hård 500-fejl, når 'projectId' mangler fra gemte legitimationsoplysninger (f.eks. efter Docker-genstart), logger OmniRoute nu en advarsel og forsøger anmodningen - returnerer en meningsfuld udbydersidefejl i stedet for et OmniRoute-nedbrud. -**Electron version mismatch (#323)**: Synkroniserede `electron/package.json` version til `2.3.13` (var `2.0.13`), så den binære desktopversion matcher npm-pakken.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Tilføjet `tierPriority` (vægt `0,05`) til `ScoringWeights` Zod-skemaet og `combos/auto` API-ruten – den 7. scoringsfaktor er nu fuldt accepteret af REST API og valideret ved input. "stabilitet"-vægt justeret fra "0,10" til "0,05" for at holde totalsum = "1,0".### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: Tilføjet "tierPriority" som en 7. scoringsfaktor — konti med Ultra/Pro-tier foretrækkes nu frem for Free-tiers, når andre faktorer er lige. Nye valgfrie felter `accountTier` og `quotaResetIntervalSecs` på `ProviderCandidate`. Alle 4 tilstandspakker er opdateret ('forsendelseshurtigt', 'omkostningsbesparende', 'kvalitet først', 'offlinevenlig'). -**Intra-Family Model Fallback (T5)**: Når en model er utilgængelig (404/400/403), falder OmniRoute nu automatisk tilbage til søskendemodeller fra samme familie, før der returneres en fejl ("modelFamilyFallback.ts"). -**Konfigurerbar API Bridge-timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var lader operatører indstille proxy-timeout (standard 30s). Retter 504-fejl på langsomme opstrømssvar. (#332) -**Star History**: Erstattet star-history.com-widget med starchart.cc (`?variant=adaptive`) i alle 30 README'er – tilpasser sig lys/mørkt tema, realtidsopdateringer.### 🐛 Bug Fixes

-**Auth — Førstegangsadgangskode**: `INITIAL_PASSWORD` env var accepteres nu ved indstilling af det første dashboard-adgangskode. Bruger 'timingSafeEqual' til konstant-tidssammenligning, hvilket forhindrer timingangreb. (#333) -**README Truncation**: Rettede et manglende `</details>` lukketag i fejlfindingssektionen, der fik GitHub til at stoppe med at gengive alt under det (Tech Stack, Docs, Roadmap, Contributors). -**pnpm installation**: Fjernet redundant `@swc/helpers` tilsidesættelse fra `package.json`, der kom i konflikt med den direkte afhængighed, hvilket forårsagede `EOVERRIDE`-fejl på pnpm. Tilføjet 'pnpm.onlyBuiltDependencies'-konfiguration. -**CLI Path Injection (T12)**: Tilføjet `isSafePath()` validator i `cliRuntime.ts` for at blokere stigennemgang og shell-metategn i `CLI_*_BIN` env vars. -**CI**: Gengenereret `package-lock.json` efter tilsidesættelsesfjernelse for at rette `npm ci`-fejl på GitHub Actions.### 🔧 Improvements

-**Response Format (T1)**: `response_format` (json_schema/json_object) nu injiceret som en systemprompt for Claude, hvilket muliggør struktureret outputkompatibilitet. -**429 Prøv igen (T2)**: Intra-URL-forsøg igen for 429 svar (2x forsøg med 2 sekunders forsinkelse), før du falder tilbage til næste URL. -**Gemini CLI Headers (T3)**: Tilføjet `User-Agent` og `X-Goog-Api-Client` fingeraftryksheaders for Gemini CLI-kompatibilitet. -**Priskatalog (T9)**: Tilføjet "deepseek-3.1", "deepseek-3.2" og "qwen3-coder-next" prissætningsposter.### 📁 New Files

| Fil                                        | Formål                                                        |
| ------------------------------------------ | ------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Modelfamiliedefinitioner og fallback-logik inden for familien | ### Fixed |

-**KiloCode**: timeout for kilokode-sundhedstjek allerede rettet i v2.3.11 -**OpenCode**: Tilføj opencode til cliRuntime-registret med 15 sekunders sundhedstjek timeout -**OpenClaw / Cursor**: Øg timeout for sundhedstjek til 15 sekunder for varianter med langsom start -**VPS**: Installer droid- og openclaw npm-pakker; aktiver CLI_EXTRA_PATHS for kiro-cli -**cliRuntime**: Tilføj opencode-værktøjsregistrering og øg timeout for at fortsætte## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Øg `healthcheckTimeoutMs` fra 4000ms til 15000ms - kilocode gengiver et ASCII-logobanner ved opstart, hvilket forårsager falsk "healthcheck_failed" i miljøer med langsom/koldstart## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Ret `check:any-budget:t11`-fejl - erstat `som enhver` med `som Record<streng, unknown>` i OAuthModal.tsx (3 forekomster)### Docs

-**CLI-TOOLS.md**: Komplet guide til alle 11 CLI-værktøjer (claude, codex, gemini, opencode, cline, kilocode, fortsæt, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md synkroniseret til 30 sprog med oversat titel + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nyt ældre OpenAI-afslutningsslutpunkt - accepterer både 'prompt'-streng og 'beskeder'-array, normaliseres automatisk til chatformat -**EndpointPage**: Viser nu alle 3 OpenAI-kompatible slutpunkttyper: Chat-fuldførelser, svar-API og ældre fuldførelser -**i18n**: Tilføjet `completionsLegacy/completionsLegacyDesc` til 30 sprogfiler### Fixed

-**OAuthModal**: Ret "[object Object]" vist på alle OAuth-forbindelsesfejl - ekstraher korrekt ".message" fra fejlsvarobjekter i alle 3 "throw new Error(data.error)"-kald (exchange, device-code, authorize)

- Påvirker Cline, Codex, GitHub, Qwen, Kiro og alle andre OAuth-udbydere## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Tilføj "decodeURIComponent" før base64-afkodning, så URL-kodede godkendelseskoder fra tilbagekalds-URL'en parses korrekt, og retter "ugyldig eller udløbet autorisationskode"-fejl på fjernopsætninger (LAN IP) -**Cline OAuth**: `mapTokens` udfylder nu `navn = fornavn + efternavn || e-mail`, så Cline-konti viser rigtige brugernavne i stedet for "Konto #ID" -**OAuth-kontonavne**: Alle OAuth-udvekslingsstrømme (udveksling, meningsmåling, poll-tilbagekald) normaliserer nu "navn = e-mail", når navn mangler, så hver OAuth-konto viser sin e-mail som visningsetiketten i udbyderens dashboard -**OAuth-kontonavne**: Fjernet sekventiel "Konto N" fallback i `db/providers.ts` — konti uden e-mail/navn bruger nu en stabil ID-baseret etiket via `getAccountDisplayName()` i stedet for et sekventielt nummer, der ændres, når konti slettes## [2.3.6] - 2026-03-12

### Fixed

-**Provider test batch**: Fixed Zod skema til at acceptere `providerId: null` (frontend sender null for ikke-udbyder modes); returnerede forkert "Ugyldig anmodning" for alle batchtests -**Provider test modal**: Rettede "[object Object]"-visning ved at normalisere API-fejlobjekter til strenge før gengivelse i "setTestResults" og "ProviderTestResultsView" -**i18n**: Tilføjede manglende nøgler `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` til `en.json` -**i18n**: Synkroniseret 1111 manglende nøgler på tværs af alle 29 ikke-engelsksprogede filer ved hjælp af engelske værdier som fallbacks## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Tilføjet permanent `postinstall` rettelse for at kopiere `@swc/helpers` til den selvstændige app's `node_modules` – forhindrer MODULE_NOT_FOUND nedbrud på globale npm-installationer## [2.3.4] - 2026-03-10

### Added

- Flere udbyderintegrationer og dashboardforbedringer
