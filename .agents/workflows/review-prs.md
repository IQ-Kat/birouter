---
description: Analyze open Pull Requests from the project's GitHub repository, generate a critical report, and optionally implement approved changes
---

# /review-prs — PR Review & Analysis Workflow

## Overview

This workflow fetches all open PRs from the project's GitHub repository, performs a critical analysis of each one, generates a detailed report, and waits for user approval before proceeding with implementation. **All improvements are committed on the current release branch** (`release/vX.Y.Z`).

> **BRANCH RULE**: All work MUST happen on the current `release/vX.Y.Z` branch. Never create separate feature or fix branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

## Steps

### 1. Identify the GitHub Repository

- Read `package.json` to get the repository URL, or use the git remote origin URL
  // turbo
- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo

### 2. Ensure Release Branch Exists

// turbo

Before doing any work, ensure you are on the current release branch:

```bash
# Check current branch
git branch --show-current

# If on main, determine next version and create the release branch
VERSION=$(node -p "require('./package.json').version")
# Bump patch: e.g. 3.3.11 → 3.3.12
NEXT=$(node -p "const [a,b,c]=('$VERSION').split('.').map(Number); c>=9?a+'.'+(b+1)+'.0':a+'.'+b+'.'+(c+1)")
git checkout -b release/v$NEXT
npm version patch --no-git-tag-version
npm install
```

If already on a `release/vX.Y.Z` branch, continue working there.

### 3. Fetch Open Pull Requests

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh pr list` can be truncated by the tool, silently hiding PRs. You MUST use the two-step approach below to guarantee **all** PRs are fetched.

**Step 3a — Get PR numbers only** (small output, never truncated):

- Run: `gh pr list --repo <owner>/<repo> --state open --limit 500 --json number --jq '.[].number'`
- This outputs one PR number per line. Count them and confirm total.

**Step 3b — Fetch full metadata for each PR** (one call per PR):

- For each PR number from step 3a, run:
  `gh pr view <NUMBER> --repo <owner>/<repo> --json number,title,author,headRefName,body,createdAt,additions,deletions,files`
- You may batch these into parallel calls (up to 4 at a time).

**Step 3c — Fetch diffs for each PR** (one call per PR, saved to /tmp):

- For each PR number, run:
  `gh pr diff <NUMBER> --repo <owner>/<repo> > /tmp/pr<NUMBER>.diff`
- Then read each diff file with `view_file`.

- For each open PR, collect:
  - PR number, title, author, branch, number of commits, date
  - PR description/body
  - Files changed (diff)
  - Existing review comments (from bots or humans)

**Verification**: Confirm the count of PRs analyzed matches the count from step 3a before proceeding.

### 4. Analyze Each PR — For each open PR, perform the following analysis:

#### 4a. Feature Assessment

- **Does it make sense?** Evaluate if the feature fills a real gap or solves a valid problem
- **Alignment** — Check if it aligns with the project's architecture and roadmap
- **Complexity** — Assess if the scope is reasonable or if it should be split

#### 4b. Code Quality Review

- Check for code duplication
- Evaluate error handling patterns (consistent with existing codebase?)
- Check naming conventions and code style
- Verify TypeScript types (any `any` usage, missing types?)

#### 4c. Security Review

- Check for missing authentication/authorization on new endpoints
- Check for injection vulnerabilities (URL params, SQL, XSS)
- Verify input validation on all user-controlled data
- Check for hardcoded secrets or credentials

#### 4d. Architecture Review

- Does the change follow existing patterns?
- Are there any breaking changes to public APIs?
- Is the database schema affected? Migration needed?
- Impact on performance (N+1 queries, missing indexes?)

#### 4e. Test Coverage

- Does the PR include tests?
- Are edge cases covered?
- Would existing tests break?

#### 4f. Cross-Layer (Global) Analysis

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

### 5. Generate Report — Create a markdown report for each PR including:

- **PR Summary** — What it does, files affected, commit count
- **Improvements/Benefits** — Numbered list with impact level (HIGH/MEDIUM/LOW)
- **Risks & Issues** — Categorized as CRITICAL / IMPORTANT / MINOR
- **Scoring Table** — Rate across: Feature Relevance, Code Quality, Security, Robustness, Tests
- **Verdict** — Ready to merge? With mandatory vs optional fixes
- **Next Steps** — What will happen if approved

### 6. Present to User

- Show the report via `notify_user` with `BlockedOnUser: true`
- Wait for user decision:
  - **Approved** → Proceed to step 7
  - **Approved with changes** → Implement the fixes and corrections before merging
  - **Rejected** → Close the PR or leave a review comment

### 7. Implementation (if approved)

> **⚠️ ALL work happens on the release branch, NOT the PR branch.**

- Cherry-pick or merge the PR's changes into the current release branch:

  ```bash
  # Option A: Merge PR branch into release branch
  git merge --no-ff <pr-branch> -m "Merge PR #<NUMBER>: <title>"

  # Option B: Cherry-pick if cleaner
  git cherry-pick <commit-hash>
  ```

- Implement any required fixes identified in the analysis **on the release branch**
- If the Cross-Layer Analysis (4f) identified missing frontend/backend counterparts, implement them
- Run the project's test suite to verify nothing breaks
  // turbo
- Run: `npm test` or equivalent test command
- Commit improvements with descriptive messages
- Push the release branch: `git push origin release/vX.Y.Z`

### 8. Thank the Contributor

- Post a **thank-you comment** on the PR via the GitHub API
- The message should:
  - Thank the author by name/username for their contribution
  - Briefly mention what the PR accomplishes and any improvements applied
  - Note it will be included in the upcoming release
  - Be friendly, professional, and encouraging
- Example: _"Thanks @author for this great contribution! 🎉 The [feature/fix] has been integrated into the release/vX.Y.Z branch and will be part of the next release. We appreciate your effort!"_

### 9. Close the Original PR

- Close the original PR with a comment explaining it was integrated into the release branch:
  ```bash
  gh pr close <NUMBER> --repo <owner>/<repo> --comment "Integrated into release/vX.Y.Z. Will be released as part of v3.X.Y. Thank you!"
  ```

### 10. Continue or Finalize

After processing all approved PRs:

- If more PRs remain, go back to step 7
- When all PRs are processed, **update CHANGELOG.md** on the release branch with all new entries
- Run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user)
