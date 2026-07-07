"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const NAMESPACE = "flash-diagnostics-hub";
const KEY = "total-visits";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const hit = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
        if (!hit.ok) throw new Error("hit failed");
        const get = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`);
        if (!get.ok) throw new Error("get failed");
        const data = (await get.json()) as { value?: number };
        if (!cancelled && typeof data.value === "number") {
          setCount(data.value);
        }
      } catch {
        const local = Number(localStorage.getItem("fdh-local-visits") ?? "0") + 1;
        localStorage.setItem("fdh-local-visits", String(local));
        if (!cancelled) setCount(local);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-xs text-emerald-300/90"
      title="Počítadlo návštev"
    >
      <Eye size={14} className="text-emerald-400 shrink-0" />
      <span className="tabular-nums font-medium">
        {count === null ? "…" : count.toLocaleString("sk-SK")}
      </span>
      <span className="text-zinc-500 hidden sm:inline">návštev</span>
    </div>
  );
}