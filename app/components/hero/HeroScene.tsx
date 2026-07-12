"use client";

import DeviceVisual from "./DeviceVisual";
import DiagnosticHUD, { HudMobileBadges } from "./DiagnosticHUD";
import ScrollParallax from "../motion/ScrollParallax";

export default function HeroScene() {
  return (
    <ScrollParallax y={[24, -24]} className="hero-scene-parallax">
      <div className="hero-scene relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl px-4 my-6 sm:my-8">
        <div className="hero-scene-glow absolute inset-0 flex items-center justify-center pointer-events-none perf-hide-lite">
          <div className="h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-emerald-400/15 blur-3xl animate-hero-glow" />
        </div>

        <div className="hero-scene-ring absolute inset-0 flex items-center justify-center pointer-events-none perf-hide-lite">
          <div className="h-56 w-56 sm:h-72 sm:w-72 rounded-full border border-emerald-400/25 animate-hero-ring" />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="relative w-[180px] h-[240px] sm:w-[220px] sm:h-[290px] md:w-[260px] md:h-[320px]">
            <DiagnosticHUD className="absolute inset-0 -inset-x-12 sm:-inset-x-16 md:-inset-x-20 perf-hide-lite" />
            <div className="relative z-10 mx-auto w-[55%] h-full">
              <DeviceVisual className="w-full h-full" animated />
            </div>
          </div>
          <HudMobileBadges />
        </div>
      </div>
    </ScrollParallax>
  );
}