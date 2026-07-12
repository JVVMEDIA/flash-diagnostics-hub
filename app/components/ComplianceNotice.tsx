"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComplianceNotice() {
  const t = useTranslations("sharing");

  return (
    <aside
      className="mb-8 max-w-3xl mx-auto rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 text-sm text-zinc-300"
      aria-labelledby="compliance-notice-heading"
    >
      <div className="flex items-start gap-3">
        <Shield className="text-amber-400 shrink-0 mt-0.5" size={18} aria-hidden />
        <div className="space-y-2 min-w-0">
          <h3 id="compliance-notice-heading" className="font-semibold text-amber-200">
            {t("complianceTitle")}
          </h3>
          <p>{t("complianceBody")}</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs">
            <li>{t("complianceHosting")}</li>
            <li>{t("complianceMirrors")}</li>
            <li>{t("complianceResponsibility")}</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}