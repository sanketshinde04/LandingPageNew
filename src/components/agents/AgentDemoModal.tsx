"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EnterpriseAgent } from "@/lib/agentCatalogData";
import ConnectorLogo from "@/components/logos/ConnectorLogo";

interface AgentDemoModalProps {
  agent: EnterpriseAgent | null;
  onClose: () => void;
}

type SimulationStep = "idle" | "rbac" | "retrieval" | "guardrails" | "completed";

export default function AgentDemoModal({ agent, onClose }: AgentDemoModalProps) {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [step, setStep] = useState<SimulationStep>("idle");
  const [activeTab, setActiveTab] = useState<"output" | "citations" | "telemetry">("output");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (agent) {
      setCurrentPrompt(agent.demo.prompt);
      setStep("idle");
      setActiveTab("output");
    }
  }, [agent]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!agent) return null;

  const handleRunSimulation = () => {
    setStep("rbac");
    setTimeout(() => {
      setStep("retrieval");
    }, 450);
    setTimeout(() => {
      setStep("guardrails");
    }, 950);
    setTimeout(() => {
      setStep("completed");
    }, 1450);
  };

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(agent.demo.synthesizedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#080d1a] shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Live Agent Sandbox
              </span>
              <span className="text-zinc-500">·</span>
              <span className="font-mono text-xs text-zinc-300">
                {agent.department}
              </span>
            </div>
            <h2 className="mt-0.5 text-lg sm:text-xl font-semibold text-white tracking-tight">
              {agent.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-md border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-zinc-300">
              VPC Air-Gapped
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Query & Execution Bar */}
          <div className="rounded-xl border border-white/15 bg-[#0b1122] p-5 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="demo-prompt" className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                Test Inquiry / Operational Prompt:
              </label>
              <button
                type="button"
                onClick={() => setCurrentPrompt(agent.demo.prompt)}
                className="font-mono text-xs text-accent hover:underline"
              >
                Reset to default scenario
              </button>
            </div>
            <textarea
              id="demo-prompt"
              rows={3}
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#060a14] p-3.5 font-sans text-sm sm:text-base text-white placeholder-zinc-500 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <span className="font-mono text-xs text-zinc-400 font-medium">Connectors:</span>
                {agent.keyConnectors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-200"
                  >
                    <ConnectorLogo name={c} className="h-4 w-4 shrink-0" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={step !== "idle" && step !== "completed"}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-lg disabled:opacity-50"
              >
                {step === "idle" || step === "completed" ? (
                  <>
                    <span>Run Agent in Sandbox</span>
                    <span>&rarr;</span>
                  </>
                ) : (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                    <span>Executing Pipeline...</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Execution Pipeline Stepper */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              {/* Step 1: RBAC */}
              <div
                className={`rounded-lg p-2.5 border transition-all ${
                  step === "rbac"
                    ? "border-accent bg-accent/10 text-accent font-semibold"
                    : step === "retrieval" || step === "guardrails" || step === "completed"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 text-zinc-500"
                }`}
              >
                <div className="text-[10px] uppercase">01 · Authorization</div>
                <div className="mt-1 font-medium truncate">RBAC & VPC Check</div>
              </div>

              {/* Step 2: Vector Retrieval */}
              <div
                className={`rounded-lg p-2.5 border transition-all ${
                  step === "retrieval"
                    ? "border-accent bg-accent/10 text-accent font-semibold"
                    : step === "guardrails" || step === "completed"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 text-zinc-500"
                }`}
              >
                <div className="text-[10px] uppercase">02 · Search</div>
                <div className="mt-1 font-medium truncate">Hybrid Vector RAG</div>
              </div>

              {/* Step 3: Guardrail Check */}
              <div
                className={`rounded-lg p-2.5 border transition-all ${
                  step === "guardrails"
                    ? "border-accent bg-accent/10 text-accent font-semibold"
                    : step === "completed"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 text-zinc-500"
                }`}
              >
                <div className="text-[10px] uppercase">03 · Guardrails</div>
                <div className="mt-1 font-medium truncate">Policy & PII Shield</div>
              </div>

              {/* Step 4: Synthesis */}
              <div
                className={`rounded-lg p-2.5 border transition-all ${
                  step === "completed"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-white/5 text-zinc-500"
                }`}
              >
                <div className="text-[10px] uppercase">04 · Delivery</div>
                <div className="mt-1 font-medium truncate">Verified Output</div>
              </div>
            </div>
          </div>

          {/* Live Output & Evidence Tabs */}
          <div className="rounded-xl border border-white/15 bg-[#0a1020] overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-black/20">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("output")}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    activeTab === "output"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Synthesized Answer & Action
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("citations")}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    activeTab === "citations"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Source Citations ({agent.demo.sourceDocs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("telemetry")}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    activeTab === "telemetry"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Telemetry & Guardrails
                </button>
              </div>

              {activeTab === "output" && (
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  {copied ? (
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  ) : (
                    <span>Copy Response</span>
                  )}
                </button>
              )}
            </div>

            {/* Tab Content Area */}
            <div className="p-5 sm:p-6 min-h-[220px]">
              <AnimatePresence mode="wait">
                {activeTab === "output" && (
                  <motion.div
                    key="tab-output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] px-3.5 py-2 flex items-center justify-between font-mono text-xs text-emerald-300">
                      <span>Deterministic Validation: PASS</span>
                      <span>Confidence: {agent.demo.telemetry.confidence} · Groundedness: {agent.demo.telemetry.groundednessScore}</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-zinc-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                      {agent.demo.synthesizedOutput}
                    </div>
                  </motion.div>
                )}

                {activeTab === "citations" && (
                  <motion.div
                    key="tab-citations"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-xs font-mono text-zinc-400">
                      Verified contextual passages retrieved from customer-authorized data lake:
                    </p>
                    {agent.demo.sourceDocs.map((doc, idx) => (
                      <div
                        key={doc.title}
                        className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-semibold text-white">
                            [Doc {idx + 1}] {doc.title}
                          </span>
                          <span className="text-accent">
                            Score: {doc.relevanceScore}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-zinc-400">
                          Section: {doc.section}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-200 bg-white/[0.03] p-3 rounded-lg border border-white/5 leading-relaxed italic">
                          “{doc.excerpt}”
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "telemetry" && (
                  <motion.div
                    key="tab-telemetry"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 font-mono text-xs"
                  >
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                        <div className="text-zinc-400 uppercase text-[10px]">Retrieval Time</div>
                        <div className="mt-1 text-base font-bold text-white">{agent.demo.telemetry.retrievalMs}ms</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                        <div className="text-zinc-400 uppercase text-[10px]">Guardrail Latency</div>
                        <div className="mt-1 text-base font-bold text-white">{agent.demo.telemetry.guardrailCheckMs}ms</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                        <div className="text-zinc-400 uppercase text-[10px]">Inference & Synthesis</div>
                        <div className="mt-1 text-base font-bold text-white">{agent.demo.telemetry.synthesisMs}ms</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                        <div className="text-zinc-400 uppercase text-[10px]">End-to-End P95</div>
                        <div className="mt-1 text-base font-bold text-emerald-400">{agent.demo.telemetry.totalMs}ms</div>
                      </div>
                    </div>

                    {/* Guardrails Verification Checklist */}
                    <div>
                      <div className="font-semibold text-zinc-300 mb-2 uppercase tracking-wider text-[11px]">
                        Active Guardrail Policies Passed:
                      </div>
                      <div className="space-y-2">
                        {agent.demo.guardrailsPassed.map((guardrail) => (
                          <div
                            key={guardrail}
                            className="flex items-center gap-2.5 text-zinc-200 bg-white/[0.03] p-2.5 rounded-lg border border-white/5"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{guardrail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 bg-[#060a14] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Production SLA: <strong className="text-white">{agent.metrics[0]?.value}</strong></span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Time to Value: <strong className="text-white">{agent.effort}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#call"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-md"
            >
              Deploy This Agent
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
