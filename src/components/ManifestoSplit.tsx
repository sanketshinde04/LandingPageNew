"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { manifesto } from "@/lib/content";

/** how far the handle may travel, as a percentage of the row's width */
const MIN = 28;
const MAX = 72;
const STEP = 4;

function Column({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: readonly string[];
  tone: "old" | "ship";
}) {
  const ship = tone === "ship";
  return (
    <div>
      <h3 className={`eyebrow ${ship ? "!text-accent" : "!text-white/40"}`}>
        {heading}
      </h3>
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item}
            className={`flex gap-3.5 border-t border-white/10 py-3.5 text-[15px] leading-relaxed ${
              ship ? "text-white/85" : "text-white/40"
            }`}
          >
            <span className={`font-mono ${ship ? "text-accent" : "text-white/30"}`}>
              {ship ? "→" : "✗"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The two lists sit either side of a handle you can actually drag: pull it
 * right and the old way takes the room, pull it left and our way does. It is a
 * real control — pointer or arrow keys — not a decorative rule.
 */
export default function ManifestoSplit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX, Math.max(MIN, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const move = (e: PointerEvent) => {
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const stop = () => setDragging(false);

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);

    // the cursor has to survive leaving the handle, so it is set on the page
    const { cursor, userSelect } = document.body.style;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
    };
  }, [dragging, setFromClientX]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto mt-12 max-w-[900px] text-left"
      style={{ ["--split" as string]: `${pct}%` }}
    >
      <div className="flex flex-col gap-10 md:flex-row md:gap-0">
        <div className="w-full md:w-[var(--split)] md:pr-14">
          <Column
            heading={manifesto.oldWay.heading}
            items={manifesto.oldWay.items}
            tone="old"
          />
        </div>
        <div className="w-full md:w-[calc(100%-var(--split))] md:pl-14">
          <Column
            heading={manifesto.shipWay.heading}
            items={manifesto.shipWay.items}
            tone="ship"
          />
        </div>
      </div>

      {/* the handle — sits in the gap the two columns leave for it */}
      <div className="pointer-events-none absolute inset-y-0 left-[var(--split)] hidden w-12 -translate-x-1/2 md:block">
        <div
          className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${
            dragging ? "bg-accent/60" : "bg-white/15"
          }`}
        />
        <button
          type="button"
          role="separator"
          aria-orientation="vertical"
          aria-label="Drag to compare the two ways of working"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging(true);
            setFromClientX(e.clientX);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              const d = e.key === "ArrowLeft" ? -STEP : STEP;
              setPct((p) => Math.min(MAX, Math.max(MIN, p + d)));
            }
          }}
          className={`pointer-events-auto absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-col-resize touch-none place-items-center rounded-full border bg-base text-white/70 outline-none transition-colors duration-300 hover:border-accent/50 hover:text-accent focus-visible:border-accent focus-visible:text-accent ${
            dragging ? "border-accent text-accent" : "border-white/20"
          }`}
        >
          <svg width="17" height="10" viewBox="0 0 17 10" fill="none" aria-hidden>
            <path
              d="M5 1 1 5l4 4M12 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
