---
name: omniroute
description: Entry point for OmniRoute — local/remote AI gateway with OpenAI-compatible REST for chat, image, TTS, STT, embeddings, web search, web fetch, MCP, A2A. Use when the user mentions OmniRoute, OMNIROUTE_URL, or wants AI without writing provider boilerplate. This skill covers setup + indexes capability skills; fetch the relevant capability SKILL.md from the URLs below when needed.
---

# OmniRoute

Local/remote AI gateway exposing OpenAI-compatible REST. One key, 207+ providers,
auto-fallback, RTK token saver, MCP server, A2A agents.

## Setup

```bash
export OMNIROUTE_URL="http://localhost:20128"      # or VPS / tunnel URL
export OMNIROUTE_KEY="sk-..."                       # from Dashboard → API Keys
```

All requests: `${OMNIROUTE_URL}/v1/...` with `Authorization: Bearer ${OMNIROUTE_KEY}`.

Verify: `curl $OMNIROUTE_URL/api/health` → `{"ok":true}`

## Discover models

```bash
curl $OMNIROUTE_URL/v1/models                  # chat/LLM (default)
curl $OMNIROUTE_URL/v1/models/image            # image-gen
curl $OMNIROUTE_URL/v1/models/tts              # text-to-speech
curl $OMNIROUTE_URL/v1/models/embedding        # embeddings
curl $OMNIROUTE_URL/v1/models/web              # web search + fetch
curl $OMNIROUTE_URL/v1/models/stt              # speech-to-text
```

Use `data[].id` as `model` field in requests. Combos appear with `owned_by:"combo"`.

## Capability skills

| Capability       | Raw URL                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Chat / code-gen  | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-chat/SKILL.md       |
| Image generation | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-image/SKILL.md      |
| Text-to-speech   | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-tts/SKILL.md        |
| Speech-to-text   | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-stt/SKILL.md        |
| Embeddings       | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-embeddings/SKILL.md |
| Web search       | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-web-search/SKILL.md |
| Web fetch        | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-web-fetch/SKILL.md  |
| MCP server       | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-mcp/SKILL.md        |
| A2A protocol     | https://raw.githubusercontent.com/NomenAK/OmniRoute/main/skills/omniroute-a2a/SKILL.md        |

## Errors

- `401` → set/refresh `OMNIROUTE_KEY` (Dashboard → API Keys)
- `400 Invalid model format` → check `model` exists in `/v1/models/<kind>`
- `503 Provider circuit open` → upstream provider down; retry after `Retry-After` seconds
- `429` → rate limited; honor `Retry-After`

## Differentiators vs OpenAI direct

- **Auto-fallback** combos (14 strategies): never stop coding even if a provider rate-limits
- **RTK token saver**: tool_result compressed via 47 specialized filters (git-diff, test-jest, terraform-plan, docker-logs…) — 20-40% token reduction
- **Caveman mode**: optional terse system prompt injection (LITE/FULL/ULTRA) — 15-25% completion reduction
- **MCP + A2A** servers built-in (this is the only AI router that exposes both protocols)
- **Memory** with FTS5 + Qdrant for persistent agent context
- **Guardrails** for PII masking, prompt injection detection, vision policies
