import { ChevronDown } from "lucide-react";
import FastAnchorLink from "./FastAnchorLink";

export default function ScrollHint() {
  return (
    <FastAnchorLink
      href="#flashovanie"
      className="flex flex-col items-center gap-2 text-emerald-400/80 mt-10 animate-scroll-hint touch-manipulation"
    >
      <span className="text-xs uppercase tracking-widest font-semibold">Scrolluj pre návody</span>
      <ChevronDown size={32} className="text-emerald-400" />
    </FastAnchorLink>
  );
}