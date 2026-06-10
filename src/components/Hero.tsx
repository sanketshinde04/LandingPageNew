"use client";

import { motion } from "framer-motion";
import LiquidLens from "@/components/LiquidLens";
import Magnetic from "@/components/Magnetic";
import { hero, images } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 36, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.3, delay, ease },
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* atmospheric fallback while the footage loads */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_15%,#18261e_0%,#0b120d_55%,#050505_100%)]" />
      <LiquidLens src={images.hero} className="absolute inset-0" />

      {/* cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/70 via-base/20 to-base" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_30%,transparent_45%,rgba(5,5,5,0.55)_100%)]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-32 text-center">
        <motion.div {...fadeUp(0.1)}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="eyebrow !text-white/75">{hero.eyebrow}</span>
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-8 text-[clamp(3.2rem,9vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-white"
        >
          {hero.titleLine1}
          <br />
          <span className="serif-accent text-accent">{hero.titleLine2}</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.45)}
          className="mt-8 max-w-[620px] text-lg leading-relaxed text-white/75 md:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          {...fadeUp(0.6)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a href={hero.primaryCta.href} className="btn btn-solid">
              {hero.primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic>
            <a href={hero.secondaryCta.href} className="btn btn-glass">
              {hero.secondaryCta.label}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* bottom meta strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease }}
        className="relative z-10"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-start justify-center gap-x-14 gap-y-6 px-6 pb-12 md:justify-between md:px-10">
          {hero.meta.map((m) => (
            <div key={m.value} className="text-center md:text-left">
              <div className="text-3xl font-medium tracking-tight text-white md:text-4xl">
                {m.value}
              </div>
              <div className="mt-1.5 text-sm text-white/55">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
