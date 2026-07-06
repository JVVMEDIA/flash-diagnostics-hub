"use client";

import { motion, useReducedMotion } from "framer-motion";
import { flashTools } from "../data/brands";
import BrandLogo from "./BrandLogo";
import ScrollParallax from "./motion/ScrollParallax";
import ScrollReveal from "./motion/ScrollReveal";

export default function ToolsShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollParallax y={[140, -140]} opacity={[0.2, 1, 1, 0.2]}>
      <section className="py-16 border-t-2 border-emerald-500/20 bg-zinc-900/30 rounded-3xl my-4 px-4">
        <ScrollReveal direction="up" replay distance={70}>
          <div className="text-center mb-12">
            <h2 className="section-title text-emerald-400">🛠 Nástroje a značky</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mt-3 leading-relaxed">
              Klikni na logo a preskoč priamo na návod alebo sekciu s odkazmi na stiahnutie.
            </p>
            <motion.div
              className="mt-4 h-px w-32 bg-gradient-to-r from-emerald-500 to-transparent mx-auto origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {flashTools.map((tool, i) => (
            <ScrollReveal
              key={tool.id}
              delay={i * 0.04}
              direction={i % 2 === 0 ? "up" : "left"}
              distance={40}
              replay
            >
              <motion.a
                href={tool.href}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden h-full"
                style={{
                  background: `linear-gradient(160deg, ${tool.color}12 0%, #18181b 50%)`,
                }}
                whileHover={reduceMotion ? {} : { y: -10, scale: 1.04 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${tool.color}30, transparent 65%)`,
                  }}
                />
                {!reduceMotion && (
                  <motion.div
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20 pointer-events-none"
                    style={{ backgroundColor: tool.color }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                )}
                <BrandLogo brand={tool} size="xl" animate />
                <div className="relative text-center">
                  <div className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {tool.name}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-wider mt-1 font-medium"
                    style={{ color: tool.color }}
                  >
                    Flash nástroj
                  </div>
                </div>
                <span className="text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Otvoriť návod →
                </span>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </ScrollParallax>
  );
}