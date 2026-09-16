"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProofThumbnailKind } from "@/lib/proofContent";

interface Stage {
  label: string;
  badge: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  telemetry: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
}

const systemData: Record<
  ProofThumbnailKind,
  {
    title: string;
    schematicImage: string;
    figureCaption: string;
    stages: Stage[];
  }
> = {
  sql: {
    title: "System Architecture · Enterprise SQL RAG",
    schematicImage: "/case-studies/sql-rag-architecture.jpg",
    figureCaption: "FIGURE 1.0 — ENTERPRISE SQL RAG TOPOLOGY",
    stages: [
      {
        label: "Semantics",
        badge: "01 · Business Semantics",
        title: "Disambiguate business terminology before query generation",
        description:
          "Colloquial requests such as “best performing accounts” have multiple valid SQL interpretations. The business glossary resolves company-specific metrics into explicit constraints before database tables are queried.",
        stats: [
          { label: "Term Resolution", value: "Strict Glossary" },
          { label: "Semantic Guessing", value: "0%" },
          { label: "Ambiguity Policy", value: "Clarify, don't guess" },
        ],
        telemetry: {
          label1: "Glossary Mapping",
          val1: "best → ARR Growth > 25% AND Churn = 0",
          label2: "Ambiguity Check",
          val2: "Resolved without prompt hallucination",
        },
      },
      {
        label: "Schema Pruning",
        badge: "02 · Context Optimization",
        title: "Isolate relevant relational entities",
        description:
          "Rather than supplying the full database schema to an expensive reasoning model, the router prunes 80+ enterprise tables down to the exact entities required for the question, reducing hallucinations and token cost.",
        stats: [
          { label: "Schema Footprint", value: "3 of 84 tables" },
          { label: "Prompt Reduction", value: "-68% tokens" },
          { label: "Average Latency", value: "0.48s" },
        ],
        telemetry: {
          label1: "Entity Isolator",
          val1: "Pruned 84 tables down to 3 candidate tables",
          label2: "Context Window",
          val2: "Token footprint reduced by 68%",
        },
      },
      {
        label: "Evaluations",
        badge: "03 · Continuous Verification",
        title: "Score against held-out business benchmarks",
        description:
          "Queries are checked in a read-only environment against an evaluation set of real analytical questions. Semantic errors trigger classification into regression test suites rather than prompt tweaking.",
        stats: [
          { label: "Controlled Accuracy", value: "~95.2%" },
          { label: "Execution Model", value: "Read-only replica" },
          { label: "Regression Loop", value: "Continuous test suite" },
        ],
        telemetry: {
          label1: "Benchmark Run",
          val1: "95.2% accuracy on held-out analytical suite",
          label2: "Database Guardrail",
          val2: "Read-only replica with 5s timeout enforcement",
        },
      },
    ],
  },
  interviewer: {
    title: "System Architecture · Real-time Voice Interviewer",
    schematicImage: "/case-studies/ai-interviewer-architecture.jpg",
    figureCaption: "FIGURE 2.0 — REAL-TIME VOICE & CODE SANDBOX PIPELINE",
    stages: [
      {
        label: "Voice Streaming",
        badge: "01 · Streaming Audio",
        title: "Low-latency conversational voice pipeline",
        description:
          "Sequential request-response flows introduced awkward delays. An interleaved streaming pipeline enables the AI interviewer to listen, interrupt, and reply within normal human conversational rhythm.",
        stats: [
          { label: "Round-trip Latency", value: "< 300ms" },
          { label: "Interruption", value: "Graceful turn-taking" },
          { label: "Protocol", value: "Streaming WebRTC" },
        ],
        telemetry: {
          label1: "Audio Pipeline",
          val1: "WebRTC Opus stream with VAD packet buffering",
          label2: "Latency P95",
          val2: "284ms round-trip to first generated audio packet",
        },
      },
      {
        label: "Live Sandbox",
        badge: "02 · Code Execution",
        title: "Candidate coding with dynamic follow-ups",
        description:
          "Candidates solve problems in an isolated execution sandbox. The system evaluates the candidate's actual implementation, asking specific follow-up questions regarding complexity and trade-offs.",
        stats: [
          { label: "Execution Runtime", value: "Sandboxed container" },
          { label: "Languages", value: "Python, TS, Go" },
          { label: "Adaptive Probing", value: "Code-aware" },
        ],
        telemetry: {
          label1: "Sandbox Isolation",
          val1: "gVisor secure runtime with 256MB RAM ceiling",
          label2: "Follow-up Probe",
          val2: "Detected O(N^2) loop; prompted for O(N) approach",
        },
      },
      {
        label: "Evidence Scoring",
        badge: "03 · Defensible Evaluation",
        title: "Explainable signals for hiring decisions",
        description:
          "Replaces arbitrary scores with structured evidence. Recommendations cite exact conversational timestamps, executed code tests, and problem-solving benchmarks so recruiters can justify decisions.",
        stats: [
          { label: "Signal Type", value: "Verifiable evidence" },
          { label: "Score Breakdown", value: "Technical & Comm" },
          { label: "Recruiter Time Saved", value: "150+ hrs/mo" },
        ],
        telemetry: {
          label1: "Scorecard Trace",
          val1: "Timestamps linked to audio chunk and test runs",
          label2: "Recruiter Handoff",
          val2: "Executive 1-page structured decision brief ready",
        },
      },
    ],
  },
  learning: {
    title: "System Architecture · 1:1 Agentic Learning OS",
    schematicImage: "/case-studies/agentic-learning-architecture.jpg",
    figureCaption: "FIGURE 3.0 — AGENTIC LEARNER STATE GRAPH & COPILOT",
    stages: [
      {
        label: "Learning Identity",
        badge: "01 · Learner Profile",
        title: "Continuous digital learning identity",
        description:
          "Creates a unified ground truth of student mastery across 9 learner stages, tracking diagnostic history, current pace, and recurring errors so all downstream features share consistent context.",
        stats: [
          { label: "Curriculum Map", value: "30+ capabilities" },
          { label: "Mastery Tracking", value: "Continuous" },
          { label: "Data Quality", value: "Verified baseline" },
        ],
        telemetry: {
          label1: "Learner State",
          val1: "Diagnostic vector updated with concept retention",
          label2: "Mastery Index",
          val2: "Polynomial factorization mastered; Quadratics in progress",
        },
      },
      {
        label: "Teacher Copilot",
        badge: "02 · Human Leverage",
        title: "Automated lesson briefings and homework diagnosis",
        description:
          "Removes administrative burden before class by diagnosing homework issues and drafting a 2-minute insight briefing, allowing teachers to spend live session time on direct instruction.",
        stats: [
          { label: "Teacher Prep", value: "-35 mins / session" },
          { label: "Approval Workflow", value: "Human-in-the-loop" },
          { label: "Misconception Radar", value: "Pre-class review" },
        ],
        telemetry: {
          label1: "Homework Radar",
          val1: "Identified sign flip bug in step 3 across 4 problems",
          label2: "Prep Briefing",
          val2: "Teacher approved targeted 10-min agenda focus",
        },
      },
      {
        label: "Safe Autonomy",
        badge: "03 · Autonomy Boundaries",
        title: "Autonomous practice protected by evaluation harnesses",
        description:
          "Autonomous tutoring only engages within validated curriculum boundaries. Unrecognized or ambiguous student queries cleanly escalate back to human educators.",
        stats: [
          { label: "Safety Verification", value: "Harness certified" },
          { label: "Escalation Policy", value: "Teacher handoff" },
          { label: "Availability", value: "24/7 Practice" },
        ],
        telemetry: {
          label1: "Guardrail State",
          val1: "Curriculum scope check passed; Socratic hint provided",
          label2: "Escalation Flag",
          val2: "0 safety violations; 100% boundary compliance",
        },
      },
    ],
  },
  compliance: {
    title: "System Architecture · Autonomous Cloud Compliance Engine",
    schematicImage: "/case-studies/cloud-compliance-architecture.jpg",
    figureCaption: "FIGURE 4.0 — IAC AST SCANNER & GITOPS REMEDIATION TOPOLOGY",
    stages: [
      {
        label: "IaC AST Scanner",
        badge: "01 · Static Verification",
        title: "Pre-deployment HCL & Terraform AST analysis",
        description:
          "Intercepts infrastructure-as-code pull requests before provisioning. Deconstructs Terraform plans into abstract syntax trees to identify unencrypted storage, wildcards, and open CIDR ingress blocks.",
        stats: [
          { label: "Scan Latency", value: "< 4.2s / plan" },
          { label: "Policy Coverage", value: "SOC 2 & HIPAA" },
          { label: "False Positives", value: "< 1.5%" },
        ],
        telemetry: {
          label1: "Parser Status",
          val1: "Terraform AST parsed; 42 resources inspected",
          label2: "Violation Catch",
          val2: "Blocked s3_bucket without KMS customer-managed key",
        },
      },
      {
        label: "Drift Analyzer",
        badge: "02 · Real-Time Posture",
        title: "Event-driven multi-cloud IAM & state monitoring",
        description:
          "Monitors AWS CloudTrail, Azure Monitor, and GCP Audit Logs for out-of-band console mutations. Differentiates between intentional emergency patches and unauthorized security posture regressions.",
        stats: [
          { label: "Drift Detection", value: "< 15s post-mutation" },
          { label: "Cloud Breadth", value: "AWS, Azure, GCP" },
          { label: "Audit Readiness", value: "Continuous evidence" },
        ],
        telemetry: {
          label1: "CloudTrail Stream",
          val1: "Console change detected on SecurityGroup sg-0a91f",
          label2: "Policy Verdict",
          val2: "Port 22 open to 0.0.0.0/0 marked Critical Non-Compliance",
        },
      },
      {
        label: "GitOps Healing",
        badge: "03 · Automated Remediation",
        title: "Synthesizes syntactically valid remediation PRs",
        description:
          "Rather than simply alerting on-call engineers, the agent generates verified Terraform diffs and submits pull requests with architectural rationales, closing security findings automatically.",
        stats: [
          { label: "PR Generation", value: "Fully automated" },
          { label: "Audit Hours Saved", value: "280 hrs / audit" },
          { label: "Enforcement", value: "Zero manual toil" },
        ],
        telemetry: {
          label1: "GitOps Action",
          val1: "Opened PR #418: Restricted CIDR to corporate VPN IP pool",
          label2: "Merge Gate",
          val2: "CI passing; automated compliance attestation attached",
        },
      },
    ],
  },
  fraud: {
    title: "System Architecture · Sub-50ms Real-Time Fraud Detection Graph",
    schematicImage: "/case-studies/fraud-detection-architecture.jpg",
    figureCaption: "FIGURE 5.0 — STREAMING GRAPH NEURAL NETWORK TOPOLOGY",
    stages: [
      {
        label: "Event Ingestion",
        badge: "01 · Kafka/Flink Stream",
        title: "High-throughput telemetry & state hydration",
        description:
          "Consumes transaction streams from Apache Kafka at over 14,000 events/second. Hydrates rolling user behavior, historical velocity, and geolocation deltas into an in-memory low-latency cache.",
        stats: [
          { label: "Throughput", value: "14,500 tx/sec" },
          { label: "Hydration Time", value: "4.2 milliseconds" },
          { label: "State Cache", value: "In-memory Redis" },
        ],
        telemetry: {
          label1: "Kafka Partition",
          val1: "Topic 'tx-authorizations' partition 14 lag: 0ms",
          label2: "Entity Hydration",
          val2: "Pulled 30-day velocity profile in 3.8ms",
        },
      },
      {
        label: "Graph Inference",
        badge: "02 · Subgraph Scoring",
        title: "C++ TensorRT Graph Neural Network evaluation",
        description:
          "Constructs a 3-hop entity neighborhood connecting card IDs, device fingerprints, and merchant terminals. GNN model predicts syndication likelihood within an extreme sub-50ms budget.",
        stats: [
          { label: "P99 SLA", value: "38 milliseconds" },
          { label: "Runtime", value: "TensorRT C++" },
          { label: "False Positives", value: "-41% reduction" },
        ],
        telemetry: {
          label1: "TensorRT Engine",
          val1: "Evaluated 3-hop subgraph (48 nodes, 112 edges)",
          label2: "Model Score",
          val2: "Syndicate cluster probability: 0.941 (Threshold: 0.850)",
        },
      },
      {
        label: "Audit Decision",
        badge: "03 · Explainable Action",
        title: "Regulatory-grade structured reasoning & decision",
        description:
          "Generates instantaneous decline or step-up authentication commands. Produces a compliant decision trace for banking regulators specifying exact mathematical risk factors.",
        stats: [
          { label: "Decision Format", value: "Approve / Challenge / Decline" },
          { label: "Regulatory Trail", value: "100% compliant" },
          { label: "Execution Time", value: "Total 44ms" },
        ],
        telemetry: {
          label1: "Decision Verdict",
          val1: "Declined: Device fingerprint shared with 18 cards in 10m",
          label2: "Audit Trail",
          val2: "Signed cryptographic record written to immutable ledger",
        },
      },
    ],
  },
  healthcare: {
    title: "System Architecture · Clinical Intake & Claims Adjudication",
    schematicImage: "/case-studies/healthcare-claims-architecture.jpg",
    figureCaption: "FIGURE 6.0 — ON-PREM HIPAA MULTI-MODAL PIPELINE",
    stages: [
      {
        label: "Intake & OCR",
        badge: "01 · Multi-Modal Intake",
        title: "Unstructured clinical records & scan normalization",
        description:
          "Ingests faxed patient charts, PDF laboratory diagnostics, and prior authorization forms. Extracts layout geometry, handwritten doctor annotations, and clinical tables with high precision.",
        stats: [
          { label: "Document Ingestion", value: "Multi-page PDF/TIFF" },
          { label: "Extraction Accuracy", value: "99.2% on billing codes" },
          { label: "Environment", value: "Air-gapped VPC" },
        ],
        telemetry: {
          label1: "OCR Pipeline",
          val1: "Processed 48-page clinical record in 6.2s",
          label2: "Table Extraction",
          val2: "Extracted 14 lab panel measurements with units",
        },
      },
      {
        label: "HIPAA De-ID",
        badge: "02 · Privacy Boundary",
        title: "Zero-data-leakage PII and PHI sanitization",
        description:
          "Identifies and cryptographically replaces all 18 HIPAA Safe Harbor identifiers with pseudonymized deterministic hashes before any reasoning agent processes medical necessity.",
        stats: [
          { label: "PHI Leakage", value: "0.00% guarantee" },
          { label: "Standard", value: "HIPAA Safe Harbor" },
          { label: "Auditability", value: "Cryptographic envelope" },
        ],
        telemetry: {
          label1: "De-ID Engine",
          val1: "Redacted patient name, SSN, MRN, and clinic address",
          label2: "Data Boundary",
          val2: "Zero external network egress detected (Air-gapped VPC)",
        },
      },
      {
        label: "Adjudication",
        badge: "03 · Clinical Rules",
        title: "Evidence-backed recommendation for medical directors",
        description:
          "Compares patient diagnostic findings against commercial insurance medical necessity guidelines. Formulates a pre-adjudicated claim packet with highlighted citations for doctor sign-off.",
        stats: [
          { label: "Cycle Time", value: "14 days → 4 hours" },
          { label: "Doctor Leverage", value: "4.8x throughput" },
          { label: "Format", value: "FHIR / HL7 standard" },
        ],
        telemetry: {
          label1: "Clinical Match",
          val1: "Matched CPT 99214 with documented systemic symptoms",
          label2: "Physician Handoff",
          val2: "One-click approval packet presented to Medical Director",
        },
      },
    ],
  },
  migration: {
    title: "System Architecture · Legacy Monolith to Microservices Engine",
    schematicImage: "/case-studies/legacy-migration-architecture.jpg",
    figureCaption: "FIGURE 7.0 — AST COMPILER FRONTEND & EQUIVALENCE HARNESS",
    stages: [
      {
        label: "AST Extraction",
        badge: "01 · Compiler Parsing",
        title: "Deconstruct legacy Java/COBOL into semantic graphs",
        description:
          "Parses millions of lines of legacy monolithic source into control-flow graphs, data-type contracts, and transactional boundary definitions, preventing semantic loss.",
        stats: [
          { label: "Codebase Scope", value: "1.8M lines parsed" },
          { label: "Services Mapped", value: "42 domain boundaries" },
          { label: "AST Depth", value: "Full CFG reconstruction" },
        ],
        telemetry: {
          label1: "Parser Grammar",
          val1: "COBOL copybooks & Java EE 7 EJBs parsed to CFG",
          label2: "Dependency Graph",
          val2: "Identified 12 core transactional domain clusters",
        },
      },
      {
        label: "Target Synthesis",
        badge: "02 · Idiomatic CodeGen",
        title: "Synthesize modern Go/TypeScript microservices",
        description:
          "Generates clean, maintainable microservice code compliant with enterprise architectural standards. Enforces strict typing, structured logging, and modern database access patterns.",
        stats: [
          { label: "Target Languages", value: "Go / TypeScript" },
          { label: "Type Safety", value: "100% strict compilation" },
          { label: "Containerization", value: "Kubernetes-native" },
        ],
        telemetry: {
          label1: "Code Synthesizer",
          val1: "Emitted idiomatic Go handlers with pgx connection pools",
          label2: "Compiler Check",
          val2: "go build passing with zero warnings or vet errors",
        },
      },
      {
        label: "Fuzzing & Evals",
        badge: "03 · Differential Equivalence",
        title: "500,000 synthetic transaction differential harness",
        description:
          "Runs identical high-cardinality test transactions concurrently through the legacy system and the new Go microservice. Proves byte-for-byte behavioral and numeric equivalence.",
        stats: [
          { label: "Differential Tests", value: "500k transactions" },
          { label: "Equivalence Rate", value: "100.00% match" },
          { label: "Infra Cost", value: "-74% compute savings" },
        ],
        telemetry: {
          label1: "Harness Runner",
          val1: "500,000/500,000 differential assertions passed",
          label2: "Financial Float",
          val2: "Floating-point ledger balance verified down to 0.0001 cent",
        },
      },
    ],
  },
  incident: {
    title: "System Architecture · DevOps Autonomous Incident Remediation",
    schematicImage: "/case-studies/devops-incident-architecture.jpg",
    figureCaption: "FIGURE 8.0 — OBSERVABILITY CAUSAL GRAPH & CANARY TOPOLOGY",
    stages: [
      {
        label: "Telemetry Graph",
        badge: "01 · Ingestion & RCA",
        title: "Correlate OpenTelemetry, metrics, and git deploys",
        description:
          "Streams logs, traces, and metrics from Datadog and Prometheus during degradation. Builds a causal DAG linking the spike in HTTP 504 errors directly to a specific schema migration commit.",
        stats: [
          { label: "Mean Time to Detect", value: "38 seconds" },
          { label: "Noise Reduction", value: "88% suppressed alerts" },
          { label: "Graph Resolution", value: "Service-level DAG" },
        ],
        telemetry: {
          label1: "Causal Inference",
          val1: "Isolated root cause: Missing index on 'orders.created_at'",
          label2: "Commit Trace",
          val2: "Triggered by PR #1042 deployed 4 minutes ago",
        },
      },
      {
        label: "Canary Sandbox",
        badge: "02 · Safety Verification",
        title: "Validate runbook action in isolated canary replica",
        description:
          "Before executing remediation in production, the copilot runs the migration hotfix in an isolated staging sandbox to verify that connection pools recover without deadlocks.",
        stats: [
          { label: "Canary Validation", value: "1% traffic slice" },
          { label: "Simulation Time", value: "< 25 seconds" },
          { label: "Failure Risk", value: "Zero production loop" },
        ],
        telemetry: {
          label1: "Sandbox Replica",
          val1: "Executed concurrent index creation in isolated clone",
          label2: "Verification Run",
          val2: "P99 latency recovered from 4200ms to 28ms in sandbox",
        },
      },
      {
        label: "Safe Remediation",
        badge: "03 · Production Action",
        title: "Automated rollback or index hotfix with SRE sign-off",
        description:
          "Applies the validated fix to production clusters with real-time canary monitoring. Reduces average incident recovery duration from 42 minutes down to 11 minutes.",
        stats: [
          { label: "MTTR Reduction", value: "-74% recovery time" },
          { label: "Guardrail", value: "Human-in-the-loop gate" },
          { label: "Post-Mortem", value: "Automated timeline brief" },
        ],
        telemetry: {
          label1: "Production Rollout",
          val1: "Applied non-blocking index; connection pool normalized",
          label2: "Incident Status",
          val2: "RESOLVED in 11 minutes. Post-mortem summary generated",
        },
      },
    ],
  },
  privateRag: {
    title: "System Architecture · Zero-Trust Private Enterprise RAG",
    schematicImage: "/case-studies/private-rag-architecture.jpg",
    figureCaption: "FIGURE 9.0 — ZERO-TRUST RBAC RETRIEVAL & GRADER TOPOLOGY",
    stages: [
      {
        label: "RBAC Trimming",
        badge: "01 · Pre-Retrieval Auth",
        title: "Enforce Active Directory & Okta permissions in index",
        description:
          "Resolves user group memberships against Okta and Active Directory before query execution. Filters vector similarity search to only authorized document partitions.",
        stats: [
          { label: "Permission Leaks", value: "0.00% mathematical guarantee" },
          { label: "Corpus Scope", value: "10M+ documents" },
          { label: "Auth Resolution", value: "< 18 milliseconds" },
        ],
        telemetry: {
          label1: "Auth Filter",
          val1: "User: engineering-lead | Matched security groups: 14",
          label2: "Index Pruning",
          val2: "Restricted search space to 380,000 eligible document chunks",
        },
      },
      {
        label: "Hybrid Retrieval",
        badge: "02 · Sparse + Dense",
        title: "Dual-index semantic vector and BM25 keyword search",
        description:
          "Combines dense semantic embeddings with sparse BM25 keyword matching to retrieve exact code symbols, SKU numbers, and conceptual matches simultaneously.",
        stats: [
          { label: "Search Strategy", value: "Reciprocal Rank Fusion" },
          { label: "P95 Latency", value: "850ms total query" },
          { label: "Re-Ranking", value: "Cross-encoder scoring" },
        ],
        telemetry: {
          label1: "Retrieval Scores",
          val1: "Fused Top-50 candidates via Reciprocal Rank Fusion",
          label2: "Re-Ranker Stage",
          val2: "Cross-encoder isolated Top-6 highest-relevance contexts",
        },
      },
      {
        label: "Corrective Grader",
        badge: "03 · Self-Correction",
        title: "Automated hallucination and relevance grading loop",
        description:
          "An autonomous evaluator checks if retrieved text answers the prompt. If facts are ambiguous or missing, the system clarifies or triggers query rewriting.",
        stats: [
          { label: "Citation Fidelity", value: "97.4% verifiable" },
          { label: "Hallucination Defense", value: "Self-corrective loop" },
          { label: "Auditability", value: "Strict chunk citations" },
        ],
        telemetry: {
          label1: "Fidelity Grader",
          val1: "Claim checked against chunk hash #81a4b: PASS",
          label2: "Final Response",
          val2: "Synthesized answer with 4 clickable exact source links",
        },
      },
    ],
  },
  contract: {
    title: "System Architecture · Autonomous Contract Playbook Redlining",
    schematicImage: "/case-studies/contract-redlining-architecture.jpg",
    figureCaption: "FIGURE 10.0 — OPENXML PARSER & PLAYBOOK REDLINER TOPOLOGY",
    stages: [
      {
        label: "Clause Decomp",
        badge: "01 · Legal Decomposition",
        title: "Parse complex agreements into individual obligations",
        description:
          "Deconstructs enterprise MSAs, NDAs, and SLAs into discrete clause categories: indemnification, limitation of liability, intellectual property, and payment terms.",
        stats: [
          { label: "Clause Types", value: "64 provisions mapped" },
          { label: "Parsing Precision", value: "98.7% accuracy" },
          { label: "Format Support", value: "Native Word (.docx) & PDF" },
        ],
        telemetry: {
          label1: "Document Ingestion",
          val1: "Parsed 62-page Master Services Agreement (.docx)",
          label2: "Decomposition",
          val2: "Extracted 148 distinct legal clauses into structured AST",
        },
      },
      {
        label: "Playbook Rules",
        badge: "02 · Policy Adjudication",
        title: "Score clauses against corporate legal fallback rules",
        description:
          "Evaluates vendor clauses against company legal policy. Highlights uncapped liabilities, non-standard indemnity triggers, and aggressive payment terms.",
        stats: [
          { label: "Risk Tiers", value: "Ideal / Fallback / Reject" },
          { label: "Review Speed", value: "10 days → 45 minutes" },
          { label: "Consistency", value: "100% corporate alignment" },
        ],
        telemetry: {
          label1: "Risk Flag",
          val1: "Section 11.2: Uncapped liability for indirect damages",
          label2: "Playbook Match",
          val2: "Triggered Tier-1 Fallback: Cap liability at 12mo fees paid",
        },
      },
      {
        label: "OpenXML Redline",
        badge: "03 · Tracked Changes",
        title: "Generate native Word documents with tracked changes",
        description:
          "Mutates the native Word OpenXML tree directly, inserting strike-throughs, replacement text, and explanatory counsel comments while keeping styles intact.",
        stats: [
          { label: "Output Format", value: "Native .docx tracked changes" },
          { label: "Legal Capacity", value: "3.2x contract velocity" },
          { label: "Human Oversight", value: "Counsel final review" },
        ],
        telemetry: {
          label1: "OpenXML Mutation",
          val1: "Generated 18 tracked modifications and 6 margin comments",
          label2: "Export Status",
          val2: "Ready for General Counsel review and counter-party delivery",
        },
      },
    ],
  },
  edge: {
    title: "System Architecture · Edge AI Predictive Fleet Telemetry",
    schematicImage: "/case-studies/edge-telemetry-architecture.jpg",
    figureCaption: "FIGURE 11.0 — QUANTIZED EMBEDDED ML & SENSOR BUS TOPOLOGY",
    stages: [
      {
        label: "Edge Ingestion",
        badge: "01 · High-Frequency Sensor Bus",
        title: "Ingest vibration, thermal, and acoustic bus feeds",
        description:
          "Reads 5kHz vibration and motor telemetry over industrial CAN bus and Modbus interfaces on ARM and NVIDIA Jetson edge gateways.",
        stats: [
          { label: "Sampling Rate", value: "5,000 Hz real-time" },
          { label: "Hardware", value: "ARM / Jetson 15W" },
          { label: "Protocol", value: "CAN / Modbus / OPC-UA" },
        ],
        telemetry: {
          label1: "CAN Bus Intake",
          val1: "Sampling 8-channel accelerometer at 5kHz",
          label2: "Buffer Status",
          val2: "Rolling 10-second temporal window hydrated in RAM",
        },
      },
      {
        label: "INT8 Inference",
        badge: "02 · Quantized Anomaly Detection",
        title: "Sub-5ms on-device inference using TensorRT INT8",
        description:
          "Runs quantized temporal convolutional neural networks on-device. Detects harmonic resonance anomalies and bearing wear while operating completely offline.",
        stats: [
          { label: "Inference Latency", value: "4.6 milliseconds" },
          { label: "Model Footprint", value: "INT8 quantized (28MB)" },
          { label: "Prediction Lead", value: "48 hours advance notice" },
        ],
        telemetry: {
          label1: "TensorRT Kernel",
          val1: "Inference completed in 4.4ms on Jetson Orin Nano",
          label2: "Anomaly Signal",
          val2: "Detected inner bearing race degradation signature (p=0.96)",
        },
      },
      {
        label: "Store-and-Forward",
        badge: "03 · Satellite / Cellular Sync",
        title: "Store-and-forward telemetry sync over flaky connections",
        description:
          "Buffers anomalous signatures locally in an append-only ring buffer. Synchronizes compressed vector fingerprints upon satellite connection, reducing bandwidth by 94%.",
        stats: [
          { label: "Bandwidth Saved", value: "-94% payload cost" },
          { label: "Offline Storage", value: "30 days local buffer" },
          { label: "Alert Latency", value: "Instantaneous local trigger" },
        ],
        telemetry: {
          label1: "Sync Protocol",
          val1: "Satellite handshake established; transmitted 2.4KB summary",
          label2: "Maintenance Dispatch",
          val2: "Dispatched preventative repair kit to next port of call",
        },
      },
    ],
  },
  router: {
    title: "System Architecture · Enterprise LLM Gateway & Semantic Cache",
    schematicImage: "/case-studies/llm-router-architecture.jpg",
    figureCaption: "FIGURE 12.0 — SEMANTIC VECTOR CACHE & MODEL CASCADING TOPOLOGY",
    stages: [
      {
        label: "Semantic Cache",
        badge: "01 · Redis Vector Cache",
        title: "Sub-12ms semantic lookup for recurring queries",
        description:
          "Calculates embedding centroids for incoming requests against an in-memory Redis vector index. Returns cached high-quality responses for semantically identical questions.",
        stats: [
          { label: "Cache Hit Rate", value: "44.2% hit rate" },
          { label: "Lookup Latency", value: "8.4 milliseconds" },
          { label: "Cost per Hit", value: "$0.000 token fees" },
        ],
        telemetry: {
          label1: "Vector Similarity",
          val1: "Cosine similarity 0.962 against cached embedding #9021",
          label2: "Cache Response",
          val2: "Returned verified answer in 9.2ms (Zero upstream LLM call)",
        },
      },
      {
        label: "Model Cascading",
        badge: "02 · Complexity Routing",
        title: "Route simple requests to 8B models, hard ones to frontier",
        description:
          "A lightweight classifier scores prompt difficulty. Routine classifications route to compact models, while multi-step logical questions escalate to frontier models.",
        stats: [
          { label: "Cascade Routing", value: "Dynamic complexity gate" },
          { label: "Small Model Share", value: "58% traffic to 8B models" },
          { label: "Frontier Share", value: "42% reserved for hard tasks" },
        ],
        telemetry: {
          label1: "Complexity Score",
          val1: "Score: 0.22 (Simple normalization) -> Routed to 8B model",
          label2: "Latency Check",
          val2: "Inference completed in 180ms at 1/20th frontier cost",
        },
      },
      {
        label: "FinOps & Token SLA",
        badge: "03 · Enterprise Telemetry",
        title: "Multi-provider automated failover & token accounting",
        description:
          "Tracks spend per department, enforces rate limits, and transparently retries requests across secondary regions during cloud model outages with 99.99% availability.",
        stats: [
          { label: "Monthly Savings", value: "$190,000 / month (-63%)" },
          { label: "Gateway Overhead", value: "< 10 milliseconds" },
          { label: "Availability SLA", value: "99.99% multi-region fallback" },
        ],
        telemetry: {
          label1: "Monthly Ledger",
          val1: "Projected monthly token spend reduced from $300k to $110k",
          label2: "Provider Health",
          val2: "All 4 model provider endpoints reporting healthy (P99 < 800ms)",
        },
      },
    ],
  },
  supplyChain: {
    title: "System Architecture · Global Supply Chain Disruption Forecaster",
    schematicImage: "/case-studies/supply-chain-architecture.jpg",
    figureCaption: "FIGURE 13.0 — SATELLITE AIS STREAM & RE-ROUTING SOLVER TOPOLOGY",
    stages: [
      {
        label: "AIS Stream",
        badge: "01 · Global Telemetry Ingestion",
        title: "Ingest satellite AIS vessel streams & terminal manifests",
        description:
          "Processes real-time position, speed, and draft data for over 450,000 commercial cargo vessels. Combines AIS signals with terminal crane productivity logs.",
        stats: [
          { label: "Vessels Tracked", value: "450,000 global ships" },
          { label: "Ingestion Latency", value: "Streaming real-time" },
          { label: "Data Sources", value: "Satellite AIS + Customs manifests" },
        ],
        telemetry: {
          label1: "AIS Feed",
          val1: "Ingested 1.2M position updates across 40 maritime sectors",
          label2: "Vessel Queue",
          val2: "Identified 28 container ships anchoring outside Port of Ningbo",
        },
      },
      {
        label: "Disruption Graph",
        badge: "02 · 7-Day Foresight",
        title: "Graph neural network forecasting of port dwell times",
        description:
          "Predicts terminal berth congestion and railhead delays 7 days ahead of official port authority notices, alerting enterprise logistics teams to bottlenecks early.",
        stats: [
          { label: "Prediction Horizon", value: "7 days in advance" },
          { label: "Precision", value: "91.4% accuracy" },
          { label: "Lead Time", value: "Saves 5-9 transit days" },
        ],
        telemetry: {
          label1: "Congestion Forecaster",
          val1: "Forecasted Rotterdam berth delay: +96 hours by Friday",
          label2: "Early Warning",
          val2: "Alert dispatched to supply chain directors 6 days early",
        },
      },
      {
        label: "MILP Solver",
        badge: "03 · Multimodal Re-Routing",
        title: "Mixed-integer linear programming diversion optimizer",
        description:
          "Solves cost-optimal alternative itineraries across feeder vessels, rail corridors, and bonded warehouses to minimize factory production downtime.",
        stats: [
          { label: "Demurrage Reduction", value: "-38% detention fees" },
          { label: "Solver Speed", value: "< 2.5 mins per network solve" },
          { label: "Execution", value: "Automated booking dispatch" },
        ],
        telemetry: {
          label1: "MILP Optimizer",
          val1: "Evaluated 4,200 multimodal rail/truck diversion routes",
          label2: "Optimal Solution",
          val2: "Diverted 240 containers via Antwerp; saved $142,000 in fees",
        },
      },
    ],
  },
  supportSwarm: {
    title: "System Architecture · Multi-Agent Support Swarm with Guardrails",
    schematicImage: "/case-studies/support-swarm-architecture.jpg",
    figureCaption: "FIGURE 14.0 — MULTI-AGENT SWARM & DETERMINISTIC POLICY TOPOLOGY",
    stages: [
      {
        label: "Intent Router",
        badge: "01 · Gateway Classification",
        title: "Classify incoming tickets & adversarial attack defense",
        description:
          "Intercepts omnichannel inquiries across web, email, and mobile apps. Sanitizes adversarial prompt injection attempts and routes requests to domain-specialized agents.",
        stats: [
          { label: "Deflection Rate", value: "71.4% autonomous resolution" },
          { label: "Jailbreak Defense", value: "Zero prompt leakage" },
          { label: "Classification", value: "Sub-150ms intent router" },
        ],
        telemetry: {
          label1: "Sanitizer Check",
          val1: "Adversarial prompt injection attempt detected and scrubbed",
          label2: "Swarm Routing",
          val2: "Routed to Billing Agent: Refund request for order #88412",
        },
      },
      {
        label: "Specialist Swarm",
        badge: "02 · Collaborative Agents",
        title: "Specialized agents for billing, shipping, and diagnostics",
        description:
          "Isolated micro-agents collaborate over a shared conversational memory blackboard. Each agent specializes in specific schemas and corporate policies.",
        stats: [
          { label: "Specialist Agents", value: "Billing, Logistics, Tech, Auth" },
          { label: "State Sharing", value: "Structured memory blackboard" },
          { label: "CSAT Score", value: "4.82 / 5.00" },
        ],
        telemetry: {
          label1: "Billing Agent",
          val1: "Verified return delivery status with Logistics Agent: CONFIRMED",
          label2: "Action Proposal",
          val2: "Proposed $49.00 credit to original payment method",
        },
      },
      {
        label: "Policy Sandbox",
        badge: "03 · Action Guardrails",
        title: "Cryptographically signed API execution with rollback safety",
        description:
          "Ensures agents cannot perform unsafe mutations. Evaluates account standing and refund caps before signing idempotency keys and mutating Stripe/ERP backends.",
        stats: [
          { label: "Unsafe Mutations", value: "0.00% across 850k actions" },
          { label: "Execution Sandbox", value: "Deterministic policy engine" },
          { label: "Escalation", value: "< 5s handoff to human tier-2" },
        ],
        telemetry: {
          label1: "Guardrail Gate",
          val1: "Evaluated rule: Refund <= $100 and Order age < 30 days: PASS",
          label2: "Transaction Commit",
          val2: "Stripe API refund #re_3N18 executed with idempotency key",
        },
      },
    ],
  },
  syntheticData: {
    title: "System Architecture · Relational Synthetic Data Generator",
    schematicImage: "/case-studies/synthetic-data-architecture.jpg",
    figureCaption: "FIGURE 15.0 — EPSILON-DP NOISE & REFERENTIAL INTEGRITY TOPOLOGY",
    stages: [
      {
        label: "Schema Graph",
        badge: "01 · Dependency Mapping",
        title: "Build topological dependency graph across 200+ tables",
        description:
          "Ingests complex enterprise relational database schemas. Maps parent-child foreign-key hierarchies, unique constraints, and check conditions into a directed graph.",
        stats: [
          { label: "Schema Scope", value: "220+ relational tables" },
          { label: "Graph Resolution", value: "Full foreign-key DAG" },
          { label: "Integrity", value: "Zero orphaned child rows" },
        ],
        telemetry: {
          label1: "Schema Parser",
          val1: "Constructed topological order across 220 PostgreSQL tables",
          label2: "Dependency DAG",
          val2: "Primary entity 'organizations' scheduled before 'users'",
        },
      },
      {
        label: "Epsilon-DP Noise",
        badge: "02 · Differential Privacy",
        title: "Inject calibrated noise to guarantee mathematical privacy",
        description:
          "Models joint probability distributions and injects calibrated Laplace and Gaussian noise. Guarantees that no individual record can be reverse-engineered.",
        stats: [
          { label: "Privacy Budget", value: "ε = 0.5 (Strict mathematical DP)" },
          { label: "Membership Defense", value: "Immune to re-identification" },
          { label: "Data Utility", value: "98.1% statistical fidelity" },
        ],
        telemetry: {
          label1: "DP Noise Engine",
          val1: "Calibrated Laplace noise injected into numerical distributions",
          label2: "Privacy Bound",
          val2: "Epsilon budget ε=0.5; Delta δ=1e-6 mathematically verified",
        },
      },
      {
        label: "Staging Pipeline",
        badge: "03 · Bulk Generation",
        title: "Generate referentially valid databases at scale",
        description:
          "Generates millions of realistic rows per minute directly into staging environments, allowing engineering and QA teams to benchmark migrations without PII risk.",
        stats: [
          { label: "Throughput", value: "2.4M rows / minute" },
          { label: "Compliance", value: "GDPR, CCPA & HIPAA safe" },
          { label: "PII Sanitization", value: "100% synthetic entities" },
        ],
        telemetry: {
          label1: "Bulk Loader",
          val1: "Streamed 15M synthetic rows into staging Aurora cluster",
          label2: "Validation Check",
          val2: "100% foreign key constraint checks passed with zero errors",
        },
      },
    ],
  },
};

export default function ProofInteractive({ kind }: { kind: ProofThumbnailKind }) {
  const [viewMode, setViewMode] = useState<"flow" | "schematic">("schematic");
  const [activeStage, setActiveStage] = useState(0);
  const data = systemData[kind] || systemData.sql;
  const stage = data.stages[activeStage] || data.stages[0];

  return (
    <div className="rounded-2xl border border-white/15 bg-[#090e1b] p-6 sm:p-8 shadow-xl">
      {/* Top Bar: Title & View Mode Toggle */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
            Technical Architecture
          </span>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-tight">
            {data.title}
          </h3>
        </div>

        {/* View Switcher: Schematic vs Pipeline Flow */}
        <div className="inline-flex rounded-xl border border-white/15 bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setViewMode("schematic")}
            className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              viewMode === "schematic"
                ? "bg-white text-zinc-950 font-bold shadow-md"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Schematic Diagram
          </button>
          <button
            type="button"
            onClick={() => setViewMode("flow")}
            className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              viewMode === "flow"
                ? "bg-white text-zinc-950 font-bold shadow-md"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Interactive Breakdown
          </button>
        </div>
      </div>

      {/* Schematic View Mode: Clean, Minimalist Architectural Diagram */}
      {viewMode === "schematic" && (
        <div className="mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-[#070b14]">
            <Image
              src={data.schematicImage}
              alt={data.title}
              fill
              className="object-contain p-2 sm:p-4"
              priority
              sizes="(max-width: 1240px) 100vw, 1200px"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs sm:text-[13px] text-zinc-300 font-mono">
            <span className="font-semibold text-white">{data.figureCaption}</span>
            <span className="text-zinc-300">100% On-Prem / VPC Deployable</span>
          </div>
        </div>
      )}

      {/* Interactive Flow Mode: Minimalist Segmented Explorer */}
      {viewMode === "flow" && (
        <div className="mt-6">
          {/* Segmented Step Controller */}
          <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
            {data.stages.map((item, index) => {
              const isActive = activeStage === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveStage(index)}
                  className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-mono font-medium transition-all ${
                    isActive
                      ? "bg-white text-zinc-950 font-bold shadow-md"
                      : "text-zinc-200 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  0{index + 1} · {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Left Explanation (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                  {stage.badge}
                </span>
                <h4 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl tracking-tight">
                  {stage.title}
                </h4>
                <p className="mt-3.5 text-base sm:text-[16.5px] leading-relaxed text-zinc-200">
                  {stage.description}
                </p>
              </div>

              {/* Clean Metric Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {stage.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-medium truncate">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-sm sm:text-[15px] font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Telemetry Panel (5 cols) */}
            <div className="lg:col-span-5 rounded-xl border border-white/15 bg-black/50 p-5 font-mono text-xs shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${kind}-${activeStage}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold border-b border-white/10 pb-2.5">
                    <span>{stage.badge}</span>
                    <span className="text-zinc-400">Verified Stage</span>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-[13px]">
                    <div>
                      <div className="text-zinc-400 uppercase tracking-wider text-[11px]">{stage.telemetry.label1}:</div>
                      <div className="mt-1 text-zinc-100 font-mono font-medium leading-relaxed">
                        {stage.telemetry.val1}
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400 uppercase tracking-wider text-[11px]">{stage.telemetry.label2}:</div>
                      <div className="mt-1 text-zinc-200 font-mono font-medium leading-relaxed">
                        {stage.telemetry.val2}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-zinc-300">
                    <span className="font-medium">Status: OPERATIONAL</span>
                    <span className="text-emerald-400 font-bold tracking-wider">PASS</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
