# Changelog (Français)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware :**Résolution d'une boucle de redirection infinie sur le tableau de bord pour les nouvelles instances lorsque requireLogin est désactivé.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Intégration native de l'API Qoder :**Complètement refactorisé de Qoder Executor pour contourner l'ancien algorithme de cryptage COSY AES/RSA, en le routant directement vers l'URL native compatible DashScope OpenAi. Élimine les dépendances complexes sur les modules « crypto » de Node tout en améliorant la fidélité du flux. -**Révision du moteur de résilience :**Solutions de secours intégrées en cas de débordement de contexte, détection proactive des jetons OAuth et prévention des émissions de contenu vide (#990). -**Stratégie de routage optimisée pour le contexte :**Ajout d'une nouvelle fonctionnalité de routage intelligent pour maximiser nativement les fenêtres contextuelles dans les déploiements combinés automatisés (#990).### 🐛 Bug Fixes

-**Corruption du flux de l'API des réponses :**Correction d'une corruption de clonage profond où les limites de traduction Anthropic/OpenAI supprimaient la « réponse ». Les préfixes SSE spécifiques des limites de streaming (#992). -**Alignement Claude Cache Passthrough :**Alignement des marqueurs de cache compatibles CC de manière cohérente avec le mode Client Pass-Through en amont préservant la mise en cache des invites. -**Fuite de mémoire Turbopack :**Épinglé Next.js sur `16.0.10` strict empêchant les fuites de mémoire et l'obsolescence de la construction suite aux récentes régressions de modules hachés Turbopack en amont (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Intégration Models.dev :**Models.dev intégré en tant que source d'exécution faisant autorité pour la tarification, les capacités et les spécifications des modèles, remplaçant les prix codés en dur. Comprend une interface utilisateur de paramètres pour gérer les intervalles de synchronisation, les chaînes de traduction pour les 30 langues et une couverture de test robuste. -**Capacités natives du fournisseur :**Ajout de la prise en charge de la déclaration et de la vérification des fonctionnalités natives de l'API (par exemple `systemInstructions_supported`) empêchant les échecs en nettoyant les rôles invalides. Actuellement configuré pour les fournisseurs Gemini Base et Antigravity OAuth. -**Paramètres avancés du fournisseur d'API :**Ajout de remplacements personnalisés « User-Agent » par connexion pour les connexions du fournisseur de clé API. Le remplacement est stocké dans `providerSpecificData.customUserAgent` et s'applique désormais aux sondes de validation et aux demandes d'exécution en amont.### 🐛 Bug Fixes

-**Fiabilité Qwen OAuth :**Résolution d'une série de problèmes d'intégration OAuth, notamment un bloqueur de 400 requêtes incorrectes sur les jetons expirés, une génération de secours pour l'analyse des propriétés `access_token` de l'OIDC lorsque `id_token` est omis, des erreurs de découverte de catalogue de modèles et un filtrage strict des en-têtes `X-Dashscope-*` pour éviter le rejet 400 des points de terminaison compatibles OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing :**Intégration native du cycle de vie CRUD pour le moteur Auto-Combo avancé (#955). -**Opérations de base :**Correction des traductions manquantes pour les nouvelles options natives d'Auto-Combos (#955). -**Validation de sécurité :**Désactivation native des tâches de sauvegarde automatique SQLite pendant l'exécution des tests unitaires CI pour résoudre explicitement les fuites de mémoire suspendues de la boucle d'événements du nœud 22 (#956). -**Proxies d'écosystème :**Terminer les planificateurs de synchronisation des modèles de mappage d'intégration explicite, les cycles OAuth et les actualisations de Token Check en toute sécurité via les proxys en amont du système natif d'OmniRoute (#953). -**Extensibilité MCP :**Ajout et enregistrement réussi du nouvel outil de framework MCP `omniroute_web_search` hors version bêta dans les schémas de production (#951). -**Tokens Buffer Logic :**Ajout de limites de configuration d'exécution étendant les tampons de jetons d'entrée/sortie configurables pour des métriques précises de suivi de l'utilisation (#959).### 🐛 Bug Fixes

-**Remédiation CodeQL :**Opérations d'indexation de chaînes critiques entièrement résolues et sécurisées empêchant les tableaux SSRF (Server-Side Request Forgery) d'indexer les heuristiques ainsi que le backtracking algorithmique polynomial (ReDoS) à l'intérieur des modules de répartiteur de proxy profond. -**Crypto Hachages :**Remplacement des hachages OAuth 1.0 hérités faibles et non vérifiés par de robustes primitives de validation standard HMAC-SHA-256 garantissant des contrôles d'accès stricts. -**Protection des limites de l'API :** Protections de routes structurelles correctement vérifiées et mappées appliquant une logique middleware stricte "isAuthenticated()" couvrant les nouveaux points de terminaison dynamiques ciblant la manipulation des paramètres et le chargement des compétences natives. -**Compatibilité de l'écosystème CLI :**Résolution des liaisons d'analyseur d'exécution natif cassées faisant planter les détecteurs d'environnement `where` strictement sur les cas extrêmes `.cmd/.exe` avec élégance pour les plugins externes (#969). -**Architecture de cache :**Mise en cache exacte de la structure des paramètres du tableau de bord d'analyse et de paramètres système refactorisée pour maintenir des cycles de persistance de réhydratation stables en résolvant les flashs d'état visuels non alignés (#952). -**Normes de mise en cache Claude :**Marqueurs de blocs éphémères critiques normalisés et strictement préservés, "éphémères", mettant en cache les ordres TTL pour les nœuds en aval, appliquant le mappage propre des requêtes CC compatibles avec les normes, sans suppression de métriques (#948). -**Authentification des alias internes :**Mappages d'exécution internes simplifiés normalisant les recherches de charge utile d'informations d'identification Codex dans les paramètres de traduction globaux résolvant 401 suppressions non authentifiées (#958).### 🛠️ Maintenance

-**Découverte de l'interface utilisateur :**Catégorisations de mise en page correctement ajustées séparant explicitement la logique des fournisseurs de niveau gratuit améliorant les flux de tri UX dans les pages de registre générales de l'API (#950). -**Topologie de déploiement :** artefacts de déploiement Docker unifiés garantissant que la racine « fly.toml » correspond aux paramètres d'instance cloud attendus, prêts à l'emploi, gérant nativement la mise à l'échelle correcte des déploiements automatisés. -**Outils de développement :**Paramètres d'exécution `LKGP` découplés dans des utilitaires de mise en cache d'abstraction de couche de base de données explicites garantissant une couverture stricte d'isolation des tests pour les couches de mise en cache principales en toute sécurité.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panneau Auto-Combo du tableau de bord :**Entièrement remanié l'interface utilisateur `/dashboard/auto-combo` pour s'intégrer de manière transparente aux cartes de tableau de bord natives et au remplissage/en-têtes visuels standardisés. Ajout de barres de progression visuelles dynamiques cartographiant les mécanismes de pondération de sélection du modèle. -**Paramètres de synchronisation de routage :**Cibles de schéma de routage avancé « prioritaire » et « pondérées » entièrement exposées en interne dans les listes de secours des paramètres globaux.### Bug Fixes

-**Nœuds régionaux de mémoire et de compétences :**Résolution des balises de rendu vides pour les options de mémoire et de compétences directement dans les vues des paramètres globaux en câblant toutes les valeurs de mappage `settings.*` en interne dans `en.json` (également mappées implicitement pour les outils de traduction croisée).### Internal Integrations

- PR #946 intégré — correctif : préserver la compatibilité du Code Claude dans la conversion des réponses
- PR #944 intégré — correctif (gemini) : préserve les signatures de pensée lors des appels d'outils antigravité
- PR #943 intégré — correctif : restaurer le corps de GitHub Copilot
- PR #942 intégré — Correction des marqueurs de cache compatibles cc
- PR #941 intégré — refactor(auth) : amélioration de la recherche d'alias NVIDIA + ajout de la journalisation des erreurs LKGP
- PR #939 intégré — Restaurer la gestion des rappels de Claude OAuth localhost
- _(Remarque : le PR #934 a été omis du cycle 3.4.9 pour éviter les régressions de conflits principaux)_---

## [3.4.8] — 2026-04-03

### Sécurité

- Entièrement corrigé tous les résultats Github Advanced Security (CodeQL) et alertes Dependabot en suspens.
- Correction de vulnérabilités aléatoires non sécurisées en migrant de « Math.random » vers « crypto.randomUUID() ».
- Commandes shell sécurisées dans des scripts automatisés à partir de l'injection de chaînes.
- Migration des modèles d'analyse RegEx de backtracking catastrophique vulnérables dans les pipelines de discussion/traduction.
- Amélioration des contrôles de nettoyage des sorties dans les composants de l'interface utilisateur React et de l'injection de balises Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Fonctionnalités

- Ajout du nœud « Cryptographie » aux contrôles de santé de surveillance et MCP (#798)
- Mappage renforcé des autorisations de route modèle-catalogue (`/models`) (#781)### Bug Fixes

- Correction des actualisations du jeton Claude OAuth qui ne parvenaient pas à préserver les contextes de cache (#937)
- Correction d'erreurs du fournisseur compatible CC rendant les modèles mis en cache inaccessibles (#937)
- Correction des erreurs de GitHub Executor liées à des tableaux de contexte non valides (#937)
- Correction des échecs de vérification de l'état des outils CLI installés par NPM sous Windows (#935)
- Correction de la traduction de la charge utile supprimant le contenu valide en raison de champs API non valides (#927)
- Correction d'un crash d'exécution dans le nœud 25 concernant l'exécution de la clé API (#867)
- Correction de la résolution du module autonome MCP (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Correction de la non-concordance d'alias de résolution des informations d'identification de routage NVIDIA NIM (#931)### Sécurité

- Ajout d'une protection stricte et sécurisée des limites d'entrée contre les injections brutes d'exécution de code à distance `shell: true`.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Fournisseurs :**Nouveaux fournisseurs de génération d'images, de vidéos et d'audio enregistrés à partir de la liste demandée par la communauté (#926). -**Interface utilisateur du tableau de bord :**Ajout d'une navigation dans la barre latérale autonome pour les nouveaux modules Mémoire et Compétences (#926). -**i18n :**Ajout de chaînes de traduction et de mappages de mise en page dans 30 langues pour les espaces de noms Mémoire et Compétences.### 🐛 Bug Fixes

-**Résilience :**Empêche le disjoncteur proxy de rester bloqué indéfiniment dans un état OUVERT en gérant les transitions directes vers l'état FERMÉ à l'intérieur des chemins combinés de secours (#930). -**Traduction du protocole :**Correction du transformateur de streaming pour nettoyer les blocs de réponse en fonction du protocole _source_ attendu plutôt que du protocole _target_ du fournisseur, corrigeant les modèles Anthropics enveloppés dans des charges utiles OpenAI faisant planter Claude Code (#929). -**Spécifications API et Gemini :**Correction de l'analyse `thought_signature` dans les traducteurs `openai-to-gemini` et `claude-to-gemini`, empêchant les erreurs HTTP 400 dans tous les appels d'outils API Gemini 3. -**Fournisseurs :**Nettoyage des points de terminaison non compatibles OpenAI empêchant les connexions en amont valides (#926). -**Cache Trends :**Correction d'une incompatibilité de données de mappage de propriété non valide provoquant le blocage des graphiques de l'interface utilisateur de Cache Trends et extraction des widgets de métriques de cache redondants (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Intégration de l'écosystème CLIProxyAPI :**Ajout de l'exécuteur `cliproxyapi` avec mise en cache intégrée au niveau du module et routage proxy. Introduction d'un service complet de gestion de versions pour tester automatiquement l'état de santé, télécharger des binaires depuis GitHub, générer des processus en arrière-plan isolés et gérer proprement le cycle de vie des outils CLI externes directement via l'interface utilisateur. Inclut des tables de base de données pour la configuration du proxy afin de permettre le routage croisé automatique déclenché par SSRF des requêtes OpenAI externes via la couche d'outils CLI locale (#914, #915, #916). -**Prise en charge de Qoder PAT :**Prise en charge des jetons d'accès personnels intégrés (PAT) directement via le transport local `qodercli` au lieu des anciennes configurations de navigateur distantes `.cn` (#913). -**Gemini 3.1 Pro Preview (GitHub) :**Ajout de la prise en charge du modèle explicite canonique `gemini-3.1-pro-preview` de manière native dans le fournisseur GitHub Copilot tout en préservant les anciens alias de routage (#924).### 🐛 Bug Fixes

-**Stabilité des jetons GitHub Copilot :**Réparation de la boucle d'actualisation des jetons Copilot où les jetons obsolètes n'étaient pas profondément fusionnés dans la base de données, et suppression des champs `reasoning_text` qui interrompaient fatalement les conversions de blocs Anthropic en aval pour les discussions à plusieurs tours (#923). -**Global Timeout Matrix :**Délais d'expiration des requêtes centralisés et paramétrés explicitement à partir de `REQUEST_TIMEOUT_MS` pour empêcher les tampons de récupération par défaut cachés (~ 300 s) de couper prématurément les réponses de streaming SSE de longue durée à partir de modèles de raisonnement lourds (#918). -**État des tunnels rapides Cloudflare :**Correction d'une grave incohérence d'état où les instances OmniRoute redémarrées indiquaient par erreur les tunnels détruits comme actifs et le tunneling cloudflared par défaut sur « HTTP/2 » pour éliminer le spam du journal de tampon de réception UDP (#925). -**Révision de la traduction i18n (tchèque et hindi) :**Correction du code hindi obsolète de « in.json » vers le canonique « hi.json », révision des mappages de texte tchèque, extraction de « untranslatable-keys.json » pour corriger les validations faussement positives CI/CD et génération de documents complets « I18N.md » pour guider les traducteurs (#912). -**Récupération du fournisseur de jetons :**Correction de la perte par Qwen de points de terminaison `resourceUrl` spécifiques après l'actualisation automatique du jeton de contrôle de santé en raison de fusions profondes de base de données manquantes (#917). -**UX et streaming compatibles CC :**Unifié les actions d'ajout de compatibilité CC/OpenAI/Anthropic autour du traitement de l'interface utilisateur Anthropic, forcé les requêtes en amont compatibles CC à utiliser SSE tout en renvoyant des réponses en streaming ou non en streaming en fonction de la demande du client, suppression de la prise en charge de la configuration/importation de la liste de modèles CC au profit d'une erreur explicite de liste de modèles non pris en charge et rendu les modèles disponibles compatibles CC miroir de la liste de registre OAuth Claude Code (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting :**Émettez `response.completed` avec les champs `input_tokens`/`output_tokens` corrects pour les clients Codex CLI, corrigeant l'affichage de l'utilisation des jetons (#909 — merci @christopher-s). -**Point de contrôle SQLite WAL à l'arrêt :**Videz les modifications WAL dans le fichier de base de données principal lors d'un arrêt/redémarrage progressif, évitant ainsi la perte de données lors des arrêts du conteneur Docker (#905 — merci @rdself). -**Signal d'arrêt gracieux :**Modification des routes `/api/restart` et `/api/shutdown` de `process.exit(0)` à `process.kill(SIGTERM)`, garantissant que le gestionnaire d'arrêt s'exécute avant la sortie. -**Docker Stop Grace Period :**Ajout de `stop_grace_period: 40s` aux fichiers Docker Compose et `--stop-timeout 40` aux exemples d'exécution de Docker.### 🛠️ Maintenance

- Fermeture de 5 problèmes résolus/pas de bug (#872, #814, #816, #890, #877).
- Tri de 6 problèmes avec des demandes d'informations sur les besoins (#892, #887, #886, #865, #895, #870).
- Réponse au problème de suivi de détection CLI (#863) avec les conseils des contributeurs.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Mémoire et compétences antigravité :**Injection de mémoire à distance et de compétences terminée pour le fournisseur Antigravity au niveau du réseau proxy. -**Compatibilité Claude Code :**Création d'un pont de compatibilité caché de manière native pour Claude Code, en transmettant les outils et le formatage proprement. -**Web Search MCP :**Ajout de l'outil `omniroute_web_search` avec la portée `execute:search`. -**Composants de cache :**Implémentation de composants de cache dynamique utilisant TDD. -**UI et personnalisation :**Ajout de la prise en charge des favicon personnalisés, des onglets d'apparence, de l'étiquetage blanc filaire dans la barre latérale et des étapes du guide Windsurf ajoutées dans les 33 langues. -**Conservation des journaux :**Rétention unifiée des journaux de requêtes et des artefacts de manière native. -**Améliorations du modèle :**Ajout de `contextLength` explicite pour tous les modèles opencode-zen. -**i18n et traductions :**Intégration native de 33 traductions linguistiques, y compris les validations CI d'espaces réservés et les mises à jour de la documentation chinoise (#873, #869).### 🐛 Bug Fixes

-**Mappage OAuth Qwen :**Inversion de la dépendance de `id_token` à `access_token` et activation de l'injection dynamique de point de terminaison d'API `resource_url` pour un routage régional approprié (#900). -**Model Sync Engine :**Stockage de l'ID de fournisseur interne strict dans les routines de synchronisation `getCustomModels()` au lieu du format UI Channel Alias, empêchant les échecs d'insertion du catalogue SQLite (#903). -**Claude Code & Codex :**Réponses vierges standardisées sans streaming aux « (réponse vide) » au format Anthropic pour éviter les plantages du proxy CLI (#866). -**Routage compatible CC :**Résolution de la collision de point de terminaison en double `/v1` lors de la concaténation de chemin pour les passerelles génériques Claude Code (#904). -**Tableaux de bord antigravité :**Empêche les modèles de quotas illimités de s'enregistrer faussement comme des états limites d'utilisation à 100 % épuisés dans l'interface utilisateur d'utilisation du fournisseur (#857). -**Claude Image Passthrough :**Correction des modèles Claude manquant de passages de blocs d'image (#898). -**Gemini CLI Routing :**Résolution des problèmes de verrouillage d'autorisation 403 et d'accumulation de contenu en actualisant l'ID du projet via `loadCodeAssist` (#868). -**Stabilité antigravité :**Listes d'accès aux modèles corrigées, verrouillages 404 appliqués, correction de 429 cascades bloquant les connexions standard et plafonnement des jetons de sortie `gemini-3.1-pro` (#885). -**Cadence de synchronisation du fournisseur :**Réparation de la cadence de synchronisation des limites du fournisseur via le planificateur interne (#888). -**Optimisation du tableau de bord :**Résolution du gel de l'interface utilisateur `/dashboard/limits` lors du traitement de plus de 70 comptes via la parallélisation de morceaux (#784). -**Durcissement SSRF :**Filtrage strict de la plage IP SSRF appliqué et blocage de l'interface de bouclage `::1`. -**Types MIME :**`mime_type` standardisé en Snake_case pour correspondre aux spécifications de l'API Gemini. -**Stabilisation CI :**Correction des échecs d'analyse/paramètres des sélecteurs de dramaturge et des assertions de requête afin que les exécutions de GitHub Actions E2E soient transmises de manière fiable à travers les interfaces utilisateur localisées et les contrôles basés sur les commutateurs. -**Tests déterministes :**Suppression des quotas sensibles à la date des tests d'utilisation de Copilot et alignement des tests d'idempotence/catalogue de modèles avec le comportement d'exécution fusionné. -**Durcissement du type MCP :**Suppression des régressions explicites « toutes » explicites à budget nul du chemin d'enregistrement de l'outil du serveur MCP. -**Moteur de synchronisation de modèles :** Les remplacements destructifs de remplacement ont été contournés lorsque la synchronisation automatique du fournisseur génère une liste de modèles vide, maintenant ainsi la stabilité des catalogues dynamiques (#899).### 🛠️ Maintenance

-**Journalisation du pipeline :**Amélioration des artefacts de journalisation du pipeline et application des plafonds de rétention (#880). -**Révision AGENTS.md :**Condensé de 297→153 lignes. Ajout de directives de construction/test/style, de flux de travail de code (Prettier, TypeScript, ESLint) et de tableaux détaillés réduits (#882). -**Intégration des branches de version :**Consolidation des branches de fonctionnalités actives dans `release/v3.4.2` au-dessus de `main` actuelle et validation de la branche avec les exécutions lint, unit, cover, build et CI-mode E2E. -**Test :**Ajout de la configuration Vitest pour les tests de composants et des spécifications Playwright pour les bascules de paramètres. -**Mises à jour de la documentation :**Fichiers lisez-moi racine étendus, documents chinois traduits de manière native et fichiers obsolètes nettoyés.## [3.4.1] - 2026-03-31

> [!AVERTISSEMENT]
> **CHANGEMENT RUPTURE : les variables d'environnement de journalisation, de rétention et de journalisation des demandes ont été repensées.**
> Au premier démarrage après la mise à niveau, OmniRoute archive les anciens journaux de requêtes de `DATA_DIR/logs/`, les anciens `DATA_DIR/call_logs/` et `DATA_DIR/log.txt` dans `DATA_DIR/log_archives/*.zip`, puis supprime la disposition obsolète et passe au nouveau format d'artefact unifié sous `DATA_DIR/call_logs/`.### ✨ New Features

-**Utilitaire de migration .ENV :**Inclus `scripts/migrate-env.mjs` pour migrer de manière transparente les configurations `<v3.3` vers les contraintes strictes de validation de sécurité `v3.4.x` (FASE-01), réparant les plantages de démarrage causés par de courtes instances `JWT_SECRET`. -**Optimisation du cache Kiro AI :**Implémentation de la génération déterministe `conversationId` (uuidv5) pour activer correctement la mise en cache des invites d'identification d'AWS Builder lors des invocations (#814). -**Restauration et consolidation de l'interface utilisateur du tableau de bord :**Résolution de la logique de la barre latérale en omettant la section Debug et suppression des avertissements de routage Nextjs en déplaçant les pages autonomes `/dashboard/mcp` et `/dashboard/a2a` explicitement dans les composants intégrés de l'interface utilisateur du proxy de point de terminaison. -**Artefacts du journal de requêtes unifié :**La journalisation des requêtes stocke désormais une ligne d'index SQLite plus un artefact JSON par requête sous `DATA_DIR/call_logs/`, avec une capture de pipeline facultative intégrée dans le même fichier. -**Langue :**Amélioration de la traduction chinoise (#855) -**Modèles Opencode-Zen :**Ajout de 4 modèles gratuits au registre opencode-zen (#854) -**Tests :**Ajout de tests unitaires et E2E pour les bascules de paramètres et corrections de bugs (#850)### 🐛 Bug Fixes

-**Analyse des quotas 429 :**Analyse des longs temps de réinitialisation des quotas à partir des corps d'erreur pour honorer les intervalles d'attente corrects et empêcher les interdictions de compte à débit limité (#859) -**Prompt Caching :**En-têtes client `cache_control` préservés pour tous les fournisseurs de protocole Claude (comme Minimax, GLM et Bailian), reconnaissant correctement la prise en charge de la mise en cache (#856) -**Journaux de synchronisation des modèles :**Réduction du spam des journaux en enregistrant les « modèles de synchronisation » uniquement lorsque le canal modifie réellement la liste (#853) -**Quota du fournisseur et analyse des jetons :**Limites d'antigravité commutées pour utiliser `retrieveUserQuota` de manière native et correctement mappé les charges utiles d'actualisation des jetons Claude aux formulaires codés en URL (#862) -**Stabilité de limitation de débit :**Universalisation de l'architecture d'analyse 429 Retry-After pour limiter les temps de recharge induits par le fournisseur à 24 heures maximum (#862) -**Rendu des limites du tableau de bord :**Cartographie des quotas `/dashboard/limits` restructurée pour un rendu immédiat à l'intérieur des morceaux, corrigeant un retard majeur de gel de l'interface utilisateur sur les comptes dépassant 70 connexions actives (#784) -**Autorisation QWEN OAuth :**Mappage de l'OIDC `id_token` comme jeton principal du support d'API pour les requêtes Dashscope, corrigeant immédiatement les erreurs 401 non autorisées après la connexion des comptes ou l'actualisation des jetons (#864) -**Stabilité de l'API ZAI :**Compilateur renforcé d'événements envoyés par le serveur pour revenir gracieusement aux chaînes vides lorsque les fournisseurs DeepSeek diffusent du contenu mathématiquement nul pendant les phases de raisonnement (#871) -**Claude Code/Codex Translations :**Conversions de charge utile hors streaming protégées contre les réponses vides des outils Codex en amont, évitant ainsi les TypeErrors catastrophiques (#866) -**NVIDIA NIM Rendering :**Suppression conditionnelle des préfixes de fournisseur identiques poussés dynamiquement par les modèles audio, éliminant les structures de balises `nim/nim` en double, jetant 404 sur Media Playground (#872)### ⚠️ Breaking Changes

-**Disposition du journal des requêtes :**Suppression des anciennes sessions de journal des requêtes multi-fichiers `DATA_DIR/logs/` et du fichier récapitulatif `DATA_DIR/log.txt`. Les nouvelles requêtes sont écrites sous forme d'artefacts JSON uniques dans `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Variables d'environnement de journalisation :**Remplacement de `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` et `PROXY_LOG_MAX_ENTRIES` par le nouveau modèle de configuration `APP_LOG_*` et `CALL_LOG_RETENTION_DAYS`. -**Paramètre de bascule de pipeline :**Remplacement de l'ancien paramètre `detailed_logs_enabled` par `call_log_pipeline_enabled`. Les nouveaux détails du pipeline sont intégrés dans l'artefact de requête au lieu d'être stockés sous forme d'enregistrements « request_detail_logs » distincts.### 🛠️ Maintenance

-**Sauvegarde de mise à niveau du journal des demandes héritées :**Les mises à niveau archivent désormais les anciennes mises en page `data/logs/`, les anciennes `data/call_logs/` et `data/log.txt` dans `DATA_DIR/log_archives/*.zip` avant de supprimer la structure obsolète. -**Persistance de l'utilisation du streaming :**Les requêtes de streaming écrivent désormais une seule ligne « usage_history » à la fin au lieu d'émettre une ligne d'utilisation en cours en double avec des métadonnées d'état vides. -**Nettoyage de suivi de journalisation :**Les journaux de pipeline ne capturent plus `SOURCE REQUEST`, les entrées d'artefact de demande honorent désormais `CALL_LOG_MAX_ENTRIES` et les archives de journaux d'application honorent désormais `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Fonctionnalités

-**Analyse de l'utilisation des abonnements :**Ajout du suivi des séries chronologiques d'instantanés de quota, des onglets Utilisation du fournisseur et Santé combinée avec des visualisations de recharts et les points de terminaison d'API correspondants (#847) -**SQLite Backup Control :**Nouvel indicateur d'environnement `OMNIROUTE_DISABLE_AUTO_BACKUP` pour désactiver les sauvegardes SQLite automatiques (#846) -**Mise à jour du registre des modèles :**Injecté `gpt-5.4-mini` dans la gamme de modèles du fournisseur Codex (#756) -**Suivi des limites du fournisseur :**Suivez et affichez la dernière actualisation des limites de tarif du fournisseur par compte (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing :**Réacheminement des complétions Qwen OAuth de l'API DashScope vers l'API Web Inference (`chat.qwen.ai`), résolvant les échecs d'autorisation (#844, #807, #832) -**Boucle de réessai automatique Qwen :**Ajout de la gestion ciblée du quota 429 dépassé au sein de « chatCore » protégeant les requêtes en rafale -**Codex OAuth Fallback :**Le blocage des fenêtres contextuelles du navigateur moderne ne piège plus l'utilisateur ; il revient automatiquement à la saisie manuelle de l'URL (#808) -**Claude Token Refresh :**Les limites strictes `application/json` d'Anthropic sont désormais respectées lors de la génération du token au lieu des URL codées (#836) -**Schéma des messages Codex :**Des « messages » puristes supprimés sont injectés à partir de requêtes passthrough natives pour éviter les rejets structurels du ChatGPT en amont (#806) -**Limite de taille de détection CLI :** A augmenté en toute sécurité la limite supérieure de l'analyse binaire du nœud de 100 Mo à 350 Mo, permettant aux outils autonomes lourds comme Claude Code (229 Mo) et OpenCode (153 Mo) d'être correctement détectés par le moteur d'exécution VPS (#809) -**Environnement d'exécution CLI :**Capacité restaurée pour les configurations CLI de respecter les chemins de remplacement des utilisateurs (`CLI_{PROVIDER}_BIN`) en contournant les règles strictes de découverte liées aux chemins -**Conflits d'en-tête Nvidia :**Suppression des propriétés `prompt_cache_key` des en-têtes en amont lors de l'appel de fournisseurs non-Anthropic (#848) -**Basculement rapide du niveau Codex :**Contraste de basculement du niveau de service Codex restauré en mode clair (#842) -**Infrastructure de test :**Mise à jour du test `t28-model-catalog-updates` qui attendait à tort le point de terminaison DashScope obsolète pour le registre natif Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotation des fournisseurs personnalisés :**Intégration de `getRotatingApiKey` en interne dans DefaultExecutor, garantissant que la rotation `extraApiKeys` se déclenche correctement pour les fournisseurs en amont personnalisés et compatibles (#815)---

## [3.3.8] - 2026-03-30

### Fonctionnalités

-**Filtrage de l'API des modèles :**Le point de terminaison `/v1/models` filtre désormais dynamiquement sa liste en fonction des autorisations liées à `Autorisation : porteur <jeton>` lorsque l'accès restreint est activé (#781) -**Intégration Qoder :**Intégration native pour Qoder AI remplaçant nativement les anciens mappages de la plateforme iFlow (#660) -**Suivi du cache d'invite :**Ajout de capacités de suivi et de visualisation frontale (carte de statistiques) pour la mise en cache sémantique et d'invite dans l'interface utilisateur du tableau de bord.### 🐛 Bug Fixes

-**Dimensionnement du tableau de bord du cache :**Amélioration des tailles de présentation de l'interface utilisateur et des en-têtes contextuels pour les pages de cache avancées (#835) -**Visibilité de la barre latérale du débogage :**Correction d'un problème où la bascule de débogage n'affichait/masquait pas correctement les détails de débogage de la barre latérale (#834) -**Préfixe du modèle Gemini :**Modification de l'espace de noms de secours pour acheminer correctement via `gemini-cli/` au lieu de `gc/` pour respecter les spécifications en amont (#831) -**OpenRouter Sync :**Synchronisation de compatibilité améliorée pour ingérer automatiquement et correctement le catalogue de modèles disponibles à partir d'OpenRouter (#830) -**Streaming Payloads Mapping :**La resérialisation des champs de raisonnement résout de manière native les chemins d'alias de conflit lorsque la sortie est diffusée vers des appareils périphériques.---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config :**`opencode.json` généré restructuré pour utiliser le schéma basé sur les enregistrements `@ai-sdk/openai-compatible` avec `options` et `models` comme cartes d'objets au lieu de tableaux plats, corrigeant les échecs de validation de configuration (#816) -**Clés manquantes i18n :**Ajout de la clé de traduction `cloudflaredUrlNotice` manquante dans les 30 fichiers de langue pour éviter les erreurs de console `MISSING_MESSAGE` dans la page Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Comptabilité des jetons :**Inclusion des jetons de cache d'invite en toute sécurité dans les calculs d'entrées d'utilisation historique pour les déductions de quotas correctes (PR #822) -**Sondes de test combo :**Correction des faux négatifs de la logique de test combo en résolvant l'analyse des réponses de raisonnement uniquement et en activant la parallélisation massive via Promise.all (PR #828) -**Docker Quick Tunnels :** Intégration des certificats ca requis dans le conteneur d'exécution de base pour résoudre les échecs de démarrage de Cloudflared TLS et apparition d'erreurs réseau stdout remplaçant les codes de sortie génériques (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Suivi des quotas Gemini :**Ajout du suivi des quotas Gemini CLI en temps réel via l'API `retrieveUserQuota` (PR #825) -**Cache Dashboard :**Amélioration du tableau de bord de cache pour afficher les métriques de cache rapides, les tendances sur 24 heures et les économies estimées (PR #824)### 🐛 Bug Fixes

-**Expérience utilisateur :**Suppression des boucles modales OAuth à ouverture automatique invasives sur les pages détaillées du fournisseur stérile (PR #820) -**Mises à jour des dépendances :**Dépendances modifiées et verrouillées pour les arborescences de développement et de production, notamment Next.js 16.2.1, Recharts et TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Flux de travail A2A :**Ajout d'un orchestrateur FSM déterministe pour les flux de travail d'agent en plusieurs étapes. -**Graceful Degradation :**Ajout d'un nouveau cadre de secours multicouche pour préserver les fonctionnalités de base lors de pannes partielles du système. -**Config Audit :**Ajout d'une piste d'audit avec détection des différences pour suivre les modifications et activer les restaurations de configuration. -**Santé du fournisseur :**Ajout du suivi de l'expiration du fournisseur avec des alertes proactives de l'interface utilisateur pour les clés API expirant. -**Routage adaptatif :**Ajout d'un détecteur adaptatif de volume et de complexité pour remplacer les stratégies de routage de manière dynamique en fonction de la charge. -**Diversité des fournisseurs :**Implémentation d'un score de diversité des fournisseurs via l'entropie de Shannon pour améliorer la répartition de la charge. -**Limites de désactivation automatique :**Ajout d'un paramètre de désactivation automatique des comptes interdits au tableau de bord de résilience.### 🐛 Bug Fixes

-**Compatibilité Codex et Claude :**Correction des solutions de secours de l'interface utilisateur, correction des problèmes d'intégration du Codex sans streaming et résolution de la détection de l'exécution CLI sous Windows. -**Release Automation :**Autorisations étendues requises pour la construction de l'application Electron dans GitHub Actions. -**Cloudflare Runtime :**Correction des codes de sortie d'isolation d'exécution corrects pour les composants du tunnel Cloudflared.### 🧪 Tests

-**Mises à jour de la suite de tests :**Couverture de test étendue pour les détecteurs de volume, la diversité des fournisseurs, l'audit de configuration et le FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Fiabilité CI/CD :**Actions GitHub corrigées vers des versions de dépendances stables (`actions/checkout@v4`, `actions/upload-artifact@v4`) pour atténuer les dépréciations inopinées de l'environnement du constructeur. -**Image de secours :**Remplacement des chaînes de secours arbitraires dans `ProviderIcon.tsx` par une validation explicite des actifs pour empêcher l'interface utilisateur de charger les composants `<Image>` pour des fichiers qui n'existent pas, éliminant ainsi les erreurs `404` dans les journaux de la console du tableau de bord (#745). -**Admin Updater :**Détection dynamique de l'installation de la source pour le programme de mise à jour du tableau de bord. Désactive en toute sécurité le bouton « Mettre à jour maintenant » lorsqu'OmniRoute est construit localement plutôt que via npm, invitant « git pull » (#743). -**Update ERESOLVE Error:**Injected `package.json` overrides for `react`/`react-dom` and enabled `--legacy-peer-deps` within the internal automatic updater scripts to resolve breaking dependency tree conflicts with `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels :**Intégration de Cloudflare Quick Tunnel avec les contrôles du tableau de bord (PR #772). -**Diagnostics :**Contournement du cache sémantique pour les tests combo en direct (PR #773).### 🐛 Bug Fixes

-**Stabilité du streaming :**Appliquez `FETCH_TIMEOUT_MS` à l'appel initial `fetch()` des requêtes de streaming pour éviter un délai TCP Node.js de 300 s provoquant des échecs de tâches silencieuses (#769). -**i18n :**Ajoutez les entrées `windsurf` et `copilot` manquantes aux `toolDescriptions` dans les 33 fichiers de paramètres régionaux (#748). -**Audit de codage GLM :**Audit complet du fournisseur corrigeant les vulnérabilités ReDoS, le dimensionnement de la fenêtre contextuelle (128 000/16 000) et la synchronisation du registre de modèles (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex :**Correction du traitement de secours pour les éléments `type : "text"` contenant des ensembles de données nuls ou vides qui ont provoqué 400 rejets (#742). -**Opencode :**Mettre à jour l'alignement du schéma vers le « fournisseur » singulier pour correspondre aux spécifications officielles (#774). -**Gemini CLI :**Injectez les en-têtes de quota d'utilisateur final manquants empêchant les verrouillages d'autorisation 403 (#775). -**DB Recovery :**Refactorisez les importations de charges utiles en plusieurs parties dans des tableaux binaires bruts mis en mémoire tampon pour contourner les limites de corps maximum du proxy inverse (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilisation**— Finalisation de la version v3.2.9 (diagnostics combinés, contrôles de qualité, correctif de l'outil Gemini) et création de la balise git manquante. Consolidation de toutes les modifications par étapes dans une seule validation de version atomique.### 🐛 Bug Fixes

-**Test de mise à jour automatique**— Correction de l'assertion de test `buildDockerComposeUpdateScript` pour correspondre aux références de variables shell non développées (`$TARGET_TAG`, `${TARGET_TAG#v}`) dans le script de déploiement généré, en s'alignant sur le modèle refactorisé de la v3.2.8. -**Test de disjoncteur**— Renforcement de `combo-circuit-breaker.test.mjs` en injectant `maxRetries: 0` pour empêcher l'inflation des nouvelles tentatives de fausser les assertions du nombre d'échecs pendant les transitions d'état du disjoncteur.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Introduction d'un indicateur de contournement de test en direct (« forceLiveComboTest ») permettant aux administrateurs d'exécuter de véritables contrôles de santé en amont qui contournent tous les mécanismes locaux de disjoncteur et d'état de refroidissement, permettant ainsi des diagnostics précis lors des pannes de déploiement (PR #759). -**Quality Gates**— Ajout d'une validation automatisée de la qualité des réponses pour les combos et prise en charge du modèle « claude-4.6 » officiellement intégrée dans les schémas de routage de base (PR #762)### 🐛 Bug Fixes

-**Validation de la définition de l'outil**— Réparation de l'intégration de l'API Gemini en normalisant les types d'énumération dans les définitions d'outils, empêchant ainsi les erreurs de paramètres HTTP 400 en amont (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**— Intégration d'un processus de mise à jour en arrière-plan détaché pour les déploiements Docker Compose. L'interface utilisateur du tableau de bord suit désormais de manière transparente les événements du cycle de vie des mises à jour en combinant les réponses JSON REST avec les superpositions de progression du streaming SSE pour une fiabilité robuste entre environnements. -**Cache Analytics**— Réparation du mappage de visualisation sans métrique en migrant les journaux de télémétrie du cache sémantique directement dans le module SQLite de suivi centralisé.### 🐛 Bug Fixes

-**Logique d'authentification**— Correction d'un bug où l'enregistrement des paramètres du tableau de bord ou l'ajout de modèles échouait avec une erreur 401 non autorisée lorsque « requireLogin » était désactivé. Les points de terminaison de l'API évaluent désormais correctement la bascule d'authentification globale. Redirection globale résolue en réactivant `src/middleware.ts`. -**Détection de l'outil CLI (Windows)**— Prévention des exceptions d'initialisation fatales lors de la détection de l'environnement CLI en détectant correctement les erreurs ENOENT `cross-spawn`. Ajoute des chemins de détection explicites pour `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Paramètres de traduction de modèle normalisés empêchant l'empoisonnement du contexte en mode proxy pass-through, appliquant explicitement des contraintes génériques `store: false` pour toutes les requêtes provenant du Codex. -**SSE Token Reporting**— Détection normalisée du bloc d'appel d'outil du fournisseur `finish_reason`, corrigeant l'analyse d'utilisation de 0 % pour les réponses de flux uniquement manquant d'indicateurs stricts `<DONE>`. -**DeepSeek <think> Tags**— Implémentation d'un mappage d'extraction explicite `<think>` dans `responsesHandler.ts`, garantissant que les flux de raisonnement DeepSeek correspondent de manière équivalente aux structures anthropiques natives `<thinking>`.---

## [3.2.7] - 2026-03-29

### Fixed

-**Mises à jour transparentes de l'interface utilisateur** : la fonctionnalité « Mettre à jour maintenant » sur le tableau de bord fournit désormais des commentaires en direct et transparents à l'aide des événements envoyés par le serveur (SSE). Il effectue l'installation des packages, les reconstructions de modules natifs (better-sqlite3) et PM2 redémarre de manière fiable tout en affichant les chargeurs en temps réel au lieu de se bloquer silencieusement.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Ajout d'un flux de copie de clé API étendu dans Api Manager, protégé par la variable d'environnement `ALLOW_API_KEY_REVEAL`. -**Contrôles de visibilité de la barre latérale (#739)**— Les administrateurs peuvent désormais masquer n'importe quel lien de navigation de la barre latérale via les paramètres d'apparence pour réduire l'encombrement visuel. -**Tests combo stricts (#735)**— Renforcement du point de terminaison du contrôle de santé combo pour exiger des réponses textuelles en direct des modèles au lieu de simples signaux d'accessibilité douce. -**Journaux détaillés en streaming (#734)**— Modification de la journalisation détaillée des requêtes pour les flux SSE afin de reconstruire la charge utile finale, économisant ainsi d'immenses quantités de taille de base de données SQLite et nettoyant considérablement l'interface utilisateur.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Correction de la logique d'en-tête d'authentification pour les modèles `minimax` sur OpenCode Go afin d'utiliser `x-api-key` au lieu des jetons de support standard dans le protocole `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Modèle d'empaquetage `xbps-src` intégré et instructions pour compiler et installer nativement OmniRoute avec les liaisons `better-sqlite3` via une cible de compilation croisée.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Migration complète de l'ancien fournisseur principal « iFlow » vers « Qoder AI » en maintenant des capacités de routage d'API stables.### 🐛 Bug Fixes

-**Argument invalide de charge utile HTTP 400 de Gemini Tools (#731)**— Empêche les injections de tableau `thoughtSignature` dans les séquences `functionCall` standard de Gemini bloquant les flux de routage agentique.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Interface utilisateur de quota de limites du fournisseur (#728)**— Logique de limite de quota normalisée et étiquetage des données dans l'interface Limites.### 🐛 Bug Fixes

-**Schémas et fuites de routage de base**— `comboStrategySchema` étendu pour prendre en charge nativement les stratégies `fill-first` et `p2c` pour débloquer nativement l'édition de combos complexes. -**Thinking Tags Extraction (CLI)**— Désinfecteur de réponses de jetons CLI restructuré RegEx capturant les structures de raisonnement du modèle à l'intérieur des flux en évitant les extractions `<thinking>` cassées, brisant le format de sortie du texte de réponse. -**Applications strictes du format**— Exécution renforcée de la désinfection du pipeline, ce qui la rend universellement applicable aux cibles en mode traduction.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Pipeline de journaux de requêtes en quatre étapes (#705)**— Persistance des journaux refactorisée pour enregistrer des charges utiles complètes à quatre étapes de pipeline distinctes : demande du client, demande du fournisseur traduite, réponse du fournisseur et réponse du client traduite. Introduction de « streamPayloadCollector » pour une troncature de flux SSE robuste et une sérialisation de la charge utile.### 🐛 Bug Fixes

-**Corrections de l'interface utilisateur mobile (#659)**— Empêche les composants de tableau du tableau de bord de rompre la disposition dans les fenêtres étroites en ajoutant un défilement horizontal approprié et un confinement de débordement à `DashboardLayout`. -**Claude Prompt Cache Fixes (#708)**— Garantit que les blocs `cache_control` dans les boucles de repli Claude à Claude sont fidèlement préservés et transmis en toute sécurité aux modèles Anthropic. -**Définitions de l'outil Gemini (#725)**— Correction d'erreurs de traduction de schéma lors de la déclaration de types de paramètres « objet » simples pour l'appel de fonction Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Lorsque tous les modèles combinés sont épuisés (502/503), OmniRoute tente désormais un modèle de secours global configurable avant de renvoyer l'erreur. Définissez « globalFallbackModel » dans les paramètres pour l'activer.### 🐛 Bug Fixes

-**Correction #721**— Correction du contournement de l'épinglage du contexte lors des réponses aux appels d'outils. Le balisage sans streaming utilisait un mauvais chemin JSON (`json.messages` → `json.choices[0].message`). L'injection de streaming se déclenche désormais sur les morceaux `finish_reason` pour les flux utilisant uniquement des appels d'outils. `injectModelTag()` ajoute désormais des messages d'épingle synthétiques pour le contenu sans chaîne. -**Fix #709**— Confirmé déjà corrigé (v3.1.9) — `system-info.mjs` crée des répertoires de manière récursive. Fermé. -**Fix #707**— Confirmé déjà corrigé (v3.1.9) — désinfection du nom d'outil vide dans `chatCore.ts`. Fermé.### 🧪 Tests

- Ajout de 6 tests unitaires pour l'épinglage de contexte avec des réponses aux appels d'outils (contenu nul, contenu du tableau, aller-retour, réinjection)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache Management UI**— Ajout d'un tableau de bord de mise en cache sémantique dédié dans \`/dashboard/cache\` avec invalidation d'API ciblée et prise en charge d'i18n en 31 langues (PR #701 par @oyi77) -**Suivi des quotas GLM**— Ajout du suivi de l'utilisation et des quotas de session en temps réel pour le fournisseur GLM Coding (Z.AI) (PR #698 par @christopher-s) -**Charges utiles de journaux détaillées**— Capture complète de la charge utile du pipeline en quatre étapes (originale, traduite, réponse du fournisseur, deltas diffusés) directement dans l'interface utilisateur (PR #705 par @rdself)### 🐛 Bug Fixes

-**Correction #708**— Empêche le saignement des jetons pour le routage des utilisateurs de Claude Code via OmniRoute en préservant correctement les en-têtes natifs \`cache_control\` lors du passage de Claude à Claude (PR #708 par @tombii) -**Fix #719**— Configurez des limites d'authentification internes pour \`ModelSyncScheduler\` afin d'éviter les échecs de démons non authentifiés au démarrage (PR #719 par @rdself) -**Fix #718**— Rendu du badge reconstruit dans l'interface utilisateur des limites du fournisseur empêchant le chevauchement des limites de quota incorrectes (PR #718 par @rdself) -**Correction n°704**— Correction des solutions de repli combinées en cas d'erreurs de politique de contenu HTTP 400 empêchant le routage mort de rotation de modèle (PR n°704 par @rdself)### 🔒 Security & Dependencies

- Remplacement du \`path-to-regexp\` par \`8.4.0\` pour résoudre les vulnérabilités de dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Correction #706**— Correction du rendu de secours des icônes provoqué par le remplacement de `font-sans` de Tailwind V4 en appliquant `!important` à `.material-symbols-outlined`. -**Correction #703**— Correction des flux interrompus par GitHub Copilot en activant la traduction des « réponses » au format « openai » pour tous les modèles personnalisés exploitant « apiFormat : « réponses » ». -**Fix #702**— Remplacement du suivi d'utilisation forfaitaire par des calculs précis de tarification de base de données pour les réponses en streaming et hors streaming. -**Correction #716**— Nettoyage de l'état de traduction des appels d'outils Claude, analysant correctement les arguments de streaming et empêchant les morceaux `tool_calls` d'OpenAI de répéter le champ `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Forcer automatiquement les contraintes de schéma JSON numériques codées en chaîne (par exemple, « minimum » : « 1 » ) aux types appropriés, empêchant ainsi 400 erreurs de Cursor, Cline et d'autres clients envoyant des schémas d'outils mal formés. -**Désinfection des descriptions d'outils**— Assurez-vous que les descriptions d'outils sont toujours des chaînes ; convertit les descriptions « nulles », « non définies » ou numériques en chaînes vides avant de les envoyer aux fournisseurs. -**Bouton Effacer tous les modèles**— Ajout de traductions i18n pour l'action du fournisseur « Effacer tous les modèles » dans les 30 langues. -**Codex Auth Export**— Ajout de boutons d'exportation et d'application locaux du Codex `auth.json` pour une intégration CLI transparente. -**Windsurf BYOK Notes**— Ajout d'avertissements de limitation officiels à la carte à outils Windsurf CLI documentant les contraintes BYOK.### 🐛 Bug Fixes

-**Fix #709**— `system-info.mjs` ne plante plus lorsque le répertoire de sortie n'existe pas (ajout de `mkdirSync` avec un indicateur récursif). -**Correction #710**— Le singleton A2A `TaskManager` utilise désormais `globalThis` pour empêcher les fuites d'état lors des recompilations de routes de l'API Next.js en mode développement. Suite de tests E2E mise à jour pour gérer 401 avec élégance. -**Fix #711**— Ajout de l'application du plafond « max*tokens » spécifique au fournisseur pour les requêtes en amont. -**Correction #605 / #592**— Supprimez le préfixe `proxy*`des noms d'outils dans les réponses Claude sans streaming ; URL de validation LongCat corrigée.
-**Call Logs Max Cap**— Mise à niveau de`getMaxCallLogs()` avec couche de mise en cache, prise en charge des variables d'environnement (`CALL_LOGS_MAX`) et intégration des paramètres de base de données.### 🧪 Tests

- Suite de tests étendue de 964 → 1027 tests (63 nouveaux tests)
- Ajout de `schema-coercion.test.mjs` — 9 tests pour la coercition des champs numériques et la vérification de la description des outils
- Ajout de `t40-opencode-cli-tools-integration.test.mjs` — Tests d'intégration OpenCode/Windsurf CLI
- Branche de tests de fonctionnalités améliorée avec des outils de couverture complets### 📁 New Files

| Fichier                                                  | Objectif                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Utilitaires de vérification de coercition de schéma et de description d'outil |
| `tests/unit/schema-coercion.test.mjs`                    | Tests unitaires pour la coercition de schéma                                  |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Tests d'intégration de l'outil CLI                                            |
| `COVERAGE_PLAN.md`                                       | Document de planification de la couverture des tests                          | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Correction des marqueurs cache_control supprimés en mode passthrough Claude (Claude → OmniRoute → Claude), ce qui obligeait les utilisateurs de Claude Code à épuiser leur quota d'API Anthropic 5 à 10 fois plus rapidement que les connexions directes. OmniRoute préserve désormais les marqueurs cache_control du client lorsque sourceFormat et targetFormat sont tous deux Claude, garantissant ainsi le bon fonctionnement de la mise en cache des invites et réduisant considérablement la consommation de jetons.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Core :**Implémentation de la gestion globale de l'état pour les modèles et combos cachés, les empêchant d'encombrer le catalogue ou de s'infiltrer dans les agents MCP connectés (#681). -**Stabilité :**Crashes de streaming corrigés liés à l'échec de l'intégration du fournisseur natif Antigravity en raison de tableaux d'états non définis non gérés (#684). -**Synchronisation de localisation :**Déploiement d'un synchroniseur `i18n` entièrement révisé détectant les propriétés JSON imbriquées manquantes et adaptant 30 paramètres régionaux de manière séquentielle (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Stabilité du streaming :**Correction de `hasValuableContent` renvoyant `undefined` pour les morceaux vides dans les flux SSE (#676). -**Appel d'outils :**Correction d'un problème dans `sseParser.ts` où les réponses Claude non diffusées avec plusieurs appels d'outils supprimaient l'identifiant des appels d'outils suivants en raison d'une déduplication basée sur un index incorrecte (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Restauration du nom de l'outil natif Claude**— Les noms d'outils tels que « TodoWrite » ne sont plus préfixés par « proxy\_ » dans les réponses passthrough Claude (à la fois en streaming et hors streaming). Comprend une couverture de tests unitaires (PR #663 par @coobabm) -**Effacer le nettoyage des alias de tous les modèles**— Le bouton "Effacer tous les modèles" supprime désormais également les alias de modèles associés, empêchant ainsi les modèles fantômes dans l'interface utilisateur (PR #664 par @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Les comptes à débit limité se récupèrent désormais automatiquement lorsque leur fenêtre de temps de recharge expire, corrigeant une impasse où un « backoffLevel » élevé perdait définitivement la priorité des comptes (PR #657 par @brendandebeasi)### 🌍 i18n

-**Révision de la traduction chinoise**— Réécriture complète de `zh-CN.json` avec une précision améliorée (PR #658 par @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**— `stream: true` explicite dans le corps de la requête a désormais la priorité sur l'en-tête `Accept: application/json`. Les clients qui envoient les deux recevront correctement les réponses en streaming SSE (#656)### 🌍 i18n

-**Améliorations des chaînes tchèques**— Terminologie raffinée dans `cs.json` (PR #655 par @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 clés de traduction manquantes**ajoutées à `en.json` et 12 langues (PR #652 par @zen0bit) -**Documentation tchèque mise à jour**— guides CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Scripts de validation de traduction**— `check_translations.py` et `validate_translation.py` pour CI/QA (PR #651 par @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Critique : Régression d'appel d'outil**— Correction des erreurs `proxy_Bash` en désactivant le préfixe du nom de l'outil `proxy_` dans le chemin de relais Claude. Des outils comme `Bash`, `Read`, `Write` étaient renommés en `proxy_Bash`, `proxy_Read`, etc., ce qui a amené Claude à les rejeter (#618) -**Documentation sur l'interdiction de compte Kiro**— Documenté comme faux positif anti-fraude AWS en amont, et non comme un problème OmniRoute (#649)### 🧪 Tests

-**936 tests, 0 échec**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Métadonnées de capacité de vision** : ajout de `capabilities.vision`, `input_modalities` et `output_modalities` aux entrées `/v1/models` pour les modèles compatibles avec la vision (PR #646) -**Modèles Gemini 3.1** : Ajout de "gemini-3.1-pro-preview" et "gemini-3.1-flash-lite-preview" au fournisseur Antigravity (#645)### 🐛 Bug Fixes

-**Erreur Ollama Cloud 401** : correction d'une URL de base d'API incorrecte – passée de `api.ollama.com` à `ollama.com/v1/chat/completions` officielle (#643) -**Réessai de jeton expiré** : ajout d'une nouvelle tentative limitée avec une interruption exponentielle (5 → 10 → 20 min) pour les connexions OAuth expirées au lieu de les ignorer définitivement (PR # 647)### 🧪 Tests

-**936 tests, 0 échec**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Modèles de problèmes GitHub** : ajout de rapports de bugs standardisés, de demandes de fonctionnalités et de modèles de problèmes de configuration/proxy (#641) -**Effacer tous les modèles** : ajout d'un bouton "Effacer tous les modèles" à la page de détails du fournisseur avec prise en charge d'i18n en 29 langues (#634)### 🐛 Bug Fixes

-**Conflit de paramètres régionaux (`in.json`)** : renommé le fichier de paramètres régionaux hindi de `in.json` (code ISO indonésien) en `hi.json` pour résoudre les conflits de traduction dans Weblate (#642) -**Noms d'outils vides du Codex** : déplacement de la vérification des noms d'outils avant le relais natif du Codex, corrigeant 400 erreurs provenant des fournisseurs en amont lorsque les outils avaient des noms vides (#637) -**Streaming Newline Artifacts** : Ajout de `collapseExcessiveNewlines` au désinfectant de réponse, réduisant les séries de plus de 3 nouvelles lignes consécutives à partir de modèles de réflexion en une double nouvelle ligne standard (#638) -**Claude Reasoning Effort** : conversion du paramètre OpenAI `reasoning_effort` en bloc budgétaire `thinking` natif de Claude sur tous les chemins de requête, y compris l'ajustement automatique `max_tokens` (#627) -**Qwen Token Refresh** : mise en œuvre d'actualisations proactives des jetons OAuth avant expiration (tampon de 5 minutes) pour empêcher les requêtes d'échouer lors de l'utilisation de jetons de courte durée (#631)### 🧪 Tests

-**936 tests, 0 échec**(+10 tests depuis la 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Jetons NaN dans Claude Code / réponses clients (#617) :**

- `sanitizeUsage()` croise désormais `input_tokens`→`prompt_tokens` et `output_tokens`→`completion_tokens` avant le filtre de liste blanche, corrigeant les réponses montrant le nombre de jetons NaN/0 lorsque les fournisseurs renvoient des noms de champs d'utilisation de style Claude### Sécurité

- Mise à jour du package `yaml` pour corriger la vulnérabilité de débordement de pile (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Fermé #613 (Codestral — résolu avec la solution de contournement du fournisseur personnalisé)
- Commenté sur #615 (double point de terminaison OpenCode — solution de contournement fournie, suivie comme demande de fonctionnalité)
- Commenté sur #618 (visibilité des appels d'outils — demande de test v3.0.9)
- Commenté sur #627 (niveau d'effort — déjà pris en charge)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Échecs de traduction pour les fournisseurs au format OpenAI dans Claude CLI (#632) :**

- Gérer le format de tableau `reasoning_details[]` de StepFun/OpenRouter — convertit en `reasoning_content`
- Gérer l'alias du champ `reasoning` de certains fournisseurs → normalisé en `reasoning_content`
- Noms des champs d'utilisation inter-cartes : `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` dans `filterUsageForFormat`
- Correction de `extractUsage` pour accepter à la fois `input_tokens`/`output_tokens` et `prompt_tokens`/`completion_tokens` comme champs d'utilisation valides
- Appliqué aux chemins de streaming (`sanitizeStreamingChunk`, traducteur `openai-to-claude.ts`) et non-streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh :**Correction de l'erreur « client_secret est manquant » pour les utilisateurs installés par npm — le « clientSecretDefault » était vide dans supplierRegistry, ce qui a amené Google à rejeter les demandes d'actualisation de jeton (#588) -**Modèles OpenCode Zen :**Ajout de `modelsUrl` à l'entrée de registre OpenCode Zen pour que "Importer depuis /models" fonctionne correctement (#612) -**Streaming Artefacts :**Correction des sauts de ligne excessifs laissés dans les réponses après la suppression de la signature de la balise de réflexion (#626) -**Proxy Fallback :**Ajout d'une nouvelle tentative automatique sans proxy lorsque le relais SOCKS5 échoue -**Test proxy :**Le point de terminaison du test résout désormais les véritables informations d'identification de la base de données via proxyId### ✨ New Features

-**Sélecteur de compte/clé Playground :**Liste déroulante persistante et toujours visible pour sélectionner des comptes/clés de fournisseur spécifiques à tester — récupère toutes les connexions au démarrage et filtre par fournisseur sélectionné -**Modèles dynamiques des outils CLI :**La sélection de modèles est désormais récupérée dynamiquement à partir de l'API `/v1/models` — des fournisseurs comme Kiro affichent désormais leur catalogue complet de modèles -**Liste des modèles antigravité :**Mise à jour avec Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini ; activé `passthroughModels` pour l'accès au modèle dynamique (#628)### 🔧 Maintenance

- Fusionné PR #625 — Correction de l'arrière-plan du mode clair des limites du fournisseur---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limites/Proxy :**Correction de la limite Codex de récupération pour les comptes derrière les proxys SOCKS5 — l'actualisation du jeton s'exécute désormais dans le contexte du proxy -**CI :**Correction de l'échec de l'assertion du test d'intégration `v1/models` dans les environnements CI sans connexions de fournisseur -**Paramètres :**Le bouton de test du proxy affiche désormais immédiatement les résultats de réussite/échec (auparavant masqué derrière les données de santé)### ✨ New Features

-**Playground :**Ajout de la liste déroulante de sélection de compte : testez des connexions spécifiques individuellement lorsqu'un fournisseur possède plusieurs comptes### 🔧 Maintenance

- Fusionné PR #623 — Correction du chemin d'URL de base de l'API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limites de l'interface utilisateur :**Ajout d'une fonctionnalité de regroupement de balises au tableau de bord des connexions pour améliorer l'organisation visuelle des comptes avec des balises personnalisées.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming :**Correction de la corruption de l'état de `TextDecoder` dans le combo `sanitize` TransformStream qui provoquait une sortie SSE tronquée correspondant à des caractères multi-octets (PR #614) -**Interface utilisateur des fournisseurs :**Restituez en toute sécurité les balises HTML dans les info-bulles d'erreur de connexion du fournisseur à l'aide de `dangerouslySetInnerHTML` -**Paramètres du proxy :**Ajout des propriétés manquantes du corps de charge « nom d'utilisateur » et « mot de passe » permettant la vérification réussie des proxys authentifiés à partir du tableau de bord. -**API du fournisseur :**L'exception logicielle liée revient à `getCodexUsage` empêchant les échecs de l'API HTTP 500 en cas d'échec de la récupération du jeton---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modèles de synchronisation automatique :**Ajout d'une bascule d'interface utilisateur et d'un point de terminaison « sync-models » pour synchroniser automatiquement les listes de modèles par fournisseur à l'aide d'un planificateur d'intervalles planifiés (PR #597)### 🐛 Bug Fixes

-**Délai d'attente :**Augmentation des proxys par défaut `FETCH_TIMEOUT_MS` et `STREAM_IDLE_TIMEOUT_MS` à 10 minutes pour prendre correctement en charge les modèles de raisonnement approfondi (comme o1) sans abandonner les requêtes (correctifs n° 609) -**Détection de l'outil CLI :**Détection multiplateforme améliorée gérant les chemins NVM, Windows `PATHEXT` (évitant le problème des wrappers `.cmd`) et les préfixes NPM personnalisés (PR #598) -**Journaux de streaming :**Implémentation de l'accumulation delta `tool_calls` dans les journaux de réponses en streaming afin que les appels de fonction soient suivis et conservés avec précision dans la base de données (PR #603) -**Catalogue de modèles :**Suppression de l'exemption d'authentification, masquant correctement les modèles `comfyui` et `sdwebui` lorsqu'aucun fournisseur n'est explicitement configuré (PR #599)### 🌐 Translations

-**cs :**Chaînes de traduction tchèque améliorées dans l'application (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Ajout d'un champ Tag/Group à `EditConnectionModal` (stocké dans `providerSpecificData.tag`) sans nécessiter de migrations de schéma de base de données.
- Les connexions dans la vue du fournisseur sont désormais regroupées dynamiquement par balise avec des séparateurs visuels.
- Les connexions non balisées apparaissent en premier sans en-tête, suivies par les groupes balisés par ordre alphabétique.
- Le regroupement de balises s'applique automatiquement à la section Codex/Copilot/Antigravity Limits puisque des bascules existent à l'intérieur des lignes de connexion.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Badges manquants sur les cartes de connexion :**Corrigé en utilisant `resolveProxyForConnection()` plutôt qu'un mappage statique. -**Test de connexion désactivé en mode enregistré :**Activation du bouton Test en résolvant la configuration du proxy à partir de la liste enregistrée. -**Congélation modale de configuration :**Ajout des appels `onClose()` après la sauvegarde/effacement pour empêcher l'interface utilisateur de se figer. -**Comptage des doubles utilisations :**`ProxyRegistryManager` charge désormais l'utilisation avec impatience lors du montage avec déduplication par `scope` + `scopeId`. Les décomptes d'utilisation ont été remplacés par un bouton Test affichant l'IP/latence en ligne.#### fix(translator): `function_call` prefix stripping

- Réparation d'un correctif incomplet du PR #607 où seuls les blocs `tool_use` supprimaient le préfixe de l'outil `proxy_` de Claude. Désormais, les clients utilisant le format API OpenAI Responses recevront également correctement les outils sans le préfixe « proxy_ ».---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Trois régressions critiques signalées par les utilisateurs après le lancement de la v3.0.0 ont été résolues.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Le préfixe `proxy_` ajouté par Claude OAuth n'a été supprimé que des réponses**streaming**. En mode**sans streaming**, `translateNonStreamingResponse` n'avait pas accès au `toolNameMap`, ce qui faisait que les clients recevaient des noms d'outils mutilés comme `proxy_read_file` au lieu de `read_file`.

**Correction :**Ajout du paramètre facultatif `toolNameMap` à `translateNonStreamingResponse` et application de la suppression des préfixes dans le gestionnaire de bloc Claude `tool_use`. `chatCore.ts` transmet désormais la carte.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI n'expose pas `GET /v1/models`. Le validateur générique `validateOpenAICompatibleProvider` est passé à un repli des achèvements de discussion uniquement si `validationModelId` était défini, ce que LongCat ne configure pas. Cela a provoqué l'échec de la validation du fournisseur avec une erreur trompeuse lors de l'ajout/de l'enregistrement.

**Correction :**Ajout de « longcat » à la carte des validateurs spécialisés, sondant directement « /chat/completions » et traitant toute réponse non authentifiée comme une réussite.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Les outils MCP (par exemple `pencil`, `computer_use`) transmettent les définitions d'outils avec `{type:"object"}` mais sans champ `properties`. L'API d'Anthropic les rejette avec : « propriétés manquantes du schéma d'objet ».

**Correction :**Dans `openai-to-claude.ts`, injectez `properties: {}` comme valeur par défaut sûre lorsque `type` est `"object"` et `properties` est absent.---

### 🔀 Community PRs Merged (2)

| RP       | Auteur  | Résumé                                                                                                                 |
| -------- | ------- | ---------------------------------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n) : correction de la traduction russe pour Playground et Testbed                                              |
| **#591** | @rdself | correctif (ui) : améliore le contraste du mode d'éclairage des limites du fournisseur et l'affichage du niveau du plan | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 tests, 0 échec**(inchangé par rapport à la v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **La plus grande version jamais réalisée.**De 36 fournisseurs dans la version 2.9.5 à**67+ fournisseurs**dans la version 3.0.0 — avec serveur MCP, protocole A2A, moteur de combinaison automatique, icônes de fournisseur, API de clés enregistrées, 926 tests et contributions de**12 membres de la communauté**sur**10 PR fusionnés**.
>
> Consolidé de la v3.0.0-rc.1 à la rc.17 (17 versions candidates sur 3 jours de développement intense).---

### 🆕 New Providers (+31 since v2.9.5)

| Fournisseur                        | Alias                  | Niveau       | Remarques                                                                                                |
| ---------------------------------- | ---------------------- | ------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**                   | `opencode-zen`         | Gratuit      | 3 modèles via `opencode.ai/zen/v1` (PR #530 par @kang-heewon)                                            |
| **OpenCode Go**                    | `opencode-go`          | Payé         | 4 modèles via `opencode.ai/zen/go/v1` (PR #530 par @kang-heewon)                                         |
| **IA LongCat**                     | `lc`                   | Gratuit      | 50 millions de jetons/jour (Flash-Lite) + 500 000/jour (Chat/Réflexion) pendant la version bêta publique |
| **Pollinisations IA**              | `pol`                  | Gratuit      | Aucune clé API nécessaire – GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)                      |
| **IA des travailleurs Cloudflare** | `cf`                   | Gratuit      | 10 000 neurones/jour – ~ 150 réponses LLM ou 500 s de murmure audio, inférence de bord                   |
| **IA évolutive**                   | `scw`                  | Gratuit      | 1 million de jetons gratuits pour les nouveaux comptes — Conforme UE/RGPD (Paris)                        |
| **API IA/ML**                      | `aiml`                 | Gratuit      | Crédits gratuits de 0,025 $/jour — plus de 200 modèles via un seul point de terminaison                  |
| **IA informatique**                | `pu`                   | Gratuit      | Plus de 500 modèles (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                            |
| **Alibaba Nuage (DashScope)**      | `Ali`                  | Payé         | Points de terminaison internationaux + Chine via `alicode`/`alicode-intl`                                |
| **Plan de codage Alibaba**         | `bcp`                  | Payé         | Alibaba Model Studio avec API compatible Anthropic                                                       |
| **Kimi Coding (API Key)**          | `kmca`                 | Payé         | Accès Kimi dédié basé sur une clé API (distincte d'OAuth)                                                |
| **Codage MiniMax**                 | `minimax`              | Payé         | Point final international                                                                                |
| **MiniMax (Chine)**                | `minimax-cn`           | Payé         | Point final spécifique à la Chine                                                                        |
| **Z.AI (GLM-5)**                   | `zaï`                  | Payé         | Modèles GLM de nouvelle génération Zhipu AI                                                              |
| **Sommet AI**                      | `sommet`               | Payé         | Google Cloud — Compte de service JSON ou OAuth access_token                                              |
| **Ollama Nuage**                   | `ollamacloud`          | Payé         | Service API hébergé d'Ollama                                                                             |
| **Synthétique**                    | `synthétique`          | Payé         | Passerelle des modèles Passthrough                                                                       |
| **Passerelle Kilo**                | `kg`                   | Payé         | Passerelle des modèles Passthrough                                                                       |
| **Recherche de perplexité**        | `pplx-recherche`       | Payé         | Point de terminaison dédié basé sur la recherche                                                         |
| **Recherche de serveur**           | `serper-recherche`     | Payé         | Intégration de l'API de recherche Web                                                                    |
| **Recherche courageuse**           | `recherche courageuse` | Payé         | Intégration de l'API Brave Search                                                                        |
| **Recherche Exa**                  | `exa-recherche`        | Payé         | Intégration de l'API de recherche neuronale                                                              |
| **Recherche Tavily**               | `tavily-search`        | Payé         | Intégration de l'API de recherche IA                                                                     |
| **NanoBanane**                     | `nb`                   | Payé         | API de génération d'images                                                                               |
| **OnzeLabs**                       | `el`                   | Payé         | Synthèse vocale de synthèse vocale                                                                       |
| **Cartesia**                       | `Cartésie`             | Payé         | Synthèse vocale TTS ultra-rapide                                                                         |
| **JouerHT**                        | `playht`               | Payé         | Clonage vocal et TTS                                                                                     |
| **Dans le monde**                  | `dans le monde`        | Payé         | Chat vocal de personnages IA                                                                             |
| **Interface Web SD**               | `sdwebui`              | Auto-hébergé | Génération d'images locales à diffusion stable                                                           |
| **ComfyUI**                        | `confortable`          | Auto-hébergé | Génération basée sur un nœud de flux de travail local ComfyUI                                            |
| **Codage GLM**                     | `glm`                  | Payé         | Point de terminaison spécifique au codage BigModel/Zhipu                                                 | **Total : plus de 67 fournisseurs**(4 gratuits, 8 OAuth, 55 clés API) + fournisseurs personnalisés illimités compatibles OpenAI/Anthropic.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Générez et émettez automatiquement des clés API OmniRoute par programmation avec application des quotas par fournisseur et par compte.

| Point de terminaison            | Method       | Descriptif                                                      |
| ------------------------------- | ------------ | --------------------------------------------------------------- |
| `/api/v1/clés-enregistrées`     | `POST`       | Émettez une nouvelle clé — clé brute renvoyée**une seule fois** |
| `/api/v1/clés-enregistrées`     | `GET`        | Liste des clés enregistrées (masquées)                          |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Obtenir les métadonnées / Révoquer                              |
| `/api/v1/quotas/check`          | `GET`        | Pré-valider le quota avant de l'émettre                         |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Configurer les limites d'émission par fournisseur               |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Configurer les limites d'émission par compte                    |
| `/api/v1/issues/rapport`        | `POST`       | Signaler les événements de quota aux problèmes GitHub           |

**Sécurité :**Clés stockées sous forme de hachages SHA-256. Clé brute affichée une fois lors de la création, jamais récupérable.#### 🎨 Provider Icons via @lobehub/icons (#529)

Plus de 130 logos de fournisseurs utilisant les composants React `@lobehub/icons` (SVG). Chaîne de secours :**Lobehub SVG → PNG existant → icône générique**. Appliqué sur les pages Tableau de bord, Fournisseurs et Agents avec le composant « ProviderIcon » standardisé.#### 🔄 Model Auto-Sync Scheduler (#488)

Actualise automatiquement les listes de modèles pour les fournisseurs connectés toutes les**24 heures**. Runs on server startup. Configurable via `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Mappez les modèles de nom de modèle (glob) à des combinaisons spécifiques pour le routage automatique :

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nouvelle table `model_combo_mappings` avec correspondance glob-to-regex
- Section de l'interface utilisateur du tableau de bord : "Règles de routage du modèle" avec ajout/modification/basculement/suppression en ligne#### 🧭 API Endpoints Dashboard

Catalogue interactif, gestion des webhooks, visionneuse OpenAPI — le tout dans une seule page à onglets dans `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nouvelles intégrations de fournisseurs de recherche :**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— permettant des réponses d'IA fondées avec des données Web en temps réel.#### 📊 Search Analytics

Nouvel onglet dans `/dashboard/analytics` — répartition des fournisseurs, taux de réussite du cache, suivi des coûts. API : `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Colonnes `max_requests_per_day` et `max_requests_per_minute` avec application de fenêtre coulissante en mémoire renvoyant HTTP 429.#### 🎵 Media Playground

Terrain de jeu complet de génération de médias sur `/dashboard/media` : génération d'images, vidéo, musique, transcription audio (limite de téléchargement de 2 Go) et synthèse vocale.---

### 🔒 Security & CI/CD

-**Correction CodeQL**— Correction de plus de 10 alertes : 6 rétablissements polynomiaux, 1 caractère aléatoire non sécurisé (`Math.random()` → `crypto.randomUUID()`), 1 injection de commande shell -**Validation de route**— Schémas Zod + `validateBody()` sur**176/176 routes API**— CI appliqué -**Correction CVE**— vulnérabilité XSS dompurify (GHSA-v2wj-7wpq-c8vv) résolue via des remplacements npm -**Aplati**— Bumped 3.3.3 → 3.4.2 (pollution prototype CWE-1321) -**Docker**— Mise à niveau de `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth : suppression d'une erreur exploitable lorsque `GEMINI_OAUTH_CLIENT_SECRET` est manquant dans Docker -**#549**— Les routes des paramètres CLI résolvent désormais la vraie clé API à partir de `keyId` (et non les chaînes masquées) -**#574**— La connexion ne se bloque plus après avoir ignoré la configuration du mot de passe de l'assistant -**#506**— Réécriture de `machineId` multiplateforme (Windows REG.exe → macOS ioreg → Linux → secours du nom d'hôte)#### Providers & Routing

-**#536**— LongCat AI : correction de `baseUrl` et `authHeader` -**#535**— Remplacement du modèle épinglé : `body.model` correctement défini sur `pinnedModel` -**#570**— Les modèles Claude sans préfixe sont désormais résolus en fournisseur Anthropic. -**#585**— Les balises internes `<omniModel>` ne fuient plus vers les clients dans le streaming SSE -**#493**— La dénomination du modèle de fournisseur personnalisé n'est plus altérée par la suppression du préfixe -**#490**— Streaming + protection du cache contextuel via l'injection `TransformStream` -**#511**— Balise `<omniModel>` injectée dans le premier morceau de contenu (pas après `[DONE]`)#### CLI & Tools

-**#527**— Boucle Claude Code + Codex : les blocs `tool_result` sont désormais convertis en texte -**#524**— Configuration OpenCode enregistrée correctement (XDG_CONFIG_HOME, format TOML) -**#522**— API Manager : suppression du bouton trompeur "Copier la clé masquée" -**#546**— `--version` renvoyant `inconnu` sous Windows (PR par @k0valik) -**#544**— Détection sécurisée de l'outil CLI via des chemins d'installation connus (PR par @k0valik) -**#510**— Les chemins Windows MSYS2/Git-Bash sont automatiquement normalisés -**#492**— La CLI détecte le nœud géré par `mise`/`nvm` lorsque `app/server.js` est manquant#### Streaming & SSE

-**PR #587**— Annuler l'importation `resolveDataDir` dans la compatibilité des réponsesTransformer pour Cloudflare Workers (@k0valik) -**PR #495**— Goulot d'étranglement 429 attente infinie : abandon des tâches en attente sur la limite de débit (@xandr0s) -**#483**— Arrêtez de suivre `data: null` après le signal `[DONE]` -**#473**— Flux Zombie SSE : délai d'attente réduit de 300 s → 120 s pour un repli plus rapide#### Media & Transcription

-**Transcription**— Deepgram `video/mp4` → `audio/mp4` Mappage MIME, détection automatique de la langue, ponctuation -**TTS**— Affichage de l'erreur `[object Object]` corrigé pour les erreurs imbriquées de style ElevenLabs -**Limites de téléchargement**— La transcription multimédia a été augmentée à 2 Go (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— Colonne `requested_model` dans les journaux d'appels (migration 009) -**T02**— Supprime les blocs de texte vides de `tool_result.content` imbriqué -**T03**— Analyser les en-têtes de quota `x-codex-5h-*` / `x-codex-7d-*` -**T04**— En-tête `X-Session-Id` pour le routage collant externe -**T05**— Persistance de la base de données à débit limité avec API dédiée -**T06**— Compte désactivé → blocage permanent (temps de recharge d'un an) -**T07**— Validation IP X-Forwarded-For (`extractClientIp()`) -**T08**— Limites de session par clé API avec application de fenêtre glissante -**T09**— Portées de limite de débit Codex vs Spark (pools séparés) -**T10**— Crédits épuisés → temps de recharge distinct de 1 h -**T11**— effort de raisonnement « max » → 131 072 jetons budgétaires -**T12**— Entrées de prix MiniMax M2.7 -**T13**— Correction de l'affichage des quotas obsolètes (réinitialisation de la détection des fenêtres) -**T14**— Vérification TCP à échec rapide du proxy (≤ 2 s, mise en cache 30 s) -**T15**— Normalisation du contenu du tableau pour Anthropic -**T23** – Repli intelligent de réinitialisation des quotas (extraction d'en-tête) -**T24**— Temps de recharge `503` + mappage `406` -**T25**— Solution de secours pour la validation du fournisseur -**T29** – Authentification JWT du compte de service Vertex AI -**T33**— Conversion du niveau de réflexion en budget -**T36**— Classification des erreurs « 403 » vs « 429 » -**T38**— Spécifications de modèle centralisées (`modelSpecs.ts`) -**T39**— Point de terminaison de secours pour `fetchAvailableModels` -**T41**— Redirection automatique des tâches en arrière-plan vers les modèles Flash -**T42**— Mappage du format d'image pour la génération d'images#### Other Improvements

-**En-têtes personnalisés en amont par modèle**— via l'interface utilisateur de configuration (PR #575 par @zhangqiang8vip) -**Longueur du contexte du modèle**— configurable dans les métadonnées du modèle (PR #578 par @hijak) -**Suppression du préfixe de modèle**— option pour supprimer le préfixe du fournisseur des noms de modèles (PR #582 par @jay77721) -**Dépréciation de Gemini CLI**— marqué comme obsolète avec un avertissement de restriction Google OAuth -**analyseur YAML**— remplacement de l'analyseur personnalisé par `js-yaml` pour une analyse correcte des spécifications OpenAPI -**ZWS v5**— Correction de fuite HMR (connexions 485 DB → 1, mémoire 2,4 Go → 195 Mo) -**Exportation de journaux**— Nouveau bouton d'exportation JSON sur le tableau de bord avec liste déroulante de plage de temps -**Bannière de notification de mise à jour** : la page d'accueil du tableau de bord indique lorsque de nouvelles versions sont disponibles---

### 🌐 i18n & Documentation

-**30 langues**à 100 % de parité — 2 788 clés manquantes synchronisées -**Tchèque**— Traduction complète : 22 documents, 2 606 chaînes d'interface utilisateur (RP par @zen0bit) -**Chinois (zh-CN)**— Retraduction complète (RP par @only4copilot) -**Guide de déploiement de VM**— Traduit en anglais comme document source -**Référence API**— Ajout des points de terminaison `/v1/embeddings` et `/v1/audio/speech` -**Nombre de fournisseurs** – Mise à jour de 36+/40+/44+ à**67+**dans le README et les 30 README i18n---

### 🔀 Community PRs Merged (10)

| RP       | Author          | Résumé                                                                                    |
| -------- | --------------- | ----------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse) : annuler l'importation de solveDataDir pour la compatibilité Cloudflare Workers |
| **#582** | @jay77721       | feat(proxy) : option de suppression du préfixe du nom du modèle                           |
| **#581** | @jay77721       | fix(npm) : lier la libération d'électrons au flux de travail npm-publish                  |
| **#578** | @hijak          | exploit : longueur de contexte configurable dans les métadonnées du modèle                |
| **#575** | @zhangqiang8vip | exploit : en-têtes en amont par modèle, PATCH compatible, alignement du chat              |
| **#562** | @coobabm        | correctif : gestion de session MCP, passage Claude, detectFormat                          |
| **#561** | @zen0bit        | fix(i18n) : corrections de la traduction tchèque                                          |
| **#555** | @k0valik        | fix(sse) : `resolveDataDir()` centralisé pour la résolution de chemin                     |
| **#546** | @k0valik        | fix(cli) : `--version` renvoyant `inconnu` sous Windows                                   |
| **#544** | @k0valik        | fix(cli) : détection sécurisée de l'outil CLI via les chemins d'installation              |
| **#542** | @rdself         | fix(ui): variables de thème CSS de contraste en mode clair                                |
| **#530** | @kang-heewon    | exploit : fournisseurs OpenCode Zen + Go avec `OpencodeExecutor`                          |
| **#512** | @zhangqiang8vip | exploit : compatibilité des modèles par protocole (`compatByProtocol`)                    |
| **#497** | @zhangqiang8vip | correctif : fuites de ressources HMR en mode développement (ZWS v5)                       |
| **#495** | @xandr0s        | correctif : Goulot d'étranglement 429 attente infinie (abandon des tâches en attente)     |
| **#494** | @zhangqiang8vip | exploit : développeur MiniMax → correctif du rôle système                                 |
| **#480** | @prakersh       | correctif : extraction de l'utilisation du flux de flux                                   |
| **#479** | @prakersh       | exploit : Codex 5.3/5.4 et entrées de tarification Anthropic                              |
| **#475** | @only4copilot   | feat(i18n): traduction en chinois amélioré                                                |

**Merci à tous les contributeurs !**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 tests, 0 échec**(contre 821 dans la v2.9.5)

- +105 nouveaux tests couvrant : les mappages de combinaisons de modèles, les clés enregistrées, OpencodeExecutor, le fournisseur Bailian, la validation d'itinéraire, la classification des erreurs, le mappage des proportions, et plus encore---

### 📦 Database Migrations

| Migration | Descriptif                                                              |
| --------- | ----------------------------------------------------------------------- | --- |
| **008**   | Tableaux `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**   | Colonne `requested_model` dans `call_logs`                              |
| **010**   | Table `model_combo_mappings` pour le routage combo par modèle           | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Modifications récentes :**Aucune. Toutes les configurations, combos et clés API existantes sont conservées.
> Les migrations de bases de données 008-010 s'exécutent automatiquement au démarrage.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Remédiation CodeQL**— Correction de plus de 10 alertes :

- 6 redos polynomiaux dans `provider.ts` / `chatCore.ts` (remplacé les modèles d'alternance `(?:^|/)` par une correspondance basée sur les segments)
- 1 caractère aléatoire non sécurisé dans `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 injection de commande shell dans `prepublish.mjs` (chemin `JSON.stringify()` s'échappant) -**Validation de route**— Ajout des schémas Zod + `validateBody()` à 5 routes manquant de validation :
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` réussit désormais :**176/176 routes validées**### 🐛 Bug Fixes

-**#585**— Les balises internes `<omniModel>` ne sont plus divulguées aux clients dans les réponses SSE. Ajout de la désinfection sortante `TransformStream` dans `combo.ts`### ⚙️ Infrastructure

-**Docker**— Mise à niveau de `docker/setup-buildx-action` de v3 → v4 (correctif de dépréciation de Node.js 20) -**Nettoyage CI**— Suppression de plus de 150 exécutions de flux de travail ayant échoué/annulées### 🧪 Tests

- Suite de tests :**926 tests, 0 échec**(+3 nouveaux)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Augmentation des limites de transcription des médias
- Ajout de la longueur du contexte du modèle aux métadonnées du registre
- Ajout d'en-têtes personnalisés en amont par modèle via l'interface utilisateur de configuration
- Correction de plusieurs bugs, validation Zod pour les correctifs et résolution de divers problèmes de communauté.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Routage combo par modèle : mappez les modèles de nom de modèle (glob) à des combos spécifiques pour un routage automatique

- Nouvelle table `model_combo_mappings` (migration 010) avec motif, combo_id, priorité, activé
- Fonction de base de données `resolveComboForModel()` avec correspondance glob-to-regex (insensible à la casse, caractères génériques `*` et `?`)
- `getComboForModel()` dans `model.ts` : augmente `getCombo()` avec le modèle de repli du modèle
- `chat.ts` : la décision de routage vérifie désormais les mappages de modèles combinés avant la gestion d'un modèle unique
- API : `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Tableau de bord : section « Règles de routage des modèles » ajoutée à la page Combos avec ajout/modification/basculement/suppression en ligne
- Exemples : `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Full i18n Sync** : 2 788 clés manquantes ajoutées dans 30 fichiers de langue — toutes les langues sont désormais à 100 % de parité avec `en.json` -**Page Agents i18n**: section Intégration OpenCode entièrement internationalisée (titre, description, scan, étiquettes de téléchargement) -**6 nouvelles clés**ajoutées à l'espace de noms `agents` pour la section OpenCode### 🎨 UI/UX

-**Icônes de fournisseur** : 16 icônes de fournisseur manquantes ajoutées (3 copiées, 2 téléchargées, 11 SVG créées) -**SVG de repli** : composant `ProviderIcon` mis à jour avec une stratégie à 4 niveaux : Lobehub → PNG → SVG → Icône générique -**Empreintes digitales des agents** : synchronisé avec les outils CLI – ajout d'un droïde, d'un openclaw, d'un copilote et d'un code ouvert à la liste d'empreintes digitales (14 au total)### Sécurité

-**Correction CVE** : résolution de la vulnérabilité XSS de dompurify (GHSA-v2wj-7wpq-c8vv) via des remplacements npm forçant `dompurify@^3.3.2`

- `npm audit` signale désormais**0 vulnérabilité**### 🧪 Tests

- Suite de tests :**923 tests, 0 échec**(+15 nouveaux tests de mappage de modèles combinés)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| RP       | Author   | Résumé                                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm | fix(ux) : gestion de session MCP, normalisation du relais Claude, modal OAuth, detectFormat                  |
| **#561** | @zen0bit | fix(i18n) : corrections de traduction en tchèque — noms de méthodes HTTP et mises à jour de la documentation | ### 🧪 Tests |

- Suite de tests :**908 tests, 0 échec**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config :**résout la vraie clé API à partir de `keyId` dans les routes des paramètres CLI (`codex-settings`, `droid-settings`, `kilo-settings`) pour empêcher l'écriture de chaînes masquées (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| RP       | Author   | Résumé                                                                                                                                                                                                                        |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli) : `--version` renvoyant `unknown` sous Windows — utilisez `JSON.parse(readFileSync)` au lieu de l'importation ESM                                                                                                    |
| **#555** | @k0valik | fix(sse) : `resolveDataDir()` centralisé pour la résolution de chemin dans les informations d'identification, autoCombo, enregistreur de réponses et enregistreur de requêtes                                                 |
| **#544** | @k0valik | fix(cli) : détection sécurisée de l'outil CLI via des chemins d'installation connus (8 outils) avec validation de lien symbolique, vérifications de type de fichier, limites de taille, env minimal dans le contrôle de santé |
| **#542** | @rdself  | fix(ui) : améliore le contraste du mode clair — ajoutez les variables de thème CSS manquantes (`bg-primary`, `bg-subtle`, `text-primary`) et corrigez les couleurs sombres uniquement dans les détails du journal             | ### 🔧 Bug Fixes |

-**Correction TDZ dans `cliRuntime.ts`**— `validateEnvPath` a été utilisé avant l'initialisation au démarrage du module par `getExpectedParentPaths()`. Déclarations réorganisées pour corriger `ReferenceError`. -**Corrections de build**— Ajout de `pino` et `pino-pretty` à `serverExternalPackages` pour empêcher Turbopack d'interrompre le chargement du travailleur interne de Pino.### 🧪 Tests

- Suite de tests :**905 tests, 0 échec**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Régression de la construction d'Electron : rétrogradation de Next.js de `16.1.x` à `16.0.10` pour éliminer l'instabilité du hachage du module Turbopack qui provoquait des écrans vides dans le bundle de bureau Electron. -**Corrections de tests unitaires**— Correction de deux assertions de test obsolètes (rapport d'aspect/résolution `nanobanana-image-handler`, mappage de champ `thinking-budget` Gemini `thinkingConfig`) qui avaient dérivé après les récents changements d'implémentation. -**#541**— Réponse aux commentaires des utilisateurs sur la complexité de l'installation ; aucune modification de code n’est requise.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor : implémenté à l'aide de la bibliothèque `jose` pour gérer l'authentification JWT/compte de service, ainsi que des régions configurables dans l'interface utilisateur et la création automatique d'URL de modèle de partenaire. -**T42**— Mappage des proportions de génération d'images : création de la logique `sizeMapper` pour les formats OpenAI génériques (`size`), ajout de la gestion native `imagen3` et mise à jour des points de terminaison NanoBanana pour utiliser automatiquement les proportions mappées. -**T38**— Spécifications de modèle centralisées : `modelSpecs.ts` créé pour les limites et les paramètres par modèle.### 🔧 Improvements

-**T40**— Intégration des outils OpenCode CLI : intégration native `opencode-zen` et `opencode-go` terminée dans le PR précédent.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— Correction du temps de recharge `503` + mappage `406` : mappé `406 non acceptable` à `503 Service non disponible` avec des intervalles de refroidissement appropriés. -**T25**— Repli de validation du fournisseur : repli gracieux vers les modèles de validation standard lorsqu'un `validationModelId` spécifique n'est pas présent. -**T36**— Affinement de la gestion des fournisseurs `403` et `429` : extrait dans `errorClassifier.ts` pour séparer correctement les échecs d'autorisations matérielles (`403`) des limites de débit (`429`). -**T39**— Endpoint Fallback pour `fetchAvailableModels` : implémentation d'un mécanisme à trois niveaux (`/models` -> `/v1/models` -> catalogue générique local) + `list_models_catalog` mises à jour de l'outil MCP pour refléter `source` et `warning`. -**T33**— Conversion du niveau de réflexion en budget : traduit les niveaux de réflexion qualitatifs en allocations budgétaires précises. -**T41**— Redirection automatique des tâches en arrière-plan : achemine automatiquement les tâches d'évaluation en arrière-plan lourdes vers des modèles flash/efficaces. -**T23**— Solution de secours intelligente pour la réinitialisation des quotas : extrait avec précision les valeurs d'en-tête `x-ratelimit-reset` / `retry-after` ou mappe les temps de recharge statiques.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Mise à niveau à partir de la v2.9.5 :**16 problèmes résolus · 2 PR communautaires fusionnés · 2 nouveaux fournisseurs · 7 nouveaux points de terminaison d'API · 3 nouvelles fonctionnalités · Migration de base de données 008+009 · 832 tests réussis · 15 améliorations de l'écart sub2api (T01-T15 terminé).### 🆕 New Providers

| Fournisseur      | Alias          | Niveau  | Remarques                                                        |
| ---------------- | -------------- | ------- | ---------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Gratuit | 3 modèles via `opencode.ai/zen/v1` (PR #530 par @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Paid    | 4 modèles via `opencode.ai/zen/go/v1` (PR #530 par @kang-heewon) |

Les deux fournisseurs utilisent le nouveau `OpencodeExecutor` avec un routage multiformat (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Générez et émettez automatiquement des clés API OmniRoute par programmation avec application des quotas par fournisseur et par compte.

| Point de terminaison                  | Méthode   | Descriptif                                                      |
| ------------------------------------- | --------- | --------------------------------------------------------------- |
| `/api/v1/clés-enregistrées`           | `POST`    | Émettez une nouvelle clé — clé brute renvoyée**une seule fois** |
| `/api/v1/clés-enregistrées`           | `GET`     | Liste des clés enregistrées (masquées)                          |
| `/api/v1/registered-keys/{id}`        | `GET`     | Obtenir les métadonnées clés                                    |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | Révoquer une clé                                                |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Révoquer (pour les clients sans prise en charge DELETE)         |
| `/api/v1/quotas/check`                | `GET`     | Pré-valider le quota avant de l'émettre                         |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Configurer les limites d'émission par fournisseur               |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Configurer les limites d'émission par compte                    |
| `/api/v1/issues/report`               | `POST`    | Signaler les événements de quota aux problèmes GitHub           |

**DB — Migration 008 :**Trois nouvelles tables : `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Sécurité :**Clés stockées sous forme de hachages SHA-256. Clé brute affichée une fois lors de la création, jamais récupérable.
**Types de quota :**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` par fournisseur et par compte.
**Idempotency :**Le champ `idempotency_key` empêche les émissions en double. Renvoie `409 IDEMPOTENCY_CONFLICT` si la clé a déjà été utilisée.
**Budget par clé :**`dailyBudget` / `hourlyBudget` — limite le nombre de requêtes qu'une clé peut acheminer par fenêtre.
**Rapports GitHub :**Facultatif. Définissez `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` pour créer automatiquement des problèmes GitHub en cas de dépassement de quota ou d'échecs d'émission.#### 🎨 Provider Icons — @lobehub/icons (#529)

Toutes les icônes de fournisseur du tableau de bord utilisent désormais les composants React `@lobehub/icons` (plus de 130 fournisseurs avec SVG).
Chaîne de secours :**Lobehub SVG → existant `/providers/{id}.png` → icône générique**. Utilise un modèle React `ErrorBoundary` approprié.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute actualise désormais automatiquement les listes de modèles pour les fournisseurs connectés toutes les**24 heures**.

- S'exécute au démarrage du serveur via le hook `/api/sync/initialize` existant
- Configurable via la variable d'environnement `MODEL_SYNC_INTERVAL_HOURS`
- Couvre 16 fournisseurs majeurs
- Enregistre l'heure de la dernière synchronisation dans la base de données des paramètres---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth :**Efface l'erreur exploitable lorsque `GEMINI_OAUTH_CLIENT_SECRET` est manquant dans les déploiements Docker/auto-hébergés. A précédemment montré le message énigmatique « client_secret est manquant » de Google. Fournit désormais des instructions spécifiques `docker-compose.yml` et `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI :**Correction de `baseUrl` (`api.longcat.chat/openai`) et `authHeader` (`Authorization: Bearer`). -**#535 — Remplacement du modèle épinglé :**`body.model` est désormais correctement défini sur `pinnedModel` lorsque la protection du cache contextuel est active. -**#532 — Validation de la clé OpenCode Go :**Utilise désormais le point de terminaison de test `zen/v1` (`testKeyBaseUrl`) — la même clé fonctionne pour les deux niveaux.#### CLI & Tools

-**#527 — Boucle Claude Code + Codex :**Les blocs `tool_result` sont désormais convertis en texte au lieu d'être supprimés, arrêtant les boucles infinies de résultats d'outils. -**#524 — Sauvegarde de la configuration OpenCode :**Ajout du gestionnaire `saveOpenCodeConfig()` (compatible XDG_CONFIG_HOME, écrit TOML). -**#521 — Connexion bloquée :**La connexion ne se bloque plus après avoir ignoré la configuration du mot de passe — redirige correctement vers l'intégration. -**#522 — Gestionnaire d'API :**Suppression du bouton trompeur "Copier la clé masquée" (remplacé par une info-bulle d'icône de verrouillage). -**#532 — Configuration OpenCode Go :**Le gestionnaire de paramètres du guide gère désormais l'ID d'outil `opencode`.#### Developer Experience

-**#489 — Antigravité :**L'absence de `googleProjectId` renvoie une erreur 422 structurée avec des conseils de reconnexion au lieu d'un crash cryptique. -**#510 — Chemins Windows :**Les chemins MSYS2/Git-Bash (`/c/Program Files/...`) sont désormais automatiquement normalisés en `C:\Program Files\...`. -**#492 — Démarrage de la CLI :**La CLI `omniroute` détecte désormais le nœud géré par `mise`/`nvm` lorsque `app/server.js` est manquant et affiche des instructions de correctif ciblées.---

### 📖 Documentation Updates

-**#513**— Réinitialisation du mot de passe Docker : solution de contournement de la variable d'environnement `INITIAL_PASSWORD` documentée -**#520**— pnpm : étape `pnpmapprove-builds better-sqlite3` documentée---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| RP       | Author       | Résumé                                                                    |
| -------- | ------------ | ------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Fournisseurs OpenCode Zen + Go avec `OpencodeExecutor` et tests améliorés | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistance de la base de données à limite de débit : `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` dans `providers.ts`. La colonne `rate_limited_until` existante est désormais exposée en tant qu'API dédiée — l'actualisation du jeton OAuth ne doit PAS toucher ce champ pour éviter les boucles de limite de débit. -**T08**— Limite de session par clé API : `max_sessions INTEGER DEFAULT 0` ajouté à `api_keys` via la migration automatique. `sessionManager.ts` gagne `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` et `getActiveSessionCountForKey()`. Les appelants dans `chatCore.js` peuvent appliquer la limite et décrémenter sur `req.close`. -**T09**— Portées de limite de débit Codex vs Spark : `getCodexModelScope()` et `getCodexRateLimitKey()` dans `codex.ts`. Les modèles standard (`gpt-5.x-codex`, `codex-mini`) obtiennent la portée `"codex"` ; les modèles Spark (`codex-spark*`) obtiennent la portée `"spark"`. Les clés de limite de débit doivent être `${accountId}:${scope}` afin que l'épuisement d'un pool ne bloque pas l'autre. -**T13**— Correctif d'affichage des quotas obsolètes : `getEffectiveQuotaUsage(used, resetAt)` renvoie `0` lorsque la fenêtre de réinitialisation est passée ; `formatResetCountdown(resetAt)` renvoie une chaîne de compte à rebours lisible par l'homme (par exemple `"2h 35m"`). Tous deux exportés depuis `providers.ts` + `localDb.ts` pour la consommation du tableau de bord. -**T14**— Échec rapide du proxy : nouveau `src/lib/proxyHealth.ts` avec `isProxyReachable(proxyUrl, timeoutMs=2000)` (vérification TCP, ≤2s au lieu de 30s timeout), `getCachedProxyHealth()`, `invalidateProxyHealth()` et `getAllProxyHealthStatuses()`. Résultats mis en cache 30 s par défaut ; configurable via `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Suite de tests :**832 tests, 0 échec**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— Colonne `requested_model` dans `call_logs` (migration 009) : suivez le modèle demandé à l'origine par le client par rapport au modèle routé réel. Permet l’analyse du taux de repli. -**T02**— Supprime les blocs de texte vides de `tool_result.content` imbriqué : évite les erreurs Anthropic 400 ("les blocs de contenu de texte doivent être non vides") lorsque Claude Code enchaîne les résultats de l'outil. -**T03**— Analyser les en-têtes `x-codex-5h-*` / `x-codex-7d-*` : `parseCodexQuotaHeaders()` + `getCodexResetTime()` extraient les fenêtres de quota du Codex pour une planification précise du temps de recharge au lieu d'un repli générique de 5 minutes. -**T04**— En-tête `X-Session-Id` pour le routage persistant externe : `extractExternalSessionId()` dans `sessionManager.ts` lit les en-têtes `x-session-id` / `x-omniroute-session` avec le préfixe `ext:` pour éviter les collisions avec les ID de session SHA-256 internes. Compatible Nginx (en-tête avec trait d’union). -**T06**— Compte désactivé → blocage permanent : `isAccountDeactivated()` dans `accountFallback.ts` détecte 401 signaux de désactivation et applique un temps de recharge d'un an pour éviter de réessayer des comptes définitivement morts. -**T07**— Validation IP X-Forwarded-For : nouveau `src/lib/ipUtils.ts` avec `extractClientIp()` et `getClientIpFromRequest()` — ignore les entrées `unknown`/non-IP dans les chaînes `X-Forwarded-For` (requêtes Nginx/proxy-forwarded). -**T10**— Crédits épuisés → solution de repli distincte : `isCreditsExhausted()` dans `accountFallback.ts` renvoie un temps de recharge d'1h avec l'indicateur `creditsExhausted`, distinct de la limitation de débit générique 429. -**T11**— Effort de raisonnement `max` → 131072 jetons de budget : `EFFORT_BUDGETS` et `THINKING_LEVEL_MAP` mis à jour ; la cartographie inversée renvoie désormais « max » pour les réponses à budget complet. Test unitaire mis à jour. -**T12**— Ajout d'entrées de tarification MiniMax M2.7 : `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` ajoutées au tableau de tarification (sub2api PR #1120). Les tarifs M2.5/GLM-4.7/GLM-5/Kimi existaient déjà. -**T15**— Normalisation du contenu du tableau : l'assistant `normalizeContentToString()` dans `openai-to-claude.ts` réduit correctement les messages système/outil au format tableau en chaîne avant de les envoyer à Anthropic.### 🧪 Tests

- Suite de tests :**832 tests, 0 échec**(inchangé par rapport à rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API de provisionnement de clés enregistrées : émission automatique de clés API avec application des quotas par fournisseur et par compte

- `POST /api/v1/registered-keys` — émet des clés avec prise en charge de l'idempotence
- `GET /api/v1/registered-keys` — liste (masquée) des clés enregistrées
- `GET /api/v1/registered-keys/{id}` — récupère les métadonnées clés
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — révoquer les clés
- `GET /api/v1/quotas/check` — pré-valider avant d'émettre
- `PUT /api/v1/providers/{id}/limits` — définit les limites d'émission du fournisseur
- `PUT /api/v1/accounts/{id}/limits` — définit les limites d'émission de compte
- `POST /api/v1/issues/report` — rapport facultatif des problèmes GitHub
- Migration BD 008 : tables `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Ajout des fournisseurs OpenCode Zen et OpenCode Go (par @kang-heewon)

- Nouveau `OpencodeExecutor` avec routage multi-format (`/chat/completions`, `/messages`, `/responses`)
- 7 modèles sur les deux niveaux---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Les icônes des fournisseurs utilisent désormais [@lobehub/icons](https://github.com/lobehub/lobe-icons) avec une solution de repli PNG gracieuse et un composant `ProviderIcon` (plus de 130 fournisseurs pris en charge) -**#488**— Mise à jour automatique des listes de modèles toutes les 24 heures via `modelSyncScheduler` (configurable via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth : affiche désormais une erreur claire et exploitable lorsque `GEMINI_OAUTH_CLIENT_SECRET` est manquant dans les déploiements Docker/auto-hébergés---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Validation de la clé LongCat AI : baseUrl (`api.longcat.chat/openai`) et authHeader (`Authorization: Bearer`) fixes -**#535**— Remplacement du modèle épinglé : `body.model` est désormais défini sur `pinnedModel` lorsque la protection du cache contextuel détecte un modèle épinglé -**#524**— La configuration OpenCode est désormais enregistrée correctement : ajout du gestionnaire `saveOpenCodeConfig()` (compatible XDG_CONFIG_HOME, écrit TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— La connexion ne reste plus bloquée après avoir ignoré la configuration du mot de passe (redirection vers l'intégration) -**#522**— Gestionnaire d'API : suppression du bouton trompeur "Copier la clé masquée" (remplacé par l'info-bulle de l'icône de verrouillage) -**#527**— Boucle de super pouvoirs Claude Code + Codex : les blocs `tool_result` sont désormais convertis en texte au lieu d'être supprimés -**#532**— La validation de la clé API OpenCode GO utilise désormais le point de terminaison `zen/v1` correct (`testKeyBaseUrl`) -**#489**— Antigravité : `googleProjectId` manquant renvoie une erreur structurée 422 avec des conseils de reconnexion -**#510**— Windows : les chemins MSYS2/Git-Bash (`/c/Program Files/...`) sont désormais normalisés en `C:\Program Files\...` -**#492**— La CLI `omniroute` détecte désormais `mise`/`nvm` lorsque `app/server.js` est manquant et affiche un correctif ciblé### Documentation

-**#513**— Réinitialisation du mot de passe Docker : solution de contournement de la variable d'environnement `INITIAL_PASSWORD` documentée -**#520**— pnpm : `pnpm approuve-builds better-sqlite3` documenté### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint : nouveaux fournisseurs OpenCode, correction des informations d'identification intégrées, bug de clé masquée CLI, correctif CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Les outils CLI enregistrent la clé API masquée dans les fichiers de configuration**— Les routes POST `claude-settings`, `cline-settings` et `openclaw-settings` acceptent désormais un paramètre `keyId` et résolvent la vraie clé API de la base de données avant d'écrire sur le disque. `ClaudeToolCard` a été mis à jour pour envoyer `keyId` au lieu de la chaîne d'affichage masquée. Corrections #523, #526. -**Fournisseurs d'intégration personnalisés : erreur `Aucune information d'identification`**— `/v1/embeddings` suit désormais `credentialsProviderId` séparément du préfixe de routage, de sorte que les informations d'identification sont récupérées à partir de l'ID de nœud du fournisseur correspondant plutôt que de la chaîne de préfixe publique. Corrige une régression où `google/gemini-embedding-001` et les modèles de fournisseurs personnalisés similaires échoueraient toujours avec une erreur d'informations d'identification. Correctifs liés au numéro 532. (RP #528 par @jacob2826) -**L'expression régulière de protection du cache de contexte manque `
` préfixe**— `CACHE_TAG_PATTERN` dans `comboAgentMiddleware.ts` mis à jour pour correspondre aux deux littéraux `
` (barre oblique inverse-n) et la nouvelle ligne U+000A réelle que le streaming `combo.ts` injecte autour de la balise `<omniModel>` après le correctif #515. Corrige #531.### ✨ New Providers

-**OpenCode Zen**— Passerelle de niveau gratuit sur `opencode.ai/zen/v1` avec 3 modèles : `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Service d'abonnement sur `opencode.ai/zen/go/v1` avec 4 modèles : `glm-5`, `kimi-k2.5`, `minimax-m2.7` (format Claude), `minimax-m2.5` (format Claude)

- Les deux fournisseurs utilisent le nouveau `OpencodeExecutor` qui achemine dynamiquement vers `/chat/completions`, `/messages`, `/responses` ou `/models/{model}:generateContent` en fonction du modèle demandé. (RP #530 par @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint : corrections de bugs – préserver la clé de cache d'invite du Codex, corriger l'échappement de tagContent JSON, synchroniser l'état du jeton expiré avec la base de données.### 🐛 Bug Fixes

-**correctif (traducteur)** : conserver `prompt_cache_key` dans l'API Responses → Traduction des achèvements de chat (#517)
— Le champ est un signal d'affinité de cache utilisé par le Codex ; le supprimer empêchait les accès rapides au cache.
Corrigé dans `openai-responses.ts` et `responsesApiHelper.ts`.

-**fix(combo)** : Échapper `
` dans `tagContent` donc la chaîne JSON injectée est valide (#515)
— Les nouvelles lignes littérales de modèle (U+000A) ne sont pas autorisées sans échappement dans les valeurs de chaîne JSON.
Remplacé par des séquences littérales `\n` dans `open-sse/services/combo.ts`.

-**correctif (utilisation)** : synchroniser le statut du jeton expiré avec la base de données en cas d'échec d'authentification en direct (#491)
— Lorsque la vérification en direct des limites et des quotas renvoie 401/403, la connexion `testStatus` est désormais mise à jour
à « expiré » dans la base de données afin que la page Fournisseurs reflète le même état dégradé.
Corrigé dans `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint : ajoutez 5 nouveaux fournisseurs d'IA gratuits : LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)** : Ajoutez LongCat AI (`lc/`) — 50 millions de jetons/jour gratuits (Flash-Lite) + 500 000/jour (Chat/Réflexion) pendant la version bêta publique. Auth. au porteur standard, compatible OpenAI. -**feat(providers/pollinations)** : Ajouter Pollinations AI (`pol/`) — aucune clé API requise. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s gratuites). L'exécuteur personnalisé gère l'authentification facultative. -**feat(providers/cloudflare-ai)** : ajoutez Cloudflare Workers AI (`cf/`) — 10 000 neurones/jour gratuits (~ 150 réponses LLM ou 500 s Whisper audio). Plus de 50 modèles à l’échelle mondiale. L'exécuteur personnalisé crée une URL dynamique avec « accountId » à partir des informations d'identification. -**feat(providers/scaleway)** : Ajoutez des API génératives Scaleway (`scw/`) — 1 million de jetons gratuits pour les nouveaux comptes. Conforme UE/RGPD (Paris). Qwen3 235B, Lama 3.1 70B, Mistral Petit 3.2. -**feat(providers/aimlapi)** : Ajoutez une API AI/ML (`aiml/`) — 0,025 $/jour de crédit gratuit, plus de 200 modèles (GPT-4o, Claude, Gemini, Llama) via un seul point de terminaison d'agrégateur.### 🔄 Provider Updates

-**feat(providers/together)** : Ajouter `hasFree: true` + 3 ID de modèle gratuits en permanence : `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)** : ajoutez `hasFree: true` + `freeNote` (1 500 req/jour, aucune carte de crédit nécessaire, aistudio.google.com) -**chore(providers/gemini)** : renommez le nom d'affichage en "Gemini (Google AI Studio)" pour plus de clarté### ⚙️ Infrastructure

-**feat(executors/pollinations)** : Nouveau `PollinationsExecutor` — omet l'en-tête `Authorization` lorsqu'aucune clé API n'est fournie -**feat(executors/cloudflare-ai)** : Nouveau `CloudflareAIExecutor` — la construction d'URL dynamique nécessite `accountId` dans les informations d'identification du fournisseur -**feat(executors)** : Enregistrez les mappages d'exécuteurs `pollinations`, `pol`, `cloudflare-ai`, `cf`### Documentation

-**docs(readme)** : extension de la pile combo gratuite à 11 fournisseurs (0 $ pour toujours) -**docs(readme)** : Ajout de 4 nouvelles sections de fournisseurs gratuits (LongCat, Pollinations, Cloudflare AI, Scaleway) avec des tableaux de modèles -**docs(readme)** : tableau de prix mis à jour avec 4 nouvelles lignes de niveau gratuit -**docs(i18n/pt-BR)** : tableau de prix mis à jour + sections LongCat/Pollinations/Cloudflare AI/Scaleway ajoutées en portugais -**docs(new-features/ai)** : 10 fichiers de spécifications de tâches + plan principal de mise en œuvre dans `docs/new-features/ai/`### 🧪 Tests

- Suite de tests :**821 tests, 0 échec**(inchangé)---

## [2.9.2] — 2026-03-21

> Sprint : Correction de la transcription des médias (Deepgram/HuggingFace Content-Type, détection de langue) et de l'affichage des erreurs TTS.### 🐛 Bug Fixes

-**fix(transcription)** : La transcription audio Deepgram et HuggingFace mappe désormais correctement `video/mp4` → `audio/mp4` et d'autres types MIME multimédia via le nouvel assistant `resolveAudioContentType()`. Auparavant, le téléchargement de fichiers « .mp4 » renvoyait systématiquement « Aucune parole détectée » car Deepgram recevait « Content-Type : video/mp4 ». -**fix(transcription)** : Ajout de `detect_lingual=true` aux requêtes Deepgram — détecte automatiquement la langue audio (portugais, espagnol, etc.) au lieu de l'anglais par défaut. Corrige les transcriptions non anglaises renvoyant des résultats vides ou inutiles. -**fix(transcription)** : Ajout de « ponctuation = true » aux requêtes Deepgram pour une sortie de transcription de meilleure qualité avec une ponctuation correcte. -**fix(tts)** : affichage de l'erreur `[object Object]` dans les réponses Text-to-Speech corrigé dans `audioSpeech.ts` et `audioTranscription.ts`. La fonction `upstreamErrorResponse()` extrait désormais correctement les messages de chaîne imbriqués de fournisseurs comme ElevenLabs qui renvoient `{ error: { message: "...", status_code: 401 } }` au lieu d'une chaîne d'erreur plate.### 🧪 Tests

- Suite de tests :**821 tests, 0 échec**(inchangé)### Triaged Issues

-**#508**— Régression du format d'appel de l'outil : journaux de proxy demandés et informations sur la chaîne de fournisseurs (`needs-info`) -**#510**— Chemin de vérification de l'état de la CLI Windows : informations demandées sur la version du shell/du nœud (`needs-info`) -**#485**— Appels de l'outil Kiro MCP : clos car problème Kiro externe (pas OmniRoute) -**#442**— Point de terminaison Baseten /models : fermé (solution de contournement manuelle documentée) -**#464**— API de provisionnement de clés : reconnue comme élément de la feuille de route---

## [2.9.1] — 2026-03-21

> Sprint : correction de la perte de données SSE omniModel, fusion de la compatibilité des modèles par protocole.### Bug Fixes

-**#511**— Critique : la balise `<omniModel>` a été envoyée après `finish_reason:stop` dans les flux SSE, provoquant une perte de données. La balise est désormais injectée dans le premier morceau de contenu non vide, garantissant la livraison avant que les SDK ne ferment la connexion.### Merged PRs

-**PR #512**(@zhangqiang8vip) : Compatibilité des modèles par protocole — `normalizeToolCallId` et `preserveOpenAIDeveloperRole` peuvent désormais être configurés par protocole client (OpenAI, Claude, API Responses). Nouveau champ `compatByProtocol` dans la configuration du modèle avec validation Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed : informations PATH/version demandées -**#509**— Régression Turbopack Electron : bug Next.js en amont, solutions de contournement documentées -**#508**— Écran noir macOS : solution de contournement suggérée `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint : correctif machineId multiplateforme, limites de débit par clé API, cache de contexte de streaming, Alibaba DashScope, analyses de recherche, ZWS v5 et 8 problèmes résolus.### ✨ New Features

-**feat(search)** : onglet Search Analytics dans `/dashboard/analytics` — répartition des fournisseurs, taux de réussite du cache, suivi des coûts. Nouvelle API : `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)** : Alibaba Cloud DashScope ajouté avec validation personnalisée du chemin du point de terminaison — `chatPath` et `modelsPath` configurables par nœud (#feat/custom-endpoint-paths) -**feat(api)** : limites du nombre de requêtes par clé API — colonnes `max_requests_per_day` et `max_requests_per_minute` avec application de fenêtre coulissante en mémoire renvoyant HTTP 429 (#452) -**feat(dev)** : ZWS v5 — Correction de fuite HMR (connexions 485 DB → 1), mémoire 2,4 Go → 195 Mo, singletons `globalThis`, correction d'avertissement Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)** : `machineId` multiplateforme — `getMachineIdRaw()` réécrit avec la cascade try/catch (Windows REG.exe → macOS ioreg → lecture de fichier Linux → nom d'hôte → `os.hostname()`). Élimine la branchement `process.platform` qui a éliminé le code mort du bundle Next.js, la correction de `'head' n'est pas reconnue` sous Windows. Corrige également le numéro 466. -**fix(#493)** : Dénomination de modèle de fournisseur personnalisé — suppression de la suppression incorrecte des préfixes dans `DefaultExecutor.transformRequest()` qui tronquait les ID de modèle à l'échelle de l'organisation comme `zai-org/GLM-5-FP8`. -**fix(#490)** : Streaming + protection du cache contextuel — `TransformStream` intercepte SSE pour injecter la balise `<omniModel>` avant le marqueur `[DONE]`, activant la protection du cache contextuel pour les réponses en streaming. -**correctif (#458)** : validation du schéma combiné — les champs `system_message`, `tool_filter_regex`, `context_cache_protection` passent désormais la validation Zod lors de la sauvegarde. -**correctif (#487)** : nettoyage de la carte KIRO MITM — suppression de ZWS_README, génération de `AntigravityToolCard` pour utiliser les métadonnées de l'outil dynamique.### 🧪 Tests

- Ajout de tests unitaires de filtrage des outils au format Anthropic (PR #397) — 8 tests de régression pour `tool.name` sans wrapper `.function`
- Suite de tests :**821 tests, 0 échec**(au lieu de 813)### 📋 Issues Closed (8)

-**#506**— L'ID machine Windows `head` n'est pas reconnu (corrigé) -**#493**— Dénomination du modèle de fournisseur personnalisé (corrigé) -**#490**— Cache de contexte de streaming (corrigé) -**#452**— Limites de requêtes par clé API (implémentées) -**#466**— Échec de connexion Windows (même cause fondamentale que #506) -**#504**— MITM inactif (comportement attendu) -**#462**— Gemini CLI PSA (résolu) -**#434**— Crash de l'application Electron (duplicata du #402)## [2.8.9] — 2026-03-20

> Sprint : fusionner les PR de la communauté, corriger la carte KIRO MITM, mises à jour des dépendances.### Merged PRs

-**PR #498**(@Sajid11194) : Correction d'un crash de l'ID machine Windows (`undefined\REG.exe`). Remplace `node-machine-id` par des requêtes de registre natives du système d'exploitation.**Ferme le numéro 486.** -**PR #497**(@zhangqiang8vip) : Correction des fuites de ressources HMR en mode développement – 485 fuites de connexions de base de données → 1, mémoire 2,4 Go → 195 Mo. Singletons `globalThis`, correctif d'avertissement Edge Runtime, stabilité des tests Windows. (+1168/-338 sur 22 fichiers) -**PR #499-503**(Dependabot) : mises à jour de GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— La carte KIRO MITM affiche désormais des instructions spécifiques à l'outil (`api.anthropic.com`) au lieu du texte spécifique à l'Antigravité. -**#504**— Réponse avec une clarification UX (MITM "Inactif" est un comportement attendu lorsque le proxy n'est pas en cours d'exécution).---

## [2.8.8] — 2026-03-20

> Sprint : correction du crash du test par lots OAuth, ajout du bouton « Tester tout » aux pages des fournisseurs individuels.### Bug Fixes

-**Crash du test par lots OAuth**(ERR_CONNECTION_REFUSED) : remplacement de la boucle for séquentielle par une limite de concurrence de 5 connexions + un délai d'expiration de 30 s par connexion via `Promise.race()` + `Promise.allSettled()`. Empêche les pannes de serveur lors du test de grands groupes de fournisseurs OAuth (~ 30+ connexions).### Fonctionnalités

-**Bouton « Tester tout » sur les pages des fournisseurs** : les pages de fournisseurs individuels (par exemple, `/providers/codex`) affichent désormais un bouton "Tester tout" dans l'en-tête des connexions lorsqu'il y a plus de 2 connexions. Utilise `POST /api/providers/test-batch` avec `{mode : "provider", supplierId}`. Résultats affichés dans un modal avec résumé réussite/échec et diagnostic par connexion.---

## [2.8.7] — 2026-03-20

> Sprint : Merge PR #495 (Bottleneck 429 drop), correctif #496 (fournisseurs d'intégration personnalisés), fonctionnalités de tri.### Bug Fixes

-**Bottleneck 429 attente infinie**(PR #495 par @xandr0s) : sur 429, `limiter.stop({ dropWaitingJobs: true })` fait immédiatement échouer toutes les requêtes en file d'attente afin que les appelants en amont puissent déclencher un repli. Le limiteur est supprimé de Map afin que la prochaine requête crée une nouvelle instance. -**Modèles d'intégration personnalisés insolubles**(#496) : `POST /v1/embeddings` résout désormais les modèles d'intégration personnalisés à partir de TOUS les nœuds_fournisseurs (pas seulement localhost). Permet d'ajouter des modèles tels que « google/gemini-embedding-001 » via le tableau de bord.### Issues Responded

-**#452**— Limites du nombre de requêtes par clé API (reconnues, sur la feuille de route) -**#464**— Émission automatique de clés API avec limites de fournisseur/compte (nécessite plus de détails) -**#488**— Listes de modèles à mise à jour automatique (accusé de réception, sur la feuille de route) -**#496**— Résolution du fournisseur d'intégration personnalisée (corrigé)---

## [2.8.6] — 2026-03-20

> Sprint : Fusionner le PR #494 (correctif du rôle MiniMax), corriger le tableau de bord KIRO MITM, trier 8 problèmes.### Fonctionnalités

-**Développeur MiniMax → correctif du rôle système**(PR #494 par @zhangqiang8vip) : bascule `preserveDeveloperRole` par modèle. Ajoute l'interface utilisateur « Compatibilité » dans la page des fournisseurs. Corrige 422 « erreur de paramètre de rôle » pour MiniMax et passerelles similaires. -**roleNormalizer** : `normalizeDeveloperRole()` accepte désormais le paramètre `preserveDeveloperRole` avec un comportement à trois états (undefined=keep, true=keep, false=convert). -**DB** : Nouveaux `getModelPreserveOpenAIDeveloperRole()` et `mergeModelCompatOverride()` dans `models.ts`.### Bug Fixes

-**Tableau de bord KIRO MITM**(#481/#487) : `CLIToolsPageClient` achemine désormais tout outil `configType: "mitm"` vers `AntigravityToolCard` (contrôles MITM Start/Stop). Auparavant, seule Antigravity était codée en dur. -**AntigravityToolCard générique** : utilise `tool.image`, `tool.description`, `tool.id` au lieu des valeurs antigravité codées en dur. Protège contre les « defaultModels » manquants.### Cleanup

- Suppression de `ZWS_README_V2.md` (documents de développement uniquement du PR #494).### Issues Triaged (8)

-**#487**— Fermé (KIRO MITM corrigé dans cette version) -**#486**— besoins d'informations (problème PATH Windows REG.exe) -**#489**— informations sur les besoins (ID du projet Antigravity manquant, reconnexion OAuth nécessaire) -**#492**— information sur les besoins (app/server.js manquant sur un nœud mal géré) -**#490**— Acquitté (streaming + blocage du cache contextuel, correctif prévu) -**#491**— Reconnu (incohérence de l'état d'authentification du Codex) -**#493**— Reconnu (préfixe du nom du modèle du fournisseur modal, solution de contournement fournie) -**#488**— Carnet de demandes de fonctionnalités (listes de modèles à mise à jour automatique)---

## [2.8.5] — 2026-03-19

> Sprint : correction des flux SSE zombies, premier tour du cache contextuel, KIRO MITM et tri de 5 problèmes externes.### Bug Fixes

-**Zombie SSE Streams**(#473) : réduisez `STREAM_IDLE_TIMEOUT_MS` de 300 s à 120 s pour un repli combo plus rapide lorsque les fournisseurs se bloquent en cours de flux. Configurable via env var. -**Context Cache Tag**(#474) : Correction de `injectModelTag()` pour gérer les requêtes au premier tour (pas de messages d'assistant) — la protection du cache contextuel fonctionne désormais dès la toute première réponse. -**KIRO MITM**(#481) : modifiez KIRO `configType` de `guide` → `mitm` afin que le tableau de bord restitue les commandes MITM Start/Stop. -**Test E2E**(CI) : correction de « providers-bailian-coding-plan.spec.ts » – ignorez la superposition modale préexistante avant de cliquer sur le bouton Ajouter une clé API.### Closed Issues

- # 473 — Solution de secours combo de contournement des flux Zombie SSE
- #474 — Balise du cache contextuel `<omniModel>` manquante au premier tour
- #481 — MITM pour KIRO non activable depuis le tableau de bord
- #468 — Serveur distant Gemini CLI (remplacé par la dépréciation #462)
- #438 — Claude incapable d'écrire des fichiers (problème CLI externe)
- #439 — AppImage ne fonctionne pas (solution de contournement documentée par libfuse2)
- #402 — ARM64 DMG "endommagé" (solution de contournement xattr -cr documentée)
- #460 — CLI non exécutable sous Windows (correctif PATH documenté)---

## [2.8.4] — 2026-03-19

> Sprint : obsolescence de Gemini CLI, correctif VM guide i18n, correctif de sécurité dependabot, extension du schéma du fournisseur.### Fonctionnalités

-**Dépréciation de Gemini CLI**(#462) : marquer le fournisseur `gemini-cli` comme obsolète avec un avertissement — Google restreint l'utilisation d'OAuth tiers à partir de mars 2026 -**Provider Schema**(#462) : développez la validation Zod avec les champs facultatifs `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471) : ajoutez `VM_DEPLOYMENT_GUIDE.md` au pipeline de traduction i18n, régénérez les 30 traductions locales à partir de la source anglaise (étaient bloquées en portugais)### Sécurité

-**deps** : Bump `flatted` 3.3.3 → 3.4.2 — corrige la pollution du prototype CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Régression des alias de modèle (corrigé dans la v2.8.2)
- #471 — Traductions du guide VM cassées
- #483 — Fin `data : null` après `[DONE]` (corrigé dans la v2.8.3)### Merged PRs

- #484 — deps : bump aplati de 3.3.3 à 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint : Czech i18n, correctif du protocole SSE, traduction du guide VM.### Fonctionnalités

-**Langue tchèque**(#482) : tchèque complet (cs) i18n — 22 documents, 2606 chaînes d'interface utilisateur, mises à jour du sélecteur de langue (@zen0bit) -**Guide de déploiement de VM** : Traduit du portugais vers l'anglais comme document source (@zen0bit)### Bug Fixes

-**Protocole SSE**(#483) : Arrêtez d'envoyer les "données : null" après le signal "[DONE]" - corrige "AI_TypeValidationError" dans les clients AI SDK stricts (validateurs basés sur Zod)### Merged PRs

- #482 — Ajouter la langue tchèque + Correction de la source anglaise de VM_DEPLOYMENT_GUIDE.md (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint : 2 PR fusionnés, correction du routage des alias de modèle, exportation des journaux et triage des problèmes.### Fonctionnalités

-**Exportation de journaux** : Nouveau bouton Exporter sur `/dashboard/logs` avec liste déroulante de plage de temps (1h, 6h, 12h, 24h). Télécharge le JSON des journaux de requêtes/proxy/appels via l'API `/api/logs/export` (#user-request)### Bug Fixes

-**Routage des alias de modèle**(#472) : Paramètres → Les alias de modèle affectent désormais correctement le routage du fournisseur, pas seulement la détection du format. Auparavant, la sortie `resolveModelAlias()` n'était utilisée que pour `getModelTargetFormat()` mais l'ID du modèle d'origine était envoyé au fournisseur -**Utilisation du flux Flush**(#480) : les données d'utilisation du dernier événement SSE dans le tampon sont désormais correctement extraites lors du vidage du flux (fusionnées depuis @prakersh).### Merged PRs

- #480 — Extraire l'utilisation du tampon restant dans le gestionnaire de vidage (@prakersh)
- #479 — Ajouter les entrées de tarification Codex 5.3/5.4 et Anthropic Model ID manquantes (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint : cinq PR communautaires : correctifs du journal des appels en streaming, compatibilité Kiro, analyse des jetons de cache, traduction en chinois et identifiants d'appel d'outils configurables.### Fonctionnalités

-**feat(logs)** : Le contenu des réponses du journal d'appels est désormais correctement accumulé à partir des morceaux bruts du fournisseur (OpenAI/Claude/Gemini) avant la traduction, corrigeant les charges utiles de réponse vides en mode streaming (#470, @zhangqiang8vip) -**feat(providers)** : normalisation des ID d'appel d'outil à 9 caractères configurables par modèle (style Mistral) — seuls les modèles avec l'option activée obtiennent des ID tronqués (#470) -**feat(api)** : API Key PATCH étendue pour prendre en charge les champs `allowedConnections`, `name`, `autoResolve`, `isActive` et `accessSchedule` (#470) -**feat(dashboard)** : disposition axée sur la réponse dans l'interface utilisateur détaillée du journal des requêtes (#470) -**feat(i18n)** : Traduction améliorée en chinois (zh-CN) — retraduction complète (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)** : supprime le champ `model` injecté du corps de la requête — L'API Kiro rejette les champs de niveau supérieur inconnus (#478, @prakersh) -**fix(usage)** : Inclut les jetons de lecture et de création de cache dans les totaux d'entrée de l'historique d'utilisation pour des analyses précises (#477, @prakersh) -**fix(callLogs)** : Prise en charge des champs d'utilisation du format Claude (`input_tokens`/`output_tokens`) aux côtés du format OpenAI, inclut toutes les variantes de jetons de cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint : fournisseur de plan de codage Bailian avec URL de base modifiables, ainsi que des contributions de la communauté pour Alibaba Cloud et Kimi Coding.### Fonctionnalités

-**feat(providers)** : Ajout du plan de codage Bailian (`bailian-coding-plan`) — Alibaba Model Studio avec API compatible Anthropic. Catalogue statique de 8 modèles dont Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 et Kimi K2.5. Inclut une validation d'authentification personnalisée (400=valide, 401/403=invalide) (#467, @Mind-Dragon) -**feat(admin)** : URL par défaut modifiable dans les flux de création/modification de l'administrateur du fournisseur — les utilisateurs peuvent configurer des URL de base personnalisées par connexion. Persistance dans `providerSpecificData.baseUrl` avec la validation du schéma Zod rejetant les schémas non-http(s) (#467)### 🧪 Tests

- Ajout de plus de 30 tests unitaires et de 2 scénarios e2e pour le fournisseur Bailian Coding Plan couvrant la validation d'authentification, le renforcement des schémas, le comportement au niveau de la route et l'intégration multicouche---

## [2.7.10] — 2026-03-19

> Sprint : deux nouveaux fournisseurs contribués par la communauté (Alibaba Cloud Coding, Kimi Coding API-key) et Docker pino fix.### Fonctionnalités

-**feat(providers)** : Ajout de la prise en charge d'Alibaba Cloud Coding Plan avec deux points de terminaison compatibles OpenAI — `alicode` (Chine) et `alicode-intl` (International), chacun avec 8 modèles (#465, @dtk1985) -**feat(providers)** : Ajout d'un chemin de fournisseur `kimi-coding-apikey` dédié — L'accès à Kimi Coding basé sur une clé API n'est plus forcé via la route `kimi-coding` OAuth uniquement. Comprend le registre, les constantes, l'API des modèles, la configuration et le test de validation (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)** : Ajout d'une dépendance `split2` manquante à l'image Docker — `pino-abstract-transport` la nécessite au moment de l'exécution mais elle n'était pas copiée dans le conteneur autonome, provoquant des crashs `Impossible de trouver le module 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint : passthrough du sous-chemin des réponses Codex pris en charge de manière native, crash de Windows MITM corrigé et schémas d'agent Combos ajustés.### Fonctionnalités

-**feat(codex)** : Passthrough de sous-chemin de réponses natives pour Codex — achemine nativement `POST /v1/responses/compact` vers Codex en amont, maintenant la compatibilité avec Claude Code sans supprimer le suffixe `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)** : les schémas Zod (`updateComboSchema` et `createComboSchema`) incluent désormais `system_message`, `tool_filter_regex` et `context_cache_protection`. Corrige un bug où les paramètres spécifiques à l'agent créés via le tableau de bord étaient ignorés silencieusement par la couche de validation backend (#458) -**fix(mitm)**: crash du profil Kiro MITM sur Windows corrigé — `node-machine-id` a échoué en raison de l'environnement `REG.exe` manquant, et la solution de secours a généré une erreur fatale `crypto n'est pas défini`. Fallback importe désormais correctement et en toute sécurité la cryptographie (#456)---

## [2.7.8] — 2026-03-18

> Sprint : bug de sauvegarde du budget + interface utilisateur des fonctionnalités de l'agent combo + correctif de sécurité des balises omniModel.### 🐛 Bug Fixes

-**fix(budget)** : "Save Limits" ne renvoie plus 422 — `warningThreshold` est désormais correctement envoyé sous forme de fraction (0-1) au lieu de pourcentage (0-100) (#451) -**fix(combos)** : la balise de cache interne `<omniModel>` est désormais supprimée avant de transmettre les requêtes aux fournisseurs, empêchant ainsi les interruptions de session de cache (#454)### Fonctionnalités

-**feat(combos)** : section Fonctionnalités de l'agent ajoutée au combo create/edit modal — expose le remplacement de `system_message`, `tool_filter_regex` et `context_cache_protection` directement depuis le tableau de bord (#454)---

## [2.7.7] — 2026-03-18

> Sprint : crash de Docker pino, correctif du travailleur de réponses Codex CLI, synchronisation du verrouillage des packages.### 🐛 Bug Fixes

-**fix(docker)** : `pino-abstract-transport` et `pino-pretty` sont désormais explicitement copiés dans l'étape du lanceur Docker — La trace autonome Next.js manque ces dépôts homologues, provoquant un crash `Impossible de trouver le module pino-abstract-transport` au démarrage (#449) -**fix(responses)** : Supprimez `initTranslators()` de la route `/v1/responses` — le travailleur Next.js plantait avec `le travailleur est sorti` uncaughtException sur les requêtes CLI du Codex (#450)### 🔧 Maintenance

-**chore(deps)** : `package-lock.json` est désormais validé à chaque changement de version pour garantir que Docker `npm ci` utilise des versions de dépendances exactes---

## [2.7.5] — 2026-03-18

> Sprint : améliorations UX et correctif de contrôle de santé Windows CLI.### 🐛 Bug Fixes

-**fix(ux)** : Afficher l'indice de mot de passe par défaut sur la page de connexion — les nouveaux utilisateurs voient désormais ""Mot de passe par défaut : 123456"`sous la saisie du mot de passe (#437)
-**fix(cli)** : Claude CLI et d'autres outils installés par npm sont désormais correctement détectés comme exécutables sous Windows — spawn utilise`shell:true`pour résoudre les wrappers`.cmd` via PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint : tableau de bord des outils de recherche, correctifs i18n, limites Copilot, correctif de validation Serper.### Fonctionnalités

-**feat(search)**: Add Search Playground (10th endpoint), Search Tools page with Compare Providers/Rerank Pipeline/Search History, local rerank routing, auth guards on search API (#443 by @Regis-RCR)

- Nouvel itinéraire : `/dashboard/search-tools`
- Entrée de la barre latérale sous la section Débogage
- `GET /api/search/providers` et `GET /api/search/stats` avec gardes d'authentification
- Routage local des nœuds fournisseurs pour `/v1/rerank`
- 30+ clés i18n dans l'espace de noms de recherche### 🐛 Bug Fixes

-**fix(search)** : correction du normalisateur de news Brave (renvoyait 0 résultat), application de la troncature max_results après la normalisation, correction de l'URL de récupération de la page Endpoints (#443 par @Regis-RCR) -**fix(analytics)** : localisez les étiquettes de jour/date d'analyse — remplacez les chaînes portugaises codées en dur par `Intl.DateTimeFormat(locale)` (#444 par @hijak) -**fix(copilot)** : correction de l'affichage du type de compte GitHub Copilot, filtre trompeur des lignes de quota illimité à partir du tableau de bord des limites (#445 par @hijak) -**fix(providers)** : Arrêtez de rejeter les clés API Serper valides — traitez les réponses non-4xx comme une authentification valide (#446 par @hijak)---

## [2.7.3] — 2026-03-18

> Sprint : correctif de repli du quota de l'API directe du Codex.### 🐛 Bug Fixes

-**fix(codex)** : Bloquer les comptes épuisés chaque semaine dans le repli direct de l'API (#440)

- Correspondance du préfixe `resolveQuotaWindow()` : `"weekly"` correspond désormais aux clés de cache `"weekly (7d)"`
- `applyCodexWindowPolicy()` applique correctement les bascules `useWeekly`/`use5h`
- 4 nouveaux tests de régression (766 au total)---

## [2.7.2] — 2026-03-18

> Sprint : corrections du contraste de l'interface utilisateur en mode clair.### 🐛 Bug Fixes

-**fix(logs)** : Correction du contraste du mode d'éclairage dans les boutons de filtre des journaux de requêtes et le badge combo (#378)

- Boutons de filtre Erreur/Succès/Combo désormais lisibles en mode clair
- Le badge de rangée combinée utilise un violet plus fort en mode clair---

## [2.7.1] — 2026-03-17

> Sprint : Routage de recherche web unifié (POST /v1/search) avec 5 fournisseurs + correctifs de sécurité Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)** : Routage de recherche Web unifié — `POST /v1/search` avec 5 fournisseurs (Serper, Brave, Perplexity, Exa, Tavily)

- Basculement automatique entre fournisseurs, plus de 6 500 recherches gratuites/mois
- Cache en mémoire avec fusion de requêtes (TTL configurable)
- Tableau de bord : onglet Search Analytics dans `/dashboard/analytics` avec répartition des fournisseurs, taux de réussite du cache, suivi des coûts
- Nouvelle API : `GET /api/v1/search/analytics` pour les statistiques des requêtes de recherche
- Migration de base de données : colonne `request_type` sur `call_logs` pour le suivi des requêtes hors chat
- Validation Zod (`v1SearchSchema`), authentifiée, coût enregistré via `recordCost()`### Sécurité

-**deps** : Next.js 16.1.6 → 16.1.7 — corrige 6 CVE : -**Critique** : CVE-2026-29057 (contrebande de requêtes HTTP via proxy http) -**Élevé** : CVE-2026-27977, CVE-2026-27978 (WebSocket + Actions du serveur) -**Moyen** : CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fichier                                                          | Objectif                                                       |
| ---------------------------------------------------------------- | -------------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Gestionnaire de recherche avec routage à 5 fournisseurs        |
| `open-sse/config/searchRegistry.ts`                              | Registre des fournisseurs (authentification, coût, quota, TTL) |
| `open-sse/services/searchCache.ts`                               | Cache en mémoire avec fusion de requêtes                       |
| `src/app/api/v1/search/route.ts`                                 | Itinéraire Next.js (POST + GET)                                |
| `src/app/api/v1/search/analytics/route.ts`                       | API de statistiques de recherche                               |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Onglet du tableau de bord Analytics                            |
| `src/lib/db/migrations/007_search_request_type.sql`              | Migration de base de données                                   |
| `tests/unit/search-registry.test.mjs`                            | 277 lignes de tests unitaires                                  | --- |

## [2.7.0] — 2026-03-17

> Sprint : fonctionnalités inspirées de ClawRouter : indicateur toolCalling, détection d'intention multilingue, repli basé sur des tests de référence, déduplication de demande, RouterStrategy enfichable, tarification Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(pricing)** : xAI Grok-4 Fast — `$0,20/$0,50 par 1 million de jetons`, 1 143 ms de latence p50, appel d'outil pris en charge -**feat(pricing)** : xAI Grok-4 (standard) — `$0,20/$1,50 par 1 million de jetons`, produit phare de raisonnement -**feat(pricing)** : GLM-5 via Z.AI — `$0,5/1M`, contexte de sortie 128K -**feat(pricing)** : MiniMax M2.5 — `$0,30/1M input`, raisonnement + tâches agentiques -**feat(pricing)** : DeepSeek V3.2 — tarification mise à jour `$0,27/$1,10 par 1M` -**feat(pricing)** : Kimi K2.5 via l'API Moonshot — accès direct à l'API Moonshot -**feat(providers)** : ajout du fournisseur Z.AI (alias `zai`) — famille GLM-5 avec sortie 128K### 🧠 Routing Intelligence

-**feat(registry)** : indicateur `toolCalling` par modèle dans le registre des fournisseurs — les combos peuvent désormais préférer/exiger des modèles capables d'appeler des outils -**feat(scoring)** : Détection d'intention multilingue pour la notation AutoCombo — Les modèles de script/langage PT/ZH/ES/AR influencent la sélection du modèle en fonction du contexte de la requête. -**feat(fallback)** : chaînes de secours basées sur des benchmarks — données de latence réelles (p50 de `comboMetrics`) utilisées pour réorganiser dynamiquement la priorité de secours -**feat(dedup)** : demande de déduplication via le hachage de contenu – une fenêtre d'idempotence de 5 secondes empêche les appels du fournisseur en double de réessayer les clients -**feat(router)** : interface `RouterStrategy` enfichable dans `autoCombo/routerStrategy.ts` — une logique de routage personnalisée peut être injectée sans modifier le noyau### 🔧 MCP Server Improvements

-**feat(mcp)** : 2 nouveaux schémas d'outils avancés : `omniroute_get_provider_metrics` (p50/p95/p99 par fournisseur) et `omniroute_explain_route` (explication de la décision de routage) -**feat(mcp)** : mises à jour des portées d'authentification de l'outil MCP — portée `metrics:read` ajoutée pour les outils de métriques du fournisseur -**feat(mcp)** : `omniroute_best_combo_for_task` accepte désormais le paramètre `lingualHint` pour le routage multilingue### 📊 Observability

-**feat(metrics)** : `comboMetrics.ts` étendu avec un suivi des centiles de latence en temps réel par fournisseur/compte -**feat(health)** : L'API Health (`/api/monitoring/health`) renvoie désormais les champs `p50Latency` et `errorRate` par fournisseur -**feat(usage)** : migration de l'historique d'utilisation pour le suivi de la latence par modèle### 🗄️ DB Migrations

-**feat(migrations)** : Nouvelle colonne `latency_p50` dans la table `combo_metrics` — sans coupure, sans danger pour les utilisateurs existants### 🐛 Bug Fixes / Closures

-**close(#411)** : résolution du module haché meilleure-sqlite3 sous Windows — corrigé dans la v2.6.10 (f02c5b5) -**fermer(#409)** : les complétions de chat GitHub Copilot échouent avec les modèles Claude lorsque des fichiers sont joints — corrigé dans la v2.6.9 (838f1d6) -**close(#405)** : Duplicata du #411 — résolu## [2.6.10] — 2026-03-17

> Correctif Windows : téléchargement prédéfini better-sqlite3 sans node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)** : Sous Windows, `npm install -g omniroute` échouait avec `better_sqlite3.node n'est pas une application Win32 valide` car le binaire natif fourni a été compilé pour Linux. Ajoute**Strategy 1.5**à `scripts/postinstall.mjs` : utilise `@mapbox/node-pre-gyp install --fallback-to-build=false` (inclus dans `better-sqlite3`) pour télécharger le binaire pré-construit correct pour le système d'exploitation/arch actuel sans nécessiter d'outils de construction (pas de node-gyp, pas de Python, pas de MSVC). Revient à « npm reconstruction » uniquement si le téléchargement échoue. Ajoute des messages d'erreur spécifiques à la plate-forme avec des instructions de correction manuelle claires.---

## [2.6.9] — 2026-03-17

> Corrections CI (t11 tout budget), correction du bug #409 (pièces jointes via Copilot+Claude), correction du workflow de release.### 🐛 Bug Fixes

-**fix(ci)** : Supprimez le mot "any" des commentaires dans `openai-responses.ts` et `chatCore.ts` qui échouaient au contrôle budgétaire t11 `any ` (faux positif des commentaires de comptage d'expressions régulières) -**fix(chatCore)** : normaliser les types de parties de contenu non pris en charge avant de les transmettre aux fournisseurs (#409 — Le curseur envoie `{type:"file"}` lorsque des fichiers `.md` sont joints ; Copilot et d'autres fournisseurs compatibles OpenAI rejettent avec "le type doit être soit 'image_url' ou 'text'" ; le correctif convertit les blocs `file`/`document` en `text` et supprime les types inconnus)### 🔧 Workflow

-**chore(generate-release)** : Ajouter une RÈGLE DE COMMIT ATOMIC — le changement de version (`npm version patch`) DOIT se produire avant de valider les fichiers de fonctionnalités pour garantir que la balise pointe toujours vers un commit contenant toutes les modifications de version ensemble---

## [2.6.8] — 2026-03-17

> Sprint : Combo en tant qu'agent (invite système + filtre d'outil), protection de mise en cache contextuelle, mise à jour automatique, journaux détaillés, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql** : `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql** : Nouvelle table `request_detail_logs` avec déclencheur de tampon en anneau de 500 entrées, opt-in via la bascule des paramètres### Fonctionnalités

-**feat(combo)** : remplacement du message système par combo (#399 — le champ `system_message` remplace ou injecte l'invite système avant de le transmettre au fournisseur) -**feat(combo)** : Tool Filter Regex par Combo (#399 — `tool_filter_regex` conserve uniquement les outils correspondant au modèle ; prend en charge les formats OpenAI + Anthropic) -**feat(combo)** : Protection de mise en cache de contexte (#401 — `context_cache_protection` balise les réponses avec `<omniModel>provider/model</omniModel>` et épingle le modèle pour la continuité de la session) -**feat(settings)** : mise à jour automatique via les paramètres (#320 — `GET /api/system/version` + `POST /api/system/update` — vérifie le registre npm et les mises à jour en arrière-plan avec le redémarrage de pm2) -**feat(logs)** : journaux de requêtes détaillés (#378 — capture les corps complets du pipeline en 4 étapes : requête du client, requête traduite, réponse du fournisseur, réponse du client — bascule d'adhésion, coupe de 64 Ko, tampon en anneau de 500 entrées) -**feat(mitm)** : profil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` cible api.anthropic.com, réutilise l'infrastructure MITM existante)---

## [2.6.7] — 2026-03-17

> Sprint : améliorations SSE, extensions locales de fournisseurs_nodes, registre proxy, correctifs de passage Claude.### Fonctionnalités

-**feat(health)** : vérification de l'état en arrière-plan pour les `provider_nodes` locaux avec une interruption exponentielle (30 s → 300 s) et ` Promise.allSettled` pour éviter le blocage (# 423, @Regis-RCR) -**feat(embeddings)** : Route `/v1/embeddings` vers `provider_nodes` local — `buildDynamicEmbeddingProvider()` avec validation du nom d'hôte (#422, @Regis-RCR) -**feat(audio)** : Route TTS/STT vers `provider_nodes` locaux — `buildDynamicAudioProvider()` avec protection SSRF (#416, @Regis-RCR) -**feat(proxy)** : Registre proxy, API de gestion et généralisation des limites de quota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)** : Supprimez les champs spécifiques à Claude (`metadata`, `anthropic_version`) lorsque la cible est OpenAI-compat (#421, @prakersh) -**fix(sse)** : Extraire l'utilisation de Claude SSE (`input_tokens`, `output_tokens`, jetons de cache) en mode flux passthrough (#420, @prakersh) -**fix(sse)** : Générer un `call_id` de secours pour les appels d'outils avec des ID manquants/vides (#419, @prakersh) -**fix(sse)** : passage de Claude à Claude — corps avant complètement intact, pas de retraduction (#418, @prakersh) -**fix(sse)** : Filtrer les éléments `tool_result` orphelins après le compactage du contexte Claude Code pour éviter 400 erreurs (#417, @prakersh) -**fix(sse)** : Ignorer les appels d'outil de nom vide dans le traducteur de l'API Responses pour empêcher les boucles infinies `placeholder_tool` (#415, @prakersh) -**fix(sse)** : Supprimez les blocs de contenu de texte vides avant la traduction (#427, @prakersh) -**fix(api)** : Ajouter `refreshable: true` à la configuration de test Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` et les devDependencies associées (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Correctif : compatibilité Turbopack/Docker — supprimez le protocole `node:` de toutes les importations `src/`.### 🐛 Bug Fixes

-**fix(build)** : Suppression du préfixe de protocole `node:` des instructions `import` dans 17 fichiers sous `src/`. Les importations `node:fs`, `node:path`, `node:url`, `node:os` etc. provoquaient `le fichier Ecmascript avait une erreur` sur les versions Turbopack (Next.js 15 Docker) et sur les mises à niveau des anciennes installations globales npm. Fichiers concernés : `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` et 12 autres dans `src/app/api/` et `src/lib/`. -**chore(workflow)** : mise à jour de `generate-release.md` pour rendre la synchronisation de Docker Hub et le déploiement de double VPS**obligatoires**dans chaque version.---

## [2.6.5] — 2026-03-17

> Sprint : filtrage des paramètres du modèle de raisonnement, correctif 404 du fournisseur local, fournisseur Kilo Gateway, sauts de dépendances.### ✨ New Features

-**feat(api)** : Ajout de**Kilo Gateway**(`api.kilo.ai`) en tant que nouveau fournisseur de clé API (alias `kg`) — plus de 335 modèles, 6 modèles gratuits, 3 modèles de routage automatique (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modèles Passthrough pris en charge via le point de terminaison `/api/gateway/models`. (RP #408 par @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)** : Supprime les paramètres non pris en charge pour les modèles de raisonnement (o1, o1-mini, o1-pro, o3, o3-mini). Les modèles de la famille `o1`/`o3` rejettent `temperature`, `top_p`, ` Frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` et `n` avec HTTP 400. Les paramètres sont désormais supprimés au niveau de la couche `chatCore` avant le transfert. Utilise un champ déclaratif `unsupportedParams` par modèle et une carte O(1) précalculée pour la recherche. (RP #412 par @Regis-RCR) -**fix(sse)** : le fournisseur local 404 entraîne désormais un**verrouillage du modèle uniquement (5 secondes)**au lieu d'un verrouillage au niveau de la connexion (2 minutes). Lorsqu'un backend d'inférence local (Ollama, LM Studio, oMLX) renvoie 404 pour un modèle inconnu, la connexion reste active et les autres modèles continuent de fonctionner immédiatement. Corrige également un bug préexistant où `model` n'était pas transmis à `markAccountUnavailable()`. Fournisseurs locaux détectés via le nom d'hôte (`localhost`, `127.0.0.1`, `::1`, extensible via la variable d'environnement `LOCAL_HOSTNAMES`). (RP #410 par @Regis-RCR)### 📦 Dependencies

- `meilleur-sqlite3` 12.6.2 → 12.8.0
- `undics` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)** : Suppression des noms de modèles inexistants chez 5 fournisseurs : -**gemini / gemini-cli** : suppression de `gemini-3.1-pro/flash` et `gemini-3-*-preview` (n'existent pas dans l'API Google v1beta) ; remplacé par `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravité** : suppression de `gemini-3.1-pro-high/low` et `gemini-3-flash` (alias internes invalides) ; remplacé par de vrais modèles 2.x -**github (Copilot)** : suppression de `gemini-3-flash-preview` et `gemini-3-pro-preview` ; remplacé par `gemini-2.5-flash` -**nvidia** : correction de `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM utilise l'espace de noms `meta/` pour les modèles Meta) ; ajout de `nvidia/llama-3.1-70b-instruct` et `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)** : mise à jour du combo `free-stack` sur la base de données distante : suppression de `qw/qwen3-coder-plus` (jeton d'actualisation expiré), correction de `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, correction de `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, ajout de `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint : bande de hachage zod/pino intégrée au pipeline de construction, fournisseur synthétique ajouté, chemin VPS PM2 corrigé.### 🐛 Bug Fixes

-**fix(build)** : la bande de hachage Turbopack s'exécute désormais au**temps de compilation**pour TOUS les packages — pas seulement `better-sqlite3`. L'étape 5.6 de `prepublish.mjs` parcourt chaque `.js` dans `app/.next/server/` et supprime le suffixe hexadécimal de 16 caractères de tout `require()` haché. Corrige `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND sur les installations globales de npm. Ferme #398 -**fix(deploy)** : PM2 sur les deux VPS pointait vers des répertoires git-clone obsolètes. Reconfiguré en « app/server.js » dans le package global npm. Mise à jour du workflow `/deploy-vps` pour utiliser `npm pack + scp` (le registre npm rejette les packages de 299 Mo).### Fonctionnalités

-**feat(provider)** : Synthetic ([synthetic.new](https://synthetic.new)) — inférence compatible OpenAI axée sur la confidentialité. `passthroughModels : true` pour le catalogue de modèles dynamiques HuggingFace. Modèles initiaux : Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (RP #404 par @Regis-RCR)### 📋 Issues Closed

-**fermer #398** : régression de hachage npm — corrigée par une bande de hachage au moment de la compilation lors de la prépublication -**triage #324** : capture d'écran du bug sans étapes — détails de reproduction demandés---

## [2.6.2] — 2026-03-16

> Sprint : hachage de module entièrement corrigé, 2 PR fusionnés (filtre d'outils Anthropic + chemins de points de terminaison personnalisés), ajout du fournisseur Alibaba Cloud DashScope, 3 problèmes obsolètes résolus.### 🐛 Bug Fixes

-**fix(build)** : bande de hachage `externals` du webpack étendue pour couvrir TOUS les `serverExternalPackages`, pas seulement `better-sqlite3`. Next.js 16 Turbopack hache « zod », « pino » et tous les autres packages externes au serveur en des noms tels que « zod-dcb22c6336e0bc69 » qui n'existent pas dans « node_modules » au moment de l'exécution. Un fourre-tout regex HASH_PATTERN supprime désormais le suffixe de 16 caractères et revient au nom du package de base. Également ajouté `NEXT_PRIVATE_BUILD_WORKER=0` dans `prepublish.mjs` pour renforcer le mode webpack, ainsi qu'une analyse post-build qui signale toutes les références hachées restantes. (#396, #398, RP #403) -**fix(chat)** : les noms d'outils au format Anthropic (`tool.name` sans wrapper `.function`) ont été silencieusement supprimés par le filtre de nom vide introduit dans #346. LiteLLM proxy les requêtes avec le préfixe `anthropic/` au format API Anthropic Messages, ce qui fait que tous les outils sont filtrés et qu'Anthropic renvoie `400 : tool_choice.any ne peut être spécifié que lors de la fourniture d'outils`. Corrigé en revenant à `tool.name` lorsque `tool.function.name` est absent. Ajout de 8 tests unitaires de régression. (RP #397)### Fonctionnalités

-**feat(api)** : chemins de points de terminaison personnalisés pour les nœuds de fournisseur compatibles OpenAI — configurez `chatPath` et `modelsPath` par nœud (par exemple `/v4/chat/completions`) dans l'interface utilisateur de connexion du fournisseur. Inclut une migration de base de données (`003_provider_node_custom_paths.sql`) et une désinfection du chemin d'URL (pas de traversée `..`, doit commencer par `/`). (RP #400) -**feat(provider)** : Alibaba Cloud DashScope ajouté en tant que fournisseur compatible OpenAI. Point de terminaison international : `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modèles : `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth : clé API du porteur.### 📋 Issues Closed

-**fermer #323** : Erreur de connexion Cline `[object Object]` — corrigée dans la v2.3.7 ; a demandé à l'utilisateur de mettre à niveau à partir de la version 2.2.9 -**fermer #337** : Suivi du crédit Kiro — implémenté dans la v2.5.5 (#381) ; a pointé l'utilisateur vers le tableau de bord → Utilisation -**triage #402** : ARM64 macOS DMG endommagé — version macOS demandée, erreur exacte et solution de contournement conseillée `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Correctif de démarrage critique : les installations globales de npm v2.6.0 se sont écrasées avec une erreur 500 en raison d'un bogue de hachage du nom du module Turbopack/webpack dans le hook d'instrumentation Next.js 16.### 🐛 Bug Fixes

-**fix(build)** : force `better-sqlite3` à toujours être requis par son nom exact de package dans le bundle du serveur webpack. Next.js 16 a compilé le hook d'instrumentation dans un morceau séparé et a émis `require('better-sqlite3-<hash>')` — un nom de module haché qui n'existe pas dans `node_modules` — même si le package était répertorié dans `serverExternalPackages`. Ajout d'une fonction « externals » explicite à la configuration du webpack du serveur afin que le bundler émette toujours « require('better-sqlite3') », résolvant l'erreur de démarrage « 500 Internal Server Error » sur les installations globales propres. (#394, RP #395)### 🔧 CI

-**ci** : Ajout de `workflow_dispatch` à `npm-publish.yml` avec protection de synchronisation de version pour les déclencheurs manuels (#392) -**ci** : ajout de `workflow_dispatch` à `docker-publish.yml`, mise à jour des actions GitHub vers les dernières versions (#392)---

## [2.6.0] - 2026-03-15

> Sprint de résolution des problèmes : 4 bugs corrigés, logs UX améliorés, suivi des crédits Kiro ajouté.### 🐛 Bug Fixes

-**fix(media)** : ComfyUI et SD WebUI n'apparaissent plus dans la liste des fournisseurs de pages Media lorsqu'ils ne sont pas configurés — récupère `/api/providers` lors du montage et masque les fournisseurs locaux sans connexion (#390) -**fix(auth)** : le round-robin ne resélectionne plus les comptes à débit limité immédiatement après le temps de recharge — `backoffLevel` est désormais utilisé comme clé de tri primaire dans la rotation LRU (#340) -**fix(oauth)** : Qoder (et d'autres fournisseurs qui redirigent vers leur propre interface utilisateur) ne laissent plus le modal OAuth bloqué sur "En attente d'autorisation" — transitions automatiques du détecteur à fermeture contextuelle vers le mode de saisie manuelle d'URL (#344) -**fix(logs)** : La table du journal des requêtes est désormais lisible en mode clair — les badges d'état, le nombre de jetons et les balises combinées utilisent des classes de couleurs adaptatives `dark:` (#378)### Fonctionnalités

-**feat(kiro)** : suivi des crédits Kiro ajouté à l'outil de récupération d'utilisation — requêtes `getUserCredits` à partir du point de terminaison AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)** : `test:plan3`, `test:fixes`, `test:security` alignés pour utiliser le même chargeur `tsx/esm` que `npm test` — élimine les faux négatifs de résolution de module dans les exécutions ciblées (PR #386)---

## [2.5.9] - 2026-03-15

> Correction du passthrough natif du Codex + renforcement de la validation du corps de la route.### 🐛 Bug Fixes

-**fix(codex)** : Préserver le relais de l'API Responses native pour les clients Codex – évite les mutations de traduction inutiles (PR #387) -**fix(api)** : Valider les corps de requête sur les itinéraires de tarification/synchronisation et de routage des tâches — évite les plantages dus à des entrées mal formées (PR #388) -**fix(auth)** : les secrets JWT persistent lors des redémarrages via `src/lib/db/secrets.ts` — élimine les erreurs 401 après le redémarrage de pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Correctif de build : restaurez la connectivité VPS interrompue par la publication incomplète de la v2.5.7.### 🐛 Bug Fixes

-**fix(build)** : `scripts/prepublish.mjs` utilisait toujours l'indicateur obsolète `--webpack` provoquant l'échec silencieux de la construction autonome de Next.js — publication npm terminée sans `app/server.js`, interrompant le déploiement VPS---

## [2.5.7] - 2026-03-15

> Corrections de gestion des erreurs de Media Playground.### 🐛 Bug Fixes

-**fix(media)** : Transcription "API Key Required" faux positif lorsque l'audio ne contient aucune parole (musique, silence) — affiche désormais "Aucune parole détectée" à la place -**fix(media)** : `upstreamErrorResponse` dans `audioTranscription.ts` et `audioSpeech.ts` renvoie désormais le JSON approprié (`{error:{message}}`), permettant une détection correcte des erreurs d'identification 401/403 dans MediaPageClient -**fix(media)** : `parseApiError` gère désormais le champ `err_msg` de Deepgram et détecte `"api key"` dans les messages d'erreur pour une classification précise des erreurs d'identification---

## [2.5.6] - 2026-03-15

> Correctifs critiques de sécurité/d'authentification : Antigravity OAuth cassé + sessions JWT perdues après le redémarrage.### 🐛 Bug Fixes

-**fix(oauth) #384** : Antigravity Google OAuth envoie désormais correctement `client_secret` au point de terminaison du jeton. La solution de secours pour `ANTIGRAVITY_OAUTH_CLIENT_SECRET` était une chaîne vide, ce qui est faux — donc `client_secret` n'a jamais été inclus dans la requête, provoquant des erreurs `"client_secret est manquant"` pour tous les utilisateurs sans variable d'environnement personnalisée. Ferme le numéro 383. -**fix(auth) #385** : `JWT_SECRET` est désormais conservé dans SQLite (`namespace='secrets'`) lors de la première génération et rechargé lors des démarrages suivants. Auparavant, un nouveau secret aléatoire était généré à chaque démarrage du processus, invalidant tous les cookies/sessions existants après tout redémarrage ou mise à niveau. Affecte à la fois `JWT_SECRET` et `API_KEY_SECRET`. Ferme le numéro 382.---

## [2.5.5] - 2026-03-15

> Correction de la déduplication de la liste de modèles, renforcement de la construction autonome d'Electron et suivi des crédits Kiro.### 🐛 Bug Fixes

-**fix(models) #380** : `GET /api/models` inclut désormais les alias de fournisseur lors de la construction du filtre de fournisseur actif — les modèles pour `claude` (alias `cc`) et `github` (alias `gh`) étaient toujours affichés, qu'une connexion ait été configurée ou non, car les clés `PROVIDER_MODELS` sont des alias mais les connexions à la base de données sont stockées sous les ID de fournisseur. Corrigé en développant chaque ID de fournisseur actif pour inclure également son alias via `PROVIDER_ID_TO_ALIAS`. Ferme le numéro 353. -**fix(electron) #379** : Le nouveau `scripts/prepare-electron-standalone.mjs` met en scène un bundle `/.next/electron-standalone` dédié avant le packaging d'Electron. Abandonne avec une erreur claire si `node_modules` est un lien symbolique (electron-builder enverrait une dépendance d'exécution sur la machine de construction). Désinfection des chemins multiplateformes via `path.basename`. Par @kfiramar.### ✨ New Features

-**feat(kiro) #381** : Suivi du solde créditeur Kiro — le point de terminaison d'utilisation renvoie désormais les données de crédit pour les comptes Kiro en appelant « codewhisperer.us-east-1.amazonaws.com/getUserCredits » (le même point de terminaison que Kiro IDE utilise en interne). Renvoie les crédits restants, l'allocation totale, la date de renouvellement et le niveau d'abonnement. Ferme le numéro 337.## [2.5.4] - 2026-03-15

> Correctif de démarrage de l'enregistreur, correctif de sécurité d'amorçage de connexion et amélioration de la fiabilité du développement HMR. Infrastructure CI renforcée.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376** : Restaurer le chemin de l'enregistreur de transport pino — `formatters.level` combiné avec `transport.targets` est rejeté par pino. Les configurations basées sur le transport suppriment désormais le formateur de niveau via `getTransportCompatibleConfig()`. Corrige également le mappage de niveau numérique dans `/api/logs/console` : `30→info, 40→warn, 50→error` (a été décalé de un). -**fix(login) #375** : la page de connexion démarre désormais à partir du point de terminaison public `/api/settings/require-login` au lieu du point de terminaison protégé `/api/settings`. Dans les configurations protégées par mot de passe, la page de pré-autorisation recevait un 401 et revenait inutilement aux valeurs par défaut sûres. La route publique renvoie désormais toutes les métadonnées d'amorçage (`requireLogin`, `hasPassword`, `setupComplete`) avec un repli conservateur de 200 en cas d'erreur. -**fix(dev) #374** : Ajoutez `localhost` et `127.0.0.1` à `allowedDevOrigins` dans `next.config.mjs` — La websocket HMR était bloquée lors de l'accès à l'application via une adresse de bouclage, produisant des avertissements répétés d'origine croisée.### 🔧 CI & Infrastructure

-**Correction ESLint MOO** : `eslint.config.mjs` ignore désormais `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` et `clipr/**` — ESLint plantait avec un MOO de tas JS en analysant les blobs binaires VS Code et les morceaux compilés. -**Correction de test unitaire** : suppression de `ALTER TABLE supplier_connections ADD COLUMN "group"` de 2 fichiers de test — la colonne fait désormais partie du schéma de base (ajouté dans #373), provoquant `SQLITE_ERROR : nom de colonne en double` à chaque exécution de CI. -**Hook de pré-commit** : Ajout de `npm run test:unit` à `.husky/pre-commit` — les tests unitaires bloquent désormais les commits rompus avant qu'ils n'atteignent CI.## [2.5.3] - 2026-03-14

> Corrections de bugs critiques : migration du schéma de base de données, chargement de l'environnement de démarrage, suppression de l'état d'erreur du fournisseur et correction de l'info-bulle i18n. Améliorations de la qualité du code en plus de chaque PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373** : Ajout de la colonne `provider_connections.group` au schéma de base + migration de remplissage pour les bases de données existantes — la colonne était utilisée dans toutes les requêtes mais manquait dans la définition du schéma -**fix(i18n) #371** : Remplacez la clé `t("deleteConnection")` inexistante par la clé `providers.delete` existante — corrige l'erreur d'exécution `MISSING_MESSAGE : Providers.deleteConnection` sur la page de détails du fournisseur -**fix(auth) #372** : Effacer les métadonnées d'erreur obsolètes (`errorCode`, `lastErrorType`, `lastErrorSource`) des comptes du fournisseur après une véritable récupération — auparavant, les comptes récupérés apparaissaient comme ayant échoué -**fix(startup) #369** : Unifiez le chargement de l'environnement entre `npm run start`, `run-standalone.mjs` et Electron pour respecter la priorité `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — empêche de générer un nouveau `STORAGE_ENCRYPTION_KEY` sur une base de données cryptée existante### 🔧 Code Quality

- Modèles documentés `result.success` et `response?.ok` dans `auth.ts` (tous deux intentionnels, maintenant expliqués)
- `overridePath?.trim()` normalisé dans `electron/main.js` pour correspondre à `bootstrap-env.mjs`
- Ajout du commentaire sur l'ordre de fusion `preferredEnv` au démarrage d'Electron

> Politique de quota de compte Codex avec rotation automatique, basculement rapide de niveau, modèle gpt-5.4 et correction des étiquettes d'analyse.### ✨ New Features (PRs #366, #367, #368)

-**Politique de quota du Codex (PR #366)** : la fenêtre de quota de 5 heures/hebdomadaire par compte bascule dans le tableau de bord du fournisseur. Les comptes sont automatiquement ignorés lorsque les fenêtres activées atteignent le seuil de 90 % et réadmis après `resetAt`. Inclut « quotaCache.ts » avec un getter de statut sans effets secondaires. -**Bascule de niveau rapide Codex (PR #367)** : Tableau de bord → Paramètres → Niveau de service Codex. La bascule par défaut injecte `service_tier: "flex"` uniquement pour les requêtes Codex, réduisant ainsi le coût d'environ 80 %. Pile complète : onglet UI + point de terminaison API + exécuteur + traducteur + restauration de démarrage. -**Modèle gpt-5.4 (PR #368)** : ajoute `cx/gpt-5.4` et `codex/gpt-5.4` au registre des modèles Codex. Test de régression inclus.### 🐛 Bug Fixes

-**correctif n°356** : les graphiques d'analyse (principal fournisseur, par compte, répartition des fournisseurs) affichent désormais les noms/étiquettes des fournisseurs lisibles par l'homme au lieu des identifiants internes bruts pour les fournisseurs compatibles OpenAI.

> Version majeure : stratégie de routage strictement aléatoire, contrôles d'accès aux clés API, groupes de connexion, synchronisation des prix externes et corrections de bogues critiques pour les modèles de réflexion, les tests combinés et la validation des noms d'outils.### ✨ New Features (PRs #363 & #365)

-**Stratégie de routage strictement aléatoire** : jeu de lecture aléatoire Fisher-Yates avec garantie anti-répétition et sérialisation mutex pour les demandes simultanées. Decks indépendants par combo et par fournisseur. -**Contrôles d'accès aux clés API** : `allowedConnections` (restreindre les connexions qu'une clé peut utiliser), `is_active` (activer/désactiver la clé avec 403), `accessSchedule` (contrôle d'accès basé sur le temps), bascule `autoResolve`, renommer les clés via PATCH. -**Groupes de connexion** : regroupez les connexions des fournisseurs par environnement. Vue accordéon dans la page Limites avec persistance localStorage et commutateur automatique intelligent. -**Synchronisation de tarification externe (LiteLLM)** : résolution de tarification à 3 niveaux (remplacements utilisateur → synchronisé → valeurs par défaut). Inscrivez-vous via `PRICING_SYNC_ENABLED=true`. Outil MCP `omniroute_sync_pricing`. 23 nouveaux essais. -**i18n** : 30 langues mises à jour avec une stratégie strictement aléatoire, des chaînes de gestion des clés API. pt-BR entièrement traduit.### 🐛 Bug Fixes

-**correctif #355** : le délai d'inactivité du flux est passé de 60 s à 300 s – empêche l'abandon des modèles de réflexion étendue (claude-opus-4-6, o3, etc.) pendant de longues phases de raisonnement. Configurable via `STREAM_IDLE_TIMEOUT_MS`. -**correctif #350** : le test combiné contourne désormais `REQUIRE_API_KEY=true` à l'aide de l'en-tête interne et utilise le format compatible OpenAI de manière universelle. Timeout extended from 15s to 20s. -**correctif #346** : Les outils avec `function.name` vide (transmis par Claude Code) sont désormais filtrés avant que les fournisseurs en amont ne les reçoivent, évitant ainsi les erreurs "Invalid input[N].name : chaîne vide".### 🗑️ Closed Issues

-**#341** : Section de débogage supprimée — le remplacement est `/dashboard/logs` et `/dashboard/health`.

> Prise en charge de l'API Key Round-Robin pour les configurations de fournisseurs multi-clés et confirmation du routage générique et de la fenêtre de quota déjà en place.### ✨ New Features

-**API Key Round-Robin (T07)** : les connexions du fournisseur peuvent désormais contenir plusieurs clés API (Modifier la connexion → Clés API supplémentaires). Les requêtes tournent à tour de rôle entre les clés primaires et supplémentaires via `providerSpecificData.extraApiKeys[]`. Les clés sont conservées en mémoire, indexées par connexion — aucune modification du schéma de base de données n'est requise.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)** : `wildcardRouter.ts` avec correspondance de caractères génériques de style global (`gpt*`, `claude-?-sonnet`, etc.) est déjà intégré dans `model.ts` avec classement de spécificité. -**Quota Window Rolling (T08)** : `accountFallback.ts:isModelLocked()` fait déjà avancer automatiquement la fenêtre — si `Date.now() > Entry.until`, le verrou est supprimé immédiatement (pas de blocage obsolète).

> Amélioration de l'interface utilisateur, ajouts de stratégie de routage et gestion gracieuse des erreurs pour les limites d'utilisation.### ✨ New Features

-**Stratégies de routage Fill-First et P2C** : ajout de « fill-first » (quota de vidange avant de continuer) et « p2c » (sélection à faible latence Power-of-Two-Choices) au sélecteur de stratégie combo, avec des panneaux de guidage complets et des badges à code couleur. -**Modèles prédéfinis Free Stack** : La création d'une combinaison avec le modèle Free Stack remplit désormais automatiquement les 7 meilleurs modèles de fournisseurs gratuits (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Les utilisateurs activent simplement les fournisseurs et obtiennent un combo prêt à l’emploi à 0 $/mois. -**Modal de combo plus large** : le modal de combo Créer/Modifier utilise désormais `max-w-4xl` pour une édition confortable de grands combos.### 🐛 Bug Fixes

-**Page de limites HTTP 500 pour Codex et GitHub** : `getCodexUsage()` et `getGitHubUsage()` renvoient désormais un message convivial lorsque le fournisseur renvoie 401/403 (jeton expiré), au lieu de lancer et de provoquer une erreur 500 sur la page Limites. -**MaintenanceBanner faux positif** : la bannière n'affiche plus "Le serveur est inaccessible" de manière fallacieuse lors du chargement de la page. Corrigé en appelant `checkHealth()` immédiatement lors du montage et en supprimant la fermeture obsolète de l'état `show`. -**Info-bulles des icônes du fournisseur** : les boutons d'icône Modifier (crayon) et supprimer dans la ligne de connexion du fournisseur ont désormais des info-bulles HTML natives – les 6 icônes d'action sont désormais auto-documentées.

> Plusieurs améliorations liées à l'analyse des problèmes de la communauté, à la prise en charge de nouveaux fournisseurs, aux corrections de bogues pour le suivi des jetons, le routage des modèles et la fiabilité du streaming.### ✨ New Features

-**Task-Aware Smart Routing (T05)** : sélection automatique de modèle en fonction du type de contenu de la demande – codage → deepseek-chat, analyse → gemini-2.5-pro, vision → gpt-4o, résumé → gemini-2.5-flash. Configurable via les paramètres. Nouvelle API `GET/PUT/POST /api/settings/task-routing`. -**Fournisseur HuggingFace** : ajout du routeur HuggingFace en tant que fournisseur compatible OpenAI avec Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Vertex AI Provider** : Ajout du fournisseur Vertex AI (Google Cloud) avec Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex. -**Téléchargements de fichiers Playground** : téléchargement audio pour la transcription, téléchargement d'images pour les modèles de vision (détection automatique par nom de modèle), rendu d'image en ligne pour les résultats de génération d'images. -**Commentaires visuels de sélection de modèle** : les modèles déjà ajoutés dans le sélecteur de combinaison affichent désormais ✓ un badge vert – évite toute confusion en double. -**Compatibilité Qwen (PR #352)** : mise à jour des paramètres d'empreinte digitale de l'agent utilisateur et de la CLI pour la compatibilité du fournisseur Qwen. -**Gestion de l'état Round-Robin (PR #349)** : logique de round-robin améliorée pour gérer les comptes exclus et maintenir correctement l'état de rotation. -**Clipboard UX (PR #360)** : opérations de presse-papiers renforcées avec repli pour les contextes non sécurisés ; Améliorations de la normalisation de l'outil Claude.### 🐛 Bug Fixes

-**Correction n°302 — OpenAI SDK stream=False supprime tool_calls**: T01 Accepter la négociation d'en-tête ne force plus le streaming lorsque `body.stream` est explicitement `false`. Provoquait la suppression silencieuse de tool_calls lors de l'utilisation du SDK OpenAI Python en mode sans streaming. -**Correction #73 — Claude Haiku acheminé vers OpenAI sans préfixe de fournisseur** : les modèles `claude-*` envoyés sans préfixe de fournisseur sont désormais correctement acheminés vers le fournisseur `antigravité` (Anthropique). Ajout de l'heuristique `gemini-*`/`gemma-*` → `gemini` également. -**Correction #74 — Le nombre de jetons est toujours 0 pour le streaming Antigravity/Claude** : L'événement SSE `message_start` qui transporte `input_tokens` n'était pas analysé par `extractUsage()`, ce qui entraînait une baisse de tous les comptes de jetons d'entrée. Le suivi des jetons d’entrée/sortie fonctionne désormais correctement pour les réponses en continu. -**Correction n°180 — Doublons d'importation de modèles sans retour** : `ModelSelectModal` affiche désormais une surbrillance verte pour les modèles déjà dans le combo, ce qui rend évident qu'ils sont déjà ajoutés. -**Erreurs de génération de pages multimédia** : les résultats de l'image s'affichent désormais sous forme de balises `<img>` au lieu de JSON brut. Résultats de transcription affichés sous forme de texte lisible. Les erreurs d’informations d’identification affichent une bannière orange au lieu d’un échec silencieux. -**Bouton d'actualisation du jeton sur la page du fournisseur** : ajout de l'interface utilisateur d'actualisation manuelle du jeton pour les fournisseurs OAuth.### 🔧 Improvements

-**Provider Registry** : HuggingFace et Vertex AI ajoutés à `providerRegistry.ts` et `providers.ts` (frontend). -**Read Cache** : Nouveau `src/lib/db/readCache.ts` pour une mise en cache efficace des lectures de base de données. -**Quota Cache** : cache de quota amélioré avec expulsion basée sur TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fichier                                       | Objectif                                                   |
| --------------------------------------------- | ---------------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logique de routage sensible aux tâches (7 types de tâches) |
| `src/app/api/settings/task-routing/route.ts`  | API de configuration de routage des tâches                 |
| `src/app/api/providers/[id]/refresh/route.ts` | Actualisation manuelle du jeton OAuth                      |
| `src/lib/db/readCache.ts`                     | Cache de lecture de base de données efficace               |
| `src/shared/utils/clipboard.ts`               | Presse-papiers renforcé avec repli                         | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combos modaux : Free Stack visible et proéminent**— Le modèle Free Stack était masqué (4e sur une grille à 3 colonnes). Corrigé : déplacé en position 1, basculé vers une grille 2x2 pour que les 4 modèles soient visibles, bordure verte + surbrillance de badge GRATUITE.## [2.4.0] - 2026-03-13

> **Version majeure**— Écosystème Free Stack, refonte du terrain de jeu de transcription, plus de 44 fournisseurs, documentation complète de niveau gratuit et améliorations de l'interface utilisateur à tous les niveaux.### Fonctionnalités

-**Combos : modèle Free Stack**— Nouveau 4ème modèle "Free Stack ($0)" utilisant le round-robin sur Kiro + Qoder + Qwen + Gemini CLI. Suggère le combo prédéfini sans coût lors de la première utilisation.
-**Médias/Transcription : Deepgram par défaut**— Deepgram (Nova 3, 200 $ gratuit) est désormais le fournisseur de transcription par défaut. AssemblyAI (50 $ gratuits) et Groq Whisper (gratuit pour toujours) présentés avec des badges de crédit gratuits. -**README : section "Démarrer gratuitement"** – Nouveau tableau en 5 étapes du premier README montrant comment configurer une IA sans coût en quelques minutes. -**README : Combo de transcription gratuit**— Nouvelle section avec suggestion de combo Deepgram/AssemblyAI/Groq et détails de crédit gratuit par fournisseur. -**providers.ts : drapeau hasFree**— NVIDIA NIM, Cerebras et Groq marqués du badge hasFree et freeNote pour l'interface utilisateur des fournisseurs. -**i18n : clés templateFreeStack** – Modèle combiné Free Stack traduit et synchronisé dans les 30 langues.## [2.3.16] - 2026-03-13

### Documentation

-**README : 44+ Providers**— Mise à jour des 3 occurrences de "36+ supplier" vers "44+" reflétant le nombre réel de bases de code (44 fournisseurs dans fournisseurs.ts) -**LISEZMOI : Nouvelle section « 🆓 Modèles gratuits — Ce que vous obtenez réellement »**— Ajout d'un tableau de 7 fournisseurs avec des limites de débit par modèle pour : Kiro (Claude illimité via AWS Builder ID), Qoder (5 modèles illimités), Qwen (4 modèles illimités), Gemini CLI (180 000 /mois), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1 M de tok/jour / 60 000 TPM), Groq (30 tr/min / 14,4 000 tr/min). Inclut la recommandation combinée \/usr/bin/bash Ultimate Free Stack. -**README : Tableau de tarification mis à jour**— Ajout de Cerebras au niveau API KEY, correction de NVIDIA de "1 000 crédits" à "dev-forever free", mise à jour du nombre et des noms des modèles Qoder/Qwen -**README : Modèles Qoder 8→5**(nommés : kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README : modèles Qwen 3→4**(nommés : qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Fonctionnalités

-**Tableau de bord Auto-Combo (Tier Priority)** : Ajout de `🏷️ Tier` comme 7ème étiquette de facteur de notation dans l'affichage de répartition des facteurs `/dashboard/auto-combo` — les 7 facteurs de notation Auto-Combo sont désormais visibles. -**i18n — section autoCombo** : Ajout de 20 nouvelles clés de traduction pour le tableau de bord Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) pour les 30 fichiers de langue.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)** : restauration de la valeur par défaut valide `clientSecret` — qui était auparavant une chaîne vide, provoquant des « informations d'identification client incorrectes » à chaque tentative de connexion. L'identifiant public est désormais la solution de secours par défaut (remplaçable via la variable d'environnement `QODER_OAUTH_CLIENT_SECRET`). -**Serveur MITM introuvable (#335)** : `prepublish.mjs` compile désormais `src/mitm/*.ts` en JavaScript en utilisant `tsc` avant de le copier dans le bundle npm. Auparavant, seuls les fichiers bruts « .ts » étaient copiés, ce qui signifie que « server.js » n'existait jamais dans les installations globales npm/Volta. -**GeminiCLI manquant projectId (#338)** : Au lieu de générer une erreur matérielle 500 lorsque `projectId` est manquant dans les informations d'identification stockées (par exemple après le redémarrage de Docker), OmniRoute enregistre désormais un avertissement et tente la requête - renvoyant une erreur significative côté fournisseur au lieu d'un crash d'OmniRoute. -**Incompatibilité de version d'Electron (#323)** : synchronisation de la version `electron/package.json` avec `2.3.13` (auparavant `2.0.13`) afin que la version binaire de bureau corresponde au package npm.### ✨ New Models (#334)

-**Kiro** : `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Codex** : `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)** : Ajout de `tierPriority` (poids `0,05`) au schéma Zod `ScoringWeights` et à la route API `combos/auto` — le 7ème facteur de notation est désormais entièrement accepté par l'API REST et validé en entrée. Poids de « stabilité » ajusté de « 0,10 » à « 0,05 » pour conserver la somme totale = « 1,0 ».### ✨ New Features

-**Score de quota à plusieurs niveaux (Combo automatique)** : ajout de « tierPriority » comme 7ème facteur de notation — les comptes avec les niveaux Ultra/Pro sont désormais préférés aux niveaux gratuits lorsque les autres facteurs sont égaux. Nouveaux champs facultatifs `accountTier` et `quotaResetIntervalSecs` sur `ProviderCandidate`. Les 4 packs de modes ont été mis à jour (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`). -**Repli de modèle intra-familial (T5)** : Lorsqu'un modèle est indisponible (404/400/403), OmniRoute revient désormais automatiquement aux modèles frères de la même famille avant de renvoyer une erreur (`modelFamilyFallback.ts`). -**Délai d'expiration du pont API configurable** : la variable d'environnement `API_BRIDGE_PROXY_TIMEOUT_MS` permet aux opérateurs de régler le délai d'expiration du proxy (30 s par défaut). Corrige les erreurs 504 sur les réponses lentes en amont. (#332) -**Star History** : remplacement du widget star-history.com par starchart.cc (`?variant=adaptive`) dans les 30 README — s'adapte au thème clair/sombre, mises à jour en temps réel.### 🐛 Bug Fixes

-**Auth — Premier mot de passe** : la variable d'environnement `INITIAL_PASSWORD` est désormais acceptée lors de la définition du premier mot de passe du tableau de bord. Utilise `timingSafeEqual` pour une comparaison à temps constant, empêchant les attaques temporelles. (#333) -**Troncation README** : Correction d'une balise de fermeture `</details>` manquante dans la section Dépannage qui empêchait GitHub de restituer tout ce qui se trouvait en dessous (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install** : Suppression du remplacement redondant `@swc/helpers` de `package.json` qui était en conflit avec la dépendance directe, provoquant des erreurs `EOVERRIDE` sur pnpm. Ajout de la configuration `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)** : Ajout du validateur `isSafePath()` dans `cliRuntime.ts` pour bloquer la traversée du chemin et les métacaractères du shell dans les variables d'environnement `CLI_*_BIN`. -**CI** : `package-lock.json` régénéré après la suppression du remplacement pour corriger les échecs `npm ci` sur les actions GitHub.### 🔧 Improvements

-**Format de réponse (T1)** : `response_format` (json_schema/json_object) désormais injecté en tant qu'invite système pour Claude, permettant une compatibilité de sortie structurée. -**429 Retry (T2)** : nouvelle tentative intra-URL pour 429 réponses (2 tentatives avec un délai de 2 s) avant de revenir à l'URL suivante. -**En-têtes Gemini CLI (T3)** : Ajout des en-têtes d'empreintes digitales `User-Agent` et `X-Goog-Api-Client` pour la compatibilité Gemini CLI. -**Catalogue de tarification (T9)** : Ajout des entrées de tarification `deepseek-3.1`, `deepseek-3.2` et `qwen3-coder-next`.### 📁 New Files

| Fichier                                    | Objectif                                                            |
| ------------------------------------------ | ------------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Définitions de familles modèles et logique de repli intra-familiale | ### Fixed |

-**KiloCode** : délai d'expiration du contrôle de santé du kilocode déjà corrigé dans la v2.3.11 -**OpenCode** : ajout d'opencode au registre cliRuntime avec un délai d'expiration du contrôle de santé de 15 s -**OpenClaw / Cursor** : augmente le délai d'expiration du contrôle de santé à 15 s pour les variantes à démarrage lent -**VPS** : installez les packages npm droid et openclaw ; activer CLI_EXTRA_PATHS pour kiro-cli -**cliRuntime** : ajout de l'enregistrement de l'outil opencode et augmentation du délai d'attente pour continuer## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck** : Augmentez `healthcheckTimeoutMs` de 4 000 ms à 15 000 ms — kilocode affiche une bannière de logo ASCII au démarrage provoquant un faux `healthcheck_failed` dans les environnements lents/à démarrage à froid## [2.3.10] - 2026-03-12

### Fixed

-**Lint** : Correction de l'échec de `check:any-budget:t11` — remplacez `as any` par `as Record<string, unknown>` dans OAuthModal.tsx (3 occurrences)### Docs

-**CLI-TOOLS.md** : Guide complet pour les 11 outils CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, curseur, droid, openclaw) -**i18n** : CLI-TOOLS.md synchronisé dans 30 langues avec titre traduit + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions** : nouveau point de terminaison de complétion OpenAI hérité — accepte à la fois la chaîne « invite » et le tableau « messages », normalise automatiquement le format de discussion -**EndpointPage** : affiche désormais les 3 types de points de terminaison compatibles OpenAI : achèvements de chat, API de réponses et achèvements hérités -**i18n** : Ajout de `completionsLegacy/completionsLegacyDesc` à 30 fichiers de langue### Fixed

-**OAuthModal** : correction de « [objet objet] » affiché sur toutes les erreurs de connexion OAuth — extrayez correctement « .message » des objets de réponse d'erreur dans les 3 appels « lancer une nouvelle erreur (data.error) » (échange, code de périphérique, autorisation)

- Affecte Cline, Codex, GitHub, Qwen, Kiro et tous les autres fournisseurs OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth** : ajoutez `decodeURIComponent` avant le décodage en base64 afin que les codes d'authentification codés en URL de l'URL de rappel soient analysés correctement, corrigeant les erreurs de "code d'autorisation invalide ou expiré" sur les configurations à distance (LAN IP) -**Cline OAuth** : `mapTokens` remplit désormais `name = firstName + lastName || email` pour que les comptes Cline affichent de vrais noms d'utilisateur au lieu de "Account #ID" -**Noms de compte OAuth** : tous les flux d'échange OAuth (échange, sondage, rappel d'interrogation) normalisent désormais « nom = e-mail » lorsque le nom est manquant, de sorte que chaque compte OAuth affiche son e-mail comme étiquette d'affichage dans le tableau de bord des fournisseurs. -**Noms de compte OAuth** : Suppression de la solution de secours séquentielle "Compte N" dans `db/providers.ts` — les comptes sans adresse e-mail/nom utilisent désormais une étiquette stable basée sur un identifiant via `getAccountDisplayName()` au lieu d'un numéro séquentiel qui change lorsque les comptes sont supprimés## [2.3.6] - 2026-03-12

### Fixed

-**Lot de tests du fournisseur** : correction du schéma Zod pour accepter `providerId : null` (le frontend envoie null pour les modes non-fournisseur) ; renvoyait incorrectement "Demande invalide" pour tous les tests par lots -**Modal de test du fournisseur** : Correction de l'affichage de « [object Object] » en normalisant les objets d'erreur de l'API en chaînes avant le rendu dans « setTestResults » et « ProviderTestResultsView » -**i18n** : Ajout des clés manquantes `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` à `en.json` -**i18n** : synchronisation de 1 111 clés manquantes dans les 29 fichiers de langue non anglaise en utilisant les valeurs anglaises comme solutions de secours## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers** : Ajout d'un correctif permanent `postinstall` pour copier `@swc/helpers` dans les `node_modules` de l'application autonome — empêche le crash de MODULE_NOT_FOUND lors des installations globales de npm## [2.3.4] - 2026-03-10

### Added

- Intégrations de plusieurs fournisseurs et améliorations du tableau de bord
