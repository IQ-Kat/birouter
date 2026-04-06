# OmniRoute MCP Server Documentation (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Сервер протокола контекста модели с 16 интеллектуальными инструментами## Установить

OmniRoute MCP встроен. Начните с:```bash
omniroute --mcp

````

Или через транспорт open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

См. [Конфигурации IDE](integrations/ide-configs.md) для настройки Антигравитации, Курсора, Copilot и Claude Desktop.---

## Essential Tools (8)

| Инструмент                      | Описание                                                              |
| :------------------------------ | :-------------------------------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Состояние шлюза, автоматические выключатели, время безотказной работы |
| `omniroute_list_combos`         | Все настроенные комбо с моделями                                      |
| `omniroute_get_combo_metrics`   | Показатели производительности для конкретной комбинации               |
| `omniroute_switch_combo`        | Переключить активную комбинацию по ID/имени                           |
| `omniroute_check_quota`         | Статус квоты для каждого провайдера или всех                          |
| `omniroute_route_request`       | Отправьте завершение чата через OmniRoute                             |
| `omniroute_cost_report`         | Аналитика затрат за период времени                                    |
| `omniroute_list_models_catalog` | Полный каталог моделей с возможностями                                | ## Advanced Tools (8) |

| Инструмент                         | Описание                                                                             |
| :--------------------------------- | :----------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Моделирование пробной маршрутизации с резервным деревом                              |
| `omniroute_set_budget_guard`       | Бюджет сеанса с действиями по снижению качества/блокировке/предупреждению            |
| `omniroute_set_resilience_profile` | Применить консервативный/сбалансированный/агрессивный пресет                         |
| `omniroute_test_combo`             | Живое тестирование всех моделей в комбинации с помощью реального восходящего запроса |
| `omniroute_get_provider_metrics`   | Подробные метрики для одного провайдера                                              |
| `omniroute_best_combo_for_task`    | Рекомендации по пригодности к работе с альтернативами                                |
| `omniroute_explain_route`          | Объясните прошлое решение о маршрутизации                                            |
| `omniroute_get_session_snapshot`   | Полное состояние сессии: затраты, токены, ошибки                                     | ## Authentication |

Инструменты MCP аутентифицируются через области ключей API. Каждый инструмент требует определенных областей применения:

| Область применения     | Инструменты                                            |
| :--------------------- | :----------------------------------------------------- | ---------------- |
| `читай: здоровье`      | get_health, get_provider_metrics                       |
| `читать:комбо`         | list_combos, get_combo_metrics                         |
| `писать:комбо`         | переключатель_комбо                                    |
| `читать:квота`         | проверка_квота                                         |
| `писать: маршрут`      | маршрут*запрос, симулировать*маршрут, test_combo       |
| `читать:использование` | Cost*report, get_session_snapshot, объяснение*маршрута |
| `писать: конфигурация` | set_budget_guard, set_resilience_profile               |
| `читай:модели`         | список*моделей*каталог, лучшая*комбо*для_задачи        | ## Audit Logging |

Каждый вызов инструмента записывается в `mcp_tool_audit` с помощью:

- Имя инструмента, аргументы, результат
- Продолжительность (мс), успех/неуспех
- Хэш API-ключа, временная метка## Files

| Файл                                         | Цель                                               |
| :------------------------------------------- | :------------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Создание сервера MCP + регистрация 16 инструментов |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP-транспорт                             |
| `open-sse/mcp-server/auth.ts`                | Ключ API + проверка области                        |
| `open-sse/mcp-server/audit.ts`               | Журналирование аудита вызовов инструментов         |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 продвинутых обработчиков инструментов            |
