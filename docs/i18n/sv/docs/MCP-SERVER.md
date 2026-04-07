# OmniRoute MCP Server Documentation (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Modell Context Protocol-server med 16 intelligenta verktyg## Installera

OmniRoute MCP är inbyggt. Börja med:```bash
omniroute --mcp

````

Eller via open-sse transport:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Se [IDE Configs](integrations/ide-configs.md) för inställning av Antigravity, Cursor, Copilot och Claude Desktop.---

## Essential Tools (8)

| Verktyg                         | Beskrivning                                   |
| :------------------------------ | :-------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Gateway hälsa, strömbrytare, drifttid         |
| `omniroute_list_combos`         | Alla konfigurerade kombinationer med modeller |
| `omniroute_get_combo_metrics`   | Prestandamått för en specifik kombination     |
| `omniroute_switch_combo`        | Byt aktiv kombination efter ID/namn           |
| `omniroute_check_quota`         | Kvotstatus per leverantör eller alla          |
| `omniroute_route_request`       | Skicka en chattklarering via OmniRoute        |
| `omniroute_cost_report`         | Kostnadsanalys för en tidsperiod              |
| `omniroute_list_models_catalog` | Fullständig modellkatalog med funktioner      | ## Advanced Tools (8) |

| Verktyg                            | Beskrivning                                                         |
| :--------------------------------- | :------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Dry-run routingsimulering med reservträd                            |
| `omniroute_set_budget_guard`       | Sessionsbudget med åtgärder för nedbrytning/blockering/varning      |
| `omniroute_set_resilience_profile` | Använd konservativ/balanserad/aggressiv förinställning              |
| `omniroute_test_combo`             | Livetesta alla modeller i en combo via en riktig uppströmsförfrågan |
| `omniroute_get_provider_metrics`   | Detaljerad statistik för en leverantör                              |
| `omniroute_best_combo_for_task`    | Task-fitness rekommendation med alternativ                          |
| `omniroute_explain_route`          | Förklara ett tidigare routingbeslut                                 |
| `omniroute_get_session_snapshot`   | Fullständig sessionstillstånd: kostnader, tokens, fel               | ## Authentication |

MCP-verktyg autentiseras via API-nyckelomfång. Varje verktyg kräver specifika omfattningar:

| Omfattning          | Verktyg                                              |
| :------------------ | :--------------------------------------------------- | ---------------- |
| `läs:hälsa`         | get_health, get_provider_metrics                     |
| `läs:kombinationer` | list_combos, get_combo_metrics                       |
| `write:combos`      | switch_combo                                         |
| `läs:kvot`          | check_quota                                          |
| `skriv:väg`         | route_request, simulate_route, test_combo            |
| `läs:användning`    | kostnadsrapport, get_session_snapshot, explain_route |
| `write:config`      | set_budget_guard, set_resilience_profile             |
| `läs:modeller`      | list_models_catalog, best_combo_for_task             | ## Audit Logging |

Varje verktygsanrop loggas till `mcp_tool_audit` med:

- Verktygsnamn, argument, resultat
- Varaktighet (ms), framgång/misslyckande
- API-nyckelhash, tidsstämpel## Files

| Arkiv                                        | Syfte                                          |
| :------------------------------------------- | :--------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP-serverskapande + 16 verktygsregistreringar |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP-transport                         |
| `open-sse/mcp-server/auth.ts`                | API-nyckel + omfattningsvalidering             |
| `open-sse/mcp-server/audit.ts`               | Loggning av verktygsanropsrevision             |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 avancerade verktygshanterare                 |
