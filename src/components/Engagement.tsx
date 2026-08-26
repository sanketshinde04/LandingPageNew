import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { engagement } from "@/lib/content";

export default function Engagement() {
  return (
    <section id="engagement" className="py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <span className="eyebrow !text-accent">{engagement.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {engagement.title}{" "}
            <span className="serif-accent text-accent">
              {engagement.titleAccent}
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <div className="glass h-full rounded-[28px] p-10">
              <h3 className="text-2xl font-medium tracking-tight text-white">
                {engagement.details.heading}
              </h3>
              <div className="mt-7">
                {engagement.details.rows.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-8 border-t border-white/10 py-4"
                  >
                    <span className="eyebrow shrink-0 !text-[11px]">
                      {row.k}
                    </span>
                    <span className="text-right text-[15px] text-white/85">
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-bone p-10 text-ink">
              <span className="absolute right-8 top-8 rounded-full bg-accent px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                {engagement.card.ribbon}
              </span>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                  {engagement.card.kicker}
                </div>
                <div className="mt-3 text-[clamp(2.8rem,5vw,3.9rem)] font-medium leading-none tracking-tight">
                  {engagement.card.headline}
                </div>
                <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink/60">
                  {engagement.card.note}
                </p>

                <h4 className="mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                  {engagement.card.featuresLabel}
                </h4>
                <ul className="mt-4">
                  {engagement.card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3.5 border-t border-ink/10 py-3 text-[15px] leading-relaxed text-ink/80"
                    >
                      <span className="font-mono text-ink/50">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <Magnetic className="w-full">
                  <a
                    href={engagement.card.cta.href}
                    className="btn w-full bg-ink text-bone hover:bg-ink/85"
                  >
                    {engagement.card.cta.label} <span aria-hidden>→</span>
                  </a>
                </Magnetic>
                <p className="mt-5 text-center font-mono text-xs leading-relaxed text-ink/50">
                  {engagement.card.guarantee}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
