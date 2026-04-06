# CLI Tools Setup Guide — OmniRoute (हिन्दी (IN))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

यह मार्गदर्शिका बताती है कि सभी समर्थित एआई कोडिंग सीएलआई टूल को कैसे स्थापित और कॉन्फ़िगर करें
**OmniRoute**को एकीकृत बैकएंड के रूप में उपयोग करने के लिए, आपको केंद्रीकृत कुंजी प्रबंधन प्रदान करना,
लागत ट्रैकिंग, मॉडल स्विचिंग, और प्रत्येक टूल में लॉगिंग का अनुरोध करें।---

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

**फायदे:**

- सभी उपकरणों को प्रबंधित करने के लिए एक एपीआई कुंजी
- डैशबोर्ड में सभी सीएलआई पर लागत ट्रैकिंग
- प्रत्येक उपकरण को पुन: कॉन्फ़िगर किए बिना मॉडल स्विचिंग
- स्थानीय और दूरस्थ सर्वर (वीपीएस) पर काम करता है---

## Supported Tools (Dashboard Source of Truth)

`/dashboard/cli-tools` में डैशबोर्ड कार्ड `src/shared/constents/cliTools.ts` से उत्पन्न होते हैं।
वर्तमान सूची (v3.0.0-rc.16):

| उपकरण              | आईडी           | आदेश      | सेटअप मोड  | स्थापित करने की विधि |
| ------------------ | -------------- | --------- | ---------- | -------------------- | -------------------------------------------- |
| **क्लाउड कोड**     | 'क्लाउड'       | 'क्लाउड'  | env        | एनपीएम               |
| **ओपनएआई कोडेक्स** | `कोडेक्स`      | `कोडेक्स` | कस्टम      | एनपीएम               |
| **फ़ैक्टरी Droid** | 'ड्रॉयड'       | 'ड्रॉयड'  | कस्टम      | बंडल/सीएलआई          |
| **खुला पंजा**      | `ओपनक्ला`      | `ओपनक्ला` | कस्टम      | बंडल/सीएलआई          |
| **कर्सर**          | 'कर्सर'        | ऐप        | मार्गदर्शक | डेस्कटॉप ऐप          |
| **क्लाइन**         | 'क्लाइन'       | 'क्लाइन'  | कस्टम      | एनपीएम               |
| **किलो कोड**       | `किलो`         | `किलोकोड` | कस्टम      | एनपीएम               |
| **जारी रखें**      | `जारी रखें`    | विस्तार   | मार्गदर्शक | वीएस कोड             |
| **एंटीग्रेविटी**   | `एंटीग्रेविटी` | आंतरिक    | मिटम       | ओमनीरूट              |
| **गिटहब कोपायलट**  | 'कोपायलट'      | विस्तार   | कस्टम      | वीएस कोड             |
| **ओपनकोड**         | `ओपनकोड`       | `ओपनकोड`  | मार्गदर्शक | एनपीएम               |
| **किरो ऐ**         | 'किरो'         | ऐप/सीएलआई | मिटम       | डेस्कटॉप/सीएलआई      | ### CLI fingerprint sync (Agents + Settings) |

`/डैशबोर्ड/एजेंट` और `सेटिंग्स > सीएलआई फ़िंगरप्रिंट` `src/shared/constents/cliCompatProviders.ts` का उपयोग करते हैं।
यह प्रदाता आईडी को सीएलआई कार्ड और लीगेसी आईडी के साथ संरेखित रखता है।

| सीएलआई आईडी                                                                                           | फ़िंगरप्रिंट प्रदाता आईडी |
| ----------------------------------------------------------------------------------------------------- | ------------------------- |
| `किलो`                                                                                                | `किलोकोड`                 |
| 'कोपायलट'                                                                                             | `जीथूब`                   |
| `क्लाउड` / `कोडेक्स` / `एंटीग्रेविटी` / `किरो` / `कर्सर` / `क्लाइन` / `ओपनकोड` / `ड्रॉयड` / `ओपनक्ला` | एक ही आईडी                |

संगतता के लिए लीगेसी आईडी अभी भी स्वीकार की जाती हैं: `कोपायलट`, `किमी-कोडिंग`, `क्वेन`।---

## Step 1 — Get an OmniRoute API Key

1. ओमनीरूट डैशबोर्ड खोलें →**एपीआई मैनेजर**(`/डैशबोर्ड/एपीआई-मैनेजर`) 2.**एपीआई कुंजी बनाएं**पर क्लिक करें
2. इसे एक नाम दें (उदाहरण के लिए `cli-tools`) और सभी अनुमतियाँ चुनें
3. कुंजी की प्रतिलिपि बनाएँ - आपको नीचे दिए गए प्रत्येक सीएलआई के लिए इसकी आवश्यकता होगी

> आपकी कुंजी इस तरह दिखती है: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

सभी npm-आधारित टूल के लिए Node.js 18+ की आवश्यकता होती है:```bash

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

**सत्यापित करें:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

`~/.bashrc` (या `~/.zshrc`) में जोड़ें, फिर `source ~/.bashrc` चलाएँ:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

>**रिमोट सर्वर**के लिए `localhost:20128` को सर्वर आईपी या डोमेन से बदलें,
> उदा. `http://192.168.0.15:20128`.---

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

**टेस्ट:**`क्लाउड "हैलो कहो"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**टेस्ट:**`कोडेक्स "2+2 क्या है?"---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**टेस्ट:**`ओपनकोड`---

### Cline (CLI or VS Code)

**सीएलआई मोड:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**वीएस कोड मोड:**
क्लाइन एक्सटेंशन सेटिंग्स → एपीआई प्रदाता: `ओपनएआई संगत` → बेस यूआरएल: `http://localhost:20128/v1`

या ओमनीरूट डैशबोर्ड →**सीएलआई टूल्स → क्लाइन → कॉन्फिग लागू करें**का उपयोग करें।---

### KiloCode (CLI or VS Code)

**सीएलआई मोड:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**वीएस कोड सेटिंग्स:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

या ओमनीरूट डैशबोर्ड →**सीएलआई टूल्स → किलोकोड → कॉन्फिग लागू करें**का उपयोग करें।---

### Continue (VS Code Extension)

`~/.continue/config.yaml` संपादित करें:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

संपादन के बाद वीएस कोड पुनः आरंभ करें।---

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

> **ध्यान दें:**कर्सर अपने क्लाउड के माध्यम से अनुरोधों को रूट करता है। ओमनीरूट एकीकरण के लिए,
> ओमनीरूट सेटिंग्स में**क्लाउड एंडपॉइंट**सक्षम करें और अपने सार्वजनिक डोमेन यूआरएल का उपयोग करें।

जीयूआई के माध्यम से:**सेटिंग्स → मॉडल → ओपनएआई एपीआई कुंजी**

- बेस यूआरएल: `https://your-domain.com/v1`
- एपीआई कुंजी: आपकी ओमनीरूट कुंजी---

## Dashboard Auto-Configuration

ओमनीरूट डैशबोर्ड अधिकांश टूल के लिए कॉन्फ़िगरेशन को स्वचालित करता है:

1. `http://localhost:20128/dashboard/cli-tools` पर जाएं
2. किसी टूल कार्ड का विस्तार करें
3. ड्रॉपडाउन से अपनी एपीआई कुंजी चुनें 4.**कॉन्फिग लागू करें**पर क्लिक करें (यदि उपकरण स्थापित पाया जाता है)
4. या जनरेट किए गए कॉन्फ़िगरेशन स्निपेट को मैन्युअल रूप से कॉपी करें---

## Built-in Agents: Droid & OpenClaw

**Droid**और**OpenClaw**AI एजेंट हैं जो सीधे ओमनीरूट में निर्मित होते हैं - किसी इंस्टॉलेशन की आवश्यकता नहीं है।
वे आंतरिक मार्गों के रूप में चलते हैं और स्वचालित रूप से ओमनीरूट के मॉडल रूटिंग का उपयोग करते हैं।

- प्रवेश: `http://localhost:20128/डैशबोर्ड/एजेंट`
- कॉन्फ़िगर करें: अन्य सभी टूल के समान कॉम्बो और प्रदाता
- कोई एपीआई कुंजी या सीएलआई इंस्टॉल की आवश्यकता नहीं है---

## Available API Endpoints

| समापन बिंदु                 | विवरण                                | के लिए उपयोग करें            |
| --------------------------- | ------------------------------------ | ---------------------------- | ------------------------------- |
| `/v1/चैट/समापन`             | मानक चैट (सभी प्रदाता)               | सभी आधुनिक उपकरण             |
| `/v1/प्रतिक्रियाएँ`         | प्रतिक्रियाएँ एपीआई (ओपनएआई प्रारूप) | कोडेक्स, एजेंटिक वर्कफ़्लोज़ |
| `/v1/समापन`                 | विरासत पाठ पूर्णताएँ                 | `प्रॉम्प्ट:`                 | का उपयोग करने वाले पुराने उपकरण |
| `/v1/एम्बेडिंग्स`           | टेक्स्ट एम्बेडिंग                    | आरएजी, खोज                   |
| `/v1/छवियां/पीढ़ी`          | छवि निर्माण                          | DALL-ई, फ्लक्स, आदि          |
| `/v1/ऑडियो/भाषण`            | पाठ से वाक्                          | इलेवनलैब्स, ओपनएआई टीटीएस    |
| `/v1/ऑडियो/ट्रांस्क्रिप्शन` | भाषण-से-पाठ                          | दीपग्राम, असेंबलीएआई         | ---                             |

## समस्या निवारण

| त्रुटि                               | कारण                          | ठीक करें                                                |
| ------------------------------------ | ----------------------------- | ------------------------------------------------------- | --- |
| `कनेक्शन अस्वीकृत`                   | ओमनीरूट नहीं चल रहा है        | `pm2 सर्वव्यापी प्रारंभ करें`                           |
| `401 अनधिकृत`                        | गलत एपीआई कुंजी               | `/डैशबोर्ड/एपीआई-मैनेजर` में चेक करें                   |
| `कोई कॉम्बो कॉन्फ़िगर नहीं किया गया` | कोई सक्रिय रूटिंग कॉम्बो नहीं | `/डैशबोर्ड/कॉम्बोस` में सेट अप करें                     |
| `अमान्य मॉडल`                        | मॉडल कैटलॉग में नहीं है       | `ऑटो` का प्रयोग करें या `/डैशबोर्ड/प्रदाताओं` को जांचें |
| सीएलआई दिखाता है "स्थापित नहीं"      | बाइनरी पथ में नहीं है         | `कौन सा <कमांड>` जांचें                                 |
| `कीरो-क्ली: नहीं मिला`               | पथ में नहीं                   | `export PATH='$HOME/.local/bin:$PATH'`                  | --- |

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
