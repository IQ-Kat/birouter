# OmniRoute MCP Server Documentation (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Model Context Protocol-server met 16 intelligente tools## Installeren

OmniRoute MCP is ingebouwd. Begin het met:```bash
omniroute --mcp

````

Of via het open-sse transport:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Zie [IDE Configs](integrations/ide-configs.md) voor de installatie van Antigravity, Cursor, Copilot en Claude Desktop.---

## Essential Tools (8)

| Gereedschap                     | Beschrijving                                    |
| :------------------------------ | :---------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Gatewaystatus, stroomonderbrekers, uptime       |
| `omniroute_list_combos`         | Alle geconfigureerde combo's met modellen       |
| `omniroute_get_combo_metrics`   | Prestatiestatistieken voor een specifieke combo |
| `omniroute_switch_combo`        | Schakel actieve combo in op ID/naam             |
| `omniroute_check_quota`         | Quotastatus per aanbieder of allemaal           |
| `omniroute_route_verzoek`       | Stuur een chatvoltooiing via OmniRoute          |
| `omniroute_kosten_rapport`      | Kostenanalyse voor een bepaalde periode         |
| `omniroute_list_models_catalog` | Volledige modelcatalogus met mogelijkheden      | ## Advanced Tools (8) |

| Gereedschap                        | Beschrijving                                                       |
| :--------------------------------- | :----------------------------------------------------------------- | ----------------- |
| `omniroute_simulatie_route`        | Simulatie van drooglooproutes met fallback-boom                    |
| `omniroute_set_budget_guard`       | Sessiebudget met degradatie-/blokkeer-/waarschuwingsacties         |
| `omniroute_set_veerkracht_profiel` | Pas conservatieve/gebalanceerde/agressieve preset toe              |
| `omniroute_test_combo`             | Live-test alle modellen in een combo via een echt upstream-verzoek |
| `omniroute_get_provider_metrics`   | Gedetailleerde statistieken voor één provider                      |
| `omniroute_beste_combo_voor_taak`  | Taakfitnessadvies met alternatieven                                |
| `omniroute_explain_route`          | Een routeringsbeslissing uit het verleden uitleggen                |
| `omniroute_get_session_snapshot`   | Volledige sessiestatus: kosten, tokens, fouten                     | ## Authentication |

MCP-tools worden geverifieerd via API-sleutelbereiken. Elke tool vereist specifieke scopes:

| Reikwijdte        | Gereedschap                                       |
| :---------------- | :------------------------------------------------ | ---------------- |
| `lees:gezondheid` | get_health, get_provider_metrics                  |
| `lees: combo's`   | list_combos, get_combo_metrics                    |
| `schrijf:combo's` | schakel_combo                                     |
| `lees:quota`      | check_quota                                       |
| `schrijf:route`   | route_request, simuleer_route, test_combo         |
| `lees:gebruik`    | kostenrapport, get_session_snapshot, uitleg_route |
| `schrijf:config`  | set_budget_guard, set_veerkracht_profiel          |
| `lees:modellen`   | list_models_catalog, beste_combo_voor_taak        | ## Audit Logging |

Elke tooloproep wordt vastgelegd in `mcp_tool_audit` met:

- Toolnaam, argumenten, resultaat
- Duur (ms), succes/mislukking
- API-sleutelhash, tijdstempel## Files

| Bestand                                      | Doel                                     |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP-server creatie + 16 toolregistraties |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP-transport                   |
| `open-sse/mcp-server/auth.ts`                | API-sleutel + bereikvalidatie            |
| `open-sse/mcp-server/audit.ts`               | Auditregistratie van tooloproepen        |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 geavanceerde gereedschapshandlers      |
