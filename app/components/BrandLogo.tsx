"use client";

import type { BrandItem } from "../data/brands";

type BrandLogoProps = {
  brand: BrandItem;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  className?: string;
};

const sizes = {
  sm: { box: 44, icon: 24, text: "text-xs" },
  md: { box: 56, icon: 32, text: "text-sm" },
  lg: { box: 72, icon: 40, text: "text-base" },
  xl: { box: 96, icon: 52, text: "text-lg" },
};

function brandInitials(brand: BrandItem): string {
  if (brand.initials) return brand.initials;
  const words = brand.name.split(/[\s/]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return brand.name.slice(0, 2).toUpperCase();
}

export default function BrandLogo({
  brand,
  size = "md",
  showName = false,
  className = "",
}: BrandLogoProps) {
  const s = sizes[size];
  const label = brandInitials(brand);

  const logoContent = (
    <div
      className={`relative flex items-center justify-center rounded-2xl border-2 overflow-hidden shrink-0 logo-glow ${className}`}
      style={{
        width: s.box,
        height: s.box,
        borderColor: `${brand.color}88`,
        background: `linear-gradient(135deg, ${brand.color}44 0%, #18181b 55%)`,
        boxShadow: `0 0 32px ${brand.color}40, inset 0 0 20px ${brand.color}15`,
      }}
      aria-hidden={!showName}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(circle at 30% 30%, ${brand.color}88, transparent 65%)` }}
      />
      <span
        className="relative z-10 font-bold text-white tracking-tight"
        style={{ fontSize: s.icon * 0.42 }}
      >
        {label}
      </span>
    </div>
  );

  if (!showName) return logoContent;

  return (
    <div className="flex flex-col items-center gap-2">
      {logoContent}
      <span className={`${s.text} font-semibold text-zinc-200 text-center leading-tight`}>{brand.name}</span>
    </div>
  );
}