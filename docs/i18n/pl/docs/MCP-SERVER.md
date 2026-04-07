# OmniRoute MCP Server Documentation (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Serwer Model Context Protocol z 16 inteligentnymi narzędziami## Zainstaluj

OmniRoute MCP jest wbudowany. Zacznij od:```bash
omniroute --mcp

````

Lub poprzez transport open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Zobacz [Konfiguracje IDE](integrations/ide-configs.md) dla konfiguracji antygrawitacji, kursora, drugiego pilota i Claude Desktop.---

## Essential Tools (8)

| Narzędzie                           | Opis                                                    |
| :---------------------------------- | :------------------------------------------------------ | --------------------- |
| `omniroute_get_health`              | Stan bramy, wyłączniki automatyczne, czas pracy         |
| `kombinacje listy_omniroute`        | Wszystkie skonfigurowane kombinacje z modelami          |
| `omniroute_get_combo_metrics`       | Wskaźniki wydajności dla konkretnej kombinacji          |
| `kombinacja_przełącznika_omniroute` | Przełącz aktywną kombinację według identyfikatora/nazwy |
| `omniroute_check_quota`             | Stan limitu na dostawcę lub wszystkich                  |
| `omniroute_route_żądanie`           | Wyślij zakończenie czatu poprzez OmniRoute              |
| `raport_kosztów_omniroute`          | Analiza kosztów za okres czasu                          |
| `omniroute_list_modeli_katalog`     | Pełny katalog modeli z możliwościami                    | ## Advanced Tools (8) |

| Narzędzie                          | Opis                                                                |
| :--------------------------------- | :------------------------------------------------------------------ | ----------------- |
| `omniroute_symulacja_trasy`        | Symulacja routingu na sucho z drzewem awaryjnym                     |
| `omniroute_set_budget_guard`       | Budżet sesji z działaniami obniżającymi/blokującymi/alarmowymi      |
| `omniroute_set_resilience_profile` | Zastosuj ustawienie wstępne konserwatywne/zrównoważone/agresywne    |
| `kombinacja_testowa_omniroute`     | Przetestuj na żywo wszystkie modele w zestawie na prawdziwe żądanie |
| `omniroute_get_provider_metrics`   | Szczegółowe wskaźniki dla jednego dostawcy                          |
| `omniroute_best_combo_for_task`    | Zalecenia dotyczące sprawności zadaniowej z alternatywami           |
| `omniroute_explain_route`          | Wyjaśnij podjętą wcześniej decyzję o routingu                       |
| `omniroute_get_session_snapshot`   | Pełny stan sesji: koszty, tokeny, błędy                             | ## Authentication |

Narzędzia MCP są uwierzytelniane poprzez zakresy kluczy API. Każde narzędzie wymaga określonych zakresów:

| Zakres                | Narzędzia                                            |
| :-------------------- | :--------------------------------------------------- | ---------------- |
| `czytaj:zdrowie`      | get_health, get_provider_metrics                     |
| `czytaj:kombinacje`   | list_combos, get_combo_metrics                       |
| `napisz: kombinacje`  | przełącznik_combo                                    |
| `czytaj:kwota`        | limit_kontrolny                                      |
| `wpisz:trasa`         | żądanie_trasy, symulacja_trasy, test_combo           |
| `czytaj: użycie`      | raport_kosztów, get_session_snapshot, wyjaśnij_trasę |
| `zapis: konfiguracja` | set_budget_guard, set_resilience_profile             |
| `czytaj:modele`       | lista_modeli_katalog, najlepsza_kombo_do_zadania     | ## Audit Logging |

Każde wywołanie narzędzia jest rejestrowane w `mcp_tool_audit` za pomocą:

- Nazwa narzędzia, argumenty, wynik
- Czas trwania (ms), sukces/porażka
- Hash klucza API, znacznik czasu## Files

| Plik                                         | Cel                                              |
| :------------------------------------------- | :----------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Utworzenie serwera MCP + 16 rejestracji narzędzi |
| `open-sse/mcp-server/transport.ts`           | Stdio + transport HTTP                           |
| `open-sse/mcp-server/auth.ts`                | Klucz API + walidacja zakresu                    |
| `open-sse/mcp-server/audit.ts`               | Rejestrowanie audytu wywołań narzędzia           |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 zaawansowanych modułów obsługi narzędzi        |
