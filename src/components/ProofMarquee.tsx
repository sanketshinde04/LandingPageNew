import Reveal from "@/components/Reveal";
import SectionAurora from "@/components/SectionAurora";
import { proof } from "@/lib/content";

/* Nine logos split into three fixed columns, so a logo can never appear in two
   columns at once — that alone guarantees no visible repeats. The outer columns
   rise and the centre one falls. Each column repeats its three tiles four times
   so the looping half is always taller than the window, otherwise the wrap
   leaves a bare gap at the seam. */
const COLUMNS = [
  proof.companies.slice(0, 3),
  proof.companies.slice(3, 6),
  proof.companies.slice(6, 9),
];

function LogoTile({ company }: { company: { name: string; file: string } }) {
  return (
    <div className="glass flex w-full shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${company.file}.png`}
        alt=""
        width={36}
        height={36}
        loading="lazy"
        aria-hidden
        className="h-9 w-9 shrink-0 rounded-lg object-contain"
      />
      <span className="min-w-0 truncate text-[15px] font-medium tracking-tight text-white">
        {company.name}
      </span>
    </div>
  );
}

export default function ProofMarquee() {
  return (
    <section className="relative overflow-hidden border-y hairline bg-surface py-20 md:py-32">
      <SectionAurora variant="cyan" />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className="eyebrow !text-accent">{proof.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {proof.title}{" "}
            <span className="serif-accent text-accent">{proof.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-[16px] md:text-[17px] leading-relaxed text-white/60">
            {proof.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="marquee-vertical-mask grid h-[360px] grid-cols-2 gap-3 sm:h-[440px] sm:grid-cols-3 sm:gap-4">
            {COLUMNS.map((column, ci) => (
              <div
                key={ci}
                className={`relative h-full overflow-hidden ${
                  ci === 2 ? "hidden sm:block" : ""
                }`}
              >
                <div
                  className="marquee-vertical-track flex flex-col gap-3 sm:gap-4"
                  style={{
                    animationDirection: ci === 1 ? "reverse" : "normal",
                  }}
                >
                  {[...column, ...column, ...column, ...column].map(
                    (company, i) => (
                      <LogoTile key={`${company.file}-${i}`} company={company} />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
