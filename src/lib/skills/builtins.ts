import { SkillHandler } from "./types";
import { executeWebSearch } from "@/lib/search/executeWebSearch";

export const builtinSkills: Record<string, SkillHandler> = {
  file_read: async (input, context) => {
    const { path } = input as { path: string };
    if (!path || typeof path !== "string") {
      throw new Error("Missing required field: path");
    }
    return { success: true, path, content: "[File read stub]", context: context.apiKeyId };
  },

  file_write: async (input, context) => {
    const { path, content } = input as { path: string; content: string };
    if (!path || !content) {
      throw new Error("Missing required fields: path, content");
    }
    return { success: true, path, bytesWritten: content.length, context: context.apiKeyId };
  },

  http_request: async (input, context) => {
    const { url, method = "GET" } = input as { url: string; method?: string };
    if (!url) {
      throw new Error("Missing required field: url");
    }
    return { success: true, url, method, status: 200, context: context.apiKeyId };
  },

  web_search: async (input, context) => {
    const {
      query,
      limit,
      max_results,
      search_type,
      provider,
      country,
      language,
      time_range,
      offset,
      filters,
      content,
      provider_options,
      strict_filters,
    } = input as {
      query: string;
      limit?: number;
      max_results?: number;
      search_type?: "web" | "news";
      provider?: string;
      country?: string;
      language?: string;
      time_range?: "any" | "day" | "week" | "month" | "year";
      offset?: number;
      filters?: {
        include_domains?: string[];
        exclude_domains?: string[];
        safe_search?: "off" | "moderate" | "strict";
      };
      content?: {
        snippet?: boolean;
        full_page?: boolean;
        format?: "text" | "markdown";
        max_characters?: number;
      };
      provider_options?: Record<string, unknown>;
      strict_filters?: boolean;
    };
    if (!query) {
      throw new Error("Missing required field: query");
    }
    const search = await executeWebSearch({
      query,
      provider,
      limit,
      max_results,
      search_type,
      country,
      language,
      time_range,
      offset,
      filters,
      content,
      provider_options,
      strict_filters,
      apiKeyId: context.apiKeyId || null,
    });
    return {
      success: true,
      provider: search.data.provider,
      query: search.data.query,
      results: search.data.results,
      answer: search.data.answer,
      usage: search.cached ? { queries_used: 0, search_cost_usd: 0 } : search.data.usage,
      metrics: search.data.metrics,
      cached: search.cached,
      context: context.apiKeyId,
    };
  },

  eval_code: async (input, context) => {
    const { code, language = "javascript" } = input as { code: string; language?: string };
    if (!code) {
      throw new Error("Missing required field: code");
    }
    return { success: true, language, output: "[Code execution stub]", context: context.apiKeyId };
  },

  execute_command: async (input, context) => {
    const { command, args = [] } = input as { command: string; args?: string[] };
    if (!command) {
      throw new Error("Missing required field: command");
    }
    return {
      success: true,
      command,
      args,
      output: "[Command execution stub]",
      context: context.apiKeyId,
    };
  },
};

export function registerBuiltinSkills(executor: any): void {
  for (const [name, handler] of Object.entries(builtinSkills)) {
    executor.registerHandler(name, handler);
  }
}
