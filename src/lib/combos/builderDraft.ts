import type { ComboModelStep } from "@/lib/combos/steps";

type JsonRecord = Record<string, unknown>;

export const COMBO_BUILDER_AUTO_CONNECTION = "__auto__";
export const COMBO_BUILDER_STAGES = ["basics", "steps", "strategy", "review"] as const;

export type ComboBuilderStage = (typeof COMBO_BUILDER_STAGES)[number];

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function parseQualifiedModel(
  value: unknown
): { providerId: string; modelId: string } | null {
  const qualifiedModel = toTrimmedString(value);
  if (!qualifiedModel) return null;
  const firstSlashIndex = qualifiedModel.indexOf("/");
  if (firstSlashIndex <= 0 || firstSlashIndex >= qualifiedModel.length - 1) return null;
  return {
    providerId: qualifiedModel.slice(0, firstSlashIndex),
    modelId: qualifiedModel.slice(firstSlashIndex + 1),
  };
}

export function getComboDraftTarget(entry: unknown): string | null {
  if (typeof entry === "string") return toTrimmedString(entry);
  if (!isRecord(entry)) return null;
  if (entry.kind === "combo-ref") return toTrimmedString(entry.comboName);
  return toTrimmedString(entry.model);
}

export function buildPrecisionComboModelStep({
  providerId,
  modelId,
  connectionId = null,
  connectionLabel,
  weight = 0,
}: {
  providerId: string;
  modelId: string;
  connectionId?: string | null;
  connectionLabel?: string | null;
  weight?: number;
}): ComboModelStep {
  const normalizedProviderId = toTrimmedString(providerId) || "provider";
  const normalizedModelId = toTrimmedString(modelId) || "model";
  const normalizedConnectionId = toTrimmedString(connectionId);
  const normalizedConnectionLabel = toTrimmedString(connectionLabel);

  return {
    kind: "model",
    providerId: normalizedProviderId,
    model: `${normalizedProviderId}/${normalizedModelId}`,
    ...(normalizedConnectionId ? { connectionId: normalizedConnectionId } : {}),
    ...(normalizedConnectionLabel ? { label: normalizedConnectionLabel } : {}),
    weight: Number.isFinite(weight) ? Math.max(0, Math.min(100, Number(weight))) : 0,
  };
}

export function getExactModelStepSignature(entry: unknown): string | null {
  if (!isRecord(entry) || entry.kind === "combo-ref") return null;
  const modelValue = toTrimmedString(entry.model);
  const parsed = parseQualifiedModel(modelValue);
  if (!parsed) return null;

  const normalizedProviderId = toTrimmedString(entry.providerId) || parsed.providerId;
  const normalizedConnectionId =
    toTrimmedString(entry.connectionId) || COMBO_BUILDER_AUTO_CONNECTION;

  return `model:${normalizedProviderId}:${parsed.modelId}:${normalizedConnectionId}`;
}

export function hasExactModelStepDuplicate(entries: unknown[], candidate: unknown): boolean {
  const candidateSignature = getExactModelStepSignature(candidate);
  if (!candidateSignature) return false;

  return entries.some((entry) => getExactModelStepSignature(entry) === candidateSignature);
}

export function findNextSuggestedConnectionId(
  entries: unknown[],
  providerId: string,
  modelId: string,
  connections: Array<{ id?: string | null }> = []
): string {
  for (const connection of connections) {
    const connectionId = toTrimmedString(connection?.id);
    if (!connectionId) continue;

    const step = buildPrecisionComboModelStep({
      providerId,
      modelId,
      connectionId,
    });
    if (!hasExactModelStepDuplicate(entries, step)) {
      return connectionId;
    }
  }

  return COMBO_BUILDER_AUTO_CONNECTION;
}

export function getComboBuilderStageChecks({
  name,
  nameError,
  modelsCount,
  hasInvalidWeightedTotal,
  hasCostOptimizedWithoutPricing,
}: {
  name: string;
  nameError?: string | null;
  modelsCount: number;
  hasInvalidWeightedTotal?: boolean;
  hasCostOptimizedWithoutPricing?: boolean;
}) {
  return {
    basics: Boolean(toTrimmedString(name)) && !toTrimmedString(nameError),
    steps: modelsCount > 0,
    strategy: !Boolean(hasInvalidWeightedTotal) && !Boolean(hasCostOptimizedWithoutPricing),
    review: false,
  };
}

export function canAccessComboBuilderStage(
  stage: ComboBuilderStage,
  checks: ReturnType<typeof getComboBuilderStageChecks>
): boolean {
  if (stage === "basics") return true;
  if (stage === "steps") return checks.basics;
  if (stage === "strategy") return checks.basics && checks.steps;
  if (stage === "review") return checks.basics && checks.steps;
  return false;
}

export function getNextComboBuilderStage(stage: ComboBuilderStage): ComboBuilderStage {
  const stageIndex = COMBO_BUILDER_STAGES.indexOf(stage);
  if (stageIndex === -1 || stageIndex >= COMBO_BUILDER_STAGES.length - 1) {
    return "review";
  }
  return COMBO_BUILDER_STAGES[stageIndex + 1];
}

export function getPreviousComboBuilderStage(stage: ComboBuilderStage): ComboBuilderStage {
  const stageIndex = COMBO_BUILDER_STAGES.indexOf(stage);
  if (stageIndex <= 0) return "basics";
  return COMBO_BUILDER_STAGES[stageIndex - 1];
}
