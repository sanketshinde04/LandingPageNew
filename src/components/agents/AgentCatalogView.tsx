"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ENTERPRISE_AGENTS,
  DEPARTMENTS,
  INDUSTRIES,
  OUTCOMES,
  type EnterpriseAgent,
  type AgentDepartment,
  type AgentIndustry,
  type BusinessOutcome,
} from "@/lib/agentCatalogData";
import AgentDemoModal from "./AgentDemoModal";
import ConnectorLogo from "@/components/logos/ConnectorLogo";

export default function AgentCatalogView() {
  const [selectedDepartment, setSelectedDepartment] = useState<"All Departments" | AgentDepartment>("All Departments");
  const [selectedIndustry, setSelectedIndustry] = useState<AgentIndustry>("All Industries");
  const [selectedOutcome, setSelectedOutcome] = useState<"All Outcomes" | BusinessOutcome>("All Outcomes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDemoAgent, setActiveDemoAgent] = useState<EnterpriseAgent | null>(null);

  const filteredAgents = useMemo(() => {
    return ENTERPRISE_AGENTS.filter((agent) => {
      const matchDept =
        selectedDepartment === "All Departments" || agent.department === selectedDepartment;
      const matchInd =
        selectedIndustry === "All Industries" || agent.industries.includes(selectedIndustry);
      const matchOutcome =
        selectedOutcome === "All Outcomes" || agent.outcome === selectedOutcome;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchDept && matchInd && matchOutcome;

      const matchQuery =
        agent.title.toLowerCase().includes(query) ||
        agent.shortDescription.toLowerCase().includes(query) ||
        agent.department.toLowerCase().includes(query) ||
        agent.industries.some((i) => i.toLowerCase().includes(query)) ||
        agent.keyConnectors.some((c) => c.toLowerCase().includes(query)) ||
        agent.outcome.toLowerCase().includes(query);

      return matchDept && matchInd && matchOutcome && matchQuery;
    });
  }, [selectedDepartment, selectedIndustry, selectedOutcome, searchQuery]);

  return (
    <div className="space-y-16">
      {/* Interactive Compounding Value Journey (Squirro Inspired) */}
      <section className="rounded-3xl border border-white/15 bg-[#090f1f] p-8 sm:p-10 md:p-12 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              The Compounding Adoption Journey
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Value Climbs. <span className="serif-accent">Effort Stays Low.</span>
            </h2>
          </div>
          <p className="max-w-[480px] text-sm sm:text-base text-zinc-200 leading-relaxed">
            Most enterprises rebuild the same plumbing for every AI initiative — connectors, governance, retrieval, audit.
            Our agents share one foundation: <strong className="text-white">connect once, govern once, reuse everywhere</strong>.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 transition-all hover:border-white/20 hover:bg-black/50">
            <span className="font-mono text-xs text-accent font-bold">01</span>
            <h3 className="mt-2 text-base font-semibold text-white">Solve a Real Problem First</h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Pick the business case where friction is sharpest this quarter. A specific workflow with a specific owner and a measurable number attached.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 transition-all hover:border-white/20 hover:bg-black/50">
            <span className="font-mono text-xs text-accent font-bold">02</span>
            <h3 className="mt-2 text-base font-semibold text-white">Prove ROI in Weeks</h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              From signed agreement to live users in 4–8 weeks. Measurable cost reduction and time savings before next budget conversations.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 transition-all hover:border-white/20 hover:bg-black/50">
            <span className="font-mono text-xs text-accent font-bold">03</span>
            <h3 className="mt-2 text-base font-semibold text-white">Add the Next Use Case</h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              The second agent inherits connectors, IAM governance, and guardrails from the first. Faster to deploy because it doesn&apos;t start from zero.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 transition-all hover:border-white/20 hover:bg-black/50">
            <span className="font-mono text-xs text-accent font-bold">04</span>
            <h3 className="mt-2 text-base font-semibold text-white">Compound Across the Firm</h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Assemble a connected enterprise intelligence layer, use case by use case, where business value accelerates with every new agent.
            </p>
          </div>
        </div>

        {/* Live Metrics Proof Ribbon */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8 font-mono text-xs">
          <div>
            <div className="text-zinc-400 uppercase tracking-wider text-[11px]">Ready-to-Deploy</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-white">14 Agents</div>
          </div>
          <div>
            <div className="text-zinc-400 uppercase tracking-wider text-[11px]">Time to Value</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-emerald-400">2–4 Weeks</div>
          </div>
          <div>
            <div className="text-zinc-400 uppercase tracking-wider text-[11px]">Average Time Saved</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-white">82% Reduction</div>
          </div>
          <div>
            <div className="text-zinc-400 uppercase tracking-wider text-[11px]">Deployment Model</div>
            <div className="mt-1 text-xl sm:text-2xl font-bold text-white">100% Client VPC</div>
          </div>
        </div>
      </section>

      {/* Control Bar: Multi-Facet Filters + Search */}
      <div className="space-y-6 border-b border-white/10 pb-8">
        {/* Department Filter Tabs */}
        <div>
          <div className="mb-2.5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
            Filter by Department:
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {DEPARTMENTS.map((dept) => {
              const isActive = selectedDepartment === dept;
              const count =
                dept === "All Departments"
                  ? ENTERPRISE_AGENTS.length
                  : ENTERPRISE_AGENTS.filter((a) => a.department === dept).length;

              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs sm:text-[13px] font-medium tracking-tight transition-all duration-200 ${
                    isActive
                      ? "bg-white text-zinc-950 font-bold shadow-md scale-[1.02]"
                      : "border border-white/15 bg-white/[0.04] text-zinc-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {dept}
                  <span className={`ml-1.5 text-xs ${isActive ? "text-zinc-600" : "text-zinc-400"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters (Industry + Outcome + Search) */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Industry Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-400 uppercase">Industry:</span>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value as AgentIndustry)}
                className="rounded-xl border border-white/20 bg-[#0c1324] px-3.5 py-2 font-mono text-xs text-white outline-none focus:border-accent"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind} className="bg-[#0c1324] text-white">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Outcome Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-400 uppercase">Outcome:</span>
              <select
                value={selectedOutcome}
                onChange={(e) => setSelectedOutcome(e.target.value as "All Outcomes" | BusinessOutcome)}
                className="rounded-xl border border-white/20 bg-[#0c1324] px-3.5 py-2 font-mono text-xs text-white outline-none focus:border-accent"
              >
                {OUTCOMES.map((out) => (
                  <option key={out} value={out} className="bg-[#0c1324] text-white">
                    {out}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by agent, connector, or SLA..."
              className="w-full rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2.5 pl-10 text-sm text-white placeholder-zinc-400 outline-none transition-all focus:border-accent focus:bg-white/[0.08]"
            />
            <svg
              className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 font-mono text-xs font-bold text-zinc-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Status Counter */}
      <div className="flex items-center justify-between font-mono text-xs sm:text-[13px] uppercase tracking-[0.16em] text-zinc-300">
        <span>
          Showing {filteredAgents.length} of {ENTERPRISE_AGENTS.length} ready-to-deploy agents
        </span>
        <span className="hidden sm:inline">Zero Rip-and-Replace &middot; Handover of 100% Code</span>
      </div>

      {/* Agent Catalog Grid */}
      {filteredAgents.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-16 text-center">
          <p className="text-base sm:text-lg text-zinc-200">
            No agents found matching “<span className="text-white font-semibold">{searchQuery}</span>”.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDepartment("All Departments");
              setSelectedIndustry("All Industries");
              setSelectedOutcome("All Outcomes");
              setSearchQuery("");
            }}
            className="mt-5 rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 font-mono text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.15] transition-colors"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <article
              key={agent.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-[#0b1120] p-7 sm:p-8 transition-all duration-300 hover:border-white/35 hover:bg-[#0e1628] shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.14em]">
                  <span className="text-accent font-bold">{agent.department}</span>
                  <span className="text-zinc-300 font-medium">{agent.effort}</span>
                </div>

                {/* Outcome & SLA Bar */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.14] bg-[#070c18] px-4 py-3 shadow-inner">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    {agent.outcome}
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] font-bold text-white tracking-tight">
                    {agent.metrics[0]?.value}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl sm:text-[22px] font-semibold leading-[1.3] tracking-tight text-white group-hover:text-accent transition-colors">
                  {agent.title}
                </h3>

                {/* Short Description */}
                <p className="mt-4 text-base sm:text-[16.5px] font-normal leading-[1.7] text-zinc-100">
                  {agent.shortDescription}
                </p>

                {/* Key Connectors */}
                <div className="mt-6">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2.5 font-medium">
                    Pre-built Connectors:
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                    {agent.keyConnectors.map((connector) => (
                      <span
                        key={connector}
                        className="inline-flex items-center gap-2 font-mono text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                      >
                        <ConnectorLogo name={connector} className="h-4 w-4 shrink-0" />
                        <span>{connector}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/[0.12] space-y-3">
                {/* Live Demo Trigger */}
                <button
                  type="button"
                  onClick={() => setActiveDemoAgent(agent)}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-5 py-3.5 font-mono text-xs sm:text-[13.5px] uppercase tracking-[0.14em] font-bold text-zinc-950 transition-all duration-200 hover:bg-accent hover:shadow-lg group/btn"
                >
                  <span>Try Live Agent Demo</span>
                  <span className="text-base font-bold transition-transform duration-200 group-hover/btn:translate-x-1">
                    &rarr;
                  </span>
                </button>

                {/* Architecture Link if Available */}
                {agent.caseStudyId && (
                  <Link
                    href={`/proof/${agent.caseStudyId}`}
                    className="flex items-center justify-center font-mono text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white py-1 transition-colors"
                  >
                    View Underlying System Architecture &rarr;
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Live Demo Modal Dialog */}
      <AgentDemoModal
        agent={activeDemoAgent}
        onClose={() => setActiveDemoAgent(null)}
      />
    </div>
  );
}
