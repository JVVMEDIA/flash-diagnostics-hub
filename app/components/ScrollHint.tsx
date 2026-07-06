import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  return (
    <a
      href="#flashovanie"
      className="flex flex-col items-center gap-2 text-emerald-400/80 hover:text-emerald-300 transition-colors mt-10 animate-scroll-hint"
    >
      <span className="text-xs uppercase tracking-widest font-semibold">Scrolluj pre návody</span>
      <ChevronDown size={32} className="text-emerald-400" />
    </a>
  );
}