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
import { faq } from "@/lib/content";
import { generateFAQSchema, generateServiceSchema } from "@/lib/seo";

export default function Home() {
  const faqSchema = generateFAQSchema(faq.items);
  const serviceSchema = generateServiceSchema();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
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
