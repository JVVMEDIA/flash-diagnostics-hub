"use client";

import { usePerformanceMode } from "../hooks/usePerformanceMode";
import ScrollProgress from "./ScrollProgress";
import { ScrollFloatingDecor, ScrollTimeline } from "./ScrollEffects";

/** Dekorácie a scroll progress — len na desktope */
export default function PerfDecor() {
  const lite = usePerformanceMode();
  if (lite) return null;

  return (
    <>
      <ScrollFloatingDecor />
      <ScrollTimeline />
      <ScrollProgress />
    </>
  );
}