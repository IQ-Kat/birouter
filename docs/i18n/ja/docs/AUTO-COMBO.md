# OmniRoute Auto-Combo Engine (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> 適応スコアリングを備えた自己管理モデルチェーン## How It Works

オートコンボ エンジンは、**6 要素スコアリング関数**を使用して、各リクエストに最適なプロバイダー/モデルを動的に選択します。

| Factor          | 重量 | 説明                                                 |
| :-------------- | :--- | :--------------------------------------------------- | ------------- |
| クォータ        | 0.20 | 残容量 [0..1]                                        |
| 健康            | 0.25 | サーキットブレーカー: CLOSED=1.0、HALF=0.5、OPEN=0.0 |
| コストインブ    | 0.20 | 逆コスト (安い = スコアが高い)                       |
| レイテンシーInv | 0.15 | 逆 p95 レイテンシー (速い = 高い)                    |
| タスクフィット  | 0.10 | モデル×タスクタイプの適応度スコア                    |
| 安定性          | 0.10 | レイテンシ/エラーのばらつきが小さい                  | ## Mode Packs |

| パック               | フォーカス   | キーの重み            |
| :------------------- | :----------- | :-------------------- | --------------- |
| 🚀**迅速に発送**     | スピード     | レイテンシーInv: 0.35 |
| 💰**コスト削減**     | 経済         | コストInv: 0.40       |
| 🎯**品質第一**       | ベストモデル | タスクフィット: 0.40  |
| 📡**オフライン対応** | 可用性       | 割り当て: 0.40        | ## Self-Healing |

-**一時的な除外**: スコア < 0.2 → 5 分間除外 (漸進的バックオフ、最大 30 分) -**サーキットブレーカーの認識**: OPEN → 自動除外。 HALF_OPEN → プローブリクエスト -**インシデントモード**: >50% OPEN → 探索を無効にし、安定性を最大化します -**クールダウン回復**: 除外後の最初のリクエストは、タイムアウトが短縮された「プローブ」になります。## Bandit Exploration

リクエスト (構成可能) の 5% は、探索のためにランダムなプロバイダーにルーティングされます。インシデントモードでは無効になります。## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

6 種類のタスク (「コーディング」、「レビュー」、「計画」、「分析」、「デバッグ」、「文書化」) にわたって 30 以上のモデルがスコア付けされています。ワイルドカード パターンをサポートします (例: `*-coder` → 高いコーディング スコア)。## Files

| ファイル                                     | 目的                                    |
| :------------------------------------------- | :-------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | スコアリング関数とプールの正規化        |
| `open-sse/services/autoCombo/taskFitness.ts` | モデル×タスクの適合性検索               |
| `open-sse/services/autoCombo/engine.ts`      | 選択ロジック、バンディット、予算上限 ​​ |
| `open-sse/services/autoCombo/selfHealing.ts` | 除外、プローブ、インシデントモード      |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 つの重量プロファイル                  |
| `src/app/api/combos/auto/route.ts`           | REST API                                |
