# Changelog (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Risolto loop di reindirizzamento infinito sul dashboard per nuove istanze quando requireLogin è disabilitato.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Integrazione nativa dell'API Qoder:**Refactoring completo dell'Executor Qoder per bypassare l'algoritmo di crittografia COZY AES/RSA legacy, instradando direttamente nell'URL nativo compatibile con DashScope OpenAi. Elimina le dipendenze complesse dai moduli "crypto" del nodo migliorando al contempo la fedeltà del flusso. -**Revisione del motore di resilienza:**fallback integrati per l'overflow del contesto, rilevamento proattivo dei token OAuth e prevenzione delle emissioni di contenuti vuoti (#990). -**Strategia di routing ottimizzata per il contesto:**Aggiunta una nuova funzionalità di routing intelligente per massimizzare in modo nativo le finestre di contesto nelle distribuzioni combinate automatizzate (#990).### 🐛 Bug Fixes

-**Corruzione del flusso dell'API di risposta:**Risolto il problema della clonazione profonda in cui i confini della traduzione Anthropic/OpenAI rimuovevano i prefissi SSE specifici di `response.` dai confini dello streaming (#992). -**Allineamento Passthrough di Claude Cache:**Allineati gli indicatori di cache compatibili con CC in modo coerente con la modalità Passthrough del client upstream preservando la memorizzazione nella cache dei prompt. -**Perdita di memoria Turbopack:**Bloccato Next.js nel rigido `16.0.10` per prevenire perdite di memoria e creare obsolescenza a causa delle recenti regressioni del modulo hash Turbopack upstream (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integrazione Models.dev:**Models.dev integrato come fonte runtime autorevole per prezzi, funzionalità e specifiche dei modelli, sovrascrivendo i prezzi codificati. Include un'interfaccia utente delle impostazioni per gestire gli intervalli di sincronizzazione, stringhe di traduzione per tutte le 30 lingue e una solida copertura dei test. -**Funzionalità native del provider:**Aggiunto supporto per dichiarare e controllare le funzionalità API native (ad esempio `systemInstructions_supported`) prevenendo errori disinfettando i ruoli non validi. Attualmente configurato per i provider Gemini Base e Antigravity OAuth. -**Impostazioni avanzate del provider API:**Aggiunte sostituzioni personalizzate di "User-Agent" per connessione per le connessioni del provider di chiavi API. L'override è archiviato in "providerSpecificData.customUserAgent" e ora si applica ai sondaggi di convalida e alle richieste di esecuzione upstream.### 🐛 Bug Fixes

-**Affidabilità OAuth di Qwen:**Risolti una serie di problemi di integrazione OAuth tra cui un blocco 400 Bad Request su token scaduti, generazione di fallback per l'analisi delle proprietà OIDC "access_token" quando "id_token" viene omesso, errori di rilevamento del catalogo modelli e filtraggio rigoroso delle intestazioni "X-Dashscope-\*" per evitare il rifiuto 400 da endpoint compatibili con OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo e Routing:**Completata l'integrazione nativa del ciclo di vita CRUD per il motore avanzato Auto-Combo (#955). -**Operazioni principali:**Risolte le traduzioni mancanti per le nuove opzioni native di Auto-Combo (#955). -**Convalida della sicurezza:**Disabilitate le attività di backup automatico di SQLite in modo nativo durante l'esecuzione del CI di test unitario per risolvere in modo esplicito le perdite di memoria sospese del loop di eventi del nodo 22 (#956). -**Proxy dell'ecosistema:**completati gli scheduler di sincronizzazione del modello di mappatura dell'integrazione esplicita, i cicli OAuth e gli aggiornamenti di controllo token in modo sicuro tramite i proxy upstream del sistema nativo di OmniRoute (#953). -**Estensibilità MCP:**Aggiunto e registrato con successo il nuovo strumento framework MCP `omniroute_web_search` fuori versione beta negli schemi di produzione (#951). -**Logica del buffer dei token:**Aggiunti limiti di configurazione di runtime che estendono i buffer dei token di input/output configurabili per metriche precise di monitoraggio dell'utilizzo (#959).### 🐛 Bug Fixes

-**Rimedio CodeQL:**Operazioni di indicizzazione di stringhe critiche completamente risolte e protette che prevengono l'euristica di indicizzazione degli array SSRF (Server-Side Request Forgery) insieme al backtracking algoritmico polinomiale (ReDoS) all'interno dei moduli dispatcher proxy profondi. -**Hash crittografici:**sostituiti gli hash OAuth 1.0 legacy deboli e non verificati con robuste primitive di convalida standard HMAC-SHA-256 che garantiscono controlli di accesso rigorosi. -**Protezione dei confini dell'API:**Protezioni del percorso strutturale correttamente verificate e mappate che applicano la rigorosa logica del middleware `isAuthenticated()` che copre i nuovi endpoint dinamici mirati alla manipolazione delle impostazioni e al caricamento delle competenze native. -**Compatibilità ecosistema CLI:**Risolti i collegamenti non funzionanti del parser runtime nativo che bloccavano i rilevatori dell'ambiente `where` rigorosamente sui casi limite `.cmd/.exe` per i plugin esterni (#969). -**Architettura della cache:**Refactoring dell'esatta memorizzazione nella cache della struttura del layout dei parametri del dashboard di analisi e impostazioni di sistema per mantenere stabili i cicli di persistenza della reidratazione risolvendo i flash visivi dello stato non allineato (#952). -**Standard di memorizzazione nella cache di Claude:**Indicatori di blocchi critici effimeri rigorosamente normalizzati e accuratamente conservati Ordini TTL di memorizzazione nella cache "effimeri" per i nodi downstream che impongono la mappatura delle richieste CC compatibili con gli standard in modo pulito senza metriche eliminate (#948). -**Autenticazione alias interni:**Mappature runtime interne semplificate che normalizzano le ricerche del payload delle credenziali Codex all'interno dei parametri di traduzione globali risolvendo 401 drop non autenticati (#958).### 🛠️ Maintenance

-**Individuabilità dell'interfaccia utente:**categorizzazioni del layout corrette che separano esplicitamente la logica dei fornitori del livello gratuito migliorando i flussi di ordinamento UX all'interno delle pagine generali del registro API (#950). -**Topologia di distribuzione:**artefatti di distribuzione Docker unificati che garantiscono che la radice "fly.toml" corrisponda immediatamente ai parametri previsti dell'istanza cloud, gestendo in modo nativo le distribuzioni automatizzate con il corretto dimensionamento. -**Strumenti di sviluppo:**parametri di runtime `LKGP` disaccoppiati in utilità di caching esplicite di astrazione del livello DB che garantiscono una rigorosa copertura di isolamento dei test per i livelli di caching principali in modo sicuro.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Pannello Dashboard Auto-Combo:**completamente rifattorizzata l'interfaccia utente `/dashboard/auto-combo` per integrarsi perfettamente con le Dashboard Card native e con imbottiture/intestazioni visive standardizzate. Aggiunte barre di avanzamento visive dinamiche che mappano i meccanismi di peso della selezione del modello. -**Sincronizzazione del routing delle impostazioni:**bersagli dello schema "prioritario" e "ponderato" di routing avanzato completamente esposti internamente all'interno degli elenchi di fallback delle impostazioni globali.### Bug Fixes

-**Nodi locali di memoria e competenze:**Risolti i tag di rendering vuoti per le opzioni di memoria e competenze direttamente all'interno delle visualizzazioni delle impostazioni globali collegando tutti i valori di mappatura `settings.*` internamente in `en.json` (mappati anche implicitamente per gli strumenti di traduzione incrociata).### Internal Integrations

- PR n. 946 integrato: correzione: preserva la compatibilità del codice Claude nella conversione delle risposte
- PR integrato n. 944 - correzione (gemini): preserva le firme dei pensieri durante le chiamate degli strumenti antigravità
- PR n. 943 integrato: correzione: ripristino del corpo di GitHub Copilot
- PR n. 942 integrato: corretti i marcatori di cache compatibili con cc
- PR n. 941 integrato: refactor (autenticazione): migliora la ricerca dell'alias NVIDIA + aggiunge la registrazione degli errori LKGP
- PR n. 939 integrato: ripristina la gestione del callback dell'host locale Claude OAuth
- _(Nota: il PR n. 934 è stato omesso dal ciclo 3.4.9 per prevenire regressioni dei conflitti fondamentali)_---

## [3.4.8] — 2026-04-03

### Sicurezza

- Risolti completamente tutti i risultati in sospeso di Github Advanced Security (CodeQL) e gli avvisi di Dependabot.
- Fixed insecure randomness vulnerabilities by migrating from `Math.random` to `crypto.randomUUID()`.
- Comandi shell protetti in script automatizzati dall'iniezione di stringhe.
- Migrazione dei modelli di analisi RegEx di backtracking catastrofico vulnerabile nelle pipeline di chat/traduzione.
- Controlli migliorati sulla sanificazione dell'output all'interno dei componenti dell'interfaccia utente di React e sull'iniezione di tag SSE (Server Sent Events).---

## [3.4.7] — 2026-04-03

### Funzionalità

- Aggiunto il nodo "Crittografia" al monitoraggio e ai controlli di salute MCP (#798)
- Mappatura rafforzata dei permessi del percorso del catalogo modelli (`/models`) (#781)### Bug Fixes

- Risolto il problema con l'aggiornamento del token Claude OAuth che non riusciva a preservare i contesti della cache (#937)
- Risolti gli errori del provider compatibile con CC che rendevano irraggiungibili i modelli memorizzati nella cache (#937)
- Risolti errori di GitHub Executor relativi a array di contesto non validi (#937)
- Risolti gli errori di controllo dello stato degli strumenti CLI installati da NPM su Windows (#935)
- Risolto il problema con la traduzione del payload che eliminava contenuti validi a causa di campi API non validi (#927)
- Risolto crash di runtime nel Nodo 25 relativo all'esecuzione della chiave API (#867)
- Risolta la risoluzione del modulo autonomo MCP (`ERR_MODULE_NOT_FOUND`) tramite `esbuild` (#936).
- Risolta la mancata corrispondenza dell'alias di risoluzione delle credenziali di routing NVIDIA NIM (#931)### Sicurezza

- Aggiunta una protezione rigorosa e sicura dei limiti di input contro le iniezioni di esecuzione di codice remoto "shell: true" non elaborate.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Fornitori:**registrati nuovi fornitori di immagini, video e generazione di audio dall'elenco richiesto dalla comunità (#926). -**Interfaccia utente dashboard:**aggiunta la navigazione autonoma nella barra laterale per i nuovi moduli Memoria e Abilità (#926). -**i18n:**Added translation strings and layout mappings across 30 languages for the Memory and Skills namespaces.### 🐛 Bug Fixes

-**Resilienza:**ha impedito che l'interruttore proxy del circuito rimanesse bloccato in uno stato APERTO per un tempo indefinito gestendo le transizioni dirette allo stato CHIUSO all'interno dei percorsi combinati di fallback (#930). -**Traduzione del protocollo:**patchato il trasformatore di streaming per disinfettare i blocchi di risposta in base al protocollo _source_ previsto anziché al protocollo _target_ del provider, risolvendo i modelli Anthropics racchiusi nei payload OpenAI che causavano l'arresto anomalo del codice Claude (#929). -**Specifiche API e Gemini:**Risolto il problema con l'analisi di `thinked_signature` nei traduttori `openai-to-gemini` e `claude-to-gemini`, prevenendo errori HTTP 400 in tutte le chiamate agli strumenti API Gemini 3. -**Provider:**ripuliti gli endpoint non compatibili con OpenAI che impedivano connessioni upstream valide (#926). -**Cache Trends:**Fixed an invalid property mapping data mismatch causing Cache Trends UI charts to crash, and extracted redundant cache metric widgets (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integrazione dell'ecosistema CLIProxyAPI:**aggiunto l'esecutore `cliproxyapi` con caching a livello di modulo integrato e routing proxy. Introdotto un servizio completo di gestione delle versioni per testare automaticamente l'integrità, scaricare file binari da GitHub, generare processi in background isolati e gestire in modo pulito il ciclo di vita degli strumenti CLI esterni direttamente tramite l'interfaccia utente. Include tabelle DB per la configurazione proxy per abilitare il routing incrociato automatico con controllo SSRF di richieste OpenAI esterne tramite il livello dello strumento CLI locale (#914, #915, #916). -**Supporto Qoder PAT:**Supporto PAT (Personal Access Tokens) integrato direttamente tramite il trasporto locale `qodercli` invece delle configurazioni del browser remoto `.cn` legacy (#913). -**Gemini 3.1 Pro Preview (GitHub):**Aggiunto il supporto del modello esplicito canonico `gemini-3.1-pro-preview` in modo nativo nel provider GitHub Copilot preservando gli alias di routing precedenti (#924).### 🐛 Bug Fixes

-**Stabilità token Copilot GitHub:**Riparato il ciclo di aggiornamento dei token Copilot in cui i token obsoleti non venivano integrati nel DB e rimossi i campi `reasoning_text` che interrompevano fatalmente le conversioni dei blocchi antropici downstream per le chat multi-turno (#923). -**Matrice di timeout globale:**Timeout delle richieste centralizzate e parametrizzate esplicitamente da `REQUEST_TIMEOUT_MS` per evitare che i buffer di recupero predefiniti nascosti (~300 s) interrompano prematuramente le risposte di streaming SSE di lunga durata da modelli di ragionamento pesanti (#918). -**Stato dei tunnel rapidi di Cloudflare:**Risolta una grave incoerenza di stato in cui le istanze OmniRoute riavviate mostravano erroneamente i tunnel distrutti come attivi e il tunneling cloudflared predefinito era "HTTP/2" per eliminare lo spam del log del buffer di ricezione UDP (#925). -**Revisione della traduzione i18n (ceco e hindi):**Risolto il problema con il codice hindi da "in.json" DEPRECATO a "hi.json" canonico, revisionate le mappature del testo ceco, estratto "untranslatable-keys.json" per correggere le convalide di falsi positivi CI/CD e generati documenti "I18N.md" completi per guidare i traduttori (#912). -**Ripristino del provider di token:**risolto il problema per cui Qwen perdeva endpoint `resourceUrl` specifici dopo l'aggiornamento automatico del token di controllo dello stato a causa della mancanza di unioni profonde di DB (#917). -**UX e streaming compatibili con CC:**unificate le azioni Aggiungi CC/OpenAI/compatibili con Anthropic attorno al trattamento dell'interfaccia utente di Anthropic, forzato le richieste upstream compatibili con CC a utilizzare SSE continuando a restituire risposte in streaming o non streaming in base alla richiesta del client, rimosso il supporto di configurazione/importazione dell'elenco di modelli CC in favore di un errore esplicito di elenco di modelli non supportato e reso i modelli disponibili compatibili con CC rispecchiano l'elenco di registro del codice OAuth Claude (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Report sui token API di risposta:**emette `response.completed` con i campi `input_tokens`/`output_tokens` corretti per i client CLI Codex, correggendo la visualizzazione dell'utilizzo dei token (#909 — grazie @christopher-s). -**Checkpoint WAL SQLite allo spegnimento:**scarica le modifiche WAL nel file del database primario durante l'arresto/riavvio regolare, prevenendo la perdita di dati agli arresti del contenitore Docker (#905 — grazie @rdself). -**Segnale di spegnimento ordinato:**Modificati i percorsi `/api/restart` e `/api/shutdown` da `process.exit(0)` a `process.kill(SIGTERM)`, assicurando che il gestore di spegnimento venga eseguito prima dell'uscita. -**Docker Stop Grace Period:**Aggiunto `stop_grace_period: 40s` ai file Docker Compose e `--stop-timeout 40` agli esempi di esecuzione Docker.### 🛠️ Maintenance

- Chiusi 5 problemi risolti/non-bug (#872, #814, #816, #890, #877).
- Valutato 6 problemi con richieste di informazioni sui bisogni (#892, #887, #886, #865, #895, #870).
- Risposta al problema di tracciamento del rilevamento della CLI (n. 863) con le indicazioni del collaboratore.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memoria e competenze antigravità:**completata l'iniezione di memoria remota e competenze per il provider Antigravità a livello di rete proxy. -**Compatibilità con il codice Claude:**creato un bridge di compatibilità nascosto in modo nativo per Claude Code, passando strumenti e formattazione in modo pulito. -**Web Search MCP:**Aggiunto lo strumento `omniroute_web_search` con l'ambito `execute:search`. -**Componenti della cache:**Implementati componenti della cache dinamica che utilizzano TDD. -**UI e personalizzazione:**aggiunto supporto favicon personalizzato, schede di aspetto, whitelabeling cablato sulla barra laterale e aggiunti passaggi della guida Windsurf in tutte le 33 lingue. -**Conservazione dei registri:**Conservazione unificata dei registri delle richieste e degli artefatti in modo nativo. -**Miglioramenti del modello:**Aggiunto `contextLength` esplicito per tutti i modelli opencode-zen. -**i18n e traduzioni:**Traduzioni in 33 lingue integrate in modo nativo, comprese convalide CI segnaposto e aggiornamenti della documentazione cinese (#873, #869).### 🐛 Bug Fixes

-**Mappatura OAuth Qwen:**Ripristinata la dipendenza da `id_token` a `access_token` e abilitata l'iniezione dinamica dell'endpoint API `resource_url` per il corretto routing regionale (#900). -**Motore di sincronizzazione del modello:**memorizzato il rigoroso ID provider interno nelle routine di sincronizzazione `getCustomModels()` invece del formato dell'alias del canale dell'interfaccia utente, prevenendo errori di inserimento del catalogo SQLite (#903). -**Codice e Codex Claude:**Risposte vuote standardizzate non in streaming a "(risposta vuota)" in formato Anthropic per evitare arresti anomali del proxy CLI (#866). -**Instradamento compatibile CC:**Risolta la collisione duplicata dell'endpoint `/v1` durante la concatenazione del percorso per i gateway Claude Code generici (#904). -**Dashboard antigravità:**è stato impedito ai modelli con quota illimitata di registrarsi erroneamente come stati limite di "Utilizzo al 100%" esauriti nell'interfaccia utente di utilizzo del provider (#857). -**Passthrough immagine Claude:**Risolto il problema per cui nei modelli Claude mancavano i passthrough del blocco immagine (#898). -**Instradamento CLI Gemini:**Risolti 403 blocchi di autorizzazione e problemi di accumulo di contenuti aggiornando l'ID progetto tramite "loadCodeAssist" (#868). -**Stabilità antigravità:**elenchi di accesso ai modelli corretti, blocchi 404 applicati, cascate 429 bloccate che bloccano le connessioni standard e token di output `gemini-3.1-pro` limitati (#885). -**Cadenza di sincronizzazione del provider:**Risolto il problema relativo ai limiti della cadenza di sincronizzazione del provider tramite lo scheduler interno (#888). -**Ottimizzazione del dashboard:**Risolto il blocco dell'interfaccia utente di `/dashboard/limits` durante l'elaborazione di oltre 70 account tramite parallelizzazione di blocchi (#784). -**Potenziamento SSRF:**applicato un rigoroso filtraggio dell'intervallo IP SSRF e bloccato l'interfaccia di loopback `::1`. -**Tipi MIME:**`mime_type` standardizzato in snake_case per corrispondere alle specifiche dell'API Gemini. -**Stabilizzazione CI:**Risolti problemi di analisi/impostazioni dei selettori del drammaturgo e delle asserzioni delle richieste in modo che le esecuzioni di GitHub Actions E2E passino in modo affidabile attraverso le interfacce utente localizzate e i controlli basati su switch. -**Test deterministici:**rimossi gli elementi di quota sensibili alla data dai test di utilizzo di Copilot e allineati i test di idempotenza/catalogo dei modelli con il comportamento di runtime unito. -**Indurimento del tipo MCP:**rimosse le regressioni esplicite "qualsiasi" a budget zero dal percorso di registrazione dello strumento server MCP. -**Motore di sincronizzazione modelli:**Ignorati gli override distruttivi di "sostituzione" quando la sincronizzazione automatica del provider produce un elenco di modelli vuoto, mantenendo la stabilità per i cataloghi dinamici (#899).### 🛠️ Maintenance

-**Registrazione della pipeline:**perfezionamento degli artefatti di registrazione della pipeline e applicazione dei limiti di conservazione (#880). -**AGENTS.md Revisione:**condensato da 297→153 righe. Aggiunte linee guida per build/test/stile, flussi di lavoro del codice (Prettier, TypeScript, ESLint) e tabelle dettagliate ritagliate (#882). -**Integrazione dei rami di rilascio:**consolidati i rami delle funzionalità attive in "release/v3.4.2" sopra l'attuale "main" e convalidato il ramo con lint, unità, copertura, build ed esecuzioni E2E in modalità CI. -**Test:**aggiunta la configurazione Vitest per il test dei componenti e le specifiche di Playwright per attivare/disattivare le impostazioni. -**Aggiornamenti documenti:**Leggimi root espansi, traduzione nativa di documenti cinesi e ripulitura di file obsoleti.## [3.4.1] - 2026-03-31

> [!ATTENZIONE]
> **MODIFICA IMPORTANTE: le variabili di ambiente di registrazione, conservazione e registrazione delle richieste sono state riprogettate.**
> Al primo avvio dopo l'aggiornamento, OmniRoute archivia i registri delle richieste legacy da `DATA_DIR/logs/`, `DATA_DIR/call_logs/` legacy e `DATA_DIR/log.txt` in `DATA_DIR/log_archives/*.zip`, quindi rimuove il layout obsoleto e passa al nuovo formato artefatto unificato in `DATA_DIR/call_logs/`.### ✨ New Features

-**Utilità di migrazione .ENV:**Incluso `scripts/migrate-env.mjs` per migrare senza problemi le configurazioni `<v3.3` ai rigidi vincoli di convalida di sicurezza `v3.4.x` (FASE-01), riparando i crash di avvio causati da brevi istanze `JWT_SECRET`. -**Ottimizzazione della cache AI ​​Kiro:**Implementata la generazione deterministica di `conversationId` (uuidv5) per abilitare correttamente la memorizzazione nella cache dei prompt dell'ID di AWS Builder tra le invocazioni (#814). -**Ripristino e consolidamento dell'interfaccia utente del dashboard:**Risolta la logica della barra laterale che ometteva la sezione Debug e cancellati gli avvisi di routing di Nextjs spostando esplicitamente le pagine `/dashboard/mcp` e `/dashboard/a2a` autonome nei componenti dell'interfaccia utente Endpoint Proxy incorporati. -**Artefatti del registro delle richieste unificate:**la registrazione delle richieste ora memorizza una riga dell'indice SQLite più un artefatto JSON per richiesta in "DATA_DIR/call_logs/", con l'acquisizione opzionale della pipeline incorporata nello stesso file. -**Lingua:**Migliorata la traduzione cinese (#855) -**Modelli Opencode-Zen:**Aggiunti 4 modelli gratuiti al registro opencode-zen (#854) -**Test:**Aggiunti test unità ed E2E per la commutazione delle impostazioni e le correzioni di bug (#850)### 🐛 Bug Fixes

-**Analisi quota 429:**Analizzati tempi lunghi di reimpostazione della quota dai corpi di errore per onorare i backoff corretti e prevenire ban di account con velocità limitata (#859) -**Richiesta memorizzazione nella cache:**Intestazioni `cache_control` del client preservate per tutti i provider del protocollo Claude (come Minimax, GLM e Bailian), riconoscendo correttamente il supporto della memorizzazione nella cache (#856) -**Log di sincronizzazione dei modelli:**Ridotto lo spam nei log registrando i "modelli di sincronizzazione" solo quando il canale modifica effettivamente l'elenco (#853) -**Quota provider e analisi token:**Limiti antigravità modificati per utilizzare `retrieveUserQuota` in modo nativo e mappare correttamente i payload di aggiornamento del token Claude in moduli con codifica URL (#862) -**Stabilità di limitazione della velocità:**universalizzata l'architettura di analisi 429 Retry-After per limitare i tempi di recupero indotti dal provider a un massimo di 24 ore (#862) -**Rendering dei limiti del dashboard:**Mappatura delle quote `/dashboard/limits` riprogettata per eseguire il rendering immediato all'interno dei blocchi, risolvendo un grave ritardo di blocco dell'interfaccia utente sugli account che superano le 70 connessioni attive (#784) -**Autorizzazione OAuth QWEN:**Mappato "id_token" OIDC come token API Bearer principale per le richieste Dashscope, correggendo gli errori 401 non autorizzati immediati dopo la connessione degli account o l'aggiornamento dei token (#864) -**Stabilità API ZAI:**Compilatore rafforzato degli eventi inviati dal server per eseguire il fallback su stringhe vuote quando i provider DeepSeek trasmettono contenuti matematicamente nulli durante le fasi di ragionamento (#871) -**Traduzioni codice Claude/Codex:**Conversioni di payload non streaming protette contro risposte vuote dagli strumenti Codex upstream, evitando catastrofici TypeErrors (#866) -**Rendering NVIDIA NIM:**Prefissi identici dei provider rimossi in modo condizionale e spinti dinamicamente dai modelli audio, eliminando le strutture di tag `nim/nim` duplicate che lanciano 404 su Media Playground (#872)### ⚠️ Breaking Changes

-**Layout del registro delle richieste:**sono state rimosse le vecchie sessioni di registro delle richieste multi-file `DATA_DIR/logs/` e il file di riepilogo `DATA_DIR/log.txt`. Le nuove richieste vengono scritte come singoli artefatti JSON in `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Variabili di ambiente di registrazione:**Sostituiti `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` e `PROXY_LOG_MAX_ENTRIES` con il nuovo modello di configurazione `APP_LOG_*` e `CALL_LOG_RETENTION_DAYS`. -**Impostazione di attivazione/disattivazione pipeline:**Sostituita l'impostazione legacy `detailed_logs_enabled` con `call_log_pipeline_enabled`. I nuovi dettagli della pipeline sono incorporati nell'artefatto della richiesta invece di essere archiviati come record `request_detail_logs` separati.### 🛠️ Maintenance

-**Backup di aggiornamento del registro delle richieste legacy:**Gli aggiornamenti ora archiviano i vecchi layout `data/logs/`, `data/call_logs/` legacy e `data/log.txt` in `DATA_DIR/log_archives/*.zip` prima di rimuovere la struttura deprecata. -**Persistenza dell'utilizzo dello streaming:**le richieste di streaming ora scrivono una singola riga `usage_history` al completamento invece di emettere una riga di utilizzo in corso duplicata con metadati di stato vuoti. -**Pulizia di follow-up della registrazione:**i registri della pipeline non acquisiscono più "SOURCE REQUEST", le voci degli artefatti delle richieste ora rispettano "CALL_LOG_MAX_ENTRIES" e gli archivi dei registri delle applicazioni ora rispettano "APP_LOG_MAX_FILES".---

## [3.4.0] - 2026-03-31

### Funzionalità

-**Analisi sull'utilizzo dell'abbonamento:**Aggiunto il monitoraggio delle serie temporali dell'istantanea della quota, le schede Utilizzo del provider e Integrità combinata con visualizzazioni di grafici ed endpoint API corrispondenti (#847) -**Controllo backup SQLite:**Nuovo flag env `OMNIROUTE_DISABLE_AUTO_BACKUP` per disabilitare i backup automatici SQLite (#846) -**Aggiornamento del registro dei modelli:**Inserito `gpt-5.4-mini` nell'array di modelli del provider Codex (#756) -**Monitoraggio dei limiti del fornitore:**Tieni traccia e visualizza quando i limiti di tariffa del fornitore sono stati aggiornati l'ultima volta per account (#843)### 🐛 Bug Fixes

-**Instradamento autenticazione Qwen:**Reindirizzamento dei completamenti Qwen OAuth dall'API DashScope all'API Web Inference (`chat.qwen.ai`), risolvendo gli errori di autorizzazione (#844, #807, #832) -**Ciclo di tentativi automatici di Qwen:**Aggiunta la gestione mirata del backoff della quota 429 superata all'interno di `chatCore` che protegge le richieste di burst -**Codex OAuth Fallback:**il moderno blocco dei popup del browser non intrappola più l'utente; torna automaticamente all'immissione manuale dell'URL (#808) -**Aggiornamento token Claude:**i rigidi confini `application/json` di Anthropic vengono ora rispettati durante la generazione dei token invece degli URL codificati (#836) -**Schema dei messaggi del codice:**Eliminati i "messaggi" puristi inseriti dalle richieste passthrough native per evitare rifiuti strutturali dall'upstream ChatGPT (#806). -**Limite dimensione rilevamento CLI:**Aumentato in modo sicuro il limite superiore della scansione binaria del nodo da 100 MB a 350 MB, consentendo a strumenti autonomi pesanti come Claude Code (229 MB) e OpenCode (153 MB) di essere rilevati correttamente dal runtime VPS (#809) -**Ambiente runtime CLI:**capacità ripristinata per le configurazioni CLI di rispettare i percorsi di override dell'utente (`CLI_{PROVIDER}_BIN`) ignorando le rigide regole di rilevamento legate al percorso -**Conflitti di intestazioni Nvidia:**rimosse le proprietà `prompt_cache_key` dalle intestazioni upstream quando si chiamano provider non antropici (#848). -**Attivazione/disattivazione livello veloce del Codex:**è stato ripristinato il contrasto dell'attivazione/disattivazione del livello di servizio del Codex in modalità luce (#842) -**Infrastruttura di test:**Aggiornato il test `t28-model-catalog-updates` che prevedeva erroneamente l'endpoint DashScope obsoleto per il registro nativo Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotazione personalizzata dei provider:**Integrazione di `getRotatingApiKey` internamente all'interno di DefaultExecutor, garantendo che la rotazione di `extraApiKeys` venga attivata correttamente per i provider upstream personalizzati e compatibili (#815)---

## [3.3.8] - 2026-03-30

### Funzionalità

-**Filtro API modelli:**L'endpoint `/v1/models` ora filtra dinamicamente il proprio elenco in base alle autorizzazioni legate a `Autorizzazione: Bearer <token>` quando è attivo l'accesso limitato (#781) -**Integrazione Qoder:**Integrazione nativa per Qoder AI che sostituisce nativamente le mappature della piattaforma iFlow legacy (#660) -**Tracciamento della cache dei prompt:**Aggiunte funzionalità di tracciamento e visualizzazione frontend (scheda Statistiche) per la memorizzazione nella cache semantica e dei prompt nell'interfaccia utente della dashboard### 🐛 Bug Fixes

-**Ridimensionamento della dashboard della cache:**migliorate le dimensioni del layout dell'interfaccia utente e le intestazioni di contesto per le pagine della cache avanzate (#835) -**Visibilità della barra laterale di debug:**Risolto un problema per cui l'interruttore di debug non mostrava/nascondeva correttamente i dettagli di debug della barra laterale (#834) -**Prefisso del modello Gemini:**Modificato il fallback dello spazio dei nomi per instradare correttamente tramite `gemini-cli/` anziché `gc/` per rispettare le specifiche upstream (#831) -**OpenRouter Sync:**Migliorata la sincronizzazione della compatibilità per acquisire automaticamente e correttamente il catalogo dei modelli disponibili da OpenRouter (#830) -**Mappatura dei payload in streaming:**La riserializzazione dei campi di ragionamento risolve in modo nativo i percorsi degli alias in conflitto quando l'output viene trasmesso in streaming ai dispositivi edge---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**Configurazione OpenCode:**Ristrutturato il file "opencode.json" generato per utilizzare lo schema basato su record "@ai-sdk/openai-compatibili" con "opzioni" e "modelli" come mappe di oggetti anziché array piatti, risolvendo gli errori di convalida della configurazione (#816) -**Chiavi mancanti i18n:**Aggiunta la chiave di traduzione `cloudflaredUrlNotice` mancante in tutti i 30 file di lingua per prevenire errori della console `MISSING_MESSAGE` nella pagina Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Contabilità token:**Inclusi i token della cache dei prompt in modo sicuro nei calcoli degli input di utilizzo storico per le corrette detrazioni delle quote (PR n. 822) -**Sonde di test combinati:**Risolti i falsi negativi della logica dei test combinati risolvendo l'analisi per le risposte di solo ragionamento e abilitando la parallelizzazione massiccia tramite Promise.all (PR #828) -**Docker Quick Tunnels:**certificati ca richiesti incorporati all'interno del contenitore di runtime di base per risolvere gli errori di avvio di Cloudflared TLS e gli errori di rete stdout emersi che sostituiscono i codici di uscita generici (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Monitoraggio delle quote Gemini:**Aggiunto il monitoraggio delle quote della CLI Gemini in tempo reale tramite l'API `retrieveUserQuota` (PR #825) -**Dashboard della cache:**migliorato il Dashboard della cache per visualizzare i parametri della cache dei prompt, le tendenze 24 ore e il risparmio sui costi stimato (PR n. 824)### 🐛 Bug Fixes

-**Esperienza utente:**Rimossi i loop modali OAuth invasivi con apertura automatica sulle pagine dettagliate dei provider sterili (PR n. 820) -**Aggiornamenti alle dipendenze:**Dipendenze migliorate e bloccate per alberi di sviluppo e produzione tra cui Next.js 16.2.1, Recharts e TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

- **A2A Workflows:** Added deterministic FSM orchestrator for multi-step agent workflows.
- **Graceful Degradation:** Added a new multi-layer fallback framework to preserve core functionality during partial system outages.
- **Config Audit:** Added an audit trail with diff detection to track changes and enable configuration rollbacks.
- **Provider Health:** Added provider expiration tracking with proactive UI alerts for expiring API keys.
- **Adaptive Routing:** Added an adaptive volume and complexity detector to override routing strategies dynamically based on load.
- **Provider Diversity:** Implemented provider diversity scoring via Shannon entropy to improve load distribution.
- **Auto-Disable Bounds:** Added an Auto-Disable Banned Accounts setting toggle to the Resilience dashboard.

### 🐛 Bug Fixes

-**Compatibilità Codex e Claude:**Risolti i fallback dell'interfaccia utente, corretti i problemi di integrazione non streaming del Codex e risolto il rilevamento del runtime della CLI su Windows. -**Automazione del rilascio:**Autorizzazioni estese richieste per la build dell'app Electron in GitHub Actions. -**Cloudflare Runtime:**Risolti i codici di uscita corretti di isolamento del runtime per i componenti del tunnel Cloudflared.### 🧪 Tests

-**Aggiornamenti della suite di test:**copertura dei test estesa per rilevatori di volume, diversità dei provider, verifica della configurazione e FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Affidabilità CI/CD:**Azioni GitHub patchate per versioni di dipendenza stabili (`actions/checkout@v4`, `actions/upload-artifact@v4`) per mitigare le deprecazioni non annunciate dell'ambiente builder. -**Fallback di immagini:**sostituite le catene di fallback arbitrarie in "ProviderIcon.tsx" con una convalida esplicita delle risorse per impedire il caricamento dell'interfaccia utente dei componenti "<Image>" per file che non esistono, eliminando gli errori "404" nei log della console del dashboard (#745). -**Admin Updater:**Dynamic source-installation detection for the dashboard Updater. Safely disables the `Update Now` button when OmniRoute is built locally rather than through npm, prompting for `git pull` (#743). -**Errore ERESOLVE di aggiornamento:**Inserito `package.json` sostituisce `react`/`react-dom` e abilitato `--legacy-peer-deps` negli script interni di aggiornamento automatico per risolvere i conflitti dell'albero delle dipendenze con `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Tunnel Cloudflare:**Integrazione di Cloudflare Quick Tunnel con controlli dashboard (PR n. 772). -**Diagnostica:**Bypass della cache semantica per test live combinati (PR n. 773).### 🐛 Bug Fixes

-**Stabilità dello streaming:**applica `FETCH_TIMEOUT_MS` alla chiamata iniziale `fetch()` delle richieste di streaming per evitare che il timeout TCP di Node.js 300 s causi errori delle attività silenziose (#769). -**i18n:**Aggiunte le voci mancanti `windsurf` e `copilot` a `toolDescriptions` in tutti i 33 file locali (#748). -**Verifica della codifica GLM:**Verifica completa del fornitore che risolve le vulnerabilità ReDoS, il dimensionamento della finestra di contesto (128k/16k) e la sincronizzazione del registro dei modelli (PR n. 778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**Codice OpenAI:**Correzione dell'elaborazione di fallback per elementi `type: "text"` che trasportavano set di dati nulli o vuoti che causavano il rifiuto 400 (#742). -**Opencode:**Aggiorna l'allineamento dello schema al "provider" singolare per corrispondere alle specifiche ufficiali (#774). -**Gemini CLI:**inserisce intestazioni di quota dell'utente finale mancanti che impediscono i blocchi di autorizzazione 403 (#775). -**Recupero DB:**Refactoring delle importazioni di payload multiparte in array binari non elaborati con buffer per bypassare i limiti massimi del corpo del proxy inverso (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilizzazione del rilascio**: rilascio v3.2.9 finalizzato (diagnostica combinata, controlli di qualità, correzione dello strumento Gemini) e creazione del tag git mancante. Consolidate tutte le modifiche graduali in un unico commit di rilascio atomico.### 🐛 Bug Fixes

-**Test di aggiornamento automatico**— Risolto il problema con l'asserzione di test `buildDockerComposeUpdateScript` per far corrispondere i riferimenti alle variabili della shell non espanse (`$TARGET_TAG`, `${TARGET_TAG#v}`) nello script di distribuzione generato, allineandosi con il modello rifattorizzato dalla v3.2.8. -**Circuit Breaker Test**— Rafforzato `combo-circuit-breaker.test.mjs` inserendo `maxRetries: 0` per evitare che l'inflazione dei tentativi distorca le asserzioni del conteggio degli errori durante le transizioni dello stato dell'interruttore.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**: introdotto un flag di bypass del test in tempo reale (`forceLiveComboTest`) che consente agli amministratori di eseguire controlli di integrità reali a monte che ignorano tutti gli interruttori automatici locali e i meccanismi di stato di raffreddamento, consentendo una diagnostica precisa durante le interruzioni di corrente (PR n. 759) -**Quality Gate**: aggiunta la convalida automatizzata della qualità della risposta per le combo e il supporto del modello `claude-4.6` ufficialmente integrato negli schemi di routing principali (PR #762)### 🐛 Bug Fixes

-**Convalida della definizione dello strumento**: corretta l'integrazione dell'API Gemini normalizzando i tipi di enumerazione all'interno delle definizioni dello strumento, prevenendo errori dei parametri HTTP 400 upstream (PR n. 760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfaccia utente di aggiornamento automatico Docker**: integrato un processo di aggiornamento in background separato per le distribuzioni Docker Compose. The Dashboard UI now seamlessly tracks update lifecycle events combining JSON REST responses with SSE streaming progress overlays for robust cross-environment reliability. -**Cache Analytics**— Repaired zero-metrics visualization mapping by migrating Semantic Cache telemetry logs directly into the centralized tracking SQLite module.### 🐛 Bug Fixes

-**Logica di autenticazione**: risolto un bug per cui il salvataggio delle impostazioni del dashboard o l'aggiunta di modelli non riusciva con un errore 401 Non autorizzato quando `requireLogin` era disabilitato. Gli endpoint API ora valutano correttamente l'attivazione/disattivazione dell'autenticazione globale. Risolto il reindirizzamento globale riattivando `src/middleware.ts`. -**Rilevamento strumento CLI (Windows)**— Impedisce eccezioni irreversibili di inizializzazione durante il rilevamento dell'ambiente CLI rilevando correttamente gli errori ENOENT `cross-spawn`. Aggiunge percorsi di rilevamento espliciti per `\AppData\Local\droid\droid.exe`. -**Passthrough nativo del Codex**: parametri di traduzione del modello normalizzati che impediscono l'avvelenamento del contesto in modalità passthrough proxy, applicando esplicitamente i vincoli generici "store: false" per tutte le richieste originate dal Codex. -**Report sui token SSE**: rilevamento normalizzato del blocco `finish_reason` della chiamata allo strumento del provider, correzione dell'analisi dell'utilizzo dello 0% per le risposte solo streaming prive di indicatori "<DONE>" rigorosi. -**Tag <think> di DeepSeek**— Implementata una mappatura esplicita di estrazione di `<think>` all'interno di `responsesHandler.ts`, garantendo che i flussi di ragionamento di DeepSeek siano mappati in modo equivalente alle strutture `<thinking>` antropiche native.---

## [3.2.7] - 2026-03-29

### Fixed

-**Aggiornamenti semplici dell'interfaccia utente**: la funzione "Aggiorna ora" sulla dashboard ora fornisce feedback in tempo reale e trasparenti utilizzando gli eventi inviati dal server (SSE). Esegue l'installazione dei pacchetti, la ricostruzione dei moduli nativi (better-sqlite3) e PM2 si riavvia in modo affidabile mostrando caricatori in tempo reale invece di bloccarsi silenziosamente.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Rivelazione chiave API (#740)**— Aggiunto un flusso di copia della chiave API con ambito nel Gestore API, protetto dalla variabile di ambiente `ALLOW_API_KEY_REVEAL`. -**Controlli di visibilità della barra laterale (#739)**: gli amministratori ora possono nascondere qualsiasi collegamento di navigazione della barra laterale tramite le impostazioni di Aspetto per ridurre l'ingombro visivo. -**Test combinato rigoroso (#735)**: rafforzato l'endpoint del controllo dello stato della combo per richiedere risposte di testo in tempo reale dai modelli invece di semplici segnali di raggiungibilità. -**Registri dettagliati in streaming (#734)**: modificato il registro dettagliato delle richieste per i flussi SSE per ricostruire il payload finale, risparmiando enormi quantità di dimensioni del database SQLite e ripulendo in modo significativo l'interfaccia utente.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Corretta la logica dell'intestazione di autenticazione per i modelli "minimax" su OpenCode Go per utilizzare "x-api-key" invece dei token di connessione standard nel protocollo "/messages".---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Modello di packaging `xbps-src` integrato e istruzioni per compilare e installare in modo nativo OmniRoute con collegamenti `better-sqlite3` tramite target di compilazione incrociata.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Migrazione Qoder AI (#660)**: migrazione completa del provider principale legacy `iFlow` su `Qoder AI` mantenendo funzionalità di routing API stabili.### 🐛 Bug Fixes

-**Argomento non valido del payload HTTP 400 di Gemini Tools (#731)**: impedito l'inserimento di array `thinkSignature` all'interno delle sequenze Gemini `functionCall` standard che bloccavano i flussi di routing degli agenti.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfaccia utente quota limiti provider (#728)**: logica del limite quota normalizzata ed etichettatura dei dati all'interno dell'interfaccia Limiti.### 🐛 Bug Fixes

-**Schemi e perdite di routing principali**: `comboStrategySchema` espanso per supportare in modo nativo le strategie `fill-first` e `p2c` per sbloccare la modifica combinata complessa in modo nativo. -**Thinking Tags Extraction (CLI)**— Risposte token CLI ristrutturate disinfettano RegEx catturando le strutture di ragionamento del modello all'interno dei flussi evitando estrazioni "<thinking>" interrotte che interrompono il formato di output del testo della risposta. -**Applicazioni rigorose dei formati**: esecuzione rafforzata della sanificazione della pipeline che la rende applicabile universalmente agli obiettivi della modalità di traduzione.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Pipeline del registro delle richieste in quattro fasi (#705)**: refactoring della persistenza del registro per salvare payload completi in quattro fasi distinte della pipeline: richiesta del cliente, richiesta del fornitore tradotto, risposta del fornitore e risposta del cliente tradotto. Introdotto "streamPayloadCollector" per un robusto troncamento del flusso SSE e la serializzazione del payload.### 🐛 Bug Fixes

-**Correzioni dell'interfaccia utente mobile (#659)**— Impedisce ai componenti della tabella sul dashboard di interrompere il layout su finestre strette aggiungendo lo scorrimento orizzontale corretto e il contenimento dell'overflow a `DashboardLayout`. -**Correzioni di Claude Prompt Cache (#708)**— Garantito che i blocchi `cache_control` nei loop di fallback da Claude a Claude siano conservati fedelmente e passati in modo sicuro ai modelli antropici. -**Definizioni strumento Gemini (#725)**— Risolti errori di traduzione dello schema durante la dichiarazione di tipi di parametri semplici "oggetto" per la chiamata della funzione Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Provider di fallback globale (#689)**: quando tutti i modelli combinati sono esauriti (502/503), OmniRoute ora tenta un modello di fallback globale configurabile prima di restituire l'errore. Imposta "globalFallbackModel" nelle impostazioni per abilitare.### 🐛 Bug Fixes

-**Correzione #721**— Risolto il problema relativo al bypass del blocco del contesto durante le risposte alle chiamate allo strumento. Il tagging non streaming utilizzava un percorso JSON errato (`json.messages` → `json.choices[0].message`). L'inserimento dello streaming ora si attiva sui blocchi "finish_reason" per i flussi di sole chiamate allo strumento. `injectModelTag()` ora aggiunge messaggi pin sintetici per contenuti non di tipo stringa. -**Correzione #709**— Confermato già corretto (v3.1.9) — `system-info.mjs` crea directory in modo ricorsivo. Chiuso. -**Correzione #707**— Confermata già corretta (v3.1.9) — Sanificazione del nome dello strumento vuoto in `chatCore.ts`. Chiuso.### 🧪 Tests

- Aggiunti 6 unit test per il blocco del contesto con risposte alle chiamate agli strumenti (contenuto nullo, contenuto dell'array, andata e ritorno, re-iniezione)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Interfaccia utente di gestione della cache**: aggiunta una dashboard dedicata alla memorizzazione nella cache semantica in \`/dashboard/cache\` con invalidazione API mirata e supporto i18n in 31 lingue (PR n. 701 di @oyi77) -**Tracciamento quota GLM**: aggiunto il monitoraggio dell'utilizzo in tempo reale e della quota della sessione per il provider GLM Coding (Z.AI) (PR n. 698 di @christopher-s) -**Payload di registro dettagliati**: acquisizione cablata del payload completo della pipeline in quattro fasi (originale, tradotto, risposta del fornitore, delta in streaming) direttamente nell'interfaccia utente (PR n. 705 di @rdself)### 🐛 Bug Fixes

-**Correzione #708**: impedimento del tokenbleed per gli utenti di Claude Code che instradano tramite OmniRoute preservando correttamente le intestazioni \`cache_control\` native durante il passthrough Claude-to-Claude (PR #708 di @tombii) -**Correzione #719**— Imposta i limiti di autenticazione interni per \`ModelSyncScheduler\` per prevenire errori del demone non autenticato all'avvio (PR #719 di @rdself) -**Correzione n. 718**: rendering del badge ricostruito nell'interfaccia utente dei limiti del fornitore per evitare sovrapposizioni errate dei limiti delle quote (PR n. 718 di @rdself) -**Correzione #704**— Risolti i fallback combinati che interrompevano gli errori di policy dei contenuti HTTP 400 che impedivano il dead-routing della rotazione del modello (PR #704 di @rdself)### 🔒 Security & Dependencies

- \`path-to-regexp\` aggiornato a \`8.4.0\` per risolvere le vulnerabilità di dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Correzione #706**— Risolto il problema con il rendering di fallback delle icone causato dall'override di `font-sans` di Tailwind V4 applicando `!important` a `.material-symbols-outlined`. -**Correzione #703**— Risolti i problemi relativi ai flussi di GitHub Copilot interrotti abilitando "risposte" alla traduzione del formato "openai" per qualsiasi modello personalizzato che sfruttava "apiFormat: "risposte"". -**Correzione #702**— Sostituito il monitoraggio dell'utilizzo a tariffa fissa con calcoli accurati dei prezzi DB sia per le risposte in streaming che per quelle non in streaming. -**Correzione #716**— Ripulito lo stato di traduzione delle chiamate agli strumenti di Claude, analizzando correttamente gli argomenti di streaming e impedendo ai blocchi `tool_calls` di OpenAI di ripetere il campo `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Coercizione schema**: forza automaticamente i vincoli dello schema JSON numerico con codifica stringa (ad esempio `"minimo": "1"`) ai tipi corretti, impedendo errori 400 da Cursor, Cline e altri client che inviano schemi di strumenti non validi. -**Sanificazione della descrizione dello strumento**: garantisce che le descrizioni degli strumenti siano sempre stringhe; converte descrizioni `null`, `unfine` o numeriche in stringhe vuote prima dell'invio ai provider. -**Pulsante Cancella tutti i modelli**: aggiunte le traduzioni i18n per l'azione del provider "Cancella tutti i modelli" in tutte le 30 lingue. -**Esportazione autenticazione Codex**: aggiunti i pulsanti di esportazione e applicazione locale del Codex `auth.json` per una perfetta integrazione della CLI. -**Note su Windsurf BYOK**: aggiunti avvisi di limitazione ufficiali alla scheda dello strumento CLI di Windsurf che documentano i vincoli BYOK.### 🐛 Bug Fixes

-**Correzione #709**— `system-info.mjs` non si blocca più quando la directory di output non esiste (aggiunto `mkdirSync` con flag ricorsivo). -**Correzione #710**— Il singleton A2A `TaskManager` ora utilizza `globalThis` per prevenire perdite di stato attraverso le ricompilazioni del percorso API Next.js in modalità dev. Suite di test E2E aggiornata per gestire correttamente 401. -**Correzione #711**— Aggiunta l'applicazione del limite massimo `max_tokens` specifico del provider per le richieste upstream. -**Correzione #605 / #592**— Elimina il prefisso `proxy_` dai nomi degli strumenti nelle risposte di Claude non in streaming; corretto l'URL di convalida LongCat. -**Call Logs Max Cap**— Aggiornato `getMaxCallLogs()` con livello di caching, supporto env var (`CALL_LOGS_MAX`) e integrazione delle impostazioni DB.### 🧪 Tests

- Suite di test ampliata da 964 → 1027 test (63 nuovi test)
- Aggiunto `schema-coercion.test.mjs` - 9 test per la coercizione del campo numerico e la sanificazione della descrizione dello strumento
- Aggiunto `t40-opencode-cli-tools-integration.test.mjs` — Test di integrazione CLI OpenCode/Windsurf
- Ramo di test delle funzionalità migliorato con strumenti di copertura completi### 📁 New Files

| File                                                    | Scopo                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`         | Schema di coercizione e descrizione degli strumenti di utilità di sanificazione |
| `test/unità/schema-coercion.test.mjs`                   | Unit test per la coercizione dello schema                                       |
| `test/unit/t40-opencode-cli-tools-integration.test.mjs` | Test di integrazione dello strumento CLI                                        |
| `COVERAGE_PLAN.md`                                      | Documento di pianificazione della copertura del test                            | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Risolto il problema con i marcatori cache_control che venivano eliminati nella modalità passthrough di Claude (Claude → OmniRoute → Claude), che causava agli utenti di Claude Code l'esaurimento della quota API Anthropic 5-10 volte più velocemente delle connessioni dirette. OmniRoute ora preserva gli indicatori cache_control del client quando sourceFormat e targetFormat sono entrambi Claude, garantendo che la memorizzazione nella cache dei prompt funzioni correttamente e riducendo drasticamente il consumo di token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Core:**Implementata la gestione dello stato globale per modelli e combo nascosti impedendo loro di ingombrare il catalogo o di fuoriuscire negli agenti MCP connessi (#681). -**Stabilità:**sono stati corretti arresti anomali dello streaming relativi al fallimento dell'integrazione del provider Antigravity nativo a causa di array di stati non definiti non gestiti (#684). -**Sincronizzazione della localizzazione:**Distribuito un sincronizzatore `i18n` completamente revisionato che rileva le proprietà JSON nidificate mancanti e adatta 30 localizzazioni in sequenza (#685).## [3.1.7] - 27-03-2026### 🐛 Bug Fixes

-**Stabilità dello streaming:**Risolto il problema con `hasValuableContent` che restituiva `undefinito` per blocchi vuoti nei flussi SSE (#676). -**Chiamate degli strumenti:**È stato risolto un problema in "sseParser.ts" per cui le risposte di Claude non in streaming con più chiamate agli strumenti perdevano l'"id" delle successive chiamate agli strumenti a causa di una deduplicazione errata basata sull'indice (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Ripristino del nome dello strumento nativo di Claude**: i nomi degli strumenti come "TodoWrite" non hanno più il prefisso "proxy\_" nelle risposte passthrough di Claude (sia in streaming che non in streaming). Include la copertura del test unitario (PR n. 663 di @coobabm) -**Cancella tutti gli alias dei modelli**: il pulsante "Cancella tutti i modelli" ora rimuove anche gli alias dei modelli associati, impedendo i modelli fantasma nell'interfaccia utente (PR #664 di @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Decadimento automatico backoff**: gli account con velocità limitata ora si ripristinano automaticamente alla scadenza della finestra di recupero, risolvendo un deadlock in cui un `backoffLevel` elevato depriorizzava permanentemente gli account (PR n. 657 di @brendandebeasi)### 🌍 i18n

-**Revisione della traduzione cinese**: riscrittura completa di `zh-CN.json` con maggiore precisione (PR n. 658 di @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Correzione dell'override dello streaming**— L'esplicito `stream: true` nel corpo della richiesta ora ha la priorità sull'intestazione `Accept: application/json`. I client che inviano entrambi riceveranno correttamente le risposte in streaming SSE (#656)### 🌍 i18n

-**Miglioramenti alle stringhe in ceco**— Terminologia raffinata in `cs.json` (PR #655 di @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 chiavi di traduzione mancanti**aggiunte a `en.json` e 12 lingue (PR #652 di @zen0bit) -**Documentazione ceca aggiornata**: guide CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR n. 652) -**Script di convalida della traduzione**— `check_translations.py` e `validate_translation.py` per CI/QA (PR n. 651 di @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Critico: regressione delle chiamate agli strumenti**— Risolti gli errori `proxy_Bash` disabilitando il prefisso del nome dello strumento `proxy_` nel percorso passthrough di Claude. Strumenti come `Bash`, `Read`, `Write` venivano rinominati in `proxy_Bash`, `proxy_Read`, ecc., costringendo Claude a rifiutarli (#618) -**Documentazione sull'esclusione dell'account Kiro**: documentata come falso positivo antifrode AWS upstream, non un problema di OmniRoute (#649)### 🧪 Tests

-**936 test, 0 fallimenti**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadati sulla capacità di visione**: aggiunti `capabilities.vision`, `input_modalities` e `output_modalities` alle voci "/v1/models" per i modelli con capacità di visione (PR #646) -**Modelli Gemini 3.1**: aggiunti `gemini-3.1-pro-preview` e `gemini-3.1-flash-lite-preview` al provider Antigravity (#645)### 🐛 Bug Fixes

-**Errore Ollama Cloud 401**: corretto l'URL di base API errato: modificato da "api.ollama.com" a "ollama.com/v1/chat/completions" ufficiale (#643) -**Riprova token scaduto**: aggiunto nuovo tentativo limitato con backoff esponenziale (5→10→20 min) per le connessioni OAuth scadute invece di saltarle permanentemente (PR n. 647)### 🧪 Tests

-**936 test, 0 fallimenti**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Modelli di problemi GitHub**: aggiunti report di bug standardizzati, richieste di funzionalità e modelli di problemi di configurazione/proxy (#641) -**Cancella tutti i modelli**: aggiunto un pulsante "Cancella tutti i modelli" alla pagina dei dettagli del fornitore con supporto i18n in 29 lingue (#634)### 🐛 Bug Fixes

-**Conflitto locale (`in.json`)**: rinominato il file locale hindi da `in.json` (codice ISO indonesiano) a `hi.json` per correggere i conflitti di traduzione in Weblate (#642) -**Nomi strumenti vuoti del Codex**: spostata la sanificazione del nome dello strumento prima del passthrough del Codex nativo, corretti 400 errori dai fornitori upstream quando gli strumenti avevano nomi vuoti (#637) -**Streaming di artefatti di fine riga**: aggiunto `collapseExcessiveNewlines` al sanitizzatore di risposta, comprimendo esecuzioni di 3+ caratteri di fine riga consecutivi dai modelli pensanti in un doppio fine riga standard (#638) -**Sforzo di ragionamento di Claude**: convertito il parametro "reasoning_effort" di OpenAI nel blocco di budget "thinking" nativo di Claude su tutti i percorsi di richiesta, incluso l'aggiustamento automatico di "max_tokens" (#627). -**Aggiornamento del token Qwen**: implementato l'aggiornamento proattivo del token OAuth pre-scadenza (buffer di 5 minuti) per evitare che le richieste falliscano quando si utilizzano token di breve durata (#631)### 🧪 Tests

-**936 test, 0 fallimenti**(+10 test dalla versione 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Token NaN nel codice Claude/risposte del cliente (#617):**

- `sanitizeUsage()` ora esegue il cross-map di `input_tokens`→`prompt_tokens` e `output_tokens`→`completion_tokens` prima del filtro whitelist, correggendo le risposte che mostrano i conteggi dei token NaN/0 quando i provider restituiscono nomi di campi di utilizzo in stile Claude### Sicurezza

- Pacchetto `yaml` aggiornato per correggere la vulnerabilità di overflow dello stack (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Chiuso n. 613 (Codestral: risolto con la soluzione alternativa del fornitore personalizzato)
- Commento su #615 (OpenCode dual-endpoint: soluzione alternativa fornita, tracciata come richiesta di funzionalità)
- Commento su #618 (visibilità chiamata strumento - richiesta test v3.0.9)
- Commentato su #627 (livello di sforzo - già supportato)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Errori di traduzione per i provider di formato OpenAI nella CLI Claude (#632):**

- Gestisci il formato array `reasoning_details[]` da StepFun/OpenRouter: converte in `reasoning_content`
- Gestisci l'alias del campo "reasoning" di alcuni provider → normalizzato in "reasoning_content".
- Nomi dei campi di utilizzo su più mappe: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
- Risolto il problema con `extractUsage` per accettare sia `input_tokens`/`output_tokens` che `prompt_tokens`/`completion_tokens` come campi di utilizzo validi
- Applicato sia ai percorsi di streaming (`sanitizeStreamingChunk`, traduttore `openai-to-claude.ts`) che a quelli non streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Aggiornamento token antigravità:**Risolto errore `client_secret mancante` per gli utenti con installazione npm: `clientSecretDefault` era vuoto in providerRegistry, causando il rifiuto da parte di Google delle richieste di aggiornamento dei token (#588) -**Modelli OpenCode Zen:**Aggiunto `modelsUrl` alla voce del registro OpenCode Zen in modo che "Importa da /models" funzioni correttamente (#612) -**Artefatti in streaming:**Risolti i caratteri eccessivi di fine riga lasciati nelle risposte dopo la rimozione della firma del think-tag (#626). -**Proxy Fallback:**Aggiunto nuovo tentativo automatico senza proxy quando il relè SOCKS5 fallisce -**Test proxy:**L'endpoint di test ora risolve le credenziali reali dal DB tramite proxyId### ✨ New Features

-**Selettore account/chiave Playground:**menu a discesa persistente e sempre visibile per selezionare account/chiavi provider specifici per il test: recupera tutte le connessioni all'avvio e filtra in base al provider selezionato -**Modelli dinamici degli strumenti CLI:**la selezione del modello ora viene recuperata dinamicamente dall'API `/v1/models`: fornitori come Kiro ora mostrano il loro catalogo di modelli completo -**Elenco modelli antigravità:**Aggiornato con Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; abilitato `passthroughModels` per l'accesso al modello dinamico (#628)### 🔧 Maintenance

- PR n. 625 unito: correzione dello sfondo della modalità luce dei limiti del provider---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limiti/Proxy:**Risolto il problema con il recupero del limite del Codex per gli account dietro proxy SOCKS5: l'aggiornamento del token ora viene eseguito all'interno del contesto proxy -**CI:**Risolto problema relativo all'asserzione del test di integrazione `v1/models` in ambienti CI senza connessioni al provider -**Impostazioni:**Il pulsante del test proxy ora mostra immediatamente i risultati di successo/fallimento (precedentemente nascosto dietro i dati sanitari)### ✨ New Features

-**Parco giochi:**aggiunto menu a discesa del selettore dell'account: testa connessioni specifiche individualmente quando un provider ha più account### 🔧 Maintenance

- PR n. 623 unito: correzione del percorso URL di base dell'API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limiti dell'interfaccia utente:**Aggiunta la funzionalità di raggruppamento dei tag alla dashboard delle connessioni per migliorare l'organizzazione visiva per gli account con tag personalizzati.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Risolto il problema del danneggiamento dello stato di `TextDecoder` all'interno della combo `sanitize` TransformStream che causava l'output confuso di SSE corrispondente ai caratteri multibyte (PR #614). -**Interfaccia utente dei provider:**visualizza in modo sicuro i tag HTML all'interno dei suggerimenti sugli errori di connessione del provider utilizzando "dangerouslySetInnerHTML" -**Impostazioni proxy:**Aggiunte le proprietà mancanti del corpo del payload "nome utente" e "password" che consentono la verifica corretta dei proxy autenticati dalla dashboard. -**API del provider:**l'eccezione soft associata ritorna a `getCodexUsage` impedendo errori dell'API HTTP 500 quando il recupero del token non riesce---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modelli con sincronizzazione automatica:**Aggiunto un interruttore dell'interfaccia utente e un endpoint "sync-models" per sincronizzare automaticamente gli elenchi di modelli per provider utilizzando uno scheduler a intervalli pianificati (PR n. 597)### 🐛 Bug Fixes

-**Timeouts:**Elevated default proxies `FETCH_TIMEOUT_MS` and `STREAM_IDLE_TIMEOUT_MS` to 10 minutes to properly support deep reasoning models (like o1) without aborting requests (Fixes #609) -**Rilevamento strumento CLI:**Rilevamento multipiattaforma migliorato per la gestione dei percorsi NVM, `PATHEXT` di Windows (prevenzione del problema dei wrapper `.cmd`) e prefissi NPM personalizzati (PR #598) -**Log di streaming:**Implementato l'accumulo delta `tool_calls` nei log di risposta di streaming in modo che le chiamate alle funzioni vengano tracciate e mantenute accuratamente nel DB (PR n. 603) -**Catalogo modelli:**Rimossa l'esenzione dall'autenticazione, nascondendo correttamente i modelli `comfyui` e `sdwebui` quando nessun provider è esplicitamente configurato (PR #599)### 🌐 Translations

-**cs:**Stringhe di traduzione in ceco migliorate nell'app (PR n. 601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Aggiunto un campo Tag/Gruppo a "EditConnectionModal" (memorizzato in "providerSpecificData.tag") senza richiedere migrazioni dello schema DB.
- Le connessioni nella vista del provider ora vengono raggruppate dinamicamente per tag con divisori visivi.
- Le connessioni senza tag vengono visualizzate per prime senza intestazione, seguite dai gruppi contrassegnati in ordine alfabetico.
- Il raggruppamento dei tag si applica automaticamente alla sezione Codex/Copilot/Limiti di antigravità poiché esistono dei commutatori all'interno delle righe di connessione.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Badge mancanti sulle schede di connessione:**Risolto utilizzando `resolveProxyForConnection()` anziché la mappatura statica. -**Test connessione disabilitato in modalità salvata:**abilitato il pulsante Test risolvendo la configurazione proxy dall'elenco salvato. -**Blocco modale configurazione:**Aggiunte chiamate `onClose()` dopo il salvataggio/cancella per impedire il blocco dell'interfaccia utente. -**Conteggio doppio dell'utilizzo:**`ProxyRegistryManager` ora carica con entusiasmo l'utilizzo sul supporto con deduplicazione tramite `scope` + `scopeId`. I conteggi di utilizzo sono stati sostituiti con un pulsante Test che mostra IP/latenza in linea.#### fix(translator): `function_call` prefix stripping

- Risolto un problema incompleto dal PR #607 in cui solo i blocchi `tool_use` rimuovevano il prefisso dello strumento `proxy_` di Claude. Ora, i client che utilizzano il formato API OpenAI Responses riceveranno correttamente anche gli strumenti senza il prefisso "proxy\_".---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Sono state risolte tre regressioni critiche segnalate dagli utenti dopo il lancio della versione 3.0.0.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Il prefisso `proxy_` aggiunto da Claude OAuth è stato rimosso solo dalle risposte**streaming**. In modalità**non streaming**, "translateNonStreamingResponse" non aveva accesso a "toolNameMap", facendo sì che i client ricevessero nomi di strumenti alterati come "proxy_read_file" invece di "read_file".

**Correzione:**Aggiunto il parametro facoltativo `toolNameMap` a `translateNonStreamingResponse` e ​​applicata la rimozione del prefisso nel gestore del blocco Claude `tool_use`. `chatCore.ts` ora passa attraverso la mappa.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI non espone `GET /v1/models`. Il validatore generico `validateOpenAICompatibleProvider` è passato a un fallback di completamento chat solo se era impostato `validationModelId`, cosa che LongCat non configura. Ciò ha causato il fallimento della convalida del provider con un errore fuorviante durante l'aggiunta/salvataggio.

**Correzione:**Aggiunto `longcat` alla mappa dei validatori specializzati, esaminando direttamente `/chat/completions` e trattando qualsiasi risposta non di autenticazione come un passaggio.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Gli strumenti MCP (ad esempio `pencil`, `computer_use`) inoltrano le definizioni degli strumenti con `{type:"object"}` ma senza un campo `properties`. L'API di Anthropic li rifiuta con: "proprietà mancanti dello schema dell'oggetto".

**Correzione:**In `openai-to-claude.ts`, inserire `properties: {}` come impostazione predefinita sicura quando `type` è `"object"` e `properties` è assente.---

### 🔀 Community PRs Merged (2)

| PR       | Autore  | Sommario                                                                                                                                |
| -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): corretta la traduzione russa per Playground e Testbed                                                                       |
| **#591** | @rdself | correzione (ui): miglioramento del contrasto della modalità luce dei limiti del fornitore e della visualizzazione del livello del piano | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 test, 0 fallimenti**(invariato rispetto alla v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **La più grande release di sempre.**Da 36 provider nella versione 2.9.5 a**67+ provider**nella versione 3.0.0 — con server MCP, protocollo A2A, motore di combinazione automatica, icone dei provider, API per chiavi registrate, 926 test e contributi di**12 membri della comunità**in**10 PR uniti**.
>
> Consolidato da v3.0.0-rc.1 a rc.17 (17 release candidate in 3 giorni di intenso sviluppo).---

### 🆕 New Providers (+31 since v2.9.5)

| Fornitore                      | Alias ​​             | Livello                | Note                                                                                                     |
| ------------------------------ | -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **OpenCode Zen**               | `opencode-zen`       | Gratuito               | 3 modelli tramite `opencode.ai/zen/v1` (PR #530 di @kang-heewon)                                         |
| **OpenCode Vai**               | `opencode-go`        | Pagato                 | 4 modelli tramite `opencode.ai/zen/go/v1` (PR #530 di @kang-heewon)                                      |
| **AI LongCat**                 | `lc`                 | Gratuito               | 50 milioni di token/giorno (Flash-Lite) + 500.000/giorno (Chat/Thinking) durante la beta pubblica        |
| **Impollinazioni AI**          | `pol`                | Gratuito               | Non è necessaria alcuna chiave API: GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 richiesta/15 secondi) |
| **AI di Cloudflare Workers**   | `cf`                 | Gratuito               | 10.000 neuroni al giorno: ~150 risposte LLM o 500 Audio sussurrato, inferenza sui bordi                  |
| **AI di Scaleway**             | `scw`                | Gratuito               | 1 milione di token gratuiti per i nuovi account: conforme a UE/GDPR (Parigi)                             |
| **API AI/ML**                  | `scopo`              | Gratuito               | Crediti gratuiti di $ 0,025 al giorno: oltre 200 modelli tramite singolo endpoint                        |
| **IA del computer**            | `pu`                 | Gratuito               | Oltre 500 modelli (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                              |
| **Alibaba Cloud (DashScope)**  | `ali`                | Pagato                 | Endpoint internazionali + cinesi tramite `alicode`/`alicode-intl`                                        |
| **Piano di codifica Alibaba**  | `bcp`                | Pagato                 | Alibaba Model Studio con API compatibile con l'ambiente antropico                                        |
| **Codifica Kimi (chiave API)** | `kmca`               | Pagato                 | Accesso Kimi dedicato basato su chiave API (separato da OAuth)                                           |
| **Codifica MiniMax**           | `minimax`            | Pagato                 | Endpoint internazionale                                                                                  |
| **MiniMax (Cina)**             | `minimax-cn`         | Pagato                 | Endpoint specifico per la Cina                                                                           |
| **Z.AI (GLM-5)**               | `zai`                | Pagato                 | Modelli GLM di nuova generazione Zhipu AI                                                                |
| **AI vertice**                 | `vertice`            | Pagato                 | Google Cloud: account di servizio JSON o OAuth access_token                                              |
| **Ollama Nuvola**              | `ollamacloud`        | Pagato                 | Servizio API ospitato da Ollama                                                                          |
| **Sintetico**                  | `sintetico`          | Pagato                 | Gateway modelli passthrough                                                                              |
| **Chilo Gateway**              | `kg`                 | Pagato                 | Gateway modelli passthrough                                                                              |
| **Ricerca perplessità**        | `pplx-ricerca`       | Pagato                 | Endpoint dedicato basato sulla ricerca                                                                   |
| **Ricerca Serper**             | `serper-search`      | Pagato                 | Integrazione API di ricerca Web                                                                          |
| **Ricerca coraggiosa**         | `ricerca coraggiosa` | Pagato                 | Integrazione API Brave Search                                                                            |
| **Ricerca Exa**                | `exa-ricerca`        | Pagato                 | Integrazione API di ricerca neurale                                                                      |
| **Ricerca Tavily**             | `tavily-search`      | Pagato                 | Integrazione API di ricerca AI                                                                           |
| **NanoBanana**                 | `nb`                 | Pagato                 | API per la generazione di immagini                                                                       |
| **UndiciLabs**                 | `el`                 | Pagato                 | Sintesi vocale da testo a voce                                                                           |
| **Cartesia**                   | `cartesia`           | Pagato                 | Sintesi vocale TTS ultraveloce                                                                           |
| **RiproduciHT**                | `gioca`              | Pagato                 | Clonazione vocale e TTS                                                                                  |
| **Nel mondo**                  | `nel mondo`          | Pagato                 | Chat vocale del personaggio AI                                                                           |
| **UI WebSD**                   | `sdwebui`            | Ospitato autonomamente | Generazione di immagini locali a diffusione stabile                                                      |
| **ComodaUI**                   | `comfyui`            | Ospitato autonomamente | Generazione basata su nodo del flusso di lavoro locale ComfyUI                                           |
| **Codifica GLM**               | `glm`                | Pagato                 | Endpoint specifico della codifica BigModel/Zhipu                                                         | **Totale: oltre 67 provider**(4 gratuiti, 8 OAuth, 55 chiavi API) + provider personalizzati illimitati OpenAI/compatibili con l'ambiente antropico.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Genera automaticamente ed emetti chiavi API OmniRoute a livello di codice con l'applicazione delle quote per provider e per account.

| Punto finale                     | Metodo            | Descrizione                                                                  |
| -------------------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `/api/v1/chiavi-registrate`      | "POST"            | Emetti una nuova chiave: la chiave grezza viene restituita**solo una volta** |
| `/api/v1/chiavi-registrate`      | `OTTIENI`         | Elenco chiavi registrate (mascherate)                                        |
| `/api/v1/chiave-registrata/{id}` | `OTTIENI/ELIMINA` | Ottieni metadati / Revoca                                                    |
| `/api/v1/quote/check`            | `OTTIENI`         | Pre-convalidare la quota prima di emettere                                   |
| `/api/v1/providers/{id}/limits`  | `OTTIENI/METTI`   | Configurare i limiti di emissione per provider                               |
| `/api/v1/accounts/{id}/limits`   | `OTTIENI/METTI`   | Configura i limiti di emissione per account                                  |
| `/api/v1/problemi/rapporto`      | "POST"            | Segnala eventi di quota a GitHub Problemi                                    |

**Sicurezza:**chiavi archiviate come hash SHA-256. Chiave grezza mostrata una volta al momento della creazione, mai più recuperabile.#### 🎨 Provider Icons via @lobehub/icons (#529)

Oltre 130 loghi di fornitori che utilizzano i componenti React "@lobehub/icons" (SVG). Catena di fallback:**Lobehub SVG → PNG esistente → icona generica**. Applicato alle pagine Dashboard, Provider e Agenti con il componente "ProviderIcon" standardizzato.#### 🔄 Model Auto-Sync Scheduler (#488)

Aggiorna automaticamente gli elenchi dei modelli per i fornitori connessi ogni**24 ore**. Viene eseguito all'avvio del server. Configurabile tramite `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Mappare i modelli di nome del modello (glob) su combinazioni specifiche per il routing automatico:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nuova tabella `model_combo_mappings` con corrispondenza glob-to-regex
- Sezione dell'interfaccia utente del dashboard: "Regole di routing del modello" con aggiunta/modifica/attivazione/disattivazione/eliminazione in linea#### 🧭 API Endpoints Dashboard

Catalogo interattivo, gestione webhook, visualizzatore OpenAPI: tutto in un'unica pagina a schede in `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nuove integrazioni dei provider di ricerca:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— consentendo risposte basate sull'intelligenza artificiale con dati web in tempo reale.#### 📊 Search Analytics

Nuova scheda in `/dashboard/analytics`: suddivisione dei fornitori, percentuale di riscontri nella cache, monitoraggio dei costi. API: "GET /api/v1/search/analytics".#### 🛡️ Per-API-Key Rate Limits (#452)

Colonne "max_requests_per_day" e "max_requests_per_minute" con applicazione della finestra scorrevole in memoria che restituisce HTTP 429.#### 🎵 Media Playground

Parco giochi completo per la generazione di media su `/dashboard/media`: generazione di immagini, video, musica, trascrizione audio (limite di caricamento di 2 GB) e sintesi vocale.---

### 🔒 Security & CI/CD

-**Rimedio CodeQL**— Risolti più di 10 avvisi: 6 ripetizioni polinomiali, 1 casualità non sicura (`Math.random()` → `crypto.randomUUID()`), 1 iniezione di comandi shell -**Convalida del percorso**— Schemi Zod + `validateBody()` su**percorsi API 176/176**— CI applicata -**Correzione CVE**: vulnerabilità dompurify XSS (GHSA-v2wj-7wpq-c8vv) risolta tramite override npm -**Appiattito**— Rimbalzato 3.3.3 → 3.4.2 (inquinamento del prototipo CWE-1321) -**Docker**— Aggiornato `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: cancella l'errore risolvibile quando `GEMINI_OAUTH_CLIENT_SECRET` manca in Docker -**#549**— I percorsi delle impostazioni CLI ora risolvono la chiave API reale da `keyId` (stringhe non mascherate) -**#574**: l'accesso non si blocca più dopo aver saltato l'impostazione della password della procedura guidata -**#506**— `machineId` multipiattaforma riscritto (Windows REG.exe → macOS ioreg → Linux → nome host fallback)#### Providers & Routing

-**#536**— LongCat AI: corretti `baseUrl` e `authHeader` -**#535**— Sostituzione del modello bloccato: `body.model` impostato correttamente su `pinnedModel` -**#570**— I modelli Claude senza prefisso ora si risolvono in provider antropico -**#585**— I tag interni `<omniModel>` non vengono più trasmessi ai client nello streaming SSE -**#493**: la denominazione del modello di provider personalizzato non è più alterata dalla rimozione del prefisso -**#490**— Streaming + protezione della cache di contesto tramite injection `TransformStream` -**#511**— Tag `<omniModel>` inserito nel primo blocco di contenuto (non dopo `[DONE]`)#### CLI & Tools

-**#527**— Codice Claude + ciclo Codex: i blocchi `tool_result` ora sono convertiti in testo -**#524**: configurazione OpenCode salvata correttamente (formato XDG_CONFIG_HOME, TOML) -**#522**— Gestore API: rimosso il pulsante fuorviante "Copia chiave mascherata". -**#546**— `--version` restituisce `unknown` su Windows (PR di @k0valik) -**#544**: rilevamento sicuro dello strumento CLI tramite percorsi di installazione noti (PR di @k0valik) -**#510**: percorsi Windows MSYS2/Git-Bash normalizzati automaticamente -**#492**— La CLI rileva il nodo gestito da `mise`/`nvm` quando manca `app/server.js`#### Streaming & SSE

-**PR #587**— Ripristina l'importazione di `resolveDataDir` nelle risposteCompatibile con Transformers per Cloudflare Workers (@k0valik) -**PR #495**— Collo di bottiglia 429 attesa infinita: elimina i lavori in attesa sul limite di velocità (@xandr0s) -**#483**— Interrompe il trascinamento di `data: null` dopo il segnale `[DONE]` -**#473**— Stream SSE Zombie: timeout ridotto a 300 → 120 secondi per un fallback più rapido#### Media & Transcription

-**Trascrizione**— Deepgram `video/mp4` → `audio/mp4` Mappatura MIME, rilevamento automatico della lingua, punteggiatura -**TTS**— Visualizzazione dell'errore `[oggetto oggetto]` corretta per errori nidificati in stile ElevenLabs -**Upload limits**— Media transcription increased to 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**: colonna "requested_model" nei registri delle chiamate (migrazione 009) -**T02**— Elimina i blocchi di testo vuoti dal `tool_result.content' nidificato
-**T03**— Analizza le intestazioni di quota `x-codex-5h-_`/`x-codex-7d-_`-**T04**— Intestazione`X-Session-Id` per sticky routing esterno
-**T05**: persistenza del DB con limite di velocità con API dedicata
-**T06**— Account disattivato → blocco permanente (tempo di recupero di 1 anno)
-**T07**— X-Forwarded-Per convalida IP (`extractClientIp()`) -**T08**— Per-API-key session limits with sliding-window enforcement -**T09**— Ambiti Codex vs Spark rate-limit (pool separati) -**T10**— Crediti esauriti → fallback distinto con tempo di recupero di 1 ora -**T11**— sforzo di ragionamento "max" → 131072 gettoni di budget -**T12**: voci di prezzo MiniMax M2.7 -**T13**— Correzione della visualizzazione delle quote obsolete (ripristino del riconoscimento della finestra) -**T14**: controllo TCP proxy fast-fail (≤2s, cache 30s) -**T15**: normalizzazione del contenuto dell'array per Anthropic -**T23**: fallback intelligente per la reimpostazione della quota (estrazione dell'intestazione) -**T24**— Tempo di recupero "503" + mappatura "406". -**T25**: fallback di convalida del provider -**T29**: autenticazione JWT dell'account del servizio Vertex AI -**T33**: livello di riflessione per conversione del budget -**T36**— Classificazione degli errori "403" e "429". -**T38**: specifiche del modello centralizzato ("modelSpecs.ts") -**T39**— Fallback dell'endpoint per "fetchAvailableModels". -**T41**: reindirizzamento automatico delle attività in background ai modelli Flash -**T42**: mappatura delle proporzioni di generazione dell'immagine#### Other Improvements

-**Intestazioni personalizzate upstream per modello**— tramite interfaccia utente di configurazione (PR n. 575 di @zhangqiang8vip) -**Lunghezza del contesto del modello**: configurabile nei metadati del modello (PR #578 di @hijak) -**Rimozione del prefisso del modello**: opzione per rimuovere il prefisso del fornitore dai nomi dei modelli (PR n. 582 di @jay77721) -**Deprecazione della CLI Gemini**: contrassegnata come deprecata con avviso di restrizione OAuth di Google -**Paser YAML**: sostituito il parser personalizzato con `js-yaml` per la corretta analisi delle specifiche OpenAPI -**ZWS v5**— Correzione di perdite HMR (connessioni 485 DB → 1, memoria 2,4 GB → 195 MB) -**Esportazione log**: nuovo pulsante di esportazione JSON sulla dashboard con menu a discesa dell'intervallo di tempo -**Banner di notifica aggiornamento**: la home page del dashboard mostra quando sono disponibili nuove versioni---

### 🌐 i18n & Documentation

-**30 lingue**con parità al 100%: 2.788 chiavi mancanti sincronizzate -**Ceco**— Traduzione completa: 22 documenti, 2.606 stringhe UI (PR di @zen0bit) -**Cinese (zh-CN)**— Ritraduzione completa (PR di @only4copilot) -**Guida alla distribuzione delle VM**: tradotta in inglese come documento di origine -**API Reference**— Added `/v1/embeddings` and `/v1/audio/speech` endpoints -**Conteggio provider**: aggiornato da 36+/40+/44+ a**67+**nel README e in tutti i 30 README i18n---

### 🔀 Community PRs Merged (10)

| PR       | Autore          | Sommario                                                                                     |
| -------- | --------------- | -------------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): ripristina l'importazione diresolveDataDir per la compatibilità Cloudflare Workers |
| **#582** | @jay77721       | feat(proxy): opzione di eliminazione del prefisso del nome del modello                       |
| **#581** | @jay77721       | fix(npm): collega il rilascio di elettroni al flusso di lavoro npm-publish                   |
| **#578** | @hijak          | feat: lunghezza del contesto configurabile nei metadati del modello                          |
| **#575** | @zhangqiang8vip | caratteristica: intestazioni upstream per modello, PATCH compatibile, allineamento chat      |
| **#562** | @coobabm        | correzione: gestione della sessione MCP, passthrough Claude, discoverFormat                  |
| **#561** | @zen0bit        | fix(i18n): correzioni di traduzione ceca                                                     |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` centralizzato per la risoluzione del percorso                   |
| **#546** | @k0valik        | fix(cli): `--version` restituisce `unknown` su Windows                                       |
| **#544** | @k0valik        | fix(cli): rilevamento sicuro dello strumento CLI tramite percorsi di installazione           |
| **#542** | @rdself         | fix(ui): variabili del tema CSS con contrasto in modalità luce                               |
| **#530** | @kang-heewon    | feat: provider OpenCode Zen + Go con `OpencodeExecutor`                                      |
| **#512** | @zhangqiang8vip | feat: compatibilità del modello per protocollo (`compatByProtocol`)                          |
| **#497** | @zhangqiang8vip | correzione: perdite di risorse HMR in modalità sviluppo (ZWS v5)                             |
| **#495** | @xandr0s        | correzione: collo di bottiglia 429 attesa infinita (eliminazione dei lavori in attesa)       |
| **#494** | @zhangqiang8vip | feat: sviluppatore MiniMax→correzione ruolo di sistema                                       |
| **#480** | @prakersh       | correzione: estrazione dell'utilizzo dello svuotamento del flusso                            |
| **#479** | @prakersh       | feat: Codice 5.3/5.4 e voci sui prezzi antropici                                             |
| **#475** | @only4copilot   | feat(i18n): migliorata la traduzione cinese                                                  |

**Grazie a tutti i contributori!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 test, 0 errori**(rispetto agli 821 della versione 2.9.5)

- Oltre 105 nuovi test che coprono: mappature di combinazioni di modelli, chiavi registrate, OpencodeExecutor, provider Bailian, convalida del percorso, classificazione degli errori, mappatura delle proporzioni e altro ancora---

### 📦 Database Migrations

| Migrazione | Descrizione                                                            |
| ---------- | ---------------------------------------------------------------------- | --- |
| **008**    | Tabelle `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**    | Colonna "requested_model" in "call_logs"                               |
| **010**    | Tabella `model_combo_mappings` per il routing combinato per modello    | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Modifiche importanti:**Nessuna. Tutte le configurazioni, le combinazioni e le chiavi API esistenti vengono conservate.
> Le migrazioni del database 008-010 vengono eseguite automaticamente all'avvio.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Rimedio CodeQL**: risolti più di 10 avvisi:

- 6 ripetizioni polinomiali in `provider.ts` / `chatCore.ts` (sostituiti i modelli di alternanza `(?:^|/)` con la corrispondenza basata sui segmenti)
- 1 casualità insicura in `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 iniezione di comandi shell in `prepublish.mjs` (escape del percorso `JSON.stringify()`) -**Convalida del percorso**— Aggiunti schemi Zod + `validateBody()` a 5 percorsi privi di convalida:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` ora passa:**176/176 rotte convalidate**### 🐛 Bug Fixes

-**#585**— `<omniModel>` internal tags no longer leak to clients in SSE responses. Aggiunta la sanificazione in uscita "TransformStream" in "combo.ts".### ⚙️ Infrastructure

-**Docker**: `docker/setup-buildx-action` aggiornato da v3 → v4 (correzione per la deprecazione di Node.js 20) -**Pulizia CI**: eliminate oltre 150 esecuzioni del flusso di lavoro non riuscite/annullate### 🧪 Tests

- Suite di test:**926 test, 0 fallimenti**(+3 nuovi)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Aumento dei limiti di trascrizione dei media
- Aggiunta la lunghezza del contesto del modello ai metadati del registro
- Aggiunte intestazioni personalizzate upstream per modello tramite l'interfaccia utente di configurazione
- Risolti diversi bug, convalida Zod per le patch e risolti vari problemi della community.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Routing combinato per modello: mappa i modelli di nomi del modello (glob) su combo specifiche per il routing automatico

- Nuova tabella `model_combo_mappings` (migrazione 010) con pattern, combo_id, priorità, abilitato
- Funzione DB `resolveComboForModel()` con corrispondenza da glob a regex (senza distinzione tra maiuscole e minuscole, caratteri jolly `*` e `?`)
- `getComboForModel()` in `model.ts`: aumenta `getCombo()` con il fallback del modello-modello
- `chat.ts`: la decisione di routing ora controlla le mappature modello-combo prima della gestione del modello singolo
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dashboard: sezione "Regole di routing del modello" aggiunta alla pagina Combo con aggiunta/modifica/attivazione/disattivazione/eliminazione in linea
- Esempi: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Sincronizzazione i18n completa**: 2.788 chiavi mancanti aggiunte su 30 file di lingua: tutte le lingue ora hanno una parità del 100% con `en.json` -**Pagina agenti i18n**: sezione Integrazione OpenCode completamente internazionalizzata (titolo, descrizione, scansione, etichette di download) -**6 nuove chiavi**aggiunte allo spazio dei nomi `agents` per la sezione OpenCode### 🎨 UI/UX

-**Icone del provider**: aggiunte 16 icone del provider mancanti (3 copiate, 2 scaricate, 11 SVG create) -**SVG fallback**: componente `ProviderIcon` aggiornato con strategia a 4 livelli: Lobehub → PNG → SVG → Icona generica -**Fingerprinting degli agenti**: sincronizzato con gli strumenti CLI: aggiunti droid, openclaw, copilot, opencode all'elenco delle impronte digitali (14 in totale)### Sicurezza

-**Correzione CVE**: risolta la vulnerabilità dompurify XSS (GHSA-v2wj-7wpq-c8vv) tramite npm esegue l'override forzando `dompurify@^3.3.2`

- "npm audit" ora segnala**0 vulnerabilità**### 🧪 Tests

- Suite di test:**923 test, 0 fallimenti**(+15 nuovi test di mappatura modello-combo)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autore   | Sommario                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm | fix(ux): gestione delle sessioni MCP, normalizzazione passthrough Claude, modale OAuth, discoverFormat |
| **#561** | @zen0bit | fix(i18n): correzioni della traduzione ceca: nomi dei metodi HTTP e aggiornamenti della documentazione | ### 🧪 Tests |

- Suite di test:**908 test, 0 errori**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**risolve la chiave API reale da `keyId` nei percorsi delle impostazioni CLI (`codex-settings`, `droid-settings`, `kilo-settings`) per impedire la scrittura di stringhe mascherate (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autore   | Sommario                                                                                                                                                                                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` restituisce `unknown` su Windows — usa `JSON.parse(readFileSync)` invece dell'importazione ESM                                                                                                                        |
| **#555** | @k0valik | fix(sse): `resolveDataDir()` centralizzato per la risoluzione del percorso in credenziali, autoCombo, registratore di risposte e registratore di richieste                                                                                  |
| **#544** | @k0valik | fix(cli): rilevamento sicuro dello strumento CLI tramite percorsi di installazione noti (8 strumenti) con convalida del collegamento simbolico, controlli del tipo di file, limiti di dimensione, ambiente minimo nel controllo dello stato |
| **#542** | @rdself  | fix(ui): migliora il contrasto della modalità chiara — aggiungi variabili mancanti del tema CSS (`bg-primary`, `bg-subtle`, `text-primary`) e correggi i colori solo scuri nei dettagli del registro                                        | ### 🔧 Bug Fixes |

-**Correzione TDZ in `cliRuntime.ts`**— `validateEnvPath` veniva utilizzato prima dell'inizializzazione all'avvio del modulo da `getExpectedParentPaths()`. Dichiarazioni riordinate per correggere "ReferenceError". -**Correzioni alla build**— Aggiunti `pino` e `pino-pretty` a `serverExternalPackages` per impedire a Turbopack di interrompere il caricamento del lavoratore interno di Pino.### 🧪 Tests

- Suite di test:**905 test, 0 fallimenti**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regressione alla creazione di Electron: declassato Next.js da `16.1.x` a `16.0.10` per eliminare l'instabilità dell'hashing del modulo Turbopack che causava schermate vuote nel bundle desktop Electron. -**Correzioni per i test unitari**— Corrette due asserzioni di test obsolete (proporzioni/risoluzione di `nanobanana-image-handler`, mappatura dei campi `thinking-budget` Gemini `thinkingConfig`) che erano andate alla deriva dopo le recenti modifiche all'implementazione. -**#541**: risposta al feedback degli utenti sulla complessità dell'installazione; non sono necessarie modifiche al codice.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Esecutore Vertex AI SA JSON: implementato utilizzando la libreria `jose` per gestire l'autenticazione JWT/account di servizio, insieme ad aree configurabili nell'interfaccia utente e alla creazione automatica dell'URL del modello partner. -**T42**— Mappatura delle proporzioni di generazione delle immagini: creata la logica "sizeMapper" per formati OpenAI generici ("size"), aggiunta la gestione nativa di "imagen3" e aggiornati gli endpoint NanoBanana per utilizzare automaticamente le proporzioni mappate. -**T38**— Specifiche del modello centralizzato: "modelSpecs.ts" creato per limiti e parametri per modello.### 🔧 Improvements

-**T40**: integrazione degli strumenti CLI di OpenCode: integrazione nativa di "opencode-zen" e "opencode-go" completata nel precedente PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— Correzione attesa ricarica "503" + mappatura "406": mappata "406 Non accettabile" su "503 Servizio non disponibile" con intervalli di ricarica adeguati. -**T25**— Fallback di convalida del provider: fallback corretto ai modelli di convalida standard quando uno specifico `validationModelId` non è presente. -**T36**— Perfezionamento della gestione del provider "403" vs "429": estratto in "errorClassifier.ts" per separare correttamente gli errori relativi alle autorizzazioni hardware (`403`) dai limiti di velocità (`429`). -**T39**— Fallback endpoint per `fetchAvailableModels`: implementato un meccanismo a tre livelli (`/models` -> `/v1/models` -> catalogo generico locale) + aggiornamenti dello strumento MCP `list_models_catalog` per riflettere `source` e `warning`. -**T33**— Conversione dal livello di riflessione al budget: traduce i livelli di riflessione qualitativa in allocazioni di budget precise. -**T41**: reindirizzamento automatico delle attività in background: indirizza automaticamente attività di valutazione in background pesanti a modelli flash/efficienti. -**T23**— Fallback intelligente per il ripristino della quota: estrae con precisione i valori dell'intestazione "x-ratelimit-reset" / "retry-after" o mappa i tempi di recupero statici.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Aggiornamento dalla versione 2.9.5:**16 problemi risolti · 2 PR della community uniti · 2 nuovi fornitori · 7 nuovi endpoint API · 3 nuove funzionalità · Migrazione DB 008+009 · 832 test superati · 15 miglioramenti del gap sub2api (T01–T15 completo).### 🆕 New Providers

| Fornitore        | Alias ​​       | Livello  | Note                                                                |
| ---------------- | -------------- | -------- | ------------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratuito | 3 modelli tramite `opencode.ai/zen/v1` (PR #530 di @kang-heewon)    |
| **OpenCode Vai** | `opencode-go`  | Pagato   | 4 modelli tramite `opencode.ai/zen/go/v1` (PR #530 di @kang-heewon) |

Entrambi i provider utilizzano il nuovo `OpencodeExecutor` con routing multiformato (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Genera automaticamente ed emetti chiavi API OmniRoute a livello di codice con l'applicazione delle quote per provider e per account.

| Punto finale                          | Metodo          | Descrizione                                                                  |
| ------------------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `/api/v1/chiavi-registrate`           | "POST"          | Emetti una nuova chiave: la chiave grezza viene restituita**solo una volta** |
| `/api/v1/chiavi-registrate`           | `OTTIENI`       | Elenco chiavi registrate (mascherate)                                        |
| `/api/v1/chiave-registrata/{id}`      | `OTTIENI`       | Ottieni metadati chiave                                                      |
| `/api/v1/chiave-registrata/{id}`      | "ELIMINA"       | Revoca una chiave                                                            |
| `/api/v1/registered-keys/{id}/revoke` | "POST"          | Revoca (per client senza supporto DELETE)                                    |
| `/api/v1/quote/check`                 | `OTTIENI`       | Pre-convalidare la quota prima di emettere                                   |
| `/api/v1/providers/{id}/limits`       | `OTTIENI/METTI` | Configurare i limiti di emissione per provider                               |
| `/api/v1/accounts/{id}/limits`        | `OTTIENI/METTI` | Configura i limiti di emissione per account                                  |
| `/api/v1/problemi/rapporto`           | "POST"          | Segnala eventi di quota a GitHub Problemi                                    |

**DB — Migrazione 008:**Tre nuove tabelle: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Sicurezza:**chiavi archiviate come hash SHA-256. Chiave grezza mostrata una volta al momento della creazione, mai più recuperabile.
**Tipi di quota:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per provider e per account.
**Idempotency:**il campo `idempotency_key` impedisce l'emissione duplicata. Restituisce "409 IDEMPOTENCY_CONFLICT" se la chiave era già utilizzata.
**Budget per chiave:**`dailyBudget` / `hourlyBudget`: limita il numero di richieste che una chiave può instradare per finestra.
**Report GitHub:**facoltativo. Imposta `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` per creare automaticamente problemi GitHub in caso di superamento della quota o di errori di emissione.#### 🎨 Provider Icons — @lobehub/icons (#529)

Tutte le icone dei provider nella dashboard ora utilizzano i componenti React `@lobehub/icons` (oltre 130 provider con SVG).
Catena di fallback:**Lobehub SVG → esistente `/providers/{id}.png` → icona generica**. Utilizza un pattern React `ErrorBoundary` corretto.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute ora aggiorna automaticamente gli elenchi di modelli per i fornitori connessi ogni**24 ore**.

- Viene eseguito all'avvio del server tramite l'hook `/api/sync/initialize` esistente
- Configurabile tramite la variabile di ambiente `MODEL_SYNC_INTERVAL_HOURS`
- Copre 16 principali fornitori
- Registra l'ora dell'ultima sincronizzazione nel database delle impostazioni---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Cancella l'errore che richiede azione quando `GEMINI_OAUTH_CLIENT_SECRET` manca nelle distribuzioni Docker/self-hosted. In precedenza è stato mostrato il criptico "client_secret mancante" da Google. Ora fornisce istruzioni specifiche per `docker-compose.yml` e `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Corretti `baseUrl` (`api.longcat.chat/openai`) e `authHeader` ("Autorizzazione: Bearer`).
-**#535 — Sostituzione del modello bloccato:**`body.model`ora è impostato correttamente su`pinnedModel`quando la protezione della cache di contesto è attiva.
-**#532 — Convalida della chiave OpenCode Go:**ora utilizza l'endpoint di test`zen/v1` (`testKeyBaseUrl`) — la stessa chiave funziona per entrambi i livelli.#### CLI & Tools

-**#527 — Codice Claude + Ciclo Codex:**i blocchi `tool_result` ora vengono convertiti in testo invece che eliminati, interrompendo infiniti cicli di risultati strumento. -**#524 — Salvataggio della configurazione OpenCode:**Aggiunto il gestore `saveOpenCodeConfig()` (consapevole di XDG_CONFIG_HOME, scrive TOML). -**#521 — Accesso bloccato:**L'accesso non si blocca più dopo aver saltato l'impostazione della password: reindirizza correttamente all'onboarding. -**#522 — Gestore API:**Rimosso il pulsante fuorviante "Copia chiave mascherata" (sostituito con la descrizione comando dell'icona di un lucchetto). -**#532 — Configurazione OpenCode Go:**Il gestore delle impostazioni della guida ora gestisce il toolId `opencode`.#### Developer Experience

-**#489 — Antigravità:**`googleProjectId` mancante restituisce un errore strutturato 422 con guida alla riconnessione invece di un arresto anomalo criptico. -**#510 — Percorsi Windows:**I percorsi MSYS2/Git-Bash (`/c/Program Files/...`) vengono ora normalizzati automaticamente in `C:\Program Files\...`. -**#492 — Avvio della CLI:**La CLI di `omniroute` ora rileva il nodo gestito da `mise`/`nvm` quando manca `app/server.js` e mostra istruzioni di correzione mirate.---

### 📖 Documentation Updates

-**#513**— Reimpostazione della password Docker: `INITIAL_PASSWORD` env var soluzione alternativa documentata -**#520**— pnpm: passaggio `pnpm approve-builds better-sqlite3` documentato---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Autore       | Sommario                                                            |
| -------- | ------------ | ------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Provider OpenCode Zen + Go con `OpencodeExecutor` e test migliorati | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistenza del DB con limite di velocità: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` in `provviders.ts`. La colonna esistente "rate_limited_until" è ora esposta come API dedicata: l'aggiornamento del token OAuth NON deve toccare questo campo per evitare loop di limiti di velocità. -**T08**— Limite sessione per chiave API: "max_sessions INTEGER DEFAULT 0" aggiunto ad "api_keys" tramite migrazione automatica. `sessionManager.ts` ottiene `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` e `getActiveSessionCountForKey()`. I chiamanti in "chatCore.js" possono applicare il limite e diminuirlo su "req.close". -**T09**— Ambiti del limite di velocità Codex vs Spark: `getCodexModelScope()` e `getCodexRateLimitKey()` in `codex.ts`. I modelli standard (`gpt-5.x-codex`, `codex-mini`) ottengono l'ambito `"codex"`; i modelli spark (`codex-spark*`) ottengono l'ambito "spark"`. Le chiavi del limite di velocità dovrebbero essere `${accountId}:${scope}`in modo che l'esaurimento di un pool non blocchi l'altro.
-**T13**— Correzione della visualizzazione delle quote obsolete:`getEffectiveQuotaUsage(used, resetAt)`restituisce`0`una volta superata la finestra di ripristino;`formatResetCountdown(resetAt)`restituisce una stringa di conto alla rovescia leggibile dall'uomo (ad esempio`"2h 35m"`). Entrambi esportati da `provviders.ts`+`localDb.ts`per l'utilizzo del dashboard.
-**T14**— Proxy fast-fail: nuovo`src/lib/proxyHealth.ts`con`isProxyReachable(proxyUrl, timeoutMs=2000)`(controllo TCP, timeout ≤2s invece di 30s),`getCachedProxyHealth()`, `invalidateProxyHealth()`e`getAllProxyHealthStatuses()`. I risultati vengono memorizzati nella cache per 30 secondi per impostazione predefinita; configurabile tramite `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Suite di test:**832 test, 0 errori**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— Colonna "requested_model" in "call_logs" (migrazione 009): traccia il modello originariamente richiesto dal client rispetto al modello effettivamente instradato. Abilita l'analisi del tasso di fallback. -**T02**— Elimina i blocchi di testo vuoti dal `tool_result.content` nidificato: previene gli errori Anthropic 400 ("i blocchi di contenuto testuale devono essere non vuoti") quando Claude Code concatena i risultati dello strumento. -**T03**— Analizza le intestazioni `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` estrae le finestre delle quote Codex per una pianificazione precisa del cooldown invece del generico fallback di 5 minuti. -**T04**— Intestazione `X-Session-Id` per sticky routing esterno: `extractExternalSessionId()` in `sessionManager.ts` legge le intestazioni `x-session-id` / `x-omniroute-session` con il prefisso `ext:` per evitare collisioni con gli ID di sessione SHA-256 interni. Compatibile con Nginx (intestazione con trattino). -**T06**— Account disattivato → blocco permanente: `isAccountDeactivated()` in `accountFallback.ts` rileva 401 segnali di disattivazione e applica un tempo di recupero di 1 anno per impedire di riprovare con account definitivamente morti. -**T07**— Convalida IP X-Forwarded-For: nuovo `src/lib/ipUtils.ts` con `extractClientIp()` e `getClientIpFromRequest()` — salta le voci `sconosciute`/non IP nelle catene `X-Forwarded-For` (richieste inoltrate da Nginx/proxy). -**T10**— Crediti esauriti → fallback distinto: `isCreditsExhausted()` in `accountFallback.ts` restituisce 1 ora di recupero con il flag `creditsExhausted`, distinto dal limite di velocità generico 429. -**T11**— sforzo di ragionamento `max` → 131072 token di budget: `EFFORT_BUDGETS` e `THINKING_LEVEL_MAP` aggiornati; la mappatura inversa ora restituisce "max" per le risposte a budget completo. Test unitario aggiornato. -**T12**— Aggiunte voci di prezzo MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` aggiunte alla tabella dei prezzi (sub2api PR #1120). I prezzi M2.5/GLM-4.7/GLM-5/Kimi esistevano già. -**T15**— Normalizzazione del contenuto dell'array: l'helper `normalizeContentToString()` in `openai-to-claude.ts` comprime correttamente i messaggi di sistema/strumento formattati come array in una stringa prima di inviarli ad Anthropic.### 🧪 Tests

- Suite di test:**832 test, 0 fallimenti**(invariato rispetto a rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**: API di provisioning delle chiavi registrate: chiavi API emesse automaticamente con applicazione della quota per provider e per account

- `POST /api/v1/registered-keys`: rilascia chiavi con supporto per idempotenza
- `GET /api/v1/registered-keys` — elenca le chiavi registrate (mascherate).
- `GET /api/v1/registered-keys/{id}`: ottieni i metadati della chiave
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revoca le chiavi
- `GET /api/v1/quotas/check`: preconvalida prima dell'emissione
- `PUT /api/v1/providers/{id}/limits`: imposta i limiti di emissione del provider
- `PUT /api/v1/accounts/{id}/limits`: imposta i limiti di emissione dell'account
- `POST /api/v1/issues/report`: segnalazione facoltativa dei problemi di GitHub
- Migrazione DB 008: tabelle `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**: aggiunti i provider OpenCode Zen e OpenCode Go (di @kang-heewon)

- Nuovo `OpencodeExecutor` con routing multiformato (`/chat/completions`, `/messages`, `/responses`)
- 7 modelli su entrambi i livelli---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Le icone dei provider ora utilizzano [@lobehub/icons](https://github.com/lobehub/lobe-icons) con un grazioso fallback PNG e un componente `ProviderIcon` (oltre 130 provider supportati) -**#488**— Aggiorna automaticamente gli elenchi dei modelli ogni 24 ore tramite `modelSyncScheduler` (configurabile tramite `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: ora mostra un chiaro errore eseguibile quando `GEMINI_OAUTH_CLIENT_SECRET` manca nelle distribuzioni Docker/self-hosted---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Convalida della chiave AI LongCat: baseUrl fissa (`api.longcat.chat/openai`) e authHeader (`Autorizzazione: Bearer`) -**#535**— Override del modello bloccato: `body.model` è ora impostato su `pinnedModel` quando la protezione della cache di contesto rileva un modello bloccato -**#524**— La configurazione OpenCode ora viene salvata correttamente: aggiunto il gestore `saveOpenCodeConfig()` (XDG_CONFIG_HOME consapevole, scrive TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**: l'accesso non si blocca più dopo aver saltato l'impostazione della password (reindirizza all'onboarding) -**#522**— Gestore API: rimosso il pulsante fuorviante "Copia chiave mascherata" (sostituito con la descrizione comando dell'icona del lucchetto) -**#527**— Ciclo dei superpoteri Claude Code + Codex: i blocchi `tool_result` ora sono convertiti in testo invece che eliminati -**#532**— La convalida della chiave API OpenCode GO ora utilizza l'endpoint `zen/v1` corretto (`testKeyBaseUrl`) -**#489**— Antigravità: `googleProjectId` mancante restituisce un errore strutturato 422 con guida alla riconnessione -**#510**— Windows: i percorsi MSYS2/Git-Bash (`/c/Program Files/...`) sono ora normalizzati in `C:\Program Files\...` -**#492**— La CLI di `omniroute` ora rileva `mise`/`nvm` quando manca `app/server.js` e mostra la correzione mirata### Documentazione

-**#513**— Reimpostazione della password Docker: `INITIAL_PASSWORD` env var soluzione alternativa documentata -**#520**— pnpm: `pnpm approve-builds better-sqlite3` documented### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: nuovi provider OpenCode, correzione delle credenziali di incorporamento, bug della chiave mascherata CLI, correzione CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Gli strumenti CLI salvano la chiave API mascherata nei file di configurazione**— I percorsi POST di `claude-settings`, `cline-settings` e `openclaw-settings` ora accettano un parametro `keyId` e risolvono la chiave API reale dal DB prima di scrivere sul disco. `ClaudeToolCard` aggiornato per inviare `keyId` invece della stringa di visualizzazione mascherata. Correzioni #523, #526. -**Provider di incorporamento personalizzati: errore `Nessuna credenziale`**— `/v1/embeddings` ora tiene traccia di `credentialsProviderId` separatamente dal prefisso di routing, quindi le credenziali vengono recuperate dall'ID del nodo del provider corrispondente anziché dalla stringa del prefisso pubblico. Risolve una regressione in cui `google/gemini-embedding-001` e modelli simili di provider personalizzati fallivano sempre con un errore di credenziali. Correzioni relative al #532. (PR n. 528 di @jacob2826) -**L'espressione regolare di protezione della cache del contesto non riesce a `
` prefisso**— `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` aggiornato per corrispondere a entrambi i valori letterali `
` (barra rovesciata-n) e il ritorno a capo effettivo U+000A che lo streaming `combo.ts` inserisce attorno al tag `<omniModel>` dopo la correzione #515. Correzioni #531.### ✨ New Providers

-**OpenCode Zen**— Gateway di livello gratuito su `opencode.ai/zen/v1` con 3 modelli: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Servizio in abbonamento su `opencode.ai/zen/go/v1` con 4 modelli: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (formato Claude), `minimax-m2.5` (formato Claude)

- Entrambi i provider utilizzano il nuovo `OpencodeExecutor` che instrada dinamicamente a `/chat/completions`, `/messages`, `/responses` o `/models/{model}:generateContent` in base al modello richiesto. (PR n. 530 di @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: correzioni di bug: preserva la chiave della cache del prompt del Codex, correggi l'escape JSON del tagContent, sincronizza lo stato del token scaduto nel DB.### 🐛 Bug Fixes

-**fix(translator)**: preserva `prompt_cache_key` nell'API di risposta → traduzione dei completamenti chat (#517)
— Il campo è un segnale di affinità cache utilizzato dal Codex; eliminandolo si impedivano i riscontri rapidi della cache.
Risolto il problema con "openai-responses.ts" e "responsesApiHelper.ts".

-**correzione(combo)**: Escape `
` in `tagContent` quindi la stringa JSON inserita è valida (#515)
— Template literal newlines (U+000A) are not allowed unescaped inside JSON string values.
Sostituito con `\n` sequenze letterali in `open-sse/services/combo.ts`.

-**correzione (utilizzo)**: sincronizza lo stato del token scaduto nel DB in caso di errore di autenticazione in tempo reale (#491)
— Quando il controllo in tempo reale di Limiti e quote restituisce 401/403, la connessione "testStatus" viene ora aggiornata
su "scaduto" nel database in modo che la pagina Provider rifletta lo stesso stato degradato.
Risolto il problema in "src/app/api/usage/[connectionId]/route.ts".---

## [2.9.3] — 2026-03-21

> Sprint: aggiungi 5 nuovi provider AI gratuiti: LongCat, Pollinations, Cloudflare AI, Scaleway, API AI/ML.### ✨ New Providers

-**feat(providers/longcat)**: aggiunta LongCat AI (`lc/`) — 50 milioni di token al giorno gratuiti (Flash-Lite) + 500.000 al giorno (Chat/Thinking) durante la beta pubblica. Compatibile con OpenAI, autenticazione al portatore standard. -**feat(providers/pollinations)**: aggiunta di Pollinations AI (`pol/`) — non è richiesta alcuna chiave API. Proxy GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 richiesta/15 secondi gratis). L'esecutore personalizzato gestisce l'autenticazione opzionale. -**feat(providers/cloudflare-ai)**: aggiungi Cloudflare Workers AI (`cf/`) — 10.000 neuroni al giorno gratuiti (~150 risposte LLM o 500 audio Whisper). Oltre 50 modelli all'avanguardia a livello globale. L'esecutore personalizzato crea un URL dinamico con "accountId" dalle credenziali. -**feat(providers/scaleway)**: aggiungi le API generative Scaleway (`scw/`) — 1 milione di token gratuiti per i nuovi account. Conforme all'UE/GDPR (Parigi). Qwen3 235B, Lama 3.1 70B, Maestrale Piccolo 3.2. -**feat(providers/aimlapi)**: aggiunta API AI/ML (`aiml/`): credito gratuito di $ 0,025 al giorno, oltre 200 modelli (GPT-4o, Claude, Gemini, Llama) tramite un singolo endpoint aggregatore.### 🔄 Provider Updates

-**feat(providers/together)**: aggiunto `hasFree: true` + 3 ID modello permanentemente gratuiti: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: aggiunto `hasFree: true` + `freeNote` (1.500 req/giorno, non è necessaria la carta di credito, aistudio.google.com) -**chore(providers/gemini)**: rinomina il nome visualizzato in "Gemini (Google AI Studio)" per maggiore chiarezza### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Nuovo `PollinationsExecutor` — omette l'intestazione `Authorization` quando non viene fornita alcuna chiave API -**feat(executors/cloudflare-ai)**: nuovo `CloudflareAIExecutor`: la costruzione di URL dinamici richiede `accountId` nelle credenziali del provider -**feat(esecutori)**: registra le mappature degli esecutori `pollinations`, `pol`, `cloudflare-ai`, `cf`### Documentazione

-**docs(readme)**: stack combinato gratuito espanso a 11 provider ($ 0 per sempre) -**docs(readme)**: aggiunte 4 nuove sezioni gratuite del provider (LongCat, Pollinations, Cloudflare AI, Scaleway) con tabelle modello -**docs(readme)**: tabella dei prezzi aggiornata con 4 nuove righe del livello gratuito -**docs(i18n/pt-BR)**: tabella dei prezzi aggiornata + aggiunte sezioni LongCat/Pollinations/Cloudflare AI/Scaleway in portoghese -**docs(new-features/ai)**: 10 file di specifiche delle attività + piano di implementazione principale in `docs/new-features/ai/`### 🧪 Tests

- Suite di test:**821 test, 0 fallimenti**(invariato)---

## [2.9.2] — 2026-03-21

> Sprint: corretta la trascrizione multimediale (Deepgram/HuggingFace Content-Type, rilevamento della lingua) e la visualizzazione degli errori TTS.### 🐛 Bug Fixes

-**correzione (trascrizione)**: la trascrizione audio di Deepgram e HuggingFace ora mappa correttamente `video/mp4` → `audio/mp4` e altri tipi MIME multimediali tramite il nuovo helper `resolveAudioContentType()`. In precedenza, il caricamento di file ".mp4" restituiva costantemente "Nessun parlato rilevato" perché Deepgram riceveva "Tipo di contenuto: video/mp4". -**fix(trascrizione)**: aggiunto `detect_lingual=true` alle richieste Deepgram: rileva automaticamente la lingua audio (portoghese, spagnolo, ecc.) anziché l'inglese per impostazione predefinita. Corregge le trascrizioni non inglesi che restituiscono risultati vuoti o spazzatura. -**fix(trascrizione)**: aggiunto `punctuate=true` alle richieste di Deepgram per output di trascrizione di qualità superiore con punteggiatura corretta. -**fix(tts)**: visualizzazione dell'errore `[object Object]` nelle risposte di sintesi vocale corretta sia in `audioSpeech.ts` che in `audioTranscription.ts`. La funzione `upstreamErrorResponse()` ora estrae correttamente i messaggi di stringa nidificati da provider come ElevenLabs che restituiscono `{ error: { message: "...", status_code: 401 } }` invece di una stringa di errore semplice.### 🧪 Tests

- Suite di test:**821 test, 0 fallimenti**(invariato)### Triaged Issues

-**#508**— Regressione del formato della chiamata dello strumento: log proxy richiesti e informazioni sulla catena del provider ("info sui bisogni") -**#510**— Percorso del controllo di integrità della CLI di Windows: informazioni sulla versione della shell/nodo richieste (`needs-info`) -**#485**: chiamate dello strumento Kiro MCP: chiuse come problema Kiro esterno (non OmniRoute) -**#442**— Endpoint Baseten /models: chiuso (soluzione manuale documentata) -**#464**— API di provisioning delle chiavi: riconosciuta come elemento della roadmap---

## [2.9.1] — 2026-03-21

> Sprint: correzione della perdita di dati SSE omniModel, unione della compatibilità del modello per protocollo.### Bug Fixes

-**#511**— Critico: il tag `<omniModel>` è stato inviato dopo `finish_reason:stop` nei flussi SSE, causando la perdita di dati. Il tag viene ora inserito nel primo blocco di contenuto non vuoto, garantendo la consegna prima che gli SDK chiudano la connessione.### Merged PRs

-**PR #512**(@zhangqiang8vip): compatibilità del modello per protocollo: `normalizeToolCallId` e `preserveOpenAIDeveloperRole` possono ora essere configurati per protocollo client (OpenAI, Claude, Responses API). Nuovo campo `compatByProtocol` nella configurazione del modello con convalida Zod.### Triaged Issues

-**#510**— Controllo integrità CLI di Windows_failed: informazioni su PATH/versione richieste -**#509**— Regressione Turbopack Electron: bug Next.js upstream, soluzioni alternative documentate -**#508**— Schermata nera di macOS: soluzione alternativa suggerita `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: correzione machineId multipiattaforma, limiti di velocità per chiave API, cache del contesto di streaming, Alibaba DashScope, analisi di ricerca, ZWS v5 e 8 problemi chiusi.### ✨ New Features

-**feat(search)**: scheda Analisi delle ricerche in `/dashboard/analytics`: suddivisione dei fornitori, percentuale di riscontri nella cache, monitoraggio dei costi. Nuova API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope aggiunto con convalida del percorso endpoint personalizzato: `chatPath` e `modelsPath` configurabili per nodo (#feat/custom-endpoint-paths) -**feat(api)**: limiti di conteggio delle richieste per chiave API: colonne "max_requests_per_day" e "max_requests_per_minute" con applicazione della finestra scorrevole in memoria che restituisce HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Correzione di perdite HMR (connessioni 485 DB → 1), memoria 2,4 GB → 195 MB, singleton `globalThis`, correzione avviso Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**correzione(#506)**: `machineId` multipiattaforma — `getMachineIdRaw()` riscritto con try/catch Waterfall (Windows REG.exe → macOS ioreg → Lettura file Linux → nome host → `os.hostname()`). Elimina la ramificazione di `process.platform` eliminata dal codice morto del bundler Next.js, correggendo il problema con `'head' non riconosciuto` su Windows. Corregge anche il problema #466. -**correzione(#493)**: denominazione personalizzata del modello del provider: rimossa l'eliminazione errata del prefisso in `DefaultExecutor.transformRequest()` che alterava gli ID dei modelli con ambito org come `zai-org/GLM-5-FP8`. -**correzione(#490)**: Streaming + protezione della cache di contesto — `TransformStream` intercetta SSE per inserire il tag `<omniModel>` prima del marcatore `[DONE]`, abilitando la protezione della cache di contesto per le risposte in streaming. -**correzione(#458)**: convalida dello schema combinato: i campi `system_message`, `tool_filter_regex`, `context_cache_protection` ora superano la convalida Zod al salvataggio. -**correzione(#487)**: pulizia della scheda KIRO MITM: rimosso ZWS_README, generato `AntigravityToolCard` per utilizzare i metadati dello strumento dinamico.### 🧪 Tests

- Aggiunti test unitari di filtraggio degli strumenti in formato antropico (PR #397) — 8 test di regressione per `tool.name` senza wrapper `.function`
- Suite di test:**821 test, 0 errori**(rispetto a 813)### 📋 Issues Closed (8)

-**#506**— ID macchina Windows `head` non riconosciuto (risolto) -**#493**: denominazione personalizzata del modello del provider (risolto) -**#490**— Cache del contesto di streaming (risolto) -**#452**: limiti di richiesta per chiave API (implementati) -**#466**: errore di accesso a Windows (stessa causa principale di #506) -**#504**— MITM inattivo (comportamento previsto) -**#462**— Gemini CLI PSA (risolto) -**#434**— Arresto anomalo dell'app Electron (duplicato di #402)## [2.8.9] — 2026-03-20

> Sprint: unisci i PR della comunità, correggi la scheda KIRO MITM, aggiornamenti delle dipendenze.### Merged PRs

-**PR #498**(@Sajid11194): risolto il crash dell'ID macchina Windows (`unfine\REG.exe`). Sostituisce `node-machine-id` con le query del registro del sistema operativo nativo.**Chiude #486.** -**PR #497**(@zhangqiang8vip): corrette le perdite di risorse HMR in modalità sviluppatore: 485 connessioni DB trapelate → 1, memoria 2,4 GB → 195 MB. Singleton "globalThis", correzione degli avvisi di Edge Runtime, stabilità del test di Windows. (+1168/-338 su 22 file) -**PR n. 499-503**(Dependabot): aggiornamenti di GitHub Actions: `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— La scheda KIRO MITM ora mostra istruzioni specifiche per lo strumento (`api.anthropic.com`) invece del testo specifico per Antigravity. -**#504**: risposta con chiarimenti sull'UX (MITM "Inattivo" è il comportamento previsto quando il proxy non è in esecuzione).---

## [2.8.8] — 2026-03-20

> Sprint: risolto il crash del test batch OAuth, aggiunto il pulsante "Test All" alle pagine dei singoli provider.### Bug Fixes

-**Arresto anomalo del test batch OAuth**(ERR_CONNECTION_REFUSED): sostituito il ciclo for sequenziale con un limite di concorrenza di 5 connessioni + timeout di 30 secondi per connessione tramite `Promise.race()` + `Promise.allSettled()`. Previene l'arresto anomalo del server durante il test di gruppi di provider OAuth di grandi dimensioni (~30+ connessioni).### Funzionalità

-**Pulsante "Prova tutto" sulle pagine dei provider**: le pagine dei singoli fornitori (ad esempio, `/providers/codex`) ora mostrano un pulsante "Prova tutto" nell'intestazione Connessioni quando sono presenti più di 2 connessioni. Utilizza `POST /api/providers/test-batch` con `{mode: "provider", providerId}`. Risultati visualizzati in modalità modale con riepilogo pass/fail e diagnosi per connessione.---

## [2.8.7] — 2026-03-20

> Sprint: unione PR #495 (drop collo di bottiglia 429), correzione #496 (fornitori di incorporamento personalizzato), funzionalità di triage.### Bug Fixes

-**Collo di bottiglia 429 attesa infinita**(PR #495 di @xandr0s): su 429, `limiter.stop({ dropWaitingJobs: true })` fallisce immediatamente tutte le richieste in coda in modo che i chiamanti upstream possano attivare il fallback. Il limitatore viene eliminato dalla mappa, quindi la richiesta successiva crea una nuova istanza. -**Modelli di incorporamento personalizzati irrisolvibili**(#496): `POST /v1/embeddings` ora risolve i modelli di incorporamento personalizzati da TUTTI i provider_nodes (non solo localhost). Abilita modelli come "google/gemini-embedding-001" aggiunti tramite dashboard.### Issues Responded

-**#452**: limiti di conteggio delle richieste per chiave API (riconosciuti, sulla roadmap) -**#464**: chiavi API emesse automaticamente con limiti di provider/account (sono necessari maggiori dettagli) -**#488**: aggiornamento automatico degli elenchi dei modelli (riconosciuto, sulla roadmap) -**#496**: risoluzione del provider di incorporamento personalizzato (risolto)---

## [2.8.6] — 2026-03-20

> Sprint: unione PR #494 (correzione ruolo MiniMax), correzione dashboard KIRO MITM, problemi di triage 8.### Funzionalità

-**Sviluppatore MiniMax→correzione ruolo di sistema**(PR n. 494 di @zhangqiang8vip): attiva/disattiva `preserveDeveloperRole` per modello. Aggiunge l'interfaccia utente "Compatibilità" nella pagina dei fornitori. Risolto il problema relativo all'errore 422 "parametro ruolo" per MiniMax e gateway simili. -**roleNormalizer**: `normalizeDeveloperRole()` ora accetta il parametro `preserveDeveloperRole` con comportamento a tre stati (unDefinito=mantieni, true=mantieni, false=converti). -**DB**: nuovi `getModelPreserveOpenAIDeveloperRole()` e `mergeModelCompatOverride()` in `models.ts`.### Bug Fixes

-**Dashboard KIRO MITM**(#481/#487): `CLIToolsPageClient` ora instrada qualsiasi strumento `configType: "mitm"` a `AntigravityToolCard` (controlli Start/Stop MITM). In precedenza solo Antigravity era codificato. -**AntigravityToolCard generico**: utilizza `tool.image`, `tool.description`, `tool.id` invece dei valori Antigravity codificati. Protegge dai `defaultModels` mancanti.### Cleanup

- Rimosso `ZWS_README_V2.md` (documenti di solo sviluppo dal PR n. 494).### Issues Triaged (8)

-**#487**— Chiuso (KIRO MITM corretto in questa versione) -**#486**— ha bisogno di informazioni (problema relativo al PATH di Windows REG.exe) -**#489**: ha bisogno di informazioni (ID progetto Antigravity mancante, è necessaria la riconnessione OAuth) -**#492**— need-info (app/server.js mancante sul nodo mal gestito) -**#490**— Riconosciuto (streaming + blocco della cache di contesto, correzione pianificata) -**#491**— Riconosciuto (incoerenza dello stato di autenticazione del Codex) -**#493**: riconosciuto (prefisso del nome del modello del provider modale, soluzione alternativa fornita) -**#488**: arretrato di richieste di funzionalità (elenchi di modelli con aggiornamento automatico)---

## [2.8.5] — 2026-03-19

> Sprint: risolti i flussi SSE zombie, la cache di contesto al primo turno, KIRO MITM e i problemi esterni di triage 5.### Bug Fixes

-**Streaming SSE Zombie**(#473): ridotto `STREAM_IDLE_TIMEOUT_MS` da 300 → 120 secondi per un fallback combinato più rapido quando i provider si bloccano a metà streaming. Configurabile tramite env var. -**Tag cache di contesto**(#474): risolto il problema con `injectModelTag()` per gestire le richieste del primo turno (nessun messaggio di assistente): la protezione della cache di contesto ora funziona fin dalla prima risposta. -**KIRO MITM**(#481): modifica KIRO `configType` da `guide` → `mitm` in modo che la dashboard visualizzi i controlli Start/Stop MITM. -**Test E2E**(CI): correggere `providers-bailian-coding-plan.spec.ts`: ignora l'overlay modale preesistente prima di fare clic sul pulsante Aggiungi chiave API.### Closed Issues

- #473 — I flussi Zombie SSE bypassano il fallback combinato
- #474 — Tag della cache contestuale `<omniModel>` mancante al primo turno
- #481 — MITM per KIRO non attivabile dal dashboard
- #468: server remoto Gemini CLI (sostituito dalla deprecazione #462)
- #438 — Claude non è in grado di scrivere file (problema CLI esterno)
- #439 — AppImage non funziona (soluzione alternativa documentata con libfuse2)
- #402 - ARM64 DMG "danneggiato" (soluzione alternativa documentata xattr -cr)
- #460: CLI non eseguibile su Windows (correzione PATH documentata)---

## [2.8.4] — 2026-03-19

> Sprint: deprecazione della CLI Gemini, correzione i18n della guida VM, correzione della sicurezza dependabot, espansione dello schema del provider.### Funzionalità

-**Deprecazione della Gemini CLI**(#462): contrassegna il provider `gemini-cli` come deprecato con un avviso: Google limita l'utilizzo di OAuth di terze parti da marzo 2026 -**Schema provider**(#462): espande la convalida Zod con i campi opzionali `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): aggiunto `VM_DEPLOYMENT_GUIDE.md` alla pipeline di traduzione i18n, rigenera tutte le 30 traduzioni locali dall'origine inglese (erano bloccate in portoghese).### Sicurezza

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — risolve l'inquinamento del prototipo CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regressione degli alias del modello (risolto nella v2.8.2)
- #471 — Traduzioni della guida VM interrotte
- #483 — Finale `data: null` dopo `[DONE]` (risolto nella v2.8.3)### Merged PRs

- #484 — deps: bump flattato da 3.3.3 a 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: i18n ceco, correzione del protocollo SSE, traduzione della guida VM.### Funzionalità

-**Lingua ceca**(#482): ceco completo (cs) i18n: 22 documenti, 2606 stringhe UI, aggiornamenti per il cambio di lingua (@zen0bit) -**Guida alla distribuzione delle VM**: tradotto dal portoghese all'inglese come documento sorgente (@zen0bit)### Bug Fixes

-**Protocollo SSE**(#483): interrompe l'invio di `data: null` finale dopo il segnale `[DONE]`: corregge `AI_TypeValidationError` nei client AI SDK rigorosi (validatori basati su Zod).### Merged PRs

- #482 - Aggiungi la lingua ceca + Correggi la fonte inglese VM_DEPLOYMENT_GUIDE.md (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 PR uniti, correzione del routing degli alias del modello, esportazione dei log e valutazione dei problemi.### Funzionalità

-**Esportazione registri**: nuovo pulsante di esportazione su `/dashboard/logs` con menu a discesa dell'intervallo di tempo (1 ora, 6 ore, 12 ore, 24 ore). Scarica JSON di log di richieste/proxy/chiamate tramite l'API `/api/logs/export` (#user-request)### Bug Fixes

-**Instradamento degli alias del modello**(#472): Impostazioni → Gli alias del modello ora influenzano correttamente il routing del provider, non solo il rilevamento del formato. In precedenza l'output di `resolveModelAlias()` veniva utilizzato solo per `getModelTargetFormat()` ma l'ID del modello originale veniva inviato al provider -**Utilizzo dello svuotamento del flusso**(#480): i dati sull'utilizzo dell'ultimo evento SSE nel buffer vengono ora estratti correttamente durante lo scaricamento del flusso (uniti da @prakersh)### Merged PRs

- #480: estrae l'utilizzo dal buffer rimanente nel gestore di flush (@prakersh)
- #479 - Aggiunte voci di prezzo mancanti per il Codex 5.3/5.4 e l'ID del modello antropico (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: cinque PR della community: correzioni del registro delle chiamate in streaming, compatibilità con Kiro, analisi dei token della cache, traduzione in cinese e ID di chiamata degli strumenti configurabili.### Funzionalità

-**feat(logs)**: il contenuto della risposta del registro delle chiamate ora viene accumulato correttamente dai blocchi grezzi del provider (OpenAI/Claude/Gemini) prima della traduzione, risolvendo i payload di risposta vuoti in modalità streaming (#470, @zhangqiang8vip). -**feat(providers)**: normalizzazione dell'ID chiamata dello strumento a 9 caratteri configurabile per modello (stile Mistral): solo i modelli con l'opzione abilitata ottengono ID troncati (#470) -**feat(api)**: API Key PATCH estesa per supportare i campi `allowedConnections`, `name`, `autoResolve`, `isActive` e `accessSchedule` (#470) -**feat(dashboard)**: layout della prima risposta nell'interfaccia utente dei dettagli del registro delle richieste (#470) -**feat(i18n)**: traduzione cinese (zh-CN) migliorata — ritraduzione completa (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: rimuove il campo `model` inserito dal corpo della richiesta: l'API Kiro rifiuta i campi di livello superiore sconosciuti (#478, @prakersh) -**correzione (utilizzo)**: include la lettura della cache + i token di creazione della cache nei totali di input della cronologia di utilizzo per analisi accurate (#477, @prakersh) -**fix(callLogs)**: supporta i campi di utilizzo del formato Claude (`input_tokens`/`output_tokens`) insieme al formato OpenAI, include tutte le varianti dei token cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: fornitore del piano di codifica Bailian con URL di base modificabili, oltre a contributi della community per Alibaba Cloud e Kimi Coding.### Funzionalità

-**feat(providers)**: aggiunto il piano di codifica Bailian ("bailian-coding-plan") — Alibaba Model Studio con API compatibile con Anthropic. Catalogo statico di 8 modelli tra cui Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 e Kimi K2.5. Include la convalida dell'autenticazione personalizzata (400=valido, 401/403=non valido) (#467, @Mind-Dragon) -**feat(admin)**: URL predefinito modificabile nei flussi di creazione/modifica di Amministrazione del provider: gli utenti possono configurare URL di base personalizzati per connessione. Persistito in `providerSpecificData.baseUrl` con la convalida dello schema Zod che rifiutava gli schemi non http(s) (#467)### 🧪 Tests

- Aggiunti oltre 30 unit test e 2 scenari e2e per il provider del piano di codifica Bailian che coprono la convalida dell'autenticazione, il rafforzamento dello schema, il comportamento a livello di percorso e l'integrazione tra livelli---

## [2.7.10] — 2026-03-19

> Sprint: due nuovi fornitori forniti dalla comunità (Alibaba Cloud Coding, chiave API Kimi Coding) e correzione pino Docker.### Funzionalità

-**feat(providers)**: aggiunto il supporto del piano Alibaba Cloud Coding con due endpoint compatibili con OpenAI: `alicode` (Cina) e `alicode-intl` (internazionale), ciascuno con 8 modelli (#465, @dtk1985) -**feat(providers)**: aggiunto il percorso dedicato del provider `kimi-coding-apikey`: l'accesso a Kimi Coding basato su chiave API non è più forzato tramite il percorso `kimi-coding` solo OAuth. Include registro, costanti, API dei modelli, configurazione e test di convalida (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: aggiunta la dipendenza `split2` mancante all'immagine Docker: `pino-abstract-transport` la richiede in fase di runtime ma non veniva copiata nel contenitore autonomo, causando arresti anomali di `Impossibile trovare il modulo 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: passthrough del sottopercorso delle risposte del Codex supportato in modo nativo, arresto anomalo di Windows MITM risolto e schemi agente Combo modificati.### Funzionalità

-**feat(codex)**: passthrough del sottopercorso delle risposte native per il Codex: instrada nativamente `POST /v1/responses/compact` al Codex a monte, mantenendo la compatibilità del codice Claude senza rimuovere il suffisso `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: gli schemi Zod (`updateComboSchema` e `createComboSchema`) ora includono `system_message`, `tool_filter_regex` e `context_cache_protection`. Risolto un bug per cui le impostazioni specifiche dell'agente create tramite la dashboard venivano ignorate silenziosamente dal livello di convalida del backend (#458) -**fix(mitm)**: risolto il crash del profilo Kiro MITM su Windows: `node-machine-id` non è riuscito a causa della mancanza di `REG.exe` env e il fallback ha generato un errore fatale "crypto is not define". Il fallback ora importa in modo sicuro e corretto la crittografia (#456)---

## [2.7.8] — 2026-03-18

> Sprint: bug di salvataggio del budget + funzionalità combinate dell'agente UI + correzione della sicurezza del tag omniModel.### 🐛 Bug Fixes

-**fix(budget)**: "Salva limiti" non restituisce più 422 — `warningThreshold` ora viene inviato correttamente come frazione (0–1) anziché come percentuale (0–100) (#451) -**fix(combos)**: il tag della cache interna `<omniModel>` viene ora rimosso prima di inoltrare le richieste ai provider, impedendo interruzioni della sessione di cache (#454)### Funzionalità

-**feat(combos)**: sezione Funzionalità agente aggiunta alla modalità di creazione/modifica combo: espone l'override di `system_message`, `tool_filter_regex` e `context_cache_protection` direttamente dal dashboard (#454)---

## [2.7.7] — 2026-03-18

> Sprint: arresto anomalo di Docker pino, correzione del lavoratore delle risposte della CLI del Codex, sincronizzazione del blocco dei pacchetti.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` e `pino-pretty` ora copiati esplicitamente nella fase runner Docker — La traccia standalone Next.js non rileva queste dipendenze peer, causando il crash di `Impossibile trovare il modulo pino-abstract-transport` all'avvio (#449) -**risolto (risposte)**: rimosso `initTranslators()` dal percorso `/v1/responses`: si verificava l'arresto anomalo del lavoratore Next.js con `il lavoratore è uscito` uncaughtException sulle richieste CLI del Codex (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` ora è stato eseguito su ogni bump di versione per garantire che Docker `npm ci` utilizzi le versioni esatte delle dipendenze---

## [2.7.5] — 2026-03-18

> Sprint: miglioramenti UX e correzione del controllo dello stato della CLI di Windows.### 🐛 Bug Fixes

-**correzione(ux)**: mostra il suggerimento password predefinito nella pagina di accesso: i nuovi utenti ora vedono `"Password predefinita: 123456"` sotto l'immissione della password (#437) -**fix(cli)**: Claude CLI e altri strumenti installati da npm ora vengono rilevati correttamente come eseguibili su Windows: spawn utilizza `shell:true` per risolvere i wrapper `.cmd` tramite PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: dashboard degli strumenti di ricerca, correzioni i18n, limiti Copilot, correzione convalida Serper.### Funzionalità

-**feat(search)**: aggiunta area di gioco di ricerca (10° endpoint), pagina Strumenti di ricerca con confronto di provider/pipeline di riclassificazione/cronologia di ricerca, routing di riclassificazione locale, protezioni di autenticazione sull'API di ricerca (#443 di @Regis-RCR)

- Nuovo percorso: `/dashboard/search-tools`
- Voce della barra laterale nella sezione Debug
- `GET /api/search/providers` e `GET /api/search/stats` con protezioni di autenticazione
- Routing provider_nodes locale per `/v1/rerank`
- Oltre 30 chiavi i18n nello spazio dei nomi di ricerca### 🐛 Bug Fixes

-**correzione (ricerca)**: corretto il normalizzatore di notizie Brave (restituiva 0 risultati), applicazione del troncamento max_results post-normalizzazione, corretto l'URL di recupero della pagina Endpoint (#443 di @Regis-RCR) -**fix(analytics)**: localizza le etichette giorno/data di analisi: sostituisci le stringhe portoghesi hardcoded con `Intl.DateTimeFormat(locale)` (#444 di @hijak) -**fix(copilot)**: corretta visualizzazione del tipo di account GitHub Copilot, filtraggio di righe di quota illimitata fuorvianti dal dashboard dei limiti (#445 di @hijak) -**correzione(provider)**: smetti di rifiutare chiavi API Serper valide: tratta le risposte non 4xx come autenticazione valida (#446 di @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: correzione del fallback della quota API diretta del Codex.### 🐛 Bug Fixes

-**fix(codex)**: blocca gli account esauriti settimanalmente nel fallback API diretto (#440)

- Corrispondenza del prefisso `resolveQuotaWindow()`: `"weekly"` ora corrisponde alle chiavi della cache `"weekly (7d)"`
- `applyCodexWindowPolicy()` impone l'attivazione/disattivazione corretta di `useWeekly`/`use5h`
- 4 nuovi test di regressione (766 in totale)---

## [2.7.2] — 2026-03-18

> Sprint: correzioni del contrasto dell'interfaccia utente in modalità Luce.### 🐛 Bug Fixes

-**fix(logs)**: risolto il contrasto della modalità luce nei pulsanti del filtro dei log delle richieste e nel badge combinato (#378).

- I pulsanti del filtro Errore/Riuscito/Combo ora sono leggibili in modalità luce
- Il badge della riga combinata utilizza un viola più forte in modalità luce---

## [2.7.1] — 2026-03-17

> Sprint: routing di ricerca web unificato (POST /v1/search) con 5 provider + correzioni di sicurezza Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: routing di ricerca web unificato — `POST /v1/search` con 5 provider (Serper, Brave, Perplexity, Exa, Tavily)

- Failover automatico tra provider, oltre 6.500 ricerche gratuite al mese
- Cache in memoria con coalescenza delle richieste (TTL configurabile)
- Dashboard: scheda Analisi delle ricerche in "/dashboard/analytics" con suddivisione dei fornitori, percentuale di riscontri nella cache, monitoraggio dei costi
- Nuova API: `GET /api/v1/search/analytics` per le statistiche delle richieste di ricerca
- Migrazione del DB: colonna "request_type" su "call_logs" per il monitoraggio delle richieste non chat
- Convalida Zod (`v1SearchSchema`), autenticata, costo registrato tramite `recordCost()`### Sicurezza

-**deps**: Next.js 16.1.6 → 16.1.7 — corregge 6 CVE: -**Critico**: CVE-2026-29057 (contrabbando di richieste HTTP tramite proxy http) -**Alto**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Azioni server) -**Medio**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| File                                                             | Scopo                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Gestore di ricerca con routing a 5 provider                |
| `open-sse/config/searchRegistry.ts`                              | Registro dei fornitori (autenticazione, costo, quota, TTL) |
| `open-sse/services/searchCache.ts`                               | Cache in memoria con coalescenza delle richieste           |
| `src/app/api/v1/search/route.ts`                                 | Percorso Next.js (POST + GET)                              |
| `src/app/api/v1/search/analytics/route.ts`                       | API delle statistiche di ricerca                           |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Scheda dashboard Analisi                                   |
| `src/lib/db/migrations/007_search_request_type.sql`              | Migrazione DB                                              |
| `test/unità/search-registry.test.mjs`                            | 277 righe di test unitari                                  | --- |

## [2.7.0] — 2026-03-17

> Sprint: funzionalità ispirate a ClawRouter: flag toolCalling, rilevamento intent multilingue, fallback basato su benchmark, deduplicazione delle richieste, RouterStrategy collegabile, prezzi Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(prezzo)**: xAI Grok-4 Fast — `$0,20/$0,50 per 1 milione di token`, latenza p50 di 1143 ms, chiamata strumento supportata -**feat(pricing)**: xAI Grok-4 (standard) — `$0,20/$1,50 per 1 milione di token`, ragionamento di punta -**feat(prezzo)**: GLM-5 tramite Z.AI — `$0,5/1 milione`, contesto di output da 128.000 -**feat(pricing)**: MiniMax M2.5 — `$0,30/1 milione di input`, ragionamento + compiti di agente -**feat(prezzi)**: DeepSeek V3.2 — prezzo aggiornato "$0,27/$1,10 per 1 milione" -**feat(prezzo)**: Kimi K2.5 tramite Moonshot API: accesso diretto all'API Moonshot -**feat(providers)**: aggiunto il provider Z.AI (alias `zai`) — Famiglia GLM-5 con output 128K### 🧠 Routing Intelligence

-**feat(registry)**: flag `toolCalling` per modello nel registro del provider: le combo ora possono preferire/richiedere modelli in grado di richiamare strumenti -**feat(punteggio)**: rilevamento dell'intento multilingue per il punteggio AutoCombo: i modelli di script/linguaggio PT/ZH/ES/AR influenzano la selezione del modello in base al contesto della richiesta -**feat(fallback)**: catene di fallback basate sul benchmark: dati di latenza reale (p50 da "comboMetrics") utilizzati per riordinare dinamicamente la priorità di fallback -**feat(dedup)**: Richiedi la deduplicazione tramite content-hash: la finestra di idempotenza di 5 secondi impedisce alle chiamate duplicate del provider di ritentare i client -**feat(router)**: interfaccia `RouterStrategy` collegabile in `autoCombo/routerStrategy.ts`: la logica di routing personalizzata può essere inserita senza modificare il core### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nuovi schemi di strumenti avanzati: `omniroute_get_provider_metrics` (p50/p95/p99 per provider) e `omniroute_explain_route` (spiegazione della decisione di routing) -**feat(mcp)**: ambiti di autenticazione dello strumento MCP aggiornati — ambito `metrics:read` aggiunto per gli strumenti di metrica del provider -**feat(mcp)**: `omniroute_best_combo_for_task` ora accetta il parametro `lingualHint` per il routing multilingue### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` esteso con monitoraggio del percentile di latenza in tempo reale per provider/account -**feat(health)**: l'API Health (`/api/monitoring/health`) ora restituisce i campi "p50Latency" e "errorRate" per provider -**feat(usage)**: migrazione della cronologia di utilizzo per il monitoraggio della latenza per modello### 🗄️ DB Migrations

-**feat(migrations)**: nuova colonna `latency_p50` nella tabella `combo_metrics`: zero-breaking, sicura per gli utenti esistenti### 🐛 Bug Fixes / Closures

-**close(#411)**: risoluzione del modulo con hash better-sqlite3 su Windows: risolto nella v2.6.10 (f02c5b5) -**close(#409)**: i completamenti della chat di GitHub Copilot non riescono con i modelli Claude quando vengono allegati i file: risolto nella v2.6.9 (838f1d6) -**close(#405)**: duplicato di #411 — risolto## [2.6.10] — 2026-03-17

> Correzione per Windows: download precompilato better-sqlite3 senza node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**correzione(install/#426)**: Su Windows, `npm install -g omniroute` falliva con `better_sqlite3.node non è un'applicazione Win32 valida` perché il binario nativo in bundle era stato compilato per Linux. Aggiunge**Strategy 1.5**a `scripts/postinstall.mjs`: utilizza `@mapbox/node-pre-gyp install --fallback-to-build=false` (in bundle con `better-sqlite3`) per scaricare il file binario precompilato corretto per il sistema operativo/arch attuale senza richiedere alcuno strumento di compilazione (no node-gyp, no Python, no MSVC). Torna a "npm ricostruire" solo se il download fallisce. Aggiunge messaggi di errore specifici della piattaforma con chiare istruzioni per la correzione manuale.---

## [2.6.9] — 2026-03-17

> Correzioni CI (t11 con qualsiasi budget), correzione del bug n. 409 (file allegati tramite Copilot+Claude), correzione del flusso di lavoro del rilascio.### 🐛 Bug Fixes

-**fix(ci)**: rimossa la parola "any" dai commenti in `openai-responses.ts` e `chatCore.ts` che non superavano il controllo del budget t11 `any` (falso positivo dai commenti sul conteggio delle regex) -**fix(chatCore)**: normalizza i tipi di parti di contenuto non supportati prima dell'inoltro ai provider (#409 — Il cursore invia `{type:"file"}` quando i file `.md` sono allegati; Copilot e altri provider compatibili con OpenAI rifiutano con "il tipo deve essere 'image_url' o 'text'"; la correzione converte i blocchi `file`/`document` in `text` ed elimina i tipi sconosciuti)### 🔧 Workflow

-**chore(generate-release)**: aggiunta ATOMIC COMMIT RULE — il bump della versione (`npm version patch`) DEVE avvenire prima del commit dei file di funzionalità per garantire che il tag punti sempre a un commit contenente tutte le modifiche alla versione insieme---

## [2.6.8] — 2026-03-17

> Sprint: Combo come agente (prompt di sistema + filtro strumento), protezione della cache del contesto, aggiornamento automatico, registri dettagliati, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: nuova tabella `request_detail_logs` con trigger ring-buffer da 500 voci, attivazione tramite attivazione/disattivazione delle impostazioni### Funzionalità

-**feat(combo)**: Override del messaggio di sistema per Combo (#399 — il campo `system_message` sostituisce o inserisce il prompt di sistema prima dell'inoltro al provider) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` mantiene solo gli strumenti che corrispondono al pattern; supporta i formati OpenAI + Anthropic) -**feat(combo)**: Protezione della cache del contesto (#401 — `context_cache_protection` tag risposte con `<omniModel>provider/model</omniModel>` e modello pin per la continuità della sessione) -**feat(settings)**: aggiornamento automatico tramite Impostazioni (#320 — `GET /api/system/version` + `POST /api/system/update` — controlla il registro npm e gli aggiornamenti in background con il riavvio di pm2) -**feat(logs)**: registri dettagliati delle richieste (#378 — acquisisce i corpi completi della pipeline in 4 fasi: richiesta del cliente, richiesta tradotta, risposta del fornitore, risposta del cliente — attivazione/disattivazione, assetto da 64 KB, ring buffer da 500 voci) -**feat(mitm)**: profilo IDE MITM Kiro (#336 — `src/mitm/targets/kiro.ts` prende di mira api.anthropic.com, riutilizza l'infrastruttura MITM esistente)---

## [2.6.7] — 2026-03-17

> Sprint: miglioramenti SSE, estensioni provider_nodes locali, registro proxy, correzioni passthrough Claude.### Funzionalità

-**feat(health)**: controllo dello stato in background per `provider_nodes` locali con backoff esponenziale (30s→300s) e `Promise.allSettled` per evitare blocchi (#423, @Regis-RCR) -**feat(embeddings)**: instrada `/v1/embeddings` a `provider_nodes` locale — `buildDynamicEmbeddingProvider()` con convalida del nome host (#422, @Regis-RCR) -**feat(audio)**: instrada TTS/STT a `provider_nodes` locale — `buildDynamicAudioProvider()` con protezione SSRF (#416, @Regis-RCR) -**feat(proxy)**: registro proxy, API di gestione e generalizzazione dei limiti di quota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Elimina i campi specifici di Claude (`metadata`, `anthropic_version`) quando il target è OpenAI-compat (#421, @prakersh) -**fix(sse)**: estratto l'utilizzo di Claude SSE (`input_tokens`, `output_tokens`, token cache) in modalità flusso passthrough (#420, @prakersh) -**fix(sse)**: genera fallback `call_id` per chiamate a strumenti con ID mancanti/vuoti (#419, @prakersh) -**fix(sse)**: passaggio da Claude a Claude: corpo anteriore completamente intatto, nessuna ritraduzione (#418, @prakersh) -**fix(sse)**: filtra gli elementi `tool_result` orfani dopo la compattazione del contesto del codice Claude per evitare errori 400 (#417, @prakersh). -**fix(sse)**: ignora le chiamate allo strumento con nome vuoto nel traduttore dell'API Responses per impedire cicli infiniti di `placeholder_tool` (#415, @prakersh) -**fix(sse)**: rimuove i blocchi di contenuto di testo vuoti prima della traduzione (#427, @prakersh) -**fix(api)**: aggiunto `refreshable: true` alla configurazione del test Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump di `vitest`, `@vitest/*` e relative devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: compatibilità Turbopack/Docker: rimozione del protocollo `node:` da tutte le importazioni `src/`.### 🐛 Bug Fixes

-**fix(build)**: rimosso il prefisso del protocollo `node:` dalle istruzioni `import` in 17 file sotto `src/`. Le importazioni di `node:fs`, `node:path`, `node:url`, `node:os` ecc. causavano "Il file Ecmascript presentava un errore" sulle build Turbopack (Next.js 15 Docker) e sugli aggiornamenti da installazioni globali npm precedenti. File interessati: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` e altri 12 in `src/app/api/` e `src/lib/`. -**lavoretto (flusso di lavoro)**: aggiornato `generate-release.md` per fare in modo che la sincronizzazione dell'hub Docker e la distribuzione dual-VPS siano**passaggi obbligatori**in ogni versione.---

## [2.6.5] — 2026-03-17

> Sprint: filtraggio dei parametri del modello di ragionamento, correzione 404 del provider locale, provider Kilo Gateway, aumenti delle dipendenze.### ✨ New Features

-**feat(api)**: aggiunto**Kilo Gateway**(`api.kilo.ai`) come nuovo fornitore di chiavi API (alias `kg`) — oltre 335 modelli, 6 modelli gratuiti, 3 modelli di routing automatico (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modelli passthrough supportati tramite endpoint "/api/gateway/models". (PR n. 408 di @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: rimuove i parametri non supportati per i modelli di ragionamento (o1, o1-mini, o1-pro, o3, o3-mini). I modelli della famiglia `o1`/`o3` rifiutano `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` e `n` con HTTP 400. I parametri vengono ora rimossi al livello `chatCore` prima dell'inoltro. Utilizza un campo dichiarativo `unsupportedParams` per modello e una mappa O(1) precalcolata per la ricerca. (PR n. 412 di @Regis-RCR) -**fix(sse)**: il provider locale 404 ora comporta un**blocco solo del modello (5 secondi)**invece di un blocco a livello di connessione (2 minuti). Quando un backend di inferenza locale (Ollama, LM Studio, oMLX) restituisce 404 per un modello sconosciuto, la connessione rimane attiva e gli altri modelli continuano a funzionare immediatamente. Risolve anche un bug preesistente in cui `model` non veniva passato a `markAccountUnavailable()`. Provider locali rilevati tramite nome host (`localhost`, `127.0.0.1`, `::1`, estensibile tramite `LOCAL_HOSTNAMES` env var). (PR n. 410 di @Regis-RCR)### 📦 Dependencies

- `meglio-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- "base-agente" 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(provider)**: rimossi nomi di modelli inesistenti su 5 provider: -**gemini / gemini-cli**: rimossi `gemini-3.1-pro/flash` e `gemini-3-*-preview` (non esistono nell'API di Google v1beta); sostituito con `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravity**: rimossi `gemini-3.1-pro-high/low` e `gemini-3-flash` (alias interni non validi); sostituito con modelli 2.x reali -**github (Copilot)**: rimossi `gemini-3-flash-preview` e `gemini-3-pro-preview`; sostituito con "gemini-2.5-flash". -**nvidia**: corretto `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM utilizza lo spazio dei nomi `meta/` per i modelli Meta); aggiunti `nvidia/llama-3.1-70b-instruct` e `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Aggiornata la combo `free-stack` sul DB remoto: rimosso `qw/qwen3-coder-plus` (token di aggiornamento scaduto), corretto `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, corretto `gemini/gemini-3.1-flash` → "gemini/gemini-2.5-flash", aggiunto "if/deepseek-v3.2"---

## [2.6.3] — 2026-03-16

> Sprint: striscia hash zod/pino inserita nella pipeline di compilazione, provider sintetico aggiunto, percorso VPS PM2 corretto.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip ora viene eseguito in**tempo di compilazione**per TUTTI i pacchetti — non solo per `better-sqlite3`. Il passaggio 5.6 in "prepublish.mjs" percorre ogni ".js" in "app/.next/server/" ed elimina il suffisso esadecimale di 16 caratteri da qualsiasi "require()" con hash. Correzioni `zod-dcb22c...`, `pino-...`, ecc. MODULE_NOT_FOUND sulle installazioni npm globali. Chiude il numero 398 -**fix(deploy)**: PM2 su entrambi i VPS puntava a directory git-clone obsolete. Riconfigurato in "app/server.js" nel pacchetto globale npm. Aggiornato il flusso di lavoro `/deploy-vps` per utilizzare `npm pack + scp` (il registro npm rifiuta i pacchetti da 299 MB).### Funzionalità

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — inferenza compatibile con OpenAI incentrata sulla privacy. "passthroughModels: true" per il catalogo dinamico dei modelli HuggingFace. Modelli iniziali: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR n. 404 di @Regis-RCR)### 📋 Issues Closed

-**chiudi #398**: regressione dell'hash npm: risolto dall'hash-strip in fase di compilazione in fase di prepubblicazione -**triage #324**: screenshot del bug senza passaggi: dettagli di riproduzione richiesti---

## [2.6.2] — 2026-03-16

> Sprint: hashing del modulo completamente corretto, 2 PR accorpati (filtro strumenti antropici + percorsi endpoint personalizzati), aggiunto il provider Alibaba Cloud DashScope, 3 problemi obsoleti chiusi.### 🐛 Bug Fixes

-**fix(build)**: hash strip estesa del pacchetto web "externals" per coprire TUTTI i "serverExternalPackages", non solo "better-sqlite3". Next.js 16 Turbopack esegue l'hashing di `zod`, `pino` e di ogni altro pacchetto esterno al server in nomi come `zod-dcb22c6336e0bc69` che non esistono in `node_modules` in fase di runtime. Una regex catch-all HASH_PATTERN ora rimuove il suffisso di 16 caratteri e ritorna al nome del pacchetto base. Aggiunto anche `NEXT_PRIVATE_BUILD_WORKER=0` in "prepublish.mjs" per rafforzare la modalità webpack, oltre a una scansione post-build che segnala eventuali riferimenti con hash rimanenti. (#396, #398, PR #403) -**fix(chat)**: i nomi degli strumenti in formato antropico (`tool.name` senza wrapper `.function`) venivano eliminati silenziosamente dal filtro dei nomi vuoti introdotto in #346. LiteLLM inoltra le richieste con il prefisso `antropic/` nel formato API Messaggi Anthropic, causando il filtraggio di tutti gli strumenti e la restituzione di Anthropic `400: tool_choice.any può essere specificato solo durante la fornitura degli strumenti`. Risolto il problema con il ritorno a "tool.name" quando "tool.function.name" è assente. Aggiunti 8 test unitari di regressione. (PR n. 397)### Funzionalità

-**feat(api)**: percorsi endpoint personalizzati per nodi provider compatibili con OpenAI: configura `chatPath` e `modelsPath` per nodo (ad esempio `/v4/chat/completions`) nell'interfaccia utente di connessione del provider. Include una migrazione del DB (`003_provider_node_custom_paths.sql`) e la sanificazione del percorso URL (nessun attraversamento `..`, deve iniziare con `/`). (PR n. 400) -**feat(provider)**: Alibaba Cloud DashScope aggiunto come provider compatibile con OpenAI. Endpoint internazionale: `dashscope-intl.aliyuncs.com/compatibili-mode/v1`. 12 modelli: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Autenticazione: chiave API bearer.### 📋 Issues Closed

-**chiudi #323**: errore di connessione Cline `[oggetto Oggetto]` — risolto nella v2.3.7; ha richiesto all'utente di aggiornare dalla versione 2.2.9 -**chiudi #337**: monitoraggio del credito Kiro — implementato nella v2.5.5 (#381); indirizzato l'utente a Dashboard → Utilizzo -**triage #402**: ARM64 macOS DMG danneggiato: richiesta versione macOS, errore esatto e soluzione alternativa consigliata `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Correzione critica all'avvio: le installazioni npm globali v2.6.0 si sono arrestate in modo anomalo con un errore 500 a causa di un bug di hashing del nome modulo Turbopack/webpack nell'hook della strumentazione Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: forza che `better-sqlite3` sia sempre richiesto con il nome esatto del pacchetto nel bundle del server webpack. Next.js 16 ha compilato l'hook della strumentazione in un blocco separato ed ha emesso `require('better-sqlite3-<hash>')` — un nome di modulo con hash che non esiste in `node_modules` — anche se il pacchetto era elencato in `serverExternalPackages`. Aggiunta una funzione esplicita `externals` alla configurazione del webpack del server in modo che il bundler emetta sempre `require('better-sqlite3')`, risolvendo l'avvio `500 Internal Server Error` su installazioni globali pulite. (#394, PR #395)### 🔧 CI

-**ci**: aggiunto `workflow_dispatch` a `npm-publish.yml` con protezione della sincronizzazione della versione per i trigger manuali (#392). -**ci**: aggiunto `workflow_dispatch` a `docker-publish.yml`, aggiornate le azioni GitHub alle ultime versioni (#392).---

## [2.6.0] - 2026-03-15

> Sprint per la risoluzione dei problemi: 4 bug risolti, log UX migliorati, aggiunto il monitoraggio del credito Kiro.### 🐛 Bug Fixes

-**correzione(media)**: ComfyUI e SD WebUI non vengono più visualizzati nell'elenco dei provider della pagina multimediale quando non sono configurati: recupera `/api/providers` al montaggio e nasconde i provider locali senza connessioni (#390). -**correzione(auth)**: il round robin non riseleziona più gli account con velocità limitata immediatamente dopo il raffreddamento: `backoffLevel` è ora utilizzato come chiave di ordinamento primaria nella rotazione LRU (#340) -**risolto (oauth)**: Qoder (e altri provider che reindirizzano alla propria interfaccia utente) non lasciano più la modalità OAuth bloccata su "In attesa di autorizzazione" - transizioni automatiche del rilevatore popup chiuso alla modalità di immissione URL manuale (#344) -**fix(logs)**: la tabella dei log delle richieste è ora leggibile in modalità light: i badge di stato, i conteggi dei token e i tag combinati utilizzano classi di colore adattive `dark:` (#378)### Funzionalità

-**feat(kiro)**: monitoraggio del credito Kiro aggiunto al fetcher di utilizzo: query `getUserCredits` dall'endpoint AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)**: Allineati `test:plan3`, `test:fixes`, `test:security` per utilizzare lo stesso caricatore `tsx/esm` di `npm test` — elimina i falsi negativi della risoluzione del modulo nelle esecuzioni mirate (PR #386)---

## [2.5.9] - 2026-03-15

> Correzione del passthrough nativo del Codex + rafforzamento della convalida del corpo del percorso.### 🐛 Bug Fixes

-**fix(codex)**: preserva il passthrough dell'API Responses nativa per i client Codex: evita mutazioni di traduzione non necessarie (PR n. 387) -**fix(api)**: convalida i corpi delle richieste su prezzi/sincronizzazione e percorsi di routing delle attività: previene arresti anomali dovuti a input non validi (PR n. 388) -**fix(auth)**: i segreti JWT persistono dopo i riavvii tramite `src/lib/db/secrets.ts` — elimina gli errori 401 dopo il riavvio di pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Correzione della build: ripristino della connettività VPS interrotta dalla pubblicazione incompleta della v2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` utilizzava ancora il flag deprecato `--webpack` causando il fallimento silenzioso della build standalone di Next.js: pubblicazione npm completata senza `app/server.js`, interrompendo la distribuzione VPS---

## [2.5.7] - 2026-03-15

> Correzioni nella gestione degli errori del parco giochi multimediale.### 🐛 Bug Fixes

-**fix(media)**: trascrizione "API Key Required" falso positivo quando l'audio non contiene parlato (musica, silenzio) - ora mostra invece "Nessun parlato rilevato" -**fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` e `audioSpeech.ts` ora restituisce il JSON corretto (`{error:{message}}`), abilitando il corretto rilevamento degli errori di credenziale 401/403 in MediaPageClient -**fix(media)**: `parseApiError` ora gestisce il campo `err_msg` di Deepgram e rileva la `"chiave API"` nei messaggi di errore per una classificazione accurata degli errori delle credenziali---

## [2.5.6] - 2026-03-15

> Correzioni critiche di sicurezza/autenticazione: Antigravity OAuth interrotto + sessioni JWT perse dopo il riavvio.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth ora invia correttamente `client_secret` all'endpoint del token. Il fallback per "ANTIGRAVITY_OAUTH_CLIENT_SECRET" era una stringa vuota, il che è falso, quindi "client_secret" non è mai stato incluso nella richiesta, causando errori "client_secret mancante" per tutti gli utenti senza una variabile env personalizzata. Chiude #383. -**fix(auth) #385**: `JWT_SECRET` è ora persistente su SQLite (`namespace='secrets'`) alla prima generazione e ricaricato agli avvii successivi. In precedenza, veniva generato un nuovo segreto casuale a ogni avvio del processo, invalidando tutti i cookie/sessioni esistenti dopo ogni riavvio o aggiornamento. Interessa sia "JWT_SECRET" che "API_KEY_SECRET". Chiude #382.---

## [2.5.5] - 2026-03-15

> Correzione della rimozione dell'elenco dei modelli, rafforzamento della build autonoma di Electron e monitoraggio del credito Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` ora include gli alias del provider durante la creazione del filtro del provider attivo: i modelli per `claude` (alias `cc`) e `github` (alias `gh`) venivano sempre mostrati indipendentemente dal fatto che fosse configurata una connessione, perché le chiavi `PROVIDER_MODELS` sono alias ma le connessioni DB vengono archiviate sotto gli ID del provider. Risolto il problema espandendo ogni ID provider attivo per includere anche il relativo alias tramite "PROVIDER_ID_TO_ALIAS". Chiude #353. -**fix(electron) #379**: Il nuovo `scripts/prepare-electron-standalone.mjs` mette in scena un bundle dedicato `/.next/electron-standalone` prima del packaging di Electron. Interrompe con un errore chiaro se `node_modules` è un collegamento simbolico (il costruttore di elettroni fornirebbe una dipendenza di runtime sulla macchina di compilazione). Sanificazione del percorso multipiattaforma tramite `path.basename`. Di @kfiramar.### ✨ New Features

-**feat(kiro) #381**: monitoraggio del saldo del credito Kiro: l'endpoint di utilizzo ora restituisce i dati del credito per gli account Kiro chiamando `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (lo stesso endpoint Kiro IDE utilizzato internamente). Restituisce i crediti rimanenti, la franchigia totale, la data di rinnovo e il livello di abbonamento. Chiude #337.## [2.5.4] - 2026-03-15

> Correzione dell'avvio del logger, correzione della sicurezza del bootstrap dell'accesso e miglioramento dell'affidabilità dell'HMR dello sviluppatore. L'infrastruttura CI è stata rafforzata.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: ripristina il percorso del logger di trasporto pino — `formatters.level` combinato con `transport.targets` viene rifiutato da pino. Le configurazioni supportate dal trasporto ora eliminano il formattatore di livello tramite `getTransportCompatibleConfig()`. Corregge anche la mappatura del livello numerico in `/api/logs/console`: `30→info, 40→warn, 50→error` (era spostato di uno). -**fix(login) #375**: la pagina di accesso ora si avvia dall'endpoint pubblico `/api/settings/require-login` invece che da quello protetto `/api/settings`. Nelle configurazioni protette da password, la pagina di pre-autenticazione riceveva un 401 e tornava inutilmente alle impostazioni predefinite sicure. La route pubblica ora restituisce tutti i metadati di bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) con un fallback conservativo di 200 in caso di errore. -**fix(dev) #374**: aggiunti `localhost` e `127.0.0.1` a `allowedDevOrigins` in `next.config.mjs` — Il websocket HMR veniva bloccato quando si accedeva all'app tramite indirizzo di loopback, producendo ripetuti avvisi multiorigine.### 🔧 CI & Infrastructure

-**Correzione OOM ESLint**: `eslint.config.mjs` ora ignora `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` e `clipr/**` — ESLint si bloccava con un OOM heap JS durante la scansione di BLOB binari VS Code e blocchi compilati. -**Correzione test unitario**: rimosso `ALTER TABLE provider_connections ADD COLUMN "group"` obsoleto da 2 file di test: la colonna ora fa parte dello schema di base (aggiunto in #373), causando `SQLITE_ERROR: nome colonna duplicato` su ogni esecuzione del CI. -**Hook pre-commit**: aggiunto `npm run test:unit` a `.husky/pre-commit`: i test unitari ora bloccano i commit interrotti prima che raggiungano il CI.## [2.5.3] - 2026-03-14

> Correzioni di bug critici: migrazione dello schema DB, caricamento dell'ambiente di avvio, cancellazione dello stato degli errori del provider e correzione del tooltip i18n. Miglioramenti della qualità del codice su ogni PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: aggiunta la colonna `provider_connections.group` allo schema di base + migrazione del backfill per i database esistenti: la colonna veniva utilizzata in tutte le query ma mancava nella definizione dello schema -**correzione(i18n) #371**: sostituzione della chiave inesistente `t("deleteConnection")` con la chiave `provviders.delete` esistente — correzioni dell'errore di runtime `MISSING_MESSAGE: provider.deleteConnection` nella pagina dei dettagli del provider -**fix(auth) #372**: Cancella i metadati di errore obsoleti (`errorCode`, `lastErrorType`, `lastErrorSource`) dagli account del fornitore dopo un ripristino autentico: in precedenza, gli account recuperati continuavano a apparire come non riusciti -**correzione (avvio) #369**: Unifica il caricamento di env su `npm run start`, `run-standalone.mjs` ed Electron per rispettare la priorità di `DATA_DIR/.env → ~/.omniroute/.env → ./.env`: impedisce la generazione di un nuovo `STORAGE_ENCRYPTION_KEY` su un database crittografato esistente### 🔧 Code Quality

- Modelli documentati di `result.success` e `response?.ok` in "auth.ts" (entrambi intenzionali, ora spiegati)
- Normalizzato `overridePath?.trim()` in `electron/main.js` per corrispondere a `bootstrap-env.mjs`
- Aggiunto il commento sull'ordine di unione `preferredEnv` all'avvio di Electron

> Politica di quota dell'account Codex con rotazione automatica, attivazione/disattivazione rapida del livello, modello gpt-5.4 e correzione dell'etichetta di analisi.### ✨ New Features (PRs #366, #367, #368)

-**Politica sulle quote del Codex (PR n. 366)**: la finestra delle quote settimanali/di 5 ore per account viene attivata/disattivata nella dashboard del fornitore. Gli account vengono automaticamente saltati quando le finestre abilitate raggiungono la soglia del 90% e riammessi dopo "resetAt". Include "quotaCache.ts" con getter di stato senza effetti collaterali. -**Attivazione/disattivazione livello rapido Codex (PR n. 367)**: Dashboard → Impostazioni → Livello di servizio Codex. L'attivazione/disattivazione predefinita inserisce `service_tier: "flex"` solo per le richieste Codex, riducendo i costi di circa l'80%. Stack completo: scheda UI + endpoint API + esecutore + traduttore + ripristino all'avvio. -**Modello gpt-5.4 (PR #368)**: aggiunge `cx/gpt-5.4` e `codex/gpt-5.4` al registro del modello Codex. Test di regressione incluso.### 🐛 Bug Fixes

-**correzione n. 356**: i grafici di analisi (fornitore principale, per account, suddivisione dei fornitori) ora mostrano nomi/etichette dei fornitori leggibili dall'uomo anziché ID interni non elaborati per i fornitori compatibili con OpenAI.

> Versione principale: strategia di routing rigorosamente casuale, controlli di accesso tramite chiave API, gruppi di connessione, sincronizzazione dei prezzi esterni e correzioni di bug critici per modelli di pensiero, test combinati e convalida dei nomi degli strumenti.### ✨ New Features (PRs #363 & #365)

-**Strategia di routing rigorosamente casuale**: mazzo shuffle Fisher-Yates con garanzia anti-ripetizione e serializzazione mutex per richieste simultanee. Mazzi indipendenti per combo e per provider. -**Controlli di accesso chiave API**: `allowedConnections` (limita le connessioni che una chiave può utilizzare), `is_active` (abilita/disabilita la chiave con 403), `accessSchedule` (controllo degli accessi basato sul tempo), attiva/disattiva `autoResolve`, rinomina le chiavi tramite PATCH. -**Gruppi di connessione**: connessioni del provider di gruppo per ambiente. Visualizzazione a fisarmonica nella pagina Limiti con persistenza localStorage e commutazione automatica intelligente. -**Sincronizzazione prezzi esterna (LiteLLM)**: risoluzione dei prezzi a 3 livelli (sostituzioni utente → sincronizzato → valori predefiniti). Attivazione tramite `PRICING_SYNC_ENABLED=true`. Strumento MCP `omniroute_sync_pricing`. 23 nuovi test. -**i18n**: 30 lingue aggiornate con strategia strict-random, stringhe di gestione delle chiavi API. pt-BR completamente tradotto.### 🐛 Bug Fixes

-**correzione #355**: timeout di inattività del flusso aumentato da 60 a 300 secondi: impedisce l'interruzione dei modelli di pensiero esteso (claude-opus-4-6, o3, ecc.) durante le lunghe fasi di ragionamento. Configurabile tramite `STREAM_IDLE_TIMEOUT_MS`. -**correzione n. 350**: il test combinato ora ignora `REQUIRE_API_KEY=true` utilizzando l'intestazione interna e utilizza il formato compatibile con OpenAI universalmente. Timeout esteso da 15 a 20 secondi. -**correzione #346**: gli strumenti con `function.name` vuoto (inoltrato da Claude Code) vengono ora filtrati prima che i provider upstream li ricevano, prevenendo errori "Input[N].name non valido: stringa vuota".### 🗑️ Closed Issues

-**#341**: sezione Debug rimossa: la sostituzione è `/dashboard/logs` e `/dashboard/health`.

> Supporto API Key Round-Robin per configurazioni di provider multi-chiave e conferma del routing con caratteri jolly e della finestra di quota già in atto.### ✨ New Features

-**Chiave API Round-Robin (T07)**: le connessioni del provider ora possono contenere più chiavi API (Modifica connessione → Chiavi API aggiuntive). Le richieste ruotano in round robin tra chiavi primarie + extra tramite `providerSpecificData.extraApiKeys[]`. Le chiavi vengono mantenute in memoria indicizzate per connessione: non sono necessarie modifiche allo schema del database.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` con corrispondenza con caratteri jolly in stile glob (`gpt*`, `claude-?-sonnet`, ecc.) è già integrato in `model.ts` con classificazione di specificità. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` fa già avanzare automaticamente la finestra — se `Date.now() > entry.until`, il blocco viene eliminato immediatamente (nessun blocco obsoleto).

> Miglioramento dell'interfaccia utente, aggiunte alla strategia di routing e gestione corretta degli errori per i limiti di utilizzo.### ✨ New Features

-**Strategie di routing Fill-First e P2C**: aggiunti `fill-first` (drenare la quota prima di proseguire) e `p2c` (selezione a bassa latenza Power-of-Two-Choices) al selettore di strategie combinate, con pannelli di guida completi e badge codificati a colori. -**Modelli preimpostati con stack gratuito**: la creazione di una combinazione con il modello Stack gratuito ora riempie automaticamente 7 modelli di provider gratuiti migliori della categoria (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Gli utenti devono semplicemente attivare i fornitori e ottenere una combinazione di $ 0 al mese pronta all'uso. -**Modale combo più ampia**: la modalità Crea/Modifica combo ora utilizza `max-w-4xl` per modificare comodamente combo di grandi dimensioni.### 🐛 Bug Fixes

-**Pagina Limiti HTTP 500 per Codex e GitHub**: `getCodexUsage()` e `getGitHubUsage()` ora restituiscono un messaggio intuitivo quando il provider restituisce 401/403 (token scaduto), invece di generare e causare un errore 500 nella pagina Limiti. -**Falsi positivi del banner di manutenzione**: il banner non mostra più "Il server non è raggiungibile" in modo spurio al caricamento della pagina. Risolto il problema chiamando `checkHealth()` immediatamente al montaggio e rimuovendo la chiusura obsoleta di `show`-state. -**Descrizioni comando icona provider**: i pulsanti delle icone Modifica (matita) ed Elimina nella riga di connessione del provider ora dispongono di descrizioni comandi HTML native: tutte e 6 le icone di azione sono ora auto-documentate.

> Numerosi miglioramenti derivanti dall'analisi dei problemi della community, supporto di nuovi provider, correzioni di bug per il tracciamento dei token, routing dei modelli e affidabilità dello streaming.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: selezione automatica del modello in base al tipo di contenuto della richiesta: codifica → deepseek-chat, analisi → gemini-2.5-pro, visione → gpt-4o, riepilogo → gemini-2.5-flash. Configurabile tramite Impostazioni. Nuova API "GET/PUT/POST /api/settings/task-routing". -**HuggingFace Provider**: aggiunto HuggingFace Router come provider compatibile con OpenAI con Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider**: aggiunto il provider Vertex AI (Google Cloud) con Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude tramite Vertex. -**Caricamenti di file Playground**: caricamento di audio per la trascrizione, caricamento di immagini per modelli di visione (rilevamento automatico in base al nome del modello), rendering di immagini in linea per risultati di generazione di immagini. -**Feedback visivo sulla selezione del modello**: i modelli già aggiunti nel selettore combinato ora mostrano ✓ badge verde: impedisce la confusione duplicata. -**Compatibilità Qwen (PR n. 352)**: impostazioni aggiornate dell'agente utente e dell'impronta digitale CLI per la compatibilità del provider Qwen. -**Gestione dello stato Round-Robin (PR n. 349)**: logica round-robin migliorata per gestire gli account esclusi e mantenere correttamente lo stato di rotazione. -**Clipboard UX (PR #360)**: operazioni degli appunti rafforzate con fallback per contesti non sicuri; Miglioramenti alla normalizzazione dello strumento Claude.### 🐛 Bug Fixes

-**Correzione n. 302 — OpenAI SDK stream=False elimina tool_calls**: T01 Accetta la negoziazione dell'intestazione non forza più lo streaming quando `body.stream` è esplicitamente "false". Causava l'eliminazione silenziosa delle tool_calls durante l'utilizzo di OpenAI Python SDK in modalità non streaming. -**Correzione n.73 — Claude Haiku instradato a OpenAI senza prefisso del provider**: i modelli `claude-*` inviati senza prefisso del provider ora vengono instradati correttamente al provider `antigravity` (antropico). Aggiunta anche l'euristica `gemini-*`/`gemma-*` → `gemini`. -**Correzione #74 — I token contano sempre 0 per lo streaming Antigravity/Claude**: l'evento SSE `message_start` che trasporta `input_tokens` non veniva analizzato da `extractUsage()`, causando la caduta di tutti i conteggi dei token di input. Il monitoraggio dei token di input/output ora funziona correttamente per le risposte in streaming. -**Correzione #180 — Duplicati di importazione di modelli senza feedback**: `ModelSelectModal` ora mostra ✓ un'evidenziazione verde per i modelli già nella combo, rendendo evidente che sono già aggiunti. -**Errori nella generazione di pagine multimediali**: i risultati delle immagini ora vengono visualizzati come tag "<img>" invece che come JSON non elaborato. Risultati della trascrizione mostrati come testo leggibile. Gli errori di credenziale mostrano un banner color ambra invece di un errore silenzioso. -**Pulsante di aggiornamento del token sulla pagina del provider**: interfaccia utente di aggiornamento manuale del token aggiunta per i provider OAuth.### 🔧 Improvements

-**Registro del provider**: HuggingFace e Vertex AI aggiunti a `providerRegistry.ts` e `provviders.ts` (frontend). -**Read Cache**: nuovo `src/lib/db/readCache.ts` per un efficiente caching di lettura DB. -**Quota Cache**: cache delle quote migliorata con eliminazione basata su TTL.### 📦 Dependencies

- `dompurificare` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| File                                          | Scopo                                                          |
| --------------------------------------------- | -------------------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logica di routing sensibile alle attività (7 tipi di attività) |
| `src/app/api/settings/task-routing/route.ts`  | API di configurazione dell'instradamento delle attività        |
| `src/app/api/providers/[id]/refresh/route.ts` | Aggiornamento manuale del token OAuth                          |
| `src/lib/db/readCache.ts`                     | Cache di lettura DB efficiente                                 |
| `src/shared/utils/clipboard.ts`               | Appunti rinforzati con fallback                                | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modale combo: Stack gratuito visibile e prominente**: il modello Stack gratuito era nascosto (4° nella griglia a 3 colonne). Risolto: spostato nella posizione 1, passato alla griglia 2x2 in modo che tutti e 4 i modelli siano visibili, bordo verde + evidenziazione badge GRATUITO.## [2.4.0] - 2026-03-13

> **Versione principale**: ecosistema Free Stack, revisione del parco giochi di trascrizione, oltre 44 provider, documentazione completa del livello gratuito e miglioramenti dell'interfaccia utente su tutta la linea.### Funzionalità

-**Combo: modello Stack gratuito**— Nuovo quarto modello "Stack gratuito ($0)" che utilizza il round robin su Kiro + Qoder + Qwen + Gemini CLI. Suggerisce la combo precostruita a costo zero al primo utilizzo.
-**Media/Trascrizione: Deepgram come predefinito**— Deepgram (Nova 3, $ 200 gratis) è ora il fornitore di trascrizione predefinito. AssemblyAI ($ 50 gratis) e Groq Whisper (gratuito per sempre) mostrati con badge di credito gratuiti. -**README: sezione "Inizia gratuitamente"**: nuova tabella in 5 passaggi README iniziale che mostra come configurare l'IA a costo zero in pochi minuti. -**README: combinazione di trascrizione gratuita**: nuova sezione con suggerimenti per la combinazione Deepgram/AssemblyAI/Groq e dettagli sul credito gratuito per fornitore. -**provviders.ts: flag hasFree**: NVIDIA NIM, Cerebras e Groq contrassegnati con il badge hasFree e freeNote per l'interfaccia utente dei provider. -**i18n: chiavi templateFreeStack**: modello combinato Stack gratuito tradotto e sincronizzato in tutte le 30 lingue.## [2.3.16] - 2026-03-13

### Documentazione

-**README: 44+ Provider**— Aggiornate tutte e 3 le occorrenze di "36+ provider" a "44+" riflettendo il conteggio effettivo della base di codice (44 provider in provider.ts) -**LEGGIMI: Nuova sezione "🆓 Modelli gratuiti: cosa ottieni effettivamente"**- Aggiunta tabella di 7 fornitori con limiti di velocità per modello per: Kiro (Claude illimitato tramite AWS Builder ID), Qoder (5 modelli illimitati), Qwen (4 modelli illimitati), Gemini CLI (180.000/mese), NVIDIA NIM (~40 RPM dev-per sempre), Cerebras (1 milione di tok/giorno / 60.000 TPM), Groq (30 giri/min/14,4K giri/min). Include la raccomandazione combinata \/usr/bin/bash Ultimate Free Stack. -**README: tabella dei prezzi aggiornata**— Aggiunto Cerebras al livello API KEY, corretto NVIDIA da "1000 crediti" a "dev-forever free", conteggi e nomi dei modelli Qoder/Qwen aggiornati -**README: modelli Qoder 8→5**(denominati: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**LEGGIMI: modelli Qwen 3→4**(denominati: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funzionalità

-**Dashboard Auto-Combo (priorità livello)**: aggiunto "🏷️ Livello" come settima etichetta del fattore di punteggio nella visualizzazione della suddivisione dei fattori "/dashboard/auto-combo": tutti e 7 i fattori di punteggio dell'Auto-Combo sono ora visibili. -**i18n — sezione autoCombo**: aggiunte 20 nuove chiavi di traduzione per la dashboard Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, ecc.) a tutti i 30 file di lingua.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: ripristinato il valore predefinito valido `clientSecret`: in precedenza era una stringa vuota, che causava "Credenziali client errate" a ogni tentativo di connessione. La credenziale pubblica è ora il fallback predefinito (sostituibile tramite `QODER_OAUTH_CLIENT_SECRET` env var). -**Server MITM non trovato (#335)**: `prepublish.mjs` ora compila `src/mitm/*.ts` in JavaScript utilizzando `tsc` prima di copiarlo nel bundle npm. In precedenza venivano copiati solo i file `.ts` grezzi, il che significa che `server.js` non esisteva mai nelle installazioni globali npm/Volta. -**GeminiCLI mancante projectId (#338)**: invece di generare un errore grave 500 quando `projectId` manca dalle credenziali archiviate (ad esempio dopo il riavvio di Docker), OmniRoute ora registra un avviso e tenta la richiesta, restituendo un errore significativo lato provider invece di un arresto anomalo di OmniRoute. -**Mancata corrispondenza della versione di Electron (#323)**: versione `electron/package.json` sincronizzata con `2.3.13` (era `2.0.13`) in modo che la versione binaria del desktop corrisponda al pacchetto npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codice**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + validazione)**: aggiunto `tierPriority` (peso `0.05`) allo schema Zod `ScoringWeights` e al percorso API `combos/auto`: il settimo fattore di punteggio è ora completamente accettato dall'API REST e convalidato in input. Il peso della "stabilità" è stato modificato da "0,10" a "0,05" per mantenere la somma totale = "1,0".### ✨ New Features

-**Punteggio quota a livelli (combo automatico)**: aggiunto "tierPriority" come settimo fattore di punteggio: gli account con livelli Ultra/Pro sono ora preferiti rispetto ai livelli gratuiti quando altri fattori sono uguali. Nuovi campi opzionali "accountTier" e "quotaResetIntervalSecs" su "ProviderCandidate". Aggiornati tutti e 4 i pacchetti modalità ("spedisci velocemente", "risparmia costi", "prima la qualità", "offline-friendly"). -**Fallback modello intrafamiliare (T5)**: quando un modello non è disponibile (404/400/403), OmniRoute ora ricorre automaticamente ai modelli fratelli della stessa famiglia prima di restituire un errore (`modelFamilyFallback.ts`). -**Timeout bridge API configurabile**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var consente agli operatori di ottimizzare il timeout del proxy (predefinito 30 secondi). Risolve gli errori 504 sulle risposte upstream lente. (#332) -**Star History**: sostituito il widget star-history.com con starchart.cc (`?variant=adaptive`) in tutti i 30 README: si adatta al tema chiaro/scuro, aggiornamenti in tempo reale.### 🐛 Bug Fixes

-**Auth: prima password**: `INITIAL_PASSWORD` env var viene ora accettato quando si imposta la prima password del dashboard. Utilizza "timingSafeEqual" per il confronto in tempo costante, prevenendo attacchi temporali. (#333) -**Troncamento README**: corretto un tag di chiusura `</details>` mancante nella sezione Risoluzione dei problemi che causava a GitHub l'interruzione del rendering di tutto ciò che si trovava sotto (stack tecnico, documenti, roadmap, contributori). -**Installazione pnpm**: rimosso l'override ridondante di `@swc/helpers` da `package.json` che era in conflitto con la dipendenza diretta, causando errori `EOVERRIDE` su pnpm. Aggiunta la configurazione `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: aggiunto il validatore `isSafePath()` in `cliRuntime.ts` per bloccare l'attraversamento del percorso e i metacaratteri della shell in `CLI_*_BIN` env vars. -**CI**: rigenerato `package-lock.json` dopo la rimozione dell'override per correggere gli errori `npm ci` sulle azioni GitHub.### 🔧 Improvements

-**Formato di risposta (T1)**: `response_format` (json_schema/json_object) ora inserito come prompt di sistema per Claude, consentendo la compatibilità dell'output strutturato. -**429 tentativi (T2)**: tentativi intra-URL per 429 risposte (2× tentativi con ritardo di 2 secondi) prima di tornare all'URL successivo. -**Intestazioni CLI Gemini (T3)**: aggiunte le intestazioni delle impronte digitali `User-Agent` e `X-Goog-Api-Client` per la compatibilità della CLI Gemini. -**Catalogo prezzi (T9)**: aggiunte le voci di prezzo `deepseek-3.1`, `deepseek-3.2` e `qwen3-coder-next`.### 📁 New Files

| File                                       | Scopo                                                               |
| ------------------------------------------ | ------------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definizioni di famiglia modello e logica di fallback intrafamiliare | ### Fixed |

-**KiloCode**: timeout del controllo dello stato del kilocode già corretto nella v2.3.11 -**OpenCode**: aggiungi opencode al registro cliRuntime con timeout del controllo dello stato di 15 secondi -**OpenClaw / Cursore**: aumenta il timeout del controllo sanitario a 15 secondi per le varianti ad avvio lento -**VPS**: installa i pacchetti npm droid e openclaw; attiva CLI_EXTRA_PATHS per kiro-cli -**cliRuntime**: aggiunta la registrazione dello strumento opencode e aumento del timeout per continuare## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode Healthcheck**: Aumenta `healthcheckTimeoutMs` da 4000ms a 15000ms — kilocode esegue il rendering di un banner con logo ASCII all'avvio causando un falso `healthcheck_failed` in ambienti lenti/con avvio a freddo## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: risolto l'errore `check:any-budget:t11`: sostituire `as any` con `as Record<string, Unknown>` in OAuthModal.tsx (3 occorrenze)### Docs

-**CLI-TOOLS.md**: guida completa per tutti gli 11 strumenti CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md sincronizzato in 30 lingue con titolo tradotto + introduzione## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: nuovo endpoint legacy di completamenti OpenAI: accetta sia la stringa `prompt` che l'array `messages`, si normalizza automaticamente nel formato chat -**EndpointPage**: ora mostra tutti e 3 i tipi di endpoint compatibili con OpenAI: Completamenti chat, API di risposta e Completamenti legacy -**i18n**: aggiunto `completionsLegacy/completionsLegacyDesc` a 30 file di lingua### Fixed

-**OAuthModal**: corretto `[object Object]` visualizzato su tutti gli errori di connessione OAuth: estrai correttamente `.message` dagli oggetti di risposta all'errore in tutte e 3 le chiamate `throw new Error(data.error)` (scambio, codice dispositivo, autorizzazione)

- Interessa Cline, Codex, GitHub, Qwen, Kiro e tutti gli altri provider OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: aggiungi `decodeURIComponent` prima della decodifica base64 in modo che i codici di autenticazione codificati URL dall'URL di callback vengano analizzati correttamente, correggendo gli errori "codice di autorizzazione non valido o scaduto" sulle configurazioni remote (IP LAN) -**Cline OAuth**: `mapTokens` ora popola `name = firstName + lastName || email` in modo che gli account Cline mostrino nomi utente reali anziché "ID account" -**Nomi di account OAuth**: tutti i flussi di scambio OAuth (scambio, poll, poll-callback) ora normalizzano `name = email` quando manca il nome, quindi ogni account OAuth mostra la propria email come etichetta visualizzata nel dashboard dei provider -**Nomi account OAuth**: rimosso il fallback sequenziale "Account N" in `db/providers.ts`: gli account senza email/nome ora utilizzano un'etichetta stabile basata su ID tramite `getAccountDisplayName()` invece di un numero sequenziale che cambia quando gli account vengono eliminati## [2.3.6] - 2026-03-12

### Fixed

-**Batch di test del provider**: corretto lo schema Zod per accettare `providerId: null` (il frontend invia null per le modalità non provider); restituiva erroneamente "Richiesta non valida" per tutti i test batch -**Modale test del provider**: corretta la visualizzazione di "[object Object]" normalizzando gli oggetti di errore API in stringhe prima del rendering in "setTestResults" e "ProviderTestResultsView" -**i18n**: Aggiunte le chiavi mancanti `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` a `en.json` -**i18n**: sincronizzate 1111 chiavi mancanti in tutti i 29 file di lingua non inglese utilizzando valori inglesi come fallback## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: aggiunta la correzione permanente di `postinstall` per copiare `@swc/helpers` nei `node_modules` dell'app standalone: ​​impedisce l'arresto anomalo di MODULE_NOT_FOUND sulle installazioni npm globali## [2.3.4] - 2026-03-10

### Added

- Integrazioni multiple di fornitori e miglioramenti del dashboard
