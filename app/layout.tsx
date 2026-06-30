import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://prestigeautorentals-ten.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prestige Auto Rentals - Drive the Extraordinary",
  description:
    "Prestige Auto Rentals - an exclusive fleet of luxury, sport, SUV and everyday vehicles, with concierge airport transfers and host placement. Book by phone or Instagram.",
  keywords: [
    "luxury car rental",
    "exotic car rental",
    "SUV rental",
    "airport transfers",
    "Prestige Auto Rentals",
  ],
  openGraph: {
    title: "Prestige Auto Rentals - Drive the Extraordinary",
    description:
      "An exclusive fleet of luxury, sport and everyday vehicles. Concierge service. Book by phone or Instagram.",
    url: SITE_URL,
    siteName: "Prestige Auto Rentals",
    images: [{ url: "/experiences/luxury-banner.webp", width: 1800, height: 1200 }],
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
