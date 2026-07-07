"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  y?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  opacity?: [number, number, number, number];
};

export default function ScrollParallax(props: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduceMotion || !desktop) {
    return <div className="content-section">{props.children}</div>;
  }

  return <ScrollParallaxAnimated {...props} />;
}

function ScrollParallaxAnimated({
  children,
  className,
  y = [120, -120],
  scale,
  rotate,
  opacity,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], y);
  const scaleVal = scale ? useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], 1, scale[1]]) : undefined;
  const rotateVal = rotate ? useTransform(scrollYProgress, [0, 1], rotate) : undefined;
  const opacityVal = opacity ? useTransform(scrollYProgress, [0, 0.15, 0.85, 1], opacity) : undefined;

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