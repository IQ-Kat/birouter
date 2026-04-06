# OmniRoute Auto-Combo Engine (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> अनुकूली स्कोरिंग के साथ मॉडल श्रृंखलाओं का स्व-प्रबंधन## How It Works

ऑटो-कॉम्बो इंजन**6-कारक स्कोरिंग फ़ंक्शन**का उपयोग करके प्रत्येक अनुरोध के लिए गतिशील रूप से सर्वश्रेष्ठ प्रदाता/मॉडल का चयन करता है:

| कारक        | वजन  | विवरण                                     |
| :---------- | :--- | :---------------------------------------- | ------------- |
| कोटा        | 0.20 | शेष क्षमता [0..1]                         |
| स्वास्थ्य   | 0.25 | सर्किट ब्रेकर: बंद=1.0, आधा=0.5, खुला=0.0 |
| कॉस्टइन्व   | 0.20 | उलटा लागत (सस्ता = उच्च स्कोर)            |
| लेटेंसीइन्व | 0.15 | व्युत्क्रम p95 विलंबता (तेज़ = अधिक)      |
| टास्कफ़िट   | 0.10 | मॉडल × कार्य प्रकार फिटनेस स्कोर          |
| स्थिरता     | 0.10 | विलंबता/त्रुटियों में कम विचरण            | ## Mode Packs |

| पैक                        | फोकस             | मुख्य वज़न       |
| :------------------------- | :--------------- | :--------------- | --------------- |
| 🚀**जल्दी भेजें**          | गति              | विलंबताInv: 0.35 |
| 💰**लागत बचाने वाला**      | अर्थव्यवस्था     | कॉस्टइन्व: 0.40  |
| 🎯**गुणवत्ता पहले**        | सर्वश्रेष्ठ मॉडल | टास्कफ़िट: 0.40  |
| 📡**ऑफ़लाइन मित्रतापूर्ण** | उपलब्धता         | कोटा: 0.40       | ## Self-Healing |

-**अस्थायी बहिष्करण**: स्कोर <0.2 → 5 मिनट के लिए बाहर रखा गया (प्रगतिशील बैकऑफ़, अधिकतम 30 मिनट) -**सर्किट ब्रेकर जागरूकता**: खुला → स्वतः-बहिष्कृत; HALF_OPEN → जांच अनुरोध -**घटना मोड**: >50% खुला → अन्वेषण अक्षम करें, स्थिरता अधिकतम करें -**कूल्डाउन पुनर्प्राप्ति**: बहिष्करण के बाद, पहला अनुरोध कम समयबाह्य के साथ एक "जांच" है## Bandit Exploration

5% अनुरोध (कॉन्फ़िगर करने योग्य) अन्वेषण के लिए यादृच्छिक प्रदाताओं को भेजे जाते हैं। घटना मोड में अक्षम.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ मॉडलों ने 6 कार्य प्रकारों (`कोडिंग`, `समीक्षा`, `योजना`, `विश्लेषण`, `डीबगिंग`, `दस्तावेज़ीकरण`) में स्कोर किया। वाइल्डकार्ड पैटर्न का समर्थन करता है (उदाहरण के लिए, `*-कोडर` → उच्च कोडिंग स्कोर)।## Files

| फ़ाइल                                        | उद्देश्य                            |
| :------------------------------------------- | :---------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | स्कोरिंग फ़ंक्शन और पूल सामान्यीकरण |
| `open-sse/services/autoCombo/taskFitness.ts` | मॉडल × कार्य फिटनेस लुकअप           |
| `ओपन-एसएसई/सर्विसेज/ऑटोकॉम्बो/इंजन.टीएस`     | चयन तर्क, दस्यु, बजट सीमा           |
| `open-sse/services/autoCombo/selfHealing.ts` | बहिष्करण, जांच, घटना मोड            |
| `ओपन-sse/services/autoCombo/modePacks.ts`    | 4 वज़न प्रोफाइल                     |
| `src/app/api/combos/auto/route.ts`           | बाकी एपीआई                          |
