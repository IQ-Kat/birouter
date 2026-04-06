# OmniRoute MCP Server Documentation (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> 16 akıllı araca sahip Model Bağlam Protokolü sunucusu## Kurulum

OmniRoute MCP yerleşiktir. Şununla başlayın:```bash
omniroute --mcp

````

Veya open-sse aktarımı yoluyla:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Antigravity, Cursor, Copilot ve Claude Masaüstü kurulumu için [IDE Configs](integrations/ide-configs.md) konusuna bakın.---

## Essential Tools (8)

| Araç                            | Açıklama                                                    |
| :------------------------------ | :---------------------------------------------------------- | --------------------- |
| 'omniroute_get_health'          | Ağ geçidi sağlığı, devre kesiciler, çalışma süresi          |
| `omniroute_list_combos`         | Modellerle birlikte tüm yapılandırılmış kombinasyonlar      |
| `omniroute_get_combo_metrics`   | Belirli bir kombinasyon için performans ölçümleri           |
| `omniroute_switch_combo`        | Etkin komboyu kimliğe/ada göre değiştirin                   |
| `omniroute_check_quota`         | Sağlayıcı başına veya tümüne göre kota durumu               |
| 'omniroute_route_request'       | OmniRoute aracılığıyla bir sohbet tamamlama mesajı gönderin |
| 'omniroute_cost_report'         | Bir dönem için maliyet analizi                              |
| `omniroute_list_models_catalog` | Yeteneklere sahip tam model kataloğu                        | ## Advanced Tools (8) |

| Araç                               | Açıklama                                                                           |
| :--------------------------------- | :--------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Geri dönüş ağacıyla deneme amaçlı yönlendirme simülasyonu                          |
| `omniroute_set_budget_guard`       | Düşürme/engelleme/uyarı eylemleriyle oturum bütçesi                                |
| `omniroute_set_resilience_profile` | Muhafazakar/dengeli/agresif ön ayarı uygulayın                                     |
| 'omniroute_test_combo'             | Gerçek bir yukarı akış isteği aracılığıyla tüm modelleri bir arada canlı test edin |
| `omniroute_get_provider_metrics`   | Bir sağlayıcı için ayrıntılı ölçümler                                              |
| `omniroute_best_combo_for_task`    | Alternatiflerle göreve uygunluk önerisi                                            |
| 'omniroute_explain_route'          | Geçmişteki bir yönlendirme kararını açıklayın                                      |
| `omniroute_get_session_snapshot`   | Tam oturum durumu: maliyetler, jetonlar, hatalar                                   | ## Authentication |

MCP araçlarının kimlik doğrulaması API anahtar kapsamları aracılığıyla yapılır. Her araç belirli kapsamlar gerektirir:

| Kapsam               | Araçlar                                           |
| :------------------- | :------------------------------------------------ | ---------------- |
| 'oku:sağlık'         | get_health, get_provider_metrics                  |
| `oku:kombinasyonlar` | list_combos, get_combo_metrics                    |
| `yaz:kombinasyonlar` | switch_combo                                      |
| 'okuma:kota'         | check_quota                                       |
| 'yaz:rota'           | rota_isteği, simüle_rota, test_combo              |
| 'okuma:kullanım'     | maliyet_raporu, get_session_snapshot, açıkla_rota |
| 'yaz:yapılandırma'   | set_budget_guard, set_resilience_profile          |
| 'oku:modeller'       | list_models_catalog, best_combo_for_task          | ## Audit Logging |

Her araç çağrısı şu şekilde "mcp_tool_audit"e kaydedilir:

- Araç adı, argümanlar, sonuç
- Süre (ms), başarı/başarısızlık
- API anahtarı karması, zaman damgası## Files

| Dosya                                        | Amaç                                   |
| :------------------------------------------- | :------------------------------------- |
| 'open-sse/mcp-server/server.ts'              | MCP sunucusu oluşturma + 16 araç kaydı |
| 'open-sse/mcp-server/transport.ts'           | Stdio + HTTP aktarımı                  |
| 'open-sse/mcp-server/auth.ts'                | API anahtarı + kapsam doğrulama        |
| 'open-sse/mcp-server/audit.ts'               | Araç çağrısı denetim günlüğü           |
| 'open-sse/mcp-server/tools/advancedTools.ts' | 8 gelişmiş takım tutucu                |
