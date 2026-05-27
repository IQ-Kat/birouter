"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export interface SkillsConceptCardProps {
  variant: "agent" | "omni";
  className?: string;
}

export function SkillsConceptCard({ variant, className = "" }: SkillsConceptCardProps): JSX.Element {
  const t = useTranslations("agentSkills");

  const crossLinkHref = variant === "agent" ? "/dashboard/omni-skills" : "/dashboard/agent-skills";

  const title = t(`conceptCard.${variant}.title`);
  const description = t(`conceptCard.${variant}.description`);
  const crossLinkLabel = t(`conceptCard.${variant}.crossLinkLabel`);

  const agentIcon = "share";
  const omniIcon = "auto_fix_high";
  const icon = variant === "agent" ? agentIcon : omniIcon;

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-bg-subtle p-4 ${className}`}
    >
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-main">{title}</h3>
        <p className="mt-0.5 text-xs text-text-muted leading-relaxed">{description}</p>
      </div>
      <Link
        href={crossLinkHref}
        className="shrink-0 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
      >
        {crossLinkLabel}
        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
      </Link>
    </div>
  );
}

export default SkillsConceptCard;
