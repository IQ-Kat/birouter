# Release Checklist (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

किसी नई ओमनीरूट रिलीज़ को टैग करने या प्रकाशित करने से पहले इस चेकलिस्ट का उपयोग करें।## Version and Changelog

1. रिलीज़ शाखा में `package.json` संस्करण (`x.y.z`) को बम्प करें।
2. रिलीज नोट्स को `## [Unreleased]` से `CHANGELOG.md` में दिनांकित अनुभाग में ले जाएं:
   - `## [x.y.z] — YYYY-MM-DD`
3. आगामी कार्य के लिए `## [अप्रकाशित]` को पहले चेंजलॉग अनुभाग के रूप में रखें।
4. सुनिश्चित करें कि `CHANGELOG.md` में नवीनतम सेमेस्टर अनुभाग `package.json` संस्करण के बराबर है।## API Docs

5. अद्यतन `docs/openapi.yaml`:
   - `info.version` को `package.json` संस्करण के बराबर होना चाहिए।
6. यदि एपीआई अनुबंध बदल गए हैं तो समापन बिंदु उदाहरणों को मान्य करें।## Runtime Docs

7. स्टोरेज/रनटाइम ड्रिफ्ट के लिए `docs/ARCHITECTURE.md` की समीक्षा करें।
8. env var और परिचालन बहाव के लिए `docs/TROUBLESHOOTING.md` की समीक्षा करें।
9. यदि स्रोत दस्तावेज़ों में महत्वपूर्ण परिवर्तन हुआ है तो स्थानीयकृत दस्तावेज़ों को अपडेट करें।## Automated Check

पीआर खोलने से पहले सिंक गार्ड को स्थानीय रूप से चलाएँ:```bash
npm run check:docs-sync

```

सीआई इस चेक को `.github/workflows/ci.yml` (लिंट जॉब) में भी चलाता है।
```
