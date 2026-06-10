import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProofMarquee from "@/components/ProofMarquee";
import WhyNow from "@/components/WhyNow";
import Curriculum from "@/components/Curriculum";
import Manifesto from "@/components/Manifesto";
import WhoOutcomes from "@/components/WhoOutcomes";
import Instructor from "@/components/Instructor";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ProofMarquee />
      <WhyNow />
      <Curriculum />
      <Manifesto />
      <WhoOutcomes />
      <Instructor />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
