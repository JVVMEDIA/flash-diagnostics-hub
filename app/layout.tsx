import type { ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "./data/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}