import { proof } from "@/lib/content";

export default function ProofMarquee() {
  const row = [...proof.companies, ...proof.companies];
  return (
    <section className="border-y hairline bg-surface py-10">
      <p className="eyebrow text-center">{proof.label}</p>
      <div className="marquee-mask mt-7 overflow-hidden">
        <div className="marquee-track items-center gap-14 pr-14">
          {row.map((company, i) => (
            <span
              key={`${company.name}-${i}`}
              className="group flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${company.file}.png`}
                alt=""
                width={26}
                height={26}
                loading="lazy"
                aria-hidden
                className="h-[26px] w-[26px] shrink-0 rounded-[5px] object-contain opacity-45 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="text-lg font-medium text-white/35 transition-colors duration-300 group-hover:text-accent">
                {company.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
