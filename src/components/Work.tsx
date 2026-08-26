import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { work } from "@/lib/content";

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
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-white/65">
            {work.sub}
          </p>
        </Reveal>

        {/* six cards of one size. Mixed spans left the wide cards stretched to
            match the stacked narrow ones, which is where the dead space came from */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {work.projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 2) * 0.08}
              className="h-full"
            >
              <article className="glass group flex h-full flex-col gap-6 rounded-[20px] p-7 transition-all duration-500 hover:!border-accent/25 hover:!bg-white/[0.08] lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="eyebrow !text-[10px]">{project.sector}</span>

                  <h3 className="mt-4 text-[19px] font-medium tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/55">
                    {project.line}
                  </p>

                  <ul className="mt-5 space-y-1.5">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-[13px] text-white/65"
                      >
                        <span className="font-mono text-[10px] text-accent">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto w-full max-w-[280px] shrink-0 lg:mt-0 lg:w-[44%] lg:max-w-[250px]">
                  <ProjectVisual
                    name={project.visual}
                    className="h-auto w-full opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
