# Contributing to OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Obrigado pelo seu interesse em contribuir! Este guia cobre tudo que você precisa para começar.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (recomendado: 22 LTS) -**npm**10+ -**Idiota**### Clone & Install

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

Variáveis-chave para o desenvolvimento:

| Variável               | Padrão de desenvolvimento | Descrição                    |
| ---------------------- | ------------------------- | ---------------------------- | ---------------------- |
| `PORTO`                | `20128`                   | Porta do servidor            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | URL base para front-end      |
| `JWT_SECRET`           | (gerar acima)             | Segredo de assinatura do JWT |
| `INITIAL_PASSWORD`     | `MUDAR`                   | Senha do primeiro login      |
| `APP_LOG_LEVEL`        | `informações`             | Nível de detalhamento do log | ### Dashboard Settings |

O painel fornece opções de interface de usuário para recursos que também podem ser configurados por meio de variáveis de ambiente:

| Definir localização      | Alternar                      | Descrição                                       |
| ------------------------ | ----------------------------- | ----------------------------------------------- |
| Configurações → Avançado | Modo de depuração             | Habilitar logs de solicitação de depuração (IU) |
| Configurações → Geral    | Visibilidade da barra lateral | Mostrar/ocultar seções da barra lateral         |

Essas configurações são armazenadas no banco de dados e persistem durante as reinicializações, substituindo os padrões env var quando definidos.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URLs padrão:

-**Painel**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NUNCA confirme diretamente em `main`.**Sempre use ramificações de recursos.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Prefixo | Finalidade |
| ----------- | ------------------------- |
| `façanha/` | Novos recursos |
| `consertar/` | Bug fixes                 |
| `refatorar/` | Reestruturação do código |
| `docs/` | Mudanças na documentação |
| `teste/` | Adições/correções de teste |
| `tarefa/` | Ferramentas, CI, dependências |### Commit Messages

Siga [Compromissos Convencionais](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Escopos: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Notas de cobertura:

- `npm run test:coverage` mede a cobertura da fonte para o conjunto de testes de unidade principal, exclui `tests/**` e inclui `open-sse/**`
- As solicitações pull devem manter a cobertura geral em**60% ou mais**para extratos, linhas, funções e filiais
- Se um PR alterar o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, ele deverá adicionar ou atualizar testes automatizados no mesmo PR
- `npm run cobertura:report` imprime o relatório detalhado arquivo por arquivo da última execução de cobertura
- `npm run test:coverage:legacy` preserva a métrica mais antiga para comparação histórica
- Consulte `docs/COVERAGE_PLAN.md` para obter o roteiro de melhoria de cobertura em fases### Pull Request Requirements

Antes de abrir ou mesclar um PR:

- Execute `npm run test:unit`
- Execute `npm run test:coverage`
- Garantir que o portão de cobertura permaneça em**60%+**para todas as métricas
- Incluir os arquivos de teste alterados ou adicionados na descrição do PR quando o código de produção for alterado
- Verifique o resultado do SonarQube no PR quando os segredos do projeto são configurados no CI

Status atual do teste:**122 arquivos de teste de unidade**abrangendo:

- Provedores de tradutores e conversão de formatos
- Limitação de taxa, disjuntor e resiliência
- Cache semântico, idempotência, acompanhamento de progresso
- Operações e esquema de banco de dados (21 módulos de banco de dados)
- Fluxos e autenticação OAuth
- Validação de endpoint de API (Zod v4)
- Ferramentas de servidor MCP e aplicação de escopo
- Sistemas de memória e habilidades---

## Code Style

-**ESLint**— Execute `npm run lint` antes de confirmar -**Mais bonito**— Formatado automaticamente via `lint-staged` no commit (2 espaços, ponto e vírgula, aspas duplas, largura de 100 caracteres, vírgulas finais es5) -**TypeScript**— Todo o código `src/` usa `.ts`/`.tsx`; `open-sse/` usa `.ts`/`.js`; documento com TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint impõe `no-eval`, `no-implied-eval`, `no-new-func` -**Validação Zod**— Use esquemas Zod v4 para todas as validações de entrada de API -**Nomeação**: Arquivos = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE---

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

Adicione a `src/shared/constants/providers.ts` - validado por Zod no carregamento do módulo.### Step 2: Add Executor (if custom logic needed)

Crie o executor em `open-sse/executors/your-provider.ts` estendendo o executor base.### Step 3: Add Translator (if non-OpenAI format)

Crie tradutores de solicitação/resposta em `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Adicione credenciais OAuth em `src/lib/oauth/constants/oauth.ts` e serviço em `src/lib/oauth/services/`.### Step 5: Register Models

Adicione definições de modelo em `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Escreva testes unitários em `tests/unit/` cobrindo no mínimo:

- Cadastro de provedor
- Tradução de solicitação/resposta
- Tratamento de erros---

## Pull Request Checklist

- [] Testes aprovados (`npm test`)
- [] passagens de linting (`npm run lint`)
- [] Construção bem-sucedida (`npm run build`)
- [] Tipos TypeScript adicionados para novas funções e interfaces públicas
- [] Sem segredos codificados ou valores alternativos
- [] Todas as entradas validadas com esquemas Zod
- [] CHANGELOG atualizado (se houver alteração voltada ao usuário)
- [ ] Documentação atualizada (se aplicável)---

## Releasing

As versões são gerenciadas por meio do fluxo de trabalho `/generate-release`. Quando uma nova versão do GitHub é criada, o pacote é**publicado automaticamente no npm**por meio do GitHub Actions.---

## Getting Help

-**Arquitetura**: Consulte [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Referência da API**: Consulte [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problemas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: consulte `docs/adr/` para registros de decisões arquitetônicas
