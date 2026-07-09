"use client";

import { ArrowRight } from "lucide-react";
import { brandMap, mobileBrands } from "../data/brands";
import BrandLogo from "./BrandLogo";
import BrandMarquee from "./BrandMarquee";
import FastAnchorLink from "./FastAnchorLink";
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
  return (
    <section className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 text-center overflow-hidden min-h-0 sm:min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perf-hide-lite">
        <div className="h-96 w-96 rounded-full border-[3px] border-emerald-400/50 animate-hero-ring" />
        <div className="absolute h-[32rem] w-[32rem] rounded-full bg-emerald-400/20 blur-3xl animate-hero-glow" />
      </div>
      <div className="perf-show-lite absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-48 w-48 rounded-full border-2 border-emerald-500/30" />
      </div>

      <div className="relative">
        <ScrollReveal direction="down" distance={20} immediate>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-300 text-sm mb-8 shadow-xl shadow-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-xs tracking-wide">
              v2.2
            </span>
            Open Source • Zadarmo • Profesionálne
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={50} delay={0.1} immediate>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-4 sm:mb-6 px-2">
            <span className="text-gradient">Flash Diagnostics</span>
            <br />
            <span className="text-white perf-hide-lite drop-shadow-[0_0_40px_rgba(52,211,153,0.35)]">Hub</span>
            <span className="text-white perf-show-lite">Hub</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} distance={36} immediate>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-300 leading-relaxed px-4">
            Kompletné centrum pre flashovanie a diagnostiku Android zariadení — Motorola, Samsung Odin,
            Fastboot, SP Flash, Unisoc/UFS, Qualcomm EDL, bootloop, hardbrick a bezpečné zdieľanie firmvéru.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3} immediate>
          <div className="flex flex-wrap gap-4 justify-center mt-10 px-4">
            <FastAnchorLink
              href="#zdielanie"
              className="group px-8 py-4 bg-emerald-400 text-zinc-950 font-bold rounded-2xl shadow-2xl shadow-emerald-500/40 active:opacity-90 touch-manipulation"
            >
              <span className="flex items-center gap-2">
                Začať s bezpečným zdieľaním
                <ArrowRight size={20} />
              </span>
            </FastAnchorLink>
            <FastAnchorLink
              href="#flashovanie"
              className="px-8 py-4 border-2 border-emerald-400/60 rounded-2xl font-semibold text-emerald-300 active:bg-emerald-500/15 touch-manipulation"
            >
              Prehliadnuť postupy
            </FastAnchorLink>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4} immediate>
          <div className="flex flex-wrap justify-center gap-4 mt-10 px-4">
            {quickLinks.map((link) => {
              const brand = brandMap[link.brandId];
              return (
                <FastAnchorLink
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 touch-manipulation active:opacity-90 ${
                    link.featured
                      ? "bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/25"
                      : "bg-zinc-900/90 border-zinc-600 text-zinc-200 hover:border-emerald-400/60"
                  }`}
                  style={link.featured ? { boxShadow: `0 0 28px ${brand.color}40` } : undefined}
                >
                  <BrandLogo brand={brand} size="md" />
                  <span className="text-sm font-bold">{brand.name}</span>
                </FastAnchorLink>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5} immediate>
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400 mt-14 mb-4 font-bold">
            ⬇ Podporované značky
          </p>
          <BrandMarquee />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-4xl mx-auto mt-10 px-4">
          {mobileBrands.slice(0, 4).map((brand, i) => (
            <ScrollReveal key={brand.id} direction="up" delay={0.1 * i} immediate>
              <FastAnchorLink
                href={brand.href ?? "#"}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-900/70 active:border-emerald-400/50 touch-manipulation"
                style={{ boxShadow: `0 0 20px ${brand.color}20` }}
              >
                <BrandLogo brand={brand} size="xl" showName />
              </FastAnchorLink>
            </ScrollReveal>
          ))}
        </div>

        <ScrollHint />
      </div>
    </section>
  );
}