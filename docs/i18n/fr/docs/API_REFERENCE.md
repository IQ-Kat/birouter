# API Reference (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Référence complète pour tous les points de terminaison de l'API OmniRoute.---

## Table of Contents

- [Achèvements du chat](#chat-completions)
- [Embeddings](#embeddings)
- [Génération d'images](#image-génération)
- [Liste des modèles](#list-models)
- [Points de terminaison de compatibilité](#compatibility-endpoints)
- [Cache sémantique](#cache-sémantique)
- [Tableau de bord et gestion](#tableau de bord--gestion)
- [Traitement des demandes](#request-processing)
- [Authentification](#authentification)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| En-tête                  | Itinéraire | Descriptif                                                    |
| ------------------------ | ---------- | ------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Demande    | Définir sur « true » pour contourner le cache                 |
| `X-OmniRoute-Progrès`    | Demande    | Défini sur « true » pour les événements de progression        |
| `X-Session-Id`           | Demande    | Clé de session persistante pour l'affinité de session externe |
| `x_session_id`           | Demande    | Variante de soulignement également acceptée (HTTP direct)     |
| `Clé d'idempotence`      | Demande    | Clé de déduplication (fenêtre 5s)                             |
| `X-Request-Id`           | Demande    | Clé de déduplication alternative                              |
| `X-OmniRoute-Cache`      | Réponse    | `HIT` ou `MISS` (sans streaming)                              |
| `X-OmniRoute-Idempotent` | Réponse    | `true` si dédupliqué                                          |
| `X-OmniRoute-Progrès`    | Réponse    | `activé` si le suivi de la progression est activé             |
| `X-OmniRoute-Session-Id` | Réponse    | ID de session effectif utilisé par OmniRoute                  |

> Remarque Nginx : si vous comptez sur les en-têtes de soulignement (par exemple `x_session_id`), activez `underscores_in_headers on;`.---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Fournisseurs disponibles : Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

Fournisseurs disponibles : OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| Méthode | Chemin                       | Formater                   |
| ------- | ---------------------------- | -------------------------- | ----------------------------- |
| POSTER  | `/v1/chat/completions`       | OpenAI                     |
| POSTER  | `/v1/messages`               | Anthropique                |
| POSTER  | `/v1/réponses`               | Réponses OpenAI            |
| POSTER  | `/v1/intégrations`           | OpenAI                     |
| POSTER  | `/v1/images/générations`     | OpenAI                     |
| OBTENIR | `/v1/modèles`                | OpenAI                     |
| POSTER  | `/v1/messages/count_tokens`  | Anthropique                |
| OBTENIR | `/v1beta/models`             | Gémeaux                    |
| POSTER  | `/v1beta/models/{...chemin}` | Gémeaux générer du contenu |
| POSTER  | `/v1/api/chat`               | Ollama                     | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Le préfixe du fournisseur est ajouté automatiquement s'il est manquant. Les modèles incompatibles renvoient « 400 ».---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Exemple de réponse :```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

| Point de terminaison | Méthode | Descriptif |
| ----------------------------- | ------- | ------------------------------------ |
| `/api/auth/connexion` | POSTER | Connexion |
| `/api/auth/logout` | POSTER | Déconnexion |
| `/api/settings/require-login` | OBTENIR/METTRE | Basculer la connexion requise |### Provider Management

| Point de terminaison | Méthode | Descriptif |
| ---------------------------- | --------------- | -------------------- |
| `/api/providers` | GET/POST        | Lister/créer des prestataires |
| `/api/providers/[id]` | OBTENIR/METTRE/SUPPRIMER | Gérer un fournisseur |
| `/api/providers/[id]/test` | POSTER | Connexion du fournisseur de test |
| `/api/providers/[id]/models` | OBTENIR | Liste des modèles de fournisseurs |
| `/api/providers/validate` | POSTER | Valider la configuration du fournisseur |
| `/api/provider-nodes*` | Divers | Gestion des nœuds de fournisseur |
| `/api/provider-models` | OBTENIR/POST/DELETE | Modèles personnalisés |### OAuth Flows

| Point de terminaison | Méthode | Descriptif |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[provider]/[action]` | Divers | OAuth spécifique au fournisseur |### Routing & Config

| Point de terminaison | Méthode | Descriptif |
| ------------------------------------ | -------- | ----------------------------- |
| `/api/models/alias` | OBTENIR/POST | Alias ​​du modèle |
| `/api/models/catalogue` | OBTENIR | Tous les modèles par fournisseur + type |
| `/api/combos*` | Divers | Gestion des combos |
| `/api/clés*` | Divers | Gestion des clés API |
| `/api/tarification` | OBTENIR | Tarification du modèle |### Usage & Analytics

| Point de terminaison | Méthode | Descriptif |
| -------------------------------- | ------ | -------------------- |
| `/api/usage/historique` | OBTENIR | Historique d'utilisation |
| `/api/usage/logs` | OBTENIR | Journaux d'utilisation |
| `/api/usage/request-logs` | OBTENIR | Journaux au niveau de la demande |
| `/api/usage/[connectionId]` | OBTENIR | Utilisation par connexion |### Settings

| Point de terminaison | Method        | Descriptif |
| ------------------------------- | ------------- | ---------------------- |
| `/api/paramètres` | OBTENIR/METTRE/PATCH | Paramètres généraux |
| `/api/settings/proxy` | OBTENIR/METTRE | Configuration du proxy réseau |
| `/api/settings/proxy/test` | POSTER | Tester la connexion proxy |
| `/api/settings/ip-filter` | OBTENIR/METTRE | Liste d'autorisation/liste de blocage IP |
| `/api/settings/thinking-budget` | OBTENIR/METTRE | Budget symbolique de raisonnement |
| `/api/settings/system-prompt` | OBTENIR/METTRE | Invite système globale |### Monitoring

| Point de terminaison | Méthode | Descriptif |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `/api/sessions` | OBTENIR | Suivi de session active |
| `/api/rate-limites` | OBTENIR | Limites de taux par compte |
| `/api/surveillance/santé` | OBTENIR | Bilan de santé + résumé du fournisseur (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | OBTENIR/SUPPRIMER | Statistiques du cache / effacer |### Backup & Export/Import

| Point de terminaison | Méthode | Descriptif |
| -------------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | OBTENIR | Liste des sauvegardes disponibles |
| `/api/db-backups` | METTRE | Créer une sauvegarde manuelle |
| `/api/db-backups` | POSTER | Restaurer à partir d'une sauvegarde spécifique |
| `/api/db-backups/export` | OBTENIR | Télécharger la base de données sous forme de fichier .sqlite |
| `/api/db-backups/import` | POSTER | Téléchargez le fichier .sqlite pour remplacer la base de données |
| `/api/db-backups/exportAll` | OBTENIR | Télécharger la sauvegarde complète sous forme d'archive .tar.gz |### Cloud Sync

| Point de terminaison | Méthode | Descriptif |
| ---------------------- | ------- | ------------------------------------ |
| `/api/sync/cloud` | Divers | Opérations de synchronisation cloud |
| `/api/sync/initialize` | POSTER | Initialiser la synchronisation |
| `/api/cloud/*` | Divers | Gestion du cloud |### Tunnels

| Point de terminaison | Méthode | Descriptif |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | OBTENIR | Lire l'état d'installation/d'exécution de Cloudflare Quick Tunnel pour le tableau de bord |
| `/api/tunnels/cloudflared` | POSTER | Activer ou désactiver le tunnel rapide Cloudflare (`action=enable/disable`) |### CLI Tools

| Point de terminaison | Méthode | Descriptif |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | OBTENIR | Statut CLI de Claude |
| `/api/cli-tools/codex-settings` | OBTENIR | Statut CLI du Codex |
| `/api/cli-tools/droid-settings` | OBTENIR | Statut de la CLI du droïde |
| `/api/cli-tools/openclaw-settings` | OBTENIR | Statut de la CLI OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | OBTENIR | Exécution CLI générique |

Les réponses CLI incluent : `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Point de terminaison | Méthode | Descriptif |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | OBTENIR | Liste tous les agents détectés (intégrés + personnalisés) avec statut |
| `/api/acp/agents` | POSTER | Ajouter un agent personnalisé ou actualiser le cache de détection |
| `/api/acp/agents` | SUPPRIMER | Supprimer un agent personnalisé par le paramètre de requête `id` |

La réponse GET inclut « agents[] » (id, nom, binaire, version, installé, protocole, isCustom) et « résumé » (total, installé, notFound, intégré, personnalisé).### Resilience & Rate Limits

| Point de terminaison | Méthode | Descriptif |
| ----------------------- | --------- | ------------------------------- |
| `/api/résilience` | OBTENIR/PATCHER | Obtenir/mettre à jour les profils de résilience |
| `/api/resilience/reset` | POSTER | Réinitialiser les disjoncteurs |
| `/api/rate-limites` | OBTENIR | Statut de limite de débit par compte |
| `/api/rate-limit` | OBTENIR | Configuration de la limite de débit globale |### Evals

| Point de terminaison | Méthode | Descriptif |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | OBTENIR/POST | Répertorier les suites d'évaluation/exécuter l'évaluation |### Policies

| Point de terminaison | Méthode | Descriptif |
| --------------- | --------------- | ----------------------- |
| `/api/politiques` | OBTENIR/POST/DELETE | Gérer les politiques de routage |### Compliance

| Point de terminaison | Méthode | Descriptif |
| -------------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | OBTENIR | Journal d'audit de conformité (dernier N) |### v1beta (Gemini-Compatible)

| Point de terminaison | Méthode | Descriptif |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/modèles` | OBTENIR | Liste des modèles au format Gemini |
| `/v1beta/models/{...chemin}` | POSTER | Point de terminaison Gemini `generateContent` |

Ces points de terminaison reflètent le format API de Gemini pour les clients qui attendent une compatibilité native avec le SDK Gemini.### Internal / System APIs

| Point de terminaison | Méthode | Descriptif |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | OBTENIR | Vérification de l'initialisation de l'application (utilisée lors de la première exécution) |
| `/api/tags` | OBTENIR | Balises de modèle compatibles Ollama (pour les clients Ollama) |
| `/api/restart` | POSTER | Déclencher un redémarrage progressif du serveur |
| `/api/shutdown` | POSTER | Déclencher l'arrêt progressif du serveur |

>**Remarque :**Ces points de terminaison sont utilisés en interne par le système ou pour la compatibilité du client Ollama. Ils ne sont généralement pas appelés par les utilisateurs finaux.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transcrivez des fichiers audio à l'aide de Deepgram ou AssemblyAI.

**Demande:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Réponse:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Fournisseurs pris en charge :**`deepgram/nova-3`, `assemblyai/best`.

**Formats pris en charge :**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Pour les clients qui utilisent le format API d'Ollama :```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Les demandes sont automatiquement traduites entre Ollama et les formats internes.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Réponse:**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. Le client envoie la demande à `/v1/*`
2. Le gestionnaire de route appelle `handleChat`, `handleEmbedding`, `handleAudioTranscription` ou `handleImageGeneration`
3. Le modèle est résolu (fournisseur/modèle direct ou alias/combo)
4. Informations d'identification sélectionnées dans la base de données locale avec filtrage de la disponibilité des comptes
5. Pour le chat : `handleChatCore` — détection de format, traduction, vérification du cache, vérification de l'idempotence
6. L'exécuteur du fournisseur envoie une requête en amont
7. Réponse traduite au format client (chat) ou renvoyée telle quelle (intégrations/images/audio)
8. Utilisation/journalisation enregistrée
9. Le repli s'applique aux erreurs selon les règles de combo

Référence complète de l'architecture : [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Les routes du tableau de bord (`/dashboard/*`) utilisent le cookie `auth_token`
- La connexion utilise le hachage du mot de passe enregistré ; repli sur `INITIAL_PASSWORD`
- `requireLogin` basculable via `/api/settings/require-login`
- Les routes `/v1/*` nécessitent éventuellement une clé API Bearer lorsque `REQUIRE_API_KEY=true`
