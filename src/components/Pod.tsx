import Reveal from "@/components/Reveal";
import { pod } from "@/lib/content";

export default function Pod() {
  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{pod.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {pod.title}{" "}
            <span className="serif-accent text-accent">{pod.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-white/65">
            {pod.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pod.roles.map((role, i) => (
            <Reveal key={role.tag} delay={i * 0.1} className="h-full">
              <div className="glass h-full rounded-[24px] p-8 transition-all duration-500 hover:!border-accent/25 hover:!bg-white/[0.08]">
                <span className="inline-flex w-fit rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  {role.tag}
                </span>
                <h3 className="mt-5 text-[22px] font-medium tracking-tight text-white">
                  {role.title}
                </h3>
                <p className="mt-3.5 text-[15.5px] leading-relaxed text-white/65">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
