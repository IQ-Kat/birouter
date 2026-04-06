# OmniRoute Auto-Combo Engine (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Самокеровані ланцюги моделей з адаптивним скорингом## How It Works

Механізм Auto-Combo динамічно вибирає найкращого постачальника/модель для кожного запиту за допомогою**6-факторної функції підрахунку балів**:

| Фактор       | Вага | Опис                                                           |
| :----------- | :--- | :------------------------------------------------------------- | ------------- |
| Квота        | 0,20 | Залишок потужності [0..1]                                      |
| Здоров'я     | 0,25 | Автоматичний вимикач: ЗАМКНУТ=1,0, НАПОЛОВИНА=0,5, ВІДКРИТ=0,0 |
| CostInv      | 0,20 | Зворотна вартість (дешевше = вищий бал)                        |
| LatencyInv   | 0,15 | Інверсна затримка p95 (швидше = вище)                          |
| TaskFit      | 0,10 | Модель × оцінка відповідності типу завдання                    |
| Стабільність | 0,10 | Низька дисперсія в затримці/помилках                           | ## Mode Packs |

| Пакет                    | Фокус        | Вага ключа       |
| :----------------------- | :----------- | :--------------- | --------------- |
| 🚀**Швидка доставка**    | Швидкість    | latencyInv: 0,35 |
| 💰**Економія**           | Економіка    | costInv: 0,40    |
| 🎯**Якість перш за все** | Краща модель | taskFit: 0,40    |
| 📡**Дружній офлайн**     | Наявність    | квота: 0,40      | ## Self-Healing |

-**Тимчасове виключення**: Оцінка < 0,2 → виключено на 5 хвилин (поступове відставання, макс. 30 хвилин) -**Поінформованість про автоматичний вимикач**: ВІДКРИТО → автоматично виключено; HALF_OPEN → перевірити запити -**Режим інцидентів**: >50% ВІДКРИТО → вимкнути дослідження, збільшити стабільність -**Відновлення часу відновлення**: після виключення перший запит є «зондом» зі скороченим часом очікування## Bandit Exploration

5% запитів (може налаштувати) направляються до випадкових постачальників для дослідження. Вимкнено в режимі інциденту.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ моделей, оцінених за 6 типами завдань ("кодування", "перегляд", "планування", "аналіз", "налагодження", "документація"). Підтримує шаблони підстановки (наприклад, `*-coder` → висока оцінка кодування).## Files

| Файл                                         | Призначення                              |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Функція скорингу та нормалізація пулу    |
| `open-sse/services/autoCombo/taskFitness.ts` | Модель × пошук придатності завдання      |
| `open-sse/services/autoCombo/engine.ts`      | Логіка вибору, бандит, обмеження бюджету |
| `open-sse/services/autoCombo/selfHealing.ts` | Виключення, зонди, режим інциденту       |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 вагові профілі                         |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
