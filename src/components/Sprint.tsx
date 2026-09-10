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
    <section id="sprint" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="max-w-[760px]">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span className="text-white/50">06</span>
            <span>{sprint.eyebrow}</span>
          </span>
          <h2 className="mt-7 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
            {sprint.title}{" "}
            <span className="text-accent">{sprint.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px]">
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
              {/* the rail is a ruled panel like the model section: hairline
                  box, corner ticks, no glass */}
              <div className="relative border hairline bg-surface/40 p-7">
                <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
                <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
                <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
                <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

                <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="text-white/40">Progress</span>
                  <span ref={readoutRef} className="tabular-nums text-accent">
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
                    {/* ruled ground behind the curve */}
                    {[60, 120, 180, 240].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2={VIEW_W}
                        y1={y}
                        y2={y}
                        stroke="rgba(151,163,201,0.12)"
                        strokeDasharray="2 6"
                      />
                    ))}
                    <line
                      x1="0"
                      x2={VIEW_W}
                      y1={VIEW_H - 1}
                      y2={VIEW_H - 1}
                      stroke="rgba(151,163,201,0.28)"
                    />
                    <path
                      d="M12 268 C 92 264, 122 238, 162 208 S 252 158, 292 118 S 390 58, 448 26"
                      stroke="rgba(151,163,201,0.18)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      ref={pathRef}
                      d="M12 268 C 92 264, 122 238, 162 208 S 252 158, 292 118 S 390 58, 448 26"
                      stroke="#5a8dde"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ willChange: "stroke-dashoffset" }}
                    />
                  </svg>
                  <span
                    ref={dotRef}
                    style={{ willChange: "transform" }}
                    className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 rounded-[2px] bg-accent shadow-[0_0_0_4px_rgba(90,141,222,0.18)]"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  <span>{sprint.railStart}</span>
                  <span className="text-accent">{sprint.railEnd}</span>
                </div>

                <div
                  ref={linesRef}
                  className="mt-7 flex h-6 items-end gap-1.5 border-t hairline pt-3"
                >
                  {Array.from({ length: LINE_COUNT }, (_, i) => (
                    <span
                      key={i}
                      data-line
                      className="h-full flex-1 origin-bottom bg-accent opacity-[0.13] transition-[opacity,transform] duration-500 ease-out"
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
                className="group border-t hairline py-10 transition-[opacity,transform] duration-700 first:border-t-0 first:pt-0 data-[active=false]:translate-x-1 data-[active=false]:opacity-55 data-[active=true]:translate-x-0 data-[active=true]:opacity-100 md:py-12"
              >
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="flex items-center gap-3 text-white/40 transition-colors duration-700 group-data-[active=true]:text-accent">
                    <span
                      className="h-[7px] w-[7px] rounded-[1.5px] bg-white/20 transition-colors duration-700 group-data-[active=true]:bg-accent"
                      aria-hidden="true"
                    />
                    {stage.no}
                  </span>
                  <span className="h-px flex-1 bg-[rgba(151,163,201,0.16)] transition-colors duration-700 group-data-[active=true]:bg-accent/40" />
                  <span className="text-white/40">{stage.days}</span>
                </div>

                <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,1.95rem)] font-semibold leading-tight tracking-[-0.02em] text-bone">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-[#9a9eac]">
                  {stage.line}
                </p>

                <ul className="mt-6 border-t hairline">
                  {stage.marks.map((mark) => (
                    <li
                      key={mark}
                      className="flex items-center gap-3.5 border-b hairline py-3 text-[15px] text-bone/85"
                    >
                      <span className="font-mono text-xs text-accent" aria-hidden="true">
                        ✓
                      </span>
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
