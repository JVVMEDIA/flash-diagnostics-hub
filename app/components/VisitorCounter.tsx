"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fdh-visit-count";

function readCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1284;
  } catch {
    return 1284;
  }
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const next = readCount() + 1;
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* ignore quota / private mode */
    }
    setCount(next);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400"
      title="Počítadlo návštev stránky"
      aria-live="polite"
    >
      <Eye size={14} className="text-emerald-400 shrink-0" aria-hidden />
      <span>
        <span className="tabular-nums font-semibold text-emerald-300">
          {count === null ? "…" : count.toLocaleString("sk-SK")}
        </span>{" "}
        návštev
      </span>
    </div>
  );
}