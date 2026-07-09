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
      if ("requestIdleCallback" in window) {
        await new Promise<void>((resolve) => {
          window.requestIdleCallback(() => resolve(), { timeout: 3000 });
        });
      }

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