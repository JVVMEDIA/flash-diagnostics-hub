import FileLinkList from "./FileLinkList";
import type { Subsection } from "../data/hub-content";

type SubsectionCardProps = {
  subsection: Subsection;
  index: number;
};

export default function SubsectionCard({ subsection, index }: SubsectionCardProps) {
  return (
    <article
      id={subsection.id}
      className="scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 md:p-6"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-semibold text-emerald-400">
          {index + 1}
        </span>
        <div>
          <h4 className="font-semibold text-lg text-zinc-100">{subsection.title}</h4>
          <p className="text-sm text-zinc-400 mt-1">{subsection.description}</p>
        </div>
      </div>

      {subsection.steps.length > 0 && (
        <div className="mt-4">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Postup krok za krokom
          </h5>
          <ol className="space-y-2.5 pl-1">
            {subsection.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                <span className="text-emerald-500/80 font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {subsection.tips && subsection.tips.length > 0 && (
        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80 mb-2">
            Tipy a poznámky
          </h5>
          <ul className="space-y-1.5">
            {subsection.tips.map((tip, i) => (
              <li key={i} className="text-sm text-zinc-400 flex gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subsection.warning && (
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
          <span className="font-semibold text-amber-400">Upozornenie: </span>
          {subsection.warning}
        </div>
      )}

      <FileLinkList links={subsection.links} />
    </article>
  );
}