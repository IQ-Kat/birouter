# Troubleshooting (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Problemi comuni e soluzioni per OmniRoute.---

## Quick Fixes

| Problema                                   | Soluzione                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- | --- |
| Primo accesso non funzionante              | Imposta `INITIAL_PASSWORD` in `.env` (nessun valore predefinito hardcoded)                      |
| Il dashboard si apre sulla porta sbagliata | Imposta `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                            |
| Nessun registro delle richieste in `logs/` | Imposta `ENABLE_REQUEST_LOGS=true`                                                              |
| EACCES: permesso negato                    | Imposta `DATA_DIR=/path/to/writable/dir` per sovrascrivere `~/.omniroute`                       |
| La strategia di routing non viene salvata  | Aggiornamento alla v1.4.11+ (correzione dello schema Zod per la persistenza delle impostazioni) | --- |

## Provider Issues

### "Language model did not provide messages"

**Causa:**Quota del fornitore esaurita.

**Correzione:**

1. Controlla il monitoraggio delle quote del dashboard
2. Utilizza una combinazione con livelli di fallback
3. Passa al livello più economico/gratuito### Rate Limiting

**Causa:**Quota di abbonamento esaurita.

**Correzione:**

- Aggiunto fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilizza GLM/MiniMax come backup economico### OAuth Token Expired

OmniRoute aggiorna automaticamente i token. Se i problemi persistono:

1. Dashboard → Fornitore → Riconnetti
2. Elimina e aggiungi nuovamente la connessione del provider---

## Cloud Issues

### Cloud Sync Errors

1. Verifica che `BASE_URL` punti alla tua istanza in esecuzione (ad esempio, `http://localhost:20128`)
2. Verifica che `CLOUD_URL` punti al tuo endpoint cloud (ad esempio, `https://omniroute.dev`)
3. Mantieni i valori `NEXT_PUBLIC_*` allineati con i valori lato server### Cloud `stream=false` Returns 500

**Sintomo:**"Token imprevisto 'd'..." sull'endpoint cloud per chiamate non in streaming.

**Causa:**l'upstream restituisce il payload SSE mentre il client si aspetta JSON.

**Soluzione alternativa:**utilizzare "stream=true" per le chiamate dirette sul cloud. Il runtime locale include il fallback SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Crea una nuova chiave dalla dashboard locale (`/api/keys`)
2. Eseguire la sincronizzazione cloud: Abilita Cloud → Sincronizza ora
3. Le chiavi vecchie/non sincronizzate possono ancora restituire "401" sul cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Controllare i campi di runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Per la modalità portatile: utilizza la destinazione dell'immagine `runner-cli` (CLI in bundle)
3. Per la modalità di montaggio host: impostare `CLI_EXTRA_PATHS` e montare la directory bin dell'host come di sola lettura
4. Se `installed=true` e `runnable=false`: il binario è stato trovato ma il controllo dello stato non è riuscito### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Controlla le statistiche di utilizzo in Dashboard → Utilizzo
2. Passare dal modello principale a GLM/MiniMax
3. Utilizza il livello gratuito (Gemini CLI, Qoder) per attività non critiche
4. Imposta i budget dei costi per chiave API: Dashboard → Chiavi API → Budget---

## Debugging

### Enable Request Logs

Imposta "ENABLE_REQUEST_LOGS=true" nel tuo file ".env". I log vengono visualizzati nella directory "logs/".### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Stato principale: `${DATA_DIR}/storage.sqlite` (provider, combo, alias, chiavi, impostazioni)
- Utilizzo: tabelle SQLite in `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + facoltativo `${DATA_DIR}/log.txt` e `${DATA_DIR}/call_logs/`
- Richiedi log: `<repo>/logs/...` (quando `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Quando l'interruttore di un provider è APERTO, le richieste vengono bloccate fino alla scadenza del tempo di recupero.

**Correzione:**

1. Vai su**Dashboard → Impostazioni → Resilienza**
2. Controllare la scheda dell'interruttore del provider interessato
3. Fare clic su**Reimposta tutto**per cancellare tutti gli interruttori o attendere la scadenza del tempo di recupero
4. Verificare che il provider sia effettivamente disponibile prima di reimpostare### Provider keeps tripping the circuit breaker

Se un provider entra ripetutamente nello stato OPEN:

1. Selezionare**Dashboard → Salute → Salute del provider**per il modello di errore
2. Vai su**Impostazioni → Resilienza → Profili fornitore**e aumenta la soglia di errore
3. Controlla se il provider ha modificato i limiti API o richiede la riautenticazione
4. Esaminare la telemetria della latenza: un'elevata latenza può causare errori basati sul timeout---

## Audio Transcription Issues

### "Unsupported model" error

- Assicurati di utilizzare il prefisso corretto: `deepgram/nova-3` o `assemblyai/best`
- Verificare che il provider sia connesso in**Dashboard → Provider**### Transcription returns empty or fails

- Controlla i formati audio supportati: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verificare che la dimensione del file rientri nei limiti del provider (in genere < 25 MB)
- Controlla la validità della chiave API del fornitore nella scheda del fornitore---

## Translator Debugging

Utilizza**Dashboard → Traduttore**per eseguire il debug dei problemi di traduzione del formato:

| Modalità                  | Quando usarlo                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Parco giochi**          | Confronta i formati di input/output fianco a fianco: incolla una richiesta non riuscita per vedere come viene tradotta |
| **Tester della chat**     | Invia messaggi in tempo reale e controlla l'intero payload di richiesta/risposta, comprese le intestazioni             |
| **Banco di prova**        | Esegui test batch su combinazioni di formati per scoprire quali traduzioni sono interrotte                             |
| **Monitoraggio dal vivo** | Guarda il flusso di richieste in tempo reale per individuare problemi di traduzione intermittenti                      | ### Common format issues |

-**I tag Thinking non vengono visualizzati**: controlla se il fornitore di destinazione supporta il pensiero e l'impostazione del budget per il pensiero -**Chiamate dello strumento eliminate**: alcune traduzioni di formato potrebbero eliminare i campi non supportati; verificare in modalità Parco giochi -**Prompt di sistema mancante**— Claude e Gemini gestiscono i prompt di sistema in modo diverso; controllare l'output della traduzione -**L'SDK restituisce una stringa non elaborata anziché un oggetto**— Risolto nella versione 1.1.0: il sanitizer della risposta ora rimuove i campi non standard (`x_groq`, `usage_breakdown` e così via) che causano errori di convalida di OpenAI SDK Pydantic -**GLM/ERNIE rifiuta il ruolo `system`**— Risolto nella versione 1.1.0: il normalizzatore dei ruoli unisce automaticamente i messaggi di sistema nei messaggi utente per modelli incompatibili -**Ruolo "sviluppatore" non riconosciuto**— Risolto il problema nella versione 1.1.0: convertito automaticamente in "sistema" per fornitori non OpenAI -**`json_schema` non funziona con Gemini**— Risolto nella versione 1.1.0: `response_format` è ora convertito in `responseMimeType` + `responseSchema` di Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Il limite di velocità automatico si applica solo ai fornitori di chiavi API (non OAuth/abbonamento)
- Verificare che**Impostazioni → Resilienza → Profili fornitore**abbia il limite di velocità automatico abilitato
- Controlla se il provider restituisce i codici di stato "429" o le intestazioni "Retry-After".### Tuning exponential backoff

I profili dei fornitori supportano queste impostazioni:

-**Ritardo base**: tempo di attesa iniziale dopo il primo errore (impostazione predefinita: 1 s) -**Ritardo massimo**: limite massimo del tempo di attesa (impostazione predefinita: 30 secondi) -**Moltiplicatore**: quanto aumentare il ritardo per guasto consecutivo (impostazione predefinita: 2x)### Anti-thundering herd

Quando molte richieste simultanee raggiungono un provider con velocità limitata, OmniRoute utilizza mutex + limitazione automatica della velocità per serializzare le richieste e prevenire errori a catena. Questo è automatico per i fornitori di chiavi API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Alcuni utenti OmniRoute posizionano il gateway davanti a RAG o stack di agenti. In queste configurazioni è comune vedere uno schema strano: OmniRoute sembra integro (provider attivi, profili di instradamento ok, nessun avviso di limite di velocità) ma la risposta finale è ancora sbagliata.

In pratica questi incidenti solitamente provengono dalla pipeline RAG a valle, non dal gateway stesso.

Se desideri un vocabolario condiviso per descrivere questi guasti, puoi utilizzare WFGY ProblemMap, una risorsa di testo con licenza MIT esterna che definisce sedici modelli di fallimento RAG/LLM ricorrenti. Ad alto livello copre:

- deriva del recupero e confini del contesto infranti
- Indici e archivi vettoriali vuoti o obsoleti
- incorporamento e disadattamento semantico
- Problemi relativi all'assemblaggio rapido e alla finestra di contesto
- Collasso logico e risposte troppo sicure
- Errori di coordinamento della catena lunga e degli agenti
- Memoria multiagente e deriva dei ruoli
- Problemi di distribuzione e ordinamento del bootstrap

L'idea è semplice:

1. Quando investighi su una risposta errata, acquisisci:
   - attività e richiesta dell'utente
   - Combinazione di percorso o provider in OmniRoute
   - qualsiasi contesto RAG utilizzato a valle (documenti recuperati, chiamate strumento, ecc.)
2. Mappare l'incidente su uno o due numeri WFGY ProblemMap (`No.1` … `No.16`).
3. Memorizza il numero nel tuo dashboard, runbook o tracker degli incidenti accanto ai registri OmniRoute.
4. Utilizza la pagina WFGY corrispondente per decidere se è necessario modificare lo stack RAG, il retriever o la strategia di routing.

Il testo completo e le ricette concrete si trovano qui (licenza MIT, solo testo):

[README di WFGY ProblemMap](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

È possibile ignorare questa sezione se non si eseguono RAG o pipeline di agenti dietro OmniRoute.---

## Still Stuck?

-**Problemi di GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architettura**: vedere [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) per i dettagli interni -**Riferimento API**: vedere [`docs/API_REFERENCE.md`](API_REFERENCE.md) per tutti gli endpoint -**Dashboard salute**: controlla**Dashboard → Salute**per lo stato del sistema in tempo reale -**Traduttore**: utilizza**Dashboard → Traduttore**per eseguire il debug dei problemi di formato
