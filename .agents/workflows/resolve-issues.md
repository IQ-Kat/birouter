---
description: Fetch all open GitHub issues, analyze bugs, resolve what's possible, triage the rest, wait for user validation, then commit and release
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, resolves what can be fixed, and triages issues with insufficient information. **It does NOT merge or release automatically** — it creates a PR and waits for user validation before merging.

## Steps

### 1. Identify the GitHub Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

### 2. Fetch All Open Issues

// turbo

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 500 --json number,title,labels,body,comments,createdAt,author`
- Parse the JSON output to get a list of **all** open issues
- Sort by oldest first (FIFO)

### 3. Classify Each Issue

For each issue, determine its type:

- **Bug** — Has `bug` label, or body contains error messages, stack traces, "doesn't work", "broken", "crash", "error"
- **Feature Request** — Has `enhancement`/`feature` label, or body describes new functionality
- **Question** — Has `question` label, or is asking "how to" something
- **Other** — Anything else

Focus ONLY on **Bugs** for resolution. Feature requests and questions should be skipped with a note in the final report.

### 4. Analyze Each Bug — For each bug issue:

#### 4a. Check Information Sufficiency

Verify the issue contains enough information to reproduce and fix:

- [ ] Clear description of the problem
- [ ] Steps to reproduce
- [ ] Error messages or logs
- [ ] Expected vs actual behavior

#### 4b. If Information Is INSUFFICIENT

Call the `/issue-triage` workflow (located at `~/.gemini/antigravity/global_workflows/issue-triage.md`):
// turbo

- Post a comment asking for more details using `gh issue comment`
- Add `needs-info` label using `gh issue edit`
- Mark this issue as **DEFERRED** and move to the next one

#### 4c. If Information Is SUFFICIENT

Proceed with resolution:

1. **Create a fix branch** — `git checkout -b fix/issue-<NUMBER>-<short-description>`
2. **Research** — Search the codebase for files related to the issue
3. **Root Cause** — Identify the root cause by reading the relevant source files
4. **Implement Fix** — Apply the fix following existing code patterns and conventions
5. **Test** — Build the project and run tests to verify the fix
6. **Commit** — Commit with message format: `fix: <description> (#<issue_number>)`

### 5. Generate Report & Wait for Validation

Present a summary report to the user via `notify_user` with `BlockedOnUser: true`:

| Issue | Title | Status        | Action                        |
| ----- | ----- | ------------- | ----------------------------- |
| #N    | Title | ✅ Ready      | Files changed (not committed) |
| #N    | Title | ❓ Needs Info | Triage comment posted         |
| #N    | Title | ⏭️ Skipped    | Feature request / not a bug   |

> **⚠️ IMPORTANT**: Do NOT commit, close issues, or generate releases at this step.
> Wait for the user to review the changes and respond with **OK** before proceeding.

- If the user says **OK** or approves → Proceed to step 6
- If the user requests changes → Apply the requested adjustments first, then present the report again
- If the user rejects → Revert the changes and stop

### 6. Commit & Push Fix Branch (only after user approval)

After the user validates:

- Commit each fix individually with message format: `fix: <description> (#<issue_number>)`
- Push the fix branch: `git push origin fix/issue-<NUMBER>-<short-description>`
- Create a PR: `gh pr create --title "fix: <description> (#<issue_number>)" --body "<details>" --base main`

### 7. 🛑 WAIT — Notify User & Await PR Verification

**This is a mandatory stop point.** Use `notify_user` with `BlockedOnUser: true`:

- Inform the user that the PR was created and is **awaiting their verification**
- Include the PR number, URL, and a summary of what was changed
- **DO NOT merge, close issues, generate releases, or deploy until the user confirms**

Wait for the user to respond:

- **User confirms** → Proceed to step 8
- **User requests changes** → Apply changes, push to the same branch, notify again
- **User rejects** → Close the PR and stop

### 8. Merge, Close Issues & Release (only after user confirms PR)

After the user confirms the PR:

1. **Merge** the PR: `gh pr merge <NUMBER> --merge --repo <owner>/<repo>` or via local merge
2. **Close** resolved issues with a comment: `gh issue close <NUMBER> --repo <owner>/<repo> --comment "Fixed in <commit_hash>. The fix will be included in the next release."`
3. **Switch to main**: `git checkout main && git pull`
4. Run the `/update-docs` workflow (at `~/.gemini/antigravity/global_workflows/update-docs.md`) to update CHANGELOG and README
5. Run the `/generate-release` workflow (at `.agents/workflows/generate-release.md`) to bump version, tag, and publish
6. Deploy to local VPS: `ssh root@192.168.0.15 "npm install -g omniroute@<VERSION> && pm2 restart omniroute"`

If NO fixes were committed, skip this step and just present the report.
