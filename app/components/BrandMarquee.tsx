import { mobileBrands } from "../data/brands";
import BrandLogo from "./BrandLogo";

export default function BrandMarquee() {
  const items = [...mobileBrands, ...mobileBrands];

  return (
    <div className="relative py-6 sm:py-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900/40">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none perf-hide-lite" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none perf-hide-lite" />

      {/* Desktop — animovaný pás */}
      <div className="perf-hide-lite flex gap-12 w-max animate-marquee">
        {items.map((brand, i) => (
          <a
            key={`${brand.id}-${i}`}
            href={brand.href}
            className="flex flex-col items-center gap-3 min-w-[88px] group"
            title={brand.name}
          >
            <BrandLogo brand={brand} size="lg" />
            <span className="text-sm font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              {brand.name}
            </span>
          </a>
        ))}
      </div>

      {/* Mobile / Messenger — statická mriežka */}
      <div className="perf-show-lite grid grid-cols-3 sm:grid-cols-4 gap-4 px-3">
        {mobileBrands.map((brand) => (
          <a
            key={brand.id}
            href={brand.href}
            className="flex flex-col items-center gap-2"
            title={brand.name}
          >
            <BrandLogo brand={brand} size="md" />
            <span className="text-xs font-medium text-zinc-400 text-center leading-tight">
              {brand.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}