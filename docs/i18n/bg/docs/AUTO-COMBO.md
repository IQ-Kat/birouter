# OmniRoute Auto-Combo Engine (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Вериги от самоуправляващи се модели с адаптивно оценяване## How It Works

Auto-Combo Engine динамично избира най-добрия доставчик/модел за всяка заявка с помощта на**6-факторна функция за оценяване**:

| Фактор     | Тегло | Описание                                             |
| :--------- | :---- | :--------------------------------------------------- | ------------- |
| Квота      | 0,20  | Оставащ капацитет [0..1]                             |
| Здраве     | 0,25  | Прекъсвач: ЗАТВОРЕНО=1.0, ПОЛОВИНА=0.5, ОТВОРЕНО=0.0 |
| CostInv    | 0,20  | Обратна цена (по-евтино = по-висок резултат)         |
| LatencyInv | 0,15  | Обратна p95 латентност (по-бързо = по-високо)        |
| TaskFit    | 0,10  | Модел × фитнес резултат за тип задача                |
| Стабилност | 0,10  | Ниска вариация в латентността/грешки                 | ## Mode Packs |

| Пакет                           | Фокус           | Ключово тегло    |
| :------------------------------ | :-------------- | :--------------- | --------------- |
| 🚀**Изпращайте бързо**          | Скорост         | latencyInv: 0,35 |
| 💰**Икономия на разходи**       | Икономика       | costInv: 0,40    |
| 🎯**Качеството на първо място** | Най-добър модел | taskFit: 0,40    |
| 📡**Офлайн приятелски**         | Наличност       | квота: 0,40      | ## Self-Healing |

-**Временно изключване**: Резултат < 0,2 → изключено за 5 минути (прогресивно забавяне, максимум 30 минути) -**Информация за прекъсвач**: ОТВОРЕНО → автоматично изключване; HALF_OPEN → заявки за сонда -**Режим на инцидент**: >50% ОТВОРЕНО → дезактивиране на изследването, увеличаване на стабилността -**Възстановяване на охлаждане**: След изключване, първата заявка е "сонда" с намалено време за изчакване## Bandit Exploration

5% от заявките (с възможност за конфигуриране) се насочват към произволни доставчици за проучване. Деактивиран в режим на инцидент.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ модела, отбелязани в 6 типа задачи („кодиране“, „преглед“, „планиране“, „анализ“, „отстраняване на грешки“, „документация“). Поддържа шаблони със заместващи знаци (напр. „\*-кодер“ → висок резултат на кодиране).## Files

| Файл                                         | Цел                                          |
| :------------------------------------------- | :------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Функция за точкуване и нормализиране на пула |
| `open-sse/services/autoCombo/taskFitness.ts` | Модел × търсене на фитнес задача             |
| `open-sse/services/autoCombo/engine.ts`      | Логика на подбора, бандит, бюджетна граница  |
| `open-sse/services/autoCombo/selfHealing.ts` | Изключване, сонди, режим на инцидент         |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 тегловни профила                           |
| `src/app/api/combos/auto/route.ts`           | REST API                                     |
