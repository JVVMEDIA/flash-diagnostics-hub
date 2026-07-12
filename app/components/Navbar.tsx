"use client";

import { Link } from "../../i18n/navigation";
import { useState } from "react";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import FastAnchorLink from "./FastAnchorLink";
import LanguageSwitcher from "./LanguageSwitcher";
import { useActiveSection } from "../hooks/useActiveSection";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
const navLinkIds = [
  { href: "#flashovanie", key: "flashovanie" as const, id: "flashovanie" },
  { href: "#motorola", key: "motorola" as const, id: "motorola" },
  { href: "#odin-samsung", key: "odin" as const, id: "odin-samsung" },
  { href: "#diagnostika", key: "diagnostika" as const, id: "diagnostika" },
  { href: "#nastroje", key: "nastroje" as const, id: "nastroje" },
  { href: "#zdielanie", key: "zdielanie" as const, id: "zdielanie" },
  { href: "#faq", key: "faq" as const, id: "faq" },
];

const sectionIds = navLinkIds.map((l) => l.id);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const lite = usePerformanceMode();
  const t = useTranslations("nav");
  return (
    <nav
      className={`sticky top-0 z-50 border-b border-zinc-800/80 ${
        lite ? "bg-zinc-950/98" : "backdrop-blur-xl bg-zinc-950/90"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="page-container flex items-center justify-between h-14 sm:h-16">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <span className="text-zinc-950 font-bold text-base sm:text-xl">FD</span>
          </div>
          <span className="font-semibold text-base sm:text-xl tracking-tight group-hover:text-emerald-400 transition-colors truncate sm:whitespace-normal">
            <span className="sm:hidden">FD Hub</span>
            <span className="hidden sm:inline">Flash Diagnostics Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {navLinkIds.map((link) => {
            const isActive = activeId === link.id;
            return (
              <FastAnchorLink
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg" />
                )}
                <span className="relative">{t(link.key)}</span>
              </FastAnchorLink>
            );
          })}
          <LanguageSwitcher />
          <a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            {t("github")}
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-zinc-900 shrink-0"
            aria-label={t("menu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <div className="px-4 py-3 space-y-1 max-h-[70dvh] overflow-y-auto overscroll-contain">
            {navLinkIds.map((link) => (
              <FastAnchorLink
                key={link.href}
                href={link.href}
                className={`block py-3 px-3 rounded-xl text-base touch-manipulation ${
                  activeId === link.id
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t(link.key)}
              </FastAnchorLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}