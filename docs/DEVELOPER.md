# Birouter Developer Guide

This guide explains how to extend Birouter with new providers, executors, and translators.

## Project Structure

- `router-app/src/app/api/`: Next.js API routes for the dashboard and compatibility layers.
- `router-app/open-sse/`: The core routing and execution engine.
  - `executors/`: Adapters for different AI providers.
  - `translator/`: Converters between different AI message formats.
  - `handlers/`: Core logic for handling chat and streaming.
- `router-app/src/sse/`: Handlers for SSE (Server-Sent Events) and high-level routing.

## Adding a New Provider

To add a new provider, you typically need to:

1.  **Define the Provider:** Add the provider definition in the appropriate places (e.g., `open-sse/services/provider.js`).
2.  **Create an Executor (if needed):** If the provider requires special handling (e.g., custom auth or unique API structure), create a new executor in `open-sse/executors/`. Most providers can use the `default.js` executor if they are OpenAI-compatible.
3.  **Add Translators (if needed):** If the provider uses a unique message format, add request and response translators in `open-sse/translator/request/` and `open-sse/translator/response/`.

### Creating a New Executor

Executors are responsible for making the actual network request to the provider.

```javascript
// Example executor structure
export const execute = async (payload, credentials, options) => {
  // 1. Prepare headers and body
  // 2. Make the request (using fetch or similar)
  // 3. Handle the response (streaming or JSON)
  // 4. Return the result
};

export const refreshCredentials = async (credentials) => {
  // Logic to refresh OAuth tokens if applicable
};
```

## Adding a New Translator

Translators normalize requests from clients (e.g., Cursor, Claude Code) and responses from providers.

### Request Translator

Located in `open-sse/translator/request/`.

```javascript
export const transform = (body) => {
  // Convert standard OpenAI-like body to provider-specific format
  return transformedBody;
};
```

### Response Translator

Located in `open-sse/translator/response/`.

```javascript
export const transformStream = (chunk) => {
  // Convert provider-specific SSE chunk to standard OpenAI-like chunk
  return transformedChunk;
};
```

## Development Workflow

1.  **Install Dependencies:** `npm install`
2.  **Run in Dev Mode:** `npm run dev`
3.  **Test Your Changes:** Use a tool like `curl` or a coding tool (e.g., Cursor) pointed to `http://localhost:2004/v1` to verify your changes.

## RTK Token Saver

The RTK (Result Token Kompression) Token Saver is a key feature of Birouter. It works by compressing large tool outputs before they are sent back to the LLM, saving significant input tokens.

To modify RTK logic, check `open-sse/transformer/rtk.js` (if it exists) or search for "RTK" in the codebase.

## Support

For technical questions, please open a GitHub issue or contact the maintainer.
