"use client";

/**
 * ProviderIcon — Renders a provider logo using @lobehub/icons with PNG fallback.
 *
 * Strategy (#529):
 * 1. Try @lobehub/icons ProviderIcon (130+ providers, React components)
 * 2. Fall back to /providers/{id}.png (existing static assets)
 * 3. Fall back to a generic AI icon
 *
 * Usage:
 *   <ProviderIcon providerId="openai" size={24} />
 *   <ProviderIcon providerId="anthropic" size={28} type="color" />
 */

import { memo, useState, Component, type ReactNode } from "react";
import Image from "next/image";
import { ProviderIcon as LobehubProviderIcon } from "@lobehub/icons";

// Mapping from OmniRoute provider IDs → Lobehub icon IDs
// Lobehub uses lowercase IDs matching ModelProvider enum values
const LOBEHUB_PROVIDER_MAP: Record<string, string> = {
  openai: "openai",
  anthropic: "anthropic",
  claude: "anthropic",
  gemini: "google",
  google: "google",
  deepseek: "deepseek",
  groq: "groq",
  mistral: "mistral",
  cohere: "cohere",
  perplexity: "perplexity",
  xai: "xai",
  grok: "xai",
  together: "togetherai",
  fireworks: "fireworks",
  "fireworks-ai": "fireworks",
  cerebras: "cerebras",
  huggingface: "huggingface",
  "hugging-face": "huggingface",
  openrouter: "openrouter",
  "open-router": "openrouter",
  ollama: "ollama",
  minimax: "minimax",
  qwen: "qwen",
  alibaba: "qwen",
  moonshot: "moonshot",
  kimi: "moonshot",
  baidu: "baidu",
  ernie: "baidu",
  spark: "iflytek",
  "zhipu-ai": "zhipu",
  zhipu: "zhipu",
  lmsys: "lmsys",
  "stability-ai": "stability",
  stability: "stability",
  replicate: "replicate",
  ai21: "ai21",
  nvidia: "nvidia",
  cloudflare: "cloudflare",
  "cloudflare-ai": "cloudflare",
  "aws-bedrock": "bedrock",
  bedrock: "bedrock",
  azure: "azure",
  "azure-openai": "azure",
  copilot: "githubcopilot",
  "github-copilot": "githubcopilot",
  mistralai: "mistral",
  codex: "openai",
  blackbox: "blackboxai",
  blackboxai: "blackboxai",
  pollinations: "pollinations",
};

interface ProviderIconProps {
  providerId: string;
  size?: number;
  type?: "mono" | "color";
  className?: string;
  style?: React.CSSProperties;
}

/** Error boundary to catch Lobehub component render errors gracefully. */
class LobehubErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function GenericProviderIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ProviderIcon = memo(function ProviderIcon({
  providerId,
  size = 24,
  type = "color",
  className,
  style,
}: ProviderIconProps) {
  const lobehubId = LOBEHUB_PROVIDER_MAP[providerId.toLowerCase()] ?? null;
  const [useLobehub, setUseLobehub] = useState(lobehubId !== null);
  const [usePng, setUsePng] = useState(true);

  if (useLobehub && lobehubId) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <LobehubErrorBoundary onError={() => setUseLobehub(false)}>
          <LobehubProviderIcon provider={lobehubId} size={size} type={type} />
        </LobehubErrorBoundary>
      </span>
    );
  }

  if (usePng) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <Image
          src={`/providers/${providerId}.png`}
          alt={providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain" }}
          onError={() => setUsePng(false)}
          unoptimized
        />
      </span>
    );
  }

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <GenericProviderIcon size={size} />
    </span>
  );
});

export default ProviderIcon;
export type { ProviderIconProps };
