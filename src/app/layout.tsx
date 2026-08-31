import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="grain vignette min-h-full bg-base text-white">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
