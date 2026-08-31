"use client";

import { motion } from "framer-motion";
import HeroRing from "@/components/HeroRing";
import Magnetic from "@/components/Magnetic";
import { hero } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.2, delay, ease },
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* ---------- backdrop ---------- */}
      <div className="absolute inset-0 bg-base" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_54%_at_72%_46%,rgba(40,86,180,0.34),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_58%_at_10%_30%,rgba(26,44,86,0.46),transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_top,rgba(14,26,56,0.5),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 66% 60% at 50% 46%, black 18%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 66% 60% at 50% 46%, black 18%, transparent 82%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-28 sm:gap-10 sm:pt-32 md:px-10 lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:pb-24">
        {/* ---------- left: the claim ---------- */}
        <div>
          <motion.h1
            {...fadeUp(0.1)}
            className="text-[clamp(2.15rem,5.4vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white"
          >
            {/* each line holds together — the headline never breaks mid-phrase */}
            <span className="sm:whitespace-nowrap">{hero.titleLine1}</span>
            <br />
            <span className="serif-accent text-accent">{hero.titleLine2}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.26)}
            className="mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-white/70 sm:mt-8 sm:text-xl md:max-w-[30ch] md:text-[1.35rem]"
          >
            {hero.sub}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 sm:mt-10">
            <Magnetic>
              <a href={hero.primaryCta.href} className="btn btn-solid">
                {hero.primaryCta.label} <span aria-hidden>→</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* ---------- right: the mark, orbiting ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.25, ease }}
          className="order-first aspect-square w-full max-w-[560px] justify-self-center lg:order-last lg:aspect-[7/5] lg:max-w-none"
        >
          <HeroRing className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
