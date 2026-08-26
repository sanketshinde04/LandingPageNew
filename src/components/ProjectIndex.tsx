"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { projectIndex } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Tabs + a list + one detail panel. The old table ran the height of three
 * screens; this stays fixed however many projects get added to it.
 */
export default function ProjectIndex() {
  const [group, setGroup] = useState(0);
  const [selected, setSelected] = useState(0);

  const active = projectIndex.groups[group];
  const item = active.items[selected] ?? active.items[0];

  const pick = (g: number) => {
    setGroup(g);
    setSelected(0);
  };

  return (
    <section id="projects" className="border-y hairline bg-surface py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{projectIndex.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {projectIndex.title}{" "}
            <span className="serif-accent text-accent">
              {projectIndex.titleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-white/65">
            {projectIndex.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          {/* ---------- group switch ---------- */}
          <div className="glass inline-flex rounded-full p-1.5">
            {projectIndex.groups.map((g, i) => (
              <button
                key={g.label}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={group === i}
                className={`rounded-full px-5 py-2 text-sm transition-colors duration-300 ${
                  group === i
                    ? "bg-bone text-ink"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {g.label}
                <span className="ml-2 font-mono text-[11px] opacity-50">
                  {g.items.length}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* ---------- the list ---------- */}
            <ul className="glass overflow-hidden rounded-[28px] p-2">
              {active.items.map((entry, i) => {
                const on = i === selected;
                return (
                  <li key={entry.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setSelected(i)}
                      onFocus={() => setSelected(i)}
                      onClick={() => setSelected(i)}
                      aria-pressed={on}
                      className={`flex w-full items-center gap-4 rounded-[20px] px-5 py-4 text-left transition-colors duration-300 ${
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
                          {entry.domain}
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

            {/* ---------- the detail ---------- */}
            <div className="glass relative flex min-h-[380px] flex-col overflow-hidden rounded-[28px] p-9 md:p-11">
              <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-accent/[0.07] blur-[110px]" />

              {/* keyed remount, fade in only — an exit animation would make
                  every hover wait before the panel caught up */}
              <motion.div
                key={`${group}-${selected}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease }}
                className="relative flex h-full flex-col"
              >
                <span className="eyebrow !text-[10px]">{active.note}</span>

                <div className="mt-6 text-[clamp(2.4rem,4.4vw,3.4rem)] font-medium leading-none tracking-tight text-accent">
                  {item.metric}
                </div>
                <p className="mt-2.5 text-sm text-white/50">{item.metricLabel}</p>

                <h3 className="mt-8 border-t border-white/10 pt-7 text-2xl font-medium tracking-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-3.5 max-w-[52ch] text-[16px] leading-relaxed text-white/65">
                  {item.outcome}
                </p>

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
