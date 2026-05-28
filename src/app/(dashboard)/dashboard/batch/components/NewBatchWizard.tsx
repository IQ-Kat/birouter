"use client";

/**
 * NewBatchWizard — Stub placeholder.
 *
 * F4 (feat/batch-files-20-F4-wizard) delivers the full 4-step implementation.
 * This file exists so F6 can import and render it without blocking on F4.
 * F4 MUST replace this file with the full wizard when it lands.
 *
 * Props contract (canonical — matches §3.4 of master-plan-20):
 *   onClose: () => void
 *   onCreated: (batchId: string) => void
 *   availableProviders: Array<{ id: string; name: string; models: string[] }>
 */

import { useTranslations } from "next-intl";

interface NewBatchWizardProps {
  onClose: () => void;
  onCreated: (batchId: string) => void;
  availableProviders: Array<{ id: string; name: string; models: string[] }>;
}

export default function NewBatchWizard({ onClose }: Readonly<NewBatchWizardProps>) {
  const t = useTranslations("common");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("wizardTitle")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="relative w-full sm:max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-base text-[var(--color-text-main)]">
            {t("wizardTitle")}
          </span>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            aria-label={t("wizardClose")}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Wizard coming soon — F4 delivers the full implementation.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
          >
            {t("wizardCancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
