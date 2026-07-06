"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { brandMap, mobileBrands } from "../data/brands";
import BrandLogo from "./BrandLogo";
import BrandMarquee from "./BrandMarquee";
import ScrollHint from "./ScrollHint";
import ScrollReveal from "./motion/ScrollReveal";

const quickLinks = [
  { href: "#motorola", brandId: "motorola", featured: true },
  { href: "#fastboot-adb", brandId: "android", featured: false },
  { href: "#odin-samsung", brandId: "samsung", featured: false },
  { href: "#sp-flash", brandId: "mediatek", featured: false },
  { href: "#bootloop-brick", brandId: "qualcomm", featured: false },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section ref={ref} className="relative pt-16 pb-8 text-center overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="h-80 w-80 rounded-full border-2 border-emerald-500/30"
          style={reduceMotion ? {} : { scale: ringScale }}
        />
        <motion.div
          className="absolute h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl"
          animate={reduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <motion.div style={reduceMotion ? {} : { opacity: heroOpacity, y: contentY }}>
        <ScrollReveal direction="down" distance={20} immediate>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm mb-8 shadow-lg shadow-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/25 text-emerald-300 font-semibold text-xs">
              v2.1
            </span>
            Open Source • Zadarmo • Profesionálne
          </div>
        </ScrollReveal>

        <motion.div style={reduceMotion ? {} : { y: titleY }}>
          <ScrollReveal direction="up" distance={50} delay={0.1} immediate>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
              <span className="text-gradient">Flash Diagnostics</span>
              <br />
              <span className="text-zinc-100">Hub</span>
            </h1>
          </ScrollReveal>
        </motion.div>

        <ScrollReveal direction="up" delay={0.2} distance={36} immediate>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed px-4">
            Kompletné centrum pre flashovanie mobilných zariadení — Samsung, Motorola, Xiaomi, Pixel,
            MediaTek a Qualcomm.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3} immediate>
          <div className="flex flex-wrap gap-4 justify-center mt-10 px-4">
            <motion.a
              href="#zdielanie"
              className="group relative px-8 py-4 bg-emerald-500 text-zinc-950 font-semibold rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/30"
              whileHover={reduceMotion ? {} : { scale: 1.06, y: -3 }}
              whileTap={reduceMotion ? {} : { scale: 0.98 }}
            >
              <span className="relative flex items-center gap-2">
                Začať s bezpečným zdieľaním
                <ArrowRight size={18} />
              </span>
            </motion.a>
            <motion.a
              href="#flashovanie"
              className="px-8 py-4 border-2 border-emerald-500/40 rounded-2xl font-medium hover:bg-emerald-500/10"
              whileHover={reduceMotion ? {} : { scale: 1.06, y: -3 }}
            >
              Prehliadnuť postupy
            </motion.a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4} immediate>
          <div className="flex flex-wrap justify-center gap-3 mt-10 px-4">
            {quickLinks.map((link) => {
              const brand = brandMap[link.brandId];
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 transition-colors ${
                    link.featured
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:border-emerald-500/50"
                  }`}
                  whileHover={reduceMotion ? {} : { scale: 1.08, y: -4 }}
                >
                  <BrandLogo brand={brand} size="sm" animate={false} />
                  <span className="text-sm font-semibold">{brand.name}</span>
                </motion.a>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5} replay>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-500/80 mt-14 mb-3 font-medium">
            ⬇ Podporované značky — posúvajúci sa pás
          </p>
          <BrandMarquee />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8 px-4">
          {mobileBrands.slice(0, 4).map((brand, i) => (
            <ScrollReveal key={brand.id} direction="up" delay={0.1 * i} replay>
              <motion.a
                href={brand.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/40 hover:bg-zinc-900"
                whileHover={reduceMotion ? {} : { y: -6, scale: 1.03 }}
              >
                <BrandLogo brand={brand} size="lg" showName />
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollHint />
      </motion.div>
    </section>
  );
}