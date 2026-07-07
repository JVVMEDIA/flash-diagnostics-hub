"use client";

import type { ReactNode } from "react";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import ScrollParallax from "./motion/ScrollParallax";

type SectionHeaderProps = {
  id?: string;
  title: ReactNode;
  description: string;
};

export default function SectionHeader({ id, title, description }: SectionHeaderProps) {
  const lite = usePerformanceMode();

  return (
    <ScrollParallax y={[40, -40]} className="scroll-mt-24 mb-8 sm:mb-10">
      <div id={id}>
        <h2 className="section-title flex flex-wrap items-center gap-2 sm:gap-3">{title}</h2>
        <p className="text-zinc-400 max-w-3xl leading-relaxed mt-3 text-sm sm:text-base">
          {description}
        </p>
        <div
          className={`mt-4 h-px bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent ${
            lite ? "w-24" : "w-24 origin-left"
          }`}
        />
      </div>
    </ScrollParallax>
  );
}