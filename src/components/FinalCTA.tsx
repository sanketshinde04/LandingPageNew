import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { finalCta, images } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section id="call" className="scroll-mt-24 px-4 pb-10 md:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_90%_90%_at_50%_30%,#18261e_0%,#0b120d_60%,#070907_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.finalCta}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-base/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(5,5,5,0.9),transparent_78%)]" />

          <div className="relative z-10 flex flex-col items-center px-6 py-32 text-center md:py-44">
            <h2 className="max-w-[18ch] text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
              {finalCta.title}{" "}
              <span className="serif-accent text-accent">
                {finalCta.titleAccent}
              </span>
              {finalCta.titleAfter && ` ${finalCta.titleAfter}`}
            </h2>
            <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-white/75">
              {finalCta.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a href={finalCta.primaryCta.href} className="btn btn-solid">
                  {finalCta.primaryCta.label}
                </a>
              </Magnetic>
              <Magnetic>
                <a href={finalCta.secondaryCta.href} className="btn btn-glass">
                  {finalCta.secondaryCta.label}
                </a>
              </Magnetic>
            </div>
            <p className="mt-9 flex items-center gap-2.5 font-mono text-xs text-white/60">
              <span className="text-accent">✓</span>
              {finalCta.reassurance}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
