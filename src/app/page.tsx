import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProofMarquee from "@/components/ProofMarquee";
import Work from "@/components/Work";
import Problem from "@/components/Problem";
import Manifesto from "@/components/Manifesto";
import Sprint from "@/components/Sprint";
import Pod from "@/components/Pod";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ProofMarquee />
      <Manifesto />
      <Work />
      <Problem />
      <Sprint />
      <Pod />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
