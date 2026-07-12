import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import AnimatedBackground from "../components/AnimatedBackground";
import DeferredEffects from "../components/DeferredEffects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import HashNavigationInit from "../components/HashNavigationInit";
import { PerformanceProvider } from "../hooks/usePerformanceMode";
import { routing, type Locale } from "../../i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-200 overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <PerformanceProvider>
            <HashNavigationInit />
            <AnimatedBackground />
            <DeferredEffects />
            <Navbar />
            <main className="relative w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
            <ScrollToTopButton />
          </PerformanceProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}