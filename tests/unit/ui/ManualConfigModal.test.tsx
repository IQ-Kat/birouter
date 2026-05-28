// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import type {
  ManualConfigModalProps,
  ManualConfigModalCustomCode,
} from "@/shared/components/cli/ManualConfigModal";

// ── Import ────────────────────────────────────────────────────────────────────

const { default: ManualConfigModal } = await import("@/shared/components/cli/ManualConfigModal");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function makeTool(overrides: Partial<CliCatalogEntry> = {}): CliCatalogEntry {
  return {
    id: "continue",
    name: "Continue",
    icon: "terminal",
    color: "#7C3AED",
    description: "Continue AI coding assistant",
    docsUrl: "https://example.com",
    configType: "guide",
    category: "code",
    vendor: "continue.dev",
    acpSpawnable: false,
    baseUrlSupport: "full",
    codeBlock: {
      language: "json",
      code: '{\n  "baseURL": "{{baseUrl}}",\n  "apiKey": "{{apiKey}}",\n  "model": "{{model}}"\n}',
    },
    ...overrides,
  };
}

function renderModal(props: ManualConfigModalProps): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<ManualConfigModal {...props} />);
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  // Mock clipboard
  const writeText = vi.fn(() => Promise.resolve());
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ManualConfigModal", () => {
  it("does not render when open=false", () => {
    const container = renderModal({
      open: false,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it("renders when open=true", () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
  });

  it("interpolates {{baseUrl}} in code block", () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
    const pre = container.querySelector("pre");
    expect(pre?.textContent).toContain("http://localhost:20128");
    expect(pre?.textContent).not.toContain("{{baseUrl}}");
  });

  it("interpolates {{apiKey}} in code block", () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test-key",
      model: "gpt-4o",
    });
    const pre = container.querySelector("pre");
    expect(pre?.textContent).toContain("sk-test-key");
    expect(pre?.textContent).not.toContain("{{apiKey}}");
  });

  it("interpolates {{model}} in code block", () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "claude-sonnet-4-5",
    });
    const pre = container.querySelector("pre");
    expect(pre?.textContent).toContain("claude-sonnet-4-5");
    expect(pre?.textContent).not.toContain("{{model}}");
  });

  it("uses customCode when provided instead of tool.codeBlock", () => {
    const customCode: ManualConfigModalCustomCode = {
      language: "bash",
      code: "export BASE_URL={{baseUrl}}",
    };
    const tool = makeTool({ codeBlock: undefined });
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool,
      baseUrl: "https://custom.example.com",
      apiKey: "sk-test",
      model: "gpt-4o",
      customCode,
    });
    const pre = container.querySelector("pre");
    expect(pre?.textContent).toContain("https://custom.example.com");
    expect(pre?.textContent).toContain("export BASE_URL=");
  });

  it("calls navigator.clipboard.writeText when Copy button is clicked", async () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });

    const copyButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Copy")
    );
    expect(copyButton).not.toBeUndefined();

    await act(async () => {
      copyButton!.click();
      await Promise.resolve();
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("shows Copied! feedback after copying", async () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });

    const copyButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Copy")
    );

    await act(async () => {
      copyButton!.click();
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Copied!");
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const container = renderModal({
      open: true,
      onClose,
      tool: makeTool(),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
    const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    act(() => {
      overlay?.click();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("shows tool name in header", () => {
    const container = renderModal({
      open: true,
      onClose: vi.fn(),
      tool: makeTool({ name: "My CLI Tool" }),
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
    expect(container.textContent).toContain("My CLI Tool");
  });
});
