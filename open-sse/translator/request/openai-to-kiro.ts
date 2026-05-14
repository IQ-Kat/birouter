/**
 * OpenAI to Kiro Request Translator
 * Converts OpenAI Chat Completions format to Kiro/AWS CodeWhisperer format
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

function parseToolInput(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") {
    return {};
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return {};
  }

  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Recursively sanitize JSON Schema for Kiro API.
 * Kiro returns 400 "Improperly formed request" if:
 * - `required` is an empty array []
 * - `additionalProperties` is present anywhere
 */
function normalizeKiroToolSchema(schema: unknown): Record<string, unknown> {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return { type: "object", properties: {} };
  }

  const result: Record<string, unknown> = {};
  const src = schema as Record<string, unknown>;

  for (const [key, value] of Object.entries(src)) {
    // Skip empty required arrays — Kiro rejects them
    if (key === "required" && Array.isArray(value) && value.length === 0) {
      continue;
    }
    // Skip additionalProperties — Kiro doesn't support it
    if (key === "additionalProperties") {
      continue;
    }
    // Recursively process nested objects
    if (
      key === "properties" &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      const sanitizedProps: Record<string, unknown> = {};
      for (const [propName, propValue] of Object.entries(value as Record<string, unknown>)) {
        sanitizedProps[propName] = normalizeKiroToolSchema(propValue);
      }
      result[key] = sanitizedProps;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = normalizeKiroToolSchema(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null && !Array.isArray(item)
          ? normalizeKiroToolSchema(item)
          : item
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Convert OpenAI messages to Kiro format
 * Rules: system/tool/user -> user role, merge consecutive same roles
 */
function convertMessages(messages, tools, model) {
  let history = [];
  let currentMessage = null;

  let pendingUserContent = [];
  let pendingAssistantContent = [];
  let pendingToolResults = [];
  let currentRole = null;

  const flushPending = () => {
    if (currentRole === "user") {
      const content = pendingUserContent.join("\n\n").trim() || "(empty)";
      const userMsg: {
        userInputMessage: {
          content: string;
          modelId: string;
          origin: string;
          userInputMessageContext?: {
            toolResults?: Array<Record<string, unknown>>;
            tools?: Array<Record<string, unknown>>;
          };
        };
      } = {
        userInputMessage: {
          content: content,
          modelId: "",
          origin: "AI_EDITOR",
        },
      };

      if (pendingToolResults.length > 0) {
        userMsg.userInputMessage.userInputMessageContext = {
          toolResults: pendingToolResults,
        };
      }

      // Add tools to first user message
      if (tools && tools.length > 0 && history.length === 0) {
        if (!userMsg.userInputMessage.userInputMessageContext) {
          userMsg.userInputMessage.userInputMessageContext = {};
        }
        userMsg.userInputMessage.userInputMessageContext.tools = tools.map((t) => {
          const name = t.function?.name || t.name;
          let description = t.function?.description || t.description || "";

          if (!description.trim()) {
            description = `Tool: ${name}`;
          }

          return {
            toolSpecification: {
              name,
              description,
              inputSchema: {
                json: normalizeKiroToolSchema(
                  t.function?.parameters || t.parameters || t.input_schema || {}
                ),
              },
            },
          };
        });
      }

      history.push(userMsg);
      currentMessage = userMsg;
      pendingUserContent = [];
      pendingToolResults = [];
    } else if (currentRole === "assistant") {
      const content = pendingAssistantContent.join("\n\n").trim() || "(empty)";
      const assistantMsg = {
        assistantResponseMessage: {
          content: content,
        },
      };
      history.push(assistantMsg);
      pendingAssistantContent = [];
    }
  };

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    let role = msg.role;

    // Normalize: system/tool -> user
    if (role === "system" || role === "tool") {
      role = "user";
    }

    // If role changes, flush pending
    if (role !== currentRole && currentRole !== null) {
      flushPending();
    }
    currentRole = role;

    if (role === "user") {
      // Extract content
      let content = "";
      if (typeof msg.content === "string") {
        content = msg.content;
      } else if (Array.isArray(msg.content)) {
        const textParts = msg.content
          .filter((c) => c.type === "text" || c.text)
          .map((c) => c.text || "");
        content = textParts.join("\n");

        // Check for tool_result blocks
        const toolResultBlocks = msg.content.filter((c) => c.type === "tool_result");
        if (toolResultBlocks.length > 0) {
          toolResultBlocks.forEach((block) => {
            const text = Array.isArray(block.content)
              ? block.content.map((c) => c.text || "").join("\n")
              : typeof block.content === "string"
                ? block.content
                : "";

            pendingToolResults.push({
              toolUseId: block.tool_use_id,
              status: "success",
              content: [{ text: text }],
            });
          });
        }
      }

      // Handle tool role (from normalized)
      if (msg.role === "tool") {
        const toolContent = typeof msg.content === "string" ? msg.content : "";
        pendingToolResults.push({
          toolUseId: msg.tool_call_id,
          status: "success",
          content: [{ text: toolContent }],
        });
      } else if (content) {
        pendingUserContent.push(content);
      }
    } else if (role === "assistant") {
      // Extract text content and tool uses
      let textContent = "";
      let toolUses = [];

      if (Array.isArray(msg.content)) {
        const textBlocks = msg.content.filter((c) => c.type === "text");
        textContent = textBlocks
          .map((b) => b.text)
          .join("\n")
          .trim();

        const toolUseBlocks = msg.content.filter((c) => c.type === "tool_use");
        toolUses = toolUseBlocks;
      } else if (typeof msg.content === "string") {
        textContent = msg.content.trim();
      }

      if (msg.tool_calls && msg.tool_calls.length > 0) {
        toolUses = msg.tool_calls;
      }

      if (textContent) {
        pendingAssistantContent.push(textContent);
      }

      // Store tool uses in last assistant message
      if (toolUses.length > 0) {
        if (pendingAssistantContent.length === 0) {
          // pendingAssistantContent.push("Call tools");
        }

        // Flush to create assistant message with toolUses
        flushPending();

        const lastMsg = history[history.length - 1];
        if (lastMsg?.assistantResponseMessage) {
          lastMsg.assistantResponseMessage.toolUses = toolUses.map((tc) => {
            if (tc.function) {
              return {
                toolUseId: tc.id || uuidv4(),
                name: tc.function.name,
                input: parseToolInput(tc.function.arguments),
              };
            } else {
              return {
                toolUseId: tc.id || uuidv4(),
                name: tc.name,
                input: parseToolInput(tc.input),
              };
            }
          });
        }

        currentRole = null;
      }
    }
  }

  // Flush remaining
  if (currentRole !== null) {
    flushPending();
  }

  // Kiro requires currentMessage to be a user turn. If the request ends with a
  // user turn, move that final turn into currentMessage. If it ends with an
  // assistant/tool turn, keep chronological history intact and ask Kiro to
  // continue instead of reordering prior turns.
  if (history.length > 0 && history[history.length - 1].userInputMessage) {
    currentMessage = history.pop();
  } else {
    currentMessage = {
      userInputMessage: {
        content: "Continue",
        modelId: model,
      },
    };
  }

  const firstHistoryItem = history[0];
  if (
    firstHistoryItem?.userInputMessage?.userInputMessageContext?.tools &&
    !currentMessage?.userInputMessage?.userInputMessageContext?.tools
  ) {
    if (!currentMessage.userInputMessage.userInputMessageContext) {
      currentMessage.userInputMessage.userInputMessageContext = {};
    }
    currentMessage.userInputMessage.userInputMessageContext.tools =
      firstHistoryItem.userInputMessage.userInputMessageContext.tools;
  }

  // Clean up history for Kiro API compatibility
  history.forEach((item) => {
    if (item.userInputMessage?.userInputMessageContext?.tools) {
      delete item.userInputMessage.userInputMessageContext.tools;
    }

    if (
      item.userInputMessage?.userInputMessageContext &&
      Object.keys(item.userInputMessage.userInputMessageContext).length === 0
    ) {
      delete item.userInputMessage.userInputMessageContext;
    }

    if (item.userInputMessage && !item.userInputMessage.modelId) {
      item.userInputMessage.modelId = model;
    }

    // Kiro API requires `origin` on every userInputMessage
    if (item.userInputMessage && !item.userInputMessage.origin) {
      item.userInputMessage.origin = "AI_EDITOR";
    }
  });

  // Kiro expects history to alternate between user and assistant turns. After
  // normalizing `system`/`tool` roles into `userInputMessage`, the history can
  // contain adjacent user turns, which Kiro can reject. Merge consecutive
  // `userInputMessage` entries by concatenating their content and preserving
  // any attached `userInputMessageContext` (e.g. accumulated toolResults).
  //
  // Why this is not redundant with the `flushPending` grouping in the main
  // loop: the assistant branch resets `currentRole = null` after emitting
  // `toolUses`. Any following `tool` role (normalized to user) and a
  // subsequent `user` role therefore each open their own flush, producing
  // two adjacent `userInputMessage` entries in history. This pass collapses
  // those.
  const mergedHistory: typeof history = [];
  for (const item of history) {
    const previous = mergedHistory[mergedHistory.length - 1];
    if (item.userInputMessage && previous?.userInputMessage) {
      const previousContent = previous.userInputMessage.content || "";
      const currentContent = item.userInputMessage.content || "";
      previous.userInputMessage.content = previousContent
        ? `${previousContent}\n\n${currentContent}`
        : currentContent;

      if (item.userInputMessage.userInputMessageContext) {
        const previousContext = previous.userInputMessage.userInputMessageContext || {};
        const nextContext = item.userInputMessage.userInputMessageContext;
        const mergedContext: Record<string, unknown> = { ...previousContext };

        for (const [key, value] of Object.entries(nextContext)) {
          const existing = (previousContext as Record<string, unknown>)[key];
          if (Array.isArray(existing) && Array.isArray(value)) {
            mergedContext[key] = [...existing, ...value];
          } else {
            mergedContext[key] = value;
          }
        }

        previous.userInputMessage.userInputMessageContext = mergedContext;
      }
    } else if (item.assistantResponseMessage && previous?.assistantResponseMessage) {
      // Kiro API also rejects consecutive assistant messages. Merge them.
      const previousContent = previous.assistantResponseMessage.content || "";
      const currentContent = item.assistantResponseMessage.content || "";
      previous.assistantResponseMessage.content = previousContent
        ? `${previousContent}\n\n${currentContent}`
        : currentContent;

      if (item.assistantResponseMessage.toolUses) {
        const existingToolUses = previous.assistantResponseMessage.toolUses || [];
        previous.assistantResponseMessage.toolUses = [
          ...existingToolUses,
          ...item.assistantResponseMessage.toolUses,
        ];
      }
    } else {
      mergedHistory.push(item);
    }
  }

  // Ensure first message is user. Kiro API requires conversations to start
  // with a user message (fixes "Improperly formed request" for assistant-first).
  if (mergedHistory.length > 0 && mergedHistory[0].assistantResponseMessage) {
    mergedHistory.unshift({
      userInputMessage: {
        content: "(empty)",
        modelId: model,
        origin: "AI_EDITOR",
      },
    });
  }

  // Ensure assistant exists before toolResults. Kiro API validates that every
  // toolResults array has a preceding assistantResponseMessage with toolUses.
  // When the assistant message is missing (truncated conversation), we strip
  // the orphaned toolResults and convert them to text to preserve context.
  for (let i = 0; i < mergedHistory.length; i++) {
    const item = mergedHistory[i];
    if (!item.userInputMessage?.userInputMessageContext?.toolResults) continue;

    const prev = mergedHistory[i - 1];
    const hasPrecedingAssistant =
      prev?.assistantResponseMessage?.toolUses && prev.assistantResponseMessage.toolUses.length > 0;

    if (!hasPrecedingAssistant) {
      const toolResults = item.userInputMessage.userInputMessageContext.toolResults as Array<{
        toolUseId?: string;
        content?: Array<{ text?: string }>;
      }>;
      const toolResultTexts = toolResults
        .map((tr) => {
          const id = tr.toolUseId || "";
          const text = tr.content?.map((c) => c.text || "").join("\n") || "";
          return id ? `[Tool Result (${id})]\n${text}` : `[Tool Result]\n${text}`;
        })
        .join("\n\n");

      const originalContent = item.userInputMessage.content || "";
      item.userInputMessage.content = originalContent
        ? `${originalContent}\n\n${toolResultTexts}`
        : toolResultTexts;
      delete item.userInputMessage.userInputMessageContext.toolResults;

      if (Object.keys(item.userInputMessage.userInputMessageContext).length === 0) {
        delete item.userInputMessage.userInputMessageContext;
      }
    }
  }

  // Also check currentMessage for orphaned toolResults (not in history)
  if (currentMessage?.userInputMessage?.userInputMessageContext?.toolResults) {
    const lastHistory = mergedHistory[mergedHistory.length - 1];
    const hasPrecedingAssistant =
      lastHistory?.assistantResponseMessage?.toolUses &&
      lastHistory.assistantResponseMessage.toolUses.length > 0;

    if (!hasPrecedingAssistant) {
      const toolResults = currentMessage.userInputMessage.userInputMessageContext
        .toolResults as Array<{ toolUseId?: string; content?: Array<{ text?: string }> }>;
      const toolResultTexts = toolResults
        .map((tr) => {
          const id = tr.toolUseId || "";
          const text = tr.content?.map((c) => c.text || "").join("\n") || "";
          return id ? `[Tool Result (${id})]\n${text}` : `[Tool Result]\n${text}`;
        })
        .join("\n\n");

      const originalContent = currentMessage.userInputMessage.content || "";
      currentMessage.userInputMessage.content = originalContent
        ? `${originalContent}\n\n${toolResultTexts}`
        : toolResultTexts;
      delete currentMessage.userInputMessage.userInputMessageContext.toolResults;

      if (Object.keys(currentMessage.userInputMessage.userInputMessageContext).length === 0) {
        delete currentMessage.userInputMessage.userInputMessageContext;
      }
    }
  }

  // Ensure alternating roles by inserting synthetic assistant messages
  // between consecutive user turns that couldn't be merged.
  const alternatingHistory: typeof mergedHistory = [];
  for (const item of mergedHistory) {
    const last = alternatingHistory[alternatingHistory.length - 1];
    if (item.userInputMessage && last?.userInputMessage) {
      alternatingHistory.push({
        assistantResponseMessage: { content: "(empty)" },
      });
    }
    alternatingHistory.push(item);
  }

  return { history: alternatingHistory, currentMessage };
}

/**
 * Build Kiro payload from OpenAI format
 */
export function buildKiroPayload(model, body, stream, credentials) {
  const messages = body.messages || [];
  const tools = body.tools || [];
  const maxTokens = body.max_tokens ?? body.max_completion_tokens ?? 32000;
  const temperature = body.temperature;
  const topP = body.top_p;

  const { history, currentMessage } = convertMessages(messages, tools, model);

  const profileArn = credentials?.providerSpecificData?.profileArn || "";

  let finalContent = currentMessage?.userInputMessage?.content || "";
  const timestamp = new Date().toISOString();
  finalContent = `[Context: Current time is ${timestamp}]\n\n${finalContent}`;

  const payload: {
    conversationState: {
      chatTriggerType: string;
      conversationId: string;
      currentMessage: {
        userInputMessage: {
          content: string;
          modelId: string;
          origin: string;
          userInputMessageContext?: Record<string, unknown>;
        };
      };
      history: unknown[];
    };
    profileArn?: string;
    inferenceConfig?: {
      maxTokens?: number;
      temperature?: number;
      topP?: number;
    };
  } = {
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: uuidv4(), // We must override this with deterministic ID
      currentMessage: {
        userInputMessage: {
          content: finalContent,
          modelId: model,
          origin: "AI_EDITOR",
          ...(currentMessage?.userInputMessage?.userInputMessageContext && {
            userInputMessageContext: currentMessage.userInputMessage.userInputMessageContext,
          }),
        },
      },
      history: history,
    },
  };

  // Determistic session caching for Kiro
  const NAMESPACE_KIRO = "34f7193f-561d-4050-bc84-9547d953d6bf";
  const firstContent =
    history.length > 0 && history[0].userInputMessage?.content
      ? history[0].userInputMessage.content
      : finalContent;

  // Use uuidv5 with the hash of the system prompt / first message to maintain AWS Builder ID context cache
  payload.conversationState.conversationId = uuidv5(
    (firstContent || "").substring(0, 4000),
    NAMESPACE_KIRO
  );

  if (profileArn) {
    payload.profileArn = profileArn;
  }

  if (maxTokens || temperature !== undefined || topP !== undefined) {
    payload.inferenceConfig = {};
    if (maxTokens) payload.inferenceConfig.maxTokens = maxTokens;
    if (temperature !== undefined) payload.inferenceConfig.temperature = temperature;
    if (topP !== undefined) payload.inferenceConfig.topP = topP;
  }

  return payload;
}

register(FORMATS.OPENAI, FORMATS.KIRO, buildKiroPayload, null);
