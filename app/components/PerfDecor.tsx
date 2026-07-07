"use client";

import ScrollBackground3D from "./ScrollBackground3D";
import ScrollProgress from "./ScrollProgress";
import { ScrollFloatingDecor, ScrollTimeline } from "./ScrollEffects";

/** Dekorácie a scroll progress — desktop, scroll-reactive */
export default function PerfDecor() {
  return (
    <>
      <ScrollBackground3D />
      <ScrollFloatingDecor />
      <ScrollTimeline />
      <ScrollProgress />
    </>
  );
}