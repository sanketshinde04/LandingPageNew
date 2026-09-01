import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Proof — DEPLOY",
  description:
    "Deployed systems and measured results — the AI work shipped into real operational use with client teams.",
};

type ThumbnailKind = "sql" | "interviewer" | "learning";

const stories: {
  id: string;
  kind: ThumbnailKind;
  type: string;
  readTime: string;
  title: string;
  excerpt: string;
  thumbnail: string;
}[] = [
  {
    id: "sql-rag",
    kind: "sql",
    type: "Case Study",
    readTime: "10 min read",
    title: "Scaling Enterprise SQL RAG to ~95% Accuracy",
    thumbnail: "/case-studies/sql-rag-thumbnail.webp",
    excerpt:
      "How business semantics, cost-aware model routing, evals, and human feedback turned a text-to-SQL prototype into a production analytics engine.",
  },
  {
    id: "ai-interviewer",
    kind: "interviewer",
    type: "Case Study",
    readTime: "10 min read",
    title: "Building a Real-Time AI Interviewer for Technical Hiring",
    thumbnail: "/case-studies/ai-interviewer-thumbnail.webp",
    excerpt:
      "Production-grade live voice interaction, contextual candidate retrieval, sandboxed live coding, and explainable scoring across 150+ engineer-days.",
  },
  {
    id: "agentic-learning",
    kind: "learning",
    type: "Architecture",
    readTime: "11 min read",
    title: "Designing an Agentic Learning System for 1:1 Education",
    thumbnail: "/case-studies/agentic-learning-thumbnail.webp",
    excerpt:
      "Architectural blueprint for AI-assisted 1:1 education across 9 learner stages and 30+ capabilities: teacher copilots, mastery tracking, and safe autonomy.",
  },
];

export default function ProofPage() {
  return (
    <main id="top">
      <Navigation />

      <header className="relative border-b hairline px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="max-w-[760px]">
            <span className="eyebrow !text-accent">Proof</span>
            <h1 className="mt-5 text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              The work, and what it <span className="serif-accent">moved.</span>
            </h1>
            <p className="mt-7 max-w-[700px] text-base leading-relaxed text-white/65 md:text-lg">
              Every one of these ran against real data inside a real team&apos;s workflow — the only kind of proof that predicts whether the next build ships.
            </p>
          </Reveal>
        </div>
      </header>

      <section id="case-studies" className="relative py-24 md:py-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="eyebrow !text-accent">Engineering breakdowns</span>
            <h2 className="mt-5 max-w-[760px] text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              How these systems were actually built.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 md:mt-14">
            <div className="grid gap-5 lg:grid-cols-3">
              {stories.map((story) => (
                <article
                  key={story.id}
                  id={story.id}
                  className="group overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.045]"
                >
                  <a
                    href={`/proof/${story.id}`}
                    aria-label={`Read ${story.title}`}
                    className="relative block aspect-[16/9] overflow-hidden border-b border-white/10 bg-white/[0.03]"
                  >
                    <Image
                      src={story.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#080e1a]/20 to-transparent" />
                  </a>
                  <div className="flex min-h-[330px] flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                      <span className="text-accent">{story.type}</span>
                      <span>{story.readTime}</span>
                    </div>
                    <h3 className="mt-6 text-[1.35rem] font-medium leading-tight tracking-tight text-white">
                      {story.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                      {story.excerpt}
                    </p>
                    <a
                      href={`/proof/${story.id}`}
                      className="mt-auto flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 transition-colors duration-300 group-hover:text-accent"
                    >
                      Read the breakdown
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
