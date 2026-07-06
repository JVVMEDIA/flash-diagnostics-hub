"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";

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
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(9,9,11,0.75)", "rgba(9,9,11,0.95)"]);
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 8px 32px rgba(0,0,0,0.4)"]
  );

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-zinc-800/80"
      style={reduceMotion ? {} : { backgroundColor: navBg, boxShadow: navShadow }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
            whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 3 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
          >
            <span className="text-zinc-950 font-bold text-xl">FD</span>
          </motion.div>
          <span className="font-semibold text-xl tracking-tight group-hover:text-emerald-400 transition-colors">
            Flash Diagnostics Hub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
          <motion.a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
          >
            GitHub
          </motion.a>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-900"
          whileTap={reduceMotion ? {} : { scale: 0.9 }}
          aria-label="Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-zinc-800"
          >
            <div className="px-6 py-4 bg-zinc-950/95 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`block py-3 px-3 rounded-xl text-lg ${
                    activeId === link.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                  initial={reduceMotion ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}