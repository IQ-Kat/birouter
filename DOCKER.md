# Docker

Run Birouter in a container. Published image: [`IQ-Kat/birouter`](https://hub.docker.com/r/IQ-Kat/birouter) — multi-platform `linux/amd64` + `linux/arm64`.

---

# 👤 For Users

## Quick start

```bash
docker run -d \
  -p 2004:2004 \
  -v "$HOME/.birouter:/app/data" \
  -e DATA_DIR=/app/data \
  --name birouter \
  IQ-Kat/birouter:latest
```

App listens on port `2004`. Open: http://localhost:2004

## Manage container

```bash
docker logs -f birouter        # view logs
docker stop birouter           # stop
docker start birouter          # start again
docker rm -f birouter          # remove
```

## Data persistence

```bash
-v "$HOME/.birouter:/app/data" \
-e DATA_DIR=/app/data
```

Without `DATA_DIR`, the app falls back to `~/.birouter/` (macOS/Linux) or `%APPDATA%\birouter\` (Windows). In the container, `DATA_DIR=/app/data` makes the bind mount work.

Data layout under `$DATA_DIR/`:

```text
$DATA_DIR/
├── db/
│   ├── data.sqlite       # main SQLite database
│   └── backups/          # auto backups
└── ...                   # certs, logs, runtime configs
```

Host path: `$HOME/.birouter/db/data.sqlite`
Container path: `/app/data/db/data.sqlite`

## Optional env vars

```bash
docker run -d \
  -p 2004:2004 \
  -v "$HOME/.birouter:/app/data" \
  -e DATA_DIR=/app/data \
  -e PORT=2004 \
  -e HOSTNAME=0.0.0.0 \
  -e DEBUG=true \
  --name birouter \
  IQ-Kat/birouter:latest
```

## Optional Headroom sidecar

The Birouter image does not bundle Python or Headroom. To use Headroom in Docker, run it as a separate service and point Birouter at that proxy:

```yaml
services:
  birouter:
    image: IQ-Kat/birouter:latest
    ports:
      - "2004:2004"
    volumes:
      - "$HOME/.birouter:/app/data"
    environment:
      DATA_DIR: /app/data
      HEADROOM_URL: http://headroom:8787
    depends_on:
      - headroom

  headroom:
    image: ghcr.io/chopratejas/headroom:latest
    ports:
      - "8787:8787"
```

In the dashboard, open `Endpoint` → `Token Saver` → `Headroom`, confirm the URL is `http://headroom:8787`, recheck status, then enable Headroom.

If Headroom runs on the Docker host instead of as a sidecar, use `http://host.docker.internal:8787` on macOS/Windows. On Linux, add `--add-host=host.docker.internal:host-gateway` or the equivalent compose `extra_hosts` entry.

## Update to latest

```bash
docker pull IQ-Kat/birouter:latest
docker rm -f birouter
# re-run the quick start command
```

---

# 🛠 For Developers

## Build image locally (test)

```bash
cd app && docker build -t birouter .

docker run --rm -p 2004:2004 \
  -v "$HOME/.birouter:/app/data" \
  -e DATA_DIR=/app/data \
  birouter
```

## Publish (automatic via CI)

Push a git tag `v*` → GitHub Actions builds multi-platform (amd64+arm64) and pushes to:
- `ghcr.io/IQ-Kat/birouter:v{version}` + `:latest`
- `IQ-Kat/birouter:v{version}` + `:latest`

```bash
# Use scripts/release.js (recommended)
node scripts/release.js "Release title" "Notes"

# Or manually
git tag v0.4.x && git push origin v0.4.x
```

Workflow: `app/.github/workflows/docker-publish.yml`
