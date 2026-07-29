import type { Metadata } from "next";
import { Fraunces, Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// NOTE: Futura is a licensed commercial typeface (Monotype) — not available
// via next/font/google. Using Jost as a free geometric-sans stand-in (shares
// Futura's circular-O, geometric-M letterforms). Once Futura is licensed
// (e.g. via Adobe Fonts / Typekit), swap this import for a self-hosted
// @font-face and update --font-body in globals.css.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ifechukwu Max-Oti — Frontend Developer & Tutor",
  description:
    "Frontend developer and tutor building production interfaces with React, Next.js, and Tailwind — and teaching the next generation of developers to do the same.",
  openGraph: {
    title: "Ifechukwu Max-Oti — Frontend Developer & Tutor",
    description:
      "Frontend developer and tutor building production interfaces with React, Next.js, and Tailwind.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
