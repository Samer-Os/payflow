import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samer-os-payflow.netlify.app";

const ANTI_FOUC_SCRIPT = `(function(){var s=localStorage.getItem('theme');var t=s==='dark'||s==='light'?s:'light';document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Payflow",
    default: "Payflow — Payment Infrastructure for Developers",
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={dmsans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }} />
      </head>
      <body className={dmsans.className}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        >
          Skip to content
        </a>
        <AuthDialogProvider>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
              disableTransitionOnChange
            >
              <Header />
              <main id="main">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </LanguageProvider>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
