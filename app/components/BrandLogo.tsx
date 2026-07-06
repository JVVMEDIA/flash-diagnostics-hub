"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { BrandItem } from "../data/brands";

type BrandLogoProps = {
  brand: BrandItem;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  animate?: boolean;
  className?: string;
};

const sizes = {
  sm: { box: 36, icon: 20, text: "text-xs" },
  md: { box: 48, icon: 28, text: "text-sm" },
  lg: { box: 64, icon: 36, text: "text-base" },
  xl: { box: 80, icon: 44, text: "text-lg" },
};

export default function BrandLogo({
  brand,
  size = "md",
  showName = false,
  animate = true,
  className = "",
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const reduceMotion = useReducedMotion();
  const s = sizes[size];

  const logoContent = (
    <div
      className={`relative flex items-center justify-center rounded-2xl border border-zinc-700/80 overflow-hidden shrink-0 ${className}`}
      style={{
        width: s.box,
        height: s.box,
        background: `linear-gradient(135deg, ${brand.color}22 0%, #18181b 60%)`,
        boxShadow: `0 0 24px ${brand.color}25`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(circle at 30% 30%, ${brand.color}55, transparent 70%)` }}
      />
      {!imgError && brand.slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${brand.slug}/white`}
          alt={`${brand.name} logo`}
          width={s.icon}
          height={s.icon}
          className="relative z-10 object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className="relative z-10 font-bold text-white"
          style={{ fontSize: s.icon * 0.45 }}
        >
          {brand.initials ?? brand.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );

  const wrapped = animate && !reduceMotion ? (
    <motion.div
      whileHover={{ scale: 1.12, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {logoContent}
    </motion.div>
  ) : (
    logoContent
  );

  if (!showName) return wrapped;

  return (
    <div className="flex flex-col items-center gap-2">
      {wrapped}
      <span className={`${s.text} font-medium text-zinc-300 text-center leading-tight`}>{brand.name}</span>
    </div>
  );
}