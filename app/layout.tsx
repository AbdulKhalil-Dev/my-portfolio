import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Abdul Khalil | Portfolio",
  description: "Frontend Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}