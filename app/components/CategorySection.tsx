"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { brandMap } from "../data/brands";
import SubsectionCard from "./SubsectionCard";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./motion/ScrollReveal";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import type { Category } from "../data/hub-content";

type CategorySectionProps = {
  category: Category;
  defaultOpen?: boolean;
  index?: number;
};

function CategoryLogos({ category }: { category: Category }) {
  const ids = category.brandId ? [category.brandId] : (category.brandIds ?? []);
  const brands = ids.map((id) => brandMap[id]).filter(Boolean);
  if (brands.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {brands.slice(0, 4).map((brand) => (
        <BrandLogo key={brand.id} brand={brand} size="sm" />
      ))}
      {brands.length > 4 && (
        <span className="text-xs text-zinc-500 font-medium">+{brands.length - 4}</span>
      )}
    </div>
  );
}

function CategoryOverview({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 sm:px-5 py-4 w-full">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Prehľad</h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-400 flex gap-2 leading-relaxed">
            <span className="text-emerald-500 shrink-0 mt-0.5">→</span>
            <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{item}</span>
          </li>
        ))}
      </ul>
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
  const lite = usePerformanceMode();
  const skipMotion = reduceMotion || lite;
  const primaryBrand = category.brandId ? brandMap[category.brandId] : undefined;
  const accentColor = primaryBrand?.color ?? "#10b981";

  const expandedContent = (
    <div
      className="mt-4 space-y-4 w-full pl-0 md:pl-4 md:ml-3 border-l-0 md:border-l md:border-opacity-40"
      style={{ borderColor: accentColor }}
    >
      {category.overview && category.overview.length > 0 && (
        <CategoryOverview items={category.overview} />
      )}
      {category.subsections.map((subsection, subIndex) => (
        <SubsectionCard
          key={subsection.id}
          subsection={subsection}
          index={subIndex}
          animateEntry={!skipMotion}
          entryDelay={skipMotion ? 0 : 0.1 + subIndex * 0.06}
        />
      ))}
    </div>
  );

  return (
    <ScrollReveal delay={index * 0.05} direction="up" distance={32} replay>
      <div id={category.id} className="scroll-mt-24 w-full max-w-full">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`card-interactive w-full max-w-full text-left relative ${
            isOpen ? "border-emerald-500/50 shadow-xl" : ""
          }`}
          style={
            isOpen
              ? { boxShadow: `0 12px 40px ${accentColor}18, 0 0 0 1px ${accentColor}30` }
              : undefined
          }
          aria-expanded={isOpen}
          whileHover={skipMotion ? {} : { scale: 1.01, y: -2 }}
          whileTap={skipMotion ? {} : { scale: 0.99 }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ backgroundColor: accentColor, opacity: isOpen ? 0.85 : 0.5 }}
          />

          <div className="pl-3 pr-2 sm:pl-4 sm:pr-3 space-y-3 w-full">
            <CategoryLogos category={category} />

            <div className="flex items-start justify-between gap-2 w-full">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg sm:text-xl break-words">{category.title}</h3>
                  {isOpen && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      Aktívne
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`shrink-0 text-emerald-400 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={20} />
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed w-full break-words [overflow-wrap:anywhere]">
              {category.description}
            </p>
            <p className="text-xs text-zinc-500">
              {category.subsections.length} podsekcie • odkazy na súbory
            </p>
          </div>
        </motion.button>

        {skipMotion ? (
          isOpen && expandedContent
        ) : (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {expandedContent}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </ScrollReveal>
  );
}