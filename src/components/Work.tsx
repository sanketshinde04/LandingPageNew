import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { work } from "@/lib/content";

/* wide and half set the diagram beside the copy; narrow sets it underneath.
   No frame around it either way — a bordered panel reads as a second
   compartment bolted onto the card rather than as part of it. */
const LAYOUT = {
  wide: {
    cell: "lg:col-span-4",
    card: "lg:flex-row lg:items-center",
    panel: "lg:w-[38%] lg:max-w-[300px]",
  },
  half: {
    cell: "lg:col-span-3",
    card: "lg:flex-row lg:items-center",
    panel: "lg:w-[42%] lg:max-w-[240px]",
  },
  narrow: {
    cell: "lg:col-span-2",
    card: "",
    panel: "mx-auto w-full max-w-[210px]",
  },
} as const;

export default function Work() {
  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{work.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {work.title}{" "}
            <span className="serif-accent text-accent">{work.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-white/65">
            {work.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {work.projects.map((project, i) => {
            const layout = LAYOUT[project.size];
            return (
              <Reveal
                key={project.title}
                delay={(i % 2) * 0.08}
                className={`${layout.cell} h-full`}
              >
                <article
                  className={`glass group flex h-full flex-col justify-center gap-6 rounded-[20px] p-7 transition-all duration-500 hover:!border-accent/25 hover:!bg-white/[0.08] ${layout.card}`}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="inline-flex w-fit rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {project.sector}
                    </span>

                    <h3 className="mt-4 text-[clamp(1.35rem,1.9vw,1.6rem)] font-medium leading-tight tracking-tight text-white">
                      {project.title}
                    </h3>

                    <ul className="mt-5 space-y-2">
                      {project.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[13.5px] leading-relaxed text-white/70"
                        >
                          <span className="mt-[3px] font-mono text-[10px] text-accent">
                            ✓
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`mt-auto flex shrink-0 items-center justify-center lg:mt-0 lg:self-center ${layout.panel}`}
                  >
                    <ProjectVisual
                      name={project.visual}
                      className="h-auto w-full opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
