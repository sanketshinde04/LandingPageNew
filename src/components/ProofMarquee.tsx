import Reveal from "@/components/Reveal";
import { proof } from "@/lib/content";

/* Ten logos split into two fixed columns of five, so a logo can never sit in
   two columns at once. Each row is fixed-height and the window is a few
   pixels shorter than one column, so the same logo also never shows twice in
   one column. The left column rises and the right one falls, each at its own
   speed. Two copies of a column make the looping half, which is all the
   -50% keyframe needs. */
const PER_COLUMN = Math.ceil(proof.companies.length / 2);
const COLUMNS = [
  proof.companies.slice(0, PER_COLUMN),
  proof.companies.slice(PER_COLUMN),
];
const DURATIONS = ["40s", "52s"];

type Company = (typeof proof.companies)[number];

function LogoRow({ company, index }: { company: Company; index: number }) {
  return (
    <div className="proof-row flex h-[88px] w-full shrink-0 items-center gap-4 border-b hairline px-4 sm:h-[96px] sm:px-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${company.file}.png`}
        alt={`${company.name} logo`}
        width={40}
        height={40}
        loading="lazy"
        className="h-10 w-10 shrink-0 rounded-lg object-contain"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium leading-tight tracking-tight text-bone">
          {company.name}
        </span>
        <span className="mt-1 block truncate text-[12px] leading-tight text-[#9a9eac]">
          {company.sector}
        </span>
      </span>
      <span
        className="hidden shrink-0 text-[11px] tracking-[0.14em] text-white/35 sm:block"
        style={{ fontFamily: "var(--font-plex), monospace" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function ProofMarquee() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden border-y hairline bg-surface py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span className="text-white/50">02</span>
            <span>{proof.eyebrow}</span>
          </span>
          <h2 className="mt-7 text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
            {proof.title}{" "}
            <span className="text-accent">{proof.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px]">
            {proof.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* the ledger frame: hairline box with corner ticks, same drafting
              language as the hero and the model panel */}
          <div className="relative border hairline">
            <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

            <div className="marquee-vertical-mask grid h-[430px] grid-cols-2 sm:h-[470px]">
              {COLUMNS.map((column, ci) => (
                <div
                  key={ci}
                  className={`relative h-full overflow-hidden ${
                    ci === 0 ? "border-r hairline" : ""
                  }`}
                >
                  <div
                    className="marquee-vertical-track flex flex-col"
                    style={{
                      animationDirection: ci === 1 ? "reverse" : "normal",
                      ["--marquee-duration" as string]: DURATIONS[ci],
                    }}
                  >
                    {[...column, ...column].map((company, i) => (
                      <LogoRow
                        key={`${company.file}-${i}`}
                        company={company}
                        index={ci * PER_COLUMN + (i % PER_COLUMN)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
