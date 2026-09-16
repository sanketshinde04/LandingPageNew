import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Reveal from "@/components/Reveal";
import ProofCatalog from "@/components/proof/ProofCatalog";

export const metadata: Metadata = {
  title: "Proof — 15 Enterprise AI Systems in Production — DEPLOY",
  description:
    "Deployed systems, measurable SLAs, and real architectures — 15 production AI case studies shipped into operational use with enterprise engineering teams.",
};

export default function ProofPage() {
  return (
    <main id="top" className="min-h-screen bg-[#080e1a] text-white">
      <Navigation />

      {/* Hero Header */}
      <header className="relative border-b hairline px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-[840px]">
            <span className="eyebrow !text-accent">Production Proof</span>
            <h1 className="mt-5 text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.0] tracking-[-0.04em]">
              15 Production Systems. <br />
              <span className="serif-accent text-accent">Zero Hallucinations.</span>
            </h1>
            <p className="mt-6 max-w-[760px] text-lg leading-relaxed text-zinc-200 md:text-xl font-normal">
              Every system documented here runs against real operational data inside client infrastructure.
              Explore our architectural topologies, latency SLAs, evaluation harnesses, and security boundaries.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Case Studies Catalog Section */}
      <section id="case-studies" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="eyebrow !text-accent">Verified Topologies</span>
                <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  System Architecture Directory
                </h2>
              </div>
              <p className="text-xs sm:text-[13.5px] font-mono text-zinc-300 max-w-[340px] font-medium leading-relaxed">
                Filter by domain or search by specific latency requirements, frameworks, and compliance standards.
              </p>
            </div>
          </Reveal>

          {/* Squirro-Inspired Ready-to-Deploy Agent Showcase Callout */}
          <div className="mt-8 rounded-2xl border border-white/15 bg-gradient-to-r from-[#0b1426] via-[#091020] to-[#070b16] p-6 sm:p-7 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 text-accent font-bold">
                  ⚡
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                      Interactive Live Showcase
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">·</span>
                    <span className="font-mono text-xs text-zinc-300">Inspired by Squirro</span>
                  </div>
                  <h3 className="mt-1 text-base sm:text-lg font-semibold text-white">
                    Looking for Modular, Ready-to-Deploy Agents with Live Sandboxes?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-300">
                    Explore our 14 ready-to-deploy agents mapped by Department and Industry with instant execution testing.
                  </p>
                </div>
              </div>

              <Link
                href="/agent-catalog"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-accent hover:shadow-lg"
              >
                <span>Try Agent Catalog</span>
                <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <ProofCatalog />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
