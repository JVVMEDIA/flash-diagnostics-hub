"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const VisitorCounter = dynamic(() => import("./VisitorCounter"), { ssr: false });

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer-reveal relative border-t border-zinc-800/80 mt-20 py-10 text-sm text-zinc-400">
      <div className="page-container flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <p>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            {t("tagline")}
          </p>
        </div>
        <VisitorCounter />
      </div>
    </footer>
  );
}