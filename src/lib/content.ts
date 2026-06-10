export const site = {
  name: "Build Fast with AI",
  product: "Agentic AI Launchpad",
  title: "Agentic AI Launchpad — Build Fast with AI",
  description:
    "A 6-week live cohort where you ship two working AI agents on your own real problems. Learn → Build → Ship. Twice.",
};

export const images = {
  hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop",
  metrics:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop",
  finalCta:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2400&auto=format&fit=crop",
};

export const nav = {
  links: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Ship Weeks", href: "#shipweeks" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "Pricing", href: "#pricing" },
  ],
  cta: { label: "Claim your seat", href: "#pricing" },
};

export const hero = {
  eyebrow: "US Cohort 01 · 6 weeks · Live & online",
  titleLine1: "Agentic AI",
  titleLine2: "Launchpad",
  sub: "Stop prompting. Ship agents. A six-week live cohort where you don't collect certificates — you leave with two working AI agents built on your own real problems.",
  primaryCta: { label: "Claim your seat", href: "#pricing" },
  secondaryCta: { label: "See the 6 weeks", href: "#curriculum" },
  meta: [
    { value: "Tue + Thu", label: "live on Zoom, evenings ET" },
    { value: "6 weeks", label: "4 modules, 2 Ship Weeks" },
    { value: "Lifetime", label: "recordings + alumni access" },
  ],
};

export const proof = {
  label: "Taught to teams & builders from",
  names: [
    "Google",
    "Amazon",
    "McKinsey",
    "BCG",
    "Shell",
    "Freshworks",
    "IIT Bombay",
    "Schneider Electric",
    "HPE",
    "TCS",
  ],
};

export const whyNow = {
  eyebrow: "Why this, why now",
  title: "2023 was chatbots.",
  titleAccent: "2026 is agents.",
  sub: "Companies aren't hiring people who can talk to AI — they need people who can make AI do the work: research, write, browse, book, build, and report back. That's an agent. And it's a learnable skill.",
  stats: [
    { value: 500, suffix: "+", label: "workshops delivered worldwide" },
    { value: 30000, suffix: "+", label: "professionals trained to date" },
    { value: 2, suffix: "", label: "agents you'll ship in 6 weeks" },
  ],
};

export type Week = {
  num: string;
  kind: "module" | "ship";
  title: string;
  blurb: string;
  bullets: string[];
  stamp?: string;
};

export const curriculum = {
  eyebrow: "The curriculum",
  title: "One simple loop.",
  titleAccent: "Run twice.",
  sub: "Learn for two weeks → ship for one. Then do it again, harder. Tap any week to expand it.",
  loops: [
    {
      tag: "Loop 01 — Foundations · Weeks 1–3",
      weeks: [
        {
          num: "Week 01 · Module",
          kind: "module",
          title: "Agent Anatomy",
          blurb:
            "What an agent actually is: an LLM in a loop with tools, memory, and a goal. You build one on day two.",
          bullets: [
            "Tool use & function calling from scratch",
            "ReAct, planning & reasoning loops",
            "MCP — the USB-C of agent tools",
            "Structured outputs that never break",
            "You build: a tool-using agent in < 100 lines",
          ],
        },
        {
          num: "Week 02 · Module",
          kind: "module",
          title: "Memory, RAG & Multi-Agent",
          blurb:
            "Give your agent knowledge of your world — and teammates. Orchestrate agents that delegate to each other.",
          bullets: [
            "RAG that actually retrieves the right thing",
            "Vector stores, chunking, reranking",
            "Multi-agent patterns: LangGraph & CrewAI",
            "Guardrails, human-in-the-loop checkpoints",
            "You build: a research crew over your own data",
          ],
        },
        {
          num: "Week 03 · Ship Week 01",
          kind: "ship",
          stamp: "No slides. Just shipping.",
          title: "Your Problem. Your Agent.",
          blurb:
            "Bring a real workflow from your job. Scope it Monday, build it all week, demo it Friday. We review 1:1.",
          bullets: [
            "Mon: scope your real use case with us",
            "Tue–Thu: build sprints + office hours",
            "Fri: live demo day with the cohort",
            "1:1 code & architecture review",
            "You leave with: working agent #1",
          ],
        },
      ] as Week[],
    },
    {
      tag: "Loop 02 — Production · Weeks 4–6",
      weeks: [
        {
          num: "Week 04 · Module",
          kind: "module",
          title: "Production-Grade Agents",
          blurb:
            "The gap between “cool demo” and “my company relies on this.” Evals, observability, cost, deployment.",
          bullets: [
            "Evals: how to know your agent works",
            "Tracing & observability (LangSmith et al.)",
            "Cost & latency engineering",
            "Deploying: serverless, Docker, schedulers",
            "You build: an eval suite for agent #1",
          ],
        },
        {
          num: "Week 05 · Module",
          kind: "module",
          title: "Building with Claude",
          blurb:
            "A full module on the Claude ecosystem — the stack behind the strongest production agents right now.",
          bullets: [
            "Claude API: tool use, extended thinking, structured outputs",
            "Claude Agent SDK — agents the Anthropic way",
            "Claude Code: subagents, hooks, skills & agentic coding",
            "Build & ship your own MCP servers",
            "Computer use & browser agents with Claude",
            "You build: a Claude agent with custom MCP tools",
          ],
        },
        {
          num: "Week 06 · Ship Week 02",
          kind: "ship",
          stamp: "Demo Day finale",
          title: "Production Ship",
          blurb:
            "Build the agent your team will actually use Monday morning — deployed, evaluated, and demoed to the cohort.",
          bullets: [
            "Production agent on your real stack",
            "Deployed + instrumented + evaluated",
            "Demo Day: present to cohort & guests",
            "Portfolio write-up you can share",
            "You leave with: working agent #2 — in production",
          ],
        },
      ] as Week[],
    },
  ],
  connector: "Then we turn up the difficulty",
};

export const manifesto = {
  eyebrow: "The Ship Week philosophy",
  title: "We deleted",
  titleAccent: "the capstone.",
  sub: "Capstones are where learning goes to die — one rushed project at the end, on a toy problem, forgotten in a month. So we replaced it with two Ship Weeks, woven into the program, built on your actual work.",
  oldWay: {
    heading: "The old way (capstone)",
    items: [
      "One project, crammed into the final week",
      "A toy dataset you'll never touch again",
      "Feedback arrives after the course ends",
      "A certificate nobody asks about",
    ],
  },
  shipWay: {
    heading: "The Ship Week way",
    items: [
      "Two builds, each right after the concepts land",
      "Your real workflow, your real data, your stack",
      "1:1 reviews mid-build, when they actually help",
      "Two demos + a portfolio your boss will ask about",
    ],
  },
  quote: {
    before: "“Tell me and I forget. Teach me and I remember. ",
    highlight: "Make me ship",
    after: " and I learn.”",
  },
};

export const who = {
  eyebrow: "Who this is for",
  title: "Builders with",
  titleAccent: "real problems.",
  sub: "You don't need to be an ML engineer. If you can write (or read) basic Python and you have a workflow worth automating, you belong here.",
  chips: [
    "Software engineers",
    "Product managers",
    "Founders & indie hackers",
    "Data folks",
    "Consultants",
    "Ops & automation leads",
  ],
  outcomesEyebrow: "What you walk away with",
  outcomes: [
    "Two deployed agents solving problems from your actual job",
    "Fluency in the modern agent stack — MCP, LangGraph, CrewAI, Claude, evals",
    "A production playbook: evals, observability, cost control, deployment",
    "Two demo-day presentations and a shareable portfolio write-up",
    "A US alumni network of people shipping agents at serious companies",
  ],
};

export const instructor = {
  eyebrow: "Taught by a builder, not a lecturer",
  title: "Learning by doing isn't a tagline.",
  titleAccent: "It's the whole method.",
  name: "Satvik Paramkusham",
  role: "Your instructor",
  org: "Founder, Build Fast with AI",
  creds: [
    { k: "edu", v: "IIT Delhi · B.Tech + M.Tech, Mathematics & Computing" },
    { k: "fac", v: "Visiting faculty, IIT Bombay" },
    { k: "yt", v: "100K+ subscribers on YouTube" },
    { k: "wrk", v: "500+ workshops · 30,000+ professionals trained" },
  ],
  points: [
    "Has trained teams from Google, Amazon, McKinsey, BCG, Shell, and Freshworks on exactly this stack",
    "Ships agents weekly for real clients — the curriculum updates every single cohort",
    "Every session is live, hands-on, and ends with code you wrote running",
  ],
};

export const pricing = {
  eyebrow: "Cohort 01 · US",
  title: "The details,",
  titleAccent: "straight up.",
  details: {
    heading: "How the 6 weeks run",
    rows: [
      { k: "Format", v: "Live on Zoom · all sessions recorded" },
      { k: "Schedule", v: "Tue & Thu · 6–8 PM ET (3–5 PM PT)" },
      { k: "Ship Weeks", v: "Daily office hours + Friday Demo Day" },
      { k: "Cohort size", v: "Capped — everyone gets 1:1 reviews" },
      { k: "Prereqs", v: "Basic Python · curiosity · a real problem" },
      { k: "Starts", v: "Next cohort opening soon — join the list" },
      { k: "Support", v: "Private community + lifetime alumni access" },
    ],
  },
  card: {
    ribbon: "Early bird",
    priceOld: "$1,999",
    priceNow: "$1,499",
    note: "per seat · early-bird pricing for Cohort 01 · team packs available",
    features: [
      "All 4 live modules + 2 Ship Weeks",
      "1:1 architecture & code reviews",
      "Lifetime recordings & resources",
      "Demo Day ×2 + portfolio write-up",
      "Alumni network & community",
    ],
    cta: { label: "Claim your seat", href: "#pricing" },
    guarantee: "100% refund before Week 2 · no questions, no forms",
  },
};

export const faq = {
  eyebrow: "FAQ",
  title: "Asked,",
  titleAccent: "answered.",
  items: [
    {
      q: "I'm not a strong coder. Can I keep up?",
      a: "Yes — if you can read basic Python, you're in. The modern agent stack does the heavy lifting; we teach you to direct it. Plenty of past attendees were PMs and consultants, and they shipped.",
    },
    {
      q: "What if I don't have a “real problem” to bring?",
      a: "You do — you just haven't framed it yet. In Week 1 we run a problem-scoping session that turns “my inbox is chaos” or “research takes me 6 hours” into a buildable agent spec.",
    },
    {
      q: "How is this different from the 8-week GenAI Launchpad?",
      a: "This is its sharper successor. We cut survey-style breadth, went all-in on agents, and replaced the single capstone with two Ship Weeks — so it's shorter, denser, and you build twice as much.",
    },
    {
      q: "What if I miss a live session?",
      a: "Every session is recorded and posted same-day. Ship Weeks are async-friendly by design — office hours run daily, and your 1:1 review is scheduled around you.",
    },
    {
      q: "Will my company pay for this?",
      a: "Usually, yes — most seats are employer-sponsored L&D. We provide an invoice and a manager-ready justification doc. Team packs of 3+ get a discount.",
    },
    {
      q: "Which tools and models do we use?",
      a: "The current production stack: Claude & GPT model families, MCP, LangGraph, CrewAI, vector stores, LangSmith-style tracing, plus Claude Code for agentic development. The stack refreshes every cohort.",
    },
  ],
};

export const finalCta = {
  title: "Six weeks from now, your agents are",
  titleAccent: "working.",
  titleAfter: "Are you in?",
  sub: "Cohort 01 is capped so every builder gets real review time. When it's full, it's full.",
  primaryCta: { label: "Claim your seat", href: "#pricing" },
  secondaryCta: { label: "See the curriculum", href: "#curriculum" },
  reassurance: "100% refund before Week 2 · no questions, no forms",
};

export const footer = {
  blurb:
    "Learn → Build → Ship. Twice. Live cohorts that turn builders into agent engineers.",
  columns: [
    {
      heading: "Program",
      links: [
        { label: "Curriculum", href: "#curriculum" },
        { label: "Ship Weeks", href: "#shipweeks" },
        { label: "Outcomes", href: "#outcomes" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "buildfastwithai.com", href: "https://buildfastwithai.com" },
        { label: "YouTube", href: "https://www.youtube.com/@buildfastwithai" },
        { label: "X", href: "https://x.com/buildfastwithai" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/build-fast-with-ai" },
      ],
    },
  ],
  legal: "© 2026 Build Fast with AI · Intellify Edventures Pvt. Ltd.",
};
