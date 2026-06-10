"use client";

import { useEffect, useRef } from "react";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";
import { images, whyNow } from "@/lib/content";

export default function WhyNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // slow parallax drift of the mountain backdrop
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
    <section ref={sectionRef} className="relative overflow-hidden py-40">
      <div ref={bgRef} className="absolute -inset-y-[12%] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.metrics}
          alt=""
          className="h-full w-full object-cover opacity-45"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-base/40 to-base" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="eyebrow !text-white/75">{whyNow.eyebrow}</span>
          </span>
          <h2 className="mt-8 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {whyNow.title}{" "}
            <span className="serif-accent text-accent">{whyNow.titleAccent}</span>
            <br />
            Most teams are still in 2023.
          </h2>
          <p className="mx-auto mt-7 max-w-[640px] text-lg leading-relaxed text-white/65">
            {whyNow.sub}
          </p>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {whyNow.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.12}
              className="border-white/15 text-center sm:border-l sm:first:border-l-0"
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-tight text-white"
              />
              <p className="mx-auto mt-4 max-w-[240px] text-sm leading-relaxed text-white/55">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
