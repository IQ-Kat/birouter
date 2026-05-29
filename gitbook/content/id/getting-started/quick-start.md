# Mulai Cepat

Jalankan Birouter dalam 5 menit dan mulai arahkan permintaan AI secara cerdas.

---

## Mulai Cepat

### 1. Instal

```bash
npm install -g birouter
```

**Persyaratan:** Node.js 20+ ([Detail instalasi](getting-started/installation.md))

### 2. Jalankan

```bash
birouter
```

🎉 **Dashboard terbuka otomatis** di `http://localhost:2004`

- Password default: `123456` (ubah di dashboard)
- API key dibuat secara otomatis
- Siap untuk menghubungkan penyedia

### 3. Hubungkan Penyedia

Anda memiliki 3 cara untuk menghubungkan penyedia:

#### Opsi A: OAuth (Penyedia Langganan)

**Terbaik untuk:** Claude Code, Codex, Gemini CLI, GitHub Copilot

```
Dashboard → Providers → Connect [Provider]
→ Login OAuth → Penyegaran token otomatis
→ Pelacakan kuota diaktifkan
```

**Contoh: Claude Code**
1. Klik "Connect Claude Code"
2. Login dengan akun Claude Anda
3. Berikan otorisasi ke Birouter
4. ✅ Selesai! Gunakan model: `cc/claude-sonnet-4.5`

#### Opsi B: API Key (Penyedia Murah)

**Terbaik untuk:** GLM, MiniMax, Kimi, OpenRouter

```
Dashboard → Providers → Add API Key
→ Pilih penyedia
→ Tempel API key
→ Simpan
```

**Contoh: GLM-4.7**
1. Daftar di [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan API key dari Coding Plan
3. Dashboard → Add API Key → Provider: `glm` → Tempel key
4. ✅ Selesai! Gunakan model: `glm/glm-4.7`

#### Opsi C: Penyedia Gratis (Tanpa Biaya)

**Terbaik untuk:** iFlow, Qwen, Kiro

```
Dashboard → Providers → Connect [Free Provider]
→ Device code atau OAuth
→ Penggunaan tidak terbatas
```

**Contoh: iFlow**
1. Klik "Connect iFlow"
2. Login dengan akun iFlow
3. Berikan otorisasi
4. ✅ Selesai! Gunakan 8 model: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, dll.

---

## 4. Gunakan di Alat CLI

Arahkan alat coding Anda ke Birouter:

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:2004/v1
  OpenAI API Key: [dari dashboard birouter]
  Model: cc/claude-sonnet-4.5
```

### Claude Desktop

Edit `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:2004/v1",
  "anthropic_api_key": "your-birouter-api-key"
}
```

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:2004/v1
API Key: [dari dashboard]
Model: cc/claude-sonnet-4.5
```

---

## 5. Buat Combo Cerdas (Opsional)

Combo memungkinkan fallback otomatis antar model:

```
Dashboard → Combos → Create New

Nama: premium-coding
Models:
  1. cc/claude-sonnet-4.5 (Langganan utama)
  2. glm/glm-4.7 (Backup murah, $0.6/1jt)
  3. if/kimi-k2-thinking (Fallback gratis)

Gunakan di CLI: premium-coding
```

**Cara kerja:**
1. Mencoba Claude Sonnet terlebih dahulu (langganan Anda)
2. Jika kuota habis → GLM-4.7 (ultra-murah)
3. Jika batas anggaran tercapai → iFlow (gratis)
4. Tanpa downtime, pergantian otomatis!

---

## Model yang Tersedia

### Model Langganan (Maksimalkan Dulu)

**Claude Code (`cc/`)** - Langganan Pro/Max:
- `cc/claude-sonnet-4.5` - Claude 4.5 Sonnet
- `cc/claude-haiku-4.5` - Claude 4.5 Haiku

**Codex (`cx/`)** - Langganan Plus/Pro:
- `cx/gpt-4o-codex` - GPT-4o Codex
- `cx/gpt-4-turbo-codex` - GPT-4 Turbo Codex

**Gemini CLI (`gc/`)** - GRATIS 180rb/bulan:
- `gc/gemini-2.0-flash` - Gemini 2.0 Flash
- `gc/gemini-1.5-pro` - Gemini 1.5 Pro

**GitHub Copilot (`gh/`)** - Langganan:
- `gh/gpt-4o` - GPT-4o
- `gh/claude-3.5-sonnet` - Claude 3.5 Sonnet

### Model Murah (Backup)

**GLM (`glm/`)** - $0.6/$2.2 per 1jt:
- `glm/glm-4.7` - GLM 4.7 (reset harian 10 pagi)

**MiniMax (`minimax/`)** - $0.20/$1.00 per 1jt:
- `minimax/MiniMax-M2.1` - MiniMax M2.1 (reset 5 jam)

### Model GRATIS (Darurat)

**iFlow (`if/`)** - 8 model GRATIS:
- `if/kimi-k2-thinking` - Kimi K2 Thinking
- `if/qwen3-coder-plus` - Qwen3 Coder Plus
- `if/deepseek-r1` - DeepSeek R1

**Kiro (`kr/`)** - 2 model GRATIS:
- `kr/claude-sonnet-4.5` - Claude Sonnet 4.5
- `kr/claude-haiku-4.5` - Claude Haiku 4.5

---

## Strategi Optimasi Biaya

### Anggaran Bulanan: $10-20/bulan

```
1. Gunakan free tier Gemini CLI (180rb/bulan) untuk tugas cepat
2. Gunakan kuota langganan Claude Code sepenuhnya (sudah Anda bayar)
3. Fallback ke GLM ($0.6/1jt) saat kuota habis
4. Darurat: MiniMax M2.1 ($0.20/1jt) atau iFlow (gratis)

Contoh nyata (100jt token/bulan):
  60jt via Gemini CLI: $0 (free tier)
  30jt via Claude Code: $0 (langganan yang sudah Anda punya)
  8jt via GLM: $4.80
  2jt via MiniMax: $0.40
  Total: $5.20/bulan + langganan yang sudah ada
```

---

## Langkah Selanjutnya

- [Detail Instalasi](getting-started/installation.md) - Persyaratan, troubleshooting
- [Fitur](features/) - Jelajahi pelacakan kuota, combo, deployment
- [FAQ](../faq.md) - Pertanyaan dan jawaban umum
- [Troubleshooting](../troubleshooting.md) - Perbaiki masalah umum
