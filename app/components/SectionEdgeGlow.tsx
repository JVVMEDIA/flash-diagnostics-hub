"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";

type SectionEdgeGlowProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionEdgeGlow({ children, className = "" }: SectionEdgeGlowProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: 0, right: 0, y: 0.5 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = (e.clientY - rect.top) / rect.height;
    const edgeZone = 120;
    const left = Math.max(0, 1 - x / edgeZone);
    const right = Math.max(0, 1 - (rect.width - x) / edgeZone);
    setEdge({ left, right, y });
  }, []);

  const onMouseLeave = useCallback(() => {
    setEdge({ left: 0, right: 0, y: 0.5 });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={reduceMotion ? undefined : onMouseMove}
      onMouseLeave={reduceMotion ? undefined : onMouseLeave}
    >
      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-1 top-0 bottom-0 w-16 z-0 hidden md:block"
            animate={{ opacity: edge.left * 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
              style={{ top: `${edge.y * 60}%`, height: "40%", transform: "translateY(-50%)" }}
            />
            <div className="absolute inset-y-0 left-2 w-8 bg-gradient-to-r from-emerald-500/25 to-transparent blur-md" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute left-3 w-1.5 h-1.5 rounded-full bg-emerald-400/80"
                style={{ top: `${20 + i * 28 + edge.y * 10}%` }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
              />
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-none absolute -right-1 top-0 bottom-0 w-16 z-0 hidden md:block"
            animate={{ opacity: edge.right * 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-y-0 right-0 w-1 rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ top: `${edge.y * 60}%`, height: "40%", transform: "translateY(-50%)" }}
            />
            <div className="absolute inset-y-0 right-2 w-8 bg-gradient-to-l from-cyan-500/25 to-transparent blur-md" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/80"
                style={{ top: `${30 + i * 24 + edge.y * 8}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0.95, 0.35] }}
                transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}