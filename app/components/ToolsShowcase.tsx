import { flashTools } from "../data/brands";
import BrandLogo from "./BrandLogo";
import FastAnchorLink from "./FastAnchorLink";

export default function ToolsShowcase() {
  return (
    <section
      id="nastroje-znacky"
      aria-labelledby="tools-showcase-heading"
      className="py-12 sm:py-16 border-t-2 border-emerald-400/30 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-3xl my-6 px-3 sm:px-4 ring-1 ring-emerald-500/20"
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 id="tools-showcase-heading" className="section-title text-emerald-300">
          🛠 Nástroje a značky
        </h2>
        <p className="text-zinc-300 max-w-2xl mx-auto mt-3 leading-relaxed text-sm sm:text-base px-2">
          Klikni na logo a preskoč priamo na návod alebo sekciu s odkazmi na stiahnutie.
        </p>
        <div className="mt-5 h-1 w-40 bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {flashTools.map((tool) => (
          <FastAnchorLink
            key={tool.id}
            href={tool.href ?? "#"}
            className="group relative flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-900/60 h-full active:opacity-90 touch-manipulation"
            style={{
              background: `linear-gradient(160deg, ${tool.color}25 0%, #18181b 55%)`,
              borderColor: `${tool.color}55`,
              boxShadow: `0 0 24px ${tool.color}25`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${tool.color}50, transparent 70%)`,
              }}
            />
            <BrandLogo brand={tool} size="xl" />
            <div className="relative text-center">
              <div className="font-bold text-zinc-100 text-sm sm:text-base">{tool.name}</div>
              <div
                className="text-[10px] sm:text-[11px] uppercase tracking-wider mt-1 font-bold"
                style={{ color: tool.color }}
              >
                Flash nástroj
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Otvoriť návod →</span>
          </FastAnchorLink>
        ))}
      </div>
    </section>
  );
}