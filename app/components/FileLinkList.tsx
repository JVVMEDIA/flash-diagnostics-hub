"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FileDown } from "lucide-react";
import type { FileLink } from "../data/hub-content";

type FileLinkListProps = {
  links: FileLink[];
};

export default function FileLinkList({ links }: FileLinkListProps) {
  const reduceMotion = useReducedMotion();

  if (links.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
        Odkazy na súbory
      </h4>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <motion.li
            key={link.url + link.label}
            initial={reduceMotion ? {} : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-colors"
              whileHover={reduceMotion ? {} : { x: 4, scale: 1.01 }}
              whileTap={reduceMotion ? {} : { scale: 0.99 }}
            >
              <motion.span
                className="text-emerald-400 mt-0.5 shrink-0"
                whileHover={reduceMotion ? {} : { y: 2 }}
              >
                <FileDown size={16} />
              </motion.span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                    {link.label}
                  </span>
                  {link.fileType && (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400/80 transition-colors">
                      {link.fileType}
                    </span>
                  )}
                  <ExternalLink
                    size={12}
                    className="text-zinc-600 group-hover:text-emerald-400/70 transition-colors"
                  />
                </div>
                {link.note && <p className="text-xs text-zinc-500 mt-1">{link.note}</p>}
              </div>
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}