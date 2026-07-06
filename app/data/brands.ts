export type BrandItem = {
  id: string;
  name: string;
  slug?: string;
  color: string;
  href?: string;
  type: "brand" | "tool";
  initials?: string;
};

export const mobileBrands: BrandItem[] = [
  { id: "motorola", name: "Motorola", slug: "motorola", color: "#E1140A", href: "#motorola", type: "brand" },
  { id: "samsung", name: "Samsung", slug: "samsung", color: "#1428A0", href: "#odin-samsung", type: "brand" },
  { id: "xiaomi", name: "Xiaomi", slug: "xiaomi", color: "#FF6900", href: "#nastroj-miflash", type: "brand" },
  { id: "google", name: "Google Pixel", slug: "google", color: "#4285F4", href: "#fastboot-pixel", type: "brand" },
  { id: "oneplus", name: "OnePlus", slug: "oneplus", color: "#F5010C", href: "#fastboot-adb", type: "brand" },
  { id: "qualcomm", name: "Qualcomm", slug: "qualcomm", color: "#3253DC", href: "#edl-qualcomm", type: "brand" },
  { id: "mediatek", name: "MediaTek", slug: "mediatek", color: "#EC9430", href: "#sp-flash", type: "brand" },
  { id: "android", name: "Android", slug: "android", color: "#3DDC84", href: "#fastboot-adb", type: "brand" },
];

export const flashTools: BrandItem[] = [
  { id: "fastboot", name: "Fastboot / ADB", slug: "android", color: "#3DDC84", href: "#fastboot-adb", type: "tool" },
  { id: "odin", name: "Odin 3", slug: "samsung", color: "#1428A0", href: "#odin-samsung", type: "tool" },
  { id: "spflash", name: "SP Flash Tool", slug: "mediatek", color: "#EC9430", href: "#sp-flash", type: "tool" },
  { id: "miflash", name: "Mi Flash", slug: "xiaomi", color: "#FF6900", href: "#nastroj-miflash", type: "tool" },
  { id: "rsa", name: "Motorola RSA", slug: "motorola", color: "#E1140A", href: "#moto-lmsa-rsa", type: "tool" },
  { id: "lmsa", name: "LMSA", slug: "lenovo", color: "#E2231A", href: "#moto-lmsa-rsa", type: "tool" },
  { id: "qpst", name: "QPST / QFIL", slug: "qualcomm", color: "#3253DC", href: "#diag-edl-flash", type: "tool" },
  { id: "platform-tools", name: "Platform Tools", slug: "google", color: "#34A853", href: "#fastboot-priprava", type: "tool" },
];

export const brandMap = Object.fromEntries(
  [...mobileBrands, ...flashTools].map((b) => [b.id, b])
) as Record<string, BrandItem>;