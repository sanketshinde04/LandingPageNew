"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BOOKING_TIMEZONE,
  type BookingInput,
  type FieldErrors,
  type FieldName,
  MEETING_MINUTES,
  REQUIREMENTS_MAX,
  type Slot,
  WINDOW_LABEL,
  bookableDates,
  dateParts,
  fieldErrors,
  relativeDayLabel,
  slotRangeLabel,
  toInstant,
} from "@/lib/booking";
import { site } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** the trigger takes the caller's own button classes, so this drops into any section */
  triggerClassName?: string;
  label?: string;
  /** "page" drops the trigger and the overlay and renders the panel inline - /audit */
  variant?: "dialog" | "page";
};

type Stage = "pick" | "details" | "done";
type Form = Pick<
  BookingInput,
  "name" | "email" | "company" | "jobTitle" | "phone" | "requirements"
>;

const EMPTY: Form = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  phone: "",
  requirements: "",
};

const FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Priya Sharma",
    half: true,
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
    placeholder: "priya@company.com",
    half: true,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
    placeholder: "Acme Corp",
    half: true,
  },
  {
    name: "jobTitle",
    label: "Job title",
    type: "text",
    autoComplete: "organization-title",
    placeholder: "Head of Engineering",
    half: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+91 98765 43210",
    half: false,
  },
] as const;

/** "Asia/Kolkata" -> "Kolkata" */
const ZONE_CITY = BOOKING_TIMEZONE.split("/").pop()!.replace(/_/g, " ");

/** what the left rail promises — the reason the call is worth thirty minutes */
const RAIL_FACTS = [
  { k: "Format", v: "Google Meet, link in the invite" },
  { k: "When", v: `Weekdays, ${WINDOW_LABEL} ${ZONE_CITY} time` },
  { k: "Bring", v: "One workflow that costs you hours" },
];

/** what the CTA falls back to when the calendar credentials are not set */
const FALLBACK_HREF = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
  "Scoping call: DEPLOY"
)}&body=${encodeURIComponent(
  "Company:\nRole:\nThe workflow we want to fix:\n\nTwo or three times that work for you:"
)}`;

const inputClass = (bad: boolean) =>
  `w-full border bg-base px-3.5 py-2 text-[14px] text-bone outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-accent sm:py-2.5 sm:text-[14.5px] ${
    bad ? "border-red-400/55" : "hairline hover:border-[rgba(151,163,201,0.35)]"
  }`;

/**
 * The booking flow: pick a day, pick a free slot, leave your details. It writes
 * straight into the calendar through /api/booking and the visitor gets the
 * invite with a Meet link. If the credentials are missing the dialog says so
 * and hands over a mailto, so the button is never a dead end.
 *
 * Laid out as two panes: a fixed rail on the left carrying what the call
 * actually is, and the step on the right. The rail is what stops the panel
 * reading as an empty box while the picker is only six buttons tall.
 */
export default function BookingDialog({
  triggerClassName,
  label = "Book a call",
  variant = "dialog",
}: Props) {
  const isPage = variant === "page";
  // on the page the panel *is* the page, so it starts open and never closes
  const [open, setOpen] = useState(isPage);
  const [dates] = useState(() => bookableDates());
  const [date, setDate] = useState(() => bookableDates()[0] ?? "");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [time, setTime] = useState("");
  const [stage, setStage] = useState<Stage>("pick");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* Sections on this page carry reveal transforms, and a transformed ancestor
     becomes the containing block for position:fixed — which would pin the
     overlay to the section instead of the viewport. Portal to <body>. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /** the same rules the route applies, so nothing passes here and fails there */
  const errors: FieldErrors = useMemo(() => fieldErrors(form), [form]);
  const showError = (field: FieldName) =>
    touched[field] ? errors[field] : undefined;

  const loadSlots = useCallback(async (which: string) => {
    setLoading(true);
    setFormError("");
    setSlots(null);
    // re-check every time: a missing-credentials answer must not stick
    setUnavailable(false);
    try {
      const res = await fetch(`/api/booking/slots?date=${which}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load times");
      if (data.configured === false) {
        setUnavailable(true);
        return;
      }
      setSlots(data.slots as Slot[]);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Could not load times");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void loadSlots(date);
  }, [open, date, loadSlots]);

  // an open dialog owns the screen - the page variant owns nothing
  useEffect(() => {
    if (!open || isPage) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, isPage]);

  const start = () => {
    setStage("pick");
    setTime("");
    setFormError("");
    setMeetLink(null);
    setForm(EMPTY);
    setTouched({});
    setOpen(true);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    // show every message at once rather than one at a time, then jump to the first
    if (Object.keys(errors).length) {
      setTouched({
        name: true,
        email: true,
        company: true,
        jobTitle: true,
        phone: true,
        requirements: true,
      });
      const first = (
        ["name", "email", "company", "jobTitle", "phone", "requirements"] as FieldName[]
      ).find((f) => errors[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSending(true);
    setFormError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ date, time, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        // 409 means the slot went while they were typing — send them back
        if (res.status === 409) {
          setStage("pick");
          void loadSlots(date);
        }
        throw new Error(data.error ?? "Could not book that slot");
      }
      setMeetLink(data.meetLink ?? null);
      setStage("done");
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Could not book that slot");
    } finally {
      setSending(false);
    }
  };

  const chosenDay = date ? dateParts(date) : null;
  const chosen =
    date && time
      ? `${relativeDayLabel(date) ?? chosenDay!.weekday} ${chosenDay!.day} ${
          chosenDay!.month
        } · ${slotRangeLabel(time)}`
      : "";

  const freeCount = slots?.filter((s) => s.available).length ?? 0;

  const heading = unavailable
    ? "Booking is not live yet"
    : stage === "done"
      ? "You are booked"
      : stage === "pick"
        ? "Pick a time"
        : "Your details";

  /* On the page the panel is the whole screen on a phone - full-bleed, no
     rounding, no card edge - and only becomes a floating card from sm: up.
     As a dialog it stays a bottom sheet on mobile. */
  const panelClass = isPage
    ? "relative z-10 grid h-[100svh] w-full bg-base outline-none sm:h-[84svh] sm:max-h-[600px] sm:max-w-[880px] hairline sm:border sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
    : "relative z-10 grid h-[92svh] max-h-[640px] w-full max-w-[880px] rounded-t-[18px] border hairline bg-base shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] outline-none sm:h-[84svh] sm:max-h-[600px] sm:rounded-none md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]";

  /* The panel itself — identical in the dialog and on the shareable /audit page,
     so the two can never drift apart. */
  const panel = (
                <motion.div
                  ref={panelRef}
                  data-lenis-prevent
                  role="dialog"
                  aria-modal="true"
                  aria-label="Book a scoping call"
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 26, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.985 }}
                  transition={{ duration: 0.34, ease }}
                  className={panelClass}
                >
                  {/* corner ticks, the same drafting frame as the page */}
                  <span className="cross -left-[6px] -top-[6px] hidden sm:block" aria-hidden="true" />
                  <span className="cross -right-[6px] -top-[6px] hidden sm:block" aria-hidden="true" />
                  <span className="cross -bottom-[6px] -left-[6px] hidden sm:block" aria-hidden="true" />
                  <span className="cross -bottom-[6px] -right-[6px] hidden sm:block" aria-hidden="true" />

                  {/* ---------- left rail: what the call actually is ---------- */}
                  <aside className="relative hidden flex-col justify-between overflow-hidden border-r hairline bg-surface/40 p-8 md:flex">
                    <div>
                      <span className="hero-eyebrow">
                        <span className="hero-eyebrow-dot" aria-hidden="true" />
                        <span>Scoping call</span>
                      </span>
                      <p className="mt-6 text-[2.8rem] font-semibold leading-none tracking-[-0.04em] text-bone">
                        {MEETING_MINUTES}
                        <span className="ml-2 font-mono text-[12px] font-normal uppercase tracking-[0.18em] text-white/40">
                          min
                        </span>
                      </p>

                      <dl className="mt-8 border-t hairline">
                        {RAIL_FACTS.map((fact) => (
                          <div key={fact.k} className="border-b hairline py-3.5">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                              {fact.k}
                            </dt>
                            <dd className="mt-1.5 text-[13.5px] leading-snug text-bone/85">
                              {fact.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-10 flex items-baseline gap-2.5">
                      <span className="flex items-baseline text-lg font-semibold leading-none tracking-[-0.045em] text-bone">
                        deploy
                        <span className="hero-stop" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                        by {site.name}
                      </span>
                    </div>
                  </aside>

                  {/* ---------- right pane: the step ---------- */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden">
                    {!unavailable && stage !== "done" && (
                      <div className="shrink-0 px-6 pt-6 sm:px-7" aria-hidden>
                        <div className="flex h-[2px] gap-2">
                          <span className="flex-1 bg-accent" />
                          <span
                            className={`flex-1 transition-colors duration-500 ${
                              stage === "details" ? "bg-accent" : "bg-[rgba(151,163,201,0.16)]"
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    <header className="flex shrink-0 items-center justify-between gap-4 border-b hairline px-6 py-5 sm:px-7">
                      <div className="min-w-0">
                        <h2 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-bone">
                          {heading}
                        </h2>
                        {!unavailable && stage !== "pick" && chosen && (
                          <p className="mt-1.5 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                            {chosen}
                          </p>
                        )}
                        {!unavailable && stage === "pick" && (
                          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                            All times {ZONE_CITY}
                          </p>
                        )}
                        {isPage && !unavailable && stage === "pick" && (
                          <p className="mt-1.5 text-[12.5px] leading-snug text-white/45 md:hidden">
                            {MEETING_MINUTES} min on Google Meet · weekdays,{" "}
                            {WINDOW_LABEL}
                          </p>
                        )}
                      </div>

                      {!isPage && (
                      <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setOpen(false)}
                        className="grid h-9 w-9 shrink-0 place-items-center border hairline text-white/55 transition-colors hover:border-accent hover:text-accent"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M1 1l9 9M10 1l-9 9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      )}
                    </header>

                    {unavailable ? (
                      <div className="min-h-0 overflow-y-auto px-6 py-7 sm:px-7">
                        <p className="text-[15px] leading-[1.6] text-[#9a9eac]">
                          The calendar is not connected yet. Email us and we
                          will send times back the same day.
                        </p>
                        <a
                          className="btn btn-solid mt-6 w-full"
                          href={FALLBACK_HREF}
                        >
                          Email {site.contactEmail}
                        </a>
                      </div>
                    ) : stage === "done" ? (
                      <div className="min-h-0 overflow-y-auto px-6 py-8 sm:px-7">
                        <div
                          className="grid h-12 w-12 place-items-center border border-accent/50 font-mono text-xl text-accent"
                          aria-hidden
                        >
                          ✓
                        </div>
                        <p className="mt-5 text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-bone">
                          {chosen}
                        </p>
                        <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.6] text-[#9a9eac]">
                          A calendar invite is on its way to{" "}
                          <b className="font-medium text-bone">
                            {form.email}
                          </b>
                          . Reply to it if you need to move the time.
                        </p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                          {meetLink && (
                            <a
                              className="btn btn-solid"
                              href={meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open the Meet link
                            </a>
                          )}
                          {isPage ? (
                            <Link className="btn btn-outline" href="/">
                              Back to the site
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="btn btn-outline"
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    ) : stage === "pick" ? (
                      <div
                        data-lenis-prevent
                        className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-7 overscroll-contain"
                      >
                        {/* Keep the full weekday range balanced instead of
                            letting the browser create an uneven final row. */}
                        <div
                          className="grid grid-cols-4 gap-2 sm:grid-cols-5"
                          role="group"
                          aria-label="Choose a day"
                        >
                          {dates.map((value) => {
                            const part = dateParts(value);
                            const relative = relativeDayLabel(value);
                            const on = value === date;
                            return (
                              <button
                                key={value}
                                type="button"
                                aria-pressed={on}
                                onClick={() => {
                                  setDate(value);
                                  setTime("");
                                }}
                                className={`flex w-full min-w-0 flex-col items-center gap-1 border px-2 py-2.5 transition-colors duration-200 ${
                                  on
                                    ? "border-accent bg-surface text-bone"
                                    : "hairline text-white/60 hover:bg-surface/60 hover:text-bone"
                                }`}
                                >
                                  <span
                                    className={`font-mono text-[8.5px] uppercase tracking-[0.14em] ${
                                      on ? "text-accent" : "text-white/40"
                                    }`}
                                  >
                                    {relative ?? part.weekday}
                                  </span>
                                  <b className="text-[1.1rem] font-semibold leading-none tracking-[-0.02em]">
                                    {part.day}
                                  </b>
                                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/40">
                                    {part.month}
                                  </span>
                              </button>
                            );
                          })}
                        </div>

                        {loading && (
                          <div
                            className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                            aria-hidden
                          >
                            {Array.from({ length: 6 }, (_, i) => (
                              <div
                                key={i}
                                className="h-[46px] animate-pulse bg-surface/60"
                              />
                            ))}
                          </div>
                        )}

                        {!loading && slots && freeCount > 0 && (
                          <>
                            <div className="mt-7 flex items-baseline justify-between border-t hairline pt-5 font-mono text-[10px] uppercase tracking-[0.18em]">
                              <span className="text-white/40">
                                Start time
                              </span>
                              <span className="text-accent">
                                {freeCount} free
                              </span>
                            </div>
                            <div
                              className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                              role="group"
                              aria-label="Choose a time"
                            >
                              {slots.map((slot) => {
                                // the API reports only availability, so say *why* it is gone
                                const past =
                                  toInstant(date, slot.time).getTime() <
                                  Date.now();
                                return (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    disabled={!slot.available}
                                    title={
                                      slot.available
                                        ? slotRangeLabel(slot.time)
                                        : past
                                          ? "That time has passed"
                                          : "Already booked"
                                    }
                                    onClick={() => {
                                      setTime(slot.time);
                                      setStage("details");
                                    }}
                                    className="border hairline py-3 text-[14px] tabular-nums text-bone/85 transition-colors duration-200 hover:border-accent hover:bg-surface hover:text-bone disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface/30 disabled:text-white/20 disabled:line-through"
                                  >
                                    {slot.label}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}

                        {!loading && slots && freeCount === 0 && (
                          <div className="mt-7 border-t hairline pt-7 text-center">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                              Fully booked
                            </p>
                            <p className="mx-auto mt-2.5 max-w-[34ch] text-[14px] leading-[1.6] text-[#9a9eac]">
                              Nothing free on this day. Try another from the
                              strip above.
                            </p>
                          </div>
                        )}

                        {formError && (
                          <p
                            className="mt-5 text-[13px] text-red-300"
                            role="alert"
                          >
                            {formError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <form
                        data-lenis-prevent
                        className="flex h-full min-h-0 flex-col overflow-hidden"
                        onSubmit={submit}
                        ref={formRef}
                        noValidate
                      >
                        <div
                          data-lenis-prevent
                          className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-7 overscroll-contain"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setStage("pick");
                              setTime("");
                              setFormError("");
                            }}
                            className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-accent"
                          >
                            ← Pick a different time
                          </button>

                          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {FIELDS.map((field) => {
                            const message = showError(field.name);
                            return (
                              <label
                                className={`block ${field.half ? "sm:col-span-1" : "sm:col-span-2"}`}
                                key={field.name}
                              >
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                                  {field.label}
                                </span>
                                <input
                                  name={field.name}
                                  type={field.type}
                                  autoComplete={field.autoComplete}
                                  placeholder={field.placeholder}
                                  value={form[field.name]}
                                  aria-invalid={message ? true : undefined}
                                  className={`mt-2 ${inputClass(!!message)}`}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      [field.name]: e.target.value,
                                    })
                                  }
                                  onBlur={() =>
                                    setTouched((t) => ({
                                      ...t,
                                      [field.name]: true,
                                    }))
                                  }
                                />
                                {message && (
                                  <span className="mt-1.5 block text-[12px] text-red-300">
                                    {message}
                                  </span>
                                )}
                              </label>
                            );
                          })}

                          <label className="block sm:col-span-2">
                            <span className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                              What do you want to fix?
                              <i className="not-italic text-white/25">
                                {form.requirements.length}/{REQUIREMENTS_MAX}
                              </i>
                            </span>
                            <textarea
                              name="requirements"
                              rows={2}
                              maxLength={REQUIREMENTS_MAX}
                              placeholder="One workflow, in a sentence or two. What happens today, and what should happen instead."
                              value={form.requirements}
                              aria-invalid={
                                showError("requirements") ? true : undefined
                              }
                              className={`mt-2 resize-none ${inputClass(
                                !!showError("requirements")
                              )}`}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  requirements: e.target.value,
                                })
                              }
                              onBlur={() =>
                                setTouched((t) => ({
                                  ...t,
                                  requirements: true,
                                }))
                              }
                            />
                            {showError("requirements") && (
                              <span className="mt-1.5 block text-[12px] text-red-300">
                                {showError("requirements")}
                              </span>
                            )}
                          </label>
                        </div>

                          {formError && (
                            <p
                              className="mt-4 text-[13px] text-red-300"
                              role="alert"
                            >
                              {formError}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 border-t hairline bg-surface/40 px-6 py-4 sm:px-7">
                          <button
                            className="btn btn-solid w-full"
                            type="submit"
                            disabled={sending}
                          >
                            {sending ? "Booking…" : "Confirm booking"}
                          </button>
                          <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                            You get a calendar invite with a Meet link. No
                            newsletter, no follow-up sequence.
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
  );

  if (isPage) {
    return (
      <div className="grid min-h-svh w-full place-items-center sm:px-6 sm:py-10">
        {panel}
      </div>
    );
  }

  return (
    <>
      <button className={`booking-trigger ${triggerClassName ?? ""}`} type="button" onClick={start}>
        <span className="inline-flex items-center gap-2">
          {label}
        </span>
        <span aria-hidden>→</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-[#03060d]/80 backdrop-blur-md"
                />

                {panel}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
