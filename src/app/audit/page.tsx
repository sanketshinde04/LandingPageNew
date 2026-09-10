import type { Metadata } from "next";
import BookingDialog from "@/components/BookingDialog";
import { MEETING_MINUTES, WINDOW_LABEL } from "@/lib/booking";
import { site } from "@/lib/content";
import {
  siteConfig,
  generateServiceSchema,
  generateBreadcrumbSchema,
  getCanonicalUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `Book an AI Scoping Call | ${site.name}`,
  description: `A ${MEETING_MINUTES}-minute scoping call on Google Meet. Weekdays, ${WINDOW_LABEL} India time - pick a slot and the invite lands in your inbox.`,
  alternates: {
    canonical: "/audit",
  },
  openGraph: {
    title: `Book an AI Scoping Call | ${site.name}`,
    description: `A ${MEETING_MINUTES}-minute scoping call on Google Meet. Pick a slot and the invite lands in your inbox.`,
    url: getCanonicalUrl("/audit"),
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Book an AI Scoping Call | Build Fast with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Book an AI Scoping Call | ${site.name}`,
    description: `A ${MEETING_MINUTES}-minute scoping call on Google Meet. Pick a slot and the invite lands in your inbox.`,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
};

/**
 * The booking panel as its own shareable URL. Same component as the CTA
 * dialog, rendered inline instead of over an overlay, so a link to /audit is
 * the whole flow with nothing to click first.
 */
export default function AuditPage() {
  const serviceSchema = generateServiceSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Book Scoping Call", url: "/audit" },
  ]);

  return (
    <main id="top" className="min-h-svh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <BookingDialog variant="page" />
    </main>
  );
}
