# Contributing to OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

योगदान देने में आपकी रुचि के लिए धन्यवाद! इस मार्गदर्शिका में वह सब कुछ शामिल है जो आपको आरंभ करने के लिए आवश्यक है।---

## Development Setup

### Prerequisites

-**Node.js**>= 18 <24 (अनुशंसित: 22 एलटीएस) -**एनपीएम**10+ -**गिट**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

विकास के लिए मुख्य चर:

| परिवर्तनीय             | विकास डिफ़ॉल्ट           | विवरण                      |
| ---------------------- | ------------------------ | -------------------------- | ---------------------- |
| `पोर्ट`                | `20128`                  | सर्वर पोर्ट                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | फ्रंटएंड के लिए बेस यूआरएल |
| `JWT_SECRET`           | (ऊपर उत्पन्न करें)       | JWT हस्ताक्षर रहस्य        |
| `प्रारंभिक_पासवर्ड`    | 'चेंजमे'                 | पहला लॉगिन पासवर्ड         |
| `एपीपी_लॉग_लेवल`       | 'जानकारी'                | लॉग वर्बोसिटी स्तर         | ### Dashboard Settings |

डैशबोर्ड उन सुविधाओं के लिए यूआई टॉगल प्रदान करता है जिन्हें पर्यावरण चर के माध्यम से भी कॉन्फ़िगर किया जा सकता है:

| स्थान निर्धारित करना | टॉगल करें       | विवरण                             |
| -------------------- | --------------- | --------------------------------- |
| सेटिंग्स → उन्नत     | डिबग मोड        | डिबग अनुरोध लॉग सक्षम करें (यूआई) |
| सेटिंग्स → सामान्य   | साइडबार दृश्यता | साइडबार अनुभाग दिखाएँ/छिपाएँ      |

ये सेटिंग्स डेटाबेस में संग्रहीत होती हैं और सेट होने पर env var डिफ़ॉल्ट को ओवरराइड करते हुए, पुनरारंभ पर बनी रहती हैं।### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

डिफ़ॉल्ट यूआरएल:

-**डैशबोर्ड**: `http://localhost:20128/डैशबोर्ड` -**एपीआई**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**कभी भी सीधे `मुख्य` पर प्रतिबद्ध न हों।**हमेशा फीचर शाखाओं का उपयोग करें।```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| उपसर्ग | उद्देश्य |
| ----------- | -------------------------------- |
| `करतब/` | नई सुविधाएँ |
| `ठीक/` | बग फिक्स |
| `रिफैक्टर/` | कोड पुनर्गठन |
| `दस्तावेज़/` | दस्तावेज़ीकरण परिवर्तन |
| `परीक्षण/` | परीक्षण परिवर्धन/सुधार |
| `घर का काम/` | टूलींग, सीआई, निर्भरताएँ |### Commit Messages

[परंपरागत प्रतिबद्धताओं](https://www.conventionalcommits.org/) का पालन करें:```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

स्कोप: `db`, `sse`, `oauth`, `डैशबोर्ड`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`।---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

कवरेज नोट्स:

- `एनपीएम रन टेस्ट:कवरेज` मुख्य इकाई परीक्षण सूट के लिए स्रोत कवरेज को मापता है, `परीक्षण/**` को छोड़कर, और `ओपन-एसएसई/**` को शामिल करता है
- पुल अनुरोधों को स्टेटमेंट, लाइन, फ़ंक्शन और शाखाओं के लिए समग्र कवरेज गेट**60% या अधिक**पर रखना चाहिए
- यदि कोई पीआर `src/`, `open-sse/`, `electron/`, या `bin/` में उत्पादन कोड बदलता है, तो उसे उसी पीआर में स्वचालित परीक्षण जोड़ना या अपडेट करना होगा
- `एनपीएम रन कवरेज: रिपोर्ट` नवीनतम कवरेज रन से विस्तृत फ़ाइल-दर-फ़ाइल रिपोर्ट प्रिंट करता है
- `एनपीएम रन टेस्ट:कवरेज:लिगेसी` ऐतिहासिक तुलना के लिए पुराने मीट्रिक को सुरक्षित रखता है
- चरणबद्ध कवरेज सुधार रोडमैप के लिए `docs/COVERAGE_PLAN.md` देखें### Pull Request Requirements

पीआर खोलने या विलय करने से पहले:

- `एनपीएम रन टेस्ट: यूनिट` चलाएँ
- `एनपीएम रन टेस्ट:कवरेज` चलाएँ
- सुनिश्चित करें कि सभी मेट्रिक्स के लिए कवरेज गेट**60%+**पर रहे
- उत्पादन कोड बदलने पर पीआर विवरण में परिवर्तित या जोड़ी गई परीक्षण फ़ाइलें शामिल करें
- जब परियोजना रहस्य सीआई में कॉन्फ़िगर किए जाते हैं तो पीआर पर सोनारक्यूब परिणाम की जांच करें

वर्तमान परीक्षण स्थिति:**122 यूनिट परीक्षण फ़ाइलें**कवरिंग:

- प्रदाता अनुवादक और प्रारूप रूपांतरण
- दर सीमित करना, सर्किट ब्रेकर, और लचीलापन
- सिमेंटिक कैश, निष्क्रियता, प्रगति ट्रैकिंग
- डेटाबेस संचालन और स्कीमा (21 डीबी मॉड्यूल)
- OAuth प्रवाह और प्रमाणीकरण
- एपीआई एंडपॉइंट सत्यापन (ज़ोड v4)
- एमसीपी सर्वर उपकरण और स्कोप प्रवर्तन
- मेमोरी और कौशल प्रणाली---

## Code Style

-**ESLint**- कमिट करने से पहले `npm run lint` चलाएँ -**Prettier**— Auto-formatted via `lint-staged` on commit (2 spaces, semicolons, double quotes, 100 char width, es5 trailing commas) -**टाइपस्क्रिप्ट**- सभी `src/` कोड `.ts`/`.tsx` का उपयोग करता है; `open-sse/` `.ts`/`.js` का उपयोग करता है; TSDoc वाला दस्तावेज़ (`@param`, `@returns`, `@throws`) -**नहीं `eval()`**- ESLint `no-eval`, `no-implied-eval`, `no-new-func` लागू करता है -**ज़ोड सत्यापन**- सभी एपीआई इनपुट सत्यापन के लिए ज़ोड v4 स्कीमा का उपयोग करें -**नामकरण**: फ़ाइलें = कैमलकेस/कबाब-केस, घटक = पास्कलकेस, स्थिरांक = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

`src/shared/constents/providers.ts` में जोड़ें - मॉड्यूल लोड पर ज़ोड-मान्य।### Step 2: Add Executor (if custom logic needed)

आधार निष्पादक का विस्तार करते हुए `open-sse/executors/your-provider.ts` में निष्पादक बनाएं।### Step 3: Add Translator (if non-OpenAI format)

`ओपन-एसएसई/अनुवादक/` में अनुरोध/प्रतिक्रिया अनुवादक बनाएं।### Step 4: Add OAuth Config (if OAuth-based)

`src/lib/oauth/constents/oauth.ts` में OAuth क्रेडेंशियल और `src/lib/oauth/services/` में सेवा जोड़ें।### Step 5: Register Models

`open-sse/config/providerRegistry.ts` में मॉडल परिभाषाएँ जोड़ें।### Step 6: Add Tests

यूनिट परीक्षणों को `टेस्ट/यूनिट/` में कम से कम कवर करते हुए लिखें:

- प्रदाता पंजीकरण
- अनुरोध/प्रतिक्रिया अनुवाद
- त्रुटि प्रबंधन---

## Pull Request Checklist

- [ ] टेस्ट पास (`एनपीएम टेस्ट`)
- [ ] लिंटिंग पास (`एनपीएम रन लिंट`)
- [ ] बिल्ड सफल हुआ (`एनपीएम रन बिल्ड`)
- [ ] नए सार्वजनिक कार्यों और इंटरफेस के लिए टाइपस्क्रिप्ट प्रकार जोड़े गए
- [ ] कोई हार्डकोडेड रहस्य या फ़ॉलबैक मान नहीं
- [ ] सभी इनपुट ज़ोड स्कीमा के साथ मान्य हैं
- [ ] चेंजलॉग अपडेट किया गया (यदि उपयोगकर्ता के सामने परिवर्तन हो)
- [ ] दस्तावेज़ अद्यतन (यदि लागू हो)---

## Releasing

रिलीज़ को `/generate-release` वर्कफ़्लो के माध्यम से प्रबंधित किया जाता है। जब एक नया GitHub रिलीज़ बनाया जाता है, तो पैकेज GitHub क्रियाओं के माध्यम से**स्वचालित रूप से npm**पर प्रकाशित हो जाता है।---

## Getting Help

-**आर्किटेक्चर**: देखें [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**एपीआई संदर्भ**: देखें [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**मुद्दे**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**एडीआर**: वास्तुशिल्प निर्णय रिकॉर्ड के लिए `docs/adr/` देखें
