"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sprint } from "@/lib/content";

const LINE_COUNT = 14;
/** path samples taken once at mount, so no geometry work happens while scrolling */
const SAMPLES = 320;
const VIEW_W = 460;
const VIEW_H = 300;
/** the rail never parks closer to the top of the window than this */
const MIN_STICKY_TOP = 96;

/**
 * The rail on the left draws itself as the steps scroll past on the right.
 * Everything expensive — path sampling, element measuring — is done once and
 * cached; the scroll handler only writes a transform and a dash offset.
 */
export default function Sprint() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!body || !path || !svg || !dot) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // sample the curve once — getPointAtLength is far too slow to call per frame
    const points = new Float32Array(SAMPLES * 2);
    for (let i = 0; i < SAMPLES; i++) {
      const p = path.getPointAtLength((length * i) / (SAMPLES - 1));
      points[i * 2] = p.x;
      points[i * 2 + 1] = p.y;
    }

    const lines = Array.from(
      linesRef.current?.querySelectorAll<HTMLSpanElement>("[data-line]") ?? []
    );
    const steps = Array.from(
      stepsRef.current?.querySelectorAll<HTMLLIElement>("[data-step]") ?? []
    );

    // cached, refreshed on resize rather than read during the scroll
    let scaleX = 1;
    let scaleY = 1;
    let viewportH = 1;
    let distance = 1;
    let stepOffsets: number[] = [];
    let stickyTop = MIN_STICKY_TOP;
    let railH = 0;

    const measure = () => {
      const box = svg.getBoundingClientRect();
      scaleX = box.width / VIEW_W;
      scaleY = box.height / VIEW_H;
      viewportH = window.innerHeight;

      /* park the rail in the middle of the window rather than near the top, so
         it holds still while the steps move past it. Setting `top` instead of
         translating keeps it in the right place before it starts sticking. */
      const rail = railRef.current;
      if (rail) {
        railH = rail.offsetHeight;
        stickyTop = Math.max(MIN_STICKY_TOP, (viewportH - railH) / 2);
        rail.style.top = `${stickyTop}px`;
      }
      // each step's offset inside the scrolled block, so activation can follow
      // where a step actually sits on screen instead of a flat quarter-split
      const bodyTop = body.getBoundingClientRect().top;
      stepOffsets = steps.map((el) => el.getBoundingClientRect().top - bodyTop);
    };
    measure();

    // remembered so we only touch the DOM when a value actually changes
    let lastLit = -1;
    let lastStep = -1;
    let lastPercent = -1;

    const apply = (progress: number) => {
      const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;

      path.style.strokeDashoffset = String(length * (1 - p));

      // interpolate between the two nearest samples
      const t = p * (SAMPLES - 1);
      const i = Math.min(SAMPLES - 2, Math.floor(t));
      const f = t - i;
      const x = points[i * 2] + (points[i * 2 + 2] - points[i * 2]) * f;
      const y = points[i * 2 + 1] + (points[i * 2 + 3] - points[i * 2 + 1]) * f;
      dot.style.transform = `translate3d(${x * scaleX}px, ${y * scaleY}px, 0) translate(-50%, -50%)`;

      const lit = Math.round(p * LINE_COUNT);
      if (lit !== lastLit) {
        lines.forEach((line, n) => {
          const on = n < lit;
          line.style.opacity = on ? "1" : "0.13";
          line.style.transform = `scaleY(${on ? 1 : 0.32})`;
        });
        lastLit = lit;
      }

      // where the block sits right now, derived from progress rather than read
      const bodyTopNow = stickyTop - p * distance;
      const activationLine = viewportH * 0.62;
      let step = 0;
      for (let n = 0; n < stepOffsets.length; n++) {
        if (bodyTopNow + stepOffsets[n] < activationLine) step = n;
      }
      if (step !== lastStep) {
        steps.forEach((el, n) => {
          el.dataset.active = n <= step ? "true" : "false";
        });
        lastStep = step;
      }

      const percent = Math.round(p * 100);
      if (percent !== lastPercent && readoutRef.current) {
        readoutRef.current.textContent = `${percent}%`;
        lastPercent = percent;
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: body,
      // 0% is the moment the rail settles into the middle of the window, and
      // 100% is the last moment before it has to start moving again — so the
      // whole count happens while the rail is holding still
      start: () => `top top+=${stickyTop}`,
      end: () => `bottom top+=${stickyTop + railH}`,
      scrub: 1,
      invalidateOnRefresh: true,
      // measured before ScrollTrigger resolves start/end, so they use this pass
      onRefreshInit: () => measure(),
      onRefresh: (self) => {
        distance = Math.max(1, self.end - self.start);
        apply(self.progress);
      },
      onUpdate: (self) => apply(self.progress),
    });

    const observer = new ResizeObserver(() => {
      measure();
      apply(trigger.progress);
    });
    observer.observe(svg);

    apply(0);
    return () => {
      observer.disconnect();
      trigger.kill();
    };
  }, []);

  return (
    <section id="sprint" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow !text-accent">{sprint.eyebrow}</span>
          <h2 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {sprint.title}{" "}
            <span className="serif-accent text-accent">
              {sprint.titleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-base leading-relaxed text-white/65 md:text-lg">
            {sprint.sub}
          </p>
        </Reveal>

        <div
          ref={bodyRef}
          className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-[0.86fr_1.14fr] md:gap-16"
        >
          {/* ---------- left: the rail ---------- */}
          <div className="hidden md:block">
            <div ref={railRef} className="sticky" style={{ top: MIN_STICKY_TOP }}>
              <div className="glass rounded-[24px] p-7">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow !text-[10px]">Progress</span>
                  <span
                    ref={readoutRef}
                    className="font-mono text-sm tabular-nums text-accent"
                  >
                    0%
                  </span>
                </div>

                <div className="relative mt-5">
                  <svg
                    ref={svgRef}
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    className="w-full"
                    fill="none"
                  >
                    <path
                      d="M12 268 C 92 264, 122 238, 162 208 S 252 158, 292 118 S 390 58, 448 26"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      ref={pathRef}
                      d="M12 268 C 92 264, 122 238, 162 208 S 252 158, 292 118 S 390 58, 448 26"
                      stroke="#4f8cff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ willChange: "stroke-dashoffset" }}
                    />
                  </svg>
                  <span
                    ref={dotRef}
                    style={{ willChange: "transform" }}
                    className="pointer-events-none absolute left-0 top-0 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_5px_rgba(79,140,255,0.18),0_0_22px_rgba(79,140,255,0.7)]"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                  <span>{sprint.railStart}</span>
                  <span className="text-accent/70">{sprint.railEnd}</span>
                </div>

                <div ref={linesRef} className="mt-7 flex h-7 items-end gap-1.5">
                  {Array.from({ length: LINE_COUNT }, (_, i) => (
                    <span
                      key={i}
                      data-line
                      className="h-full flex-1 origin-bottom rounded-sm bg-accent opacity-[0.13] transition-[opacity,transform] duration-500 ease-out"
                      style={{ transform: "scaleY(0.32)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- right: the steps ---------- */}
          <ol ref={stepsRef}>
            {sprint.stages.map((stage) => (
              <li
                key={stage.no}
                data-step
                data-active="false"
                className="group border-t border-white/10 py-11 transition-opacity duration-700 first:border-t-0 first:pt-0 data-[active=false]:opacity-35 data-[active=true]:opacity-100"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-white/35 transition-colors duration-700 group-data-[active=true]:text-accent">
                    {stage.no}
                  </span>
                  <span className="h-px flex-1 bg-white/10 transition-colors duration-700 group-data-[active=true]:bg-accent/40" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {stage.days}
                  </span>
                </div>

                <h3 className="mt-5 text-[clamp(1.5rem,2.4vw,1.95rem)] font-medium leading-tight tracking-[-0.02em] text-white">
                  {stage.title}
                </h3>
                <p className="mt-2.5 max-w-[46ch] text-[16px] leading-relaxed text-white/60">
                  {stage.line}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {stage.marks.map((mark) => (
                    <li
                      key={mark}
                      className="flex items-center gap-3 text-[15px] text-white/80"
                    >
                      <span className="font-mono text-xs text-accent/70">✓</span>
                      {mark}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
