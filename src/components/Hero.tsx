"use client";

import { motion } from "framer-motion";
import BookingDialog from "@/components/BookingDialog";
import GradientWaves from "@/components/GradientWaves";
import HeroRing from "@/components/HeroRing";
import Magnetic from "@/components/Magnetic";
import { hero } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

/* ------------------------------------------------------------------ *
   Set like an engineering drawing. The claim and the orbit sit inside
   a hairline frame: two vertical rules, crosshair ticks at the corners,
   and a ruled rail along the foot.
   The ring breaks the frame on the right on purpose. The ground sits a
   step above the page, with the wave field as its only light.
   Blue is kept for the accent line, the eyebrow tick and the button.
 * ------------------------------------------------------------------ */
export default function Hero() {
  const words = hero.titleLine2.replace(/\.$/, "").split(" ");
  const last = words.pop() ?? "";
  const lead = words.length ? `${words.join(" ")} ` : "";

  return (
    <section
      id="top"
      className="hero-ground relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* ---------- ground ---------- */}
      {/* a slow sea of waves in the site's blues, held to the lower half so
          the claim sits on clear ground; the far waves dissolve into the
          hero's own colour rather than a haze of their own */}
      <div className="hero-waves pointer-events-none absolute inset-0" aria-hidden="true">
        <GradientWaves
          horizonColor="#111419"
          waveColor="#363e5e"
          crestColor="#5a8dde"
          speed={0.22}
          amplitude={2.4}
          waveScale={0.6}
          waveRatio={0.9}
          swell={32}
          turbulence={18}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={0.9}
          mouseInteraction
          parallaxStrength={0.35}
          grain
          grainIntensity={0.04}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 pt-20 sm:pt-28 md:px-10 lg:pt-32">
        {/* ---------- the frame ---------- */}
        <div className="relative flex flex-1 flex-col">
          <span className="hero-rule-v left-0" aria-hidden="true" />
          <span className="hero-rule-v right-0" aria-hidden="true" />
          <span className="hero-cross hero-cross-tl" aria-hidden="true" />
          <span className="hero-cross hero-cross-tr" aria-hidden="true" />

          {/* ---------- claim + ring ---------- */}
          <div className="grid flex-1 grid-cols-1 items-center gap-6 py-4 sm:gap-10 sm:py-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6 lg:py-4 lg:pl-8">
            {/* below lg the copy comes first and sits centred, the ring follows */}
            <div className="mx-auto max-w-[640px] text-center lg:mx-0 lg:text-left">
              <motion.div {...rise(0.05)} className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                <span className="text-white/50">01</span>
                <span>{hero.eyebrow}</span>
              </motion.div>

              <motion.h1
                {...rise(0.14)}
                className="mt-8 text-[clamp(2.6rem,5.9vw,4.9rem)] font-semibold leading-[0.96] tracking-[-0.035em] text-[#e0e2f0] sm:mt-9"
              >
                <span className="block sm:whitespace-nowrap">{hero.titleLine1}</span>
                <span className="block text-accent">
                  {lead}
                  {/* the last word and its stop travel together */}
                  <span className="whitespace-nowrap">
                    {last}
                    <span className="hero-stop" aria-hidden="true" />
                  </span>
                </span>
              </motion.h1>

              <motion.p
                {...rise(0.24)}
                className="mx-auto mt-7 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-[#9a9eac] sm:mt-8 md:text-[1.2rem] lg:mx-0"
              >
                {hero.sub}
              </motion.p>

              <motion.div {...rise(0.34)} className="mt-9 sm:mt-11">
                <Magnetic>
                  <BookingDialog
                    triggerClassName="btn btn-solid"
                    label={hero.primaryCta.label}
                  />
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease }}
              /* on desktop the ring is stretched past its column on both sides,
                 so it crosses the gap and breaks the right rule of the frame */
              className="aspect-square w-full max-w-[340px] justify-self-center sm:max-w-[520px] lg:-ml-6 lg:-mr-10 lg:aspect-[6/5] lg:w-auto lg:max-w-none lg:justify-self-stretch xl:-mr-20"
            >
              <HeroRing className="h-full w-full" />
            </motion.div>
          </div>

          {/* ---------- the rail ---------- */}
          <motion.div
            {...rise(0.5)}
            className="hero-rail relative mt-6 h-12 lg:mt-2 lg:h-14"
            aria-hidden="true"
          >
            <span className="hero-cross hero-cross-bl" />
            <span className="hero-cross hero-cross-br" />
            <div className="hero-ruler" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
