import { CLAUDE_API_HEADERS } from "../shared.js";

export default {
  id: "minimax-cn",
  alias: "minimax-cn",
  transport: {
    baseUrl: "https://api.minimaxi.com/anthropic/v1/messages",
    format: "claude",
    urlSuffix: "?beta=true",
    headers: { ...CLAUDE_API_HEADERS }
  },
  models: [
    { id: "MiniMax-M3", name: "MiniMax M3", targetFormat: "claude" },
    { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "MiniMax-M2.1", name: "MiniMax M2.1" }
  ]
};
