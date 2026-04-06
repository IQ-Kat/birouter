# Troubleshooting (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Problèmes courants et solutions pour OmniRoute.---

## Quick Fixes

| Problème                                       | Solutions                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- | --- |
| La première connexion ne fonctionne pas        | Définissez `INITIAL_PASSWORD` dans `.env` (pas de valeur par défaut codée en dur)      |
| Le tableau de bord s'ouvre sur le mauvais port | Définissez `PORT=20128` et `NEXT_PUBLIC_BASE_URL=http://localhost:20128`               |
| Aucun journal de requête sous `logs/`          | Définir `ENABLE_REQUEST_LOGS=true`                                                     |
| EACCES : autorisation refusée                  | Définissez `DATA_DIR=/path/to/writable/dir` pour remplacer `~/.omniroute`              |
| La stratégie de routage ne sauvegarde pas      | Mise à jour vers v1.4.11+ (correctif du schéma Zod pour la persistance des paramètres) | --- |

## Provider Issues

### "Language model did not provide messages"

**Cause :**Quota de fournisseur épuisé.

**Correction :**

1. Vérifiez le suivi des quotas du tableau de bord
2. Utilisez un combo avec des niveaux de secours
3. Passez au niveau moins cher/gratuit### Rate Limiting

**Cause :**Quota d'abonnement épuisé.

**Correction :**

- Ajouter une solution de secours : `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilisez GLM/MiniMax comme sauvegarde bon marché### OAuth Token Expired

OmniRoute actualise automatiquement les jetons. Si les problèmes persistent :

1. Tableau de bord → Fournisseur → Reconnecter
2. Supprimez et rajoutez la connexion du fournisseur---

## Cloud Issues

### Cloud Sync Errors

1. Vérifiez que `BASE_URL` pointe vers votre instance en cours d'exécution (par exemple, `http://localhost:20128`)
2. Vérifiez que « CLOUD_URL » pointe vers votre point de terminaison cloud (par exemple, « https://omniroute.dev »)
3. Gardez les valeurs `NEXT_PUBLIC_*` alignées avec les valeurs côté serveur### Cloud `stream=false` Returns 500

**Symptôme :**`Jeton inattendu 'd'...` sur le point de terminaison cloud pour les appels sans streaming.

**Cause :**Upstream renvoie la charge utile SSE alors que le client attend du JSON.

**Solution de contournement :**Utilisez « stream=true » pour les appels directs vers le cloud. Le runtime local inclut le repli SSE → JSON.### Cloud Says Connected but "Invalid API key"

1. Créez une nouvelle clé à partir du tableau de bord local (`/api/keys`)
2. Exécutez la synchronisation cloud : Activer le cloud → Synchroniser maintenant
3. Les clés anciennes/non synchronisées peuvent toujours renvoyer « 401 » sur le cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Vérifiez les champs d'exécution : `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pour le mode portable : utilisez la cible d'image `runner-cli` (CLI fournies)
3. Pour le mode de montage de l'hôte : définissez `CLI_EXTRA_PATHS` et montez le répertoire bin de l'hôte en lecture seule
4. Si `installed=true` et `runnable=false` : le binaire a été trouvé mais le contrôle de santé a échoué### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Vérifiez les statistiques d'utilisation dans le tableau de bord → Utilisation
2. Basculez le modèle principal vers GLM/MiniMax
3. Utilisez l'offre gratuite (Gemini CLI, Qoder) pour les tâches non critiques
4. Définissez les budgets de coûts par clé API : Tableau de bord → Clés API → Budget---

## Debugging

### Enable Request Logs

Définissez `ENABLE_REQUEST_LOGS=true` dans votre fichier `.env`. Les journaux apparaissent dans le répertoire `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- État principal : `${DATA_DIR}/storage.sqlite` (fournisseurs, combos, alias, clés, paramètres)
- Utilisation : tables SQLite dans `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + facultatif `${DATA_DIR}/log.txt` et `${DATA_DIR}/call_logs/`
- Journaux de requête : `<repo>/logs/...` (quand `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Lorsque le disjoncteur d'un fournisseur est OUVERT, les demandes sont bloquées jusqu'à l'expiration du temps de recharge.

**Correction :**

1. Accédez à**Tableau de bord → Paramètres → Résilience**
2. Vérifiez la carte de disjoncteur du fournisseur concerné
3. Cliquez sur**Réinitialiser tout**pour effacer tous les disjoncteurs ou attendez l'expiration du temps de recharge.
4. Vérifiez que le fournisseur est réellement disponible avant de réinitialiser### Provider keeps tripping the circuit breaker

Si un fournisseur entre à plusieurs reprises dans l’état OPEN :

1. Vérifiez**Tableau de bord → Santé → Santé du fournisseur**pour connaître le modèle d'échec.
2. Accédez à**Paramètres → Résilience → Profils de fournisseur**et augmentez le seuil d'échec.
3. Vérifiez si le fournisseur a modifié les limites de l'API ou nécessite une ré-authentification
4. Examinez la télémétrie de latence : une latence élevée peut provoquer des échecs liés au délai d'attente.---

## Audio Transcription Issues

### "Unsupported model" error

- Assurez-vous d'utiliser le préfixe correct : `deepgram/nova-3` ou `assemblyai/best`
- Vérifiez que le fournisseur est connecté dans**Tableau de bord → Fournisseurs**### Transcription returns empty or fails

- Vérifiez les formats audio pris en charge : `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Vérifiez que la taille du fichier est dans les limites du fournisseur (généralement < 25 Mo)
- Vérifier la validité de la clé API du fournisseur dans la carte du fournisseur---

## Translator Debugging

Utilisez**Tableau de bord → Traducteur**pour déboguer les problèmes de traduction de format :

| Mode                   | Quand utiliser                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Aire de jeux**       | Comparez les formats d'entrée/sortie côte à côte : collez une requête qui a échoué pour voir comment elle se traduit |
| **Testeur de chat**    | Envoyez des messages en direct et inspectez la charge utile complète de la demande/réponse, y compris les en-têtes   |
| **Banc d'essai**       | Exécutez des tests par lots sur les combinaisons de formats pour identifier les traductions défectueuses             |
| **Moniteur en direct** | Observez le flux de requêtes en temps réel pour détecter les problèmes de traduction intermittents                   | ### Common format issues |

-**Les balises de réflexion n'apparaissent pas**— Vérifiez si le fournisseur cible prend en charge la réflexion et le paramètre de budget de réflexion -**Abandon des appels d'outils**— Certaines traductions de format peuvent supprimer des champs non pris en charge ; vérifier en mode Playground -**Invite système manquante**— Claude et Gemini gèrent les invites système différemment ; vérifier le résultat de la traduction -**Le SDK renvoie une chaîne brute au lieu d'un objet**— Corrigé dans la version 1.1.0 : le désinfectant de réponse supprime désormais les champs non standard (`x_groq`, `usage_breakdown`, etc.) qui provoquent des échecs de validation OpenAI SDK Pydantic -**GLM/ERNIE rejette le rôle `système`**— Corrigé dans la version 1.1.0 : le normalisateur de rôle fusionne automatiquement les messages système dans les messages utilisateur pour les modèles incompatibles -**Rôle de « développeur » non reconnu**— Corrigé dans la version 1.1.0 : automatiquement converti en « système » pour les fournisseurs non OpenAI -**`json_schema` ne fonctionne pas avec Gemini**— Corrigé dans la v1.1.0 : `response_format` est maintenant converti en `responseMimeType` + `responseSchema` de Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- La limite de débit automatique s'applique uniquement aux fournisseurs de clés API (pas à OAuth/abonnement)
- Vérifiez que**Paramètres → Résilience → Profils de fournisseur**a activé la limite de débit automatique.
- Vérifiez si le fournisseur renvoie les codes d'état « 429 » ou les en-têtes « Retry-After »### Tuning exponential backoff

Les profils de fournisseur prennent en charge ces paramètres :

-**Délai de base**— Temps d'attente initial après le premier échec (par défaut : 1 s) -**Délai maximum**— Limite maximale du temps d'attente (par défaut : 30 s) -**Multiplicateur**— De combien augmenter le délai par échec consécutif (par défaut : 2x)### Anti-thundering herd

Lorsque de nombreuses requêtes simultanées atteignent un fournisseur à débit limité, OmniRoute utilise mutex + limitation de débit automatique pour sérialiser les requêtes et éviter les échecs en cascade. Ceci est automatique pour les fournisseurs de clés API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Certains utilisateurs d'OmniRoute placent la passerelle devant les RAG ou les piles d'agents. Dans ces configurations, il est courant de voir un schéma étrange : OmniRoute semble sain (fournisseurs activés, profils de routage corrects, aucune alerte de limite de débit) mais la réponse finale est toujours fausse.

En pratique, ces incidents proviennent généralement du pipeline RAG en aval, et non de la passerelle elle-même.

Si vous souhaitez un vocabulaire partagé pour décrire ces échecs, vous pouvez utiliser le WFGY ProblemMap, une ressource textuelle externe sous licence MIT qui définit seize modèles d'échecs RAG/LLM récurrents. À un niveau élevé, il couvre :

- dérive de récupération et limites de contexte brisées
- index vides ou obsolètes et magasins de vecteurs
- intégration versus inadéquation sémantique
- problèmes d'assemblage rapide et de fenêtre contextuelle
- effondrement de la logique et réponses trop confiantes
- échecs de la longue chaîne et de la coordination des agents
- mémoire multi-agents et dérive des rôles
- problèmes de déploiement et d'ordre d'amorçage

L'idée est simple :

1. Lorsque vous enquêtez sur une mauvaise réponse, capturez :
   - tâche et demande de l'utilisateur
   - combo d'itinéraire ou de fournisseur dans OmniRoute
   - tout contexte RAG utilisé en aval (documents récupérés, appels d'outils, etc.)
2. Cartographiez l'incident avec un ou deux numéros WFGY ProblemMap (« No.1 » … « No.16 »).
3. Stockez le numéro dans votre propre tableau de bord, runbook ou suivi des incidents à côté des journaux OmniRoute.
4. Utilisez la page WFGY correspondante pour décider si vous devez modifier votre pile RAG, votre récupérateur ou votre stratégie de routage.

Texte intégral et recettes concrètes en direct ici (licence MIT, texte uniquement) :

[WFGY ProblemMap README](https://github.com/onestadao/WFGY/blob/main/ProblemMap/README.md)

Vous pouvez ignorer cette section si vous n'exécutez pas de RAG ou de pipelines d'agent derrière OmniRoute.---

## Still Stuck?

-**Problèmes GitHub** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architecture** : Voir [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) pour les détails internes -**Référence API** : voir [`docs/API_REFERENCE.md`](API_REFERENCE.md) pour tous les points de terminaison -**Tableau de bord de santé** : consultez**Tableau de bord → Santé**pour connaître l'état du système en temps réel -**Traducteur** : utilisez**Tableau de bord → Traducteur**pour déboguer les problèmes de format
