"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { brandMap, mobileBrands } from "../data/brands";
import BrandLogo from "./BrandLogo";
import BrandMarquee from "./BrandMarquee";
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

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section ref={ref} className="relative pt-16 pb-8 text-center overflow-hidden min-h-[85vh] flex flex-col justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="h-72 w-72 rounded-full border-2 border-emerald-500/20"
          style={reduceMotion ? {} : { scale: ringScale }}
          animate={reduceMotion ? {} : { opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"
          animate={reduceMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div style={reduceMotion ? {} : { opacity: heroOpacity, y: contentY }}>
        <ScrollReveal direction="down" distance={20} replay={false}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-8"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0px rgba(16,185,129,0)",
                      "0 0 30px rgba(16,185,129,0.25)",
                      "0 0 0px rgba(16,185,129,0)",
                    ],
                  }
            }
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open Source • Zadarmo • Profesionálne
          </motion.div>
        </ScrollReveal>

        <motion.div style={reduceMotion ? {} : { y: titleY }}>
          <ScrollReveal direction="up" distance={40} replay={false}>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
              <span className="text-gradient">Flash Diagnostics</span>
              <br />
              <span className="text-zinc-100">Hub</span>
            </h1>
          </ScrollReveal>
        </motion.div>

        <ScrollReveal direction="up" delay={0.1} distance={32} replay={false}>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed px-4">
            Kompletné centrum pre flashovanie mobilných zariadení — Samsung, Motorola, Xiaomi, Pixel,
            MediaTek a Qualcomm. Podrobné návody, diagnostika bootloopu, odomknutie bootloadera
            a bezpečné zdieľanie firmvéru s odkazmi na oficiálne súbory.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15} replay={false}>
          <div className="flex flex-wrap gap-4 justify-center mt-10 px-4">
            <motion.a
              href="#zdielanie"
              className="group relative px-8 py-4 bg-emerald-500 text-zinc-950 font-semibold rounded-2xl overflow-hidden shadow-lg shadow-emerald-500/25"
              whileHover={reduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Začať s bezpečným zdieľaním
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#flashovanie"
              className="px-8 py-4 border-2 border-zinc-700 hover:border-emerald-500/60 rounded-2xl font-medium hover:bg-zinc-900/80 transition-colors"
              whileHover={reduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.98 }}
            >
              Prehliadnuť postupy
            </motion.a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} replay={false}>
          <div className="flex flex-wrap justify-center gap-3 mt-10 px-4">
            {quickLinks.map((link) => {
              const brand = brandMap[link.brandId];
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-colors ${
                    link.featured
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-emerald-500/40"
                  }`}
                  whileHover={reduceMotion ? {} : { scale: 1.06, y: -3 }}
                  whileTap={reduceMotion ? {} : { scale: 0.95 }}
                >
                  <BrandLogo brand={brand} size="sm" animate={false} />
                  <span className="text-sm font-medium">{brand.name}</span>
                </motion.a>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25} replay>
          <p className="text-xs uppercase tracking-widest text-zinc-600 mt-14 mb-2">
            Podporované značky
          </p>
          <BrandMarquee />
        </ScrollReveal>

        <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mt-4 px-4 opacity-80">
          {mobileBrands.slice(0, 4).map((brand, i) => (
            <ScrollReveal key={brand.id} direction="up" delay={i * 0.05} replay>
              <motion.a
                href={brand.href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-zinc-900/50 transition-colors"
                whileHover={reduceMotion ? {} : { y: -4 }}
              >
                <BrandLogo brand={brand} size="md" showName />
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}