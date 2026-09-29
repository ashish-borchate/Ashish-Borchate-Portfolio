import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 sm:scroll-mt-24 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title={contactSection.headline}
          className="mx-auto max-w-none text-center"
          titleClassName="whitespace-nowrap text-[clamp(1.2rem,4.2vw,3rem)] tracking-tight"
        />
        <div className="mx-auto mt-8 flex w-full max-w-[11.5rem] flex-col gap-2 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <MagneticButton
            href={profile.links.emailHref}
            variant="primary"
            className="w-full min-w-0 px-4 sm:w-auto"
          >
            Email Me
          </MagneticButton>
          <MagneticButton
            href={profile.links.linkedInHref}
            variant="primary"
            className="w-full min-w-0 px-4 sm:w-auto"
            external
          >
            LinkedIn
          </MagneticButton>
          <MagneticButton
            href={profile.assets.resumePdf}
            variant="primary"
            className="w-full min-w-0 px-5 sm:w-auto"
            external
          >
            Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
