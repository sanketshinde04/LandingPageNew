import BookingDialog from "@/components/BookingDialog";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { finalCta, images } from "@/lib/content";

/**
 * The closing frame: a square hairline panel with corner ticks, the same
 * drafting language as the rest of the page, carrying the photograph as a
 * ground for one claim and one button. The picture is darkened where the
 * words sit and left alone towards the edges.
 */
export default function FinalCTA() {
  return (
    <section id="call" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="relative border hairline">
            <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images.finalCta}
                alt="Ready to deploy forward-deployed AI engineering"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              {/* darkened where the words are, left alone towards the edges */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(10,12,15,0.7),rgba(10,12,15,0.35)_60%,transparent_90%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-base/70" />

              <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center md:py-32">
                <span className="hero-eyebrow">
                  <span className="hero-eyebrow-dot" aria-hidden="true" />
                  <span className="text-white/50">09</span>
                  <span>{finalCta.eyebrow}</span>
                </span>
                <h2 className="mt-7 max-w-[18ch] text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                  {finalCta.title}{" "}
                  <span className="text-accent">{finalCta.titleAccent}</span>
                  {finalCta.titleAfter && ` ${finalCta.titleAfter}`}
                </h2>
                <p className="mt-6 max-w-[480px] text-[16px] leading-[1.6] text-[#c3c6d3] md:text-[17px]">
                  {finalCta.sub}
                </p>
                <div className="mt-10">
                  <Magnetic>
                    <BookingDialog
                      triggerClassName="btn btn-solid"
                      label={finalCta.primaryCta.label}
                    />
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
