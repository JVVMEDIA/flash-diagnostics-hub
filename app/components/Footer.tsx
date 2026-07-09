"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const VisitorCounter = dynamic(() => import("./VisitorCounter"), { ssr: false });

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="border-t border-zinc-800/80 mt-20 py-10 text-sm text-zinc-500"
      initial={reduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Flash Diagnostics Hub — v2.2 • Open Source</p>
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
    </motion.footer>
  );
}