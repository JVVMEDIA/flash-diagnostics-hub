import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig, localePath } from "../data/seo";
import type { Locale } from "../../i18n/routing";

function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data);
}

const localeToSchema: Record<Locale, string> = {
  sk: "sk-SK",
  en: "en-GB",
  cs: "cs-CZ",
  pl: "pl-PL",
  hu: "hu-HU",
  de: "de-DE",
};

export default async function JsonLd() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tJson = await getTranslations({ locale, namespace: "jsonLd" });
  const tMain = await getTranslations({ locale });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const pageUrl = `${siteConfig.url}${localePath(locale)}`;
  const inLanguage = localeToSchema[locale];
  const mainSections = tMain.raw("mainSections") as { id: string; name: string; description: string }[];
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: t("description"),
    inLanguage,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.creator,
    url: siteConfig.github,
    sameAs: [siteConfig.github],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: t("title"),
    description: t("description"),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    inLanguage,
    about: {
      "@type": "Thing",
      name: t("about"),
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tJson("itemListName"),
    itemListElement: mainSections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: section.name,
      description: section.description,
      url: `${pageUrl}#${section.id}`,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: t("description"),
    url: pageUrl,
    inLanguage,
    author: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(softwareApp) }} />
    </>
  );
}