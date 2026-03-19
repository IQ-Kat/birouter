# Dokumentace k serveru OmniRoute MCP

> Server protokolu kontextu modelu s 16 inteligentními nástroji

## Instalace

OmniRoute MCP je integrovaný. Spusťte ho pomocí:

```bash
omniroute --mcp
```

Nebo prostřednictvím open-sse transportu:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

## Konfigurace IDE

Viz [konfigurace IDE](integrations/ide-configs.md) pro nastavení Antigravity, Cursoru, Copilota a Claude Desktopu.

---

## Základní nástroje (8)

Nástroj | Popis
:-- | :--
`omniroute_get_health` | Stav brány, jističe, provozuschopnost
`omniroute_list_combos` | Všechny nakonfigurované kombinace s modely
`omniroute_get_combo_metrics` | Metriky výkonu pro konkrétní kombinaci
`omniroute_switch_combo` | Přepnout aktivní kombinaci podle ID/jména
`omniroute_check_quota` | Stav kvóty pro jednotlivé poskytovatele nebo všechny
`omniroute_route_request` | Odeslání dokončení chatu přes OmniRoute
`omniroute_cost_report` | Analýza nákladů za určité časové období
`omniroute_list_models_catalog` | Kompletní katalog modelů s funkcemi

## Pokročilé nástroje (8)

Nástroj | Popis
:-- | :--
`omniroute_simulate_route` | Simulace trasování na dryru s fallback stromem
`omniroute_set_budget_guard` | Rozpočet relace s akcemi degradace/blokování/upozornění
`omniroute_set_resilience_profile` | Použít konzervativní/vyvážený/agresivní předvolbu
`omniroute_test_combo` | Živé testování všech modelů v kombinaci
`omniroute_get_provider_metrics` | Podrobné metriky pro jednoho poskytovatele
`omniroute_best_combo_for_task` | Doporučení pro splnění úkolu a jeho vhodnosti s alternativami
`omniroute_explain_route` | Vysvětlete minulé rozhodnutí o trase
`omniroute_get_session_snapshot` | Stav celé relace: náklady, tokeny, chyby

## Ověřování

Nástroje MCP jsou ověřovány pomocí rozsahů klíčů API. Každý nástroj vyžaduje specifické rozsahy:

Rozsah | Nástroje
:-- | :--
`read:health` | get_health, get_provider_metrics
`read:combos` | seznam_kombinací, získání_kombinovaných_metrik
`write:combos` | přepínač_kombinace
`read:quota` | check_quote
`write:route` | požadavek_trasy, simulace_trasy, testovací_kombinace
`read:usage` | zpráva_o_nákladech, získání_snímku_relace, vysvětlení_trasy
`write:config` | set_budget_guard, set_resilience_profile
`read:models` | seznam_modelů_katalog, nejlepší_kombinace_pro_úkol

## Protokolování auditu

Každé volání nástroje je zaznamenáno do `mcp_tool_audit` s touto funkcí:

- Název nástroje, argumenty, výsledek
- Trvání (ms), úspěch/neúspěch
- Haš klíče API, časové razítko

## Soubory

Soubor | Účel
:-- | :--
`open-sse/mcp-server/server.ts` | Vytvoření MCP serveru + 16 registrací nástrojů
`open-sse/mcp-server/transport.ts` | Stdio + HTTP transport
`open-sse/mcp-server/auth.ts` | Ověření klíče API + rozsahu
`open-sse/mcp-server/audit.ts` | Protokolování auditu volání nástrojů
`open-sse/mcp-server/tools/advancedTools.ts` | 8 pokročilých manipulátorů s nástroji
