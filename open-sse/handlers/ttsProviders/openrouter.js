// OpenRouter TTS — via chat completions + audio modality OR dedicated speech endpoint
import { PROVIDER_MEDIA } from "../../providers/index.js";
import { Buffer } from "node:buffer";

const TTS_CFG = PROVIDER_MEDIA["openrouter"]?.ttsConfig || {};

export default {
  async synthesize(text, model, credentials) {
    if (!credentials?.apiKey) throw new Error("No OpenRouter API key configured");

    // model format: "tts-model/voice" e.g. "openai/gpt-4o-mini-tts/alloy"
    let ttsModel = TTS_CFG.defaultModel;
    let voice = "alloy";
    if (model && model.includes("/")) {
      const lastSlash = model.lastIndexOf("/");
      const maybVoice = model.slice(lastSlash + 1);
      const maybeModel = model.slice(0, lastSlash);
      if (maybeModel.includes("/")) {
        ttsModel = maybeModel;
        voice = maybVoice;
      } else {
        voice = model;
      }
    } else if (model) {
      voice = model;
    }

    // Determine if it is a dedicated TTS model (e.g. openai/tts-1, openai/tts-1-hd)
    const isDedicatedTts = ttsModel.includes("/tts-");

    if (isDedicatedTts) {
      // Use OpenRouter's dedicated TTS endpoint (/api/v1/audio/speech)
      const ttsUrl = (TTS_CFG.baseUrl || "https://openrouter.ai/api/v1/chat/completions")
        .replace("/chat/completions", "/audio/speech");

      const res = await fetch(ttsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${credentials.apiKey}`,
          ...(TTS_CFG.headers || {}),
        },
        body: JSON.stringify({
          model: ttsModel,
          input: text,
          voice,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `OpenRouter TTS failed: ${res.status}`);
      }

      const buf = await res.arrayBuffer();
      return { base64: Buffer.from(buf).toString("base64"), format: "mp3" };
    } else {
      // Use chat completions + audio modality (SSE stream) for models like openai/gpt-4o-mini-tts
      const res = await fetch(TTS_CFG.baseUrl || "https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${credentials.apiKey}`,
          ...(TTS_CFG.headers || {}),
        },
        body: JSON.stringify({
          model: ttsModel,
          modalities: ["text", "audio"],
          audio: { voice, format: "wav" },
          stream: true,
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `OpenRouter TTS failed: ${res.status}`);
      }

      // Parse SSE stream, accumulate base64 audio chunks
      const chunks = [];
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const json = JSON.parse(line.slice(6));
            const audioData = json.choices?.[0]?.delta?.audio?.data;
            if (audioData) chunks.push(audioData);
          } catch {}
        }
      }

      if (chunks.length === 0) throw new Error("OpenRouter TTS returned no audio data");
      return { base64: chunks.join(""), format: "wav" };
    }
  },
};
