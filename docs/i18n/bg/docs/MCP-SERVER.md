# OmniRoute MCP Server Documentation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Модел на Context Protocol сървър с 16 интелигентни инструмента## Инсталиране

OmniRoute MCP е вграден. Започнете го с:`bash
omniroute --mcp`

Или чрез отворения транспорт:```bash

# HTTP streamable transport (port 20130)

omniroute --dev # MCP auto-starts on /mcp endpoint

```

## IDE Configuration

Вижте [IDE Configs](integrations/ide-configs.md) за настройка на Antigravity, Cursor, Copilot и Claude Desktop.---## Essential Tools (8)

| Инструмент | Описание |
| :------------------------------ | :--------------------------------------- |
| `omniroute_get_health` | Здраве на шлюза, прекъсвачи, време за работа |
| `omniroute_list_combos` | Всички конфигурирани комбинации с модели |
| `omniroute_get_combo_metrics` | Показатели за ефективност за конкретна комбинация |
| `omniroute_switch_combo` | Превключете активното комбо по ID/име |
| `omniroute_check_quota` | Състояние на квотата за доставчик или всички |
| `omniroute_route_request` | Изпратете завършване на чат чрез OmniRoute |
| `omniroute_cost_report` | Анализ на разходите за период от време |
| `omniroute_list_models_catalog` | Пълен каталог на модели с възможности |## Advanced Tools (8)

| Инструмент | Описание |
| :-------------------------------- | :---------------------------------------------------------- |
| `omniroute_simulate_route` | Симулация на сухо движение с резервно дърво |
| `omniroute_set_budget_guard` | Бюджет на сесията с действие за влошаване/блокиране/предупреждение |
| `omniroute_set_resilience_profile` | Прилагане на консервативна/балансирана/агресивна предварителна настройка |
| `omniroute_test_combo` | Тествайте на живо всички модели в комбо чрез реална заявка нагоре |
| `omniroute_get_provider_metrics` | Подробни показатели за един доставчик |
| `omniroute_best_combo_for_task` | Препоръка за годност на задачите с алтернативи |
| `omniroute_explain_route` | Обяснете минало решение за маршрутизиране |
| `omniroute_get_session_snapshot` | Пълно състояние на сесията: разходи, токени, грешки |## Удостоверяване

MCP инструментите се удостоверяват чрез API ключови обхвати. Всеки инструмент изисква специфични обхвати:

| Обхват | Инструменти |
| :------------- | :---------------------------------------------------- |
| `read:здраве` | get_health, get_provider_metrics |
| `read:combos` | list_combos, get_combo_metrics |
| `write:combos` | switch_combo |
| `четене:квота` | проверка_квота |
| `write:route` | route_request, simulate_route, test_combo |
| `read:usage` | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile |
| `read:models` | list_modeli_katalog, най-добра_комбо_за_задача |## Регистриране на одит

Всяко извикване на инструмента се регистрира в `mcp_tool_audit` с:

- Име на инструмента, аргументи, резултат
- Продължителност (ms), успех/неуспех
- API ключ хеш, времево клеймо## Файлове

| Файл | Цел |
| :------------------------------------------ | :------------------------------------------ |
| `open-sse/mcp-server/server.ts` | Създаване на MCP сървър + 16 инструмента за регистрация |
| `open-sse/mcp-server/transport.ts` | Stdio + HTTP транспорт |
| `open-sse/mcp-server/auth.ts` | API ключ + валидиране на обхват |
| `open-sse/mcp-server/audit.ts` | Регистриране на одита на обажданията на инструмента |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 усъвършенствани манипулатори на инструменти |
```
