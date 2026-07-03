// Local device TTS — macOS `say` + Windows SAPI + ffmpeg
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const execFileAsync = promisify(execFile);

let _voicesCache = null;

async function fetchVoicesMac() {
  const { stdout } = await execFileAsync("say", ["-v", "?"]);
  const voices = [];
  for (const line of stdout.split("\n")) {
    const m = line.match(/^([^\s].*?)\s{2,}([a-z]{2}_[A-Z]{2})/);
    if (!m) continue;
    const name = m[1].trim();
    const locale = m[2].trim();
    const lang = locale.split("_")[0];
    const country = locale.split("_")[1];
    voices.push({ id: name, name, locale, lang, country, gender: "" });
  }
  return voices;
}

async function fetchVoicesWin() {
  const script = [
    "Add-Type -AssemblyName System.Speech;",
    "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;",
    "$s.GetInstalledVoices() | ForEach-Object { $v = $_.VoiceInfo;",
    "[PSCustomObject]@{ Name=$v.Name; Culture=$v.Culture.Name; Gender=$v.Gender } }",
    "| ConvertTo-Json -Compress",
  ].join(" ");
  const { stdout } = await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-Command", script],
    { windowsHide: true }
  );
  const raw = JSON.parse(stdout.trim() || "[]");
  const list = Array.isArray(raw) ? raw : [raw];
  return list.map((v) => {
    const culture = v.Culture || "en-US";
    const [lang, country = ""] = culture.split("-");
    const genderMap = { 1: "Male", 2: "Female", Male: "Male", Female: "Female" };
    return {
      id: v.Name, name: v.Name,
      locale: culture.replace("-", "_"),
      lang, country,
      gender: genderMap[v.Gender] || "",
    };
  });
}

export async function fetchLocalDeviceVoices() {
  if (_voicesCache) return _voicesCache;
  try {
    const voices = process.platform === "win32" ? await fetchVoicesWin() : await fetchVoicesMac();
    _voicesCache = voices;
    return voices;
  } catch {
    return [];
  }
}

async function synthesizeMacOrWin(text, voiceId) {
  const dir = await mkdtemp(join(tmpdir(), "tts-"));
  const textPath = join(dir, "input.txt");
  const wavPath = join(dir, "out.wav");
  await writeFile(textPath, text, "utf-8");

  try {
    if (process.platform === "win32") {
      // Windows: use PowerShell System.Speech
      const script = [
        "Add-Type -AssemblyName System.Speech;",
        "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;",
        voiceId ? `$s.SelectVoice(${JSON.stringify(voiceId)});` : "",
        `$s.SetOutputToWaveFile(${JSON.stringify(wavPath)});`,
        `$text = Get-Content -Raw -Path ${JSON.stringify(textPath)} -Encoding UTF8;`,
        "$s.Speak($text);",
        "$s.Dispose();"
      ].join(" ");

      await execFileAsync(
        "powershell.exe",
        ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-Command", script],
        { windowsHide: true }
      );
    } else {
      // macOS: use say command
      const args = voiceId
        ? ["-v", voiceId, "-f", textPath, "-o", wavPath, "--file-format=WAVE"]
        : ["-f", textPath, "-o", wavPath, "--file-format=WAVE"];
      await execFileAsync("say", args);
    }

    // Try converting to mp3 with ffmpeg if available (optional optimization), otherwise fallback to wav
    const mp3Path = join(dir, "out.mp3");
    try {
      await execFileAsync("ffmpeg", ["-y", "-i", wavPath, "-codec:a", "libmp3lame", "-qscale:a", "4", mp3Path]);
      const buf = await readFile(mp3Path);
      return { base64: buf.toString("base64"), format: "mp3" };
    } catch {
      // If ffmpeg is missing/fails, read WAV directly
      const buf = await readFile(wavPath);
      return { base64: buf.toString("base64"), format: "wav" };
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export default {
  noAuth: true,
  async synthesize(text, model) {
    const { base64, format } = await synthesizeMacOrWin(text, model);
    return { base64, format };
  },
};
