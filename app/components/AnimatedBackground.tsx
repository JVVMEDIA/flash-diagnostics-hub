export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-grid bg-grid-drift opacity-[0.55]" />

      <div className="absolute -top-24 left-[5%] h-[34rem] w-[34rem] rounded-full bg-emerald-400/30 blur-[90px] animate-orb-drift-1" />
      <div className="absolute top-[35%] -right-24 h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-[100px] animate-orb-drift-2" />
      <div className="absolute -bottom-28 left-[20%] h-[38rem] w-[38rem] rounded-full bg-teal-400/22 blur-[110px] animate-orb-drift-3" />
      <div className="absolute top-[15%] right-[28%] h-[22rem] w-[22rem] rounded-full bg-blue-400/20 blur-[80px] animate-orb-drift-4" />
      <div className="absolute top-[60%] left-[55%] h-[18rem] w-[18rem] rounded-full bg-emerald-300/18 blur-[70px] animate-orb-drift-5" />

      <div className="absolute inset-0 bg-circuit opacity-[0.12]" />
      <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.06]" />

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(16,185,129,0.18),transparent_60%)]" />
    </div>
  );
}