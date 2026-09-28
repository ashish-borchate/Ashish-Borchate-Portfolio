import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { ScrollStory } from "@/components/ScrollStory/ScrollStory";
import { Metrics } from "@/components/Metrics/Metrics";
import { TestimonialsSection } from "@/components/Testimonial/TestimonialsSection";
import { CareerTimeline } from "@/components/CareerTimeline/CareerTimeline";
import { WorkCaseStudies } from "@/components/CaseStudy/WorkCaseStudies";
import { TransferableSkills } from "@/components/TransferableSkills/TransferableSkills";
import { Tools } from "@/components/Tools/Tools";
import { DomainExperience } from "@/components/DomainExperience/DomainExperience";
import { ResumeCTA } from "@/components/ResumeCTA/ResumeCTA";
import { CareerDirection } from "@/components/CareerDirection/CareerDirection";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-w-0">
        <Hero />
        <ScrollStory />
        <Metrics />
        <TestimonialsSection />
        <CareerTimeline />
        <WorkCaseStudies />
        <Tools />
        <DomainExperience />
        <TransferableSkills />
        <CareerDirection />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
