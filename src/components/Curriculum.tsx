"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { curriculum, type Week } from "@/lib/content";

function WeekCard({ week }: { week: Week }) {
  const [open, setOpen] = useState(false);
  const ship = week.kind === "ship";

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className={`glass group relative flex h-full flex-col rounded-[28px] p-8 text-left transition-all duration-500 hover:-translate-y-1.5 ${
        ship
          ? "!border-accent/30 !bg-accent/[0.07] hover:!border-accent/50"
          : "hover:!border-white/20 hover:!bg-white/[0.09]"
      }`}
    >
      {week.stamp && (
        <span className="absolute -top-3.5 right-6 rounded-full bg-accent px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
          {week.stamp}
        </span>
      )}
      <div className="flex items-center justify-between">
        <span className={`eyebrow !text-[11px] ${ship ? "!text-accent" : ""}`}>
          {week.num}
        </span>
        <span
          className={`text-lg leading-none transition-transform duration-500 ${
            ship ? "text-accent" : "text-white/40"
          } ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-medium tracking-tight text-white">
        {week.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">
        {week.blurb}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {week.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 border-t border-white/10 py-3 text-sm leading-relaxed text-white/70 first:mt-5"
              >
                <span className={ship ? "text-accent" : "text-white/40"}>→</span>
                {b}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <span className="mt-auto pt-5 font-mono text-[11px] text-white/35">
        {open ? "tap to collapse ↑" : "tap to expand ↓"}
      </span>
    </button>
  );
}

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{curriculum.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {curriculum.title}{" "}
            <span className="serif-accent text-accent">
              {curriculum.titleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-white/65">
            {curriculum.sub}
          </p>
        </Reveal>

        {curriculum.loops.map((loop, li) => (
          <div key={loop.tag}>
            <Reveal className="mt-16">
              <span
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] ${
                  li === 0
                    ? "glass text-white/75"
                    : "bg-accent text-ink"
                }`}
              >
                ⟲ {loop.tag}
              </span>
            </Reveal>
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
              {loop.weeks.map((week, wi) => (
                <Reveal key={week.num} delay={wi * 0.1} className="h-full">
                  <WeekCard week={week} />
                </Reveal>
              ))}
            </div>
            {li === 0 && (
              <Reveal className="mt-14 text-center">
                <p className="eyebrow">{curriculum.connector}</p>
                <span className="mt-3 inline-block animate-bounce text-xl text-accent">
                  ↓
                </span>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
