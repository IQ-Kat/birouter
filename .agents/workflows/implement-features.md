---
description: Analyze open feature request issues, implement viable ones on dedicated branches, and respond to authors
---

# /implement-features — Feature Request Implementation Workflow

## Overview

Fetches open feature request issues, analyzes each against the current codebase, implements viable ones **on the current release branch** (`release/vX.Y.Z`), and responds to authors with results. Does NOT merge to main — the release branch is later merged via PR.

> **BRANCH RULE**: All work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `feat/` branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

## Steps

### 1. Identify the Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract owner/repo

### 2. Ensure Release Branch Exists

// turbo

Before doing any work, ensure you are on the current release branch:

```bash
# Check current branch
git branch --show-current

# If on main, determine next version and create the release branch
VERSION=$(node -p "require('./package.json').version")
NEXT=$(node -p "const [a,b,c]=('$VERSION').split('.').map(Number); c>=9?a+'.'+(b+1)+'.0':a+'.'+b+'.'+(c+1)")
git checkout -b release/v$NEXT
npm version patch --no-git-tag-version
npm install
```

If already on a `release/vX.Y.Z` branch, continue working there.

### 3. Fetch Open Feature Request Issues

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues and their comments. You MUST use the two-step approach below to guarantee **all** feature requests and their full conversations are fetched.

**Step 3a — Get Issue numbers only** (small output, never truncated):

- Run: `gh issue list --repo <owner>/<repo> --state open --labels "enhancement" --limit 500 --json number --jq '.[].number'`
- (Also run the same for `--labels "feature"` if they are separated, or filter all open issues if labels are not strictly used).
- This outputs one issue number per line. Count them and confirm total.

**Step 3b — Fetch full metadata & conversations for each Issue** (one call per issue):

- For each issue number from step 3a, run:
  `gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author`
- Read not just the body, but **ALL comments (`comments` array)** completely to understand the full context, agreements, and restrictions discussed by the community.
- You may batch these into parallel calls (up to 4 at a time).
- Filter for issues that are feature requests (if not already filtered by label).
- Sort by oldest first.

### 4. Analyze Each Feature Request

For each feature request issue, perform a **two-level analysis**:

#### Level 1 — Viability Assessment

Ask yourself:

- Does this feature align with the project's goals and architecture?
- Is the request technically feasible with the current codebase?
- Does it duplicate existing functionality?
- Would it introduce breaking changes or security risks?
- Is there enough detail to implement it?

**Verdict options:**

1. ✅ **VIABLE** — Makes sense, enough detail to implement → Go to Level 2
2. ❓ **NEEDS MORE INFO** — Good idea but insufficient detail → Post comment asking for specifics
3. ❌ **NOT VIABLE** — Doesn't fit the project or is fundamentally flawed → Post comment explaining why, close issue

#### Level 2 — Implementation (only for VIABLE features)

> **⚠️ ALL implementation happens on the release branch.**

1. **Research** — Read all related source files to understand the current architecture
2. **Design** — Plan the implementation, filling gaps in the original request
3. **Implement** — Build the complete solution following project patterns, **on the release branch**
4. **Build** — Run `npm run build` to verify compilation
5. **Commit** — Commit with: `feat: <description> (#<NUMBER>)`
6. **Continue** — Move to the next feature (do not switch branches)

### 5. Respond to Authors

#### For VIABLE (implemented) features:

// turbo
Post a comment on the issue:

````markdown
## ✅ Feature Implemented!

Hi @<author>! We've analyzed your request and implemented it.

**Branch:** `release/vX.Y.Z` (upcoming release)

### What was implemented:

- <bullet list of what was done>

### How to try it:

```bash
git fetch origin
git checkout release/vX.Y.Z
npm install && npm run dev
```

### Next steps:

1. **Test it** — Please verify it works as you expected
2. **Want to improve it?** — Feel free to open a follow-up PR targeting `release/vX.Y.Z`
3. **Not quite right?** — Let us know in this issue what needs to change

This will be included in the next release. Looking forward to your feedback! 🚀
````

#### For NEEDS MORE INFO:

// turbo
Post a comment asking for specific missing details needed to implement, e.g.:

- "Could you describe the exact behavior when X happens?"
- "Which API endpoints should be affected?"
- "Should this apply to all providers or only specific ones?"

Add the context of WHY you need each piece of information.

#### For NOT VIABLE:

// turbo
Post a polite comment explaining why the feature doesn't fit at this time:

- If the idea is decent but timing is wrong: "This is an interesting idea, but it doesn't align with our current priorities. Feel free to open a new issue with more details if you'd like us to reconsider."
- If fundamentally flawed: Explain the technical or architectural reasons why it won't work, suggest alternatives if possible.
- Close the issue after posting the comment.

### 6. Finalize & Push

After implementing all viable features:

1. **Update CHANGELOG.md** on the release branch with all new feature entries
2. Push the release branch: `git push origin release/vX.Y.Z`
3. Run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user)

### 7. Summary Report

Present a summary report to the user via `notify_user`:

| Issue | Title | Verdict        | Action                  |
| ----- | ----- | -------------- | ----------------------- |
| #N    | Title | ✅ Implemented | Committed on release/vX |
| #N    | Title | ❓ Needs Info  | Comment posted          |
| #N    | Title | ❌ Not Viable  | Closed with explanation |
