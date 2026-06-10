import Reveal from "@/components/Reveal";
import { who } from "@/lib/content";

export default function WhoOutcomes() {
  return (
    <section id="outcomes" className="py-40">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-20 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <span className="eyebrow !text-accent">{who.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {who.title}{" "}
            <span className="serif-accent text-accent">{who.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-white/65">
            {who.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {who.chips.map((chip) => (
              <span
                key={chip}
                className="glass cursor-default rounded-full px-5 py-2.5 text-[15px] text-white/80 transition-all duration-300 hover:!border-accent/40 hover:!bg-accent/10 hover:text-white"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <span className="eyebrow !text-accent">{who.outcomesEyebrow}</span>
          <ul className="mt-7">
            {who.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-5 border-t border-white/10 py-5 text-[16.5px] leading-relaxed text-white/85"
              >
                <span className="font-mono text-accent">✓</span>
                {outcome}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
