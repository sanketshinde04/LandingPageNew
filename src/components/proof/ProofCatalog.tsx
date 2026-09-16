"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProofThumbnailKind } from "@/lib/proofContent";

export interface CaseStudyItem {
  id: string;
  kind: ProofThumbnailKind;
  category: string;
  domain:
    | "Data & Retrieval"
    | "Real-Time & Latency"
    | "Security & Compliance"
    | "Compilers & Systems"
    | "Agentic Swarms & DevOps";
  slaBadge: string;
  readTime: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  stack: string[];
}

export const ALL_STORIES: CaseStudyItem[] = [
  {
    id: "sql-rag",
    kind: "sql",
    category: "Production Case Study",
    domain: "Data & Retrieval",
    slaBadge: "~95.2% Controlled Accuracy",
    readTime: "10 min read",
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy",
    thumbnail: "/case-studies/sql-rag-thumbnail.webp",
    excerpt:
      "How business semantics, cost-aware model routing, evals, and human feedback turned a text-to-SQL prototype into a production analytics engine.",
    stack: ["PostgreSQL", "RAG", "RLHF Evals", "Schema Pruning"],
  },
  {
    id: "ai-interviewer",
    kind: "interviewer",
    category: "Production Case Study",
    domain: "Real-Time & Latency",
    slaBadge: "< 300ms Round-Trip Audio",
    readTime: "10 min read",
    title: "Building a Real-Time AI Interviewer for Technical Hiring",
    thumbnail: "/case-studies/ai-interviewer-thumbnail.webp",
    excerpt:
      "Production-grade live voice interaction, contextual candidate retrieval, sandboxed live coding, and explainable scoring across 150+ engineer-days.",
    stack: ["WebRTC", "Docker Sandbox", "Live Coding", "Voice LLM"],
  },
  {
    id: "agentic-learning",
    kind: "learning",
    category: "Architecture & Strategy",
    domain: "Agentic Swarms & DevOps",
    slaBadge: "30+ Capabilities Mapped",
    readTime: "11 min read",
    title: "Designing an Agentic Learning System for 1:1 Education",
    thumbnail: "/case-studies/agentic-learning-thumbnail.webp",
    excerpt:
      "Architectural blueprint for AI-assisted 1:1 education across 9 learner stages and 30+ capabilities: teacher copilots, mastery tracking, and safe autonomy.",
    stack: ["Learner Graph", "Teacher Copilot", "Autonomy Harness", "Diagnostics"],
  },
  {
    id: "cloud-compliance",
    kind: "compliance",
    category: "Security & Cloud Architecture",
    domain: "Security & Compliance",
    slaBadge: "SOC 2 & HIPAA Zero-Toil",
    readTime: "9 min read",
    title: "Autonomous SOC 2 & HIPAA Cloud Compliance Engine",
    thumbnail: "/case-studies/cloud-compliance-thumbnail.jpg",
    excerpt:
      "Multi-cloud Terraform AST parsing, automated IAM drift detection, and continuous GitOps remediation PRs cutting audit prep from 8 weeks to zero manual overhead.",
    stack: ["Terraform AST", "GitOps PRs", "CloudTrail", "AWS / Azure / GCP"],
  },
  {
    id: "fraud-detection",
    kind: "fraud",
    category: "Real-Time Systems",
    domain: "Real-Time & Latency",
    slaBadge: "P99 < 38ms @ 14.5k QPS",
    readTime: "11 min read",
    title: "Sub-50ms Real-Time Transaction Scoring & Fraud Graph",
    thumbnail: "/case-studies/fraud-detection-thumbnail.jpg",
    excerpt:
      "A dual-tier streaming architecture combining Kafka/Flink event pipelines, Graph Neural Network subgraph clustering, and an LLM explainability layer.",
    stack: ["Kafka / Flink", "TensorRT C++", "Graph Neural Network", "In-Memory State"],
  },
  {
    id: "healthcare-claims",
    kind: "healthcare",
    category: "Healthcare & Compliance",
    domain: "Security & Compliance",
    slaBadge: "99.2% Code Precision",
    readTime: "12 min read",
    title: "Multi-Modal Clinical Intake & Automated Claims Adjudication",
    thumbnail: "/case-studies/healthcare-claims-thumbnail.jpg",
    excerpt:
      "On-premises HIPAA-compliant multi-modal pipeline ingesting clinical records, mapping codes to FHIR standards, and cutting adjudication cycles by 82%.",
    stack: ["Air-gapped VPC", "FHIR / HL7", "HIPAA Safe Harbor", "Physician-in-the-Loop"],
  },
  {
    id: "legacy-migration",
    kind: "migration",
    category: "Compilers & Systems",
    domain: "Compilers & Systems",
    slaBadge: "1.8M LOC Transpiled",
    readTime: "10 min read",
    title: "Automating Monolith to Microservices Code Migration",
    thumbnail: "/case-studies/legacy-migration-thumbnail.jpg",
    excerpt:
      "Migrating 1.8M lines of monolithic Java and COBOL banking services to modern Go/TypeScript microservices with differential fuzzing equivalence verification.",
    stack: ["COBOL / Java", "Go / TypeScript", "AST Compilers", "Differential Fuzzing"],
  },
  {
    id: "devops-incident",
    kind: "incident",
    category: "Site Reliability & DevOps",
    domain: "Agentic Swarms & DevOps",
    slaBadge: "-74% MTTR (11 mins)",
    readTime: "9 min read",
    title: "Autonomous DevOps Incident Triage & Runbook Remediation",
    thumbnail: "/case-studies/devops-incident-thumbnail.jpg",
    excerpt:
      "Observability agent swarm correlating multi-service telemetry, isolating root causes in 38s, and validating canary rollbacks before human sign-off.",
    stack: ["OpenTelemetry", "Causal DAG", "Datadog / Prometheus", "Canary Rollback"],
  },
  {
    id: "private-rag",
    kind: "privateRag",
    category: "Enterprise Knowledge & Security",
    domain: "Data & Retrieval",
    slaBadge: "10M+ Docs / 0.00% Leakage",
    readTime: "11 min read",
    title: "Zero-Trust Private RAG over 10M+ Enterprise Documents",
    thumbnail: "/case-studies/private-rag-thumbnail.jpg",
    excerpt:
      "Document-level RBAC/ABAC authorization filtering, hybrid sparse-dense vector search, and a self-corrective hallucination grader across 10M internal docs.",
    stack: ["Okta RBAC / ABAC", "Hybrid BM25 + Vector", "Self-Corrective RAG", "Re-Ranker"],
  },
  {
    id: "contract-redlining",
    kind: "contract",
    category: "Legal & Enterprise Workflows",
    domain: "Compilers & Systems",
    slaBadge: "10 Days → 45 Mins",
    readTime: "9 min read",
    title: "Autonomous Procurement & Contract Risk Playbook Redlining",
    thumbnail: "/case-studies/contract-redlining-thumbnail.jpg",
    excerpt:
      "Inbound contract review and native OpenXML tracked-changes redlining against enterprise legal playbooks, cutting procurement cycle times by 90%.",
    stack: ["Native OpenXML", "Playbook Rules", "Clause Classifier", "Word .docx"],
  },
  {
    id: "edge-telemetry",
    kind: "edge",
    category: "Edge AI & Industrial IoT",
    domain: "Real-Time & Latency",
    slaBadge: "48h Lead Time / INT8",
    readTime: "10 min read",
    title: "Edge AI Predictive Fleet Telemetry & Anomaly Detection",
    thumbnail: "/case-studies/edge-telemetry-thumbnail.jpg",
    excerpt:
      "Quantized 8-bit sensor intelligence running on edge hardware with store-and-forward sync, predicting motor and fleet failures 48 hours in advance.",
    stack: ["NVIDIA Jetson / ARM", "TensorRT INT8", "CAN Bus / Modbus", "Store-and-Forward"],
  },
  {
    id: "llm-router",
    kind: "router",
    category: "Infrastructure & FinOps",
    domain: "Data & Retrieval",
    slaBadge: "$190k/mo Saved (-63%)",
    readTime: "8 min read",
    title: "Enterprise LLM Gateway: Latency/Cost Routing & Semantic Cache",
    thumbnail: "/case-studies/llm-router-thumbnail.jpg",
    excerpt:
      "Dynamic prompt complexity cascading, Redis vector semantic caching, and sub-10ms routing decisions saving $190,000/month in frontier model inference fees.",
    stack: ["Redis Vector Cache", "44.2% Hit Rate", "Complexity Cascading", "Sub-10ms Routing"],
  },
  {
    id: "supply-chain",
    kind: "supplyChain",
    category: "Logistics & Optimization",
    domain: "Compilers & Systems",
    slaBadge: "7-Day Bottleneck Foresight",
    readTime: "11 min read",
    title: "Real-Time Global Maritime Disruption & Re-Routing Forecaster",
    thumbnail: "/case-studies/supply-chain-thumbnail.jpg",
    excerpt:
      "Ingesting satellite AIS vessel feeds, weather telemetry, and manifests to predict port dwell times 7 days ahead and solve multi-echelon container re-routing.",
    stack: ["Satellite AIS", "Mixed-Integer LP", "Customs Manifests", "450k Vessels"],
  },
  {
    id: "support-swarm",
    kind: "supportSwarm",
    category: "Multi-Agent Systems",
    domain: "Agentic Swarms & DevOps",
    slaBadge: "71.4% Deflection / 0 Failures",
    readTime: "10 min read",
    title: "Multi-Agent Support Swarm with Deterministic Action Guardrails",
    thumbnail: "/case-studies/support-swarm-thumbnail.jpg",
    excerpt:
      "Specialized agent swarms for tier-1 support with deterministic refund guardrails, achieving 71% deflection with zero unsafe mutations across 850k actions.",
    stack: ["Multi-Agent Swarm", "Stripe API Sandbox", "Prompt Injection Defense", "Idempotency"],
  },
  {
    id: "synthetic-data",
    kind: "syntheticData",
    category: "Data Privacy & Staging",
    domain: "Security & Compliance",
    slaBadge: "ε = 0.5 Math DP / 220 Tables",
    readTime: "9 min read",
    title: "Relational Synthetic Data Generation with Differential Privacy",
    thumbnail: "/case-studies/synthetic-data-thumbnail.jpg",
    excerpt:
      "Generating mathematically proven epsilon-differentially private synthetic databases that preserve foreign keys, distributions, and compliance across 200+ tables.",
    stack: ["Differential Privacy", "PostgreSQL FK Tree", "2.4M Rows/Min", "GDPR Compliance"],
  },
];

const DOMAINS = [
  "All Systems",
  "Data & Retrieval",
  "Real-Time & Latency",
  "Security & Compliance",
  "Compilers & Systems",
  "Agentic Swarms & DevOps",
] as const;

export default function ProofCatalog() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All Systems");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = useMemo(() => {
    return ALL_STORIES.filter((story) => {
      const matchesDomain =
        selectedDomain === "All Systems" || story.domain === selectedDomain;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesDomain;

      const matchesQuery =
        story.title.toLowerCase().includes(query) ||
        story.excerpt.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query) ||
        story.slaBadge.toLowerCase().includes(query) ||
        story.stack.some((tech) => tech.toLowerCase().includes(query));

      return matchesDomain && matchesQuery;
    });
  }, [selectedDomain, searchQuery]);

  return (
    <div className="mt-14 space-y-10 md:mt-16">
      {/* Control Bar: Filter Tabs + Search Input */}
      <div className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Domain Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {DOMAINS.map((domain) => {
            const isActive = selectedDomain === domain;
            const count =
              domain === "All Systems"
                ? ALL_STORIES.length
                : ALL_STORIES.filter((s) => s.domain === domain).length;

            return (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`rounded-xl px-4 py-2.5 font-mono text-xs sm:text-[13.5px] font-medium tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-white text-zinc-950 font-bold shadow-md scale-[1.02]"
                    : "border border-white/15 bg-white/[0.04] text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {domain}
                <span
                  className={`ml-2 text-xs font-semibold ${
                    isActive ? "text-zinc-600" : "text-zinc-300"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-88">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech, SLA, or keyword..."
            className="w-full rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3 pl-11 text-sm sm:text-base text-white placeholder-zinc-400 outline-none transition-all focus:border-accent focus:bg-white/[0.08] focus:ring-1 focus:ring-accent/40"
          />
          <svg
            className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-300"
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
              className="absolute right-3.5 top-3 text-xs font-mono font-bold text-zinc-300 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Result Count Status */}
      <div className="flex items-center justify-between font-mono text-xs sm:text-[13px] uppercase tracking-[0.16em] text-zinc-300">
        <span>
          Showing {filteredStories.length} of {ALL_STORIES.length} verified production systems
        </span>
        <span className="hidden sm:inline text-zinc-300">100% On-Premises &middot; Zero Data Leakage</span>
      </div>

      {/* Case Study Grid */}
      {filteredStories.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-16 text-center">
          <p className="text-base sm:text-lg text-zinc-200">
            No architecture matches found for “<span className="text-white font-semibold">{searchQuery}</span>”.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain("All Systems");
              setSearchQuery("");
            }}
            className="mt-5 rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 font-mono text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.15] transition-colors"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              id={story.id}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[#0b1120] transition-all duration-300 hover:border-white/35 hover:bg-[#0e1628] shadow-xl hover:shadow-2xl"
            >
              {/* Thumbnail Container */}
              <Link
                href={`/proof/${story.id}`}
                aria-label={`Read ${story.title}`}
                className="relative block aspect-[16/9] overflow-hidden border-b border-white/15 bg-[#070b14]"
              >
                <Image
                  src={story.thumbnail}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/40 to-transparent pointer-events-none" />
              </Link>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em]">
                  <span className="text-accent font-bold">{story.category}</span>
                  <span className="text-zinc-300 font-medium">{story.readTime}</span>
                </div>

                {/* High-Fidelity Architectural Benchmark Box (Clean, Minimalist, No AI Fluff) */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.14] bg-[#070c18] px-4 py-3 shadow-inner">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    Production SLA
                  </span>
                  <span className="font-mono text-xs sm:text-[13.5px] font-bold text-white tracking-tight">
                    {story.slaBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl sm:text-[22px] font-semibold leading-[1.3] tracking-tight text-white transition-colors duration-200 group-hover:text-accent">
                  <Link href={`/proof/${story.id}`}>
                    {story.title}
                  </Link>
                </h3>

                {/* Excerpt - High contrast, large font, highly readable */}
                <p className="mt-4 text-base sm:text-[16.5px] font-normal leading-[1.7] text-zinc-100">
                  {story.excerpt}
                </p>

                {/* Tech Stack Pills - Well-spaced, larger font, clear contrast */}
                <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
                  {story.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-mono text-xs sm:text-[13px] font-medium text-zinc-100 tracking-normal transition-colors group-hover:border-white/30 group-hover:bg-white/[0.10] group-hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Prominent, Attractive Minimalist CTA Button */}
                <div className="mt-auto pt-7 border-t border-white/[0.12]">
                  <Link
                    href={`/proof/${story.id}`}
                    className="group/btn flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3.5 font-mono text-xs sm:text-[13.5px] uppercase tracking-[0.14em] font-bold text-white transition-all duration-200 hover:border-accent hover:bg-accent hover:text-zinc-950 shadow-sm"
                  >
                    <span>Read engineering breakdown</span>
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white font-bold transition-all duration-200 group-hover/btn:bg-zinc-950 group-hover/btn:text-accent group-hover/btn:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
