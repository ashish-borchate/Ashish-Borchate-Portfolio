import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  metadataBase: new URL("https://ashish-borchate.netlify.app"),
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: "website",
    images: [{ url: "/assets/og-preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: ["/assets/og-preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="grain" aria-hidden />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
