"use client";

import type { InterceptedRequest } from "@/mitm/inspector/types";
import { normalizeConversation } from "@/mitm/inspector/conversationNormalizer";
import { ChatBubble } from "../chat/ChatBubble";

interface ConversationTabProps {
  request: InterceptedRequest;
}

export function ConversationTab({ request }: ConversationTabProps) {
  const conversation = normalizeConversation(request);

  if (!conversation) {
    return (
      <div className="p-4 text-sm text-text-muted">
        Conversation data not available. This may not be an LLM request or the body
        could not be parsed.
      </div>
    );
  }

  const allTurns = [...conversation.request, ...conversation.response];

  if (allTurns.length === 0) {
    return (
      <div className="p-4 text-sm text-text-muted">No messages found in this request.</div>
    );
  }

  return (
    <div className="h-full overflow-auto p-3 space-y-2">
      {conversation.contextKey && (
        <div className="text-xs text-text-muted mb-2">
          Context fingerprint:{" "}
          <span className="font-mono text-blue-400">#{conversation.contextKey.slice(0, 12)}</span>
        </div>
      )}
      {allTurns.map((turn, i) => (
        <ChatBubble key={i} turn={turn} />
      ))}
    </div>
  );
}
