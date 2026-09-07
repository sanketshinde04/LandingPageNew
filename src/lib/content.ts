export const site = {
  name: "Build Fast with AI",
  product: "DEPLOY",
  contactEmail: "talk@buildfastwithai.com",
  title: "Forward-Deployed AI Engineers | AI POC to Production in 4-6 Weeks",
  description:
    "Forward-deployed AI engineers embed with your team, turn one real workflow from POC to a deployed production AI system, and hand you the code and the capability.",
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
    { label: "Work", href: "/#work" },
    { label: "Proof", href: "/proof" },
    { label: "The build", href: "/#sprint" },
  ],
  cta: { label: "Book a call", href: "#call" },
};

/* One claim, one line, one action. Everything else earns its place further down. */
export const hero = {
  eyebrow: "Forward-deployed AI engineers",
  titleLine1: "Build AI systems",
  titleLine2: "that actually ship.",
  sub: "Forward-deployed AI engineers embed with your team and turn one real workflow into production AI systems and AI agents running in your infrastructure.",
  primaryCta: { label: "Book a call", href: "#call" },
  /** set inside the orbiting ring: keep it one short word */
  mark: "DEPLOY",
};

export const proof = {
  eyebrow: "Who we have built for",
  title: "We have already built AI",
  titleAccent: "inside these teams.",
  sub: "Every name here is an engagement we delivered - the same forward-deployed AI engineers who did that work are the ones who show up for your build.",
  companies: [
    // Column 1 (6 companies)
    { name: "BCG", file: "bcg" },
    { name: "HPE", file: "hpe" },
    { name: "Schneider Electric", file: "schneider" },
    { name: "Wispr Flow", file: "wisprflow" },
    { name: "Freshworks", file: "freshworks" },
    { name: "NVIDIA", iconKey: "nvidia" },

    // Column 2 (6 companies)
    { name: "Accel", file: "accel" },
    { name: "Shell", file: "shell" },
    { name: "mem0", file: "mem0" },
    { name: "FloCareer", file: "flocareer" },
    { name: "CodeYoung", file: "codeyoung" },
    { name: "PyTorch", iconKey: "pytorch" },
  ],
};

/* ---------------------------------------------------------------------------
   Projects sit high on the page on purpose: the work is what earns the scroll.
--------------------------------------------------------------------------- */
export const work = {
  eyebrow: "The work",
  title: "AI systems we have",
  titleAccent: "put into production.",
  sub: "Six real projects and enterprise AI deployments running inside client companies today. Here is what each one does and how it is built.",
  projects: [
    {
      visual: "sqlRag" as const,
      size: "wide" as const,
      sector: "Enterprise",
      title: "AI Data Analyst (Text-to-SQL)",
      detail:
        "A text-to-SQL agent and enterprise semantic layer that answers plain-English questions against a live production database. A business glossary maps terms to tables, a cost-aware model routing pipeline handles queries, and every answer is verified against held-out evals.",
      points: [
        "Ask the database a question in plain English",
        "Natural language to SQL, checked to ~95% accuracy",
        "Business glossary semantic layer maps terms to columns",
        "Cost-aware model routing for simple and complex queries",
      ],
    },
    {
      visual: "interviewer" as const,
      size: "narrow" as const,
      sector: "HR Tech",
      title: "AI Interview Agent",
      detail:
        "Runs the first technical round over live voice AI, asks dynamic follow-up questions based on candidate responses, and provides a sandboxed coding environment. Every score arrives with explainable AI reasoning.",
      points: [
        "Runs the first technical round over live voice",
        "Sub-second voice AI latency and dynamic follow-ups",
        "Sandboxed live coding execution environment",
        "Explainable AI scoring and automated screening",
      ],
    },
    {
      visual: "documents" as const,
      size: "narrow" as const,
      sector: "Finance",
      title: "Document Processing Agent",
      detail:
        "Reads invoices, contracts and scans, pulls out structured fields, and validates each field against custom deterministic rules. Flags anomalies for human-in-the-loop review with complete audit logging.",
      points: [
        "Intelligent document processing for invoices and scans",
        "Automated rule validation and exception handling",
        "Human-in-the-loop review for edge cases",
        "Every extraction logged for compliance audit",
      ],
    },
    {
      visual: "learning" as const,
      size: "wide" as const,
      sector: "Edtech",
      title: "AI Tutor Platform",
      detail:
        "An agentic AI architecture for 1:1 education that adapts in real time to learner mastery. Provides teacher copilots and safe autonomy levels for personalized learning.",
      points: [
        "Adaptive 1:1 learning AI moving at student pace",
        "Mastery tracking and learning identity graph",
        "Teacher copilot for lesson insights and feedback",
        "Safe AI autonomy levels with human oversight",
      ],
    },
    {
      visual: "conversationalBI" as const,
      size: "half" as const,
      sector: "FoodTech",
      title: "Sales Data Chatbot",
      detail:
        "Answers questions about live sales inside team chat tools like Slack. Specialized agents handle data retrieval and analytics directly on production databases.",
      points: [
        "Answers sales data queries inside team chat",
        "Multi-agent architecture for retrieval and analysis",
        "Direct connection to live data systems",
      ],
    },
    {
      visual: "sutra" as const,
      size: "half" as const,
      sector: "DevTools",
      title: "LLM Developer Launch",
      detail:
        "Took a new foundation model family to developers: technical documentation, quickstarts and working integrations delivered during the launch window.",
      points: [
        "Took a new model family to its developers",
        "Technical documentation and SDK quickstarts",
        "1,000+ developers onboarded during launch week",
      ],
    },
  ],
};

export const projectIndex = {
  eyebrow: "What we bring with us",
  title: "We do not start",
  titleAccent: "from a blank page.",
  sub: "These core components are already tested and running in production. Your build assembles them and adds what is specific to your workflow - which is why the second workflow costs less than the first.",
  items: [
    {
      name: "AI agents",
      role: "The core execution engine",
      detail:
        "Autonomous agents that carry out complex tasks end to end: read requests, gather data, execute tool calls, and produce verifiable results.",
      points: [
        "Plans steps and executes deterministically",
        "Tool use and API integration with your systems",
        "Human-in-the-loop escalation when needed",
      ],
      systems: "Planning · tool use · retries",
    },
    {
      name: "Agent harness",
      role: "Runtime and guardrails",
      detail:
        "The security and orchestration layer that manages permissions, handles retries, and maintains comprehensive execution traces.",
      points: [
        "Granular tool permissions and sandboxing",
        "Automatic retries and graceful error recovery",
        "Complete observability and execution traces",
      ],
      systems: "Permissions · retries · execution traces",
    },
    {
      name: "Skills",
      role: "Modular capabilities",
      detail:
        "Reusable skill modules an agent can load: contract review, SQL query generation, CRM updates, and ticket triage.",
      points: [
        "Modular and reusable across builds",
        "Version-controlled in your repository",
        "Rapid extension for new business tasks",
      ],
      systems: "Reusable across builds",
    },
    {
      name: "RAG & knowledge layer",
      role: "Enterprise semantic search",
      detail:
        "High-accuracy retrieval over private documents, policies, and knowledge bases with verified citations and role-based access control.",
      points: [
        "Optimized chunking and reranking pipelines",
        "Precise document citation on every answer",
        "Role-based access control integration",
      ],
      systems: "Chunking · reranking · citations · access rules",
    },
    {
      name: "MCP & integrations",
      role: "System interoperability",
      detail:
        "Model Context Protocol (MCP) connectors to integrate seamlessly with your CRM, ERP, databases, and issue trackers without proprietary lock-in.",
      points: [
        "Standardized open protocol connectors",
        "Direct integration with databases and SaaS tools",
        "Reusable across future AI workflows",
      ],
      systems: "CRM · ERP · ticketing · databases",
    },
    {
      name: "Evaluation suite",
      role: "Continuous accuracy evals",
      detail:
        "Automated evaluation suites built on real golden test sets to measure accuracy, catch regressions, and optimize model costs over time.",
      points: [
        "Golden test sets reflecting real edge cases",
        "Automated eval runs on prompt and model changes",
        "Objective benchmark scoring before deployment",
      ],
      systems: "Regression runs · scoring · drift checks",
    },
    {
      name: "Observability",
      role: "Monitoring and telemetry",
      detail:
        "Full telemetry across latency, token costs, tool calls, and reasoning steps for effortless debugging and continuous monitoring.",
      points: [
        "Detailed logging for every prompt and tool call",
        "Real-time alerts on error rate and cost spikes",
        "Self-serve debugging for your internal team",
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
  sub: "The demo is the easy part. What stalls projects is everything after it: production integrations, permission boundaries, edge cases, evaluations, and long-term ownership.",
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
      source: "EY-CII, AIdea of India, 2025",
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
  sub: "Our forward-deployed AI engineers work directly in your tools: your cloud, your Git repos, your databases, and your ticketing. Nothing is locked in a third-party black box.",
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
      "Forward-deployed engineers embedded from day one",
      "A production AI system measured against real KPIs",
      "One workflow, fixed scope, total accountability",
      "Your engineers build alongside us and own the code",
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
  sub: "No infinite discovery phases. We pick one high-value workflow, engineer it, and take it all the way to production.",
  stages: [
    {
      no: "01",
      days: "Week 1",
      title: "Scoping and baseline metrics",
      line: "We embed with your team to define the workflow, security boundaries, and target accuracy metrics.",
      marks: [
        "One high-impact workflow defined and scoped",
        "Target accuracy and ROI baseline agreed upon",
        "Repository and data access provisioned",
      ],
    },
    {
      no: "02",
      days: "Weeks 2-3",
      title: "Build against live production data",
      line: "We build the agents, evaluations, and integrations directly against real data and edge cases.",
      marks: [
        "Working production architecture, not a prototype",
        "Integrated with your core APIs and databases",
        "Robust error handling, retries, and eval suite",
      ],
    },
    {
      no: "03",
      days: "Weeks 4-5",
      title: "Deploy to production environment",
      line: "The AI system runs in shadow or live production alongside existing operations to measure actual lift.",
      marks: [
        "Running in your secure cloud infrastructure",
        "Human-in-the-loop review for critical steps",
        "Measured against the week-one accuracy target",
      ],
    },
    {
      no: "04",
      days: "Week 6",
      title: "Team training and full handover",
      line: "We document the architecture, train your engineering team, and transfer full code ownership.",
      marks: [
        "Comprehensive documentation and runbooks",
        "Automated regression evals your team can run",
        "Complete code and IP ownership",
      ],
    },
  ] as Stage[],
  railStart: "Day 0: pilot chaos",
  railEnd: "Week 6: in production",
};

export const pod = {
  eyebrow: "Who shows up",
  title: "A team that works",
  titleAccent: "inside your team.",
  sub: "Not high-level advisors reviewing your work from afar. Forward-deployed AI engineers who build, test, and ship production systems inside your team.",
  roles: [
    {
      tag: "Outcome",
      title: "Product & Process Lead",
      body: "Knows the domain workflow, edge cases, and business requirements. Translates complex operational goals into measurable eval targets.",
    },
    {
      tag: "Systems",
      title: "Forward-Deployed AI Engineer",
      body: "Builds the agent architecture, RAG pipelines, model routing, and API integrations directly inside your codebase.",
    },
    {
      tag: "Confidence",
      title: "Evals & Operations Engineer",
      body: "Turns prototype code into dependable production software with evals, guardrails, security boundaries, and telemetry.",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Asked,",
  titleAccent: "answered.",
  items: [
    {
      q: "What exactly is a forward-deployed AI engineer?",
      a: "A forward-deployed AI engineer embeds directly inside your engineering team rather than offering external advisory services. They work in your Slack, participate in your standups, write code in your Git repositories, and solve edge cases against your actual data. Palantir pioneered this model, and leading AI organizations like OpenAI, Anthropic, and AWS now use it to bridge the gap between research models and production applications.",
    },
    {
      q: "How is this different from hiring AI consultants or a traditional agency?",
      a: "Traditional consultants deliver slide decks, high-level roadmaps, and hourly invoices. We deliver a fully functional, tested AI system running in your cloud, along with full ownership of the source code. The engagement has a fixed scope focused on a single workflow, and success is judged by a predefined metric agreed upon before work begins.",
    },
    {
      q: "How long does a forward-deployed AI build take?",
      a: "Most builds take four to six weeks from scoping call to a live production deployment. Simple workflows with few integrations move faster, while multi-system enterprise workflows take the full duration. We quote fixed timelines rather than open-ended consulting engagements.",
    },
    {
      q: "How much does an AI implementation cost?",
      a: "Our forward-deployed engagements operate on a transparent, fixed-scope investment model rather than open-ended hourly billing. Because we bring pre-built, production-tested components (agent harnesses, eval suites, and MCP connectors), we deliver in weeks what traditional consultancies take months to build. Book a 30-minute scoping call for a custom quote based on your workflow complexity.",
    },
    {
      q: "What do you need from our team during the engagement?",
      a: "We require three things: a designated domain expert who understands the workflow and its edge cases, API and repository access to the relevant systems, and approximately 20-30 minutes per day for feedback and reviews. With these in place, our forward-deployed engineers handle the heavy lifting.",
    },
    {
      q: "Which foundation models and AI frameworks do you use?",
      a: "We select the most cost-effective and highest-performing models for your specific use case, including Anthropic Claude, OpenAI GPT-4o, Google Gemini, and open-source models like Llama and Mistral. We build model-agnostic architectures with structured routing so you can swap models without rewriting your business logic.",
    },
    {
      q: "What happens after the AI system is deployed?",
      a: "Your team has full ownership of the codebase and intellectual property. Handover includes comprehensive architecture documentation, runbooks, and test suites. We also offer optional reliability retainers to assist with model upgrades, continuous evaluations, and monitoring as your operational volume scales.",
    },
    {
      q: "How do you ensure data security and privacy?",
      a: "We work directly within your cloud infrastructure (AWS, Azure, GCP, or on-premises) and respect your existing IAM policies, VPNs, and security boundaries. Zero client data is stored on external servers or used for model training.",
    },
  ],
};

export const finalCta = {
  title: "Are you ready to",
  titleAccent: "deploy?",
  titleAfter: "",
  sub: "Thirty minutes. Bring one workflow that costs your team real hours. We'll tell you on the call whether it's worth building - and we say no more often than we say yes.",
  primaryCta: { label: "Book a call", href: "#call" },
};

export const footer = {
  blurb:
    "Forward-deployed AI engineering. One workflow, taken from scoping to production - then handed over to your team.",
  columns: [
    {
      heading: "The build",
      links: [
        { label: "Work", href: "/#work" },
        { label: "Proof", href: "/proof" },
        { label: "The build", href: "/#sprint" },
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
