# Feature: Persist API-Key via Docker Volume to Avoid Regeneration (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/viable/1350-persist-api-key-docker.md) · 🇪🇸 [es](../../../es/_ideia/viable/1350-persist-api-key-docker.md) · 🇫🇷 [fr](../../../fr/_ideia/viable/1350-persist-api-key-docker.md) · 🇩🇪 [de](../../../de/_ideia/viable/1350-persist-api-key-docker.md) · 🇮🇹 [it](../../../it/_ideia/viable/1350-persist-api-key-docker.md) · 🇷🇺 [ru](../../../ru/_ideia/viable/1350-persist-api-key-docker.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/viable/1350-persist-api-key-docker.md) · 🇯🇵 [ja](../../../ja/_ideia/viable/1350-persist-api-key-docker.md) · 🇰🇷 [ko](../../../ko/_ideia/viable/1350-persist-api-key-docker.md) · 🇸🇦 [ar](../../../ar/_ideia/viable/1350-persist-api-key-docker.md) · 🇮🇳 [hi](../../../hi/_ideia/viable/1350-persist-api-key-docker.md) · 🇮🇳 [in](../../../in/_ideia/viable/1350-persist-api-key-docker.md) · 🇹🇭 [th](../../../th/_ideia/viable/1350-persist-api-key-docker.md) · 🇻🇳 [vi](../../../vi/_ideia/viable/1350-persist-api-key-docker.md) · 🇮🇩 [id](../../../id/_ideia/viable/1350-persist-api-key-docker.md) · 🇲🇾 [ms](../../../ms/_ideia/viable/1350-persist-api-key-docker.md) · 🇳🇱 [nl](../../../nl/_ideia/viable/1350-persist-api-key-docker.md) · 🇵🇱 [pl](../../../pl/_ideia/viable/1350-persist-api-key-docker.md) · 🇸🇪 [sv](../../../sv/_ideia/viable/1350-persist-api-key-docker.md) · 🇳🇴 [no](../../../no/_ideia/viable/1350-persist-api-key-docker.md) · 🇩🇰 [da](../../../da/_ideia/viable/1350-persist-api-key-docker.md) · 🇫🇮 [fi](../../../fi/_ideia/viable/1350-persist-api-key-docker.md) · 🇵🇹 [pt](../../../pt/_ideia/viable/1350-persist-api-key-docker.md) · 🇷🇴 [ro](../../../ro/_ideia/viable/1350-persist-api-key-docker.md) · 🇭🇺 [hu](../../../hu/_ideia/viable/1350-persist-api-key-docker.md) · 🇧🇬 [bg](../../../bg/_ideia/viable/1350-persist-api-key-docker.md) · 🇸🇰 [sk](../../../sk/_ideia/viable/1350-persist-api-key-docker.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/viable/1350-persist-api-key-docker.md) · 🇮🇱 [he](../../../he/_ideia/viable/1350-persist-api-key-docker.md) · 🇵🇭 [phi](../../../phi/_ideia/viable/1350-persist-api-key-docker.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/viable/1350-persist-api-key-docker.md) · 🇨🇿 [cs](../../../cs/_ideia/viable/1350-persist-api-key-docker.md) · 🇹🇷 [tr](../../../tr/_ideia/viable/1350-persist-api-key-docker.md)

---

> GitHub Issue: #1350 — opened by @raphaelnugas on 2026-04-16
> Status: ✅ VIABLE | Priority: MEDIUM

## 📝 Original Request

Every time OmniRoute is updated via Docker and a backup is restored, the API key is changed, forcing all integrated systems to regenerate and reconfigure. This causes service disruption in production environments where multiple systems depend on the key.

**Steps to reproduce (from author):**

1. Install/update OmniRoute via Docker
2. Restore the backup
3. Previous API key is no longer valid
4. Need to generate a new API key and distribute to all clients

**Proposed solutions (from author):**

1. Store API key in a file within the persisted Docker volume (`DATA_DIR/api_key`) so it survives container recreation
2. Support setting the API key via an environment variable (`OMNI_API_KEY`) that can be mounted as a Docker secret

**Acceptance Criteria (from author):**

- API key stored in Docker volume file (`DATA_DIR`)
- After container restart/update, same API key is used
- After backup restore, original API key remains valid
- If no API key file exists (first install), a new key is generated automatically

## 💬 Community Discussion

### Participants

- @raphaelnugas — Original requester, production user with multi-system integrations

### Key Points

- Critical for production Docker deployments where multiple downstream services rely on the API key
- Current behavior regenerates keys on container recreation, breaking all integrations
- Two complementary approaches proposed: file-based persistence and env var override
- No objections or alternative proposals

## 🎯 Refined Feature Description

Make OmniRoute's internal API key persistent across Docker container recreations by storing it in the Docker volume (`DATA_DIR`) and optionally allowing it to be set via an environment variable.

### What it solves

- API key changes after Docker container recreation, breaking all downstream integrations
- Service disruption requiring manual key regeneration and distribution after every update
- Lack of declarative key management support for infrastructure-as-code Docker deployments

### How it should work (high level)

1. On startup, check for `OMNI_API_KEY` environment variable — if set, use it as the API key (highest priority)
2. If no env var, check for `DATA_DIR/api_key` file — if exists, read key from file
3. If neither exists (first-time install), generate a new key and persist it to `DATA_DIR/api_key`
4. After any key generation or change via the dashboard, update the `DATA_DIR/api_key` file
5. On backup restore, if the backup contains a different key, prefer the file-based key (or prompt user)
6. Document the `OMNI_API_KEY` env var in the Docker Compose example and README

### Affected areas

- `src/lib/db/apiKeys.ts` — modify key generation/loading to check file + env var
- `src/lib/db/core.ts` — startup key initialization sequence
- Docker configuration — update `docker-compose.yml` example with `OMNI_API_KEY` support
- Documentation — update Docker deployment docs with key persistence guidance
- `src/app/api/settings/` — key change should persist to file

## 📎 Attachments & References

- No external references

## 🔗 Related Ideas

- No directly related ideas in the backlog
