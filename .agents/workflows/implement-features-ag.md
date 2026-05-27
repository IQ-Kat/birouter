---
description: Analyze open feature request issues, implement viable ones on dedicated branches, and respond to authors
---

# /implement-features — Feature Request Harvest, Research & Implementation Workflow

## Overview

A **5-phase** workflow that systematically harvests feature requests from GitHub issues, creates structured idea files, researches solutions across the internet and Git repositories, presents a consolidated report for user approval, then generates detailed implementation plans and executes them.

**Output directory structure:**

```
_ideia/
├── viable/                  # Features approved for implementation
│   ├── need_details/        # ❓ Good idea but waiting for author clarification (issues stay OPEN)
│   │   └── 1015-warp-terminal-mitm.md
│   ├── 1046-native-playground.md           # ✅ Ready — researched and planned
│   └── 1046-native-playground.requirements.md
├── implemented/             # 🚧 Implemented but PR not yet merged to main (transient)
│   └── 1046-native-playground.md
├── defer/                   # ⏭️ Good ideas deferred for future cycles (issues CLOSED after Phase 3 approval)
│   └── 1041-smart-auto-combos.md
└── notfit/                  # ❌ Out of scope / already exists (issues CLOSED after Phase 3 approval)
    └── 945-telegram-integration.md

_tasks/features-vX.Y.Z/   # Implementation plans (per-release)
└── 1046-native-playground.plan.md
```

> **LIFECYCLE RULE:**
> - `viable/` files are **MOVED** to `implemented/` once code lands on the release branch.
> - `implemented/` files are **DELETED** only after the release PR is merged to `main`.
> - This preserves recovery context if implementation fails partially (build green but i18n missing, etc).
> - Files in `defer/` and `notfit/` remain as permanent reference.

> **BRANCH RULE**: All implementation work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `feat/` branches. If no release branch exists yet, delegate creation to `/generate-release` (see Phase 1.2) — do NOT reimplement bump logic here.

> **LANGUAGE RULE** (per `feedback_reply_language` memory): GitHub comments MUST match the language of the original issue body. Detect language by sampling the issue body + first 2 comments. Default to English when uncertain. All comment templates below are in English — translate to the detected language before posting. Internal docs, plan files, and idea files stay in English regardless.

---

## Phase 1 — Harvest: Collect & Catalog Feature Ideas

### 1.1 Identify the Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract owner/repo.

### 1.2 Ensure Release Branch Exists

Before doing any work, ensure you are on the current release branch:

```bash
git branch --show-current
```

**Decision tree:**

- If already on a `release/vX.Y.Z` branch → continue working there.
- If on `main` or any other branch → **delegate to `/generate-release`** by invoking its Phase 1 (steps 1–5: detect current version, bump, create branch, install). Do NOT reimplement the bump formula here — `/generate-release` owns the canonical version policy (patch bumps allowed up to `.999`; minor bump only when patch reaches `999`).

> **Why delegate?** Duplicating the bump formula caused divergence in the past. `/generate-release` is the single source of truth for version arithmetic and now allows patches up to `.999` before bumping minor.

### 1.3 Fetch ALL Open Feature Requests

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues. You MUST use the two-step approach below.

**Step 1 — Get Issue numbers only** (small output, never truncated):

```bash
# Fetch issues with feature/enhancement labels
gh issue list --repo <owner>/<repo> --state open -l "enhancement" --limit 500 --json number --jq '.[].number'

# Also check for [Feature] in title (common pattern when no labels are set)
gh issue list --repo <owner>/<repo> --state open --limit 500 --json number,title --jq '.[] | select(.title | test("\\[Feature\\]|\\[feature\\]|feature request"; "i")) | .number'
```

- Merge both lists, deduplicate. Count and confirm the total.
- If the count hits the `--limit 500` ceiling, raise the limit and re-run — never proceed with a truncated set.

**Step 2 — Fetch full metadata for each Issue** (one call per issue):

```bash
gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author,assignees
```

- Read the **entire body** — including description, use cases, screenshots, mockups, and any embedded images.
- Read **ALL comments** — community discussion, agreements, restrictions, owner responses, and linked PRs.
- **Images**: If the body or comments contain image URLs (`![...](...)` or `https://...png/jpg/gif`), **download and analyze them with the Read tool** (Claude can read PNG/JPG/GIF directly). Mockups and wireframes are often the most informative artifact — do NOT just "note" them, actually inspect their content and incorporate findings into the refined description.
- **Detect issue language** from body + first 2 comments and record it in the idea file front-matter (`reply_lang: pt-BR | en | es | ...`). This will drive comment translation in Phases 2.5 and 5.
- You may batch these into parallel calls (up to 4 at a time).
- Sort by oldest first (FIFO).

### 1.4 Create Idea Files (initially in `_ideia/` root)

For each feature request, create a structured idea file in `<project_root>/_ideia/`:

**Filename convention**: `<NUMBER>-<kebab-case-short-title>.md`
Example: `1046-native-playground.md`, `1041-smart-auto-combos.md`

#### 1.4a — If the idea file does NOT exist yet, create it:

```markdown
---
reply_lang: <detected-lang, e.g. pt-BR | en | es>
---

# Feature: <Title from Issue>

> GitHub Issue: #<NUMBER> — opened by @<author> on <date>
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

<Paste the FULL issue body here, preserving all formatting, images, and code blocks>

## 💬 Community Discussion

<Summarize ALL comments chronologically, noting who said what and any decisions or objections raised>

### Participants

- @<author> — Original requester
- @<commenter1> — <brief role/opinion>
- ...

### Key Points

- <bullet list of the most important discussion points>
- <agreements reached>
- <objections raised>

## 🖼️ Mockup / Image Analysis

<For each image embedded in the issue, summarize what it depicts: UI layout, data flow, architecture diagram, etc. Cite source URL.>

## 🎯 Refined Feature Description

<YOUR interpretation and enrichment of the feature request. Expand on what was asked, fill in logical gaps, provide concrete examples of how it would work. This section should be MORE detailed and clearer than the original request.>

### What it solves

- <problem 1>
- <problem 2>

### How it should work (high level)

1. <step 1>
2. <step 2>
3. ...

### Affected areas

- <list of codebase areas, modules, files likely affected>

## 📎 Attachments & References

- <any image URLs, mockup links, or external references from the issue>

## 🔗 Related Ideas

- <links to related \_ideia/ files if any overlap found>
```

#### 1.4b — If the idea file ALREADY exists, update it:

- Append new comments from the issue to the **Community Discussion** section.
- Update the **Refined Feature Description** if new information changes the understanding.
- Add any new **Related Ideas** cross-references found.
- Re-detect `reply_lang` only if the issue language clearly changed (uncommon).
- **Do NOT overwrite** existing content — append and enrich it.

### 1.5 Cross-Reference & Deduplication

After processing all issues:

- Scan all `_ideia/*.md` files for overlapping features.
- If two features are substantially the same, add `🔗 Related Ideas` cross-references to both.
- If one is a strict subset of another, note it in the smaller file: `> ℹ️ This feature is a subset of #<OTHER_NUMBER>. Consider implementing together.`

### 1.6 Detect In-Flight Work (avoid duplicate effort)

For each issue number, check whether an open PR or branch already targets it:

```bash
# Open PRs that link the issue
gh pr list --repo <owner>/<repo> --state open --search "linked:#<NUMBER>" --json number,title,headRefName

# Local branches that mention the issue number
git branch -a | grep -E "(^|/)(feat|fix|refactor)/.*-?<NUMBER>(-|$)" || true
```

If a PR or branch already exists:

- Mark the idea file with `> ⚠️ In-flight: PR #<PR_NUMBER> / branch <name>` near the top.
- **Skip Phase 2 research and Phase 4 planning** for this feature — the implementation is already in motion.
- In the Phase 3 report, list it under a separate "🚧 Already in progress" bucket; do NOT count it as VIABLE for implementation.

---

## Phase 2 — Research: Find Solutions & Build Requirements

For each cataloged idea that is **viable** (aligns with the project's goals) AND not already in flight (per 1.6):

### 2.1 Viability Pre-Check

Before investing in research, quickly assess:

- [ ] Does this feature align with the project's goals and architecture?
- [ ] Is it technically feasible with the current codebase?
- [ ] Does it duplicate existing functionality?
- [ ] Would it introduce breaking changes or security risks?
- [ ] Is there enough detail to understand what's needed?

**Verdict options:**

| Verdict               | When                                  | Action                      |
| --------------------- | ------------------------------------- | --------------------------- |
| ✅ **VIABLE**         | Good idea, enough context             | Proceed to Research         |
| ❓ **NEEDS DETAIL**   | Good idea, insufficient spec          | Skip research, ask author   |
| ⏭️ **DEFER**          | Good idea, too complex for this cycle | Catalog only, skip research |
| ❌ **NOT FIT**        | Doesn't fit the project               | Explain why                 |
| 🔁 **ALREADY EXISTS** | Feature already implemented           | Point to existing feature   |
| 🚧 **IN FLIGHT**      | PR/branch already exists (from 1.6)   | Skip — track only           |

### 2.2 Internet Research (for VIABLE features)

For each viable feature, perform systematic research with an **early-stopping criterion**:

> **Stop as soon as EITHER condition is met:**
> - 3 reference implementations show a consistent pattern, OR
> - 1 high-quality repo (≥1k stars, updated within the last 12 months) already solves the problem cleanly.
>
> Cap at 10 repos total. Do NOT exhaustively browse — depth over breadth.

**Step 1 — Web search for similar implementations:**

```
WebSearch("how to implement <feature description> in <tech stack>")
WebSearch("<feature keyword> implementation nextjs typescript 2025 2026")
WebSearch("<feature keyword> open source library npm")
```

**Step 2 — Find reference Git repositories:**

```
WebSearch("site:github.com <feature keyword> <tech stack> stars:>100")
WebSearch("github <feature keyword> implementation recently updated 2026")
```

- Sort by most recently updated.
- For each repository (until stop criterion hit):
  - Note the repo URL, star count, last commit date
  - Read its README and relevant source files via `WebFetch`
  - Extract the architectural approach, patterns used, and key code snippets

**Step 3 — Read API docs and standards:**

If the feature involves an external API, protocol, or standard:

- Find and read the official documentation
- Note version requirements, authentication patterns, rate limits

### 2.3 Create Requirements File

For each researched feature, create a requirements file alongside its idea file:

**Filename**: `<NUMBER>-<kebab-case-short-title>.requirements.md`

```markdown
# Requirements: <Feature Title>

> Feature Idea: [#<NUMBER>](./<NUMBER>-<kebab-case-short-title>.md)
> Research Date: <YYYY-MM-DD>
> Verdict: ✅ VIABLE

## 🔍 Research Summary

<Brief summary of what was found during research>

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | [repo/name](url) | ⭐ N  | YYYY-MM-DD   | <brief>  | High/Med/Low |
| 2   | ...              |       |              |          |              |

### Key Patterns Found

- <pattern 1 with code snippet or link>
- <pattern 2>

## 📐 Proposed Solution Architecture

### Approach

<Describe the chosen approach based on research findings>

### New Files

| File                  | Purpose       |
| --------------------- | ------------- |
| `path/to/new/file.ts` | <description> |

### Modified Files

| File                       | Changes        |
| -------------------------- | -------------- |
| `path/to/existing/file.ts` | <what changes> |

### Database Changes

- <migrations needed, if any>

### API Changes

- <new/modified endpoints, if any>

### UI Changes

- <new/modified pages/components, if any>

## ⚙️ Implementation Effort

- **Estimated complexity**: Low / Medium / High / Very High
- **Estimated files changed**: ~N
- **Dependencies needed**: <new npm packages, if any>
- **Breaking changes**: Yes/No — <details>
- **i18n impact**: <number of new translation keys>
- **Test coverage needed**: <brief description>

## ⚠️ Open Questions

- <question 1>
- <question 2>

## 🔗 External References

- <documentation URLs>
- <API references>
```

---

## Phase 2.5 — Organize: Sort Files into Category Directories

> **⚠️ This phase only moves files. It does NOT post comments or close issues.** All GitHub-visible actions are deferred to Phase 3.2 (after human approval).

### 2.5.1 Create Directory Structure

// turbo

```bash
mkdir -p <project_root>/_ideia/viable
mkdir -p <project_root>/_ideia/viable/need_details
mkdir -p <project_root>/_ideia/implemented
mkdir -p <project_root>/_ideia/defer
mkdir -p <project_root>/_ideia/notfit
```

### 2.5.2 Move Idea Files to Category Subdirectories

After classification, move EVERY idea file to its correct subdirectory (still local-only — no GitHub side-effects):

```bash
# ✅ VIABLE — move idea + requirements files
mv _ideia/<NUMBER>-*.md _ideia/viable/
mv _ideia/<NUMBER>-*.requirements.md _ideia/viable/

# ❓ NEEDS DETAIL — viable but waiting for author response
mv _ideia/<NUMBER>-*.md _ideia/viable/need_details/

# ⏭️ DEFER — move idea files only
mv _ideia/<NUMBER>-*.md _ideia/defer/

# ❌ NOT FIT & 🔁 ALREADY EXISTS — move idea files only
mv _ideia/<NUMBER>-*.md _ideia/notfit/

# 🚧 IN FLIGHT — leave in _ideia/ root with a top-of-file banner; do NOT touch the PR/branch
```

No idea files should remain in `_ideia/` root after this step except `🚧 IN FLIGHT` entries.

---

## Phase 3 — Report: Present Findings & Get Human Approval

### 3.1 🛑 MANDATORY STOP — Present Consolidated Report

After completing Phase 1, Phase 2, and Phase 2.5, **STOP and present the following report** in the chat. **No comments have been posted to GitHub yet** — that happens in 3.2 after approval.

Present a structured report containing:

#### 3.1a — Feature Summary Table

| #   | Issue | Title | Verdict         | Local Location                | Planned GitHub Action            |
| --- | ----- | ----- | --------------- | ----------------------------- | -------------------------------- |
| 1   | #N    | Title | ✅ VIABLE       | `_ideia/viable/`              | Comment + keep OPEN              |
| 2   | #N    | Title | ⏭️ DEFER        | `_ideia/defer/`               | Comment + CLOSE                  |
| 3   | #N    | Title | ❌ NOT FIT      | `_ideia/notfit/`              | Comment + CLOSE                  |
| 4   | #N    | Title | 🔁 EXISTS       | `_ideia/notfit/`              | Comment with location + CLOSE    |
| 5   | #N    | Title | ❓ NEEDS DETAIL | `_ideia/viable/need_details/` | Comment with questions + OPEN    |
| 6   | #N    | Title | 🚧 IN FLIGHT    | `_ideia/` (banner)            | None — PR #M already handles it  |

#### 3.1b — Viable Features Detail

For each VIABLE feature, provide a brief paragraph:

- What was found during research (with stop reason: "3-pattern consistency" or "dominant repo")
- The proposed approach
- Key risks or unknowns
- Which reference repositories were most useful

#### 3.1c — Issues Requiring Author Feedback

For features marked ❓ NEEDS DETAIL, list:

- What specific information is missing
- What examples or repository references would help
- Detected `reply_lang` for the question post

#### 3.1d — Ask for User Confirmation

End the report with:

> **Ready to proceed?**
>
> Approving will (a) post comments on GitHub in the detected language of each issue and (b) close DEFER / NOT FIT / EXISTS issues. VIABLE and NEEDS DETAIL stay open.
>
> - Reply **"sim"** / **"yes"** to post all comments AND generate implementation plans for all VIABLE features.
> - Reply **"only comments"** to post comments without generating plans yet.
> - Reply with specific issue numbers to scope the action.
> - Reply **"não"** / **"no"** to stop without touching GitHub.

### 3.2 Post GitHub Comments & Close Issues (only after approval)

> **⚠️ Do NOT execute this step without explicit user approval from 3.1d.**

For each issue, translate the appropriate template below into the `reply_lang` recorded in its idea file front-matter, then post. The English templates are reference only — never post the English version verbatim to a non-English issue.

---

#### For 🔁 ALREADY EXISTS — Comment + CLOSE issue

The feature already exists in the system. Explain WHERE it is and HOW to use it.

```markdown
Hi @<author>! Thanks for the suggestion! 🙏

Great news — this functionality **already exists** in OmniRoute:

**📍 Where to find it:** <exact dashboard path or settings location>

**🔧 How to use it:**

1. <step 1>
2. <step 2>
3. <step 3>

If you have any trouble finding or using it, feel free to ask in a Discussion. We're always happy to help!

Closing this as the feature is already available. 🎉
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<translated comment>"
```

---

#### For ⏭️ DEFER — Comment + CLOSE issue

Thank the user, explain the idea was cataloged, and that we'll study it before implementing.

```markdown
Hi @<author>! Thanks for this thoughtful feature request! 🙏

We really appreciate the detailed proposal. We've **cataloged your idea** and it's now part of our improvement backlog.

Due to the **significant architectural impact** of this feature, we'll need to conduct thorough use-case studies and architectural analysis before we start development. This ensures we build it right and don't introduce regressions.

**What happens next:**

- Your idea is saved in our internal feature backlog
- We'll conduct architecture studies when this area is prioritized

If you want to track progress, please **subscribe to the repository releases** — every implemented feature is announced in the CHANGELOG.

Thank you for contributing to OmniRoute's roadmap! 🚀
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<translated comment>"
```

---

#### For ❌ NOT FIT — Comment + CLOSE issue

Politely explain why the feature doesn't fit the project scope.

```markdown
Hi @<author>! Thanks for the suggestion! 🙏

After careful analysis, we've determined that this feature **falls outside OmniRoute's core scope** as a proxy/router.

**Reason:** <explain why — e.g., "Telegram integration belongs in the application/orchestrator layer that consumes OmniRoute's API, not inside the router itself.">

**Alternative:** <suggest an alternative approach if possible>

We appreciate you thinking of ways to improve OmniRoute! If you'd like to discuss this further, feel free to open a Discussion. 🙏
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<translated comment>"
```

---

#### For ❓ NEEDS DETAIL — Comment (keep OPEN)

Ask for the specific missing details needed.

```markdown
Hi @<author>! Thanks for the feature request — it's an interesting idea and we'd love to explore it further. 🙏

To move forward, we need a few more details:

1. <specific question 1>
2. <specific question 2>
3. <specific question 3>

If you know of any **open-source projects or repositories** that implement something similar, please share links — it would help us design the best solution.

Looking forward to your response! 🚀
```

---

#### For ✅ VIABLE — Comment (keep OPEN)

Thank the user, confirm we've cataloged their idea, and explain that progress is tracked in releases.

```markdown
Hi @<author>! Thanks for the great feature suggestion! 🙏

We've analyzed your request and it aligns well with OmniRoute's roadmap. We've **cataloged this feature** and it's in our implementation backlog.

**Status:** 📋 Cataloged for future implementation

This issue will be **closed automatically by the merge commit** when the feature ships. To follow along, you can subscribe to repository releases or watch this issue.

Thank you for helping improve OmniRoute! 🚀
```

**⚠️ Do NOT close viable issues — they remain OPEN until the implementation PR closes them via commit message.**

---

## Phase 4 — Plan: Generate Implementation Plans (after user says "yes")

> **⚠️ Do NOT enter this phase without explicit user approval from Phase 3.**

### 4.1 Pre-Plan Context Load (mandatory)

Before writing ANY plan, read:

1. `docs/architecture/REPOSITORY_MAP.md` — to know which directory owns what.
2. `docs/architecture/CODEBASE_DOCUMENTATION.md` — for the engineering reference.
3. The matching "Adding a New X" scenario from `CLAUDE.md` (provider, API route, DB module, MCP tool, A2A skill, cloud agent, embedded service, guardrail, eval, skill, webhook event).
4. Any docs linked from the requirements file's "External References" section.

This ensures plans cite real paths and follow the established add-a-X recipe, instead of inventing structure.

### 4.2 Create Task Directory

```bash
mkdir -p <project_root>/_tasks/features-vX.Y.Z/
```

### 4.3 Generate One Implementation Plan Per Feature

For each VIABLE feature approved by the user, create:

**Filename**: `_tasks/features-vX.Y.Z/<NUMBER>-<kebab-case-title>.plan.md`

```markdown
# Implementation Plan: <Feature Title>

> Issue: #<NUMBER>
> Idea: [\_ideia/viable/<NUMBER>-title.md](../../_ideia/viable/<NUMBER>-title.md)
> Requirements: [\_ideia/viable/<NUMBER>-title.requirements.md](../../_ideia/viable/<NUMBER>-title.requirements.md)
> Branch: `release/vX.Y.Z`
> Matching CLAUDE.md recipe: <e.g. "Adding a New Provider">

## Overview

<Brief description of what will be built>

## Pre-Implementation Checklist

- [ ] Read all related source files listed below
- [ ] Confirm no conflicts with in-flight PRs (re-run Phase 1.6 lookup)
- [ ] Verify database migration numbering (next free integer in `src/lib/db/migrations/`)

## Implementation Steps

### Step 1: <Title>

**Files:**

- `path/to/file.ts` — <what to change>

**Details:**
<Detailed description of the change, including code patterns to follow, function signatures, etc.>

### Step 2: <Title>

...

### Step N: Tests (MANDATORY per CLAUDE.md hard rule #8)

**New test files:**

- `tests/unit/<test-file>.test.mjs` — <what to test>

**Test cases:**

- [ ] <test case 1>
- [ ] <test case 2>
- [ ] Coverage check: confirm overall coverage stays ≥75% statements/lines/functions, ≥70% branches (hard rule #9)

### Step N+1: i18n

**Translation keys to add:**

- `<namespace>.<key>` — "<English value>"

### Step N+2: Documentation

- [ ] Update CHANGELOG.md (current release section)
- [ ] Update relevant docs/ files
- [ ] If touching error responses, follow `docs/security/ERROR_SANITIZATION.md`
- [ ] If touching upstream credentials, follow `docs/security/PUBLIC_CREDS.md`

## Verification Plan (Trust-but-Verify — mandatory before declaring done)

1. `git status` + `git diff --stat` — review every changed file; flag anything outside the plan's declared scope
2. `npm run lint` — 0 new errors
3. `npm run typecheck:core` — clean
4. `npm run typecheck:noimplicit:core` — clean
5. `npm run check:cycles` — no new circular deps
6. `npm run build` — must pass
7. `npm run test:coverage` — coverage gate respected
8. `npm run check-docs-sync` (via pre-commit hook) — passes
9. Manual UI verification if the feature touches frontend (start dev server, exercise golden path + 1 edge case)

## Commit Plan

```
feat: <description> (#<NUMBER>)
```
```

### 4.4 Present Plans for Final Approval

Present a summary of all generated plans:

> **Implementation plans generated:**
>
> | #   | Feature | Plan File                                | Steps   | Effort | CLAUDE.md recipe       |
> | --- | ------- | ---------------------------------------- | ------- | ------ | ---------------------- |
> | 1   | <title> | `_tasks/features-vX.Y.Z/N-title.plan.md` | N steps | Medium | Adding a New Provider  |
>
> Reply **"sim"** / **"yes"** to begin implementation of all features.
> Reply with specific issue numbers to implement only certain ones.

---

## Phase 5 — Execute: Implement the Plans (after user says "yes")

> **⚠️ Do NOT enter this phase without explicit user approval from Phase 4.**

### 5.1 Implement Each Feature

For each approved plan, execute it step by step:

1. **Follow the plan** — implement exactly as specified in the `.plan.md` file
2. **Mark progress** — flip checkboxes to `[x]` in the plan as each step completes

### 5.2 Trust-but-Verify Audit (mandatory before commit)

> Aligned with `~/.claude/CLAUDE.md` global rule: never trust a subagent's summary alone.

Run the full audit checklist from the plan's "Verification Plan" section AND inspect the diff yourself:

```bash
git status
git diff --stat
git diff                       # full diff, scan for out-of-scope changes
npm run lint
npm run typecheck:core
npm run typecheck:noimplicit:core
npm run check:cycles
npm run build
npm run test:coverage
```

**Block-on-failure checklist:**

- [ ] No files changed outside the plan's declared scope (or scope expansion explicitly justified)
- [ ] No deleted symbols/routes/files without a documented replacement (grep to confirm)
- [ ] No weakened or removed test assertions (only additions or alignments with real behavior)
- [ ] Coverage gate green (75/75/75/70)
- [ ] All commands above exit 0
- [ ] If UI was touched: manual smoke test passed and noted

If any item fails, **fix root cause** before committing. Do NOT bypass with `--no-verify` (hard rule #10).

### 5.3 Commit (one feature, one commit)

```bash
git add <only files in the plan>
git commit -m "feat: <description> (#<NUMBER>)"
```

> **No `Co-Authored-By` trailers** (hard rule #16). Commits go solely under `diegosouzapw`.

Then move (do NOT delete yet) the idea file to `_ideia/implemented/`:

```bash
mv _ideia/viable/<NUMBER>-<title>.md _ideia/implemented/
mv _ideia/viable/<NUMBER>-<title>.requirements.md _ideia/implemented/ 2>/dev/null || true
```

> **Why move, not delete?** If the release PR is reverted or rebased, we still have the context. The file is deleted only after the PR merges to `main` (see 5.6).

Continue to the next feature on the same branch — do NOT switch branches between features.

### 5.4 Respond to Authors

For each implemented feature, post a final close-comment **translated into the issue's `reply_lang`**:

```markdown
✅ **Implemented in `release/vX.Y.Z`!**

Hi @<author>! Great news — your feature request has been implemented! 🎉

**What was done:**

- <bullet list of what was built>

**How to try it (after the release PR merges):**

```bash
git fetch origin && git checkout main && git pull
npm install && npm run dev
```

This will be included in the upcoming **vX.Y.Z** release. Feel free to reopen if you spot any issues! 🚀
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<translated comment>"
```

### 5.5 Finalize the Release Branch

After implementing all approved features:

1. **Update CHANGELOG.md** on the release branch with all new feature entries
2. Push: `git push origin release/vX.Y.Z`
3. Hand off to `/generate-release` for the "Tests → Commit → Push → PR to main" stage. Refer to it **by stage name**, not step number, so this command does not break if `/generate-release` renumbers steps.

### 5.6 Post-Merge Cleanup (only after release PR merges to main)

Once the release PR is merged:

```bash
# Now safe to delete — commit history + CHANGELOG are the source of truth
rm _ideia/implemented/<NUMBER>-*.md
```

> If running this command before the merge: STOP at 5.5 and skip 5.6. Re-enter the workflow later just for the cleanup.

### 5.7 Final Summary Report

Present a final summary report to the user:

| Issue | Title | Verdict         | Action                                             | Commit    |
| ----- | ----- | --------------- | -------------------------------------------------- | --------- |
| #N    | Title | ✅ Implemented  | Issue closed, idea file in `_ideia/implemented/`   | `abc1234` |
| #N    | Title | ⏭️ Deferred     | Issue closed + saved in `_ideia/defer/`            | —         |
| #N    | Title | ❌ Not Fit      | Issue closed + saved in `_ideia/notfit/`           | —         |
| #N    | Title | 🔁 Exists       | Issue closed + saved in `_ideia/notfit/`           | —         |
| #N    | Title | ❓ Needs Detail | Issue OPEN, moved to `_ideia/viable/need_details/` | —         |
| #N    | Title | 🚧 In Flight    | Untouched — tracked by PR #M                       | —         |

Include:

- Total features harvested
- Total ideas cataloged (`viable/need_details/` + `defer/` + `notfit/`)
- Total features implemented (idea files in `_ideia/implemented/`, awaiting post-merge cleanup)
- Total features deferred
- Total issues closed
- Total issues left open (NEEDS DETAIL + VIABLE-pending-implementation + IN FLIGHT)
- Audit results: lint / typecheck / cycles / build / coverage (pass-count per phase)
- Languages used in posted comments (e.g. "3× pt-BR, 5× en, 1× es")
