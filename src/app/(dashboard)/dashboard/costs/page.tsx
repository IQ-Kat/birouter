"use client";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import BudgetTab from "../usage/components/BudgetTab";
import PricingTab from "../settings/components/PricingTab";
import CostOverviewTab from "./CostOverviewTab";
import { useTranslations } from "next-intl";

export default function CostsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const t = useTranslations("costs");
  const ts = useTranslations("settings");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "overview", label: t("overview") },
          { value: "budget", label: t("budget") },
          { value: "pricing", label: ts("pricing") },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "overview" && <CostOverviewTab />}
      {activeTab === "budget" && <BudgetTab />}
      {activeTab === "pricing" && <PricingTab />}
    </div>
  );
}
