# Test Coverage Plan (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Dernière mise à jour : 2026-03-28## Baseline

Il existe plusieurs numéros de couverture selon la manière dont le rapport est calculé. Pour la planification, un seul d’entre eux est utile.

| Métrique                      | Portée                                                                    | Déclarations / Lignes | Succursales | Fonctions | Remarques                                                           |
| ----------------------------- | ------------------------------------------------------------------------- | --------------------: | ----------: | --------: | ------------------------------------------------------------------- |
| Héritage                      | Ancien `npm run test:coverage`                                            |                79,42% |      75,15% |    67,94% | Gonflé : compte les fichiers de test et exclut `open-sse`           |
| Diagnostique                  | Source uniquement, à l'exclusion des tests et à l'exclusion de `open-sse` |                68.16% |      63,55% |    64,06% | Utile uniquement pour isoler `src/**`                               |
| Base de référence recommandée | Source uniquement, excluant les tests et incluant `open-sse`              |                56,95% |      66,05% |    57,80% | Il s'agit de la base de référence à améliorer à l'échelle du projet |

La ligne de base recommandée est le nombre par rapport auquel optimiser.## Rules

- Les objectifs de couverture s'appliquent aux fichiers sources, pas aux `tests/**`.
- `open-sse/**` fait partie du produit et doit rester dans la portée.
- Le nouveau code ne doit pas réduire la couverture dans les zones touchées.
- Préférez le comportement des tests et les résultats des branches aux détails de mise en œuvre.
- Préférez les bases de données temporaires SQLite et les petits appareils aux larges simulations pour `src/lib/db/**`.## Current command set

- `npm run test:couverture`
  - Porte de couverture de la source principale pour la suite de tests unitaires
  - Génère `text-summary`, `html`, `json-summary` et `lcov`
- `couverture d'exécution npm : rapport`
  - Rapport détaillé fichier par fichier de la dernière exécution
- `npm run test:coverage:legacy`
  - Comparaison historique uniquement## Milestones

| Phases  |                       Cible | Mise au point                                                    |
| ------- | --------------------------: | ---------------------------------------------------------------- |
| Phase 1 |          60% relevés/lignes | Gains rapides et couverture des services publics à faible risque |
| Phase 2 |          65% relevés/lignes | Fondations de bases de données et de routes                      |
| Phase 3 |          70% relevés/lignes | Validation des fournisseurs et analyses d'utilisation            |
| Phase 4 |          75% relevés/lignes | traducteurs et assistants `open-sse`                             |
| Phase 5 |          80% relevés/lignes | Gestionnaires `open-sse` et branches d'exécuteur                 |
| Phase 6 |     85% déclarations/lignes | Cas extrêmes, dette des succursales, suites de régression        |
| Phase 7 | 90 % de déclarations/lignes | Balayage final, fermeture d'écart, cliquet strict                |

Les branches et les fonctions devraient augmenter à chaque phase, mais la cible principale est les instructions/lignes.## Priority hotspots

Ces fichiers ou zones offrent le meilleur rendement pour les phases suivantes :

1. `open-sse/handlers`
   - `chatCore.ts` à 7,57%
   - Répertoire global à 29,07%
2. `open-sse/traducteur/requête`
   - Répertoire global à 36,39%
   - De nombreux traducteurs sont encore proches d'une couverture à un chiffre
3. `open-sse/traducteur/réponse`
   - Annuaire global à 8,07%
4. `open-sse/exécuteurs`
   - Répertoire global à 36,62%
5. `src/lib/db`
   - `models.ts` à 20,66%
   - `registeredKeys.ts` à 34,46%
   - `modelComboMappings.ts` à 36,25%
   - `settings.ts` à 46,40%
   - `webhooks.ts` à 33,33%
6. `src/lib/usage`
   - `usageHistory.ts` à 21,12%
   - `usageStats.ts` à 9,56%
   - `costCalculator.ts` à 30,00%
7. `src/lib/providers`
   - `validation.ts` à 41,16%
8. Utilitaire à faible risque et fichiers API pour des gains précoces
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Correction de la métrique de couverture afin qu'elle reflète le code source au lieu des fichiers de test
- [x] Conserver un ancien script de couverture à des fins de comparaison
- [x] Enregistrez la ligne de base et les points chauds dans le dépôt
- [ ] Ajouter des tests ciblés pour les utilitaires à faible risque :
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Ajouter des tests d'itinéraire pour :
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Ajouter des tests basés sur la base de données pour :
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Couvrir le comportement des branches dans :
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Ajouter des tests d'analyse d'utilisation pour :
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Étendre la couverture des routes pour les branches de gestion et de paramètres des proxys### Phase 4: 70% -> 75%

- [ ] Couvrir les assistants de traduction et les chemins de traduction centraux :
  - `open-sse/translator/index.ts`
  - `open-sse/traducteur/helpers/*`
  - `open-sse/traducteur/request/*`
  - `open-sse/traducteur/response/*`### Phase 5: 75% -> 80%

- [ ] Ajouter des tests au niveau du gestionnaire pour :
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Ajouter une couverture de branche d'exécuteur pour l'authentification, les tentatives et les remplacements de points de terminaison spécifiques au fournisseur### Phase 6: 80% -> 85%

- [ ] Fusionner davantage de suites de cas extrêmes dans le chemin de couverture principal
- [ ] Augmenter la couverture des fonctions pour les modules DB avec une faible couverture constructeur/assistant
- [ ] Combler les lacunes des branches dans `settings.ts`, `registeredKeys.ts`, `validation.ts` et les assistants de traduction### Phase 7: 85% -> 90%

- [ ] Traitez les fichiers restants à faible couverture comme des bloqueurs
- [ ] Ajout de tests de régression pour chaque bug de production découvert corrigé lors du push à 90 % -[ ] Augmentez la porte de couverture dans CI uniquement une fois que la ligne de base locale est stable pendant au moins deux analyses consécutives## Ratchet policy

Mettez à jour les seuils `npm run test:coverage` uniquement après que le projet a réellement dépassé le jalon suivant avec un tampon confortable.

Séquence de cliquet recommandée :

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

L'ordre est "instructions-lignes/branches/fonctions".## Known gap

La commande de couverture actuelle mesure la suite d'unités Node principale et inclut la source obtenue à partir de celle-ci, y compris « open-sse ». Il ne fusionne pas encore la couverture Vitest en un seul rapport unifié. Cette fusion vaut la peine d’être effectuée plus tard, mais elle ne constitue pas un obstacle au démarrage de la montée de 60 % -> 80 %.
