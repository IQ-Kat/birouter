import { getTargetFormat } from "./open-sse/services/provider.ts";
import { parseModelFromRequest, resolveProviderAndModel } from "./open-sse/handlers/chatCore.ts"; // Since they're in chatCore directly?
import { getProviderConfig } from "./open-sse/services/provider.ts";

const body = { model: "codex/gpt-5.3-codex-xhigh" };
const parsedModel = body.model;

function resolveProviderAndModel(rawModel, providerFromPath = "") {
  let provider = providerFromPath;
  let model = rawModel;
  let resolvedAlias = null;

  if (rawModel && rawModel.includes("/")) {
    const parts = rawModel.split("/");
    provider = parts[0];
    model = parts.slice(1).join("/");
  }

  return { provider, model, resolvedAlias: null };
}

const { provider, model, resolvedAlias } = resolveProviderAndModel(parsedModel, "");
const effectiveModel = resolvedAlias || model;

const config = getProviderConfig(provider);
const modelTargetFormat = config?.models?.find((m) => m.id === effectiveModel)?.targetFormat;
const targetFormat = modelTargetFormat || getTargetFormat(provider);

console.log({
  provider,
  model,
  resolvedAlias,
  effectiveModel,
  modelTargetFormat,
  targetFormat,
});
