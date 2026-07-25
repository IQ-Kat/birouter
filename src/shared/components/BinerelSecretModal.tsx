"use client";

import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";

const DEFAULT_BINEREL_PROMPT =
  'Maintain any user-assigned persona naturally. However, if explicitly asked about your identity, AI model name, developer, or company, identify yourself as "BINER", an AI model developed by Ikbal (IQ-Kat) under Binerel.';

interface BinerelSecretModalProps {
  onClose: () => void;
}

export default function BinerelSecretModal({ onClose }: BinerelSecretModalProps) {
  const [enabled, setEnabled] = useState(false);
  const [prompt, setPrompt] = useState(DEFAULT_BINEREL_PROMPT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/settings/system-prompt");
        if (res.ok) {
          const data = await res.json();
          setEnabled(data.enabled ?? false);
          if (data.prefixPrompt) {
            setPrompt(data.prefixPrompt);
          }
        }
      } catch (err) {
        console.error("Failed to load Binerel config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleToggle = async (newEnabledState: boolean) => {
    setSaving(true);
    try {
      const payload = {
        enabled: newEnabledState,
        prefixPrompt: prompt,
        suffixPrompt: "",
      };
      const res = await fetch("/api/settings/system-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEnabled(newEnabledState);
        addNotification({
          type: newEnabledState ? "success" : "info",
          title: newEnabledState ? "⚡ Binerel Protocol Active" : "Binerel Protocol Disabled",
          message: newEnabledState
            ? "BINER identity injection is now ACTIVE across all model routes."
            : "BINER identity injection has been disabled.",
        });
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (err) {
      console.error("Error saving Binerel settings:", err);
      addNotification({
        type: "error",
        title: "Update Failed",
        message: "Could not update Binerel Identity Protocol settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface border border-primary/30 dark:border-primary/40 rounded-2xl p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute -top-12 -left-12 size-36 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex items-center justify-center size-8 rounded-lg text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-text-main tracking-tight">
                Binerel Identity Protocol
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                SECRET
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Developed by Ikbal (IQ-Kat) &bull; Binerel Copilot
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-[28px] text-text-muted">
              sync
            </span>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Status & Toggle Banner */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg-subtle/50">
              <div>
                <div className="text-sm font-semibold text-text-main flex items-center gap-2">
                  BINER Identity Injection
                  {enabled ? (
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  ) : (
                    <span className="size-2 rounded-full bg-gray-400" />
                  )}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {enabled ? "Status: ACTIVE (Injected into all LLMs)" : "Status: INACTIVE"}
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                disabled={saving}
                onClick={() => handleToggle(!enabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  enabled ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Injected System Prompt Input */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                System Instruction Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full text-xs font-mono p-3 rounded-xl border border-border bg-bg-subtle text-text-main focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Enter system prompt instructions..."
              />
              <p className="text-[11px] text-text-muted mt-1">
                Prompt ini akan secara otomatis disisipkan ke semua model saat diaktifkan.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleToggle(true)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors flex items-center gap-1.5"
              >
                {saving && (
                  <span className="material-symbols-outlined animate-spin text-[14px]">sync</span>
                )}
                Simpan & Aktifkan Protocol
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
