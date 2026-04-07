# OmniRoute MCP Server Documentation (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Serveur Model Context Protocol avec 16 outils intelligents## Installer

OmniRoute MCP est intégré. Commencez-le avec :```bash
omniroute --mcp

````

Ou via les transports open-sse :```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Voir [IDE Configs](integrations/ide-configs.md) pour la configuration d'Antigravity, Cursor, Copilot et Claude Desktop.---

## Essential Tools (8)

| Outil                           | Descriptif                                         |
| :------------------------------ | :------------------------------------------------- | --------------------- |
| `omniroute_get_health`          | État de la passerelle, disjoncteurs, disponibilité |
| `omniroute_list_combos`         | Tous les combos configurés avec des modèles        |
| `omniroute_get_combo_metrics`   | Mesures de performances pour un combo spécifique   |
| `omniroute_switch_combo`        | Changer le combo actif par ID/nom                  |
| `omniroute_check_quota`         | Statut du quota par fournisseur ou pour tous       |
| `omniroute_route_request`       | Envoyer une fin de discussion via OmniRoute        |
| `omniroute_cost_report`         | Analyse des coûts pour une période donnée          |
| `omniroute_list_models_catalog` | Catalogue complet de modèles avec capacités        | ## Advanced Tools (8) |

| Outil                              | Descriptif                                                                      |
| :--------------------------------- | :------------------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Simulation de routage à sec avec arbre de secours                               |
| `omniroute_set_budget_guard`       | Budget de session avec actions de dégradation/blocage/alerte                    |
| `omniroute_set_resilience_profile` | Appliquer un préréglage conservateur/équilibré/agressif                         |
| `omniroute_test_combo`             | Testez en direct tous les modèles d'un combo via une véritable requête en amont |
| `omniroute_get_provider_metrics`   | Métriques détaillées pour un fournisseur                                        |
| `omniroute_best_combo_for_task`    | Recommandation d'aptitude à la tâche avec alternatives                          |
| `omniroute_explain_route`          | Expliquer une décision d'acheminement passée                                    |
| `omniroute_get_session_snapshot`   | État de la session complète : coûts, jetons, erreurs                            | ## Authentication |

Les outils MCP sont authentifiés via les étendues de clé API. Chaque outil nécessite des périmètres spécifiques :

| Portée             | Outils                                             |
| :----------------- | :------------------------------------------------- | ---------------- |
| `lire:santé`       | get_health, get_provider_metrics                   |
| `lire:combos`      | list_combos, get_combo_metrics                     |
| `écrire:combos`    | switch_combo                                       |
| `lire:quota`       | check_quota                                        |
| `écrire:route`     | route_request, simulation_route, test_combo        |
| `lire:utilisation` | cost_report, get_session_snapshot, expliquer_route |
| `écrire:config`    | set_budget_guard, set_resilience_profile           |
| `lire:modèles`     | list_models_catalog, best_combo_for_task           | ## Audit Logging |

Chaque appel d'outil est enregistré dans `mcp_tool_audit` avec :

- Nom de l'outil, arguments, résultat
- Durée (ms), succès/échec
- Hachage de clé API, horodatage## Files

| Fichier                                      | Objectif                                           |
| :------------------------------------------- | :------------------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Création de serveur MCP + 16 inscriptions d'outils |
| `open-sse/mcp-server/transport.ts`           | Stdio + Transport HTTP                             |
| `open-sse/mcp-server/auth.ts`                | Clé API + validation de la portée                  |
| `open-sse/mcp-server/audit.ts`               | Journalisation d'audit des appels d'outils         |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 gestionnaires d'outils avancés                   |
