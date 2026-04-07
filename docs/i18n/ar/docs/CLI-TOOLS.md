# CLI Tools Setup Guide — OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

يشرح هذا الدليل كيفية تثبيت وتكوين جميع أدوات CLI البسيطة للذكاء الاصطناعي والمدعم
استخدام**OmniRoute**ك واجهة خلفية موحدة، مما يتيح لك إدارة المفاتيح التركية،
تتبع التكلفة، وتبديل الارتباطات، والتسجيل عبر كل أداة.---## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**الفوائد:**

- مفتاح API واحد لإبتكار جميع الأدوات
- تتبع التكلفة عبر جميع CLIs في لوحة المعلومات
- النموذج النموذجي دون إعادة كل أداة
- يعمل محليا وعلى الموقع البعيد (VPS)---## Supported Tools (Dashboard Source of Truth)

يتم إنشاء بطاقة معلومات اللوحة في `/dashboard/cli-tools` من `src/shared/constants/cliTools.ts`.
القائمة الحالية (v3.0.0-rc.16):

| أداة                  | معرف             | الأمر         | وضع الإعداد | طريقة التثبيت      |
| --------------------- | ---------------- | ------------- | ----------- | ------------------ | ----------------------------------------- |
| **كود كلود**          | "كلود"           | "كلود"        | ببيئة       | نم                 |
| **مخطوطة OpenAI**     | `المخطوطة`       | `المخطوطة`    | مخصص        | نم                 |
| **مصنع الروبوت**      | "الروبوت"        | "الروبوت"     | مخصص        | المجمعة/CLI        |
| **أوبنكلاو**          | `مخلب مفتوح`     | `مخلب مفتوح`  | مخصص        | المجمعة/CLI        |
| **المؤشر**            | `المؤشر`         | التطبيق       | دليل        | تطبيق سطح المكتب   |
| **كلاين**             | `كلاين`          | `كلاين`       | مخصص        | نم                 |
| **كيلو كود**          | `كيلو`           | `الكيلو كود`  | مخصص        | نم                 |
| **تابع**              | `متابعة`         | امتداد        | دليل        | كود مقابل          |
| **مضادة الجاذبية**    | `مضادة الجاذبية` |               | ميتوم       | أومنيروتي          |
| **جيثب مساعد الطيار** | `مساعد الطيار`   | امتداد        | مخصص        | كود مقابل          |
| **الكود مفتوح**       | `الرمز مفتوح`    | `الرمز مفتوح` | دليل        | نم                 |
| **كيرو آي**           | `كيرو`           | التطبيق/كلي   | ميتوم       | سطح المكتب/سطر مود | ### مزامنة بصمة CLI (الوكلاء + الإعدادات) |

استخدم `/dashboard/agents` و`Settings > CLI Fingerprint` src/shared/constants/cliCompatProviders.ts.
يؤدي ذلك إلى تفاصيل البطاقات الموفر المعتمدة ببطاقات CLI والمعارف القديمة.

| معرف واجهة سطر مود                                                                                    | معرف بصمة الإصبع |
| ----------------------------------------------------------------------------------------------------- | ---------------- |
| `كيلو`                                                                                                | `الكيلو كود`     |
| `مساعد الطيار`                                                                                        | `جيثب`           |
| `كلود` / `كوديكس` / `مضاد الجاذبية` / `كيرو` / `المؤشر` / `كلاين` / `opencode` / `droid` / `openclaw` | نفس المعرف       |

لا تزال المعرفات القديمة مقبولة للتوافق: `مساعد الطيار`، `كيمي كودينج`، `كوين`.---## Step 1 — Get an OmniRoute API Key

1. تسجيل الدخول إلى لوحة التحكم OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. انقر**إنشاء مفتاح واجهة برمجة التطبيقات**
3. أعطته اسمًا (على سبيل المثال، "أدوات cli") وتحديد جميع الأذونات
4. انسخ المفتاح — ستحتاج إليه لكل واجهة سطر الأوامر (CLI) أدناه

> يبدو مفتاحك كما يلي: `sk-xxxxxxxxxxxxxxxxxx-xxxxxxxxx`---## Step 2 — Install CLI Tools

تتطلب جميع المستندات المستندة إلى npm Node.js 18+:```bash

# كلود كود (أنثروبي)

تثبيت npm -g @anthropic-ai/claude-code

# مخطوطة OpenAI

تثبيت npm -g @openai/codex

# الكود المفتوح

تثبيت npm -g opencode-ai

# كلاين

تثبيت npm -g cline

# كيلو كود

تثبيت npm -g كيلوكود

# Kiro CLI (أمازون - يتطلب تجعيد + فك الضغط)

apt-get install -y unzip # على Debian/Ubuntu
حليقة -fsSL https://cli.kiro.dev/install | باش
تصدير PATH = "$HOME/.local/bin:$PATH" # إضافة إلى ~/.bashrc```

**يؤكد:**```bash
claude --version # 2.x.x
codex --version # 0.x.x
opencode --version # x.x.x
cline --version # 2.x.x
kilocode --version # x.x.x (or: kilo --version)
kiro-cli --version # 1.x.x

````

---

## Step 3 — Set Global Environment Variables

إضافة إلى `~/.bashrc` (أو `~/.zshrc`)، ثم قم ويسمح `المصدر ~/.bashrc`:```bash
# نقطة النهاية العالمية OmniRoute
تصدير OPENAI_BASE_URL = "http://localhost:20128/v1"
تصدير OPENAI_API_KEY = "sk-your-omniroute-key"
تصدير ANTHROPIC_BASE_URL = "http://localhost:20128/v1"
تصدير ANTHROPIC_API_KEY = "sk-your-omniroute-key"
تصدير GEMINI_BASE_URL = "http://localhost:20128/v1"
تصدير GEMINI_API_KEY = "sk-your-omniroute-key"```

> بالنسبة إلى**الخادم البعيد**، استبدل `localhost:20128` بعنوان IP للخادم أو المجال،
> على سبيل المثال `http://192.168.0.15:20128`.---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# عبر سطر الأوامر:
مجموعة تكوين كلود - عنوان URL لواجهة برمجة التطبيقات العالمية http://localhost:20128/v1

# أو قم بإنشاء ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "مفتاح sk-your-omniroute-"
}
EOF```

**اختبار:**`كلود "قل مرحبا"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
نموذج: السيارات
apiKey: sk-your-omniroute-key
رابط واجهة برمجة التطبيقات: http://localhost:20128/v1
EOF```

**اختبار:**`مخطوطة "ما هو 2+2؟"'---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "مفتاح sk-omniroute"
EOF```

**اختبار:**`الرمز المفتوح`---

### Cline (CLI or VS Code)

**وضع سطر الأوامر:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
````

**وضع رمز VS:**
إعدادات امتداد Cline ← موفر واجهة برمجة التطبيقات: `متوافق مع OpenAI` ← عنوان URL الأساسي: `http://localhost:20128/v1`

استخدام لوحة معلومات OmniRoute →**أدوات CLI → Cline → تطبيق المتاح**.---### KiloCode (CLI or VS Code)

**وضع سطر مود:**`bash
كيلو كود --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key`

**إعدادات رمز VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

استخدام لوحة معلومات OmniRoute →**CLI → KiloCode → تطبيق تفعيل**.---### Continue (VS Code Extension)

تحرير `~/.continue/config.yaml`:```yaml
النماذج:
  - الاسم: OmniRoute
    المزود: openai
    نموذج: السيارات
    واجهة برمجة التطبيقات: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    الافتراضي: صحيح```

أعد تشغيل VS Code بعد التحرير.---

### Kiro CLI (Amazon)

```bash
# قم بتسجيل الدخول إلى حساب AWS/Kiro الخاص بك:
كيرو كلي تسجيل الدخول

# تستخدم واجهة سطر الأوامر (CLI) مصادقة خاصة بها — ليست هناك حاجة إلى OmniRoute كواجهة خلفية لـ Kiro CLI نفسها.
# استخدم kiro-cli بجانب OmniRoute لأدوات أخرى.
حالة كيرو كلي```

---

### Cursor (Desktop App)

>**ملاحظة:**يقوم المؤشر بتوجيه الطلبات عبر السحابة الخاصة به. لتكامل OmniRoute،
> قم بتمكين**Cloud Endpoint**في إعدادات OmniRoute واستخدم عنوان URL للنطاق العام الخاص بك.

عبر واجهة المستخدم الرسومية:**الإعدادات → النماذج → مفتاح OpenAI API**

- عنوان URL الأساسي: `https://your-domain.com/v1`
- مفتاح API: مفتاح OmniRoute الخاص بك---

## Dashboard Auto-Configuration

تقوم لوحة معلومات OmniRoute بأتمتة التكوين لمعظم الأدوات:

1. انتقل إلى `http://localhost:20128/dashboard/cli-tools`
2. قم بتوسيع أي بطاقة أداة
3. حدد مفتاح API الخاص بك من القائمة المنسدلة
4. انقر فوق**تطبيق التكوين**(إذا تم اكتشاف الأداة على أنها مثبتة)
5. أو انسخ مقتطف التكوين الذي تم إنشاؤه يدويًا---

## Built-in Agents: Droid & OpenClaw

**Droid**و**OpenClaw**هما وكيلان للذكاء الاصطناعي مدمجان مباشرة في OmniRoute — لا حاجة للتثبيت.
يتم تشغيلها كمسارات داخلية وتستخدم توجيه نموذج OmniRoute تلقائيًا.

- الوصول: `http://localhost:20128/dashboard/agents`
- التكوين: نفس المجموعات ومقدمي الخدمات مثل جميع الأدوات الأخرى
- لا يلزم تثبيت مفتاح API أو CLI---

## Available API Endpoints

| نقطة النهاية | الوصف | استخدم لـ |
| -------------------------- | ----------------------------- | --------------------------- |
| `/v1/chat/completions` | الدردشة القياسية (جميع مقدمي الخدمة) | جميع الأدوات الحديثة |
| `/v1/الردود` | واجهة برمجة تطبيقات الردود (تنسيق OpenAI) | الدستور الغذائي، سير العمل الوكيل |
| `/v1/الإكمال` | إكمال النص القديم | الأدوات القديمة التي تستخدم `المطالبة:` |
| `/v1/embeddings` | تضمينات النص | راج، بحث |
| `/v1/images/أجيال` | توليد الصور | DALL-E، الجريان، وما إلى ذلك |
| `/v1/audio/speech` | تحويل النص إلى كلام | أحد عشر مختبرًا، OpenAI TTS |
| `/v1/audio/transcriptions` | تحويل الكلام إلى نص | ديبجرام، الجمعية AI |---

## استكشاف الأخطاء

| خطأ | السبب | إصلاح |
| ------------------------- | ----------------------- | ------------------------------------------ |
| `تم رفض الاتصال` | OmniRoute لا يعمل | `pm2 ابدأ في كل الاتجاهات` |
| `401 غير مصرح به' | مفتاح API خاطئ | قم بتسجيل الدخول `/dashboard/api-manager` |
| `لم يتم تكوين التحرير والسرد` | لا يوجد مجموعة توجيه نشطة | تم الإعداد في `/dashboard/combos` |
| `نموذج غير صالح` | الموديل غير موجود في الكتالوج | استخدم "تلقائي" أو حدد "/dashboard/providers" |
| يظهر سطر الأوامر "غير مثبت" | ثنائي ليس في PATH | حدد `أي <command>` |
| `كيرو كلي: غير موجود` | ليس في المسار | `تصدير المسار = "$HOME/.local/bin:$PATH"` |---

## Quick Setup Script (One Command)

```bash
# تثبيت جميع واجهات سطر الأوامر (CLI) وتكوين OmniRoute (استبدلها بمفتاحك وعنوان URL الخاص بالخادم)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

تثبيت npm -g @anthropic-ai/clude-code @openai/codex opencode-ai cline Kilocode

# كيرو كلي
apt-get install -y unzip 2>/dev/null; حليقة -fsSL https://cli.kiro.dev/install | باش

# كتابة التكوينات
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
القط >> ~/.bashrc << EOF
تصدير OPENAI_BASE_URL="$OMNIROUTE_URL"
تصدير OPENAI_API_KEY = "$OMNIROUTE_KEY"
تصدير ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
تصدير ANTHROPIC_API_KEY = "$OMNIROUTE_KEY"
EOF

المصدر ~/.bashrc
صدى " ✅ تم تثبيت جميع واجهات سطر الأوامر (CLI) وتكوينها لـ OmniRoute"```
````
