# OmniRoute Auto-Combo Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Cadeias de modelos autogerenciadas com pontuação adaptativa## How It Works

O Auto-Combo Engine seleciona dinamicamente o melhor provedor/modelo para cada solicitação usando uma**função de pontuação de 6 fatores**:

| Fator        | Peso | Descrição                                         |
| :----------- | :--- | :------------------------------------------------ | ------------- |
| Cota         | 0,20 | Capacidade restante [0..1]                        |
| Saúde        | 0,25 | Disjuntor: FECHADO=1,0, MEIO=0,5, ABERTO=0,0      |
| CustoInv     | 0,20 | Custo inverso (mais barato = pontuação mais alta) |
| LatênciaInv  | 0,15 | Latência inversa do p95 (mais rápida = maior)     |
| TaskFit      | 0,10 | Modelo × pontuação de aptidão do tipo de tarefa   |
| Estabilidade | 0,10 | Baixa variação em latência/erros                  | ## Mode Packs |

| Pacote                            | Foco            | Peso chave             |
| :-------------------------------- | :-------------- | :--------------------- | --------------- |
| 🚀**Envio rápido**                | Velocidade      | latênciaInv: 0,35      |
| 💰**Economia de custos**          | Economia        | custoInv: 0,40         |
| 🎯**Qualidade em primeiro lugar** | Melhor modelo   | ajuste da tarefa: 0,40 |
| 📡**Amigável off-line**           | Disponibilidade | cota: 0,40             | ## Self-Healing |

-**Exclusão temporária**: Pontuação < 0,2 → excluída por 5 min (retirada progressiva, máximo de 30 min) -**Consciência do disjuntor**: ABERTO → autoexcluído; HALF_OPEN → solicitações de investigação -**Modo Incidente**: >50% ABERTO → desativar a exploração, maximizar a estabilidade -**Recuperação de resfriamento**: Após a exclusão, a primeira solicitação é uma "sonda" com tempo limite reduzido## Bandit Exploration

5% das solicitações (configuráveis) são roteadas para provedores aleatórios para exploração. Desativado no modo incidente.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Mais de 30 modelos pontuados em 6 tipos de tarefas (`codificação`, `revisão`, `planejamento`, `análise`, `depuração`, `documentação`). Suporta padrões curinga (por exemplo, `*-coder` → alta pontuação de codificação).## Files

| Arquivo                                      | Finalidade                                      |
| :------------------------------------------- | :---------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Função de pontuação e normalização do pool      |
| `open-sse/services/autoCombo/taskFitness.ts` | Modelo × pesquisa de aptidão de tarefa          |
| `open-sse/services/autoCombo/engine.ts`      | Lógica de seleção, bandido, limite orçamentário |
| `open-sse/services/autoCombo/selfHealing.ts` | Exclusão, sondagens, modo incidente             |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 perfis de peso                                |
| `src/app/api/combos/auto/route.ts`           | API REST                                        |
