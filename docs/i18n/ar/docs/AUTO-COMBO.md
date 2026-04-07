# OmniRoute Auto-Combo Engine (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> نماذج النماذج الذاتية الإدارة مع تسجيل التعديلات التكيفية## How It Works

يقوم محرك التحرير والسرد التلقائي باختيار أفضل/نموذج ديناميكي لكل طلب باستخدام**وظيفة تسجيل مكونة من 6 اختيارات**:

| عامل            | الوزن | الوصف                                  |
| :-------------- | :---- | :------------------------------------- | ------------- |
| الحصة           | 0.20  | القدرة المتبقية [0..1]                 |
| الصحة           | 0.25  | الفاصل: مغلق=1.0، نصف=0.5، مفتوح=0.0   |
| تكلفة الاستثمار | 0.20  | التكلفة العكسية (أرخص = الدرجة الأعلى) |
| الكمون          | 0.15  | الكمون العكسي p95 (أسرع = الأعلى)      |
| تاسكفيت         | 0.10  | نموذج × درجة اللياقة البدنية لنوع مهم  |
|                 | 0.10  | متباينة في الوصول إلى زمن/الأخطاء      | ## Mode Packs |

| حزمة                     | التركيز    | الوزن الرئيسي       |
| :----------------------- | :--------- | :------------------ | ---------------- |
| 🚀**الشحن السريع**       | السرعة     | الكمون: 0.35        |
| 💰**توفير التكلفة**      | اقتصاد     | تكلفة التكلفة: 0.40 |
| 🎯**الجودة الجديدة**     | أفضل نموذج | المهمة فيت: 0.40    |
| 📡**غير متصل بالإنترنت** | التوفر     | الحصة: 0.40         | ## الشفاء الذاتي |

-**الاستبعاد المؤقت**: النتيجة < 0.2 ← تم الاستبعاد لمدة 5 صباحا ( التراجع المتقدم، الأقصى 30 دقيقة) -**التوعية بقاطع الدورة**: مفتوح → مدمر التدمير؛ HALF_OPEN → طلبات التحقيق -**وضع الحادث**: >50% متوقع → ثم الاستكشاف المتوقع -**استرداد فترة التهدئة**: بعد الاختفاء، يكون الطلب الأول من "تحقيق" مع مهلة الأقل## Bandit Exploration

يتم توجيه 5% من الطلبات (القابلة للتكوين) إلى موفر خدمات غير آمنة للاستكشاف. معطل في الحادث.## API```bash

# Create auto-combo

curl -X POST http://localhost:20128/api/combos/auto \
 -H "Content-Type: application/json" \
 -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos

curl http://localhost:20128/api/combos/auto

```

## Task Fitness

تم تسجيل أكثر من 30 نموذجًا عبر 6 أنواع من المهام (`الترميز`، و`المراجعة`، و`التخطيط`، و`التحليل`، و`تصحيح سبب`، و`التوثيق`). محترف أحرف البدل (على سبيل المثال، `*-coder` → درجة ترميز عالية).## Files

| ملف | الحصاد |
| :------------------------------------------- | :------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts` | وظيفة الهديف وتطبيع التكيف |
| `open-sse/services/autoCombo/taskFitness.ts` | نموذج × مهمة بحث اللياقة البدنية |
| `open-sse/services/autoCombo/engine.ts` | الاختيار المنطقي، قطاع الطرق، ميزانية الإنفاق |
| `open-sse/services/autoCombo/selfHealing.ts` | الابعاد، التفاصيل، حالة الحادث |
| `open-sse/services/autoCombo/modePacks.ts` | 4 ملفات تعريف للوزن |
| `src/app/api/combos/auto/route.ts` | ريست API |
```
