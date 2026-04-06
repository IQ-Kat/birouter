# OmniRoute Auto-Combo Engine (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Самоуправляемые модельные цепочки с адаптивным скорингом## How It Works

Механизм Auto-Combo динамически выбирает лучшего поставщика/модель для каждого запроса, используя**функцию 6-факторной оценки**:

| Фактор       | Вес  | Описание                                                              |
| :----------- | :--- | :-------------------------------------------------------------------- | ------------- |
| Квота        | 0,20 | Остаточная емкость [0..1]                                             |
| Здоровье     | 0,25 | Автоматический выключатель: ЗАКРЫТО=1,0, ПОЛОВИНА=0,5, РАЗОМКНУТО=0,0 |
| СтоимостьИнв | 0,20 | Обратная стоимость (дешевле = более высокий балл)                     |
| ЛатенциИнв   | 0,15 | Обратная задержка p95 (быстрее = выше)                                |
| ТаскФит      | 0,10 | Модель × тип задачи фитнес-оценка                                     |
| Стабильность | 0,10 | Низкая разница в задержках/ошибках                                    | ## Mode Packs |

| Пакет                       | Фокус         | Ключевой вес         |
| :-------------------------- | :------------ | :------------------- | --------------- |
| 🚀**Быстрая доставка**      | Скорость      | латентностьИнв: 0,35 |
| 💰**Экономия**              | Экономика     | стоимостьИнв: 0,40   |
| 🎯**Качество прежде всего** | Лучшая модель | TaskFit: 0,40        |
| 📡**Офлайн-дружественный**  | Наличие       | квота: 0,40          | ## Self-Healing |

-**Временное исключение**: балл < 0,2 → исключение на 5 минут (постепенное отсрочка, максимум 30 минут) -**Опознавание выключателя**: ОТКРЫТО → автоматически исключено; HALF_OPEN → проверять запросы -**Режим инцидента**: >50% ОТКРЫТО → отключить исследование, максимизировать стабильность. -**Восстановление перезарядки**: после исключения первый запрос представляет собой «пробу» с уменьшенным временем ожидания.## Bandit Exploration

5% запросов (настраиваемых) перенаправляются случайным поставщикам для исследования. Отключено в режиме инцидента.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Более 30 моделей, оцененных по 6 типам задач («кодирование», «обзор», «планирование», «анализ», «отладка», «документирование»). Поддерживает шаблоны подстановочных знаков (например, `*-coder` → высокий балл кодирования).## Files

| Файл                                         | Цель                                       |
| :------------------------------------------- | :----------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Функция подсчета очков и нормализация пула |
| `open-sse/services/autoCombo/taskFitness.ts` | Модель × задача фитнес-поиск               |
| `open-sse/services/autoCombo/engine.ts`      | Логика выбора, бандит, ограничение бюджета |
| `open-sse/services/autoCombo/selfHealing.ts` | Исключение, проверки, режим инцидента      |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 весовых профиля                          |
| `src/app/api/combos/auto/route.ts`           | ОТДЫХ API                                  |
