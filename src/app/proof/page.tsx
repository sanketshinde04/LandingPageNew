import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Reveal from "@/components/Reveal";
import { siteConfig, generateBreadcrumbSchema, getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Proof: AI Systems in Production and What They Moved",
  description:
    "Measured outcomes from forward-deployed AI builds: 80% less processing time, 60% less manual interview time, 45% more student engagement. Real numbers.",
  alternates: {
    canonical: "/proof",
  },
  openGraph: {
    title: "Proof: AI Systems in Production and What They Moved",
    description:
      "Measured outcomes from forward-deployed AI builds: 80% less processing time, 60% less manual interview time, 45% more student engagement. Real numbers.",
    url: getCanonicalUrl("/proof"),
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "DEPLOY Proof: AI Systems in Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof: AI Systems in Production and What They Moved",
    description:
      "Measured outcomes from forward-deployed AI builds: 80% less processing time, 60% less manual interview time, 45% more student engagement. Real numbers.",
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
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
      "How business semantics, cost-aware model routing, evals, and an RLHF feedback loop turned a text-to-SQL prototype into a production analytics engine.",
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Proof", url: "/proof" },
  ]);

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Navigation />

      <header className="relative border-b hairline px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="max-w-[760px]">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span>Proof</span>
            </span>
            <h1 className="mt-7 text-[clamp(2.6rem,5.6vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-bone">
              The work, and what it <span className="text-accent">moved.</span>
            </h1>
            <p className="mt-7 max-w-[640px] text-[16px] leading-[1.6] text-[#9a9eac] md:text-[17px]">
              Every one of these ran against real data inside a client team&apos;s production workflow. That is the only kind of proof that predicts whether the next AI system ships.
            </p>
          </Reveal>
        </div>
      </header>

      <section id="case-studies" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal className="max-w-[760px]">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span className="text-white/50">01</span>
              <span>Engineering breakdowns</span>
            </span>
            <h2 className="mt-7 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
              Case studies and{" "}
              <span className="text-accent">production architecture notes.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 md:mt-16">
            {/* one ruled panel, three columns: the same drafting frame as the
                landing page, so the index reads as part of the same system */}
            <div className="relative border hairline">
              <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
              <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
              <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
              <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-3">
                {stories.map((story, i) => (
                  <article
                    key={story.id}
                    id={story.id}
                    className={`group hairline flex flex-col transition-colors duration-300 hover:bg-surface/60 ${
                      i > 0 ? "border-t lg:border-l lg:border-t-0" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 md:px-7">
                      <span className="flex items-center gap-3 text-accent">
                        <span className="h-[7px] w-[7px] rounded-[1.5px] bg-accent" aria-hidden="true" />
                        {story.type}
                      </span>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    <Link
                      href={`/proof/${story.id}`}
                      aria-label={`Read ${story.title}`}
                      className="relative mx-6 mt-5 block aspect-[16/9] overflow-hidden border hairline bg-surface/40 md:mx-7"
                    >
                      <Image
                        src={story.thumbnail}
                        alt={`${story.title} case study thumbnail`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover opacity-90 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-100"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col px-6 pb-6 pt-6 md:px-7 md:pb-7">
                      <h3 className="text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.02em] text-bone">
                        {story.title}
                      </h3>
                      <p className="mt-3 border-t hairline pt-4 text-[14px] leading-[1.6] text-[#9a9eac]">
                        {story.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-4 pt-7 font-mono text-[10px] uppercase tracking-[0.18em]">
                        <Link
                          href={`/proof/${story.id}`}
                          className="flex items-center gap-2 text-white/45 transition-colors duration-300 group-hover:text-accent"
                        >
                          Read the breakdown
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                        <span className="text-white/35">{story.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
