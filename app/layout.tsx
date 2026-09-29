import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  metadataBase: new URL("https://ashish-borchate.netlify.app"),
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: "website",
    images: [{ url: "/assets/og-preview.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: ["/assets/og-preview.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-primary">
        <div className="grain" aria-hidden />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
