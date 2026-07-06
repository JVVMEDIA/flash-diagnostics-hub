"use client";

import type { ReactNode } from "react";
import FadeIn from "./motion/FadeIn";

type SectionHeaderProps = {
  id?: string;
  title: ReactNode;
  description: string;
};

export default function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <FadeIn>
      <div id={id} className="scroll-mt-24 mb-10">
        <h2 className="section-title flex items-center gap-3">{title}</h2>
        <p className="text-zinc-400 max-w-3xl leading-relaxed mt-3">{description}</p>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-emerald-500 to-transparent" />
      </div>
    </FadeIn>
  );
}