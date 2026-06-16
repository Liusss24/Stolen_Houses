import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
  cinzelFallback,
  cormorantGaramond,
  limelightDisplay,
} from "@/shared/config/editorial-fonts";
import { getLocale } from "@/shared/lib/get-locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stolen Houses",
    template: "%s | Stolen Houses",
  },
  description:
    "Plataforma para gestionar propiedades, citas y oportunidades de venta.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const fontVariables = [
    geistSans.variable,
    geistMono.variable,
    limelightDisplay.variable,
    cinzelFallback.variable,
    cormorantGaramond.variable,
  ].join(" ");

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
