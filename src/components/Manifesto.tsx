import Reveal from "@/components/Reveal";
import { manifesto } from "@/lib/content";

export default function Manifesto() {
  return (
    <section id="shipweeks" className="py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[32px] p-10 md:p-16">
            <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />

            <span className="eyebrow !text-accent">{manifesto.eyebrow}</span>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {manifesto.title}{" "}
              <span className="serif-accent text-accent">
                {manifesto.titleAccent}
              </span>
            </h2>
            <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-white/65">
              {manifesto.sub}
            </p>

            <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h4 className="eyebrow !text-white/40">
                  {manifesto.oldWay.heading}
                </h4>
                <ul className="mt-5">
                  {manifesto.oldWay.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-t border-white/10 py-4 text-[16px] text-white/40 line-through decoration-white/30"
                    >
                      <span className="font-mono no-underline">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow !text-accent">
                  {manifesto.shipWay.heading}
                </h4>
                <ul className="mt-5">
                  {manifesto.shipWay.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-t border-white/10 py-4 text-[16px] text-white/85"
                    >
                      <span className="font-mono text-accent">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <blockquote className="serif-accent mt-14 max-w-[34ch] border-l-2 border-accent pl-7 text-[clamp(1.5rem,3vw,2.1rem)] leading-snug text-white/90">
              {manifesto.quote.before}
              <mark className="rounded bg-accent px-2 not-italic font-sans text-[0.8em] font-medium text-ink">
                {manifesto.quote.highlight}
              </mark>
              {manifesto.quote.after}
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
