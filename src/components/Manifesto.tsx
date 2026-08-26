import Reveal from "@/components/Reveal";
import { manifesto } from "@/lib/content";

/** One centred column — eyebrow, claim, one paragraph, one line worth quoting. */
export default function Manifesto() {
  return (
    <section id="model" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />

            <div className="relative">
              <span className="eyebrow !text-accent">{manifesto.eyebrow}</span>
              <h2 className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                {manifesto.title}{" "}
                <span className="serif-accent text-accent">
                  {manifesto.titleAccent}
                </span>
              </h2>
              <p className="mx-auto mt-7 max-w-[62ch] text-lg leading-relaxed text-white/65">
                {manifesto.sub}
              </p>

              {/* the comparison sits under the centred claim, left-aligned so
                  the two columns are actually readable against each other */}
              <div className="mx-auto mt-14 grid max-w-[900px] grid-cols-1 gap-x-12 gap-y-8 text-left md:grid-cols-2">
                <div>
                  <h3 className="eyebrow !text-white/40">
                    {manifesto.oldWay.heading}
                  </h3>
                  <ul className="mt-4">
                    {manifesto.oldWay.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3.5 border-t border-white/10 py-3.5 text-[15px] leading-relaxed text-white/40"
                      >
                        <span className="font-mono text-white/30">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow !text-accent">
                    {manifesto.shipWay.heading}
                  </h3>
                  <ul className="mt-4">
                    {manifesto.shipWay.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3.5 border-t border-white/10 py-3.5 text-[15px] leading-relaxed text-white/85"
                      >
                        <span className="font-mono text-accent">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <blockquote className="serif-accent mx-auto mt-14 max-w-[26ch] border-t border-accent/30 pt-10 text-[clamp(1.5rem,3vw,2.1rem)] leading-snug text-white/90">
                {manifesto.quote.before}
                <mark className="rounded bg-accent px-2 font-sans text-[0.8em] font-medium not-italic text-ink">
                  {manifesto.quote.highlight}
                </mark>
                {manifesto.quote.after}
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
