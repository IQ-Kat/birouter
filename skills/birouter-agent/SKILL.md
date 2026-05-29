---
name: birouter-agent
description: Super-agent skill for Birouter. Use when the user wants an "Agentic" experience (large file editing, multi-step tasks) directly through Birouter without relying on external agents. This skill teaches the AI how to handle server timeouts (Kiro/Vertex) and maximize Birouter features like RTK.
---

# Birouter — Agentic Super Skill

This skill transforms any AI (Claude Code, Cursor, Cline, etc.) into a stable, agentic powered by Birouter. It eliminates common connection drops and timeouts.

## 🛠️ Configuration

Ensure your environment is set up:
```bash
export BIROUTER_URL="http://localhost:2004"
export BIROUTER_KEY="bi-..." # From Dashboard -> Keys
```

## 📜 Mandatory Agentic Protocols

As an AI Agent using Birouter, you **MUST** strictly adhere to these protocols to maintain connection stability, especially when using free/cheap providers (Kiro, Vertex, GLM).

### 1. The 300-Line Rule (Chunked Write)
Server-side timeouts (2-3 minutes) are the #1 cause of "Agent disconnected" errors.
- **Rule**: Never write or edit more than **300 lines** of code in a single message.
- **Action**: If a file is large (>300 lines), write it in logical chunks using `append` or multiple `write` operations.
- **Why**: Keeps the request duration short, preventing the upstream server from killing the connection.

### 2. RTK Awareness (Token Compression)
Birouter uses **RTK (Result Token Compression)** to save 20-40% tokens.
- **What happens**: Large tool outputs (like `git diff` or `cat large_file`) might appear slightly truncated or summarized in your input.
- **Action**: If you need more detail, ask for a specific line range (e.g., `cat file.js | sed -n '100,150p'`). Do not assume information is missing; it's just compressed to save you money.

### 3. Self-Healing Error Handling
If you encounter these status codes, handle them as follows:
- **503 (All accounts unavailable)**: Birouter's auto-fallback is exhausted. Wait 30 seconds and try again, or suggest the user check their Provider connections.
- **429 (Rate Limit)**: Switch to a different model prefix (e.g., if `cc/` hits a limit, try `if/` or `glm/`).
- **401 (Unauthorized)**: Remind the user to check their `BIROUTER_KEY`.

---

## 🚀 Optimized Agentic Workflow

Follow this loop for maximum reliability:

1.  **Analyze**: Understand the task.
2.  **Plan**: Break large tasks into small chunks (max 300 lines per step).
3.  **Execute**: Perform one chunk.
4.  **Validate**: Confirm the chunk was written successfully before moving to the next.

## 🔗 Capability Links

| Role | Provider/Model Prefix | Best For |
|---|---|---|
| **Primary** | `cc/`, `cx/`, `gh/` | High-accuracy coding (Subscriptions) |
| **Agentic** | `kr/`, `if/`, `glm/` | Multi-step tasks, background work (Free/Cheap) |

---
*Powered by Birouter — Save tokens, never stop coding.*
