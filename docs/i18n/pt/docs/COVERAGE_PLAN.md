# Test Coverage Plan (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Última atualização: 28/03/2026## Baseline

Existem vários números de cobertura dependendo de como o relatório é calculado. Para o planejamento, apenas um deles é útil.

| Métrica                   | Escopo                                                 | Declarações/Linhas | Filiais | Funções | Notas                                                  |
| ------------------------- | ------------------------------------------------------ | -----------------: | ------: | ------: | ------------------------------------------------------ |
| Legado                    | Antigo `npm run test:coverage`                         |             79,42% |  75,15% |  67,94% | Inflado: conta arquivos de teste e exclui `open-sse`   |
| Diagnóstico               | Somente fonte, excluindo testes e excluindo `open-sse` |             68,16% |  63,55% |  64,06% | Útil apenas para isolar `src/**`                       |
| Linha de base recomendada | Somente fonte, excluindo testes e incluindo `open-sse` |             56,95% |  66,05% |  57,80% | Esta é a linha de base de todo o projeto para melhorar |

A linha de base recomendada é o número a ser otimizado.## Rules

- As metas de cobertura se aplicam a arquivos de origem, não a `tests/**`.
- `open-sse/**` faz parte do produto e deve permanecer no escopo.
- O novo código não deverá reduzir a cobertura nas áreas tocadas.
- Prefira comportamento de teste e resultados de ramificação em vez de detalhes de implementação.
- Prefira bancos de dados SQLite temporários e pequenos equipamentos em vez de simulações amplas para `src/lib/db/**`.## Current command set

- `teste de execução npm: cobertura`
  - Porta de cobertura da fonte principal para o conjunto de testes unitários
  - Gera `text-summary`, `html`, `json-summary` e `lcov`
- `cobertura de execução npm: relatório`
  - Relatório detalhado arquivo por arquivo da última execução
- `teste de execução npm: cobertura: legado`
  - Apenas comparação histórica## Milestones

| Fase   |                   Alvo | Foco                                                                   |
| ------ | ---------------------: | ---------------------------------------------------------------------- |
| Fase 1 | 60% declarações/linhas | Ganhos rápidos e cobertura de serviços públicos de baixo risco         |
| Fase 2 | 65% declarações/linhas | Fundações de BD e rotas                                                |
| Fase 3 | 70% declarações/linhas | Validação de provedor e análise de uso                                 |
| Fase 4 | 75% declarações/linhas | tradutores e ajudantes `open-sse`                                      |
| Fase 5 | 80% declarações/linhas | manipuladores e ramificações executoras `open-sse`                     |
| Fase 6 | 85% declarações/linhas | Casos extremos mais difíceis, dívidas de agências, suítes de regressão |
| Fase 7 | 90% declarações/linhas | Varredura final, fechamento de lacuna, catraca estrita                 |

Ramos e funções devem aumentar a cada fase, mas o principal alvo difícil são as declarações/linhas.## Priority hotspots

Esses arquivos ou áreas oferecem o melhor retorno para as próximas fases:

1. `open-sse/manipuladores`
   - `chatCore.ts` em 7,57%
   - Diretório geral em 29,07%
2. `open-sse/translator/request`
   - Diretório geral em 36,39%
   - Muitos tradutores ainda estão perto da cobertura de um dígito
3. `open-sse/tradutor/resposta`
   - Diretório geral em 8,07%
4. `open-sse/executores`
   - Diretório geral em 36,62%
5. `src/lib/db`
   - `models.ts` em 20,66%
   - `registeredKeys.ts` em 34,46%
   - `modelComboMappings.ts` em 36,25%
   - `settings.ts` em 46,40%
   - `webhooks.ts` em 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` em 21,12%
   - `usageStats.ts` em 9,56%
   - `costCalculator.ts` em 30,00%
7. `src/lib/provedores`
   - `validation.ts` em 41,16%
8. Utilitários e arquivos API de baixo risco para ganhos iniciais
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Corrija a métrica de cobertura para que reflita o código-fonte em vez dos arquivos de teste
- [x] Mantenha um script de cobertura legado para comparação
- [x] Registre a linha de base e os pontos de acesso no repositório
- [] Adicionar testes focados para utilitários de baixo risco:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [] Adicionar testes de rota para:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [] Adicionar testes apoiados por banco de dados para:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [] Cubra o comportamento do branch em:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [] Adicionar testes de análise de uso para:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [] Expandir a cobertura de rotas para gerenciamento de proxy e ramificações de configurações### Phase 4: 70% -> 75%

- [] Cubra os auxiliares do tradutor e os caminhos centrais de tradução:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [] Adicionar testes em nível de manipulador para:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [] Adicionar cobertura de ramificação do executor para autenticação, novas tentativas e substituições de endpoint específicas do provedor### Phase 6: 80% -> 85%

- [] Mesclar mais suítes de casos extremos no caminho de cobertura principal
- [] Aumentar a cobertura de funções para módulos de banco de dados com fraca cobertura de construtor/auxiliar
- [] Fechar lacunas de ramificação em `settings.ts`, `registeredKeys.ts`, `validation.ts` e auxiliares de tradutor### Phase 7: 85% -> 90%

- [] Trate os arquivos restantes de baixa cobertura como bloqueadores
- [] Adicionar testes de regressão para cada bug de produção descoberto corrigido durante o aumento para 90%
- [] Aumente a porta de cobertura no CI somente depois que a linha de base local estiver estável por pelo menos duas execuções consecutivas## Ratchet policy

Atualize os limites `npm run test:coverage` somente depois que o projeto realmente exceder o próximo marco com um buffer confortável.

Sequência de catraca recomendada:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

A ordem é `linhas de instruções/ramos/funções`.## Known gap

O comando de cobertura atual mede o conjunto de unidades do Node principal e inclui a fonte alcançada a partir dele, incluindo `open-sse`. Ainda não mescla a cobertura do Vitest em um único relatório unificado. Vale a pena fazer essa fusão mais tarde, mas não é um obstáculo para iniciar a subida de 60% -> 80%.
