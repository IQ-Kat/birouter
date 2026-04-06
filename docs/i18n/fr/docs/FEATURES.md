# OmniRoute — Dashboard Features Gallery (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Guide visuel de chaque section du tableau de bord OmniRoute.---

## 🔌 Providers

Gérez les connexions des fournisseurs d'IA : fournisseurs OAuth (Claude Code, Codex, Gemini CLI), fournisseurs de clés API (Groq, DeepSeek, OpenRouter) et fournisseurs gratuits (Qoder, Qwen, Kiro). Les comptes Kiro incluent le suivi du solde créditeur : crédits restants, allocation totale et date de renouvellement visibles dans Tableau de bord → Utilisation.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Créez des combinaisons de routage de modèles avec 6 stratégies : prioritaire, pondérée, à tour de rôle, aléatoire, la moins utilisée et optimisée en termes de coûts. Chaque combo enchaîne plusieurs modèles avec un repli automatique et comprend des modèles rapides et des contrôles de préparation.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Analyses d'utilisation complètes avec consommation de jetons, estimations de coûts, cartes thermiques d'activité, graphiques de distribution hebdomadaire et répartitions par fournisseur.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Surveillance en temps réel : disponibilité, mémoire, version, centiles de latence (p50/p95/p99), statistiques du cache et états des disjoncteurs du fournisseur.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Quatre modes de débogage des traductions d'API :**Playground**(convertisseur de format),**Chat Tester**(requêtes en direct),**Test Bench**(tests par lots) et**Live Monitor**(flux en temps réel).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testez n’importe quel modèle directement depuis le tableau de bord. Sélectionnez le fournisseur, le modèle et le point de terminaison, rédigez des invites avec Monaco Editor, diffusez les réponses en temps réel, abandonnez en cours de route et affichez les métriques de synchronisation.---

## 🎨 Themes _(v2.0.5+)_

Thèmes de couleurs personnalisables pour l'ensemble du tableau de bord. Choisissez parmi 7 couleurs prédéfinies (corail, bleu, rouge, vert, violet, orange, cyan) ou créez un thème personnalisé en choisissant n'importe quelle couleur hexadécimale. Prend en charge les modes clair, sombre et système.---

## ⚙️ Settings

Panneau de paramètres complet avec onglets :

-**Général**— Stockage système, gestion des sauvegardes (base de données d'exportation/importation) -**Apparence**— Sélecteur de thème (sombre/clair/système), préréglages de thèmes de couleurs et couleurs personnalisées, visibilité du journal de santé, contrôles de visibilité des éléments de la barre latérale -**Sécurité**— Protection des points de terminaison de l'API, blocage des fournisseurs personnalisés, filtrage IP, informations de session -**Routage**— Alias de modèle, dégradation des tâches en arrière-plan -**Résilience**— Persistance des limites de débit, réglage du disjoncteur, désactivation automatique des comptes interdits, surveillance de l'expiration des fournisseurs -**Avancé**— Remplacements de configuration, piste d'audit de configuration, mode de dégradation de repli![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configuration en un clic pour les outils de codage d'IA : Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor et Factory Droid. Comprend l'application/la réinitialisation automatisée de la configuration, les profils de connexion et le mappage de modèle.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Tableau de bord pour découvrir et gérer les agents CLI. Affiche une grille de 14 agents intégrés (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) avec :

-**Statut de l'installation**— Installé/Introuvable avec détection de version -**Badges de protocole**— stdio, HTTP, etc. -**Agents personnalisés**— Enregistrez n'importe quel outil CLI via un formulaire (nom, binaire, commande de version, arguments de spawn) -**CLI Fingerprint Matching**— Bascule par fournisseur pour faire correspondre les signatures de requête CLI natives, réduisant ainsi le risque d'interdiction tout en préservant l'adresse IP du proxy.---

## 🖼️ Media _(v2.0.3+)_

Générez des images, des vidéos et de la musique à partir du tableau de bord. Prend en charge OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open et MusicGen.---

## 📝 Request Logs

Journalisation des demandes en temps réel avec filtrage par fournisseur, modèle, compte et clé API. Affiche les codes d'état, l'utilisation des jetons, la latence et les détails de la réponse.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Votre point de terminaison d'API unifié avec répartition des capacités : achèvements de chat, API de réponses, intégrations, génération d'images, reclassement, transcription audio, synthèse vocale, modérations et clés API enregistrées. Intégration de Cloudflare Quick Tunnel et prise en charge du proxy cloud pour l'accès à distance.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Créez, définissez et révoquez des clés API. Chaque clé peut être limitée à des modèles/fournisseurs spécifiques avec un accès complet ou des autorisations en lecture seule. Gestion visuelle des clés avec suivi de l'utilisation.---

## 📋 Audit Log

Suivi des actions administratives avec filtrage par type d'action, acteur, cible, adresse IP et horodatage. Historique complet des événements de sécurité.---

## 🖥️ Desktop Application

Application de bureau Native Electron pour Windows, macOS et Linux. Exécutez OmniRoute en tant qu'application autonome avec intégration dans la barre d'état système, prise en charge hors ligne, mise à jour automatique et installation en un clic.

Principales caractéristiques :

- Sondage de préparation du serveur (pas d'écran vide au démarrage à froid)
- Barre d'état système avec gestion des ports
- Politique de sécurité du contenu
- Verrouillage à instance unique
- Mise à jour automatique au redémarrage
- Interface utilisateur conditionnelle à la plate-forme (feux de signalisation macOS, barre de titre par défaut Windows/Linux)
- Emballage de build Hardened Electron — les « node_modules » liés symboliquement dans le bundle autonome sont détectés et rejetés avant l'empaquetage, évitant ainsi la dépendance d'exécution sur la machine de build (v2.5.5+)

📖 Voir [`electron/README.md`](../electron/README.md) pour une documentation complète.
