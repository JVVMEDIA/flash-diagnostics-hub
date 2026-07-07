"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type ObjectSpec = {
  id: string;
  type: "cube" | "ring" | "hex" | "diamond";
  top: string;
  left: string;
  size: number;
  color: string;
  scrollFactor: number;
  rotateFactor: number;
  delay: number;
};

const OBJECTS: ObjectSpec[] = [
  { id: "c1", type: "cube", top: "12%", left: "6%", size: 52, color: "#34d399", scrollFactor: 0.35, rotateFactor: 1.2, delay: 0 },
  { id: "c2", type: "cube", top: "68%", left: "4%", size: 40, color: "#22d3ee", scrollFactor: 0.55, rotateFactor: -0.9, delay: 0.2 },
  { id: "r1", type: "ring", top: "22%", left: "88%", size: 72, color: "#6ee7b7", scrollFactor: 0.45, rotateFactor: 1.5, delay: 0.1 },
  { id: "r2", type: "ring", top: "78%", left: "92%", size: 56, color: "#38bdf8", scrollFactor: 0.65, rotateFactor: -1.1, delay: 0.3 },
  { id: "h1", type: "hex", top: "45%", left: "2%", size: 48, color: "#2dd4bf", scrollFactor: 0.5, rotateFactor: 0.8, delay: 0.15 },
  { id: "h2", type: "hex", top: "55%", left: "94%", size: 44, color: "#34d399", scrollFactor: 0.4, rotateFactor: -1.3, delay: 0.25 },
  { id: "d1", type: "diamond", top: "8%", left: "72%", size: 36, color: "#5eead4", scrollFactor: 0.6, rotateFactor: 1.8, delay: 0.05 },
  { id: "d2", type: "diamond", top: "88%", left: "18%", size: 32, color: "#67e8f9", scrollFactor: 0.7, rotateFactor: -1.6, delay: 0.35 },
  { id: "c3", type: "cube", top: "35%", left: "96%", size: 28, color: "#10b981", scrollFactor: 0.8, rotateFactor: 2, delay: 0.4 },
  { id: "r3", type: "ring", top: "62%", left: "8%", size: 64, color: "#14b8a6", scrollFactor: 0.3, rotateFactor: -0.7, delay: 0.5 },
];

function SceneObject({ spec, scrollY }: { spec: ObjectSpec; scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const y = useTransform(scrollY, (v) => v * spec.scrollFactor * -0.15);
  const rotateX = useTransform(scrollY, (v) => 12 + v * spec.rotateFactor * 0.08);
  const rotateY = useTransform(scrollY, (v) => spec.delay * 40 + v * spec.rotateFactor * 0.12);
  const rotateZ = useTransform(scrollY, (v) => v * spec.rotateFactor * 0.05);
  const opacity = useTransform(scrollY, [0, 400, 2400], [0.85, 1, 0.55]);

  const half = spec.size / 2;

  return (
    <motion.div
      className="absolute scene-3d-object"
      style={{ top: spec.top, left: spec.left, y, rotateX, rotateY, rotateZ, opacity }}
    >
      {spec.type === "cube" && (
        <div className="cube-3d" style={{ width: spec.size, height: spec.size, ["--cube-half" as string]: `${half}px`, ["--cube-color" as string]: spec.color }}>
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      )}
      {spec.type === "ring" && (
        <div
          className="shape-ring"
          style={{
            width: spec.size,
            height: spec.size,
            borderColor: `${spec.color}88`,
            boxShadow: `0 0 24px ${spec.color}44, inset 0 0 16px ${spec.color}22`,
          }}
        />
      )}
      {spec.type === "hex" && (
        <div
          className="shape-hex"
          style={{
            width: spec.size,
            height: spec.size,
            background: `linear-gradient(135deg, ${spec.color}33, ${spec.color}11)`,
            borderColor: `${spec.color}66`,
            boxShadow: `0 0 20px ${spec.color}33`,
          }}
        />
      )}
      {spec.type === "diamond" && (
        <div
          className="shape-diamond"
          style={{
            width: spec.size,
            height: spec.size,
            background: `linear-gradient(160deg, ${spec.color}44, transparent)`,
            borderColor: `${spec.color}77`,
          }}
        />
      )}
    </motion.div>
  );
}

export default function ScrollBackground3D() {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const gridY = useTransform(scrollY, [0, 4000], [0, -320]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.7, 0.45]);
  const beamLeftY = useTransform(scrollY, [0, 3000], [0, 420]);
  const beamRightY = useTransform(scrollY, [0, 3000], [0, -380]);
  const dot1Y = useTransform(scrollY, [0, 2000], [0, -180]);
  const dot1Opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const dot2Y = useTransform(scrollY, [0, 2000], [0, 220]);
  const dot2Opacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.25]);
  const dot3Y = useTransform(scrollY, [0, 2500], [0, -260]);

  if (reduceMotion || !desktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block" aria-hidden>
      <motion.div className="absolute inset-0 bg-grid opacity-[0.4]" style={{ y: gridY, opacity: gridOpacity }} />
      <motion.div
        className="absolute -left-8 top-0 w-32 h-[140%] bg-gradient-to-b from-emerald-500/25 via-teal-400/10 to-transparent blur-sm"
        style={{ y: beamLeftY }}
      />
      <motion.div
        className="absolute -right-8 top-0 w-32 h-[140%] bg-gradient-to-b from-cyan-400/20 via-emerald-400/8 to-transparent blur-sm"
        style={{ y: beamRightY }}
      />

      <div className="absolute inset-0 scene-3d-stage">
        {OBJECTS.map((spec) => (
          <SceneObject key={spec.id} spec={spec} scrollY={scrollY} />
        ))}
      </div>

      <motion.div
        className="absolute left-[12%] top-[30%] w-2 h-2 rounded-full bg-emerald-400"
        style={{ y: dot1Y, opacity: dot1Opacity }}
      />
      <motion.div
        className="absolute right-[20%] top-[50%] w-3 h-3 rounded-full bg-cyan-400/80"
        style={{ y: dot2Y, opacity: dot2Opacity }}
      />
      <motion.div
        className="absolute left-[45%] top-[70%] w-1.5 h-1.5 rounded-full bg-teal-300"
        style={{ y: dot3Y }}
      />
    </div>
  );
}