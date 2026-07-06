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
        <ol className="mt-4 space-y-2 pl-1">
          {subsection.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-400">
              <span className="text-emerald-500/80 font-mono text-xs mt-0.5">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      <FileLinkList links={subsection.links} />
    </article>
  );
}