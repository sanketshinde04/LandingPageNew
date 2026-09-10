import ManifestoSplit from "@/components/ManifestoSplit";
import Reveal from "@/components/Reveal";
import { manifesto } from "@/lib/content";

/** A ruled panel: centred claim, one paragraph, then the paired ledger of the
    two ways of working. Same drafting language as the hero and the proof
    section — hairlines and corner ticks, no glass and no glow. */
export default function Manifesto() {
  return (
    <section id="model" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="relative border hairline px-5 py-14 text-center sm:px-8 md:px-16 md:py-20">
            <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

            <div className="flex justify-center">
              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                <span className="text-white/50">03</span>
                <span>{manifesto.eyebrow}</span>
              </span>
            </div>
            <h2 className="mx-auto mt-7 max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
              {manifesto.title}{" "}
              <span className="text-accent">{manifesto.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[60ch] text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px]">
              {manifesto.sub}
            </p>

            <ManifestoSplit />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
