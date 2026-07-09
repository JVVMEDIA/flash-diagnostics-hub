"use client";

import { type CSSProperties, type ReactNode } from "react";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  y?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  opacity?: [number, number, number, number];
};

/** Parallax cez CSS view-timeline — rovnaký DOM na serveri aj kliente */
export default function ScrollParallax({
  children,
  className,
  y = [120, -120],
  opacity,
}: ScrollParallaxProps) {
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