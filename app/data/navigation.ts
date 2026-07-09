import {
  diagnostikaCategories,
  flashovanieCategories,
  nastrojeCategories,
} from "./hub-content";

const allCategories = [
  ...flashovanieCategories,
  ...diagnostikaCategories,
  ...nastrojeCategories,
];

/** Mapuje ID sekcie/podsekcie na ID kategórie, ktorá sa musí otvoriť */
export const targetToCategory: Record<string, string> = {};

for (const category of allCategories) {
  targetToCategory[category.id] = category.id;
  for (const subsection of category.subsections) {
    targetToCategory[subsection.id] = category.id;
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function fastNavigateToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const categoryId = targetToCategory[id];

  if (categoryId) {
    window.dispatchEvent(new CustomEvent("open-category", { detail: categoryId }));
  }

  const scroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  if (categoryId) {
    window.setTimeout(scroll, 40);
  } else {
    scroll();
  }
}