# API Reference (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Referencia completa para todos los puntos finales de la API de OmniRoute.---

## Table of Contents

- [Finalizaciones del chat](#finalizaciones del chat)
- [Incrustaciones](#incrustaciones)
- [Generación de imágenes](#generación de imágenes)
- [Lista de modelos](#lista-modelos)
- [Puntos finales de compatibilidad](#puntos finales de compatibilidad)
- [Caché semántica](#caché-semántica)
- [Panel y administración](#dashboard--administración)
- [Procesamiento de solicitud](#procesamiento de solicitud)
- [Autenticación](#autenticación)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| Encabezado                  | Dirección | Descripción                                                |
| --------------------------- | --------- | ---------------------------------------------------------- |
| `X-OmniRoute-Sin-Cache`     | Solicitar | Establecer en "verdadero" para omitir el caché             |
| `X-OmniRoute-Progreso`      | Solicitar | Establecer en "verdadero" para eventos de progreso         |
| `Id. de sesión X`           | Solicitar | Clave de sesión fija para afinidad de sesión externa       |
| `x_session_id`              | Solicitar | También se acepta la variante de guión bajo (HTTP directo) |
| `Clave de idempotencia`     | Solicitar | Clave de desduplicación (ventana 5s)                       |
| `Id. de solicitud X`        | Solicitar | Clave de desduplicación alternativa                        |
| `X-OmniRoute-Cache`         | Respuesta | `HIT` o `MISS` (sin transmisión)                           |
| `X-OmniRoute-Idempotente`   | Respuesta | `verdadero` si está deduplicado                            |
| `X-OmniRoute-Progreso`      | Respuesta | `habilitado` si el seguimiento del progreso está activado  |
| `Id. de sesión-X-OmniRoute` | Respuesta | ID de sesión efectiva utilizada por OmniRoute              |

> Nota de Nginx: si confía en encabezados de subrayado (por ejemplo, `x_session_id`), habilite `underscores_in_headers on;`.---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Proveedores disponibles: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

Proveedores disponibles: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| Método   | Camino                      | Formato                  |
| -------- | --------------------------- | ------------------------ | ----------------------------- |
| PUBLICAR | `/v1/chat/compleciones`     | Abierta AI               |
| PUBLICAR | `/v1/mensajes`              | Antrópico                |
| PUBLICAR | `/v1/respuestas`            | Respuestas de OpenAI     |
| PUBLICAR | `/v1/incrustaciones`        | Abierta AI               |
| PUBLICAR | `/v1/imagenes/generaciones` | Abierta AI               |
| OBTENER  | `/v1/modelos`               | Abierta AI               |
| PUBLICAR | `/v1/mensajes/count_tokens` | Antrópico                |
| OBTENER  | `/v1beta/modelos`           | Géminis                  |
| PUBLICAR | `/v1beta/modelos/{...ruta}` | Géminis genera contenido |
| PUBLICAR | `/v1/api/chat`              | Ollamá                   | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

El prefijo del proveedor se agrega automáticamente si falta. Los modelos que no coinciden devuelven "400".---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Ejemplo de respuesta:```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

| Punto final | Método | Descripción |
| ----------------------- | ------- | --------------------- |
| `/api/auth/login` | PUBLICAR | Iniciar sesión |
| `/api/auth/cerrar sesión` | PUBLICAR | Cerrar sesión |
| `/api/settings/require-login` | OBTENER/PONER | Alternar inicio de sesión requerido |### Provider Management

| Punto final | Método | Descripción |
| ---------------------------- | --------------- | ------------------------ |
| `/api/proveedores` | OBTENER/PUBLICAR | Listar/crear proveedores |
| `/api/proveedores/[id]` | OBTENER/PONER/ELIMINAR | Gestionar un proveedor |
| `/api/proveedores/[id]/prueba` | PUBLICAR | Conexión del proveedor de pruebas |
| `/api/proveedores/[id]/modelos` | OBTENER | Listar modelos de proveedores |
| `/api/proveedores/validar` | PUBLICAR | Validar configuración del proveedor |
| `/api/nodos-proveedor*` | Varios | Gestión de nodos de proveedores |
| `/api/modelos-proveedor` | OBTENER/PUBLICAR/ELIMINAR | Modelos personalizados |### OAuth Flows

| Punto final | Método | Descripción |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[proveedor]/[acción]` | Varios | OAuth específico del proveedor |### Routing & Config

| Punto final | Método | Descripción |
| --------------------- | -------- | ----------------------- |
| `/api/modelos/alias` | OBTENER/PUBLICAR | Alias ​​de modelos |
| `/api/modelos/catalogo` | OBTENER | Todos los modelos por proveedor + tipo |
| `/api/combos*` | Varios | Gestión combinada |
| `/api/claves*` | Varios | Gestión de claves API |
| `/api/precios` | OBTENER | Precios del modelo |### Usage & Analytics

| Punto final | Método | Descripción |
| --------------------------- | ------ | -------------------- |
| `/api/uso/historial` | OBTENER | Historial de uso |
| `/api/uso/logs` | OBTENER | Registros de uso |
| `/api/usage/request-logs` | OBTENER | Registros a nivel de solicitud |
| `/api/uso/[ID de conexión]` | OBTENER | Uso por conexión |### Settings

| Punto final | Método | Descripción |
| ------------------------------- | ------------- | ---------------------- |
| `/api/configuración` | OBTENER/PONER/PARCHE | Configuraciones generales |
| `/api/configuración/proxy` | OBTENER/PONER | Configuración de proxy de red |
| `/api/configuración/proxy/prueba` | PUBLICAR | Probar conexión proxy |
| `/api/settings/ip-filter` | OBTENER/PONER | Lista de IP permitidas/lista de bloqueo |
| `/api/settings/thinking-budget` | OBTENER/PONER | Presupuesto simbólico de razonamiento |
| `/api/configuración/sistema-prompt` | OBTENER/PONER | Aviso del sistema global |### Monitoring

| Punto final | Método | Descripción |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `/api/sesiones` | OBTENER | Seguimiento de sesión activa |
| `/api/límites de velocidad` | OBTENER | Límites de tasas por cuenta |
| `/api/monitoreo/salud` | OBTENER | Comprobación de estado + resumen del proveedor (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/estadísticas` | OBTENER/ELIMINAR | Estadísticas de caché / borrar |### Backup & Export/Import

| Punto final | Método | Descripción |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | OBTENER | Listar copias de seguridad disponibles |
| `/api/db-backups` | PONER | Crear una copia de seguridad manual |
| `/api/db-backups` | PUBLICAR | Restaurar desde una copia de seguridad específica |
| `/api/db-backups/export` | OBTENER | Descargar la base de datos como archivo .sqlite |
| `/api/db-backups/import` | PUBLICAR | Cargue el archivo .sqlite para reemplazar la base de datos |
| `/api/db-backups/exportAll` | OBTENER | Descargue la copia de seguridad completa como archivo .tar.gz |### Cloud Sync

| Punto final | Método | Descripción |
| ---------------------- | ------- | --------------------- |
| `/api/sync/nube` | Varios | Operaciones de sincronización en la nube |
| `/api/sync/inicializar` | PUBLICAR | Inicializar sincronización |
| `/api/nube/*` | Varios | Gestión de la nube |### Tunnels

| Punto final | Método | Descripción |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | OBTENER | Lea el estado de instalación/tiempo de ejecución de Cloudflare Quick Tunnel para el panel |
| `/api/tunnels/cloudflared` | PUBLICAR | Habilite o deshabilite el túnel rápido de Cloudflare (`action=enable/disable`) |### CLI Tools

| Punto final | Método | Descripción |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | OBTENER | Estado de Claude CLI |
| `/api/cli-tools/codex-settings` | OBTENER | Estado de la CLI del Códice |
| `/api/cli-tools/droid-settings` | OBTENER | Estado de la CLI del droide |
| `/api/cli-tools/openclaw-settings` | OBTENER | Estado de la CLI de OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | OBTENER | Tiempo de ejecución de CLI genérico |

Las respuestas de la CLI incluyen: `instalado`, `ejecutable`, `comando`, `commandPath`, `runtimeMode`, `motivo`.### ACP Agents

| Punto final | Método | Descripción |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agentes` | OBTENER | Enumere todos los agentes detectados (integrados + personalizados) con estado |
| `/api/acp/agentes` | PUBLICAR | Agregar agente personalizado o actualizar caché de detección |
| `/api/acp/agentes` | BORRAR | Eliminar un agente personalizado mediante el parámetro de consulta `id` |

La respuesta GET incluye `agentes[]` (id, nombre, binario, versión, instalado, protocolo, isCustom) y `summary` (total, instalado, notFound, incorporado, personalizado).### Resilience & Rate Limits

| Punto final | Método | Descripción |
| ----------------------- | --------- | ------------------------------- |
| `/api/resiliencia` | OBTENER/PARCHE | Obtener/actualizar perfiles de resiliencia |
| `/api/resiliencia/reset` | PUBLICAR | Restablecer disyuntores |
| `/api/límites de velocidad` | OBTENER | Estado del límite de tasa por cuenta |
| `/api/límite-tasa` | OBTENER | Configuración del límite de tasa global |### Evals

| Punto final | Método | Descripción |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | OBTENER/PUBLICAR | Listar conjuntos de evaluación/ejecutar evaluación |### Policies

| Punto final | Método | Descripción |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | OBTENER/PUBLICAR/ELIMINAR | Administrar políticas de enrutamiento |### Compliance

| Punto final | Método | Descripción |
| --------------------------- | ------ | ----------------------- |
| `/api/compliance/audit-log` | OBTENER | Registro de auditoría de cumplimiento (último N) |### v1beta (Gemini-Compatible)

| Punto final | Método | Descripción |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/modelos` | OBTENER | Listar modelos en formato Gemini |
| `/v1beta/modelos/{...ruta}` | PUBLICAR | Punto final Gemini `generateContent` |

Estos puntos finales reflejan el formato API de Gemini para clientes que esperan compatibilidad nativa con el SDK de Gemini.### Internal / System APIs

| Punto final | Método | Descripción |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | OBTENER | Comprobación de inicialización de la aplicación (utilizada en la primera ejecución) |
| `/api/etiquetas` | OBTENER | Etiquetas de modelo compatibles con Ollama (para clientes de Ollama) |
| `/api/reiniciar` | PUBLICAR | Activar reinicio ordenado del servidor |
| `/api/apagar` | PUBLICAR | Activar el cierre ordenado del servidor |

>**Nota:**Estos puntos finales se utilizan internamente por el sistema o para la compatibilidad del cliente Ollama. Por lo general, los usuarios finales no los llaman.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transcribe archivos de audio usando Deepgram o AssemblyAI.

**Pedido:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Respuesta:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Proveedores compatibles:**`deepgram/nova-3`, `assemblyai/best`.

**Formatos admitidos:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Para clientes que utilizan el formato API de Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Las solicitudes se traducen automáticamente entre Ollama y los formatos internos.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Respuesta:**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. El cliente envía la solicitud a `/v1/*`
2. El controlador de ruta llama a `handleChat`, `handleEmbedding`, `handleAudioTranscription` o `handleImageGeneration`
3. Se resuelve el modelo (proveedor directo/modelo o alias/combo)
4. Credenciales seleccionadas de la base de datos local con filtrado de disponibilidad de cuenta
5. Para chat: `handleChatCore`: detección de formato, traducción, verificación de caché, verificación de idempotencia
6. El ejecutor del proveedor envía una solicitud ascendente
7. Respuesta traducida al formato del cliente (chat) o devuelta tal como está (incrustaciones/imágenes/audio)
8. Uso/registro registrado
9. El respaldo se aplica en caso de errores de acuerdo con las reglas combinadas.

Referencia de arquitectura completa: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Las rutas del panel (`/dashboard/*`) usan la cookie `auth_token`
- El inicio de sesión utiliza el hash de contraseña guardado; recurrir a `INITIAL_PASSWORD`
- `requireLogin` se puede alternar a través de `/api/settings/require-login`
- Las rutas `/v1/*` opcionalmente requieren una clave API de portador cuando `REQUIRE_API_KEY=true`
