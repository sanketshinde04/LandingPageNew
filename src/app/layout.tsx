import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import { site } from "@/lib/content";

/* Headings are set in Schibsted Grotesk. The file ships inside the fontsource
   package, so nothing is fetched at build time. */
const heading = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

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
      className={`${GeistSans.variable} ${GeistMono.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="grain vignette min-h-full bg-base text-white">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
