// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiKeyEntry, ApiKeySelectProps } from "@/shared/components/cli/ApiKeySelect";

// ── Import ────────────────────────────────────────────────────────────────────

const { default: ApiKeySelect } = await import("@/shared/components/cli/ApiKeySelect");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderSelect(props: ApiKeySelectProps): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<ApiKeySelect {...props} />);
  });
  return container;
}

const SAMPLE_KEYS: ApiKeyEntry[] = [
  { id: "key1", name: "Production Key", prefix: "sk-prod" },
  { id: "key2", name: "Dev Key", prefix: "sk-dev" },
];

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ApiKeySelect", () => {
  it("renders a select element", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
    });
    const select = container.querySelector("select");
    expect(select).not.toBeNull();
  });

  it("renders all provided keys as options", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
    });
    expect(container.textContent).toContain("Production Key");
    expect(container.textContent).toContain("Dev Key");
  });

  it("renders prefix in option text", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
    });
    expect(container.textContent).toContain("sk-prod");
  });

  it("always includes 'Inserir manualmente' option", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
    });
    expect(container.textContent).toContain("Inserir manualmente");
  });

  it("does NOT show manual input by default when a known key is selected", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
    });
    const input = container.querySelector("input");
    expect(input).toBeNull();
  });

  it("shows manual input when value is not in keys list", () => {
    // Passing a value that's not in the keys array triggers manual mode
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "sk-somemanualvalue",
      onChange: vi.fn(),
    });
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
  });

  it("calls onChange when selecting a different key", () => {
    const onChange = vi.fn();
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange,
    });
    const select = container.querySelector("select") as HTMLSelectElement;
    act(() => {
      select.value = "key2";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledWith("key2");
  });

  it("selecting '__manual__' value reveals input", () => {
    const onChange = vi.fn();
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange,
    });
    const select = container.querySelector("select") as HTMLSelectElement;
    act(() => {
      select.value = "__manual__";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
  });

  it("renders label when provided", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
      label: "Auth Key",
    });
    expect(container.textContent).toContain("Auth Key");
  });

  it("disables select when disabled=true", () => {
    const container = renderSelect({
      keys: SAMPLE_KEYS,
      value: "key1",
      onChange: vi.fn(),
      disabled: true,
    });
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });
});
