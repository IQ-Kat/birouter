# Troubleshooting (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Problemas e soluções comuns para OmniRoute.---

## Quick Fixes

| Problema                                  | Solução                                                                                |
| ----------------------------------------- | -------------------------------------------------------------------------------------- | --- |
| O primeiro login não funciona             | Defina `INITIAL_PASSWORD` em `.env` (sem padrão codificado)                            |
| Painel abre na porta errada               | Defina `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                    |
| Nenhum registro de solicitação em `logs/` | Definir `ENABLE_REQUEST_LOGS=true`                                                     |
| EACCES: permissão negada                  | Defina `DATA_DIR=/path/to/writable/dir` para substituir `~/.omniroute`                 |
| Estratégia de roteamento não salva        | Atualização para v1.4.11+ (correção do esquema Zod para persistência de configurações) | --- |

## Provider Issues

### "Language model did not provide messages"

**Causa:**Cota do provedor esgotada.

**Correção:**

1. Verifique o rastreador de cota do painel
2. Use um combo com níveis alternativos
3. Mude para um nível mais barato/gratuito### Rate Limiting

**Causa:**Cota de assinatura esgotada.

**Correção:**

- Adicionar substituto: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Use GLM/MiniMax como backup barato### OAuth Token Expired

OmniRoute atualiza automaticamente os tokens. Se os problemas persistirem:

1. Painel → Provedor → Reconectar
2. Exclua e adicione novamente a conexão do provedor---

## Cloud Issues

### Cloud Sync Errors

1. Verifique se `BASE_URL` aponta para sua instância em execução (por exemplo, `http://localhost:20128`)
2. Verifique os pontos `CLOUD_URL` para o seu endpoint de nuvem (por exemplo, `https://omniroute.dev`)
3. Mantenha os valores `NEXT_PUBLIC_*` alinhados com os valores do lado do servidor### Cloud `stream=false` Returns 500

**Sintoma:**`Token inesperado 'd'...` no endpoint da nuvem para chamadas sem streaming.

**Causa:**O upstream retorna a carga SSE enquanto o cliente espera JSON.

**Solução alternativa:**use `stream=true` para chamadas diretas na nuvem. O tempo de execução local inclui substituto SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Crie uma nova chave no painel local (`/api/keys`)
2. Execute a sincronização na nuvem: Habilite Nuvem → Sincronizar agora
3. Chaves antigas/não sincronizadas ainda podem retornar `401` na nuvem---

## Docker Issues

### CLI Tool Shows Not Installed

1. Verifique os campos de tempo de execução: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para modo portátil: use o destino de imagem `runner-cli` (CLIs agrupados)
3. Para o modo de montagem do host: defina `CLI_EXTRA_PATHS` e monte o diretório bin do host como somente leitura
4. Se `installed=true` e `runnable=false`: o binário foi encontrado, mas falhou na verificação de integridade### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Verifique as estatísticas de uso em Painel → Uso
2. Mude o modelo primário para GLM/MiniMax
3. Use o nível gratuito (Gemini CLI, Qoder) para tarefas não críticas
4. Defina orçamentos de custos por chave de API: Painel → Chaves de API → Orçamento---

## Debugging

### Enable Request Logs

Defina `ENABLE_REQUEST_LOGS=true` em seu arquivo `.env`. Os logs aparecem no diretório `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Estado principal: `${DATA_DIR}/storage.sqlite` (provedores, combos, aliases, chaves, configurações)
- Uso: tabelas SQLite em `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opcionais `${DATA_DIR}/log.txt` e `${DATA_DIR}/call_logs/`
- Solicitar logs: `<repo>/logs/...` (quando `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Quando o disjuntor de um provedor está ABERTO, as solicitações são bloqueadas até que o tempo de espera expire.

**Correção:**

1. Vá para**Painel → Configurações → Resiliência**
2. Verifique a placa do disjuntor do provedor afetado
3. Clique em**Redefinir tudo**para limpar todos os disjuntores ou aguarde o tempo de espera expirar
4. Verifique se o provedor está realmente disponível antes de redefinir### Provider keeps tripping the circuit breaker

Se um provedor entrar repetidamente no estado OPEN:

1. Verifique**Dashboard → Health → Provider Health**para ver o padrão de falha
2. Vá para**Configurações → Resiliência → Perfis do Provedor**e aumente o limite de falha
3. Verifique se o provedor alterou os limites da API ou requer nova autenticação
4. Revise a telemetria de latência – alta latência pode causar falhas baseadas em tempo limite---

## Audio Transcription Issues

### "Unsupported model" error

- Certifique-se de usar o prefixo correto: `deepgram/nova-3` ou `assemblyai/best`
- Verifique se o provedor está conectado em**Painel → Provedores**### Transcription returns empty or fails

- Verifique os formatos de áudio suportados: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verifique se o tamanho do arquivo está dentro dos limites do provedor (normalmente <25 MB)
- Verifique a validade da chave API do provedor no cartão do provedor---

## Translator Debugging

Use**Dashboard → Tradutor**para depurar problemas de tradução de formato:

| Modo                      | Quando usar                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Parque Infantil**       | Compare os formatos de entrada/saída lado a lado — cole uma solicitação com falha para ver como ela é traduzida |
| **Testador de bate-papo** | Envie mensagens ao vivo e inspecione a carga completa de solicitação/resposta, incluindo cabeçalhos             |
| **Banco de testes**       | Execute testes em lote em combinações de formatos para descobrir quais traduções estão quebradas                |
| **Monitoramento ao vivo** | Observe o fluxo de solicitações em tempo real para detectar problemas intermitentes de tradução                 | ### Common format issues |

-**Tags de pensamento não aparecem**— Verifique se o provedor alvo apoia o pensamento e a configuração do orçamento de pensamento -**Queda de chamadas de ferramentas**— Algumas traduções de formato podem remover campos não suportados; verificar no modo Playground -**Prompt do sistema ausente**— Claude e Gemini lidam com os prompts do sistema de maneira diferente; verifique o resultado da tradução -**SDK retorna string bruta em vez de objeto**— Corrigido na v1.1.0: o Response Sanitizer agora remove campos não padrão (`x_groq`, `usage_breakdown`, etc.) que causam falhas de validação do OpenAI SDK Pydantic -**GLM/ERNIE rejeita função `sistema`**— Corrigido na v1.1.0: o normalizador de função mescla automaticamente mensagens do sistema em mensagens do usuário para modelos incompatíveis -**função `developer` não reconhecida**— Corrigido na v1.1.0: convertido automaticamente para `system` para provedores não-OpenAI -**`json_schema` não funciona com Gemini**— Corrigido na v1.1.0: `response_format` agora é convertido para `responseMimeType` + `responseSchema` do Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- O limite automático de taxa se aplica apenas a provedores de chaves de API (não a OAuth/assinatura)
- Verifique se**Configurações → Resiliência → Perfis do Provedor**tem limite de taxa automática ativado
- Verifique se o provedor retorna códigos de status `429` ou cabeçalhos `Retry-After`### Tuning exponential backoff

Os perfis do provedor oferecem suporte a estas configurações:

-**Atraso base**— Tempo de espera inicial após a primeira falha (padrão: 1s) -**Atraso máximo**— Limite máximo de tempo de espera (padrão: 30s) -**Multiplicador**— Quanto aumentar o atraso por falha consecutiva (padrão: 2x)### Anti-thundering herd

Quando muitas solicitações simultâneas atingem um provedor com taxa limitada, o OmniRoute usa mutex + limitação automática de taxa para serializar solicitações e evitar falhas em cascata. Isso é automático para provedores de chaves de API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Alguns usuários do OmniRoute colocam o gateway na frente do RAG ou das pilhas de agentes. Nessas configurações é comum ver um padrão estranho: OmniRoute parece íntegro (provedores ativos, perfis de roteamento ok, sem alertas de limite de taxa), mas a resposta final ainda está errada.

Na prática, esses incidentes geralmente vêm do pipeline RAG downstream e não do gateway em si.

Se você deseja um vocabulário compartilhado para descrever essas falhas, você pode usar o WFGY ProblemMap, um recurso de texto de licença externa do MIT que define dezesseis padrões recorrentes de falha RAG/LLM. Em alto nível, abrange:

- desvio de recuperação e limites de contexto quebrados
- índices vazios ou obsoletos e armazenamentos de vetores
- incorporação versus incompatibilidade semântica
- problemas de montagem imediata e janela de contexto
- colapso lógico e respostas excessivamente confiantes
- falhas de coordenação de cadeia longa e de agente
- memória multiagente e desvio de função
- problemas de implantação e ordenação de bootstrap

A ideia é simples:

1. Ao investigar uma resposta incorreta, capture:
   - tarefa e solicitação do usuário
   - combinação de rota ou provedor no OmniRoute
   - qualquer contexto RAG usado posteriormente (documentos recuperados, chamadas de ferramentas, etc.)
2. Mapeie o incidente para um ou dois números do ProblemMap do WFGY (`No.1` … `No.16`).
3. Armazene o número em seu próprio painel, runbook ou rastreador de incidentes próximo aos logs do OmniRoute.
4. Use a página WFGY correspondente para decidir se você precisa alterar sua pilha RAG, recuperador ou estratégia de roteamento.

O texto completo e as receitas concretas estão aqui (licença MIT, somente texto):

[README do WFGY ProblemMap](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Você pode ignorar esta seção se não executar RAG ou pipelines de agente atrás do OmniRoute.---

## Still Stuck?

-**Problemas do GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arquitetura**: Consulte [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) para obter detalhes internos -**Referência de API**: Consulte [`docs/API_REFERENCE.md`](API_REFERENCE.md) para todos os endpoints -**Painel de saúde**: verifique**Painel → Saúde**para ver o status do sistema em tempo real -**Tradutor**: Use**Dashboard → Tradutor**para depurar problemas de formato
