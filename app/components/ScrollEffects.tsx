/** Plávajúce dekorácie — čisto CSS, vždy viditeľné */
export function ScrollFloatingDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block" aria-hidden>
      <div className="absolute left-8 top-[18%] w-24 h-24 rounded-2xl border-2 border-emerald-400/50 bg-emerald-500/15 backdrop-blur-sm shadow-xl shadow-emerald-500/25 animate-float-slow" />
      <div className="absolute left-12 top-[58%] w-14 h-14 rounded-full border-2 border-cyan-400/40 bg-cyan-500/15 animate-float-delayed" />
      <div className="absolute right-10 top-[28%] w-20 h-20 rounded-3xl border-2 border-blue-400/35 bg-blue-500/10 animate-float-slow-reverse" />
      <div className="absolute right-14 top-[68%] w-16 h-16 rounded-xl border-2 border-emerald-400/40 bg-emerald-500/12 animate-float-delayed-reverse" />
      <div className="absolute left-1/2 top-[8%] w-3 h-3 rounded-full bg-emerald-400/80 animate-pulse-dot" />
      <div className="absolute right-[35%] top-[82%] w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse-dot-delayed" />
    </div>
  );
}

/** Statický scroll indikátor — vždy viditeľný */
export function ScrollTimeline() {
  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 h-52"
      aria-hidden
    >
      <div className="w-0.5 h-full bg-zinc-800/80 relative rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full animate-timeline-glow" />
      </div>
      <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/60 ring-2 ring-emerald-500/30" />
    </div>
  );
}