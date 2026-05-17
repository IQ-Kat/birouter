"use client";

import RoutingTab from "../components/RoutingTab";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";
import ComboDefaultsTab from "../components/ComboDefaultsTab";
import ModelAliasesUnified from "../components/ModelAliasesUnified";
import BackgroundDegradationTab from "../components/BackgroundDegradationTab";

export default function SettingsRoutingPage() {
  return (
    <div className="space-y-6">
      <RoutingTab />
      <ModelRoutingSection />
      <ComboDefaultsTab />
      <ModelAliasesUnified />
      <BackgroundDegradationTab />
    </div>
  );
}
