# Changelog (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Vyřešená nekonečná smyčka přesměrování na řídicím panelu pro nové instance, když je zakázáno requireLogin.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Nativní integrace Qoder API:**Kompletně přepracováno Qoder Executor tak, aby obešel starší šifrovací algoritmus COSY AES/RSA a směroval přímo do nativní adresy URL kompatibilní s DashScope OpenAi. Eliminuje složité závislosti na `crypto` modulech Node a zároveň zlepšuje věrnost streamu. -**Resilience Engine Overhaul:**Integrovaná ladná nouzová řešení přetečení kontextu, proaktivní detekce tokenu OAuth a prevence emisí prázdného obsahu (#990). -**Kontextově optimalizovaná strategie směrování:**Přidána nová inteligentní schopnost směrování pro nativní maximalizaci kontextových oken v automatizovaných kombinovaných nasazeních (#990).### 🐛 Bug Fixes

-**Poškození streamu Responses API:**Opraveno poškození při hlubokém klonování, kdy hranice překladu Anthropic/OpenAI odstranily specifické prefixy SSE pro `response.` z hranic streamování (#992). -**Claude Cache Passthrough Alignment:**Zarovnané značky mezipaměti kompatibilní s CC konzistentně s upstream režimem Client Pass-Through se zachováním rychlého ukládání do mezipaměti. -**Turbopack Memory Leak:**Připnuto Next.js k přísnému `16.0.10`, aby se zabránilo únikům paměti a sestavení zastaralosti z nedávných upstreamových regresí hašovaných modulů Turbopack (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integrace Models.dev:**Integrované modely.dev jako autoritativní zdroj běhového prostředí pro ceny modelů, možnosti a specifikace, které mají přednost před pevně zakódovanými cenami. Zahrnuje uživatelské rozhraní nastavení pro správu intervalů synchronizace, překladové řetězce pro všech 30 jazyků a robustní testovací pokrytí. -**Nativní funkce poskytovatele:**Přidána podpora pro deklarování a kontrolu funkcí nativního rozhraní API (např. `systemInstructions_supported`), která předchází selhání dezinfekcí neplatných rolí. Aktuálně nakonfigurováno pro poskytovatele Gemini Base a Antigravity OAuth. -**Pokročilá nastavení poskytovatele rozhraní API:**Přidána vlastní přepisy „User-Agent“ pro jednotlivá připojení pro připojení poskytovatelů pomocí klíče API. Přepsání je uloženo v `providerSpecificData.customUserAgent` a nyní se vztahuje na ověřovací sondy a požadavky na provedení upstream.### 🐛 Bug Fixes

-**Spolehlivost Qwen OAuth:**Vyřešena řada problémů s integrací OAuth včetně blokování 400 chybných požadavků na tokenech s vypršenou platností, generování záložních zdrojů pro analýzu vlastností přístupového_tokenu OIDC, když je vynechán `id_token`, chyb při zjišťování katalogů modelů a přísného filtrování záhlaví kompatibilního s OpenX0 od koncového bodu 4.\*## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Dokončená nativní integrace životního cyklu CRUD pro pokročilý Auto-Combo engine (#955). -**Základní operace:**Opraveny chybějící překlady pro nové nativní možnosti Auto-Combos (#955). -**Ověření zabezpečení:**Nativně deaktivováno úlohy automatického zálohování SQLite během provádění CI testu jednotky, aby se explicitně vyřešily úniky paměti zavěšení smyčky událostí Node 22 (#956). -**Ecosystem Proxies:**Dokončené explicitní plánovače synchronizace modelu mapování integrace, cykly OAuth a kontrola tokenů se bezpečně obnovují prostřednictvím nativních serverů OmniRoute upstream proxy (#953). -**Rozšiřitelnost MCP:**Přidán a úspěšně zaregistrován nový rámcový nástroj `omniroute_web_search` MCP z beta verze do produkčních schémat (#951). -**Logika vyrovnávací paměti tokenů:**Přidány limity konfigurace za běhu, které rozšiřují konfigurovatelné vstupní/výstupní vyrovnávací paměti tokenů pro přesné metriky sledování využití (#959).### 🐛 Bug Fixes

-**Oprava CodeQL:**Plně vyřešené a zabezpečené operace indexování kritických řetězců, které zabraňují heuristice indexování polí Server-Side Request Forgery (SSRF) spolu s polynomiálním algoritmickým backtrackingem (ReDoS) uvnitř modulů hlubokého proxy dispečerů. -**Crypto hashe:**Nahradily slabé neověřené starší hodnoty hash OAuth 1.0 robustními standardními ověřovacími primitivy HMAC-SHA-256 zajišťujícími přísné kontroly přístupu. -**API Boundary Protection:**Správně ověřené a namapované strukturální ochrany trasy prosazující přísnou logiku middlewaru `isAuthenticated()` pokrývající manipulaci s nastavením cílení na novější dynamické koncové body a načítání nativních dovedností. -**CLI Ecosystem Compat:**Vyřešeno poškozené nativní vazby analyzátoru běhového prostředí, které ladně shazovalo detektory prostředí „kde“ přes okrajové případy „.cmd/.exe“ pro externí pluginy (#969). -**Architektura mezipaměti:**Refaktorovaná přesná nastavení Analytics a nastavení systému, ukládání do mezipaměti struktury rozvržení struktury řídicího panelu pro udržení stabilních cyklů perzistence rehydratace, které řeší záblesky vizuálního nezarovnaného stavu (#952). -**Claude Caching Standards:**Normalizované a přesně přísně uchované kritické efemérní blokové markery "efemérní" ukládání TTL objednávek pro downstream uzly vynucující čistě mapování standardních kompatibilních požadavků CC bez vynechaných metrik (#948). -**Ověření interních aliasů:**Zjednodušené mapování interního běhového prostředí normalizující vyhledávání užitečného zatížení pověření Codexu uvnitř globálních parametrů překladu, které řeší 401 neověřených poklesů (#958).### 🛠️ Maintenance

-**Zjistitelnost uživatelského rozhraní:**Správně upravené kategorizace rozvržení explicitně oddělující logiku poskytovatelů bezplatných vrstev zlepšující toky řazení uživatelského prostředí na obecných stránkách registru API (#950). -**Topologie nasazení:**Artefakty nasazení Unified Docker zajišťující, že kořenový `fly.toml` odpovídá očekávaným parametrům cloudové instance přímo z krabice a nativně zvládá správně škálovat automatizovaná nasazení. -**Vývojové nástroje:**Oddělené běhové parametry `LKGP` do explicitních nástrojů pro ukládání do mezipaměti abstrakce DB vrstvy zajišťující přísné pokrytí izolace testů pro základní vrstvy mezipaměti bezpečně.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Kompletně přepracováno uživatelské rozhraní `/dashboard/auto-combo`, aby se hladce integrovalo s nativními kartami Dashboard Card a standardizovaným vizuálním odsazením/záhlavím. Přidány dynamické vizuální ukazatele průběhu mapující mechanismy váhy výběru modelu. -**Nastavení synchronizace směrování:**Plně odhalené cíle pokročilého směrování „priorita“ a „vážené“ schéma interně uvnitř seznamů záložních globálních nastavení.### Bug Fixes

-**Nodes Locale Memory & Skills:**Vyřešeny prázdné značky vykreslování pro možnosti Memory a Skills přímo v zobrazeních globálního nastavení propojením všech `settings.*` mapování hodnot interně do `en.json` (také implicitně mapováno pro nástroje pro křížový překlad).### Internal Integrations

- Integrované PR #946 — oprava: zachování kompatibility Claude Code při konverzi odpovědí
- Integrované PR #944 — fix(gemini): Zachovejte podpisy myšlenek napříč voláními antigravitačních nástrojů
- Integrované PR #943 — oprava: obnovení těla GitHub Copilot
- Integrovaný PR #942 — Opravte značky mezipaměti kompatibilní s cc
- Integrované PR #941 — refactor(auth): zlepšit vyhledávání aliasů NVIDIA + přidat protokolování chyb LKGP
- Integrované PR #939 — Obnovení zpětného volání Claude OAuth localhost
- _(Poznámka: PR #934 byl vynechán z cyklu 3.4.9, aby se zabránilo regresi hlavních konfliktů)_---

## [3.4.8] — 2026-04-03

### Bezpečnost

- Plně opravena všechna zbývající zjištění Github Advanced Security (CodeQL) a výstrahy Dependabot.
- Opravena zranitelnost nezabezpečené náhodnosti migrací z `Math.random` na `crypto.randomUUID()`.
- Zabezpečené příkazy shellu v automatických skriptech z vkládání řetězců.
- Migrované zranitelné katastrofické zpětné sledování vzorů analýzy RegEx v kanálech chatu/překladu.
- Vylepšené kontroly dezinfekce výstupu uvnitř komponent uživatelského rozhraní React a vkládání tagů Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Funkce

- Přidán uzel `Cryptography` do monitorování a kontrol stavu MCP (#798)
- Posílené mapování oprávnění tras podle katalogu modelů (`/models`) (#781)### Bug Fixes

- Opraveno obnovení tokenu Claude OAuth, které nezachovalo kontext mezipaměti (#937)
  – Opraveny chyby poskytovatele kompatibilního s CC, kvůli kterým jsou modely uložené v mezipaměti nedostupné (#937)
- Opraveny chyby GitHub Executor související s neplatnými kontextovými poli (#937)
- Opravena selhání Healthcheck nástrojů CLI nainstalovaných NPM ve Windows (#935)
  – Opravený překlad datové části, který vynechává platný obsah kvůli neplatným polím API (#927)
- Opravený pád běhového prostředí v Node 25 týkající se spuštění klíče API (#867)
- Opraveno rozlišení samostatného modulu MCP (`ERR_MODULE_NOT_FOUND`) prostřednictvím `esbuild` (#936)
- Opraven nesoulad rozlišení aliasů pověření směrování NVIDIA NIM (#931)### Bezpečnost

- Přidána bezpečná přísná ochrana vstupních hranic proti nezpracovaným injekcím spouštění vzdáleného kódu „shell: true“.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Poskytovatelé:**Registrovaní noví poskytovatelé generování obrázků, videa a zvuku ze seznamu požadovaných komunitou (#926). -**Uživatelské rozhraní Dashboard:**Přidána samostatná navigace na bočním panelu pro nové moduly paměti a dovedností (#926). -**i18n:**Přidány překladové řetězce a mapování rozložení ve 30 jazycích pro jmenné prostory Memory a Skills.### 🐛 Bug Fixes

-**Odolnost:**Zabránilo tomu, aby se proxy jistič nezasekl ve stavu OTEVŘENO na dobu neurčitou, a to zpracováním přímých přechodů do stavu ZAVŘENO uvnitř záložních kombinovaných cest (#930). -**Protocol Translation:**Opravili jsme streamovací transformátor, aby dezinfikoval bloky odezvy na základě očekávaného protokolu _source_ spíše než protokolu _target_ poskytovatele, čímž byly opraveny modely Anthropics zabalené do užitečných zátěží OpenAI, které zhroutily Claude Code (#929). -**Specifikace API a Gemini:**Opravena analýza `thought_signature` v překladačích `openai-to-gemini` a `claude-to-gemini`, která zabraňuje chybám HTTP 400 ve všech voláních nástrojů Gemini 3 API. -**Poskytovatelé:**Vyčištěni koncové body nekompatibilní s OpenAI, které brání platným upstream připojením (#926). -**Trendy mezipaměti:**Opravena neplatná neshoda dat mapování vlastností způsobující selhání grafů uživatelského rozhraní Trendů mezipaměti a extrahované nadbytečné widgety metrik mezipaměti (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integrace ekosystému CLIProxyAPI:**Přidán spouštěcí program `cliproxyapi` s vestavěným ukládáním do mezipaměti na úrovni modulu a směrováním proxy. Představili jsme komplexní službu Správce verzí pro automatické testování stavu, stahování binárních souborů z GitHubu, vytváření izolovaných procesů na pozadí a čistou správu životního cyklu externích nástrojů CLI přímo prostřednictvím uživatelského rozhraní. Zahrnuje tabulky DB pro konfiguraci proxy, které umožňují automatické křížové směrování externích požadavků OpenAI s hradlem SSRF prostřednictvím místní vrstvy nástrojů CLI (#914, #915, #916). -**Podpora Qoder PAT:**Podpora integrovaných osobních přístupových tokenů (PAT) přímo prostřednictvím místního přenosu `qodercli` namísto starších konfigurací vzdáleného prohlížeče `.cn` (#913). -**Náhled Gemini 3.1 Pro (GitHub):**Do poskytovatele GitHub Copilot byla nativně přidána podpora kanonického explicitního modelu `gemini-3.1-pro-preview' při zachování starších aliasů směrování (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stability:**Opravena smyčka obnovování tokenu Copilot, kde nebyly zastaralé tokeny hluboce začleněny do DB, a odstraněna pole `reasoning_text`, která fatálně narušovala následné konverze antropických bloků pro víceotáčkové chaty (#923). -**Global Timeout Matrix:**Centralizované a parametrizované časové limity požadavků explicitně z `REQUEST_TIMEOUT_MS`, aby se zabránilo skrytým (~300 s) výchozím vyrovnávací paměti pro načítání předčasně odříznout dlouhotrvající SSE streamingové odezvy od modelů těžkého uvažování (#918). -**Cloudflare Quick Tunnels State:**Opravena závažná nekonzistence stavu, kdy restartované instance OmniRoute chybně ukazovaly zničené tunely jako aktivní, a výchozí cloudflared tunelování na `HTTP/2`, aby se eliminoval spam protokolu příjmu UDP (#925). -**i18n Translation Overhaul (Czech & Hindi):**Opraven hindský kód z UKONČENÉHO `in.json` na kanonický `hi.json`, přepracováno mapování českého textu, extrahován `untranslatable-keys.json` k opravě falešně pozitivních validací CI/CD a vygenerován komplexní průvodce N#9.md2`I).
-**Obnova poskytovatele tokenů:**Opravena ztráta konkrétních koncových bodů `resourceUrl` Qwen po automatické obnově tokenu kontroly stavu kvůli chybějícím hlubokým sloučením DB (#917). -**CC kompatibilní UX a streamování:**Sjednocené akce Add CC/OpenAI/Anthropic kompatibilní kolem zacházení s uživatelským rozhraním Anthropic, nucené upstream požadavky kompatibilní s CC používat SSE, přičemž stále vracejí streamované nebo nestreamingové odpovědi na základě požadavku klienta, odstraněná podpora konfigurace/importu seznamu modelů CC ve prospěch explicitní chyby zpřístupnění nepodporovaného modelu a zpřístupnění kompatibilního zrcadlení modelu CCC Seznam registru kódů (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Vyšlete `response.completed` se správnými poli `input_tokens`/`output_tokens` pro klienty Codex CLI, oprava zobrazení využití tokenu (#909 – díky @christopher-s). -**Kontrolní bod SQLite WAL při vypnutí:**Vyprázdnění změn WAL do primárního databázového souboru během řádného vypnutí/restartu, čímž se zabrání ztrátě dat při zastaveních kontejneru Docker (#905 – díky @rdself). -**Graceful Shutdown Signal:**Změněny cesty `/api/restart` a `/api/shutdown` z `process.exit(0)` na `process.kill(SIGTERM)`, čímž bylo zajištěno, že obsluha vypnutí bude spuštěna před ukončením. -**Docker Stop Grace Period:**Přidán `stop_grace_period: 40s` do souborů Docker Compose a `--stop-timeout 40` do příkladů spuštění Dockeru.### 🛠️ Maintenance

- Uzavřeno 5 vyřešených problémů (#872, #814, #816, #890, #877).
- Seřazeno 6 problémů s požadavky na informace o potřebách (#892, #887, #886, #865, #895, #870).
- Reagováno na problém se sledováním detekce CLI (#863) s pokyny přispěvatele.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravitační paměť a dovednosti:**Dokončená vzdálená injekce paměti a dovedností pro poskytovatele antigravitace na úrovni sítě proxy. -**Kompatibilita Claude Code:**Vytvořil nativně skrytý most kompatibility pro Claude Code, který umožňuje čisté předávání nástrojů a formátování. -**Web Search MCP:**Přidán nástroj `omniroute_web_search` s rozsahem `execute:search`. -**Komponenty mezipaměti:**Implementované komponenty dynamické mezipaměti využívající TDD. -**Uživatelské rozhraní a přizpůsobení:**Přidána podpora vlastních ikon favicon, karty vzhledu, kabelové označování bílým štítkem na postranní panel a přidány kroky průvodce Windsurf ve všech 33 jazycích. -**Uchovávání protokolu:**Sjednocené uchovávání protokolu požadavků a artefaktů nativně. -**Vylepšení modelu:**Přidána explicitní `contextLength` pro všechny modely opencode-zen. -**i18n a překlady:**Nativně integrované 33 jazykové překlady, včetně zástupných ověření CI a aktualizací čínské dokumentace (#873, #869).### 🐛 Bug Fixes

-**Mapování Qwen OAuth:**Vráceno spoléhání `id_token` na `access_token` a povoleno dynamické vkládání koncových bodů API `resource_url` pro správné regionální směrování (#900). -**Model Sync Engine:**Uloženo striktní interní ID poskytovatele v synchronizačních rutinách `getCustomModels()` namísto formátu alias kanálu uživatelského rozhraní, což zabraňuje selhání vložení katalogu SQLite (#903). -**Claude Code & Codex:**Standardizované nestreamované prázdné odpovědi na „(prázdná odpověď)“ ve formátu Anthropic, aby se zabránilo zhroucení proxy CLI (#866). -**CC kompatibilní směrování:**Vyřešena duplicitní kolize koncových bodů `/v1` během zřetězení cest pro generické brány Claude Code (#904). -**Antigravitační panely:**Blokované modely s neomezenými kvótami, aby se nepravdivě registrovaly jako vyčerpané limitní stavy „100% využití“ v uživatelském rozhraní poskytovatele (#857). -**Claude Image Passthrough:**Opraveno Claude modely chybějící průchody obrazových bloků (#898). -**Gemini CLI Routing:**Vyřešeno 403 zablokování autorizace a problémy s hromaděním obsahu obnovením ID projektu pomocí `loadCodeAssist` (#868). -**Antigravitační stabilita:**Opravené přístupové seznamy modelů, vynucených 404 blokování, opravených 429 kaskád blokujících standardní připojení a omezení výstupních tokenů `gemini-3.1-pro` (#885). -**Kadence synchronizace poskytovatele:**Opraveno omezení kadence synchronizace poskytovatele prostřednictvím interního plánovače (#888). -**Optimalizace řídicího panelu:**Vyřešeno zamrzání uživatelského rozhraní `/dashboard/limits` při zpracování více než 70 účtů pomocí paralelizace chunků (#784). -**SSRF Hardening:**Vynuceno přísné filtrování rozsahu IP SSRF a zablokováno rozhraní zpětné smyčky `::1`. -**Typy MIME:**Standardizovaný `mime_type` na hadí_případ, aby odpovídal specifikacím Gemini API. -**Stabilizace CI:**Opravena selhávající analytika/nastavení selektorů Playwright a kontrolních požadavků, takže běhy GitHub Actions E2E spolehlivě procházejí přes lokalizovaná uživatelská rozhraní a ovládací prvky založené na přepínačích. -**Deterministické testy:**Odstraněny fixní kvóty citlivé na datum z testů využití Copilota a sladěné testy idempotence/modelového katalogu se sloučeným chováním za běhu. -**MCP Type Hardening:**Odstraněny nulové explicitní „jakékoliv“ regrese z cesty registrace nástroje serveru MCP. -**Model Sync Engine:**Vynechané destruktivní přepisy `nahradit`, když automatická synchronizace poskytovatele poskytne prázdný seznam modelů, čímž se zachová stabilita dynamických katalogů (#899).### 🛠️ Maintenance

-**Protokolování potrubí:**Vylepšené artefakty protokolování potrubí a vynucené retenční limity (#880). -**AGENTS.md Generální oprava:**Zhuštěno z 297→153 řádků. Přidány pokyny pro sestavení/testování/styl, pracovní postupy kódu (Prettier, TypeScript, ESLint) a oříznuté podrobné tabulky (#882). -**Integrace větve vydání:**Konsolidovala větvení aktivních funkcí do `release/v3.4.2` nad aktuální `main` a ověřila větev pomocí lint, unit, pokrytí, sestavení a E2E běhů v režimu CI. -**Testování:**Přidána konfigurace vitest pro testování komponent a specifikace Playwright pro přepínače nastavení. -**Aktualizace dokumentů:**Rozšířené soubory readme root, nativní překlad čínských dokumentů a vyčištění zastaralých souborů.## [3.4.1] - 2026-03-31

> [!UPOZORNĚNÍ]
> **PŘEKONALÁ ZMĚNA: Proměnné prostředí pro protokolování, uchovávání a protokolování požadavků byly přepracovány.**
> Při prvním spuštění po upgradu OmniRoute archivuje starší protokoly požadavků z `DATA_DIR/logs/`, starší `DATA_DIR/call_logs/` a `DATA_DIR/log.txt` do `DATA_DIR/log_archives/*.zip` a poté odebere zastaralý formát rozvržení a přepne na zastaralé rozvržení `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**Zahrnuje `scripts/migrate-env.mjs` pro bezproblémovou migraci konfigurací `<v3.3` na `v3.4.x` přísná omezení ověřování zabezpečení (FASE-01), opravující selhání spouštění způsobená krátkými instancemi `JWT_SECRET`. -**Optimalizace mezipaměti Kiro AI:**Implementováno deterministické generování `conversationId` (uuidv5), které umožňuje správné ukládání do mezipaměti výzvy AWS Builder ID během vyvolání (#814). -**Obnova a konsolidace uživatelského rozhraní řídicího panelu:**Vyřešena logika postranního panelu vynechávající sekci Debug a vymazána upozornění na směrování Nextjs přesunutím samostatných stránek `/dashboard/mcp` a `/dashboard/a2a` explicitně do vestavěných komponent uživatelského rozhraní Endpoint Proxy. -**Unified Request Log Artifacts:**Protokolování požadavků nyní ukládá jeden řádek indexu SQLite plus jeden artefakt JSON na požadavek pod `DATA_DIR/call_logs/`, s volitelným zachycením kanálu vloženým do stejného souboru. -**Jazyk:**Vylepšený čínský překlad (#855) -**Modely Opencode-Zen:**Přidány 4 bezplatné modely do registru opencode-zen (#854) -**Testy:**Přidány testy jednotek a E2E pro přepínání nastavení a opravy chyb (#850)### 🐛 Bug Fixes

-**429 Analýza kvót:**Analyzovala dlouhé časy resetování kvót z chybových těl, aby byla dodržena správná odstoupení od smlouvy a zabránilo se zákazům účtů s omezenou rychlostí (#859) -**Prompt Caching:**Zachované klientské hlavičky `cache_control` pro všechny poskytovatele protokolu Claude (jako Minimax, GLM a Bailian), správně rozpoznávající podporu ukládání do mezipaměti (#856) -**Protokoly synchronizace modelů:**Snížení množství spamu v protokolech zaznamenáváním „modelů synchronizace“ pouze v případě, že kanál skutečně upraví seznam (#853) -**Provider Quota & Token Parsing:**Změněné antigravitační limity pro použití `retrieveUserQuota` nativně a správně namapovaných dat obnovy tokenu Claude na formuláře zakódované v URL (#862) -**Stabilita omezující rychlost:**Univerzální architektura analýzy 429 Retry-After pro omezení ochlazení vyvolaného poskytovatelem na max. 24 hodin (#862) -**Limit vykreslování řídicího panelu:**Přepracované mapování kvót `/dashboard/limits` tak, aby se vykreslovalo okamžitě uvnitř bloků, opravuje velké zpoždění zamrznutí uživatelského rozhraní u účtů přesahujících 70 aktivních připojení (#784) -**QWEN OAuth Authorization:**Mapoval OIDC `id_token` jako primární token nosiče API pro požadavky Dashscope, opravuje okamžité chyby 401 Unauthorized po připojení účtů nebo obnovení tokenů (#864) -**Stabilita API ZAI:**Hardened Server-Sent Events kompilátor pro elegantní návrat k prázdným řetězcům, když poskytovatelé DeepSeek streamují matematicky nulový obsah během fází uvažování (#871) -**Claude Code/Codex Translations:**Chráněné nestreamované konverze užitečného zatížení proti prázdným odpovědím z upstreamových nástrojů Codex, zabraňující katastrofickým TypeErrors (#866) -**NVIDIA NIM vykreslování:**Podmíněně odstraněné identické předpony poskytovatelů dynamicky vnucené audio modely, čímž se eliminují duplicitní struktury značek `nim/nim` vyvolávající 404 na Media Playground (#872)### ⚠️ Breaking Changes

-**Rozvržení protokolu požadavků:**Odstraněny staré vícesouborové relace protokolu požadavků `DATA_DIR/logs/` a souhrnný soubor `DATA_DIR/log.txt`. Nové požadavky jsou zapisovány jako jednotlivé JSON artefakty v `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Proměnné prostředí protokolování:**Nahrazeny `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` a `PROXY_LOG_MAX_ENTRIES` novou konfigurací `APP_LOG_*` a modelem `CALL_DAYS`RE -**Nastavení přepínání potrubí:**Nahrazeno původní nastavení `detailed_logs_enabled` za `call_log_pipeline_enabled`. Nové podrobnosti kanálu jsou vloženy do artefaktu požadavku, místo aby byly uloženy jako samostatné záznamy `request_detail_logs`.### 🛠️ Maintenance

-**Záloha upgradu starších žádostí o protokol:**Upgrady nyní před odstraněním zastaralé struktury archivují staré rozvržení `data/logs/`, starší `data/call_logs/` a `data/log.txt` do `DATA_DIR/log_archives/*.zip`. -**Stálost využití streamování:**Požadavky na streamování nyní po dokončení zapisují jeden řádek `usage_history` namísto toho, aby se vydával duplicitní řádek o probíhajícím využití s ​​prázdnými metadaty stavu. -**Pročištění následného protokolování:**Protokoly kanálu již nezachycují `SOURCE REQUEST`, položky artefaktů požadavků nyní respektují `CALL_LOG_MAX_ENTRIES` a archivy protokolů aplikací nyní respektují `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Funkce

-**Analýza využití předplatného:**Přidáno sledování časových řad snímku kvót, karty Využití poskytovatele a Combo Health s vizualizacemi překreslování a odpovídajícími koncovými body API (#847) -**Řízení zálohování SQLite:**Nový příznak env `OMNIROUTE_DISABLE_AUTO_BACKUP` pro zakázání automatického zálohování SQLite (#846) -**Aktualizace registru modelů:**Vložení `gpt-5.4-mini` do řady modelů poskytovatele Codexu (#756) -**Sledování limitu poskytovatele:**Sledovat a zobrazovat, kdy byly naposledy aktualizovány limity sazeb poskytovatele na účet (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Přesměrování dokončení Qwen OAuth z DashScope API na Web Inference API (`chat.qwen.ai`), vyřešení selhání autorizace (#844, #807, #832) -**Qwen Auto-Retry Loop:**Přidáno cílené 429 Quota Exceeded backoff handling uvnitř `chatCore` chránící shlukové požadavky -**Codex OAuth Fallback:**Blokování vyskakovacích oken v moderním prohlížeči již uživatele nezadržuje; automaticky se vrátí k ručnímu zadávání adresy URL (#808) -**Claude Token Refresh:**Přísné hranice `application/json` společnosti Anthropic jsou nyní respektovány při generování tokenů namísto kódovaných adres URL (#836) -**Schéma zpráv Codex:**Odstraněné puristické „zprávy“ vkládány z nativních požadavků na průchod, aby se zabránilo strukturálnímu odmítnutí ze strany ChatGPT upstream (#806) -**Limit velikosti detekce CLI:**Bezpečně navýšil horní hranici binárního skenování Node ze 100 MB na 350 MB, což umožnilo správně detekovat těžké samostatné nástroje jako Claude Code (229 MB) a OpenCode (153 MB) běhovým prostředím VPS (#809) -**CLI Runtime Environment:**Obnovená schopnost pro konfigurace CLI respektovat cesty přepsání uživatelem (`CLI_{PROVIDER}_BIN`), které obcházejí přísná pravidla zjišťování vázaná na cestu -**Konflikty záhlaví Nvidia:**Odstraněny vlastnosti `prompt_cache_key` z upstreamových záhlaví při volání neantropických poskytovatelů (#848) -**Codex Fast Tier Toggle:**Obnovené přepínání úrovně služeb Codex ve světlém režimu (#842) -**Testovací infrastruktura:**Aktualizovaný test `t28-model-catalog-updates`, který nesprávně očekával zastaralý koncový bod DashScope pro nativní registr Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Custom Provider Rotation:**Integrovaný `getRotatingApiKey` interně uvnitř DefaultExecutor, který zajišťuje správné spouštění rotace `extraApiKeys` pro vlastní a kompatibilní upstream poskytovatele (#815)---

## [3.3.8] - 2026-03-30

### Funkce

-**Filtrování API modelů:**Koncový bod `/v1/models` nyní dynamicky filtruje svůj seznam na základě oprávnění spojených s `Autorizace: Nosič <token>`, když je zapnutý omezený přístup (#781) -**Integrace Qoder:**Nativní integrace pro Qoder AI nativně nahrazující starší mapování platformy iFlow (#660) -**Prompt Cache Tracking:**Přidány možnosti sledování a vizualizace frontendu (karta Stats) pro sémantické a rychlé ukládání do mezipaměti v uživatelském rozhraní Dashboard### 🐛 Bug Fixes

-**Velikost panelu mezipaměti:**Vylepšené velikosti rozvržení uživatelského rozhraní a kontextové záhlaví pro stránky pokročilé mezipaměti (# 835) -**Ladit viditelnost postranního panelu:**Opraven problém, kdy přepínač ladění správně nezobrazoval/neskrýval podrobnosti ladění postranního panelu (#834) -**Předpona modelu Gemini:**Upraven záložní prostor jmen tak, aby správně směroval přes `gemini-cli/` místo `gc/`, aby respektoval upstream specifikace (#831) -**OpenRouter Sync:**Vylepšená synchronizace kompatibility pro automatické správné zpracování katalogu dostupných modelů z OpenRouter (#830) -**Mapování datového toku:**Reserializace argumentačních polí nativně řeší konfliktní cesty aliasů, když je výstup streamován na okrajová zařízení---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Restrukturalizovaný generovaný `opencode.json` tak, aby používal schéma založené na záznamech `@ai-sdk/openai-compatible` s `options` a `models` jako mapy objektů namísto plochých polí, oprava chyb ověření konfigurace (#816) -**i18n Missing Keys:**Přidán chybějící klíč překladu `cloudflaredUrlNotice` do všech 30 jazykových souborů, aby se zabránilo chybám konzole `MISSING_MESSAGE` na stránce Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Účtování tokenů:**Bezpečně zahrnuty tokeny rychlé mezipaměti ve výpočtech historických vstupů využití pro správné odpočty kvót (PR #822) -**Kombinované testovací sondy:**Opravena falešná negativa logiky kombinovaného testování vyřešením analýzy pro odpovědi pouze na uvažování a umožněním masivní paralelizace přes Promise.all (PR #828) -**Docker Quick Tunnels:**Vestavěné požadované ca-certifikáty uvnitř základního runtime kontejneru k vyřešení selhání při spuštění Cloudflared TLS a odhalených chyb sítě stdout nahrazujících obecné ukončovací kódy (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Přidáno sledování kvót Gemini CLI v reálném čase prostřednictvím `retrieveUserQuota` API (PR #825) -**Cache Dashboard:**Vylepšení Cache Dashboard pro zobrazení okamžitých metrik mezipaměti, 24hodinových trendů a odhadovaných úspor nákladů (PR #824)### 🐛 Bug Fixes

-**Uživatelská zkušenost:**Odstraněny invazivní automatické otevírání modálních smyček OAuth na neplodných podrobných stránkách poskytovatelů (PR #820) -**Aktualizace závislostí:**Vylepšené a uzamčené závislosti pro vývojové a produkční stromy včetně Next.js 16.2.1, Recharts a TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A Workflows:**Přidán deterministický FSM orchestrátor pro vícekrokové pracovní postupy agentů. -**Graceful Degradation:**Přidán nový vícevrstvý záložní rámec pro zachování základní funkčnosti během částečných výpadků systému. -**Config Audit:**Přidána auditní stopa s detekcí rozdílů pro sledování změn a povolení vrácení konfigurace. -**Provider Health:**Přidáno sledování vypršení platnosti poskytovatele s proaktivními upozorněními uživatelského rozhraní na končící klíče API. -**Adaptivní směrování:**Přidán adaptivní detektor hlasitosti a složitosti, který dynamicky potlačuje strategie směrování na základě zatížení. -**Rozmanitost poskytovatelů:**Implementováno hodnocení diverzity poskytovatelů prostřednictvím Shannonovy entropie pro zlepšení rozložení zátěže. -**Hranice automatické deaktivace:**Do ovládacího panelu odolnosti přidán přepínač nastavení Automatické deaktivace zakázaných účtů.### 🐛 Bug Fixes

-**Kompatibilita Codex & Claude:**Opravené výpadky uživatelského rozhraní, opravené problémy s integrací Codex bez streamování a vyřešená detekce běhového prostředí CLI ve Windows. -**Automatizace vydání:**Pro sestavení aplikace Electron v akcích GitHubu jsou vyžadována rozšířená oprávnění. -**Cloudflare Runtime:**Opraveny správné výstupní kódy izolace runtime pro komponenty tunelu Cloudflared.### 🧪 Tests

-**Aktualizace testovací sady:**Rozšířené testovací pokrytí pro detektory objemu, diverzitu poskytovatelů, audit konfigurace a FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Spolehlivost CI/CD:**Opravené akce GitHub pro stabilní verze závislostí (`actions/checkout@v4`, `actions/upload-artifact@v4`) ke zmírnění neohlášených ukončení podpory prostředí Builder. -**Obrázky Fallbacks:**Nahrazení libovolných záložních řetězců v `ProviderIcon.tsx` explicitním ověřením aktiv, aby se zabránilo načítání komponent `<Image>` uživatelského rozhraní pro soubory, které neexistují, což eliminuje chyby `404` v protokolech konzoly řídicího panelu (#745). -**Aktualizátor správce:**Dynamická detekce instalace zdroje pro aktualizaci řídicího panelu. Bezpečně deaktivuje tlačítko `Aktualizovat nyní`, když je OmniRoute sestaven lokálně, nikoli prostřednictvím npm, a vyzve k zadání `git pull` (#743). -**Chyba aktualizace ERESOLVE:**Vloženo přepsání `package.json` pro `react`/`react-dom` a povoleno `--legacy-peer-deps` v rámci interních skriptů automatického aktualizačního programu, aby se vyřešily konflikty prolomení stromu závislostí s `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Integrace Cloudflare Quick Tunnel s ovládacími prvky na palubní desce (PR #772). -**Diagnostika:**Obejití sémantické mezipaměti pro kombinované živé testy (PR #773).### 🐛 Bug Fixes

-**Stabilita streamování:**Aplikujte `FETCH_TIMEOUT_MS` na počáteční volání `fetch()` požadavků na streamování, abyste zabránili 300s časovému limitu Node.js TCP způsobujícímu selhání tiché úlohy (#769). -**i18n:**Přidejte chybějící položky `windsurf` a `copilot` do `toolDescriptions` ve všech 33 souborech národního prostředí (#748). -**Audit kódování GLM:**Kompletní audit poskytovatele opravující zranitelnosti ReDoS, velikost kontextového okna (128k/16k) a synchronizaci registru modelu (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Oprava záložního zpracování pro prvky `type: "text"` nesoucí nulové nebo prázdné datové sady, které způsobily zamítnutí 400 (#742). -**Opencode:**Aktualizujte zarovnání schématu na singulární `poskytovatel`, aby odpovídalo oficiální specifikaci (#774). -**Gemini CLI:**Vložení chybějících hlaviček kvót pro koncové uživatele, které zabrání zablokování autorizace 403 (#775). -**Obnova DB:**Refaktorujte vícedílné importy užitečného zatížení do nezpracovaných binárních polí s vyrovnávací pamětí, abyste obešli maximální limity těla reverzního proxy (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilizace vydání**— Dokončeno vydání v3.2.9 (kombo diagnostika, brány kvality, oprava nástroje Gemini) a vytvořen chybějící git tag. Sloučeny všechny etapové změny do jediného odevzdání atomového vydání.### 🐛 Bug Fixes

-**Test automatických aktualizací**– Opravený testovací výraz `buildDockerComposeUpdateScript`, aby odpovídal neexpandovaným odkazům na proměnné shellu (`$TARGET_TAG`, `${TARGET_TAG#v}`) ve vygenerovaném skriptu nasazení, v souladu s refaktorovanou šablonou z v3.2.8. -**Circuit Breaker Test**– Posílený `combo-circuit-breaker.test.mjs` pomocí injekce `maxRetries: 0`, aby se zabránilo opakování inflace před zkreslením počtu selhání během přechodů stavu jističe.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Zaveden příznak vynechání živého testu (`forceLiveComboTest`), který správcům umožňuje provádět skutečné kontroly stavu předřazeného systému, které obcházejí všechny místní mechanismy stavu jističů a chlazení, což umožňuje přesnou diagnostiku během průběžných výpadků (PR #759) -**Quality Gates**— Přidáno automatické ověřování kvality odezvy pro komba a oficiálně integrovaná podpora modelu `claude-4.6` do hlavních směrovacích schémat (PR #762)### 🐛 Bug Fixes

-**Ověření definice nástroje**– Opravená integrace rozhraní Gemini API normalizací typů výčtu uvnitř definic nástrojů, což zabraňuje chybám parametru HTTP 400 (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Uživatelské rozhraní automatické aktualizace Docker**– Integrovaný proces aktualizace na pozadí pro nasazení Docker Compose. Uživatelské rozhraní Dashboard nyní bezproblémově sleduje události životního cyklu aktualizací a kombinuje odpovědi JSON REST s překryvnými vrstvami průběhu streamování SSE pro robustní spolehlivost napříč prostředími. -**Analytika mezipaměti**– Opravené mapování vizualizace s nulovými metrikami migrací telemetrických protokolů sémantické mezipaměti přímo do modulu centralizovaného sledování SQLite.### 🐛 Bug Fixes

-**Authentication Logic**– Opravena chyba, kdy ukládání nastavení řídicího panelu nebo přidávání modelů selhalo s chybou 401 Unauthorized, když bylo zakázáno `requireLogin`. Koncové body API nyní správně vyhodnocují přepínač globálního ověřování. Globální přesměrování vyřešeno opětovnou aktivací `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Zabránění fatálním inicializačním výjimkám během detekce prostředí CLI správným zachycením chyb `cross-spawn` ENOENT. Přidá explicitní detekční cesty pro `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**– Normalizované parametry překladu modelu zabraňující otravě kontextu v režimu proxy pass-through, vynucující generická omezení `store: false` explicitně pro všechny požadavky pocházející z Codexu. -**SSE Token Reporting**– Normalizovaná detekce `finish_reason` z důvodu volání nástroje poskytovatele, oprava 0% analýzy využití u odpovědí pouze pro stream bez přísných indikátorů `<DONE>`. -**DeepSeek <think> Tags**— Implementováno explicitní mapování extrakce `<think>` uvnitř `responsesHandler.ts`, což zajišťuje, že se proudy uvažování DeepSeek mapují ekvivalentně k nativním antropickým strukturám `<thinking>`.---

## [3.2.7] - 2026-03-29

### Fixed

-**Bezproblémové aktualizace uživatelského rozhraní**: Funkce „Aktualizovat nyní“ na řídicím panelu nyní poskytuje živou a transparentní zpětnou vazbu pomocí událostí odeslaných serverem (SSE). Provádí instalaci balíčků, přestavby nativních modulů (better-sqlite3) a spolehlivě se restartuje PM2, přičemž místo tichého zavěšení zobrazuje zavaděče v reálném čase.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**– Přidán tok kopírování klíče API s rozsahem ve Správci rozhraní API, chráněný proměnnou prostředí `ALLOW_API_KEY_REVEAL`. -**Ovládací prvky viditelnosti postranního panelu (#739)**– Správci nyní mohou pomocí nastavení vzhledu skrýt jakýkoli navigační odkaz na postranním panelu, aby se omezil vizuální nepořádek. -**Přísné kombinované testování (#735)**– Posílený koncový bod kontroly stavu kombinace tak, aby vyžadoval živé textové odpovědi od modelů namísto pouze měkkých signálů dosažitelnosti. -**Podrobné protokoly streamovaného proudu (#734)**— Přepnutí podrobného protokolování požadavků pro streamy SSE za účelem rekonstrukce konečného užitečného zatížení, což ušetří obrovské množství velikosti databáze SQLite a výrazně vyčistí uživatelské rozhraní.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Opravena logika autentizační hlavičky pro modely `minimax` na OpenCode Go, aby se v protokolu `/messages` používal `x-api-key` místo standardních tokenů nosiče.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integrovaná šablona balení `xbps-src` a pokyny pro nativní kompilaci a instalaci OmniRoute s vazbami `better-sqlite3` prostřednictvím cíle křížové kompilace.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Kompletní migrace staršího poskytovatele jádra `iFlow` na `Qoder AI` se stabilními schopnostmi směrování API.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— Zabráněno vkládání pole `thoughtSignature` do standardních sekvencí `functionCall` Gemini blokujících toky směrování agentů.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Uživatelské rozhraní kvóty pro poskytovatele (#728)**— Normalizovaná logika limitů kvót a označování dat v rozhraní Limits.### 🐛 Bug Fixes

-**Core Routing Schemas & Leaks**— Expanded `comboStrategySchema` to natively support `fill-first` and `p2c` strategies to unblock complex combo editing natively. -**Thinking Tags Extraction (CLI)**— Restructured CLI token responses sanitizer RegEx capturing model reasoning structures inside streams avoiding broken `<thinking>` extractions breaking response text output format. -**Vynucení přísného formátu**– Posílené provádění sanitace potrubí, díky čemuž je univerzálně použitelné pro cíle režimu překladu.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Čtyřfázový kanál protokolu požadavků (#705)**– Refaktorovaná perzistence protokolů pro úsporu komplexních dat ve čtyřech různých fázích kanálu: požadavek klienta, přeložený požadavek poskytovatele, odezva poskytovatele a přeložená odezva klienta. Zaveden `streamPayloadCollector` pro robustní zkrácení streamu SSE a serializaci užitečného zatížení.### 🐛 Bug Fixes

-**Opravy mobilního uživatelského rozhraní (#659)**– Zabránění komponentám tabulky na řídicím panelu v narušení rozvržení v úzkých výřezech přidáním správného vodorovného posouvání a omezení přetečení do „DashboardLayout“. -**Opravy Claude Prompt Cache (#708)**— Zajištěno, že bloky `cache_control` v záložních smyčkách Claude-to-Claude jsou věrně zachovány a bezpečně předány zpět do modelů Anthropic. -**Definice nástroje Gemini (#725)**— Opraveny chyby překladu schématu při deklarování jednoduchých typů parametrů „objekt“ pro volání funkce Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Když jsou vyčerpány všechny kombinované modely (502/503), OmniRoute se nyní pokusí o konfigurovatelný globální záložní model, než vrátí chybu. Povolte nastavení `globalFallbackModel` v nastavení.### 🐛 Bug Fixes

-**Oprava #721**— Opraveno vynechání připnutí kontextu během odpovědí na volání nástroje. Nestreamované značkování používalo nesprávnou cestu JSON (`json.messages` → `json.choices[0].message`). Vkládání streamování se nyní spouští u bloků `finish_reason` pro streamy pouze pro volání nástroje. `injectModelTag()` nyní přidává syntetické pinové zprávy pro neřetězcový obsah. -**Oprava #709**— Potvrzeno již opraveno (v3.1.9) — `system-info.mjs` vytváří adresáře rekurzivně. ZAVŘENO. -**Oprava #707**— Potvrzeno již opraveno (v3.1.9) — prázdná dezinfekce názvu nástroje v `chatCore.ts`. ZAVŘENO.### 🧪 Tests

- Přidáno 6 testů jednotek pro připínání kontextu s odezvami na volání nástroje (nulový obsah, obsah pole, zpáteční cesta, opětovné vložení)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Uživatelské rozhraní pro správu mezipaměti**– Přidán vyhrazený řídicí panel sémantické mezipaměti na \`/dashboard/cache\` s cíleným zrušením platnosti API a podporou 31 jazyků i18n (PR #701 od @oyi77)
–**Sledování kvót GLM**– Přidáno sledování využití v reálném čase a sledování kvót relací pro poskytovatele kódování GLM (Z.AI) (PR #698 od @christopher-s) -**Detailed Log Payloads**— Kabelové úplné čtyřfázové zachycování užitečného zatížení kanálu (originál, přeložený, odezva poskytovatele, streamované-delty) přímo do uživatelského rozhraní (PR #705 od @rdself)### 🐛 Bug Fixes

-**Oprava #708**— Zabránění úniku tokenů pro uživatele Claude Code směrující přes OmniRoute správným zachováním nativních hlaviček \`cache_control\` během průchodu Claude-to-Claude (PR #708 od @tombii) -**Oprava #719**– Nastavení hranic interního ověření pro \`ModelSyncScheduler\`, aby se zabránilo neověřeným selháním démona při spuštění (PR #719 od @rdself) -**Oprava #718**— Přestavěné vykreslování odznaku v uživatelském rozhraní Limity poskytovatele, které zabraňuje překrývání špatných hranic kvót (PR #718 od @rdself)
–**Oprava č. 704**– Opravené chyby Combo Fallbacks při chybách obsahových zásad HTTP 400, které brání mrtvému směrování při rotaci modelu (PR #704 od @rdself)### 🔒 Security & Dependencies

- Nakopnuta \`cesta k-regexpu\` do \`8.4.0\` řešící zranitelnosti Dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Oprava #706**— Opraveno vykreslování záložních ikon způsobených přepsáním `font-sans` Tailwind V4 použitím `!important` na `.material-symbols-outlined`. -**Oprava #703**– Opraveno přerušené streamy GitHub Copilot povolením „odpovědí“ na překlad formátu „openai“ pro jakékoli vlastní modely využívající „apiFormat: „responses“`.
-**Oprava č. 702**— Nahrazení paušálního sledování využití přesnými výpočty cen DB pro odezvy streamování i nestreamování.
-**Oprava #716**— Vyčištěn stav překladu volání nástroje Claude, správně analyzovat argumenty streamování a zabránit blokům OpenAI `tool_calls`v opakování pole`id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**– Automatické vynucování řetězců kódovaných numerických omezení schématu JSON (např. „minimum“: „1“) na správné typy, čímž se zabrání 400 chybám od klientů Cursor, Cline a dalších klientů odesílaných chybně tvarovaná schémata nástrojů. -**Dezinfekce popisu nástroje**— Zajistěte, aby popisy nástrojů byly vždy řetězce; před odesláním poskytovatelům převede `null`, `undefined` nebo číselné popisy na prázdné řetězce. -**Tlačítko Vymazat všechny modely**– Přidány překlady i18n pro akci poskytovatele „Vymazat všechny modely“ ve všech 30 jazycích. -**Codex Auth Export**– Přidána tlačítka exportu Codex `auth.json` a místní aplikace pro bezproblémovou integraci CLI. -**Poznámky BYOK pro Windsurf**— Do karty nástrojů Windsurf CLI byla přidána oficiální upozornění na omezení, která dokumentují omezení BYOK.### 🐛 Bug Fixes

-**Oprava #709**— `system-info.mjs` již nepadá, když výstupní adresář neexistuje (přidán `mkdirSync` s rekurzivním příznakem). -**Oprava č. 710**— A2A `TaskManager` singleton nyní používá `globalThis` k zabránění úniku stavu při rekompilaci trasy Next.js API v režimu pro vývojáře. Testovací sada E2E byla aktualizována, aby zvládla 401 elegantně. -**Oprava #711**— Přidáno vynucení omezení `max_tokens` specifické pro poskytovatele pro upstream požadavky. -**Oprava #605 / #592**— Odstraňte předponu `proxy_` z názvů nástrojů v odpovědích Claude, které se nestreamují; opravena ověřovací URL LongCat. -**Call Logs Max Cap**– Upgradovaný `getMaxCallLogs()` s vrstvou mezipaměti, podporou env var (`CALL_LOGS_MAX`) a integrací nastavení DB.### 🧪 Tests

- Testovací sada rozšířena z 964 → 1027 testů (63 nových testů)
- Přidán `schema-coercion.test.mjs` — 9 testů pro vynucení numerického pole a dezinfekci popisu nástroje
- Přidán `t40-opencode-cli-tools-integration.test.mjs` — testy integrace OpenCode/Windsurf CLI
- Rozšířená větev testů funkcí s komplexními nástroji pro pokrytí### 📁 New Files

| Soubor                                                   | Účel                                                |
| -------------------------------------------------------- | --------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schéma donucení a popis nástroje sanitační nástroje |
| `tests/unit/schema-coercion.test.mjs`                    | Unit testy pro schéma nátlaku                       |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Testy integrace nástroje CLI                        |
| `COVERAGE_PLAN.md`                                       | Dokument plánování pokrytí testů                    | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Opraveno odstraňování značek cache_control v režimu Claude passthrough (Claude → OmniRoute → Claude), což způsobilo, že uživatelé Claude Code vyčerpali svou kvótu Antropického API 5-10x rychleji než přímá připojení. OmniRoute nyní zachovává klientské značky cache_control, když sourceFormat i targetFormat jsou Claude, což zajišťuje správné fungování rychlého ukládání do mezipaměti a dramaticky snižuje spotřebu tokenů.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Jádro platformy:**Implementováno zpracování globálního stavu pro skryté modely a komba, které jim brání v zahlcení katalogu nebo úniku do připojených agentů MCP (#681). -**Stabilita:**Opravené pády streamování související se selháním integrace nativního poskytovatele Antigravity kvůli neošetřeným polím s nedefinovaným stavem (#684). -**Localization Sync:**Nasazen plně přepracovaný synchronizátor `i18n`, který detekuje chybějící vnořené vlastnosti JSON a dovybavuje 30 lokalit postupně (#685).## [3.1.7] - 27. 3. 2026### 🐛 Bug Fixes

-**Stabilita streamování:**Opraveno `hasValuableContent` vracející `undefined` pro prázdné bloky v tocích SSE (#676). -**Tool Calling:**Opraven problém v `sseParser.ts`, kdy nestreamingové odpovědi Claude s vícenásobným voláním nástrojů vynechávaly `id` následných volání nástrojů kvůli nesprávné deduplikaci na základě indexu (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Názvy nástrojů jako `TodoWrite` již nemají předponu `proxy_` v Claude passthrough odpovědích (streaming i non-streaming). Zahrnuje pokrytí testem jednotky (PR #663 od @coobabm) -**Vyčistit všechny modely aliasů**— Tlačítko „Vymazat všechny modely“ nyní také odstraní přidružené aliasy modelu, čímž zabrání duchům modelů v uživatelském rozhraní (PR #664 od @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Automatický úpadek Backoff**– Účty s omezenou rychlostí se nyní automaticky obnovují, když vyprší jejich cooldown období, čímž se opravuje patová situace, kdy vysoká `backoffLevel` trvale odebrala prioritu účtům (PR #657 od @brendandebeasi)### 🌍 i18n

-**Oprava překladu do čínštiny**— Komplexní přepsání `zh-CN.json` s vylepšenou přesností (PR #658 od @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Oprava přepisu streamování**– Explicitní `stream: true` v těle požadavku má nyní přednost před hlavičkou `Accept: application/json`. Klienti, kteří odesílají obojí, správně obdrží SSE streamingové odpovědi (#656)### 🌍 i18n

-**Vylepšení českého řetězce**— Vylepšená terminologie napříč `cs.json` (PR #655 od @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 chybějících překladových klíčů**přidáno do „en.json“ a 12 jazyků (PR #652 od @zen0bit) -**Česká dokumentace aktualizována**— CLI-TOOLS, API_REFERENCE, průvodce VM_DEPLOYMENT (PR #652) -**Skripty pro ověření překladu**— `check_translations.py` a `validate_translation.py` pro CI/QA (PR #651 od @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritické: Regrese volání nástroje**— Opraveny chyby `proxy_Bash` vypnutím předpony názvu nástroje `proxy_` v průchodové cestě Claude. Nástroje jako `Bash`, `Read`, `Write` byly přejmenovány na `proxy_Bash`, `proxy_Read` atd., což způsobilo, že je Claude odmítl (#618) -**Dokumentace o zákazu účtu Kiro**– zdokumentováno jako falešně pozitivní proti podvodům AWS, nejedná se o problém s OmniRoute (#649)### 🧪 Tests

-**936 testů, 0 selhání**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadata schopnosti vidění**: Přidány `capabilities.vision`, `input_modalities` a `output_modalities` do položek `/v1/models` pro modely schopné vidění (PR #646) -**Modely Gemini 3.1**: Přidány `gemini-3.1-pro-preview` a `gemini-3.1-flash-lite-preview` k poskytovateli Antigravity (#645)### 🐛 Bug Fixes

-**Chyba Ollama Cloud 401**: Opravena nesprávná základní adresa URL rozhraní API – změněno z `api.ollama.com` na oficiální `ollama.com/v1/chat/completions` (#643) -**Opakování tokenu s vypršenou platností**: Přidáno omezené opakování s exponenciálním stažením (5→10→20 min) pro vypršená připojení OAuth namísto jejich trvalého přeskakování (PR #647)### 🧪 Tests

-**936 testů, 0 selhání**---

## [3.1.0] — 2026-03-26

### ✨ New Features

–**Šablony problémů GitHubu**: Přidány standardizované hlášení o chybě, žádosti o funkce a šablony problémů s konfigurací/proxy (#641) -**Vymazat všechny modely**: Přidáno tlačítko "Vymazat všechny modely" na stránku s podrobnostmi o poskytovateli s podporou i18n ve 29 jazycích (#634)### 🐛 Bug Fixes

-**Locale Conflict (`in.json`)**: Přejmenován soubor národního prostředí pro hindštinu z `in.json` (indonéský kód ISO) na `hi.json`, aby byly opraveny konflikty překladů ve Weblate (#642) -**Prázdné názvy nástrojů v kódu**: Čištění názvů nástrojů přesunuto před nativní průchod kódu Codex, oprava 400 chyb od dodavatelů, když nástroje měly prázdné názvy (#637) -**Streamování artefaktů nového řádku**: Do dezinfekčního prostředku odezvy přidáno `collapseExcessiveNewlines`, sbalení běhů 3+ po sobě jdoucích nových řádků z myslících modelů do standardního dvojitého nového řádku (#638) -**Claude Reasoning Effort**: Převeden parametr OpenAI `reasoning_effort` na Claudův nativní blok rozpočtu `myšlení` napříč všemi cestami požadavků, včetně automatické úpravy `max_tokens` (#627) -**Obnovení tokenu Qwen**: Implementováno proaktivní obnovení tokenu OAuth před vypršením platnosti (5minutová vyrovnávací paměť), aby se zabránilo selhání požadavků při použití tokenů s krátkou životností (#631)### 🧪 Tests

-**936 testů, 0 selhání**(+10 testů od 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Tokeny NaN v kódu Claude / odpovědi klienta (#617):**

- `sanitizeUsage()` nyní křížově mapuje `input_tokens`→`prompt_tokens` a `output_tokens`→`completion_tokens` před filtrem bílé listiny a opravuje odpovědi zobrazující počty tokenů NaN/0, když poskytovatelé vrátí názvy polí použití ve stylu Claude### Bezpečnost

- Aktualizovaný balíček `yaml`, který opravuje zranitelnost přetečení zásobníku (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

– Uzavřeno #613 (Codestrální – vyřešeno řešením Custom Provider)

- Komentář k #615 (OpenCode duální koncový bod – řešení poskytnuto, sledováno jako požadavek na funkci)
  – Komentováno #618 (viditelnost volání nástroje – vyžaduje test verze 3.0.9)
- Komentováno #627 (úroveň úsilí – již podporováno)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Chyby překladu pro poskytovatele formátu OpenAI v Claude CLI (#632):**

- Zpracovat formát pole `reasoning_details[]` ze StepFun/OpenRouter — převede se na `reasoning_content`
- Zpracovat alias pole `reasoning` od některých poskytovatelů → normalizováno na `reasoning_content`
- Názvy polí použití napříč mapami: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` v `filterUsageFormat`
- Opravte `extractUsage`, aby akceptoval jak `input_tokens`/`output_tokens`, tak `prompt_tokens`/`completion_tokens` jako platná pole použití
- Vztahuje se na cesty streamování (`sanitizeStreamingChunk`, překladač `openai-to-claude.ts`) i nestreamingové cesty (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Opravená chyba `client_secret is missing` pro uživatele nainstalované npm – `clientSecretDefault` byl prázdný v providerRegistry, což způsobilo, že Google odmítl požadavky na obnovení tokenu (#588) -**OpenCode Zen Models:**Přidáno `modelsUrl` do položky registru OpenCode Zen, takže "Import z /models" funguje správně (#612) -**Artefakty streamování:**Opraveno nadměrné množství nových řádků zanechaných v odpovědích po odstranění podpisu značky myšlení (#626) -**Proxy Fallback:**Přidáno automatické opakování bez proxy, když relé SOCKS5 selže -**Test proxy:**Testovací koncový bod nyní řeší skutečné přihlašovací údaje z DB prostřednictvím proxyId### ✨ New Features

-**Výběr účtu/klíče Playground:**Trvalá, vždy viditelná rozbalovací nabídka pro výběr konkrétních účtů/klíčů poskytovatelů pro testování – načte všechna připojení při spuštění a filtry podle vybraného poskytovatele -**CLI Tools Dynamic Models:**Výběr modelu se nyní dynamicky načítá z `/v1/models` API – poskytovatelé jako Kiro nyní zobrazují svůj úplný katalog modelů -**Seznam antigravitačních modelů:**Aktualizováno o Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; povoleno „passthroughModels“ pro dynamický přístup k modelu (#628)### 🔧 Maintenance

- Sloučené PR #625 — Oprava pozadí ve světlém režimu poskytovatele---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limity/Proxy:**Opravené načítání limitu Codexu pro účty za proxy servery SOCKS5 – obnovení tokenu nyní běží v kontextu proxy -**CI:**Opravená chyba uplatnění testu integrace `v1/models` v prostředí CI bez připojení k poskytovateli -**Nastavení:**Testovací tlačítko proxy nyní okamžitě zobrazuje výsledky úspěchu/neúspěchu (dříve skryté za zdravotními údaji)### ✨ New Features

-**Hřiště:**Přidána rozevírací nabídka pro výběr účtu – pokud má poskytovatel více účtů, otestujte konkrétní připojení jednotlivě### 🔧 Maintenance

- Sloučené PR #623 — oprava základní cesty URL rozhraní LongCat API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Uživatelské rozhraní Limity:**Do ovládacího panelu připojení byla přidána funkce seskupování značek, která zlepšuje vizuální organizaci účtů s vlastními značkami.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streamování:**Opraveno poškození stavu `TextDecoder` uvnitř combo `sanitize` TransformStream, které způsobilo zkomolený výstup SSE odpovídající vícebajtovým znakům (PR #614) -**Uživatelské rozhraní poskytovatelů:**Bezpečně vykreslujte značky HTML v popisech chyb připojení poskytovatele pomocí `dangerouslySetInnerHTML` -**Nastavení proxy:**Přidány chybějící vlastnosti těla užitečného obsahu `username` a `password`, které umožňují úspěšné ověření ověřených proxy z řídicího panelu. -**Rozhraní API poskytovatele:**Vázaná měkká výjimka se vrátí na `getCodexUsage`, která zabrání selhání API HTTP 500, když selže načítání tokenu---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modely s automatickou synchronizací:**Přidán přepínač uživatelského rozhraní a koncový bod „synchronizace modelů“ pro automatickou synchronizaci seznamů modelů podle poskytovatele pomocí plánovaného plánovače intervalů (PR #597)### 🐛 Bug Fixes

-**Časové limity:**Zvýšení výchozích proxy serverů `FETCH_TIMEOUT_MS` a `STREAM_IDLE_TIMEOUT_MS` na 10 minut, aby správně podporovaly modely hlubokého uvažování (jako o1) bez přerušení požadavků (Oprava #609) -**CLI Tool Detection:**Vylepšená detekce mezi platformami zpracovávající cesty NVM, Windows `PATHEXT` (zabraňující problému `.cmd` wrapper) a vlastní předpony NPM (PR #598) -**Protokoly streamování:**Implementovaná akumulace rozdílu `tool_calls` v protokolech odpovědí streamování, takže volání funkcí jsou přesně sledována a uchovávána v DB (PR #603) -**Katalog modelů:**Odebrána výjimka z autentizace, řádně skrývá modely `comfyui` a `sdwebui`, když není explicitně nakonfigurován žádný poskytovatel (PR #599)### 🌐 Translations

-**cs:**Vylepšené české překladové řetězce v celé aplikaci (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Přidáno pole Tag/Group do `EditConnectionModal` (uložené v `providerSpecificData.tag`) bez nutnosti migrace schémat DB.
- Připojení v zobrazení poskytovatele se nyní dynamicky seskupují podle značek s vizuálními oddělovači.
- Neoznačená připojení se zobrazí jako první bez záhlaví, poté následují označené skupiny v abecedním pořadí.
- Seskupení tagů se automaticky vztahuje na sekci Codex/Copilot/Antigravity Limits, protože v řadách připojení existují přepínače.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Chybějící odznaky na kartách připojení:**Opraveno použitím `resolveProxyForConnection()` místo statického mapování. -**Test připojení zakázáno v uloženém režimu:**Aktivovalo tlačítko Test vyřešením konfigurace proxy z uloženého seznamu. -**Konfigurační modální zmrazení:**Přidáno volání `onClose()` po uložení/vymazání, aby se zabránilo zamrznutí uživatelského rozhraní. -**Dvojnásobné počítání využití:**`ProxyRegistryManager` nyní načítá využití dychtivě při připojení s deduplikací pomocí `scope` + `scopeId`. Počty využití byly nahrazeny tlačítkem Test zobrazujícím IP/latenci inline.#### fix(translator): `function_call` prefix stripping

- Opravena neúplná oprava z PR #607, kde pouze bloky `tool_use` odstranily Claudovu předponu `proxy_`. Nyní klienti používající formát OpenAI Responses API také správně obdrží nástroje nástrojů bez předpony `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tři kritické regrese hlášené uživateli po uvedení verze 3.0.0 byly vyřešeny.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Předpona `proxy_` přidaná Claudem OAuth byla pouze odstraněna z odpovědí**streamování**. V**nestreamingovém**režimu neměl `translateNonStreamingResponse` žádný přístup k `toolNameMap`, což způsobilo, že klienti dostávali pozměněné názvy nástrojů jako `proxy_read_file` místo `read_file`.

**Oprava:**Přidán volitelný parametr `toolNameMap` do `translateNonStreamingResponse` a aplikováno odstranění předpon v obslužném programu bloku Claude `tool_use`. `chatCore.ts` nyní prochází mapou.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI neodhaluje `GET /v1/models`. Obecný validátor `validateOpenAICompatibleProvider` propadl nouzovi dokončení chatu pouze v případě, že bylo nastaveno `validationModelId`, které LongCat nekonfiguruje. To způsobilo selhání ověření poskytovatele se zavádějící chybou při přidání/uložení.

**Oprava:**Do mapy speciálních validátorů přidáno `longcat`, které přímo zjišťuje `/chat/completions` a jakoukoli neautorizační odpověď považuje za povolení.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Nástroje MCP (např. `pencil`, `computer_use`) předávají definice nástrojů s `{type:"object"}`, ale bez pole `properties`. Rozhraní API společnosti Anthropic je odmítá s: `schema objektu chybí vlastnosti`.

**Oprava:**V `openai-to-claude.ts` vložte `properties: {}` jako bezpečné výchozí nastavení, když `type` je `"object"` a `properties` chybí.---

### 🔀 Community PRs Merged (2)

| PR       | Autor   | Shrnutí                                                                                     |
| -------- | ------- | ------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): oprava ruského překladu pro Playground a Testbed                                |
| **#591** | @rdself | fix(ui): zlepšení kontrastu světelného režimu limitů poskytovatele a zobrazení úrovně plánu | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 testů, 0 selhání**(beze změny od verze 3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Největší verze všech dob.**Od 36 poskytovatelů ve verzi 2.9.5 po**67+ poskytovatelů**ve verzi 3.0.0 — se serverem MCP, protokolem A2A, automatickým kombinovaným modulem, ikonami poskytovatelů, rozhraním API pro registrované klíče, 926 testy a příspěvky od**12 členů komunity**napříč**10 sloučenými PR**.
>
> Konsolidováno od v3.0.0-rc.1 do rc.17 (17 kandidátů na vydání během 3 dnů intenzivního vývoje).---

### 🆕 New Providers (+31 since v2.9.5)

| Poskytovatel                  | Přezdívka       | Úroveň           | Poznámky                                                                                    |
| ----------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | Zdarma           | 3 modely přes `opencode.ai/zen/v1` (PR #530 od @kang-heewon)                                |
| **OpenCode Go**               | `opencode-go`   | Zaplaceno        | 4 modely přes `opencode.ai/zen/go/v1` (PR #530 od @kang-heewon)                             |
| **LongCat AI**                | "lc"            | Zdarma           | 50 milionů tokenů/den (Flash-Lite) + 500 000/den (Chat/Thinking) během veřejné beta verze   |
| **Opylení AI**                | "pol"           | Zdarma           | Není potřeba žádný klíč API — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)       |
| **Cloudflare Workers AI**     | `cf`            | Zdarma           | 10 000 neuronů/den – ~ 150 LLM odezev nebo 500 s Whisper zvuk, okrajová inference           |
| **Scaleway AI**               | `scw`           | Zdarma           | 1 milion bezplatných tokenů pro nové účty – v souladu s EU/GDPR (Paříž)                     |
| **AI/ML API**                 | "aiml"          | Zdarma           | 0,025 $/den bezplatné kredity – více než 200 modelů prostřednictvím jediného koncového bodu |
| **Puter AI**                  | "pu"            | Zdarma           | 500+ modelů (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                       |
| **Alibaba Cloud (DashScope)** | "ali"           | Zaplaceno        | Mezinárodní a čínské koncové body přes `alicode`/`alicode-intl`                             |
| **Kódovací plán Alibaba**     | `bcp`           | Zaplaceno        | Alibaba Model Studio s rozhraním API kompatibilním s Anthropic                              |
| **Kimi kódování (klíč API)**  | "kmca"          | Zaplaceno        | Vyhrazený přístup Kimi založený na klíči API (odděleně od OAuth)                            |
| **Kódování MiniMax**          | "minimax"       | Zaplaceno        | Mezinárodní koncový bod                                                                     |
| **MiniMax (Čína)**            | `minimax-cn`    | Zaplaceno        | Koncový bod specifický pro Čínu                                                             |
| **Z.AI (GLM-5)**              | "zai"           | Zaplaceno        | Modely GLM nové generace Zhipu AI                                                           |
| **Vertex AI**                 | "vertex"        | Zaplaceno        | Google Cloud — servisní účet JSON nebo OAuth access_token                                   |
| **Ollama Cloud**              | "ollamacloud"   | Zaplaceno        | Ollama hostovaná API služba                                                                 |
| **Syntetické**                | "syntetický"    | Zaplaceno        | Průchozí modely brány                                                                       |
| **Kilo Gateway**              | "kg"            | Zaplaceno        | Průchozí modely brány                                                                       |
| **Perplexity Search**         | `pplx-search`   | Zaplaceno        | Vyhrazený koncový bod založený na vyhledávání                                               |
| **Serper Search**             | `serper-search` | Zaplaceno        | Integrace rozhraní API pro vyhledávání na webu                                              |
| **Odvážné hledání**           | `brave-hledej`  | Zaplaceno        | Integrace Brave Search API                                                                  |
| **Exa Search**                | "exa-search"    | Zaplaceno        | Integrace API pro neuronové vyhledávání                                                     |
| **Tavily Search**             | `tavily-search` | Zaplaceno        | Integrace rozhraní API pro vyhledávání AI                                                   |
| **NanoBanana**                | `nb`            | Zaplaceno        | API pro generování obrázků                                                                  |
| **ElevenLabs**                | "el"            | Zaplaceno        | Hlasová syntéza převodu textu na řeč                                                        |
| **Cartesia**                  | "kartézie"      | Zaplaceno        | Ultra rychlá syntéza hlasu TTS                                                              |
| **PlayHT**                    | "hra"           | Zaplaceno        | Klonování hlasu a TTS                                                                       |
| **Ve světě**                  | "ve světě"      | Zaplaceno        | Hlasový chat postav AI                                                                      |
| **SD WebUI**                  | `sdwebui`       | Vlastní hostitel | Generování lokálního obrazu stabilní difúze                                                 |
| **ComfyUI**                   | 'comfyui'       | Vlastní hostitel | Generování lokálního pracovního postupu ComfyUI založené na uzlech                          |
| **Kódování GLM**              | `glm`           | Zaplaceno        | Koncový bod specifický pro kódování BigModel/Zhipu                                          | **Celkem: 67+ poskytovatelů**(4 zdarma, 8 OAuth, 55 API klíč) + neomezený vlastní poskytovatelé kompatibilní s OpenAI/Anthropic.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Automaticky generujte a vydávejte klíče rozhraní API OmniRoute programově s vynucováním kvót pro jednotlivé poskytovatele a účty.

| Koncový bod                       | Metoda       | Popis                                                           |
| --------------------------------- | ------------ | --------------------------------------------------------------- |
| `/api/v1/registrované-klíče`      | 'POST'       | Vydejte nový klíč – nezpracovaný klíč se vrátil**pouze jednou** |
| `/api/v1/registrované-klíče`      | "ZÍSKAT"     | Vypsat registrované klíče (maskované)                           |
| `/api/v1/registrované-klíče/{id}` | "GET/DELETE" | Získat metadata / Zrušit                                        |
| `/api/v1/quotas/check`            | "ZÍSKAT"     | Před vydáním kvóty ověřte                                       |
| `/api/v1/providers/{id}/limits`   | "GET/PUT"    | Konfigurace limitů vydávání na poskytovatele                    |
| `/api/v1/accounts/{id}/limits`    | "GET/PUT"    | Konfigurace limitů vydávání na účet                             |
| `/api/v1/issues/report`           | 'POST'       | Hlásit události kvót na GitHub Issues                           |

**Zabezpečení:**Klíče uložené jako hash SHA-256. Nezpracovaný klíč zobrazený jednou při vytvoření, nikdy jej nelze znovu získat.#### 🎨 Provider Icons via @lobehub/icons (#529)

Více než 130 log poskytovatelů používajících komponenty React (SVG) `@lobehub/icons`. Záložní řetězec:**Lobehub SVG → existující PNG → obecná ikona**. Používá se na stránkách Dashboard, Providers a Agents se standardizovanou komponentou `ProviderIcon`.#### 🔄 Model Auto-Sync Scheduler (#488)

Automaticky obnovuje seznamy modelů pro připojené poskytovatele každých**24 hodin**. Běží při startu serveru. Konfigurovatelné pomocí `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Mapujte vzory názvů modelů (glob) na konkrétní kombinace pro automatické směrování:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nová tabulka `model_combo_mappings` s porovnáváním glob-to-regex
- Sekce uživatelského rozhraní řídicího panelu: "Pravidla směrování modelu" s vloženým přidáním/úpravou/přepínáním/mazáním#### 🧭 API Endpoints Dashboard

Interaktivní katalog, správa webhooků, prohlížeč OpenAPI – to vše na jedné kartě v `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nových integrací poskytovatelů vyhledávání:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**– umožňující uzemněné reakce umělé inteligence s webovými daty v reálném čase.#### 📊 Search Analytics

Nová karta v `/dashboard/analytics` – rozdělení poskytovatelů, míra návštěvnosti mezipaměti, sledování nákladů. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Sloupce `max_requests_per_day` a `max_requests_per_minute` s vynucením posuvného okna v paměti, které vrací HTTP 429.#### 🎵 Media Playground

Kompletní hřiště pro generování médií na `/dashboard/media`: generování obrázků, videa, hudby, přepisu zvuku (limit pro nahrávání 2 GB) a převodu textu na řeč.---

### 🔒 Security & CI/CD

-**Oprava CodeQL**– Opraveno 10+ výstrah: 6 opakování polynomu, 1 nezabezpečená náhodnost (`Math.random()` → `crypto.randomUUID()`), 1 vložení příkazu shellu -**Ověření trasy**— Schémata Zod + `validateBody()` na**176/176 trasách API**— Vynuceno CI -**CVE oprava**– dompurifikace zranitelnosti XSS (GHSA-v2wj-7wpq-c8vv) vyřešena pomocí přepsání npm -**Zploštělý**– Naražený 3.3.3 → 3.4.2 (znečištění prototypu CWE-1321) -**Docker**– Upgradovaný `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: vymažte chybu, kterou lze provést, když v Dockeru chybí „GEMINI_OAUTH_CLIENT_SECRET“ -**#549**— Cesty nastavení CLI nyní rozlišují skutečný klíč API z `keyId` (nikoli maskovaných řetězců) -**#574**— Přihlášení již nezamrzá po přeskočení nastavení hesla průvodce -**#506**— Přepsáno `machineId` napříč platformami (Windows REG.exe → macOS ireg → Linux → záložní název hostitele)#### Providers & Routing

-**#536**— LongCat AI: opraveny `baseUrl` a `authHeader` -**#535**— Přepsání připnutého modelu: `body.model` správně nastaveno na `pinnedModel` -**#570**— Modely Claude bez předpony se nyní převádějí na poskytovatele Anthropic -**#585**— Interní značky `<omniModel>` již neunikají klientům při streamování SSE -**#493**— Pojmenování modelu vlastního poskytovatele již není narušeno odstraňováním předpon -**#490**— Streamování + ochrana kontextové mezipaměti prostřednictvím vkládání `TransformStream` -**#511**— Značka `<omniModel>` vložena do prvního bloku obsahu (nikoli za `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + smyčka Codex: bloky `tool_result` nyní převedeny na text -**#524**— Konfigurace OpenCode uložena správně (XDG_CONFIG_HOME, formát TOML) -**#522**— Správce API: odstraněno zavádějící tlačítko „Kopírovat maskovaný klíč“. -**#546**— `--version` vrací `unknown` ve Windows (PR od @k0valik) -**#544**— Bezpečná detekce nástroje CLI prostřednictvím známých instalačních cest (PR od @k0valik) -**#510**— Windows MSYS2/Git-Bash cesty automaticky normalizovány -**#492**— CLI detekuje uzel spravovaný `mise`/`nvm`, když chybí `app/server.js`#### Streaming & SSE

-**PR #587**— Vrácení importu `resolveDataDir` v odpovědíchTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Úzké místo 429 nekonečné čekání: zrušte čekající úlohy na limitu sazby (@xandr0s) -**#483**— Zastavit koncové `data: null` po signálu `[DONE]` -**#473**— Zombie SSE streamy: časový limit snížen na 300 s → 120 s pro rychlejší návrat#### Media & Transcription

-**Přepis**— Deepgram `video/mp4` → `audio/mp4` MIME mapování, automatická detekce jazyka, interpunkce -**TTS**– chybové zobrazení „[object Object]“ opraveno pro vnořené chyby ve stylu ElevenLabs -**Limity nahrávání**– Přepis médií zvýšen na 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

–**T01**– sloupec „requested_model“ v protokolech hovorů (migrace 009) -**T02**— Odstraní prázdné textové bloky z vnořeného `tool_result.content`
–**T03**– Analyzujte hlavičky kvóty `x-codex-5h-*` / `x-codex-7d-*` -**T04**— hlavička `X-Session-Id` pro externí pevné směrování -**T05**— Perzistence DB s rychlostním limitem s vyhrazeným API -**T06**— Účet deaktivován → trvalé blokování (1-rok cooldown) -**T07**– X-Forwarded-For IP validation (`extractClientIp()`) -**T08**— Limity relací na klíč API s vynucením posuvného okna -**T09**— Rozsahy limitů pro kodex vs Spark (samostatné fondy) -**T10**— Vyčerpání kreditů → zřetelný 1h cooldown -**T11**— „maximální“ úsilí o uvažování → 131072 tokenů rozpočtu -**T12**— Cenové položky MiniMax M2.7 -**T13**– Oprava zastaralého zobrazení kvóty (resetování povědomí o okně) -**T14**— Rychlá kontrola TCP serveru proxy (≤2 s, 30 s v mezipaměti) -**T15**— Normalizace obsahu pole pro Anthropic
–**T23**– Inteligentní záložní obnovení kvóty (extrakce záhlaví) -**T24**— cooldown `503` + mapování `406` -**T25**– Záložní ověření poskytovatele -**T29**— Vertex AI Service Account JWT auth -**T33**— Přeměna z úrovně myšlení na rozpočet -**T36**– klasifikace chyb `403` vs `429`
–**T38**– Centralizované specifikace modelu (`modelSpecs.ts`) -**T39**– Záložní koncový bod pro `fetchAvailableModels` -**T41**— Úloha na pozadí automaticky přesměrovává na modely flash -**T42**— Mapování poměru stran generování obrazu#### Other Improvements

-**Vlastní hlavičky upstream pro každý model**— prostřednictvím konfiguračního uživatelského rozhraní (PR #575 od @zhangqiang8vip) -**Délka kontextu modelu**– konfigurovatelná v metadatech modelu (PR #578 od @hijak) -**Odstranění předpony modelu**– možnost odstranit předponu poskytovatele z názvů modelů (PR #582 od @jay77721)
–**Ukončení podpory rozhraní Gemini CLI**– označeno jako zastaralé s upozorněním na omezení protokolu Google OAuth -**YAML parser**– nahrazení vlastního analyzátoru `js-yaml` pro správnou analýzu specifikace OpenAPI -**ZWS v5**— oprava úniku HMR (485 DB připojení → 1, paměť 2,4 GB → 195 MB) -**Export protokolu**– Nové tlačítko exportu JSON na řídicím panelu s rozevíracím seznamem časového rozsahu -**Aktualizační oznamovací banner**– domovská stránka řídicího panelu zobrazí, když jsou k dispozici nové verze---

### 🌐 i18n & Documentation

-**30 jazyků**při 100% paritě – synchronizováno 2 788 chybějících klíčů -**Čeština**— Úplný překlad: 22 dokumentů, 2 606 řetězců uživatelského rozhraní (PR od @zen0bit)
–**čínština (zh-CN)**– kompletní retranslace (PR od @only4copilot) -**VM Deployment Guide**— Přeloženo do angličtiny jako zdrojový dokument -**Reference API**– Přidány koncové body `/v1/embeddings` a `/v1/audio/speech` -**Počet poskytovatelů**– Aktualizováno z 36+/40+/44+ na**67+**v rámci README a všech 30 i18n README---

### 🔀 Community PRs Merged (10)

| PR       | Autor           | Shrnutí                                                                      |
| -------- | --------------- | ---------------------------------------------------------------------------- |
| **#587** | @k0valik        | oprava(sse): vrátit zpět import resolveDataDir pro Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): možnost odstranění předpony názvu modelu                        |
| **#581** | @jay77721       | fix(npm): propojení elektron-release s npm-publish workflow                  |
| **#578** | @hijak          | feat: konfigurovatelná délka kontextu v metadatech modelu                    |
| **#575** | @zhangqiang8vip | feat: upstream záhlaví podle modelu, kompatibilní PATCH, zarovnání chatu     |
| **#562** | @coobabm        | oprava: Správa relací MCP, Claude passthrough, detectFormat                  |
| **#561** | @zen0bit        | fix(i18n): Opravy českého překladu                                           |
| **#555** | @k0valik        | fix(sse): centralizované `resolveDataDir()` pro rozlišení cesty              |
| **#546** | @k0valik        | fix(cli): `--version` vrací `unknown` ve Windows                             |
| **#544** | @k0valik        | fix(cli): bezpečná detekce nástroje CLI prostřednictvím instalačních cest    |
| **#542** | @rdself         | fix(ui): kontrast světelného režimu proměnné motivu CSS                      |
| **#530** | @kang-heewon    | feat: Poskytovatelé OpenCode Zen + Go s `OpencodeExecutor`                   |
| **#512** | @zhangqiang8vip | feat: kompatibilita modelu podle protokolu (`compatByProtocol`)              |
| **#497** | @zhangqiang8vip | oprava: úniky prostředků HMR v dev-mode (ZWS v5)                             |
| **#495** | @xandr0s        | oprava: Úzké místo 429 nekonečné čekání (upuštění čekajících úloh)           |
| **#494** | @zhangqiang8vip | feat: MiniMax vývojář→oprava systémové role                                  |
| **#480** | @prakersh       | oprava: extrakce využití splachování proudu                                  |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 a antropické cenové položky                              |
| **#475** | @only4copilot   | feat(i18n): vylepšený čínský překlad                                         |

**Děkujeme všem přispěvatelům!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` 9`#49` `#49` 9`#49 `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` 5`#53` 5`#53` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 testů, 0 selhání**(nárůst z 821 ve verzi 2.9.5)

- +105 nových testů zahrnujících: mapování model-kombo, registrované klíče, OpencodeExecutor, poskytovatel Bailian, ověřování trasy, klasifikaci chyb, mapování poměru stran a další---

### 📦 Database Migrations

| Migrace | Popis                                                                  |
| ------- | ---------------------------------------------------------------------- | --- |
| **008** | tabulky `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009** | Sloupec `requested_model` v `call_logs`                                |
| **010** | Tabulka `model_combo_mappings` pro kombinované směrování podle modelu  | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Přelomové změny:**Žádné. Všechny existující konfigurace, komba a klíče API jsou zachovány.
> Migrace databáze 008-010 se spouští automaticky při spuštění.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Oprava CodeQL**– Opraveno 10+ upozornění:

- 6 opakování polynomu v `provider.ts` / `chatCore.ts` (nahrazeno `(?:^|/)` alternativními vzory shodou na základě segmentů)
- 1 nezabezpečená náhodnost v `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection v `prepublish.mjs` (escapování cesty `JSON.stringify()`) -**Ověření trasy**– Přidána schémata Zod + `validateBody()` k 5 trasám bez ověření:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` nyní prošlo:**176/176 tras ověřeno**### 🐛 Bug Fixes

-**#585**— Interní značky `<omniModel>` již neunikají klientům v odpovědích SSE. Přidána odchozí sanitace `TransformStream` do `combo.ts`### ⚙️ Infrastructure

-**Docker**– Upgradován `docker/setup-buildx-action` z verze 3 → v4 (oprava ukončení podpory Node.js 20) -**Čištění CI**– Odstraněno 150+ neúspěšných/zrušených běhů pracovního postupu### 🧪 Tests

- Testovací sada:**926 testů, 0 selhání**(+3 nové)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Zvýšené limity přepisu médií
- Přidána délka kontextu modelu do metadat registru
- Přidána vlastní záhlaví pro každý model upstream prostřednictvím konfiguračního uživatelského rozhraní
- Opraveno více chyb, ověřování Zod pro záplaty a vyřešeny různé problémy komunity.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Kombinované směrování podle modelu: mapujte vzory názvů modelů (glob) na konkrétní kombinace pro automatické směrování

- Nová tabulka `model_combo_mappings` (migrace 010) se vzorem, combo_id, prioritou, povoleno
- DB funkce `resolveComboForModel()` s porovnáváním glob-to-regex (nerozlišují se malá a velká písmena, zástupné znaky `*` a `?`)
- `getComboForModel()` v `model.ts`: rozšiřuje `getCombo()` o záložní vzor modelu
- `chat.ts`: rozhodnutí o směrování nyní kontroluje mapování model-komba před manipulací s jedním modelem
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Řídicí panel: sekce "Pravidla směrování modelu" přidána na stránku Kombinace s vloženým přidáním/úpravou/přepínáním/mazáním
  – Příklady: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Plná i18n Sync**: 2 788 chybějících klíčů přidáno do 30 jazykových souborů – všechny jazyky nyní ve 100% paritě s `en.json` -**Stránka agentů i18n**: Sekce OpenCode Integration plně internacionalizována (název, popis, skenování, štítky ke stažení) -**6 nových klíčů**přidáno do jmenného prostoru `agents` pro sekci OpenCode### 🎨 UI/UX

-**Ikony poskytovatelů**: přidáno 16 chybějících ikon poskytovatelů (3 zkopírovány, 2 staženy, 11 vytvořeno SVG) -**Záložní SVG**: Komponenta `ProviderIcon` aktualizována pomocí 4vrstvé strategie: Lobehub → PNG → SVG → Obecná ikona -**Otisky prstů agentů**: Synchronizováno s nástroji CLI – přidán droid, openclaw, kopilot, opencode do seznamu otisků prstů (celkem 14)### Bezpečnost

-**CVE oprava**: Vyřešená zranitelnost dompurify XSS (GHSA-v2wj-7wpq-c8vv) prostřednictvím přepsání npm vynucením `dompurify@^3.3.2`

- `npm audit` nyní hlásí**0 zranitelností**### 🧪 Tests

- Testovací sada:**923 testů, 0 selhání**(+15 nových testů mapování kombinovaného modelu)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Shrnutí                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): Správa relací MCP, normalizace průchodu Clauda, ​​modální OAuth, detectFormat |
| **#561** | @zen0bit | fix(i18n): Opravy českého překladu — názvy HTTP metod a aktualizace dokumentace        | ### 🧪 Tests |

- Testovací sada:**908 testů, 0 selhání**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**vyřeší skutečný klíč API z `keyId` v trasách nastavení CLI (`codex-settings`, `droid-settings`, `kilo-settings`), aby se zabránilo zápisu maskovaných řetězců (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Shrnutí                                                                                                                                                                                                     |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` vrací `unknown` ve Windows – místo importu ESM použijte `JSON.parse(readFileSync)`                                                                                                    |
| **#555** | @k0valik | fix(sse): centralizované `resolveDataDir()` pro rozlišení cesty v přihlašovacích údajích, autoCombo, záznamníku odpovědí a záznamníku požadavků                                                             |
| **#544** | @k0valik | fix(cli): bezpečná detekce nástroje CLI prostřednictvím známých instalačních cest (8 nástrojů) s ověřováním symbolických odkazů, kontrolami typu souboru, omezením velikosti, minimální env ve healthchecku |
| **#542** | @rdself  | fix(ui): zlepšit kontrast světlého režimu — přidat chybějící proměnné motivu CSS (`bg-primary`, `bg-subtle`, `text-primary`) a opravit pouze tmavé barvy v detailu protokolu                                | ### 🔧 Bug Fixes |

-**Oprava TDZ v `cliRuntime.ts`**— `validateEnvPath` byl použit před inicializací při spuštění modulu pomocí `getExpectedParentPaths()`. Přeuspořádané deklarace k opravě `ReferenceError`. -**Opravy sestavení**– Přidány `pino` a `pino-pretty` do `serverExternalPackages`, aby se zabránilo Turbopacku narušit interní načítání Pina.### 🧪 Tests

- Testovací sada:**905 testů, 0 selhání**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regrese sestavení Electronu: downgrade Next.js z `16.1.x` na `16.0.10`, aby se odstranila nestabilita hašování modulu Turbopack, která způsobovala prázdné obrazovky v balíčku Electron desktop. -**Opravy testů jednotek**— Opravena dvě zastaralá testovací tvrzení (poměr/rozlišení `nanobanana-image-handler`, mapování polí `thinking-budget` Gemini `thinkingConfig`), která se po nedávných změnách implementace posunula. -**#541**— Reakce na zpětnou vazbu od uživatelů ohledně složitosti instalace; nejsou nutné žádné změny kódu.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementováno pomocí knihovny `jose` ke zpracování ověřování JWT/Service Account spolu s konfigurovatelnými oblastmi v uživatelském rozhraní a automatickým vytvářením URL modelu partnera. -**T42**— Mapování poměru stran generování obrázků: vytvořena logika `sizeMapper` pro obecné formáty OpenAI (`velikost`), přidáno nativní zpracování `imagen3` a aktualizované koncové body NanoBanana, aby automaticky využívaly mapované poměry stran. -**T38**— Centralizované specifikace modelu: `modelSpecs.ts` vytvořené pro limity a parametry na model.### 🔧 Improvements

-**T40**— Integrace nástrojů OpenCode CLI: nativní integrace `opencode-zen` a `opencode-go` dokončena v dřívější PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown čeká na opravu + `406` mapování: mapováno `406 Not Acceptable` na `503 Service Unavailable` se správnými intervaly ochlazení. -**T25**— Záložní ověření poskytovatele: elegantní návrat ke standardním ověřovacím modelům, když není k dispozici konkrétní `validationModelId`. -**T36**— upřesnění obsluhy poskytovatele `403` vs `429`: extrahováno do `errorClassifier.ts`, aby se správně oddělila selhání pevných oprávnění (`403`) od limitů rychlosti (`429`). -**T39**— Endpoint Fallback pro `fetchAvailableModels`: implementován třívrstvý mechanismus (`/models` -> `/v1/models` -> místní obecný katalog) + aktualizace nástroje MCP `list_models_catalog`, aby odrážely `zdroj` a `varování`. -**T33**— Přeměna úrovně myšlení na rozpočet: převádí úrovně kvalitativního myšlení na přesné přidělení rozpočtu. -**T41**— Automatické přesměrování úloh na pozadí: automaticky přesměrovává náročné úlohy vyhodnocování na pozadí do flashových/efektivních modelů. -**T23**— Inteligentní záložní reset kvóty: přesně extrahuje hodnoty hlavičky `x-ratelimit-reset` / `retry-after` nebo mapuje statické cooldowny.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade z v2.9.5:**16 problémů vyřešeno · 2 sloučeny PR komunity · 2 noví poskytovatelé · 7 nových koncových bodů API · 3 nové funkce · migrace DB 008+009 · 832 úspěšných testů · 15 vylepšení mezery sub2api (T01–T15 dokončeno).### 🆕 New Providers

| Poskytovatel     | Přezdívka      | Úroveň    | Poznámky                                                        |
| ---------------- | -------------- | --------- | --------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Zdarma    | 3 modely přes `opencode.ai/zen/v1` (PR #530 od @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Zaplaceno | 4 modely přes `opencode.ai/zen/go/v1` (PR #530 od @kang-heewon) |

Oba poskytovatelé používají nový `OpencodeExecutor` s víceformátovým směrováním (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Automaticky generujte a vydávejte klíče rozhraní API OmniRoute programově s vynucováním kvót pro jednotlivé poskytovatele a účty.

| Koncový bod                              | Metoda    | Popis                                                           |
| ---------------------------------------- | --------- | --------------------------------------------------------------- |
| `/api/v1/registrované-klíče`             | 'POST'    | Vydejte nový klíč – nezpracovaný klíč se vrátil**pouze jednou** |
| `/api/v1/registrované-klíče`             | "ZÍSKAT"  | Vypsat registrované klíče (maskované)                           |
| `/api/v1/registrované-klíče/{id}`        | "ZÍSKAT"  | Získat klíčová metadata                                         |
| `/api/v1/registrované-klíče/{id}`        | "SMAZAT"  | Zrušit klíč                                                     |
| `/api/v1/registrované-klíče/{id}/revoke` | 'POST'    | Odvolat (pro klienty bez podpory DELETE)                        |
| `/api/v1/quotas/check`                   | "ZÍSKAT"  | Před vydáním kvóty ověřte                                       |
| `/api/v1/providers/{id}/limits`          | "GET/PUT" | Konfigurace limitů vydávání na poskytovatele                    |
| `/api/v1/accounts/{id}/limits`           | "GET/PUT" | Konfigurace limitů vydávání na účet                             |
| `/api/v1/issues/report`                  | 'POST'    | Hlásit události kvót na GitHub Issues                           |

**DB — Migrace 008:**Tři nové tabulky: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Zabezpečení:**Klíče uložené jako hash SHA-256. Nezpracovaný klíč zobrazený jednou při vytvoření, nikdy jej nelze znovu získat.
**Typy kvót:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` na poskytovatele a na účet.
**Idempotency:**Pole `idempotency_key` zabraňuje duplicitnímu vydání. Vrátí `409 IDEMPOTENCY_CONFLICT`, pokud byl klíč již použit.
**Rozpočet na klíč:**`dailyBudget` / `hourlyBudget` — omezuje, kolik požadavků může klíč směrovat na okno.
**Přehledy GitHubu:**Volitelné. Nastavte `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` pro automatické vytváření problémů GitHubu při překročení kvóty nebo selhání vydání.#### 🎨 Provider Icons — @lobehub/icons (#529)

Všechny ikony poskytovatelů na řídicím panelu nyní používají komponenty React `@lobehub/icons` (více než 130 poskytovatelů s SVG).
Záložní řetězec:**Lobehub SVG → existující `/providers/{id}.png` → obecná ikona**. Používá správný vzor React `ErrorBoundary`.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute nyní automaticky obnovuje seznamy modelů pro připojené poskytovatele každých**24 hodin**.

- Spouští se při spuštění serveru přes existující háček `/api/sync/initialize`
- Konfigurovatelné pomocí proměnné prostředí `MODEL_SYNC_INTERVAL_HOURS`
- Pokrývá 16 hlavních poskytovatelů
- Zaznamenává čas poslední synchronizace v databázi nastavení---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Vymažte chybu, kterou lze provést, když v nasazeních Docker/vlastně hostovaných chybí `GEMINI_OAUTH_CLIENT_SECRET`. Dříve zobrazované od Googlu záhadné „client_secret is missing“. Nyní poskytuje specifické instrukce `docker-compose.yml` a `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Opraveny `baseUrl` (`api.longcat.chat/openai`) a `authHeader` (`Autorizace: Nositel`). -**#535 — Přepsání připnutého modelu:**`body.model` je nyní správně nastaven na `pinnedModel`, když je aktivní ochrana kontextové mezipaměti. -**#532 — Ověření klíče OpenCode Go:**Nyní používá testovací koncový bod `zen/v1` (`testKeyBaseUrl`) — stejný klíč funguje pro obě úrovně.#### CLI & Tools

-**#527 — Claude Code + smyčka Codex:**Bloky `tool_result` jsou nyní převedeny na text namísto vynechání, čímž se zastaví nekonečné smyčky výsledků nástroje. -**#524 — Uložení konfigurace OpenCode:**Přidán handler `saveOpenCodeConfig()` (s vědomím XDG_CONFIG_HOME, píše TOML). -**#521 — Přihlášení se zaseklo:**Přihlášení již nezamrzá po přeskočení nastavení hesla – přesměruje se správně na onboarding. -**#522 — Správce API:**Odstraněno zavádějící tlačítko „Kopírovat maskovaný klíč“ (nahrazeno popiskem ikony zámku). -**#532 — Konfigurace OpenCode Go:**Obslužný program nastavení průvodce nyní zpracovává `opencode` toolId.#### Developer Experience

-**#489 — Antigravity:**Chybějící `googleProjectId` vrací strukturovanou chybu 422 s pokyny pro opětovné připojení namísto záhadného selhání. -**#510 — Cesty Windows:**Cesty MSYS2/Git-Bash (`/c/Program Files/...`) jsou nyní automaticky normalizovány na `C:\Program Files\...`. -**#492 — Spuštění CLI:**`omniroute` CLI nyní detekuje uzel spravovaný `mise`/`nvm`, když chybí `app/server.js` a zobrazuje cílené pokyny k opravě.---

### 📖 Documentation Updates

-**#513**— Resetování hesla dockeru: `INITIAL_PASSWORD` řešení env var zdokumentováno -**#520**— pnpm: zdokumentován krok `pnpm schválit-sestaví lépe-sqlite3`---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` 7`#535` 7`#535`---

### 🔀 Community PRs Merged

| PR       | Autor        | Shrnutí                                                                  |
| -------- | ------------ | ------------------------------------------------------------------------ | --- |
| **#530** | @kang-heewon | Poskytovatelé OpenCode Zen + Go s `OpencodeExecutor` a vylepšenými testy | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Perzistence DB s rychlostním limitem: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` v `providers.ts`. Stávající sloupec „rate_limited_until“ je nyní vystaven jako vyhrazené rozhraní API – obnovení tokenu OAuth se NESMÍ dotknout tohoto pole, aby se zabránilo smyčkám s omezením rychlosti. -**T08**— Limit relace na klíč API: `max_sessions INTEGER DEFAULT 0` přidáno do `api_keys` prostřednictvím automatické migrace. `sessionManager.ts` získá `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` a `getActiveSessionCountForKey()`. Volající v `chatCore.js` mohou vynutit limit a snížit na `req.close`. -**T09**— Rozsahy limitů rychlosti Codex vs Spark: `getCodexModelScope()` a `getCodexRateLimitKey()` v `codex.ts`. Standardní modely (`gpt-5.x-codex`, `codex-mini`) získají rozsah `"codex"`; spark modely (`codex-spark*`) získají rozsah `"spark"`. Klíče sazebního limitu by měly být `${accountId}:${scope}`, takže vyčerpání jednoho fondu neblokuje druhý. -**T13**— Oprava zastaralého zobrazení kvóty: `getEffectiveQuotaUsage(used, resetAt)` vrací `0`, když uplynulo okno pro resetování; `formatResetCountdown(resetAt)` vrací lidsky čitelný řetězec odpočítávání (např. `"2h 35m"`). Oba exportované z `providers.ts` + `localDb.ts` pro spotřebu řídicího panelu. -**T14**– Rychlé selhání serveru proxy: nový soubor `src/lib/proxyHealth.ts` s `isProxyReachable(proxyUrl, timeoutMs=2000)` (kontrola TCP, časový limit ≤2s místo 30s), `getCachedProxyHealth()`, `invalidní` a `Health` `getAllProxyHealthStatuses()`. Výsledky jsou standardně uloženy do mezipaměti 30s; konfigurovatelné pomocí `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testovací sada:**832 testů, 0 selhání**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— sloupec `requested_model` v `call_logs` (migrace 009): sledujte, který model klient původně požadoval v porovnání se skutečným směrovaným modelem. Povolí analýzu záložní frekvence. -**T02**— Odstranění prázdných textových bloků z vnořených `tool_result.content`: zabraňuje chybám Anthropic 400 (`bloky textového obsahu musí být neprázdné`), když Claude Code řetězí výsledky nástroje. -**T03**— Analyzujte hlavičky `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extrahují okna kvót Codexu pro přesné naplánování ochlazování namísto obecné 5minutové zálohy. -**T04**— Záhlaví `X-Session-Id` pro externí pevné směrování: `extractExternalSessionId()` v `sessionManager.ts` čte záhlaví `x-session-id` / `x-omniroute-session` s předponou `ext:`, aby se zabránilo kolizi s interním ID relace SHA-256. Kompatibilní s Nginx (hlavička s pomlčkou). -**T06**— Účet deaktivován → trvalé zablokování: `isAccountDeactivated()` v `accountFallback.ts` detekuje 401 deaktivačních signálů a použije jednoroční cooldown, aby se zabránilo opakování trvale mrtvých účtů. -**T07**— X-Forwarded-For IP validace: nový `src/lib/ipUtils.ts` s `extractClientIp()` a `getClientIpFromRequest()` — přeskakuje `unknown`/non-IP záznamy v řetězcích `X-Forwarded-For` (žádosti Nginx/proxy-forwarded). -**T10**— Vyčerpání kreditů → zřetelná rezerva: `isCreditsExhausted()` v `accountFallback.ts` vrací 1h cooldown s příznakem `creditsExhausted`, odlišným od obecného omezení sazby 429. -**T11**— „maximální“ úsilí o uvažování → 131072 tokenů rozpočtu: „EFFORT_BUDGETS“ a „THINKING_LEVEL_MAP“ aktualizovány; zpětné mapování nyní vrací `"max"` pro odpovědi s plným rozpočtem. Test jednotky aktualizován. -**T12**— Do cenové tabulky přidány položky MiniMax M2.7: „minimax-m2.7“, „MiniMax-M2.7“, „minimax-m2.7-highspeed“ (sub2api PR #1120). Ceny M2.5/GLM-4.7/GLM-5/Kimi již existovaly. -**T15**— Normalizace obsahu pole: Pomocník `normalizeContentToString()` v `openai-to-claude.ts` správně sbalí zprávy systému/nástroje ve formátu pole do řetězce před odesláním do Anthropic.### 🧪 Tests

- Testovací sada:**832 testů, 0 selhání**(beze změny oproti rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API pro zřizování registrovaných klíčů: automatické vydávání klíčů API s vynucováním kvót pro jednotlivé poskytovatele a účty

- `POST /api/v1/registered-keys` — vydat klíče s podporou idempotence
- `GET /api/v1/registered-keys` — seznam (maskovaných) registrovaných klíčů
- `GET /api/v1/registered-keys/{id}` — získat metadata klíče
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — zrušit klíče
- `GET /api/v1/quotas/check` — před vydáním ověřte
- `PUT /api/v1/providers/{id}/limits` — nastavte limity pro vydávání poskytovatelů
- `PUT /api/v1/accounts/{id}/limits` — nastavte limity pro vydání účtu
- `POST /api/v1/issues/report` – volitelné hlášení problémů GitHub
- Migrace DB 008: tabulky `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Přidání poskytovatelů OpenCode Zen a OpenCode Go (od @kang-heewon)

- Nový `OpencodeExecutor` s víceformátovým směrováním (`/chat/completions`, `/messages`, `/responses`)
- 7 modelů na obou úrovních---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Ikony poskytovatelů nyní používají [@lobehub/icons](https://github.com/lobehub/lobe-icons) s elegantním záložním PNG a komponentou „ProviderIcon“ (podporováno více než 130 poskytovatelů) -**#488**— Automaticky aktualizovat seznamy modelů každých 24 hodin pomocí `modelSyncScheduler` (konfigurovatelné pomocí `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: nyní zobrazuje jasnou žalovatelnou chybu, když chybí `GEMINI_OAUTH_CLIENT_SECRET` v nasazeních Docker/self-hosted---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Ověření klíče AI LongCat: opraveno baseUrl (`api.longcat.chat/openai`) a authHeader (`Oprávnění: nositel`) -**#535**— Přepsání připnutého modelu: `body.model` je nyní nastaven na `pinnedModel`, když ochrana kontextové mezipaměti detekuje připnutý model -**#524**— Konfigurace OpenCode je nyní uložena správně: přidán obslužný program `saveOpenCodeConfig()` (s vědomím XDG_CONFIG_HOME, píše TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Přihlášení se po přeskočení nastavení hesla již nezasekává (přesměruje na přihlášení) -**#522**— Správce API: Odstraněno zavádějící tlačítko „Kopírovat maskovaný klíč“ (nahrazeno popiskem ikony zámku) -**#527**— Cyklus superschopností Claude Code + Codex: bloky `tool_result` jsou nyní převedeny na text namísto vynechání -**#532**— Ověření klíče API OpenCode GO nyní používá správný koncový bod `zen/v1` (`testKeyBaseUrl`)
–**#489**— Antigravitace: chybí `googleProjectId` vrací strukturovanou chybu 422 s pokyny pro opětovné připojení -**#510**— Windows: Cesty MSYS2/Git-Bash (`/c/Program Files/...`) jsou nyní normalizovány na `C:\Program Files\...` -**#492**— `omniroute` CLI nyní detekuje `mise`/`nvm`, když chybí `app/server.js` a zobrazuje cílenou opravu### Dokumentace

-**#513**— Resetování hesla dockeru: `INITIAL_PASSWORD` řešení env var zdokumentováno -**#520**— pnpm: zdokumentováno `pnpm schválit-builds better-sqlite3`### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Noví poskytovatelé OpenCode, oprava pověření pro vkládání, chyba maskovaného klíče CLI, oprava CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Nástroje CLI ukládají maskovaný klíč API do konfiguračních souborů**— POST cesty `claude-settings`, `cline-settings` a `openclaw-settings` nyní přijímají parametr `keyId` a řeší skutečný klíč API z DB před zápisem na disk. `ClaudeToolCard` aktualizováno tak, aby místo maskovaného zobrazovaného řetězce odesílalo `keyId`. Opravy #523, #526. -**Vlastní poskytovatelé vkládání: Chyba `Žádná pověření`**— `/v1/embeddings` nyní sleduje `credentialsProviderId` odděleně od směrovací předpony, takže pověření jsou načítána z odpovídajícího ID uzlu poskytovatele, nikoli z veřejného řetězce předpony. Opravuje regresi, kdy `google/gemini-embedding-001` a podobné modely vlastních poskytovatelů vždy selžou s chybou pověření. Opravy související s #532. (PR #528 od @jacob2826) -**Regulační výraz ochrany kontextové mezipaměti chybí `
` prefix**— `CACHE_TAG_PATTERN` v `comboAgentMiddleware.ts` aktualizován tak, aby odpovídal oběma doslovným `
` (obrácené lomítko-n) a skutečný nový řádek U+000A, který streamování `combo.ts` vloží kolem značky `<omniModel>` po opravě #515. Opravy #531.### ✨ New Providers

-**OpenCode Zen**– Bezplatná brána na `opencode.ai/zen/v1` se 3 modely: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**– Předplatitelská služba na `opencode.ai/zen/go/v1` se 4 modely: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (formát Claude), `minimax-m2.5` (formát Claude)

- Oba poskytovatelé používají nový `OpencodeExecutor`, který dynamicky směruje do `/chat/completions`, `/messages`, `/responses` nebo `/models/{model}:generateContent` na základě požadovaného modelu. (PR #530 od @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Opravy chyb – zachovat klíč mezipaměti výzvy Codex, opravit escapování tagContent JSON, synchronizovat stav tokenu, jehož platnost vypršela, do DB.### 🐛 Bug Fixes

-**fix(translator)**: Zachovat `prompt_cache_key` v Responses API → překlad dokončení chatu (#517)
— Pole je signál afinity mezipaměti používaný Codexem; jeho odstranění bránilo rychlým zásahům do mezipaměti.
Opraveno v `openai-responses.ts` a `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` v `tagContent`, takže vložený řetězec JSON je platný (#515)
— Doslovné nové řádky šablony (U+000A) nejsou povoleny bez kódování uvnitř hodnot řetězce JSON.
Nahrazeno `\n` doslovnými sekvencemi v `open-sse/services/combo.ts`.

-**fix(usage)**: Synchronizace stavu tokenu s vypršením platnosti zpět do DB při selhání živého ověření (#491)
— Když živá kontrola Limits & Quotas vrátí 401/403, spojení `testStatus` je nyní aktualizováno
v databázi „vypršela“, takže stránka Poskytovatelé odráží stejný degradovaný stav.
Opraveno v `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Přidejte 5 nových bezplatných poskytovatelů AI — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(poskytovatelé/longcat)**: Přidejte LongCat AI (`lc/`) – 50 milionů tokenů/den zdarma (Flash-Lite) + 500 000/den (Chat/Thinking) během veřejné beta verze. Standardní Bearer auth kompatibilní s OpenAI. -**feat(providers/pollinations)**: Add Pollinations AI (`pol/`) – není potřeba žádný klíč API. Proxy GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s zdarma). Vlastní exekutor zpracovává volitelné ověření. -**feat(providers/cloudflare-ai)**: Přidejte Cloudflare Workers AI (`cf/`) – 10 000 neuronů/den zdarma (~150 LLM odpovědí nebo 500s Whisper audio). Více než 50 modelů na světové špičce. Vlastní exekutor vytvoří dynamickou adresu URL s `accountId` z přihlašovacích údajů. -**feat(poskytovatelé/scaleway)**: Přidejte generativní API Scaleway (`scw/`) – 1 milion tokenů zdarma pro nové účty. V souladu s EU/GDPR (Paříž). Qwen3 235B, Lama 3.1 70B, Mistral Small 3.2. -**feat(poskytovatelé/aimlapi)**: Přidejte AI/ML API (`aiml/`) – kredit 0,025 $/den zdarma, více než 200 modelů (GPT-4o, Claude, Gemini, Llama) prostřednictvím jednoho koncového bodu agregátoru.### 🔄 Provider Updates

-**feat(providers/together)**: Přidejte `hasFree: true` + 3 trvale bezplatná ID modelu: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Přidejte `hasFree: true` + `freeNote` (1 500 req/den, není potřeba kreditní karta, aistudio.google.com) -**chore(poskytovatelé/gemini)**: Pro přehlednost přejmenujte zobrazovaný název na „Gemini (Google AI Studio)“### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Nový `PollinationsExecutor` — vynechává hlavičku `Authorization`, když není poskytnut žádný klíč API -**feat(executors/cloudflare-ai)**: Nový `CloudflareAIExecutor` – dynamická konstrukce URL vyžaduje `accountId` v přihlašovacích údajích poskytovatele -**feat(executors)**: Zaregistrujte mapování exekutorů `pollinations`, `pol`, `cloudflare-ai`, `cf`### Dokumentace

-**docs(readme)**: Rozšířený bezplatný combo stack na 11 poskytovatelů (0 $ navždy) -**docs(readme)**: Přidány 4 nové bezplatné sekce poskytovatelů (LongCat, Pollinations, Cloudflare AI, Scaleway) s tabulkami modelů -**docs(readme)**: Aktualizovaná tabulka cen se 4 novými řádky bezplatných úrovní -**docs(i18n/pt-BR)**: Aktualizovaná tabulka cen + přidány sekce LongCat/Pollinations/Cloudflare AI/Scaleway v portugalštině -**docs(new-features/ai)**: 10 souborů se specifikací úloh + hlavní plán implementace v `docs/new-features/ai/`### 🧪 Tests

- Testovací sada:**821 testů, 0 selhání**(beze změny)---

## [2.9.2] — 2026-03-21

> Sprint: Opravte přepis médií (Deepgram/HuggingFace Content-Type, detekce jazyka) a zobrazení chyb TTS.### 🐛 Bug Fixes

-**fix(transscription)**: Zvukový přepis Deepgram a HuggingFace nyní správně mapuje `video/mp4` → `audio/mp4` a další typy MIME médií prostřednictvím nového pomocníka `resolveAudioContentType()`. Dříve nahrávání souborů `.mp4` konzistentně vracelo „Nebyla zjištěna žádná řeč“, protože Deepgram přijímal `Content-Type: video/mp4`. -**fix(transscription)**: Přidáno `detect_language=true` do požadavků Deepgramu – automaticky detekuje jazyk zvuku (portugalštinu, španělštinu atd.) namísto výchozí angličtiny. Opravuje neanglické přepisy vracející prázdné nebo nesmyslné výsledky. -**fix(transscription)**: Přidáno `punctuate=true` do požadavků Deepgramu na kvalitnější výstup přepisu se správnou interpunkcí. -**fix(tts)**: Chybové zobrazení `[objekt objektu]` v odpovědích převodu textu na řeč opraveno v `audioSpeech.ts` a `audioTranscription.ts`. Funkce `upstreamErrorResponse()` nyní správně extrahuje zprávy vnořených řetězců od poskytovatelů, jako je ElevenLabs, které vracejí `{ error: { message: "...", status_code: 401 } }` namísto plochého chybového řetězce.### 🧪 Tests

- Testovací sada:**821 testů, 0 selhání**(beze změny)### Triaged Issues

-**#508**— Regrese formátu volání nástroje: požadované protokoly proxy a informace o řetězci poskytovatelů (`needs-info`) -**#510**— Cesta ke kontrole stavu Windows CLI: požadované informace o verzi shellu/uzlu (`needs-info`) -**#485**— Volání nástroje Kiro MCP: uzavřeno z důvodu externího problému Kiro (nikoli OmniRoute) -**#442**— Koncový bod Baseten /models: uzavřen (zdokumentované ruční řešení) -**#464**— Klíčové rozhraní API: potvrzeno jako položka plánu---

## [2.9.1] — 2026-03-21

> Sprint: Opravte ztrátu dat SSE omniModel, slučte kompatibilitu modelu podle protokolu.### Bug Fixes

-**#511**— Kritické: Značka `<omniModel>` byla odeslána po `finish_reason:stop` v tocích SSE, což způsobilo ztrátu dat. Značka je nyní vložena do prvního neprázdného bloku obsahu, což zaručuje doručení dříve, než sady SDK uzavře připojení.### Merged PRs

-**PR #512**(@zhangqiang8vip): Kompatibilita modelu podle protokolu — `normalizeToolCallId` a `preserveOpenAIDeveloperRole` lze nyní konfigurovat na klientský protokol (OpenAI, Claude, Responses API). Nové pole `compatByProtocol` v konfiguraci modelu s ověřením Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: požadovaná informace PATH/verze -**#509**— Regrese Turbopack Electron: chyba Next.js upstream, zdokumentovaná řešení -**#508**— černá obrazovka macOS: navrhované řešení `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: Oprava Id mezi platformami, limity rychlosti na klíč API, mezipaměť kontextu streamování, Alibaba DashScope, analytika vyhledávání, ZWS v5 a 8 problémů uzavřeno.### ✨ New Features

-**feat(search)**: Karta Search Analytics v `/dashboard/analytics` – rozdělení poskytovatelů, míra zásahů do mezipaměti, sledování nákladů. Nové API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope přidán s vlastní validací cesty ke koncovému bodu – konfigurovatelné `chatPath` a `modelsPath` na uzel (#feat/custom-endpoint-paths) -**feat(api)**: Limity počtu požadavků na klíč API – sloupce `max_requests_per_day` a `max_requests_per_minute` s vynucením posuvného okna v paměti, které vrací HTTP 429 (#452) -**feat(dev)**: ZWS v5 — oprava úniku HMR (485 DB připojení → 1), paměť 2,4 GB → 195 MB, singletony `globalThis`, oprava upozornění Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Multiplatformní `machineId` — `getMachineIdRaw()` přepsaný s vodopádem try/catch (Windows REG.exe → macOS ioreg → čtení souboru Linux → název hostitele → `os.hostname()`). Eliminuje větvení `process.platform`, které Bundler Next.js eliminuje mrtvý kód, oprava `'hlava' není rozpoznána` ve Windows. Také opravy #466. -**fix(#493)**: Vlastní pojmenování modelu poskytovatele – odstraněno nesprávné odstranění předpon v `DefaultExecutor.transformRequest()`, které poškodilo ID modelů v rozsahu org, jako je `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + ochrana kontextové mezipaměti — `TransformStream` zachytí SSE a vloží značku `<omniModel>` před značku `[DONE]`, čímž povolí ochranu kontextové mezipaměti pro odpovědi streamování. -**fix(#458)**: Ověření kombinovaného schématu — pole `system_message`, `tool_filter_regex`, `context_cache_protection` nyní procházejí ověřením Zod při uložení. -**fix(#487)**: Vyčištění karty KIRO MITM – odstraněno ZWS_README, vygenerovaná karta `AntigravityToolCard` pro použití dynamických metadat nástroje.### 🧪 Tests

- Přidány testy filtračních jednotek nástrojů v antropickém formátu (PR #397) – 8 regresních testů pro `tool.name` bez obalu `.function`
- Testovací sada:**821 testů, 0 selhání**(nárůst z 813)### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` nebyl rozpoznán (opraveno) -**#493**— Pojmenování modelu vlastního poskytovatele (opraveno) -**#490**— Streamovací kontextová mezipaměť (opraveno)
–**#452**— Limity požadavků na klíč API (implementováno) -**#466**— Chyba přihlášení do systému Windows (stejná hlavní příčina jako #506) -**#504**— MITM neaktivní (očekávané chování) -**#462**— Gemini CLI PSA (vyřešeno) -**#434**— Selhání aplikace Electron (duplikát #402)## [2.8.9] — 2026-03-20

> Sprint: Sloučení komunitních PR, oprava karty KIRO MITM, aktualizace závislostí.### Merged PRs

-**PR #498**(@Sajid11194): Oprava selhání ID počítače se systémem Windows (`undefined\REG.exe`). Nahrazuje `node-machine-id` nativními dotazy na registr OS.**Zavírá #486.** -**PR #497**(@zhangqiang8vip): Oprava úniků prostředků HMR v režimu dev — 485 uniklých připojení DB → 1, paměť 2,4 GB → 195 MB. Singletons `globalThis`, oprava upozornění Edge Runtime, stabilita testu Windows. (+1168/-338 přes 22 souborů) -**PR #499-503**(Dependabot): Aktualizace akcí GitHub — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `-a.`### Bug Fixes

-**#505**— Karta KIRO MITM nyní zobrazuje pokyny specifické pro nástroj (`api.anthropic.com`) namísto textu specifického pro antigravitaci. -**#504**— Odpověď s vysvětlením uživatelského rozhraní (MITM "Neaktivní" je očekávané chování, když proxy neběží).---

## [2.8.8] — 2026-03-20

> Sprint: Opravte selhání dávkového testu OAuth, přidejte tlačítko „Testovat vše“ na stránky jednotlivých poskytovatelů.### Bug Fixes

-**Zhroucení dávkového testu OAuth**(ERR_CONNECTION_REFUSED): Nahrazeno sekvenční for-loop limitem 5 souběžných připojení + 30 s na jedno připojení časový limit prostřednictvím `Promise.race()` + `Promise.allSettled()`. Zabraňuje selhání serveru při testování velkých skupin poskytovatelů OAuth (~30+ připojení).### Funkce

-**Tlačítko "Otestovat vše" na stránkách poskytovatelů**: Stránky jednotlivých poskytovatelů (např. `/providers/codex`) nyní zobrazují v záhlaví Připojení tlačítko "Testovat vše", pokud existují 2 a více připojení. Používá `POST /api/providers/test-batch` s `{mode: "provider", providerId}`. Výsledky zobrazené modálně se shrnutím vyhovění/neúspěchu a diagnostikou pro jednotlivá připojení.---

## [2.8.7] — 2026-03-20

> Sprint: Sloučit PR č. 495 (propad 429 úzkých míst), oprava č. 496 (poskytovatelé vlastního vkládání), funkce třídění.### Bug Fixes

-**Nekonečné čekání 429 na úzké místo**(PR #495 od @xandr0s): Na 429 `limiter.stop({ dropWaitingJobs: true })` okamžitě selže všechny požadavky ve frontě, takže volající proti proudu mohou spustit nouzový režim. Limiter je odstraněn z mapy, takže další požadavek vytvoří novou instanci. -**Vlastní modely vkládání nelze vyřešit**(#496): `POST /v1/embeddings` nyní řeší vlastní modely vkládání ze VŠECH uzlů poskytovatele (nejen localhost). Umožňuje modely jako `google/gemini-embedding-001` přidané prostřednictvím řídicího panelu.### Issues Responded

-**#452**— Limity počtu požadavků na klíč API (potvrzeno, v plánu) -**#464**— Automatické vydávání klíčů API s limity poskytovatele/účtu (vyžaduje více podrobností) -**#488**— Automaticky aktualizovat seznamy modelů (potvrzeno, na plánu) -**#496**— Vlastní rozlišení poskytovatele vkládání (pevné)---

## [2.8.6] — 2026-03-20

> Sprint: Sloučit PR #494 (oprava role MiniMax), opravit řídicí panel KIRO MITM, vyřešit 8 problémů.### Funkce

-**MiniMax vývojář→oprava systémové role**(PR #494 od @zhangqiang8vip): Přepínání `preserveDeveloperRole` podle modelu. Přidá uživatelské rozhraní „Kompatibilita“ na stránku poskytovatelů. Opravena chyba 422 „role param error“ pro MiniMax a podobné brány. -**roleNormalizer**: `normalizeDeveloperRole()` nyní přijímá parametr `preserveDeveloperRole` s třístavovým chováním (undefined=ponechat, true=zachovat, false=převést). -**DB**: Nové `getModelPreserveOpenAIDeveloperRole()` a `mergeModelCompatOverride()` v `models.ts`.### Bug Fixes

-**KIRO MITM dashboard**(#481/#487): `CLIToolsPageClient` nyní směruje jakýkoli nástroj `configType: "mitm"` do `AntigravityToolCard` (ovládací prvky MITM Start/Stop). Dříve byla napevno zakódována pouze Antigravitace. -**AntigravityToolCard generic**: Místo pevně zakódovaných hodnot Antigravity používá `tool.image`, `tool.description`, `tool.id`. Chrání před chybějícími „výchozími modely“.### Cleanup

- Odstraněn `ZWS_README_V2.md` (dokumenty pouze pro vývoj z PR #494).### Issues Triaged (8)

-**#487**— Uzavřeno (KIRO MITM opraveno v této verzi) -**#486**— informace o potřebách (problém Windows REG.exe PATH) -**#489**— informace o potřebách (chybí ID antigravitačního projektu, je nutné opětovné připojení OAuth) -**#492**— informace o potřebách (chybějící app/server.js na chybně spravovaném uzlu) -**#490**— Potvrzeno (streamování + blokování kontextové mezipaměti, plánována oprava) -**#491**— Potvrzeno (nekonzistence stavu ověření kódu) -**#493**— Potvrzeno (předpona názvu modelu modálního poskytovatele, náhradní řešení poskytnuto) -**#488**— Nevyřízené požadavky na funkce (automatická aktualizace seznamů modelů)---

## [2.8.5] — 2026-03-19

> Sprint: Opravte zombie SSE streamy, kontextovou mezipaměť prvního kola, KIRO MITM a externí problémy s tříděním 5.### Bug Fixes

-**Zombie SSE Streams**(#473): Zkraťte `STREAM_IDLE_TIMEOUT_MS` z 300 s → 120 s pro rychlejší návrat komba, když se poskytovatelé zastaví uprostřed proudu. Konfigurovatelné přes env var. -**Context Cache Tag**(#474): Oprava `injectModelTag()` pro zpracování požadavků prvního kola (žádné zprávy asistenta) — ochrana kontextové mezipaměti nyní funguje od první odpovědi. -**KIRO MITM**(#481): Změňte KIRO `configType` z `guide` → `mitm` tak, aby ovládací panel vykresloval MITM Start/Stop ovládací prvky. -**E2E Test**(CI): Oprava `providers-bailian-coding-plan.spec.ts` — před kliknutím na tlačítko Přidat klíč API zrušte již existující modální překrytí.### Closed Issues

- #473 — Zombie SSE streamy obcházejí kombo záložní verzi
- #474 — Kontextová mezipaměť `<omniModel>` chybí v prvním kole
- #481 — MITM pro KIRO nelze aktivovat z palubní desky
- #468 — vzdálený server Gemini CLI (nahrazen #462 zavržením)
- #438 — Claude nemůže zapisovat soubory (externí problém s CLI)
- #439 — AppImage nefunguje (dokumentované řešení libfuse2)
- #402 — ARM64 DMG "poškozeno" (dokumentované řešení xattr -cr)
- #460 — CLI nelze spustit ve Windows (dokumentovaná oprava PATH)---

## [2.8.4] — 2026-03-19

> Sprint: Ukončení podpory rozhraní Gemini CLI, oprava VM guide i18n, oprava zabezpečení Dependabot, rozšíření schématu poskytovatele.### Funkce

–**Ukončení podpory rozhraní Gemini CLI**(#462): Označte poskytovatele „gemini-cli“ jako zastaralého s upozorněním – Google omezuje používání OAuth třetích stran od března 2026 -**Schéma poskytovatele**(#462): Rozšiřte ověření Zod o volitelná pole `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Přidejte `VM_DEPLOYMENT_GUIDE.md` do kanálu překladu i18n, vygenerujte všech 30 překladů národního prostředí z anglického zdroje (zasekly se v portugalštině)### Bezpečnost

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — opravuje znečištění prototypu CWE-1321 (#484, @dependabot)### Closed Issues

– #472 — Regrese modelových aliasů (opraveno ve verzi 2.8.2)

- #471 — Překlady příručky VM jsou nefunkční
- #483 — Koncová „data: null“ po „[DONE]“ (opraveno ve verzi 2.8.3)### Merged PRs

- #484 — deps: náraz zploštělý z 3.3.3 na 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: český i18n, oprava protokolu SSE, překlad průvodce VM.### Funkce

-**Český jazyk**(#482): Plně čeština (cs) i18n — 22 dokumentů, 2606 řetězců uživatelského rozhraní, aktualizace přepínače jazyků (@zen0bit) -**VM Deployment Guide**: Přeloženo z portugalštiny do angličtiny jako zdrojový dokument (@zen0bit)### Bug Fixes

-**SSE Protocol**(#483): Zastavení odesílání koncových `data: null` po signálu `[DONE]` — oprava `AI_TypeValidationError` v přísných klientech AI SDK (validátory založené na Zod)### Merged PRs

- #482 — Přidat češtinu + opravit VM_DEPLOYMENT_GUIDE.md zdroj v angličtině (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 sloučené PR, oprava směrování aliasů modelů, export protokolu a třídění problémů.### Funkce

-**Export protokolu**: Nové tlačítko Export na `/dashboard/logs` s rozevíracím seznamem časového rozsahu (1h, 6h, 12h, 24h). Stáhne JSON protokolů request/proxy/call přes `/api/logs/export` API (#user-request)### Bug Fixes

-**Směrování aliasů modelů**(#472): Nastavení → Aliasy modelů nyní správně ovlivňují směrování poskytovatele, nejen detekci formátu. Dříve byl výstup `resolveModelAlias()` používán pouze pro `getModelTargetFormat()`, ale původní ID modelu bylo odesláno poskytovateli -**Použití vyprázdnění streamu**(#480): Údaje o využití z poslední události SSE ve vyrovnávací paměti jsou nyní správně extrahovány během vyprázdnění streamu (sloučeno z @prakersh)### Merged PRs

- #480 — Extrahujte využití ze zbývající vyrovnávací paměti ve flush handleru (@prakersh)
- #479 — Přidejte chybějící cenové položky Codex 5.3/5.4 a Anthropic model ID (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Pět komunitních PR – opravy protokolu streamování hovorů, kompatibilita Kiro, analýza tokenů mezipaměti, čínský překlad a konfigurovatelná ID volání nástrojů.### Funkce

-**feat(logs)**: Obsah odpovědí protokolu hovorů se nyní správně shromažďuje z nezpracovaných bloků poskytovatelů (OpenAI/Claude/Gemini) před překladem, čímž se opravuje prázdné užitečné zatížení odpovědí v režimu streamování (#470, @zhangqiang8vip) -**feat(providers)**: 9znaková normalizace volání ID nástroje konfigurovatelná pro každý model (styl Mistral) – pouze modely s povolenou možností získají zkrácená ID (#470) -**feat(api)**: Key PATCH API rozšířené o podporu polí `allowedConnections`, `name`, `autoResolve`, `isActive` a `accessSchedule` (#470) -**feat(dashboard)**: Rozložení jako první v uživatelském rozhraní protokolu požadavků (#470) -**feat(i18n)**: Vylepšený překlad čínštiny (zh-CN) — kompletní retranslace (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Odstraňte vložené pole `model` z těla požadavku – Kiro API odmítá neznámá pole nejvyšší úrovně (#478, @prakersh) -**fix(usage)**: Zahrnout čtení mezipaměti + tokeny vytvoření mezipaměti do součtů vstupu historie použití pro přesné analýzy (#477, @prakersh) -**fix(callLogs)**: Podpora polí použití formátu Claude (`input_tokens`/`output_tokens`) vedle formátu OpenAI, zahrnuje všechny varianty tokenů mezipaměti (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Poskytovatel Bailian Coding Plan s upravitelnými základními URL a příspěvky komunity pro Alibaba Cloud a Kimi Coding.### Funkce

-**feat(providers)**: Přidán plán Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio s rozhraním API kompatibilním s Anthropic. Statický katalog 8 modelů včetně Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 a Kimi K2.5. Zahrnuje vlastní ověření ověření (400=platný, 401/403=neplatný) (#467, @Mind-Dragon) -**feat(admin)**: Upravitelná výchozí adresa URL v postupech vytváření/úpravy správce poskytovatele – uživatelé mohou nakonfigurovat vlastní základní adresy URL pro každé připojení. Přetrvává v „providerSpecificData.baseUrl“ s ověřením schématu Zod, které odmítá schémata bez http(s) (#467)### 🧪 Tests

- Přidáno více než 30 testů jednotek a 2 scénáře e2e pro poskytovatele Bailian Coding Plan, které zahrnují ověření ověření, zpevnění schématu, chování na úrovni trasy a integraci mezi vrstvami---

## [2.7.10] — 2026-03-19

> Sprint: Dva noví poskytovatelé přispívali komunitou (Alibaba Cloud Coding, Kimi Coding API-key) a oprava Docker pino.### Funkce

-**feat(providers)**: Přidána podpora Alibaba Cloud Coding Plan se dvěma koncovými body kompatibilními s OpenAI – `alicode` (Čína) a `alicode-intl` (International), každý s 8 modely (#465, @dtk1985) -**feat(providers)**: Přidána vyhrazená cesta poskytovatele `kimi-coding-apikey` – přístup ke kódování Kimi založený na klíči API již není vynucený cestou `kimi-coding` pouze s protokolem OAuth. Zahrnuje registr, konstanty, API modelů, konfiguraci a ověřovací test (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Do obrázku Dockeru přidána chybějící závislost `split2` — `pino-abstract-transport` ji vyžaduje za běhu, ale nebyla zkopírována do samostatného kontejneru, což způsobovalo pád `Nelze najít modul 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Nativně podporován průchod dílčích cest odpovědí Codex, opraven pád Windows MITM a upravena schémata agentů Combos.### Funkce

-**feat(codex)**: Nativní průchod podcestou odpovědí pro Codex – nativně směruje `POST /v1/responses/compact` do Codexu upstream, přičemž zachovává kompatibilitu Claude Code bez odstranění přípony `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Schémata Zod (`updateComboSchema` a `createComboSchema`) nyní zahrnují `system_message`, `tool_filter_regex` a `context_cache_protection`. Opravuje chybu, kdy byla nastavení specifická pro agenty vytvořená prostřednictvím řídicího panelu tiše zahozena ověřovací vrstvou backendu (#458) -**fix(mitm)**: Zhroucení profilu Kiro MITM ve Windows opraveno — `node-machine-id` se nezdařilo kvůli chybějícímu env `REG.exe` a nouzový návrat vyvolal závažnou chybu `crypto is notdefined`. Záložní nyní bezpečně a správně importuje kryptoměnu (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Chyba při úspoře rozpočtu + funkce uživatelského rozhraní kombinovaného agenta + oprava zabezpečení značky omniModel.### 🐛 Bug Fixes

-**fix(budget)**: „Save Limits“ již nevrací 422 – „warningThreshold“ je nyní správně odeslán jako zlomek (0–1) namísto procenta (0–100) (#451) -**fix(combos)**: Značka interní mezipaměti `<omniModel>` je nyní odstraněna před předáním požadavků poskytovatelům, což zabraňuje přerušení relací mezipaměti (#454)### Funkce

-**feat(combos)**: Sekce Funkce agenta přidána do kombinovaného modu vytváření/úprav – odhalte přepsání `system_message`, `tool_filter_regex` a `context_cache_protection` přímo z řídicího panelu (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino havárie, pracovní oprava odpovědí Codex CLI, synchronizace uzamčení balíčku.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` a `pino-pretty` nyní explicitně zkopírovány ve fázi Docker runner – Samostatné trasování Next.js postrádá tato peer deps, což způsobuje selhání `Nelze najít modul pino-abstract-transport` při spuštění (#449) -**fix(responses)**: Odstraňte `initTranlators()` z cesty `/v1/responses` – havaroval pracovník Next.js s `pracovník odešel` uncaughtException u požadavků Codex CLI (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` se nyní zadává při každém nárazu verze, aby bylo zajištěno, že Docker `npm ci` používá přesné verze závislostí---

## [2.7.5] — 2026-03-18

> Sprint: Vylepšení UX a oprava Windows CLI healthcheck.### 🐛 Bug Fixes

-**fix(ux)**: Zobrazit nápovědu k výchozímu heslu na přihlašovací stránce – noví uživatelé nyní vidí `"Výchozí heslo: 123456"` pod zadáním hesla (#437) -**fix(cli)**: Claude CLI a další nástroje nainstalované npm jsou nyní správně detekovány jako spustitelné ve Windows – spawn používá `shell:true` k vyřešení `.cmd` wrapperů přes PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: řídicí panel vyhledávacích nástrojů, opravy i18n, limity Copilota, oprava ověření Serper.### Funkce

-**feat(search)**: Přidání vyhledávacího hřiště (10. koncový bod), stránka vyhledávacích nástrojů s porovnáním poskytovatelů/přehodnocení kanálu/historie vyhledávání, místní přehodnocení směrování, auth guards na vyhledávacím rozhraní API (#443 od @Regis-RCR)

- Nová trasa: `/dashboard/search-tools`
- Záznam na postranním panelu v části Debug
- `GET /api/search/providers` a `GET /api/search/stats` s ochranou autorizace
- Směrování uzlů místního poskytovatele pro `/v1/rerank`
- 30+ i18n klíčů ve jmenném prostoru hledání### 🐛 Bug Fixes

-**fix(search)**: Oprava normalizéru Brave news (vracel 0 výsledků), vynucení zkrácení max_results po normalizaci, oprava adresy URL pro načtení stránky koncových bodů (#443 od @Regis-RCR) -**fix(analytics)**: Lokalizovat štítky dne/datu analýzy – nahraďte pevně zakódované portugalské řetězce výrazem „Intl.DateTimeFormat(locale)“ (#444 od @hijak) -**fix(copilot)**: Správné zobrazení typu účtu GitHub Copilot, filtrování zavádějících řádků s neomezenými kvótami z ovládacího panelu limitů (#445 od @hijak) -**fix(providers)**: Zastavit odmítání platných klíčů Serper API – odpovědi jiné než 4xx považujte za platné ověření (#446 od @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Oprava záložní kvóty přímého API Codex.### 🐛 Bug Fixes

-**fix(codex)**: Blokování týdenně vyčerpaných účtů v přímém záložním rozhraní API (#440)

- `resolveQuotaWindow()` shoda prefixů: `"weekly"` nyní odpovídá klíčům mezipaměti `"weekly (7d)"`
- `applyCodexWindowPolicy()` vynucuje `useWeekly`/`use5h` přepíná správně
- 4 nové regresní testy (celkem 766)---

## [2.7.2] — 2026-03-18

> Sprint: Opraven kontrast uživatelského rozhraní v režimu Light.### 🐛 Bug Fixes

-**fix(logs)**: Oprava kontrastu světelného režimu v tlačítkách filtru protokolů požadavků a kombinovaném odznaku (#378)

- Tlačítka Error/Success/Combo filter nyní čitelná ve světlém režimu
- Odznak kombinované řady používá ve světlém režimu silnější fialovou---

## [2.7.1] — 2026-03-17

> Sprint: Jednotné směrování webového vyhledávání (POST /v1/search) s 5 poskytovateli + bezpečnostní opravy Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Jednotné směrování webového vyhledávání — `POST /v1/search` s 5 poskytovateli (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover napříč poskytovateli, 6 500+ bezplatných vyhledávání za měsíc
- Mezipaměť v paměti se slučováním požadavků (konfigurovatelné TTL)
  – Dashboard: karta Search Analytics v `/dashboard/analytics` s rozpisem poskytovatelů, mírou přístupu do mezipaměti, sledováním nákladů
- Nové API: `GET /api/v1/search/analytics` pro statistiky požadavků na vyhledávání
- Migrace DB: sloupec `request_type` v `call_logs` pro sledování požadavků mimo chat
- Ověření Zod (`v1SearchSchema`), ověřené, náklady zaznamenané pomocí `recordCost()`### Bezpečnost

-**deps**: Next.js 16.1.6 → 16.1.7 – opravuje 6 CVE: -**Kritické**: CVE-2026-29057 (pašování požadavku HTTP přes http-proxy) -**Vysoká**: CVE-2026-27977, CVE-2026-27978 (WebSocket + akce serveru) -**Střední**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Soubor                                                           | Účel                                                       |
| ---------------------------------------------------------------- | ---------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Obslužný program vyhledávání se směrováním 5 poskytovatelů |
| `open-sse/config/searchRegistry.ts`                              | Registr poskytovatelů (autorizace, cena, kvóta, TTL)       |
| `open-sse/services/searchCache.ts`                               | Mezipaměť v paměti se slučováním požadavků                 |
| `src/app/api/v1/search/route.ts`                                 | Cesta Next.js (POST + GET)                                 |
| `src/app/api/v1/search/analytics/route.ts`                       | Statistiky vyhledávání API                                 |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Karta hlavního panelu Analytics                            |
| `src/lib/db/migrations/007_search_request_type.sql`              | Migrace DB                                                 |
| `tests/unit/search-registry.test.mjs`                            | 277 řádků jednotkových testů                               | --- |

## [2.7.0] — 2026-03-17

> Sprint: Funkce inspirované ClawRouterem – příznak toolCalling, vícejazyčná detekce záměru, záložní řešení řízené benchmarkem, deduplikace požadavků, zásuvná strategie směrovače, ceny Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast – `0,20 $/0,50 $ za 1 milion tokenů`, latence 1143 ms p50, podporováno volání nástroje
–**výkon (cena)**: xAI Grok-4 (standardní) – „0,20 $/1,50 $ za 1 milion tokenů“, vlajková loď -**feat(pricing)**: GLM-5 přes Z.AI — `$0.5/1M`, 128K výstupní kontext -**feat(pricing)**: MiniMax M2.5 – `0,30 $/1 milion vstup`, uvažování + agentní úkoly -**feat(pricing)**: DeepSeek V3.2 – aktualizovaná cena `0,27 $/1,10 $ za 1M` -**feat(pricing)**: Kimi K2.5 přes Moonshot API – přímý přístup Moonshot API -**feat(providers)**: Přidán poskytovatel Z.AI (alias `zai`) — rodina GLM-5 s výstupem 128K### 🧠 Routing Intelligence

-**feat(registry)**: příznak `toolCalling` pro každý model v registru poskytovatelů – kombinace nyní mohou preferovat/vyžadovat modely s možností volání nástrojů -**feat(scoring)**: Vícejazyčná detekce záměru pro skórování AutoCombo — PT/ZH/ES/AR skripty/jazykové vzory ovlivňují výběr modelu podle kontextu požadavku -**feat(fallback)**: Záložní řetězce řízené benchmarkem – údaje o skutečné latenci (p50 z `comboMetrics`) používané k dynamickému přeřazení nouzových priorit -**feat(dedup)**: Požadavek na deduplikaci přes content-hash – 5sekundové okno idempotency zabraňuje duplicitním voláním poskytovatele v opakování klientů -**feat(router)**: Připojitelné rozhraní `RouterStrategy` v `autoCombo/routerStrategy.ts` — vlastní logiku směrování lze vložit bez úpravy jádra### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nová schémata pokročilých nástrojů: `omniroute_get_provider_metrics` (p50/p95/p99 na poskytovatele) a `omniroute_explain_route` (vysvětlení rozhodnutí o směrování)
–**feat(mcp)**: Aktualizovány rozsahy ověřování nástroje MCP – pro nástroje metrik poskytovatelů přidán rozsah `metrics:read` -**feat(mcp)**: `omniroute_best_combo_for_task` nyní přijímá parametr `languageHint` pro vícejazyčné směrování### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` rozšířené o sledování percentilu latence v reálném čase na poskytovatele/účet -**feat(health)**: Health API (`/api/monitoring/health`) nyní vrací pole `p50Latency` a `errorRate` podle poskytovatele -**feat(usage)**: Migrace historie využití pro sledování latence podle modelu### 🗄️ DB Migrations

-**feat(migrations)**: Nový sloupec `latency_p50` v tabulce `combo_metrics` – nepřekonatelný, bezpečný pro stávající uživatele### 🐛 Bug Fixes / Closures

-**zavřít(#411)**: lepší rozlišení hašovaného modulu sqlite3 v systému Windows – opraveno ve verzi 2.6.10 (f02c5b5) -**zavřít(#409)**: Dokončení chatu GitHub Copilot u modelů Claude selhává, když jsou připojeny soubory – opraveno ve verzi 2.6.9 (838f1d6) -**zavřít(#405)**: Duplikát #411 – vyřešeno## [2.6.10] — 2026-03-17

> Oprava systému Windows: předpřipravené stahování better-sqlite3 bez node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Ve Windows selhalo `npm install -g omniroute` s `better_sqlite3.node` není platná aplikace Win32, protože přibalený nativní binární soubor byl zkompilován pro Linux. Přidává**Strategii 1.5**do `scripts/postinstall.mjs`: používá `@mapbox/node-pre-gyp install --fallback-to-build=false` (sbalený v rámci `better-sqlite3`) ke stažení správné předkompilované binárky pro aktuální OS/arch bez nutnosti jakýchkoliv nástrojů pro sestavení (node-node-gyp). Vrátí se zpět k `npm rebuild` pouze v případě, že stahování selže. Přidává chybové zprávy specifické pro platformu s jasnými pokyny k ruční opravě.---

## [2.6.9] — 2026-03-17

> Opravy CI (t11 any-budget), oprava chyby #409 (přílohy souborů přes Copilot+Claude), oprava pracovního postupu.### 🐛 Bug Fixes

-**fix(ci)**: Odstraňte slovo „any“ z komentářů v `openai-responses.ts` a `chatCore.ts`, které neprošly kontrolou t11 `jakékoli ` rozpočtu (falešně pozitivní z komentářů počítajících regulární výrazy) -**fix(chatCore)**: Normalizujte nepodporované typy částí obsahu před předáním poskytovatelům (#409 — Kurzor odešle `{type:"file"}`, když jsou připojeny soubory `.md`; Copilot a další poskytovatelé kompatibilní s OpenAI odmítají s "type musí být buď 'image_url' nebo 'text 'text'`"; oprava u`` text převede na neznámý `soubor``; typy)### 🔧 Workflow

-**chore(generate-release)**: Přidejte ATOMIC COMMIT RULE – změna verze (`npm version patch`) MUSÍ nastat před odevzdáním souborů funkcí, aby bylo zajištěno, že značka vždy ukazuje na odevzdání obsahující všechny změny verzí společně---

## [2.6.8] — 2026-03-17

> Sprint: Combo jako agent (systémová výzva + filtr nástrojů), ochrana kontextové mezipaměti, automatická aktualizace, podrobné protokoly, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE komba ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Nová tabulka `request_detail_logs` se spouštěčem pro 500 záznamů kruhové vyrovnávací paměti, přihlášení pomocí přepínače nastavení### Funkce

-**feat(combo)**: Přepsání systémové zprávy na kombinaci (#399 — pole `system_message` nahradí nebo vloží systémovou výzvu před předáním poskytovateli) -**feat(combo)**: Nástrojový filtr Regex na kombinaci (#399 — `tool_filter_regex` uchovává pouze nástroje odpovídající vzoru; podporuje OpenAI + Antropické formáty) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` označuje odpovědi pomocí `<omniModel>poskytovatele/modelu</omniModel>` a připíná model pro kontinuitu relace) -**feat(settings)**: Automatická aktualizace přes Nastavení (#320 — `GET /api/system/version` + `POST /api/system/update` — kontroluje registr npm a aktualizace na pozadí s restartem pm2) -**feat(logs)**: Podrobné protokoly požadavků (#378 – zachycuje celá těla kanálu ve 4 fázích: požadavek klienta, přeložený požadavek, odpověď poskytovatele, odpověď klienta – přepínač opt-in, 64KB úprava, 500 záznamů ring-buffer) -**feat(mitm)**: Profil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` cílí na api.anthropic.com, znovu používá stávající infrastrukturu MITM)---

## [2.6.7] — 2026-03-17

> Sprint: Vylepšení SSE, rozšíření lokálních provider_nodes, proxy registr, opravy Claude passthrough.### Funkce

-**feat(health)**: Kontrola stavu na pozadí pro místní `provider_nodes` s exponenciálním stažením (30s→300s) a `Promise.allSettled`, aby se zabránilo blokování (#423, @Regis-RCR) -**feat(embeddings)**: Směrujte `/v1/embeddings` do místního `provider_nodes` — `buildDynamicEmbeddingProvider()` s ověřením názvu hostitele (#422, @Regis-RCR) -**feat(audio)**: Směrujte TTS/STT do místního `provider_nodes` — `buildDynamicAudioProvider()` s ochranou SSRF (#416, @Regis-RCR) -**feat(proxy)**: Registr proxy, rozhraní API pro správu a zobecnění limitu kvót (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Odstraňte pole specifická pro Clauda (`metadata`, `antropická_verze`), když je cílem OpenAI-compat (#421, @prakersh) -**fix(sse)**: Extrahujte využití Clauda SSE (`input_tokens`, `output_tokens`, cache tokeny) v režimu passthrough stream (#420, @prakersh) -**fix(sse)**: Vygenerujte záložní `call_id` pro volání nástrojů s chybějícími/prázdnými ID (#419, @prakersh) -**fix(sse)**: Průchod Claude-to-Claude — přední tělo zcela nedotčené, bez opětovného překladu (#418, @prakersh) -**fix(sse)**: Filtrujte osiřelé položky `tool_result` po komprimaci kontextu Claude Code, abyste se vyhnuli 400 chybám (#417, @prakersh) -**fix(sse)**: Přeskočte volání nástroje s prázdným názvem v překladači Responses API, abyste zabránili nekonečným smyčkám `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Odstraňte prázdné bloky obsahu textu před překladem (#427, @prakersh) -**fix(api)**: Přidejte `refreshable: true` do testovací konfigurace Claude OAuth (#428, @prakersh)### 📦 Dependencies

– Bump `vitest`, `@vitest/*` a související závislosti devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Kompatibilita Turbopack/Docker — odeberte protokol `node:` ze všech importů `src/`.### 🐛 Bug Fixes

-**fix(build)**: Odstraněna předpona protokolu `node:` z příkazů `import` v 17 souborech pod `src/`. Importy `node:fs`, `node:path`, `node:url`, `node:os` atd. způsobily ,,Soubor Ecmascript měl chybu`u sestavení Turbopack (Next.js 15 Docker) au upgradů ze starších globálních instalací npm. Dotčené soubory:`migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`a 12 dalších v`src/app/api/`a`src/lib/`.
-**chore(workflow)**: Aktualizováno `generate-release.md`, aby synchronizace Docker Hub a nasazení duálního VPS byly**povinné**kroky v každém vydání.---

## [2.6.5] — 2026-03-17

> Sprint: filtrování parametrů modelu uvažování, oprava místního poskytovatele 404, poskytovatel brány Kilo, nárůsty závislostí.### ✨ New Features

-**feat(api)**: Přidán**Kilo Gateway**(`api.kilo.ai`) jako nový poskytovatel klíče API (také znám jako `kg`) — 335+ modelů, 6 bezplatných modelů, 3 modely s automatickým směrováním (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modely průchodu podporované prostřednictvím koncového bodu `/api/gateway/models`. (PR #408 od @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Odstraňte nepodporované parametry pro modely uvažování (o1, o1-mini, o1-pro, o3, o3-mini). Modely v rodině `o1`/`o3` odmítají `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` a `n` s HTTP 400. Parametry jsou nyní odstraněny na vrstvě `chatCore` před předáváním. Pro vyhledání používá deklarativní pole `unsupportedParams` na model a předem vypočítanou mapu O(1). (PR #412 od @Regis-RCR) -**fix(sse)**: Místní poskytovatel 404 nyní vede k**uzamknutí pouze pro model (5 sekund)**namísto uzamčení na úrovni připojení (2 minuty). Když místní inferenční backend (Ollama, LM Studio, oMLX) vrátí 404 pro neznámý model, připojení zůstane aktivní a ostatní modely okamžitě pokračují v práci. Také opravuje již existující chybu, kdy `model` nebyl předán `markAccountUnavailable()`. Místní poskytovatelé zjištěni pomocí názvu hostitele (`localhost`, `127.0.0.1`, `::1`, rozšiřitelné prostřednictvím env var `LOCAL_HOSTNAMES`). (PR #410 od @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- "https-proxy-agent" 7 → 8
- "agent-base" 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Odstraněny neexistující názvy modelů u 5 poskytovatelů: -**gemini / gemini-cli**: odstraněny `gemini-3.1-pro/flash` a `gemini-3-*-preview` (neexistují v Google API v1beta); nahrazeno `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravitace**: odstraněny `gemini-3.1-pro-high/low` a `gemini-3-flash` (neplatné interní aliasy); nahrazeny skutečnými modely 2.x -**github (Copilot)**: odstraněny `gemini-3-flash-preview` a `gemini-3-pro-preview`; nahrazeno `gemini-2.5-flash` -**nvidia**: opraveno `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM používá jmenný prostor `meta/` pro modely Meta); přidány `nvidia/llama-3.1-70b-instruct` a `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Aktualizováno `free-stack` combo na vzdálené DB: odstraněn `qw/qwen3-coder-plus` (vypršel obnovovací token), opraven `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct →mini-instruct`, opraveno `mini-instruct`. `gemini/gemini-2.5-flash`, přidáno `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip zapečen do sestavovacího potrubí, přidán poskytovatel syntetiky, opravena cesta VPS PM2.### 🐛 Bug Fixes

-**fix(build)**: Hash-strip Turbopacku nyní běží v**době kompilace**pro VŠECHNY balíčky – nejen pro `better-sqlite3`. Krok 5.6 v `prepublish.mjs` prochází každý `.js` v `app/.next/server/` a odstraňuje 16znakovou hexadecimální příponu z jakékoli hašované `require()`. Opravy `zod-dcb22c...`, `pino-...` atd. MODULE_NOT_FOUND na globálních instalacích npm. Zavírá #398 -**fix(deploy)**: PM2 na obou VPS ukazovalo na zastaralé adresáře git-clone. Překonfigurováno na `app/server.js` v globálním balíčku npm. Byl aktualizován pracovní postup `/deploy-vps`, aby používal `npm pack + scp` (registr npm odmítá balíčky o velikosti 299 MB).### Funkce

-**feat(provider)**: Syntetické ([syntetické.nové](https://syntetické.nové)) – odvození kompatibilní s OpenAI zaměřené na soukromí. `passthroughModels: true` pro dynamický katalog modelů HuggingFace. Počáteční modely: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 od @Regis-RCR)### 📋 Issues Closed

-**zavřít #398**: regrese hash npm – opraveno hash-strip v době kompilace v předběžném publikování -**triage #324**: Snímek obrazovky chyby bez kroků – požadované detaily reprodukce---

## [2.6.2] — 2026-03-16

> Sprint: plně opraveno hašování modulů, sloučeny 2 PR (filtr Anthropic tools + vlastní cesty koncových bodů), přidán poskytovatel Alibaba Cloud DashScope, 3 zastaralé problémy uzavřeny.### 🐛 Bug Fixes

-**fix(build)**: Rozšířený hash-strip `externals` webového balíčku, aby pokryl VŠECHNY `serverExternalPackages`, nejen `better-sqlite3`. Next.js 16 Turbopack hashuje `zod`, `pino` a každý další balíček externího serveru do názvů jako `zod-dcb22c6336e0bc69`, které v `node_modules` za běhu neexistují. Všeobecný regex HASH_PATTERN nyní odstraní 16znakovou příponu a vrátí se zpět k základnímu názvu balíčku. Také přidáno `NEXT_PRIVATE_BUILD_WORKER=0` do `prepublish.mjs` pro posílení režimu webpacku a navíc skenování po sestavení, které hlásí všechny zbývající hashované odkazy. (#396, #398, PR #403) -**fix(chat)**: Názvy nástrojů v antropickém formátu (`tool.name` bez obalu `.function`) byly tiše vynechány filtrem prázdných jmen zavedeným v #346. LiteLLM zastupuje požadavky s předponou `anthropic/` ve formátu API pro Anthropic Messages, což způsobí, že všechny nástroje budou filtrovány a Anthropic vrátí `400: tool_choice.any lze zadat pouze při poskytování nástrojů`. Opraveno návratem k `tool.name`, když `tool.function.name` chybí. Přidáno 8 testů regresních jednotek. (PR #397)### Funkce

-**feat(api)**: Vlastní cesty koncových bodů pro uzly poskytovatelů kompatibilní s OpenAI – nakonfigurujte `chatPath` a `modelsPath` pro každý uzel (např. `/v4/chat/completions`) v uživatelském rozhraní připojení poskytovatele. Zahrnuje migraci DB (`003_provider_node_custom_paths.sql`) a dezinfekci cesty URL (bez procházení `..`, musí začínat `/`). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope přidán jako poskytovatel kompatibilní s OpenAI. Mezinárodní koncový bod: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modelů: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Klíč API nosiče.### 📋 Issues Closed

-**zavřít #323**: Chyba připojení Cline `[object Object]` – opravena ve verzi 2.3.7; dal uživateli pokyn k upgradu z verze 2.2.9 -**zavřít #337**: Sledování kreditu Kiro – implementováno ve verzi 2.5.5 (#381); namířil uživatele na Dashboard → Použití -**triage #402**: ARM64 macOS DMG poškozené – požadovaná verze macOS, přesná chyba a doporučené řešení `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Kritická oprava spuštění: Globální instalace npm v2.6.0 se zhroutily s chybou 500 kvůli chybě hashování názvu modulu Turbopack/webpack v nástrojovém háku Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Vynutí, aby bylo `better-sqlite3` vždy vyžadováno přesným názvem balíčku v balíku serveru webpack. Next.js 16 zkompiloval instrumentační hák do samostatného bloku a vyslal `require('better-sqlite3-<hash>')` — název hashovaného modulu, který v `node_modules` neexistuje — i když byl balíček uveden v `serverExternalPackages`. Do konfigurace webpacku serveru byla přidána explicitní funkce `externals`, takže bundler vždy vydává `require('better-sqlite3')`, čímž se vyřeší spouštění `500 Internal Server Error` při čistých globálních instalacích. (#394, PR #395)### 🔧 CI

-**ci**: Přidáno `workflow_dispatch` do `npm-publish.yml` se zabezpečením synchronizace verzí pro ruční spouštění (#392) -**ci**: Přidán `workflow_dispatch` do `docker-publish.yml`, aktualizovány akce GitHub na nejnovější verze (#392)---

## [2.6.0] - 2026-03-15

> Sprint řešení problému: Opraveny 4 chyby, vylepšeno uživatelské rozhraní protokolů, přidáno sledování kreditu Kiro.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI a SD WebUI se již nezobrazují v seznamu poskytovatelů stránky Media, pokud nejsou nakonfigurovány – načte `/api/providers` při připojení a skryje místní poskytovatele bez připojení (#390) -**fix(auth)**: Round-robin již znovu nevybírá účty s omezenou sazbou ihned po cooldownu — `backoffLevel` se nyní používá jako primární klíč řazení v rotaci LRU (#340) -**fix(oauth)**: Qoder (a další poskytovatelé, kteří přesměrovávají na své vlastní uživatelské rozhraní) již nenechají modal OAuth zaseknutý na „Čekání na autorizaci“ – automatický přechod detektoru se zavřeným vyskakovacím oknem do režimu ručního zadávání adresy URL (#344) -**fix(logs)**: Tabulka protokolu požadavků je nyní čitelná ve světlém režimu – stavové odznaky, počty tokenů a kombinované značky používají adaptivní třídy barev „tmavé:“ (#378)### Funkce

-**feat(kiro)**: Do nástroje pro získávání využití bylo přidáno sledování kreditu Kiro – dotazy „getUserCredits“ z koncového bodu AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)**: Zarovnané `test:plan3`, `test:fixes`, `test:security` pro použití stejného zavaděče `tsx/esm` jako `npm test` — eliminuje falešné zápory rozlišení modulu v cílených sériích (PR #386)---

## [2.5.9] - 2026-03-15

> Oprava nativního průchodu Codex + zpevnění validace těla trasy.### 🐛 Bug Fixes

-**fix(codex)**: Zachování nativního průchodu rozhraní Responses API pro klienty Codexu – zabraňuje zbytečným překladovým mutacím (PR #387) -**fix(api)**: Ověření těl požadavků na trasách cen/synchronizace a směrování úkolů – zabraňuje selháním způsobeným nesprávně tvarovanými vstupy (PR #388) -**fix(auth)**: Tajemství JWT přetrvávají i po restartování prostřednictvím `src/lib/db/secrets.ts` — eliminuje chyby 401 po restartu pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Oprava sestavení: obnovte konektivitu VPS přerušenou nedokončeným publikováním v2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` stále používá zastaralý příznak `--webpack`, což způsobuje, že samostatné sestavení Next.js tiše selže – publikování npm bylo dokončeno bez `app/server.js`, což narušuje nasazení VPS---

## [2.5.7] - 2026-03-15

> Opravy zpracování chyb mediálního hřiště.### 🐛 Bug Fixes

–**fix(media)**: Přepis „Je vyžadován klíč API“ falešně pozitivní, když zvuk neobsahuje žádnou řeč (hudba, ticho) – nyní se místo toho zobrazuje „Nebyla zjištěna žádná řeč“ -**fix(media)**: `upstreamErrorResponse` v `audioTranscription.ts` a `audioSpeech.ts` nyní vrací správný JSON (`{error:{message}}`), což umožňuje správnou detekci chyby pověření 401/403 v MediaPageClient -**fix(media)**: `parseApiError` nyní zpracovává pole `err_msg` Deepgramu a detekuje v chybových zprávách `"klíč api"` pro přesnou klasifikaci chyb pověření---

## [2.5.6] - 2026-03-15

> Kritické opravy zabezpečení/autorizace: Antigravity OAuth nefunkční + relace JWT ztracené po restartu.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravitační Google OAuth nyní správně odesílá `client_secret` do koncového bodu tokenu. Záložní hodnotou pro `ANTIGRAVITY_OAUTH_CLIENT_SECRET` byl prázdný řetězec, což je nepravdivé — takže `client_secret` nebyl nikdy zahrnut do požadavku, což způsobilo chyby `"client_secret is missing"` pro všechny uživatele bez vlastní var. Zavírá #383. -**fix(auth) #385**: `JWT_SECRET` je nyní zachováno v SQLite (`namespace='secrets'`) při první generaci a znovu načteno při dalších spuštěních. Dříve se při každém spuštění procesu generoval nový náhodný tajný klíč, který po restartu nebo upgradu zrušil platnost všech existujících souborů cookie/relací. Ovlivňuje `JWT_SECRET` i `API_KEY_SECRET`. Zavírá #382.---

## [2.5.5] - 2026-03-15

> Oprava odstranění duplicitního seznamu modelů, zpevnění samostatného sestavení Electron a sledování kreditu Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` nyní zahrnuje aliasy poskytovatelů při sestavování filtru aktivního poskytovatele – modely pro `claude` (jinak `cc`) a `github` (jinak `gh`) byly vždy zobrazeny bez ohledu na to, zda bylo připojení nakonfigurováno, protože klíče `PROVIDER_MODELses` poskytovatele jsou uloženy pod aliasy poskytovatelů. Opraveno rozšířením každého aktivního ID poskytovatele tak, aby zahrnovalo také jeho alias prostřednictvím „PROVIDER_ID_TO_ALIAS“. Zavírá #353. -**fix(electron) #379**: Nový `scripts/prepare-electron-standalone.mjs` uvádí vyhrazený balíček `/.next/electron-standalone` před balením Electron. Přeruší se s jasnou chybou, pokud je `node_modules` symbolický odkaz (elektron-builder by dodal runtime závislost na sestavení stroje). Čištění cest napříč platformami prostřednictvím `path.basename`. Autor: @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Sledování zůstatku kreditu Kiro – koncový bod využití nyní vrací kreditní data pro účty Kiro voláním `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (stejný koncový bod, který Kiro IDE používá interně). Vrátí zbývající kredity, celkovou povolenku, datum obnovení a úroveň předplatného. Zavírá #337.## [2.5.4] - 2026-03-15

> Oprava spouštění loggeru, oprava zabezpečení bootstrap přihlášení a zlepšení spolehlivosti HMR pro vývojáře. Infrastruktura CI posílila.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Obnovení cesty protokolu transportu pino — `formatters.level` v kombinaci s `transport.targets` pino zamítne. Konfigurace podporované transportem nyní odstraňují formátovač úrovně pomocí `getTransportCompatibleConfig()`. Také opravuje numerické mapování úrovní v `/api/logs/console`: `30→info, 40→warn, 50→error` (bylo posunuto o jednu). -**fix(login) #375**: Přihlašovací stránka se nyní zavádí z veřejného koncového bodu `/api/settings/require-login` namísto chráněného `/api/settings`. V nastaveních chráněných heslem stránka předběžného ověření dostávala 401 a zbytečně se vracela k bezpečným výchozím hodnotám. Veřejná cesta nyní vrací všechna metadata bootstrapu (`requireLogin`, `hasPassword`, `setupComplete`) s konzervativní 200 záložní chybou. -**fix(dev) #374**: Přidejte `localhost` a `127.0.0.1` do `allowedDevOrigins` v `next.config.mjs` — HMR websocket byl zablokován při přístupu k aplikaci přes adresu zpětné smyčky, což způsobovalo opakovaná upozornění na křížový původ.### 🔧 CI & Infrastructure

-**ESLint OOM oprava**: `eslint.config.mjs` nyní ignoruje `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` a `clipr/**` – ESLint havaroval s hromadou JS OOM skenováním blochbs Code a zkompilovaným bloss.bin -**Oprava testu jednotky**: Odebráno zastaralé `ALTER TABLE provider_connections ADD COLUMN "skupina"` ze 2 testovacích souborů — sloupec je nyní součástí základního schématu (přidáno v #373), což způsobuje `SQLITE_ERROR: duplicitní název sloupce` při každém spuštění CI. -**Pre-commit hook**: Přidáno `npm run test:unit` do `.husky/pre-commit` — testy jednotek nyní blokují nefunkční commity, než dosáhnou CI.## [2.5.3] - 2026-03-14

> Kritické opravy chyb: migrace schématu DB, načítání spouštěcího prostředí, vymazání chybového stavu poskytovatele a oprava popisku i18n. Zlepšení kvality kódu nad každým PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Přidání sloupce `provider_connections.group` do základního schématu + migrace záložních záložek pro existující databáze – sloupec byl použit ve všech dotazech, ale chybí v definici schématu -**fix(i18n) #371**: Nahraďte neexistující klíč `t("deleteConnection")` existujícím klíčem `providers.delete` — opravuje chybu běhu `MISSING_MESSAGE: providers.deleteConnection` na stránce s podrobnostmi o poskytovateli -**fix(auth) #372**: Vymažte zastaralá metadata chyb (`errorCode`, `lastErrorType`, `lastErrorSource`) z účtů poskytovatelů po skutečném obnovení – dříve se obnovené účty stále jevily jako neúspěšné -**fix(startup) #369**: Sjednoťte načítání env napříč `npm run start`, `run-standalone.mjs` a Electron tak, aby respektovala prioritu `DATA_DIR/.env → ~/.omniroute/.env → ./.env` – zabraňuje generování nové existující databáze `STORAGE_ENCRYPTION overcrypted### 🔧 Code Quality

- Zdokumentované vzory `result.success` vs `response?.ok` v `auth.ts` (oba záměrné, nyní vysvětleno)
- Normalizováno `overridePath?.trim()` v `electron/main.js`, aby odpovídalo `bootstrap-env.mjs`
- Přidán komentář k objednávce sloučení `preferredEnv` při spuštění Electronu

> Zásady kvót účtu Codex s automatickým střídáním, rychlým přepínáním vrstev, modelem gpt-5.4 a opravou analytického štítku.### ✨ New Features (PRs #366, #367, #368)

-**Zásady kvóty Codex (PR #366)**: Okno kvóty 5 hodin/týden na účet přepíná na panelu poskytovatele. Účty jsou automaticky přeskočeny, když povolená okna dosáhnou 90% prahu a znovu přijaty po `resetAt`. Zahrnuje `quotaCache.ts` s bez vedlejších účinků získávání stavu. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Settings → Codex Service Tier. Ve výchozím nastavení vypnutý přepínač vkládá `service_tier: "flex"` pouze pro požadavky Codex, což snižuje náklady ~ 80%. Úplný zásobník: karta uživatelského rozhraní + koncový bod API + exekutor + překladač + obnovení po spuštění. -**model gpt-5.4 (PR #368)**: Přidá `cx/gpt-5.4` a `codex/gpt-5.4` do registru modelů Codex. Včetně regresního testu.### 🐛 Bug Fixes

-**oprava #356**: Grafy Analytics (nejlepší poskytovatel, podle účtu, rozdělení poskytovatelů) nyní u poskytovatelů kompatibilních s OpenAI namísto nezpracovaných interních ID zobrazují pro člověka čitelné názvy/štítky poskytovatelů.

> Hlavní vydání: strategie striktně náhodného směrování, řízení přístupu pomocí klíče API, skupiny připojení, externí synchronizace cen a opravy kritických chyb pro modely myšlení, kombinované testování a ověřování názvů nástrojů.### ✨ New Features (PRs #363 & #365)

-**Strategie přísného náhodného směrování**: Fisher-Yates shuffle deck se zárukou proti opakování a serializací mutex pro souběžné požadavky. Nezávislé balíčky na kombo a na poskytovatele. -**Ovládání přístupu ke klíči API**: `allowedConnections` (omezení, která připojení může klíč používat), `is_active` (povolení/zakázání klíče s 403), `accessSchedule` (řízení přístupu na základě času), přepínání `autoResolve`, přejmenování klíčů pomocí PATCH. -**Skupiny připojení**: Seskupte připojení poskytovatelů podle prostředí. Zobrazení akordeonu na stránce Limits s persistencí localStorage a inteligentním automatickým přepínáním. -**Externí synchronizace cen (LiteLLM)**: 3úrovňové rozlišení cen (přepisy uživatelem → synchronizováno → výchozí). Přihlaste se pomocí `PRICING_SYNC_ENABLED=true`. Nástroj MCP `omniroute_sync_pricing`. 23 nových testů. -**i18n**: 30 jazyků aktualizovaných s přísnou náhodnou strategií, řetězci pro správu klíčů API. pt-BR plně přeloženo.### 🐛 Bug Fixes

-**oprava #355**: Časový limit nečinnosti streamu zvýšen z 60 s na 300 s — zabraňuje přerušení modelů dlouhého myšlení (claude-opus-4-6, o3 atd.) během dlouhých fází uvažování. Konfigurovatelné prostřednictvím `STREAM_IDLE_TIMEOUT_MS`. -**oprava #350**: Kombinovaný test nyní obchází `REQUIRE_API_KEY=true` pomocí interní hlavičky a používá univerzálně formát kompatibilní s OpenAI. Timeout prodloužen z 15s na 20s. -**oprava #346**: Nástroje s prázdným `function.name` (zaslané Claude Code) jsou nyní filtrovány dříve, než je obdrží poskytovatelé upstream, čímž se zabrání chybám "Neplatný vstup[N].name: prázdný řetězec".### 🗑️ Closed Issues

-**#341**: Odstraněna sekce ladění – nahrazení je `/dashboard/logs` a `/dashboard/health`.

> Podpora API Key Round-Robin pro nastavení poskytovatelů s více klíči a potvrzení směrování zástupných znaků a rolování okna kvót již na místě.### ✨ New Features

-**API Key Round-Robin (T07)**: Připojení poskytovatelů nyní může obsahovat více klíčů API (Upravit připojení → Další klíče API). Požadavky se neustále střídají mezi primárními a extra klíči pomocí `providerSpecificData.extraApiKeys[]`. Klíče jsou uchovávány v paměti indexované pro každé připojení – nejsou nutné žádné změny schématu databáze.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` s odpovídajícím zástupným znakem ve stylu glob (`gpt*`, `claude-?-sonnet` atd.) je již integrován do `model.ts` s hodnocením specifičnosti. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` již automaticky posouvá okno dopředu — pokud `Date.now() > entry.until`, zámek je okamžitě odstraněn (žádné zastaralé blokování).

> Vylepšení uživatelského rozhraní, doplnění strategie směrování a elegantní zpracování chyb pro omezení použití.### ✨ New Features

-**Fill-First & P2C Routing Strategies**: Přidány `fill-first` (vyčerpat kvótu před pokračováním) a `p2c` (výběr Power-of-Two-Choices s nízkou latencí) do kombinovaného výběru strategie s úplnými naváděcími panely a barevně odlišenými odznaky. -**Přednastavené modely bezplatného zásobníku**: Vytvoření kombinace pomocí šablony bezplatného zásobníku nyní automaticky vyplní 7 nejlepších modelů bezplatných poskytovatelů ve své třídě (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Uživatelé pouze aktivují poskytovatele a dostanou hned po vybalení 0 $ měsíčně. -**Širší Combo Modal**: Kombinovaný modal Create/Edit nyní používá `max-w-4xl` pro pohodlnou editaci velkých komb.### 🐛 Bug Fixes

-**Stránka limitů HTTP 500 pro Codex a GitHub**: `getCodexUsage()` a `getGitHubUsage()` nyní vracejí uživatelsky přívětivou zprávu, když poskytovatel vrátí 401/403 (prošlý token), namísto vyvolání a způsobení chyby 500 na stránce Limits. -**MaintenanceBanner false-positive**: Banner již při načítání stránky falešně nezobrazuje „Server je nedostupný“. Opraveno voláním `checkHealth()` ihned po připojení a odstraněním zastaralého uzavření `show`-state. -**Popisky ikon poskytovatele**: Tlačítka ikon pro úpravy (tužka) a smazání v řádku připojení poskytovatele nyní obsahují nativní popisky HTML – všech 6 ikon akcí je nyní samo zdokumentováno.

> Několik vylepšení od analýzy problémů komunity, podpora nových poskytovatelů, opravy chyb pro sledování tokenů, směrování modelů a spolehlivost streamování.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatický výběr modelu na základě typu obsahu požadavku — kódování → deepseek-chat, analýza → gemini-2.5-pro, vize → gpt-4o, sumarizace → gemini-2.5-flash. Konfigurovatelné přes Nastavení. Nové API `GET/PUT/POST /api/settings/task-routing`. -**HuggingFace Provider**: Přidán HuggingFace Router jako poskytovatel kompatibilní s OpenAI s Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: Přidán poskytovatel Vertex AI (Google Cloud) s Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude přes Vertex. -**Nahrání souborů na hřišti**: Nahrání zvuku pro přepis, nahrání obrázků pro modely vidění (automatická detekce podle názvu modelu), vykreslení obrázků v textu pro výsledky generování obrázků. -**Vizuální zpětná vazba pro výběr modelu**: Již přidané modely v kombinovaném výběru nyní zobrazují ✓ zelený odznak – zabraňuje duplicitní záměně. -**Kompatibilita Qwen (PR #352)**: Aktualizováno nastavení otisku prstu User-Agent a CLI pro kompatibilitu poskytovatele Qwen. -**Round-Robin State Management (PR #349)**: Vylepšená kruhová logika pro zpracování vyloučených účtů a správné udržování stavu rotace. -**Clipboard UX (PR #360)**: Posílené operace se schránkou s nouzovou funkcí pro nezabezpečené kontexty; Vylepšení normalizace nástroje Claude.### 🐛 Bug Fixes

-**Oprava #302 — OpenAI SDK stream=False drop tool_calls**: T01 Přijmout vyjednávání záhlaví již nevynucuje streamování, když je `body.stream` explicitně `false`. Způsobovalo tiché zrušení tool_calls při použití OpenAI Python SDK v režimu bez streamování. -**Oprava #73 — Claude Haiku směrován na OpenAI bez prefixu poskytovatele**: Modely `claude-*` odeslané bez prefixu poskytovatele nyní správně směrují k poskytovateli `antigravity` (Anthropic). Přidána také heuristika `gemini-*`/`gemma-*` → `gemini`. -**Oprava #74 — Token počítá vždy 0 pro Antigravity/Claude streaming**: Událost `message_start` SSE, která nese `input_tokens` nebyla analyzována pomocí `extractUsage()`, což způsobilo pokles všech vstupních tokenů. Sledování vstupních/výstupních tokenů nyní funguje správně pro odezvy streamování. -**Oprava #180 — Duplikáty importu modelu bez zpětné vazby**: `ModelSelectModal` nyní zobrazuje ✓ zelené zvýraznění modelů, které již jsou v kombinaci, takže je zřejmé, že jsou již přidány. -**Chyby generování mediální stránky**: Výsledky obrázků se nyní vykreslují jako značky `<img>` namísto nezpracovaných JSON. Výsledky přepisu se zobrazí jako čitelný text. Chyby pověření zobrazují místo tichého selhání oranžový banner. -**Tlačítko pro obnovení tokenu na stránce poskytovatele**: Pro poskytovatele OAuth bylo přidáno uživatelské rozhraní pro ruční obnovení tokenu.### 🔧 Improvements

-**Provider Registry**: HuggingFace a Vertex AI přidány do `providerRegistry.ts` a `providers.ts` (frontend). -**Read Cache**: Nový `src/lib/db/readCache.ts` pro efektivní ukládání DB čtení do mezipaměti. -**Quota Cache**: Vylepšená mezipaměť kvót s vystěhováním na základě TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Soubor                                        | Účel                                               |
| --------------------------------------------- | -------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logika směrování s ohledem na úkoly (7 typů úkolů) |
| `src/app/api/settings/task-routing/route.ts`  | API pro konfiguraci směrování úloh                 |
| `src/app/api/providers/[id]/refresh/route.ts` | Ruční obnovení tokenu OAuth                        |
| `src/lib/db/readCache.ts`                     | Efektivní mezipaměť pro čtení DB                   |
| `src/shared/utils/clipboard.ts`               | Tvrzená schránka s nouzovým                        | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modální kombinace: Volná sada viditelná a nápadná**— Šablona Volná sada byla skryta (4. v mřížce se 3 sloupci). Opraveno: přesunuto na pozici 1, přepnuto na mřížku 2x2, takže jsou vidět všechny 4 šablony, zelený okraj + zvýraznění odznaku ZDARMA.## [2.4.0] - 2026-03-13

> **Hlavní vydání**— Bezplatný ekosystém Stack, generální oprava přepisovacího hřiště, více než 44 poskytovatelů, komplexní bezplatná dokumentace úrovně a plošná vylepšení uživatelského rozhraní.### Funkce

-**Komba: Šablona Free Stack**— Nová 4. šablona „Free Stack (0 $)“ využívající cyklickou obsluhu napříč Kiro + Qoder + Qwen + Gemini CLI. Při prvním použití navrhuje předpřipravenou kombinaci s nulovými náklady. -**Média/přepis: Deepgram jako výchozí**— Deepgram (Nova 3, 200 $ zdarma) je nyní výchozím poskytovatelem přepisu. AssemblyAI (50 $ zdarma) a Groq Whisper (zdarma navždy) zobrazené s bezplatnými kreditními odznaky. -**README: Sekce „Začít zdarma“**— Nová tabulka v 5 krocích z počátečního README ukazující, jak nastavit umělou inteligenci s nulovými náklady během několika minut. -**README: Free Transscription Combo**— Nová sekce s návrhem kombinace Deepgram/AssemblyAI/Groq a podrobnostmi o bezplatném kreditu na poskytovatele. -**providers.ts: příznak hasFree**– NVIDIA NIM, Cerebras a Groq označené odznakem hasFree a freeNote pro uživatelské rozhraní poskytovatelů. -**i18n: templateFreeStack keys**— Free Stack combo šablona přeložená a synchronizovaná do všech 30 jazyků.## [2.3.16] - 2026-03-13

### Dokumentace

-**README: Poskytovatelé 44+**– Aktualizovány všechny 3 výskyty „poskytovatelů 36+“ na „44+“, což odráží skutečný počet kódů (44 poskytovatelů v providers.ts) -**README: Nová sekce "🆓 Modely zdarma — Co vlastně dostáváte"**— Přidána tabulka 7 poskytovatelů s limity sazeb pro každý model pro: Kiro (Claude neomezeně přes AWS Builder ID), Qoder (5 modelů neomezeně), Qwen (4 modely neomezeně), Gemini CLI (180 000/měsíc), NVIDIA NIM (~40 RPM) od 1 do 40 ot./min. 60 000 TPM), Groq (30 RPM / 14,4 000 RPD). Zahrnuje doporučení kombinace \/usr/bin/bash Ultimate Free Stack. -**README: Aktualizace cenové tabulky**– Přidán Cerebras do úrovně API KEY, opravena NVIDIA z „1000 kreditů“ na „dev-forever free“, aktualizované počty a názvy modelů Qoder/Qwen -**README: Modely Qoder 8→5**(pojmenované: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 modely**(pojmenované: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funkce

-**Hlavní panel Auto-Combo (Priorita úrovně)**: Přidán `🏷️ Tier` jako 7. štítek faktoru hodnocení v zobrazení rozdělení faktorů `/dashboard/auto-combo` – všech 7 faktorů skóre Auto-Combo je nyní viditelných. -**i18n — sekce autoCombo**: Přidáno 20 nových překladových klíčů pro řídicí panel Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority` atd.) do všech 30 jazykových souborů.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Obnoveno platné výchozí `clientSecret` – dříve byl prázdný řetězec, což způsobovalo „chybné přihlašovací údaje klienta“ při každém pokusu o připojení. Veřejné pověření je nyní výchozí záložní (lze přepsat pomocí env var `QODER_OAUTH_CLIENT_SECRET`). -**Server MITM nenalezen (#335)**: `prepublish.mjs` nyní zkompiluje `src/mitm/*.ts` do JavaScriptu pomocí `tsc` před zkopírováním do balíčku npm. Dříve byly zkopírovány pouze nezpracované soubory `.ts` – což znamená, že `server.js` nikdy neexistoval v globálních instalacích npm/Volta. -**GeminiCLI chybí projectId (#338)**: Namísto vyvolání tvrdé chyby 500, když v uložených přihlašovacích údajích chybí `projectId` (např. po restartu Dockeru), OmniRoute nyní zaprotokoluje varování a pokusí se o požadavek – namísto selhání OmniRoute vrací smysluplnou chybu na straně poskytovatele. -**Neshoda elektronické verze (#323)**: Synchronizována verze `electron/package.json` s `2.3.13` (byla `2.0.13`), takže binární verze pro stolní počítače odpovídá balíčku npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Kodex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Přidána `tierPriority` (váha `0,05`) do schématu Zod `ScoringWeights` a cesty API `combos/auto` – 7. faktor skórování je nyní plně akceptován REST API a ověřen na vstupu. Váha „stability“ upravena z „0,10“ na „0,05“, aby celkový součet zůstal = „1,0“.### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: Přidána „tierPriority“ jako 7. bod hodnocení – účty s úrovněmi Ultra/Pro jsou nyní upřednostňovány před úrovněmi zdarma, když jsou ostatní faktory stejné. Nová volitelná pole `accountTier` a `quotaResetIntervalSecs` na `ProviderCandidate`. Všechny 4 balíčky režimů byly aktualizovány ("rychlá dodávka", "úspora nákladů", "kvalita na prvním místě", "offline-friendly"). -**Intra-Family Model Fallback (T5)**: Když je model nedostupný (404/400/403), OmniRoute se nyní automaticky vrátí k sourozeneckým modelům ze stejné rodiny, než vrátí chybu (`modelFamilyFallback.ts`). -**Konfigurovatelný časový limit API Bridge**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var umožňuje operátorům vyladit časový limit proxy serveru (výchozí 30s). Opravuje chyby 504 při pomalých odezvách proti proudu. (#332) -**Hvězdná historie**: Widget star-history.com byl nahrazen starchart.cc (`?varianta=adaptive`) ve všech 30 souborech README – přizpůsobuje se světlému/tmavému motivu, aktualizace v reálném čase.### 🐛 Bug Fixes

-**Auth — První heslo**: Při nastavování prvního hesla řídicího panelu je nyní akceptována env var `INITIAL_PASSWORD`. Používá `timingSafeEqual` pro porovnávání v konstantním čase a zabraňuje útokům na čas. (#333) -**README Truncation**: Opravena chybějící uzavírací značka `</details>` v sekci Odstraňování problémů, která způsobila, že GitHub přestal vykreslovat vše pod ní (Tech Stack, Dokumenty, Plán, Přispěvatelé). -**instalace pnpm**: Odstraněno nadbytečné přepsání `@swc/helpers` z `package.json`, které bylo v konfliktu s přímou závislostí a způsobovalo chyby `EOVERRIDE` na pnpm. Přidána konfigurace `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: Přidán validátor `isSafePath()` v `cliRuntime.ts` k blokování procházení cesty a metaznaků shellu ve vars env `CLI_*_BIN`. -**CI**: Regenerovaný `package-lock.json` po odstranění přepsání, aby se opravily chyby `npm ci` v akcích GitHubu.### 🔧 Improvements

-**Formát odpovědi (T1)**: `response_format` (json_schema/json_object) nyní vloženo jako systémová výzva pro Claude, což umožňuje kompatibilitu strukturovaného výstupu. -**429 opakování (T2)**: Opakování uvnitř URL pro 429 odpovědí (2× pokusy s 2s zpožděním), než se vrátíte na další URL. -**Gemini CLI Headers (T3)**: Přidána záhlaví otisků prstů `User-Agent` a `X-Goog-Api-Client` pro kompatibilitu Gemini CLI. -**Cenový katalog (T9)**: Přidány cenové položky `deepseek-3.1`, `deepseek-3.2` a `qwen3-coder-next`.### 📁 New Files

| Soubor                                     | Účel                                                               |
| ------------------------------------------ | ------------------------------------------------------------------ | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definice modelových rodin a logika záložních řešení v rámci rodiny | ### Fixed |

-**KiloCode**: časový limit kontroly stavu kilokódu již byl opraven ve verzi 2.3.11 -**OpenCode**: Přidejte opencode do registru cliRuntime s časovým limitem 15s pro kontrolu stavu -**OpenClaw / Cursor**: Zvyšte časový limit pro kontrolu stavu na 15 s pro varianty s pomalým startem -**VPS**: Nainstalujte balíčky droid a openclaw npm; aktivovat CLI_EXTRA_PATHS pro kiro-cli -**cliRuntime**: Přidejte registraci nástroje opencode a prodlužte časový limit pro pokračování## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Zvyšte `healthcheckTimeoutMs` ze 4000 ms na 15000 ms – kilokód vykreslí banner s logem ASCII při spuštění, což způsobí falešné `healthcheck_failed` v prostředích s pomalým/studeným startem## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Oprava selhání `check:any-budget:t11` – nahraďte `as any` za `as Record<string, unknown>` v OAuthModal.tsx (3 výskyty)### Docs

-**CLI-TOOLS.md**: Kompletní průvodce pro všech 11 nástrojů CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, kurzor, droid, openclaw) -**i18n**: CLI-TOOLS.md synchronizovaný do 30 jazyků s přeloženým názvem + úvodem## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nový starší koncový bod dokončení OpenAI – přijímá pole „prompt“ string i „messages“, automaticky se normalizuje na formát chatu -**EndpointPage**: Nyní zobrazuje všechny 3 typy koncových bodů kompatibilní s OpenAI: dokončení chatu, rozhraní API odpovědí a dokončení starších verzí -**i18n**: Přidáno `completionsLegacy/completionsLegacyDesc` do 30 jazykových souborů### Fixed

-**OAuthModal**: Oprava `[object Object]` zobrazený u všech chyb připojení OAuth — správně extrahovat `.message` z objektů chybové odpovědi ve všech 3 voláních `throw new Error(data.error)` (výměna, kód zařízení, autorizace)

- Ovlivňuje Cline, Codex, GitHub, Qwen, Kiro a všechny ostatní poskytovatele OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Přidejte `decodeURIComponent` před dekódování base64, aby se správně analyzovaly ověřovací kódy zakódované v URL z adresy URL pro zpětné volání, oprava chyb „neplatný nebo prošlý autorizační kód“ ve vzdálených nastaveních (LAN IP) -**Cline OAuth**: `mapTokens` nyní vyplňuje `jméno = jméno + příjmení || email` takže účty Cline zobrazují skutečná uživatelská jména namísto "ID účtu" -**Názvy účtů OAuth**: Všechny výměnné toky OAuth (výměna, průzkum, zpětné volání) nyní normalizují `jméno = email`, když jméno chybí, takže každý účet OAuth zobrazuje svůj e-mail jako zobrazovaný štítek na panelu poskytovatelů
–**Názvy účtů OAuth**: Odstraněna sekvenční záložní reklama „Účet N“ v `db/providers.ts` – účty bez e-mailu/názvu nyní používají stabilní štítek založený na ID prostřednictvím `getAccountDisplayName()` namísto pořadového čísla, které se mění při smazání účtů## [2.3.6] - 2026-03-12

### Fixed

-**Testovací dávka poskytovatele**: Opraveno schéma Zod, aby akceptovalo `providerId: null` (frontend odešle hodnotu null pro režimy bez poskytovatele); nesprávně vracel "Neplatný požadavek" pro všechny dávkové testy -**Testovací modální poskytovatel**: Opraveno zobrazení `[object Object]` normalizací chybových objektů API na řetězce před vykreslením v `setTestResults` a `ProviderTestResultsView` -**i18n**: Přidány chybějící klíče `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` do `en.json` -**i18n**: Synchronizováno 1111 chybějících klíčů ve všech 29 souborech v neanglickém jazyce pomocí anglických hodnot jako záložních## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Přidána trvalá oprava `postinstall` pro zkopírování `@swc/helpers` do `node_modules` samostatné aplikace — zabraňuje pádu MODULE_NOT_FOUND při globálních instalacích npm## [2.3.4] - 2026-03-10

### Added

- Více integrací poskytovatelů a vylepšení řídicího panelu
