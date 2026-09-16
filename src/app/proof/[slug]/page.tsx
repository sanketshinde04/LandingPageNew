import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProofInteractive from "@/components/ProofInteractive";
import Reveal from "@/components/Reveal";
import ReadingProgressBar from "@/components/proof/ReadingProgressBar";
import TableOfContents, { type TocItem } from "@/components/proof/TableOfContents";
import AiSummarizer from "@/components/proof/AiSummarizer";
import ShareBar from "@/components/proof/ShareBar";
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ContentBlock({ block, isFirstIntro = false }: { block: ProofBlock; isFirstIntro?: boolean }) {
  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-l-2 border-accent pl-6 py-1.5 text-[1.3rem] sm:text-[1.5rem] font-normal leading-[1.6] italic text-zinc-100">
        “{block.text}”
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-8 space-y-3.5 pl-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3.5 text-[17px] sm:text-[18px] leading-[1.8] text-zinc-100">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div className="my-10 overflow-hidden rounded-xl border border-white/15 bg-[#090e1a]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.04]">
                <th className="px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 font-semibold">
                  Dimension
                </th>
                <th className="px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 font-semibold">
                  Metric
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono text-sm">
              {block.rows.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-6 py-4 text-zinc-300 font-medium">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isFirstIntro) {
    return (
      <p className="my-6 text-[19px] sm:text-[21px] font-normal leading-[1.75] tracking-tight text-white">
        {block.text}
      </p>
    );
  }

  return (
    <p className="my-6 text-[17px] sm:text-[18px] font-normal leading-[1.8] text-zinc-100">
      {block.text}
    </p>
  );
}

export default async function ProofStoryPage({ params }: ProofPageProps) {
  const { slug } = await params;
  const story = proofStories[slug];

  if (!story) notFound();

  // Generate TOC headings with unique IDs for scrollspy
  const tocHeadings: TocItem[] = story.sections.map((section, index) => ({
    id: `section-${index + 1}-${slugify(section.heading)}`,
    text: section.heading,
    index: index + 1,
  }));

  // Identify next stories for bottom navigation
  const allSlugs = Object.keys(proofStories);
  const otherStories = allSlugs
    .filter((s) => s !== slug)
    .map((s) => proofStories[s])
    .slice(0, 2);

  return (
    <main id="top" className="relative min-h-screen bg-[#080e1a] text-white antialiased">
      <ReadingProgressBar />
      <Navigation />

      {/* Article Hero Header */}
      <header className="relative border-b border-white/10 px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-[960px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-[13px] uppercase tracking-[0.16em] text-zinc-400">
              <Link href="/proof" className="transition-colors hover:text-white font-medium">
                Proof
              </Link>
              <span>/</span>
              <span className="text-accent font-semibold">{story.category}</span>
            </div>

            {/* Title & Standfirst */}
            <h1 className="mt-6 text-[clamp(2.3rem,5vw,4.2rem)] font-medium leading-[1.04] tracking-tight text-white">
              {story.title}
            </h1>
            <p className="mt-5 max-w-[840px] text-lg sm:text-xl font-normal leading-relaxed text-zinc-200">
              {story.standfirst}
            </p>

            {/* Meta badges */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2.5 font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em] text-zinc-300">
              <span className="font-semibold text-white">{story.date}</span>
              <span aria-hidden className="text-zinc-500">·</span>
              <span className="font-semibold text-white">{story.readTime}</span>
              <span aria-hidden className="text-zinc-500">·</span>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/20 bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Minimalist System Breakdown (Zero Neon/Glows) */}
          <Reveal delay={0.08} className="mt-12 md:mt-14">
            <ProofInteractive kind={story.kind} />
          </Reveal>

          {/* Minimalist AI Summarizer + Share Toolbar */}
          <Reveal delay={0.12} className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <AiSummarizer title={story.title} />
              <ShareBar title={story.title} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Two-Column Article Body */}
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Main Article Content (8 columns) */}
          <article className="min-w-0 lg:col-span-8">
            {/* Mobile collapsible TOC */}
            <div className="mb-10 lg:hidden">
              <TableOfContents headings={tocHeadings} />
            </div>

            {/* Intro paragraphs */}
            <Reveal>
              <div className="mb-14 border-b border-white/10 pb-10">
                {story.intro.map((block, index) => (
                  <ContentBlock
                    key={`intro-${index}`}
                    block={block}
                    isFirstIntro={index === 0}
                  />
                ))}
              </div>
            </Reveal>

            {/* Main Sections */}
            {story.sections.map((section, index) => (
              <Reveal
                key={section.heading}
                delay={index === 0 ? 0.05 : 0}
                className="mt-16 first:mt-0 md:mt-20"
              >
                <section id={tocHeadings[index].id} className="scroll-mt-28">
                  {/* Section Header */}
                  <div className="mb-6 flex items-start gap-4 border-b border-white/10 pb-4">
                    <span className="pt-1 font-mono text-xs sm:text-sm font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-semibold leading-[1.22] tracking-tight text-white">
                      {section.heading}
                    </h2>
                  </div>

                  {/* Section Content */}
                  <div>
                    {section.blocks.map((block, blockIndex) => (
                      <ContentBlock
                        key={`${section.heading}-${blockIndex}`}
                        block={block}
                      />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            {/* Executive Minimalist Summary Box */}
            <div className="mt-16 rounded-2xl border border-white/15 bg-[#090e1b] p-8 sm:p-10 shadow-lg">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                Executive Engineering Takeaway
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white tracking-tight">
                Engineering Principle in Production
              </h3>
              <p className="mt-4 text-base sm:text-[17.5px] leading-[1.75] text-zinc-100">
                {story.standfirst}
              </p>
            </div>
          </article>

          {/* Sticky Sidebar (4 columns on Desktop) */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-5">
              {/* Table of Contents */}
              <TableOfContents headings={tocHeadings} />

              {/* Author / Pod Card */}
              <div className="rounded-2xl border border-white/15 bg-[#090e1b] p-6 shadow-md">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 font-semibold">
                  Engineering Team
                </div>
                <div className="mt-2 text-base font-semibold text-white">
                  DEPLOY by Build Fast with AI
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-200">
                  Forward-deployed engineers embedding directly with enterprise client teams to turn real workflows into production AI systems.
                </p>
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <a
                    href="mailto:talk@buildfastwithai.com"
                    className="font-mono text-xs uppercase tracking-wider font-semibold text-accent hover:underline transition-colors"
                  >
                    talk@buildfastwithai.com &rarr;
                  </a>
                </div>
              </div>

              {/* Minimal Scoping CTA Card */}
              <div className="rounded-2xl border border-white/15 bg-[#090e1b] p-6 shadow-md">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 font-semibold">
                  The Build
                </div>
                <h4 className="mt-2 text-base font-semibold leading-snug text-white">
                  Need this system running in your stack?
                </h4>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-200">
                  Bring one real workflow. Our engineers build against your data and hand over the code.
                </p>
                <a
                  href="#call"
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-lg"
                >
                  Book a scoping call
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Read Next Breakdown */}
        {otherStories.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-16">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                  Breakdowns
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Read next in Proof
                </h3>
              </div>
              <Link
                href="/proof"
                className="hidden font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-white sm:block"
              >
                View all stories &rarr;
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherStories.map((nextStory) => (
                <Link
                  key={nextStory.slug}
                  href={`/proof/${nextStory.slug}`}
                  className="group block rounded-2xl border border-white/15 bg-[#090e1b] p-7 transition-all hover:border-white/30 hover:bg-[#0c1324] shadow-md hover:shadow-xl"
                >
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                    <span className="text-accent font-semibold">{nextStory.category}</span>
                    <span className="text-zinc-300 font-medium">{nextStory.readTime}</span>
                  </div>
                  <h4 className="mt-3.5 text-lg font-bold leading-snug text-white group-hover:text-accent transition-colors">
                    {nextStory.title}
                  </h4>
                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-zinc-200">
                    {nextStory.standfirst}
                  </p>
                  <div className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-white group-hover:text-accent transition-colors">
                    <span>Read breakdown</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <FinalCTA />
      <Footer />
    </main>
  );
}
