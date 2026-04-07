# OmniRoute Architecture (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ARCHITECTURE.md) · 🇪🇸 [es](../../es/docs/ARCHITECTURE.md) · 🇫🇷 [fr](../../fr/docs/ARCHITECTURE.md) · 🇩🇪 [de](../../de/docs/ARCHITECTURE.md) · 🇮🇹 [it](../../it/docs/ARCHITECTURE.md) · 🇷🇺 [ru](../../ru/docs/ARCHITECTURE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ARCHITECTURE.md) · 🇯🇵 [ja](../../ja/docs/ARCHITECTURE.md) · 🇰🇷 [ko](../../ko/docs/ARCHITECTURE.md) · 🇸🇦 [ar](../../ar/docs/ARCHITECTURE.md) · 🇮🇳 [hi](../../hi/docs/ARCHITECTURE.md) · 🇮🇳 [in](../../in/docs/ARCHITECTURE.md) · 🇹🇭 [th](../../th/docs/ARCHITECTURE.md) · 🇻🇳 [vi](../../vi/docs/ARCHITECTURE.md) · 🇮🇩 [id](../../id/docs/ARCHITECTURE.md) · 🇲🇾 [ms](../../ms/docs/ARCHITECTURE.md) · 🇳🇱 [nl](../../nl/docs/ARCHITECTURE.md) · 🇵🇱 [pl](../../pl/docs/ARCHITECTURE.md) · 🇸🇪 [sv](../../sv/docs/ARCHITECTURE.md) · 🇳🇴 [no](../../no/docs/ARCHITECTURE.md) · 🇩🇰 [da](../../da/docs/ARCHITECTURE.md) · 🇫🇮 [fi](../../fi/docs/ARCHITECTURE.md) · 🇵🇹 [pt](../../pt/docs/ARCHITECTURE.md) · 🇷🇴 [ro](../../ro/docs/ARCHITECTURE.md) · 🇭🇺 [hu](../../hu/docs/ARCHITECTURE.md) · 🇧🇬 [bg](../../bg/docs/ARCHITECTURE.md) · 🇸🇰 [sk](../../sk/docs/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ARCHITECTURE.md) · 🇮🇱 [he](../../he/docs/ARCHITECTURE.md) · 🇵🇭 [phi](../../phi/docs/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ARCHITECTURE.md) · 🇨🇿 [cs](../../cs/docs/ARCHITECTURE.md) · 🇹🇷 [tr](../../tr/docs/ARCHITECTURE.md)

---

_अंतिम अद्यतन: 2026-03-28_## Executive Summary

ओमनीरूट एक स्थानीय एआई रूटिंग गेटवे और नेक्स्ट.जेएस पर निर्मित डैशबोर्ड है।
यह एक एकल ओपनएआई-संगत एंडपॉइंट (`/v1/*`) प्रदान करता है और अनुवाद, फ़ॉलबैक, टोकन रिफ्रेश और उपयोग ट्रैकिंग के साथ कई अपस्ट्रीम प्रदाताओं के बीच ट्रैफ़िक को रूट करता है।

मुख्य क्षमताएं:

- सीएलआई/टूल्स के लिए ओपनएआई-संगत एपीआई सतह (28 प्रदाता)
- प्रदाता प्रारूपों में अनुरोध/प्रतिक्रिया अनुवाद
- मॉडल कॉम्बो फ़ॉलबैक (मल्टी-मॉडल अनुक्रम)
- खाता-स्तरीय फ़ॉलबैक (प्रति प्रदाता बहु-खाता)
- OAuth + एपीआई-कुंजी प्रदाता कनेक्शन प्रबंधन
- `/v1/embeddings` के माध्यम से एम्बेडिंग पीढ़ी (6 प्रदाता, 9 मॉडल)
- `/v1/images/पीढ़ी` के माध्यम से छवि निर्माण (4 प्रदाता, 9 मॉडल)
- तर्क मॉडल के लिए थिंक टैग पार्सिंग (`<थिंक>...</थिंक>`) सोचें
- सख्त ओपनएआई एसडीके संगतता के लिए प्रतिक्रिया स्वच्छता
- क्रॉस-प्रदाता अनुकूलता के लिए भूमिका सामान्यीकरण (डेवलपर→सिस्टम, सिस्टम→उपयोगकर्ता)।
- संरचित आउटपुट रूपांतरण (json_schema → जेमिनी रिस्पॉन्सस्कीमा)
- प्रदाताओं, चाबियाँ, उपनाम, कॉम्बो, सेटिंग्स, मूल्य निर्धारण के लिए स्थानीय दृढ़ता
- उपयोग/लागत ट्रैकिंग और अनुरोध लॉगिंग
- मल्टी-डिवाइस/स्टेट सिंक के लिए वैकल्पिक क्लाउड सिंक
- एपीआई एक्सेस नियंत्रण के लिए आईपी अनुमति सूची/ब्लॉकलिस्ट
- सोच बजट प्रबंधन (पासथ्रू/ऑटो/कस्टम/अनुकूली)
- वैश्विक प्रणाली शीघ्र इंजेक्शन
- सत्र ट्रैकिंग और फ़िंगरप्रिंटिंग
- प्रदाता-विशिष्ट प्रोफाइल के साथ प्रति-खाता बढ़ी हुई दर सीमित करना
- प्रदाता लचीलेपन के लिए सर्किट ब्रेकर पैटर्न
- म्यूटेक्स लॉकिंग के साथ एंटी-थंडरिंग झुंड सुरक्षा
- हस्ताक्षर-आधारित अनुरोध डिडुप्लीकेशन कैश
- डोमेन परत: मॉडल उपलब्धता, लागत नियम, फ़ॉलबैक नीति, लॉकआउट नीति
- डोमेन स्थिति दृढ़ता (फ़ॉलबैक, बजट, लॉकआउट, सर्किट ब्रेकर के लिए SQLite राइट-थ्रू कैश)
- केंद्रीकृत अनुरोध मूल्यांकन के लिए नीति इंजन (लॉकआउट → बजट → फ़ॉलबैक)
- p50/p95/p99 विलंबता एकत्रीकरण के साथ टेलीमेट्री का अनुरोध करें
- एंड-टू-एंड ट्रेसिंग के लिए सहसंबंध आईडी (एक्स-रिक्वेस्ट-आईडी)।
- एपीआई कुंजी के अनुसार ऑप्ट-आउट के साथ अनुपालन ऑडिट लॉगिंग
- एलएलएम गुणवत्ता आश्वासन के लिए इवल फ्रेमवर्क
- वास्तविक समय सर्किट ब्रेकर स्थिति के साथ लचीलापन यूआई डैशबोर्ड
- मॉड्यूलर OAuth प्रदाता (`src/lib/oauth/providers/` के अंतर्गत 12 व्यक्तिगत मॉड्यूल)

प्राथमिक रनटाइम मॉडल:

- `src/app/api/*` के अंतर्गत Next.js ऐप रूट डैशबोर्ड एपीआई और संगतता एपीआई दोनों को लागू करते हैं
- `src/sse/*` + `open-sse/*` में एक साझा SSE/रूटिंग कोर प्रदाता निष्पादन, अनुवाद, स्ट्रीमिंग, फ़ॉलबैक और उपयोग को संभालता है## Scope and Boundaries

### In Scope

- स्थानीय गेटवे रनटाइम
- डैशबोर्ड प्रबंधन एपीआई
- प्रदाता प्रमाणीकरण और टोकन ताज़ा करें
- अनुवाद और एसएसई स्ट्रीमिंग का अनुरोध करें
- स्थानीय स्थिति + उपयोग की दृढ़ता
- वैकल्पिक क्लाउड सिंक ऑर्केस्ट्रेशन### Out of Scope

- `NEXT_PUBLIC_CLOUD_URL` के पीछे क्लाउड सेवा कार्यान्वयन
- स्थानीय प्रक्रिया के बाहर प्रदाता एसएलए/नियंत्रण विमान
- बाहरी सीएलआई बायनेरिज़ स्वयं (क्लाउड सीएलआई, कोडेक्स सीएलआई, आदि)## Dashboard Surface (Current)

`src/app/(डैशबोर्ड)/डैशबोर्ड/` के अंतर्गत मुख्य पृष्ठ:

- `/डैशबोर्ड` - त्वरित शुरुआत + प्रदाता अवलोकन
- `/डैशबोर्ड/एंडपॉइंट` - एंडपॉइंट प्रॉक्सी + एमसीपी + ए2ए + एपीआई एंडपॉइंट टैब
- `/डैशबोर्ड/प्रदाता` - प्रदाता कनेक्शन और क्रेडेंशियल
- `/डैशबोर्ड/कॉम्बोस` - कॉम्बो रणनीतियाँ, टेम्पलेट, मॉडल रूटिंग नियम
- `/डैशबोर्ड/लागत` - लागत एकत्रीकरण और मूल्य निर्धारण दृश्यता
- `/डैशबोर्ड/एनालिटिक्स` - उपयोग विश्लेषण और मूल्यांकन
- `/डैशबोर्ड/सीमाएँ` - कोटा/दर नियंत्रण
- `/डैशबोर्ड/क्ली-टूल्स` - सीएलआई ऑनबोर्डिंग, रनटाइम डिटेक्शन, कॉन्फिग जेनरेशन
- `/डैशबोर्ड/एजेंट` - पता चला एसीपी एजेंट + कस्टम एजेंट पंजीकरण
- `/डैशबोर्ड/मीडिया` - छवि/वीडियो/संगीत खेल का मैदान
- `/डैशबोर्ड/सर्च-टूल्स` - खोज प्रदाता परीक्षण और इतिहास
- `/डैशबोर्ड/स्वास्थ्य` - अपटाइम, सर्किट ब्रेकर, दर सीमा
- `/डैशबोर्ड/लॉग्स` - अनुरोध/प्रॉक्सी/ऑडिट/कंसोल लॉग
- `/डैशबोर्ड/सेटिंग्स` - सिस्टम सेटिंग्स टैब (सामान्य, रूटिंग, कॉम्बो डिफ़ॉल्ट, आदि)
- `/डैशबोर्ड/एपीआई-मैनेजर` - एपीआई कुंजी जीवनचक्र और मॉडल अनुमतियाँ## High-Level System Context

```mermaid
flowchart LR
    subgraph Clients[Developer Clients]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[Custom OpenAI-compatible clients]
        BROWSER[Browser Dashboard]
    end

    subgraph Router[OmniRoute Local Process]
        API[V1 Compatibility API\n/v1/*]
        DASH[Dashboard + Management API\n/api/*]
        CORE[SSE + Translation Core\nopen-sse + src/sse]
        DB[(storage.sqlite)]
        UDB[(usage tables + log artifacts)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/Qoder/GitHub/Kiro/Cursor/Antigravity]
        P2[API Key Providers\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[Compatible Nodes\nOpenAI-compatible / Anthropic-compatible]
    end

    subgraph Cloud[Optional Cloud Sync]
        CLOUD[Cloud Sync Endpoint\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## Core Runtime Components

## 1) API and Routing Layer (Next.js App Routes)

मुख्य निर्देशिकाएँ:

- अनुकूलता एपीआई के लिए `src/app/api/v1/*` और `src/app/api/v1beta/*`
- प्रबंधन/कॉन्फ़िगरेशन एपीआई के लिए `src/app/api/*`
- अगला `next.config.mjs` मैप `/v1/*` से `/api/v1/*` में फिर से लिखता है

महत्वपूर्ण अनुकूलता मार्ग:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` - इसमें `कस्टम: ट्रू` के साथ कस्टम मॉडल शामिल हैं
- `src/app/api/v1/embeddings/route.ts` - एम्बेडिंग जेनरेशन (6 प्रदाता)
- `src/app/api/v1/images/जेनरेशन/रूट.ts` - छवि निर्माण (एंटीग्रेविटी/नेबियस सहित 4+ प्रदाता)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` - प्रति-प्रदाता समर्पित चैट
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` - प्रति-प्रदाता समर्पित एम्बेडिंग
- `src/app/api/v1/providers/[provider]/images/nations/route.ts` - प्रति-प्रदाता समर्पित छवियां
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

प्रबंधन डोमेन:

- प्रामाणिक/सेटिंग्स: `src/app/api/auth/*`, `src/app/api/settings/*`
- प्रदाता/कनेक्शन: `src/app/api/प्रदाता*`
- प्रदाता नोड्स: `src/app/api/provider-nodes*`
- कस्टम मॉडल: `src/app/api/provider-models` (प्राप्त करें/पोस्ट करें/हटाएं)
- मॉडल कैटलॉग: `src/app/api/models/route.ts` (GET)
- प्रॉक्सी कॉन्फ़िगरेशन: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- कुंजी/उपनाम/कॉम्बोस/मूल्य निर्धारण: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- उपयोग: `src/app/api/usage/*`
- सिंक/क्लाउड: `src/app/api/sync/*`, `src/app/api/cloud/*`
- सीएलआई टूलींग सहायक: `src/app/api/cli-tools/*`
- आईपी फ़िल्टर: `src/app/api/settings/ip-filter` (प्राप्त/पुट)
- सोच बजट: `src/app/api/settings/thinking-budget` (प्राप्त/पुट)
- सिस्टम प्रॉम्प्ट: `src/app/api/settings/system-prompt` (GET/PUT)
- सत्र: `src/app/api/sessions` (प्राप्त करें)
- दर सीमा: `src/app/api/दर-सीमा` (प्राप्त करें)
- लचीलापन: `src/app/api/resilience` (GET/PATCH) - प्रदाता प्रोफाइल, सर्किट ब्रेकर, दर सीमा स्थिति
- लचीलापन रीसेट: `src/app/api/resilience/reset` (POST) - रीसेट ब्रेकर + कूलडाउन
- कैश आँकड़े: `src/app/api/cache/stats` (प्राप्त करें/हटाएँ)
- मॉडल उपलब्धता: `src/app/api/मॉडल/उपलब्धता` (प्राप्त करें/पोस्ट करें)
- टेलीमेट्री: `src/app/api/टेलीमेट्री/सारांश` (प्राप्त करें)
- बजट: `src/app/api/usage/budget` (प्राप्त करें/पोस्ट करें)
- फ़ॉलबैक चेन: `src/app/api/फ़ॉलबैक/चेन` (प्राप्त करें/पोस्ट करें/हटाएं)
- अनुपालन ऑडिट: `src/app/api/compliance/audit-log` (GET)
- इवल्स: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- नीतियां: `src/app/api/policies` (प्राप्त करें/पोस्ट करें)## 2) SSE + Translation Core

मुख्य प्रवाह मॉड्यूल:

- प्रविष्टि: `src/sse/handlers/chat.ts`
- कोर ऑर्केस्ट्रेशन: `open-sse/handlers/chatCore.ts`
- प्रदाता निष्पादन एडाप्टर: `ओपन-एसएसई/निष्पादक/*`
- प्रारूप पहचान/प्रदाता कॉन्फिगरेशन: `open-sse/services/provider.ts`
- मॉडल पार्स/रिज़ॉल्यूशन: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- खाता फ़ॉलबैक तर्क: `open-sse/services/accountFallback.ts`
- अनुवाद रजिस्ट्री: `open-sse/translator/index.ts`
- स्ट्रीम परिवर्तन: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- उपयोग निष्कर्षण/सामान्यीकरण: `open-sse/utils/usageTracking.ts`
- टैग पार्सर सोचें: `open-sse/utils/thinkTagParser.ts`
- एंबेडिंग हैंडलर: `open-sse/handlers/embeddings.ts`
- एंबेडिंग प्रदाता रजिस्ट्री: `open-sse/config/embeddingRegistry.ts`
- छवि निर्माण हैंडलर: `open-sse/handlers/imageGeneration.ts`
- छवि प्रदाता रजिस्ट्री: `open-sse/config/imageRegistry.ts`
- रिस्पॉन्स सेनिटाइजेशन: `ओपन-एसएसई/हैंडलर्स/रिस्पांससैनिटाइजर.टीएस`
- भूमिका सामान्यीकरण: `open-sse/services/roleNormalizer.ts`

सेवाएँ (व्यावसायिक तर्क):

- खाता चयन/स्कोरिंग: `open-sse/services/accountSelector.ts`
- संदर्भ जीवनचक्र प्रबंधन: `open-sse/services/contextManager.ts`
- आईपी फ़िल्टर प्रवर्तन: `open-sse/services/ipFilter.ts`
- सत्र ट्रैकिंग: `open-sse/services/sessionManager.ts`
- डुप्लिकेशन अनुरोध: `open-sse/services/signatureCache.ts`
- सिस्टम प्रॉम्प्ट इंजेक्शन: `open-sse/services/systemPrompt.ts`
- सोच बजट प्रबंधन: `open-sse/services/thinkingBudget.ts`
- वाइल्डकार्ड मॉडल रूटिंग: `open-sse/services/wildcardRouter.ts`
- दर सीमा प्रबंधन: `open-sse/services/rateLimitManager.ts`
- सर्किट ब्रेकर: `open-sse/services/circuitBreaker.ts`

डोमेन परत मॉड्यूल:

- मॉडल उपलब्धता: `src/lib/domain/modelAvailability.ts`
- लागत नियम/बजट: `src/lib/domain/costRules.ts`
- फ़ॉलबैक नीति: `src/lib/domain/fallbackPolicy.ts`
- कॉम्बो रिज़ॉल्वर: `src/lib/domain/comboResolver.ts`
- लॉकआउट नीति: `src/lib/domain/lockoutPolicy.ts`
- नीति इंजन: `src/domain/policyEngine.ts` - केंद्रीकृत लॉकआउट → बजट → फ़ॉलबैक मूल्यांकन
- त्रुटि कोड कैटलॉग: `src/lib/domain/errorCodes.ts`
- अनुरोध आईडी: `src/lib/domain/requestId.ts`
- फ़ेच टाइमआउट: `src/lib/domain/fetchTimeout.ts`
- अनुरोध टेलीमेट्री: `src/lib/domain/requestTelemetry.ts`
- अनुपालन/ऑडिट: `src/lib/domain/compliance/index.ts`
- इवल रनर: `src/lib/domain/evalRunner.ts`
- डोमेन स्थिति दृढ़ता: `src/lib/db/domainState.ts` - फ़ॉलबैक चेन, बजट, लागत इतिहास, लॉकआउट स्थिति, सर्किट ब्रेकर के लिए SQLite CRUD

OAuth प्रदाता मॉड्यूल (`src/lib/oauth/providers/` के अंतर्गत 12 व्यक्तिगत फ़ाइलें):

- रजिस्ट्री सूचकांक: `src/lib/oauth/providers/index.ts`
- व्यक्तिगत प्रदाता: `claude.ts`, `codex.ts`, `gemini.ts`, `antigravity.ts`, `qoder.ts`, `qwen.ts`, `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- पतला आवरण: `src/lib/oauth/providers.ts` - अलग-अलग मॉड्यूल से पुनः निर्यात## 3) Persistence Layer

प्राथमिक अवस्था DB (SQLite):

- कोर इन्फ्रा: `src/lib/db/core.ts` (बेहतर-sqlite3, माइग्रेशन, वाल)
- पुनः निर्यात पहलू: `src/lib/localDb.ts` (कॉलर्स के लिए पतली अनुकूलता परत)
- फ़ाइल: `${DATA_DIR}/storage.sqlite` (या `$XDG_CONFIG_HOME/omniroute/storage.sqlite` सेट होने पर, अन्यथा `~/.omniroute/storage.sqlite`)
- इकाइयां (टेबल + केवी नेमस्पेस): प्रोवाइडरकनेक्शन्स, प्रोवाइडरनोड्स, मॉडलएलियासेस, कॉम्बो, एपीआईकीज़, सेटिंग्स, मूल्य निर्धारण,**कस्टममॉडल**,**प्रॉक्सीकॉन्फिग**,**आईपीफिल्टर**,**थिंकिंगबजट**,**सिस्टमप्रॉम्प्ट**

उपयोग दृढ़ता:

- मुखौटा: `src/lib/usageDb.ts` (`src/lib/usage/*` में विघटित मॉड्यूल)
- `storage.sqlite` में SQLite तालिकाएँ: `usage_history`, `call_logs`, `proxy_logs`
- optional file artifacts remain for compatibility/debug (`${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`, `<repo>/logs/...`)
- मौजूद होने पर लीगेसी JSON फ़ाइलें स्टार्टअप माइग्रेशन द्वारा SQLite में माइग्रेट की जाती हैं

डोमेन स्थिति DB (SQLite):

- `src/lib/db/domainState.ts` - डोमेन स्थिति के लिए CRUD संचालन
- टेबल्स (`src/lib/db/core.ts` में निर्मित): `domain_fallback_चेन्स`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circuit_breakers`
- राइट-थ्रू कैश पैटर्न: इन-मेमोरी मैप्स रनटाइम पर आधिकारिक होते हैं; उत्परिवर्तन SQLite के साथ समकालिक रूप से लिखे जाते हैं; कोल्ड स्टार्ट पर राज्य को डीबी से बहाल किया जाता है## 4) Auth + Security Surfaces

- Dashboard cookie auth: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- एपीआई कुंजी निर्माण/सत्यापन: `src/shared/utils/apiKey.ts`
- प्रदाता रहस्य `providerConnections` प्रविष्टियों में बने रहे
- `open-sse/utils/proxyFetch.ts` (env vars) और `open-sse/utils/networkProxy.ts` (प्रति-प्रदाता या वैश्विक रूप से कॉन्फ़िगर करने योग्य) के माध्यम से आउटबाउंड प्रॉक्सी समर्थन## 5) Cloud Sync

- शेड्यूलर init: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`, `src/shared/services/modelSyncScheduler.ts`
- आवधिक कार्य: `src/shared/services/cloudSyncScheduler.ts`
- आवधिक कार्य: `src/shared/services/modelSyncScheduler.ts`
- नियंत्रण मार्ग: `src/app/api/sync/cloud/route.ts`## Request Lifecycle (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK Client
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as Model Resolver
    participant Auth as Credential Selector
    participant Exec as Provider Executor
    participant Prov as Upstream Provider
    participant Stream as Stream Translator
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: parse/resolve model or combo

    alt Combo model
        Chat->>Chat: iterate combo models (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: active account + tokens/api key

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: detect source format
    Core->>Core: translate request to target format
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: upstream API call
    Prov-->>Exec: SSE/JSON response
    Exec-->>Core: response + metadata

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: updated tokens
        Core->>Exec: retry request
    end

    Core->>Stream: translate/normalize stream to client format
    Stream-->>Client: SSE chunks / JSON response

    Stream->>Usage: extract usage + persist history/log
```

## Combo + Account Fallback Flow

```mermaid
flowchart TD
    A[Incoming model string] --> B{Is combo name?}
    B -- Yes --> C[Load combo models sequence]
    B -- No --> D[Single model path]

    C --> E[Try model N]
    E --> F[Resolve provider/model]
    D --> F

    F --> G[Select account credentials]
    G --> H{Credentials available?}
    H -- No --> I[Return provider unavailable]
    H -- Yes --> J[Execute request]

    J --> K{Success?}
    K -- Yes --> L[Return response]
    K -- No --> M{Fallback-eligible error?}

    M -- No --> N[Return error]
    M -- Yes --> O[Mark account unavailable cooldown]
    O --> P{Another account for provider?}
    P -- Yes --> G
    P -- No --> Q{In combo with next model?}
    Q -- Yes --> E
    Q -- No --> R[Return all unavailable]
```

फ़ॉलबैक निर्णय स्थिति कोड और त्रुटि-संदेश अनुमानों का उपयोग करके `open-sse/services/accountFallback.ts` द्वारा संचालित होते हैं। कॉम्बो रूटिंग एक अतिरिक्त गार्ड जोड़ता है: प्रदाता-स्कोप्ड 400s जैसे अपस्ट्रीम सामग्री-ब्लॉक और भूमिका-सत्यापन विफलताओं को मॉडल-स्थानीय विफलताओं के रूप में माना जाता है ताकि बाद में कॉम्बो लक्ष्य अभी भी चल सकें।## OAuth Onboarding and Token Refresh Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant UI as Dashboard UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as Provider Auth Server
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as Provider Executor

    UI->>OAuth: GET authorize or device-code
    OAuth->>ProvAuth: create auth/device flow
    ProvAuth-->>OAuth: auth URL or device code payload
    OAuth-->>UI: flow data

    UI->>OAuth: POST exchange or poll
    OAuth->>ProvAuth: token exchange/poll
    ProvAuth-->>OAuth: access/refresh tokens
    OAuth->>DB: createProviderConnection(oauth data)
    OAuth-->>UI: success + connection id

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: validate credentials / optional refresh
    Exec-->>Test: valid or refreshed token info
    Test->>DB: update status/tokens/errors
    Test-->>UI: validation result
```

लाइव ट्रैफ़िक के दौरान रिफ्रेश को निष्पादक `refreshCredentials()` के माध्यम से `open-sse/handlers/chatCore.ts` के अंदर निष्पादित किया जाता है।## Cloud Sync Lifecycle (Enable / Sync / Disable)

```mermaid
sequenceDiagram
    autonumber
    participant UI as Endpoint Page UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as External Cloud Sync
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: set cloudEnabled=true
    Sync->>DB: ensure API key exists
    Sync->>Cloud: POST /sync/{machineId} (providers/aliases/combos/keys)
    Cloud-->>Sync: sync result
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: enabled + verification status

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: remote data
    Sync->>DB: update newer local tokens/status
    Sync-->>UI: synced

    UI->>Sync: POST action=disable
    Sync->>DB: set cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: switch ANTHROPIC_BASE_URL back to local (if needed)
    Sync-->>UI: disabled
```

Periodic sync is triggered by `CloudSyncScheduler` when cloud is enabled.

## Data Model and Storage Map

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

भौतिक भंडारण फ़ाइलें:

- प्राथमिक रनटाइम DB: `${DATA_DIR}/storage.sqlite`
- अनुरोध लॉग लाइनें: `${DATA_DIR}/log.txt` (कॉम्पैट/डीबग आर्टिफैक्ट)
- संरचित कॉल पेलोड अभिलेखागार: `${DATA_DIR}/call_logs/`
- वैकल्पिक अनुवादक/अनुरोध डिबग सत्र: `<repo>/logs/...`## Deployment Topology

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(storage.sqlite)]
        UsageDB[(usage tables + log artifacts)]
    end

    subgraph External[External Services]
        Providers[AI Providers]
        SyncCloud[Cloud Sync Service]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## Module Mapping (Decision-Critical)

### Route and API Modules

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: अनुकूलता एपीआई
- `src/app/api/v1/providers/[provider]/*`: प्रति-प्रदाता समर्पित मार्ग (चैट, एम्बेडिंग, चित्र)
- `src/app/api/providers*`: प्रदाता CRUD, सत्यापन, परीक्षण
- `src/app/api/provider-nodes*`: कस्टम संगत नोड प्रबंधन
- `src/app/api/provider-models`: कस्टम मॉडल प्रबंधन (CRUD)
- `src/app/api/models/route.ts`: मॉडल कैटलॉग एपीआई (उपनाम + कस्टम मॉडल)
- `src/app/api/oauth/*`: OAuth/डिवाइस-कोड प्रवाह
- `src/app/api/keys*`: स्थानीय एपीआई कुंजी जीवनचक्र
- `src/app/api/models/alias`: उपनाम प्रबंधन
- `src/app/api/combos*`: फ़ॉलबैक कॉम्बो प्रबंधन
- `src/app/api/pricing`: लागत गणना के लिए मूल्य निर्धारण ओवरराइड हो जाता है
- `src/app/api/settings/proxy`: प्रॉक्सी कॉन्फ़िगरेशन (प्राप्त/पुट/हटाएं)
- `src/app/api/settings/proxy/test`: आउटबाउंड प्रॉक्सी कनेक्टिविटी टेस्ट (POST)
- `src/app/api/usage/*`: एपीआई का उपयोग और लॉग
- `src/app/api/sync/*` + `src/app/api/cloud/*`: क्लाउड सिंक और क्लाउड-फेसिंग हेल्पर्स
- `src/app/api/cli-tools/*`: स्थानीय सीएलआई कॉन्फ़िगरेशन लेखक/चेकर्स
- `src/app/api/settings/ip-filter`: आईपी अनुमति सूची/ब्लॉकलिस्ट (प्राप्त/पुट)
- `src/app/api/settings/thinking-budget`: थिंकिंग टोकन बजट कॉन्फ़िगरेशन (GET/PUT)
- `src/app/api/settings/system-prompt`: ग्लोबल सिस्टम प्रॉम्प्ट (GET/PUT)
- `src/app/api/sessions`: सक्रिय सत्र सूची (GET)
- `src/app/api/rate-limits`: प्रति-खाता दर सीमा स्थिति (GET)### Routing and Execution Core

- `src/sse/handlers/chat.ts`: अनुरोध पार्स, कॉम्बो हैंडलिंग, खाता चयन लूप
- `ओपन-एसएसई/हैंडलर/चैटकोर.टीएस`: अनुवाद, निष्पादक प्रेषण, पुनः प्रयास/रीफ्रेश हैंडलिंग, स्ट्रीम सेटअप
- `ओपन-एसएसई/निष्पादक/*`: प्रदाता-विशिष्ट नेटवर्क और प्रारूप व्यवहार### Translation Registry and Format Converters

- `open-sse/translator/index.ts`: अनुवादक रजिस्ट्री और ऑर्केस्ट्रेशन
- अनुवादकों से अनुरोध: `ओपन-एसएसई/अनुवादक/अनुरोध/*`
- प्रतिक्रिया अनुवादक: `ओपन-एसएसई/अनुवादक/प्रतिक्रिया/*`
- प्रारूप स्थिरांक: `open-sse/translator/formats.ts`### Persistence

- `src/lib/db/*`: SQLite पर लगातार कॉन्फ़िगरेशन/स्थिति और डोमेन दृढ़ता
- `src/lib/localDb.ts`: डीबी मॉड्यूल के लिए अनुकूलता पुनः निर्यात
- `src/lib/usageDb.ts`: SQLite तालिकाओं के शीर्ष पर उपयोग इतिहास/कॉल लॉग मुखौटा## Provider Executor Coverage (Strategy Pattern)

प्रत्येक प्रदाता के पास `BaseExecutor` (`open-sse/executors/base.ts` में) का विस्तार करने वाला एक विशेष निष्पादक होता है, जो URL निर्माण, हेडर निर्माण, घातीय बैकऑफ़ के साथ पुनः प्रयास, क्रेडेंशियल रिफ्रेश हुक और `execute()` ऑर्केस्ट्रेशन विधि प्रदान करता है।

| निष्पादक                    | प्रदाता(ओं)                                                                                                                                                                  | विशेष हैंडलिंग                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `डिफ़ॉल्ट निष्पादक`         | ओपनएआई, क्लाउड, जेमिनी, क्वेन, क्यूडर, ओपनराउटर, जीएलएम, किमी, मिनीमैक्स, डीपसीक, ग्रोक, एक्सएआई, मिस्ट्रल, पर्प्लेक्सिटी, टुगेदर, फायरवर्क्स, सेरेब्रा, कोहेरे, एनवीआईडीआईए | प्रति प्रदाता डायनामिक यूआरएल/हेडर कॉन्फिगरेशन                                          |
| 'एंटीग्रेविटी एक्ज़ीक्यूटर' | गूगल एंटीग्रेविटी                                                                                                                                                            | कस्टम प्रोजेक्ट/सत्र आईडी, पुनः प्रयास करें-पार्सिंग के बाद                             |
| `कोडेक्स एक्ज़ीक्यूटर` ​​   | ओपनएआई कोडेक्स                                                                                                                                                               | सिस्टम निर्देश इंजेक्ट करता है, तर्क करने का प्रयास करता है                             |
| `कर्सर निष्पादक`            | कर्सर आईडीई                                                                                                                                                                  | कनेक्टआरपीसी प्रोटोकॉल, प्रोटोबफ एन्कोडिंग, चेकसम के माध्यम से हस्ताक्षर करने का अनुरोध |
| 'GithubExecutor'            | गिटहब कोपायलट                                                                                                                                                                | कोपायलट टोकन ताज़ा करें, VSCode-नकल हेडर                                                |
| `कीरो एक्ज़ीक्यूटर` ​​      | एडब्ल्यूएस कोडव्हिस्परर/किरो                                                                                                                                                 | एडब्ल्यूएस इवेंटस्ट्रीम बाइनरी प्रारूप → एसएसई रूपांतरण                                 |
| `जेमिनीसीएलआईएक्सक्यूटर` ​​ | जेमिनी सीएलआई                                                                                                                                                                | Google OAuth टोकन ताज़ा चक्र                                                            |

अन्य सभी प्रदाता (कस्टम संगत नोड्स सहित) `DefaultExecutor` का उपयोग करते हैं।## Provider Compatibility Matrix

| प्रदाता               | प्रारूप              | प्रामाणिक                | स्ट्रीम           | नॉन-स्ट्रीम | टोकन ताज़ा करें | उपयोग एपीआई         |
| --------------------- | -------------------- | ------------------------ | ----------------- | ----------- | --------------- | ------------------- | ------------------------------ |
| क्लाउड                | क्लाउड               | एपीआई कुंजी / OAuth      | ✅                | ✅          | ✅              | ⚠️ केवल एडमिन       |
| मिथुन                 | मिथुन                | एपीआई कुंजी / OAuth      | ✅                | ✅          | ✅              | ⚠️ क्लाउड कंसोल     |
| जेमिनी सीएलआई         | मिथुन-क्ली           | OAuth                    | ✅                | ✅          | ✅              | ⚠️ Cloud Console    |
| प्रतिगुरुत्वाकर्षण    | प्रतिगुरुत्वाकर्षण   | OAuth                    | ✅                | ✅          | ✅              | ✅ पूर्ण कोटा एपीआई |
| ओपनएआई                | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| कोडेक्स               | openai-प्रतिक्रियाएं | OAuth                    | ✅ मजबूर          | ❌          | ✅              | ✅ दर सीमा          |
| गिटहब कोपायलट         | ओपनाई                | OAuth + सहपायलट टोकन     | ✅                | ✅          | ✅              | ✅ कोटा स्नैपशॉट    |
| कर्सर                 | कर्सर                | कस्टम चेकसम              | ✅                | ✅          | ❌              | ❌                  |
| किरो                  | किरो                 | एडब्ल्यूएस एसएसओ ओआईडीसी | ✅ (इवेंटस्ट्रीम) | ❌          | ✅              | ✅ उपयोग सीमा       |
| क्वेन                 | ओपनाई                | OAuth                    | ✅                | ✅          | ✅              | ⚠️ प्रति अनुरोध     |
| कोडर                  | ओपनाई                | OAuth (बेसिक)            | ✅                | ✅          | ✅              | ⚠️ प्रति अनुरोध     |
| ओपनराउटर              | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| जीएलएम/किमी/मिनीमैक्स | क्लाउड               | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| डीपसीक                | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| ग्रोक                 | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| एक्सएआई (ग्रोक)       | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| मिस्ट्रल              | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| उलझन                  | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| एक साथ एआई            | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| आतिशबाजी एआई          | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| सेरेब्रस              | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| सहभागी                | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  |
| एनवीडिया एनआईएम       | ओपनाई                | एपीआई कुंजी              | ✅                | ✅          | ❌              | ❌                  | ## Format Translation Coverage |

पता लगाए गए स्रोत प्रारूपों में शामिल हैं:

- `ओपनाई`
- `ओपनई-प्रतिक्रियाएँ`
- `क्लाउड`
- 'मिथुन'

लक्ष्य प्रारूपों में शामिल हैं:

- ओपनएआई चैट/प्रतिक्रियाएं
  -क्लाउड
- मिथुन/मिथुन-सीएलआई/एंटीग्रेविटी लिफाफा
- किरो
- कर्सर

अनुवाद**हब प्रारूप के रूप में ओपनएआई**का उपयोग करते हैं - सभी रूपांतरण मध्यवर्ती के रूप में ओपनएआई से गुजरते हैं:```
Source Format → OpenAI (hub) → Target Format

````

स्रोत पेलोड आकार और प्रदाता लक्ष्य प्रारूप के आधार पर अनुवादों का चयन गतिशील रूप से किया जाता है।

अनुवाद पाइपलाइन में अतिरिक्त प्रसंस्करण परतें:

-**प्रतिक्रिया स्वच्छता**- सख्त एसडीके अनुपालन सुनिश्चित करने के लिए ओपनएआई-प्रारूप प्रतिक्रियाओं (स्ट्रीमिंग और गैर-स्ट्रीमिंग दोनों) से गैर-मानक फ़ील्ड हटा देता है
-**भूमिका सामान्यीकरण**- गैर-ओपनएआई लक्ष्यों के लिए `डेवलपर` → `सिस्टम` को रूपांतरित करता है; सिस्टम भूमिका को अस्वीकार करने वाले मॉडलों के लिए `सिस्टम` → `उपयोगकर्ता` को मर्ज करता है (जीएलएम, ईआरएनआईई)
-**टैग निष्कर्षण के बारे में सोचें**- पार्स `<सोच>...</सोच>` सामग्री से `reasoning_content` फ़ील्ड में ब्लॉक करता है
-**संरचित आउटपुट**- OpenAI `response_format.json_schema` को जेमिनी के `responseMimeType` + `responseSchema` में परिवर्तित करता है## Supported API Endpoints

| समापन बिंदु | प्रारूप | हैंडलर |
| -------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `पोस्ट /v1/चैट/समापन` | ओपनएआई चैट | `src/sse/handlers/chat.ts` |
| `पोस्ट /v1/संदेश` | क्लाउड संदेश | वही हैंडलर (स्वतः पता चला) |
| `पोस्ट /v1/प्रतिक्रियाएँ` | ओपनएआई प्रतिक्रियाएँ | `open-sse/handlers/responsesHandler.ts` |
| `पोस्ट /v1/एम्बेडिंग` | ओपनएआई एंबेडिंग्स | `open-sse/handlers/embeddings.ts` |
| `प्राप्त करें /v1/एम्बेडिंग्स` | मॉडल सूची | एपीआई मार्ग |
| `पोस्ट /v1/छवियां/पीढ़ी` | OpenAI छवियाँ | `ओपन-एसएसई/हैंडलर/इमेजजेनरेशन.टीएस` |
| `प्राप्त करें /v1/छवियां/पीढ़ी` | मॉडल सूची | एपीआई मार्ग |
| `पोस्ट /v1/प्रदाता/{प्रदाता}/चैट/समापन` | ओपनएआई चैट | मॉडल सत्यापन के साथ प्रति-प्रदाता समर्पित |
| `पोस्ट /v1/प्रदाता/{प्रदाता}/एम्बेडिंग्स` | ओपनएआई एंबेडिंग्स | मॉडल सत्यापन के साथ प्रति-प्रदाता समर्पित |
| `पोस्ट /v1/प्रदाता/{प्रदाता}/छवियां/पीढ़ी` | OpenAI छवियाँ | मॉडल सत्यापन के साथ प्रति-प्रदाता समर्पित |
| `POST /v1/messages/count_tokens` | क्लाउड टोकन गिनती | एपीआई मार्ग |
| `प्राप्त करें /v1/मॉडल` | OpenAI मॉडल सूची | एपीआई मार्ग (चैट + एम्बेडिंग + छवि + कस्टम मॉडल) |
| `प्राप्त करें /एपीआई/मॉडल/कैटलॉग` | कैटलॉग | प्रदाता + प्रकार | द्वारा समूहीकृत सभी मॉडल
| `POST /v1beta/models/*:streamGenerateContent` | मिथुन राशि के जातक | एपीआई मार्ग |
| `प्राप्त/पुट/डिलीट /एपीआई/सेटिंग्स/प्रॉक्सी` | प्रॉक्सी कॉन्फिग | नेटवर्क प्रॉक्सी कॉन्फ़िगरेशन |
| `पोस्ट /एपीआई/सेटिंग्स/प्रॉक्सी/टेस्ट` | प्रॉक्सी कनेक्टिविटी | प्रॉक्सी स्वास्थ्य/कनेक्टिविटी परीक्षण समापन बिंदु |
| `प्राप्त करें/पोस्ट करें/हटाएं /एपीआई/प्रदाता-मॉडल` | प्रदाता मॉडल | प्रदाता मॉडल मेटाडेटा समर्थन कस्टम और प्रबंधित उपलब्ध मॉडल |## Bypass Handler

बाईपास हैंडलर (`ओपन-एसएसई/यूटिल्स/बायपासहैंडलर.टीएस`) क्लाउड सीएलआई से ज्ञात "थ्रोअवे" अनुरोधों को रोकता है - वार्मअप पिंग, शीर्षक निष्कर्षण और टोकन गिनती - और अपस्ट्रीम प्रदाता टोकन का उपभोग किए बिना एक**नकली प्रतिक्रिया**देता है। यह तभी ट्रिगर होता है जब `User-Agent` में `claude-cli` होता है।## Request Logger Pipeline

अनुरोध लकड़हारा (`open-sse/utils/requestLogger.ts`) एक 7-चरण डीबग लॉगिंग पाइपलाइन प्रदान करता है, जो डिफ़ॉल्ट रूप से अक्षम है, `ENABLE_REQUEST_LOGS=true` के माध्यम से सक्षम है:```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
````

प्रत्येक अनुरोध सत्र के लिए फ़ाइलें `<repo>/logs/<session>/` पर लिखी जाती हैं।## Failure Modes and Resilience

## 1) Account/Provider Availability

- क्षणिक/दर/प्रामाणिक त्रुटियों पर प्रदाता खाता ठंडा हो गया
- अनुरोध विफल होने से पहले खाता फ़ॉलबैक
- वर्तमान मॉडल/प्रदाता पथ समाप्त होने पर कॉम्बो मॉडल फ़ॉलबैक## 2) Token Expiry

- ताज़ा करने योग्य प्रदाताओं के लिए पुनः प्रयास के साथ पूर्व-जांच और ताज़ा करें
- कोर पथ में ताज़ा प्रयास के बाद 401/403 पुनः प्रयास करें## 3) Stream Safety

- डिस्कनेक्ट-अवेयर स्ट्रीम नियंत्रक
- एंड-ऑफ-स्ट्रीम फ्लश और `[DONE]` हैंडलिंग के साथ अनुवाद स्ट्रीम
- प्रदाता उपयोग मेटाडेटा अनुपलब्ध होने पर उपयोग अनुमान फ़ॉलबैक## 4) Cloud Sync Degradation

- समन्वयन त्रुटियाँ सामने आती हैं लेकिन स्थानीय रनटाइम जारी रहता है
- शेड्यूलर में पुनः प्रयास-सक्षम तर्क है, लेकिन आवधिक निष्पादन वर्तमान में डिफ़ॉल्ट रूप से एकल-प्रयास सिंक को कॉल करता है## 5) Data Integrity

- स्टार्टअप पर SQLite स्कीमा माइग्रेशन और ऑटो-अपग्रेड हुक
- लीगेसी JSON → SQLite माइग्रेशन संगतता पथ## Observability and Operational Signals

रनटाइम दृश्यता स्रोत:

- कंसोल `src/sse/utils/logger.ts` से लॉग करता है
- SQLite में प्रति-अनुरोध उपयोग समुच्चय (`use_history`, `call_logs`, `proxy_logs`)
- जब `settings.detailed_logs_enabled=true` होता है तो SQLite (`request_detail_logs`) में चार चरण वाला विस्तृत पेलोड कैप्चर होता है
- पाठ्य अनुरोध स्थिति लॉग इन `log.txt` (वैकल्पिक/कॉम्पैट)
- `ENABLE_REQUEST_LOGS=true` होने पर `लॉग/` के अंतर्गत वैकल्पिक गहन अनुरोध/अनुवाद लॉग
- यूआई खपत के लिए डैशबोर्ड उपयोग समापन बिंदु (`/api/usage/*`)।

विस्तृत अनुरोध पेलोड कैप्चर प्रति रूटेड कॉल को चार JSON पेलोड चरणों तक संग्रहीत करता है:

- ग्राहक से प्राप्त कच्चा अनुरोध
- अनुवादित अनुरोध वास्तव में अपस्ट्रीम भेजा गया
- प्रदाता प्रतिक्रिया JSON के रूप में पुनर्निर्मित; स्ट्रीम की गई प्रतिक्रियाओं को अंतिम सारांश और स्ट्रीम मेटाडेटा में संकलित किया जाता है
- ओम्निरूट द्वारा लौटाई गई अंतिम ग्राहक प्रतिक्रिया; स्ट्रीम की गई प्रतिक्रियाएँ उसी संक्षिप्त सारांश रूप में संग्रहीत की जाती हैं## Security-Sensitive Boundaries

- JWT सीक्रेट (`JWT_SECRET`) डैशबोर्ड सत्र कुकी सत्यापन/हस्ताक्षर को सुरक्षित करता है
- प्रारंभिक पासवर्ड बूटस्ट्रैप (`INITIAL_PASSWORD`) को प्रथम-रन प्रावधान के लिए स्पष्ट रूप से कॉन्फ़िगर किया जाना चाहिए
- एपीआई कुंजी HMAC सीक्रेट (`API_KEY_SECRET`) उत्पन्न स्थानीय एपीआई कुंजी प्रारूप को सुरक्षित करता है
- प्रदाता रहस्य (एपीआई कुंजी/टोकन) स्थानीय डीबी में बने रहते हैं और उन्हें फ़ाइल सिस्टम स्तर पर संरक्षित किया जाना चाहिए
- क्लाउड सिंक एंडपॉइंट एपीआई कुंजी ऑथ + मशीन आईडी सेमेन्टिक्स पर निर्भर करते हैं## Environment and Runtime Matrix

कोड द्वारा सक्रिय रूप से उपयोग किए जाने वाले पर्यावरण चर:

- ऐप/ऑथ: `JWT_SECRET`, `INITIAL_PASSWORD`
- भंडारण: `DATA_DIR`
- संगत नोड व्यवहार: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- वैकल्पिक स्टोरेज बेस ओवरराइड (Linux/macOS जब `DATA_DIR` अनसेट होता है): `XDG_CONFIG_HOME`
- सुरक्षा हैशिंग: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- लॉगिंग: `ENABLE_REQUEST_LOGS`
- सिंक/क्लाउड यूआरएल: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- आउटबाउंड प्रॉक्सी: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` और लोअरकेस वेरिएंट
- SOCKS5 फ़ीचर फ़्लैग: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- प्लेटफ़ॉर्म/रनटाइम सहायक (ऐप-विशिष्ट कॉन्फ़िगरेशन नहीं): `एप्लिकेशन डेटा`, `NODE_ENV`, `पोर्ट`, `होस्टनाम`## Known Architectural Notes

1. `usageDb` और `localDb` लीगेसी फ़ाइल माइग्रेशन के साथ समान आधार निर्देशिका नीति (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) साझा करते हैं।
2. `/api/v1/route.ts` सिमेंटिक बहाव से बचने के लिए `/api/v1/models` (`src/app/api/v1/models/catalog.ts`) द्वारा उपयोग किए जाने वाले समान एकीकृत कैटलॉग बिल्डर को सौंपता है।
3. अनुरोध लकड़हारा सक्षम होने पर पूर्ण हेडर/बॉडी लिखता है; लॉग निर्देशिका को संवेदनशील मानें।
4. क्लाउड व्यवहार सही `NEXT_PUBLIC_BASE_URL` और क्लाउड एंडपॉइंट रीचैबिलिटी पर निर्भर करता है।
5. `ओपन-एसएसई/` निर्देशिका को `@omniroute/ओपन-एसएसई`**एनपीएम वर्कस्पेस पैकेज**के रूप में प्रकाशित किया गया है। स्रोत कोड इसे `@omniroute/open-sse/...` (Next.js `transpilePackages` द्वारा हल) के माध्यम से आयात करता है। इस दस्तावेज़ में फ़ाइल पथ अभी भी स्थिरता के लिए निर्देशिका नाम `open-sse/` का उपयोग करते हैं।
6. डैशबोर्ड में चार्ट सुलभ, इंटरैक्टिव एनालिटिक्स विज़ुअलाइज़ेशन (मॉडल उपयोग बार चार्ट, सफलता दर के साथ प्रदाता ब्रेकडाउन टेबल) के लिए**रिचार्ट्स**(एसवीजी-आधारित) का उपयोग करते हैं।
7. E2E परीक्षण**Playwright**(`test/e2e/`) का उपयोग करते हैं, `npm run test:e2e` के माध्यम से चलते हैं। यूनिट परीक्षण**नोड.जेएस टेस्ट रनर**(`टेस्ट/यूनिट/`) का उपयोग करते हैं, जो `एनपीएम रन टेस्ट: यूनिट` के माध्यम से चलते हैं। `src/` के अंतर्गत स्रोत कोड**टाइपस्क्रिप्ट**(`.ts`/`.tsx`) है; `ओपन-एसएसई/` कार्यक्षेत्र जावास्क्रिप्ट (`.जेएस`) बना हुआ है।
8. सेटिंग्स पृष्ठ को 5 टैब में व्यवस्थित किया गया है: सुरक्षा, रूटिंग (6 वैश्विक रणनीतियाँ: भरण-प्रथम, राउंड-रॉबिन, पी2सी, यादृच्छिक, कम से कम उपयोग किया गया, लागत-अनुकूलित), लचीलापन (संपादन योग्य दर सीमा, सर्किट ब्रेकर, नीतियां), एआई (सोच बजट, सिस्टम प्रॉम्प्ट, प्रॉम्प्ट कैश), उन्नत (प्रॉक्सी)।## Operational Verification Checklist

- स्रोत से निर्माण: `एनपीएम रन बिल्ड`
- डॉकर छवि बनाएँ: `docker build -t omniroute।`
- सेवा प्रारंभ करें और सत्यापित करें:
- `प्राप्त करें /एपीआई/सेटिंग्स`
- `प्राप्त करें /api/v1/मॉडल`
- जब `PORT=20128` हो तो CLI लक्ष्य आधार URL `http://<host>:20128/v1` होना चाहिए
