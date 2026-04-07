# OmniRoute MCP Server Documentation (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Model Context Protocol server s 16 inteligentními nástroji## Instalace

OmniRoute MCP je vestavěný. Začněte s:```bash
omniroute --mcp

````

Nebo prostřednictvím dopravy open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Viz [IDE Configs](integrations/ide-configs.md) pro nastavení Antigravity, Cursor, Copilot a Claude Desktop.---

## Essential Tools (8)

| Nástroj                         | Popis                                       |
| :------------------------------ | :------------------------------------------ | --------------------- |
| `omniroute_get_health`          | Stav brány, jističe, doba provozuschopnosti |
| `omniroute_list_combos`         | Všechna nakonfigurovaná komba s modely      |
| `omniroute_get_combo_metrics`   | Metriky výkonu pro konkrétní kombinaci      |
| `omniroute_switch_combo`        | Přepnout aktivní combo podle ID/jména       |
| `omniroute_check_quota`         | Stav kvóty na poskytovatele nebo všechny    |
| `omniroute_route_request`       | Odeslat dokončení chatu přes OmniRoute      |
| `omniroute_cost_report`         | Analýza nákladů za časové období            |
| `omniroute_list_models_catalog` | Kompletní katalog modelů s funkcemi         | ## Advanced Tools (8) |

| Nástroj                            | Popis                                                                            |
| :--------------------------------- | :------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Simulace směrování nasucho s nouzovým stromem                                    |
| `omniroute_set_budget_guard`       | Rozpočet relace s akcemi snížení/blokování/upozornění                            |
| `omniroute_set_resilience_profile` | Použít konzervativní/vyváženou/agresivní předvolbu                               |
| `omniroute_test_combo`             | Živý test všech modelů v kombinaci prostřednictvím skutečného upstream požadavku |
| `omniroute_get_provider_metrics`   | Podrobné metriky pro jednoho poskytovatele                                       |
| `omniroute_best_combo_for_task`    | Doporučení k vhodnosti úkolu s alternativami                                     |
| `omniroute_explain_route`          | Vysvětlete minulé rozhodnutí o směrování                                         |
| `omniroute_get_session_snapshot`   | Úplný stav relace: náklady, tokeny, chyby                                        | ## Authentication |

Nástroje MCP jsou ověřovány prostřednictvím rozsahů klíčů API. Každý nástroj vyžaduje specifické rozsahy:

| Rozsah          | Nástroje                                         |
| :-------------- | :----------------------------------------------- | ---------------- |
| `číst:zdraví`   | get_health, get_provider_metrics                 |
| `číst:komba`    | list_combos, get_combo_metrics                   |
| `write:combos`  | switch_combo                                     |
| `číst:kvóta`    | check_quota                                      |
| `write:route`   | route_request, simulate_route, test_combo        |
| `čtení:použití` | cost_report, get_session_snapshot, explain_route |
| `write:config`  | set_budget_guard, set_resilience_profile         |
| `číst:modelky`  | list_models_catalog, best_combo_for_task         | ## Audit Logging |

Každé volání nástroje je zaprotokolováno do `mcp_tool_audit` pomocí:

- Název nástroje, argumenty, výsledek
- Doba trvání (ms), úspěch/neúspěch
- Hash klíče API, časové razítko## Files

| Soubor                                       | Účel                                           |
| :------------------------------------------- | :--------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Vytvoření MCP serveru + 16 registrací nástrojů |
| `open-sse/mcp-server/transport.ts`           | Stdio + přenos HTTP                            |
| `open-sse/mcp-server/auth.ts`                | Klíč API + ověření rozsahu                     |
| `open-sse/mcp-server/audit.ts`               | Protokolování auditu volání nástroje           |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 pokročilých nástrojových manipulátorů        |
