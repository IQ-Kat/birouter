import { handleTts } from "@/sse/handlers/tts.js";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/** POST /v1/audio/speech/stream - Streaming OpenAI-compatible TTS endpoint */
export async function POST(request) {
  return await handleTts(request, true);
}
