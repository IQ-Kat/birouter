# Changelog (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Mellanprogram:**Löst oändlig omdirigeringsslinga på instrumentpanelen för nya tillfällen när requireLogin är inaktiverat.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Native Integration:**Refaktorerade fullständigt Qoder Executor för att kringgå den äldre COZY AES/RSA-krypteringsalgoritmen och dirigerade direkt till den ursprungliga DashScope OpenAi-kompatibla URL:en. Eliminerar komplexa beroenden av nod-kryptomoduler samtidigt som strömtroheten förbättras. -**Resilence Engine Overhaul:**Integrerad kontextöversvämning graciösa fallbacks, proaktiv OAuth-tokendetektering och förebyggande av utsläpp av tomt innehåll (#990). -**Kontextoptimerad routingstrategi:**Lade till ny intelligent routingkapacitet för att maximera kontextfönster i automatiska kombinationsdistributioner (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Fixade djupkloningskorruption där Anthropic/OpenAI-översättningsgränser tog bort "response."-specifika SSE-prefix från streaminggränser (#992). -**Justering av Claude Cache-passthrough:**Justerade CC-kompatibla cachemarkörer konsekvent med uppströms Client Pass-Through-läge som bevarar promptcache. -**Turbopack-minnesläcka:**Fäste Next.js till strikt `16.0.10` för att förhindra minnesläckor och bygga slöhet från de senaste uppströms Turbopack-hashade moduleregressionerna (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-integration:**Integrated models.dev som den auktoritativa körtidskällan för modellprissättning, kapacitet och specifikationer, som åsidosätter hårdkodade priser. Inkluderar ett användargränssnitt för inställningar för att hantera synkroniseringsintervall, översättningssträngar för alla 30 språk och robust testtäckning. -**Providerns inbyggda funktioner:**Lade till stöd för att deklarera och kontrollera inbyggda API-funktioner (t.ex. "systemInstructions_supported") som förhindrar misslyckanden genom att sanera ogiltiga roller. För närvarande konfigurerad för Gemini Base och Antigravity OAuth-leverantörer. -**Avancerade inställningar för API-leverantör:**Tillagda anpassade "User-Agent"-överstyrningar per anslutning för API-nyckelleverantörsanslutningar. Åsidosättningen lagras i `providerSpecificData.customUserAgent` och gäller nu valideringssonder och uppströmsexekveringsförfrågningar.### 🐛 Bug Fixes

-**Qwen OAuth-tillförlitlighet:**Löste en rad OAuth-integreringsproblem inklusive en 400 Bad Request-blockerare på utgångna tokens, reservgenerering för att tolka OIDC 'access_token'-egenskaper när 'id_token' utelämnas, modellkatalogupptäcktsfel och strikt filtrering av 'X-0AI header-compatiction-\*4 Open' slutpunkter.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Fullbordad inbyggd CRUD-livscykelintegration för den avancerade Auto-Combo-motorn (#955). -**Kärnverksamhet:**Fixade saknade översättningar för nya inbyggda Auto-Combos-alternativ (#955). -**Säkerhetsvalidering:**Inaktiverade automatiska säkerhetskopieringsuppgifter för SQLite under körning av enhetstest CI för att explicit lösa Node 22 Event Loop hängande minnesläckor (#956). -**Ekosystemproxies:**Slutförda schemaläggare för synkronisering av modeller för explicit integrationsmappning, OAuth-cykler och Token Check uppdateras säkert genom OmniRoutes inbyggda system uppströms proxyservrar (#953). -**MCP-utvidgning:**Lade till och registrerade det nya MCP-ramverksverktyget `omniroute_web_search` från beta till produktionsscheman (#951). -**Tokens Buffer Logic:**Lade till körtidskonfigurationsgränser som utökar konfigurerbara in-/utdata-tokenbuffertar för exakta användningsspårningsmått (#959).### 🐛 Bug Fixes

-**CodeQL Remediation:**Fullständigt lösta och säkrade kritiska strängindexeringsoperationer som förhindrar Server-Side Request Forgery (SSRF)-arrayer som indexerar heuristik tillsammans med polynomalgorithmic backtracking (ReDoS) inuti djupa proxydispatcher-moduler. -**Krypto-hashar:**Ersatte svaga overifierade äldre OAuth 1.0-hashar med robusta HMAC-SHA-256-standardvalideringsprimitiver som säkerställer snäva åtkomstkontroller. -**API-gränsskydd:**Korrekt verifierade och mappade strukturella ruttskydd som upprätthåller strikt `isAuthenticated()`-mellanvarulogik som täcker nyare dynamiska slutpunkter som är inriktade på manipulering av inställningar och laddning av inbyggda färdigheter. -**CLI Ecosystem Compat:**Löste trasiga inbyggda runtime-parserbindningar som kraschar "där" miljödetektorer strikt över ".cmd/.exe" kantfodral för externa plugins (#969). -**Cachearkitektur:**Refaktorerad exakt analys och systeminställningar instrumentpanelens parametrar layoutstruktur caching för att upprätthålla stabila återhydreringsbeständighetscykler som löser visuella ojusterade tillståndsblixtar (#952). -**Claude Caching Standards:**Normaliserade och noggrant strikt bevarade kritiska efemerala blockmarkörer "efemera" cache TTL-order för nedströms noder som upprätthåller standardkompatibla CC-förfrågningar mappning rent utan tappade mätvärden (#948). -**Autentisering av interna alias:**Förenklade interna körtidsmappningar som normaliserar uppslagningar av Codex-referensnyttolast i globala översättningsparametrar som löser 401 oautentiserade fall (#958).### 🛠️ Maintenance

-**Upptäckbarhet för användargränssnitt:**Korrekt justerade layoutkategoriseringar som explicit separerar gratisnivåleverantörer logik som förbättrar UX-sorteringsflöden på de allmänna API-registersidorna (#950). -**Deployment Topology:**Unified Docker-distributionsartefakter som säkerställer att roten "fly.toml" matchar förväntade parametrar för molninstanser direkt från lådan som hanterar automatiska distributioner som skalas korrekt. -**Utvecklingsverktyg:**Dekopplade LKGP-körtidsparametrar till explicita DB-lagerabstraktionscachingverktyg som säkerställer strikt testisoleringstäckning för kärncachinglager på ett säkert sätt.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Fullständigt omarbetade `/dashboard/auto-combo` UI för att sömlöst integreras med inbyggda Dashboard-kort och standardiserade visuella utfyllnad/rubriker. Lade till dynamiska visuella framstegsstaplar som kartlägger viktmekanismer för modellval. -**Settings Routing Sync:**Fullt exponerade avancerade routing-"prioritets"- och "vägda" schemamål internt i reservlistor för globala inställningar.### Bug Fixes

-**Memory & Skills Locale Noder:**Löste tomma renderingstaggar för Memory och Skills-alternativ direkt i globala inställningsvyer genom att koppla alla "settings.\*"-mappningsvärden internt till "en.json" (också implicit mappad för korsöversättningsverktyg).### Internal Integrations

- Integrerad PR #946 — fix: bevara Claude Code-kompatibilitet i svarskonvertering
- Integrerad PR #944 — fix (tvilling): bevara tankesignaturer över anrop mot gravitationsverktyg
- Integrerad PR #943 — fix: återställ GitHub Copilot-kroppen
- Integrerad PR #942 — Fixa cc-kompatibla cachemarkörer
- Integrerad PR #941 — refactor(auth): förbättra NVIDIA-aliassökning + lägg till LKGP-felloggning
- Integrerad PR #939 — Återställ hantering av Claude OAuth localhost-återuppringning
- _(Obs: PR #934 utelämnades från cykeln 3.4.9 för att förhindra regressioner av kärnkonflikt)_---

## [3.4.8] — 2026-04-03

### Säkerhet

- Fullständigt åtgärdat alla utestående Github Advanced Security (CodeQL) fynd och Dependabot-varningar.
- Fixade osäkra slumpmässiga sårbarheter genom att migrera från `Math.random` till `crypto.randomUUID()`.
- Säkra skalkommandon i automatiserade skript från stränginjektion.
- Migrerade sårbara katastrofala backtracking RegEx-parsningsmönster i chatt-/översättningspipelines.
- Förbättrade utgångssaneringskontroller inuti React UI-komponenter och Server Sent Events (SSE) tagginjektion.---

## [3.4.7] — 2026-04-03

### Funktioner

- Lade till "Kryptografi"-nod till övervakning och MCP-hälsokontroller (#798)
- Härdad mappning av ruttbehörigheter för modellkatalog (`/modeller`) (#781)### Bug Fixes

- Fixade uppdateringar av Claude OAuth-token som misslyckades med att bevara cachekontexter (#937)
- Fixade CC-kompatibla leverantörsfel som gjorde cachade modeller oåtkomliga (#937)
- Fixade GitHub Executor-fel relaterade till ogiltiga kontextmatriser (#937)
- Fixade NPM-installerade CLI-verktyg hälsokontrollfel på Windows (#935)
- Fixat nyttolastöversättning som tappade giltigt innehåll på grund av ogiltiga API-fält (#927)
- Fixat runtime-krasch i Nod 25 angående API-nyckelkörning (#867)
- Fast MCP fristående modulupplösning (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Fixat NVIDIA NIM routing autentiseringsupplösning alias missmatch (#931)### Säkerhet

- Lagt till säkert strikt ingångsgränsskydd mot råa "shell: true" fjärrexekveringsinjektioner.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Leverantörer:**Registrerade nya leverantörer av bild-, video- och ljudgenerering från den efterfrågade listan (#926). -**Dashboard UI:**Lade till fristående sidofältsnavigering för de nya modulerna Memory och Skills (#926). -**i18n:**Lade till översättningssträngar och layoutmappningar över 30 språk för namnområdena Memory och Skills.### 🐛 Bug Fixes

-**Resiliens:**Förhindrade proxykretsbrytaren från att fastna i ett ÖPPET-tillstånd på obestämd tid genom att hantera direkta övergångar till STÄNGT-tillstånd i reservkombinationsvägar (#930). -**Protokollöversättning:**Patchade streamingtransformatorn för att sanera svarsblock baserat på det förväntade _source_-protokollet snarare än leverantörens _target_-protokoll, och fixade Anthropics-modeller insvepta i OpenAI-nyttolaster som kraschar Claude Code (#929). -**API-specifikationer och Gemini:**Fixade "thought_signature"-tolkning i "openai-to-gemini" och "claude-to-gemini" översättare, vilket förhindrade HTTP 400-fel över alla Gemini 3 API-verktygsanrop. -**Leverantörer:**Rensade upp icke-OpenAI-kompatibla slutpunkter som förhindrar giltiga uppströmsanslutningar (#926). -**Cachetrender:**Fixade en ogiltig egenskapsmappningsdata som inte överensstämde med Cache Trends UI-diagram att krascha, och extraherade redundanta cachemetrik-widgets (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI Ecosystem Integration:**Lade till "cliproxyapi"-exekutorn med inbyggd modul-nivå caching och proxy routing. Introducerade en omfattande Version Manager-tjänst för att automatiskt testa hälsa, ladda ner binärer från GitHub, skapa isolerade bakgrundsprocesser och rengöra livscykeln för externa CLI-verktyg direkt genom användargränssnittet. Inkluderar DB-tabeller för proxykonfiguration för att möjliggöra automatisk SSRF-gated cross-routing av externa OpenAI-förfrågningar via det lokala CLI-verktygslagret (#914, #915, #916). -**Qoder PAT-stöd:**Integrated Personal Access Tokens (PAT) stöder direkt via den lokala `qodercli`-transporten istället för äldre fjärr-.cn-webbläsarkonfigurationer (#913). -**Gemini 3.1 Pro Preview (GitHub):**Lade till "gemini-3.1-pro-preview" kanoniskt explicit modellstöd inbyggt i GitHub Copilot-leverantören samtidigt som äldre routingalias bevarades (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stability:**Reparerade Copilot-tokens uppdateringsloop där inaktuella tokens inte var djupt sammansmälta i DB, och tog bort "reasoning_text"-fält som dödligt bröt nedströms antropiska blockkonverteringar för multi-turn chats (#923). -**Global Timeout Matrix:**Centraliserade och parametriserade tidsgränser för begäran explicit från `REQUEST_TIMEOUT_MS` för att förhindra dolda (~300s) standardhämtningsbuffertar i förtid som avbryter långlivade SSE-strömningssvar från tunga resonemangsmodeller (#918). -**Cloudflare Quick Tunnels State:**Fixade en allvarlig tillståndsinkonsekvens där omstartade OmniRoute-instanser felaktigt visade förstörda tunnlar som aktiva, och standardinställd molnflared tunnling till `HTTP/2` för att eliminera UDP-mottagningsbuffertloggspam (#925). -**i18n Translation Overhaul (tjeckiska och hindi):**Fast hindikod från UTGÅNGAD `in.json` till kanonisk `hi.json`, omarbetad tjeckisk textmappning, extraherad `untranslatable-keys.json` för att fixa CI/CD falska positiva valideringar, och genererade `Imdl-guider för översättning av doc18Ns. (#912).
-**Token Provider Recovery:**Fixade att Qwen tappade specifika `resourceUrl`-slutpunkter efter automatiska hälsokontrolltoken-uppdateringar på grund av saknade DB-djupa sammanslagningar (#917). -**CC-kompatibel UX och streaming:**Förenade de Lägg till CC/OpenAI/Anthropic-kompatibla åtgärderna kring behandling av Anthropic UI, tvingade CC-kompatibla uppströmsförfrågningar att använda SSE medan de fortfarande returnerade strömmande eller icke-strömmande svar baserat på klientbegäran, tog bort CC-modelllistkonfiguration/importstöd till förmån för en explicit-modell- CC-stödd, compati-tillgänglig Modeller speglar registerlistan för OAuth Claude Code (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Skicka ut `response.completed` med korrekta `input_tokens`/`output_tokens`-fält för Codex CLI-klienter, fixar tokenanvändningsvisning (#909 — tack @christopher-s). -**SQLite WAL Checkpoint vid avstängning:**Spola WAL-ändringar i den primära databasfilen under graciös avstängning/omstart, vilket förhindrar dataförlust på Docker-containerstopp (#905 — tack @rdself). -**Graceful Shutdown Signal:**Ändrade rutter för `/api/restart` och `/api/shutdown` från `process.exit(0)` till `process.kill(SIGTERM)`, vilket säkerställer att avstängningshanteraren körs före utgång. -**Docker Stop Grace Period:**Lade till `stop_grace_period: 40s` till Docker Compose-filer och `--stop-timeout 40` till Docker-körningsexempel.### 🛠️ Maintenance

- Stängde 5 lösta/inte-en-bugg-problem (#872, #814, #816, #890, #877).
- Triagede 6 problem med behovsinformationsbegäranden (#892, #887, #886, #865, #895, #870).
- Svarade på CLI-detekteringsspårningsproblem (#863) med hjälp av bidragsgivare.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Slutfört fjärrminne och färdighetsinjektion för Antigravity-leverantören på proxynätverksnivå. -**Claude Code-kompatibilitet:**Byggde en inbyggt dold kompatibilitetsbrygga för Claude Code, som skickade verktyg och formatering rent. -**Web Search MCP:**Lade till verktyget `omniroute_web_search` med omfånget `execute:search`. -**Cachekomponenter:**Implementerade dynamiska cachekomponenter med TDD. -**Användargränssnitt och anpassning:**Lade till anpassat favicon-stöd, utseendeflikar, trådbunden vitmärkning till sidofältet och tillagda vindsurfguidesteg över alla 33 språk. -**Logglagring:**Enhetlig lagring av förfrågningsloggar och artefakter inbyggt. -**Modellförbättringar:**Tillagd explicit "contextLength" för alla opencode-zen-modeller. -**i18n & översättningar:**Integrerade 33 språköversättningar inbyggda, inklusive platshållare CI-valideringar och kinesiska dokumentationsuppdateringar (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth-mappning:**Återställde `id_token`-beroende till `access_token` och aktiverade dynamisk `resource_url` API-slutpunktsinjektion för korrekt regional routing (#900). -**Model Sync Engine:**Lagrade det strikta interna leverantörs-ID:t i `getCustomModels()` synkroniseringsrutiner istället för UI Channel Alias-formatet, vilket förhindrade SQLite-kataloginfogningsfel (#903). -**Claude Code & Codex:**Standardiserade icke-strömmande tomma svar på antropiskt formaterade `(tomt svar)` för att förhindra CLI-proxykrascher (#866). -**CC-kompatibel routing:**Löste dubbla `/v1`-slutpunktskollision under sökvägssammansättning för generiska Claude Code-gateways (#904). -**Antigravity Dashboards:**Blockerade obegränsade kvotmodeller från att felaktigt registrera sig som uttömda "100% Usage"-gränstillstånd i Provider Usage UI (#857). -**Claude Image Passthrough:**Fixade Claude-modeller som saknade bildblocksgenomgångar (#898). -**Gemini CLI Routing:**Löste 403 auktoriseringslåsningar och innehållsackumuleringsproblem genom att uppdatera projekt-ID:t via `loadCodeAssist` (#868). -**Antigravity Stabilitet:**Korrigerade modellåtkomstlistor, påtvingade 404-låsningar, fasta 429 kaskader som låser ut standardanslutningar och förseglade "gemini-3.1-pro"-utdatatokens (#885). -**Provider Sync Cadence:**Reparerade leverantören begränsar synkroniseringskadens via den interna schemaläggaren (#888). -**Dashboard Optimization:**Löst `/dashboard/limits` gränssnittsfrysning vid bearbetning av 70+ konton via chunkparallellisering (#784). -**SSRF-härdning:**Tvingade strikt SSRF IP-intervallfiltrering och blockerade `::1` loopback-gränssnittet. -**MIME-typer:**Standardiserad "mime_type" till snake_case för att matcha Gemini API-specifikationer. -**CI-stabilisering:**Fixade misslyckade analyser/inställningar Playwright-väljare och begärandepåståenden så att GitHub Actions E2E-körningar passerar tillförlitligt över lokaliserade användargränssnitt och switchbaserade kontroller. -**Deterministiska tester:**tog bort datumkänsliga kvotfixturer från Copilots användningstester och anpassade idempotens-/modellkatalogtester med det sammanslagna körtidsbeteendet. -**MCP-typhärdning:**tog bort explicita "någon"-regression med nollbudget från registreringssökvägen för MCP-serververktyget. -**Model Sync Engine:**Förbigående destruktiva "ersätt" åsidosätter när leverantörens automatiska synkronisering ger en tom modelllista, vilket bibehåller stabiliteten för dynamiska kataloger (#899).### 🛠️ Maintenance

-**Pipeline-loggning:**Förfinade pipeline-loggningsartefakter och framtvinga retentionslock (#880). -**AGENTS.md Översyn:**Kondenserad från 297→153 rader. Lade till riktlinjer för bygg/test/stil, kodarbetsflöden (Prettier, TypeScript, ESLint) och trimmade detaljerade tabeller (#882). -**Release Branch Integration:**Konsoliderade de aktiva funktionerna till `release/v3.4.2` ovanpå nuvarande `main` och validerade grenen med lint, unit, coverage, build och CI-mode E2E-körningar. -**Testning:**Lade till testkonfiguration för komponenttestning och Playwright-specifikationer för inställningar. -**Dokumentuppdateringar:**Utökade root-läsmängder, översatte kinesiska dokument inbyggt och rensade bort föråldrade filer.## [3.4.1] - 2026-03-31

> [!VARNING]
> **BROTT ÄNDRING: miljövariabler för begäranden loggning, kvarhållning och loggning har gjorts om.**
> Vid den första uppstarten efter uppgraderingen arkiverar OmniRoute äldre förfrågningsloggar från `DATA_DIR/logs/`, äldre `DATA_DIR/call_logs/` och `DATA_DIR/log.txt` till `DATA_DIR/log_archives/*.zip`, och tar sedan bort det föråldrade formatet under oförändrade växlar till det nya formatet `DATA_DIR/samtalsloggar/`.### ✨ New Features

-**.ENV Migration Utility:**Inkluderade `scripts/migrate-env.mjs` för att sömlöst migrera `<v3.3`-konfigurationer till `v3.4.x` strikta säkerhetsvalideringsbegränsningar (FASE-01), reparera startkrascher orsakade av korta `JWT_SECRET`-instanser. -**Kiro AI-cacheoptimering:**Implementerade deterministisk 'conversationId'-generering (uuidv5) för att aktivera AWS Builder ID Prompt Caching korrekt över anrop (#814). -**Återställning och konsolidering av instrumentpanelens gränssnitt:**Löste logiken i sidofältet genom att utelämna felsökningsavsnittet och rensade Nextjs routingvarningar genom att explicit flytta fristående `/dashboard/mcp`- och `/dashboard/a2a`-sidor till inbäddade Endpoint Proxy-gränssnittskomponenter. -**Unified Request Log Artifacts:**Request-loggning lagrar nu en SQLite-indexrad plus en JSON-artefakt per begäran under `DATA_DIR/call_logs/`, med valfri pipeline-infångning inbäddad i samma fil. -**Språk:**Förbättrade den kinesiska översättningen (#855) -**Opencode-Zen-modeller:**Lade till 4 gratismodeller till opencode-zen-registret (#854) -**Tester:**Lade till enhets- och E2E-tester för inställningar och buggfixar (#850)### 🐛 Bug Fixes

-**429 Quota Parsing:**Parsade långa kvotåterställningstider från felinstanser för att respektera korrekta backoffs och förhindra hastighetsbegränsade kontoförbud (#859) -**Prompt Caching:**Bevarade klient-'cache_control'-rubriker för alla Claude-protokollleverantörer (som Minimax, GLM och Bailian), som korrekt känner igen cachingstöd (#856) -**Modelsynkroniseringsloggar:**Minskad loggskräp genom att spela in "sync-modeller" endast när kanalen faktiskt ändrar listan (#853) -**Provider Quota & Token Parsing:**Ändrade antigravitationsgränser för att använda "retrieveUserQuota" naturligt och korrekt mappade Claude-tokens uppdateringsnyttolaster till URL-kodade former (#862) -**Rate-Limiting Stability:**Universaliserade arkitekturen 429 Retry-After-analys för att begränsa leverantörsinducerade nedkylningar vid max 24 timmar (#862) -**Dashboard Limit Rendering:**Omarbetad "/dashboard/limits" kvotmappning för att rendera omedelbart inuti bitar, vilket fixar en större gränssnittsfördröjning på konton som överstiger 70 aktiva anslutningar (#784) -**QWEN OAuth-auktorisering:**Mappade OIDC `id_token` som den primära API Bearer-token för Dashscope-förfrågningar, fixade omedelbara 401 obehöriga fel efter att konton anslutits eller uppdatering av tokens (#864) -**ZAI API Stabilitet:**Hardened Server-Sent Events-kompilator för att graciöst falla tillbaka till tomma strängar när DeepSeek-leverantörer streamar matematiskt nullinnehåll under resonemangsfaser (#871) -**Claude Code/Codex Translations:**Skyddade icke-strömmande nyttolastkonverteringar mot tomma svar från uppströms Codex-verktyg, vilket undviker katastrofala TypeErrors (#866) -**NVIDIA NIM-rendering:**Villkorligt avskalade identiska leverantörsprefix som drivs dynamiskt av ljudmodeller, vilket eliminerar duplicerade "nim/nim"-taggstrukturer som kastar 404 på Media Playground (#872)### ⚠️ Breaking Changes

-**Begäranvändningslogglayout:**Tog bort den gamla multifilen `DATA_DIR/logs/` begäransloggsessioner och sammanfattningsfilen `DATA_DIR/log.txt`. Nya förfrågningar skrivs som enstaka JSON-artefakter i `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Loggingmiljövariabler:**Ersatte `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` och `PROXY_LOG_MAX_ENTRIES` med den nya `APP_LOG_*` och `CALL_LOG_RETENTION_DAYS.`configuration-modellen. -**Pipeline Toggle Setting:**Ersatte den äldre inställningen `detailed_logs_enabled` med `call_log_pipeline_enabled`. Nya pipelinedetaljer är inbäddade i begäranartefakten istället för att lagras som separata "request_detail_logs"-poster.### 🛠️ Maintenance

-**Legacy Request Log Upgrade Backup:**Uppgraderingar arkiverar nu gamla `data/logs/`, äldre `data/call_logs/`, och `data/log.txt` layouter i `DATA_DIR/log_archives/*.zip` innan den föråldrade strukturen tas bort. -**Streaming Usage Persistence:**Streamingförfrågningar skriver nu en enda "usage_history"-rad när de är klara istället för att skicka ut en dubblett pågående användningsrad med tomma statusmetadata. -**Loggningsuppföljningsrensning:**Pipeline-loggar fångar inte längre "KÄLLA BEGÄRAN", begär artefaktposter respekterar nu "CALL_LOG_MAX_ENTRIES", och programloggarkiv respekterar nu "APP_LOG_MAX_FILES".---

## [3.4.0] - 2026-03-31

### Funktioner

-**Analys av prenumerationsanvändning:**Lade till spårning av kvotöversiktsbilder av tidsserier, flikar för leverantörsanvändning och kombohälsa med visualiseringar för omdiagram och motsvarande API-slutpunkter (#847) -**SQLite Backup Control:**Ny "OMNIROUTE_DISABLE_AUTO_BACKUP" env-flagga för att inaktivera automatiska SQLite-säkerhetskopior (#846) -**Modell Registry Update:**Injicerade `gpt-5.4-mini` i Codex-leverantörens uppsättning modeller (#756) -**Spårning av leverantörsgränser:**Spåra och visa när leverantörsprisgränser senast uppdaterades per konto (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Omdirigerade Qwen OAuth-slutföranden från DashScope API till Web Inference API (`chat.qwen.ai`), löser auktoriseringsfel (#844, #807, #832) -**Qwen Auto-Retry Loop:**Lade till riktad 429-kvot Överskriden backoff-hantering i "chatCore" som skyddar burst-förfrågningar -**Codex OAuth Fallback:**Modern webbläsares popup-blockering fångar inte längre användaren; den faller automatiskt tillbaka till manuell URL-inmatning (#808) -**Claude Token Refresh:**Anthropics strikta "applikation/json"-gränser respekteras nu under tokengenerering istället för kodade webbadresser (#836) -**Codex Messages Schema:**Avskalade puristiska "meddelanden" från inbyggda passthrough-förfrågningar för att undvika strukturella avslag från ChatGPT uppströms (#806) -**CLI-detekteringsstorleksgräns:**Bumpade säkert nodens binära skanningsövergräns från 100MB till 350MB, vilket gjorde att tunga fristående verktyg som Claude Code (229MB) och OpenCode (153MB) kunde detekteras korrekt av VPS-körtiden (#809) -**CLI Runtime Environment:**Återställd förmåga för CLI-konfigurationer att respektera användaröverstyrningsvägar (`CLI_{PROVIDER}_BIN`) som kringgår strikta sökvägsbundna upptäcktsregler -**Nvidia Header Conflicts:**Tog bort "prompt_cache_key"-egenskaper från uppströmshuvuden när du ringde icke-antropiska leverantörer (#848) -**Codex Fast Tier Toggle:**Återställd Codex Service Tier Toggle kontrast i ljusläge (#842) -**Testinfrastruktur:**Uppdaterat "t28-model-catalog-updates"-test som felaktigt förväntade sig den föråldrade DashScope-slutpunkten för Qwens inbyggda register---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Custom Provider Rotation:**Integrerad "getRotatingApiKey" internt i DefaultExecutor, vilket säkerställer att "extraApiKeys" rotation triggs korrekt för anpassade och kompatibla uppströmsleverantörer (#815)---

## [3.3.8] - 2026-03-30

### Funktioner

-**Models API-filtrering:**Endpoint `/v1/models` filtrerar nu dynamiskt sin lista baserat på behörigheterna kopplade till `Authorization: Bearer <token>` när begränsad åtkomst är på (#781) -**Qoder-integration:**Inbyggd integration för Qoder AI som ersätter de äldre iFlow-plattformsmappningarna (#660) -**Spårning av snabbcache:**Lade till spårningsfunktioner och frontend-visualisering (statistikkort) för semantisk och snabb cachelagring i Dashboard-gränssnittet### 🐛 Bug Fixes

-**Cache Dashboard Storlek:**Förbättrade gränssnittets layoutstorlekar och kontextrubriker för de avancerade cachesidorna (#835) -**Felsöka sidofältets synlighet:**Fixade ett problem där felsökningsväxlingen inte korrekt visade/döljer sidofältets felsökningsdetaljer (#834) -**Tvillingmodellprefix:**Ändrade reservnamnet för namnutrymmet till korrekt rutt via "gemini-cli/" istället för "gc/" för att respektera uppströmsspecifikationer (#831) -**OpenRouter Sync:**Förbättrad kompatibilitetssynkronisering för att automatiskt mata in den tillgängliga modellkatalogen korrekt från OpenRouter (#830) -**Mappning av strömmande nyttolaster:**Serialisering av resonemangsfält löser naturligt konfliktaliasvägar när utdata streamas till edge-enheter---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Omstrukturerad genererad `opencode.json` för att använda det `@ai-sdk/openai-compatible` postbaserade schemat med `options` och `modeller` som objektkartor istället för platta arrayer, vilket åtgärdar konfigurationsvalideringsfel (#816) -**i18n saknade nycklar:**Lade till saknad "cloudflaredUrlNotice" översättningsnyckel över alla 30 språkfiler för att förhindra "MISSING_MESSAGE" konsolfel på Endpoint-sidan (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Inkluderade prompt cache-tokens säkert i beräkningar av historiska användningsingångar för korrekta kvotavdrag (PR #822) -**Kombotestsonder:**Fixade falsknegativ för logik för kombinationstestning genom att lösa parsning för svar som endast är resonemang och möjliggjorde massiv parallellisering via Promise.all (PR #828) -**Docker Quick Tunnels:**Inbäddade erforderliga ca-certifikat i basruntime-behållaren för att lösa Cloudflared TLS-startfel och uppkomna standardnätverksfel som ersätter generiska utgångskoder (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Lade till Gemini CLI-kvotspårning i realtid via `retrieveUserQuota` API (PR #825) -**Cache Dashboard:**Förbättrade Cache Dashboard för att visa snabba cachestatistik, 24h trender och uppskattade kostnadsbesparingar (PR #824)### 🐛 Bug Fixes

-**Användarupplevelse:**Tog bort invasiva autoöppnande OAuth-modala loopar på sidor med ofullständiga leverantörsdetaljer (PR #820) -**Beroendeuppdateringar:**Stötade och låsta beroenden för utvecklings- och produktionsträd inklusive Next.js 16.2.1, Recharts och TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A-arbetsflöden:**Tillagd deterministisk FSM-orkestrator för agentarbetsflöden i flera steg. -**Graceful Degradation:**Lade till en ny reservram med flera lager för att bevara kärnfunktionaliteten under partiella systemavbrott. -**Config Audit:**Lade till en revisionsspår med diff-detektering för att spåra ändringar och aktivera konfigurationsåterställning. -**Provider Health:**Spårning av leverantörsförfallodatum med proaktiva UI-varningar för API-nycklar som löper ut. -**Adaptiv routing:**Lade till en adaptiv volym- och komplexitetsdetektor för att åsidosätta routingstrategier dynamiskt baserat på belastning. -**Provider Diversity:**Implementerade leverantörsdiversitetspoäng via Shannon-entropi för att förbättra lastfördelningen. -**Auto-Disable Bounds:**Lade till en Auto-Disable Banned Accounts-inställningsväxling till Resilience-instrumentpanelen.### 🐛 Bug Fixes

-**Codex & Claude-kompatibilitet:**Fixade UI-fallbacks, korrigerade Codex-icke-strömningsintegreringsproblem och löst CLI-runtime-detektering på Windows. -**Releaseautomation:**Utökade behörigheter krävs för Electron App-bygget i GitHub Actions. -**Cloudflare Runtime:**Adresserade korrekta utgångskoder för körningsisolering för Cloudflared-tunnelkomponenter.### 🧪 Tests

-**Testsvituppdateringar:**Utökad testtäckning för volymdetektorer, leverantörsdiversitet, konfigurationsgranskning och FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-tillförlitlighet:**Patchade GitHub-åtgärder till stabila beroendeversioner (`actions/checkout@v4`, `actions/upload-artifact@v4`) för att mildra oanmälda utfasningar av byggarmiljön. -**Föregående bild:**Ersatte godtyckliga reservkedjor i `ProviderIcon.tsx` med explicit validering av tillgångar för att förhindra att UI laddar `<Bild>`-komponenter för filer som inte finns, vilket eliminerar `404`-fel i instrumentpanelens konsolloggar (#745). -**Admin Updater:**Dynamisk källinstallationsdetektering för instrumentpanelens Updater. Inaktiverar säkert `Uppdatera nu`-knappen när OmniRoute är byggd lokalt snarare än genom npm, och uppmanar till `git pull` (#743). -**Uppdatera ERESOLVE-fel:**Injicerade `package.json` åsidosätter `react`/`react-dom` och aktiverade `--legacy-peer-deps` i de interna automatiska uppdateringsskripten för att lösa brytande beroendeträdskonflikter med `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Cloudflare Quick Tunnel-integrering med kontroller på instrumentpanelen (PR #772). -**Diagnostik:**Semantisk cachebypass för kombinerade livetester (PR #773).### 🐛 Bug Fixes

-**Strömningsstabilitet:**Tillämpa `FETCH_TIMEOUT_MS` på strömningsförfrågningars initiala `fetch()`-anrop för att förhindra att 300s Node.js TCP-timeout orsakar tysta uppgiftsfel (#769). -**i18n:**Lägg till saknade `windsurf`- och `copilot`-poster till `toolDescriptions` över alla 33 språkfiler (#748). -**GLM Coding Audit:**Komplett leverantörsrevision som fixar ReDoS-sårbarheter, storlek på kontextfönster (128k/16k) och modellregistersynkronisering (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Reservbehandlingskorrigering för "typ: "text"-element som bär null eller tomma datauppsättningar som orsakade 400-avvisning (#742). -**Opencode:**Uppdatera schemajustering till singularis `provider` för att matcha officiella specifikationer (#774). -**Gemini CLI:**Injicera saknade slutanvändarkvotrubriker som förhindrar 403-auktoriseringslåsningar (#775). -**DB-återställning:**Refactor multipart nyttolast import till råa binära buffrade arrayer för att kringgå omvänd proxy max body gränser (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilization**— Slutförd version 3.2.9 (kombidiagnostik, kvalitetsgrindar, Gemini-verktygsfix) och skapad git-tagg som saknas. Konsoliderade alla stegvisa förändringar till en enda atomär frigörelse.### 🐛 Bug Fixes

-**Auto-Update Test**— Fixat `buildDockerComposeUpdateScript`-testpåstående för att matcha oexpanderade skalvariabelreferenser (`$TARGET_TAG`, `${TARGET_TAG#v}`) i det genererade distributionsskriptet, i linje med den refaktorerade mallen från v3.2.8. -**Circuit Breaker Test**— Härdade `combo-circuit-breaker.test.mjs` genom att injicera `maxRetries: 0` för att förhindra återuppblåsning från att skeva felräkningspåståenden under brytartillståndsövergångar.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introducerade en förbikopplingsflagga för livetest (`forceLiveComboTest`) som gör det möjligt för administratörer att utföra riktiga hälsokontroller uppströms som kringgår alla lokala strömbrytare och nedkylningsmekanismer, vilket möjliggör exakt diagnostik under rullande avbrott (PR #759) -**Quality Gates**— Lade till automatisk svarskvalitetsvalidering för kombinationer och officiellt integrerat stöd för "claude-4.6"-modeller i de centrala routingschemana (PR #762)### 🐛 Bug Fixes

-**Verktygsdefinitionsvalidering**— Reparerad Gemini API-integrering genom att normalisera enumtyper i verktygsdefinitioner, vilket förhindrar uppströms HTTP 400-parameterfel (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Integrerad en frikopplad bakgrundsuppdateringsprocess för Docker Compose-distributioner. Dashboard-gränssnittet spårar nu sömlöst uppdateringslivscykelhändelser genom att kombinera JSON REST-svar med SSE-strömningsförloppsöverlagringar för robust tillförlitlighet över flera miljöer. -**Cacheanalys**— Reparerad visualiseringsmappning med noll-metrics genom att migrera Semantic Cache-telemetriloggar direkt till den centraliserade spårnings-SQLite-modulen.### 🐛 Bug Fixes

-**Autentiseringslogik**— Fixade en bugg där det misslyckades att spara instrumentpanelsinställningar eller lägga till modeller med ett 401 Unauthorized-fel när 'requireLogin' inaktiverades. API-slutpunkter utvärderar nu den globala autentiseringsväxlingen korrekt. Löste global omdirigering genom att återaktivera `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Förhindrade fatala initialiseringsundantag under CLI-miljödetektering genom att fånga "cross-spawn" ENOENT-fel korrekt. Lägger till explicita sökvägar för `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Normaliserade modellöversättningsparametrar som förhindrar kontextförgiftning i proxy-pass-through-läge, vilket upprätthåller generiska "store: false"-begränsningar uttryckligen för alla Codex-ursprungliga förfrågningar. -**SSE-tokenrapportering**— Normaliserad detektering av "finish_reason" för leverantörsverktyg-anropsbit, fixar 0 % användningsanalys för svar som endast är strömmande som saknar strikta "<KLAR>"-indikatorer. -**DeepSeek <think>-taggar**— Implementerade en explicit "<think>"-extraktionsmappning inuti `responsesHandler.ts`, vilket säkerställer att DeepSeek-resonemangsströmmar kartläggs på samma sätt som inhemska antropiska `<thinking>`-strukturer.---

## [3.2.7] - 2026-03-29

### Fixed

-**Sömlösa uppdateringar av användargränssnittet**: Funktionen "Uppdatera nu" på instrumentpanelen ger nu levande, transparent feedback med hjälp av Server-Sent Events (SSE). Den utför paketinstallation, ombyggnationer av inbyggda moduler (bättre-sqlite3) och PM2 startar om på ett tillförlitligt sätt samtidigt som den visar realtidslastare istället för att hänga tyst.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Lade till ett scoped API-nyckelkopieringsflöde i Api Manager, skyddat av miljövariabeln `ALLOW_API_KEY_REVEAL`. -**Sidfältets synlighetskontroller (#739)**— Administratörer kan nu dölja alla sidofältsnavigeringslänkar via inställningarna för utseende för att minska visuell röran. -**Strikt kombinationstestning (#735)**— Härdade den kombinerade hälsokontrollslutpunkten för att kräva livetextsvar från modeller istället för bara mjuka nåbarhetssignaler. -**Strömmade detaljerade loggar (#734)**— Växlade detaljerad loggning av förfrågningar för SSE-strömmar för att rekonstruera den slutliga nyttolasten, spara enorma mängder SQLite-databasstorlek och avsevärt rensa upp användargränssnittet.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Rättade autentiseringshuvudlogiken för `minimax`-modeller på OpenCode Go för att använda `x-api-key` istället för standardbärartokens över `/messages`-protokollet.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integrerad `xbps-src`-paketeringsmall och instruktioner för att kompilera och installera OmniRoute med `bättre-sqlite3`-bindningar via korskompileringsmål.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI-migrering (#660)**— Helt migrerade den äldre "iFlow"-kärnleverantören till "Qoder AI" och bibehöll stabila API-routningsmöjligheter.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 nyttolast ogiltigt argument (#731)**— Förhindrade 'thoughtSignature'-arrayinjektioner inuti standard Gemini-'functionCall'-sekvenser som blockerar agentiska routingflöden.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Normaliserad kvotgränslogik och datamärkning i Limits-gränssnittet.### 🐛 Bug Fixes

-**Core Routing Schemas & Leaks**— Utökat "comboStrategySchema" för att stödja "fill-first"- och "p2c"-strategier för att avblockera komplex combo-redigering inbyggt. -**Thinking Tags Extraction (CLI)**— Omstrukturerad CLI-tokensvarssanering RegEx fångar modellresonemangsstrukturer inuti strömmar och undviker trasiga `<tänka>`-extraktioner som bryter ut format för svarstext. -**Strikt formattillämpningar**— Härdad pipeline-sanering som gör det universellt tillämpligt på översättningslägesmål.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Fyrstegsförfrågningsloggpipeline (#705)**— Refaktorerad loggbeständighet för att spara omfattande nyttolaster i fyra distinkta pipelinestadier: klientbegäran, översatt leverantörsbegäran, leverantörssvar och översatt klientsvar. Introducerad "streamPayloadCollector" för robust SSE-strömavkortning och nyttolast serialisering.### 🐛 Bug Fixes

-**Mobila UI-fixar (#659)**— Förhindrade tabellkomponenter på instrumentpanelen från att bryta layouten på smala vyportar genom att lägga till korrekt horisontell rullning och översvämningsinneslutning till `DashboardLayout`. -**Claude Prompt Cache-fixar (#708)**— Säkerställde att "cache_control"-block i Claude-to-Claude reservslingor bevaras troget och skickas säkert tillbaka till antropiska modeller. -**Gemini Tool Definitions (#725)**— Fixade schemaöversättningsfel vid deklarering av enkla "objekt"-parametertyper för Gemini-funktionsanrop.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global reservleverantör (#689)**— När alla kombinationsmodeller är slut (502/503), försöker OmniRoute nu en konfigurerbar global reservmodell innan felet returneras. Ställ in "globalFallbackModel" i inställningarna för att aktivera.### 🐛 Bug Fixes

-**Fix #721**— Fixad förbikoppling av kontextnålning under svar på verktygsanrop. Icke-strömmande taggning använde fel JSON-sökväg (`json.messages` → `json.choices[0].message`). Strömningsinjektion utlöses nu på "finish_reason"-bitar för strömmar som endast kan användas med verktyg. `injectModelTag()` lägger nu till syntetiska pinmeddelanden för innehåll som inte är strängar. -**Fix #709**— Bekräftad redan fixad (v3.1.9) — `system-info.mjs` skapar kataloger rekursivt. Stängd. -**Fix #707**— Bekräftad redan fixad (v3.1.9) — tom verktygsnamnsanering i `chatCore.ts`. Stängd.### 🧪 Tests

- Lade till 6 enhetstester för kontextfästning med verktygsanropssvar (nullinnehåll, matrisinnehåll, tur och retur, återinjektion)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**— Lade till en dedikerad semantisk caching-dashboard på \`/dashboard/cache\` med målinriktad API-invalidering och 31-språkig i18n-stöd (PR #701 av @oyi77) -**GLM Quota Tracking**— Lade till realtidsanvändning och sessionskvotspårning för GLM Coding (Z.AI)-leverantören (PR #698 av @christopher-s) -**Detaljerade loggnyttolaster**— Kabelbunden full fyrstegs pipelinenyttolastfångst (original, översatt, leverantörssvar, streamade delta) direkt till användargränssnittet (PR #705 av @rdself)### 🐛 Bug Fixes

-**Fix #708**— Förhindrade tokenblödning för Claude Code-användare som dirigerar genom OmniRoute genom att korrekt bevara infödda \`cache_control\`-rubriker under Claude-to-Claude-passthrough (PR #708 av @tombii) -**Fix #719**— Ställ in interna autentiseringsgränser för \`ModelSyncScheduler\` för att förhindra oautentiserade demonfel vid start (PR #719 av @rdself) -**Fix #718**— Ombyggd märkesrendering i Provider Limits UI som förhindrar överlappning av dåliga kvotgränser (PR #718 av @rdself) -**Fix #704**— Fixade Combo Fallbacks som bryter mot HTTP 400-innehållspolicyfel som förhindrar modellrotations död-routing (PR #704 av @rdself)### 🔒 Security & Dependencies

- Bumpade \`path-to-regexp\` till \`8.4.0\` för att lösa dependabot-sårbarheter (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Fix #706**— Fixad ikonåtergivning orsakad av Tailwind V4 `font-sans` åsidosättande genom att tillämpa `!important` på `.material-symbols-outlined`. -**Fix #703**— Fixade trasiga strömmar i GitHub Copilot genom att aktivera `responses` till `openai`-formatöversättning för alla anpassade modeller som utnyttjade `apiFormat: "responses"`. -**Fix #702**— Ersatte schablonmässig användningsspårning med korrekta DB-prisberäkningar för både streamade och icke-strömmande svar. -**Fix #716**— Rensade upp Claudes verktygsanropsöversättningstillstånd, analyserade strömningsargument korrekt och förhindrade OpenAI `tool_calls`-bitar från att upprepa `id`-fältet.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Autotvinga strängkodade numeriska JSON Schema-begränsningar (t.ex. `"minimum": "1"`) till rätt typer, vilket förhindrar 400 fel från Cursor, Cline och andra klienter som skickar felaktiga verktygsscheman. -**Verktygsbeskrivning Sanering**— Se till att verktygsbeskrivningarna alltid är strängar; konverterar "null", "odefinierade" eller numeriska beskrivningar till tomma strängar innan de skickas till leverantörer. -**Clear All Models-knapp**— Lade till i18n-översättningar för "Clear All Models"-leverantörsåtgärden på alla 30 språk. -**Codex Auth Export**— Lade till Codex `auth.json` export och applicera-lokala knappar för sömlös CLI-integration. -**Windsurf BYOK Notes**— Lade till officiella begränsningsvarningar till Windsurf CLI-verktygskortet som dokumenterar BYOK-begränsningar.### 🐛 Bug Fixes

-**Fix #709**— `system-info.mjs` kraschar inte längre när utdatakatalogen inte finns (tillagd `mkdirSync` med rekursiv flagga). -**Fix #710**— A2A `TaskManager` singleton använder nu `globalThis` för att förhindra tillståndsläckage över Next.js API-ruttomkompilering i utvecklarläge. E2E testsvit uppdaterad för att hantera 401 elegant. -**Fix nr -**Fix #605 / #592**— Ta bort "proxy\_"-prefix från verktygsnamn i icke-strömmande Claude-svar; fast LongCat-validerings-URL. -**Call Logs Max Cap\*\*— Uppgraderad `getMaxCallLogs()` med cachinglager, env var-stöd (`CALL_LOGS_MAX`) och integration av DB-inställningar.### 🧪 Tests

- Testsvit utökad från 964 → 1027 tester (63 nya tester)
- Lade till "schema-coercion.test.mjs" — 9 tester för numeriskt fälttvingande och sanering av verktygsbeskrivning
- Lade till `t40-opencode-cli-tools-integration.test.mjs` – OpenCode/Windsurf CLI-integreringstester
- Förbättrad funktionstestgren med omfattande täckningsverktyg### 📁 New Files

| Arkiv                                                    | Syfte                                                |
| -------------------------------------------------------- | ---------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schematvång och verktygsbeskrivning saneringsverktyg |
| `tests/unit/schema-coercion.test.mjs`                    | Enhetstester för schematvång                         |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI-verktygsintegrationstest                         |
| `COVERAGE_PLAN.md`                                       | Testtäckningsplaneringsdokument                      | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Fixade cache_control-markörer som strippades i Claude passthrough-läge (Claude → OmniRoute → Claude), vilket fick Claude Code-användare att tömma sin Antropiska API-kvot 5-10 gånger snabbare än direktanslutningar. OmniRoute bevarar nu klientens cache_control-markörer när sourceFormat och targetFormat båda är Claude, vilket säkerställer att snabb cachelagring fungerar korrekt och minskar tokenförbrukningen dramatiskt.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Plattformskärna:**Implementerad global tillståndshantering för dolda modeller och kombinationer som förhindrar dem från att belamra katalogen eller läcka in i anslutna MCP-agenter (#681). -**Stabilitet:**Lappade streamingkrascher relaterade till den inbyggda Antigravity-leverantörens integration misslyckades på grund av ohanterade odefinierade tillståndsmatriser (#684). -**Lokaliseringssynkronisering:**Implementerade en fullständigt omarbetad `i18n`-synkroniserare som upptäcker saknade kapslade JSON-egenskaper och efteranpassning av 30 lokaler sekventiellt (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Strömningsstabilitet:**Fixat "hasValuableContent" som returnerar "odefinierat" för tomma bitar i SSE-strömmar (#676). -**Verktygsanrop:**Fixade ett problem i `sseParser.ts` där icke-strömmande Claude-svar med flera verktygsanrop släppte "id" för efterföljande verktygsanrop på grund av felaktig indexbaserad deduplicering (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Verktygsnamn som `TodoWrite` har inte längre prefixet med `proxy_` i Claude passthrough-svar (både strömmande och icke-strömmande). Inkluderar enhetstesttäckning (PR #663 av @coobabm) -**Clear All Models Alias Cleanup**— "Rensa alla modeller"-knappen tar nu också bort associerade modellalias, vilket förhindrar spökmodeller i användargränssnittet (PR #664 av @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Rate-begränsade konton återställs nu automatiskt när deras nedkylningsperiod löper ut, vilket fixar ett dödläge där höga "backoffLevel" permanent deprioriterade konton (PR #657 av @brendandebeasi)### 🌍 i18n

-**Kinesisk översättningsöversyn**— Omfattande omskrivning av `zh-CN.json` med förbättrad noggrannhet (PR #658 av @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**— Explicit "ström: true" i förfrågans text har nu prioritet över "Acceptera: application/json" header. Klienter som skickar båda får korrekt SSE-strömningssvar (#656)### 🌍 i18n

-**Tjeckiska strängförbättringar**— Förfinad terminologi över `cs.json` (PR #655 av @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 saknade översättningsnycklar**har lagts till i `en.json` och 12 språk (PR #652 av @zen0bit) -**Tjeckisk dokumentation uppdaterad**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guider (PR #652) -**Översättningsvalideringsskript**— `check_translations.py` och `validate_translation.py` för CI/QA (PR #651 av @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritisk: Verktygsanropsregression**— Fixade `proxy_Bash`-fel genom att inaktivera verktygsnamnsprefixet `proxy_` i Claude passthrough-sökvägen. Verktyg som "Bash", "Read", "Write" döptes om till "proxy_Bash", "proxy_Read", etc., vilket fick Claude att avvisa dem (#618) -**Kiro Account Ban Documentation**— Dokumenterad som uppströms AWS anti-bedrägeri falsk positiv, inte ett OmniRoute-problem (#649)### 🧪 Tests

-**936 tester, 0 misslyckanden**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Vision Capability Metadata**: Lade till `capabilities.vision`, `input_modalities` och `output_modalities` till `/v1/models` poster för vision-kapabla modeller (PR #646) -**Gemini 3.1-modeller**: Lade till `gemini-3.1-pro-preview` och `gemini-3.1-flash-lite-preview` till Antigravity-leverantören (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-fel**: Fixade felaktig API-basadress – ändrad från `api.ollama.com` till officiell `ollama.com/v1/chat/completions` (#643) -**Expired Token Rery**: Lade till begränsat försök med exponentiell backoff (5→10→20 min) för utgångna OAuth-anslutningar istället för att permanent hoppa över dem (PR #647)### 🧪 Tests

-**936 tester, 0 misslyckanden**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub-problemmallar**: Lade till standardiserade buggrapporter, funktionsbegäranden och konfigurations-/proxyproblemmallar (#641) -**Rensa alla modeller**: Lade till en "Rensa alla modeller"-knapp på leverantörens detaljsida med i18n-stöd på 29 språk (#634)### 🐛 Bug Fixes

-**Local Conflict (`in.json`)**: Bytte namn på Hindi locale-filen från 'in.json' (indonesisk ISO-kod) till 'hi.json' för att fixa översättningskonflikter i Weblate (#642) -**Codex Empty Tool Names**: Flyttade sanering av verktygsnamn före den ursprungliga Codex-genomgången, åtgärdade 400 fel från uppströmsleverantörer när verktyg hade tomma namn (#637) -**Streaming Newline Artifacts**: Lade till "collapseExcessiveNewlines" till responsdesinfektionsmedlet, kollapsade serier av 3+ på varandra följande nyrader från tänkande modeller till en standard dubbel nylinje (#638) -**Claude Reasoning Effort**: Konverterade OpenAI `reasoning_effort`-param till Claudes inbyggda "tänkebudget" över alla begärandevägar, inklusive automatisk "max_tokens"-justering (#627) -**Qwen Token Refresh**: Implementerade proaktiva OAuth-token-uppdateringar före utgången (5 minuters buffert) för att förhindra att förfrågningar misslyckas när kortlivade tokens används (#631)### 🧪 Tests

-**936 tester, 0 misslyckanden**(+10 tester sedan 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-tokens i Claude Code / klientsvar (#617):**

- `sanitizeUsage()` korsar nu `input_tokens`→`prompt_tokens` och `output_tokens`→`completion_tokens` före vitlistafiltret, och fixar svar som visar NaN/0-tokental när leverantörer returnerar Claude-liknande användningsfältnamn### Säkerhet

- Uppdaterat "yaml"-paket för att åtgärda sårbarheten för stackoverflow (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Stängd #613 (Codestral — löst med anpassad leverantörslösning)
- Kommenterade #615 (OpenCode dual-endpoint — lösning tillhandahålls, spåras som funktionsbegäran)
- Kommenterade #618 (verktygssamtalssynlighet — begär v3.0.9-test)
- Kommenterade #627 (ansträngningsnivå — stöds redan)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Översättningsfel för OpenAI-formatleverantörer i Claude CLI (#632):**

- Hantera "reasoning_details[]" arrayformat från StepFun/OpenRouter - konverterar till "reasoning_content".
- Hantera "reasoning"-fältalias från vissa leverantörer → normaliserat till "reasoning_content"
- Fältnamn för korskartanvändning: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` i `filterUsageForFormat`
- Fixa `extractUsage` för att acceptera både `input_tokens`/`output_tokens` och `prompt_tokens`/`completion_tokens` som giltiga användningsfält
- Tillämpas på både strömmande (`sanitizeStreamingChunk`, `openai-to-claude.ts`-översättare) och icke-strömmande (`sanitizeMessage`) sökvägar---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Fixat felet "client_secret is missing" för npm-installerade användare - "clientSecretDefault" var tomt i providerRegistry, vilket fick Google att avvisa begäranden om tokenuppdatering (#588) -**OpenCode Zen-modeller:**Lade till `modelsUrl` till OpenCode Zen-registerposten så att "Importera från /models" fungerar korrekt (#612) -**Strömmande artefakter:**Fixade överdrivna rader kvar i svaren efter strippning av thinking-tagsignatur (#626) -**Proxy Fallback:**Lade till automatiskt försök igen utan proxy när SOCKS5-reläet misslyckas -**Proxytest:**Testslutpunkten löser nu riktiga referenser från DB via proxyId### ✨ New Features

-**Lekplatskonto/nyckelväljare:**Beständig, alltid synlig rullgardinsmeny för att välja specifika leverantörskonton/nycklar för testning - hämtar alla anslutningar vid start och filtrerar efter vald leverantör -**CLI Tools Dynamic Models:**Modellval hämtar nu dynamiskt från `/v1/models` API — leverantörer som Kiro visar nu sin fullständiga modellkatalog -**Antigravity Model List:**Uppdaterad med Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; aktiverade "passthroughModels" för dynamisk modellåtkomst (#628)### 🔧 Maintenance

- Merged PR #625 — Provider begränsar ljuslägesbakgrundsfix---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Begränsningar/Proxy:**Fast Codex-gränshämtning för konton bakom SOCKS5-proxyer – tokenuppdatering körs nu i proxykontext -**CI:**Fixat integrationstest "v1/modeller" påstående fel i CI-miljöer utan leverantörsanslutningar -**Inställningar:**Proxytestknappen visar nu resultat/misslyckande resultat omedelbart (tidigare gömd bakom hälsodata)### ✨ New Features

-**Lekplats:**Tillagd rullgardinsmeny för kontoväljare - testa specifika anslutningar individuellt när en leverantör har flera konton### 🔧 Maintenance

- Sammanfogad PR #623 — LongCat API-basadresskorrigering---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Lade till tagggrupperingsfunktion i anslutningsinstrumentpanelen för att förbättra den visuella organisationen för konton med anpassade taggar.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Fixat "TextDecoder"-tillståndskorruption i kombinationen "sanitize" TransformStream som orsakade SSE-förvrängd utdata som matchade multibyte-tecken (PR #614) -**Providers UI:**Säkert återge HTML-taggar inuti leverantörens anslutningsfel verktygstips med hjälp av `dangerouslySetInnerHTML` -**Proxyinställningar:**Lade till saknade `användarnamn` och `lösenord` egenskaper för nyttolastkroppen som gör att autentiserade proxyservrar kan verifieras från instrumentpanelen. -**Provider API:**Bundet mjukt undantag återgår till "getCodexUsage" och förhindrar API HTTP 500-fel när tokenhämtningen misslyckas---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Auto-Sync-modeller:**Lade till en UI-växling och 'sync-models'-slutpunkt för att automatiskt synkronisera modelllistor per leverantör med hjälp av en schemalagd intervallschemaläggare (PR #597)### 🐛 Bug Fixes

-**Timeouts:**Förhöjda standardproxies `FETCH_TIMEOUT_MS` och `STREAM_IDLE_TIMEOUT_MS` till 10 minuter för att korrekt stödja modeller för djupgående resonemang (som o1) utan att avbryta förfrågningar (fixar #609) -**CLI Tool Detection:**Förbättrad plattformsoberoende detektering som hanterar NVM-sökvägar, Windows `PATHEXT` (förhindrar problem med `.cmd` wrappers) och anpassade NPM-prefix (PR #598) -**Strömmande loggar:**Implementerade delta-ackumulering av "verktygssamtal" i strömmande svarsloggar så att funktionsanrop spåras och kvarstår exakt i DB (PR #603) -**Modellkatalog:**Ta bort autentiseringsundantag, döljer "comfyui"- och "sdwebui"-modeller korrekt när ingen leverantör är explicit konfigurerad (PR #599)### 🌐 Translations

-**cs:**Förbättrade tjeckiska översättningssträngar i appen (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Lade till ett tagg/gruppfält till `EditConnectionModal` (lagrat i `providerSpecificData.tag`) utan att behöva migrera DB-schema.
- Anslutningar i leverantörsvyn grupperas nu dynamiskt efter tagg med visuella avdelare.
- Otaggade anslutningar visas först utan rubrik, följt av taggade grupper i alfabetisk ordning.
- Tagggrupperingen gäller automatiskt för Codex/Copilot/Antigravity Limits-sektionen eftersom växlar finns i anslutningsrader.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Brickor saknas på anslutningskort:**Fixat genom att använda `resolveProxyForConnection()` snarare än statisk mappning. -**Testanslutningen avaktiverad i sparat läge:**Aktiverade knappen Test genom att lösa proxykonfigurationen från den sparade listan. -**Config Modal freezing:**Lade till `onClose()`-anrop efter spara/rensa för att förhindra att användargränssnittet fryser. -**Dubbel användningsräkning:**`ProxyRegistryManager` laddar nu användning ivrigt vid montering med deduplicering av `scope` + `scopeId`. Användningsantal ersattes med en testknapp som visar IP/latency inline.#### fix(translator): `function_call` prefix stripping

- Reparerade en ofullständig fix från PR #607 där bara `tool_use`-block tog bort Claudes `proxy_`-verktygsprefix. Nu kommer klienter som använder OpenAI Responses API-format också korrekt att få verktygsverktyg utan prefixet `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tre kritiska regressioner som rapporterats av användare efter v3.0.0-lanseringen har lösts.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Prefixet "proxy\_" som lagts till av Claude OAuth togs endast bort från**streaming**-svar. I läget**icke-strömmande**hade `translateNonStreamingResponse` ingen åtkomst till `toolNameMap`, vilket gjorde att klienter fick manipulerade verktygsnamn som `proxy_read_file` istället för `read_file`.

**Fix:**Lade till valfri `toolNameMap`-parameter till `translateNonStreamingResponse` och tillämpade prefixstrippning i Claude `tool_use`-blockhanteraren. `chatCore.ts` passerar nu kartan.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI exponerar inte `GET /v1/models`. Den generiska `validateOpenAICompatibleProvider`-validatorn gick igenom till en reserv för chatt-slutföranden endast om `validationModelId` var inställd, vilket LongCat inte konfigurerar. Detta gjorde att leverantörsvalideringen misslyckades med ett missvisande fel vid lägg till/spara.

**Fix:**Lade till "longcat" på kartan för specialitetsvalidering, undersökte "/chat/kompletteringar" direkt och behandlade alla icke-auth-svar som ett pass.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-verktyg (t.ex. `pencil`, `computer_use`) vidarebefordrar verktygsdefinitioner med `{typ:"objekt"}` men utan ett `egenskaper`-fält. Anthropics API avvisar dessa med: `objektschema saknar egenskaper`.

**Fix:**I `openai-to-claude.ts`, injicera `egenskaper: {}` som en säker standard när `typ` är `"objekt"` och `egenskaper` saknas.---

### 🔀 Community PRs Merged (2)

| PR       | Författare | Sammanfattning                                                              |
| -------- | ---------- | --------------------------------------------------------------------------- | --- |
| **#589** | @flobo3    | docs(i18n): fixa rysk översättning för Playground och Testbed               |
| **#591** | @rdself    | fix(ui): förbättra Provider begränsar ljuslägeskontrast och plannivåvisning | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 tester, 0 misslyckanden**(oförändrad från v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Den största utgåvan någonsin.**Från 36 leverantörer i v2.9.5 till**67+ leverantörer**i v3.0.0 — med MCP-server, A2A-protokoll, automatisk kombinationsmotor, leverantörsikoner, API för registrerade nycklar, 926 tester och bidrag från**12 communitymedlemmar**över\*\*10 sammanslagna PR:er.
>
> Konsoliderat från v3.0.0-rc.1 till rc.17 (17 releasekandidater under 3 dagars intensiv utveckling).---

### 🆕 New Providers (+31 since v2.9.5)

| Leverantör                    | Alias ​​        | Nivå      | Anteckningar                                                                            |
| ----------------------------- | --------------- | --------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | Gratis    | 3 modeller via `opencode.ai/zen/v1` (PR #530 av @kang-heewon)                           |
| **OpenCode Go**               | `opencode-go`   | Betald    | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 av @kang-heewon)                        |
| **LongCat AI**                | `lc`            | Gratis    | 50 miljoner tokens/dag (Flash-Lite) + 500 000/dag (chatt/tänkande) under offentlig beta |
| **Pollinationer AI**          | `pol`           | Gratis    | Ingen API-nyckel behövs — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)       |
| **Cloudflare Workers AI**     | `cf`            | Gratis    | 10K neuroner/dag — ~150 LLM-svar eller 500s Whisper-ljud, kantslutning                  |
| **Scaleway AI**               | `scw`           | Gratis    | 1 miljoner gratis tokens för nya konton – EU/GDPR-kompatibel (Paris)                    |
| **AI/ML API**                 | `mål`           | Gratis    | 0,025 $/dag gratis krediter — 200+ modeller via en enda slutpunkt                       |
| **Puter AI**                  | `pu`            | Gratis    | 500+ modeller (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                 |
| **Alibaba Cloud (DashScope)** | `ali`           | Betald    | Internationella + Kina slutpunkter via `alicode`/`alicode-intl`                         |
| **Alibabas kodningsplan**     | `bcp`           | Betald    | Alibaba Model Studio med Anthropic-kompatibelt API                                      |
| **Kimi-kodning (API-nyckel)** | `kmca`          | Betald    | Dedikerad API-nyckelbaserad Kimi-åtkomst (separat från OAuth)                           |
| **MiniMax-kodning**           | `minimax`       | Betald    | Internationell slutpunkt                                                                |
| **MiniMax (Kina)**            | `minimax-cn`    | Betald    | Kina-specifik slutpunkt                                                                 |
| **Z.AI (GLM-5)**              | `zai`           | Betald    | Zhipu AI nästa generations GLM-modeller                                                 |
| **Vertex AI**                 | `vertex`        | Betald    | Google Cloud — Service Account JSON eller OAuth access_token                            |
| **Ollama Cloud**              | `ollamacloud`   | Betald    | Ollamas värdbaserade API-tjänst                                                         |
| **Syntet**                    | `syntetisk`     | Betald    | Passthrough-modeller gateway                                                            |
| **Kilo Gateway**              | `kg`            | Betald    | Passthrough-modeller gateway                                                            |
| **Perplexity Search**         | `pplx-sök`      | Betald    | Dedikerad sökgrundad slutpunkt                                                          |
| **Serpersökning**             | `serper-search` | Betald    | Webbsökning API-integration                                                             |
| **Modigt sökande**            | `brave-search`  | Betald    | Brave Search API-integration                                                            |
| **Exa Search**                | `exa-search`    | Betald    | Neural sökning API-integration                                                          |
| **Tavily-sökning**            | `tavily-search` | Betald    | AI-sökning API-integration                                                              |
| **NanoBanana**                | `nb`            | Betald    | Bildgenererings-API                                                                     |
| **ElevenLabs**                | `el`            | Betald    | Text-till-tal röstsyntes                                                                |
| **Cartesia**                  | `cartesia`      | Betald    | Ultrasnabb TTS-röstsyntes                                                               |
| **PlayHT**                    | `playht`        | Betald    | Röstkloning och TTS                                                                     |
| **Inworld**                   | `inworld`       | Betald    | AI karaktär röstchatt                                                                   |
| **SD WebUI**                  | `sdwebui`       | Egen värd | Stabil Diffusion lokal bildgenerering                                                   |
| **ComfyUI**                   | `comfyui`       | Egen värd | ComfyUI lokalt arbetsflöde nod-baserad generering                                       |
| **GLM-kodning**               | `glm`           | Betald    | BigModel/Zhipu kodningsspecifik slutpunkt                                               | **Totalt: 67+ leverantörer**(4 gratis, 8 OAuth, 55 API-nyckel) + obegränsade OpenAI/Anthropic-kompatibla anpassade leverantörer.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerera och utfärda OmniRoute API-nycklar programmatiskt med kvottillämpning per leverantör och per konto.

| Slutpunkt                       | Metod        | Beskrivning                                             |
| ------------------------------- | ------------ | ------------------------------------------------------- |
| `/api/v1/registered-keys`       | `POST`       | Ge en ny nyckel — rånyckel returneras**endast en gång** |
| `/api/v1/registered-keys`       | `GET`        | Lista registrerade nycklar (maskerade)                  |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Hämta metadata / Återkalla                              |
| `/api/v1/quotas/check`          | `GET`        | Förvalidera kvoten innan den utfärdas                   |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Konfigurera emissionsgränser per leverantör             |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Konfigurera utgivningsgränser per konto                 |
| `/api/v1/problem/rapport`       | `POST`       | Rapportera kvothändelser till GitHub Issues             |

**Säkerhet:**Nycklar lagrade som SHA-256-hashar. Rånyckel visas en gång vid skapandet, kan aldrig hämtas igen.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ leverantörslogotyper som använder "@lobehub/icons" React-komponenter (SVG). Reservkedja:**Lobehub SVG → befintlig PNG → generisk ikon**. Tillämpas på instrumentpanel, leverantörer och agentsidor med standardiserad "ProviderIcon"-komponent.#### 🔄 Model Auto-Sync Scheduler (#488)

Uppdaterar automatiskt modelllistor för anslutna leverantörer var**24:e timme**. Körs vid serverstart. Konfigurerbar via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Kartlägg modellnamnsmönster (glob) till specifika kombinationer för automatisk routing:

- `claude-sonnet*` → kodkombination, `gpt-4o*` → openai-kombo, `gemini-*` → google-kombo
- Ny "model_combo_mappings"-tabell med glob-to-regex-matchning
- Sektion för instrumentpanelens användargränssnitt: "Model Routing Rules" med inline add/edit/toggle/delete#### 🧭 API Endpoints Dashboard

Interaktiv katalog, webhooks-hantering, OpenAPI-visning – allt i en fliksida på `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nya sökleverantörsintegrationer:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— möjliggör jordade AI-svar med webbdata i realtid.#### 📊 Search Analytics

Ny flik i `/dashboard/analytics` — leverantörsuppdelning, cacheträfffrekvens, kostnadsspårning. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Kolumnerna "max_requests_per_day" och "max_requests_per_minute" med skjutfönster i minnet som returnerar HTTP 429.#### 🎵 Media Playground

Full mediegenereringslekplats på `/dashboard/media`: bildgenerering, video, musik, ljudtranskription (2 GB uppladdningsgräns) och text-till-tal.---

### 🔒 Security & CI/CD

-**CodeQL-sanering**— Fixade 10+ varningar: 6 polynom-redos, 1 osäker-slumpmässighet (`Math.random()` → `crypto.randomUUID()`), 1 skal-kommando-injektion -**Ruttvalidering**— Zod-scheman + 'validateBody()' på**176/176 API-rutter**— CI tillämpas -**CVE fix**— dompurify XSS sårbarhet (GHSA-v2wj-7wpq-c8vv) löst via npm åsidosättningar -**Platad**— Bumped 3.3.3 → 3.4.2 (CWE-1321 prototyp föroreningar) -**Docker**— Uppgraderad `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: radera åtgärdsfel när "GEMINI_OAUTH_CLIENT_SECRET" saknas i Docker -**#549**— CLI-inställningar rutter löser nu riktig API-nyckel från `keyId` (inte maskerade strängar) -**#574**— Inloggningen låser sig inte längre efter att ha hoppat över lösenordskonfigurationen för guiden -**#506**— Cross-platform `machineId` omskriven (Windows REG.exe → macOS ioreg → Linux → värdnamn reserv)#### Providers & Routing

-**#536**— LongCat AI: fast "baseUrl" och "authHeader" -**#535**— Åsidosatt modell av fästad modell: 'body.model' är korrekt inställd på 'pinnedModel' -**#570**— Claude-modeller utan prefix löser sig nu till antropisk leverantör -**#585**— `<omniModel>` interna taggar läcker inte längre till klienter i SSE-strömning -**#493**— Namngivning av anpassad leverantörsmodell försämras inte längre av prefixstrippning -**#490**— Strömmande + kontextcacheskydd via 'TransformStream'-injektion -**#511**— `<omniModel>`-taggen injicerad i den första innehållsdelen (inte efter `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + Codex loop: "tool_result"-block nu konverterade till text -**#524**— OpenCode-konfigurationen sparad korrekt (XDG_CONFIG_HOME, TOML-format) -**#522**— API Manager: tog bort den missvisande knappen "Kopiera maskerad nyckel". -**#546**— `--version` returnerar "okänt" på Windows (PR av @k0valik) -**#544**— Säker CLI-verktygsdetektering via kända installationsvägar (PR av @k0valik) -**#510**— Windows MSYS2/Git-Bash-sökvägar normaliserades automatiskt -**#492**— CLI upptäcker `mise`/`nvm`-hanterad nod när `app/server.js` saknas#### Streaming & SSE

-**PR #587**— Återställ importen av `resolveDataDir` i responsesTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Flaskhals 429 oändlig väntan: släpp väntande jobb på gränsen (@xandr0s) -**#483**— Stoppa efterföljande `data: null` efter `[DONE]`-signal -**#473**— Zombie SSE-strömmar: timeout reducerad 300s → 120s för snabbare reserv#### Media & Transcription

-**Transkription**— Deepgram `video/mp4` → `audio/mp4` MIME-mappning, automatisk språkdetektering, interpunktion -**TTS**— "[object Object]" felvisning fixerad för kapslade fel i ElevenLabs-stil -**Uppladdningsgränser**— Mediatranskription ökade till 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— kolumnen "begärd_modell" i samtalsloggar (migrering 009) -**T02**— Ta bort tomma textblock från kapslade `tool_result.content` -**T03**— Analysera "x-codex-5h-_" / "x-codex-7d-_" kvotrubriker -**T04**— 'X-Session-Id'-huvud för extern sticky routing -**T05**— Rate-limit DB persistens med dedikerad API -**T06**— Kontot avaktiverat → permanent blockering (1-års nedkylning) -**T07**— X-Forwarded-For IP-validering (`extractClientIp()`) -**T08**— Sessionsgränser per API-nyckel med skjutfönster -**T09**— Codex vs Spark rate-limit omfattningar (separata pooler) -**T10**— Krediter förbrukade → distinkt 1h nedkylningsfallback -**T11**— "max" resonemang → 131072 budgettokens -**T12**— MiniMax M2.7 prisuppgifter -**T13**— Inaktuell kvotvisningsfix (återställ fönstermedvetenhet) -**T14**— Proxy fast-fail TCP-kontroll (≤2s, cachad 30s) -**T15**— Normalisering av matrisinnehåll för Anthropic -**T23**— Intelligent kvotåterställning fallback (huvudextraktion) -**T24**— '503' nedkylning + '406' mappning -**T25**— Providervalidering reserv -**T29**— Vertex AI Service Account JWT auth -**T33**— Tankenivå till budgetkonvertering -**T36**— '403' vs '429' felklassificering -**T38**— Centraliserade modellspecifikationer (`modelSpecs.ts`) -**T39**— Endpoint fallback för "fetchAvailableModels". -**T41**— Automatisk omdirigering av bakgrundsuppgifter till flashmodeller -**T42**— Mappning av bildförhållande#### Other Improvements

-**Per-modell uppströms anpassade rubriker**— via konfigurationsgränssnitt (PR #575 av @zhangqiang8vip) -**Modelkontextlängd**— konfigurerbar i modellmetadata (PR #578 av @hijak) -**Trivning av modellprefix**— alternativ för att ta bort leverantörsprefix från modellnamn (PR #582 av @jay77721) -**Utfasad Gemini CLI**— markerad som utfasad med Google OAuth-begränsningsvarning -**YAML-parser**— ersatte anpassad parser med `js-yaml` för korrekt OpenAPI-specifik analys -**ZWS v5**— HMR-läckagefix (485 DB-anslutningar → 1, minne 2,4 GB → 195 MB) -**Loggexport**— Ny JSON-exportknapp på instrumentpanelen med rullgardinsmeny för tidsintervall -**Uppdatera meddelandebanner**— instrumentpanelens hemsida visar när nya versioner är tillgängliga---

### 🌐 i18n & Documentation

-**30 språk**med 100 % paritet — 2 788 saknade nycklar synkroniserade -**tjeckiska**— Fullständig översättning: 22 dokument, 2 606 UI-strängar (PR av @zen0bit) -**Kinesiska (zh-CN)**— Komplett omöversättning (PR av @only4copilot) -**VM Deployment Guide**— Översatt till engelska som källdokument -**API-referens**— Lade till "/v1/inbäddningar" och "/v1/audio/speech" slutpunkter -**Antal leverantörer**— Uppdaterad från 36+/40+/44+ till**67+**över README och alla 30 i18n READMEs---

### 🔀 Community PRs Merged (10)

| PR       | Författare      | Sammanfattning                                                          |
| -------- | --------------- | ----------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): återställ resolveDataDir-import för Cloudflare Workers-kompat |
| **#582** | @jay77721       | feat(proxy): modellnamn prefix stripping option                         |
| **#581** | @jay77721       | fix(npm): länka elektron-release till npm-publish arbetsflöde           |
| **#578** | @hijak          | feat: konfigurerbar kontextlängd i modellens metadata                   |
| **#575** | @zhangqiang8vip | feat: per-modell uppströms headers, compat PATCH, chattjustering        |
| **#562** | @coobabm        | fix: MCP-sessionshantering, Claude passthrough, detectFormat            |
| **#561** | @zen0bit        | fix(i18n): tjeckiska översättningskorrigeringar                         |
| **#555** | @k0valik        | fix(sse): centraliserad `resolveDataDir()` för sökvägsupplösning        |
| **#546** | @k0valik        | fix(cli): `--version` returnerar `okänt` på Windows                     |
| **#544** | @k0valik        | fix(cli): säker CLI-verktygsdetektering via installationsvägar          |
| **#542** | @rdself         | fix(ui): ljusläge kontrast CSS-temavariabler                            |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go-leverantörer med `OpencodeExecutor`             |
| **#512** | @zhangqiang8vip | feat: modellkompatibilitet per protokoll (`compatByProtocol`)           |
| **#497** | @zhangqiang8vip | fix: dev-mode HMR-resursläckor (ZWS v5)                                 |
| **#495** | @xandr0s        | fix: Flaskhals 429 oändlig väntan (drop waiting jobs)                   |
| **#494** | @zhangqiang8vip | feat: MiniMax-utvecklare→systemrollfix                                  |
| **#480** | @prakersh       | fix: utvinning av strömspolning                                         |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 och antropiska prissättningar                       |
| **#475** | @only4copilot   | feat(i18n): förbättrad kinesisk översättning                            |

**Tack till alla bidragsgivare!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` ``#492`# 5063` `#492`# 5063` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` ``#537`# 5461` `#537`# 5461` `#570` `#574` `#585`---

### 🧪 Tests

-**926 tester, 0 misslyckanden**(upp från 821 i v2.9.5)

- +105 nya tester som täcker: modellkombinationsmappningar, registrerade nycklar, OpencodeExecutor, Bailian-leverantör, ruttvalidering, felklassificering, bildförhållandemappning och mer---

### 📦 Database Migrations

| Migration | Beskrivning                                                             |
| --------- | ----------------------------------------------------------------------- | --- |
| **008**   | Tabeller `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**   | kolumnen `requested_model` i `call_logs`                                |
| **010**   | Tabell `model_combo_mappings` för kombinationsrutt per modell           | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Brossande ändringar:**Inga. Alla befintliga konfigurationer, kombinationer och API-nycklar bevaras.
> Databasmigrering 008-010 körs automatiskt vid uppstart.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL-sanering**— Fixade 10+ varningar:

- 6 polynom-redos i `provider.ts` / `chatCore.ts` (ersatte `(?:^|/)` alterneringsmönster med segmentbaserad matchning)
- 1 osäker-slumpmässighet i `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 skal-kommando-injektion i `prepublish.mjs` (`JSON.stringify()`-sökväg escapes) -**Ruttvalidering**— Lade till Zod-scheman + `validateBody()` till 5 rutter som saknar validering:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` passerar nu:**176/176 rutter validerade**### 🐛 Bug Fixes

-**#585**— `<omniModel>` interna taggar läcker inte längre till klienter i SSE-svar. Lade till "TransformStream" för utgående sanering i "combo.ts".### ⚙️ Infrastructure

-**Docker**— Uppgraderad "docker/setup-buildx-action" från v3 → v4 (fix för utfasning av Node.js 20) -**CI-rensning**— Raderade 150+ misslyckade/avbrutna arbetsflödeskörningar### 🧪 Tests

- Testsvit:**926 tester, 0 misslyckanden**(+3 nya)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Ökade gränser för mediatranskription
- Lade till modellkontextlängd till registermetadata
- Lade till per modell uppströms anpassade rubriker via konfigurationsgränssnittet
- Fixat flera buggar, Zod-validering för patchar och löst olika communityproblem.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Combo Routing per modell: mappa modellnamnsmönster (glob) till specifika kombinationer för automatisk routing

- Ny "model_combo_mappings"-tabell (migrering 010) med mönster, combo_id, priority, aktiverat
- `resolveComboForModel()` DB-funktion med glob-to-regex-matchning (skiftlägeskänslig, `*` och `?` jokertecken)
- `getComboForModel()` i `model.ts`: utökar `getCombo()` med modellmönster som reserv
- `chat.ts`: routingbeslut kontrollerar nu modellkombinationsmappningar innan enstaka modellhantering
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: avsnittet "Model Routing Rules" har lagts till på Combos-sidan med inline add/edit/toggle/delete
- Exempel: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Full i18n Sync**: 2 788 saknade nycklar har lagts till i 30 språkfiler — alla språk nu med 100 % paritet med "en.json" -**Agentsidan i18n**: OpenCode-integrationssektionen helt internationaliserad (titel, beskrivning, skanning, nedladdningsetiketter) -**6 nya nycklar**har lagts till i `agents` namnutrymme för OpenCode-sektionen### 🎨 UI/UX

-**Provider Icons**: 16 saknade leverantörsikoner har lagts till (3 kopierade, 2 nedladdade, 11 SVG skapade) -**SVG reserv**: `ProviderIcon`-komponent uppdaterad med 4-nivåstrategi: Lobehub → PNG → SVG → Generisk ikon -**Fingeravtryck av agenter**: Synkroniserat med CLI-verktyg — lagt till droid, openclaw, copilot, opencode till fingeravtryckslistan (14 totalt)### Säkerhet

-**CVE-fix**: Löst dompurify XSS-sårbarhet (GHSA-v2wj-7wpq-c8vv) via npm åsidosätter som tvingar `dompurify@^3.3.2`

- `npm audit` rapporterar nu**0 sårbarheter**### 🧪 Tests

- Testsvit:**923 tester, 0 misslyckanden**(+15 nya modell-kombimappningstester)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Författare | Sammanfattning                                                                                   |
| -------- | ---------- | ------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm   | fix(ux): MCP-sessionshantering, Claude passthrough-normalisering, OAuth-modal, detectFormat      |
| **#561** | @zen0bit   | fix(i18n): tjeckiska översättningskorrigeringar — HTTP-metodnamn och dokumentationsuppdateringar | ### 🧪 Tests |

- Testsvit:**908 tester, 0 misslyckanden**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**löser riktig API-nyckel från `keyId` i CLI-inställningar (`codex-inställningar`, `droid-inställningar`, `kilo-inställningar`) för att förhindra att maskerade strängar skriver (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Författare | Sammanfattning                                                                                                                                                          |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik   | fix(cli): `--version` returnerar `unknown` på Windows — använd `JSON.parse(readFileSync)` istället för ESM-import                                                       |
| **#555** | @k0valik   | fix(sse): centraliserad `resolveDataDir()` för sökvägsupplösning i referenser, autoCombo, svarslogger och begärandelogger                                               |
| **#544** | @k0valik   | fix(cli): säker CLI-verktygsdetektering via kända installationsvägar (8 verktyg) med symlinkvalidering, filtypskontroller, storleksgränser, minimal env i hälsokontroll |
| **#542** | @rdself    | fix(ui): förbättra ljuslägeskontrasten — lägg till saknade CSS-temavariabler (`bg-primary`, `bg-subtle`, `text-primary`) och fixa endast mörka färger i loggdetaljer    | ### 🔧 Bug Fixes |

-**TDZ fix i `cliRuntime.ts`**— `validateEnvPath` användes före initialisering vid modulstart av `getExpectedParentPaths()`. Omordnade deklarationer för att fixa "ReferenceError". -**Byggfixar**— Lade till `pino` och `pino-pretty` till `serverExternalPackages` för att förhindra Turbopack från att bryta Pinos interna arbetarladdning.### 🧪 Tests

- Testsvit:**905 tester, 0 misslyckanden**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron build-regression: nedgraderad Next.js från `16.1.x` till `16.0.10` för att eliminera Turbopack-modul-hashing-instabilitet som orsakade tomma skärmar i Electron-skrivbordspaketet. -**Enhetstestfixar**— Rättade två inaktuella testpåståenden (`nanobanana-image-handler` bildförhållande/upplösning, `thinking-budget` Gemini `thinkingConfig`-fältmappning) som hade avvikit efter senaste implementeringsändringar. -**#541**— Svarade på användarfeedback om installationens komplexitet; inga kodändringar krävs.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementerad med hjälp av "jose"-biblioteket för att hantera JWT/Service Account auth, tillsammans med konfigurerbara regioner i UI och automatisk URL-byggnad för partnermodell. -**T42**— Bildgenererande bildförhållandemappning: skapade `sizeMapper`-logik för generiska OpenAI-format (`size`), lade till inbyggd `imagen3`-hantering och uppdaterade NanoBanana-slutpunkter för att använda mappade bildförhållanden automatiskt. -**T38**— Centraliserade modellspecifikationer: `modelSpecs.ts` skapade för gränser och parametrar per modell.### 🔧 Improvements

-**T40**— OpenCode CLI-verktygsintegration: inbyggd "opencode-zen" och "opencode-go"-integration slutförd i tidigare PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` nedkylning väntar på fix + `406` mappning: mappade `406 Not Acceptable` till `503 Service Unavailable` med korrekta nedkylningsintervall. -**T25**— Providervalidering fallback: elegant fallback till standardvalideringsmodeller när ett specifikt `validationModelId` inte finns. -**T36**— `403` vs `429` leverantörshanteringsförfining: extraherad till `errorClassifier.ts` för att korrekt separera hårda behörighetsfel (`403`) från hastighetsgränser (`429`). -**T39**— Endpoint Fallback för `fetchAvailableModels`: implementerade en tri-tier-mekanism (`/models` -> `/v1/models` -> lokal generisk katalog) + `list_models_catalog` MCP-verktygsuppdateringar för att återspegla `källa` och `varning`. -**T33**— Tänkenivå till budgetkonvertering: översätter kvalitativa tänkandenivåer till exakta budgettilldelningar. -**T41**— Automatisk omdirigering av bakgrundsuppgifter: dirigerar tunga bakgrundsutvärderingsuppgifter till flash-/effektiva modeller automatiskt. -**T23**— Intelligent kvotåterställning fallback: extraherar exakt "x-ratelimit-reset" / "retry-after" huvudvärden eller kartlägger statiska nedkylningar.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Uppgradering från v2.9.5:**16 problem lösta · 2 community-PRs sammanslagna · 2 nya leverantörer · 7 nya API-slutpunkter · 3 nya funktioner · DB-migrering 008+009 · 832 tester klarade · 15 sub2api gap-förbättringar (T01–T15 komplett).### 🆕 New Providers

| Leverantör       | Alias ​​       | Nivå   | Anteckningar                                                     |
| ---------------- | -------------- | ------ | ---------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratis | 3 modeller via `opencode.ai/zen/v1` (PR #530 av @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Betald | 4 modeller via `opencode.ai/zen/go/v1` (PR #530 av @kang-heewon) |

Båda leverantörerna använder den nya `OpencodeExecutor` med routing i flera format (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Autogenerera och utfärda OmniRoute API-nycklar programmatiskt med kvottillämpning per leverantör och per konto.

| Slutpunkt                             | Metod     | Beskrivning                                             |
| ------------------------------------- | --------- | ------------------------------------------------------- |
| `/api/v1/registered-keys`             | `POST`    | Ge en ny nyckel — rånyckel returneras**endast en gång** |
| `/api/v1/registered-keys`             | `GET`     | Lista registrerade nycklar (maskerade)                  |
| `/api/v1/registered-keys/{id}`        | `GET`     | Hämta nyckelmetadata                                    |
| `/api/v1/registered-keys/{id}`        | `RADERA`  | Återkalla en nyckel                                     |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Återkalla (för klienter utan DELETE-stöd)               |
| `/api/v1/quotas/check`                | `GET`     | Förvalidera kvoten innan den utfärdas                   |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Konfigurera emissionsgränser per leverantör             |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Konfigurera utgivningsgränser per konto                 |
| `/api/v1/problem/rapport`             | `POST`    | Rapportera kvothändelser till GitHub Issues             |

**DB — Migration 008:**Tre nya tabeller: `registrerade_nycklar`, `provider_key_limits`, `account_key_limits`.
**Säkerhet:**Nycklar lagrade som SHA-256-hashar. Rånyckel visas en gång vid skapandet, kan aldrig hämtas igen.
**Kvottyper:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per leverantör och per konto.
**Idempotens:**fältet `idempotency_key` förhindrar dubblettutgivning. Returnerar "409 IDEMPOTENCY_CONFLICT" om nyckeln redan användes.
**Budget per nyckel:**`dailyBudget` / `hourlyBudget` – begränsar hur många förfrågningar en nyckel kan dirigera per fönster.
**GitHub-rapportering:**Valfritt. Ställ in `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` för att automatiskt skapa GitHub-problem om kvoten överskridits eller utfärdande misslyckanden.#### 🎨 Provider Icons — @lobehub/icons (#529)

Alla leverantörsikoner i instrumentpanelen använder nu `@lobehub/icons` React-komponenter (130+ leverantörer med SVG).
Reservkedja:**Lobehub SVG → befintliga `/providers/{id}.png` → generisk ikon**. Använder ett korrekt React `ErrorBoundary`-mönster.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute uppdaterar nu automatiskt modelllistor för anslutna leverantörer var**24:e timme**.

- Körs vid serverstart via den befintliga `/api/sync/initialize`-kroken
- Konfigurerbar via miljövariabeln `MODEL_SYNC_INTERVAL_HOURS`
- Täcker 16 stora leverantörer
- Registrerar senaste synkroniseringstid i inställningsdatabasen---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Rensa ett åtgärdsfel när "GEMINI_OAUTH_CLIENT_SECRET" saknas i Docker/självhostade distributioner. Tidigare visade det kryptiska "client_secret is missing" från Google. Ger nu specifika instruktioner för `docker-compose.yml` och `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Fixat `baseUrl` (`api.longcat.chat/openai`) och `authHeader` (`Authorization: Bearer`). -**#535 — Pinned model override:**`body.model` är nu korrekt inställt på `pinnedModel` när kontextcacheskydd är aktivt. -**#532 — OpenCode Go-nyckelvalidering:**Använder nu `zen/v1`-testslutpunkten (`testKeyBaseUrl`) – samma nyckel fungerar för båda nivåerna.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**`tool_result`-block konverteras nu till text istället för att släppas, vilket stoppar oändliga verktygsresultatslingor. -**#524 — OpenCode config save:**Lade till `saveOpenCodeConfig()`-hanteraren (XDG_CONFIG_HOME medveten, skriver TOML). -**#521 — Inloggning fastnar:**Inloggningen låser sig inte längre efter att ha hoppat över lösenordsinställningarna — omdirigerar korrekt till onboarding. -**#522 — API Manager:**Tog bort den missvisande knappen "Kopiera maskerad nyckel" (ersatt med ett verktygstips för låsikonen). -**#532 — OpenCode Go config:**Guideinställningshanteraren hanterar nu `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Saknas "googleProjectId" returnerar ett strukturerat 422-fel med återanslutningsvägledning istället för en kryptisk krasch. -**#510 — Windows-sökvägar:**MSYS2/Git-Bash-sökvägar (`/c/Program Files/...`) normaliseras nu automatiskt till `C:\Program Files\...`. -**#492 — CLI-start:**`omniroute` CLI upptäcker nu `mise`/`nvm`-hanterade nod när `app/server.js` saknas och visar riktade fixinstruktioner.---

### 📖 Documentation Updates

-**#513**— Återställning av Docker-lösenord: `INITIAL_PASSWORD` env var lösning dokumenterad -**#520**— pnpm: "pnpm approve-builds better-sqlite3" steg dokumenterat---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Författare   | Sammanfattning                                                               |
| -------- | ------------ | ---------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go-leverantörer med `OpencodeExecutor` och förbättrade tester | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` i `providers.ts`. Den befintliga kolumnen "rate_limited_until" är nu exponerad som ett dedikerat API - OAuth-tokenuppdatering får INTE röra det här fältet för att förhindra hastighetsgränsslingor. -**T08**— Gräns ​​för session per API-nyckel: `max_sessions INTEGER DEFAULT 0` har lagts till i `api_keys` via automatisk migrering. `sessionManager.ts` får `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` och `getActiveSessionCountForKey()`. Uppringare i `chatCore.js` kan upprätthålla gränsen och minska på `req.close`. -**T09**— Codex vs Spark rate-limit scopes: `getCodexModelScope()` och `getCodexRateLimitKey()` i `codex.ts`. Standardmodeller (`gpt-5.x-codex`, `codex-mini`) får scope `"codex"`; sparkmodeller (`codex-spark*`) får omfattning `"gnista"`. Rate-limit-nycklar bör vara `${accountId}:${scope}` så att tömma en pool blockerar inte den andra. -**T13**— Inaktuell kvotvisningsfix: `getEffectiveQuotaUsage(used, resetAt)` returnerar `0` när återställningsfönstret har passerat; `formatResetCountdown(resetAt)` returnerar en läsbar nedräkningssträng (t.ex. "2h 35m"). Båda exporterade från `providers.ts` + `localDb.ts` för instrumentpanelskonsumtion. -**T14**— Proxy fast-fail: ny `src/lib/proxyHealth.ts` med `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP-kontroll, ≤2s istället för 30s timeout), `getCachedProxyHealth()`, `alth(invalidate)Proxy `getAllProxyHealthStatuses()`. Resultat cachade 30s som standard; konfigurerbar via `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testsvit:**832 tester, 0 misslyckanden**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— kolumnen `requested_model` i `call_logs` (migrering 009): spåra vilken modell klienten ursprungligen begärde kontra den faktiska routade modellen. Aktiverar analys av fallback rate. -**T02**— Ta bort tomma textblock från kapslade `tool_result.content`: förhindrar Anthropic 400-fel (`textinnehållsblock måste vara tomma`) när Claude Code chains-verktyget resulterar. -**T03**— Analysera `x-codex-5h-*` / `x-codex-7d-*` headers: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extrahera Codex-kvotfönster för exakt nedkylningsplanering istället för generisk 5-minuters reserv. -**T04**— `X-Session-Id`-huvud för extern sticky routing: `extractExternalSessionId()` i `sessionManager.ts` läser `x-session-id` / `x-omniroute-session`-rubriker med `ext:`-prefix för att undvika kollision med interna SHA-256-sessions-ID. Nginx-kompatibel (avstavningshuvud). -**T06**— Konto avaktiverat → permanent blockering: `isAccountDeactivated()` i `accountFallback.ts` upptäcker 401 inaktiveringssignaler och tillämpar en 1-års nedkylning för att förhindra att permanent döda konton återförsöks. -**T07**— X-Forwarded-For IP-validering: ny `src/lib/ipUtils.ts` med `extractClientIp()` och `getClientIpFromRequest()` - hoppar över `unknown`/icke-IP-poster i `X-Forwarded-For`-kedjor (Nginx/proxy-forwarded). -**T10**— Credits exhausted → distinct fallback: `isCreditsExhausted()` i `accountFallback.ts` returnerar 1 timmes nedkylning med flaggan "creditsExhausted", till skillnad från generisk 429 räntebegränsning. -**T11**— `max` resonemangsansträngning → 131072 budgettokens: `EFFORT_BUDGETS` och `THINKING_LEVEL_MAP` uppdaterade; omvänd mappning returnerar nu `"max"` för fullbudgetsvar. Enhetstest uppdaterat. -**T12**— MiniMax M2.7 prissättningsposter har lagts till: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` har lagts till i pristabellen (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi-priser fanns redan. -**T15**— Normalisering av matrisinnehåll: `normalizeContentToString()`-hjälparen i `openai-to-claude.ts` kollapsar korrekt arrayformaterade system-/verktygsmeddelanden till sträng innan de skickas till Anthropic.### 🧪 Tests

- Testsvit:**832 tester, 0 misslyckanden**(oförändrad från rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: automatiskt utfärda API-nycklar med kvottillämpning per leverantör och per konto

- `POST /api/v1/registered-keys` — utfärda nycklar med stöd för idempotens
- `GET /api/v1/registered-keys` — lista (maskerade) registrerade nycklar
- `GET /api/v1/registered-keys/{id}` — hämta nyckelmetadata
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — återkalla nycklar
- `GET /api/v1/quotas/check` — förvalidera innan du utfärdar
- `PUT /api/v1/providers/{id}/limits` — ställ in gränser för leverantörsutgivning
- `PUT /api/v1/accounts/{id}/limits` — ställ in gränser för kontoutgivning
- `POST /api/v1/issues/report` — valfri GitHub-problemrapportering
- DB-migrering 008: "registered_keys", "provider_key_limits", "account_key_limits" tabeller---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen- och OpenCode Go-leverantörer har lagts till (av @kang-heewon)

- Ny `OpencodeExecutor` med routing i flera format (`/chat/completions`, `/messages`, `/responses`)
- 7 modeller över båda nivåerna---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Leverantörsikoner använder nu [@lobehub/icons](https://github.com/lobehub/lobe-icons) med graciös PNG-backup och en "ProviderIcon"-komponent (130+ leverantörer stöds) -**#488**— Uppdatera modelllistor automatiskt var 24:e timme via `modelSyncScheduler` (konfigurerbar via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: visar nu ett tydligt åtgärdsfel när "GEMINI_OAUTH_CLIENT_SECRET" saknas i Docker-/självhostade distributioner---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI-nyckelvalidering: fast baseUrl (`api.longcat.chat/openai`) och authHeader (`Authorization: Bearer`) -**#535**— Åsidosättning av fäst modell: 'body.model' är nu inställt på 'pinnedModel' när kontextcacheskydd upptäcker en fäst modell -**#524**— OpenCode-konfigurationen har nu sparats korrekt: lade till `saveOpenCodeConfig()`-hanteraren (XDG_CONFIG_HOME medveten, skriver TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Inloggningen fastnar inte längre efter att ha hoppat över lösenordsinställningarna (omdirigerar till onboarding) -**#522**— API Manager: tog bort den missvisande knappen "Kopiera maskerad nyckel" (ersatt med verktygstips för låsikon) -**#527**— Claude Code + Codex superpowers loop: "tool_result"-block konverteras nu till text istället för att släppas -**#532**— OpenCode GO API-nyckelvalidering använder nu rätt `zen/v1`-slutpunkt (`testKeyBaseUrl`) -**#489**— Antigravity: saknad "googleProjectId" returnerar strukturerat 422-fel med återanslutningsvägledning -**#510**— Windows: MSYS2/Git-Bash-sökvägar (`/c/Program Files/...`) är nu normaliserade till `C:\Program Files\...` -**#492**— `omniroute` CLI upptäcker nu `mise`/`nvm` när `app/server.js` saknas och visar riktad fix### Dokumentation

-**#513**— Återställning av Docker-lösenord: `INITIAL_PASSWORD` env var lösning dokumenterad -**#520**— pnpm: "pnpm approve-builds better-sqlite3" dokumenterad### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Nya OpenCode-leverantörer, korrigering av inbäddningsuppgifter, CLI-maskerad nyckelbugg, CACHE_TAG_PATTERN-fix.### 🐛 Bug Fixes

-**CLI-verktyg sparar maskerad API-nyckel till konfigurationsfiler**— POST-rutter för `claude-settings`, `cline-settings` och `openclaw-settings` accepterar nu en `keyId`-param och löser den riktiga API-nyckeln från DB innan du skriver till disken. `ClaudeToolCard` uppdaterad för att skicka `keyId` istället för den maskerade visningssträngen. Fixar #523, #526. -**Anpassade inbäddningsleverantörer: `Inga referenser`-fel**— `/v1/embeddings` spårar nu `credentialsProviderId` separat från routingprefixet, så autentiseringsuppgifter hämtas från det matchande leverantörsnod-ID snarare än den offentliga prefixsträngen. Åtgärdar en regression där `google/gemini-embedding-001` och liknande anpassade leverantörsmodeller alltid skulle misslyckas med ett autentiseringsfel. Fixar #532-relaterad. (PR #528 av @jacob2826) -**Regex för kontextcacheskydd missar `
` prefix**— `CACHE_TAG_PATTERN` i `comboAgentMiddleware.ts` uppdaterad för att matcha både bokstavliga `
` (omvänt snedstreck-n) och faktisk nyrad U+000A som streaming av `combo.ts` injicerar runt taggen `<omniModel>` efter fix #515. Fixar #531.### ✨ New Providers

-**OpenCode Zen**— Gratis tier-gateway på `opencode.ai/zen/v1` med 3 modeller: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Prenumerationstjänst på `opencode.ai/zen/go/v1` med 4 modeller: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude-format), `minimax-m2.5` (Claude-format)

- Båda leverantörerna använder den nya `OpencodeExecutor` som dirigerar dynamiskt till `/chat/completions`, `/messages`, `/responses` eller `/models/{model}:generateContent` baserat på den begärda modellen. (PR #530 av @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Bugfixar — bevara Codex prompt-cache-nyckel, fixa tagContent JSON-escape, synkronisera utgången token-status till DB.### 🐛 Bug Fixes

-**fix(översättare)**: Bevara `prompt_cache_key` i Responses API → Chat Completations translation (#517)
— Fältet är en cache-affinitetssignal som används av Codex; att strippa den förhindrade snabba cacheträffar.
Fixat i `openai-responses.ts` och `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` i `tagContent` så den injicerade JSON-strängen är giltig (#515)
— Template literal newlines (U+000A) tillåts inte utan escaped inuti JSON-strängvärden.
Ersatt med `\n` bokstavliga sekvenser i `open-sse/services/combo.ts`.

-**fix(användning)**: Synkronisera status för utgången token tillbaka till DB vid ett fel i realtid (#491)
— När Live Check för Limits & Quotas returnerar 401/403, är anslutningen "testStatus" nu uppdaterad
till `"expired"` i databasen så att leverantörssidan återspeglar samma försämrade tillstånd.
Fixat i `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Lägg till 5 nya gratis AI-leverantörer — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Lägg till LongCat AI (`lc/`) — 50 miljoner tokens/dag gratis (Flash-Lite) + 500K/dag (chatt/tänkande) under offentlig beta. OpenAI-kompatibel, standard Bearer auth. -**feat(providers/pollinations)**: Add Pollinations AI (`pol/`) — ingen API-nyckel krävs. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s gratis). Anpassad executor hanterar valfri autentisering. -**feat(providers/cloudflare-ai)**: Lägg till Cloudflare Workers AI (`cf/`) — 10K Neurons/dag gratis (~150 LLM-svar eller 500s Whisper-ljud). 50+ modeller på global kant. Anpassad executor bygger dynamisk URL med "accountId" från autentiseringsuppgifter. -**feat(providers/scaleway)**: Lägg till Scaleway Generative APIs (`scw/`) — 1 miljon gratis tokens för nya konton. EU/GDPR-kompatibel (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Lägg till AI/ML API (`aiml/`) — $0,025/dag gratis kredit, 200+ modeller (GPT-4o, Claude, Gemini, Llama) via en enda aggregatorslutpunkt.### 🔄 Provider Updates

-**feat(providers/together)**: Lägg till "hasFree: true" + 3 permanent gratis modell-ID:n: "Llama-3.3-70B-Instruct-Turbo-Free", "Llama-Vision-Free", "DeepSeek-R1-Distill-Llama-70B-Free" -**feat(providers/gemini)**: Lägg till "hasFree: true" + "freeNote" (1 500 req/dag, inget kreditkort behövs, aistudio.google.com) -**chore(providers/gemini)**: Byt namn på visningsnamnet till "Gemini (Google AI Studio)" för tydlighetens skull### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Ny "PollinationsExecutor" — utelämnar "Authorization"-huvudet när ingen API-nyckel tillhandahålls -**feat(executors/cloudflare-ai)**: Ny "CloudflareAIExecutor" — dynamisk URL-konstruktion kräver "accountId" i leverantörsuppgifterna -**feat(executors)**: Registrera "pollinations", "pol", "cloudflare-ai", "cf" executor mappningar### Dokumentation

-**docs(readme)**: Utökad gratis kombinationsstack till 11 leverantörer ($0 för alltid) -**docs(readme)**: Lade till 4 nya gratis leverantörssektioner (LongCat, Pollinations, Cloudflare AI, Scaleway) med modelltabeller -**docs(readme)**: Uppdaterad pristabell med 4 nya gratisrader -**docs(i18n/pt-BR)**: Uppdaterad pristabell + lagt till LongCat/Pollinations/Cloudflare AI/Scaleway-sektioner på portugisiska -**docs(new-features/ai)**: 10 uppgiftsspecifikationer + huvudimplementeringsplan i `docs/new-features/ai/`### 🧪 Tests

- Testsvit:**821 tester, 0 misslyckanden**(oförändrad)---

## [2.9.2] — 2026-03-21

> Sprint: Åtgärda mediatranskription (Deepgram/HuggingFace Content-Type, språkdetektering) och TTS-felvisning.### 🐛 Bug Fixes

-**fix(transkription)**: Deepgram och HuggingFace ljudtranskription mappar nu korrekt `video/mp4` → `audio/mp4` och andra MIME-typer för media via den nya `resolveAudioContentType()`-hjälparen. Tidigare gav uppladdning av `.mp4`-filer konsekvent "Inget tal upptäckt" eftersom Deepgram tog emot `Content-Type: video/mp4`. -**fix(transkription)**: Lade till `detect_language=true` till Deepgram-förfrågningar - automatiskt upptäcker ljudspråk (portugisiska, spanska, etc.) istället för att använda engelska som standard. Åtgärdar icke-engelska transkriptioner som returnerar tomma eller skräpresultat. -**fix(transkription)**: Lade till `punctuate=true` till Deepgram-förfrågningar för transkriptionsutdata av högre kvalitet med korrekt interpunktion. -**fix(tts)**: "[object Object]" felvisning i text-till-tal-svar fixade i både "audioSpeech.ts" och "audioTranscription.ts". Funktionen `upstreamErrorResponse()` extraherar nu kapslade strängmeddelanden korrekt från leverantörer som ElevenLabs som returnerar `{ error: { message: "...", status_code: 401 } }` istället för en platt felsträng.### 🧪 Tests

- Testsvit:**821 tester, 0 misslyckanden**(oförändrad)### Triaged Issues

-**#508**— Regression av verktygssamtalsformat: begärda proxyloggar och information om leverantörskedjan ('behovsinformation') -**#510**— Windows CLI-hälsokontrollsökväg: begärd information om skal/nodversion ('behovsinformation') -**#485**— Kiro MCP-verktygsanrop: stängd som externt Kiro-problem (inte OmniRoute) -**#442**— Baseten /modells slutpunkt: stängd (dokumenterad manuell lösning) -**#464**— Key provisioning API: godkänd som färdplansobjekt---

## [2.9.1] — 2026-03-21

> Sprint: Åtgärda SSE omniModel-dataförlust, sammanfoga modellkompatibilitet per protokoll.### Bug Fixes

-**#511**— Kritisk: `<omniModel>`-taggen skickades efter `finish_reason:stop` i SSE-strömmar, vilket orsakade dataförlust. Taggen injiceras nu i den första icke-tomma innehållsdelen, vilket garanterar leverans innan SDK:er stänger anslutningen.### Merged PRs

-**PR #512**(@zhangqiang8vip): Modellkompatibilitet per protokoll — `normalizeToolCallId` och `preserveOpenAIDeveloperRole` kan nu konfigureras per klientprotokoll (OpenAI, Claude, Responses API). Nytt `compatByProtocol`-fält i modellkonfiguration med Zod-validering.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: begärde PATH/versionsinformation -**#509**— Turbopack Electron regression: uppströms Next.js bugg, dokumenterade lösningar -**#508**— macOS svart skärm: föreslagen "--disable-gpu"-lösning---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.### ✨ New Features

-**feat(search)**: Sökanalysfliken i `/dashboard/analytics` — leverantörsuppdelning, cacheträfffrekvens, kostnadsspårning. Nytt API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope har lagts till med anpassad validering av slutpunktssökväg — konfigurerbara "chatPath" och "modelsPath" per nod (#feat/custom-endpoint-paths) -**feat(api)**: Gränser för antal begäranden per API-nyckel — kolumner "max_requests_per_day" och "max_requests_per_minute" med skjutfönster i minnet som returnerar HTTP 429 (#452) -**feat(dev)**: ZWS v5 — HMR-läckagefix (485 DB-anslutningar → 1), minne 2,4 GB → 195 MB, "globalThis"-singlar, Edge Runtime-varningsfix (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` omskriven med try/catch waterfall (Windows REG.exe → macOS ioreg → Linux-fil läst → värdnamn → `os.hostname()`). Eliminerar `process.platform`-grening som Next.js bundler död-kod-eliminerade, fixar ``huvudet' inte känns igen` på Windows. Fixar också #466. -**fix(#493)**: Namn på anpassad leverantörsmodell — tog bort felaktig prefixstrippning i `DefaultExecutor.transformRequest()` som förvanskade org-omfattade modell-ID:n som `zai-org/GLM-5-FP8`. -**fix(#490)**: Strömmande + kontextcacheskydd — `TransformStream` fångar upp SSE för att injicera taggen `<omniModel>` före `[DONE]`-markören, vilket möjliggör skydd av kontextcache för strömmande svar. -**fix(#458)**: Validering av kombinationsschema — `system_message`, `tool_filter_regex`, `context_cache_protection`-fält passerar nu Zod-validering vid spara. -**fix(#487)**: KIRO MITM-kortrensning — tog bort ZWS_README, genererade `AntigravityToolCard` för att använda dynamiska verktygsmetadata.### 🧪 Tests

- Tillagda verktyg i antropiskt format filterenhetstester (PR #397) — 8 regressionstester för 'verktyg.namn' utan '.funktion'-omslag
- Testsvit:**821 tester, 0 misslyckanden**(upp från 813)### 📋 Issues Closed (8)

-**#506**— Windows maskin-ID "huvud" kändes inte igen (fast) -**#493**— Namn på anpassad leverantörsmodell (fast) -**#490**— Strömmande kontextcache (fast) -**#452**— Begäran per API-nyckel (implementerad) -**#466**— Windows-inloggningsfel (samma grundorsak som #506) -**#504**— MITM inaktivt (förväntat beteende) -**#462**— Gemini CLI PSA (löst) -**#434**— Elektronappkrasch (dubblett av #402)## [2.8.9] — 2026-03-20

> Sprint: Slå samman community-PR, fixa KIRO MITM-kort, beroendeuppdateringar.### Merged PRs

-**PR #498**(@Sajid11194): Fixa Windows-dator-ID-krasch (`undefined\REG.exe`). Ersätter `node-machine-id` med inbyggda OS-registerfrågor.**Stänger #486.** -**PR #497**(@zhangqiang8vip): Åtgärda HMR-resursläckor i dev-läge — 485 läckta DB-anslutningar → 1, minne 2,4 GB → 195 MB. `globalThis`-singlar, Edge Runtime-varningsfix, Windows-teststabilitet. (+1168/-338 över 22 filer) -**PRs #499-503**(Dependabot): GitHub Actions-uppdateringar — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `@4`.-action### Bug Fixes

-**#505**— KIRO MITM-kortet visar nu verktygsspecifika instruktioner (`api.anthropic.com`) istället för antigravitationsspecifik text. -**#504**— Svarade med UX-förtydligande (MITM "Inaktiv" förväntas beteende när proxy inte körs).---

## [2.8.8] — 2026-03-20

> Sprint: Åtgärda OAuth batch-testkrasch, lägg till knappen "Testa alla" på individuella leverantörssidor.### Bug Fixes

-**OAuth batch-testkrasch**(ERR_CONNECTION_REFUSED): Ersatte sekventiell for-loop med samtidighetsgräns för 5 anslutningar + 30 s per anslutning timeout via `Promise.race()` + `Promise.allSettled()`. Förhindrar serverkrasch vid test av stora OAuth-leverantörsgrupper (~30+ anslutningar).### Funktioner

-**"Testa alla"-knapp på leverantörssidor**: Individuella leverantörssidor (t.ex. `/providers/codex`) visar nu en "Testa alla"-knapp i anslutningshuvudet när det finns 2+ anslutningar. Använder `POST /api/providers/test-batch` med `{mode: "provider", providerId}`. Resultaten visas i en modal med godkänd/underkänd sammanfattning och diagnos per anslutning.---

## [2.8.7] — 2026-03-20

> Sprint: Sammanfoga PR #495 (flaskhals 429 drop), fixa #496 (anpassade inbäddningsleverantörer), triagefunktioner.### Bug Fixes

-**Bottleneck 429 oändlig väntetid**(PR #495 av @xandr0s): På 429 avbryter `limiter.stop({ dropWaitingJobs: true })` omedelbart alla förfrågningar i kö så att uppströmsuppringare kan utlösa reserv. Limiter tas bort från kartan så nästa begäran skapar en ny instans. -**Anpassade inbäddningsmodeller går inte att lösa**(#496): `POST /v1/embeddings` löser nu anpassade inbäddningsmodeller från ALLA provider_nodes (inte bara localhost). Aktiverar modeller som `google/gemini-embedding-001` som läggs till via instrumentpanelen.### Issues Responded

-**#452**— Gränser för antal begäranden per API-nyckel (bekräftade, på färdplanen) -**#464**— Autoutfärda API-nycklar med leverantörs-/kontogränser (behöver mer information) -**#488**— Automatisk uppdatering av modelllistor (bekräftat, på färdplanen) -**#496**— Anpassad inbäddningsleverantörsupplösning (fast)---

## [2.8.6] — 2026-03-20

> Sprint: Slå ihop PR #494 (MiniMax roll fix), fixa KIRO MITM instrumentbräda, triage 8 problem.### Funktioner

-**MiniMax-utvecklare→systemrollfix**(PR #494 av @zhangqiang8vip): Växla "preserveDeveloperRole" per modell. Lägger till "Kompatibilitet" UI på leverantörssidan. Fixar 422 "rollparameterfel" för MiniMax och liknande gateways. -**roleNormalizer**: `normalizeDeveloperRole()` accepterar nu parametern `preserveDeveloperRole` med tri-state beteende (undefined=keep, true=keep, false=convert). -**DB**: Ny `getModelPreserveOpenAIDeveloperRole()` och `mergeModelCompatOverride()` i `models.ts`.### Bug Fixes

-**KIRO MITM instrumentpanel**(#481/#487): `CLIToolsPageClient` dirigerar nu alla `configType: "mitm"`-verktyg till `AntigravityToolCard` (MITM Start/Stop-kontroller). Tidigare var endast Antigravity hårdkodad. -**AntigravityToolCard generic**: Använder `tool.image`, `tool.description`, `tool.id` istället för hårdkodade Antigravity-värden. Skyddar mot saknade `defaultModels`.### Cleanup

- Removed `ZWS_README_V2.md` (development-only docs from PR #494).

### Issues Triaged (8)

-**#487**— Stängd (KIRO MITM fixat i den här utgåvan) -**#486**— behovsinformation (Windows REG.exe PATH-problem) -**#489**— behovsinformation (Antigravity projectId saknas, OAuth-återanslutning behövs) -**#492**— behovsinformation (saknar app/server.js på mise-managed Node) -**#490**— Bekräftad (strömning + blockering av kontextcache, fix planerad) -**#491**— Godkänd (inkonsekvens av Codex-autentiseringstillstånd) -**#493**— Bekräftad (Modalleverantörs modellnamnprefix, lösning tillhandahålls) -**#488**— Funktionsbegäran eftersläpning (automatisk uppdatering av modelllistor)---

## [2.8.5] — 2026-03-19

> Sprint: Fixa zombie SSE-strömmar, kontextcache första sväng, KIRO MITM och triage 5 externa problem.### Bug Fixes

-**Zombie SSE-strömmar**(#473): Minska `STREAM_IDLE_TIMEOUT_MS` från 300s → 120s för snabbare combo-backup när leverantörer stannar mitt i strömmen. Konfigurerbar via env var. -**Kontextcachetagg**(#474): Fixa `injectModelTag()` för att hantera första-sväng-förfrågningar (inga assistentmeddelanden) - skyddet för kontextcache fungerar nu från det allra första svaret. -**KIRO MITM**(#481): Ändra KIRO `configType` från `guide` → `mitm` så att instrumentpanelen återger MITM Start/Stop-kontroller. -**E2E Test**(CI): Fixa `providers-bailian-coding-plan.spec.ts` — avvisa redan existerande modal överlagring innan du klickar på knappen Lägg till API-nyckel.### Closed Issues

- #473 — Zombie SSE-strömmar bypass combo fallback
- #474 — Kontextcache-taggen `<omniModel>` saknas vid första sväng
- #481 — MITM för KIRO kan inte aktiveras från instrumentpanelen
- #468 — Gemini CLI fjärrserver (ersatt av #462 utfasning)
- #438 — Claude kan inte skriva filer (externt CLI-problem)
- #439 — AppImage fungerar inte (dokumenterad libfuse2-lösning)
- #402 — ARM64 DMG "skadad" (dokumenterad xattr -cr lösning)
- #460 — CLI kan inte köras på Windows (dokumenterad PATH-fix)---

## [2.8.4] — 2026-03-19

> Sprint: Utfasning av Gemini CLI, VM-guide i18n-fix, dependabot-säkerhetsfix, expansion av leverantörsschema.### Funktioner

-**Gemini CLI-utfasning**(#462): Markera "gemini-cli"-leverantören som utfasad med varning - Google begränsar tredje parts OAuth-användning från mars 2026 -**Provider Schema**(#462): Utöka Zod-validering med "deprecated", "deprecationReason", "hasFree", "freeNote", "authHint", "apiHint" valfria fält### Bug Fixes

-**VM Guide i18n**(#471): Lägg till `VM_DEPLOYMENT_GUIDE.md` till i18n översättningspipeline, återskapa alla 30 språköversättningar från engelsk källa (fastnade på portugisiska)### Säkerhet

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — fixar CWE-1321 prototypföroreningar (#484, @dependabot)### Closed Issues

- #472 — Modellalias-regression (fixad i v2.8.2)
- #471 — VM-guideöversättningar trasiga
- #483 — Efterföljande `data: null` efter `[DONE]` (fixat i v2.8.3)### Merged PRs

- #484 — deps: bump flatted från 3.3.3 till 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, SSE-protokollfix, VM-guideöversättning.### Funktioner

-**Czech Language**(#482): Fullständig tjeckiska (cs) i18n — 22 dokument, 2606 UI-strängar, språkväxlingsuppdateringar (@zen0bit) -**VM Deployment Guide**: Översatt från portugisiska till engelska som källdokument (@zen0bit)### Bug Fixes

-**SSE-protokoll**(#483): Sluta skicka efterföljande `data: null` efter `[DONE]`-signalen – fixar `AI_TypeValidationError` i strikta AI SDK-klienter (Zod-baserade validerare)### Merged PRs

- #482 — Lägg till tjeckiska språk + Fixa VM_DEPLOYMENT_GUIDE.md Engelsk källa (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 sammanslagna PR, modellalias routingfix, loggexport och problemtriage.### Funktioner

-**Logg Export**: Ny exportknapp på `/dashboard/logs` med rullgardinsmeny för tidsintervall (1h, 6h, 12h, 24h). Laddar ned JSON för begäran/proxy/samtalsloggar via `/api/logs/export` API (#user-request)### Bug Fixes

-**Modelaliasrouting**(#472): Inställningar → Modellalias påverkar nu leverantörsdirigering korrekt, inte bara formatdetektering. Tidigare användes utdata från `resolveModelAlias()` endast för `getModelTargetFormat()` men det ursprungliga modell-ID:t skickades till leverantören -**Stream Flush Usage**(#480): Användningsdata från den senaste SSE-händelsen i bufferten extraheras nu korrekt under stream flush (sammanslagna från @prakersh)### Merged PRs

- #480 — Extrahera användning från återstående buffert i spolhanteraren (@prakersh)
- #479 — Lägg till saknade Codex 5.3/5.4 och antropiska modell-ID-priser (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Fem community-PR:er – korrigeringar av strömmande samtalsloggar, Kiro-kompatibilitet, cachetokenanalys, kinesisk översättning och konfigurerbara verktygssamtals-ID:n.### Funktioner

-**feat(loggar)**: Samtalsloggsvarsinnehåll nu korrekt ackumulerat från råa leverantörsbitar (OpenAI/Claude/Gemini) före översättning, fixar tomma svarsnyttolaster i streamingläge (#470, @zhangqiang8vip) -**feat(leverantörer)**: Konfigurerbar 9-teckens verktygs-ID-normalisering per modell (Mistral-stil) — endast modeller med alternativet aktiverat får trunkerade ID:n (#470) -**feat(api)**: Key PATCH API utökat för att stödja fälten `allowedConnections`, `name`, `autoResolve`, `isActive` och `accessSchedule` (#470) -**feat(dashboard)**: Svar-först-layout i gränssnittet för förfrågningsloggdetaljer (#470) -**feat(i18n)**: Förbättrad kinesisk (zh-CN) översättning — fullständig omöversättning (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Avlägsna injicerat "modell"-fält från begärande text — Kiro API avvisar okända toppnivåfält (#478, @prakersh) -**fix(användning)**: Inkludera cacheläsning + cacheskapande tokens i indatasummor för användningshistorik för korrekt analys (#477, @prakersh) -**fix(callLogs)**: Stöd för användningsfält för Claude-format (`input_tokens`/`output_tokens`) tillsammans med OpenAI-format, inkludera alla cache-tokenvarianter (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan-leverantör med redigerbara bas-URL:er, plus bidrag från communityn för Alibaba Cloud och Kimi Coding.### Funktioner

-**feat(providers)**: Lade till Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio med Anthropic-kompatibel API. Statisk katalog med 8 modeller inklusive Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 och Kimi K2.5. Inkluderar anpassad autentiseringsvalidering (400=giltig, 401/403=ogiltig) (#467, @Mind-Dragon) -**feat(admin)**: Redigerbar standardwebbadress i Provider Admin skapa/redigera flöden - användare kan konfigurera anpassade baswebbadresser per anslutning. Fortsatte i `providerSpecificData.baseUrl` med Zod-schemavalidering som avvisar icke-http(s)-scheman (#467)### 🧪 Tests

- Lade till 30+ enhetstester och 2 e2e-scenarier för Bailian Coding Plan-leverantör som täcker autentiseringsvalidering, schemahärdning, beteende på ruttnivå och integration mellan olika lager---

## [2.7.10] — 2026-03-19

> Sprint: Två nya leverantörer som bidragit till gemenskapen (Alibaba Cloud Coding, Kimi Coding API-nyckel) och Docker pino fix.### Funktioner

-**feat(leverantörer)**: Lade till stöd för Alibaba Cloud Coding Plan med två OpenAI-kompatibla slutpunkter — `alicode` (Kina) och `alicode-intl` (International), var och en med 8 modeller (#465, @dtk1985) -**feat(providers)**: Tillagd dedikerad `kimi-coding-apikey`-leverantörssökväg - API-nyckelbaserad Kimi Coding-åtkomst tvingas inte längre genom OAuth-enbart `kimi-coding`-rutt. Inkluderar register, konstanter, modellers API, konfiguration och valideringstest (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Lade till saknat `split2`-beroende till Docker-bilden - `pino-abstract-transport` kräver det vid körning men det kopierades inte till den fristående behållaren, vilket orsakade att `Kan inte hitta modulen 'split2'` kraschar (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Codex-svars subpath-genomföring stöds inbyggt, Windows MITM-krasch fixad och Combos-agentscheman justerade.### Funktioner

-**feat(codex)**: Native responses subpath passthrough för Codex — dirigerar naturligt `POST /v1/responses/compact` till Codex uppströms, upprätthåller Claude Code-kompatibilitet utan att ta bort `/compact`-suffixet (#457)### 🐛 Bug Fixes

-**fix(combos)**: Zod-scheman (`updateComboSchema` och `createComboSchema`) inkluderar nu `system_message`, `tool_filter_regex` och `context_cache_protection`. Åtgärdar bugg där agentspecifika inställningar skapade via instrumentpanelen förkastades tyst av backend-valideringsskiktet (#458) -**fix(mitm)**: Kiro MITM-profilkrasch på Windows fixat — `node-machine-id` misslyckades på grund av att env för `REG.exe` saknas, och återgången orsakade ett fatalt `crypto is not defined`-fel. Fallback importerar nu krypto säkert och korrekt (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budget spara bugg + combo agent funktioner UI + omniModel tag säkerhetsfix.### 🐛 Bug Fixes

-**fix(budget)**: "Spara gränser" returnerar inte längre 422 — `warningThreshold` skickas nu korrekt som bråk (0–1) istället för procent (0–100) (#451) -**fix(combos)**: `<omniModel>` intern cache-tagg tas nu bort innan förfrågningar vidarebefordras till leverantörer, vilket förhindrar cache-sessionsavbrott (#454)### Funktioner

-**feat(combos)**: Avsnittet Agentfunktioner läggs till i kombinationsskapande/redigera modal — avslöja åsidosättandet av "system_meddelande", "verktygsfilter_regex" och "kontext_cacheskydd" direkt från instrumentpanelen (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino krasch, Codex CLI svar arbetar fix, paket-lås synkronisering.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` och `pino-pretty` kopierade nu uttryckligen i Docker runner-stadiet — Next.js fristående spårning missar dessa peer-deps, vilket gör att `Kan inte hitta modulen pino-abstract-transport` kraschar vid start (#449) -**fix(responses)**: Ta bort `initTranslators()` från `/v1/responses`-rutten — kraschade Next.js-arbetaren med `arbetaren har avslutat` uncaughtException på Codex CLI-förfrågningar (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` är nu ansluten till varje versionsbump för att säkerställa att Docker `npm ci` använder exakta beroendeversioner---

## [2.7.5] — 2026-03-18

> Sprint: UX-förbättringar och Windows CLI-hälsokontrollfix.### 🐛 Bug Fixes

-**fix(ux)**: Visa standardlösenordstips på inloggningssidan - nya användare ser nu `"Standardlösenord: 123456"` under lösenordsinmatningen (#437) -**fix(cli)**: Claude CLI och andra npm-installerade verktyg har nu korrekt upptäckts som körbara på Windows — spawn använder `shell:true` för att lösa `.cmd`-omslag via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: instrumentpanelen för sökverktyg, i18n-fixar, Copilot-gränser, Serper-valideringsfix.### Funktioner

-**feat(search)**: Lägg till söklekplats (10:e slutpunkt), sökverktygssida med jämför leverantörer/omranka pipeline/sökhistorik, lokal omrankningsrutt, autentiseringsvakter på sök-API (#443 av @Regis-RCR)

- Ny rutt: `/dashboard/sökverktyg`
- Sidofältspost under Felsökningsavsnittet
- `GET /api/search/providers` och `GET /api/search/stats` med auth guards
- Lokal provider_nodes routing för `/v1/rerank`
- 30+ i18n-nycklar i söknamnutrymmet### 🐛 Bug Fixes

-**fix(sök)**: Fixa Brave news normalizer (gav 0 resultat), framtvinga max_results trunkering efter normalisering, fixa Endpoints page hämtning URL (#443 av @Regis-RCR) -**fix(analytics)**: Lokalisera analytiska dag-/datumetiketter — ersätt hårdkodade portugisiska strängar med "Intl.DateTimeFormat(locale)" (#444 av @hijak) -**fix(copilot)**: Korrekt visning av GitHub Copilot-kontotyp, filtrera vilseledande obegränsade kvotrader från gränsöversikten (#445 av @hijak) -**fix(leverantörer)**: Sluta avvisa giltiga Serper API-nycklar – behandla icke-4xx-svar som giltig autentisering (#446 av @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex direkta API kvot reservfix.### 🐛 Bug Fixes

-**fix(codex)**: Blockera konton som tar slut varje vecka i direkt API-reserv (#440)

- `resolveQuotaWindow()` prefixmatchning: `"weekly"` matchar nu `"weekly (7d)"` cache-nycklar
- `applyCodexWindowPolicy()` tvingar `useWeekly`/`use5h` att växla korrekt
- 4 nya regressionstester (766 totalt)---

## [2.7.2] — 2026-03-18

> Sprint: Ljusläge UI kontrastfixar.### 🐛 Bug Fixes

-**fix(loggar)**: Fixa ljuslägeskontrasten i filterknappar för begäran om loggar och kombinationsmärke (#378)

- Fel/framgång/kombinationsfilterknappar är nu läsbara i ljusläge
- Combo row badge använder starkare violett i ljusläge---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search routing (POST /v1/search) med 5 leverantörer + Next.js 16.1.7 säkerhetsfixar (6 CVEs).### ✨ New Features

-**feat(search)**: Unified web search routing — `POST /v1/search` med 5 leverantörer (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover mellan leverantörer, 6 500+ gratis sökningar/månad
- In-memory cache med request coalescing (konfigurerbar TTL)
- Dashboard: Sökanalysfliken i `/dashboard/analytics` med leverantörsuppdelning, cacheträfffrekvens, kostnadsspårning
- Nytt API: `GET /api/v1/search/analytics` för statistik för sökförfrågningar
- DB-migrering: kolumn `request_type` på `call_logs` för spårning av icke-chattförfrågningar
- Zod-validering (`v1SearchSchema`), auth-gated, kostnad registrerad via `recordCost()`### Säkerhet

-**deps**: Next.js 16.1.6 → 16.1.7 — fixar 6 CVE:er: -**Kritisk**: CVE-2026-29057 (smuggling av HTTP-förfrågningar via http-proxy) -**Hög**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions) -**Medium**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Arkiv                                                            | Syfte                                          |
| ---------------------------------------------------------------- | ---------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Sökhanterare med 5-leverantörsdirigering       |
| `open-sse/config/searchRegistry.ts`                              | Leverantörsregister (auth, kostnad, kvot, TTL) |
| `open-sse/services/searchCache.ts`                               | In-memory cache med begäran koalescing         |
| `src/app/api/v1/search/route.ts`                                 | Next.js rutt (POST + GET)                      |
| `src/app/api/v1/search/analytics/route.ts`                       | Sökstatistik API                               |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Fliken Analytics instrumentpanel               |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB-migrering                                   |
| `tests/unit/search-registry.test.mjs`                            | 277 rader enhetstester                         | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspirerade funktioner — toolCalling-flagga, flerspråkig avsiktsdetektering, benchmarkdriven reserv, begärandeduplicering, pluggbar RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5-prissättning.### ✨ New Models & Pricing

-**feat(prissättning)**: xAI Grok-4 Fast — `$0,20/$0,50 per 1M tokens`, 1143ms p50 latens, verktygsanrop stöds -**feat(prissättning)**: xAI Grok-4 (standard) — `$0,20/$1,50 per 1M tokens`, resonerande flaggskepp -**feat(prissättning)**: GLM-5 via Z.AI — `$0,5/1M`, 128K utdatakontext -**feat(prissättning)**: MiniMax M2.5 — `$0,30/1M input`, resonemang + agentuppgifter -**feat(pricing)**: DeepSeek V3.2 — uppdaterad prissättning `$0,27/$1,10 per 1M` -**feat(prissättning)**: Kimi K2.5 via Moonshot API — direkt åtkomst till Moonshot API -**feat(providers)**: Z.AI-leverantör har lagts till ('zai'-alias) — GLM-5-familjen med 128K-utgång### 🧠 Routing Intelligence

-**feat(registry)**: "toolCalling"-flagga per modell i leverantörsregistret - kombinationer kan nu föredra/kräva modeller som kan anropa verktyg -**feat(scoring)**: Flerspråkig avsiktsdetektering för AutoCombo-poängning — PT/ZH/ES/AR-skript/språkmönster påverkar modellval per begäranskontext -**feat(fallback)**: Benchmark-drivna reservkedjor — data om verklig latens (p50 från `comboMetrics`) som används för att omordna reservprioritet dynamiskt -**feat(dedup)**: Begär deduplicering via content-hash - 5-sekunders idempotensfönster förhindrar dubbla leverantörssamtal från att försöka klienter igen -**feat(router)**: Pluggbart `RouterStrategy`-gränssnitt i `autoCombo/routerStrategy.ts` — anpassad routinglogik kan injiceras utan att ändra kärnan### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nya avancerade verktygsscheman: `omniroute_get_provider_metrics` (p50/p95/p99 per leverantör) och `omniroute_explain_route` (förklaring av routingbeslut) -**feat(mcp)**: MCP-verktygets autentiseringsomfång uppdaterade - `metrics:read`-omfång har lagts till för leverantörsmätningsverktyg -**feat(mcp)**: `omniroute_best_combo_for_task` accepterar nu `languageHint`-parametern för flerspråkig routing### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` utökad med realtids latenspercentilspårning per leverantör/konto -**feat(health)**: Health API (`/api/monitoring/health`) returnerar nu fälten "p50Latency" och "errorRate" per leverantör -**feat(användning)**: Användningshistorikmigrering för fördröjningsspårning per modell### 🗄️ DB Migrations

-**feat(migrations)**: Ny kolumn "latency_p50" i tabellen "combo_metrics" — nollbrytande, säker för befintliga användare### 🐛 Bug Fixes / Closures

-**stäng(#411)**: bättre-sqlite3 hashad modulupplösning på Windows — fixat i v2.6.10 (f02c5b5) -**stäng(#409)**: GitHub Copilot-chattslutföranden misslyckas med Claude-modeller när filer bifogas — fixat i v2.6.9 (838f1d6) -**stäng(#405)**: Duplikat av #411 — löst## [2.6.10] — 2026-03-17

> Windows-fix: better-sqlite3 förbyggd nedladdning utan node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: I Windows brukade `npm install -g omniroute` misslyckas med `better_sqlite3.node är inte en giltig Win32-applikation` eftersom den medföljande inbyggda binären kompilerades för Linux. Lägger till**Strategy 1.5**till `scripts/postinstall.mjs`: använder `@mapbox/node-pre-gyp install --fallback-to-build=false` (paketerat i `bättre-sqlite3`) för att ladda ner den korrekta förbyggda binären för det aktuella operativsystemet/archen utan att behöva bygga verktyg (ingen MS-nod-, ingen MS-nod-, ingen VC-kod). Faller tillbaka till `npm rebuild` endast om nedladdningen misslyckas. Lägger till plattformsspecifika felmeddelanden med tydliga instruktioner för manuell åtgärd.---

## [2.6.9] — 2026-03-17

> CI-fixar (t11 valfri budget), buggfix #409 (filbilagor via Copilot+Claude), korrigering av släpp arbetsflöde.### 🐛 Bug Fixes

-**fix(ci)**: Ta bort ordet "any" från kommentarer i `openai-responses.ts` och `chatCore.ts` som inte klarade t11 `any` budgetkontroll (falskt positivt från kommentarer som räknar regex) -**fix(chatCore)**: Normalisera innehållsdeltyper som inte stöds innan vidarebefordran till leverantörer (#409 — Markören skickar `{typ:"fil"}` när `.md`-filer bifogas; Copilot och andra OpenAI-kompatibla leverantörer avvisar med "typ måste vara antingen 'image_url' eller 'text'"; fixar "text" konverterar "filtyper" och "släpp" till "okända" dokumenttyper.### 🔧 Workflow

-**chore(generate-release)**: Lägg till ATOMIC COMMIT RULE — version bump (`npm version patch`) MÅSTE ske innan commit funktionsfiler för att säkerställa att taggen alltid pekar på en commit som innehåller alla versionsändringar tillsammans---

## [2.6.8] — 2026-03-17

> Sprint: Combo som Agent (systemprompt + verktygsfilter), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Ny "request_detail_logs"-tabell med 500-posters ringbufferttrigger, opt-in via inställningsväxling### Funktioner

-**feat(combo)**: Systemmeddelande åsidosätt per kombination (#399 — fältet `system_message` ersätter eller injicerar systemuppmaning innan vidarebefordran till leverantören) -**feat(combo)**: Verktygsfilter Regex per Combo (#399 — `tool_filter_regex` behåller endast verktyg som matchar mönster; stöder OpenAI + Anthropic-format) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` taggar svar med `<omniModel>leverantör/modell</omniModel>` och stiftar modell för sessionskontinuitet) -**feat(inställningar)**: Automatisk uppdatering via inställningar (#320 — `GET /api/system/version` + `POST /api/system/update` – kontrollerar npm-registret och uppdateringar i bakgrunden med pm2-omstart) -**feat(loggar)**: Detaljerade förfrågningsloggar (#378 — fångar hela pipeline-kroppar i 4 steg: klientförfrågan, översatt begäran, leverantörssvar, klientsvar — opt-in-växling, 64KB trim, 500-ingångars ringbuffert) -**feat(mitm)**: MITM Kiro IDE-profil (#336 — `src/mitm/targets/kiro.ts` riktar sig till api.anthropic.com, återanvänder befintlig MITM-infrastruktur)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-förbättringar, lokala provider_nodes-tillägg, proxyregister, Claude passthrough-fixar.### Funktioner

-**feat(health)**: Bakgrundshälsokontroll för lokala `provider_nodes` med exponentiell backoff (30s→300s) och `Promise.allSettled` för att undvika blockering (#423, @Regis-RCR) -**feat(inbäddningar)**: Dirigera `/v1/inbäddningar` till lokala `provider_nodes` — `buildDynamicEmbeddingProvider()` med värdnamnsvalidering (#422, @Regis-RCR) -**feat(audio)**: Dirigera TTS/STT till lokala `provider_nodes` — `buildDynamicAudioProvider()` med SSRF-skydd (#416, @Regis-RCR) -**feat(proxy)**: Proxyregister, hanterings-API:er och generalisering av kvotgränser (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Ta bort Claude-specifika fält (`metadata`, `anthropic_version`) när målet är OpenAI-compat (#421, @prakersh) -**fix(sse)**: Extrahera Claude SSE-användning (`input_tokens`, `output_tokens`, cache-tokens) i passthrough stream-läge (#420, @prakersh) -**fix(sse)**: Generera reserv-'call_id' för verktygsanrop med saknade/tomma ID:n (#419, @prakersh) -**fix(sse)**: Claude-to-Claude passthrough — framkroppen helt orörd, ingen ny översättning (#418, @prakersh) -**fix(sse)**: Filtrera föräldralösa `tool_result`-objekt efter Claude Code-kontextkomprimering för att undvika 400-fel (#417, @prakersh) -**fix(sse)**: Hoppa över anrop av verktyg för tomma namn i Responses API-översättaren för att förhindra oändliga loopar av `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Ta bort tomma textinnehållsblock före översättning (#427, @prakersh) -**fix(api)**: Lägg till "refreshable: true" till Claude OAuth-testkonfigurationen (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` och relaterade devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Snabbkorrigering: Turbopack/Docker-kompatibilitet — ta bort protokollet `node:` från alla importer av `src/`.### 🐛 Bug Fixes

-**fix(build)**: Tog bort `node:` protokollprefix från `import`-satser i 17 filer under `src/`. Importen av `node:fs`, `node:path`, `node:url`, `node:os` etc. orsakade att `Ecmascript-filen hade ett fel` på Turbopack-byggen (Next.js 15 Docker) och på uppgraderingar från äldre globala npm-installationer. Berörda filer: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` och 12 andra i `src/app/api/` och `src/lib/`. -**chore(workflow)**: Uppdaterade `generate-release.md` för att få Docker Hub att synkronisera och dual-VPS distribuera**obligatoriska**steg i varje release.---

## [2.6.5] — 2026-03-17

> Sprint: resonemang modell param filtrering, lokal leverantör 404 fix, Kilo Gateway leverantör, beroende bump.### ✨ New Features

-**feat(api)**: Lade till**Kilo Gateway**(`api.kilo.ai`) som en ny API-nyckelleverantör (alias `kg`) — 335+ modeller, 6 gratis modeller, 3 auto-routing-modeller (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free'). Passthrough-modeller som stöds via `/api/gateway/models` slutpunkt. (PR #408 av @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Ta bort parametrar som inte stöds för resonemangsmodeller (o1, o1-mini, o1-pro, o3, o3-mini). Modeller i familjen `o1`/`o3` avvisar `temperatur`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` och `n` med HTTP 400. Parametrar tas nu bort i lagret `chatCore` innan vidarebefordran. Använder ett deklarativt `unsupportedParams`-fält per modell och en förberäknad O(1)-karta för uppslag. (PR #412 av @Regis-RCR) -**fix(sse)**: Lokal leverantör 404 resulterar nu i en**enbart modelllås (5 sekunder)**istället för en låsning på anslutningsnivå (2 minuter). När en lokal slutledningsbackend (Ollama, LM Studio, oMLX) returnerar 404 för en okänd modell, förblir anslutningen aktiv och andra modeller fortsätter att fungera omedelbart. Rättar också en redan existerande bugg där `modell` inte skickades till `markAccountUnavailable()`. Lokala leverantörer upptäckts via värdnamn (`localhost`, `127.0.0.1`, `::1`, utökbar via `LOCAL_HOSTNAMES` env var). (PR #410 av @Regis-RCR)### 📦 Dependencies

- `bättre-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(leverantörer)**: Tog bort icke-existerande modellnamn från 5 leverantörer: -**gemini / gemini-cli**: tog bort `gemini-3.1-pro/flash` och `gemini-3-*-preview` (finns inte i Google API v1beta); ersatt med "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro/flash" -**antigravity**: tog bort `gemini-3.1-pro-high/low` och `gemini-3-flash` (ogiltiga interna alias); ersatt med riktiga 2.x-modeller -**github (Copilot)**: tog bort `gemini-3-flash-preview` och `gemini-3-pro-preview`; ersatt med `gemini-2.5-flash` -**nvidia**: korrigerad `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM använder `meta/`-namnrymden för Meta-modeller); lade till "nvidia/llama-3.1-70b-instruct" och "nvidia/llama-3.1-405b-instruct" -**fix(db/combo)**: Uppdaterad `free-stack`-kombination på fjärr-DB: tog bort `qw/qwen3-coder-plus` (förfallit uppdateringstoken), korrigerade `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-'ge-3-instruct'/70b-instruct. → `gemini/gemini-2.5-flash`, lade till `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip inbakad i byggpipeline, syntetisk leverantör lagt till, VPS PM2-sökväg korrigerad.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip körs nu vid**kompileringstid**för ALLA paket — inte bara `bättre-sqlite3`. Steg 5.6 i `prepublish.mjs` går igenom varje `.js` i `app/.next/server/` och tar bort hex-suffixet på 16 tecken från alla hashade `require()`. Fixar `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND på globala npm-installationer. Stänger #398 -**fix(deploy)**: PM2 på båda VPS pekade på inaktuella git-clone-kataloger. Omkonfigurerad till `app/server.js` i det globala paketet npm. Uppdaterat `/deploy-vps` arbetsflöde för att använda `npm pack + scp` (npm-registret avvisar 299MB-paket).### Funktioner

-**feat(leverantör)**: Syntetisk ([synthetic.new](https://synthetic.new)) — integritetsfokuserad OpenAI-kompatibel slutledning. "passthroughModels: true" för dynamisk HuggingFace-modellkatalog. Initiala modeller: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 av @Regis-RCR)### 📋 Issues Closed

-**stäng #398**: npm hash-regression — fixad av kompileringstids-hash-strip i förpublicering -**triage #324**: Bug-skärmdump utan steg — begärd reproduktionsinformation---

## [2.6.2] — 2026-03-16

> Sprint: modulhashing helt fixad, 2 PR sammanslagna (Antropiska verktygsfilter + anpassade slutpunktsvägar), Alibaba Cloud DashScope-leverantör lagt till, 3 inaktuella problem stängda.### 🐛 Bug Fixes

-**fix(build)**: Utökat webbpaket `externals` hash-strip för att täcka ALLA `serverExternalPackages`, inte bara `bättre-sqlite3`. Next.js 16 Turbopack hashhar `zod`, `pino` och alla andra serverexterna paket till namn som `zod-dcb22c6336e0bc69` som inte finns i `node_modules` vid körning. En HASH_PATTERN regex catch-all tar nu bort suffixet på 16 tecken och faller tillbaka till baspaketets namn. Lade också till `NEXT_PRIVATE_BUILD_WORKER=0` i `prepublish.mjs` för att förstärka webbpaketläget, plus en efterbyggd skanning som rapporterar eventuella återstående hashade refs. (#396, #398, PR #403) -**fix(chat)**: Verktygsnamn i antropiskt format (`tool.name` utan `.function`-omslag) släpptes tyst av filtret för tomma namn som introducerades i #346. LiteLLM proxyförfrågningar med prefixet `anthropic/` i Anthropic Messages API-format, vilket gör att alla verktyg filtreras och Anthropic returnerar `400: tool_choice.any får endast specificeras när verktyg tillhandahålls`. Fixat genom att falla tillbaka till `tool.name` när `tool.function.name` saknas. Lade till 8 regressionsenhetstester. (PR #397)### Funktioner

-**feat(api)**: Anpassade slutpunktsvägar för OpenAI-kompatibla leverantörsnoder – konfigurera "chatPath" och "modelsPath" per nod (t.ex. "/v4/chat/completions") i leverantörens anslutningsgränssnitt. Inkluderar en DB-migrering (`003_provider_node_custom_paths.sql`) och sanering av webbadresssökväg (ingen ".."-traversering, måste börja med `/`). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope har lagts till som OpenAI-kompatibel leverantör. Internationell slutpunkt: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modeller: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API-nyckel.### 📋 Issues Closed

-**stäng #323**: Cline-anslutningsfel `[object Object]` — fixat i v2.3.7; instruerade användaren att uppgradera från v2.2.9 -**stäng #337**: Kiro-kreditspårning — implementerad i v2.5.5 (#381); pekade användaren till Dashboard → Användning -**triage #402**: ARM64 macOS DMG skadad — begärd macOS-version, exakt fel och rekommenderad "xattr -d com.apple.quarantine" lösning---

## [2.6.1] — 2026-03-15

> Kritisk startfix: v2.6.0 globala npm-installationer kraschade med ett 500-fel på grund av en hashing-bugg för Turbopack/webpack-modulnamn i Next.js 16-instrumenteringskroken.### 🐛 Bug Fixes

-**fix(build)**: Tvinga `better-sqlite3` att alltid krävas av dess exakta paketnamn i webpack-serverpaketet. Next.js 16 kompilerade instrumenteringskroken till en separat bit och skickade ut `require('bättre-sqlite3-<hash>')` – ett hashat modulnamn som inte finns i `node_modules` – även om paketet var listat i `serverExternalPackages`. Lade till en explicit `external`-funktion till serverns webbpaketkonfiguration så att buntaren alltid sänder ut `require('bättre-sqlite3')`, vilket löste uppstarten `500 Internal Server Error` vid rena globala installationer. (#394, PR #395)### 🔧 CI

-**ci**: Lade till `workflow_dispatch` till `npm-publish.yml` med versionssynkskydd för manuella utlösare (#392) -**ci**: Lade till `workflow_dispatch` till `docker-publish.yml`, uppdaterade GitHub Actions till senaste versioner (#392)---

## [2.6.0] - 2026-03-15

> Problemlösning sprint: 4 buggar fixade, loggar UX förbättrats, Kiro kreditspårning tillagd.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI och SD WebUI visas inte längre i listan med leverantörer av mediasidor när de är okonfigurerade — hämtar `/api/providers` på mount och döljer lokala leverantörer utan anslutningar (#390) -**fix(auth)**: Round-robin väljer inte längre om hastighetsbegränsade konton direkt efter nedkylning — "backoffLevel" används nu som primär sorteringsnyckel i LRU-rotationen (#340) -**fix(oauth)**: Qoder (och andra leverantörer som omdirigerar till sitt eget användargränssnitt) lämnar inte längre OAuth-modalen fast vid "Waiting for Authorization" — popup-stängd detektor övergår automatiskt till manuellt URL-inmatningsläge (#344) -**fix(loggar)**: Begäranloggtabellen är nu läsbar i ljusläge - statusmärken, tokenantal och kombinationstaggar använder adaptiva "mörk:"-färgklasser (#378)### Funktioner

-**feat(kiro)**: Kiro-kreditspårning har lagts till i användningshämtaren — frågor "getUserCredits" från AWS CodeWhisperer-slutpunkt (#337)### 🛠 Chores

-**chore(tests)**: Justerade `test:plan3`, `test:fixes`, `test:security` för att använda samma `tsx/esm`-lastare som `npm-test` – eliminerar falsknegativa modulupplösningar i riktade körningar (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + ruttkroppsvalideringshärdning.### 🐛 Bug Fixes

-**fix(codex)**: Bevara inbyggd Responses API-genomföring för Codex-klienter — undviker onödiga översättningsmutationer (PR #387) -**fix(api)**: Validera förfrågningsorgan på prissättning/synkronisering och rutter för uppgiftsdirigering — förhindrar krascher från felaktiga ingångar (PR #388) -**fix(auth)**: JWT-hemligheter kvarstår vid omstarter via `src/lib/db/secrets.ts` — eliminerar 401-fel efter pm2-omstart (PR #388)---

## [2.5.8] - 2026-03-15

> Byggfix: återställ VPS-anslutning bruten av v2.5.7 ofullständig publicering.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` använde fortfarande föråldrad `--webpack`-flagga vilket gör att Next.js fristående build misslyckas tyst - npm-publicering slutfördes utan `app/server.js`, vilket bryter VPS-distributionen---

## [2.5.7] - 2026-03-15

> Felhanteringskorrigeringar för medialekplats.### 🐛 Bug Fixes

-**fix(media)**: Transkription "API Key Required" falskt positiv när ljudet inte innehåller något tal (musik, tystnad) - visar nu "Inget tal upptäckt" istället -**fix(media)**: `upstreamErrorResponse` i `audioTranscription.ts` och `audioSpeech.ts` returnerar nu korrekt JSON (`{error:{message}}`), vilket möjliggör korrekt 401/403-identifieringsfel i MediaPageClient -**fix(media)**: `parseApiError` hanterar nu Deepgrams `err_msg`-fält och upptäcker `"api key"` i felmeddelanden för korrekt klassificering av autentiseringsfel---

## [2.5.6] - 2026-03-15

> Kritiska säkerhets-/authfixar: Antigravity OAuth bruten + JWT-sessioner förlorade efter omstart.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth skickar nu korrekt `client_secret` till token-slutpunkten. Alternativet för `ANTIGRAVITY_OAUTH_CLIENT_SECRET` var en tom sträng, vilket är falskt - så `client_secret` inkluderades aldrig i begäran, vilket orsakade `"client_secret is missing"`-fel för alla användare utan en anpassad env-var. Stänger #383. -**fix(auth) #385**: `JWT_SECRET` finns nu kvar till SQLite (`namespace='secrets'`) på första generationen och laddas om vid efterföljande start. Tidigare genererades en ny slumpmässig hemlighet vid varje processstart, vilket ogiltigförklarade alla befintliga cookies/sessioner efter eventuell omstart eller uppgradering. Påverkar både "JWT_SECRET" och "API_KEY_SECRET". Stänger #382.---

## [2.5.5] - 2026-03-15

> Dedup-fix för modelllista, fristående Electron-konstruktionshärdning och Kiro-kreditspårning.### 🐛 Bug Fixes

-**fix(modeller) #380**: `GET /api/models` inkluderar nu leverantörsalias när man bygger Active-Provider-filtret — modeller för `claude` (alias `cc`) och `github` (alias `gh`) visades alltid oavsett om en anslutning var konfigurerad, eftersom `PROVIDER_MODELS`-nycklar som tillhandahåller anslutningsalias är s. Fixat genom att utöka varje aktiv leverantörs-ID till att även inkludera dess alias via `PROVIDER_ID_TO_ALIAS`. Stänger #353. -**fix(electron) #379**: Nya `scripts/prepare-electron-standalone.mjs` iscensätter ett dedikerat `/.next/electron-standalone`-paket innan Electron-paketering. Avbryter med ett tydligt fel om `node_modules` är en symbollänk (elektronbyggaren skulle skicka ett körtidsberoende på byggmaskinen). Sanering av plattformsoberoende vägar via "path.basename". Av @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro kreditsaldospårning — användningsändpunkt returnerar nu kreditdata för Kiro-konton genom att anropa `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (samma slutpunkt som Kiro IDE använder internt). Returnerar återstående krediter, total ersättning, förnyelsedatum och prenumerationsnivå. Stänger #337.## [2.5.4] - 2026-03-15

> Logger startfix, login bootstrap säkerhetsfix och dev HMR tillförlitlighetsförbättring. CI-infrastrukturen hårdnar.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Återställ sökväg för pino transportlogger — `formatters.level` kombinerat med `transport.targets` avvisas av pino. Transportstödda konfigurationer tar nu bort nivåformateraren via `getTransportCompatibleConfig()`. Korrigerar också numerisk nivåmappning i `/api/logs/console`: `30→info, 40→varna, 50→fel` (förskjutits med ett). -**fix(login) #375**: Inloggningssidan startar nu från den offentliga `/api/settings/require-login`-slutpunkten istället för den skyddade `/api/settings`. I lösenordsskyddade inställningar fick förautentiseringssidan ett 401 och föll tillbaka till säkra standardinställningar i onödan. Den offentliga rutten returnerar nu all bootstrap-metadata (`requireLogin`, `hasPassword`, `setupComplete`) med en konservativ 200 fallback på fel. -**fix(dev) #374**: Lägg till `localhost` och `127.0.0.1` till `allowedDevOrigins` i `next.config.mjs` — HMR-websocket blockerades vid åtkomst till appen via loopback-adress, vilket producerade upprepade varningar för kors-ursprung.### 🔧 CI & Infrastructure

-**ESLint OOM fix**: `eslint.config.mjs` ignorerar nu `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` och `clipr/**` – ESLint kraschade med en JS-hög OOM genom att skanna VS-kodkompilerade binära blobchsunks. -**Enhetstestfix**: Tog bort inaktuell `ALTER TABLE provider_connections ADD COLUMN "group"` från 2 testfiler — kolumnen är nu en del av basschemat (läggs till i #373), vilket orsakar `SQLITE_ERROR: duplicate column name` vid varje CI-körning. -**Pre-commit hook**: Lade till `npm run test:unit` till `.husky/pre-commit` — enhetstester blockerar nu brutna commits innan de når CI.## [2.5.3] - 2026-03-14

> Kritiska buggfixar: DB-schemamigrering, start-env-laddning, rensning av leverantörsfeltillstånd och i18n-verktygstipsfix. Kod kvalitetsförbättringar ovanpå varje PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Lägg till kolumnen `provider_connections.group` till basschemat + återfyllningsmigrering för befintliga databaser - kolumnen användes i alla frågor men saknades i schemadefinitionen -**fix(i18n) #371**: Ersätt icke-existerande `t("deleteConnection")`-nyckel med befintlig `providers.delete`-nyckel — fixar `MISSING_MESSAGE: providers.deleteConnection` körtidsfel på leverantörens detaljsida -**fix(auth) #372**: Rensa inaktuella felmetadata (`errorCode`, `lastErrorType`, `lastErrorSource`) från leverantörskonton efter äkta återställning - tidigare visades återställda konton hela tiden som misslyckade -**fix(start) #369**: Förena env-laddning över `npm run start`, `run-standalone.mjs` och Electron för att respektera `DATA_DIR/.env → ~/.omniroute/.env → ./.env`-prioritet – förhindrar generering av en ny `STORAGE*ENCRYPTION*-krypterad databas över en befintlig### 🔧 Code Quality

- Dokumenterade "result.success" vs "response?.ok"-mönster i "auth.ts" (båda avsiktliga, nu förklarade)
- Normaliserade `overridePath?.trim()` i `electron/main.js` för att matcha `bootstrap-env.mjs`
- Lade till "preferredEnv" sammanslagningsorderkommentar i Electron-start

> Codex-kontokvotpolicy med automatisk rotation, snabb växling, gpt-5.4-modell och analysetikettfix.### ✨ New Features (PRs #366, #367, #368)

-**Codex Quota Policy (PR #366)**: Per-konto 5 timmar/vecka kvotfönster växlar i leverantörens instrumentpanel. Konton hoppas automatiskt över när aktiverade fönster når 90 % tröskel och tas upp igen efter `resetAt`. Inkluderar "quotaCache.ts" med biverkningsfri status getter. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Inställningar → Codex Service Tier. Default-off toggle injicerar `service_tier: "flex"` endast för Codex-förfrågningar, vilket minskar kostnaden med ~80 %. Full stack: UI-flik + API-slutpunkt + executor + översättare + startåterställning. -**gpt-5.4-modell (PR #368)**: Lägger till `cx/gpt-5.4` och `codex/gpt-5.4` till Codex-modellregistret. Regressionstest ingår.### 🐛 Bug Fixes

-**fix #356**: Analytics-diagram (toppleverantör, efter konto, leverantörsuppdelning) visar nu mänskligt läsbara leverantörsnamn/etiketter istället för råa interna ID:n för OpenAI-kompatibla leverantörer.

> Stor utgåva: strikt slumpmässig routingstrategi, API-nyckel åtkomstkontroller, anslutningsgrupper, extern prissynkronisering och kritiska buggfixar för tänkande modeller, kombinationstestning och validering av verktygsnamn.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle-däck med anti-repeteringsgaranti och mutex serialisering för samtidiga förfrågningar. Oberoende kortlekar per kombination och per leverantör. -**API Key Access Controls**: `allowedConnections` (begränsa vilka anslutningar en nyckel kan använda), `is_active` (aktivera/inaktivera nyckel med 403), `accessSchedule` (tidsbaserad åtkomstkontroll), `autoResolve` växla, byta namn på nycklar via PATCH. -**Anslutningsgrupper**: Gruppera leverantörsanslutningar efter miljö. Dragspelsvy på sidan med gränser med lokal lagringsbeständighet och smart auto-switch. -**Extern prissättningssynkronisering (LiteLLM)**: 3-nivå prissättningsupplösning (användaren åsidosätter → synkroniserad → standardvärden). Anmäl dig via `PRICING_SYNC_ENABLED=true`. MCP-verktyget `omniroute_sync_pricing`. 23 nya tester. -**i18n**: 30 språk uppdaterade med strikt slumpmässig strategi, API-nyckelhanteringssträngar. pt-BR helt översatt.### 🐛 Bug Fixes

-**fix #355**: Strömmens vilotid har ökat från 60s till 300s — förhindrar att modeller med utökat tänkande (claude-opus-4-6, o3, etc.) avbryts under långa resonemangsfaser. Konfigurerbar via `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Kombitestet går nu förbi `REQUIRE_API_KEY=true` med hjälp av intern header och använder OpenAI-kompatibelt format universellt. Timeout förlängd från 15s till 20s. -**fix #346**: Verktyg med tomt `function.name` (vidarebefordrat av Claude Code) filtreras nu innan uppströmsleverantörer tar emot dem, vilket förhindrar "Ogiltig input[N].name: empty string"-fel.### 🗑️ Closed Issues

-**#341**: Felsökningsavsnittet har tagits bort — ersättningen är `/dashboard/logs` och `/dashboard/health`.

> API Key Round-Robin-stöd för multi-key leverantörsinställningar, och bekräftelse på att jokertecken routing och kvotfönster rullar redan på plats.### ✨ New Features

-**API Key Round-Robin (T07)**: Leverantörsanslutningar kan nu hålla flera API-nycklar (Redigera anslutning → Extra API-nycklar). Begär att rotera round-robin mellan primära + extra nycklar via `providerSpecificData.extraApiKeys[]`. Nycklar hålls i minnet indexerade per anslutning — inga ändringar av DB-schema krävs.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` med glob-stil jokerteckenmatchning (`gpt*`, `claude-?-sonnet`, etc.) är redan integrerad i `model.ts` med specificitetsrankning. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` flyttar redan fram fönstret automatiskt - om `Date.now() > entry.until` raderas låset omedelbart (ingen inaktuell blockering).

> Gränssnittspolering, tillägg av routingstrategi och graciös felhantering för användningsgränser.### ✨ New Features

-**Fill-First & P2C Routing Strategies**: Lade till "fill-first" (tömningskvot innan du går vidare) och "p2c" (Power-of-Two-Choices val med låg latens) till kombinationsstrategiväljaren, med fullständiga vägledningspaneler och färgkodade märken. -**Free Stack Preset Models**: Genom att skapa en kombination med Free Stack-mallen automatiskt fylls 7 av klassens bästa gratisleverantörsmodeller (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Användare aktiverar bara leverantörerna och får en kombination av $0/månad direkt. -**Bredare Combo Modal**: Skapa/Redigera combo modal använder nu `max-w-4xl` för bekväm redigering av stora kombinationer.### 🐛 Bug Fixes

-**Limits-sida HTTP 500 för Codex & GitHub**: `getCodexUsage()` och `getGitHubUsage()` returnerar nu ett användarvänligt meddelande när leverantören returnerar 401/403 (förfallen token), istället för att kasta och orsaka ett 500-fel på Limits-sidan. -**MaintenanceBanner falskt-positiv**: Banner visar inte längre "Server är oåtkomlig" falskt vid sidladdning. Fixat genom att anropa `checkHealth()` omedelbart vid montering och ta bort inaktuella `show`-state-stängning. -**Verktygstips för leverantörsikoner**: Redigera (penna) och ta bort ikonknappar i leverantörens anslutningsrad har nu inbyggda HTML-verktygstips - alla 6 åtgärdsikonerna är nu självdokumenterade.

> Flera förbättringar från analys av communityproblem, support för nya leverantörer, buggfixar för tokenspårning, modellrouting och streamingtillförlitlighet.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatiskt modellval baserat på begäran om innehållstyp — kodning → deepseek-chatt, analys → gemini-2.5-pro, vision → gpt-4o, summering → gemini-2.5-flash. Konfigurerbar via Inställningar. Nytt API för `GET/PUT/POST /api/settings/task-routing`. -**HuggingFace Provider**: Lagt till HuggingFace Router som en OpenAI-kompatibel leverantör med Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI-leverantör**: Lade till Vertex AI (Google Cloud)-leverantör med Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Playground File Uploads**: Ljuduppladdning för transkription, bilduppladdning för vision-modeller (automatisk identifiering av modellnamn), inline-bildåtergivning för bildgenereringsresultat. -**Visuell feedback för modellval**: Redan tillagda modeller i kombinationsväljaren visar nu ✓ grönt märke — förhindrar dubblettförvirring. -**Qwen-kompatibilitet (PR #352)**: Uppdaterade User-Agent- och CLI-fingeravtrycksinställningar för Qwen-leverantörskompatibilitet. -**Round-Robin State Management (PR #349)**: Förbättrad round-robin-logik för att hantera uteslutna konton och upprätthålla rotationsstatus korrekt. -**Urklipp UX (PR #360)**: Härdade urklippsoperationer med reserv för osäkra sammanhang; Claude verktyg normalisering förbättringar.### 🐛 Bug Fixes

-**Fix #302 — OpenAI SDK stream=False tappar tool_calls**: T01 Acceptera header-förhandling tvingar inte längre streaming när 'body.stream' är explicit 'false'. Orsakade att tool_calls tyst släpptes när OpenAI Python SDK användes i icke-strömningsläge. -**Fix #73 — Claude Haiku dirigerades till OpenAI utan leverantörsprefix**: `claude-*`-modeller som skickats utan ett providerprefix dirigeras nu korrekt till `antigravity` (antropisk) leverantör. Lade till `gemini-*`/`gemma-*` → `gemini` heuristik också. -**Fix #74 — Token räknas alltid 0 för Antigravity/Claude-streaming**: SSE-händelsen `meddelande_start` som bär `input_tokens` analyserades inte av `extractUsage()`, vilket gjorde att antalet indatatoken minskade. Spårning av in-/utdatatoken fungerar nu korrekt för strömmande svar. -**Fix #180 — Dubletter av modellimport utan feedback**: `ModelSelectModal` visar nu ✓ grön markering för modeller som redan finns i kombinationen, vilket gör det uppenbart att de redan har lagts till. -**Fel vid generering av mediasidor**: Bildresultat renderas nu som "<img>"-taggar istället för rå JSON. Transkriptionsresultat visas som läsbar text. Autentiseringsfel visar en gul banner istället för tyst fel. -**Tokenuppdateringsknapp på leverantörssidan**: Manuell tokenuppdateringsgränssnitt har lagts till för OAuth-leverantörer.### 🔧 Improvements

-**Provider Registry**: HuggingFace och Vertex AI har lagts till i `providerRegistry.ts` och `providers.ts` (gränssnitt). -**Läscache**: Ny `src/lib/db/readCache.ts` för effektiv DB-läscache. -**Quota Cache**: Förbättrad kvotcache med TTL-baserad vräkning.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Arkiv                                         | Syfte                                           |
| --------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Uppgiftsmedveten routinglogik (7 uppgiftstyper) |
| `src/app/api/settings/task-routing/route.ts`  | Task routing config API                         |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuell uppdatering av OAuth-token              |
| `src/lib/db/readCache.ts`                     | Effektiv DB-läscache                            |
| `src/shared/utils/clipboard.ts`               | Härdat urklipp med reserv                       | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combos modal: Free Stack synlig och framträdande**— Free Stack mall var gömd (4:a i rutnät med tre kolumner). Fast: flyttad till position 1, bytte till 2x2 rutnät så att alla 4 mallarna är synliga, grön kant + GRATIS märkesmarkering.## [2.4.0] - 2026-03-13

> **Större release**— Gratis stack-ekosystem, översyn av transkriptionslekplats, 44+ leverantörer, omfattande kostnadsfri dokumentation och förbättringar av användargränssnittet över hela linjen.### Funktioner

-**Kombos: Gratis stackmall**— Ny 4:e mall "Free Stack ($0)" med round-robin över Kiro + Qoder + Qwen + Gemini CLI. Föreslår den förbyggda nollkostnadskombinationen vid första användningen. -**Media/transkription: Deepgram som standard**— Deepgram (Nova 3, $200 gratis) är nu standardtranskriptionsleverantören. AssemblyAI ($50 gratis) och Groq Whisper (gratis för alltid) visas med gratis kreditmärken. -**README: "Starta gratis"-sektionen**— Ny tidig README-tabell i 5 steg som visar hur du ställer in gratis AI på några minuter. -**README: Gratis transkriptionskombination**— Nytt avsnitt med Deepgram/AssemblyAI/Groq-kombinationsförslag och gratis kreditinformation per leverantör. -**providers.ts: hasFree-flagga**— NVIDIA NIM, Cerebras och Groq märkta med hasFree-märket och freeNote för leverantörens användargränssnitt. -**i18n: mallFreeStack-nycklar**— Gratis stackkombinationsmall översatt och synkroniserad till alla 30 språk.## [2.3.16] - 2026-03-13

### Dokumentation

-**README: 44+ leverantörer**— Uppdaterade alla 3 förekomsterna av "36+ leverantörer" till "44+" som återspeglar det faktiska antalet kodbaser (44 leverantörer i providers.ts) -**LÄS MIG: Nytt avsnitt "🆓 Gratis modeller — vad du faktiskt får"**— Tillagd tabell med 7 leverantörer med prisgränser per modell för: Kiro (Claude unlimited via AWS Builder ID), Qoder (5 modeller obegränsat), Qwen (4 modeller obegränsat), Gemini CLI (180K/mo), NVIDIA RIM debra (~40PM de tok/dag / 60K TPM), Groq (30 RPM / 14,4K RPD). Inkluderar rekommendationen \/usr/bin/bash Ultimate Free Stack combo. -**README: Pristabell uppdaterad**— Lade till Cerebras till API KEY-nivån, fixade NVIDIA från "1000 credits" till "dev-forever free", uppdaterade Qoder/Qwen-modeller och namn -**README: Qoder 8→5-modeller**(namn: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4-modeller**(namn: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funktioner

-**Auto-Combo Dashboard (Tier Priority)**: Lade till `🏷️ Tier` som den 7:e poängfaktoretiketten i `/dashboard/auto-combo`-faktoruppdelningsdisplayen - alla 7 Auto-Combo-poängfaktorerna är nu synliga. -**i18n — autoCombo-sektion**: Lade till 20 nya översättningsnycklar för Auto-Combo-instrumentpanelen (`titel`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) till alla 30 språkfiler.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Återställde den giltiga standard `clientSecret` — var tidigare en tom sträng, vilket orsakade "Bad client credentials" vid varje anslutningsförsök. Den offentliga referensen är nu standardalternativet (kan åsidosättas via `QODER_OAUTH_CLIENT_SECRET` env var). -**MITM-servern hittades inte (#335)**: `prepublish.mjs` kompilerar nu `src/mitm/*.ts` till JavaScript med hjälp av `tsc` innan den kopieras till npm-paketet. Tidigare kopierades bara råa `.ts`-filer – vilket betyder att `server.js` aldrig existerade i globala npm/Volta-installationer. -**GeminiCLI saknar projectId (#338)**: Istället för att skicka ett hårt 500-fel när "projectId" saknas från lagrade referenser (t.ex. efter Docker-omstart), loggar OmniRoute nu en varning och försöker förfrågan – returnerar ett meningsfullt fel på leverantörssidan istället för en OmniRoute-krasch. -**Electron version missmatch (#323)**: Synkroniserade `electron/package.json` version till `2.3.13` (var `2.0.13`) så att den binära versionen av skrivbordet matchar npm-paketet.### ✨ New Models (#334)

-**Kiro**: "claude-sonnet-4", "claude-opus-4.6", "deepseek-v3.2", "minimax-m2.1", "qwen3-coder-next", "auto". -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Lade till `tierPriority` (vikt `0,05`) till `ScoringWeights` Zod-schemat och `combos/auto` API-rutten - den 7:e poängfaktorn accepteras nu helt av REST API och valideras vid inmatning. "stabilitet"-vikt justerad från "0,10" till "0,05" för att behålla totalsumman = "1,0".### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: Lade till "tierPriority" som en sjunde poängfaktor — konton med Ultra/Pro-nivåer är nu att föredra framför Free-nivåer när andra faktorer är lika. Nya valfria fält `accountTier` och `quotaResetIntervalSecs` på `ProviderCandidate`. Alla 4 lägespaket uppdaterade ('leveranssnabb', 'kostnadsbesparande', 'kvalitet först', 'offlinevänlig'). -**Intra-Family Model Fallback (T5)**: När en modell inte är tillgänglig (404/400/403), faller OmniRoute nu automatiskt tillbaka till syskonmodeller från samma familj innan ett fel returneras (`modelFamilyFallback.ts`). -**Konfigurerbar API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var låter operatörer ställa in proxy-timeout (standard 30s). Åtgärdar 504-fel på långsamma uppströmssvar. (#332) -**Star History**: Ersätt star-history.com-widgeten med starchart.cc (`?variant=adaptive`) i alla 30 READMEs – anpassar sig till ljust/mörkt tema, realtidsuppdateringar.### 🐛 Bug Fixes

-**Auth — Förstagångslösenord**: `INITIAL_PASSWORD` env var accepteras nu när det första lösenordet för instrumentpanelen ställs in. Använder 'timingSafeEqual' för konstanttidsjämförelse, vilket förhindrar timingattacker. (#333) -**README Trunkering**: Fixade en saknad `</details>` stängningstagg i avsnittet Felsökning som fick GitHub att sluta rendera allt under den (Tech Stack, Docs, Roadmap, Contributors). -**pnpm-installation**: Tog bort redundant "@swc/helpers" åsidosättning från "package.json" som kom i konflikt med det direkta beroendet, vilket orsakade "EOVERRIDE"-fel på pnpm. Lade till konfigurationen "pnpm.onlyBuiltDependencies". -**CLI Path Injection (T12)**: Lade till `isSafePath()`-validator i `cliRuntime.ts` för att blockera vägtraversal och skalmetatecken i `CLI_*_BIN` env vars. -**CI**: Återskapat `package-lock.json` efter borttagning av åsidosättande för att fixa `npm ci`-fel på GitHub Actions.### 🔧 Improvements

-**Svarsformat (T1)**: `responsformat` (json_schema/json_object) injiceras nu som en systemprompt för Claude, vilket möjliggör strukturerad utdatakompatibilitet. -**429 Försök igen (T2)**: Intra-URL-försök igen för 429 svar (2 gånger försök med 2 sekunders fördröjning) innan du går tillbaka till nästa URL. -**Gemini CLI Headers (T3)**: Lade till `User-Agent` och `X-Goog-Api-Client` fingeravtryckshuvuden för Gemini CLI-kompatibilitet. -**Priskatalog (T9)**: Lade till prisposter för `deepseek-3.1`, `deepseek-3.2` och `qwen3-coder-next`.### 📁 New Files

| Arkiv                                      | Syfte                                                        |
| ------------------------------------------ | ------------------------------------------------------------ | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definitioner av modellfamiljer och reservlogik inom familjen | ### Fixed |

-**KiloCode**: timeout för kilokodhälsokontroll har redan fixats i v2.3.11 -**OpenCode**: Lägg till opencode till cliRuntime-registret med 15s hälsokontroll timeout -**OpenClaw / Cursor**: Öka timeout för hälsokontroll till 15 s för varianter med långsam start -**VPS**: Installera droid- och openclaw npm-paket; aktivera CLI_EXTRA_PATHS för kiro-cli -**cliRuntime**: Lägg till registrering av opencode-verktyg och öka timeout för att fortsätta## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Öka "healthcheckTimeoutMs" från 4000ms till 15000ms - kilocode återger en ASCII-logotypbanner vid start som orsakar falska "healthcheck_failed" i långsam-/kallstartsmiljöer## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Åtgärda "check:any-budget:t11"-fel — ersätt "som någon" med "som post<sträng, okänd>" i OAuthModal.tsx (3 förekomster)### Docs

-**CLI-TOOLS.md**: Komplett guide för alla 11 CLI-verktyg (claude, codex, gemini, opencode, cline, kilocode, fortsätt, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md synkroniserad till 30 språk med översatt titel + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/kompletteringar**: Ny äldre slutpunkt för OpenAI-kompletteringar - accepterar både "prompt"-sträng och "meddelanden", normaliseras automatiskt till chattformat -**EndpointPage**: Visar nu alla 3 OpenAI-kompatibla slutpunktstyper: Chat Completions, Responses API och Legacy Completions -**i18n**: Lade till `completionsLegacy/completionsLegacyDesc` till 30 språkfiler### Fixed

-**OAuthModal**: Fixa "[object Object]" som visas på alla OAuth-anslutningsfel - extrahera ".message" korrekt från felsvarsobjekt i alla 3 "throw new Error(data.error)"-anrop (exchange, device-code, authorize)

- Påverkar Cline, Codex, GitHub, Qwen, Kiro och alla andra OAuth-leverantörer## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Lägg till `decodeURIComponent` före base64-avkodning så att URL-kodade autentiseringskoder från återuppringningsadressen tolkas korrekt, vilket åtgärdar "ogiltig eller utgången auktoriseringskod"-fel på fjärrinställningar (LAN IP) -**Cline OAuth**: `mapTokens` fyller nu `namn = förnamn + efternamn || e-post` så att Cline-konton visar riktiga användarnamn istället för "Konto #ID" -**OAuth-kontonamn**: Alla OAuth-utbytesflöden (utbyte, omröstning, omröstning) normaliserar nu `namn = e-post` när namn saknas, så varje OAuth-konto visar sin e-post som visningsetiketten i leverantörernas instrumentpanel -**OAuth-kontonamn**: Borttagen sekventiell "Account N" reserv i `db/providers.ts` — konton utan e-postadress/namn använder nu en stabil ID-baserad etikett via `getAccountDisplayName()` istället för ett sekventiellt nummer som ändras när konton tas bort## [2.3.6] - 2026-03-12

### Fixed

-**Provider testbatch**: Fast Zod-schema för att acceptera `providerId: null` (gränssnittet skickar null för icke-leverantörslägen); returnerade felaktigt "Ogiltig begäran" för alla batchtester -**Provider testmodal**: Fixade "[object Object]"-visning genom att normalisera API-felobjekt till strängar innan rendering i "setTestResults" och "ProviderTestResultsView" -**i18n**: Lade till saknade nycklar `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` till `en.json` -**i18n**: Synkroniserade 1111 saknade nycklar över alla 29 icke-engelska språkfiler med engelska värden som reservdelar## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Lade till permanent `postinstall`-fix för att kopiera `@swc/helpers` till den fristående appens `node_modules` – förhindrar MODULE_NOT_FOUND-krasch vid globala npm-installationer## [2.3.4] - 2026-03-10

### Added

- Flera leverantörsintegrationer och förbättringar av instrumentpanelen
