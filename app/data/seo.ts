import type { Metadata } from "next";
import type { Locale } from "../../i18n/routing";
import { getTranslations } from "next-intl/server";

export const siteConfig = {
  name: "Flash Diagnostics Hub",
  shortName: "FD Hub",
  url: "https://flash-diagnostics-hub.vercel.app",
  github: "https://github.com/JVVMEDIA/flash-diagnostics-hub",
  creator: "JVVMEDIA",
  publisher: "JVVMEDIA",
  twitter: "@jvvmedia",
} as const;

const localeToOg: Record<Locale, string> = {
  sk: "sk_SK",
  en: "en_GB",
  cs: "cs_CZ",
  pl: "pl_PL",
  hu: "hu_HU",
  de: "de_DE",
};

const localeToHreflang: Record<Locale, string> = {
  sk: "sk-SK",
  en: "en-GB",
  cs: "cs-CZ",
  pl: "pl-PL",
  hu: "hu-HU",
  de: "de-DE",
};

export function localePath(locale: Locale): string {
  return locale === "sk" ? "/" : `/${locale}`;
}

export async function getPageMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages: Record<string, string> = {};
  for (const loc of ["sk", "en", "cs", "pl", "hu", "de"] as Locale[]) {
    languages[localeToHreflang[loc]] = localePath(loc);
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.creator, url: siteConfig.github }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: "technology",
    alternates: {
      canonical: localePath(locale),
      languages,
    },
    openGraph: {
      type: "website",
      locale: localeToOg[locale],
      url: `${siteConfig.url}${localePath(locale)}`,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: t("title"),
      description: t("tagline"),
      images: ["/twitter-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon", type: "image/png", sizes: "32x32" },
      ],
      apple: "/apple-icon",
    },
    manifest: "/manifest.webmanifest",
    other: {
      "content-language": locale,
    },
  };
}