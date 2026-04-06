# OmniRoute MCP Server Documentation (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Servidor Model Context Protocol com 16 ferramentas inteligentes## Instalar

O OmniRoute MCP está integrado. Comece com:```bash
omniroute --mcp

````

Ou através do transporte aberto:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Consulte [Configurações de IDE](integrations/ide-configs.md) para configuração de Antigravidade, Cursor, Copilot e Claude Desktop.---

## Essential Tools (8)

| Ferramenta                      | Descrição                                               |
| :------------------------------ | :------------------------------------------------------ | --------------------- |
| `omniroute_get_health`          | Integridade do gateway, disjuntores, tempo de atividade |
| `omniroute_list_combos`         | Todos os combos configurados com modelos                |
| `omniroute_get_combo_metrics`   | Métricas de desempenho para um combo específico         |
| `omniroute_switch_combo`        | Alternar combo ativo por ID/nome                        |
| `omniroute_check_quota`         | Status da cota por provedor ou por todos                |
| `omniroute_route_request`       | Envie uma conclusão de bate-papo através do OmniRoute   |
| `omniroute_cost_report`         | Análise de custos por um período de tempo               |
| `omniroute_list_models_catalog` | Catálogo completo de modelos com capacidades            | ## Advanced Tools (8) |

| Ferramenta                         | Descrição                                                                            |
| :--------------------------------- | :----------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Simulação de roteamento a seco com árvore de fallback                                |
| `omniroute_set_budget_guard`       | Orçamento da sessão com ações de degradação/bloqueio/alerta                          |
| `omniroute_set_resilience_profile` | Aplicar predefinição conservadora/equilibrada/agressiva                              |
| `omniroute_test_combo`             | Teste ao vivo todos os modelos em um combo por meio de uma solicitação upstream real |
| `omniroute_get_provider_metrics`   | Métricas detalhadas para um fornecedor                                               |
| `omniroute_best_combo_for_task`    | Recomendação de aptidão para tarefas com alternativas                                |
| `omniroute_explain_route`          | Explique uma decisão de roteamento anterior                                          |
| `omniroute_get_session_snapshot`   | Estado completo da sessão: custos, tokens, erros                                     | ## Authentication |

As ferramentas MCP são autenticadas por meio de escopos de chave de API. Cada ferramenta requer escopos específicos:

| Escopo            | Ferramentas                                            |
| :---------------- | :----------------------------------------------------- | ---------------- |
| `leia:saúde`      | get_health, get_provider_metrics                       |
| `leia:combos`     | list_combos, get_combo_metrics                         |
| `escrever:combos` | switch_combo                                           |
| `leia:cota`       | cota_de_verificação                                    |
| `escrever:rota`   | route_request, simula_route, test_combo                |
| `leia:uso`        | relatório_custo, get_session_snapshot, explicação_rota |
| `escrever:config` | set_budget_guard, set_resilience_profile               |
| `leia:modelos`    | list_models_catalog, best_combo_for_task               | ## Audit Logging |

Cada chamada de ferramenta é registrada em `mcp_tool_audit` com:

- Nome da ferramenta, argumentos, resultado
- Duração (ms), sucesso/falha
- Hash da chave API, carimbo de data/hora## Files

| Arquivo                                      | Finalidade                                            |
| :------------------------------------------- | :---------------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Criação de servidor MCP + 16 cadastros de ferramentas |
| `open-sse/mcp-server/transport.ts`           | Transporte Stdio + HTTP                               |
| `open-sse/mcp-server/auth.ts`                | Chave API + validação de escopo                       |
| `open-sse/mcp-server/audit.ts`               | Registro de auditoria de chamada de ferramenta        |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 manipuladores de ferramentas avançados              |
