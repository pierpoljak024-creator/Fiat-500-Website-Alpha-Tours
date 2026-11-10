import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Fiat 500 Tour Rome | Private Vintage Car Experience | Alpha Tours";
const description =
  "Ride through Rome in a restored classic Fiat 500 with a private chauffeur-guide. Licensed local guides, 2-hour highlights from €130, 4-hour Dolce Vita from €350.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  keywords: [
    "Fiat 500 tour Rome",
    "private vintage car tour Rome",
    "Fiat 500 Rome experience",
    "classic car tour Rome",
    "Dolce Vita tour Rome",
    "Rome highlights private tour",
    "chauffeured tour Rome",
    "Alpha Tours Rome",
  ],
  authors: [{ name: site.parentName, url: site.parentSite }],
  creator: site.parentName,
  publisher: site.parentName,
  alternates: { canonical: "/" },
  category: "travel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.placename": "Roma",
    "geo.region": "IT-RM",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col bg-cream font-sans text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:font-medium focus:tracking-[0.2em] focus:text-cream focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
