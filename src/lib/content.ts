export const site = {
  name: "Build Fast with AI",
  product: "DEPLOY",
  contactEmail: "talk@buildfastwithai.com",
  title: "DEPLOY — Build AI systems that actually ship.",
  description:
    "Forward-deployed AI engineers embed with your team, turn one real workflow into a deployed production system, and hand you the code and the capability.",
};

/** Always on the invite alongside whoever books. */
export const bookingHosts = [
  "aaryan@buildfastwithai.com",
  "sanket@buildfastwithai.com",
  "satvik@buildfastwithai.com",
];

export const images = {
  metrics: "/images/metrics.jpg",
  finalCta: "/images/finalCta.jpg",
};

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#projects" },
    { label: "The build", href: "#sprint" },
  ],
  cta: { label: "Book a 30-min call", href: "#call" },
};

/* One claim, one line, one action. Everything else earns its place further down. */
export const hero = {
  eyebrow: "Forward-deployed AI engineers",
  titleLine1: "Build AI systems",
  titleLine2: "that actually ship.",
  sub: "Forward-deployed AI engineers embed with your team and turn one real workflow into AI agents running in production.",
  primaryCta: { label: "Book a 30-min call", href: "#call" },
  /** set inside the orbiting ring — keep it one short word */
  mark: "DEPLOY",
};

export const proof = {
  eyebrow: "Who we have built for",
  title: "We have already built AI",
  titleAccent: "inside these teams.",
  sub: "Every name here is an engagement we delivered — the same engineers who did that work are the ones who show up for your build.",
  /* ordered largest first; `file` maps to /public/logos/<file>.png */
  companies: [
    { name: "Google", file: "google" },
    { name: "HPE", file: "hpe" },
    { name: "Schneider Electric", file: "schneider" },
    { name: "BCG", file: "bcg" },
    { name: "Accel", file: "accel" },
    { name: "Wispr Flow", file: "wisprflow" },
    { name: "mem0", file: "mem0" },
    { name: "FloCareer", file: "flocareer" },
    { name: "CodeYoung", file: "codeyoung" },
  ],
};

/* ---------------------------------------------------------------------------
   Projects sit high on the page on purpose: the work is what earns the scroll.
--------------------------------------------------------------------------- */
export const work = {
  eyebrow: "The work",
  title: "AI systems we have",
  titleAccent: "put into production.",
  sub: "Six real projects, running inside client companies today. Here is what each one does and how it is built.",
  /* `size` drives the uneven grid: "wide" takes four of six columns, "half"
     takes three, "narrow" takes two. */
  projects: [
    {
      visual: "sqlRag" as const,
      size: "wide" as const,
      sector: "Enterprise",
      title: "AI Data Analyst",
      detail:
        "A text-to-SQL agent that answers plain-English questions against a live production database. A business glossary maps everyday terms to the right tables, a cheap model handles the easy queries and a stronger one takes the hard ones, and every answer is checked against a held-out test set.",
      points: [
        "Ask the database a question in plain English",
        "Text-to-SQL, checked to ~95% accuracy",
        "Business glossary maps terms to the right columns",
        "Cheap model for simple queries, strong one for hard queries",
      ],
    },
    {
      visual: "interviewer" as const,
      size: "narrow" as const,
      sector: "HR Tech",
      title: "AI Interview Agent",
      detail:
        "Runs the first technical round over live voice, asks follow-up questions based on what the candidate actually said, and gives them a sandbox to write real code in. Every score arrives with the reasoning behind it, so a rejection can always be justified.",
      points: [
        "Runs the first technical round over live voice",
        "Asks follow-up questions from the answers",
        "Candidate writes code in a sandbox",
        "Every score comes with its reasoning",
      ],
    },
    {
      visual: "documents" as const,
      size: "narrow" as const,
      sector: "Finance",
      title: "Document Processing Agent",
      detail:
        "Reads invoices, contracts and scans, pulls out the fields that matter, and checks each one against your own rules. Anything that fails a rule is flagged for a person rather than guessed at, and every extraction is logged for audit.",
      points: [
        "Pulls fields out of invoices, contracts and scans",
        "Checks each one against your own rules",
        "Flags what fails instead of guessing",
        "Every extraction logged for audit",
      ],
    },
    {
      visual: "learning" as const,
      size: "wide" as const,
      sector: "Edtech",
      title: "AI Tutor Platform",
      detail:
        "Teaches one student at a time and moves at their pace, choosing the next question from how they answered the last. It tracks what each student has genuinely mastered, and the teacher approves anything the system should not decide on its own.",
      points: [
        "Teaches one student at a time, at their pace",
        "Picks the next question from past answers",
        "Tracks what each student has actually mastered",
        "Teacher approves anything the system should not decide alone",
      ],
    },
    {
      visual: "conversationalBI" as const,
      size: "half" as const,
      sector: "FoodTech",
      title: "Sales Data Chatbot",
      detail:
        "Answers questions about live sales inside the chat tool the team already uses. Separate agents handle retrieval and analysis, and it reads the production database directly rather than a nightly copy.",
      points: [
        "Answers sales questions inside the team's chat",
        "Separate agents for retrieval and analysis",
        "Reads the live database, not a copy",
      ],
    },
    {
      visual: "sutra" as const,
      size: "half" as const,
      sector: "DevTools",
      title: "LLM Developer Launch",
      detail:
        "Took a new model family to the developers who would actually use it: technical documentation, quickstarts and working demo integrations, delivered through the launch window.",
      points: [
        "Took a new model family to its developers",
        "Technical docs and quickstarts",
        "1,000+ developers engaged in launch week",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
   Two tabs, six rows each, one detail panel — so the index stays one screen
   tall no matter how many projects end up in it.
--------------------------------------------------------------------------- */
export const projectIndex = {
  eyebrow: "What we bring with us",
  title: "We do not start",
  titleAccent: "from a blank page.",
  sub: "These seven pieces are already built, already running in production somewhere, and already tested. Your build assembles them and adds what is specific to you — which is why the second workflow costs less than the first.",
  items: [
    {
      name: "AI agents",
      role: "The thing that does the work",
      detail:
        "Agents that carry out a real task end to end — read the request, gather what they need, do the work, and hand back a result a person can check.",
      points: [
        "Plans the steps, then carries them out",
        "Calls your tools, not just the model",
        "Stops and asks when it should",
      ],
      systems: "Planning · tool use · retries",
    },
    {
      name: "Agent harness",
      role: "The runtime they run inside",
      detail:
        "The layer that decides what an agent is allowed to touch, retries what fails, and records every step. You can open any run and see exactly what happened.",
      points: [
        "Scoped permissions, one tool at a time",
        "Automatic retries when something fails",
        "A full trace of every run, kept",
      ],
      systems: "Permissions · retries · execution traces",
    },
    {
      name: "Skills",
      role: "What an agent knows how to do",
      detail:
        "Reusable capabilities an agent can pick up — read a contract, write a query, file a ticket. Adding a new one is a day's work, not a rebuild.",
      points: [
        "Written once, reused on the next build",
        "Versioned alongside the rest of the code",
        "A new one takes a day, not a rebuild",
      ],
      systems: "Reusable across builds",
    },
    {
      name: "RAG & knowledge layer",
      role: "Your documents, searchable",
      detail:
        "Retrieval over your own policies, manuals and history. Every answer cites the document it came from, and it respects who is allowed to see what.",
      points: [
        "Chunking and reranking tuned to your corpus",
        "Every answer cites the document it used",
        "Honours the access rules you already have",
      ],
      systems: "Chunking · reranking · citations · access rules",
    },
    {
      name: "MCP & integrations",
      role: "How it reaches your systems",
      detail:
        "Model Context Protocol connectors to the tools you already run. It is a standard, so the next workflow does not pay to build the same connection twice.",
      points: [
        "A standard protocol, not custom glue",
        "Connectors for CRM, ERP, ticketing and databases",
        "The next workflow reuses them for free",
      ],
      systems: "CRM · ERP · ticketing · databases",
    },
    {
      name: "Evaluation suite",
      role: "Proof that it still works",
      detail:
        "A test set for your workflow that we can re-run on demand. When a model changes, you get a number telling you whether it got better or worse — not a hunch.",
      points: [
        "A test set built from your real cases",
        "Re-run on every model or prompt change",
        "Tells you whether a change helped or hurt",
      ],
      systems: "Regression runs · scoring · drift checks",
    },
    {
      name: "Observability",
      role: "What to do when it breaks",
      detail:
        "Every input, decision, tool call and error is recorded. When something looks wrong your team can open that run and read it, instead of trying to reproduce it.",
      points: [
        "Every input, decision and tool call logged",
        "Errors surface with the failing run attached",
        "Your team can debug it without calling us",
      ],
      systems: "Logs · traces · error reporting",
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
  eyebrow: "The model",
  title: "We build inside",
  titleAccent: "your stack.",
  sub: "Our engineers work in the tools you already run — your cloud, your repos, your data, your ticketing. Nothing gets rebuilt somewhere else, and your team does not have to adopt anything new to keep it running.",
  oldWay: {
    heading: "The usual way",
    items: [
      "A strategy deck, delivered in month three",
      "A pilot that demos well and never ships",
      "Advice billed by the hour, owned by no one",
      "Code handed to a team that did not build it",
    ],
  },
  shipWay: {
    heading: "How we work",
    items: [
      "Engineers in your team from week one",
      "A system in production, measured on your numbers",
      "One workflow, fixed scope, one team accountable",
      "Your engineers build alongside us and keep it",
    ],
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
  sub: "No parallel workstreams and no discovery phase. We pick one workflow, then take it all the way.",
  stages: [
    {
      no: "01",
      days: "Week 1",
      title: "Pick the workflow",
      line: "We sit with your team for a few days and choose one workflow worth automating.",
      marks: [
        "One workflow picked, written down",
        "The number we have to beat, agreed",
        "Access to the systems it touches",
      ],
    },
    {
      no: "02",
      days: "Weeks 2–3",
      title: "Build on your real data",
      line: "We build against your actual data and the cases that break things. You see it running at the end of every day.",
      marks: [
        "A working system, not a demo",
        "Connected to your live systems",
        "Handles errors, retries and edge cases",
      ],
    },
    {
      no: "03",
      days: "Weeks 4–5",
      title: "Run it in production",
      line: "It goes live next to your current process, so you can compare the two before anything depends on it.",
      marks: [
        "Running in your environment",
        "A person approves the risky steps",
        "Measured against the week-one number",
      ],
    },
    {
      no: "04",
      days: "Week 6",
      title: "Hand it to your team",
      line: "We document it, train whoever will run it, and step back. The code is yours.",
      marks: [
        "Documentation and operating playbooks",
        "Tests your team can re-run",
        "You own the code",
      ],
    },
  ] as Stage[],
  railStart: "Day 0 — pilot chaos",
  railEnd: "Week 6 — in production",
};

export const pod = {
  eyebrow: "Who shows up",
  title: "A team that works",
  titleAccent: "inside your team.",
  sub: "Not advisors reviewing your work from the outside. Engineers in your standups, your repo and your Slack, building alongside the people who will run it afterwards.",
  roles: [
    {
      tag: "Workflow",
      title: "Product & process",
      body: "Owns the business process, the users, the decision points, and what finished actually means. In your standups, every day.",
    },
    {
      tag: "Engineering",
      title: "AI & integration",
      body: "Owns the agents, retrieval, models and the connections into your systems. Writes code in your repo, against your data.",
    },
    {
      tag: "Reliability",
      title: "Evals & operations",
      body: "Owns testing, permissions, logging and failure handling — the part that decides whether the thing survives contact with production.",
    },
  ],
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
    {
      heading: "Legal",
      links: [
        {
          label: "Terms & conditions",
          href: "https://www.buildfastwithai.com/terms-and-conditions",
        },
        {
          label: "Privacy policy",
          href: "https://www.buildfastwithai.com/privacy-policy",
        },
      ],
    },
  ],
  legal: "© 2026 DEPLOY by Build Fast with AI · Intellify Edventures Pvt. Ltd.",
};
