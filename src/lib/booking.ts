/**
 * Booking window and slot maths, shared by the client dialog and both API
 * routes so the two can never disagree about what a valid slot is.
 *
 * No secrets here — this file is imported by the browser.
 */

/** The business timezone. Slots are always 2-5pm *here*, whatever the visitor's clock says. */
export const BOOKING_TIMEZONE = "Asia/Kolkata";

/** 14:00-17:00, in 30-minute steps, meetings 30 minutes long. */
export const WINDOW_START_HOUR = 14;
export const WINDOW_END_HOUR = 17;
export const SLOT_MINUTES = 30;
export const MEETING_MINUTES = 30;

/** How many working days ahead the picker offers. */
export const BOOKABLE_DAYS = 10;

export type Slot = { time: string; label: string; available: boolean };

/**
 * The UTC offset of `timeZone` at a given instant, as "+05:30".
 *
 * Intl is the only dependency-free way to get this, and it is DST-correct
 * because the offset is resolved for that specific instant rather than assumed.
 */
export function zoneOffset(instant: Date, timeZone: string = BOOKING_TIMEZONE): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(instant);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+00:00";
  const match = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  // bare "GMT" means UTC — the pattern only carries an offset when there is one
  return match ? `${match[1]}${match[2]}:${match[3]}` : "+00:00";
}

/**
 * Absolute instant for a local wall-clock time in the booking timezone.
 *
 * The offset is looked up from midday on the same date: near enough for any
 * zone, and exact for fixed-offset ones like IST. A DST transition landing
 * inside the 2-5pm window would be the one case worth revisiting.
 */
export function toInstant(dateISO: string, time: string, timeZone: string = BOOKING_TIMEZONE): Date {
  const offset = zoneOffset(new Date(`${dateISO}T12:00:00Z`), timeZone);
  return new Date(`${dateISO}T${time}:00${offset}`);
}

/** ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"] */
export function slotTimes(): string[] {
  const out: string[] = [];
  for (
    let minutes = WINDOW_START_HOUR * 60;
    minutes + MEETING_MINUTES <= WINDOW_END_HOUR * 60;
    minutes += SLOT_MINUTES
  ) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    out.push(`${h}:${m}`);
  }
  return out;
}

/** "3:00 - 3:30 pm" — the range reads better than a start time alone. */
export function slotRangeLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const endMinutes = h * 60 + m + MEETING_MINUTES;
  const end = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(
    endMinutes % 60,
  ).padStart(2, "0")}`;
  const start = slotLabel(time).replace(/ (am|pm)$/, "");
  return `${start} - ${slotLabel(end)}`;
}

export function slotLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Today's date in the booking timezone — en-CA formats as YYYY-MM-DD. */
export function todayInZone(timeZone: string = BOOKING_TIMEZONE): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * The next `count` weekdays, starting today. Anchored to midday UTC so adding
 * days can never skip or repeat one across a DST boundary.
 */
export function bookableDates(count: number = BOOKABLE_DAYS): string[] {
  const start = new Date(`${todayInZone()}T12:00:00Z`);
  const out: string[] = [];
  for (let i = 0; out.length < count && i < count * 3 + 10; i += 1) {
    const day = new Date(start.getTime() + i * 86_400_000);
    const weekday = day.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    out.push(day.toISOString().slice(0, 10));
  }
  return out;
}

/** Parts for the date strip, formatted in UTC so the visitor's zone cannot shift the day. */
export function dateParts(dateISO: string) {
  const d = new Date(`${dateISO}T12:00:00Z`);
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(d);
  return { weekday: fmt({ weekday: "short" }), day: fmt({ day: "numeric" }), month: fmt({ month: "short" }) };
}

/** "Today" and "Tomorrow" are easier to scan than a weekday name. */
export function relativeDayLabel(dateISO: string): string | null {
  const today = todayInZone();
  if (dateISO === today) return "Today";
  const tomorrow = new Date(new Date(`${today}T12:00:00Z`).getTime() + 86_400_000)
    .toISOString()
    .slice(0, 10);
  return dateISO === tomorrow ? "Tomorrow" : null;
}

export function isBookableDate(dateISO: string): boolean {
  return bookableDates().includes(dateISO);
}

export type BookingInput = {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  requirements: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Only the digits matter; formatting is the visitor's business. */
const phoneDigits = (value: string) => value.replace(/\D/g, "").length;

export const REQUIREMENTS_MIN = 12;
export const REQUIREMENTS_MAX = 600;

export type FieldName = "name" | "email" | "company" | "jobTitle" | "phone" | "requirements";
export type FieldErrors = Partial<Record<FieldName, string>>;

export function normalise(body: unknown): BookingInput {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  return {
    date: str(b.date, 10),
    time: str(b.time, 5),
    name: str(b.name, 120),
    email: str(b.email, 200),
    company: str(b.company, 120),
    jobTitle: str(b.jobTitle, 120),
    phone: str(b.phone, 32),
    requirements: str(b.requirements, REQUIREMENTS_MAX),
  };
}

/**
 * One rule set for the form and the route, so the inline message a visitor
 * sees is the same judgement the server will make.
 */
export function fieldErrors(input: Partial<BookingInput>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const company = (input.company ?? "").trim();
  const jobTitle = (input.jobTitle ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const requirements = (input.requirements ?? "").trim();

  if (!name) errors.name = "We need a name for the invite.";
  else if (name.length < 2) errors.name = "That looks too short.";

  if (!email) errors.email = "The invite goes here.";
  else if (!EMAIL.test(email)) errors.email = "Check the spelling - that is not a valid address.";

  if (!company) errors.company = "Tell us which company you're building for.";
  else if (company.length < 2) errors.company = "That looks too short.";

  if (!jobTitle) errors.jobTitle = "Your role or job title.";
  else if (jobTitle.length < 2) errors.jobTitle = "That looks too short.";

  if (!phone) errors.phone = "In case the call drops.";
  else if (phoneDigits(phone) < 7) errors.phone = "That is too short for a phone number.";
  else if (phoneDigits(phone) > 15) errors.phone = "That is too long for a phone number.";

  if (!requirements) errors.requirements = "One line is enough.";
  else if (requirements.length < REQUIREMENTS_MIN) {
    errors.requirements = `A little more detail - ${REQUIREMENTS_MIN - requirements.length} more characters.`;
  }

  return errors;
}

export function validateBooking(body: unknown):
  | { ok: true; value: BookingInput }
  | { ok: false; error: string } {
  const value = normalise(body);

  if (!isBookableDate(value.date)) return { ok: false, error: "Pick a date from the list." };
  if (!slotTimes().includes(value.time)) return { ok: false, error: "Pick a time from the list." };

  const errors = fieldErrors(value);
  const first = (["name", "email", "company", "jobTitle", "phone", "requirements"] as FieldName[]).find((f) => errors[f]);
  if (first) return { ok: false, error: errors[first] as string };

  if (toInstant(value.date, value.time).getTime() < Date.now()) {
    return { ok: false, error: "That slot has passed." };
  }

  return { ok: true, value };
}
