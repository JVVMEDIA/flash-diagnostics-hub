import { getHubContent } from "./hub-content";
import type { Locale } from "../../i18n/routing";

export type ChatKnowledgeEntry = {
  id: string;
  keywords: string[];
  answer: string;
  link?: string;
  linkLabel?: string;
};

type ChatMessages = {
  greeting: string;
  fallback: string;
  faqSection: string;
  goToFaq: string;
  faq: { question: string; answer: string }[];
  mainSections: { id: string; name: string; description: string }[];
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

const greetingPatterns = [
  "ahoj", "cau", "dobry den", "hello", "hi", "help", "pomoc", "zaciatok",
  "szia", "hej", "cześć", "czesc", "hallo", "guten tag", "witaj",
];

export function buildChatKnowledge(locale: Locale, messages: ChatMessages): ChatKnowledgeEntry[] {
  const content = getHubContent(locale);
  const { flashovanieCategories, diagnostikaCategories, nastrojeCategories } = content;

  return [
    ...messages.faq.map((item, index) => ({
      id: `faq-${index}`,
      keywords: tokenize(`${item.question} ${item.answer}`),
      answer: item.answer,
      link: "#faq",
      linkLabel: messages.faqSection,
    })),
    ...messages.mainSections.map((section) => ({
      id: `section-${section.id}`,
      keywords: tokenize(`${section.name} ${section.description}`),
      answer: `${section.description}.`,
      link: `#${section.id}`,
      linkLabel: section.name,
    })),
    ...[...flashovanieCategories, ...diagnostikaCategories, ...nastrojeCategories].map((cat) => ({
      id: `cat-${cat.id}`,
      keywords: tokenize(`${cat.title} ${cat.description} ${(cat.overview ?? []).join(" ")}`),
      answer: cat.description,
      link: `#${cat.id}`,
      linkLabel: cat.title,
    })),
    {
      id: "greeting",
      keywords: greetingPatterns,
      answer: messages.greeting,
    },
    {
      id: "fallback",
      keywords: [],
      answer: messages.fallback,
      link: "#faq",
      linkLabel: messages.goToFaq,
    },
  ];
}

export function scoreKnowledgeEntry(entry: ChatKnowledgeEntry, queryTokens: string[]): number {
  if (queryTokens.length === 0) return 0;

  const greetingHit = greetingPatterns.some((g) =>
    queryTokens.some((t) => g.includes(t) || t.includes(g))
  );
  if (entry.id === "greeting" && greetingHit) return 100;

  let score = 0;
  for (const token of queryTokens) {
    for (const keyword of entry.keywords) {
      if (keyword === token) score += 4;
      else if (keyword.includes(token) || token.includes(keyword)) score += 2;
    }
  }
  return score;
}

export function findChatAnswer(
  query: string,
  knowledge: ChatKnowledgeEntry[]
): ChatKnowledgeEntry {
  const tokens = tokenize(query);
  if (tokens.length === 0) return knowledge.find((e) => e.id === "fallback")!;

  const greetingOnly =
    tokens.length <= 2 &&
    tokens.every((t) => greetingPatterns.some((g) => g.includes(t) || t.includes(g)));
  if (greetingOnly) return knowledge.find((e) => e.id === "greeting")!;

  let best: ChatKnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    if (entry.id === "fallback" || entry.id === "greeting") continue;
    const score = scoreKnowledgeEntry(entry, tokens);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best! : knowledge.find((e) => e.id === "fallback")!;
}