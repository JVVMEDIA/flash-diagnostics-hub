import { defineRouting } from "next-intl/routing";

export const locales = ["sk", "en", "cs", "pl", "hu", "de"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  sk: "Slovenčina",
  en: "English",
  cs: "Čeština",
  pl: "Polski",
  hu: "Magyar",
  de: "Deutsch",
};

export const localeFlags: Record<Locale, string> = {
  sk: "🇸🇰",
  en: "🇬🇧",
  cs: "🇨🇿",
  pl: "🇵🇱",
  hu: "🇭🇺",
  de: "🇩🇪",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "sk",
  localePrefix: "as-needed",
  localeDetection: true,
});