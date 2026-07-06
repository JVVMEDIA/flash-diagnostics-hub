import { flashTools } from "../data/brands";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./motion/ScrollReveal";

export default function ToolsShowcase() {
  return (
    <section className="py-16 border-t-2 border-emerald-400/30 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-3xl my-6 px-4 ring-1 ring-emerald-500/20">
      <ScrollReveal direction="up" immediate distance={40}>
        <div className="text-center mb-12">
          <h2 className="section-title text-emerald-300 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            🛠 Nástroje a značky
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto mt-3 leading-relaxed">
            Klikni na logo a preskoč priamo na návod alebo sekciu s odkazmi na stiahnutie.
          </p>
          <div className="mt-5 h-1 w-40 bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent mx-auto rounded-full" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6">
        {flashTools.map((tool, i) => (
          <ScrollReveal key={tool.id} delay={i * 0.05} direction="up" distance={30} immediate>
            <a
              href={tool.href}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-900/60 overflow-hidden h-full hover:scale-105 transition-all duration-200"
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
                <div className="font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {tool.name}
                </div>
                <div
                  className="text-[11px] uppercase tracking-wider mt-1 font-bold"
                  style={{ color: tool.color }}
                >
                  Flash nástroj
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                Otvoriť návod →
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}