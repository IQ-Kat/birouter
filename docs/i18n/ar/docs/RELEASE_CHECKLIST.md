# Release Checklist (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

استخدم قائمة التحقق هذه قبل وضع علامة على إصدار OmniRoute الجديد أو نشره.## الإصدار وسجل التغيير

1. قم بتثبيت الإصدار `package.json` (`x.y.z`) في فرع الإصدار.
2. انقل نسخة التعليقات من `## [Unreleased]` في `CHANGELOG.md` إلى قسم المؤرخ:
   - `## [x.y.z] — YYYY-MM-DD`
3. يستخدم بـ `## [Unreleased]` كقسم جديد للعمل القادم القادم.
4. تأكد من أن أحدث قسم في `CHANGELOG.md` يساوي الإصدار `package.json`.## API Docs

5. قم بزيارة "docs/openapi.yaml":
   - يجب أن يكون `info.version` مساويًا لإصدار `package.json`.
6. التحقق من صحة الأمثلة على نقاط نهائية في حالة عدة عقود API.## Runtime Docs

7. قم بمراجعة docs/ARCHITECTURE.md للتخزين/وقت التشغيل.
8. راجع `docs/TROUBLESHOOTING.md` بحثًا عن env var والانجراف التشغيلي.
9. قم بزيارة الموقع بشكل غير المترجم إذا تغيرت مصدر العشب ملحوظة.## الفحص الآلي

يُسمح له بالسيطرة المحلية قبل فتح العلاقات العامة:`bash
التحقق من تشغيل npm:docs-sync`

يقوم CI أيضًا بتشغيل هذا الفحص في `.github/workflows/ci.yml` (مهمة الوبر).
