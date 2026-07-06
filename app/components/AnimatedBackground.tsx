"use client";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-[100px] animate-float-slow" />
      <div className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[90px] animate-float-delayed" />
      <div className="absolute -bottom-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-teal-500/12 blur-[110px] animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse-ring" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950" />
    </div>
  );
}