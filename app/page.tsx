import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { ScrollStory } from "@/components/ScrollStory/ScrollStory";
import { Metrics } from "@/components/Metrics/Metrics";
import { IntroVideo } from "@/components/IntroVideo/IntroVideo";
import { CareerTimeline, EarlierChapters } from "@/components/CareerTimeline/CareerTimeline";
import { WorkCaseStudies } from "@/components/CaseStudy/WorkCaseStudies";
import { HowIWork } from "@/components/HowIWork/HowIWork";
import { TransferableSkills } from "@/components/TransferableSkills/TransferableSkills";
import { Tools } from "@/components/Tools/Tools";
import { DomainExperience } from "@/components/DomainExperience/DomainExperience";
import { TestimonialWall } from "@/components/Testimonial/TestimonialWall";
import { ResumeCTA } from "@/components/ResumeCTA/ResumeCTA";
import { CareerDirection } from "@/components/CareerDirection/CareerDirection";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ScrollStory />
        <Metrics />
        <IntroVideo />
        <CareerTimeline />
        <EarlierChapters />
        <WorkCaseStudies />
        <HowIWork />
        <TransferableSkills />
        <Tools />
        <DomainExperience />
        <TestimonialWall />
        <ResumeCTA />
        <CareerDirection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
