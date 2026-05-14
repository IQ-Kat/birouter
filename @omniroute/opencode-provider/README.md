# @omniroute/opencode-provider

Provider plugin for connecting [OpenCode](https://github.com/anomalyco/opencode) to [OmniRoute](https://github.com/diegosouzapw/OmniRoute).

## Installation

```bash
npm install @omniroute/opencode-provider
```

## Usage

```javascript
import { createOmniRouteProvider } from "@omniroute/opencode-provider";

const provider = createOmniRouteProvider({
  baseURL: "http://localhost:20128/v1",
  apiKey: "your-omniroute-api-key",
});
```

Then configure OpenCode to use the provider:

```jsonc
// OpenCode settings
{
  "provider": provider
}
```

## API

### `createOmniRouteProvider(options)`

Creates an OpenCode-compatible provider object that routes requests through OmniRoute.

**Options:**

| Option    | Type     | Required | Description                                                |
| --------- | -------- | -------- | ---------------------------------------------------------- |
| `baseURL` | `string` | Yes      | OmniRoute API base URL (e.g., `http://localhost:20128/v1`) |
| `apiKey`  | `string` | Yes      | OmniRoute API key                                          |
| `model`   | `string` | No       | Model identifier (default: `"opencode"`)                   |

**Returns:** An OpenCode-compatible provider object with `id`, `name`, `npm`, `options`, and `auth` fields.
