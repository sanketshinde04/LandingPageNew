"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BOOKING_TIMEZONE,
  type BookingInput,
  type FieldErrors,
  type FieldName,
  MEETING_MINUTES,
  REQUIREMENTS_MAX,
  type Slot,
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
};

type Stage = "pick" | "details" | "done";
type Form = Pick<BookingInput, "name" | "email" | "phone" | "requirements">;

const EMPTY: Form = { name: "", email: "", phone: "", requirements: "" };

const FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Priya Sharma",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
    placeholder: "priya@company.com",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+91 98765 43210",
  },
] as const;

/** "Asia/Kolkata" -> "Kolkata" */
const ZONE_CITY = BOOKING_TIMEZONE.split("/").pop()!.replace(/_/g, " ");

/** what the CTA falls back to when the calendar credentials are not set */
const FALLBACK_HREF = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
  "Scoping call — DEPLOY"
)}&body=${encodeURIComponent(
  "Company:\nRole:\nThe workflow we want to fix:\n\nTwo or three times that work for you:"
)}`;

const inputClass = (bad: boolean) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-accent/60 focus:bg-white/[0.05] ${
    bad ? "border-red-400/60" : "border-white/12"
  }`;

/**
 * The booking flow: pick a day, pick a free slot, leave your details. It writes
 * straight into the calendar through /api/booking and the visitor gets the
 * invite with a Meet link. If the credentials are missing the dialog says so
 * and hands over a mailto, so the button is never a dead end.
 */
export default function BookingDialog({
  triggerClassName,
  label = "Book a 30-min call",
}: Props) {
  const [open, setOpen] = useState(false);
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

  // an open dialog owns the screen
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
      setTouched({ name: true, email: true, phone: true, requirements: true });
      const first = (
        ["name", "email", "phone", "requirements"] as FieldName[]
      ).find((f) => errors[f]);
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
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
        ? "Book a scoping call"
        : "Your details";

  return (
    <>
      <button className={triggerClassName} type="button" onClick={start}>
        {label} <span aria-hidden>→</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-[#03060d]/78 backdrop-blur-sm"
                />

                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Book a scoping call"
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 26, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.985 }}
                  transition={{ duration: 0.34, ease }}
                  className="glass relative z-10 flex max-h-[92svh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-[24px] outline-none sm:max-h-[88svh] sm:rounded-[24px]"
                >
                  {/* ---------- head ---------- */}
                  <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
                    <div>
                      {!unavailable && stage !== "done" && (
                        <div className="mb-3 flex gap-1.5" aria-hidden>
                          <span className="h-[3px] w-8 rounded-full bg-accent" />
                          <span
                            className={`h-[3px] w-8 rounded-full transition-colors duration-300 ${
                              stage === "details" ? "bg-accent" : "bg-white/15"
                            }`}
                          />
                        </div>
                      )}
                      <h2 className="text-[1.3rem] font-medium leading-tight tracking-tight text-white">
                        {heading}
                      </h2>
                      {!unavailable && stage === "pick" && (
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                          {MEETING_MINUTES} min · weekdays 2–5pm {ZONE_CITY} time
                        </p>
                      )}
                      {!unavailable && stage !== "pick" && chosen && (
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                          {chosen}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setOpen(false)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      ×
                    </button>
                  </header>

                  {/* ---------- body ---------- */}
                  {unavailable ? (
                    <div className="overflow-y-auto px-6 py-7 sm:px-8">
                      <p className="text-[15px] leading-relaxed text-white/65">
                        The calendar is not connected yet. Email us and we will
                        send times back the same day.
                      </p>
                      <a
                        className="btn btn-solid mt-6 w-full justify-center"
                        href={FALLBACK_HREF}
                      >
                        Email {site.contactEmail}
                      </a>
                    </div>
                  ) : stage === "done" ? (
                    <div className="overflow-y-auto px-6 py-8 text-center sm:px-8">
                      <div
                        className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent/10 text-2xl text-accent"
                        aria-hidden
                      >
                        ✓
                      </div>
                      <p className="mt-5 text-[1.05rem] font-medium text-white">
                        {chosen}
                      </p>
                      <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/60">
                        A calendar invite is on its way to{" "}
                        <b className="text-white/85">{form.email}</b>. Reply to
                        it if you need to move the time.
                      </p>
                      <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="btn btn-glass"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : stage === "pick" ? (
                    <div className="overflow-y-auto px-6 py-6 sm:px-8">
                      {/* the day strip */}
                      <div
                        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
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
                              className={`flex w-[68px] shrink-0 flex-col items-center gap-0.5 rounded-xl border px-2 py-3 transition-colors duration-200 ${
                                on
                                  ? "border-accent/60 bg-accent/[0.12] text-white"
                                  : "border-white/12 bg-white/[0.02] text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">
                                {relative ?? part.weekday}
                              </span>
                              <b className="text-[1.15rem] font-medium leading-none">
                                {part.day}
                              </b>
                              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">
                                {part.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {loading && (
                        <div
                          className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                          aria-hidden
                        >
                          {Array.from({ length: 6 }, (_, i) => (
                            <div
                              key={i}
                              className="h-11 animate-pulse rounded-xl bg-white/[0.05]"
                            />
                          ))}
                        </div>
                      )}

                      {!loading && slots && freeCount > 0 && (
                        <>
                          <div className="mt-7 flex items-baseline justify-between">
                            <span className="eyebrow !text-[10px]">
                              Start time
                            </span>
                            <span className="font-mono text-[11px] text-accent">
                              {freeCount} slot{freeCount === 1 ? "" : "s"} free
                            </span>
                          </div>
                          <div
                            className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
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
                                  className="rounded-xl border border-white/12 bg-white/[0.02] py-3 text-[14px] text-white/80 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/[0.08] hover:text-white disabled:cursor-not-allowed disabled:border-white/[0.06] disabled:bg-transparent disabled:text-white/20 disabled:line-through disabled:hover:border-white/[0.06] disabled:hover:bg-transparent"
                                >
                                  {slot.label}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}

                      {!loading && slots && freeCount === 0 && (
                        <p className="mt-7 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-5 text-center text-[14px] text-white/55">
                          Nothing free on this day. Try another from the strip
                          above.
                        </p>
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
                      className="overflow-y-auto px-6 py-6 sm:px-8"
                      onSubmit={submit}
                      ref={formRef}
                      noValidate
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setStage("pick");
                          setTime("");
                          setFormError("");
                        }}
                        className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-accent"
                      >
                        ← Pick a different time
                      </button>

                      <div className="mt-5 space-y-4">
                        {FIELDS.map((field) => {
                          const message = showError(field.name);
                          return (
                            <label className="block" key={field.name}>
                              <span className="eyebrow !text-[10px] !text-white/45">
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

                        <label className="block">
                          <span className="eyebrow !text-[10px] !text-white/45 flex items-baseline justify-between">
                            What do you want to fix?
                            <i className="font-mono not-italic text-white/30">
                              {form.requirements.length}/{REQUIREMENTS_MAX}
                            </i>
                          </span>
                          <textarea
                            name="requirements"
                            rows={3}
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
                              setForm({ ...form, requirements: e.target.value })
                            }
                            onBlur={() =>
                              setTouched((t) => ({ ...t, requirements: true }))
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
                        <p className="mt-5 text-[13px] text-red-300" role="alert">
                          {formError}
                        </p>
                      )}

                      <div className="mt-6 border-t border-white/10 pt-6">
                        <button
                          className="btn btn-solid w-full justify-center"
                          type="submit"
                          disabled={sending}
                        >
                          {sending ? "Booking…" : "Confirm booking"}
                        </button>
                        <p className="mt-3 text-center text-[12px] leading-relaxed text-white/40">
                          You will get a calendar invite with a Meet link. No
                          newsletter, no follow-up sequence.
                        </p>
                      </div>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
