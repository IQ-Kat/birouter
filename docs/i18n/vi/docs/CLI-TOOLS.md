# CLI Tools Setup Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Hướng dẫn này giải thích cách cài đặt và định cấu hình tất cả các công cụ CLI mã hóa AI được hỗ trợ
để sử dụng**OmniRoute**làm chương trình phụ trợ hợp nhất, cung cấp cho bạn khả năng quản lý khóa tập trung,
theo dõi chi phí, chuyển đổi mô hình và ghi nhật ký yêu cầu trên mọi công cụ.---

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

**Quyền lợi:**

- Một khóa API để quản lý tất cả các công cụ
- Theo dõi chi phí trên tất cả CLI trong bảng điều khiển
- Chuyển đổi mô hình mà không cần cấu hình lại mọi công cụ
- Hoạt động cục bộ và trên các máy chủ từ xa (VPS)---

## Supported Tools (Dashboard Source of Truth)

Các thẻ bảng thông tin trong `/dashboard/cli-tools` được tạo từ `src/shared/constants/cliTools.ts`.
Danh sách hiện tại (v3.0.0-rc.16):

| Công cụ                 | ID               | Lệnh         | Chế độ cài đặt | Phương pháp cài đặt      |
| ----------------------- | ---------------- | ------------ | -------------- | ------------------------ | -------------------------------------------- |
| **Mã Claude**           | `claude`         | `claude`     | env            | npm                      |
| **OpenAI Codex**        | `codex`          | `codex`      | tùy chỉnh      | npm                      |
| **Droid nhà máy**       | `droid`          | `droid`      | tùy chỉnh      | đi kèm/CLI               |
| **OpenClaw**            | `móng vuốt`      | `móng vuốt`  | tùy chỉnh      | đi kèm/CLI               |
| **Con trỏ**             | `con trỏ`        | ứng dụng     | hướng dẫn      | ứng dụng máy tính để bàn |
| **Cline**               | `cline`          | `cline`      | tùy chỉnh      | npm                      |
| **Mã Kilo**             | `kilo`           | `kilocode`   | tùy chỉnh      | npm                      |
| **Tiếp tục**            | `tiếp tục`       | phần mở rộng | hướng dẫn      | Mã VS                    |
| **Phản trọng lực**      | `phản trọng lực` | nội bộ       | mitm           | OmniRoute                |
| **Phi công phụ GitHub** | `Phi công phụ`   | phần mở rộng | tùy chỉnh      | Mã VS                    |
| **Mã mở**               | `mã mở`          | `mã mở`      | hướng dẫn      | npm                      |
| **Kiro AI**             | `kiro`           | ứng dụng/cli | mitm           | máy tính để bàn/CLI      | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` và `Cài đặt > Dấu vân tay CLI` sử dụng `src/shared/constants/cliCompatProviders.ts`.
Điều này giúp ID nhà cung cấp được liên kết với thẻ CLI và ID cũ.

| ID CLI                                                                                                  | ID nhà cung cấp dấu vân tay |
| ------------------------------------------------------------------------------------------------------- | --------------------------- |
| `kilo`                                                                                                  | `kilocode`                  |
| `Phi công phụ`                                                                                          | `github`                    |
| `claude` / `codex` / `phản trọng lực` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | same ID                     |

Các ID cũ vẫn được chấp nhận về khả năng tương thích: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Mở bảng thông tin OmniRoute →**Trình quản lý API**(`/dashboard/api-manager`)
2. Nhấp vào**Tạo khóa API**
3. Đặt tên cho nó (ví dụ: `cli-tools`) và chọn tất cả các quyền
4. Sao chép khóa — bạn sẽ cần nó cho mọi CLI bên dưới

> Chìa khóa của bạn trông giống như: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Tất cả các công cụ dựa trên npm đều yêu cầu Node.js 18+:```bash

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

**Xác minh:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Thêm vào `~/.bashrc` (hoặc `~/.zshrc`), sau đó chạy `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Đối với**máy chủ từ xa**thay thế `localhost:20128` bằng IP hoặc miền máy chủ,
> ví dụ: `http://192.168.0.15:20128`.---

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

**Kiểm tra:**`claude "say hello"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Kiểm tra:**`codex "2+2 là gì?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Kiểm tra:**`mã mở`---

### Cline (CLI or VS Code)

**Chế độ CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Chế độ Mã VS:**
Cài đặt tiện ích mở rộng Cline → Nhà cung cấp API: `Tương thích OpenAI` → URL cơ sở: `http://localhost:20128/v1`

Hoặc sử dụng bảng điều khiển OmniRoute →**Công cụ CLI → Cline → Áp dụng cấu hình**.---

### KiloCode (CLI or VS Code)

**Chế độ CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Cài đặt mã VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Hoặc sử dụng bảng điều khiển OmniRoute →**Công cụ CLI → KiloCode → Áp dụng cấu hình**.---

### Continue (VS Code Extension)

Chỉnh sửa `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Khởi động lại Mã VS sau khi chỉnh sửa.---

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

> **Lưu ý:**Con trỏ định tuyến các yêu cầu thông qua đám mây của nó. Để tích hợp OmniRoute,
> bật**Cloud Endpoint**trong Cài đặt OmniRoute và sử dụng URL miền công cộng của bạn.

Qua GUI:**Cài đặt → Mô hình → Khóa API OpenAI**

- URL cơ sở: `https://your-domain.com/v1`
- Khóa API: khóa OmniRoute của bạn---

## Dashboard Auto-Configuration

Bảng điều khiển OmniRoute tự động cấu hình cho hầu hết các công cụ:

1. Truy cập `http://localhost:20128/dashboard/cli-tools`
2. Mở rộng bất kỳ thẻ công cụ nào
3. Chọn khóa API của bạn từ danh sách thả xuống
4. Nhấp vào**Áp dụng cấu hình**(nếu phát hiện thấy công cụ đã được cài đặt)
5. Hoặc sao chép thủ công đoạn cấu hình được tạo---

## Built-in Agents: Droid & OpenClaw

**Droid**và**OpenClaw**là các tác nhân AI được tích hợp trực tiếp vào OmniRoute — không cần cài đặt.
Chúng chạy dưới dạng các tuyến nội bộ và tự động sử dụng định tuyến mô hình của OmniRoute.

- Truy cập: `http://localhost:20128/dashboard/agents`
- Cấu hình: cùng combo và nhà cung cấp như tất cả các công cụ khác
- Không cần cài đặt khóa API hoặc CLI---

## Available API Endpoints

| Điểm cuối              | Mô tả                                           | Sử dụng cho                         |
| ---------------------- | ----------------------------------------------- | ----------------------------------- | --- |
| `/v1/chat/hoàn thành`  | Trò chuyện tiêu chuẩn (tất cả các nhà cung cấp) | Tất cả các công cụ hiện đại         |
| `/v1/phản hồi`         | API phản hồi (định dạng OpenAI)                 | Codex, quy trình làm việc tác nhân  |
| `/v1/hoàn thành`       | Hoàn thành văn bản kế thừa                      | Các công cụ cũ hơn sử dụng `promp:` |
| `/v1/nhúng`            | Nhúng văn bản                                   | RAG, tìm kiếm                       |
| `/v1/hình ảnh/thế hệ`  | Tạo hình ảnh                                    | DALL-E, Flux, v.v.                  |
| `/v1/âm thanh/lời nói` | Chuyển văn bản thành giọng nói                  | ElevenLabs, OpenAI TTS              |
| `/v1/audio/bản ghi`    | Chuyển giọng nói thành văn bản                  | Deepgram, hộiAI                     | --- |

## Xử lý sự cố

| Lỗi                              | Nguyên nhân                           | Sửa chữa                                            |
| -------------------------------- | ------------------------------------- | --------------------------------------------------- | --- |
| `Kết nối bị từ chối`             | OmniRoute không chạy                  | `pm2 bắt đầu đa tuyến`                              |
| `401 trái phép`                  | Khóa API sai                          | Kiểm tra `/dashboard/api-manager`                   |
| `Không có cấu hình kết hợp`      | Không có kết hợp định tuyến hoạt động | Thiết lập trong `/dashboard/combos`                 |
| `mô hình không hợp lệ`           | Model không có trong danh mục         | Sử dụng `auto` hoặc kiểm tra `/dashboard/providers` |
| CLI hiển thị "chưa được cài đặt" | Nhị phân không có trong PATH          | Kiểm tra ` which <command>`                         |
| `kiro-cli: không tìm thấy`       | Không có trong ĐƯỜNG                  | `export PATH="$HOME/.local/bin:$PATH"`              | --- |

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
