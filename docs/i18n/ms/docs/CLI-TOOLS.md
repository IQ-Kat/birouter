# CLI Tools Setup Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Panduan ini menerangkan cara memasang dan mengkonfigurasi semua alat CLI pengekodan AI yang disokong
untuk menggunakan**OmniRoute**sebagai hujung belakang bersatu, memberikan anda pengurusan kunci terpusat,
penjejakan kos, penukaran model dan log permintaan merentas setiap alat.---

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

**Faedah:**

- Satu kunci API untuk mengurus semua alatan
- Penjejakan kos merentas semua CLI dalam papan pemuka
- Pensuisan model tanpa mengkonfigurasi semula setiap alat
- Berfungsi secara tempatan dan pada pelayan jauh (VPS)---

## Supported Tools (Dashboard Source of Truth)

Kad papan pemuka dalam `/dashboard/cli-tools` dijana daripada `src/shared/constants/cliTools.ts`.
Senarai semasa (v3.0.0-rc.16):

| Alat               | ID            | Perintah      | Mod Persediaan | Kaedah Pasang |
| ------------------ | ------------- | ------------- | -------------- | ------------- | -------------------------------------------- |
| **Kod Claude**     | `claude`      | `claude`      | env            | npm           |
| **OpenAI Codex**   | `codex`       | `codex`       | adat           | npm           |
| **Droid Kilang**   | `droid`       | `droid`       | adat           | dibundel/CLI  |
| **OpenClaw**       | `openclaw`    | `openclaw`    | adat           | dibundel/CLI  |
| **Kursor**         | `kursor`      | apl           | panduan        | apl desktop   |
| **Cline**          | `cline`       | `cline`       | adat           | npm           |
| **Kod Kilo**       | `kilo`        | `kilokod`     | adat           | npm           |
| **Teruskan**       | `teruskan`    | sambungan     | panduan        | Kod VS        |
| **Antigraviti**    | `antigraviti` | dalaman       | mitm           | OmniRoute     |
| **GitHub Copilot** | `copilot`     | sambungan     | adat           | Kod VS        |
| **Kod Terbuka**    | `kod terbuka` | `kod terbuka` | panduan        | npm           |
| **Kiro AI**        | `kiro`        | apl/cli       | mitm           | desktop/CLI   | ### CLI fingerprint sync (Agents + Settings) |

`/papan pemuka/ejen` dan `Tetapan > Cap Jari CLI` menggunakan `src/shared/constants/cliCompatProviders.ts`.
Ini memastikan ID penyedia sejajar dengan kad CLI dan ID lama.

| ID CLI                                                                                               | ID Pembekal Cap Jari |
| ---------------------------------------------------------------------------------------------------- | -------------------- |
| `kilo`                                                                                               | `kilokod`            |
| `copilot`                                                                                            | `github`             |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | ID yang sama         |

ID lama masih diterima untuk keserasian: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Buka papan pemuka OmniRoute →**Pengurus API**(`/papan pemuka/pengurus api`)
2. Klik**Buat Kunci API**
3. Beri nama (cth. `cli-tools`) dan pilih semua kebenaran
4. Salin kekunci — anda memerlukannya untuk setiap CLI di bawah

> Kunci anda kelihatan seperti: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Semua alat berasaskan npm memerlukan Node.js 18+:```bash

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

**Sahkan:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Tambahkan pada `~/.bashrc` (atau `~/.zshrc`), kemudian jalankan `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Untuk**pelayan jauh**gantikan `localhost:20128` dengan IP pelayan atau domain,
> cth. `http://192.168.0.15:20128`.---

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

**Ujian:**`claude "kata khabar"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Ujian:**`codex "apa itu 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Ujian:**`opencode`---

### Cline (CLI or VS Code)

**mod CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Mod Kod VS:**
Tetapan sambungan Cline → Pembekal API: `OpenAI Compatible` → URL asas: `http://localhost:20128/v1`

Atau gunakan papan pemuka OmniRoute →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**mod CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Tetapan Kod VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Atau gunakan papan pemuka OmniRoute →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Edit `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Mulakan semula Kod VS selepas mengedit.---

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

> **Nota:**Kursor mengarahkan permintaan melalui awannya. Untuk penyepaduan OmniRoute,
> dayakan**Cloud Endpoint**dalam Tetapan OmniRoute dan gunakan URL domain awam anda.

Melalui GUI:**Tetapan → Model → Kunci API OpenAI**

- URL asas: `https://your-domain.com/v1`
- Kunci API: kunci OmniRoute anda---

## Dashboard Auto-Configuration

Papan pemuka OmniRoute mengautomasikan konfigurasi untuk kebanyakan alatan:

1. Pergi ke `http://localhost:20128/dashboard/cli-tools`
2. Kembangkan sebarang kad alat
3. Pilih kunci API anda daripada menu lungsur
4. Klik**Apply Config**(jika alat dikesan sebagai dipasang)
5. Atau salin coretan konfigurasi yang dijana secara manual---

## Built-in Agents: Droid & OpenClaw

**Droid**dan**OpenClaw**ialah ejen AI yang dibina terus ke dalam OmniRoute — tiada pemasangan diperlukan.
Ia dijalankan sebagai laluan dalaman dan menggunakan penghalaan model OmniRoute secara automatik.

- Akses: `http://localhost:20128/dashboard/agent`
- Konfigurasikan: kombo dan pembekal yang sama seperti semua alatan lain
- Tiada kunci API atau pemasangan CLI diperlukan---

## Available API Endpoints

| Titik akhir                | Penerangan                        | Gunakan Untuk                   |
| -------------------------- | --------------------------------- | ------------------------------- | --- |
| `/v1/sembang/penyelesaian` | Sembang standard (semua pembekal) | Semua alatan moden              |
| `/v1/respons`              | API Respons (format OpenAI)       | Codex, aliran kerja agen        |
| `/v1/selesai`              | Pelengkapan teks lama             | Alat lama menggunakan `prompt:` |
| `/v1/benam`                | Pembenaman teks                   | RAG, cari                       |
| `/v1/imej/generasi`        | Penjanaan imej                    | DALL-E, Fluks, dsb.             |
| `/v1/audio/ucapan`         | Teks-ke-ucapan                    | ElevenLabs, OpenAI TTS          |
| `/v1/audio/transkripsi`    | Ucapan-ke-teks                    | Deepgram, AssemblyAI            | --- |

## Penyelesaian Masalah

| Ralat                            | Sebab                        | Betulkan                                           |
| -------------------------------- | ---------------------------- | -------------------------------------------------- | --- |
| `Sambungan ditolak`              | OmniRoute tidak berjalan     | `pm2 mula omniroute`                               |
| `401 Tanpa Kebenaran`            | Kunci API salah              | Daftar masuk `/dashboard/api-manager`              |
| `Tiada kombo dikonfigurasikan`   | Tiada kombo penghalaan aktif | Sediakan dalam `/papan pemuka/kombo`               |
| `model tidak sah`                | Model tiada dalam katalog    | Gunakan `auto` atau semak `/papan pemuka/penyedia` |
| CLI menunjukkan "tidak dipasang" | Binari bukan dalam PATH      | Semak `mana <arahan>`                              |
| `kiro-cli: tidak dijumpai`       | Bukan dalam PATH             | `eksport PATH="$HOME/.local/bin:$PATH"`            | --- |

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
