# Uživatelská příručka

🌐 **Jazyky:** 🇺🇸 [angličtina](USER_GUIDE.md) | 🇧🇷 [Português (Brazílie)](i18n/pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](i18n/es/USER_GUIDE.md) | 🇫🇷 [Français](i18n/fr/USER_GUIDE.md) | 🇮🇹 [Italiano](i18n/it/USER_GUIDE.md) | 🇷🇺 [Русский](i18n/ru/USER_GUIDE.md) | 🇨🇳[中文 (简体)](i18n/zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](i18n/de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](i18n/in/USER_GUIDE.md) | 🇹🇭 [ไทย](i18n/th/USER_GUIDE.md) | 🇺🇦 [Українська](i18n/uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](i18n/ar/USER_GUIDE.md) | 🇯🇵[日本語](i18n/ja/USER_GUIDE.md)| 🇻🇳 [Tiếng Việt](i18n/vi/USER_GUIDE.md) | 🇧🇬 [Български](i18n/bg/USER_GUIDE.md) | 🇩🇰 [Dánsko](i18n/da/USER_GUIDE.md) | 🇫🇮 [Suomi](i18n/fi/USER_GUIDE.md) | 🇮🇱 [עברית](i18n/he/USER_GUIDE.md) | 🇭🇺 [maďarština](i18n/hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonésie](i18n/id/USER_GUIDE.md) | 🇰🇷 [한국어](i18n/ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/USER_GUIDE.md) | 🇳🇱 [Nizozemsko](i18n/nl/USER_GUIDE.md) | 🇳🇴 [Norsk](i18n/no/USER_GUIDE.md) | 🇵🇹 [Português (Portugalsko)](i18n/pt/USER_GUIDE.md) | 🇷🇴 [Română](i18n/ro/USER_GUIDE.md) | 🇵🇱 [Polski](i18n/pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](i18n/sk/USER_GUIDE.md) | 🇸🇪 [Svenska](i18n/sv/USER_GUIDE.md) | 🇵🇭 [Filipínec](i18n/phi/USER_GUIDE.md) | 🇨🇿 [Čeština](i18n/cs/USER_GUIDE.md)

Kompletní průvodce konfigurací poskytovatelů, vytvářením kombinací, integrací nástrojů CLI a nasazením OmniRoute.

---

## Obsah

- [Ceny v kostce](#-pricing-at-a-glance)
- [Případy použití](#-use-cases)
- [Nastavení poskytovatele](#-provider-setup)
- [Integrace s rozhraním CLI](#-cli-integration)
- [Nasazení](#-deployment)
- [Dostupné modely](#-available-models)
- [Pokročilé funkce](#-advanced-features)

---

## 💰 Přehled cen

Úroveň | Poskytovatel | Náklady | Obnovení kvóty | Nejlepší pro
--- | --- | --- | --- | ---
**💳 PŘEDPLATNÉ** | Claude Code (profesionál) | 20 dolarů měsíčně | 5 hodin + týdně | Již přihlášen/a k odběru
 | Kodex (Plus/Pro) | 20–200 USD/měsíc | 5 hodin + týdně | Uživatelé OpenAI
 | Rozhraní příkazového řádku Gemini | **UVOLNIT** | 180 tisíc měsíčně + 1 tisíc denně | Každý!
 | GitHub Copilot | 10–19 USD/měsíc | Měsíční | Uživatelé GitHubu
**🔑 KLÍČ API** | Hluboké vyhledávání | Platba za použití | Žádný | Laciné uvažování
 | Groq | Platba za použití | Žádný | Ultrarychlá inference
 | xAI (Grok) | Platba za použití | Žádný | Grok 4 uvažování
 | Mistral | Platba za použití | Žádný | Modely hostované v EU
 | Zmatek | Platba za použití | Žádný | Rozšířené vyhledávání
 | Společně s umělou inteligencí | Platba za použití | Žádný | Modely s otevřeným zdrojovým kódem
 | Ohňostroj s umělou inteligencí | Platba za použití | Žádný | Rychlé snímky FLUX
 | Mozky | Platba za použití | Žádný | Rychlost v měřítku destičky
 | Soudržný | Platba za použití | Žádný | Příkaz R+ RAG
 | NVIDIA NIM | Platba za použití | Žádný | Podnikové modely
**💰 LEVNÉ** | GLM-4.7 | 0,6 USD/1 milion | Denně v 10:00 | Záloha rozpočtu
 | MiniMax M2.1 | 0,2 USD/1 milion | 5hodinové válcování | Nejlevnější varianta
 | Kimi K2 | 9 dolarů měsíčně bez závazků | 10 milionů tokenů/měsíc | Předvídatelné náklady
**🆓 ZDARMA** | iFlow | 0 dolarů | Neomezený | 8 modelů zdarma
 | Qwen | 0 dolarů | Neomezený | 3 modely zdarma
 | Kiro | 0 dolarů | Neomezený | Claude zdarma

**💡 Tip pro profesionály:** Začněte s kombinací Gemini CLI (180 tisíc zdarma/měsíc) + iFlow (neomezeně zdarma) = 0 dolarů!

---

## 🎯 Případy použití

### Případ 1: „Mám předplatné Claude Pro“

**Problém:** Kvóta vyprší, nevyužitá, limity rychlosti během náročného kódování

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Případ 2: „Chci nulové náklady“

**Problém:** Nemůžu si dovolit předplatné, potřebuji spolehlivé kódování s využitím umělé inteligence

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Případ 3: „Potřebuji kódování 24 hodin denně, 7 dní v týdnu, bez přerušení“

**Problém:** Termíny, nemůžeme si dovolit prostoje

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Případ 4: „Chci BEZPLATNOU AI v OpenClaw“

**Problém:** Potřebujete asistenta s umělou inteligencí v aplikacích pro zasílání zpráv, zcela zdarma

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Nastavení poskytovatele

### 🔐 Poskytovatelé předplatného

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Tip pro profesionály:** Pro složité úkoly používejte Opus, pro rychlost Sonnet. OmniRoute sleduje kvótu pro každý model!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (ZDARMA 180 000/měsíc!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nejlepší hodnota:** Obrovská bezplatná úroveň! Použijte ji před placenými úrovněmi.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Levní poskytovatelé

#### GLM-4.7 (Denní reset, 0,6 USD/1 milion)

1. Registrace: [Zhipu AI](https://open.bigmodel.cn/)
2. Získejte klíč API z kódovacího plánu
3. Nástěnka → Přidat klíč API: Poskytovatel: `glm` , klíč API: `your-key`

**Použití:** `glm/glm-4.7` — **Tip pro profesionály:** Coding Plan nabízí 3× kvótu za cenu 1/7! Resetovat denně v 10:00.

#### MiniMax M2.1 (5h reset, 0,20 $/1 milion)

1. Registrace: [MiniMax](https://www.minimax.io/)
2. Získat API klíč → Dashboard → Přidat API klíč

**Použití:** `minimax/MiniMax-M2.1` — **Tip pro profesionály:** Nejlevnější varianta pro dlouhý kontext (1 milion tokenů)!

#### Kimi K2 (paušální poplatek 9 dolarů měsíčně)

1. Odebírat: [Moonshot AI](https://platform.moonshot.ai/)
2. Získat API klíč → Dashboard → Přidat API klíč

**Použití:** `kimi/kimi-latest` — **Tip pro profesionály:** Fixní cena 9 $/měsíc za 10 milionů tokenů = efektivní náklady 0,90 $/1 milion!

### 🆓 Poskytovatelé ZDARMA

#### iFlow (8 modelů ZDARMA)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modely ZDARMA)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude ZDARMA)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombinace

### Příklad 1: Maximalizace předplatného → Levné zálohování

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Příklad 2: Pouze zdarma (nulové náklady)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Integrace s rozhraním příkazového řádku

### IDE kurzoru

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Upravit `~/.claude/config.json` :

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### CLI Codexu

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Upravit `~/.openclaw/openclaw.json` :

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Nebo použijte Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Pokračovat / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Nasazení

### Globální instalace npm (doporučeno)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
```

Rozhraní příkazového řádku automaticky načte `.env` z adresáře `~/.omniroute/.env` nebo `./.env` .

### Nasazení VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Nasazení PM2 (málo paměti)

Pro servery s omezenou pamětí RAM použijte možnost omezení paměti:

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

Vytvořte soubor `ecosystem.config.js` :

```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
```

### Přístavní dělník

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Informace o režimu integrovaném s hostitelem s binárními soubory CLI naleznete v části Docker v hlavní dokumentaci.

### Proměnné prostředí

Proměnná | Výchozí | Popis
--- | --- | ---
`JWT_SECRET` | `omniroute-default-secret-change-me` | Tajný klíč podpisu JWT ( **změna v produkčním prostředí** )
`INITIAL_PASSWORD` | `123456` | První přihlašovací heslo
`DATA_DIR` | `~/.omniroute` | Datový adresář (db, využití, protokoly)
`PORT` | výchozí nastavení rámce | Servisní port ( `20128` v příkladech)
`HOSTNAME` | výchozí nastavení rámce | Vázat hostitele (Docker má výchozí hodnotu `0.0.0.0` )
`NODE_ENV` | výchozí nastavení za běhu | Nastavení `production` pro nasazení
`BASE_URL` | `http://localhost:20128` | Interní základní URL na straně serveru
`CLOUD_URL` | `https://omniroute.dev` | Základní adresa URL koncového bodu synchronizace s cloudem
`API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Tajný klíč HMAC pro generované klíče API
`REQUIRE_API_KEY` | `false` | Vynutit klíč rozhraní Bearer API na `/v1/*`
`ENABLE_REQUEST_LOGS` | `false` | Povoluje protokolování požadavků/odpovědí
`AUTH_COOKIE_SECURE` | `false` | Vynutit soubor cookie `Secure` ověřování (za reverzní proxy HTTPS)
`OMNIROUTE_MEMORY_MB` | `512` | Limit haldy Node.js v MB
`PROMPT_CACHE_MAX_SIZE` | `50` | Maximální počet položek mezipaměti výzev
`SEMANTIC_CACHE_MAX_SIZE` | `100` | Maximální počet položek sémantické mezipaměti

Úplný přehled proměnných prostředí naleznete v souboru [README](../README.md) .

---

## 📊 Dostupné modely

<details>
<summary><b>Zobrazit všechny dostupné modely</b></summary>
</details>

**Claude Code ( `cc/` )** — Pro/Max: `cc/claude-opus-4-6` , `cc/claude-sonnet-4-5-20250929` , `cc/claude-haiku-4-5-20251001`

**Codex ( `cx/` )** — Plus/Pro: `cx/gpt-5.2-codex` , `cx/gpt-5.1-codex-max`

**Rozhraní příkazového řádku Gemini ( `gc/` )** — ZDARMA: `gc/gemini-3-flash-preview` , `gc/gemini-2.5-pro`

**GitHub Copilot ( `gh/` )** : `gh/gpt-5` , `gh/claude-4.5-sonnet`

**GLM ( `glm/` )** — 0,6 USD/1 milion: `glm/glm-4.7`

**MiniMax ( `minimax/` )** — 0,2 USD/1 milion: `minimax/MiniMax-M2.1`

**iFlow ( `if/` )** — ZDARMA: `if/kimi-k2-thinking` , `if/qwen3-coder-plus` , `if/deepseek-r1`

**Qwen ( `qw/` )** — ZDARMA: `qw/qwen3-coder-plus` , `qw/qwen3-coder-flash`

**Kiro ( `kr/` )** — ZDARMA: `kr/claude-sonnet-4.5` , `kr/claude-haiku-4.5`

**DeepSeek ( `ds/` )** : `ds/deepseek-chat` , `ds/deepseek-reasoner`

**Groq ( `groq/` )** : `groq/llama-3.3-70b-versatile` , `groq/llama-4-maverick-17b-128e-instruct`

**xAI ( `xai/` )** : `xai/grok-4` , `xai/grok-4-0709-fast-reasoning` , `xai/grok-code-mini`

**Mistral ( `mistral/` )** : `mistral/mistral-large-2501` , `mistral/codestral-2501`

**Zmatek ( `pplx/` )** : `pplx/sonar-pro` , `pplx/sonar`

**Společně AI ( `together/` )** : `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Umělá inteligence pro ohňostroje ( `fireworks/` )** : `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras ( `cerebras/` )** : `cerebras/llama-3.3-70b`

**Soudržnost ( `cohere/` )** : `cohere/command-r-plus-08-2024`

**NVIDIA NIM ( `nvidia/` )** : `nvidia/nvidia/llama-3.3-70b-instruct`




---

## 🧩 Pokročilé funkce

### Vlastní modely

Přidejte libovolné ID modelu k libovolnému poskytovateli bez čekání na aktualizaci aplikace:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Nebo použijte Dashboard: **Poskytovatelé → [Poskytovatel] → Vlastní modely** .

### Vyhrazené trasy poskytovatelů

Směrování požadavků přímo ke konkrétnímu poskytovateli s validací modelu:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Pokud chybí prefix poskytovatele, automaticky se přidá. Neshodné modely vrátí chybu `400` .

### Konfigurace síťového proxy serveru

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Priorita:** Specifická pro klíč → Specifická pro kombinaci → Specifická pro poskytovatele → Globální → Prostředí.

### API katalogu modelů

```bash
curl http://localhost:20128/api/models/catalog
```

Vrátí modely seskupené podle poskytovatele s typy ( `chat` , `embedding` , `image` ).

### Synchronizace s cloudem

- Synchronizace poskytovatelů, kombinací a nastavení napříč zařízeními
- Automatická synchronizace na pozadí s časovým limitem + rychlá ochrana proti selhání
- V produkčním prostředí preferovat `BASE_URL` / `CLOUD_URL` na straně serveru

### LLM Gateway Intelligence (fáze 9)

- **Sémantická mezipaměť** — Automaticky ukládá do mezipaměti nestreamované odpovědi s teplotou 0 (obejde se pomocí `X-OmniRoute-No-Cache: true` )
- **Request Idempotency** — Deduplikuje požadavky do 5 sekund pomocí hlavičky `Idempotency-Key` nebo `X-Request-Id`
- **Sledování průběhu** — `event: progress` prostřednictvím záhlaví `X-OmniRoute-Progress: true`

---

### Hřiště překladatelů

Přístup přes **Dashboard → Translator** . Ladění a vizualizace toho, jak OmniRoute překládá požadavky API mezi poskytovateli.

Režim | Účel
--- | ---
**Dětské hřiště** | Vyberte zdrojový/cílový formát, vložte požadavek a okamžitě si prohlédněte přeložený výstup
**Tester chatu** | Odesílejte zprávy živého chatu přes proxy a kontrolujte celý cyklus požadavku/odpovědi
**Zkušební stolice** | Spusťte dávkové testy napříč různými kombinacemi formátů pro ověření správnosti překladu
**Živý monitor** | Sledujte překlady v reálném čase, jak požadavky procházejí proxy serverem

**Případy použití:**

- Ladění, proč selhává určitá kombinace klienta/poskytovatele
- Ověřte, zda se tagy myšlení, volání nástrojů a systémové výzvy správně překládají.
- Porovnejte rozdíly ve formátech OpenAI, Claude, Gemini a Responses API

---

### Strategie směrování

Konfigurace přes **Dashboard → Nastavení → Routing** .

Strategie | Popis
--- | ---
**Nejprve vyplňte** | Používá účty podle priority – primární účet zpracovává všechny požadavky, dokud není k dispozici.
**Round Robin** | Cykluje mezi všemi účty s nastavitelným trvalým limitem (výchozí: 3 volání na účet)
**P2C (Síla dvou možností)** | Vybere 2 náhodné účty a nasměruje je k tomu zdravějšímu – vyvažuje zátěž s povědomím o zdraví
**Náhodný** | Náhodně vybere účet pro každý požadavek pomocí Fisher-Yatesova náhodného výběru.
**Nejméně používané** | Směruje k účtu s nejstarším časovým razítkem `lastUsedAt` a rovnoměrně rozděluje provoz.
**Optimalizované náklady** | Směruje k účtu s nejnižší prioritou a optimalizuje pro poskytovatele s nejnižšími náklady.

#### Aliasy zástupných znaků modelů

Vytvořte zástupné znaky pro přemapování názvů modelů:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Zástupné znaky podporují `*` (libovolný znak) a `?` (jeden znak).

#### Záložní řetězce

Definujte globální záložní řetězce, které platí pro všechny požadavky:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Odolnost a jističe

Konfigurace přes **Dashboard → Settings → Resilience** .

OmniRoute implementuje odolnost na úrovni poskytovatele se čtyřmi komponentami:

1. **Profily poskytovatelů** – Konfigurace pro jednotlivé poskytovatele pro:

    - Práh selhání (počet selhání před otevřením)
    - Doba zchlazení
    - Citlivost detekce limitu frekvence
    - Exponenciální backoff parametry

2. **Upravitelné limity rychlosti** – Výchozí nastavení na úrovni systému konfigurovatelná na řídicím panelu:

    - **Požadavky za minutu (RPM)** — Maximální počet požadavků za minutu na účet
    - **Minimální doba mezi požadavky** — Minimální mezera v milisekundách mezi požadavky
    - **Max. počet souběžných požadavků** — Maximální počet souběžných požadavků na účet
    - Klikněte na **Upravit** pro úpravu a poté **na Uložit** nebo **Zrušit** . Hodnoty se ukládají prostřednictvím rozhraní API pro odolnost.

3. **Jistič** – Sleduje poruchy u jednotlivých poskytovatelů a automaticky rozpojuje obvod, když je dosaženo prahové hodnoty:

    - **ZAVŘENO** (v pořádku) – Požadavky probíhají normálně.
    - **OTEVŘENO** — Poskytovatel je dočasně zablokován po opakovaných selháních
    - **HALF_OPEN** — Testování, zda se poskytovatel zotavil

4. **Zásady a uzamčené identifikátory** – Zobrazuje stav jističe a uzamčené identifikátory s možností vynuceného odemčení.

5. **Automatická detekce limitu rychlosti** – Monitoruje záhlaví `429` a `Retry-After` , aby se proaktivně zabránilo dosažení limitů rychlosti poskytovatele.

**Tip pro profesionály:** Pomocí tlačítka **Obnovit vše** vymažete všechny jističe a doby ochlazování, když se poskytovatel zotaví z výpadku.

---

### Export / import databáze

Správa záloh databáze se provádí v **nabídce Ovládací panel → Nastavení → Systém a úložiště** .

Akce | Popis
--- | ---
**Exportovat databázi** | Stáhne aktuální databázi SQLite jako soubor `.sqlite`
**Exportovat vše (.tar.gz)** | Stáhne kompletní zálohu včetně: databáze, nastavení, kombinací, připojení k poskytovatelům (bez přihlašovacích údajů) a metadat klíče API.
**Importovat databázi** | Nahrajte soubor `.sqlite` , který nahradí aktuální databázi. Záloha před importem se vytvoří automaticky.

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Ověření importu:** Importovaný soubor je ověřen z hlediska integrity (kontrola pragma SQLite), požadovaných tabulek ( `provider_connections` , `provider_nodes` , `combos` , `api_keys` ) a velikosti (max. 100 MB).

**Případy použití:**

- Migrace OmniRoute mezi počítači
- Vytvořte externí zálohy pro zotavení po havárii
- Sdílení konfigurací mezi členy týmu (exportovat vše → sdílet archiv)

---

### Ovládací panel nastavení

Stránka nastavení je pro snadnou navigaci uspořádána do 5 záložek:

Záložka | Obsah
--- | ---
**Zabezpečení** | Nastavení přihlášení/hesla, řízení přístupu k IP adrese, autorizace API pro `/models` a blokování poskytovatelů
**Směrování** | Globální strategie směrování (6 možností), aliasy zástupných znaků, záložní řetězce, kombinované výchozí hodnoty
**Odolnost** | Profily poskytovatelů, upravitelné limity sazeb, stav jističů, zásady a uzamčené identifikátory
**Umělá inteligence** | Konfigurace rozpočtu promyšleného projektu, globální vkládání promptu do systému, statistiky mezipaměti promptu
**Moderní** | Globální konfigurace proxy (HTTP/SOCKS5)

---

### Správa nákladů a rozpočtu

Přístup přes **Dashboard → Náklady** .

Záložka | Účel
--- | ---
**Rozpočet** | Nastavte limity útrat pro každý klíč API s denními/týdenními/měsíčními rozpočty a sledováním v reálném čase
**Ceny** | Zobrazení a úprava cenových položek modelu – cena za 1000 vstupních/výstupních tokenů na poskytovatele

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Sledování nákladů:** Každý požadavek zaznamenává využití tokenů a vypočítává náklady pomocí ceníkové tabulky. Rozdělení si můžete prohlédnout v **sekci Dashboard → Využití** podle poskytovatele, modelu a klíče API.

---

### Přepis zvuku

OmniRoute podporuje přepis zvuku prostřednictvím koncového bodu kompatibilního s OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Dostupní poskytovatelé: **Deepgram** ( `deepgram/` ), **AssemblyAI** ( `assemblyai/` ).

Podporované zvukové formáty: `mp3` , `wav` , `m4a` , `flac` , `ogg` , `webm` .

---

### Strategie kombinovaného vyvažování

Nastavte vyvažování jednotlivých kombinací v **nabídce Dashboard → Kombinace → Vytvořit/Upravit → Strategie** .

Strategie | Popis
--- | ---
**Round-Robin** | Postupně prochází modely
**Přednost** | Vždy se pokusí o první model; vrací se pouze v případě chyby.
**Náhodný** | Pro každý požadavek vybere náhodný model z komba
**Vážené** | Trasy proporcionálně na základě přiřazených vah pro každý model
**Nejméně používané** | Směruje k modelu s nejmenším počtem nedávných požadavků (používá kombinované metriky)
**Optimalizované z hlediska nákladů** | Trasy k nejlevnějšímu dostupnému modelu (používá ceník)

Globální výchozí hodnoty kombinací lze nastavit v **nabídce Dashboard → Settings → Routing → Combo Defaults** .

---

### Dashboard zdraví

Přístup přes **Dashboard → Stav** . Přehled stavu systému v reálném čase se 6 kartami:

Karta | Co to ukazuje
--- | ---
**Stav systému** | Doba provozuschopnosti, verze, využití paměti, datový adresář
**Zdraví poskytovatelů** | Stav jističe podle dodavatele (Zapnuto/Vypnuto/Napůl vypnuto)
**Limity sazeb** | Aktivní limit rychlosti cooldownů na účet se zbývajícím časem
**Aktivní výluky** | Poskytovatelé dočasně blokovaní politikou uzamčení
**Mezipaměť podpisů** | Statistiky mezipaměti pro deduplikaci (aktivní klíče, míra zásahů)
**Telemetrie latence** | Agregace latence p50/p95/p99 na poskytovatele

**Tip pro profesionály:** Stránka Zdraví se automaticky obnovuje každých 10 sekund. Pomocí karty jističe můžete zjistit, kteří poskytovatelé mají problémy.

---

## 🖥️ Desktopová aplikace (Electron)

OmniRoute je k dispozici jako nativní desktopová aplikace pro Windows, macOS a Linux.

### Instalace

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### Instalatéři budov

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Výstup → `electron/dist-electron/`

### Klíčové vlastnosti

Funkce | Popis
--- | ---
**Připravenost serveru** | Před zobrazením okna se dotazuje server (žádná prázdná obrazovka)
**Systémový zásobník** | Minimalizovat do zásobníku, změnit port, ukončit menu v zásobníku
**Správa přístavů** | Změna portu serveru z panelu úloh (automatické restartování serveru)
**Zásady zabezpečení obsahu** | Omezující CSP prostřednictvím záhlaví relace
**Jedna instance** | V daném okamžiku může běžet pouze jedna instance aplikace
**Offline režim** | Dodávaný server Next.js funguje bez internetu

### Proměnné prostředí

Proměnná | Výchozí | Popis
--- | --- | ---
`OMNIROUTE_PORT` | `20128` | Port serveru
`OMNIROUTE_MEMORY_MB` | `512` | Limit haldy Node.js (64–16384 MB)

📖 Úplná dokumentace: [`electron/README.md`](../electron/README.md)
