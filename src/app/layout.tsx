import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SiteContainer } from "@/components/layout/site-container";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gadget Store",
  description: "A modern gadget store built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} antialiased`}>
      <body className="min-h-screen bg-background text-white">
        <AppProviders>
          <div className="flex min-h-screen flex-col bg-[#080616] text-white">
            <Navbar />
            <main className="flex-1">
              <SiteContainer>{children}</SiteContainer>
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
