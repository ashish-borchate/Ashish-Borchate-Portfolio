import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title={contactSection.headline}
          subtitle={contactSection.subline}
          className="mx-auto text-center"
        />
        <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <MagneticButton href={profile.links.emailHref} variant="primary" className="w-full sm:w-auto">
            Email Me
          </MagneticButton>
          <MagneticButton href={profile.links.linkedInHref} variant="ghost" className="w-full sm:w-auto" external>
            LinkedIn
          </MagneticButton>
          <MagneticButton href={profile.assets.resumePdf} variant="ghost" className="w-full sm:w-auto" external>
            Download Resume
          </MagneticButton>
        </div>
        <p className="mt-6 text-xs text-muted">
          Contact URLs: {profile.links.email} · {profile.links.linkedIn}
        </p>
      </div>
    </section>
  );
}
