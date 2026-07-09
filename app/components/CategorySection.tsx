"use client";

import { useEffect, useState } from "react";
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

function CategoryLogos({
  category,
  mobile = false,
}: {
  category: Category;
  mobile?: boolean;
}) {
  const ids = category.brandId ? [category.brandId] : (category.brandIds ?? []);
  const brands = ids.map((id) => brandMap[id]).filter(Boolean);
  if (brands.length === 0) return null;

  return (
    <div
      className={
        mobile
          ? "category-card-logos flex flex-row flex-wrap items-center gap-2"
          : "flex items-center gap-2 shrink-0"
      }
    >
      {brands.slice(0, 4).map((brand) => (
        <BrandLogo key={brand.id} brand={brand} size="sm" />
      ))}
      {brands.length > 4 && (
        <span className="text-xs text-zinc-400 font-medium">+{brands.length - 4}</span>
      )}
    </div>
  );
}

function CategoryOverview({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 sm:px-5 py-4 w-full">
      <p className="section-kicker">Prehľad</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="category-overview-item">
            <span className="text-emerald-500 shrink-0">→</span>
            <span>{item}</span>
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

  useEffect(() => {
    const onOpen = (e: Event) => {
      const categoryId = (e as CustomEvent<string>).detail;
      if (categoryId === category.id) setIsOpen(true);
    };
    window.addEventListener("open-category", onOpen);
    return () => window.removeEventListener("open-category", onOpen);
  }, [category.id]);

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

  const chevronClass = `shrink-0 text-emerald-400 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-transform duration-200 ${
    isOpen ? "rotate-180" : ""
  }`;

  return (
    <ScrollReveal
      delay={index * 0.05}
      direction={index % 2 === 0 ? "up" : "right"}
      distance={56}
      replay
    >
      <div id={category.id} className="scroll-mt-24 w-full max-w-full">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`card-interactive w-full max-w-full min-w-0 text-left relative max-md:overflow-visible md:overflow-hidden ${
            isOpen ? "border-emerald-500/50 shadow-xl" : ""
          }`}
          style={
            isOpen
              ? { boxShadow: `0 12px 40px ${accentColor}18, 0 0 0 1px ${accentColor}30` }
              : undefined
          }
          aria-expanded={isOpen}
          aria-controls={`${category.id}-panel`}
          whileHover={skipMotion ? {} : { scale: 1.01, y: -2 }}
          whileTap={skipMotion ? {} : { scale: 0.99 }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ backgroundColor: accentColor, opacity: isOpen ? 0.85 : 0.5 }}
          />

          {/* Mobil: symboly hore, text pod nimi */}
          <div className="md:hidden category-card-body relative pl-4 pr-3">
            <CategoryLogos category={category} mobile />

            <div className="category-card-title-row">
              <div className="category-card-title-wrap">
                <span className="category-card-title">{category.title}</span>
                {isOpen && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    Aktívne
                  </span>
                )}
              </div>
              <span
                className={`category-card-chevron shrink-0 ${isOpen ? "is-open" : ""}`}
                aria-hidden
              >
                <ChevronDown size={20} />
              </span>
            </div>

            <p className="category-card-text">{category.description}</p>

            <p className="category-card-meta">
              {category.subsections.length} podsekcie • odkazy na súbory
            </p>
          </div>

          {/* Desktop: horizontálny layout ako pred mobilnými úpravami */}
          <div className="hidden md:flex items-start gap-5 pl-2">
            <CategoryLogos category={category} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-3 mb-2">
                <span className="font-semibold text-xl text-zinc-100">{category.title}</span>
                {isOpen && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Aktívne
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{category.description}</p>
              <p className="text-xs text-zinc-400 mt-3">
                {category.subsections.length} podsekcie • odkazy na súbory
              </p>
            </div>

            <div className={`${chevronClass} mt-1`}>
              <ChevronDown size={20} />
            </div>
          </div>
        </motion.button>

        {skipMotion ? (
          isOpen && (
            <div id={`${category.id}-panel`} className="w-full min-w-0">
              {expandedContent}
            </div>
          )
        ) : (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={`${category.id}-panel`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden w-full min-w-0"
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