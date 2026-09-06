import type { Metadata } from "next";
import BookingDialog from "@/components/BookingDialog";
import { MEETING_MINUTES, WINDOW_LABEL } from "@/lib/booking";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Book an AI audit — ${site.name}`,
  description: `A ${MEETING_MINUTES}-minute scoping call on Google Meet. Weekdays, ${WINDOW_LABEL} India time — pick a slot and the invite lands in your inbox.`,
  openGraph: {
    title: `Book an AI audit — ${site.name}`,
    description: `A ${MEETING_MINUTES}-minute scoping call on Google Meet. Pick a slot and the invite lands in your inbox.`,
    type: "website",
  },
};

/**
 * The booking panel as its own shareable URL. Same component as the CTA
 * dialog, rendered inline instead of over an overlay, so a link to /audit is
 * the whole flow with nothing to click first.
 */
export default function AuditPage() {
  return (
    <main id="top" className="min-h-svh">
      <BookingDialog variant="page" />
    </main>
  );
}
