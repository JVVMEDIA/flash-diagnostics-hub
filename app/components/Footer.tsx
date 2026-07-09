"use client";

import dynamic from "next/dynamic";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../data/navigation";

const VisitorCounter = dynamic(() => import("./VisitorCounter"), { ssr: false });

export default function Footer() {
  return (
    <footer className="footer-reveal relative border-t border-zinc-800/80 mt-20 py-10 text-sm text-zinc-400">
      <div className="page-container flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Flash Diagnostics Hub — v2.2 • Open Source
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Legálne a bezpečné postupy • Len oficiálne zdroje
          </p>
        </div>
        <VisitorCounter />
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-10 right-3 sm:right-6 md:right-10 lg:right-14 xl:right-20 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-200 transition-colors touch-manipulation shrink-0 z-10"
        aria-label="Posunúť stránku nahor"
      >
        <ArrowUp size={16} aria-hidden />
        Nahor
      </button>
    </footer>
  );
}