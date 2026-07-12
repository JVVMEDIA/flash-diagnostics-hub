"use client";

import { Eye } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Locale } from "../../i18n/routing";

const STORAGE_KEY = "fdh-visit-count";

const localeToNumberFormat: Record<Locale, string> = {
  sk: "sk-SK",
  en: "en-GB",
  cs: "cs-CZ",
  pl: "pl-PL",
  hu: "hu-HU",
  de: "de-DE",
};

function readCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1284;
  } catch {
    return 1284;
  }
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("visitorCounter");

  useEffect(() => {
    const next = readCount() + 1;
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* ignore quota / private mode */
    }
    setCount(next);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-300"
      title={t("title")}
      aria-live="polite"
    >
      <Eye size={14} className="text-emerald-400 shrink-0" aria-hidden />
      <span>
        <span className="tabular-nums font-semibold text-emerald-400">
          {count === null ? "…" : count.toLocaleString(localeToNumberFormat[locale])}
        </span>{" "}
        {t("visits")}
      </span>
    </div>
  );
}