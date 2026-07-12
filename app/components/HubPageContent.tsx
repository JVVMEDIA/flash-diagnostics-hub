"use client";

import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";

const HubBelowFold = dynamic(() => import("./HubBelowFold"), {
  loading: () => <div className="min-h-[40vh]" aria-hidden />,
});

export default function HubPageContent() {
  return (
    <div className="page-container relative w-full overflow-x-hidden">
      <HeroSection />
      <HubBelowFold />
    </div>
  );
}