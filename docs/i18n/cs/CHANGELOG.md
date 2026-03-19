# Seznam změn

## [Nevydané]

---

## [2.7.8] — 18. 3. 2026

> Sprint: Chyba ukládání rozpočtu + funkce kombinovaného agenta v uživatelském rozhraní + oprava zabezpečení tagu omniModel.

### 🐛 Opravy chyb

- **fix(budget)** : „Uložit limity“ již nevrací chybu 422 — `warningThreshold` se nyní správně odesílá jako zlomek (0–1) místo procenta (0–100) (#451)
- **oprava(kombinace)** : interní tag mezipaměti `<omniModel>` je nyní odstraněn před přeposíláním požadavků poskytovatelům, čímž se zabrání přerušení relace mezipaměti (#454)

### ✨ Funkce

- **feat(combos)** : Do modálního okna pro vytváření/úpravy komb přidána sekce Funkce agenta – zpřístupnění přepsání `system_message` , `tool_filter_regex` a `context_cache_protection` přímo z dashboardu (#454)

---

## [2.7.7] — 18. 3. 2026

> Sprint: Pád Dockeru pino, oprava workeru Codex CLI responses, synchronizace zámků balíčků.

### 🐛 Opravy chyb

- **oprava(docker)** : `pino-abstract-transport` a `pino-pretty` jsou nyní explicitně kopírovány ve fázi Docker Runner — Samostatné trasování Next.js tyto závislosti peerů přehlíží, což způsobuje pád `Cannot find module pino-abstract-transport` při spuštění (#449)
- **fix(responses)** : Odstranění `initTranslators()` z trasy `/v1/responses` — worker Next.js `the worker has exited` uncaughtException při požadavcích Codex CLI (#450)

### 🔧 Údržba

- **chore(deps)** : `package-lock.json` je nyní commitován při každém upgradu verze, aby se zajistilo, že Docker `npm ci` použije přesné verze závislostí.

---

## [2.7.5] — 18. 3. 2026

> Sprint: Vylepšení uživatelského rozhraní a oprava kontroly stavu rozhraní Windows CLI.

### 🐛 Opravy chyb

- **fix(ux)** : Zobrazit na přihlašovací stránce nápovědu k výchozímu heslu — noví uživatelé nyní pod polem pro zadání hesla vidí `"Default password: 123456"` (#437)
- **fix(cli)** : Claude CLI a další nástroje nainstalované npm jsou nyní správně detekovány jako spustitelné ve Windows — spawn používá `shell:true` k rozpoznání `.cmd` wrapperů přes PATHEXT (#447)

---

## [2.7.4] — 18. 3. 2026

> Sprint: Panel vyhledávacích nástrojů, opravy i18n, limity Copilota, oprava validace Serperu.

### 🚀 Vlastnosti

- **feat(search)** : Přidáno hřiště pro vyhledávání (10. koncový bod), stránka s nástroji pro vyhledávání s porovnáním poskytovatelů/kanálovým přeřazením/historií vyhledávání, lokální směrování pro přeřazení, ochrana autorizace ve vyhledávacím API (#443 od @Regis-RCR)
    - Nová trasa: `/dashboard/search-tools`
    - Položka postranního panelu v sekci Ladění
    - `GET /api/search/providers` a `GET /api/search/stats` s ochranou autorizace
    - Lokální směrování provider_nodes pro `/v1/rerank`
    - 30+ klíčů i18n ve vyhledávacím jmenném prostoru

### 🐛 Opravy chyb

- **fix(search)** : Oprava normalizátoru Brave News (vracel 0 výsledků), vynucení zkrácení max_results po normalizaci, oprava URL pro načítání stránek z koncových bodů (#443 od @Regis-RCR)
- **fix(analytics)** : Lokalizace popisků dnů/dat v analytických nástrojích — nahrazení pevně zakódovaných portugalských řetězců pomocí `Intl.DateTimeFormat(locale)` (#444 od @hijak)
- **oprava(copilot)** : Oprava zobrazení typu účtu GitHub Copilot, filtrování zavádějících řádků neomezených kvót z dashboardu limitů (#445 od @hijak)
- **oprava(poskytovatelé)** : Zastavit odmítání platných klíčů Serper API – odpovědi jiné než 4xx považovat za platné ověřování (#446 od @hijak)

---

## [2.7.3] — 18. 3. 2026

> Sprint: Oprava záložní kvóty pro přímé API Codexu.

### 🐛 Opravy chyb

- **oprava(codex)** : Blokování týdenních vyčerpávajících účtů v přímém záložním rozhraní API (#440)
    - Porovnávání prefixů `resolveQuotaWindow()` : `"weekly"` nyní odpovídá klíčům mezipaměti `"weekly (7d)"`
    - `applyCodexWindowPolicy()` správně vynucuje přepínání `useWeekly` / `use5h`
    - 4 nové regresní testy (celkem 766)

---

## [2.7.2] — 18. 3. 2026

> Sprint: Opravy kontrastu uživatelského rozhraní v režimu Light.

### 🐛 Opravy chyb

- **fix(logs)** : Oprava kontrastu světelného režimu v protokolech požadavků, tlačítek filtrů a kombinovaného odznaku (#378)
    - Tlačítka filtrů Chyba/Úspěch/Kombinace jsou nyní čitelná i ve světlém režimu.
    - Odznak kombinované řady používá ve světlém režimu silnější fialovou barvu

---

## [2.7.1] — 17. 3. 2026

> Sprint: Sjednocené směrování webového vyhledávání (POST /v1/search) s 5 poskytovateli + opravy zabezpečení Next.js 16.1.7 (6 CVE).

### ✨ Nové funkce

- **feat(search)** : Sjednocené směrování webového vyhledávání — `POST /v1/search` s 5 poskytovateli (Serper, Brave, Perplexity, Exa, Tavily)
    - Automatické přepnutí napříč poskytovateli, více než 6 500 bezplatných vyhledávání/měsíc
    - Mezipaměť v paměti se slučováním požadavků (konfigurovatelné TTL)
    - Dashboard: Karta Analytika vyhledávání v `/dashboard/analytics` s rozpisem poskytovatelů, mírou zásahů do mezipaměti a sledováním nákladů
    - Nové API: `GET /api/v1/search/analytics` pro statistiky vyhledávacích požadavků
    - Migrace databáze: sloupec `request_type` v `call_logs` pro sledování požadavků mimo chat
    - Ověření Zod ( `v1SearchSchema` ), chráněné autorizací, náklady zaznamenány pomocí `recordCost()`

### 🔒 Bezpečnost

- **deps** : Next.js 16.1.6 → 16.1.7 — opravuje 6 CVE:
    - **Kritické** : CVE-2026-29057 (pašování HTTP požadavků přes http-proxy)
    - **Vysoká** : CVE-2026-27977, CVE-2026-27978 (WebSocket + akce serveru)
    - **Médium** : CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7

### 📁 Nové soubory

Soubor | Účel
--- | ---
`open-sse/handlers/search.ts` | Vyhledávací obslužná rutina s routováním 5 poskytovatelů
`open-sse/config/searchRegistry.ts` | Registr poskytovatelů (autorizace, náklady, kvóta, TTL)
`open-sse/services/searchCache.ts` | Mezipaměť v paměti se slučováním požadavků
`src/app/api/v1/search/route.ts` | Trasa Next.js (POST + GET)
`src/app/api/v1/search/analytics/route.ts` | API pro statistiky vyhledávání
`src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Karta analytického panelu
`src/lib/db/migrations/007_search_request_type.sql` | Migrace databáze
`tests/unit/search-registry.test.mjs` | 277 řádků jednotkových testů

---

## [2.7.0] — 17. 3. 2026

> Sprint: Funkce inspirované ClawRouterem – příznak volání toolCalling, vícejazyčná detekce záměru, benchmarkem řízený fallback, deduplikace požadavků, plugin RouterStrategy, ceny Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.

### ✨ Nové modely a ceny

- **feat. (ceny)** : xAI Grok-4 Fast — `$0.20/$0.50 per 1M tokens` , latence 1143 ms p50, podpora volání nástrojů
- **feat. (ceny)** : xAI Grok-4 (standardní) — `$0.20/$1.50 per 1M tokens` , což je důvodem k odmítnutí.
- **výkon (ceny)** : GLM-5 přes Z.AI — `$0.5/1M` , 128 tisíc výstupních kontextů
- **výkon (ceny)** : MiniMax M2.5 — `$0.30/1M input` , uvažování + agentní úkoly
- **feat.(ceny)** : DeepSeek V3.2 — aktualizované ceny `$0.27/$1.10 per 1M`
- **výkon (cena)** : Kimi K2.5 přes Moonshot API — přímý přístup k Moonshot API
- **feat(providers)** : Přidán poskytovatel Z.AI (alias `zai` ) — rodina GLM-5 s výstupem 128K

### 🧠 Směrovací inteligence

- **feat(registry)** : příznak `toolCalling` pro každý model v registru poskytovatelů – kombinace nyní mohou preferovat/vyžadovat modely s možností volání nástrojů
- **feat(scoring)** : Detekce vícejazyčného záměru pro skórování AutoCombo — skriptové/jazykové vzory PT/ZH/ES/AR ovlivňují výběr modelu podle kontextu požadavku
- **feat(fallback)** : Řetězce záložních metod řízené benchmarky — skutečná data o latenci (p50 z `comboMetrics` ) používaná k dynamickému přeskupení priorit záložních metod
- **feat(dedup)** : Vyžádání deduplikace pomocí content-hash — 5sekundové okno idempotence zabraňuje duplicitním voláním poskytovatele v opakovaném pokusu o odeslání klientům
- **feat(router)** : Připojitelné rozhraní `RouterStrategy` v `autoCombo/routerStrategy.ts` — lze vložit vlastní logiku směrování bez úpravy jádra

### 🔧 Vylepšení serveru MCP

- **feat(mcp)** : 2 nová pokročilá schémata nástrojů: `omniroute_get_provider_metrics` (p50/p95/p99 na poskytovatele) a `omniroute_explain_route` (vysvětlení rozhodnutí o směrování)
- **feat(mcp)** : Aktualizovány rozsahy autorizace nástroje MCP – přidán rozsah `metrics:read` pro nástroje pro metriky poskytovatelů
- **feat(mcp)** : `omniroute_best_combo_for_task` nyní akceptuje parametr `languageHint` pro vícejazyčné směrování

### 📊 Pozorovatelnost

- **feat(metrics)** : Soubor `comboMetrics.ts` rozšířen o sledování percentilů latence v reálném čase pro každého poskytovatele/účet.
- **feat(health)** : Rozhraní Health API ( `/api/monitoring/health` ) nyní vrací pole `p50Latency` a `errorRate` pro každého poskytovatele.
- **feat(usage)** : Migrace historie použití pro sledování latence pro jednotlivé modely

### 🗄️ Migrace databází

- **feat(migrations)** : Nový sloupec `latency_p50` v tabulce `combo_metrics` — nulový, bezpečný pro stávající uživatele

### 🐛 Opravy chyb / Uzavření

- **close(#411)** : rozlišení hašovaných modulů better-sqlite3 ve Windows — opraveno ve verzi 2.6.10 (f02c5b5)
- **close(#409)** : Dokončení chatu GitHub Copilot selhává u modelů Claude při připojení souborů – opraveno ve verzi 2.6.9 (838f1d6)
- **close(#405)** : Duplikát #411 – vyřešeno

## [2.6.10] — 17. 3. 2026

> Oprava pro Windows: stažení předkompilovaného better-sqlite3 bez node-gyp/Pythonu/MSVC (#426).

### 🐛 Opravy chyb

- **fix(install/#426)** : Ve Windows dříve selhával příkaz `npm install -g omniroute` s `better_sqlite3.node is not a valid Win32 application` , protože přiložený nativní binární soubor byl zkompilován pro Linux. Přidává **strategii 1.5** do `scripts/postinstall.mjs` : používá `@mapbox/node-pre-gyp install --fallback-to-build=false` (přiloženo v rámci `better-sqlite3` ) ke stažení správného předkompilovaného binárního souboru pro aktuální OS/arch bez nutnosti použití jakýchkoli nástrojů pro sestavení (žádný node-gyp, žádný Python, žádný MSVC). Vrací se k `npm rebuild` pouze v případě, že stahování selže. Přidává chybové zprávy specifické pro platformu s jasnými pokyny k ruční opravě.

---

## [2.6.9] — 17. 3. 2026

> Opravy CI (t11 s libovolným rozpočtem), oprava chyby č. 409 (souborové přílohy přes Copilot+Claude), korekce pracovního postupu vydání.

### 🐛 Opravy chyb

- **fix(ci)** : Odstranění slova „any“ z komentářů v `openai-responses.ts` a `chatCore.ts` , které neprošly kontrolou rozpočtu t11 `\bany\b` (falešně pozitivní výsledek z počítání regexů v komentářích).
- **oprava(chatCore)** : Normalizovat nepodporované typy částí obsahu před přeposláním poskytovatelům (#409 — Kurzor odesílá `{type:"file"}` když jsou připojeny soubory `.md` ; Copilot a další poskytovatelé kompatibilní s OpenAI odmítají s "type musí být buď 'image_url', nebo 'text'"; oprava převádí bloky `file` / `document` na `text` a odstraňuje neznámé typy)

### 🔧 Pracovní postup

- **chore(generate-release)** : Přidat pravidlo pro atomický commit — navýšení verze ( `npm version patch` ) MUSÍ proběhnout před commitem souborů funkcí, aby se zajistilo, že tag vždy ukazuje na commit obsahující všechny změny verzí dohromady.

---

## [2.6.8] — 17. 3. 2026

> Sprint: Kombinace jako agent (systémový příkaz + filtr nástrojů), ochrana kontextového ukládání do mezipaměti, automatická aktualizace, podrobné protokoly, MITM Kiro IDE.

### 🗄️ Migrace databází (bez nutnosti aktualizace – bezpečné pro stávající uživatele)

- **005_combo_agent_fields.sql** : `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL` , `tool_filter_regex TEXT DEFAULT NULL` , `context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql** : Nová tabulka `request_detail_logs` s triggerem kruhového bufferu s 500 záznamy, možnost přihlášení přes přepínač nastavení

### ✨ Funkce

- **feat(combo)** : Přepsání systémových zpráv pro Combo (#399 — pole `system_message` nahrazuje nebo vkládá systémový výzvu před přesměrováním poskytovateli)
- **feat(combo)** : Regulární výraz filtru nástrojů pro každou kombinaci (#399 — `tool_filter_regex` uchovává pouze nástroje odpovídající vzoru; podporuje formáty OpenAI + Anthropic)
- **feat(combo)** : Ochrana před ukládáním do mezipaměti kontextu (#401 — `context_cache_protection` označuje odpovědi s `<omniModel>provider/model</omniModel>` a modelem pins pro zajištění kontinuity relace)
- **feat(settings)** : Automatická aktualizace přes Nastavení (#320 — `GET /api/system/version` + `POST /api/system/update` — kontroluje registr npm a aktualizuje na pozadí s restartem pm2)
- **feat(logs)** : Podrobné protokoly požadavků (#378 — zachycuje kompletní těla procesů ve 4 fázích: požadavek klienta, přeložený požadavek, odpověď poskytovatele, odpověď klienta — přepínání přihlášení, ořezávání na 64 kB, kruhová vyrovnávací paměť s 500 záznamy)
- **feat(mitm)** : Profil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` cílí na api.anthropic.com, znovu využívá stávající infrastrukturu MITM)

---

## [2.6.7] — 17. 3. 2026

> Sprint: Vylepšení SSE, rozšíření lokálních provider_nodes, registr proxy, opravy Claude passthrough.

### ✨ Funkce

- **feat(health)** : Kontrola stavu lokálních `provider_nodes` na pozadí s exponenciálním zpožděním (30s→300s) a `Promise.allSettled` pro zamezení blokování (#423, @Regis-RCR)
- **feat(embeddings)** : Směrování `/v1/embeddings` do lokálních uzlů `provider_nodes` — `buildDynamicEmbeddingProvider()` s ověřením názvu hostitele (#422, @Regis-RCR)
- **feat(audio)** : Směrování TTS/STT do lokálních `provider_nodes` — `buildDynamicAudioProvider()` s ochranou SSRF (#416, @Regis-RCR)
- **feat(proxy)** : Registr proxy, API pro správu a zobecnění limitů kvót (#429, @Regis-RCR)

### 🐛 Opravy chyb

- **fix(sse)** : Odstranění polí specifických pro Claude ( `metadata` , `anthropic_version` ), pokud je cíl kompatibilní s OpenAI (#421, @prakersh)
- **fix(sse)** : Extrahuje využití Claude SSE ( `input_tokens` , `output_tokens` , cache tokeny) v režimu průchozího streamu (#420, @prakersh)
- **fix(sse)** : Generování záložního `call_id` pro volání nástrojů s chybějícími/prázdnými ID (#419, @prakersh)
- **oprava(sse)** : Průchod mezi Claudey a Claudey — přední tělo zcela nedotčeno, bez opětovného překladu (#418, @prakersh)
- **fix(sse)** : Filtrovat osiřelé položky `tool_result` po zhuštění kontextu Claude Code, aby se zabránilo chybám 400 (#417, @prakersh)
- **fix(sse)** : Přeskočit volání nástrojů s prázdnými názvy v překladači Responses API, aby se zabránilo nekonečným smyčkám `placeholder_tool` (#415, @prakersh)
- **fix(sse)** : Odstranění prázdných bloků textového obsahu před překladem (#427, @prakersh)
- **fix(api)** : Přidáno `refreshable: true` do testovací konfigurace Claude OAuth (#428, @prakersh)

### 📦 Závislosti

- Zvýšení `vitest` , `@vitest/*` a související devDependencies (#414, @dependabot)

---

## [2.6.6] — 17. 3. 2026

> Oprava: Kompatibilita s Turbopackem/Dockerem — odebrání protokolu `node:` ze všech importů `src/` .

### 🐛 Opravy chyb

- **fix(build)** : Z příkazů `import` v 17 souborech v `src/` byl odstraněn prefix `node:` protocol. Importy `node:fs` , `node:path` , `node:url` , `node:os` atd. způsobovaly, že `Ecmascript file had an error` v sestaveních Turbopack (Next.js 15 Docker) a při upgradech ze starších globálních instalací npm. Dotčené soubory: `migrationRunner.ts` , `core.ts` , `backup.ts` , `prompts.ts` , `dataPaths.ts` a 12 dalších v `src/app/api/` a `src/lib/` .
- **chore(workflow)** : Aktualizován `generate-release.md` , aby synchronizace Docker Hubu a nasazení duálního VPS zahrnovaly **povinné** kroky v každé verzi.

---

## [2.6.5] — 17. 3. 2026

> Sprint: filtrování parametrů modelu uvažování, oprava chyby 404 lokálního poskytovatele, poskytovatel Kilo Gateway, vylepšení závislostí.

### ✨ Nové funkce

- **feat(api)** : Přidán **Kilo Gateway** ( `api.kilo.ai` ) jako nový poskytovatel API klíčů (alias `kg` ) — více než 335 modelů, 6 bezplatných modelů, 3 modely automatického směrování ( `kilo-auto/frontier` , `kilo-auto/balanced` , `kilo-auto/free` ). Průchozí modely podporovány přes endpoint `/api/gateway/models` . (PR #408 od @Regis-RCR)

### 🐛 Opravy chyb

- **fix(sse)** : Odstranění nepodporovaných parametrů pro modely uvažování (o1, o1-mini, o1-pro, o3, o3-mini). Modely v rodině `o1` / `o3` odmítají `temperature` , `top_p` , `frequency_penalty` , `presence_penalty` , `logprobs` , `top_logprobs` a `n` s HTTP 400. Parametry jsou nyní odstraňovány na vrstvě `chatCore` před přeposíláním. Používá deklarativní pole `unsupportedParams` pro každý model a předpočítanou mapu O(1) pro vyhledávání. (PR #412 od @Regis-RCR)
- **fix(sse)** : Kód 404 lokálního poskytovatele nyní vede k **uzamčení pouze modelu (5 sekund)** namísto uzamčení na úrovni připojení (2 minuty). Když lokální inferenční backend (Ollama, LM Studio, oMLX) vrátí kód 404 pro neznámý model, připojení zůstane aktivní a ostatní modely okamžitě pokračují v práci. Také opravuje již existující chybu, kdy `model` nebyl předán funkci `markAccountUnavailable()` . Lokální poskytovatelé detekováni pomocí názvu hostitele ( `localhost` , `127.0.0.1` , `::1` , rozšiřitelné pomocí proměnné prostředí `LOCAL_HOSTNAMES` ). (PR #410 od @Regis-RCR)

### 📦 Závislosti

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8

---

## [2.6.4] — 17. 3. 2026

### 🐛 Opravy chyb

- **fix(providers)** : Odstraněny neexistující názvy modelů u 5 poskytovatelů:
    - **gemini / gemini-cli** : odstraněny `gemini-3.1-pro/flash` a `gemini-3-*-preview` (neexistují v Google API v1beta); nahrazeny `gemini-2.5-pro` , `gemini-2.5-flash` , `gemini-2.0-flash` , `gemini-1.5-pro/flash`
    - **antigravity** : odstraněny `gemini-3.1-pro-high/low` a `gemini-3-flash` (neplatné interní aliasy); nahrazeny skutečnými modely z verze 2.x
    - **github (Copilot)** : odstraněny `gemini-3-flash-preview` a `gemini-3-pro-preview` ; nahrazeny `gemini-2.5-flash`
    - **nvidia** : opraveno `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM používá pro modely Meta jmenný prostor `meta/` /); přidány `nvidia/llama-3.1-70b-instruct` a `nvidia/llama-3.1-405b-instruct`
- **fix(db/combo)** : Aktualizováno `free-stack` combo na vzdálené databázi: odstraněno `qw/qwen3-coder-plus` (prošlý obnovovací token), opraveno `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct` , opraveno `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash` , přidáno `if/deepseek-v3.2`

---

## [2.6.3] — 16. 3. 2026

> Sprint: hash-strip zod/pino zapečený do build pipeline, přidán syntetický poskytovatel, opravena cesta VPS PM2.

### 🐛 Opravy chyb

- **fix(build)** : Turbopack hash-strip se nyní spouští při **kompilaci** pro VŠECHNY balíčky — nejen `better-sqlite3` . Krok 5.6 v `prepublish.mjs` prochází každý `.js` v `app/.next/server/` a odstraňuje 16znakovou hexadecimální příponu z jakékoli hashované `require()` . Opravuje `zod-dcb22c...` , `pino-...` atd. MODULE_NOT_FOUND u globálních instalací npm. Zavírá #398.
- **Oprava (nasazení)** : PM2 na obou VPS ukazoval na zastaralé adresáře git-clone. V globálním balíčku npm překonfigurováno na `app/server.js` . Aktualizován pracovní postup `/deploy-vps` pro použití `npm pack + scp` (registr npm odmítá balíčky o velikosti 299 MB).

### ✨ Funkce

- **feat(provider)** : Synthetic ( [synthetic.new](https://synthetic.new) ) — inference kompatibilní s OpenAI zaměřená na soukromí. `passthroughModels: true` pro dynamický katalog modelů HuggingFace. Počáteční modely: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 od @Regis-RCR)

### 📋 Problémy uzavřeny

- **zavřít #398** : regrese hashování npm — opraveno hashováním při kompilaci v prepublish
- **triáž č. 324** : Snímek obrazovky s chybou bez kroků – požadovány podrobnosti o reprodukci

---

## [2.6.2] — 16. 3. 2026

> Sprint: hashování modulů kompletně opraveno, sloučeny 2 PR (filtr Anthropic tools + vlastní cesty k endpointům), přidán poskytovatel Alibaba Cloud DashScope, uzavřeny 3 zastaralé problémy.

### 🐛 Opravy chyb

- **fix(build)** : Rozšířeno hashování `externals` webpacku tak, aby zahrnovalo VŠECHNY `serverExternalPackages` , nejen `better-sqlite3` . Next.js 16 Turbopack hashuje `zod` , `pino` a všechny ostatní externí balíčky serveru do názvů jako `zod-dcb22c6336e0bc69` , které za běhu v `node_modules` neexistují. HASH_PATTERN regex catch-all nyní odstraňuje 16znakovou příponu a vrací se k základnímu názvu balíčku. Také přidána `NEXT_PRIVATE_BUILD_WORKER=0` v `prepublish.mjs` pro posílení režimu webpacku a následné skenování po sestavení, které hlásí všechny zbývající hashované reference. (#396, #398, PR #403)
- **fix(chat)** : Názvy nástrojů v anthropic formátu ( `tool.name` bez wrapperu `.function` ) byly tiše vynechány filtrem prázdných názvů zavedeným v bodě #346. LiteLLM proxyuje požadavky s prefixem `anthropic/` ve formátu Anthropic Messages API, což způsobuje filtrování všech nástrojů a Anthropic vrací chybu `400: tool_choice.any may only be specified while providing tools` . Opraveno návratem k `tool.name` , když chybí `tool.function.name` . Přidáno 8 regresních jednotkových testů. (PR #397)

### ✨ Funkce

- **feat(api)** : Vlastní cesty koncových bodů pro uzly poskytovatelů kompatibilní s OpenAI — konfigurace `chatPath` a `modelsPath` pro každý uzel (např. `/v4/chat/completions` ) v uživatelském rozhraní pro připojení poskytovatele. Zahrnuje migraci databáze ( `003_provider_node_custom_paths.sql` ) a sanitizaci cesty URL (bez `..` traversal, musí začínat znakem `/` ). (PR #400)
- **feat(provider)** : Alibaba Cloud DashScope přidán jako poskytovatel kompatibilní s OpenAI. Mezinárodní endpoint: `dashscope-intl.aliyuncs.com/compatible-mode/v1` . 12 modelů: `qwen-max` , `qwen-plus` , `qwen-turbo` , `qwen3-coder-plus/flash` , `qwq-plus` , `qwq-32b` , `qwen3-32b` , `qwen3-235b-a22b` . Autorizace: Nosný API klíč.

### 📋 Problémy uzavřeny

- **zavřít #323** : Chyba připojení Cline `[object Object]` – opraveno ve verzi 2.3.7; uživateli bylo doručeno pokyny k upgradu z verze 2.2.9
- **zavřít #337** : Sledování úvěru Kiro — implementováno ve verzi 2.5.5 (#381); odkázalo uživatele na Dashboard → Použití
- **triage #402** : Poškozený soubor ARM64 macOS DMG – požadovaná verze macOS, přesná chyba a doporučené alternativní řešení `xattr -d com.apple.quarantine`

---

## [2.6.1] — 15. 3. 2026

> Kritická oprava při spuštění: Globální instalace npm v2.6.0 havarovaly s chybou 500 kvůli chybě hashování názvů modulů Turbopack/webpack v instrumentačním hooku Next.js 16.

### 🐛 Opravy chyb

- **fix(build)** : Vynutit, aby byl `better-sqlite3` vždy vyžadován přesným názvem balíčku v balíčku webpack server. Next.js 16 zkompiloval instrumentační hook do samostatného chunku a vygeneroval `require('better-sqlite3-<hash>')` — hashovaný název modulu, který neexistuje v `node_modules` — přestože byl balíček uveden v `serverExternalPackages` . Do konfigurace webpacku serveru byla přidána explicitní funkce `externals` , takže bundler vždy vygeneruje `require('better-sqlite3')` , čímž se vyřeší `500 Internal Server Error` při spuštění čistých globálních instalací. (#394, PR #395)

### 🔧 CI

- **ci** : Do `npm-publish.yml` přidána `workflow_dispatch` se zabezpečením synchronizace verzí pro manuální spouštěče (#392).
- **ci** : Přidán `workflow_dispatch` do `docker-publish.yml` , aktualizovány akce GitHubu na nejnovější verze (#392)

---

## [2.6.0] - 15. 3. 2026

> Sprint řešení problémů: Opraveny 4 chyby, vylepšeno uživatelské rozhraní protokolů, přidáno sledování kreditů Kiro.

### 🐛 Opravy chyb

- **oprava(média)** : ComfyUI a SD WebUI se již nezobrazují v seznamu poskytovatelů na stránce Média, pokud nejsou nakonfigurovány — při připojení načtou `/api/providers` a skryjí lokální poskytovatele bez připojení (#390)
- **oprava(auth)** : Round-robin již po zpoždění znovu nevybírá účty s omezenou rychlostí ihned – `backoffLevel` se nyní používá jako primární třídicí klíč v rotaci LRU (#340)
- **oprava(oauth)** : iFlow (a další poskytovatelé, kteří přesměrovávají na své vlastní uživatelské rozhraní) již nenechávají modální okno OAuth zaseknuté na „Čekání na autorizaci“ – detektor zavřených vyskakovacích oken automaticky přechází do režimu ručního zadávání URL (#344)
- **oprava(logy)** : Tabulka protokolů požadavků je nyní čitelná ve světlém režimu – stavové odznaky, počty tokenů a kombinované tagy používají adaptivní `dark:` barevné třídy (#378)

### ✨ Funkce

- **feat(kiro)** : Do fetcheru využití přidáno sledování kreditů Kiro — dotazy `getUserCredits` z endpointu AWS CodeWhisperer (#337)

### 🛠 Domácí práce

- **chore(tests)** : Zarovnání `test:plan3` , `test:fixes` , `test:security` pro použití stejného zavaděče `tsx/esm` jako u `npm test` – eliminuje falešně negativní výsledky rozlišení modulů v cílených bězích (PR #386)

---

## [2.5.9] - 15. 3. 2026

> Oprava nativní passthrough Codexu + posílení validace těla trasy.

### 🐛 Opravy chyb

- **fix(codex)** : Zachovává nativní průchod Responses API pro klienty Codexu – zabraňuje zbytečným mutacím překladu (PR #387)
- **fix(api)** : Ověřování těl požadavků na trasách pro stanovení cen/synchronizaci a směrování úloh – zabraňuje pádům způsobeným chybně formátovanými vstupy (PR #388)
- **fix(auth)** : Tajné hodnoty JWT přetrvávají i po restartech pomocí `src/lib/db/secrets.ts` — eliminuje chyby 401 po restartu PM2 (PR #388)

---

## [2.5.8] - 15. 3. 2026

> Oprava sestavení: obnovení připojení VPS přerušeného nedokončeným publikováním v2.5.7.

### 🐛 Opravy chyb

- **oprava(build)** : `scripts/prepublish.mjs` se stále používají, zastaralý příznak `--webpack` způsobuje tiché selhání samostatného sestavení Next.js — publikování npm dokončeno bez `app/server.js` , což narušuje nasazení VPS

---

## [2.5.7] - 15. 3. 2026

> Opravy chyb při zpracování v Media Playground.

### 🐛 Opravy chyb

- **oprava(média)** : Přepis „Vyžadován klíč API“ falešně pozitivní, pokud zvuk neobsahuje žádnou řeč (hudba, ticho) – nyní se místo toho zobrazuje „Není detekována žádná řeč“
- **oprava(media)** : `upstreamErrorResponse` v `audioTranscription.ts` a `audioSpeech.ts` nyní vrací správný JSON ( `{error:{message}}` ), což umožňuje správnou detekci chyb přihlašovacích údajů 401/403 v MediaPageClient
- **oprava(média)** : `parseApiError` nyní zpracovává pole `err_msg` v Deepgramu a detekuje `"api key"` v chybových zprávách pro přesnou klasifikaci chyb přihlašovacích údajů.

---

## [2.5.6] - 15. 3. 2026

> Kritické opravy zabezpečení/autentizace: OAuth v Antigravity nefunkční + relace JWT ztraceny po restartu.

### 🐛 Opravy chyb

- **fix(oauth) #384** : Antigravity Google OAuth nyní správně odesílá `client_secret` do koncového bodu tokenu. Záložní volbou pro `ANTIGRAVITY_OAUTH_CLIENT_SECRET` byl prázdný řetězec, což je chyba – `client_secret` tedy nebyl v požadavku nikdy zahrnut, což způsobovalo chyby `"client_secret is missing"` u všech uživatelů bez vlastní proměnné prostředí. Zavírá #383.
- **fix(auth) #385** : `JWT_SECRET` je nyní ukládán do SQLite ( `namespace='secrets'` ) při první generaci a znovu načten při následných spuštěních. Dříve byl při každém spuštění procesu generován nový náhodný tajný klíč, který po jakémkoli restartu nebo upgradu zneplatňoval všechny existující soubory cookie/relace. Ovlivňuje `JWT_SECRET` i `API_KEY_SECRET` . Zavírá #382.

---

## [2.5.5] - 15. 3. 2026

> Oprava odstranění duplicitních dat v seznamu modelů, posílení samostatného sestavení Electronu a sledování kreditů Kiro.

### 🐛 Opravy chyb

- **fix(models) #380** : `GET /api/models` nyní zahrnuje aliasy poskytovatelů při sestavování filtru aktivního poskytovatele — modely pro `claude` (alias `cc` ) a `github` (alias `gh` ) se vždy zobrazovaly bez ohledu na to, zda bylo nakonfigurováno připojení, protože klíče `PROVIDER_MODELS` jsou aliasy, ale připojení k databázi jsou uložena pod ID poskytovatelů. Opraveno rozšířením každého aktivního ID poskytovatele o jeho alias pomocí `PROVIDER_ID_TO_ALIAS` . Zavírá #353.
- **fix(electron) #379** : Nové `scripts/prepare-electron-standalone.mjs` připraví vyhrazený balíček `/.next/electron-standalone` před zabalením Electronu. Pokud je `node_modules` symbolický odkaz, dojde k ukončení s chybou (electron-builder by na sestavovací stroj odeslal běhovou závislost). Multiplatformní sanitizace cest pomocí `path.basename` . Od @kfiramar.

### ✨ Nové funkce

- **feat(kiro) #381** : Sledování zůstatku kreditů Kiro — koncový bod využití nyní vrací data o kreditech pro Kiro účty voláním `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (stejný koncový bod, který Kiro IDE používá interně). Vrací zbývající kredity, celkový limit, datum obnovení a úroveň předplatného. Uzavírá #337.

## [2.5.4] - 15. 3. 2026

> Oprava spouštění loggeru, oprava zabezpečení přihlašovacího bootstrapu a vylepšení spolehlivosti vývojářského HMR. Zlepšení infrastruktury CI.

### 🐛 Opravy chyb (PR #374, #375, #376 od @kfiramar)

- **oprava(logger) #376** : Obnovit cestu k protokolovacímu modulu pino transport — `formatters.level` v kombinaci s `transport.targets` je odmítnut modulem pino. Konfigurace založené na transportu nyní odstraňují formátovač úrovní pomocí funkce `getTransportCompatibleConfig()` . Také opravuje numerické mapování úrovní v `/api/logs/console` : `30→info, 40→warn, 50→error` (bylo posunuto o jednu).
- **oprava(login) #375** : Přihlašovací stránka se nyní bootuje z veřejného endpointu `/api/settings/require-login` namísto chráněného `/api/settings` . V nastaveních chráněných heslem dostávala stránka předběžného ověřování chybu 401 a zbytečně se vracela k bezpečným výchozím hodnotám. Veřejná trasa nyní vrací všechna bootstrapová metadata ( `requireLogin` , `hasPassword` , `setupComplete` ) s konzervativní fallback chybou 200.
- **oprava(dev) #374** : Přidání `localhost` a `127.0.0.1` do `allowedDevOrigins` v `next.config.mjs` — HMR websocket byl blokován při přístupu k aplikaci přes loopback adresu, což opakovaně produkovalo varování cross-origin.

### 🔧 CI a infrastruktura

- **Oprava chyb ESLint OOM** : `eslint.config.mjs` nyní ignoruje `vscode-extension/**` , `electron/**` , `docs/**` , `app/.next/**` a `clipr/**` — ESLint havaroval s chybou JS haldy OOM skenováním binárních blobů a kompilovaných chunků VS Code.
- **Oprava jednotkového testu** : Z 2 testovacích souborů byl odstraněn zastaralý `ALTER TABLE provider_connections ADD COLUMN "group"` – sloupec je nyní součástí základního schématu (přidáno v #373), což způsobovalo `SQLITE_ERROR: duplicate column name` při každém spuštění CI.
- **Pre-commit hook** : Do `.husky/pre-commit` přidán `npm run test:unit` — unit testy nyní blokují poškozené commity dříve, než se dostanou do CI.

## [2.5.3] - 14. 3. 2026

> Opravy kritických chyb: migrace schématu databáze, načítání spouštěcího prostředí, mazání chyb poskytovatele a oprava popisků i18n. Vylepšení kvality kódu nad každým PR.

### 🐛 Opravy chyb (PR #369, #371, #372, #373 od @kfiramar)

- **oprava(db) #373** : Přidání sloupce `provider_connections.group` do základního schématu + migrace zpětného doplnění pro existující databáze — sloupec byl použit ve všech dotazech, ale chyběl v definici schématu
- **fix(i18n) #371** : Nahrazení neexistujícího klíče `t("deleteConnection")` existujícím `providers.delete` — oprava `MISSING_MESSAGE: providers.deleteConnection` na stránce s podrobnostmi o poskytovateli
- **oprava(auth) #372** : Vymazat zastaralá chybová metadata ( `errorCode` , `lastErrorType` , `lastErrorSource` ) z účtů poskytovatelů po skutečném zotavení – dříve se obnovené účty zobrazovaly jako selhané
- **oprava(startup) #369** : Sjednocení načítání env napříč `npm run start` , `run-standalone.mjs` a Electron s ohledem na prioritu `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — zabránění generování nového `STORAGE_ENCRYPTION_KEY` přes existující šifrovanou databázi

### 🔧 Kvalita kódu

- Zdokumentované vzory `result.success` vs. `response?.ok` v `auth.ts` (oba úmyslné, nyní vysvětlené)
- Normalizované `overridePath?.trim()` v `electron/main.js` pro shodu s `bootstrap-env.mjs`
- Přidán komentář k objednávce sloučení `preferredEnv` při spuštění Electronu

> Oprava kvót pro účty Codex s automatickou rotací, rychlým přepínáním úrovní, modelem gpt-5.4 a označením analytických nástrojů.

### ✨ Nové funkce (PR #366, #367, #368)

- **Zásady kvót Codexu (PR #366)** : Okno kvóty 5 hodin/týden pro účet se přepíná v dashboardu poskytovatele. Účty jsou automaticky přeskočeny, když povolená okna dosáhnou prahové hodnoty 90 %, a znovu povoleny po `resetAt` . Zahrnuje `quotaCache.ts` s vedlejším efektem pro získávání statusu zdarma.
- **Přepínání rychlé úrovně Codexu (PR #367)** : Dashboard → Nastavení → Úroveň služeb Codexu. Přepínání ve výchozím nastavení vkládá `service_tier: "flex"` pouze pro požadavky Codexu, což snižuje náklady o ~80 %. Celý stack: karta UI + koncový bod API + exekutor + překladač + obnovení po spuštění.
- **Model gpt-5.4 (PR #368)** : Přidává `cx/gpt-5.4` a `codex/gpt-5.4` do registru modelů Codex. Regresní test je součástí.

### 🐛 Opravy chyb

- **oprava č. 356** : Analytické grafy (Nejlepší poskytovatel, Podle účtu, Rozdělení poskytovatelů) nyní zobrazují lidsky čitelné názvy/štítky poskytovatelů namísto nezpracovaných interních ID u poskytovatelů kompatibilních s OpenAI.

> Hlavní vydání: strategie striktně náhodného směrování, řízení přístupu k klíčům API, skupiny připojení, synchronizace externích cen a opravy kritických chyb pro modely myšlení, kombinované testování a validaci názvů nástrojů.

### ✨ Nové funkce (PR #363 a #365)

- **Strategie striktně náhodného směrování** : Fisher-Yatesův náhodný balíček s garancí neopakování a serializací mutexů pro souběžné požadavky. Nezávislé balíčky pro každé kombo a providera.
- **Řízení přístupu ke klíčům API** : `allowedConnections` (omezení připojení, která může klíč používat), `is_active` (povolení/zakázání klíče s kódem 403), `accessSchedule` (řízení přístupu na základě času), přepínání `autoResolve` , přejmenování klíčů pomocí PATCH.
- **Skupiny připojení** : Seskupování připojení poskytovatelů podle prostředí. Harmonické zobrazení na stránce Limity s perzistencí localStorage a inteligentním automatickým přepínáním.
- **Synchronizace externích cen (LiteLLM)** : 3stupňové rozlišení cen (uživatelské přepsání → synchronizace → výchozí hodnoty). Možnost přihlášení přes `PRICING_SYNC_ENABLED=true` . Nástroj MCP `omniroute_sync_pricing` . 23 nových testů.
- **i18n** : 30 jazyků aktualizováno strategií striktní náhodnosti, řetězce pro správu klíčů API. pt-BR plně přeloženo.

### 🐛 Opravy chyb

- **Oprava č. 355** : Časový limit nečinnosti streamu zvýšen z 60 s na 300 s – zabraňuje přerušení modelů s rozšířeným myšlením (claude-opus-4-6, o3 atd.) během dlouhých fází uvažování. Konfigurovatelné pomocí `STREAM_IDLE_TIMEOUT_MS` .
- **Oprava č. 350** : Kombinovaný test nyní obchází `REQUIRE_API_KEY=true` pomocí interní hlavičky a univerzálně používá formát kompatibilní s OpenAI. Časový limit prodloužen z 15 s na 20 s.
- **oprava #346** : Nástroje s prázdným `function.name` (přeposláno Claudem Code) jsou nyní filtrovány předtím, než je obdrží upstreamoví poskytovatelé, čímž se zabrání chybám „Neplatný vstup[N].name: prázdný řetězec“.

### 🗑️ Uzavřené problémy

- **#341** : Sekce ladění odstraněna – nahrazena je `/dashboard/logs` a `/dashboard/health` .

> Podpora API Key Round-Robin pro nastavení poskytovatelů s více klíči a potvrzení již zavedeného směrování zástupných znaků a rolování oken kvót.

### ✨ Nové funkce

- **Round-Robin klíčů API (T07)** : Připojení poskytovatelů nyní mohou obsahovat více klíčů API (Upravit připojení → Další klíče API). Požadavky rotují round-robin mezi primárními a dalšími klíči pomocí `providerSpecificData.extraApiKeys[]` . Klíče jsou uchovávány v paměti indexované pro každé připojení – nejsou nutné žádné změny schématu databáze.

### 📝 Již implementováno (potvrzeno auditem)

- **Směrování modelu s wildcard znaky (T13)** : soubor `wildcardRouter.ts` s porovnáváním zástupných znaků ve stylu glob ( `gpt*` , `claude-?-sonnet` atd.) je již integrován do `model.ts` s hodnocením specificity.
- **Posunování okna kvót (T08)** : `accountFallback.ts:isModelLocked()` již automaticky posouvá okno vpřed – pokud `Date.now() > entry.until` , zámek se okamžitě smaže (žádné blokování zastaralých funkcí).

> Vylepšení uživatelského rozhraní, doplnění strategií směrování a elegantní zpracování chyb pro omezení využití.

### ✨ Nové funkce

- **Strategie směrování Fill-First a P2C** : Do výběru kombinované strategie přidány strategie `fill-first` (vyčerpání kvóty před přesunem) a `p2c` (výběr Power-of-Two-Choices s nízkou latencí) s kompletními panely s pokyny a barevně odlišenými odznaky.
- **Přednastavené modely Free Stack** : Vytvoření kombinace pomocí šablony Free Stack nyní automaticky vyplní 7 nejlepších modelů bezplatných poskytovatelů ve své třídě (Gemini CLI, Kiro, iFlow×2, Qwen, NVIDIA NIM, Groq). Uživatelé stačí aktivovat poskytovatele a ihned získají kombinaci 0 $/měsíc.
- **Širší kombo modální okno** : Modální okno pro vytvoření/úpravu komba nyní používá `max-w-4xl` pro pohodlnou úpravu velkých komb.

### 🐛 Opravy chyb

- **Stránka s limity HTTP 500 pro Codex a GitHub** : `getCodexUsage()` a `getGitHubUsage()` nyní vracejí uživatelsky přívětivou zprávu, když poskytovatel vrátí 401/403 (vypršelý token), místo aby vyvolaly chybu 500 na stránce s limity.
- **Falešně pozitivní MaintenanceBanner** : Banner již při načítání stránky falešně nezobrazuje „Server je nedostupný“. Opraveno okamžitým voláním `checkHealth()` při připojení a odstraněním zastaralého uzavření `show` -state.
- **Popisky ikon poskytovatele** : Tlačítka s ikonami pro úpravu (tužka) a odstranění v řádku připojení poskytovatele nyní obsahují nativní HTML popisky – všech 6 ikon akcí je nyní samodokumentovaných.

> Několik vylepšení z analýzy problémů komunity, podpora nových poskytovatelů, opravy chyb pro sledování tokenů, směrování modelů a spolehlivost streamování.

### ✨ Nové funkce

- **Inteligentní směrování s ohledem na úlohy (T05)** : Automatický výběr modelu na základě typu obsahu požadavku — kódování → deepseek-chat, analýza → gemini-2.5-pro, vision → gpt-4o, sumarizace → gemini-2.5-flash. Konfigurovatelné v Nastavení. Nové API `GET/PUT/POST /api/settings/task-routing` .
- **Poskytovatel HuggingFace** : Přidán HuggingFace Router jako poskytovatel kompatibilní s OpenAI s Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini.
- **Poskytovatel Vertex AI** : Přidán poskytovatel Vertex AI (Google Cloud) s Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude přes Vertex.
- **Nahrávání souborů do Playgroundu** : Nahrávání zvuku pro přepis, nahrávání obrázků pro modely vidění (automatická detekce podle názvu modelu), inline vykreslování obrázků pro výsledky generování obrázků.
- **Vizuální zpětná vazba při výběru modelu** : Již přidané modely v kombinovaném výběru nyní zobrazují zelený odznak ✓ – zabraňuje záměně duplicitních modelů.
- **Kompatibilita s Qwen (PR #352)** : Aktualizováno nastavení otisků uživatelského agenta a rozhraní CLI pro kompatibilitu s poskytovateli Qwen.
- **Správa stavu round-robin (PR #349)** : Vylepšená logika round-robin pro zpracování vyloučených účtů a správné udržování stavu rotace.
- **Uživatelská zkušenost se schránkou (PR #360)** : Vylepšené operace se schránkou s možností zálohování pro nezabezpečené kontexty; vylepšení normalizace nástroje Claude.

### 🐛 Opravy chyb

- **Oprava č. 302 – OpenAI SDK stream=False zanechává tool_calls** : T01 Accept header negotiation již nevynucuje streamování, pokud je `body.stream` explicitně `false` . Způsobovalo to tiché zanechávání tool_calls při použití OpenAI Python SDK v režimu bez streamování.
- **Oprava č. 73 — Claude Haiku směrován do OpenAI bez prefixu poskytovatele** : modely `claude-*` odeslané bez prefixu poskytovatele nyní správně směrují k poskytovateli `antigravity` (antropickému). Přidána také heuristika `gemini-*` / `gemma-*` → `gemini` .
- **Oprava č. 74 – Počet tokenů je pro streamování Antigravity/Claude vždy 0** : Událost SSE `message_start` , která obsahuje `input_tokens` nebyla analyzována funkcí `extractUsage()` , což způsobovalo pokles všech počtů vstupních tokenů. Sledování vstupních/výstupních tokenů nyní funguje správně pro streamované odpovědi.
- **Oprava č. 180 – Duplikáty importovaných modelů bez zpětné vazby** : `ModelSelectModal` nyní zobrazuje ✓ zelené zvýraznění u modelů, které jsou již v kombinaci, takže je zřejmé, že jsou již přidány.
- **Chyby generování mediálních stránek** : Výsledky obrázků se nyní vykreslují jako tagy `<img>` místo nezpracovaného JSON. Výsledky přepisu se zobrazují jako čitelný text. Chyby přihlašovacích údajů zobrazují oranžový banner místo tiché chyby.
- **Tlačítko pro obnovení tokenu na stránce poskytovatele** : Pro poskytovatele OAuth bylo přidáno uživatelské rozhraní pro ruční obnovení tokenu.

### 🔧 Vylepšení

- **Registr poskytovatelů** : Do `providerRegistry.ts` a `providers.ts` (frontend) přidány prvky HuggingFace a Vertex AI.
- **Čtení mezipaměti** : Nový `src/lib/db/readCache.ts` pro efektivní ukládání do mezipaměti čtení databáze.
- **Mezipaměť kvót** : Vylepšená mezipaměť kvót s vyřazením na základě TTL.

### 📦 Závislosti

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)

### 📁 Nové soubory

Soubor | Účel
--- | ---
`open-sse/services/taskAwareRouter.ts` | Logika směrování s ohledem na úlohy (7 typů úloh)
`src/app/api/settings/task-routing/route.ts` | API pro konfiguraci směrování úloh
`src/app/api/providers/[id]/refresh/route.ts` | Ruční aktualizace tokenu OAuth
`src/lib/db/readCache.ts` | Efektivní mezipaměť pro čtení databáze
`src/shared/utils/clipboard.ts` | Zpevněná schránka s funkcí

## [2.4.1] - 13. 3. 2026

### 🐛 Oprava

- **Modální okno s kombinacemi: Šablona Volný zásobník viditelná a výrazná** – Šablona Volný zásobník byla skrytá (4. v mřížce se 3 sloupci). Opraveno: přesunuto na pozici 1, přepnuto na mřížku 2x2, takže jsou viditelné všechny 4 šablony, zelený okraj + zvýraznění odznaku ZDARMA.

## [2.4.0] - 13. 3. 2026

> **Hlavní vydání** – ekosystém Free Stack, přepracované transkripční hřiště, více než 44 poskytovatelů, komplexní dokumentace k bezplatné úrovni a vylepšení uživatelského rozhraní napříč všemi oblastmi.

### ✨ Funkce

- **Kombinace: Šablona Free Stack** — Nová 4. šablona „Free Stack (0 $)“ využívající round-robin napříč Kiro + iFlow + Qwen + Gemini CLI. Při prvním použití doporučuje předpřipravenou kombinaci s nulovými náklady.
- **Média/Přepis: Deepgram jako výchozí** – Deepgram (Nova 3, 200 dolarů zdarma) je nyní výchozím poskytovatelem přepisu. AssemblyAI (50 dolarů zdarma) a Groq Whisper (navždy zdarma) jsou zobrazeny s odznaky bezplatného kreditu.
- **README: Sekce „Začít zdarma“** – Nová tabulka s 5 kroky v předběžném souboru README, která ukazuje, jak nastavit umělou inteligenci s nulovými náklady během několika minut.
- **README: Kombinace bezplatného přepisu** – Nová sekce s návrhem kombinací Deepgram/AssemblyAI/Groq a informacemi o bezplatném kreditu pro každého poskytovatele.
- **providers.ts: příznak hasFree** — NVIDIA NIM, Cerebras a Groq označené odznakem hasFree a freeNote pro uživatelské rozhraní poskytovatelů.
- **i18n: klíče templateFreeStack** — kombinovaná šablona Free Stack přeložená a synchronizovaná do všech 30 jazyků.

## [2.3.16] - 13. 3. 2026

### 📖 Dokumentace

- **README: 44+ poskytovatelů** — Všechny 3 výskyty výrazu „36+ poskytovatelů“ byly aktualizovány na „44+“, což odráží skutečný počet kódové základny (44 poskytovatelů v souboru providers.ts).
- **README: Nová sekce „🆓 Bezplatné modely – Co skutečně získáte“** – Přidána tabulka 7 poskytovatelů s limity rychlosti pro každý model pro: Kiro (Claude neomezeně přes AWS Builder ID), iFlow (5 modelů neomezeně), Qwen (4 modely neomezeně), Gemini CLI (180K/měsíc), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/den / 60K TPM), Groq (30 RPM / 14.4K RPD). Zahrnuje doporučení pro kombinaci /usr/bin/bash Ultimate Free Stack.
- **Soubor README: Aktualizace cenové tabulky** – přidán Cerebras do úrovně API KEY, opravena změna NVIDIA z „1000 kreditů“ na „navždy zdarma pro vývojáře“, aktualizovány počty a názvy modelů iFlow/Qwen
- **README: Modely iFlow 8→5** (s názvy: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2)
- **README: Modely Qwen 3→4** (s názvy: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)

## [2.3.15] - 13. 3. 2026

### ✨ Funkce

- **Panel automatických kombinací (priorita úrovně)** : Přidána `🏷️ Tier` jako 7. faktor bodování v zobrazení rozpisu faktorů `/dashboard/auto-combo` – nyní je viditelných všech 7 faktorů bodování automatických kombinací.
- **i18n — sekce autoCombo** : Pro panel Auto-Combo bylo přidáno 20 nových překladových klíčů ( `title` , `status` , `modePack` , `providerScores` , `factorTierPriority` atd.) do všech 30 jazykových souborů.

## [2.3.14] - 13. 3. 2026

### 🐛 Opravy chyb

- **iFlow OAuth (#339)** : Obnoven platný výchozí `clientSecret` – dříve to byl prázdný řetězec, který při každém pokusu o připojení způsoboval chybu „Chybné přihlašovací údaje klienta“. Veřejné přihlašovací údaje jsou nyní výchozím záložním nastavením (lze je přepsat pomocí proměnné prostředí `IFLOW_OAUTH_CLIENT_SECRET` ).
- **MITM server nenalezen (#335)** : `prepublish.mjs` nyní kompiluje `src/mitm/*.ts` do JavaScriptu pomocí `tsc` před zkopírováním do npm balíčku. Dříve se kopírovaly pouze nezpracované soubory `.ts` – což znamenalo, že `server.js` nikdy neexistoval v globálních instalacích npm/Volta.
- **Chybí projectId v GeminiCLI (#338)** : Namísto vyvolání hardwarové chyby 500, když v uložených přihlašovacích údajích chybí `projectId` (např. po restartu Dockeru), OmniRoute nyní zaznamená varování a pokusí se o požadavek – vrátí smysluplnou chybu na straně poskytovatele místo pádu OmniRoute.
- **Neshoda verzí balíčku Electron (#323)** : Synchronizována verze `electron/package.json` s verzí `2.3.13` (dříve `2.0.13` ), takže binární verze pro stolní počítače odpovídá balíčku npm.

### ✨ Nové modely (#334)

- **Kiro** : `claude-sonnet-4` , `claude-opus-4.6` , `deepseek-v3.2` , `minimax-m2.1` , `qwen3-coder-next` , `auto`
- **Kodex** : `gpt5.4`

### 🔧 Vylepšení

- **Bodové hodnocení (API + validace)** : Do schématu Zod `ScoringWeights` a trasy API `combos/auto` přidána `tierPriority` (váha `0.05` ) – 7. faktor bodování je nyní plně akceptován rozhraním REST API a ověřován na vstupu. Váha `stability` upravena z `0.10` na `0.05` , aby celkový součet zůstal `1.0` .

### ✨ Nové funkce

- **Víceúrovňové bodování kvót (automatické kombinování)** : Přidána `tierPriority` jako 7. faktor bodování – účty s úrovněmi Ultra/Pro jsou nyní upřednostňovány před úrovněmi Free, pokud jsou ostatní faktory stejné. Nová volitelná pole `accountTier` a `quotaResetIntervalSecs` u `ProviderCandidate` . Všechny 4 balíčky režimů byly aktualizovány ( `ship-fast` , `cost-saver` , `quality-first` , `offline-friendly` ).
- **Záložní model v rámci rodiny (T5)** : Pokud model není k dispozici (404/400/403), OmniRoute se nyní automaticky vrátí k sourozeneckým modelům ze stejné rodiny, než vrátí chybu ( `modelFamilyFallback.ts` ).
- **Konfigurovatelný časový limit API Bridge** : Proměnná prostředí `API_BRIDGE_PROXY_TIMEOUT_MS` umožňuje operátorům ladit časový limit proxy (výchozí hodnota 30 s). Opravuje chyby 504 při pomalých odezvách upstreamu. (#332)
- **Historie hvězd** : Widget star-history.com byl ve všech 30 souborech README nahrazen widgetem starchart.cc ( `?variant=adaptive` ) – přizpůsobuje se světlému/tmavému tématu a aktualizacím v reálném čase.

### 🐛 Opravy chyb

- **Auth — První heslo** : Při nastavování prvního hesla pro dashboard je nyní akceptována proměnná prostředí `INITIAL_PASSWORD` . Používá `timingSafeEqual` pro porovnávání v konstantním čase, čímž se zabraňuje útokům na časování. (#333)
- **Zkrácení souboru README** : Opraven chybějící uzavírací tag `</details>` v sekci Řešení problémů, který způsoboval, že GitHub zastavil vykreslování všeho pod ním (Tech Stack, Dokumentace, Plán, Přispěvatelé).
- **Instalace pnpm** : Z `package.json` byl odstraněn redundantní přepis `@swc/helpers` , který kolidoval s přímou závislostí a způsoboval chyby `EOVERRIDE` na pnpm. Přidána konfigurace `pnpm.onlyBuiltDependencies` .
- **Vložení cesty do CLI (T12)** : V `cliRuntime.ts` byl přidán validátor `isSafePath()` pro blokování procházení cesty a metaznaků shellu v proměnných prostředí `CLI_*_BIN` .
- **CI** : Po odstranění přepsání byl obnoven `package-lock.json` pro opravu chyb `npm ci` v akcích GitHubu.

### 🔧 Vylepšení

- **Formát odpovědi (T1)** : `response_format` (json_schema/json_object) se nyní vkládá jako systémový výzva pro Claude, což umožňuje kompatibilitu strukturovaného výstupu.
- **429 Opakování (T2)** : Opakování odpovědí 429 v rámci URL (2× pokusy s 2s zpožděním) před návratem k další URL.
- **Záhlaví rozhraní příkazového řádku Gemini (T3)** : Přidány záhlaví otisků prstů `User-Agent` a `X-Goog-Api-Client` pro kompatibilitu s rozhraním příkazového řádku Gemini.
- **Cenový katalog (T9)** : Přidány ceníky pro `deepseek-3.1` , `deepseek-3.2` a `qwen3-coder-next` .

### 📁 Nové soubory

Soubor | Účel
--- | ---
`open-sse/services/modelFamilyFallback.ts` | Definice modelových rodin a logika záložních řešení v rámci rodiny

### Opraveno

- **KiloCode** : časový limit kontroly stavu kilocode již byl opraven ve verzi 2.3.11.
- **OpenCode** : Přidání opencode do registru cliRuntime s 15sekundovým časovým limitem pro kontrolu stavu
- **OpenClaw / Cursor** : Prodloužení časového limitu kontroly stavu na 15 sekund pro varianty s pomalým startem.
- **VPS** : Nainstalujte npm balíčky pro droid a openclaw; aktivujte CLI_EXTRA_PATHS pro kiro-cli
- **cliRuntime** : Přidána registrace nástroje opencode a prodloužena časová prodleva pro pokračování

## [2.3.11] - 12. 3. 2026

### Opraveno

- **KiloCode healthcheck** : Zvýšení `healthcheckTimeoutMs` z 4000 ms na 15000 ms — kilocode při spuštění vykreslí banner s logem ASCII, což v prostředích s pomalým/studeným startem způsobí chybu `healthcheck_failed`

## [2.3.10] - 12. 3. 2026

### Opraveno

- **Lint** : Oprava chyby `check:any-budget:t11` — nahrazení `as any` za `as Record<string, unknown>` v OAuthModal.tsx (3 výskyty)

### Dokumenty

- **CLI-TOOLS.md** : Kompletní průvodce všemi 11 nástroji CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw)
- **i18n** : CLI-TOOLS.md synchronizovaný do 30 jazyků s přeloženým názvem a úvodem

## [2.3.8] - 12. 3. 2026

## [2.3.9] - 12. 3. 2026

### Přidáno

- **/v1/completions** : Nový starší endpoint pro dokončení OpenAI – přijímá jak řetězec `prompt` , tak pole `messages` , automaticky se normalizuje do formátu chatu
- **EndpointPage** : Nyní zobrazuje všechny 3 typy koncových bodů kompatibilních s OpenAI: Dokončování chatu, API odpovědí a Legacy Dokončování.
- **i18n** : Přidán `completionsLegacy/completionsLegacyDesc` do 30 jazykových souborů.

### Opraveno

- **OAuthModal** : Oprava zobrazení objektu `[object Object]` u všech chyb připojení OAuth – správně extrahovat `.message` z objektů odpovědí na chyby ve všech 3 `throw new Error(data.error)` (exchange, device-code, authorize)
- Ovlivňuje Cline, Codex, GitHub, Qwen, Kiro a všechny ostatní poskytovatele OAuth.

## [2.3.7] - 12. 3. 2026

### Opraveno

- **Cline OAuth** : Před dekódování base64 přidána `decodeURIComponent` , aby autorizační kódy kódované pomocí URL z URL zpětného volání byly správně analyzovány, opraveny chyby „neplatný nebo vypršený autorizační kód“ ve vzdálených instalacích (LAN IP).
- **Cline OAuth** : `mapTokens` nyní vyplňuje `name = firstName + lastName || email` , takže účty Cline zobrazují skutečná uživatelská jména místo „Account #ID“.
- **Názvy účtů OAuth** : Všechny toky výměny OAuth (exchange, poll, poll-callback) nyní normalizují `name = email` pokud název chybí, takže každý účet OAuth zobrazuje svůj e-mail jako zobrazovaný popisek v dashboardu Poskytovatelé.
- **Názvy účtů OAuth** : V souboru `db/providers.ts` byla odstraněna sekvenční záložní možnost „Účet N“ – účty bez e-mailu/jména nyní používají stabilní popisek založený na ID pomocí `getAccountDisplayName()` namísto sekvenčního čísla, které se mění při smazání účtů.

## [2.3.6] - 12. 3. 2026

### Opraveno

- **Dávkový test poskytovatele** : Opraveno schéma Zod pro akceptování `providerId: null` (frontend odesílá null pro režimy bez poskytovatele); nesprávně vracelo „Neplatný požadavek“ pro všechny dávkové testy.
- **Modální okno testování poskytovatele** : Opraveno zobrazení `[object Object]` normalizací objektů chyb API na řetězce před vykreslením v `setTestResults` a `ProviderTestResultsView`
- **i18n** : Do `en.json` přidány chybějící klíče `cliTools.toolDescriptions.opencode` , `cliTools.toolDescriptions.kiro` , `cliTools.guides.opencode` , `cliTools.guides.kiro`
- **i18n** : Synchronizováno chybějící 1111 klíčů ve všech 29 souborech v neanglických jazycích s použitím anglických hodnot jako záložních hodnot.

## [2.3.5] - 11. 3. 2026

### Opraveno

- **@swc/helpers** : Přidána trvalá oprava `postinstall` pro kopírování `@swc/helpers` do `node_modules` samostatné aplikace – zabraňuje pádu MODULE_NOT_FOUND při globálních instalacích npm.

## [2.3.4] - 10. 3. 2026

### Přidáno

- Integrace více poskytovatelů a vylepšení dashboardu
