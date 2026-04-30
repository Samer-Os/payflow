import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
const dmsans = DM_Sans({ subsets: ["latin"] });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://payflow.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Payflow — Payment Infrastructure for Developers",
  description:
    "Embed powerful payment APIs into your product. Build in days, launch in weeks.",
  keywords: [
    "payments",
    "fintech",
    "payment API",
    "developer tools",
    "Next.js",
    "Stripe alternative",
  ],
  authors: [{ name: "Samer" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Payflow — Payment Infrastructure for Developers",
    description:
      "Embed powerful payment APIs into your product. Build in days, launch in weeks.",
    siteName: "Payflow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Payflow — Payment Infrastructure for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payflow — Payment Infrastructure for Developers",
    description:
      "Embed powerful payment APIs into your product. Build in days, launch in weeks.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${dmsans.className}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        >
          Skip to content
        </a>
        <AuthDialogProvider>
          <LanguageProvider>
            <SessionProviderComp>
              <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="light"
              >
                <Header />
                <main id="main">
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
              </ThemeProvider>
            </SessionProviderComp>
          </LanguageProvider>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
