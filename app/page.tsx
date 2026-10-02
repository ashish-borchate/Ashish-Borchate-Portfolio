import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { CompaniesMarquee } from "@/components/CompaniesMarquee/CompaniesMarquee";
import { ScrollStory } from "@/components/ScrollStory/ScrollStory";
import { Metrics } from "@/components/Metrics/Metrics";
import { TestimonialsSection } from "@/components/Testimonial/TestimonialsSection";
import { CareerTimeline } from "@/components/CareerTimeline/CareerTimeline";
import { WorkCaseStudies } from "@/components/CaseStudy/WorkCaseStudies";
import { TransferableSkills } from "@/components/TransferableSkills/TransferableSkills";
import { ExpertiseTools } from "@/components/Expertise/ExpertiseTools";
import { CareerDirection } from "@/components/CareerDirection/CareerDirection";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-w-0 overflow-x-clip">
        <Hero />
        <CompaniesMarquee />
        <Metrics />
        <CareerTimeline />
        <WorkCaseStudies />
        <TestimonialsSection />
        <ScrollStory />
        <TransferableSkills embedded />
        <ExpertiseTools />
        <CareerDirection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
