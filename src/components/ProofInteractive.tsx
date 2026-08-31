"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ProofThumbnailKind } from "@/lib/proofContent";

const views = {
  sql: {
    label: "Enterprise SQL RAG",
    prompt: "A question becomes a trusted answer.",
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
} satisfies Record<ProofThumbnailKind, {
  label: string;
  prompt: string;
  steps: { label: string; detail: string; stat: string }[];
}>;

function SqlDiagram({ active }: { active: number }) {
  return (
    <div className="relative mx-auto flex h-[230px] max-w-[540px] items-center justify-between gap-3 px-3 sm:px-8">
      <div className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2 bg-white/15" />
      {["question", "context", "answer"].map((label, index) => {
        const selected = index === active;
        return (
          <motion.div
            key={label}
            animate={{ y: selected ? -6 : 0, opacity: selected ? 1 : 0.55 }}
            className={`relative z-10 grid h-[92px] w-[102px] place-items-center rounded-xl border text-center transition-colors duration-300 sm:h-[110px] sm:w-[132px] ${
              selected ? "border-accent/70 bg-accent/[0.12]" : "border-white/15 bg-[#0d1727]"
            }`}
          >
            <div>
              <div className={`mx-auto mb-3 h-2 w-2 rounded-full ${selected ? "bg-accent shadow-[0_0_14px_rgba(79,140,255,0.9)]" : "bg-white/35"}`} />
              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/60">{label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function InterviewerDiagram({ active }: { active: number }) {
  return (
    <div className="relative mx-auto flex h-[230px] max-w-[540px] items-center justify-between gap-3 px-3 sm:px-8">
      <div className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2 bg-white/15" />
      {["voice", "reasoning", "evidence"].map((label, index) => {
        const selected = index === active;
        return (
          <motion.div
            key={label}
            animate={{ scale: selected ? 1.05 : 1, opacity: selected ? 1 : 0.55 }}
            className={`relative z-10 grid h-[92px] w-[102px] place-items-center rounded-full border text-center transition-colors duration-300 sm:h-[110px] sm:w-[132px] ${
              selected ? "border-accent/70 bg-accent/[0.12]" : "border-white/15 bg-[#0d1727]"
            }`}
          >
            <div>
              <div className="mb-3 flex h-5 items-end justify-center gap-1">
                {[10, 18, 26, 14, 22].map((height, barIndex) => (
                  <motion.span
                    key={barIndex}
                    animate={{ height: selected ? height : 9 }}
                    className={`w-1 rounded-full ${selected ? "bg-accent" : "bg-white/35"}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/60">{label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function LearningDiagram({ active }: { active: number }) {
  return (
    <div className="relative mx-auto flex h-[230px] max-w-[540px] items-center justify-between gap-3 px-3 sm:px-8">
      <div className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2 bg-white/15" />
      {["identity", "teacher", "autonomy"].map((label, index) => {
        const selected = index === active;
        return (
          <motion.div
            key={label}
            animate={{ y: selected ? -6 : 0, opacity: selected ? 1 : 0.55 }}
            className={`relative z-10 grid h-[92px] w-[102px] place-items-center rounded-xl border text-center transition-colors duration-300 sm:h-[110px] sm:w-[132px] ${
              selected ? "border-accent/70 bg-accent/[0.12]" : "border-white/15 bg-[#0d1727]"
            }`}
          >
            <div>
              <div className="mx-auto mb-3 grid h-5 w-5 grid-cols-3 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
                  <span key={dot} className={`h-1.5 w-1.5 rounded-full ${selected && dot <= index * 3 + 2 ? "bg-accent" : "bg-white/30"}`} />
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/60">{label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProofInteractive({ kind }: { kind: ProofThumbnailKind }) {
  const [active, setActive] = useState(0);
  const view = views[kind];

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Interactive system view</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">Click a stage to explore</span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="px-5 pt-6 md:px-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{view.label}</p>
            <h2 className="mt-3 text-[clamp(1.45rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em] text-white">{view.prompt}</h2>
          </div>
          {kind === "sql" && <SqlDiagram active={active} />}
          {kind === "interviewer" && <InterviewerDiagram active={active} />}
          {kind === "learning" && <LearningDiagram active={active} />}
        </div>

        <div className="flex flex-col p-5 md:p-7">
          <div className="space-y-2">
            {view.steps.map((step, index) => (
              <button
                key={step.label}
                type="button"
                onClick={() => setActive(index)}
                className={`flex w-full items-center justify-between gap-4 border-b py-3 text-left transition-colors duration-300 ${
                  active === index ? "border-accent/50 text-white" : "border-white/10 text-white/45 hover:text-white/75"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] ${active === index ? "text-accent" : "text-white/25"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm">{step.label}</span>
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${active === index ? "bg-accent" : "bg-white/20"}`} />
              </button>
            ))}
          </div>

          <motion.div
            key={`${kind}-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-auto pt-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{view.steps[active].stat}</span>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">{view.steps[active].detail}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
