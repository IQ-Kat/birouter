// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BaseUrlSelectProps } from "@/shared/components/cli/BaseUrlSelect";

// ── Import ────────────────────────────────────────────────────────────────────

const { default: BaseUrlSelect } = await import("@/shared/components/cli/BaseUrlSelect");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderSelect(props: BaseUrlSelectProps): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<BaseUrlSelect {...props} />);
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  // Stub window.location.origin
  Object.defineProperty(window, "location", {
    value: { origin: "http://localhost:20128" },
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

describe("BaseUrlSelect", () => {
  it("renders a select element", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
    });
    const select = container.querySelector("select");
    expect(select).not.toBeNull();
  });

  it("shows Local option always", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
    });
    expect(container.textContent).toContain("Local");
  });

  it("shows Cloud option when cloudEnabled=true and cloudUrl is set", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: true,
      cloudUrl: "https://cloud.example.com",
    });
    expect(container.textContent).toContain("Cloud");
    expect(container.textContent).toContain("cloud.example.com");
  });

  it("does NOT show Cloud option when cloudEnabled=false", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
      cloudUrl: "https://cloud.example.com",
    });
    // "Cloud" option should not appear in select options
    const select = container.querySelector("select");
    const options = Array.from(select?.options ?? []);
    const cloudOption = options.find((o) => o.value === "cloud");
    expect(cloudOption).toBeUndefined();
  });

  it("shows Custom option always", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
    });
    const select = container.querySelector("select");
    const options = Array.from(select?.options ?? []);
    const customOption = options.find((o) => o.value === "custom");
    expect(customOption).toBeDefined();
  });

  it("reveals custom input when value does not match local or cloud", () => {
    const container = renderSelect({
      value: "https://custom.example.com",
      onChange: vi.fn(),
      cloudEnabled: false,
    });
    // Since value doesn't match local, it should be in custom mode showing an input
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
  });

  it("calls onChange when custom input changes", () => {
    const onChange = vi.fn();
    const container = renderSelect({
      value: "https://custom.example.com",
      onChange,
      cloudEnabled: false,
    });
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    // Use React's synthetic event via nativeInputValueSetter
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    act(() => {
      nativeInputValueSetter?.call(input, "https://new.example.com");
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledWith("https://new.example.com");
  });

  it("renders label when provided", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
      label: "Endpoint URL",
    });
    expect(container.textContent).toContain("Endpoint URL");
  });

  it("disables select when disabled=true", () => {
    const container = renderSelect({
      value: "http://localhost:20128",
      onChange: vi.fn(),
      cloudEnabled: false,
      disabled: true,
    });
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });
});
