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
  { id: "motorola", name: "Motorola", color: "#E1140A", href: "#motorola", type: "brand", initials: "Mo" },
  { id: "samsung", name: "Samsung", color: "#1428A0", href: "#odin-samsung", type: "brand", initials: "Sa" },
  { id: "xiaomi", name: "Xiaomi", color: "#FF6900", href: "#nastroj-miflash", type: "brand", initials: "Xi" },
  { id: "google", name: "Google Pixel", color: "#4285F4", href: "#fastboot-pixel", type: "brand", initials: "GP" },
  { id: "oneplus", name: "OnePlus", color: "#F5010C", href: "#fastboot-adb", type: "brand", initials: "1+" },
  { id: "qualcomm", name: "Qualcomm", color: "#3253DC", href: "#edl-qualcomm", type: "brand", initials: "QC" },
  { id: "mediatek", name: "MediaTek", color: "#EC9430", href: "#sp-flash", type: "brand", initials: "MT" },
  { id: "unisoc", name: "Unisoc", color: "#5C3D9E", href: "#unisoc-ufs", type: "brand", initials: "UN" },
  { id: "android", name: "Android", color: "#3DDC84", href: "#fastboot-adb", type: "brand", initials: "An" },
];

export const flashTools: BrandItem[] = [
  { id: "fastboot", name: "Fastboot / ADB", color: "#3DDC84", href: "#fastboot-adb", type: "tool", initials: "FB" },
  { id: "odin", name: "Odin 3", color: "#1428A0", href: "#odin-samsung", type: "tool", initials: "Od" },
  { id: "spflash", name: "SP Flash Tool", color: "#EC9430", href: "#sp-flash", type: "tool", initials: "SP" },
  { id: "miflash", name: "Mi Flash", color: "#FF6900", href: "#nastroj-miflash", type: "tool", initials: "Mi" },
  { id: "rsa", name: "Motorola RSA", color: "#E1140A", href: "#moto-lmsa-rsa", type: "tool", initials: "RS" },
  { id: "lmsa", name: "LMSA", color: "#E2231A", href: "#moto-lmsa-rsa", type: "tool", initials: "LM" },
  { id: "qpst", name: "QPST / QFIL", color: "#3253DC", href: "#diag-edl-flash", type: "tool", initials: "QP" },
  { id: "platform-tools", name: "Platform Tools", color: "#34A853", href: "#fastboot-priprava", type: "tool", initials: "PT" },
  { id: "spd-flash", name: "SPD Flash", color: "#5C3D9E", href: "#unisoc-spd-flash", type: "tool", initials: "SD" },
];

export const brandMap = Object.fromEntries(
  [...mobileBrands, ...flashTools].map((b) => [b.id, b])
) as Record<string, BrandItem>;