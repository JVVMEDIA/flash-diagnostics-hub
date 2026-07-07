"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/** Plávajúce dekorácie s parallax scrollom */
export function ScrollFloatingDecor() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const y1 = useTransform(scrollY, [0, 3000], [0, -140]);
  const y2 = useTransform(scrollY, [0, 3000], [0, 180]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y4 = useTransform(scrollY, [0, 3000], [0, 160]);

  if (reduceMotion || !desktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block" aria-hidden>
      <motion.div
        className="absolute left-8 top-[18%] w-24 h-24 rounded-2xl border-2 border-emerald-400/50 bg-emerald-500/15 backdrop-blur-sm shadow-xl shadow-emerald-500/25 scene-tilt"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute left-12 top-[58%] w-14 h-14 rounded-full border-2 border-cyan-400/40 bg-cyan-500/15 scene-tilt-reverse"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute right-10 top-[28%] w-20 h-20 rounded-3xl border-2 border-blue-400/35 bg-blue-500/10 scene-tilt-reverse"
        style={{ y: y3 }}
      />
      <motion.div
        className="absolute right-14 top-[68%] w-16 h-16 rounded-xl border-2 border-emerald-400/40 bg-emerald-500/12 scene-tilt"
        style={{ y: y4 }}
      />
    </div>
  );
}

/** Scroll indikátor — reaguje na pozíciu scrollu */
export function ScrollTimeline() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const fillHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["5%", "95%"]), {
    stiffness: 100,
    damping: 28,
  });
  const dotTop = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 12px)"]), {
    stiffness: 100,
    damping: 28,
  });

  if (reduceMotion) return null;

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block h-52 w-3"
      aria-hidden
    >
      <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-0.5 bg-zinc-800/80 rounded-full" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"
        style={{ height: fillHeight }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/60 ring-2 ring-emerald-500/30"
        style={{ top: dotTop }}
      />
    </div>
  );
}