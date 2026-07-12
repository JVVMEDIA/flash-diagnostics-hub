"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { localeFlags, localeLabels, locales, type Locale } from "../../i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchLocale = (next: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900/80 text-sm text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
        aria-label={`${t("language")}: ${localeLabels[locale]}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={15} className="text-emerald-400 shrink-0" aria-hidden />
        <span className="hidden sm:inline">{localeFlags[locale]}</span>
        <span className="max-w-[4.5rem] truncate">{localeLabels[locale]}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={`${t("language")}: ${localeLabels[locale]}`}
          className="absolute right-0 top-full mt-2 min-w-[10rem] rounded-xl border border-zinc-700 bg-zinc-950 shadow-xl shadow-black/40 py-1 z-[60]"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                  loc === locale
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                <span>{localeFlags[loc]}</span>
                <span>{localeLabels[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}