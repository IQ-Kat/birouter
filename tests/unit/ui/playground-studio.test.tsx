// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) =>
    params ? `${key}(${JSON.stringify(params)})` : key,
  useLocale: () => "en",
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/dashboard/playground",
}));

vi.mock("next/dynamic", () => ({
  default: (
    fn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>,
    _opts?: unknown
  ) => {
    // Eagerly resolve the dynamic import in tests
    let Component: React.ComponentType<Record<string, unknown>> | null = null;
    fn().then((m) => {
      Component = m.default;
    });
    return function DynamicWrapper(props: Record<string, unknown>) {
      if (!Component) return <div data-testid="dynamic-loading" />;
      return React.createElement(Component, props);
    };
  },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Select: ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    className?: string;
  }) => (
    <select value={value} onChange={onChange}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  EmptyState: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/shared/components/MonacoEditor", () => ({
  default: () => <div data-testid="monaco-editor" />,
}));

vi.mock("@/shared/constants/providers", () => ({
  ALIAS_TO_ID: {},
}));

vi.mock("@/shared/utils/maskEmail", () => ({
  pickDisplayValue: (vals: string[], _visible: boolean, fallback: string) => vals[0] || fallback,
  pickMaskedDisplayValue: (vals: string[], _visible: boolean, fallback: string) =>
    vals[0] || fallback,
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: (_selector: (s: { emailsVisible: boolean }) => boolean) => true,
}));

vi.mock("@/lib/playground/codeExport", () => ({
  endpointToPath: (ep: string) => `/v1/${ep}`,
}));

vi.mock("@/lib/playground/types", () => ({
  getModelPricing: () => null,
}));

vi.mock("@/lib/playground/streamMetrics", () => ({
  computeMetrics: () => ({
    ttftMs: null,
    totalMs: null,
    tokensIn: 0,
    tokensOut: 0,
    tps: null,
    costUsd: null,
  }),
}));

vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown">{children}</div>
  ),
}));

// ── Import under test ──────────────────────────────────────────────────────────

const { PlaygroundStudio } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/PlaygroundStudio"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderStudio(): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<PlaygroundStudio />);
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("PlaygroundStudio", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders without crashing (smoke test)", () => {
    const el = renderStudio();
    expect(el).toBeTruthy();
    expect(el.children.length).toBeGreaterThan(0);
  });

  it("renders all 4 tab buttons", () => {
    const el = renderStudio();
    const tabButtons = el.querySelectorAll("[role='tab']");
    expect(tabButtons.length).toBe(4);

    const textContents = Array.from(tabButtons).map((b) => b.textContent?.trim() ?? "");
    // Tab buttons contain icon text + label text (e.g. "chatChat") — use includes
    expect(textContents.some((t) => t.includes("Chat"))).toBe(true);
    expect(textContents.some((t) => t.includes("Compare"))).toBe(true);
    expect(textContents.some((t) => t.includes("API"))).toBe(true);
    expect(textContents.some((t) => t.includes("Build"))).toBe(true);
  });

  it("defaults to Chat tab as active", () => {
    const el = renderStudio();
    const activeTab = el.querySelector("[role='tab'][aria-selected='true']");
    expect(activeTab?.textContent?.trim()).toContain("Chat");
  });

  it("switches to API tab when clicked", () => {
    const el = renderStudio();
    const tabButtons = el.querySelectorAll("[role='tab']");
    const apiTab = Array.from(tabButtons).find((b) => b.textContent?.includes("API")) as HTMLButtonElement | undefined;

    expect(apiTab).toBeTruthy();
    act(() => {
      apiTab?.click();
    });

    const activeTab = el.querySelector("[role='tab'][aria-selected='true']");
    expect(activeTab?.textContent?.trim()).toContain("API");
  });

  it("switches to Compare tab and shows placeholder", () => {
    const el = renderStudio();
    const tabButtons = el.querySelectorAll("[role='tab']");
    const compareTab = Array.from(tabButtons).find((b) =>
      b.textContent?.includes("Compare")
    ) as HTMLButtonElement | undefined;

    act(() => {
      compareTab?.click();
    });

    expect(el.textContent).toContain("F7 implementation pending");
  });

  it("switches to Build tab and shows placeholder", () => {
    const el = renderStudio();
    const tabButtons = el.querySelectorAll("[role='tab']");
    const buildTab = Array.from(tabButtons).find((b) =>
      b.textContent?.includes("Build")
    ) as HTMLButtonElement | undefined;

    act(() => {
      buildTab?.click();
    });

    expect(el.textContent).toContain("F7 implementation pending");
  });

  it("preserves config pane state when switching tabs", () => {
    const el = renderStudio();

    // Verify config pane is rendered
    const configPaneLabel = el.querySelector("[aria-label='Config pane']");
    expect(configPaneLabel).toBeTruthy();

    // Switch to API tab
    const tabButtons = el.querySelectorAll("[role='tab']");
    const apiTab = Array.from(tabButtons).find((b) =>
      b.textContent?.includes("API")
    ) as HTMLButtonElement | undefined;
    act(() => {
      apiTab?.click();
    });

    // Config pane should still be visible
    const configPaneAfterSwitch = el.querySelector("[aria-label='Config pane']");
    expect(configPaneAfterSwitch).toBeTruthy();
  });

  it("renders the export button in the top bar", () => {
    const el = renderStudio();
    const exportBtn = el.querySelector("button[aria-label='Export code']");
    expect(exportBtn).toBeTruthy();
  });

  it("opens export modal when export button is clicked", () => {
    const el = renderStudio();
    const exportBtn = el.querySelector("button[aria-label='Export code']") as HTMLButtonElement | null;

    act(() => {
      exportBtn?.click();
    });

    expect(el.textContent).toContain("Export code");
  });
});

describe("PlaygroundStudio — deep-link ?tab=chat", () => {
  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("activates Chat tab from URL search param", async () => {
    // Override useSearchParams to return ?tab=chat
    vi.doMock("next/navigation", () => ({
      useSearchParams: () => new URLSearchParams("tab=chat"),
      useRouter: () => ({ push: vi.fn() }),
      usePathname: () => "/dashboard/playground",
    }));

    const el = renderStudio();
    const activeTab = el.querySelector("[role='tab'][aria-selected='true']");
    expect(activeTab?.textContent?.trim()).toContain("Chat");
  });
});
