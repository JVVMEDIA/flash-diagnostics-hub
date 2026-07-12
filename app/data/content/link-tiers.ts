import type { FileLink, LinkTier } from "./types";

const MIRROR_HOSTS = [
  "mirrors.lolinet.com",
  "sammobile.com",
  "needrom.com",
  "xmfirmwareupdater.com",
];

const OFFICIAL_HOSTS = [
  "developer.android.com",
  "developers.google.com",
  "support.motorola.com",
  "developer.samsung.com",
  "samsung.com",
  "mediatek.com",
  "unisoc.com",
  "mi.com",
  "xiaomi.com",
  "hyperos.mi.com",
  "en.miui.com",
  "lenovo.com",
  "7-zip.org",
  "proton.me",
  "swisstransfer.com",
  "wetransfer.com",
  "mega.io",
  "vercel.com",
  "learn.microsoft.com",
  "android.com",
];

const TIER_ORDER: Record<LinkTier, number> = {
  official: 0,
  community: 1,
  mirror: 2,
};

export function getLinkTier(url: string, override?: LinkTier): LinkTier {
  if (override) return override;

  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "community";
  }

  if (MIRROR_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`))) {
    return "mirror";
  }

  if (OFFICIAL_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`))) {
    return "official";
  }

  return "community";
}

export function sortFileLinks(links: FileLink[]): FileLink[] {
  return [...links].sort(
    (a, b) => TIER_ORDER[getLinkTier(a.url, a.tier)] - TIER_ORDER[getLinkTier(b.url, b.tier)],
  );
}