import Reveal from "@/components/Reveal";
import { proof } from "@/lib/content";

/**
 * The trust section. Logos are in full colour and the names are set large —
 * a greyscale strip reads as decoration, and this has to read as evidence.
 */
export default function ProofMarquee() {
  return (
    <section className="border-y hairline bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[720px]">
          <span className="eyebrow !text-accent">{proof.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {proof.title}{" "}
            <span className="serif-accent text-accent">{proof.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-white/60">
            {proof.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {proof.companies.map((company) => (
              <li
                key={company.name}
                className="glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 hover:!border-accent/25 hover:!bg-white/[0.08]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${company.file}.png`}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  aria-hidden
                  className="h-10 w-10 shrink-0 rounded-lg object-contain"
                />
                <span className="min-w-0 truncate text-[17px] font-medium tracking-tight text-white">
                  {company.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </section>
  );
}
