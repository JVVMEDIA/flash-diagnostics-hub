"use client";

import { motion, useReducedMotion } from "framer-motion";
import { mobileBrands } from "../data/brands";
import BrandLogo from "./BrandLogo";

export default function BrandMarquee() {
  const reduceMotion = useReducedMotion();
  const items = [...mobileBrands, ...mobileBrands];

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-6 py-8">
        {mobileBrands.map((brand) => (
          <a key={brand.id} href={brand.href} title={brand.name}>
            <BrandLogo brand={brand} size="lg" showName />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="relative py-10 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((brand, i) => (
          <a
            key={`${brand.id}-${i}`}
            href={brand.href}
            className="flex flex-col items-center gap-3 min-w-[88px] group"
            title={brand.name}
          >
            <BrandLogo brand={brand} size="lg" />
            <span className="text-sm font-medium text-zinc-500 group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              {brand.name}
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}