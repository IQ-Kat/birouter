# OmniRoute MCP Server Documentation (हिन्दी (IN))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> 16 इंटेलिजेंट टूल के साथ मॉडल कॉन्टेक्स्ट प्रोटोकॉल सर्वर## स्थापित करें

ओमनीरूट एमसीपी अंतर्निहित है। इसे इससे प्रारंभ करें:```bash
omniroute --mcp

````

या ओपन-एसएसई परिवहन के माध्यम से:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

एंटीग्रेविटी, कर्सर, कोपायलट और क्लाउड डेस्कटॉप सेटअप के लिए [आईडीई कॉन्फ़िगरेशन](एकीकरण/आइडे-कॉन्फ़िग्स.एमडी) देखें।---

## Essential Tools (8)

| उपकरण                           | विवरण                                         |
| :------------------------------ | :-------------------------------------------- | --------------------- |
| `omniroute_get_health`          | गेटवे स्वास्थ्य, सर्किट ब्रेकर, अपटाइम        |
| `omniroute_list_combos`         | मॉडलों के साथ सभी कॉन्फ़िगर किए गए कॉम्बो     |
| `omniroute_get_combo_metrics`   | किसी विशिष्ट कॉम्बो के लिए प्रदर्शन मेट्रिक्स |
| `omniroute_switch_combo`        | सक्रिय कॉम्बो को आईडी/नाम से स्विच करें       |
| `omniroute_check_quota`         | प्रति प्रदाता या सभी कोटा स्थिति              |
| `omniroute_route_request`       | ओम्निरूट के माध्यम से चैट पूर्णता भेजें       |
| `omniroute_cost_report`         | एक समयावधि के लिए लागत विश्लेषण               |
| `omniroute_list_models_catalog` | क्षमताओं के साथ पूर्ण मॉडल सूची               | ## Advanced Tools (8) |

| उपकरण                              | विवरण                                                                             |
| :--------------------------------- | :-------------------------------------------------------------------------------- | ----------------- |
| `omniroute_simulated_route`        | फ़ॉलबैक ट्री के साथ ड्राई-रन रूटिंग सिमुलेशन                                      |
| `omniroute_set_budget_guard`       | गिरावट/ब्लॉक/अलर्ट कार्रवाइयों के साथ सत्र बजट                                    |
| `omniroute_set_resilience_profile` | रूढ़िवादी/संतुलित/आक्रामक प्रीसेट लागू करें                                       |
| `omniroute_test_combo`             | वास्तविक अपस्ट्रीम अनुरोध के माध्यम से कॉम्बो में सभी मॉडलों का लाइव-परीक्षण करें |
| `omniroute_get_provider_metrics`   | एक प्रदाता के लिए विस्तृत मेट्रिक्स                                               |
| `omniroute_best_combo_for_task`    | विकल्पों के साथ कार्य-फिटनेस अनुशंसा                                              |
| `omniroute_explain_route`          | पिछले रूटिंग निर्णय की व्याख्या करें                                              |
| `omniroute_get_session_snapshot`   | पूर्ण सत्र स्थिति: लागत, टोकन, त्रुटियाँ                                          | ## Authentication |

एमसीपी उपकरण एपीआई कुंजी स्कोप के माध्यम से प्रमाणित होते हैं। प्रत्येक उपकरण को विशिष्ट दायरे की आवश्यकता होती है:

| दायरा             | उपकरण                                                  |
| :---------------- | :----------------------------------------------------- | ---------------- |
| `पढ़ें:स्वास्थ्य` | स्वास्थ्य प्राप्त करें, प्रदाता_मेट्रिक्स प्राप्त करें |
| `पढ़ें:कॉम्बोस`   | list_combos, get_combo_metrics                         |
| `लिखें:कॉम्बोस`   | स्विच_कॉम्बो                                           |
| `पढ़ें:कोटा`      | चेक_कोटा                                               |
| `लिखें:मार्ग`     | रूट*अनुरोध, अनुकरण*रूट, टेस्ट_कॉम्बो                   |
| `पढ़ें:उपयोग`     | लागत*रिपोर्ट, प्राप्त*सत्र*स्नैपशॉट, व्याख्या*मार्ग    |
| `लिखें:कॉन्फिग`   | set_budget_guard, set_resilience_profile               |
| `पढ़ें:मॉडल`      | list_models_catalog, best_combo_for_task               | ## Audit Logging |

प्रत्येक टूल कॉल को `mcp_tool_audit` पर लॉग किया जाता है:

- टूल का नाम, तर्क, परिणाम
- अवधि (एमएस), सफलता/असफलता
- एपीआई कुंजी हैश, टाइमस्टैम्प## Files

| फ़ाइल                                             | उद्देश्य                              |
| :------------------------------------------------ | :------------------------------------ |
| `ओपन-एसएसई/एमसीपी-सर्वर/सर्वर.टीएस`               | एमसीपी सर्वर निर्माण + 16 टूल पंजीकरण |
| `ओपन-एसएसई/एमसीपी-सर्वर/ट्रांसपोर्ट.टीएस`         | Stdio + HTTP ट्रांसपोर्ट              |
| `ओपन-एसएसई/एमसीपी-सर्वर/ऑथ.टीएस`                  | एपीआई कुंजी + स्कोप सत्यापन           |
| `ओपन-एसएसई/एमसीपी-सर्वर/ऑडिट.टीएस`                | टूल कॉल ऑडिट लॉगिंग                   |
| `ओपन-एसएसई/एमसीपी-सर्वर/टूल्स/एडवांस्डटूल्स.टीएस` | 8 उन्नत टूल हैंडलर                    |
