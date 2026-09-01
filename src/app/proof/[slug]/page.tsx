import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProofInteractive from "@/components/ProofInteractive";
import Reveal from "@/components/Reveal";
import { proofStories, type ProofBlock } from "@/lib/proofContent";

interface ProofPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(proofStories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProofPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = proofStories[slug];

  if (!story) return {};

  return {
    title: `${story.title} — DEPLOY`,
    description: story.standfirst,
  };
}

function ContentBlock({ block }: { block: ProofBlock }) {
  if (block.type === "quote") {
    return (
      <blockquote className="my-9 border-l border-accent pl-5 font-serif text-[1.45rem] italic leading-[1.42] text-white/90 md:text-[1.7rem]">
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-8 space-y-3 border-y border-white/10 py-6">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 font-serif text-[18px] leading-[1.65] text-white/75">
            <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div className="my-7 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
        {block.rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid gap-4 px-5 py-4 text-sm sm:grid-cols-[0.8fr_1.2fr] ${
              index > 0 ? "border-t border-white/10" : ""
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">
              {row.label}
            </span>
            <span className="text-white/70">{row.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="my-6 font-serif text-[18px] leading-[1.72] tracking-[0.002em] text-white/78 sm:text-[19px]">
      {block.text}
    </p>
  );
}

export default async function ProofStoryPage({ params }: ProofPageProps) {
  const { slug } = await params;
  const story = proofStories[slug];

  if (!story) notFound();

  return (
    <main id="top">
      <Navigation />

      <header className="border-b hairline px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[920px]">
          <Reveal>
            <Link
              href="/proof"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-accent"
            >
              ← Back to Proof
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
              <span className="text-accent">{story.category}</span>
              <span aria-hidden>·</span>
              <span>{story.date}</span>
              <span aria-hidden>·</span>
              <span>{story.readTime}</span>
            </div>
            <h1 className="mt-6 max-w-[780px] text-[clamp(2.35rem,5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.038em]">
              {story.title}
            </h1>
            <p className="mt-7 max-w-[700px] text-[clamp(1rem,1.7vw,1.2rem)] leading-[1.6] text-white/62">
              {story.standfirst}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50"
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
            <Reveal key={section.heading} delay={index === 0 ? 0.05 : 0} className="mt-16 md:mt-20">
              <section>
                <div className="mb-6 flex items-start gap-4">
                  <span className="pt-2 font-mono text-[10px] tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="max-w-[600px] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold leading-[1.18] tracking-[-0.018em] text-white">
                    {section.heading}
                  </h2>
                </div>
                {section.blocks.map((block, blockIndex) => (
                  <ContentBlock key={`${section.heading}-${blockIndex}`} block={block} />
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
