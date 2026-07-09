"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import FastAnchorLink from "./FastAnchorLink";

export default function ScrollHint() {
  const t = useTranslations("hero");

  return (
    <FastAnchorLink
      href="#flashovanie"
      className="flex flex-col items-center gap-2 text-emerald-400/80 mt-10 animate-scroll-hint touch-manipulation"
    >
      <span className="text-xs uppercase tracking-widest font-semibold">{t("scrollHint")}</span>
      <ChevronDown size={32} className="text-emerald-400" />
    </FastAnchorLink>
  );
}