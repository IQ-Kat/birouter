# Release Checklist (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Yeni bir OmniRoute sürümünü etiketlemeden veya yayınlamadan önce bu kontrol listesini kullanın.## Version and Changelog

1. Yayın dalında 'package.json' sürümünü ('x.y.z') artırın.
2. Sürüm notlarını `CHANGELOG.md`deki `## [Unreleased]` bölümünden tarihli bir bölüme taşıyın:
   - `## [x.y.z] — YYYY-AA-GG`
3. Gelecek çalışmalar için ilk değişiklik günlüğü bölümü olarak `## [Yayınlanmamış]'ı saklayın.
4. `CHANGELOG.md`deki en son sürüm bölümünün `package.json` sürümüne eşit olduğundan emin olun.## API Docs

5. 'docs/openapi.yaml'ı güncelleyin:
   - "info.version", "package.json" sürümüne eşit olmalıdır.
6. API sözleşmeleri değiştiyse uç nokta örneklerini doğrulayın.## Runtime Docs

7. Depolama/çalışma zamanı sapması için 'docs/ARCHITECTURE.md' dosyasını inceleyin.
8. Env değişkeni ve operasyonel sapma için 'docs/TROUBLESHOOTING.md' dosyasını inceleyin.
9. Kaynak belgeler önemli ölçüde değiştiyse yerelleştirilmiş belgeleri güncelleyin.## Automated Check

PR'yi açmadan önce senkronizasyon korumasını yerel olarak çalıştırın:```bash
npm run check:docs-sync

```

CI ayrıca bu kontrolü ".github/workflows/ci.yml" (lint job) dosyasında da çalıştırır.
```
