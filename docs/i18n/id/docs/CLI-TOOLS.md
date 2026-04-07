# CLI Tools Setup Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Panduan ini menjelaskan cara menginstal dan mengonfigurasi semua alat CLI coding AI yang didukung
untuk menggunakan**OmniRoute**sebagai backend terpadu, memberi Anda pengelolaan kunci terpusat,
pelacakan biaya, peralihan model, dan pencatatan permintaan di setiap alat.---

## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Manfaat:**

- Satu kunci API untuk mengelola semua alat
- Pelacakan biaya di seluruh CLI di dasbor
- Pergantian model tanpa mengkonfigurasi ulang setiap alat
- Bekerja secara lokal dan di server jarak jauh (VPS)---

## Supported Tools (Dashboard Source of Truth)

Kartu dasbor di `/dashboard/cli-tools` dihasilkan dari `src/shared/constants/cliTools.ts`.
Daftar saat ini (v3.0.0-rc.16):

| Alat               | tanda pengenal  | Perintah        | Modus Pengaturan | Metode Instal    |
| ------------------ | --------------- | --------------- | ---------------- | ---------------- | -------------------------------------------- |
| **Kode Claude**    | `claude`        | `claude`        | env              | npm              |
| **Kodeks OpenAI**  | `kodeks`        | `kodeks`        | adat             | npm              |
| **Pabrik Droid**   | `droid`         | `droid`         | adat             | dibundel/CLI     |
| **OpenClaw**       | `cakar terbuka` | `cakar terbuka` | adat             | dibundel/CLI     |
| **Kursor**         | `kursor`        | aplikasi        | panduan          | aplikasi desktop |
| **Klinik**         | `kecenderungan` | `kecenderungan` | adat             | npm              |
| **Kode Kilo**      | `kilo`          | `kilokode`      | adat             | npm              |
| **Lanjutkan**      | `lanjutkan`     | ekstensi        | panduan          | Kode VS          |
| **Antigravitasi**  | `antigravitasi` | dalaman         | mitra            | OmniRoute        |
| **Kopilot GitHub** | `kopilot`       | ekstensi        | custom           | Kode VS          |
| **Kode Terbuka**   | `kode terbuka`  | `kode terbuka`  | panduan          | npm              |
| **Kiro AI**        | `kiro`          | aplikasi/kli    | mitra            | desktop/CLI      | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` dan `Pengaturan > CLI Fingerprint` menggunakan `src/shared/constants/cliCompatProviders.ts`.
Hal ini menjaga ID penyedia tetap selaras dengan kartu CLI dan ID lama.

| ID CLI                                                                                                 | ID Penyedia Sidik Jari   |
| ------------------------------------------------------------------------------------------------------ | ------------------------ |
| `kilo`                                                                                                 | `kilokode`               |
| `kopilot`                                                                                              | `github`                 |
| `claude` / `codex` / `antigravitasi` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | tanda pengenal yang sama |

ID lama masih diterima untuk kompatibilitas: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Buka dasbor OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Klik**Buat Kunci API**
3. Beri nama (misalnya `cli-tools`) dan pilih semua izin
4. Salin kuncinya — Anda akan memerlukannya untuk setiap CLI di bawah

> Kunci Anda terlihat seperti: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Semua alat berbasis npm memerlukan Node.js 18+:```bash

# Claude Code (Anthropic)

npm install -g @anthropic-ai/claude-code

# OpenAI Codex

npm install -g @openai/codex

# OpenCode

npm install -g opencode-ai

# Cline

npm install -g cline

# KiloCode

npm install -g kilocode

# Kiro CLI (Amazon — requires curl + unzip)

apt-get install -y unzip # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH" # add to ~/.bashrc

````

**Memeriksa:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Tambahkan ke `~/.bashrc` (atau `~/.zshrc`), lalu jalankan `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Untuk**server jarak jauh**ganti `localhost:20128` dengan IP server atau domain,
> mis. `http://192.168.0.15:20128`.---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# Via CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Or create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
````

**Tes:**`claude "mengucapkan halo"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Tes:**`kodeks "apa itu 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Pengujian:**`kode terbuka`---

### Cline (CLI or VS Code)

**Mode CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Mode VS Kode:**
Pengaturan ekstensi Cline → Penyedia API: `Kompatibel dengan OpenAI` → URL Dasar: `http://localhost:20128/v1`

Atau gunakan dasbor OmniRoute →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Mode CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Pengaturan Kode VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Atau gunakan dasbor OmniRoute →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Sunting `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Mulai ulang VS Code setelah mengedit.---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Cursor (Desktop App)

> **Catatan:**Kursor merutekan permintaan melalui cloud-nya. Untuk integrasi OmniRoute,
> aktifkan**Cloud Endpoint**di Pengaturan OmniRoute dan gunakan URL domain publik Anda.

Melalui GUI:**Pengaturan → Model → Kunci API OpenAI**

- URL Dasar: `https://domain-anda.com/v1`
- Kunci API: kunci OmniRoute Anda---

## Dashboard Auto-Configuration

Dasbor OmniRoute mengotomatiskan konfigurasi untuk sebagian besar alat:

1. Buka `http://localhost:20128/dashboard/cli-tools`
2. Perluas kartu alat apa pun
3. Pilih kunci API Anda dari dropdown
4. Klik**Apply Config**(jika alat terdeteksi terpasang)
5. Atau salin cuplikan konfigurasi yang dihasilkan secara manual---

## Built-in Agents: Droid & OpenClaw

**Droid**dan**OpenClaw**adalah agen AI yang dibangun langsung ke OmniRoute — tidak perlu instalasi.
Mereka berjalan sebagai rute internal dan menggunakan perutean model OmniRoute secara otomatis.

- Akses: `http://localhost:20128/dashboard/agents`
- Konfigurasi: kombo dan penyedia yang sama dengan semua alat lainnya
- Tidak diperlukan kunci API atau pemasangan CLI---

## Available API Endpoints

| Titik akhir                | Deskripsi                        | Gunakan Untuk                   |
| -------------------------- | -------------------------------- | ------------------------------- | --- |
| `/v1/obrolan/penyelesaian` | Obrolan standar (semua penyedia) | Semua alat modern               |
| `/v1/tanggapan`            | API Respons (format OpenAI)      | Codex, alur kerja agen          |
| `/v1/penyelesaian`         | Penyelesaian teks lama           | Alat lama menggunakan `prompt:` |
| `/v1/embeddings`           | Penyematan teks                  | RAG, cari                       |
| `/v1/gambar/generasi`      | Pembuatan gambar                 | DALL-E, Fluks, dll              |
| `/v1/audio/ucapan`         | Teks-ke-ucapan                   | ElevenLabs, OpenAI TTS          |
| `/v1/audio/transkripsi`    | Pidato-ke-teks                   | Deepgram, MajelisAI             | --- |

## Pemecahan Masalah

| Kesalahan                            | Penyebab                       | Perbaiki                                           |
| ------------------------------------ | ------------------------------ | -------------------------------------------------- | --- |
| `Koneksi ditolak`                    | OmniRoute tidak berjalan       | `pm2 mulai omniroute`                              |
| `401 Tidak Sah`                      | Kunci API salah                | Periksa di `/dashboard/api-manager`                |
| `Tidak ada kombo yang dikonfigurasi` | Tidak ada kombo perutean aktif | Siapkan di `/dasbor/combos`                        |
| `model tidak valid`                  | Model tidak ada dalam katalog  | Gunakan `auto` atau centang `/dashboard/providers` |
| CLI menunjukkan "tidak terpasang"    | Biner tidak ada di PATH        | Periksa `yang <perintah>`                          |
| `kiro-cli: tidak ditemukan`          | Tidak di PATH                  | `ekspor PATH="$HOME/.local/bin:$PATH"`             | --- |

## Quick Setup Script (One Command)

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
