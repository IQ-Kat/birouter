# OmniRoute — Dashboard Features Gallery (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Guida visiva a ogni sezione del dashboard OmniRoute.---

## 🔌 Providers

Gestisci le connessioni dei provider AI: provider OAuth (Claude Code, Codex, Gemini CLI), provider di chiavi API (Groq, DeepSeek, OpenRouter) e provider gratuiti (Qoder, Qwen, Kiro). Gli account Kiro includono il monitoraggio del saldo del credito: crediti rimanenti, indennità totale e data di rinnovo visibili in Dashboard → Utilizzo.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Crea combinazioni di modelli di routing con 6 strategie: priorità, ponderata, round robin, casuale, meno utilizzata e ottimizzata in termini di costi. Ciascuna combinazione concatena più modelli con fallback automatico e include modelli rapidi e controlli di disponibilità.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Analisi completa dell'utilizzo con consumo di token, stime dei costi, mappe di calore delle attività, grafici di distribuzione settimanale e suddivisioni per fornitore.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitoraggio in tempo reale: tempo di attività, memoria, versione, percentili di latenza (p50/p95/p99), statistiche della cache e stati degli interruttori automatici del provider.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Quattro modalità per il debug delle traduzioni API:**Playground**(convertitore di formato),**Chat Tester**(richieste live),**Test Bench**(test batch) e**Live Monitor**(streaming in tempo reale).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Prova qualsiasi modello direttamente dalla dashboard. Seleziona provider, modello ed endpoint, scrivi richieste con Monaco Editor, trasmetti le risposte in tempo reale, interrompi a metà flusso e visualizza le metriche temporali.---

## 🎨 Themes _(v2.0.5+)_

Temi di colore personalizzabili per l'intera dashboard. Scegli tra 7 colori preimpostati (corallo, blu, rosso, verde, viola, arancione, ciano) o crea un tema personalizzato scegliendo qualsiasi colore esadecimale. Supporta la modalità chiaro, scuro e di sistema.---

## ⚙️ Settings

Pannello delle impostazioni completo con schede:

-**Generale**: archiviazione di sistema, gestione del backup (database di esportazione/importazione) -**Aspetto**: selettore tema (scuro/chiaro/sistema), temi colore predefiniti e colori personalizzati, visibilità del registro di integrità, controlli di visibilità degli elementi della barra laterale -**Sicurezza**: protezione endpoint API, blocco provider personalizzato, filtraggio IP, informazioni sulla sessione -**Routing**: alias del modello, degrado delle attività in background -**Resilienza**: persistenza del limite di velocità, ottimizzazione degli interruttori automatici, disattivazione automatica degli account esclusi, monitoraggio della scadenza del provider -**Avanzate**: sostituzione della configurazione, audit trail della configurazione, modalità di degradazione del fallback![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configurazione con un clic per gli strumenti di codifica AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor e Factory Droid. Dispone di applicazione/ripristino automatico della configurazione, profili di connessione e mappatura del modello.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard per il rilevamento e la gestione degli agenti CLI. Mostra una griglia di 14 agenti integrati (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) con:

-**Stato installazione**: installato/non trovato con rilevamento della versione -**Badge di protocollo**: stdio, HTTP, ecc. -**Agenti personalizzati**: registra qualsiasi strumento CLI tramite modulo (nome, binario, comando di versione, argomenti di spawn) -**Corrispondenza dell'impronta digitale della CLI**: attiva/disattiva per provider per abbinare le firme delle richieste CLI native, riducendo il rischio di ban e preservando l'IP proxy---

## 🖼️ Media _(v2.0.3+)_

Genera immagini, video e musica dalla dashboard. Supporta OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open e MusicGen.---

## 📝 Request Logs

Registrazione delle richieste in tempo reale con filtraggio per provider, modello, account e chiave API. Mostra i codici di stato, l'utilizzo del token, la latenza e i dettagli della risposta.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Il tuo endpoint API unificato con suddivisione delle funzionalità: completamenti chat, API di risposta, incorporamenti, generazione di immagini, riclassificazione, trascrizione audio, sintesi vocale, moderazioni e chiavi API registrate. Integrazione Cloudflare Quick Tunnel e supporto proxy cloud per l'accesso remoto.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Creare, definire l'ambito e revocare le chiavi API. Ciascuna chiave può essere limitata a modelli/provider specifici con accesso completo o autorizzazioni di sola lettura. Gestione visiva delle chiavi con monitoraggio dell'utilizzo.---

## 📋 Audit Log

Tracciamento delle azioni amministrative con filtraggio per tipo di azione, attore, destinazione, indirizzo IP e timestamp. Cronologia completa degli eventi di sicurezza.---

## 🖥️ Desktop Application

App desktop nativa Electron per Windows, macOS e Linux. Esegui OmniRoute come applicazione autonoma con integrazione nella barra delle applicazioni, supporto offline, aggiornamento automatico e installazione con un clic.

Caratteristiche principali:

- Polling sulla disponibilità del server (nessuna schermata vuota all'avvio a freddo)
- Vassoio di sistema con gestione delle porte
- Politica sulla sicurezza dei contenuti
- Blocco a istanza singola
- Aggiornamento automatico al riavvio
- Interfaccia utente condizionata alla piattaforma (semaforo macOS, barra del titolo predefinita Windows/Linux)
- Packaging di build Electron rafforzato: i `node_modules` con collegamento simbolico nel bundle autonomo vengono rilevati e rifiutati prima del packaging, impedendo la dipendenza del runtime dalla macchina di build (v2.5.5+)

📖 Vedi [`electron/README.md`](../electron/README.md) per la documentazione completa.
