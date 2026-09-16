import Reveal from "@/components/Reveal";
import { pod } from "@/lib/content";

/** The three roles as one ruled panel: a hairline box with corner ticks,
    divided into three columns by hairlines. No rounded cards, no pills —
    the same drafting language as the rest of the page. On small screens
    the columns stack with a hairline between each. */
function RoleCell({
  role,
  index,
}: {
  role: (typeof pod.roles)[number];
  index: number;
}) {
  return (
    <div className="group flex h-full flex-col px-6 py-8 transition-colors duration-300 hover:bg-surface/60 sm:px-8 sm:py-10">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="flex items-center gap-3 text-accent">
          <span
            className="h-[7px] w-[7px] rounded-[1.5px] bg-accent"
            aria-hidden="true"
          />
          {role.tag}
        </span>
        <span className="text-white/35" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-10 max-w-[14ch] text-[clamp(1.4rem,2.1vw,1.85rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-bone sm:mt-14">
        {role.title}
      </h3>
      <p className="mt-3 max-w-[40ch] border-t hairline pt-4 text-[15px] leading-[1.6] text-[#9a9eac]">
        {role.body}
      </p>
    </div>
  );
}

export default function Pod() {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span className="text-white/50">07</span>
            <span>{pod.eyebrow}</span>
          </span>
          <h2 className="mt-7 max-w-[17ch] text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
            {pod.title}{" "}
            <span className="text-accent">{pod.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px]">
            {pod.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <div className="relative border hairline">
            <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
            <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {pod.roles.map((role, i) => (
                <div
                  key={role.tag}
                  className={`hairline ${i > 0 ? "border-t lg:border-l lg:border-t-0" : ""}`}
                >
                  <RoleCell role={role} index={i} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
