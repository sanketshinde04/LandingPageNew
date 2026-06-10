import { proof } from "@/lib/content";

export default function ProofMarquee() {
  const row = [...proof.names, ...proof.names];
  return (
    <section className="border-y hairline bg-surface py-10">
      <p className="eyebrow text-center">{proof.label}</p>
      <div className="marquee-mask mt-7 overflow-hidden">
        <div className="marquee-track items-center gap-16 pr-16">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-xl font-medium text-white/35 transition-colors duration-300 hover:text-accent"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
