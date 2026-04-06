# OmniRoute MCP Server Documentation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Model Context Protocol server med 16 intelligente verktøy## Installer

OmniRoute MCP er innebygd. Start det med:```bash
omniroute --mcp

````

Eller via åpen SS-transport:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Se [IDE Configs](integrations/ide-configs.md) for oppsett av Antigravity, Cursor, Copilot og Claude Desktop.---

## Essential Tools (8)

| Verktøy                         | Beskrivelse                                     |
| :------------------------------ | :---------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Gateway helse, effektbrytere, oppetid           |
| `omniroute_list_combos`         | Alle konfigurerte kombinasjoner med modeller    |
| `omniroute_get_combo_metrics`   | Ytelsesberegninger for en spesifikk kombinasjon |
| `omniroute_switch_combo`        | Bytt aktiv kombinasjon etter ID/navn            |
| `omniroute_check_quota`         | Kvotestatus per leverandør eller alle           |
| `omniroute_route_request`       | Send en chatfullføring gjennom OmniRoute        |
| `omniroute_cost_report`         | Kostnadsanalyse for en tidsperiode              |
| `omniroute_list_models_catalog` | Full modellkatalog med muligheter               | ## Advanced Tools (8) |

| Verktøy                            | Beskrivelse                                                               |
| :--------------------------------- | :------------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Tørrkjøringsrutingsimulering med reservetre                               |
| `omniroute_set_budget_guard`       | Øktbudsjett med handlinger for degradering/blokkering/varsling            |
| `omniroute_set_resilience_profile` | Bruk konservativ/balansert/aggressiv forhåndsinnstilling                  |
| `omniroute_test_combo`             | Live-test alle modeller i en kombinasjon via en ekte oppstrømsforespørsel |
| `omniroute_get_provider_metrics`   | Detaljerte beregninger for én leverandør                                  |
| `omniroute_best_combo_for_task`    | Task-fitness anbefaling med alternativer                                  |
| `omniroute_explain_route`          | Forklar en tidligere ruteavgjørelse                                       |
| `omniroute_get_session_snapshot`   | Full sesjonstilstand: kostnader, tokens, feil                             | ## Authentication |

MCP-verktøy er autentisert via API-nøkkelomfang. Hvert verktøy krever spesifikke omfang:

| Omfang                | Verktøy                                          |
| :-------------------- | :----------------------------------------------- | ---------------- |
| `les:helse`           | get_health, get_provider_metrics                 |
| `les:kombinasjoner`   | list_combos, get_combo_metrics                   |
| `skriv:kombinasjoner` | switch_combo                                     |
| `les:kvote`           | check_quota                                      |
| `skriv:rute`          | rute_forespørsel, simuler_rute, test_kombinasjon |
| `les:bruk`            | cost_report, get_session_snapshot, explain_route |
| `write:config`        | set_budget_guard, set_resilience_profile         |
| `les:modeller`        | list_models_catalog, best_combo_for_task         | ## Audit Logging |

Hvert verktøykall logges til `mcp_tool_audit` med:

- Verktøynavn, argumenter, resultat
- Varighet (ms), suksess/fiasko
- API-nøkkelhash, tidsstempel## Files

| Fil                                          | Formål                                          |
| :------------------------------------------- | :---------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP-serveroppretting + 16 verktøyregistreringer |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP-transport                          |
| `open-sse/mcp-server/auth.ts`                | API-nøkkel + omfangsvalidering                  |
| `open-sse/mcp-server/audit.ts`               | Logging av verktøyanropsrevisjon                |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 avanserte verktøyhåndterere                   |
