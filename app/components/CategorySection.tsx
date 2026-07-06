"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { brandMap } from "../data/brands";
import SubsectionCard from "./SubsectionCard";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./motion/ScrollReveal";
import type { Category } from "../data/hub-content";

type CategorySectionProps = {
  category: Category;
  defaultOpen?: boolean;
  index?: number;
};

function CategoryLogos({ category }: { category: Category }) {
  const ids = category.brandId
    ? [category.brandId]
    : category.brandIds ?? [];

  const brands = ids.map((id) => brandMap[id]).filter(Boolean);

  if (brands.length === 0) return null;

  return (
    <div className="flex items-center gap-2 shrink-0">
      {brands.slice(0, 4).map((brand) => (
        <BrandLogo key={brand.id} brand={brand} size="md" />
      ))}
      {brands.length > 4 && (
        <span className="text-xs text-zinc-500 font-medium">+{brands.length - 4}</span>
      )}
    </div>
  );
}

export default function CategorySection({
  category,
  defaultOpen = false,
  index = 0,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const primaryBrand = category.brandId ? brandMap[category.brandId] : undefined;
  const accentColor = primaryBrand?.color ?? "#10b981";

  return (
    <ScrollReveal
      delay={index * 0.05}
      direction={index % 2 === 0 ? "up" : "right"}
      distance={56}
      replay
    >
      <div id={category.id} className="scroll-mt-24">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`card-interactive w-full text-left relative overflow-hidden ${
            isOpen ? "border-emerald-500/50 shadow-xl" : ""
          }`}
          style={
            isOpen
              ? { boxShadow: `0 12px 40px ${accentColor}18, 0 0 0 1px ${accentColor}30` }
              : undefined
          }
          aria-expanded={isOpen}
          whileHover={reduceMotion ? {} : { scale: 1.01, y: -2 }}
          whileTap={reduceMotion ? {} : { scale: 0.99 }}
        >
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ backgroundColor: accentColor }}
            animate={isOpen && !reduceMotion ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.5 }}
            transition={{ duration: 2, repeat: isOpen ? Infinity : 0 }}
          />

          <div className="flex items-start gap-5 pl-2">
            <CategoryLogos category={category} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-3 mb-2">
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
              className="shrink-0 text-emerald-400 mt-1 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
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
              <div
                className="mt-4 space-y-4 pl-0 md:pl-4 md:ml-3 border-l-0 md:border-l md:border-opacity-40"
                style={{ borderColor: accentColor }}
              >
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
    </ScrollReveal>
  );
}