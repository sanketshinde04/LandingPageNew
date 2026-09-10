"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";
import { images, problem } from "@/lib/content";

/** The problem, stated as a ledger: a left-aligned three-line claim with the
    paragraph set beside it, then three sourced numbers in a ruled strip.
    Same drafting language as the other sections — numbered tick eyebrow,
    hairlines, one 1200px container — with the blackboard kept as texture. */
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
      className="relative overflow-hidden border-y hairline py-24 md:py-32"
    >
      <div ref={bgRef} className="absolute -inset-y-[12%] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.metrics}
          alt=""
          className="h-full w-full object-cover opacity-[0.3]"
          loading="lazy"
        />
      </div>
      {/* the backdrop is texture, never something the copy has to fight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-base/60 to-base" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        {/* ---------- the claim and its paragraph, side by side ---------- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span className="text-white/50">05</span>
              <span>{problem.eyebrow}</span>
            </span>
            <h2 className="mt-7 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
              <span className="block">{problem.title}</span>
              <span className="block text-accent">{problem.titleAccent}</span>
              <span className="block">{problem.titleAfter}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[440px] border-l hairline pl-5 text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px] lg:pl-6">
              {problem.sub}
            </p>
          </Reveal>
        </div>

        {/* ---------- the numbers, as a ruled strip ---------- */}
        <div className="mt-16 grid grid-cols-1 border-t hairline md:mt-20 md:grid-cols-3">
          {problem.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.12}
              className="relative border-b hairline py-8 md:border-b-0 md:border-r md:py-10 md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="mt-4 block text-[clamp(3rem,5.4vw,4.6rem)] font-semibold leading-none tracking-[-0.03em] text-bone"
              />

              {/* proportion bar — the number, made visible */}
              <div
                className="mt-6 h-px w-full overflow-hidden bg-white/10"
                aria-hidden
              >
                <motion.span
                  className="block h-full origin-left bg-accent"
                  style={{ width: `${stat.value}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-bone/80">
                {stat.label}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/35">
                {stat.source}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
