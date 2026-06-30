import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prestige Auto Rentals — Luxury & Exotic Car Rental",
  description:
    "Drive the extraordinary. Prestige Auto Rentals offers an exclusive fleet of luxury, exotic, and performance vehicles with concierge-level service.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
