import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import ScrollToTop from "@/components/ScrollToTop";
const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Payflow — Payment Infrastructure for Developers",
  description: "Embed powerful payment APIs into your product. Build in days, launch in weeks.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmsans.className}`}>
        <AuthDialogProvider>
          <SessionProviderComp session={session}>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
