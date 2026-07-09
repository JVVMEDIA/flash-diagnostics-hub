"use client";

import { useTranslations } from "next-intl";
import FileLinkList from "./FileLinkList";
import type { Subsection } from "../data/hub-content";

type SubsectionCardProps = {
  subsection: Subsection;
  index: number;
  entryDelay?: number;
};

export default function SubsectionCard({
  subsection,
  index,
  entryDelay = 0,
}: SubsectionCardProps) {
  const t = useTranslations("cards");

  return (
    <article
      id={subsection.id}
      className="subsection-card-entry subsection-card-inner scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5 md:p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/30 w-full max-w-full min-w-0 break-words"
      style={{ animationDelay: `${entryDelay}s` }}
    >
      <div className="flex items-start gap-3 mb-3 min-w-0">
        <span className="subsection-index flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg text-zinc-100 break-words [overflow-wrap:anywhere]">
            {subsection.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 leading-relaxed break-words [overflow-wrap:anywhere]">
            {subsection.description}
          </p>
        </div>
      </div>

      {subsection.steps.length > 0 && (
        <div className="mt-4">
          <h4 className="section-kicker">{t("steps")}</h4>
          <ol className="space-y-2.5 pl-1">
            {subsection.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-zinc-300 leading-relaxed group/step"
              >
                <span className="text-emerald-500/80 font-mono text-xs mt-0.5 shrink-0 group-hover/step:text-emerald-400 transition-colors">
                  {i + 1}.
                </span>
                <span className="min-w-0 break-words [overflow-wrap:anywhere]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {subsection.tips && subsection.tips.length > 0 && (
        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <h4 className="section-kicker text-emerald-300 mb-2">{t("tips")}</h4>
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
        <div className="warning-pulse mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
          <span className="font-semibold text-amber-400">{t("warning")}: </span>
          {subsection.warning}
        </div>
      )}

      <FileLinkList links={subsection.links} />
    </article>
  );
}