# Contributing to OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

¡Gracias por tu interés en contribuir! Esta guía cubre todo lo que necesita para comenzar.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (recomendado: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Variables claves para el desarrollo:

| Variables              | Predeterminado de Desarrollo | Descripción                            |
| ---------------------- | ---------------------------- | -------------------------------------- | ---------------------- |
| `PUERTO`               | `20128`                      | Puerto del servidor                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | URL base para la interfaz              |
| `JWT_SECRET`           | (generar arriba)             | Secreto de firma de JWT                |
| `CONTRASEÑA_INITIAL`   | `CAMBIAME`                   | Primera contraseña de inicio de sesión |
| `APP_LOG_LEVEL`        | `información`                | Nivel de detalle del registro          | ### Dashboard Settings |

El panel proporciona alternancias de interfaz de usuario para funciones que también se pueden configurar mediante variables de entorno:

| Configuración de ubicación | Alternar                        | Descripción                                           |
| -------------------------- | ------------------------------- | ----------------------------------------------------- |
| Configuración → Avanzado   | Modo de depuración              | Habilitar registros de solicitudes de depuración (UI) |
| Configuración → General    | Visibilidad de la barra lateral | Mostrar/ocultar secciones de la barra lateral         |

Estas configuraciones se almacenan en la base de datos y persisten durante los reinicios, anulando los valores predeterminados de env var cuando se configuran.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL predeterminadas:

-**Panel**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NUNCA te comprometas directamente con `principal`.**Utilice siempre ramas de funciones.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Prefijo | Propósito |
| ----------- | ------------------------- |
| `hazaña/` | Nuevas características |
| `arreglar/` | Corrección de errores |
| `refactorizar/` | Reestructuración del código |
| `docs/` | Cambios en la documentación |
| `prueba/` | Adiciones/correcciones de prueba |
| `tarea/` | Herramientas, CI, dependencias |### Commit Messages

Siga [Compromisos convencionales](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Alcances: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

- `npm run test:coverage` mide la cobertura de origen para el conjunto de pruebas unitarias principal, excluye `tests/**` e incluye `open-sse/**`
- Las solicitudes de extracción deben mantener el umbral de cobertura general en**60% o más**para extractos, líneas, funciones y sucursales.
- Si un PR cambia el código de producción en `src/`, `open-sse/`, `electron/` o `bin/`, debe agregar o actualizar pruebas automatizadas en el mismo PR
- `npm run cover:report` imprime el informe detallado archivo por archivo de la última ejecución de cobertura
- `npm run test:coverage:legacy` conserva la métrica anterior para la comparación histórica
- Consulte `docs/COVERAGE_PLAN.md` para conocer la hoja de ruta de mejora de la cobertura por fases.### Pull Request Requirements

Antes de abrir o fusionar un PR:

- Ejecute `npm run test:unit`
- Ejecute `npm run test:cobertura`
- Asegúrese de que el umbral de cobertura se mantenga en**60 %+**para todas las métricas.
- Incluir los archivos de prueba modificados o agregados en la descripción de PR cuando se modificó el código de producción.
- Verifique el resultado de SonarQube en el PR cuando los secretos del proyecto están configurados en CI

Estado de prueba actual:**122 archivos de prueba unitaria**que cubren:

- Traductores de proveedores y conversión de formatos.
- Limitación de velocidad, disyuntor y resiliencia.
- Caché semántica, idempotencia, seguimiento del progreso.
- Operaciones y esquema de base de datos (21 módulos de base de datos)
- Flujos y autenticación de OAuth
- Validación de puntos finales API (Zod v4)
- Herramientas del servidor MCP y aplicación del alcance.
- Sistemas de Memoria y Habilidades---

## Code Style

-**ESLint**— Ejecute `npm run lint` antes de confirmar -**Más bonito**: formato automático mediante `lint-staged` al confirmar (2 espacios, punto y coma, comillas dobles, 100 caracteres de ancho, comas al final de es5) -**TypeScript**— Todo el código `src/` usa `.ts`/`.tsx`; `open-sse/` usa `.ts`/`.js`; documento con TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint aplica `no-eval`, `no-implied-eval`, `no-new-func` -**Validación de Zod**: use esquemas Zod v4 para toda la validación de entrada de API -**Nombramiento**: Archivos = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE---

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

Agregar a `src/shared/constants/providers.ts`: validado por Zod al cargar el módulo.### Step 2: Add Executor (if custom logic needed)

Cree un ejecutor en `open-sse/executors/your-provider.ts` extendiendo el ejecutor base.### Step 3: Add Translator (if non-OpenAI format)

Cree traductores de solicitud/respuesta en `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Agregue las credenciales de OAuth en `src/lib/oauth/constants/oauth.ts` y el servicio en `src/lib/oauth/services/`.### Step 5: Register Models

Agregue definiciones de modelo en `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Escriba pruebas unitarias en `tests/unit/` que cubran como mínimo:

- Registro de proveedor
- Traducción de solicitud/respuesta
- Manejo de errores---

## Pull Request Checklist

- [] Las pruebas pasan (`npm test`)
- [] Pases de Linting (`npm run lint`)
- [] La compilación se realizó correctamente (`npm run build`)
- [] Tipos de TypeScript agregados para nuevas funciones e interfaces públicas
- [] Sin secretos codificados ni valores alternativos
- [] Todas las entradas validadas con esquemas Zod
- [] CHANGELOG actualizado (si el cambio es de cara al usuario)
- [ ] Documentación actualizada (si aplica)---

## Releasing

Los lanzamientos se gestionan a través del flujo de trabajo `/generate-release`. Cuando se crea una nueva versión de GitHub, el paquete se**publica automáticamente en npm**a través de GitHub Actions.---

## Getting Help

-**Arquitectura**: Ver [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Referencia de API**: consulte [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problemas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: consulte `docs/adr/` para obtener registros de decisiones arquitectónicas.
