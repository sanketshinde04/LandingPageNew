import Reveal from "@/components/Reveal";
import { pod } from "@/lib/content";

function RoleCard({
  role,
  index,
  featured = false,
}: {
  role: (typeof pod.roles)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] ${
        featured ? "p-7 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <div className="relative flex items-center justify-between">
        <span className="inline-flex w-fit rounded-full border border-accent/30 bg-accent/[0.09] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {role.tag}
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-white/30">
          0{index + 1}
        </span>
      </div>

      <div className="relative mt-10 border-t border-white/10 pt-6">
        <h3 className="max-w-[16ch] text-[clamp(1.3rem,2vw,1.85rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white">
          {role.title}
        </h3>
        <p className="mt-2.5 max-w-[48ch] text-[14px] leading-[1.6] text-white/62">
          {role.body}
        </p>
      </div>
    </div>
  );
}

export default function Pod() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[820px]">
          <span className="eyebrow !text-accent">{pod.eyebrow}</span>
          <h2 className="mt-4 max-w-[17ch] text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            {pod.title}{" "}
            <span className="serif-accent text-accent">{pod.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-white/65 md:text-[16px]">
            {pod.sub}
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 md:mt-12 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-5">
          <Reveal className="h-full">
            <RoleCard role={pod.roles[0]} index={0} featured />
          </Reveal>
          {pod.roles.slice(1).map((role, i) => (
            <Reveal key={role.tag} delay={(i + 1) * 0.1} className="h-full">
              <RoleCard role={role} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
