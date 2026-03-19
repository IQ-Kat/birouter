# Přispívání k OmniRoute

Děkujeme za váš zájem o přispění! Tato příručka obsahuje vše, co potřebujete k zahájení.

---

## Nastavení vývoje

### Předpoklady

- **Node.js** 20+ (doporučeno: 22 LTS)
- **npm** 10+
- **Git**

### Klonovat a instalovat

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Proměnné prostředí

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Klíčové proměnné pro vývoj:

Proměnná | Výchozí nastavení pro vývoj | Popis
--- | --- | ---
`PORT` | `3000` | Port serveru
`NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Základní URL pro frontend
`JWT_SECRET` | (vygenerovat výše) | Tajemství podpisu JWT
`INITIAL_PASSWORD` | `123456` | První přihlašovací heslo
`ENABLE_REQUEST_LOGS` | `false` | Povolit protokoly požadavků na ladění

### Spuštěno lokálně

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Výchozí adresy URL:

- **Dashboard** : `http://localhost:3000/dashboard`
- **API** : `http://localhost:3000/v1`

---

## Pracovní postup Gitu

> ⚠️ **NIKDY se necommitujte přímo do `main` .** Vždy používejte větve feature.

```bash
git checkout -b feat/your-feature-name
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open a Pull Request on GitHub
```

### Pojmenování poboček

Předpona | Účel
--- | ---
`feat/` | Nové funkce
`fix/` | Opravy chyb
`refactor/` | Restrukturalizace kódu
`docs/` | Změny dokumentace
`test/` | Doplnění/opravy testů
`chore/` | Nástroje, CI, závislosti

### Zprávy o potvrzení

Postupujte podle [konvenčních commitů](https://www.conventionalcommits.org/) :

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Rozsahy: `db` , `sse` , `oauth` , `dashboard` , `api` , `cli` , `docker` , `ci` .

---

## Spouštění testů

```bash
# All unit tests
npm test
npm run test:unit

# Specific test suites
npm run test:security     # Security tests
npm run test:fixes        # Fix verification tests

# With coverage
npm run test:coverage

# E2E tests (requires Playwright)
npm run test:e2e

# Lint + format check
npm run lint
npm run check
```

Aktuální stav testování: **368+ jednotkových testů** zahrnujících:

- Poskytovatelé překladů a konverze formátů
- Omezení rychlosti, jistič a odolnost
- Sémantická mezipaměť, idempotence, sledování průběhu
- Databázové operace a schéma
- Toky a ověřování OAuth
- Ověření koncového bodu API

---

## Styl kódu

- **ESLint** — Spustí `npm run lint` před commitem
- **Hezčí** – Automaticky naformátováno pomocí `lint-staged` při commitu
- **TypeScript** — Veškerý kód `src/` používá `.ts` / `.tsx` ; dokument s TSDoc ( `@param` , `@returns` , `@throws` )
- **No `eval()`** — ESLint vynucuje `no-eval` , `no-implied-eval` , `no-new-func`
- **Ověření Zod** — Použití schémat Zod pro ověřování vstupu API

---

## Struktura projektu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard pages (.tsx)
│   ├── api/                # API routes (.ts)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Domain types and response helpers (.ts)
├── lib/                    # Core business logic (.ts)
│   ├── db/                 # SQLite database layer
│   ├── oauth/              # OAuth services per provider
│   ├── cacheLayer.ts       # LRU cache
│   ├── semanticCache.ts    # Semantic response cache
│   ├── idempotencyLayer.ts # Request deduplication
│   └── localDb.ts          # Settings facade (LowDB for config, SQLite for domain data)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── middleware/          # Correlation IDs, etc.
│   ├── utils/              # Circuit breaker, sanitizer, etc.
│   └── validation/         # Zod schemas
└── sse/                    # SSE chat handlers (.ts)

open-sse/                   # @omniroute/open-sse workspace (JavaScript)
├── handlers/               # chatCore.js — main request handler
├── services/               # Rate limit, fallback
├── translators/            # Format converters (OpenAI ↔ Claude ↔ Gemini)
└── utils/                  # Progress tracker, stream helpers

tests/
├── unit/                   # Node.js test runner (.test.mjs)
└── e2e/                    # Playwright tests

docs/                       # Documentation
├── USER_GUIDE.md           # Provider setup, CLI integration
├── API_REFERENCE.md        # All endpoints
├── TROUBLESHOOTING.md      # Common issues
├── ARCHITECTURE.md         # System architecture
└── adr/                    # Architecture Decision Records
```

---

## Přidání nového poskytovatele

### Krok 1: Služba OAuth (pokud používáte OAuth)

Vytvořte `src/lib/oauth/services/your-provider.ts` rozšiřující `OAuthService` :

```typescript
import { OAuthService } from "../OAuthService";

export class YourProviderService extends OAuthService {
  constructor() {
    super({
      name: "your-provider",
      authUrl: "https://provider.com/oauth/authorize",
      tokenUrl: "https://provider.com/oauth/token",
      clientId: "...",
      scopes: ["..."],
    });
  }
}
```

### Krok 2: Registrace poskytovatele

Přidat do `src/lib/oauth/providers.ts` :

```typescript
import { YourProviderService } from "./services/your-provider";
// Add to the providers map
```

### Krok 3: Přidání konstant

Přidejte konstanty poskytovatele do `src/lib/providerConstants.ts` :

- Předpona poskytovatele (např. `yp/` )
- Výchozí modely
- Informace o cenách

### Krok 4: Přidání překladače (pokud se nejedná o formát OpenAI)

Pokud poskytovatel používá vlastní formát API, vytvořte překladač v `open-sse/translators/` .

### Krok 5: Přidání časového limitu

Přidejte konfiguraci časového limitu požadavku do `src/shared/utils/requestTimeout.ts` .

### Krok 6: Přidání testů

Pište jednotkové testy v `tests/unit/` které pokrývají minimálně:

- Registrace poskytovatele
- Překlad žádostí/odpovědí
- Ošetření chyb

---

## Kontrolní seznam žádostí o natažení

- [ ] Testy prošly ( `npm test` )
- [ ] Průchody pro linting ( `npm run lint` )
- [ ] Sestavení proběhlo úspěšně ( `npm run build` )
- [ ] Pro nové veřejné funkce a rozhraní přidány typy TypeScript
- [ ] Žádné pevně zakódované tajné kódy ani záložní hodnoty
- [ ] Aktualizován CHANGELOG (pokud se změna týká uživatele)
- [ ] Aktualizovaná dokumentace (pokud je to relevantní)

---

## Uvolnění

Když je vytvořena nová verze GitHubu (např. `v0.4.0` ), balíček je **automaticky publikován do npm** prostřednictvím akcí GitHubu:

```bash
gh release create v0.4.0 --title "v0.4.0" --generate-notes
```

---

## Získání pomoci

- **Architektura** : Viz [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Problémy** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR** : Viz `docs/adr/`
