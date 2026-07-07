"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { brandMap } from "../data/brands";
import SubsectionCard from "./SubsectionCard";
import BrandLogo from "./BrandLogo";
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
    <div className="category-card-logos flex flex-row flex-wrap items-center gap-2">
      {brands.slice(0, 4).map((brand) => (
        <BrandLogo key={brand.id} brand={brand} size="sm" />
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
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const primaryBrand = category.brandId ? brandMap[category.brandId] : undefined;
  const accentColor = primaryBrand?.color ?? "#10b981";

  return (
    <div id={category.id} className="scroll-mt-24 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`category-card card-interactive w-full text-left ${
          isOpen ? "border-emerald-500/50 shadow-xl" : ""
        }`}
        style={
          isOpen
            ? { boxShadow: `0 12px 40px ${accentColor}18, 0 0 0 1px ${accentColor}30` }
            : undefined
        }
        aria-expanded={isOpen}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: accentColor, opacity: isOpen ? 0.85 : 0.5 }}
        />

        <div className="category-card-body relative pl-4 pr-3">
          <CategoryLogos category={category} />

          <div className="category-card-title-row">
            <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
              <h3 className="font-semibold text-lg sm:text-xl text-zinc-100">{category.title}</h3>
              {isOpen && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
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
      </button>

      {isOpen && (
        <div className="category-expanded mt-4 space-y-4 w-full">
          {category.overview && category.overview.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-4 w-full">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Prehľad
              </h4>
              <ul className="space-y-3">
                {category.overview.map((item, i) => (
                  <li key={i} className="category-overview-item">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {category.subsections.map((subsection, subIndex) => (
            <SubsectionCard key={subsection.id} subsection={subsection} index={subIndex} />
          ))}
        </div>
      )}
    </div>
  );
}