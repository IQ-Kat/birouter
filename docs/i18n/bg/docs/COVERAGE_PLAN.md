# Test Coverage Plan (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Последна актуализация: 2026-03-28## Baseline

Има няколко номера на покритие в зависимост от начина на изчисляване на отчета. За планиране само един от тях е полезен.

| Метрика                     | Обхват                                                                 | Изявления / редове | Клонове | Функции | Бележки                                              |
| --------------------------- | ---------------------------------------------------------------------- | -----------------: | ------: | ------: | ---------------------------------------------------- |
| Наследство                  | Стар `npm run test:coverage`                                           |             79,42% |  75,15% |  67,94% | Надуто: брои тестовите файлове и изключва `open-sse` |
| Диагностика                 | Само изходен код, с изключение на тестове и с изключение на `open-sse` |             68,16% |  63,55% |  64,06% | Полезно само за изолиране на `src/**`                |
| Препоръчителна базова линия | Само изходен код, с изключение на тестове и включително `open-sse`     |             56,95% |  66,05% |  57,80% | Това е базовата линия за подобряване                 |

Препоръчителната базова линия е числото, спрямо което да се оптимизира.## Rules

- Целите за покритие се отнасят за изходните файлове, а не за `tests/**`.
- `open-sse/**` е част от продукта и трябва да остане в обхвата.
- Новият код не трябва да намалява покритието в засегнатите области.
- Предпочитайте поведението при тестване и резултатите от разклоненията пред подробностите за изпълнението.
- Предпочитайте временни SQLite бази данни и малки модули пред широки макети за `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Порта за покритие на главния източник за комплекта за тестване на единица
  - Генерира `text-summary`, `html`, `json-summary` и `lcov`
- `npm run coverage:report`
  - Подробен отчет файл по файл от последното изпълнение
- `npm изпълнява тест: покритие: наследство`
  - Само историческо сравнение## Milestones

| Фаза   |                     Цел | Фокус                                                           |
| ------ | ----------------------: | --------------------------------------------------------------- |
| Фаза 1 | 60% извлечения / редове | Бързи печалби и покритие с нисък риск                           |
| Фаза 2 | 65% извлечения / редове | БД и основи на трасе                                            |
| Фаза 3 | 70% извлечения / редове | Валидиране на доставчик и анализ на използването                |
| Фаза 4 | 75% извлечения / редове | `open-sse` преводачи и помощници                                |
| Фаза 5 | 80% извлечения / редове | `open-sse` манипулатори и изпълнителни клонове                  |
| Фаза 6 | 85% извлечения / редове | По-трудни крайни случаи, дълг на клонове, пакети за регресия    |
| Фаза 7 | 90% извлечения / редове | Окончателно почистване, затваряне на празнина, строга тресчотка |

Разклоненията и функциите трябва да растат нагоре с всяка фаза, но основната твърда цел са изявленията / редовете.## Priority hotspots

Тези файлове или области предлагат най-добра възвращаемост за следващите фази:

1. `open-sse/обработчици`
   - `chatCore.ts` на 7,57%
   - Обща директория на 29,07%
2. `open-sse/translator/request`
   - Обща директория на 36,39%
   - Много преводачи все още са близо до едноцифрено покритие
3. `open-sse/translator/response`
   - Обща директория на 8,07%
4. `open-sse/изпълнители`
   - Обща директория на 36,62%
5. `src/lib/db`
   - `models.ts` при 20,66%
   - `registeredKeys.ts` на 34,46%
   - `modelComboMappings.ts` на 36,25%
   - `settings.ts` на 46,40%
   - `webhooks.ts` на 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` при 21,12%
   - `usageStats.ts` при 9,56%
   - `costCalculator.ts` при 30,00%
7. `src/lib/providers`
   - `validation.ts` при 41,16%
8. Нискорискови помощни програми и API файлове за ранни печалби
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Коригиране на показателя за покритие, така че да отразява изходния код вместо тестовите файлове
- [x] Съхранявайте наследен скрипт за покритие за сравнение
- [x] Запишете базовата линия и горещите точки в репо
- [ ] Добавяне на фокусирани тестове за помощни програми с нисък риск:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Добавете тестове за маршрути за:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Добавете тестове, поддържани от DB за:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Покрийте поведението на клона в:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Добавете тестове за анализ на употребата за:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Разширете покритието на маршрута за клонове за управление на прокси и настройки### Phase 4: 70% -> 75%

- [ ] Покрийте помощните средства за преводачи и централните пътища за превод:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Добавете тестове на ниво манипулатор за:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Добавете покритие на клона на изпълнителя за специфично за доставчика удостоверяване, повторни опити и замени на крайни точки### Phase 6: 80% -> 85%

- [ ] Обединете повече комплекти крайни случаи в основния път на покритие
- [ ] Увеличаване на функционалното покритие за DB модули със слабо покритие на конструктор/помощник
- [ ] Запълване на пропуски в клонове в `settings.ts`, `registeredKeys.ts`, `validation.ts` и помощници на преводача### Phase 7: 85% -> 90%

- [ ] Третирайте останалите файлове с ниско покритие като блокери
- [ ] Добавяне на регресионни тестове за всеки непокрит производствен бъг, коригиран по време на натискането до 90%
- [ ] Повишете вратата на покритие в CI само след като локалната базова линия е стабилна за поне две последователни изпълнения## Ratchet policy

Актуализирайте праговете за `npm run test:coverage` само след като проектът действително надхвърли следващия етап с удобен буфер.

Препоръчителна последователност на тресчотката:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Редът е `изявления-редове / разклонения / функции`.## Known gap

Текущата команда за покритие измерва основния пакет от единици Node и включва източник, достигнат от него, включително „open-sse“. Все още не обединява покритието на Vitest в един общ отчет. Това сливане си струва да се направи по-късно, но не е блокер за започване на 60% -> 80% изкачване.
