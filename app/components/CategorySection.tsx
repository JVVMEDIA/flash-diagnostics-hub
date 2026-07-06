"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import SubsectionCard from "./SubsectionCard";
import type { Category } from "../data/hub-content";

type CategorySectionProps = {
  category: Category;
  defaultOpen?: boolean;
};

export default function CategorySection({ category, defaultOpen = false }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={category.id} className="scroll-mt-24">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="card w-full text-left hover:border-emerald-500/30"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-xl mb-2">{category.title}</h3>
            <p className="text-zinc-400 text-sm">{category.description}</p>
            <p className="text-xs text-zinc-500 mt-3">
              {category.subsections.length} podsekcie • odkazy na súbory
            </p>
          </div>
          <div className="shrink-0 text-emerald-400 mt-1">
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800 md:ml-3">
          {category.overview && category.overview.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Prehľad
              </h4>
              <ul className="space-y-2">
                {category.overview.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2 leading-relaxed">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {category.subsections.map((subsection, index) => (
            <SubsectionCard key={subsection.id} subsection={subsection} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}