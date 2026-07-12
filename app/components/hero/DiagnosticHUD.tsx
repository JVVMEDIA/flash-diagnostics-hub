"use client";

import { type CSSProperties } from "react";
import { useTranslations } from "next-intl";

type HudItem = {
  id: string;
  labelKey: "hudFastboot" | "hudOdin" | "hudEdl" | "hudRsa" | "hudBootloop";
  statusKey?: "hudStatusOk" | "hudStatusReady" | "hudStatusLocked";
  side: "left" | "right";
  top: string;
  linePath: string;
  delay?: number;
  mobile?: boolean;
};

const hudItems: HudItem[] = [
  {
    id: "fastboot",
    labelKey: "hudFastboot",
    statusKey: "hudStatusReady",
    side: "left",
    top: "8%",
    linePath: "M 118 24 L 88 48",
    delay: 0,
    mobile: true,
  },
  {
    id: "odin",
    labelKey: "hudOdin",
    statusKey: "hudStatusOk",
    side: "right",
    top: "22%",
    linePath: "M 182 52 L 152 68",
    delay: 0.15,
    mobile: true,
  },
  {
    id: "edl",
    labelKey: "hudEdl",
    statusKey: "hudStatusReady",
    side: "left",
    top: "42%",
    linePath: "M 118 108 L 96 118",
    delay: 0.3,
    mobile: true,
  },
  {
    id: "rsa",
    labelKey: "hudRsa",
    statusKey: "hudStatusLocked",
    side: "right",
    top: "58%",
    linePath: "M 182 148 L 154 138",
    delay: 0.45,
  },
  {
    id: "bootloop",
    labelKey: "hudBootloop",
    statusKey: "hudStatusOk",
    side: "left",
    top: "72%",
    linePath: "M 118 178 L 100 168",
    delay: 0.6,
  },
];

function HudBadge({ item, animated }: { item: HudItem; animated: boolean }) {
  const t = useTranslations("hero");
  const align = item.side === "left" ? "left-0" : "right-0";
  const animStyle: CSSProperties | undefined = animated
    ? { animationDelay: `${item.delay ?? 0}s` }
    : undefined;

  return (
    <div
      className={`absolute ${align} flex items-center gap-2 ${animated ? "animate-hud-pulse perf-hide-lite" : ""}`}
      style={{ top: item.top, ...animStyle }}
    >
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-sm ${
          item.statusKey === "hudStatusOk"
            ? "bg-emerald-500/15 border-emerald-400/50 text-emerald-300"
            : item.statusKey === "hudStatusLocked"
              ? "bg-amber-500/10 border-amber-400/40 text-amber-300"
              : "bg-cyan-500/10 border-cyan-400/40 text-cyan-300"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${
            item.statusKey === "hudStatusOk"
              ? "bg-emerald-400"
              : item.statusKey === "hudStatusLocked"
                ? "bg-amber-400"
                : "bg-cyan-400"
          } ${animated ? "animate-pulse-dot" : ""}`}
        />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wide whitespace-nowrap">
          {t(item.labelKey)}
        </span>
        {item.statusKey && (
          <span className="text-[9px] font-mono opacity-70 hidden sm:inline">
            {t(item.statusKey)}
          </span>
        )}
      </div>
    </div>
  );
}

export function HudMobileBadges() {
  const t = useTranslations("hero");
  const mobileItems = hudItems.filter((item) => item.mobile);

  return (
    <div className="perf-show-lite flex flex-wrap justify-center gap-2 px-2">
      {mobileItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-emerald-500/10 border-emerald-400/40 text-emerald-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[10px] font-mono font-bold">{t(item.labelKey)}</span>
        </div>
      ))}
    </div>
  );
}

export default function DiagnosticHUD({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`} aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none perf-hide-lite"
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {hudItems.map((item) => (
          <path
            key={item.id}
            d={item.linePath}
            stroke="rgba(52,211,153,0.35)"
            strokeWidth="1"
            strokeDasharray="4 3"
            className="hero-hud-line"
            style={{ animationDelay: `${item.delay ?? 0}s` }}
          />
        ))}
        <circle cx="150" cy="110" r="3" fill="rgba(52,211,153,0.5)" className="animate-pulse-dot" />
      </svg>

      <div className="absolute inset-0 perf-hide-lite">
        {hudItems.map((item) => (
          <HudBadge key={item.id} item={item} animated />
        ))}
      </div>
    </div>
  );
}