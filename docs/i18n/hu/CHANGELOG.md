# Changelog (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Középszoftver:**Megoldott végtelen átirányítási hurok az irányítópulton azokra a friss példányokra vonatkozóan, amikor a requestLogin le van tiltva.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API natív integráció:**Teljesen átdolgozta a Qoder Executort, hogy megkerülje a régi COZY AES/RSA titkosítási algoritmust, és közvetlenül a natív DashScope OpenAi-kompatibilis URL-re irányítsa. Megszünteti a csomóponti "crypto" moduloktól való összetett függőséget, miközben javítja az adatfolyam-hűséget. -**Resilience Engine felülvizsgálata:**Integrált kontextus túlcsordulási kecses tartalékok, proaktív OAuth-tokenészlelés és üres tartalom kibocsátásának megelőzése (#990). -**Context-Optimized Routing Strategy:**Added new intelligent routing capability to natively maximize context windows in automated combo deployments (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Javítva a mély klónozási korrupció, ahol az Anthropic/OpenAI fordítási határok eltávolították a 'response.' specifikus SSE előtagokat a streamelési határoktól (#992). -**Claude Cache Passthrough Alignment:**A CC-kompatibilis gyorsítótárjelzők összehangolása az upstream Client Pass-Through móddal, megőrizve az azonnali gyorsítótárazást. -**Turbopack memóriaszivárgás:**A Next.js-t szigorú `16.0.10-hez rögzítve, megakadályozva a memóriaszivárgásokat és az elavultságot a legutóbbi felfelé irányuló Turbopack kivonatolt modul regresszióiból (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev integráció:**Az integrált models.dev a modell árképzésének, képességeinek és specifikációinak mérvadó futásidejű forrásaként, felülírva a merevkódolt árakat. Tartalmaz egy beállítási felhasználói felületet a szinkronizálási időközök kezeléséhez, a fordítási karakterláncokat mind a 30 nyelvhez és a robusztus tesztlefedettséget. -**Szolgáltató natív képességei:**Hozzáadott támogatás a natív API-funkciók deklarálásához és ellenőrzéséhez (pl. "systemInstructions_supported"), amelyek megakadályozzák a hibákat az érvénytelen szerepkörök megtisztításával. Jelenleg a Gemini Base és az Antigravity OAuth szolgáltatókhoz van konfigurálva. -**API-szolgáltató speciális beállításai:**Hozzáadott kapcsolatonkénti egyéni "User-Agent" felülírások API-kulcs szolgáltatói kapcsolatokhoz. A felülbírálás a "providerSpecificData.customUserAgent" fájlban van tárolva, és mostantól az érvényesítési mintákra és az upstream végrehajtási kérésekre vonatkozik.### 🐛 Bug Fixes

-**Qwen OAuth megbízhatóság:**Megoldott egy sor OAuth integrációs problémát, beleértve a 400 Bad Request blokkolót a lejárt tokeneknél, a tartalék generálást az OIDC "access_token" tulajdonságainak elemzéséhez, ha az "id_token" kimarad, a modellkatalógus-felderítési hibákat és a re-\*`Dashersco`X szigorú szűrését. OpenAI-kompatibilis végpontokról.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Befejezett natív CRUD életciklus-integráció a fejlett Auto-Combo motorhoz (#955). -**Alapműveletek:**Javítottuk a hiányzó fordításokat az új natív automatikus kombinációs beállításokhoz (#955). -**Biztonsági ellenőrzés:**Letiltott SQLite automatikus biztonsági mentési feladatok natívan az egységteszt CI végrehajtása során, hogy kifejezetten feloldják a 22-es csomópont eseményhurok függő memóriaszivárgását (#956). -**Ökoszisztéma-proxyk:**Befejezett explicit integrációs leképezési modell szinkronizálási ütemezők, OAuth-ciklusok és Token Check biztonságosan frissül az OmniRoute natív rendszer upstream proxyjain keresztül (#953). -**MCP bővíthetőség:**Az új `omniroute_web_search` MCP keretrendszer hozzáadva és sikeresen regisztrálva a béta verzióból az éles sémákba (#951). -**Tokens Buffer Logic:**Hozzáadott futásidejű konfigurációs korlátok, amelyek kibővítik a konfigurálható bemeneti/kimeneti token puffereket a pontos használatkövetési metrikák érdekében (#959).### 🐛 Bug Fixes

-**CodeQL-javítás:**Teljesen feloldott és biztonságos kritikus karakterlánc-indexelési műveletek, amelyek megakadályozzák, hogy a kiszolgálóoldali kérelem-hamisítási (SSRF) tömbök heurisztikát indexeljenek a polinomiális algoritmikus visszakövetés (ReDoS) mellett a mélyproxy diszpécser modulokban. -**Crypto Hashes:**A gyenge, nem ellenőrzött örökölt OAuth 1.0 kivonatokat robusztus HMAC-SHA-256 szabvány érvényesítési primitívekre cserélték, biztosítva a szigorú hozzáférés-szabályozást. -**API határvédelem:**Megfelelően ellenőrzött és leképezett strukturális útvonalvédelmek, amelyek szigorú "isAuthenticated()" köztes szoftver logikát kényszerítenek ki, amely lefedi az újabb dinamikus végpontokat, célzó beállításokat és natív készségek betöltését. -**CLI Ecosystem Compat:**Meghibásodott natív futásidejű elemző-összerendelések feloldása, amelyek a „hol” környezetérzékelők összeomlását szigorúan a „.cmd/.exe” szélső eseteken túlmenően kecsesen használják a külső beépülő modulokhoz (#969). -**Gyorsítótár architektúra:**Újrafaktorált, pontos Analytics és rendszerbeállítások irányítópult-paraméterek elrendezési struktúra gyorsítótárazása a stabil újrahidratálási perzisztencia ciklusok fenntartása érdekében, feloldva a vizuális nem igazított állapotfelvillanásokat (#952). -**Claude gyorsítótárazási szabványok:**Normalizált és pontosan megőrzött kritikus efemer blokkjelzők, "efemer" gyorsítótárazási TTL parancsok a downstream csomópontokhoz, amelyek kikényszerítik a szabványos kompatibilis CC-kérések tiszta leképezését, eldobott metrikák nélkül (#948). -**Belső álnevek hitelesítése:**Egyszerűsített belső futásidejű leképezések, amelyek normalizálják a Codex hitelesítő adatok hasznos adattartalmának keresését a globális fordítási paramétereken belül, és 401 nem hitelesített kiesést oldanak meg (#958).### 🛠️ Maintenance

-**UI felderíthetőség:**Megfelelően módosított elrendezési kategorizálás, amely kifejezetten elválasztja az ingyenes szintű szolgáltatók logikáját, javítva az UX rendezési folyamatait az általános API-nyilvántartási oldalakon belül (#950). -**Deployment Topology:**Unified Docker deployment artifacts ensuring the root `fly.toml` matches expected cloud instance parameters out-of-the-box natively handling automated deployments scaling properly. -**Fejlesztői eszközök:**Az "LKGP" futásidejű paraméterek leválasztott explicit DB-réteg-absztrakciós gyorsítótárazási segédprogramjaira, amelyek biztonságosan biztosítják a szigorú teszt-elkülönítési lefedettséget az alapvető gyorsítótárazási rétegek számára.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Irányítópult Auto-Combo Panel:**Teljesen átdolgozta a `/dashboard/auto-combo' felhasználói felületet, hogy zökkenőmentesen integrálódjon a natív irányítópult-kártyákkal és a szabványos vizuális padding/fejlécekkel. Hozzáadott dinamikus vizuális folyamatjelző sávok, amelyek leképezik a modellkiválasztás súlyozási mechanizmusait. -**Settings Routing Sync:**Teljesen hozzáférhető speciális útválasztási „prioritásos” és „súlyozott” sémacélok a globális beállítások tartaléklistáin belül.### Bug Fixes

-**Memória és készségek területi csomópontjai:**A Memória és Skills opciók üres megjelenítési címkéi közvetlenül a globális beállítások nézeteiben oldották meg az összes "settings.\*" leképezési érték belső bekötésével az "en.json" fájlba (amely implicit módon le van képezve a keresztfordítási eszközökhöz).### Internal Integrations

- Integrált PR #946 – javítás: Claude Code kompatibilitás megőrzése a válaszok konvertálásában
- Integrált PR #944 – fix(gemini): gondolati aláírások megőrzése az antigravitációs eszközhívásokon keresztül
- Integrált PR #943 – javítás: a GitHub Copilot test visszaállítása
- Integrált PR #942 – Javítsa ki a cc-kompatibilis gyorsítótár-jelölőket
- Integrált PR #941 – refactor(auth): NVIDIA alias keresés javítása + LKGP hibanaplózás hozzáadása
- Integrált PR #939 – Claude OAuth localhost visszahíváskezelésének visszaállítása
- _(Megjegyzés: PR #934 kimaradt a 3.4.9-es ciklusból, hogy megakadályozzuk az alapvető konfliktusok regresszióit)_---

## [3.4.8] — 2026-04-03

### Biztonság

- Teljesen orvosolta az összes kiemelkedő Github Advanced Security (CodeQL) megállapítást és a Dependabot riasztást.
- Kijavítottuk a nem biztonságos véletlenszerűségi sebezhetőséget a `Math.random`-ról a `crypto.randomUUID()`-re való áttéréssel.
- Biztonságos shell-parancsok karakterlánc-injektálásból származó automatizált szkriptekben.
- A sebezhető, katasztrofálisan visszalépő RegEx-elemzési minták migrálása a csevegési/fordítási folyamatokban.
- Továbbfejlesztett kimeneti fertőtlenítési vezérlők a React felhasználói felület összetevőiben és a kiszolgáló elküldött események (SSE) címke-injektálásában.---

## [3.4.7] — 2026-04-03

### Funkciók

- Hozzáadtuk a „Tijtográfia” csomópontot a Monitoring és MCP állapotellenőrzésekhez (#798)
- Megerősített modell-katalógus útvonalengedély-leképezés (`/models`) (#781)### Bug Fixes

- Javítva a Claude OAuth token frissítése, amely nem őrzi meg a gyorsítótár kontextusait (#937)
- Javítva a CC-kompatibilis szolgáltatói hibák, amelyek elérhetetlenné teszik a gyorsítótárazott modelleket (#937)
- Az érvénytelen kontextustömbökhöz kapcsolódó GitHub Executor hibák javítása (#937)
- Az NPM-mel telepített CLI-eszközök állapotellenőrzési hibáinak javítása Windows rendszeren (#935)
- Javítottuk a hasznos terhelés fordítását, amely érvénytelen API-mezők miatt kihagyja az érvényes tartalmat (#927)
- Javítva a futásidejű összeomlás a 25-ös csomópontban az API-kulcs végrehajtásával kapcsolatban (#867)
- Javított MCP önálló modulfelbontás (`ERR_MODULE_NOT_FOUND`) az `esbuild'-en keresztül (#936)
- Javítva az NVIDIA NIM útválasztási hitelesítő adatok felbontásának álnevének eltérése (#931)### Biztonság

- Biztonságos, szigorú bemeneti határvédelem hozzáadva a nyers "shell: true" távoli kódvégrehajtással szemben.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Szolgáltatók:**Regisztrált új kép-, videó- ​​és hanggeneráló szolgáltatók a közösség által kért listáról (#926). -**Irányítópult UI:**Hozzáadott önálló oldalsáv-navigáció az új memória és készségek modulokhoz (#926). -**i18n:**Fordítási karakterláncok és elrendezés-leképezések hozzáadva 30 nyelven a Memory és Skills névterekhez.### 🐛 Bug Fixes

-**Resilience:**Prevented the proxy Circuit Breaker from becoming stuck in an OPEN state indefinitely by handling direct transitions to CLOSED state inside fallback combo paths (#930). -**Protokollfordítás:**A streaming transzformátor javítása a válaszblokkok megtisztítása érdekében a várt _source_ protokoll, nem pedig a szolgáltató _target_ protokollja alapján, kijavítva az OpenAI rakományba csomagolt Anthropics modelleket, amelyek összeomlik a Claude Code-val (#929). -**API specifikációk és Gemini:**Javítva a "thought_signature" elemzés az "openai-to-gemini" és "claude-to-gemini" fordítókban, megelőzve a HTTP 400 hibákat az összes Gemini 3 API eszközhívásban. -**Szolgáltatók:**Megtisztították a nem OpenAI-kompatibilis végpontokat, megakadályozva az érvényes upstream kapcsolatokat (#926). -**Cache Trends:**Kijavítottuk az érvénytelen tulajdonleképezési adatok eltérését, amely a Cache Trends felhasználói felület diagramjainak összeomlását okozta, és redundáns gyorsítótár-mérőmodulokat bontott ki (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI ökoszisztéma-integráció:**hozzáadva a "cliproxyapi" végrehajtót beépített modulszintű gyorsítótárazással és proxy-útválasztással. Bevezetett egy átfogó Version Manager szolgáltatást, amely automatikusan teszteli az állapotot, tölti le a bináris fájlokat a GitHubból, hoz létre elszigetelt háttérfolyamatokat, és tisztán kezeli a külső CLI-eszközök életciklusát közvetlenül a felhasználói felületen keresztül. Tartalmaz DB táblákat a proxykonfigurációhoz, amely lehetővé teszi a külső OpenAI-kérelmek automatikus SSRF-kapuzott keresztútvonalát a helyi CLI eszközrétegen keresztül (#914, #915, #916). -**Qoder PAT támogatás:**Az integrált személyes hozzáférési jogkivonatok (PAT) támogatása közvetlenül a helyi "qodercli" átvitelen keresztül a régebbi távoli ".cn" böngészőkonfigurációk helyett (#913). -**Gemini 3.1 Pro Preview (GitHub):**A „gemini-3.1-pro-preview” kanonikus explicit modell támogatása natív módon hozzáadva a GitHub Copilot szolgáltatóhoz, miközben megőrizte a régebbi útválasztási álneveket (#924).### 🐛 Bug Fixes

-**GitHub másodpilóta token stabilitása:**Javítottuk a másodpilóta jogkivonat frissítési ciklusát, ahol az elavult tokeneket nem egyesítették mélyen a DB-be, és eltávolítottuk a „reasoning_text” mezőket, amelyek végzetesen megtörték az antropikus blokkkonverziókat a többfordulós csevegéseknél (#923). -**Globális időtúllépési mátrix:**Központosított és paraméterezett kérési időtúllépések kifejezetten a `REQUEST_TIMEOUT_MS`-től, hogy megakadályozzák, hogy a rejtett (~300 mp) alapértelmezett letöltési pufferek idő előtt levágják a hosszú élettartamú SSE streamelési válaszokat a nehéz gondolkodási modellekből (#918). -**Cloudflare Quick Tunnels State:**Kijavítottuk azt a súlyos állapotbeli inkonzisztenciát, hogy az újraindított OmniRoute-példányok hibásan aktívnak mutatták a megsemmisült alagutakat, és az alapértelmezett cloudflared alagutat a `HTTP/2-re, hogy kiküszöböljük az UDP fogadási puffernapló spamét (#925).
-**i18n Translation Overhaul (cseh és hindi):**Hindi kód javítása EGYÜTT 'in.json'-ról kanonikus 'hi.json'-ra, felülvizsgált cseh szövegleképezések, kicsomagolt 'untranslable-keys.json' a CI/CD hamispozitív ellenőrzésekhez való javításához, és 1-as fordító 8s-t generált. (#912).
-**Token Provider Recovery:**Javítva, hogy a Qwen elveszítse bizonyos `resourceUrl' végpontjait az automatikus állapot-ellenőrzési tokenfrissítések miatt a hiányzó DB mélyösszevonások miatt (#917). -**CC-kompatibilis UX és streaming:**Egységesítette a CC/OpenAI/Anthropic kompatibilis műveleteket az Anthropic UI kezelés körül, a CC-kompatibilis upstream kérések SSE használatára kényszerültek, miközben továbbra is streaming vagy nem streamelési válaszokat adnak vissza az ügyfél kérése alapján, eltávolították a CC-modell-lista konfigurációját/importálási támogatását egy explicit módon nem támogatott hiba javára a CC-modell-kompatibilis, a modell lemodellezése. OAuth Claude Code regisztrációs lista (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Adja ki a `response.completed` megfelelő `input_tokens`/`output_tokens` mezőket a Codex CLI kliensek számára, javítva a jogkivonat használatának megjelenítését (#909 – köszönöm @christopher-s). -**SQLite WAL-ellenőrzési pont leállításkor:**A WAL-módosítások beírása az elsődleges adatbázisfájlba a kecses leállítás/újraindítás során, megelőzve az adatvesztést a Docker-tároló leállásakor (#905 – köszönöm @rdself). -**Graceful Shutdown Signal:**Megváltoztatta az `/api/restart' és `/api/shutdown' útvonalakat `process.exit(0)`-ról `process.kill(SIGTERM)`-re, biztosítva, hogy a leállításkezelő futjon a kilépés előtt. -**Docker leállási türelmi időszak:**`stop_grace_period: 40s` hozzáadva a Docker Compose fájlokhoz és `--stop-timeout 40` a Docker futtatási példákhoz.### 🛠️ Maintenance

- Lezárt 5 megoldott/nem hibátlan probléma (#872, #814, #816, #890, #877).
- 6 problémát kezeltek a szükséglet-információkérésekkel (#892, #887, #886, #865, #895, #870).
- Válasz a CLI-észlelési követési problémára (#863) közreműködői útmutatással.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravitációs memória és készségek:**Befejezett távoli memória és készségek beadása az Antigravitációs szolgáltató számára proxyhálózati szinten. -**Claude Code kompatibilitás:**Natívan rejtett kompatibilitási hidat épített a Claude Code számára, tisztán átadva az eszközöket és a formázást. -**Web Search MCP:**Hozzáadtuk az "omniroute_web_search" eszközt az "execute:search" hatókörrel. -**Gyorsítótár-komponensek:**TDD-t használó dinamikus gyorsítótár-összetevők. -**Felhasználói felület és testreszabás:**Egyéni favicon-támogatás, megjelenési lapok, vezetékes fehércímkézés az oldalsávon, valamint Windsurf útmutató lépések hozzáadva mind a 33 nyelven. -**Napló megőrzése:**Egységes kérésnapló-megőrzés és műtermékek natív módon. -**Modelljavítások:**Explicit "contextLength" hozzáadva az összes opencode-zen modellhez. -**i18n és fordítások:**Integrált 33 nyelvű fordítás natív módon, beleértve a helyőrző CI-ellenőrzéseket és a kínai dokumentáció frissítéseit (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth leképezés:**Visszaállította az "id_token" függőségét az "access_token"-re, és engedélyezte a dinamikus "resource_url" API-végpont-injektálást a megfelelő regionális útválasztáshoz (#900). -**Modell szinkronizálási motor:**A szigorú belső szolgáltatói azonosítót a "getCustomModels()" szinkronizálási rutinokban tárolta az UI Channel Alias ​​formátum helyett, megelőzve az SQLite katalógus beillesztési hibáit (#903). -**Claude Code & Codex:**Szabványosított, nem adatfolyamként közvetített üres válaszok Anthropic-formátumú `(üres válasz)`-ra a CLI proxy összeomlásának megelőzése érdekében (#866). -**CC-kompatibilis útválasztás:**Megoldott a `/v1' végpont duplikált ütközése az általános Claude Code-átjárók útvonal-összefűzése során (#904).
-**Antigravitációs irányítópultok:**A korlátlan kvótamodellek letiltása a kimerült „100%-os használati” határállapotok tévesen történő regisztrálásában a szolgáltatói használati felületen (#857).
-**Claude Image Passthrough:**Javítottuk a Claude-modelleket, amelyekből hiányoznak a képblokk átvezetései (#898).
-**Gemini CLI Routing:**Megoldotta a 403 engedélyezési zárolást és a tartalomfelhalmozási problémákat a projektazonosító frissítésével a "loadCodeAssist" segítségével (#868).
-**Antigravitációs stabilitás:**Javított modell-hozzáférési listák, kényszerített 404-es zárolások, rögzített 429-es kaszkádok, amelyek lezárják a szabványos kapcsolatokat, és lezárt "gemini-3.1-pro" kimeneti tokenek (#885).
-**Provider Sync Cadence:**A szolgáltatói korlátozások szinkronizálási ütemének javítása a belső ütemezőn keresztül (#888).
-**Irányítópult optimalizálása:**Megoldódott a `/dashboard/limits' UI lefagyása, amikor több mint 70 fiókot dolgoznak fel a darabpárhuzamozással (#784). -**SSRF keményítés:**Kényszerítette a szigorú SSRF IP-tartomány szűrését, és blokkolta a `::1` loopback interfészt. -**MIME-típusok:**Szabványosított "mime_type" a snake_case-hez, hogy megfeleljen a Gemini API specifikációinak. -**CI-stabilizálás:**Javítva a hibás elemzések/beállítások Playwright-választók és kérések, így a GitHub Actions E2E futások megbízhatóan áthaladnak a lokalizált felhasználói felületeken és a kapcsolóalapú vezérlőkön. -**Determinisztikus tesztek:**Eltávolítottuk a dátumérzékeny kvóta rögzítéseket a Copilot használati tesztekből, és az idempotencia/modellkatalógus-teszteket az egyesített futásidejű viselkedéshez igazították. -**MCP Type Hardening:**Eltávolítottuk a nulla költségvetésű explicit "bármilyen" regressziót az MCP-kiszolgáló eszköz regisztrációs útvonaláról. -**Modell szinkronizálási motor:**A megkerült destruktív "csere" felülírja, ha a szolgáltató automatikus szinkronizálása üres modelllistát eredményez, megőrizve a dinamikus katalógusok stabilitását (#899).### 🛠️ Maintenance

-**Csővezeték naplózása:**Finomított csővezeték-naplózási műtermékek és érvényben lévő megőrzési korlátok (#880). -**AGENTS.md nagyjavítás:**297→153 sorból tömörítve. Felépítési/tesztelési/stílusi irányelvek, kódmunkafolyamatok (Prettier, TypeScript, ESLint) és levágott részletes táblázatok (#882) hozzáadva. -**Release Branch Integration:**Konszolidálta az aktív szolgáltatási ágakat a "release/v3.4.2"-be a jelenlegi "main" tetején, és érvényesítette az ágat lint, unit, coverage, build és CI-módú E2E futással. -**Tesztelés:**Vitest konfiguráció hozzáadva az összetevők teszteléséhez és a Playwright specifikációi a beállítások kapcsolóihoz. -**Dokumentumfrissítések:**Kibővített gyökér readmes, kínai dokumentumok natív fordítása és elavult fájlok törlése.## [3.4.1] - 2026-03-31

> [!FIGYELEM]
> **MEGTÖRTÉNŐ VÁLTOZÁS: A kérésnaplózási, megőrzési és naplózási környezeti változók újratervezésre kerültek.**
> A frissítés utáni első indításkor az OmniRoute archiválja a régebbi kérésnaplókat a `DATA_DIR/logs/`, a régi `DATA_DIR/call_logs/` és a `DATA_DIR/log.txt` mappából a `DATA_DIR/log_archives/*.zipified` mappába, majd eltávolítja az új unprecifikált archivált formátumot. a `DATA_DIR/call_logs/` alatt.### ✨ New Features

-**.ENV Migration Utility:**Tartalmazza a "scripts/migrate-env.mjs" fájlt a "<v3.3" konfigurációk zökkenőmentes áttelepítéséhez a "v3.4.x" szigorú biztonsági ellenőrzési megszorításokhoz (FASE-01), javítva a rövid "JWT_SECRET" példányok által okozott indítási összeomlásokat. -**Kiro AI gyorsítótár optimalizálása:**Determinisztikus "conversationId" generálás (uuidv5) valósított meg az AWS Builder ID felszólítás gyorsítótárazása megfelelő hívások között (#814). -**Az irányítópult felhasználói felületének visszaállítása és konszolidációja:**Megoldott az oldalsáv logikája a Debug szakasz kihagyásával, és a Nextjs útválasztási figyelmeztetések törlése azáltal, hogy az önálló `/dashboard/mcp` és `/dashboard/a2a` oldalakat kifejezetten a beágyazott Endpoint Proxy UI összetevőkbe helyezte át. -**Egységes kérésnapló-műtermékek:**A kérések naplózása kérésenként egy SQLite-indexsort és egy JSON-műterméket tárol a `DATA_DIR/call_logs/` alatt, ugyanabba a fájlba beágyazott opcionális folyamatrögzítéssel. -**Nyelv:**Javított a kínai fordítás (#855) -**Opencode-Zen modellek:**4 ingyenes modell hozzáadva az opencode-zen nyilvántartáshoz (#854) -**Tesztek:**Hozzáadott egység- és E2E-tesztek a beállítások váltásához és a hibajavításokhoz (#850)### 🐛 Bug Fixes

-**429-es kvótaelemzés:**A hosszú kvóta-visszaállítási idők elemzése a hibatörzsekből a helyes visszalépések tiszteletben tartása és a limitált fióktiltás megelőzése érdekében (#859) -**Prompt Caching:**Megőrzött kliens "cache_control" fejlécek minden Claude-protokoll-szolgáltatóhoz (mint például a Minimax, a GLM és a Bailian), helyesen felismerve a gyorsítótárazási támogatást (#856) -**Modell-szinkronizálási naplók:**Csökkentett naplólevélszemét a "szinkronizálási modellek" rögzítésével, csak akkor, ha a csatorna ténylegesen módosítja a listát (#853) -**Szolgáltatói kvóta és tokenelemzés:**Az antigravitációs korlátok átkapcsolva a `retrieveUserQuota' natív és helyesen leképezett Claude-token frissítési terheléseinek URL-kódolású űrlapokra történő használatához (#862)
-**Sebességkorlátozó stabilitás:**Univerzálissá tette a 429 Retry-After elemzési architektúrát, hogy max. 24 órán belül korlátozza a szolgáltató által kiváltott leállásokat (#862)
-**Irányítópult korlátok megjelenítése:**Újratervezett `/dashboard/limits' kvótaleképezés, hogy azonnal a darabokon belül jelenjen meg, kijavítva a felhasználói felület lefagyásának jelentős késését a 70 aktív kapcsolatot meghaladó fiókoknál (#784) -**QWEN OAuth-engedélyezés:**Az OIDC `id_token'-t leképezte a Dashscope-kérések elsődleges API-vivőjeként, azonnal kijavítva a 401-es jogosulatlan hibákat a fiókok összekapcsolása vagy a tokenek frissítése után (#864) -**ZAI API stabilitás:**Megerősített szerver által küldött események fordító, amely kecsesen visszalép az üres karakterláncokhoz, amikor a DeepSeek szolgáltatók matematikailag nulla tartalmat streamelnek az érvelési fázisok során (#871) -**Claude Code/Codex Translations:**Védett, nem adatfolyamos hasznos adatkonverziók az upstream Codex-eszközök üres válaszai ellen, elkerülve a katasztrofális típushibákat (#866) -**NVIDIA NIM rendering:**Feltételesen lecsupaszított azonos szolgáltatói előtagok, amelyeket az audiomodellek dinamikusan nyomnak, kiküszöbölve a 404-es 404-es duplikált nim/nim tagstruktúrákat a Media Playgroundon (#872)### ⚠️ Breaking Changes

-**Kérésnapló elrendezése:**Eltávolította a régi többfájlos `DATA_DIR/logs/` kérésnapló-munkameneteket és a `DATA_DIR/log.txt` összefoglaló fájlt. Az új kérelmek egyetlen JSON-műtermékként íródnak a `DATA_DIR/call_logs/YYYY-MM-DD/` mappába. -**Naplózási környezeti változók:**A `LOG_*`, `ENABLE_REQUEST_LOGS', `CALL*LOGS_MAX, CALL_LOG_PAYLOAD_MODE és PROXY_LOG_MAX_ENTRIES-t az új APP_LOG*\*\_LOG_RECTEN_DAYS-konfigurációval és . -**Pipeline Toggle Setting:**A régi `detailed_logs_enabled` beállítást a `call_log_pipeline_enabled` értékre cserélte. Az új folyamat részletei a kérés melléktermékébe ágyazódnak be, ahelyett, hogy külön „request_detail_logs” rekordként tárolnák őket.### 🛠️ Maintenance

-**Régi kérelemnapló frissítési biztonsági mentés:**A frissítések a régi `data/logs/`, a régi `data/call_logs/` és a `data/log.txt` elrendezéseket a `DATA_DIR/log_archives/*.zip` mappába archiválják, mielőtt eltávolítanák az elavult struktúrát. -**A streamelés használatának állandósága:**A streamelési kérelmek a befejezésük után egyetlen „usage_history” sort írnak, ahelyett, hogy ismétlődő folyamatban lévő használati sort bocsátanának ki üres állapotmetaadatokkal. -**A naplózás nyomon követése:**A folyamatnaplók már nem rögzítik a "FORRÁSKÉRÉS" elemet, a kérelmezett műtermék-bejegyzések mostantól a "CALL_LOG_MAX_ENTRIES"-t, az alkalmazásnapló-archívumok pedig az "APP_LOG_MAX_FILES"-t.---

## [3.4.0] - 2026-03-31

### Funkciók

-**Előfizetések kihasználtságának elemzése:**Hozzáadott kvóta-pillanatkép-idősorkövetés, a Szolgáltató kihasználtsága és a Combo Health lapok újradiagram vizualizációkkal, valamint a megfelelő API-végpontokkal (#847) -**SQLite Backup Control:**Új `OMNIROUTE_DISABLE_AUTO_BACKUP` env jelző az automatikus SQLite biztonsági mentések letiltásához (#846) -**Modell-nyilvántartási frissítés:**„gpt-5.4-mini” beillesztése a Codex-szolgáltató modelltömbjébe (#756) -**Szolgáltatói korlát követése:**Nyomon követheti és megjelenítheti, hogy mikor frissültek utoljára a szolgáltatói díjkorlátok fiókonként (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**A Qwen OAuth befejezések átirányítása a DashScope API-ból a Web Inference API-ba (`chat.qwen.ai`), az engedélyezési hibák feloldása (#844, #807, #832) -**Qwen automatikus újrapróbálkozási hurok:**Hozzáadott célzott 429-es kvóta túllépése visszalépés kezelése a "chatCore"-on belül, védve a sorozatkéréseket -**A Codex OAuth tartalék:**A modern böngésző előugró ablakok blokkolása többé nem fogja csapdába a felhasználót; automatikusan visszaáll a kézi URL-bevitelre (#808) -**Claude Token Refresh:**Az Anthropic szigorú „alkalmazás/json” határait a kódolt URL-ek helyett a token generálása során tiszteletben tartják (#836) -**Kódüzenet-séma:**Megtisztított purista "üzenetek" a natív áthárító kérésekből, hogy elkerüljék a ChatGPT upstream strukturális elutasítását (#806) -**CLI-észlelési méretkorlát:**A Node bináris szkennelési felső határát biztonságosan 100 MB-ról 350 MB-ra emelte, lehetővé téve az olyan nehéz önálló eszközöknek, mint a Claude Code (229 MB) és az OpenCode (153 MB), hogy a VPS futási környezete megfelelően észlelje (#809) -**CLI futási környezet:**A CLI-konfigurációk visszaállították a felhasználói felülírási útvonalak (`CLI_{PROVIDER}_BIN`) tiszteletben tartását, megkerülve a szigorú, útvonalhoz kötött felfedezési szabályokat -**Nvidia Header Conflicts:**A "prompt_cache_key" tulajdonságok eltávolítása az upstream fejlécekből nem antropikus szolgáltatók hívásakor (#848) -**Codex Fast Tier Toggle:**Visszaállított Codex szolgáltatási szint kapcsoló kontraszt világos módban (#842) -**Teszt infrastruktúra:**Frissített "t28-model-catalog-updates" teszt, amely helytelenül számította ki az elavult DashScope végpontot a Qwen natív rendszerleíró adatbázisához---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Egyéni szolgáltató rotáció:**A DefaultExecutor belsejében integrált "getRotatingApiKey" biztosítja, hogy az "extraApiKeys" rotáció megfelelően aktiválódjon az egyéni és kompatibilis upstream szolgáltatók számára (#815)---

## [3.3.8] - 2026-03-30

### Funkciók

-**Models API-szűrés:**A `/v1/models` végpont mostantól dinamikusan szűri a listáját az `Engedélyezés: Viszony <token>` engedélyei alapján, ha a korlátozott hozzáférés be van kapcsolva (#781) -**Qoder integráció:**Natív integráció a Qoder AI-hez, amely natívan helyettesíti a régi iFlow platformleképezéseket (#660) -**Prompt Cache Tracking:**Hozzáadott nyomkövetési képességek és frontend vizualizáció (statisztikai kártya) a szemantikai és azonnali gyorsítótárazáshoz az irányítópult felhasználói felületén### 🐛 Bug Fixes

-**Gyorsítótár-irányítópult méretezése:**Javítottuk a felhasználói felület elrendezési méreteit és a kontextus fejléceit a speciális gyorsítótár-oldalaknál (#835) -**Hibakeresési oldalsáv láthatósága:**Kijavítottuk azt a hibát, amely miatt a hibakeresési kapcsoló nem jelenítette meg vagy rejtette el megfelelően az oldalsáv hibakeresési részleteit (#834) -**Gemini Model Prefixing:**A névtér tartalék módosítása úgy, hogy a megfelelő útvonalat a `gemini-cli/` a `gc/` helyett a `gc/` helyett, hogy tiszteletben tartsa az upstream specifikációkat (#831) -**OpenRouter Sync:**Továbbfejlesztett kompatibilitási szinkronizálás az elérhető modellkatalógus automatikus betöltéséhez az OpenRouterből (#830) -**Streaming Payloads Mapping:**Az érvelési mezők újrasorosítása natív módon feloldja a konfliktusos alias útvonalakat, amikor a kimenet a szélső eszközökre áramlik---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Átstrukturáltan generált `opencode.json`, hogy az `@ai-sdk/openai-kompatibilis` rekordalapú sémát használja az `opciókkal` és a `modellekkel' objektumleképezésként sík tömbök helyett, kijavítva a konfigurációs ellenőrzési hibákat (#816)
-**i18n Missing Keys:**A hiányzó `cloudflaredUrlNotice`fordítókulcs hozzáadása mind a 30 nyelvi fájlhoz, hogy elkerüljük a`MISSING_MESSAGE' konzolhibákat a végpont oldalon (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**A gyorsítótár-tokeneket biztonságosan tartalmazza az előzményhasználati bemenetek számításaiban a helyes kvótalevonás érdekében (PR #822) -**Kombinált tesztszondák:**Javítva a kombinált tesztelési logika hamis negatívumai a csak érvelést igénylő válaszok elemzésének feloldásával, és lehetővé tették a Promise.all-on keresztüli masszív párhuzamosítást (PR #828) -**Docker Quick Tunnels:**Az alap futásidejű tárolóba beágyazott szükséges ca-tanúsítványok a Cloudflared TLS indítási hibáinak és az általános kilépési kódokat helyettesítő szokásos hálózati hibák megoldásához (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini kvótakövetés:**Valós idejű Gemini CLI kvótakövetés hozzáadva a "retrieveUserQuota" API-n keresztül (PR #825) -**Gyorsítótár irányítópultja:**Továbbfejlesztett gyorsítótár-irányítópult azonnali gyorsítótári mutatók, 24 órás trendek és becsült költségmegtakarítások megjelenítéséhez (PR #824)### 🐛 Bug Fixes

-**Felhasználói élmény:**Az invazív, automatikusan nyitó OAuth modális hurkok eltávolítása a kopár szolgáltató részletes oldalain (PR #820) -**Függőség-frissítések:**A fejlesztési és termelési fák, köztük a Next.js 16.2.1, a Recharts és a TailwindCSS 4.2.2 (PR #826, #827) összeomlott és zárolt függőségei---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A munkafolyamatok:**Hozzáadott determinisztikus FSM hangszerelő a többlépcsős ügynöki munkafolyamatokhoz. -**Graceful Degradation:**Új, többrétegű tartalék keretrendszer került hozzáadásra az alapvető funkciók megőrzése érdekében részleges rendszerleállások esetén. -**Config Audit:**Hozzáadott egy audit nyomvonal különbségészléssel a változások nyomon követéséhez és a konfiguráció visszaállításának engedélyezéséhez. -**Szolgáltató állapota:**Hozzáadott szolgáltatói lejárati nyomon követés proaktív felhasználói felületi riasztásokkal a lejáró API-kulcsokról. -**Adaptív útválasztás:**Adaptív hangerő- és összetettség-érzékelővel, amely dinamikusan, a terhelés alapján felülbírálja az útválasztási stratégiákat. -**Provider Diversity:**A szolgáltatói diverzitás pontozása Shannon-entropián keresztül a terheléselosztás javítása érdekében. -**Határok automatikus letiltása:**A Tiltott fiókok automatikus letiltása beállítási kapcsolót hozzáadtuk a rugalmassági irányítópulthoz.### 🐛 Bug Fixes

-**Codex és Claude kompatibilitás:**Javítva a felhasználói felület visszaesései, javított Codex nem adatfolyam-integrációs problémák, és megoldódott a CLI futásidejű észlelése Windows rendszeren. -**Release Automation:**Kibővített engedélyek szükségesek a GitHub Actions Electron App buildjéhez. -**Cloudflare Runtime:**Megfelelő futásidejű elkülönítési kilépési kódok a Cloudflared alagút-összetevők számára.### 🧪 Tests

-**Test Suite frissítések:**Kibővített tesztelési lefedettség a mennyiségérzékelők, a szolgáltatók sokfélesége, a konfigurációs audit és az FSM számára.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD megbízhatóság:**Javított GitHub-műveletek stabil függőségi verziókra ("actions/checkout@v4", "actions/upload-artifact@v4"), hogy csökkentsék a be nem jelentett építői környezet elavulását. -**Image Fallback:**A `ProviderIcon.tsx` tetszőleges tartalék láncait explicit eszközérvényesítéssel cseréltük le, hogy megakadályozzuk az `<Image>` komponensek kezelőfelületének betöltését a nem létező fájlok esetében, így kiküszöbölve a 404-es hibákat az irányítópult konzolnaplóiban (#745). -**Admin Updater:**Dinamikus forrástelepítés-észlelés az irányítópult-frissítőhöz. Biztonságosan letiltja a "Frissítés most" gombot, ha az OmniRoute helyben épül fel, nem pedig npm-en keresztül, és a "git pull" parancsot kéri (#743). -**ERESOLVE frissítési hiba:**A beinjektált "package.json" felülírja a "react"/"react-dom" paramétert, és engedélyezve van a "--legacy-peer-deps" a belső automatikus frissítő szkriptekben, hogy feloldja a "@lobehub/ui" függőségi fa ütközéseket.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare alagutak:**Cloudflare Quick Tunnel integráció műszerfali vezérlőkkel (PR #772). -**Diagnosztika:**Szemantikus gyorsítótár bypass kombinált élő tesztekhez (PR #773).### 🐛 Bug Fixes

-**Streamelési stabilitás:**Alkalmazza a `FETCH_TIMEOUT_MS` parancsot a streamelési kérelmek kezdeti `fetch()-hívására, hogy megakadályozza, hogy a 300s Node.js TCP időtúllépése néma feladat-hibákat okozzon (#769). -**i18n:**Adja hozzá a hiányzó "windsurf" és "copilot" bejegyzéseket a "toolDescriptions"-hez mind a 33 területi fájlban (#748). -**GLM Coding Audit:**Teljes körű szolgáltatói audit a ReDoS sebezhetőségeinek kijavításával, a kontextusablak méretezésével (128k/16k) és a rendszerleíró adatbázis szinkronizálásával (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Tartalék feldolgozási javítás a `type: "text"` elemekhez, amelyek nulla vagy üres adatkészleteket hordoznak, amelyek 400-as elutasítást okoztak (#742). -**Nyílt kód:**Frissítse a sémaigazítást az egyes számú „szolgáltatóra”, hogy megfeleljen a hivatalos specifikációnak (#774). -**Gemini CLI:**A hiányzó végfelhasználói kvótafejlécek beszúrása megakadályozza a 403-as engedélyezési zárolást (#775). -**DB helyreállítás:**Refaktor többrészes hasznos adatimportálás nyers bináris pufferelt tömbökbe, hogy megkerülje a fordított proxy maximális törzskorlátait (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilization**– A v3.2.9 verzió véglegesítése (kombinált diagnosztika, minőségi kapuk, Gemini eszközjavítás) és hiányzó git címke létrehozása. Az összes fokozatos változtatást egyetlen atomi kiadási véglegesítésben egyesítette.### 🐛 Bug Fixes

-**Automatikus frissítési teszt**— Javítva a `buildDockerComposeUpdateScript' teszt állítás, hogy illeszkedjen a kibontatlan shell-változóhivatkozásokhoz (`$TARGET_TAG`, `${TARGET_TAG#v}`) a generált telepítési parancsfájlban, igazodva a v3.2-es verzióból származó újrafaktorált sablonhoz.
-**Circuit Breaker Test**— Megerősített `combo-circuit-breaker.test.mjs`a`maxRetries: 0' beadásával, hogy megakadályozza, hogy az újrapróbálkozási felfújás eltorzítsa a hibaszámlálási állításokat a megszakító állapotátmenetek során.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Kombinált diagnosztika**– Bevezetett egy élő teszt megkerülési jelzőt ("forceLiveComboTest"), amely lehetővé teszi az adminisztrátorok számára, hogy valódi upstream állapotellenőrzéseket hajtsanak végre, amelyek megkerülik az összes helyi megszakító és lehűlés állapotát, lehetővé téve a pontos diagnosztikát a folyamatos leállások során (PR #759) -**Minőségi kapuk**– Automatikus válaszminőség-ellenőrzés hozzáadva a kombinációkhoz és hivatalosan integrált `claude-4.6` modell támogatás az alapvető útválasztási sémákba (PR #762)### 🐛 Bug Fixes

-**Tool Definition Validation**- Javított Gemini API integráció az enum típusok normalizálásával az eszközdefiníciókon belül, megelőzve az upstream HTTP 400 paraméterhibákat (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**– Integrált egy leválasztott háttérfrissítési folyamat a Docker Compose-telepítésekhez. A Dashboard UI mostantól zökkenőmentesen követi a frissítési életciklus-eseményeket, kombinálva a JSON REST válaszokat az SSE streamelési folyamatátfedőkkel a robusztus, több környezeti megbízhatóság érdekében. -**Cache Analytics**– Javított nulla metrika vizualizációs leképezés a szemantikus gyorsítótár telemetriai naplóinak közvetlenül a központi nyomkövető SQLite modulba történő migrálásával.### 🐛 Bug Fixes

-**Authentication Logic**– Kijavítottuk azt a hibát, amely miatt a műszerfal beállításainak mentése vagy a modellek hozzáadása nem sikerült 401-es jogosulatlan hibával, amikor a „requireLogin” le volt tiltva. Az API-végpontok most megfelelően értékelik a globális hitelesítési kapcsolót. A globális átirányítás az `src/middleware.ts` újraaktiválásával megoldva. -**CLI Tool Detection (Windows)**— Megakadályozza a végzetes inicializálási kivételeket a CLI-környezet észlelése során a "cross-spawn" ENOENT hibák helyes elkapásával. Explicit észlelési útvonalakat ad hozzá a \AppData\Local\droid\droid.exe fájlhoz. -**A Codex Native Passthrough**– Normalizált modellfordítási paraméterek, amelyek megakadályozzák a kontextusmérgezést proxy áthárítási módban, általános "store: false" megszorításokat kényszerítenek ki kifejezetten minden Codex-eredetű kérésre. -**SSE Token Reporting**– Normalizált szolgáltatói eszközhívási csonk `finish_reason` észlelése, 0%-os fixálás Használati elemzés a csak adatfolyam-válaszokra vonatkozóan, amelyekből hiányoznak a szigorú `<KÉSZ>` jelzők. -**DeepSeek <think> címkék**— Explicit `<think>` kivonatolást valósított meg a `responsesHandler.ts`-en belül, biztosítva, hogy a DeepSeek érvelési adatfolyamok egyenértékűek legyenek a natív antropikus `<gondolkodás>` struktúrákkal.---

## [3.2.7] - 2026-03-29

### Fixed

-**Zökkenőmentes felhasználói felület frissítései**: Az irányítópult „Frissítés most” funkciója mostantól élő, átlátható visszajelzést ad a szerver által küldött események (SSE) segítségével. Csomagtelepítést, natív modul-újraépítést (jobb sqlite3) hajt végre, és a PM2 megbízhatóan újraindul, miközben valós idejű betöltőket jelenít meg a csendes lógás helyett.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API-kulcs felfedése (#740)**– hatókörű API-kulcsmásolási folyamat hozzáadva az Api Managerhez, amelyet az `ALLOW_API_KEY_REVEAL' környezeti változó véd. -**Az oldalsáv láthatóságának vezérlői (#739)**– A rendszergazdák mostantól elrejthetik az oldalsáv bármely navigációs hivatkozását a Megjelenés beállításaiban a vizuális zűrzavar csökkentése érdekében. -**Szigorú kombinált tesztelés (#735)**– Megerősítette a kombinált állapotellenőrzési végpontot, hogy a modellektől élő szöveges válaszokat írjon elő a puha elérhetőségi jelek helyett. -**Részletes adatfolyamos naplók (#734)**- Váltott részletes kérésnaplózás az SSE adatfolyamokhoz a végső hasznos terhelés rekonstrukciója érdekében, óriási mennyiségű SQLite adatbázis megtakarítást jelent, és jelentősen megtisztítja a felhasználói felületet.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**– Javítottuk a hitelesítési fejléc logikáját a „minimax” modelleknél az OpenCode Go-n, hogy az „x-api-key”-t használja a szabványos vivőtokenek helyett a „/messages” protokollon keresztül.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Vid Linux Deployment Support (#732)**- Integrált "xbps-src" csomagsablon és utasítások az OmniRoute natív fordításához és telepítéséhez "jobb-sqlite3" kötésekkel keresztfordítási célon keresztül.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**- A régi "iFlow" magszolgáltató teljes áttelepítése a "Qoder AI" szolgáltatásba, a stabil API-útválasztási képességek fenntartása érdekében.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— Megakadályozták a "thoughtSignature" tömbbefecskendezéseket a szabványos Gemini "functionCall" szekvenciákon belül, amelyek blokkolják az ügynöki útválasztási folyamatokat.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**- Normalizált kvótakorlátozási logika és adatcímkézés a Limits felületen belül.### 🐛 Bug Fixes

-**Alapvető útválasztási sémák és szivárgások**– Kibővített „comboStrategySchema”, hogy natívan támogassa a „fill-first” és „p2c” stratégiákat a komplex kombinált szerkesztés natív módon történő feloldásához. -**Gondolkodó címkék kivonása (CLI)**— Átstrukturált CLI-jogkivonat-válaszok fertőtlenítője, a RegEx, amely rögzíti a modell-gondolkodási struktúrákat az adatfolyamokon belül, elkerülve a törött `<gondolkodás>`-kivonásokat, amelyek megtörik a válaszszöveg kimeneti formátumát. -**Strict Format Enforcements**– Megerősített csővezeték-fertőtlenítés, így univerzálisan alkalmazható a fordítási mód célokra.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Négylépcsős kérésnapló-folyamat (#705)**– Újrafaktorált naplózás, amely átfogó hasznos terheket menthet négy különböző folyamatszakaszban: Ügyfélkérés, Lefordított szolgáltatói kérelem, Szolgáltatói válasz és Fordított ügyfélválasz. Bevezettük a "streamPayloadCollector"-t a robusztus SSE adatfolyam csonkolásához és a hasznos terhelések sorosításához.### 🐛 Bug Fixes

-**Mobil UI javítások (#659)**- Megakadályozta, hogy az irányítópulton lévő táblázatösszetevők megtörjék az elrendezést a keskeny nézetablakokon azáltal, hogy megfelelő vízszintes görgetést és túlcsordulás-korlátozást adtak hozzá a "DashboardLayout"-hoz. -**Claude Prompt gyorsítótár-javítások (#708)**— A Claude-Claude tartalék hurkokban a `cache_control' blokkok hűséges megőrzése és biztonságos visszaadása az antropikus modelleknek. -**Gemini Tool Definitions (#725)**- Javítottuk a sémafordítási hibákat az egyszerű "objektum" paramétertípusok deklarálásakor a Gemini függvényhíváshoz.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**– Ha az összes kombinált modell kimerült (502/503), az OmniRoute most megpróbál egy konfigurálható globális tartalék modellt, mielőtt visszaadja a hibát. Az engedélyezéshez állítsa be a "globalFallbackModel" beállítást a beállításokban.### 🐛 Bug Fixes

-**Fix #721**— Javítva a kontextus rögzítésének megkerülése eszközhívási válaszok során. A nem adatfolyamos címkézés rossz JSON-útvonalat használt (`json.messages` → `json.choices[0].message`). Az adatfolyam-injektálás mostantól a "finish_reason" darabokon aktiválódik a csak eszközhívásos adatfolyamoknál. Az `injectModelTag()` mostantól szintetikus PIN-üzeneteket fűz hozzá a nem karakterláncos tartalomhoz. -**Javítás #709**— Megerősítve, hogy már javítva (v3.1.9) — `system-info.mjs` rekurzívan hoz létre könyvtárakat. Zárt. -**707-es javítás**— Megerősítve, hogy már javítva (v3.1.9) — üres eszköznév-tisztítás a `chatCore.ts-ben. Zárt.### 🧪 Tests

- 6 egységteszt hozzáadva a kontextus rögzítéséhez eszközhívási válaszokkal (null tartalom, tömbtartalom, körút, újrainjektálás)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**- Egy dedikált szemantikus gyorsítótárazási irányítópult hozzáadva a \`/dashboard/cache\` címen célzott API érvénytelenítéssel és 31 nyelvű i18n támogatással (PR #701, @oyi77) -**GLM-kvótakövetés**– Valós idejű használati és munkamenet-kvótakövetés hozzáadva a GLM-kódolási (Z.AI) szolgáltatóhoz (PR #698, @christopher-s) -**Részletes naplózási adatok**– Vezetékes, négylépcsős csővezetékes hasznos adatrögzítés (eredeti, lefordított, szolgáltatói válasz, streamelt delta) közvetlenül a felhasználói felületre (PR #705, @rdself)### 🐛 Bug Fixes

-**708-as javítás**– Megakadályozták a token-kivérzést az OmniRoute-on keresztül továbbító Claude Code-felhasználók számára a natív \`cache_control\` fejlécek megfelelő megőrzésével a Claude-Claude áthárítás során (PR #708, @tombii) -**719-es javítás**- Belső hitelesítési határok beállítása a \`ModelSyncScheduler\` számára, hogy megakadályozza a hitelesítés nélküli démonhibákat indításkor (PR #719, @rdself) -**718. számú javítás**– Újraépített jelvény-megjelenítés a Provider Limits UI-ban, amely megakadályozza a rossz kvótahatárok átfedését (PR #718, @rdself) -**704-es javítás**– Javítva a kombinált visszaesések a HTTP 400 tartalomházirendi hibáinál, amelyek megakadályozzák a modell-rotáció halott útválasztását (PR #704, @rdself)### 🔒 Security & Dependencies

- A \`path-to-regexp\` a \`8.4.0\`-ba ütközött, feloldva a dependabot sebezhetőségeit (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**706-os javítás**– Javítva az ikonok visszaállítása, amelyet a Tailwind V4 `font-sans` felülbírálása okozott a `!important` alkalmazásával a `.material-symbols-outlined`-re. -**703. számú javítás**– Javítottuk a GitHub másodpilóta meghibásodott adatfolyamait azáltal, hogy engedélyezte a „responses” „openai” formátumra történő fordítását az „apiFormat: „responses”-t kihasználó egyéni modelleknél. -**702-es javítás**– Az átalánydíjas felhasználáskövetést pontos DB árkalkulációkkal cserélték le mind a streaming, mind a nem adatfolyamos válaszok esetében. -**716-os javítás**- A Claude eszközhívás fordítási állapotának megtisztítása, a streaming argumentumok helyes elemzése, és megakadályozva, hogy az OpenAI "tool_calls" darabjai megismételjék az "id" mezőt.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Sémakényszer**– Karakterlánc-kódolt numerikus JSON-séma-korlátozások (pl. `"minimum": "1"`) automatikus kényszerítése a megfelelő típusokra, megakadályozva a 400-as hibákat a Cursor, a Cline és más, hibásan formázott eszközsémákat küldő ügyfelektől. -**Eszközleírás-fertőtlenítés**— Győződjön meg arról, hogy az eszközleírások mindig karakterláncok; üres karakterláncokká alakítja a "null", "undefined" vagy numerikus leírásokat, mielőtt elküldené a szolgáltatóknak. -**Minden modell törlése gomb**– i18n-fordítások hozzáadva a „Minden modell törlése” szolgáltatói művelethez mind a 30 nyelven. -**Codex Auth Export**– Codex `auth.json` export és alkalmazza a helyi gombokat a zökkenőmentes CLI-integráció érdekében. -**Windsurf BYOK Megjegyzések**— Hivatalos korlátozási figyelmeztetések hozzáadva a Windsurf CLI eszközkártyához, dokumentálva a BYOK korlátozásokat.### 🐛 Bug Fixes

-**#709-es javítás**— A `system-info.mjs` többé nem omlik össze, ha nem létezik a kimeneti könyvtár (hozzáadva az `mkdirSync` rekurzív jelzővel). -**710. számú javítás**– Az A2A `TaskManager` singleton mostantól a `globalThis-t használja, hogy megakadályozza az állapotszivárgást a Next.js API útvonal-újrafordításai között fejlesztői módban. Az E2E tesztcsomag frissítve, hogy kecsesen kezelje a 401-et.
-**711. számú javítás**– Hozzáadott szolgáltató-specifikus `max*tokens`felső határértéket az upstream kérésekhez.
-**Javítás #605 / #592**— Törölje le a`proxy*` előtagot az eszközök nevéből a nem adatfolyamos Claude-válaszokban; rögzített LongCat érvényesítési URL.
-**Hívásnaplók max. korlátja**— Frissített "getMaxCallLogs()" gyorsítótári réteggel, env var támogatással (`CALL_LOGS_MAX') és DB-beállítások integrációjával.### 🧪 Tests

- A tesztcsomag 964 → 1027 tesztről bővült (63 új teszt)
- Hozzáadott "schema-coercion.test.mjs" – 9 teszt a numerikus mezők kényszerítéséhez és az eszközleírás-fertőtlenítéshez
- Hozzáadott "t40-opencode-cli-tools-integration.test.mjs" - OpenCode/Windsurf CLI integrációs tesztek
- Továbbfejlesztett funkciótesztek ág átfogó lefedettségi eszközökkel### 📁 New Files

| Fájl                                                     | Cél                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema coercion and tool description sanitization utilities |
| `tests/unit/schema-coercion.test.mjs`                    | Egységtesztek sémakényszerhez                               |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI eszköz integrációs tesztek                              |
| `COVERAGE_PLAN.md`                                       | Tesztlefedettség tervezési dokumentum                       | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**– Javítva a cache_control markerek eltávolítása Claude áthárítási módban (Claude → OmniRoute → Claude), ami miatt a Claude Code felhasználói 5-10-szer gyorsabban kimerítették Anthropic API kvótájukat, mint a közvetlen kapcsolatok. Az OmniRoute mostantól megőrzi a kliens cache_control markereit, ha a sourceFormat és a targetFormat egyaránt Claude, így biztosítva a gyors gyorsítótárazás megfelelő működését és drámai módon csökkentve a token felhasználást.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platformmag:**Megvalósított globális állapotkezelés a rejtett modellekhez és kombókhoz, amelyek megakadályozzák, hogy összezavarják a katalógust, vagy beszivárogjanak a csatlakoztatott MCP-ügynökökbe (#681). -**Stabilitás:**A natív Antigravity szolgáltató integrációjával kapcsolatos javított adatfolyam-összeomlások a kezeletlen, nem definiált állapottömbök miatt (#684). -**Lokalizációs szinkronizálás:**Teljesen felújított "i18n" szinkronizáló üzembe helyezése, amely észleli a hiányzó beágyazott JSON-tulajdonságokat, és 30 területi beállítást utólag egymás után (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Streaming stabilitás:**Javítva a `hasValuableContent`, amely `undefined`-et tér vissza az SSE adatfolyamok üres darabjaihoz (#676). -**Eszközhívás:**Kijavítottunk egy hibát a `sseParser.ts' fájlban, ahol a nem adatfolyam Claude-válaszok több eszközhívással a helytelen index-alapú duplikáció miatt (#671) eldobták a további eszközhívások `id-jét.---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**– Az olyan eszközök neveihez, mint a `TodoWrite`, már nem szerepel a `proxy_` előtag a Claude áthárítási válaszaiban (adatfolyamos és nem adatfolyamos). Tartalmazza az egységteszt lefedettségét (PR #663, @coobabm) -**Az összes modell alias törlése**– Az "Összes modell törlése" gomb mostantól a társított modellálneveket is eltávolítja, megakadályozva a szellemmodelleket a felhasználói felületen (PR #664, @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**– A korlátozott arányú fiókok mostantól automatikusan helyreállnak, amikor lejárt a leállási időszakuk, kiküszöbölve a holtpontot, ahol a magas "backoffLevel" tartósan prioritás nélkülivé tette a fiókokat (PR #657, @brendandebeasi)### 🌍 i18n

-**Kínai fordítás átalakítása**– A „zh-CN.json” átfogó újraírása megnövelt pontossággal (PR #658, @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming override Fix**– Az explicit "stream: true" a kérelem törzsében most elsőbbséget élvez az "Accept: application/json" fejléccel szemben. Azok az ügyfelek, akik mindkettőt küldik, helyesen kapják meg az SSE streaming válaszokat (#656)### 🌍 i18n

-**Cseh karakterlánc-javítások**- Finomított terminológia a `cs.json-ban (PR #655, @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 hiányzó fordítókulcs**hozzáadva az "en.json"-hoz és 12 nyelvhez (PR #652, @zen0bit) -**A cseh dokumentáció frissítve**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT útmutatók (PR #652) -**Fordítás-ellenőrző szkriptek**– `check_translations.py` és `validate_translation.py` CI/QA-hoz (PR #651, @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritikus: Szerszámhívási regresszió**— Javítva a `proxy_Bash` hibák a `proxy_` eszköznév előtag letiltásával a Claude áthaladási útvonalon. Az olyan eszközöket, mint a „Bash”, „Read”, „Write” átnevezték „proxy_Bash”, „proxy_Read” stb. névre, ami miatt Claude elutasította őket (#618) -**Kiro-fiók tiltásának dokumentációja**– AWS-előoldali csalás elleni álpozitívként dokumentálva, nem OmniRoute probléma (#649)### 🧪 Tests

-**936 teszt, 0 hiba**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Vision Capability Metadata**: "capabilities.vision", "input_modalities" és "output_modalities" hozzáadva a "/v1/models" bejegyzésekhez a látásképes modelleknél (PR #646) -**Gemini 3.1-es modellek**: „gemini-3.1-pro-preview” és „gemini-3.1-flash-lite-preview” hozzáadva az Antigravity szolgáltatóhoz (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-es hiba**: A helytelen API-alap URL-cím javítása – „api.ollama.com” helyett hivatalos „ollama.com/v1/chat/completions” (#643) -**Lejárt token újrapróbálkozás**: Hozzáadott korlátos újrapróbálkozás exponenciális visszalépéssel (5→10→20 perc) a lejárt OAuth-kapcsolatokhoz, ahelyett, hogy véglegesen kihagynák azokat (PR #647)### 🧪 Tests

-**936 teszt, 0 hiba**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub problémasablonok**: szabványos hibajelentés, funkciókérelem és konfigurációs/proxyprobléma sablonok hozzáadva (#641) -**Összes modell törlése**: "Összes modell törlése" gomb hozzáadva a szolgáltató részletes oldalához i18n támogatással 29 nyelven (#634)### 🐛 Bug Fixes

-**Language Conflict ("in.json")**: A hindi nyelvi nyelvi fájl átnevezése "in.json"-ról (indonéz ISO-kód) "hi.json"-ra, hogy kijavítsa a fordítási ütközéseket a Weblate-ben (#642) -**Üres Codex Tool Names**: Az eszköznév-tisztítás áthelyezése a natív Codex áthárítás elé, 400 hiba kijavítása az upstream szolgáltatóktól, amikor az eszközöknek üres volt a neve (#637) -**Újsor-műtermékek streamelése**: `collapseExcessiveNewlines` hozzáadva a válasz-fertőtlenítőhöz, így a gondolkodó modellek 3+ egymást követő újsorát szabványos dupla újsorrá csukja össze (#638) -**Claude Reasoning Effort**: Az OpenAI „reasoning_effort” paraméter Claude natív „gondolkodó” költségvetési blokkjára konvertálva az összes kérési útvonalon, beleértve az automatikus „max_tokens” beállítást is (#627) -**Qwen Token Refresh**: Proaktív, lejárat előtti OAuth-token frissítések (5 perces puffer), hogy megakadályozzák a kérések sikertelenségét rövid élettartamú tokenek használatakor (#631)### 🧪 Tests

-**936 teszt, 0 hiba**(+10 teszt 3.0.9 óta)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN tokenek a Claude Code-ban / kliens válaszai (#617):**

- A "sanitizeUsage()" most keresztleképezi az "input_tokens" → "prompt_tokens" és az "output_tokens" → "completion_tokens" elemeket az engedélyezési lista szűrője előtt, javítva a NaN/0 tokenszámot mutató válaszokat, amikor a szolgáltatók Claude-stílusú használati mezőneveket adnak vissza.### Biztonság

- Frissített "yaml" csomag a verem túlcsordulási sebezhetőségének javítása érdekében (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Zárt #613 (Codestral – egyéni szolgáltató megoldásával megoldva)
- Megjegyzés: #615 (OpenCode kettős végpont – megoldás biztosított, funkciókérésként követve)
- Megjegyzés: #618 (eszközhívás láthatósága – v3.0.9 teszt kérése)
- Megjegyzés: #627 (erőkifejtés szintje – már támogatott)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Fordítási hibák az OpenAI-formátumú szolgáltatók számára a Claude CLI-ben (#632):**

- Kezelje a `reasoning_details[]` tömbformátumot a StepFun/OpenRouter-ből – `reasoning_content` formátummá konvertálja
- Kezelje egyes szolgáltatók `reasoning` mezőjének álneveit → normalizálva a `reasoning_content` értékre
- Kereszttérképes használati mezők nevei: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` a `filterUsageForFormat`-ban
- Javítsa ki az "extractUsage" paramétert, hogy az "input_tokens"/"output_tokens" és a "prompt_tokens"/"completion_tokens" is érvényes használati mezőként kerüljön elfogadásra
- A streamelési (`sanitizeStreamingChunk`, `openai-to-claude.ts` fordító) és a nem streamelési (`sanitizeMessage`) útvonalra egyaránt vonatkozik---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Javítva a „kliens_secret hiányzik” hiba az npm-re telepített felhasználóknál – a „clientSecretDefault” üres volt a providerRegistry-ben, ami miatt a Google elutasította a tokenfrissítési kérelmeket (#588) -**OpenCode Zen Models:**`modelsUrl` hozzáadva az OpenCode Zen rendszerleíró bejegyzéshez, így az "Importálás a /models-ból" megfelelően működik (#612) -**Streamelési melléktermékek:**Javítva a túlzott újsorok a válaszokban a gondolkodási címke aláírásának eltávolítása után (#626) -**Proxy tartalék:**Hozzáadott automatikus újrapróbálkozás proxy nélkül, ha a SOCKS5 relé meghibásodik -**Proxy teszt:**A tesztvégpont mostantól a proxyID-n keresztül oldja fel a valódi hitelesítő adatokat a DB-ből### ✨ New Features

-**Játszótér fiók/kulcsválasztó:**Állandó, mindig látható legördülő menü adott szolgáltatói fiókok/kulcsok kiválasztásához tesztelésre – lekéri az összes kapcsolatot indításkor, és a kiválasztott szolgáltató szerint szűri -**CLI Tools Dynamic Models:**A modellek kiválasztása mostantól dinamikusan lekérhető a `/v1/models' API-ból – az olyan szolgáltatók, mint a Kiro, most megmutatják teljes modellkatalógusukat -**Antigravitációs modelllista:**Frissítve a Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini verziókkal; engedélyezett "passthroughModels" a dinamikus modelleléréshez (#628)### 🔧 Maintenance

- Egyesített PR #625 – Szolgáltató korlátozza a világos mód háttérjavítását---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limits/Proxy:**Rögzített Codex limit-lekérés a SOCKS5 proxyk mögötti fiókokhoz – a token frissítése mostantól a proxykontextuson belül fut -**CI:**Javítva a „v1/models” integrációs teszt érvényesítési hibája szolgáltatói kapcsolatok nélküli CI-környezetekben -**Beállítások:**A proxyteszt gomb most azonnal megjeleníti a sikeres/sikertelen eredményeket (korábban az egészségügyi adatok mögött rejtve volt)### ✨ New Features

-**Játszótér:**Hozzáadott Fiókválasztó legördülő menü – egyedi kapcsolatok tesztelése, ha egy szolgáltató több fiókkal rendelkezik### 🔧 Maintenance

- Egyesített PR #623 – LongCat API alap URL-útvonal-javítása---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Címkecsoportosítási funkció hozzáadva a kapcsolatok irányítópultjához az egyéni címkékkel rendelkező fiókok vizuális rendszerezésének javítása érdekében.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Javítva a `TextDecoder` állapotsérülés a `sanitize` TransformStream kombóban, ami miatt az SSE torz kimenete többbájtos karaktereknek megfelelő (PR #614) -**Providers UI:**A HTML-címkék biztonságos megjelenítése a szolgáltatói csatlakozási hibák eszköztippjein belül a "dangerouslySetInnerHTML" használatával -**Proxybeállítások:**Hiányzó "felhasználónév" és "jelszó" törzstulajdonságok hozzáadva, amelyek lehetővé teszik a hitelesített proxyk sikeres ellenőrzését az irányítópultról. -**Szolgáltatói API:**A kötött puha kivétel visszatér a "getCodexUsage"-hez, megakadályozva az API HTTP 500 meghibásodását, ha a token lekérése sikertelen---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Automatikus szinkronizálási modellek:**Hozzáadott egy UI kapcsolót és egy "sync-models" végpontot a modelllisták szolgáltatónkénti automatikus szinkronizálásához egy ütemezett intervallumütemező segítségével (PR #597)### 🐛 Bug Fixes

-**Időtúllépések:**A `FETCH_TIMEOUT_MS` és a `STREAM_IDLE_TIMEOUT_MS` alapértelmezett proxyk 10 percre emelve, hogy megfelelően támogassák a mély érvelési modelleket (például az o1-et) a kérések megszakítása nélkül (609-es javítás) -**CLI eszköz észlelése:**Továbbfejlesztett platformok közötti észlelés kezelése NVM útvonalak, Windows PATHEXT (megakadályozza a .cmd burkolókkal kapcsolatos problémát) és egyéni NPM előtagok (PR #598) -**Streaming naplók:**Implementált "tool_calls" delta felhalmozódás a streaming válasznaplókban, így a függvényhívások nyomon követhetők és pontosan megmaradnak a DB-ben (PR #603) -**Modelkatalógus:**Eltávolított hitelesítési mentesség, megfelelően elrejti a "comfyui" és "sdwebui" modelleket, ha nincs kifejezetten beállítva szolgáltató (PR #599)### 🌐 Translations

-**cs:**Továbbfejlesztett cseh fordítási karakterláncok az alkalmazásban (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Hozzáadott egy Címke/Csoport mezőt az "EditConnectionModal"-hoz (a "providerSpecificData.tag"-ben tárolva) anélkül, hogy DB sémaáttelepítésre lenne szükség.
- A szolgáltatói nézetben látható kapcsolatok mostantól dinamikusan csoportosíthatók címkénként vizuális elválasztókkal.
- A címkézetlen kapcsolatok először fejléc nélkül jelennek meg, majd a címkézett csoportok ábécé sorrendben.
- A címkecsoportosítás automatikusan vonatkozik a Codex/Copilot/Antigravitity Limits szakaszra, mivel a kapcsolódási sorokon belül léteznek kapcsolók.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Hiányzó jelvények a csatlakozási kártyákon:**A statikus leképezés helyett a "resolveProxyForConnection()" használatával javítva. -**A kapcsolat tesztelése letiltva mentett módban:**Engedélyezte a Teszt gombot a proxy konfigurációjának a mentett listából történő feloldásával. -**Config Modal freezing:**"onClose()" hívások hozzáadva a mentés/törlés után, hogy megakadályozzák a felhasználói felület lefagyását. -**Kettős használat számlálása:**A `ProxyRegistryManager` most már lelkesen betölti a használatot a csatlakoztatáskor a `scope` + `scopeId` függvények duplikációjának megszüntetésével. A felhasználási számokat egy Teszt gomb váltotta fel, amely soron belül jeleníti meg az IP/latenciát.#### fix(translator): `function_call` prefix stripping

- Javítottunk egy hiányos javítást a PR #607-ből, ahol csak a "tool*use" blokkok eltávolították Claude "proxy*" eszközelőtagját. Mostantól az OpenAI Responses API formátumot használó ügyfelek a proxy\_ előtag nélkül is megfelelően kapják meg az eszközeszközöket.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

A felhasználók által a v3.0.0 indítása után jelentett három kritikus regresszió megoldódott.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

A Claude OAuth által hozzáadott `proxy_` előtag csak a**streaming**válaszoktól lett megfosztva.**Non-streaming**módban a `translateNonStreamingResponse` nem férhetett hozzá a `toolNameMap`-hez, így az ügyfelek olyan összekeveredett eszközneveket kaptak, mint a `proxy_read_file` a `read_file` helyett.

**Javítás:**Opcionális `toolNameMap` paraméter hozzáadása a `translateNonStreamingResponse` paraméterhez, és előtag-levonás került alkalmazásra a Claude `tool_use` blokkkezelőjében. A `chatCore.ts` most áthalad a térképen.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

A LongCat AI nem teszi közzé a "GET /v1/models" fájlt. Az általános "validateOpenAICompatibleProvider" érvényesítő csak akkor esett át a csevegés-befejezési tartalékba, ha a "validationModelId" be volt állítva, amit a LongCat nem konfigurál. Emiatt a szolgáltató ellenőrzése meghiúsult, és félrevezető hiba történt a hozzáadása/mentés során.

**Javítás:**„Longcat” hozzáadva a speciális érvényesítők térképéhez, amely közvetlenül megvizsgálja a „/chat/completions” elemet, és minden nem hitelesítési választ átadásként kezel.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Az MCP-eszközök (pl. "ceruza", "számítógép_használata") a "{type:"object"}" paraméterrel továbbítják az eszközdefiníciókat, de "properties" mező nélkül. Az Anthropic API ezeket a következőkkel utasítja el: `objektum séma hiányzik tulajdonságai`.

**Javítás:**Az `openai-to-claude.ts` fájlba írja be a `properties: {}` értéket biztonságos alapértelmezésként, ha a `type` értéke `"object"", és a "properties" hiányzik.---

### 🔀 Community PRs Merged (2)

| PR       | Szerző  | Összegzés                                                                                            |
| -------- | ------- | ---------------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): a Playground és a Testbed orosz fordításának javítása                                    |
| **#591** | @rdself | fix(ui): a szolgáltató javítása Korlátozza a fénymód kontrasztját és megtervezi a rétegmegjelenítést | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 teszt, 0 hiba**(változatlan a 3.0.0-hoz képest)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **A valaha volt legnagyobb kiadás.**A 36 szolgáltatótól a 2.9.5-ös verzióban a**67+ szolgáltatóig**a 3.0.0 verzióban – MCP-kiszolgálóval, A2A protokollal, automatikus kombinált motorral, szolgáltatói ikonokkal, regisztrált kulcsok API-val, 926 teszttel és**12 közösségi tag**hozzájárulásával\*\*10 egyesített PR-n keresztül.
>
> Konszolidálva a v3.0.0-rc.1-től az rc.17-ig (17 kiadásjelölt 3 napos intenzív fejlesztés alatt).---

### 🆕 New Providers (+31 since v2.9.5)

| Szolgáltató                   | Alias ​​          | Tier            | Megjegyzések                                                                                     |
| ----------------------------- | ----------------- | --------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`    | Ingyenes        | 3 modell az `opencode.ai/zen/v1`-n keresztül (PR #530, @kang-heewon)                             |
| **OpenCode Go**               | `opencode-go`     | Fizetett        | 4 modell az `opencode.ai/zen/go/v1`-n keresztül (PR #530, @kang-heewon)                          |
| **LongCat AI**                | "lc"              | Ingyenes        | 50 millió token/nap (Flash-Lite) + 500 000/nap (csevegés/gondolkodás) nyilvános bétaverzió alatt |
| **Beporzás AI**               | "pol"             | Ingyenes        | Nincs szükség API-kulcsra – GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 igény/15 mp)          |
| **Cloudflare Workers AI**     | "cf"              | Ingyenes        | 10 000 neuron/nap – ~150 LLM válasz vagy 500 s Suttogó hang, élkövetkeztetés                     |
| **Scaleway AI**               | "scw"             | Ingyenes        | 1 millió ingyenes token új fiókokhoz – EU/GDPR-kompatibilis (Párizs)                             |
| **AI/ML API**                 | "cél"             | Ingyenes        | 0,025 USD/nap ingyenes kredit – 200+ modell egyetlen végponton keresztül                         |
| **Puter AI**                  | "pu"              | Ingyenes        | 500+ modell (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                            |
| **Alibaba Cloud (DashScope)** | "ali"             | Fizetett        | Nemzetközi + Kína végpontok az `alicode`/`alicode-intl`                                          |
| **Alibaba kódolási terv**     | "bcp"             | Fizetett        | Alibaba Model Studio Anthropic-kompatibilis API-val                                              |
| **Kimi kódolás (API-kulcs)**  | "kmca"            | Fizetett        | Dedikált API-kulcs alapú Kimi-hozzáférés (az OAuth-tól elkülönülve)                              |
| **MiniMax kódolás**           | "minimax"         | Fizetett        | Nemzetközi végpont                                                                               |
| **MiniMax (Kína)**            | `minimax-cn`      | Fizetett        | Kína-specifikus végpont                                                                          |
| **Z.AI (GLM-5)**              | "zai"             | Fizetett        | Zhipu AI következő generációs GLM modellek                                                       |
| **Vertex AI**                 | "csúcs"           | Fizetett        | Google Cloud – JSON szolgáltatásfiók vagy OAuth access_token                                     |
| **Ollama felhő**              | "ollamacloud"     | Fizetett        | Ollama által üzemeltetett API szolgáltatás                                                       |
| **Szintetikus**               | "szintetikus"     | Fizetett        | Átjárási modellek átjárója                                                                       |
| **Kilo Gateway**              | "kg"              | Fizetett        | Átjárási modellek átjárója                                                                       |
| **Perplexity Search**         | `pplx-search`     | Fizetett        | Dedikált keresés-földelt végpont                                                                 |
| **Szerper keresés**           | `szerver-keresés` | Fizetett        | Webes kereső API integráció                                                                      |
| **Bátor keresés**             | `bátor keresés`   | Fizetett        | Brave Search API integráció                                                                      |
| **Exa Search**                | `exa-keresés`     | Fizetett        | Neurális keresés API integráció                                                                  |
| **Tavily Search**             | `tavily-search`   | Fizetett        | AI kereső API integráció                                                                         |
| **NanoBanana**                | "nb"              | Fizetett        | Képgeneráló API                                                                                  |
| **ElevenLabs**                | "el"              | Fizetett        | Szövegfelolvasó hangszintézis                                                                    |
| **Cartesia**                  | "cartesia"        | Fizetett        | Ultragyors TTS hangszintézis                                                                     |
| **PlayHT**                    | `playht`          | Fizetett        | Hangklónozás és TTS                                                                              |
| **Belvilág**                  | "belvilág"        | Fizetett        | AI karakter hangcsevegés                                                                         |
| **SD WebUI**                  | `sdwebui`         | Saját házigazda | Stabil diffúziós helyi képgenerálás                                                              |
| **ComfyUI**                   | `comfyui`         | Saját házigazda | ComfyUI helyi munkafolyamat csomópont alapú generálás                                            |
| **GLM kódolás**               | "glm"             | Fizetett        | BigModel/Zhipu kódolás-specifikus végpont                                                        | **Összesen: 67+ szolgáltató**(4 ingyenes, 8 OAuth, 55 API-kulcs) + korlátlan OpenAI/Anthropic-kompatibilis egyéni szolgáltató.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

OmniRoute API-kulcsok automatikus generálása és kiadása programozottan a szolgáltatónkénti és fiókonkénti kvóta betartatásával.

| Végpont                         | Módszer      | Leírás                                             |
| ------------------------------- | ------------ | -------------------------------------------------- |
| `/api/v1/registered-keys`       | "POST"       | Új kulcs kiadása — a nyers kulcs**csak egyszer**   |
| `/api/v1/registered-keys`       | "GET"        | Regisztrált kulcsok listázása (maszkolt)           |
| `/api/v1/registered-keys/{id}`  | "GET/TÖRLÉS" | Metaadatok lekérése / Visszavonás                  |
| `/api/v1/quotas/check`          | "GET"        | A kvóta előzetes ellenőrzése                       |
| `/api/v1/providers/{id}/limits` | "GET/PUT"    | A szolgáltatónkénti kiadási korlátok konfigurálása |
| `/api/v1/accounts/{id}/limits`  | "GET/PUT"    | Fiókonkénti kibocsátási korlátok konfigurálása     |
| "/api/v1/issues/report"         | "POST"       | Kvótaesemények jelentése a GitHub Issues számára   |

**Biztonság:**A kulcsok SHA-256 kivonatként vannak tárolva. A nyers kulcs egyszer látható a létrehozáskor, soha többé nem kérhető le.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ szolgáltatói logó a `@lobehub/icons` React komponensek (SVG) használatával. Tartaléklánc:**Lobehub SVG → meglévő PNG → általános ikon**. Az irányítópult, a szolgáltatók és az ügynökök oldalain alkalmazva szabványos „ProviderIcon” komponenssel.#### 🔄 Model Auto-Sync Scheduler (#488)

A csatlakoztatott szolgáltatók modelllistáit**24 óránként**automatikusan frissíti. A szerver indításakor fut. Konfigurálható a `MODEL_SYNC_INTERVAL_HOURS' segítségével.#### 🔀 Per-Model Combo Routing (#563)

Modellnév-minták (glob) hozzárendelése meghatározott kombinációkhoz az automatikus útválasztáshoz:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Új `modell_combo_mappings` tábla glob-to-regex egyezéssel
- Irányítópult UI szakasz: "Model Routing Rules" soron belüli hozzáadással/szerkesztéssel/váltással/törléssel#### 🧭 API Endpoints Dashboard

Interaktív katalógus, webhooks-kezelés, OpenAPI-nézegető – mindez egyetlen füles oldalon a `/dashboard/endpoint' címen.#### 🔍 Web Search Providers

5 új keresőszolgáltatói integráció:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**– földelt AI-válaszokat tesz lehetővé valós idejű webadatokkal.#### 📊 Search Analytics

Új lap a `/dashboard/analytics' oldalon – szolgáltatók lebontása, gyorsítótár találati aránya, költségkövetés. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

`max_requests_per_day` és `max_requests_per_minute` oszlopok a memórián belüli csúszóablak végrehajtásával, amely HTTP 429-et ad vissza.#### 🎵 Media Playground

Teljes médiageneráló játszótér a „/dashboard/media” címen: képgenerálás, videó, zene, hangátírás (2 GB-os feltöltési korlát) és szövegfelolvasó.---

### 🔒 Security & CI/CD

-**CodeQL-javítás**- Javított 10+ riasztás: 6 polinom-újra, 1 nem biztonságos véletlenszerűség (`Math.random()` → `crypto.randomUUID()`), 1 shell-parancs-injekció -**Útvonal-ellenőrzés**— Zod-sémák + `validateBody()`**176/176 API-útvonalakon**— CI kényszerítve -**CVE javítás**– az XSS sebezhetőség (GHSA-v2wj-7wpq-c8vv) megszüntetése npm felülírással -**Lapott**— Ütközés 3.3.3 → 3.4.2 (CWE-1321 prototípus szennyezés) -**Docker**– Frissített `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**- Gemini CLI OAuth: törölje a végrehajtható hibát, ha a "GEMINI_OAUTH_CLIENT_SECRET" hiányzik a Dockerből -**#549**- A CLI-beállítások útvonalai mostantól a valódi API-kulcsot a "keyId"-ből oldják fel (nem maszkolt karakterláncok) -**#574**— A bejelentkezés többé nem fagy le, miután kihagyta a varázsló jelszavának beállítását -**#506**- A többplatformos "machineId" újraírása (Windows REG.exe → macOS ioreg → Linux → hosztnév tartalék)#### Providers & Routing

-**#536**- LongCat AI: rögzített "baseUrl" és "authHeader" -**#535**- Rögzített modell felülírása: "body.model" helyesen van beállítva "pinnedModel"-re -**#570**- Az előtag nélküli Claude modellek mostantól az Anthropic szolgáltatót választják -**#585**- Az `<omniModel>` belső címkék többé nem szivárognak ki az ügyfelekhez az SSE streaming során -**#493**– Az egyéni szolgáltatói modell elnevezését már nem zavarja az előtagok eltávolítása -**#490**- Streaming + kontextus-gyorsítótár védelem "TransformStream" injekcióval -**#511**— `<omniModel>` címke beszúrva az első tartalomdarabba (nem a `[KÉSZ]` után)#### CLI & Tools

-**#527**- Claude Code + Codex ciklus: a "tool_result" blokkok szöveggé konvertálva -**#524**- Az OpenCode konfigurációja megfelelően mentve (XDG_CONFIG_HOME, TOML formátum) -**#522**— API Manager: eltávolították a félrevezető "Maszkolt kulcs másolása" gombot -**#546**- "--version" az "ismeretlen" értékkel tér vissza Windowson (PR by @k0valik) -**#544**— Biztonságos CLI eszköz észlelése ismert telepítési útvonalakon (PR by @k0valik) -**#510**— A Windows MSYS2/Git-Bash elérési utak automatikusan normalizálódnak -**#492**- A CLI észleli a "mise"/"nvm" által kezelt csomópontot, amikor az "app/server.js" hiányzik#### Streaming & SSE

-**PR #587**— ResolveDataDir importálás visszaállítása a válaszokban Transformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Szűk keresztmetszet 429 végtelen várakozás: várakozó munkák eldobása a sebességkorlátozással (@xandr0s) -**#483**- A "[KÉSZ]" jel után ne hagyd abba a "data: null" utótagot -**#473**- Zombie SSE adatfolyamok: az időtúllépés 300 mp → 120 mp-el csökkentve a gyorsabb visszaállítás érdekében#### Media & Transcription

-**Átírás**— Deepgram `video/mp4` → `audio/mp4` MIME-leképezés, automatikus nyelvérzékelés, írásjelek -**TTS**– „[objektumobjektum]” hibakijelzés javítva az ElevenLabs stílusú beágyazott hibáknál -**Feltöltési korlátok**- A médiaátírás 2 GB-ra nőtt (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**– „requested_model” oszlop a hívásnaplókban (migráció 009) -**T02**— Az üres szövegblokkok eltávolítása a beágyazott "tool_result.content" fájlból -**T03**— `x-codex-5h-*` / `x-codex-7d-*` kvótafejlécek elemzése -**T04**- "X-Session-Id" fejléc külső ragadós útválasztáshoz -**T05**— Rate-limit DB perzisztencia dedikált API-val -**T06**— Fiók deaktiválva → állandó letiltás (1 éves leállás) -**T07**— X-Forwarded-For IP validation (`extractClientIp()`) -**T08**– API-kulcsonkénti munkamenet-korlátok csúszóablak-kényszerítéssel -**T09**— Codex vs Spark sebességkorlátozási hatókörei (külön készletek) -**T10**— A kreditek elfogytak → különálló 1 órás lehűlési tartalék -**T11**— „maximális” érvelési erőfeszítés → 131072 költségvetési token -**T12**— MiniMax M2.7 árbejegyzések -**T13**— Elévült kvótamegjelenítés javítása (ablak tudatosságának visszaállítása) -**T14**- Proxy gyors sikertelen TCP-ellenőrzés (≤2 s, gyorsítótárazott 30 mp) -**T15**– Tömbtartalom normalizálása Anthropic számára -**T23**– Intelligens kvóta-visszaállítási tartalék (fejléc-kivonás) -**T24**— `503` lehűlés + `406` leképezés -**T25**— A szolgáltató érvényesítésének tartaléka -**T29**— Vertex AI szolgáltatásfiók JWT auth -**T33**— Gondolkodási szint a költségvetés átalakítására -**T36**– „403” vs „429” hibabesorolás -**T38**– Központi modellspecifikációk (`modelSpecs.ts`) -**T39**– Végpont-tartalék a "fetchAvailableModels"-hez -**T41**— Háttérfeladat automatikus átirányítása flash modellekre -**T42**— Képgenerálási képarány-leképezés#### Other Improvements

-**Modellenkénti upstream egyéni fejlécek**– konfigurációs felhasználói felületen keresztül (PR #575, @zhangqiang8vip) -**Modell kontextus hossza**– a modell metaadataiban konfigurálható (PR #578, @hijak) -**Modell előtag eltávolítása**– lehetőség a szolgáltatói előtag eltávolítására a modellnevekből (PR #582, @jay77721) -**Gemini CLI elavulás**– elavultnak jelölve a Google OAuth korlátozására vonatkozó figyelmeztetéssel -**YAML értelmező**– az egyéni értelmező lecserélve "js-yaml"-re a helyes OpenAPI-specifikáció elemzéséhez -**ZWS v5**— HMR szivárgás javítás (485 DB csatlakozás → 1, memória 2,4 GB → 195 MB) -**Napló exportálás**— Új JSON-exportálás gomb az irányítópulton az időtartomány legördülő menüjével -**Értesítési szalaghirdetés frissítése**– az irányítópult kezdőlapja mutatja, ha új verziók érhetők el---

### 🌐 i18n & Documentation

-**30 nyelv**100%-os paritás mellett - 2788 hiányzó kulcs szinkronizálva -**cseh**— Teljes fordítás: 22 dokumentum, 2606 UI karakterlánc (PR by @zen0bit) -**Kínai (zh-CN)**- Teljes újrafordítás (PR by @only4copilot) -**VM telepítési útmutató**– forrásdokumentumként angolra fordítva -**API-referencia**- "/v1/embeddings" és "/v1/audio/speech" végpontok hozzáadva -**Szolgáltatók száma**- Frissítve 36+/40+/44+-ról**67+**-ra a README és mind a 30 i18n README között---

### 🔀 Community PRs Merged (10)

| PR       | Szerző          | Összegzés                                                                         |
| -------- | --------------- | --------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): a ResolutionDataDir importálás visszaállítása Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): modellnév előtag eltávolítási lehetőség                              |
| **#581** | @jay77721       | fix(npm): az electron-release összekapcsolása az npm-publish munkafolyamattal     |
| **#578** | @hijak          | feat: konfigurálható kontextushossz a modell metaadataiban                        |
| **#575** | @zhangqiang8vip | feat: modellenkénti upstream fejlécek, kompatibilis PATCH, chat-igazítás          |
| **#562** | @coobabm        | javítás: MCP munkamenet-kezelés, Claude átjelentkezés, detectFormat               |
| **#561** | @zen0bit        | fix(i18n): cseh fordítási javítások                                               |
| **#555** | @k0valik        | fix(sse): központosított "resolveDataDir()" az elérési útfeloldáshoz              |
| **#546** | @k0valik        | fix(cli): "--version" az "ismeretlen" értéket adja vissza Windows                 |
| **#544** | @k0valik        | fix(cli): biztonságos CLI-eszköz észlelése telepítési útvonalakon keresztül       |
| **#542** | @rdself         | fix(ui): világos mód kontraszt CSS-témaváltozók                                   |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go szolgáltatók "OpencodeExecutor"                           |
| **#512** | @zhangqiang8vip | feat: protokollonkénti modellkompatibilitás (`compatByProtocol`)                  |
| **#497** | @zhangqiang8vip | javítás: dev-módú HMR erőforrásszivárgás (ZWS v5)                                 |
| **#495** | @xandr0s        | javítás: Bottleneck 429 végtelen várakozás (várakozó feladatok)                   |
| **#494** | @zhangqiang8vip | feat: MiniMax fejlesztő→rendszerszerep-javítás                                    |
| **#480** | @prakersh       | javítás: stream flush használat kivonat                                           |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 és Anthropic pricing bejegyzések                              |
| **#475** | @only4copilot   | feat(i18n): továbbfejlesztett kínai fordítás                                      |

**Köszönjük minden közreműködőnek!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491`3` `#491`#506`#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 teszt, 0 hiba**(a 2.9.5-ös verzió 821-hez képest)

- +105 új teszt a következőkkel: modell-kombinációs leképezések, regisztrált kulcsok, OpencodeExecutor, Bailian szolgáltató, útvonal-ellenőrzés, hibaosztályozás, képarány-leképezés stb.---

### 📦 Database Migrations

| Migráció | Leírás                                                                    |
| -------- | ------------------------------------------------------------------------- | --- |
| **008**  | "registered_keys", "provider_key_limits", "account_key_limits" táblázatok |
| **009**  | `requested_model` oszlop a `call_logs`                                    |
| **010**  | `model_combo_mappings` tábla a modellenkénti kombinált útválasztáshoz     | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Megtörő változások:**Nincsenek. Minden meglévő konfiguráció, kombináció és API-kulcs megmarad.
> A 008-010-es adatbázis-migrációk automatikusan futnak indításkor.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL javítás**- Javított 10+ riasztás:

- 6 polynomial-redos a "provider.ts" / "chatCore.ts" fájlban (a "(?:^|/)" váltakozó mintákat szegmens alapú egyeztetéssel helyettesítette)
- 1 nem biztonságos véletlenszerűség az "acp/manager.ts" fájlban ("Math.random()" → "crypto.randomUUID()")
- 1 shell-command-injection a "prepublish.mjs" fájlban ("JSON.stringify()" elérési út kihagyása) -**Útvonal-ellenőrzés**— Zod-sémák + "validateBody()" hozzáadva 5 érvényesítés nélküli útvonalhoz:
- "modellkombinációs leképezések" (POST, PUT), "webhooks" (POST, PUT), "openapi/try" (POST)
- A CI `check:route-validation:t06` most megfelel:**176/176 útvonal érvényesítve**### 🐛 Bug Fixes

-**#585**— Az `<omniModel>` belső címkék már nem szivárognak ki az ügyfelekhez az SSE-válaszokban. Kimenő 'TransformStream' fertőtlenítés hozzáadva a 'combo.ts' fájlhoz### ⚙️ Infrastructure

-**Docker**– Frissített `docker/setup-buildx-action` a v3 → v4 verzióról (Node.js 20 elavultsági javítás) -**CI tisztítás**— Több mint 150 sikertelen/megszakított munkafolyamat-futás törölve### 🧪 Tests

- Tesztcsomag:**926 teszt, 0 hiba**(+3 új)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Megnövelt médiaátírási korlátok
- Model Context Length hozzáadva a rendszerleíró adatbázis metaadataihoz
- Modellenkénti upstream egyéni fejlécek hozzáadva a konfigurációs felhasználói felületen keresztül
- Fixed multiple bugs, Zod valiadation for patches, and resolved various community issues.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**- Modellenkénti kombinált útválasztás: a modellnév-mintákat (glob) hozzárendeli meghatározott kombinációkhoz az automatikus útválasztáshoz

- Új "model_combo_mappings" tábla (migráció 010) mintával, combo_id, prioritás, engedélyezve
- `resolveComboForModel()` DB függvény glob-regex egyezéssel (kis- és nagybetűk megkülönböztetése, `*` és `?` helyettesítő karakterek)
- "getComboForModel()" a "model.ts"-ben: kiegészíti a "getCombo()"-t modellminta tartalékkal
- "chat.ts": az útválasztási döntés most ellenőrzi a modell-kombinációs leképezéseket az egymodell kezelése előtt
- API: "GET/POST /api/model-combo-mappings", "GET/PUT/DELETE /api/model-combo-mappings/:id"
- Irányítópult: A „Model Routing Rules” szakasz hozzáadva a Combos oldalhoz soron belüli hozzáadással/szerkesztéssel/váltással/törléssel
- Példák: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Teljes i18n szinkronizálás**: 2788 hiányzó kulcs hozzáadva 30 nyelvi fájlhoz – az összes nyelv 100%-os paritással az "en.json"-val -**Agents page i18n**: OpenCode Integration rész teljes mértékben nemzetközivé vált (cím, leírás, szkennelés, letöltési címkék) -**6 új kulcs**hozzáadva az "ügynökök" névteréhez az OpenCode szakaszhoz### 🎨 UI/UX

-**Szolgáltatóikonok**: 16 hiányzó szolgáltatói ikon hozzáadva (3 kimásolva, 2 letöltve, 11 SVG létrehozva) -**SVG tartalék**: `ProviderIcon` komponens frissítve 4 szintű stratégiával: Lobehub → PNG → SVG → Általános ikon -**Ügynökök ujjlenyomata**: CLI eszközökkel szinkronizálva – droid, openclaw, másodpilóta, nyílt kód hozzáadva az ujjlenyomat-listához (összesen 14)### Biztonság

-**CVE-javítás**: A dompurify XSS sebezhetősége (GHSA-v2wj-7wpq-c8vv) az npm-felülírásokon keresztül feloldva, és kikényszerítve a dompurify@^3.3.2-t

- Az `npm audit` most**0 sebezhetőséget jelent**### 🧪 Tests

- Tesztcsomag:**923 teszt, 0 hiba**(+15 új modell-kombinációs leképezési teszt)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Szerző   | Összegzés                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): MCP-munkamenet-kezelés, Claude passthrough normalizálás, OAuth modális, detectFormat |
| **#561** | @zen0bit | fix(i18n): Cseh fordítási javítások – HTTP-metódusnevek és dokumentációfrissítések            | ### 🧪 Tests |

- Tesztcsomag:**908 teszt, 0 hiba**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**feloldja a valódi API-kulcsot a "keyId"-ből a CLI-beállítások útvonalaiban ('codex-settings', "droid-settings", "kilo-settings"), hogy megakadályozza a maszkolt karakterláncok írását (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Szerző   | Összegzés                                                                                                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): "--version" az "unknown" értéket adja vissza Windows rendszeren – használja a `JSON.parse(readFileSync)' parancsot az ESM import helyett                                                |
| **#555** | @k0valik | fix(sse): központosított "resolveDataDir()" az elérési út feloldásához a hitelesítő adatokban, az automatikus kombinációban, a válasznaplókban és a kérésnaplókban                                |
| **#544** | @k0valik | fix(cli): biztonságos CLI-eszköz felismerés ismert telepítési útvonalakon (8 eszköz) symlink érvényesítéssel, fájltípus-ellenőrzéssel, mérethatárokkal, minimális env-vel az állapotellenőrzésben |
| **#542** | @rdself  | fix(ui): a világos mód kontrasztjának javítása – a hiányzó CSS-témaváltozók hozzáadása ("bg-primary", "bg-subtle", "text-primary") és a csak sötét színek javítása a naplórészletekben            | ### 🔧 Bug Fixes |

-**TDZ-javítás a `cliRuntime.ts`-ban**— a `validateEnvPath`-ot használták a modul indításakor a `getExpectedParentPaths()` általi inicializálás előtt. Átrendezett deklarációk a "ReferenceError" javítása érdekében. -**Build javítások**— `pino` és `pino-pretty` hozzáadva a `serverExternalPackages`-hez, hogy megakadályozzuk, hogy a Turbopack megszakítsa a Pino belső dolgozóinak betöltését.### 🧪 Tests

- Tesztcsomag:**905 teszt, 0 hiba**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron build regression: a Next.js leminősítése `16.1.x`-ről `16.0.10`-re, hogy megszüntesse a Turbopack modul-kivonatolási instabilitást, amely üres képernyőket okozott az Electron asztali csomagban. -**Egységteszt-javítások**— Javítottunk két elavult teszt állítást ("nanobanana-image-handler" képarány/felbontás, "gondolkodás-költségvetés" Gemini "thinkingConfig" mező-leképezés), amelyek a legutóbbi megvalósítási változtatások után elcsúsztak. -**#541**— Válasz a felhasználói visszajelzésekre a telepítés bonyolultságáról; nincs szükség kódmódosításra.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON végrehajtó: a "jose" könyvtár használatával valósítva meg a JWT/Service Account hitelesítést, valamint a felhasználói felület konfigurálható régióit és az automatikus partnermodell URL-építést. -**T42**— Képgenerálási képarány-leképezés: létrehozta a "sizeMapper" logikát az általános OpenAI formátumokhoz ("méret", hozzáadott natív "imagen3" kezelést és frissített NanoBanana végpontokat a leképezett képarányok automatikus kihasználásához. -**T38**— Központi modellspecifikációk: "modelSpecs.ts" modellenkénti korlátokhoz és paraméterekhez készült.### 🔧 Improvements

-**T40**— OpenCode CLI-eszközök integrációja: natív "opencode-zen" és "opencode-go" integráció, amely a korábbi PR-ben befejeződött.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` lehűlés javításra vár + `406` leképezés: a `406 Not Acceptable` az `503 Service Unavailable`-ra leképezve, megfelelő lehűlési időközökkel. -**T25**– Szolgáltatói érvényesítési tartalék: kecses visszaállás a szabványos érvényesítési modellekhez, ha egy adott "validationModelId" nincs jelen. -**T36**— `403` vs `429` szolgáltató kezelési finomítása: kibontása az `errorClassifier.ts` fájlba, hogy megfelelően elkülönítse a kemény engedélyek hibáit (`403`) a sebességkorlátoktól (`429`). -**T39**— Végponti tartalék a `fetchAvailableModels-hez: háromszintű mechanizmust valósított meg (`/models`->`/v1/models`-> helyi általános katalógus) +`list_models_catalog` MCP-eszközfrissítések, amelyek tükrözik a forrást és a figyelmeztetést. -**T33**– Gondolkodási szint költségvetéssé alakítása: a minőségi gondolkodási szinteket pontos költségvetési elosztásokká alakítja. -**T41**— Háttérfeladat automatikus átirányítása: a nehéz háttérkiértékelési feladatokat automatikusan flash/hatékony modellekhez irányítja. -**T23**– Intelligens kvóta-visszaállítási tartalék: pontosan kivonja az "x-ratelimit-reset" / "retry-after" fejlécértékeket, vagy leképezi a statikus leállásokat.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Frissítés a 2.9.5 verzióról:**16 probléma megoldva · 2 közösségi PR egyesült · 2 új szolgáltató · 7 új API-végpont · 3 új szolgáltatás · DB migráció 008+009 · 832 teszt sikeres · 15 sub2api hiányosság javítás (T01–T15 teljes).### 🆕 New Providers

| Szolgáltató      | Alias ​​       | Tier     | Megjegyzések                                                            |
| ---------------- | -------------- | -------- | ----------------------------------------------------------------------- |
| **OpenCode Zen** | "opencode-zen" | Ingyenes | 3 modell az `opencode.ai/zen/v1`-n keresztül (PR #530, @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Fizetett | 4 modell az `opencode.ai/zen/go/v1`-n keresztül (PR #530, @kang-heewon) |

Mindkét szolgáltató az új `OpencodeExecutort` használja több formátumú útválasztással (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

OmniRoute API-kulcsok automatikus generálása és kiadása programozottan a szolgáltatónkénti és fiókonkénti kvóta betartatásával.

| Végpont                               | Módszer   | Leírás                                                 |
| ------------------------------------- | --------- | ------------------------------------------------------ |
| `/api/v1/registered-keys`             | "POST"    | Új kulcs kiadása — a nyers kulcs**csak egyszer**       |
| `/api/v1/registered-keys`             | "GET"     | Regisztrált kulcsok listázása (maszkolt)               |
| `/api/v1/registered-keys/{id}`        | "GET"     | A legfontosabb metaadatok lekérése                     |
| `/api/v1/registered-keys/{id}`        | "TÖRLÉS"  | Kulcs visszavonása                                     |
| `/api/v1/registered-keys/{id}/revoke` | "POST"    | Visszavonás (DELETE támogatás nélküli ügyfelek esetén) |
| `/api/v1/quotas/check`                | "GET"     | A kvóta előzetes ellenőrzése                           |
| `/api/v1/providers/{id}/limits`       | "GET/PUT" | A szolgáltatónkénti kiadási korlátok konfigurálása     |
| `/api/v1/accounts/{id}/limits`        | "GET/PUT" | Fiókonkénti kibocsátási korlátok konfigurálása         |
| "/api/v1/issues/report"               | "POST"    | Kvótaesemények jelentése a GitHub Issues számára       |

**DB — Migration 008:**Három új tábla: `regisztrált_kulcsok`, `szolgáltató_kulcs-korlátai`, `account_key_limits`.
**Biztonság:**A kulcsok SHA-256 kivonatként vannak tárolva. A nyers kulcs egyszer látható a létrehozáskor, soha többé nem kérhető le.
**Kvótatípusok:**"maxActiveKeys", "dailyIssueLimit", "hourlyIssueLimit" szolgáltatónként és fiókonként.
**Idempotency:**Az "idempotency_key" mező megakadályozza a párhuzamos kiadást. A „409 IDEMPOTENCY_CONFLICT” értéket adja vissza, ha a kulcs már használatban volt.
**Kulcsonkénti költségkeret:**"dailyBudget" / "hourlyBudget" – korlátozza, hogy egy kulcs hány kérést irányíthat ablakonként.
**GitHub-jelentés:**Nem kötelező. Állítsa be a „GITHUB_ISSUES_REPO” + „GITHUB_ISSUES_TOKEN” kombinációt a GitHub-problémák automatikus létrehozásához a kvóta túllépése vagy a kiadási hibák esetén.#### 🎨 Provider Icons — @lobehub/icons (#529)

Az irányítópulton lévő összes szolgáltatói ikon mostantól a „@lobehub/icons” React összetevőket használja (130+ szolgáltató SVG-vel).
Tartaléklánc:**Lobehub SVG → meglévő `/providers/{id}.png` → általános ikon**. Megfelelő React `ErrorBoundary` mintát használ.#### 🔄 Model Auto-Sync Scheduler (#488)

Az OmniRoute mostantól**24 óránként**automatikusan frissíti a csatlakoztatott szolgáltatók modelllistáit.

- A szerver indításakor fut a meglévő `/api/sync/initialize` hook segítségével
- A `MODEL_SYNC_INTERVAL_HOURS` környezeti változóval konfigurálható
- 16 fő szolgáltatót fed le
- Rögzíti az utolsó szinkronizálási időt a beállítások adatbázisában---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 – Gemini CLI OAuth:**A végrehajtható hiba törlése, ha a "GEMINI_OAUTH_CLIENT_SECRET" hiányzik a Docker/saját hosztolt központi telepítésekből. Korábban a rejtélyes „kliens_titka hiányzik” a Google-tól. Most konkrét `docker-compose.yml` és `~/.omniroute/.env` utasításokat ad.#### Providers & Routing

-**#536 – LongCat AI:**Javítva a "baseUrl" ("api.longcat.chat/openai") és az "authHeader" ("Engedélyezés: hordozó"). -**#535 – Rögzített modell felülírása:**A "body.model" most megfelelően be van állítva a "pinnedModel" értékre, ha aktív a környezet-gyorsítótár védelem. -**#532 – OpenCode Go-kulcs ellenőrzése:**Most a "zen/v1" tesztvégpontot használja ("testKeyBaseUrl") – ugyanaz a kulcs működik mindkét szinten.#### CLI & Tools

-**#527 - Claude Code + Codex ciklus:**A "tool_result" blokkokat a rendszer most szöveggé konvertálja ahelyett, hogy eldobná, megállítva a végtelen eszköz-eredmény ciklusokat. -**#524 — OpenCode konfiguráció mentése:**`SaveOpenCodeConfig()` kezelő hozzáadva (az XDG_CONFIG_HOME ismeri, írja a TOML). -**#521 – A bejelentkezés elakadt:**A bejelentkezés többé nem fagy le, miután kihagyta a jelszóbeállítást – megfelelően átirányítja a belépést. -**#522 – API-kezelő:**A félrevezető „Maszkolt kulcs másolása” gomb eltávolítva (a lakat ikon elemleírással helyettesítve). -**#532 — OpenCode Go konfiguráció:**Az útmutató beállításkezelője mostantól kezeli az "opencode" eszközazonosítót.#### Developer Experience

-**#489 — Antigravitáció:**A hiányzó `googleProjectId` strukturált 422-es hibát ad vissza, és rejtélyes összeomlás helyett újracsatlakozási útmutatást ad. -**#510 — Windows elérési utak:**Az MSYS2/Git-Bash elérési utak (`/c/Program Files/...`) mostantól automatikusan `C:\Program Files\...`-re normalizálódnak. -**#492 — CLI indítása:**Az 'omniroute' CLI most észleli a "mise"/"nvm" által kezelt csomópontot, ha az "app/server.js" hiányzik, és célzott javítási utasításokat jelenít meg.---

### 📖 Documentation Updates

-**#513**- Docker jelszó visszaállítása: `INITIAL_PASSWORD` env var kerülő megoldás dokumentálva -**#520**— pnpm: A "pnpm jóváhagyása-jobb sqlite3" lépés dokumentálva---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#5353` `#535---

### 🔀 Community PRs Merged

| PR       | Szerző       | Summary                                                                               |
| -------- | ------------ | ------------------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go szolgáltatók "OpencodeExecutor"-tal és továbbfejlesztett tesztekkel | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB megmaradása: "setConnectionRateLimitUntil()", "isConnectionRateLimited()", "getRateLimitedConnections()" a "providers.ts" fájlban. A meglévő "rate_limited_until" oszlop most dedikált API-ként jelenik meg – az OAuth-token frissítése NEM érintheti ezt a mezőt a sebességkorlátozási hurkok elkerülése érdekében. -**T08**— API-kulcsonkénti munkamenet-korlát: `max_sessions INTEGER DEFAULT 0` hozzáadva az `api_keys`-hez automatikus áttelepítéssel. `sessionManager.ts` gains `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, and `getActiveSessionCountForKey()`. A "chatCore.js" hívói érvényesíthetik a "req.close" korlátját és csökkentését. -**T09**— Codex vs Spark sebességkorlátozási hatókörei: "getCodexModelScope()" és "getCodexRateLimitKey()" a "codex.ts" fájlban. A szabványos modellek ("gpt-5.x-codex", "codex-mini") a "codex" hatókört kapják; A spark modellek (`codex-spark*`) megkapják a `"spark"-t. A díjkorlát kulcsainak `${accountId}:${scope}`értékűnek kell lenniük, hogy az egyik készlet kimerítése ne akadályozza a másikat.
-**T13**— Elavult kvótamegjelenítés javítása: a`getEffectiveQuotaUsage(used, resetAt)`0-t ad vissza, amikor a visszaállítási ablak lejárt; A`formatResetCountdown(resetAt)`egy ember által olvasható visszaszámláló karakterláncot ad vissza (pl. "2h 35m"'). Mindkettő a „providers.ts” + „localDb.ts” fájlból exportálva irányítópult-felhasználásra.
-**T14**— Proxy gyorshiba: új`src/lib/proxyHealth.ts`a következővel:`isProxyReachable(proxyUrl, timeoutMs=2000)`(TCP-ellenőrzés, ≤2s a 30s időtúllépés helyett),`getCachedProxyHealth()`,Prox`yvalidate()Prox`yvalidate `getAllProxyHealthStatuses()`. Az eredmények alapértelmezés szerint 30 másodperccel gyorsítótárazottak; konfigurálható a `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS` segítségével.### 🧪 Tests

- Tesztcsomag:**832 teszt, 0 hiba**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**– „Requested_model” oszlop a „hívásnaplókban” (009-es áttelepítés): nyomon követheti, hogy az ügyfél melyik modellt kérte eredetileg a tényleges útválasztási modellhez képest. Lehetővé teszi a tartalék arány elemzését. -**T02**— Üres szövegblokkok eltávolítása a beágyazott `tool_result.content`-ből: megakadályozza az Anthropic 400 hibákat (`a szöveges tartalomblokkok nem lehetnek üresek`), amikor Claude Code láncolja az eszköz eredményeit. -**T03**— Az `x-codex-5h-*` / `x-codex-7d-*` fejlécek elemzése: `parseCodexQuotaHeaders()` + `getCodexResetTime()` kódexkvótaablak kivonatolása a pontos leállási ütemezés érdekében az általános 5 perces tartalék helyett. -**T04**— "X-Session-Id" fejléc külső ragadós útválasztáshoz: az "extractExternalSessionId()" a "sessionManager.ts" fájlban az "x-session-id" / "x-omniroute-session" fejléceket olvassa be, az SHA-25 előtaggal, hogy elkerülje az SHA-25 előtagot. Nginx-kompatibilis (kötőjeles fejléc). -**T06**— Fiók deaktiválva → végleges blokkolás: Az `isAccountDeactivated()' az `accountFallback.ts' fájlban 401 deaktiválási jelet észlel, és 1 éves leállást alkalmaz, hogy megakadályozza a véglegesen kihalt fiókok újrapróbálását. -**T07**— X-Forwarded-For IP-ellenőrzés: új `src/lib/ipUtils.ts` az "extractClientIp()" és a "getClientIpFromRequest()" paraméterekkel – kihagyja az "unknown"/non-IP bejegyzéseket az "X-Forwarded-Forward" kérés-proxy-láncokban (Nginx). -**T10**— A kreditek kimerültek → különálló tartalék: az "isCreditsExhausted()" az "accountFallback.ts"-ben 1 órás lehűlést ad vissza a "creditsExhausted" jelzővel, ami különbözik az általános 429-es sebességkorlátozástól. -**T11**— „max” érvelési erőfeszítés → 131072 költségvetési token: „EFFORT_BUDGETS” és „THINKING_LEVEL_MAP” frissítve; A fordított leképezés most a „max” értéket adja vissza a teljes költségvetésű válaszokhoz. Az egységteszt frissítve. -**T12**— MiniMax M2.7 árbejegyzések hozzáadva az ártáblázathoz (sub2api PR #1120). Az M2.5/GLM-4.7/GLM-5/Kimi árazás már létezett. -**T15**— Tömbtartalom normalizálása: A "normalizeContentToString()" segítő az "openai-to-claude.ts" fájlban megfelelően összecsukja a tömb formátumú rendszer-/eszközüzeneteket karakterláncba, mielőtt elküldené az Anthropicnak.### 🧪 Tests

- Tesztcsomag:**832 teszt, 0 hiba**(változatlan az rc.5-höz képest)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**- Regisztrált kulcsok hozzáférési API: API-kulcsok automatikus kiadása szolgáltatónkénti és fiókonkénti kvóta betartatással

- "POST /api/v1/registered-keys" – kulcsok kiadása idempotencia támogatással
- "GET /api/v1/registered-keys" - listázza (maszkolt) regisztrált kulcsokat
- "GET /api/v1/registered-keys/{id}" - kulcs metaadatainak lekérése
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — kulcsok visszavonása
- "GET /api/v1/quotas/check" - előzetes ellenőrzés a kiadás előtt
- `PUT /api/v1/providers/{id}/limits` — szolgáltatói kiadási korlátok beállítása
- `PUT /api/v1/accounts/{id}/limits` — fiókkibocsátási korlátok beállítása
- „POST /api/v1/issues/report” – opcionális GitHub-hibajelentés
- DB migráció 008: `registered_keys`, `provider_key_limits`, `account_key_limits` táblák---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**- OpenCode Zen és OpenCode Go szolgáltatók hozzáadva (@kang-heewon)

- Új "OpencodeExecutor" több formátumú útválasztással ("/chat/completions", "/messages", "/responses")
- 7 modell mindkét szinten---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**– A szolgáltatói ikonok mostantól a [@lobehub/icons](https://github.com/lobehub/lobe-icons) formátumot használják kecses PNG-visszaállítással és egy „ProviderIcon” komponenssel (130+ szolgáltató támogatott) -**#488**- A modelllisták 24 óránkénti automatikus frissítése a "modelSyncScheduler" segítségével (a `MODEL_SYNC_INTERVAL_HOURS' segítségével konfigurálható)### 🔧 Bug Fixes

-**#537**- Gemini CLI OAuth: most egyértelmű, végrehajtható hibát mutat, ha a "GEMINI_OAUTH_CLIENT_SECRET" hiányzik a Docker/saját hosztolt központi telepítésekben---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI-kulcs ellenőrzése: rögzített baseUrl (`api.longcat.chat/openai`) és authHeader (`Engedélyezés: hordozó`) -**#535**- Rögzített modell felülírása: a "body.model" most "pinnedModel" értékre van állítva, amikor a környezet-gyorsítótár védelem rögzített modellt észlel -**#524**— Az OpenCode konfiguráció most megfelelően mentve: `saveOpenCodeConfig()` kezelő hozzáadva (XDG_CONFIG_HOME tudatában van, írja a TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**- A bejelentkezés többé nem akad el a jelszóbeállítás kihagyása után (átirányítás a belépéshez) -**#522**- API-kezelő: A félrevezető „Maszkolt kulcs másolása” gomb eltávolítva (a lakat ikon elemleírással helyettesítve) -**#527**- Claude Code + Codex szuperhatalom ciklus: a "tool_result" blokkok szöveggé konvertálva ahelyett, hogy eldobták volna őket -**#532**- Az OpenCode GO API-kulcsellenőrzés most a megfelelő "zen/v1" végpontot használja ("testKeyBaseUrl") -**#489**- Antigravitáció: hiányzó "googleProjectId" strukturált 422-es hibát ad vissza újracsatlakozási útmutatóval -**#510**- Windows: Az MSYS2/Git-Bash elérési utak (`/c/Program Files/...`) most a következőre vannak normalizálva: `C:\Program Files\...` -**#492**- Az `omniroute' parancssori felület most észleli a `mise`/`nvm-et, ha az `app/server.js` hiányzik, és célzott javítást jelenít meg### Dokumentáció

-**#513**- Docker jelszó visszaállítása: `INITIAL_PASSWORD` env var kerülő megoldás dokumentálva -**#520**— pnpm: "A pnpm jóváhagyja - jobb sqlite3-t épít" dokumentálva### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Új OpenCode szolgáltatók, beágyazott hitelesítő adatok javítása, CLI maszkolt kulcshiba, CACHE_TAG_PATTERN javítás.### 🐛 Bug Fixes

-**A CLI-eszközök maszkolt API-kulcsot mentenek a konfigurációs fájlokba**– A „claude-settings”, „cline-settings” és „openclaw-settings” POST-útvonalak mostantól elfogadják a „keyId” paramétert, és feloldják a valódi API-kulcsot a DB-ből, mielőtt lemezre írnának. A „ClaudeToolCard” frissítve a „keyId” elküldésére a maszkolt megjelenítési karakterlánc helyett. Javítások #523, #526. -**Egyéni beágyazási szolgáltatók: "Nincsenek hitelesítési adatok"**— A `/v1/embeddings' mostantól külön követi a `credentialsProviderId'-t az útválasztási előtagtól, így a hitelesítési adatokat a rendszer az egyező szolgáltató csomópont-azonosítójából kéri le, nem pedig a nyilvános előtag-karakterláncból. Kijavítja azt a regressziót, ahol a "google/gemini-embedding-001" és a hasonló egyéni szolgáltatói modellek mindig meghiúsulnak hitelesítő adatok hibájával. #532-vel kapcsolatos javítások. (PR #528, @jacob2826) -**A kontextus-gyorsítótár-védelem szabályos kifejezése hiányzik
` előtag**— a `CACHE_TAG_PATTERN` a `comboAgentMiddleware.ts` fájlban frissítve, hogy megfeleljen mindkét literálnak.
`(backslash-n) és a tényleges újsor U+000A, amelyet a`combo.ts`streamelés az`<omniModel>` címke köré szúr az 515-ös javítás után. Javítások #531.### ✨ New Providers

-**OpenCode Zen**– Ingyenes szintű átjáró az "opencode.ai/zen/v1" oldalon 3 modellel: "minimax-m2.5-free", "big-pickle", "gpt-5-nano" -**OpenCode Go**— Előfizetési szolgáltatás az `opencode.ai/zen/go/v1` oldalon 4 modellel: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude formátum), `minimax-m2.5` (Claude formátum)

- Mindkét szolgáltató az új „OpencodeExecutort” használja, amely dinamikusan a „/chat/completions”, „/messages”, „/responses” vagy „/models/{model}:generateContent” mappába irányít a kért modell alapján. (PR #530, @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Hibajavítások – a Codex gyorsítótár kulcsának megőrzése, a tagContent JSON kilépésének javítása, a lejárt jogkivonat állapotának szinkronizálása a DB-vel.### 🐛 Bug Fixes

-**fix(translator)**: `prompt_cache_key` megőrzése a Responses API → Chat Completions fordításban (#517)
— A mező a Codex által használt gyorsítótár-affinitási jel; eltávolítása megakadályozta az azonnali gyorsítótár találatokat.
Javítva az "openai-responses.ts" és a "responsesApiHelper.ts".

-**fix(kombo)**: Escape`
` a "tagContent"-ben, tehát a beszúrt JSON-karakterlánc érvényes (#515)
— A sablon literális újsorai (U+000A) nem megengedettek megtisztítás nélkül a JSON-karakterláncértékeken belül.
Lecserélve `\n` szó szerinti sorozatokra az `open-sse/services/combo.ts` fájlban.

-**javítás(használat)**: A lejárt token állapotának visszaszinkronizálása a DB-vel élő hitelesítési hiba esetén (#491)
— Amikor a Limits & Quota live check 401/403-as értéket ad vissza, a kapcsolat "testStatus" most frissül
`"lejárt"` az adatbázisban, így a Szolgáltatók oldal ugyanazt a leromlott állapotot tükrözi.
Javítva az `src/app/api/usage/[connectionId]/route.ts' fájlban.---

## [2.9.3] — 2026-03-21

> Sprint: Adjon hozzá 5 új ingyenes AI-szolgáltatót – LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(szolgáltatók/longcat)**: Add hozzá a LongCat AI-t (`lc/`) – 50 millió token/nap ingyenes (Flash-Lite) + 500 000/nap (Csevegés/Thinking) nyilvános bétaverzió alatt. OpenAI-kompatibilis, szabványos hordozó hitelesítés. -**feat(szolgáltatók/beporzások)**: Add Pollinations AI (`pol/`) – nincs szükség API-kulcsra. Proxy-k GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 rekv/15 mp ingyenes). Az egyéni végrehajtó kezeli az opcionális hitelesítést. -**feat(szolgáltatók/cloudflare-ai)**: Cloudflare Workers AI hozzáadása (`cf/`) – 10 000 neuron/nap ingyenes (~150 LLM-válasz vagy 500 s Whisper hang). 50+ modell a globális élvonalban. Az egyéni végrehajtó dinamikus URL-t hoz létre "accountId" azonosítóval a hitelesítési adatokból. -**feat(providers/scaleway)**: Scaleway generatív API-k hozzáadása (`scw/`) – 1 millió ingyenes token új fiókokhoz. EU/GDPR-kompatibilis (Párizs). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Adjon hozzá AI/ML API-t (`aiml/`) – 0,025 USD/nap ingyenes jóváírás, 200+ modell (GPT-4o, Claude, Gemini, Llama) egyetlen aggregátor végponton keresztül.### 🔄 Provider Updates

-**feat(szolgáltatók/együtt)**: Adja hozzá a "hasFree: true" + 3 tartósan ingyenes modellazonosítót: "Llama-3.3-70B-Instruct-Turbo-Free", "Llama-Vision-Free", "DeepSeek-R1-Distill-Llama-70B" -**feat(providers/gemini)**: Adja hozzá a "hasFree: true" + "freeNote" kifejezést (1500 rekv/nap, hitelkártya nélkül, aistudio.google.com) -**chore(providers/gemini)**: az egyértelműség kedvéért nevezze át a megjelenített nevet "Gemini (Google AI Studio)"-ra### ⚙️ Infrastructure

-**feat(végrehajtók/beporzások)**: Új „PollinationsExecutor” – kihagyja az „Authorization” fejlécet, ha nincs megadva API-kulcs -**feat(végrehajtók/cloudflare-ai)**: Új "CloudflareAIExecutor" – a dinamikus URL-szerkesztéshez "accountId" szükséges a szolgáltató hitelesítő adataiban -**feat(végrehajtók)**: Regisztrálja a "pollinations", "pol", "cloudflare-ai", "cf" végrehajtó leképezéseket### Dokumentáció

-**docs(readme)**: Kibővített ingyenes kombinált készlet 11 szolgáltatóra (örökre 0 USD) -**docs(readme)**: 4 új ingyenes szolgáltatói rész (LongCat, Pollinations, Cloudflare AI, Scaleway) hozzáadva modelltáblázatokkal -**docs(readme)**: frissített ártáblázat 4 új ingyenes szintsorral -**docs(i18n/pt-BR)**: frissített ártáblázat + hozzáadott LongCat/Pollinations/Cloudflare AI/Scaleway szakaszok portugálul -**docs(new-features/ai)**: 10 feladatspecifikációs fájl + fő megvalósítási terv a `docs/new-features/ai/` fájlban### 🧪 Tests

- Tesztcsomag:**821 teszt, 0 hiba**(változatlan)---

## [2.9.2] — 2026-03-21

> Sprint: Javítsa ki a médiaátírást (Deepgram/HuggingFace Content-Type, nyelvérzékelés) és a TTS hibakijelzést.### 🐛 Bug Fixes

-**javítás(átírás)**: A Deepgram és a HuggingFace hangátírás most megfelelően leképezi a `video/mp4` → `audio/mp4` és más média MIME-típusokat az új `resolveAudioContentType()` segítőn keresztül. Korábban az .mp4 fájlok feltöltése következetesen a "Nem észlelhető beszéd" üzenetet adta vissza, mert a Deepgram a "Content-Type: video/mp4" üzenetet fogadta. -**javítás(átírás)**: `detect_language=true` hozzáadva a Deepgram kérésekhez – automatikusan felismeri a hang nyelvét (portugál, spanyol stb.) az alapértelmezett angol helyett. Javítja a nem angol nyelvű átírásokat, amelyek üres vagy szemetet eredményeznek. -**fix(transcription)**: `punctuate=true` hozzáadva a Deepgram kérésekhez a jobb minőségű, helyes írásjelekkel rendelkező átírási kimenet érdekében. -**fix(tts)**: "[object Object]" hibajelzés a szövegfelolvasó válaszokban, javítva az "audioSpeech.ts" és az "audioTranscription.ts" fájlban. Az "upstreamErrorResponse()" függvény most megfelelően kibontja a beágyazott karakterlánc-üzeneteket olyan szolgáltatóktól, mint például az ElevenLabs, amelyek a következőt adják vissza: `{ error: { message: "...", status_code: 401 } }` sima hibaüzenet helyett.### 🧪 Tests

- Tesztcsomag:**821 teszt, 0 hiba**(változatlan)### Triaged Issues

-**#508**— Eszközhívási formátum regressziója: kért proxynaplók és szolgáltatói lánc információk ("needs-info") -**#510**- Windows CLI állapotellenőrzési útvonala: kért shell/csomópont verzióinformáció ("needs-info") -**#485**— Kiro MCP eszközhívások: külső Kiro probléma miatt lezárva (nem OmniRoute) -**#442**- Baseten /models végpont: zárva (dokumentált kézi megoldás) -**#464**— Kulcs-kiépítési API: ütemterv-elemként elismerve---

## [2.9.1] — 2026-03-21

> Sprint: Javítsa ki az SSE omniModel adatvesztést, egyesítse a protokollonkénti modellkompatibilitást.### Bug Fixes

-**#511**- Kritikus: Az "<omniModel>" címkét a "finish_reason:stop" után küldték el az SSE-folyamokban, ami adatvesztést okoz. A címke most az első, nem üres tartalomdarabba kerül, garantálva a kézbesítést, mielőtt az SDK-k lezárják a kapcsolatot.### Merged PRs

-**PR #512**(@zhangqiang8vip): Protokollonkénti modell-kompatibilitás – a „normalizeToolCallId” és a „preserveOpenAIDeveloperRole” mostantól kliens protokollonként konfigurálható (OpenAI, Claude, Responses API). Új "compatByProtocol" mező a modell konfigurációjában Zod-ellenőrzéssel.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: PATH/verzió információ kért -**#509**— Turbopack Electron regresszió: upstream Next.js hiba, dokumentált megoldások -**#508**- macOS fekete képernyő: javasolt "--disable-gpu" megoldás---

## [2.9.0] — 2026-03-20

> Sprint: Többplatformos gépazonosító javítás, API-kulcsonkénti sebességkorlátozás, streaming kontextus gyorsítótár, Alibaba DashScope, keresési elemzés, ZWS v5 és 8 probléma lezárva.### ✨ New Features

-**feat(search)**: Keresés az Analytics lapon a `/dashboard/analytics' oldalon – szolgáltatók lebontása, gyorsítótár találati aránya, költségkövetés. Új API: "GET /api/v1/search/analytics" (#feat/search-provider-routing)
-**feat(provider)**: Alibaba Cloud DashScope hozzáadva egyéni végpont-útvonal-ellenőrzéssel – konfigurálható "chatPath" és "modelsPath" csomópontonként (#feat/custom-endpoint-paths)
-**feat(api)**: API-kulcsonkénti kérések számának korlátai – `max_requests_per_day' és `max_requests_per_minute` oszlopok a memórián belüli csúszóablak végrehajtásával, amely HTTP 429-et ad vissza (#452) -**feat(dev)**: ZWS v5 – HMR szivárgás javítás (485 DB kapcsolat → 1), memória 2,4 GB → 195 MB, "globalThis" singletonok, Edge Runtime figyelmeztetés javítás (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` újraírva try/catch waterfall segítségével (Windows REG.exe → macOS ioreg → Linux-fájl olvasása → gazdagépnév → `os.hostname()`). Megszünteti a "process.platform" elágazást, amely miatt a Next.js kötegelő halott kódja megszűnt, a "fej" javítása nem ismerhető fel Windows rendszeren. A 466-os számú javítás is. -**fix(#493)**: Egyéni szolgáltatói modell elnevezése – eltávolította a helytelen előtag-levonást a `DefaultExecutor.transformRequest()-ben, amely megzavarta a szervezeti hatókörű modellazonosítókat, például a `zai-org/GLM-5-FP8`.
-**fix(#490)**: Streaming + kontextus-gyorsítótár védelem – A `TransformStream`elfogja az SSE-t, és beilleszti az`<omniModel>`címkét a`[KÉSZ]`jelölő elé, lehetővé téve a kontextus-gyorsítótár védelmét a streamelési válaszok számára.
-**fix(#458)**: Kombinált sémaellenőrzés —`rendszer_üzenet`, `tool_filter_regex`, `context_cache_protection` mezők mentéskor átmennek a Zod-ellenőrzésen. -**fix(#487)**: KIRO MITM kártya tisztítása — eltávolítva a ZWS_README-t, generált "AntigravityToolCard" a dinamikus eszköz metaadatainak használatához.### 🧪 Tests

- Antropikus formátumú eszközök szűrőegység-tesztjei hozzáadva (PR #397) – 8 regressziós teszt a "tool.name"-hez ".function" burkoló nélkül
- Tesztcsomag:**821 teszt, 0 hiba**(813-ról)### 📋 Issues Closed (8)

-**#506**- A Windows gépazonosító `feje` nem ismerhető fel (javítva) -**#493**- Egyéni szolgáltatói modell elnevezése (javítva) -**#490**- Streaming kontextus gyorsítótár (javítva) -**#452**- API-kulcsonkénti kéréskorlátok (megvalósítva) -**#466**- Windows bejelentkezési hiba (ugyanaz a kiváltó ok, mint #506) -**#504**- MITM inaktív (várható viselkedés) -**#462**- Gemini CLI PSA (feloldva) -**#434**- Az Electron alkalmazás összeomlása (a #402 másolata)## [2.8.9] — 2026-03-20

> Sprint: Közösségi PR-ok egyesítése, KIRO MITM kártya javítása, függőségi frissítések.### Merged PRs

-**PR #498**(@Sajid11194): Javítsa ki a Windows gépazonosító összeomlását (`undefined\REG.exe`). A `node-machine-id` lecseréli a natív operációs rendszer beállításjegyzék-lekérdezéseit.**Bezár: #486.** -**PR #497**(@zhangqiang8vip): Javítsa ki a fejlesztői módú HMR-erőforrás-szivárgást – 485 kiszivárgott DB-kapcsolat → 1, memória 2,4 GB → 195 MB. "globalThis" singletons, Edge Runtime figyelmeztető javítás, Windows tesztstabilitás. (+1168/-338 22 fájlon keresztül) -**PRs #499-503**(Dependabot): GitHub Actions frissítések – `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-description@5`, `docker/setup-qemu-description@4`,-`action@4/`-action.### Bug Fixes

-**#505**- A KIRO MITM kártya mostantól eszközspecifikus utasításokat (`api.anthropic.com`) jelenít meg az Antigravitációra vonatkozó szöveg helyett. -**#504**— UX pontosítással válaszolt (a MITM „Inaktív” a várt viselkedés, amikor a proxy nem fut).---

## [2.8.8] — 2026-03-20

> Sprint: Javítsa ki az OAuth kötegelt teszt összeomlását, adja hozzá az „Összes tesztelése” gombot az egyes szolgáltatói oldalakhoz.### Bug Fixes

-**OAuth kötegelt teszt összeomlás**(ERR_CONNECTION_REFUSED): A szekvenciális for-loop helyére 5 kapcsolat egyidejűségi korlátja + 30 mp kapcsolatonkénti időtúllépés a `Promise.race()` + `Promise.allSettled()` függvényen keresztül. Megakadályozza a szerver összeomlását nagy OAuth-szolgáltatói csoportok tesztelésekor (~30+ kapcsolat).### Funkciók

-**„Összes tesztelése” gomb a szolgáltatói oldalakon**: Az egyes szolgáltatói oldalakon (pl. „/providers/codex”) mostantól a „Kapcsolatok tesztelése” gomb látható a Kapcsolatok fejlécben, ha 2+ kapcsolat van. A `POST /api/providers/test-batch` értéket használja a `{mode: "provider", providerId}` paraméterrel. Az eredmények egy modálisan jelennek meg sikeres/sikertelen összefoglalóval és csatlakozásonkénti diagnózissal.---

## [2.8.7] — 2026-03-20

> Sprint: PR #495 összevonása (Bottleck 429 drop), 496. javítás (egyéni beágyazási szolgáltatók), osztályozási funkciók.### Bug Fixes

-**Bottleck 429 végtelen várakozás**(PR #495, @xandr0s): 429-en a `limiter.stop({ dropWaitingJobs: true })` azonnal meghiúsítja az összes sorban álló kérést, így a felfelé irányuló hívók tartalékot válthatnak ki. A Limiter törlődik a térképről, így a következő kérés új példányt hoz létre. -**Egyéni beágyazási modellek feloldhatatlanok**(#496): A `POST /v1/embeddings` mostantól az ÖSSZES szolgáltatói csomópontból (nem csak a localhostból) oldja fel az egyéni beágyazási modelleket. Lehetővé teszi az olyan modellek hozzáadását az irányítópulton keresztül, mint a „google/gemini-embedding-001”.### Issues Responded

-**#452**- API-kulcsonkénti kérések számának korlátai (nyugtázva, az ütemterven) -**#464**- API-kulcsok automatikus kiadása szolgáltatói/fiókkorlátokkal (további részletekre van szükség) -**#488**- Modellisták automatikus frissítése (nyugtázva, az ütemterven) -**#496**- Egyéni beágyazási szolgáltató felbontása (javítva)---

## [2.8.6] — 2026-03-20

> Sprint: A PR #494 összevonása (MiniMax szerepjavítás), a KIRO MITM műszerfal javítása, a 8. osztályozási problémák.### Funkciók

-**MiniMax developer→system role fix**(PR #494 by @zhangqiang8vip): Per-model `preserveDeveloperRole` toggle. Hozzáadja a „Kompatibilitás” felhasználói felületet a szolgáltatók oldalához. Kijavítja a 422-es "szerepparaméter-hibát" a MiniMax és hasonló átjárók esetében. -**roleNormalizer**: A `normalizeDeveloperRole()` mostantól elfogadja a `preserveDeveloperRole` paramétert háromállapotú viselkedéssel (undefined=keep, true=keep, false=convert). -**DB**: Új "getModelPreserveOpenAIDEveloperRole()" és "mergeModelCompatOverride()" a "models.ts" fájlban.### Bug Fixes

-**KIRO MITM irányítópult**(#481/#487): A `CLIToolsPageClient` mostantól minden `configType: "mitm" eszközt az `AntigravityToolCard`-ba (MITM Start/Stop vezérlők) irányít. Korábban csak az Antigravitáció volt kódolva.
-**AntigravityToolCard generic**: A "tool.image", "tool.description" és "tool.id" paramétereket használja a keménykódolt Antigravity értékek helyett. Védelmet nyújt a hiányzó `defaultModels` ellen.### Cleanup

- Eltávolítottuk a `ZWS_README_V2.md` fájlt (csak fejlesztési dokumentumok a PR #494-ből).### Issues Triaged (8)

-**#487**- Lezárva (a KIRO MITM javítva ebben a kiadásban) -**#486**— Need-info (Windows REG.exe PATH probléma) -**#489**— szükséglet-információ (Antigravitációs projektazonosító hiányzik, OAuth újracsatlakozás szükséges) -**#492**— needs-info (hiányzó app/server.js a rosszul kezelt csomóponton) -**#490**- Nyugtázva (adatfolyam + kontextus gyorsítótár blokkolása, javítás tervezett) -**#491**- Nyugtázva (a Codex hitelesítési állapot inkonzisztenciája) -**#493**- Nyugtázva (Modális szolgáltató modellnév előtagja, kerülő megoldás biztosított) -**#488**- Funkciókérés-hátralék (a modelllisták automatikus frissítése)---

## [2.8.5] — 2026-03-19

> Sprint: Javítsa ki a zombi SSE adatfolyamokat, a kontextus gyorsítótárat az első körben, a KIRO MITM-et és a triage 5 külső problémáit.### Bug Fixes

-**Zombie SSE Streamek**(#473): Csökkentse a `STREAM_IDLE_TIMEOUT_MS' időtartamot 300 mp → 120 másodpercről a gyorsabb kombinált visszaeséshez, amikor a szolgáltatók lefagynak a stream közben. Konfigurálható az env var.
-**Kontextus-gyorsítótár-címke**(#474): Javítsa ki az `injectModelTag()'-t az első körben érkező kérések kezelésére (nincs segédüzenet) – a kontextus-gyorsítótár védelem már az első választól kezdve működik. -**KIRO MITM**(#481): Módosítsa a KIRO `configType' értékét a "guide" → "mitm" értékről, így az irányítópult megjeleníti a MITM Start/Stop vezérlőit.
-**E2E-teszt**(CI): Javítsa ki a `providers-bailian-coding-plan.spec.ts'-t — a már meglévő modális fedvény elvetése, mielőtt az API-kulcs hozzáadása gombra kattintana.### Closed Issues

- #473 - Zombie SSE adatfolyamok bypass combo backback
- #474 - A kontextus gyorsítótár `<omniModel>` címke hiányzik az első körben
- #481 — A KIRO-hoz készült MITM nem aktiválható a műszerfalról
- #468 - Gemini CLI távoli szerver (felváltotta a #462 elavulás)
- #438 - Claude nem tud fájlokat írni (külső CLI probléma)
- #439 - Az AppImage nem működik (dokumentált libfuse2 megoldás)
- #402 - ARM64 DMG "sérült" (dokumentált xattr -cr megoldás)
- #460 - A CLI nem futtatható Windows alatt (dokumentált PATH javítás)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI elavulás, VM Guide i18n javítás, dependabot biztonsági javítás, szolgáltatói séma bővítése.### Funkciók

-**Gemini CLI megszüntetése**(#462): A "gemini-cli" szolgáltató megjelölése elavultként figyelmeztetéssel – A Google 2026 márciusától korlátozza a harmadik felek OAuth használatát -**Szolgáltatói séma**(#462): Bontsa ki a Zod érvényesítését az „deprecated”, „deprecationReason”, „hasFree”, „freeNote”, „authHint”, „apiHint” opcionális mezőkkel### Bug Fixes

-**VM Guide i18n**(#471): Adja hozzá a `VM_DEPLOYMENT_GUIDE.md' fájlt az i18n fordítási folyamathoz, állítsa elő mind a 30 nyelvi fordítást angol forrásból (a portugál nyelvben megrekedt)### Biztonság

-**deps**: Bump "flatted" 3.3.3 → 3.4.2 – kijavítja a CWE-1321 prototípus szennyeződését (#484, @dependabot)### Closed Issues

- #472 – Modell álnevek regressziója (javítva a 2.8.2-es verzióban)
- #471 — A virtuálisgép-útmutató fordítások törve
- #483 – A `[KÉSZ]` után záró `data: null` (javítva a 2.8.3-as verzióban)### Merged PRs

- #484 — deps: bump lapítva 3.3.3-ról 3.4.2-re (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: cseh i18n, SSE protokoll javítás, virtuális gép útmutató fordítása.### Funkciók

-**Cseh nyelv**(#482): teljes cseh (cs) i18n – 22 dokumentum, 2606 UI karakterlánc, nyelvváltó frissítések (@zen0bit) -**VM telepítési útmutató**: forrásdokumentumként portugálról angolra fordítva (@zen0bit)### Bug Fixes

-**SSE-protokoll**(#483): A záró "data: null" küldésének leállítása a "[KÉSZ]" jel után – kijavítja az AI_TypeValidationError hibát szigorú AI SDK-kliensekben (Zod-alapú érvényesítők)### Merged PRs

- #482 - Cseh nyelv hozzáadása + VM_DEPLOYMENT_GUIDE.md angol forrás (@zen0bit) javítása---

## [2.8.2] — 2026-03-19

> Sprint: 2 egyesített PR, modellálnevek útválasztási javítása, naplóexportálás és problémamegosztás.### Funkciók

-**Napló exportálás**: Új Exportálás gomb a `/dashboard/logs' oldalon időtartomány legördülő menüvel (1h, 6h, 12h, 24h). Letölti a kérelem/proxy/hívásnaplók JSON-ját az `/api/logs/export' API-n keresztül (#user-request)### Bug Fixes

-**Modell aliasok útválasztása**(#472): Beállítások → Modell álnevek mostantól helyesen befolyásolják a szolgáltató útválasztását, nem csak a formátum észlelését. Korábban a "resolveModelAlias()" kimenet csak a "getModelTargetFormat()"-hoz volt használva, de az eredeti modellazonosítót elküldték a szolgáltatónak -**Stream-öblítés használata**(#480): A pufferben lévő utolsó SSE-esemény használati adatai most megfelelően ki lettek bontva az adatfolyam-öblítés során (egyesített a @prakersh-ből)### Merged PRs

- #480 – Használat kivonása a maradék pufferből az öblítéskezelőben (@prakersh)
- #479 – Adja hozzá a hiányzó Codex 5.3/5.4-et és az Anthropic modell ID árbejegyzéseit (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Öt közösségi PR – streaming hívásnapló javítások, Kiro-kompatibilitás, gyorsítótár-token elemzés, kínai fordítás és konfigurálható eszközhívás-azonosítók.### Funkciók

-**feat(logs)**: A hívásnapló választartalma immár megfelelően felhalmozott nyers szolgáltatói darabokból (OpenAI/Claude/Gemini) a fordítás előtt, javítva az üres válaszokat adatfolyam módban (#470, @zhangqiang8vip) -**feat(szolgáltatók)**: Modellenként konfigurálható, 9 karakteres eszközhívás-azonosító normalizálása (Mistral-stílus) – csak azok a modellek kapnak csonkolt azonosítókat, amelyeknél ez az opció engedélyezett (#470) -**feat(api)**: A Key PATCH API kibővült az "allowedConnections", "name", "autoResolve", "isActive" és "accessSchedule" mezők támogatására (#470) -**feat(műszerfal)**: Válasz-első elrendezés a kérésnapló-részletek felhasználói felületén (#470) -**feat(i18n)**: Továbbfejlesztett kínai (zh-CN) fordítás – teljes újrafordítás (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: A beadott "modell" mező eltávolítása a kérés törzséből – A Kiro API elutasítja az ismeretlen legfelső szintű mezőket (#478, @prakersh) -**javítás(használat)**: A pontos elemzés érdekében a gyorsítótár olvasási + gyorsítótár-létrehozási tokenjeit tartalmazza a használati előzmények beviteli összegeiben (#477, @prakersh) -**fix(callLogs)**: támogatja a Claude formátum használati mezőit (`input_tokens`/`output_tokens`) az OpenAI formátum mellett, tartalmazza az összes gyorsítótár-token változatot (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan szolgáltató szerkeszthető alap URL-ekkel, valamint közösségi hozzájárulással az Alibaba Cloud és a Kimi Coding számára.### Funkciók

-**feat(szolgáltatók)**: Bailian Coding Plan ("bailian-coding-terv") hozzáadva – Alibaba Model Studio Anthropic-kompatibilis API-val. Statikus katalógus 8 modellből, köztük Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 és Kimi K2.5. Tartalmazza az egyéni hitelesítés-ellenőrzést (400=érvényes, 401/403=érvénytelen) (#467, @Mind-Dragon) -**feat(admin)**: Szerkeszthető alapértelmezett URL a szolgáltatói adminisztrátor létrehozási/szerkesztési folyamatában – a felhasználók kapcsolatonként konfigurálhatnak egyéni alap URL-eket. Megmaradt a `providerSpecificData.baseUrl-ben, Zod-sémaellenőrzéssel, amely elutasítja a nem http-sémákat (#467)### 🧪 Tests

- 30+ egységteszt és 2 e2e forgatókönyv hozzáadva a Bailian Coding Plan szolgáltatóhoz, amelyek lefedik a hitelesítés ellenőrzését, a séma keményítését, az útvonalszintű viselkedést és a rétegek közötti integrációt---

## [2.7.10] — 2026-03-19

> Sprint: Két új, közösségi hozzájárulású szolgáltató (Alibaba Cloud Coding, Kimi Coding API-kulcs) és a Docker pino javítás.### Funkciók

-**feat(szolgáltatók)**: Alibaba Cloud Coding Plan támogatás hozzáadva két OpenAI-kompatibilis végponttal – `alicode` (Kína) és `alicode-intl` (nemzetközi), mindegyik 8 modellel (#465, @dtk1985) -**feat(providers)**: Dedikált "kimi-coding-apikey" szolgáltató elérési útja hozzáadva – API-kulcs alapú Kimi Coding hozzáférés többé nem kényszerül az OAuth-only "kimi-coding" útvonalon keresztül. Tartalmazza a rendszerleíró adatbázist, a konstansokat, a modell API-t, a konfigurációt és az érvényesítési tesztet (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: A hiányzó `split2` függőséget hozzáadtuk a Docker-képhez – a `pino-abstract-transport` megköveteli futás közben, de nem másolták át az önálló tárolóba, ami a `Cannot find module 'split2'` összeomlását okozza (#459)---

## [2.7.9] — 2026-03-18

> Sprint: A Codex válaszok alútvonal-áteresztése natívan támogatott, a Windows MITM összeomlása javítva, és a Combos ügynöksémák módosítva.### Funkciók

-**feat(codex)**: Natív válaszok alútvonala a Codex számára – natív módon továbbítja a `POST /v1/responses/compact'-t a Codex felé, fenntartva a Claude Code kompatibilitását a `/compact' utótag eltávolítása nélkül (#457)### 🐛 Bug Fixes

-**fix(combos)**: A Zod-sémák ("updateComboSchema" és "createComboSchema") mostantól tartalmazzák a "system_message", "tool_filter_regex" és "context_cache_protection" paramétereket. Kijavítottuk azt a hibát, amely miatt az irányítópulton keresztül létrehozott ügynökspecifikus beállításokat a háttérellenőrzési réteg csendben elvetette (#458) -**fix(mitm)**: A Kiro MITM-profil összeomlása a Windows rendszeren javítva – a `node-machine-id` meghiúsult a `REG.exe` env hiánya miatt, és a tartalék egy végzetes `kripto nincs definiálva` hibát dobott. A tartalék most biztonságosan és helyesen importálja a kriptot (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Költségkeret-megtakarítási hiba + kombinált ügynök funkciók UI + omniModel címke biztonsági javítás.### 🐛 Bug Fixes

-**fix(költségvetés)**: A "Korlátok mentése" már nem ad vissza 422-t – a "warningThreshold" most helyesen kerül elküldésre törtként (0–1) százalék (0–100) helyett (#451) -**fix(combos)**: Az `<omniModel>` belső gyorsítótár-címkét a rendszer eltávolítja, mielőtt a kéréseket továbbítaná a szolgáltatóknak, ezzel megakadályozva a gyorsítótári munkamenet megszakítását (#454)### Funkciók

-**feat(combos)**: Az Ügynökfunkciók szakasz hozzáadva a kombinált mód létrehozásához/szerkesztéséhez – a „system_message” felülírás, a „tool_filter_regex” és a „context_cache_protection” megjelenítése közvetlenül az irányítópultról (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino összeomlás, Codex CLI válaszok dolgozó javítása, csomagzár szinkronizálás.### 🐛 Bug Fixes

-**fix(docker)**: a "pino-abstract-transport" és a "pino-pretty" már kifejezetten másolva a Docker runner szakaszában – A Next.js önálló nyomkövetése kihagyja ezeket a peer dep-eket, ami a "Cannot find module pino-abstract-transport" összeomlását okozza indításkor (#449). -**fix(responses)**: Távolítsa el az `initTranslators()`-t a `/v1/responses' útvonalról – a Next.js-munkavégző összeomlott, és a „the worker is exited” (a dolgozó kilépett) uncaughtException kivételével a Codex CLI-kéréseknél (#450)### 🔧 Maintenance

-**chore(deps)**: A "package-lock.json" mostantól minden verzióhibánál elkötelezett, hogy a Docker `npm ci' pontosan a függőségi verziókat használja---

## [2.7.5] — 2026-03-18

> Sprint: UX fejlesztések és Windows CLI állapotellenőrzés javítása.### 🐛 Bug Fixes

-**fix(ux)**: Az alapértelmezett jelszóra vonatkozó utalás megjelenítése a bejelentkezési oldalon – az új felhasználók most az „Alapértelmezett jelszó: 123456” feliratot látják a jelszóbevitel alatt (#437) -**fix(cli)**: A Claude CLI-t és az egyéb npm-re telepített eszközöket a rendszer most már megfelelően futtathatóként észlelte Windowson – a spawn a `shell:true`-t használja a `.cmd` burkolók PATHEXT-en keresztüli feloldásához (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Keresőeszközök irányítópultja, i18n-javítások, másodpilóta-korlátok, Serper-ellenőrzési javítás.### Funkciók

-**feat(search)**: Search Playground hozzáadása (10. végpont), Keresőeszközök oldal a Szolgáltatók összehasonlítása/Rerank Pipeline/Keresési előzmények szolgáltatással, helyi áthelyezési útvonalválasztás, hitelesítési őrök a keresési API-n (#443, @Regis-RCR)

- Új útvonal: `/dashboard/search-tools`
- Sidebar bejegyzés a Hibakeresés szakaszban
- "GET /api/search/providers" és "GET /api/search/stats" hitelesítő őrökkel
- Helyi szolgáltatói_csomópontok útválasztása a `/v1/rerank' számára
- 30+ i18n kulcs a keresési névtérben### 🐛 Bug Fixes

-**javítás(keresés)**: A Brave news normalizáló javítása (0 eredményt adott vissza), a max_results csonkolásának kényszerítése a normalizálás után, a Végpontok oldal lekérési URL-jének javítása (#443, @Regis-RCR) -**javítás(analytics)**: Az elemzési nap/dátum címkék lokalizálása – cserélje ki a keménykódolt portugál karakterláncokat az "Intl.DateTimeFormat(locale)" kifejezésre (#444 @hijak) -**javítás(másodpilóta)**: A GitHub Copilot fióktípus megfelelő megjelenítése, a félrevezető korlátlan kvótasorok szűrése a limits irányítópultról (#445, @hijak) -**javítás(szolgáltatók)**: ne utasítsa el az érvényes Serper API-kulcsokat – a nem 4xx válaszokat érvényes hitelesítésként kezeli (#446 @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex közvetlen API kvóta tartalék javítás.### 🐛 Bug Fixes

-**fix(codex)**: A heti kimerült fiókok blokkolása a közvetlen API tartalékban (#440)

- A `resolveQuotaWindow()` előtag egyezése: a "weekly" most megegyezik a "weekly (7d)" gyorsítótár kulcsaival
- Az `applyCodexWindowPolicy()` helyesen kényszeríti ki a `useWeekly/`use5h` kapcsolót
- 4 új regressziós teszt (összesen 766)---

## [2.7.2] — 2026-03-18

> Sprint: Világos módú felhasználói felület kontrasztjavítások.### 🐛 Bug Fixes

-**javítás(naplók)**: Javítsa meg a fény mód kontrasztját a kérésnaplók szűrőgombjaiban és a kombinált jelvényben (#378)

- A Hiba/Siker/Kombinált szűrőgombok világos módban is olvashatók
- A kombinált soros jelvény erősebb lilát használ világos módban---

## [2.7.1] — 2026-03-17

> Sprint: Egységes webes keresési útvonalválasztás (POST /v1/search) 5 szolgáltatóval + Next.js 16.1.7 biztonsági javítások (6 CVE).### ✨ New Features

-**feat(search)**: Egységes internetes keresési útvonalválasztás – `POST /v1/search` 5 szolgáltatóval (Serper, Brave, Perplexity, Exa, Tavily)

- Automatikus feladatátvétel a szolgáltatók között, több mint 6500 ingyenes keresés havonta
- Memórián belüli gyorsítótár kérésegyesítéssel (konfigurálható TTL)
- Irányítópult: Keresés az Analytics lapon a `/dashboard/analytics' oldalon szolgáltatói lebontással, gyorsítótár találati arányával, költségkövetéssel
- Új API: "GET /api/v1/search/analytics" a keresési kérelmek statisztikájához
- DB-migráció: "request_type" oszlop a "call_logs"-on a nem csevegési kérések követéséhez
- Zod-ellenőrzés (`v1SearchSchema`), hitelesített, a költség a `recordCost()-on keresztül rögzítve### Biztonság

-**deps**: Next.js 16.1.6 → 16.1.7 – 6 CVE-t javít: -**Kritikus**: CVE-2026-29057 (HTTP-kérés csempészete http-proxyn keresztül) -**Magas**: CVE-2026-27977, CVE-2026-27978 (WebSocket + szerverműveletek) -**Közepes**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fájl                                                             | Cél                                                           |
| ---------------------------------------------------------------- | ------------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Kereséskezelő 5 szolgáltatós útválasztással                   |
| `open-sse/config/searchRegistry.ts`                              | Szolgáltatói nyilvántartás (hitelesítés, költség, kvóta, TTL) |
| `open-sse/services/searchCache.ts`                               | Memórián belüli gyorsítótár kérésegyesítéssel                 |
| `src/app/api/v1/search/route.ts`                                 | Next.js útvonal (POST + GET)                                  |
| "src/app/api/v1/search/analytics/route.ts"                       | Keresési statisztika API                                      |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analytics irányítópult lap                                    |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB migráció                                                   |
| `tests/unit/search-registry.test.mjs`                            | 277 soros egységteszt                                         | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter által ihletett funkciók – toolCalling zászló, többnyelvű szándékfelismerés, benchmark-vezérelt tartalék, kérés deduplikáció, csatlakoztatható RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 árazás.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast – „0,20 USD/0,50 USD 1 millió tokenenként”, 1143 ms p50 késleltetés, eszközhívás támogatott -**feat(árképzés)**: xAI Grok-4 (standard) – „0,20 USD/1,50 USD 1 millió tokenenként”, az érvelés zászlóshajója -**feat(pricing)**: GLM-5 Z.AI-n keresztül – "0,5 USD/1 millió", 128 000 kimeneti kontextus -**feat(árképzés)**: MiniMax M2.5 — `0,30 USD/1 millió bemenet', érvelés + ügynöki feladatok -**feat(pricing)**: DeepSeek V3.2 – frissített ár: „0,27 USD/1,10 USD/1 millió” -**feat(pricing)**: Kimi K2.5 a Moonshot API-n keresztül – közvetlen Moonshot API hozzáférés -**feat(szolgáltatók)**: Z.AI szolgáltató hozzáadva ("zai" alias) - GLM-5 család 128K kimenettel### 🧠 Routing Intelligence

-**feat(registry)**: "toolCalling" jelző modellenként a szolgáltatói nyilvántartásban – a kombinációk mostantól előnyben részesíthetik/követelhetik meg az eszközhívásra képes modelleket -**feat(scoring)**: Többnyelvű szándékérzékelés az AutoCombo pontozáshoz – A PT/ZH/ES/AR script/nyelvminták befolyásolják a modell kiválasztását kéréskontextusonként -**feat(fallback)**: Összehasonlítás által vezérelt tartalék láncok – valós késleltetési adatok (p50 a "comboMetrics"-ből) a tartalék prioritás dinamikus átrendezésére -**feat(dedup)**: Deduplikáció kérése tartalom-hash-en keresztül – az 5 másodperces idempotenciaablak megakadályozza, hogy a duplikált szolgáltatói hívások újra próbálkozzanak az ügyfelekkel -**feat(router)**: Csatlakoztatható "RouterStrategy" interfész az "autoCombo/routerStrategy.ts" fájlban – egyéni útválasztási logika beilleszthető a mag módosítása nélkül### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 új speciális eszközséma: `omniroute_get_provider_metrics` (p50/p95/p99 szolgáltatónként) és `omniroute_explain_route` (útválasztási döntés magyarázata) -**feat(mcp)**: MCP-eszköz hitelesítési hatókörei frissítve – „metrics:read” hatókör hozzáadva a szolgáltatói mérőeszközökhöz -**feat(mcp)**: Az `omniroute_best_combo_for_task` mostantól elfogadja a `languageHint` paramétert a többnyelvű útválasztáshoz### 📊 Observability

-**feat(metrics)**: "comboMetrics.ts" valós idejű késleltetési százalékos követéssel szolgáltatónként/fiókonként -**feat(health)**: A Health API ("/api/monitoring/health") mostantól szolgáltatónkénti "p50Latency" és "errorRate" mezőket ad vissza -**feat(usage)**: A használati előzmények áttelepítése a várakozási idő modellenkénti követéséhez### 🗄️ DB Migrations

-**feat(migrations)**: Új oszlop „latency_p50” a „combo_metrics” táblázatban – nulla törés, biztonságos a meglévő felhasználók számára### 🐛 Bug Fixes / Closures

-**close(#411)**: jobb sqlite3 kivonatolt modulfelbontás Windows rendszeren – javítva a v2.6.10-ben (f02c5b5) -**close(#409)**: A GitHub Copilot csevegés befejezése meghiúsul a Claude modelleknél, ha fájlokat csatolnak – javítva a 2.6.9-ben (838f1d6) -**close(#405)**: #411 másolata – megoldva## [2.6.10] — 2026-03-17

> Windows javítás: jobb-sqlite3 előre beépített letöltés node-gyp/Python/MSVC nélkül (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Windows rendszeren az `npm install -g omniroute` meghiúsult a `better_sqlite3.node nem érvényes Win32-alkalmazással`, mert a kötegelt natív binárist Linuxra fordították. Hozzáadja a**Strategy 1.5**-et a `scripts/postinstall.mjs`-hez: a `@mapbox/node-pre-gyp install --fallback-to-build=false`-t használja (a `better-sqlite3`-ban van csomagolva) a megfelelő előre elkészített bináris letöltéséhez az aktuális operációs rendszerhez/archívumhoz anélkül, hogy bármilyen PysyC-készítő eszközre lenne szüksége, (, nodethongyp, nodethongyp, nodethongyp, nodethongyp). Csak akkor tér vissza az "npm rebuild"-re, ha a letöltés sikertelen. Platformspecifikus hibaüzeneteket ad hozzá egyértelmű kézi javítási utasításokkal.---

## [2.6.9] — 2026-03-17

> CI-javítások (t11 any-budget), 409-es hibajavítás (fájlmellékletek a Copilot+Claude segítségével), a munkafolyamat-javítás kiadása.### 🐛 Bug Fixes

-**fix(ci)**: Távolítsa el az "any" szót az "openai-responses.ts" és "chatCore.ts" megjegyzései közül, amelyek nem feleltek meg a t11 `semmilyen` költségkeret ellenőrzésen (hamis pozitív a reguláris kifejezéseket számláló megjegyzésekből) -**fix(chatCore)**: Normalizálja a nem támogatott tartalomrésztípusokat, mielőtt továbbítaná a szolgáltatóknak (#409 – A kurzor a `{type:"file"}` értéket küldi, ha `.md` fájlokat csatolnak; a másodpilóta és más OpenAI-kompatibilis szolgáltatók elutasítják a "típusnak kell lennie 'image_url' vagy 'text block`s' docutext fix`s `file; és ismeretlen típusokat ejt)### 🔧 Workflow

-**chore(generate-release)**: ATOMIC COMMIT SZABÁLY hozzáadása – verzió bump (`npm verziójavítás`) KELL megtörténnie a funkciófájlok véglegesítése előtt, hogy a címke mindig az összes verzióváltozást együtt tartalmazó véglegesítésre mutasson---

## [2.6.8] — 2026-03-17

> Sprint: Combo as Agent (rendszerprompt + eszközszűrő), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE kombók ADD COLUMN system_message SZÖVEG ALAPÉRTELMEZETT NULL`, `tool_filter_regex SZÖVEG ALAPÉRTELMEZETT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Új `request_detail_logs' tábla 500 bejegyzéses csengőpuffer triggerrel, feliratkozás a beállítások kapcsolójával### Funkciók

-**feat(combo)**: Rendszerüzenet-felülírás kombinációnként (#399 – a "system_message" mező lecseréli vagy beszúrja a rendszerkérést, mielőtt továbbítaná a szolgáltatónak) -**feat(combo)**: Tool Filter Regex per Combo (#399 – a `tool_filter_regex` csak a mintának megfelelő eszközöket tartja meg; támogatja az OpenAI + Anthropic formátumokat) -**feat(combo)**: Kontextus-gyorsítótárazás elleni védelem (#401 – a `context_cache_protection` a válaszokat `<omniModel>szolgáltató/modell</omniModel>` és pin-modellel címkézi a munkamenet-folytonosság érdekében) -**feat(settings)**: Automatikus frissítés a beállításokon keresztül (#320 — `GET /api/system/version` + `POST /api/system/update` — ellenőrzi az npm rendszerleíró adatbázist és a frissítéseket a háttérben a pm2 újraindításával) -**feat(logs)**: Részletes kérésnaplók (#378 – a folyamat teljes törzsét rögzíti 4 szakaszban: ügyfélkérés, lefordított kérés, szolgáltatói válasz, ügyfélválasz – engedélyezési kapcsoló, 64 KB-os vágás, 500 bejegyzéses gyűrűpuffer) -**feat(mitm)**: MITM Kiro IDE profil (#336 – `src/mitm/targets/kiro.ts` az api.anthropic.com webhelyet célozza meg, a meglévő MITM infrastruktúrát újrahasználja)---

## [2.6.7] — 2026-03-17

> Sprint: SSE fejlesztések, helyi szolgáltatói_nodes bővítmények, proxy registry, Claude áthárító javítások.### Funkciók

-**feat(health)**: A helyi „szolgáltató_csomópontok” háttérellenőrzése exponenciális visszalépéssel (30s→300s) és „Promise.allSettled” a blokkolás elkerülése érdekében (#423, @Regis-RCR) -**feat(embeddings)**: A `/v1/embeddings' átirányítása a helyi "provider_nodes" - "buildDynamicEmbeddingProvider()" állomásnév-ellenőrzéssel (#422, @Regis-RCR) -**feat(audio)**: A TTS/STT átirányítása a helyi "provider_nodes" - "buildDynamicAudioProvider()" SSRF-védelemmel (#416, @Regis-RCR) -**feat(proxy)**: Proxy-nyilvántartás, felügyeleti API-k és kvótakorlátok általánosítása (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Claude-specifikus mezők ("metaadatok", "anthropic_version") eltávolítása, ha a cél OpenAI-kompatibilis (#421, @prakersh) -**fix(sse)**: A Claude SSE használatának kibontása (`input_tokens`, `output_tokens`, cache tokenek) átmenő adatfolyam módban (#420, @prakersh) -**fix(sse)**: tartalék `call_id` generálása a hiányzó/üres azonosítókkal rendelkező eszközhívásokhoz (#419, @prakersh) -**fix(sse)**: Claude-tól Claude-ig való áthaladás – az elülső test teljesen érintetlen, nincs újrafordítás (#418, @prakersh) -**fix(sse)**: Az árva "tool_result" elemek szűrése a Claude Code kontextustömörítése után a 400-as hibák elkerülése érdekében (#417, @prakersh) -**fix(sse)**: Az üres név eszközhívások kihagyása a Responses API fordítóban, hogy elkerülje a `placeholder_tool' végtelen hurkokat (#415, @prakersh) -**fix(sse)**: az üres szöveges tartalomblokkok eltávolítása a fordítás előtt (#427, @prakersh) -**fix(api)**: Adja hozzá a "frissíthető: igaz" Claude OAuth-teszt konfigurációjához (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` és kapcsolódó devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker kompatibilitás – távolítsa el a `node:` protokollt az összes `src/` importból.### 🐛 Bug Fixes

-**fix(build)**: Eltávolították a "node:" protokoll előtagot az "import" utasításokból 17 fájlban az "src/" alatt. A "node:fs", "node:path", "node:url", "node:os" stb. importálása azt okozta, hogy az "Ecmascript-fájl hibázott" a Turbopack buildeknél (Next.js 15 Docker) és a régebbi npm globális telepítésekből származó frissítéseknél. Érintett fájlok: "migrationRunner.ts", "core.ts", "backup.ts", "prompts.ts", "dataPaths.ts" és további 12 fájl az "src/app/api/" és "src/lib/" fájlokban. -**chore(workflow)**: Frissített `generate-release.md`, hogy a Docker Hub szinkronizálása és a dual-VPS minden kiadásban**kötelező**lépéseket tegyen.---

## [2.6.5] — 2026-03-17

> Sprint: érvelési modell paraméterszűrése, helyi szolgáltató 404-es javítása, Kilo Gateway szolgáltató, függőségi hibák.### ✨ New Features

-**feat(api)**:**Kilo Gateway**(`api.kilo.ai`) hozzáadva új API-kulcs-szolgáltatóként (alias `kg`) — 335+ modell, 6 ingyenes modell, 3 automatikus útválasztási modell (`kilo-auto/frontier`, `kilo-auto/balanced`/free`kilo-auto). Az „/api/gateway/models” végponton keresztül támogatott áthaladási modellek. (PR #408, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: A nem támogatott paraméterek törlése az érvelési modelleknél (o1, o1-mini, o1-pro, o3, o3-mini). Az "o1"/"o3" családba tartozó modellek elutasítják a "hőmérséklet", "top_p", "frekvenciás_büntetés", "jelenléti_büntetés", "logprobs", "top_logprobs" és "n" értéket a HTTP 400-as protokollal. A paraméterek a 'chatCore' rétegben most törlődnek. Egy deklaratív "unsupportedParams" mezőt használ modellenként és egy előre kiszámított O(1) térképet a kereséshez. (PR #412, @Regis-RCR) -**fix(sse)**: A 404-es helyi szolgáltató mostantól**csak modellre vonatkozó zárolást (5 másodperc)**eredményez a kapcsolatszintű zárolás (2 perc) helyett. Amikor egy helyi következtetési háttér (Ollama, LM Studio, oMLX) 404-et ad vissza egy ismeretlen modellhez, a kapcsolat aktív marad, és a többi modell azonnal tovább működik. Kijavít egy olyan már meglévő hibát is, ahol a „model” nem került át a „markAccountUnavailable()”-ba. Helyi szolgáltatók a gazdagépnéven keresztül észlelve (`localhost`, `127.0.0.1`, `::1`, bővíthető a `LOCAL_HOSTNAMES` env var segítségével). (PR #410, @Regis-RCR)### 📦 Dependencies

- "jobb-sqlite3" 12.6.2 → 12.8.0
- "udici" 7.24.2 → 7.24.4
- "https-proxy-agent" 7 → 8
- "agent-base" 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**javítás(szolgáltatók)**: Eltávolítottuk a nem létező modellneveket 5 szolgáltatónál: -**gemini / gemini-cli**: eltávolítva a "gemini-3.1-pro/flash" és a "gemini-3-\*-preview" (nem létezik a Google API v1beta verziójában); lecserélve: "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro/flash" -**antigravitáció**: eltávolítva a "gemini-3.1-pro-high/low" és a "gemini-3-flash" (érvénytelen belső álnevek); valódi 2.x modellekre cserélték -**github (másodpilóta)**: eltávolítva a "gemini-3-flash-preview" és a "gemini-3-pro-preview"; helyére "gemini-2.5-flash". -**nvidia**: javított `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (az NVIDIA NIM `meta/` névteret használ a Meta modellekhez); hozzáadta az "nvidia/llama-3.1-70b-instruct" és az "nvidia/llama-3.1-405b-instruct" -**fix(db/combo)**: Frissített "free-stack" kombó a távoli DB-n: eltávolítva a "qw/qwen3-coder-plus" (lejárt frissítési token), javítva az "nvidia/llama-3.3-70b-instruct" → "nvidia/meta/llama-3.3-70" helyesbített "gemini/gemini-3.1-flash" → "gemini/gemini-2.5-flash", hozzáadva az "if/deepseek-v3.2"---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-csík beépítve a build csővezetékbe, szintetikus szolgáltató hozzáadva, VPS PM2 útvonal javítva.### 🐛 Bug Fixes

-**fix(build)**: A Turbopack hash-strip most**fordítási időben**fut MINDEN csomaghoz – nem csak a `better-sqlite3`-hoz. A „prepublish.mjs” 5.6-os lépése minden „.js”-t bejár az „app/.next/server/” fájlban, és kivonja a 16 karakteres hexadecimális utótagot a kivonatolt „require()”-ből. Javítja a `zod-dcb22c...`, `pino-...` stb. MODULE_NOT_FOUND hibát a globális npm telepítéseknél. Bezár #398 -**fix(deploy)**: A PM2 mindkét VPS-en elavult git-klón könyvtárra mutatott. Újrakonfigurálva az `app/server.js' fájlra az npm globális csomagban. A `/deploy-vps' munkafolyamat frissítve az npm pack + scp használatára (az npm rendszerleíró adatbázis elutasítja a 299 MB-os csomagokat).### Funkciók

-**feat(szolgáltató)**: Szintetikus ([synthetic.new](https://synthetic.new)) – adatvédelemre fókuszáló OpenAI-kompatibilis következtetés. "passthroughModels: true" a dinamikus HuggingFace modellkatalógushoz. Kezdeti modellek: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404, @Regis-RCR)### 📋 Issues Closed

-**Bezárás #398**: npm hash regresszió – fordítási idő hash-szalagja javítva a közzététel előtt -**triage #324**: Bug screenshot without steps — requested reproduction details---

## [2.6.2] — 2026-03-16

> Sprint: a modul kivonatolása teljesen kijavítva, 2 PR egyesítése (Anthropic Tools szűrő + egyéni végponti útvonalak), Alibaba Cloud DashScope szolgáltató hozzáadva, 3 elavult probléma lezárva.### 🐛 Bug Fixes

-**fix(build)**: Kibővített webpack `externals` hash-szalag az ÖSSZES `serverExternalPackage`-re, nem csak a `better-sqlite3-ra'. A Next.js 16 Turbopack kivonatolja a "zod", "pino" és minden más szerver külső csomagot olyan nevekre, mint a "zod-dcb22c6336e0bc69", amelyek nem léteznek a "node_modules" futásidőben. A HASH_PATTERN regex összesítő most megfosztja a 16 karakterből álló utótagot, és visszakerül az alapcsomag nevére. Szintén hozzáadva a `NEXT_PRIVATE_BUILD_WORKER=0' paramétert a `prepublish.mjs'-ben a webpack mód megerősítése érdekében, valamint egy utólagos vizsgálat, amely minden fennmaradó kivonatolt hivatkozást jelent. (#396, #398, PR #403)
-**fix(chat)**: Az antropikus formátumú eszközneveket ("tool.name" ".function" burkoló nélkül) a #346-ban bevezetett üres név szűrő csendben elvetette. A LiteLLM proxy kéréseket "anthropic/" előtaggal Anthropic Messages API formátumban hajt végre, így az összes eszközt kiszűri, és az Anthropic a 400-as értéket adja vissza: tool_choice.any csak az eszközök biztosítása közben adható meg. Javítva a `tool.name`visszalépéssel, amikor a`tool.function.name` hiányzik. 8 regressziós egység teszt hozzáadva. (PR #397)### Funkciók

-**feat(api)**: Egyéni végpont elérési utak az OpenAI-kompatibilis szolgáltatói csomópontokhoz – konfigurálja a „chatPath” és „modelsPath” paramétereket csomópontonként (pl. „/v4/chat/completions”) a szolgáltatói kapcsolat felhasználói felületén. Tartalmaz egy DB-áttelepítést (`003_provider_node_custom_paths.sql`) és az URL-útvonal-tisztítást (nincs `..` bejárás, `/`-vel kell kezdődnie). (PR #400) -**feat(szolgáltató)**: Az Alibaba Cloud DashScope OpenAI-kompatibilis szolgáltatóként lett hozzáadva. Nemzetközi végpont: `dashscope-intl.aliyuncs.com/yhteensopiva-mode/v1`. 12 modell: "qwen-max", "qwen-plus", "qwen-turbo", "qwen3-coder-plus/flash", "qwq-plus", "qwq-32b", "qwen3-32b", "qwen3-235b" Auth: Bearer API kulcs.### 📋 Issues Closed

-**close #323**: Cline connection error `[object Object]` — fixed in v2.3.7; utasította a felhasználót a 2.2.9-es verzió frissítésére -**bezárás #337**: Kiro hitelkövetés – a 2.5.5 verzióban implementálva (#381); a felhasználó az Irányítópult → Használat menüpontra mutatott -**triage #402**: Az ARM64 macOS DMG sérült – macOS-verziót kért, pontos hiba, és javasolt "xattr -d com.apple.quarantine" megoldás---

## [2.6.1] — 2026-03-15

> Kritikus indítási javítás: A v2.6.0 globális npm-telepítések 500-as hibával összeomlottak a Turbopack/webpack modulnév kivonatolási hibája miatt a Next.js 16 műszeres horogban.### 🐛 Bug Fixes

-**fix(build)**: Kényszeríti a `better-sqlite3'-t, hogy mindig a pontos csomagnév szerint legyen megkövetelve a webpack-kiszolgálócsomagban. A Next.js 16 egy külön darabba fordította az instrumentation hook-ot, és kiadta a `require('better-sqlite3-<hash>')'-t – egy kivonatolt modulnevet, amely nem létezik a `node_modules'-ban – annak ellenére, hogy a csomag szerepelt a `serverExternalPackages`-ben. Explicit "externals" függvényt adtunk a kiszolgáló webcsomag konfigurációjához, így a kötegelő mindig kiadja a "require('better-sqlite3')" parancsot, ami megoldja az '500 Internal Server Error' indítási hibát tiszta globális telepítéseknél. (#394, PR #395)### 🔧 CI

-**ci**: `workflow_dispatch` hozzáadva az `npm-publish.yml` fájlhoz, verziószinkronizálási védelemmel a kézi aktiválásokhoz (#392) -**ci**: `workflow_dispatch` hozzáadva a `docker-publish.yml` fájlhoz, a GitHub Actions frissítve a legújabb verziókra (#392)---

## [2.6.0] - 2026-03-15

> Problémamegoldó sprint: 4 hiba javítva, naplózási UX javítva, Kiro hitelkövetés hozzáadva.### 🐛 Bug Fixes

-**fix(media)**: A ComfyUI és az SD WebUI többé nem jelenik meg a médiaoldal-szolgáltatók listájában, ha nincs konfigurálva – lekéri az `/api/providers' fájlt a csatlakoztatáskor, és elrejti a kapcsolat nélküli helyi szolgáltatókat (#390) -**fix(auth)**: A Round-robin már nem választja ki újra a korlátozott sebességű fiókokat közvetlenül a lehűlés után – a „backoffLevel” mostantól elsődleges rendezési kulcs az LRU-rotációban (#340) -**fix(oauth)**: A Qoder (és más szolgáltatók, amelyek átirányítanak a saját felhasználói felületükre) többé nem hagyják az OAuth-módszert „Várakozás engedélyezésre” állapotban – a felugró ablakban bezárt érzékelő automatikusan átvált kézi URL-beviteli módba (#344). -**fix(logs)**: A kérések naplótáblázata mostantól világos módban is olvasható – az állapotjelvények, a tokenszámok és a kombinált címkék adaptív „dark:” színosztályokat használnak (#378)### Funkciók

-**feat(kiro)**: A Kiro jóváírás követése hozzáadva a használati lekérőhöz – lekérdezi a "getUserCredits" szót az AWS CodeWhisperer végpontról (#337)### 🛠 Chores

-**chore(tests)**: A "teszt:terv3", "teszt:javítások", "test:security" igazítása ugyanazt a "tsx/esm" betöltőt használja, mint az "npm teszt" – kiküszöböli a modulfeloldás fals negatívumait a célzott futtatások során (PR #386)---

## [2.5.9] - 2026-03-15

> Codex natív áthaladási javítás + útvonaltörzs validálási keményítés.### 🐛 Bug Fixes

-**fix(codex)**: A natív válaszok API áthárításának megőrzése Codex kliensek számára – elkerüli a szükségtelen fordítási mutációkat (PR #387) -**fix(api)**: Kérelemtörzsek érvényesítése az árképzési/szinkronizálási és feladat-útválasztási útvonalakon – megakadályozza a hibás bemenetek miatti összeomlásokat (PR #388) -**fix(auth)**: A JWT-titkok az `src/lib/db/secrets.ts' fájlon keresztül történő újraindítások során is megmaradnak – kiküszöböli a 401-es hibákat a pm2 újraindítása után (PR #388)---

## [2.5.8] - 2026-03-15

> Build javítás: a V2.5.7 hiányos közzététele miatt megszakadt VPS-kapcsolat helyreállítása.### 🐛 Bug Fixes

-**fix(build)**: a `scripts/prepublish.mjs` továbbra is elavult `--webpack` jelzőt használt, ami a Next.js önálló felépítésének csendes meghiúsulását okozza – az npm közzététel `app/server.js` nélkül befejeződött, megszakítva a VPS-telepítést---

## [2.5.7] - 2026-03-15

> Médiajátszótér hibakezelési javítások.### 🐛 Bug Fixes

-**fix(media)**: Az „API-kulcs szükséges” átírás hamis pozitív, ha a hang nem tartalmaz beszédet (zene, csend) – helyette a „Nincs beszéd észlelve” felirat látható -**fix(media)**: az "upstreamErrorResponse" az "audioTranscription.ts" és az "audioSpeech.ts" fájlokban most a megfelelő JSON-t adja vissza (`{error:{message}}`), lehetővé téve a helyes 401/403-as hitelesítési hiba észlelését a MediaPageClientben -**fix(media)**: a `parseApiError` mostantól kezeli a Deepgram `err_msg` mezőjét, és észleli az `"api kulcsot" a hibaüzenetekben a pontos hitelesítő adatok hibabesorolása érdekében---

## [2.5.6] - 2026-03-15

> Kritikus biztonsági/hitelesítési javítások: Az Antigravity OAuth megszakadt + a JWT-munkamenetek újraindítás után elvesztek.### 🐛 Bug Fixes

-**fix(oauth) #384**: Az Antigravity Google OAuth most megfelelően elküldi a "client_secret" értéket a token végpontnak. Az `ANTIGRAVITY_OAUTH_CLIENT_SECRET` tartaléka egy üres karakterlánc volt, ami hamis – ezért a `client_secret' soha nem szerepelt a kérésben, ami a `"kliens_secret hiányzik"" hibákat okoz minden egyéni env var nélküli felhasználó számára. Bezár #383. -**fix(auth) #385**: A `JWT_SECRET` most megmarad az SQLite-ban (`namespace='secrets'`) az első generációnál, és a következő indításoknál újra betöltődik. Korábban minden folyamatindításkor egy új véletlenszerű titok keletkezett, amely minden újraindítás vagy frissítés után érvénytelenítette az összes meglévő cookie-t/munkamenetet. A „JWT_SECRET” és az „API_KEY_SECRET” kulcsot is érinti. Bezár #382.---

## [2.5.5] - 2026-03-15

> Modellista dedup javítás, Electron önálló build keményítés és Kiro hitelkövetés.### 🐛 Bug Fixes

-**fix(models) #380**: A `GET /api/models` mostantól szolgáltatói álneveket is tartalmaz az aktív szolgáltató szűrőjének felépítésekor – a `claude` (alias `cc`) és `github` (alias `gh`) modelljei mindig megjelennek, függetlenül attól, hogy be van-e konfigurálva egy kapcsolat, de a DEL alias DB-k a PROVIDER_MO alatt találhatók. azonosítók. Javítva az egyes aktív szolgáltatói azonosítók kibővítése, hogy a `PROVIDER_ID_TO_ALIAS' álnevével is szerepeljen. Bezár: #353. -**fix(electron) #379**: Az új "scripts/prepare-electron-standalone.mjs" egy dedikált "/.next/electron-standalone" csomagot állít elő az Electron csomagolása előtt. Egyértelmű hibával megszakad, ha a "node_modules" egy szimbolikus hivatkozás (az elektronépítő futásidejű függőséget szállít a felépítési géptől). Platformok közötti útvonal-fertőtlenítés a "path.basename" segítségével. Írta: @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro hitelegyenleg-követés – a használati végpont mostantól a `codewhisperer.us-east-1.amazonaws.com/getUserCredits` meghívásával adja vissza a Kiro-fiókok hiteladatait (ugyanazt a végpontot használja a Kiro IDE belsőleg). Visszaadja a fennmaradó krediteket, a teljes juttatást, a megújítási dátumot és az előfizetési szintet. Bezár #337.## [2.5.4] - 2026-03-15

> A naplózó indítási javítása, a bejelentkezési rendszerindítási biztonsági javítás és a fejlesztői HMR megbízhatóságának javítása. A CI infrastruktúra megkeményedett.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: A pino szállítási naplózó elérési útjának visszaállítása — a `formatters.level` a `transport.targets` paraméterrel kombinálva a pino elutasította. A szállítás által támogatott konfigurációk most a `getTransportCompatibleConfig()' segítségével távolítják el a szintformázót. A numerikus szintű leképezést is kijavítja a `/api/logs/console`-ban: `30→info, 40→warn, 50→error’ (egyel eltolódott). -**fix(login) #375**: A bejelentkezési oldal most a nyilvános `/api/settings/require-login` végpontról indul a védett `/api/settings` helyett. A jelszóval védett beállításoknál az előzetes hitelesítési oldal 401-et kapott, és szükségtelenül visszaállt a biztonságos alapértelmezett értékekre. A nyilvános útvonal most minden rendszerindítási metaadatot (`requireLogin`, `hasPassword`, `setupComplete`) ad vissza egy konzervatív 200-as hiba esetén. -**fix(dev) #374**: Add `localhost` and `127.0.0.1` to `allowedDevOrigins` in `next.config.mjs` — HMR websocket was blocked when accessing the app via loopback address, producing repeated cross-origin warnings.### 🔧 CI & Infrastructure

-**ESLint OOM javítás**: Az `eslint.config.mjs` most figyelmen kívül hagyja a `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` és `clipr/**` - az ESLint összeomlott egy JS kupac VS Codes andbinarybloedb OOM-mal. darabokat. -**Egységteszt javítás**: Az elavult `ALTER TABLE provider_connections ADD COLUMN "group"` eltávolítva 2 tesztfájlból – az oszlop mostantól az alapséma része (a #373-ban hozzáadva), `SQLITE_ERROR: duplicate oszlopnév` minden CI-futásnál. -**Pre-commit hook**: `npm run test:unit` hozzáadva a `.husky/pre-commit`-hoz – az egységtesztek most blokkolják a megszakadt véglegesítéseket, mielőtt azok elérnék a CI-t.## [2.5.3] - 2026-03-14

> Kritikus hibajavítások: DB séma áttelepítése, indítási környezet betöltése, szolgáltatói hibaállapot törlése és i18n eszköztipp-javítás. A kódminőség javítása minden PR-n felül.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: `provider_connections.group` oszlop hozzáadása az alapsémához + háttérkitöltés migráció a meglévő adatbázisokhoz – az oszlop minden lekérdezésben szerepelt, de hiányzik a sémadefinícióból -**fix(i18n) #371**: Cserélje ki a nem létező `t("deleteConnection")' kulcsot a meglévő "providers.delete" kulccsal – javítja a "HIÁNYZAT_ÜZENET: providers.deleteConnection" futásidejű hibát a szolgáltató részletes oldalán
-**fix(auth) #372**: Az elavult hiba metaadatainak ("errorCode", "lastErrorType", "lastErrorSource") törlése a szolgáltatói fiókokból a valódi helyreállítás után – korábban a helyreállított fiókok továbbra is sikertelennek tűntek
-**fix(startup) #369**: Egységesítse az env betöltését az `npm run start`, `run-standalone.mjs`és Electron között, hogy tiszteletben tartsa a`DATA_DIR/.env → ~/.omniroute/.env → ./.env`prioritást – megakadályozza egy új`RYP_STORAGE_ENC crypted adatbázis létrehozását### 🔧 Code Quality

- Dokumentált "result.success" vs "response?.ok" minták az "auth.ts"-ben (mindkettő szándékos, most megmagyarázva)
- Normalizált "overridePath?.trim()" az "electron/main.js" fájlban, hogy megfeleljen a "bootstrap-env.mjs"
- Hozzáadott "preferredEnv" egyesítési rendelés megjegyzés az Electron indításakor

> Codex-fiókkvóta-szabályzat automatikus elforgatással, gyors szintváltással, gpt-5.4 modellel és elemzési címke javítással.### ✨ New Features (PRs #366, #367, #368)

-**Kódex kvótaszabályzat (PR #366)**: Fiókonkénti 5 óra/heti kvótaablak átkapcsol a szolgáltató irányítópultján. A fiókokat a rendszer automatikusan kihagyja, amikor az engedélyezett ablakok elérik a 90%-os küszöböt, és a "resetAt" után újra engedélyezik. Tartalmazza a `quotaCache.ts' fájlt, mellékhatások nélküli állapotlekérővel.
-**Codex Fast Tier Toggle (PR #367)**: Irányítópult → Beállítások → Codex szolgáltatási szint. Az alapértelmezett kikapcsolt kapcsoló csak a Codex kérésekhez írja be a `service_tier: "flex" értéket, ami ~80%-kal csökkenti a költségeket. Teljes stack: UI lap + API végpont + végrehajtó + fordító + indítási visszaállítás. -**gpt-5.4 modell (PR #368)**: Hozzáadja a "cx/gpt-5.4" és a "codex/gpt-5.4" kódot a Codex-modell-nyilvántartáshoz. Regressziós teszt tartalmazza.### 🐛 Bug Fixes

-**356. számú javítás**: Az Analytics diagramok (Legnépszerűbb szolgáltató, Számla szerint, Szolgáltató Lebontás) mostantól az OpenAI-kompatibilis szolgáltatók nyers belső azonosítói helyett ember által olvasható szolgáltatóneveket/címkéket jelenítenek meg.

> Jelentős kiadás: szigorú véletlenszerű útválasztási stratégia, API-kulcs-hozzáférési vezérlők, kapcsolatcsoportok, külső árszinkronizálás és kritikus hibajavítások a gondolkodási modellekhez, kombinált tesztelés és az eszköznév érvényesítése.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle deck ismétlés elleni garanciával és mutex szerializációval az egyidejű kérésekhez. Független paklik kombinációnként és szolgáltatónként. -**API Key Access Controls**: `allowedConnections` (korlátozza, hogy egy kulcs mely kapcsolatokat használhatja), `is_active` (engedélyező/letiltó kulcs 403-as értékkel), `accessSchedule` (idő alapú hozzáférés-vezérlés), `autoResolve` kapcsoló, kulcsok átnevezése PATCH segítségével. -**Kapcsolatcsoportok**: A szolgáltatói kapcsolatok csoportosítása környezet szerint. Harmonika nézet a Limits oldalon, helyi tárolási képességgel és intelligens automatikus kapcsolóval. -**Külső árszinkronizálás (LiteLLM)**: 3-szintű árképzési felbontás (felhasználói felülbírálások → szinkronizált → alapértelmezések). Iratkozzon fel a `PRICING_SYNC_ENABLED=true' paraméterrel. MCP-eszköz `omniroute_sync_pricing`. 23 új teszt. -**i18n**: 30 nyelv frissítve szigorúan véletlenszerű stratégiával, API kulcskezelési karakterláncokkal. pt-BR teljesen lefordítva.### 🐛 Bug Fixes

-**fix #355**: Az adatfolyam üresjárati időtúllépése 60 másodpercről 300 másodpercre nőtt – megakadályozza a kiterjesztett gondolkodású modellek (claude-opus-4-6, o3 stb.) megszakítását a hosszú gondolkodási fázisok során. A `STREAM_IDLE_TIMEOUT_MS' segítségével konfigurálható.
-**350-es javítás**: A kombinált teszt most megkerüli a `REQUIRE_API_KEY=true`-t a belső fejléc használatával, és univerzálisan OpenAI-kompatibilis formátumot használ. Az időtúllépés 15 másodpercről 20 másodpercre nőtt.
-**fix #346**: Az üres `function.name`-vel rendelkező eszközöket (amelyet a Claude Code továbbít) a rendszer most kiszűr, mielőtt az upstream szolgáltatók megkapnák őket, megelőzve az "Érvénytelen bemenet[N].név: üres karakterlánc" hibákat.### 🗑️ Closed Issues

-**#341**: Hibakeresési szakasz eltávolítva – a '/dashboard/logs' és a '/dashboard/health' helyett.

> API Key Round-Robin támogatás a többkulcsos szolgáltatók beállításához, valamint a helyettesítő karakteres útválasztás és a kvótaablak már érvényben lévő görgetésének megerősítése.### ✨ New Features

-**API Key Round-Robin (T07)**: A szolgáltatói kapcsolatok mostantól több API-kulcsot is tartalmazhatnak (Kapcsolat szerkesztése → Extra API-kulcsok). A kérések körbeforgatják az elsődleges + extra kulcsokat a `providerSpecificData.extraApiKeys[]` segítségével. A kulcsok kapcsolatonként indexelve vannak a memóriában – nincs szükség DB séma módosítására.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: A "wildcardRouter.ts" glob-stílusú helyettesítő karakterillesztéssel ("gpt\*", "claude-?-sonnet" stb.) már be van építve a "model.ts"-be konkrét rangsorolással. -**Kvótaablak görgetése (T08)**: `accountFallback.ts:isModelLocked()` már automatikusan előrelép az ablakban – ha a `Date.now() > entry.until`, a zár azonnal törlődik (nincs elévült blokkolás).

> UI finomítás, útválasztási stratégia kiegészítések és kecses hibakezelés a használati korlátokhoz.### ✨ New Features

-**Fill-First és P2C útválasztási stratégiák**: Hozzáadott "fill-first" (leürítési kvóta a továbblépés előtt) és "p2c" (Power-of-Two-Choices alacsony késleltetésű választás) a kombinált stratégiaválasztóhoz, teljes útmutató panelekkel és színkódolt jelvényekkel. -**Free Stack Preset Models**: A Free Stack sablonnal kombinált kombó létrehozása automatikusan kitölti a kategóriájában 7 legjobb ingyenes szolgáltatói modellt (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). A felhasználók csak aktiválják a szolgáltatókat, és 0 USD/hó kombót kapnak a dobozból. -**Wider Combo Modal**: A Combo modal létrehozása/szerkesztése mostantól a "max-w-4xl" értéket használja a nagy kombók kényelmes szerkesztéséhez.### 🐛 Bug Fixes

-**A HTTP 500-as korlátozások oldala Codex és GitHub esetén**: a „getCodexUsage()” és a „getGitHubUsage()” mostantól felhasználóbarát üzenetet ad vissza, amikor a szolgáltató a 401/403-as (lejárt token) értéket adja vissza, ahelyett, hogy dobna és 500-as hibát okozna a Limits oldalon. -**MaintenanceBanner téves pozitív**: A szalaghirdetés többé nem mutatja hamisan az oldalbetöltéskor a „Szerver nem érhető el” üzenetet. Javítva a "checkHealth()" azonnali meghívásával a csatlakoztatáskor, és eltávolítva az elavult "show" állapot lezárását. -**Szolgáltatóikonok eszköztippjei**: A szolgáltatói csatlakozási sorban található Szerkesztés (ceruza) és Törlés ikon gombjai mostantól natív HTML-elemleírásokkal rendelkeznek – mind a 6 műveleti ikon önállóan dokumentált.

> Több fejlesztés a közösségi problémák elemzéséből, új szolgáltatói támogatás, hibajavítások a token követéshez, a modell útválasztásához és a streamelés megbízhatóságához.### ✨ New Features

-**Task-Aware intelligens útválasztás (T05)**: Automatikus modellválasztás a kérés tartalom típusa alapján — kódolás → deepseek-chat, elemzés → gemini-2.5-pro, vision → gpt-4o, összefoglaló → gemini-2.5-flash. A beállításokon keresztül konfigurálható. Új „GET/PUT/POST /api/settings/task-routing” API. -**HuggingFace Provider**: A HuggingFace Router hozzáadva OpenAI-kompatibilis szolgáltatóként a Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini eszközökkel. -**Vertex AI Provider**: Vertex AI (Google Cloud) szolgáltató hozzáadva Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude a Vertexen keresztül. -**Játszótéri fájlfeltöltés**: Hangfeltöltés az átíráshoz, képfeltöltés látásmodellekhez (automatikus felismerés a modellnév alapján), soron belüli képmegjelenítés a képgenerálási eredményekhez. -**Modellválasztó vizuális visszajelzés**: A kombinált választóban már felvett modellek mostantól ✓ zöld jelvényt mutatnak – megakadályozza az ismétlődő összetévesztést. -**Qwen-kompatibilitás (PR #352)**: Frissített felhasználói ügynök- és CLI-ujjlenyomat-beállítások a Qwen-szolgáltató kompatibilitásához. -**Round-Robin állapotkezelés (PR #349)**: Továbbfejlesztett kör-ellenőrzési logika a kizárt fiókok kezeléséhez és a rotációs állapot megfelelő fenntartásához. -**Vágólap UX (PR #360)**: Megerősített vágólap-műveletek tartalékkal a nem biztonságos környezetekhez; Claude-eszköz normalizálási fejlesztések.### 🐛 Bug Fixes

-**302. számú javítás — OpenAI SDK stream=False drops tool_calls**: T01 A fejlécegyeztetés elfogadása már nem kényszeríti a streamelést, ha a `body.stream` kifejezetten `false'. Az OpenAI Python SDK nem streamelési módban történő használatakor a tool_calls csendben el lett dobva.
-**73. javítás – Claude Haiku átirányítva az OpenAI-ba szolgáltatói előtag nélkül**: A szolgáltatói előtag nélkül küldött „claude-*” modellek most megfelelően az „antigravitációs” (antropikus) szolgáltatóhoz irányítanak. Hozzáadott `gemini-_`/`gemma-_`→`gemini`heurisztika is.
-**74. javítás – A tokenszám mindig 0 az Antigravity/Claude streaming esetén**: Az „input_tokens”-t hordozó „message_start” SSE-eseményt az „extractUsage()” nem elemezte, ezért az összes bemeneti token-szám csökkent. A bemeneti/kimeneti jogkivonat követése most megfelelően működik a streamelési válaszoknál.
-**180. számú javítás – Modell-importálás visszajelzés nélkül**: A „ModelSelectModal” most ✓ zöld kiemelést mutat a már kombinált modelleknél, ami nyilvánvalóvá teszi, hogy már hozzáadták őket.
-**Médiaoldal-generálási hibák**: A képeredmények mostantól`<img>` címkeként jelennek meg nyers JSON helyett. Az átírási eredmények olvasható szövegként jelennek meg. A hitelesítési adatokkal kapcsolatos hibák néma hiba helyett borostyánsárga szalagot jelenítenek meg. -**Tokenfrissítés gomb a szolgáltatói oldalon**: Az OAuth-szolgáltatók számára hozzáadott kézi tokenfrissítési felület.### 🔧 Improvements

-**Provider Registry**: HuggingFace és Vertex AI hozzáadva a "providerRegistry.ts" és a "providers.ts" (frontend) fájlokhoz. -**Olvasási gyorsítótár**: Új `src/lib/db/readCache.ts` a hatékony DB olvasási gyorsítótárhoz. -**Kvótagyorsítótár**: Továbbfejlesztett kvótagyorsítótár TTL-alapú kilakoltatással.### 📦 Dependencies

- "Dompurify" → 3.3.3 (PR #347)
- "udici" → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fájl                                          | Cél                                                  |
| --------------------------------------------- | ---------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Feladat-tudatos útválasztási logika (7 feladattípus) |
| "src/app/api/settings/task-routing/route.ts"  | Feladat-útválasztási konfigurációs API               |
| "src/app/api/providers/[id]/refresh/route.ts" | Manuális OAuth-token frissítés                       |
| `src/lib/db/readCache.ts`                     | Hatékony DB olvasási gyorsítótár                     |
| `src/shared/utils/clipboard.ts`               | Edzett vágólap tartalék                              | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combos modal: Free Stack látható és szembetűnő**— Free Stack sablon elrejtve (4. a 3 oszlopos rácsban). Javítva: 1-es pozícióba került, 2x2-es rácsra váltott, így mind a 4 sablon látható, zöld szegély + INGYENES jelvénykiemelés.## [2.4.0] - 2026-03-13

> **Jelentős kiadás**– Ingyenes Stack ökoszisztéma, transzkripciós játszóterek felújítása, 44+ szolgáltató, átfogó ingyenes szintű dokumentáció és UI fejlesztések a teljes felületen.### Funkciók

-**Kombók: Ingyenes verem sablon**— Új, 4. sablon "Free Stack ($0)" a Kiro + Qoder + Qwen + Gemini CLI-n keresztül körbefutó módszerrel. Az előre beépített nulla költségű kombinációt javasolja az első használatkor. -**Média/átírás: Deepgram alapértelmezettként**— A Deepgram (Nova 3, 200 USD ingyenes) mostantól az alapértelmezett átírási szolgáltató. Az AssemblyAI (50 dollár ingyenes) és a Groq Whisper (örökké ingyenes) ingyenes hiteljelvényekkel látható. -**README: "Ingyen indítás" szakasz**— Új korai README 5 lépéses táblázat, amely bemutatja, hogyan állíthat be nulla költségű AI-t percek alatt. -**OLVASD EL: Ingyenes átírási kombináció**— Új rész Deepgram/AssemblyAI/Groq kombinációjavaslattal és szolgáltatónkénti ingyenes hiteladatokkal. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras és Groq hasFree jelvénnyel és ingyenes megjegyzéssel a szolgáltatói felhasználói felülethez. -**i18n: templateFreeStack kulcsok**— Ingyenes Stack kombinált sablon mind a 30 nyelvre lefordítva és szinkronizálva.## [2.3.16] - 2026-03-13

### Dokumentáció

-**README: 44+ szolgáltató**— A „36+ szolgáltatók” mind a 3 előfordulása frissítve „44+”-ra, ami a tényleges kódbázisszámot tükrözi (44 szolgáltató a szolgáltatók.ts-ben) -**OLVASD EL: Új szakasz "🆓 Ingyenes modellek – Amit valójában kapsz"**- 7 szolgáltatós táblázat hozzáadva modellenkénti sebességkorlátozással a következőkhöz: Kiro (korlátlan Claude az AWS Builder ID-n keresztül), Qoder (korlátlan 5 modell), Qwen (4 modell korlátlan), Gemini CLI (4-0 for NVIDIAK/devmo) Cerebrák (1M tok/nap / 60K TPM), Groq (30 RPM / 14,4K RPD). Tartalmazza a \/usr/bin/bash Ultimate Free Stack kombinációs ajánlást. -**README: ártáblázat frissítve**— Cerebrák hozzáadva az API KEY szinthez, az NVIDIA javítása "1000 kreditről" "dev-forever free"-re, frissített Qoder/Qwen modellszámok és -nevek -**README: Qoder 8→5 modell**(név: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 modell**(név: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funkciók

-**Automatikus kombinált irányítópult (Tier Priority)**: A "🏷️ Tier" hozzáadva a 7. pontozási tényező címkéjéhez a "/dashboard/auto-combo" tényezők lebontási képernyőjén – most már mind a 7 automatikus kombinált pontozási tényező látható. -**i18n — autoCombo szakasz**: 20 új fordítókulcs hozzáadva az Auto-Combo irányítópulthoz ("title", "status", "modePack", "providerScores", "factorTierPriority" stb.) mind a 30 nyelvi fájlhoz.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Visszaállította az érvényes alapértelmezett "clientSecret" értéket – korábban üres karakterlánc volt, ami "Rossz ügyfél hitelesítő adatokat" okozott minden csatlakozási kísérletnél. A nyilvános hitelesítési adat mostantól az alapértelmezett tartalék (felülírható a `QODER_OAUTH_CLIENT_SECRET` env var segítségével). -**MITM-kiszolgáló nem található (#335)**: A `prepublish.mjs` most lefordítja az `src/mitm/*.ts`-t JavaScript-be a `tsc` használatával, mielőtt az npm-csomagba másolná. Korábban csak a nyers ".ts" fájlokat másolták – ami azt jelenti, hogy a "server.js" soha nem létezett az npm/Volta globális telepítésekben. -**GeminiCLI hiányzik a projectId (#338)**: Ahelyett, hogy kemény 500-as hibát dobna ki, amikor a "projectId" hiányzik a tárolt hitelesítő adatokból (például a Docker újraindítása után), az OmniRoute most figyelmeztetést naplóz, és megkísérli a kérést – az OmniRoute összeomlása helyett jelentős szolgáltatóoldali hibát ad vissza. -**Electron version Mismatch (#323)**: Az "electron/package.json" verzió szinkronizálása a "2.3.13"-mal ("2.0.13" volt), így az asztali bináris verzió megegyezik az npm csomaggal.### ✨ New Models (#334)

-**Kiro**: "claude-sonnet-4", "claude-opus-4.6", "deepseek-v3.2", "minimax-m2.1", "qwen3-coder-next", "auto" -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + érvényesítés)**: "tierPriority" (súly: 0,05) hozzáadva a "ScoringWeights" Zod-sémához és a "combos/auto" API-útvonalhoz – a 7. pontozási tényezőt a REST API most már teljesen elfogadja, és a bemeneten érvényesíti. a „stabilitás” súlya „0,10”-ről „0,05”-re módosítva, hogy a teljes összeg 1,0 legyen.### ✨ New Features

-**Tiered kvótapontozás (automatikus kombinált)**: A "tierPriority" hozzáadva 7. pontozási tényezőként – az Ultra/Pro szintekkel rendelkező fiókokat mostantól előnyben részesítik az ingyenes szintekkel szemben, ha más tényezők azonosak. Új opcionális "accountTier" és "quotaResetIntervalSecs" mezők a "ProviderCandidate" oldalon. Mind a 4 módcsomag frissítve ("gyors szállítás", "költségkímélő", "első minőség", "offline-barát"). -**Családon belüli modell visszaállítása (T5)**: Ha egy modell nem elérhető (404/400/403), az OmniRoute mostantól automatikusan visszatér az azonos családhoz tartozó testvérmodellekhez, mielőtt hibát ad vissza ("modelFamilyFallback.ts"). -**Konfigurálható API Bridge időtúllépés**: Az `API_BRIDGE_PROXY_TIMEOUT_MS` env var segítségével az operátorok hangolják a proxy időtúllépését (alapértelmezett 30 mp). Javítja az 504-es hibákat a lassú felfelé irányuló válaszoknál. (#332) -**Star History**: A star-history.com widgetet a starchart.cc-re (`?variant=adaptive`) cserélték le mind a 30 README-ben – igazodik a világos/sötét témához, valós idejű frissítésekhez.### 🐛 Bug Fixes

-**Auth – Első jelszó**: Az `INITIAL_PASSWORD` env var mostantól elfogadott az első irányítópult-jelszó beállításakor. A "timingSafeEqual"-t használja az állandó idejű összehasonlításhoz, megelőzve az időzítési támadásokat. (#333) -**README csonkítás**: Javítottunk egy hiányzó `</details>` záró címkét a Hibaelhárítás részben, ami miatt a GitHub leállította az alatta lévő összes (Tech Stack, Docs, Roadmap, Contributors) megjelenítését. -**pnpm install**: A redundáns "@swc/helpers" felülírás eltávolítása a "package.json" fájlból, amely ütközött a közvetlen függőséggel, és "EOVERRIDE" hibákat okoz a pnpm-en. Hozzáadva a `pnpm.onlyBuiltDependencies` konfigurációt. -**CLI Path Injection (T12)**: `isSafePath()-ellenőrző hozzáadva a `cliRuntime.ts-hez, hogy blokkolja az útvonal bejárását és a shell metakaraktereket a `CLI_*_BIN` env vars-ban. -**CI**: A felülírás eltávolítása után újragenerált "package-lock.json" az "npm ci" hibák kijavítása érdekében a GitHub-műveleteken.### 🔧 Improvements

-**Response Format (T1)**: `response_format` (json_schema/json_object) immár rendszerkérdésként beadva Claude számára, lehetővé téve a strukturált kimenetek kompatibilitását. -**429-es újrapróbálkozás (T2)**: URL-en belüli újrapróbálkozás 429 válaszig (2-szeres próbálkozás 2 másodperces késleltetéssel), mielőtt visszatérne a következő URL-re. -**Gemini CLI fejlécek (T3)**: „User-Agent” és „X-Goog-Api-Client” ujjlenyomat-fejlécek hozzáadva a Gemini CLI-kompatibilitás érdekében. -**Árképzési katalógus (T9)**: "deepseek-3.1", "deepseek-3.2" és "qwen3-coder-next" árbejegyzések hozzáadva.### 📁 New Files

| Fájl                                       | Cél                                                       |
| ------------------------------------------ | --------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Modellcsaláddefiníciók és családon belüli tartalék logika | ### Fixed |

-**KiloCode**: A kilokód állapotellenőrzési időtúllépése már javítva a 2.3.11-es verzióban -**OpenCode**: Nyílt kód hozzáadása a cliRuntime rendszerleíró adatbázishoz 15 másodperces állapotellenőrzési időtúllépéssel -**OpenClaw / Cursor**: Növelje az állapotellenőrzési időt 15 másodpercre a lassú indítású változatoknál -**VPS**: droid és openclaw npm csomagok telepítése; aktiválja a CLI_EXTRA_PATHS-t a kiro-cli számára -**cliRuntime**: Add hozzá a nyílt kódú eszköz regisztrációját, és növeld az időtúllépést a folytatáshoz## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode állapotellenőrzés**: Növelje a "healthcheckTimeoutMs" értéket 4000 ms-ról 15 000 ms-ra – a kilokód ASCII logót jelenít meg indításkor, ami hamis "healthcheck_failed" értéket okoz lassú/hidegindításos környezetekben## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Javítsa ki a "check:any-budget:t11" hibát – cserélje ki az "as any" kifejezést az "as Record<karakterlánc, ismeretlen>" kifejezésre az OAuthModal.tsx fájlban (3 előfordulás)### Docs

-**CLI-TOOLS.md**: Teljes útmutató mind a 11 CLI eszközhöz (claude, codex, gemini, nyílt kód, cline, kilocode, folytatás, kiro-cli, kurzor, droid, openclaw) -**i18n**: A CLI-TOOLS.md 30 nyelvre szinkronizálva lefordított címmel + bevezetővel## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Új, régi OpenAI befejezési végpont – elfogadja a "prompt" karakterláncot és az "üzenetek" tömböt is, automatikusan normalizálódik csevegési formátumra -**EndpointPage**: most mind a 3 OpenAI-kompatibilis végponttípust mutatja: Chat Completions, Responses API és Legacy Completions -**i18n**: "CompletionsLegacy/completionsLegacyDesc" hozzáadva 30 nyelvi fájlhoz### Fixed

-**OAuthModal**: Javítsa ki az összes OAuth-kapcsolati hibánál megjelenő `[objektumobjektum]` hibát – megfelelően vonja ki a `.message`-t a hibareakció objektumokból mind a 3 `új Error(data.error)-hívásban (csere, eszközkód, engedélyezés)

- A Cline, Codex, GitHub, Qwen, Kiro és az összes többi OAuth-szolgáltatót érinti## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Adja hozzá a "decodeURIComponent" elemet a base64 dekódolás előtt, így a visszahívási URL-ből származó URL-kódolású hitelesítési kódok megfelelően kerülnek elemzésre, javítva az "érvénytelen vagy lejárt engedélyezési kód" hibákat a távoli (LAN IP) beállításoknál. -**Cline OAuth**: a `mapTokens` most feltölti a `name = keresztnév + vezetéknév || e-mailt, így a Cline-fiókok valódi felhasználói neveket jelenítenek meg az "Account #ID" helyett
-**OAuth-fiókok neve**: Az összes OAuth-cserefolyamat (csere, lekérdezés, visszahívás) mostantól normalizálja a "név = e-mail" értéket, ha a név hiányzik, így minden OAuth-fiók megjeleníti az e-mail címét a szolgáltatók irányítópultján.
-**OAuth-fióknevek**: A szekvenciális „N fiók” tartalék eltávolítva a `db/providers.ts-ből – az e-mail-cím/név nélküli fiókok mostantól stabil azonosító alapú címkét használnak a `getAccountDisplayName()` segítségével a fiókok törlésekor megváltozó sorszám helyett.## [2.3.6] - 2026-03-12

### Fixed

-**Provider teszt köteg**: Javítva a Zod-séma a `providerId: null` elfogadásához (a frontend nullát küld a nem szolgáltatói módokhoz); hibásan adta vissza az "Érvénytelen kérést" az összes kötegelt teszthez -**Provider test modal**: Javítva az "[object Object]" megjelenítése az API hibaobjektumok karakterláncokra történő normalizálásával, mielőtt a "setTestResults" és a "ProviderTestResultsView" paraméterekben megjelennének. -**i18n**: A hiányzó kulcsok `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` hozzáadva az `en.json`-hoz -**i18n**: szinkronizált 1111 hiányzó kulcs mind a 29 nem angol nyelvű fájlban, angol értékeket használva tartalékként## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: állandó "postinstall" javítás hozzáadva a "@swc/helpers" másoláshoz az önálló alkalmazás "node_modules" részébe – megakadályozza a MODULE_NOT_FOUND összeomlását globális npm-telepítéseknél## [2.3.4] - 2026-03-10

### Added

- Több szolgáltató integrációja és az irányítópult fejlesztése
