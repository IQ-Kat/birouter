---
description: How to automatically summarize recent changes and update README and CHANGELOG
---

# Update Documentation Workflow

Update CHANGELOG.md, README.md, docs/ files, and all multi-language translations whenever features are added or changed.

## Steps

### 1. Summarize recent changes

Review git log and identify new features, fixes, or changes since the last release tag:

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

### 2. Update English CHANGELOG.md

Add an `[Unreleased]` section (or version header if releasing) with:

- `### ✨ New Features` — each feature as a bullet point
- `### 🐛 Bug Fixes` — if applicable
- `### 🧪 Tests` — test count changes
- `### 📁 New Files` — table of new files with purpose

### 3. Update English README.md

Update the feature tables in these sections:

- **🧠 Routing & Intelligence** — for routing/model features
- **🛡️ Resilience & Security** — for security/resilience features
- **📊 Observability & Analytics** — for monitoring features
- **☁️ Deploy & Sync** — for deployment features

### 4. Update docs/ files

- `docs/FEATURES.md` — update the Settings section description
- `docs/API_REFERENCE.md` — add new API routes if any
- `docs/ARCHITECTURE.md` — update architecture if structural changes

### 5. 🌐 Sync Multi-Language Documentation (CRITICAL)

// turbo-all

**This step MUST be run after every README or docs update.**

The project has **30 language versions** of documentation:

**README files (root directory):**

```
README.md (English - source of truth)
README.pt-BR.md README.pt.md README.es.md README.fr.md README.it.md
README.de.md README.nl.md README.sv.md README.no.md README.da.md README.fi.md
README.ru.md README.uk-UA.md README.bg.md README.sk.md README.pl.md README.ro.md README.hu.md
README.ar.md README.he.md README.th.md README.in.md README.id.md README.ms.md README.vi.md
README.ja.md README.ko.md README.zh-CN.md README.phi.md README.cs.md
```

**docs/i18n/ directories (29 languages):**

```
docs/i18n/{ar,bg,cs,da,de,es,fi,fr,he,hu,id,in,it,ja,ko,ms,nl,no,phi,pl,pt,pt-BR,ro,ru,sk,sv,th,uk-UA,vi,zh-CN}/
Each contains: API_REFERENCE.md, ARCHITECTURE.md, CODEBASE_DOCUMENTATION.md, FEATURES.md, TROUBLESHOOTING.md, USER_GUIDE.md
```

**Sync approach for feature table updates:**

a. Identify which feature table rows were added to English README.md
b. For each translated README, find the corresponding anchor lines:

- **Routing section:** Find the `💬` (System Prompt) table row — the line before it is always the last routing feature. Insert new routing features before System Prompt.
- **Resilience section:** Find the `📊` Rate Limits table row (the one in lines 590-600, NOT the quota tracking one in lines 560-570). Insert new resilience features after it.
  c. The new feature entries can stay in English for technical features, matching the pattern used in the existing translations.
  d. Use `sed` or similar tool to batch-insert across all 29 translated READMEs.

**Verification:**

```bash
# Verify all READMEs have the new features
grep -l "NEW_FEATURE_NAME" README.*.md | wc -l
# Should return 30 (all language versions)
```

**FEATURES.md sync:**

```bash
# Update Settings description in all docs/i18n/*/FEATURES.md
for dir in docs/i18n/*/; do
  # Update the Settings section description to mention new features
  # Check FEATURES.md in each directory
done
```

### 6. Verify documentation changes

```bash
# Check all modified files
git status --short

# Verify no broken markdown
# Optional: run markdownlint if available
```
