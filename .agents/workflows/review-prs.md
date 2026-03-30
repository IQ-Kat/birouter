---
description: Analyze open Pull Requests from the project's GitHub repository, generate a critical report, and optionally implement approved changes
---

# /review-prs — PR Review & Analysis Workflow

## Overview

This workflow fetches all open PRs from the project's GitHub repository, performs a critical analysis of each one, generates a detailed report, and waits for user approval before proceeding with implementation. **All improvements are committed on top of the PR branch** and the user must verify before merge.

## Steps

### 1. Identify the GitHub Repository

- Read `package.json` to get the repository URL, or use the git remote origin URL
  // turbo
- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo

### 2. Fetch Open Pull Requests

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh pr list` can be truncated by the tool, silently hiding PRs. You MUST use the two-step approach below to guarantee **all** PRs are fetched.

**Step 2a — Get PR numbers only** (small output, never truncated):

- Run: `gh pr list --repo <owner>/<repo> --state open --limit 500 --json number --jq '.[].number'`
- This outputs one PR number per line. Count them and confirm total.

**Step 2b — Fetch full metadata for each PR** (one call per PR):

- For each PR number from step 2a, run:
  `gh pr view <NUMBER> --repo <owner>/<repo> --json number,title,author,headRefName,body,createdAt,additions,deletions,files`
- You may batch these into parallel calls (up to 4 at a time).

**Step 2c — Fetch diffs for each PR** (one call per PR, saved to /tmp):

- For each PR number, run:
  `gh pr diff <NUMBER> --repo <owner>/<repo> > /tmp/pr<NUMBER>.diff`
- Then read each diff file with `view_file`.

- For each open PR, collect:
  - PR number, title, author, branch, number of commits, date
  - PR description/body
  - Files changed (diff)
  - Existing review comments (from bots or humans)

**Verification**: Confirm the count of PRs analyzed matches the count from step 2a before proceeding.

### 3. Analyze Each PR — For each open PR, perform the following analysis:

#### 3a. Feature Assessment

- **Does it make sense?** Evaluate if the feature fills a real gap or solves a valid problem
- **Alignment** — Check if it aligns with the project's architecture and roadmap
- **Complexity** — Assess if the scope is reasonable or if it should be split

#### 3b. Code Quality Review

- Check for code duplication
- Evaluate error handling patterns (consistent with existing codebase?)
- Check naming conventions and code style
- Verify TypeScript types (any `any` usage, missing types?)

#### 3c. Security Review

- Check for missing authentication/authorization on new endpoints
- Check for injection vulnerabilities (URL params, SQL, XSS)
- Verify input validation on all user-controlled data
- Check for hardcoded secrets or credentials

#### 3d. Architecture Review

- Does the change follow existing patterns?
- Are there any breaking changes to public APIs?
- Is the database schema affected? Migration needed?
- Impact on performance (N+1 queries, missing indexes?)

#### 3e. Test Coverage

- Does the PR include tests?
- Are edge cases covered?
- Would existing tests break?

#### 3f. Cross-Layer (Global) Analysis

Perform a **global impact assessment** to verify whether the PR changes are complete across all layers of the application:

- **Backend → Frontend check**: If the PR adds or modifies backend-only resources (new endpoints, services, data models), evaluate whether corresponding frontend changes are missing:
  - Does a new endpoint require a new screen/page in the dashboard?
  - Should there be a new action button, menu item, or navigation link?
  - Are there new data fields that should be displayed or editable in the UI?
  - Does a new feature need a toggle, configuration panel, or status indicator?
- **Frontend → Backend check**: If the PR adds frontend elements, verify the backend support exists:
  - Are the required API endpoints implemented?
  - Is the data model sufficient for the new UI components?
- **Cross-cutting concerns**: Check shared layers (types, DTOs, validation schemas, routes, middleware) for completeness
- **Document gaps** — If missing layers are detected, list them as **IMPORTANT** issues in the report with concrete suggestions for what should be added

### 4. Generate Report — Create a markdown report for each PR including:

- **PR Summary** — What it does, files affected, commit count
- **Improvements/Benefits** — Numbered list with impact level (HIGH/MEDIUM/LOW)
- **Risks & Issues** — Categorized as CRITICAL / IMPORTANT / MINOR
- **Scoring Table** — Rate across: Feature Relevance, Code Quality, Security, Robustness, Tests
- **Verdict** — Ready to merge? With mandatory vs optional fixes
- **Next Steps** — What will happen if approved

### 5. Present to User

- Show the report via `notify_user` with `BlockedOnUser: true`
- Wait for user decision:
  - **Approved** → Proceed to step 6
  - **Approved with changes** → Implement the fixes and corrections before merging
  - **Rejected** → Close the PR or leave a review comment

### 6. Implementation (if approved)

- Checkout the PR branch: `gh pr checkout <NUMBER>`
- Implement any required fixes identified in the analysis
- If the Cross-Layer Analysis (3f) identified missing frontend/backend counterparts, implement them
- **Commit improvements on top of the PR branch** with descriptive commit messages
- Run the project's test suite to verify nothing breaks
  // turbo
- Run: `npm test` or equivalent test command
- Build the project to verify compilation
  // turbo
- Run: `npm run build` or equivalent build command
- Push the updated branch: `git push origin <branch-name>`

### 7. 🛑 WAIT — Notify User & Await PR Verification

**This is a mandatory stop point.** Use `notify_user` with `BlockedOnUser: true`:

- Inform the user that the PR has been **improved and pushed**, and is **awaiting their verification**
- Include:
  - PR number and URL
  - Summary of improvements/fixes applied
  - Build/test status
  - List of files changed
- **DO NOT merge, generate releases, or deploy until the user confirms**

Wait for the user to respond:

- **User confirms** → Proceed to step 8
- **User requests more changes** → Apply changes, push to the same branch, notify again
- **User rejects** → Leave a review comment and stop

### 8. Thank the Contributor

- Post a **thank-you comment** on the PR via the GitHub API
- The message should:
  - Thank the author by name/username for their contribution
  - Briefly mention what the PR accomplishes and any improvements applied
  - Be friendly, professional, and encouraging
- Example: _"Thanks @author for this great contribution! 🎉 The [feature/fix] is now merged and will be part of the next release. We appreciate your effort!"_

### 9. Merge & Release (only after user confirms PR)

After the user confirms the PR:

1. **Merge** the PR into main (local merge with `--no-ff` or via `gh pr merge`)
2. **Push** to main: `git push origin main`
3. **Clean up** the feature branch: `git branch -d <branch-name>`
4. **Update CHANGELOG.md** with the new feature/fix
5. Run the `/generate-release` workflow (at `.agents/workflows/generate-release.md`) to bump version, tag, and publish
6. Deploy to local VPS: `ssh root@192.168.0.15 "npm install -g omniroute@<VERSION> && pm2 restart omniroute"`
