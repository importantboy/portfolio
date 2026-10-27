import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./styles/globals.css";
import "./styles/engagement.css";
import { Header, Footer } from "@/components/portfolio/shell";
import { MotionProvider } from "@/components/portfolio/motion";
import { ScrollTools } from "@/components/portfolio/scroll-tools";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: { default: "Rahul Kumar — Full-stack Developer", template: "%s — Rahul Kumar" },
  description: "Thoughtful code. Real-world impact. Explore Rahul Kumar’s web applications, backend projects, and open-source work with React, Next.js, Node.js, and MongoDB.",
  metadataBase: new URL(profile.website),
  openGraph: { type: "website", locale: "en_US", siteName: "Rahul Kumar", title: "Rahul Kumar — Full-stack Developer", description: profile.description },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><MotionProvider><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /><ScrollTools /></MotionProvider></body></html>;
}
