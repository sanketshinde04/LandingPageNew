import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import AgentCatalogView from "@/components/agents/AgentCatalogView";

export const metadata: Metadata = {
  title: "AI Agent Catalog — 14 Modular Ready-to-Deploy Enterprise Agents — DEPLOY",
  description:
    "Deploy where the business case is clear, prove ROI in weeks, and let every successful use case accelerate the next. Explore our 14 ready-to-deploy enterprise agents across Finance, Legal, HR, Sales, IT, and R&D.",
};

export default function AgentCatalogPage() {
  return (
    <main id="top" className="min-h-screen bg-[#080e1a] text-white">
      <Navigation />

      {/* Hero Header */}
      <header className="relative border-b hairline px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-[880px]">
            <div className="flex items-center gap-2">
              <span className="eyebrow !text-accent">Ready-To-Deploy Catalog</span>
              <span className="text-zinc-500 font-mono text-xs">·</span>
              <span className="font-mono text-xs text-zinc-300">14 Production Agents</span>
            </div>

            <h1 className="mt-5 text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.0] tracking-[-0.04em]">
              Build Your AI Foundation, <br />
              <span className="serif-accent">One Agent at a Time.</span>
            </h1>

            <p className="mt-6 max-w-[760px] text-lg sm:text-xl font-normal leading-relaxed text-zinc-200">
              Deploy where the business case is clear, prove ROI in weeks, and let every successful use case accelerate the next.
              Built once on client infrastructure, reusable across the entire organization.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-lg"
              >
                Browse Agent Catalog &darr;
              </a>
              <Link
                href="/proof"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:bg-white/[0.1]"
              >
                View 15 Architectural Case Studies &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Catalog & Live Sandbox Section */}
      <section id="catalog" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow !text-accent">Live Sandbox & Directory</span>
                <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Find Your Starting Point.
                </h2>
              </div>
              <p className="text-xs sm:text-[13.5px] font-mono text-zinc-300 max-w-[340px] font-medium leading-relaxed">
                Filter by department, industry, or outcome. Click “Try Live Agent Demo” on any card to test the live execution pipeline.
              </p>
            </div>
          </Reveal>

          <AgentCatalogView />
        </div>
      </section>

      {/* Enterprise Proof Section (Squirro Inspired) */}
      <section className="relative border-t border-white/10 bg-[#060a14] py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <div className="text-center max-w-[700px] mx-auto">
              <span className="eyebrow !text-accent">Proof, Not Promises</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Trusted by Enterprise Leaders in Production
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                We don&apos;t force enterprise teams to transform their legacy stack — we make existing data and workflows usable, turning real operations into scalable AI.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#090e1b] p-8 shadow-lg">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-white">3,300+</div>
                <div className="mt-2 text-sm font-semibold text-accent">Active Knowledge Workers</div>
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Querying enterprise policy and technical documentation daily with zero hallucinations and verified line-level source attribution.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#090e1b] p-8 shadow-lg">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-emerald-400">94.2%</div>
                <div className="mt-2 text-sm font-semibold text-accent">User Satisfaction & Evals</div>
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Measured across client engineering and legal operations teams over 850k production actions and zero unsafe mutations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#090e1b] p-8 shadow-lg">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-white">$7.2M</div>
                <div className="mt-2 text-sm font-semibold text-accent">Annual Operating Savings</div>
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Delivered across tier-1 customer deflection, contract redlining automation, and monolithic service modernization.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Take Whole Catalog With You CTA */}
      <section className="relative border-t border-white/10 py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1628] to-[#080e1a] p-8 sm:p-12 md:p-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-[640px]">
                <span className="eyebrow !text-accent">Executive Reference Guide</span>
                <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Take the Whole Catalog with You.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-zinc-200 leading-relaxed">
                  Every ready-to-deploy agent in one place — each mapped to the function it serves, the outcome it delivers, and the effort to go live.
                  Circulate with your executive and engineering team before the first scoping call.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-300">
                  <span>✓ 14 Agents mapped across 6 departments</span>
                  <span>✓ Time-to-value and business ROI</span>
                  <span>✓ 100% On-premises VPC security boundaries</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href="#call"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-xl"
                >
                  Book a Scoping Call
                </a>
                <Link
                  href="/proof"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.05] px-7 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:bg-white/[0.1]"
                >
                  Explore Technical Case Studies &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
