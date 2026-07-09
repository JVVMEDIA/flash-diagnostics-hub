import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import DeferredEffects from "./components/DeferredEffects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HashNavigationInit from "./components/HashNavigationInit";
import { PerformanceProvider } from "./hooks/usePerformanceMode";

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

const perfBootstrapScript = `(function(){try{var ua=navigator.userAgent;var inApp=/FBAN|FBAV|Instagram|Messenger|MicroMessenger/i.test(ua);var m=window.matchMedia('(max-width:768px)').matches;var t='ontouchstart'in window;if(inApp||m||t)document.documentElement.classList.add('perf-lite');}catch(e){}})();`;

const criticalCss = `body{background:#09090b;color:#e4e4e7;margin:0}.page-container{max-width:calc(52rem + 8cm);margin-inline:auto;padding-inline:.5cm}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="dark" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: perfBootstrapScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-200 overflow-x-hidden`}
      >
        <PerformanceProvider>
          <HashNavigationInit />
          <AnimatedBackground />
          <DeferredEffects />
          <Navbar />
          <main className="relative w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </PerformanceProvider>
      </body>
    </html>
  );
}