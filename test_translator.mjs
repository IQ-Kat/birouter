import { translateNonStreamingResponse } from "./open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "./open-sse/translator/formats.ts";
console.log(
  translateNonStreamingResponse(
    { object: "chat.completion", choices: [] },
    FORMATS.CLAUDE,
    FORMATS.OPENAI
  )
);
