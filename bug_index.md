# Bug: Wire Type 4 Protobuf Error on Cursor API

## Symptom

- First request to Cursor (3 msgs, 34 tools) → WORKS
- Second request (5 msgs, 34 tools, ~140KB) → FAILS with "wire type 4" protobuf parse error
- Error comes FROM Cursor's server rejecting our encoded protobuf request

## What "wire type 4" means

- Valid protobuf wire types: 0=VARINT, 1=FIXED64, 2=LEN, 5=FIXED32
- Wire type 4 = "end group" (deprecated, never valid in modern protobuf)
- This means **corrupted protobuf data** — Cursor server reads data bytes as tag bytes
- Root cause: a LENGTH-DELIMITED field has wrong length prefix, causing parse misalignment

## Data Flow

```
Client (Claude format, 5 msgs)
  → chatCore.translateRequest()
    → claude-to-openai.ts (claudeToOpenAIRequest)
    → openai-to-cursor.ts (buildCursorRequest)
  → cursor.ts transformRequest()
    → cursorProtobuf.ts generateCursorBody() → protobuf binary
  → HTTP to Cursor API → "wire type 4" error
```

## Key Files

- `open-sse/translator/request/claude-to-openai.ts` — Claude→OpenAI message conversion
- `open-sse/translator/request/openai-to-cursor.ts` — OpenAI→Cursor message conversion
- `open-sse/utils/cursorProtobuf.ts` — Protobuf binary encoder
- `open-sse/executors/cursor.ts` — Cursor executor (HTTP + protobuf framing)

## Investigation Done (Session 1)

1. **Content type is NOT the issue** — `encodeField()` handles undefined/null/array gracefully (→ empty `0a 00`)
2. **openai-to-cursor always normalizes content to string** (lines 77-87)
3. **tool_calls on assistant msgs are silently ignored** by protobuf encoder (no encoding logic for them)
4. **Debug logging was added** to `encodeRequest()` and `encodeMessage()` to trace message shapes
5. **All basic varint/field encoding tests pass** — no corruption in primitives

## Investigation Done (Session 2 — current)

6. **Round-trip test PASSES** — a synthetic 4-msg + 34-tools + tool_results request encodes and decodes back perfectly
7. **Large payload test PASSES** — 100KB tool result content, frame length matches perfectly (106,810 bytes)
8. **Varint encoding tests PASS** — values up to 268M encode/decode correctly
9. **Null bytes in content work** — no corruption
10. **Missing content on assistant msgs works** — produces valid empty field

## CRITICAL CONCLUSION

The encoding logic itself is **correct for all tested patterns**. The bug is NOT in the encoder primitives.
The issue MUST be in one of:

### HIGH PRIORITY — What to investigate next

#### H1: The REAL production data has something we haven't tested

The user mentioned the log was already provided in a previous session. The 140,267 byte request
with 34 tools and 5 messages has specific data that triggers the bug. We need to:

- **Capture the exact translated messages** before protobuf encoding (add JSON.stringify dump)
- **Capture the hex dump** of the protobuf output
- **Send the hex dump to a protobuf decoder** to find where parsing breaks

#### H2: assistant message with tool_calls AND content=undefined

In openai-to-cursor.ts line 96-97, when assistant has tool_calls but empty content:

```js
const assistantMsg = { role: "assistant" }; // NO content property
if (content) {
  assistantMsg.content = content;
} // content="" is falsy → skipped
```

Result: `msg.content` is `undefined`. In `encodeMessage`, this produces `encodeField(1, LEN, undefined)` → `0a 00`.
This is technically valid protobuf (empty string field), BUT Cursor's server might require the content field to be present as a non-empty string for assistant messages. The FIRST request (3 msgs) might not have an assistant message at all, while the SECOND (5 msgs) does.

**FIX TO TRY**: Always set `content: ""` on assistant messages in openai-to-cursor.ts.

#### H3: tool_calls being passed to protobuf encoder as stray properties

The Cursor message in the translated body has `{ role, content, tool_calls, tool_results }`.
The protobuf encoder only uses `content`, `role`, and `tool_results`. The `tool_calls` array
is silently ignored. BUT if Cursor's real protocol expects tool calls to be encoded differently
(maybe as part of the content or as a separate protobuf field), we might be sending incomplete data.

#### H4: Encoding `encodeVarint` with value from `>>>` unsigned shift on large numbers

`encodeVarint` uses `value >>>= 7` which treats value as unsigned 32-bit. If a tag or length
exceeds 2^31, the unsigned shift behavior could produce wrong bytes. However, tests show this
works correctly up to 268M, and our payloads are ~140KB, so this is unlikely.

## Recommended Fix (try first — LOW RISK)

In `openai-to-cursor.ts`, always ensure assistant messages have `content: ""`:

```js
// Line 96-99, change from:
const assistantMsg = { role: "assistant" };
if (content) {
  assistantMsg.content = content;
}

// To:
const assistantMsg = { role: "assistant", content: content || "" };
```

## How to debug further

Add this to `cursor.ts` `transformRequest()` BEFORE `generateCursorBody()`:

```js
console.log("[CURSOR_DEBUG] Messages to encode:", JSON.stringify(messages, null, 2).slice(0, 2000));
```

Then reproduce the error and check logs for the exact message shapes.
