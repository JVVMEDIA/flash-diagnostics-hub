"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const IN_APP_BROWSER = /FBAN|FBAV|Instagram|Messenger|MicroMessenger|Line\/|Twitter|LinkedInApp/i;

export function detectPerformanceMode(): boolean {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent;
  const inApp = IN_APP_BROWSER.test(ua);
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = conn?.saveData === true;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = mem !== undefined && mem < 4;

  return inApp || narrow || (touch && narrow) || saveData || lowMemory;
}

type PerformanceContextValue = {
  lite: boolean;
};

const PerformanceContext = createContext<PerformanceContextValue>({ lite: false });

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const update = () => {
      const next = detectPerformanceMode();
      setLite(next);
      document.documentElement.classList.toggle("perf-lite", next);
    };

    update();
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.documentElement.classList.remove("perf-lite");
    };
  }, []);

  return <PerformanceContext.Provider value={{ lite }}>{children}</PerformanceContext.Provider>;
}

export function usePerformanceMode() {
  return useContext(PerformanceContext).lite;
}

/** Vypne scroll animácie na mobile / in-app prehliadačoch */
export function useSkipHeavyMotion() {
  const lite = usePerformanceMode();
  return lite;
}