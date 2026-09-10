import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProofInteractive from "@/components/ProofInteractive";
import Reveal from "@/components/Reveal";
import { proofStories, type ProofBlock } from "@/lib/proofContent";
import {
  siteConfig,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getCanonicalUrl,
} from "@/lib/seo";

interface ProofPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(proofStories).map((slug) => ({ slug }));
}

const META_OVERRIDES: Record<
  string,
  { title: string; description: string }
> = {
  "sql-rag": {
    title: "Text-to-SQL RAG at ~95% Accuracy: Enterprise Case Study",
    description:
      "How a semantic business layer, cost-aware model routing, evals and an RLHF-style feedback loop took text-to-SQL from prototype to ~95% end-to-end accuracy.",
  },
  "ai-interviewer": {
    title: "Real-Time AI Interviewer: Voice Latency, Sandbox & Evals",
    description:
      "Building a live-voice AI technical interviewer: sub-second latency budgets, TTS selection, sandboxed live coding and explainable scoring over 150+ engineer-days.",
  },
  "agentic-learning": {
    title: "Agentic AI Architecture for 1:1 Education | Case Study",
    description:
      "Blueprint for an agentic learning system: digital learning identity, 9 learner stages, 30+ capabilities, teacher copilots, mastery tracking and safe autonomy.",
  },
};

export async function generateMetadata({
  params,
}: ProofPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = proofStories[slug];

  if (!story) return {};

  const override = META_OVERRIDES[slug];
  const title = override ? override.title : `${story.title} | ${siteConfig.name}`;
  const description = override ? override.description : story.standfirst;
  const canonicalUrl = getCanonicalUrl(`/proof/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/proof/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: "2026-08-01T00:00:00.000Z",
      authors: [siteConfig.name],
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${story.title} | Build Fast with AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

function ContentBlock({ block }: { block: ProofBlock }) {
  if (block.type === "quote") {
    return (
      <blockquote className="my-9 border-l-2 border-accent pl-5 text-[1.3rem] font-semibold leading-[1.35] tracking-[-0.02em] text-bone md:text-[1.5rem]">
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-8 border-t hairline">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3.5 border-b hairline py-3.5 text-[16px] leading-[1.6] text-bone/85"
          >
            <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div className="relative my-8 border hairline">
        <span className="cross -left-[6px] -top-[6px]" aria-hidden="true" />
        <span className="cross -right-[6px] -top-[6px]" aria-hidden="true" />
        <span className="cross -bottom-[6px] -left-[6px]" aria-hidden="true" />
        <span className="cross -bottom-[6px] -right-[6px]" aria-hidden="true" />
        {block.rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid gap-2 px-5 py-4 text-sm sm:grid-cols-[0.7fr_1.3fr] sm:gap-4 ${
              index > 0 ? "border-t hairline" : ""
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {row.label}
            </span>
            <span className="text-[15px] leading-[1.55] text-bone/85">{row.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="my-6 text-[17px] leading-[1.7] text-[#b4b8c6] sm:text-[18px]">
      {block.text}
    </p>
  );
}

export default async function ProofStoryPage({ params }: ProofPageProps) {
  const { slug } = await params;
  const story = proofStories[slug];

  if (!story) notFound();

  const override = META_OVERRIDES[slug];
  const pageTitle = override ? override.title : story.title;
  const pageDescription = override ? override.description : story.standfirst;

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: pageDescription,
    slug: story.slug,
    datePublished: "2026-08-01T00:00:00.000Z",
    category: story.category,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Proof", url: "/proof" },
    { name: story.title, url: `/proof/${story.slug}` },
  ]);

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Navigation />

      <header className="border-b hairline px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[920px]">
          <Reveal>
            <Link
              href="/proof"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-accent"
            >
              ← Back to Proof
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                <span>{story.category}</span>
              </span>
              <span aria-hidden>·</span>
              <span>{story.date}</span>
              <span aria-hidden>·</span>
              <span>{story.readTime}</span>
            </div>
            <h1 className="mt-7 max-w-[780px] text-[clamp(2.35rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-bone">
              {story.title}
            </h1>
            <p className="mt-7 max-w-[680px] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.6] text-[#9a9eac]">
              {story.standfirst}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="border hairline px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 md:mt-14">
            <ProofInteractive kind={story.kind} />
          </Reveal>
        </div>
      </header>

      <article className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[680px]">
          <Reveal>
            {story.intro.map((block, index) => (
              <ContentBlock key={`intro-${index}`} block={block} />
            ))}
          </Reveal>

          {story.sections.map((section, index) => (
            <Reveal
              key={section.heading}
              delay={index === 0 ? 0.05 : 0}
              className="mt-16 md:mt-20"
            >
              <section>
                <div className="mb-6 border-t hairline pt-6">
                  <span className="hero-eyebrow">
                    <span className="hero-eyebrow-dot" aria-hidden="true" />
                    <span className="text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h2 className="mt-4 max-w-[600px] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-bone">
                    {section.heading}
                  </h2>
                </div>
                {section.blocks.map((block, blockIndex) => (
                  <ContentBlock
                    key={`${section.heading}-${blockIndex}`}
                    block={block}
                  />
                ))}
              </section>
            </Reveal>
          ))}
        </div>
      </article>

      <FinalCTA />
      <Footer />
    </main>
  );
}
