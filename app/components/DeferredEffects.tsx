"use client";

import dynamic from "next/dynamic";

const AnimatedFavicon = dynamic(() => import("./AnimatedFavicon"), { ssr: false });
const PerfDecor = dynamic(() => import("./PerfDecor"), { ssr: false });
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function DeferredEffects() {
  return (
    <>
      <AnimatedFavicon />
      <PerfDecor />
      <ChatBot />
    </>
  );
}