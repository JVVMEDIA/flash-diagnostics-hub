"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  replay?: boolean;
  /** Okamžitá animácia pri načítaní (hero) — nie čakanie na scroll */
  immediate?: boolean;
};

const directionOffset = {
  up: (d: number) => ({ y: d }),
  down: (d: number) => ({ y: -d }),
  left: (d: number) => ({ x: d }),
  right: (d: number) => ({ x: -d }),
};

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 48,
  replay = true,
  immediate = false,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionOffset[direction](distance);
  const visible = { opacity: 1, x: 0, y: 0 };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, ...offset }}
        animate={visible}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={visible}
      viewport={{ once: !replay, amount: 0.15, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}