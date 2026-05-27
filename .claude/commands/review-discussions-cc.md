---
description: Read all open GitHub Discussions, summarize them, respond to pending ones, create issues from actionable feature requests, and triage stale threads for closure
---

# /review-discussions — GitHub Discussions Review & Response Workflow

## Overview

This workflow reads all open GitHub Discussions, generates a categorized summary, identifies which ones need a response, drafts and posts replies, optionally creates issues from actionable feature requests, and triages stale threads for closure.

**Modern tooling (replaces deprecated `browser_subagent` flow):**

- Reads use `gh api graphql` — one query returns 50 discussions with full bodies, comments, replies, IDs, and `updatedAt`.
- Writes (post comment, create issue, close discussion) use `gh api graphql` mutations or `gh issue create`.
- Pace at ~1s between writes to avoid abuse-detection throttling.
- `WebFetch` is acceptable only for read-only HTML scraping when GraphQL is unavailable — never for write actions.

// turbo-all

## Steps

### 1. Identify the GitHub Repository

- Run: `git -C <project_root> remote get-url origin` to extract `owner/repo`.
- Parse owner and repo name from the URL (https or ssh form).

### 2. Fetch All Open Discussions (single GraphQL query)

Single `gh api graphql` call — return everything needed for triage. Critical fields: `id` (node ID, **not** the visible `number`), `number`, `title`, `url`, `createdAt`, `updatedAt`, `author.login`, `category.name`, `body`, `answerChosenAt`, plus nested `comments(first: 50) { totalCount, nodes { id, author.login, body, createdAt, replies(first: 20) { nodes { author.login, body, createdAt } } } }`.

Persist the raw JSON to `/tmp/discussions-<repo>-<date>.json` so re-runs in the same session avoid a re-fetch. Build an `id → number` map for the post phase — the GraphQL `addDiscussionComment` mutation requires the node ID, not the number.

Capture **image attachments** present in body or comments (`<img src="...">` or markdown `![...](...)`). Surface their count in the per-discussion summary (e.g., `📷 3 screenshots`) so the user can decide if visual context matters before approving a draft.

### 3. Summarize All Discussions

For each discussion, extract:

- **Title** and **#Number**
- **Author** (GitHub username)
- **Category** (Announcements, General, Ideas, Q&A, Show and tell)
- **Created** + **Last updated** (ISO date)
- **Summary** of original post (1-2 sentences)
- **Comment count** + **last commenter** + **last comment date**
- **Maintainer involvement**: whether the repo owner already replied, and how many times
- **Pending action** — derived state, see categories below
- **Attachments**: count of screenshots / videos / pastebin links
- **Detected language** of the reporter (for reply-language matching)

### 4. Present Summary Report to User

Group by **pending action**, not by category, so the human sees triage buckets at a glance:

| State                   | Meaning                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ⚠️ Needs first response | Zero comments, or all comments are from non-maintainers                                                          |
| 🔄 Follow-up pending    | Maintainer replied, but reporter or third party added a new comment maintainer has not addressed                 |
| 🕒 Stale (>15d)         | Maintainer was last to comment, no activity for 15+ days — candidate for soft-close or reporter-ping (see step 8)|
| ✅ Answered             | Maintainer already replied AND last commenter is the maintainer AND age < 15d                                    |
| 🏁 Resolved             | `answerChosenAt` is set                                                                                          |

Within each bucket, present a table:

| #   | Category | Title              | Author | Updated | Notes                  |
| --- | -------- | ------------------ | ------ | ------- | ---------------------- |
| #N  | Q&A      | short title (60ch) | @user  | YYYY-MM-DD | 📷2 · 🐛bug · 💡FR    |

Tag rows with content hints when detected: `🐛bug` (`[BUG]` / `error` / stacktrace in body), `💡FR` (`feature request` / `add support for`), `❓support` (config/usage question), `🙏thanks` (short ack-only follow-up).

### 5. Draft & Post Responses

#### Reply templates by intent

Pick the template that matches the discussion intent — do NOT use a single generic format.

**A. Bug confirmed** — ack + root cause + tracking + workaround
```
Hey @user! Confirmed -- {root cause in one sentence}. I traced it to `path/to/file.ts:line`.

{Why it happens: 2-4 sentences of technical detail}

I have opened {issue #N} to track the fix. Workaround until it ships: {concrete steps}. Will update here when the patch lands.
```

**B. Feature Request** — ack + status + scope + commit
```
Hey @user! {Status: "Already exists" / "Tracked in #N" / "Reasonable, opening an issue"}.

{If already exists: pointer to dashboard page or doc}
{If tracked: link to umbrella, summarize order/priority}
{If new: open issue + post link back}

{Optional: short technical note on feasibility / trade-offs}
```

**C. Support / config question** — direct answer + reference + offer to dig deeper
```
Hey @user! {One-sentence answer}.

Steps:
1. ...
2. ...
3. ...

Reference: `docs/<path>.md`. If it still fails after that, paste {specific thing} and I will trace it.
```

**D. Thank-you / short follow-up** — 1-2 sentences
```
Glad it helps, @user! {Concrete next marker — when patch ships / when to expect next update}.
```

**E. Stale / closing** — see step 8

#### Posting via gh (replaces deprecated browser flow)

```bash
gh api graphql -f query='
mutation($id: ID!, $body: String!) {
  addDiscussionComment(input: {discussionId: $id, body: $body}) {
    comment { id url }
  }
}' -f id="$NODE_ID" -f body="$BODY"
```

For **threaded replies** (recommended when responding to a specific comment in a long thread), add `replyToId: $parentCommentId` to the input.

**Output hygiene** (still applies even via API — the comment renders in GitHub UI):

- ASCII-safe punctuation: regular hyphens `-`, `->` for arrows
- Markdown OK: `**bold**`, fenced code blocks, `[text](url)` links
- No bare error messages with stack traces from internal logs — sanitize
- Match reporter's language (pt-BR reporter → pt-BR reply; ru reporter → ru reply); default to English when uncertain

**Pacing**: `sleep 1` between mutations. GitHub abuse-detection trips around 10/sec for the same actor.

**Verification**: capture the returned `comment.url` from each mutation. Failed posts (returncode != 0 or `errors` in response) get logged separately and retried once after a 5s pause.

### 6. Create Issues from Actionable Feature Requests

For discussions that contain concrete, actionable feature requests:

1. **Deduplicate FIRST** — before drafting, search existing issues:
   ```bash
   gh issue list --repo $OWNER/$REPO --search "<keywords from FR>" --state open --json number,title,labels
   ```
   If a matching issue (or umbrella) already exists, reuse it — never create a duplicate. Post a comment in the discussion linking to the existing issue.

2. **Ask the user which to create** — even after dedup, the human approves the final list.

3. **Create the issue** with `gh issue create`:
   ```bash
   gh issue create --repo $OWNER/$REPO \
     --title "[feature] <short imperative>" \
     --label enhancement \
     --body @/tmp/issue-body.md
   ```
   Body template:
   ```markdown
   ## Feature Request

   **Source:** Discussion #N by @author

   ## Problem
   What limitation the user hit (in their words, paraphrased)

   ## Proposed Solution
   How it could work

   ### Implementation Ideas
   - File paths likely to touch (use `Grep` if needed to confirm)
   - Related modules / patterns already in the codebase

   ### Current Workarounds
   What users can do today

   ## Additional Context
   - Discussion: #N
   - Related issues/PRs: #X, #Y
   - Upstream references: link to similar implementations in `_references/` if applicable
   ```

4. **Generate task file in `_ideia/`** when the feature needs deeper investigation before implementation:
   ```
   _ideia/<short-kebab-slug>.md
   ```
   Contains: problem statement, current OmniRoute state, how upstream (`_references/9router`, `_references/CLIProxyAPI`, etc.) handles it, proposed implementation levels (short/medium/long term), acceptance criteria.

5. **Link back to discussion** with the real URL:
   ```
   Follow-up @reporter — I've opened issue #N to track this. {1-line summary of what the issue covers}.
   ```

### 7. Final Report

| Discussion | Action Taken                                                  |
| ---------- | ------------------------------------------------------------- |
| #N — Title | Responded (bug confirmed, tracking #M)                        |
| #N — Title | Responded + created issue #M + task file `_ideia/X.md`        |
| #N — Title | Responded (support answered with workaround)                  |
| #N — Title | Responded to follow-up comment                                |
| #N — Title | Closed (stale 15+d, no reply from reporter)                   |
| #N — Title | Ping sent (stale 15+d, will close in 7d if no response)       |

Include totals: comments posted, issues created, discussions closed, discussions pinged. Capture median response time for the batch.

### 8. Stale Discussion Triage (auto-close candidates)

Identify discussions matching **all** of:

- `updatedAt > 15 days ago`
- Maintainer already replied at least once
- Last commenter is the maintainer (the ball is on the reporter's side)
- `answerChosenAt` is null (not formally resolved)
- Category in `{Q&A, General}` — skip `Ideas` / `Show and tell` / `Announcements` (those serve as community references and shouldn't be closed)
- `comments.totalCount >= 2` — there was actual conversation, not a drive-by post
- No label named `keep-open` (escape hatch)

For each candidate, present to the user with a recommended action:

| Action          | When                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| **Soft-close**  | Default — maintainer answered concretely and reporter went silent             |
| **Ping reporter** | Maintainer asked for more info (log dump, screenshot) and never got it      |
| **Keep open**   | Conversation is mid-debug and closing would lose context — operator override  |

**Soft-close mutation:**
```bash
gh api graphql -f query='
mutation($id: ID!) {
  closeDiscussion(input: {discussionId: $id, reason: RESOLVED}) {
    discussion { id closed }
  }
}' -f id="$NODE_ID"
```
Valid `reason` values: `RESOLVED`, `OUTDATED`, `DUPLICATE`. Default to `OUTDATED` for "no response" closures, `RESOLVED` for answered-but-not-confirmed.

Before closing, post a closing comment:
```
Closing for inactivity -- feel free to reopen if you still hit this, or open a fresh issue with a current log. Thanks!
```

**Ping flow** (alternative):
```
@reporter -- still happening on the latest version? Otherwise I'll close this in 7 days for inactivity.
```
Persist the ping in `_cache/discussions-pinged-<date>.json` so the next run knows to close discussions that were pinged 7+ days ago without a reply.

## Notes

- This workflow is **interactive** — always present the summary and wait for user approval before posting responses, creating issues, or closing discussions.
- Use `AskUserQuestion` to gather batched approval — separate questions for "reply scope", "create issues for?", "close stale?". Stale handling is a separate consent from reply posting.
- For discussions in non-English languages (`pt-BR`, `ru`, `zh`, `es`), respond in the same language as the original post. Default to English when uncertain.
- Always reference specific dashboard paths, config options, doc files, or code locations (`file:line`) when explaining existing features — never wave hands.
- When a discussion reveals a bug, separate it from feature requests in the report. Bugs need a tracking issue + workaround; FRs need scoping.
- Before recommending a workaround that mentions a file/flag/setting, verify it exists in the **current** codebase (the previous turn's memory may be stale).
- Trust-but-verify: after a batch post, spot-check 2-3 random `comment.url` returns in the browser to confirm the comments rendered cleanly (no Unicode mojibake, no broken markdown).
- **Secure-by-default guidance** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): when responses recommend security-relevant code (auth, crypto, SSRF, XSS sanitization), prefer well-tested libraries (Helmet.js, DOMPurify, Google Tink, ssrf-req-filter, safe-regex) over hand-rolled solutions.

## Anti-patterns to avoid

- ❌ Posting via `browser_subagent` clicks — slow, flaky, and obsolete since `gh api graphql` mutations exist.
- ❌ N+1 fetches (one per discussion) — use one GraphQL query for all 50.
- ❌ Creating an issue without checking for an existing umbrella / similar one first.
- ❌ Generic "thanks, I'll look into it!" responses — every reply must reference a file, doc, or concrete action.
- ❌ Closing a stale discussion without posting a closing comment first.
- ❌ Skipping the user approval gate ("turbo-all" never bypasses interactive consent for writes).
