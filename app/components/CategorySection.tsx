"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SubsectionCard from "./SubsectionCard";
import FadeIn from "./motion/FadeIn";
import type { Category } from "../data/hub-content";

type CategorySectionProps = {
  category: Category;
  defaultOpen?: boolean;
  index?: number;
};

export default function CategorySection({
  category,
  defaultOpen = false,
  index = 0,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <FadeIn delay={index * 0.08}>
      <div id={category.id} className="scroll-mt-24">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`card-interactive w-full text-left ${isOpen ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5" : ""}`}
          aria-expanded={isOpen}
          whileHover={reduceMotion ? {} : { scale: 1.005 }}
          whileTap={reduceMotion ? {} : { scale: 0.995 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-xl">{category.title}</h3>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  >
                    Aktívne
                  </motion.span>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{category.description}</p>
              <p className="text-xs text-zinc-500 mt-3">
                {category.subsections.length} podsekcie • odkazy na súbory
              </p>
            </div>
            <motion.div
              className="shrink-0 text-emerald-400 mt-1 p-1 rounded-lg bg-emerald-500/10"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 pl-0 md:pl-4 border-l-0 md:border-l border-emerald-500/20 md:ml-3">
                {category.overview && category.overview.length > 0 && (
                  <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-4"
                  >
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                      Prehľad
                    </h4>
                    <ul className="space-y-2">
                      {category.overview.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-zinc-400 flex gap-2 leading-relaxed"
                          initial={reduceMotion ? {} : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.04 }}
                        >
                          <span className="text-emerald-500 shrink-0">→</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {category.subsections.map((subsection, subIndex) => (
                  <SubsectionCard
                    key={subsection.id}
                    subsection={subsection}
                    index={subIndex}
                    animateEntry
                    entryDelay={0.1 + subIndex * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}