import Reveal from "@/components/Reveal";
import { instructor } from "@/lib/content";

export default function Instructor() {
  return (
    <section className="border-y hairline bg-surface py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <Reveal>
          <div className="glass rounded-[28px] p-9 transition-transform duration-500 hover:scale-[1.015]">
            <span className="eyebrow !text-accent">{instructor.role}</span>
            <h3 className="mt-4 text-3xl font-medium tracking-tight text-white">
              {instructor.name}
            </h3>
            <p className="mt-1 text-[15px] text-white/55">{instructor.org}</p>
            <div className="mt-7">
              {instructor.creds.map((cred) => (
                <div
                  key={cred.k}
                  className="flex gap-4 border-t border-white/10 py-3.5 text-[15px] text-white/75"
                >
                  <span className="w-9 shrink-0 font-mono text-xs leading-6 text-accent">
                    {cred.k}
                  </span>
                  {cred.v}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <span className="eyebrow !text-accent">{instructor.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,3.8vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            {instructor.title}{" "}
            <span className="serif-accent text-accent">
              {instructor.titleAccent}
            </span>
          </h2>
          <ul className="mt-8">
            {instructor.points.map((point) => (
              <li
                key={point}
                className="flex gap-5 border-t border-white/10 py-5 text-[17px] leading-relaxed text-white/85"
              >
                <span className="font-mono text-accent">⏤</span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
