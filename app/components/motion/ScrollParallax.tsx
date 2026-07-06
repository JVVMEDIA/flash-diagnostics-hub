"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Posun v px pri prejdení sekciou: záporné = proti scrollu */
  y?: [number, number];
  /** Mierka pri scrolli */
  scale?: [number, number];
  /** Rotácia v stupňoch */
  rotate?: [number, number];
  opacity?: [number, number, number, number];
};

export default function ScrollParallax({
  children,
  className,
  y = [60, -60],
  scale,
  rotate,
  opacity,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], y);
  const scaleVal = scale ? useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], 1, scale[1]]) : undefined;
  const rotateVal = rotate ? useTransform(scrollYProgress, [0, 1], rotate) : undefined;
  const opacityVal = opacity ? useTransform(scrollYProgress, [0, 0.15, 0.85, 1], opacity) : undefined;

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y: translateY,
          scale: scaleVal,
          rotate: rotateVal,
          opacity: opacityVal,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}