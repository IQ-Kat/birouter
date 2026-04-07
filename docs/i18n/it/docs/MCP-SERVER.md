# OmniRoute MCP Server Documentation (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Server Model Context Protocol con 16 strumenti intelligenti## Installare

OmniRoute MCP è integrato. Inizia con:```bash
omniroute --mcp

````

Oppure tramite il trasporto open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Consulta [Configurazioni IDE](integrations/ide-configs.md) per la configurazione di Antigravity, Cursor, Copilot e Claude Desktop.---

## Essential Tools (8)

| Strumento                       | Descrizione                                                   |
| :------------------------------ | :------------------------------------------------------------ | --------------------- |
| `omniroute_get_health`          | Stato del gateway, interruttori automatici, tempo di attività |
| `omniroute_list_combos`         | Tutte le combo configurate con i modelli                      |
| `omniroute_get_combo_metrics`   | Metriche delle prestazioni per una combinazione specifica     |
| `omniroute_switch_combo`        | Cambia la combo attiva per ID/nome                            |
| `omniroute_check_quota`         | Stato della quota per fornitore o tutti                       |
| `omniroute_route_request`       | Invia il completamento della chat tramite OmniRoute           |
| `report_costi_omniroute`        | Analisi dei costi per un periodo di tempo                     |
| `omniroute_list_models_catalog` | Catalogo completo dei modelli con funzionalità                | ## Advanced Tools (8) |

| Strumento                          | Descrizione                                                                        |
| :--------------------------------- | :--------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Simulazione del routing a secco con albero di fallback                             |
| `omniroute_set_budget_guard`       | Budget della sessione con azioni di peggioramento/blocco/avviso                    |
| `omniroute_set_resilience_profile` | Applicare il preset conservativo/bilanciato/aggressivo                             |
| `omniroute_test_combo`             | Testare dal vivo tutti i modelli in una combo tramite una richiesta upstream reale |
| `omniroute_get_provider_metrics`   | Metriche dettagliate per un fornitore                                              |
| `omniroute_best_combo_for_task`    | Raccomandazione sull'idoneità al compito con alternative                           |
| `omniroute_explain_route`          | Spiegare una decisione di routing passata                                          |
| `omniroute_get_session_snapshot`   | Stato sessione completa: costi, token, errori                                      | ## Authentication |

Gli strumenti MCP vengono autenticati tramite gli ambiti della chiave API. Ciascuno strumento richiede ambiti specifici:

| Ambito            | Strumenti                                      |
| :---------------- | :--------------------------------------------- | ---------------- |
| `leggi:salute`    | get_health, get_provider_metrics               |
| `leggi:combo`     | list_combos, get_combo_metrics                 |
| `scrivi:combo`    | interruttore_combo                             |
| `leggi:quota`     | controlla_quota                                |
| `scrivi:percorso` | route_request, simula_route, test_combo        |
| `leggi:utilizzo`  | cost_report, get_session_snapshot, aware_route |
| `scrivi:config`   | set_budget_guard, set_resilience_profile       |
| `leggi:modelli`   | list_models_catalog, best_combo_for_task       | ## Audit Logging |

Ogni chiamata allo strumento viene registrata su `mcp_tool_audit` con:

- Nome dello strumento, argomenti, risultato
- Durata (ms), successo/fallimento
- Hash della chiave API, timestamp## Files

| File                                         | Scopo                                                     |
| :------------------------------------------- | :-------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Creazione server MCP + 16 registrazioni di strumenti      |
| `open-sse/mcp-server/transport.ts`           | Stdio + trasporto HTTP                                    |
| `open-sse/mcp-server/auth.ts`                | Chiave API + convalida dell'ambito                        |
| `open-sse/mcp-server/audit.ts`               | Registrazione di controllo delle chiamate dello strumento |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 gestori di utensili avanzati                            |
