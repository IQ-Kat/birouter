# OmniRoute — Dashboard Features Gallery (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Guia visual para cada seção do painel do OmniRoute.---

## 🔌 Providers

Gerencie conexões de provedores de IA: provedores OAuth (Claude Code, Codex, Gemini CLI), provedores de chaves de API (Groq, DeepSeek, OpenRouter) e provedores gratuitos (Qoder, Qwen, Kiro). As contas Kiro incluem rastreamento de saldo de crédito – créditos restantes, subsídio total e data de renovação visíveis em Painel → Uso.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Crie combinações de modelos de roteamento com 6 estratégias: prioridade, ponderada, round-robin, aleatória, menos usada e com custo otimizado. Cada combinação encadeia vários modelos com fallback automático e inclui modelos rápidos e verificações de prontidão.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Análise de uso abrangente com consumo de tokens, estimativas de custos, mapas de calor de atividades, gráficos de distribuição semanais e detalhamentos por provedor.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitoramento em tempo real: tempo de atividade, memória, versão, percentis de latência (p50/p95/p99), estatísticas de cache e estados de disjuntores do provedor.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Quatro modos para depurar traduções de API:**Playground**(conversor de formato),**Chat Tester**(solicitações ao vivo),**Test Bench**(testes em lote) e**Live Monitor**(transmissão em tempo real).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Teste qualquer modelo diretamente do painel. Selecione provedor, modelo e endpoint, escreva prompts com o Monaco Editor, transmita respostas em tempo real, aborte o mid-stream e visualize métricas de tempo.---

## 🎨 Themes _(v2.0.5+)_

Temas de cores personalizáveis ​​para todo o painel. Escolha entre 7 cores predefinidas (Coral, Azul, Vermelho, Verde, Violeta, Laranja, Ciano) ou crie um tema personalizado escolhendo qualquer cor hexadecimal. Suporta modo claro, escuro e sistema.---

## ⚙️ Settings

Painel de configurações abrangente com guias:

-**Geral**— Armazenamento do sistema, gerenciamento de backup (exportar/importar banco de dados) -**Aparência**— Seletor de tema (escuro/claro/sistema), predefinições de tema de cores e cores personalizadas, visibilidade do registro de saúde, controles de visibilidade de itens da barra lateral -**Segurança**— Proteção de endpoint de API, bloqueio de provedor personalizado, filtragem de IP, informações de sessão -**Roteamento**— Aliases de modelo, degradação de tarefas em segundo plano -**Resiliência**— Persistência de limite de taxa, ajuste de disjuntor, desativação automática de contas banidas, monitoramento de expiração de provedor -**Avançado**— Substituições de configuração, trilha de auditoria de configuração, modo de degradação de fallback![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configuração com um clique para ferramentas de codificação de IA: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor e Factory Droid. Apresenta aplicação/redefinição de configuração automatizada, perfis de conexão e mapeamento de modelo.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Painel para descobrir e gerenciar agentes CLI. Mostra uma grade de 14 agentes integrados (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) com:

-**Status da instalação**— Instalado/Não encontrado com detecção de versão -**Selos de protocolo**— stdio, HTTP, etc. -**Agentes personalizados**— Registre qualquer ferramenta CLI via formulário (nome, binário, comando de versão, spawn args) -**CLI Fingerprint Matching**— Alternância por provedor para corresponder às assinaturas de solicitação CLI nativas, reduzindo o risco de banimento e preservando o IP do proxy---

## 🖼️ Media _(v2.0.3+)_

Gere imagens, vídeos e músicas a partir do painel. Suporta OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open e MusicGen.---

## 📝 Request Logs

Registro de solicitações em tempo real com filtragem por provedor, modelo, conta e chave de API. Mostra códigos de status, uso de token, latência e detalhes de resposta.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Seu endpoint de API unificado com detalhamento de recursos: conclusões de bate-papo, API de respostas, incorporações, geração de imagens, reclassificação, transcrição de áudio, conversão de texto em fala, moderações e chaves de API registradas. Integração do Cloudflare Quick Tunnel e suporte de proxy em nuvem para acesso remoto.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Crie, escopo e revogue chaves de API. Cada chave pode ser restrita a modelos/provedores específicos com acesso total ou permissões somente leitura. Gerenciamento visual de chaves com rastreamento de uso.---

## 📋 Audit Log

Rastreamento de ações administrativas com filtragem por tipo de ação, ator, alvo, endereço IP e carimbo de data/hora. Histórico completo de eventos de segurança.---

## 🖥️ Desktop Application

Aplicativo de desktop Native Electron para Windows, macOS e Linux. Execute o OmniRoute como um aplicativo independente com integração à bandeja do sistema, suporte offline, atualização automática e instalação com um clique.

Principais recursos:

- Pesquisa de prontidão do servidor (sem tela em branco na inicialização a frio)
- Bandeja do sistema com gerenciamento de portas
- Política de Segurança de Conteúdo
- Bloqueio de instância única
- Atualização automática ao reiniciar
- UI condicional à plataforma (semáforos macOS, barra de título padrão do Windows/Linux)
- Pacote de compilação Hardened Electron — `node_modules` com link simbólico no pacote independente é detectado e rejeitado antes do empacotamento, evitando a dependência de tempo de execução na máquina de compilação (v2.5.5+)

📖 Consulte [`electron/README.md`](../electron/README.md) para documentação completa.
