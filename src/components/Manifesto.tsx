import ManifestoSplit from "@/components/ManifestoSplit";
import Reveal from "@/components/Reveal";
import SectionAurora from "@/components/SectionAurora";
import { manifesto } from "@/lib/content";

/** Centred claim, one paragraph, then the two ways of working side by side. */
export default function Manifesto() {
  return (
    <section id="model" className="relative overflow-hidden py-20 md:py-28">
      <SectionAurora variant="ice" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[32px] px-6 py-12 text-center sm:px-8 md:px-16 md:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />

            <div className="relative">
              <span className="eyebrow !text-accent">{manifesto.eyebrow}</span>
              <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                {manifesto.title}{" "}
                <span className="serif-accent text-accent">
                  {manifesto.titleAccent}
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-[62ch] text-base leading-relaxed text-white/65 md:text-lg">
                {manifesto.sub}
              </p>

              <ManifestoSplit />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
