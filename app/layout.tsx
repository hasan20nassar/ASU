import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HtmlDirUpdater } from "@/components/html-dir-updater";
import { AuthGuard } from "@/components/auth-guard";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antioch Syrian University | جامعة أنطاكية السورية",
  description:
    "Antioch Syrian University - Excellence in Higher Education since 2017. Offering programs in Engineering, Pharmacy, Dentistry, Law, Arts, and Administrative Sciences.",
    generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#800000" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${tajawal.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <HtmlDirUpdater />
            <AuthGuard>
              <SmoothScroll>{children}</SmoothScroll>
            </AuthGuard>
            <Toaster position="top-center" />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}