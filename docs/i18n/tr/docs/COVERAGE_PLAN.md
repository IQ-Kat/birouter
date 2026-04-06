# Test Coverage Plan (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Son güncelleme: 2026-03-28## Baseline

Raporun nasıl hesaplandığına bağlı olarak birden fazla kapsam numarası vardır. Planlama için bunlardan yalnızca biri faydalıdır.

| Metrik         | Kapsam                                             | Açıklamalar / Satırlar | Şubeler | İşlevler | Notlar                                                         |
| -------------- | -------------------------------------------------- | ---------------------: | ------: | -------: | -------------------------------------------------------------- |
| Eski           | Eski `npm çalıştırma testi:kapsam`                 |                 %79,42 |  %75,15 |   %67,94 | Şişirilmiş: test dosyalarını sayar ve `open-sse'yi hariç tutar |
| Teşhis         | Yalnızca kaynak, testler hariç ve `open-sse' hariç |                 %68,16 |  %63,55 |   %64,06 | Yalnızca `src/**` öğesini ayırmak için kullanışlıdır           |
| Önerilen temel | Yalnızca kaynak, testler hariç ve `open-sse' dahil |                 %56,95 |  %66,05 |   %57,80 | Bu, proje genelinde iyileştirilecek temel çizgidir             |

Önerilen temel, optimize edilecek sayıdır.## Rules

- Kapsam hedefleri "testler/\*\*" için değil, kaynak dosyalar için geçerlidir.
- `open-sse/**` ürünün bir parçasıdır ve kapsam dahilinde kalmalıdır.
- Yeni kod, dokunulan alanlardaki kapsama alanını azaltmamalıdır.
- Uygulama ayrıntıları yerine test davranışını ve şube sonuçlarını tercih edin.
- 'src/lib/db/\*\*' için geniş modeller yerine geçici SQLite veritabanlarını ve küçük donanımları tercih edin.## Current command set

- `npm çalıştırma testi:kapsam`
  - Birim test paketi için ana kaynak kapsama kapısı
  - 'metin özeti', 'html', 'json-özeti' ve 'lcov'u oluşturur
- `npm çalıştırma kapsamı:rapor`
  - En son çalıştırmanın ayrıntılı dosya bazında raporu
- `npm çalıştırma testi:kapsam:eski'
  - Yalnızca tarihsel karşılaştırma## Milestones

| Aşama   |                    Hedef | Odaklanma                                                  |
| ------- | -----------------------: | ---------------------------------------------------------- |
| Aşama 1 |    %60 beyanlar/satırlar | Hızlı kazançlar ve düşük riskli hizmet kapsamı             |
| Aşama 2 | %65 açıklamalar/satırlar | Veritabanı ve rota temelleri                               |
| Aşama 3 | %70 açıklamalar/satırlar | Sağlayıcı doğrulama ve kullanım analitiği                  |
| Aşama 4 | %75 açıklamalar/satırlar | açık sse çevirmenleri ve yardımcıları                      |
| Aşama 5 |    %80 beyanlar/satırlar | açık sse işleyicileri ve yürütücü dalları                  |
| Aşama 6 |    %85 beyanlar/satırlar | Daha zorlu uç durumlar, şube borçları, regresyon paketleri |
| Aşama 7 | %90 açıklamalar/satırlar | Son süpürme, boşluk kapatma, sıkı mandal                   |

Dallar ve işlevler her aşamada yukarı doğru hareket etmelidir, ancak asıl zor hedef açıklamalar/satırlardır.## Priority hotspots

Bu dosyalar veya alanlar sonraki aşamalar için en iyi getiriyi sunar:

1. 'açık-sse/işleyiciler'
   - 'chatCore.ts' %7,57 seviyesinde
   - Genel dizin %29,07 seviyesinde
2. 'açık-sse/çevirmen/istek'
   - Genel dizin %36,39 seviyesinde
   - Birçok çevirmen hâlâ tek haneli kapsama yakın
3. 'açık-sse/çevirmen/yanıt'
   - Genel dizin %8,07 seviyesinde
4. 'açık-sse/yürütücüler'
   - Genel dizin %36,62 seviyesinde
5. 'kaynak/lib/db'
   - `models.ts` %20,66 seviyesinde
   - `registeredKeys.ts` %34,46 seviyesinde
   - `modelComboMappings.ts` %36,25 seviyesinde
   - `settings.ts` %46,40 seviyesinde
   - `webhooks.ts` %33,33 seviyesinde
6. 'kaynak/lib/kullanım'
   - `usageHistory.ts` %21,12 seviyesinde
   - `usageStats.ts` %9,56 seviyesinde
   - `costCalculator.ts` %30,00'da
7. 'src/lib/providers'
   - `validation.ts` %41,16 seviyesinde
8. Erken kazanımlar için düşük riskli yardımcı program ve API dosyaları
   - `src/shared/utils/upstreamError.ts'
   - 'src/shared/utils/apiAuth.ts'
   - `src/lib/api/errorResponse.ts`
   - 'src/app/api/settings/require-login/route.ts'
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Kapsam metriğini test dosyaları yerine kaynak kodunu yansıtacak şekilde düzeltin
- [x] Karşılaştırma için eski bir kapsam komut dosyasını saklayın
- [x] Taban çizgisini ve sıcak noktaları depoya kaydedin
- [ ] Düşük riskli kamu hizmetleri için odaklanmış testler ekleyin:
  - `src/shared/utils/upstreamError.ts'
  - `src/shared/utils/fetchTimeout.ts'
  - `src/lib/api/errorResponse.ts`
  - 'src/shared/utils/apiAuth.ts'
  - `src/lib/display/names.ts'
- [ ] Aşağıdakiler için rota testleri ekleyin:
  - 'src/app/api/settings/require-login/route.ts'
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Aşağıdakiler için DB destekli testler ekleyin:
  - `src/lib/db/modelComboMappings.ts`
  - 'src/lib/db/settings.ts'
  - `src/lib/db/registeredKeys.ts'
- [ ] Şu konumdaki dallanma davranışını kapsar:
  - 'src/lib/providers/validation.ts'
  - 'src/app/api/v1/embeddings/route.ts'
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Aşağıdakiler için kullanım analizi testleri ekleyin:
  - 'src/lib/usage/usageHistory.ts'
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Proxy yönetimi ve ayar dalları için rota kapsamını genişletin### Phase 4: 70% -> 75%

- [ ] Kapak çevirmen yardımcıları ve merkezi çeviri yolları:
  - 'open-sse/translator/index.ts'
  - `açık-sse/çevirmen/yardımcılar/\*'
  - `open-sse/translator/request/*`
  - `açık-sse/çevirmen/yanıt/\*'### Phase 5: 75% -> 80%

- [ ] Aşağıdakiler için işleyici düzeyinde testler ekleyin:
  - `open-sse/handlers/chatCore.ts'
  - `open-sse/handlers/responsesHandler.js'
  - `open-sse/handlers/imageGeneration.js'
  - `open-sse/handlers/embeddings.js'
- [ ] Sağlayıcıya özel kimlik doğrulama, yeniden denemeler ve uç nokta geçersiz kılmaları için yürütücü şube kapsamı ekleyin### Phase 6: 80% -> 85%

- [ ] Daha fazla uç durum paketini ana kapsama yolunda birleştirin
- [ ] Zayıf kurucu/yardımcı kapsamına sahip DB modülleri için işlev kapsamını artırın
- [ ] "settings.ts", "registeredKeys.ts", "validation.ts" ve çevirmen yardımcılarındaki şube boşluklarını kapatın### Phase 7: 85% -> 90%

- [ ] Kalan düşük kapsamlı dosyaları engelleyici olarak değerlendirin
- [ ] %90'a geçiş sırasında düzeltilen her ortaya çıkan üretim hatası için regresyon testleri ekleyin
- [ ] CI'de kapsama kapısını yalnızca yerel taban çizgisi en az iki ardışık çalıştırma için stabil olduktan sonra yükseltin## Ratchet policy

"npm çalıştırma testi:kapsam" eşiklerini yalnızca proje rahat bir arabellekle bir sonraki kilometre taşını gerçekten aştıktan sonra güncelleyin.

Önerilen cırcır sırası:

1. 55/60/55
2. 60/62/58
3. 65/64/62
   4.70/66/66
   5.75/70/72
   6.80/75/78
4. 85/80/84
5. 90/85/88

Sıra "ifadeler-satırlar / dallar / işlevler"dir.## Known gap

Geçerli kapsama komutu ana Düğüm birimi paketini ölçer ve 'açık-sse' dahil olmak üzere buradan ulaşılan kaynağı içerir. Henüz Vitest kapsamını tek bir birleşik raporda birleştirmemektedir. Bu birleştirme daha sonra yapmaya değer, ancak %60 -> %80 tırmanışın başlamasına engel değil.
