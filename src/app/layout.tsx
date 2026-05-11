import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freeaihub.io"),
  title: {
    default: "FreeAIHub — 1000+ Free AI Tools Directory",
    template: "%s | FreeAIHub",
  },
  description:
    "Discover 1000+ free AI tools across 40 categories. Find the best free AI tools for writing, image generation, video creation, coding, and more — all verified free.",
  keywords: [
    "free AI tools",
    "AI tools directory",
    "free artificial intelligence",
    "best free AI tools 2024",
    "AI tools list",
    "free AI writing tools",
    "free AI image generators",
    "AI tools for students",
  ],
  authors: [{ name: "FreeAIHub Team" }],
  creator: "FreeAIHub",
  publisher: "FreeAIHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freeaihub.io",
    siteName: "FreeAIHub",
    title: "FreeAIHub — 1000+ Free AI Tools Directory",
    description:
      "Discover 1000+ free AI tools across 40 categories. All tools verified free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreeAIHub — Free AI Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FreeAIHub",
    creator: "@FreeAIHub",
    title: "FreeAIHub — 1000+ Free AI Tools Directory",
    description: "Discover 1000+ free AI tools across 40 categories.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a8a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FreeAIHub",
  url: "https://freeaihub.io",
  description: "Discover 1000+ free AI tools across 40 categories",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://freeaihub.io/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FreeAIHub",
  url: "https://freeaihub.io",
  logo: "https://freeaihub.io/logo.png",
  sameAs: [
    "https://twitter.com/FreeAIHub",
    "https://linkedin.com/company/freeaihub",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
