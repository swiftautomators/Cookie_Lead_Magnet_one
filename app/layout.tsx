import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cookie Profit Calculator | CookieCraft AI",
  description: "AI-powered pricing tool for cottage food cookie decorators.",
  openGraph: {
    title: "Cookie Profit Calculator | CookieCraft AI",
    description: "Stop guessing your prices. Get an accurate, AI-powered price analysis in 60 seconds.",
    url: "https://cookiecraft.ai",
    siteName: "CookieCraft AI",
    images: [
      {
        url: "/assets/images/og-image-a.png",
        width: 1200,
        height: 630,
        alt: "Cookie Profit Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Profit Calculator | CookieCraft AI",
    description: "Stop guessing your prices. Get an accurate, AI-powered price analysis in 60 seconds.",
    images: ["/assets/images/og-image-a.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
