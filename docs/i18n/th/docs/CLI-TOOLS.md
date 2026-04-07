# CLI Tools Setup Guide — OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

คู่มือนี้จะอธิบายวิธีการติดตั้งและกำหนดค่าเครื่องมือ CLI การเข้ารหัส AI ที่รองรับทั้งหมด
เพื่อใช้**OmniRoute**เป็นแบ็กเอนด์แบบรวม ให้คุณจัดการคีย์แบบรวมศูนย์
การติดตามต้นทุน การสลับโมเดล และขอบันทึกในทุกเครื่องมือ---

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

**สิทธิประโยชน์:**

- คีย์ API หนึ่งคีย์เพื่อจัดการเครื่องมือทั้งหมด
- การติดตามต้นทุนใน CLI ทั้งหมดในแดชบอร์ด
- การสลับโมเดลโดยไม่ต้องกำหนดค่าใหม่ทุกเครื่องมือ
- ทำงานในพื้นที่และบนเซิร์ฟเวอร์ระยะไกล (VPS)---

## Supported Tools (Dashboard Source of Truth)

การ์ดแดชบอร์ดใน `/dashboard/cli-tools` สร้างขึ้นจาก `src/shared/constants/cliTools.ts`
รายการปัจจุบัน (v3.0.0-rc.16):

| เครื่องมือ               | รหัส              | คำสั่ง       | โหมดการตั้งค่า | วิธีการติดตั้ง |
| ------------------------ | ----------------- | ------------ | -------------- | -------------- | -------------------------------------------- |
| **รหัสโคลด**             | `โคลด`            | `โคลด`       | สิ่งแวดล้อม    | เวลา 12.00 น.  |
| **OpenAI Codex**         | `โคเด็กซ์`        | `โคเด็กซ์`   | กำหนดเอง       | เวลา 12.00 น.  |
| **โรงงาน Droid**         | `ดรอยด์`          | `ดรอยด์`     | กำหนดเอง       | รวม/CLI        |
| **OpenClaw**             | `openclaw`        | `openclaw`   | กำหนดเอง       | รวม/CLI        |
| **เคอร์เซอร์**           | `เคอร์เซอร์`      | แอพ          | คู่มือ         | แอปเดสก์ท็อป   |
| **ไคลน์**                | `ไคลน์`           | `ไคลน์`      | กำหนดเอง       | เวลา 12.00 น.  |
| **รหัสกิโล**             | `กิโล`            | `กิโลโค้ด`   | กำหนดเอง       | เวลา 12.00 น.  |
| **ต่อ**                  | `ต่อ`             | นามสกุล      | คู่มือ         | รหัส VS        |
| **ต้านแรงโน้มถ่วง**      | `ต้านแรงโน้มถ่วง` | ภายใน        | มิทม์          | OmniRoute      |
| **โปรแกรมควบคุม GitHub** | `นักบิน`          | นามสกุล      | กำหนดเอง       | รหัส VS        |
| **โอเพนโค้ด**            | `โอเพ่นโค้ด`      | `โอเพ่นโค้ด` | คู่มือ         | เวลา 12.00 น.  |
| **คิโระ ไอ**             | `คิโระ`           | แอพ/cli      | มิทม์          | เดสก์ท็อป/CLI  | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` และ `การตั้งค่า > ลายนิ้วมือ CLI` ใช้ `src/shared/constants/cliCompatProviders.ts`
ซึ่งจะทำให้รหัสผู้ให้บริการสอดคล้องกับการ์ด CLI และรหัสเดิม

| รหัส CLI                                                                                                 | ID ผู้ให้บริการลายนิ้วมือ |
| -------------------------------------------------------------------------------------------------------- | ------------------------- |
| `กิโล`                                                                                                   | `กิโลโค้ด`                |
| `นักบิน`                                                                                                 | `github`                  |
| `claude` / `codex` / `ต้านแรงโน้มถ่วง` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | รหัสเดียวกัน              |

รหัสเดิมยังคงยอมรับความเข้ากันได้: `copilot`, `kimi-coding`, `qwen`---

## Step 1 — Get an OmniRoute API Key

1. เปิดแดชบอร์ด OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. คลิก**สร้างคีย์ API**
3. ตั้งชื่อ (เช่น `cli-tools`) และเลือกสิทธิ์ทั้งหมด
4. คัดลอกคีย์ — คุณจะต้องใช้มันกับทุก CLI ด้านล่าง

> กุญแจของคุณดูเหมือน: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

เครื่องมือที่ใช้ npm ทั้งหมดต้องใช้ Node.js 18+:```bash

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

**ตรวจสอบ:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

เพิ่มใน `~/.bashrc` (หรือ `~/.zshrc`) จากนั้นเรียกใช้ `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> สำหรับ**เซิร์ฟเวอร์ระยะไกล**ให้แทนที่ `localhost:20128` ด้วย IP ของเซิร์ฟเวอร์หรือโดเมน
> เช่น `http://192.168.0.15:20128`.---

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

**ทดสอบ:**`claude "ทักทาย"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**ทดสอบ:**`codex "2+2 คืออะไร?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**ทดสอบ:**`opencode`---

### Cline (CLI or VS Code)

**โหมด CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**โหมด VS Code:**
การตั้งค่าส่วนขยายไคลน์ → ผู้ให้บริการ API: `รองรับ OpenAI` → URL พื้นฐาน: `http://localhost:20128/v1`

หรือใช้แดชบอร์ด OmniRoute →**เครื่องมือ CLI → ไคลน์ → ใช้การกำหนดค่า**---

### KiloCode (CLI or VS Code)

**โหมด CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**การตั้งค่ารหัส VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

หรือใช้แดชบอร์ด OmniRoute →**เครื่องมือ CLI → KiloCode → ใช้การกำหนดค่า**---

### Continue (VS Code Extension)

แก้ไข `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

รีสตาร์ท VS Code หลังจากแก้ไข---

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

> **หมายเหตุ:**เคอร์เซอร์กำหนดเส้นทางคำขอผ่านคลาวด์ สำหรับการบูรณาการ OmniRoute
> เปิดใช้งาน**Cloud Endpoint**ในการตั้งค่า OmniRoute และใช้ URL โดเมนสาธารณะของคุณ

ผ่านทาง GUI:**การตั้งค่า → โมเดล → คีย์ OpenAI API**

- URL หลัก: `https://your-domain.com/v1`
- รหัส API: รหัส OmniRoute ของคุณ---

## Dashboard Auto-Configuration

แดชบอร์ด OmniRoute กำหนดค่าอัตโนมัติสำหรับเครื่องมือส่วนใหญ่:

1. ไปที่ `http://localhost:20128/dashboard/cli-tools`
2. ขยายการ์ดเครื่องมือใดๆ
3. เลือกคีย์ API ของคุณจากเมนูแบบเลื่อนลง
4. คลิก**ใช้การกำหนดค่า**(หากตรวจพบเครื่องมือว่าติดตั้งแล้ว)
5. หรือคัดลอกส่วนย่อยการกำหนดค่าที่สร้างขึ้นด้วยตนเอง---

## Built-in Agents: Droid & OpenClaw

**Droid**และ**OpenClaw**เป็นตัวแทน AI ที่สร้างขึ้นโดยตรงใน OmniRoute โดยไม่จำเป็นต้องติดตั้ง
โดยทำงานเป็นเส้นทางภายในและใช้การกำหนดเส้นทางแบบจำลองของ OmniRoute โดยอัตโนมัติ

- การเข้าถึง: `http://localhost:20128/dashboard/agents`
- กำหนดค่า: คอมโบและผู้ให้บริการเดียวกันกับเครื่องมืออื่นๆ ทั้งหมด
- ไม่จำเป็นต้องติดตั้งคีย์ API หรือ CLI---

## Available API Endpoints

| จุดสิ้นสุด              | คำอธิบาย                         | ใช้สำหรับ                           |
| ----------------------- | -------------------------------- | ----------------------------------- | --- |
| `/v1/แชท/เสร็จสิ้น`     | แชทมาตรฐาน (ผู้ให้บริการทั้งหมด) | เครื่องมือที่ทันสมัยทั้งหมด         |
| `/v1/ตอบกลับ`           | API การตอบกลับ (รูปแบบ OpenAI)   | Codex เวิร์กโฟลว์ตัวแทน             |
| `/v1/เสร็จสิ้น`         | การเติมข้อความแบบเดิม            | เครื่องมือรุ่นเก่าที่ใช้ `พร้อมท์:` |
| `/v1/การฝัง`            | การฝังข้อความ                    | RAG ค้นหา                           |
| `/v1/images/รุ่น`       | การสร้างภาพ                      | DALL-E, Flux ฯลฯ                    |
| `/v1/เสียง/คำพูด`       | ข้อความเป็นคำพูด                 | ElevenLabs, OpenAI TTS              |
| `/v1/เสียง/การถอดเสียง` | พูดเป็นข้อความ                   | Deepgram, AssemblyAI                | --- |

## การแก้ไขปัญหา

| ผิดพลาด                     | สาเหตุ                                     | แก้ไข                                                  |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------ | --- |
| `การเชื่อมต่อถูกปฏิเสธ`     | OmniRoute ไม่ทำงาน                         | `pm2 เริ่มทุกเส้นทาง`                                  |
| `401 ไม่ได้รับอนุญาต`       | รหัส API ผิด                               | เช็คอิน `/dashboard/api-manager`                       |
| `ไม่ได้กำหนดค่าคอมโบ`       | ไม่มีคำสั่งผสมการกำหนดเส้นทางที่ใช้งานอยู่ | ตั้งค่าใน `/dashboard/combos`                          |
| `โมเดลไม่ถูกต้อง`           | รุ่นไม่อยู่ในแค็ตตาล็อก                    | ใช้ `auto` หรือทำเครื่องหมายที่ `/dashboard/providers` |
| CLI แสดงว่า "ไม่ได้ติดตั้ง" | ไบนารีไม่อยู่ใน PATH                       | ตรวจสอบ `ซึ่ง <command>`                               |
| `kiro-cli: ไม่พบ`           | ไม่อยู่ใน PATH                             | `ส่งออก PATH="$HOME/.local/bin:$PATH"`                 | --- |

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
