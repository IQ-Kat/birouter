# Changelog (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Bucla de redirecționare infinită rezolvată pe tabloul de bord pentru cazuri noi când requireLogin este dezactivat.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Integrare nativă API Qoder:**Refactorizarea completă a Qoder Executor pentru a ocoli algoritmul de criptare COSY AES/RSA, rutare direct în adresa URL nativă compatibilă cu DashScope OpenAi. Elimină dependențele complexe de modulele `crypto` Node, îmbunătățind în același timp fidelitatea fluxului. -**Reziliența motorului de reziliență:**Depășirea contextului integrată, depășirea grațioasă, detectarea proactivă a simbolurilor OAuth și prevenirea emisiilor de conținut gol (#990). -**Strategie de rutare optimizată în funcție de context:**A fost adăugată o nouă capacitate de rutare inteligentă pentru a maximiza în mod nativ ferestrele de context în implementările combo automate (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**S-a remediat corupția de clonare profundă în cazul în care limitele de traducere Anthropic/OpenAI eliminau prefixele SSE specifice „răspuns.” din limitele de streaming (#992). -**Claude Cache Passthrough Alignment:**Marcatori de cache compatibile CC aliniați în concordanță cu modul Client Pass-Through din amonte, păstrând memorarea promptă în cache. -**Turbopack Memory Leak:**Fixat Next.js la strict `16.0.10`, prevenind scurgerile de memorie și construind oboseala din regresiile recente ale modulelor Turbopack din amonte (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integrare Models.dev:**Models.dev integrat ca sursă de execuție autorizată pentru prețurile modelelor, capabilități și specificații, suprascriind prețurile hardcoded. Include o interfață de utilizare pentru setări pentru a gestiona intervalele de sincronizare, șiruri de traducere pentru toate cele 30 de limbi și acoperire robustă a testelor. -**Capacitățile native ale furnizorului:**S-a adăugat suport pentru declararea și verificarea caracteristicilor API native (de exemplu, `systemInstructions_supported`) prevenind eșecurile prin dezinfectarea rolurilor nevalide. Configurat în prezent pentru furnizorii Gemini Base și Antigravity OAuth. -**Setări avansate ale furnizorului API:**Au fost adăugate suprascrieri personalizate „User-Agent” pentru fiecare conexiune pentru conexiunile furnizorului de cheie API. Suprascrierea este stocată în `providerSpecificData.customUserAgent` și acum se aplică probelor de validare și solicitărilor de execuție din amonte.### 🐛 Bug Fixes

-**Qwen OAuth Reliability:**Rezolvate o serie de probleme de integrare OAuth, inclusiv un blocator de 400 de solicitări incorecte pe token-urile expirate, generarea alternativă pentru analizarea proprietăților OIDC `access_token` atunci când `id_token` este omis, erori de descoperire a catalogului de modele și filtrarea strictă a `X-Dash-com pentru a evita respingerea `X-Dash-com-patible-\*400 puncte finale.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Integrarea ciclului de viață CRUD nativ finalizată pentru motorul avansat Auto-Combo (#955). -**Operațiuni de bază:**S-au remediat traducerile lipsă pentru noile opțiuni native Auto-Combos (#955). -**Validare de securitate:**Sarcinile de backup automat SQLite au fost dezactivate nativ în timpul execuției CI testului unitar pentru a rezolva în mod explicit pierderile de memorie suspendate din bucla de evenimente Nod 22 (#956). -**Proxy-uri pentru ecosistem:**Programele de sincronizare a modelului de cartografiere de integrare explicită finalizate, ciclurile OAuth și Token Check se reîmprospătează în siguranță prin proxy-urile din amonte ale sistemului nativ OmniRoute (#953). -**Extensibilitate MCP:**A fost adăugat și înregistrat cu succes noul instrument de cadru MCP `omniroute_web_search` din beta în schemele de producție (#951). -**Tokens Buffer Logic:**S-au adăugat limite de configurare a timpului de execuție care extind tampoanele configurabile de token de intrare/ieșire pentru valori precise de urmărire a utilizării (#959).### 🐛 Bug Fixes

-**Remediere CodeQL:**Operațiuni critice de indexare a șirurilor complet rezolvate și securizate care împiedică matricele SSRF (Server-Side Request Forgery) să indexeze euristicile împreună cu backtracking algoritmic polinomial (ReDoS) în interiorul modulelor de dispecer proxy profund. -**Crypto Hashes:**S-au înlocuit hashe-urile vechi neverificate OAuth 1.0 cu primitive robuste de validare standard HMAC-SHA-256, asigurând controale stricte ale accesului. -**Protecția limitelor API:**Protecții structurale ale rutelor verificate și mapate corect care impun o logică middleware strictă `isAuthenticated()` care acoperă puncte finale dinamice mai noi care vizează manipularea setărilor și încărcarea competențelor native. -**CLI Ecosystem Compat:**S-au rezolvat legăturile parserului nativ de execuție care se blocau detectorii de mediu `where` strict peste `.cmd/.exe` cu grație pentru plugin-uri externe (#969). -**Arhitectura cache:**Refactorizare exactă a parametrilor de analiză și setări de sistem din tabloul de bord pentru a menține ciclurile stabile de persistență a rehidratării, rezolvând clipurile vizuale nealiniate (#952). -**Standarde de memorare în cache Claude:**Marcatori de blocuri efemere critici, normalizați și păstrați cu exactitate, comenzile TTL de memorare în cache `efemere` pentru nodurile din aval care impun maparea corectă a cererilor CC compatibile standard, fără metrici eliminate (#948). -**Internal Aliases Auth:**Mapări interne simplificate ale timpului de execuție, care normalizează căutările de date utile a acreditărilor Codex în parametrii globali de traducere, rezolvând 401 de pierderi neautentificate (#958).### 🛠️ Maintenance

-**Descoperirea UI:**Categorizări de aspect ajustate corect, care separă în mod explicit logica furnizorilor de nivel gratuit, îmbunătățind fluxurile de sortare UX în paginile generale de registru API (#950). -**Topologie de implementare:**Artefacte de implementare Unified Docker care asigură că rădăcina `fly.toml` se potrivește cu parametrii așteptați ai instanței de cloud din momentul în care se gestionează în mod nativ implementările automate, scalarea corectă. -**Unelte de dezvoltare:**Parametrii de execuție `LKGP` decuplați în utilitare explicite de stocare în cache a abstracției stratului DB, asigurând o acoperire strictă de izolare a testelor pentru straturile de cache de bază în siguranță.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panoul de combină automată a tabloului de bord:**s-a refactorizat complet interfața de utilizare `/dashboard/auto-combo` pentru a se integra perfect cu cardurile native de tablou de bord și padding/anteturi vizuale standardizate. S-au adăugat bare de progres vizuale dinamice care mapează mecanismele de greutate de selecție a modelului. -**Setări Sincronizare rutare:**Țintele de schemă „prioritate” și „ponderată” de rutare avansată complet expuse în interiorul listelor de rezervă ale setărilor globale.### Bug Fixes

-**Memory & Skills Locale Nodes:**S-au rezolvat etichetele de randare goale pentru opțiunile de Memorie și Skills direct în vizualizările setărilor globale prin conectarea tuturor valorilor de mapare „settings.\*” intern în „en.json” (de asemenea mapate implicit pentru instrumentele de traducere încrucișată).### Internal Integrations

- PR integrat #946 — remediere: păstrați compatibilitatea codului Claude în conversia răspunsurilor
- PR integrat #944 — fix(gemini): păstrează semnăturile gândurilor în apelurile instrumentelor antigravitaționale
- PR integrat #943 — remediere: restaurați corpul GitHub Copilot
- PR integrat #942 — Remediați marcatorii cache compatibili cu cc
- PR integrat #941 — refactor (auth): îmbunătățiți căutarea aliasului NVIDIA + adăugați înregistrarea erorilor LKGP
- PR integrat #939 — Restabiliți gestionarea apelului localhost Claude OAuth
- _(Notă: PR #934 a fost omis din ciclul 3.4.9 pentru a preveni regresiile conflictului de bază)_---

## [3.4.8] — 2026-04-03

### Securitate

- S-au remediat complet toate constatările restante Github Advanced Security (CodeQL) și alertele Dependabot.
- S-au remediat vulnerabilitățile nesigure ale aleatoriei prin migrarea de la `Math.random` la `crypto.randomUUID()`.
- Comenzi shell securizate în scripturi automate de la injectarea șirurilor.
- S-au migrat modele de analizare RegEx vulnerabile catastrofale în conductele de chat/traducere.
- Controale îmbunătățite de igienizare a ieșirii în interiorul componentelor React UI și injecția de etichete Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Funcționalități

- S-a adăugat nodul „Criptografie” la monitorizarea și verificările de sănătate MCP (#798)
- Hartizarea permisiunilor de traseu din catalog model-catalog (`/models`) (#781)### Bug Fixes

- S-a remediat reîmprospătarea jetonului Claude OAuth care nu reușește să păstreze contextele cache (#937)
- S-au remediat erorile furnizorului compatibil CC care făceau ca modelele stocate în cache să nu fie accesibile (#937)
- S-au remediat erorile GitHub Executor legate de matrice de context nevalide (#937)
- S-au remediat erorile de verificare a stării de sănătate a instrumentelor CLI instalate de NPM pe Windows (#935)
- S-a remediat traducerea încărcăturii utile care a renunțat la conținut valid din cauza câmpurilor API nevalide (#927)
- S-a remediat blocarea timpului de rulare în Nodul 25 în ceea ce privește execuția cheii API (#867)
- S-a remediat rezoluția modulului autonom MCP (`ERR_MODULE_NOT_FOUND`) prin `esbuild` (#936)
- S-a rezolvat nepotrivirea alias-ului de rezoluție a acreditărilor de rutare NVIDIA NIM (#931)### Securitate

- S-a adăugat protecție strictă a limitelor de intrare împotriva injecțiilor de execuție de cod de la distanță „shell: true” brut.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Furnizori:**Furnizori noi de generare de imagini, video și audio înregistrați din lista solicitată de comunitate (#926). -**Interfața de utilizare a tabloului de bord:**S-a adăugat navigare autonomă în bara laterală pentru noile module de memorie și abilități (#926). -**i18n:**S-au adăugat șiruri de traducere și mapări de aspect în 30 de limbi pentru spațiile de nume Memory și Skills.### 🐛 Bug Fixes

-**Reziliență:**a prevenit ca întrerupătorul de circuit proxy să rămână blocat într-o stare DESCHIS pentru o perioadă nedeterminată prin gestionarea tranzițiilor directe la starea ÎNCHIS în căile combinate de rezervă (#930). -**Traducerea protocolului:**Am corelat transformatorul de streaming pentru a dezinfecta blocurile de răspuns pe baza protocolului _sursă_ așteptat, mai degrabă decât a protocolului _țintă_ al furnizorului, reparând modelele Anthropics împachetate în încărcături utile OpenAI care blocau codul Claude (#929). -**Specificații API și Gemini:**S-a remediat analiza `thought_signature` în traducătorii `openai-to-gemini` și `claude-to-gemini`, prevenind erorile HTTP 400 la toate apelurile de instrumente API Gemini 3. -**Furnizori:**S-au curățat punctele finale necompatibile cu OpenAI, împiedicând conexiunile în amonte valide (#926). -**Tendințe cache:**S-a remediat o nepotrivire nevalidă a datelor de mapare a proprietăților care provoacă blocarea graficelor UI Cache Trends și au extras widget-uri redundante pentru valorile cache (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integrarea ecosistemului CLIProxyAPI:**S-a adăugat executorul `cliproxyapi` cu caching încorporat la nivel de modul și rutare proxy. Am introdus un serviciu cuprinzător de Manager de versiuni pentru a testa automat starea de sănătate, a descărca fișiere binare din GitHub, a genera procese izolate în fundal și pentru a gestiona în mod curat ciclul de viață al instrumentelor CLI externe direct prin interfața de utilizare. Include tabele DB pentru configurarea proxy pentru a permite rutarea automată încrucișată SSRF a cererilor externe OpenAI prin stratul de instrumente CLI local (#914, #915, #916). -**Suport Qoder PAT:**Suport pentru jetoane de acces personal integrate (PAT) direct prin transportul local `qodercli` în loc de configurațiile vechi ale browserului `.cn` (#913). -**Gemini 3.1 Pro Preview (GitHub):**Adăugat suport pentru modelul explicit canonic `gemini-3.1-pro-preview` în mod nativ în furnizorul GitHub Copilot, păstrând în același timp aliasurile de rutare mai vechi (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stability:**S-a reparat bucla de reîmprospătare a token-ului Copilot în care tokenurile învechite nu erau îmbinate în profunzime în DB și s-au eliminat câmpurile `resoning_text` care distrugeau fatal conversiile blocului antropic în aval pentru chat-urile cu mai multe rânduri (#923). -**Global Timeout Matrix:**Timeout-uri centralizate și parametrizate ale solicitărilor în mod explicit de la `REQUEST_TIMEOUT_MS` pentru a preveni tampoanele implicite de preluare ascunse (~300 de secunde) care să întrerupă prematur răspunsurile de streaming SSE de lungă durată de la modelele de raționament greu (#918). -**Cloudflare Quick Tunnels State:**S-a remediat o inconsecvență severă a stării în care instanțe OmniRoute repornite în mod eronat arătau tunelurile distruse ca active și tunelurile cloudflare implicite la `HTTP/2` pentru a elimina spam-ul de jurnal de primire buffer UDP (#925). -**i18n Translation Overhaul (cehă și hindi):**S-a remediat codul hindi de la DEPRECATED `in.json` la canonic `hi.json`, mapări de text cehe revizuite, extras `untranslatable-keys.json` pentru a remedia validările fals pozitive CI/CD și generat `I18N. -**Recuperare furnizor de jetoane:**S-a remediat Qwen pierderea punctelor finale specifice „resourceUrl” după reîmprospătările automate ale jetonului de verificare a stării de sănătate din cauza lipsei îmbinărilor profunde DB (#917). -**CC compatibil UX și Streaming:**Unificarea acțiunilor compatibile Add CC/OpenAI/Anthropic în jurul tratamentului UI Anthropic, solicitările upstream compatibile CC forțate să folosească SSE în timp ce returnau răspunsuri în flux sau non-streaming pe baza cererii clientului, s-a eliminat suportul pentru configurarea/importul listei de modele CC în favoarea unei erori explicite de listare a modelelor neacceptate și a codului de înregistrare CC compatibil Claude OAuth. lista (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Emiteți `response.completed` cu câmpurile corecte `input_tokens`/`output_tokens` pentru clienții Codex CLI, reparând afișarea utilizării token-ului (#909 — mulțumesc @christopher-s). -**SQLite WAL Checkpoint on Shutdown:**Flush WAL se modifică în fișierul bazei de date primară în timpul închiderii/repornirii grațioase, prevenind pierderea de date la oprirea containerului Docker (#905 — mulțumesc @rdself). -**Semnal de închidere grațios:**Rutele `/api/restart` și `/api/shutdown` au fost schimbate de la `process.exit(0)` la `process.kill(SIGTERM)`, asigurându-se ca handlerul de oprire rulează înainte de ieșire. -**Docker Stop Grace Period:**Adăugat `stop_grace_period: 40s` la fișierele Docker Compose și `--stop-timeout 40` la exemplele de rulare Docker.### 🛠️ Maintenance

- S-au închis 5 probleme rezolvate/nu sunt erori (#872, #814, #816, #890, #877).
- S-au triat 6 probleme cu solicitări de informații despre nevoi (#892, #887, #886, #865, #895, #870).
- A răspuns la problema de urmărire a detectării CLI (#863) cu îndrumări pentru colaboratori.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memorie și abilități antigravitație:**Injecția de memorie și abilități de la distanță finalizată pentru furnizorul Antigravity la nivel de rețea proxy. -**Claude Code Compatibility:**A construit o punte de compatibilitate ascunsă nativ pentru Claude Code, trimițând instrumente și formatând curat. -**Web Search MCP:**A fost adăugat instrumentul `omniroute_web_search` cu domeniul `execute:search`. -**Componente cache:**Componente cache dinamice implementate folosind TDD. -**UI și personalizare:**S-au adăugat suport personalizat pentru favicon, file de aspect, etichetare albă prin cablu în bara laterală și pași de ghidare Windsurf adăugat în toate cele 33 de limbi. -**Reținerea jurnalelor:**Reținerea jurnalelor de solicitare unificată și artefacte în mod nativ. -**Îmbunătățiri ale modelului:**S-a adăugat explicit `contextLength` pentru toate modelele opencode-zen. -**i18n și traduceri:**Traduceri integrate în 33 de limbi nativ, inclusiv validări CI substituent și actualizări ale documentației chineze (#873, #869).### 🐛 Bug Fixes

-**Mapping Qwen OAuth:**s-a inversat dependența `id_token` la `access_token` și s-a activat injecția dinamică a punctului final API `resource_url` pentru rutarea regională adecvată (#900). -**Model Sync Engine:**A stocat ID-ul strict intern al furnizorului în rutinele de sincronizare `getCustomModels()` în locul formatului UI Channel Alias, prevenind eșecurile de inserare a catalogului SQLite (#903). -**Claude Code & Codex:**Răspunsuri necompletate standardizate care nu sunt transmise în flux la „(răspuns gol)” formatat în Anthropic pentru a preveni blocările proxy-ului CLI (#866). -**Rutare compatibilă CC:**S-a rezolvat coliziunea punctului final `/v1` duplicat în timpul concatenării căilor pentru gateway-urile generice Claude Code (#904). -**Tablouri de bord antigravitație:**au blocat modelele de cotă nelimitate de la înregistrarea falsă ca stări limită epuizate „Utilizare 100%” în interfața de utilizare a furnizorului (#857). -**Claude Image Passthrough:**S-au remediat modelele Claude care lipseau treceri de bloc de imagine (#898). -**Gemini CLI Routing:**S-au rezolvat blocările de autorizare 403 și problemele de acumulare de conținut prin reîmprospătarea ID-ului proiectului prin `loadCodeAssist` (#868). -**Stabilitatea antigravitațională:**Listele de acces la modele corectate, 404 blocări impuse, 429 cascade remediate care blocau conexiunile standard și jetoane de ieșire `gemini-3.1-pro` limitate (#885). -**Cadenta de sincronizare a furnizorului:**S-a reparat cadența de sincronizare a limitelor furnizorului prin programatorul intern (#888). -**Optimizarea tabloului de bord:**S-a rezolvat înghețarea UI `/dashboard/limits` la procesarea a peste 70 de conturi prin paralelizare în bucăți (#784). -**Întărirea SSRF:**A impus filtrarea strictă a intervalului IP SSRF și a blocat interfața loopback `::1`. -**Tipuri MIME:**`mime_type` standardizat la snake_case pentru a se potrivi cu specificațiile Gemini API. -**Stabilizare CI:**S-au remediat analitice/setări eșuate ale selectoarelor Playwright și solicită afirmații, astfel încât rulările GitHub Actions E2E să treacă în mod fiabil prin interfețele de utilizator localizate și controalele bazate pe comutatoare. -**Teste deterministe:**S-au eliminat fixările de cotă sensibile la dată din testele de utilizare Copilot și s-au aliniat testele de catalog de idempotitate/model cu comportamentul de rulare îmbinat. -**Intărirea tipului MCP:**S-au eliminat „orice” regresii explicite cu buget zero din calea de înregistrare a instrumentului serverului MCP. -**Motor de sincronizare a modelelor:**Ocolite `înlocuirea` distructiv atunci când sincronizarea automată a furnizorului generează o listă de modele goală, menținând stabilitatea pentru cataloagele dinamice (#899).### 🛠️ Maintenance

-**Logging pipeline:**artefacte rafinate de înregistrare a conductelor și aplicarea limitelor de retenție (#880). -**AGENTS.md Revizie:**Condensat din 297→153 linii. S-au adăugat linii directoare de construire/test/stil, fluxuri de lucru de cod (Prettier, TypeScript, ESLint) și tabele detaliate (#882). -**Release Branch Integration:**A consolidat ramurile caracteristice active în `release/v3.4.2` peste `principal` actual și a validat ramura cu scame, unitate, acoperire, build și rulări E2E în modul CI. -**Testare:**S-a adăugat configurația Vitest pentru testarea componentelor și specificațiile Playwright pentru comutarea setărilor. -**Actualizări de documente:**Readmes-uri rădăcină extinsă, documente chineze traduse în mod nativ și curățarea fișierelor învechite.## [3.4.1] - 2026-03-31

> [!AVERTISMENT]
> **SCHIMBARE URBANĂ: variabilele de mediu de înregistrare a cererilor, reținere și înregistrare în jurnal au fost reproiectate.**
> La prima pornire după actualizare, OmniRoute arhivează jurnalele de solicitări vechi din `DATA_DIR/logs/`, moștenirea `DATA_DIR/call_logs/` și `DATA_DIR/log.txt` în `DATA_DIR/log_archives/*.zip`, apoi elimină artefactul neprevăzut și comuta în formatul neprelucrat. `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**Inclus `scripts/migrate-env.mjs` pentru a migra fără probleme configurațiile `<v3.3` la constrângeri stricte de validare de securitate `v3.4.x` (FASE-01), reparând blocările de pornire cauzate de instanțe scurte `JWT_SECRET`. -**Kiro AI Cache Optimization:**S-a implementat generarea deterministă „conversationId” (uuidv5) pentru a activa AWS Builder ID Prompt Cache în mod corespunzător în cadrul invocărilor (#814). -**Restaurare și consolidare a interfeței de bord a tabloului de bord:**S-a rezolvat logica barei laterale omițând secțiunea Debug și a șters avertismentele de rutare Nextjs prin mutarea paginilor autonome `/dashboard/mcp` și `/dashboard/a2a` în mod explicit în componentele Endpoint Proxy UI încorporate. -**Artefacte unificate ale jurnalului de cereri:**Înregistrarea solicitărilor stochează acum un rând de index SQLite plus un artefact JSON per solicitare sub `DATA_DIR/call_logs/`, cu captură opțională în conductă încorporată în același fișier. -**Limba:**S-a îmbunătățit traducerea în chineză (#855) -**Modele Opencode-Zen:**S-au adăugat 4 modele gratuite la registrul opencode-zen (#854) -**Teste:**Au fost adăugate teste unitare și E2E pentru comutări de setări și remedieri de erori (#850)### 🐛 Bug Fixes

-**429 Parsarea cotei:**S-au analizat timpii lungi de resetare a cotei de la corpurile de eroare pentru a onora retragerile corecte și pentru a preveni interzicerea conturilor cu rate limitate (#859) -**Prompt Caching:**Anteturile clientului `cache_control` păstrate pentru toți furnizorii de protocol Claude (cum ar fi Minimax, GLM și Bailian), recunoscând corect suportul pentru cache (#856) -**Model Sync Logs:**Reducerea mesajelor spam prin înregistrarea „sync-models” numai atunci când canalul modifică de fapt lista (#853) -**Parsarea cotelor și a simbolurilor furnizorului:**Limitele antigravitaționale au fost schimbate pentru a utiliza `retrieveUserQuota` în mod nativ și a mapat corect încărcăturile utile de reîmprospătare a simbolurilor Claude la forme codificate URL (#862) -**Stabilitatea de limitare a ratei:**a universalizat arhitectura 429 Retry-After parsing pentru a limita perioadele de răcire induse de furnizor la maximum 24 de ore (#862) -**Randarea limită a tabloului de bord:**Maparea cotelor `/dashboard/limits` re-arhitectată pentru a reda imediat în bucăți, reparând o întârziere majoră de înghețare a interfeței de utilizare pentru conturile care depășesc 70 de conexiuni active (#784) -**Autorizare QWEN OAuth:**A mapat OIDC `id_token` ca simbol principal API Bearer pentru solicitările Dashscope, reparând imediat erorile 401 neautorizate după conectarea conturilor sau reîmprospătarea token-urilor (#864) -**ZAI API Stability:**Compilatorul Hardened Server-Sent Events pentru a reveni cu grație la șiruri goale atunci când furnizorii DeepSeek transmit conținut nul din punct de vedere matematic în timpul fazelor de raționament (#871) -**Claude Code/Codex Translations:**Conversii protejate de încărcare utilă fără flux împotriva răspunsurilor goale din instrumentele Codex din amonte, evitând TypeErrors catastrofale (#866) -**NVIDIA NIM Rendering:**Prefixele identice ale furnizorului sunt eliminate în mod condiționat, împinse dinamic de modelele audio, eliminând structurile duplicate de etichete `nim/nim` care aruncă 404 pe Media Playground (#872)### ⚠️ Breaking Changes

-**Request Log Layout:**S-au eliminat vechile sesiuni de jurnal de solicitare cu mai multe fișiere `DATA_DIR/logs/` și fișierul rezumat `DATA_DIR/log.txt`. Noile solicitări sunt scrise ca artefacte JSON unice în `DATA_DIR/call_logs/YYYY-LL-DD/`. -**Variabile de mediu de înregistrare:**S-au înlocuit `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` și `PROXY_LOG_MAX_ENTRIES` cu noul model de configurare `APP_LOG_*` și `CALL_DAYS_RETENTION_.
-**Setarea de comutare a conductei:**a înlocuit setarea `detailed_logs_enabled`cu`call_log_pipeline_enabled`. Noile detalii ale conductei sunt încorporate în artefactul cererii în loc să fie stocate ca înregistrări separate `request_detail_logs`.### 🛠️ Maintenance

-**Copia de rezervă pentru actualizarea jurnalului de solicitare vechi:**Actualizările arhivează acum vechile aspecte `data/logs/`, vechi `data/call_logs/` și `data/log.txt` în `DATA_DIR/log_archives/*.zip` înainte de a elimina structura depreciată. -**Persistența utilizării în flux:**Solicitările de transmitere în flux scriu acum un singur rând `usage_history` la finalizare, în loc să emită un rând duplicat de utilizare în curs cu metadate de stare goale. -**Curățirea ulterioară a înregistrării:**jurnalele pipeline nu mai captează `SOLICARE SURSA`, intrările de artefacte de solicitare onorează acum `CALL_LOG_MAX_ENTRIES`, iar arhivele de jurnal de aplicații onorează acum `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Funcționalități

-**Analitice de utilizare a abonamentului:**s-au adăugat urmărirea serii temporale a instantanee a cotei, filele Utilizarea furnizorului și Sănătatea combinată cu vizualizări de rediagrame și punctele finale API corespunzătoare (#847) -**SQLite Backup Control:**Noua semnalizare `OMNIROUTE_DISABLE_AUTO_BACKUP` pentru a dezactiva backup-urile automate SQLite (#846) -**Actualizare registru de model:**injectat `gpt-5.4-mini` în gama de modele a furnizorului Codex (#756) -**Urmărirea limitelor furnizorului:**Urmăriți și afișați când limitele ratelor furnizorului au fost actualizate ultima dată pe cont (#843)### 🐛 Bug Fixes

-**Rutarea Qwen Auth:**Redirecționarea completărilor Qwen OAuth de la API-ul DashScope la API-ul Web Inference (`chat.qwen.ai`), rezolvând eșecurile de autorizare (#844, #807, #832) -**Bucla de reîncercare automată Qwen:**A fost adăugată o cotă țintită 429 depășită gestionarea backoff-ului în `chatCore` care protejează cererile de explozie -**Codex OAuth Fallback:**Blocarea pop-up-ului modern al browserului nu mai prinde utilizatorul; se întoarce automat la introducerea manuală a adresei URL (#808) -**Claude Token Refresh:**limitele stricte `application/json` ale Anthropic sunt acum respectate în timpul generării token-ului în loc de adresele URL codificate (#836) -**Schema de mesaje Codex:**Injectări de „mesaje” puriste din cererile native de trecere pentru a evita respingerile structurale din partea din amonte a ChatGPT (#806) -**Limita de dimensiune de detectare a CLI:**A crescut în siguranță limita superioară a scanării binare a nodului de la 100MB la 350MB, permițând instrumentelor independente grele precum Claude Code (229MB) și OpenCode (153MB) să fie detectate corect de rularea VPS (#809) -**CLI Runtime Environment:**Capacitatea restaurată pentru configurațiile CLI de a respecta căile de înlocuire a utilizatorului (`CLI_{PROVIDER}_BIN`) ocolind regulile stricte de descoperire legate de cale -**Conflicte de antet Nvidia:**S-au eliminat proprietățile `prompt_cache_key` din anteturile din amonte atunci când apelați furnizori non-antropici (#848) -**Codex Fast Tier Toggle:**Contrastul de comutare a nivelului de serviciu Codex restaurat în modul de lumină (#842) -**Infrastructura de testare:**Testul `t28-model-catalog-updates` actualizat care se aștepta incorect la punctul final DashScope învechit pentru registrul nativ Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotație personalizată a furnizorului:**`getRotatingApiKey` integrată în interiorul DefaultExecutor, asigurând declanșarea corectă a rotației `extraApiKeys` pentru furnizorii personalizați și compatibili din amonte (#815)---

## [3.3.8] - 2026-03-30

### Funcționalități

-**Models API Filtering:**Endpoint `/v1/models` își filtrează acum lista în mod dinamic pe baza permisiunilor legate de `Authorization: Bearer <token>` când accesul restricționat este activat (#781) -**Integrare Qoder:**Integrare nativă pentru Qoder AI care înlocuiește în mod nativ mapările vechi ale platformei iFlow (#660) -**Prompt Cache Tracking:**Capacități de urmărire și vizualizare frontală adăugate (cardul statistici) pentru memorarea semantică și promptă în interfața de utilizare a tabloului de bord### 🐛 Bug Fixes

-**Dimensiunea tabloului de bord cache:**S-au îmbunătățit dimensiunile aspectului UI și antetele contextului pentru paginile avansate de cache (#835) -**Vizibilitatea barei laterale de depanare:**S-a rezolvat o problemă în care comutatorul de depanare nu arăta/ascundea corect detaliile de depanare a barei laterale (#834) -**Prefixarea modelului Gemini:**S-a modificat spațiul de nume de rezervă pentru a ruta corect prin `gemini-cli/` în loc de `gc/` pentru a respecta specificațiile din amonte (#831) -**OpenRouter Sync:**Sincronizare îmbunătățită a compatibilității pentru a ingera automat catalogul de modele disponibile corect din OpenRouter (#830) -**Mapping Payloads de streaming:**Reserializarea câmpurilor de raționament rezolvă în mod nativ căile de alias de conflict atunci când ieșirea este transmisă în flux către dispozitivele de vârf---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**`opencode.json` generat restructurat pentru a utiliza schema bazată pe înregistrări `@ai-sdk/openai-compatible` cu `opțiuni` și `modele` ca hărți obiect în loc de matrice plate, reparând erorile de validare a configurației (#816) -**Chei lipsă i18n:**S-a adăugat cheia de traducere lipsă `cloudflaredUrlNotice` în toate cele 30 de fișiere de limbă pentru a preveni erorile consolei `MISSING_MESSAGE` în pagina Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Contabilitatea jetoanelor:**au inclus jetoane prompte cache în siguranță în calculele de intrare ale utilizării istorice pentru deduceri corecte de cotă (PR #822) -**Probe de testare combinată:**S-au remediat logica de testare combinată false negative prin rezolvarea parsării pentru răspunsuri numai de raționament și a activat paralelizarea masivă prin Promise.all (PR #828) -**Docker Quick Tunnels:**Certificate ca necesare încorporate în interiorul containerului de rulare de bază pentru a rezolva eșecurile de pornire Cloudflared TLS și erori de rețea stdout care înlocuiesc codurile de ieșire generice (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Urmărirea cotei Gemini:**S-a adăugat urmărirea cotei Gemini CLI în timp real prin intermediul API-ului „retrieveUserQuota” (PR #825) -**Tabloul de bord Cache:**Am îmbunătățit Tabloul de bord Cache pentru a afișa valorile prompte pentru cache, tendințele 24 de ore și economiile estimate de costuri (PR #824)### 🐛 Bug Fixes

-**Experiența utilizatorului:**S-au eliminat buclele modale OAuth invazive cu deschidere automată pe paginile sterile detaliate ale furnizorului (PR #820) -**Actualizări de dependență:**Dependențe eliminate și blocate pentru arbori de dezvoltare și producție, inclusiv Next.js 16.2.1, Recharts și TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Fluxuri de lucru A2A:**S-a adăugat un orchestrator determinist FSM pentru fluxurile de lucru cu agenți în mai mulți pași. -**Degradare grațioasă:**S-a adăugat un nou cadru de rezervă cu mai multe straturi pentru a păstra funcționalitatea de bază în timpul întreruperilor parțiale ale sistemului. -**Config Audit:**S-a adăugat o pistă de audit cu detectare a diferenței pentru a urmări modificările și a activa derularea configurației. -**Sănătatea furnizorului:**A fost adăugată urmărirea expirării furnizorului cu alerte proactive de interfață de utilizare pentru cheile API care expiră. -**Adaptive Routing:**S-a adăugat un detector adaptiv de volum și complexitate pentru a anula strategiile de rutare în mod dinamic, bazate pe încărcare. -**Diversitatea furnizorilor:**Implementarea punctajului diversității furnizorilor prin entropia Shannon pentru a îmbunătăți distribuția sarcinii. -**Dezactivare automată a limitelor:**A fost adăugată o comutare de setare a Dezactivare automată a conturilor interzise la tabloul de bord Reziliență.### 🐛 Bug Fixes

-**Compatibilitate Codex și Claude:**S-au remediat erorile interfeței de utilizare, s-au corectat problemele de integrare Codex care nu erau transmise în flux și s-a rezolvat detectarea CLI a timpului de execuție pe Windows. -**Automatizare de lansare:**Permisiuni extinse necesare pentru construirea aplicației Electron în GitHub Actions. -**Cloudflare Runtime:**S-au adresat coduri corecte de ieșire pentru izolarea timpului de execuție pentru componentele tunelului Cloudflare.### 🧪 Tests

-**Actualizări ale suitei de teste:**Acoperire extinsă a testelor pentru detectoare de volum, diversitatea furnizorilor, auditul configurației și FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Fiabilitate CI/CD:**Acțiunile GitHub corectate la versiuni de dependență stabile (`actions/checkout@v4`, `actions/upload-artifact@v4`) pentru a atenua deprecierea neanunțată a mediului constructor. -**Imagine de rezervă:**S-au înlocuit lanțurile de rezervă arbitrare în `ProviderIcon.tsx` cu validarea explicită a activelor pentru a preveni încărcarea componentelor `<Imagine>` UI pentru fișiere care nu există, eliminând erorile `404` din jurnalele consolei tabloului de bord (#745). -**Admin Updater:**Detectare dinamică a instalării sursei pentru instrumentul de actualizare a tabloului de bord. Dezactivează în siguranță butonul `Actualizează acum` când OmniRoute este construit local și nu prin npm, solicitând `git pull` (#743). -**Eroare de actualizare RESOLVE:**`package.json` injectat înlocuiește pentru `react`/`react-dom` și s-a activat `--legacy-peer-deps` în scripturile interne de actualizare automată pentru a rezolva conflictele de întrerupere a arborelui de dependență cu `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Tunele Cloudflare:**Integrare Cloudflare Quick Tunnel cu comenzile tabloului de bord (PR #772). -**Diagnosticare:**Ocolire semantică a memoriei cache pentru teste combinate live (PR #773).### 🐛 Bug Fixes

-**Stabilitatea fluxului:**Aplicați `FETCH_TIMEOUT_MS` la apelul inițial `fetch()` al cererilor de streaming pentru a preveni 300s de timp de expirare a TCP Node.js care cauzează eșecuri silențioase ale sarcinii (#769). -**i18n:**Adăugați intrările `windsurf` și `copilot` lipsă la `toolDescriptions` în toate cele 33 de fișiere locale (#748). -**Audit de codare GLM:**Audit complet al furnizorului care remediază vulnerabilitățile ReDoS, dimensiunea ferestrei de context (128k/16k) și sincronizarea registrului modelului (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Remediere de procesare de rezervă pentru elementele `type: "text"` care transportă seturi de date nule sau goale care au cauzat 400 de respingere (#742). -**Opencode:**Actualizați alinierea schemei la `furnizor` singular pentru a se potrivi cu specificațiile oficiale (#774). -**Gemini CLI:**Injectați anteturile de cotă de utilizator final lipsă, prevenind blocarea autorizației 403 (#775). -**Recuperare DB:**Refactorează importurile de încărcătură utilă în mai multe părți în rețele binare brute cu tampon pentru a ocoli limitele maxime ale corpului proxy invers (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilizarea lansării**— S-a finalizat lansarea v3.2.9 (diagnosticare combinată, porți de calitate, remediere instrument Gemini) și a creat eticheta git lipsă. A consolidat toate modificările în etape într-o singură comitere de eliberare atomică.### 🐛 Bug Fixes

-**Test de actualizare automată**— S-a remediat afirmația de testare `buildDockerComposeUpdateScript` pentru a se potrivi cu referințele variabilelor shell neexpandite (`$TARGET_TAG`, `${TARGET_TAG#v}`) în scriptul de implementare generat, aliniindu-se cu șablonul refactorizat din v3.2.8. -**Circuit Breaker Test**— `combo-circuit-breaker.test.mjs` întărit prin injectarea `maxRetries: 0` pentru a preveni umflarea reîncercării de a deforma afirmațiile numărului de eșecuri în timpul tranzițiilor stării întreruptorului.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— A introdus un semnal de ocolire a testului live (`forceLiveComboTest`) care permite administratorilor să execute verificări reale de sănătate în amonte, care ocolesc toate mecanismele locale de întrerupător și stare de răcire, permițând diagnosticare precisă în timpul întreruperilor de rulare (PR #759) -**Quality Gates**— S-a adăugat validarea automată a calității răspunsului pentru combo-uri și suportul pentru modelul „claude-4.6” integrat oficial în schemele de rutare de bază (PR #762)### 🐛 Bug Fixes

-**Tool Definition Validation**— Integrarea Gemini API a fost reparată prin normalizarea tipurilor de enumerare în definițiile instrumentului, prevenind erorile parametrilor HTTP 400 din amonte (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Integrat un proces de actualizare detașat în fundal pentru implementările Docker Compose. Interfața de utilizare a tabloului de bord urmărește acum fără probleme evenimentele ciclului de viață al actualizării, combinând răspunsurile JSON REST cu suprapuneri de progres în fluxul SSE pentru o fiabilitate robustă între medii. -**Cache Analytics**— S-a reparat maparea vizualizării zero-metrics prin migrarea jurnalelor de telemetrie Semantic Cache direct în modulul SQLite de urmărire centralizată.### 🐛 Bug Fixes

-**Logica de autentificare**— S-a remediat o eroare în care salvarea setărilor tabloului de bord sau adăugarea modelelor a eșuat cu o eroare 401 neautorizată când `requireLogin` a fost dezactivat. Punctele finale API evaluează acum corect comutatorul de autentificare globală. Redirecționarea globală a fost rezolvată prin reactivarea `src/middleware.ts`. -**CLI Tool Detection (Windows)**— A prevenit excepțiile fatale de inițializare în timpul detectării mediului CLI prin prinderea corectă a erorilor ENOENT „cross-spawn”. Adaugă căi de detectare explicite pentru „\AppData\Local\droid\droid.exe”. -**Codex Native Passthrough**— Parametrii de traducere a modelului normalizat care împiedică otrăvirea contextului în modul de trecere proxy, impunând în mod explicit constrângerile generice „store: false” pentru toate cererile originate de Codex. -**SSE Token Reporting**— Detectarea `finish_reason` a segmentului de apel de instrument al furnizorului normalizat, remedierea analizei de utilizare a 0% pentru răspunsurile numai în flux lipsesc indicatorii stricti `<DONE>`. -**Etichete DeepSeek <think>**— A implementat o mapare explicită de extracție `<think>` în interiorul `responsesHandler.ts`, asigurând că fluxurile de raționament DeepSeek sunt echivalente cu structurile native `<thinking>` antropice.---

## [3.2.7] - 2026-03-29

### Fixed

-**Actualizări fără întreruperi ale interfeței de utilizare**: funcția „Actualizați acum” de pe tabloul de bord oferă acum feedback live, transparent, folosind evenimentele trimise de server (SSE). Efectuează instalarea pachetelor, reconstruirile de module native (better-sqlite3) și PM2 repornește în mod fiabil, afișând încărcătoare în timp real în loc să fie suspendate în tăcere.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Afișarea cheii API (#740)**— S-a adăugat un flux de copiere a cheii API în domeniul de aplicare în Managerul Api, protejat de variabila de mediu `ALLOW_API_KEY_REVEAL`. -**Controalele vizibilității barei laterale (#739)**— Administratorii pot acum ascunde orice link de navigare din bara laterală prin setările Aspect pentru a reduce dezordinea vizuală. -**Testare combinată strictă (#735)**— S-a întărit punctul final de verificare a stării combo pentru a solicita răspunsuri text live de la modele în loc de doar semnale de accesibilitate. -**Jurnalele detaliate transmise (#734)**— S-a schimbat înregistrarea detaliată a cererilor pentru fluxurile SSE pentru a reconstrui sarcina utilă finală, economisind cantități imense de dimensiunea bazei de date SQLite și curățând semnificativ interfața de utilizare.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— S-a corectat logica antetului de autentificare pentru modelele `minimax` pe OpenCode Go pentru a utiliza `x-api-key` în loc de jetoane purtător standard în protocolul `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Șablon integrat de ambalare `xbps-src` și instrucțiuni pentru a compila și instala în mod nativ OmniRoute cu legături `better-sqlite3` prin ținta de compilare încrucișată.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— A migrat complet furnizorul de bază `iFlow` moștenit pe `Qoder AI`, menținând capabilități stabile de rutare API.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— Injecțiile de matrice „thoughtSignature” prevenite în secvențele standard Gemini „functionCall” blocând fluxurile de rutare agentică.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfața de utilizare a cotei pentru limitele furnizorului (#728)**— Logica normalizată a limitei cotei și etichetarea datelor în interiorul interfeței Limite.### 🐛 Bug Fixes

-**Core Routing Schemes & Leaks**— `comboStrategySchema` extins pentru a suporta nativ strategiile `fill-first` și `p2c` pentru a debloca editarea combo complexă în mod nativ. -**Thinking Tags Extraction (CLI)**— Restructurat CLI token răspunsuri dezinfectant RegEx captarea structurilor de raționament model în interiorul fluxurilor evitând extracțiile întrerupte `<thinking>` rupând formatul de ieșire a textului de răspuns. -**Implementări stricte în format**— Execuție întărită de dezinfectare a conductelor, ceea ce o face să se aplice universal țintelor modului de traducere.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Four-Stage Request Log Pipeline (#705)**— Persistența jurnalului refactorizat pentru a salva încărcături utile complete în patru etape distincte ale conductei: Solicitare client, Cerere furnizor tradus, Răspuns furnizor și Răspuns client tradus. S-a introdus `streamPayloadCollector` pentru trunchierea fluxului SSE robust și serializarea încărcăturii utile.### 🐛 Bug Fixes

-**Remedieri ale interfeței de utilizare mobilă (#659)**— Au împiedicat componentele tabelului de pe tabloul de bord să rupă aspectul pe ferestrele de vizualizare înguste, adăugând derulare orizontală adecvată și limitare a depășirii la `DashboardLayout`. -**Claude Prompt Cache Fixs (#708)**— S-a asigurat că blocurile `cache_control` din buclele de rezervă Claude-la-Claude sunt păstrate fidel și transmise în siguranță înapoi la modelele Anthropic. -**Gemini Tool Definitions (#725)**— S-au remediat erorile de traducere a schemei la declararea unor tipuri simple de parametri „obiect” pentru apelarea funcției Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Când toate modelele combo sunt epuizate (502/503), OmniRoute încearcă acum un model global de rezervă configurabil înainte de a returna eroarea. Setați `globalFallbackModel` în setări pentru a activa.### 🐛 Bug Fixes

-**Remediere #721**— S-a remediat ocolirea fixarii contextului în timpul răspunsurilor la apelul instrumentului. Etichetarea non-streaming a folosit calea JSON greșită (`json.messages` → `json.choices[0].message`). Injecția de streaming se declanșează acum pe bucățile „finish_reason” pentru fluxurile numai pentru apeluri de instrumente. `injectModelTag()` adaugă acum mesaje PIN sintetice pentru conținut fără șir. -**Remediere #709**— Confirmat deja remediat (v3.1.9) — `system-info.mjs` creează directoare recursiv. Închis. -**Remediere #707**— Confirmat deja remediat (v3.1.9) — igienizarea numelui instrumentului gol în `chatCore.ts`. Închis.### 🧪 Tests

- S-au adăugat 6 teste unitare pentru fixarea contextului cu răspunsuri la apeluri de instrumente (conținut nul, conținut matrice, dus-întors, re-injectare)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Interfața de utilizare pentru gestionarea cachei**— S-a adăugat un tablou de bord dedicat pentru memorarea în cache semantică la \`/dashboard/cache\` cu invalidare API vizată și suport i18n în 31 de limbi (PR #701 de @oyi77) -**GLM Quota Tracking**— S-a adăugat utilizarea în timp real și urmărirea cotei de sesiune pentru furnizorul GLM Coding (Z.AI) (PR #698 de la @christopher-s) -**Încărcături utile jurnalului detaliate**— Capturarea încărcăturii utile a conductei în patru etape prin cablu (original, tradus, răspunsul furnizorului, deltas transmise în flux) direct în interfața de utilizare (PR #705 de către @rdself)### 🐛 Bug Fixes

-**Remediere #708**— S-a prevenit sângerarea jetonului pentru utilizatorii de cod Claude care trimit prin OmniRoute prin păstrarea corectă a antetelor native \`cache_control\` în timpul trecerii Claude-la-Claude (PR #708 de @tombii) -**Remediere #719**— Configurați limitele de autentificare interne pentru \`ModelSyncScheduler\` pentru a preveni eșecurile demonului neautentificat la pornire (PR #719 de către @rdself) -**Remediere nr. 718**— Redarea insigna reconstruită în interfața de utilizare Limitele furnizorului, prevenind suprapunerea limitelor cotelor greșite (PR #718 de către @rdself) -**Remediere #704**— S-au remediat erorile combinate care s-au întrerupt în cazul erorilor de politică de conținut HTTP 400 care împiedică rutarea nefuncțională a rotației modelului (PR #704 de la @rdself)### 🔒 Security & Dependencies

- S-a lovit \`path-to-regexp\` la \`8.4.0\`, rezolvând vulnerabilitățile dependentabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Remediere #706**— S-a remediat redarea de rezervă a pictogramei cauzată de anularea „font-sans” de Tailwind V4 prin aplicarea „!important” la „.material-symbols-outlined”. -**Remediere #703**— S-au remediat fluxurile întrerupte din GitHub Copilot prin activarea „răspunsurilor” la traducerea în format „openai” pentru orice model personalizat care folosește „apiFormat: „răspunsuri””. -**Remediere #702**— S-a înlocuit urmărirea utilizării forfetare cu calcule precise ale prețurilor DB atât pentru răspunsurile în flux, cât și pentru cele non-streaming. -**Remediere #716**— S-a curățat starea de traducere a apelurilor instrumentului Claude, analizând corect argumentele de streaming și împiedicând bucățile OpenAI `tool_calls` să repete câmpul `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Constrângerea automată a constrângerilor de schemă JSON numerică codificată în șir (de exemplu, `"minimum": "1"`) la tipurile adecvate, prevenind 400 de erori de la Cursor, Cline și alți clienți care trimit scheme de instrumente incorecte. -**Igienizarea descrierii instrumentului**— Asigurați-vă că descrierile instrumentelor sunt întotdeauna șiruri; convertește descrierile `null`, `undefined` sau numerice în șiruri goale înainte de a fi trimise către furnizori. -**Butonul Șterge toate modelele**— S-au adăugat traduceri i18n pentru acțiunea furnizorului „Șterge toate modelele” în toate cele 30 de limbi. -**Codex Auth Export**— S-au adăugat butoanele Codex `auth.json` de export și aplicație locală pentru o integrare perfectă a CLI. -**Note BYOK Windsurf**— S-au adăugat avertismente oficiale de limitare la cardul de instrumente Windsurf CLI care documentează constrângerile BYOK.### 🐛 Bug Fixes

-**Remediere #709**— `system-info.mjs` nu se mai blochează când directorul de ieșire nu există (a adăugat `mkdirSync` cu steag recursiv). -**Remediere #710**— Singletonul A2A `TaskManager` folosește acum `globalThis` pentru a preveni scurgerea stării prin recompilările rutelor API Next.js în modul dev. Suita de testare E2E a fost actualizată pentru a gestiona 401 cu grație. -**Remediere #711**— S-a adăugat aplicarea plafonului `max_tokens` specific furnizorului pentru cererile din amonte. -**Remediere #605 / #592**— Eliminați prefixul `proxy_` din numele instrumentelor în răspunsurile Claude non-streaming; URL-ul de validare LongCat fixat. -**Call Logs Max Cap**— `getMaxCallLogs()` actualizat cu strat de cache, suport pentru env var (`CALL_LOGS_MAX`) și integrarea setărilor DB.### 🧪 Tests

- Suita de teste s-a extins de la 964 → 1027 de teste (63 de teste noi)
- S-a adăugat `schema-coercion.test.mjs` — 9 teste pentru constrângerea numerică a câmpului și igienizarea descrierii instrumentului
- Adăugat `t40-opencode-cli-tools-integration.test.mjs` — teste de integrare OpenCode/Windsurf CLI
- Ramă îmbunătățită de teste de caracteristici cu instrumente de acoperire cuprinzătoare### 📁 New Files

| Fișier                                                   | Scop                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Constrângerea schemei și descrierea instrumentelor utilități de igienizare |
| `teste/unitate/schema-coercion.test.mjs`                 | Teste unitare pentru constrângerea schemei                                 |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Teste de integrare a instrumentelor CLI                                    |
| `COVERAGE_PLAN.md`                                       | Document de planificare a acoperirii testului                              | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— S-au remediat marcatorii cache_control care erau eliminati în modul Claude passthrough (Claude → OmniRoute → Claude), ceea ce i-a determinat pe utilizatorii Claude Code să-și epuizeze cota API-ului Anthropic de 5-10 ori mai rapid decât conexiunile directe. OmniRoute păstrează acum markerii cache_control ai clientului atunci când sourceFormat și targetFormat sunt ambele Claude, asigurând ca stocarea promptă să funcționeze corect și reducând dramatic consumul de token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Nucleul platformei:**Gestionarea globală a stării a fost implementată pentru modelele și combo-urile ascunse, împiedicându-le să aglomereze catalogul sau să se scurgă în agenții MCP conectați (#681). -**Stabilitate:**Blocări de streaming corectate legate de integrarea furnizorului nativ Antigravity eșuat din cauza matricelor de stare nedefinite netratate (#684). -**Localization Sync:**A fost implementat un sincronizator `i18n` complet revizuit, care detectează proprietăți JSON imbricate lipsă și adaptează 30 de localități secvenţial (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Stabilitatea fluxului:**S-a remediat `hasValuableContent` care returnează `undefined` pentru bucăți goale din fluxurile SSE (#676). -**Tool Calling:**S-a remediat o problemă în `sseParser.ts` în care răspunsurile Claude care nu erau transmise în flux cu mai multe apeluri de instrument au renunțat la `id` apelurilor ulterioare de instrumente din cauza deduplicarii incorecte bazate pe index (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**— Numele de instrumente precum `TodoWrite` nu mai sunt prefixate cu `proxy_` în răspunsurile Claude passthrough (atât în ​​flux, cât și non-stream). Include acoperirea testului unitar (PR #663 de la @coobabm) -**Clear All Models Alias Cleanup**— Butonul „Șterge toate modelele” acum elimină și aliasurile de model asociate, prevenind modelele fantomă în UI (PR #664 de @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Conturile cu rate limitate se recuperează acum automat când expiră fereastra de răcire, reparând un impas în care conturile „backoffLevel” ridicate au deprioritizat permanent conturile (PR #657 de la @brendandebeasi)### 🌍 i18n

-**Revizuire traducere în chineză**— Rescrie completă a `zh-CN.json` cu o precizie îmbunătățită (PR #658 de la @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**— `stream: true` explicit din corpul cererii are acum prioritate față de antetul `Accept: application/json`. Clienții care trimit ambele vor primi corect răspunsuri în flux SSE (#656)### 🌍 i18n

-**Îmbunătățiri ale șirurilor de caractere cehe**— Terminologie rafinată în `cs.json` (PR #655 de la @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 de chei de traducere lipsă**adăugate la `en.json` și 12 limbi (PR #652 de la @zen0bit) -**Documentația cehă actualizată**— ghiduri CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Scripturi de validare a traducerii**— `check_translations.py` și `validate_translation.py` pentru CI/QA (PR #651 de la @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Critic: Tool Calling Regression**— S-au remediat erorile `proxy_Bash` prin dezactivarea prefixului numelui instrumentului `proxy_` în calea de trecere Claude. Instrumente precum `Bash`, `Read`, `Write` au fost redenumite în `proxy_Bash`, `proxy_Read` etc., determinând Claude să le respingă (#618) -**Documentația privind interzicerea contului Kiro**— Documentată ca fals pozitiv antifraudă AWS în amonte, nu o problemă OmniRoute (#649)### 🧪 Tests

-**936 teste, 0 eșecuri**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadatele capacității vizuale**: s-au adăugat `capabilities.vision`, `input_modalities` și `output_modalities` la intrările `/v1/models` pentru modelele cu capacitate de vedere (PR #646) -**Modele Gemini 3.1**: s-au adăugat `gemini-3.1-pro-preview` și `gemini-3.1-flash-lite-preview` la furnizorul Antigravity (#645)### 🐛 Bug Fixes

-**Eroare Ollama Cloud 401**: Adresa URL de bază a API incorectă a fost remediată — schimbată din „api.ollama.com” în „ollama.com/v1/chat/completions” oficial (#643) -**Reîncercare token expirată**: s-a adăugat reîncercarea delimitată cu backoff exponențial (5→10→20 min) pentru conexiunile OAuth expirate, în loc să le ignore permanent (PR #647)### 🧪 Tests

-**936 teste, 0 eșecuri**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Șabloane de probleme GitHub**: s-au adăugat un raport de eroare standardizat, cerere de caracteristici și șabloane de problemă de configurare/proxy (#641) -**Șterge toate modelele**: s-a adăugat un buton „Șterge toate modelele” la pagina de detalii a furnizorului cu suport i18n în 29 de limbi (#634)### 🐛 Bug Fixes

-**Locale Conflict (`in.json`)**: a redenumit fișierul local hindi din `in.json` (cod ISO indonezian) în `hi.json` pentru a remedia conflictele de traducere în Weblate (#642) -**Nume de instrumente goale Codex**: igienizarea numelui de instrument a fost mutată înainte de trecerea nativă a Codex, reparând 400 de erori de la furnizorii din amonte când instrumentele aveau nume goale (#637) -**Artefacte Newline în flux**: s-a adăugat `collapseExcessiveNewlines` la dezinfectantul de răspuns, restrângând rulări de peste 3 linii noi consecutive de la modele de gândire într-o linie nouă standard dublă (#638) -**Claude Reasoning Effort**: parametrul OpenAI `reasoning_effort` a fost convertit în blocul bugetar nativ `thinking` al lui Claude pe toate căile de solicitare, inclusiv ajustarea automată `max_tokens` (#627) -**Qwen Token Refresh**: Actualizări proactive ale jetonului OAuth înainte de expirare (buffer de 5 minute) pentru a preveni eșecul solicitărilor atunci când se utilizează token-uri de scurtă durată (#631)### 🧪 Tests

-**936 teste, 0 eșecuri**(+10 teste începând cu 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Jetoane NaN în codul Claude/răspunsurile clientului (#617):**

- `sanitizeUsage()` acum încrucișează `input_tokens`→`prompt_tokens` și `output_tokens`→`completion_tokens` înainte de filtrul listei albe, reparând răspunsurile care afișează numărul de jetoane NaN/0 când furnizorii returnează numele câmpurilor de utilizare în stil Claude### Securitate

- Pachetul `yaml` actualizat pentru a remedia vulnerabilitatea de depășire a stivei (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Închis # 613 (Codestral - rezolvat cu o soluție de soluționare a furnizorului personalizat)
- Comentat la #615 (OpenCode dual-endpoint - soluție de soluție furnizată, urmărită ca solicitare de caracteristică)
- Comentat la #618 (vizibilitatea apelului instrumentului - se solicită testul v3.0.9)
- Comentat la #627 (nivel de efort — deja acceptat)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Eșecuri de traducere pentru furnizorii de format OpenAI în Claude CLI (#632):**

- Gestionează formatul de matrice `reasoning_details[]` din StepFun/OpenRouter — se convertește în `reasoning_content`
- Gestionează alias-ul câmpului `raționament` de la unii furnizori → normalizat la `conținut_raționament``
- Nume de câmpuri de utilizare a hărților încrucișate: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` în `filterUsageFormat`
- Remediați `extractUsage` pentru a accepta atât `input_tokens`/`output_tokens`, cât și `prompt_tokens`/`completion_tokens` ca câmpuri de utilizare valide
- Se aplică atât căilor de streaming (`sanitizeStreamingChunk`, traducător `openai-to-claude.ts`) cât și căilor de non-streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**S-a remediat eroarea `client_secret is missing` pentru utilizatorii instalați prin npm — `clientSecretDefault` era gol în providerRegistry, determinând Google să respingă solicitările de reîmprospătare a jetonului (#588) -**Modele OpenCode Zen:**S-a adăugat `modelsUrl` la intrarea de registru OpenCode Zen, astfel încât „Importați din /modele” să funcționeze corect (#612) -**Artefacte în flux:**S-au remediat liniile noi excesive rămase în răspunsuri după eliminarea semnăturii etichetelor de gândire (#626) -**Proxy Fallback:**S-a adăugat reîncercare automată fără proxy atunci când releul SOCKS5 eșuează -**Test proxy:**Punctul final de testare rezolvă acum acreditările reale din DB prin proxyId### ✨ New Features

-**Selector de conturi/chei pentru teren de joacă:**meniu vertical permanent, mereu vizibil pentru a selecta anumite conturi/chei ale furnizorului pentru testare - preia toate conexiunile la pornire și filtrează după furnizorul selectat -**CLI Tools Dynamic Models:**Selecția modelului este acum preluată dinamic din API-ul `/v1/models` — furnizori precum Kiro își arată acum catalogul complet de modele -**Lista de modele antigravitație:**Actualizată cu Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; activat `passthroughModels` pentru accesul dinamic la model (#628)### 🔧 Maintenance

- PR fuzionat #625 — Furnizorul limitează remedierea fundalului modului de lumină---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limite/Proxy:**Preluarea limitelor Codex fixe pentru conturile din spatele proxy-urilor SOCKS5 - reîmprospătarea simbolului rulează acum în contextul proxy-ului -**CI:**S-a remediat eșecul de afirmare a testului de integrare „v1/models” în mediile CI fără conexiuni la furnizor -**Setări:**Butonul de testare proxy arată acum rezultatele de succes/eșec imediat (ascuns anterior în spatele datelor de sănătate)### ✨ New Features

-**Teren de joacă:**Meniu derulant al selectorului de cont adăugat - testați anumite conexiuni individual atunci când un furnizor are mai multe conturi### 🔧 Maintenance

- PR fuzionat #623 — Corecția căii URL de bază a API-ului LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limite UI:**A fost adăugată funcția de grupare a etichetelor la tabloul de bord pentru conexiuni pentru a îmbunătăți organizarea vizuală a conturilor cu etichete personalizate.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**S-a remediat corupția stării `TextDecoder` în combo `sanitize` TransformStream, care a cauzat ieșirea SSE distorsionată care corespundea caracterelor multibyte (PR #614) -**Interfața de utilizare pentru furnizori:**Redați în siguranță etichetele HTML în sfaturile instrumente de eroare a conexiunii furnizorului folosind `dangerouslySetInnerHTML` -**Setări proxy:**s-au adăugat proprietățile lipsă ale corpului încărcăturii utile „nume de utilizator” și „parolă”, permițând verificarea cu succes a proxy-urilor autentificate din tabloul de bord. -**Provider API:**Excepția soft legată revine la `getCodexUsage` prevenind eșecurile API HTTP 500 atunci când preluarea jetonului eșuează---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modele de sincronizare automată:**S-a adăugat o comutare a interfeței de utilizare și un punct final „modele de sincronizare” pentru a sincroniza automat listele de modele pentru fiecare furnizor folosind un programator de intervale programate (PR #597)### 🐛 Bug Fixes

-**Timeouts:**proxy implicite ridicate `FETCH_TIMEOUT_MS` și `STREAM_IDLE_TIMEOUT_MS` la 10 minute pentru a sprijini corect modelele de raționament profund (cum ar fi o1) fără a anula solicitările (remedieri #609) -**Detecție instrument CLI:**Detectare îmbunătățită pe mai multe platforme care gestionează căile NVM, `PATHEXT` Windows (prevenirea problemei wrapper-urilor `.cmd`) și prefixe NPM personalizate (PR #598) -**Jurnalele de streaming:**S-a implementat acumularea delta „tool_calls” în jurnalele de răspuns în flux, astfel încât apelurile de funcții să fie urmărite și păstrate cu precizie în DB (PR #603) -**Catalogul de modele:**scutirea de autorizare a fost eliminată, ascund în mod corespunzător modelele `comfyui` și `sdwebui` atunci când niciun furnizor nu este configurat în mod explicit (PR #599)### 🌐 Translations

-**cs:**șiruri de traducere în limba cehă îmbunătățite în aplicație (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- S-a adăugat un câmp Tag/Group la `EditConnectionModal` (stocat în `providerSpecificData.tag`) fără a necesita migrarea schemei DB.
- Acum, conexiunile din vizualizarea furnizorului sunt grupate dinamic după etichetă, cu separatoare vizuale.
- Conexiunile neetichetate apar mai întâi fără antet, urmate de grupurile etichetate în ordine alfabetică.
- Gruparea etichetelor se aplică automat secțiunii Codex/Copilot/Antigravity Limits, deoarece există comutatoare în rândurile de conexiune.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Insigne lipsă de pe cardurile de conexiune:**Remediat folosind `resolveProxyForConnection()`, mai degrabă decât maparea statică. -**Testează conexiunea dezactivată în modul salvat:**S-a activat butonul Test prin rezolvarea configurației proxy din lista salvată. -**Config Modal freezing:**Adăugat apeluri `onClose()` după salvare/ștergere pentru a preveni blocarea interfeței de utilizare. -**Numărarea dublă a utilizării:**`ProxyRegistryManager` încarcă acum utilizarea cu nerăbdare pe montare cu deduplicare prin `scope` + `scopeId`. Numărările de utilizare au fost înlocuite cu un buton Test care afișează IP/latența în linie.#### fix(translator): `function_call` prefix stripping

- S-a reparat o remediere incompletă de la PR #607 în care numai blocurile `tool_use` au eliminat prefixul instrumentului `proxy_` al lui Claude. Acum, clienții care utilizează formatul OpenAI Responses API vor primi corect instrumente fără prefixul „proxy\_”.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Trei regresii critice raportate de utilizatori după lansarea v3.0.0 au fost rezolvate.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Prefixul `proxy_` adăugat de Claude OAuth a fost eliminat doar din răspunsurile de**streaming**. În modul**non-streaming**, `translateNonStreamingResponse` nu avea acces la `toolNameMap`, determinând clienții să primească nume de instrumente alterate precum `proxy_read_file` în loc de `read_file`.

**Remediere:**S-a adăugat parametrul opțional `toolNameMap` la `translateNonStreamingResponse` și s-a aplicat eliminarea prefixului în gestionarea blocurilor Claude `tool_use`. `chatCore.ts` trece acum harta prin.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI nu expune `GET /v1/models`. Validatorul generic `validateOpenAICompatibleProvider` a căzut la o soluție de rezervă pentru finalizarea chat-ului numai dacă a fost setat `validationModelId`, pe care LongCat nu îl configurează. Acest lucru a făcut ca validarea furnizorului să eșueze cu o eroare înșelătoare la adăugare/salvare.

**Remediere:**S-a adăugat `longcat` pe harta validatorilor de specialitate, verificând direct `/chat/completions` și tratând orice răspuns fără autorizare ca o trecere.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Instrumentele MCP (de exemplu, `creion`, `computer_use`) trimit definiții de instrumente cu `{type:"object"}`, dar fără un câmp `properties`. API-ul Anthropic le respinge cu: „proprietăți lipsă din schema obiectului”.

**Remediere:**În `openai-to-claude.ts`, injectați `properties: {}` ca implicit sigur când `type` este `"object"` și `properties` este absent.---

### 🔀 Community PRs Merged (2)

| PR       | Autor   | Rezumat                                                                                                |
| -------- | ------- | ------------------------------------------------------------------------------------------------------ | --- |
| **#589** | @flobo3 | docs(i18n): reparați traducerea în limba rusă pentru Playground și Testbed                             |
| **#591** | @rdself | fix(ui): îmbunătățiți contrastul modului de lumină Limitele furnizorului și afișarea nivelului de plan | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 teste, 0 eșecuri**(neschimbat față de v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Cea mai mare lansare vreodată.**De la 36 de furnizori în v2.9.5 la**67+ furnizori**în v3.0.0 — cu server MCP, protocol A2A, motor combo automat, pictograme furnizor, API chei înregistrate, 926 de teste și contribuții de la**12 membri ai comunității**îmbinate în**10 PRs**.
>
> Consolidat de la v3.0.0-rc.1 până la rc.17 (17 candidați de lansare pe parcursul a 3 zile de dezvoltare intensă).---

### 🆕 New Providers (+31 since v2.9.5)

| Furnizor                       | Alias ​​            | Nivelul      | Note                                                                                             |
| ------------------------------ | ------------------- | ------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **OpenCode Zen**               | `opencode-zen`      | Gratuit      | 3 modele prin `opencode.ai/zen/v1` (PR #530 de @kang-heewon)                                     |
| **OpenCode Go**                | `opencode-go`       | Plătit       | 4 modele prin `opencode.ai/zen/go/v1` (PR #530 de @kang-heewon)                                  |
| **LongCat AI**                 | `lc`                | Gratuit      | 50M de jetoane/zi (Flash-Lite) + 500K/zi (Chat/Gândire) în timpul beta publică                   |
| **Polenizări AI**              | `pol`               | Gratuit      | Nu este necesară nicio cheie API — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 solicitat/15s) |
| **Cloudflare Workers AI**      | `cf`                | Gratuit      | 10K neuroni/zi — ~150 de răspunsuri LLM sau 500 de secunde Sunet în șoaptă, inferență de margine |
| **Scaleway AI**                | `scw`               | Gratuit      | 1 milion de jetoane gratuite pentru conturi noi — conform UE/GDPR (Paris)                        |
| **AI/ML API**                  | `aiml`              | Gratuit      | 0,025 USD/zi credite gratuite — peste 200 de modele prin un singur punct final                   |
| **Puter AI**                   | `pu`                | Gratuit      | Peste 500 de modele (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                    |
| **Alibaba Cloud (DashScope)**  | `ali`               | Plătit       | Puncte finale internaționale + China prin `alicode`/`alicode-intl`                               |
| **Plan de codificare alibaba** | `bcp`               | Plătit       | Alibaba Model Studio cu API compatibil cu Antropic                                               |
| **Codare Kimi (cheie API)**    | `kmca`              | Plătit       | Acces Kimi dedicat bazat pe chei API (separat de OAuth)                                          |
| **Codare MiniMax**             | `minimax`           | Plătit       | Punct final internațional                                                                        |
| **MiniMax (China)**            | `minimax-cn`        | Plătit       | Punct final specific Chinei                                                                      |
| **Z.AI (GLM-5)**               | `zai`               | Plătit       | Zhipu AI modele GLM de nouă generație                                                            |
| **Vertex AI**                  | `vârf`              | Plătit       | Google Cloud — Service Account JSON or OAuth access_token                                        |
| **Ollama Cloud**               | `ollamacloud`       | Plătit       | Serviciul API găzduit de Ollama                                                                  |
| **Sintetic**                   | `sintetic`          | Plătit       | Passthrough modele gateway                                                                       |
| **Kilo Gateway**               | `kg`                | Plătit       | Passthrough modele gateway                                                                       |
| **Căutare nedumerită**         | `pplx-search`       | Plătit       | Punct final de căutare dedicat                                                                   |
| **Căutare Serper**             | `serper-search`     | Plătit       | Integrare API de căutare web                                                                     |
| **Căutare curajoasă**          | `căutare-curajoasă` | Plătit       | Integrarea Brave Search API                                                                      |
| **Exa Search**                 | `exa-search`        | Plătit       | Integrare API de căutare neuronală                                                               |
| **Tavily Search**              | `tavily-search`     | Plătit       | Integrare API de căutare AI                                                                      |
| **NanoBanana**                 | `nb`                | Plătit       | API de generare a imaginii                                                                       |
| **ElevenLabs**                 | `el`                | Plătit       | Sinteza vocală text-to-voce                                                                      |
| **Cartesia**                   | `cartesia`          | Plătit       | Sinteza vocală TTS ultra-rapidă                                                                  |
| **PlayHT**                     | `playht`            | Plătit       | Clonarea vocii și TTS                                                                            |
| **Inworld**                    | `inworld`           | Plătit       | Chat vocal cu caracter AI                                                                        |
| **SD WebUI**                   | `sdwebui`           | Auto-găzduit | Generare locală de imagini de difuzie stabilă                                                    |
| **ComfyUI**                    | `comfyui`           | Auto-găzduit | ComfyUI generare locală bazată pe noduri de flux de lucru                                        |
| **Codare GLM**                 | `glm`               | Plătit       | Punct final specific pentru codificare BigModel/Zhipu                                            | **Total: peste 67 de furnizori**(4 gratuit, 8 OAuth, 55 cheie API) + furnizori personalizați nelimitați compatibili cu OpenAI/Antropic.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Generați automat și emiteți cheile API OmniRoute în mod programatic, cu aplicarea cotelor pentru fiecare furnizor și per cont.

| Punct final                     | Metoda       | Descriere                                                    |
| ------------------------------- | ------------ | ------------------------------------------------------------ |
| `/api/v1/registered-keys`       | `POST`       | Emite o nouă cheie — cheia brută returnată**o singură dată** |
| `/api/v1/registered-keys`       | `GET`        | Listează cheile înregistrate (mascate)                       |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Obține metadate/Revocare                                     |
| `/api/v1/quotas/check`          | `GET`        | Prevalidați cota înainte de emitere                          |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Configurați limitele de emitere pentru fiecare furnizor      |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Configurați limitele de emitere per cont                     |
| `/api/v1/issues/report`         | `POST`       | Raportați evenimentele de cotă către GitHub Issues           |

**Securitate:**Cheile stocate ca hash-uri SHA-256. Cheia brută afișată o dată la creare, nu mai poate fi recuperată.#### 🎨 Provider Icons via @lobehub/icons (#529)

Peste 130 de sigle ale furnizorilor folosind componentele React (SVG) „@lobehub/icons”. Lanț de rezervă:**Lobehub SVG → PNG existent → pictogramă generică**. Aplicat în paginile de tablou de bord, furnizori și agenți cu componenta standardizată „ProviderIcon”.#### 🔄 Model Auto-Sync Scheduler (#488)

Actualizează automat listele de modele pentru furnizorii conectați la fiecare**24 de ore**. Se rulează la pornirea serverului. Configurabil prin `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Hartați modelele de nume de model (glob) la anumite combinații pentru rutarea automată:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nou tabel `model_combo_mappings` cu potrivire glob-to-regex
- Secțiunea UI din tabloul de bord: „Reguli de rutare a modelului” cu adăugare/editare/permutare/ștergere în linie#### 🧭 API Endpoints Dashboard

Catalog interactiv, gestionare webhooks, vizualizator OpenAPI — toate într-o singură pagină cu file la `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 noi integrări de furnizori de căutare:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— permițând răspunsuri bazate pe AI cu date web în timp real.#### 📊 Search Analytics

Filă nouă în „/dashboard/analytics” — defalcarea furnizorului, rata de accesare a memoriei cache, urmărirea costurilor. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Coloanele `max_requests_per_day` și `max_requests_per_minute` cu aplicarea ferestrei glisante în memorie care returnează HTTP 429.#### 🎵 Media Playground

Loc de joacă complet de generare media la `/dashboard/media`: generare de imagini, video, muzică, transcriere audio (limită de încărcare de 2 GB) și text-to-speech.---

### 🔒 Security & CI/CD

-**Remediere CodeQL**— S-au remediat peste 10 alerte: 6 redouri polinomiale, 1 aleator nesigur (`Math.random()` → `crypto.randomUUID()`), 1 shell-comandă-injectare -**Validare rută**— Scheme Zod + `validateBody()` pe**176/176 rute API**— CI impus -**CVE fix**— dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) resolved via npm overrides -**Aplatizat**— Bumped 3.3.3 → 3.4.2 (poluare prototip CWE-1321) -**Docker**— Actualizat `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: ștergeți eroarea acționabilă atunci când `GEMINI_OAUTH_CLIENT_SECRET` lipsește în Docker -**#549**— Rutele de setări CLI rezolvă acum cheia API reală din `keyId` (nu șirurile mascate) -**#574**— Conectarea nu se mai blochează după ce ați sărit peste configurarea parolei expertului -**#506**— `machineId` rescris pe mai multe platforme (Windows REG.exe → macOS ioreg → Linux → numele de gazdă alternativă)#### Providers & Routing

-**#536**— LongCat AI: `baseUrl` și `authHeader` -**#535**— Anularea modelului fixat: `body.model` setat corect la `pinnedModel` -**#570**— Modelele Claude fără prefix se rezolvă acum la furnizorul Anthropic -**#585**— Etichetele interne `<omniModel>` nu mai curg către clienți în fluxul SSE -**#493**— Numirea modelului personalizat de furnizor nu mai este alterată de eliminarea prefixului -**#490**— Streaming + protecție context cache prin injectarea `TransformStream` -**#511**— Eticheta `<omniModel>` injectată în prima bucată de conținut (nu după `[DONE]`)#### CLI & Tools

-**#527**— Cod Claude + buclă Codex: blocurile `tool_result` sunt acum convertite în text -**#524**— Configurația OpenCode a fost salvată corect (XDG_CONFIG_HOME, format TOML) -**#522**— Manager API: a eliminat butonul înșelător „Copiați cheia mascată”. -**#546**— `--version` returnează `necunoscut` pe Windows (PR de @k0valik) -**#544**— Detectare securizată a instrumentului CLI prin căi de instalare cunoscute (PR de @k0valik) -**#510**— Căile Windows MSYS2/Git-Bash normalizate automat -**#492**— CLI detectează nodul gestionat `mise`/`nvm` când lipsește `app/server.js`#### Streaming & SSE

-**PR #587**— Reveniți importul `resolveDataDir` în responsesTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Gâtul de strângere 429 așteptare infinită: renunțați joburile în așteptare la limita de rată (@xandr0s) -**#483**— Opriți `data: nul` după semnalul `[DONE]` -**#473**— Fluxuri Zombie SSE: timeout redus cu 300s → 120s pentru un back-up mai rapid#### Media & Transcription

-**Transcriere**— Deepgram `video/mp4` → `audio/mp4` Mapare MIME, detectare automată a limbii, punctuație -**TTS**— Afișarea erorii `[object Object]` a fost remediată pentru erorile imbricate în stilul ElevenLabs -**Limite de încărcare**— Transcrierea media a crescut la 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— coloana „requested_model” din jurnalele de apeluri (migrarea 009) -**T02**— Eliminați blocurile de text goale din `tool_result.content` imbricat -**T03**— Analizați anteturile cotei `x-codex-5h-*` / `x-codex-7d-*` -**T04**— antet `X-Session-Id` pentru rutare sticky externă -**T05**— Rate-limitează persistența DB cu API dedicat -**T06**— Cont dezactivat → blocare permanentă (reducere de 1 an) -**T07**— X-Forwarded-For validare IP (`extractClientIp()`) -**T08**— Limite de sesiune per-cheie API cu aplicarea ferestrei glisante -**T09**- limite de rată Codex vs Spark (grupuri separate) -**T10**— Credite epuizate → retragere distinctă de 1 oră -**T11**— efort de raționament `max` → 131072 jetoane bugetare -**T12**- intrări de prețuri MiniMax M2.7 -**T13**— Remediere de afișare a cotei învechite (resetarea conștientizării ferestrei) -**T14**— Verificare TCP cu eșuare rapidă proxy (≤2 s, 30 s în cache) -**T15**— Normalizarea conținutului matricei pentru Anthropic -**T23**— Resetare inteligentă a cotei de rezervă (extragere antet) -**T24**— `503` cooldown + mapare `406` -**T25**— Validarea furnizorului de rezervă -**T29**— Vertex AI Service Account JWT auth -**T33**— Conversie de la nivel de gândire la buget -**T36**— clasificarea erorii `403` vs `429` -**T38**— Specificații centralizate ale modelului (`modelSpecs.ts`) -**T39**— Backpoint final pentru `fetchAvailableModels` -**T41**— Sarcina de fundal redirecționează automat către modele flash -**T42**— Maparea raportului de aspect pentru generarea imaginii#### Other Improvements

-**Anteturi personalizate în amonte pentru fiecare model**— prin interfața de utilizare de configurare (PR #575 de la @zhangqiang8vip) -**Lungimea contextului modelului**— configurabilă în metadatele modelului (PR #578 de @hijak) -**Decapare prefixul modelului**- opțiunea de a elimina prefixul furnizorului din numele modelelor (PR #582 de la @jay77721) -**Gemini CLI depreciere**- marcat ca depreciat cu avertismentul de restricție OAuth Google -**YAML parser**- a înlocuit analizatorul personalizat cu `js-yaml` pentru analizarea corectă a specificațiilor OpenAPI -**ZWS v5**— Remediere scurgeri HMR (485 conexiuni DB → 1, memorie 2,4 GB → 195 MB) -**Export jurnal**— Buton nou de export JSON pe tabloul de bord cu meniu vertical pentru intervalul de timp -**Actualizați bannerul de notificare**— pagina de pornire a tabloului de bord arată când sunt disponibile versiuni noi---

### 🌐 i18n & Documentation

-**30 de limbi**la 100% paritate — 2.788 de chei lipsă sincronizate -**Cehă**— Traducere completă: 22 de documente, 2.606 șiruri UI (PR de la @zen0bit) -**Chineză (zh-CN)**— Retraducere completă (PR de @only4copilot) -**Ghid de implementare VM**— Tradus în engleză ca document sursă -**Referință API**— S-au adăugat punctele finale `/v1/embeddings` și `/v1/audio/speech` -**Număr de furnizori**— Actualizat de la 36+/40+/44+ la**67+**în README și în toate cele 30 de README i18n---

### 🔀 Community PRs Merged (10)

| PR       | Autor           | Rezumat                                                                            |
| -------- | --------------- | ---------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): inversează importul resolveDataDir pentru Cloudflare Workers compat      |
| **#582** | @jay77721       | feat(proxy): opțiunea de eliminare a prefixului numelui modelului                  |
| **#581** | @jay77721       | fix(npm): conectați eliberarea de electroni la fluxul de lucru npm-public          |
| **#578** | @hijak          | feat: lungimea contextului configurabil în metadatele modelului                    |
| **#575** | @zhangqiang8vip | feat: anteturi în amonte per model, PATCH compat, aliniere chat                    |
| **#562** | @coobabm        | remediere: managementul sesiunii MCP, trecerea Claude, detectFormat                |
| **#561** | @zen0bit        | fix(i18n): corecții de traducere în cehă                                           |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` centralizat pentru rezoluția căii                     |
| **#546** | @k0valik        | fix(cli): `--version` returnând `necunoscut` pe Windows                            |
| **#544** | @k0valik        | fix(cli): detectarea securizată a instrumentului CLI prin căile de instalare       |
| **#542** | @rdself         | fix(ui): contrastul modului de lumină variabile ale temei CSS                      |
| **#530** | @kang-heewon    | feat: furnizori OpenCode Zen + Go cu `OpencodeExecutor`                            |
| **#512** | @zhangqiang8vip | feat: compatibilitate model per-protocol (`compatByProtocol`)                      |
| **#497** | @zhangqiang8vip | remediere: scurgeri de resurse HMR în modul de dezvoltare (ZWS v5)                 |
| **#495** | @xandr0s        | remediere: gâtul de strângere 429 așteptare infinită (scăpare joburi de așteptare) |
| **#494** | @zhangqiang8vip | feat: MiniMax developer→system role fix                                            |
| **#480** | @prakersh       | remediere: extragerea utilizării fluxului de flux                                  |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 și intrări de prețuri antropice                                |
| **#475** | @only4copilot   | feat(i18n): traducere chineză îmbunătățită                                         |

**Mulțumim tuturor colaboratorilor!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490`` `#491` `#491` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#531` `#532` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 teste, 0 eșecuri**(față de 821 în v2.9.5)

- +105 de noi teste care acoperă: mapări model-combo, chei înregistrate, OpencodeExecutor, furnizor Bailian, validarea rutei, clasificarea erorilor, maparea raportului de aspect și multe altele---

### 📦 Database Migrations

| Migrație | Descriere                                                               |
| -------- | ----------------------------------------------------------------------- | --- |
| **008**  | Tabelele `chei_registered`, `provider_key_limits`, `account_key_limits` |
| **009**  | Coloana `requested_model` din `call_logs`                               |
| **010**  | Tabelul `model_combo_mappings` pentru rutarea combo per-model           | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Modificări de ultimă oră:**Niciuna. Toate configurațiile, combinațiile și cheile API existente sunt păstrate.
> Migrările bazei de date 008-010 rulează automat la pornire.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Remediere CodeQL**— S-au remediat peste 10 alerte:

- 6 redouri polinomiale în `provider.ts` / `chatCore.ts` (înlocuit modele de alternanță `(?:^|/)` cu potrivire bazată pe segment)
- 1 aleatorie nesigură în `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-comandă-injectare în `prepublish.mjs` (caile `JSON.stringify()` scapă) -**Validare rută**— S-au adăugat scheme Zod + `validateBody()` la 5 rute fără validare:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` trece acum:**176/176 rute validate**### 🐛 Bug Fixes

-**#585**— Etichetele interne `<omniModel>` nu mai curg către clienți în răspunsurile SSE. S-a adăugat igienizarea de ieșire `TransformStream` în `combo.ts`### ⚙️ Infrastructure

-**Docker**— `docker/setup-buildx-action` a fost actualizat de la v3 → v4 (remediere de depreciere a Node.js 20) -**Curățare CI**— S-au șters peste 150 de rulări de flux de lucru eșuate/anulate### 🧪 Tests

- Suită de teste:**926 de teste, 0 eșecuri**(+3 noi)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Limite de transcriere media crescute
- S-a adăugat lungimea contextului modelului la metadatele de registru
- S-au adăugat anteturi personalizate pentru fiecare model în amonte prin interfața de utilizare de configurare
- S-au remediat mai multe erori, validarea Zod pentru patch-uri și s-au rezolvat diverse probleme ale comunității.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Rutare combinată per model: hartă modele de nume de model (glob) la anumite combinații pentru rutare automată

- Tabel nou `model_combo_mappings` (migrarea 010) cu model, combo_id, prioritate, activat
- Funcția DB `resolveComboForModel()` cu potrivire glob-to-regex (care nu ține seama de majuscule și minuscule, metacaracterele `*` și `?`)
- `getComboForModel()` în `model.ts`: crește `getCombo()` cu alternativa model-pattern
- `chat.ts`: decizia de rutare verifică acum mapările model-combo înainte de gestionarea unui singur model
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Tabloul de bord: secțiunea „Reguli de rutare a modelului” a fost adăugată la pagina Combo cu adăugare/editare/permutare/ștergere în linie
- Exemple: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Sincronizare i18n completă**: 2.788 de chei lipsă adăugate în 30 de fișiere de limbă - toate limbile acum la paritate 100% cu `en.json` -**Pagina agenți i18n**: secțiunea de integrare OpenCode complet internaționalizată (titlu, descriere, scanare, descărcare etichete) -**6 chei noi**adăugate la spațiul de nume „agenți” pentru secțiunea OpenCode### 🎨 UI/UX

-**Pictograme furnizor**: 16 pictograme furnizor lipsă adăugate (3 copiate, 2 descărcate, 11 SVG create) -**SVG alternativă**: componenta `ProviderIcon` actualizată cu o strategie pe 4 niveluri: Lobehub → PNG → SVG → Pictogramă generică -**Amprentarea agenților**: Sincronizat cu instrumentele CLI - a adăugat droid, openclaw, copilot, opencode la lista de amprente (14 în total)### Securitate

-**Remediere CVE**: S-a rezolvat vulnerabilitatea dompurify XSS (GHSA-v2wj-7wpq-c8vv) prin suprascrie npm, forțarea `dompurify@^3.3.2`

- `npm audit` raportează acum**0 vulnerabilități**### 🧪 Tests

- Suită de teste:**923 de teste, 0 eșecuri**(+15 teste noi de mapare combo-model)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Rezumat                                                                                         |
| -------- | -------- | ----------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): managementul sesiunii MCP, normalizarea trecerii Claude, modal OAuth, detectFormat     |
| **#561** | @zen0bit | fix(i18n): corecții de traducere în cehă — nume de metode HTTP și actualizări ale documentației | ### 🧪 Tests |

- Suită de teste:**908 teste, 0 eșecuri**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**rezolvă cheia API reală din `keyId` în rutele de setări CLI (`codex-settings`, `droid-settings`, `kilo-settings`) pentru a preveni scrierea șirurilor mascate (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Rezumat                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` returnează `necunoscut` pe Windows — utilizați `JSON.parse(readFileSync)` în loc de importul ESM                                                                                                                |
| **#555** | @k0valik | fix(sse): `resolveDataDir()` centralizat pentru rezoluția căilor în acreditări, autoCombo, înregistrare răspunsuri și înregistrare cereri                                                                                             |
| **#544** | @k0valik | fix(cli): detectarea securizată a instrumentului CLI prin căi de instalare cunoscute (8 instrumente) cu validare a linkurilor simbolice, verificări ale tipului de fișier, limite de dimensiune, mediu minim în verificarea sănătății |
| **#542** | @rdself  | fix(ui): îmbunătățiți contrastul modului de lumină — adăugați variabilele de temă CSS lipsă (`bg-primary`, `bg-subtle`, `text-primary`) și remediați culorile închise doar în detaliile jurnalului                                    | ### 🔧 Bug Fixes |

-**Remedierea TDZ în `cliRuntime.ts`**— `validateEnvPath` a fost folosit înainte de inițializare la pornirea modulului de către `getExpectedParentPaths()`. Declarații reordonate pentru a remedia „ReferenceError”. -**Remedieri de compilare**— S-au adăugat `pino` și `pino-pretty` la `serverExternalPackages` pentru a preveni Turbopack să întrerupă încărcarea lucrătorului intern a lui Pino.### 🧪 Tests

- Suită de teste:**905 teste, 0 eșecuri**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresia construcției Electron: a retrogradat Next.js de la `16.1.x` la `16.0.10` pentru a elimina instabilitatea hashing-ului modulului Turbopack care a cauzat ecrane goale în pachetul de desktop Electron. -**Remedieri ale testelor unitare**— S-au corectat două afirmații de testare învechite (raport/rezoluție `nanobanana-image-handler`, maparea câmpului `thinking-budget` Gemini `thinkingConfig`) care s-au deplasat după modificările recente de implementare. -**#541**— A răspuns la feedback-ul utilizatorilor despre complexitatea instalării; nu sunt necesare modificări de cod.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementat folosind biblioteca `jose` pentru a gestiona autentificarea JWT/Cont de serviciu, împreună cu regiuni configurabile în interfața de utilizare și crearea automată a adresei URL a modelului partenerului. -**T42**— Maparea raportului de aspect pentru generarea imaginii: a creat logica `sizeMapper` pentru formatele generice OpenAI (`dimensiune`), a adăugat gestionarea nativă `imagen3` și a actualizat punctele finale NanoBanana pentru a utiliza automat raporturile de aspect mapate. -**T38**— Specificații centralizate ale modelului: `modelSpecs.ts` creat pentru limite și parametri per model.### 🔧 Improvements

-**T40**— Integrarea instrumentelor OpenCode CLI: integrarea nativă `opencode-zen` și `opencode-go` finalizată în PR anterior.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown await fix + `406` mapare: mapat `406 Not Acceptable` la `503 Service Unavailable` cu intervale de răcire adecvate. -**T25**— Validarea furnizorului de rezervă: alternativă grațioasă la modelele standard de validare atunci când nu este prezent un anumit „validationModelId”. -**T36**— `403` vs `429` rafinament de gestionare a furnizorului: extras în `errorClassifier.ts` pentru a segrega corect eșecurile de permisiuni hard (`403`) de limitele ratei (`429`). -**T39**— Endpoint Fallback pentru `fetchAvailableModels`: implementat un mecanism tri-tier (`/models` -> `/v1/models` -> catalog generic local) + `list_models_catalog` actualizările instrumentului MCP pentru a reflecta `sursa` și `avertisment`. -**T33**— Conversia nivel de gândire la buget: traduce nivelurile de gândire calitative în alocări bugetare precise. -**T41**— Redirecționare automată a activității de fundal: direcționează automat sarcinile grele de evaluare de fundal către modele flash/eficiente. -**T23**— Resetare inteligentă a cotei de rezervă: extrage cu precizie valorile antetului `x-ratelimit-reset` / `retry-after` sau mapează perioadele de răcire statice.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade de la v2.9.5:**16 probleme rezolvate · 2 PR-uri comunitare fuzionate · 2 furnizori noi · 7 noi puncte finale API · 3 funcții noi · Migrare DB 008+009 · 832 de teste trecute · 15 îmbunătățiri sub2api gap (T01–T15 complet).### 🆕 New Providers

| Furnizor         | Alias ​​       | Nivelul | Note                                                            |
| ---------------- | -------------- | ------- | --------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratuit | 3 modele prin `opencode.ai/zen/v1` (PR #530 de @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Plătit  | 4 modele prin `opencode.ai/zen/go/v1` (PR #530 de @kang-heewon) |

Ambii furnizori folosesc noul `OpencodeExecutor` cu rutare multi-format (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Generați automat și emiteți cheile API OmniRoute în mod programatic, cu aplicarea cotelor pentru fiecare furnizor și per cont.

| Punct final                           | Metoda     | Descriere                                                    |
| ------------------------------------- | ---------- | ------------------------------------------------------------ |
| `/api/v1/registered-keys`             | `POST`     | Emite o nouă cheie — cheia brută returnată**o singură dată** |
| `/api/v1/registered-keys`             | `GET`      | Listează cheile înregistrate (mascate)                       |
| `/api/v1/registered-keys/{id}`        | `GET`      | Obține metadatele cheie                                      |
| `/api/v1/registered-keys/{id}`        | `ȘTERGERE` | Revocați o cheie                                             |
| `/api/v1/registered-keys/{id}/revoke` | `POST`     | Revocare (pentru clienții fără suport DELETE)                |
| `/api/v1/quotas/check`                | `GET`      | Prevalidați cota înainte de emitere                          |
| `/api/v1/providers/{id}/limits`       | `GET/PUT`  | Configurați limitele de emitere pentru fiecare furnizor      |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT`  | Configurați limitele de emitere per cont                     |
| `/api/v1/issues/report`               | `POST`     | Raportați evenimentele de cotă către GitHub Issues           |

**DB — Migrare 008:**Trei tabele noi: `chei_registered`, `provider_key_limits`, `account_key_limits`.
**Securitate:**Cheile stocate ca hash-uri SHA-256. Cheia brută afișată o dată la creare, nu mai poate fi recuperată.
**Tipuri de cote:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per furnizor și per cont.
**Idempotency:**câmpul `idempotency_key` previne emiterea duplicat. Returnează `409 IDEMPOTENCY_CONFLICT` dacă cheia a fost deja folosită.
**Buget per cheie:**`dailyBudget` / `hourlyBudget` — limitează numărul de solicitări pe care o cheie poate direcționa pe fereastră.
**Raportare GitHub:**Opțional. Setați `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` pentru a crea automat probleme GitHub în cazul depășirii cotei sau a eșecurilor de emitere.#### 🎨 Provider Icons — @lobehub/icons (#529)

Toate pictogramele furnizorului din tabloul de bord folosesc acum componentele React „@lobehub/icons” (130+ furnizori cu SVG).
Lanț de rezervă:**Lobehub SVG → existent `/providers/{id}.png` → pictogramă generică**. Utilizează un model React `ErrorBoundary` adecvat.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute reîmprospătează acum automat listele de modele pentru furnizorii conectați la fiecare**24 de ore**.

- Se rulează la pornirea serverului prin intermediul cârligului existent `/api/sync/initialize`
- Configurabil prin variabila de mediu `MODEL_SYNC_INTERVAL_HOURS`
- Acoperă 16 furnizori majori
- Înregistrează ultima sincronizare în baza de date de setări---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Ștergeți eroarea acționabilă atunci când `GEMINI_OAUTH_CLIENT_SECRET` lipsește în implementările Docker/auto-găzduite. A arătat anterior „client_secret lipsește” de la Google. Acum oferă instrucțiuni specifice `docker-compose.yml` și `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**S-au remediat `baseUrl` (`api.longcat.chat/openai`) și `authHeader` (`Authorization: Bearer`). -**#535 — Suprascrierea modelului fixat:**`body.model` este acum setat corect la `pinnedModel` când protecția context-cache este activă. -**#532 — Validarea cheii OpenCode Go:**Acum utilizează punctul final de testare `zen/v1` (`testKeyBaseUrl`) — aceeași cheie funcționează pentru ambele niveluri.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**Blocurile `tool_result` sunt acum convertite în text în loc să fie aruncate, oprind bucle infinite de rezultat instrument. -**#524 — Salvare config OpenCode:**Adăugat handler `saveOpenCodeConfig()` (conștient XDG_CONFIG_HOME, scrie TOML). -**#521 — Conectarea blocată:**Autentificarea nu se mai blochează după omiterea configurării parolei — redirecționează corect la integrare. -**#522 — Manager API:**a fost eliminat butonul înșelător „Copiați cheia mascată” (înlocuit cu o pictogramă de lacăt. -**#532 — OpenCode Go config:**Managerul de setări ale ghidului gestionează acum ID-ul instrumentului `opencode`.#### Developer Experience

-**#489 — Antigravity:**lipsa `googleProjectId` returnează o eroare 422 structurată cu îndrumări de reconectare în loc de o blocare criptică. -**#510 — Căi Windows:**Căile MSYS2/Git-Bash (`/c/Program Files/...`) sunt acum normalizate automat la `C:\Program Files\...`. -**#492 — Pornire CLI:**`omniroute` CLI detectează acum nodul gestionat `mise`/`nvm` atunci când `app/server.js` lipsește și arată instrucțiuni de remediere vizate.---

### 📖 Documentation Updates

-**#513**— Resetarea parolei Docker: `INITIAL_PASSWORD` env var soluție documentată -**#520**— pnpm: pasul `pnpm approve-builds better-sqlite3` documentat---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#535` `#535`---

### 🔀 Community PRs Merged

| PR       | Autor        | Rezumat                                                                  |
| -------- | ------------ | ------------------------------------------------------------------------ | --- |
| **#530** | @kang-heewon | Furnizorii OpenCode Zen + Go cu `OpencodeExecutor` și teste îmbunătățite | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistența DB cu limită de rată: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` în `providers.ts`. Coloana existentă „rate_limited_until” este acum expusă ca un API dedicat — reîmprospătarea jetonului OAuth NU trebuie să atingă acest câmp pentru a preveni buclele de limitare a ratei. -**T08**— Limită de sesiune pentru fiecare cheie API: `max_sessions INTEGER DEFAULT 0` adăugat la `api_keys` prin migrare automată. `sessionManager.ts` câștigă `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` și `getActiveSessionCountForKey()`. Apelanții din `chatCore.js` pot aplica limita și scăderea pe `req.close`. -**T09**— limite de rată Codex vs Spark: `getCodexModelScope()` și `getCodexRateLimitKey()` în `codex.ts`. Modelele standard (`gpt-5.x-codex`, `codex-mini`) primesc domeniul de aplicare `"codex"`; modele spark (`codex-spark*`) obține domeniul de aplicare `"spark"`. Cheile pentru limita de rată ar trebui să fie `${accountId}:${scope}`, astfel încât epuizarea unui pool nu îl blochează pe celălalt. -**T13**— Remediere de afișare a cotei învechite: `getEffectiveQuotaUsage(used, resetAt)` returnează `0` când fereastra de resetare a trecut; `formatResetCountdown(resetAt)` returnează un șir de numărătoare inversă care poate fi citită de om (de exemplu, `"2h 35m"`). Ambele exportate din `providers.ts` + `localDb.ts` pentru consumul tabloului de bord. -**T14**— Proxy fast-fail: nou `src/lib/proxyHealth.ts` cu `isProxyReachable(proxyUrl, timeoutMs=2000)` (verificare TCP, ≤2s în loc de 30s timeout), `getCachedProxyHealth()`, `invalidate()`, și `invalidate `getAllProxyHealthStatuses()`. Rezultatele stocate în cache la 30 de secunde în mod implicit; configurabil prin `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Suită de teste:**832 teste, 0 eșecuri**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— coloana `requested_model` din `call_logs` (migrarea 009): urmăriți modelul solicitat inițial de client față de modelul real rutat. Permite analiza ratei de rezervă. -**T02**— Eliminați blocurile de text goale din `tool_result.content` imbricat: previne erorile Anthropic 400 (`blocurile de conținut text trebuie să nu fie goale`) când rezultă instrumentul Claude Code. -**T03**— Analizați anteturile `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extrage ferestrele de cotă Codex pentru o programare precisă a timpului de răcire în loc de alternativă generică de 5 minute. -**T04**— Antet `X-Session-Id` pentru rutare sticky externă: `extractExternalSessionId()` în `sessionManager.ts` citește anteturile `x-session-id` / `x-omniroute-session` cu prefixul `ext:` sesiune ID-ul intern pentru a evita coliziunea SHA-256. Compatibil cu Nginx (antet cu cratime). -**T06**— Cont dezactivat → blocare permanentă: `isAccountDeactivated()` în `accountFallback.ts` detectează 401 semnale de dezactivare și aplică o perioadă de răcire de 1 an pentru a preveni reîncercarea conturilor nefuncționale definitive. -**T07**— Validare IP X-Forwarded-For: nou `src/lib/ipUtils.ts` cu `extractClientIp()` și `getClientIpFromRequest()` — omite intrările `necunoscute`/non-IP în lanțurile `X-Forwarded-For` (Nginx/proxy-forwarded). -**T10**— Credite epuizate → alternativă distinctă: `isCreditsExhausted()` în `accountFallback.ts` returnează 1 oră de răcire cu indicatorul `creditsExhausted`, diferit de limitarea ratei generice 429. -**T11**— efort de raționament `max` → 131072 jetoane buget: `EFFORT_BUDGETS` și `THINKING_LEVEL_MAP` actualizate; maparea inversă returnează acum `"max"` pentru răspunsurile cu bugetul complet. Testul unitar a fost actualizat. -**T12**— S-au adăugat intrări de prețuri MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` adăugate la tabelul de prețuri (sub2api PR #1120). Prețurile M2.5/GLM-4.7/GLM-5/Kimi existau deja. -**T15**— Normalizarea conținutului matricei: asistentul `normalizeContentToString()` în `openai-to-claude.ts` restrânge corect mesajele de sistem/instrument formate în matrice în șir înainte de a le trimite către Anthropic.### 🧪 Tests

- Suită de teste:**832 de teste, 0 eșecuri**(neschimbat față de rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registered Keys Provisioning API: emite automat chei API cu aplicarea cotelor pentru fiecare furnizor și per cont

- `POST /api/v1/registered-keys` — emite chei cu suport pentru idempotenta
- `GET /api/v1/registered-keys` — listează cheile înregistrate (mascate)
- `GET /api/v1/registered-keys/{id}` — obține metadatele cheii
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revocă cheile
- `GET /api/v1/quotas/check` — prevalidați înainte de emitere
- `PUT /api/v1/providers/{id}/limits` — setați limitele de emitere a furnizorului
- `PUT /api/v1/accounts/{id}/limits` — setați limitele de emitere a contului
- `POST /api/v1/issues/report` — raportare opțională a problemelor GitHub
- Migrare DB 008: tabele `chei_registered`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Furnizorii OpenCode Zen și OpenCode Go au fost adăugați (de @kang-heewon)

- Noul `OpencodeExecutor` cu rutare multi-format (`/chat/completions`, `/messages`, `/responses`)
- 7 modele pe ambele niveluri---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Pictogramele furnizorului folosesc acum [@lobehub/icons](https://github.com/lobehub/lobe-icons) cu un backup elegant PNG și o componentă `ProviderIcon` (suportați peste 130 de furnizori) -**#488**— Actualizează automat listele de modele la fiecare 24 de ore prin `modelSyncScheduler` (configurabil prin `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: acum afișează o eroare clară acționabilă atunci când `GEMINI_OAUTH_CLIENT_SECRET` lipsește în implementările Docker/auto-găzduite---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Validarea cheii LongCat AI: baseUrl fix (`api.longcat.chat/openai`) și authHeader (`Authorization: Bearer`) -**#535**— Suprascrierea modelului fixat: `body.model` este acum setat la `pinnedModel` atunci când protecția context-cache detectează un model fixat -**#524**— Configurația OpenCode acum salvată corect: a adăugat handler `saveOpenCodeConfig()` (conștient XDG_CONFIG_HOME, scrie TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Autentificarea nu se mai blochează după ce ați sărit peste configurarea parolei (redirecționează la onboarding) -**#522**— Manager API: a fost eliminat butonul care induce în eroare „Copiați cheia mascată” (înlocuit cu indicativul pentru pictograma de lacăt) -**#527**— buclă Claude Code + Codex superputeri: blocurile `tool_result` sunt acum convertite în text în loc să fie eliminate -**#532**— Validarea cheii API OpenCode GO utilizează acum punctul final corect `zen/v1` (`testKeyBaseUrl`) -**#489**— Antigravitație: lipsa `googleProjectId` returnează o eroare 422 structurată cu instrucțiuni de reconectare -**#510**— Windows: căile MSYS2/Git-Bash (`/c/Program Files/...`) sunt acum normalizate la `C:\Program Files\...` -**#492**— CLI `omniroute` detectează acum `mise`/`nvm` atunci când `app/server.js` lipsește și arată remedierea vizată### Documentație

-**#513**— Resetarea parolei Docker: `INITIAL_PASSWORD` env var soluție documentată -**#520**— pnpm: `pnpm approve-builds better-sqlite3` documentat### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: noi furnizori OpenCode, remediere pentru încorporarea acreditărilor, eroare cheie mascata CLI, remediere CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Instrumentele CLI salvează cheia API mascată în fișierele de configurare**— `claude-settings`, `cline-settings` și `openclaw-settings` Rutele POST acceptă acum un parametru `keyId` și rezolvă cheia API reală din DB înainte de a scrie pe disc. `ClaudeToolCard` a fost actualizat pentru a trimite `keyId` în loc de șirul de afișare mascat. Remedieri #523, #526. -**Furnizori de încorporare personalizați: eroare `Fără acreditări`**— `/v1/embeddings` urmărește acum `credentialsProviderId` separat de prefixul de rutare, astfel încât acreditările sunt preluate din ID-ul nodului furnizorului care se potrivește, mai degrabă decât din șirul de prefix public. Remediază o regresie în care `google/gemini-embedding-001` și modele similare de furnizor personalizat ar eșua întotdeauna cu o eroare de acreditări. Remedieri legate de #532. (PR #528 de la @jacob2826) -**Protecția cache de context regex ratează `
` prefix**— `CACHE_TAG_PATTERN` din `comboAgentMiddleware.ts` a fost actualizat pentru a se potrivi cu ambele literale `
` (backslash-n) și noua linie U+000A pe care fluxul `combo.ts` o injectează în jurul etichetei `<omniModel>` după remedierea #515. Remedieri #531.### ✨ New Providers

-**OpenCode Zen**— Gateway gratuit la `opencode.ai/zen/v1` cu 3 modele: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Serviciu de abonament la `opencode.ai/zen/go/v1` cu 4 modele: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (format Claude), `minimax-m2.5` (formatul Claude)

- Ambii furnizori folosesc noul `OpencodeExecutor` care se direcționează dinamic către `/chat/completions`, `/messages`, `/responses` sau `/models/{model}:generateContent` pe baza modelului solicitat. (PR #530 de @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Remedieri de erori — păstrați cheia cache a promptului Codex, remediați evadarea tagContent JSON, sincronizați starea token-ului expirat cu DB.### 🐛 Bug Fixes

-**fix(translator)**: Păstrați `prompt_cache_key` în API-ul răspunsuri → traducerea finalizărilor chat (#517)
— Câmpul este un semnal de afinitate cache utilizat de Codex; eliminarea acestuia a prevenit accesările prompte în cache.
Remediat în `openai-responses.ts` și `responsesApiHelper.ts`.

-**fix(combo)**: Escape `
` în `tagContent`, deci șirul JSON injectat este valid (#515)
— Liniile noi literale ale șablonului (U+000A) nu sunt permise fără escape în interiorul valorilor șirurilor JSON.
Înlocuit cu secvențe literale `\n` în `open-sse/services/combo.ts`.

-**remediere (utilizare)**: Sincronizați starea jetonului expirat înapoi la DB în cazul eșecului de autentificare live (#491)
— Când verificarea live Limits & Quotes returnează 401/403, conexiunea `testStatus` este acum actualizată
la `"expired"` în baza de date, astfel încât pagina Furnizorilor să reflecte aceeași stare degradată.
Remediat în `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Adăugați 5 noi furnizori gratuiti de AI - LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Adăugați LongCat AI (`lc/`) — 50M de jetoane/zi gratuit (Flash-Lite) + 500K/zi (Chat/Thinking) în timpul beta publică. Compatibil cu OpenAI, autorizare standard Bearer. -**feat(providers/pollinations)**: Adaugă Pollinations AI (`pol/`) — nu este necesară cheia API. Proxy GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 solicitat/15 secunde gratuit). Executorul personalizat gestionează autentificarea opțională. -**feat(providers/cloudflare-ai)**: Adăugați Cloudflare Workers AI (`cf/`) — 10.000 de neuroni/zi gratuit (~150 de răspunsuri LLM sau 500 de secunde audio Whisper). Peste 50 de modele la nivel global. Executorul personalizat creează o adresă URL dinamică cu „accountId” din acreditări. -**feat(providers/scaleway)**: Adăugați API-uri Scaleway Generative (`scw/`) — 1 milion de jetoane gratuite pentru conturi noi. Conform UE/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Adăugați AI/ML API (`aiml/`) — 0,025 USD/zi credit gratuit, peste 200 de modele (GPT-4o, Claude, Gemini, Llama) printr-un singur punct final de agregare.### 🔄 Provider Updates

-**feat(furnizori/împreună)**: Adăugați `hasFree: true` + 3 ID-uri de model gratuite permanent: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Free`-70B- -**feat(providers/gemini)**: Adăugați `hasFree: true` + `freeNote` (1.500 de solicitări/zi, nu este nevoie de card de credit, aistudio.google.com) -**chore(furnizori/gemeni)**: Redenumiți numele afișat în „Gemeni (Google AI Studio)” pentru claritate### ⚙️ Infrastructure

-**feat(executors/pollinations)**: nou `PollinationsExecutor` — omite antetul `Authorization` atunci când nu este furnizată nicio cheie API -**feat(executors/cloudflare-ai)**: nou `CloudflareAIExecutor` — construcția dinamică a URL-ului necesită `accountId` în acreditările furnizorului -**feat(executors)**: Înregistrați `pollinations`, `pol`, `cloudflare-ai`, `cf` executor mappings### Documentație

-**docs(readme)**: stiva combo gratuită extinsă la 11 furnizori (0 USD pentru totdeauna) -**docs(readme)**: S-au adăugat 4 noi secțiuni gratuite pentru furnizori (LongCat, Pollinations, Cloudflare AI, Scaleway) cu tabele model -**docs(readme)**: tabel de prețuri actualizat cu 4 rânduri noi gratuite -**docs(i18n/pt-BR)**: Tabel de prețuri actualizat + secțiuni LongCat/Pollinations/Cloudflare AI/Scaleway adăugate în portugheză -**docs(new-features/ai)**: 10 fișiere cu specificațiile sarcinii + plan principal de implementare în `docs/new-features/ai/`### 🧪 Tests

- Suită de teste:**821 de teste, 0 eșecuri**(neschimbat)---

## [2.9.2] — 2026-03-21

> Sprint: Remediați transcrierea media (Deepgram/HuggingFace Content-Type, detectarea limbii) și afișarea erorilor TTS.### 🐛 Bug Fixes

-**fix(transcriere)**: transcrierea audio Deepgram și HuggingFace mapează acum corect `video/mp4` → `audio/mp4` și alte tipuri MIME media prin intermediul noului ajutor `resolveAudioContentType()`. Anterior, încărcarea fișierelor „.mp4” a returnat în mod constant „Nu a fost detectată vorbire”, deoarece Deepgram primea „Tip de conținut: video/mp4”. -**fix(transcriere)**: s-a adăugat `detect_language=true` la solicitările Deepgram — detectează automat limba audio (portugheză, spaniolă etc.) în loc să fie implicită în engleză. Remediază transcrierile care nu sunt în limba engleză care returnează rezultate goale sau deșeuri. -**fix(transcriere)**: s-a adăugat `punctuate=true` la solicitările Deepgram pentru rezultate de transcriere de calitate superioară cu punctuația corectă. -**fix(tts)**: `[object Object]` error display in Text-to-Speech responses fixed in both `audioSpeech.ts` and `audioTranscription.ts`. Funcția `upstreamErrorResponse()` extrage acum corect mesajele șir imbricate de la furnizori precum ElevenLabs care returnează `{ error: { message: "...", status_code: 401 } }` în loc de un șir de eroare plat.### 🧪 Tests

- Suită de teste:**821 de teste, 0 eșecuri**(neschimbat)### Triaged Issues

-**#508**— Regresia formatului apelului instrumentului: jurnalele proxy solicitate și informații despre lanțul furnizorului (`needs-info`) -**#510**— Calea de verificare a stării CLI Windows: informații despre versiunea shell/nod solicitate (`needs-info`) -**#485**— Apeluri instrument Kiro MCP: închis ca problemă externă Kiro (nu OmniRoute) -**#442**— Punct final Baseten /models: închis (soluție manuală documentată) -**#464**— API de furnizare a cheilor: recunoscut ca element de foaie de parcurs---

## [2.9.1] — 2026-03-21

> Sprint: Remediați pierderea de date SSE omniModel, îmbinați compatibilitatea modelului pe protocol.### Bug Fixes

-**#511**— Critic: eticheta `<omniModel>` a fost trimisă după `finish_reason:stop` în fluxurile SSE, provocând pierderi de date. Eticheta este acum injectată în prima bucată de conținut negoală, garantând livrarea înainte ca SDK-urile să închidă conexiunea.### Merged PRs

-**PR #512**(@zhangqiang8vip): Compatibilitatea modelului per-protocol — `normalizeToolCallId` și `preserveOpenAIDeveloperRole` pot fi acum configurate pe protocolul client (OpenAI, Claude, API de răspunsuri). Câmp nou `compatByProtocol` în configurația modelului cu validare Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: informații PATH/versiune solicitate -**#509**— Regresia Turbopack Electron: eroare Next.js în amonte, soluții documentate -**#508**— ecran negru macOS: soluție sugerată pentru `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: remedierea ID-ului mașinii pe mai multe platforme, limite de rată pentru fiecare cheie API, cache context de streaming, Alibaba DashScope, analiză de căutare, ZWS v5 și 8 probleme închise.### ✨ New Features

-**feat(search)**: fila Search Analytics în `/dashboard/analytics` — defalcarea furnizorului, rata de accesare a memoriei cache, urmărirea costurilor. API nou: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(furnizor)**: Alibaba Cloud DashScope adăugat cu validare personalizată a căii la punctul final - `chatPath` și `modelsPath` configurabile pentru fiecare nod (#feat/custom-endpoint-paths) -**feat(api)**: limite de număr de solicitări pe cheie API - coloane `max_requests_per_day` și `max_requests_per_minute` cu aplicarea ferestrei glisante în memorie care returnează HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Remediere scurgeri HMR (485 conexiuni DB → 1), memorie 2,4 GB → 195 MB, singletonuri `globalThis`, remediere de avertizare Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: `machineId` pe mai multe platforme — `getMachineIdRaw()` rescris cu try/catch waterfall (Windows REG.exe → macOS ioreg → citire fișier Linux → nume gazdă → `os.hostname()`). Elimină ramificarea „process.platform” în care Next.js bundler a eliminat codul mort, remedierea „head” nu este recunoscut” pe Windows. Se remediază și #466. -**fix(#493)**: Denumirea personalizată a modelului furnizorului — a eliminat eliminarea incorectă a prefixelor în `DefaultExecutor.transformRequest()`, care a alterat ID-urile modelului din domeniul organizației, cum ar fi `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + protecție context cache — `TransformStream` interceptează SSE pentru a injecta eticheta `<omniModel>` înainte de marcatorul `[DONE]`, permițând protecția contextului cache pentru răspunsurile în flux. -**fix(#458)**: Validarea schemei combinate — `system_message`, `tool_filter_regex`, `context_cache_protection` trec acum validarea Zod la salvare. -**fix(#487)**: curățarea cardului KIRO MITM — a fost eliminat ZWS_README, `AntigravityToolCard` generat pentru a utiliza metadatele dinamice ale instrumentului.### 🧪 Tests

- Adăugate teste unitare de filtrare a instrumentelor în format antropic (PR #397) — 8 teste de regresie pentru „tool.name” fără învelișul „.function”
- Suită de teste:**821 de teste, 0 eșecuri**(de la 813)### 📋 Issues Closed (8)

-**#506**— ID-ul mașinii Windows `head` nu este recunoscut (remediat) -**#493**— Denumirea modelului de furnizor personalizat (remediată) -**#490**— Cache de context pentru redare în flux (remediat) -**#452**— Limite de solicitare per-cheie API (implementate) -**#466**— Eroare de conectare la Windows (aceeași cauză rădăcină ca #506) -**#504**— MITM inactiv (comportament așteptat) -**#462**— Gemini CLI PSA (rezolvat) -**#434**— Prăbușire aplicației Electron (duplicat de #402)## [2.8.9] — 2026-03-20

> Sprint: Îmbinați PR-urile comunității, reparați cardul KIRO MITM, actualizările de dependențe.### Merged PRs

-**PR #498**(@Sajid11194): Remediați blocarea ID-ului mașinii Windows (`undefined\REG.exe`). Înlocuiește `node-machine-id` cu interogări native din registrul sistemului de operare.**Se închide #486.** -**PR #497**(@zhangqiang8vip): Remediați scurgerile de resurse HMR în modul de dezvoltare — 485 de conexiuni DB scurse → 1, memorie 2,4 GB → 195 MB. `globalThis` singletons, remediere de avertizare Edge Runtime, stabilitate de testare Windows. (+1168/-338 în 22 de fișiere) -**PRs #499-503**(Dependabot): Actualizări GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker@4`logine-action@4/.### Bug Fixes

-**#505**— Cardul KIRO MITM afișează acum instrucțiuni specifice instrumentului (`api.anthropic.com`) în loc de text specific pentru antigravitație. -**#504**— A răspuns cu clarificare UX (MITM „Inactiv” este un comportament așteptat atunci când proxy-ul nu rulează).---

## [2.8.8] — 2026-03-20

> Sprint: remediați blocarea testului în lot OAuth, adăugați butonul „Testați toate” la paginile individuale ale furnizorului.### Bug Fixes

-**Cercare test OAuth batch**(ERR_CONNECTION_REFUSED): bucla for secvențială înlocuită cu limită de concurență de 5 conexiuni + 30s de timp expirat per conexiune prin `Promise.race()` + `Promise.allSettled()`. Previne blocarea serverului la testarea unor grupuri mari de furnizori OAuth (~30+ conexiuni).### Funcționalități

-**Butonul „Testează toate” pe paginile furnizorului**: paginile individuale ale furnizorului (de exemplu, `/providers/codex`) afișează acum un buton „Testează toate” în antetul Conexiuni când există peste 2 conexiuni. Utilizează `POST /api/providers/test-batch` cu `{mode: "provider", providerId}`. Rezultatele afișate într-un mod modal cu rezumat de promovare/eșec și diagnosticare per conexiune.---

## [2.8.7] — 2026-03-20

> Sprint: Merge PR #495 (scădere în gâtul 429), corectare #496 (furnizori de încorporare personalizați), funcții de triaj.### Bug Fixes

-**Bottleneck 429 infinite wait**(PR #495 de @xandr0s): Pe 429, `limiter.stop({ dropWaitingJobs: true })` nu reușește imediat toate cererile din coadă, astfel încât apelanții din amonte pot declanșa fallback. Limitatorul este șters din Map, astfel încât următoarea solicitare creează o instanță nouă. -**Modele de încorporare personalizate nerezolvabile**(#496): `POST /v1/embeddings` rezolvă acum modelele de încorporare personalizate de la TOATE nodurile_furnizorului (nu doar localhost). Activează modele precum `google/gemini-embedding-001` adăugate prin tabloul de bord.### Issues Responded

-**#452**— Limite de număr de solicitări pe cheie API (recunoscută, pe foaia de parcurs) -**#464**— Emite automat chei API cu limite de furnizor/cont (necesită mai multe detalii) -**#488**— Actualizare automată a listelor de modele (recunoscută, pe foaia de parcurs) -**#496**— Rezoluție personalizată a furnizorului de încorporare (fixată)---

## [2.8.6] — 2026-03-20

> Sprint: Merge PR #494 (remediere rol MiniMax), remediați tabloul de bord KIRO MITM, triaj 8 probleme.### Funcționalități

-**MiniMax developer→system role fix**(PR #494 de la @zhangqiang8vip): comuta `preserveDeveloperRole` per model. Adaugă interfața de utilizare „Compatibilitate” în pagina furnizorilor. Remediază 422 „eroare de parametri de rol” pentru MiniMax și gateway-uri similare. -**roleNormalizer**: `normalizeDeveloperRole()` acceptă acum parametrul `preserveDeveloperRole` cu comportament în trei stări (undefined=keep, true=keep, false=convert). -**DB**: `getModelPreserveOpenAIDeveloperRole()` și `mergeModelCompatOverride()` noi în `models.ts`.### Bug Fixes

-**Tabloul de bord KIRO MITM**(#481/#487): `CLIToolsPageClient` direcționează acum orice instrument `configType: "mitm"` către `AntigravityToolCard` (comenzi MITM Start/Stop). Anterior, doar Antigravity a fost codificat. -**AntigravityToolCard generic**: folosește `tool.image`, `tool.description`, `tool.id` în loc de valorile Antigravity codificate. Protejează împotriva lipsei „defaultModels”.### Cleanup

- Eliminat `ZWS_README_V2.md` (documente doar pentru dezvoltare din PR #494).### Issues Triaged (8)

-**#487**— Închis (KIRO MITM remediat în această versiune) -**#486**— necesită informații (problema Windows REG.exe PATH) -**#489**— informații despre nevoi (antigravity projectId lipsește, este necesară reconectarea OAuth) -**#492**— informații despre nevoi (lipsește aplicația/server.js pe nodul gestionat greșit) -**#490**— Confirmat (streaming + blocare context cache, remediere planificată) -**#491**— Confirmat (incoerența stării de autorizare Codex) -**#493**— Confirmat (prefixul numelui modelului furnizorului de modal, soluția de soluție furnizată) -**#488**— Întârziere de solicitare de funcții (actualizare automată a listelor de modele)---

## [2.8.5] — 2026-03-19

> Sprint: Remediați fluxurile SSE zombie, cacheul contextului la prima tură, KIRO MITM și problemele externe de triaj 5.### Bug Fixes

-**Zombie SSE Streams**(nr. 473): reduceți `STREAM_IDLE_TIMEOUT_MS` de la 300s → 120s pentru o alternativă combinată mai rapidă atunci când furnizorii se blochează la mijlocul fluxului. Configurabil prin env var. -**Context Cache Tag**(#474): Remediați `injectModelTag()` pentru a gestiona cererile de la primul rând (fără mesaje de asistent) - protecția contextului cache funcționează acum de la primul răspuns. -**KIRO MITM**(#481): Schimbați KIRO `configType` din `guide` → `mitm` astfel încât tabloul de bord redă controalele MITM Start/Stop. -**Test E2E**(CI): Remediați `providers-bailian-coding-plan.spec.ts` — respingeți suprapunerea modală preexistentă înainte de a face clic pe butonul Adăugați cheia API.### Closed Issues

- #473 — Fluxurile Zombie SSE ocolesc alternativa combo
- #474 — Eticheta `<omniModel>` din cache contextuală lipsește la prima tură
- #481 — MITM pentru KIRO nu poate fi activat din tabloul de bord
- #468 — Server la distanță Gemini CLI (înlocuit de deprecierea #462)
- #438 — Claude nu poate scrie fișiere (problema CLI externă)
- #439 — AppImage nu funcționează (soluție documentată pentru libfuse2)
- #402 — ARM64 DMG „deteriorat” (soluție documentată xattr -cr)
- #460 — CLI nu poate fi rulat pe Windows (remediere PATH documentată)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI depreciere, ghidul VM i18n fix, dependentabot security fix, extinderea schemei furnizorului.### Funcționalități

-**Gemini CLI Depreciation**(#462): Marcați furnizorul `gemini-cli` ca depreciat cu avertisment — Google restricționează utilizarea OAuth de la terți din martie 2026 -**Schema furnizorului**(#462): Extindeți validarea Zod cu câmpurile opționale `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**Ghid VM i18n**(#471): Adăugați `VM_DEPLOYMENT_GUIDE.md` la conducta de traducere i18n, regenerați toate cele 30 de traduceri locale din sursa engleză (au fost blocate în portugheză)### Securitate

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — remediază poluarea prototipului CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regresia Aliasurilor de model (remediată în v2.8.2)
- #471 — Traducerile ghidului VM întrerupte
- #483 — `data: nul` după `[DONE]` (remediat în v2.8.3)### Merged PRs

- #484 — deps: denivelare aplatizată de la 3.3.3 la 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Cehă i18n, remediere protocol SSE, traducere ghid VM.### Funcționalități

-**Limba cehă**(#482): Cehă completă (cs) i18n — 22 de documente, 2606 șiruri de interfață, actualizări de comutare de limbă (@zen0bit) -**Ghid de implementare VM**: Tradus din portugheză în engleză ca document sursă (@zen0bit)### Bug Fixes

-**Protocol SSE**(#483): Opriți trimiterea de `date: nul` după semnalul `[DONE]` — remediază `AI_TypeValidationError` în clienții SDK AI stricti (validatori bazați pe Zod)### Merged PRs

- #482 — Adăugați limba cehă + Remediați sursa engleză VM_DEPLOYMENT_GUIDE.md (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 PR-uri fuzionate, remediere de rutare a aliaselor de model, export de jurnal și triaj probleme.### Funcționalități

-**Export jurnal**: Buton nou Export pe `/dashboard/logs` cu meniu vertical pentru intervalul de timp (1h, 6h, 12h, 24h). Descărcă JSON de jurnalele de solicitări/proxy/apeluri prin intermediul API-ului `/api/logs/export` (#user-request)### Bug Fixes

-**Rutarea Aliaselor de model**(#472): Setări → Aliasurile de model afectează acum corect rutarea furnizorului, nu doar detectarea formatului. Anterior, ieșirea `resolveModelAlias()` a fost folosită numai pentru `getModelTargetFormat()`, dar ID-ul modelului original a fost trimis furnizorului -**Utilizarea fluxului de flux**(#480): Datele de utilizare de la ultimul eveniment SSE din buffer sunt acum extrase corect în timpul fluxului de flux (combinate din @prakersh)### Merged PRs

- #480 — Extrageți utilizarea din buffer-ul rămas în gestionarea fluxului (@prakersh)
- #479 — Adăugați intrările de preț pentru Codex 5.3/5.4 și ID model antropic care lipsesc (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Cinci PR-uri ale comunității — remedieri de jurnal de apeluri în flux, compatibilitate Kiro, analiză de token cache, traducere în limba chineză și ID-uri de apel configurabile pentru instrumente.### Funcționalități

-**feat(logs)**: conținutul de răspuns al jurnalului de apeluri acum acumulat corect din fragmentele brute ale furnizorului (OpenAI/Claude/Gemini) înainte de traducere, reparând sarcinile utile de răspuns goale în modul de streaming (#470, @zhangqiang8vip) -**feat(furnizori)**: Normalizarea ID-ului de apel pentru instrumentul de 9 caractere configurabilă pe model (în stil Mistral) - numai modelele cu opțiunea activată primesc ID-uri trunchiate (#470) -**feat(api)**: Key PATCH API extins pentru a accepta câmpurile `allowedConnections`, `name`, `autoResolve`, `isActive` și `accessSchedule` (#470) -**feat(tabloul de bord)**: aspectul primul răspuns în interfața de utilizare pentru detaliile jurnalului de solicitare (#470) -**feat(i18n)**: traducere îmbunătățită în limba chineză (zh-CN) — retraducere completă (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Eliminați câmpul „model” injectat din corpul solicitării — API-ul Kiro respinge câmpurile de nivel superior necunoscute (#478, @prakersh) -**remediere (utilizare)**: includeți citirea memoriei cache + simbolurile de creare a memoriei cache în totalurile de intrare ale istoricului de utilizare pentru analize precise (#477, @prakersh) -**fix(callLogs)**: acceptă câmpurile de utilizare în format Claude (`input_tokens`/`output_tokens`) alături de formatul OpenAI, include toate variantele de token cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: furnizor Bailian Coding Plan cu adrese URL de bază editabile, plus contribuții ale comunității pentru Alibaba Cloud și Kimi Coding.### Funcționalități

-**feat(providers)**: Planul de codificare Bailian adăugat (`plan-de-codare bailian`) — Alibaba Model Studio cu API compatibil cu Antropic. Catalog static de 8 modele, inclusiv Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 și Kimi K2.5. Include validarea autentificare personalizată (400=valid, 401/403=invalid) (#467, @Mind-Dragon) -**feat(admin)**: Adresa URL implicită editabilă în fluxurile de creare/editare a administratorului furnizorului - utilizatorii pot configura adrese URL de bază personalizate pentru fiecare conexiune. A persistat în `providerSpecificData.baseUrl` cu validarea schemei Zod respingând schemele care nu sunt http(e) (#467)### 🧪 Tests

- S-au adăugat peste 30 de teste unitare și 2 scenarii e2e pentru furnizorul de plan de codare Bailian, care acoperă validarea autenticării, consolidarea schemei, comportamentul la nivel de rută și integrarea pe mai multe straturi---

## [2.7.10] — 2026-03-19

> Sprint: doi furnizori noi contribuiți de comunitate (Alibaba Cloud Coding, Kimi Coding API-key) și Docker pino fix.### Funcționalități

-**feat(furnizori)**: S-a adăugat suport Alibaba Cloud Coding Plan cu două puncte finale compatibile cu OpenAI — `alicode` (China) și `alicode-intl` (internațional), fiecare cu 8 modele (#465, @dtk1985) -**feat(providers)**: S-a adăugat o cale dedicată furnizorului `kimi-coding-apikey` — accesul Kimi Coding bazat pe chei API nu mai este forțat prin ruta `kimi-coding` numai OAuth. Include registru, constante, modele API, configurare și test de validare (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: S-a adăugat dependența lipsă `split2` la imaginea Docker — `pino-abstract-transport` o necesită în timpul execuției, dar nu a fost copiat în containerul autonom, provocând blocări `Cannot find module 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: răspunsurile Codex sub-caile de trecere suportate nativ, blocarea Windows MITM remediată și schemele agent Combos ajustate.### Funcționalități

-**feat(codex)**: Subpath-ul răspunsurilor native pentru Codex — direcționează nativ `POST /v1/responses/compact` către Codex în amonte, menținând compatibilitatea cu Claude Code fără a elimina sufixul `/compact` (#457)### 🐛 Bug Fixes

-**fix(combo)**: Schemele Zod (`updateComboSchema` și `createComboSchema`) includ acum `system_message`, `tool_filter_regex` și `context_cache_protection`. Remediază eroarea în care setările specifice agentului create prin tabloul de bord au fost eliminate în tăcere de stratul de validare backend (#458) -**fix(mitm)**: Prăbușirea profilului Kiro MITM pe Windows a fost remediată — `node-machine-id` a eșuat din cauza lipsei env `REG.exe`, iar fallback-ul a generat o eroare fatală `crypto is not defined`. Fallback acum importă cripto în siguranță și corect (#456)---

## [2.7.8] — 2026-03-18

> Sprint: eroare de economisire a bugetului + agent combinat caracteristici UI + remediere de securitate a etichetei omniModel.### 🐛 Bug Fixes

-**fix(buget)**: „Salvare limite” nu mai returnează 422 — `warningThreshold` este acum trimis corect ca fracție (0–1) în loc de procent (0–100) (#451) -**fix(combo)**: eticheta cache internă `<omniModel>` este acum eliminată înainte de a redirecționa cererile către furnizori, prevenind întreruperile sesiunii cache (#454)### Funcționalități

-**feat(combo)**: secțiunea Caracteristici de agent adăugată la combo create/edit modal — expune `system_message` override, `tool_filter_regex` și `context_cache_protection` direct din tabloul de bord (#454)---

## [2.7.7] — 2026-03-18

> Sprint: blocarea Docker pino, remedierea lucrătorului pentru răspunsurile CLI Codex, sincronizarea blocării pachetului.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` și `pino-pretty` sunt acum copiate în mod explicit în etapa de rulare Docker — Urmărirea autonomă Next.js ratează aceste dep-uri egale, provocând blocarea `Cannot find module pino-abstract-transport` la pornire (#449) -**fix(responses)**: Eliminați `initTranslators()` de pe ruta `/v1/responses` - se bloca lucrătorul Next.js cu `lucrătorul a ieșit` uncaughtException la cererile CLI Codex (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` este acum comis la fiecare versiune de actualizare pentru a se asigura că Docker `npm ci` folosește versiuni exacte de dependență---

## [2.7.5] — 2026-03-18

> Sprint: îmbunătățiri UX și remediere de verificare a stării CLI Windows.### 🐛 Bug Fixes

-**fix(ux)**: Afișează indicația de parolă implicită pe pagina de conectare — utilizatorii noi văd acum „„Parola implicită: 123456”” sub introducerea parolei (#437) -**fix(cli)**: Claude CLI și alte instrumente instalate de npm sunt acum detectate corect ca rulabile pe Windows - spawn folosește `shell:true` pentru a rezolva wrapper-urile `.cmd` prin PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: tabloul de bord Instrumente de căutare, remedieri i18n, limite Copilot, remediere de validare Serper.### Funcționalități

-**feat(search)**: Adăugați teren de căutare (al 10-lea punct final), pagină Instrumente de căutare cu compararea furnizorilor/Reclasificarea conductei/Istoricul căutărilor, rutarea locală a reclasării, autentificarea API-ului de căutare (#443 de la @Regis-RCR)

- Rută nouă: `/dashboard/search-tools`
- Intrare din bara laterală în secțiunea Depanare
- `GET /api/search/providers` și `GET /api/search/stats` cu gardieni de autentificare
- Rutare local provider_nodes pentru `/v1/rerank`
- 30+ chei i18n în spațiul de nume de căutare### 🐛 Bug Fixes

-**fix(căutare)**: remediați normalizatorul de știri curajoase (a returnat 0 rezultate), aplicați trunchierea max_results după normalizare, remediați adresa URL de preluare a paginii Endpoints (#443 de către @Regis-RCR) -**fix(analytics)**: Localizați etichetele de zi/dată de analiză — înlocuiți șirurile de caractere portugheze codificate cu `Intl.DateTimeFormat(locale)` (#444 de la @hijak) -**fix(copilot)**: corectează afișarea tipului de cont GitHub Copilot, filtrează rândurile de cotă nelimitate înșelătoare din tabloul de bord cu limite (nr. 445 de la @hijak) -**fix(furnizori)**: nu mai respingeți cheile Serper API valide - tratați răspunsurile non-4xx ca autentificare validă (#446 de la @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: remediere de rezervă a cotei Codex direct API.### 🐛 Bug Fixes

-**fix(codex)**: blocați conturile epuizate săptămânal în API-ul de rezervă direct (#440)

- Potrivirea prefixului `resolveQuotaWindow()`: `"săptămânal"` se potrivește acum cheilor cache `"săptămânal (7d)"`
- `applyCodexWindowPolicy()` impune `useWeekly`/`use5h` comută corect
- 4 noi teste de regresie (766 în total)---

## [2.7.2] — 2026-03-18

> Sprint: remedieri de contrast ale interfeței de utilizare în modul Light.### 🐛 Bug Fixes

-**remediere (registre)**: remediați contrastul modului de lumină în butoanele de filtrare a jurnalelor de solicitare și insigna combinată (#378)

- Butoanele de filtru Eroare/Succes/Combo pot fi citite acum în modul de lumină
- Insigna de rând combinată folosește violet mai puternic în modul de lumină---

## [2.7.1] — 2026-03-17

> Sprint: rutare unificată de căutare web (POST /v1/search) cu 5 furnizori + remedieri de securitate Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: rutare unificată de căutare pe web — `POST /v1/search` cu 5 furnizori (Serper, Brave, Perplexity, Exa, Tavily)

- Failover automat între furnizori, peste 6.500 de căutări gratuite/lună
- Cache în memorie cu unificarea solicitărilor (TTL configurabil)
- Dashboard: Search Analytics tab in `/dashboard/analytics` with provider breakdown, cache hit rate, cost tracking
- API nou: `GET /api/v1/search/analytics` pentru statistici privind cererile de căutare
- Migrare DB: coloana `request_type` pe `call_logs` pentru urmărirea solicitărilor non-chat
- Validare Zod (`v1SearchSchema`), autorizată, cost înregistrat prin `recordCost()`### Securitate

-**deps**: Next.js 16.1.6 → 16.1.7 — remediază 6 CVE: -**Critic**: CVE-2026-29057 (contrabandă de solicitări HTTP prin http-proxy) -**Ridicat**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions) -**Mediu**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fișier                                                                 | Scop                                            |
| ---------------------------------------------------------------------- | ----------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                          | Manager de căutare cu rutare cu 5 furnizori     |
| `open-sse/config/searchRegistry.ts`                                    | Registrul furnizorului (auth, cost, quota, TTL) |
| `open-sse/services/searchCache.ts`                                     | Cache în memorie cu unificarea solicitărilor    |
| `src/app/api/v1/search/route.ts`                                       | Ruta Next.js (POST + GET)                       |
| `src/app/api/v1/search/analytics/route.ts`                             | Statistici de căutare API                       |
| `src/app/(tabloul de bord)/dashboard/analytics/SearchAnalyticsTab.tsx` | Fila tablou de bord Analytics                   |
| `src/lib/db/migrations/007_search_request_type.sql`                    | Migrare DB                                      |
| `tests/unit/search-registry.test.mjs`                                  | 277 de linii de teste unitare                   | --- |

## [2.7.0] — 2026-03-17

> Sprint: Funcții inspirate de ClawRouter — flag toolCalling, detectarea intenției multilingve, fallback bazat pe benchmark, deduplicare cereri, RouterStrategy conectabil, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 prețuri.### ✨ New Models & Pricing

-**feat(preț)**: xAI Grok-4 Fast — `0,20 USD/0,50 USD per 1 milion de jetoane’, latență p50 de 1143 ms, apelare instrument acceptată
-**feat(preț)**: xAI Grok-4 (standard) — `0,20 USD/1,50 USD per 1 milion de jetoane’, raționament emblematic -**feat(preț)**: GLM-5 prin Z.AI — `0,5 USD/1M`, context de ieșire 128K -**feat(pricing)**: MiniMax M2.5 — `$0.30/1M input`, reasoning + agentic tasks -**feat(preț)**: DeepSeek V3.2 — preț actualizat `0,27 USD/1,10 USD pe 1 milion` -**feat(preț)**: Kimi K2.5 prin Moonshot API - acces direct Moonshot API -**feat(providers)**: a fost adăugat furnizorul Z.AI (alias `zai`) — familia GLM-5 cu ieșire de 128K### 🧠 Routing Intelligence

-**feat(registry)**: indicatorul `toolCalling` per model în registrul furnizorului - combo-urile pot prefera/solicita acum modele capabile de apelare instrumente -**feat(scoring)**: detectarea intenției multilingve pentru scorul AutoCombo — scriptul PT/ZH/ES/AR/modelurile de limbă influențează selecția modelului în funcție de context de solicitare -**feat(fallback)**: lanțuri de rezervă bazate pe benchmark - date de latență reală (p50 din `comboMetrics`) utilizate pentru a reordona prioritatea de rezervă în mod dinamic -**feat(dedup)**: Solicitați deduplicarea prin content-hash — Fereastra de idempotnță de 5 secunde împiedică apelurile duplicate ale furnizorului să reîncerce clienții -**feat(router)**: interfață `RouterStrategy` conectabilă în `autoCombo/routerStrategy.ts` — logica de rutare personalizată poate fi injectată fără modificarea nucleului### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 noi scheme de instrumente avansate: `omniroute_get_provider_metrics` (p50/p95/p99 per furnizor) și `omniroute_explain_route` (explicația deciziei de rutare) -**feat(mcp)**: sfera de autentificare a instrumentului MCP a fost actualizată — sfera `metrics:read` adăugată pentru instrumentele de valori ale furnizorului -**feat(mcp)**: `omniroute_best_combo_for_task` acceptă acum parametrul `languageHint` pentru rutarea multilingvă### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` extins cu urmărire în timp real a percentilei de latență per furnizor/cont -**feat(health)**: API-ul de sănătate (`/api/monitoring/health`) returnează acum câmpurile `p50Latency` și `errorRate` pentru fiecare furnizor -**feat(usage)**: migrarea istoricului utilizării pentru urmărirea latenței per model### 🗄️ DB Migrations

-**feat(migrations)**: noua coloană `latency_p50` în tabelul `combo_metrics` — zero-breaking, sigur pentru utilizatorii existenți### 🐛 Bug Fixes / Closures

-**închidere(#411)**: rezoluție mai bună a modulului hashed-sqlite3 pe Windows - remediat în v2.6.10 (f02c5b5) -**închidere(#409)**: finalizarea chat-ului GitHub Copilot eșuează cu modelele Claude atunci când fișierele sunt atașate - rezolvat în v2.6.9 (838f1d6) -**close(#405)**: duplicat al #411 — rezolvat## [2.6.10] — 2026-03-17

> Remediere Windows: descărcare predefinită better-sqlite3 fără node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Pe Windows, `npm install -g omniroute` a eșuat cu `better_sqlite3.node nu este o aplicație Win32 validă`, deoarece binarul nativ a fost compilat pentru Linux. Adaugă**Strategia 1.5**la `scripts/postinstall.mjs`: folosește `@mapbox/node-pre-gyp install --fallback-to-build=false` (inclus în `better-sqlite3`) pentru a descărca binarul corect pre-construit pentru sistemul de operare/arch actual fără a necesita nici un instrument de compilare (fără nici un instrument PVC, fără PVC). Se întoarce la `npm rebuild` numai dacă descărcarea eșuează. Adaugă mesaje de eroare specifice platformei cu instrucțiuni clare de remediere manuală.---

## [2.6.9] — 2026-03-17

> Remedieri CI (t11 orice buget), remediere de erori #409 (fișiere atașate prin Copilot+Claude), corecție a fluxului de lucru.### 🐛 Bug Fixes

-**fix(ci)**: Eliminați cuvântul „orice” din comentariile din `openai-responses.ts` și `chatCore.ts` care nu au eșuat verificarea bugetului t11 `any ` (fals pozitiv din comentariile de numărare regex) -**fix(chatCore)**: Normalizați tipurile de părți de conținut neacceptate înainte de a redirecționa către furnizori (#409 — Cursorul trimite `{type:"file"}` atunci când fișierele `.md` sunt atașate; Copilot și alți furnizori OpenAI-compat resping cu "type trebuie să fie fie 'image_url', fie 'text``"; remediază blocarea/transformarea fișierelor `text` necunoscute"; tipuri)### 🔧 Workflow

-**chore(generate-release)**: Adăugați ATOMIC COMMIT RULE — versiunea actualizată (`npm version patch`) TREBUIE să se întâmple înainte de comiterea fișierelor de caracteristici pentru a vă asigura că eticheta indică întotdeauna un commit care conține toate modificările versiunii împreună---

## [2.6.8] — 2026-03-17

> Sprint: Combo ca agent (prompt de sistem + filtru de instrumente), Protecție caching context, Actualizare automată, Jurnale detaliate, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: tabel nou `request_detail_logs` cu declanșare a tamponului inel cu 500 de intrări, înscriere prin comutare de setări### Funcționalități

-**feat(combo)**: System Message Override per Combo (#399 — câmpul `system_message` înlocuiește sau injectează promptul de sistem înainte de redirecționarea către furnizor) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` păstrează numai modelul de potrivire a instrumentelor; acceptă formatele OpenAI + Anthropic) -**feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` etichetează răspunsurile cu `<omniModel>furnizor/model</omniModel>` și fixează modelul pentru continuitatea sesiunii) -**feat(settings)**: Actualizare automată prin Setări (#320 — `GET /api/system/version` + `POST /api/system/update` — verifică registrul npm și actualizările în fundal cu repornirea pm2) -**feat(jurnal)**: jurnalele de solicitare detaliate (nr. 378 — captează corpuri complete ale conductei în 4 etape: cererea clientului, cererea tradusă, răspunsul furnizorului, răspunsul clientului — comutare de înscriere, 64 KB delimitare, 500 de intrări tampon de apel) -**feat(mitm)**: profilul MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` vizează api.anthropic.com, reutiliza infrastructura MITM existentă)---

## [2.6.7] — 2026-03-17

> Sprint: îmbunătățiri SSE, extensii locale provider_nodes, registru proxy, remedieri Claude passthrough.### Funcționalități

-**feat(health)**: verificarea stării de fundal pentru `provider_nodes` locale cu backoff exponențial (30s→300s) și `Promise.allSettled` pentru a evita blocarea (#423, @Regis-RCR) -**feat(embeddings)**: direcționează `/v1/embeddings` către `provider_nodes` locale — `buildDynamicEmbeddingProvider()` cu validarea numelui de gazdă (#422, @Regis-RCR) -**feat(audio)**: direcționați TTS/STT către `provider_nodes` locale — `buildDynamicAudioProvider()` cu protecție SSRF (#416, @Regis-RCR) -**feat(proxy)**: registru proxy, API-uri de gestionare și generalizare limită de cotă (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Eliminați câmpurile specifice lui Claude (`metadate`, `versiunea_antropică`) când ținta este OpenAI-compat (#421, @prakersh) -**fix(sse)**: Extrageți utilizarea Claude SSE (`input_tokens`, `output_tokens`, jetoane cache) în modul flux de trecere (#420, @prakersh) -**fix(sse)**: generați „call_id” alternativ pentru apelurile de instrumente cu ID-uri lipsă/vide (#419, @prakersh) -**fix(sse)**: trecere Claude-la-Claude — corp înainte complet neatins, fără retraducere (#418, @prakersh) -**fix(sse)**: Filtrați elementele „tool_result” orfane după compactarea contextului Claude Code pentru a evita erorile 400 (#417, @prakersh) -**fix(sse)**: ignorați apelurile instrumentului cu nume goale în traducătorul API Responses pentru a preveni bucle infinite `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Eliminați blocurile de conținut de text goale înainte de traducere (#427, @prakersh) -**fix(api)**: Adăugați `refreshable: true` la configurația de testare Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` și devDependencies aferente (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Remediere rapidă: compatibilitate Turbopack/Docker — eliminați protocolul `node:` din toate importurile `src/`.### 🐛 Bug Fixes

-**fix(build)**: Prefixul de protocol `node:` a fost eliminat din instrucțiunile `import` din 17 fișiere sub `src/`. Importurile `node:fs`, `node:path`, `node:url`, `node:os` etc. au cauzat `Fișierul Ecmascript a avut o eroare` pe versiunile Turbopack (Next.js 15 Docker) și pe upgrade-uri de la instalările globale npm mai vechi. Fișiere afectate: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` și alte 12 în `src/app/api/` și `src/lib/`. -**chore(workflow)**: `generate-release.md` a fost actualizat pentru a face sincronizarea Docker Hub și a implementa pașii**obligatori**în fiecare lansare dual-VPS.---

## [2.6.5] — 2026-03-17

> Sprint: filtrarea parametrilor modelului de raționament, remedierea 404 a furnizorului local, furnizorul Kilo Gateway, denivelări de dependență.### ✨ New Features

-**feat(api)**: S-a adăugat**Kilo Gateway**(`api.kilo.ai`) ca nou furnizor de chei API (alias `kg`) — 335+ modele, 6 modele gratuite, 3 modele de rutare automată (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free). Modele de trecere acceptate prin punctul final `/api/gateway/models`. (PR #408 de la @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Eliminați parametrii neacceptați pentru modelele de raționament (o1, o1-mini, o1-pro, o3, o3-mini). Modelele din familia `o1`/`o3` resping `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` și `n` cu HTTP 400. Parametrii sunt acum eliminați de layerul `chatCore` înainte de redirecționare. Utilizează un câmp declarativ „unsupportedParams” pentru fiecare model și o hartă O(1) precalculată pentru căutare. (PR #412 de la @Regis-RCR) -**fix(sse)**: furnizorul local 404 are acum ca rezultat o**blocare numai pentru model (5 secunde)**în loc de o blocare la nivel de conexiune (2 minute). Când un backend de inferență local (Ollama, LM Studio, oMLX) returnează 404 pentru un model necunoscut, conexiunea rămâne activă și alte modele continuă să funcționeze imediat. De asemenea, remediază o eroare preexistentă în care `model` nu a fost transmis către `markAccountUnavailable()`. Furnizorii locali detectați prin numele de gazdă (`localhost`, `127.0.0.1`, `::1`, extensibil prin `LOCAL_HOSTNAMES` env var). (PR #410 de la @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(furnizori)**: au fost eliminate nume de model inexistente de la 5 furnizori: -**gemini / gemini-cli**: s-au eliminat `gemini-3.1-pro/flash` și `gemini-3-*-preview` (nu există în Google API v1beta); înlocuit cu `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravitație**: eliminat `gemini-3.1-pro-high/low` și `gemini-3-flash` (alias-uri interne nevalide); înlocuit cu modele reale 2.x -**github (Copilot)**: s-au eliminat `gemini-3-flash-preview` și `gemini-3-pro-preview`; înlocuit cu `gemini-2.5-flash` -**nvidia**: corectat `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM folosește spațiul de nume `meta/` pentru modelele Meta); a adăugat `nvidia/llama-3.1-70b-instruct` și `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Combo `free-stack` actualizat pe DB la distanță: eliminat `qw/qwen3-coder-plus` (jeton de reîmprospătare expirat), corectat `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, corectat `gemini/gemini-3.1-flash` → `gemeni/gemini-2.5-flash`, adăugat `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip coapte în conducta de construcție, furnizor de sintetic adăugat, calea VPS PM2 corectată.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip rulează acum la**timp de compilare**pentru TOATE pachetele - nu doar `better-sqlite3`. Pasul 5.6 din `prepublish.mjs` parcurge fiecare `.js` din `app/.next/server/` și elimină sufixul hexadecimal de 16 caractere din orice `require()` cu hash. Remediază `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND la instalările globale npm. Închide #398 -**fix(deploy)**: PM2 pe ambele VPS indică către directoare git-clone învechite. Reconfigurat la `app/server.js` în pachetul global npm. Flux de lucru `/deploy-vps` actualizat pentru a utiliza `npm pack + scp` (registrul npm respinge pachetele de 299 MB).### Funcționalități

-**feat(furnizor)**: Sintetic ([synthetic.new](https://synthetic.new)) — inferență compatibilă OpenAI centrată pe confidențialitate. `passthroughModels: true` pentru catalogul dinamic de modele HuggingFace. Modele inițiale: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 de la @Regis-RCR)### 📋 Issues Closed

-**închidere #398**: regresie hash npm - remediată prin hash-strip la compilare în prepublicare -**triajul #324**: Captură de ecran de eroare fără pași — detalii de reproducere solicitate---

## [2.6.2] — 2026-03-16

> Sprint: hashingul modulului complet remediat, 2 PR-uri fuzionate (filtru de instrumente antropice + căi personalizate pentru punctele finale), furnizorul Alibaba Cloud DashScope adăugat, 3 probleme învechite închise.### 🐛 Bug Fixes

-**fix(build)**: Pachetul web extins `externals` hash-strip pentru a acoperi TOATE `serverExternalPackages`, nu doar `better-sqlite3`. Next.js 16 Turbopack hashează `zod`, `pino` și orice alt pachet extern de server în nume precum `zod-dcb22c6336e0bc69` care nu există în `node_modules` în timpul execuției. O expresie generală HASH_PATTERN catch-all acumulează sufixul de 16 caractere și revine la numele pachetului de bază. De asemenea, a adăugat `NEXT_PRIVATE_BUILD_WORKER=0` în `prepublish.mjs` pentru a consolida modul webpack, plus o scanare post-build care raportează orice referințe hashed rămase. (#396, #398, PR #403) -**fix(chat)**: Numele instrumentelor în format antropic (`tool.name` fără învelișul `.function`) au fost eliminate în tăcere de filtrul de nume gol introdus în #346. LiteLLM solicită proxy cu prefixul „antropic/” în formatul API Anthropic Messages, ceea ce face ca toate instrumentele să fie filtrate și Anthropic să returneze „400: tool_choice.any poate fi specificat doar în timp ce furnizează instrumente”. Remediat prin revenirea la `tool.name` când `tool.function.name` este absent. S-au adăugat 8 teste unitare de regresie. (PR #397)### Funcționalități

-**feat(api)**: căi personalizate pentru punctele finale pentru nodurile furnizorilor compatibile cu OpenAI - configurați `chatPath` și `modelsPath` per nod (de exemplu, `/v4/chat/completions`) în interfața de utilizare a conexiunii furnizorului. Include o migrare DB (`003_provider_node_custom_paths.sql`) și dezinfectare a căii URL (fără traversare `..`, trebuie să înceapă cu `/`). (PR #400) -**feat(furnizor)**: Alibaba Cloud DashScope a fost adăugat ca furnizor compatibil cu OpenAI. Punct final internațional: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modele: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API key.### 📋 Issues Closed

-**închidere #323**: eroare de conectare a liniei `[object Object]` — remediată în v2.3.7; a instruit utilizatorul să facă upgrade de la v2.2.9 -**închidere #337**: urmărirea creditelor Kiro — implementată în v2.5.5 (#381); utilizatorul a indicat Tabloul de bord → Utilizare -**triajul #402**: ARM64 macOS DMG deteriorat - a solicitat versiunea macOS, eroare exactă și a recomandat soluția de soluționare `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Remediere critică de pornire: instalările globale npm v2.6.0 s-au prăbușit cu o eroare 500 din cauza unei erori de hashing al numelui modulului Turbopack/webpack în cârligul de instrumentare Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Forța ca `better-sqlite3` să fie întotdeauna cerut de numele exact al pachetului din pachetul de server webpack. Next.js 16 a compilat cârligul de instrumentare într-o bucată separată și a emis `require('better-sqlite3-<hash>')` — un nume de modul hashing care nu există în `node_modules` — chiar dacă pachetul era listat în `serverExternalPackages`. S-a adăugat o funcție explicită „externe” la configurația pachetului web al serverului, astfel încât bundler-ul să emită întotdeauna „require(“better-sqlite3”)”, rezolvând pornirea „500 Internal Server Error” la instalările globale curate. (#394, PR #395)### 🔧 CI

-**ci**: s-a adăugat `workflow_dispatch` la `npm-publish.yml` cu protecția pentru sincronizarea versiunii pentru declanșatoarele manuale (#392) -**ci**: S-a adăugat `workflow_dispatch` la `docker-publish.yml`, s-a actualizat GitHub Actions la cele mai recente versiuni (#392)---

## [2.6.0] - 2026-03-15

> Sprint de rezolvare a problemelor: 4 erori remediate, jurnalele UX îmbunătățite, urmărirea creditului Kiro adăugată.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI și SD WebUI nu mai apar în lista de furnizori ai paginii Media când sunt neconfigurate - preia `/api/providers` la montare și ascunde furnizorii locali fără conexiuni (#390) -**fix(auth)**: Round-robin nu mai selectează conturile cu rate limitate imediat după rece - `backoffLevel` este acum folosit ca cheie de sortare principală în rotația LRU (#340) -**fix(oauth)**: Qoder (și alți furnizori care redirecționează către propria interfață de utilizare) nu mai lasă modalul OAuth blocat la „Așteaptă autorizare” – tranziția automată a detectorului cu pop-up închis la modul de introducere manuală a adreselor URL (#344) -**fix(jurnal)**: tabelul de jurnal de solicitare este acum lizibil în modul light — insignele de stare, numărul de jetoane și etichetele combinate folosesc clase de culoare adaptive „dark:” (#378)### Funcționalități

-**feat(kiro)**: urmărirea creditului Kiro a fost adăugată la folosirea de preluare - interogări `getUserCredits` de la punctul final AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(teste)**: Aliniat `test:plan3`, `test:fixes`, `test:security` pentru a utiliza același încărcător `tsx/esm` ca `npm test` — elimină fals negative la rezoluția modulului în rulările vizate (PR #386)---

## [2.5.9] - 2026-03-15

> Remediere de trecere nativă Codex + întărirea validării corpului rutei.### 🐛 Bug Fixes

-**fix(codex)**: Păstrați trecerea API-ului răspunsuri native pentru clienții Codex - evită mutațiile de traducere inutile (PR #387) -**fix(api)**: validați corpurile de solicitare pe rutele de preț/sincronizare și de rutare a sarcinilor - previne blocările de la intrări incorecte (PR #388) -**fix(auth)**: secretele JWT persistă la reporniri prin `src/lib/db/secrets.ts` — elimină erorile 401 după repornirea pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Remediere build: restaurați conectivitatea VPS întreruptă de publicarea incompletă a v2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` a folosit în continuare semnalizatorul `--webpack` depreciat, ceea ce provoacă eșuarea liniștită a construirii autonome Next.js — npm publish s-a finalizat fără `app/server.js`, întrerupând implementarea VPS---

## [2.5.7] - 2026-03-15

> Remedieri de gestionare a erorilor din terenul de joacă media.### 🐛 Bug Fixes

-**remediere(media)**: Transcrierea „Este necesară cheia API” fals pozitivă atunci când sunetul nu conține vorbire (muzică, tăcere) – acum afișează „Nu a fost detectată vorbire” -**fix(media)**: `upstreamErrorResponse` în `audioTranscription.ts` și `audioSpeech.ts` returnează acum JSON corect (`{error:{message}}`), permițând detectarea corectă a erorilor de acreditări 401/403 în MediaPageClient -**fix(media)**: `parseApiError` se ocupă acum de câmpul `err_msg` al Deepgram și detectează `"cheie api"` în mesajele de eroare pentru o clasificare precisă a erorilor de acreditări---

## [2.5.6] - 2026-03-15

> Remedieri critice de securitate/autentificare: OAuth antigravitație întrerupt + sesiuni JWT pierdute după repornire.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth trimite acum corect `client_secret` la punctul final al simbolului. Soluția de rezervă pentru `ANTIGRAVITY_OAUTH_CLIENT_SECRET` a fost un șir gol, care este fals, deci `client_secret` nu a fost niciodată inclus în cerere, provocând erori `"client_secret is missing"` pentru toți utilizatorii fără o var. Închide #383. -**fix(auth) #385**: `JWT_SECRET` este acum persistat în SQLite (`namespace='secrets'`) la prima generație și reîncărcat la pornirile ulterioare. Anterior, un nou secret aleatoriu era generat la fiecare pornire a procesului, invalidând toate cookie-urile/sesiunile existente după orice repornire sau upgrade. Afectează atât `JWT_SECRET`, cât și `API_KEY_SECRET`. Închide #382.---

## [2.5.5] - 2026-03-15

> Remedierea dedupării listei de modele, întărirea construcției autonome Electron și urmărirea creditului Kiro.### 🐛 Bug Fixes

-**fix(modele) #380**: `GET /api/models` include acum alias-uri de furnizor la construirea filtrului de furnizor activ — modelele pentru `claude` (alias `cc`) și `github` (alias `gh`) au fost întotdeauna afișate, indiferent dacă o conexiune a fost configurată, deoarece `PROVIDER_MODELS sunt stocate de alias-uri, dar `PROVIDER_MODELS`sunt stocate de chei de alias. S-a rezolvat prin extinderea fiecărui ID de furnizor activ pentru a include și alias-ul său prin „PROVIDER_ID_TO_ALIAS”. Închide #353.
-**fix(electron) #379**: Noul`scripts/prepare-electron-standalone.mjs`organizează un pachet dedicat`/.next/electron-standalone`înainte de ambalarea Electron. Se anulează cu o eroare clară dacă`node_modules`este o legătură simbolică (electron-builder ar livra o dependență de rulare pe mașina de construire). Dezinfectarea căilor pe mai multe platforme prin`path.basename`. De @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Urmărirea soldului creditului Kiro — punctul final de utilizare returnează acum date de credit pentru conturile Kiro apelând `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (același punct final pe care Kiro IDE îl folosește intern). Returnează creditele rămase, alocația totală, data de reînnoire și nivelul de abonament. Închide #337.## [2.5.4] - 2026-03-15

> Remediere de pornire a loggerului, remediere de securitate pentru bootstrap de conectare și îmbunătățire a fiabilității dev HMR. Infrastructura CI consolidată.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Restaurați calea pino transport logger — `formatters.level` combinat cu `transport.targets` este respins de pino. Configurațiile susținute de transport elimina acum formatatorul de nivel prin `getTransportCompatibleConfig()`. De asemenea, corectează maparea la nivel numeric în `/api/logs/console`: `30→info, 40→warn, 50→error` (a fost deplasat cu unul). -**fix(login) #375**: Pagina de conectare acum bootstrap de la punctul final public `/api/settings/require-login` în loc de protejat `/api/settings`. În setările protejate cu parolă, pagina de pre-autorizare a primit un 401 și a revenit la valorile implicite sigure în mod inutil. Ruta publică returnează acum toate metadatele bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) cu o alternativă conservatoare 200 la eroare. -**fix(dev) #374**: Adăugați `localhost` și `127.0.0.1` la `allowedDevOrigins` în `next.config.mjs` — HMR websocket a fost blocat la accesarea aplicației prin adresa de loopback, producând avertismente repetate de origine încrucișată.### 🔧 CI & Infrastructure

-**ESLint OOM fix**: `eslint.config.mjs` ignoră acum `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` și `clipr/**` — ESLint se bloca cu un OOM heap JS prin scanarea blnobs și codul binar compilat VS. -**Remedierea testului unității**: a fost eliminată `ALTER TABLE provider_connections ADD COLUMN „grup”` din 2 fișiere de testare — coloana face parte acum din schema de bază (adăugat în #373), provocând `SQLITE_ERROR: duplicate column name` la fiecare rulare CI. -**Pre-commit hook**: S-a adăugat `npm run test:unit` la `.husky/pre-commit` — testele unitare blochează acum comitările întrerupte înainte de a ajunge la CI.## [2.5.3] - 2026-03-14

> Remedieri critice de erori: migrarea schemei bazei de date, încărcarea mediului de pornire, ștergerea stării erorii furnizorului și remedierea descrierii i18n. Îmbunătățiri ale calității codului pe lângă fiecare PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Adăugați coloana `provider_connections.group` la schema de bază + migrarea de completare pentru bazele de date existente - coloana a fost folosită în toate interogările, dar lipsea din definiția schemei -**fix(i18n) #371**: Înlocuiți cheia inexistentă `t("deleteConnection")` cu cheia `providers.delete` existentă — remediază eroarea de rulare `MISSING_MESSAGE: providers.deleteConnection` pe pagina de detalii a furnizorului -**fix(auth) #372**: Ștergeți metadatele erorilor învechite (`errorCode`, `lastErrorType`, `lastErrorSource`) din conturile furnizorului după recuperarea autentică - anterior, conturile recuperate continuau să apară ca eșuate -**fix(startup) #369**: Unificați încărcarea mediului în `npm run start`, `run-standalone.mjs` și Electron pentru a respecta prioritatea `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — previne generarea unei noi baze de date `STORAGE_KEY`P criptate peste o bază de date criptată STORAGE_KEYCRY`### 🔧 Code Quality

- Modele documentate `result.success` vs `response?.ok` în `auth.ts` (ambele intenționate, acum explicate)
- `overridePath?.trim()` normalizat în `electron/main.js` pentru a se potrivi cu `bootstrap-env.mjs`
- S-a adăugat un comentariu pentru comanda de îmbinare `preferredEnv` la pornirea Electron

> Politica de cotă a contului Codex cu rotație automată, comutare rapidă a nivelului, model gpt-5.4 și remediere a etichetei de analiză.### ✨ New Features (PRs #366, #367, #368)

-**Politica de cotă Codex (PR #366)**: fereastra de cotă de 5 ore/săptămânal pe cont se comută în tabloul de bord al furnizorului. Conturile sunt omise automat când ferestrele activate ating pragul de 90% și sunt re-admise după `resetAt`. Include `quotaCache.ts` cu generator de stare fără efecte secundare. -**Codex Fast Tier Toggle (PR #367)**: Tabloul de bord → Setări → Codex Service Tier. Comutatorul de dezactivare implicită injectează `service_tier: "flex"` numai pentru solicitările Codex, reducând costul cu ~80%. Stiva completă: filă UI + punct final API + executor + translator + restaurare la pornire. -**gpt-5.4 Model (PR #368)**: adaugă `cx/gpt-5.4` și `codex/gpt-5.4` la registrul modelului Codex. Test de regresie inclus.### 🐛 Bug Fixes

-**Remedierea nr. 356**: Diagramele Analytics (Furnizor de top, După cont, Defalcare furnizor) afișează acum nume/etichete de furnizori care pot fi citite de om în loc de ID-uri interne brute pentru furnizorii compatibili cu OpenAI.

> Lansare majoră: strategie de rutare aleatorie strictă, controale de acces la chei API, grupuri de conexiuni, sincronizare externă a prețurilor și remedieri de erori critice pentru modelele de gândire, testare combinată și validare a numelui instrumentului.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: pachetul de amestecare Fisher-Yates cu garanție anti-repetare și serializare mutex pentru solicitări concurente. Puncte independente per combo și per furnizor. -**Controale de acces cheie API**: `allowedConnections` (restricționează ce conexiuni poate folosi o cheie), `is_active` (activare/dezactivare cheie cu 403), `accessSchedule` (controlul accesului bazat pe timp), comutare `autoResolve`, redenumiți cheile prin PATCH. -**Grupuri de conexiune**: Grupați conexiunile furnizorilor în funcție de mediu. Vizualizare acordeon în pagina Limite cu persistență locală de stocare și comutare automată inteligentă. -**Sincronizare externă a prețurilor (LiteLLM)**: rezoluție a prețurilor pe 3 niveluri (înlocuirea utilizatorului → sincronizat → valori implicite). Înscrieți-vă prin `PRICING_SYNC_ENABLED=true`. Instrumentul MCP `omniroute_sync_pricing`. 23 de teste noi. -**i18n**: 30 de limbi actualizate cu strategie strict-aleatorie, șiruri de gestionare a cheilor API. pt-BR tradus integral.### 🐛 Bug Fixes

-**remediere #355**: Timeout-ul de inactivitate a fluxului a crescut de la 60 de secunde la 300 de secunde — previne întreruperea modelelor cu gândire extinsă (claude-opus-4-6, o3 etc.) în timpul fazelor lungi de raționament. Configurabil prin `STREAM_IDLE_TIMEOUT_MS`. -**remedierea #350**: testul Combo ocolește acum `REQUIRE_API_KEY=true` folosind antetul intern și utilizează universal formatul compatibil OpenAI. Timeout a fost extins de la 15 la 20 de secunde. -**remedierea #346**: instrumentele cu `function.name` (redirecționat de Claude Code) sunt acum filtrate înainte ca furnizorii din amonte să le primească, prevenind erorile „Intrare nevalidă[N].nume: șir gol”.### 🗑️ Closed Issues

-**#341**: Secțiunea de depanare a fost eliminată - înlocuirea este `/dashboard/logs` și `/dashboard/health`.

> Compatibilitate API Key Round-Robin pentru configurarea furnizorilor cu mai multe chei și confirmarea rutării cu wildcard și a ferestrei de cotă deja existente.### ✨ New Features

-**API Key Round-Robin (T07)**: conexiunile furnizorului pot deține acum mai multe chei API (Edit Connection → Extra API Keys). Solicitările se rotesc între cheile primare și suplimentare prin `providerSpecificData.extraApiKeys[]`. Cheile sunt păstrate în memorie indexate pe conexiune - nu sunt necesare modificări ale schemei DB.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` cu potrivire wildcard în stil glob (`gpt*`, `claude-?-sonnet`, etc.) este deja integrat în `model.ts` cu clasare specifică. -**Cota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` avansează deja automat fereastra — dacă `Date.now() > entry.until`, blocarea este ștearsă imediat (fără blocare învechită).

> Lustruirea interfeței de utilizare, adăugări de strategii de rutare și gestionarea grațioasă a erorilor pentru limitele de utilizare.### ✨ New Features

-**Fill-First și Strategii de rutare P2C**: s-au adăugat `fill-first` (cota de scurgere înainte de a trece mai departe) și `p2c` (selecție cu latență redusă Power-of-Two-Choices) la selectorul de strategii combinate, cu panouri de ghidare complete și insigne codate cu culori. -**Free Stack Preset Models**: Crearea unei combinații cu șablonul Free Stack acum completează automat 7 modele de furnizor gratuit de cea mai bună calitate (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Utilizatorii doar activează furnizorii și primesc un combo de 0 USD/lună imediat. -**Modal Combo mai larg**: Crearea/Editarea modalului combo utilizează acum `max-w-4xl` pentru editarea confortabilă a combo-urilor mari.### 🐛 Bug Fixes

-**Pagina Limite HTTP 500 pentru Codex și GitHub**: `getCodexUsage()` și `getGitHubUsage()` returnează acum un mesaj ușor de utilizat când furnizorul returnează 401/403 (token expirat), în loc să arunce și să provoace o eroare 500 pe pagina Limite. -**MaintenanceBanner fals pozitiv**: bannerul nu mai afișează în mod fals „Serverul este inaccesibil” la încărcarea paginii. Remediat apelând `checkHealth()` imediat la montare și eliminând închiderea stării `show` învechite. -**Sfaturi instrumente pentru pictogramele furnizorului**: butoanele de editare (creion) și de ștergere a pictogramelor din rândul de conexiune la furnizor au acum sfaturi instrumente HTML native - toate cele 6 pictograme de acțiune sunt acum auto-documentate.

> Îmbunătățiri multiple din analiza problemelor comunității, asistență pentru noi furnizori, remedieri de erori pentru urmărirea simbolurilor, rutarea modelului și fiabilitatea streamingului.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Selectarea automată a modelului pe baza tipului de conținut al solicitării — codificare → deepseek-chat, analiză → gemini-2.5-pro, vision → gpt-4o, rezumat → gemini-2.5-flash. Configurabil prin Setări. Noua API `GET/PUT/POST /api/settings/task-routing`. -**Furnizor HuggingFace**: Router HuggingFace adăugat ca furnizor compatibil OpenAI cu Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: S-a adăugat furnizorul Vertex AI (Google Cloud) cu Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude prin Vertex. -**Încărcări de fișiere pentru teren de joacă**: încărcare audio pentru transcriere, încărcare de imagini pentru modele de viziune (detectare automată după numele modelului), randare a imaginii în linie pentru rezultatele generării de imagini. -**Feedback vizual pentru selectarea modelului**: Modelele deja adăugate în selectorul combinat arată acum ✓ insignă verde — previne confuzia dublată. -**Compatibilitate Qwen (PR #352)**: Setări de amprentă actualizate pentru User-Agent și CLI pentru compatibilitatea furnizorilor Qwen. -**Round-Robin State Management (PR #349)**: logica round-robin îmbunătățită pentru a gestiona conturile excluse și a menține corect starea de rotație. -**Clipboard UX (PR #360)**: operațiuni de clipboard întărite cu rezervă pentru contexte nesecurizate; Îmbunătățiri de normalizare a instrumentului Claude.### 🐛 Bug Fixes

-**Remediere #302 — OpenAI SDK stream=False drops tool_calls**: T01 Acceptare negociere antet nu mai forțează transmiterea când `body.stream` este în mod explicit `false`. A făcut ca tool_calls să fie renunțat la folosirea SDK-ului OpenAI Python în modul non-streaming. -**Remediere #73 — Claude Haiku direcționat către OpenAI fără prefix de furnizor**: modelele `claude-*` trimise fără prefix de furnizor acum sunt direcționate corect către furnizorul `antigravity` (antropic). S-a adăugat și `gemini-*`/`gemma-*` → `gemeni` euristic. -**Remediere #74 — Numărul de simboluri este întotdeauna 0 pentru streaming Antigravity/Claude**: Evenimentul SSE `message_start` care poartă `input_tokens` nu a fost analizat de `extractUsage()`, ceea ce a cauzat scăderea numărului de jetoane de intrare. Urmărirea simbolurilor de intrare/ieșire funcționează acum corect pentru răspunsurile în flux. -**Remediere #180 — Dubluri de import de modele fără feedback**: `ModelSelectModal` arată acum ✓ evidențiere verde pentru modelele aflate deja în combo, ceea ce face evident că sunt deja adăugate. -**Erori de generare a paginii media**: rezultatele imaginii sunt acum afișate ca etichete `<img>` în loc de JSON brut. Rezultatele transcripției sunt afișate ca text care poate fi citit. Erorile de acreditări arată un banner chihlimbar în loc de eroare silențioasă. -**Butonul de reîmprospătare a simbolului de pe pagina furnizorului**: UI de reîmprospătare manuală a simbolului a fost adăugată pentru furnizorii OAuth.### 🔧 Improvements

-**Registrul furnizorului**: HuggingFace și Vertex AI au fost adăugate la `providerRegistry.ts` și `providers.ts` (frontend). -**Read Cache**: Noul `src/lib/db/readCache.ts` pentru memorarea eficientă a citirii DB. -**Quota Cache**: cache-ul cotelor îmbunătățit cu evacuarea bazată pe TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fișier                                        | Scop                                                         |
| --------------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logica de rutare conștientă de sarcini (7 tipuri de sarcini) |
| `src/app/api/settings/task-routing/route.ts`  | API de configurare de rutare a sarcinilor                    |
| `src/app/api/providers/[id]/refresh/route.ts` | Actualizare manuală a jetonului OAuth                        |
| `src/lib/db/readCache.ts`                     | Cache de citire DB eficientă                                 |
| `src/shared/utils/clipboard.ts`               | Clipboard întărit cu rezervă                                 | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combo modal: Free Stack vizibil și proeminent**— Șablonul Free Stack a fost ascuns (al patrulea în grila cu 3 coloane). Remediat: mutat în poziția 1, comutat la grila 2x2, astfel încât toate cele 4 șabloane să fie vizibile, chenar verde + evidențiere GRATUITĂ.## [2.4.0] - 2026-03-13

> **Versiunea majoră**— Ecosistem gratuit de stivă, revizuire a terenului de joacă pentru transcriere, peste 44 de furnizori, documentație gratuită cuprinzătoare și îmbunătățiri ale interfeței de utilizare la nivel general.### Funcționalități

-**Combo: șablon Free Stack**— Al patrulea șablon „Free Stack ($0)” folosind round-robin în Kiro + Qoder + Qwen + Gemini CLI. Sugerează combinația preconstruită cu cost zero la prima utilizare. -**Media/Transcriere: Deepgram ca implicit**— Deepgram (Nova 3, 200 USD gratuit) este acum furnizorul prestabilit de transcriere. AssemblyAI (50 USD gratuit) și Groq Whisper (gratuit pentru totdeauna) afișate cu insigne de credit gratuite. -**README: secțiunea „Începeți gratuit”**— Noul tabel timpuriu în 5 pași, care arată cum să configurați AI cu cost zero în câteva minute. -**README: Free Transcription Combo**— Secțiune nouă cu sugestie combinată Deepgram/AssemblyAI/Groq și detalii de credit gratuite pentru fiecare furnizor. -**providers.ts: steag hasFree**— NVIDIA NIM, Cerebras și Groq marcate cu insigna hasFree și freeNote pentru interfața de utilizare a furnizorilor. -**i18n: chei templateFreeStack**— Șablon gratuit combo Stack tradus și sincronizat în toate cele 30 de limbi.## [2.3.16] - 2026-03-13

### Documentație

-**README: 44+ Furnizori**— S-au actualizat toate cele 3 apariții ale „36+ furnizori” la „44+”, reflectând numărul real de bază de cod (44 de furnizori în providers.ts) -**CITIȚI-MĂ: Secțiune nouă „🆓 Modele gratuite — Ce obțineți de fapt”**— S-a adăugat un tabel cu 7 furnizori cu limite de tarife per model pentru: Kiro (Claude nelimitat prin AWS Builder ID), Qoder (5 modele nelimitat), Qwen (4 modele nelimitat), Gemini CLI (180K/lună), NVIDIA NIM (~40 K/lună), NVIDIA RIM (~-40) (1M tok/zi / 60K TPM), Groq (30 RPM / 14,4K RPD). Include recomandarea combinată \/usr/bin/bash Ultimate Free Stack. -**README: Tabelul de prețuri actualizat**— S-a adăugat Cerebras la nivelul API KEY, s-a remediat NVIDIA de la „1000 de credite” la „dev-forever free”, s-au actualizat numărul și numele modelelor Qoder/Qwen -**README: Qoder 8→5 models**(numit: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**CITIȚI-MĂ: modele Qwen 3→4**(denumite: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funcționalități

-**Tabloul de bord Auto-Combo (prioritate nivel)**: s-a adăugat `🏷️ Tier` ca a șaptea etichetă a factorului de punctare în afișajul de defalcare a factorilor `/dashboard/auto-combo` — toți cei 7 factori de scor Auto-Combo sunt acum vizibili. -**i18n — secțiunea autoCombo**: S-au adăugat 20 de taste de traducere noi pentru tabloul de bord Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) la toate fișierele de limbă 30.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: a fost restaurat `clientSecret` implicit valid — anterior era un șir gol, provocând „Acreditări de client proaste” la fiecare încercare de conectare. Acreditarea publică este acum soluția implicită (se poate modifica prin `QODER_OAUTH_CLIENT_SECRET` env var). -**Serverul MITM nu a fost găsit (#335)**: `prepublish.mjs` acum compileaz` `src/mitm/\*.ts`în JavaScript folosind`tsc`înainte de a copia în pachetul npm. Anterior, au fost copiate numai fișierele brute`.ts`, ceea ce înseamnă că `server.js`nu a existat niciodată în instalările globale npm/Volta.
-**ProjectId lipsă GeminiCLI (#338)**: în loc să arunce o eroare 500 când`projectId`lipsește din acreditările stocate (de exemplu, după repornirea Docker), OmniRoute acum înregistrează un avertisment și încearcă să solicite - returnând o eroare semnificativă la nivelul furnizorului în loc de o eroare OmniRoute.
-**Nepotrivirea versiunii electronice (#323)**: Versiunea`electron/package.json`s-a sincronizat cu`2.3.13`(era`2.0.13`), astfel încât versiunea binară desktop se potrivește cu pachetul npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validare)**: S-a adăugat `tierPriority` (ponderea `0,05`) la schema Zod `ScoringWeights` și la ruta API `combos/auto` — al șaptelea factor de scor este acum acceptat pe deplin de API-ul REST și validat la intrare. Greutatea „stabilității” ajustată de la „0,10” la „0,05” pentru a menține suma totală = „1,0”.### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: S-a adăugat `tierPriority` ca al șaptelea factor de punctare — conturile cu niveluri Ultra/Pro sunt acum preferate față de nivelurile gratuite atunci când alți factori sunt egali. Câmpuri opționale noi `accountTier` și `quotaResetIntervalSecs` pe `ProviderCandidate`. Toate cele 4 pachete de moduri au fost actualizate (`ship-rapid`, `cost-saver`, `quality-first`, `offline-friendly`). -**Intra-Family Model Fallback (T5)**: Când un model este indisponibil (404/400/403), acum OmniRoute revine automat la modelele frați din aceeași familie înainte de a returna o eroare (`modelFamilyFallback.ts`). -**Timp configurabil API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var permite operatorilor să ajusteze timpul de expirare a proxy-ului (implicit 30s). Remediază erorile 504 la răspunsurile lente din amonte. (#332) -**Star History**: widget-ul star-history.com înlocuit cu starchart.cc (`?variant=adaptive`) în toate cele 30 de README-uri — se adaptează temei deschise/întunecate, actualizări în timp real.### 🐛 Bug Fixes

-**Auth — Prima parolă**: `INITIAL_PASSWORD` env var este acum acceptată la setarea primei parole pentru tabloul de bord. Utilizează `timingSafeEqual` pentru compararea în timp constant, prevenind atacurile de sincronizare. (#333) -**Truncare README**: S-a remediat o etichetă de închidere `</details>` lipsă în secțiunea Depanare, care a făcut ca GitHub să nu mai redeze totul de sub ea (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: S-a eliminat anularea redundantă `@swc/helpers` din `package.json` care a intrat în conflict cu dependența directă, provocând erori `EOVERRIDE` pe pnpm. S-a adăugat configurația `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: S-a adăugat validatorul `isSafePath()` în `cliRuntime.ts` pentru a bloca traversarea căii și metacaracterele shell în `CLI_*_BIN` env vars. -**CI**: `package-lock.json` a fost regenerat după eliminarea suprascrierii pentru a remedia erorile `npm ci` pe GitHub Actions.### 🔧 Improvements

-**Response Format (T1)**: `response_format` (json_schema/json_object) este acum injectat ca prompt de sistem pentru Claude, permițând compatibilitatea de ieșire structurată. -**429 Reîncercați (T2)**: Reîncercați intra-URL pentru 429 de răspunsuri (2× încercări cu întârziere de 2 secunde) înainte de a reveni la următoarea adresă URL. -**Anteturi Gemini CLI (T3)**: S-au adăugat anteturi de amprentă `User-Agent` și `X-Goog-Api-Client` pentru compatibilitatea Gemini CLI. -**Catalog de prețuri (T9)**: s-au adăugat intrări de preț `deepseek-3.1`, `deepseek-3.2` și `qwen3-coder-next`.### 📁 New Files

| Fișier                                     | Scop                                                            |
| ------------------------------------------ | --------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definiții model de familie și logica de rezervă intra-familială | ### Fixed |

-**KiloCode**: expirarea timpului de verificare a sănătății kilocode a fost deja fixată în v2.3.11 -**OpenCode**: Adăugați un cod deschis la registrul cliRuntime cu expirare de 15 s pentru verificarea sănătății -**OpenClaw / Cursor**: crește timpul de expirare a verificării sănătății la 15s pentru variantele cu pornire lentă -**VPS**: Instalați pachetele droid și openclaw npm; activați CLI_EXTRA_PATHS pentru kiro-cli -**cliRuntime**: adăugați înregistrarea instrumentului opencode și creșteți timpul de expirare pentru continuare## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Creșteți `healthcheckTimeoutMs` de la 4000ms la 15000ms — kilocode redă un banner cu sigla ASCII la pornire, provocând `healthcheck_failed` fals în medii cu pornire lentă/la rece## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Remediați eșecul `check:any-budget:t11` — înlocuiți `as any` cu `as Record<string, unknown>` în OAuthModal.tsx (3 apariții)### Docs

-**CLI-TOOLS.md**: Ghid complet pentru toate cele 11 instrumente CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md sincronizat cu 30 de limbi cu titlu tradus + introducere## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Noul punct final de finalizare OpenAI vechi — acceptă atât șirul „prompt” cât și matricea „mesaje”, se normalizează automat în formatul de chat -**EndpointPage**: acum afișează toate cele 3 tipuri de puncte finale compatibile cu OpenAI: Terminări de chat, API de răspunsuri și Terminări vechi -**i18n**: S-a adăugat `completionsLegacy/completionsLegacyDesc` la fișierele în 30 de limbi### Fixed

-**OAuthModal**: Remediați „[object Object]” afișat în toate erorile de conexiune OAuth — extrageți corect „.message” din obiectele de răspuns la erori în toate cele 3 apeluri „throw new Error(data.error)” (schimb, cod de dispozitiv, autorizare)

- Afectează Cline, Codex, GitHub, Qwen, Kiro și toți ceilalți furnizori OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: adăugați `decodeURIComponent` înainte de decodarea base64, astfel încât codurile de autentificare codificate în URL de la adresa URL de apel invers să fie analizate corect, reparând erorile „cod de autorizare invalid sau expirat” la setările de la distanță (IP LAN) -**Cline OAuth**: `mapTokens` populează acum `name = firstName + lastName || e-mail` astfel încât conturile Cline afișează nume de utilizator reale în loc de „Account #ID” -**Numele conturilor OAuth**: toate fluxurile de schimb OAuth (schimb, sondaj, sondaj-apel invers) normalizează acum „nume = e-mail” atunci când numele lipsește, astfel încât fiecare cont OAuth își arată e-mailul ca etichetă de afișare în tabloul de bord al furnizorilor -**Numele conturilor OAuth**: s-a eliminat secvențial „Cont N” alternativ în `db/providers.ts` — conturile fără e-mail/nume folosesc acum o etichetă stabilă bazată pe ID prin `getAccountDisplayName()` în loc de un număr secvenţial care se modifică atunci când conturile sunt șterse## [2.3.6] - 2026-03-12

### Fixed

-**Lot de testare a furnizorului**: S-a rezolvat schema Zod pentru a accepta `providerId: null` (front-end trimite null pentru modurile non-furnizor); a returnat incorect „Solicitare nevalidă” pentru toate testele lot -**Modal de testare a furnizorului**: S-a remediat afișarea `[object Object]` prin normalizarea obiectelor de eroare API la șiruri de caractere înainte de randare în `setTestResults` și `ProviderTestResultsView` -**i18n**: S-au adăugat cheile lipsă `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` la `en.json` -**i18n**: s-au sincronizat 1111 chei lipsă în toate cele 29 de fișiere în limba non-engleză, folosind valori în engleză ca alternative## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: A fost adăugată o corecție permanentă `postinstall` pentru a copia `@swc/helpers` în `node_modules` a aplicației autonome — previne blocarea MODULE_NOT_FOUND la instalările globale npm## [2.3.4] - 2026-03-10

### Added

- Integrari cu mai mulți furnizori și îmbunătățiri ale tabloului de bord
