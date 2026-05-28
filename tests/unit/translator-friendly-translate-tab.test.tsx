// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AdvancedSlug } from "@/app/(dashboard)/dashboard/translator/types";

// --- Mock next-intl ---
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// --- Mock next/navigation (used by deep-link hook, not by TranslateTab directly) ---
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// --- Mock shared components ---
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  Button: ({ children, onClick, disabled, loading, "aria-label": ariaLabel }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    "aria-label"?: string;
  }) => (
    <button data-testid="button" onClick={onClick} disabled={disabled || loading} aria-label={ariaLabel}>
      {children}
    </button>
  ),
  Select: ({ options = [], value, onChange, placeholder, "aria-label": ariaLabel }: {
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    "aria-label"?: string;
  }) => (
    <select data-testid="select" value={value} onChange={onChange} aria-label={ariaLabel}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  ),
  SegmentedControl: ({ options = [], value, onChange, "aria-label": ariaLabel }: {
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (v: string) => void;
    "aria-label"?: string;
  }) => (
    <div data-testid="segmented-control" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button key={o.value} role="tab" aria-selected={value === o.value} onClick={() => onChange?.(o.value)} data-value={o.value}>
          {o.label}
        </button>
      ))}
    </div>
  ),
  InfoTooltip: ({ text }: { text: string }) => <span aria-label={text}>i</span>,
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <span data-testid="badge" data-variant={variant}>{children}</span>
  ),
}));

// --- Mock useProviderOptions ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions",
  () => ({
    useProviderOptions: () => ({
      provider: "openai",
      setProvider: vi.fn(),
      providerOptions: [
        { value: "openai", label: "OpenAI" },
        { value: "anthropic", label: "Anthropic" },
      ],
      loading: false,
    }),
  })
);

// --- Mock useAvailableModels ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels",
  () => ({
    useAvailableModels: () => ({
      model: "gpt-4o",
      setModel: vi.fn(),
      availableModels: ["gpt-4o"],
      loading: false,
      pickModelForFormat: () => "gpt-4o",
    }),
  })
);

// --- Mock useTranslateSession ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/hooks/useTranslateSession",
  () => ({
    useTranslateSession: () => ({
      result: {
        detected: null,
        target: "openai",
        status: "idle",
        responsePreview: null,
        translatedJson: null,
        pipelinePath: null,
        intermediateJson: null,
        errorMessage: null,
        latencyMs: null,
      },
      run: vi.fn(),
      reset: vi.fn(),
    }),
  })
);

// --- Mock exampleTemplates ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    FORMAT_OPTIONS: [
      { value: "openai", label: "OpenAI" },
      { value: "claude", label: "Claude" },
    ],
    FORMAT_META: {
      openai: { label: "OpenAI", color: "emerald", icon: "smart_toy" },
      claude: { label: "Claude", color: "orange", icon: "psychology" },
    },
    getExampleTemplates: () => [
      {
        id: "simple-chat",
        name: "Simple Chat",
        icon: "chat",
        description: "Chat example",
        formats: { openai: { model: "gpt-4o", messages: [] } },
      },
    ],
  })
);

// --- Setup ---
const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("TranslateTab", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders smoke without throwing", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateTab />);
    });
    expect(container.innerHTML).not.toBe("");
  });

  it("renders 2-column grid on desktop (has grid class)", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateTab />);
    });
    // The grid div should exist with lg:grid-cols-2 class
    const gridEl = container.querySelector(".grid");
    expect(gridEl).toBeTruthy();
    expect(gridEl?.className).toContain("lg:grid-cols-2");
  });

  it("renders the advanced section slot (data-advanced-section)", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateTab />);
    });
    const advancedSlot = container.querySelector("[data-advanced-section]");
    expect(advancedSlot).toBeTruthy();
  });

  it("calls onAdvancedSlugChange with 'rawjson' when the Advanced button is clicked", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onAdvancedSlugChange = vi.fn();
    await act(async () => {
      root.render(<TranslateTab onAdvancedSlugChange={onAdvancedSlugChange} />);
    });
    // Find the Advanced button by aria-label.
    // SimpleControls uses tr("simpleAdvancedToggle", "Advanced"); with the i18n mock
    // returning the key, tr() detects key===translated and returns the FALLBACK "Advanced".
    const advancedBtn = container.querySelector(
      "button[aria-label='Advanced']"
    ) as HTMLButtonElement | null;
    expect(advancedBtn).toBeTruthy();
    await act(async () => {
      advancedBtn?.click();
    });
    expect(onAdvancedSlugChange).toHaveBeenCalledWith("rawjson");
  });

  it("reflects forceOpenAdvancedSlug in data attribute", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const slug: AdvancedSlug = "pipeline";
    await act(async () => {
      root.render(
        <TranslateTab forceOpenAdvancedSlug={slug} onAdvancedSlugChange={vi.fn()} />
      );
    });
    const advancedSlot = container.querySelector("[data-advanced-section]");
    expect(advancedSlot?.getAttribute("data-force-open-slug")).toBe("pipeline");
  });

  it("forceOpenAdvancedSlug=null results in empty data attribute", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <TranslateTab forceOpenAdvancedSlug={null} onAdvancedSlugChange={vi.fn()} />
      );
    });
    const advancedSlot = container.querySelector("[data-advanced-section]");
    expect(advancedSlot?.getAttribute("data-force-open-slug")).toBe("");
  });

  it("renders without onAdvancedSlugChange prop (optional)", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    // Should not throw
    await act(async () => {
      root.render(<TranslateTab />);
    });
    expect(container.innerHTML).not.toBe("");
  });

  it("renders both SimpleControls and ResultNarrated panels (2 Card children in grid)", async () => {
    const { default: TranslateTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateTab />);
    });
    // Grid should contain 2 direct Card children
    const grid = container.querySelector(".grid");
    const cards = grid?.querySelectorAll("[data-testid='card']");
    expect(cards?.length).toBeGreaterThanOrEqual(2);
  });
});
