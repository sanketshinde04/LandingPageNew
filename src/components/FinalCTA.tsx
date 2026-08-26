import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { finalCta, images } from "@/lib/content";

/**
 * One inset card that carries its own photograph — the picture is meant to be
 * seen, so it sits high and the copy is protected by a gradient over the middle
 * rather than by flattening the whole image.
 */
export default function FinalCTA() {
  return (
    <section id="call" className="scroll-mt-24 px-4 pb-12 md:px-8 lg:px-10">
      <Reveal>
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(ellipse_90%_90%_at_50%_30%,#18261e_0%,#0b120d_60%,#070907_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.finalCta}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          {/* darkened where the words are, left alone towards the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_54%_at_50%_48%,rgba(4,7,5,0.32),rgba(4,7,5,0.12)_62%,transparent_88%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-base/30 via-transparent to-base/45" />
          {/* pulls the photograph back towards the site's own green */}
          <div className="absolute inset-0 bg-[#0d1a12] mix-blend-color opacity-[0.16]" />

          <div className="relative z-10 flex flex-col items-center px-6 py-36 text-center md:py-52 lg:py-60">
            <h2 className="max-w-[18ch] text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]">
              {finalCta.title}{" "}
              <span className="serif-accent text-accent">
                {finalCta.titleAccent}
              </span>
              {finalCta.titleAfter && ` ${finalCta.titleAfter}`}
            </h2>
            <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-white/80 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
              {finalCta.sub}
            </p>
            <div className="mt-10">
              <Magnetic>
                <a href={finalCta.primaryCta.href} className="btn btn-solid">
                  {finalCta.primaryCta.label}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
