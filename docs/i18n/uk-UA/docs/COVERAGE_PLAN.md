# Test Coverage Plan (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Останнє оновлення: 2026-03-28## Baseline

Існує кілька показників покриття залежно від того, як обчислюється звіт. Для планування корисний тільки один з них.

| Метричний                  | Сфера                                                        | Заяви / Рядки | Відділення | Функції | Примітки                                                  |
| -------------------------- | ------------------------------------------------------------ | ------------: | ---------: | ------: | --------------------------------------------------------- |
| Спадщина                   | Старий `npm run test:coverage`                               |        79,42% |     75,15% |  67,94% | Роздутий: підраховує тестові файли та виключає `open-sse` |
| Діагностичний              | Лише вихідний код, за винятком тестів і `open-sse`           |        68,16% |     63,55% |  64,06% | Корисно лише для ізоляції `src/**`                        |
| Рекомендована базова лінія | Лише вихідний код, за винятком тестів і включаючи `open-sse` |        56,95% |     66,05% |  57,80% | Це базовий рівень для всього проекту для покращення       |

Рекомендована базова лінія – це число, за яким потрібно оптимізувати.## Rules

- Цілі охоплення застосовуються до вихідних файлів, а не до `tests/**`.
- `open-sse/**` є частиною продукту і має залишатися в межах.
- Новий код не повинен зменшувати охоплення в зачеплених областях.
- Надавайте перевагу поведінці тестування та результатам розгалуження над деталями реалізації.
- Надавайте перевагу тимчасовим базам даних SQLite та невеликим фікстурам, ніж широким моделям для `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  — Шлюз покриття основного джерела для набору модульних тестів
  - Генерує `text-summary`, `html`, `json-summary` та `lcov`
- `npm run coverage:report`
  - Детальний звіт по файлах з останнього запуску
- `npm run test:coverage:legacy`
  - Тільки історичне порівняння## Milestones

| Фаза   |             Цільовий | Фокус                                                                  |
| ------ | -------------------: | ---------------------------------------------------------------------- |
| Фаза 1 | 60% виписок / рядків | Швидкі виграші та покриття комунальних послуг із низьким рівнем ризику |
| Фаза 2 | 65% виписок / рядків | БД і основи траси                                                      |
| Фаза 3 | 70% виписок / рядків | Перевірка постачальника та аналітика використання                      |
| Фаза 4 | 75% виписок / рядків | `open-sse` перекладачі та помічники                                    |
| Фаза 5 | 80% виписок / рядків | `open-sse` обробники та гілки виконавця                                |
| Фаза 6 | 85% виписок / рядків | Важкі крайні випадки, заборгованість філій, пакети регресії            |
| Фаза 7 |    90% заяв / рядків | Остаточна розгортка, закриття розриву, сувора тріскачка                |

Гілки та функції мають зростати з кожною фазою, але основною жорсткою ціллю є оператори/рядки.## Priority hotspots

Ці файли або області пропонують найкращу віддачу для наступних етапів:

1. `open-sse/обробники`
   - `chatCore.ts` на 7,57%
   - Загальний каталог на 29,07%
2. `open-sse/translator/request`
   - Загальний каталог на 36,39%
   - Багато перекладачів все ще близькі до однозначного охоплення
3. `open-sse/translator/response`
   - Загальний каталог на 8,07%
4. `open-sse/executors`
   - Загальний каталог на 36,62%
5. `src/lib/db`
   - `models.ts` на 20,66%
   - `registeredKeys.ts` на 34,46%
   - `modelComboMappings.ts` на 36,25%
   - `settings.ts` на 46,40%
   - `webhooks.ts` на 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` на 21,12%
   - `usageStats.ts` на 9,56%
   - `costCalculator.ts` на 30,00%
7. `src/lib/providers`
   - `validation.ts` на 41,16%
8. Утиліта з низьким рівнем ризику та файли API для ранніх прибутків
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Виправлено метрику покриття, щоб вона відображала вихідний код замість тестових файлів
- [x] Зберігайте застарілий сценарій покриття для порівняння
- [x] Запис базової лінії та гарячих точок у сховищі
- [ ] Додайте цілеспрямовані тести для утиліт з низьким рівнем ризику:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Додайте тести маршруту для:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Додати тести з підтримкою БД для:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Висвітлення поведінки гілок у:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Додайте тести аналітики використання для:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Розширення покриття маршрутів для гілок керування проксі-сервером і налаштувань### Phase 4: 70% -> 75%

- [ ] Охоплення помічників перекладачів і центральних шляхів перекладу:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Додати тести на рівні обробника для:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Додано покриття гілок виконавця для автентифікації, повторних спроб і кінцевих точок для постачальника### Phase 6: 80% -> 85%

- [ ] Об’єднайте більше комплектів крайових випадків у основний шлях покриття
- [ ] Збільшення охоплення функцій для модулів БД зі слабким охопленням конструктора/помічника
- [ ] Закрити прогалини в гілках `settings.ts`, `registeredKeys.ts`, `validation.ts` і помічники перекладачів### Phase 7: 85% -> 90%

- [ ] Розглядайте файли з низьким рівнем покриття, що залишилися, як блокувальники
- [ ] Додати регресійні тести для кожної виявленої виробничої помилки, виправленої під час push, до 90%
- [ ] Підвищуйте межу покриття в CI лише після того, як локальна базова лінія буде стабільною протягом принаймні двох послідовних прогонів## Ratchet policy

Оновлюйте порогові значення `npm run test:coverage` тільки після того, як проект фактично перевищить наступну віху зі зручним буфером.

Рекомендована послідовність храпового механізму:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Порядок – це `оператори-рядки / гілки / функції`.## Known gap

Поточна команда покриття вимірює основний набір блоків Node і включає джерело, отримане з нього, включаючи `open-sse`. Він ще не об’єднує покриття Vitest в єдиний звіт. Це злиття варто зробити пізніше, але це не блокувальник для початку підйому 60% -> 80%.
