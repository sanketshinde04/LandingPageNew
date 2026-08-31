"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";
import { images, problem } from "@/lib/content";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // slow parallax drift of the backdrop
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-40"
    >
      <div ref={bgRef} className="absolute -inset-y-[12%] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.metrics}
          alt=""
          className="h-full w-full object-cover opacity-[0.42]"
          loading="lazy"
        />
      </div>
      {/* the backdrop is texture, never something the copy has to fight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-base/45 to-base" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(5,5,5,0.78),transparent_78%)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-[860px] text-center">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="eyebrow !text-white/75">{problem.eyebrow}</span>
          </span>
          <h2 className="mt-8 text-[clamp(1.95rem,4.8vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {problem.title}{" "}
            <span className="serif-accent text-accent">
              {problem.titleAccent}
            </span>
            <br />
            {problem.titleAfter}
          </h2>
          <p className="mx-auto mt-7 max-w-[660px] text-base leading-relaxed text-white/65 md:text-lg">
            {problem.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:mt-24 sm:grid-cols-3">
          {problem.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.12}
              className="border-white/15 px-2 text-center sm:border-l sm:first:border-l-0"
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-tight text-white"
              />

              {/* proportion bar — the number, made visible */}
              <div
                className="mx-auto mt-6 h-[3px] w-[180px] max-w-full overflow-hidden rounded-full bg-white/10"
                aria-hidden
              >
                <motion.span
                  className="block h-full origin-left rounded-full bg-accent"
                  style={{ width: `${stat.value}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <p className="mx-auto mt-5 max-w-[260px] text-[15px] leading-relaxed text-white/70">
                {stat.label}
              </p>
              <p className="mx-auto mt-3 max-w-[260px] font-mono text-[11px] leading-relaxed text-white/35">
                {stat.source}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
