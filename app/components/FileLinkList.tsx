import { ExternalLink, FileDown } from "lucide-react";
import type { FileLink } from "../data/hub-content";

type FileLinkListProps = {
  links: FileLink[];
};

export default function FileLinkList({ links }: FileLinkListProps) {
  if (links.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
        Odkazy na súbory
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url + link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 active:border-emerald-500/40 active:bg-zinc-900/80 touch-manipulation"
            >
              <span className="text-emerald-400 mt-0.5 shrink-0">
                <FileDown size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-zinc-200 group-active:text-emerald-400">
                    {link.label}
                  </span>
                  {link.fileType && (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                      {link.fileType}
                    </span>
                  )}
                  <ExternalLink size={12} className="text-zinc-600" />
                </div>
                {link.note && <p className="text-xs text-zinc-500 mt-1">{link.note}</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}