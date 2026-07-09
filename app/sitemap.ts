import type { MetadataRoute } from "next";
import { siteConfig, localePath } from "./data/seo";
import { locales, type Locale } from "../i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${siteConfig.url}${localePath(locale as Locale)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "sk" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [
          loc === "sk" ? "sk-SK" : loc === "en" ? "en-GB" : loc === "cs" ? "cs-CZ" : loc === "pl" ? "pl-PL" : loc === "hu" ? "hu-HU" : "de-DE",
          `${siteConfig.url}${localePath(loc as Locale)}`,
        ])
      ),
    },
  }));
}