import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Preloader } from "@/components/layout/preloader";
import { Navbar } from "@/components/layout/navbar";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const [dictionary, contents, shared] = await Promise.all([
    getDictionary(lang),
    getContents(lang),
    getSharedData(),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}
        suppressHydrationWarning
      >
        <LanguageProvider
          lang={lang}
          dictionary={dictionary}
          contents={contents}
          shared={shared}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <Preloader />
            <SmoothScroll>
              <Navbar />
              <main className="relative bg-background text-foreground min-h-screen">
                {children}
              </main>
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}