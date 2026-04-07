# Changelog (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Loop de redirecionamento infinito resolvido no painel para novas instâncias quando requireLogin está desabilitado.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Integração nativa da API Qoder:**Refatoração completa do Qoder Executor para ignorar o algoritmo de criptografia legado COSY AES/RSA, roteando diretamente para o URL nativo compatível com DashScope OpenAi. Elimina dependências complexas em módulos `crypto` do Node enquanto melhora a fidelidade do stream. -**Revisão do mecanismo de resiliência:**substitutos graciosos de estouro de contexto integrado, detecção proativa de token OAuth e prevenção de emissão de conteúdo vazio (#990). -**Estratégia de roteamento otimizado para contexto:**Adicionado novo recurso de roteamento inteligente para maximizar nativamente janelas de contexto em implantações combinadas automatizadas (#990).### 🐛 Bug Fixes

-**Corrupção de fluxo de API de respostas:**Corrigida corrupção de clonagem profunda onde os limites de tradução Anthropic/OpenAI retiravam os prefixos SSE específicos de `response.` dos limites de streaming (#992). -**Alinhamento de passagem de cache Claude:**Marcadores de cache compatíveis com CC alinhados consistentemente com o modo de passagem de cliente upstream, preservando o cache de prompt. -**Vazamento de memória do Turbopack:**Fixado Next.js em `16.0.10` estrito, evitando vazamentos de memória e construção obsoleta a partir de regressões recentes do módulo hash do Turbopack upstream (# 987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integração Models.dev:**Models.dev integrado como fonte de tempo de execução oficial para preços, recursos e especificações de modelos, substituindo preços codificados. Inclui uma interface de usuário de configurações para gerenciar intervalos de sincronização, sequências de tradução para todos os 30 idiomas e cobertura robusta de testes. -**Recursos nativos do provedor:**Adicionado suporte para declarar e verificar recursos nativos da API (por exemplo, `systemInstructions_supported`) evitando falhas ao limpar funções inválidas. Atualmente configurado para provedores Gemini Base e Antigravity OAuth. -**Configurações avançadas do provedor de API:**Adicionadas substituições personalizadas de `User-Agent` por conexão para conexões de provedor de chave de API. A substituição é armazenada em `providerSpecificData.customUserAgent` e agora se aplica a testes de validação e solicitações de execução upstream.### 🐛 Bug Fixes

-**Confiabilidade Qwen OAuth:**Resolveu uma série de problemas de integração OAuth, incluindo um bloqueador de 400 Bad Request em tokens expirados, geração de fallback para análise de propriedades `access_token` do OIDC quando `id_token` é omitido, erros de descoberta de catálogo de modelo e filtragem rigorosa de cabeçalhos `X-Dashscope-*` para evitar rejeição 400 de endpoints compatíveis com OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo e roteamento:**Integração do ciclo de vida CRUD nativo concluída para o mecanismo avançado Auto-Combo (#955). -**Operações principais:**Corrigidas traduções ausentes para novas opções nativas de Auto-Combos (#955). -**Validação de segurança:**Tarefas de backup automático do SQLite desativadas nativamente durante a execução do CI de teste de unidade para resolver explicitamente vazamentos de memória suspensos do Node 22 Event Loop (#956). -**Proxies de ecossistema:**Programadores de sincronização de modelo de mapeamento de integração explícita concluídos, ciclos OAuth e atualizações de verificação de token com segurança por meio dos proxies upstream do sistema nativo do OmniRoute (#953). -**Extensibilidade MCP:**Adicionada e registrada com sucesso a nova ferramenta de estrutura MCP `omniroute_web_search` da versão beta para esquemas de produção (#951). -**Lógica de buffer de tokens:**Adicionados limites de configuração de tempo de execução estendendo buffers de token de entrada/saída configuráveis ​​para métricas precisas de rastreamento de uso (#959).### 🐛 Bug Fixes

-**Correção CodeQL:**Operações de indexação de strings críticas totalmente resolvidas e seguras, evitando heurísticas de indexação de matrizes Server-Side Request Forgery (SSRF) junto com retrocesso algorítmico polinomial (ReDoS) dentro de módulos de despachante de proxy profundo. -**Crypto Hashes:**Substituição de hashes fracos e não verificados do OAuth 1.0 por primitivos de validação padrão HMAC-SHA-256 robustos, garantindo controles de acesso rígidos. -**Proteção de limite de API:**Proteções de rota estrutural verificadas e mapeadas corretamente, aplicando uma lógica de middleware `isAuthenticated()` estrita, cobrindo endpoints dinâmicos mais recentes visando manipulação de configurações e carregamento de habilidades nativas. -**Compatibilidade com o ecossistema CLI:**Foram resolvidas ligações quebradas do analisador de tempo de execução nativo que travavam detectores de ambiente `where` estritamente sobre casos extremos `.cmd/.exe` normalmente para plug-ins externos (#969). -**Arquitetura de cache:**Cache da estrutura de layout dos parâmetros do painel de análise e configurações do sistema exato refatorado para manter ciclos de persistência de reidratação estáveis, resolvendo flashes de estado desalinhados visuais (#952). -**Padrões de cache Claude:**Marcadores de blocos efêmeros críticos normalizados e preservados com precisão e efêmeros, pedidos TTL em cache 'efêmero' para nós downstream, aplicando mapeamento de solicitações CC compatíveis com padrões de forma limpa, sem queda de métricas (#948). -**Autenticação de aliases internos:**Mapeamentos de tempo de execução internos simplificados, normalizando pesquisas de carga útil de credenciais do Codex dentro de parâmetros de tradução globais, resolvendo 401 quedas não autenticadas (#958).### 🛠️ Maintenance

-**Capacidade de descoberta da UI:**Categorizações de layout ajustadas corretamente que separam explicitamente a lógica dos provedores de nível gratuito, melhorando os fluxos de classificação de UX dentro das páginas gerais de registro da API (nº 950). -**Topologia de implantação:**Artefatos de implantação unificados do Docker garantindo que a raiz `fly.toml` corresponda aos parâmetros esperados da instância da nuvem prontos para uso, lidando nativamente com o dimensionamento de implantações automatizadas de maneira adequada. -**Ferramentas de desenvolvimento:**Parâmetros de tempo de execução `LKGP` desacoplados em utilitários explícitos de cache de abstração de camada de banco de dados, garantindo uma cobertura rigorosa de isolamento de teste para camadas de cache principais com segurança.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Painel de combinação automática do painel:**Refatoração completa da UI `/dashboard/auto-combo` para integração perfeita com cartões de painel nativos e preenchimento/cabeçalhos visuais padronizados. Adicionadas barras de progresso visuais dinâmicas que mapeiam mecanismos de peso de seleção de modelo. -**Sincronização de roteamento de configurações:**Destinos de esquema `prioritários` e `ponderados` de roteamento avançado totalmente expostos internamente em listas de fallback de configurações globais.### Bug Fixes

-**Nós de localidade de memória e habilidades:**Foram resolvidas tags de renderização vazias para opções de memória e habilidades diretamente nas visualizações de configurações globais, conectando todos os valores de mapeamento `settings.*` internamente em `en.json` (também mapeados implicitamente para ferramentas de tradução cruzada).### Internal Integrations

- PR #946 integrado - correção: preservar a compatibilidade do Código Claude na conversão de respostas
- PR integrado #944 — correção (gemini): preservar assinaturas de pensamento em chamadas de ferramentas antigravidade
- PR #943 integrado - correção: restaurar o corpo do GitHub Copilot
- PR #942 integrado – Corrija marcadores de cache compatíveis com cc
- PR #941 integrado — refatorar (autenticação): melhorar a pesquisa de alias NVIDIA + adicionar registro de erros LKGP
- PR #939 integrado – Restaurar o tratamento de retorno de chamada do host local Claude OAuth
- _(Nota: PR #934 foi omitido do ciclo 3.4.9 para evitar regressões de conflitos principais)_---

## [3.4.8] — 2026-04-03

### Segurança

- Corrigimos totalmente todas as descobertas pendentes do Github Advanced Security (CodeQL) e alertas do Dependabot.
- Corrigidas vulnerabilidades de aleatoriedade inseguras migrando de `Math.random` para `crypto.randomUUID()`.
- Comandos shell protegidos em scripts automatizados de injeção de string.
- Migração de padrões de análise RegEx de retrocesso catastrófico vulnerável em pipelines de bate-papo/tradução.
- Controles aprimorados de sanitização de saída dentro dos componentes React UI e injeção de tag Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Funcionalidades

- Adicionado nó `Cryptography` ao monitoramento e verificações de integridade do MCP (#798)
- Mapeamento reforçado de permissões de rota de catálogo de modelos (`/models`) (#781)### Bug Fixes

- Corrigidas atualizações do token Claude OAuth que não preservavam os contextos de cache (#937)
- Corrigidos erros de provedor compatível com CC que tornavam os modelos em cache inacessíveis (#937)
- Corrigidos erros do GitHub Executor relacionados a matrizes de contexto inválidas (#937)
- Corrigidas falhas de verificação de integridade das ferramentas CLI instaladas no NPM no Windows (#935)
- Correção da tradução de carga útil eliminando conteúdo válido devido a campos de API inválidos (#927)
- Corrigida falha de tempo de execução no Nó 25 em relação à execução da chave API (#867)
- Corrigida resolução de módulo independente do MCP (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Corrigida incompatibilidade de alias de resolução de credenciais de roteamento NVIDIA NIM (#931)### Segurança

- Adicionada proteção de limite de entrada estrita e segura contra injeções de execução remota de código bruto `shell: true`.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Provedores:**Novos provedores de geração de imagem, vídeo e áudio registrados na lista solicitada pela comunidade (#926). -**IU do painel:**Adicionada navegação independente na barra lateral para os novos módulos Memória e Habilidades (#926). -**i18n:**Adicionadas strings de tradução e mapeamentos de layout em 30 idiomas para os namespaces Memory e Skills.### 🐛 Bug Fixes

-**Resiliência:**Impediu que o disjuntor do proxy ficasse preso em um estado OPEN indefinidamente, manipulando transições diretas para o estado CLOSED dentro de caminhos combinados de fallback (#930). -**Tradução de protocolo:**Corrigido o transformador de streaming para higienizar blocos de resposta com base no protocolo _source_ esperado em vez do protocolo _target_ do provedor, corrigindo modelos Anthropics envoltos em cargas OpenAI que travavam Claude Code (#929). -**Especificações da API e Gemini:**Correção da análise `thought_signature` nos tradutores `openai-to-gemini` e `claude-to-gemini`, evitando erros HTTP 400 em todas as chamadas de ferramentas da API Gemini 3. -**Provedores:**Limpeza de endpoints não compatíveis com OpenAI, impedindo conexões upstream válidas (#926). -**Tendências de cache:**Corrigida uma incompatibilidade de dados de mapeamento de propriedade inválida que fazia com que os gráficos da interface do usuário do Cache Trends travassem e extraísse widgets de métrica de cache redundantes (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integração do ecossistema CLIProxyAPI:**Adicionado o executor `cliproxyapi` com cache em nível de módulo integrado e roteamento de proxy. Introduziu um serviço abrangente de gerenciador de versões para testar automaticamente a integridade, baixar binários do GitHub, gerar processos isolados em segundo plano e gerenciar de forma limpa o ciclo de vida de ferramentas CLI externas diretamente por meio da IU. Inclui tabelas de banco de dados para configuração de proxy para permitir o roteamento cruzado automático controlado por SSRF de solicitações OpenAI externas por meio da camada de ferramenta CLI local (#914, #915, #916). -**Suporte Qoder PAT:**Suporte integrado a Tokens de Acesso Pessoal (PAT) diretamente através do transporte local `qodercli` em vez de configurações remotas herdadas do navegador `.cn` (#913). -**Visualização do Gemini 3.1 Pro (GitHub):**Adicionado suporte de modelo explícito canônico `gemini-3.1-pro-preview` nativamente ao provedor GitHub Copilot, preservando aliases de roteamento mais antigos (#924).### 🐛 Bug Fixes

-**Estabilidade do token do Copilot do GitHub:**Reparado o loop de atualização do token do Copilot, onde tokens obsoletos não eram profundamente mesclados no banco de dados, e removidos os campos `reasoning_text` que estavam fatalmente interrompendo as conversões de bloco antrópico downstream para bate-papos multiturno (#923). -**Matriz de tempo limite global:**Tempo limite de solicitação centralizado e parametrizado explicitamente de `REQUEST_TIMEOUT_MS` para evitar que buffers de busca padrão ocultos (~300s) cortem prematuramente respostas de streaming SSE de longa duração de modelos de raciocínio pesado (#918). -**Estado dos túneis rápidos da Cloudflare:**Foi corrigida uma grave inconsistência de estado em que instâncias OmniRoute reiniciadas mostravam erroneamente túneis destruídos como ativos e o tunelamento cloudflared padrão era `HTTP/2` para eliminar spam de log de buffer de recebimento de UDP (#925). -**Revisão da tradução i18n (tcheco e hindi):**Corrigido o código Hindi de DEPRECATED `in.json` para canônico `hi.json`, revisou os mapeamentos de texto em tcheco, extraiu `untranslatable-keys.json` para corrigir validações falso-positivas de CI/CD e gerou documentos `I18N.md` abrangentes para orientar os tradutores (#912). -**Recuperação do provedor de tokens:**Corrigida a perda de endpoints `resourceUrl` específicos do Qwen após atualizações automáticas de token de verificação de integridade devido à falta de fusões profundas de banco de dados (#917). -**UX e streaming compatíveis com CC:**Unificou as ações Adicionar CC/OpenAI/Anthropic compatíveis em torno do tratamento de UI Anthropic, forçou solicitações upstream compatíveis com CC a usar SSE enquanto ainda retornava respostas de streaming ou não streaming com base na solicitação do cliente, removeu o suporte de configuração/importação da lista de modelos CC em favor de um erro explícito de listagem de modelos não suportados e fez com que os modelos disponíveis compatíveis com CC espelhassem a lista de registro do código OAuth Claude (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Relatório de token de API de respostas:**Emita `response.completed` com campos `input_tokens`/`output_tokens` corretos para clientes Codex CLI, corrigindo a exibição de uso de token (#909 — obrigado @christopher-s). -**Ponto de verificação do SQLite WAL no desligamento:**Libera as alterações do WAL no arquivo de banco de dados primário durante o desligamento/reinicialização normal, evitando a perda de dados nas paradas do contêiner do Docker (#905 — obrigado @rdself). -**Sinal de desligamento elegante:**Rotas `/api/restart` e `/api/shutdown` alteradas de `process.exit(0)` para `process.kill(SIGTERM)`, garantindo que o manipulador de desligamento seja executado antes da saída. -**Docker Stop Grace Period:**Adicionado `stop_grace_period: 40s` aos arquivos Docker Compose e `--stop-timeout 40` aos exemplos de execução do Docker.### 🛠️ Maintenance

- Fechados 5 problemas resolvidos/não-bug (#872, #814, #816, #890, #877).
- Triagem de 6 problemas com solicitações de informações de necessidades (#892, #887, #886, #865, #895, #870).
- Respondeu ao problema de rastreamento de detecção de CLI (#863) com orientação do colaborador.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memória e habilidades antigravidade:**Injeção remota de memória e habilidades para o provedor de antigravidade concluída no nível da rede proxy. -**Compatibilidade do Claude Code:**Construiu uma ponte de compatibilidade nativa oculta para o Claude Code, passando ferramentas e formatação de forma limpa. -**Web Search MCP:**Adicionada a ferramenta `omniroute_web_search` com o escopo `execute:search`. -**Componentes de cache:**Componentes de cache dinâmico implementados utilizando TDD. -**IU e personalização:**Adicionado suporte a favicon personalizado, guias de aparência, etiqueta branca conectada à barra lateral e etapas do guia Windsurf adicionadas em todos os 33 idiomas. -**Retenção de log:**Retenção de log de solicitação unificada e artefatos nativos. -**Melhorias no modelo:**Adicionado `contextLength` explícito para todos os modelos opencode-zen. -**i18n e traduções:**Traduções integradas de 33 idiomas nativamente, incluindo validações de CI de espaço reservado e atualizações de documentação em chinês (#873, #869).### 🐛 Bug Fixes

-**Mapeamento Qwen OAuth:**Reversão da dependência de `id_token` para `access_token` e ativação da injeção dinâmica de endpoint de API `resource_url` para roteamento regional adequado (#900). -**Model Sync Engine:**Armazenou o ID interno estrito do provedor nas rotinas de sincronização `getCustomModels()` em vez do formato UI Channel Alias, evitando falhas de inserção do catálogo SQLite (#903). -**Claude Code & Codex:**Respostas em branco sem streaming padronizadas para `(resposta vazia)` formatadas pela Anthropic para evitar falhas no proxy CLI (#866). -**Roteamento compatível com CC:**Colisão de endpoint `/v1` duplicada resolvida durante a concatenação de caminho para gateways Claude Code genéricos (#904). -**Painéis Antigravidade:**Modelos de cotas ilimitadas foram bloqueados contra registros falsos como estados limite de `100% de uso` esgotados na IU de uso do provedor (nº 857). -**Passagem de imagem de Claude:**Corrigidos modelos de Claude sem passagem de bloco de imagem (#898). -**Gemini CLI Routing:**Resolvidos bloqueios de autorização 403 e problemas de acumulação de conteúdo atualizando o ID do projeto via `loadCodeAssist` (#868). -**Estabilidade antigravidade:**Listas de acesso de modelo corrigidas, bloqueios 404 aplicados, cascatas 429 corrigidas bloqueando conexões padrão e tokens de saída `gemini-3.1-pro` limitados (#885). -**Cadência de sincronização do provedor:**Reparado o provedor limita a cadência de sincronização por meio do agendador interno (#888). -**Otimização do painel:**Resolvido o congelamento da interface do usuário `/dashboard/limits` ao processar mais de 70 contas por meio de paralelização de blocos (#784). -**SSRF Hardening:**Aplicou filtragem estrita de intervalo de IP SSRF e bloqueou a interface de loopback `::1`. -**Tipos MIME:**`mime_type` padronizado para Snake_case para corresponder às especificações da API Gemini. -**Estabilização de CI:**Foram corrigidas falhas de análise/configurações nos seletores do Playwright e nas asserções de solicitação para que as execuções do GitHub Actions E2E passem de maneira confiável em UIs localizadas e controles baseados em switch. -**Testes determinísticos:**Remoção de acessórios de cota sensíveis à data dos testes de uso do Copilot e testes de catálogo de idempotência/modelo alinhados com o comportamento de tempo de execução mesclado. -**Proteção de tipo MCP:**Regressões `qualquer` explícitas de orçamento zero foram removidas do caminho de registro da ferramenta do servidor MCP. -**Mecanismo de sincronização de modelo:**Substituições destrutivas `replace` ignoradas quando a sincronização automática do provedor gera uma lista de modelos vazia, mantendo a estabilidade para catálogos dinâmicos (#899).### 🛠️ Maintenance

-**Registro de pipeline:**Artefatos de registro de pipeline refinados e aplicação de limites de retenção (nº 880). -**Revisão de AGENTS.md:**Condensado de 297 → 153 linhas. Adicionadas diretrizes de construção/teste/estilo, fluxos de trabalho de código (Prettier, TypeScript, ESLint) e tabelas detalhadas reduzidas (#882). -**Integração de ramificação de versão:**Consolidou as ramificações de recursos ativas em `release/v3.4.2` sobre a atual `main` e validou a ramificação com lint, unidade, cobertura, construção e execuções E2E no modo CI. -**Testes:**Adicionadas configurações do vitest para testes de componentes e especificações do Playwright para alternância de configurações. -**Atualizações de documentos:**Readmes de raiz expandidos, tradução nativa de documentos chineses e limpeza de arquivos obsoletos.## [3.4.1] - 2026-03-31

> [!AVISO]
> **MUDANÇA DE ÚLTIMA HORA: o registro de solicitações, a retenção e as variáveis de ambiente de registro foram reprojetadas.**
> Na primeira inicialização após a atualização, o OmniRoute arquiva logs de solicitação legados de `DATA_DIR/logs/`, legado `DATA_DIR/call_logs/` e `DATA_DIR/log.txt` em `DATA_DIR/log_archives/*.zip`, em seguida, remove o layout obsoleto e muda para o novo formato de artefato unificado em `DATA_DIR/call_logs/`.### ✨ New Features

-**.Utilitário de migração ENV:**Incluído `scripts/migrate-env.mjs` para migrar perfeitamente configurações `<v3.3` para restrições estritas de validação de segurança `v3.4.x` (FASE-01), reparando falhas de inicialização causadas por instâncias curtas de `JWT_SECRET`. -**Otimização de cache Kiro AI:**Implementação da geração determinística de `conversationId` (uuidv5) para ativar o cache de prompt de ID do AWS Builder corretamente entre invocações (#814). -**Restauração e consolidação da UI do painel:**Lógica da barra lateral resolvida, omitindo a seção Debug, e avisos de roteamento Nextjs limpos, movendo páginas autônomas `/dashboard/mcp` e `/dashboard/a2a` explicitamente para componentes incorporados da UI do Endpoint Proxy. -**Artefatos de log de solicitação unificados:**O log de solicitação agora armazena uma linha de índice SQLite mais um artefato JSON por solicitação em `DATA_DIR/call_logs/`, com captura de pipeline opcional incorporada no mesmo arquivo. -**Idioma:**Melhoria da tradução chinesa (#855) -**Modelos Opencode-Zen:**Adicionados 4 modelos gratuitos ao registro opencode-zen (#854) -**Testes:**Adicionados testes de unidade e E2E para alternância de configurações e correções de bugs (#850)### 🐛 Bug Fixes

-**Análise de cota 429:**Analisou longos tempos de redefinição de cota de corpos de erro para honrar esperas corretas e evitar banimentos de contas com taxa limitada (#859) -**Cache de prompt:**Cabeçalhos `cache_control` do cliente preservados para todos os provedores do protocolo Claude (como Minimax, GLM e Bailian), reconhecendo corretamente o suporte de cache (#856) -**Logs de sincronização de modelo:**Spam de log reduzido gravando `sync-models` somente quando o canal realmente modifica a lista (#853) -**Análise de cota e token do provedor:**Limites de antigravidade alterados para usar `retrieveUserQuota` de forma nativa e mapeada corretamente cargas úteis de atualização de token Claude para formulários codificados em URL (#862) -**Estabilidade de limitação de taxa:**Universalizou a arquitetura de análise 429 Retry-After para limitar os resfriamentos induzidos pelo provedor em no máximo 24 horas (#862) -**Dashboard Limit Rendering:**Mapeamento de cotas `/dashboard/limits` reprojetado para renderizar imediatamente dentro de pedaços, corrigindo um grande atraso de congelamento da interface do usuário em contas que excedem 70 conexões ativas (#784) -**Autorização QWEN OAuth:**Mapeou o `id_token` do OIDC como o token principal do API Bearer para solicitações do Dashscope, corrigindo erros 401 não autorizados imediatos após conectar contas ou atualizar tokens (#864) -**Estabilidade da API ZAI:**Compilador de eventos enviados pelo servidor reforçado para fazer fallback para strings vazias quando os provedores DeepSeek transmitem conteúdo matematicamente nulo durante as fases de raciocínio (#871) -**Traduções de código Claude/Codex:**Conversões de carga útil sem streaming protegidas contra respostas vazias de ferramentas Codex upstream, evitando TypeErrors catastróficos (#866) -**Renderização NVIDIA NIM:**Prefixos de provedores idênticos removidos condicionalmente e enviados dinamicamente por modelos de áudio, eliminando estruturas de tags `nim/nim` duplicadas que lançam 404 no Media Playground (#872)### ⚠️ Breaking Changes

-**Layout do log de solicitação:**Removidas as antigas sessões de log de solicitação `DATA_DIR/logs/` de vários arquivos e o arquivo de resumo `DATA_DIR/log.txt`. Novas solicitações são gravadas como artefatos JSON únicos em `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Variáveis ​​de ambiente de registro:**`LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` e `PROXY_LOG_MAX_ENTRIES` substituídos pelos novos modelos de configuração `APP_LOG_*` e `CALL_LOG_RETENTION_DAYS`. -**Configuração de alternância de pipeline:**Substituída a configuração herdada `detailed_logs_enabled` por `call_log_pipeline_enabled`. Os novos detalhes do pipeline são incorporados ao artefato de solicitação em vez de serem armazenados como registros `request_detail_logs` separados.### 🛠️ Maintenance

-**Backup de atualização de log de solicitação herdada:**As atualizações agora arquivam layouts antigos `data/logs/`, legados `data/call_logs/` e `data/log.txt` em `DATA_DIR/log_archives/*.zip` antes de remover a estrutura obsoleta. -**Persistência de uso de streaming:**As solicitações de streaming agora gravam uma única linha `usage_history` ao serem concluídas, em vez de emitir uma linha duplicada de uso em andamento com metadados de status vazios. -**Limpeza de acompanhamento de registro:**Os logs do pipeline não capturam mais `SOURCE REQUEST`, as entradas de artefato de solicitação agora honram `CALL_LOG_MAX_ENTRIES` e os arquivos de log do aplicativo agora honram `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Funcionalidades

-**Análise de utilização de assinatura:**Adicionado rastreamento de série temporal de instantâneo de cota, guias Utilização do provedor e integridade combinada com visualizações de recargas e endpoints de API correspondentes (#847) -**Controle de backup SQLite:**Novo sinalizador env `OMNIROUTE_DISABLE_AUTO_BACKUP` para desabilitar backups automáticos SQLite (#846) -**Atualização do Registro de Modelo:**`gpt-5.4-mini` injetado na matriz de modelos do provedor Codex (#756) -**Rastreamento de limite do provedor:**Rastreie e exiba quando os limites de taxa do provedor foram atualizados pela última vez por conta (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Redirecionou as conclusões do Qwen OAuth da API DashScope para a API Web Inference (`chat.qwen.ai`), resolvendo falhas de autorização (#844, #807, #832) -**Qwen Auto-Retry Loop:**Adicionado tratamento de espera excedida de cota 429 direcionada dentro de `chatCore` protegendo solicitações de burst -**Codex OAuth Fallback:**O bloqueio moderno de pop-ups do navegador não prende mais o usuário; ele volta automaticamente para a entrada manual de URL (#808) -**Atualização do Token Claude:**Os limites estritos de `application/json` da Anthropic agora são respeitados durante a geração de token em vez de URLs codificados (#836) -**Esquema de mensagens do Codex:**`mensagens` puristas despojadas são injetadas a partir de solicitações de passagem nativas para evitar rejeições estruturais do upstream do ChatGPT (#806) -**Limite de tamanho de detecção CLI:**Aumentou com segurança o limite superior da varredura binária do Node de 100 MB para 350 MB, permitindo que ferramentas autônomas pesadas como Claude Code (229 MB) e OpenCode (153 MB) sejam detectadas corretamente pelo tempo de execução do VPS (#809) -**CLI Runtime Environment:**Capacidade restaurada para configurações CLI respeitarem caminhos de substituição do usuário (`CLI_{PROVIDER}_BIN`) ignorando regras estritas de descoberta vinculadas a caminhos -**Conflitos de cabeçalho da Nvidia:**Propriedades `prompt_cache_key` removidas dos cabeçalhos upstream ao chamar provedores não antrópicos (#848) -**Codex Fast Tier Toggle:**Contraste de alternância de nível de serviço Codex restaurado no modo claro (#842) -**Infraestrutura de teste:**Teste `t28-model-catalog-updates` atualizado que esperava incorretamente o endpoint DashScope desatualizado para o registro nativo Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotação de provedor personalizada:**`getRotatingApiKey` integrado internamente dentro do DefaultExecutor, garantindo que a rotação de `extraApiKeys` seja acionada corretamente para provedores upstream personalizados e compatíveis (#815)---

## [3.3.8] - 2026-03-30

### Funcionalidades

-**Filtragem de API de modelos:**Endpoint `/v1/models` agora filtra dinamicamente sua lista com base nas permissões vinculadas a `Authorization: Bearer <token>` quando o acesso restrito está ativado (#781) -**Integração Qoder:**Integração nativa para Qoder AI substituindo nativamente os mapeamentos legados da plataforma iFlow (#660) -**Rastreamento de cache de prompt:**recursos de rastreamento adicionados e visualização de front-end (cartão de estatísticas) para cache semântico e de prompt na interface do painel### 🐛 Bug Fixes

-**Dimensionamento do painel de cache:**Tamanhos de layout de UI e cabeçalhos de contexto aprimorados para as páginas de cache avançadas (#835) -**Visibilidade da barra lateral de depuração:**Corrigido um problema em que a alternância de depuração não mostrava/ocultava corretamente os detalhes de depuração da barra lateral (#834) -**Prefixação do modelo Gemini:**Modificado o fallback do namespace para rotear corretamente via `gemini-cli/` em vez de `gc/` para respeitar as especificações upstream (#831) -**OpenRouter Sync:**Sincronização de compatibilidade aprimorada para ingerir automaticamente o catálogo de modelos disponíveis corretamente do OpenRouter (#830) -**Mapeamento de cargas úteis de streaming:**A reserialização de campos de raciocínio resolve nativamente caminhos de alias de conflito quando a saída é transmitida para dispositivos de borda---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**`opencode.json` gerado reestruturado para usar o esquema baseado em registro `@ai-sdk/openai-compatível` com `options` e `modelos` como mapas de objetos em vez de matrizes planas, corrigindo falhas de validação de configuração (#816) -**I18n Missing Keys:**Adicionada chave de tradução `cloudflaredUrlNotice` ausente em todos os 30 arquivos de idiomas para evitar erros do console `MISSING_MESSAGE` na página Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Contabilidade de token:**Tokens de cache de prompt incluídos com segurança nos cálculos de entradas de uso histórico para deduções de cota corretas (PR #822) -**Probes de teste combinados:**Foram corrigidos falsos negativos da lógica de teste combinado, resolvendo a análise para respostas somente de raciocínio e habilitando a paralelização massiva via Promise.all (PR #828) -**Docker Quick Tunnels:**certificados ca necessários incorporados dentro do contêiner de tempo de execução base para resolver falhas de inicialização do Cloudflared TLS e erros de rede stdout que surgiram substituindo códigos de saída genéricos (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Rastreamento de cota Gemini:**Adicionado rastreamento de cota Gemini CLI em tempo real por meio da API `retrieveUserQuota` (PR #825) -**Painel de Cache:**Painel de Cache aprimorado para exibir métricas de cache imediatas, tendências de 24 horas e economia de custos estimada (PR #824)### 🐛 Bug Fixes

-**Experiência do usuário:**Loops modais OAuth invasivos de abertura automática removidos em páginas detalhadas de provedores estéreis (PR #820) -**Atualizações de dependências:**Dependências eliminadas e bloqueadas para árvores de desenvolvimento e produção, incluindo Next.js 16.2.1, Recharts e TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Fluxos de trabalho A2A:**Adicionado orquestrador FSM determinístico para fluxos de trabalho de agente em várias etapas. -**Degradação elegante:**Adicionada uma nova estrutura de fallback multicamadas para preservar a funcionalidade principal durante interrupções parciais do sistema. -**Auditoria de configuração:**Adicionada uma trilha de auditoria com detecção de diferenças para rastrear alterações e permitir reversões de configuração. -**Saúde do provedor:**Adicionado rastreamento de expiração do provedor com alertas proativos de UI para chaves de API expiradas. -**Roteamento adaptativo:**foi adicionado um detector adaptativo de volume e complexidade para substituir estratégias de roteamento dinamicamente com base na carga. -**Diversidade de Provedores:**Pontuação de diversidade de provedores implementada por meio da entropia de Shannon para melhorar a distribuição de carga. -**Limites de desativação automática:**Adicionada uma opção de configuração de desativação automática de contas banidas ao painel de resiliência.### 🐛 Bug Fixes

-**Compatibilidade com Codex e Claude:**Corrigidos substitutos de UI, corrigidos problemas de integração sem streaming do Codex e resolvido detecção de tempo de execução CLI no Windows. -**Automação de lançamento:**Permissões expandidas necessárias para a construção do aplicativo Electron no GitHub Actions. -**Cloudflare Runtime:**Abordou códigos de saída de isolamento de tempo de execução corretos para componentes de túnel Cloudflared.### 🧪 Tests

-**Atualizações do conjunto de testes:**Cobertura de teste expandida para detectores de volume, diversidade de provedores, auditoria de configuração e FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Confiabilidade de CI/CD:**Ações do GitHub corrigidas para versões de dependência estáveis ​​(`actions/checkout@v4`, `actions/upload-artifact@v4`) para mitigar descontinuações não anunciadas do ambiente do construtor. -**Fallbacks de imagem:**Cadeias de fallback arbitrárias substituídas em `ProviderIcon.tsx` por validação explícita de ativos para evitar que a UI carregue componentes `<Image>` para arquivos que não existem, eliminando erros `404` nos logs do console do painel (#745). -**Admin Updater:**Detecção dinâmica de instalação de origem para o atualizador do painel. Desativa com segurança o botão `Atualizar agora` quando o OmniRoute é construído localmente em vez de através do npm, solicitando `git pull` (#743). -**Erro ERESOLVE de atualização:**Substituições `package.json` injetadas para `react`/`react-dom` e habilitou `--legacy-peer-deps` nos scripts do atualizador automático interno para resolver conflitos de quebra de árvore de dependência com `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Túneis Cloudflare:**Integração do Quick Tunnel Cloudflare com controles de painel (PR #772). -**Diagnóstico:**Desvio de cache semântico para testes combinados ao vivo (PR #773).### 🐛 Bug Fixes

-**Estabilidade de streaming:**Aplique `FETCH_TIMEOUT_MS` à chamada inicial `fetch()` das solicitações de streaming para evitar que o tempo limite de 300s do Node.js TCP cause falhas silenciosas em tarefas (#769). -**i18n:**Adicione entradas `windsurf` e `copilot` ausentes a `toolDescriptions` em todos os 33 arquivos de localidade (#748). -**Auditoria de codificação GLM:**Auditoria completa do provedor corrigindo vulnerabilidades ReDoS, dimensionamento de janela de contexto (128k/16k) e sincronização de registro de modelo (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Correção de processamento de fallback para elementos `type: "text"` carregando conjuntos de dados nulos ou vazios que causaram rejeição 400 (#742). -**Opencode:**Atualize o alinhamento do esquema para `provedor` singular para corresponder às especificações oficiais (#774). -**Gemini CLI:**Injeta cabeçalhos de cota de usuário final ausentes, evitando bloqueios de autorização 403 (#775). -**Recuperação de banco de dados:**Refatore importações de carga útil multiparte em matrizes binárias com buffer bruto para ignorar os limites máximos de corpo do proxy reverso (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Estabilização de versão**— Finalização da versão v3.2.9 (diagnóstico combinado, portões de qualidade, correção da ferramenta Gemini) e criação de tag git ausente. Consolidou todas as alterações preparadas em um único commit de versão atômica.### 🐛 Bug Fixes

-**Teste de atualização automática**— Correção da asserção de teste `buildDockerComposeUpdateScript` para corresponder a referências de variáveis ​​de shell não expandidas (`$TARGET_TAG`, `${TARGET_TAG#v}`) no script de implantação gerado, alinhando-se com o modelo refatorado da v3.2.8. -**Teste de disjuntor**— `combo-circuit-breaker.test.mjs` reforçado injetando `maxRetries: 0` para evitar que a inflação de novas tentativas distorça as asserções de contagem de falhas durante as transições de estado do disjuntor.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introduziu um sinalizador de desvio de teste ao vivo (`forceLiveComboTest`) que permite aos administradores executar verificações de integridade upstream reais que ignoram todos os disjuntores locais e mecanismos de estado de resfriamento, permitindo diagnósticos precisos durante interrupções contínuas (PR #759) -**Quality Gates**— Adicionada validação de qualidade de resposta automatizada para combos e suporte ao modelo `claude-4.6` oficialmente integrado nos esquemas de roteamento principais (PR #762)### 🐛 Bug Fixes

-**Validação de definição de ferramenta**— Reparada integração da API Gemini normalizando tipos de enum dentro de definições de ferramenta, evitando erros de parâmetro HTTP 400 upstream (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Integra um processo de atualização em segundo plano separado para implantações do Docker Compose. A UI do Dashboard agora rastreia perfeitamente eventos do ciclo de vida de atualização, combinando respostas JSON REST com sobreposições de progresso de streaming SSE para confiabilidade robusta em vários ambientes. -**Cache Analytics**— Reparado o mapeamento de visualização de métricas zero migrando os logs de telemetria do Semantic Cache diretamente para o módulo SQLite de rastreamento centralizado.### 🐛 Bug Fixes

-**Lógica de autenticação**— Corrigido um bug em que o salvamento das configurações do painel ou a adição de modelos falhava com um erro 401 Não autorizado quando `requireLogin` estava desativado. Os endpoints da API agora avaliam corretamente a alternância de autenticação global. Redirecionamento global resolvido reativando `src/middleware.ts`. -**CLI Tool Detection (Windows)**— Preveniu exceções fatais de inicialização durante a detecção do ambiente CLI, capturando erros ENOENT `cross-spawn` corretamente. Adiciona caminhos de detecção explícitos para `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Parâmetros de tradução de modelo normalizados, evitando envenenamento de contexto no modo de passagem de proxy, aplicando restrições genéricas `store: false` explicitamente para todas as solicitações originadas do Codex. -**Relatório de token SSE**— Detecção normalizada do bloco de chamada de ferramenta do provedor `finish_reason`, corrigindo 0% de análise de uso para respostas somente de fluxo sem indicadores `<DONE>` estritos. -**Tags DeepSeek <think>**— Implementado um mapeamento de extração `<think>` explícito dentro de `responsesHandler.ts`, garantindo que os fluxos de raciocínio DeepSeek sejam mapeados de forma equivalente às estruturas antrópicas `<thinking>` nativas.---

## [3.2.7] - 2026-03-29

### Fixed

-**Atualizações contínuas da interface do usuário**: o recurso "Atualizar agora" no painel agora fornece feedback transparente e ao vivo usando eventos enviados pelo servidor (SSE). Ele executa instalação de pacotes, recriações de módulos nativos (better-sqlite3) e PM2 reinicia de forma confiável enquanto mostra carregadores em tempo real em vez de travar silenciosamente.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Adicionado um fluxo de cópia de chave de API com escopo definido no Api Manager, protegido pela variável de ambiente `ALLOW_API_KEY_REVEAL`. -**Controles de visibilidade da barra lateral (#739)**— Os administradores agora podem ocultar qualquer link de navegação da barra lateral por meio das configurações de Aparência para reduzir a confusão visual. -**Strict Combo Testing (#735)**— Reforçou o endpoint de verificação de integridade do combo para exigir respostas de texto ao vivo dos modelos em vez de apenas sinais de acessibilidade suave. -**Logs detalhados de streaming (#734)**— Registro de solicitação detalhado alternado para fluxos SSE para reconstruir a carga final, economizando imensas quantidades de tamanho do banco de dados SQLite e limpando significativamente a IU.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Corrigida a lógica do cabeçalho de autenticação para modelos `minimax` no OpenCode Go para usar `x-api-key` em vez de tokens de portador padrão no protocolo `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Modelo de empacotamento `xbps-src` integrado e instruções para compilar e instalar nativamente o OmniRoute com ligações `better-sqlite3` via alvo de compilação cruzada.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Migração Qoder AI (#660)**— Migrou completamente o provedor principal legado `iFlow` para `Qoder AI` mantendo recursos de roteamento de API estáveis.### 🐛 Bug Fixes

-**Argumento inválido de carga útil HTTP 400 do Gemini Tools (#731)**— Injeções de array `thoughtSignature` evitadas dentro de sequências `functionCall` padrão do Gemini bloqueando fluxos de roteamento de agente.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Lógica de limite de cota normalizada e rotulagem de dados dentro da interface Limits.### 🐛 Bug Fixes

-**Esquemas e vazamentos de roteamento principal**— `comboStrategySchema` expandido para suportar nativamente estratégias `fill-first` e `p2c` para desbloquear nativamente a edição de combinação complexa. -**Extração de tags de pensamento (CLI)**— Sanitizador de respostas de token CLI reestruturado, RegEx, capturando estruturas de raciocínio de modelo dentro de fluxos, evitando extrações `<thinking>` quebradas, quebrando o formato de saída do texto de resposta. -**Aplicações rigorosas de formato**— Execução reforçada de higienização de pipeline, tornando-a universalmente aplicável a destinos de modo de tradução.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Pipeline de registro de solicitação de quatro estágios (#705)**— Persistência de log refatorada para salvar cargas abrangentes em quatro estágios distintos do pipeline: Solicitação do cliente, Solicitação do provedor traduzida, Resposta do provedor e Resposta do cliente traduzida. Introduzido `streamPayloadCollector` para truncamento de fluxo SSE robusto e serialização de carga útil.### 🐛 Bug Fixes

-**Correções de UI móvel (#659)**— Impediu que os componentes da tabela no painel quebrassem o layout em viewports estreitas adicionando rolagem horizontal adequada e contenção de overflow ao `DashboardLayout`. -**Correções de cache de prompt de Claude (#708)**— Blocos `cache_control` garantidos em loops de fallback de Claude para Claude sejam preservados fielmente e passados ​​com segurança de volta aos modelos antrópicos. -**Definições da ferramenta Gemini (#725)**— Corrigidos erros de tradução de esquema ao declarar tipos de parâmetro `objeto` simples para chamada de função Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Provedor de fallback global (#689)**— Quando todos os modelos combinados se esgotam (502/503), o OmniRoute agora tenta um modelo de fallback global configurável antes de retornar o erro. Defina `globalFallbackModel` nas configurações para ativar.### 🐛 Bug Fixes

-**Correção #721**— Corrigido o desvio de fixação de contexto durante respostas de chamada de ferramenta. A marcação sem streaming usou o caminho JSON errado (`json.messages` → `json.choices[0].message`). A injeção de streaming agora é acionada em pedaços `finish_reason` para streams somente para chamadas de ferramenta. `injectModelTag()` agora anexa mensagens pin sintéticas para conteúdo não-string. -**Correção #709**— Confirmado já corrigido (v3.1.9) — `system-info.mjs` cria diretórios recursivamente. Fechado. -**Correção #707**— Confirmado já corrigido (v3.1.9) — limpeza de nome de ferramenta vazia em `chatCore.ts`. Fechado.### 🧪 Tests

- Adicionados 6 testes de unidade para fixação de contexto com respostas de chamada de ferramenta (conteúdo nulo, conteúdo de array, ida e volta, reinjeção)## [3.2.0] — 2026-03-28

### ✨ New Features

-**IU de gerenciamento de cache**— Adicionado um painel de cache semântico dedicado em \`/dashboard/cache\` com invalidação de API direcionada e suporte i18n de 31 idiomas (PR #701 por @oyi77) -**GLM Quota Tracking**— Adicionado uso em tempo real e rastreamento de cota de sessão para o provedor GLM Coding (Z.AI) (PR #698 por @christopher-s) -**Cargas úteis de log detalhadas**— Captura de carga útil de pipeline completa de quatro estágios (original, traduzida, resposta do provedor, deltas transmitidos) diretamente na UI (PR #705 por @rdself)### 🐛 Bug Fixes

-**Correção #708**— Impediu o sangramento de token para usuários do Claude Code roteamento através do OmniRoute preservando corretamente os cabeçalhos \`cache_control\` nativos durante a passagem de Claude para Claude (PR #708 por @tombii) -**Correção #719**— Configure limites de autenticação internos para \`ModelSyncScheduler\` para evitar falhas de daemons não autenticados na inicialização (PR #719 por @rdself) -**Correção #718**— Reconstrução da renderização do emblema na IU de Limites do Provedor, evitando sobreposição de limites de cota incorretos (PR #718 por @rdself) -**Correção #704**— Corrigida a quebra de Combo Fallbacks em erros de política de conteúdo HTTP 400, impedindo o roteamento morto da rotação do modelo (PR #704 por @rdself)### 🔒 Security & Dependencies

- Atualização do \`path-to-regexp\` para \`8.4.0\` resolvendo vulnerabilidades do dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Correção # 706**— Corrigida a renderização de fallback de ícone causada pela substituição de `font-sans` do Tailwind V4 ao aplicar `!important` a `.material-symbols-outlined`. -**Correção #703**— Corrigidos fluxos quebrados do GitHub Copilot, habilitando a tradução de `respostas` para o formato `openai` para qualquer modelo personalizado que utilizasse `apiFormat: "responses"`. -**Correção nº 702**— Substituição do rastreamento de uso de taxa fixa por cálculos precisos de preços de banco de dados para respostas de streaming e não streaming. -**Correção #716**— Limpeza do estado de tradução da chamada de ferramenta do Claude, analisando corretamente os argumentos de streaming e evitando que pedaços `tool_calls` do OpenAI repetissem o campo `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Coage automaticamente restrições numéricas do esquema JSON codificadas em string (por exemplo, `"mínimo": "1"`) para tipos adequados, evitando 400 erros de Cursor, Cline e outros clientes que enviam esquemas de ferramentas malformados. -**Higienização da descrição da ferramenta**— Certifique-se de que as descrições das ferramentas sejam sempre strings; converte descrições `nulas`, `indefinidas` ou numéricas em strings vazias antes de enviar aos provedores. -**Botão Limpar todos os modelos**— Adicionadas traduções i18n para a ação do provedor "Limpar todos os modelos" em todos os 30 idiomas. -**Codex Auth Export**— Adicionados botões de exportação e aplicação local do Codex `auth.json` para integração CLI perfeita. -**Notas do Windsurf BYOK**— Adicionados avisos de limitação oficial ao cartão de ferramentas Windsurf CLI, documentando as restrições do BYOK.### 🐛 Bug Fixes

-**Correção #709**— `system-info.mjs` não trava mais quando o diretório de saída não existe (adicionado `mkdirSync` com sinalizador recursivo). -**Correção #710**— O singleton A2A `TaskManager` agora usa `globalThis` para evitar vazamento de estado nas recompilações de rota da API Next.js no modo dev. Conjunto de testes E2E atualizado para lidar com 401 normalmente. -**Correção #711**— Adicionada aplicação de limite `max_tokens` específico do provedor para solicitações upstream. -**Corrigir #605 / #592**— Retirar o prefixo `proxy_` dos nomes das ferramentas em respostas do Claude sem streaming; URL de validação LongCat fixo. -**Call Logs Max Cap**— `getMaxCallLogs()` atualizado com camada de cache, suporte env var (`CALL_LOGS_MAX`) e integração de configurações de banco de dados.### 🧪 Tests

- Conjunto de testes expandido de 964 → 1.027 testes (63 novos testes)
- Adicionado `schema-coercion.test.mjs` — 9 testes para coerção de campos numéricos e higienização de descrição de ferramentas
- Adicionado `t40-opencode-cli-tools-integration.test.mjs` — testes de integração CLI OpenCode/Windsurf
- Ramo de testes de recursos aprimorado com ferramentas de cobertura abrangentes### 📁 New Files

| Arquivo                                                   | Finalidade                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`           | Coerção de esquema e descrição de ferramentas utilitários de sanitização |
| `testes/unidade/schema-coercion.test.mjs`                 | Testes unitários para coerção de esquema                                 |
| `testes/unit/t40-opencode-cli-tools-integration.test.mjs` | Testes de integração de ferramentas CLI                                  |
| `COVERAGE_PLAN.md`                                        | Documento de planejamento de cobertura de teste                          | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Correção de marcadores cache_control sendo removidos no modo de passagem Claude (Claude → OmniRoute → Claude), o que fazia com que os usuários do Claude Code esgotassem sua cota de API Anthropic 5 a 10 vezes mais rápido do que conexões diretas. OmniRoute agora preserva os marcadores cache_control do cliente quando sourceFormat e targetFormat são ambos Claude, garantindo que o cache de prompt funcione corretamente e reduzindo drasticamente o consumo de token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Núcleo da plataforma:**Implementação do tratamento de estado global para modelos e combos ocultos, evitando que eles sobrecarreguem o catálogo ou vazem para agentes MCP conectados (#681). -**Estabilidade:**Falhas de streaming corrigidas relacionadas à falha na integração do provedor Antigravity nativo devido a matrizes de estado indefinidas não tratadas (#684). -**Sincronização de localização:**Implantação de um sincronizador `i18n` totalmente revisado, detectando propriedades JSON aninhadas ausentes e adaptando 30 localidades sequencialmente (#685).## [3.1.7] - 27/03/2026### 🐛 Bug Fixes

-**Estabilidade de Streaming:**Corrigido `hasValuableContent` retornando `undefined` para pedaços vazios em streams SSE (#676). -**Chamada de ferramenta:**Corrigido um problema em `sseParser.ts` onde respostas Claude sem streaming com múltiplas chamadas de ferramenta descartavam o `id` de chamadas de ferramenta subsequentes devido à desduplicação baseada em índice incorreta (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Restauração do nome da ferramenta nativa Claude**— Nomes de ferramentas como `TodoWrite` não são mais prefixados com `proxy_` nas respostas de passagem do Claude (streaming e não streaming). Inclui cobertura de teste unitário (PR #663 por @coobabm) -**Limpeza de alias de todos os modelos**— O botão "Limpar todos os modelos" agora também remove aliases de modelos associados, evitando modelos fantasmas na UI (PR #664 por @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Contas com taxa limitada agora se recuperam automaticamente quando sua janela de espera expira, corrigindo um impasse onde alto `backoffLevel` despriorizava permanentemente contas (PR #657 por @brendandebeasi)### 🌍 i18n

-**Revisão da tradução em chinês**— Reescrita abrangente de `zh-CN.json` com maior precisão (PR #658 por @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Correção de substituição de streaming**— `stream: true` explícito no corpo da solicitação agora tem prioridade sobre o cabeçalho `Accept: application/json`. Os clientes que enviarem ambos receberão corretamente respostas de streaming SSE (#656)### 🌍 i18n

-**Melhorias na string tcheca**— Terminologia refinada em `cs.json` (PR #655 por @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 chaves de tradução ausentes**adicionadas ao `en.json` e 12 idiomas (PR #652 por @zen0bit) -**Documentação tcheca atualizada**— guias CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Scripts de validação de tradução**— `check_translations.py` e `validate_translation.py` para CI/QA (PR #651 por @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Crítico: regressão de chamada de ferramenta**— Corrigidos erros `proxy_Bash` desabilitando o prefixo do nome da ferramenta `proxy_` no caminho de passagem do Claude. Ferramentas como `Bash`, `Read`, `Write` foram renomeadas para `proxy_Bash`, `proxy_Read`, etc., fazendo com que Claude as rejeitasse (#618) -**Documentação sobre banimento de conta Kiro**— Documentado como falso positivo antifraude upstream da AWS, não um problema do OmniRoute (#649)### 🧪 Tests

-**936 testes, 0 falhas**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadados de capacidade de visão**: adicionados `capabilities.vision`, `input_modalities` e `output_modalities` às entradas `/v1/models` para modelos com capacidade de visão (PR #646) -**Modelos Gemini 3.1**: Adicionados `gemini-3.1-pro-preview` e `gemini-3.1-flash-lite-preview` ao provedor Antigravity (#645)### 🐛 Bug Fixes

-**Erro Ollama Cloud 401**: URL base da API incorreto corrigido — alterado de `api.ollama.com` para `ollama.com/v1/chat/completions` oficial (#643) -**Repetição de token expirado**: Adicionada nova tentativa limitada com espera exponencial (5→10→20 min) para conexões OAuth expiradas em vez de ignorá-las permanentemente (PR #647)### 🧪 Tests

-**936 testes, 0 falhas**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Modelos de problemas do GitHub**: Adicionados relatórios de erros padronizados, solicitações de recursos e modelos de problemas de configuração/proxy (#641) -**Limpar todos os modelos**: Adicionado um botão "Limpar todos os modelos" à página de detalhes do provedor com suporte i18n em 29 idiomas (#634)### 🐛 Bug Fixes

-**Conflito de localidade (`in.json`)**: Renomeado o arquivo de localidade em hindi de `in.json` (código ISO indonésio) para `hi.json` para corrigir conflitos de tradução no Weblate (#642) -**Nomes de ferramentas vazias do Codex**: a higienização do nome da ferramenta foi movida antes da passagem nativa do Codex, corrigindo 400 erros de provedores upstream quando as ferramentas tinham nomes vazios (#637) -**Streaming Newline Artifacts**: Adicionado `collapseExcessiveNewlines` ao sanitizer de resposta, colapsando execuções de mais de 3 novas linhas consecutivas de modelos de pensamento em uma nova linha dupla padrão (#638) -**Claude Reasoning Effort**: parâmetro `reasoning_effort` do OpenAI convertido para o bloco orçamentário `thinking` nativo de Claude em todos os caminhos de solicitação, incluindo ajuste automático de `max_tokens` (#627) -**Atualização de token Qwen**: Implementadas atualizações proativas de token OAuth pré-expiração (buffer de 5 minutos) para evitar falhas nas solicitações ao usar tokens de curta duração (#631)### 🧪 Tests

-**936 testes, 0 falhas**(+10 testes desde 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Tokens NaN no Código Claude/respostas do cliente (#617):**

- `sanitizeUsage()` agora faz mapeamento cruzado de `input_tokens`→`prompt_tokens` e `output_tokens`→`completion_tokens` antes do filtro da lista de permissões, corrigindo respostas que mostram contagens de tokens NaN/0 quando os provedores retornam nomes de campos de uso no estilo Claude### Segurança

- Pacote `yaml` atualizado para corrigir a vulnerabilidade de estouro de pilha (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Fechado #613 (Codestral — resolvido com solução alternativa de provedor personalizado)
- Comentado em # 615 (ponto final duplo OpenCode - solução alternativa fornecida, rastreada como solicitação de recurso)
- Comentário em #618 (visibilidade de chamada de ferramenta — solicitando teste v3.0.9)
- Comentado em #627 (nível de esforço — já suportado)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Falhas de tradução para provedores de formato OpenAI em Claude CLI (#632):**

- Manipula o formato de array `reasoning_details[]` de StepFun/OpenRouter — converte para `reasoning_content`
- Lidar com o alias do campo `reasoning` de alguns provedores → normalizado para `reasoning_content`
- Nomes de campos de uso entre mapas: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` em `filterUsageForFormat`
- Correção de `extractUsage` para aceitar `input_tokens`/`output_tokens` e `prompt_tokens`/`completion_tokens` como campos de uso válidos
- Aplicado a caminhos de streaming (`sanitizeStreamingChunk`, tradutor `openai-to-claude.ts`) e não streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Atualização de token antigravidade:**Corrigido o erro `client_secret is missing` para usuários instalados com npm — o `clientSecretDefault` estava vazio em ProviderRegistry, fazendo com que o Google rejeitasse solicitações de atualização de token (#588) -**Modelos OpenCode Zen:**Adicionado `modelsUrl` à entrada de registro do OpenCode Zen para que "Importar de /models" funcione corretamente (#612) -**Artefatos de streaming:**Foram corrigidas novas linhas excessivas deixadas nas respostas após a remoção da assinatura da tag de pensamento (#626) -**Proxy Fallback:**Adicionada nova tentativa automática sem proxy quando o relé SOCKS5 falha -**Teste de proxy:**O endpoint de teste agora resolve credenciais reais do banco de dados via proxyId### ✨ New Features

-**Seletor de conta/chave do Playground:**Menu suspenso persistente e sempre visível para selecionar contas/chaves de provedores específicos para teste — busca todas as conexões na inicialização e filtra por provedor selecionado -**Modelos dinâmicos de ferramentas CLI:**A seleção de modelos agora é buscada dinamicamente na API `/v1/models` — provedores como Kiro agora mostram seu catálogo completo de modelos -**Lista de modelos antigravidade:**Atualizado com Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; habilitou `passthroughModels` para acesso de modelo dinâmico (#628)### 🔧 Maintenance

- PR # 625 mesclado - correção de plano de fundo do modo claro dos limites do provedor---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limites/Proxy:**Foi corrigido o limite de busca do Codex para contas atrás de proxies SOCKS5 — a atualização do token agora é executada dentro do contexto do proxy -**CI:**Foi corrigida a falha de asserção do teste de integração `v1/models` em ambientes de CI sem conexões de provedor -**Configurações:**O botão de teste de proxy agora mostra resultados de sucesso/falha imediatamente (anteriormente ocultos atrás de dados de saúde)### ✨ New Features

-**Playground:**Adicionado menu suspenso do seletor de conta — teste conexões específicas individualmente quando um provedor tiver várias contas### 🔧 Maintenance

- PR # 623 mesclado - Correção do caminho do URL base da API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limita a IU:**recurso de agrupamento de tags adicionado ao painel de conexões para melhorar a organização visual de contas com tags personalizadas.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Corrigida a corrupção do estado `TextDecoder` dentro do combo `sanitize` TransformStream que causava saída distorcida do SSE correspondendo a caracteres multibyte (PR #614) -**IU de provedores:**renderize com segurança tags HTML dentro de dicas de ferramentas de erro de conexão do provedor usando `dangerouslySetInnerHTML` -**Configurações de proxy:**Adicionadas propriedades ausentes do corpo da carga útil `username` e `password`, permitindo que proxies autenticados sejam verificados com sucesso no Dashboard. -**API do provedor:**A exceção suave vinculada retorna para `getCodexUsage` evitando falhas da API HTTP 500 quando a busca do token falha---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modelos de sincronização automática:**Adicionados um botão de alternância de UI e um endpoint `sync-models` para sincronizar automaticamente listas de modelos por provedor usando um agendador de intervalo agendado (PR #597)### 🐛 Bug Fixes

-**Tempos limite:**Proxies padrão `FETCH_TIMEOUT_MS` e `STREAM_IDLE_TIMEOUT_MS` elevados para 10 minutos para suportar adequadamente modelos de raciocínio profundo (como o1) sem abortar solicitações (Correções #609) -**Detecção de ferramenta CLI:**Detecção de plataforma cruzada aprimorada, manipulando caminhos NVM, Windows `PATHEXT` (evitando problemas de wrappers `.cmd`) e prefixos NPM personalizados (PR #598) -**Logs de streaming:**Implementação do acúmulo delta de `tool_calls` nos logs de resposta de streaming para que as chamadas de função sejam rastreadas e persistidas com precisão no banco de dados (PR #603) -**Catálogo de modelos:**Isenção de autenticação removida, ocultando corretamente os modelos `comfyui` e `sdwebui` quando nenhum provedor está explicitamente configurado (PR #599)### 🌐 Translations

-**cs:**Strings de tradução em tcheco aprimoradas em todo o aplicativo (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Adicionado um campo Tag/Grupo a `EditConnectionModal` (armazenado em `providerSpecificData.tag`) sem exigir migrações de esquema de banco de dados.
- Conexões na visualização do provedor agora são agrupadas dinamicamente por tag com divisores visuais.
- As conexões não marcadas aparecem primeiro sem cabeçalho, seguidas pelos grupos marcados em ordem alfabética.
- O agrupamento de tags se aplica automaticamente à seção Codex/Copilot/Antigravity Limits, uma vez que existem alternâncias dentro das linhas de conexão.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Emblemas ausentes em placas de conexão:**Corrigido usando `resolveProxyForConnection()` em vez de mapeamento estático. -**Testar conexão desabilitada no modo salvo:**Habilitou o botão Teste resolvendo a configuração do proxy da lista salva. -**Configuração de congelamento modal:**Adicionadas chamadas `onClose()` após salvar/limpar para evitar que a UI congele. -**Contagem dupla de uso:**`ProxyRegistryManager` agora carrega o uso avidamente na montagem com desduplicação por `scope` + `scopeId`. As contagens de uso foram substituídas por um botão de teste exibindo IP/latência em linha.#### fix(translator): `function_call` prefix stripping

- Reparada uma correção incompleta do PR #607 onde apenas os blocos `tool_use` retiravam o prefixo da ferramenta `proxy_` de Claude. Agora, os clientes que usam o formato OpenAI Responses API também receberão corretamente ferramentas de ferramentas sem o prefixo `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Três regressões críticas relatadas pelos usuários após o lançamento da v3.0.0 foram resolvidas.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

O prefixo `proxy_` adicionado por Claude OAuth foi removido apenas das respostas de**streaming**. No modo**sem streaming**, `translateNonStreamingResponse` não tinha acesso ao `toolNameMap`, fazendo com que os clientes recebessem nomes de ferramentas distorcidos como `proxy_read_file` em vez de `read_file`.

**Correção:**Adicionado parâmetro opcional `toolNameMap` a `translateNonStreamingResponse` e ​​remoção de prefixo aplicada no manipulador de bloco `tool_use` de Claude. `chatCore.ts` agora passa o mapa.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI não expõe `GET /v1/models`. O validador genérico `validateOpenAICompatibleProvider` caiu em um substituto de conclusão de bate-papo somente se `validationModelId` foi definido, o que LongCat não configura. Isso fez com que a validação do provedor falhasse com um erro enganoso ao adicionar/salvar.

**Correção:**Adicionado `longcat` ao mapa de validadores especializados, sondando `/chat/completions` diretamente e tratando qualquer resposta não autenticada como uma aprovação.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Ferramentas MCP (por exemplo, `pencil`, `computer_use`) encaminham definições de ferramentas com `{type:"object"}` mas sem um campo `properties`. A API da Anthropic os rejeita com: `propriedades ausentes no esquema do objeto`.

**Correção:**Em `openai-to-claude.ts`, injete `properties: {}` como um padrão seguro quando `type` for `"object"` e `properties` estiver ausente.---

### 🔀 Community PRs Merged (2)

| RP       | Autor   | Resumo                                                                                               |
| -------- | ------- | ---------------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): corrigir tradução russa para Playground e Testbed                                        |
| **#591** | @rdself | fix (ui): melhora o contraste do modo de luz dos limites do provedor e a exibição da camada do plano | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 testes, 0 falhas**(inalterado desde a v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **O maior lançamento de todos os tempos.**De 36 provedores na v2.9.5 a**67+ provedores**na v3.0.0 — com servidor MCP, protocolo A2A, mecanismo de combinação automática, ícones de provedor, API de chaves registradas, 926 testes e contribuições de**12 membros da comunidade**em**10 PRs mesclados**.
>
> Consolidado de v3.0.0-rc.1 até rc.17 (17 release candidate em 3 dias de intenso desenvolvimento).---

### 🆕 New Providers (+31 since v2.9.5)

| Provedor                               | Alias ​​         | Nível          | Notas                                                                                       |
| -------------------------------------- | ---------------- | -------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**                       | `opencode-zen`   | Grátis         | 3 modelos via `opencode.ai/zen/v1` (PR #530 por @kang-heewon)                               |
| **OpenCodeGo**                         | `opencode-go`    | Pago           | 4 modelos via `opencode.ai/zen/go/v1` (PR #530 por @kang-heewon)                            |
| **IA LongCat**                         | `lc`             | Grátis         | 50 milhões de tokens/dia (Flash-Lite) + 500 mil/dia (Chat/Thinking) durante beta público    |
| **Polinizações IA**                    | `pol`            | Grátis         | Nenhuma chave de API necessária — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)   |
| **IA dos trabalhadores da Cloudflare** | `cf`             | Grátis         | 10 mil neurônios/dia — ~150 respostas LLM ou 500s de áudio de sussurro, inferência de borda |
| **IA de escalabilidade**               | `scw`            | Grátis         | 1 milhão de tokens grátis para novas contas — compatível com UE/GDPR (Paris)                |
| **API de IA/ML**                       | `aiml`           | Grátis         | Créditos grátis de US$ 0,025/dia — mais de 200 modelos via endpoint único                   |
| **Puter AI**                           | `pu`             | Grátis         | Mais de 500 modelos (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)               |
| **Alibaba Cloud (DashScope)**          | `ali`            | Pago           | Endpoints internacionais + China via `alicode`/`alicode-intl`                               |
| **Plano de codificação Alibaba**       | `bcp`            | Pago           | Alibaba Model Studio com API compatível com Anthropic                                       |
| **Codificação Kimi (chave API)**       | `kmca`           | Pago           | Acesso Kimi dedicado baseado em chave de API (separado do OAuth)                            |
| **Codificação MiniMax**                | `minimáx`        | Pago           | Ponto final internacional                                                                   |
| **MiniMax (China)**                    | `minimax-cn`     | Pago           | Ponto final específico da China                                                             |
| **Z.AI (GLM-5)**                       | `zai`            | Pago           | Modelos GLM de próxima geração Zhipu AI                                                     |
| **Vértice AI**                         | `vértice`        | Pago           | Google Cloud — Conta de serviço JSON ou OAuth access_token                                  |
| **Nuvem Ollama**                       | `ollamacloud`    | Pago           | Serviço API hospedado de Ollama                                                             |
| **Sintético**                          | `sintético`      | Pago           | Gateway de modelos de passagem                                                              |
| **Gateway de quilo**                   | `kg`             | Pago           | Gateway de modelos de passagem                                                              |
| **Pesquisa de perplexidade**           | `pplx-pesquisa`  | Pago           | Endpoint dedicado baseado em pesquisa                                                       |
| **Pesquisa de Serper**                 | `serper-search`  | Pago           | Integração de API de pesquisa na web                                                        |
| **Busca corajosa**                     | `busca corajosa` | Pago           | Integração da API Brave Search                                                              |
| **Pesquisa Exa**                       | `exa-pesquisa`   | Pago           | Integração de API de pesquisa neural                                                        |
| **Pesquisa Tavily**                    | `tavily-search`  | Pago           | Integração da API de pesquisa de IA                                                         |
| **NanoBanana**                         | `nb`             | Pago           | API de geração de imagens                                                                   |
| **OnzeLabs**                           | `el`             | Pago           | Síntese de voz de texto para fala                                                           |
| **Cartesia**                           | `cartesia`       | Pago           | Síntese de voz TTS ultrarrápida                                                             |
| **JogarHT**                            | `play`           | Pago           | Clonagem de voz e TTS                                                                       |
| **No mundo**                           | `no mundo`       | Pago           | Bate-papo por voz com personagens AI                                                        |
| **WebUI SD**                           | `sdwebui`        | Auto-hospedado | Geração de imagem local de difusão estável                                                  |
| **UI confortável**                     | `confortável`    | Auto-hospedado | Geração baseada em nó de fluxo de trabalho local ComfyUI                                    |
| **Codificação GLM**                    | `glm`            | Pago           | Endpoint específico de codificação BigModel/Zhipu                                           | **Total: mais de 67 provedores**(4 gratuitos, 8 OAuth, 55 chaves de API) + provedores personalizados ilimitados compatíveis com OpenAI/Anthropic.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Gere e emita automaticamente chaves de API OmniRoute programaticamente com aplicação de cotas por provedor e por conta.

| Ponto final                       | Método          | Descrição                                                       |
| --------------------------------- | --------------- | --------------------------------------------------------------- |
| `/api/v1/chaves registradas`      | `POSTAR`        | Emitir uma nova chave — chave bruta retornada**apenas uma vez** |
| `/api/v1/chaves registradas`      | `OBTER`         | Listar chaves cadastradas (mascaradas)                          |
| `/api/v1/registered-keys/{id}`    | `OBTER/APAGAR`  | Obter metadados/Revogar                                         |
| `/api/v1/quotas/check`            | `OBTER`         | Pré-validar quota antes de emitir                               |
| `/api/v1/provedores/{id}/limites` | `OBTER/COLOCAR` | Configurar limites de emissão por provedor                      |
| `/api/v1/accounts/{id}/limites`   | `OBTER/COLOCAR` | Configurar limites de emissão por conta                         |
| `/api/v1/issues/report`           | `POSTAR`        | Relatar eventos de cota para problemas do GitHub                |

**Segurança:**Chaves armazenadas como hashes SHA-256. Chave bruta mostrada uma vez na criação, nunca mais recuperável.#### 🎨 Provider Icons via @lobehub/icons (#529)

Mais de 130 logotipos de provedores usando componentes React `@lobehub/icons` (SVG). Cadeia de fallback:**Lobehub SVG → PNG existente → ícone genérico**. Aplicado nas páginas Dashboard, Provedores e Agentes com o componente `ProviderIcon` padronizado.#### 🔄 Model Auto-Sync Scheduler (#488)

Atualiza automaticamente listas de modelos para provedores conectados a cada**24 horas**. Executa na inicialização do servidor. Configurável via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Mapeie padrões de nomes de modelos (glob) para combos específicos para roteamento automático:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nova tabela `model_combo_mappings` com correspondência glob-to-regex
- Seção UI do painel: "Regras de roteamento de modelo" com adição/edição/alternância/exclusão in-line#### 🧭 API Endpoints Dashboard

Catálogo interativo, gerenciamento de webhooks, visualizador OpenAPI — tudo em uma página com guias em `/dashboard/endpoint`.#### 🔍 Web Search Providers

Cinco novas integrações de provedores de pesquisa:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— permitindo respostas de IA fundamentadas com dados da web em tempo real.#### 📊 Search Analytics

Nova aba em `/dashboard/analytics` — detalhamento do provedor, taxa de acerto do cache, rastreamento de custos. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Colunas `max_requests_per_day` e `max_requests_per_second` com aplicação de janela deslizante na memória retornando HTTP 429.#### 🎵 Media Playground

Playground completo de geração de mídia em `/dashboard/media`: geração de imagem, vídeo, música, transcrição de áudio (limite de upload de 2 GB) e conversão de texto em fala.---

### 🔒 Security & CI/CD

-**Correção CodeQL**— Corrigidos mais de 10 alertas: 6 redos polinomiais, 1 aleatoriedade insegura (`Math.random()` → `crypto.randomUUID()`), 1 injeção de comando shell -**Validação de rota**— Esquemas Zod + `validateBody()` em**176/176 rotas de API**— CI aplicado -**Correção CVE**— dompurifica a vulnerabilidade XSS (GHSA-v2wj-7wpq-c8vv) resolvida por meio de substituições npm -**Platted**— Bumped 3.3.3 → 3.4.2 (poluição do protótipo CWE-1321) -**Docker**— `docker/setup-buildx-action` v3 → v4 atualizado---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: erro acionável claro quando `GEMINI_OAUTH_CLIENT_SECRET` ausente no Docker -**#549**— As rotas de configurações CLI agora resolvem a chave de API real de `keyId` (não strings mascaradas) -**#574**— O login não congela mais após ignorar a configuração da senha do assistente -**#506**— `machineId` multiplataforma reescrito (Windows REG.exe → macOS ioreg → Linux → hostname fallback)#### Providers & Routing

-**#536**— LongCat AI: `baseUrl` e `authHeader` corrigidos -**#535**— Substituição do modelo fixado: `body.model` definido corretamente como `pinnedModel` -**#570**— Modelos Claude sem prefixo agora são resolvidos para o provedor Antrópico -**#585**— Tags internas `<omniModel>` não vazam mais para clientes no streaming SSE -**#493**— A nomenclatura personalizada do modelo de provedor não é mais distorcida pela remoção de prefixo -**#490**— Streaming + proteção de cache de contexto via injeção `TransformStream` -**#511**— Tag `<omniModel>` injetada no primeiro bloco de conteúdo (não depois de `[DONE]`)#### CLI & Tools

-**#527**— Claude Code + Codex loop: blocos `tool_result` agora convertidos em texto -**#524**— Configuração OpenCode salva corretamente (XDG_CONFIG_HOME, formato TOML) -**#522**— API Manager: botão enganoso "Copiar chave mascarada" removido -**#546**— `--version` retornando `unknown` no Windows (PR de @k0valik) -**#544**— Detecção segura da ferramenta CLI por meio de caminhos de instalação conhecidos (PR de @k0valik) -**#510**— Caminhos Windows MSYS2/Git-Bash normalizados automaticamente -**#492**— CLI detecta nó gerenciado por `mise`/`nvm` quando `app/server.js` está faltando#### Streaming & SSE

-**PR #587**— Reverter a importação `resolveDataDir` na compatibilidade do AnswerTransformer para Cloudflare Workers (@k0valik) -**PR #495**— Gargalo 429 espera infinita: descarte trabalhos em espera no limite de taxa (@xandr0s) -**#483**— Para de seguir `data: null` após o sinal `[DONE]` -**#473**— Streams Zombie SSE: tempo limite reduzido de 300s → 120s para retorno mais rápido#### Media & Transcription

-**Transcrição**— Deepgram `video/mp4` → `audio/mp4` Mapeamento MIME, detecção automática de idioma, pontuação -**TTS**— Exibição de erro `[object Object]` corrigida para erros aninhados no estilo ElevenLabs -**Limites de upload**— A transcrição de mídia aumentou para 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— coluna `requested_model` nos registros de chamadas (migração 009) -**T02**— Remove blocos de texto vazios de `tool_result.content` aninhados -**T03**— Analisar cabeçalhos de cota `x-codex-5h-*` / `x-codex-7d-*` -**T04**— Cabeçalho `X-Session-Id` para roteamento fixo externo -**T05**— Persistência de banco de dados com limite de taxa e API dedicada -**T06**— Conta desativada → bloqueio permanente (tempo de espera de 1 ano) -**T07**— Validação de IP X-Forwarded-For (`extractClientIp()`) -**T08**— Limites de sessão por chave de API com aplicação de janela deslizante -**T09**— Escopos de limite de taxa Codex vs Spark (pools separados) -**T10**— Créditos esgotados → recuperação de cooldown distinta de 1h -**T11**— esforço de raciocínio `máx` → 131072 tokens de orçamento -**T12**— Entradas de preços do MiniMax M2.7 -**T13**— Correção de exibição de cota obsoleta (redefinir reconhecimento de janela) -**T14**— Verificação de TCP de falha rápida do proxy (≤2s, 30s em cache) -**T15**— Normalização de conteúdo de array para Antrópico -**T23**— Fallback de redefinição de cota inteligente (extração de cabeçalho) -**T24**— tempo de espera `503` + mapeamento `406` -**T25**— substituto de validação do provedor -**T29**— Autenticação JWT da conta de serviço Vertex AI -**T33**— Nível de pensamento para conversão de orçamento -**T36**— classificação de erro `403` vs `429` -**T38**— Especificações do modelo centralizado (`modelSpecs.ts`) -**T39**— Endpoint substituto para `fetchAvailableModels` -**T41**— Redirecionamento automático de tarefas em segundo plano para modelos flash -**T42**— Mapeamento de proporção de aspecto de geração de imagem#### Other Improvements

-**Cabeçalhos upstream personalizados por modelo**— via UI de configuração (PR #575 por @zhangqiang8vip) -**Comprimento do contexto do modelo**— configurável nos metadados do modelo (PR #578 por @hijak) -**Remoção do prefixo do modelo**— opção para remover o prefixo do provedor dos nomes dos modelos (PR #582 por @jay77721) -**Descontinuação do Gemini CLI**— marcado como obsoleto com aviso de restrição do Google OAuth -**Analisador YAML**— substituiu o analisador personalizado por `js-yaml` para análise correta das especificações OpenAPI -**ZWS v5**— Correção de vazamento de HMR (485 conexões de banco de dados → 1, memória 2,4 GB → 195 MB) -**Exportação de log**— Novo botão de exportação JSON no painel com menu suspenso de intervalo de tempo -**Banner de notificação de atualização**— a página inicial do painel mostra quando novas versões estão disponíveis---

### 🌐 i18n & Documentation

-**30 idiomas**com 100% de paridade — 2.788 chaves ausentes sincronizadas -**Tcheco**— Tradução completa: 22 documentos, 2.606 strings de UI (PR por @zen0bit) -**Chinês (zh-CN)**— Retradução completa (PR de @only4copilot) -**Guia de implantação de VM**— Traduzido para o inglês como documento de origem -**Referência de API**— Adicionados endpoints `/v1/embeddings` e `/v1/audio/speech` -**Contagem de provedores**— Atualizado de 36+/40+/44+ para**67+**no README e em todos os 30 READMEs i18n---

### 🔀 Community PRs Merged (10)

| RP       | Autor           | Resumo                                                                                         |
| -------- | --------------- | ---------------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | correção (sse): reverter importação resolveDataDir para compatibilidade com Cloudflare Workers |
| **#582** | @jay77721       | feat(proxy): opção de remoção de prefixo do nome do modelo                                     |
| **#581** | @jay77721       | fix (npm): vincular liberação de elétrons ao fluxo de trabalho de publicação npm               |
| **#578** | @hijak          | façanha: comprimento de contexto configurável nos metadados do modelo                          |
| **#575** | @zhangqiang8vip | talento: cabeçalhos upstream por modelo, PATCH de compatibilidade, alinhamento de chat         |
| **#562** | @coobabm        | correção: gerenciamento de sessão MCP, passagem Claude, detectFormat                           |
| **#561** | @zen0bit        | fix(i18n): Correções de tradução em tcheco                                                     |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` centralizado para resolução de caminho                            |
| **#546** | @k0valik        | fix(cli): `--version` retornando `unknown` no Windows                                          |
| **#544** | @k0valik        | fix(cli): detecção segura de ferramenta CLI por meio de caminhos de instalação                 |
| **#542** | @rdself         | fix(ui): variáveis ​​de tema CSS de contraste de modo claro                                    |
| **#530** | @kang-heewon    | façanha: Provedores OpenCode Zen + Go com `OpencodeExecutor`                                   |
| **#512** | @zhangqiang8vip | façanha: compatibilidade de modelo por protocolo (`compatByProtocol`)                          |
| **#497** | @zhangqiang8vip | correção: vazamentos de recursos HMR no modo de desenvolvimento (ZWS v5)                       |
| **#495** | @xandr0s        | correção: gargalo 429 espera infinita (descartar trabalhos em espera)                          |
| **#494** | @zhangqiang8vip | façanha: Desenvolvedor MiniMax → correção de função do sistema                                 |
| **#480** | @prakersh       | correção: extração de uso de fluxo de fluxo                                                    |
| **#479** | @prakersh       | façanha: Codex 5.3/5.4 e entradas de preços Antrópicos                                         |
| **#475** | @only4copilot   | feat(i18n): tradução chinesa aprimorada                                                        |

**Obrigado a todos os colaboradores!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 testes, 0 falhas**(acima de 821 na v2.9.5)

- +105 novos testes abrangendo: mapeamentos de combinação de modelos, chaves registradas, OpencodeExecutor, provedor Bailian, validação de rota, classificação de erros, mapeamento de proporção de aspecto e muito mais---

### 📦 Database Migrations

| Migração | Descrição                                                              |
| -------- | ---------------------------------------------------------------------- | --- |
| **008**  | tabelas `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**  | Coluna `requested_model` em `call_logs`                                |
| **010**  | Tabela `model_combo_mappings` para roteamento combinado por modelo     | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Alterações importantes:**Nenhuma. Todas as configurações, combos e chaves de API existentes são preservadas.
> As migrações de banco de dados 008-010 são executadas automaticamente na inicialização.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Correção CodeQL**— Corrigidos mais de 10 alertas:

- 6 redos polinomiais em `provider.ts` / `chatCore.ts` (padrões de alternância `(?:^|/)` substituídos por correspondência baseada em segmento)
- 1 aleatoriedade insegura em `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 injeção de comando shell em `prepublish.mjs` (escapamento de caminho `JSON.stringify()`) -**Validação de rota**— Adicionados esquemas Zod + `validateBody()` a 5 rotas sem validação:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` agora passa:**176/176 rotas validadas**### 🐛 Bug Fixes

-**#585**— Tags internas `<omniModel>` não vazam mais para clientes em respostas SSE. Adicionada higienização de saída `TransformStream` em `combo.ts`### ⚙️ Infrastructure

-**Docker**— `docker/setup-buildx-action` atualizado de v3 → v4 (correção de descontinuação do Node.js 20) -**Limpeza de CI**— Excluídas mais de 150 execuções de fluxo de trabalho com falha/canceladas### 🧪 Tests

- Conjunto de testes:**926 testes, 0 falhas**(+3 novos)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Aumento dos limites de transcrição de mídia
- Adicionado comprimento de contexto do modelo aos metadados do registro
- Adicionados cabeçalhos personalizados upstream por modelo por meio da interface de configuração
- Correção de vários bugs, validação do Zod para patches e resolução de vários problemas da comunidade.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Roteamento combinado por modelo: mapeie padrões de nome de modelo (glob) para combos específicos para roteamento automático

- Nova tabela `model_combo_mappings` (migração 010) com padrão, combo_id, prioridade, habilitado
- Função de banco de dados `resolveComboForModel()` com correspondência glob-to-regex (curingas sem distinção entre maiúsculas e minúsculas, `*` e `?`)
- `getComboForModel()` em `model.ts`: aumenta `getCombo()` com fallback de padrão de modelo
- `chat.ts`: a decisão de roteamento agora verifica os mapeamentos de combinação de modelos antes do tratamento de modelo único
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Painel: seção "Regras de roteamento de modelo" adicionada à página Combos com adição/edição/alternância/exclusão in-line
- Exemplos: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Sincronização i18n completa**: 2.788 chaves ausentes adicionadas em 30 arquivos de idiomas — todos os idiomas agora com 100% de paridade com `en.json` -**Página de agentes i18n**: seção de integração OpenCode totalmente internacionalizada (título, descrição, digitalização, rótulos de download) -**6 novas chaves**adicionadas ao namespace `agents` para a seção OpenCode### 🎨 UI/UX

-**Ícones de provedor**: 16 ícones de provedor ausentes adicionados (3 copiados, 2 baixados, 11 SVG criados) -**SVG fallback**: componente `ProviderIcon` atualizado com estratégia de 4 camadas: Lobehub → PNG → SVG → Ícone genérico -**Impressão digital de agentes**: sincronizado com ferramentas CLI — adicionado droid, openclaw, copiloto, opencode à lista de impressões digitais (14 no total)### Segurança

-**Correção CVE**: Resolvida a vulnerabilidade dompurify XSS (GHSA-v2wj-7wpq-c8vv) por meio de substituições npm, forçando `dompurify@^3.3.2`

- `npm audit` agora relata**0 vulnerabilidades**### 🧪 Tests

- Conjunto de testes:**923 testes, 0 falhas**(+15 novos testes de mapeamento de combinação de modelos)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| RP       | Autor    | Resumo                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): gerenciamento de sessão MCP, normalização de passagem Claude, modal OAuth, detectFormat  |
| **#561** | @zen0bit | fix(i18n): Correções de tradução em tcheco — nomes de métodos HTTP e atualizações de documentação | ### 🧪 Tests |

- Conjunto de testes:**908 testes, 0 falhas**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**resolve a chave de API real de `keyId` nas rotas de configurações CLI (`codex-settings`, `droid-settings`, `kilo-settings`) para evitar a escrita de strings mascaradas (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| RP       | Autor    | Resumo                                                                                                                                                                                                                                        |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` retornando `unknown` no Windows — use `JSON.parse(readFileSync)` em vez de importação ESM                                                                                                                               |
| **#555** | @k0valik | fix(sse): `resolveDataDir()` centralizado para resolução de caminho em credenciais, autoCombo, registrador de respostas e registrador de solicitações                                                                                         |
| **#544** | @k0valik | fix(cli): detecção segura de ferramenta CLI por meio de caminhos de instalação conhecidos (8 ferramentas) com validação de link simbólico, verificações de tipo de arquivo, limites de tamanho, ambiente mínimo na verificação de integridade |
| **#542** | @rdself  | fix(ui): melhora o contraste do modo claro — adiciona variáveis ​​de tema CSS ausentes (`bg-primary`, `bg-subtle`, `text-primary`) e corrige cores somente escuras nos detalhes do log                                                        | ### 🔧 Bug Fixes |

-**Correção TDZ em `cliRuntime.ts`**— `validateEnvPath` foi usado antes da inicialização do módulo por `getExpectedParentPaths()`. Declarações reordenadas para corrigir `ReferenceError`. -**Correções de compilação**— Adicionados `pino` e `pino-pretty` a `serverExternalPackages` para evitar que o Turbopack interrompa o carregamento do trabalhador interno do Pino.### 🧪 Tests

- Conjunto de testes:**905 testes, 0 falhas**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regressão de compilação do Electron: Next.js rebaixado de `16.1.x` para `16.0.10` para eliminar a instabilidade de hashing do módulo Turbopack que causava telas em branco no pacote de desktop Electron. -**Correções de testes de unidade**— Corrigidas duas asserções de teste obsoletas (proporção/resolução de `nanobanana-image-handler`, mapeamento de campo `thinking-budget` Gemini `thinkingConfig`) que foram alteradas após mudanças recentes de implementação. -**#541**— Respondeu ao feedback do usuário sobre a complexidade da instalação; nenhuma alteração de código é necessária.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementado usando a biblioteca `jose` para lidar com autenticação JWT/conta de serviço, junto com regiões configuráveis ​​na UI e construção automática de URL do modelo de parceiro. -**T42**— Mapeamento de proporção de aspecto de geração de imagem: lógica `sizeMapper` criada para formatos OpenAI genéricos (`size`), adição de manipulação nativa de `imagen3` e endpoints NanoBanana atualizados para utilizar proporções de aspecto mapeadas automaticamente. -**T38**— Especificações centralizadas do modelo: `modelSpecs.ts` criado para limites e parâmetros por modelo.### 🔧 Improvements

-**T40**— Integração de ferramentas OpenCode CLI: integração nativa `opencode-zen` e `opencode-go` concluída em PR anterior.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown aguarda correção + mapeamento `406`: mapeado `406 Not Acceptable` para `503 Service Unavailable` com intervalos de resfriamento adequados. -**T25**— Fallback de validação do provedor: fallback elegante para modelos de validação padrão quando um `validationModelId` específico não está presente. -**T36**— Refinamento de manipulação do provedor `403` vs `429`: extraído em `errorClassifier.ts` para segregar adequadamente falhas de permissões rígidas (`403`) dos limites de taxa (`429`). -**T39**— Endpoint Fallback para `fetchAvailableModels`: implementado um mecanismo de três camadas (`/models` -> `/v1/models` -> catálogo genérico local) + atualizações da ferramenta MCP `list_models_catalog` para refletir `fonte` e `aviso`. -**T33**— Nível de pensamento para conversão orçamentária: traduz níveis de pensamento qualitativo em alocações orçamentárias precisas. -**T41**— Redirecionamento automático de tarefas em segundo plano: roteia tarefas pesadas de avaliação em segundo plano para modelos flash/eficientes automaticamente. -**T23**— Fallback de redefinição de cota inteligente: extrai com precisão valores de cabeçalho `x-ratelimit-reset` / `retry-after` ou mapeia resfriamentos estáticos.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Atualização da v2.9.5:**16 problemas resolvidos · 2 PRs da comunidade mesclados · 2 novos provedores · 7 novos endpoints de API · 3 novos recursos · Migração de banco de dados 008+009 · 832 testes aprovados · 15 melhorias de lacuna sub2api (T01–T15 completo).### 🆕 New Providers

| Provedor         | Alias ​​       | Nível  | Notas                                                            |
| ---------------- | -------------- | ------ | ---------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Grátis | 3 modelos via `opencode.ai/zen/v1` (PR #530 por @kang-heewon)    |
| **OpenCodeGo**   | `opencode-go`  | Pago   | 4 modelos via `opencode.ai/zen/go/v1` (PR #530 por @kang-heewon) |

Ambos os provedores usam o novo `OpencodeExecutor` com roteamento multiformato (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Gere e emita automaticamente chaves de API OmniRoute programaticamente com aplicação de cotas por provedor e por conta.

| Ponto final                           | Método          | Descrição                                                       |
| ------------------------------------- | --------------- | --------------------------------------------------------------- |
| `/api/v1/chaves registradas`          | `POSTAR`        | Emitir uma nova chave — chave bruta retornada**apenas uma vez** |
| `/api/v1/chaves registradas`          | `OBTER`         | Listar chaves cadastradas (mascaradas)                          |
| `/api/v1/registered-keys/{id}`        | `OBTER`         | Obtenha metadados importantes                                   |
| `/api/v1/registered-keys/{id}`        | `EXCLUIR`       | Revogar uma chave                                               |
| `/api/v1/registered-keys/{id}/revoke` | `POSTAR`        | Revogar (para clientes sem suporte DELETE)                      |
| `/api/v1/quotas/check`                | `OBTER`         | Pré-validar quota antes de emitir                               |
| `/api/v1/provedores/{id}/limites`     | `OBTER/COLOCAR` | Configurar limites de emissão por provedor                      |
| `/api/v1/accounts/{id}/limites`       | `OBTER/COLOCAR` | Configurar limites de emissão por conta                         |
| `/api/v1/issues/report`               | `POSTAR`        | Relatar eventos de cota para problemas do GitHub                |

**DB — Migração 008:**Três novas tabelas: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Segurança:**Chaves armazenadas como hashes SHA-256. Chave bruta mostrada uma vez na criação, nunca mais recuperável.
**Tipos de cota:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` por provedor e por conta.
**Idempotência:**O campo `idempotency_key` evita emissão duplicada. Retorna `409 IDEMPOTENCY_CONFLICT` se a chave já foi usada.
**Orçamento por chave:**`dailyBudget` / `hourlyBudget` — limita quantas solicitações uma chave pode rotear por janela.
**Relatórios do GitHub:**Opcional. Defina `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` para criar automaticamente problemas do GitHub sobre cota excedida ou falhas de emissão.#### 🎨 Provider Icons — @lobehub/icons (#529)

Todos os ícones de provedores no painel agora usam componentes React `@lobehub/icons` (mais de 130 provedores com SVG).
Cadeia de fallback:**Lobehub SVG → `/providers/{id}.png` existente → ícone genérico**. Usa um padrão React `ErrorBoundary` adequado.#### 🔄 Model Auto-Sync Scheduler (#488)

O OmniRoute agora atualiza automaticamente as listas de modelos para provedores conectados a cada**24 horas**.

- Executa na inicialização do servidor através do gancho `/api/sync/initialize` existente
- Configurável via variável de ambiente `MODEL_SYNC_INTERVAL_HOURS`
- Abrange 16 principais fornecedores
- Registra a hora da última sincronização no banco de dados de configurações---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Limpar erro acionável quando `GEMINI_OAUTH_CLIENT_SECRET` está faltando em implantações Docker/auto-hospedadas. Anteriormente, o enigmático `client_secret está faltando` do Google. Agora fornece instruções específicas `docker-compose.yml` e `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Corrigidos `baseUrl` (`api.longcat.chat/openai`) e `authHeader` (`Autorização: Bearer`). -**#535 — Substituição de modelo fixado:**`body.model` agora está corretamente definido como `pinnedModel` quando a proteção de cache de contexto está ativa. -**#532 — Validação de chave OpenCode Go:**Agora usa o endpoint de teste `zen/v1` (`testKeyBaseUrl`) — a mesma chave funciona para ambas as camadas.#### CLI & Tools

-**#527 — Claude Code + Codex loop:**Os blocos `tool_result` agora são convertidos em texto em vez de descartados, interrompendo loops infinitos de resultados de ferramentas. -**#524 — Salvamento de configuração OpenCode:**Adicionado manipulador `saveOpenCodeConfig()` (com reconhecimento de XDG_CONFIG_HOME, escreve TOML). -**#521 — Login travado:**O login não congela mais após pular a configuração da senha — redireciona corretamente para a integração. -**#522 — API Manager:**Removido o botão enganoso "Copiar chave mascarada" (substituído por uma dica de ferramenta com ícone de cadeado). -**#532 — Configuração do OpenCode Go:**O manipulador de configurações do guia agora lida com o toolId `opencode`.#### Developer Experience

-**#489 — Antigravidade:**`googleProjectId` ausente retorna um erro 422 estruturado com orientação de reconexão em vez de uma falha enigmática. -**#510 — Caminhos do Windows:**Caminhos MSYS2/Git-Bash (`/c/Arquivos de Programas/...`) agora são normalizados para `C:\Arquivos de Programas\...` automaticamente. -**#492 — Inicialização da CLI:**`omniroute` CLI agora detecta nó gerenciado por `mise`/`nvm` quando `app/server.js` está faltando e mostra instruções de correção direcionadas.---

### 📖 Documentation Updates

-**#513**— Redefinição de senha do Docker: solução alternativa `INITIAL_PASSWORD` env var documentada -**#520**— pnpm: etapa `pnpm aprovar-builds best-sqlite3` documentada---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| RP       | Autor        | Resumo                                                                   |
| -------- | ------------ | ------------------------------------------------------------------------ | --- |
| **#530** | @kang-heewon | Provedores OpenCode Zen + Go com `OpencodeExecutor` e testes aprimorados | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistência do banco de dados com limite de taxa: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` em `providers.ts`. A coluna `rate_limited_until` existente agora está exposta como uma API dedicada — a atualização do token OAuth NÃO deve tocar neste campo para evitar loops de limite de taxa. -**T08**— Limite de sessão por chave de API: `max_sessions INTEGER DEFAULT 0` adicionado a `api_keys` por meio de migração automática. `sessionManager.ts` ganha `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` e `getActiveSessionCountForKey()`. Os chamadores em `chatCore.js` podem impor o limite e diminuir em `req.close`. -**T09**— Escopos de limite de taxa Codex vs Spark: `getCodexModelScope()` e `getCodexRateLimitKey()` em `codex.ts`. Modelos padrão (`gpt-5.x-codex`, `codex-mini`) obtêm escopo `"codex"`; modelos spark (`codex-spark*`) obtêm o escopo `"spark"`. As chaves de limite de taxa devem ser `${accountId}:${scope}` para que esgotar um pool não bloqueie o outro. -**T13**— Correção de exibição de cota obsoleta: `getEffectiveQuotaUsage(used, resetAt)` retorna `0` quando a janela de redefinição passa; `formatResetCountdown(resetAt)` retorna uma string de contagem regressiva legível por humanos (por exemplo, `"2h 35m"`). Ambos exportados de `providers.ts` + `localDb.ts` para consumo do painel. -**T14**— Fail rápido do proxy: novo `src/lib/proxyHealth.ts` com `isProxyReachable(proxyUrl, timeoutMs=2000)` (verificação de TCP, ≤2s em vez de tempo limite de 30s), `getCachedProxyHealth()`, `invalidateProxyHealth()`, e `getAllProxyHealthStatuses()`. Os resultados são armazenados em cache por 30 segundos por padrão; configurável via `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Conjunto de testes:**832 testes, 0 falhas**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— coluna `requested_model` em `call_logs` (migração 009): rastreia qual modelo o cliente solicitou originalmente versus o modelo roteado real. Permite análise de taxa de fallback. -**T02**— Remove blocos de texto vazios de `tool_result.content` aninhados: evita erros Antrópicos 400 (`os blocos de conteúdo de texto não devem estar vazios`) quando o Claude Code encadeia os resultados da ferramenta. -**T03**— Analise os cabeçalhos `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extraia janelas de cota do Codex para agendamento de resfriamento preciso em vez de fallback genérico de 5 minutos. -**T04**— Cabeçalho `X-Session-Id` para roteamento fixo externo: `extractExternalSessionId()` em `sessionManager.ts` lê cabeçalhos `x-session-id` / `x-omniroute-session` com o prefixo `ext:` para evitar colisão com IDs de sessão SHA-256 internos. Compatível com Nginx (cabeçalho hifenizado). -**T06**— Conta desativada → bloqueio permanente: `isAccountDeactivated()` em `accountFallback.ts` detecta sinais de desativação 401 e aplica um tempo de espera de 1 ano para evitar novas tentativas de contas permanentemente inativas. -**T07**— Validação de IP X-Forwarded-For: novo `src/lib/ipUtils.ts` com `extractClientIp()` e `getClientIpFromRequest()` — ignora entradas `unknown`/não-IP em cadeias `X-Forwarded-For` (solicitações Nginx/encaminhadas por proxy). -**T10**— Créditos esgotados → fallback distinto: `isCreditsExhausted()` em `accountFallback.ts` retorna 1h de resfriamento com sinalizador `creditsExhausted`, distinto da limitação genérica de taxa 429. -**T11**— esforço de raciocínio `max` → 131072 tokens de orçamento: `EFFORT_BUDGETS` e `THINKING_LEVEL_MAP` atualizados; o mapeamento reverso agora retorna `"max"` para respostas com orçamento total. Teste de unidade atualizado. -**T12**— Entradas de preços do MiniMax M2.7 adicionadas: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` adicionadas à tabela de preços (sub2api PR #1120). Os preços M2.5/GLM-4.7/GLM-5/Kimi já existiam. -**T15**— Normalização de conteúdo de array: o auxiliar `normalizeContentToString()` em `openai-to-claude.ts` recolhe corretamente mensagens de sistema/ferramenta formatadas em array para string antes de enviar para Anthropic.### 🧪 Tests

- Conjunto de testes:**832 testes, 0 falhas**(inalterado em relação ao rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API de provisionamento de chaves registradas: emissão automática de chaves de API com aplicação de cota por provedor e por conta

- `POST /api/v1/registered-keys` — emite chaves com suporte a idempotência
- `GET /api/v1/registered-keys` — lista chaves registradas (mascaradas)
- `GET /api/v1/registered-keys/{id}` — obtém metadados de chave
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revogar chaves
- `GET /api/v1/quotas/check` — pré-validar antes de emitir
- `PUT /api/v1/providers/{id}/limits` — definir limites de emissão do provedor
- `PUT /api/v1/accounts/{id}/limits` — definir limites de emissão de contas
- `POST /api/v1/issues/report` — relatório opcional de problemas do GitHub
- Migração de banco de dados 008: tabelas `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Provedores OpenCode Zen e OpenCode Go adicionados (por @kang-heewon)

- Novo `OpencodeExecutor` com roteamento multiformato (`/chat/completions`, `/messages`, `/responses`)
- 7 modelos em ambos os níveis---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Ícones de provedores agora usam [@lobehub/icons](https://github.com/lobehub/lobe-icons) com um elegante substituto PNG e um componente `ProviderIcon` (mais de 130 provedores suportados) -**#488**— Atualização automática de listas de modelos a cada 24 horas via `modelSyncScheduler` (configurável via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: agora mostra um erro acionável claro quando `GEMINI_OAUTH_CLIENT_SECRET` está faltando em implantações Docker/auto-hospedadas---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Validação de chave LongCat AI: baseUrl fixo (`api.longcat.chat/openai`) e authHeader (`Authorization: Bearer`) -**#535**— Substituição do modelo fixado: `body.model` agora é definido como `pinnedModel` quando a proteção do cache de contexto detecta um modelo fixado -**#524**— Configuração do OpenCode agora salva corretamente: adicionado manipulador `saveOpenCodeConfig()` (com reconhecimento de XDG_CONFIG_HOME, escreve TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— O login não fica mais travado após pular a configuração da senha (redireciona para integração) -**#522**— API Manager: Removido o botão enganoso "Copiar chave mascarada" (substituído pela dica de ferramenta do ícone de cadeado) -**#527**— Loop de superpoderes Claude Code + Codex: blocos `tool_result` agora convertidos em texto em vez de descartados -**#532**— A validação da chave da API OpenCode GO agora usa o endpoint `zen/v1` correto (`testKeyBaseUrl`) -**#489**— Antigravidade: `googleProjectId` ausente retorna erro estruturado 422 com orientação de reconexão -**#510**— Windows: caminhos MSYS2/Git-Bash (`/c/Arquivos de Programas/...`) agora são normalizados para `C:\Arquivos de Programas\...` -**#492**— CLI `omniroute` agora detecta `mise`/`nvm` quando `app/server.js` está faltando e mostra correção direcionada### Documentação

-**#513**— Redefinição de senha do Docker: solução alternativa `INITIAL_PASSWORD` env var documentada -**#520**— pnpm: `pnpm aprovar-builds best-sqlite3` documentado### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Novos provedores OpenCode, correção de incorporação de credenciais, bug de chave mascarada CLI, correção CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Ferramentas CLI salvam chave de API mascarada em arquivos de configuração**— As rotas POST `claude-settings`, `cline-settings` e `openclaw-settings` agora aceitam um parâmetro `keyId` e resolvem a chave de API real do banco de dados antes de gravar no disco. `ClaudeToolCard` atualizado para enviar `keyId` em vez da string de exibição mascarada. Correções #523, #526. -**Provedores de incorporação personalizados: erro `Sem credenciais`**— `/v1/embeddings` agora rastreia `credentialsProviderId` separadamente do prefixo de roteamento, portanto, as credenciais são obtidas do ID do nó do provedor correspondente em vez da string de prefixo público. Corrige uma regressão em que `google/gemini-embedding-001` e modelos de provedores personalizados semelhantes sempre falhavam com um erro de credenciais. Correções relacionadas ao # 532. (PR #528 por @jacob2826) -**Faltas de regex de proteção de cache de contexto `
` prefix**— `CACHE_TAG_PATTERN` em `comboAgentMiddleware.ts` atualizado para corresponder a ambos literais `
` (barra invertida-n) e a nova linha U+000A real que o streaming `combo.ts` injeta em torno da tag `<omniModel>` após a correção #515. Correções #531.### ✨ New Providers

-**OpenCode Zen**— Gateway de nível gratuito em `opencode.ai/zen/v1` com 3 modelos: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Serviço de assinatura em `opencode.ai/zen/go/v1` com 4 modelos: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (formato Claude), `minimax-m2.5` (formato Claude)

- Ambos os provedores usam o novo `OpencodeExecutor` que roteia dinamicamente para `/chat/completions`, `/messages`, `/responses` ou `/models/{model}:generateContent` com base no modelo solicitado. (PR #530 por @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Correções de bugs – preserve a chave de cache do prompt do Codex, corrija o escape de tagContent JSON, sincronize o status do token expirado com o banco de dados.### 🐛 Bug Fixes

-**fix(translator)**: Preserva `prompt_cache_key` na API de respostas → tradução de conclusões de bate-papo (#517)
— O campo é um sinal de afinidade de cache usado pelo Codex; removê-lo estava evitando acessos imediatos ao cache.
Corrigido em `openai-responses.ts` e `responsesApiHelper.ts`.

-**consertar(combo)**: Escape `
` em `tagContent` então a string JSON injetada é válida (#515)
— Novas linhas literais do modelo (U+000A) não são permitidas sem escape dentro de valores de string JSON.
Substituído por sequências literais `\n` em `open-sse/services/combo.ts`.

-**correção (uso)**: sincronização do status do token expirado de volta ao banco de dados em caso de falha de autenticação ao vivo (#491)
— Quando a verificação ao vivo de Limites e Cotas retorna 401/403, a conexão `testStatus` agora é atualizada
para `"expired"` no banco de dados para que a página Provedores reflita o mesmo estado degradado.
Corrigido em `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: adicione 5 novos provedores gratuitos de IA — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Adicionar LongCat AI (`lc/`) — 50 milhões de tokens/dia grátis (Flash-Lite) + 500 mil/dia (Chat/Thinking) durante o beta público. Autenticação de portador padrão compatível com OpenAI. -**feat(providers/pollinations)**: Adicionar Pollinations AI (`pol/`) — nenhuma chave de API é necessária. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s grátis). O executor personalizado lida com autenticação opcional. -**feat(providers/cloudflare-ai)**: Adicione Cloudflare Workers AI (`cf/`) — 10 mil neurônios/dia grátis (~150 respostas LLM ou 500s de áudio Whisper). Mais de 50 modelos na vanguarda global. O executor personalizado cria URL dinâmico com `accountId` a partir de credenciais. -**feat(providers/scaleway)**: Adicionar APIs generativas do Scaleway (`scw/`) — 1 milhão de tokens gratuitos para novas contas. Compatível com UE/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Pequeno 3.2. -**feat(providers/aimlapi)**: Adicionar API AI/ML (`aiml/`) — crédito gratuito de US$ 0,025/dia, mais de 200 modelos (GPT-4o, Claude, Gemini, Llama) por meio de endpoint agregador único.### 🔄 Provider Updates

-**feat(providers/together)**: Adicione `hasFree: true` + 3 IDs de modelo permanentemente gratuitos: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Adicione `hasFree: true` + `freeNote` (1.500 req/dia, sem necessidade de cartão de crédito, aistudio.google.com) -**chore(providers/gemini)**: Renomeie o nome de exibição para `Gemini (Google AI Studio)` para maior clareza### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Novo `PollinationsExecutor` — omite o cabeçalho `Authorization` quando nenhuma chave de API é fornecida -**feat(executors/cloudflare-ai)**: Novo `CloudflareAIExecutor` — a construção de URL dinâmica requer `accountId` nas credenciais do provedor -**feat(executores)**: Registra mapeamentos de executores `polinizações`, `pol`, `cloudflare-ai`, `cf`### Documentação

-**docs(readme)**: Pilha combinada gratuita expandida para 11 provedores (US$ 0 para sempre) -**docs(readme)**: Adicionadas 4 novas seções de provedores gratuitos (LongCat, Pollinations, Cloudflare AI, Scaleway) com tabelas de modelo -**docs(readme)**: tabela de preços atualizada com 4 novas linhas de nível gratuito -**docs(i18n/pt-BR)**: Tabela de preços atualizada + seções LongCat/Pollinations/Cloudflare AI/Scaleway adicionadas em português -**docs(new-features/ai)**: 10 arquivos de especificações de tarefas + plano mestre de implementação em `docs/new-features/ai/`### 🧪 Tests

- Conjunto de testes:**821 testes, 0 falhas**(inalterado)---

## [2.9.2] — 2026-03-21

> Sprint: corrige transcrição de mídia (tipo de conteúdo Deepgram/HuggingFace, detecção de idioma) e exibição de erro TTS.### 🐛 Bug Fixes

-**correção (transcrição)**: a transcrição de áudio Deepgram e HuggingFace agora mapeiam corretamente `video/mp4` → `audio/mp4` e outros tipos MIME de mídia por meio do novo auxiliar `resolveAudioContentType()`. Anteriormente, o upload de arquivos `.mp4` retornava consistentemente "Nenhuma fala detectada" porque o Deepgram estava recebendo `Content-Type: video/mp4`. -**fix(transcription)**: Adicionado `detect_language=true` às solicitações do Deepgram — detecta automaticamente o idioma do áudio (português, espanhol, etc.) em vez de usar o inglês como padrão. Corrige transcrições em idiomas diferentes do inglês que retornam resultados vazios ou inúteis. -**fix(transcription)**: Adicionado `punctuate=true` às solicitações do Deepgram para saída de transcrição de maior qualidade com pontuação correta. -**fix(tts)**: exibição de erro `[object Object]` em respostas de conversão de texto em fala corrigida em `audioSpeech.ts` e `audioTranscription.ts`. A função `upstreamErrorResponse()` agora extrai corretamente mensagens de string aninhadas de provedores como ElevenLabs que retornam `{ error: { message: "...", status_code: 401 } }` em vez de uma string de erro simples.### 🧪 Tests

- Conjunto de testes:**821 testes, 0 falhas**(inalterado)### Triaged Issues

-**#508**— Regressão de formato de chamada de ferramenta: logs de proxy solicitados e informações da cadeia de provedores (`needs-info`) -**#510**— Caminho de verificação de integridade da CLI do Windows: informações solicitadas da versão do shell/nó (`needs-info`) -**#485**— Chamadas da ferramenta Kiro MCP: fechadas como problema externo do Kiro (não OmniRoute) -**#442**— Endpoint Baseten /models: fechado (solução alternativa manual documentada) -**#464**— API de provisionamento de chave: reconhecida como item do roteiro---

## [2.9.1] — 2026-03-21

> Sprint: corrige perda de dados SSE omniModel, mescla compatibilidade de modelo por protocolo.### Bug Fixes

-**#511**— Crítico: a tag `<omniModel>` foi enviada após `finish_reason:stop` em fluxos SSE, causando perda de dados. A tag agora é injetada no primeiro pedaço de conteúdo não vazio, garantindo a entrega antes que os SDKs fechem a conexão.### Merged PRs

-**PR #512**(@zhangqiang8vip): Compatibilidade do modelo por protocolo — `normalizeToolCallId` e `preserveOpenAIDeveloperRole` agora podem ser configurados por protocolo de cliente (OpenAI, Claude, API de respostas). Novo campo `compatByProtocol` na configuração do modelo com validação Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: informações de PATH/versão solicitadas -**#509**— Regressão Turbopack Electron: bug upstream do Next.js, soluções alternativas documentadas -**#508**— Tela preta do macOS: solução alternativa sugerida para `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: correção de machineId multiplataforma, limites de taxa por chave de API, cache de contexto de streaming, Alibaba DashScope, análise de pesquisa, ZWS v5 e 8 problemas encerrados.### ✨ New Features

-**feat(search)**: guia Search Analytics em `/dashboard/analytics` — detalhamento do provedor, taxa de acerto do cache, rastreamento de custos. Nova API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope adicionado com validação de caminho de endpoint personalizado — `chatPath` e `modelsPath` configuráveis por nó (#feat/custom-endpoint-paths) -**feat(api)**: Limites de contagem de solicitações por chave de API — colunas `max_requests_per_day` e `max_requests_per_second` com aplicação de janela deslizante na memória retornando HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Correção de vazamento de HMR (485 conexões de banco de dados → 1), memória 2,4 GB → 195 MB, singletons `globalThis`, correção de aviso do Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: `machineId` multiplataforma — `getMachineIdRaw()` reescrito com cascata try/catch (Windows REG.exe → macOS ioreg → leitura do arquivo Linux → nome do host → `os.hostname()`). Elimina a ramificação `process.platform` que o código morto do empacotador Next.js eliminou, corrigindo `'head' não é reconhecido` no Windows. Também corrige #466. -**correção(#493)**: Nomenclatura personalizada do modelo de provedor — remoção incorreta do prefixo em `DefaultExecutor.transformRequest()` que distorcia IDs de modelo com escopo organizacional como `zai-org/GLM-5-FP8`. -**correção(#490)**: Streaming + proteção de cache de contexto — `TransformStream` intercepta SSE para injetar a tag `<omniModel>` antes do marcador `[DONE]`, habilitando a proteção de cache de contexto para respostas de streaming. -**fix(#458)**: Validação de esquema combinado — os campos `system_message`, `tool_filter_regex`, `context_cache_protection` agora passam pela validação Zod ao salvar. -**correção(#487)**: Limpeza do cartão KIRO MITM — removido ZWS_README, `AntigravityToolCard` gerado para usar metadados de ferramentas dinâmicas.### 🧪 Tests

- Adicionados testes de unidade de filtro de ferramentas de formato antrópico (PR #397) — 8 testes de regressão para `tool.name` sem wrapper `.function`
- Conjunto de testes:**821 testes, 0 falhas**(acima de 813)### 📋 Issues Closed (8)

-**#506**— MachineId `head` do Windows não reconhecido (corrigido) -**#493**— Nomeação personalizada do modelo de provedor (corrigido) -**#490**— Cache de contexto de streaming (corrigido) -**#452**— Limites de solicitação por chave de API (implementados) -**#466**— Falha de login do Windows (mesma causa raiz do #506) -**#504**— MITM inativo (comportamento esperado) -**#462**— Gemini CLI PSA (resolvido) -**#434**— Falha no aplicativo Electron (duplicado de #402)## [2.8.9] — 2026-03-20

> Sprint: Mesclar PRs da comunidade, corrigir cartão KIRO MITM, atualizações de dependências.### Merged PRs

-**PR #498**(@Sajid11194): Corrige falha no ID da máquina do Windows (`undefined\REG.exe`). Substitui `node-machine-id` por consultas de registro de sistema operacional nativo.**Fecha #486.** -**PR #497**(@zhangqiang8vip): Correção de vazamentos de recursos HMR no modo de desenvolvimento — 485 conexões de banco de dados vazadas → 1, memória 2,4 GB → 195 MB. Singletons `globalThis`, correção de aviso do Edge Runtime, estabilidade de teste do Windows. (+1168/-338 em 22 arquivos) -**PRs #499-503**(Dependabot): atualizações do GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— O cartão KIRO MITM agora exibe instruções específicas da ferramenta (`api.anthropic.com`) em vez de texto específico da antigravidade. -**#504**— Respondeu com esclarecimento de UX (MITM "Inativo" é o comportamento esperado quando o proxy não está em execução).---

## [2.8.8] — 2026-03-20

> Sprint: Corrija falha no teste em lote do OAuth, adicione o botão "Testar tudo" às páginas individuais do provedor.### Bug Fixes

-**Falha no teste em lote OAuth**(ERR_CONNECTION_REFUSED): Loop for sequencial substituído por limite de simultaneidade de 5 conexões + tempo limite de 30s por conexão via `Promise.race()` + `Promise.allSettled()`. Evita travamento do servidor ao testar grandes grupos de provedores OAuth (mais de 30 conexões).### Funcionalidades

-**Botão "Testar tudo" nas páginas do provedor**: páginas individuais do provedor (por exemplo, `/providers/codex`) agora mostram um botão "Testar tudo" no cabeçalho Conexões quando há mais de 2 conexões. Usa `POST /api/providers/test-batch` com `{mode: "provider", providerId}`. Resultados exibidos em um modal com resumo de aprovação/reprovação e diagnóstico por conexão.---

## [2.8.7] — 2026-03-20

> Sprint: mesclar PR #495 (queda do gargalo 429), correção #496 (provedores de incorporação personalizados), recursos de triagem.### Bug Fixes

-**Gargalo 429 espera infinita**(PR #495 por @xandr0s): Em 429, `limiter.stop({ dropWaitingJobs: true })` falha imediatamente em todas as solicitações enfileiradas para que os chamadores upstream possam acionar o fallback. O limitador é excluído do mapa para que a próxima solicitação crie uma nova instância. -**Modelos de incorporação personalizados não resolvíveis**(#496): `POST /v1/embeddings` agora resolve modelos de incorporação personalizados de TODOS os Provider_nodes (não apenas localhost). Permite modelos como `google/gemini-embedding-001` adicionados via painel.### Issues Responded

-**#452**— Limites de contagem de solicitações por chave de API (reconhecidos, no roteiro) -**#464**— Emissão automática de chaves de API com limites de provedor/conta (precisa de mais detalhes) -**#488**— Listas de modelos com atualização automática (reconhecido, no roteiro) -**#496**— Resolução de provedor de incorporação personalizada (corrigida)---

## [2.8.6] — 2026-03-20

> Sprint: Mesclar PR #494 (correção de função MiniMax), corrigir painel KIRO MITM, triagem de 8 problemas.### Funcionalidades

-**Desenvolvedor MiniMax→correção de função do sistema**(PR #494 por @zhangqiang8vip): alternância `preserveDeveloperRole` por modelo. Adiciona UI de "Compatibilidade" na página de provedores. Corrige 422 "erro de parâmetro de função" para MiniMax e gateways semelhantes. -**roleNormalizer**: `normalizeDeveloperRole()` agora aceita o parâmetro `preserveDeveloperRole` com comportamento tri-state (indefinido=keep, true=keep, false=convert). -**DB**: Novos `getModelPreserveOpenAIDeveloperRole()` e `mergeModelCompatOverride()` em `models.ts`.### Bug Fixes

-**Painel KIRO MITM**(#481/#487): `CLIToolsPageClient` agora roteia qualquer ferramenta `configType: "mitm"` para `AntigravityToolCard` (controles Iniciar/Parar MITM). Anteriormente, apenas o Antigravity era codificado. -**AntigravityToolCard genérico**: usa `tool.image`, `tool.description`, `tool.id` em vez de valores de antigravidade codificados. Protege contra a falta de `defaultModels`.### Cleanup

- Removido `ZWS_README_V2.md` (documentos somente de desenvolvimento do PR #494).### Issues Triaged (8)

-**#487**— Fechado (KIRO MITM corrigido nesta versão) -**#486**— need-info (problema de PATH do Windows REG.exe) -**#489**— need-info (ProjectId de antigravidade ausente, reconexão OAuth necessária) -**#492**— need-info (falta app/server.js no nó gerenciado por mise) -**#490**— Reconhecido (streaming + bloqueio de cache de contexto, correção planejada) -**#491**— Reconhecido (inconsistência do estado de autenticação do Codex) -**#493**— Reconhecido (prefixo do nome do modelo do provedor modal, solução alternativa fornecida) -**#488**— Backlog de solicitação de recursos (listas de modelos com atualização automática)---

## [2.8.5] — 2026-03-19

> Sprint: correção de fluxos SSE zumbis, cache de contexto no primeiro turno, KIRO MITM e triagem de 5 problemas externos.### Bug Fixes

-**Zombie SSE Streams**(#473): Reduza `STREAM_IDLE_TIMEOUT_MS` de 300s → 120s para um fallback de combinação mais rápido quando os provedores travam no meio do stream. Configurável via env var. -**Tag de cache de contexto**(#474): Correção de `injectModelTag()` para lidar com solicitações de primeiro turno (sem mensagens de assistente) — a proteção de cache de contexto agora funciona desde a primeira resposta. -**KIRO MITM**(#481): Altere KIRO `configType` de `guide` → `mitm` para que o painel renderize os controles MITM Start/Stop. -**Teste E2E**(CI): Correção `providers-bailian-coding-plan.spec.ts` — descarte a sobreposição modal pré-existente antes de clicar no botão Adicionar chave de API.### Closed Issues

- #473 — Os fluxos Zombie SSE ignoram o substituto combinado
- #474 — Tag `<omniModel>` do cache de contexto ausente no primeiro turno
- #481 — MITM para KIRO não ativável no painel
- #468 — Servidor remoto Gemini CLI (substituído pela descontinuação #462)
- #438 — Claude não consegue gravar arquivos (problema de CLI externo)
- #439 — AppImage não funciona (solução alternativa documentada para libfuse2)
- #402 — ARM64 DMG "danificado" (solução alternativa documentada para xattr -cr)
- #460 — CLI não executável no Windows (correção PATH documentada)---

## [2.8.4] — 2026-03-19

> Sprint: descontinuação do Gemini CLI, correção do guia VM i18n, correção de segurança do dependabot, expansão do esquema do provedor.### Funcionalidades

-**Descontinuação do Gemini CLI**(#462): marque o provedor `gemini-cli` como obsoleto com aviso — o Google restringe o uso de OAuth de terceiros a partir de março de 2026 -**Esquema de Provedor**(#462): Expanda a validação do Zod com os campos opcionais `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Adicione `VM_DEPLOYMENT_GUIDE.md` ao pipeline de tradução i18n, gere novamente todas as 30 traduções de localidade da fonte em inglês (estavam presas em português)### Segurança

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — corrige a poluição do protótipo CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regressão de aliases de modelo (corrigida na v2.8.2)
- #471 — Traduções do guia VM quebradas
- #483 — Trailing `data: null` após `[DONE]` (corrigido na v2.8.3)### Merged PRs

- #484 — deps: colisão achatada de 3.3.3 para 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: i18n tcheco, correção de protocolo SSE, tradução de guia VM.### Funcionalidades

-**Idioma Tcheco**(#482): Tcheco completo (cs) i18n — 22 documentos, 2.606 strings de UI, atualizações de alternador de idioma (@zen0bit) -**Guia de implantação de VM**: traduzido do português para o inglês como documento fonte (@zen0bit)### Bug Fixes

-**Protocolo SSE**(#483): Pare de enviar `data: null` após o sinal `[DONE]` — corrige `AI_TypeValidationError` em clientes AI SDK estritos (validadores baseados em Zod)### Merged PRs

- #482 — Adicionar idioma tcheco + corrigir VM_DEPLOYMENT_GUIDE.md fonte em inglês (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 PRs mesclados, correção de roteamento de aliases de modelo, exportação de log e triagem de problemas.### Funcionalidades

-**Exportação de Log**: Novo botão Exportar em `/dashboard/logs` com menu suspenso de intervalo de tempo (1h, 6h, 12h, 24h). Baixa JSON de logs de solicitação/proxy/chamada por meio da API `/api/logs/export` (#user-request)### Bug Fixes

-**Roteamento de Aliases de Modelo**(#472): Configurações → Aliases de Modelo agora afetam corretamente o roteamento do provedor, não apenas a detecção de formato. Anteriormente, a saída `resolveModelAlias()` era usada apenas para `getModelTargetFormat()`, mas o ID do modelo original era enviado ao provedor -**Stream Flush Usage**(#480): Os dados de uso do último evento SSE no buffer agora são extraídos corretamente durante o stream flush (mesclados de @prakersh)### Merged PRs

- #480 — Extraia o uso do buffer restante no manipulador de liberação (@prakersh)
- #479 — Adicionar entradas de preços de ID de modelo antrópico e Codex 5.3/5.4 ausentes (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Cinco PRs da comunidade – correções de registro de chamadas de streaming, compatibilidade com Kiro, análise de token de cache, tradução em chinês e IDs de chamada de ferramentas configuráveis.### Funcionalidades

-**feat(logs)**: conteúdo de resposta do log de chamadas agora acumulado corretamente a partir de pedaços brutos do provedor (OpenAI/Claude/Gemini) antes da tradução, corrigindo cargas de resposta vazias no modo de streaming (#470, @zhangqiang8vip) -**feat(providers)**: Normalização de ID de chamada de ferramenta de 9 caracteres configurável por modelo (estilo Mistral) — apenas modelos com a opção habilitada obtêm IDs truncados (#470) -**feat(api)**: API Key PATCH expandida para suportar os campos `allowedConnections`, `name`, `autoResolve`, `isActive` e `accessSchedule` (#470) -**feat(dashboard)**: Layout de resposta inicial na IU de detalhes do log de solicitação (#470) -**feat(i18n)**: Tradução aprimorada em chinês (zh-CN) — retradução completa (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Remove o campo `model` injetado do corpo da solicitação — a API Kiro rejeita campos de nível superior desconhecidos (#478, @prakersh) -**correção (uso)**: Inclui tokens de leitura de cache + criação de cache nos totais de entrada do histórico de uso para análises precisas (#477, @prakersh) -**fix(callLogs)**: Suporta campos de uso do formato Claude (`input_tokens`/`output_tokens`) juntamente com o formato OpenAI, inclui todas as variantes de token de cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: provedor de plano de codificação Bailian com URLs base editáveis, além de contribuições da comunidade para Alibaba Cloud e Kimi Coding.### Funcionalidades

-**feat(providers)**: Adicionado plano de codificação Bailian (`bailian-coding-plan`) — Alibaba Model Studio com API compatível com Anthropic. Catálogo estático de 8 modelos, incluindo Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 e Kimi K2.5. Inclui validação de autenticação personalizada (400=válido, 401/403=inválido) (#467, @Mind-Dragon) -**feat(admin)**: URL padrão editável nos fluxos de criação/edição do Admin do provedor — os usuários podem configurar URLs base personalizados por conexão. Persiste em `providerSpecificData.baseUrl` com validação de esquema Zod rejeitando esquemas não http(s) (#467)### 🧪 Tests

- Adicionados mais de 30 testes de unidade e 2 cenários e2e para o provedor Bailian Coding Plan, cobrindo validação de autenticação, proteção de esquema, comportamento em nível de rota e integração entre camadas---

## [2.7.10] — 2026-03-19

> Sprint: Dois novos provedores contribuídos pela comunidade (Alibaba Cloud Coding, Kimi Coding API-key) e Docker pino fix.### Funcionalidades

-**feat(providers)**: Adicionado suporte ao Alibaba Cloud Coding Plan com dois endpoints compatíveis com OpenAI — `alicode` (China) e `alicode-intl` (internacional), cada um com 8 modelos (#465, @dtk1985) -**feat(providers)**: Adicionado caminho de provedor `kimi-coding-apikey` dedicado — o acesso Kimi Coding baseado em chave de API não é mais forçado através da rota `kimi-coding` somente OAuth. Inclui registro, constantes, API de modelos, configuração e teste de validação (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Adicionada dependência `split2` ausente à imagem do Docker — `pino-abstract-transport` requer isso em tempo de execução, mas não estava sendo copiado para o contêiner independente, causando travamentos de `Cannot find module 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: passagem de subcaminho de respostas do Codex com suporte nativo, falha do Windows MITM corrigida e esquemas de agente Combos ajustados.### Funcionalidades

-**feat(codex)**: passagem de subcaminho de respostas nativas para Codex — roteia nativamente `POST /v1/responses/compact` para o upstream do Codex, mantendo a compatibilidade do Claude Code sem remover o sufixo `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Esquemas Zod (`updateComboSchema` e `createComboSchema`) agora incluem `system_message`, `tool_filter_regex` e `context_cache_protection`. Corrige o bug onde configurações específicas do agente criadas por meio do painel eram descartadas silenciosamente pela camada de validação de back-end (#458) -**correção (mitm)**: falha no perfil Kiro MITM no Windows corrigida - `node-machine-id` falhou devido à falta do env `REG.exe`, e o substituto gerou um erro fatal `crypto não está definido`. Fallback agora importa criptografia de forma segura e correta (#456)---

## [2.7.8] — 2026-03-18

> Sprint: bug de economia de orçamento + agente combinado apresenta UI + correção de segurança de tag omniModel.### 🐛 Bug Fixes

-**correção(orçamento)**: "Salvar Limites" não retorna mais 422 — `warningThreshold` agora é enviado corretamente como fração (0–1) em vez de porcentagem (0–100) (#451) -**correção(combos)**: a tag de cache interna `<omniModel>` agora é removida antes de encaminhar solicitações aos provedores, evitando quebras de sessão de cache (#454)### Funcionalidades

-**feat(combos)**: Seção Agent Features adicionada ao modal de criação/edição de combo — expõe a substituição de `system_message`, `tool_filter_regex` e `context_cache_protection` diretamente do painel (#454)---

## [2.7.7] — 2026-03-18

> Sprint: travamento do pino do Docker, correção do trabalhador de respostas CLI do Codex, sincronização de bloqueio de pacote.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` e `pino-pretty` agora copiados explicitamente no estágio do executor do Docker — O rastreamento autônomo do Next.js perde essas dependências de peer, causando falha de `Cannot find module pino-abstract-transport` na inicialização (#449) -**correção (respostas)**: remoção de `initTranslators()` da rota `/v1/responses` — estava travando o trabalhador Next.js com `o trabalhador saiu` uncaughtException em solicitações CLI do Codex (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` agora confirmado em cada aumento de versão para garantir que o Docker `npm ci` use versões de dependência exatas---

## [2.7.5] — 2026-03-18

> Sprint: melhorias de UX e correção de verificação de integridade da CLI do Windows.### 🐛 Bug Fixes

-**fix(ux)**: Mostra dica de senha padrão na página de login — novos usuários agora veem `"Senha padrão: 123456"` abaixo da entrada de senha (#437) -**fix(cli)**: Claude CLI e outras ferramentas instaladas pelo npm agora detectadas corretamente como executáveis no Windows — spawn usa `shell:true` para resolver wrappers `.cmd` via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: painel de ferramentas de pesquisa, correções i18n, limites do Copilot, correção de validação do Serper.### Funcionalidades

-**feat(search)**: Adicionar Search Playground (10º endpoint), página Search Tools com Compare Providers/Rerank Pipeline/Search History, roteamento de reclassificação local, proteções de autenticação na API de pesquisa (#443 por @Regis-RCR)

- Nova rota: `/dashboard/search-tools`
- Entrada da barra lateral na seção Debug
- `GET /api/search/providers` e `GET /api/search/stats` com proteções de autenticação
- Roteamento local de Provide_nodes para `/v1/rerank`
- Mais de 30 chaves i18n no namespace de pesquisa### 🐛 Bug Fixes

-**correção (pesquisa)**: correção do normalizador de notícias do Brave (retornava 0 resultados), aplicação da pós-normalização do truncamento de max_results, correção do URL de busca da página Endpoints (#443 por @Regis-RCR) -**fix(analytics)**: Localize rótulos de dia/data analíticos — substitua strings em português codificadas por `Intl.DateTimeFormat(locale)` (#444 por @hijak) -**correção (copilot)**: corrija a exibição do tipo de conta do GitHub Copilot, filtre linhas de cota ilimitadas enganosas do painel de limites (#445 por @hijak) -**fix(providers)**: Pare de rejeitar chaves válidas da API Serper — trate respostas não 4xx como autenticação válida (#446 por @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: correção de fallback de cota de API direta do Codex.### 🐛 Bug Fixes

-**correção (codex)**: bloquear contas esgotadas semanalmente em substituto direto da API (#440)

- correspondência de prefixo `resolveQuotaWindow()`: `"weekly"` agora corresponde às chaves de cache `"weekly (7d)"`
- `applyCodexWindowPolicy()` impõe alternâncias `useWeekly`/`use5h` corretamente
- 4 novos testes de regressão (766 no total)---

## [2.7.2] — 2026-03-18

> Sprint: Correções de contraste da interface do usuário no modo claro.### 🐛 Bug Fixes

-**fix(logs)**: Corrige o contraste do modo light nos botões de filtro de logs de solicitação e emblema de combinação (#378)

- Botões de filtro Erro/Sucesso/Combo agora legíveis no modo claro
- O emblema da linha combinada usa violeta mais forte no modo claro---

## [2.7.1] — 2026-03-17

> Sprint: Roteamento unificado de pesquisa na web (POST /v1/search) com 5 provedores + correções de segurança Next.js 16.1.7 (6 CVEs).### ✨ New Features

-**feat(search)**: Roteamento unificado de pesquisa na web — `POST /v1/search` com 5 provedores (Serper, Brave, Perplexity, Exa, Tavily)

- Failover automático entre provedores, mais de 6.500 pesquisas gratuitas/mês
- Cache na memória com coalescência de solicitação (TTL configurável)
- Painel: guia Search Analytics em `/dashboard/analytics` com detalhamento do provedor, taxa de acerto do cache, rastreamento de custos
- Nova API: `GET /api/v1/search/analytics` para estatísticas de solicitação de pesquisa
- Migração de banco de dados: coluna `request_type` em `call_logs` para rastreamento de solicitações que não sejam de bate-papo
- Validação Zod (`v1SearchSchema`), autenticada, custo registrado via `recordCost()`### Segurança

-**deps**: Next.js 16.1.6 → 16.1.7 — corrige 6 CVEs: -**Crítico**: CVE-2026-29057 (contrabando de solicitação HTTP via proxy http) -**Alto**: CVE-2026-27977, CVE-2026-27978 (WebSocket + ações do servidor) -**Médio**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Arquivo                                                       | Finalidade                                             |
| ------------------------------------------------------------- | ------------------------------------------------------ | --- |
| `open-sse/handlers/search.ts`                                 | Manipulador de pesquisa com roteamento de 5 provedores |
| `open-sse/config/searchRegistry.ts`                           | Registro do provedor (autenticação, custo, cota, TTL)  |
| `open-sse/services/searchCache.ts`                            | Cache na memória com coalescência de solicitação       |
| `src/app/api/v1/search/route.ts`                              | Rota Next.js (POST + GET)                              |
| `src/app/api/v1/search/analytics/route.ts`                    | API de estatísticas de pesquisa                        |
| `src/app/(painel)/dashboard/analytics/SearchAnalyticsTab.tsx` | Guia do painel de análise                              |
| `src/lib/db/migrations/007_search_request_type.sql`           | Migração de banco de dados                             |
| `testes/unidade/search-registry.test.mjs`                     | 277 linhas de testes unitários                         | --- |

## [2.7.0] — 2026-03-17

> Sprint: recursos inspirados no ClawRouter — sinalizador toolCalling, detecção de intenção multilíngue, fallback baseado em benchmark, desduplicação de solicitação, RouterStrategy conectável, preços Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast — `$0,20/$0,50 por 1 milhão de tokens`, latência p50 de 1143ms, chamada de ferramenta suportada -**feat(preço)**: xAI Grok-4 (padrão) — `$0,20/$1,50 por 1 milhão de tokens`, carro-chefe do raciocínio -**feat(pricing)**: GLM-5 via Z.AI — `$0,5/1M`, contexto de saída de 128K -**feat(pricing)**: MiniMax M2.5 — `$0,30/1M de entrada`, raciocínio + tarefas de agente -**feat(pricing)**: DeepSeek V3.2 — preço atualizado `$0,27/$1,10 por 1 milhão` -**feat(preço)**: Kimi K2.5 via API Moonshot — acesso direto à API Moonshot -**feat(providers)**: provedor Z.AI adicionado (alias `zai`) — Família GLM-5 com saída de 128K### 🧠 Routing Intelligence

-**feat(registry)**: sinalizador `toolCalling` por modelo no registro do provedor — combos agora podem preferir/exigir modelos capazes de chamar ferramentas -**feat(scoring)**: detecção de intenção multilíngue para pontuação AutoCombo — padrões de script/linguagem PT/ZH/ES/AR influenciam a seleção do modelo por contexto de solicitação -**feat(fallback)**: cadeias de fallback orientadas por benchmark — dados de latência real (p50 de `comboMetrics`) usados para reordenar a prioridade de fallback dinamicamente -**feat(dedup)**: Solicita desduplicação via content-hash — janela de idempotência de 5 segundos evita que chamadas duplicadas do provedor tentem novamente clientes -**feat(router)**: Interface `RouterStrategy` conectável em `autoCombo/routerStrategy.ts` — lógica de roteamento personalizada pode ser injetada sem modificar o núcleo### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 novos esquemas de ferramentas avançadas: `omniroute_get_provider_metrics` (p50/p95/p99 por provedor) e `omniroute_explain_route` (explicação da decisão de roteamento) -**feat(mcp)**: escopos de autenticação da ferramenta MCP atualizados — escopo `metrics:read` adicionado para ferramentas de métricas do provedor -**feat(mcp)**: `omniroute_best_combo_for_task` agora aceita o parâmetro `languageHint` para roteamento multilíngue### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` estendido com rastreamento de percentil de latência em tempo real por provedor/conta -**feat(health)**: API Health (`/api/monitoring/health`) agora retorna campos `p50Latency` e `errorRate` por provedor -**feat(usage)**: migração do histórico de uso para rastreamento de latência por modelo### 🗄️ DB Migrations

-**feat(migrations)**: Nova coluna `latency_p50` na tabela `combo_metrics` — quebra zero, segura para usuários existentes### 🐛 Bug Fixes / Closures

-**close(#411)**: resolução do módulo hash melhor-sqlite3 no Windows — corrigido na v2.6.10 (f02c5b5) -**close(#409)**: as conclusões do bate-papo do GitHub Copilot falham com modelos Claude quando os arquivos são anexados — corrigido na v2.6.9 (838f1d6) -**close(#405)**: Duplicado de #411 — resolvido## [2.6.10] — 2026-03-17

> Correção do Windows: download pré-construído do best-sqlite3 sem node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: No Windows, `npm install -g omniroute` costumava falhar com `better_sqlite3.node não é um aplicativo Win32 válido` porque o binário nativo incluído foi compilado para Linux. Adiciona**Strategy 1.5**a `scripts/postinstall.mjs`: usa `@mapbox/node-pre-gyp install --fallback-to-build=false` (empacotado em `better-sqlite3`) para baixar o binário pré-construído correto para o sistema operacional/arch atual sem exigir nenhuma ferramenta de construção (sem node-gyp, sem Python, sem MSVC). Volta para `npm reconstruir` somente se o download falhar. Adiciona mensagens de erro específicas da plataforma com instruções claras de correção manual.---

## [2.6.9] — 2026-03-17

> Correções de CI (t11 any-budget), correção de bug #409 (anexos de arquivos via Copilot+Claude), liberação de correção de fluxo de trabalho.### 🐛 Bug Fixes

-**fix(ci)**: Remova a palavra "any" dos comentários em `openai-responses.ts` e `chatCore.ts` que estavam falhando na verificação de orçamento t11 `any` (falso positivo dos comentários de contagem de regex) -**fix(chatCore)**: normaliza tipos de partes de conteúdo não suportados antes de encaminhar para provedores (#409 — O cursor envia `{type:"file"}` quando arquivos `.md` são anexados; o Copilot e outros provedores compatíveis com OpenAI rejeitam com "o tipo deve ser 'image_url' ou 'text'"; a correção converte blocos `file`/`document` em `text` e descarta tipos desconhecidos)### 🔧 Workflow

-**chore(generate-release)**: Adicionar ATOMIC COMMIT RULE — version bump (`npm version patch`) DEVE acontecer antes de submeter os arquivos de recursos para garantir que a tag sempre aponte para um commit contendo todas as alterações de versão juntas---

## [2.6.8] — 2026-03-17

> Sprint: Combo como Agente (prompt do sistema + filtro de ferramenta), Proteção de Cache de Contexto, Atualização Automática, Logs Detalhados, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Nova tabela `request_detail_logs` com gatilho de buffer de anel de 500 entradas, ativação por meio de alternância de configurações### Funcionalidades

-**feat(combo)**: Substituição de mensagem do sistema por Combo (#399 — o campo `system_message` substitui ou injeta o prompt do sistema antes de encaminhar ao provedor) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` mantém apenas ferramentas correspondentes ao padrão; suporta formatos OpenAI + Anthropic) -**feat(combo)**: Proteção de cache de contexto (#401 — `context_cache_protection` marca respostas com `<omniModel>provider/model</omniModel>` e modelo de pinos para continuidade da sessão) -**feat(settings)**: Atualização automática via configurações (#320 — `GET /api/system/version` + `POST /api/system/update` — verifica o registro npm e atualizações em segundo plano com reinicialização do pm2) -**feat(logs)**: Logs de solicitação detalhados (nº 378 — captura corpos completos do pipeline em 4 estágios: solicitação do cliente, solicitação traduzida, resposta do provedor, resposta do cliente — alternância de aceitação, corte de 64 KB, buffer de anel de 500 entradas) -**feat(mitm)**: perfil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` tem como alvo api.anthropic.com, reutiliza a infraestrutura MITM existente)---

## [2.6.7] — 2026-03-17

> Sprint: melhorias de SSE, extensões de Provide_nodes locais, registro de proxy, correções de passthrough de Claude.### Funcionalidades

-**feat(health)**: verificação de integridade em segundo plano para `provider_nodes` locais com espera exponencial (30s→300s) e `Promise.allSettled` para evitar bloqueio (#423, @Regis-RCR) -**feat(embeddings)**: Roteie `/v1/embeddings` para `provider_nodes` locais — `buildDynamicEmbeddingProvider()` com validação de nome de host (#422, @Regis-RCR) -**feat(audio)**: Roteie TTS/STT para `provider_nodes` locais — `buildDynamicAudioProvider()` com proteção SSRF (#416, @Regis-RCR) -**feat(proxy)**: registro de proxy, APIs de gerenciamento e generalização de limite de cota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Remove campos específicos do Claude (`metadata`, `anthropic_version`) quando o alvo é compatível com OpenAI (#421, @prakersh) -**fix(sse)**: Extraia o uso de Claude SSE (`input_tokens`, `output_tokens`, tokens de cache) no modo de fluxo de passagem (#420, @prakersh) -**fix(sse)**: gera substituto `call_id` para chamadas de ferramentas com IDs ausentes/vazios (#419, @prakersh) -**fix(sse)**: passagem de Claude para Claude — corpo dianteiro completamente intocado, sem retradução (#418, @prakersh) -**fix(sse)**: Filtre itens `tool_result` órfãos após a compactação de contexto do Claude Code para evitar erros 400 (#417, @prakersh) -**fix(sse)**: Ignora chamadas de ferramenta de nome vazio no tradutor da API Responses para evitar loops infinitos `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Remove blocos de conteúdo de texto vazios antes da tradução (#427, @prakersh) -**fix(api)**: Adicione `refreshable: true` à configuração de teste Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` e devDependencies relacionados (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Compatibilidade com Turbopack/Docker — remova o protocolo `node:` de todas as importações `src/`.### 🐛 Bug Fixes

-**fix(build)**: Removido o prefixo do protocolo `node:` das instruções `import` em 17 arquivos em `src/`. As importações `node:fs`, `node:path`, `node:url`, `node:os` etc. causaram um erro no `arquivo Ecmascript` em compilações do Turbopack (Next.js 15 Docker) e em atualizações de instalações globais npm mais antigas. Arquivos afetados: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` e outros 12 em `src/app/api/` e `src/lib/`. -**chore(workflow)**: `generate-release.md` atualizado para fazer com que o Docker Hub sincronize e implante dual-VPS**etapas obrigatórias**em cada versão.---

## [2.6.5] — 2026-03-17

> Sprint: filtragem de parâmetros do modelo de raciocínio, correção 404 do provedor local, provedor Kilo Gateway, problemas de dependência.### ✨ New Features

-**feat(api)**: Adicionado**Kilo Gateway**(`api.kilo.ai`) como um novo provedor de chave de API (alias `kg`) — mais de 335 modelos, 6 modelos gratuitos, 3 modelos de roteamento automático (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modelos de passagem suportados por meio do endpoint `/api/gateway/models`. (PR #408 por @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Remove parâmetros não suportados para modelos de raciocínio (o1, o1-mini, o1-pro, o3, o3-mini). Modelos na família `o1`/`o3` rejeitam `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` e `n` com HTTP 400. Os parâmetros agora são removidos na camada `chatCore` antes do encaminhamento. Usa um campo declarativo `unsupportedParams` por modelo e um mapa O(1) pré-computado para pesquisa. (PR #412 por @Regis-RCR) -**fix(sse)**: o provedor local 404 agora resulta em um**bloqueio somente do modelo (5 segundos)**em vez de um bloqueio no nível da conexão (2 minutos). Quando um backend de inferência local (Ollama, LM Studio, oMLX) retorna 404 para um modelo desconhecido, a conexão permanece ativa e outros modelos continuam funcionando imediatamente. Também corrige um bug pré-existente onde `model` não foi passado para `markAccountUnavailable()`. Provedores locais detectados via nome de host (`localhost`, `127.0.0.1`, `::1`, extensível via `LOCAL_HOSTNAMES` env var). (PR #410 por @Regis-RCR)### 📦 Dependencies

- `melhor-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agente` 7 → 8
- `base-agente` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: nomes de modelos inexistentes removidos em 5 provedores: -**gemini / gemini-cli**: removidos `gemini-3.1-pro/flash` e `gemini-3-*-preview` (não existem na API do Google v1beta); substituído por `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravidade**: `gemini-3.1-pro-high/low` e `gemini-3-flash` removidos (aliases internos inválidos); substituído por modelos 2.x reais -**github (Copilot)**: removido `gemini-3-flash-preview` e `gemini-3-pro-preview`; substituído por `gemini-2.5-flash` -**nvidia**: `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` corrigido (NVIDIA NIM usa namespace `meta/` para modelos Meta); adicionado `nvidia/llama-3.1-70b-instruct` e `nvidia/llama-3.1-405b-instruct` -**correção (db/combo)**: combo `free-stack` atualizado no banco de dados remoto: `qw/qwen3-coder-plus` removido (token de atualização expirado), `nvidia/llama-3.3-70b-instruct` corrigido`→`nvidia/meta/llama-3.3-70b-instruct`, `gemini/gemini-3.1-flash` corrigido` → `gemini/gemini-2.5-flash`, adicionado `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: hash-strip zod/pino incorporado no pipeline de construção, provedor sintético adicionado, caminho VPS PM2 corrigido.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip agora roda em**tempo de compilação**para TODOS os pacotes — não apenas `better-sqlite3`. A etapa 5.6 em `prepublish.mjs` percorre cada `.js` em `app/.next/server/` e remove o sufixo hexadecimal de 16 caracteres de qualquer `require()` com hash. Corrige `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND em instalações npm globais. Fecha #398 -**fix(deploy)**: PM2 em ambos os VPS estava apontando para diretórios obsoletos do git-clone. Reconfigurado para `app/server.js` no pacote global npm. Fluxo de trabalho `/deploy-vps` atualizado para usar `npm pack + scp` (o registro npm rejeita pacotes de 299 MB).### Funcionalidades

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — inferência compatível com OpenAI com foco na privacidade. `passthroughModels: true` para catálogo de modelos dinâmicos do HuggingFace. Modelos iniciais: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 por @Regis-RCR)### 📋 Issues Closed

-**close #398**: regressão de hash npm — corrigida por hash-strip em tempo de compilação na pré-publicação -**triagem #324**: Captura de tela do bug sem etapas — detalhes de reprodução solicitados---

## [2.6.2] — 2026-03-16

> Sprint: hashing de módulo totalmente corrigido, 2 PRs mesclados (filtro de ferramentas antrópicas + caminhos de endpoint personalizados), provedor Alibaba Cloud DashScope adicionado, 3 problemas obsoletos fechados.### 🐛 Bug Fixes

-**fix(build)**: Hash-strip `externals` do webpack estendido para cobrir TODOS os `serverExternalPackages`, não apenas `better-sqlite3`. Next.js 16 Turbopack hashes `zod`, `pino` e todos os outros pacotes externos do servidor em nomes como `zod-dcb22c6336e0bc69` que não existem em `node_modules` em tempo de execução. Um pega-tudo da regex HASH_PATTERN agora remove o sufixo de 16 caracteres e retorna ao nome do pacote base. Também foi adicionado `NEXT_PRIVATE_BUILD_WORKER=0` em `prepublish.mjs` para reforçar o modo webpack, além de uma verificação pós-construção que relata quaisquer referências com hash restantes. (#396, #398, RP #403) -**fix(chat)**: Nomes de ferramentas em formato antrópico (`tool.name` sem wrapper `.function`) foram eliminados silenciosamente pelo filtro de nome vazio introduzido em #346. Solicitações de proxies LiteLLM com o prefixo `antrópico/` no formato da API de mensagens antrópicas, fazendo com que todas as ferramentas sejam filtradas e o Anthropic retorne `400: tool_choice.any só pode ser especificado ao fornecer ferramentas`. Corrigido ao voltar para `tool.name` quando `tool.function.name` está ausente. Adicionados 8 testes de unidade de regressão. (RP #397)### Funcionalidades

-**feat(api)**: Caminhos de endpoint personalizados para nós de provedores compatíveis com OpenAI — configure `chatPath` e `modelsPath` por nó (por exemplo, `/v4/chat/completions`) na UI de conexão do provedor. Inclui uma migração de banco de dados (`003_provider_node_custom_paths.sql`) e limpeza de caminho de URL (sem passagem `..`, deve começar com `/`). (RP #400) -**feat(provider)**: Alibaba Cloud DashScope adicionado como provedor compatível com OpenAI. Endpoint internacional: `dashscope-intl.aliyuncs.com/compatível-mode/v1`. 12 modelos: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Autenticação: chave de API do portador.### 📋 Issues Closed

-**fechar #323**: Erro de conexão Cline `[objeto Objeto]` — corrigido na v2.3.7; instruiu o usuário a atualizar da v2.2.9 -**fechar #337**: Rastreamento de crédito Kiro — implementado na v2.5.5 (#381); apontou o usuário para Dashboard → Uso -**triagem #402**: ARM64 macOS DMG danificado — versão solicitada do macOS, erro exato e solução alternativa recomendada para `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Correção crítica de inicialização: as instalações globais do npm v2.6.0 travaram com um erro 500 devido a um bug de hashing do nome do módulo Turbopack/webpack no gancho de instrumentação Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Força `better-sqlite3` a ser sempre solicitado pelo nome exato do pacote no pacote do servidor webpack. Next.js 16 compilou o gancho de instrumentação em um pedaço separado e emitiu `require('better-sqlite3-<hash>')` — um nome de módulo com hash que não existe em `node_modules` — mesmo que o pacote tenha sido listado em `serverExternalPackages`. Adicionada uma função `externals` explícita à configuração do webpack do servidor para que o bundler sempre emita `require('better-sqlite3')`, resolvendo o `500 Internal Server Error` de inicialização em instalações globais limpas. (#394, RP #395)### 🔧 CI

-**ci**: Adicionado `workflow_dispatch` a `npm-publish.yml` com proteção de sincronização de versão para gatilhos manuais (#392) -**ci**: Adicionado `workflow_dispatch` a `docker-publish.yml`, GitHub Actions atualizado para as versões mais recentes (#392)---

## [2.6.0] - 2026-03-15

> Sprint de resolução de problemas: 4 bugs corrigidos, UX de registros melhorado, rastreamento de crédito Kiro adicionado.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI e SD WebUI não aparecem mais na lista de provedores de páginas de mídia quando não configurados — busca `/api/providers` na montagem e oculta provedores locais sem conexões (#390) -**fix(auth)**: Round-robin não seleciona mais contas com taxa limitada imediatamente após o resfriamento — `backoffLevel` agora é usado como chave de classificação primária na rotação LRU (#340) -**correção (oauth)**: Qoder (e outros provedores que redirecionam para sua própria UI) não deixam mais o modal OAuth preso em "Aguardando autorização" — transições automáticas do detector pop-up fechado para o modo de entrada manual de URL (#344) -**correção (logs)**: a tabela de log de solicitações agora pode ser lida no modo claro — emblemas de status, contagens de tokens e tags de combinação usam classes de cores adaptativas `dark:` (#378)### Funcionalidades

-**feat(kiro)**: rastreamento de crédito Kiro adicionado ao buscador de uso — consulta `getUserCredits` do endpoint AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)**: `test:plan3`, `test:fixes`, `test:security` alinhados para usar o mesmo carregador `tsx/esm` que `npm test` — elimina falsos negativos de resolução de módulo em execuções direcionadas (PR #386)---

## [2.5.9] - 2026-03-15

> Correção de passagem nativa do Codex + fortalecimento da validação do corpo da rota.### 🐛 Bug Fixes

-**fix(codex)**: preserva a passagem da API de respostas nativas para clientes Codex — evita mutações de tradução desnecessárias (PR #387) -**fix(api)**: valida corpos de solicitação em preços/sincronização e rotas de roteamento de tarefas — evita falhas causadas por entradas malformadas (PR #388) -**fix(auth)**: os segredos do JWT persistem nas reinicializações via `src/lib/db/secrets.ts` — elimina erros 401 após a reinicialização do pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Correção de compilação: restaure a conectividade VPS quebrada pela publicação incompleta da v2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` ainda usa o sinalizador obsoleto `--webpack` fazendo com que a compilação autônoma do Next.js falhe silenciosamente — publicação npm concluída sem `app/server.js`, interrompendo a implantação do VPS---

## [2.5.7] - 2026-03-15

> Correções de tratamento de erros do Media Playground.### 🐛 Bug Fixes

-**correção (mídia)**: transcrição "Chave de API necessária" falso positivo quando o áudio não contém fala (música, silêncio) — agora mostra "Nenhuma fala detectada" -**fix(media)**: `upstreamErrorResponse` em `audioTranscription.ts` e `audioSpeech.ts` agora retorna JSON adequado (`{error:{message}}`), permitindo a detecção correta de erros de credencial 401/403 no MediaPageClient -**fix(media)**: `parseApiError` agora lida com o campo `err_msg` do Deepgram e detecta `"api key"` em mensagens de erro para classificação precisa de erros de credencial---

## [2.5.6] - 2026-03-15

> Correções críticas de segurança/autenticação: OAuth antigravidade quebrado + sessões JWT perdidas após reinicialização.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth now correctly sends `client_secret` to the token endpoint. O substituto para `ANTIGRAVITY_OAUTH_CLIENT_SECRET` era uma string vazia, o que é falso - então `client_secret` nunca foi incluído na solicitação, causando erros `"client_secret is missing"` para todos os usuários sem uma variável de ambiente personalizada. Fecha #383. -**fix(auth) #385**: `JWT_SECRET` agora é persistido no SQLite (`namespace='secrets'`) na primeira geração e recarregado nas inicializações subsequentes. Anteriormente, um novo segredo aleatório era gerado a cada inicialização do processo, invalidando todos os cookies/sessões existentes após qualquer reinicialização ou atualização. Afeta `JWT_SECRET` e `API_KEY_SECRET`. Fecha #382.---

## [2.5.5] - 2026-03-15

> Correção de desduplicação de lista de modelos, proteção de construção autônoma Electron e rastreamento de crédito Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` agora inclui aliases de provedor ao construir o filtro de provedor ativo — modelos para `claude` (alias `cc`) e `github` (alias `gh`) sempre eram mostrados independentemente de uma conexão ter sido configurada, porque as chaves `PROVIDER_MODELS` são aliases, mas as conexões de banco de dados são armazenadas em IDs de provedor. Corrigido ao expandir cada ID de provedor ativo para incluir também seu alias via `PROVIDER_ID_TO_ALIAS`. Fecha #353. -**fix(electron) #379**: O novo `scripts/prepare-electron-standalone.mjs` prepara um pacote `/.next/electron-standalone` dedicado antes do empacotamento do Electron. Aborta com um erro claro se `node_modules` for um link simbólico (o elétron-construtor enviaria uma dependência de tempo de execução na máquina de construção). Limpeza de caminho entre plataformas via `path.basename`. Por @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Rastreamento de saldo de crédito Kiro — endpoint de uso agora retorna dados de crédito para contas Kiro chamando `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (mesmo endpoint que Kiro IDE usa internamente). Retorna os créditos restantes, o subsídio total, a data de renovação e o nível de assinatura. Fecha #337.## [2.5.4] - 2026-03-15

> Correção de inicialização do Logger, correção de segurança de inicialização de login e melhoria de confiabilidade do dev HMR. Infraestrutura de CI reforçada.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Restaurar o caminho do registrador de transporte do pino — `formatters.level` combinado com `transport.targets` é rejeitado pelo pino. As configurações suportadas por transporte agora removem o formatador de nível via `getTransportCompatibleConfig()`. Também corrige o mapeamento de nível numérico em `/api/logs/console`: `30→info, 40→warn, 50→error` (foi alterado em um). -**fix(login) #375**: A página de login agora é inicializada a partir do endpoint público `/api/settings/require-login` em vez do protegido `/api/settings`. Em configurações protegidas por senha, a página de pré-autenticação recebia um 401 e voltava aos padrões seguros desnecessariamente. A rota pública agora retorna todos os metadados de bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) com um fallback conservador de 200 em caso de erro. -**fix(dev) #374**: Adicione `localhost` e `127.0.0.1` a `allowedDevOrigins` em `next.config.mjs` — O websocket HMR foi bloqueado ao acessar o aplicativo via endereço de loopback, produzindo repetidos avisos de origem cruzada.### 🔧 CI & Infrastructure

-**Correção ESLint OOM**: `eslint.config.mjs` agora ignora `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` e `clipr/**` — ESLint estava travando com um heap OOM JS ao verificar blobs binários do VS Code e pedaços compilados. -**Correção de teste de unidade**: `ALTER TABLE Provider_connections ADD COLUMN "group"` obsoleto removido de 2 arquivos de teste - a coluna agora faz parte do esquema base (adicionado em # 373), causando `SQLITE_ERROR: nome de coluna duplicado` em cada execução de CI. -**Gancho de pré-commit**: Adicionado `npm run test:unit` a `.husky/pre-commit` — os testes de unidade agora bloqueiam commits quebrados antes que eles cheguem ao CI.## [2.5.3] - 2026-03-14

> Correções de bugs críticos: migração de esquema de banco de dados, carregamento de ambiente de inicialização, limpeza de estado de erro do provedor e correção de dica de ferramenta i18n. Melhorias na qualidade do código além de cada PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Adicionada coluna `provider_connections.group` ao esquema base + migração de backfill para bancos de dados existentes — a coluna foi usada em todas as consultas, mas ausente na definição do esquema -**fix(i18n) #371**: Substitua a chave `t("deleteConnection")` inexistente pela chave `providers.delete` existente — corrige o erro de tempo de execução `MISSING_MESSAGE: provedores.deleteConnection` na página de detalhes do provedor -**fix(auth) #372**: Limpar metadados de erro obsoletos (`errorCode`, `lastErrorType`, `lastErrorSource`) das contas do provedor após a recuperação genuína — anteriormente, as contas recuperadas continuavam aparecendo como falhadas -**fix(startup) #369**: Unifique o carregamento do ambiente em `npm run start`, `run-standalone.mjs` e Electron para respeitar a prioridade `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — evita a geração de um novo `STORAGE_ENCRYPTION_KEY` em um banco de dados criptografado existente### 🔧 Code Quality

- Padrões `result.success` vs `response?.ok` documentados em `auth.ts` (ambos intencionais, agora explicados)
- `overridePath?.trim()` normalizado em `electron/main.js` para corresponder a `bootstrap-env.mjs`
- Adicionado comentário de pedido de mesclagem `preferredEnv` na inicialização do Electron

> Política de cota de conta Codex com rotação automática, alternância de nível rápido, modelo gpt-5.4 e correção de rótulo analítico.### ✨ New Features (PRs #366, #367, #368)

-**Política de cota do Codex (PR #366)**: A janela de cota de 5h/semanal por conta alterna no painel do provedor. As contas são ignoradas automaticamente quando as janelas habilitadas atingem o limite de 90% e são readmitidas após `resetAt`. Inclui `quotaCache.ts` com getter de status sem efeitos colaterais. -**Codex Fast Tier Alternar (PR #367)**: Painel → Configurações → Codex Service Tier. A alternância padrão injeta `service_tier: "flex"` apenas para solicitações Codex, reduzindo o custo em aproximadamente 80%. Pilha completa: guia UI + endpoint API + executor + tradutor + restauração de inicialização. -**Modelo gpt-5.4 (PR #368)**: Adiciona `cx/gpt-5.4` e `codex/gpt-5.4` ao registro do modelo Codex. Teste de regressão incluído.### 🐛 Bug Fixes

-**correção 356**: os gráficos de análise (provedor principal, por conta, detalhamento do provedor) agora exibem nomes/rótulos de provedores legíveis por humanos em vez de IDs internos brutos para provedores compatíveis com OpenAI.

> Lançamento principal: estratégia de roteamento estritamente aleatório, controles de acesso de chave de API, grupos de conexão, sincronização de preços externos e correções de bugs críticos para modelos de pensamento, testes combinados e validação de nome de ferramenta.### ✨ New Features (PRs #363 & #365)

-**Estratégia de roteamento estritamente aleatório**: Baralho embaralhado de Fisher-Yates com garantia anti-repetição e serialização mutex para solicitações simultâneas. Decks independentes por combo e por provedor. -**Controles de acesso à chave de API**: `allowedConnections` (restringe quais conexões uma chave pode usar), `is_active` (habilitar/desabilitar chave com 403), `accessSchedule` (controle de acesso baseado em tempo), alternância `autoResolve`, renomear chaves via PATCH. -**Grupos de conexão**: agrupar conexões de provedores por ambiente. Visualização sanfonada na página Limites com persistência localStorage e troca automática inteligente. -**Sincronização de preços externa (LiteLLM)**: resolução de preços em 3 níveis (substituições do usuário → sincronizadas → padrões). Ative por meio de `PRICING_SYNC_ENABLED=true`. Ferramenta MCP `omniroute_sync_pricing`. 23 novos testes. -**i18n**: 30 idiomas atualizados com estratégia estritamente aleatória, strings de gerenciamento de chaves de API. pt-BR totalmente traduzido.### 🐛 Bug Fixes

-**correção #355**: O tempo limite de inatividade do stream aumentou de 60 para 300 segundos — evita abortar modelos de pensamento estendido (claude-opus-4-6, o3, etc.) durante longas fases de raciocínio. Configurável via `STREAM_IDLE_TIMEOUT_MS`. -**correção #350**: O teste combinado agora ignora `REQUIRE_API_KEY=true` usando cabeçalho interno e usa formato compatível com OpenAI universalmente. Timeout estendido de 15s para 20s. -**correção #346**: Ferramentas com `function.name` vazio (encaminhadas por Claude Code) agora são filtradas antes que os provedores upstream as recebam, evitando erros de "Entrada inválida[N].nome: string vazia".### 🗑️ Closed Issues

-**#341**: Seção de depuração removida — a substituição é `/dashboard/logs` e `/dashboard/health`.

> Suporte Round-Robin de chave de API para configurações de provedores de múltiplas chaves e confirmação de roteamento curinga e janela de cota já em vigor.### ✨ New Features

-**Robin da chave de API (T07)**: as conexões do provedor agora podem conter várias chaves de API (Editar conexão → Chaves de API extras). As solicitações alternam entre chaves primárias e extras por meio de `providerSpecificData.extraApiKeys[]`. As chaves são mantidas na memória indexadas por conexão – não são necessárias alterações no esquema do banco de dados.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` com correspondência de curinga estilo glob (`gpt*`, `claude-?-sonnet`, etc.) já está integrado em `model.ts` com classificação de especificidade. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` já avança automaticamente a janela — se `Date.now() > entry.until`, o bloqueio é excluído imediatamente (sem bloqueio obsoleto).

> Aprimoramento da interface do usuário, adições de estratégia de roteamento e tratamento elegante de erros para limites de uso.### ✨ New Features

-**Estratégias de roteamento Fill-First e P2C**: Adicionado `fill-first` (cota de drenagem antes de prosseguir) e `p2c` (seleção de baixa latência Power-of-Two-Choices) ao seletor de estratégia combinada, com painéis de orientação completos e emblemas codificados por cores. -**Modelos predefinidos de Free Stack**: Criar um combo com o modelo Free Stack agora preenche automaticamente os 7 melhores modelos de provedores gratuitos da categoria (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Os usuários apenas ativam os provedores e recebem um combo de US$ 0/mês pronto para uso. -**Wider Combo Modal**: O modal de criação/edição de combo agora usa `max-w-4xl` para edição confortável de combos grandes.### 🐛 Bug Fixes

-**Página de limites HTTP 500 para Codex e GitHub**: `getCodexUsage()` e `getGitHubUsage()` agora retornam uma mensagem amigável quando o provedor retorna 401/403 (token expirado), em vez de lançar e causar um erro 500 na página Limites. -**MaintenanceBanner falso-positivo**: o banner não mostra mais "Servidor inacessível" falsamente no carregamento da página. Corrigido chamando `checkHealth()` imediatamente na montagem e removendo o fechamento obsoleto do estado `show`. -**Dicas de ferramentas de ícones do provedor**: os botões de edição (lápis) e exclusão de ícones na linha de conexão do provedor agora têm dicas de ferramentas HTML nativas — todos os 6 ícones de ação agora são autodocumentados.

> Várias melhorias na análise de problemas da comunidade, suporte a novos provedores, correções de bugs para rastreamento de tokens, roteamento de modelo e confiabilidade de streaming.### ✨ New Features

-**Roteamento inteligente com reconhecimento de tarefas (T05)**: seleção automática de modelo com base no tipo de conteúdo da solicitação — codificação → deepseek-chat, análise → gemini-2.5-pro, visão → gpt-4o, resumo → gemini-2.5-flash. Configurável através de Configurações. Nova API `GET/PUT/POST /api/settings/task-routing`. -**Provedor HuggingFace**: Adicionado roteador HuggingFace como um provedor compatível com OpenAI com Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Provedor Vertex AI**: provedor Vertex AI (Google Cloud) adicionado com Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Uploads de arquivos do Playground**: upload de áudio para transcrição, upload de imagens para modelos de visão (detecção automática por nome de modelo), renderização de imagem inline para resultados de geração de imagens. -**Feedback visual de seleção de modelo**: modelos já adicionados no seletor de combinação agora mostram ✓ emblema verde — evita confusão duplicada. -**Compatibilidade Qwen (PR #352)**: Configurações atualizadas de User-Agent e impressão digital CLI para compatibilidade do provedor Qwen. -**Gerenciamento de estado Round-Robin (PR #349)**: Lógica round-robin aprimorada para lidar com contas excluídas e manter o estado de rotação corretamente. -**Clipboard UX (PR #360)**: Operações reforçadas da área de transferência com fallback para contextos não seguros; Melhorias na normalização da ferramenta Claude.### 🐛 Bug Fixes

-**Correção #302 — OpenAI SDK stream=False descarta tool_calls**: T01 Aceitar negociação de cabeçalho não força mais o streaming quando `body.stream` é explicitamente `false`. Estava fazendo com que tool_calls fossem descartados silenciosamente ao usar o OpenAI Python SDK no modo sem streaming. -**Correção #73 — Claude Haiku roteado para OpenAI sem prefixo de provedor**: modelos `claude-*` enviados sem um prefixo de provedor agora são roteados corretamente para o provedor `antigravidade` (Antrópico). Adicionada a heurística `gemini-*`/`gemma-*` → `gemini` também. -**Correção # 74 — A contagem de tokens sempre é 0 para streaming de Antigravity/Claude**: O evento SSE `message_start` que carrega `input_tokens` não estava sendo analisado por `extractUsage()`, fazendo com que todas as contagens de tokens de entrada caíssem. O rastreamento de token de entrada/saída agora funciona corretamente para respostas de streaming. -**Correção #180 — Importação de modelos duplicados sem feedback**: `ModelSelectModal` agora mostra ✓ destaque verde para modelos já no combo, tornando óbvio que eles já foram adicionados. -**Erros de geração de página de mídia**: os resultados da imagem agora são renderizados como tags `<img>` em vez de JSON bruto. Resultados da transcrição mostrados como texto legível. Os erros de credenciais mostram um banner âmbar em vez de uma falha silenciosa. -**Botão de atualização de token na página do provedor**: UI de atualização manual de token adicionada para provedores OAuth.### 🔧 Improvements

-**Registro de Provedores**: HuggingFace e Vertex AI adicionados a `providerRegistry.ts` e `providers.ts` (frontend). -**Cache de leitura**: Novo `src/lib/db/readCache.ts` para cache de leitura de banco de dados eficiente. -**Cache de cota**: Cache de cota aprimorado com remoção baseada em TTL.### 📦 Dependencies

- `dompurificar` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Arquivo                                       | Finalidade                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Lógica de roteamento com reconhecimento de tarefas (7 tipos de tarefas) |
| `src/app/api/settings/task-routing/route.ts`  | API de configuração de roteamento de tarefas                            |
| `src/app/api/providers/[id]/refresh/route.ts` | Atualização manual do token OAuth                                       |
| `src/lib/db/readCache.ts`                     | Cache de leitura de banco de dados eficiente                            |
| `src/shared/utils/clipboard.ts`               | Área de transferência reforçada com fallback                            | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modal Combos: Pilha Livre visível e proeminente**— O modelo Pilha Livre estava oculto (4º na grade de 3 colunas). Corrigido: movido para a posição 1, alterado para grade 2x2 para que todos os 4 modelos fiquem visíveis, borda verde + destaque de emblema GRATUITO.## [2.4.0] - 2026-03-13

> **Lançamento principal**— Ecossistema Free Stack, revisão do playground de transcrição, mais de 44 provedores, documentação abrangente de nível gratuito e melhorias de interface do usuário em todos os aspectos.### Funcionalidades

-**Combos: modelo Free Stack**— Novo 4º modelo "Free Stack ($0)" usando round-robin em Kiro + Qoder + Qwen + Gemini CLI. Sugere o combo pré-construído de custo zero no primeiro uso.
-**Mídia/Transcrição: Deepgram como padrão**— Deepgram (Nova 3, US$ 200 grátis) agora é o provedor de transcrição padrão. AssemblyAI (US$ 50 grátis) e Groq Whisper (grátis para sempre) exibidos com crachás de crédito gratuitos. -**README: seção "Start Free"**— Nova tabela inicial de 5 etapas do README mostrando como configurar IA de custo zero em minutos. -**README: Free Transcription Combo**— Nova seção com sugestão de combo Deepgram/AssemblyAI/Groq e detalhes de crédito gratuito por provedor. -**providers.ts: sinalizador hasFree**— NVIDIA NIM, Cerebras e Groq marcados com emblema hasFree e freeNote para a IU dos provedores. -**i18n: chaves templateFreeStack**— Modelo de combinação Free Stack traduzido e sincronizado para todos os 30 idiomas.## [2.3.16] - 2026-03-13

### Documentação

-**README: 44+ Providers**— Atualizadas todas as 3 ocorrências de "36+ provedores" para "44+" refletindo a contagem real da base de código (44 provedores em provedores.ts) -**README: Nova seção "🆓 Modelos gratuitos - O que você realmente obtém"**- Adicionada tabela de 7 provedores com limites de taxa por modelo para: Kiro (Claude ilimitado via AWS Builder ID), Qoder (5 modelos ilimitados), Qwen (4 modelos ilimitados), Gemini CLI (180K/mês), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/dia / 60K TPM), Groq (30 RPM/14,4KRPD). Inclui a recomendação do combo \/usr/bin/bash Ultimate Free Stack. -**README: Tabela de preços atualizada**— Adicionado Cerebras ao nível API KEY, corrigiu NVIDIA de "1000 créditos" para "dev-forever free", contagens e nomes de modelos Qoder/Qwen atualizados -**README: modelos Qoder 8→5**(nomeados: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**LEIA-ME: modelos Qwen 3→4**(nomeado: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funcionalidades

-**Painel de Auto-Combo (Tier Priority)**: Adicionado `🏷️ Tier` como o rótulo do 7º fator de pontuação na exibição de detalhamento de fator `/dashboard/auto-combo` — todos os 7 fatores de pontuação de Auto-Combo agora estão visíveis. -**i18n — seção autoCombo**: Adicionadas 20 novas chaves de tradução para o painel Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) para todos os 30 arquivos de idiomas.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Restaurou o padrão válido `clientSecret` — anteriormente era uma string vazia, causando "Credenciais de cliente incorretas" em cada tentativa de conexão. A credencial pública agora é o substituto padrão (substituível por meio de `QODER_OAUTH_CLIENT_SECRET` env var). -**Servidor MITM não encontrado (#335)**: `prepublish.mjs` agora compila `src/mitm/*.ts` para JavaScript usando `tsc` antes de copiar para o pacote npm. Anteriormente, apenas arquivos `.ts` brutos eram copiados - o que significa que `server.js` nunca existiu em instalações globais npm/Volta. -**GeminiCLI faltando projectId (#338)**: Em vez de lançar um erro 500 quando `projectId` está faltando nas credenciais armazenadas (por exemplo, após a reinicialização do Docker), o OmniRoute agora registra um aviso e tenta a solicitação - retornando um erro significativo do lado do provedor em vez de uma falha do OmniRoute. -**Incompatibilidade de versão do Electron (#323)**: Versão `electron/package.json` sincronizada com `2.3.13` (era `2.0.13`) para que a versão binária do desktop corresponda ao pacote npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Códice**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validação)**: Adicionado `tierPriority` (peso `0,05`) ao esquema Zod `ScoringWeights` e à rota da API `combos/auto` — o 7º fator de pontuação agora é totalmente aceito pela API REST e validado na entrada. Peso de `estabilidade` ajustado de `0,10` para `0,05` para manter a soma total = `1,0`.### ✨ New Features

-**Pontuação de cota em níveis (combinação automática)**: Adicionado `tierPriority` como o sétimo fator de pontuação — contas com níveis Ultra/Pro agora têm preferência em relação aos níveis Gratuitos quando outros fatores são iguais. Novos campos opcionais `accountTier` e `quotaResetIntervalSecs` em `ProviderCandidate`. Todos os 4 pacotes de modo atualizados (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`). -**Fallback de modelo intrafamiliar (T5)**: quando um modelo não está disponível (404/400/403), o OmniRoute agora recorre automaticamente a modelos irmãos da mesma família antes de retornar um erro (`modelFamilyFallback.ts`). -**Tempo limite da API Bridge configurável**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var permite que os operadores ajustem o tempo limite do proxy (padrão 30s). Corrige erros 504 em respostas upstream lentas. (#332) -**Star History**: widget star-history.com substituído por starart.cc (`?variant=adaptive`) em todos os 30 READMEs — adapta-se ao tema claro/escuro, atualizações em tempo real.### 🐛 Bug Fixes

-**Auth — Senha inicial**: `INITIAL_PASSWORD` env var agora é aceito ao definir a primeira senha do painel. Usa `timingSafeEqual` para comparação em tempo constante, evitando ataques de temporização. (#333) -**Truncamento README**: corrigida uma tag de fechamento `</details>` ausente na seção Solução de problemas que fazia com que o GitHub parasse de renderizar tudo abaixo dele (Tech Stack, Docs, Roadmap, Contributors). -**instalação pnpm**: remoção da substituição redundante `@swc/helpers` de `package.json` que entrava em conflito com a dependência direta, causando erros `EOVERRIDE` no pnpm. Adicionada configuração `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: Adicionado o validador `isSafePath()` em `cliRuntime.ts` para bloquear a passagem de caminho e metacaracteres de shell em `CLI_*_BIN` env vars. -**CI**: `package-lock.json` regenerado após a remoção da substituição para corrigir falhas de `npm ci` nas ações do GitHub.### 🔧 Improvements

-**Formato de resposta (T1)**: `response_format` (json_schema/json_object) agora injetado como um prompt do sistema para Claude, permitindo compatibilidade de saída estruturada. -**429 Nova tentativa (T2)**: Nova tentativa intra-URL para 429 respostas (2× tentativas com atraso de 2s) antes de voltar para o próximo URL. -**Cabeçalhos Gemini CLI (T3)**: Adicionados cabeçalhos de impressão digital `User-Agent` e `X-Goog-Api-Client` para compatibilidade com Gemini CLI. -**Catálogo de preços (T9)**: Adicionadas entradas de preços `deepseek-3.1`, `deepseek-3.2` e `qwen3-coder-next`.### 📁 New Files

| Arquivo                                    | Finalidade                                                     |
| ------------------------------------------ | -------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definições de família modelo e lógica de reserva intrafamiliar | ### Fixed |

-**KiloCode**: tempo limite de verificação de integridade do quilocódigo já corrigido na v2.3.11 -**OpenCode**: Adicione opencode ao registro cliRuntime com tempo limite de verificação de integridade de 15s -**OpenClaw / Cursor**: Aumente o tempo limite da verificação de integridade para 15s para variantes de início lento -**VPS**: Instale pacotes npm droid e openclaw; ativar CLI_EXTRA_PATHS para kiro-cli -**cliRuntime**: Adicione o registro da ferramenta opencode e aumente o tempo limite para continuar## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Aumenta `healthcheckTimeoutMs` de 4.000 ms para 15.000 ms — o kilocode renderiza um banner de logotipo ASCII na inicialização, causando falso `healthcheck_failed` em ambientes de inicialização lenta/a frio## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: correção da falha `check:any-budget:t11` — substitua `as any` por `as Record<string, desconhecido>` em OAuthModal.tsx (3 ocorrências)### Docs

-**CLI-TOOLS.md**: guia completo para todas as 11 ferramentas CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md sincronizado com 30 idiomas com título traduzido + introdução## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Novo endpoint legado de conclusões OpenAI — aceita string `prompt` e array `messages`, normaliza para o formato de bate-papo automaticamente -**EndpointPage**: agora mostra todos os três tipos de endpoint compatíveis com OpenAI: conclusões de bate-papo, API de respostas e conclusões legadas -**i18n**: Adicionado `completionsLegacy/completionsLegacyDesc` a arquivos de 30 idiomas### Fixed

-**OAuthModal**: Corrige `[objeto Objeto]` exibido em todos os erros de conexão OAuth — extraia corretamente `.message` de objetos de resposta de erro em todas as 3 chamadas `throw new Error(data.error)` (exchange, código de dispositivo, autorização)

- Afeta Cline, Codex, GitHub, Qwen, Kiro e todos os outros provedores OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Adicione `decodeURIComponent` antes da decodificação base64 para que os códigos de autenticação codificados em URL do URL de retorno de chamada sejam analisados corretamente, corrigindo erros de "código de autorização inválido ou expirado" em configurações remotas (LAN IP). -**Cline OAuth**: `mapTokens` agora preenche `name = firstName + lastName || email` para que as contas Cline mostrem nomes de usuários reais em vez de "Account #ID" -**Nomes de contas OAuth**: todos os fluxos de troca OAuth (exchange, poll, poll-callback) agora normalizam `name = email` quando o nome está faltando, para que cada conta OAuth mostre seu email como o rótulo de exibição no painel de provedores -**Nomes de contas OAuth**: Remoção do substituto sequencial "Conta N" em `db/providers.ts` — contas sem e-mail/nome agora usam um rótulo baseado em ID estável via `getAccountDisplayName()` em vez de um número sequencial que muda quando as contas são excluídas## [2.3.6] - 2026-03-12

### Fixed

-**Lote de teste do provedor**: Corrigido o esquema Zod para aceitar `providerId: null` (o frontend envia nulo para modos não-provedores); estava retornando incorretamente "Solicitação inválida" para todos os testes em lote -**Modal de teste de provedor**: Corrigida a exibição de `[objeto Objeto]` normalizando objetos de erro de API para strings antes de renderizar em `setTestResults` e `ProviderTestResultsView` -**i18n**: Adicionadas chaves ausentes `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` para `en.json` -**i18n**: 1111 chaves ausentes sincronizadas em todos os 29 arquivos de idiomas diferentes do inglês usando valores em inglês como substitutos## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Adicionada correção `postinstall` permanente para copiar `@swc/helpers` no `node_modules` do aplicativo independente — evita travamento do MODULE_NOT_FOUND em instalações npm globais## [2.3.4] - 2026-03-10

### Added

- Integrações de vários provedores e melhorias no painel
