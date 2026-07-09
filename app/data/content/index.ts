import type { Locale } from "../../../i18n/routing";
import type { HubContent } from "./types";
import { skHubContent } from "./sk";
import { enHubContent } from "./en";
import { csHubContent } from "./cs";
import { plHubContent } from "./pl";
import { huHubContent } from "./hu";
import { deHubContent } from "./de";

const hubContentByLocale: Record<Locale, HubContent> = {
  sk: skHubContent,
  en: enHubContent,
  cs: csHubContent,
  pl: plHubContent,
  hu: huHubContent,
  de: deHubContent,
};

export function getHubContent(locale: Locale): HubContent {
  return hubContentByLocale[locale] ?? skHubContent;
}