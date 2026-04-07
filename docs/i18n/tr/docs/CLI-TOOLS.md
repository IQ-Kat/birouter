# CLI Tools Setup Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Bu kılavuzda desteklenen tüm AI kodlama CLI araçlarının nasıl kurulacağı ve yapılandırılacağı açıklanmaktadır
**OmniRoute**'u birleşik arka uç olarak kullanmak ve size merkezi anahtar yönetimi sunmak,
Her araçta maliyet takibi, model değiştirme ve istek günlüğü tutma.---

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

**Avantajları:**

- Tüm araçları yönetmek için tek bir API anahtarı
- Kontrol panelindeki tüm CLI'lerde maliyet takibi
- Her aleti yeniden yapılandırmadan model değiştirme
- Yerel olarak ve uzak sunucularda (VPS) çalışır---

## Supported Tools (Dashboard Source of Truth)

'/dashboard/cli-tools' içindeki kontrol paneli kartları 'src/shared/constants/cliTools.ts' dosyasından oluşturulur.
Güncel liste (v3.0.0-rc.16):

| Araç                       | kimlik              | Komut        | Kurulum Modu | Kurulum Yöntemi     |
| -------------------------- | ------------------- | ------------ | ------------ | ------------------- | -------------------------------------------- |
| **Claude Kodu**            | 'Claude'            | 'Claude'     | env          | npm                 |
| **OpenAI Kodeksi**         | 'kodeksi'           | 'kodeksi'    | özel         | npm                 |
| **Fabrika Droidi**         | 'droid'             | 'droid'      | özel         | paketlenmiş/CLI     |
| **AçıkPençe**              | 'açıkpençe'         | 'açıkpençe'  | özel         | paketlenmiş/CLI     |
| **İmleç**                  | 'imleç'             | uygulama     | rehber       | masaüstü uygulaması |
| **Cline**                  | 'klina'             | 'klina'      | özel         | npm                 |
| **Kilo Kodu**              | 'kilo'              | 'kilokod'    | özel         | npm                 |
| **Devam**                  | 'devam et'          | uzatma       | rehber       | VS Kodu             |
| **Yer çekimine karşı**     | 'yerçekimine karşı' | dahili       | mim          | OmniRoute           |
| **GitHub Yardımcı Pilotu** | 'yardımcı pilot'    | uzatma       | özel         | VS Kodu             |
| **AçıkKod**                | 'açık kod'          | 'açık kod'   | rehber       | npm                 |
| **Kiro AI**                | 'kiro'              | uygulama/cli | mim          | masaüstü/CLI        | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` ve `Ayarlar > CLI Parmak İzi`, `src/shared/constants/cliCompatProviders.ts`yi kullanın.
Bu, sağlayıcı kimliklerini CLI kartları ve eski kimliklerle uyumlu tutar.

| CLI Kimliği                                                                                         | Parmak İzi Sağlayıcı Kimliği |
| --------------------------------------------------------------------------------------------------- | ---------------------------- |
| 'kilo'                                                                                              | 'kilokod'                    |
| 'yardımcı pilot'                                                                                    | 'github'                     |
| `claude` / `codex` / `antigravity` / `kiro` / `imleç` / `cline` / `opencode` / `droid` / `openclaw` | aynı kimlik                  |

Eski kimlikler uyumluluk açısından hâlâ kabul edilmektedir: "yardımcı pilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. OmniRoute kontrol panelini açın →**API Yöneticisi**(`/dashboard/api-manager`) 2.**API Anahtarı Oluştur**'a tıklayın
2. Bir ad verin (ör. "cli-tools") ve tüm izinleri seçin
3. Anahtarı kopyalayın; aşağıdaki her CLI için ona ihtiyacınız olacak

> Anahtarınız şuna benzer: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Tüm npm tabanlı araçlar Node.js 18+ sürümünü gerektirir:```bash

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

**Doğrulamak:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

`~/.bashrc`ye (veya `~/.zshrc`ye) ekleyin, ardından `source ~/.bashrc`yi çalıştırın:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

>**uzak sunucu**için `localhost:20128` yerine sunucunun IP'sini veya etki alanını yazın,
> örneğin 'http://192.168.0.15:20128'.---

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

**Test:**`Claude "merhaba de"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`kodeksi "2+2 nedir?"'---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**'açık kod'---

### Cline (CLI or VS Code)

**CLI modu:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS Kodu modu:**
Cline uzantısı ayarları → API Sağlayıcısı: `OpenAI Uyumlu` → Temel URL: `http://localhost:20128/v1`

Veya OmniRoute kontrol panelini kullanın →**CLI Araçları → Cline → Yapılandırmayı Uygula**.---

### KiloCode (CLI or VS Code)

**CLI modu:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS Kodu ayarları:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Veya OmniRoute kontrol panelini kullanın →**CLI Araçları → KiloCode → Yapılandırmayı Uygula**.---

### Continue (VS Code Extension)

'~/.continue/config.yaml'ı düzenleyin:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Düzenlemeden sonra VS Code'u yeniden başlatın.---

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

> **Not:**İmleç, istekleri bulutu üzerinden yönlendirir. OmniRoute entegrasyonu için,
> OmniRoute Ayarlarında**Bulut Uç Noktası**'nı etkinleştirin ve genel alan URL'nizi kullanın.

GUI aracılığıyla:**Ayarlar → Modeller → OpenAI API Anahtarı**

- Temel URL: `https://alan-adiniz.com/v1`
- API Anahtarı: OmniRoute anahtarınız---

## Dashboard Auto-Configuration

OmniRoute kontrol paneli çoğu araç için yapılandırmayı otomatikleştirir:

1. 'http://localhost:20128/dashboard/cli-tools' adresine gidin
2. Herhangi bir araç kartını genişletin
3. Açılır menüden API anahtarınızı seçin 4.**Yapılandırmayı Uygula**'ya tıklayın (aletin kurulu olduğu algılanırsa)
4. Veya oluşturulan yapılandırma pasajını manuel olarak kopyalayın---

## Built-in Agents: Droid & OpenClaw

**Droid**ve**OpenClaw**doğrudan OmniRoute'a yerleşik yapay zeka aracılarıdır; kurulum gerektirmez.
Dahili rotalar olarak çalışırlar ve OmniRoute'un model yönlendirmesini otomatik olarak kullanırlar.

- Erişim: 'http://localhost:20128/dashboard/agents'
- Yapılandırma: diğer tüm araçlarla aynı kombinasyonlar ve sağlayıcılar
- API anahtarı veya CLI kurulumu gerekmez---

## Available API Endpoints

| Uç nokta                   | Açıklama                           | Kullanım Amaçlı                 |
| -------------------------- | ---------------------------------- | ------------------------------- | --- |
| `/v1/sohbet/tamamlamalar`  | Standart sohbet (tüm sağlayıcılar) | Tüm modern aletler              |
| `/v1/yanıtlar`             | Yanıtlar API'si (OpenAI formatı)   | Kodeks, temsilci iş akışları    |
| `/v1/tamamlamalar`         | Eski metin tamamlamaları           | 'Prompt:' kullanan eski araçlar |
| `/v1/yerleştirmeler`       | Metin yerleştirmeleri              | RAG, ara                        |
| `/v1/images/jenerasyonlar` | Görüntü oluşturma                  | DALL-E, Flux, vb.               |
| `/v1/ses/konuşma`          | Metinden konuşmaya                 | ElevenLabs, OpenAI TTS          |
| `/v1/audio/transcriptions` | Konuşmayı metne dönüştürme         | Deepgram, AssemblyAI            | --- |

## Sorun Giderme

| Hata                                    | Sebep                           | Düzelt                                                         |
| --------------------------------------- | ------------------------------- | -------------------------------------------------------------- | --- |
| 'Bağlantı reddedildi'                   | OmniRoute çalışmıyor            | 'pm2 çok yönlü rotayı başlat'                                  |
| '401 Yetkisiz'                          | Yanlış API anahtarı             | `/dashboard/api-manager`ı kontrol edin                         |
| `Kombo yapılandırılmadı`                | Etkin yönlendirme birleşimi yok | `/dashboard/combos'da kurulum                                  |
| 'geçersiz model'                        | Model katalogda yok             | 'Otomatik'i kullanın veya '/dashboard/providers'ı kontrol edin |
| CLI "kurulu değil" ifadesini gösteriyor | İkili PATH'de değil             | `Hangi <komut>`u kontrol edin                                  |
| `kiro-cli: bulunamadı`                  | PATH'de değil                   | `export PATH="$HOME/.local/bin:$PATH"`                         | --- |

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
