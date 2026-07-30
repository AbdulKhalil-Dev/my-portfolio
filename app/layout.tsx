import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Abdul Khalil | Portfolio",
  description: "Frontend Developer Portfolio",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}>) {
  // Extract language or fallback to 'en'
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}