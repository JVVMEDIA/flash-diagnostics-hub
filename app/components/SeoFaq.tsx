import { faqItems } from "../data/seo";

export default function SeoFaq() {
  return (
    <section
      id="faq"
      className="py-16 border-t border-zinc-800/80 scroll-mt-24"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="section-title mb-3">
        Často kladené otázky
      </h2>
      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
        Odpovede na najčastejšie otázky o flashovaní, diagnostike firmvéru a bezpečnom zdieľaní
        súborov pre Android zariadenia.
      </p>

      <div className="space-y-3">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 sm:px-5 py-4 open:border-emerald-500/30 open:bg-zinc-900/30"
          >
            <summary className="cursor-pointer font-medium text-zinc-100 list-none flex items-center justify-between gap-3">
              <span>{item.question}</span>
              <span className="text-emerald-400 text-lg shrink-0 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}