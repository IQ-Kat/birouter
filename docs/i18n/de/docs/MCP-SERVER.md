# OmniRoute MCP Server Documentation (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Model Context Protocol-Server mit 16 intelligenten Tools## Installieren

OmniRoute MCP ist integriert. Beginnen Sie mit:```bash
omniroute --mcp

````

Oder über den Open-SSe-Verkehr:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Siehe [IDE-Konfigurationen](integrations/ide-configs.md) für die Einrichtung von Antigravity, Cursor, Copilot und Claude Desktop.---

## Essential Tools (8)

| Werkzeug                        | Beschreibung                                     |
| :------------------------------ | :----------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Gateway-Zustand, Leistungsschalter, Betriebszeit |
| `omniroute_list_combos`         | Alle konfigurierten Combos mit Modellen          |
| `omniroute_get_combo_metrics`   | Leistungsmetriken für eine bestimmte Kombination |
| `omniroute_switch_combo`        | Aktive Kombination nach ID/Name wechseln         |
| `omniroute_check_quota`         | Kontingentstatus pro Anbieter oder alle          |
| `omniroute_route_request`       | Senden Sie einen Chat-Abschluss über OmniRoute   |
| `omniroute_cost_report`         | Kostenanalyse für einen Zeitraum                 |
| `omniroute_list_models_catalog` | Vollständiger Modellkatalog mit Funktionen       | ## Advanced Tools (8) |

| Werkzeug                           | Beschreibung                                                                       |
| :--------------------------------- | :--------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Trockenlauf-Routing-Simulation mit Fallback-Baum                                   |
| `omniroute_set_budget_guard`       | Sitzungsbudget mit Verschlechterungs-/Blockierungs-/Warnungsaktionen               |
| `omniroute_set_resilience_profile` | Konservative/ausgewogene/aggressive Voreinstellung anwenden                        |
| `omniroute_test_combo`             | Testen Sie alle Modelle in einer Kombination live über eine echte Upstream-Anfrage |
| `omniroute_get_provider_metrics`   | Detaillierte Kennzahlen für einen Anbieter                                         |
| `omniroute_best_combo_for_task`    | Aufgaben-Fitness-Empfehlung mit Alternativen                                       |
| `omniroute_explain_route`          | Erklären Sie eine frühere Routing-Entscheidung                                     |
| `omniroute_get_session_snapshot`   | Vollständiger Sitzungsstatus: Kosten, Token, Fehler                                | ## Authentication |

MCP-Tools werden über API-Schlüsselbereiche authentifiziert. Jedes Tool erfordert bestimmte Bereiche:

| Geltungsbereich | Werkzeuge                                        |
| :-------------- | :----------------------------------------------- | ---------------- |
| `read:health`   | get_health, get_provider_metrics                 |
| `read:combos`   | list_combos, get_combo_metrics                   |
| `write:combos`  | switch_combo                                     |
| `read:quota`    | check_quota                                      |
| `write:route`   | route_request, simulieren_route, test_combo      |
| `read:usage`    | cost_report, get_session_snapshot, EXPLAIN_route |
| `write:config`  | set_budget_guard, set_resilience_profile         |
| `read:models`   | list_models_catalog, best_combo_for_task         | ## Audit Logging |

Jeder Tool-Aufruf wird in „mcp_tool_audit“ protokolliert mit:

- Werkzeugname, Argumente, Ergebnis
- Dauer (ms), Erfolg/Misserfolg
- API-Schlüssel-Hash, Zeitstempel## Files

| Datei                                        | Zweck                                           |
| :------------------------------------------- | :---------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP-Server-Erstellung + 16 Tool-Registrierungen |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP-Transport                          |
| `open-sse/mcp-server/auth.ts`                | API-Schlüssel + Bereichsvalidierung             |
| `open-sse/mcp-server/audit.ts`               | Tool-Aufruf-Audit-Protokollierung               |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 fortschrittliche Werkzeughandhaber            |
