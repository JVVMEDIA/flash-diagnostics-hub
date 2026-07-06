"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Plávajúce dekorácie na okrajoch — reagujú na scroll celou stránkou */
export function ScrollFloatingDecor() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const leftY = useTransform(smooth, [0, 1], [0, -400]);
  const rightY = useTransform(smooth, [0, 1], [0, 300]);
  const leftRotate = useTransform(smooth, [0, 1], [0, 180]);
  const rightRotate = useTransform(smooth, [0, 1], [0, -120]);
  const leftDotY = useTransform(smooth, [0, 1], [100, -250]);
  const rightDotY = useTransform(smooth, [0, 1], [-50, 350]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden lg:block" aria-hidden>
      <motion.div
        className="absolute left-6 top-[20%] w-20 h-20 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm shadow-lg shadow-emerald-500/20"
        style={{ y: leftY, rotate: leftRotate }}
      />
      <motion.div
        className="absolute left-10 top-[55%] w-10 h-10 rounded-full border border-teal-500/25 bg-teal-500/10"
        style={{ y: leftDotY }}
      />
      <motion.div
        className="absolute right-8 top-[30%] w-20 h-20 rounded-3xl border border-blue-500/15 bg-blue-500/5"
        style={{ y: rightY, rotate: rightRotate }}
      />
      <motion.div
        className="absolute right-12 top-[70%] w-12 h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/8"
        style={{ y: rightDotY }}
      />
    </div>
  );
}

/** Vertikálna čiara s bodkou ukazujúca scroll progress */
export function ScrollTimeline() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  if (reduceMotion) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 h-48" aria-hidden>
      <div className="w-px h-full bg-zinc-800 relative rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-500 to-teal-400 rounded-full"
          style={{ height }}
        />
      </div>
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
        style={{ y: dotY }}
      />
    </div>
  );
}