# API Reference (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

مرجع كامل لجميع نهاية نقاط OmniRoute API.---## Table of Contents

- [إكمالات الدردشة](#إكمالات الدردشة)
- [التضمينات](#التضمينات)
- [ إنشاء الصور ](#image-generation)
- [قائمة التطورات](#list-models)
- [نقاط نهاية التوافق](#نقاط نهاية التوافق)
- [ذاكرة التخزين المؤقتة الدلالية](#ذاكرة التخزين المؤقتة الدلالية)
- [لوحة التحكم والإدارة](#dashboard--management)
- [معالجة الطلب](#request-processing)
- [المصادقة](#المصادقة)---## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| رأس                      |      | الوصف                                        |
| ------------------------ | ---- | -------------------------------------------- |
| `X-OmniRoute-No-Cache`   | طلب  | اضبط على "صحيح" لتجاوز ذاكرة التخزين المؤقتة |
| `X-OmniRoute-Progress`   | طلب  | اضبط على "صحيح" لأحداث التقدم                |
| `معرف الاستماع X`        | طلب  | مفتاح جلسة لوجه الفعل                        |
| `x_session_id`           | طلب  | يتم أيضًا قبول التكيف البيئي (HTTP)          |
| `مفتاح العجز`            | طلب  | مفتاح Dedup (نافذة 5 ثواني)                  |
| `معرف الطلب X`           | طلب  | مفتاح إلغاء الحذف الحذف                      |
| `X-OmniRoute-Cache`      | الرد | `HIT` أو `MISS` (غير متدفق)                  |
| `X-OmniRoute-Idempotent` | الرد | `صحيح` إذا تم إلغاء التكرار                  |
| `X-OmniRoute-Progress`   | الرد | `ممكن تشغيل` في حالة تتبع التقدم             |
| `معرف جلسة X-OmniRoute`  | الرد | الرقم التعريفي الفعال الذي يستخدمه OmniRoute |

> لاحظ Nginx: إذا كنت تعتمد على التكييف الهوائي (على سبيل المثال `x_session_id`)، إلا بتمكين `الشرطات الكهربائية_in_headers on;`.---## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

مقدمو خدمة متاحون: Nebius، وOpenAI، وMistral، وTogether AI، وFireworks، وNVIDIA.```bash

# قائمة بجميع نماذج التضمين

الحصول على /v1/embeddings```

---

## Image Generation

````bash
ما بعد /v1/صور/أجيال
التفويض: حامل مفتاح API الخاص بك
نوع المحتوى: application/json

{
  "نموذج": "openai/dall-e-3"،
  "prompt": "غروب الشمس الجميل فوق الجبال"،
  "الحجم": "1024x1024"
}```

الموفرون المتاحون: OpenAI (DALL-E)، xAI (Grok Image)، Together AI (FLUX)، Fireworks AI.```bash
# List all image models
GET /v1/images/generations
````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Compatibility Endpoints

| الطريقة  | المسار                      | التنسيق               |
| -------- | --------------------------- | --------------------- | -------------------------------- |
| مشاركة   | `/v1/chat/completions`      | أوبن آي               |
| مشاركة   | `/v1/messages`              | انثروبى               |
| مشاركة   | `/v1/الردود`                | ردود OpenAI           |
| مشاركة   | `/v1/embeddings`            | أوبن آي               |
| مشاركة   | `/v1/images/أجيال`          | أوبن آي               |
| احصل على | `/v1/ النماذج`              | أوبن آي               |
| مشاركة   | `/v1/messages/count_tokens` | انثروبى               |
| احصل على | `/v1beta/models`            | الجوزاء               |
| مشاركة   | `/v1beta/models/{...path}`  | الجوزاء توليد المحتوى |
| مشاركة   | `/v1/api/chat`              | أولاما                | ### مسارات الموفر المخصصة```bash |

POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations

````

تتم إضافة المبادئ الأصلية للمنتج الأصلي في حالة اشتعالها. الاستعلام عن الارتباطات غير المتطابقة "400".---## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
````

المثال النموذجي:`json
{
  "ذاكرة التخزين المؤقت الدلالية": {
    "حجم الذاكرة": 42،
    "memoryMaxSize": 500،
    "حجم ديسيبل": 128،
    "معدل الإصابة": 0.65
  },
  "العجز": {
    "المفاتيح النشطة": 3،
    "windows": 5000
  }
}`

---

## Dashboard & Management

### Authentication

| نقطة النهاية                  | الطريقة        | الوصف                    |
| ----------------------------- | -------------- | ------------------------ | ----------------------- |
| `/api/auth/login`             | مشاركة         | تسجيل الدخول             |
| `/api/auth/logout`            | مشاركة         | تسجيل الخروج             |
| `/api/settings/require-login` | الحصول على/وضع | تبديل تسجيل الدخول مطلوب | ### Provider Management |

| نقطة النهاية                 | الطريقة            | الوصف                       |
| ---------------------------- | ------------------ | --------------------------- | --------------- |
| `/api/providers`             | الحصول على/النشر   | قائمة / إنشاء مقدمي الخدمات |
| `/api/providers/[id]`        | الحصول على/وضع/حذف | إدارة مزود                  |
| `/api/providers/[id]/test`   | مشاركة             | اختبار اتصال الموفر         |
| `/api/providers/[id]/models` | احصل على           | قائمة نماذج المزود          |
| `/api/providers/validate`    | مشاركة             | التحقق من صحة تكوين الموفر  |
| `/api/provider-nodes*`       | منوعه              | إدارة عقدة الموفر           |
| `/api/provider-models`       | الحصول على/نشر/حذف | نماذج مخصصة                 | ### OAuth Flows |

| نقطة النهاية                     | الطريقة | الوصف                    |
| -------------------------------- | ------- | ------------------------ | -------------------- |
| `/api/oauth/[provider]/[action]` | متنوع   | OAuth الخاص بموفر الخدمة | ### Routing & Config |

| نقطة النهاية          | الطريقة          | الوصف                             |
| --------------------- | ---------------- | --------------------------------- | --------------------- |
| `/api/models/alias`   | الحصول على/النشر | الأسماء المستعارة للنموذج         |
| `/api/models/catalog` | احصل على         | جميع الموديلات حسب المزود + النوع |
| `/api/combos*`        | متنوع            | إدارة التحرير والسرد              |
| `/api/keys*`          | متنوع            | إدارة مفاتيح API                  |
| `/api/pricing`        | احصل على         | التسعير النموذجي                  | ### Usage & Analytics |

| نقطة النهاية                | الطريقة  | الوصف                 |
| --------------------------- | -------- | --------------------- | ------------ |
| `/api/usage/history`        | احصل على | تاريخ الاستخدام       |
| `/api/usage/logs`           | احصل على | سجلات الاستخدام       |
| `/api/usage/request-logs`   | احصل على | سجلات على مستوى الطلب |
| `/api/usage/[connectionId]` | احصل على | الاستخدام لكل اتصال   | ### Settings |

| نقطة النهاية                    | الطريقة                | الوصف                                           |
| ------------------------------- | ---------------------- | ----------------------------------------------- | -------------- |
| `/api/settings`                 | الحصول على/وضع/التصحيح | الإعدادات العامة                                |
| `/api/settings/proxy`           | الحصول على/وضع         | تكوين وكيل الشبكة                               |
| `/api/settings/proxy/test`      | مشاركة                 | اختبار اتصال الوكيل                             |
| `/api/settings/ip-filter`       | الحصول على/وضع         | القائمة المسموح بها/القائمة المحظورة لعناوين IP |
| `/api/settings/thinking-budget` | الحصول على/وضع         | الميزانية الرمزية المنطقية                      |
| `/api/settings/system-prompt`   | الحصول على/وضع         | موجه النظام العالمي                             | ### Monitoring |

| نقطة النهاية             | الطريقة        | الوصف                                                                                              |
| ------------------------ | -------------- | -------------------------------------------------------------------------------------------------- | -------------------------- |
| `/api/sessions`          | احصل على       | تتبع الجلسة النشطة                                                                                 |
| `/api/rate-limits`       | احصل على       | حدود المعدل لكل حساب                                                                               |
| `/api/monitoring/health` | احصل على       | التحقق من الصحة + ملخص الموفر (`catalogCount`، `configuredCount`، `activeCount`، `monitoredCount`) |
| `/api/cache/stats`       | الحصول على/حذف | إحصائيات ذاكرة التخزين المؤقت / مسح                                                                | ### Backup & Export/Import |

| نقطة النهاية                | الطريقة  | الوصف                                              |
| --------------------------- | -------- | -------------------------------------------------- | -------------- |
| `/api/db-backups`           | احصل على | قائمة النسخ الاحتياطية المتاحة                     |
| `/api/db-backups`           | ضع       | إنشاء نسخة احتياطية يدوية                          |
| `/api/db-backups`           | مشاركة   | استعادة من نسخة احتياطية محددة                     |
| `/api/db-backups/export`    | احصل على | تنزيل قاعدة البيانات كملف .sqlite                  |
| `/api/db-backups/import`    | مشاركة   | قم بتحميل ملف .sqlite لاستبدال قاعدة البيانات      |
| `/api/db-backups/exportAll` | احصل على | قم بتنزيل النسخة الاحتياطية الكاملة كأرشيف .tar.gz | ### Cloud Sync |

| نقطة النهاية           | الطريقة | الوصف                    |
| ---------------------- | ------- | ------------------------ | ----------- |
| `/api/sync/cloud`      | متنوع   | عمليات المزامنة السحابية |
| `/api/sync/initialize` | مشاركة  | تهيئة المزامنة           |
| `/api/cloud/*`         | متنوع   | إدارة السحابة            | ### Tunnels |

| نقطة النهاية               | الطريقة  | الوصف                                                         |
| -------------------------- | -------- | ------------------------------------------------------------- | ------------- |
| `/api/tunnels/cloudflared` | احصل على | اقرأ حالة تثبيت/تشغيل Cloudflare Quick Tunnel للوحة المعلومات |
| `/api/tunnels/cloudflared` | مشاركة   | تمكين أو تعطيل نفق Cloudflare السريع (`الإجراء=تمكين/تعطيل`)  | ### CLI Tools |

| نقطة النهاية                       | الطريقة  | الوصف               |
| ---------------------------------- | -------- | ------------------- |
| `/api/cli-tools/claude-settings`   | احصل على | حالة كلود CLI       |
| `/api/cli-tools/codex-settings`    | احصل على | حالة Codex CLI      |
| `/api/cli-tools/droid-settings`    | احصل على | حالة Droid CLI      |
| `/api/cli-tools/openclaw-settings` | احصل على | حالة OpenClaw CLI   |
| `/api/cli-tools/runtime/[toolId]`  | احصل على | وقت تشغيل CLI العام |

تتضمن استجابات واجهة سطر الأوامر: `تم التثبيت`، و`القابل للتشغيل`، و`الأمر`، و`commandPath`، و`runtimeMode`، و`السبب`.### ACP Agents

| نقطة النهاية      | الطريقة  | الوصف                                                          |
| ----------------- | -------- | -------------------------------------------------------------- |
| `/api/acp/agents` | احصل على | قم بإدراج جميع الوكلاء المكتشفين (المضمنين + المخصصين) بالحالة |
| `/api/acp/agents` | مشاركة   | إضافة وكيل مخصص أو تحديث ذاكرة التخزين المؤقت للكشف            |
| `/api/acp/agents` | حذف      | قم بإزالة وكيل مخصص بواسطة معلمة الاستعلام `id`                |

تتضمن استجابة GET `الوكلاء []` (المعرف، الاسم، الثنائي، الإصدار، المثبت، البروتوكول، isCustom) و`الملخص` (الإجمالي، المثبت، غير موجود، مدمج، مخصص).### Resilience & Rate Limits

| نقطة النهاية            | الطريقة            | الوصف                                |
| ----------------------- | ------------------ | ------------------------------------ | --------- |
| `/api/المرونة`          | الحصول على/التصحيح | الحصول على/تحديث ملفات تعريف المرونة |
| `/api/resilience/reset` | مشاركة             | إعادة ضبط قواطع الدائرة              |
| `/api/rate-limits`      | احصل على           | حالة حد المعدل لكل حساب              |
| `/api/rate-limit`       | احصل على           | تكوين حد المعدل العالمي              | ### Evals |

| نقطة النهاية | الطريقة          | الوصف                                 |
| ------------ | ---------------- | ------------------------------------- | ------------ |
| `/api/evals` | الحصول على/النشر | قائمة مجموعات التقييم / تشغيل التقييم | ### Policies |

| نقطة النهاية    | الطريقة            | الوصف                |
| --------------- | ------------------ | -------------------- | -------------- |
| `/api/policies` | الحصول على/نشر/حذف | إدارة سياسات التوجيه | ### Compliance |

| نقطة النهاية                | الطريقة  | الوصف                        |
| --------------------------- | -------- | ---------------------------- | ------------------------------ |
| `/api/compliance/audit-log` | احصل على | سجل تدقيق الامتثال (آخر رقم) | ### v1beta (Gemini-Compatible) |

| نقطة النهاية               | الطريقة  | الوصف                                |
| -------------------------- | -------- | ------------------------------------ |
| `/v1beta/models`           | احصل على | قائمة النماذج بصيغة الجوزاء          |
| `/v1beta/models/{...path}` | مشاركة   | الجوزاء `توليد المحتوى` نقطة النهاية |

تعكس نقاط النهاية هذه تنسيق Gemini API للعملاء الذين يتوقعون توافق Gemini SDK الأصلي.### Internal / System APIs

| نقطة النهاية    | الطريقة  | الوصف                                              |
| --------------- | -------- | -------------------------------------------------- |
| `/api/init`     | احصل على | فحص تهيئة التطبيق (يستخدم عند التشغيل لأول مرة)    |
| `/api/tags`     | احصل على | علامات النماذج المتوافقة مع Ollama (لعملاء Ollama) |
| `/api/restart`  | مشاركة   | تشغيل إعادة تشغيل الخادم الرشيقة                   |
| `/api/shutdown` | مشاركة   | تشغيل إيقاف تشغيل الخادم بشكل رشيق                 |

> **ملاحظة:**يتم استخدام نقاط النهاية هذه داخليًا بواسطة النظام أو للتوافق مع عميل Ollama. ولا يتم استدعاؤها عادة من قبل المستخدمين النهائيين.---

## Audio Transcription

````bash
POST /v1/audio/transcriptions
التفويض: حامل مفتاح API الخاص بك
نوع المحتوى: بيانات متعددة الأجزاء/النموذج```

قم بنسخ الملفات الصوتية باستخدام Deepgram أو AssemblyAI.

**طلب:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
````

**إجابة:**`json
{
  "text": "مرحبًا، هذا هو المحتوى الصوتي المكتوب.",
  "مهمة": "نسخ"،
  "اللغة": "ar"،
  "المدة": 12.5
}`

**مقدمو الخدمة المدعومين:**`deepgram/nova-3`، `assemblyai/best`.

**الصيغ المدعومة:**`mp3`، `wav`، `m4a`، `flac`، `ogg`، `webm`.---

## Ollama Compatibility

للعملاء الذين يستخدمون تنسيق واجهة برمجة تطبيقات Olma:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

ترجمة الطلبات الأصلية بين التنسيقات التنسيقات الداخلية.---## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**إجابة:**`json
{
  "مقدمو الخدمات": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180، "p95": 620، "p99": 950، "count": 320 }
  }
}`

---

## Budget

````bash
# احصل على حالة الميزانية لجميع مفاتيح API
الحصول على /api/usage/budget

# تعيين أو تحديث الميزانية
POST /api/usage/budget
نوع المحتوى: application/json

{
  "معرف المفتاح": "مفتاح-123"،
  "الحد": 50.00،
  "الفترة": "الشهرية"
}```

---

## Model Availability

```bash
# احصل على توفر النموذج في الوقت الفعلي عبر جميع مقدمي الخدمة
الحصول على /api/models/availability

# التحقق من توفر طراز معين
POST /api/models/availability
نوع المحتوى: application/json

{
  "نموذج": "كلود السوناتة-4-5-20250929"
}```

---

## Request Processing

1. يرسل العميل طلبًا إلى `/v1/*`
2. يستدعي معالج المسار "handleChat"، أو "handleEmbedding"، أو "handleAudioTranscription"، أو "handleImageGeneration".
3. تم حل النموذج (المزود/النموذج المباشر أو الاسم المستعار/السرد)
4. تم تحديد بيانات الاعتماد من قاعدة البيانات المحلية مع تصفية توفر الحساب
5. للدردشة: `handleChatCore` - اكتشاف التنسيق، والترجمة، والتحقق من ذاكرة التخزين المؤقت، والتحقق من الكفاءة
6. يقوم منفذ الموفر بإرسال طلب المنبع
7. تتم ترجمة الاستجابة مرة أخرى إلى تنسيق العميل (الدردشة) أو إعادتها كما هي (التضمينات/الصور/الصوت)
8. تم تسجيل الاستخدام/التسجيل
9. يتم تطبيق الإجراء الاحتياطي على الأخطاء وفقًا لقواعد التحرير والسرد

مرجع البنية الكاملة: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- تستخدم مسارات لوحة المعلومات (`/dashboard/*`) ملف تعريف الارتباط `auth_token`
- يستخدم تسجيل الدخول تجزئة كلمة المرور المحفوظة؛ الرجوع إلى `INITIAL_PASSWORD`
- `requireLogin` قابل للتبديل عبر `/api/settings/require-login`
- تتطلب المسارات `/v1/*` بشكل اختياري مفتاح Bearer API عندما يكون `REQUIRE_API_KEY=true`
````
