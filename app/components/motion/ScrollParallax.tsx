"use client";

import { useReducedMotion } from "framer-motion";
import { type CSSProperties, type ReactNode } from "react";
import { usePerformanceMode } from "../../hooks/usePerformanceMode";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  y?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  opacity?: [number, number, number, number];
};

export default function ScrollParallax({
  children,
  className,
  y = [120, -120],
  opacity,
}: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const lite = usePerformanceMode();

  if (reduceMotion || lite) {
    return <div className={`content-section ${className ?? ""}`}>{children}</div>;
  }

  const style = {
    "--parallax-from": `${y[0]}px`,
    "--parallax-to": `${y[1]}px`,
    ...(opacity
      ? {
          "--opacity-from": String(opacity[0]),
          "--opacity-mid1": String(opacity[1]),
          "--opacity-mid2": String(opacity[2]),
          "--opacity-to": String(opacity[3]),
        }
      : {}),
  } as CSSProperties;

  return (
    <div
      className={`content-section scroll-parallax${opacity ? " scroll-parallax-opacity" : ""} ${className ?? ""}`}
      style={style}
    >
      <div className="scroll-parallax-inner">{children}</div>
    </div>
  );
}