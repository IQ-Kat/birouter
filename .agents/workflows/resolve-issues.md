---
description: Fetch all open GitHub issues, analyze bugs, resolve what's possible, triage the rest, wait for user validation, then commit and release
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, resolves what can be fixed, and triages issues with insufficient information. **All fixes are committed on the current release branch** (`release/vX.Y.Z`). It does NOT merge or release automatically — the release branch is later merged via PR to main.

> **BRANCH RULE**: All work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `fix/` branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

## Steps

### 1. Identify the GitHub Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

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

### 3. Fetch All Open Issues

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues. You MUST use the two-step approach below to guarantee **all** issues are fetched.

**Step 3a — Get Issue numbers only** (small output, never truncated):

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 500 --json number --jq '.[].number'`
- This outputs one issue number per line. Count them and confirm total.

**Step 3b — Fetch full metadata for each Issue** (one call per issue):

- For each issue number from step 3a, run:
  `gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author`
- You may batch these into parallel calls (up to 4 at a time).
- Sort by oldest first (FIFO).

### 4. Classify Each Issue

For each issue, determine its type:

- **Bug** — Has `bug` label, or body contains error messages, stack traces, "doesn't work", "broken", "crash", "error"
- **Feature Request** — Has `enhancement`/`feature` label, or body describes new functionality
- **Question** — Has `question` label, or is asking "how to" something
- **Other** — Anything else

Focus ONLY on **Bugs** for resolution. Feature requests and questions should be skipped with a note in the final report.

### 5. Analyze Each Bug — For each bug issue:

#### 5a. Check Information Sufficiency

Verify the issue contains enough information to reproduce and fix:

- [ ] Clear description of the problem
- [ ] Steps to reproduce
- [ ] Error messages or logs
- [ ] Expected vs actual behavior

#### 5b. If Information Is INSUFFICIENT

Call the `/issue-triage` workflow (located at `~/.gemini/antigravity/global_workflows/issue-triage.md`):
// turbo

- Post a comment asking for more details using `gh issue comment`
- Add `needs-info` label using `gh issue edit`
- Mark this issue as **DEFERRED** and move to the next one

#### 5c. If Information Is SUFFICIENT

Proceed with resolution **on the release branch**:

1. **Research** — Search the codebase for files related to the issue
2. **Root Cause** — Identify the root cause by reading the relevant source files
3. **Implement Fix** — Apply the fix following existing code patterns and conventions
4. **Test** — Build the project and run tests to verify the fix
5. **Commit** — Commit with message format: `fix: <description> (#<issue_number>)`

> **⚠️ Do NOT create a separate branch.** All commits go directly on the release branch.

### 6. Generate Report & Wait for Validation

Present a summary report to the user via `notify_user` with `BlockedOnUser: true`:

| Issue | Title | Status        | Action                        |
| ----- | ----- | ------------- | ----------------------------- |
| #N    | Title | ✅ Ready      | Files changed (not committed) |
| #N    | Title | ❓ Needs Info | Triage comment posted         |
| #N    | Title | ⏭️ Skipped    | Feature request / not a bug   |

> **⚠️ IMPORTANT**: Do NOT commit, close issues, or generate releases at this step.
> Wait for the user to review the changes and respond with **OK** before proceeding.

- If the user says **OK** or approves → Proceed to step 7
- If the user requests changes → Apply the requested adjustments first, then present the report again
- If the user rejects → Revert the changes and stop

### 7. Commit & Push (only after user approval)

After the user validates:

- Commit each fix individually on the release branch with message format: `fix: <description> (#<issue_number>)`
- Push the release branch: `git push origin release/vX.Y.Z`
- **Update CHANGELOG.md** with all new bug fix entries

### 8. 🛑 WAIT — Notify User & Await Verification

**This is a mandatory stop point.** Use `notify_user` with `BlockedOnUser: true`:

- Inform the user that fixes have been **committed and pushed to the release branch**
- Include summary of fixes, test status, and files changed
- **DO NOT merge, close issues, generate releases, or deploy until the user confirms**

Wait for the user to respond:

- **User confirms** → Proceed to step 9
- **User requests changes** → Apply changes, push to the same branch, notify again
- **User rejects** → Revert and stop

### 9. Close Issues & Finalize (only after user confirms)

After the user confirms:

1. **Close** resolved issues with a comment: `gh issue close <NUMBER> --repo <owner>/<repo> --comment "Fixed in release/vX.Y.Z. The fix will be included in the next release."`
2. Run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user)

If NO fixes were committed, skip this step and just present the report.
