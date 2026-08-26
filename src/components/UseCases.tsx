import Glyph from "@/components/Glyph";
import Reveal from "@/components/Reveal";
import { useCases } from "@/lib/content";

export default function UseCases() {
  return (
    <section id="usecases" className="border-y hairline bg-surface py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{useCases.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {useCases.title}{" "}
            <span className="serif-accent text-accent">
              {useCases.titleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-white/65">
            {useCases.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => (
            <Reveal key={item.fn} delay={(i % 3) * 0.1} className="h-full">
              <article className="glass group flex h-full flex-col rounded-[28px] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:!border-accent/30 hover:!bg-white/[0.09]">
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow !text-[11px]">{item.fn}</span>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent/70 transition-all duration-500 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                    <Glyph name={item.icon} className="h-7 w-7" />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-white">
                  {item.example}
                </h3>
                <p className="mt-3.5 text-[15px] leading-relaxed text-white/60">
                  {item.body}
                </p>
                <span className="mt-auto pt-7 font-mono text-[11px] text-white/30 transition-colors duration-300 group-hover:text-accent">
                  trigger → context → action → approval → result
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-20">
          <div className="glass relative overflow-hidden rounded-[32px] p-10 md:p-14">
            <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
            <h3 className="eyebrow !text-accent">{useCases.fitEyebrow}</h3>
            <ul className="relative mt-7 grid grid-cols-1 gap-x-14 md:grid-cols-2">
              {useCases.fit.map((f) => (
                <li
                  key={f}
                  className="flex gap-4 border-t border-white/10 py-4 text-[16px] leading-relaxed text-white/85"
                >
                  <span className="font-mono text-accent">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
