"use client";

import { type CSSProperties, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  replay?: boolean;
  /** Okamžitá animácia pri načítaní (hero) — čisto CSS, bez hydration mismatch */
  immediate?: boolean;
};

const directionClass = {
  up: "scroll-reveal-up",
  down: "scroll-reveal-down",
  left: "scroll-reveal-left",
  right: "scroll-reveal-right",
} as const;

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 48,
  replay = true,
  immediate = false,
}: ScrollRevealProps) {
  const style = {
    "--reveal-distance": `${distance}px`,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  if (immediate) {
    return (
      <div
        className={`scroll-reveal-immediate ${directionClass[direction]} ${className ?? ""}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`scroll-reveal-inview ${directionClass[direction]} ${replay ? "" : "scroll-reveal-once"} ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}