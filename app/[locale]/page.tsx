import { setRequestLocale } from "next-intl/server";
import HubPageContent from "../components/HubPageContent";
import JsonLd from "../components/JsonLd";
import { getPageMetadata } from "../data/seo";
import type { Locale } from "../../i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale as Locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <HubPageContent />
    </>
  );
}