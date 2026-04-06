# OmniRoute MCP Server Documentation (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Model Context Protocol server so 16 inteligentnými nástrojmi## Inštalácia

OmniRoute MCP je vstavaný. Začnite s:```bash
omniroute --mcp

````

Alebo cez dopravu open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Pozrite si [IDE Configs](integrations/ide-configs.md) pre nastavenie Antigravity, Cursor, Copilot a Claude Desktop.---

## Essential Tools (8)

| Nástroj                         | Popis                                       |
| :------------------------------ | :------------------------------------------ | --------------------- |
| `omniroute_get_health`          | Stav brány, ističe, doba prevádzky          |
| `omniroute_list_combos`         | Všetky nakonfigurované kombá s modelmi      |
| `omniroute_get_combo_metrics`   | Metriky výkonnosti pre konkrétnu kombináciu |
| `omniroute_switch_combo`        | Prepnúť aktívnu kombináciu podľa ID/mena    |
| `omniroute_check_quota`         | Stav kvóty na poskytovateľa alebo všetkých  |
| `omniroute_route_request`       | Odoslať dokončenie rozhovoru cez OmniRoute  |
| `omniroute_cost_report`         | Analýza nákladov za časové obdobie          |
| `omniroute_list_models_catalog` | Kompletný katalóg modelov s funkciami       | ## Advanced Tools (8) |

| Nástroj                            | Popis                                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Simulácia smerovania nasucho s záložným stromom                                       |
| `omniroute_set_budget_guard`       | Rozpočet relácie s akciami zníženia/blokovania/upozornenia                            |
| `omniroute_set_resilience_profile` | Použiť konzervatívnu/vyváženú/agresívnu predvoľbu                                     |
| `omniroute_test_combo`             | Živý test všetkých modelov v kombinácii prostredníctvom skutočnej upstream požiadavky |
| `omniroute_get_provider_metrics`   | Podrobné metriky pre jedného poskytovateľa                                            |
| `omniroute_best_combo_for_task`    | Odporúčanie vhodnosti úlohy s alternatívami                                           |
| `omniroute_explain_route`          | Vysvetlite minulé rozhodnutie o smerovaní                                             |
| `omniroute_get_session_snapshot`   | Úplný stav relácie: náklady, tokeny, chyby                                            | ## Authentication |

Nástroje MCP sa overujú prostredníctvom rozsahov kľúčov API. Každý nástroj vyžaduje špecifické rozsahy:

| Rozsah             | Nástroje                                         |
| :----------------- | :----------------------------------------------- | ---------------- |
| "čítaj:zdravie"    | get_health, get_provider_metrics                 |
| `read:combos`      | zoznam_combos, get_combo_metrics                 |
| `write:combos`     | switch_combo                                     |
| "čítaj:kvóta"      | check_quota                                      |
| `write:route`      | route_request, simulate_route, test_combo        |
| "čítaj:používanie" | cost_report, get_session_snapshot, explain_route |
| `write:config`     | set_budget_guard, set_resilience_profile         |
| "čítaj:modelky"    | zoznam_modelov_katalog, best_combo_for_task      | ## Audit Logging |

Každé volanie nástroja sa zaznamená do `mcp_tool_audit` pomocou:

- Názov nástroja, argumenty, výsledok
- Trvanie (ms), úspech/neúspech
- API kľúč hash, časová pečiatka## Files

| Súbor                                        | Účel                                              |
| :------------------------------------------- | :------------------------------------------------ |
| `open-sse/mcp-server/server.ts`              | Vytvorenie MCP servera + 16 registrácií nástrojov |
| `open-sse/mcp-server/transport.ts`           | Stdio + prenos HTTP                               |
| `open-sse/mcp-server/auth.ts`                | Kľúč API + overenie rozsahu                       |
| `open-sse/mcp-server/audit.ts`               | Protokolovanie auditu volaní nástroja             |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 pokročilých nástrojov na manipuláciu            |
