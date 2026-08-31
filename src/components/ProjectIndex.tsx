"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { projectIndex } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A list on the left, one detail panel on the right. The client-work tab that
 * used to sit here duplicated the section above it, so it is gone — this is
 * only the parts we bring to a build.
 */
export default function ProjectIndex() {
  const [selected, setSelected] = useState(0);
  const item = projectIndex.items[selected] ?? projectIndex.items[0];

  return (
    <section id="projects" className="border-y hairline bg-surface py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[820px]">
          <span className="eyebrow !text-accent">{projectIndex.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {projectIndex.title}{" "}
            <span className="serif-accent text-accent">
              {projectIndex.titleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-white/65 md:text-lg">
            {projectIndex.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* ---------- the parts ---------- */}
            <ul className="glass overflow-hidden rounded-[24px] p-2">
              {projectIndex.items.map((entry, i) => {
                const on = i === selected;
                return (
                  <li key={entry.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setSelected(i)}
                      onFocus={() => setSelected(i)}
                      onClick={() => setSelected(i)}
                      aria-pressed={on}
                      className={`flex w-full items-center gap-4 rounded-[18px] px-5 py-3.5 text-left transition-colors duration-300 ${
                        on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] transition-colors duration-300 ${
                          on ? "text-accent" : "text-white/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[15.5px] font-medium tracking-tight transition-colors duration-300 ${
                            on ? "text-accent" : "text-white"
                          }`}
                        >
                          {entry.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] text-white/45">
                          {entry.role}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-mono text-xs transition-all duration-300 ${
                          on
                            ? "translate-x-0 text-accent opacity-100"
                            : "-translate-x-1 opacity-0"
                        }`}
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ---------- what it means for you ---------- */}
            <div className="glass relative flex min-h-[320px] flex-col overflow-hidden rounded-[24px] p-6 sm:p-9 md:p-11">
              <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-accent/[0.07] blur-[110px]" />

              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease }}
                className="relative flex h-full flex-col"
              >
                <span className="eyebrow !text-[10px] !text-accent">
                  Already built · already running
                </span>

                <h3 className="mt-6 text-[clamp(1.7rem,2.6vw,2.2rem)] font-medium leading-tight tracking-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[15px] text-white/50">{item.role}</p>

                <p className="mt-7 max-w-[52ch] border-t border-white/10 pt-7 text-[16.5px] leading-relaxed text-white/75">
                  {item.detail}
                </p>

                <ul className="mt-7 space-y-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[14.5px] leading-relaxed text-white/70"
                    >
                      <span className="mt-[3px] font-mono text-[10px] text-accent">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.13em] text-white/35">
                  {item.systems}
                </p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
