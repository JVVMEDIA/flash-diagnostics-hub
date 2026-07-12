"use client";

import { ExternalLink, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { getLinkTier, sortFileLinks } from "../data/content/link-tiers";
import type { FileLink, LinkTier } from "../data/hub-content";

type FileLinkListProps = {
  links: FileLink[];
};

const tierBadgeClass: Record<LinkTier, string> = {
  official: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  community: "bg-zinc-800 text-zinc-400 border-zinc-700",
  mirror: "bg-amber-500/10 text-amber-300 border-amber-500/30",
};

function tierLabelKey(tier: LinkTier): "linkOfficial" | "linkCommunity" | "linkMirror" {
  if (tier === "official") return "linkOfficial";
  if (tier === "mirror") return "linkMirror";
  return "linkCommunity";
}

export default function FileLinkList({ links }: FileLinkListProps) {
  const t = useTranslations("cards");
  const sorted = sortFileLinks(links);

  if (sorted.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="section-kicker">{t("fileLinks")}</p>
      <ul className="space-y-2">
        {sorted.map((link) => {
          const tier = getLinkTier(link.url, link.tier);
          const rel = tier === "mirror" ? "noopener noreferrer nofollow" : "noopener noreferrer";

          return (
            <li key={link.url + link.label}>
              <a
                href={link.url}
                target="_blank"
                rel={rel}
                className="group flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 active:border-emerald-500/40 active:bg-zinc-900/80 touch-manipulation"
              >
                <span className="text-emerald-400 mt-0.5 shrink-0">
                  <FileDown size={16} />
                </span>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="flex flex-wrap items-start gap-2 min-w-0">
                    <span className="file-link-label text-sm font-medium text-zinc-200 group-active:text-emerald-400 min-w-0">
                      {link.label}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-md border ${tierBadgeClass[tier]}`}
                    >
                      {t(tierLabelKey(tier))}
                    </span>
                    {link.fileType && (
                      <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                        {link.fileType}
                      </span>
                    )}
                    <ExternalLink size={12} className="text-zinc-600" />
                  </div>
                  {link.note && <p className="text-xs text-zinc-400 mt-1">{link.note}</p>}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}