export const site = {
  name: "Build Fast with AI",
  product: "DEPLOY",
  title: "DEPLOY — Build the system. Ship it fast.",
  description:
    "Forward-deployed AI engineers embed with your team, turn one real workflow into a deployed production system, and hand you the code and the capability.",
};

export const images = {
  metrics: "/images/metrics.jpg",
  pod: "/images/pod.jpg",
  finalCta: "/images/finalCta.jpg",
};

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#projects" },
    { label: "The build", href: "#sprint" },
    { label: "Use cases", href: "#usecases" },
  ],
  cta: { label: "Book a 30-min call", href: "#call" },
};

/* One claim, one line, one action. Everything else earns its place further down. */
export const hero = {
  eyebrow: "Forward-deployed AI engineering",
  titleLine1: "Build the system.",
  titleLine2: "Ship it fast.",
  sub: "AI engineers inside your team. One workflow, into production.",
  primaryCta: { label: "Book a 30-min call", href: "#call" },
  /** set inside the orbiting ring — keep it one short word */
  mark: "DEPLOY",
};

export const proof = {
  label: "Built for, taught to, and trusted by teams at",
  // `file` maps to /public/logos/<file>.png
  companies: [
    { name: "Accel", file: "accel" },
    { name: "BCG", file: "bcg" },
    { name: "Schneider Electric", file: "schneider" },
    { name: "HPE", file: "hpe" },
    { name: "Google", file: "google" },
    { name: "Amazon", file: "amazon" },
    { name: "McKinsey", file: "mckinsey" },
    { name: "Shell", file: "shell" },
    { name: "Freshworks", file: "freshworks" },
    { name: "Wispr Flow", file: "wisprflow" },
    { name: "mem0", file: "mem0" },
    { name: "FloCareer", file: "flocareer" },
    { name: "CodeYoung", file: "codeyoung" },
    { name: "IIT Bombay", file: "iitb" },
  ],
};

/* ---------------------------------------------------------------------------
   Projects sit high on the page on purpose: the work is what earns the scroll.
--------------------------------------------------------------------------- */
export const work = {
  eyebrow: "The work",
  title: "Shipped,",
  titleAccent: "not slideware.",
  sub: "Named projects, running in a client's environment today. Each one measured against a number they already had before we arrived.",
  /* The numbers live in the project index below — a card that carried them too
     read as a dashboard tile. */
  projects: [
    {
      visual: "sqlRag" as const,
      sector: "Enterprise analytics",
      title: "Enterprise SQL RAG",
      line: "Ask in English. Get the right number back.",
      points: ["Business semantics layer", "Cost-aware model routing", "Human feedback loop"],
    },
    {
      visual: "interviewer" as const,
      sector: "Technical hiring",
      title: "Real-Time AI Interviewer",
      line: "Live voice screening that can defend its score.",
      points: ["Sandboxed live coding", "Explainable scoring"],
    },
    {
      visual: "documents" as const,
      sector: "Back office",
      title: "Document Intelligence",
      line: "Invoices and contracts, read and checked at volume.",
      points: ["Automated compliance", "Full audit trail"],
    },
    {
      visual: "learning" as const,
      sector: "Education",
      title: "Agentic Learning System",
      line: "1:1 teaching that moves at each learner's pace.",
      points: ["9 learner stages", "30+ capabilities", "Teacher stays in control"],
    },
    {
      visual: "conversationalBI" as const,
      sector: "Food services",
      title: "Conversational BI",
      line: "Answers pulled from the systems of record, daily.",
      points: ["Modular agent framework", "Used by the operating team"],
    },
    {
      visual: "sutra" as const,
      sector: "Developer relations",
      title: "SUTRA LLM Launch",
      line: "Took a new model family to its developer audience.",
      points: ["Technical documentation", "Demo integrations"],
    },
  ],
};

/* ---------------------------------------------------------------------------
   Two tabs, six rows each, one detail panel — so the index stays one screen
   tall no matter how many projects end up in it.
--------------------------------------------------------------------------- */
export const projectIndex = {
  eyebrow: "Project index",
  title: "The full list,",
  titleAccent: "in one screen.",
  sub: "Client deployments, and the components we carry into every new build — which is why the second workflow costs less than the first.",
  groups: [
    {
      label: "Client deployments",
      note: "Live in a client environment",
      items: [
        {
          name: "Enterprise SQL RAG",
          domain: "Enterprise analytics",
          metric: "~95%",
          metricLabel: "query accuracy",
          systems: "Warehouse · semantic layer · model routing · eval harness",
          outcome:
            "A text-to-SQL prototype rebuilt into an analytics engine the business trusts, with a human feedback loop behind the accuracy.",
        },
        {
          name: "Real-Time AI Interviewer",
          domain: "Technical hiring",
          metric: "60%",
          metricLabel: "less manual interview time",
          systems: "Realtime voice · ATS · code sandbox · scoring rubric",
          outcome:
            "Live voice interviews with sandboxed coding and explainable scoring, so a rejection can always be justified.",
        },
        {
          name: "Agentic Learning System",
          domain: "Education",
          metric: "45%",
          metricLabel: "more student engagement",
          systems: "Teacher copilot · mastery model · 30+ capabilities",
          outcome:
            "1:1 education across nine learner stages, with the autonomy boundary drawn explicitly around what a teacher must approve.",
        },
        {
          name: "Document Intelligence Pipeline",
          domain: "Back office",
          metric: "80%",
          metricLabel: "less processing time",
          systems: "Invoices · contracts · reports · compliance checks",
          outcome:
            "Extraction and verification at volume inside a regulated workflow, with the audit trail the auditors actually asked for.",
        },
        {
          name: "Conversational BI",
          domain: "Food services",
          metric: "Multi-agent",
          metricLabel: "RAG over live sales data",
          systems: "Sales DB · agent framework · chat interface",
          outcome:
            "Natural-language questions answered from the systems of record, used daily by the operating team rather than a demo audience.",
        },
        {
          name: "SUTRA LLM Launch",
          domain: "Developer relations",
          metric: "1,000+",
          metricLabel: "developers in launch week",
          systems: "Docs · demo integrations · community",
          outcome:
            "Developer relations for a new model family through its launch window — the least teachable forward-deployed skill, demonstrated.",
        },
      ],
    },
    {
      label: "Components we reuse",
      note: "Carried into every new build",
      items: [
        {
          name: "Agent harness",
          domain: "Core",
          metric: "Traced",
          metricLabel: "every tool call recorded",
          systems: "Tool permissions · retries · execution traces",
          outcome:
            "Agents you can audit after the fact, because every decision and tool call is recorded rather than inferred.",
        },
        {
          name: "Retrieval & knowledge layer",
          domain: "Core",
          metric: "Cited",
          metricLabel: "answers carry their source",
          systems: "Policies · manuals · internal history",
          outcome:
            "Retrieval over your own documents where every answer cites its source and respects the access rules already in place.",
        },
        {
          name: "MCP & integration connectors",
          domain: "Integrations",
          metric: "MCP",
          metricLabel: "standard, not bespoke glue",
          systems: "Model Context Protocol servers over your systems",
          outcome:
            "Agents reach your stack through a standard protocol, so the next workflow does not pay for the same integration twice.",
        },
        {
          name: "Evaluation suite",
          domain: "Quality",
          metric: "Tested",
          metricLabel: "not demoed once",
          systems: "Regression runs · scoring · drift checks",
          outcome:
            "The workflow is tested systematically, so a model upgrade is a decision with evidence rather than a gamble.",
        },
        {
          name: "Observability layer",
          domain: "Operations",
          metric: "Inspectable",
          metricLabel: "every run, end to end",
          systems: "Inputs · decisions · tool calls · errors · outcomes",
          outcome:
            "When something looks wrong, the run can be opened and read instead of reproduced from guesswork.",
        },
        {
          name: "Human-approval controls",
          domain: "Risk",
          metric: "Bounded",
          metricLabel: "explicit action limits",
          systems: "Action boundaries · sign-off queues · audit trail",
          outcome:
            "The system never acts alone where it should not, and the boundary is written down before anything goes live.",
        },
      ],
    },
  ],
};

export const problem = {
  eyebrow: "Why most AI never ships",
  title: "Your pilot worked.",
  titleAccent: "It still didn't ship.",
  titleAfter: "That gap is the whole business.",
  sub: "The demo is the easy part. What kills projects is everything after it — integrations, permissions, edge cases, evaluations, and nobody accountable for the thing running on a Monday morning.",
  stats: [
    {
      value: 95,
      suffix: "%",
      label: "of enterprise GenAI pilots deliver no measurable P&L impact",
      source: "MIT, State of AI in Business, 2025",
    },
    {
      value: 9,
      suffix: "%",
      label: "fewer than one in ten GenAI POCs in India ever reach production",
      source: "EY–CII, AIdea of India, 2025",
    },
    {
      value: 42,
      suffix: "%",
      label: "of companies abandoned most AI initiatives in 2025, up from 17%",
      source: "S&P Global, 2025",
    },
  ],
};

export const manifesto = {
  eyebrow: "The forward-deployed model",
  title: "We deleted",
  titleAccent: "the deck.",
  sub: "A forward-deployed engineer works inside your business instead of advising it from the outside — same Slack, same standups, same messy data. Palantir invented the model; OpenAI, Anthropic and AWS have since built teams around it.",
  oldWay: {
    heading: "The old way (consulting)",
    items: [
      "A 40-page strategy deck, delivered in month three",
      "A pilot that demos well and dies before production",
      "Advice billed by the hour, owned by no one",
      "A handoff of code your team never built",
    ],
  },
  shipWay: {
    heading: "The forward-deployed way",
    items: [
      "Engineers inside your team from day one",
      "A system in production, measured on your own baseline",
      "One workflow, fixed scope, end-to-end accountability",
      "Your team ships alongside us and keeps the capability",
    ],
  },
  quote: {
    before: "“Most companies don't have an AI problem. They have a ",
    highlight: "deployment problem",
    after: ".”",
  },
};

export type Stage = {
  no: string;
  days: string;
  title: string;
  line: string;
  marks: string[];
};

export const sprint = {
  eyebrow: "How a build runs",
  title: "Four steps.",
  titleAccent: "One workflow.",
  sub: "No parallel workstreams and no discovery phase. We pick the one workflow worth automating first, then take it all the way.",
  stages: [
    {
      no: "01",
      days: "Week 1",
      title: "Embed & scope",
      line: "Three days in your Slack and your standups. We leave with one workflow and a number to beat.",
      marks: [
        "Workflow picked and scoped",
        "Baseline agreed in writing",
        "System and data access in place",
      ],
    },
    {
      no: "02",
      days: "Weeks 2–3",
      title: "Build against reality",
      line: "Your real data and the edge cases your pilot skipped. You see it running at the end of every day.",
      marks: [
        "A working system, not a prototype",
        "Live integrations into your stack",
        "Evals, retries and failure handling",
      ],
    },
    {
      no: "03",
      days: "Weeks 4–5",
      title: "Deploy to production",
      line: "It runs alongside your current process until the numbers say switch. This is the step that usually never happens.",
      marks: [
        "Live inside your environment",
        "Human approval on the risky steps",
        "Measured against the week-one baseline",
      ],
    },
    {
      no: "04",
      days: "Week 6",
      title: "Hand over & train",
      line: "We document it, sit with whoever will run it, and get out of the way.",
      marks: [
        "Docs and operating playbooks",
        "Eval suites your team can re-run",
        "Full ownership of the code",
      ],
    },
  ] as Stage[],
  railStart: "Day 0 — pilot chaos",
  railEnd: "Week 6 — in production",
};

export const useCases = {
  eyebrow: "Where it applies",
  title: "Find the workflow",
  titleAccent: "worth automating first.",
  sub: "These are the shapes we see most often. If one of them looks like your Monday morning, that's the workflow to bring to the call.",
  items: [
    {
      fn: "Sales & Growth",
      icon: "signal" as const,
      example: "Lead revival",
      body: "Spot intent, research the account, draft outreach, stop for approval.",
    },
    {
      fn: "Operations",
      icon: "approval" as const,
      example: "Approval router",
      body: "Reconcile status across systems, chase only what is outstanding.",
    },
    {
      fn: "Finance",
      icon: "ledger" as const,
      example: "Cash collection",
      body: "Rank overdue invoices and prepare the action for each account.",
    },
    {
      fn: "People",
      icon: "onboard" as const,
      example: "Employee onboarding",
      body: "Role-based tasks, baseline access, readiness verified before day one.",
    },
    {
      fn: "Engineering",
      icon: "release" as const,
      example: "Release readiness",
      body: "Tests, CI/CD, migrations, approvals and incidents, checked before ship.",
    },
    {
      fn: "Risk & Compliance",
      icon: "evidence" as const,
      example: "Evidence pack",
      body: "Collect evidence, validate coverage, flag gaps, package for review.",
    },
  ],
  fitEyebrow: "This works when",
  fit: [
    "A named person owns the workflow and cares about the result",
    "A baseline already exists — time, cost, throughput, errors or SLA",
    "The data, APIs and representative inputs can be made available",
    "You run multiple systems and repeated, high-volume workflows",
    "There is an AI mandate or a POC backlog, but no dedicated AI capacity",
  ],
};

export const pod = {
  eyebrow: "Who actually shows up",
  title: "Two engineers.",
  titleAccent: "Inside your team.",
  sub: "Not a delivery manager and four juniors. A two-person pod that splits the work the way the problem splits.",
  roles: [
    {
      tag: "FDE 01",
      title: "Product / Workflow",
      body: "Owns the business process, the users, the decision points, the interface and the acceptance criteria. In your standups daily.",
    },
    {
      tag: "FDE 02",
      title: "Engineering / AI",
      body: "Owns integrations, orchestration, agents, retrieval, models, evaluations, permissions, reliability and observability. Builds live.",
    },
  ],
  credsEyebrow: "The team behind the pod",
  creds: [
    { figure: "500+", label: "AI applications launched" },
    { figure: "150+", label: "consulting programs delivered" },
    { figure: "15,000+", label: "professionals trained" },
    { figure: "40,000+", label: "practitioner community" },
  ],
  points: [
    "Led by Satvik Paramkusham — IIT Delhi, visiting faculty at IIT Bombay, 100K+ on YouTube",
    "The engineers who ship the work run the handover — there is no separate delivery layer",
    "Production patterns come from systems already running for clients, not from a playbook",
  ],
};

export const engagement = {
  eyebrow: "The engagement",
  title: "What you get,",
  titleAccent: "spelled out.",
  details: {
    heading: "How a build runs",
    rows: [
      { k: "Shape", v: "One named workflow · fixed scope · end-to-end accountability" },
      { k: "Team", v: "A 2-engineer forward-deployed pod, embedded with yours" },
      { k: "Timeline", v: "4–6 weeks, depending on how many systems it touches" },
      { k: "Pricing", v: "Fixed price per build, quoted after a 30-minute call" },
      { k: "From you", v: "A problem owner, system access, ~20 minutes a day" },
      { k: "Standard", v: "Permissions, human approval, evals, observability, retries" },
      { k: "Afterwards", v: "You own the code. A reliability retainer is optional, never assumed" },
    ],
  },
  card: {
    ribbon: "Start here",
    kicker: "Scoping call to production",
    headline: "4–6 weeks",
    note: "Fixed price per build. The honest number depends on how many of your systems we have to touch — which is why it's quoted after a call, not printed on a page.",
    featuresLabel: "What you keep",
    features: [
      "Blueprint — the workflow, the data, the definition of success",
      "The working system, running on real data in your environment",
      "Integration map across the systems you already run",
      "Impact report: before and after, on your numbers",
      "Transfer pack — docs, eval suites and handover sessions",
    ],
    cta: { label: "Book a 30-min call", href: "#call" },
    guarantee: "You keep the code, the docs and the capability · zero dependency on us",
  },
};

export const faq = {
  eyebrow: "FAQ",
  title: "Asked,",
  titleAccent: "answered.",
  items: [
    {
      q: "What exactly is a forward-deployed engineer?",
      a: "An engineer who works inside your business instead of advising it from the outside. Same Slack, same standups, same messy data. Palantir invented the model and OpenAI, Anthropic and AWS have since built teams around it. The short version: we ship code in your environment, not recommendations in a deck.",
    },
    {
      q: "How is this different from hiring consultants?",
      a: "Consultants hand you a plan and an invoice. We hand you a running system and the code behind it. The work is scoped to one workflow, and you can tell whether it worked by looking at a number that already existed before we showed up.",
    },
    {
      q: "How long does a build actually take?",
      a: "Four to six weeks in most cases, measured from the scoping call to a system running in production. The range is real rather than padding — a workflow touching two systems moves faster than one touching seven, and we would rather quote the range than miss a date.",
    },
    {
      q: "What do you actually need from us?",
      a: "One person who knows the workflow properly and can answer questions about the edge cases. Access to the systems it touches. Roughly twenty minutes a day from that person. That is genuinely the whole list, and if we cannot get those three things the build will not work.",
    },
    {
      q: "Which models and tools do you use?",
      a: "Whichever ships fastest and runs cheapest for your workflow, and we build so you can swap them later. Models change every few months. Your operations should not have to change with them, so nothing we write is welded to one provider.",
    },
    {
      q: "What happens when the build is over?",
      a: "Your team runs it. Handover is part of the build and not an upsell: documentation, a walkthrough with whoever owns the thing, and the code sitting in your repository. Some clients keep us on a reliability retainer to look after evaluations, model upgrades and cost as things change around the system — that is a choice you make afterwards, not a dependency we build in.",
    },
    {
      q: "What if it doesn't work?",
      a: "We agree on the number to beat before we start, so there is no argument about it afterwards. If the system does not beat it, we will tell you plainly instead of dressing it up. We would also rather say no on the first call than take on a workflow we do not think AI should be running — and that is the most common outcome of a first conversation.",
    },
    {
      q: "Is our data safe?",
      a: "We work inside your environment and your permissions, with agreed data boundaries and human approval on anything sensitive. Nothing leaves your stack.",
    },
  ],
};

export const finalCta = {
  title: "Are you ready to",
  titleAccent: "deploy?",
  titleAfter: "",
  sub: "Thirty minutes. Bring one workflow that costs your team real hours. We'll tell you on the call whether it's worth building — and we say no more often than we say yes.",
  primaryCta: { label: "Book a 30-min call", href: "#call" },
  secondaryCta: { label: "See the work", href: "#work" },
  reassurance: "No deck, no discovery phase · you leave the call with a scoped answer",
};

export const footer = {
  blurb:
    "Forward-deployed AI engineering. One workflow, taken from scoping to production — then handed over to your team.",
  columns: [
    {
      heading: "The build",
      links: [
        { label: "Work", href: "#work" },
        { label: "Projects", href: "#projects" },
        { label: "Why", href: "#why" },
        { label: "The build", href: "#sprint" },
        { label: "Use cases", href: "#usecases" },
        { label: "Engagement", href: "#engagement" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "buildfastwithai.com", href: "https://www.buildfastwithai.com" },
        { label: "talk@buildfastwithai.com", href: "mailto:talk@buildfastwithai.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/build-fast-with-ai/" },
        { label: "X", href: "https://x.com/BuildFastWithAI" },
        { label: "GitHub", href: "https://github.com/buildfastwithai/gen-ai-experiments" },
      ],
    },
  ],
  legal: "© 2026 DEPLOY by Build Fast with AI · Intellify Edventures Pvt. Ltd.",
};
