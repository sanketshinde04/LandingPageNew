"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { faq } from "@/lib/content";

/** Questions as a ruled ledger: mono index, question, a mono plus that turns
    into a cross when open. The header sits to the left on wide screens and
    stays put while the list scrolls, so the section reads like every other
    ruled panel on the page. */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t hairline last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group grid w-full grid-cols-[40px_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[56px_1fr_auto]"
      >
        <span
          className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
            open ? "text-accent" : "text-white/35"
          }`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`text-[17px] font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 md:text-[19px] ${
            open ? "text-accent" : "text-bone group-hover:text-accent"
          }`}
        >
          {q}
        </span>
        <span
          className={`shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-500 ${
            open ? "rotate-[135deg]" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="ml-[56px] max-w-[60ch] pb-7 text-[15px] leading-[1.65] text-[#9a9eac] md:ml-[72px] md:text-[16px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="border-t hairline py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span className="text-white/50">08</span>
              <span>{faq.eyebrow}</span>
            </span>
            <h2 className="mt-7 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
              {faq.title}{" "}
              <span className="text-accent">{faq.titleAccent}</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {faq.items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
