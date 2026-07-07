import type { RegistryEntry } from "../../shared.ts";

export const iamhcProvider: RegistryEntry = {
  id: "iamhc",
  alias: "iamhc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.iamhc.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.iamhc.cn/v1/models",
  models: [{ id: "auto", name: "Iamhc Auto" }],
  passthroughModels: true,
};
