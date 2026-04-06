# Changelog (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Vyriešená nekonečná slučka presmerovania na informačnom paneli pre nové inštancie, keď je zakázaná funkcia requireLogin.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Natívna integrácia Qoder API:**Kompletne prerobený nástroj Qoder Executor, aby obišiel starý šifrovací algoritmus COSY AES/RSA smerujúci priamo do natívnej adresy URL kompatibilnej s DashScope OpenAi. Odstraňuje zložité závislosti od `crypto` modulov Node a zároveň zlepšuje vernosť streamu. -**Resilience Engine Overhaul:**Integrované ladné záložné riešenia pretečenia kontextu, proaktívna detekcia tokenov OAuth a prevencia emisií prázdneho obsahu (#990). -**Kontextovo optimalizovaná stratégia smerovania:**Pridaná nová schopnosť inteligentného smerovania na natívne maximalizovanie kontextových okien v automatizovaných kombinovaných nasadeniach (#990).### 🐛 Bug Fixes

-**Poškodenie streamu Responses API:**Opravené poškodenie hlbokého klonovania, kde hranice prekladu Antropické/OpenAI odstránili špecifické predpony SSE pre „reakciu“ z hraníc streamovania (#992). -**Claude Cache Passthrough Alignment:**Zarovnané značky cache kompatibilné s CC konzistentne s upstream režimom Client Pass-Through so zachovaním rýchleho ukladania do vyrovnávacej pamäte. -**Turbopack Memory Leak:**Pripnutý Next.js k prísnemu `16.0.10`, ktorý zabraňuje únikom pamäte a vytvára zastaranosť z nedávnych upstream regresií hash modulu Turbopack (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integrácia Models.dev:**Integrované modely.dev ako autoritatívny zdroj runtime pre ceny modelov, možnosti a špecifikácie, ktoré prevažujú nad pevne zakódovanými cenami. Zahŕňa používateľské rozhranie nastavení na správu intervalov synchronizácie, prekladové reťazce pre všetkých 30 jazykov a rozsiahle testovacie pokrytie. -**Natívne funkcie poskytovateľa:**Pridaná podpora pre deklarovanie a kontrolu natívnych funkcií API (napr. `systemInstructions_supported`), ktorá zabraňuje zlyhaniam dezinfekciou neplatných rolí. Aktuálne nakonfigurované pre poskytovateľov Gemini Base a Antigravity OAuth. -**Rozšírené nastavenia poskytovateľa API:**Pridané vlastné prepisy „User-Agent“ pre jednotlivé pripojenia pre pripojenia poskytovateľov kľúčov API. Prepísanie je uložené v `providerSpecificData.customUserAgent` a teraz sa vzťahuje na overovacie testy a požiadavky na vykonanie upstream.### 🐛 Bug Fixes

-**Spoľahlivosť Qwen OAuth:**Vyriešená séria problémov s integráciou OAuth vrátane blokovania 400 chybných požiadaviek na tokenoch s vypršanou platnosťou, generovania záložných zdrojov na analýzu vlastností prístupového_tokenu OIDC, keď sa vynechá id_token, chýb pri objavovaní katalógu modelov a prísneho filtrovania odmietnutia AI0 kompatibilného s koncovým bodom*.*## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Dokončená natívna integrácia životného cyklu CRUD pre pokročilý Auto-Combo engine (#955). -**Základné operácie:**Opravené chýbajúce preklady pre nové natívne možnosti Auto-Combos (#955). -**Overenie zabezpečenia:**Natívne deaktivované úlohy automatického zálohovania SQLite počas vykonávania CI testu jednotky, aby sa explicitne vyriešili úniky visiacej pamäte uzla 22 (#956). -**Proxy serverov ekosystému:**Dokončené plánovače synchronizácie modelu synchronizácie explicitného integračného mapovania, cykly OAuth a kontrola tokenov sa bezpečne obnovujú prostredníctvom natívnych serverov proxy systému OmniRoute (#953). -**Rozšíriteľnosť MCP:**Pridaný a úspešne zaregistrovaný nový rámcový nástroj MCP `omniroute_web_search` z beta verzie do produkčných schém (#951). -**Logika vyrovnávacej pamäte tokenov:**Pridané limity konfigurácie runtime rozširujúce konfigurovateľné vyrovnávacie pamäte vstupných/výstupných tokenov pre presné metriky sledovania používania (#959).### 🐛 Bug Fixes

-**Oprava CodeQL:**Plne vyriešené a zabezpečené kritické operácie indexovania reťazcov, ktoré zabraňujú heuristike indexovania polí Server-Side Request Forgery (SSRF) spolu s polynomiálnym algoritmickým backtrackingom (ReDoS) v moduloch hĺbkového servera proxy. -**Crypto hashe:**Nahradené slabé neoverené staré hodnoty hash OAuth 1.0 robustnými štandardnými overovacími primitívami HMAC-SHA-256, ktoré zaisťujú prísne kontroly prístupu. -**API Boundary Protection:**Správne overené a zmapované štrukturálne ochrany trás presadzujúce prísnu logiku middlevéru `isAuthenticated()` pokrývajúcu manipuláciu s nastaveniami zacielenia na novšie dynamické koncové body a načítanie natívnych zručností. -**CLI Ecosystem Compat:**Vyriešené nefunkčné väzby natívneho syntaktického analyzátora runtime, ktoré ladne zlyhávajú detektory prostredia „kde“ v prípade okrajových prípadov „.cmd/.exe“ pre externé pluginy (#969). -**Architektúra vyrovnávacej pamäte:**Zrefaktorovaná presná analýza a nastavenia systému ukladanie parametrov riadiaceho panela do vyrovnávacej pamäte, aby sa zachovali stabilné cykly perzistencie rehydratácie, čím sa vyriešia záblesky vizuálneho nezarovnaného stavu (#952). -**Claude Caching Standards:**Normalizované a presne prísne zachované kritické efemérne blokové markery "efemérne" ukladanie TTL objednávok pre downstream uzly presadzujúce štandardne kompatibilné CC požiadavky na mapovanie čisto bez vynechaných metrík (#948). -**Overenie interných aliasov:**Zjednodušené interné mapovania za behu normalizujúce vyhľadávanie užitočného zaťaženia kódexu v rámci globálnych parametrov prekladu, ktoré rieši 401 neoverených poklesov (#958).### 🛠️ Maintenance

-**Objaviteľnosť používateľského rozhrania:**Správne upravené kategorizácie rozloženia explicitne oddeľujúce logiku poskytovateľov bezplatných vrstiev zlepšujúce toky triedenia UX vo všeobecných stránkach registra API (#950). -**Topológia nasadenia:**Artefakty nasadenia Unified Docker zabezpečujúce, že koreňový súbor `fly.toml` sa zhoduje s očakávanými parametrami inštancie cloudu hneď po vybalení a natívne zvláda správne škálovanie automatických nasadení. -**Vývojové nástroje:**Odpojené parametre runtime `LKGP` do explicitných nástrojov na ukladanie do vyrovnávacej pamäte na abstrakciu DB vrstvy, ktoré zaisťujú bezpečné pokrytie testovacej izolácie pre základné vrstvy vyrovnávacej pamäte.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Automatický kombinovaný panel ovládacieho panela:**Kompletne prerobené používateľské rozhranie `/dashboard/auto-combo`, aby sa hladko integrovalo s natívnymi kartami Dashboard Card a štandardizovanými vizuálnymi výplňami/hlavičkami. Pridané dynamické vizuálne pruhy priebehu mapujúce váhové mechanizmy výberu modelu. -**Synchronizácia smerovania nastavení:**Plne odhalené ciele pokročilých priorít a vážených schém smerovania interne v zoznamoch záložných globálnych nastavení.### Bug Fixes

-**Uzly miestneho nastavenia pamäte a zručností:**Vyriešené prázdne značky vykresľovania pre možnosti pamäte a zručností priamo v zobrazeniach globálnych nastavení zapojením všetkých hodnôt „settings.\*“ interne do súboru „en.json“ (tiež implicitne namapovaného pre nástroje krížového prekladu).### Internal Integrations

- Integrované PR #946 — oprava: zachovanie kompatibility Claude Code pri konverzii odpovedí
- Integrované PR #944 — oprava (gemini): zachovajte podpisy myšlienok pri volaniach antigravitačných nástrojov
- Integrované PR #943 – oprava: obnovte telo GitHub Copilot
  – Integrovaný PR #942 – Opravte značky vyrovnávacej pamäte kompatibilné s cc
- Integrované PR #941 — refactor(auth): zlepšenie vyhľadávania aliasov NVIDIA + pridanie protokolovania chýb LKGP
- Integrované PR #939 — Obnovenie spracovania spätného volania Claude OAuth localhost
- _(Poznámka: PR #934 bol vynechaný z cyklu 3.4.9, aby sa zabránilo regresii základných konfliktov)_---

## [3.4.8] — 2026-04-03

### Bezpečnosť

- Kompletne opravené všetky výnimočné zistenia Github Advanced Security (CodeQL) a výstrahy Dependabot.
- Opravené slabé miesta v nezabezpečenej náhodnosti migráciou z `Math.random` na `crypto.randomUUID()`.
- Zabezpečené príkazy shellu v automatizovaných skriptoch z injekcie reťazca.
- Migrované zraniteľné katastrofické spätné sledovanie vzorov analýzy RegEx v kanáloch četovania/prekladov.
- Vylepšené ovládacie prvky dezinfekcie výstupu v komponentoch používateľského rozhrania React a vkladanie tagov Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Funkcie

- Pridaný uzol `Cryptography` do monitorovania a kontrol stavu MCP (#798)
- Spevnené mapovanie povolení trasy podľa katalógu modelov (`/models`) (#781)### Bug Fixes

- Opravené obnovenie tokenu Claude OAuth, ktoré nezachováva kontext vyrovnávacej pamäte (# 937)
- Opravené chyby poskytovateľa kompatibilného s CC, ktoré spôsobovali nedostupnosť modelov uložených vo vyrovnávacej pamäti (# 937)
- Opravené chyby GitHub Executor súvisiace s neplatnými kontextovými poľami (# 937)
- Opravené zlyhania kontroly stavu nástrojov CLI nainštalovaných NPM v systéme Windows (#935)
- Opravený preklad užitočného zaťaženia, ktorý vynecháva platný obsah z dôvodu neplatných polí API (#927)
- Opravený pád runtime v Node 25 týkajúci sa spustenia kľúča API (#867)
- Opravené rozlíšenie samostatného modulu MCP (`ERR_MODULE_NOT_FOUND`) cez `esbuild` (#936)
- Opravený nesúlad rozlíšenia aliasu smerovania NVIDIA NIM (#931)### Bezpečnosť

- Pridaná bezpečná a prísna ochrana hraníc vstupu proti nespracovaným injekciám spustenia kódu na diaľku „shell: true“.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Poskytovatelia:**Registrovaní noví poskytovatelia generovania obrázkov, videa a zvuku zo zoznamu požadovaných komunitou (#926). -**Používateľské rozhranie ovládacieho panela:**Pridaná samostatná navigácia na bočnom paneli pre nové moduly Memory a Skills (#926). -**i18n:**Pridané prekladové reťazce a mapovania rozloženia v 30 jazykoch pre menné priestory Memory a Skills.### 🐛 Bug Fixes

-**Odolnosť:**Zabránila tomu, aby sa proxy istič zasekol v stave OTVORENÉ na neurčito, a to spracovaním priamych prechodov do stavu ZATVORENÉ v rámci záložných kombinovaných ciest (#930). -**Preklad protokolu:**Opravili sme streamingový transformátor na dezinfekciu blokov odozvy na základe očakávaného protokolu _source_ namiesto protokolu _target_ poskytovateľa, čím sa opravili modely Anthropics zabalené v užitočných zaťaženiach OpenAI, ktoré zlyhali Claude Code (#929). -**Špecifikácie API a Gemini:**Opravená analýza `thought_signature` v prekladačoch `openai-to-gemini` a `claude-to-gemini`, čím sa zabráni chybám HTTP 400 vo všetkých volaniach nástrojov Gemini 3 API. -**Poskytovatelia:**Vyčistené koncové body nekompatibilné s OpenAI, ktoré bránia platným upstream pripojeniam (#926). -**Trendy vyrovnávacej pamäte:**Opravený nesúlad údajov mapovania neplatného vlastníctva spôsobujúci zlyhanie grafov používateľského rozhrania Trendov vyrovnávacej pamäte a extrahované nadbytočné miniaplikácie metrík vyrovnávacej pamäte (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integrácia ekosystému CLIProxyAPI:**Pridaný spúšťač `cliproxyapi` so vstavaným ukladaním do vyrovnávacej pamäte na úrovni modulu a smerovaním proxy. Predstavili sme komplexnú službu Version Manager na automatické testovanie stavu, sťahovanie binárnych súborov z GitHubu, vytváranie izolovaných procesov na pozadí a čistú správu životného cyklu externých nástrojov CLI priamo cez používateľské rozhranie. Zahŕňa DB tabuľky pre konfiguráciu proxy, aby sa umožnilo automatické krížové smerovanie externých požiadaviek OpenAI s bránou SSRF cez vrstvu lokálnych nástrojov CLI (#914, #915, #916). -**Podpora Qoder PAT:**Podpora integrovaných osobných prístupových tokenov (PAT) priamo cez lokálny transport `qodercli` namiesto starých konfigurácií vzdialeného prehliadača `.cn` (#913). -**Ukážka Gemini 3.1 Pro (GitHub):**Pridaná podpora kanonického explicitného modelu `gemini-3.1-pro-preview` natívne do poskytovateľa GitHub Copilot pri zachovaní starších aliasov smerovania (#924).### 🐛 Bug Fixes

-**Stabilita tokenov GitHub Copilot:**Opravená slučka obnovovania tokenov Copilota, v ktorej neboli zastarané tokeny hlboko zlúčené do DB, a odstránené polia `reasoning_text`, ktoré fatálne narúšali konverzie následných antropických blokov pre viacotáčkové chaty (#923). -**Global Timeout Matrix:**Centralizované a parametrizované časové limity požiadaviek explicitne od `REQUEST_TIMEOUT_MS`, aby sa zabránilo skrytým (~ 300 s) predvoleným vyrovnávacím pamäťám načítania predčasne odrezať dlhotrvajúce odozvy streamovania SSE od modelov ťažkého uvažovania (# 918). -**Cloudflare Quick Tunnels State:**Opravená vážna nekonzistentnosť stavu, kedy reštartované inštancie OmniRoute chybne zobrazovali zničené tunely ako aktívne a predvolené cloudové tunelovanie na `HTTP/2`, aby sa eliminoval spam protokolu prijímania UDP vyrovnávacej pamäte (#925). -**i18n Translation Overhaul (Czech & Hindi):**Opravený hindský kód z UKONČENÉHO `in.json` na kanonický `hi.json`, prepracované mapovanie českého textu, extrahovaný `untranslatable-keys.json` na opravu falošne pozitívnych overení CI/CD a vygenerované 8 komplexné prekladače N#9md2`I).
-**Obnova poskytovateľa tokenov:**Opravená strata špecifických koncových bodov `resourceUrl` Qwen po automatickej obnove tokenu kontroly stavu kvôli chýbajúcim hlbokým zlúčeniam DB (#917). -**CC kompatibilné UX a streamovanie:**Zjednotili sa akcie kompatibilné s pridaním CC/OpenAI/Anthropic okolo zaobchádzania s používateľským rozhraním Anthropic, vynútili upstream požiadavky kompatibilné s CC, aby používali SSE, pričom stále vracali streamingové alebo nestreamingové odpovede na základe požiadavky klienta, odstránili podporu konfigurácie/importu zoznamu modelov CC v prospech explicitnej chyby kompatibilného s nepodporovaným modelom a sprístupnili zrkadlenie modelu CCC. Zoznam registrov kódov (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Zadajte `response.completed` so správnymi poľami `input_tokens`/`output_tokens` pre klientov Codex CLI, čím sa opraví zobrazenie používania tokenov (#909 – vďaka @christopher-s). -**Kontrolný bod SQLite WAL pri vypnutí:**Vyprázdnenie zmien WAL do primárneho databázového súboru počas elegantného vypnutia/reštartu, čím sa zabráni strate údajov pri zastavení kontajnera Docker (#905 – vďaka @rdself). -**Graceful Shutdown Signal:**Zmenené trasy `/api/restart` a `/api/shutdown` z `process.exit(0)` na `process.kill(SIGTERM)`, čím sa zabezpečí, že obsluha vypnutia sa spustí pred ukončením. -**Docker Stop Grace Period:**Pridané `stop_grace_period: 40s` do súborov Docker Compose a `--stop-timeout 40` do príkladov spustenia Docker.### 🛠️ Maintenance

- Uzavreté 5 vyriešených problémov, ktoré nie sú chybou (#872, #814, #816, #890, #877).
- Triedené 6 problémov s požiadavkami na informácie o potrebách (#892, #887, #886, #865, #895, #870).
- Reakcia na problém so sledovaním detekcie CLI (#863) s pokynmi prispievateľa.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravitačná pamäť a zručnosti:**Dokončená vzdialená injekcia pamäte a zručností pre poskytovateľa antigravitácie na úrovni siete proxy. -**Kompatibilita Claude Code:**Vytvoril natívne skrytý most kompatibility pre Claude Code, ktorý umožňuje čisté odovzdávanie nástrojov a formátovania. -**Web Search MCP:**Pridaný nástroj `omniroute_web_search` s rozsahom `execute:search`. -**Komponenty vyrovnávacej pamäte:**Implementované komponenty dynamickej vyrovnávacej pamäte využívajúce TDD. -**Používateľské rozhranie a prispôsobenie:**Pridaná podpora vlastnej ikony favicon, karty vzhľadu, káblové biele označenie na bočnom paneli a pridané kroky sprievodcu Windsurf vo všetkých 33 jazykoch. -**Uchovávanie protokolov:**Zjednotené uchovávanie protokolov žiadostí a artefaktov natívne. -**Vylepšenia modelov:**Pridané explicitné `contextLength` pre všetky modely opencode-zen. -**i18n a preklady:**Natívne integrovaných 33 jazykových prekladov, vrátane overenia zástupných CI a aktualizácií čínskej dokumentácie (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Obnovené spoliehanie sa `id_token` na `access_token` a povolené dynamické vkladanie koncového bodu API `resource_url` pre správne regionálne smerovanie (#900). -**Model Sync Engine:**Uložené prísne interné ID poskytovateľa v synchronizačných rutinách `getCustomModels()` namiesto formátu UI Channel Alias, čím sa zabráni zlyhaniam vloženia katalógu SQLite (#903). -**Claude Code & Codex:**Štandardizované nestreamované prázdne odpovede na „(prázdna odpoveď)“ v antropickom formáte, aby sa zabránilo zlyhaniam servera proxy CLI (#866). -**CC Compatible Routing:**Vyriešená kolízia duplicitných koncových bodov `/v1` počas zreťazenia ciest pre všeobecné brány Claude Code (#904). -**Antigravitačné informačné panely:**Blokované modely s neobmedzenou kvótou, aby sa falošne nezaregistrovali ako vyčerpané limitné stavy „100% využitia“ v používateľskom rozhraní používania poskytovateľa (#857). -**Claude Image Passthrough:**Opravené Claude modely bez prechodov obrazových blokov (#898). -**Gemini CLI Routing:**Vyriešených 403 zablokovaní autorizácie a problémov s hromadením obsahu obnovením ID projektu cez `loadCodeAssist` (#868). -**Antigravitačná stabilita:**Opravené prístupové zoznamy modelov, vynútených 404 blokovaní, opravených 429 kaskád blokujúcich štandardné pripojenia a obmedzené výstupné tokeny `gemini-3.1-pro` (#885). -**Kadencia synchronizácie poskytovateľa:**Opravené obmedzenie kadencie synchronizácie poskytovateľa prostredníctvom interného plánovača (#888). -**Optimalizácia ovládacieho panela:**Vyriešené zamrznutie používateľského rozhrania „/dashboard/limits“ pri spracovaní viac ako 70 účtov prostredníctvom paralelizácie kúskov (#784). -**SSRF Hardening:**Vynútené prísne filtrovanie rozsahu IP SSRF a zablokovanie rozhrania spätnej slučky `::1`. -**Typy MIME:**Štandardizované `mime_type` na snake_case, aby zodpovedali špecifikáciám Gemini API. -**Stabilizácia CI:**Opravené zlyhávajúce analytiky/nastavenia selektorov Playwright a tvrdení požiadaviek, aby sa spúšťanie akcií GitHub Actions E2E spoľahlivo prenášalo cez lokalizované používateľské rozhrania a ovládacie prvky založené na prepínačoch. -**Deterministické testy:**Odstránili sa fixné kvóty citlivé na dátum z testov používania Copilota a zosúladili testy idempotencie/modelového katalógu so zlúčeným správaním za behu. -**Spevnenie typu MCP:**Odstránené explicitné „akékoľvek“ regresie s nulovým rozpočtom z cesty registrácie nástroja servera MCP. -**Model Sync Engine:**Obídené deštruktívne prepisy „nahradiť“, keď automatická synchronizácia poskytovateľa poskytne prázdny zoznam modelov, čím sa zachová stabilita dynamických katalógov (#899).### 🛠️ Maintenance

-**Protokolovanie potrubia:**Prepracované artefakty protokolovania potrubia a presadzovanie retenčných limitov (#880). -**Agents.md Generálna oprava:**Zhustené z 297→153 riadkov. Pridané pokyny na zostavenie/testovanie/štýl, pracovné postupy kódu (Prettier, TypeScript, ESLint) a orezané podrobné tabuľky (#882). -**Integrácia vetvy vydania:**Konsolidovala sa vetva aktívnych funkcií do `release/v3.4.2` nad aktuálnou `main` a overila sa vetva s lint, unit, pokrytie, zostavenie a E2E beh v režime CI. -**Testovanie:**Pridaná konfigurácia vitest pre testovanie komponentov a špecifikácie Playwright pre prepínače nastavení. -**Aktualizácie dokumentov:**Rozšírené súbory Readmes, natívne preložené čínske dokumenty a vyčistenie zastaraných súborov.## [3.4.1] - 2026-03-31

> [!UPOZORNENIE]
> **PRESTÁVANÁ ZMENA: Premenné prostredia na zaznamenávanie, uchovávanie a zaznamenávanie žiadostí boli prepracované.**
> Pri prvom spustení po inovácii OmniRoute archivuje staršie protokoly požiadaviek z `DATA_DIR/logs/`, staršie `DATA_DIR/call_logs/` a `DATA_DIR/log.txt` do `DATA_DIR/log_archives/*.zip`, potom odstráni zastarané rozloženie a prepne na nový nepodporovaný formát `DATA_DIR/call_logs/.### ✨ New Features

-**.ENV Migration Utility:**Zahrnuté `scripts/migrate-env.mjs` na bezproblémovú migráciu konfigurácií `<v3.3` na `v3.4.x` prísne bezpečnostné obmedzenia overovania (FASE-01), opravujúce zlyhania pri spustení spôsobené krátkymi inštanciami `JWT_SECRET`. -**Optimalizácia vyrovnávacej pamäte Kiro AI:**Implementované deterministické generovanie `conversationId` (uuidv5), aby sa umožnilo správne ukladanie výzvy do vyrovnávacej pamäte AWS Builder ID počas vyvolaní (#814). -**Obnova a konsolidácia používateľského rozhrania informačného panela:**Vyriešená logika bočného panela s vynechaním časti Debug a vymazanie upozornení na smerovanie Nextjs presunutím samostatných stránok `/dashboard/mcp` a `/dashboard/a2a` explicitne do vstavaných komponentov používateľského rozhrania Endpoint Proxy. -**Unified Request Log Artifacts:**Protokolovanie požiadaviek teraz ukladá jeden riadok indexu SQLite plus jeden artefakt JSON na požiadavku pod `DATA_DIR/call_logs/`, s voliteľným záznamom kanála vloženým do rovnakého súboru. -**Jazyk:**Vylepšený čínsky preklad (#855) -**Modely Opencode-Zen:**Pridané 4 bezplatné modely do registra opencode-zen (#854) -**Testy:**Pridané testy jednotiek a E2E na prepínanie nastavení a opravy chýb (#850)### 🐛 Bug Fixes

-**429 Analýza kvóty:**Analyzované dlhé časy resetovania kvót z chybových telies, aby sa dodržali správne odstúpenia a zabránilo sa zákazom účtov s obmedzenou rýchlosťou (#859) -**Prompt Caching:**Zachované hlavičky `cache_control` klienta pre všetkých poskytovateľov protokolu Claude (ako Minimax, GLM a Bailian), ktoré správne rozpoznávajú podporu ukladania do vyrovnávacej pamäte (#856) -**Protokoly synchronizácie modelov:**Zníženie počtu nevyžiadaných správ zaznamenaním „modelov synchronizácie“ iba vtedy, keď kanál skutočne upraví zoznam (#853) -**Kvóta poskytovateľa a analýza tokenov:**Prepnuté antigravitačné limity na použitie „retrieveUserQuota“ natívne a správne namapované dátové zaťaženie obnovenia tokenu Claude na formuláre zakódované do URL (#862) -**Stabilita obmedzujúca rýchlosť:**Univerzalizovala architektúru analýzy 429 Retry-After na obmedzenie chladenia spôsobeného poskytovateľom na maximálne 24 hodín (#862) -**Limit vykresľovania informačného panela:**Prepracované mapovanie kvóty `/dashboard/limits` tak, aby sa okamžite vykresľovalo v rámci blokov, čím sa opravilo veľké oneskorenie zamrznutia používateľského rozhrania na účtoch presahujúcich 70 aktívnych pripojení (#784) -**QWEN OAuth Authorization:**Mapoval OIDC `id_token` ako primárny token nosiča API pre požiadavky Dashscope, čím sa opravili okamžité chyby 401 Unauthorized po pripojení účtov alebo obnovení tokenov (#864) -**ZAI API Stabilita:**Hardened Server-Sent Events kompilátor, ktorý elegantne prejde na prázdne reťazce, keď poskytovatelia DeepSeek streamujú matematicky nulový obsah počas fáz uvažovania (#871) -**Claude Code/Codex Translations:**Chránené nestreamované konverzie užitočného zaťaženia proti prázdnym odpovediam z upstreamových nástrojov Codexu, čím sa zabráni katastrofickým chybám TypeErrors (#866) -**NVIDIA NIM vykresľovanie:**Podmienečne odstránené identické predpony poskytovateľa dynamicky vložené zvukovými modelmi, čím sa eliminujú duplicitné štruktúry značiek `nim/nim` vyvolávajúce 404 na Media Playground (#872)### ⚠️ Breaking Changes

-**Rozloženie denníka žiadostí:**Odstránili sa staré viacsúborové relácie denníka požiadaviek `DATA_DIR/logs/` a súhrnný súbor `DATA_DIR/log.txt`. Nové požiadavky sú zapísané ako jednotlivé JSON artefakty v `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Premenné prostredia protokolovania:**Nahradené `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` a `PROXY_LOG_MAX_ENTRIES` novou konfiguráciou `APP_LOG_*` a TENTION_DAY_LOG_RE -**Nastavenie prepínania potrubia:**Nahradené staré nastavenie „detailed_logs_enabled“ za „call_log_pipeline_enabled“. Podrobnosti nového kanála sú vložené do artefaktu požiadavky namiesto toho, aby boli uložené ako samostatné záznamy `request_detail_logs`.### 🛠️ Maintenance

-**Staršia záloha aktualizácie protokolu žiadostí:**Inovácie teraz archivujú staré rozloženia `data/logs/`, staršie rozloženia `data/call_logs/` a `data/log.txt` do `DATA_DIR/log_archives/*.zip` pred odstránením zastaranej štruktúry. -**Stálosť používania streamovania:**Žiadosti o streamovanie teraz po dokončení zapisujú jeden riadok `usage_history` namiesto toho, aby vygenerovali duplicitný riadok o prebiehajúcom používaní s prázdnymi metadátami stavu. -**Vyčistenie následných protokolov:**Protokoly kanála už nezachytávajú „SOURCE REQUEST“, položky artefaktov požiadaviek teraz rešpektujú „CALL_LOG_MAX_ENTRIES“ a archívy denníkov aplikácií teraz rešpektujú „APP_LOG_MAX_FILES“.---

## [3.4.0] - 2026-03-31

### Funkcie

-**Analýza využitia predplatného:**Pridané sledovanie časových sérií snímok kvót, karty Využitie poskytovateľa a Kombinované zdravie s vizualizáciami prekresľovania a zodpovedajúcimi koncovými bodmi rozhrania API (#847) -**Ovládanie zálohovania SQLite:**Nový príznak env `OMNIROUTE_DISABLE_AUTO_BACKUP` na zakázanie automatického zálohovania SQLite (#846) -**Aktualizácia registra modelov:**Vloženie `gpt-5.4-mini` do radu modelov poskytovateľa kódexu (#756) -**Sledovanie limitu poskytovateľa:**Sledovanie a zobrazenie posledného obnovenia limitov sadzieb poskytovateľa na účet (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Presmerovanie dokončenia Qwen OAuth z DashScope API na Web Inference API (`chat.qwen.ai`), vyriešenie zlyhaní autorizácie (#844, #807, #832) -**Qwen Auto-Retry Loop:**Pridaná cielená kvóta 429 Prekročená manipulácia so stiahnutím v rámci `chatCore`, ktorá chráni zhlukové požiadavky -**Codex OAuth Fallback:**Moderné blokovanie vyskakovacích okien v prehliadači už nedrží používateľa; automaticky sa vráti k manuálnemu zadávaniu adresy URL (#808) -**Claude Token Refresh:**Pri generovaní tokenov sa teraz namiesto kódovaných adries URL rešpektujú prísne hranice „aplikácie/json“ spoločnosti Anthropic (#836) -**Schéma kódových správ:**Odstránené puristické „správy“ vložené z natívnych žiadostí o prechod, aby sa predišlo štrukturálnym odmietnutiam zo strany ChatGPT upstream (#806) -**Limit veľkosti detekcie CLI:**Bezpečne sa zvýšila horná hranica binárneho skenovania uzlov zo 100 MB na 350 MB, čo umožnilo správne detekovať ťažké samostatné nástroje ako Claude Code (229 MB) a OpenCode (153 MB) runtime VPS (# 809) -**CLI Runtime Environment:**Obnovená schopnosť pre konfigurácie CLI rešpektovať cesty prepisovania používateľom (`CLI_{PROVIDER}_BIN`), ktoré obchádzajú prísne pravidlá zisťovania viazané na cestu -**Konflikty hlavičiek Nvidia:**Odstránené vlastnosti „prompt_cache_key“ z upstream hlavičiek pri volaní neantropických poskytovateľov (#848) -**Codex Fast Tier Toggle:**Obnovené prepínanie kontrastu úrovne služieb Codex v režime svetla (#842) -**Testovacia infraštruktúra:**Aktualizovaný test `t28-model-catalog-updates`, ktorý nesprávne očakával zastaraný koncový bod DashScope pre natívny register Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Custom Provider Rotation:**Integrovaný `getRotatingApiKey` interne v rámci DefaultExecutor, ktorý zaisťuje správne spustenie rotácie `extraApiKeys` pre vlastných a kompatibilných upstream poskytovateľov (#815)---

## [3.3.8] - 2026-03-30

### Funkcie

-**Filtrovanie API modelov:**Koncový bod `/v1/models` teraz dynamicky filtruje svoj zoznam na základe oprávnení spojených s `Autorizácia: Nosič <token>`, keď je zapnutý obmedzený prístup (#781) -**Integrácia Qoder:**Natívna integrácia pre Qoder AI, ktorá natívne nahrádza staršie mapovania platformy iFlow (#660) -**Prompt Cache Tracking:**Pridané možnosti sledovania a vizualizácia frontendu (karta štatistík) pre sémantické a rýchle ukladanie do vyrovnávacej pamäte v používateľskom rozhraní Dashboard### 🐛 Bug Fixes

-**Veľkosť panela vyrovnávacej pamäte:**Vylepšené veľkosti rozloženia používateľského rozhrania a kontextové hlavičky pre stránky rozšírenej vyrovnávacej pamäte (#835) -**Ladiť viditeľnosť bočného panela:**Opravený problém, kedy prepínač ladenia nezobrazoval/neskrýval správne podrobnosti ladenia bočného panela (#834) -**Prefix modelu Gemini:**Upravený záložný priestor názvov tak, aby správne smeroval cez `gemini-cli/` namiesto `gc/`, aby sa dodržali špecifikácie upstream (#831) -**OpenRouter Sync:**Vylepšená synchronizácia kompatibility na automatické správne prijímanie katalógu dostupných modelov z OpenRouter (#830) -**Mapovanie dátového toku:**Reserializácia zdôvodňujúcich polí natívne rieši konfliktné alias cesty, keď sa výstup streamuje do okrajových zariadení---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Reštrukturalizovaný vygenerovaný súbor `opencode.json` tak, aby používal schému založenú na záznamoch `@ai-sdk/openai-compatible` s `options` a `models` ako mapy objektov namiesto plochých polí, čím sa opravili zlyhania overenia konfigurácie (#816) -**i18n Missing Keys:**Pridaný chýbajúci kľúč prekladu `cloudflaredUrlNotice` do všetkých 30 jazykových súborov, aby sa zabránilo chybám konzoly `MISSING_MESSAGE` na stránke Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Účtovanie tokenov:**Bezpečne zahrnuté tokeny rýchlej vyrovnávacej pamäte pri výpočtoch historických vstupov pre správne odpočty kvóty (PR #822) -**Kombinované testovacie sondy:**Opravené falošné zápory logiky kombinovaného testovania vyriešením analýzy pre odpovede iba na uvažovanie a povolená masívna paralelizácia cez Promise.all (PR #828) -**Docker Quick Tunnels:**Vložené požadované ca-certifikáty v základnom runtime kontajneri na vyriešenie zlyhaní pri spustení Cloudflared TLS a odhalených stdout sieťových chýb nahrádzajúcich všeobecné ukončovacie kódy (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Pridané sledovanie kvót Gemini CLI v reálnom čase prostredníctvom `retrieveUserQuota` API (PR #825) -**Panel vyrovnávacej pamäte:**Vylepšený panel vyrovnávacej pamäte, aby zobrazoval okamžité metriky vyrovnávacej pamäte, 24-hodinové trendy a odhadované úspory nákladov (PR #824)### 🐛 Bug Fixes

-**Používateľské skúsenosti:**Odstránené invazívne automatické otváranie OAuth modálnych slučiek na neplodných podrobných stránkach poskytovateľa (PR #820) -**Aktualizácie závislostí:**Vylepšené a uzamknuté závislosti pre vývojové a produkčné stromy vrátane Next.js 16.2.1, Recharts a TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A Workflows:**Pridaný deterministický FSM orchestrátor pre viackrokové pracovné postupy agentov. -**Graceful Degradation:**Pridaný nový viacvrstvový záložný rámec na zachovanie základnej funkčnosti počas čiastočných výpadkov systému. -**Config Audit:**Pridaný audit trail s detekciou rozdielov na sledovanie zmien a umožnenie vrátenia konfigurácie. -**Zdravie poskytovateľa:**Pridané sledovanie uplynutia platnosti poskytovateľa s proaktívnymi upozorneniami používateľského rozhrania na končiace sa kľúče API. -**Adaptívne smerovanie:**Pridaný adaptívny detektor objemu a zložitosti na dynamické prepísanie stratégií smerovania na základe zaťaženia. -**Rozmanitosť poskytovateľov:**Implementované hodnotenie rozmanitosti poskytovateľov prostredníctvom entropie Shannon na zlepšenie rozloženia zaťaženia. -**Hranice automatického vypnutia:**Pridaný prepínač nastavenia automatického vypnutia zakázaných účtov na panel odolnosti.### 🐛 Bug Fixes

-**Kompatibilita Codex & Claude:**Opravené výpadky používateľského rozhrania, opravené problémy s integráciou kódexu bez streamovania a vyriešená detekcia runtime CLI v systéme Windows. -**Automatizácia vydania:**Vyžadované rozšírené povolenia na zostavenie aplikácie Electron v akciách GitHub. -**Cloudflare Runtime:**Vyriešené správne ukončovacie kódy izolácie runtime pre komponenty tunela Cloudflared.### 🧪 Tests

-**Aktualizácie testovacieho balíka:**Rozšírené testovacie pokrytie pre detektory objemu, rozmanitosť poskytovateľov, audit konfigurácie a FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**spoľahlivosť CI/CD:**Opravené akcie GitHub pre stabilné verzie závislostí (`actions/checkout@v4`, `actions/upload-artifact@v4`) na zmiernenie neohláseného ukončenia podpory prostredia Builder. -**Obrázky:**Nahradené ľubovoľné záložné reťazce v `ProviderIcon.tsx` explicitným overením aktív, aby sa zabránilo načítaniu komponentov `<Image>` používateľského rozhrania pre súbory, ktoré neexistujú, čím sa odstránia chyby `404` v protokoloch konzoly dashboardu (#745). -**Admin Updater:**Dynamická detekcia inštalácie zdroja pre dashboard Updater. Bezpečne deaktivuje tlačidlo `Aktualizovať teraz`, keď je OmniRoute zostavený lokálne a nie prostredníctvom npm, pričom sa zobrazí výzva na `git pull` (#743). -**Chyba aktualizácie ERESOLVE:**Vložené prepísanie súboru `package.json` pre reťazec `react`/`react-dom` a povolené `--legacy-peer-deps` v rámci interných skriptov automatického aktualizátora, aby sa vyriešili konflikty v strome závislostí s `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Integrácia Cloudflare Quick Tunnel s ovládacími prvkami na palubnej doske (PR #772). -**Diagnostika:**Obídenie sémantické vyrovnávacej pamäte pre kombinované živé testy (PR #773).### 🐛 Bug Fixes

-**Stabilita streamovania:**Aplikujte `FETCH_TIMEOUT_MS` na počiatočné volanie `fetch()` v požiadavkách na streamovanie, aby ste zabránili tomu, že časový limit 300s Node.js TCP spôsobí zlyhania tichých úloh (#769). -**i18n:**Pridajte chýbajúce položky `windsurf` a `copilot` do `toolDescriptions` vo všetkých 33 súboroch miestnych nastavení (#748). -**Audit kódovania GLM:**Kompletný audit poskytovateľa opravujúci zraniteľné miesta ReDoS, veľkosť kontextového okna (128 k/16 k) a synchronizáciu registrov modelov (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Oprava záložného spracovania pre prvky typu: "text" obsahujúce nulové alebo prázdne množiny údajov, ktoré spôsobili odmietnutie 400 (#742). -**Opencode:**Aktualizujte zarovnanie schémy na jednotného „poskytovateľa“, aby zodpovedalo oficiálnej špecifikácii (#774). -**Gemini CLI:**Vloženie chýbajúcich hlavičiek kvót pre koncových používateľov, ktoré zabránia zablokovaniu autorizácie 403 (#775). -**Obnova DB:**Refaktorujte viacdielne importy užitočného zaťaženia do nespracovaných binárnych polí s vyrovnávacou pamäťou, aby ste obišli maximálne hodnoty tela reverzného proxy (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilizácia vydania**— Dokončené vydanie verzie 3.2.9 (kombinovaná diagnostika, brány kvality, oprava nástroja Gemini) a vytvorený chýbajúci git tag. Konsolidované všetky postupné zmeny do jediného odovzdania atómového uvoľnenia.### 🐛 Bug Fixes

-**Test automatických aktualizácií**– Opravené testovacie tvrdenie `buildDockerComposeUpdateScript`, aby sa zhodovalo s nerozšírenými referenciami premenných shellu (`$TARGET_TAG`, `${TARGET_TAG#v}`) vo vygenerovanom skripte nasadenia, v súlade s refaktorovanou šablónou z verzie 3.2.8. -**Test ističa**– Spevnený `combo-circuit-breaker.test.mjs` vstreknutím `maxRetries: 0`, aby sa zabránilo opakovanej inflácii skresľovať tvrdenia o počte porúch počas prechodov medzi stavmi ističa.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

–**Combo Diagnostics**– Zavedený príznak obídenia živého testu („forceLiveComboTest“), ktorý umožňuje správcom vykonávať skutočné kontroly stavu pred spustením, ktoré obchádzajú všetky mechanizmy stavu ističa a chladenia, čo umožňuje presnú diagnostiku počas výpadkov (PR #759)
–**Brány kvality**– Pridané automatické overovanie kvality odozvy pre kombá a oficiálne integrovaná podpora modelu „claude-4.6“ do základných smerovacích schém (PR #762)### 🐛 Bug Fixes

–**Overenie definície nástroja**– Opravená integrácia rozhrania Gemini API normalizáciou typov enum vnútri definícií nástrojov, čím sa zabráni chybám parametrov HTTP 400 (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Používateľské rozhranie automatickej aktualizácie Docker**– Integrovaný samostatný proces aktualizácie na pozadí pre nasadenia Docker Compose. Používateľské rozhranie Dashboard teraz bez problémov sleduje udalosti životného cyklu aktualizácie, pričom kombinuje odpovede JSON REST s prekrytím priebehu streamovania SSE pre robustnú spoľahlivosť naprieč prostrediami. -**Analytika vyrovnávacej pamäte**– Opravené mapovanie vizualizácie s nulovými metrikami migráciou telemetrických protokolov sémantickej vyrovnávacej pamäte priamo do modulu centralizovaného sledovania SQLite.### 🐛 Bug Fixes

-**Authentication Logic**– Opravená chyba, pri ktorej zlyhalo ukladanie nastavení dashboardu alebo pridávanie modelov s chybou 401 Unauthorized, keď bolo vypnuté `requireLogin`. Koncové body API teraz správne vyhodnocujú prepínač globálnej autentifikácie. Globálne presmerovanie bolo vyriešené opätovnou aktiváciou `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Zabránenie fatálnym inicializačným výnimkám počas detekcie prostredia CLI správnym zachytením `cross-spawn` ENOENT chýb. Pridáva explicitné detekčné cesty pre `\AppData\Local\droid\droid.exe`. -**Native Passthrough Codexu**– Normalizované parametre prekladu modelu zabraňujúce otráveniu kontextu v režime prechodu proxy, pričom sa explicitne presadzujú všeobecné obmedzenia „uložiť: nepravda“ pre všetky požiadavky pochádzajúce z Codexu. -**SSE Token Reporting**– Normalizovaná detekcia „finish_reason“ volania nástroja poskytovateľa, oprava 0% analýzy využitia pre odpovede iba na stream, bez prísnych indikátorov „<DONE>“. -**DeepSeek <think> Tags**– Implementované explicitné mapovanie extrakcie `<think>` v rámci `responsesHandler.ts`, čím sa zaisťuje, že toky uvažovania DeepSeek sa mapujú ekvivalentne k natívnym antropickým štruktúram `<thinking>`.---

## [3.2.7] - 2026-03-29

### Fixed

-**Bezproblémové aktualizácie používateľského rozhrania**: Funkcia „Aktualizovať teraz“ na informačnom paneli teraz poskytuje živú a transparentnú spätnú väzbu pomocou udalostí odoslaných serverom (SSE). Vykonáva inštaláciu balíkov, prestavby natívnych modulov (better-sqlite3) a spoľahlivo sa reštartuje PM2, pričom namiesto tichého zavesenia zobrazuje zavádzače v reálnom čase.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Odhalenie kľúča API (#740)**– Pridaný tok kopírovania kľúča API s rozsahom v Správcovi rozhraní API, chránený premennou prostredia `ALLOW_API_KEY_REVEAL`. -**Ovládacie prvky viditeľnosti na bočnom paneli (#739)**– Správcovia teraz môžu skryť ľubovoľný navigačný odkaz na bočnom paneli prostredníctvom nastavení vzhľadu, aby znížili vizuálny neporiadok. -**Prísne kombinované testovanie (#735)**– Posilnený koncový bod kombinovanej kontroly stavu tak, aby vyžadoval živé textové odpovede od modelov namiesto iba jemných signálov dosiahnuteľnosti. -**Podrobné protokoly streamovania (#734)**– Prepnuté podrobné protokolovanie požiadaviek pre streamy SSE na rekonštrukciu konečného užitočného zaťaženia, čím sa ušetrí obrovské množstvo veľkosti databázy SQLite a výrazne sa vyčistí používateľské rozhranie.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**– Opravená logika autentifikačnej hlavičky pre modely `minimax` na OpenCode Go, aby sa namiesto štandardných tokenov nosiča v protokole `/messages` používalo `x-api-key`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integrovaná šablóna balenia `xbps-src` a pokyny na natívne skompilovanie a inštaláciu OmniRoute s väzbami `better-sqlite3` prostredníctvom cieľa krížovej kompilácie.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Kompletná migrácia staršieho poskytovateľa jadra „iFlow“ na „Qoder AI“ so stabilnými schopnosťami smerovania API.### 🐛 Bug Fixes

-**Neplatný argument HTTP 400 užitočného zaťaženia Gemini Tools (#731)**— Zabránené vloženiu poľa `thoughtSignature` do štandardných sekvencií `functionCall` Gemini, ktoré blokujú toky smerovania agentov.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Používateľské rozhranie kvóty pre poskytovateľa (#728)**— Normalizovaná logika limitov kvót a označovanie údajov v rozhraní limitov.### 🐛 Bug Fixes

-**Základné schémy smerovania a úniky**– Rozšírená `comboStrategySchema` na natívnu podporu stratégií `fill-first` a `p2c` na natívne odblokovanie zložitých kombo editovania. -**Thinking Tags Extraction (CLI)**— Reštrukturalizovaný dezinfekčný prostriedok na tokeny CLI RegEx zachytávajúci modelové štruktúry uvažovania vo vnútri streamov, čím sa vyhýba rozbitým extrakciám „<myslenie>“ porušujúcim výstupný formát textu odpovede. -**Presadzovanie prísnych formátov**– Posilnené vykonávanie sanitácie potrubia, vďaka čomu je univerzálne použiteľné pre ciele režimu prekladu.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Štyrifázový kanál protokolu žiadostí (#705)**– Prerobená trvalosť protokolu na uloženie komplexného užitočného zaťaženia v štyroch rôznych fázach kanála: požiadavka klienta, preložená požiadavka poskytovateľa, odpoveď poskytovateľa a preložená odozva klienta. Zavedený „streamPayloadCollector“ pre robustné skrátenie streamu SSE a serializáciu užitočného zaťaženia.### 🐛 Bug Fixes

-**Opravy mobilného používateľského rozhrania (#659)**– Zabránilo sa tomu, aby komponenty tabuľky na informačnom paneli narušili rozloženie v úzkych výrezoch pridaním správneho horizontálneho posúvania a obmedzenia pretečenia do „DashboardLayout“. -**Opravy Claude Prompt Cache (#708)**— Zabezpečené, že bloky `cache_control` v záložných slučkách Claude-to-Claude sú verne zachované a bezpečne odovzdané späť do modelov Anthropic. -**Definície nástroja Gemini (#725)**— Opravené chyby prekladu schémy pri deklarovaní jednoduchých typov parametrov „objekt“ pre volanie funkcie Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**– Keď sa vyčerpajú všetky kombinované modely (502/503), OmniRoute sa teraz pokúsi o konfigurovateľný globálny záložný model predtým, ako vráti chybu. Ak chcete povoliť, v nastaveniach nastavte `globalFallbackModel`.### 🐛 Bug Fixes

-**Oprava #721**– Opravené vynechanie kontextového pripnutia počas odpovedí na volanie nástroja. Nestreamované značkovanie používalo nesprávnu cestu JSON (`json.messages` → `json.choices[0].message`). Vkladanie streamovania sa teraz spúšťa na blokoch `finish_reason` pre streamy iba na volanie nástroja. `injectModelTag()` teraz pripája syntetické pin správy pre nereťazcový obsah. -**Oprava #709**— Potvrdené už opravené (v3.1.9) — `system-info.mjs` vytvára adresáre rekurzívne. ZATVORENÉ. -**Oprava #707**– Potvrdené, že je už opravené (v3.1.9) – prázdna dezinfekcia názvu nástroja v `chatCore.ts`. ZATVORENÉ.### 🧪 Tests

- Pridaných 6 testov jednotiek na pripnutie kontextu s odpoveďami na volanie nástroja (nulový obsah, obsah poľa, spiatočná cesta, opätovné vloženie)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Používateľské rozhranie na správu vyrovnávacej pamäte**– Pridaný špeciálny panel sémantického ukladania do vyrovnávacej pamäte na \`/dashboard/cache\` s cieleným zrušením platnosti rozhrania API a podporou 31 jazykov i18n (PR #701 od @oyi77)
–**Sledovanie kvót GLM**– Pridané sledovanie využívania a kvóty relácií v reálnom čase pre poskytovateľa kódovania GLM (Z.AI) (PR #698 od @christopher-s) -**Detailed Log Payloads**– káblové úplné štvorstupňové zachytenie užitočného zaťaženia potrubia (originál, preložený, odpoveď poskytovateľa, streamované delty) priamo do používateľského rozhrania (PR #705 od @rdself)### 🐛 Bug Fixes

-**Oprava #708**– Zabránenie krvácaniu tokenov pre používateľov Claude Code smerujúcich cez OmniRoute správnym zachovaním natívnych hlavičiek \`cache_control\` počas prechodu Claude-to-Claude (PR #708 od @tombii) -**Oprava #719**– Nastavte interné hranice autorizácie pre \`ModelSyncScheduler\`, aby ste zabránili neovereným zlyhaniam démonov pri spustení (PR #719 od @rdself)
–**Oprava č. 718**– Prestavané vykresľovanie odznaku v používateľskom rozhraní Limity poskytovateľa, čím sa zabráni prekrývaniu nesprávnych hraníc kvót (PR #718 od @rdself)
–**Oprava č. 704**– Opravené prelomenie kombinovaných výpadkov pri chybách zásad obsahu HTTP 400, ktoré bránia mŕtvemu smerovaniu pri rotácii modelu (PR #704 od @rdself)### 🔒 Security & Dependencies

- Prekonaná \`cesta k regulárnemu výrazu\` k \`8.4.0\`, ktorá rieši chyby zabezpečenia závislého robota (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

–**Oprava č. 706**– Opravené vykresľovanie záložnej ikony spôsobené prepísaním „font-sans“ Tailwind V4 použitím „!important“ na „.material-symbols-outlined“.
–**Oprava č. 703**– Opravené nefunkčné streamy GitHub Copilot povolením „odpovedí“ na preklad formátu „openai“ pre ľubovoľné vlastné modely využívajúce „apiFormat: „responses“. -**Oprava č. 702**– Nahradené paušálne sledovanie používania presnými výpočtami cien DB pre odozvy streamovania aj nestreamovania. -**Oprava #716**— Vyčistený stav prekladu volania nástroja Claude, správne analyzovať argumenty streamovania a zabrániť kúskom OpenAI `tool_calls` v opakovaní poľa `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**– Automatické vynútenie numerických obmedzení schémy JSON s kódovaním reťazca (napr. „minimum“: „1“) na správne typy, čím sa zabráni 400 chybám od kurzora, Cline a iných klientov odosielajúcich chybné schémy nástrojov. -**Dezinfekcia s popisom nástroja**— Zabezpečte, aby popisy nástrojov boli vždy reťazce; pred odoslaním poskytovateľom skonvertuje „null“, „undefined“ alebo číselné popisy na prázdne reťazce.
–**Tlačidlo Vymazať všetky modely**– Pridané preklady i18n pre akciu poskytovateľa „Vymazať všetky modely“ vo všetkých 30 jazykoch. -**Export kódexu Auth**– Pridané tlačidlá exportu kódu Codex `auth.json` a lokálnej aplikácie pre bezproblémovú integráciu CLI. -**Poznámky Windsurf BYOK**— Pridané oficiálne upozornenia na obmedzenia na kartu nástrojov Windsurf CLI, ktoré dokumentujú obmedzenia BYOK.### 🐛 Bug Fixes

-**Oprava #709**— `system-info.mjs` už nepadá, keď výstupný adresár neexistuje (pridaný `mkdirSync` s rekurzívnym príznakom). -**Oprava č. 710**— Singleton A2A `TaskManager` teraz používa `globalThis` na zabránenie úniku stavu cez rekompilácie smerovania Next.js API v režime vývojára. Testovacia sada E2E bola aktualizovaná, aby elegantne zvládla 401.
–**Oprava č. 711**– Pridané presadzovanie limitu „max*tokens“ špecifického pre poskytovateľa pre upstream požiadavky. -**Oprava #605 / #592**— Odstráňte predponu `proxy*`z názvov nástrojov v odpovediach Claude, ktoré sa nestreamujú; opravená overovacia adresa URL LongCat.
-**Call Logs Max Cap**– Inovovaný`getMaxCallLogs()` s vrstvou vyrovnávacej pamäte, podporou env var (`CALL_LOGS_MAX`) a integráciou nastavení DB.### 🧪 Tests

- Testovacia sada rozšírená z 964 → 1027 testov (63 nových testov)
- Pridaný `schema-coercion.test.mjs` – 9 testov pre nátlak na číselné pole a dezinfekciu popisu nástroja
- Pridané `t40-opencode-cli-tools-integration.test.mjs` — testy integrácie OpenCode/Windsurf CLI
- Vylepšená vetva testovania funkcií s komplexnými nástrojmi pokrytia### 📁 New Files

| Súbor                                                    | Účel                                                 |
| -------------------------------------------------------- | ---------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schéma nátlaku a popis nástrojov dezinfekcie pomôcky |
| `tests/unit/schema-coercion.test.mjs`                    | Jednotkové testy pre schému nátlaku                  |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Testy integrácie nástroja CLI                        |
| `COVERAGE_PLAN.md`                                       | Dokument o plánovaní pokrytia testov                 | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**– Opravené odstraňovanie značiek cache_control v režime Claude passthrough (Claude → OmniRoute → Claude), čo spôsobilo, že používatelia Claude Code vyčerpali svoju kvótu Antropického API 5-10x rýchlejšie ako priame pripojenia. OmniRoute teraz zachováva značky cache_control klienta, keď sourceFormat aj targetFormat sú Claude, čím zaisťuje správne fungovanie rýchleho ukladania do vyrovnávacej pamäte a výrazne znižuje spotrebu tokenov.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Jadro platformy:**Implementované spracovanie globálneho stavu pre skryté modely a kombá, ktoré im bráni v neprehľadnom katalógu alebo úniku do pripojených agentov MCP (#681). -**Stabilita:**Opravené zlyhania streamovania súvisiace so zlyhaním integrácie natívneho poskytovateľa Antigravity z dôvodu neošetrených polí s nedefinovaným stavom (#684). -**Localization Sync:**Nasadený plne prepracovaný synchronizátor `i18n`, ktorý zisťuje chýbajúce vnorené vlastnosti JSON a dodatočne upravuje 30 miestnych nastavení postupne (#685).## [3.1.7] - 27.03.2026### 🐛 Bug Fixes

-**Stabilita streamovania:**Opravená položka „hasValuableContent“, ktorá vracia hodnotu „undefined“ pre prázdne časti v streamoch SSE (#676). -**Tool Calling:**Opravený problém v `sseParser.ts`, kedy nestreamingové odpovede Claude s viacerými volaniami nástrojov rušili `id` následných volaní nástroja kvôli nesprávnej deduplikácii založenej na indexe (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**– Názvy nástrojov ako `TodoWrite` už nemajú predponu `proxy_` v odpovediach Claude passthrough (streaming aj non-streaming). Zahŕňa pokrytie testom jednotky (PR #663 od @coobabm) -**Clear All Models Alias Cleanup**— "Clear All Models" button now also removes associated model aliases, preventing ghost models in the UI (PR #664 by @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Automatický úpadok úbytku**– Účty s obmedzenou rýchlosťou sa teraz automaticky obnovia, keď uplynie obdobie ich znižovania, čím sa opravuje patová situácia, keď vysoká úroveň „backoffLevel“ natrvalo znehodnotila účty (PR #657 od @brendandebeasi)### 🌍 i18n

-**Oprava čínskeho prekladu**— Komplexné prepísanie `zh-CN.json` s vyššou presnosťou (PR #658 od @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Oprava prepísania streamovania**– Explicitné „stream: true“ v tele žiadosti má teraz prednosť pred hlavičkou „Accept: application/json“. Klienti, ktorí posielajú oboje, správne dostanú odpovede na streamovanie SSE (#656)### 🌍 i18n

-**Vylepšenia českých reťazcov**— Prepracovaná terminológia v `cs.json` (PR #655 od @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 chýbajúcich prekladových kľúčov**pridaných do súboru `en.json` a 12 jazykov (PR #652 od @zen0bit) -**Česká dokumentácia aktualizovaná**— CLI-TOOLS, API_REFERENCE, návody VM_DEPLOYMENT (PR #652) -**Skripty na overenie prekladu**— `check_translations.py` a `validate_translation.py` pre CI/QA (PR #651 od @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritické: Regresia volania nástroja**– Opravené chyby `proxy_Bash` zakázaním predpony názvu nástroja `proxy_` v prechodovej ceste Claude. Nástroje ako `Bash`, `Read`, `Write` boli premenované na `proxy_Bash`, `proxy_Read` atď., čo spôsobilo, že Claude ich odmietol (#618) -**Dokumentácia o zákaze účtu Kiro**– zdokumentovaná ako falošne pozitívna správa proti podvodom AWS, nejde o problém s OmniRoute (#649)### 🧪 Tests

-**936 testov, 0 zlyhaní**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadáta schopnosti videnia**: Pridané `capabilities.vision`, `input_modalities` a `output_modalities` do položiek `/v1/models` pre modely schopné videnia (PR #646) -**Modely Gemini 3.1**: Pridané `gemini-3.1-pro-preview` a `gemini-3.1-flash-lite-preview` k poskytovateľovi Antigravity (#645)### 🐛 Bug Fixes

-**Chyba Ollama Cloud 401**: Opravená nesprávna základná adresa URL rozhrania API – zmenená z `api.ollama.com` na oficiálnu `ollama.com/v1/chat/completions` (#643) -**Opakovanie tokenu s vypršanou platnosťou**: Pridané obmedzené opakovanie s exponenciálnym stiahnutím (5→10→20 minút) pre pripojenia OAuth s vypršanou platnosťou namiesto ich trvalého preskočenia (PR #647)### 🧪 Tests

-**936 testov, 0 zlyhaní**---

## [3.1.0] — 2026-03-26

### ✨ New Features

–**Šablóny problémov s GitHub**: Pridané štandardizované hlásenie o chybe, žiadosť o funkciu a šablóny problémov s konfiguráciou/proxy (#641)
–**Vymazať všetky modely**: Pridané tlačidlo „Vymazať všetky modely“ na stránku s podrobnosťami o poskytovateľovi s podporou i18n v 29 jazykoch (#634)### 🐛 Bug Fixes

-**Locale Conflict (`in.json`)**: Premenoval súbor miestneho nastavenia pre hindčinu z `in.json` (indonézsky kód ISO) na `hi.json`, aby sa vyriešili konflikty prekladov vo Weblate (#642) -**Prázdne názvy nástrojov v kóde**: Presunutá dezinfekcia názvov nástrojov pred natívny prechod do kódexu, čím sa opravilo 400 chýb od poskytovateľov vyššieho prúdu, keď nástroje mali prázdne názvy (#637) -**Streamovanie artefaktov nového riadku**: Do dezinfekčného prostriedku odozvy bol pridaný „collapseExcessiveNewlines“, čím sa zbalili série 3+ po sebe idúcich nových riadkov z mysliacich modelov do štandardného dvojitého nového riadku (#638)
–**Claude Reasoning Effort**: Konvertovaný parameter „reasoning_effort“ OpenAI na Claudeov natívny blok rozpočtu „myslenia“ vo všetkých cestách požiadaviek vrátane automatickej úpravy „max_tokens“ (#627) -**Obnovenie tokenov Qwen**: Implementované proaktívne obnovovanie tokenov OAuth pred vypršaním platnosti (5-minútová vyrovnávacia pamäť), aby sa zabránilo zlyhaniu požiadaviek pri používaní tokenov s krátkou životnosťou (#631)### 🧪 Tests

-**936 testov, 0 zlyhaní**(+10 testov od 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Tokeny NaN v kóde Claude / odpovede klienta (#617):**

- `sanitizeUsage()` teraz krížovo mapuje `input_tokens`→`prompt_tokens` a `output_tokens`→`completion_tokens` pred filtrom bielej listiny, čím opravuje odpovede zobrazujúce počet tokenov NaN/0, keď poskytovatelia vrátia názvy polí použitia v štýle Claude### Bezpečnosť

- Aktualizovaný balík `yaml` na opravu zraniteľnosti pretečenia zásobníka (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

– Uzavreté #613 (kódové riešenie – vyriešené riešením vlastného poskytovateľa)

- Komentované #615 (OpenCode duálny koncový bod – poskytnuté riešenie, sledované ako žiadosť o funkciu)
  – Komentované číslo 618 (viditeľnosť volania nástroja – vyžaduje sa test verzie 3.0.9)
- Komentované k #627 (úroveň úsilia – už podporované)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Zlyhania prekladu pre poskytovateľov vo formáte OpenAI v Claude CLI (#632):**

- Spracovanie formátu poľa `reasoning_details[]` z StepFun/OpenRouter — konvertuje sa na `reasoning_content`
- Spracovať alias poľa `reasoning` od niektorých poskytovateľov → normalizovaný na `reasoning_content`
- Názvy polí použitia naprieč mapami: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` v `filterUsageFormat`
  – Opravte parameter „extractUsage“ tak, aby akceptoval polia „input_tokens“/„output_tokens“ a „prompt_tokens“/„completion_tokens“ ako platné polia použitia
- Aplikuje sa na cesty streamovania (`sanitizeStreamingChunk`, prekladač `openai-to-claude.ts`) aj cesty bez streamovania (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Opravená chyba `client_secret is missing` pre používateľov s nainštalovaným npm – `clientSecretDefault` bol prázdny v providerRegistry, čo spôsobilo, že Google odmietal žiadosti o obnovenie tokenu (#588) -**OpenCode Zen Models:**Pridané `modelsUrl` do položky registra OpenCode Zen, takže „Import z /models“ funguje správne (#612) -**Artefakty streamovania:**Opravené nadmerné množstvo nových riadkov, ktoré zostali v odpovediach po odstránení podpisu značky myslenia (#626) -**Proxy Fallback:**Pridané automatické opakovanie bez proxy, keď relé SOCKS5 zlyhá -**Proxy Test:**Testovací koncový bod teraz rieši skutočné poverenia z DB cez proxyId### ✨ New Features

-**Výber účtu/kľúča Playground:**Trvalá, vždy viditeľná rozbaľovacia ponuka na výber konkrétnych účtov/kľúčov poskytovateľa na testovanie – načíta všetky pripojenia pri spustení a filtruje podľa vybraného poskytovateľa -**CLI Tools Dynamic Models:**Výber modelov sa teraz dynamicky načítava z `/v1/models` API – poskytovatelia ako Kiro teraz zobrazujú svoj úplný katalóg modelov -**Zoznam antigravitačných modelov:**Aktualizované o Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; povolený „passthroughModels“ pre dynamický prístup k modelu (#628)### 🔧 Maintenance

- Zlúčené PR #625 — Oprava pozadia v svetelnom režime limitov poskytovateľa---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limity/Proxy:**Opravené načítanie limitov kódexu pre účty za proxy servermi SOCKS5 – obnovenie tokenu teraz beží v kontexte proxy -**CI:**Opravené zlyhanie tvrdenia testu integrácie `v1/models` v prostrediach CI bez pripojenia k poskytovateľovi -**Nastavenia:**Testovacie tlačidlo proxy teraz okamžite zobrazuje výsledky úspechu/neúspechu (predtým skryté za zdravotnými údajmi)### ✨ New Features

-**Playground:**Pridaná rozbaľovacia ponuka výberu účtu – ak má poskytovateľ viacero účtov, otestujte konkrétne pripojenia jednotlivo### 🔧 Maintenance

- Zlúčené PR #623 – oprava základnej adresy URL rozhrania LongCat API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Používateľské rozhranie Limity:**Pridaná funkcia zoskupovania značiek do hlavného panela pripojení na zlepšenie vizuálnej organizácie pre účty s vlastnými značkami.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streamovanie:**Opravené poškodenie stavu `TextDecoder` v kombo `sanitize` TransformStream, ktoré spôsobilo skomolený výstup SSE zodpovedajúci viacbajtovým znakom (PR #614) -**Používateľské rozhranie poskytovateľa:**Bezpečne vykresľujte značky HTML v popisoch chýb pripojenia poskytovateľa pomocou `dangerouslySetInnerHTML` -**Nastavenia servera proxy:**Pridané chýbajúce vlastnosti tela používateľského mena a hesla umožňujúce úspešné overenie overených serverov proxy z ovládacieho panela. -**Rozhranie API poskytovateľa:**Viazaná mäkká výnimka sa vráti na hodnotu `getCodexUsage`, ktorá zabraňuje zlyhaniam API HTTP 500, keď zlyhá načítanie tokenu---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modely s automatickou synchronizáciou:**Pridaný prepínač používateľského rozhrania a koncový bod „synchronizácia modelov“ na automatickú synchronizáciu zoznamov modelov podľa poskytovateľa pomocou plánovaného plánovača intervalov (PR #597)### 🐛 Bug Fixes

-**Časové limity:**Zvýšené predvolené servery proxy „FETCH_TIMEOUT_MS“ a „STREAM_IDLE_TIMEOUT_MS“ na 10 minút, aby správne podporovali modely hlbokého uvažovania (napríklad o1) bez prerušenia požiadaviek (Oprava č. 609) -**CLI Tool Detection:**Vylepšená detekcia naprieč platformami spracovávajúca cesty NVM, Windows `PATHEXT` (zabraňujúca problémom `.cmd` wrappers) a vlastné predpony NPM (PR #598) -**Protokoly streamovania:**Implementované nahromadenie delta `tool_calls` v protokoloch odpovedí streamovania, takže volania funkcií sú presne sledované a uchovávané v DB (PR #603) -**Katalóg modelov:**Odstránená výnimka z autorizácie, správne skrytie modelov `comfyui` a `sdwebui`, keď nie je explicitne nakonfigurovaný žiadny poskytovateľ (PR #599)### 🌐 Translations

-**cs:**Vylepšené české prekladové reťazce v aplikácii (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Pridané pole Tag/Group do `EditConnectionModal` (uložené v `providerSpecificData.tag`) bez nutnosti migrácie schém DB.
- Pripojenia v zobrazení poskytovateľa sa teraz dynamicky zoskupujú podľa značiek s vizuálnymi oddeľovačmi.
- Neoznačené pripojenia sa zobrazia ako prvé bez hlavičky, potom nasledujú označené skupiny v abecednom poradí.
- Zoskupenie značiek sa automaticky vzťahuje na sekciu Codex/Copilot/Antigravity Limits, pretože v riadkoch pripojenia existujú prepínače.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Chýbajúce odznaky na kartách pripojenia:**Opravené použitím `resolveProxyForConnection()` namiesto statického mapovania. -**Testovanie vypnuté v uloženom režime:**Aktivovalo sa tlačidlo Test vyhodnotením konfigurácie proxy z uloženého zoznamu. -**Konfiguračné modálne zmrazenie:**Pridané volania `onClose()` po uložení/vymazaní, aby sa zabránilo zamrznutiu používateľského rozhrania. -**Dvojnásobné počítanie využitia:**`ProxyRegistryManager` teraz dychtivo načítava využitie pri pripájaní s deduplikáciou pomocou `scope` + `scopeId`. Počty používania boli nahradené tlačidlom Test zobrazujúcim IP/latenciu v riadku.#### fix(translator): `function_call` prefix stripping

- Opravená neúplná oprava z PR #607, kde iba bloky `tool_use` odstránili Claudeovu predponu `proxy_`. Klienti používajúci formát OpenAI Responses API teraz tiež správne dostanú nástroje nástrojov bez predpony `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tri kritické regresie nahlásené používateľmi po uvedení verzie 3.0.0 boli vyriešené.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Predpona `proxy_`, ktorú pridal Claude OAuth, bola odstránená iba z odpovedí**streamovania**. V**nestreamingovom**režime nemal `translateNonStreamingResponse` prístup k `toolNameMap`, čo spôsobilo, že klienti dostávali zmenené názvy nástrojov ako `proxy_read_file` namiesto `read_file`.

**Oprava:**Pridaný voliteľný parameter `toolNameMap` do `translateNonStreamingResponse` a aplikované odstránenie predpony v obslužnom nástroji bloku Claude `tool_use`. `chatCore.ts` teraz prechádza cez mapu.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI neodhaľuje `GET /v1/models`. Všeobecný validátor `validateOpenAICompatibleProvider` prepadol záložnému hláseniu dokončenia chatu, iba ak bol nastavený `validationModelId`, ktorý LongCat nenakonfiguruje. To spôsobilo zlyhanie overenia poskytovateľa so zavádzajúcou chybou pri pridávaní/ukladaní.

**Oprava:**Do mapy špecializovaných validátorov bol pridaný výraz `longcat`, ktorý priamo skúma `/chat/completions` a každú odpoveď bez overenia považuje za schválenú.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Nástroje MCP (napr. `ceruzka`, `computer_use`) posúvajú definície nástrojov pomocou `{type:"object"}`, ale bez poľa `properties`. Rozhranie API spoločnosti Anthropic ich odmieta s: "schéma objektu chýba vlastnosti".

**Oprava:**Do súboru `openai-to-claude.ts` vložte `properties: {}` ako bezpečné predvolené nastavenie, keď `type` je `"object"` a `properties` chýba.---

### 🔀 Community PRs Merged (2)

| PR       | Autor   | Zhrnutie                                                                                       |
| -------- | ------- | ---------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): oprava ruského prekladu pre Playground a Testbed                                   |
| **#591** | @rdself | fix(ui): zlepšenie kontrastu svetelného režimu limitov poskytovateľa a zobrazenia úrovne plánu | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 testov, 0 zlyhaní**(nezmenené od verzie 3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Najväčšia verzia vôbec.**Od 36 poskytovateľov vo verzii 2.9.5 až po**67+ poskytovateľov**vo verzii 3.0.0 — so serverom MCP, protokolom A2A, automatickým kombinovaným nástrojom, ikonami poskytovateľov, rozhraním API registrovaných kľúčov, 926 testami a príspevkami od**12 členov komunity**v rámci**10 zlúčených PR**.
>
> Konsolidované od verzie 3.0.0-rc.1 až po rc.17 (17 kandidátov na vydanie počas 3 dní intenzívneho vývoja).---

### 🆕 New Providers (+31 since v2.9.5)

| Poskytovateľ                  | Alias ​​        | Úroveň           | Poznámky                                                                                          |
| ----------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | "opencode-zen"  | Zadarmo          | 3 modely cez `opencode.ai/zen/v1` (PR #530 od @kang-heewon)                                       |
| **OpenCode Go**               | "opencode-go"   | Zaplatené        | 4 modely cez `opencode.ai/zen/go/v1` (PR #530 od @kang-heewon)                                    |
| **LongCat AI**                | "lc"            | Zadarmo          | 50 miliónov tokenov/deň (Flash-Lite) + 500 000/deň (chat/myslenie) počas verejnej beta verzie     |
| **Opelenie AI**               | "pol"           | Zadarmo          | Nie je potrebný žiadny kľúč API – GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 požiadavka/15 s) |
| **Cloudflare Workers AI**     | "cf"            | Zadarmo          | 10 000 neurónov/deň – ~ 150 LLM odoziev alebo 500 s Whisper zvuk, okrajová inferencia             |
| **Scaleway AI**               | `scw`           | Zadarmo          | 1 milión bezplatných tokenov pre nové účty – v súlade s EÚ/GDPR (Paríž)                           |
| **AI/ML API**                 | "aiml"          | Zadarmo          | 0,025 $/deň bezplatných kreditov – 200+ modelov cez jeden koncový bod                             |
| **Puter AI**                  | "pu"            | Zadarmo          | 500+ modelov (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                            |
| **Alibaba Cloud (DashScope)** | "ali"           | Zaplatené        | Medzinárodné koncové body + Čína cez `alicode`/`alicode-intl`                                     |
| **Kódovací plán Alibaba**     | `bcp`           | Zaplatené        | Alibaba Model Studio s rozhraním API kompatibilným s Anthropic                                    |
| **Kimi kódovanie (API kľúč)** | "kmca"          | Zaplatené        | Vyhradený prístup Kimi založený na kľúči API (oddelene od OAuth)                                  |
| **Kódovanie MiniMax**         | "minimax"       | Zaplatené        | Medzinárodný koncový bod                                                                          |
| **MiniMax (Čína)**            | `minimax-cn`    | Zaplatené        | Koncový bod špecifický pre Čínu                                                                   |
| **Z.AI (GLM-5)**              | "zai"           | Zaplatené        | Modely GLM novej generácie Zhipu AI                                                               |
| **Vertex AI**                 | "vertex"        | Zaplatené        | Google Cloud — Service Account JSON alebo OAuth access_token                                      |
| **Ollama Cloud**              | "ollamacloud"   | Zaplatené        | Služba API hosťovaná spoločnosťou Ollama                                                          |
| **Syntetický**                | "syntetické"    | Zaplatené        | Brána priechodných modelov                                                                        |
| **Kilo Gateway**              | "kg"            | Zaplatené        | Brána priechodných modelov                                                                        |
| **Perplexity Search**         | `pplx-search`   | Zaplatené        | Vyhradený koncový bod založený na vyhľadávaní                                                     |
| **Serper Search**             | `serper-search` | Zaplatené        | Integrácia rozhrania API pre vyhľadávanie na webe                                                 |
| **Odvážne hľadanie**          | "brave-search"  | Zaplatené        | Integrácia Brave Search API                                                                       |
| **Exa Search**                | "exa-search"    | Zaplatené        | Integrácia neurónového vyhľadávacieho API                                                         |
| **Tavily Search**             | "tavily-search" | Zaplatené        | Integrácia rozhrania API vyhľadávania AI                                                          |
| **NanoBanana**                | `nb`            | Zaplatené        | API generovania obrázkov                                                                          |
| **ElevenLabs**                | "el"            | Zaplatené        | Syntéza hlasu prevodu textu na reč                                                                |
| **Cartesia**                  | "kartézia"      | Zaplatené        | Ultra rýchla syntéza hlasu TTS                                                                    |
| **PlayHT**                    | "hra"           | Zaplatené        | Klonovanie hlasu a TTS                                                                            |
| **Vo svete**                  | "vo svete"      | Zaplatené        | Hlasový chat s postavami AI                                                                       |
| **SD WebUI**                  | `sdwebui`       | Vlastný hostiteľ | Generovanie lokálneho obrazu stabilnej difúzie                                                    |
| **ComfyUI**                   | "comfyui"       | Vlastný hostiteľ | Generovanie lokálneho pracovného toku ComfyUI založené na uzloch                                  |
| **Kódovanie GLM**             | `glm`           | Zaplatené        | Koncový bod špecifický pre kódovanie BigModel/Zhipu                                               | **Celkovo: 67+ poskytovateľov**(4 zadarmo, 8 OAuth, 55 API kľúč) + neobmedzený počet vlastných poskytovateľov OpenAI/Anthropic-kompatibilných.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Automaticky generujte a vydávajte kľúče rozhrania API OmniRoute programovo s presadzovaním kvót podľa jednotlivých poskytovateľov a účtov.

| Koncový bod                     | Metóda           | Popis                                                            |
| ------------------------------- | ---------------- | ---------------------------------------------------------------- |
| `/api/v1/registrované-kľúče`    | 'POST'           | Vydajte nový kľúč – nespracovaný kľúč sa vrátil**len raz**       |
| `/api/v1/registrované-kľúče`    | "ZÍSKAŤ"         | Zoznam zaregistrovaných kľúčov (maskované)                       |
| `/api/v1/registered-keys/{id}`  | "ZÍSKAŤ/VYMAZAŤ" | Získať metadáta / Odvolať                                        |
| `/api/v1/quotas/check`          | "ZÍSKAŤ"         | Pred vydaním kvóty overte                                        |
| `/api/v1/providers/{id}/limits` | "GET/PUT"        | Konfigurácia limitov vydávania podľa jednotlivých poskytovateľov |
| `/api/v1/accounts/{id}/limits`  | "GET/PUT"        | Konfigurácia limitov vydávania na účet                           |
| `/api/v1/issues/report`         | 'POST'           | Hlásiť udalosti kvóty na GitHub Issues                           |

**Zabezpečenie:**Kľúče uložené ako hodnoty hash SHA-256. Neupravený kľúč zobrazený raz pri vytváraní, ktorý sa už nedá znova získať.#### 🎨 Provider Icons via @lobehub/icons (#529)

Viac ako 130 log poskytovateľov pomocou komponentov React (SVG) `@lobehub/icons`. Záložný reťazec:**Lobehub SVG → existujúci PNG → všeobecná ikona**. Aplikované na stránkach Dashboard, Providers a Agents so štandardizovaným komponentom „ProviderIcon“.#### 🔄 Model Auto-Sync Scheduler (#488)

Automaticky obnovuje zoznamy modelov pre pripojených poskytovateľov každých**24 hodín**. Beží pri štarte servera. Konfigurovateľné prostredníctvom „MODEL_SYNC_INTERVAL_HOURS“.#### 🔀 Per-Model Combo Routing (#563)

Mapujte vzory názvov modelov (glob) na konkrétne kombinácie pre automatické smerovanie:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nová tabuľka `model_combo_mappings` s porovnávaním glob-to-regex
  – Sekcia používateľského rozhrania ovládacieho panela: „Pravidlá smerovania modelov“ s vloženým pridávaním/úpravou/prepínaním/odstránením#### 🧭 API Endpoints Dashboard

Interaktívny katalóg, správa webhookov, prehliadač OpenAPI – všetko na jednej záložke na `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nových integrácií poskytovateľov vyhľadávania:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**– umožňujúce uzemnené reakcie AI s webovými údajmi v reálnom čase.#### 📊 Search Analytics

Nová karta v `/dashboard/analytics` – rozpis poskytovateľa, miera prístupov do vyrovnávacej pamäte, sledovanie nákladov. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Stĺpce `max_requests_per_day` a `max_requests_per_minute` s presadzovaním posuvného okna v pamäti, ktoré vracia HTTP 429.#### 🎵 Media Playground

Úplné ihrisko na vytváranie médií na stránke `/dashboard/media`: generovanie obrázkov, videa, hudby, prepisu zvuku (limit nahrávania 2 GB) a prevodu textu na reč.---

### 🔒 Security & CI/CD

-**Oprava CodeQL**– Opravených 10+ upozornení: 6 opakovaných polynómov, 1 nezabezpečená náhodnosť (`Math.random()` → `crypto.randomUUID()`), 1 vloženie príkazu shellu
–**Overenie trasy**– schémy Zod + `validateBody()` na**176/176 trasách API**– vynútená CI
–**Oprava CVE**– opravte zraniteľnosť XSS (GHSA-v2wj-7wpq-c8vv) vyriešenú prepísaním npm
–**Sploštené**– Nárazy 3.3.3 → 3.4.2 (znečistenie prototypu CWE-1321)
–**Docker**– inovovaný „docker/setup-buildx-action“ v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

–**#537**— Gemini CLI OAuth: vymazanie vykonateľnej chyby, keď v Dockeri chýba „GEMINI_OAUTH_CLIENT_SECRET“
–**#549**– trasy nastavení CLI teraz rozlišujú skutočný kľúč API z „keyId“ (nie maskované reťazce) -**#574**— Prihlásenie už nezamrzne po preskočení nastavenia hesla sprievodcu -**#506**— Prepísané `machineId` naprieč platformami (Windows REG.exe → macOS ioreg → Linux → záložný názov hostiteľa)#### Providers & Routing

–**#536**– LongCat AI: opravené „baseUrl“ a „authHeader“
–**#535**– Prepísanie pripnutého modelu: „body.model“ správne nastavené na „pinnedModel“ -**#570**— Modely Claude bez predpony sa teraz prenášajú na poskytovateľa Anthropic -**#585**— interné značky `<omniModel>` už neunikajú klientom pri streamovaní SSE -**#493**— Pomenovanie modelu vlastného poskytovateľa už nie je narušené odstránením predpony -**#490**— Streamovanie + ochrana kontextovej vyrovnávacej pamäte prostredníctvom injekcie „TransformStream“.
–**#511**– značka „<omniModel>“ vložená do prvého bloku obsahu (nie za „[DONE]“)#### CLI & Tools

-**#527**— Claude Code + slučka Codex: bloky `tool_result` teraz skonvertované na text -**#524**— Konfigurácia OpenCode bola uložená správne (XDG_CONFIG_HOME, formát TOML) -**#522**— API Manager: odstránené zavádzajúce tlačidlo „Kopírovať maskovaný kľúč“. -**#546**— `--version` vracia `neznáme` v systéme Windows (PR od @k0valik) -**#544**— Bezpečná detekcia nástroja CLI prostredníctvom známych inštalačných ciest (PR by @k0valik) -**#510**— Windows MSYS2/Git-Bash cesty sa automaticky normalizujú -**#492**— CLI zistí uzol spravovaný `mise`/`nvm`, keď chýba `app/server.js`#### Streaming & SSE

–**PR #587**– Vráťte import `resolveDataDir` do odpovedí Transformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Prekážka 429 nekonečné čakanie: zrušte čakajúce úlohy na limit rýchlosti (@xandr0s) -**#483**— Zastaviť koncový údaj „údaje: null“ za signálom „[DONE]“ -**#473**— Zombie SSE streamy: časový limit skrátený na 300 s → 120 s pre rýchlejší návrat#### Media & Transcription

-**Prepis**— Deepgram `video/mp4` → `audio/mp4` MIME mapovanie, automatická detekcia jazyka, interpunkcia -**TTS**– chybové zobrazenie „[object Object]“ opravené pre vnorené chyby v štýle ElevenLabs
–**Limity nahrávania**– Prepis médií sa zvýšil na 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

–**T01**– stĺpec „requested_model“ v denníkoch hovorov (migrácia 009) -**T02**— Odstráňte prázdne textové bloky z vnoreného súboru `tool_result.content`
–**T03**– analyzovať hlavičky kvóty `x-codex-5h-*` / `x-codex-7d-*` -**T04**— hlavička `X-Session-Id` pre externé pevné smerovanie -**T05**– Perzistencia DB s limitom rýchlosti s vyhradeným API -**T06**— Účet deaktivovaný → trvalé zablokovanie (1-ročné cooldown)
–**T07**– X-Forwarded-For IP validation (`extractClientIp()`) -**T08**— Limity relácie na kľúč API s presadzovaním posuvných okien
–**T09**– Rozsahy limitov pre kódex vs Spark (samostatné skupiny) -**T10**— Kredity sú vyčerpané → zreteľná 1-hodinová záloha -**T11**— `max` úsilie na uvažovanie → 131072 tokenov rozpočtu -**T12**— Cenové položky MiniMax M2.7
–**T13**– Oprava zastaraného zobrazenia kvóty (resetovanie povedomia o okne)
–**T14**– Kontrola protokolu TCP s rýchlym zlyhaním proxy (≤2 s, 30 s vo vyrovnávacej pamäti) -**T15**– normalizácia obsahu poľa pre Anthropic
–**T23**– Inteligentné núdzové obnovenie kvóty (extrakcia hlavičky) -**T24**– cooldown `503` + mapovanie `406` -**T25**– Záložná kontrola overenia poskytovateľa -**T29**— Vertex AI Service Account JWT auth -**T33**– konverzia od úrovne myslenia k rozpočtu -**T36**– klasifikácia chýb `403` vs `429`
–**T38**– Centralizované špecifikácie modelu („modelSpecs.ts“)
–**T39**– Záložný koncový bod pre „fetchAvailableModels“. -**T41**– automatické presmerovanie úlohy na pozadí na modely s bleskom -**T42**— Mapovanie pomeru strán generovania obrázkov#### Other Improvements

–**Prispôsobené hlavičky pre jednotlivé modely**– prostredníctvom používateľského rozhrania konfigurácie (PR #575 od @zhangqiang8vip) -**Dĺžka kontextu modelu**– konfigurovateľná v metadátach modelu (PR #578 od @hijak) -**Odstránenie predpony modelu**– možnosť odstrániť predponu poskytovateľa z názvov modelov (PR #582 od @jay77721) -**Ukončenie podpory Gemini CLI**– označené ako zastarané s upozornením na obmedzenie protokolu Google OAuth -**YAML syntaktický analyzátor**– nahradený vlastný analyzátor `js-yaml` pre správnu analýzu špecifikácií OpenAPI -**ZWS v5**— oprava úniku HMR (485 pripojení DB → 1, pamäť 2,4 GB → 195 MB)
–**Export denníka**– Nové tlačidlo exportu JSON na informačnom paneli s rozbaľovacím zoznamom časového rozsahu -**Pruh upozornení na aktualizáciu**– domovská stránka hlavného panela sa zobrazí, keď sú k dispozícii nové verzie---

### 🌐 i18n & Documentation

-**30 jazykov**pri 100% parite – synchronizovaných 2 788 chýbajúcich kľúčov -**Čeština**— Úplný preklad: 22 dokumentov, 2 606 reťazcov používateľského rozhrania (PR od @zen0bit)
–**čínština (zh-CN)**– úplný opätovný preklad (PR od @only4copilot) -**VM Deployment Guide**– Preložené do angličtiny ako zdrojový dokument -**Referencia API**– pridané koncové body `/v1/embeddings` a `/v1/audio/speech` -**Počet poskytovateľov**– Aktualizované z 36+/40+/44+ na**67+**v rámci README a všetkých 30 i18n README---

### 🔀 Community PRs Merged (10)

| PR       | Autor           | Zhrnutie                                                                     |
| -------- | --------------- | ---------------------------------------------------------------------------- |
| **#587** | @k0valik        | oprava(sse): vrátiť späť import resolveDataDir pre Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): možnosť odstránenia predpony názvu modelu                       |
| **#581** | @jay77721       | oprava(npm): prepojenie elektron-release s npm-publish workflow              |
| **#578** | @hijak          | feat: konfigurovateľná dĺžka kontextu v metaúdajoch modelu                   |
| **#575** | @zhangqiang8vip | feat: upstream hlavičky podľa modelu, kompatibilný PATCH, zarovnanie chatu   |
| **#562** | @coobabm        | oprava: Správa relácie MCP, Claude passthrough, detectFormat                 |
| **#561** | @zen0bit        | fix(i18n): Opravy českého prekladu                                           |
| **#555** | @k0valik        | fix(sse): centralizované `resolveDataDir()` pre rozlíšenie cesty             |
| **#546** | @k0valik        | fix(cli): `--version` vracia `neznáme` v systéme Windows                     |
| **#544** | @k0valik        | fix(cli): bezpečná detekcia nástroja CLI prostredníctvom inštalačných ciest  |
| **#542** | @rdself         | fix(ui): svetelný režim kontrast premenné témy CSS                           |
| **#530** | @kang-heewon    | feat: Poskytovatelia OpenCode Zen + Go s `OpencodeExecutor`                  |
| **#512** | @zhangqiang8vip | feat: kompatibilita modelu podľa protokolu (`compatByProtocol`)              |
| **#497** | @zhangqiang8vip | oprava: úniky prostriedkov HMR v dev-mode (ZWS v5)                           |
| **#495** | @xandr0s        | oprava: Prekážka 429 nekonečného čakania (vypustenie čakajúcich úloh)        |
| **#494** | @zhangqiang8vip | feat: Vývojár MiniMax→oprava systémovej roly                                 |
| **#480** | @prakersh       | oprava: extrakcia využitia splachovania prúdom                               |
| **#479** | @prakersh       | feat: Kódex 5.3/5.4 a antropické cenové položky                              |
| **#475** | @only4copilot   | feat(i18n): vylepšený čínsky preklad                                         |

**Ďakujeme všetkým prispievateľom!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` 3`#9` `#490` 3`#49 `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` 5`#53` 5`#53` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 testov, 0 zlyhaní**(nárast z 821 vo verzii 2.9.5)

- +105 nových testov zahŕňajúcich: mapovanie model-kombo, registrované kľúče, OpencodeExecutor, poskytovateľ Bailian, overenie trasy, klasifikáciu chýb, mapovanie pomeru strán a ďalšie---

### 📦 Database Migrations

| Migrácia | Popis                                                                  |
| -------- | ---------------------------------------------------------------------- | --- |
| **008**  | tabuľky `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**  | stĺpec `requested_model` v `call_logs`                                 |
| **010**  | Tabuľka `model_combo_mappings` pre kombinované smerovanie podľa modelu | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Prelomové zmeny:**Žiadne. Všetky existujúce konfigurácie, kombá a kľúče API sú zachované.
> Migrácie databáz 008-010 sa spúšťajú automaticky pri spustení.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

–**Oprava CodeQL**– Opravených 10+ upozornení:

- 6 opakovaní polynómov v `provider.ts` / `chatCore.ts` (nahradené vzory alternácie `(?:^|/)` priraďovaním na základe segmentov)
- 1 nezabezpečená náhodnosť v `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection v `prepublish.mjs` (escapovanie cesty `JSON.stringify()`) -**Overenie trasy**– Pridané schémy Zod + `validateBody()` do 5 trás bez overenia:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` teraz prejde:**176/176 overených trás**### 🐛 Bug Fixes

-**#585**— Interné značky `<omniModel>` už neunikajú klientom v odpovediach SSE. Pridaná odchádzajúce sanitácia `TransformStream` do `combo.ts`### ⚙️ Infrastructure

–**Docker**– inovovaný „docker/setup-buildx-action“ z verzie 3 → v4 (oprava ukončenia podpory Node.js 20) -**Čistenie CI**– Odstránených viac ako 150 neúspešných/zrušených spustení pracovného postupu### 🧪 Tests

- Testovací balík:**926 testov, 0 zlyhaní**(+3 nové)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Zvýšené limity prepisu médií
- Pridaná dĺžka kontextu modelu do metadát registra
- Pridané vlastné hlavičky pre každý model upstream cez konfiguračné používateľské rozhranie
- Opravené viaceré chyby, overenie záplat Zod a vyriešené rôzne problémy komunity.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Kombinované smerovanie podľa modelu: namapujte vzory názvov modelov (globus) na konkrétne kombinácie pre automatické smerovanie

- Nová tabuľka `model_combo_mappings` (migrácia 010) so vzorom, combo_id, prioritou, povolená
- DB funkcia `resolveComboForModel()` s porovnávaním glob-to-regex (nerozlišujú sa malé a veľké písmená, zástupné znaky `*` a `?`)
- `getComboForModel()` v `model.ts`: rozširuje `getCombo()` o záložný vzor modelu
- `chat.ts`: rozhodnutie o smerovaní teraz kontroluje mapovania model-komb pred spracovaním jedného modelu
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: časť „Pravidlá smerovania modelov“ pridaná na stránku kombinácií s vloženým pridaním/úpravou/prepínaním/odstránením
  – Príklady: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Úplná synchronizácia i18n**: 2 788 chýbajúcich kľúčov pridaných do 30 jazykových súborov – všetky jazyky teraz so 100 % paritou s „en.json“ -**Stránka agentov i18n**: sekcia OpenCode Integration je plne internacionalizovaná (názov, popis, skenovanie, štítky na stiahnutie) -**6 nových kľúčov**pridaných do menného priestoru „agentov“ pre sekciu OpenCode### 🎨 UI/UX

-**Ikony poskytovateľa**: pridaných 16 chýbajúcich ikon poskytovateľov (3 skopírované, 2 stiahnuté, 11 vytvorených SVG) -**Záložný SVG**: Komponent `ProviderIcon` aktualizovaný 4-vrstvovou stratégiou: Lobehub → PNG → SVG → Všeobecná ikona -**Snímanie odtlačkov prstov agentov**: Synchronizované s nástrojmi CLI – pridaný droid, openclaw, druhý pilot, otvorený kód do zoznamu odtlačkov prstov (celkom 14)### Bezpečnosť

-**CVE oprava**: Vyriešená chyba zabezpečenia dompurify XSS (GHSA-v2wj-7wpq-c8vv) prostredníctvom prepisov npm vynútením `dompurify@^3.3.2`

- `npm audit` teraz hlási**0 zraniteľností**### 🧪 Tests

- Testovacia sada:**923 testov, 0 zlyhaní**(+ 15 nových testov mapovania v kombinácii modelov)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Zhrnutie                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): Správa relácie MCP, normalizácia prechodu Clauda, ​​modálny OAuth, detectFormat |
| **#561** | @zen0bit | fix(i18n): Opravy českého prekladu — názvy metód HTTP a aktualizácie dokumentácie        | ### 🧪 Tests |

- Testovací balík:**908 testov, 0 zlyhaní**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**rozlišuje skutočný kľúč API z `keyId` v nastaveniach CLI (`codex-settings`, `droid-settings`, `kilo-settings`), aby sa zabránilo zapisovaniu maskovaných reťazcov (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Zhrnutie                                                                                                                                                                                                        |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` vracia `neznáme` v systéme Windows – namiesto importu ESM použite `JSON.parse(readFileSync)`                                                                                              |
| **#555** | @k0valik | oprava(sse): centralizovaný `resolveDataDir()` na rozlíšenie cesty v povereniach, autoCombo, záznamníku odpovedí a záznamníku požiadaviek                                                                       |
| **#544** | @k0valik | fix(cli): bezpečná detekcia nástrojov CLI prostredníctvom známych inštalačných ciest (8 nástrojov) s overením symbolických odkazov, kontrolami typu súboru, obmedzeniami veľkosti, minimálnym env v Healthcheck |
| **#542** | @rdself  | fix(ui): zlepšenie kontrastu svetelného režimu – pridanie chýbajúcich premenných tém CSS (`bg-primary`, `bg-subtle`, `text-primary`) a oprava iba tmavých farieb v detaile protokolu                            | ### 🔧 Bug Fixes |

-**Oprava TDZ v `cliRuntime.ts`**— `validateEnvPath` bol použitý pred inicializáciou pri spustení modulu pomocou `getExpectedParentPaths()`. Zmenené poradie vyhlásení, aby sa opravila chyba „ReferenceError“. -**Opravy zostavy**– Pridané `pino` a `pino-pretty` do `serverExternalPackages`, aby sa zabránilo Turbopacku prerušiť interné načítanie Pina.### 🧪 Tests

- Testovací balík:**905 testov, 0 zlyhaní**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresia zostavovania elektrónov: znížená úroveň Next.js z `16.1.x` na `16.0.10`, aby sa eliminovala nestabilita hašovania modulu Turbopack, ktorá spôsobovala prázdne obrazovky v balíku Electron desktop. -**Opravy testov jednotiek**– Opravené dve neaktuálne testovacie tvrdenia (pomer/rozlíšenie `nanobanana-image-handler`, mapovanie poľa `thinking-budget` Gemini `thinkingConfig`), ktoré sa po nedávnych zmenách implementácie posunuli. -**#541**— Reakcia na spätnú väzbu od používateľov o zložitosti inštalácie; nie sú potrebné žiadne zmeny kódu.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementovaný pomocou knižnice `jose` na spracovanie overenia JWT/Service Account spolu s konfigurovateľnými oblasťami v používateľskom rozhraní a automatickým vytváraním adresy URL modelu partnera. -**T42**— Mapovanie pomeru strán generovania obrázkov: vytvorila sa logika `sizeMapper` pre všeobecné formáty OpenAI (`veľkosť`), pridalo sa natívne spracovanie `imagen3` a aktualizovali sa koncové body NanoBanana, aby sa automaticky využívali mapované pomery strán. -**T38**— Centralizované špecifikácie modelu: `modelSpecs.ts` vytvorené pre limity a parametre na model.### 🔧 Improvements

-**T40**— Integrácia nástrojov OpenCode CLI: natívna integrácia `opencode-zen` a `opencode-go` dokončená v skoršom PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown čaká na opravu + `406` mapovanie: mapované `406 Not Acceptable` na `503 Service Unavailable` so správnymi intervalmi chladenia. -**T25**– Záložná kontrola overenia poskytovateľa: elegantný návrat k štandardným overovacím modelom, keď nie je prítomný špecifický „validationModelId“. -**T36**— `403` vs `429` spresnenie obsluhy poskytovateľa: extrahované do `errorClassifier.ts`, aby sa správne oddelili zlyhania pevných povolení (`403`) od limitov rýchlosti (`429`). -**T39**– Endpoint Fallback pre `fetchAvailableModels`: implementovaný trojvrstvový mechanizmus (`/models` -> `/v1/models` -> lokálny všeobecný katalóg) + aktualizácie nástroja MCP `list_models_catalog`, aby odrážali `zdroj` a `varovanie`. -**T33**— Konverzia úrovne myslenia na rozpočet: prevádza úrovne kvalitatívneho myslenia na presné rozdelenie rozpočtu. -**T41**— Automatické presmerovanie úloh na pozadí: automaticky nasmeruje náročné úlohy hodnotenia na pozadí do flashových/efektívnych modelov. -**T23**— Inteligentný núdzový reset kvóty: presne extrahuje hodnoty hlavičky `x-ratelimit-reset` / `retry-after` alebo mapuje statické cooldowny.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Inovácia z verzie 2.9.5:**16 problémov vyriešených · 2 zlúčené PR komunity · 2 noví poskytovatelia · 7 nových koncových bodov API · 3 nové funkcie · migrácia DB 008+009 · 832 úspešných testov · 15 vylepšení medzery sub2api (T01–T15 dokončené).### 🆕 New Providers

| Poskytovateľ     | Alias ​​       | Úroveň    | Poznámky                                                       |
| ---------------- | -------------- | --------- | -------------------------------------------------------------- |
| **OpenCode Zen** | "opencode-zen" | Zadarmo   | 3 modely cez `opencode.ai/zen/v1` (PR #530 od @kang-heewon)    |
| **OpenCode Go**  | "opencode-go"  | Zaplatené | 4 modely cez `opencode.ai/zen/go/v1` (PR #530 od @kang-heewon) |

Obaja poskytovatelia používajú nový `OpencodeExecutor` s viacformátovým smerovaním (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Automaticky generujte a vydávajte kľúče rozhrania API OmniRoute programovo s presadzovaním kvót podľa jednotlivých poskytovateľov a účtov.

| Koncový bod                              | Metóda    | Popis                                                            |
| ---------------------------------------- | --------- | ---------------------------------------------------------------- |
| `/api/v1/registrované-kľúče`             | 'POST'    | Vydajte nový kľúč – nespracovaný kľúč sa vrátil**len raz**       |
| `/api/v1/registrované-kľúče`             | "ZÍSKAŤ"  | Zoznam zaregistrovaných kľúčov (maskované)                       |
| `/api/v1/registered-keys/{id}`           | "ZÍSKAŤ"  | Získať kľúčové metadáta                                          |
| `/api/v1/registered-keys/{id}`           | "DELETE"  | Zrušiť kľúč                                                      |
| `/api/v1/registrované-kľúče/{id}/revoke` | 'POST'    | Odvolať (pre klientov bez podpory DELETE)                        |
| `/api/v1/quotas/check`                   | "ZÍSKAŤ"  | Pred vydaním kvóty overte                                        |
| `/api/v1/providers/{id}/limits`          | "GET/PUT" | Konfigurácia limitov vydávania podľa jednotlivých poskytovateľov |
| `/api/v1/accounts/{id}/limits`           | "GET/PUT" | Konfigurácia limitov vydávania na účet                           |
| `/api/v1/issues/report`                  | 'POST'    | Hlásiť udalosti kvóty na GitHub Issues                           |

**DB — Migrácia 008:**Tri nové tabuľky: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Zabezpečenie:**Kľúče uložené ako hodnoty hash SHA-256. Neupravený kľúč zobrazený raz pri vytváraní, ktorý sa už nedá znova získať.
**Typy kvót:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` na poskytovateľa a na účet.
**Idempotency:**Pole `idempotency_key` zabraňuje duplicitnému vydaniu. Vráti `409 IDEMPOTENCY_CONFLICT`, ak bol kľúč už použitý.
**Rozpočet na kľúč:**`dailyBudget` / `hourlyBudget` — obmedzuje počet požiadaviek, ktoré môže kľúč smerovať na okno.
**Prehľady GitHub:**Voliteľné. Nastavte `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` na automatické vytváranie problémov GitHub pri prekročení kvóty alebo zlyhaniach vydania.#### 🎨 Provider Icons — @lobehub/icons (#529)

Všetky ikony poskytovateľov na paneli teraz používajú komponenty React `@lobehub/icons` (viac ako 130 poskytovateľov s SVG).
Záložný reťazec:**Lobehub SVG → existujúci `/providers/{id}.png` → všeobecná ikona**. Používa správny vzor React `ErrorBoundary`.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute teraz automaticky obnovuje zoznamy modelov pre pripojených poskytovateľov každých**24 hodín**.

- Beží pri spustení servera cez existujúci háčik `/api/sync/initialize`
- Konfigurovateľné pomocou premennej prostredia `MODEL_SYNC_INTERVAL_HOURS`
- Zahŕňa 16 hlavných poskytovateľov
- Zaznamenáva čas poslednej synchronizácie v databáze nastavení---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Vymazanie vykonateľnej chyby, keď chýba `GEMINI_OAUTH_CLIENT_SECRET` v nasadeniach Docker/vlastne hostených. V minulosti sa na Googli zobrazovalo záhadné „client_secret is missing“. Teraz poskytuje špecifické pokyny pre `docker-compose.yml` a `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Opravené `baseUrl` (`api.longcat.chat/openai`) a `authHeader` (`Autorizácia: Nositeľ`). -**#535 — Prepísanie pripnutého modelu:**Keď je aktívna ochrana kontextovej vyrovnávacej pamäte, parameter `body.model` je teraz správne nastavený na hodnotu `pinnedModel`. -**#532 — Overenie kľúča OpenCode Go:**Teraz používa testovací koncový bod `zen/v1` (`testKeyBaseUrl`) — rovnaký kľúč funguje pre obe vrstvy.#### CLI & Tools

-**#527 — Claude Code + Cyklus kódexu:**Bloky `tool_result` sa teraz skonvertujú na text namiesto vypustenia, čím sa zastavia nekonečné slučky výsledkov nástroja. -**#524 — Uloženie konfigurácie OpenCode:**Pridaný obslužný program `saveOpenCodeConfig()` (XDG_CONFIG_HOME si uvedomuje, píše TOML). -**#521 — Prihlásenie sa zaseklo:**Prihlásenie už po preskočení nastavenia hesla nezamrzne – presmeruje sa správne na registráciu. -**#522 — API Manager:**Odstránené zavádzajúce tlačidlo „Kopírovať maskovaný kľúč“ (nahradené popisom ikony zámku). -**#532 — Konfigurácia OpenCode Go:**Obslužný program nastavení sprievodcu teraz spracováva toolId `opencode`.#### Developer Experience

-**#489 — Antigravity:**Chýbajúce `googleProjectId` vracia štruktúrovanú chybu 422 s pokynmi na opätovné pripojenie namiesto záhadného zlyhania. -**#510 — Windows cesty:**MSYS2/Git-Bash cesty (`/c/Program Files/...`) sú teraz automaticky normalizované na `C:\Program Files\...`. -**#492 — Spustenie CLI:**`omniroute` CLI teraz deteguje uzol spravovaný `mise`/`nvm`, keď chýba `app/server.js` a zobrazuje cielené pokyny na opravu.---

### 📖 Documentation Updates

-**#513**— Obnovenie hesla dockera: `INITIAL_PASSWORD` env var riešenie zdokumentované -**#520**— pnpm: zdokumentovaný krok `pnpm schvaľuje-vytvára lepšie-sqlite3`---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` 7`#535` 7`#535---

### 🔀 Community PRs Merged

| PR       | Autor        | Zhrnutie                                                                    |
| -------- | ------------ | --------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Poskytovatelia OpenCode Zen + Go s `OpencodeExecutor` a vylepšenými testami | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Perzistencia DB s limitom rýchlosti: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` v `providers.ts`. Existujúci stĺpec „rate_limited_until“ sa teraz zobrazuje ako vyhradené rozhranie API – obnovenie tokenu OAuth sa NESMIE dotknúť tohto poľa, aby sa predišlo slučkám s limitom rýchlosti. -**T08**– Limit relácie na kľúč API: `max_sessions INTEGER DEFAULT 0` pridané do `api_keys` prostredníctvom automatickej migrácie. `sessionManager.ts` získava `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` a `getActiveSessionCountForKey()`. Volajúci v `chatCore.js` môžu vynútiť limit a znížiť ho na `req.close`. -**T09**– Rozsahy limitov Codex vs Spark: `getCodexModelScope()` a `getCodexRateLimitKey()` v `codex.ts`. Štandardné modely (`gpt-5.x-codex`, `codex-mini`) majú rozsah `"codex"`; spark modely (`codex-spark*`) získajú rozsah `"spark"`. Kľúče na obmedzenie sadzby by mali byť `${accountId}:${scope}`, takže vyčerpanie jedného fondu neblokuje druhý. -**T13**– Oprava zastaraného zobrazenia kvóty: `getEffectiveQuotaUsage(used, resetAt)` vráti `0`, keď prejde okno resetovania; `formatResetCountdown(resetAt)` vráti ľudsky čitateľný reťazec odpočítavania (napr. `"2h 35m"`). Obidve exportované z `providers.ts` + `localDb.ts` pre spotrebu dashboardu.
–**T14**– rýchle zlyhanie servera proxy: nový súbor `src/lib/proxyHealth.ts` s `isProxyReachable(proxyUrl, timeoutMs=2000)` (kontrola TCP, časový limit ≤2s namiesto 30s), `getCachedProxyHealth()`, `neplatnosť` a `zdravie` `getAllProxyHealthStatuses()`. Výsledky sa štandardne ukladajú do vyrovnávacej pamäte 30 s; konfigurovateľné cez `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Testovací balík:**832 testov, 0 zlyhaní**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— stĺpec `requested_model` v `call_logs` (migrácia 009): sledujte, ktorý model klient pôvodne požadoval v porovnaní so skutočným smerovaným modelom. Umožňuje analýzu miery záložných reklám. -**T02**— Odstráni prázdne textové bloky z vnoreného `tool_result.content`: zabraňuje chybám Anthropic 400 (`bloky textového obsahu musia byť neprázdne`), keď Claude Code reťazí výsledky nástroja. -**T03**— Analyzujte hlavičky `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extrahujte okná kvóty kódexu pre presné plánovanie chladenia namiesto všeobecnej 5-minútovej núdze. -**T04**— Hlavička `X-Session-Id` pre externé pevné smerovanie: `extractExternalSessionId()` v `sessionManager.ts` číta hlavičky `x-session-id` / `x-omniroute-session` s predponou `ext:`, aby sa predišlo kolízii s interným ID relácie SHA-256. Kompatibilné s Nginx (hlavička s pomlčkou). -**T06**— Účet deaktivovaný → trvalé blokovanie: `isAccountDeactivated()` v `accountFallback.ts` deteguje 401 deaktivačných signálov a použije 1-ročné chladenie, aby sa zabránilo opakovaniu permanentne mŕtvych účtov. -**T07**— X-Forwarded-For IP validácia: nový `src/lib/ipUtils.ts` s `extractClientIp()` a `getClientIpFromRequest()` — preskakuje `neznáme`/non-IP záznamy v reťazcoch `X-Forwarded-For` (požiadavky Nginx/proxy-forward). -**T10**— Vyčerpané kredity → zreteľná rezerva: `isCreditsExhausted()` v `accountFallback.ts` vráti 1h chladenie s príznakom `creditsExhausted`, ktorý sa líši od všeobecného obmedzenia sadzby 429. -**T11**– `max` úsilie na uvažovanie → 131 072 tokenov rozpočtu: `EFFORT_BUDGETS` a `THINKING_LEVEL_MAP` aktualizované; spätné mapovanie teraz vracia `"max"` pre odpovede s plným rozpočtom. Test jednotky bol aktualizovaný. -**T12**– do cenovej tabuľky boli pridané položky MiniMax M2.7: „minimax-m2.7“, „MiniMax-M2.7“, „minimax-m2.7-highspeed“ (sub2api PR #1120). Ceny M2.5/GLM-4.7/GLM-5/Kimi už existovali. -**T15**— Normalizácia obsahu poľa: Pomocník `normalizeContentToString()` v `openai-to-claude.ts` správne zbalí správy systému/nástroja vo formáte poľa do reťazca pred odoslaním do Anthropic.### 🧪 Tests

- Testovacia sada:**832 testov, 0 zlyhaní**(nezmenené oproti rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: automatické vydávanie kľúčov API s presadzovaním kvót pre jednotlivých poskytovateľov a účtov

- `POST /api/v1/registered-keys` — vydať kľúče s podporou idempotencie
- `GET /api/v1/registered-keys` — zoznam (maskovaných) zaregistrovaných kľúčov
- `GET /api/v1/registered-keys/{id}` — získať metadáta kľúča
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — zrušenie kľúčov
- `GET /api/v1/quotas/check` — pred vydaním overte platnosť
- `PUT /api/v1/providers/{id}/limits` — nastaviť limity vydávania poskytovateľa
- `PUT /api/v1/accounts/{id}/limits` — nastaviť limity na vydanie účtu
- `POST /api/v1/issues/report` – voliteľné hlásenie problémov GitHub
- Migrácia DB 008: tabuľky `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Pridaní poskytovatelia OpenCode Zen a OpenCode Go (od @kang-heewon)

- Nový `OpencodeExecutor` s viacformátovým smerovaním (`/chat/completions`, `/messages`, `/responses`)
- 7 modelov na oboch úrovniach---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

–**#529**– Ikony poskytovateľov teraz používajú [@lobehub/icons](https://github.com/lobehub/lobe-icons) s elegantným záložným súborom PNG a komponentom „ProviderIcon“ (podporovaných viac ako 130 poskytovateľov) -**#488**— Automatická aktualizácia zoznamov modelov každých 24 hodín pomocou nástroja `modelSyncScheduler` (konfigurovateľný prostredníctvom `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: teraz zobrazuje jasnú vykonateľnú chybu, keď chýba `GEMINI_OAUTH_CLIENT_SECRET` v nasadení Docker/vlastne hosťované---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Overenie kľúča LongCat AI: opravená baseUrl (`api.longcat.chat/openai`) a authHeader (`Autorizácia: Nositeľ`) -**#535**— Prepísanie pripnutého modelu: `body.model` je teraz nastavený na `pinnedModel`, keď ochrana kontextovej vyrovnávacej pamäte zistí pripnutý model -**#524**— konfigurácia OpenCode je teraz uložená správne: pridaný obslužný program `saveOpenCodeConfig()` (XDG_CONFIG_HOME si uvedomuje, píše TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Prihlásenie sa už nezasekáva po preskočení nastavenia hesla (presmeruje na registráciu)
–**#522**— API Manager: Odstránené zavádzajúce tlačidlo „Kopírovať maskovaný kľúč“ (nahradené popisom ikony zámku) -**#527**— Cyklus superschopností Claude Code + Codex: bloky `tool_result` sa teraz skonvertujú na text namiesto toho, aby boli vypustené
–**#532**– Overenie kľúča OpenCode GO API teraz používa správny koncový bod `zen/v1` (`testKeyBaseUrl`)
–**#489**– Antigravitácia: chýbajúci parameter „googleProjectId“ vracia štruktúrovanú chybu 422 s pokynmi na opätovné pripojenie -**#510**— Windows: Cesty MSYS2/Git-Bash (`/c/Program Files/...`) sú teraz normalizované na `C:\Program Files\...` -**#492**— `omniroute` CLI teraz deteguje `mise`/`nvm`, keď chýba `app/server.js` a zobrazuje cielenú opravu### Dokumentácia

-**#513**— Obnovenie hesla dockera: `INITIAL_PASSWORD` env var riešenie zdokumentované
–**#520**– pnpm: zdokumentované „pnpm schvaľuje-zostavuje lepšie-sqlite3“### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Noví poskytovatelia OpenCode, oprava prihlasovacích údajov na vkladanie, chyba maskovaného kľúča CLI, oprava CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Nástroje CLI ukladajú maskovaný kľúč API do konfiguračných súborov**— POST cesty `claude-settings`, `cline-settings` a `openclaw-settings` teraz akceptujú parameter `keyId` a rozlišujú skutočný kľúč API z DB pred zápisom na disk. `ClaudeToolCard` sa aktualizoval tak, aby namiesto maskovaného zobrazovaného reťazca odosielal `keyId`. Opravy #523, #526. -**Vlastní poskytovatelia vkladania: Chyba `Žiadne poverenia`**– `/v1/embeddings` teraz sleduje `credentialsProviderId` oddelene od predpony smerovania, takže poverenia sa získavajú z zodpovedajúceho ID uzla poskytovateľa, a nie z reťazca verejnej predpony. Opravuje regresiu, kde `google/gemini-embedding-001` a podobné modely vlastných poskytovateľov vždy zlyhajú s chybou poverení. Opravy súvisiace s číslom 532. (PR #528 od @jacob2826) -**Regulačný výraz ochrany kontextovej vyrovnávacej pamäte chýba `
` prefix**— `CACHE_TAG_PATTERN` v `comboAgentMiddleware.ts` sa aktualizoval tak, aby zodpovedal obom doslovným `
` (obrátené lomítko-n) a skutočný nový riadok U+000A, ktorý streamovanie `combo.ts` vloží okolo značky `<omniModel>` po oprave #515. Opravy #531.### ✨ New Providers

–**OpenCode Zen**– Bezplatná brána na úrovni `opencode.ai/zen/v1` s 3 modelmi: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**– Predplatiteľská služba na `opencode.ai/zen/go/v1` so 4 modelmi: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (formát Claude), `minimax-m2.5` (formát Claude)

- Obaja poskytovatelia používajú nový `OpencodeExecutor`, ktorý dynamicky smeruje na `/chat/completions`, `/messages`, `/responses` alebo `/models/{model}:generateContent` na základe požadovaného modelu. (PR #530 od @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Opravy chýb – zachovajte kľúč cache prompt Codex, opravte escapovanie tagContent JSON, synchronizujte stav tokenu s vypršanou platnosťou do DB.### 🐛 Bug Fixes

-**fix(translator)**: Zachovajte `prompt_cache_key` v Responses API → preklad dokončenia rozhovoru (#517)
— Pole je signál afinity vyrovnávacej pamäte, ktorý používa Codex; jeho odstránenie bránilo rýchlym prístupom do vyrovnávacej pamäte.
Opravené v `openai-responses.ts` a `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` v `tagContent`, takže vložený reťazec JSON je platný (#515)
— Doslovné nové riadky šablóny (U+000A) nie sú povolené v rámci hodnôt reťazca JSON.
Nahradené `\n` doslovnými sekvenciami v `open-sse/services/combo.ts`.

-**oprava (použitie)**: Stav tokenu s vypršanou platnosťou synchronizácie späť do DB pri zlyhaní živého overenia (#491)
— Keď sa živá kontrola limitov a kvót vráti 401/403, spojenie „testStatus“ je teraz aktualizované
v databáze „vypršala platnosť“, takže stránka Poskytovatelia odráža rovnaký zhoršený stav.
Opravené v `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Pridajte 5 nových bezplatných poskytovateľov AI — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(poskytovatelia/longcat)**: Pridajte LongCat AI (`lc/`) – 50 miliónov tokenov/deň zadarmo (Flash-Lite) + 500 000/deň (Chat/Thinking) počas verejnej beta verzie. Štandardné overenie nosiča kompatibilné s OpenAI. -**feat(poskytovatelia/pollinations)**: Add Pollinations AI (`pol/`) – nevyžaduje sa žiadny kľúč API. Proxy GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 požiadavka/15 s zadarmo). Vlastný exekútor spracováva voliteľné overenie. -**feat(poskytovatelia/cloudflare-ai)**: Pridajte Cloudflare Workers AI (`cf/`) – 10 000 neurónov/deň zadarmo (~150 LLM odpovedí alebo 500s Whisper audio). 50+ modelov na globálnej hranici. Vlastný spúšťač vytvorí dynamickú webovú adresu s `accountId` z poverení. -**feat(poskytovatelia/scaleway)**: Pridajte generatívne API Scaleway (`scw/`) – 1 milión bezplatných tokenov pre nové účty. V súlade s EÚ/GDPR (Paríž). Qwen3 235B, Lama 3.1 70B, Mistral Small 3.2. -**feat(poskytovatelia/aimlapi)**: Pridajte AI/ML API (`aiml/`) – bezplatný kredit 0,025 $/deň, viac ako 200 modelov (GPT-4o, Claude, Gemini, Llama) prostredníctvom jedného koncového bodu agregátora.### 🔄 Provider Updates

-**feat(providers/together)**: Pridajte `hasFree: true` + 3 trvalo bezplatné ID modelov: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Pridajte `hasFree: true` + `freeNote` (1 500 req/deň, nie je potrebná kreditná karta, aistudio.google.com)
–**fuška (poskytovatelia/gemini)**: Pre prehľadnosť premenujte zobrazovaný názov na „Gemini (Google AI Studio)“### ⚙️ Infrastructure

–**feat(executors/pollinations)**: Nový „PollinationsExecutor“ – vynechá hlavičku „Authorization“, keď nie je poskytnutý žiadny kľúč API -**feat(executors/cloudflare-ai)**: Nový `CloudflareAIExecutor` – dynamická tvorba URL vyžaduje `accountId` v povereniach poskytovateľa -**feat(executors)**: Zaregistrujte priradenia exekútorov `pollinations`, `pol`, `cloudflare-ai`, `cf`### Dokumentácia

-**docs(readme)**: Rozšírený bezplatný kombinovaný balík na 11 poskytovateľov (0 $ navždy) -**docs(readme)**: Pridané 4 nové bezplatné sekcie poskytovateľov (LongCat, Pollinations, Cloudflare AI, Scaleway) s modelovými tabuľkami -**docs(readme)**: Aktualizovaná cenová tabuľka so 4 novými riadkami bezplatnej úrovne -**docs(i18n/pt-BR)**: Aktualizovaná cenová tabuľka + pridané sekcie LongCat/Pollinations/Cloudflare AI/Scaleway v portugalčine -**docs(new-features/ai)**: 10 súborov so špecifikáciami úloh + hlavný plán implementácie v `docs/new-features/ai/`### 🧪 Tests

- Testovací balík:**821 testov, 0 zlyhaní**(nezmenené)---

## [2.9.2] — 2026-03-21

> Sprint: Opravte prepis médií (Deepgram/HuggingFace Content-Type, detekcia jazyka) a zobrazenie chýb TTS.### 🐛 Bug Fixes

-**fix(transscription)**: Prepis zvuku Deepgram a HuggingFace teraz správne mapuje `video/mp4` → `audio/mp4` a ďalšie typy MIME médií prostredníctvom nového pomocníka `resolveAudioContentType()`. Predtým nahrávanie súborov `.mp4` dôsledne vracalo „Žiadna zistená reč“, pretože Deepgram prijímal `Content-Type: video/mp4`. -**fix(transscription)**: Pridané `detect_language=true` do požiadaviek Deepgramu – automaticky zisťuje jazyk zvuku (portugalčina, španielčina atď.) namiesto predvoleného nastavenia angličtiny. Opravuje neanglické prepisy, ktoré vracajú prázdne alebo nesprávne výsledky. -**fix(transscription)**: Pridané `punctuate=true` do požiadaviek Deepgramu na kvalitnejší výstup prepisu so správnou interpunkciou. -**fix(tts)**: Chybové zobrazenie „[object Object]“ v odpovediach prevodu textu na reč opravené v súboroch „audioSpeech.ts“ aj „audioTranscription.ts“. Funkcia `upstreamErrorResponse()` teraz správne extrahuje správy vnoreného reťazca od poskytovateľov, ako je ElevenLabs, ktoré vracajú `{ error: { message: "...", status_code: 401 } }` namiesto plochého chybového reťazca.### 🧪 Tests

- Testovací balík:**821 testov, 0 zlyhaní**(nezmenené)### Triaged Issues

-**#508**— Regresia formátu volania nástroja: požadované protokoly proxy a informácie o reťazci poskytovateľa (informácie o potrebe) -**#510**— Cesta kontroly stavu Windows CLI: požadované informácie o verzii shellu/uzla (`needs-info`) -**#485**— Volania nástroja Kiro MCP: uzavreté z dôvodu externého problému Kiro (nie OmniRoute) -**#442**— Koncový bod Baseten /models: uzavretý (zdokumentované manuálne riešenie) -**#464**— Rozhranie API na poskytovanie kľúčov: potvrdené ako položka plánu---

## [2.9.1] — 2026-03-21

> Sprint: Opravte stratu údajov SSE omniModel, zlúčte kompatibilitu modelu podľa protokolu.### Bug Fixes

-**#511**— Kritické: Značka `<omniModel>` bola odoslaná po `finish_reason:stop` v streamoch SSE, čo spôsobilo stratu údajov. Značka je teraz vložená do prvého neprázdneho bloku obsahu, čo zaručuje doručenie skôr, ako súpravy SDK zatvoria pripojenie.### Merged PRs

-**PR #512**(@zhangqiang8vip): Kompatibilita modelu podľa protokolu – `normalizeToolCallId` a `preserveOpenAIDeveloperRole` je teraz možné konfigurovať na klientsky protokol (OpenAI, Claude, Responses API). Nové pole `compatByProtocol` v konfigurácii modelu s overením Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: požadované informácie o PATH/verzii -**#509**— Regresia elektrónov Turbopack: chyba Next.js, zdokumentované riešenia
–**#508**– čierna obrazovka macOS: navrhované riešenie „--disable-gpu“---

## [2.9.0] — 2026-03-20

> Sprint: Oprava ID stroja naprieč platformami, limity rýchlosti na kľúče API, vyrovnávacia pamäť kontextu streamovania, Alibaba DashScope, analytika vyhľadávania, ZWS v5 a 8 problémov uzavretých.### ✨ New Features

-**feat(search)**: karta Analýza vyhľadávania v `/dashboard/analytics` – rozpis poskytovateľa, miera prístupov do vyrovnávacej pamäte, sledovanie nákladov. Nové API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(poskytovateľ)**: Alibaba Cloud DashScope pridaný s overením vlastnej cesty koncového bodu – konfigurovateľné `chatPath` a `modelsPath` pre každý uzol (#feat/custom-endpoint-paths) -**feat(api)**: Limity počtu žiadostí na kľúč API – stĺpce `max_requests_per_day` a `max_requests_per_minute` s presadzovaním posuvného okna v pamäti, ktoré vracia HTTP 429 (#452) -**feat(dev)**: ZWS v5 — oprava úniku HMR (485 pripojení DB → 1), pamäť 2,4 GB → 195 MB, singletony `globalThis`, oprava varovania Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Multiplatformové `machineId` — `getMachineIdRaw()` prepísané s vodopádom try/catch (Windows REG.exe → macOS ioreg → načítanie súboru Linux → názov hostiteľa → `os.hostname()`). Eliminuje vetvenie `process.platform`, ktoré eliminoval mŕtvy kód balíka Next.js, oprava `'head' nie je rozpoznaná` v systéme Windows. Tiež opravy #466. -**fix(#493)**: Vlastné pomenovanie modelu poskytovateľa – odstránené nesprávne odstraňovanie predpony v `DefaultExecutor.transformRequest()`, ktoré poškodilo ID modelov v rozsahu organizácie, ako je `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + ochrana kontextovej vyrovnávacej pamäte – `TransformStream` zachytí SSE a vloží značku `<omniModel>` pred značku `[DONE]`, čím umožní ochranu kontextovej vyrovnávacej pamäte pre odpovede streamovania. -**fix(#458)**: Validácia kombinovanej schémy – polia `system_message`, `tool_filter_regex`, `context_cache_protection` teraz prechádzajú overením Zod pri uložení. -**fix(#487)**: Vyčistenie karty KIRO MITM – odstránené ZWS_README, vygenerovaná karta „AntigravityToolCard“ na použitie dynamických metadát nástrojov.### 🧪 Tests

- Pridané testy filtračných jednotiek nástrojov v antropickom formáte (PR #397) – 8 regresných testov pre `tool.name` bez obalu `.function`
- Testovací balík:**821 testov, 0 zlyhaní**(nárast oproti 813)### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` nebol rozpoznaný (opravené)
–**#493**– Pomenovanie modelu vlastného poskytovateľa (pevné) -**#490**— Vyrovnávacia pamäť kontextu streamovania (opravené)
–**#452**– Limity požiadaviek na kľúč API (implementované) -**#466**— Zlyhanie prihlásenia do systému Windows (rovnaká hlavná príčina ako #506) -**#504**— MITM neaktívne (očakávané správanie) -**#462**— Gemini CLI PSA (vyriešené) -**#434**— Zlyhanie aplikácie Electron (duplikát #402)## [2.8.9] — 2026-03-20

> Sprint: Zlúčte komunitné PR, opravte kartu KIRO MITM, aktualizácie závislostí.### Merged PRs

-**PR #498**(@Sajid11194): Opravte zlyhanie ID počítača so systémom Windows (`undefined\REG.exe`). Nahrádza `node-machine-id` natívnymi dotazmi na registre OS.**Uzatvára #486.** -**PR #497**(@zhangqiang8vip): Opravte úniky prostriedkov HMR v režime vývojára – 485 uniknutých pripojení DB → 1, pamäť 2,4 GB → 195 MB. Singletons `globalThis`, oprava varovania Edge Runtime, stabilita testu Windows. (+1168/-338 cez 22 súborov) -**PR #499-503**(Dependabot): Aktualizácie akcií GitHub — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `-a`-a.`### Bug Fixes

-**#505**— Karta KIRO MITM teraz zobrazuje pokyny špecifické pre nástroj (`api.anthropic.com`) namiesto textu špecifického pre antigravitáciu. -**#504**— Odpovedalo sa objasnením používateľského prostredia (MITM „Neaktívne“ je očakávané správanie, keď proxy nie je spustená).---

## [2.8.8] — 2026-03-20

> Sprint: Opravte zlyhanie dávkového testu OAuth, pridajte tlačidlo „Testovať všetko“ na stránky jednotlivých poskytovateľov.### Bug Fixes

-**Zlyhanie dávkového testu OAuth**(ERR_CONNECTION_REFUSED): Nahradené sekvenčnou slučkou for s limitom súbežnosti 5 pripojení + časový limit 30 s na každé pripojenie cez `Promise.race()` + `Promise.allSettled()`. Zabraňuje zlyhaniu servera pri testovaní veľkých skupín poskytovateľov OAuth (~30+ pripojení).### Funkcie

-**Tlačidlo „Otestovať všetko“ na stránkach poskytovateľa**: Jednotlivé stránky poskytovateľov (napr. `/providers/codex`) teraz zobrazujú v hlavičke Pripojenia tlačidlo „Testovať všetko“, ak existujú viac ako 2 pripojenia. Používa `POST /api/providers/test-batch` s `{mode: "provider", providerId}`. Výsledky zobrazené v modálnom zobrazení so súhrnom úspešnosti/zlyhania a diagnózou podľa pripojenia.---

## [2.8.7] — 2026-03-20

> Sprint: Zlúčiť PR #495 (úzke miesto 429 drop), oprava #496 (vlastní poskytovatelia vkladania), funkcie triedenia.### Bug Fixes

-**Nekonečné čakanie na prekážku 429**(PR #495 od @xandr0s): Na 429, `limiter.stop({ dropWaitingJobs: true })` okamžite zlyhá vo všetkých požiadavkách vo fronte, takže volajúci môžu spustiť núdzový postup. Limiter je z mapy odstránený, takže ďalšia požiadavka vytvorí novú inštanciu. -**Nerozriešiteľné vlastné modely vkladania**(#496): `POST /v1/embeddings` teraz rieši vlastné modely vkladania zo VŠETKÝCH provider_nodes (nielen localhost). Umožňuje modely ako `google/gemini-embedding-001` pridané cez informačný panel.### Issues Responded

-**#452**— Limity počtu požiadaviek na kľúč API (potvrdené, v pláne)
–**#464**– Automatické vydávanie kľúčov API s limitmi poskytovateľa/účtu (vyžaduje viac podrobností) -**#488**— Automaticky aktualizovať zoznamy modelov (potvrdené, na pláne)
–**#496**– Vlastné rozlíšenie poskytovateľa vkladania (pevné)---

## [2.8.6] — 2026-03-20

> Sprint: Zlúčiť PR #494 (oprava roly MiniMax), opraviť dashboard KIRO MITM, vyriešiť 8 problémov.### Funkcie

-**MiniMax vývojár→oprava systémovej roly**(PR #494 od @zhangqiang8vip): Prepínač `preserveDeveloperRole` podľa modelu. Pridáva používateľské rozhranie „Kompatibilita“ na stránku poskytovateľov. Opravuje chybu 422 „role param error“ pre MiniMax a podobné brány. -**roleNormalizer**: `normalizeDeveloperRole()` teraz akceptuje parameter `preserveDeveloperRole` s trojstavovým správaním (undefined=ponechať, true=ponechať, false=konvertovať). -**DB**: Nové `getModelPreserveOpenAIDeveloperRole()` a `mergeModelCompatOverride()` v `models.ts`.### Bug Fixes

-**Panel KIRO MITM**(#481/#487): `CLIToolsPageClient` teraz nasmeruje akýkoľvek nástroj `configType: "mitm"` do `AntigravityToolCard` (ovládacie prvky MITM Start/Stop). Predtým bola napevno kódovaná iba antigravitácia.
–**Všeobecná karta AntigravityToolCard**: Namiesto pevne zakódovaných hodnôt Antigravity používa „tool.image“, „tool.description“, „tool.id“. Chráni pred chýbajúcimi „predvolenými modelmi“.### Cleanup

- Odstránené `ZWS_README_V2.md` (dokumenty určené len na vývoj z PR #494).### Issues Triaged (8)

-**#487**— Zatvorené (KIRO MITM opravené v tomto vydaní) -**#486**— potrebné informácie (problém s REG.exe PATH systému Windows)
–**#489**– informácie o potrebách (chýba ID antigravitačného projektu, je potrebné opätovné pripojenie OAuth)
–**#492**– informácie o potrebách (chýba app/server.js na chybne spravovanom uzle) -**#490**— Potvrdené (streamovanie + blokovanie kontextovej vyrovnávacej pamäte, plánovaná oprava)
–**#491**– Potvrdené (nekonzistentnosť stavu autorizácie kódu)
–**#493**– Potvrdené (predpona názvu modelu poskytovateľa modálneho poskytovateľa, poskytnuté riešenie)
–**#488**– Nevybavené žiadosti o funkcie (automatická aktualizácia zoznamov modelov)---

## [2.8.5] — 2026-03-19

> Sprint: Opravte streamy zombie SSE, kontextovú vyrovnávaciu pamäť prvého kola, KIRO MITM a externé problémy s triedením 5.### Bug Fixes

-**Zombie SSE Streams**(#473): Znížte `STREAM_IDLE_TIMEOUT_MS` z 300 s → 120 s pre rýchlejšiu kombinovanú návratnosť, keď poskytovatelia prestanú pracovať uprostred prúdu. Konfigurovateľné cez env var. -**Značka kontextovej vyrovnávacej pamäte**(#474): Oprava `injectModelTag()` na spracovanie požiadaviek prvého kola (žiadne správy asistenta) – ochrana kontextovej vyrovnávacej pamäte teraz funguje od úplne prvej odpovede. -**KIRO MITM**(#481): Zmeňte KIRO `configType` z `guide` → `mitm` tak, aby sa na prístrojovej doske zobrazovali ovládacie prvky MITM Start/Stop. -**E2E Test**(CI): Oprava `providers-bailian-coding-plan.spec.ts` — pred kliknutím na tlačidlo Pridať kľúč API zatvorte už existujúce modálne prekrytie.### Closed Issues

- #473 — Zombie SSE streamy obchádzajú záložnú kombináciu
- #474 — Pri prvom otočení chýba značka kontextovej vyrovnávacej pamäte `<omniModel>`
- #481 — MITM pre KIRO nie je možné aktivovať z palubnej dosky
- #468 — Vzdialený server Gemini CLI (nahradený #462 zastaraním)
- #438 — Claude nemôže zapisovať súbory (externý problém s CLI)
- #439 — AppImage nefunguje (zdokumentované riešenie libfuse2)
- #402 — ARM64 DMG "poškodený" (zdokumentované riešenie xattr -cr)
- #460 — CLI nie je možné spustiť v systéme Windows (dokumentovaná oprava PATH)---

## [2.8.4] — 2026-03-19

> Sprint: Ukončenie podpory Gemini CLI, oprava VM guide i18n, oprava zabezpečenia Dependabot, rozšírenie schémy poskytovateľa.### Funkcie

–**Ukončenie podpory Gemini CLI**(#462): Označte poskytovateľa „gemini-cli“ ako zastaraného s upozornením – Google obmedzuje používanie protokolu OAuth treťou stranou od marca 2026 -**Schéma poskytovateľa**(#462): Rozšírte overenie Zod o voliteľné polia `zastarané`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Pridajte `VM_DEPLOYMENT_GUIDE.md` do kanála prekladu i18n, vygenerujte všetkých 30 prekladov miestnych nastavení z anglického zdroja (zasekli sa v portugalčine)### Bezpečnosť

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — opravuje znečistenie prototypu CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regresia modelových aliasov (opravené vo verzii 2.8.2)
- #471 — Preklady príručky VM sú poškodené
- #483 — Koncové „údaje: null“ po „[DONE]“ (opravené vo verzii 2.8.3)### Merged PRs

- #484 — deps: náraz sploštený z 3.3.3 na 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: český i18n, oprava protokolu SSE, preklad sprievodcu VM.### Funkcie

-**Český jazyk**(#482): Plná čeština (cs) i18n — 22 dokumentov, 2606 reťazcov používateľského rozhrania, aktualizácie prepínača jazykov (@zen0bit) -**VM Deployment Guide**: Preložené z portugalčiny do angličtiny ako zdrojový dokument (@zen0bit)### Bug Fixes

–**SSE Protocol**(#483): Zastavenie odosielania koncových údajov: null po signáli „[DONE]“ – oprava „AI_TypeValidationError“ v striktných klientoch AI SDK (validátory založené na Zod)### Merged PRs

- #482 — Pridať český jazyk + opraviť VM_DEPLOYMENT_GUIDE.md zdroj v angličtine (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 zlúčené PR, oprava smerovania aliasov modelov, export protokolu a triedenie problémov.### Funkcie

-**Export denníka**: Nové tlačidlo Exportovať na stránke `/dashboard/logs` s rozbaľovacím zoznamom časového rozsahu (1 h, 6 h, 12 h, 24 h). Stiahne JSON denníkov request/proxy/call cez `/api/logs/export` API (#user-request)### Bug Fixes

-**Smerovanie aliasov modelov**(#472): Nastavenia → Aliasy modelov teraz správne ovplyvňujú smerovanie poskytovateľa, nielen zisťovanie formátu. Predtým sa výstup `resolveModelAlias()` používal iba pre `getModelTargetFormat()`, ale pôvodné ID modelu bolo odoslané poskytovateľovi -**Použitie vyprázdnenia streamu**(#480): Údaje o použití z poslednej udalosti SSE vo vyrovnávacej pamäti sa teraz správne extrahujú počas vyprázdnenia streamu (zlúčené z @prakersh)### Merged PRs

- #480 — Extrahujte využitie zo zostávajúcej vyrovnávacej pamäte v manipulátore splachovania (@prakersh)
  – #479 – Pridajte chýbajúce cenové položky Codex 5.3/5.4 a ID antropického modelu (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Päť komunitných PR – opravy protokolu o streamovaní hovorov, kompatibilita Kiro, analýza tokenov vyrovnávacej pamäte, čínsky preklad a konfigurovateľné ID hovorov nástrojov.### Funkcie

-**feat(logs)**: Obsah odpovedí denníka hovorov sa teraz správne zhromaždil z nespracovaných častí poskytovateľa (OpenAI/Claude/Gemini) pred prekladom, čím sa opravili prázdne užitočné zaťaženia v režime streamovania (#470, @zhangqiang8vip) -**feat(poskytovatelia)**: normalizácia ID volania nástroja s 9 znakmi, ktorá je konfigurovateľná pre každý model (v štýle Mistral) – skrátené ID získajú iba modely s povolenou možnosťou (#470) -**feat(api)**: Key PATCH API rozšírené o podporu polí `allowedConnections`, `name`, `autoResolve`, `isActive` a `accessSchedule` (#470) -**feat(dashboard)**: Rozloženie ako prvá odpoveď v používateľskom rozhraní podrobností denníka žiadostí (#470) -**feat(i18n)**: Vylepšený preklad do čínštiny (zh-CN) — úplný opätovný preklad (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Odstráňte vložené pole „model“ z tela žiadosti – Kiro API odmieta neznáme polia najvyššej úrovne (#478, @prakersh) -**fix(usage)**: Zahrňte tokeny na čítanie z vyrovnávacej pamäte + tokeny na vytvorenie vyrovnávacej pamäte do súčtu vstupu histórie používania na presnú analýzu (#477, @prakersh) -**fix(callLogs)**: Podpora polí používania formátu Claude (`input_tokens`/`output_tokens`) spolu s formátom OpenAI, zahŕňa všetky varianty tokenov vyrovnávacej pamäte (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Poskytovateľ Bailian Coding Plan s upraviteľnými základnými adresami URL, plus príspevky komunity pre Alibaba Cloud a Kimi Coding.### Funkcie

-**feat(providers)**: Pridaný plán kódovania Bailian (`bailian-coding-plan`) — Alibaba Model Studio s rozhraním API kompatibilným s Anthropic. Statický katalóg 8 modelov vrátane Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 a Kimi K2.5. Zahŕňa vlastné overenie overenia (400=platné, 401/403=neplatné) (#467, @Mind-Dragon) -**feat(admin)**: Upraviteľná predvolená adresa URL v postupoch vytvárania/úpravy správcu poskytovateľa – používatelia môžu nakonfigurovať vlastné základné adresy URL pre každé pripojenie. Pretrváva v `providerSpecificData.baseUrl` s overením schémy Zod, ktorá odmieta schémy bez http(s) (#467)### 🧪 Tests

- Pridaných 30+ testov jednotiek a 2 scenáre e2e pre poskytovateľa Bailian Coding Plan pokrývajúce overenie overenia, spevnenie schémy, správanie na úrovni trasy a integráciu medzi vrstvami---

## [2.7.10] — 2026-03-19

> Sprint: Dvaja noví poskytovatelia prispievaní komunitou (Alibaba Cloud Coding, Kimi Coding API-key) a Docker pino fix.### Funkcie

-**feat(providers)**: Pridaná podpora Alibaba Cloud Coding Plan s dvoma koncovými bodmi kompatibilnými s OpenAI – `alicode` (Čína) a `alicode-intl` (International), každý s 8 modelmi (#465, @dtk1985) -**feat(providers)**: Pridaná vyhradená cesta poskytovateľa `kimi-coding-apikey` – prístup Kimi Coding založený na kľúči API už nie je vynútený prostredníctvom `kimi-coding` cesty iba OAuth. Zahŕňa register, konštanty, API modelov, konfiguráciu a overovací test (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Do obrázku Docker bola pridaná chýbajúca závislosť `split2` — `pino-abstract-transport` ju vyžaduje za behu, ale nebola skopírovaná do samostatného kontajnera, čo spôsobilo pády `Nedá sa nájsť modul 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Natívne podporovaný prechod podcestou odpovedí kódexu, opravený pád Windows MITM a upravené schémy agentov Combo.### Funkcie

-**feat(codex)**: Natívny prechod podcestou odpovedí pre Codex – natívne smeruje `POST /v1/responses/compact` do Codexu upstream, pričom zachováva kompatibilitu Claude Code bez odstránenia prípony `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Schémy Zod (`updateComboSchema` a `createComboSchema`) teraz zahŕňajú `system_message`, `tool_filter_regex` a `context_cache_protection`. Opravuje chybu, pri ktorej boli nastavenia špecifické pre agenta vytvorené prostredníctvom dashboardu ticho zahodené vrstvou overenia backendu (#458) -**fix(mitm)**: Zlyhanie profilu Kiro MITM v systéme Windows opravené — `node-machine-id` zlyhalo kvôli chýbajúcemu env `REG.exe` a záložné riešenie vyvolalo fatálnu chybu `crypto is notdefined`. Záložný nástroj teraz bezpečne a správne importuje kryptomeny (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Chyba pri úspore rozpočtu + kombinované funkcie agenta UI + oprava zabezpečenia značky omniModel.### 🐛 Bug Fixes

–**fix(budget)**: „Save Limits“ už nevracia 422 – „warningThreshold“ sa teraz správne odosiela ako zlomok (0–1) namiesto percenta (0–100) (#451) -**fix(combos)**: interná značka vyrovnávacej pamäte `<omniModel>` je teraz odstránená pred preposielaním požiadaviek poskytovateľom, čo zabraňuje prerušeniu relácie vyrovnávacej pamäte (#454)### Funkcie

-**feat(combos)**: Sekcia funkcií agenta pridaná do kombinovaného režimu vytvárania/úpravy – odhaľte prepísanie `system_message`, `tool_filter_regex` a `context_cache_protection` priamo z hlavného panela (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Zlyhanie Docker pino, oprava odpovedí Codex CLI, synchronizácia uzamknutia balíka.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` a `pino-pretty` teraz explicitne skopírované vo fáze Docker runner – Samostatná stopa Next.js vynecháva tieto peer deps, čo spôsobuje zlyhanie `Cannot find module pino-abstract-transport` pri spustení (#449) -**fix(responses)**: Odstráňte `initTranlators()` z cesty `/v1/responses` – zlyhával pracovník Next.js s `pracovník skončil` uncaughtException on Codex CLI request (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` sa teraz aktivuje pri každom náraze verzie, aby sa zabezpečilo, že Docker `npm ci` bude používať presné verzie závislostí---

## [2.7.5] — 2026-03-18

> Sprint: Vylepšenia UX a oprava kontroly stavu Windows CLI.### 🐛 Bug Fixes

-**fix(ux)**: Zobraziť nápovedu k predvolenému heslu na prihlasovacej stránke – noví používatelia teraz uvidia `"Predvolené heslo: 123456"` pod zadaním hesla (#437) -**fix(cli)**: Claude CLI a ďalšie nástroje nainštalované v npm sa teraz správne detegujú ako spustiteľné v systéme Windows – spawn používa `shell:true` na riešenie obalov `.cmd` cez PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Panel nástrojov vyhľadávania, opravy i18n, limity Copilota, oprava overenia Serper.### Funkcie

-**feat(search)**: Pridanie vyhľadávacieho ihriska (10. koncový bod), stránka s nástrojmi na vyhľadávanie so stránkami Porovnania poskytovateľov/rerankovaním/históriou vyhľadávania, miestne prehodnocovacie smerovanie, auth guards vo vyhľadávacom API (#443 od @Regis-RCR)

- Nová trasa: `/dashboard/search-tools`
- Záznam na bočnom paneli v časti Ladenie
- `GET /api/search/providers` a `GET /api/search/stats` s ochranou autorizácie
- Lokálne smerovanie uzlov poskytovateľa pre `/v1/rerank`
- 30+ i18n kláves vo vyhľadávacom mennom priestore### 🐛 Bug Fixes

-**fix(search)**: Oprava normalizátora Brave news (vracal 0 výsledkov), vynútenie skrátenia max_results po normalizácii, oprava adresy URL načítania stránky koncových bodov (#443 od @Regis-RCR) -**fix(analytics)**: Lokalizácia štítkov dňa a dátumu v službe Analytics – nahraďte pevne zakódované portugalské reťazce reťazcom „Intl.DateTimeFormat(locale)“ (#444 od @hijak) -**fix(copilot)**: Správne zobrazenie typu účtu GitHub Copilot, filtrovanie zavádzajúcich riadkov s neobmedzenými kvótami z hlavného panela limitov (#445 od @hijak) -**fix(poskytovatelia)**: Zastavte odmietanie platných kľúčov Serper API – odpovede iné ako 4xx považujte za platné overenie (#446 od @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Oprava núdzovej kvóty priameho API kódu Codex.### 🐛 Bug Fixes

-**fix(codex)**: Blokovanie týždenne vyčerpaných účtov v priamom záložnom rozhraní API (#440)

- `resolveQuotaWindow()` zhoda s predponou: `"weekly"` teraz zodpovedá kľúčom vyrovnávacej pamäte `"weekly (7d)"`
- `applyCodexWindowPolicy()` presadzuje `useWeekly`/`use5h` správne prepína
- 4 nové regresné testy (celkom 766)---

## [2.7.2] — 2026-03-18

> Sprint: Opravuje kontrast používateľského rozhrania v režime Light.### 🐛 Bug Fixes

-**fix(logs)**: Oprava kontrastu svetelného režimu v tlačidlách filtra protokolov žiadostí a kombinovanom odznaku (#378)

- Tlačidlá Error/Success/Combo Filter sú teraz čitateľné vo svetlom režime
- Kombinovaný odznak používa silnejšiu fialovú v režime svetla---

## [2.7.1] — 2026-03-17

> Sprint: Zjednotené smerovanie vyhľadávania na webe (POST /v1/search) s 5 poskytovateľmi + bezpečnostné opravy Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Jednotné smerovanie vyhľadávania na webe – `POST /v1/search` s 5 poskytovateľmi (Serper, Brave, Perplexity, Exa, Tavily)

- Auto-failover medzi poskytovateľmi, 6 500+ bezplatných vyhľadávaní za mesiac
- Vyrovnávacia pamäť v pamäti so zlučovaním požiadaviek (konfigurovateľné TTL)
  – Informačný panel: karta Analýza vyhľadávania na stránke `/dashboard/analytics` s rozpisom poskytovateľov, mierou prístupov do vyrovnávacej pamäte a sledovaním nákladov
- Nové API: `GET /api/v1/search/analytics` pre štatistiku požiadaviek vyhľadávania
- Migrácia DB: stĺpec `request_type` v `call_logs` pre sledovanie žiadostí bez četu
- Overenie Zod (`v1SearchSchema`), overené, cena zaznamenaná prostredníctvom `recordCost()`### Bezpečnosť

-**deps**: Next.js 16.1.6 → 16.1.7 – opravuje 6 CVE: -**Kritické**: CVE-2026-29057 (pašovanie požiadaviek HTTP cez http-proxy) -**Vysoká**: CVE-2026-27977, CVE-2026-27978 (WebSocket + akcie servera) -**Stredné**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Súbor                                                            | Účel                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | --- |
| `open-sse/handlers/search.ts`                                    | Obslužný nástroj vyhľadávania so smerovaním 5 poskytovateľov |
| `open-sse/config/searchRegistry.ts`                              | Register poskytovateľov (autorizácia, cena, kvóta, TTL)      |
| `open-sse/services/searchCache.ts`                               | In-memory cache so zlučovaním požiadaviek                    |
| `src/app/api/v1/search/route.ts`                                 | Cesta Next.js (POST + GET)                                   |
| `src/app/api/v1/search/analytics/route.ts`                       | API štatistiky vyhľadávania                                  |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Karta hlavného panela Analytics                              |
| `src/lib/db/migrations/007_search_request_type.sql`              | Migrácia DB                                                  |
| `tests/unit/search-registry.test.mjs`                            | 277 riadkov jednotkových testov                              | --- |

## [2.7.0] — 2026-03-17

> Sprint: Funkcie inšpirované ClawRouterom – vlajka toolCalling, viacjazyčná detekcia zámerov, benchmarkom riadené núdzové riešenie, deduplikácia požiadaviek, zásuvná stratégia smerovača, ceny Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast – `0,20 USD/0,50 USD za 1 milión tokenov`, latencia 1143 ms p50, podporované volanie nástroja
–**feat (cena)**: xAI Grok-4 (štandard) – „0,20 $ / 1,50 $ za 1 milión tokenov“, hlavná loď -**feat(pricing)**: GLM-5 cez Z.AI – `0,5 $/1 milión`, 128K výstupný kontext
–**výkon (cena)**: MiniMax M2,5 – „vstup 0,30 $/1 milión“, uvažovanie + úlohy agenta
–**feat(pricing)**: DeepSeek V3.2 – aktualizovaná cena „0,27 $/1,10 $ za 1 milión“ -**feat(pricing)**: Kimi K2.5 cez Moonshot API – priamy prístup k Moonshot API -**feat(providers)**: Pridaný poskytovateľ Z.AI (alias `zai`) — rodina GLM-5 s výstupom 128K### 🧠 Routing Intelligence

-**feat(registry)**: príznak „toolCalling“ pre každý model v registri poskytovateľa – kombá teraz môžu uprednostňovať/vyžadovať modely s možnosťou volania nástrojov
–**feat(scoring)**: Viacjazyčná detekcia zámerov pre hodnotenie AutoCombo – PT/ZH/ES/AR skripty/jazykové vzory ovplyvňujú výber modelu podľa kontextu požiadavky -**feat(fallback)**: záložné reťazce riadené benchmarkom – údaje o skutočnej latencii (p50 z `comboMetrics`) používané na dynamickú zmenu poradia záložnej priority -**feat(dedup)**: Požiadajte o deduplikáciu prostredníctvom hash obsahu – 5-sekundové okno idempotencie zabraňuje opakovaným pokusom klientov o duplicitné volania poskytovateľa -**feat(router)**: Zapojiteľné rozhranie `RouterStrategy` v `autoCombo/routerStrategy.ts` — vlastnú logiku smerovania je možné vložiť bez úpravy jadra### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nové schémy pokročilých nástrojov: `omniroute_get_provider_metrics` (p50/p95/p99 na poskytovateľa) a `omniroute_explain_route` (vysvetlenie rozhodnutia o smerovaní)
–**feat(mcp)**: Aktualizované rozsahy autorizácie nástroja MCP – pre nástroje na meranie metrík poskytovateľa bol pridaný rozsah „metrics:read“ -**feat(mcp)**: `omniroute_best_combo_for_task` teraz akceptuje parameter `languageHint` pre viacjazyčné smerovanie### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` rozšírené o sledovanie percentilu latencie v reálnom čase na poskytovateľa/účet -**feat(health)**: Health API (`/api/monitoring/health`) teraz vracia polia `p50Latency` a `errorRate` podľa poskytovateľa -**feat(usage)**: Migrácia histórie používania na sledovanie latencie podľa modelu### 🗄️ DB Migrations

–**feat(migrations)**: Nový stĺpec „latency_p50“ v tabuľke „combo_metrics“ – nulové, bezpečné pre existujúcich používateľov### 🐛 Bug Fixes / Closures

-**close(#411)**: lepšie rozlíšenie hašovaného modulu sqlite3 v systéme Windows – opravené vo verzii 2.6.10 (f02c5b5)
–**zavrieť(#409)**: Dokončenie četu GitHub Copilot s modelmi Claude zlyhá pri priložení súborov – opravené vo verzii 2.6.9 (838f1d6) -**zavrieť(#405)**: Duplikát #411 – vyriešené## [2.6.10] — 2026-03-17

> Oprava systému Windows: predpripravené sťahovanie better-sqlite3 bez node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: V systéme Windows zlyhal `npm install -g omniroute` s `better_sqlite3.node` nie je platnou aplikáciou Win32, pretože pribalený natívny binárny súbor bol skompilovaný pre Linux. Pridáva**Stratégiu 1.5**do súboru `scripts/postinstall.mjs`: používa `@mapbox/node-pre-gyp install --fallback-to-build=false` (pribalený v rámci `better-sqlite3`) na stiahnutie správneho vopred zostaveného binárneho súboru pre aktuálny OS/arch bez potreby akýchkoľvek nástrojov na zostavovanie, node-node-gyp. Vráti sa späť na `npm rebuild` iba v prípade, že sťahovanie zlyhá. Pridáva chybové hlásenia špecifické pre platformu s jasnými pokynmi na manuálnu opravu.---

## [2.6.9] — 2026-03-17

> Opravy CI (t11 ľubovoľný rozpočet), oprava chyby č. 409 (prílohy súborov cez Copilot+Claude), oprava pracovného toku.### 🐛 Bug Fixes

-**fix(ci)**: Odstráňte slovo „any“ z komentárov v `openai-responses.ts` a `chatCore.ts`, ktoré neprešli kontrolou t11 `jakejkoľvek ` rozpočtu (falošne pozitívne z komentárov počítajúcich regulárny výraz) -**fix(chatCore)**: Normalizujte nepodporované typy častí obsahu pred preposlaním poskytovateľom (#409 — Kurzor odošle `{type:"file"}`, keď sú pripojené súbory `.md`; Copilot a iní poskytovatelia kompatibility s OpenAI odmietnu s "type musí byť buď 'image_url' alebo 'text 'text'`; fix a doc` text converts to' doc````doc`file'``; typy)### 🔧 Workflow

-**fuška (generate-release)**: Pridajte PRAVIDLO ATOMICKÉHO KOMITOVANIA – zmena verzie (`npm version patch`) MUSÍ nastať pred odovzdaním súborov funkcií, aby sa zabezpečilo, že značka vždy ukazuje na odovzdanie obsahujúce všetky zmeny verzie spolu---

## [2.6.8] — 2026-03-17

> Sprint: Combo ako agent (systémová výzva + filter nástrojov), ochrana kontextovej vyrovnávacej pamäte, automatická aktualizácia, podrobné protokoly, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE kombá ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0`
–**006_detailed_request_logs.sql**: Nová tabuľka „request_detail_logs“ so spúšťačom vyrovnávacej pamäte s 500 záznamami, aktivácia pomocou prepínača nastavení### Funkcie

-**feat(combo)**: Prepísanie systémovej správy na kombináciu (#399 – pole `system_message` nahrádza alebo vkladá systémovú výzvu pred preposlaním poskytovateľovi) -**feat(combo)**: Nástroj Filter Regex na kombináciu (#399 — `tool_filter_regex` uchováva iba nástroje zodpovedajúce vzoru; podporuje OpenAI + Antropické formáty) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` označí odpovede pomocou `<omniModel>poskytovateľa/modelu</omniModel>` a pripne model pre kontinuitu relácie) -**feat(settings)**: Automatická aktualizácia cez nastavenia (#320 — `GET /api/system/version` + `POST /api/system/update` — kontroluje register npm a aktualizácie na pozadí s reštartom pm2) -**feat(logs)**: Podrobné protokoly požiadaviek (#378 – zachytáva celé telesá kanálov v 4 fázach: požiadavka klienta, preložená požiadavka, odpoveď poskytovateľa, odpoveď klienta – prepínač opt-in, 64KB úprava, 500-vstupový ring-buffer) -**feat(mitm)**: Profil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` ciele api.anthropic.com, opätovne využíva existujúcu infraštruktúru MITM)---

## [2.6.7] — 2026-03-17

> Sprint: Vylepšenia SSE, rozšírenia lokálnych provider_nodes, proxy register, opravy Claude passthrough.### Funkcie

-**feat(health)**: Kontrola stavu na pozadí pre miestne uzly poskytovateľa s exponenciálnym stiahnutím (30 s → 300 s) a ,,Promise.allSettled`, aby sa zabránilo blokovaniu (#423, @Regis-RCR)
-**feat(embeddings)**: Smerujte `/v1/embeddings`do miestneho`provider_nodes`—`buildDynamicEmbeddingProvider()`s overením názvu hostiteľa (#422, @Regis-RCR)
-**feat(audio)**: Smerujte TTS/STT do miestneho uzla_poskytovateľa —`buildDynamicAudioProvider()` s ochranou SSRF (#416, @Regis-RCR) -**feat(proxy)**: Register proxy, rozhrania API na správu a zovšeobecnenie limitu kvót (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Odstráňte polia špecifické pre Clauda (`metadata`, `antropická_verzia`), keď je cieľom OpenAI-compat (#421, @prakersh) -**fix(sse)**: Extrahujte používanie Clauda SSE (`input_tokens`, `output_tokens`, cache tokeny) v režime priechodného streamu (#420, @prakersh) -**fix(sse)**: Generovanie záložného `call_id` pre volania nástrojov s chýbajúcimi/prázdnymi ID (#419, @prakersh) -**fix(sse)**: prechod Claude-to-Claude – telo dopredu úplne nedotknuté, bez opätovného prekladu (#418, @prakersh) -**fix(sse)**: Filtrujte osamotené položky `tool_result` po zhutnení kontextu Claude Code, aby ste sa vyhli 400 chybám (#417, @prakersh) -**fix(sse)**: Preskočte volania nástroja s prázdnym názvom v prekladači Responses API, aby ste zabránili nekonečným slučkám `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Pred prekladom odstráňte prázdne bloky obsahu textu (#427, @prakersh) -**fix(api)**: Pridajte `refreshable: true` do testovacej konfigurácie Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` a súvisiace závislosti devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Rýchla oprava: Kompatibilita Turbopack/Docker — odstráňte protokol `node:` zo všetkých importov `src/`.### 🐛 Bug Fixes

-**fix(build)**: Odstránená predpona protokolu „node:“ z príkazov „import“ v 17 súboroch pod „src/“. Importy `node:fs`, `node:path`, `node:url`, `node:os` atď. spôsobili, že v zostavách Turbopack (Next.js 15 Docker) a pri aktualizáciách zo starších globálnych inštalácií npm sa vyskytla chyba v súbore Ecmascript. Ovplyvnené súbory: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` a 12 ďalších v súboroch `src/app/api/` a `src/lib/`. -**fuška (pracovný postup)**: Aktualizované `generate-release.md`, aby sa synchronizácia Docker Hub a nasadenie duálneho VPS stali**povinnými**krokmi v každom vydaní.---

## [2.6.5] — 2026-03-17

> Sprint: filtrovanie parametrov modelu odôvodnenia, oprava lokálneho poskytovateľa 404, poskytovateľ Kilo Gateway, poklesy závislostí.### ✨ New Features

-**feat(api)**: Pridaný**Kilo Gateway**(`api.kilo.ai`) ako nový poskytovateľ kľúča API (alias `kg`) – 335+ modelov, 6 bezplatných modelov, 3 modely s automatickým smerovaním (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modely prechodu podporované prostredníctvom koncového bodu `/api/gateway/models`. (PR #408 od @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Odstráňte nepodporované parametre pre modely uvažovania (o1, o1-mini, o1-pro, o3, o3-mini). Modely v rodine `o1`/`o3` odmietajú `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` a `n` s HTTP 400. Parametre sú teraz odstránené na vrstve `Jadro chatu`. Používa deklaratívne pole `unsupportedParams` na model a vopred vypočítanú mapu O(1) na vyhľadávanie. (PR #412 od @Regis-RCR) -**fix(sse)**: Miestny poskytovateľ 404 má teraz za následok**blokovanie iba pre model (5 sekúnd)**namiesto blokovania na úrovni pripojenia (2 minúty). Keď lokálny inferenčný backend (Ollama, LM Studio, oMLX) vráti 404 pre neznámy model, pripojenie zostane aktívne a ostatné modely budú okamžite fungovať. Tiež opravuje už existujúcu chybu, pri ktorej nebol `model` odovzdaný `markAccountUnavailable()`. Lokálni poskytovatelia boli zistení prostredníctvom názvu hostiteľa (`localhost`, `127.0.0.1`, `::1`, rozšíriteľné prostredníctvom env var `LOCAL_HOSTNAMES`). (PR #410 od @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- "https-proxy-agent" 7 → 8
- „základňa agentov“ 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Odstránili sa neexistujúce názvy modelov u 5 poskytovateľov: -**gemini / gemini-cli**: odstránené `gemini-3.1-pro/flash` a `gemini-3-*-preview` (neexistujú v Google API v1beta); nahradené výrazmi „gemini-2.5-pro“, „gemini-2.5-flash“, „gemini-2.0-flash“, „gemini-1.5-pro/flash“ -**antigravitácia**: odstránené „gemini-3.1-pro-high/low“ a „gemini-3-flash“ (neplatné interné aliasy); nahradené skutočnými modelmi 2.x -**github (Copilot)**: odstránené „gemini-3-flash-preview“ a „gemini-3-pro-preview“; nahradené výrazom „gemini-2,5-flash“. -**nvidia**: opravený `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM používa menný priestor `meta/` pre modely Meta); pridané `nvidia/llama-3.1-70b-instruct` a `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Aktualizované `free-stack` combo na vzdialenej DB: odstránený `qw/qwen3-coder-plus` (vypršaný obnovovací token), opravený `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-lash`3`, opravený `mini-instruct`. `gemini/gemini-2.5-flash`, pridané `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip zapečený do zostavovacieho potrubia, pridaný syntetický poskytovateľ, opravená cesta VPS PM2.### 🐛 Bug Fixes

-**fix(build)**: Hash-strip Turbopack teraz beží v**čase kompilácie**pre VŠETKY balíky – nielen `better-sqlite3`. Krok 5.6 v `prepublish.mjs` prejde každý `.js` v `app/.next/server/` a odstráni 16-znakovú hexadecimálnu príponu zo všetkých hašovaných `require()`. Opravy `zod-dcb22c...`, `pino-...` atď. MODULE_NOT_FOUND pri globálnych inštaláciách npm. Zatvára #398 -**fix(deploy)**: PM2 na oboch VPS ukazovalo na zastarané adresáre git-clone. Prekonfigurované na `app/server.js` v globálnom balíku npm. Aktualizovaný pracovný postup `/deploy-vps` na použitie `npm pack + scp` (register npm odmieta 299 MB balíky).### Funkcie

-**feat(poskytovateľ)**: Syntetické ([syntetické.nové](https://syntetické.nové)) – odvodenie zamerané na ochranu súkromia kompatibilné s OpenAI. `passthroughModels: true` pre dynamický katalóg modelov HuggingFace. Počiatočné modely: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 od @Regis-RCR)### 📋 Issues Closed

-**zavrieť #398**: regresia hash npm – opravená hash-stripom v čase kompilácie v predbežnom zverejnení -**trieda #324**: Snímka obrazovky chyby bez krokov – požadované podrobnosti o reprodukcii---

## [2.6.2] — 2026-03-16

> Sprint: hašovanie modulov úplne opravené, 2 zlúčené PR (filter antropických nástrojov + vlastné cesty koncových bodov), pridaný poskytovateľ Alibaba Cloud DashScope, 3 zastarané problémy uzavreté.### 🐛 Bug Fixes

-**fix(build)**: Rozšírený hash-strip „externals“ webového balíka na pokrytie VŠETKÝCH „serverExternalPackages“, nielen „better-sqlite3“. Next.js 16 Turbopack hashuje `zod`, `pino` a každý ďalší balík z externého servera do názvov ako `zod-dcb22c6336e0bc69`, ktoré v `node_modules` za behu neexistujú. HASH_PATTERN regex catch-all teraz odstráni 16-znakovú príponu a vráti sa späť k základnému názvu balíka. Tiež pridané `NEXT_PRIVATE_BUILD_WORKER=0` v `prepublish.mjs` na posilnenie režimu webového balíka, plus skenovanie po zostavení, ktoré hlási všetky zostávajúce hašované odkazy. (#396, #398, PR #403) -**fix(chat)**: Názvy nástrojov v antropickom formáte (`tool.name` bez obalu `.function`) boli potichu vypustené filtrom prázdnych mien zavedeným v #346. LiteLLM proxy požiadavky s predponou `antropický/` vo formáte API pre Antropické správy, čo spôsobí, že všetky nástroje budú filtrované a Anthropic vráti `400: tool_choice.any môže byť špecifikovaný iba pri poskytovaní nástrojov`. Opravené návratom k `tool.name`, keď `tool.function.name` chýba. Pridaných 8 testov regresných jednotiek. (PR #397)### Funkcie

-**feat(api)**: Vlastné cesty koncových bodov pre uzly poskytovateľa kompatibilné s OpenAI – nakonfigurujte `chatPath` a `modelsPath` pre každý uzol (napr. `/v4/chat/completions`) v používateľskom rozhraní pripojenia poskytovateľa. Zahŕňa migráciu DB (`003_provider_node_custom_paths.sql`) a dezinfekciu adresy URL (bez prechodu `..`, musí začínať znakom `/`). (PR #400) -**feat(poskytovateľ)**: Alibaba Cloud DashScope bol pridaný ako poskytovateľ kompatibilný s OpenAI. Medzinárodný koncový bod: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modelov: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Nosný kľúč API.### 📋 Issues Closed

-**zavrieť #323**: Chyba pripojenia Cline `[object Object]` – opravená vo verzii 2.3.7; inštruovaný užívateľ na upgrade z verzie 2.2.9 -**close #337**: Sledovanie kreditu Kiro – implementované vo verzii 2.5.5 (#381); presmerovaný používateľ na Dashboard → Použitie -**triage #402**: ARM64 macOS DMG poškodený – požadovaná verzia macOS, presná chyba a odporúčané riešenie `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Zásadná oprava spúšťania: Globálne inštalácie npm v2.6.0 zlyhali s chybou 500 kvôli chybe hashovania názvu modulu Turbopack/webpack v nástroji Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Vynútite, aby sa slovo `better-sqlite3` vždy vyžadovalo presným názvom balíka v balíku servera webpack. Next.js 16 skompiloval inštrumentačný hák do samostatného bloku a vygeneroval `require('better-sqlite3-<hash>')` — názov hashovaného modulu, ktorý neexistuje v `node_modules` — aj keď bol balík uvedený v `serverExternalPackages`. Do konfigurácie webpacku servera bola pridaná explicitná funkcia `externals`, takže bundler vždy vydáva `require('better-sqlite3')`, čím sa vyrieši spustenie `500 Internal Server Error` pri čistých globálnych inštaláciách. (#394, PR #395)### 🔧 CI

-**ci**: Pridané `workflow_dispatch` do `npm-publish.yml` so zabezpečením synchronizácie verzie pre manuálne spúšťače (#392) -**ci**: Pridané `workflow_dispatch` do `docker-publish.yml`, aktualizované akcie GitHub na najnovšie verzie (#392)---

## [2.6.0] - 2026-03-15

> Sprint riešenia problémov: 4 opravené chyby, vylepšené UX protokolov, pridané sledovanie kreditu Kiro.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI a SD WebUI sa už nezobrazujú v zozname poskytovateľov stránky Media, keď nie sú nakonfigurované – načítava `/api/providers` pri pripojení a skryje miestnych poskytovateľov bez pripojenia (#390) -**fix(auth)**: Round-robin už nevyberá účty s obmedzenou rýchlosťou ihneď po vychladnutí – `backoffLevel` sa teraz používa ako primárny kľúč triedenia v rotácii LRU (#340) -**fix(oauth)**: Qoder (a ďalší poskytovatelia, ktorí presmerujú na svoje vlastné používateľské rozhranie) už nenechajú modálny protokol OAuth uviaznutý na „čakaní na autorizáciu“ – automatické prepnutie detektora so zatvoreným kontextovým oknom do režimu manuálneho zadávania adresy URL (#344) -**fix(logs)**: Tabuľka denníka žiadostí je teraz čitateľná v svetlom režime – stavové odznaky, počty tokenov a kombinované značky používajú adaptívne triedy farieb „tmavé:“ (#378)### Funkcie

-**feat(kiro)**: Sledovanie kreditu Kiro pridané do nástroja na získanie údajov o používaní – dopyty „getUserCredits“ z koncového bodu AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)**: Zarovnané `test:plan3`, `test:fixes`, `test:security` na použitie rovnakého zavádzača `tsx/esm` ako `npm test` – eliminuje falošné negatívy rozlíšenia modulu v cielených sériách (PR #386)---

## [2.5.9] - 2026-03-15

> Oprava natívneho priechodu Codex + spevnenie validácie tela trasy.### 🐛 Bug Fixes

-**fix(codex)**: Zachovanie natívneho prechodu rozhrania Responses API pre klientov Codexu – zabraňuje zbytočným prekladovým mutáciám (PR #387) -**fix(api)**: Overenie tiel žiadostí na trasách cien/synchronizácie a smerovania úloh – predchádza zlyhaniu v dôsledku chybne vytvorených vstupov (PR #388) -**fix(auth)**: Tajomstvá JWT pretrvávajú počas reštartov cez `src/lib/db/secrets.ts` — eliminuje chyby 401 po reštarte pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Oprava zostavy: obnovenie pripojenia VPS prerušené neúplným zverejnením verzie 2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` stále používa zastaraný príznak `--webpack`, čo spôsobuje, že samostatná zostava Next.js ticho zlyhá – npm publish sa dokončil bez `app/server.js`, čo prerušuje nasadenie VPS---

## [2.5.7] - 2026-03-15

> Opravy spracovania chýb mediálneho ihriska.### 🐛 Bug Fixes

–**fix(media)**: Prepis „Vyžaduje sa kľúč API“ je falošne pozitívny, keď zvuk neobsahuje žiadnu reč (hudba, ticho) – teraz sa namiesto toho zobrazuje „Nebola rozpoznaná žiadna reč“ -**fix(media)**: `upstreamErrorResponse` v `audioTranscription.ts` a `audioSpeech.ts` teraz vracia správny JSON (`{error:{message}}`), čím umožňuje správne zisťovanie chyby poverení 401/403 v MediaPageClient -**fix(media)**: `parseApiError` teraz spracováva pole `err_msg` Deepgramu a zisťuje `"kľúč api"` v chybových správach pre presnú klasifikáciu chýb poverení---

## [2.5.6] - 2026-03-15

> Kritické opravy zabezpečenia/autorizácie: Antigravity OAuth nefunkčné + relácie JWT stratené po reštarte.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth teraz správne odosiela `client_secret` do koncového bodu tokenu. Záložnou možnosťou pre „ANTIGRAVITY_OAUTH_CLIENT_SECRET“ bol prázdny reťazec, čo je nepravdivé – takže „client_secret“ nebol nikdy zahrnutý do požiadavky, čo spôsobilo chyby „client_secret is missing““ pre všetkých používateľov bez vlastnej var. prostredia. Zatvára #383. -**fix(auth) #385**: `JWT_SECRET` sa teraz uchováva v SQLite (`namespace='secrets'`) pri prvej generácii a znova sa načítava pri ďalších štartoch. Predtým sa pri každom spustení procesu generoval nový náhodný tajný kľúč, ktorý po každom reštarte alebo inovácii zrušil platnosť všetkých existujúcich súborov cookie/relácií. Ovplyvňuje „JWT_SECRET“ aj „API_KEY_SECRET“. Zatvára #382.---

## [2.5.5] - 2026-03-15

> Oprava vymazania zoznamu modelov, spevnenie samostatnej zostavy Electron a sledovanie kreditu Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` teraz zahŕňa aliasy poskytovateľa pri vytváraní filtra aktívnych poskytovateľov – modely pre `claude` (alias `cc`) a `github` (alias `gh`) sa vždy zobrazovali bez ohľadu na to, či bolo pripojenie nakonfigurované, pretože kľúče `PROVIDER_MODELses` providera sú uložené pod aliasmi poskytovateľov. Opravené rozšírením každého aktívneho ID poskytovateľa tak, aby zahŕňalo aj jeho alias prostredníctvom PROVIDER_ID_TO_ALIAS. Zatvára číslo 353. -**fix(electron) #379**: Nový `scripts/prepare-electron-standalone.mjs` pred balením elektrónov uvádza špeciálny balík `/.next/electron-standalone`. Preruší sa s jasnou chybou, ak `node_modules` je symbolický odkaz (elektrónový zostavovateľ by dodal runtime závislosť na zostavovacom stroji). Dezinfekcia ciest naprieč platformami prostredníctvom `path.basename`. Autor: @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Sledovanie zostatku kreditu Kiro – koncový bod používania teraz vracia kreditné údaje pre účty Kiro volaním `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (rovnaký koncový bod, ktorý Kiro IDE používa interne). Vráti zostávajúce kredity, celkový limit, dátum obnovenia a úroveň predplatného. Zatvára #337.## [2.5.4] - 2026-03-15

> Oprava spustenia Logger, oprava zabezpečenia bootstrapu prihlásenia a zlepšenie spoľahlivosti HMR pre vývojárov. Spevnená infraštruktúra CI.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Obnovenie cesty zapisovača transportu pino – pino zamietne `formatters.level` v kombinácii s `transport.targets`. Konfigurácie podporované transportom teraz odstránia formátovač úrovne pomocou `getTransportCompatibleConfig()`. Tiež opravuje numerické mapovanie úrovní v `/api/logs/console`: `30→info, 40→varovať, 50→chyba` (bolo posunuté o jeden). -**fix(login) #375**: Prihlasovacia stránka sa teraz zavádza z verejného koncového bodu `/api/settings/require-login` namiesto chráneného `/api/settings`. V nastaveniach chránených heslom stránka predbežného overenia dostávala 401 a zbytočne sa vracala k bezpečným predvoleným nastaveniam. Verejná cesta teraz vracia všetky metaúdaje zavádzacieho systému (`requireLogin`, `hasPassword`, `setupComplete`) s konzervatívnou 200 núdzovou chybou. -**fix(dev) #374**: Pridajte `localhost` a `127.0.0.1` do `allowedDevOrigins` v `next.config.mjs` — HMR websocket bol zablokovaný pri prístupe k aplikácii cez adresu spätnej slučky, čo vytváralo opakované varovania krížového pôvodu.### 🔧 CI & Infrastructure

-**ESLint OOM oprava**: `eslint.config.mjs` teraz ignoruje `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` a `clipr/**` – ESLint havaroval s hromadou JS OOM skenovaním kódu VS blochbs a kompiláciou blochbs. -**Oprava testu jednotky**: Odstránené zastarané `ALTER TABLE provider_connections ADD COLUMN "group"` z 2 testovacích súborov — stĺpec je teraz súčasťou základnej schémy (pridaný v #373), čo spôsobuje `SQLITE_ERROR: duplicitný názov stĺpca` pri každom spustení CI. -**Pre-commit hook**: Pridané `npm run test:unit` do `.husky/pre-commit` — testy jednotiek teraz blokujú nefunkčné odovzdania skôr, ako dosiahnu CI.## [2.5.3] - 2026-03-14

> Kritické opravy chýb: migrácia schémy databázy, načítanie prostredia pri spustení, vymazanie chybového stavu poskytovateľa a oprava popisu nástroja i18n. Zlepšenie kvality kódu nad každým PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Pridanie stĺpca `provider_connections.group` do základnej schémy + migrácia záložných zdrojov pre existujúce databázy – stĺpec bol použitý vo všetkých dotazoch, ale chýbal v definícii schémy -**fix(i18n) #371**: Nahradiť neexistujúci kľúč `t("deleteConnection")` existujúcim kľúčom `providers.delete` — opravuje chybu runtime `MISSING_MESSAGE: providers.deleteConnection` na stránke s podrobnosťami o poskytovateľovi -**fix(auth) #372**: Vymažte zastarané metadáta chyby (`errorCode`, `lastErrorType`, `lastErrorSource`) z účtov poskytovateľa po skutočnom obnovení – predtým sa obnovené účty zobrazovali ako neúspešné -**fix(startup) #369**: Zjednoťte načítavanie env cez `npm run start`, `run-standalone.mjs` a Electron tak, aby rešpektovala prioritu `DATA_DIR/.env → ~/.omniroute/.env → ./.env` – zabraňuje vygenerovaniu novej `STORAGE_KEY`` s overcrypted databázou### 🔧 Code Quality

- Zdokumentované vzory `result.success` vs `response?.ok` v `auth.ts` (oba zámerné, teraz vysvetlené)
- Normalizované `overridePath?.trim()` v `electron/main.js` tak, aby zodpovedalo `bootstrap-env.mjs`
- Pridaný komentár k objednávke zlúčenia `preferredEnv` pri spustení Electron

> Zásady kvót účtu Codex s automatickým otáčaním, rýchlym prepínaním vrstiev, modelom gpt-5.4 a opravou štítkov analytiky.### ✨ New Features (PRs #366, #367, #368)

-**Zásady kvóty Codex (PR #366)**: Okno kvóty 5 hodín/týždeň pre každý účet sa prepína na informačnom paneli poskytovateľa. Účty sa automaticky preskočia, keď povolené okná dosiahnu hranicu 90 % a po „resetAt“ sa znova prijmú. Zahŕňa `quotaCache.ts` s funkciou získavania stavu bez vedľajších účinkov. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Settings → Codex Service Tier. Predvolene vypnutý prepínač vkladá `service_tier: "flex"` iba pre požiadavky kódexu, čím sa znížia náklady ~80%. Úplný zásobník: karta používateľského rozhrania + koncový bod API + vykonávateľ + prekladač + obnovenie spustenia. -**model gpt-5.4 (PR #368)**: Do registra modelov kódexu sa pridávajú `cx/gpt-5.4` a `codex/gpt-5.4`. Vrátane regresného testu.### 🐛 Bug Fixes

-**oprava #356**: Grafy služby Analytics (Najlepší poskytovateľ, Podľa účtu, Rozdelenie poskytovateľov) teraz zobrazujú ľudsky čitateľné mená/štítky poskytovateľov namiesto nespracovaných interných ID poskytovateľov kompatibilných s OpenAI.

> Hlavné vydanie: stratégia striktného náhodného smerovania, riadenie prístupu kľúča API, skupiny pripojení, externá synchronizácia cien a opravy kritických chýb pre modely myslenia, kombinované testovanie a overenie názvov nástrojov.### ✨ New Features (PRs #363 & #365)

-**Stratégia prísneho náhodného smerovania**: Fisher-Yates shuffle deck so zárukou proti opakovaniu a serializáciou mutex pre súbežné požiadavky. Nezávislé balíčky na kombináciu a na poskytovateľa. -**Ovládanie prístupu pomocou kľúča API**: `allowedConnections` (obmedzuje, ktoré pripojenia môže kľúč používať), `is_active` (aktivuje/zakazuje kľúč s 403), `accessSchedule` (riadenie prístupu na základe času), prepínanie `autoResolve`, premenovanie kľúčov pomocou PATCH. -**Skupiny pripojení**: Zoskupte pripojenia poskytovateľov podľa prostredia. Akordeónové zobrazenie na stránke Limity so stálosťou localStorage a inteligentným automatickým prepínačom. -**Externá synchronizácia cien (LiteLLM)**: 3-úrovňové rozlíšenie cien (prepíše používateľ → synchronizované → predvolené). Prihláste sa cez `PRICING_SYNC_ENABLED=true`. Nástroj MCP „omniroute_sync_pricing“. 23 nových testov. -**i18n**: 30 jazykov aktualizovaných pomocou stratégie striktného náhodného výberu, reťazcov správy kľúčov API. pt-BR úplne preložené.### 🐛 Bug Fixes

-**oprava #355**: Časový limit nečinnosti streamu sa zvýšil zo 60 s na 300 s – zabraňuje prerušeniu modelov predĺženého myslenia (claude-opus-4-6, o3 atď.) počas dlhých fáz uvažovania. Konfigurovateľné prostredníctvom „STREAM_IDLE_TIMEOUT_MS“. -**oprava #350**: Kombinovaný test teraz obchádza `REQUIRE_API_KEY=true` pomocou internej hlavičky a univerzálne používa formát kompatibilný s OpenAI. Časový limit predĺžený z 15 s na 20 s. -**oprava #346**: Nástroje s prázdnym `function.name` (poslané kódom Claude) sú teraz filtrované skôr, ako ich prijmú upstream poskytovatelia, čím sa zabráni chybám „Neplatný vstup[N].name: prázdny reťazec“.### 🗑️ Closed Issues

-**#341**: Sekcia ladenia bola odstránená – nahradenie je `/dashboard/logs` a `/dashboard/health`.

> Podpora API Key Round-Robin pre nastavenia poskytovateľa s viacerými kľúčmi a potvrdenie smerovania zástupných znakov a rolovania okna kvóty, ktoré je už na mieste.### ✨ New Features

-**API Key Round-Robin (T07)**: Pripojenia poskytovateľa môžu teraz obsahovať viacero kľúčov API (Upraviť pripojenie → Extra kľúče API). Požiadavky sa striedajú medzi primárnymi a extra kľúčmi prostredníctvom `providerSpecificData.extraApiKeys[]`. Kľúče sa uchovávajú v pamäti indexované pre každé pripojenie – nie sú potrebné žiadne zmeny schémy databázy.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` s porovnávaním zástupných znakov v štýle glob (`gpt*`, `claude-?-sonnet` atď.) je už integrovaný do `model.ts` s klasifikáciou špecifickosti. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` už automaticky posúva okno dopredu — ak `Date.now() > entry.until`, zámok sa okamžite vymaže (bez zastaraného blokovania).

> Vylepšenie používateľského rozhrania, pridanie stratégie smerovania a elegantné spracovanie chýb pre limity použitia.### ✨ New Features

-**Fill-First & P2C Routing Strategies**: Pridané „fill-first“ (vyčerpať kvótu pred pokračovaním) a „p2c“ (výber s nízkou latenciou výkonu dvoch možností) do kombinovaného výberu stratégie s úplnými navádzacími panelmi a farebne označenými odznakmi. -**Prednastavené modely bezplatného zásobníka**: Vytvorenie komba pomocou šablóny bezplatného zásobníka teraz automaticky vyplní 7 najlepších bezplatných modelov poskytovateľov vo svojej triede (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Používatelia jednoducho aktivujú poskytovateľov a hneď po vybalení získajú kombináciu 0 USD/mesiac. -**Širší Combo Modal**: Kombinovaný modal Create/Edit teraz používa `max-w-4xl` na pohodlnú úpravu veľkých komb.### 🐛 Bug Fixes

-**Stránka limitov HTTP 500 pre Codex a GitHub**: `getCodexUsage()` a `getGitHubUsage()` teraz vracajú užívateľsky prívetivú správu, keď poskytovateľ vráti 401/403 (ukončená platnosť tokenu), namiesto toho, aby vyvolali chybu 500 na stránke Limits. -**MaintenanceBanner false-positive**: Banner už pri načítaní stránky falošne nezobrazuje „Server je nedostupný“. Opravené volaním `checkHealth()` ihneď po pripojení a odstránením zastaraného uzáveru `show`-state. -**Popisky ikony poskytovateľa**: Tlačidlá ikon úprav (ceruzka) a vymazania v riadku pripojenia poskytovateľa teraz obsahujú natívne popisy HTML – všetkých 6 ikon akcií je teraz samo zdokumentovaných.

> Viacero vylepšení od analýzy problémov komunity, podpora nových poskytovateľov, opravy chýb pri sledovaní tokenov, smerovanie modelov a spoľahlivosť streamovania.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatický výber modelu na základe typu obsahu požiadavky — kódovanie → deepseek-chat, analýza → gemini-2.5-pro, vízia → gpt-4o, sumarizácia → gemini-2.5-flash. Konfigurovateľné cez Nastavenia. Nové API `GET/PUT/POST /api/settings/task-routing`. -**HuggingFace Provider**: Pridaný HuggingFace Router ako poskytovateľ kompatibilný s OpenAI s Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: Pridaný poskytovateľ Vertex AI (Google Cloud) s Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude cez Vertex. -**Odovzdávanie súborov na ihrisku**: Nahrávanie zvuku na prepis, nahrávanie obrázkov pre modely videnia (automatická detekcia podľa názvu modelu), vykresľovanie obrázkov vložené do výsledkov generovania obrázkov. -**Vizuálna spätná väzba výberu modelu**: Už pridané modely v kombinovanom výbere teraz zobrazujú ✓ zelený odznak – zabraňuje duplicitnej zámene. -**Kompatibilita Qwen (PR #352)**: Aktualizované nastavenia odtlačkov prstov User-Agent a CLI pre kompatibilitu poskytovateľa Qwen. -**Round-Robin State Management (PR #349)**: Vylepšená kruhová logika na spracovanie vylúčených účtov a správne udržiavanie stavu rotácie. -**Clipboard UX (PR #360)**: Spevnené operácie so schránkou s záložným riešením pre nezabezpečené kontexty; Vylepšenia normalizácie nástroja Claude.### 🐛 Bug Fixes

-**Oprava #302 — OpenAI SDK stream=False drops tool_calls**: T01 Akceptovať vyjednávanie hlavičky už nevynucuje streamovanie, keď je „body.stream“ explicitne „false“. Spôsoboval tiché rušenie tool_calls pri použití OpenAI Python SDK v režime bez streamovania. -**Oprava #73 – Claude Haiku smerovaný do OpenAI bez predpony poskytovateľa**: Modely `claude-*` odoslané bez predpony poskytovateľa teraz správne smerujú k poskytovateľovi `antigravity` (Anthropic). Pridaná aj heuristika `gemini-*`/`gemma-*` → `gemini`. -**Oprava #74 — Token počíta vždy 0 pre Antigravity/Claude streaming**: Udalosť `message_start` SSE, ktorá nesie `input_tokens`, nebola analyzovaná pomocou `extractUsage()`, čo spôsobilo pokles počtu vstupných tokenov. Sledovanie vstupných/výstupných tokenov teraz funguje správne pre odpovede na streamovanie. -**Oprava č. 180 – Duplikáty importu modelu bez spätnej väzby**: „ModelSelectModal“ teraz zobrazuje ✓ zelené zvýraznenie modelov, ktoré už sú v kombinácii, čím je zrejmé, že sú už pridané. -**Chyby generovania mediálnej stránky**: Výsledky obrázkov sa teraz vykresľujú ako značky `<img>` namiesto nespracovaného JSON. Výsledky prepisu sa zobrazia ako čitateľný text. Chyby poverení zobrazujú namiesto tichého zlyhania žltý banner. -**Tlačidlo obnovenia tokenu na stránke poskytovateľa**: Používateľské rozhranie na manuálne obnovenie tokenu bolo pridané pre poskytovateľov OAuth.### 🔧 Improvements

-**Register poskytovateľov**: HuggingFace a Vertex AI pridané do `providerRegistry.ts` a `providers.ts` (frontend). -**Vyrovnávacia pamäť čítania**: Nový súbor `src/lib/db/readCache.ts` pre efektívne ukladanie do vyrovnávacej pamäte na čítanie z databázy. -**Vyrovnávacia pamäť kvót**: Vylepšená vyrovnávacia pamäť kvót s vysťahovaním na základe TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Súbor                                         | Účel                                        |
| --------------------------------------------- | ------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logika smerovania podľa úloh (7 typov úloh) |
| `src/app/api/settings/task-routing/route.ts`  | API konfigurácie smerovania úloh            |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuálne obnovenie tokenu OAuth             |
| `src/lib/db/readCache.ts`                     | Efektívna vyrovnávacia pamäť na čítanie DB  |
| `src/shared/utils/clipboard.ts`               | Tvrdená schránka s záložným                 | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Kombinovaný modálny: Voľný zásobník je viditeľný a výrazný**– Šablóna voľného zásobníka bola skrytá (štvrtá v 3-stĺpcovej mriežke). Opravené: presunuté na pozíciu 1, prepnuté na mriežku 2x2, takže sú viditeľné všetky 4 šablóny, zelený okraj + zvýraznenie odznaku ZDARMA.## [2.4.0] - 2026-03-13

> **Hlavné vydanie**– Ekosystém bezplatného zásobníka, prepracovanie ihriska na prepis, viac ako 44 poskytovateľov, komplexná bezplatná dokumentácia a vylepšenia používateľského rozhrania vo všetkých oblastiach.### Funkcie

-**Kombiná: Šablóna bezplatného zásobníka**— Nová štvrtá šablóna „Bezplatný balík (0 USD)“ s použitím kruhového výberu medzi Kiro + Qoder + Qwen + Gemini CLI. Pri prvom použití navrhuje vopred zostavenú kombináciu s nulovými nákladmi. -**Médiá/prepis: Deepgram ako predvolený**– Deepgram (Nova 3, 200 USD zadarmo) je teraz predvoleným poskytovateľom prepisu. AssemblyAI (50 USD zadarmo) a Groq Whisper (zadarmo navždy) zobrazené s bezplatnými kreditnými odznakmi. -**README: Sekcia „Začať zadarmo“**– Nová 5-kroková tabuľka v úvodnom súbore README, ktorá ukazuje, ako nastaviť AI s nulovými nákladmi za pár minút. -**README: Free Transscription Combo**— Nová sekcia s návrhom kombinácie Deepgram/AssemblyAI/Groq a podrobnosťami o bezplatnom kredite na poskytovateľa. -**providers.ts: hasFree flag**– NVIDIA NIM, Cerebras a Groq označené odznakom hasFree a freeNote pre používateľské rozhranie poskytovateľa. -**i18n: templateFreeStack keys**— Bezplatná kombinovaná šablóna Stack preložená a synchronizovaná do všetkých 30 jazykov.## [2.3.16] - 2026-03-13

### Dokumentácia

–**README: Poskytovatelia 44+**– Aktualizované všetky 3 výskyty „poskytovateľov 36+“ na „44+“, čo odráža skutočný počet kódov (44 poskytovateľov v providers.ts) -**README: Nová sekcia "🆓 Bezplatné modely — Čo vlastne dostanete"**— Pridaná tabuľka so 7 poskytovateľmi s limitmi sadzieb pre každý model pre: Kiro (Claude neobmedzene cez AWS Builder ID), Qoder (5 modelov neobmedzene), Qwen (4 modely neobmedzene), Gemini CLI (180 000/mes.), NVIDIA NIM (~40 ot./min. 60 000 TPM), Groq (30 RPM / 14,4 000 RPD). Zahŕňa odporúčanie kombinácie \/usr/bin/bash Ultimate Free Stack.
–**README: Cenová tabuľka aktualizovaná**– Pridaný Cerebras do úrovne API KEY, opravená NVIDIA z „1000 kreditov“ na „dev-forever free“, aktualizované počty a názvy modelov Qoder/Qwen -**README: Modely Qoder 8→5**(s názvom: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 modely**(s názvom: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funkcie

-**Hlavný panel automatického kombinovania (priorita úrovne)**: Pridaný `🏷️ Tier` ako 7. štítok faktora hodnotenia v zobrazení rozdelenia faktorov `/dashboard/auto-combo` – všetkých 7 faktorov hodnotenia Auto-Combo je teraz viditeľných. -**i18n — sekcia autoCombo**: Do všetkých 30 jazykových súborov bolo pridaných 20 nových prekladových kľúčov pre dashboard Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority` atď.).## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Obnovil sa platný predvolený `clientSecret` – predtým bol prázdny reťazec, čo spôsobovalo „zlé poverenia klienta“ pri každom pokuse o pripojenie. Verejné poverenia sú teraz predvoleným záložným kódom (dá sa prepísať cez env var `QODER_OAUTH_CLIENT_SECRET`). -**Server MITM sa nenašiel (#335)**: `prepublish.mjs` teraz kompiluje `src/mitm/*.ts` do JavaScriptu pomocou `tsc` pred skopírovaním do balíka npm. Predtým sa kopírovali iba nespracované súbory `.ts` – čo znamená, že `server.js` nikdy neexistoval v globálnych inštaláciách npm/Volta. -**GeminiCLI chýba projectId (#338)**: Namiesto vypísania tvrdej chyby 500, keď v uložených povereniach chýba `projectId` (napr. po reštarte Docker), OmniRoute teraz zaznamená varovanie a pokúsi sa o požiadavku – namiesto zlyhania OmniRoute vráti zmysluplnú chybu na strane poskytovateľa. -**Nesúlad elektronickej verzie (#323)**: Synchronizovaná verzia `electron/package.json` s `2.3.13` (bola `2.0.13`), takže binárna verzia pre stolné počítače sa zhoduje s balíkom npm.### ✨ New Models (#334)

–**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Skóre úrovne (API + Validácia)**: Pridaná hodnota „tierPriority“ (váha „0,05“) do schémy Zod „ScoringWeights“ a cesty API „combos/auto“ – 7. bodový faktor je teraz plne akceptovaný REST API a overený na vstupe. Váha „stability“ upravená z „0,10“ na „0,05“, aby bol celkový súčet = „1,0“.### ✨ New Features

-**Hodnotenie viacúrovňových kvót (automatické kombinovanie)**: Pridaná „Priorita úrovne“ ako 7. bod hodnotenia – účty s úrovňami Ultra/Pro sú teraz uprednostňované pred bezplatnými úrovňami, keď sú ostatné faktory rovnaké. Nové voliteľné polia „accountTier“ a „quotaResetIntervalSecs“ na stránke „ProviderCandidate“. Všetky 4 balíky režimov boli aktualizované ("rýchla dodávka", "úspora nákladov", "najvyššia kvalita", "offline"). -**Vrátenie modelu v rámci rodiny (T5)**: Keď je model nedostupný (404/400/403), OmniRoute sa teraz automaticky vráti k súrodeneckým modelom z tej istej rodiny a potom vráti chybu (`modelFamilyFallback.ts`). -**Configurable API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var umožňuje operátorom vyladiť časový limit proxy servera (predvolených 30 s). Opravuje chyby 504 pri pomalých odozvách proti prúdu. (#332) -**Hviezdna história**: Miniaplikácia star-history.com bola nahradená starchart.cc (`?variant=adaptive`) vo všetkých 30 súboroch README – prispôsobuje sa svetlej/tmavej téme, aktualizácie v reálnom čase.### 🐛 Bug Fixes

-**Auth — Heslo pri prvom použití**: Env var `INITIAL_PASSWORD` je teraz akceptované pri nastavovaní prvého hesla ovládacieho panela. Používa `timingSafeEqual` na porovnanie v konštantnom čase, čím zabraňuje útokom na čas. (#333) -**Skrátenie README**: Opravená chýbajúca uzatváracia značka `</details>` v sekcii Riešenie problémov, ktorá spôsobila, že GitHub prestal vykresľovať všetko pod ňou (Tech Stack, Dokumenty, Plán, Prispievatelia). -**pnpm install**: Odstránené nadbytočné prepísanie `@swc/helpers` z `package.json`, ktoré bolo v konflikte s priamou závislosťou, čo spôsobovalo chyby `EOVERRIDE` na pnpm. Pridaná konfigurácia `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: Pridaný validátor `isSafePath()` v `cliRuntime.ts` na blokovanie prechodu cesty a metaznakov shellu vo vars env `CLI_*_BIN`. -**CI**: Regenerovaný súbor `package-lock.json` po odstránení prepísania, aby sa opravili zlyhania `npm ci` v akciách GitHub.### 🔧 Improvements

-**Formát odpovede (T1)**: `response_format` (json_schema/json_object) teraz vložený ako systémová výzva pre Claude, čo umožňuje kompatibilitu so štruktúrovaným výstupom. -**429 opakovaní (T2)**: Opakovaný pokus v rámci adresy URL pre 429 odpovedí (2× pokusy s oneskorením 2 s) pred prechodom na ďalšiu adresu URL. -**Gemini CLI Headers (T3)**: Pridané hlavičky odtlačkov prstov `User-Agent` a `X-Goog-Api-Client` pre kompatibilitu Gemini CLI.
–**Pricing Catalog (T9)**: Pridané cenové položky „deepseek-3.1“, „deepseek-3.2“ a „qwen3-coder-next“.### 📁 New Files

| Súbor                                      | Účel                                                      |
| ------------------------------------------ | --------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definície modelovej rodiny a vnútrorodinná záložná logika | ### Fixed |

-**KiloCode**: časový limit kontroly stavu kilokódu je už opravený vo verzii 2.3.11 -**OpenCode**: Pridajte otvorený kód do registra cliRuntime s časovým limitom kontroly stavu 15 s -**OpenClaw / Cursor**: Zvýšte časový limit kontroly stavu na 15 s pre varianty s pomalým štartom -**VPS**: Nainštalujte balíčky droid a openclaw npm; aktivovať CLI_EXTRA_PATHS pre kiro-cli -**cliRuntime**: Pridajte registráciu nástroja opencode a predĺžte časový limit pre pokračovanie## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Zvýšte `healthcheckTimeoutMs` zo 4000 ms na 15000 ms – kilokód vykreslí banner s logom ASCII pri spustení, čo spôsobí falošné `healthcheck_failed` v prostrediach s pomalým/studeným štartom## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Opravte zlyhanie `check:any-budget:t11` – nahraďte `as any` za `as Record<string, unknown>` v OAuthModal.tsx (3 výskyty)### Docs

-**CLI-TOOLS.md**: Kompletný sprievodca pre všetkých 11 nástrojov CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, kurzor, droid, openclaw) -**i18n**: CLI-TOOLS.md synchronizované do 30 jazykov s preloženým názvom + úvodom## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nový starý koncový bod dokončenia OpenAI – akceptuje reťazec „výzvy“ aj pole „správ“, automaticky sa normalizuje na formát rozhovoru -**EndpointPage**: Teraz zobrazuje všetky 3 typy koncových bodov kompatibilných s OpenAI: Dokončenia chatu, Rozhranie API odpovedí a Dokončenia starších verzií -**i18n**: Pridané „completionsLegacy/completionsLegacyDesc“ do 30 jazykových súborov### Fixed

-**OAuthModal**: Opravte „[object Object]“ zobrazený pri všetkých chybách pripojenia OAuth – správne extrahujte „.message“ z objektov chybovej odpovede vo všetkých 3 volaniach „throw new Error(data.error)“ (výmena, kód zariadenia, autorizácia)

- Ovplyvňuje Cline, Codex, GitHub, Qwen, Kiro a všetkých ostatných poskytovateľov OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Pridajte „decodeURIComponent“ pred dekódovanie base64, aby sa autorizačné kódy zakódované v URL z adresy URL spätného volania správne analyzovali, čím sa opravia chyby „neplatný alebo vypršaný autorizačný kód“ vo vzdialených nastaveniach (IP LAN). -**Cline OAuth**: `mapTokens` teraz vypĺňa `name = meno + priezvisko || email` takže účty Cline zobrazujú skutočné mená používateľov namiesto "ID účtu" -**Názvy účtov OAuth**: Všetky výmenné toky OAuth (výmena, prieskum, spätné volanie) teraz normalizujú `meno = email`, keď meno chýba, takže každý účet OAuth zobrazuje svoj e-mail ako zobrazovaný štítok na paneli poskytovateľov
–**Názvy účtov OAuth**: Odstránená sekvenčná rezerva „Účet N“ v `db/providers.ts` – účty bez e-mailu/názvu teraz používajú stabilný štítok založený na ID prostredníctvom `getAccountDisplayName()` namiesto poradového čísla, ktoré sa mení po odstránení účtov## [2.3.6] - 2026-03-12

### Fixed

-**Testovacia dávka poskytovateľa**: Opravená schéma Zod na akceptovanie `providerId: null` (frontend posiela null pre režimy bez poskytovateľa); nesprávne vracal "Neplatná požiadavka" pre všetky dávkové testy
–**Testovací modálny poskytovateľ**: Opravené zobrazenie „[object Object]“ normalizáciou chybových objektov API na reťazce pred vykreslením v „setTestResults“ a „ProviderTestResultsView“ -**i18n**: Pridané chýbajúce kľúče `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` do súboru `en.json` -**i18n**: Synchronizovaných 1111 chýbajúcich kľúčov vo všetkých 29 súboroch v neanglickom jazyku pomocou anglických hodnôt ako záložných zdrojov## [2.3.5] - 2026-03-11

### Fixed

–**@swc/helpers**: Pridaná trvalá oprava „po inštalácii“ na skopírovanie „@swc/helpers“ do „modulov uzlov“ samostatnej aplikácie – zabraňuje zlyhaniu modulu MODULE_NOT_FOUND pri globálnych inštaláciách npm## [2.3.4] - 2026-03-10

### Added

- Viaceré integrácie poskytovateľov a vylepšenia dashboardu
