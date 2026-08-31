"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { AnimatePresence, motion } from "framer-motion";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import SectionAurora from "@/components/SectionAurora";
import { work } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
/** the track is duplicated so the marquee can wrap without a visible seam */
const LOOP = [...work.projects, ...work.projects];

function SectorBadge({ sector }: { sector: string }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded-[3px] bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.17em] text-[#080e1a] shadow-[0_6px_22px_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:-translate-y-0.5"
    >
      {sector}
    </span>
  );
}

/**
 * A carousel of project cards. Flat surfaces, one accent, no gradients — the
 * drawing is the only thing on the card doing any decoration. The whole card
 * opens the full story, not just the link at the bottom.
 */
export default function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-work-card]"));
    const listeners = cards.map((card) => {
      const visual = card.querySelector<SVGElement>("[data-project-visual]");
      if (!visual) return null;

      const onEnter = () => animate(visual, { translateY: -5, scale: 1.025, duration: 420, ease: "outQuint" });
      const onLeave = () => animate(visual, { translateY: 0, scale: 1, duration: 520, ease: "outQuint" });
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      return { card, onEnter, onLeave };
    });

    return () => {
      listeners.forEach((listener) => {
        if (!listener) return;
        listener.card.removeEventListener("pointerenter", listener.onEnter);
        listener.card.removeEventListener("pointerleave", listener.onLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const active =
    openIndex === null ? null : work.projects[openIndex % work.projects.length];

  return (
    <section id="work" className="relative py-24 md:py-40">
      <SectionAurora variant="blue" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{work.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {work.title}{" "}
            <span className="serif-accent text-accent">{work.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-base leading-relaxed text-white/65 md:text-lg">
            {work.sub}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12 md:mt-14">
        <div className="marquee-mask">
          <div
            ref={trackRef}
            className={`marquee-track gap-4 py-1 pl-6 md:gap-5 md:pl-10 ${
              openIndex !== null ? "is-paused" : ""
            }`}
          >
            {LOOP.map((project, i) => (
              <article
                key={`${project.title}-${i}`}
                role="button"
                tabIndex={0}
                onClick={() => setOpenIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(i);
                  }
                }}
                aria-label={`Read the full story: ${project.title}`}
                data-work-card
                className="group flex h-[470px] w-[300px] shrink-0 cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/[0.02] outline-none transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04] focus-visible:border-accent/60 sm:w-[380px]"
              >
                {/* the drawing, sitting on the card rather than in a frame */}
                <div className="relative flex h-[190px] shrink-0 items-center justify-center overflow-hidden px-6 pt-6">
                  <ProjectVisual
                    name={project.visual}
                    className="h-auto w-full opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <SectorBadge sector={project.sector} />
                  <h3 className="mt-2.5 text-[1.25rem] font-medium leading-tight tracking-tight text-white">
                    {project.title}
                  </h3>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {project.points.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-white/60"
                      >
                        <span className="mt-[7px] h-px w-2.5 shrink-0 bg-accent/70" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 group-hover:text-accent">
                    Full story
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- the full story ---------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              className="absolute inset-0 bg-[#03060d]/75 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="glass relative z-10 max-h-[85svh] w-full max-w-[580px] overflow-y-auto rounded-[24px] p-6 sm:p-8 md:p-10"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent/40 hover:text-accent md:right-6 md:top-6"
              >
                ×
              </button>

              <SectorBadge sector={active.sector} />
              <h3 className="mt-3 max-w-[22ch] text-[1.5rem] font-medium leading-tight tracking-tight text-white md:text-[1.7rem]">
                {active.title}
              </h3>

              <p className="mt-5 text-[15px] leading-relaxed text-white/75">
                {active.detail}
              </p>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                {active.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[14px] leading-relaxed text-white/70"
                  >
                    <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
