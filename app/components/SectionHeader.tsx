"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ScrollParallax from "./motion/ScrollParallax";
import ScrollReveal from "./motion/ScrollReveal";

type SectionHeaderProps = {
  id?: string;
  title: ReactNode;
  description: string;
};

export default function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <ScrollParallax y={[40, -40]} className="scroll-mt-24 mb-10">
      <ScrollReveal direction="left" replay>
        <div id={id}>
          <h2 className="section-title flex items-center gap-3">{title}</h2>
          <ScrollReveal direction="up" delay={0.1} distance={24} replay>
            <p className="text-zinc-400 max-w-3xl leading-relaxed mt-3">{description}</p>
          </ScrollReveal>
          <motion.div
            className="mt-4 h-px w-24 bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </ScrollReveal>
    </ScrollParallax>
  );
}