export type AgentDepartment =
  | "Finance & PE"
  | "Legal & Compliance"
  | "Sales & Revenue"
  | "HR & People"
  | "IT & Operations"
  | "R&D & Engineering";

export type AgentIndustry =
  | "All Industries"
  | "Banking & FS"
  | "Insurance"
  | "Private Equity"
  | "Healthcare & Life Sciences"
  | "Manufacturing"
  | "Enterprise Tech";

export type BusinessOutcome =
  | "Save Money"
  | "Make Money"
  | "Reduce Risk"
  | "Accelerate Velocity";

export type EffortTime =
  | "2–4 wks (Low Effort)"
  | "3–5 wks (Medium Effort)"
  | "4–6 wks (Medium Effort)"
  | "6–8 wks (Strategic)"
  | "6–10 wks (Strategic)";

export interface DemoScenario {
  prompt: string;
  categoryLabel: string;
  sourceDocs: { title: string; section: string; relevanceScore: string; excerpt: string }[];
  guardrailsPassed: string[];
  synthesizedOutput: string;
  telemetry: {
    retrievalMs: number;
    guardrailCheckMs: number;
    synthesisMs: number;
    totalMs: number;
    confidence: string;
    groundednessScore: string;
  };
}

export interface EnterpriseAgent {
  id: string;
  title: string;
  department: AgentDepartment;
  industries: AgentIndustry[];
  outcome: BusinessOutcome;
  effort: EffortTime;
  shortDescription: string;
  longDescription: string;
  keyConnectors: string[];
  guardrails: string[];
  metrics: { label: string; value: string }[];
  caseStudyId?: string;
  demo: DemoScenario;
}

export const ENTERPRISE_AGENTS: EnterpriseAgent[] = [
  {
    id: "regulatory-search",
    title: "Regulatory Document Search Agent",
    department: "Legal & Compliance",
    industries: ["Banking & FS", "Insurance", "Private Equity"],
    outcome: "Reduce Risk",
    effort: "6–8 wks (Strategic)",
    shortDescription:
      "Cite and trace regulatory obligations across thousands of SEC, FINRA, and EBA filings in seconds with verifiable audit trails.",
    longDescription:
      "Eliminates weeks of manual compliance research across shifting international regulatory regimes. Ingests statutory guidelines, SEC circulars, and internal policies into a hybrid dense-sparse vector index with document-level RBAC authorization.",
    keyConnectors: ["SharePoint", "SEC EDGAR", "OpenText", "Box Enterprise"],
    guardrails: ["Zero-hallucination citation mandate", "Document-level RBAC", "SOC 2 Type II audit logging"],
    metrics: [
      { label: "Research Speed", value: "3 mins vs 14 hrs" },
      { label: "Citation Precision", value: "99.8% Grounded" },
      { label: "Audit Readiness", value: "Continuous" },
    ],
    caseStudyId: "contract-redlining",
    demo: {
      categoryLabel: "Capital Adequacy Inquiry",
      prompt: "What are the capital reserve disclosure requirements under Basel III for non-centrally cleared OTC derivatives?",
      sourceDocs: [
        {
          title: "Basel III Regulatory Capital Framework (BCBS 189)",
          section: "§ 4.2.1 Margin Requirements for Non-Centrally Cleared Derivatives",
          relevanceScore: "0.962",
          excerpt:
            "Covered entities must calculate Initial Margin (IM) using an approved internal risk model (e.g., SIMM) or standardized schedule, maintaining high-quality liquid assets (HQLA) segregated with a qualified third-party custodian.",
        },
        {
          title: "Internal Risk Governance Manual v4.8",
          section: "Annex B: Collateral Segregation Protocol",
          relevanceScore: "0.938",
          excerpt:
            "All bilateral derivative agreements exceeding $50M notional require daily mark-to-market variation margin and quarterly public pillar 3 disclosures.",
        },
      ],
      guardrailsPassed: [
        "VPC Okta RBAC: Verified Compliance Officer Tier-2 clearance",
        "Hallucination Grader: Every fact token tied to BCBS 189 §4.2.1",
        "Deterministic PII Masking: Zero client account numbers exposed",
      ],
      synthesizedOutput:
        "Under Basel III (BCBS 189 §4.2.1), non-centrally cleared OTC derivatives require mandatory two-way Initial Margin (IM) calculated via approved models (e.g., ISDA SIMM) and segregated with third-party custodians in High-Quality Liquid Assets (HQLA). Quarterly Pillar 3 public disclosures are required for gross exposures exceeding the threshold, with daily variation margin reconciliation mandated under internal policy Annex B.",
      telemetry: {
        retrievalMs: 142,
        guardrailCheckMs: 38,
        synthesisMs: 290,
        totalMs: 470,
        confidence: "99.4%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "rfp-response",
    title: "RFP & Proposal Response Agent",
    department: "Sales & Revenue",
    industries: ["Enterprise Tech", "Banking & FS", "Healthcare & Life Sciences"],
    outcome: "Make Money",
    effort: "4–6 wks (Medium Effort)",
    shortDescription:
      "Draft accurate, on-brand RFP responses straight from enterprise knowledge bases and security questionnaires, with human-in-the-loop review.",
    longDescription:
      "Accelerates proposal velocity by parsing complex 100+ page RFPs, matching line-item technical questions against past approved vendor evaluations, architecture documentation, and SOC 2 security answers.",
    keyConnectors: ["Salesforce", "Google Drive", "Confluence", "Loopio API"],
    guardrails: ["Sales VP approval gateway", "Outdated pricing deprecator", "Security review verification"],
    metrics: [
      { label: "Turnaround Time", value: "2 Days vs 3 Weeks" },
      { label: "Proposal Capacity", value: "3.4x Pipeline" },
      { label: "Answer Accuracy", value: "96.4% Verified" },
    ],
    caseStudyId: "private-rag",
    demo: {
      categoryLabel: "Security Questionnaire Inquiry",
      prompt: "Draft response for enterprise RFP Item 4.12: Describe your SOC 2 Type II audit frequency, encryption standards at rest and in transit, and multi-region disaster recovery RTO/RPO.",
      sourceDocs: [
        {
          title: "Enterprise Security Whitepaper 2026",
          section: "Section 3: Cryptographic Protocols & Key Management",
          relevanceScore: "0.984",
          excerpt:
            "Data at rest is encrypted using AES-256 with customer-managed KMS keys. Data in transit enforces TLS 1.3 with strict forward secrecy and HSTS headers across all public endpoints.",
        },
        {
          title: "Disaster Recovery & Business Continuity Plan",
          section: "Table 1: Target Recovery Objectives",
          relevanceScore: "0.971",
          excerpt:
            "Multi-region active-passive replica architecture maintains Recovery Point Objective (RPO) < 1 minute and Recovery Time Objective (RTO) < 15 minutes with automated DNS failover.",
        },
      ],
      guardrailsPassed: [
        "Verified against Current 2026 SOC 2 Type II report (valid through Dec 2026)",
        "Compliance claim boundary: No unreleased features quoted",
        "Deterministic Legal disclaimer appended automatically",
      ],
      synthesizedOutput:
        "DEPLOY undergoes annual SOC 2 Type II audits conducted by an independent AICPA-accredited firm, with reports renewed annually. All customer data at rest is encrypted using AES-256 with optional customer-managed AWS KMS keys; data in transit enforces TLS 1.3 with forward secrecy. Our multi-region active-passive infrastructure maintains a verified RPO of < 1 minute and an RTO of < 15 minutes, tested quarterly via automated failover drills.",
      telemetry: {
        retrievalMs: 98,
        guardrailCheckMs: 24,
        synthesisMs: 310,
        totalMs: 432,
        confidence: "98.9%",
        groundednessScore: "0.99",
      },
    },
  },
  {
    id: "employee-policy-faq",
    title: "Employee Policy & Benefits FAQ Agent",
    department: "HR & People",
    industries: ["Enterprise Tech", "Banking & FS", "Manufacturing", "Insurance"],
    outcome: "Save Money",
    effort: "2–4 wks (Low Effort)",
    shortDescription:
      "Grounded, policy-accurate answers resolving repetitive HR tickets and benefits inquiries directly inside Slack and Microsoft Teams.",
    longDescription:
      "Deploys directly into company messaging channels to answer questions on parental leave, health insurance open enrollment, 401(k) match tiers, and PTO balances by reconciling HR handbook PDFs and Workday employee records.",
    keyConnectors: ["Slack", "Microsoft Teams", "Workday", "Notion HR Wiki"],
    guardrails: ["Employee privacy boundary (zero cross-user PII)", "HR escalation triggers", "Jurisdiction filtering"],
    metrics: [
      { label: "Ticket Deflection", value: "78.5% Deflected" },
      { label: "First-Response Time", value: "< 2 Seconds" },
      { label: "HR Team Hours Saved", value: "140 hrs/month" },
    ],
    caseStudyId: "support-swarm",
    demo: {
      categoryLabel: "Parental Leave Inquiry",
      prompt: "How many weeks of paid secondary caregiver leave am I entitled to in California, and what is the notification deadline?",
      sourceDocs: [
        {
          title: "Global Employee Handbook 2026",
          section: "Chapter 6: Family and Medical Leave Policy (US Employees)",
          relevanceScore: "0.978",
          excerpt:
            "Full-time US employees with at least 6 months continuous tenure are eligible for 12 weeks of 100% paid secondary caregiver leave, stackable with California PFL benefits.",
        },
        {
          title: "Benefits FAQ - California Addendum",
          section: "Notice Requirements & Workday Submission",
          relevanceScore: "0.945",
          excerpt:
            "Employees must provide written notice to People Operations at least 30 days prior to the anticipated start date, submitting proof via Workday Absence Portal.",
        },
      ],
      guardrailsPassed: [
        "State jurisdiction checked: California statutes harmonized with internal policy",
        "Employee tenure condition evaluated before affirmative recommendation",
        "Escalation link provided to human People Partner",
      ],
      synthesizedOutput:
        "In California, full-time employees with 6+ months tenure are entitled to 12 weeks of fully paid secondary caregiver leave, which coordinates with California Paid Family Leave (PFL) to ensure 100% salary replacement. You must submit written notice to People Operations via the Workday Absence Portal at least 30 days prior to your anticipated start date.",
      telemetry: {
        retrievalMs: 85,
        guardrailCheckMs: 18,
        synthesisMs: 240,
        totalMs: 343,
        confidence: "99.1%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "expense-budget-policy",
    title: "Expense & Budget Policy Auditor",
    department: "Finance & PE",
    industries: ["Banking & FS", "Private Equity", "Enterprise Tech", "Insurance"],
    outcome: "Save Money",
    effort: "2–4 wks (Low Effort)",
    shortDescription:
      "Source-cited answers and pre-submission audit for expense, travel, and procurement guidelines where finance teams already operate.",
    longDescription:
      "Intersects between employee submissions and accounting approval queues in SAP Concur and Ramp. Automatically flags out-of-policy hotel rates, unauthorized flight classes, and missing itemized VAT invoices with exact policy citations.",
    keyConnectors: ["SAP Concur", "Ramp", "Expensify", "NetSuite"],
    guardrails: ["Strict ledger reconciliation", "Audit trail hashing", "Manager approval hierarchy enforcement"],
    metrics: [
      { label: "Audit Cycle Time", value: "45s vs 4 Days" },
      { label: "Policy Compliance", value: "98.7% Clean" },
      { label: "Expense Leakage", value: "-$340k/yr Saved" },
    ],
    caseStudyId: "sql-rag",
    demo: {
      categoryLabel: "Travel Policy Inquiry",
      prompt: "Can I book business class for a flight from New York to London departing next Tuesday for a client pitch, and what is the hotel per-diem cap?",
      sourceDocs: [
        {
          title: "Corporate Travel & Entertainment Policy 2026",
          section: "§ 3.4 Air Travel Cabin Eligibility",
          relevanceScore: "0.989",
          excerpt:
            "Business class is permitted for continuous scheduled flight durations exceeding 6 hours, or international transatlantic overnight flights. All bookings require VP approval if ticket cost exceeds $3,500.",
        },
        {
          title: "Corporate Travel & Entertainment Policy 2026",
          section: "Schedule C: EMEA City Hotel Ceilings",
          relevanceScore: "0.963",
          excerpt:
            "London tier-1 lodging maximum rate is £280/night (excluding VAT and breakfast). Excess amounts require written pre-authorization from Finance.",
        },
      ],
      guardrailsPassed: [
        "Flight duration verification: JFK-LHR is 7h 10m (exceeds 6-hour threshold)",
        "Currency normalization: GBP per-diem converted to USD equivalent",
        "Approval pathway mapped: Requires VP sign-off if fare > $3,500",
      ],
      synthesizedOutput:
        "Yes, you are eligible for business class because the New York to London route is an international transatlantic flight exceeding 6 hours (§ 3.4). Note that if the ticket exceeds $3,500, VP approval in Concur is required prior to ticketing. For lodging in London, the nightly hotel cap is £280 (excluding VAT/breakfast) as per Schedule C.",
      telemetry: {
        retrievalMs: 110,
        guardrailCheckMs: 25,
        synthesisMs: 260,
        totalMs: 395,
        confidence: "99.2%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "it-helpdesk-deflection",
    title: "IT Helpdesk Deflection Agent",
    department: "IT & Operations",
    industries: ["Enterprise Tech", "Healthcare & Life Sciences", "Manufacturing"],
    outcome: "Save Money",
    effort: "2–4 wks (Low Effort)",
    shortDescription:
      "Resolve repeat L1/L2 IT tickets with grounded, step-by-step answers and automated runbook triggers from Confluence and ServiceNow.",
    longDescription:
      "Connects to internal documentation, device management portals (Jamf, Intune), and ticket queues. Safely executes pre-approved deterministic actions such as password resets, VPN certificate renewals, and software license provisioning.",
    keyConnectors: ["ServiceNow", "Jira Service Management", "Okta Identity", "Jamf / Intune"],
    guardrails: ["MFA re-authentication on password actions", "Safe command sandbox", "Zero admin-grant autonomy"],
    metrics: [
      { label: "L1 Deflection", value: "71.4% Automated" },
      { label: "Resolution Time", value: "35s vs 4.2 hrs" },
      { label: "Zero Misconfigurations", value: "850k Actions" },
    ],
    caseStudyId: "support-swarm",
    demo: {
      categoryLabel: "VPN Certificate Expiry Inquiry",
      prompt: "My GlobalProtect VPN keeps displaying 'Certificate Revoked - Error 504' when connecting from home on my corporate MacBook.",
      sourceDocs: [
        {
          title: "IT Ops Runbook: macOS VPN Troubleshooting",
          section: "Runbook 104: Root CA Expiration Recovery",
          relevanceScore: "0.975",
          excerpt:
            "Error 504 indicates the local device client certificate has expired. Resolution: Open Jamf Self Service > Search 'Renew VPN Certs' > Click Install. Reboot GlobalProtect daemon via menu bar.",
        },
        {
          title: "Zero-Trust Device Compliance Standard",
          section: "Section 2.1: Certificate Rotation Cycle",
          relevanceScore: "0.932",
          excerpt:
            "Client identity certs rotate every 90 days. If Jamf Self Service fails to renew, verify Okta verify push notification before generating emergency one-time ticket.",
        },
      ],
      guardrailsPassed: [
        "Device posture verified: Compliant Jamf MDM enrollment",
        "Deterministic instruction path: Guided self-service script, zero elevated bash execution",
        "Automated status check on GlobalProtect gateway: Status Operational",
      ],
      synthesizedOutput:
        "This error occurs when your local 90-day device client certificate has expired. To resolve this in 60 seconds without an IT ticket: 1) Open the 'Jamf Self Service' app on your Mac, 2) Search for 'Renew VPN Certs' and click Install, 3) Click the GlobalProtect icon in your menu bar, select 'Settings' > 'Refresh Connection'. You will be reconnected immediately.",
      telemetry: {
        retrievalMs: 92,
        guardrailCheckMs: 20,
        synthesisMs: 220,
        totalMs: 332,
        confidence: "99.0%",
        groundednessScore: "0.99",
      },
    },
  },
  {
    id: "sales-enablement-hub",
    title: "Sales Enablement Knowledge Hub Agent",
    department: "Sales & Revenue",
    industries: ["Enterprise Tech", "Banking & FS", "Manufacturing"],
    outcome: "Make Money",
    effort: "3–5 wks (Medium Effort)",
    shortDescription:
      "Synthesize competitor battlecards, pricing matrices, customer meeting prep, and case study proof directly inside Salesforce and Slack.",
    longDescription:
      "Equips account executives and solutions architects with instant contextual answers during live sales cycles. Pulls data from closed-won retrospectives, technical objection playbooks, and contract pricing tables.",
    keyConnectors: ["Salesforce", "Gong.io", "Highspot", "Slack"],
    guardrails: ["Confidential deal pricing isolation", "Competitor claim verification", "Strict attribution"],
    metrics: [
      { label: "Win Rate Uplift", value: "+14.2% Closed-Won" },
      { label: "Prep Time Saved", value: "45 mins per call" },
      { label: "Playbook Adoption", value: "92% Sales Reps" },
    ],
    caseStudyId: "agentic-learning",
    demo: {
      categoryLabel: "Competitor Objection Inquiry",
      prompt: "The prospect's VP of Eng says Datadog already gives them LLM observability and asks why they should adopt our forward-deployed architecture. Give me 3 hard engineering differentiators with proof metrics.",
      sourceDocs: [
        {
          title: "Competitive Battlecard: Datadog APM & LLM Observability",
          section: "Section 2: Architectural Limitations vs Custom Telemetry",
          relevanceScore: "0.981",
          excerpt:
            "Datadog provides passive metrics & trace capture but lacks in-VPC causal DAG isolation, automated canary rollback agents, and AST transpilation validation. DEPLOY embeds forward-deployed engineers into VPCs to ship full source code ownership.",
        },
        {
          title: "SRE Incident Triage Case Study: Fortune 50 FinTech",
          section: "Telemetry Benchmark Table",
          relevanceScore: "0.965",
          excerpt:
            "Client reduced MTTR by 74% (11 mins vs 42 mins) by deploying our autonomous root-cause engine on top of existing Datadog feeds, proving we augment rather than rip-and-replace APMs.",
        },
      ],
      guardrailsPassed: [
        "Factual competitor benchmark: No unsubstantiated FUD claims",
        "Positioning strategy: Emphasizes augmentation & code handover over rip-and-replace",
        "Hard quantitative metrics verified against client case studies",
      ],
      synthesizedOutput:
        "Here are 3 concrete technical differentiators to share: 1) Passive Observability vs Active Remediation: Datadog charts traces; our agents correlate causal DAGs across multi-service telemetry and validate canary rollbacks in 38s (-74% MTTR). 2) Full Source Code Handover: You own 100% of the production agent code in your Git repo without ongoing SaaS per-seat lock-in. 3) Seamless Coexistence: We ingest their existing Datadog / OpenTelemetry streams directly, turning raw logs into deterministic operational intelligence.",
      telemetry: {
        retrievalMs: 120,
        guardrailCheckMs: 29,
        synthesisMs: 285,
        totalMs: 434,
        confidence: "98.6%",
        groundednessScore: "0.99",
      },
    },
  },
  {
    id: "contract-redlining-auditor",
    title: "Contract Redlining & Risk Playbook Agent",
    department: "Legal & Compliance",
    industries: ["Insurance", "Banking & FS", "Enterprise Tech"],
    outcome: "Reduce Risk",
    effort: "4–6 wks (Medium Effort)",
    shortDescription:
      "Review inbound vendor MSAs and generate native Word (.docx) tracked changes aligned with corporate risk playbooks in minutes.",
    longDescription:
      "Ingests inbound procurement agreements and vendor DPAs. Flags non-standard indemnification clauses, uncapped liabilities, governing law mismatches, and data residency risks, inserting pre-approved legal fallback clauses directly into the document.",
    keyConnectors: ["Microsoft Word / Office 365", "Ironclad", "DocuSign CLM", "SharePoint"],
    guardrails: ["Strict legal playbook boundary", "Human general counsel sign-off", "Native OpenXML lossless formatting"],
    metrics: [
      { label: "Turnaround Time", value: "10 Days → 45 Mins" },
      { label: "Playbook Compliance", value: "100% Clauses Checked" },
      { label: "Legal Cost Reduction", value: "-62% Outside Counsel" },
    ],
    caseStudyId: "contract-redlining",
    demo: {
      categoryLabel: "Indemnification Risk Review",
      prompt: "Review Clause 11.2 of the inbound vendor MSA: 'Vendor liability for direct and indirect damages shall be capped at $5,000 or the fees paid in the prior month.' How does this deviate from our playbook, and draft the redline.",
      sourceDocs: [
        {
          title: "Corporate Legal Playbook 2026",
          section: "Playbook Rule 14: Limitation of Liability Standards",
          relevanceScore: "0.991",
          excerpt:
            "Standard mutual liability cap must equal 12 months fees paid. Sub-limits for data breaches and confidentiality breaches must be uncapped or maintain a super-cap of at least 3x-5x total contract value.",
        },
      ],
      guardrailsPassed: [
        "Playbook rule match: Violation of Rule 14 (1 month fee cap is unacceptable)",
        "Exclusion of indirect damages checked against IP infringement indemnification",
        "Deterministic OpenXML XML insertion format prepared",
      ],
      synthesizedOutput:
        "DEVIATION ANALYSIS: Clause 11.2 violates Playbook Rule 14 by capping vendor liability at $5,000 / 1 month fees, while completely excluding indirect damages with no super-cap for confidentiality or data breaches.\n\nRECOMMENDED REDLINE:\n'11.2 Limitation of Liability. Except for breaches of Section 8 (Confidentiality) or Section 12 (Indemnification), each party's aggregate liability under this Agreement shall be capped at [DELETED: $5,000 or the fees paid in the prior month] [INSERTED: the total fees paid or payable by Customer in the twelve (12) months preceding the claim]. Neither party shall be liable for indirect damages, provided that this limitation does not apply to gross negligence or willful misconduct.'",
      telemetry: {
        retrievalMs: 104,
        guardrailCheckMs: 31,
        synthesisMs: 320,
        totalMs: 455,
        confidence: "99.7%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "client-meeting-prep",
    title: "Client Meeting Prep & Intelligence Agent",
    department: "Sales & Revenue",
    industries: ["Private Equity", "Banking & FS", "Enterprise Tech"],
    outcome: "Make Money",
    effort: "2–4 wks (Low Effort)",
    shortDescription:
      "Synthesize CRM transaction history, earnings call transcripts, news, and executive moves into concise 1-page briefing notes 30 minutes before calls.",
    longDescription:
      "Automates high-touch account preparation for investment bankers, managing partners, and strategic account directors. Monitors public filings, executive departures, and internal deal history to arm executives with targeted conversation starters.",
    keyConnectors: ["Salesforce", "FactSet / Bloomberg API", "Google Calendar", "PitchBook"],
    guardrails: ["Confidential deal wall segregation", "Public vs MNPI validation", "Time-decayed news filtering"],
    metrics: [
      { label: "Briefing Generation", value: "Instant vs 2 hrs" },
      { label: "Executive Coverage", value: "100% of Client Calls" },
      { label: "Deal Pipeline Impact", value: "+22% Repeat Velocity" },
    ],
    caseStudyId: "sql-rag",
    demo: {
      categoryLabel: "Executive Briefing Inquiry",
      prompt: "Generate 1-page executive brief for our 2:00 PM strategy sync with the Chief Technology Officer of Apex Financial.",
      sourceDocs: [
        {
          title: "Apex Financial - Account Record & Deal History",
          section: "Q3 2026 Architecture Review Notes",
          relevanceScore: "0.985",
          excerpt:
            "Apex operates 220 PostgreSQL databases across AWS and on-premises data centers. Current priority: Automating claims intake under HIPAA and migrating legacy mainframe services.",
        },
        {
          title: "Industry News Feed: Apex Financial Group",
          section: "Press Release Aug 2026",
          relevanceScore: "0.952",
          excerpt:
            "CTO Marcus Vance announced $40M initiative to reduce cloud egress costs and enforce mathematical differential privacy across all analytics pipelines.",
        },
      ],
      guardrailsPassed: [
        "Confidential relationship tags validated for Marcus Vance",
        "Public news harmonized with private Salesforce past meeting notes",
        "Clear talking points structured into executive summary",
      ],
      synthesizedOutput:
        "EXECUTIVE BRIEFING: APEX FINANCIAL (CTO MARCUS VANCE)\n• Core Agenda: Cloud cost optimization & private synthetic data architecture.\n• Background: Apex manages 220 DBs; CTO just publicly announced a $40M FinOps & differential privacy initiative.\n• Key Talking Point: Highlight our Relational Synthetic Data Generator (epsilon = 0.5 DP) which reduced egress costs by 63% and passed rigorous financial compliance.\n• Deal History: Renewed Q2 core contract ($380k ARR); CTO values deterministic code delivery over black-box SaaS.",
      telemetry: {
        retrievalMs: 135,
        guardrailCheckMs: 22,
        synthesisMs: 270,
        totalMs: 427,
        confidence: "99.1%",
        groundednessScore: "0.98",
      },
    },
  },
  {
    id: "vendor-risk-assessment",
    title: "Vendor Risk & Third-Party Assessment Agent",
    department: "Legal & Compliance",
    industries: ["Banking & FS", "Healthcare & Life Sciences", "Insurance"],
    outcome: "Reduce Risk",
    effort: "4–6 wks (Medium Effort)",
    shortDescription:
      "Parse SOC 2 Type II reports, ISO certifications, and DPA agreements to isolate third-party security vulnerabilities and supply-chain risk.",
    longDescription:
      "Replaces the manual security questionnaire bottleneck in procurement. Scans vendor SOC 2 audit reports to detect auditor qualifications, unmitigated user entity controls (CUECs), penetration test findings, and cross-border data transfer gaps.",
    keyConnectors: ["ServiceNow GRC", "OneTrust", "AWS S3 Vault", "Jira"],
    guardrails: ["Zero-trust evaluation schema", "SOC 2 Trust Criteria taxonomy", "Audit defensible paper trail"],
    metrics: [
      { label: "Vendor Assessment", value: "15 Mins vs 3 Weeks" },
      { label: "Audit Finding Catch Rate", value: "99.4%" },
      { label: "Procurement Cycle", value: "-75% Bottleneck" },
    ],
    caseStudyId: "cloud-compliance",
    demo: {
      categoryLabel: "SOC 2 Audit Review",
      prompt: "Analyze Vendor SOC 2 Type II Section IV: Are there any auditor qualifications or open exceptions regarding encryption key management or backup restoration?",
      sourceDocs: [
        {
          title: "CloudData Corp SOC 2 Type II (Period ending June 2026)",
          section: "Independent Service Auditor's Report - Section I & IV",
          relevanceScore: "0.993",
          excerpt:
            "Auditor Exception 2026-03: For 2 of 45 sampled quarters, vendor failed to perform documented database restoration tests from cold immutable storage. Management responded with automated AWS Lambda drill implementation.",
        },
      ],
      guardrailsPassed: [
        "Auditor opinion checked: Unqualified with explanatory exception noted",
        "Trust Services Criteria evaluated: Availability Criteria A1.2 affected",
        "Remediation verification: Evaluated vendor management response",
      ],
      synthesizedOutput:
        "VENDOR RISK ASSESSMENT RESULT: CONDITIONAL APPROVAL WITH 1 EXCEPTION\n• Auditor Opinion: The report contains an unqualified opinion, but records 1 open exception (Exception 2026-03) under Availability Criteria A1.2.\n• Finding: Vendor failed to execute quarterly database restoration tests from immutable backups in Q1 and Q2.\n• Recommendation: Require vendor to provide certified AWS Lambda automated backup drill logs within 30 days as a binding condition in the Service Level Agreement (SLA).",
      telemetry: {
        retrievalMs: 148,
        guardrailCheckMs: 34,
        synthesisMs: 295,
        totalMs: 477,
        confidence: "99.5%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "clinical-coding-intake",
    title: "Clinical Coding & Adjudication Agent",
    department: "Finance & PE",
    industries: ["Healthcare & Life Sciences", "Insurance"],
    outcome: "Save Money",
    effort: "6–8 wks (Strategic)",
    shortDescription:
      "Extract diagnostic notes, validate against ICD-10/CPT coding standards, and flag unbundling errors before claim adjudication submission.",
    longDescription:
      "Operates inside air-gapped HIPAA VPC environments to process clinical intake records and physician dictations. Maps symptoms and lab procedures to standard FHIR entities, cutting denial rates and payment reconciliation cycles.",
    keyConnectors: ["Epic EHR", "Cerner", "FHIR / HL7 API", "Clearinghouse 837P"],
    guardrails: ["HIPAA Safe Harbor de-identification", "Physician-in-the-loop review", "CMS billing rules engine"],
    metrics: [
      { label: "Claims Precision", value: "99.2% Accuracy" },
      { label: "Denial Reduction", value: "-82% Billing Errors" },
      { label: "Adjudication Speed", value: "48h vs 28 Days" },
    ],
    caseStudyId: "healthcare-claims",
    demo: {
      categoryLabel: "Clinical Intake Coding Inquiry",
      prompt: "Extract primary ICD-10 diagnosis and CPT billing codes for patient admitted with acute exacerbation of COPD with acute hypoxemic respiratory failure, requiring 90 minutes of critical care.",
      sourceDocs: [
        {
          title: "CMS Official ICD-10-CM Coding Guidelines 2026",
          section: "Chapter 10: Diseases of the Respiratory System (J00-J99)",
          relevanceScore: "0.995",
          excerpt:
            "When COPD is exacerbated with acute respiratory failure, assign J44.1 (COPD with acute exacerbation) and J96.01 (Acute respiratory failure with hypoxia). Code sequencing requires acute condition sequenced first if admitted primarily for respiratory failure.",
        },
        {
          title: "AMA CPT Coding Guidelines: Critical Care Services",
          section: "CPT 99291 and 99292",
          relevanceScore: "0.982",
          excerpt:
            "CPT 99291 reports first 30-74 minutes of critical care. CPT 99292 reports each additional 30 minutes beyond first 74 minutes.",
        },
      ],
      guardrailsPassed: [
        "Zero-Trust De-Identification: Patient Name and MRN scrubbed",
        "CMS Sequencing Rules enforced: J96.01 primary, J44.1 secondary",
        "Physician confirmation required prior to clearinghouse EDI 837 transmission",
      ],
      synthesizedOutput:
        "RECOMMENDED CLINICAL CODES:\n• Primary Diagnosis: J96.01 (Acute respiratory failure with hypoxia)\n• Secondary Diagnosis: J44.1 (COPD with acute exacerbation)\n• Procedure Codes (90 mins critical care):\n  - CPT 99291: Critical care, evaluation and management, first 30-74 minutes\n  - CPT 99292 (x1 unit): Additional 30 minutes\n• Audit Flag: Coding fully validated against CMS NCCI edits. All medical necessity criteria satisfied.",
      telemetry: {
        retrievalMs: 165,
        guardrailCheckMs: 42,
        synthesisMs: 310,
        totalMs: 517,
        confidence: "99.6%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "monolith-migration-copilot",
    title: "Monolith Code Modernization Copilot",
    department: "R&D & Engineering",
    industries: ["Banking & FS", "Enterprise Tech", "Insurance"],
    outcome: "Accelerate Velocity",
    effort: "6–10 wks (Strategic)",
    shortDescription:
      "Transpile monolithic legacy Java/COBOL into modern Go/TypeScript microservices with automated AST verification and differential fuzzing.",
    longDescription:
      "Engineered for core banking and enterprise platforms stuck on monolithic codebases. Extracts domain bounded contexts, parses Abstract Syntax Trees (ASTs), and verifies transpiled services through automated differential fuzzing.",
    keyConnectors: ["GitHub Enterprise", "GitLab CI", "SonarQube", "Maven / Gradle"],
    guardrails: ["100% test branch coverage check", "Differential fuzzing equivalence test", "Zero unsafe runtime reflection"],
    metrics: [
      { label: "Lines Transpiled", value: "1.8M LOC Migrated" },
      { label: "Equivalence Fidelity", value: "100% Differential Pass" },
      { label: "Migration Velocity", value: "5x Faster than Manual" },
    ],
    caseStudyId: "legacy-migration",
    demo: {
      categoryLabel: "Legacy Code Migration Inquiry",
      prompt: "Transpile monolithic Java Spring 3 EJB transaction processing method with database locks into modern idiomatic Go with PostgreSQL pgx transactions and context cancellation.",
      sourceDocs: [
        {
          title: "DEPLOY AST Compilers & Equivalent Spec v3",
          section: "Section 4: Enterprise Java to Go Idiomatic Mappings",
          relevanceScore: "0.988",
          excerpt:
            "Spring @Transactional declarations map to explicit Go db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted}) blocks with deferred Rollback and context timeout enforcement.",
        },
      ],
      guardrailsPassed: [
        "Memory allocation audit: Passed (Zero unhandled pointer escapes)",
        "Concurrency safety: Mutex / Transaction locks validated against deadlock graphs",
        "Differential fuzzing suite: 10,000 synthetic test transactions generated and executed",
      ],
      synthesizedOutput:
        "// Generated Go Microservice - Differential Verified Pass\nfunc (s *TransferService) ProcessLedgerTransfer(ctx context.Context, req TransferReq) error {\n    tx, err := s.pool.Begin(ctx)\n    if err != nil {\n        return fmt.Errorf(\"begin tx: %w\", err)\n    }\n    defer tx.Rollback(ctx)\n\n    // Row lock source account to prevent race condition\n    var balance decimal.Decimal\n    err = tx.QueryRow(ctx, \"SELECT balance FROM accounts WHERE id = $1 FOR UPDATE\", req.SourceID).Scan(&balance)\n    if err != nil || balance.LessThan(req.Amount) {\n        return ErrInsufficientFunds\n    }\n\n    // Atomic debit and credit\n    if _, err := tx.Exec(ctx, \"UPDATE accounts SET balance = balance - $1 WHERE id = $2\", req.Amount, req.SourceID); err != nil {\n        return err\n    }\n    return tx.Commit(ctx)\n}",
      telemetry: {
        retrievalMs: 115,
        guardrailCheckMs: 30,
        synthesisMs: 340,
        totalMs: 485,
        confidence: "99.3%",
        groundednessScore: "0.99",
      },
    },
  },
  {
    id: "supply-chain-rerouting",
    title: "Supply Chain Disruption & Re-Routing Agent",
    department: "IT & Operations",
    industries: ["Manufacturing", "Enterprise Tech"],
    outcome: "Reduce Risk",
    effort: "6–8 wks (Strategic)",
    shortDescription:
      "Ingest freight manifests and port delay signals to predict dwell times 7 days ahead and recommend optimal container re-routing.",
    longDescription:
      "Correlates live satellite AIS vessel feeds, customs manifest delays, and extreme weather alerts to solve multi-echelon mixed-integer linear programming (MILP) re-routing before costly port demurrage fees accrue.",
    keyConnectors: ["SAP S/4HANA", "Satellite AIS Feed", "FourKites / Project44", "Flexport API"],
    guardrails: ["Contractual freight rate boundaries", "Customs clearance compliance", "Vessel transit feasibility check"],
    metrics: [
      { label: "Foresight Horizon", value: "7-Day Bottleneck Alert" },
      { label: "Demurrage Saved", value: "-$1.2M / Quarter" },
      { label: "On-Time Arrival", value: "94.8% Retained" },
    ],
    caseStudyId: "supply-chain",
    demo: {
      categoryLabel: "Port Disruption Contingency Inquiry",
      prompt: "42 refrigerated containers bound for Port of Rotterdam are delayed due to terminal crane breakdown. Recommend alternative routing to European distribution centers in under 36 hours.",
      sourceDocs: [
        {
          title: "North Sea Maritime Bottleneck Advisory",
          section: "Rotterdam Maasvlakte II Congestion Report",
          relevanceScore: "0.992",
          excerpt:
            "Port of Rotterdam experiencing 96-hour average vessel dwell time. Port of Antwerp and Port of Hamburg operating at 92% capacity with immediate berth availability for feeder vessels.",
        },
      ],
      guardrailsPassed: [
        "Reefer temperature telemetry confirmed stable (+2.4°C)",
        "EU Customs transit compliance (T1 document validity verified)",
        "Intermodal rail freight connection confirmed with DB Cargo",
      ],
      synthesizedOutput:
        "OPTIMAL RE-ROUTING RECOMMENDATION:\n• Primary Action: Divert vessel to Port of Antwerp (Berth 1700) with feeder arrival in 18 hours.\n• Intermodal Rail Link: Pre-booked 42 reefer chassis on DB Cargo rail corridor to Frankfurt Distribution Center.\n• Financial Impact: Eliminates an estimated €184,000 in demurrage penalties and temperature spoilage risk. Total transit delay minimized to +12 hours versus +96 hours in Rotterdam.",
      telemetry: {
        retrievalMs: 140,
        guardrailCheckMs: 36,
        synthesisMs: 290,
        totalMs: 466,
        confidence: "98.8%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "support-swarm-guardrails",
    title: "Customer Support Swarm with Action Guardrails",
    department: "IT & Operations",
    industries: ["Enterprise Tech", "Banking & FS", "Insurance"],
    outcome: "Save Money",
    effort: "4–6 wks (Medium Effort)",
    shortDescription:
      "Autonomous Tier-1 ticket resolution with deterministic refund caps, prompt injection defense, and idempotency tokens across billing APIs.",
    longDescription:
      "A coordinated swarm of specialized agents (Intake, Policy Evaluator, Mutation Executor, Audit Logger) handling complex tier-1 customer inquiries. Executes financial mutations strictly within deterministic sandboxes with zero prompt injection vulnerability.",
    keyConnectors: ["Zendesk", "Intercom", "Stripe API", "Datadog / OpenTelemetry"],
    guardrails: ["Deterministic refund cap ($200 auto-limit)", "Idempotency token locks", "Prompt injection immune filter"],
    metrics: [
      { label: "Deflection Rate", value: "71.4% Deflected" },
      { label: "Unsafe Mutations", value: "0 in 850k Actions" },
      { label: "Response Latency", value: "480ms Roundtrip" },
    ],
    caseStudyId: "support-swarm",
    demo: {
      categoryLabel: "Automated Billing & Refund Request",
      prompt: "Customer #84920 was double-billed $49.00 due to network timeout during subscription renewal. Customer requests immediate refund to original payment card.",
      sourceDocs: [
        {
          title: "Billing Guardrail Engine Rulebook v3",
          section: "Rule 4.1: Automated Charge Discrepancy Remediation",
          relevanceScore: "0.998",
          excerpt:
            "If duplicate charges occur within 15 minutes for identical amounts and identical idempotency payloads, agent is authorized to issue refund up to $200 instantly without human review.",
        },
      ],
      guardrailsPassed: [
        "Transaction verification: Stripe API confirmed two charges of $49.00 at 08:14:02 and 08:14:08",
        "Deterministic Refund Cap check: $49.00 is well below $200 limit",
        "Idempotency token generated: req_refund_84920_dup2026",
      ],
      synthesizedOutput:
        "AUTOMATED RESOLUTION COMPLETED:\n• Transaction Audit: Verified duplicate transaction `ch_3M4829` for $49.00 on Visa ****4129 at 08:14:08.\n• Action Executed: Issued full refund of $49.00 via Stripe API with idempotency token `req_refund_84920_dup2026`.\n• Customer Confirmation Sent: 'We identified the duplicate charge from the brief network timeout and have automatically issued a $49.00 refund to your card. Funds will reflect in 2-3 business days. Your subscription remains fully active.'\n• System State: Zero human intervention required; full audit entry logged to Datadog.",
      telemetry: {
        retrievalMs: 78,
        guardrailCheckMs: 15,
        synthesisMs: 210,
        totalMs: 303,
        confidence: "99.9%",
        groundednessScore: "1.00",
      },
    },
  },
  {
    id: "synthetic-data-generator",
    title: "Relational Synthetic Data Privacy Agent",
    department: "Finance & PE",
    industries: ["Banking & FS", "Healthcare & Life Sciences", "Enterprise Tech"],
    outcome: "Reduce Risk",
    effort: "4–6 wks (Medium Effort)",
    shortDescription:
      "Generate mathematically proven epsilon-differentially private synthetic databases that preserve relational foreign keys across 200+ tables.",
    longDescription:
      "Empowers engineering teams to test against realistic, production-scale relational databases without exposing client PII or violating GDPR/HIPAA regulations. Preserves multi-table dependencies, statistical distributions, and edge-case anomalies.",
    keyConnectors: ["PostgreSQL", "Snowflake", "Databricks", "Amazon RDS"],
    guardrails: ["Mathematical Epsilon (ε = 0.5) Differential Privacy", "Foreign Key Tree Integrity", "Zero Raw Row Leakage"],
    metrics: [
      { label: "Privacy Guarantee", value: "ε = 0.5 Math DP" },
      { label: "Throughput", value: "2.4M Rows / Min" },
      { label: "Relational Tables", value: "220 Tables Mapped" },
    ],
    caseStudyId: "synthetic-data",
    demo: {
      categoryLabel: "Database Anonymization Inquiry",
      prompt: "Configure synthetic data generation for 14 enterprise banking tables including accounts, transactions, and wire transfers, ensuring statistical parity with zero customer leakage.",
      sourceDocs: [
        {
          title: "DEPLOY Differential Privacy Engine Architecture",
          section: "Section 2: Copula Relational DAG Modeling",
          relevanceScore: "0.991",
          excerpt:
            "Preserves marginal distributions and multi-table foreign key constraints using Gaussian copula generative models calibrated to ε = 0.5 and delta = 10^-6 mathematical differential privacy.",
        },
      ],
      guardrailsPassed: [
        "Re-identification attack simulation: 0.00% success rate across 1,000,000 queries",
        "Referential integrity validated across 14 tables (0 orphaned foreign keys)",
        "GDPR Article 25 & 32 Compliance certificate generated",
      ],
      synthesizedOutput:
        "SYNTHETIC DATA PIPELINE READY:\n• Schema Footprint: 14 tables, 148 foreign key constraints mapped.\n• Mathematical Privacy: Calibrated at ε = 0.5, δ = 10⁻⁶ differential privacy guarantee.\n• Data Parity: Preserves mean transaction sizes, fraud distribution tails, and seasonal velocity curves within 1.2% Kolmogorov-Smirnov distance.\n• Output Staging: 500,000 synthetic records exported to staging database at 2.4M rows/minute with zero production data leakage.",
      telemetry: {
        retrievalMs: 130,
        guardrailCheckMs: 28,
        synthesisMs: 275,
        totalMs: 433,
        confidence: "99.8%",
        groundednessScore: "1.00",
      },
    },
  },
];

export const DEPARTMENTS: ("All Departments" | AgentDepartment)[] = [
  "All Departments",
  "Finance & PE",
  "Legal & Compliance",
  "Sales & Revenue",
  "HR & People",
  "IT & Operations",
  "R&D & Engineering",
];

export const INDUSTRIES: AgentIndustry[] = [
  "All Industries",
  "Banking & FS",
  "Insurance",
  "Private Equity",
  "Healthcare & Life Sciences",
  "Manufacturing",
  "Enterprise Tech",
];

export const OUTCOMES: ("All Outcomes" | BusinessOutcome)[] = [
  "All Outcomes",
  "Save Money",
  "Make Money",
  "Reduce Risk",
  "Accelerate Velocity",
];
