# OmniRoute MCP Server Documentation (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Server Model Context Protocol dengan 16 alat cerdas## Instal

OmniRoute MCP sudah terpasang. Mulailah dengan:```bash
omniroute --mcp

````

Atau melalui transportasi terbuka:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Lihat [Konfigurasi IDE](integrations/ide-configs.md) untuk pengaturan Antigravity, Cursor, Copilot, dan Claude Desktop.---

## Essential Tools (8)

| Alat                            | Deskripsi                                       |
| :------------------------------ | :---------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Kesehatan gerbang, pemutus sirkuit, waktu aktif |
| `omniroute_list_combos`         | Semua kombo yang dikonfigurasi dengan model     |
| `omniroute_get_combo_metrics`   | Metrik kinerja untuk kombo tertentu             |
| `omniroute_switch_combo`        | Ganti kombo aktif berdasarkan ID/nama           |
| `omniroute_check_quota`         | Status kuota per penyedia atau semua            |
| `omniroute_route_request`       | Kirim penyelesaian obrolan melalui OmniRoute    |
| `omniroute_cost_report`         | Analisis biaya untuk jangka waktu tertentu      |
| `omniroute_list_models_catalog` | Katalog model lengkap dengan kemampuan          | ## Advanced Tools (8) |

| Alat                               | Deskripsi                                                              |
| :--------------------------------- | :--------------------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | Simulasi routing dry-run dengan pohon fallback                         |
| `omniroute_set_budget_guard`       | Anggaran sesi dengan tindakan penurunan/blokir/peringatan              |
| `omniroute_set_resilience_profile` | Terapkan preset konservatif/seimbang/agresif                           |
| `omniroute_test_combo`             | Uji langsung semua model dalam kombo melalui permintaan upstream nyata |
| `omniroute_get_provider_metrics`   | Metrik terperinci untuk satu penyedia                                  |
| `omniroute_best_combo_for_task`    | Rekomendasi kesesuaian tugas dengan alternatif                         |
| `omniroute_jelaskan_route`         | Jelaskan keputusan perutean masa lalu                                  |
| `omniroute_get_session_snapshot`   | Status sesi penuh: biaya, token, kesalahan                             | ## Authentication |

Alat MCP diautentikasi melalui cakupan kunci API. Setiap alat memerlukan cakupan spesifik:

| Ruang Lingkup       | Alat                                              |
| :------------------ | :------------------------------------------------ | ---------------- |
| `baca:kesehatan`    | get_health, get_provider_metrics                  |
| `baca:kombo`        | daftar_combos, get_combo_metrics                  |
| `tulis: kombo`      | saklar_kombo                                      |
| `baca:kuota`        | check_quota                                       |
| `tulis: rute`       | rute_permintaan, simulasi_route, test_combo       |
| `baca:penggunaan`   | cost_report, get_session_snapshot, jelaskan_route |
| `tulis:konfigurasi` | set_budget_guard, set_resilience_profile          |
| `baca:model`        | list_models_catalog, best_combo_for_task          | ## Audit Logging |

Setiap panggilan alat dicatat ke `mcp_tool_audit` dengan:

- Nama alat, argumen, hasil
- Durasi (ms), berhasil/gagal
- Hash kunci API, stempel waktu## Files

| Berkas                                       | Tujuan                                    |
| :------------------------------------------- | :---------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Pembuatan server MCP + 16 registrasi alat |
| `open-sse/mcp-server/transport.ts`           | Transportasi Stdio + HTTP                 |
| `open-sse/mcp-server/auth.ts`                | Kunci API + validasi cakupan              |
| `open-sse/mcp-server/audit.ts`               | Pencatatan audit panggilan alat           |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 penangan alat canggih                   |
