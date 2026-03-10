---
description: Create a new release, bump version up to 1.x.10 threshold, update changelog, and manage Pull Requests
---

# Generate Release Workflow

Bump version, finalize CHANGELOG, commit, tag, push, publish to npm, and create GitHub release.

> **VERSION RULE: Always use PATCH bumps (2.x.y → 2.x.y+1)**
> NEVER use `npm version minor` or `npm version major`.
> Always use: `npm version patch --no-git-tag-version`
> The threshold rule: when `y` reaches 10, bump to `2.(x+1).0` — e.g. `2.1.10` → `2.2.0`.

## Steps

### 1. Determine new version

Check current version in `package.json` and increment the **patch** number only:

```bash
grep '"version"' package.json
```

Version format: `2.x.y` — examples:

- `2.1.2` → `2.1.3` (patch)
- `2.1.9` → `2.1.10` (patch)
- `2.1.10` → `2.2.0` (minor threshold — do manually with `sed`)

```bash
# ALWAYS use patch:
npm version patch --no-git-tag-version
```

### 2. Regenerate lock file (REQUIRED after version bump)

**Mandatory** — skipping causes `@swc/helpers` lock mismatch and CI failures:

```bash
npm install
```

### 3. Finalize CHANGELOG.md

Replace `[Unreleased]` header with the new version and date.
Keep an empty `## [Unreleased]` section above it.

```markdown
## [Unreleased]

---

## [2.x.y] — YYYY-MM-DD
```

### 4. Update openapi.yaml version

```bash
sed -i 's/version: OLD/version: NEW/' docs/openapi.yaml
```

### 5. Stage, commit, and tag

// turbo-all

```bash
git add package.json package-lock.json CHANGELOG.md docs/openapi.yaml
git commit -m "chore(release): v2.x.y — summary of changes"
git tag -a v2.x.y -m "Release v2.x.y"
```

### 6. Push to GitHub

```bash
git push origin main --tags
```

### 7. Create GitHub release

```bash
gh release create v2.x.y --title "v2.x.y — summary" --notes "..."
```

### 8. Deploy to VPS (if requested)

See `/deploy-vps` workflow for Akamai VPS or use npm for local VPS:

```bash
ssh root@<VPS_IP> "npm install -g omniroute@2.x.y && pm2 restart omniroute"
```

## Notes

- Always run `/update-docs` BEFORE this workflow (ensures CHANGELOG and README are current)
- The `prepublishOnly` script runs `npm run build:cli` automatically during `npm publish`
- After npm publish, verify with `npm info omniroute version`
- Lock file sync errors are caused by skipping `npm install` after version bump
