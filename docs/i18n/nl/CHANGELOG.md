# Changelog (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Oneindige omleidingslus op het dashboard opgelost voor nieuwe exemplaren wanneer requireLogin is uitgeschakeld.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Native integratie met Qoder API:**De Qoder Executor is volledig opnieuw ontworpen om het verouderde COSY AES/RSA-coderingsalgoritme te omzeilen en rechtstreeks naar de native DashScope OpenAi-compatibele URL te routeren. Elimineert complexe afhankelijkheden van 'crypto'-modules van Node en verbetert tegelijkertijd de streamgetrouwheid. -**Resilience Engine Revisie:**Geïntegreerde contextoverloop, sierlijke fallbacks, proactieve OAuth-tokendetectie en preventie van emissie van lege inhoud (#990). -**Context-geoptimaliseerde routeringsstrategie:**Nieuwe intelligente routeringsmogelijkheden toegevoegd om contextvensters native te maximaliseren in geautomatiseerde combo-implementaties (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Een diepgaande corruptie bij het klonen opgelost waarbij Anthropic/OpenAI-vertaalgrenzen `response.`-specifieke SSE-voorvoegsels verwijderden van streaminggrenzen (#992). -**Claude Cache Passthrough-uitlijning:**Uitgelijnde CC-compatibele cachemarkeringen consistent met upstream Client Pass-Through-modus, waarbij promptcaching behouden blijft. -**Turbopack Memory Leak:**Next.js vastgezet op strikt `16.0.10` om geheugenlekken te voorkomen en verouderde builds te maken van recente upstream Turbopack gehashte moduleregressies (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-integratie:**Geïntegreerde models.dev als de gezaghebbende runtimebron voor modelprijzen, mogelijkheden en specificaties, waarbij hardgecodeerde prijzen worden overschreven. Bevat een gebruikersinterface voor instellingen om synchronisatie-intervallen te beheren, vertaalreeksen voor alle 30 talen en robuuste testdekking. -**Provider Native Mogelijkheden:**Ondersteuning toegevoegd voor het declareren en controleren van native API-functies (bijvoorbeeld `systemInstructions_supported`) om fouten te voorkomen door ongeldige rollen op te schonen. Momenteel geconfigureerd voor Gemini Base- en Antigravity OAuth-providers. -**Geavanceerde API-providerinstellingen:**Aangepaste 'User-Agent'-overschrijvingen per verbinding toegevoegd voor API-sleutelproviderverbindingen. De overschrijving wordt opgeslagen in `providerSpecificData.customUserAgent` en is nu van toepassing op validatietests en upstream-uitvoeringsverzoeken.### 🐛 Bug Fixes

-**Qwen OAuth-betrouwbaarheid:**Een reeks OAuth-integratieproblemen opgelost, waaronder een 400 Bad Request-blokkering op verlopen tokens, fallback-generatie voor het parseren van OIDC `access_token`-eigenschappen wanneer `id_token` is weggelaten, detectiefouten in de modelcatalogus en strikte filtering van `X-Dashscope-*`-headers om 400-afwijzing van OpenAI-compatibele eindpunten te voorkomen.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Voltooide native CRUD-levenscyclusintegratie voor de geavanceerde Auto-Combo-engine (#955). -**Kernbewerkingen:**Ontbrekende vertalingen opgelost voor nieuwe native Auto-Combo-opties (#955). -**Beveiligingsvalidatie:**SQLite automatische back-uptaken zijn standaard uitgeschakeld tijdens de CI-uitvoering van de unittest om expliciet geheugenlekken in Node 22 Event Loop op te lossen (#956). -**Ecosysteemproxy's:**Voltooide synchronisatieplanners voor expliciete integratietoewijzingsmodellen, OAuth-cycli en tokencontrole worden veilig vernieuwd via de eigen upstream-proxy's van OmniRoute (#953). -**MCP-uitbreidbaarheid:**De nieuwe `omniroute_web_search` MCP-frameworktool uit bèta toegevoegd en met succes geregistreerd in productieschema's (#951). -**Tokensbufferlogica:**Runtime-configuratielimieten toegevoegd, waardoor configureerbare invoer-/uitvoertokenbuffers worden uitgebreid voor nauwkeurige gebruikstrackingstatistieken (#959).### 🐛 Bug Fixes

-**CodeQL-herstel:**Volledig opgeloste en beveiligde kritieke stringindexeringsbewerkingen die SSRF-arrays (Server-Side Request Forgery) indexeren, naast polynomiale algoritmische backtracking (ReDoS) in deep proxy dispatcher-modules. -**Crypto-hashes:**Zwakke, niet-geverifieerde oudere OAuth 1.0-hashes vervangen door robuuste HMAC-SHA-256 standaardvalidatieprimitieven die zorgen voor strenge toegangscontroles. -**API Boundary Protection:**Correct geverifieerde en in kaart gebrachte structurele routebeveiligingen die strikte `isAuthenticated()` middleware-logica afdwingen die nieuwere dynamische eindpunten omvat, gericht op manipulatie van instellingen en het laden van native vaardigheden. -**CLI Ecosystem Compat:**Opgelost: gebroken native runtime parser-bindingen die `where`-omgevingsdetectoren strikt crashten boven `.cmd/.exe` edge-cases, netjes voor externe plug-ins (#969). -**Cache-architectuur:**Refactored van exacte dashboardparameters voor analyse en systeeminstellingen, lay-outstructuur caching om stabiele persistentiecycli voor rehydratatie te behouden en visuele niet-uitgelijnde statusflitsen op te lossen (#952). -**Claude Caching-standaarden:**Genormaliseerde en nauwkeurig strikt bewaarde kritische kortstondige blokmarkeringen `efemere` caching TTL-orders voor downstream-knooppunten die standaard compatibele CC-verzoeken afdwingen, netjes in kaart brengen zonder verloren statistieken (#948). -**Interne aliassenverificatie:**Vereenvoudigde interne runtime-toewijzingen die het opzoeken van de payload van Codex-referenties normaliseren binnen globale vertaalparameters en 401 niet-geverifieerde drops (#958) oplossen.### 🛠️ Maintenance

-**Ontdekbaarheid van de gebruikersinterface:**Correct aangepaste lay-outcategorisaties waarbij de logica van free-tier providers expliciet wordt gescheiden, waardoor de UX-sorteerstromen binnen de algemene API-registerpagina's (#950) worden verbeterd. -**Implementatietopologie:**Unified Docker-implementatieartefacten die ervoor zorgen dat de root `fly.toml` out-of-the-box overeenkomt met de verwachte cloudinstantieparameters, waardoor geautomatiseerde implementaties op de juiste manier worden geschaald. -**Ontwikkeltooling:**Ontkoppelde runtimeparameters van `LKGP` in expliciete cachehulpprogramma's voor abstractie van de DB-laag, waardoor strikte testisolatiedekking voor kerncachinglagen veilig wordt gewaarborgd.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**De gebruikersinterface van `/dashboard/auto-combo` is volledig opnieuw ontworpen om naadloos te integreren met native Dashboard-kaarten en gestandaardiseerde visuele opvulling/headers. Dynamische visuele voortgangsbalken toegevoegd die de gewichtsmechanismen van modelselectie in kaart brengen. -**Instellingen Routing Sync:**Volledig blootgestelde geavanceerde routing `prioriteit` en `gewogen` schemadoelen intern binnen de fallback-lijsten van globale instellingen.### Bug Fixes

-**Lokale knooppunten voor geheugen en vaardigheden:**Lege weergavetags voor geheugen- en vaardighedenopties rechtstreeks in de globale instellingenweergaven opgelost door alle `settings.*`-toewijzingswaarden intern in `en.json` te bedraden (ook impliciet toegewezen voor tools voor kruisvertaling).### Internal Integrations

- Geïntegreerde PR #946 - oplossing: behoud Claude Code-compatibiliteit bij de conversie van antwoorden
- Geïntegreerde PR #944 - fix(gemini): behoud gedachtesignaturen bij oproepen van anti-zwaartekrachttools
- Geïntegreerde PR #943 – oplossing: herstel de body van GitHub Copilot
- Geïntegreerde PR #942 — Repareer cc-compatibele cachemarkeringen
- Geïntegreerde PR #941 — refactor(auth): verbetering van het opzoeken van NVIDIA-aliasen + toevoegen van LKGP-foutregistratie
- Geïntegreerde PR #939 — Herstel Claude OAuth localhost callback-verwerking
- _(Opmerking: PR #934 is weggelaten uit cyclus 3.4.9 om regressie van kernconflicten te voorkomen)_---

## [3.4.8] — 2026-04-03

### Beveiliging

- Alle openstaande bevindingen van Github Advanced Security (CodeQL) en Dependabot-waarschuwingen volledig hersteld.
- Onveilige kwetsbaarheden in willekeur opgelost door te migreren van `Math.random` naar `crypto.randomUUID()`.
- Beveiligde shell-opdrachten in geautomatiseerde scripts via stringinjectie.
- Gemigreerde kwetsbare catastrofale backtracking-RegEx-parseerpatronen in chat-/vertaalpijplijnen.
- Verbeterde controles voor het opschonen van de uitvoer binnen de React UI-componenten en de injectie van Server Sent Events (SSE)-tags.---

## [3.4.7] — 2026-04-03

### Functies

- 'Cryptography'-knooppunt toegevoegd aan monitoring- en MCP-gezondheidscontroles (#798)
- Versterkte toewijzing van routerechten in de modelcatalogus (`/models`) (#781)### Bug Fixes

- Probleem opgelost waarbij Claude OAuth-tokenvernieuwingen de cachecontexten niet konden behouden (#937)
- Vaste CC-compatibele providerfouten waardoor modellen in de cache onbereikbaar worden (#937)
- Vaste GitHub Executor-fouten gerelateerd aan ongeldige contextarrays (#937)
- Probleem met de gezondheidscontrole van door NPM geïnstalleerde CLI-tools opgelost op Windows (#935)
- Probleem opgelost waarbij de vertaling van de payload geldige inhoud weglaat vanwege ongeldige API-velden (#927)
- Vaste runtime-crash in knooppunt 25 met betrekking tot de uitvoering van API-sleutels (#867)
- Vaste MCP standalone module-resolutie (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Vaste NVIDIA NIM-routeringsreferentieresolutie alias komt niet overeen (#931)### Beveiliging

- Veilige, strikte invoergrensbescherming toegevoegd tegen onbewerkte `shell: true` injecties van externe code.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Aanbieders:**Geregistreerde nieuwe aanbieders van beeld-, video- en audiogeneratie uit de door de community aangevraagde lijst (#926). -**Dashboard-UI:**Standalone zijbalknavigatie toegevoegd voor de nieuwe geheugen- en vaardighedenmodules (#926). -**i18n:**Vertaalreeksen en lay-outtoewijzingen toegevoegd in 30 talen voor de naamruimten Geheugen en Vaardigheden.### 🐛 Bug Fixes

-**Veerkracht:**Voorkwam dat de proxy-stroomonderbreker voor onbepaalde tijd vastliep in een OPEN-status door directe overgangen naar de GESLOTEN-status af te handelen binnen fallback-combopaden (#930). -**Protocolvertaling:**De streamingtransformator is gepatcht om responsblokken op te schonen op basis van het verwachte _source_-protocol in plaats van het _target_-protocol van de provider, waardoor Anthropics-modellen zijn opgelost die zijn verpakt in OpenAI-payloads waardoor Claude Code (#929) crasht. -**API-specificaties en Gemini:**Het parseren van `thought_signature` in `openai-to-gemini` en `claude-to-gemini` vertalers is opgelost, waardoor HTTP 400-fouten bij alle Gemini 3 API-toolaanroepen worden voorkomen. -**Providers:**Niet-OpenAI-compatibele eindpunten opgeschoond waardoor geldige upstream-verbindingen worden voorkomen (#926). -**Cachetrends:**Een ongeldige eigenschapstoewijzingsgegevens die niet overeenkomen waardoor de UI-diagrammen van Cache Trends vastlopen, zijn opgelost en overtollige cache-metrische widgets zijn geëxtraheerd (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI Ecosysteemintegratie:**De `cliproxyapi`-uitvoerder toegevoegd met ingebouwde caching op moduleniveau en proxyrouting. Er is een uitgebreide versiebeheerservice geïntroduceerd om de status automatisch te testen, binaire bestanden van GitHub te downloaden, geïsoleerde achtergrondprocessen voort te brengen en de levenscyclus van externe CLI-tools direct via de gebruikersinterface netjes te beheren. Bevat DB-tabellen voor proxyconfiguratie om automatische SSRF-gated cross-routing van externe OpenAI-verzoeken via de lokale CLI-toollaag (#914, #915, #916) mogelijk te maken. -**Qoder PAT-ondersteuning:**Geïntegreerde Personal Access Tokens (PAT)-ondersteuning rechtstreeks via het lokale `qodercli`-transport in plaats van oudere externe `.cn`-browserconfiguraties (#913). -**Gemini 3.1 Pro Preview (GitHub):**`gemini-3.1-pro-preview` canonieke expliciete modelondersteuning toegevoegd aan de GitHub Copilot-provider, terwijl oudere routeringsaliassen (#924) behouden blijven.### 🐛 Bug Fixes

-**GitHub Copilot Token Stabiliteit:**De Copilot token vernieuwingslus gerepareerd waarbij verouderde tokens niet diep in de DB werden samengevoegd, en `reasoning_text` velden verwijderd die downstream Antropische blokconversies voor multi-turn chats fataal kapotmaakten (#923). -**Algemene time-outmatrix:**Gecentraliseerde en geparametriseerde time-outs voor verzoeken expliciet vanuit `REQUEST_TIMEOUT_MS` om te voorkomen dat verborgen (~300s) standaard ophaalbuffers voortijdig langlevende SSE-streamingreacties van zware redeneringsmodellen (#918) afsnijden. -**Cloudflare Quick Tunnels State:**Een ernstige statusinconsistentie opgelost waarbij opnieuw opgestarte OmniRoute-instanties vernietigde tunnels ten onrechte als actief weergaven, en standaard cloudflared-tunneling naar `HTTP/2` om UDP-ontvangstbufferlogspam (#925) te elimineren. -**i18n vertalingsrevisie (Tsjechisch en Hindi):**Hindi-code van DEPRECATED `in.json` naar canonieke `hi.json` gerepareerd, Tsjechische teksttoewijzingen gereviseerd, `untranslatable-keys.json` geëxtraheerd om CI/CD vals-positieve validaties te repareren, en uitgebreide `I18N.md`-documenten gegenereerd om vertalers te begeleiden (#912). -**Tokens Provider Recovery:**Probleem opgelost waarbij Qwen specifieke `resourceUrl`-eindpunten verloor nadat het token automatisch werd vernieuwd vanwege ontbrekende DB-diepe samenvoegingen (#917). -**CC-compatibele UX en streaming:**Unificeerde de Add CC/OpenAI/Anthropic-compatibele acties rond de Anthropic UI-behandeling, dwong CC-compatibele upstream-verzoeken om SSE te gebruiken terwijl nog steeds streaming of niet-streaming-reacties werden geretourneerd op basis van het clientverzoek, verwijderde CC-modellijstconfiguratie/importondersteuning ten gunste van een expliciete, niet-ondersteunde modellijstfout, en maakte CC-compatibele beschikbare modellen een spiegel van de OAuth Claude Code-registratielijst (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Zend `response.completed` uit met de juiste `input_tokens`/`output_tokens` velden voor Codex CLI-clients, waarbij de weergave van het tokengebruik wordt hersteld (#909 - bedankt @christopher-s). -**SQLite WAL-controlepunt bij afsluiten:**Spoel WAL-wijzigingen door naar het primaire databasebestand tijdens correct afsluiten/herstarten, waardoor gegevensverlies bij Docker-containerstops wordt voorkomen (#905 — bedankt @rdself). -**Sierlijk afsluitsignaal:**`/api/restart` en `/api/shutdown` routes gewijzigd van `process.exit(0)` naar `process.kill(SIGTERM)`, waardoor de shutdown-handler wordt uitgevoerd vóór het afsluiten. -**Docker Stop Respijtperiode:**`stop_grace_period: 40s` toegevoegd aan Docker Compose-bestanden en `--stop-timeout 40` aan Docker-uitvoeringsvoorbeelden.### 🛠️ Maintenance

- 5 opgeloste/geen-bug-problemen gesloten (#872, #814, #816, #890, #877).
- 6 problemen met behoefteninformatieverzoeken (#892, #887, #886, #865, #895, #870) onderzocht.
- Gereageerd op het probleem met het volgen van CLI-detectie (#863) met begeleiding voor bijdragers.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Voltooide injectie van geheugen en vaardigheden op afstand voor de Antigravity-provider op proxy-netwerkniveau. -**Claude Code-compatibiliteit:**Een native verborgen compatibiliteitsbrug gebouwd voor Claude Code, waarbij tools en opmaak netjes worden doorgegeven. -**Web Search MCP:**De tool `omniroute_web_search` toegevoegd met het bereik `execute:search`. -**Cachecomponenten:**Implementeerde dynamische cachecomponenten met behulp van TDD. -**UI en aanpassing:**Aangepaste favicon-ondersteuning, uiterlijktabbladen, bekabelde whitelabeling aan de zijbalk toegevoegd en windsurfgidsstappen toegevoegd in alle 33 talen. -**Logboekbehoud:**Uniforme retentie van verzoeklogboeken en native artefacten. -**Modelverbeteringen:**Expliciete `contextLength` toegevoegd voor alle opencode-zen-modellen. -**i18n en vertalingen:**native geïntegreerde vertalingen in 33 talen, inclusief placeholder CI-validaties en Chinese documentatie-updates (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**De afhankelijkheid van `id_token` naar `access_token` is teruggedraaid en dynamische `resource_url` API-eindpuntinjectie is ingeschakeld voor de juiste regionale routering (#900). -**Model Sync Engine:**De strikte interne provider-ID opgeslagen in `getCustomModels()` synchronisatieroutines in plaats van het UI Channel Alias-formaat, waardoor fouten bij het invoegen van SQLite-catalogussen voorkomen (#903). -**Claude Code & Codex:**Gestandaardiseerde niet-streaming blanco antwoorden op Anthropic-geformatteerd `(lege respons)` om CLI-proxycrashes te voorkomen (#866). -**CC-compatibele routering:**Dubbele `/v1`-eindpuntbotsing opgelost tijdens padaaneenschakeling voor generieke Claude Code-gateways (#904). -**Antigravity Dashboards:**Geblokkeerd dat onbeperkte quotamodellen zich ten onrechte registreren als uitgeputte limietstatussen voor '100% gebruik' in de gebruikersinterface van de provider (#857). -**Claude Image Passthrough:**Probleem opgelost waarbij Claude-modellen de afbeeldingsblokpassthroughs misten (#898). -**Gemini CLI Routing:**403 autorisatieblokkeringen en problemen met de accumulatie van inhoud opgelost door de project-ID te vernieuwen via `loadCodeAssist` (#868). -**Anti-zwaartekrachtstabiliteit:**Gecorrigeerde modeltoegangslijsten, 404-uitsluitingen afgedwongen, 429-cascades gerepareerd die standaardverbindingen blokkeerden, en gelimiteerde `gemini-3.1-pro`-uitvoertokens (#885). -**Provider synchronisatiecadans:**De provider beperkt de synchronisatiecadans via de interne planner (#888). -**Dashboard-optimalisatie:**Probleem opgelost met `/dashboard/limits` UI-bevriezing bij het verwerken van meer dan 70 accounts via chunk-parallellisatie (#784). -**SSRF-verharding:**Dwingt strikte SSRF IP-bereikfiltering af en blokkeert de `::1` loopback-interface. -**MIME-typen:**Gestandaardiseerd `mime_type` naar snake_case om te voldoen aan de Gemini API-specificaties. -**CI-stabilisatie:**Vaste falende analyses/instellingen Playwright-selectors en verzoekbeweringen, zodat GitHub Actions E2E-uitvoeringen betrouwbaar worden doorgegeven via gelokaliseerde gebruikersinterfaces en op schakelaars gebaseerde bedieningselementen. -**Deterministische tests:**Datumgevoelige quota-fixes verwijderd uit Copilot-gebruikstests en idempotentie-/modelcatalogustests afgestemd op het samengevoegde runtime-gedrag. -**MCP-typeverharding:**Zero-budget expliciete `alle` regressies verwijderd uit het registratiepad van de MCP-servertool. -**Modelsynchronisatie-engine:**Destructieve 'vervang'-overschrijvingen zijn omzeild wanneer de automatische synchronisatie van de provider een lege modellenlijst oplevert, waardoor de stabiliteit voor dynamische catalogi (#899) behouden blijft.### 🛠️ Maintenance

-**Pipeline-logboekregistratie:**Verfijnde pijplijnlogboekartefacten en handhavingslimieten (#880). -**AGENTS.md Revisie:**Gecondenseerd van 297 → 153 regels. Richtlijnen voor bouwen/testen/stijl toegevoegd, codeworkflows (Prettier, TypeScript, ESLint) en bijgesneden uitgebreide tabellen (#882). -**Release Branch-integratie:**De actieve feature-takken geconsolideerd in `release/v3.4.2` bovenop de huidige `main` en de branch gevalideerd met lint, unit, dekking, build en E2E-runs in CI-modus. -**Testen:**Vitest-configuratie toegevoegd voor het testen van componenten en Playwright-specificaties voor instellingenschakelaars. -**Doc-updates:**Uitgebreide root-leesmijlen, native Chinese documenten vertaald en verouderde bestanden opgeschoond.## [3.4.1] - 2026-03-31

> [!WAARSCHUWING]
> **BREAKING CHANGE: verzoekregistratie, retentie en logboekomgevingsvariabelen zijn opnieuw ontworpen.**
> Bij de eerste keer opstarten na het upgraden archiveert OmniRoute verouderde verzoeklogboeken van `DATA_DIR/logs/`, verouderd `DATA_DIR/call_logs/` en `DATA_DIR/log.txt` in `DATA_DIR/log_archives/*.zip`, verwijdert vervolgens de verouderde lay-out en schakelt over naar het nieuwe uniforme artefactformaat onder `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**Bevat `scripts/migrate-env.mjs` om `<v3.3`-configuraties naadloos te migreren naar `v3.4.x` strikte beveiligingsvalidatiebeperkingen (FASE-01), waardoor opstartcrashes worden gerepareerd die worden veroorzaakt door korte `JWT_SECRET`-instanties. -**Kiro AI Cache-optimalisatie:**Implementeerde deterministische 'conversationId'-generatie (uuidv5) om AWS Builder ID Prompt Caching op de juiste manier mogelijk te maken voor alle aanroepen (#814). -**Herstel en consolidatie van de dashboard-UI:**De zijbalklogica is opgelost waarbij de sectie Debug is weggelaten, en de routeringswaarschuwingen van Nextjs zijn gewist door zelfstandige `/dashboard/mcp`- en `/dashboard/a2a`-pagina's expliciet naar de ingebedde Endpoint Proxy UI-componenten te verplaatsen. -**Unified Request Log Artefacten:**Bij het loggen van verzoeken wordt nu één SQLite-indexrij plus één JSON-artefact per verzoek opgeslagen onder `DATA_DIR/call_logs/`, met optionele pijplijnopname ingebed in hetzelfde bestand. -**Taal:**Verbeterde Chinese vertaling (#855) -**Opencode-Zen-modellen:**4 gratis modellen toegevoegd aan opencode-zen-register (#854) -**Tests:**Unit- en E2E-tests toegevoegd voor het schakelen tussen instellingen en bugfixes (#850)### 🐛 Bug Fixes

-**429 Quota parseren:**Lange quota-resettijden van foutinstanties geparseerd om correcte back-offs te honoreren en accountverboden met beperkte snelheid te voorkomen (#859) -**Prompt Caching:**Bewaarde client `cache_control` headers voor alle Claude-protocol providers (zoals Minimax, GLM en Bailian), waarbij caching-ondersteuning correct wordt herkend (#856) -**Modelsynchronisatielogboeken:**Logspam verminderd door `sync-modellen` alleen op te nemen wanneer het kanaal de lijst daadwerkelijk wijzigt (#853) -**Provider Quota & Token Parsing:**Antigravity-limieten gewijzigd om `retrieveUserQuota` native te gebruiken en correct toegewezen Claude-tokenvernieuwingspayloads aan URL-gecodeerde formulieren (#862) -**Snelheidsbeperkende stabiliteit:**Universalisatie van de 429 Retry-After-parsing-architectuur om door de provider veroorzaakte cooldowns van maximaal 24 uur te beperken (#862) -**Dashboard Limit Rendering:**Opnieuw ontworpen `/dashboard/limits` quotatoewijzing om onmiddellijk binnen chunks weer te geven, waardoor een grote vertraging van het bevriezen van de UI wordt opgelost bij accounts met meer dan 70 actieve verbindingen (#784) -**QWEN OAuth-autorisatie:**De OIDC `id_token` toegewezen als het primaire API Bearer-token voor Dashscope-verzoeken, waardoor onmiddellijke 401-ongeautoriseerde fouten worden opgelost na het verbinden van accounts of het vernieuwen van tokens (#864) -**ZAI API-stabiliteit:**Versterkte door de server verzonden gebeurtenissen-compiler om op een elegante manier terug te vallen op lege tekenreeksen wanneer DeepSeek-providers wiskundig nulinhoud streamen tijdens redeneerfasen (#871) -**Claude Code/Codex Translations:**Beschermde niet-streaming payload-conversies tegen lege reacties van upstream Codex-tools, waardoor catastrofale TypeErrors worden vermeden (#866) -**NVIDIA NIM Rendering:**Voorwaardelijk verwijderde identieke providervoorvoegsels die dynamisch worden gepusht door audiomodellen, waardoor dubbele `nim/nim`-tagstructuren worden geëlimineerd die 404 op de Media Playground gooien (#872)### ⚠️ Breaking Changes

-**Logboekindeling aanvragen:**De oude 'DATA*DIR/logs/'-aanvraaglogsessies met meerdere bestanden en het samenvattingsbestand 'DATA_DIR/log.txt' zijn verwijderd. Nieuwe verzoeken worden geschreven als enkele JSON-artefacten in `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Omgevingsvariabelen loggen:**`LOG*_`, `ENABLE*REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`en`PROXY_LOG_MAX_ENTRIES`vervangen door het nieuwe`APP_LOG*_`en`CALL_LOG_RETENTION_DAYS`configuratiemodel.
-**Pipeline Toggle-instelling:**De verouderde`detailed_logs_enabled`instelling vervangen door`call_log_pipeline_enabled`. Nieuwe pijplijndetails worden ingebed in het verzoekartefact in plaats van te worden opgeslagen als afzonderlijke 'request_detail_logs'-records.### 🛠️ Maintenance

-**Legacy Request Log Upgrade Backup:**Upgrades archiveren nu oude `data/logs/`, legacy `data/call_logs/` en `data/log.txt` lay-outs in `DATA_DIR/log_archives/*.zip` voordat de verouderde structuur wordt verwijderd. -**Persistentie streaminggebruik:**Streamingverzoeken schrijven nu een enkele 'usage_history'-rij na voltooiing in plaats van een dubbele lopende gebruiksrij uit te zenden met lege statusmetagegevens. -**Vervolgopschoning van logboeken:**Pijplijnlogboeken leggen niet langer `SOURCE REQUEST` vast, verzoekartefactinvoeren respecteren nu `CALL_LOG_MAX_ENTRIES`, en archieven van toepassingslogboeken respecteren nu `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Functies

-**Abonnementgebruiksanalyse:**Het bijhouden van tijdreeksen van quota-snapshots, het tabblad Providergebruik en Combostatus toegevoegd met visualisaties van nieuwe grafieken en bijbehorende API-eindpunten (#847) -**SQLite Backup Control:**Nieuwe `OMNIROUTE_DISABLE_AUTO_BACKUP` env-vlag om automatische SQLite-back-ups uit te schakelen (#846) -**Modelregisterupdate:**`gpt-5.4-mini` geïnjecteerd in de reeks modellen van de Codex-provider (#756) -**Providerlimieten bijhouden:**Volg en toon wanneer de tarieflimieten van de provider voor het laatst zijn vernieuwd per account (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Qwen OAuth-voltooiingen opnieuw gerouteerd van de DashScope API naar de Web Inference API (`chat.qwen.ai`), waardoor autorisatiefouten zijn opgelost (#844, #807, #832) -**Qwen Auto-Retry Loop:**Gerichte 429 Quota toegevoegd Overschreden afhandeling van back-off binnen `chatCore` ter bescherming van burst-verzoeken -**Codex OAuth Fallback:**Het blokkeren van moderne browserpop-ups houdt de gebruiker niet langer gevangen; het valt automatisch terug naar handmatige URL-invoer (#808) -**Claude Token Refresh:**De strikte `application/json`-grenzen van Anthropic worden nu gerespecteerd tijdens het genereren van tokens in plaats van gecodeerde URL's (#836) -**Codex-berichtenschema:**Gestripte puristische 'berichten'-injecties van native passthrough-verzoeken om structurele afwijzingen van de ChatGPT upstream te voorkomen (#806) -**CLI-detectiegroottelimiet:**De bovengrens voor binair scannen van Node is veilig verhoogd van 100 MB naar 350 MB, waardoor zware standalone tools zoals Claude Code (229 MB) en OpenCode (153 MB) correct konden worden gedetecteerd door de VPS-runtime (#809) -**CLI Runtime Environment:**Herstelde mogelijkheid voor CLI-configuraties om paden voor gebruikersoverschrijvingen (`CLI_{PROVIDER}_BIN`) te respecteren, waarbij strikte padgebonden detectieregels worden omzeild -**Nvidia-headerconflicten:**`prompt_cache_key`-eigenschappen verwijderd uit upstream-headers bij het aanroepen van niet-antropische providers (#848) -**Codex Fast Tier Toggle:**Hersteld Codex-servicelaag-wisselcontrast in lichte modus (#842) -**Testinfrastructuur:**Bijgewerkte `t28-model-catalog-updates`-test die ten onrechte het verouderde DashScope-eindpunt voor het Qwen-native register verwachtte---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Aangepaste providerrotatie:**Geïntegreerd `getRotatingApiKey` intern in DefaultExecutor, waardoor de rotatie van `extraApiKeys` correct wordt geactiveerd voor aangepaste en compatibele upstream-providers (#815)---

## [3.3.8] - 2026-03-30

### Functies

-**Models API-filtering:**Eindpunt `/v1/models` filtert nu dynamisch zijn lijst op basis van de machtigingen die zijn gekoppeld aan de `Authorisatie: Bearer <token>` wanneer beperkte toegang is ingeschakeld (#781) -**Qoder-integratie:**Native integratie voor Qoder AI, ter vervanging van de oudere iFlow-platformtoewijzingen (#660) -**Prompt Cache Tracking:**Trackingmogelijkheden en frontend-visualisatie (statistiekenkaart) toegevoegd voor semantische en prompt caching in de Dashboard-gebruikersinterface### 🐛 Bug Fixes

-**Cachedashboardgrootte:**Verbeterde UI-indelingsgroottes en contextheaders voor de geavanceerde cachepagina's (#835) -**Zichtbaarheid van de zijbalk opsporen:**Er is een probleem opgelost waarbij de foutopsporingsschakelaar de foutopsporingsdetails van de zijbalk niet correct kon tonen/verbergen (#834) -**Gemini-modelvoorvoegsel:**De fallback van de naamruimte gewijzigd om correct te routeren via `gemini-cli/` in plaats van `gc/` om de upstream-specificaties te respecteren (#831) -**OpenRouter Sync:**Verbeterde compatibiliteitssynchronisatie om de beschikbare modellencatalogus automatisch correct op te nemen van OpenRouter (#830) -**Streaming Payloads Mapping:**Reserialisatie van redeneervelden lost conflictaliaspaden native op wanneer uitvoer naar edge-apparaten wordt gestreamd---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Gegenereerde `opencode.json` geherstructureerd om het `@ai-sdk/openai-compatibel` op records gebaseerde schema te gebruiken met `options` en `models` als objecttoewijzingen in plaats van platte arrays, waarbij configuratievalidatiefouten zijn opgelost (#816) -**i18n Ontbrekende sleutels:**Ontbrekende `cloudflaredUrlNotice` vertaalsleutel toegevoegd aan alle 30 taalbestanden om `MISSING_MESSAGE` consolefouten op de eindpuntpagina te voorkomen (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Inclusief prompt cache-tokens veilig in berekeningen van historische gebruiksinvoer voor correcte quotumaftrek (PR #822) -**Combotestsondes:**Fout-negatieve combo-testlogica opgelost door het parseren van alleen-redeneringsreacties op te lossen en massale parallellisatie mogelijk te maken via Promise.all (PR #828) -**Docker Quick Tunnels:**Ingebedde vereiste ca-certificaten in de basisruntimecontainer om opstartfouten van Cloudflared TLS op te lossen, en opgedoken stdout-netwerkfouten ter vervanging van generieke exitcodes (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Real-time Gemini CLI quota tracking toegevoegd via de `retrieveUserQuota` API (PR #825) -**Cache Dashboard:**Verbeterd het Cache Dashboard om snelle cachestatistieken, 24-uurstrends en geschatte kostenbesparingen weer te geven (PR #824)### 🐛 Bug Fixes

-**Gebruikerservaring:**Invasieve, automatisch openende OAuth-modale lussen verwijderd op onvruchtbare gedetailleerde pagina's van providers (PR #820) -**Afhankelijkheidsupdates:**Afhankelijkheden voor ontwikkelings- en productiebomen opgeheven en vergrendeld, waaronder Next.js 16.2.1, Recharts en TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A-workflows:**Een deterministische FSM-orkestrator toegevoegd voor agentworkflows met meerdere stappen. -**Graceful Degradation:**Een nieuw meerlaags fallback-framework toegevoegd om de kernfunctionaliteit te behouden tijdens gedeeltelijke systeemuitval. -**Config Audit:**Een audit trail toegevoegd met diff-detectie om wijzigingen bij te houden en configuratie-rollbacks mogelijk te maken. -**Provider Health:**Het bijhouden van de vervaldatum van de provider is toegevoegd met proactieve UI-waarschuwingen voor verlopende API-sleutels. -**Adaptieve routering:**Een adaptieve volume- en complexiteitsdetector toegevoegd om routeringsstrategieën dynamisch te overschrijven op basis van de belasting. -**Diversiteit van providers:**Implementatie van diversiteitsscores van providers via Shannon-entropie om de verdeling van de belasting te verbeteren. -**Grenzen automatisch uitschakelen:**Er is een schakelaar voor het automatisch uitschakelen van verboden accounts toegevoegd aan het veerkrachtdashboard.### 🐛 Bug Fixes

-**Codex- en Claude-compatibiliteit:**Vaste UI-fallbacks, patchte Codex-niet-streaming-integratieproblemen en opgeloste CLI-runtime-detectie op Windows. -**Release-automatisering:**Uitgebreide machtigingen vereist voor de Electron App ingebouwde GitHub-acties. -**Cloudflare Runtime:**Correcte runtime-isolatie-exitcodes voor Cloudflared-tunnelcomponenten opgelost.### 🧪 Tests

-**Testsuite-updates:**Uitgebreide testdekking voor volumedetectoren, providerdiversiteit, configuratie-audit en FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-betrouwbaarheid:**GitHub-acties gepatcht naar stabiele afhankelijkheidsversies (`actions/checkout@v4`, `actions/upload-artifact@v4`) om onaangekondigde beëindiging van de bouweromgeving te beperken. -**Afbeeldingsfallbacks:**Willekeurige fallback-ketens in `ProviderIcon.tsx` vervangen door expliciete activavalidatie om te voorkomen dat de UI `<Image>` componenten laadt voor bestanden die niet bestaan, waardoor `404`-fouten in dashboardconsolelogboeken (#745) worden geëlimineerd. -**Admin Updater:**Dynamische broninstallatiedetectie voor de dashboard Updater. Schakelt op veilige wijze de knop 'Nu bijwerken' uit wanneer OmniRoute lokaal is gebouwd in plaats van via npm, waarbij wordt gevraagd om 'git pull' (#743). -**Update ERESOLVE-fout:**`package.json` overschrijvingen voor `react`/`react-dom` geïnjecteerd en `--legacy-peer-deps` ingeschakeld in de interne automatische updater-scripts om conflicten met de afhankelijkheidsboom met `@lobehub/ui` op te lossen.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Cloudflare Quick Tunnel-integratie met dashboardbediening (PR #772). -**Diagnostiek:**Semantische cache-bypass voor combo live-tests (PR #773).### 🐛 Bug Fixes

-**Streamingstabiliteit:**Pas `FETCH_TIMEOUT_MS` toe op de initiële `fetch()`-aanroep van streamingverzoeken om te voorkomen dat 300s Node.js TCP-time-out leidt tot fouten in stille taken (#769). -**i18n:**Voeg ontbrekende `windsurf`- en `copilot`-items toe aan `toolDescriptions` in alle 33 locale-bestanden (#748). -**GLM-coderingsaudit:**Volledige provideraudit voor het oplossen van ReDoS-kwetsbaarheden, contextvenstergrootte (128k/16k) en synchronisatie van modelregisters (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Oplossing voor terugvalverwerking voor `type: "text"`-elementen met null- of lege datasets die 400-afwijzing veroorzaakten (#742). -**Opencode:**Update schema-uitlijning naar enkelvoudige `provider` zodat deze overeenkomt met de officiële specificaties (#774). -**Gemini CLI:**Injecteer ontbrekende quotaheaders voor eindgebruikers om 403-autorisatieblokkeringen te voorkomen (#775). -**DB-herstel:**Refactoreer import van payloads uit meerdere delen in onbewerkte binaire gebufferde arrays om de maximale body-limieten van de reverse proxy te omzeilen (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilisatie**— Voltooide release van v3.2.9 (combodiagnostiek, kwaliteitspoorten, Gemini-toolfix) en ontbrekende git-tag gemaakt. Alle gefaseerde wijzigingen geconsolideerd in één enkele atomaire release-commit.### 🐛 Bug Fixes

-**Auto-Update Test**— Vaste `buildDockerComposeUpdateScript` testbewering om niet-uitgebreide shell-variabelereferenties (`$TARGET_TAG`, `${TARGET_TAG#v}`) in het gegenereerde implementatiescript te matchen, in lijn met de opnieuw vormgegeven sjabloon uit v3.2.8. -**Circuit Breaker Test**— Versterkt `combo-circuit-breaker.test.mjs` door `maxRetries: 0` te injecteren om te voorkomen dat de inflatie bij nieuwe pogingen de beweringen over het aantal mislukkingen vertekent tijdens overgangen naar de status van de onderbreker.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introductie van een live test-bypass-vlag (`forceLiveComboTest`) waarmee beheerders echte upstream-gezondheidscontroles kunnen uitvoeren die alle lokale stroomonderbreker- en cooldown-statusmechanismen omzeilen, waardoor nauwkeurige diagnostiek tijdens uitrolstoringen mogelijk wordt (PR #759) -**Quality Gates**— Automatische validatie van de responskwaliteit toegevoegd voor combo's en officieel geïntegreerde 'claude-4.6'-modelondersteuning in de kernrouteringsschema's (PR #762)### 🐛 Bug Fixes

-**Tool Definition Validation**— Gerepareerde Gemini API-integratie door enum-typen binnen tooldefinities te normaliseren, waardoor upstream HTTP 400-parameterfouten worden voorkomen (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Geïntegreerd een losstaand achtergrondupdateproces voor Docker Compose-implementaties. De Dashboard UI volgt nu naadloos levenscyclusgebeurtenissen van updates, waarbij JSON REST-reacties worden gecombineerd met SSE-streamingvoortgangsoverlays voor robuuste betrouwbaarheid tussen verschillende omgevingen. -**Cache Analytics**— Gerepareerde visualisatietoewijzing met nulstatistieken door telemetrielogboeken van Semantic Cache rechtstreeks naar de gecentraliseerde SQLite-trackingmodule te migreren.### 🐛 Bug Fixes

-**Authenticatielogica**— Een bug opgelost waarbij het opslaan van dashboardinstellingen of het toevoegen van modellen mislukte met een 401 Ongeautoriseerde fout wanneer `requireLogin` was uitgeschakeld. API-eindpunten evalueren nu correct de schakelaar voor globale authenticatie. Globale omleiding opgelost door `src/middleware.ts` opnieuw te activeren. -**CLI Tool Detectie (Windows)**— Voorkwam fatale initialisatie-uitzonderingen tijdens detectie van de CLI-omgeving door `cross-spawn` ENOENT-fouten correct op te vangen. Voegt expliciete detectiepaden toe voor `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Genormaliseerde modelvertaalparameters die contextvergiftiging in de proxy passthrough-modus voorkomen, waarbij generieke `store: false`-beperkingen expliciet worden afgedwongen voor alle door Codex afkomstige verzoeken. -**SSE Token Reporting**- Genormaliseerde detectie van 'finish_reason' bij het aanroepen van de providertool, waarbij 0% gebruiksanalyse voor alleen-stream-antwoorden is opgelost waarbij de strikte '<DONE>'-indicatoren ontbreken. -**DeepSeek <think> Tags**— Implementeerde een expliciete `<think>`-extractietoewijzing binnen `responsesHandler.ts`, waardoor DeepSeek-redeneringsstromen op gelijkwaardige wijze in kaart worden gebracht met oorspronkelijke antropische `<thinking>`-structuren.---

## [3.2.7] - 2026-03-29

### Fixed

-**Naadloze UI-updates**: de functie "Nu bijwerken" op het Dashboard biedt nu live, transparante feedback met behulp van Server-Sent Events (SSE). Het voert pakketinstallatie uit, herbouwt native modules (better-sqlite3) en PM2 herstart betrouwbaar terwijl real-time laders worden weergegeven in plaats van stil te blijven hangen.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Er is een API-sleutelkopieerstroom met bereik toegevoegd in Api Manager, beschermd door de omgevingsvariabele `ALLOW_API_KEY_REVEAL`. -**Zichtbaarheidsknoppen in de zijbalk (#739)**— Beheerders kunnen nu elke navigatielink in de zijbalk verbergen via de Weergave-instellingen om de visuele rommel te verminderen. -**Strikte combinatietests (#735)**— Het eindpunt van de combo-statuscontrole is verbeterd, zodat live tekstreacties van modellen vereist zijn in plaats van alleen zachte bereikbaarheidssignalen. -**Gestreamde gedetailleerde logboeken (#734)**— Gewijzigde gedetailleerde verzoekregistratie voor SSE-streams om de uiteindelijke payload te reconstrueren, waardoor enorme hoeveelheden SQLite-databasegrootte worden bespaard en de gebruikersinterface aanzienlijk wordt opgeschoond.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— De authenticatieheaderlogica voor `minimax`-modellen op OpenCode Go is gecorrigeerd om `x-api-key` te gebruiken in plaats van standaard bearertokens in het `/messages`-protocol.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Ongeldige Linux-implementatieondersteuning (#732)**— Geïntegreerde `xbps-src`-verpakkingssjabloon en instructies voor het native compileren en installeren van OmniRoute met `better-sqlite3`-bindingen via cross-compilatiedoel.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI-migratie (#660)**— De oude `iFlow`-kernprovider volledig gemigreerd naar `Qoder AI`, met behoud van stabiele API-routeringsmogelijkheden.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload ongeldig argument (#731)**— Voorkomt `thoughtSignature` array-injecties binnen standaard Gemini `functionCall`-reeksen die agentische routeringsstromen blokkeren.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Genormaliseerde quotalimietlogica en gegevenslabels binnen de Limits-interface.### 🐛 Bug Fixes

-**Core Routing Schema's en lekken**— Uitgebreid `comboStrategySchema` om native ondersteuning te bieden voor `fill-first` en `p2c` strategieën om complexe combo-bewerking native te deblokkeren. -**Thinking Tags Extraction (CLI)**- Geherstructureerde CLI-tokenreacties sanitizer RegEx die modelredeneringsstructuren binnen streams vastlegt, waardoor gebroken '<thinking>'-extracties worden vermeden die het uitvoerformaat van de antwoordtekst verbreken. -**Strikte handhaving van formaten**— Verscherpte uitvoering van de opschoning van pijpleidingen, waardoor deze universeel toepasbaar is op doelen in de vertaalmodus.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Pipeline voor verzoeklogboek in vier fasen (#705)**— Geherstructureerde logboekpersistentie om uitgebreide payloads op te slaan in vier verschillende pijplijnfasen: Client Request, Translated Provider Request, Provider Response en Translated Client Response. Introductie van 'streamPayloadCollector' voor robuuste SSE-streamtruncatie en serialisatie van payloads.### 🐛 Bug Fixes

-**Mobiele UI-oplossingen (#659)**— Voorkomen dat tabelcomponenten op het dashboard de lay-out van smalle weergavevensters verbreken door het juiste horizontale scrollen en overloopbeperking toe te voegen aan `DashboardLayout`. -**Claude Prompt Cache-oplossingen (#708)**— Verzekerde dat `cache_control`-blokken in Claude-naar-Claude fallback-loops getrouw bewaard blijven en veilig worden teruggestuurd naar antropische modellen. -**Gemini Tool-definities (#725)**— Vaste schemavertaalfouten bij het declareren van eenvoudige `object`-parametertypen voor het aanroepen van de Gemini-functie.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Wanneer alle combo-modellen zijn uitgeput (502/503), probeert OmniRoute nu een configureerbaar globaal fallback-model voordat de fout wordt geretourneerd. Stel `globalFallbackModel` in de instellingen in om in te schakelen.### 🐛 Bug Fixes

-**Fix #721**— Probleem opgelost waarbij het vastzetten van contexten tijdens tool-call-reacties werd omzeild. Niet-streaming-tagging gebruikte het verkeerde JSON-pad (`json.messages` → `json.choices[0].message`). Streaming-injectie wordt nu geactiveerd op 'finish_reason'-chunks voor streams die alleen via tool-calls werken. `injectModelTag()` voegt nu synthetische pin-berichten toe voor niet-stringinhoud. -**Fix #709**— Bevestigd dat het al is opgelost (v3.1.9) — `system-info.mjs` maakt mappen recursief aan. Gesloten. -**Fix #707**— Bevestigd dat het al is opgelost (v3.1.9) — Opschoning van lege toolnamen in `chatCore.ts`. Gesloten.### 🧪 Tests

- 6 unit-tests toegevoegd voor het vastzetten van context met tool-call-reacties (null-inhoud, array-inhoud, roundtrip, herinjectie)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cachebeheer-UI**— Een speciaal semantisch caching-dashboard toegevoegd op \`/dashboard/cache\` met gerichte API-invalidatie en i18n-ondersteuning in 31 talen (PR #701 door @oyi77) -**GLM Quota Tracking**— Realtime gebruik en sessiequota-tracking toegevoegd voor de GLM Coding (Z.AI)-provider (PR #698 door @christopher-s) -**Gedetailleerde log-payloads**— Volledige vastlegging van de volledige viertraps-payload in de pijplijn (origineel, vertaald, respons van de provider, gestreamde delta's) rechtstreeks in de gebruikersinterface (PR #705 door @rdself)### 🐛 Bug Fixes

-**Fix #708**— Voorkomt token-bleeding voor Claude Code-gebruikers die via OmniRoute routeren door de native \`cache_control\` headers correct te behouden tijdens Claude-naar-Claude passthrough (PR #708 door @tombii) -**Fix #719**— Stel interne auth-grenzen in voor \`ModelSyncScheduler\` om niet-geverifieerde daemon-fouten bij het opstarten te voorkomen (PR #719 door @rdself) -**Fix #718**— Badgeweergave opnieuw opgebouwd in de gebruikersinterface van Provider Limits, waardoor overlapping van slechte quotagrenzen wordt voorkomen (PR #718 door @rdself) -**Fix #704**— Vaste Combo Fallbacks die breken bij HTTP 400-inhoudsbeleidsfouten waardoor dode routering van modelrotatie wordt voorkomen (PR #704 door @rdself)### 🔒 Security & Dependencies

- \`path-to-regexp\` verhoogd naar \`8.4.0\` om de kwetsbaarheden in de dependabot op te lossen (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Fix #706**— Terugvalweergave van pictogrammen veroorzaakt door het overschrijven van 'font-sans' in Tailwind V4 door `!important` toe te passen op `.material-symbols-outlined` is opgelost. -**Fix #703**— GitHub Copilot heeft gebroken streams gerepareerd door vertaling van `responses` naar `openai`-formaat in te schakelen voor aangepaste modellen die gebruik maken van `apiFormat: "responses"`. -**Fix #702**— Flat-rate gebruiksregistratie vervangen door nauwkeurige DB-prijsberekeningen voor zowel streaming- als niet-streamingreacties. -**Fix #716**— De vertaalstatus van Claude tool-call opgeschoond, streaming-argumenten correct geparseerd en voorkomen dat OpenAI `tool_calls` chunks het `id`-veld herhalen.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Forceer string-gecodeerde numerieke JSON Schema-beperkingen (bijvoorbeeld `"minimum": "1"`) automatisch naar de juiste typen, waardoor 400 fouten worden voorkomen van Cursor, Cline en andere clients die verkeerd ingedeelde toolschema's verzenden. -**Opschoning van gereedschapsbeschrijving**— Zorg ervoor dat gereedschapsbeschrijvingen altijd strings zijn; converteert 'null', 'ongedefinieerde' of numerieke beschrijvingen naar lege tekenreeksen voordat deze naar providers worden verzonden. -**Knop Alle modellen wissen**— i18n-vertalingen toegevoegd voor de provideractie "Alle modellen wissen" in alle 30 talen. -**Codex Auth Export**— Codex `auth.json` export- en apply-local-knoppen toegevoegd voor naadloze CLI-integratie. -**Windsurf BYOK-opmerkingen**— Officiële beperkingswaarschuwingen toegevoegd aan de Windsurf CLI-toolkaart waarin BYOK-beperkingen worden gedocumenteerd.### 🐛 Bug Fixes

-**Fix #709**— `system-info.mjs` crasht niet langer als de uitvoermap niet bestaat (`mkdirSync` met recursieve vlag toegevoegd). -**Opgelost #710**— A2A `TaskManager` singleton gebruikt nu `globalThis` om statuslekken bij hercompilaties van Next.js API-routes in dev-modus te voorkomen. E2E-testsuite bijgewerkt om 401 netjes af te handelen. -**Fix #711**— Provider-specifieke `max_tokens` limietafdwinging toegevoegd voor upstream-verzoeken. -**Repareren #605 / #592**— Verwijder het voorvoegsel `proxy_` uit toolnamen in niet-streaming Claude-antwoorden; vaste LongCat-validatie-URL. -**Call Logs Max Cap**— Verbeterde `getMaxCallLogs()` met cachinglaag, env var-ondersteuning (`CALL_LOGS_MAX`) en integratie van DB-instellingen.### 🧪 Tests

- Testsuite uitgebreid van 964 → 1027 tests (63 nieuwe tests)
- 'schema-coercion.test.mjs' toegevoegd - 9 tests voor numerieke velddwang en opschoning van gereedschapsbeschrijvingen
- `t40-opencode-cli-tools-integration.test.mjs` toegevoegd - OpenCode/Windsurf CLI-integratietests
- Verbeterde functietesttak met uitgebreide dekkingstools### 📁 New Files

| Bestand                                                  | Doel                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema dwang en gereedschapsbeschrijving ontsmettingshulpprogramma's |
| `tests/unit/schema-coercion.test.mjs`                    | Eenheidstests voor schemadwang                                       |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Integratietests voor CLI-tools                                       |
| `COVERAGE_PLAN.md`                                       | Planningsdocument testdekking                                        | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Probleem opgelost dat cache_control-markeringen werden verwijderd in de Claude passthrough-modus (Claude → OmniRoute → Claude), waardoor Claude Code-gebruikers hun Anthropic API-quotum 5-10x sneller opgebruikten dan directe verbindingen. OmniRoute behoudt nu de cache_control-markeringen van de klant wanneer sourceFormat en targetFormat beide Claude zijn, waardoor promptcaching correct werkt en het tokenverbruik dramatisch wordt verminderd.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Core:**Geïmplementeerde globale statusafhandeling voor verborgen modellen en combo's, waardoor wordt voorkomen dat ze de catalogus onoverzichtelijk maken of lekken naar verbonden MCP-agents (#681). -**Stabiliteit:**Patches voor streaming-crashes gerelateerd aan het mislukken van de native integratie van de Antigravity-provider vanwege onverwerkte, ongedefinieerde statusarrays (#684). -**Lokalisatiesynchronisatie:**Een volledig gereviseerde `i18n`-synchronisator geïmplementeerd die ontbrekende geneste JSON-eigenschappen detecteert en 30 landinstellingen opeenvolgend aanpast (#685).## [3.1.7] - 27-03-2026### 🐛 Bug Fixes

-**Streamingstabiliteit:**Probleem opgelost waarbij `hasValuableContent` `undefined` retourneert voor lege chunks in SSE-streams (#676). -**Tool Calling:**Er is een probleem opgelost in `sseParser.ts` waarbij niet-streaming Claude-antwoorden met meerdere tool-aanroepen de `id` van daaropvolgende tool-aanroepen lieten vallen vanwege onjuiste, op indexen gebaseerde deduplicatie (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Toolnamen zoals `TodoWrite` worden niet langer voorafgegaan door `proxy_` in Claude passthrough-reacties (zowel streaming als niet-streaming). Inclusief unit-testdekking (PR #663 door @coobabm) -**Clear All Models Alias Cleanup**— De knop "Clear All Models" verwijdert nu ook bijbehorende modelaliassen, waardoor spookmodellen in de gebruikersinterface worden voorkomen (PR #664 door @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Accounts met beperkte snelheid worden nu automatisch hersteld wanneer hun cooldown-periode afloopt, waardoor een impasse wordt verholpen waarbij accounts met een hoog `backoffLevel` permanent geen prioriteit meer krijgen (PR #657 door @brendandebeasi)### 🌍 i18n

-**Revisie Chinese vertaling**— Uitgebreide herschrijving van `zh-CN.json` met verbeterde nauwkeurigheid (PR #658 door @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**— Expliciete `stream: true` in de hoofdtekst van het verzoek heeft nu prioriteit boven de header `Accept: application/json`. Clients die beide verzenden, ontvangen correct SSE-streamingreacties (#656)### 🌍 i18n

-**Tsjechische tekenreeksverbeteringen**— Verfijnde terminologie in `cs.json` (PR #655 door @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 ontbrekende vertaalsleutels**toegevoegd aan `en.json` en 12 talen (PR #652 door @zen0bit) -**Tsjechische documentatie bijgewerkt**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT handleidingen (PR #652) -**Vertalingsvalidatiescripts**— `check_translations.py` en `validate_translation.py` voor CI/QA (PR #651 door @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritisch: Tool Calling Regressie**— `proxy_Bash`-fouten opgelost door het voorvoegsel `proxy_`-toolnaam in het Claude passthrough-pad uit te schakelen. Tools als `Bash`, `Read`, `Write` werden hernoemd naar `proxy_Bash`, `proxy_Read`, enz., waardoor Claude ze weigerde (#618) -**Kiro Account Ban Documentatie**— Gedocumenteerd als upstream AWS anti-fraude false positive, geen OmniRoute-probleem (#649)### 🧪 Tests

-**936 tests, 0 fouten**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadata voor visiemogelijkheden**: `capabilities.vision`, `input_modalities` en `output_modalities` toegevoegd aan `/v1/models`-vermeldingen voor modellen met visiemogelijkheden (PR #646) -**Gemini 3.1-modellen**: `gemini-3.1-pro-preview` en `gemini-3.1-flash-lite-preview` toegevoegd aan de Antigravity-provider (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-fout**: onjuiste API-basis-URL opgelost - gewijzigd van `api.ollama.com` naar officieel `ollama.com/v1/chat/completions` (#643) -**Verlopen token opnieuw proberen**: begrensde nieuwe poging toegevoegd met exponentiële uitstel (5 → 10 → 20 min) voor verlopen OAuth-verbindingen in plaats van ze permanent over te slaan (PR #647)### 🧪 Tests

-**936 tests, 0 fouten**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub-probleemsjablonen**: gestandaardiseerd bugrapport, functieverzoek en config/proxy-probleemsjablonen toegevoegd (#641) -**Alle modellen wissen**: een knop "Alle modellen wissen" toegevoegd aan de providerdetailpagina met i18n-ondersteuning in 29 talen (#634)### 🐛 Bug Fixes

-**Landbouwconflict (`in.json`)**: Hernoemde het Hindi-landinstellingenbestand van `in.json` (Indonesische ISO-code) naar `hi.json` om vertaalconflicten in Weblate (#642) op te lossen -**Lege gereedschapsnamen in Codex**: Opschoning van gereedschapsnamen verplaatst vóór de native Codex-passthrough, waardoor 400 fouten van upstream-providers zijn opgelost wanneer gereedschappen lege namen hadden (#637) -**Streaming van Newline-artefacten**: `collapseExcessiveNewlines` toegevoegd aan de responssanitizer, waarbij reeksen van meer dan 3 nieuwe regels van denkmodellen worden samengevouwen tot een standaard dubbele newline (#638) -**Claude Reasoning Effort**: OpenAI `reasoning_effort` param geconverteerd naar Claude's eigen `thinking` budgetblok voor alle aanvraagpaden, inclusief automatische `max_tokens` aanpassing (#627) -**Qwen Token Refresh**: proactieve OAuth-tokenvernieuwingen vóór de vervaldatum geïmplementeerd (buffer van 5 minuten) om te voorkomen dat verzoeken mislukken bij het gebruik van kortstondige tokens (#631)### 🧪 Tests

-**936 tests, 0 fouten**(+10 tests sinds 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-tokens in Claude Code / klantreacties (#617):**

- `sanitizeUsage()` kruist nu `input_tokens` →`prompt_tokens` en `output_tokens` →`completion_tokens` voor het wittelijstfilter, waardoor antwoorden worden opgelost die het aantal NaN/0-tokens tonen wanneer providers gebruiksveldnamen in Claude-stijl retourneren### Beveiliging

- Bijgewerkt `yaml`-pakket om de kwetsbaarheid voor stackoverflow op te lossen (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Gesloten #613 (Codestral - opgelost met oplossing voor aangepaste provider)
- Er is gereageerd op #615 (OpenCode dual-endpoint - oplossing geboden, bijgehouden als functieverzoek)
- Er is gereageerd op #618 (zichtbaarheid van tooloproepen - v3.0.9-test aangevraagd)
- Heeft gereageerd op #627 (inspanningsniveau - al ondersteund)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Vertaalfouten voor providers van OpenAI-formaat in Claude CLI (#632):**

- Behandel het array-formaat 'reasoning_details[]' van StepFun/OpenRouter - converteert naar 'reasoning_content'
- Behandel de veldalias 'reasoning' van sommige providers → genormaliseerd naar 'reasoning_content'
- Gebruiksveldnamen voor meerdere kaarten: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
- Fix `extractUsage` om zowel `input_tokens`/`output_tokens` als `prompt_tokens`/`completion_tokens` te accepteren als geldige gebruiksvelden
- Toegepast op zowel streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` vertaler) als niet-streaming (`sanitizeMessage`) paden---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Probleem opgelost met de fout 'client_secret ontbreekt' voor door npm geïnstalleerde gebruikers - de 'clientSecretDefault' was leeg in providerRegistry, waardoor Google verzoeken om tokenvernieuwing weigerde (#588) -**OpenCode Zen-modellen:**`modelsUrl` toegevoegd aan de OpenCode Zen-registervermelding, zodat "Importeren uit /models" correct werkt (#612) -**Streaming-artefacten:**Probleem opgelost dat er te veel nieuwe regels achterbleven in reacties na het verwijderen van de handtekening van de denktag (#626) -**Proxy Fallback:**Automatische nieuwe poging toegevoegd zonder proxy wanneer SOCKS5-relay mislukt -**Proxytest:**Testeindpunt lost nu echte referenties van DB op via proxyId### ✨ New Features

-**Playground Account/Key Selector:**Permanente, altijd zichtbare vervolgkeuzelijst om specifieke provideraccounts/sleutels te selecteren om te testen - haalt alle verbindingen op bij het opstarten en filtert op geselecteerde provider -**CLI Tools Dynamische modellen:**Modelselectie wordt nu dynamisch opgehaald uit de `/v1/models` API - providers zoals Kiro tonen nu hun volledige modelcatalogus -**Lijst met anti-zwaartekrachtmodellen:**Bijgewerkt met Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; `passthroughModels` ingeschakeld voor dynamische modeltoegang (#628)### 🔧 Maintenance

- Samengevoegd PR #625 — Provider beperkt de achtergrond van de lichtmodus---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limieten/Proxy:**Vaste codexlimiet ophalen voor accounts achter SOCKS5-proxy's - tokenvernieuwing wordt nu uitgevoerd binnen de proxycontext -**CI:**Vaste integratietest `v1/models` beweringsfout in CI-omgevingen zonder providerverbindingen -**Instellingen:**Proxy-testknop toont nu onmiddellijk succes-/mislukkingsresultaten (voorheen verborgen achter gezondheidsgegevens)### ✨ New Features

-**Speeltuin:**Vervolgkeuzelijst Accountkiezer toegevoegd: test specifieke verbindingen afzonderlijk wanneer een provider meerdere accounts heeft### 🔧 Maintenance

- Samengevoegd PR #623 — Correctie van het basis-URL-pad van de LongCat API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Beperkt UI:**Functie voor taggroepering toegevoegd aan het verbindingendashboard om de visuele organisatie voor accounts met aangepaste tags te verbeteren.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Probleem met de staatscorruptie van `TextDecoder` in de combo `sanitize` TransformStream, waardoor SSE-uitvoer werd verminkt die overeenkwam met multibyte-tekens (PR #614) -**Providers UI:**HTML-tags veilig weergeven in tooltips voor providerverbindingsfouten met behulp van `dangerablySetInnerHTML` -**Proxy-instellingen:**Ontbrekende eigenschappen van de payload 'gebruikersnaam' en 'wachtwoord' toegevoegd, waardoor geauthenticeerde proxy's met succes kunnen worden geverifieerd vanaf het Dashboard. -**Provider API:**Gebonden zachte uitzondering keert terug naar `getCodexUsage` en voorkomt API HTTP 500-fouten wanneer het ophalen van tokens mislukt---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modellen automatisch synchroniseren:**Een UI-schakelaar en `sync-models`-eindpunt toegevoegd om modellijsten per provider automatisch te synchroniseren met behulp van een geplande intervalplanner (PR #597)### 🐛 Bug Fixes

-**Time-outs:**Standaardproxy's `FETCH_TIMEOUT_MS` en `STREAM_IDLE_TIMEOUT_MS` verhoogd naar 10 minuten om diepgaande redeneringsmodellen (zoals o1) correct te ondersteunen zonder verzoeken af te breken (oplossingen #609) -**CLI Tool-detectie:**Verbeterde platformonafhankelijke detectieafhandeling van NVM-paden, Windows `PATHEXT` (voorkomt probleem met `.cmd`-wrappers) en aangepaste NPM-voorvoegsels (PR #598) -**Streaminglogboeken:**Implementatie van `tool_calls` delta-accumulatie in streamingresponslogboeken, zodat functieaanroepen nauwkeurig worden bijgehouden en bewaard in DB (PR #603) -**Modelcatalogus:**Auth-vrijstelling verwijderd, waardoor de modellen `comfyui` en `sdwebui` correct worden verborgen wanneer er geen provider expliciet is geconfigureerd (PR #599)### 🌐 Translations

-**cs:**Verbeterde Tsjechische vertaalreeksen in de app (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Een Tag/Group-veld toegevoegd aan `EditConnectionModal` (opgeslagen in `providerSpecificData.tag`) zonder dat DB-schemamigraties nodig zijn.
- Verbindingen in de providerweergave worden nu dynamisch gegroepeerd op tag met visuele scheidingslijnen.
- Niet-getagde verbindingen verschijnen eerst zonder koptekst, gevolgd door getagde groepen in alfabetische volgorde.
- De taggroepering is automatisch van toepassing op de sectie Codex/Copilot/Antigravity Limits, aangezien er schakelaars bestaan ​​binnen verbindingsrijen.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Ontbrekende badges op verbindingskaarten:**Opgelost door `resolveProxyForConnection()` te gebruiken in plaats van statische mapping. -**Testverbinding uitgeschakeld in opgeslagen modus:**De knop Test is ingeschakeld door de proxyconfiguratie uit de opgeslagen lijst op te lossen. -**Config Modaal bevriezen:**`onClose()`-aanroepen toegevoegd na opslaan/wissen om te voorkomen dat de gebruikersinterface vastloopt. -**Dubbele gebruiktelling:**`ProxyRegistryManager` laadt nu het gebruik gretig op mount met deduplicatie door `scope` + `scopeId`. Gebruikstellingen zijn vervangen door een testknop die IP/latentie inline weergeeft.#### fix(translator): `function_call` prefix stripping

- Een onvolledige oplossing uit PR #607 gerepareerd waarbij alleen `tool_use`-blokken Claude's `proxy_` toolvoorvoegsel verwijderden. Nu zullen clients die het OpenAI Responses API-formaat gebruiken ook correct tooltools ontvangen zonder het voorvoegsel `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Drie kritieke regressies die door gebruikers zijn gemeld na de lancering van v3.0.0 zijn opgelost.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Het voorvoegsel `proxy_` toegevoegd door Claude OAuth werd alleen verwijderd uit**streaming**-reacties. In de**niet-streaming**-modus had `translateNonStreamingResponse` geen toegang tot de `toolNameMap`, waardoor clients verminkte toolnamen ontvingen, zoals `proxy_read_file` in plaats van `read_file`.

**Opgelost:**Optionele `toolNameMap` parameter toegevoegd aan `translateNonStreamingResponse` en voorvoegsel strippen toegepast in de Claude `tool_use` blokhandler. `chatCore.ts` geeft nu de kaart door.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI stelt `GET /v1/models` niet beschikbaar. De generieke 'validateOpenAICompatibleProvider'-validator slaagde er alleen in om terug te vallen op chat-completions als 'validationModelId' was ingesteld, wat LongCat niet configureert. Dit zorgde ervoor dat de providervalidatie mislukte met een misleidende fout bij het toevoegen/opslaan.

**Opgelost:**`longcat` toegevoegd aan de specialiteitsvalidatorskaart, waarbij `/chat/completions` rechtstreeks wordt onderzocht en elk niet-authenticatieantwoord als een pass wordt behandeld.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-tools (bijvoorbeeld `potlood`, `computer_use`) sturen tooldefinities door met `{type:"object"}` maar zonder een `properties`-veld. De API van Anthropic wijst deze af met: `objectschema ontbrekende eigenschappen`.

**Opgelost:**In `openai-to-claude.ts` injecteert u `properties: {}` als een veilige standaard wanneer `type` `"object'` is en `properties` afwezig is.---

### 🔀 Community PRs Merged (2)

| PR       | Auteur  | Samenvatting                                                                     |
| -------- | ------- | -------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): Russische vertaling voor Playground en Testbed repareren             |
| **#591** | @rdself | fix(ui): verbetering van providerlimieten lichtmoduscontrast en planlaagweergave | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 tests, 0 fouten**(ongewijzigd ten opzichte van v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **De grootste release ooit.**Van 36 providers in v2.9.5 tot**67+ providers**in v3.0.0 — met MCP-server, A2A-protocol, automatische combo-engine, providerpictogrammen, API voor geregistreerde sleutels, 926 tests en bijdragen van**12 communityleden**in**10 samengevoegde PR's**.
>
> Geconsolideerd van v3.0.0-rc.1 tot en met rc.17 (17 releasekandidaten gedurende 3 dagen van intensieve ontwikkeling).---

### 🆕 New Providers (+31 since v2.9.5)

| Aanbieder                       | Alias ​​        | Niveau      | Opmerkingen                                                                           |
| ------------------------------- | --------------- | ----------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**                | `opencode-zen`  | Gratis      | 3 modellen via `opencode.ai/zen/v1` (PR #530 door @kang-heewon)                       |
| **OpenCode Go**                 | `opencode-go`   | Betaald     | 4 modellen via `opencode.ai/zen/go/v1` (PR #530 door @kang-heewon)                    |
| **LongCat AI**                  | `lc`            | Gratis      | 50 miljoen tokens/dag (Flash-Lite) + 500K/dag (chat/denken) tijdens openbare bèta     |
| **Bestuivingen AI**             | `pol`           | Gratis      | Geen API-sleutel nodig — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 vereiste/15s) |
| **Cloudflare Workers AI**       | `cf`            | Gratis      | 10.000 neuronen/dag — ~150 LLM-reacties of 500s fluisteraudio, randinferentie         |
| **Scaleway-AI**                 | `scw`           | Gratis      | 1 miljoen gratis tokens voor nieuwe accounts — EU/GDPR-compatibel (Parijs)            |
| **AI/ML-API**                   | `doel`          | Gratis      | $ 0,025/dag gratis credits — 200+ modellen via één eindpunt                           |
| **Puter-AI**                    | `pu`            | Gratis      | 500+ modellen (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)               |
| **Alibaba Cloud (DashScope)**   | `ali`           | Betaald     | Internationaal + Chinese eindpunten via `alicode`/`alicode-intl`                      |
| **Alibaba-coderingsplan**       | `bcp`           | Betaald     | Alibaba Model Studio met Anthropic-compatibele API                                    |
| **Kimi-codering (API-sleutel)** | `kmca`          | Betaald     | Speciale op API-sleutel gebaseerde Kimi-toegang (los van OAuth)                       |
| **MiniMax-codering**            | `minimax`       | Betaald     | Internationaal eindpunt                                                               |
| **MiniMax (China)**             | `minimax-cn`    | Betaald     | China-specifiek eindpunt                                                              |
| **Z.AI (GLM-5)**                | `zai`           | Betaald     | Zhipu AI volgende generatie GLM-modellen                                              |
| **Vertex AI**                   | `hoekpunt`      | Betaald     | Google Cloud: serviceaccount JSON of OAuth access_token                               |
| **Ollama-wolk**                 | `ollamawolk`    | Betaald     | Ollama's gehoste API-service                                                          |
| **Synthetisch**                 | `synthetisch`   | Betaald     | Passthrough-modellen gateway                                                          |
| **Kilo-gateway**                | `kg`            | Betaald     | Passthrough-modellen gateway                                                          |
| **Verbijstering zoeken**        | `pplx-zoeken`   | Betaald     | Speciaal op zoek gebaseerd eindpunt                                                   |
| **Serper zoeken**               | `serper-zoeken` | Betaald     | API-integratie voor zoeken op internet                                                |
| **Dapper zoeken**               | `dapper zoeken` | Betaald     | Brave Search API-integratie                                                           |
| **Exa-zoekopdracht**            | `exa-zoeken`    | Betaald     | Neurale zoek-API-integratie                                                           |
| **Tavily Zoeken**               | `tavily-zoeken` | Betaald     | AI-zoek-API-integratie                                                                |
| **Nanobanaan**                  | `nb`            | Betaald     | API voor het genereren van afbeeldingen                                               |
| **ElfLabs**                     | `el`            | Betaald     | Spraaksynthese van tekst naar spraak                                                  |
| **Cartesia**                    | `cartesia`      | Betaald     | Ultrasnelle TTS-spraaksynthese                                                        |
| **SpeelHT**                     | `speel`         | Betaald     | Stemklonen en TTS                                                                     |
| **Inwereld**                    | `in de wereld`  | Betaald     | AI-personage voicechat                                                                |
| **SD WebUI**                    | `sdwebui`       | Zelf gehost | Stabiele diffusie lokale beeldgeneratie                                               |
| **ComfyUI**                     | `comfyui`       | Zelf gehost | ComfyUI lokale workflow op knooppunten gebaseerde generatie                           |
| **GLM-codering**                | `glm`           | Betaald     | BigModel/Zhipu-coderingsspecifiek eindpunt                                            | **Totaal: 67+ providers**(4 gratis, 8 OAuth, 55 API-sleutel) + onbeperkte OpenAI/antropisch-compatibele aangepaste providers.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Genereer automatisch OmniRoute API-sleutels en geef ze programmatisch uit, met handhaving van quota per provider en per account.

| Eindpunt                               | Werkwijze             | Beschrijving                                                             |
| -------------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `/api/v1/geregistreerde-sleutels`      | `POST`                | Geef een nieuwe sleutel uit — onbewerkte sleutel retourneert**eenmalig** |
| `/api/v1/geregistreerde-sleutels`      | `KRIJG`               | Lijst met geregistreerde sleutels (gemaskeerd)                           |
| `/api/v1/geregistreerde-sleutels/{id}` | `OPHALEN/VERWIJDEREN` | Metagegevens ophalen / Intrekken                                         |
| `/api/v1/quotas/check`                 | `KRIJG`               | Quota vooraf valideren voordat u deze uitgeeft                           |
| `/api/v1/providers/{id}/limits`        | `KRIJGEN/ZET`         | Uitgiftelimieten per provider configureren                               |
| `/api/v1/accounts/{id}/limits`         | `KRIJGEN/ZET`         | Uitgiftelimieten per account configureren                                |
| `/api/v1/issues/rapport`               | `POST`                | Rapporteer quotagebeurtenissen aan GitHub Issues                         |

**Beveiliging:**Sleutels opgeslagen als SHA-256-hashes. Onbewerkte sleutel wordt één keer getoond bij het maken en kan nooit meer worden opgehaald.#### 🎨 Provider Icons via @lobehub/icons (#529)

Meer dan 130 providerlogo's met `@lobehub/icons` React-componenten (SVG). Terugvalketen:**Lobehub SVG → bestaande PNG → generiek pictogram**. Toegepast op Dashboard-, Providers- en Agents-pagina's met de gestandaardiseerde 'ProviderIcon'-component.#### 🔄 Model Auto-Sync Scheduler (#488)

Vernieuwt automatisch de modellijsten voor aangesloten providers elke**24 uur**. Draait bij het opstarten van de server. Configureerbaar via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Wijs modelnaampatronen (glob) toe aan specifieke combo's voor automatische routering:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nieuwe tabel 'model_combo_mappings' met glob-naar-regex-matching
- Dashboard UI-sectie: "Modelroutingregels" met inline toevoegen/bewerken/wisselen/verwijderen#### 🧭 API Endpoints Dashboard

Interactieve catalogus, webhooksbeheer, OpenAPI-viewer - alles op één tabblad op `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nieuwe integraties van zoekmachines:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— waardoor gegronde AI-reacties met realtime webgegevens mogelijk zijn.#### 📊 Search Analytics

Nieuw tabblad in `/dashboard/analytics` – overzicht van providers, cachehitpercentage, kostenregistratie. API: `KRIJG /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

De kolommen 'max_requests_per_day' en 'max_requests_per_minute' met handhaving van een schuifvenster in het geheugen dat HTTP 429 retourneert.#### 🎵 Media Playground

Volledige speeltuin voor het genereren van media op `/dashboard/media`: het genereren van afbeeldingen, video, muziek, audiotranscriptie (uploadlimiet van 2 GB) en tekst-naar-spraak.---

### 🔒 Security & CI/CD

-**CodeQL-herstel**— Meer dan 10 waarschuwingen opgelost: 6 polynomiale herhalingen, 1 onveilige willekeur (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injectie -**Routevalidatie**— Zod-schema's + `validateBody()` op**176/176 API-routes**— CI afgedwongen -**CVE-oplossing**— dompurify XSS-kwetsbaarheid (GHSA-v2wj-7wpq-c8vv) opgelost via npm-overschrijvingen -**Flatted**— Gestoten 3.3.3 → 3.4.2 (CWE-1321 prototypevervuiling) -**Docker**— Opgewaardeerde `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: duidelijke actiegerichte fout wanneer `GEMINI_OAUTH_CLIENT_SECRET` ontbreekt in Docker -**#549**— CLI-instellingenroutes lossen nu de echte API-sleutel op van `keyId` (geen gemaskeerde tekenreeksen) -**#574**— Inloggen loopt niet langer vast na het overslaan van het instellen van het wizardwachtwoord -**#506**— Cross-platform `machineId` herschreven (Windows REG.exe → macOS ioreg → Linux → fallback hostnaam)#### Providers & Routing

-**#536**— LongCat AI: `baseUrl` en `authHeader` opgelost -**#535**— Vastgezette modeloverschrijving: `body.model` correct ingesteld op `pinnedModel` -**#570**— Claude-modellen zonder voorvoegsel worden nu omgezet naar een Anthropic-provider -**#585**— `<omniModel>` interne tags lekken niet langer naar clients in SSE-streaming -**#493**— Aangepaste naamgeving van providermodel wordt niet langer verminkt door het verwijderen van voorvoegsels -**#490**— Streaming + contextcachebescherming via `TransformStream`-injectie -**#511**— `<omniModel>` tag geïnjecteerd in het eerste inhoudsdeel (niet na `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + Codex-lus: `tool_result`-blokken nu geconverteerd naar tekst -**#524**— OpenCode-configuratie correct opgeslagen (XDG_CONFIG_HOME, TOML-formaat) -**#522**— API Manager: misleidende knop "Gemaskeerde sleutel kopiëren" verwijderd -**#546**— `--version` retourneert `unknown` op Windows (PR door @k0valik) -**#544**— Veilige CLI-tooldetectie via bekende installatiepaden (PR door @k0valik) -**#510**— Windows MSYS2/Git-Bash-paden worden automatisch genormaliseerd -**#492**— CLI detecteert het door `mise`/`nvm` beheerde knooppunt wanneer `app/server.js` ontbreekt#### Streaming & SSE

-**PR #587**— Herstel `resolveDataDir` import in reactiesTransformer voor Cloudflare Workers compat (@k0valik) -**PR #495**— Knelpunt 429 oneindig wachten: wachtende taken laten vallen op snelheidslimiet (@xandr0s) -**#483**— Stop met het volgen van `data: null` na het `[DONE]`-signaal -**#473**— Zombie SSE-streams: time-out verminderd met 300s → 120s voor snellere terugval#### Media & Transcription

-**Transcriptie**— Deepgram `video/mp4` → `audio/mp4` MIME-toewijzing, automatische taaldetectie, interpunctie -**TTS**— Foutweergave van '[object Object]' opgelost voor geneste fouten in ElevenLabs-stijl -**Uploadlimieten**— Mediatranscriptie verhoogd naar 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— kolom `requested_model` in oproeplogboeken (migratie 009) -**T02**— Verwijder lege tekstblokken uit geneste `tool_result.content` -**T03**— Parse `x-codex-5h-*` / `x-codex-7d-*` quotaheaders -**T04**— `X-Session-Id` header voor externe sticky routing -**T05**— DB-persistentie met snelheidslimiet met speciale API -**T06**— Account gedeactiveerd → permanente blokkering (afkoelperiode van 1 jaar) -**T07**— X-Forwarded-For IP-validatie (`extractClientIp()`) -**T08**— Sessielimieten per API-sleutel met handhaving via een schuifvenster -**T09**— Codex versus Spark-snelheidslimietbereiken (afzonderlijke pools) -**T10**— Credits opgebruikt → duidelijke terugval van 1 uur cooldown -**T11**— `max` redeneerinspanning → 131072 budgettokens -**T12**— Prijzen van MiniMax M2.7 -**T13**— Oplossing voor verouderde quotaweergave (vensterbewustzijn opnieuw instellen) -**T14**— Proxy snelle TCP-controle (≤2s, 30s in cache) -**T15**— Normalisatie van array-inhoud voor Anthropic -**T23**— Intelligente fallback voor het opnieuw instellen van quota (koptekstextractie) -**T24**— `503` cooldown + `406` mapping -**T25**— Terugval bij validatie van provider -**T29**— JWT-verificatie van Vertex AI-serviceaccount -**T33**— Denkniveau tot budgetconversie -**T36**— `403` versus `429` foutclassificatie -**T38**— Gecentraliseerde modelspecificaties (`modelSpecs.ts`) -**T39**— Terugval op het eindpunt voor `fetchAvailableModels` -**T41**— Automatische omleiding van achtergrondtaak naar Flash-modellen -**T42**— In kaart brengen van de beeldverhouding#### Other Improvements

-**Per model upstream aangepaste headers**— via configuratie-UI (PR #575 door @zhangqiang8vip) -**Modelcontextlengte**— configureerbaar in modelmetagegevens (PR #578 door @hijak) -**Modelvoorvoegsel strippen**— optie om het providervoorvoegsel uit modelnamen te verwijderen (PR #582 door @jay77721) -**Beëindiging Gemini CLI**: gemarkeerd als verouderd met een Google OAuth-beperkingswaarschuwing -**YAML-parser**— aangepaste parser vervangen door `js-yaml` voor correcte parsering van OpenAPI-specificaties -**ZWS v5**— HMR-lekoplossing (485 DB-verbindingen → 1, geheugen 2,4 GB → 195 MB) -**Logboekexport**— Nieuwe JSON-exportknop op dashboard met vervolgkeuzelijst voor tijdsbereik -**Update notificatiebanner**: de startpagina van het dashboard laat zien wanneer er nieuwe versies beschikbaar zijn---

### 🌐 i18n & Documentation

-**30 talen**met 100% pariteit: 2.788 ontbrekende sleutels gesynchroniseerd -**Tsjechisch**— Volledige vertaling: 22 documenten, 2.606 UI-strings (PR door @zen0bit) -**Chinees (zh-CN)**— Volledige hervertaling (PR door @only4copilot) -**VM-implementatiehandleiding**— Vertaald naar het Engels als brondocument -**API-referentie**— `/v1/embeddings` en `/v1/audio/speech` eindpunten toegevoegd -**Aantal providers**— Bijgewerkt van 36+/40+/44+ naar**67+**voor README en alle 30 i18n README's---

### 🔀 Community PRs Merged (10)

| PR       | Auteur          | Samenvatting                                                            |
| -------- | --------------- | ----------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): zet de import van solveDataDir voor Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): optie voor strippen van voorvoegsel van modelnaam          |
| **#581** | @jay77721       | fix(npm): koppel elektronenafgifte aan npm-publish-workflow             |
| **#578** | @hijak          | prestatie: configureerbare contextlengte in modelmetadata               |
| **#575** | @zhangqiang8vip | feat: upstream-headers per model, compatibele PATCH, chatuitlijning     |
| **#562** | @coobabm        | oplossing: MCP-sessiebeheer, Claude passthrough, detectFormat           |
| **#561** | @zen0bit        | fix(i18n): Tsjechische vertaalcorrecties                                |
| **#555** | @k0valik        | fix(sse): gecentraliseerde `resolveDataDir()` voor padresolutie         |
| **#546** | @k0valik        | fix(cli): `--version` retourneert `onbekend` op Windows                 |
| **#544** | @k0valik        | fix(cli): veilige CLI-tooldetectie via installatiepaden                 |
| **#542** | @rdself         | fix(ui): contrast in lichte modus CSS-themavariabelen                   |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go-providers met `OpencodeExecutor`                |
| **#512** | @zhangqiang8vip | feat: modelcompatibiliteit per protocol (`compatByProtocol`)            |
| **#497** | @zhangqiang8vip | oplossing: HMR-bronlekken in dev-modus (ZWS v5)                         |
| **#495** | @xandr0s        | oplossing: knelpunt 429 oneindig wachten (wachtende taken laten vallen) |
| **#494** | @zhangqiang8vip | prestatie: MiniMax-ontwikkelaar → systeemrol opgelost                   |
| **#480** | @prakersh       | oplossing: extractie van stroomspoelgebruik                             |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 en antropische prijsvermeldingen                    |
| **#475** | @only4copilot   | feat(i18n): verbeterde Chinese vertaling                                |

**Bedankt aan alle bijdragers!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 tests, 0 fouten**(was 821 in v2.9.5)

- +105 nieuwe tests met betrekking tot: model-combo-toewijzingen, geregistreerde sleutels, OpencodeExecutor, Bailian-provider, routevalidatie, foutclassificatie, beeldverhoudingstoewijzing en meer---

### 📦 Database Migrations

| Migratie | Beschrijving                                                            |
| -------- | ----------------------------------------------------------------------- | --- |
| **008**  | `registered_keys`, `provider_key_limits`, `account_key_limits` tabellen |
| **009**  | kolom `requested_model` in `call_logs`                                  |
| **010**  | `model_combo_mappings` tabel voor combo-routering per model             | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Brekende wijzigingen:**Geen. Alle bestaande configuraties, combo's en API-sleutels blijven behouden.
> Databasemigraties 008-010 worden automatisch uitgevoerd bij het opstarten.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL-herstel**— 10+ waarschuwingen opgelost:

- 6 polynoom-redos in `provider.ts` / `chatCore.ts` (`(?:^|/)` afwisselingspatronen vervangen door op segmenten gebaseerde matching)
- 1 onveilige willekeur in `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injectie in `prepublish.mjs` (`JSON.stringify()` pad ontsnapt) -**Routevalidatie**— Zod-schema's + `validateBody()` toegevoegd aan 5 routes waarvoor validatie ontbreekt:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` passeert nu:**176/176 routes gevalideerd**### 🐛 Bug Fixes

-**#585**— `<omniModel>` interne tags lekken niet langer naar clients in SSE-reacties. Uitgaande opschoning `TransformStream` toegevoegd in `combo.ts`### ⚙️ Infrastructure

-**Docker**- `docker/setup-buildx-action` geüpgraded van v3 → v4 (beëindigingsoplossing voor Node.js 20) -**CI opschonen**— 150+ mislukte/geannuleerde workflowruns verwijderd### 🧪 Tests

- Testsuite:**926 tests, 0 mislukkingen**(+3 nieuw)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Verhoogde mediatranscriptielimieten
- Modelcontextlengte toegevoegd aan registermetagegevens
- Aangepaste upstream-headers per model toegevoegd via de configuratie-UI
- Meerdere bugs opgelost, Zod-validatie voor patches en verschillende gemeenschapsproblemen opgelost.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Combo-routering per model: wijs modelnaampatronen (glob) toe aan specifieke combo's voor automatische routering

- Nieuwe `model_combo_mappings` tabel (migratie 010) met patroon, combo_id, prioriteit, ingeschakeld
- `resolveComboForModel()` DB-functie met glob-naar-regex-matching (niet hoofdlettergevoelig, `*` en `?` jokertekens)
- `getComboForModel()` in `model.ts`: breidt `getCombo()` uit met model-patroon fallback
- `chat.ts`: routeringsbeslissing controleert nu de model-combo-toewijzingen vóór de afhandeling van één model
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: sectie "Modelroutingregels" toegevoegd aan de Combo-pagina met inline toevoegen/bewerken/wisselen/verwijderen
- Voorbeelden: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Volledige i18n-synchronisatie**: 2.788 ontbrekende sleutels toegevoegd in 30 taalbestanden — alle talen zijn nu 100% gelijk aan `en.json` -**Agentenpagina i18n**: OpenCode Integration-sectie volledig geïnternationaliseerd (titel, beschrijving, scannen, downloadlabels) -**6 nieuwe sleutels**toegevoegd aan de naamruimte `agents` voor de OpenCode-sectie### 🎨 UI/UX

-**Providerpictogrammen**: 16 ontbrekende providerpictogrammen toegevoegd (3 gekopieerd, 2 gedownload, 11 SVG gemaakt) -**SVG fallback**: `ProviderIcon` component bijgewerkt met 4-tier strategie: Lobehub → PNG → SVG → Generiek pictogram -**Agentenvingerafdrukken**: gesynchroniseerd met CLI-tools - droid, openclaw, copiloot, opencode toegevoegd aan vingerafdruklijst (14 in totaal)### Beveiliging

-**CVE-oplossing**: Dompurify XSS-kwetsbaarheid (GHSA-v2wj-7wpq-c8vv) opgelost via npm-overschrijvingen die `dompurify@^3.3.2` forceren

- `npm audit` rapporteert nu**0 kwetsbaarheden**### 🧪 Tests

- Testsuite:**923 tests, 0 mislukkingen**(+15 nieuwe model-combo mapping-tests)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Auteur   | Samenvatting                                                                            |
| -------- | -------- | --------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): MCP-sessiebeheer, Claude passthrough-normalisatie, OAuth modaal, detectFormat  |
| **#561** | @zen0bit | fix(i18n): Tsjechische vertalingscorrecties — HTTP-methodenamen en documentatie-updates | ### 🧪 Tests |

- Testsuite:**908 tests, 0 mislukkingen**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**repareer de echte API-sleutel van `keyId` in CLI-instellingenroutes (`codex-settings`, `droid-settings`, `kilo-settings`) om te voorkomen dat gemaskeerde tekenreeksen worden geschreven (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Auteur   | Samenvatting                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` retourneert `unknown` op Windows — gebruik `JSON.parse(readFileSync)` in plaats van ESM-import                                                                       |
| **#555** | @k0valik | fix(sse): gecentraliseerde `resolveDataDir()` voor padresolutie in inloggegevens, autoCombo, responslogger en verzoeklogger                                                                |
| **#544** | @k0valik | fix(cli): veilige CLI-tooldetectie via bekende installatiepaden (8 tools) met symlink-validatie, controles op bestandstype, groottegrenzen, minimale env in healthcheck                    |
| **#542** | @rdself  | fix(ui): verbeter het contrast van de lichte modus - voeg ontbrekende CSS-themavariabelen toe (`bg-primary`, `bg-subtle`, `text-primary`) en corrigeer alleen donkere kleuren in logdetail | ### 🔧 Bug Fixes |

-**TDZ-fix in `cliRuntime.ts`**— `validateEnvPath` werd gebruikt vóór initialisatie bij het opstarten van de module door `getExpectedParentPaths()`. Declaraties opnieuw geordend om `ReferenceError` op te lossen. -**Buildfixes**— `pino` en `pino-pretty` toegevoegd aan `serverExternalPackages` om te voorkomen dat Turbopack de interne werkbelasting van Pino verbreekt.### 🧪 Tests

- Testsuite:**905 tests, 0 mislukkingen**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regressie van Electron-build: Next.js gedowngraded van `16.1.x` naar `16.0.10` om de instabiliteit van de Turbopack-module-hashing te elimineren die lege schermen veroorzaakte in de Electron-desktopbundel. -**Unit-testoplossingen**— Twee verouderde testbeweringen gecorrigeerd (`nanobanana-image-handler` beeldverhouding/resolutie, `thinking-budget` Gemini `thinkingConfig` veldtoewijzing) die waren afgedreven na recente implementatiewijzigingen. -**#541**— Gereageerd op feedback van gebruikers over de complexiteit van de installatie; geen codewijzigingen vereist.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: geïmplementeerd met behulp van de `jose`-bibliotheek voor het afhandelen van JWT/Service Account-authenticatie, samen met configureerbare regio's in de gebruikersinterface en het automatisch bouwen van partnermodel-URL's. -**T42**— Beeldgeneratie beeldverhoudingstoewijzing: `sizeMapper`-logica gemaakt voor generieke OpenAI-formaten (`size`), native `imagen3`-verwerking toegevoegd en NanoBanana-eindpunten bijgewerkt om in kaart gebrachte beeldverhoudingen automatisch te gebruiken. -**T38**— Gecentraliseerde modelspecificaties: `modelSpecs.ts` gemaakt voor limieten en parameters per model.### 🔧 Improvements

-**T40**— Integratie van OpenCode CLI-tools: native `opencode-zen` en `opencode-go` integratie voltooid in eerdere PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown wacht op oplossing + `406` mapping: `406 niet acceptabel` toegewezen aan `503 Service Unavailable` met de juiste afkoelintervallen. -**T25**— Terugval op providervalidatie: sierlijke terugval op standaardvalidatiemodellen wanneer een specifieke `validationModelId` niet aanwezig is. -**T36**— Verfijning van de verwerking van `403` versus `429` door de provider: geëxtraheerd in `errorClassifier.ts` om fouten in de harde machtigingen (`403`) correct te scheiden van de snelheidslimieten (`429`). -**T39**— Endpoint Fallback voor `fetchAvailableModels`: implementeerde een tri-tier mechanisme (`/models` -> `/v1/models` -> lokale generieke catalogus) + `list_models_catalog` MCP tool-updates om `source` en `warning` weer te geven. -**T33**— Denkniveau naar budgetconversie: vertaalt kwalitatieve denkniveaus naar nauwkeurige budgettoewijzingen. -**T41**— Automatische omleiding van achtergrondtaak: routeert zware evaluatietaken op de achtergrond automatisch naar flash-/efficiënte modellen. -**T23**— Intelligente fallback voor het opnieuw instellen van quota: extraheert nauwkeurig de headerwaarden van `x-ratelimit-reset` / `retry-after` of brengt statische cooldowns in kaart.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade vanaf v2.9.5:**16 problemen opgelost · 2 community-PR's samengevoegd · 2 nieuwe providers · 7 nieuwe API-eindpunten · 3 nieuwe functies · DB-migratie 008+009 · 832 tests geslaagd · 15 sub2api gap-verbeteringen (T01–T15 voltooid).### 🆕 New Providers

| Aanbieder        | Alias ​​       | Niveau  | Opmerkingen                                                        |
| ---------------- | -------------- | ------- | ------------------------------------------------------------------ |
| **OpenCode Zen** | `opencode-zen` | Gratis  | 3 modellen via `opencode.ai/zen/v1` (PR #530 door @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Betaald | 4 modellen via `opencode.ai/zen/go/v1` (PR #530 door @kang-heewon) |

Beide providers gebruiken de nieuwe `OpencodeExecutor` met multi-format routing (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Genereer automatisch OmniRoute API-sleutels en geef ze programmatisch uit, met handhaving van quota per provider en per account.

| Eindpunt                               | Werkwijze     | Beschrijving                                                             |
| -------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| `/api/v1/geregistreerde-sleutels`      | `POST`        | Geef een nieuwe sleutel uit — onbewerkte sleutel retourneert**eenmalig** |
| `/api/v1/geregistreerde-sleutels`      | `KRIJG`       | Lijst met geregistreerde sleutels (gemaskeerd)                           |
| `/api/v1/geregistreerde-sleutels/{id}` | `KRIJG`       | Belangrijke metadata ophalen                                             |
| `/api/v1/geregistreerde-sleutels/{id}` | `VERWIJDEREN` | Een sleutel intrekken                                                    |
| `/api/v1/registered-keys/{id}/revoke`  | `POST`        | Intrekken (voor clients zonder DELETE-ondersteuning)                     |
| `/api/v1/quotas/check`                 | `KRIJG`       | Quota vooraf valideren voordat u deze uitgeeft                           |
| `/api/v1/providers/{id}/limits`        | `KRIJGEN/ZET` | Uitgiftelimieten per provider configureren                               |
| `/api/v1/accounts/{id}/limits`         | `KRIJGEN/ZET` | Uitgiftelimieten per account configureren                                |
| `/api/v1/issues/rapport`               | `POST`        | Rapporteer quotagebeurtenissen aan GitHub Issues                         |

**DB — Migratie 008:**Drie nieuwe tabellen: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Beveiliging:**Sleutels opgeslagen als SHA-256-hashes. Onbewerkte sleutel wordt één keer getoond bij het maken en kan nooit meer worden opgehaald.
**Quotatypen:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per provider en per account.
**Idempotency:**Het veld `idempotency_key` voorkomt dubbele uitgifte. Retourneert '409 IDEMPOTENCY_CONFLICT' als de sleutel al werd gebruikt.
**Budget per sleutel:**`dailyBudget` / `hourlyBudget` — beperkt het aantal verzoeken dat een sleutel per venster kan routeren.
**GitHub-rapportage:**Optioneel. Stel `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` in om automatisch GitHub-problemen aan te maken bij overschrijding van quota of mislukte uitgiftes.#### 🎨 Provider Icons — @lobehub/icons (#529)

Alle providerpictogrammen in het dashboard gebruiken nu `@lobehub/icons` React-componenten (130+ providers met SVG).
Terugvalketen:**Lobehub SVG → bestaand `/providers/{id}.png` → algemeen pictogram**. Gebruikt een correct React `ErrorBoundary`-patroon.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute vernieuwt nu automatisch elke**24 uur**de modellijsten voor aangesloten providers.

- Draait bij het opstarten van de server via de bestaande `/api/sync/initialize` hook
- Configureerbaar via omgevingsvariabele `MODEL_SYNC_INTERVAL_HOURS`
- Omvat 16 grote providers
- Registreert de laatste synchronisatietijd in de instellingendatabase---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Duidelijke actiegerichte fout wanneer `GEMINI_OAUTH_CLIENT_SECRET` ontbreekt in Docker/zelf-gehoste implementaties. Eerder werd het cryptische `client_secret ontbreekt` van Google getoond. Biedt nu specifieke `docker-compose.yml` en `~/.omniroute/.env` instructies.#### Providers & Routing

-**#536 — LongCat AI:**`baseUrl` (`api.longcat.chat/openai`) en `authHeader` (`Authorisatie: Bearer`) opgelost. -**#535 — Vastgezette modeloverschrijving:**`body.model` is nu correct ingesteld op `pinnedModel` wanneer contextcachebescherming actief is. -**#532 — OpenCode Go-sleutelvalidatie:**Gebruikt nu het `zen/v1`-testeindpunt (`testKeyBaseUrl`) — dezelfde sleutel werkt voor beide lagen.#### CLI & Tools

-**#527 — Claude Code + Codex-lus:**`tool_result`-blokken worden nu geconverteerd naar tekst in plaats van weggelaten, waardoor oneindige tool-result-lussen worden gestopt. -**#524 — OpenCode config save:**`saveOpenCodeConfig()` handler toegevoegd (XDG_CONFIG_HOME op de hoogte, schrijft TOML). -**#521 — Login blijft hangen:**Login loopt niet langer vast na het overslaan van het instellen van het wachtwoord — wordt correct doorgestuurd naar onboarding. -**#522 — API Manager:**Misleidende knop "Gemaskeerde sleutel kopiëren" verwijderd (vervangen door tooltip met een slotpictogram). -**#532 — OpenCode Go config:**Gidsinstellingenhandler verwerkt nu `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Ontbrekende `googleProjectId` retourneert een gestructureerde 422-fout met begeleiding voor opnieuw verbinden in plaats van een cryptische crash. -**#510 — Windows-paden:**MSYS2/Git-Bash-paden (`/c/Program Files/...`) worden nu automatisch genormaliseerd naar `C:\Program Files\...`. -**#492 — CLI opstarten:**`omniroute` CLI detecteert nu `mise`/`nvm`-managed Node wanneer `app/server.js` ontbreekt en toont gerichte oplossingsinstructies.---

### 📖 Documentation Updates

-**#513**— Docker-wachtwoord opnieuw instellen: `INITIAL_PASSWORD` env var-oplossing gedocumenteerd -**#520**— pnpm: `pnpm goedkeuring-buildt betere-sqlite3` stap gedocumenteerd---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Auteur       | Samenvatting                                                           |
| -------- | ------------ | ---------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go-providers met `OpencodeExecutor` en verbeterde tests | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— DB-persistentie met snelheidslimiet: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` in `providers.ts`. De bestaande kolom 'rate_limited_until' wordt nu weergegeven als een speciale API. Het vernieuwen van OAuth-tokens mag dit veld NIET aanraken om lussen met snelheidslimieten te voorkomen. -**T08**— Sessielimiet per API-sleutel: `max_sessions INTEGER DEFAULT 0` toegevoegd aan `api_keys` via automatische migratie. `sessionManager.ts` krijgt `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` en `getActiveSessionCountForKey()`. Bellers in `chatCore.js` kunnen de limiet afdwingen en verlagen op `req.close`. -**T09**— Codex versus Spark-snelheidslimietbereiken: `getCodexModelScope()` en `getCodexRateLimitKey()` in `codex.ts`. Standaardmodellen (`gpt-5.x-codex`, `codex-mini`) krijgen scope `"codex"`; spark-modellen (`codex-spark*`) krijgen bereik `"spark"`. Tarieflimietsleutels moeten `${accountId}:${scope}` zijn, zodat het uitputten van de ene pool de andere niet blokkeert. -**T13**— Oplossing voor verouderde quotaweergave: `getEffectiveQuotaUsage(used, resetAt)` retourneert `0` wanneer het resetvenster is verstreken; `formatResetCountdown(resetAt)` retourneert een voor mensen leesbare aftelreeks (bijvoorbeeld `"2h 35m"`). Beide geëxporteerd vanuit `providers.ts` + `localDb.ts` voor dashboardgebruik. -**T14**— Proxy fast-fail: nieuwe `src/lib/proxyHealth.ts` met `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP-controle, ≤2s in plaats van 30s time-out), `getCachedProxyHealth()`, `invalidateProxyHealth()` en `getAllProxyHealthStatuses()`. Resultaten worden standaard in de cache opgeslagen in de jaren 30; configureerbaar via `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testsuite:**832 tests, 0 mislukkingen**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— kolom `requested_model` in `call_logs` (migratie 009): volg welk model de client oorspronkelijk heeft aangevraagd versus het feitelijk gerouteerde model. Maakt analyse van terugvalpercentages mogelijk. -**T02**— Verwijder lege tekstblokken uit geneste `tool_result.content`: voorkomt Anthropic 400-fouten (`tekstinhoudblokken mogen niet leeg zijn`) wanneer Claude Code toolresultaten aan elkaar koppelt. -**T03**— Parseer de headers van `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extraheer Codex-quotumvensters voor een nauwkeurige afkoelperiode in plaats van een algemene terugval van 5 minuten. -**T04**— `X-Session-Id` header voor externe sticky routing: `extractExternalSessionId()` in `sessionManager.ts` leest `x-session-id` / `x-omniroute-session` headers met het voorvoegsel `ext:` om botsingen met interne SHA-256 sessie-ID's te voorkomen. Nginx-compatibel (afgebroken header). -**T06**— Account gedeactiveerd → permanente blokkering: `isAccountDeactivated()` in `accountFallback.ts` detecteert 401 deactiveringssignalen en past een cooldown van 1 jaar toe om te voorkomen dat permanent dode accounts opnieuw worden geprobeerd. -**T07**— X-Forwarded-For IP-validatie: nieuwe `src/lib/ipUtils.ts` met `extractClientIp()` en `getClientIpFromRequest()` — slaat `onbekende`/niet-IP-items over in `X-Forwarded-For`-ketens (Nginx/proxy-doorgestuurde verzoeken). -**T10**— Credits uitgeput → duidelijke fallback: `isCreditsExhausted()` in `accountFallback.ts` retourneert een afkoelperiode van 1 uur met de vlag `creditsExhausted`, verschillend van de algemene 429-snelheidslimiet. -**T11**— `max` redeneerinspanning → 131072 budgettokens: `EFFORT_BUDGETS` en `THINKING_LEVEL_MAP` bijgewerkt; reverse mapping retourneert nu `"max"` voor antwoorden met een volledig budget. Eenheidstest bijgewerkt. -**T12**— MiniMax M2.7-prijsgegevens toegevoegd: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` toegevoegd aan prijstabel (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi-prijzen bestonden al. -**T15**— Normalisatie van array-inhoud: `normalizeContentToString()` helper in `openai-to-claude.ts` vouwt array-geformatteerde systeem-/toolberichten correct samen in string voordat ze naar Anthropic worden verzonden.### 🧪 Tests

- Testsuite:**832 tests, 0 fouten**(ongewijzigd ten opzichte van rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API voor registratie van geregistreerde sleutels: automatische uitgifte van API-sleutels met handhaving van quota per provider en per account

- `POST /api/v1/registered-keys` — geef sleutels uit met idempotentie-ondersteuning
- `GET /api/v1/registered-keys` - lijst (gemaskeerde) geregistreerde sleutels
- `GET /api/v1/registered-keys/{id}` — haal belangrijke metadata op
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — sleutels intrekken
- `GET /api/v1/quotas/check` — valideer vooraf voordat u het uitgeeft
- `PUT /api/v1/providers/{id}/limits` — stel de uitgiftelimieten van de provider in
- `PUT /api/v1/accounts/{id}/limits` — stel limieten voor accountuitgifte in
- `POST /api/v1/issues/report` — optionele rapportage van GitHub-problemen
- DB-migratie 008: `registered_keys`, `provider_key_limits`, `account_key_limits` tabellen---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen- en OpenCode Go-providers toegevoegd (door @kang-heewon)

- Nieuwe `OpencodeExecutor` met routering in meerdere formaten (`/chat/completions`, `/messages`, `/responses`)
- 7 modellen op beide niveaus---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Providerpictogrammen gebruiken nu [@lobehub/icons](https://github.com/lobehub/lobe-icons) met sierlijke PNG-fallback en een `ProviderIcon`-component (130+ providers ondersteund) -**#488**— Modellijsten automatisch elke 24 uur bijwerken via `modelSyncScheduler` (configureerbaar via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: toont nu een duidelijke actiegerichte fout wanneer `GEMINI_OAUTH_CLIENT_SECRET` ontbreekt in Docker/zelf-gehoste implementaties---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI-sleutelvalidatie: vaste baseUrl (`api.longcat.chat/openai`) en authHeader (`Authorization: Bearer`) -**#535**— Vastgezette modeloverschrijving: `body.model` is nu ingesteld op `pinnedModel` wanneer contextcachebescherming een vastgezet model detecteert -**#524**— OpenCode-configuratie nu correct opgeslagen: `saveOpenCodeConfig()` handler toegevoegd (XDG_CONFIG_HOME op de hoogte, schrijft TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Inloggen loopt niet langer vast na het overslaan van het instellen van het wachtwoord (wordt omgeleid naar onboarding) -**#522**— API Manager: misleidende knop 'Gemaskeerde sleutel kopiëren' verwijderd (vervangen door tooltip met slotpictogram) -**#527**— Claude Code + Codex superkrachtenlus: `tool_result` blokken nu geconverteerd naar tekst in plaats van verwijderd -**#532**— OpenCode GO API-sleutelvalidatie gebruikt nu het juiste `zen/v1`-eindpunt (`testKeyBaseUrl`) -**#489**— Antigravity: ontbrekende `googleProjectId` retourneert gestructureerde 422-fout met begeleiding voor opnieuw verbinden -**#510**— Windows: MSYS2/Git-Bash-paden (`/c/Program Files/...`) zijn nu genormaliseerd naar `C:\Program Files\...` -**#492**— `omniroute` CLI detecteert nu `mise`/`nvm` wanneer `app/server.js` ontbreekt en toont gerichte oplossing### Documentatie

-**#513**— Docker-wachtwoord opnieuw instellen: `INITIAL_PASSWORD` env var-oplossing gedocumenteerd -**#520**— pnpm: `pnpm goedkeuring bouwt betere sqlite3` gedocumenteerd### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: nieuwe OpenCode-providers, oplossing voor het insluiten van inloggegevens, CLI-gemaskeerde sleutelfout, oplossing CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**CLI-tools slaan gemaskeerde API-sleutel op in configuratiebestanden**— `claude-settings`, `cline-settings` en `openclaw-settings` POST-routes accepteren nu een `keyId`-param en lossen de echte API-sleutel van DB op voordat ze naar schijf schrijven. `ClaudeToolCard` bijgewerkt om `keyId` te verzenden in plaats van de gemaskeerde weergavereeks. Oplossingen #523, #526. -**Aangepaste insluitingsproviders: `Geen inloggegevens`-fout**— `/v1/embeddings` volgt nu `credentialsProviderId` afzonderlijk van het routeringsvoorvoegsel, zodat inloggegevens worden opgehaald van de overeenkomende providerknooppunt-ID in plaats van de openbare voorvoegselreeks. Er is een regressie opgelost waarbij `google/gemini-embedding-001` en soortgelijke modellen voor aangepaste providers altijd mislukten met een inlogfout. Oplossing voor #532-gerelateerd. (PR #528 door @jacob2826) -**Regex voor contextcachebescherming mist `
` voorvoegsel**— `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` bijgewerkt zodat het overeenkomt met beide letterlijke `
` (backslash-n) en daadwerkelijke nieuwe regel U+000A die `combo.ts`-streaming rond de `<omniModel>`-tag injecteert na reparatie #515. Oplossing #531.### ✨ New Providers

-**OpenCode Zen**— Gratis tier gateway op `opencode.ai/zen/v1` met 3 modellen: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Abonnementservice op `opencode.ai/zen/go/v1` met 4 modellen: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude-formaat), `minimax-m2.5` (Claude-formaat)

- Beide providers gebruiken de nieuwe `OpencodeExecutor` die dynamisch routeert naar `/chat/completions`, `/messages`, `/responses` of `/models/{model}:generateContent` op basis van het gevraagde model. (PR #530 door @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Bugfixes – bewaar de cachesleutel van de Codex-prompt, repareer het ontsnappen van tagContent JSON, synchroniseer de verlopen tokenstatus met DB.### 🐛 Bug Fixes

-**fix(translator)**: Bewaar `prompt_cache_key` in Responses API → Chat Voltooiingen vertaling (#517)
— Het veld is een cache-affiniteitssignaal dat door Codex wordt gebruikt; het strippen ervan verhinderde snelle cachehits.
Opgelost in `openai-responses.ts` en `responsesApiHelper.ts`.

-**fix(combo)**: Ontsnappen `
` in `tagContent`, dus de geïnjecteerde JSON-tekenreeks is geldig (#515)
— Letterlijke nieuwe regels van de sjabloon (U+000A) zijn niet toegestaan zonder escapecodes binnen JSON-tekenreekswaarden.
Vervangen door `\n` letterlijke reeksen in `open-sse/services/combo.ts`.

-**fix(usage)**: Synchroniseer de verlopen tokenstatus terug naar DB bij live-authenticatiefout (#491)
— Wanneer de Live Check Limits & Quotas 401/403 retourneert, wordt de verbinding `testStatus` nu bijgewerkt
naar `"verlopen"` in de database, zodat de Providers-pagina dezelfde verslechterde staat weergeeft.
Opgelost in `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: voeg 5 nieuwe gratis AI-providers toe: LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: LongCat AI toevoegen (`lc/`) — 50 miljoen tokens/dag gratis (Flash-Lite) + 500K/dag (chat/denken) tijdens de openbare bèta. OpenAI-compatibel, standaard Bearer-authenticatie. -**feat(providers/pollinations)**: Voeg Pollinations AI toe (`pol/`) - geen API-sleutel vereist. Proxy's GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 vereiste/15s gratis). Aangepaste uitvoerder verwerkt optionele verificatie. -**feat(providers/cloudflare-ai)**: Voeg Cloudflare Workers AI toe (`cf/`) — 10K neuronen/dag gratis (~150 LLM-reacties of 500s Whisper-audio). 50+ modellen met een mondiale voorsprong. Aangepaste uitvoerder bouwt een dynamische URL met `accountId` op basis van inloggegevens. -**feat(providers/scaleway)**: Voeg Scaleway Generative API's toe (`scw/`) — 1 miljoen gratis tokens voor nieuwe accounts. Voldoet aan EU/GDPR (Parijs). Qwen3 235B, Lama 3.1 70B, Mistral Klein 3.2. -**feat(providers/aimlapi)**: AI/ML API toevoegen (`aiml/`) — $ 0,025/dag gratis tegoed, 200+ modellen (GPT-4o, Claude, Gemini, Llama) via één aggregatoreindpunt.### 🔄 Provider Updates

-**feat(providers/samen)**: Voeg `hasFree: true` + 3 permanent gratis model-ID's toe: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Voeg `hasFree: true` + `freeNote` toe (1.500 vereist/dag, geen creditcard nodig, aistudio.google.com) -**chore(providers/gemini)**: hernoem de weergavenaam naar `Gemini (Google AI Studio)` voor de duidelijkheid### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Nieuwe `PollinationsExecutor` — laat de header `Authorization` weg als er geen API-sleutel is opgegeven -**feat(executors/cloudflare-ai)**: Nieuwe `CloudflareAIExecutor` — voor dynamische URL-constructie is `accountId` nodig in de inloggegevens van de provider -**feat(executors)**: Registreer `pollinations`, `pol`, `cloudflare-ai`, `cf` executortoewijzingen### Documentatie

-**docs(readme)**: gratis combo-stack uitgebreid naar 11 providers ($0 voor altijd) -**docs(readme)**: 4 nieuwe gratis providersecties toegevoegd (LongCat, Pollinations, Cloudflare AI, Scaleway) met modeltabellen -**docs(readme)**: bijgewerkte prijstabel met 4 nieuwe gratis rijen -**docs(i18n/pt-BR)**: bijgewerkte prijstabel + toegevoegde LongCat/Pollinations/Cloudflare AI/Scaleway-secties in het Portugees -**docs(new-features/ai)**: 10 taakspecificatiebestanden + hoofdimplementatieplan in `docs/new-features/ai/`### 🧪 Tests

- Testsuite:**821 tests, 0 fouten**(ongewijzigd)---

## [2.9.2] — 2026-03-21

> Sprint: mediatranscriptie (Deepgram/HuggingFace Content-Type, taaldetectie) en TTS-foutweergave repareren.### 🐛 Bug Fixes

-**fix(transcriptie)**: Deepgram- en HuggingFace-audiotranscriptie brengt nu `video/mp4` → `audio/mp4` en andere MIME-mediatypen correct in kaart via de nieuwe `resolveAudioContentType()`-helper. Voorheen leverde het uploaden van `.mp4`-bestanden consequent de melding "Geen spraak gedetecteerd" op, omdat Deepgram `Content-Type: video/mp4` ontving. -**fix(transcriptie)**: `detect_taal=true` toegevoegd aan Deepgram-verzoeken — detecteert automatisch de audiotaal (Portugees, Spaans, enz.) in plaats van standaard Engels te gebruiken. Er is een probleem opgelost met niet-Engelse transcripties die lege of rommelige resultaten opleveren. -**fix(transcriptie)**: `punctuate=true` toegevoegd aan Deepgram-verzoeken voor transcriptie-uitvoer van hogere kwaliteit met correcte interpunctie. -**fix(tts)**: `[object Object]` foutweergave in tekst-naar-spraak-antwoorden opgelost in zowel `audioSpeech.ts` als `audioTranscription.ts`. De functie `upstreamErrorResponse()` extraheert nu correct geneste stringberichten van providers zoals ElevenLabs die `{ error: { message: "...", status_code: 401 } }` retourneren in plaats van een platte foutstring.### 🧪 Tests

- Testsuite:**821 tests, 0 fouten**(ongewijzigd)### Triaged Issues

-**#508**— Regressie van tooloproepformaat: aangevraagde proxylogboeken en providerketeninformatie (`needs-info`) -**#510**— Pad voor Windows CLI-gezondheidscontrole: aangevraagde versie-informatie van de shell/knooppunt (`needs-info`) -**#485**— Kiro MCP-tooloproepen: gesloten als extern Kiro-probleem (niet OmniRoute) -**#442**— Baseten /models-eindpunt: gesloten (gedocumenteerde handmatige oplossing) -**#464**— Key provisioning API: erkend als roadmapitem---

## [2.9.1] — 2026-03-21

> Sprint: gegevensverlies in SSE omniModel oplossen, modelcompatibiliteit per protocol samenvoegen.### Bug Fixes

-**#511**— Kritiek: `<omniModel>` tag is verzonden na `finish_reason:stop` in SSE-streams, waardoor gegevensverlies is veroorzaakt. De tag wordt nu in het eerste niet-lege inhoudsdeel geïnjecteerd, waardoor levering wordt gegarandeerd voordat SDK's de verbinding verbreken.### Merged PRs

-**PR #512**(@zhangqiang8vip): Compatibiliteit van modellen per protocol — `normalizeToolCallId` en `preserveOpenAIDeveloperRole` kunnen nu worden geconfigureerd per clientprotocol (OpenAI, Claude, Responses API). Nieuw `compatByProtocol`-veld in modelconfiguratie met Zod-validatie.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: gevraagde PATH-/versie-informatie -**#509**— Turbopack Electron-regressie: upstream Next.js-bug, gedocumenteerde oplossingen -**#508**— macOS zwart scherm: voorgestelde `--disable-gpu` oplossing---

## [2.9.0] — 2026-03-20

> Sprint: oplossing voor machine-ID voor meerdere platforms, snelheidslimieten per API-sleutel, cache voor streamingcontext, Alibaba DashScope, zoekanalyses, ZWS v5 en 8 problemen gesloten.### ✨ New Features

-**feat(search)**: tabblad Zoekanalyse in `/dashboard/analytics` - overzicht van providers, cachehitpercentage, bijhouden van kosten. Nieuwe API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope toegevoegd met aangepaste eindpuntpadvalidatie - configureerbaar `chatPath` en `modelsPath` per knooppunt (#feat/custom-endpoint-paths) -**feat(api)**: Limieten voor het aantal verzoeken per API-sleutel - kolommen `max_requests_per_day` en `max_requests_per_minute` met handhaving in het geheugen met glijdend venster dat HTTP 429 (#452) retourneert -**feat(dev)**: ZWS v5 — HMR-lekfix (485 DB-verbindingen → 1), geheugen 2,4 GB → 195 MB, `globalThis` singletons, Edge Runtime-waarschuwingsfix (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` herschreven met try/catch-waterval (Windows REG.exe → macOS ioreg → Linux-bestand lezen → hostnaam → `os.hostname()`). Elimineert de `process.platform`-vertakking die door de dode code van de Next.js-bundeler is geëlimineerd, en repareert ``head' wordt niet herkend` op Windows. Repareert ook #466. -**fix(#493)**: Aangepaste naamgeving van providermodel - onjuiste prefix-stripping verwijderd in `DefaultExecutor.transformRequest()` waardoor organisatie-scope-model-ID's zoals `zai-org/GLM-5-FP8` werden verminkt. -**fix(#490)**: Streaming + contextcachebescherming — `TransformStream` onderschept SSE om de `<omniModel>`-tag vóór de `[DONE]`-markering te injecteren, waardoor contextcachebescherming voor streaming-reacties mogelijk wordt gemaakt. -**fix(#458)**: Combinatieschemavalidatie — `system_message`, `tool_filter_regex`, `context_cache_protection` velden passeren nu Zod-validatie bij opslaan. -**fix(#487)**: KIRO MITM-kaart opschonen - ZWS_README verwijderd, `AntigravityToolCard` gegenereerd om dynamische tool-metagegevens te gebruiken.### 🧪 Tests

- Anthropic-format tools filter unit tests toegevoegd (PR #397) - 8 regressietests voor `tool.name` zonder `.function` wrapper
- Testsuite:**821 tests, 0 fouten**(was 813)### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` niet herkend (opgelost) -**#493**— Aangepaste naamgeving van providermodel (opgelost) -**#490**— Streamingcontextcache (opgelost) -**#452**— Limietverzoeken per API-sleutel (geïmplementeerd) -**#466**— Windows-inlogfout (dezelfde hoofdoorzaak als #506) -**#504**— MITM inactief (verwacht gedrag) -**#462**— Gemini CLI PSA (opgelost) -**#434**— Electron-app crasht (duplicaat van #402)## [2.8.9] — 2026-03-20

> Sprint: gemeenschaps-PR's samenvoegen, KIRO MITM-kaart repareren, afhankelijkheidsupdates.### Merged PRs

-**PR #498**(@Sajid11194): Crash van Windows-computer-ID (`undefined\REG.exe`) verholpen. Vervangt `node-machine-id` door systeemeigen registerquery's van het besturingssysteem.**Sluit #486.** -**PR #497**(@zhangqiang8vip): HMR-bronlekken in dev-modus repareren — 485 gelekte DB-verbindingen → 1, geheugen 2,4 GB → 195 MB. `globalThis` singletons, Edge Runtime-waarschuwing opgelost, Windows-teststabiliteit. (+1168/-338 verdeeld over 22 bestanden) -**PRs #499-503**(Dependabot): GitHub Actions-updates — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— De KIRO MITM-kaart geeft nu toolspecifieke instructies weer (`api.anthropic.com`) in plaats van Antigravity-specifieke tekst. -**#504**— Gereageerd met UX-verduidelijking (MITM "Inactief" is verwacht gedrag wanneer de proxy niet actief is).---

## [2.8.8] — 2026-03-20

> Sprint: Fix OAuth-batchtestcrash, voeg de knop "Alles testen" toe aan individuele providerpagina's.### Bug Fixes

-**OAuth batchtestcrash**(ERR_CONNECTION_REFUSED): Sequentiële for-loop vervangen door gelijktijdigheidslimiet van 5 verbindingen + time-out van 30 seconden per verbinding via `Promise.race()` + `Promise.allSettled()`. Voorkomt servercrash bij het testen van grote OAuth-providergroepen (~30+ verbindingen).### Functies

-**"Test Alles"-knop op providerpagina's**: individuele providerpagina's (bijvoorbeeld `/providers/codex`) tonen nu een "Test Alles"-knop in de Verbindingen-header wanneer er meer dan 2 verbindingen zijn. Gebruikt `POST /api/providers/test-batch` met `{mode: "provider", providerId}`. Resultaten weergegeven in een modaal met een geslaagd/mislukt-samenvatting en diagnose per verbinding.---

## [2.8.7] — 2026-03-20

> Sprint: PR #495 samenvoegen (knelpunt 429 wegvallen), oplossing #496 (aangepaste insluitingsproviders), triage-functies.### Bug Fixes

-**Knelpunt 429 oneindig wachten**(PR #495 door @xandr0s): Op 429 mislukt `limiter.stop({ dropWaitingJobs: true })` onmiddellijk alle verzoeken in de wachtrij, zodat upstream-bellers een terugval kunnen activeren. Limiter wordt uit Map verwijderd, dus bij het volgende verzoek wordt een nieuw exemplaar gemaakt. -**Aangepaste insluitingsmodellen onoplosbaar**(#496): `POST /v1/embeddings` lost nu aangepaste insluitingsmodellen op van ALLE provider_nodes (niet alleen localhost). Maakt het mogelijk dat modellen zoals `google/gemini-embedding-001` via het dashboard worden toegevoegd.### Issues Responded

-**#452**— Limieten voor het aantal verzoeken per API-sleutel (erkend, op roadmap) -**#464**— API-sleutels automatisch uitgeven met provider-/accountlimieten (vereist meer details) -**#488**— Modellijsten automatisch bijwerken (erkend, op routekaart) -**#496**— Aangepaste resolutie van de insluitingsprovider (vast)---

## [2.8.6] — 2026-03-20

> Sprint: PR #494 samenvoegen (MiniMax-rol opgelost), KIRO MITM-dashboard repareren, 8 problemen beoordelen.### Functies

-**MiniMax ontwikkelaar → systeemrol opgelost**(PR #494 door @zhangqiang8vip): 'preserveDeveloperRole'-schakelaar per model. Voegt de gebruikersinterface "Compatibiliteit" toe op de providerspagina. Oplossing voor 422 "rolparameterfout" voor MiniMax en soortgelijke gateways. -**roleNormalizer**: `normalizeDeveloperRole()` accepteert nu de parameter `preserveDeveloperRole` met gedrag in drie toestanden (ungedefinieerd=keep, true=keep, false=convert). -**DB**: Nieuw `getModelPreserveOpenAIDeveloperRole()` en `mergeModelCompatOverride()` in `models.ts`.### Bug Fixes

-**KIRO MITM-dashboard**(#481/#487): `CLIToolsPageClient` stuurt nu elk `configType: "mitm"`-tool naar `AntigravityToolCard` (MITM Start/Stop-besturingselementen). Voorheen was alleen Antigravity hardgecodeerd. -**AntigravityToolCard generiek**: gebruikt `tool.image`, `tool.description`, `tool.id` in plaats van hardgecodeerde Antigravity-waarden. Beschermt tegen ontbrekende `defaultModels`.### Cleanup

- `ZWS_README_V2.md` verwijderd (documentatie voor alleen ontwikkeling uit PR #494).### Issues Triaged (8)

-**#487**— Gesloten (KIRO MITM opgelost in deze release) -**#486**— behoeften-info (Windows REG.exe PATH-probleem) -**#489**— behoeften-info (Antigravity projectId ontbreekt, OAuth opnieuw verbinden vereist) -**#492**— behoeften-info (ontbrekende app/server.js op door mise beheerd knooppunt) -**#490**— Erkend (streaming + contextcache blokkeren, oplossing gepland) -**#491**— Erkend (inconsistentie van de codex-authenticatie) -**#493**— Erkend (voorvoegsel modelnaam modale provider, tijdelijke oplossing geboden) -**#488**— Backlog van functieverzoeken (modellenlijsten automatisch bijwerken)---

## [2.8.5] — 2026-03-19

> Sprint: repareer zombie-SSE-streams, contextcache eerste beurt, KIRO MITM en sorteer 5 externe problemen.### Bug Fixes

-**Zombie SSE-streams**(#473): Verlaag `STREAM_IDLE_TIMEOUT_MS` van 300s → 120s voor snellere combo-terugval wanneer providers halverwege de stream vastlopen. Configureerbaar via env var. -**Context Cache Tag**(#474): Fix `injectModelTag()` om verzoeken voor de eerste beurt af te handelen (geen assistent-berichten) — context cache-beveiliging werkt nu vanaf het allereerste antwoord. -**KIRO MITM**(#481): Wijzig KIRO `configType` van `guide` → `mitm` zodat het dashboard MITM Start/Stop-besturingselementen weergeeft. -**E2E-test**(CI): Fix `providers-bailian-coding-plan.spec.ts` — verwijder de reeds bestaande modale overlay voordat u op de knop API-sleutel toevoegen klikt.### Closed Issues

- #473 — Zombie SSE-streams omzeilen combo-fallback
- #474 — Contextcache `<omniModel>` tag ontbreekt bij de eerste beurt
- #481 — MITM voor KIRO kan niet worden geactiveerd vanaf het dashboard
- #468 — Gemini CLI externe server (vervangen door beëindiging van #462)
- #438 — Claude kan geen bestanden schrijven (extern CLI-probleem)
- #439 — AppImage werkt niet (gedocumenteerde libfuse2 oplossing)
- #402 — ARM64 DMG "beschadigd" (gedocumenteerde xattr -cr oplossing)
- #460 — CLI kan niet worden uitgevoerd op Windows (gedocumenteerde PATH-oplossing)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI-beëindiging, VM-gids i18n-fix, dependabot-beveiligingsfix, uitbreiding van het providerschema.### Functies

-**Beëindiging Gemini CLI**(#462): Markeer de provider `gemini-cli` als verouderd met waarschuwing: Google beperkt het OAuth-gebruik van derden vanaf maart 2026 -**Provider Schema**(#462): Zod-validatie uitbreiden met optionele velden `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Voeg `VM_DEPLOYMENT_GUIDE.md` toe aan de i18n-vertaalpijplijn, genereer alle 30 lokale vertalingen uit de Engelse bron (zaten vast in het Portugees)### Beveiliging

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — corrigeert de vervuiling van het CWE-1321-prototype (#484, @dependabot)### Closed Issues

- #472 — Regressie van modelaliassen (opgelost in v2.8.2)
- #471 — Vertalingen van VM-gidsen zijn defect
- #483 — Na `data: null` na `[DONE]` (opgelost in v2.8.3)### Merged PRs

- #484 — deps: bump afgevlakt van 3.3.3 naar 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Tsjechisch i18n, SSE-protocolfix, vertaling van VM-gids.### Functies

-**Tsjechische taal**(#482): Volledig Tsjechisch (cs) i18n — 22 documenten, 2606 UI-strings, taalwisselaarupdates (@zen0bit) -**VM-implementatiehandleiding**: vertaald van Portugees naar Engels als brondocument (@zen0bit)### Bug Fixes

-**SSE Protocol**(#483): Stop met het verzenden van trailing `data: null` na `[DONE]` signaal - repareert `AI_TypeValidationError` in strikte AI SDK-clients (op Zod gebaseerde validators)### Merged PRs

- #482 — Tsjechische taal toevoegen + VM_DEPLOYMENT_GUIDE.md Engelse bron repareren (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 samengevoegde PR's, routering van modelaliassen, export van logboeken en probleemtriage.### Functies

-**Logboekexport**: Nieuwe exportknop op `/dashboard/logs` met vervolgkeuzelijst voor tijdsbereik (1 uur, 6 uur, 12 uur, 24 uur). Downloadt JSON van verzoek/proxy/oproeplogboeken via `/api/logs/export` API (#user-request)### Bug Fixes

-**Routing van modelaliassen**(#472): Instellingen → Modelaliassen hebben nu een correcte invloed op de routering van de provider, niet alleen op de detectie van het formaat. Previously `resolveModelAlias()` output was only used for `getModelTargetFormat()` but the original model ID was sent to the provider -**Stream Flush-gebruik**(#480): gebruiksgegevens van de laatste SSE-gebeurtenis in de buffer worden nu correct geëxtraheerd tijdens het streamen (samengevoegd van @prakersh)### Merged PRs

- #480 — Haal het gebruik uit de resterende buffer in de flushhandler (@prakersh)
- #479 — Voeg ontbrekende Codex 5.3/5.4 en Anthropic model ID-prijsvermeldingen toe (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Vijf gemeenschaps-PR's: oplossingen voor streaming oproeplogboeken, Kiro-compatibiliteit, cachetokenanalyse, Chinese vertaling en configureerbare tooloproep-ID's.### Functies

-**feat(logs)**: de inhoud van de oproeplogreacties is nu correct verzameld uit onbewerkte providerfragmenten (OpenAI/Claude/Gemini) vóór vertaling, waarbij lege responspayloads in streamingmodus worden gerepareerd (#470, @zhangqiang8vip) -**feat(providers)**: per model configureerbare ID-normalisatie van 9 tekens voor tooloproepen (Mistral-stijl) - alleen modellen met de optie ingeschakeld krijgen ingekorte ID's (#470) -**feat(api)**: Key PATCH API uitgebreid ter ondersteuning van de velden `allowedConnections`, `name`, `autoResolve`, `isActive` en `accessSchedule` (#470) -**feat(dashboard)**: lay-out met eerst antwoord in de gebruikersinterface van het verzoeklogboek (#470) -**feat(i18n)**: verbeterde Chinese (zh-CN) vertaling — volledige hervertaling (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Verwijder het geïnjecteerde `model`-veld uit de hoofdtekst van het verzoek — Kiro API weigert onbekende velden op het hoogste niveau (#478, @prakersh) -**fix(usage)**: Cache-lees- en cache-aanmaaktokens opnemen in de invoertotalen van de gebruiksgeschiedenis voor nauwkeurige analyses (#477, @prakersh) -**fix(callLogs)**: ondersteuning voor gebruiksvelden in het Claude-formaat (`input_tokens`/`output_tokens`) naast het OpenAI-formaat, inclusief alle cachetokenvarianten (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: leverancier van Bailian Coding Plan met bewerkbare basis-URL's, plus communitybijdragen voor Alibaba Cloud en Kimi Coding.### Functies

-**feat(providers)**: Bailian Coding Plan toegevoegd (`bailian-coding-plan`) - Alibaba Model Studio met Anthropic-compatibele API. Statische catalogus van 8 modellen, waaronder Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 en Kimi K2.5. Inclusief aangepaste verificatievalidatie (400=geldig, 401/403=ongeldig) (#467, @Mind-Dragon) -**feat(admin)**: bewerkbare standaard-URL in Provider Admin-stromen voor het maken/bewerken – gebruikers kunnen aangepaste basis-URL's per verbinding configureren. Blijven bestaan ​​in `providerSpecificData.baseUrl` waarbij Zod-schemavalidatie niet-http(s)-schema's afwijst (#467)### 🧪 Tests

- Meer dan 30 unit-tests en 2 e2e-scenario's toegevoegd voor de Bailian Coding Plan-provider, waaronder auth-validatie, schemaverharding, gedrag op routeniveau en cross-layer-integratie---

## [2.7.10] — 2026-03-19

> Sprint: twee nieuwe door de gemeenschap bijgedragen providers (Alibaba Cloud Coding, Kimi Coding API-key) en Docker pino-fix.### Functies

-**feat(providers)**: ondersteuning voor Alibaba Cloud Coding Plan toegevoegd met twee OpenAI-compatibele eindpunten: `alicode` (China) en `alicode-intl` (Internationaal), elk met 8 modellen (#465, @dtk1985) -**feat(providers)**: speciaal 'kimi-coding-apikey' providerpad toegevoegd - op API-sleutel gebaseerde Kimi Coding-toegang wordt niet langer geforceerd via de 'kimi-coding'-route die alleen OAuth is. Inclusief register, constanten, modellen-API, configuratie en validatietest (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: ontbrekende `split2`-afhankelijkheid toegevoegd aan Docker-image - `pino-abstract-transport` vereist dit tijdens runtime, maar het werd niet gekopieerd naar de zelfstandige container, waardoor `Cannot find module 'split2'` crasht (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Subpath-passthrough van Codex-reacties wordt standaard ondersteund, Windows MITM-crash opgelost en Combos-agentschema's aangepast.### Functies

-**feat(codex)**: Native response subpath passthrough voor Codex - routeert `POST /v1/responses/compact` native naar Codex upstream, waarbij Claude Code-compatibiliteit behouden blijft zonder het `/compact` achtervoegsel (#457) te verwijderen### 🐛 Bug Fixes

-**fix(combos)**: Zod-schema's (`updateComboSchema` en `createComboSchema`) bevatten nu `system_message`, `tool_filter_regex` en `context_cache_protection`. Er is een probleem opgelost waarbij agentspecifieke instellingen die via het dashboard waren gemaakt, stilzwijgend werden genegeerd door de backend-validatielaag (#458) -**fix(mitm)**: Kiro MITM-profielcrash op Windows opgelost — `node-machine-id` mislukte vanwege ontbrekende `REG.exe` env, en de fallback veroorzaakte een fatale `crypto is niet gedefinieerd`-fout. Fallback importeert nu veilig en correct crypto (#456)---

## [2.7.8] — 2026-03-18

> Sprint: budgetbesparende bug + combo-agent met UI + omniModel-tagbeveiligingsfix.### 🐛 Bug Fixes

-**fix(budget)**: "Save Limits" retourneert niet langer 422 — `warningThreshold` wordt nu correct verzonden als breuk (0–1) in plaats van percentage (0–100) (#451) -**fix(combos)**: `<omniModel>` interne cachetag wordt nu verwijderd voordat verzoeken naar providers worden doorgestuurd, waardoor onderbrekingen van cachesessies worden voorkomen (#454)### Functies

-**feat(combos)**: sectie Agentfuncties toegevoegd aan modaal combo maken/bewerken - maak `system_message` override, `tool_filter_regex` en `context_cache_protection` direct zichtbaar vanuit het dashboard (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino-crash, Codex CLI-reacties worker-fix, pakketvergrendelingssynchronisatie.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` en `pino-pretty` nu expliciet gekopieerd in de Docker runner-fase — de standalone trace van Next.js mist deze peer-deps, waardoor `Cannot find module pino-abstract-transport` crasht bij het opstarten (#449) -**fix(responses)**: verwijder `initTranslators()` uit `/v1/responses` route - crashte Next.js-werknemer met `de werker is afgesloten` uncaughtException op Codex CLI-verzoeken (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` wordt nu vastgelegd bij elke versiebump om ervoor te zorgen dat Docker `npm ci` exacte afhankelijkheidsversies gebruikt---

## [2.7.5] — 2026-03-18

> Sprint: UX-verbeteringen en oplossing voor Windows CLI-gezondheidscontrole.### 🐛 Bug Fixes

-**fix(ux)**: toon standaardwachtwoordhint op inlogpagina - nieuwe gebruikers zien nu `"Standaardwachtwoord: 123456"` onder de wachtwoordinvoer (#437) -**fix(cli)**: Claude CLI en andere door npm geïnstalleerde tools zijn nu correct gedetecteerd als uitvoerbaar op Windows — spawn gebruikt `shell:true` om `.cmd`-wrappers op te lossen via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: dashboard Zoekhulpmiddelen, i18n-fixes, Copilot-limieten, Serper-validatiefix.### Functies

-**feat(search)**: zoekspeelplaats toevoegen (10e eindpunt), pagina Zoekhulpmiddelen met aanbieders vergelijken/pijplijn opnieuw rangschikken/zoekgeschiedenis, lokale herrangschikkingsrouting, auth-guards op zoek-API (#443 door @Regis-RCR)

- Nieuwe route: `/dashboard/search-tools`
- Zijbalkinvoer onder de foutopsporingssectie
- `GET /api/search/providers` en `GET /api/search/stats` met auth-guards
- Lokale provider_nodes-routing voor `/v1/rerank`
- 30+ i18n-sleutels in zoeknaamruimte### 🐛 Bug Fixes

-**fix(search)**: Fix Brave news normalizer (retourneerde 0 resultaten), dwing max_results afkapping post-normalisatie af, repareer de ophaal-URL van de eindpuntenpagina (#443 door @Regis-RCR) -**fix(analytics)**: Lokaliseer dag-/datumlabels voor analyses - vervang hardgecodeerde Portugese tekenreeksen door `Intl.DateTimeFormat(locale)` (#444 door @hijak) -**fix(copilot)**: Correcte weergave van het GitHub Copilot-accounttype, filter misleidende onbeperkte quotarijen uit het limietendashboard (#445 door @hijak) -**fix(providers)**: stop met het afwijzen van geldige Serper API-sleutels – behandel niet-4xx-antwoorden als geldige authenticatie (#446 door @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex directe noodoplossing voor API-quota.### 🐛 Bug Fixes

-**fix(codex)**: Blokkeer wekelijks uitgeputte accounts in directe API-fallback (#440)

- `resolveQuotaWindow()` prefix matching: `"wekelijks"` komt nu overeen met `"wekelijks (7d)"` cachesleutels
- `applyCodexWindowPolicy()` dwingt `useWeekly`/`use5h` correct af
- 4 nieuwe regressietests (766 totaal)---

## [2.7.2] — 2026-03-18

> Sprint: UI-contrastcorrecties in de lichtmodus.### 🐛 Bug Fixes

-**fix(logs)**: corrigeer het contrast van de lichtmodus in de filterknoppen van verzoeklogboeken en combo-badge (#378)

- Fout-/succes-/combofilterknoppen nu leesbaar in de lichtmodus
- Combo-rijbadge gebruikt sterker violet in de lichtmodus---

## [2.7.1] — 2026-03-17

> Sprint: uniforme webzoekroutering (POST /v1/search) met 5 providers + Next.js 16.1.7 beveiligingsoplossingen (6 CVE's).### ✨ New Features

-**feat(search)**: uniforme webzoekroutering — `POST /v1/search` met 5 providers (Serper, Brave, Perplexity, Exa, Tavily)

- Automatische failover tussen providers, meer dan 6.500 gratis zoekopdrachten/maand
- In-memory cache met verzoekcoalescentie (configureerbare TTL)
- Dashboard: tabblad Zoekanalyse in `/dashboard/analytics` met uitsplitsing van de provider, cachehitpercentage en kostenregistratie
- Nieuwe API: `GET /api/v1/search/analytics` voor statistieken van zoekopdrachten
- DB-migratie: kolom `request_type` in `call_logs` voor het volgen van niet-chatverzoeken
- Zod-validatie (`v1SearchSchema`), geverifieerd, kosten geregistreerd via `recordCost()`### Beveiliging

-**deps**: Next.js 16.1.6 → 16.1.7 — repareert 6 CVE's: -**Kritisch**: CVE-2026-29057 (smokkel van HTTP-verzoeken via http-proxy) -**Hoog**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Serveracties) -**Gemiddeld**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Bestand                                                          | Doel                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Zoekhandler met routering van 5 providers            |
| `open-sse/config/searchRegistry.ts`                              | Providerregister (authenticatie, kosten, quota, TTL) |
| `open-sse/services/searchCache.ts`                               | In-memory cache met samenvoeging van verzoeken       |
| `src/app/api/v1/search/route.ts`                                 | Volgende.js-route (POST + GET)                       |
| `src/app/api/v1/search/analytics/route.ts`                       | Zoekstatistieken API                                 |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Tabblad Analytics-dashboard                          |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB-migratie                                          |
| `tests/unit/search-registry.test.mjs`                            | 277 regels eenheidstests                             | --- |

## [2.7.0] — 2026-03-17

> Sprint: op ClawRouter geïnspireerde functies - toolCalling-vlag, meertalige intentiedetectie, benchmarkgestuurde fallback, deduplicatie van verzoeken, inplugbare RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5-prijzen.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast — `$0,20/$0,50 per 1M tokens`, 1143ms p50 latentie, toolaanroepen ondersteund -**feat(pricing)**: xAI Grok-4 (standaard) — `$0,20/$1,50 per 1M tokens`, redenerend vlaggenschip -**feat(prijzen)**: GLM-5 via Z.AI — `$0,5/1M`, 128K uitvoercontext -**feat(pricing)**: MiniMax M2.5 — `$0,30/1M input`, redenering + agentische taken -**feat(prijzen)**: DeepSeek V3.2 — bijgewerkte prijzen `$0,27/$1,10 per 1M` -**feat(pricing)**: Kimi K2.5 via Moonshot API - directe Moonshot API-toegang -**feat(providers)**: Z.AI-provider toegevoegd (`zai` alias) — GLM-5-familie met 128K-uitvoer### 🧠 Routing Intelligence

-**feat(registry)**: vlag `toolCalling` per model in het register van de provider - combo's kunnen nu modellen die geschikt zijn voor toolcalls verkiezen/vereisen -**feat(scoring)**: meertalige intentiedetectie voor AutoCombo-scores - PT/ZH/ES/AR-script-/taalpatronen beïnvloeden de modelselectie per verzoekcontext -**feat(fallback)**: Benchmark-gestuurde fallback-ketens - gegevens over echte latentie (p50 van `comboMetrics`) gebruikt om de fallback-prioriteit dynamisch opnieuw te ordenen -**feat(dedup)**: Ontdubbeling aanvragen via content-hash - Idempotentievenster van 5 seconden voorkomt dat dubbele provideroproepen clients opnieuw proberen -**feat(router)**: inplugbare `RouterStrategy`-interface in `autoCombo/routerStrategy.ts` — aangepaste routeringslogica kan worden geïnjecteerd zonder de kern te wijzigen### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nieuwe geavanceerde toolschema's: `omniroute_get_provider_metrics` (p50/p95/p99 per provider) en `omniroute_explain_route` (uitleg over routeringsbeslissingen) -**feat(mcp)**: verificatiebereiken van MCP-tool bijgewerkt - bereik `metrics:read` toegevoegd voor tools voor providerstatistieken -**feat(mcp)**: `omniroute_best_combo_for_task` accepteert nu de parameter `lingualHint` voor meertalige routering### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` uitgebreid met realtime tracking van latentiepercentielen per provider/account -**feat(health)**: Health API (`/api/monitoring/health`) retourneert nu per provider de velden `p50Latency` en `errorRate` -**feat(usage)**: migratie van gebruiksgeschiedenis voor het bijhouden van latentie per model### 🗄️ DB Migrations

-**feat(migrations)**: Nieuwe kolom `latency_p50` in `combo_metrics` tabel — zero-breaking, veilig voor bestaande gebruikers### 🐛 Bug Fixes / Closures

-**close(#411)**: betere sqlite3 gehashte moduleresolutie op Windows - opgelost in v2.6.10 (f02c5b5) -**close(#409)**: GitHub Copilot-chatvoltooiingen mislukken met Claude-modellen wanneer bestanden zijn bijgevoegd - opgelost in v2.6.9 (838f1d6) -**close(#405)**: Duplicaat van #411 — opgelost## [2.6.10] — 2026-03-17

> Windows-fix: betere vooraf gebouwde sqlite3-download zonder node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Op Windows mislukte `npm install -g omniroute` met `better_sqlite3.node is geen geldige Win32-applicatie` omdat het gebundelde native binaire bestand voor Linux was gecompileerd. Voegt**Strategie 1.5**toe aan `scripts/postinstall.mjs`: gebruikt `@mapbox/node-pre-gyp install --fallback-to-build=false` (gebundeld in `better-sqlite3`) om het juiste vooraf gebouwde binaire bestand voor het huidige besturingssysteem/arch te downloaden zonder dat er bouwtools nodig zijn (geen node-gyp, geen Python, geen MSVC). Valt alleen terug naar 'npm restart' als het downloaden mislukt. Voegt platformspecifieke foutmeldingen toe met duidelijke handmatige oplossingsinstructies.---

## [2.6.9] — 2026-03-17

> CI-oplossingen (t11 any-budget), bugfix #409 (bestandsbijlagen via Copilot+Claude), correctie van de releaseworkflow.### 🐛 Bug Fixes

-**fix(ci)**: verwijder het woord "any" uit opmerkingen in `openai-responses.ts` en `chatCore.ts` die niet slaagden voor de t11 `any` budgetcontrole (vals positief uit het tellen van opmerkingen door regex) -**fix(chatCore)**: Normaliseer niet-ondersteunde typen inhoudsonderdelen voordat deze worden doorgestuurd naar providers (#409 — Cursor verzendt `{type:"file"}` wanneer `.md`-bestanden zijn bijgevoegd; Copilot en andere OpenAI-compatibele providers weigeren met "type moet 'image_url' of 'text' zijn; fix converteert `file`/`document`-blokken naar `text` en verwijdert onbekende typen)### 🔧 Workflow

-**chore(generate-release)**: Voeg ATOMIC COMMIT REGEL toe - versiebump (`npm versie patch`) MOET gebeuren voordat featurebestanden worden gecommit om ervoor te zorgen dat de tag altijd verwijst naar een commit die alle versiewijzigingen samen bevat---

## [2.6.8] — 2026-03-17

> Sprint: Combo als agent (systeemprompt + toolfilter), Context Caching Protection, Auto-Update, Gedetailleerde logboeken, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combo's ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Nieuwe tabel `request_detail_logs` met ringbuffertrigger met 500 vermeldingen, aanmelden via instellingenschakelaar### Functies

-**feat(combo)**: Systeembericht negeren per combo (#399 — `system_message` veld vervangt of injecteert systeemprompt voordat het wordt doorgestuurd naar de provider) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` houdt alleen tools bij die overeenkomen met het patroon; ondersteunt OpenAI + Anthropic formaten) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` tagt reacties met `<omniModel>provider/model</omniModel>` en pins-model voor sessiecontinuïteit) -**feat(settings)**: Auto-Update via Instellingen (#320 — `GET /api/system/version` + `POST /api/system/update` — controleert npm-register en updates op de achtergrond met pm2-herstart) -**feat(logs)**: gedetailleerde verzoeklogboeken (#378 — legt volledige pijplijnlichamen vast in 4 fasen: klantverzoek, vertaald verzoek, respons van provider, respons van klant — opt-in-schakelaar, trim van 64 KB, ringbuffer met 500 ingangen) -**feat(mitm)**: MITM Kiro IDE-profiel (#336 — `src/mitm/targets/kiro.ts` richt zich op api.anthropic.com, hergebruikt bestaande MITM-infrastructuur)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-verbeteringen, lokale provider_nodes-extensies, proxy-register, Claude passthrough-fixes.### Functies

-**feat(health)**: Achtergrondgezondheidscontrole voor lokale `provider_nodes` met exponentiële uitstel (30s → 300s) en `Promise.allSettled` om blokkering te voorkomen (#423, @Regis-RCR) -**feat(embeddings)**: Route `/v1/embeddings` naar lokale `provider_nodes` — `buildDynamicEmbeddingProvider()` met hostnaamvalidatie (#422, @Regis-RCR) -**feat(audio)**: routeer TTS/STT naar lokale `provider_nodes` — `buildDynamicAudioProvider()` met SSRF-bescherming (#416, @Regis-RCR) -**feat(proxy)**: proxyregister, beheer-API's en generalisatie van quotalimieten (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: verwijder Claude-specifieke velden (`metadata`, `anthropic_version`) wanneer het doel OpenAI-compatibel is (#421, @prakersh) -**fix(sse)**: Extraheer Claude SSE-gebruik (`input_tokens`, `output_tokens`, cachetokens) in passthrough stream-modus (#420, @prakersh) -**fix(sse)**: Genereer fallback `call_id` voor tooloproepen met ontbrekende/lege ID's (#419, @prakersh) -**fix(sse)**: Claude-naar-Claude passthrough - voorwaartse tekst volledig onaangeroerd, geen hervertaling (#418, @prakersh) -**fix(sse)**: Filter zwevende `tool_result` items na Claude Code contextcompactie om 400 fouten te voorkomen (#417, @prakersh) -**fix(sse)**: sla gereedschapsaanroepen met lege namen over in de Responses API-vertaler om oneindige lussen van `placeholder_tool` te voorkomen (#415, @prakersh) -**fix(sse)**: verwijder lege tekstinhoudsblokken vóór vertaling (#427, @prakersh) -**fix(api)**: `refreshable: true` toevoegen aan Claude OAuth-testconfiguratie (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` en gerelateerde devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker-compatibiliteit — verwijder het `node:`-protocol uit alle `src/`-imports.### 🐛 Bug Fixes

-**fix(build)**: Protocolvoorvoegsel `node:` verwijderd uit `import`-instructies in 17 bestanden onder `src/`. De import van `node:fs`, `node:path`, `node:url`, `node:os` enz. zorgde ervoor dat het `Ecmascript-bestand een fout` had op Turbopack-builds (Next.js 15 Docker) en op upgrades van oudere npm global-installaties. Betrokken bestanden: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` en 12 andere in `src/app/api/` en `src/lib/`. -**chore(workflow)**: `generate-release.md` bijgewerkt om Docker Hub-synchronisatie en dual-VPS**verplichte**stappen in elke release te laten implementeren.---

## [2.6.5] — 2026-03-17

> Sprint: redeneermodel paramfiltering, lokale provider 404 fix, Kilo Gateway provider, afhankelijkheidshobbels.### ✨ New Features

-**feat(api)**:**Kilo Gateway**(`api.kilo.ai`) toegevoegd als nieuwe API Key-provider (alias `kg`) — 335+ modellen, 6 gratis modellen, 3 modellen voor automatische routering (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Passthrough-modellen ondersteund via `/api/gateway/models` eindpunt. (PR #408 door @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: verwijder niet-ondersteunde parameters voor redeneringsmodellen (o1, o1-mini, o1-pro, o3, o3-mini). Modellen uit de `o1`/`o3`-familie verwerpen `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` en `n` met HTTP 400. Parameters worden nu gestript op de `chatCore`-laag voordat ze worden doorgestuurd. Gebruikt een declaratief `unsupportedParams`-veld per model en een vooraf berekende O(1)-kaart voor het opzoeken. (PR #412 door @Regis-RCR) -**fix(sse)**: Lokale provider 404 resulteert nu in een**vergrendeling voor alleen modellen (5 seconden)**in plaats van een vergrendeling op verbindingsniveau (2 minuten). Wanneer een lokale inferentie-backend (Ollama, LM Studio, oMLX) 404 retourneert voor een onbekend model, blijft de verbinding actief en blijven andere modellen onmiddellijk werken. Lost ook een reeds bestaande bug op waarbij `model` niet werd doorgegeven aan `markAccountUnavailable()`. Lokale providers gedetecteerd via hostnaam (`localhost`, `127.0.0.1`, `::1`, uitbreidbaar via `LOCAL_HOSTNAMES` env var). (PR #410 door @Regis-RCR)### 📦 Dependencies

- `beter-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agentbasis` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: niet-bestaande modelnamen verwijderd bij 5 providers: -**gemini / gemini-cli**: `gemini-3.1-pro/flash` en `gemini-3-*-preview` verwijderd (bestaan niet in Google API v1beta); vervangen door `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antizwaartekracht**: `gemini-3.1-pro-high/low` en `gemini-3-flash` verwijderd (ongeldige interne aliassen); vervangen door echte 2.x-modellen -**github (Copilot)**: `gemini-3-flash-preview` en `gemini-3-pro-preview` verwijderd; vervangen door `gemini-2.5-flash` -**nvidia**: `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` gecorrigeerd (NVIDIA NIM gebruikt `meta/` naamruimte voor metamodellen); `nvidia/llama-3.1-70b-instruct` en `nvidia/llama-3.1-405b-instruct` toegevoegd -**fix(db/combo)**: `free-stack` combo op externe DB bijgewerkt: `qw/qwen3-coder-plus` verwijderd (verlopen vernieuwingstoken), gecorrigeerd `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, gecorrigeerd `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, toegevoegd `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip ingebakken in build-pijplijn, synthetische provider toegevoegd, VPS PM2-pad gecorrigeerd.### 🐛 Bug Fixes

-**fix(build)**: Turbopack-hash-strip draait nu op**compilatietijd**voor ALLE pakketten — niet alleen voor `better-sqlite3`. Stap 5.6 in `prepublish.mjs` doorzoekt elke `.js` in `app/.next/server/` en verwijdert het hexadecimale achtervoegsel van 16 tekens uit elk gehasht `require()`. Repareert `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND bij globale npm-installaties. Sluit #398 -**fix(deploy)**: PM2 op beide VPS verwees naar verouderde git-clone-mappen. Opnieuw geconfigureerd naar `app/server.js` in het globale npm-pakket. Bijgewerkte `/deploy-vps`-workflow om `npm pack + scp` te gebruiken (npm-register weigert pakketten van 299 MB).### Functies

-**feat(provider)**: Synthetisch ([synthetic.new](https://synthetic.new)) – op privacy gerichte OpenAI-compatibele gevolgtrekking. `passthroughModels: true` voor dynamische HuggingFace-modellencatalogus. Eerste modellen: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 door @Regis-RCR)### 📋 Issues Closed

-**close #398**: npm hash-regressie — opgelost door hash-strip tijdens het compileren in prepublish -**triage #324**: Bugscreenshot zonder stappen - gevraagde reproductiedetails---

## [2.6.2] — 2026-03-16

> Sprint: hashing van modules volledig opgelost, 2 PR's samengevoegd (antropische toolsfilter + aangepaste eindpuntpaden), Alibaba Cloud DashScope-provider toegevoegd, 3 verouderde problemen gesloten.### 🐛 Bug Fixes

-**fix(build)**: Uitgebreide webpack `externals` hash-strip om ALLE `serverExternalPackages` te dekken, niet alleen `better-sqlite3`. Next.js 16 Turbopack hasht `zod`, `pino` en elk ander server-extern pakket in namen als `zod-dcb22c6336e0bc69` die tijdens runtime niet voorkomen in `node_modules`. Een HASH_PATTERN regex catch-all verwijdert nu het achtervoegsel van 16 tekens en valt terug naar de naam van het basispakket. Ook `NEXT_PRIVATE_BUILD_WORKER=0` toegevoegd aan `prepublish.mjs` om de webpack-modus te versterken, plus een post-build scan die alle resterende gehashte referenties rapporteert. (#396, #398, PR #403) -**fix(chat)**: gereedschapsnamen in antropisch formaat (`tool.name` zonder `.function` wrapper) werden stilletjes verwijderd door het lege-naamfilter geïntroduceerd in #346. LiteLLM proxy's verzoeken met het voorvoegsel `anthropic/` in het Anthropic Messages API-formaat, waardoor alle tools worden gefilterd en Anthropic `400 retourneert: tool_choice.any mag alleen worden opgegeven tijdens het aanbieden van tools`. Opgelost door terug te vallen naar `tool.name` wanneer `tool.function.name` afwezig is. 8 regressie-eenheidstests toegevoegd. (PR-nr. 397)### Functies

-**feat(api)**: aangepaste eindpuntpaden voor OpenAI-compatibele providerknooppunten — configureer `chatPath` en `modelsPath` per knooppunt (bijv. `/v4/chat/completions`) in de gebruikersinterface van de providerverbinding. Inclusief een DB-migratie (`003_provider_node_custom_paths.sql`) en opschoning van URL-paden (geen `..` traversal, moet beginnen met `/`). (PR#400) -**feat(provider)**: Alibaba Cloud DashScope toegevoegd als OpenAI-compatibele provider. Internationaal eindpunt: `dashscope-intl.aliyuncs.com/compatibel-mode/v1`. 12 modellen: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Verificatie: Bearer API-sleutel.### 📋 Issues Closed

-**close #323**: Cline-verbindingsfout `[object Object]` — opgelost in v2.3.7; heeft de gebruiker geïnstrueerd om te upgraden vanaf v2.2.9 -**close #337**: Kiro-kredietregistratie — geïmplementeerd in v2.5.5 (#381); heeft de gebruiker verwezen naar Dashboard → Gebruik -**triage #402**: ARM64 macOS DMG beschadigd - gevraagde macOS-versie, exacte fout, en geadviseerde `xattr -d com.apple.quarantine` oplossing---

## [2.6.1] — 2026-03-15

> Kritieke opstartoplossing: v2.6.0 globale npm-installaties crashten met een 500-fout als gevolg van een hash-bug voor de Turbopack/webpack-modulenaam in de Next.js 16-instrumentatiehook.### 🐛 Bug Fixes

-**fix(build)**: Forceer dat `better-sqlite3` altijd vereist is door de exacte pakketnaam in de webpack-serverbundel. Next.js 16 compileerde de instrumentatiehook in een afzonderlijk deel en zond `require('better-sqlite3-<hash>')` uit — een gehashte modulenaam die niet bestaat in `node_modules` — ook al stond het pakket vermeld in `serverExternalPackages`. Er is een expliciete functie `externals` toegevoegd aan de webpack-configuratie van de server, zodat de bundel altijd `require('better-sqlite3')` uitzendt, waardoor de opstart `500 Internal Server Error` bij schone globale installaties wordt opgelost. (#394, PR#395)### 🔧 CI

-**ci**: `workflow_dispatch` toegevoegd aan `npm-publish.yml` met versiesynchronisatiebeveiliging voor handmatige triggers (#392) -**ci**: `workflow_dispatch` toegevoegd aan `docker-publish.yml`, GitHub-acties bijgewerkt naar de nieuwste versies (#392)---

## [2.6.0] - 2026-03-15

> Probleemoplossingssprint: 4 bugs opgelost, logs UX verbeterd, Kiro-credittracking toegevoegd.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI en SD WebUI verschijnen niet langer in de mediapaginaproviderlijst wanneer ze niet zijn geconfigureerd - haalt `/api/providers` op bij mount en verbergt lokale providers zonder verbindingen (#390) -**fix(auth)**: Round-robin selecteert niet langer opnieuw accounts met beperkte snelheid onmiddellijk na het afkoelen — `backoffLevel` wordt nu gebruikt als primaire sorteersleutel in de LRU-rotatie (#340) -**fix(oauth)**: Qoder (en andere providers die doorverwijzen naar hun eigen gebruikersinterface) laten de OAuth-modaliteit niet langer vastlopen op "Wachten op autorisatie" - pop-up-gesloten detector schakelt automatisch over naar handmatige URL-invoermodus (#344) -**fix(logs)**: Verzoeklogtabel is nu leesbaar in de lichte modus - statusbadges, tokentellingen en combo-tags gebruiken adaptieve `dark:` kleurklassen (#378)### Functies

-**feat(kiro)**: Kiro-credittracking toegevoegd aan gebruiksophaalfunctie - query's `getUserCredits` van AWS CodeWhisperer-eindpunt (#337)### 🛠 Chores

-**chore(tests)**: `test:plan3`, `test:fixes`, `test:security` uitgelijnd om dezelfde `tsx/esm` loader te gebruiken als `npm test` - elimineert valse negatieven in de moduleresolutie bij gerichte uitvoeringen (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + route body validatie verharding.### 🐛 Bug Fixes

-**fix(codex)**: Behoud native Responses API passthrough voor Codex-clients - vermijdt onnodige vertaalmutaties (PR #387) -**fix(api)**: Valideer de aanvraagteksten op prijs-/synchronisatie- en taakrouteringsroutes — voorkomt crashes door verkeerd opgemaakte invoer (PR #388) -**fix(auth)**: JWT-geheimen blijven behouden bij opnieuw opstarten via `src/lib/db/secrets.ts` — elimineert 401-fouten na herstart van pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Build-fix: herstel de VPS-connectiviteit verbroken door v2.5.7 onvolledige publicatie.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` gebruikte nog steeds de verouderde `--webpack` vlag waardoor de standalone build van Next.js stilletjes mislukte - npm publishing voltooid zonder `app/server.js`, waardoor de VPS-implementatie werd verbroken---

## [2.5.7] - 2026-03-15

> Oplossingen voor foutafhandeling in de mediaspeelplaats.### 🐛 Bug Fixes

-**fix(media)**: Transcriptie "API-sleutel vereist" is vals-positief wanneer audio geen spraak bevat (muziek, stilte) - toont nu in plaats daarvan "Geen spraak gedetecteerd" -**fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` en `audioSpeech.ts` retourneert nu de juiste JSON (`{error:{message}}`), waardoor correcte 401/403-referentiefoutdetectie in de MediaPageClient mogelijk wordt -**fix(media)**: `parseApiError` verwerkt nu het `err_msg`-veld van Deepgram en detecteert `"api key"` in foutmeldingen voor nauwkeurige classificatie van inloggegevens---

## [2.5.6] - 2026-03-15

> Kritieke beveiligings-/authenticatieoplossingen: Antigravity OAuth verbroken + JWT-sessies verloren na opnieuw opstarten.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth verzendt nu correct `client_secret` naar het tokeneindpunt. De fallback voor `ANTIGRAVITY_OAUTH_CLIENT_SECRET` was een lege string, wat vals is — dus `client_secret` werd nooit opgenomen in het verzoek, waardoor `"client_secret ontbreekt"` fouten veroorzaakte voor alle gebruikers zonder een aangepaste env var. Sluit #383. -**fix(auth) #385**: `JWT_SECRET` wordt nu bewaard in SQLite (`namespace='secrets'`) bij de eerste generatie en opnieuw geladen bij daaropvolgende starts. Voorheen werd bij elke opstart van een proces een nieuw willekeurig geheim gegenereerd, waardoor alle bestaande cookies/sessies ongeldig werden na elke herstart of upgrade. Heeft invloed op zowel `JWT_SECRET` als `API_KEY_SECRET`. Sluit #382.---

## [2.5.5] - 2026-03-15

> Modellijst dedup-fix, Electron standalone build-verharding en Kiro-credittracking.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` bevat nu provideraliassen bij het bouwen van het actieve-providerfilter - modellen voor `claude` (alias `cc`) en `github` (alias `gh`) werden altijd getoond, ongeacht of er een verbinding was geconfigureerd, omdat `PROVIDER_MODELS`-sleutels aliassen zijn maar DB-verbindingen worden opgeslagen onder provider-ID's. Opgelost door elke actieve provider-ID uit te breiden zodat ook de alias ervan wordt opgenomen via `PROVIDER_ID_TO_ALIAS`. Sluit #353. -**fix(electron) #379**: Nieuwe `scripts/prepare-electron-standalone.mjs` faseert een speciale `/.next/electron-standalone` bundel vóór Electron-verpakking. Wordt afgebroken met een duidelijke fout als `node_modules` een symlink is (elektronenbouwer zou een runtime-afhankelijkheid van de bouwmachine doorgeven). Cross-platform padopschoning via `path.basename`. Door @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro-tegoedsaldo bijhouden — gebruikseindpunt retourneert nu kredietgegevens voor Kiro-accounts door `codewhisperer.us-east-1.amazonaws.com/getUserCredits` aan te roepen (hetzelfde eindpunt dat Kiro IDE intern gebruikt). Retourneert resterende tegoeden, totaalbedrag, verlengingsdatum en abonnementsniveau. Sluit #337.## [2.5.4] - 2026-03-15

> Opstartoplossing voor logger, beveiligingsoplossing voor login-bootstrap en verbetering van de HMR-betrouwbaarheid van de ontwikkelaar. De CI-infrastructuur is gehard.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Pino-transportloggerpad herstellen — `formatters.level` gecombineerd met `transport.targets` wordt afgewezen door pino. Door transport ondersteunde configuraties verwijderen nu de niveauformatter via `getTransportCompatibleConfig()`. Corrigeert ook de toewijzing op numeriek niveau in `/api/logs/console`: `30→info, 40→warn, 50→error` (was met één verschoven). -**fix(login) #375**: De inlogpagina start nu op vanaf het openbare `/api/settings/require-login` eindpunt in plaats van het beschermde `/api/settings`. In met een wachtwoord beveiligde instellingen ontving de pre-auth-pagina een 401 en viel onnodig terug naar veilige standaardwaarden. The public route now returns all bootstrap metadata (`requireLogin`, `hasPassword`, `setupComplete`) with a conservative 200 fallback on error. -**fix(dev) #374**: Voeg `localhost` en `127.0.0.1` toe aan `allowedDevOrigins` in `next.config.mjs` — HMR-websocket werd geblokkeerd bij toegang tot de app via loopback-adres, waardoor herhaalde cross-origin-waarschuwingen ontstonden.### 🔧 CI & Infrastructure

-**ESLint OOM-oplossing**: `eslint.config.mjs` negeert nu `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` en `clipr/**` — ESLint crashte met een JS-heap-OOM door het scannen van VS Code binaire blobs en gecompileerde chunks. -**Eenheidstest opgelost**: Verouderde `ALTER TABLE provider_connections ADD COLUMN "group"` verwijderd uit 2 testbestanden - kolom is nu onderdeel van het basisschema (toegevoegd in #373), waardoor `SQLITE_ERROR: dubbele kolomnaam` ontstaat bij elke CI-run. -**Pre-commit hook**: `npm run test:unit` toegevoegd aan `.husky/pre-commit` — unit-tests blokkeren nu verbroken commits voordat ze CI bereiken.## [2.5.3] - 2026-03-14

> Kritieke bugfixes: migratie van DB-schema's, laden van de opstart-env, opheldering van de providerfoutstatus en oplossing van i18n-tooltip. Codeer kwaliteitsverbeteringen bovenop elke PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: kolom `provider_connections.group` toevoegen aan basisschema + aanvullende migratie voor bestaande databases - kolom werd in alle query's gebruikt maar ontbrak in de schemadefinitie -**fix(i18n) #371**: Vervang niet-bestaande `t("deleteConnection")` sleutel door bestaande `providers.delete` sleutel — repareert `MISSING_MESSAGE: providers.deleteConnection` runtime-fout op de providerdetailpagina -**fix(auth) #372**: Wis verouderde foutmetadata (`errorCode`, `lastErrorType`, `lastErrorSource`) van provideraccounts na echt herstel - voorheen bleven herstelde accounts verschijnen als mislukt -**fix(startup) #369**: Verenig het laden van env over `npm run start`, `run-standalone.mjs` en Electron om de prioriteit `DATA_DIR/.env → ~/.omniroute/.env → ./.env` te respecteren — voorkomt het genereren van een nieuwe `STORAGE_ENCRYPTION_KEY` over een bestaande gecodeerde database### 🔧 Code Quality

- Gedocumenteerde `result.success` versus `response?.ok`-patronen in `auth.ts` (beide opzettelijk, nu uitgelegd)
- Genormaliseerd `overridePath?.trim()` in `electron/main.js` zodat het overeenkomt met `bootstrap-env.mjs`
- 'preferredEnv' samenvoegvolgordecommentaar toegevoegd bij het opstarten van Electron

> Codex-accountquotabeleid met automatische rotatie, snelle niveauwisseling, gpt-5.4-model en oplossing voor analyselabels.### ✨ New Features (PRs #366, #367, #368)

-**Codex Quotabeleid (PR #366)**: Het quotumvenster voor 5 uur/week per account schakelt in het Provider-dashboard. Accounts worden automatisch overgeslagen wanneer ingeschakelde vensters de drempel van 90% bereiken en worden opnieuw toegelaten na `resetAt`. Inclusief `quotaCache.ts` met gratis statusopnemer zonder bijwerkingen. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Instellingen → Codex Service Tier. De standaard uit-schakelaar injecteert `service_tier: "flex"` alleen voor Codex-verzoeken, waardoor de kosten met ~80% worden verlaagd. Volledige stapel: UI-tabblad + API-eindpunt + uitvoerder + vertaler + opstartherstel. -**gpt-5.4 Model (PR #368)**: Voegt `cx/gpt-5.4` en `codex/gpt-5.4` toe aan het Codex-modelregister. Regressietest inbegrepen.### 🐛 Bug Fixes

-**fix #356**: Analytics-grafieken (Topprovider, Per account, Provideroverzicht) geven nu voor mensen leesbare providernamen/labels weer in plaats van onbewerkte interne ID's voor OpenAI-compatibele providers.

> Grote release: strikt willekeurige routeringsstrategie, API-sleuteltoegangscontroles, verbindingsgroepen, externe prijssynchronisatie en kritieke bugfixes voor denkmodellen, combo-tests en validatie van toolnamen.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle-deck met anti-herhalingsgarantie en mutex-serialisatie voor gelijktijdige verzoeken. Onafhankelijke decks per combo en per aanbieder. -**API Key Access Controls**: `allowedConnections` (beperken welke verbindingen een sleutel kan gebruiken), `is_active` (sleutel in-/uitschakelen met 403), `accessSchedule` (tijdgebaseerde toegangscontrole), `autoResolve` schakelen, sleutels hernoemen via PATCH. -**Verbindingsgroepen**: Groepeer providerverbindingen per omgeving. Accordeonweergave op de pagina Limieten met localStorage-persistentie en slimme automatische omschakeling. -**Externe prijssynchronisatie (LiteLLM)**: prijsresolutie op 3 niveaus (door gebruiker overschreven → gesynchroniseerd → standaardwaarden). Meld u aan via `PRICING_SYNC_ENABLED=true`. MCP-tool `omniroute_sync_pricing`. 23 nieuwe testen. -**i18n**: 30 talen bijgewerkt met strikt willekeurige strategie, API-sleutelbeheerreeksen. pt-BR volledig vertaald.### 🐛 Bug Fixes

-**fix #355**: time-out voor inactiviteit van stream verhoogd van 60s naar 300s — voorkomt het afbreken van modellen met uitgebreid denken (claude-opus-4-6, o3, enz.) tijdens lange redeneringsfasen. Configureerbaar via `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Combotest omzeilt nu `REQUIRE_API_KEY=true` met behulp van de interne header, en gebruikt universeel OpenAI-compatibel formaat. Time-out verlengd van 15s naar 20s. -**fix #346**: Tools met een lege `function.name` (doorgestuurd door Claude Code) worden nu gefilterd voordat upstream-providers ze ontvangen, waardoor "Ongeldige invoer[N].naam: lege string"-fouten worden voorkomen.### 🗑️ Closed Issues

-**#341**: Debug-sectie verwijderd — vervanging is `/dashboard/logs` en `/dashboard/health`.

> API Key Round-Robin-ondersteuning voor multi-key provider-instellingen, en bevestiging van wildcard-routering en quotavenster dat al actief is.### ✨ New Features

-**API Key Round-Robin (T07)**: Providerverbindingen kunnen nu meerdere API-sleutels bevatten (Verbinding bewerken → Extra API-sleutels). Verzoeken roteren round-robin tussen primaire en extra sleutels via `providerSpecificData.extraApiKeys[]`. Sleutels worden per verbinding geïndexeerd in het geheugen bewaard - er zijn geen wijzigingen in het DB-schema vereist.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` met glob-stijl wildcard-matching (`gpt*`, `claude-?-sonnet`, etc.) is al geïntegreerd in `model.ts` met specificiteitsrangschikking. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` gaat al automatisch verder in het venster - als `Date.now() > entry.until`, wordt de vergrendeling onmiddellijk verwijderd (geen verouderde blokkering).

> Verbetering van de gebruikersinterface, toevoegingen aan routeringsstrategieën en elegante foutafhandeling voor gebruikslimieten.### ✨ New Features

-**Fill-First & P2C Routing Strategieën**: `fill-first` (quota leegmaken voordat je verder gaat) en `p2c` (Power-of-Two-Choices selectie met lage latentie) toegevoegd aan de combo-strategiekiezer, met volledige begeleidingspanelen en kleurgecodeerde badges. -**Free Stack Preset Models**: Door een combo te maken met de Free Stack-sjabloon worden nu automatisch de 7 beste gratis providermodellen in zijn klasse ingevuld (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Gebruikers activeren gewoon de providers en krijgen kant-en-klaar een combinatie van $ 0/maand. -**Breder combo-modaal**: Combo-modal maken/bewerken gebruikt nu `max-w-4xl` voor het comfortabel bewerken van grote combo's.### 🐛 Bug Fixes

-**Limietenpagina HTTP 500 voor Codex en GitHub**: `getCodexUsage()` en `getGitHubUsage()` retourneren nu een gebruiksvriendelijk bericht wanneer de provider 401/403 (verlopen token) retourneert, in plaats van een 500-fout op de pagina Limieten te genereren en te veroorzaken. -**OnderhoudBanner false-positive**: Banner toont niet langer ten onrechte "Server is onbereikbaar" bij het laden van de pagina. Opgelost door `checkHealth()` onmiddellijk aan te roepen tijdens het mounten en de verouderde `show`-state afsluiting te verwijderen. -**Providerpictogram-tooltips**: Pictogramknoppen voor bewerken (potlood) en verwijderen in de providerverbindingsrij hebben nu native HTML-tooltips - alle zes actiepictogrammen zijn nu zelfgedocumenteerd.

> Meerdere verbeteringen op basis van analyse van gemeenschapsproblemen, nieuwe providerondersteuning, bugfixes voor het volgen van tokens, modelrouting en betrouwbaarheid van streaming.### ✨ New Features

-**Taakbewuste slimme routering (T05)**: automatische modelselectie op basis van het inhoudstype van het verzoek - codering → deepseek-chat, analyse → gemini-2.5-pro, vision → gpt-4o, samenvatting → gemini-2.5-flash. Configureerbaar via Instellingen. Nieuwe `GET/PUT/POST /api/settings/task-routing` API. -**HuggingFace Provider**: HuggingFace Router toegevoegd als een OpenAI-compatibele provider met Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: Vertex AI (Google Cloud)-provider toegevoegd met Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Playground-bestandsuploads**: audio-upload voor transcriptie, afbeeldingsupload voor vision-modellen (automatische detectie op modelnaam), inline afbeeldingsweergave voor resultaten van het genereren van afbeeldingen. -**Modelselectie visuele feedback**: Reeds toegevoegde modellen in de combokiezer tonen nu een ✓ groene badge - voorkomt dubbele verwarring. -**Qwen-compatibiliteit (PR #352)**: bijgewerkte User-Agent- en CLI-vingerafdrukinstellingen voor compatibiliteit met Qwen-providers. -**Round-Robin State Management (PR #349)**: Verbeterde round-robin-logica om uitgesloten accounts te verwerken en de rotatiestatus correct te behouden. -**Clipboard UX (PR #360)**: verbeterde klembordbewerkingen met fallback voor niet-beveiligde contexten; Verbeteringen in de normalisatie van Claude-tools.### 🐛 Bug Fixes

-**Fix #302 — OpenAI SDK stream=False verwijdert tool_calls**: T01 Accepteer header-onderhandeling dwingt streaming niet langer af wanneer `body.stream` expliciet `false` is. Zorgde ervoor dat tool_calls stilzwijgend werden verwijderd bij gebruik van de OpenAI Python SDK in de niet-streamingmodus. -**Fix #73 — Claude Haiku doorgestuurd naar OpenAI zonder providervoorvoegsel**: `claude-*` modellen verzonden zonder providervoorvoegsel routeren nu correct naar de `antigravity` (antropische) provider. Ook `gemini-*`/`gemma-*` → `gemini` heuristiek toegevoegd. -**Opgelost #74 — Token telt altijd 0 voor Antigravity/Claude-streaming**: De `message_start` SSE-gebeurtenis die `input_tokens` bevat, werd niet geparseerd door `extractUsage()`, waardoor alle aantallen invoertokens daalden. Het bijhouden van invoer-/uitvoertokens werkt nu correct voor het streamen van antwoorden. -**Opgelost #180 — Duplicaten van modelimport zonder feedback**: `ModelSelectModal` toont nu een ✓ groene markering voor modellen die al in de combo zitten, waardoor het duidelijk is dat ze al zijn toegevoegd. -**Fouten bij het genereren van mediapagina's**: afbeeldingsresultaten worden nu weergegeven als `<img>`-tags in plaats van onbewerkte JSON. Transcriptieresultaten weergegeven als leesbare tekst. Bij identificatiefouten wordt een amberkleurige banner weergegeven in plaats van een stille fout. -**Knop voor tokenvernieuwing op providerpagina**: gebruikersinterface voor handmatige tokenvernieuwing toegevoegd voor OAuth-providers.### 🔧 Improvements

-**Provider Registry**: HuggingFace en Vertex AI toegevoegd aan `providerRegistry.ts` en `providers.ts` (frontend). -**Leescache**: Nieuwe `src/lib/db/readCache.ts` voor efficiënte DB-leescaching. -**Quota Cache**: Verbeterde quota-cache met op TTL gebaseerde uitzetting.### 📦 Dependencies

- `dompurificeren` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-actie` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Bestand                                       | Doel                                       |
| --------------------------------------------- | ------------------------------------------ | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Taakbewuste routeringslogica (7 taaktypen) |
| `src/app/api/settings/task-routing/route.ts`  | Configuratie-API voor taakroutering        |
| `src/app/api/providers/[id]/refresh/route.ts` | Handmatig OAuth-token vernieuwen           |
| `src/lib/db/readCache.ts`                     | Efficiënte DB-leescache                    |
| `src/shared/utils/clipboard.ts`               | Gehard klembord met terugval               | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modaal combo's: Vrije stapel zichtbaar en prominent**— Sjabloon voor vrije stapel was verborgen (4e in raster met 3 kolommen). Opgelost: verplaatst naar positie 1, overgeschakeld naar 2x2 raster zodat alle 4 de sjablonen zichtbaar zijn, groene rand + GRATIS badgemarkering.## [2.4.0] - 2026-03-13

> **Grote release**— Free Stack-ecosysteem, revisie van de transcriptiespeeltuin, 44+ providers, uitgebreide gratis laagdocumentatie en UI-verbeteringen over de hele linie.### Functies

-**Combo's: gratis stapelsjabloon**— Nieuwe 4e sjabloon "Gratis stapel ($0)" met behulp van round-robin voor Kiro + Qoder + Qwen + Gemini CLI. Stelt de vooraf gebouwde, nulkostencombinatie voor bij het eerste gebruik. -**Media/transcriptie: Deepgram als standaard**— Deepgram (Nova 3, $200 gratis) is nu de standaard transcriptieprovider. AssemblyAI ($50 gratis) en Groq Whisper (voor altijd gratis) weergegeven met gratis creditbadges. -**README: sectie "Gratis starten"**— Nieuwe vroege README-tabel met 5 stappen die laat zien hoe u binnen enkele minuten gratis AI kunt instellen. -**README: Gratis transcriptiecombinatie**— Nieuwe sectie met Deepgram/AssemblyAI/Groq combo-suggestie en gratis kredietgegevens per provider. -**providers.ts: hasFree-vlag**— NVIDIA NIM, Cerebras en Groq gemarkeerd met hasFree-badge en freeNote voor de gebruikersinterface van de provider. -**i18n: templateFreeStack-sleutels**— Free Stack-combosjabloon vertaald en gesynchroniseerd naar alle 30 talen.## [2.3.16] - 2026-03-13

### Documentatie

-**README: 44+ Providers**— Alle 3 de vermeldingen van "36+ providers" bijgewerkt naar "44+", wat het werkelijke aantal codebases weergeeft (44 providers in providers.ts) -**README: Nieuwe sectie "🆓 Gratis modellen - wat u daadwerkelijk krijgt"**- Tabel met 7 providers toegevoegd met tarieflimieten per model voor: Kiro (Claude onbeperkt via AWS Builder ID), Qoder (5 modellen onbeperkt), Qwen (4 modellen onbeperkt), Gemini CLI (180K/mo), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/dag / 60K TPM), Groq (30 RPM / 14,4K RPD). Bevat de combo-aanbeveling \/usr/bin/bash Ultimate Free Stack. -**README: prijstabel bijgewerkt**— Cerebras toegevoegd aan API KEY-laag, NVIDIA gerepareerd van "1000 credits" naar "dev-forever free", bijgewerkte Qoder/Qwen-modelaantallen en -namen -**README: Qoder 8→5 modellen**(genaamd: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3 → 4-modellen**(genaamd: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Functies

-**Auto-Combo Dashboard (niveauprioriteit)**: `🏷️ Niveau` toegevoegd als het 7e scorefactorlabel in de `/dashboard/auto-combo`-factorverdelingsweergave — alle 7 Auto-Combo-scorefactoren zijn nu zichtbaar. -**i18n — autoCombo-sectie**: 20 nieuwe vertaalsleutels toegevoegd voor het Auto-Combo-dashboard (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) aan alle 30 taalbestanden.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: De geldige standaard `clientSecret` is hersteld — was voorheen een lege tekenreeks, waardoor bij elke verbindingspoging "Onjuiste clientreferenties" werden veroorzaakt. De publieke referentie is nu de standaard fallback (overschrijfbaar via `QODER_OAUTH_CLIENT_SECRET` env var). -**MITM-server niet gevonden (#335)**: `prepublish.mjs` compileert nu `src/mitm/*.ts` naar JavaScript met `tsc` voordat het naar de npm-bundel wordt gekopieerd. Voorheen werden alleen onbewerkte `.ts`-bestanden gekopieerd - wat betekent dat `server.js` nooit heeft bestaan ​​in globale npm/Volta-installaties. -**GeminiCLI mist projectId (#338)**: in plaats van een harde 500-fout te genereren wanneer `projectId` ontbreekt in opgeslagen inloggegevens (bijvoorbeeld na het opnieuw opstarten van Docker), registreert OmniRoute nu een waarschuwing en probeert het verzoek uit te voeren, waarbij een betekenisvolle fout aan de providerzijde wordt geretourneerd in plaats van een OmniRoute-crash. -**Electron-versie komt niet overeen (#323)**: De `electron/package.json`-versie is gesynchroniseerd met `2.3.13` (was `2.0.13`), zodat de binaire desktopversie overeenkomt met het npm-pakket.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validatie)**: `tierPriority` (gewicht `0,05`) toegevoegd aan het `ScoringWeights` Zod-schema en de `combos/auto` API-route - de 7e scorefactor wordt nu volledig geaccepteerd door de REST API en gevalideerd bij invoer. 'stabiliteitsgewicht' aangepast van '0,10' naar '0,05' om de totale som op '1,0' te houden.### ✨ New Features

-**Gedifferentieerde quotumscores (automatische combinatie)**: `tierPriority` toegevoegd als zevende scorefactor — accounts met Ultra/Pro-niveaus krijgen nu de voorkeur boven gratis niveaus wanneer andere factoren gelijk zijn. Nieuwe optionele velden `accountTier` en `quotaResetIntervalSecs` op `ProviderCandidate`. Alle vier de moduspakketten zijn bijgewerkt (`snel verzonden`, `kostenbesparend`, `eerste kwaliteit`, `offlinevriendelijk`). -**Intra-Family Model Fallback (T5)**: Wanneer een model niet beschikbaar is (404/400/403), valt OmniRoute nu automatisch terug op zustermodellen uit dezelfde familie voordat een fout wordt geretourneerd (`modelFamilyFallback.ts`). -**Configureerbare API Bridge Timeout**: Met `API_BRIDGE_PROXY_TIMEOUT_MS` env var kunnen operators de proxy-time-out afstemmen (standaard 30s). Lost 504-fouten op bij langzame upstream-reacties op. (#332) -**Star History**: Star-history.com-widget vervangen door starart.cc (`?variant=adaptive`) in alle 30 README's - past zich aan licht/donker thema aan, realtime updates.### 🐛 Bug Fixes

-**Auth — Eerste wachtwoord**: `INITIAL_PASSWORD` env var wordt nu geaccepteerd bij het instellen van het eerste dashboardwachtwoord. Gebruikt `timingSafeEqual` voor constante tijdvergelijking, waardoor timingaanvallen worden voorkomen. (#333) -**README Truncation**: Een ontbrekende `</details>` afsluitende tag in de sectie Problemen oplossen opgelost, waardoor GitHub stopte met het weergeven van alles eronder (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: overbodige `@swc/helpers` override uit `package.json` verwijderd die conflicteerde met de directe afhankelijkheid, waardoor `EOVERRIDE` fouten op pnpm ontstonden. Configuratie `pnpm.onlyBuiltDependencies` toegevoegd. -**CLI Path Injection (T12)**: `isSafePath()` validator toegevoegd in `cliRuntime.ts` om padtraversal en shell-metakarakters in `CLI_*_BIN` env vars te blokkeren. -**CI**: `package-lock.json` opnieuw gegenereerd na verwijdering van de overschrijving om `npm ci`-fouten op GitHub-acties op te lossen.### 🔧 Improvements

-**Response Format (T1)**: `response_format` (json_schema/json_object) nu geïnjecteerd als een systeemprompt voor Claude, waardoor gestructureerde uitvoercompatibiliteit mogelijk wordt. -**429 nieuwe poging (T2)**: intra-URL nieuwe poging voor 429 antwoorden (2× pogingen met 2s vertraging) voordat wordt teruggevallen naar de volgende URL. -**Gemini CLI Headers (T3)**: 'User-Agent' en 'X-Goog-Api-Client' vingerafdrukheaders toegevoegd voor Gemini CLI-compatibiliteit. -**Prijscatalogus (T9)**: 'deepseek-3.1', 'deepseek-3.2' en 'qwen3-coder-next' prijsvermeldingen toegevoegd.### 📁 New Files

| Bestand                                    | Doel                                                             |
| ------------------------------------------ | ---------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Modeldefinities van gezinnen en fallback-logica binnen het gezin | ### Fixed |

-**KiloCode**: time-out voor kilocode-gezondheidscontrole al opgelost in v2.3.11 -**OpenCode**: voeg opencode toe aan het cliRuntime-register met een time-out voor de healthcheck van 15 seconden -**OpenClaw / Cursor**: verhoog de time-out van de healthcheck naar 15s voor varianten met langzame start -**VPS**: installeer droid- en openclaw npm-pakketten; activeer CLI_EXTRA_PATHS voor kiro-cli -**cliRuntime**: Voeg opencode-toolregistratie toe en verhoog de time-out om door te gaan## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Verhoog `healthcheckTimeoutMs` van 4000 ms naar 15000 ms — kilocode geeft een ASCII-logobanner weer bij het opstarten en veroorzaakt valse `healthcheck_failed` in langzame/koude startomgevingen## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Fix `check:any-budget:t11` fout - vervang `as any` door `as Record<string, onbekend>` in OAuthModal.tsx (3 keer)### Docs

-**CLI-TOOLS.md**: complete gids voor alle 11 CLI-tools (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md gesynchroniseerd met 30 talen met vertaalde titel + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nieuw verouderd OpenAI-voltooiingseindpunt - accepteert zowel de `prompt`-string als de `messages`-array, normaliseert automatisch naar chatformaat -**EndpointPage**: toont nu alle 3 OpenAI-compatibele eindpunttypen: Chat-voltooiingen, Responses API en Legacy-voltooiingen -**i18n**: `completionsLegacy/completionsLegacyDesc` toegevoegd aan 30 taalbestanden### Fixed

-**OAuthModal**: Fix `[object Object]` weergegeven bij alle OAuth-verbindingsfouten - extraheer `.message` correct uit foutresponsobjecten in alle 3 `throw new Error(data.error)`-aanroepen (exchange, device-code, autoriseren)

- Beïnvloedt Cline, Codex, GitHub, Qwen, Kiro en alle andere OAuth-providers## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Voeg `decodeURIComponent` toe vóór base64-decodering, zodat URL-gecodeerde auth-codes van de callback-URL correct worden geparseerd, waardoor "ongeldige of verlopen autorisatiecode"-fouten bij externe (LAN IP) instellingen worden opgelost -**Cline OAuth**: `mapTokens` vult nu `name = firstName + lastName || email` zodat Cline-accounts echte gebruikersnamen tonen in plaats van 'Account #ID' -**OAuth-accountnamen**: alle OAuth-uitwisselingsstromen (exchange, poll, poll-callback) normaliseren nu `naam = e-mail` wanneer de naam ontbreekt, zodat elk OAuth-account zijn e-mailadres toont als het weergavelabel in het Providers-dashboard -**OAuth-accountnamen**: Opeenvolgende "Account N" fallback verwijderd in `db/providers.ts` - accounts zonder e-mailadres/naam gebruiken nu een stabiel ID-gebaseerd label via `getAccountDisplayName()` in plaats van een volgnummer dat verandert wanneer accounts worden verwijderd## [2.3.6] - 2026-03-12

### Fixed

-**Provider-testbatch**: Vast Zod-schema om `providerId: null` te accepteren (frontend verzendt null voor niet-providermodi); retourneerde ten onrechte "Ongeldig verzoek" voor alle batchtests -**Provider test modaal**: weergave van `[object Object]` opgelost door API-foutobjecten te normaliseren naar tekenreeksen voordat ze worden weergegeven in `setTestResults` en `ProviderTestResultsView` -**i18n**: ontbrekende sleutels `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` toegevoegd aan `en.json` -**i18n**: gesynchroniseerde 1111 ontbrekende sleutels in alle 29 niet-Engelstalige bestanden met Engelse waarden als fallback## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Permanente `postinstall` oplossing toegevoegd om `@swc/helpers` naar de `node_modules` van de zelfstandige app te kopiëren — voorkomt dat MODULE_NOT_FOUND crasht bij globale npm-installaties## [2.3.4] - 2026-03-10

### Added

- Meerdere providerintegraties en dashboardverbeteringen
