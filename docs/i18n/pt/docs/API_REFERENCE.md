# API Reference (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Referência completa para todos os endpoints da API OmniRoute.---

## Table of Contents

- [Conclusões de bate-papo](#conclusões de bate-papo)
- [Incorporações](#embeddings)
- [Geração de imagem](#geração de imagem)
- [Listar modelos](#lista-modelos)
- [Pontos finais de compatibilidade](#pontos finais de compatibilidade)
- [Cache Semântico](#cache-semântico)
- [Painel e gerenciamento](#painel--gerenciamento)
- [Processamento de solicitação](#processamento de solicitação)
- [Autenticação](#autenticação)---

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

| Cabeçalho                 | Direção     | Descrição                                                  |
| ------------------------- | ----------- | ---------------------------------------------------------- |
| `X-OmniRoute-No-Cache`    | Solicitação | Defina como `true` para ignorar o cache                    |
| `X-OmniRoute-Progress`    | Solicitação | Definido como `true` para eventos de progresso             |
| `X-Sessão-Id`             | Solicitação | Chave de sessão fixa para afinidade de sessão externa      |
| `x_session_id`            | Solicitação | Variante de sublinhado também aceita (HTTP direto)         |
| `Chave de Idempotência`   | Solicitação | Chave de desduplicação (janela 5s)                         |
| `X-Request-Id`            | Solicitação | Chave de desduplicação alternativa                         |
| `X-OmniRoute-Cache`       | Resposta    | `HIT` ou `MISS` (sem streaming)                            |
| `X-OmniRoute-Idempotente` | Resposta    | `true` se desduplicado                                     |
| `X-OmniRoute-Progress`    | Resposta    | `enabled` se o acompanhamento do progresso estiver ativado |
| `X-OmniRoute-Session-Id`  | Resposta    | ID de sessão efetivo usado pelo OmniRoute                  |

> Nota Nginx: se você depende de cabeçalhos de sublinhado (por exemplo `x_session_id`), habilite `underscores_in_headers on;`.---

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

Provedores disponíveis: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Provedores disponíveis: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Método | Caminho                       | Formato              |
| ------ | ----------------------------- | -------------------- | ----------------------------- |
| POSTAR | `/v1/chat/completions`        | OpenAI               |
| POSTAR | `/v1/mensagens`               | Antrópico            |
| POSTAR | `/v1/respostas`               | Respostas OpenAI     |
| POSTAR | `/v1/embeddings`              | OpenAI               |
| POSTAR | `/v1/imagens/gerações`        | OpenAI               |
| OBTER  | `/v1/modelos`                 | OpenAI               |
| POSTAR | `/v1/messages/count_tokens`   | Antrópico            |
| OBTER  | `/v1beta/modelos`             | Gêmeos               |
| POSTAR | `/v1beta/models/{...caminho}` | Gêmeos gera conteúdo |
| POSTAR | `/v1/api/chat`                | Ollama               | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

O prefixo do provedor é adicionado automaticamente se estiver ausente. Modelos incompatíveis retornam `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Exemplo de resposta:```json
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

| Ponto final | Método | Descrição |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | POSTAR | Entrar |
| `/api/auth/logout` | POSTAR | Sair |
| `/api/settings/require-login` | OBTER/COLOCAR | Alternar login necessário |### Provider Management

| Ponto final | Método | Descrição |
| ---------------------------- | --------------- | ------------------------ |
| `/api/provedores` | OBTER/POSTAR | Listar/criar provedores |
| `/api/provedores/[id]` | OBTER/COLOCAR/EXCLUIR | Gerenciar um provedor |
| `/api/providers/[id]/test` | POSTAR | Testar conexão do provedor |
| `/api/provedores/[id]/modelos` | OBTER | Listar modelos de provedores |
| `/api/provedores/validar` | POSTAR | Validar configuração do provedor |
| `/api/provider-nodes*` | Vários | Gerenciamento de nós de provedor |
| `/api/provider-models` | OBTER/POSTAR/EXCLUIR | Modelos personalizados |### OAuth Flows

| Ponto final | Método | Descrição |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[provedor]/[ação]` | Vários | OAuth específico do provedor |### Routing & Config

| Ponto final | Método | Descrição |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` | OBTER/POSTAR | Aliases de modelo |
| `/api/models/catálogo` | OBTER | Todos os modelos por fornecedor + tipo |
| `/api/combos*` | Vários | Gestão de combos |
| `/api/chaves*` | Vários | Gerenciamento de chaves API |
| `/api/preço` | OBTER | Preços do modelo |### Usage & Analytics

| Ponto final | Método | Descrição |
| --------------------------- | ------ | -------------------- |
| `/api/uso/histórico` | OBTER | Histórico de uso |
| `/api/usage/logs` | OBTER | Registros de uso |
| `/api/usage/request-logs` | OBTER | Logs em nível de solicitação |
| `/api/usage/[connectionId]` | OBTER | Uso por conexão |### Settings

| Ponto final | Método | Descrição |
| ------------------------------- | ------------- | ---------------------- |
| `/api/configurações` | OBTER/COLOCAR/PATCH | Configurações gerais |
| `/api/settings/proxy` | OBTER/COLOCAR | Configuração de proxy de rede |
| `/api/settings/proxy/test` | POSTAR | Testar conexão proxy |
| `/api/settings/ip-filtro` | OBTER/COLOCAR | Lista de permissões/lista de bloqueios de IP |
| `/api/settings/pensamento-orçamento` | OBTER/COLOCAR | Orçamento de token de raciocínio |
| `/api/settings/prompt do sistema` | OBTER/COLOCAR | Alerta do sistema global |### Monitoring

| Ponto final | Método | Descrição |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `/api/sessões` | OBTER | Acompanhamento de sessão ativa |
| `/api/limites de taxa` | OBTER | Limites de taxas por conta |
| `/api/monitoramento/saúde` | OBTER | Verificação de integridade + resumo do provedor (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | OBTER/EXCLUIR | Estatísticas de cache/limpar |### Backup & Export/Import

| Ponto final | Método | Descrição |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | OBTER | Listar backups disponíveis |
| `/api/db-backups` | COLOCAR | Crie um backup manual |
| `/api/db-backups` | POSTAR | Restaurar de um backup específico |
| `/api/db-backups/exportar` | OBTER | Baixe o banco de dados como arquivo .sqlite |
| `/api/db-backups/import` | POSTAR | Carregar arquivo .sqlite para substituir banco de dados |
| `/api/db-backups/exportAll` | OBTER | Baixe o backup completo como arquivo .tar.gz |### Cloud Sync

| Ponto final | Método | Descrição |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Vários | Operações de sincronização em nuvem |
| `/api/sync/initialize` | POSTAR | Inicializar sincronização |
| `/api/nuvem/*` | Vários | Gerenciamento de nuvem |### Tunnels

| Ponto final | Método | Descrição |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | OBTER | Leia o status de instalação/tempo de execução do Cloudflare Quick Tunnel para o painel |
| `/api/tunnels/cloudflared` | POSTAR | Habilitar ou desabilitar o Quick Tunnel Cloudflare (`action=enable/disable`) |### CLI Tools

| Ponto final | Método | Descrição |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | OBTER | Status CLI de Claude |
| `/api/cli-tools/codex-settings` | OBTER | Status da CLI do Codex |
| `/api/cli-tools/droid-settings` | OBTER | Status da CLI do Droid |
| `/api/cli-tools/openclaw-settings` | OBTER | Status da CLI do OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | OBTER | Tempo de execução CLI genérico |

As respostas CLI incluem: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Ponto final | Método | Descrição |
| ----------------- | ------ | ----------------------------------------------------------------------- |
| `/api/acp/agentes` | OBTER | Lista todos os agentes detectados (integrados + personalizados) com status |
| `/api/acp/agentes` | POSTAR | Adicionar agente personalizado ou atualizar cache de detecção |
| `/api/acp/agentes` | EXCLUIR | Remova um agente personalizado pelo parâmetro de consulta `id` |

A resposta GET inclui `agents[]` (id, nome, binário, versão, instalado, protocolo, isCustom) e `summary` (total, instalado, notFound, builtIn, customizado).### Resilience & Rate Limits

| Ponto final | Método | Descrição |
| ----------------------- | --------- | ------------------------------- |
| `/api/resiliência` | OBTER/PATCH | Obter/atualizar perfis de resiliência |
| `/api/resiliência/reset` | POSTAR | Reinicializar disjuntores |
| `/api/limites de taxa` | OBTER | Status do limite de taxa por conta |
| `/api/limite de taxa` | OBTER | Configuração de limite de taxa global |### Evals

| Ponto final | Método | Descrição |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | OBTER/POSTAR | Listar suítes de avaliação/executar avaliação |### Policies

| Ponto final | Método | Descrição |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | OBTER/POSTAR/EXCLUIR | Gerenciar políticas de roteamento |### Compliance

| Ponto final | Método | Descrição |
| --------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | OBTER | Registo de auditoria de conformidade (último N) |### v1beta (Gemini-Compatible)

| Ponto final | Método | Descrição |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/modelos` | OBTER | Listar modelos no formato Gemini |
| `/v1beta/models/{...caminho}` | POSTAR | Ponto de extremidade `generateContent` do Gemini |

Esses endpoints refletem o formato API do Gemini para clientes que esperam compatibilidade nativa do Gemini SDK.### Internal / System APIs

| Ponto final | Método | Descrição |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | OBTER | Verificação de inicialização do aplicativo (usada na primeira execução) |
| `/api/tags` | OBTER | Tags de modelo compatíveis com Ollama (para clientes Ollama) |
| `/api/restart` | POSTAR | Acionar reinicialização normal do servidor |
| `/api/desligamento` | POSTAR | Acionar o desligamento normal do servidor |

>**Observação:**Esses endpoints são usados ​​internamente pelo sistema ou para compatibilidade do cliente Ollama. Eles normalmente não são chamados pelos usuários finais.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transcreva arquivos de áudio usando Deepgram ou AssemblyAI.

**Solicitar:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Resposta:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Provedores suportados:**`deepgram/nova-3`, `assemblyai/best`.

**Formatos suportados:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Para clientes que usam o formato API do Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

As solicitações são traduzidas automaticamente entre o Ollama e os formatos internos.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Resposta:**```json
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

1. Cliente envia solicitação para `/v1/*`
2. O manipulador de rota chama `handleChat`, `handleEmbedding`, `handleAudioTranscription` ou `handleImageGeneration`
3. O modelo foi resolvido (provedor/modelo direto ou alias/combo)
4. Credenciais selecionadas do banco de dados local com filtragem de disponibilidade de conta
5. Para bate-papo: `handleChatCore` — detecção de formato, tradução, verificação de cache, verificação de idempotência
6. O executor do provedor envia uma solicitação upstream
7. Resposta traduzida de volta para o formato do cliente (chat) ou retornada como está (incorporações/imagens/áudio)
8. Uso/registro registrado
9. Fallback se aplica a erros de acordo com regras de combinação

Referência completa da arquitetura: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Rotas do painel (`/dashboard/*`) usam o cookie `auth_token`
- O login utiliza hash de senha salva; substituto para `INITIAL_PASSWORD`
- `requireLogin` alternável via `/api/settings/require-login`
- As rotas `/v1/*` requerem opcionalmente a chave da API do portador quando `REQUIRE_API_KEY=true`
