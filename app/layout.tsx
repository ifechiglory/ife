import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import PageShell from "@/components/ui/PageShell";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,

  keywords: [
    "Ifechukwu Max-Oti",
    "frontend developer",
    "frontend developer portfolio",
    "React developer",
    "Next.js developer",
    "frontend tutor",
    "Nigeria frontend developer",
  ],

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Frontend Developer",
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://github.com/ifechiglory",
    "https://www.linkedin.com/in/ifechukwumaxoti/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />

        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
