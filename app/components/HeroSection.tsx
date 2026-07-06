"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";
import FadeIn from "./motion/FadeIn";

const stats = [
  { label: "Značky", value: "6+", icon: Cpu },
  { label: "Kategórií", value: "12+", icon: Zap },
  { label: "Odkazov", value: "50+", icon: Shield },
];

const quickLinks = [
  { href: "#motorola", label: "Motorola", featured: true },
  { href: "#fastboot-adb", label: "Fastboot", featured: false },
  { href: "#odin-samsung", label: "Odin", featured: false },
  { href: "#sp-flash", label: "SP Flash", featured: false },
  { href: "#bootloop-brick", label: "Diagnostika", featured: false },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-20 pb-20 text-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full border border-emerald-500/10 animate-pulse-ring" />
      </div>

      <FadeIn delay={0}>
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8"
          animate={reduceMotion ? {} : { boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.15)", "0 0 0px rgba(16,185,129,0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Open Source • Zadarmo • Profesionálne
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
          <span className="text-gradient">Flash Diagnostics</span>
          <br />
          <span className="text-zinc-100">Hub</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed">
          Kompletné centrum pre flashovanie mobilných zariadení — Samsung, Motorola, Xiaomi, Pixel,
          MediaTek a Qualcomm. Podrobné návody, diagnostika bootloopu, odomknutie bootloadera
          a bezpečné zdieľanie firmvéru s odkazmi na oficiálne súbory.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} className="flex flex-wrap gap-4 justify-center mt-10">
        <motion.a
          href="#zdielanie"
          className="group relative px-8 py-4 bg-emerald-500 text-zinc-950 font-medium rounded-2xl overflow-hidden"
          whileHover={reduceMotion ? {} : { scale: 1.03 }}
          whileTap={reduceMotion ? {} : { scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            Začať s bezpečným zdieľaním
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.a>
        <motion.a
          href="#flashovanie"
          className="px-8 py-4 border border-zinc-700 hover:border-emerald-500/50 rounded-2xl transition-colors hover:bg-zinc-900/80"
          whileHover={reduceMotion ? {} : { scale: 1.03, borderColor: "rgba(16,185,129,0.5)" }}
          whileTap={reduceMotion ? {} : { scale: 0.98 }}
        >
          Prehliadnuť postupy
        </motion.a>
      </FadeIn>

      <FadeIn delay={0.4} className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-14">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card-interactive text-center py-4"
            initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            whileHover={reduceMotion ? {} : { y: -4 }}
          >
            <stat.icon size={20} className="text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-semibold text-zinc-100">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </FadeIn>

      <FadeIn delay={0.5} className="flex flex-wrap justify-center gap-3 mt-10 text-sm">
        {quickLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            className={
              link.featured
                ? "px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400"
            }
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            whileHover={reduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
          >
            {link.label}
          </motion.a>
        ))}
      </FadeIn>
    </section>
  );
}