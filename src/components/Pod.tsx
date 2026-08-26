import Reveal from "@/components/Reveal";
import { images, pod } from "@/lib/content";

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
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-white/65">
            {pod.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pod.roles.map((role, i) => (
            <Reveal key={role.tag} delay={i * 0.12} className="h-full">
              <div className="glass h-full rounded-[28px] p-9 transition-transform duration-500 hover:scale-[1.015]">
                <span className="eyebrow !text-accent">{role.tag}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">
                  {role.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-white/65">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* framed, never a bed for text — so nothing has to survive on top of it */}
        <Reveal delay={0.1} className="mt-6">
          <figure className="relative overflow-hidden rounded-[28px] border hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.pod}
              alt="A forward-deployed engineer working alongside a client's production infrastructure"
              className="h-[240px] w-full object-cover object-center opacity-80 md:h-[340px]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/25 to-transparent" />
            <figcaption className="absolute bottom-6 left-7 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              On site, in your environment
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="eyebrow !text-accent">{pod.credsEyebrow}</span>
            <div className="mt-7 grid grid-cols-2 gap-y-10">
              {pod.creds.map((cred) => (
                <div key={cred.label}>
                  <div className="text-[clamp(2rem,3.6vw,2.8rem)] font-medium leading-none tracking-tight text-white">
                    {cred.figure}
                  </div>
                  <p className="mt-2.5 max-w-[180px] text-sm leading-relaxed text-white/55">
                    {cred.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul>
              {pod.points.map((point) => (
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
      </div>
    </section>
  );
}
