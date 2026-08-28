import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdulkhalil.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdul Khalil | Creative Frontend Developer & UI Engineer",
    template: "%s | Abdul Khalil",
  },
  description:
    "Portfolio of Abdul Khalil, a Creative Frontend Web Developer specializing in Next.js, React, TypeScript, Tailwind CSS, and smooth interactive web experiences.",
  keywords: [
    "Abdul Khalil",
    "AbdulKhalil-Dev",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Engineer",
    "Web Developer Portfolio",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript Developer",
  ],
  authors: [{ name: "Abdul Khalil", url: siteUrl }],
  creator: "Abdul Khalil",
  publisher: "Abdul Khalil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Abdul Khalil | Creative Frontend Developer & UI Engineer",
    description:
      "Portfolio of Abdul Khalil, a Creative Frontend Web Developer specializing in Next.js, React, TypeScript, and Tailwind CSS.",
    siteName: "Abdul Khalil Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdul Khalil - Creative Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Khalil | Creative Frontend Developer",
    description:
      "Portfolio of Abdul Khalil, a Creative Frontend Web Developer specializing in Next.js, React, and Tailwind CSS.",
    creator: "@AbdulKhalilDev",
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
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
        className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
