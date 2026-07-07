"use client";

import { useEffect } from "react";
import { fastNavigateToHash } from "../data/navigation";

export default function HashNavigationInit() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.setTimeout(() => fastNavigateToHash(hash), 100);
    }

    const onHashChange = () => {
      if (window.location.hash) {
        fastNavigateToHash(window.location.hash);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}