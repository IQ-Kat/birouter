# OmniRoute AI Agent Skills

Drop-in skills that let any AI agent (Claude Desktop, ChatGPT, Cursor, Cline, Continue, etc.)
consume OmniRoute via OpenAI-compatible REST in one fetch.

## How agents use these

```
User to agent: "Use OmniRoute for code-gen. Fetch this URL and follow it:
https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md"
```

The agent retrieves the manifest, sees the setup + endpoints, and routes calls
through `$OMNIROUTE_URL/v1/...` with `Authorization: Bearer $OMNIROUTE_KEY`.

## Skills index

| Capability               | Manifest                                                       |
| ------------------------ | -------------------------------------------------------------- |
| Entry point + setup      | [omniroute/SKILL.md](omniroute/SKILL.md)                       |
| Chat / code-gen          | [omniroute-chat/SKILL.md](omniroute-chat/SKILL.md)             |
| Image generation         | [omniroute-image/SKILL.md](omniroute-image/SKILL.md)           |
| Text-to-speech           | [omniroute-tts/SKILL.md](omniroute-tts/SKILL.md)               |
| Speech-to-text           | [omniroute-stt/SKILL.md](omniroute-stt/SKILL.md)               |
| Embeddings               | [omniroute-embeddings/SKILL.md](omniroute-embeddings/SKILL.md) |
| Web search               | [omniroute-web-search/SKILL.md](omniroute-web-search/SKILL.md) |
| Web fetch (URL→markdown) | [omniroute-web-fetch/SKILL.md](omniroute-web-fetch/SKILL.md)   |
| MCP server               | [omniroute-mcp/SKILL.md](omniroute-mcp/SKILL.md)               |
| A2A protocol             | [omniroute-a2a/SKILL.md](omniroute-a2a/SKILL.md)               |

## Format

Each `SKILL.md` follows the Anthropic skill manifest spec with YAML frontmatter
(`name`, `description`) and a self-contained markdown body: setup, endpoints,
examples, and error codes. Assume the reader is an agent with no prior context.

## Additional skills

OmniRoute includes two protocol-level skills not found in other routers:

- `omniroute-mcp` — exposes 37 MCP tools (memory, skills, providers, routing) over SSE/stdio/HTTP
- `omniroute-a2a` — exposes 5 A2A skills (smart-routing, quota, discovery, cost, health)
