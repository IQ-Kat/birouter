# OmniRoute MCP Server Documentation (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Сервер Model Context Protocol із 16 інтелектуальними інструментами## Встановити

OmniRoute MCP є вбудованим. Почніть це з:```bash
omniroute --mcp

````

Або відкритим транспортом:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Див. [IDE Configs](integrations/ide-configs.md) для налаштування Antigravity, Cursor, Copilot і Claude Desktop.---

## Essential Tools (8)

| Інструмент                      | Опис                                                            |
| :------------------------------ | :-------------------------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Справність шлюзу, автоматичні вимикачі, час безвідмовної роботи |
| `omniroute_list_combos`         | Усі налаштовані комбо з моделями                                |
| `omniroute_get_combo_metrics`   | Показники продуктивності для конкретного комбо                  |
| `omniroute_switch_combo`        | Перемикати активну комбінацію за ID/ім'ям                       |
| `omniroute_check_quota`         | Статус квоти на постачальника або на всіх                       |
| `omniroute_route_request`       | Надіслати завершення чату через OmniRoute                       |
| `omniroute_cost_report`         | Аналітика витрат за період                                      |
| `omniroute_list_models_catalog` | Повний каталог моделей з можливостями                           | ## Advanced Tools (8) |

| Інструмент                         | Опис                                                                                        |
| :--------------------------------- | :------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Симуляція маршрутизації без використання за допомогою резервного дерева                     |
| `omniroute_set_budget_guard`       | Бюджет сесії з діями зниження/блокування/сповіщення                                         |
| `omniroute_set_resilience_profile` | Застосувати консервативний/збалансований/агресивний пресет                                  |
| `omniroute_test_combo`             | Перевірте в реальному часі всі моделі в комбінації за допомогою реального висхідного запиту |
| `omniroute_get_provider_metrics`   | Детальна метрика для одного провайдера                                                      |
| `omniroute_best_combo_for_task`    | Завдання-придатність рекомендації з альтернативами                                          |
| `omniroute_explain_route`          | Поясніть минуле рішення про маршрут                                                         |
| `omniroute_get_session_snapshot`   | Повний стан сесії: витрати, токени, помилки                                                 | ## Authentication |

Інструменти MCP автентифікуються за допомогою областей ключів API. Кожен інструмент вимагає певних областей:

| Сфера          | Інструменти                                      |
| :------------- | :----------------------------------------------- | ---------------- |
| `read:health`  | get_health, get_provider_metrics                 |
| `read:combos`  | list_combos, get_combo_metrics                   |
| `write:combos` | switch_combo                                     |
| `read:квота`   | перевірка_квоти                                  |
| `write:route`  | route_request, simulate_route, test_combo        |
| `read:usage`   | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile         |
| `read:models`  | list_models_catalog, best_combo_for_task         | ## Audit Logging |

Кожен виклик інструменту реєструється в `mcp_tool_audit` з:

- Назва інструменту, аргументи, результат
- Тривалість (мс), успіх/невдача
- Хеш ключа API, мітка часу## Files

| Файл                                         | Призначення                                        |
| :------------------------------------------- | :------------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Створення сервера MCP + 16 реєстрацій інструментів |
| `open-sse/mcp-server/transport.ts`           | Stdio + транспорт HTTP                             |
| `open-sse/mcp-server/auth.ts`                | Ключ API + перевірка області                       |
| `open-sse/mcp-server/audit.ts`               | Журнал аудиту викликів                             |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 просунутих обробників інструментів               |
