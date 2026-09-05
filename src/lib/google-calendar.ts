import { BOOKING_TIMEZONE, MEETING_MINUTES, toInstant } from "./booking";
import { bookingHosts } from "./content";

/**
 * Google Calendar over plain REST. Server-only: it reads secrets from the
 * environment, so it must never be imported by a client component.
 *
 * Deliberately not using `googleapis`: this needs three endpoints, and the SDK
 * would be by far the largest dependency in the project.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://www.googleapis.com/calendar/v3";

export type Busy = { start: string; end: string };

export function bookingConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.BOOKING_CALENDAR_ID || "primary";
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken, calendarId };
}

export const isConfigured = () => bookingConfig() !== null;

/* Access tokens last an hour; refreshing on every request would add a round
   trip to each one, so it is cached until shortly before it expires. */
let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  const config = bookingConfig();
  if (!config) throw new Error("Booking is not configured");
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const data = (await res.json()) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token refresh failed: ${data.error ?? res.status}`);
  }

  cached = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cached.token;
}

/** Busy intervals on the booking calendar between two instants. */
export async function busyIntervals(timeMin: Date, timeMax: Date): Promise<Busy[]> {
  const config = bookingConfig();
  if (!config) throw new Error("Booking is not configured");

  const res = await fetch(`${API}/freeBusy`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: BOOKING_TIMEZONE,
      items: [{ id: config.calendarId }],
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`freeBusy failed: ${res.status}`);
  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: Busy[]; errors?: { reason: string }[] }>;
  };

  const calendar = data.calendars?.[config.calendarId];
  if (calendar?.errors?.length) {
    throw new Error(`freeBusy: ${calendar.errors.map((e) => e.reason).join(", ")}`);
  }
  return calendar?.busy ?? [];
}

/** True when nothing on the calendar overlaps the slot. */
export function slotIsFree(dateISO: string, time: string, busy: Busy[]): boolean {
  const start = toInstant(dateISO, time).getTime();
  const end = start + MEETING_MINUTES * 60_000;
  return !busy.some((b) => {
    const bStart = new Date(b.start).getTime();
    const bEnd = new Date(b.end).getTime();
    return bStart < end && bEnd > start;
  });
}

export type CreatedEvent = { htmlLink?: string; meetLink?: string };

export async function createBooking(input: {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  requirements: string;
}): Promise<CreatedEvent> {
  const config = bookingConfig();
  if (!config) throw new Error("Booking is not configured");

  const endMinutes =
    Number(input.time.slice(0, 2)) * 60 + Number(input.time.slice(3, 5)) + MEETING_MINUTES;
  const end = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(
    endMinutes % 60,
  ).padStart(2, "0")}`;

  const summary = input.company
    ? `DEPLOY scoping call - ${input.name} (${input.company})`
    : `DEPLOY scoping call - ${input.name}`;

  const body = {
    summary,
    description: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Company: ${input.company}`,
      `Job Title: ${input.jobTitle}`,
      `Phone: ${input.phone}`,
      "",
      "What they want to fix:",
      input.requirements,
      "",
      "Booked from the DEPLOY site.",
    ].join("\n"),
    start: { dateTime: `${input.date}T${input.time}:00`, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: `${input.date}T${end}:00`, timeZone: BOOKING_TIMEZONE },
    /* our side is always on the invite; dedupe in case someone books with an
       address that is already a host */
    attendees: [
      { email: input.email, displayName: input.name },
      ...bookingHosts
        .filter((email) => email.toLowerCase() !== input.email.toLowerCase())
        .map((email) => ({ email })),
    ],
    /* requestId only has to be unique per request — the slot already is */
    conferenceData: {
      createRequest: {
        requestId: `deploy-${input.date}-${input.time.replace(":", "")}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: { useDefault: true },
  };

  const url =
    `${API}/calendars/${encodeURIComponent(config.calendarId)}/events` +
    `?sendUpdates=all&conferenceDataVersion=1`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json()) as {
    htmlLink?: string;
    hangoutLink?: string;
    error?: { message?: string };
  };
  if (!res.ok) throw new Error(`Event insert failed: ${data.error?.message ?? res.status}`);

  return { htmlLink: data.htmlLink, meetLink: data.hangoutLink };
}
