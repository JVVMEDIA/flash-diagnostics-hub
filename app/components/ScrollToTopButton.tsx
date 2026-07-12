"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { scrollToTop } from "../data/navigation";

export default function ScrollToTopButton() {
  const t = useTranslations("footer");

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scrollTopAria")}
      className="fixed z-[80] inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-emerald-500/45 bg-emerald-500/15 backdrop-blur-md text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25 hover:border-emerald-400/60 hover:text-emerald-100 touch-manipulation shrink-0 shadow-xl shadow-emerald-950/50 right-3 sm:right-6 md:right-10 lg:right-14 xl:right-20"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <ArrowUp size={16} aria-hidden />
      {t("scrollTop")}
    </button>
  );
}