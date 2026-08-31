import { NextResponse } from "next/server";
import {
  BOOKING_TIMEZONE,
  MEETING_MINUTES,
  isBookableDate,
  slotLabel,
  slotTimes,
  toInstant,
} from "@/lib/booking";
import { busyIntervals, isConfigured, slotIsFree } from "@/lib/google-calendar";

export const runtime = "nodejs";
/** Availability changes by the minute — never cache it. */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";

  if (!isBookableDate(date)) {
    return NextResponse.json({ error: "Unknown date" }, { status: 400 });
  }

  const times = slotTimes();

  if (!isConfigured()) {
    return NextResponse.json({
      configured: false,
      timeZone: BOOKING_TIMEZONE,
      date,
      slots: [],
    });
  }

  const dayStart = toInstant(date, times[0]);
  const dayEnd = new Date(
    toInstant(date, times[times.length - 1]).getTime() + MEETING_MINUTES * 60_000,
  );

  try {
    const busy = await busyIntervals(dayStart, dayEnd);
    const now = Date.now();

    const slots = times.map((time) => ({
      time,
      label: slotLabel(time),
      // a slot in the past is as unavailable as a booked one
      available: toInstant(date, time).getTime() > now && slotIsFree(date, time, busy),
    }));

    return NextResponse.json({ configured: true, timeZone: BOOKING_TIMEZONE, date, slots });
  } catch (error) {
    console.error("[deploy] slots", error);
    return NextResponse.json({ error: "Could not read the calendar" }, { status: 502 });
  }
}
