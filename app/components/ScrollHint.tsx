"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.a
      href="#flashovanie"
      className="flex flex-col items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mt-8"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-xs uppercase tracking-widest">Scrolluj pre návody</span>
      <ChevronDown size={28} className="text-emerald-500" />
    </motion.a>
  );
}