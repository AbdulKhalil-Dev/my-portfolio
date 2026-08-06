import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "@/app/globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://abdulkhalil.dev"
  ),
  title: {
    default: "Abdul Khalil | Creative Frontend Developer & UI Engineer",
    template: "%s | Abdul Khalil",
  },
  description:
    "Portfolio of Abdul Khalil, a Frontend Web Developer specializing in Next.js, React, Tailwind CSS, and interactive modern web experiences.",
  keywords: [
    "Abdul Khalil",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Engineer",
    "Portfolio",
    "Web Developer",
    "Tailwind CSS",
  ],
  authors: [{ name: "Abdul Khalil" }],
  creator: "Abdul Khalil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Abdul Khalil | Creative Frontend Developer & UI Engineer",
    description:
      "Portfolio of Abdul Khalil, a Frontend Web Developer specializing in Next.js, React, Tailwind CSS, and interactive modern web experiences.",
    siteName: "Abdul Khalil Portfolio",
    images: [
      {
        url: "/og-image.png", // Public folder me og-image.png add karein
        width: 1200,
        height: 630,
        alt: "Abdul Khalil Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Khalil | Creative Frontend Developer",
    description:
      "Portfolio of Abdul Khalil, a Frontend Web Developer specializing in Next.js, React, and Tailwind CSS.",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} font-sans bg-background`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}