# Changelog (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Nalutas ang infinite redirect loop sa dashboard para sa mga bagong pagkakataon kapag hindi pinagana ang requireLogin.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Native Integration ng Qoder API:**Ganap na ni-refactor ang Qoder Executor upang laktawan ang legacy na COZY AES/RSA encryption algorithm, direktang nagruruta sa native na DashScope OpenAi-compatible na URL. Tinatanggal ang mga kumplikadong dependency sa mga module ng Node `crypto` habang pinapabuti ang stream fidelity. -**Resilience Engine Overhaul:**Pinagsama-samang context overflow magagandang fallbacks, proactive OAuth token detection, at pag-iwas sa paglabas ng walang laman na content (#990). -**Context-Optimized Routing Strategy:**Nagdagdag ng bagong intelligent routing capability para natively maximize ang context window sa mga automated combo deployment (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Inayos ang deep-cloning corruption kung saan inalis ng mga hangganan ng pagsasalin ng Anthropic/OpenAI ang `response.` na mga partikular na prefix ng SSE mula sa mga hangganan ng streaming (#992). -**Claude Cache Passthrough Alignment:**Aligned CC-Compatible cache marker na pare-pareho sa upstream Client Pass-Through mode na nagpapanatili ng prompt caching. -**Turbopack Memory Leak:**Na-pin ang Next.js sa mahigpit na `16.0.10` na pumipigil sa mga pagtagas ng memorya at bumuo ng staleness mula sa kamakailang upstream Turbopack na na-hash na mga module regression (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev Integration:**Integrated models.dev bilang authoritative runtime source para sa pagpepresyo ng modelo, mga kakayahan, at mga detalye, na nag-o-override sa mga hardcoded na presyo. May kasamang UI ng mga setting upang pamahalaan ang mga agwat ng pag-sync, mga string ng pagsasalin para sa lahat ng 30 wika, at matatag na saklaw ng pagsubok. -**Provider Native Capabilities:**Idinagdag ang suporta para sa pagdedeklara at pagsuri ng mga native na feature ng API (hal. `systemInstructions_supported`) na pumipigil sa mga pagkabigo sa pamamagitan ng paglilinis ng mga hindi wastong tungkulin. Kasalukuyang naka-configure para sa mga provider ng Gemini Base at Antigravity OAuth. -**Mga Advanced na Setting ng Provider ng API:**Idinagdag ang custom na `User-Agent` na mga override para sa mga API-key na koneksyon sa provider. Ang override ay naka-store sa `providerSpecificData.customUserAgent` at nalalapat na ngayon sa mga validation probe at upstream na mga kahilingan sa pagpapatupad.### 🐛 Bug Fixes

-**Pagiging Maaasahan ng Qwen OAuth:**Nalutas ang isang serye ng mga isyu sa pagsasama ng OAuth kabilang ang isang 400 Bad Request blocker sa mga nag-expire na token, fallback generation para sa pag-parse ng OIDC `access_token` na mga katangian kapag tinanggal ang `id_token`, mga error sa pagtuklas ng katalogo ng modelo, at mahigpit na pag-filter ng `X-Dash0 na pagtanggi sa AI mula sa `X-Dash0-compatible mula sa \*` mga endpoint.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo at Routing:**Nakumpleto ang katutubong CRUD lifecycle integration para sa advanced na Auto-Combo engine (#955). -**Mga Pangunahing Operasyon:**Inayos ang mga nawawalang pagsasalin para sa mga bagong native na opsyon sa Auto-Combos (#955). -**Pagpapatunay ng Seguridad:**Na-disable ang mga auto-backup na gawain ng SQLite nang native sa panahon ng pagsasagawa ng unit test ng CI upang tahasang maresolba ang Node 22 Event Loop na nagha-hang ang mga memory leaks (#956). -**Mga Proxies ng Ecosystem:**Ligtas na nagre-refresh ang mga natapos na tahasang pagsasama-sama ng pagmamapa sa mga scheduler ng pag-synchronize ng modelo, mga siklo ng OAuth, at Token Check sa pamamagitan ng mga upstream na proxy ng native na system ng OmniRoute (#953). -**MCP Extensibility:**Idinagdag at matagumpay na nairehistro ang bagong `omniroute_web_search` MCP framework tool na wala sa beta sa production schemas (#951). -**Tokens Buffer Logic:**Nagdagdag ng mga limitasyon sa configuration ng runtime na nagpapalawak ng mga na-configure na input/output token buffer para sa tumpak na sukatan ng Pagsubaybay sa Paggamit (#959).### 🐛 Bug Fixes

-**CodeQL Remediation:**Ganap na naresolba at na-secure ang mga kritikal na string indexing operations na pumipigil sa Server-Side Request Forgery (SSRF) arrays indexing heuristics kasama ng polynomial algorithmic backtracking (ReDoS) sa loob ng deep proxy dispatcher modules. -**Crypto Hashes:**Pinalitan ang mahinang hindi na-verify na legacy na OAuth 1.0 na mga hash na may matatag na HMAC-SHA-256 standard validation primitives na tinitiyak ang mahigpit na mga kontrol sa pag-access. -**Proteksyon sa Boundary ng API:**Tamang na-verify at na-map ng mga proteksyon sa structural na ruta na nagpapatupad ng mahigpit na `isAuthenticated()` middleware logic na sumasaklaw sa mga mas bagong dynamic na endpoint na nagta-target sa pagmamanipula ng mga setting at paglo-load ng mga native na kasanayan. -**CLI Ecosystem Compat:**Nalutas ang sirang native runtime parser bindings na nag-crash sa `where` environment detector na mahigpit sa `.cmd/.exe` na mga edge case nang maganda para sa mga external na plugin (#969). -**Cache Architecture:**Refactored eksaktong Analytics at System Settings dashboard parameters layout structure caching para mapanatili ang stable na re-hydration persistence cycle na nireresolba ang visual unaligned state flashes (#952). -**Claude Caching Standards:**Na-normalize at tumpak na mahigpit na napanatili ang mga kritikal na ephemeral block marker na `ephemeral` na nag-cache ng mga TTL na order para sa mga downstream na node na nagpapatupad ng mga karaniwang compatible na kahilingan sa CC na malinis na nagma-map nang walang mga bumabagsak na sukatan (#948). -**Internal Aliases Auth:**Pinasimpleng internal runtime mappings na nag-normalize ng Codex credential payload lookup sa loob ng mga parameter ng pandaigdigang pagsasalin na niresolba ang 401 na hindi napatotohanang pagbaba (#958).### 🛠️ Maintenance

-**UI Discoverability:**Tamang inayos ang mga kategorya ng layout na tahasang naghihiwalay sa mga libreng tier provider na lohika na nagpapahusay sa mga daloy ng pag-uuri ng UX sa loob ng pangkalahatang mga pahina ng registry ng API (#950). -**Deployment Topology:**Pinag-isang Docker deployment artifact na tinitiyak na ang root na `fly.toml` ay tumutugma sa inaasahang cloud instance na mga parameter out-of-the-box na native na humahawak ng mga automated na deployment scaling nang maayos. -**Development Tooling:**Decoupled `LKGP` runtime parameters sa tahasang DB layer abstraction caching utilities na tinitiyak ang mahigpit na test isolation coverage para sa mga core caching layer nang ligtas.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Ganap na na-refactor ang `/dashboard/auto-combo` UI upang walang putol na pagsamahin sa mga native na Dashboard Card at standardized na visual padding/header. Nagdagdag ng mga dynamic na visual progress bar na nagmamapa ng mga mekanismo ng timbang sa pagpili ng modelo. -**Settings Routing Sync:**Ganap na nalantad na advanced na routing `priority` at `weighted` schema target na panloob sa loob ng mga listahan ng fallback ng mga pangkalahatang setting.### Bug Fixes

-**Memory & Skills Locale Nodes:**Niresolba ang mga walang laman na rendering tag para sa Memory at Skills na mga opsyon nang direkta sa loob ng mga view ng mga pangkalahatang setting sa pamamagitan ng pag-wire ng lahat ng `setting.*` na mga value ng pagmamapa sa loob ng `en.json` (implicitly na na-map para sa cross-translation tool).### Internal Integrations

- Pinagsamang PR #946 — ayusin: panatilihin ang pagiging tugma ng Claude Code sa conversion ng mga tugon
- Pinagsamang PR #944 — fix(gemini): panatilihin ang mga pirma ng pag-iisip sa mga tawag sa antigravity tool
- Pinagsamang PR #943 — ayusin: ibalik ang katawan ng GitHub Copilot
- Pinagsamang PR #942 — Ayusin ang mga marker ng cache na katugma sa cc
- Pinagsamang PR #941 — refactor(auth): pagbutihin ang NVIDIA alias lookup + magdagdag ng LKGP error logging
- Pinagsamang PR #939 — Ibalik ang Claude OAuth localhost callback handling
- _(Tandaan: Ang PR #934 ay tinanggal mula sa 3.4.9 cycle upang maiwasan ang mga pangunahing conflict regression)_---

## [3.4.8] — 2026-04-03

### Seguridad

- Ganap na naayos ang lahat ng natitirang Github Advanced Security (CodeQL) na natuklasan at mga alerto sa Dependabot.
- Inayos ang hindi secure na randomness vulnerabilities sa pamamagitan ng paglipat mula sa `Math.random` patungo sa `crypto.randomUUID()`.
- Mga secure na shell command sa mga automated na script mula sa string injection.
- Nag-migrate ng mahinang sakuna na backtracking na mga pattern ng pag-parse ng RegEx sa mga pipeline ng chat/translation.
- Pinahusay na mga kontrol sa sanitization ng output sa loob ng mga bahagi ng React UI at Server Sent Events (SSE) tag injection.---

## [3.4.7] — 2026-04-03

### Mga Tampok

- Nagdagdag ng `Cryptography` node sa Pagsubaybay at mga pagsusuri sa kalusugan ng MCP (#798)
- Pinatigas na modelo-catalog na mga pahintulot ng ruta sa pagmamapa (`/models`) (#781)### Bug Fixes

- Inayos ang Claude OAuth token na nagre-refresh na hindi napanatili ang mga konteksto ng cache (#937)
- Inayos ang mga error sa provider ng CC-Compatible na nagre-render ng mga naka-cache na modelo na hindi maabot (#937)
- Inayos ang mga error sa GitHub Executor na nauugnay sa mga di-wastong array ng konteksto (#937)
- Inayos ang mga pagkabigo sa pagsusuri sa kalusugan ng CLI na naka-install na NPM sa Windows (#935)
- Inayos ang pagsasalin ng payload na bumababa ng wastong nilalaman dahil sa mga di-wastong field ng API (#927)
- Inayos ang runtime crash sa Node 25 patungkol sa API key execution (#867)
- Inayos ang standalone na module-resolution ng MCP (`ERR_MODULE_NOT_FOUND`) sa pamamagitan ng `esbuild` (#936)
- Fixed NVIDIA NIM routing credential resolution alias mismatch (#931)### Seguridad

- Nagdagdag ng ligtas na mahigpit na proteksyon sa hangganan ng input laban sa hilaw na `shell: true` na remote-code execution injection.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Mga Provider:**Nagrehistro ng mga bagong tagapagbigay ng pagbuo ng larawan, video, at audio mula sa listahang hiniling ng komunidad (#926). -**Dashboard UI:**Nagdagdag ng standalone na sidebar navigation para sa bagong Memory and Skills modules (#926). -**i18n:**Nagdagdag ng mga string ng pagsasalin at mga layout mapping sa 30 wika para sa mga namespace ng Memory at Skills.### 🐛 Bug Fixes

-**Katatagan:**Pinigilan ang proxy na Circuit Breaker na ma-stuck sa isang OPEN state nang walang katapusan sa pamamagitan ng paghawak ng mga direktang transition sa CLOSED state sa loob ng fallback combo path (#930). -**Protocol Translation:**Na-patch ang streaming transformer para i-sanitize ang mga response block batay sa inaasahang _source_ protocol sa halip na ang provider _target_ protocol, inaayos ang mga modelong Anthropics na nakabalot sa OpenAI payloads na nag-crash sa Claude Code (#929). -**API Specs at Gemini:**Inayos ang `thought_signature` na pag-parse sa mga `openai-to-gemini` at `claude-to-gemini` na mga tagasalin, na pumipigil sa mga HTTP 400 na error sa lahat ng Gemini 3 API tool-call. -**Mga Provider:**Nilinis ang mga endpoint na hindi tugma sa OpenAI na pumipigil sa mga wastong upstream na koneksyon (#926). -**Cache Trends:**Inayos ang isang di-wastong property mapping data mismatch na nagiging sanhi ng pag-crash ng Cache Trends UI chart, at nag-extract ng mga redundant cache metric widgets (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI Ecosystem Integration:**Idinagdag ang `cliproxyapi` executor na may built-in na module-level na caching at proxy routing. Ipinakilala ang isang komprehensibong serbisyo ng Tagapamahala ng Bersyon upang awtomatikong subukan ang kalusugan, mag-download ng mga binary mula sa GitHub, mag-spawn ng mga nakahiwalay na proseso sa background, at malinis na pamahalaan ang lifecycle ng mga external na CLI tool nang direkta sa pamamagitan ng UI. May kasamang mga DB table para sa proxy configuration upang paganahin ang awtomatikong SSRF-gated cross-routing ng mga panlabas na kahilingan sa OpenAI sa pamamagitan ng lokal na layer ng tool ng CLI (#914, #915, #916). -**Suporta sa Qoder PAT:**Direktang suporta sa Integrated Personal Access Token (PAT) sa pamamagitan ng lokal na transportasyong `qodercli` sa halip na mga legacy na remote na `.cn` na mga configuration ng browser (#913). -**Gemini 3.1 Pro Preview (GitHub):**Idinagdag ang `gemini-3.1-pro-preview` na canonical explicit na suporta sa modelo nang native sa GitHub Copilot provider habang pinapanatili ang mga mas lumang alyas sa pagruruta (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stability:**Inayos ang Copilot token refresh loop kung saan ang mga stale token ay hindi na-deep-merge sa DB, at inalis ang mga field na `reasoning_text` na nakamamatay na sumisira sa downstream na Anthropic block na mga conversion para sa mga multi-turn na chat (#923). -**Global Timeout Matrix:**Ang mga naka-sentralisado at naka-parameter na pag-timeout ng kahilingan ay tahasang mula sa `REQUEST_TIMEOUT_MS` upang maiwasan ang mga nakatagong (~300s) na default na mga buffer ng pagkuha na maagang putulin ang matagal nang SSE streaming na mga tugon mula sa mabibigat na mga modelo ng pangangatwiran (#918). -**Cloudflare Quick Tunnels State:**Inayos ang isang matinding inconsistency ng estado kung saan ang mga na-restart na OmniRoute instance ay maling nagpakita ng mga nawasak na tunnel bilang aktibo, at na-default ang cloudflared tunneling sa `HTTP/2` upang alisin ang UDP na makatanggap ng buffer log spam (#925). -**i18n Translation Overhaul (Czech at Hindi):**Inayos ang Hindi code mula DEPRECATED `in.json` hanggang canonical `hi.json`, in-overhaul ang mga Czech text mappings, kinuha ang `untranslatable-keys.json` para ayusin ang CI/CD false-positive validation, at nakabuo ng komprehensibong `I18N.md1 na tagasalin`. -**Tokens Provider Recovery:**Inayos ni Qwen ang pagkawala ng mga partikular na `resourceUrl` na endpoint pagkatapos ng awtomatikong pag-refresh ng token sa pagsusuri sa kalusugan dahil sa mga nawawalang DB deep merge (#917). -**CC Compatible UX at Streaming:**Pinag-isa ang Add CC/OpenAI/Anthropic compatible actions sa paligid ng Anthropic UI treatment, pinilit na CC-compatible upstream requests na gumamit ng SSE habang bumabalik pa rin ng streaming o non-streaming na mga tugon batay sa kahilingan ng kliyente, inalis ang CC model-list configuration/import support sa pabor sa isang tahasang CClist na hindi tugmang-error, at ginawang O-modelo na salamin na hindi tugma, at ginawang O. Listahan ng pagpapatala ng Claude Code (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Maglabas ng `response.completed` na may tamang `input_tokens`/`output_tokens` field para sa mga kliyente ng Codex CLI, pag-aayos ng display ng paggamit ng token (#909 — salamat @christopher-s). -**SQLite WAL Checkpoint on Shutdown:**Nagbabago ang Flush WAL sa pangunahing file ng database sa panahon ng magandang pagsara/pag-restart, na pumipigil sa pagkawala ng data sa paghinto ng container ng Docker (#905 — salamat @rdself). -**Graceful Shutdown Signal:**Binago ang `/api/restart` at `/api/shutdown` na mga ruta mula sa `process.exit(0)` patungo sa `process.kill(SIGTERM)`, na tinitiyak na tumatakbo ang shutdown handler bago lumabas. -**Docker Stop Grace Period:**Idinagdag ang `stop_grace_period: 40s` sa Docker Compose file at `--stop-timeout 40` sa mga halimbawa ng Docker run.### 🛠️ Maintenance

- Isinara ang 5 nalutas/hindi-isang-bug na mga isyu (#872, #814, #816, #890, #877).
- Sinubukan ang 6 na isyu sa mga kahilingan sa impormasyon ng pangangailangan (#892, #887, #886, #865, #895, #870).
- Tumugon sa isyu sa pagsubaybay sa pagtuklas ng CLI (#863) na may gabay ng contributor.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Nakumpleto ang remote memory at skills injection para sa Antigravity provider sa proxy network level. -**Claude Code Compatibility:**Bumuo ng natively hidden compatibility bridge para sa Claude Code, pagpasa ng mga tool at pag-format nang malinis. -**Web Search MCP:**Idinagdag ang tool na `omniroute_web_search` gamit ang saklaw ng `execute:search`. -**Mga Bahagi ng Cache:**Ipinatupad ang mga dynamic na bahagi ng cache na gumagamit ng TDD. -**UI at Pag-customize:**Nagdagdag ng suporta sa custom na favicon, mga tab ng hitsura, naka-wire na whitelabeling sa sidebar, at nagdagdag ng mga hakbang sa gabay sa Windsurf sa lahat ng 33 wika. -**Pagpapanatili ng Log:**Pinag-isang pagpapanatili ng log ng kahilingan at mga artifact nang native. -**Mga Pagpapahusay ng Modelo:**Nagdagdag ng tahasang `contextLength` para sa lahat ng opencode-zen na modelo. -**i18n at mga pagsasalin:**Pinagsama-samang 33 mga pagsasalin ng wika na native, kabilang ang mga validation ng CI ng placeholder at mga update sa dokumentasyong Chinese (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Ibinalik ang `id_token` reliance sa `access_token` at pinagana ang dynamic na `resource_url` API endpoint injection para sa wastong regional routing (#900). -**Model Sync Engine:**Iniimbak ang mahigpit na internal Provider ID sa `getCustomModels()` sync routines sa halip na ang UI Channel Alias ​​na format, na pumipigil sa SQLite catalog insertion failures (#903). -**Claude Code at Codex:**Standardized non-streaming na mga blangkong tugon sa Anthropic-formatted `(empty response)` para maiwasan ang CLI proxy crashes (#866). -**CC Compatible Routing:**Nalutas ang duplicate na `/v1` endpoint collision sa panahon ng path concatenation para sa generic na Claude Code gateway (#904). -**Antigravity Dashboards:**Na-block ang walang limitasyong mga modelo ng quota mula sa maling pagrehistro bilang naubos na `100% Usage` na katayuan ng limitasyon sa Provider Usage UI (#857). -**Claude Image Passthrough:**Ang mga Fixed Claude na modelo ay nawawala ang mga image block passthrough (#898). -**Gemini CLI Routing:**Nalutas ang 403 authorization lockout at mga isyu sa accumulation ng content sa pamamagitan ng pagre-refresh ng project ID sa pamamagitan ng `loadCodeAssist` (#868). -**Antigravity Stability:**Iwastong mga listahan ng access sa modelo, ipinatupad ang 404 lockout, inayos ang 429 cascades na nagla-lock out sa mga karaniwang koneksyon, at nilimitahan ang mga `gemini-3.1-pro` na output token (#885). -**Provider Sync Cadence:**Inayos ng provider ang mga limitasyon ng synchronization cadence sa pamamagitan ng internal scheduler (#888). -**Dashboard Optimization:**Nalutas ang `/dashboard/limits` UI freezing kapag nagpoproseso ng 70+ account sa pamamagitan ng chunk parallelization (#784). -**SSRF Hardening:**Ipinatupad ang mahigpit na SSRF IP range filtering at hinarangan ang `::1` loopback interface. -**Mga Uri ng MIME:**Na-standardize ang `mime_type` sa snake_case upang tumugma sa mga detalye ng Gemini API. -**CI Stabilization:**Inayos ang bagsak na analytics/setting Mga tagapili ng Playwright at humiling ng mga assertion upang ang GitHub Actions E2E ay tumatakbo nang mapagkakatiwalaan sa mga naka-localize na UI at switch-based na mga kontrol. -**Mga Deterministikong Pagsusuri:**Inalis ang mga fixture ng quota na sensitibo sa petsa mula sa mga pagsubok sa paggamit ng Copilot at nakahanay na mga pagsubok sa katalogo ng idempotency/modelo na may pinagsamang pag-uugali ng runtime. -**Pagpapatigas ng Uri ng MCP:**Inalis ang tahasang `anumang` regression ng zero-budget mula sa path ng pagpaparehistro ng tool ng MCP server. -**Model Sync Engine:**Ang na-bypass na mapanirang `replace` ay nag-override kapag ang auto-sync ng provider ay nagbunga ng isang walang laman na listahan ng modelo, na nagpapanatili ng katatagan para sa mga dynamic na katalogo (#899).### 🛠️ Maintenance

-**Pipeline Logging:**Pino ang pipeline logging artifacts at ipatupad ang retention caps (#880). -**AGENTS.md Overhaul:**Condensed mula sa 297→153 na linya. Nagdagdag ng mga patnubay sa build/test/style, mga workflow ng code (Prettier, TypeScript, ESLint), at mga trimmed verbose table (#882). -**Pagsasama-sama ng Sangay ng Paglabas:**Pinagsama-sama ang mga aktibong sangay ng tampok sa `release/v3.4.2` sa ibabaw ng kasalukuyang `pangunahing` at na-validate ang sangay gamit ang lint, unit, coverage, build, at CI-mode na pagtakbo ng E2E. -**Pagsubok:**Nagdagdag ng vitest configuration para sa component testing at Playwright specs para sa mga setting ng toggle. -**Doc Updates:**Pinalawak na root readmes, isinalin ang mga chinese na dokumento sa katutubong paraan, at nilinis ang mga hindi na ginagamit na file.## [3.4.1] - 2026-03-31

> [!BABALA]
> **PAGSASAHANG PAGBABAGO: ang kahilingan sa pag-log, pagpapanatili, at pag-log na mga variable ng kapaligiran ay muling idinisenyo.**
> Sa unang startup pagkatapos mag-upgrade, ang OmniRoute ay nag-archive ng mga legacy na log ng kahilingan mula sa `DATA_DIR/logs/`, legacy na `DATA_DIR/call_logs/`, at `DATA_DIR/log.txt` sa `DATA_DIR/log_archives/*.zip`, pagkatapos ay inaalis ang mga artifact sa ilalim ng hindi ginagamit na format at pagkatapos ay inaalis ang artifact sa ilalim ng hindi ginagamit na format. `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**May kasamang `scripts/migrate-env.mjs` upang walang putol na i-migrate ang `<v3.3` configuration sa `v3.4.x` na mahigpit na mga hadlang sa pagpapatunay ng seguridad (FASE-01), pag-aayos ng mga startup crash na dulot ng maiikling `JWT_SECRET` instance. -**Kiro AI Cache Optimization:**Nagpatupad ng deterministic na `conversationId` generation (uuidv5) upang paganahin nang maayos ang AWS Builder ID Prompt Caching sa mga invocation (#814). -**Pagpapanumbalik at Pagsasama-sama ng Dashboard UI:**Nalutas ang lohika ng sidebar na inalis ang seksyong Debug, at na-clear ang mga babala sa pagruruta ng Nextjs sa pamamagitan ng paglipat ng mga standalone na pahina ng `/dashboard/mcp` at `/dashboard/a2a` sa mga naka-embed na bahagi ng Endpoint Proxy UI. -**Mga Artifact ng Log ng Pinag-isang Kahilingan:**Ang pag-log ng kahilingan ay nag-iimbak na ngayon ng isang SQLite index row at isang JSON artifact bawat kahilingan sa ilalim ng `DATA_DIR/call_logs/`, na may opsyonal na pipeline capture na naka-embed sa parehong file. -**Wika:**Pinahusay ang pagsasalin ng Chinese (#855) -**Opencode-Zen Models:**Nagdagdag ng 4 na libreng modelo sa opencode-zen registry (#854) -**Mga Pagsusuri:**Nagdagdag ng mga pagsubok sa unit at E2E para sa mga toggle ng setting at pag-aayos ng bug (#850)### 🐛 Bug Fixes

-**429 Quota Parsing:**Na-parse ang mahabang panahon ng pag-reset ng quota mula sa mga error body upang bigyang-pansin ang mga tamang backoff at maiwasan ang mga pagbabawal sa account na may limitasyon sa rate (#859) -**Prompt Caching:**Napanatili ang mga header ng `cache_control` ng kliyente para sa lahat ng Claude-protocol provider (tulad ng Minimax, GLM, at Bailian), na kinikilala nang tama ang suporta sa pag-cache (#856) -**Mga Log ng Pag-sync ng Modelo:**Binawasan ang spam ng log sa pamamagitan ng pagre-record ng `mga sync-models` lamang kapag aktwal na binago ng channel ang listahan (#853) -**Quota ng Provider at Pag-parse ng Token:**Inilipat ang mga limitasyon sa Antigravity upang gamitin ang `retrieveUserQuota` nang native at wastong na-map ang mga payload ng pag-refresh ng token ng Claude sa mga form na naka-encode ng URL (#862) -**Rate-Limiting Stability:**Universalized ang 429 Retry-After parsing architecture upang limitahan ang mga cooldown na dulot ng provider sa 24 na oras na max (#862) -**Pag-render ng Limitasyon sa Dashboard:**Muling na-architect ang `/dashboard/limits` na pagmamapa ng quota upang i-render kaagad sa loob ng mga chunks, inaayos ang isang pangunahing pagkaantala sa pagyeyelo ng UI sa mga account na lampas sa 70 aktibong koneksyon (#784) -**QWEN OAuth Authorization:**Na-mapa ang OIDC `id_token` bilang pangunahing API Bearer token para sa mga kahilingan sa Dashscope, inaayos ang mga agarang 401 Hindi awtorisadong error pagkatapos magkonekta ng mga account o nagre-refresh ng mga token (#864) -**ZAI API Stability:**Hardened Server-Sent Events compiler upang maganda ang pagbabalik sa mga walang laman na string kapag ang mga provider ng DeepSeek ay nag-stream ng mathematically null na nilalaman sa panahon ng mga yugto ng pangangatwiran (#871) -**Claude Code/Codex Translations:**Pinoprotektahan ang mga non-streaming na payload na mga conversion laban sa mga walang laman na tugon mula sa upstream na mga tool ng Codex, pag-iwas sa sakuna na TypeErrors (#866) -**NVIDIA NIM Rendering:**Conditionally stripped identical provider prefix dynamic na itinutulak ng mga audio model, na inaalis ang mga duplicate na `nim/nim` tag structures na naghahagis ng 404 sa Media Playground (#872)### ⚠️ Breaking Changes

-**Layout ng Log ng Kahilingan:**Inalis ang lumang multi-file na `DATA_DIR/logs/` na mga session ng log ng kahilingan at ang buod na file ng `DATA_DIR/log.txt`. Ang mga bagong kahilingan ay isinulat bilang iisang JSON artifact sa `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Mga Variable ng Environment sa Pag-log:**Pinalitan ang `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`, at `PROXY_LOG_MAX_ENTRIES` ng bagong `APP_LOG_*` at `CALL_LOG_SRE` model ng configuration. -**Pipeline Toggle Setting:**Pinalitan ang legacy na setting na `detailed_logs_enabled` ng `call_log_pipeline_enabled`. Ang mga bagong detalye ng pipeline ay naka-embed sa loob ng artifact ng kahilingan sa halip na itago bilang hiwalay na mga tala ng `request_detail_logs`.### 🛠️ Maintenance

-**Backup ng Upgrade sa Log ng Kahilingan sa Legacy:**Nag-a-archive na ngayon ang mga upgrade ng lumang `data/logs/`, legacy na `data/call_logs/`, at `data/log.txt` na mga layout sa `DATA_DIR/log_archives/*.zip` bago alisin ang hindi na ginagamit na istraktura. -**Pagtitiyaga sa Paggamit ng Pag-stream:**Ang mga kahilingan sa streaming ay nagsusulat na ngayon ng isang hilera ng `usage_history` sa pagkumpleto sa halip na maglabas ng duplicate na row na kasalukuyang ginagamit na may walang laman na metadata ng status. -**Pag-follow-up sa Pag-log sa Pag-log:**Hindi na nakukuha ng mga log ng pipeline ang `SOURCE REQUEST`, humiling ng mga artifact entries ngayon parangalan ang `CALL_LOG_MAX_ENTRIES`, at ang mga archive ng log ng application ay pinarangalan na ngayon ang `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Mga Tampok

-**Subscription Utilization Analytics:**Nagdagdag ng quota snapshot time-series tracking, Provider Utilization at mga tab ng Combo Health na may mga recharts visualization, at kaukulang mga endpoint ng API (#847) -**SQLite Backup Control:**Bagong `OMNIROUTE_DISABLE_AUTO_BACKUP` env flag para hindi paganahin ang mga awtomatikong SQLite backup (#846) -**Model Registry Update:**Nag-inject ng `gpt-5.4-mini` sa hanay ng mga modelo ng provider ng Codex (#756) -**Pagsubaybay sa Limitasyon ng Provider:**Subaybayan at ipakita kung kailan huling na-refresh ang mga limitasyon sa rate ng provider bawat account (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Muling niruta ang mga pagkumpleto ng Qwen OAuth mula sa DashScope API patungo sa Web Inference API (`chat.qwen.ai`), nireresolba ang mga pagkabigo sa pahintulot (#844, #807, #832) -**Qwen Auto-Retry Loop:**Nagdagdag ng naka-target na 429 Quota Lumagpas sa backoff handling sa loob ng `chatCore` na nagpoprotekta sa mga kahilingan sa pagsabog -**Codex OAuth Fallback:**Hindi na bitag ang user ng pag-block ng popup ng modernong browser; awtomatiko itong bumabalik sa manu-manong pagpasok ng URL (#808) -**Claude Token Refresh:**Ang mahigpit na `application/json` ng Anthropic ay iginagalang na ngayon sa pagbuo ng token sa halip na mga naka-encode na URL (#836) -**Skema ng Mga Mensahe ng Codex:**Ang mga tinanggal na purist na `mensahe` ay nag-inject mula sa mga kahilingan sa native passthrough upang maiwasan ang mga istrukturang pagtanggi mula sa ChatGPT upstream (#806) -**CLI Detection Size Limit:**Ligtas na nabangga ang Node binary scanning upper bound mula 100MB hanggang 350MB, na nagbibigay-daan sa mabibigat na standalone na tool tulad ng Claude Code (229MB) at OpenCode (153MB) na matukoy nang tama ng VPS runtime (#809) -**CLI Runtime Environment:**Ibinalik ang kakayahan para sa mga configuration ng CLI na respetuhin ang mga override path ng user (`CLI_{PROVIDER}_BIN`) na lampasan ang mahigpit na mga panuntunan sa pagtuklas sa path-bound -**Nvidia Header Conflicts:**Inalis ang mga property na `prompt_cache_key` mula sa mga upstream na header kapag tumatawag sa mga hindi-Anthropic na provider (#848) -**Codex Fast Tier Toggle:**Na-restore na Codex service tier toggle contrast sa light mode (#842) -**Imprastraktura ng Pagsubok:**Na-update na pagsubok sa `t28-model-catalog-updates` na hindi wastong inaasahan ang lumang DashScope na endpoint para sa native na pagpapatala ng Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Custom Provider Rotation:**Integrated `getRotatingApiKey` internally sa loob ng DefaultExecutor, tinitiyak na ang `extraApiKeys` rotation ay na-trigger nang tama para sa custom at compatible na upstream provider (#815)---

## [3.3.8] - 2026-03-30

### Mga Tampok

-**Pag-filter ng Models API:**Ang Endpoint `/v1/models` ngayon ay dynamic na nagsasala sa listahan nito batay sa mga pahintulot na nauugnay sa `Authorization: Bearer <token>` kapag naka-on ang pinaghihigpitang pag-access (#781) -**Pagsasama ng Qoder:**Katutubong pagsasama para sa Qoder AI na katutubong pinapalitan ang legacy na iFlow platform mappings (#660) -**Prompt Cache Tracking:**Nagdagdag ng mga kakayahan sa pagsubaybay at frontend visualization (Stats card) para sa semantic at prompt caching sa Dashboard UI### 🐛 Bug Fixes

-**Paglaki ng Dashboard ng Cache:**Pinahusay ang mga laki ng layout ng UI at mga header ng konteksto para sa mga advanced na pahina ng cache (#835) -**Debug Sidebar Visibility:**Inayos ang isang isyu kung saan ang debug toggle ay hindi maipakita/itatago nang tama ang mga detalye ng sidebar debug (#834) -**Gemini Model Prefixing:**Binago ang namespace fallback para maayos na ruta sa pamamagitan ng `gemini-cli/` sa halip na `gc/` para igalang ang upstream specs (#831) -**OpenRouter Sync:**Pinahusay na compatibility synchronization upang awtomatikong ma-ingest ng tama ang mga available na katalogo ng mga modelo mula sa OpenRouter (#830) -**Pag-stream ng Payloads Mapping:**Reserialization ng mga field ng pangangatwiran ay katutubong nireresolba ang mga conflict alias path kapag ang output ay streaming sa mga edge na device---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Ni-restructured ang nabuong `opencode.json` para magamit ang `@ai-sdk/openai-compatible` record-based schema na may `options` at `models` bilang object maps sa halip na flat arrays, inaayos ang config validation failures (#816) -**i18n Nawawalang Key:**Idinagdag ang nawawalang `cloudflaredUrlNotice` na translation key sa lahat ng 30 file ng wika upang maiwasan ang mga error sa console ng `MISSING_MESSAGE` sa pahina ng Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Ligtas na isinama ang mga prompt na cache token sa mga makasaysayang kalkulasyon ng mga input ng paggamit para sa mga tamang bawas sa quota (PR #822) -**Combo Test Probes:**Inayos ang combo testing logic na mga false negative sa pamamagitan ng pagresolba sa pag-parse para sa mga pagtugon lang sa pangangatwiran at pinagana ang malawakang parallelization sa pamamagitan ng Promise.all (PR #828) -**Docker Quick Tunnels:**Naka-embed na mga kinakailangang ca-certificate sa loob ng base runtime container upang malutas ang mga pagkabigo sa pagsisimula ng Cloudflared TLS, at lumitaw ang mga stdout network error na pinapalitan ang mga generic na exit code (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Pagsubaybay sa Quota ng Gemini:**Nagdagdag ng real-time na pagsubaybay sa quota ng Gemini CLI sa pamamagitan ng `retrieveUserQuota` API (PR #825) -**Cache Dashboard:**Pinahusay ang Cache Dashboard upang ipakita ang mga prompt na sukatan ng cache, 24h na trend, at tinantyang pagtitipid sa gastos (PR #824)### 🐛 Bug Fixes

-**Karanasan ng User:**Inalis ang mga invasive na awtomatikong pagbubukas ng OAuth modal loop sa mga baog na detalyadong page ng provider (PR #820) -**Dependency Updates:**Bumped at naka-lock down na mga dependency para sa development at production tree kasama ang Next.js 16.2.1, Recharts, at TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A Workflows:**Nagdagdag ng deterministikong FSM orchestrator para sa mga multi-step na daloy ng trabaho ng ahente. -**Graceful Degradation:**Nagdagdag ng bagong multi-layer fallback framework upang mapanatili ang pangunahing functionality sa panahon ng bahagyang pagkawala ng system. -**Config Audit:**Nagdagdag ng audit trail na may diff detection upang subaybayan ang mga pagbabago at paganahin ang mga rollback ng configuration. -**Kalusugan ng Provider:**Nagdagdag ng pagsubaybay sa pag-expire ng provider na may mga proactive na alerto sa UI para sa mga nag-expire na API key. -**Adaptive Routing:**Nagdagdag ng adaptive volume at complexity detector para dynamic na i-override ang mga diskarte sa pagruruta batay sa load. -**Pagkakaiba-iba ng Provider:**Ipinatupad ang pagmamarka ng pagkakaiba-iba ng provider sa pamamagitan ng Shannon entropy upang mapabuti ang pamamahagi ng load. -**Auto-Disable Bounds:**Nagdagdag ng Auto-Disable Banned Accounts setting toggle sa Resilience dashboard.### 🐛 Bug Fixes

-**Codex at Claude Compatibility:**Inayos ang mga fallback ng UI, na-patch na mga isyu sa pagsasama ng hindi pag-stream ng Codex, at nalutas ang CLI runtime detection sa Windows. -**Release Automation:**Kinakailangan ang mga pinalawak na pahintulot para sa build ng Electron App sa GitHub Actions. -**Cloudflare Runtime:**Natugunan ang tamang runtime isolation exit code para sa mga bahagi ng Cloudflared tunnel.### 🧪 Tests

-**Mga Update sa Test Suite:**Pinalawak na saklaw ng pagsubok para sa mga volume detector, pagkakaiba-iba ng provider, audit ng configuration, at FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD Reliability:**Na-patch na GitHub Actions sa mga stable na bersyon ng dependency (`actions/checkout@v4`, `actions/upload-artifact@v4`) para mabawasan ang hindi inanunsyo na mga paghinto sa paggamit ng environment ng builder. -**Mga Fallback ng Imahe:**Pinalitan ang mga arbitrary na fallback na chain sa `ProviderIcon.tsx` na may tahasang pagpapatunay ng asset upang maiwasan ang paglo-load ng UI ng mga bahagi ng `<Image>` para sa mga file na hindi umiiral, na inaalis ang mga `404` na error sa mga log ng dashboard console (#745). -**Admin Updater:**Dynamic na source-installation detection para sa dashboard Updater. Ligtas na hindi pinapagana ang button na `I-update Ngayon` kapag ang OmniRoute ay lokal na binuo sa halip na sa pamamagitan ng npm, na nag-uudyok para sa `git pull` (#743). -**Update ERESOLVE Error:**Injected `package.json` overrides para sa `react`/`react-dom` at na-enable ang `--legacy-peer-deps` sa loob ng internal na awtomatikong updater script upang malutas ang paglabag sa dependency tree sa `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Mga Cloudflare Tunnel:**Pagsasama ng Cloudflare Quick Tunnel sa mga kontrol ng dashboard (PR #772). -**Diagnostics:**Semantic cache bypass para sa combo live na mga pagsubok (PR #773).### 🐛 Bug Fixes

-**Streaming Stability:**Ilapat ang `FETCH_TIMEOUT_MS` sa paunang `fetch()` na tawag ng mga kahilingan sa streaming upang maiwasan ang 300s Node.js TCP timeout na magdulot ng mga tahimik na gawaing pagkabigo (#769). -**i18n:**Magdagdag ng nawawalang `windsurf` at `copilot` na entry sa `toolDescriptions` sa lahat ng 33 locale file (#748). -**GLM Coding Audit:**Kumpletuhin ang pag-audit ng provider sa pag-aayos ng mga kahinaan sa ReDoS, context window sizing (128k/16k), at pag-sync ng registry ng modelo (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Fallback processing fix para sa `type: "text"` na mga elemento na may mga null o walang laman na dataset na nagdulot ng 400 na pagtanggi (#742). -**Opencode:**I-update ang schema alignment sa iisang `provider` upang tumugma sa opisyal na spec (#774). -**Gemini CLI:**Mag-inject ng nawawalang end-user quota header na pumipigil sa 403 authorization lockout (#775). -**DB Recovery:**Refactor multipart payload imports sa raw binary buffered arrays para i-bypass ang reverse proxy max body limits (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Pagpapatatag ng Paglabas**— Na-finalize ang v3.2.9 release (combo diagnostics, quality gates, Gemini tool fix) at gumawa ng nawawalang git tag. Pinagsama-sama ang lahat ng mga yugtong pagbabago sa isang solong atomic release commit.### 🐛 Bug Fixes

-**Auto-Update Test**— Inayos ang `buildDockerComposeUpdateScript` test assertion para tumugma sa mga hindi pinalawak na shell variable reference (`$TARGET_TAG`, `${TARGET_TAG#v}`) sa nabuong script ng pag-deploy, na umaayon sa refactored na template mula sa v3.2.8. -**Circuit Breaker Test**— Pinatigas ang `combo-circuit-breaker.test.mjs` sa pamamagitan ng pag-iniksyon ng `maxRetries: 0` upang maiwasan ang muling pagsubok ng inflation mula sa pag-skewing ng mga assertion ng pagkabigo sa panahon ng mga transition ng estado ng breaker.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Nagpakilala ng live na test bypass flag (`forceLiveComboTest`) na nagbibigay-daan sa mga administrator na magsagawa ng mga tunay na upstream na pagsusuri sa kalusugan na lumalampas sa lahat ng lokal na mekanismo ng circuit-breaker at cooldown state, na nagpapagana ng mga tumpak na diagnostic sa panahon ng mga rolling outage (PR #759) -**Mga Gate ng Kalidad**— Nagdagdag ng awtomatikong pagpapatunay ng kalidad ng tugon para sa mga combo at opisyal na isinama ang suporta sa modelo ng `claude-4.6` sa mga core routing schemas (PR #762)### 🐛 Bug Fixes

-**Tool Definition Validation**— Inayos ang Gemini API integration sa pamamagitan ng pag-normalize ng mga uri ng enum sa loob ng mga kahulugan ng tool, na pumipigil sa upstream HTTP 400 parameter error (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Pinagsama ang isang hiwalay na proseso ng pag-update sa background para sa mga deployment ng Docker Compose. Ang Dashboard UI ngayon ay walang putol na sinusubaybayan ang mga kaganapan sa lifecycle ng update na pinagsasama ang mga tugon ng JSON REST sa mga overlay ng pag-usad ng streaming ng SSE para sa matatag na pagiging maaasahan sa cross-environment. -**Cache Analytics**— Inayos ang zero-metrics visualization mapping sa pamamagitan ng paglipat ng Semantic Cache telemetry log nang direkta sa centralized tracking SQLite module.### 🐛 Bug Fixes

-**Lohika ng Pagpapatotoo**— Inayos ang isang bug kung saan nabigo ang pag-save ng mga setting ng dashboard o pagdaragdag ng mga modelo na may 401 Hindi awtorisadong error noong hindi pinagana ang `requireLogin`. Tama na ngayong sinusuri ng mga endpoint ng API ang toggle ng global authentication. Nalutas ang pandaigdigang pag-redirect sa pamamagitan ng muling pag-activate ng `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Napigilan ang nakamamatay na pagsisimula ng mga exception sa panahon ng CLI environment detection sa pamamagitan ng pagkuha ng `cross-spawn` na ENOENT error nang tama. Nagdaragdag ng tahasang mga path ng pagtukoy para sa `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Na-normalize ang mga parameter ng pagsasalin ng modelo na pumipigil sa pagkalason sa konteksto sa proxy pass-through mode, na nagpapatupad ng mga generic na `store: false` na mga hadlang para sa lahat ng mga kahilingang nagmula sa Codex. -**SSE Token Reporting**— Normalized provider tool-call chunk `finish_reason` detection, inaayos ang 0% Usage analytics para sa stream-only na mga tugon na walang mahigpit na `<DONE>` indicator. -**DeepSeek <think> Tags**— Nagpatupad ng isang tahasang `<think>` extraction mapping sa loob ng `responsesHandler.ts`, na tinitiyak na ang DeepSeek na mga stream ng pangangatwiran ay namamapa nang katumbas ng mga katutubong Anthropic `<thinking>` na istruktura.---

## [3.2.7] - 2026-03-29

### Fixed

-**Seamless UI Updates**: Ang feature na "Update Now" sa Dashboard ay nagbibigay na ngayon ng live, transparent na feedback gamit ang Server-Sent Events (SSE). Nagsasagawa ito ng pag-install ng package, muling pagtatayo ng native na module (better-sqlite3), at mapagkakatiwalaan ang pag-restart ng PM2 habang nagpapakita ng mga real-time na loader sa halip na tahimik na nakabitin.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Nagdagdag ng sakop na API key copy flow sa Api Manager, na pinoprotektahan ng `ALLOW_API_KEY_REVEAL` na environment variable. -**Sidebar Visibility Controls (#739)**— Maaari na ngayong itago ng mga admin ang anumang sidebar navigation link sa pamamagitan ng mga setting ng Hitsura upang mabawasan ang visual na kalat. -**Strict Combo Testing (#735)**— Pinatigas ang combo health check endpoint para mangailangan ng mga live na text na tugon mula sa mga modelo sa halip na mga soft reachability signal lang. -**Mga Stream na Detalyadong Log (#734)**— Inilipat ang detalyadong pag-log ng kahilingan para sa mga stream ng SSE upang buuin muli ang huling payload, na nakakatipid ng napakalaking sukat ng database ng SQLite at makabuluhang nililinis ang UI.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Itinama ang logic ng authentication header para sa mga modelong `minimax` sa OpenCode Go para gamitin ang `x-api-key` sa halip na mga standard bearer token sa `/messages` protocol.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Pinagsamang template ng packaging ng `xbps-src` at mga tagubilin para natively compile at i-install ang OmniRoute na may `better-sqlite3` bindings sa pamamagitan ng cross-compilation target.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Ganap na inilipat ang legacy na `iFlow` core provider sa `Qoder AI` na nagpapanatili ng stable na API routing capabilities.### 🐛 Bug Fixes

-**Di-wastong Argument ng HTTP 400 Payload ng Gemini Tools (#731)**— Pinigilan ang mga pag-iniksyon ng array ng `thoughtSignature` sa loob ng karaniwang mga sequence ng Gemini `functionCall` na humaharang sa mga daloy ng agentic routing.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**UI ng Quota sa Mga Limitasyon ng Provider (#728)**— Na-normalize ang lohika ng limitasyon ng quota at pag-label ng data sa loob ng interface ng Limits.### 🐛 Bug Fixes

-**Mga Core Routing Schema at Leaks**— Pinalawak na `comboStrategySchema` upang native na suportahan ang `fill-first` at `p2c` na mga diskarte upang i-unblock ang kumplikadong combo na pag-edit nang native. -**Thinking Tag Extraction (CLI)**— Restructured CLI token responses sanitizer RegEx na kumukuha ng mga model reasoning structures sa loob ng mga stream na umiiwas sa mga sirang `<thinking>` extraction na lumalabag sa response text output format. -**Mahigpit na Pagpapatupad ng Format**— Pinatigas na pipeline sanitization execution na ginagawa itong pangkalahatang nalalapat sa mga target ng translation mode.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Four-Stage Request Log Pipeline (#705)**— Refactored log persistence para mag-save ng mga komprehensibong payload sa apat na natatanging pipeline stages: Kahilingan ng Kliyente, Kahilingan sa Na-translate na Provider, Tugon ng Provider, at Na-translate na Tugon ng Kliyente. Ipinakilala ang `streamPayloadCollector` para sa matatag na SSE stream truncation at payload serialization.### 🐛 Bug Fixes

-**Mga Pag-aayos ng Mobile UI (#659)**— Pinigilan ang mga bahagi ng talahanayan sa dashboard na masira ang layout sa makitid na viewport sa pamamagitan ng pagdaragdag ng wastong pahalang na pag-scroll at pag-overflow sa `DashboardLayout.'
-**Claude Prompt Cache Fixes (#708)**— Tinitiyak na `cache_control`block sa Claude-to-Claude fallback loops ay matapat na napanatili at ligtas na naipapasa pabalik sa mga modelong Anthropic.
-**Mga Depinisyon ng Gemini Tool (#725)**— Inayos ang mga error sa pagsasalin ng schema kapag nagdedeklara ng mga simpleng uri ng parameter ng`object` para sa Gemini function calling.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Kapag naubos na ang lahat ng combo models (502/503), sinusubukan na ngayon ng OmniRoute ang isang na-configure na global fallback na modelo bago ibalik ang error. Itakda ang `globalFallbackModel` sa mga setting upang paganahin.### 🐛 Bug Fixes

-**Ayusin #721**— Inayos ang pag-pin sa bypass ng konteksto sa panahon ng mga tugon sa tool-call. Gumamit ng maling JSON path ang non-streaming tagging (`json.messages` → `json.choices[0].message`). Nagti-trigger na ngayon ang streaming injection sa `finish_reason` chunks para sa mga tool-call-only na stream. Ang `injectModelTag()` ay nagdaragdag na ngayon ng mga synthetic na pin message para sa non-string na nilalaman. -**Fix #709**— Kumpirmadong naayos na (v3.1.9) — `system-info.mjs` ay lumilikha ng mga direktoryo nang paulit-ulit. sarado. -**Fix #707**— Kumpirmadong naayos na (v3.1.9) — walang laman na tool name sanitization sa `chatCore.ts`. sarado.### 🧪 Tests

- Nagdagdag ng 6 na unit test para sa context pinning na may mga tool-call response (null content, array content, roundtrip, re-injection)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**— Nagdagdag ng nakalaang semantic caching dashboard sa \`/dashboard/cache\` na may naka-target na API invalidation at 31-language na suporta sa i18n (PR #701 ni @oyi77) -**GLM Quota Tracking**— Nagdagdag ng real-time na paggamit at pagsubaybay sa quota ng session para sa provider ng GLM Coding (Z.AI) (PR #698 ni @christopher-s) -**Mga Detalyadong Log Payload**— Naka-wire ang buong apat na yugto ng pag-capture ng pipeline payload (orihinal, isinalin, tugon ng provider, stream-deltas) nang direkta sa UI (PR #705 ni @rdself)### 🐛 Bug Fixes

-**Ayusin ang #708**— Napigilan ang pagdurugo ng token para sa mga user ng Claude Code na nagruruta sa OmniRoute sa pamamagitan ng wastong pag-iingat ng mga native na \`cache_control\` header sa panahon ng Claude-to-Claude passthrough (PR #708 ni @tombii) -**Ayusin ang #719**— I-set up ang mga panloob na hangganan ng auth para sa \`ModelSyncScheduler\` upang maiwasan ang hindi napatotohanang mga pagkabigo ng daemon sa startup (PR #719 ni @rdself) -**Ayusin ang #718**— Muling itinayong pag-render ng badge sa Provider Limits UI na pumipigil sa pag-overlap ng mga hindi magandang hangganan ng quota (PR #718 ni @rdself) -**Ayusin ang #704**— Ang mga Fixed Combo Fallbacks na nasira sa HTTP 400 content-policy errors na pumipigil sa pag-root ng modelo sa dead-routing (PR #704 ni @rdself)### 🔒 Security & Dependencies

- Na-bump ang \`path-to-regexp\` sa \`8.4.0\` na niresolba ang mga vulnerabilities ng dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Ayusin #706**— Inayos ang fallback na pag-render ng icon na dulot ng Tailwind V4 `font-sans` override sa pamamagitan ng paglalapat ng `!important` sa `.material-symbols-outlined`. -**Ayusin #703**— Inayos ang mga sirang stream ng GitHub Copilot sa pamamagitan ng pagpapagana ng `mga tugon` sa pagsasalin ng format na `openai` para sa anumang mga custom na modelo na gumagamit ng `apiFormat: "mga tugon"`. -**Fix #702**— Pinalitan ang flat-rate na pagsubaybay sa paggamit ng tumpak na mga kalkulasyon sa pagpepresyo ng DB para sa parehong streaming at non-streaming na mga tugon. -**Fix #716**— Nilinis ang Claude tool-call translation state, wastong pag-parse ng streaming arguments at pinipigilan ang OpenAI `tool_calls` chunks mula sa pag-ulit sa `id` field.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Auto-coerce string-encoded numeric JSON Schema constraints (hal. `"minimum": "1"`) sa mga wastong uri, na pumipigil sa 400 error mula sa Cursor, Cline, at iba pang mga kliyente na nagpapadala ng mga maling schema ng tool. -**Pagkalinis sa Paglalarawan ng Tool**— Tiyaking palaging mga string ang mga paglalarawan ng tool; kino-convert ang `null`, `undefined`, o numeric na paglalarawan sa mga walang laman na string bago ipadala sa mga provider. -**Clear All Models Button**— Nagdagdag ng mga pagsasalin ng i18n para sa aksyon ng provider na "Clear All Models" sa lahat ng 30 wika. -**Codex Auth Export**— Nagdagdag ng Codex `auth.json` export at apply-local na mga button para sa tuluy-tuloy na pagsasama ng CLI. -**Windsurf BYOK Notes**— Nagdagdag ng mga opisyal na babala sa limitasyon sa Windsurf CLI tool card na nagdodokumento ng mga hadlang sa BYOK.### 🐛 Bug Fixes

-**Fix #709**— Hindi na nag-crash ang `system-info.mjs` kapag wala ang output directory (idinagdag ang `mkdirSync` na may recursive flag). -**Fix #710**— A2A `TaskManager` singleton ay gumagamit na ngayon ng `globalThis` para maiwasan ang state leakage sa Next.js API route recompilations sa dev mode. Na-update ang E2E test suite upang mahawakan ang 401 nang maganda. -**Ayusin #711**— Nagdagdag ng pagpapatupad ng cap na partikular sa provider ng `max_tokens` para sa mga upstream na kahilingan. -**Ayusin ang #605 / #592**— I-strip ang `proxy_` prefix mula sa mga pangalan ng tool sa hindi nag-stream na mga tugon ni Claude; naayos ang URL ng pagpapatunay ng LongCat. -**Call Logs Max Cap**— Na-upgrade ang `getMaxCallLogs()` na may caching layer, env var support (`CALL_LOGS_MAX`), at DB settings integration.### 🧪 Tests

- Pinalawak ang test suite mula sa 964 → 1027 na pagsubok (63 bagong pagsubok)
- Nagdagdag ng `schema-coercion.test.mjs` — 9 na pagsubok para sa numeric field coercion at sanitization ng paglalarawan ng tool
- Nagdagdag ng `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI integration test
- Pinahusay na feature-tests branch na may komprehensibong coverage tooling### 📁 New Files

| File                                                     | Layunin                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema coercion at paglalarawan ng tool sanitization utilities |
| `tests/unit/schema-coercion.test.mjs`                    | Mga pagsubok sa yunit para sa schema coercion                  |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI tool integration tests                                     |
| `COVERAGE_PLAN.md`                                       | Dokumento sa pagpaplano ng saklaw ng pagsubok                  | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Ang mga nakapirming cache_control marker ay tinanggal sa Claude passthrough mode (Claude → OmniRoute → Claude), na naging dahilan upang maubos ng mga user ng Claude Code ang kanilang Anthropic API quota nang 5-10x nang mas mabilis kaysa sa mga direktang koneksyon. Pinapanatili na ngayon ng OmniRoute ang cache_control marker ng kliyente kapag ang sourceFormat at targetFormat ay parehong Claude, na tinitiyak na gumagana nang tama ang prompt caching at kapansin-pansing binabawasan ang pagkonsumo ng token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Core:**Ipinatupad ang pandaigdigang pangangasiwa ng estado para sa Mga Nakatagong Modelo at Combos na pumipigil sa kanila sa pagkalat sa catalog o pagtagas sa mga konektadong ahente ng MCP (#681). -**Katatagan:**Nabigo ang mga naka-patch na streaming crash na nauugnay sa native na Antigravity provider integration dahil sa hindi nahawakang hindi natukoy na mga array ng estado (#684). -**Localization Sync:**Nag-deploy ng ganap na na-overhaul na `i18n` synchronizer na nagde-detect ng mga nawawalang nested na JSON property at retro-fitting na 30 locale nang sunud-sunod (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Streaming Stability:**Inayos ang `hasValuableContent` na nagbabalik ng `undefined` para sa mga walang laman na chunks sa SSE stream (#676). -**Tool Calling:**Inayos ang isang isyu sa `sseParser.ts` kung saan ang hindi nag-stream na mga tugon ni Claude na may maraming tool call ay nag-drop ng `id` ng mga kasunod na tool call dahil sa maling index-based na deduplication (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Ang mga pangalan ng tool tulad ng `TodoWrite` ay hindi na naka-prefix ng `proxy_` sa Claude passthrough na mga tugon (parehong streaming at non-streaming). May kasamang saklaw sa pagsubok ng unit (PR #663 ni @coobabm) -**Clear All Models Alias Cleanup**— Tinatanggal na ngayon ng button na "Clear All Models" ang mga nauugnay na alias ng modelo, na pumipigil sa mga ghost model sa UI (PR #664 ni @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Auto-recover na ngayon ang mga account na may limitasyon sa rate kapag nag-expire ang kanilang cooldown window, na nag-aayos ng deadlock kung saan ang mataas na `backoffLevel` ay permanenteng na-deprioritize ang mga account (PR #657 ni @brendandebeasi)### 🌍 i18n

-**Chinese translation overhaul**— Comprehensive rewrite ng `zh-CN.json` na may pinahusay na katumpakan (PR #658 ni @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Pag-aayos ng Pag-override ng Pag-stream**— Ang tahasang `stream: true` sa nilalaman ng kahilingan ay mas priyoridad na ngayon kaysa sa header ng `Accept: application/json`. Ang mga kliyenteng nagpapadala ng pareho ay tama na makakatanggap ng mga tugon sa streaming ng SSE (#656)### 🌍 i18n

-**Czech string improvements**— Pinong terminolohiya sa `cs.json` (PR #655 ni @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 nawawalang translation key**ay idinagdag sa `en.json` at 12 wika (PR #652 ni @zen0bit) -**Na-update ang dokumentasyon ng Czech**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT na mga gabay (PR #652) -**Mga script ng pagpapatunay ng pagsasalin**— `check_translations.py` at `validate_translation.py` para sa CI/QA (PR #651 ni @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritikal: Tool Calling Regression**— Inayos ang mga error sa `proxy_Bash` sa pamamagitan ng hindi pagpapagana ng `proxy_` tool name prefix sa Claude passthrough path. Ang mga tool tulad ng `Bash`, `Read`, `Write` ay pinalitan ng pangalan sa `proxy_Bash`, `proxy_Read`, atbp., na naging dahilan upang tanggihan sila ni Claude (#618) -**Kiro Account Ban Documentation**— Nakadokumento bilang upstream AWS anti-fraud false positive, hindi isang isyu sa OmniRoute (#649)### 🧪 Tests

-**936 na pagsubok, 0 pagkabigo**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadata ng Vision Capability**: Nagdagdag ng `capabilities.vision`, `input_modalities`, at `output_modalities` sa `/v1/models` na mga entry para sa mga vision-capable na modelo (PR #646) -**Gemini 3.1 Models**: Idinagdag ang `gemini-3.1-pro-preview` at `gemini-3.1-flash-lite-preview` sa Antigravity provider (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401 Error**: Inayos ang maling API base URL — binago mula sa `api.ollama.com` patungo sa opisyal na `ollama.com/v1/chat/completions` (#643) -**Expired Token Retry**: Idinagdag ang bounded retry na may exponential backoff (5→10→20 min) para sa mga nag-expire na koneksyon sa OAuth sa halip na permanenteng laktawan ang mga ito (PR #647)### 🧪 Tests

-**936 na pagsubok, 0 pagkabigo**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Mga Template ng Isyu sa GitHub**: Nagdagdag ng standardized na ulat ng bug, kahilingan sa feature, at mga template ng isyu sa config/proxy (#641) -**Clear All Models**: Nagdagdag ng "Clear All Models" na button sa page ng detalye ng provider na may suporta sa i18n sa 29 na wika (#634)### 🐛 Bug Fixes

-**Locale Conflict (`in.json`)**: Pinalitan ang pangalan ng Hindi locale file mula sa `in.json` (Indonesian ISO code) patungong `hi.json` upang ayusin ang mga salungatan sa pagsasalin sa Weblate (#642) -**Codex Empty Tool Names**: Inilipat ang tool name sanitization bago ang native Codex passthrough, inaayos ang 400 error mula sa upstream provider kapag ang mga tool ay may mga walang laman na pangalan (#637) -**Streaming Newline Artifacts**: Idinagdag ang `collapseExcessiveNewlines` sa response sanitizer, pagbagsak ng 3+ na magkakasunod na newline mula sa mga iniisip na modelo sa isang karaniwang double newline (#638) -**Claude Reasoning Effort**: Na-convert ang OpenAI na `reasoning_effort` param sa native na `thinking` na block ng badyet ni Claude sa lahat ng path ng kahilingan, kabilang ang awtomatikong pagsasaayos ng `max_tokens` (#627) -**Qwen Token Refresh**: Ipinatupad ang maagap na pre-expire na OAuth token refresh (5 minutong buffer) upang maiwasan ang mga kahilingan na mabigo kapag gumagamit ng mga panandaliang token (#631)### 🧪 Tests

-**936 na pagsubok, 0 pagkabigo**(+10 pagsubok mula noong 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN token sa Claude Code / mga tugon ng kliyente (#617):**

- Ang `sanitizeUsage()` ay nag-cross-map na ngayon ng `input_tokens`→`prompt_tokens` at `output_tokens`→`completion_tokens` bago ang whitelist filter, inaayos ang mga tugon na nagpapakita ng NaN/0 na bilang ng token kapag ibinalik ng mga provider ang mga pangalan ng field ng paggamit sa istilo ng Claude### Seguridad

- Na-update na package na `yaml` upang ayusin ang kahinaan ng stack overflow (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Sarado #613 (Codestral — naresolba gamit ang Custom Provider workaround)
- Nagkomento sa #615 (OpenCode dual-endpoint — ibinigay na workaround, sinusubaybayan bilang kahilingan sa tampok)
- Nagkomento sa #618 (tool call visibility — humihiling ng v3.0.9 test)
- Nagkomento sa #627 (antas ng pagsisikap — suportado na)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Mga Pagkabigo sa Pagsasalin para sa OpenAI-format na Provider sa Claude CLI (#632):**

- Pangasiwaan ang format ng array ng `reasoning_details[]` mula sa StepFun/OpenRouter — nagiging `reasoning_content`
- Pangasiwaan ang `reasoning` field alias mula sa ilang provider → na-normalize sa `reasoning_content`
- Mga pangalan ng field sa paggamit ng cross-map: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` sa `filterUsageForFormat`
- Ayusin ang `extractUsage` upang tanggapin ang parehong `input_tokens`/`output_tokens` at `prompt_tokens`/`completion_tokens` bilang mga wastong field ng paggamit
- Inilapat sa parehong mga path ng streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts`) at non-streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Inayos ang `client_secret is missing` error para sa npm-installed users — ang `clientSecretDefault` ay walang laman sa providerRegistry, na naging dahilan upang tanggihan ng Google ang mga kahilingan sa pag-refresh ng token (#588) -**OpenCode Zen Models:**Idinagdag ang `modelsUrl` sa OpenCode Zen registry entry para gumana nang tama ang "Import from /models" (#612) -**Streaming Artifacts:**Inayos ang labis na mga bagong linya na natitira sa mga tugon pagkatapos ng pag-alis ng signature ng thinking-tag (#626) -**Proxy Fallback:**Nagdagdag ng awtomatikong muling pagsubok nang walang proxy kapag nabigo ang SOCKS5 relay -**Proxy Test:**Ang test endpoint ay niresolba na ngayon ang mga tunay na kredensyal mula sa DB sa pamamagitan ng proxyId### ✨ New Features

-**Playground Account/Key Selector:**Persistent, palaging nakikitang dropdown para pumili ng mga partikular na provider account/key para sa pagsubok — kinukuha ang lahat ng koneksyon sa startup at mga filter ng napiling provider -**Mga Dynamic na Modelo ng CLI Tools:**Dynamic na kinukuha na ngayon ang pagpili ng modelo mula sa `/v1/models` API — ipinapakita na ngayon ng mga provider tulad ng Kiro ang kanilang buong catalog ng modelo -**Listahan ng Modelo ng Antigravity:**Na-update gamit ang Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; pinagana ang `passthroughModels` para sa dynamic na access ng modelo (#628)### 🔧 Maintenance

- Pinagsamang PR #625 — Nililimitahan ng Provider ang light mode na pag-aayos sa background---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limits/Proxy:**Fixed Codex limit fetching para sa mga account sa likod ng SOCKS5 proxy — token refresh ay tumatakbo na ngayon sa loob ng proxy context -**CI:**Naayos ang integration test na `v1/models` na pagkabigo sa paninindigan sa mga CI environment na walang koneksyon sa provider -**Mga Setting:**Ipinapakita na ngayon ng button ng proxy na pagsubok ang mga resulta ng tagumpay/pagkabigo kaagad (dati nang nakatago sa likod ng data ng kalusugan)### ✨ New Features

-**Playground:**Added Account selector dropdown — subukan ang mga partikular na koneksyon nang paisa-isa kapag ang isang provider ay maraming account### 🔧 Maintenance

- Pinagsamang PR #623 — Pagwawasto ng path ng base ng URL ng LongCat API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Idinagdag ang tampok na pagpapangkat ng tag sa dashboard ng mga koneksyon upang mapahusay ang visual na organisasyon para sa mga account na may mga custom na tag.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Inayos ang estado ng `TextDecoder` corruption sa loob ng combo `sanitize` TransformStream na nagdulot ng SSE garbled output na tumutugma sa mga multibyte na character (PR #614) -**Providers UI:**Ligtas na mag-render ng mga HTML tag sa loob ng mga tooltip ng error sa koneksyon ng provider gamit ang `dangerouslySetInnerHTML` -**Mga Setting ng Proxy:**Nagdagdag ng nawawalang `username` at `password` na mga katangian ng katawan ng payload na nagpapahintulot sa mga na-authenticate na proxy na matagumpay na ma-verify mula sa Dashboard. -**Provider API:**Bound soft exception ay bumabalik sa `getCodexUsage` na pumipigil sa mga pagkabigo ng API HTTP 500 kapag nabigo ang pagkuha ng token---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Auto-Sync Models:**Nagdagdag ng UI toggle at `sync-models` endpoint upang awtomatikong i-synchronize ang mga listahan ng modelo sa bawat provider gamit ang nakaiskedyul na interval scheduler (PR #597)### 🐛 Bug Fixes

-**Mga Timeout:**Itinaas ang mga default na proxy na `FETCH_TIMEOUT_MS` at `STREAM_IDLE_TIMEOUT_MS` sa 10 minuto upang maayos na suportahan ang malalim na mga modelo ng pangangatwiran (tulad ng o1) nang hindi pinapahinto ang mga kahilingan (Mga Pag-aayos #609) -**CLI Tool Detection:**Pinahusay na cross-platform detection na nangangasiwa sa mga NVM path, Windows `PATHEXT` (pinipigilan ang isyu ng `.cmd` wrapper), at custom na NPM prefix (PR #598) -**Streaming Logs:**Ipinatupad ang `tool_calls` na akumulasyon ng delta sa streaming response logs upang ang mga function na tawag ay sinusubaybayan at nagpapatuloy nang tumpak sa DB (PR #603) -**Catalog ng Modelo:**Inalis ang auth exemption, maayos na itinatago ang mga modelong `comfyui` at `sdwebui` kapag walang provider na tahasang na-configure (PR #599)### 🌐 Translations

-**cs:**Pinahusay na mga string ng pagsasalin ng Czech sa buong app (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Nagdagdag ng field ng Tag/Group sa `EditConnectionModal` (naimbak sa `providerSpecificData.tag`) nang hindi nangangailangan ng DB schema migration.
- Ang mga koneksyon sa view ng provider ay dynamic na pinapangkat ayon sa tag na may mga visual divider.
- Ang mga hindi naka-tag na koneksyon ay unang lumalabas nang walang header, na sinusundan ng mga naka-tag na grupo sa alpabetikong pagkakasunud-sunod.
- Awtomatikong nalalapat ang pagpapangkat ng tag sa seksyong Mga Limitasyon ng Codex/Copilot/Antigravity dahil may mga toggle sa loob ng mga hilera ng koneksyon.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Nawawalang mga badge sa mga card ng koneksyon:**Inayos sa pamamagitan ng paggamit ng `resolveProxyForConnection()` kaysa sa static na pagmamapa. -**Na-disable ang Test Connection sa naka-save na mode:**Na-enable ang Test button sa pamamagitan ng paglutas ng proxy config mula sa naka-save na listahan. -**Config Modal freezing:**Nagdagdag ng `onClose()` na mga tawag pagkatapos i-save/clear upang pigilan ang pagyeyelo ng UI. -**Dobleng pagbibilang ng paggamit:**Ang `ProxyRegistryManager` ay buong pananabik na naglo-load ng paggamit sa mount na may deduplication ayon sa `scope` + `scopeId`. Ang mga bilang ng paggamit ay pinalitan ng isang Test button na nagpapakita ng IP/latency inline.#### fix(translator): `function_call` prefix stripping

- Nag-ayos ng hindi kumpletong pag-aayos mula sa PR #607 kung saan ang mga `tool_use` lang ang nag-block ng `proxy_` tool prefix ni Claude. Ngayon, ang mga kliyenteng gumagamit ng OpenAI Responses API na format ay tama ring makakatanggap ng mga tool tool nang walang `proxy_` prefix.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tatlong kritikal na regression na iniulat ng mga user pagkatapos ng v3.0.0 launch ay nalutas na.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Ang prefix na `proxy_` na idinagdag ni Claude OAuth ay inalis lamang sa**streaming**na mga tugon. Sa**non-streaming**mode, walang access ang `translateNonStreamingResponse` sa `toolNameMap`, na naging dahilan upang makatanggap ang mga kliyente ng mga sira na pangalan ng tool tulad ng `proxy_read_file` sa halip na `read_file`.

**Ayusin:**Nagdagdag ng opsyonal na parameter na `toolNameMap` sa `translateNonStreamingResponse` at naglapat ng prefix stripping sa Claude `tool_use` block handler. Ang `chatCore.ts` ay dumadaan na ngayon sa mapa.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

Hindi inilalantad ng LongCat AI ang `GET /v1/models`. Ang generic na `validateOpenAICompatibleProvider` validator ay nahulog sa isang chat-completions fallback lamang kung ang `validationModelId` ay itinakda, na hindi na-configure ng LongCat. Nagdulot ito ng pagkabigo ng pagpapatunay ng provider na may mapanlinlang na error sa pagdaragdag/pag-save.

**Ayusin:**Idinagdag ang `longcat` sa mapa ng mga specialty validator, direktang sinusuri ang `/chat/completions` at tinatrato ang anumang tugon na hindi awtorisado bilang pass.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Mga tool sa MCP (hal. `pencil`, `computer_use`) para sa pagpapasa ng mga kahulugan ng tool na may `{type:"object"}` ngunit walang field na `properties`. Tinatanggihan ito ng API ng Anthropic ng: `nawawalang katangian ng object schema`.

**Ayusin:**Sa `openai-to-claude.ts`, mag-inject ng `properties: {}` bilang isang ligtas na default kapag ang `type` ay `"object"` at wala ang `properties`.---

### 🔀 Community PRs Merged (2)

| PR       | May-akda | Buod                                                                             |
| -------- | -------- | -------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3  | docs(i18n): ayusin ang pagsasalin sa Russian para sa Playground at Testbed       |
| **#591** | @rdself  | fix(ui): pagbutihin ang Provider Limits light mode contrast at plan tier display | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 na pagsubok, 0 pagkabigo**(hindi nabago mula sa v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Ang pinakamalaking release kailanman.**Mula sa 36 provider sa v2.9.5 hanggang**67+ provider**sa v3.0.0 — kasama ang MCP Server, A2A Protocol, auto-combo engine, Provider Icons, Registered Keys API, 926 na pagsubok, at mga kontribusyon mula sa**12 miyembro ng komunidad**sa**10 merged PRs**.
>
> Pinagsama-sama mula v3.0.0-rc.1 hanggang rc.17 (17 mga kandidato sa pagpapalabas sa loob ng 3 araw ng matinding pag-unlad).---

### 🆕 New Providers (+31 since v2.9.5)

| Provider                      | Alyas                 | Tier      | Mga Tala                                                                                |
| ----------------------------- | --------------------- | --------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`        | Libre     | 3 modelo sa pamamagitan ng `opencode.ai/zen/v1` (PR #530 ni @kang-heewon)               |
| **OpenCode Go**               | `opencode-go`         | Binayaran | 4 na modelo sa pamamagitan ng `opencode.ai/zen/go/v1` (PR #530 ni @kang-heewon)         |
| **LongCat AI**                | `lc`                  | Libre     | 50M token/araw (Flash-Lite) + 500K/araw (Chat/Thinking) sa panahon ng pampublikong beta |
| **Polinations AI**            | `pol`                 | Libre     | Walang API key na kailangan — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)   |
| **Cloudflare Workers AI**     | `cf`                  | Libre     | 10K Neurons/araw — ~150 LLM na tugon o 500s Whisper audio, edge inference               |
| **Scaleway AI**               | `scw`                 | Libre     | 1M libreng token para sa mga bagong account — sumusunod sa EU/GDPR (Paris)              |
| **AI/ML API**                 | `layunin`             | Libre     | $0.025/araw na libreng credits — 200+ na modelo sa pamamagitan ng iisang endpoint       |
| **Puter AI**                  | `pu`                  | Libre     | 500+ modelo (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                   |
| **Alibaba Cloud (DashScope)** | `ali`                 | Binayaran | International + China na mga endpoint sa pamamagitan ng `alicode`/`alicode-intl`        |
| **Alibaba Coding Plan**       | `bcp`                 | Binayaran | Alibaba Model Studio na may Anthropic-compatible na API                                 |
| **Kimi Coding (API Key)**     | `kmca`                | Binayaran | Nakalaang API-key-based Kimi access (hiwalay sa OAuth)                                  |
| **MiniMax Coding**            | `minimax`             | Binayaran | Pang-internasyonal na endpoint                                                          |
| **MiniMax (China)**           | `minimax-cn`          | Binayaran | endpoint na partikular sa China                                                         |
| **Z.AI (GLM-5)**              | `zai`                 | Binayaran | Zhipu AI next-gen GLM na mga modelo                                                     |
| **Vertex AI**                 | `vertex`              | Binayaran | Google Cloud — Service Account JSON o OAuth access_token                                |
| **Ollama Cloud**              | `ollamacloud`         | Binayaran | Ang naka-host na serbisyo ng API ng Ollama                                              |
| **Synthetic**                 | `synthetic`           | Binayaran | Passthrough na mga modelo ng gateway                                                    |
| **Kilo Gateway**              | `kg`                  | Binayaran | Passthrough na mga modelo ng gateway                                                    |
| **Perplexity Search**         | `pplx-search`         | Binayaran | Nakalaang endpoint na batay sa paghahanap                                               |
| **Serper Search**             | `serper-search`       | Binayaran | Pagsasama ng API sa paghahanap sa web                                                   |
| **Matapang na Paghahanap**    | `matapang-paghahanap` | Binayaran | Pagsasama ng Brave Search API                                                           |
| **Exa Search**                | `exa-search`          | Binayaran | Pagsasama ng Neural search API                                                          |
| **Tavily Search**             | `tavily-search`       | Binayaran | Pagsasama ng AI search API                                                              |
| **NanoBanana**                | `nb`                  | Binayaran | Image generation API                                                                    |
| **ElevenLabs**                | `el`                  | Binayaran | Text-to-speech voice synthesis                                                          |
| **Cartesia**                  | `cartesia`            | Binayaran | Napakabilis na TTS voice synthesis                                                      |
| **PlayHT**                    | `playht`              | Binayaran | Pag-clone ng boses at TTS                                                               |
| **Inworld**                   | `inworld`             | Binayaran | AI character voice chat                                                                 |
| **SD WebUI**                  | `sdwebui`             | Self-host | Stable Diffusion local image generation                                                 |
| **ComfyUI**                   | `comfyui`             | Self-host | ComfyUI local workflow node-based na henerasyon                                         |
| **GLM Coding**                | `glm`                 | Binayaran | BigModel/Zhipu coding-specific na endpoint                                              | **Kabuuan: 67+ provider**(4 Libre, 8 OAuth, 55 API Key) + walang limitasyong OpenAI/Anthropic-Compatible na custom na provider.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Awtomatikong bumuo at mag-isyu ng mga OmniRoute API key gamit ang bawat provider at pagpapatupad ng quota sa bawat account.

| Endpoint                        | Paraan          | Paglalarawan                                                   |
| ------------------------------- | --------------- | -------------------------------------------------------------- |
| `/api/v1/registered-keys`       | `POST`          | Mag-isyu ng bagong key — ibinalik ang raw key**minsan lamang** |
| `/api/v1/registered-keys`       | `KUMUHA`        | Ilista ang mga nakarehistrong key (masked)                     |
| `/api/v1/registered-keys/{id}`  | `KUMUHA/DELETE` | Kumuha ng metadata / Bawiin                                    |
| `/api/v1/quota/check`           | `KUMUHA`        | Paunang i-validate ang quota bago magbigay ng                  |
| `/api/v1/providers/{id}/limits` | `GET/PUT`       | I-configure ang mga limitasyon sa pagbibigay ng bawat provider |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`       | I-configure ang mga limitasyon sa pagbibigay ng bawat account  |
| `/api/v1/issues/ulat`           | `POST`          | Mag-ulat ng mga kaganapan sa quota sa Mga Isyu sa GitHub       |

**Seguridad:**Ang mga susi ay nakaimbak bilang SHA-256 na mga hash. Raw key na ipinakita nang isang beses sa paggawa, hindi na mababawi muli.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ logo ng provider gamit ang `@lobehub/icons` React component (SVG). Fallback chain:**Lobehub SVG → umiiral na PNG → generic na icon**. Inilapat sa mga pahina ng Dashboard, Provider, at Ahente na may standardized na bahagi ng `ProviderIcon`.#### 🔄 Model Auto-Sync Scheduler (#488)

Awtomatikong nire-refresh ang mga listahan ng modelo para sa mga konektadong provider bawat**24 na oras**. Gumagana sa pagsisimula ng server. Nako-configure sa pamamagitan ng `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Imapa ang mga pattern ng pangalan ng modelo (glob) sa mga partikular na combo para sa awtomatikong pagruruta:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Bagong talahanayan ng `model_combo_mappings` na may pagtutugma ng glob-to-regex
- Seksyon ng Dashboard UI: "Mga Panuntunan sa Pagruruta ng Modelo" na may inline na add/edit/toggle/delete#### 🧭 API Endpoints Dashboard

Interactive catalog, webhooks management, OpenAPI viewer — lahat sa isang tab na page sa `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 bagong pagsasama ng provider ng paghahanap:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— pagpapagana ng mga grounded AI na tugon gamit ang real-time na web data.#### 📊 Search Analytics

Bagong tab sa `/dashboard/analytics` — breakdown ng provider, rate ng hit ng cache, pagsubaybay sa gastos. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Mga column na `max_requests_per_day` at `max_requests_per_minute` na may in-memory sliding-window na pagpapatupad na nagbabalik ng HTTP 429.#### 🎵 Media Playground

Full media generation playground sa `/dashboard/media`: Image Generation, Video, Music, Audio Transcription (2GB upload limit), at Text-to-Speech.---

### 🔒 Security & CI/CD

-**CodeQL remediation**— Inayos ang 10+ alerto: 6 polynomial-redos, 1 insecure-randomness (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection -**Pagpapatunay ng ruta**— Mga Zod schema + `validateBody()` sa**176/176 na mga ruta ng API**— Ipinatupad ang CI -**CVE fix**— dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) nalutas sa pamamagitan ng npm overrides -**Flatted**— Bumped 3.3.3 → 3.4.2 (CWE-1321 prototype pollution) -**Docker**— Na-upgrade ang `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: malinaw na naaaksyunan na error kapag nawawala ang `GEMINI_OAUTH_CLIENT_SECRET` sa Docker -**#549**— Niresolba na ngayon ng mga ruta ng mga setting ng CLI ang totoong API key mula sa `keyId` (hindi mga naka-mask na string) -**#574**— Hindi na nag-freeze ang pag-log in pagkatapos laktawan ang setup ng password ng wizard -**#506**— Cross-platform na `machineId` na muling isinulat (Windows REG.exe → macOS ioreg → Linux → hostname fallback)#### Providers & Routing

-**#536**— LongCat AI: naayos ang `baseUrl` at `authHeader` -**#535**— Pinned model override: `body.model` wastong nakatakda sa `pinnedModel` -**#570**— Ang mga hindi naka-prefix na modelo ng Claude ay nire-resolve na ngayon sa Anthropic provider -**#585**— Hindi na tumutulo ang mga panloob na tag ng `<omniModel>` sa mga kliyente sa SSE streaming -**#493**— Ang pagpapangalan ng custom na modelo ng provider ay hindi na nasira ng prefix stripping -**#490**— Streaming + proteksyon ng cache ng konteksto sa pamamagitan ng `TransformStream` na iniksyon -**#511**— `<omniModel>` tag na ini-inject sa unang bahagi ng nilalaman (hindi pagkatapos ng `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + Codex loop: `tool_result` blocks ngayon ay na-convert sa text -**#524**— Na-save nang tama ang OpenCode config (XDG_CONFIG_HOME, TOML format) -**#522**— API Manager: inalis ang mapanlinlang na "Kopyahin ang naka-mask na key" na buton -**#546**— `--version` na nagbabalik ng `unknown` sa Windows (PR ni @k0valik) -**#544**— Secure na CLI tool detection sa pamamagitan ng mga kilalang install path (PR ni @k0valik) -**#510**— Awtomatikong na-normalize ang mga path ng Windows MSYS2/Git-Bash -**#492**— Nakikita ng CLI ang `mise`/`nvm`-managed Node kapag nawawala ang `app/server.js`#### Streaming & SSE

-**PR #587**— Ibalik ang pag-import ng `resolveDataDir` sa mga tugonTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Bottleneck 429 walang katapusang paghihintay: i-drop ang mga trabaho sa paghihintay sa limitasyon sa rate (@xandr0s) -**#483**— Ihinto ang pagsunod sa `data: null` pagkatapos ng `[DONE]` signal -**#473**— Zombie SSE stream: nabawasan ang timeout ng 300s → 120s para sa mas mabilis na fallback#### Media & Transcription

-**Transcription**— Deepgram `video/mp4` → `audio/mp4` MIME mapping, auto language detection, bantas -**TTS**— `[object Object]` error display na naayos para sa ElevenLabs-style nested errors -**Mga limitasyon sa pag-upload**— Tumaas ang transkripsyon ng media sa 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— column na `requested_model` sa mga log ng tawag (migration 009) -**T02**— I-strip ang mga walang laman na text block mula sa nested `tool_result.content` -**T03**— I-parse ang `x-codex-5h-*` / `x-codex-7d-*` mga header ng quota -**T04**— `X-Session-Id` header para sa panlabas na sticky routing -**T05**— Rate-limit DB persistence na may nakalaang API -**T06**— Na-deactivate ang account → permanenteng block (1-taong cooldown) -**T07**— X-Forwarded-Para sa IP validation (`extractClientIp()`) -**T08**— Per-API-key na mga limitasyon ng session na may sliding-window enforcement -**T09**— Mga saklaw ng limitasyon sa rate ng Codex vs Spark (mga hiwalay na pool) -**T10**— Naubos na ang mga credit → natatanging 1h cooldown fallback -**T11**— `max` na pagsisikap sa pangangatwiran → 131072 token ng badyet -**T12**— Mga entry sa pagpepresyo ng MiniMax M2.7 -**T13**— Stale quota display fix (i-reset ang window awareness) -**T14**— Proxy fast-fail TCP check (≤2s, naka-cache na 30s) -**T15**— Pag-normalize ng nilalaman ng array para sa Anthropic -**T23**— Intelligent na pag-reset ng quota fallback (pagkuha ng header) -**T24**— `503` cooldown + `406` na pagmamapa -**T25**— fallback sa validation ng provider -**T29**— Vertex AI Service Account JWT auth -**T33**— Antas ng pag-iisip sa conversion ng badyet -**T36**— `403` vs `429` klasipikasyon ng error -**T38**— Mga sentralisadong detalye ng modelo (`modelSpecs.ts`) -**T39**— Endpoint fallback para sa `fetchAvailableModels` -**T41**— Auto-redirect ang gawain sa background sa mga flash model -**T42**— Pagmapa ng aspect ratio ng pagbuo ng imahe#### Other Improvements

-**Per-model upstream custom na mga header**— sa pamamagitan ng configuration UI (PR #575 ni @zhangqiang8vip) -**Haba ng konteksto ng modelo**— nako-configure sa metadata ng modelo (PR #578 ni @hijak) -**Pagtatanggal ng prefix ng modelo**— opsyon upang alisin ang prefix ng provider mula sa mga pangalan ng modelo (PR #582 ni @jay77721) -**Paghinto sa paggamit ng Gemini CLI**— minarkahang hindi na ginagamit ng babala sa paghihigpit ng Google OAuth -**YAML parser**— pinalitan ang custom na parser ng `js-yaml` para sa tamang OpenAPI spec parsing -**ZWS v5**— HMR leak fix (485 DB na koneksyon → 1, memory 2.4GB → 195MB) -**Log export**— Bagong JSON export button sa dashboard na may time range dropdown -**I-update ang notification banner**— ang homepage ng dashboard ay nagpapakita kapag may mga bagong bersyon na available---

### 🌐 i18n & Documentation

-**30 wika**sa 100% parity — 2,788 nawawalang key ang naka-sync -**Czech**— Buong pagsasalin: 22 doc, 2,606 UI string (PR ni @zen0bit) -**Chinese (zh-CN)**— Kumpletuhin ang muling pagsasalin (PR ni @only4copilot) -**VM Deployment Guide**— Isinalin sa English bilang source na dokumento -**API Reference**— Nagdagdag ng `/v1/embeddings` at `/v1/audio/speech` na mga endpoint -**Bilang ng provider**— Na-update mula 36+/40+/44+ hanggang**67+**sa README at lahat ng 30 i18n README---

### 🔀 Community PRs Merged (10)

| PR       | May-akda        | Buod                                                                                         |
| -------- | --------------- | -------------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): ibalik ang resolveDataDir import para sa Cloudflare Workers compat                 |
| **#582** | @jay77721       | feat(proxy): opsyon sa pagtanggal ng prefix ng pangalan ng modelo                            |
| **#581** | @jay77721       | fix(npm): i-link ang electron-release sa npm-publish workflow                                |
| **#578** | @hijak          | gawa: nako-configure ang haba ng konteksto sa metadata ng modelo                             |
| **#575** | @zhangqiang8vip | gawa: per-modelo upstream header, compat PATCH, chat alignment                               |
| **#562** | @coobabm        | ayusin: MCP session management, Claude passthrough, detectFormat                             |
| **#561** | @zen0bit        | fix(i18n): Pagwawasto sa pagsasalin ng Czech                                                 |
| **#555** | @k0valik        | fix(sse): sentralisadong `resolveDataDir()` para sa resolution ng path                       |
| **#546** | @k0valik        | fix(cli): `--version` na nagbabalik ng `unknown` sa Windows                                  |
| **#544** | @k0valik        | fix(cli): secure na CLI tool detection sa pamamagitan ng installation path                   |
| **#542** | @rdself         | fix(ui): light mode contrast CSS theme variables                                             |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go provider na may `OpencodeExecutor`                                   |
| **#512** | @zhangqiang8vip | feat: per-protocol model compatibility (`compatByProtocol`)                                  |
| **#497** | @zhangqiang8vip | ayusin: dev-mode HMR resource leaks (ZWS v5)                                                 |
| **#495** | @xandr0s        | ayusin: Bottleneck 429 walang katapusang paghihintay (i-drop ang mga trabaho sa paghihintay) |
| **#494** | @zhangqiang8vip | gawa: MiniMax developer→system role fix                                                      |
| **#480** | @prakersh       | ayusin: pagkuha ng paggamit ng stream flush                                                  |
| **#479** | @prakersh       | gawa: Codex 5.3/5.4 at mga entry sa pagpepresyo ng Anthropic                                 |
| **#475** | @only4copilot   | feat(i18n): pinahusay na pagsasalin ng Chinese                                               |

**Salamat sa lahat ng nag-ambag!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#491` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#531` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 na pagsubok, 0 pagkabigo**(mula sa 821 sa v2.9.5)

- +105 bagong pagsubok na sumasaklaw sa: mga modelong combo mapping, nakarehistrong key, OpencodeExecutor, Bailian provider, pagpapatunay ng ruta, pag-uuri ng error, aspect ratio mapping, at higit pa---

### 📦 Database Migrations

| Migration | Paglalarawan                                                          |
| --------- | --------------------------------------------------------------------- | --- |
| **008**   | `registered_keys`, `provider_key_limits`, `account_key_limits` tables |
| **009**   | `requested_model` na column sa `call_logs`                            |
| **010**   | `model_combo_mappings` table para sa bawat modelong combo routing     | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Nagbabagong pagbabago:**Wala. Ang lahat ng umiiral na configuration, combo, at API key ay pinapanatili.
> Ang mga paglilipat ng database 008-010 ay awtomatikong tumatakbo sa startup.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL remediation**— Inayos ang 10+ alerto:

- 6 polynomial-redos sa `provider.ts` / `chatCore.ts` (pinalitan `(?:^|/)` alternation pattern na may segment-based na pagtutugma)
- 1 insecure-randomness sa `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection sa `prepublish.mjs` (`JSON.stringify()` path escaping) -**Route validation**— Idinagdag ang Zod schemas + `validateBody()` sa 5 rutang nawawalang validation:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- Ang CI `check:route-validation:t06` ay pumasa na ngayon:**176/176 na ruta ang napatunayan**### 🐛 Bug Fixes

-**#585**— Ang mga panloob na tag ng `<omniModel>` ay hindi na tumutulo sa mga kliyente sa mga tugon ng SSE. Nagdagdag ng outbound sanitization na `TransformStream` sa `combo.ts`### ⚙️ Infrastructure

-**Docker**— Na-upgrade ang `docker/setup-buildx-action` mula sa v3 → v4 (Node.js 20 deprecation fix) -**CI cleanup**— Tinanggal ang 150+ na nabigo/nakansela ang daloy ng trabaho### 🧪 Tests

- Test suite:**926 na pagsubok, 0 pagkabigo**(+3 bago)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Tumaas na mga limitasyon sa transkripsyon ng media
- Nagdagdag ng Haba ng Konteksto ng Modelo sa metadata ng registry
- Nagdagdag ng bawat-modelo upstream custom na mga header sa pamamagitan ng configuration UI
- Inayos ang maraming mga bug, pagpapatunay ng Zod para sa mga patch, at nalutas ang iba't ibang mga isyu sa komunidad.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Bawat modelong Combo Routing: mapa ang mga pattern ng pangalan ng modelo (glob) sa mga partikular na combo para sa awtomatikong pagruruta

- Bagong talahanayan ng `model_combo_mappings` (migration 010) na may pattern, combo_id, priority, naka-enable
- `resolveComboForModel()` DB function na may glob-to-regex na pagtutugma (case-insensitive, `*` at `?` wildcard)
- `getComboForModel()` sa `model.ts`: dinadagdagan ang `getCombo()` na may model-pattern fallback
- `chat.ts`: sinusuri na ngayon ng desisyon sa pagruruta ang mga modelong combo mapping bago ang paghawak ng solong modelo
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: Idinagdag ang seksyong "Mga Panuntunan sa Pagruruta ng Modelo" sa page ng Combos na may inline na idagdag/i-edit/i-toggle/tanggalin
- Mga halimbawa: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Full i18n Sync**: 2,788 nawawalang key ang idinagdag sa 30 file ng wika — lahat ng mga wika ay nasa 100% na pagkakapare-pareho sa `en.json` -**Pahina ng mga ahente i18n**: Ang seksyon ng OpenCode Integration ay ganap na na-internationalize (pamagat, paglalarawan, pag-scan, pag-download ng mga label) -**6 na bagong key**ang idinagdag sa namespace ng `agents` para sa seksyong OpenCode### 🎨 UI/UX

-**Mga Icon ng Provider**: Naidagdag ang 16 na nawawalang icon ng provider (3 nakopya, 2 na-download, 11 SVG ang ginawa) -**SVG fallback**: na-update ang bahagi ng `ProviderIcon` gamit ang 4-tier na diskarte: Lobehub → PNG → SVG → Generic na icon -**Fingerprinting ng mga ahente**: Naka-sync sa mga tool ng CLI — idinagdag ang droid, openclaw, copilot, opencode sa listahan ng fingerprint (14 sa kabuuan)### Seguridad

-**CVE fix**: Nalutas ang dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) sa pamamagitan ng npm overrides na pinipilit ang `dompurify@^3.3.2`

- Nag-uulat na ngayon ang `npm audit`**0 kahinaan**### 🧪 Tests

- Test suite:**923 pagsubok, 0 pagkabigo**(+15 bagong modelo-combo mapping test)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | May-akda | Buod                                                                                                                 |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): MCP session management, Claude passthrough normalization, OAuth modal, detectFormat                         |
| **#561** | @zen0bit | fix(i18n): Mga pagwawasto sa pagsasalin ng Czech — Mga pangalan ng pamamaraan ng HTTP at mga update sa dokumentasyon | ### 🧪 Tests |

- Test suite:**908 pagsubok, 0 pagkabigo**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**lutasin ang totoong API key mula sa `keyId` sa mga ruta ng mga setting ng CLI (`codex-settings`, `droid-settings`, `kilo-settings`) upang maiwasan ang pagsusulat ng mga naka-mask na string (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | May-akda | Buod                                                                                                                                                                                             |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` na nagbabalik ng `unknown` sa Windows — gamitin ang `JSON.parse(readFileSync)` sa halip na ESM import                                                                      |
| **#555** | @k0valik | fix(sse): sentralisadong `resolveDataDir()` para sa resolution ng path sa mga kredensyal, autoCombo, responses logger, at request logger                                                         |
| **#544** | @k0valik | fix(cli): secure na CLI tool detection sa pamamagitan ng mga kilalang installation path (8 tools) na may symlink validation, file-type checks, size bounds, minimal env in healthcheck           |
| **#542** | @rdself  | fix(ui): pagbutihin ang light mode contrast — magdagdag ng mga nawawalang variable ng tema ng CSS (`bg-primary`, `bg-subtle`, `text-primary`) at ayusin ang dark-only na kulay sa detalye ng log | ### 🔧 Bug Fixes |

-**TDZ fix sa `cliRuntime.ts`**— `validateEnvPath` ay ginamit bago ang pagsisimula sa module startup ng `getExpectedParentPaths()`. Inayos muli ang mga deklarasyon upang ayusin ang `ReferenceError`. -**Mga Build fixes**— Idinagdag ang `pino` at `pino-pretty` sa `serverExternalPackages` para maiwasan ang Turbopack na masira ang internal worker loading ni Pino.### 🧪 Tests

- Test suite:**905 pagsubok, 0 pagkabigo**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron build regression: ibinaba ang Next.js mula sa `16.1.x` hanggang `16.0.10` upang alisin ang Turbopack module-hashing instability na nagdulot ng mga blangkong screen sa Electron desktop bundle. -**Unit test fixes**— Nagwasto ng dalawang stale test assertion (`nanobanana-image-handler` aspect ratio/resolution, `thinking-budget` Gemini `thinkingConfig` field mapping) na naanod pagkatapos ng mga kamakailang pagbabago sa pagpapatupad. -**#541**— Tumugon sa feedback ng user tungkol sa pagiging kumplikado ng pag-install; walang kinakailangang pagbabago sa code.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: ipinatupad gamit ang library ng `jose` para pangasiwaan ang auth ng JWT/Service Account, kasama ang mga nako-configure na rehiyon sa UI at awtomatikong pagbuo ng URL ng modelo ng partner. -**T42**— Pagmapa ng aspect ratio ng pagbuo ng imahe: nilikha ang logic ng `sizeMapper` para sa mga generic na format ng OpenAI (`size`), idinagdag ang katutubong paghawak ng `imagen3`, at na-update ang mga endpoint ng NanoBanana upang awtomatikong magamit ang mga nakamapang aspect ratio. -**T38**— Mga sentralisadong detalye ng modelo: `modelSpecs.ts` na ginawa para sa mga limitasyon at parameter sa bawat modelo.### 🔧 Improvements

-**T40**— OpenCode CLI tools integration: native `opencode-zen` at `opencode-go` integration na natapos sa naunang PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown wait fix + `406` mapping: nakamapang `406 Not Acceptable` sa `503 Service Unavailable` na may wastong cooldown interval. -**T25**— Fallback ng validation ng provider: magandang fallback sa mga karaniwang modelo ng validation kapag walang partikular na `validationModelId`. -**T36**— Pagpipino sa pangangasiwa ng provider ng `403` vs `429`: na-extract sa `errorClassifier.ts` upang maayos na ihiwalay ang mga pagkabigo sa mga hard permission (`403`) mula sa mga limitasyon sa rate (`429`). -**T39**— Endpoint Fallback para sa `fetchAvailableModels`: nagpatupad ng tri-tier na mekanismo (`/models` -> `/v1/models` -> local generic catalog) + `list_models_catalog` MCP tool update upang ipakita ang `source` at `babala`. -**T33**— Antas ng pag-iisip sa conversion ng badyet: isinasalin ang mga antas ng pag-iisip ng husay sa mga tumpak na paglalaan ng badyet. -**T41**— Awtomatikong pag-redirect ng gawain sa background: mga ruta ng mabibigat na gawain sa pagsusuri sa background sa awtomatikong flash/mahusay na mga modelo. -**T23**— Intelligent quota reset fallback: tumpak na kinukuha ang mga value ng header ng `x-ratelimit-reset` / `retry-after` o nagmamapa ng mga static na cooldown.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Mag-upgrade mula sa v2.9.5:**16 na isyu ang naresolba · 2 community PR ang pinagsama-sama · 2 bagong provider · 7 bagong API endpoints · 3 bagong feature · DB migration 008+009 · 832 pagsubok na pumasa · 15 sub2api gap improvements (T01–T15 complete).### 🆕 New Providers

| Provider         | Alyas          | Tier      | Mga Tala                                                                        |
| ---------------- | -------------- | --------- | ------------------------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Libre     | 3 modelo sa pamamagitan ng `opencode.ai/zen/v1` (PR #530 ni @kang-heewon)       |
| **OpenCode Go**  | `opencode-go`  | Binayaran | 4 na modelo sa pamamagitan ng `opencode.ai/zen/go/v1` (PR #530 ni @kang-heewon) |

Ginagamit ng parehong provider ang bagong `OpencodeExecutor` na may multi-format na pagruruta (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Awtomatikong bumuo at mag-isyu ng mga OmniRoute API key gamit ang bawat provider at pagpapatupad ng quota sa bawat account.

| Endpoint                              | Paraan    | Paglalarawan                                                   |
| ------------------------------------- | --------- | -------------------------------------------------------------- |
| `/api/v1/registered-keys`             | `POST`    | Mag-isyu ng bagong key — ibinalik ang raw key**minsan lamang** |
| `/api/v1/registered-keys`             | `KUMUHA`  | Ilista ang mga nakarehistrong key (masked)                     |
| `/api/v1/registered-keys/{id}`        | `KUMUHA`  | Kumuha ng pangunahing metadata                                 |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | Bawiin ang isang susi                                          |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Bawiin (para sa mga kliyenteng walang DELETE na suporta)       |
| `/api/v1/quota/check`                 | `KUMUHA`  | Paunang i-validate ang quota bago magbigay ng                  |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | I-configure ang mga limitasyon sa pagbibigay ng bawat provider |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | I-configure ang mga limitasyon sa pagbibigay ng bawat account  |
| `/api/v1/issues/ulat`                 | `POST`    | Mag-ulat ng mga kaganapan sa quota sa Mga Isyu sa GitHub       |

**DB — Migration 008:**Tatlong bagong talahanayan: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Seguridad:**Ang mga susi ay nakaimbak bilang SHA-256 na mga hash. Raw key na ipinakita nang isang beses sa paggawa, hindi na mababawi muli.
**Mga uri ng quota:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` bawat provider at bawat account.
**Idempotency:**Pinipigilan ng field na `idempotency_key` ang duplicate na pagpapalabas. Ibinabalik ang `409 IDEMPOTENCY_CONFLICT` kung ginamit na ang key.
**Badyet bawat key:**`dailyBudget` / `hourlyBudget` — nililimitahan kung gaano karaming mga kahilingan ang maaaring iruta ng isang key sa bawat window.
**Pag-uulat sa GitHub:**Opsyonal. Itakda ang `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` upang awtomatikong gumawa ng mga isyu sa GitHub sa nalampasan na quota o mga pagkabigo sa pag-isyu.#### 🎨 Provider Icons — @lobehub/icons (#529)

Gumagamit na ngayon ang lahat ng icon ng provider sa dashboard ng `@lobehub/icons` React component (130+ provider na may SVG).
Fallback chain:**Lobehub SVG → umiiral na `/providers/{id}.png` → generic na icon**. Gumagamit ng tamang React `ErrorBoundary` pattern.#### 🔄 Model Auto-Sync Scheduler (#488)

Awtomatikong nire-refresh ng OmniRoute ang mga listahan ng modelo para sa mga konektadong provider tuwing**24 na oras**.

- Tumatakbo sa pagsisimula ng server sa pamamagitan ng umiiral na `/api/sync/initialize` hook
- Nako-configure sa pamamagitan ng `MODEL_SYNC_INTERVAL_HOURS` na environment variable
- Sumasaklaw sa 16 pangunahing provider
- Itinatala ang huling oras ng pag-sync sa database ng mga setting---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**I-clear ang naaaksyunan na error kapag nawawala ang `GEMINI_OAUTH_CLIENT_SECRET` sa mga deployment ng Docker/self-hosted. Nauna nang nagpakita ng misteryosong `client_secret is missing` mula sa Google. Ngayon ay nagbibigay ng partikular na `docker-compose.yml` at `~/.omniroute/.env` na mga tagubilin.#### Providers & Routing

-**#536 — LongCat AI:**Inayos ang `baseUrl` (`api.longcat.chat/openai`) at `authHeader` (`Authorization: Bearer`). -**#535 — Pinned model override:**Ang `body.model` ay tama na ngayong nakatakda sa `pinnedModel` kapag ang proteksyon ng context-cache ay aktibo. -**#532 — OpenCode Go key validation:**Ginagamit na ngayon ang `zen/v1` test endpoint (`testKeyBaseUrl`) — gumagana ang parehong key para sa parehong tier.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**Ang mga bloke ng `tool_result` ay kino-convert na ngayon sa teksto sa halip na i-drop, na humihinto sa mga walang katapusang tool-result na loop. -**#524 — OpenCode config save:**Added `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME aware, writes TOML). -**#521 — Natigil ang pag-login:**Hindi na nag-freeze ang pag-login pagkatapos laktawan ang pag-setup ng password — nagre-redirect nang tama sa onboarding. -**#522 — API Manager:**Inalis ang mapanlinlang na button na "Kopyahin ang masked key" (pinalitan ng tooltip ng icon ng lock). -**#532 — OpenCode Go config:**Ang handler ng mga setting ng gabay ay pinangangasiwaan na ngayon ang `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Ang nawawalang `googleProjectId` ay nagbabalik ng structured 422 error na may gabay sa muling pagkonekta sa halip na isang misteryosong pag-crash. -**#510 — Mga Windows path:**MSYS2/Git-Bash paths (`/c/Program Files/...`) ay awtomatikong na-normalize na ngayon sa `C:\Program Files\...`. -**#492 — CLI startup:**Nakikita na ngayon ng `omniroute` CLI ang `mise`/`nvm`-managed Node kapag nawawala ang `app/server.js` at nagpapakita ng mga naka-target na tagubilin sa pag-aayos.---

### 📖 Documentation Updates

-**#513**— Pag-reset ng password ng Docker: `INITIAL_PASSWORD` env var workaround na dokumentado -**#520**— pnpm: dokumentado ang hakbang na `pnpm approve-builds better-sqlite3`---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#535`---

### 🔀 Community PRs Merged

| PR       | May-akda     | Buod                                                                                     |
| -------- | ------------ | ---------------------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Mga provider ng OpenCode Zen + Go na may `OpencodeExecutor` at mga pinahusay na pagsubok | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` sa `providers.ts`. Ang kasalukuyang column na `rate_limited_until` ay nakalantad na ngayon bilang isang nakalaang API — HINDI dapat hawakan ng OAuth token refresh ang field na ito upang maiwasan ang mga loop sa limitasyon ng rate. -**T08**— Bawat-API-key na limitasyon ng session: `max_sessions INTEGER DEFAULT 0` idinagdag sa `api_keys` sa pamamagitan ng auto-migration. Nakuha ng `sessionManager.ts` ang `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, at `getActiveSessionCountForKey()`. Maaaring ipatupad ng mga tumatawag sa `chatCore.js` ang limitasyon at pagbabawas sa `req.close`. -**T09**— Mga saklaw ng limitasyon sa rate ng Codex vs Spark: `getCodexModelScope()` at `getCodexRateLimitKey()` sa `codex.ts`. Ang mga karaniwang modelo (`gpt-5.x-codex`, `codex-mini`) ay nakakakuha ng saklaw `"codex"`; ang mga modelo ng spark (`codex-spark*`) ay nakakakuha ng saklaw `"spark"`. Ang mga key na limitasyon sa rate ay dapat na `${accountId}:${scope}` kaya ang pagkapagod ng isang pool ay hindi nakaharang sa isa pa. -**T13**— Stale quota display fix: Ang `getEffectiveQuotaUsage(used, resetAt)` ay nagbabalik ng `0` kapag lumipas na ang reset window; Ang `formatResetCountdown(resetAt)` ay nagbabalik ng countdown string na nababasa ng tao (hal. `"2h 35m"`). Parehong na-export mula sa `providers.ts` + `localDb.ts` para sa pagkonsumo ng dashboard. -**T14**— Proxy fast-fail: bagong `src/lib/proxyHealth.ts` na may `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP check, ≤2s sa halip na 30s timeout), `getCachedProxyHealth()`, `Healthvalidate()` `getAllProxyHealthStatuses()`. Mga resultang naka-cache ng 30s bilang default; nako-configure sa pamamagitan ng `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Test suite:**832 pagsubok, 0 pagkabigo**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— column na `requested_model` sa `call_logs` (migration 009): subaybayan kung aling modelo ang orihinal na hiniling ng kliyente kumpara sa aktwal na naka-ruta na modelo. Pinapagana ang fallback rate analytics. -**T02**— I-strip ang mga walang laman na text block mula sa nested `tool_result.content`: pinipigilan ang Anthropic 400 errors (`dapat walang laman ang mga text content block`) kapag ang Claude Code ay nagcha-chain ng mga resulta ng tool. -**T03**— I-parse ang `x-codex-5h-*` / `x-codex-7d-*` na mga header: `parseCodexQuotaHeaders()` + `getCodexResetTime()` i-extract ang mga window ng Codex quota para sa tumpak na pag-iiskedyul ng cooldown sa halip na generic na 5-min na fallback. -**T04**— header ng `X-Session-Id` para sa external na sticky routing: `extractExternalSessionId()` sa `sessionManager.ts` ay nagbabasa ng `x-session-id` / `x-omniroute-session` na mga header na may prefix na `ext:` para maiwasan ang banggaan sa mga internal na session na SHA-256. Nginx-compatible (hyphenated header). -**T06**— Na-deactivate ang account → permanenteng block: Ang `isAccountDeactivated()` sa `accountFallback.ts` ay nakakakita ng 401 signal ng pag-deactivate at naglalapat ng 1-taong cooldown upang maiwasan ang muling pagsubok sa mga permanenteng patay na account. -**T07**— X-Forwarded-For IP validation: bagong `src/lib/ipUtils.ts` na may `extractClientIp()` at `getClientIpFromRequest()` — nilalaktawan ang `unknown`/non-IP na mga entry sa `X-Forwarded-For` na mga chain (Nginx/proxy-forwarded request). -**T10**— Naubos na ang mga kredito → natatanging fallback: Ang `isCreditsExhausted()` sa `accountFallback.ts` ay nagbabalik ng 1h cooldown na may flag na `creditsExhausted`, na naiiba sa generic na 429 na paglilimita sa rate. -**T11**— `max` na pagsisikap sa pangangatwiran → 131072 token ng badyet: `EFFORT_BUDGETS` at `THINKING_LEVEL_MAP` na-update; nagbabalik na ngayon ang reverse mapping ng `"max"` para sa mga full-budget na tugon. Na-update ang unit test. -**T12**— Idinagdag ang mga entry sa pagpepresyo ng MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` na idinagdag sa talahanayan ng pagpepresyo (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi pricing already existed. -**T15**— Pag-normalize ng nilalaman ng array: tama na kino-collapse ng `normalizeContentToString()` helper sa `openai-to-claude.ts` ang array-formatted system/tool ​​na mensahe sa string bago ipadala sa Anthropic.### 🧪 Tests

- Test suite:**832 pagsubok, 0 pagkabigo**(hindi nabago mula sa rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: auto-issue API keys na may per-provider at per-account na pagpapatupad ng quota

- `POST /api/v1/registered-keys` — mag-isyu ng mga key na may suporta sa idempotency
- `GET /api/v1/registered-keys` — listahan (masked) rehistradong key
- `GET /api/v1/registered-keys/{id}` — kumuha ng key metadata
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — bawiin ang mga key
- `GET /api/v1/quotas/check` — pre-validate bago ibigay
- `PUT /api/v1/providers/{id}/limits` — magtakda ng mga limitasyon sa pag-isyu ng provider
- `PUT /api/v1/accounts/{id}/limits` — magtakda ng mga limitasyon sa pagpapalabas ng account
- `POST /api/v1/issues/report` — opsyonal na pag-uulat ng isyu sa GitHub
- DB migration 008: `registered_keys`, `provider_key_limits`, `account_key_limits` tables---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Idinagdag ang OpenCode Zen at OpenCode Go providers (ni @kang-heewon)

- Bagong `OpencodeExecutor` na may multi-format na pagruruta (`/chat/completions`, `/messages`, `/responses`)
- 7 mga modelo sa magkabilang tier---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Gumagamit na ngayon ang mga icon ng provider ng [@lobehub/icons](https://github.com/lobehub/lobe-icons) na may magandang PNG fallback at isang bahagi ng `ProviderIcon` (130+ provider ang sinusuportahan) -**#488**— Ang awtomatikong pag-update ng modelo ay naglilista bawat 24h sa pamamagitan ng `modelSyncScheduler` (nako-configure sa pamamagitan ng `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: nagpapakita na ngayon ng malinaw na naaaksyong error kapag nawawala ang `GEMINI_OAUTH_CLIENT_SECRET` sa Docker/self-hosted deployment---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI key validation: fixed baseUrl (`api.longcat.chat/openai`) at authHeader (`Authorization: Bearer`) -**#535**— Pinned model override: Ang `body.model` ay nakatakda na ngayon sa `pinnedModel` kapag natukoy ng proteksyon ng context-cache ang isang naka-pin na modelo -**#524**— Na-save na ngayon nang tama ang OpenCode config: idinagdag ang handler ng `saveOpenCodeConfig()` (alam ng XDG_CONFIG_HOME, sumulat ng TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Hindi na natigil ang pag-log in pagkatapos laktawan ang pag-setup ng password (nagre-redirect sa onboarding) -**#522**— API Manager: Inalis ang mapanlinlang na button na "Kopyahin ang masked key" (pinalitan ng tooltip ng icon ng lock) -**#527**— Claude Code + Codex superpowers loop: Ang mga bloke ng `tool_result` ay na-convert na ngayon sa text sa halip na na-drop -**#532**— Ginagamit na ngayon ng OpenCode GO API key validation ang tamang `zen/v1` endpoint (`testKeyBaseUrl`) -**#489**— Antigravity: ang nawawalang `googleProjectId` ay nagbabalik ng structured 422 error na may gabay sa muling pagkonekta -**#510**— Windows: MSYS2/Git-Bash paths (`/c/Program Files/...`) ay na-normalize na ngayon sa `C:\Program Files\...` -**#492**— Nakikita na ngayon ng `omniroute` CLI ang `mise`/`nvm` kapag nawawala ang `app/server.js` at nagpapakita ng naka-target na pag-aayos### Dokumentasyon

-**#513**— Pag-reset ng password ng Docker: `INITIAL_PASSWORD` env var workaround na dokumentado -**#520**— pnpm: dokumentado ang `pnpm approve-builds better-sqlite3### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Mga bagong OpenCode provider, pag-aayos ng mga kredensyal sa pag-embed, pag-aayos ng CLI masked key, pag-aayos ng CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Ang mga tool ng CLI ay nagse-save ng naka-mask na API key sa mga config file**— Ang `claude-settings`, `cline-settings`, at `openclaw-settings` ay tumatanggap na ng POST na mga ruta ng `keyId` param at lutasin ang tunay na API key mula sa DB bago isulat sa disk. Na-update ang `ClaudeToolCard` upang magpadala ng `keyId` sa halip na ang naka-mask na string ng display. Inaayos ang #523, #526. -**Custom embedding providers: `No credentials` error**— Sinusubaybayan na ngayon ng `/v1/embeddings` ang `credentialsProviderId` nang hiwalay mula sa routing prefix, kaya ang mga kredensyal ay kinukuha mula sa tumutugmang provider node ID kaysa sa pampublikong prefix string. Nag-aayos ng regression kung saan palaging mabibigo ang `google/gemini-embedding-001` at mga katulad na modelo ng custom-provider na may error sa mga kredensyal. Mga pag-aayos na nauugnay sa #532. (PR #528 ni @jacob2826) -**Nawawala ang regex ng proteksyon ng cache ng konteksto `
` prefix**— `CACHE_TAG_PATTERN` sa `comboAgentMiddleware.ts` na-update upang tumugma sa parehong literal `
` (backslash-n) at aktwal na bagong linyang U+000A na ini-inject ng streaming ng `combo.ts` sa paligid ng tag na `<omniModel>` pagkatapos ayusin ang #515. Pag-aayos #531.### ✨ New Providers

-**OpenCode Zen**— Libreng tier gateway sa `opencode.ai/zen/v1` na may 3 modelo: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Serbisyo ng subscription sa `opencode.ai/zen/go/v1` na may 4 na modelo: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude format), `minimax-m2.5` (Claude format)

- Ang parehong provider ay gumagamit ng bagong `OpencodeExecutor` na dynamic na ruta sa `/chat/completions`, `/messages`, `/responses`, o `/models/{model}:generateContent` batay sa hiniling na modelo. (PR #530 ni @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Mga pag-aayos ng bug — panatilihin ang codex prompt cache key, ayusin ang tagContent JSON escaping, i-sync ang expired na token status sa DB.### 🐛 Bug Fixes

-**fix(translator)**: Panatilihin ang `prompt_cache_key` sa Responses API → Pagsasalin ng Mga Pagkumpleto ng Chat (#517)
— Ang field ay isang cache-affinity signal na ginagamit ng Codex; ang pagtanggal nito ay pumipigil sa mga prompt na hit sa cache.
Naayos sa `openai-responses.ts` at `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` sa `tagContent` kaya ang injected na JSON string ay wasto (#515)
— Hindi pinapayagan ang mga literal na bagong linya ng template (U+000A) na hindi nakatakas sa loob ng mga value ng string ng JSON.
Pinalitan ng `\n` literal na sequence sa `open-sse/services/combo.ts`.

-**fix(usage)**: I-sync ang expired na token status pabalik sa DB sa live auth failure (#491)
— Kapag ang Limits & Quotas live check ay bumalik sa 401/403, ang koneksyon na `testStatus` ay ina-update na ngayon
sa `"expired"` sa database upang ang pahina ng Provider ay sumasalamin sa parehong degradong estado.
Inayos sa `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Magdagdag ng 5 bagong libreng AI provider — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Magdagdag ng LongCat AI (`lc/`) — 50M token/araw na libre (Flash-Lite) + 500K/day (Chat/Thinking) sa panahon ng pampublikong beta. OpenAI-compatible, karaniwang Bearer auth. -**feat(providers/pollinations)**: Magdagdag ng Pollinations AI (`pol/`) — walang API key na kailangan. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s libre). Ang custom na tagapagpatupad ay humahawak ng opsyonal na pagpapatotoo. -**feat(providers/cloudflare-ai)**: Magdagdag ng Cloudflare Workers AI (`cf/`) — 10K Neurons/araw na libre (~150 LLM na tugon o 500s Whisper audio). 50+ na modelo sa global edge. Bumubuo ang custom executor ng dynamic na URL na may `accountId` mula sa mga kredensyal. -**feat(providers/scaleway)**: Magdagdag ng Scaleway Generative APIs (`scw/`) — 1M libreng token para sa mga bagong account. Sumusunod sa EU/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Magdagdag ng AI/ML API (`aiml/`) — $0.025/araw na libreng credit, 200+ na modelo (GPT-4o, Claude, Gemini, Llama) sa pamamagitan ng iisang aggregator endpoint.### 🔄 Provider Updates

-**feat(providers/together)**: Magdagdag ng `hasFree: true` + 3 permanenteng libreng model ID: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Magdagdag ng `hasFree: true` + `freeNote` (1,500 req/day, walang credit card na kailangan, aistudio.google.com) -**chore(providers/gemini)**: Palitan ang pangalan ng display name sa `Gemini (Google AI Studio)` para sa kalinawan### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Bagong `PollinationsExecutor` — inaalis ang header ng `Authorization` kapag walang ibinigay na API key -**feat(executors/cloudflare-ai)**: Bagong `CloudflareAIExecutor` — ang dynamic na paggawa ng URL ay nangangailangan ng `accountId` sa mga kredensyal ng provider -**feat(executors)**: Magrehistro ng `pollinations`, `pol`, `cloudflare-ai`, `cf` executor mappings### Dokumentasyon

-**docs(readme)**: Pinalawak na libreng combo stack sa 11 provider ($0 magpakailanman) -**docs(readme)**: Nagdagdag ng 4 na bagong libreng seksyon ng provider (LongCat, Pollinations, Cloudflare AI, Scaleway) na may mga modelong talahanayan -**docs(readme)**: Na-update na talahanayan ng pagpepresyo na may 4 na bagong libreng tier row -**docs(i18n/pt-BR)**: Na-update na talahanayan ng pagpepresyo + idinagdag ang mga seksyon ng LongCat/Pollinations/Cloudflare AI/Scaleway sa Portuguese -**docs(new-features/ai)**: 10 task spec file + master implementation plan sa `docs/new-features/ai/`### 🧪 Tests

- Test suite:**821 pagsubok, 0 pagkabigo**(hindi nabago)---

## [2.9.2] — 2026-03-21

> Sprint: Ayusin ang media transcription (Deepgram/HuggingFace Content-Type, language detection) at TTS error display.### 🐛 Bug Fixes

-**fix(transcription)**: Ang Deepgram at HuggingFace na audio transcription ay tama na ngayong nagmamapa ng `video/mp4` → `audio/mp4` at iba pang uri ng MIME ng media sa pamamagitan ng bagong katulong na `resolveAudioContentType()`. Dati, ang pag-upload ng mga `.mp4` na file ay pare-parehong nagbalik ng "Walang natukoy na pagsasalita" dahil nakakatanggap ang Deepgram ng `Uri ng Nilalaman: video/mp4`. -**fix(transcription)**: Idinagdag ang `detect_language=true` sa mga kahilingan sa Deepgram — awtomatikong nagde-detect ng audio language (Portuguese, Spanish, atbp.) sa halip na mag-default sa English. Inaayos ang mga transkripsyon na hindi Ingles na nagbabalik ng mga resultang walang laman o basura. -**fix(transcription)**: Idinagdag ang `punctuate=true` sa mga kahilingan ng Deepgram para sa mas mataas na kalidad na transcription output na may tamang bantas. -**fix(tts)**: `[object Object]` error display sa Text-to-Speech na mga tugon na naayos sa parehong `audioSpeech.ts` at `audioTranscription.ts`. Ang function na `upstreamErrorResponse()` ay tama na ngayong nag-extract ng mga nested string na mensahe mula sa mga provider tulad ng ElevenLabs na nagbabalik ng `{ error: { message: "...", status_code: 401 } }` sa halip na isang flat error string.### 🧪 Tests

- Test suite:**821 pagsubok, 0 pagkabigo**(hindi nabago)### Triaged Issues

-**#508**— Regression ng format ng tawag sa tool: humiling ng mga proxy log at impormasyon ng chain ng provider (`needs-info`) -**#510**— Windows CLI healthcheck path: hiniling na impormasyon ng bersyon ng shell/Node (`needs-info`) -**#485**— Mga tawag sa tool ng Kiro MCP: sarado bilang panlabas na isyu ng Kiro (hindi OmniRoute) -**#442**— Baseten /models endpoint: sarado (nakadokumento na manual workaround) -**#464**— Key provisioning API: kinikilala bilang item sa roadmap---

## [2.9.1] — 2026-03-21

> Sprint: Ayusin ang pagkawala ng data ng SSE omniModel, merge per-protocol model compatibility.### Bug Fixes

-**#511**— Kritikal: Ipinadala ang tag na `<omniModel>` pagkatapos ng `finish_reason:stop` sa mga stream ng SSE, na nagdudulot ng pagkawala ng data. Ini-inject na ngayon ang tag sa unang bahagi ng content na hindi walang laman, na ginagarantiyahan ang paghahatid bago isara ng mga SDK ang koneksyon.### Merged PRs

-**PR #512**(@zhangqiang8vip): Per-protocol model compatibility — `normalizeToolCallId` at `preserveOpenAIDeveloperRole` ay maaari na ngayong i-configure sa bawat client protocol (OpenAI, Claude, Responses API). Bagong field na `compatByProtocol` sa model config na may Zod validation.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: humiling ng PATH/bersyon na impormasyon -**#509**— Turbopack Electron regression: upstream Next.js bug, mga dokumentadong workaround -**#508**— macOS black screen: iminungkahing `--disable-gpu` workaround---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate na mga limitasyon, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, at 8 na isyu sarado.### ✨ New Features

-**feat(search)**: Search Analytics tab sa `/dashboard/analytics` — breakdown ng provider, rate ng hit ng cache, pagsubaybay sa gastos. Bagong API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Idinagdag ang Alibaba Cloud DashScope na may custom na endpoint path validation — nako-configure ang `chatPath` at `modelsPath` bawat node (#feat/custom-endpoint-paths) -**feat(api)**: Per-API-key request-count na mga limitasyon — `max_requests_per_day` at `max_requests_per_minute` na mga column na may in-memory na sliding-window na pagpapatupad na nagbabalik ng HTTP 429 (#452) -**feat(dev)**: ZWS v5 — HMR leak fix (485 DB connections → 1), memory 2.4GB → 195MB, `globalThis` singletons, Edge Runtime warning fix (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` rewritten with try/catch waterfall (Windows REG.exe → macOS ioreg → Linux file read → hostname → `os.hostname()`). Inaalis ang `process.platform` na sumasanga na ang Next.js bundler na dead-code-eliminated, ang pag-aayos ng `'head' ay hindi kinikilala` sa Windows. Inaayos din ang #466. -**fix(#493)**: Custom na pagpapangalan ng modelo ng provider — inalis ang maling prefix stripping sa `DefaultExecutor.transformRequest()` na nasira ang mga org-scoped model ID tulad ng `zai-org/GLM-5-FP8`. -**fix(#490)**: Pag-stream + proteksyon ng cache ng konteksto — Hinaharang ng `TransformStream` ang SSE upang mag-inject ng tag na `<omniModel>` bago ang `[DONE]` marker, na pinapagana ang proteksyon ng cache ng konteksto para sa mga tugon sa streaming. -**fix(#458)**: Combo schema validation — Ang mga field na `system_message`, `tool_filter_regex`, `context_cache_protection` ay pumasa sa Zod validation sa pag-save. -**fix(#487)**: KIRO MITM card cleanup — inalis ang ZWS_README, nabuo ang `AntigravityToolCard` para gumamit ng dynamic na tool metadata.### 🧪 Tests

- Nagdagdag ng Anthropic-format tools filter unit tests (PR #397) — 8 regression test para sa `tool.name` na walang `.function` wrapper
- Test suite:**821 pagsubok, 0 pagkabigo**(mula sa 813)### 📋 Issues Closed (8)

-**#506**— Hindi nakilala ang `head` ng Windows machineId (naayos) -**#493**— Custom na pagpapangalan ng modelo ng provider (naayos) -**#490**— Streaming context cache (naayos) -**#452**— Per-API-key na mga limitasyon sa kahilingan (ipinatupad) -**#466**— Nabigo ang pag-login sa Windows (parehong ugat ng #506) -**#504**— Hindi aktibo ang MITM (inaasahang gawi) -**#462**— Gemini CLI PSA (nalutas na) -**#434**— Electron app crash (duplicate ng #402)## [2.8.9] — 2026-03-20

> Sprint: Pagsamahin ang mga PR ng komunidad, ayusin ang KIRO MITM card, mga update sa dependency.### Merged PRs

-**PR #498**(@Sajid11194): Ayusin ang pag-crash ng Windows machine ID (`undefined\REG.exe`). Pinapalitan ang `node-machine-id` ng mga native na OS registry query.**Isinasara ang #486.** -**PR #497**(@zhangqiang8vip): Ayusin ang dev-mode HMR resource leaks — 485 leaked DB connections → 1, memory 2.4GB → 195MB. Mga singleton na `globalThis`, pag-aayos ng babala sa Edge Runtime, katatagan ng pagsubok sa Windows. (+1168/-338 sa 22 file) -**PRs #499-503**(Dependabot): Mga update sa GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `action/4`, `docker/4`### Bug Fixes

-**#505**— Ipinapakita na ngayon ng KIRO MITM card ang mga tagubiling tukoy sa tool (`api.anthropic.com`) sa halip na text na tukoy sa Antigravity. -**#504**— Tumugon sa paglilinaw ng UX (Ang MITM "Inactive" ay inaasahang gawi kapag hindi tumatakbo ang proxy).---

## [2.8.8] — 2026-03-20

> Sprint: Ayusin ang OAuth batch test crash, idagdag ang "Test All" na button sa mga indibidwal na page ng provider.### Bug Fixes

-**OAuth batch test crash**(ERR_CONNECTION_REFUSED): Pinalitan ang sequential for-loop na may 5-concurrency concurrency limit + 30s bawat koneksyon timeout sa pamamagitan ng `Promise.race()` + `Promise.allSettled()`. Pinipigilan ang pag-crash ng server kapag sinusubukan ang malalaking grupo ng provider ng OAuth (~30+ na koneksyon).### Mga Tampok

-**Button na "Subukan Lahat" sa mga pahina ng provider**: Ang mga pahina ng indibidwal na provider (hal., `/providers/codex`) ay nagpapakita na ngayon ng button na "Subukan ang Lahat" sa header ng Mga Koneksyon kapag mayroong 2+ na koneksyon. Gumagamit ng `POST /api/providers/test-batch` na may `{mode: "provider", providerId}`. Mga resultang ipinapakita sa isang modal na may pass/fail summary at per-connection diagnosis.---

## [2.8.7] — 2026-03-20

> Sprint: Pagsamahin ang PR #495 (Bottleneck 429 drop), ayusin ang #496 (mga provider ng custom na pag-embed), triage feature.### Bug Fixes

-**Bottleneck 429 infinite wait**(PR #495 by @xandr0s): Sa 429, ang `limiter.stop({ dropWaitingJobs: true })` ay agad na nabigo ang lahat ng nakapila na kahilingan upang ang mga upstream na tumatawag ay makapag-trigger ng fallback. Ang Limiter ay tinanggal mula sa Map kaya ang susunod na kahilingan ay lumikha ng isang bagong instance. -**Hindi malulutas ang mga custom na modelo ng pag-embed**(#496): Niresolba na ngayon ng `POST /v1/embeddings` ang mga custom na modelo ng pag-embed mula sa LAHAT ng provider_nodes (hindi lang localhost). Pinapagana ang mga modelo tulad ng `google/gemini-embedding-001` na idinagdag sa pamamagitan ng dashboard.### Issues Responded

-**#452**— Per-API-key request-count na mga limitasyon (kinikilala, sa roadmap) -**#464**— Auto-issue API keys na may mga limitasyon sa provider/account (nangangailangan ng higit pang detalye) -**#488**— Awtomatikong i-update ang mga listahan ng modelo (kinikilala, sa roadmap) -**#496**— Custom na pag-embed ng resolution ng provider (naayos)---

## [2.8.6] — 2026-03-20

> Sprint: Pagsamahin ang PR #494 (MiniMax role fix), ayusin ang KIRO MITM dashboard, triage 8 na isyu.### Mga Tampok

-**MiniMax developer→system role fix**(PR #494 by @zhangqiang8vip): Per-modelo na `preserveDeveloperRole` toggle. Nagdaragdag ng "Compatibility" UI sa page ng mga provider. Inaayos ang 422 "role param error" para sa MiniMax at mga katulad na gateway. -**roleNormalizer**: Tumatanggap na ngayon ang `normalizeDeveloperRole()` ng parameter na `preserveDeveloperRole` na may tri-state na gawi (undefined=keep, true=keep, false=convert). -**DB**: Bagong `getModelPreserveOpenAIDeveloperRole()` at `mergeModelCompatOverride()` sa `models.ts`.### Bug Fixes

-**KIRO MITM dashboard**(#481/#487): Niruruta na ngayon ng `CLIToolsPageClient` ang anumang tool na `configType: "mitm"` sa `AntigravityToolCard` (MITM Start/Stop controls). Dati Antigravity lang ang naka-hardcode. -**AntigravityToolCard generic**: Gumagamit ng `tool.image`, `tool.description`, `tool.id` sa halip na mga hardcoded na Antigravity value. Mga bantay laban sa nawawalang `defaultModels`.### Cleanup

- Inalis ang `ZWS_README_V2.md` (mga development-only na doc mula sa PR #494).### Issues Triaged (8)

-**#487**— Sarado (Naayos ang KIRO MITM sa release na ito) -**#486**— pangangailangan-impormasyon (isyu sa Windows REG.exe PATH) -**#489**— needs-info (Nawawala ang Antigravity projectId, kailangan ng OAuth na muling kumonekta) -**#492**— needs-info (nawawalang app/server.js sa mise-managed Node) -**#490**— Kinikilala (pag-stream + pagharang sa cache ng konteksto, pinlano na ayusin) -**#491**— Kinikilala (Hindi pagkakapare-pareho ng estado ng auth ng Codex) -**#493**— Kinikilala (Modal provider model name prefix, workaround na ibinigay) -**#488**— Backlog ng kahilingan sa tampok (auto-update ang mga listahan ng modelo)---

## [2.8.5] — 2026-03-19

> Sprint: Ayusin ang mga zombie na SSE stream, context cache first-turn, KIRO MITM, at triage 5 na mga panlabas na isyu.### Bug Fixes

-**Zombie SSE Stream**(#473): Bawasan ang `STREAM_IDLE_TIMEOUT_MS` mula 300s → 120s para sa mas mabilis na combo fallback kapag nag-hang ang mga provider sa kalagitnaan ng stream. Nako-configure sa pamamagitan ng env var. -**Context Cache Tag**(#474): Ayusin ang `injectModelTag()` para pangasiwaan ang mga kahilingan sa unang pagkakataon (walang mga mensahe ng katulong) — gumagana na ngayon ang proteksyon ng cache ng konteksto mula sa pinakaunang tugon. -**KIRO MITM**(#481): Baguhin ang KIRO `configType` mula sa `guide` → `mitm` upang i-render ng dashboard ang MITM Start/Stop controls. -**E2E Test**(CI): Ayusin ang `providers-bailian-coding-plan.spec.ts` — i-dismiss ang dati nang modal overlay bago i-click ang Add API Key na button.### Closed Issues

- #473 — Zombie SSE stream bypass combo fallback
- #474 — Nawawala ang tag ng `<omniModel>` cache ng konteksto sa unang pagliko
- #481 — MITM para sa KIRO ay hindi naa-activate mula sa dashboard
- #468 — Gemini CLI remote server (pinapalitan ng #462 deprecation)
- #438 — Hindi makapagsulat si Claude ng mga file (external CLI issue)
- #439 — AppImage ay hindi gumagana (dokumentado libfuse2 workaround)
- #402 — "nasira" ang ARM64 DMG (nakadokumentong xattr -cr workaround)
- #460 — Hindi runnable ang CLI sa Windows (nakadokumentong PATH fix)---

## [2.8.4] — 2026-03-19

> Sprint: Paghinto ng Gemini CLI, VM guide i18n fix, dependabot security fix, pagpapalawak ng schema ng provider.### Mga Tampok

-**Paghinto ng Gemini CLI**(#462): Markahan ang provider ng `gemini-cli` bilang hindi na ginagamit nang may babala — Pinaghihigpitan ng Google ang paggamit ng third-party na OAuth mula Marso 2026 -**Skema ng Provider**(#462): Palawakin ang pagpapatunay ng Zod gamit ang `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint` opsyonal na field### Bug Fixes

-**VM Guide i18n**(#471): Idagdag ang `VM_DEPLOYMENT_GUIDE.md` sa pipeline ng pagsasalin ng i18n, i-regenerate ang lahat ng 30 lokal na pagsasalin mula sa English source (na-stuck sa Portuguese)### Seguridad

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — inaayos ang CWE-1321 prototype na polusyon (#484, @dependabot)### Closed Issues

- #472 — Regression ng Model Aliases (naayos sa v2.8.2)
- #471 — Nasira ang mga pagsasalin ng gabay ng VM
- #483 — Sinusundan ang `data: null` pagkatapos ng `[DONE]` (naayos sa v2.8.3)### Merged PRs

- #484 — deps: bump flatted mula 3.3.3 hanggang 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, SSE protocol fix, VM guide translation.### Mga Tampok

-**Wika ng Czech**(#482): Buong Czech (cs) i18n — 22 docs, 2606 UI string, mga update ng language switcher (@zen0bit) -**VM Deployment Guide**: Isinalin mula sa Portuges patungo sa Ingles bilang pinagmumulan ng dokumento (@zen0bit)### Bug Fixes

-**SSE Protocol**(#483): Ihinto ang pagpapadala ng trailing `data: null` pagkatapos ng `[DONE]` signal — inaayos ang `AI_TypeValidationError` sa mahigpit na AI SDK client (Zod-based validators)### Merged PRs

- #482 — Magdagdag ng wikang Czech + Ayusin ang VM_DEPLOYMENT_GUIDE.md English source (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 pinagsamang PR, pag-aayos ng pagruruta ng mga alias ng modelo, pag-export ng log, at triage ng isyu.### Mga Tampok

-**Log Export**: Bagong Export button sa `/dashboard/logs` na may dropdown na hanay ng oras (1h, 6h, 12h, 24h). Nagda-download ng JSON ng mga log ng kahilingan/proxy/tawag sa pamamagitan ng `/api/logs/export` API (#user-request)### Bug Fixes

-**Pagruruta ng Mga Alyas ng Modelo**(#472): Ang Mga Setting → Ang mga Alyase ng Modelo ay tama na ngayong nakakaapekto sa pagruruta ng provider, hindi lamang sa pagtukoy ng format. Ang dating `resolveModelAlias()` na output ay ginamit lamang para sa `getModelTargetFormat()` ngunit ang orihinal na model ID ay ipinadala sa provider -**Stream Flush Usage**(#480): Ang data ng paggamit mula sa huling SSE event sa buffer ay tama na ngayong na-extract sa panahon ng stream flush (pinagsama mula sa @prakersh)### Merged PRs

- #480 — I-extract ang paggamit mula sa natitirang buffer sa flush handler (@prakersh)
- #479 — Magdagdag ng nawawalang Codex 5.3/5.4 at mga entry sa pagpepresyo ng Anthropic model ID (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Limang community PR — streaming call log fixes, Kiro compatibility, cache token analytics, Chinese translation, at mga na-configure na tool call ID.### Mga Tampok

-**feat(logs)**: Ang nilalaman ng pagtugon sa log ng tawag ay tama na ngayong naipon mula sa mga hilaw na chunks ng provider (OpenAI/Claude/Gemini) bago isalin, inaayos ang mga walang laman na response payload sa streaming mode (#470, @zhangqiang8vip) -**feat(providers)**: Per-modelo na na-configure ang 9-char tool na pag-normalize ng call ID (Mistral-style) — ang mga modelo lang na may opsyon na pinagana ang makakakuha ng mga truncated ID (#470) -**feat(api)**: Pinalawak ang Key PATCH API upang suportahan ang mga field na `allowedConnections`, `name`, `autoResolve`, `isActive`, at `accessSchedule` (#470) -**feat(dashboard)**: Layout na unang tugon sa UI ng detalye ng log ng kahilingan (#470) -**feat(i18n)**: Pinahusay na pagsasalin ng Chinese (zh-CN) — kumpletong muling pagsasalin (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: I-strip ang injected na field ng `model` mula sa request body — Tinatanggihan ng Kiro API ang mga hindi kilalang top-level na field (#478, @prakersh) -**fix(usage)**: Isama ang cache read + cache creation token sa mga kabuuan ng input history ng paggamit para sa tumpak na analytics (#477, @prakersh) -**fix(callLogs)**: Suportahan ang mga field ng paggamit ng format ng Claude (`input_tokens`/`output_tokens`) kasama ng OpenAI format, isama ang lahat ng variant ng cache token (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Provider ng Bailian Coding Plan na may mga nae-edit na base URL, kasama ang mga kontribusyon ng komunidad para sa Alibaba Cloud at Kimi Coding.### Mga Tampok

-**feat(providers)**: Idinagdag ang Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio na may Anthropic-compatible na API. Static na catalog ng 8 modelo kabilang ang Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5, at Kimi K2.5. May kasamang custom na pagpapatunay ng auth (400=valid, 401/403=invalid) (#467, @Mind-Dragon) -**feat(admin)**: Nae-edit na default na URL sa Provider Admin na gumawa/mag-edit ng mga daloy — maaaring i-configure ng mga user ang mga custom na base URL sa bawat koneksyon. Nagpatuloy sa `providerSpecificData.baseUrl` na may Zod schema validation na tinatanggihan ang (mga) scheme na hindi http (#467)### 🧪 Tests

- Nagdagdag ng 30+ unit test at 2 e2e scenario para sa Bailian Coding Plan provider na sumasaklaw sa auth validation, schema hardening, route-level na gawi, at cross-layer integration---

## [2.7.10] — 2026-03-19

> Sprint: Dalawang bagong provider na iniambag ng komunidad (Alibaba Cloud Coding, Kimi Coding API-key) at Docker pino fix.### Mga Tampok

-**feat(providers)**: Nagdagdag ng suporta sa Alibaba Cloud Coding Plan na may dalawang OpenAI-compatible na endpoint — `alicode` (China) at `alicode-intl` (International), bawat isa ay may 8 modelo (#465, @dtk1985) -**feat(providers)**: Idinagdag ang nakalaang `kimi-coding-apikey` provider path — Ang API-key-based na Kimi Coding access ay hindi na pinipilit sa pamamagitan ng OAuth-only na `kimi-coding` na ruta. May kasamang registry, constants, models API, config, at validation test (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Idinagdag ang nawawalang `split2` dependency sa Docker image — kailangan ito ng `pino-abstract-transport` sa runtime ngunit hindi ito kinopya sa standalone na lalagyan, na nagiging sanhi ng `Cannot find module 'split2'` crashes (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Ang mga tugon ng Codex sa subpath na passthrough ay native na suportado, naayos ang pag-crash ng Windows MITM, at inayos ang mga schema ng ahente ng Combos.### Mga Tampok

-**feat(codex)**: Native responses subpath passthrough para sa Codex — native na ruta ang `POST /v1/responses/compact` sa Codex upstream, pinapanatili ang Claude Code compatibility nang hindi inaalis ang `/compact` suffix (#457)### 🐛 Bug Fixes

-**fix(combos)**: Ang mga Zod schema (`updateComboSchema` at `createComboSchema`) ay kasama na ngayon ang `system_message`, `tool_filter_regex`, at `context_cache_protection`. Inaayos ang bug kung saan ang mga setting na partikular sa ahente na ginawa sa pamamagitan ng dashboard ay tahimik na itinapon ng backend validation layer (#458) -**fix(mitm)**: Kiro MITM profile crash sa Windows fixed — `node-machine-id` ay nabigo dahil sa nawawalang `REG.exe` env, at ang fallback ay nagdulot ng nakamamatay na `crypto is not defined` error. Ang Fallback ay ligtas at wastong nag-import ng crypto (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budget save bug + combo agent features UI + omniModel tag security fix.### 🐛 Bug Fixes

-**fix(budget)**: Ang "Save Limits" ay hindi na nagbabalik ng 422 — ang `warningThreshold` ay tama na ngayong naipadala bilang fraction (0–1) sa halip na porsyento (0–100) (#451) -**fix(combos)**: Inalis na ngayon ang internal cache tag ng `<omniModel>` bago ipasa ang mga kahilingan sa mga provider, na pumipigil sa mga break session ng cache (#454)### Mga Tampok

-**feat(combos)**: Idinagdag ang seksyon ng Mga Feature ng Ahente sa combo na gumawa/mag-edit ng modal — ilantad ang `system_message` override, `tool_filter_regex`, at `context_cache_protection` nang direkta mula sa dashboard (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, Codex CLI responses worker fix, package-lock sync.### 🐛 Bug Fixes

-**fix(docker)**: Ang `pino-abstract-transport` at `pino-pretty` ngayon ay tahasang kinopya sa Docker runner stage — Next.js standalone trace miss these peer deps, cause `Cannot find module pino-abstract-transport` crash on startup (#449) -**fix(responses)**: Alisin ang `initTranslators()` mula sa `/v1/responses` na ruta — nag-crash ang Next.js worker na may `the worker has exit` uncaughtException sa mga kahilingan sa Codex CLI (#450)### 🔧 Maintenance

-**chore(deps)**: Ang `package-lock.json` ay ginagawa na ngayon sa bawat bersyon bump para matiyak na ang Docker `npm ci` ay gumagamit ng eksaktong dependency na bersyon---

## [2.7.5] — 2026-03-18

> Sprint: Mga pagpapahusay sa UX at pag-aayos ng healthcheck ng Windows CLI.### 🐛 Bug Fixes

-**fix(ux)**: Ipakita ang default na hint ng password sa login page — nakikita na ngayon ng mga bagong user ang `"Default na password: 123456"` sa ibaba ng password input (#437) -**fix(cli)**: Si Claude CLI at iba pang mga tool na naka-install sa npm ay tama na ngayong natukoy bilang runnable sa Windows — gumagamit ang spawn ng `shell:true` upang lutasin ang mga `.cmd` wrapper sa pamamagitan ng PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Search Tools dashboard, i18n fixes, Copilot limits, Serper validation fix.### Mga Tampok

-**feat(search)**: Magdagdag ng Search Playground (10th endpoint), Search Tools page na may Compare Provider/Rerank Pipeline/Search History, local rerank routing, auth guards sa search API (#443 by @Regis-RCR)

- Bagong ruta: `/dashboard/search-tools`
- Pagpasok sa sidebar sa ilalim ng seksyong Debug
- `GET /api/search/providers` at `GET /api/search/stats` na may mga auth guard
- Lokal na provider_nodes routing para sa `/v1/rerank`
- 30+ i18n key sa namespace ng paghahanap### 🐛 Bug Fixes

-**fix(search)**: Ayusin ang Brave news normalizer (nagbabalik ng 0 resulta), ipatupad ang max_results truncation post-normalization, ayusin ang Endpoints page fetch URL (#443 by @Regis-RCR) -**fix(analytics)**: I-localize ang mga label ng araw/petsa ng analytics — palitan ng `Intl.DateTimeFormat(locale)` (#444 ni @hijak) ang mga naka-hardcode na string ng Portuguese -**fix(copilot)**: Tamang GitHub Copilot na pagpapakita ng uri ng account, i-filter ang mapanlinlang na walang limitasyong mga hilera ng quota mula sa dashboard ng mga limitasyon (#445 ni @hijak) -**fix(providers)**: Itigil ang pagtanggi sa mga wastong Serper API key — ituring ang mga hindi 4xx na tugon bilang wastong pagpapatotoo (#446 ni @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex direct API quota fallback fix.### 🐛 Bug Fixes

-**fix(codex)**: I-block ang mga lingguhang naubos na account sa direktang API fallback (#440)

- `resolveQuotaWindow()` na pagtutugma ng prefix: `"weekly"` ay tumutugma na ngayon sa `"weekly (7d)"` cache keys
- Ang `applyCodexWindowPolicy()` ay nagpapatupad ng `useWeekly`/`use5h` toggle nang tama
- 4 na bagong regression test (766 kabuuan)---

## [2.7.2] — 2026-03-18

> Sprint: Light mode UI contrast fixes.### 🐛 Bug Fixes

-**fix(logs)**: Ayusin ang light mode contrast sa request logs filter buttons at combo badge (#378)

- Ang mga pindutan ng Error/Tagumpay/Combo filter ay nababasa na ngayon sa light mode
- Gumagamit ang combo row badge ng mas malakas na violet sa light mode---

## [2.7.1] — 2026-03-17

> Sprint: Pinag-isang pagruruta sa paghahanap sa web (POST /v1/search) na may 5 provider + Next.js 16.1.7 na mga pag-aayos sa seguridad (6 na CVE).### ✨ New Features

-**feat(search)**: Pinag-isang pagruruta sa paghahanap sa web — `POST /v1/search` na may 5 provider (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover sa mga provider, 6,500+ libreng paghahanap/buwan
- In-memory cache na may pagsasama-sama ng kahilingan (nako-configure na TTL)
- Dashboard: Maghanap sa tab ng Analytics sa `/dashboard/analytics` na may breakdown ng provider, rate ng hit ng cache, pagsubaybay sa gastos
- Bagong API: `GET /api/v1/search/analytics` para sa mga istatistika ng kahilingan sa paghahanap
- Paglipat ng DB: column na `request_type` sa `call_logs` para sa pagsubaybay sa kahilingang hindi chat
- Zod validation (`v1SearchSchema`), na-auth-gated, naitala ang gastos sa pamamagitan ng `recordCost()`### Seguridad

-**deps**: Next.js 16.1.6 → 16.1.7 — inaayos ang 6 na CVE: -**Kritikal**: CVE-2026-29057 (Humiling sa pagpuslit ng HTTP sa pamamagitan ng http-proxy) -**Mataas**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions) -**Katamtaman**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| File                                                             | Layunin                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Handler ng paghahanap na may 5-provider na pagruruta  |
| `open-sse/config/searchRegistry.ts`                              | Registry ng provider (auth, gastos, quota, TTL)       |
| `open-sse/services/searchCache.ts`                               | In-memory cache na may kahilingan na pinagsasama-sama |
| `src/app/api/v1/search/route.ts`                                 | Next.js ruta (POST + GET)                             |
| `src/app/api/v1/search/analytics/route.ts`                       | Search stats API                                      |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Tab ng dashboard ng Analytics                         |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB migration                                          |
| `tests/unit/search-registry.test.mjs`                            | 277 linya ng mga unit test                            | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspired na feature — toolCalling flag, multilingual intent detection, benchmark-driven fallback, request deduplication, pluggable RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 na pagpepresyo.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast — `$0.20/$0.50 per 1M token`, 1143ms p50 latency, suportado ang tool calling -**feat(pricing)**: xAI Grok-4 (standard) — `$0.20/$1.50 per 1M token`, reasoning flagship -**feat(presyo)**: GLM-5 sa pamamagitan ng Z.AI — `$0.5/1M`, 128K na konteksto ng output -**feat(presyo)**: MiniMax M2.5 — `$0.30/1M input`, pangangatwiran + ahenteng gawain -**feat(pricing)**: DeepSeek V3.2 — na-update na pagpepresyo `$0.27/$1.10 bawat 1M` -**feat(presyo)**: Kimi K2.5 sa pamamagitan ng Moonshot API — direktang access sa Moonshot API -**feat(providers)**: Idinagdag ang Z.AI provider (`zai` alias) — GLM-5 na pamilya na may 128K na output### 🧠 Routing Intelligence

-**feat(registry)**: `toolCalling` flag bawat modelo sa provider registry — ang mga combo ay maaari na ngayong mas gusto/nangangailangan ng mga tool-calling na modelo -**feat(scoring)**: Multilingual intent detection para sa AutoCombo scoring — Ang PT/ZH/ES/AR script/mga pattern ng wika ay nakakaimpluwensya sa pagpili ng modelo sa bawat konteksto ng kahilingan -**feat(fallback)**: Benchmark-driven fallback chain — totoong latency data (p50 mula sa `comboMetrics`) na ginagamit upang dynamic na ayusin ang fallback priority -**feat(dedup)**: Humiling ng deduplication sa pamamagitan ng content-hash — Pinipigilan ng 5-segundong idempotency window ang mga duplicate na tawag sa provider mula sa muling pagsubok sa mga kliyente -**feat(router)**: Nai-plug na interface ng `RouterStrategy` sa `autoCombo/routerStrategy.ts` — maaaring i-inject ang custom na routing logic nang hindi binabago ang core### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 bagong advanced na tool schema: `omniroute_get_provider_metrics` (p50/p95/p99 bawat provider) at `omniroute_explain_route` (pagpapaliwanag ng desisyon sa pagruruta) -**feat(mcp)**: Na-update ang mga saklaw ng auth ng tool ng MCP — idinagdag ang saklaw ng `metrics:read` para sa mga tool sa sukatan ng provider -**feat(mcp)**: Tumatanggap na ngayon ang `omniroute_best_combo_for_task` ng parameter na `languageHint` para sa multilingual na pagruruta### 📊 Observability

-**feat(metrics)**: Pinalawak ang `comboMetrics.ts` gamit ang real-time na latency percentile tracking bawat provider/account -**feat(health)**: Ang Health API (`/api/monitoring/health`) ay nagbabalik na ngayon ng mga field na `p50Latency` at `errorRate` para sa bawat provider -**feat(usage)**: Paglipat ng history ng paggamit para sa bawat modelong latency tracking### 🗄️ DB Migrations

-**feat(migrations)**: Bagong column `latency_p50` sa `combo_metrics` table — zero-breaking, ligtas para sa mga kasalukuyang user### 🐛 Bug Fixes / Closures

-**close(#411)**: better-sqlite3 hash module resolution sa Windows — naayos sa v2.6.10 (f02c5b5) -**close(#409)**: Ang mga pagkumpleto ng chat sa GitHub Copilot ay nabigo sa mga modelo ng Claude kapag naka-attach ang mga file — naayos sa v2.6.9 (838f1d6) -**close(#405)**: Duplicate ng #411 — naresolba## [2.6.10] — 2026-03-17

> Pag-aayos ng Windows: better-sqlite3 prebuilt download na walang node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Sa Windows, nabigo ang `npm install -g omniroute` gamit ang `better_sqlite3.node ay hindi wastong Win32 application` dahil ang naka-bundle na native binary ay pinagsama-sama para sa Linux. Nagdaragdag ng**Diskarte 1.5**sa `scripts/postinstall.mjs`: gumagamit ng `@mapbox/node-pre-gyp install --fallback-to-build=false` (naka-bundle sa loob ng `better-sqlite3`) upang i-download ang tamang prebuilt na binary para sa kasalukuyang OS/arch nang hindi nangangailangan ng anumang build tool, walang MSpVC (walang node, walang MSpVC). Bumabalik lamang sa `npm rebuild` kung nabigo ang pag-download. Nagdaragdag ng mga mensahe ng error na partikular sa platform na may malinaw na manu-manong mga tagubilin sa pag-aayos.---

## [2.6.9] — 2026-03-17

> Mga pag-aayos ng CI (t11 any-budget), pag-aayos ng bug #409 (mga attachment ng file sa pamamagitan ng Copilot+Claude), ilabas ang pagwawasto ng daloy ng trabaho.### 🐛 Bug Fixes

-**fix(ci)**: Alisin ang salitang "any" mula sa mga komento sa `openai-responses.ts` at `chatCore.ts` na nabigo sa t11 `any` budget check (false positive mula sa regex counting comments) -**fix(chatCore)**: I-normalize ang mga hindi sinusuportahang uri ng bahagi ng content bago ipasa sa mga provider (#409 — Nagpapadala ang Cursor ng `{type:"file"}` kapag ang mga `.md` file ay naka-attach; Ang Copilot at iba pang OpenAI-compat provider ay tumanggi na may "type ay dapat na alinman sa 'image_url' o 'text'"; ayusin ang mga nagko-convert ng `mentfile` na mga uri`)### 🔧 Workflow

-**chore(generate-release)**: Magdagdag ng ATOMIC COMMIT RULE — version bump (`npm version patch`) DAPAT mangyari bago mag-commit ng feature file para matiyak na palaging tumuturo ang tag sa isang commit na naglalaman ng lahat ng pagbabago sa bersyon nang magkasama---

## [2.6.8] — 2026-03-17

> Sprint: Combo bilang Ahente (system prompt + tool filter), Context Caching Protection, Auto-Update, Detalyadong Log, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Bagong talahanayan ng `request_detail_logs` na may 500-entry ring-buffer trigger, mag-opt-in sa pamamagitan ng toggle ng mga setting### Mga Tampok

-**feat(combo)**: System Message Override per Combo (#399 — `system_message` na field ay pinapalitan o ini-inject ang system prompt bago ipasa sa provider) -**feat(combo)**: Tool Filter Regex per Combo (#399 — Pinapanatili lang ng `tool_filter_regex` ang pattern na tumutugma sa mga tool; sumusuporta sa OpenAI + Anthropic na mga format) -**feat(combo)**: Context Caching Protection (#401 — Mga tugon sa tag ng `context_cache_protection` na may `<omniModel>provider/model</omniModel>` at modelo ng mga pin para sa pagpapatuloy ng session) -**feat(setting)**: Auto-Update sa pamamagitan ng Settings (#320 — `GET /api/system/version` + `POST /api/system/update` — sinusuri ang npm registry at mga update sa background na may pm2 restart) -**feat(logs)**: Mga Detalyadong Log ng Kahilingan (#378 — kinukuha ang buong pipeline body sa 4 na yugto: kahilingan ng kliyente, isinalin na kahilingan, tugon ng provider, tugon ng kliyente — toggle sa pag-opt-in, 64KB trim, 500-entry na ring-buffer) -**feat(mitm)**: MITM Kiro IDE profile (#336 — `src/mitm/targets/kiro.ts` targets api.anthropic.com, muling ginagamit ang umiiral na imprastraktura ng MITM)---

## [2.6.7] — 2026-03-17

> Sprint: Mga pagpapahusay sa SSE, mga lokal na extension ng provider_nodes, proxy registry, Claude passthrough fixes.### Mga Tampok

-**feat(health)**: Background health check para sa lokal na `provider_nodes` na may exponential backoff (30s→300s) at `Promise.allSettled` para maiwasan ang pagharang (#423, @Regis-RCR) -**feat(embeddings)**: Ruta `/v1/embeddings` sa lokal na `provider_nodes` — `buildDynamicEmbeddingProvider()` na may hostname validation (#422, @Regis-RCR) -**feat(audio)**: Iruta ang TTS/STT sa lokal na `provider_nodes` — `buildDynamicAudioProvider()` na may proteksyon sa SSRF (#416, @Regis-RCR) -**feat(proxy)**: Proxy registry, management API, at quota-limit generalization (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: I-strip ang mga field na partikular sa Claude (`metadata`, `anthropic_version`) kapag ang target ay OpenAI-compat (#421, @prakersh) -**fix(sse)**: Extract Claude SSE usage (`input_tokens`, `output_tokens`, cache tokens) sa passthrough stream mode (#420, @prakersh) -**fix(sse)**: Bumuo ng fallback na `call_id` para sa mga tool call na may mga nawawala/walang laman na ID (#419, @prakersh) -**fix(sse)**: Claude-to-Claude passthrough — forward body na ganap na hindi nagalaw, walang muling pagsasalin (#418, @prakersh) -**fix(sse)**: I-filter ang mga naulilang item na `tool_result` pagkatapos ng compaction ng konteksto ng Claude Code para maiwasan ang 400 error (#417, @prakersh) -**fix(sse)**: Laktawan ang mga walang laman na pangalan na tool na tawag sa Responses API translator upang maiwasan ang `placeholder_tool` infinite loops (#415, @prakersh) -**fix(sse)**: Tanggalin ang mga walang laman na text content blocks bago isalin (#427, @prakersh) -**fix(api)**: Magdagdag ng `refreshable: true` sa Claude OAuth test config (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` at mga kaugnay na devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker compatibility — tanggalin ang `node:` protocol mula sa lahat ng `src/` import.### 🐛 Bug Fixes

-**fix(build)**: Inalis ang `node:` protocol prefix mula sa mga statement na `import` sa 17 file sa ilalim ng `src/`. Ang mga import na `node:fs`, `node:path`, `node:url`, `node:os` atbp. ay nagdulot ng error sa `Ecmascript file` sa mga build ng Turbopack (Next.js 15 Docker) at sa mga upgrade mula sa mas lumang npm global installs. Mga apektadong file: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`, at 12 iba pa sa `src/app/api/` at `src/lib/`. -**chore(workflow)**: Na-update ang `generate-release.md` para gawin ang Docker Hub sync at dual-VPS deploy**mandatory**na mga hakbang sa bawat release.---

## [2.6.5] — 2026-03-17

> Sprint: reasoning model param filtering, local provider 404 fix, Kilo Gateway provider, dependency bumps.### ✨ New Features

-**feat(api)**: Idinagdag ang**Kilo Gateway**(`api.kilo.ai`) bilang bagong API Key provider (alias `kg`) — 335+ na modelo, 6 na libreng modelo, 3 auto-routing na modelo (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Mga modelo ng passthrough na sinusuportahan sa pamamagitan ng endpoint ng `/api/gateway/models`. (PR #408 ni @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: I-strip ang mga hindi sinusuportahang parameter para sa mga modelo ng pangangatwiran (o1, o1-mini, o1-pro, o3, o3-mini). Tinatanggihan ng mga modelo sa pamilyang `o1`/`o3` ang `temperatura`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs`, at `n` gamit ang HTTP 400. Inalis na ngayon ang mga parameter sa layer ng `chatCore` bago ipasa. Gumagamit ng declarative na `unsupportedParams` na field sa bawat modelo at isang precomputed na O(1) Map para sa paghahanap. (PR #412 ni @Regis-RCR) -**fix(sse)**: Ang lokal na provider 404 ay nagreresulta na ngayon sa isang**model-only lockout (5 segundo)**sa halip na isang connection-level lockout (2 minuto). Kapag ang isang lokal na inference backend (Ollama, LM Studio, oMLX) ay nagbalik ng 404 para sa isang hindi kilalang modelo, ang koneksyon ay nananatiling aktibo at ang ibang mga modelo ay patuloy na gumagana kaagad. Inaayos din ang isang dati nang bug kung saan hindi naipasa ang `model` sa `markAccountUnavailable()`. Na-detect ang mga lokal na provider sa pamamagitan ng hostname (`localhost`, `127.0.0.1`, `::1`, extensible sa pamamagitan ng `LOCAL_HOSTNAMES` env var). (PR #410 ni @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Inalis ang mga hindi umiiral na pangalan ng modelo sa 5 provider: -**gemini / gemini-cli**: inalis ang `gemini-3.1-pro/flash` at `gemini-3-*-preview` (wala sa Google API v1beta); pinalitan ng `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravity**: inalis ang `gemini-3.1-pro-high/low` at `gemini-3-flash` (mga di-wastong panloob na alias); pinalitan ng mga totoong 2.x na modelo -**github (Copilot)**: inalis ang `gemini-3-flash-preview` at `gemini-3-pro-preview`; pinalitan ng `gemini-2.5-flash` -**nvidia**: itinama ang `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (Gumagamit ang NVIDIA NIM ng `meta/` namespace para sa mga modelong Meta); idinagdag ang `nvidia/llama-3.1-70b-instruct` at `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Na-update na combo ng `free-stack` sa remote DB: inalis ang `qw/qwen3-coder-plus` (expired na refresh token), itinama ang `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`1. → `gemini/gemini-2.5-flash`, idinagdag `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip na na-baked sa build pipeline, idinagdag ang Synthetic provider, naitama ang path ng VPS PM2.### 🐛 Bug Fixes

-**fix(build)**: Ang Turbopack hash-strip ay tumatakbo na ngayon sa**compile time**para sa LAHAT ng package — hindi lang `better-sqlite3`. Ang hakbang 5.6 sa `prepublish.mjs` ay lumalakad sa bawat `.js` sa `app/.next/server/` at inaalis ang 16-char hex suffix mula sa anumang na-hash na `require()`. Inaayos ang `zod-dcb22c...`, `pino-...`, atbp. MODULE_NOT_FOUND sa mga pandaigdigang pag-install ng npm. Isinara ang #398 -**fix(deploy)**: Ang PM2 sa parehong VPS ay tumuturo sa mga lipas na git-clone na direktoryo. Muling na-configure sa `app/server.js` sa npm global package. Na-update ang workflow ng `/deploy-vps` para magamit ang `npm pack + scp` (tinatanggihan ng npm registry ang 299MB na package).### Mga Tampok

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — inference na tugma sa OpenAI na nakatuon sa privacy. `passthroughModels: true` para sa dynamic na HuggingFace model catalog. Mga paunang modelo: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 ni @Regis-RCR)### 📋 Issues Closed

-**close #398**: npm hash regression — naayos ng compile-time hash-strip sa prepublish -**triage #324**: screenshot ng bug na walang mga hakbang — hiniling na mga detalye ng reproduction---

## [2.6.2] — 2026-03-16

> Sprint: ganap na naayos ang pag-hash ng module, pinagsama ang 2 PR (filter ng mga tool ng Anthropic + mga custom na endpoint path), idinagdag ang provider ng Alibaba Cloud DashScope, isinara ang 3 lipas na isyu.### 🐛 Bug Fixes

-**fix(build)**: Extended webpack `externals` hash-strip para masakop ang LAHAT ng `serverExternalPackages`, hindi lang `better-sqlite3`. Next.js 16 Ang Turbopack ay nagha-hash ng `zod`, `pino`, at bawat iba pang server-external na package sa mga pangalan tulad ng `zod-dcb22c6336e0bc69` na wala sa `node_modules` sa runtime. Tinatanggal na ngayon ng HASH_PATTERN regex catch-all ang 16-char na suffix at bumabalik sa pangalan ng base package. Idinagdag din ang `NEXT_PRIVATE_BUILD_WORKER=0` sa `prepublish.mjs` upang palakasin ang webpack mode, kasama ang post-build scan na nag-uulat ng anumang natitirang mga na-hash na ref. (#396, #398, PR #403) -**fix(chat)**: Ang mga pangalan ng tool na anthropic-format (`tool.name` na walang `.function` wrapper) ay tahimik na ibinaba ng filter na walang laman na pangalan na ipinakilala sa #346. Ang mga proxy ng LiteLLM ay humihiling na may prefix na `anthropic/` sa format na Anthropic Messages API, na nagiging sanhi upang ma-filter ang lahat ng tool at ibabalik ng Anthropic ang `400: tool_choice.any ay maaari lamang tukuyin habang nagbibigay ng mga tool`. Naayos sa pamamagitan ng pagbabalik sa `tool.name` kapag wala ang `tool.function.name`. Nagdagdag ng 8 regression unit test. (PR #397)### Mga Tampok

-**feat(api)**: Mga custom na endpoint path para sa OpenAI-compatible na provider node — i-configure ang `chatPath` at `modelsPath` bawat node (hal. `/v4/chat/completions`) sa UI ng koneksyon ng provider. May kasamang DB migration (`003_provider_node_custom_paths.sql`) at URL path sanitization (walang `..` traversal, dapat magsimula sa `/`). (PR #400) -**feat(provider)**: Idinagdag ang Alibaba Cloud DashScope bilang OpenAI-compatible provider. International endpoint: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modelo: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API key.### 📋 Issues Closed

-**close #323**: Cline connection error `[object Object]` — naayos sa v2.3.7; inutusan ang user na mag-upgrade mula sa v2.2.9 -**close #337**: Kiro credit tracking — ipinatupad sa v2.5.5 (#381); itinuro ang user sa Dashboard → Usage -**triage #402**: Nasira ang ARM64 macOS DMG — humiling ng bersyon ng macOS, eksaktong error, at pinapayuhan na `xattr -d com.apple.quarantine` na solusyon---

## [2.6.1] — 2026-03-15

> Kritikal na pag-aayos sa startup: Nag-crash ang v2.6.0 global npm install na may 500 error dahil sa isang Turbopack/webpack module-name hashing bug sa Next.js 16 instrumentation hook.### 🐛 Bug Fixes

-**fix(build)**: Pilitin ang `better-sqlite3` na palaging kailanganin ng eksaktong pangalan ng package nito sa webpack server bundle. Ang Next.js 16 ay nag-compile ng instrumentation hook sa isang hiwalay na chunk at naglabas ng `require('better-sqlite3-<hash>')` — isang hashed na pangalan ng module na wala sa `node_modules` — kahit na nakalista ang package sa `serverExternalPackages`. Nagdagdag ng tahasang `externals` na function sa server webpack config kaya ang bundler ay palaging naglalabas ng `require('better-sqlite3')`, na nireresolba ang startup na `500 Internal Server Error` sa malinis na pandaigdigang pag-install. (#394, PR #395)### 🔧 CI

-**ci**: Idinagdag ang `workflow_dispatch` sa `npm-publish.yml` na may version sync safeguard para sa mga manu-manong trigger (#392) -**ci**: Idinagdag ang `workflow_dispatch` sa `docker-publish.yml`, na-update ang GitHub Actions sa mga pinakabagong bersyon (#392)---

## [2.6.0] - 2026-03-15

> Issue resolution sprint: 4 na mga bug ang naayos, mga log UX na pinahusay, ang Kiro credit tracking ay idinagdag.### 🐛 Bug Fixes

-**fix(media)**: Hindi na lumalabas ang ComfyUI at SD WebUI sa listahan ng provider ng pahina ng Media kapag hindi na-configure — kumukuha ng `/api/providers` sa mount at nagtatago ng mga lokal na provider na walang koneksyon (#390) -**fix(auth)**: Hindi na muling pinipili ng round-robin ang mga account na may rate-limited kaagad pagkatapos ng cooldown — ginagamit na ngayon ang `backoffLevel` bilang pangunahing sort key sa pag-ikot ng LRU (#340) -**fix(oauth)**: Ang Qoder (at iba pang provider na nagre-redirect sa sarili nilang UI) ay hindi na iniiwan ang OAuth modal na naka-stuck sa "Waiting for Authorization" — ang popup-closed detector ay awtomatikong nag-transition sa manual na URL input mode (#344) -**fix(logs)**: Ang talahanayan ng log ng kahilingan ay nababasa na ngayon sa light mode — ang mga status badge, bilang ng token, at combo tag ay gumagamit ng adaptive na `dark:` na mga klase ng kulay (#378)### Mga Tampok

-**feat(kiro)**: Idinagdag ang Kiro credit tracking sa usage fetcher — mga query sa `getUserCredits` mula sa AWS CodeWhisperer endpoint (#337)### 🛠 Chores

-**chore(tests)**: Naka-align ang `test:plan3`, `test:fixes`, `test:security` para magamit ang parehong `tsx/esm` loader bilang `npm test` — inaalis ang mga false negative sa resolution ng module sa mga target na run (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + route body validation hardening.### 🐛 Bug Fixes

-**fix(codex)**: Panatilihin ang native Responses API passthrough para sa mga kliyente ng Codex — iniiwasan ang mga hindi kinakailangang mutation ng pagsasalin (PR #387) -**fix(api)**: I-validate ang mga katawan ng kahilingan sa pagpepresyo/pag-sync at mga ruta sa pagruruta ng gawain — pinipigilan ang mga pag-crash mula sa mga maling input (PR #388) -**fix(auth)**: Ang mga lihim ng JWT ay nagpapatuloy sa mga pag-restart sa pamamagitan ng `src/lib/db/secrets.ts` — nag-aalis ng 401 na error pagkatapos ng pag-restart ng pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Build fix: ibalik ang pagkakakonekta ng VPS na nasira ng v2.5.7 na hindi kumpletong pag-publish.### 🐛 Bug Fixes

-**fix(build)**: Gumamit pa rin ang `scripts/prepublish.mjs` ng hindi na ginagamit na flag na `--webpack` dahilan upang tahimik na mabigo ang Next.js standalone build — npm publish na nakumpleto nang walang `app/server.js`, sinira ang pag-deploy ng VPS---

## [2.5.7] - 2026-03-15

> Mga pag-aayos sa paghawak ng error sa media playground.### 🐛 Bug Fixes

-**fix(media)**: Transkripsyon na "API Key Required" false positive kapag ang audio ay walang speech (musika, katahimikan) — ipinapakita na ngayon ang "Walang speech detected" sa halip -**fix(media)**: Ang `upstreamErrorResponse` sa `audioTranscription.ts` at `audioSpeech.ts` ay nagbabalik na ngayon ng wastong JSON (`{error:{message}}`), na nagpapagana ng tamang 401/403 credential error detection sa MediaPageClient -**fix(media)**: Pinangangasiwaan na ngayon ng `parseApiError` ang field ng `err_msg` ng Deepgram at nakita ang `"api key"` sa mga mensahe ng error para sa tumpak na pag-uuri ng error sa kredensyal---

## [2.5.6] - 2026-03-15

> Mga kritikal na pag-aayos sa seguridad/auth: Nasira ang Antigravity OAuth + Nawala ang mga session ng JWT pagkatapos mag-restart.### 🐛 Bug Fixes

-**fix(oauth) #384**: Ang Antigravity Google OAuth ay tama na ngayong nagpapadala ng `client_secret` sa token endpoint. Ang fallback para sa `ANTIGRAVITY_OAUTH_CLIENT_SECRET` ay isang walang laman na string, na falsy — kaya ang `client_secret` ay hindi kailanman isinama sa kahilingan, na nagiging sanhi ng mga error na `"client_secret ay nawawala"` para sa lahat ng user na walang custom na env var. Isinara ang #383. -**fix(auth) #385**: Ang `JWT_SECRET` ay nananatili na ngayon sa SQLite (`namespace='secrets'`) sa unang henerasyon at nire-reload sa mga susunod na pagsisimula. Dati, isang bagong random na lihim ang nabuo sa bawat pagsisimula ng proseso, na nagpapawalang-bisa sa lahat ng umiiral na cookies/session pagkatapos ng anumang pag-restart o pag-upgrade. Nakakaapekto sa `JWT_SECRET` at `API_KEY_SECRET`. Isinasara ang #382.---

## [2.5.5] - 2026-03-15

> Pag-aayos ng dedup ng listahan ng modelo, Electron standalone build hardening, at Kiro credit tracking.### 🐛 Bug Fixes

-**fix(models) #380**: Ang `GET /api/models` ay may kasama na ngayong mga alias ng provider kapag binubuo ang filter ng active-provider — mga modelo para sa `claude` (alias `cc`) at `github` (alias `gh`) ay palaging ipinapakita kahit na kung ang isang koneksyon ay na-configure, dahil ang `PROVIDER_MODELS' ay mga alyas na provider ng koneksyon. Inayos sa pamamagitan ng pagpapalawak sa bawat aktibong provider ID upang maisama rin ang alias nito sa pamamagitan ng `PROVIDER_ID_TO_ALIAS`. Isinara ang #353.
-**fix(electron) #379**: Ang mga bagong `scripts/prepare-electron-standalone.mjs`ay nagha-stage ng isang nakatalagang`/.next/electron-standalone`bundle bago ang Electron packaging. Abort na may malinaw na error kung ang`node_modules`ay isang symlink (magpapadala ang electron-builder ng runtime dependency sa build machine). Cross-platform path sanitization sa pamamagitan ng`path.basename`. Sa pamamagitan ng @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Pagsubaybay sa balanse ng Kiro credit — ibinabalik na ngayon ng endpoint ng paggamit ang data ng kredito para sa mga Kiro account sa pamamagitan ng pagtawag sa `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (parehong endpoint na ginagamit ng Kiro IDE sa loob). Ibinabalik ang mga natitirang credit, kabuuang allowance, petsa ng pag-renew, at tier ng subscription. Isinara ang #337.## [2.5.4] - 2026-03-15

> Logger startup fix, login bootstrap security fix, at dev HMR reliability improvement. Tumigas ang imprastraktura ng CI.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Ibalik ang pino transport logger path — ang `formatters.level` na sinamahan ng `transport.targets` ay tinanggihan ng pino. Tinatanggal na ngayon ng mga transport-backed config ang level formatter sa pamamagitan ng `getTransportCompatibleConfig()`. Itinutuwid din ang numeric level mapping sa `/api/logs/console`: `30→info, 40→warning, 50→error` (ay inilipat ng isa). -**fix(login) #375**: Ang pahina sa pag-login ay nag-bootstrap ngayon mula sa pampublikong `/api/settings/require-login` endpoint sa halip na protektadong `/api/settings`. Sa mga setup na protektado ng password, ang pahina ng pre-auth ay tumatanggap ng 401 at bumabalik sa mga ligtas na default nang hindi kinakailangan. Ibinabalik na ngayon ng pampublikong ruta ang lahat ng bootstrap metadata (`requireLogin`, `hasPassword`, `setupComplete`) na may conservative 200 fallback sa error. -**fix(dev) #374**: Idagdag ang `localhost` at `127.0.0.1` sa `allowedDevOrigins` sa `next.config.mjs` — Na-block ang HMR websocket noong ina-access ang app sa pamamagitan ng loopback address, na gumagawa ng paulit-ulit na cross-origin na babala.### 🔧 CI & Infrastructure

-**ESLint OOM fix**: Binabalewala na ngayon ng `eslint.config.mjs` ang `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, at `clipr/**` — Nag-crash ang ESLint sa isang JS heap OOM sa pamamagitan ng pag-scan ng mga chunks at Code binary na binary -**Unit test fix**: Inalis ang lipas na `ALTER TABLE provider_connections ADD COLUMN "group"` mula sa 2 test file — bahagi na ngayon ang column ng base schema (idinagdag sa #373), na nagiging sanhi ng `SQLITE_ERROR: duplicate na pangalan ng column` sa bawat CI run. -**Pre-commit hook**: Idinagdag ang `npm run test:unit` sa `.husky/pre-commit` — hinaharangan na ngayon ng mga unit test ang mga nasirang commit bago sila umabot sa CI.## [2.5.3] - 2026-03-14

> Mga kritikal na bugfix: DB schema migration, startup env loading, provider error state clearing, at i18n tooltip fix. Mga pagpapahusay sa kalidad ng code sa itaas ng bawat PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Magdagdag ng column na `provider_connections.group` sa base schema + backfill migration para sa mga umiiral nang database — ginamit ang column sa lahat ng query ngunit nawawala sa schema definition -**fix(i18n) #371**: Palitan ang hindi umiiral na `t("deleteConnection")` key ng umiiral na `providers.delete` key — inaayos ang `MISSING_MESSAGE: providers.deleteConnection` runtime error sa pahina ng detalye ng provider -**fix(auth) #372**: I-clear ang stale error metadata (`errorCode`, `lastErrorType`, `lastErrorSource`) mula sa mga provider account pagkatapos ng tunay na pagbawi — dati, ang mga na-recover na account ay patuloy na lumalabas bilang nabigo -**fix(startup) #369**: Pag-isahin ang pag-load ng env sa buong `npm run start`, `run-standalone.mjs`, at Electron para igalang ang `DATA_DIR/.env → ~/.omniroute/.env → ./.env` priority — pinipigilan ang pagbuo ng isang bagong `STORAGE_KEY_KEY_ENCY na umiiral na database### 🔧 Code Quality

- Nakadokumento na mga pattern ng `result.success` vs `response?.ok` sa `auth.ts` (parehong sinadya, ipinaliwanag na ngayon)
- Na-normalize ang `overridePath?.trim()` sa `electron/main.js` upang tumugma sa `bootstrap-env.mjs`
- Nagdagdag ng `preferredEnv` merge order comment sa Electron startup

> Patakaran sa quota ng Codex account na may auto-rotation, mabilis na tier toggle, modelo ng gpt-5.4, at pag-aayos ng label ng analytics.### ✨ New Features (PRs #366, #367, #368)

-**Patakaran sa Quota ng Codex (PR #366)**: Ang bawat account na 5h/lingguhang window ng quota ay nag-toggle sa dashboard ng Provider. Awtomatikong nilaktawan ang mga account kapag ang mga naka-enable na window ay umabot sa 90% na threshold at muling tinatanggap pagkatapos ng `resetAt`. May kasamang `quotaCache.ts` na may side-effect free status getter. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Mga Setting → Codex Service Tier. Default-off toggle injects `service_tier: "flex"` para lang sa mga kahilingan sa Codex, na binabawasan ang gastos ~80%. Buong stack: UI tab + API endpoint + executor + translator + startup restore. -**gpt-5.4 Model (PR #368)**: Nagdaragdag ng `cx/gpt-5.4` at `codex/gpt-5.4` sa Codex model registry. Kasama ang regression test.### 🐛 Bug Fixes

-**fix #356**: Ang mga chart ng Analytics (Nangungunang Provider, Ayon sa Account, Provider Breakdown) ay nagpapakita na ngayon ng mga pangalan/label ng provider na nababasa ng tao sa halip na mga raw internal na ID para sa mga provider na tugma sa OpenAI.

> Pangunahing release: strict-random na diskarte sa pagruruta, mga kontrol sa pag-access sa key ng API, mga pangkat ng koneksyon, pag-sync ng panlabas na pagpepresyo, at mga kritikal na pag-aayos ng bug para sa mga modelo ng pag-iisip, pagsubok ng combo, at pagpapatunay ng pangalan ng tool.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle deck na may anti-repeat na garantiya at mutex serialization para sa mga sabay-sabay na kahilingan. Mga independiyenteng deck bawat combo at bawat provider. -**API Key Access Controls**: `allowedConnections` (paghigpitan kung aling mga koneksyon ang maaaring gamitin ng isang key), `is_active` (i-enable/i-disable ang key na may 403), `accessSchedule` (time-based na access control), `autoResolve` toggle, palitan ang pangalan ng mga key sa pamamagitan ng PATCH. -**Mga Pangkat ng Koneksyon**: Grupo ng mga koneksyon sa provider ayon sa kapaligiran. Accordion view sa Limits page na may localStorage persistence at smart auto-switch. -**External Pricing Sync (LiteLLM)**: 3-tier na resolution ng pagpepresyo (nag-override ang user → naka-sync → mga default). Mag-opt-in sa pamamagitan ng `PRICING_SYNC_ENABLED=true`. MCP tool na `omniroute_sync_pricing`. 23 bagong pagsubok. -**i18n**: 30 wikang na-update gamit ang mahigpit na random na diskarte, mga string ng pamamahala ng key ng API. ganap na isinalin ang pt-BR.### 🐛 Bug Fixes

-**fix #355**: Tumaas ang stream idle timeout mula 60s hanggang 300s — pinipigilan ang pag-abort ng extended-thinking na mga modelo (claude-opus-4-6, o3, atbp.) sa mahabang yugto ng pangangatwiran. Nako-configure sa pamamagitan ng `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Ang combo test ay lumalampas na ngayon sa `REQUIRE_API_KEY=true` gamit ang panloob na header, at gumagamit ng OpenAI-compatible na format sa pangkalahatan. Pinahaba ang timeout mula 15s hanggang 20s. -**fix #346**: Ang mga tool na may walang laman na `function.name` (ipinasa ng Claude Code) ay na-filter na ngayon bago matanggap ng mga upstream provider ang mga ito, na pumipigil sa mga error na "Invalid input[N].name: empty string."### 🗑️ Closed Issues

-**#341**: Inalis ang seksyon ng debug — ang kapalit ay `/dashboard/logs` at `/dashboard/health`.

> API Key Round-Robin na suporta para sa mga multi-key na setup ng provider, at kumpirmasyon ng wildcard routing at quota window rolling na nasa lugar na.### ✨ New Features

-**API Key Round-Robin (T07)**: Ang mga koneksyon ng provider ay maaari na ngayong humawak ng maraming API key (I-edit ang Koneksyon → Mga Dagdag na API Key). Ang mga kahilingan ay nag-rotate ng round-robin sa pagitan ng mga pangunahing + karagdagang key sa pamamagitan ng `providerSpecificData.extraApiKeys[]`. Ang mga susi ay hawak sa memorya na naka-index sa bawat koneksyon — walang kinakailangang pagbabago sa DB schema.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: Ang `wildcardRouter.ts` na may glob-style wildcard na pagtutugma (`gpt*`, `claude-?-sonnet`, atbp.) ay isinama na sa `model.ts` na may specificity ranking. -**Quota Window Rolling (T08)**: Ang `accountFallback.ts:isModelLocked()` ay nag-auto-advance na sa window — kung ang `Date.now() > entry.until`, ang lock ay tatanggalin kaagad (walang stale blocking).

> UI polish, pagdaragdag ng diskarte sa pagruruta, at magandang paghawak ng error para sa mga limitasyon sa paggamit.### ✨ New Features

-**Fill-First at P2C Routing Strategies**: Idinagdag ang `fill-first` (drain quota bago magpatuloy) at `p2c` (Power-of-Two-Choices low-latency selection) sa combo na tagapili ng diskarte, na may mga kumpletong panel ng gabay at color-coded na mga badge. -**Libreng Stack Preset na Mga Modelo**: Ang paggawa ng combo gamit ang Free Stack template ngayon ay awtomatikong pupunan ang 7 pinakamahusay na klase na libreng modelo ng provider (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). I-activate lang ng mga user ang mga provider at makakuha ng $0/month combo out-of-the-box. -**Malawak na Combo Modal**: Gumagamit na ngayon ang Lumikha/I-edit ang combo modal ng `max-w-4xl` para sa kumportableng pag-edit ng malalaking combo.### 🐛 Bug Fixes

-**Limis page HTTP 500 para sa Codex at GitHub**: Ang `getCodexUsage()` at `getGitHubUsage()` ay nagbabalik na ngayon ng user-friendly na mensahe kapag nagbalik ang provider ng 401/403 (expired na token), sa halip na ihagis at magdulot ng 500 error sa Limits page. -**MaintenanceBanner false-positive**: Hindi na ipinapakita ng banner ang "Server is unreachable" na huwad sa pag-load ng page. Inayos sa pamamagitan ng pagtawag kaagad sa `checkHealth()` sa mount at pag-alis ng lipas na `show`-state closure. -**Mga tooltip ng icon ng provider**: I-edit (pencil) at tanggalin ang mga button ng icon sa row ng koneksyon ng provider ay mayroon na ngayong mga native na tooltip ng HTML — lahat ng 6 na icon ng pagkilos ay self-documented na ngayon.

> Maramihang pagpapahusay mula sa pagsusuri sa isyu ng komunidad, suporta sa bagong provider, pag-aayos ng bug para sa pagsubaybay sa token, pagruruta ng modelo, at pagiging maaasahan ng streaming.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Awtomatikong pagpili ng modelo batay sa uri ng nilalaman ng kahilingan — coding → deepseek-chat, analysis → gemini-2.5-pro, vision → gpt-4o, summarization → gemini-2.5-flash. Nako-configure sa pamamagitan ng Mga Setting. Bagong `GET/PUT/POST /api/settings/task-routing` API. -**HuggingFace Provider**: Idinagdag ang HuggingFace Router bilang isang OpenAI-compatible na provider na may Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: Idinagdag ang Vertex AI (Google Cloud) provider na may Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude sa pamamagitan ng Vertex. -**Mga Pag-upload ng File sa Playground**: Pag-upload ng audio para sa transkripsyon, pag-upload ng larawan para sa mga modelo ng paningin (auto-detect ayon sa pangalan ng modelo), pag-render ng inline na larawan para sa mga resulta ng pagbuo ng larawan. -**Pumili ng Modelo Visual Feedback**: Ang mga naidagdag nang modelo sa combo picker ay nagpapakita na ngayon ng ✓ berdeng badge — pinipigilan ang duplicate na kalituhan. -**Qwen Compatibility (PR #352)**: Na-update na mga setting ng User-Agent at CLI fingerprint para sa Qwen provider compatibility. -**Round-Robin State Management (PR #349)**: Pinahusay na round-robin logic upang mahawakan ang mga ibinukod na account at mapanatili nang tama ang estado ng pag-ikot. -**Clipboard UX (PR #360)**: Mga pinatigas na pagpapatakbo ng clipboard na may fallback para sa mga hindi secure na konteksto; Mga pagpapabuti sa normalisasyon ng tool ni Claude.### 🐛 Bug Fixes

-**Fix #302 — OpenAI SDK stream=False drops tool_calls**: T01 Tanggapin ang header negotiation ay hindi na pinipilit ang streaming kapag ang `body.stream` ay tahasang `false`. Nagdudulot ng tahimik na pagtanggal ng mga tool_call kapag ginagamit ang OpenAI Python SDK sa non-streaming mode. -**Ayusin #73 — Na-ruta si Claude Haiku sa OpenAI nang walang prefix ng provider**: Ang mga modelong `claude-*` na ipinadala nang walang prefix ng provider ay tama na ngayong ruta sa provider ng `antigravity` (Anthropic). Idinagdag ang `gemini-*`/`gemma-*` → `gemini` heuristic din. -**Ayusin ang #74 — Palaging 0 ang bilang ng token para sa Antigravity/Claude streaming**: Ang `message_start` na kaganapan sa SSE na nagdadala ng `input_tokens` ay hindi na-parse ng `extractUsage()`, na naging dahilan upang bumaba ang lahat ng bilang ng input token. Ang pagsubaybay sa token ng input/output ay gumagana na ngayon nang tama para sa mga streaming na tugon. -**Ayusin #180 — Mga duplicate sa pag-import ng modelo na walang feedback**: Ang `ModelSelectModal` ay nagpapakita na ngayon ng ✓ berdeng highlight para sa mga modelong nasa combo na, na ginagawang halatang naidagdag na ang mga ito. -**Mga error sa pagbuo ng pahina ng media**: Nire-render na ngayon ang mga resulta ng larawan bilang mga tag na `<img>` sa halip na raw na JSON. Ipinapakita ang mga resulta ng transkripsyon bilang nababasang teksto. Ang mga error sa kredensyal ay nagpapakita ng amber na banner sa halip na tahimik na pagkabigo. -**Token refresh button sa pahina ng provider**: Idinagdag ang manual token refresh UI para sa mga provider ng OAuth.### 🔧 Improvements

-**Registry ng Provider**: Idinagdag ang HuggingFace at Vertex AI sa `providerRegistry.ts` at `providers.ts` (frontend). -**Read Cache**: Bagong `src/lib/db/readCache.ts` para sa mahusay na DB read caching. -**Quota Cache**: Pinahusay na quota cache na may TTL-based eviction.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| File                                          | Layunin                                                         |
| --------------------------------------------- | --------------------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logic sa pagruruta na may kamalayan sa gawain (7 uri ng gawain) |
| `src/app/api/settings/task-routing/route.ts`  | Task routing config API                                         |
| `src/app/api/providers/[id]/refresh/route.ts` | Manu-manong pag-refresh ng token ng OAuth                       |
| `src/lib/db/readCache.ts`                     | Mahusay na DB read cache                                        |
| `src/shared/utils/clipboard.ts`               | Pinatigas na clipboard na may fallback                          | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combos modal: Free Stack na nakikita at kitang-kita**— Free Stack template ay nakatago (ika-4 sa 3-column grid). Naayos: inilipat sa posisyon 1, inilipat sa 2x2 grid para makita ang lahat ng 4 na template, berdeng hangganan + LIBRENG highlight ng badge.## [2.4.0] - 2026-03-13

> **Major release**— Libreng Stack ecosystem, transcription playground overhaul, 44+ provider, komprehensibong libreng tier na dokumentasyon, at UI improvements sa buong board.### Mga Tampok

-**Combos: Free Stack template**— Bagong ika-4 na template na "Free Stack ($0)" gamit ang round-robin sa buong Kiro + Qoder + Qwen + Gemini CLI. Iminumungkahi ang pre-built na zero-cost combo sa unang paggamit. -**Media/Transcription: Deepgram bilang default**— Deepgram (Nova 3, $200 libre) ang default na provider ng transkripsyon na ngayon. Ipinakita ang AssemblyAI ($50 na libre) at Groq Whisper (libre magpakailanman) na may mga libreng credit badge. -**README: seksyong "Start Free"**— Bagong early-README 5-step na talahanayan na nagpapakita kung paano mag-set up ng zero-cost AI sa ilang minuto. -**README: Libreng Transcription Combo**— Bagong seksyon na may Deepgram/AssemblyAI/Groq combo na mungkahi at mga detalye ng libreng credit ng bawat provider. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras, at Groq na minarkahan ng mayLibreng badge at librengNote para sa UI ng mga provider. -**i18n: templateFreeStack keys**— Free Stack combo template na isinalin at na-sync sa lahat ng 30 wika.## [2.3.16] - 2026-03-13

### Dokumentasyon

-**README: 44+ Provider**— Na-update ang lahat ng 3 paglitaw ng "36+ provider" sa "44+" na nagpapakita ng aktwal na bilang ng codebase (44 na provider sa providers.ts) -**README: Bagong Seksyon "🆓 Mga Libreng Modelo — Ano Ang Talagang Nakukuha Mo"**— Nagdagdag ng 7-provider na talahanayan na may mga limitasyon sa rate ng bawat modelo para sa: Kiro (Claude unlimited sa pamamagitan ng AWS Builder ID), Qoder (5 models unlimited), Qwen (4 na modelong unlimited), Gemini CLI (180K~40 taon), NVIDIA CLI (180K~40), RPM devras tok/araw / 60K TPM), Groq (30 RPM / 14.4K RPD). Kasama ang rekomendasyon ng combo na \/usr/bin/bash Ultimate Free Stack. -**README: Na-update ang Talahanayan ng Pagpepresyo**— Idinagdag ang Cerebras sa API KEY tier, naayos ang NVIDIA mula sa "1000 credits" hanggang "libre ng dev-forever", na-update ang mga bilang at pangalan ng modelo ng Qoder/Qwen -**README: Qoder 8→5 models**(pinangalanan: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 na modelo**(pinangalanan: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Mga Tampok

-**Auto-Combo Dashboard (Tier Priority)**: Idinagdag ang `🏷️ Tier` bilang 7th scoring factor label sa `/dashboard/auto-combo` factor breakdown display — lahat ng 7 Auto-Combo scoring factor ay nakikita na ngayon. -**i18n — autoCombo section**: Nagdagdag ng 20 bagong translation key para sa Auto-Combo dashboard (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, atbp.) sa lahat ng 30 file ng wika.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Na-restore ang wastong default na `clientSecret` — dati ay isang walang laman na string, na nagiging sanhi ng "Mga masamang kredensyal ng kliyente" sa bawat pagtatangkang kumonekta. Ang pampublikong kredensyal ay ang default na fallback na ngayon (mao-overrid sa pamamagitan ng `QODER_OAUTH_CLIENT_SECRET` env var). -**MITM server not found (#335)**: Kino-compile na ngayon ng `prepublish.mjs` ang `src/mitm/*.ts` sa JavaScript gamit ang `tsc` bago kumopya sa npm bundle. Dati, mga raw `.ts` file lang ang kinopya — ibig sabihin, ang `server.js` ay hindi kailanman umiral sa npm/Volta global installs. -**Nawawala ang projectId ng GeminiCLI (#338)**: Sa halip na maghagis ng matinding 500 error kapag nawawala ang `projectId` mula sa mga naka-imbak na kredensyal (hal. pagkatapos mag-restart ng Docker), nagla-log na ngayon ang OmniRoute ng babala at sinusubukan ang kahilingan — nagbabalik ng makabuluhang error sa panig ng provider sa halip na pag-crash ng OmniRoute. -**Electron version mismatch (#323)**: Na-sync ang `electron/package.json` na bersyon sa `2.3.13` (ay `2.0.13`) kaya ang desktop binary version ay tumugma sa npm package.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Idinagdag ang `tierPriority` (weight `0.05`) sa schema ng `ScoringWeights` Zod at ang `combos/auto` na ruta ng API — ang 7th scoring factor ay ganap nang tinatanggap ng REST API at na-validate sa input. Ang timbang ng `stability` ay inayos mula `0.10` hanggang `0.05` upang mapanatili ang kabuuang kabuuan = `1.0`.### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: Idinagdag ang `tierPriority` bilang 7th scoring factor — mas pinipili na ngayon ang mga account na may Ultra/Pro tier kaysa sa Libreng tier kapag pantay ang iba pang salik. Mga bagong opsyonal na field na `accountTier` at `quotaResetIntervalSecs` sa `ProviderCandidate`. Lahat ng 4 na mode pack ay na-update (`mabilis ang barko`, `cost-saver`, `kalidad-una`, `offline-friendly`). -**Intra-Family Model Fallback (T5)**: Kapag hindi available ang isang modelo (404/400/403), awtomatikong bumabalik ang OmniRoute sa mga magkakapatid na modelo mula sa parehong pamilya bago magbalik ng error (`modelFamilyFallback.ts`). -**Configurable API Bridge Timeout**: Ang `API_BRIDGE_PROXY_TIMEOUT_MS` env var ay nagbibigay-daan sa mga operator na ibagay ang proxy timeout (default 30s). Inaayos ang 504 na mga error sa mabagal na upstream na mga tugon. (#332) -**Star History**: Pinalitan ang star-history.com widget ng starchart.cc (`?variant=adaptive`) sa lahat ng 30 README — umaangkop sa maliwanag/madilim na tema, real-time na mga update.### 🐛 Bug Fixes

-**Auth — Unang beses na password**: Ang `INITIAL_PASSWORD` env var ay tinatanggap na ngayon kapag nagtatakda ng unang password sa dashboard. Gumagamit ng `timingSafeEqual` para sa patuloy na paghahambing ng oras, na pumipigil sa mga pag-atake sa timing. (#333) -**README Truncation**: Inayos ang isang nawawalang `</details>` na pansarang tag sa seksyong Pag-troubleshoot na naging dahilan upang ihinto ng GitHub ang pag-render ng lahat ng nasa ibaba nito (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: Inalis ang redundant `@swc/helpers` override mula sa `package.json` na sumalungat sa direktang dependency, na nagdulot ng mga error sa `EOVERRIDE` sa pnpm. Nagdagdag ng `pnpm.onlyBuiltDependencies` config. -**CLI Path Injection (T12)**: Idinagdag ang `isSafePath()` validator sa `cliRuntime.ts` upang harangan ang path traversal at shell metacharacter sa `CLI_*_BIN` env vars. -**CI**: Muling nabuo ang `package-lock.json` pagkatapos ma-override ang pag-alis upang ayusin ang mga pagkabigo ng `npm ci` sa GitHub Actions.### 🔧 Improvements

-**Format ng Tugon (T1)**: Ang `response_format` (json_schema/json_object) ay na-inject na ngayon bilang prompt ng system para kay Claude, na nagpapagana ng structured na pagkakatugma ng output. -**429 Retry (T2)**: Intra-URL retry para sa 429 na tugon (2× na pagsubok na may 2s delay) bago bumalik sa susunod na URL. -**Mga Header ng Gemini CLI (T3)**: Idinagdag ang mga header ng fingerprint ng `User-Agent` at `X-Goog-Api-Client` para sa pagiging tugma ng Gemini CLI. -**Catalog ng Pagpepresyo (T9)**: Nagdagdag ng mga entry sa pagpepresyo ng `deepseek-3.1`, `deepseek-3.2`, at `qwen3-coder-next`.### 📁 New Files

| File                                       | Layunin                                                          |
| ------------------------------------------ | ---------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Modelong mga kahulugan ng pamilya at intra-family fallback logic | ### Fixed |

-**KiloCode**: naayos na ang kilocode healthcheck timeout sa v2.3.11 -**OpenCode**: Magdagdag ng opencode sa cliRuntime registry na may 15s healthcheck timeout -**OpenClaw / Cursor**: Taasan ang healthcheck timeout sa 15s para sa mabagal na pagsisimula ng mga variant -**VPS**: I-install ang droid at openclaw npm packages; i-activate ang CLI_EXTRA_PATHS para sa kiro-cli -**cliRuntime**: Magdagdag ng opencode tool registration at taasan ang timeout para magpatuloy## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Taasan ang `healthcheckTimeoutMs` mula 4000ms hanggang 15000ms — ang kilocode ay nag-render ng ASCII logo banner sa startup na nagdudulot ng maling `healthcheck_failed` sa mabagal/cold-start na kapaligiran## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Ayusin ang `check:any-budget:t11` failure — palitan ang `as any` ng `bilang Record<string, unknown>` sa OAuthModal.tsx (3 paglitaw)### Docs

-**CLI-TOOLS.md**: Kumpletong gabay para sa lahat ng 11 CLI tool (claude, codex, Gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md na naka-sync sa 30 wika na may isinaling pamagat + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Bagong legacy na OpenAI completions endpoint — tumatanggap ng parehong `prompt` string at `messages` array, awtomatikong nag-normalize sa format ng chat -**EndpointPage**: Ipinapakita na ngayon ang lahat ng 3 uri ng endpoint na katugma sa OpenAI: Mga Pagkumpleto ng Chat, Response API, at Mga Pagkumpleto ng Legacy -**i18n**: Idinagdag ang `completionsLegacy/completionsLegacyDesc` sa 30 file ng wika### Fixed

-**OAuthModal**: Ayusin ang `[object Object]` na ipinapakita sa lahat ng OAuth connection error — maayos na i-extract ang `.message` mula sa error response object sa lahat ng 3 `throw new Error(data.error)` na tawag (exchange, device-code, authorize)

- Nakakaapekto sa Cline, Codex, GitHub, Qwen, Kiro, at lahat ng iba pang provider ng OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Magdagdag ng `decodeURIComponent` bago ang base64 decode upang ang mga auth code na naka-encode ng URL mula sa callback URL ay na-parse ng tama, nag-aayos ng mga error na "invalid o expired na authorization code" sa mga remote (LAN IP) setup -**Cline OAuth**: Pino-populate na ngayon ng `mapTokens` ang `name = firstName + lastName || email` kaya ang mga Cline account ay nagpapakita ng mga totoong user name sa halip na "Account #ID" -**Mga pangalan ng OAuth account**: Ang lahat ng OAuth exchange flow (exchange, poll, poll-callback) ay nag-normalize na ngayon ng `name = email` kapag nawawala ang pangalan, kaya ang bawat OAuth account ay nagpapakita ng email nito bilang ang display label sa dashboard ng Mga Provider -**Mga pangalan ng OAuth account**: Inalis ang sunud-sunod na "Account N" na fallback sa `db/providers.ts` — ang mga account na walang email/pangalan ay gumagamit na ngayon ng stable ID-based na label sa pamamagitan ng `getAccountDisplayName()` sa halip na isang sequential number na nagbabago kapag na-delete ang mga account## [2.3.6] - 2026-03-12

### Fixed

-**Batch ng pagsubok ng provider**: Inayos ang Zod schema para tanggapin ang `providerId: null` (nagpapadala ng null ang frontend para sa mga non-provider mode); ay hindi wastong nagbabalik ng "Di-wastong kahilingan" para sa lahat ng batch na pagsubok -**Modal ng pagsubok ng provider**: Inayos ang pagpapakita ng `[object Object]` sa pamamagitan ng pag-normalize ng mga object ng error sa API sa mga string bago i-render sa `setTestResults` at `ProviderTestResultsView` -**i18n**: Nagdagdag ng mga nawawalang key `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` sa `en.json` -**i18n**: Na-synchronize ang 1111 na nawawalang mga key sa lahat ng 29 na hindi Ingles na mga file ng wika gamit ang mga English na value bilang mga fallback## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Nagdagdag ng permanenteng `postinstall` fix para makopya ang `@swc/helpers` sa `node_modules` ng standalone na app — pinipigilan ang MODULE_NOT_FOUND crash sa mga pandaigdigang pag-install ng npm## [2.3.4] - 2026-03-10

### Added

- Maramihang pagsasama ng provider at pagpapahusay sa dashboard
