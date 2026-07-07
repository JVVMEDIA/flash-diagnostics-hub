"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import FastAnchorLink from "./FastAnchorLink";
import { useActiveSection } from "../hooks/useActiveSection";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

const navLinks = [
  { href: "#flashovanie", label: "Flashovanie", id: "flashovanie" },
  { href: "#motorola", label: "Motorola", id: "motorola" },
  { href: "#odin-samsung", label: "Odin", id: "odin-samsung" },
  { href: "#diagnostika", label: "Diagnostika", id: "diagnostika" },
  { href: "#nastroje", label: "Nástroje", id: "nastroje" },
  { href: "#zdielanie", label: "Zdieľanie", id: "zdielanie" },
];

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();
  const lite = usePerformanceMode();
  const skipMotion = reduceMotion || lite;

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-zinc-800/80 ${
        lite ? "bg-zinc-950/98" : "backdrop-blur-xl bg-zinc-950/90"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
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
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <FastAnchorLink
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {isActive && !skipMotion && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {isActive && skipMotion && (
                  <span className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg" />
                )}
                <span className="relative">{link.label}</span>
              </FastAnchorLink>
            );
          })}
          <a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-900 shrink-0"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <div className="px-4 py-3 space-y-1 max-h-[70dvh] overflow-y-auto overscroll-contain">
            {navLinks.map((link) => (
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
                {link.label}
              </FastAnchorLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}