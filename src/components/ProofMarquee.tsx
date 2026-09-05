import Reveal from "@/components/Reveal";
import { AI_MARKS } from "@/lib/aiMarks";
import { proof } from "@/lib/content";

type CompanyItem = {
  name: string;
  file?: string;
  iconKey?: string;
};

/* 12 companies split into three fixed columns (4 companies each).
   Because each column carries 4 unique tiles inside the viewport,
   every logo is completely distinct in view at any given moment.
   The outer columns move upward and the centre one downward. */
const COLUMNS: CompanyItem[][] = [
  proof.companies.slice(0, 4) as CompanyItem[],
  proof.companies.slice(4, 8) as CompanyItem[],
  proof.companies.slice(8, 12) as CompanyItem[],
];

function LogoTile({ company }: { company: CompanyItem }) {
  const mark = company.iconKey
    ? AI_MARKS.find((m) => m.key === company.iconKey)
    : null;

  return (
    <div className="glass group flex w-full shrink-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 transition-colors duration-200 hover:border-accent/40 hover:bg-white/[0.06]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-1.5 transition-colors group-hover:border-accent/30 group-hover:bg-white/[0.08]">
        {mark ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-white transition-transform duration-200 group-hover:scale-105"
            aria-hidden="true"
          >
            <path d={mark.path} />
          </svg>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/logos/${company.file}.png`}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            aria-hidden="true"
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
          />
        )}
      </div>
      <span className="min-w-0 truncate text-[14.5px] font-medium tracking-tight text-white/85 transition-colors group-hover:text-white sm:text-[15px]">
        {company.name}
      </span>
    </div>
  );
}

export default function ProofMarquee() {
  return (
    <section className="overflow-hidden border-y hairline bg-surface py-20 md:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className="eyebrow !text-accent">{proof.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {proof.title}{" "}
            <span className="serif-accent text-accent">{proof.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/60 md:text-[17px]">
            {proof.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="marquee-vertical-mask grid h-[320px] grid-cols-2 gap-3 sm:h-[350px] sm:grid-cols-3 sm:gap-4">
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
                    animationDuration: ci === 1 ? "30s" : "26s",
                  }}
                >
                  {[...column, ...column, ...column].map((company, i) => (
                    <LogoTile
                      key={`${company.name}-${i}`}
                      company={company}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
