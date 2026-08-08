"use client";

import { useState, useMemo } from "react";
import { Button } from "@/shared/components";
import ModelRow from "./ModelRow";
import CustomModelsSection from "./CustomModelsSection";
import type { ModelCompatSavePatch } from "./ModelRow";
import { type ProviderMessageTranslator } from "../providerPageHelpers";

export interface FetchedModelsSectionProps {
  providerId: string;
  providerDisplayAlias: string;
  importedModels: Array<{ id: string; name?: string; source?: string; isHidden?: boolean }>;
  modelMeta: { customModels: any[]; modelCompatOverrides?: any[] };
  syncedAvailableModels: any[];
  connections: any[];
  copied: string | null;
  onCopy: (text: string) => void;
  onSetAlias: (modelId: string, alias: string, providerAlias: string) => Promise<void>;
  onDeleteAlias: (alias: string) => Promise<void>;
  onModelsChanged: () => Promise<void>;
  canImportModels: boolean;
  importingModels: boolean;
  handleImportModels: () => Promise<void>;
  isAutoSyncEnabled: boolean;
  togglingAutoSync: boolean;
  handleToggleAutoSync: () => Promise<void>;
  handleCompatibleImportWithProgress: (connectionId: string) => Promise<void>;
  compatSavingModelId: string | null;
  togglingModelId: string | null;
  handleToggleModelHidden: (providerKey: string, modelId: string, hidden: boolean) => Promise<void>;
  onTestModel: (modelId: string, fullModel: string) => Promise<void>;
  testingModelId: string | null;
  modelTestStatus: Record<string, "ok" | "error">;
  modelTestErrors?: Record<string, string>;
  handleTestAll?: (targets: Array<{ modelId: string; fullModel: string }>) => Promise<void>;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  getUpstreamHeadersRecordForModel: (modelId: string, protocol: string) => Record<string, string>;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => Promise<void>;
  t: ProviderMessageTranslator;
}

export default function FetchedModelsSection({
  providerId,
  providerDisplayAlias,
  importedModels,
  copied,
  onCopy,
  onSetAlias,
  onModelsChanged,
  canImportModels,
  importingModels,
  handleImportModels,
  isAutoSyncEnabled,
  togglingAutoSync,
  handleToggleAutoSync,
  compatSavingModelId,
  togglingModelId,
  handleToggleModelHidden,
  onTestModel,
  testingModelId,
  modelTestStatus,
  modelTestErrors,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecordForModel,
  saveModelCompatFlags,
  handleTestAll,
  testingAll,
  testProgress,
  t,
}: FetchedModelsSectionProps) {
  const [showImported, setShowImported] = useState(true);

  const importedOnly = useMemo(
    () => importedModels.filter((m) => m.source === "imported"),
    [importedModels]
  );

  return (
    <div>
      {/* Import controls */}
      {canImportModels && (
        <div className="flex items-center gap-2 mb-4">
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={handleImportModels}
            disabled={importingModels}
          >
            {importingModels ? t("importingModels") : t("importFromModels")}
          </Button>
          <button
            onClick={handleToggleAutoSync}
            disabled={togglingAutoSync}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-transparent cursor-pointer text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ color: isAutoSyncEnabled ? "#22c55e" : "var(--color-text-muted)" }}
            >
              {isAutoSyncEnabled ? "toggle_on" : "toggle_off"}
            </span>
            <span className="text-text-main">{t("autoSync")}</span>
          </button>
          {!canImportModels && (
            <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
          )}
        </div>
      )}

      {/* Imported models */}
      {importedOnly.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-main">
              Imported ({importedOnly.length})
            </span>
            <div className="flex items-center gap-2">
              {handleTestAll && (
                <button
                  onClick={() =>
                    handleTestAll(
                      importedOnly.map((m) => ({
                        modelId: m.id,
                        fullModel: `${providerDisplayAlias}/${m.id}`,
                      }))
                    )
                  }
                  disabled={testingAll}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
                  title="Test all imported models"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {testingAll && testProgress ? "progress_activity" : "science"}
                  </span>
                  <span>
                    {testingAll && testProgress
                      ? `Testing ${testProgress.done}/${testProgress.total}`
                      : "Test all"}
                  </span>
                </button>
              )}
              <button
                onClick={() => setShowImported(!showImported)}
                className="text-xs text-text-muted hover:text-primary"
              >
                <span className="material-symbols-outlined text-base">
                  {showImported ? "expand_less" : "expand_more"}
                </span>
              </button>
            </div>
          </div>
          {showImported && (
            <div className="flex flex-wrap gap-3 mb-4">
              {importedOnly.map((model) => (
                <ModelRow
                  key={model.id}
                  model={model}
                  fullModel={`${providerDisplayAlias}/${model.id}`}
                  provider={providerId}
                  copied={copied ?? undefined}
                  onCopy={(text, key) => onCopy(text)}
                  t={t}
                  showDeveloperToggle
                  effectiveModelNormalize={(mid, p) => effectiveModelNormalize(mid, p)}
                  effectiveModelPreserveDeveloper={(mid, p) =>
                    effectiveModelPreserveDeveloper(mid, p)
                  }
                  getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecordForModel(model.id, p)}
                  saveModelCompatFlags={(mid, patch) => saveModelCompatFlags(mid, patch)}
                  compatDisabled={compatSavingModelId === model.id}
                  onSetAlias={(alias) => onSetAlias(model.id, alias, providerDisplayAlias)}
                  onToggleHidden={(mid, hidden) => handleToggleModelHidden(providerId, mid, hidden)}
                  togglingHidden={togglingModelId === model.id}
                  onTestModel={onTestModel}
                  testStatus={modelTestStatus[model.id] || null}
                  testError={modelTestErrors?.[model.id]}
                  testingModel={testingModelId === model.id}
                />
              ))}
            </div>
          )}
        </>
      )}

      {importedOnly.length === 0 && canImportModels && (
        <p className="text-xs text-text-muted mb-4">
          No imported models yet. Click &quot;Import Models&quot; above to fetch models from your
          connections.
        </p>
      )}

      {/* Separator + custom models */}
      <div className="border-t border-border pt-4 mt-2">
        <CustomModelsSection
          providerId={providerId}
          providerAlias={providerDisplayAlias}
          copied={copied ?? undefined}
          onCopy={(text, key) => onCopy(text)}
          onModelsChanged={onModelsChanged}
          collapsible
        />
      </div>
    </div>
  );
}
