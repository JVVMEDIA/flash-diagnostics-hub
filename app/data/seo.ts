import type { Metadata } from "next";

export const siteConfig = {
  name: "Flash Diagnostics Hub",
  shortName: "FD Hub",
  title:
    "Flash Diagnostics Hub | Flashovanie Android, diagnostika firmvéru a návody",
  description:
    "Kompletný slovenský sprievodca flashovaním mobilných zariadení — Motorola, Samsung Odin, Fastboot, SP Flash, Unisoc/UFS, EDL Qualcomm, bootloop, hardbrick, FRP a bezpečné zdieľanie firmvéru. Oficiálne nástroje, krok za krokom postupy a odkazy na stiahnutie.",
  tagline:
    "Flashovanie, diagnostika firmvéru a bezpečné zdieľanie súborov pre Android zariadenia.",
  url: "https://flash-diagnostics-hub.vercel.app",
  locale: "sk_SK",
  language: "sk",
  github: "https://github.com/JVVMEDIA/flash-diagnostics-hub",
  creator: "JVVMEDIA",
  publisher: "JVVMEDIA",
  twitter: "@jvvmedia",
  ogImageAlt:
    "Flash Diagnostics Hub — flashovanie Motorola, Samsung, Xiaomi, Unisoc, diagnostika a bezpečné zdieľanie",
  keywords: [
    "flashovanie mobilov",
    "flashovanie Android",
    "flashovanie telefónu",
    "diagnostika firmvéru",
    "Motorola flash",
    "Motorola fastboot",
    "Motorola bootloader unlock",
    "Samsung Odin",
    "Odin flash",
    "Fastboot ADB",
    "SP Flash Tool",
    "MediaTek flash",
    "Unisoc flash",
    "Spreadtrum PAC",
    "UFS pamäť flash",
    "EDL Qualcomm",
    "QPST QFIL",
    "Mi Flash Xiaomi",
    "bootloop oprava",
    "hardbrick oživenie",
    "soft brick",
    "FRP bypass",
    "factory reset protection",
    "firmware download",
    "stock ROM",
    "LMSA Motorola",
    "RSA Motorola rescue",
    "bezpečné zdieľanie firmvéru",
    "7-Zip AES-256",
    "mobilná diagnostika",
    "Google Pixel factory image",
    "OnePlus flash",
  ],
} as const;

export const mainSections = [
  { id: "flashovanie", name: "Flashovanie zariadení", description: "Fastboot, Motorola, Odin, SP Flash, Unisoc/UFS" },
  { id: "diagnostika", name: "Diagnostika problémov", description: "Bootloop, brick, EDL, USB drivery" },
  { id: "nastroje", name: "Nástroje a firmvér", description: "Oficiálne flash nástroje a ROM katalógy" },
  { id: "zdielanie", name: "Bezpečné zdieľanie", description: "Password-protected ZIP a platformy" },
] as const;

export const faqItems = [
  {
    question: "Ako flashnúť Motorola telefón?",
    answer:
      "Odomkni bootloader cez oficiálnu Motorola stránku, stiahni RETAIL firmware pre presný model XT-xxxx a flashni cez fastboot alebo Motorola Rescue and Smart Assistant (RSA/LMSA). Postup je krok za krokom v sekcii Motorola.",
  },
  {
    question: "Čo je Samsung Odin a ako sa používa?",
    answer:
      "Odin je nástroj pre flash Samsung Galaxy v Download móde. Načítaj súbory AP, BL, CP a CSC z firmware balíka, pripoj telefón a spusti flash. Detailný návod nájdeš v sekcii Odin (Samsung).",
  },
  {
    question: "Ako opraviť bootloop alebo brick?",
    answer:
      "Najprv identifikuj režim zariadenia (fastboot, Download, EDL, MTK). Potom re-flashni posledný funkčný stock ROM cez príslušný nástroj — Odin, fastboot, SP Flash alebo LMSA. Sekcia Diagnostika obsahuje postup podľa závažnosti.",
  },
  {
    question: "Ako bezpečne zdieľať firmware súbory?",
    answer:
      "Zabaľ súbory do ZIP archívu s AES-256 šifrovaním (7-Zip), nahraj na SwissTransfer alebo Proton Drive a heslo pošli iným kanálom ako odkaz na súbor. Generátor inštrukcií je v sekcii Bezpečné zdieľanie.",
  },
  {
    question: "Čo je Unisoc flash a UFS pamäť?",
    answer:
      "Unisoc (Spreadtrum) zariadenia sa flashujú cez Research Download / SPD nástroj s PAC firmvérom. UFS je rýchlejšie úložisko — vyžaduje presný firmware variant. Návody vrátane FRP a hardbrick obnovy sú v sekcii Unisoc & UFS.",
  },
] as const;

export const pageMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator, url: siteConfig.github }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "sk-SK": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.tagline,
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
    "content-language": "sk",
  },
};