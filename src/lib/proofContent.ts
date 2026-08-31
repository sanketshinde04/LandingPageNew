export type ProofThumbnailKind = "sql" | "interviewer" | "learning";

export type ProofBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: { label: string; value: string }[] };

export interface ProofStory {
  slug: string;
  kind: ProofThumbnailKind;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  title: string;
  standfirst: string;
  intro: ProofBlock[];
  sections: { heading: string; blocks: ProofBlock[] }[];
}

export const proofStories: Record<string, ProofStory> = {
  "sql-rag": {
    slug: "sql-rag",
    kind: "sql",
    category: "Production Case Study",
    date: "August 2026",
    readTime: "10 min read",
    tags: ["Enterprise AI", "RAG", "Evals", "RLHF"],
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy",
    standfirst:
      "How business semantics, cost-aware reasoning, rigorous evals, and an RLHF-inspired feedback loop turned a fragile text-to-SQL prototype into a production-grade analytics engine.",
    intro: [
      {
        type: "paragraph",
        text: "Natural-language analytics looks simple when the database is small. It becomes a very different problem once the system has to reason across dozens of related entities, hundreds of thousands of operational records, ambiguous business terminology, and multi-turn analytical questions.",
      },
      {
        type: "paragraph",
        text: "We built an enterprise SQL RAG system for that environment. The final product reached the mid-90% range on a controlled end-to-end evaluation set, answered most analytical questions in the low tens of seconds, and reduced model cost per correct answer materially compared with the first production prototype.",
      },
      {
        type: "paragraph",
        text: "The difficult part was not teaching an LLM to write SQL. It was teaching the overall system when not to guess.",
      },
    ],
    sections: [
      {
        heading: "Where basic text-to-SQL broke",
        blocks: [
          { type: "paragraph", text: "Our early prototype worked well on clean questions. Ask for a simple aggregation, ranking, or time-based comparison and the model could usually produce something plausible." },
          { type: "paragraph", text: "Real business questions were harder." },
          { type: "quote", text: "Which accounts performed best this quarter?" },
          { type: "paragraph", text: "That request does not have one universal answer. “Best” could mean growth, revenue, conversion, activity, margin, or another company-specific metric. Several interpretations can produce perfectly valid SQL, and that is exactly what makes the failure dangerous: the database executes the query successfully even when the business interpretation is wrong." },
          { type: "paragraph", text: "As the data environment grew, we saw the same pattern repeatedly. Syntax errors were easy to catch. Semantic errors were much harder because the results still looked believable." },
          { type: "paragraph", text: "That moved the focus of the project from SQL generation to business understanding." },
        ],
      },
      {
        heading: "Business context became part of the data layer",
        blocks: [
          { type: "paragraph", text: "A schema tells an LLM which tables and columns exist. It does not explain how an organization defines terms such as active, qualified, completed, recognized, or high value." },
          { type: "paragraph", text: "We therefore treated approved business definitions, reporting conventions, valid categories, and important analytical terms as first-class context." },
          { type: "paragraph", text: "The goal was not to give the model more text. It was to give it less, but more relevant, context." },
          { type: "paragraph", text: "In a wide relational environment, supplying the entire schema increases token usage while also increasing the number of plausible but incorrect joins, filters, and fields available to the model. Narrowing the context to the entities and business concepts relevant to the current question improved both consistency and cost." },
          { type: "paragraph", text: "Ambiguity also became an explicit product state. If two interpretations could materially change the answer, the system could ask one short clarification instead of silently choosing one." },
          { type: "paragraph", text: "That small design decision prevented a large class of confident analytical errors." },
        ],
      },
      {
        heading: "Cost optimization: from cost per call to cost per correct answer",
        blocks: [
          { type: "paragraph", text: "The first production version was expensive for a simple reason: too much work was being delegated to high-capability models." },
          { type: "paragraph", text: "A single question could trigger intent understanding, context retrieval, relational reasoning, analytical generation, validation, explanation, and a follow-up response. Using the strongest model with a large context window for every step worked, but it did not scale economically." },
          { type: "quote", text: "Cost per correct answer" },
          { type: "paragraph", text: "That changed the optimization strategy. Smaller models could handle lightweight normalization, formatting, and simpler classification tasks. More expensive reasoning was reserved for ambiguous or structurally difficult questions. Stable business context and frequently reused metadata could be reused rather than regenerated repeatedly." },
          { type: "paragraph", text: "Reducing irrelevant context was especially effective because it improved three things at the same time: fewer tokens, lower latency, and fewer wrong analytical paths." },
          { type: "paragraph", text: "Across successive iterations, model-side cost per successful answer fell materially while the evaluation score remained within the target band." },
          { type: "paragraph", text: "The important lesson was that cost optimization was not primarily about finding a cheaper model. It was about spending model intelligence only where it changed the outcome." },
        ],
      },
      {
        heading: "Evals changed how we built the system",
        blocks: [
          { type: "paragraph", text: "At first, we measured obvious engineering signals: did the generated request execute, did the result render, and did the answer look reasonable? Those metrics were too weak." },
          { type: "paragraph", text: "A query can execute without errors and still use the wrong reporting period, wrong grouping, wrong business definition, or wrong context from a previous turn." },
          { type: "paragraph", text: "We moved the benchmark to the final business answer. The evaluation set contained several dozen carefully selected analytical questions covering filtering, aggregation, ranking, period comparisons, multi-condition questions, ambiguous terminology, unsupported values, and conversational follow-ups." },
          { type: "paragraph", text: "A response counted as correct only when the final interpretation and returned result matched the expected benchmark answer. That produced a much more meaningful score. The strongest evaluated version landed at roughly 95% end-to-end accuracy on the controlled internal set." },
          { type: "paragraph", text: "More importantly, every failure was classified. Instead of recording only “wrong answer,” we separated failures into categories such as business interpretation, retrieval quality, temporal reasoning, grouping, filter behavior, conversational context, and result presentation." },
          { type: "paragraph", text: "That turned evaluation into an engineering tool. If accuracy moved down, we could see why. If a new model or retrieval change improved one class of questions but hurt another, the regression suite exposed it before release." },
        ],
      },
      {
        heading: "Human feedback became an RLHF-style improvement loop",
        blocks: [
          { type: "paragraph", text: "Offline evals tell you about the failures you already know how to test. Users find the failures you did not anticipate." },
          { type: "paragraph", text: "We added lightweight feedback to analytical answers and stored enough surrounding context to make a negative result reproducible: the original question, interpreted intent, important assumptions, resulting answer, system version, and user feedback." },
          { type: "paragraph", text: "We describe this as an RLHF-inspired loop, not continuous online retraining. Raw thumbs-up and thumbs-down signals are noisy. A user may dislike a technically correct answer because of terminology, formatting, or a changed business convention. Training directly on every rating would introduce new errors." },
          { type: "paragraph", text: "Instead, reviewed feedback was used to improve the system in several ways. Real failures were promoted into new eval cases. Repeated preference patterns informed answer behavior. Retrieval mistakes revealed missing or irrelevant business context. Hard examples helped us decide when stronger reasoning was worth the additional cost." },
          { type: "paragraph", text: "Over time, curated examples can also become useful preference data for supervised fine-tuning or preference optimization. The key was treating feedback as evaluation data first and training data second." },
        ],
      },
      {
        heading: "What the later system looked like",
        blocks: [
          { type: "paragraph", text: "The exact client dataset and commercial metrics are intentionally abstracted, but the operating profile was roughly:" },
          {
            type: "table",
            rows: [
              { label: "Relational complexity", value: "Dozens of connected entities" },
              { label: "Data volume", value: "Hundreds of thousands of operational records" },
              { label: "Schema width", value: "Many dozens of fields in major analytical entities" },
              { label: "Typical response time", value: "Low tens of seconds" },
              { label: "End-to-end benchmark", value: "Mid-90% range" },
              { label: "Data access", value: "Read-only" },
              { label: "Model cost", value: "Materially lower per correct answer than the first production version" },
            ],
          },
          { type: "paragraph", text: "These numbers were not optimized independently. Lowering inference cost at the expense of semantic accuracy would have created a cheaper but less useful product. Increasing accuracy with unrestricted context and expensive models would have produced a system that was difficult to scale." },
          { type: "paragraph", text: "The production target was the intersection of accuracy, business understanding, latency, and cost." },
        ],
      },
      {
        heading: "What we learned",
        blocks: [
          { type: "paragraph", text: "The most expensive failures were semantic, not syntactic. Invalid SQL is obvious; a valid answer based on the wrong business assumption can pass unnoticed." },
          { type: "paragraph", text: "More context was not always better. In complex schemas, irrelevant context increased both cost and ambiguity." },
          { type: "paragraph", text: "Evals were more valuable than repeated prompt tweaking because they gave every engineering change a consistent test. Human feedback became significantly more useful once those eval categories existed, because each production failure could be converted into a measurable regression case." },
          { type: "paragraph", text: "And RLHF was ultimately a data-quality problem. Collecting ratings was easy. Creating clean, reviewed preference data that represented what a better analytical answer actually meant was the difficult part." },
        ],
      },
      {
        heading: "The takeaway",
        blocks: [
          { type: "paragraph", text: "We did not reach ~95% benchmark accuracy by finding one perfect prompt or one perfect model." },
          { type: "paragraph", text: "The gains came from making the system understand the business more precisely, shrinking the amount of unnecessary reasoning, evaluating the final answer instead of the generated SQL, and turning reviewed user feedback into a continuous improvement loop." },
          { type: "paragraph", text: "RAG supplied context. Business semantics reduced guessing. Evals gave us a quality bar. Human feedback showed us what the benchmark missed. Cost optimization made the system practical to scale." },
        ],
      },
    ],
  },
  "ai-interviewer": {
    slug: "ai-interviewer",
    kind: "interviewer",
    category: "Production Case Study",
    date: "August 2026",
    readTime: "10 min read",
    tags: ["Realtime Voice", "Live Coding", "Evals", "Hiring AI"],
    title: "Building a Real-Time AI Interviewer for Technical Hiring",
    standfirst:
      "How we built an AI-led technical interview system with live voice, adaptive questioning, sandboxed code execution, and explainable scoring across 150+ engineer-days.",
    intro: [
      { type: "paragraph", text: "The first version worked. It could listen to a candidate, generate a response, ask the next question, and keep the interview moving. But it did not yet feel like an interview." },
      { type: "paragraph", text: "That difference became the core engineering problem. A technical interview is highly sensitive to delay. If the interviewer pauses too long after every answer, the conversation feels artificial. If the system cannot understand what the candidate is coding in real time, it loses the ability to ask meaningful follow-ups. And if the final recommendation cannot be traced back to evidence from the conversation, the result is difficult for a recruiter to trust." },
      { type: "paragraph", text: "The challenge was therefore not simply to connect speech recognition, an LLM, and text-to-speech. It was to make the entire interaction feel responsive, context-aware, and defensible." },
    ],
    sections: [
      {
        heading: "Latency became the first product constraint",
        blocks: [
          { type: "paragraph", text: "The early implementation used a conventional sequential voice flow. Speech was transcribed, interpreted, sent through the language model, converted back to speech, and then played to the candidate." },
          { type: "paragraph", text: "Functionally, it worked. Conversationally, it felt slow. Each additional stage added a little delay, and those delays accumulated quickly enough to break the rhythm of the interview." },
          { type: "paragraph", text: "This changed how we evaluated the system. We were no longer asking, “Does every component work?” We started asking, “Does the candidate experience the interaction as one continuous conversation?”" },
          { type: "paragraph", text: "That shift influenced several later decisions, including how voice models were evaluated and how the realtime loop was orchestrated." },
        ],
      },
      {
        heading: "Voice quality was only one part of the TTS decision",
        blocks: [
          { type: "paragraph", text: "A technically impressive voice model is not automatically the right model for an interview product. We evaluated speech generation across three competing dimensions:" },
          { type: "list", items: ["Perceived voice quality", "Time to first audio", "Cost per interview minute"] },
          { type: "paragraph", text: "The best standalone voice was not necessarily the best system choice. A model that sounds marginally better but adds noticeable response delay can make the overall interview feel worse. Likewise, a very fast model can become expensive once it is running across long technical interviews at scale." },
          { type: "paragraph", text: "The useful optimization target was therefore not raw model quality. It was the best balance of latency, naturalness, and cost inside the complete interview experience." },
        ],
      },
      {
        heading: "Generic questions were not enough",
        blocks: [
          { type: "paragraph", text: "A good technical interview should not feel like a shuffled question bank. If a candidate has several years of backend experience, the interviewer should be able to ask about that experience. If the role requires distributed systems, the interview should lean into those requirements. If the candidate performs strongly on one question, the next question should be able to adapt." },
          { type: "quote", text: "Candidate context and role context" },
          { type: "paragraph", text: "To support that, the product used contextual retrieval over both sides of the interview. This allowed the interviewer to generate questions that were grounded in the candidate's background while still remaining aligned with the job requirements." },
          { type: "paragraph", text: "The result was a more specific interview rather than a generic sequence of prompts." },
        ],
      },
      {
        heading: "Coding changed the interaction completely",
        blocks: [
          { type: "paragraph", text: "Technical interviews are not just conversations. Candidates need to solve problems, write code, run it, debug it, and explain what they are doing." },
          { type: "paragraph", text: "That meant the interview experience had to understand both the spoken conversation and the coding session. A sandboxed execution environment was introduced so candidates could write and run code during the interview while the AI interviewer continued the discussion." },
          { type: "paragraph", text: "This created a much richer signal. Instead of only asking, “What is the time complexity?”, the interviewer could react to the actual approach the candidate had implemented and ask about trade-offs, edge cases, or a failing test." },
          { type: "paragraph", text: "That moved the experience closer to a real technical interview rather than a voice-based quiz." },
        ],
      },
      {
        heading: "Evaluation had to be explainable",
        blocks: [
          { type: "paragraph", text: "Generating questions was only half the system. The harder problem was turning a long interview into a hiring signal that someone could actually use. A recruiter does not want another forty-page transcript. They want to know:" },
          { type: "list", items: ["How the candidate performed", "Where the strongest signals appeared", "Which skills were weak", "How the candidate compared with others", "Why the system reached its recommendation"] },
          { type: "paragraph", text: "The evaluation experience therefore focused on structured evidence rather than a single opaque score. Hard-skill signals could come from coding performance, problem-solving, and technical knowledge. Communication and other softer signals could be derived from the conversation itself." },
          { type: "paragraph", text: "The final output was designed to support both candidate-level feedback and employer-side decision-making." },
        ],
      },
      {
        heading: "The scoring problem was not just accuracy",
        blocks: [
          { type: "paragraph", text: "A human interviewer naturally carries context from the entire conversation. An AI system has to reproduce that consistency intentionally." },
          { type: "paragraph", text: "A candidate may struggle early, recover later, change their approach after feedback, or explain a technically correct solution poorly. A useful evaluation cannot treat every response as an isolated event." },
          { type: "paragraph", text: "That made consistency across the complete interview more important than individual question scoring. The product therefore evolved toward a broader evaluation view: skill-level performance, evidence from the interview, code execution results, and final recommendation all needed to agree with each other." },
          { type: "paragraph", text: "For hiring workflows, this consistency matters as much as raw model capability." },
        ],
      },
      {
        heading: "Four workstreams, one product",
        blocks: [
          { type: "paragraph", text: "The engagement eventually grew across four major areas:" },
          { type: "table", rows: [
            { label: "AI interviewer", value: "Realtime voice, candidate context, live coding" },
            { label: "Question generation", value: "Role-aware and candidate-aware interviewing" },
            { label: "Evaluation", value: "Technical and communication signals" },
            { label: "Reporting", value: "Recruiter-facing scoring and candidate feedback" },
          ] },
          { type: "paragraph", text: "The total implementation represented roughly 150+ engineer-days of scoped engineering work. A significant share of that effort went into the realtime interviewer itself. That was intentional. If the conversation layer feels broken, every downstream feature becomes irrelevant." },
          { type: "paragraph", text: "Question generation, evaluation, and dashboards only become valuable once candidates can complete an interview that feels natural enough to finish." },
        ],
      },
      {
        heading: "Why we built the slow version first",
        blocks: [
          { type: "paragraph", text: "One of the most useful engineering decisions was building a working sequential voice pipeline before optimizing it. On paper, that can look like throwaway work. In practice, it created a measurable baseline." },
          { type: "paragraph", text: "The team could observe where latency appeared, test the interview flow with something real, compare voice providers under actual conditions, and show the product early rather than waiting for the entire system to be optimized." },
          { type: "paragraph", text: "That prototype answered an important question: Is the interview concept itself useful? Once that was proven, the engineering effort could focus on making it fast enough for production. This sequencing reduced the risk of optimizing the wrong problem." },
        ],
      },
      {
        heading: "Production feedback mattered more than perfect planning",
        blocks: [
          { type: "paragraph", text: "Realtime voice products fail in ways that are difficult to reproduce in a clean development environment." },
          { type: "list", items: ["Candidates have different microphones.", "Networks fluctuate.", "People interrupt the interviewer.", "They pause mid-sentence.", "They restart answers.", "They switch between speaking and coding."] },
          { type: "paragraph", text: "These edge cases are not secondary details. They are the product." },
          { type: "paragraph", text: "That is why the build included meaningful room for iteration after the first working versions. The goal was not to freeze the system once each feature existed. It was to improve the interaction based on real interviews and real failure modes." },
        ],
      },
      {
        heading: "What made the system difficult",
        blocks: [
          { type: "paragraph", text: "The complexity came from combining several product constraints that pull in different directions. Lower latency can increase infrastructure or model cost. More candidate context can improve personalization but also increases reasoning complexity. More aggressive evaluation can create richer reports but risks producing signals that recruiters cannot verify." },
          { type: "paragraph", text: "A highly adaptive interviewer can feel intelligent, but it also needs to remain consistent across candidates. The system therefore had to balance latency, personalization, evaluation quality, cost, and explainability." },
          { type: "paragraph", text: "Optimizing any one of those in isolation would have produced a weaker product." },
        ],
      },
      {
        heading: "What we learned",
        blocks: [
          { type: "paragraph", text: "The first lesson was that latency is part of intelligence. A system can generate excellent answers and still feel unintelligent if every response arrives too slowly." },
          { type: "paragraph", text: "The second was that contextual interviewing is much more valuable than generic question generation. Candidate and role context changes the quality of the conversation far more than simply adding more questions." },
          { type: "paragraph", text: "The third was that live coding creates stronger interview signal than conversation alone. Seeing the candidate's actual implementation allows the interviewer to ask better follow-ups and makes technical evaluation more grounded." },
          { type: "paragraph", text: "Finally, explainability is not optional in hiring. A score without evidence is difficult to trust. A recommendation tied back to the interview, code execution, and skill-level performance is much more useful to a recruiter." },
        ],
      },
      {
        heading: "The takeaway",
        blocks: [
          { type: "paragraph", text: "Building an AI interviewer was not mainly a model problem. It was a realtime systems problem, a context problem, and an evaluation problem." },
          { type: "paragraph", text: "The biggest improvements came from measuring latency instead of assuming it, grounding interviews in candidate and role context, integrating code execution into the conversation, and making final evaluations evidence-backed rather than opaque." },
          { type: "paragraph", text: "Voice made the interview conversational. Context made it relevant. Code execution made it technical. Evidence made the result usable." },
        ],
      },
    ],
  },
  "agentic-learning": {
    slug: "agentic-learning",
    kind: "learning",
    category: "Architecture & Strategy",
    date: "August 2026",
    readTime: "11 min read",
    tags: ["EdTech AI", "Agentic Systems", "Human-in-the-Loop", "Evals"],
    title: "Designing an Agentic Learning System for 1:1 Education",
    standfirst:
      "How we designed an AI-assisted learning architecture across diagnostics, planning, tutoring, mastery tracking, and parent communication covering 9 learner-journey stages and 30+ capabilities.",
    intro: [
      { type: "paragraph", text: "The product already worked. Students learned through live 1:1 classes with human teachers. The problem was that the quality of the experience depended heavily on which teacher a student happened to get, how much time that teacher had, and how consistently progress was tracked outside the classroom." },
      { type: "paragraph", text: "That created a ceiling. A strong teacher could produce a strong outcome. A weaker process could produce a weaker one. And between classes, the system had very little intelligence of its own." },
      { type: "paragraph", text: "The opportunity was not to replace the teacher. It was to build enough intelligence around the teacher that the system could enforce a quality floor while the teacher continued to set the ceiling." },
    ],
    sections: [
      {
        heading: "The biggest problem was not teaching",
        blocks: [
          { type: "paragraph", text: "The first discovery finding was that the most expensive work was often happening around the lesson rather than inside it. Teachers were spending time on homework review, progress tracking, planning, profile updates, parent communication, and repeated administrative preparation." },
          { type: "quote", text: "High effort and low confidence" },
          { type: "paragraph", text: "If a teacher spends significant time reviewing work but still does not feel certain about what the student has truly mastered, the system is paying for effort without gaining reliable learning signal. That became the starting point for the roadmap." },
          { type: "paragraph", text: "The goal was to move from a class-centric product to a learning system that continuously understands:" },
          { type: "list", items: ["What the student knows", "Where they are struggling", "What should happen next", "When the teacher needs to intervene", "What parents should know", "What can happen between live classes"] },
        ],
      },
      {
        heading: "A student needed a digital learning identity first",
        blocks: [
          { type: "paragraph", text: "The roadmap quickly exposed a dependency problem. It is easy to brainstorm AI features:" },
          { type: "list", items: ["Adaptive practice", "Automated homework review", "Personalized learning plans", "Parent summaries", "Instant tutoring", "Mastery alerts", "Next-course recommendations"] },
          { type: "paragraph", text: "But those features become weak if the system does not have a reliable representation of the student. So the first foundational idea was a digital learning identity." },
          { type: "paragraph", text: "This is not just a profile containing age, grade, or enrolled course. It is a continuously updated picture of the learner:" },
          { type: "list", items: ["Diagnostic performance", "Current skill level", "Recent mistakes", "Mastery signals", "Pace", "Learning goals", "Homework behavior", "Teacher observations", "Progress over time"] },
          { type: "paragraph", text: "Once that layer exists, other systems stop operating independently. A homework review can update the learner profile. The learner profile can change tomorrow's practice difficulty. A mastery signal can change the agenda for the next live session. A parent summary can explain progress using the same underlying evidence." },
          { type: "paragraph", text: "Without that foundation, every feature becomes another isolated AI tool." },
        ],
      },
      {
        heading: "The journey was larger than one agent",
        blocks: [
          { type: "paragraph", text: "The discovery mapped the full learner journey across nine stages, from first interaction to course completion. Each stage had a current state, a target state, and a set of capabilities required to move from one to the other." },
          { type: "paragraph", text: "At the beginning of the journey, AI can help with onboarding and diagnostics. During regular classes, it can help teachers prepare by summarizing homework, surfacing learning signals, and proposing a lesson agenda." },
          { type: "paragraph", text: "Between classes, the system can provide reminders, adaptive practice, and instant doubt-solving. Later, the same learning history can support parent reporting, mastery validation, renewal decisions, and next-course recommendations." },
          { type: "paragraph", text: "The roadmap named more than 30 distinct capabilities across this journey. That number was useful because it immediately made one thing clear: this was not one AI feature. It was an operating system for the learning experience." },
        ],
      },
      {
        heading: "Not everything needed to be AI",
        blocks: [
          { type: "paragraph", text: "One of the most important scoping decisions was separating ordinary software from model-driven systems. Roughly a third of the roadmap could be handled with conventional automation:" },
          { type: "list", items: ["Scheduling", "Reminders", "Assignment triggers", "Profile updates", "Approval workflows", "Dashboards", "Synchronization", "Status tracking"] },
          { type: "paragraph", text: "These systems do not need model judgment. Calling every automation an AI agent would increase complexity without improving the product." },
          { type: "paragraph", text: "Another large group of capabilities did need generation or retrieval, but could still keep a teacher in the approval loop. Examples included:" },
          { type: "list", items: ["Diagnostic support", "Learning-plan generation", "Homework review", "Teaching briefings", "Session summaries", "Parent digests", "Mastery summaries", "Curriculum recommendations"] },
          { type: "paragraph", text: "These are ideal human-in-the-loop workflows because the model can reduce effort while the teacher retains decision authority. Only a small subset required genuine autonomy. That distinction changed the build strategy." },
        ],
      },
      {
        heading: "Autonomous systems had the highest value — and the highest risk",
        blocks: [
          { type: "paragraph", text: "The most transformative capabilities were also the ones that needed the most caution. Examples included:" },
          { type: "list", items: ["A 24/7 tutor", "Adaptive practice", "Live session intelligence", "Predictive learner progression or renewal support"] },
          { type: "paragraph", text: "Unlike a teacher-approved summary, these systems may act without a human reviewing every output. That changes the safety bar." },
          { type: "paragraph", text: "A generated teacher briefing can be wrong and corrected before class. A tutoring agent giving a student the wrong explanation at 9pm may reinforce a misconception immediately." },
          { type: "paragraph", text: "That means autonomous learning systems need stronger evaluation before they are trusted. The roadmap therefore treated autonomy as something to earn, not something to enable by default." },
        ],
      },
      {
        heading: "Evals had to come before scale",
        blocks: [
          { type: "paragraph", text: "One of the strongest rules in the roadmap was simple: “The output looked plausible” is not a quality bar." },
          { type: "paragraph", text: "A learning plan can sound excellent and still be badly calibrated. A homework summary can be fluent while missing the actual misconception. A tutoring answer can be technically correct but too advanced for the student." },
          { type: "paragraph", text: "So any model-driven capability needs an evaluation harness before it reaches learners. The evaluation question is different for each workflow." },
          { type: "paragraph", text: "For homework review:" },
          { type: "list", items: ["Did the system identify the actual mistake?", "Did it classify the misconception correctly?", "Did the teacher agree with the recommendation?"] },
          { type: "paragraph", text: "For adaptive practice:" },
          { type: "list", items: ["Was the next question at the right difficulty?", "Did the student improve after the intervention?", "Did the system avoid repeating already-mastered material?"] },
          { type: "paragraph", text: "For a tutoring agent:" },
          { type: "list", items: ["Was the answer correct?", "Was the explanation age-appropriate?", "Did it guide rather than simply reveal the answer?", "Did the student demonstrate understanding afterward?"] },
          { type: "paragraph", text: "This makes evaluation a product-design problem, not merely a model benchmark." },
        ],
      },
      {
        heading: "Teacher amplification was the core design principle",
        blocks: [
          { type: "paragraph", text: "The roadmap was deliberately not built around the idea of replacing live teachers. Teachers are still responsible for judgment, motivation, explanation, and the nuanced parts of learning that are difficult to automate safely." },
          { type: "paragraph", text: "The system is most valuable where it can remove repetitive work and increase the quality of information available to the teacher." },
          { type: "paragraph", text: "Before class, the teacher should already know:" },
          { type: "list", items: ["What homework was completed", "Where the student struggled", "What changed since the previous session", "Which concept needs attention", "What practice may be appropriate next"] },
          { type: "paragraph", text: "After class, the system should capture the important signals without forcing the teacher to manually rebuild the student's learning history." },
          { type: "quote", text: "The model sets the floor. The teacher still sets the ceiling." },
        ],
      },
      {
        heading: "The best build order followed dependency, not excitement",
        blocks: [
          { type: "paragraph", text: "The roadmap intentionally did not start with the 24/7 tutor. That would have been the most visible AI feature, but it would also have been built on weak foundations." },
          { type: "paragraph", text: "The recommended order started with the systems that everything else depends on:" },
          { type: "paragraph", text: "1. Learning identity and diagnostics — Create the profile, baseline assessment, and mastery signals first." },
          { type: "paragraph", text: "2. Teacher-efficiency workflows — Automate homework review and produce pre-class insight briefings. These are easier to measure and immediately reduce repetitive teacher work." },
          { type: "paragraph", text: "3. Between-class learning — Introduce adaptive practice and tutoring once the system has enough learner context to personalize them meaningfully." },
          { type: "paragraph", text: "4. Parent intelligence — Generate useful progress summaries and better preparation for parent-teacher conversations." },
          { type: "paragraph", text: "5. Long-term prediction — Only after enough history exists should the system attempt stronger predictive decisions such as renewal or next-course recommendations." },
          { type: "paragraph", text: "This sequence reduces the risk of building intelligent features on top of weak data." },
        ],
      },
      {
        heading: "Measurement needed to start before the build",
        blocks: [
          { type: "paragraph", text: "A transformation roadmap is only useful if the impact can eventually be measured. That means baselines must exist before automation changes the workflow." },
          { type: "paragraph", text: "Several metrics stood out:" },
          { type: "list", items: ["Teacher time spent on homework review", "Time from a student question to a useful answer", "Time required to prepare for parent-teacher meetings", "Percentage of students with validated mastery signals", "Learner progress by cohort", "Renewal or progression rates over time"] },
          { type: "paragraph", text: "These metrics create a before-and-after view. Without them, the team may build something that feels impressive without being able to show whether learning or teacher productivity actually improved." },
        ],
      },
      {
        heading: "What made this system complex",
        blocks: [
          { type: "paragraph", text: "The complexity was not the number of agents. It was the dependency between them." },
          { type: "paragraph", text: "A tutoring agent needs a learner profile. A learner profile needs diagnostics and session signals. Adaptive practice needs reliable mastery data. Parent summaries need validated progress. Predictive recommendations need history." },
          { type: "paragraph", text: "This means the product cannot be designed as a collection of disconnected copilots. It has to behave like a learning system where each capability improves the context available to the next one." },
          { type: "paragraph", text: "That is the larger architectural insight from the roadmap." },
        ],
      },
      {
        heading: "What we learned",
        blocks: [
          { type: "paragraph", text: "The first lesson was that AI should not be added uniformly. Some workflows are ordinary automation. Some benefit from model assistance with human approval. Only a few justify true autonomy." },
          { type: "paragraph", text: "The second was that a digital learning identity is more valuable than any single agent. Once the system knows the learner continuously, personalization becomes much easier across the product." },
          { type: "paragraph", text: "The third was that educational AI needs evals tied to learning outcomes, not just output quality." },
          { type: "paragraph", text: "And finally, the most valuable AI systems in education may be the ones students barely notice. A better teacher briefing, a more accurate mastery signal, or a well-timed practice recommendation can improve the learning experience without replacing the human relationship at the center of it." },
        ],
      },
      {
        heading: "The takeaway",
        blocks: [
          { type: "paragraph", text: "The roadmap did not produce one giant autonomous tutor. It produced a build order for an agentic learning system." },
          { type: "paragraph", text: "The path starts with structured learner data, removes repetitive teacher work, introduces human-reviewed intelligence, and only then moves toward autonomous support where the value justifies the risk." },
          { type: "paragraph", text: "Diagnostics create the learning identity. Teacher copilots create leverage. Adaptive systems create continuity. Evals make autonomy safe enough to earn." },
        ],
      },
    ],
  },
};
