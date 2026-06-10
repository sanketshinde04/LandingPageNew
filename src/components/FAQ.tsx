"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { faq } from "@/lib/content";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10 last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={`text-lg font-medium tracking-tight transition-colors duration-300 md:text-xl ${
            open ? "text-accent" : "text-white"
          }`}
        >
          {q}
        </span>
        <span
          className={`shrink-0 font-mono text-xl text-accent transition-transform duration-500 ${
            open ? "rotate-[135deg]" : ""
          }`}
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
            <p className="max-w-[62ch] pb-7 leading-relaxed text-white/65">
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
    <section className="pb-40">
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <Reveal>
          <span className="eyebrow !text-accent">{faq.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {faq.title}{" "}
            <span className="serif-accent text-accent">{faq.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          {faq.items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
