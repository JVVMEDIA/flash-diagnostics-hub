import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import { ScrollFloatingDecor, ScrollTimeline } from "./components/ScrollEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = "https://flash-diagnostics-hub.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Flash Diagnostics Hub | Flashovanie & Diagnostika",
  description:
    "Profesionálne centrum pre flashovanie mobilných zariadení, diagnostiku problémov s firmvérom a bezpečné zdieľanie chránených súborov.",
  keywords: [
    "flashovanie",
    "diagnostika",
    "firmvér",
    "fastboot",
    "odin",
    "SP Flash Tool",
    "mobilné zariadenia",
    "Android",
  ],
  authors: [{ name: "Flash Diagnostics Hub" }],
  creator: "JVVMEDIA",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName: "Flash Diagnostics Hub",
    title: "Flash Diagnostics Hub | Flashovanie & Diagnostika",
    description:
      "Centrum pre flashovanie mobilných zariadení, diagnostiku problémov s firmvérom a bezpečné zdieľanie chránených súborov.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Diagnostics Hub | Flashovanie & Diagnostika",
    description:
      "Centrum pre flashovanie mobilných zariadení, diagnostiku a bezpečné zdieľanie súborov.",
    creator: "@jvvmedia",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-200`}
      >
        <AnimatedBackground />
        <ScrollFloatingDecor />
        <ScrollTimeline />
        <ScrollProgress />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}