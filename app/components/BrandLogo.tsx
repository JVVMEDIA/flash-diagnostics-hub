"use client";

import { useState } from "react";
import type { BrandItem } from "../data/brands";

type BrandLogoProps = {
  brand: BrandItem;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  animate?: boolean;
  className?: string;
};

const sizes = {
  sm: { box: 44, icon: 24, text: "text-xs" },
  md: { box: 56, icon: 32, text: "text-sm" },
  lg: { box: 72, icon: 40, text: "text-base" },
  xl: { box: 96, icon: 52, text: "text-lg" },
};

export default function BrandLogo({
  brand,
  size = "md",
  showName = false,
  className = "",
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const s = sizes[size];

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
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(circle at 30% 30%, ${brand.color}88, transparent 65%)` }}
      />
      {!imgError && brand.slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${brand.slug}/white`}
          alt={`${brand.name} logo`}
          width={s.icon}
          height={s.icon}
          className="relative z-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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

  if (!showName) return logoContent;

  return (
    <div className="flex flex-col items-center gap-2">
      {logoContent}
      <span className={`${s.text} font-semibold text-zinc-200 text-center leading-tight`}>{brand.name}</span>
    </div>
  );
}