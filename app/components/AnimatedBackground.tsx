"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  if (reduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div className="absolute inset-0 bg-grid opacity-[0.35]" style={{ y: gridY }} />
      <motion.div
        className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-[100px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[90px]"
        style={{ y: orb2Y }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-teal-500/12 blur-[110px]"
        style={{ y: orb3Y }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-emerald-500/5 blur-[120px]"
        style={{ scale: centerScale }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950" />
    </div>
  );
}