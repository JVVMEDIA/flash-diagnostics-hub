"use client";

import dynamic from "next/dynamic";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

const AnimatedFavicon = dynamic(() => import("./AnimatedFavicon"), { ssr: false });
const PerfDecor = dynamic(() => import("./PerfDecor"), { ssr: false });
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function DeferredEffects() {
  const lite = usePerformanceMode();

  return (
    <>
      <AnimatedFavicon />
      <PerfDecor />
      {!lite && <ChatBot />}
    </>
  );
}