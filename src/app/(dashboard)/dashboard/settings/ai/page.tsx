"use client";

import ThinkingBudgetTab from "../components/ThinkingBudgetTab";
import VisionBridgeSettingsTab from "../components/VisionBridgeSettingsTab";
import SystemPromptTab from "../components/SystemPromptTab";
import MemorySkillsTab from "../components/MemorySkillsTab";
import ModelsDevSyncTab from "../components/ModelsDevSyncTab";

export default function SettingsAiPage() {
  return (
    <div className="space-y-6">
      <ThinkingBudgetTab />
      <VisionBridgeSettingsTab />
      <SystemPromptTab />
      <MemorySkillsTab />
      <ModelsDevSyncTab />
    </div>
  );
}
