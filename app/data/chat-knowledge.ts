import {
  diagnostikaCategories,
  flashovanieCategories,
  nastrojeCategories,
} from "./hub-content";
import { faqItems, mainSections } from "./seo";

export type ChatKnowledgeEntry = {
  id: string;
  keywords: string[];
  answer: string;
  link?: string;
  linkLabel?: string;
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

const greetingPatterns = ["ahoj", "cau", "dobry den", "hello", "hi", "help", "pomoc", "zaciatok"];

export const chatQuickQuestions = faqItems.map((item) => item.question);

export const chatKnowledge: ChatKnowledgeEntry[] = [
  ...faqItems.map((item, index) => ({
    id: `faq-${index}`,
    keywords: tokenize(`${item.question} ${item.answer}`),
    answer: item.answer,
    link: "#faq",
    linkLabel: "FAQ sekcia",
  })),
  ...mainSections.map((section) => ({
    id: `section-${section.id}`,
    keywords: tokenize(`${section.name} ${section.description}`),
    answer: `${section.description}. Detailné návody nájdeš v sekcii ${section.name}.`,
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
    answer:
      "Ahoj! Som asistent Flash Diagnostics Hub. Pomôžem ti s flashovaním, diagnostikou, nástrojmi alebo bezpečným zdieľaním firmvéru. Vyber otázku nižšie alebo napíš, čo potrebuješ.",
  },
  {
    id: "fallback",
    keywords: [],
    answer:
      "Na túto otázku nemám presnú odpoveď. Skús preformulovať (napr. Motorola, Odin, bootloop, Unisoc) alebo pozri sekcie Flashovanie, Diagnostika a FAQ na stránke.",
    link: "#faq",
    linkLabel: "Prejsť na FAQ",
  },
];

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

export function findChatAnswer(query: string): ChatKnowledgeEntry {
  const tokens = tokenize(query);
  if (tokens.length === 0) return chatKnowledge.find((e) => e.id === "fallback")!;

  const greetingOnly =
    tokens.length <= 2 &&
    tokens.every((t) => greetingPatterns.some((g) => g.includes(t) || t.includes(g)));
  if (greetingOnly) return chatKnowledge.find((e) => e.id === "greeting")!;

  let best: ChatKnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of chatKnowledge) {
    if (entry.id === "fallback" || entry.id === "greeting") continue;
    const score = scoreKnowledgeEntry(entry, tokens);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 3) return chatKnowledge.find((e) => e.id === "fallback")!;
  return best;
}