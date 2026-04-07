# OmniRoute Auto-Combo Engine (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Chaînes de modèles autogérées avec notation adaptative## How It Works

Le moteur Auto-Combo sélectionne dynamiquement le meilleur fournisseur/modèle pour chaque demande à l'aide d'une**fonction de notation à 6 facteurs** :

| Facteur    | Poids | Descriptif                                            |
| :--------- | :---- | :---------------------------------------------------- | ------------- |
| Quotas     | 0,20  | Capacité restante [0..1]                              |
| Santé      | 0,25  | Disjoncteur : FERMÉ=1,0, DEMI=0,5, OUVERT=0,0         |
| CoûtInv    | 0,20  | Coût inverse (moins cher = score plus élevé)          |
| LatenceInv | 0,15  | Latence p95 inverse (plus rapide = plus élevée)       |
| TâcheFit   | 0,10  | Modèle × score de condition physique du type de tâche |
| Stabilité  | 0,10  | Faible variance de latence/erreurs                    | ## Mode Packs |

| Pack                       | Mise au point   | Poids clé         |
| :------------------------- | :-------------- | :---------------- | --------------- |
| 🚀**Expédier rapidement**  | Vitesse         | latenceInv : 0,35 |
| 💰**Économiseur de coûts** | Économie        | coûtInv : 0,40    |
| 🎯**La qualité d'abord**   | Meilleur modèle | taskFit: 0.40     |
| 📡**Convivial hors ligne** | Disponibilité   | quota : 0,40      | ## Self-Healing |

-**Exclusion temporaire** : Score < 0,2 → exclu pendant 5 min (backoff progressif, max 30 min) -**Conscience du disjoncteur** : OUVERT → auto-exclu ; HALF_OPEN → requêtes de sonde -**Mode incident** : >50 % OUVERT → désactiver l'exploration, maximiser la stabilité -**Cooldown recovery** : Après exclusion, la première demande est une "sonde" avec un délai d'attente réduit## Bandit Exploration

5 % des requêtes (configurables) sont acheminées vers des fournisseurs aléatoires pour exploration. Désactivé en mode incident.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Plus de 30 modèles notés sur 6 types de tâches (« codage », « révision », « planification », « analyse », « débogage », « documentation »). Prend en charge les modèles génériques (par exemple, `*-coder` → score de codage élevé).## Files

| Fichier                                      | Objectif                                          |
| :------------------------------------------- | :------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Fonction de notation et normalisation du pool     |
| `open-sse/services/autoCombo/taskFitness.ts` | Recherche de condition physique de modèle × tâche |
| `open-sse/services/autoCombo/engine.ts`      | Logique de sélection, bandit, plafond budgétaire  |
| `open-sse/services/autoCombo/selfHealing.ts` | Exclusion, sondes, mode incident                  |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profils de poids                                |
| `src/app/api/combos/auto/route.ts`           | API REST                                          |
