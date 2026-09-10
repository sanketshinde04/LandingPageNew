"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ProofThumbnailKind } from "@/lib/proofContent";

const mono = "font-mono text-[9.5px] uppercase tracking-[0.16em]";

const views = {
  sql: {
    label: "Enterprise SQL RAG",
    prompt: "A question becomes a trusted answer.",
    nodes: ["question", "context", "answer"],
    steps: [
      {
        label: "Business terms",
        detail: "Approved definitions keep words like “best” from becoming a guess.",
        stat: "Semantics first",
      },
      {
        label: "Relevant schema",
        detail: "Only the entities and fields needed for the current question reach the model.",
        stat: "Less context · less cost",
      },
      {
        label: "Validated answer",
        detail: "The final business answer is checked against a controlled evaluation set.",
        stat: "~95% end-to-end",
      },
    ],
  },
  interviewer: {
    label: "Realtime AI interviewer",
    prompt: "A conversation that keeps its rhythm.",
    nodes: ["voice", "reasoning", "evidence"],
    steps: [
      {
        label: "Listen",
        detail: "Voice is treated as a continuous interaction, not a queue of isolated requests.",
        stat: "Low-latency loop",
      },
      {
        label: "Adapt",
        detail: "Candidate context and role context shape the next question in real time.",
        stat: "Context-aware",
      },
      {
        label: "Defend",
        detail: "Code execution and conversation evidence come together in the final signal.",
        stat: "Evidence-backed",
      },
    ],
  },
  learning: {
    label: "Agentic learning system",
    prompt: "A system that amplifies the teacher.",
    nodes: ["identity", "teacher", "autonomy"],
    steps: [
      {
        label: "Learning identity",
        detail: "Diagnostics and progress create a continuously updated picture of the learner.",
        stat: "9 learner stages",
      },
      {
        label: "Teacher leverage",
        detail: "Homework review, briefings, and summaries reduce repetitive work without removing judgment.",
        stat: "30+ capabilities",
      },
      {
        label: "Earn autonomy",
        detail: "Adaptive and autonomous support only appears after the right evaluation bar exists.",
        stat: "Safety before scale",
      },
    ],
  },
} satisfies Record<
  ProofThumbnailKind,
  {
    label: string;
    prompt: string;
    nodes: string[];
    steps: { label: string; detail: string; stat: string }[];
  }
>;

/* ------------------------------------------------------------------ *
   The glyph inside each node: a pulse for the SQL flow, a level meter for
   voice, a 3x3 mastery grid for learning. Kept monochrome with the accent
   only on the selected node — blue is a signal, not atmosphere.
 * ------------------------------------------------------------------ */
function NodeGlyph({
  kind,
  index,
  selected,
}: {
  kind: ProofThumbnailKind;
  index: number;
  selected: boolean;
}) {
  if (kind === "interviewer") {
    return (
      <div className="mb-3 flex h-5 items-end justify-center gap-1">
        {[10, 18, 26, 14, 22].map((height, i) => (
          <motion.span
            key={i}
            animate={{ height: selected ? height : 8 }}
            transition={{ duration: 0.35 }}
            className={`w-[3px] ${selected ? "bg-accent" : "bg-white/30"}`}
          />
        ))}
      </div>
    );
  }
  if (kind === "learning") {
    return (
      <div className="mx-auto mb-3 grid h-5 w-5 grid-cols-3 gap-[3px]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
          <span
            key={dot}
            className={`h-[5px] w-[5px] rounded-[1px] ${
              selected && dot <= index * 3 + 2 ? "bg-accent" : "bg-white/25"
            }`}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className={`mx-auto mb-3 h-[7px] w-[7px] rounded-[1.5px] ${
        selected ? "bg-accent" : "bg-white/30"
      }`}
    />
  );
}

function Diagram({
  kind,
  nodes,
  active,
  onPick,
}: {
  kind: ProofThumbnailKind;
  nodes: string[];
  active: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="relative mx-auto flex h-[220px] max-w-[540px] items-center justify-between gap-3 px-4 sm:px-8">
      {/* the wire, dashed like a drawing */}
      <div
        className="absolute left-[16%] right-[16%] top-1/2 h-px -translate-y-1/2"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(151,163,201,0.4) 0 4px, transparent 4px 10px)",
          backgroundSize: "10px 1px",
        }}
        aria-hidden
      />
      {nodes.map((label, index) => {
        const selected = index === active;
        return (
          <motion.button
            key={label}
            type="button"
            onClick={() => onPick(index)}
            aria-pressed={selected}
            animate={{ y: selected ? -6 : 0, opacity: selected ? 1 : 0.6 }}
            className={`relative z-10 grid h-[92px] w-[102px] place-items-center border bg-base text-center transition-colors duration-300 sm:h-[108px] sm:w-[132px] ${
              selected ? "border-accent" : "hairline hover:border-[rgba(151,163,201,0.35)]"
            }`}
          >
            <span
              className={`${mono} absolute left-2 top-1.5 ${
                selected ? "text-accent" : "text-white/25"
              }`}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <NodeGlyph kind={kind} index={index} selected={selected} />
              <span className={`${mono} ${selected ? "text-bone" : "text-white/55"}`}>
                {label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ProofInteractive({ kind }: { kind: ProofThumbnailKind }) {
  const [active, setActive] = useState(0);
  const view = views[kind];

  return (
    <div className="relative border hairline">
      <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
      <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
      <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
      <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b hairline px-5 py-4 md:px-7">
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          <span>System view</span>
        </span>
        <span className={`${mono} text-white/35`}>Pick a stage</span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b hairline lg:border-b-0 lg:border-r">
          <div className="px-5 pt-6 md:px-7">
            <p className={`${mono} text-white/40`}>{view.label}</p>
            <h2 className="mt-3 text-[clamp(1.45rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.025em] text-bone">
              {view.prompt}
            </h2>
          </div>
          <Diagram kind={kind} nodes={view.nodes} active={active} onPick={setActive} />
        </div>

        <div className="flex flex-col bg-surface/40 p-5 md:p-7">
          <div className="border-t hairline">
            {view.steps.map((step, index) => {
              const on = active === index;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between gap-4 border-b hairline py-3.5 text-left transition-colors duration-300 ${
                    on ? "text-bone" : "text-white/45 hover:text-bone/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-[7px] w-[7px] rounded-[1.5px] transition-colors duration-300 ${
                        on ? "bg-accent" : "bg-white/20"
                      }`}
                      aria-hidden
                    />
                    <span className={`${mono} ${on ? "text-accent" : "text-white/30"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] font-medium">{step.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={`${kind}-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-auto pt-7"
          >
            <span className={`${mono} text-accent`}>{view.steps[active].stat}</span>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#9a9eac]">
              {view.steps[active].detail}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
