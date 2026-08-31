import { NextResponse } from "next/server";
import { MEETING_MINUTES, toInstant, validateBooking } from "@/lib/booking";
import { busyIntervals, createBooking, isConfigured, slotIsFree } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Booking is not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = validateBooking(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { value } = parsed;
  const start = toInstant(value.date, value.time);
  const end = new Date(start.getTime() + MEETING_MINUTES * 60_000);

  try {
    /* Re-check immediately before writing. The picker's view can be minutes
       old, and the calendar is the only source of truth. */
    const busy = await busyIntervals(start, end);
    if (!slotIsFree(value.date, value.time, busy)) {
      return NextResponse.json(
        { error: "That slot was taken while you were filling this in. Pick another." },
        { status: 409 },
      );
    }

    const event = await createBooking(value);
    return NextResponse.json({
      ok: true,
      start: start.toISOString(),
      meetLink: event.meetLink ?? null,
    });
  } catch (error) {
    console.error("[deploy] booking", error);
    return NextResponse.json({ error: "Could not create the booking" }, { status: 502 });
  }
}
